use axum::Router;
use axum::routing::post;
use hyper::Body;

mod authentication;

pub fn get_router() -> Router<Body> {
    Router::new()
        .route("/signin", post(authentication::signin))
        .route("/signup", post(authentication::signup))
}
