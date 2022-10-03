use std::net::SocketAddr;

use anyhow::*;
use axum::{
    Router, 
    routing::{get, post},
    Extension};

mod database;
mod handlers;
mod parser;

#[tokio::main]
async fn main() -> Result<()> {
    // DB url needs to be extracted from a config file, for now this is the spec
    parser::parse_config("/home/tommaso/Documents/Hacktoberfest/theysa.id/webserver/src/test.toml")?;
    /* let db_url = "mysql://theysa_user:theysa_pass@localhost:3306/theysa_db";
    let db = database::DbWrapper::new(db_url).await?;

    // build our application with some routes
    let app = Router::new()
        .route(
            "/",
            post(handlers::signup))
        .layer(Extension(db));

    // run it with hyper
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
    */

    Ok(())
}