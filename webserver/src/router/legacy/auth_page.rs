use anyhow::Result;
use askama::{DynTemplate, Template};
use axum::extract::{Extension, Form};
use axum::response::{IntoResponse, Redirect};
use axum_sessions::async_session::chrono;
use axum_sessions::async_session::chrono::Datelike;
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
) -> Result<Redirect, AppError> {
    if input.password == input.confirm {
        db.add_user_credentials(
            &input.username,
            &prepare_password(&input.password)?,
            &input.nickname,
            &input.token,
        )
            .await?;
        session.insert("uname", &input.username)?;
        Ok(Redirect::to("/legacy/home"))
    } else {
        Ok(Redirect::to("/legacy/auth?conflict"))
    }
}

pub async fn signin(
    mut session: WritableSession,
    Extension(db): Extension<DbWrapper>,
    Form(input): Form<SignInForm>,
) -> Result<Redirect, AppError> {
    if verify_password(&input.password, db.get_user_phc(&input.username).await?)? {
        session.insert("uname", &input.username)?;
        Ok(Redirect::to("/legacy/home"))
    } else {
        Ok(Redirect::to("/legacy/auth?unauthorized"))
    }
}

pub async fn do_get() -> impl IntoResponse {
    let template = AuthPageTemplate {
        nav_active: 1,
        error: None,
    };
    HtmlTemplate(template)
}

#[derive(Template)]
#[template(path = "authenticate.html")]
struct AuthPageTemplate {
    nav_active: usize,
    error: Option<usize>,
}