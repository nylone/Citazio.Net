use anyhow::*;
use axum::{routing::post, Extension, Router};
use clap::Parser;

mod app_config;
mod database;
mod handlers;

#[tokio::main]
async fn main() -> Result<()> {
    // parse the command line arguments
    let args = app_config::cli_args::Args::parse();
    let config = app_config::cfg_file::Config::parse(&args.config)?;

    dbg!(&args);
    dbg!(&config);
    
    match args.mode {
        app_config::cli_args::OperationMode::StartServer => {
            // DB url needs to be extracted from a config file, for now this is the spec
            let db = database::DbWrapper::new(&config.db_url).await?;

            // build our application with some routes
            let app = Router::new()
                .route("/auth/register", post(handlers::signup))
                .layer(Extension(db));
            // run it with hyper
            axum::Server::bind(&config.binding)
                .serve(app.into_make_service())
                .await
                .unwrap();

            todo!("starts the server");
        }
        app_config::cli_args::OperationMode::AddToken => {
            todo!("adds a token");
        }
    }


    //Ok(())
}
