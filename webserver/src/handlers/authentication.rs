use crate::database::DbWrapper;
use crate::handlers::AppError;
use anyhow::*;
use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use argon2::password_hash::SaltString;
use axum::extract::{Extension, Form, Json};
use axum::http::StatusCode;
use axum_sessions::extractors::WritableSession;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct SignUpForm {
    username: String,
    password: String,
    confirm: String,
    nickname: String,
    token: String,
}

#[derive(Deserialize)]
pub struct SignInForm {
    username: String,
    password: String,
}

fn prepare_password(password: &str) -> Result<String> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    match argon2.hash_password(password.as_bytes(), &salt) {
        Ok(hash) => Ok(hash.to_string()),
        Err(err) => Err(anyhow!("an error occurred: {}", err.to_string())),
    }
}

fn verify_password(password: &str, phc: String) -> Result<bool> {
    match &PasswordHash::new(&phc) {
        Ok(phc) => match Argon2::default().verify_password(password.as_bytes(), phc) {
            Ok(_) => Ok(true),
            Err(_) => Ok(false),
        },
        Err(err) => Err(anyhow!("an error occurred: {}", err.to_string())),
    }
}

pub async fn signup(
    mut session: WritableSession,
    Extension(db): Extension<DbWrapper>,
    Json(input): Json<SignUpForm>,
) -> Result<StatusCode> {
    if input.password == input.confirm {
        db.add_user_credentials(
            &input.username,
            &prepare_password(&input.password)?,
            &input.nickname,
            &input.token,
        )
        .await?;
        session.insert("uname", &input.username)?;
        Ok(StatusCode::OK)
    } else {
        Ok(StatusCode::CONFLICT)
    }
}

pub async fn signin(
    mut session: WritableSession,
    Extension(db): Extension<DbWrapper>,
    Json(input): Json<SignInForm>,
) -> Result<StatusCode> {
    if verify_password(&input.password, db.get_user_phc(&input.username).await?)? {
        session.insert("uname", &input.username)?;
        Ok(StatusCode::OK)
    } else {
        Ok(StatusCode::UNAUTHORIZED)
    }
}
