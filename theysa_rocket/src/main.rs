use anyhow::*;
use axum::{routing::post, Extension, Router};
use axum::routing::get;
use axum_database_sessions::{AxumSessionConfig, AxumSessionStore, AxumMySqlPool, AxumSessionLayer};
use axum_sessions_auth::{Authentication, AuthSession, AuthSessionLayer, AxumAuthConfig, HasPermission};
use clap::Parser;
use sqlx::MySqlPool;

mod app_config;
mod database;
mod handlers;

#[tokio::main]
async fn main() -> Result<()> {
    // parse the command line arguments
    let args = app_config::cli_args::Args::parse();
    let config = app_config::cfg_file::Config::parse(&args.config)?;
    
    match args.mode {
        app_config::cli_args::OperationMode::StartServer => {
            // DB url needs to be extracted from a config file, for now this is the spec
            let db = database::DbWrapper::new(config.get_db_url()).await?;

            // Setup session layer
            let session_config = AxumSessionConfig::default()
                .with_database(config.get_db_url().path())
                .with_table_name("session_storage")
                .with_key(config.get_session_secret());
            let session_store = AxumSessionStore::<AxumMySqlPool>::new(Some(db.get_pool().into()), session_config);
            let session_layer = AxumSessionLayer::new(session_store);

            // build our application with some routes
            let app = Router::new()
                .route("/auth/register", post(handlers::signup))
                .route("/auth/login", post(handlers::signin))
                .layer(Extension(db))
                .layer(session_layer);

            // run it with hyper
            axum::Server::builder( config.get_combined_bindings()?)
                .serve(app.into_make_service())
                .await
                .unwrap();
        }
        app_config::cli_args::OperationMode::AddToken => {
            todo!("adds a token");
        }
    }


    Ok(())
}