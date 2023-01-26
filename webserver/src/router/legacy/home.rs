use askama::{Template};
use axum::response::{IntoResponse, Redirect, Response};
use axum_sessions::async_session::chrono;
use axum_sessions::async_session::chrono::Datelike;
use axum_sessions::extractors::ReadableSession;
use std::vec::Vec;

use crate::router::legacy::HtmlTemplate;

pub async fn do_get(
    session: ReadableSession,
) -> Response {
    if let Some(uname) = session.get("uname") {
        let template = PageTemplate {
            nav_active: 0,
            uname,
            cards: Vec::new(),
        };
        return HtmlTemplate(template).into_response()
    }
    Redirect::to("/legacy/auth").into_response()
}

#[derive(Template)]
#[template(path = "index.html")]
struct PageTemplate {
    nav_active: usize,
    uname: String,
    cards: Vec<BoardCard>
}

#[derive(Template)]
#[template(path = "board_card.html")]
struct BoardCard {
    name: String,
    desc: String,
    path: String,
}