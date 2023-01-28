use askama::{Template};
use axum::Extension;
use axum::response::{IntoResponse, Redirect, Response};
use axum_sessions::async_session::chrono;
use axum_sessions::async_session::chrono::Datelike;
use axum_sessions::extractors::ReadableSession;
use std::vec::Vec;

use crate::database::{DbWrapper, Board};
use crate::router::legacy::HtmlTemplate;

pub async fn do_get(
    session: ReadableSession,
    Extension(db): Extension<DbWrapper>,
) -> Response {
    if let Some(uid) = session.get("uid") {
        let own_boards = db.get_own_boards(uid).await;
        let subscribed_boards = db.get_subscribed_boards(uid).await;
        let public_boards = db.get_public_boards(uid).await;
        let template = PageTemplate {
            nav_active: 0,
            own_boards: own_boards.as_slice(),
            subscribed_boards: subscribed_boards.as_slice(),
            public_boards: public_boards.as_slice(),
        };
        return HtmlTemplate(template).into_response()
    }
    Redirect::to("/legacy/auth").into_response()
}

#[derive(Template)]
#[template(path = "index.html")]
struct PageTemplate<'a> {
    nav_active: usize,
    own_boards: &'a [Board],
    subscribed_boards: &'a [Board],
    public_boards: &'a [Board],
}