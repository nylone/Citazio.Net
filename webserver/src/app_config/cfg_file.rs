use serde::Deserialize;
use std::{fs, path::PathBuf};
use anyhow::*;
use url::Url;

#[derive(Deserialize, Debug)]
// Webserver config
pub struct Config {
    pub db_url: Url,
    pub binding: std::net::SocketAddr,
}

impl Config {
    pub fn parse(path: &PathBuf) -> Result<Self> {
        let content = fs::read_to_string(path).context(format_err!("Failed to read '{}'.", path.display()))?;
        toml::from_str(&content).context(format_err!("Failed to parse '{}'.", path.display()))
    }
}