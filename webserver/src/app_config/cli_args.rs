use clap::{Parser, ValueEnum};
use std::path::PathBuf;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
pub struct Args {
    /// Specify the config file location
    #[arg(short, long, default_value = "config.toml")]
    pub config: PathBuf,

    /// What should the app do
    #[arg(value_enum, short, long, default_value_t = OperationMode::StartServer)]
    pub mode: OperationMode,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord, ValueEnum)]
pub enum OperationMode {
    /// Start the webserver
    StartServer,
    /// Add a signup token to the database
    AddToken,
}
