use anyhow::Result;
use axum::extract::{Extension, Json};
use axum::http::StatusCode;
use axum_sessions::extractors::WritableSession;
use serde::Deserialize;

use crate::database::DbWrapper;
use crate::password::*;
use crate::router::AppError;

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

pub async fn signup(
    mut session: WritableSession,
    Extension(db): Extension<DbWrapper>,
    Json(input): Json<SignUpForm>,
) -> Result<StatusCode, AppError> {
    db.add_user_credentials(
        &input.username,
        &prepare_password(&input.password)?,
        &input.nickname,
        &input.token,
    )
        .await?;
    session.insert("uname", &input.username)?;
    Ok(StatusCode::OK)
}

pub async fn signin(
    mut session: WritableSession,
    Extension(db): Extension<DbWrapper>,
    Json(input): Json<SignInForm>,
) -> Result<StatusCode, AppError> {
    if verify_password(&input.password, db.get_user_phc(&input.username).await?)? {
        session.insert("uname", &input.username)?;
        Ok(StatusCode::OK)
    } else {
        Ok(StatusCode::UNAUTHORIZED)
    }
}
