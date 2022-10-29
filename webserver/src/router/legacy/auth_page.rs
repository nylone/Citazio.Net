use anyhow::Result;
use askama::Template;
use axum::extract::{Extension, Form};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum_sessions::extractors::WritableSession;
use serde::Deserialize;

use crate::database::DbWrapper;
use crate::password::*;
use crate::router::AppError;
use crate::router::legacy::HtmlTemplate;

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
    Form(input): Form<SignUpForm>,
) -> Result<StatusCode, AppError> {
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
    Form(input): Form<SignInForm>,
) -> Result<StatusCode, AppError> {
    if verify_password(&input.password, db.get_user_phc(&input.username).await?)? {
        session.insert("uname", &input.username)?;
        Ok(StatusCode::OK)
    } else {
        Ok(StatusCode::UNAUTHORIZED)
    }
}

pub async fn do_get() -> impl IntoResponse {
    let template = HelloTemplate {
        name: "test".to_string(),
    };
    HtmlTemplate(template)
}

#[derive(Template)]
#[template(path = "authenticate.html")]
struct HelloTemplate {
    name: String,
}
