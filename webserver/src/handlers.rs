use anyhow::Result;
use axum::{
    Extension, Form};
use serde::Deserialize;
use hyper::StatusCode;
use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHasher, SaltString
    },
    Argon2
};

use crate::database::DbWrapper;

#[derive(Deserialize)]
pub struct SignUpForm {
    uname: String,
    password: String,
    nick: String
}

pub async fn signup(
    Extension(db): Extension<DbWrapper>,
    Form(form): Form<SignUpForm>
) ->  Result<(), StatusCode> {    
    let password = &form.password.as_bytes(); // Bad password; don't actually use!
    let salt = SaltString::generate(&mut OsRng);
    
    // Argon2 with default params (Argon2id v19)
    let argon2 = Argon2::default();
    
    // Hash password to PHC string ($argon2id$v=19$...)
    let password_hash = argon2.hash_password(password, &salt).map_err(|_| {StatusCode::INTERNAL_SERVER_ERROR})?.to_string();

    db.add_user_credentials(&form.uname, &password_hash, &form.nick).await.map_err(|_| {StatusCode::INTERNAL_SERVER_ERROR})
}