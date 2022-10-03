use serde::Deserialize;
use toml::Value;
use std::fs;
use anyhow::Result;

#[derive(Deserialize, Debug)]
// Webserver config
struct Config {
    url: String,
    port: u16,
    user: String,
    password: String,
    dbname: String,
    bindings: Vec<std::net::SocketAddr>,
}

// Parses the config of the web server into a structure
pub fn parse_config(filename: &str) -> Result<()>{  // It could also not accept a filename as an argument, dunno
    // reads the content of the file
    let content = fs::read_to_string(filename)?;
    let config = toml::from_str(&content)?;

    eprintln!("{:?}", config);

    Ok(())
}