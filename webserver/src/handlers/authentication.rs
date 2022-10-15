use crate::database::DbWrapper;
use anyhow::{anyhow, Result};
use argon2::{
    password_hash::{rand_core::OsRng, PasswordHasher, SaltString},
    Argon2, PasswordHash, PasswordVerifier,
};
use axum::extract::{Extension, Form};
use axum::http::StatusCode;
use axum_sessions::extractors::WritableSession;
use serde::Deserialize;
use crate::handlers::AppError;

fn hash_pass(password: &str) -> Result<String> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    match argon2.hash_password(password.as_bytes(), &salt) {
        Ok(hash) => Ok(hash.to_string()),
        Err(err) => Err(anyhow!("an error occurred: {}", err.to_string())),
    }
}

fn verify_pass(password: &str, phc: String) -> Result<bool> {
    match &PasswordHash::new(&phc) {
        Ok(phc) => match Argon2::default().verify_password(password.as_bytes(), phc) {
            Ok(_) => Ok(true),
            Err(_) => Ok(false),
        },
        Err(err) => Err(anyhow!("an error occurred: {}", err.to_string())),
    }
}

#[derive(Deserialize)]
pub struct SignUpForm {
    username: String,
    password: String,
    nickname: String,
    token: String,
}

pub async fn signup(
    mut session: WritableSession,
    Extension(db): Extension<DbWrapper>,
    Form(form): Form<SignUpForm>,
) -> Result<(), AppError> {
    db.add_user_credentials(
        &form.username,
        &hash_pass(&form.password)?,
        &form.nickname,
        &form.token,
    )
    .await?;
    session.insert("uname", &form.username)?;
    Ok(())
}

#[derive(Deserialize)]
pub struct SignInForm {
    username: String,
    password: String,
}

pub async fn signin(
    mut session: WritableSession,
    Extension(db): Extension<DbWrapper>,
    Form(form): Form<SignInForm>,
) -> Result<StatusCode, AppError> {
    let verification = verify_pass(&form.password, db.get_user_phc(&form.username).await?)?;
    if verification {
        session.insert("uname", &form.username)?;
        Ok(StatusCode::OK)
    } else {
        Ok(StatusCode::UNAUTHORIZED)
    }
}
