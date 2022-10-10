use axum::{
    extract::{FromRequest, RequestParts},
    middleware::from_extractor,
    routing::{get, post},
    Router,
};
use axum::http::{header, StatusCode};
use async_trait::async_trait;
use tower_cookies::{Cookie, CookieManagerLayer, Cookies};

// An extractor that performs authorization.
pub struct Session;

#[async_trait]
impl<B> FromRequest<B> for Session
where
    B: Send,
{
    type Rejection = StatusCode;

    async fn from_request(req: &mut RequestParts<B>) -> Result<Self, Self::Rejection> {

        println!("test!");

        let cookies = Cookies::from_request(req).await.unwrap();

        println!("{:?}", cookies.get("session"));

        Ok(Session)
    }
}

pub async fn test_session(
    _session: Session,
) -> String {
    "tested".to_string()
}
