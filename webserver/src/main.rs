use std::{net::SocketAddr};

use anyhow::*;
use axum::{routing::post, Extension, Router};
use clap::Parser;

mod cli;
mod database;
mod handlers;

#[tokio::main]
async fn main() -> Result<()> {
    // parse the command line arguments
    let args = cli::Args::parse();
    match args.mode {
        cli::OperationMode::StartServer => {
            todo!("starts the server");
            // DB url needs to be extracted from a config file, for now this is the spec
            let db_url = "mysql://theysa_user:theysa_pass@localhost:3306/theysa_db";
            let db = database::DbWrapper::new(db_url).await?;

            // build our application with some routes
            let app = Router::new()
                .route("/auth/register", post(handlers::signup))
                .layer(Extension(db));

            // run it with hyper
            let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
            axum::Server::bind(&addr)
                .serve(app.into_make_service())
                .await
                .unwrap();
        }
        cli::OperationMode::AddToken => {
            todo!("adds a token");
        }
    }

    Ok(())
}
