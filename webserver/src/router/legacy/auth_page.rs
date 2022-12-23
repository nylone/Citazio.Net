use std::collections::{HashMap};

use anyhow::Result;
use askama::{Template};
use axum::extract::{Extension, Form, Query};
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
        return Ok(Redirect::to("/legacy/home"))
    }
    Ok(Redirect::to("/legacy/auth?failed_signup=true"))
}

pub async fn signin(
    mut session: WritableSession,
    Extension(db): Extension<DbWrapper>,
    Form(input): Form<SignInForm>,
) -> Result<Redirect, AppError> {
    if let Ok(username) = db.get_user_phc(&input.username).await {
        if verify_password(&input.password, username)? {
            session.insert("uname", &input.username)?;
            return Ok(Redirect::to("/legacy/home"))
        }
    }
    Ok(Redirect::to("/legacy/auth?failed_signin=true"))
}

pub async fn do_get(Query(query): Query<HashMap<String,String>>) -> impl IntoResponse {
    let template = AuthPageTemplate {
        nav_active: 1,
        failed_signin: query.contains_key("failed_signin"),
        failed_signup: query.contains_key("failed_signup")
    };
    HtmlTemplate(template)
}

#[derive(Template)]
#[template(path = "authenticate.html")]
struct AuthPageTemplate {
    nav_active: usize,
    failed_signin: bool,
    failed_signup: bool,
}