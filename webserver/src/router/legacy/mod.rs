use askama::Template;
use axum::http::StatusCode;
use axum::response::{Html, IntoResponse, Response};
use axum::Router;
use axum::routing::{get, get_service, post};
use hyper::Body;
use tower_http::services::ServeDir;

mod auth_page;
mod home;
mod about;

struct HtmlTemplate<T>(T);

impl<T> IntoResponse for HtmlTemplate<T>
    where
        T: Template,
{
    fn into_response(self) -> Response {
        match self.0.render() {
            Ok(html) => Html(html).into_response(),
            Err(err) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to render template. Error: {}", err),
            )
                .into_response(),
        }
    }
}

pub fn get_router() -> Router<Body> {
    let serve_dir = get_service(ServeDir::new("assets"))
        .handle_error(|_e| async { StatusCode::INTERNAL_SERVER_ERROR });

    Router::new()
        .nest("/assets", serve_dir)
        .route("/home", get(home::do_get))
        .route("/about", get(about::do_get))
        .route("/auth", get(auth_page::do_get))
        .route("/auth/signin", post(auth_page::signin))
        .route("/auth/signup", post(auth_page::signup))
}
