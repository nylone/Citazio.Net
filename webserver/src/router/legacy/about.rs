use askama::{Template};
use axum::response::{IntoResponse, Redirect, Response};
use axum_sessions::async_session::chrono;
use axum_sessions::async_session::chrono::Datelike;
use axum_sessions::extractors::ReadableSession;

use crate::router::legacy::HtmlTemplate;

pub async fn do_get() -> Response {
    let template = PageTemplate {
        nav_active: 2,
    };
    HtmlTemplate(template).into_response()
}

#[derive(Template)]
#[template(path = "about.html")]
struct PageTemplate {
    nav_active: usize,
}