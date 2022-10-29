use anyhow::*;
use async_sqlx_session::MySqlSessionStore;
use axum::Extension;
use axum_sessions::{SameSite, SessionLayer};
use clap::Parser;
use tokio::{task, time};

mod cfg_file;
mod cli_args;
mod database;
mod password;
mod router;

#[tokio::main]
async fn main() -> Result<()> {
    // parse the command line arguments
    let args = cli_args::Args::parse();
    let config = cfg_file::Config::parse(&args.config)?;

    match args.mode {
        cli_args::OperationMode::StartServer => {
            // DB url needs to be extracted from a config file, for now this is the spec
            let db = database::DbWrapper::new(&config.db_url).await?;

            // setup session
            let store = MySqlSessionStore::new(&config.db_url.to_string())
                .await?
                .with_table_name("sessions");
            store.migrate().await?;
            // spawn a cleanup task for the session storage
            let store_clone = store.clone();
            task::spawn(async move {
                let mut interval = time::interval(*&config.session_duration);
                loop {
                    interval.tick().await;
                    let _ = store_clone.cleanup().await;
                }
            });
            // configure the session layer
            let session_layer = SessionLayer::new(store, &config.session_secret.as_bytes())
                .with_session_ttl(Some(*&config.session_duration))
                .with_cookie_name("theysa_session")
                .with_same_site_policy(SameSite::Strict);

            // bundle all layers into a service
            let middleware = tower::ServiceBuilder::new()
                .layer(session_layer)
                .layer(Extension(db));

            // build our application with some routes
            let app = router::get_router().layer(middleware);

            // run it with hyper
            axum::Server::builder(config.get_combined_bindings()?)
                .serve(app.into_make_service())
                .await
                .unwrap();
        }
        cli_args::OperationMode::AddToken => {
            todo!("adds a token");
        }
    }

    Ok(())
}
