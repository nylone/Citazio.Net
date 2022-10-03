use anyhow::Result;
use axum::{
    Extension, Form};
use serde::Deserialize;
use hyper::StatusCode;

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
    db.add_user_credentials(&form.uname, &form.password, &form.nick).await.map_err(|_| {StatusCode::INTERNAL_SERVER_ERROR})
}