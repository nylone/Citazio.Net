use anyhow::*;
use serde::Deserialize;
use std::{fs, path::PathBuf};
use url::Url;
use hyper::server::{accept::Accept, conn::AddrIncoming};
use std::{
    net::SocketAddr,
    pin::Pin,
    task::{Context as Ctx, Poll},
};

#[derive(Deserialize, Debug)]
// Webserver config
pub struct Config {
    db_url: Url,
    session_secret: String,
    bindings: Vec<SocketAddr>,
}

impl Config {
    pub fn parse(path: &PathBuf) -> Result<Self> {
        let content = fs::read_to_string(path).context(format_err!("Failed to read '{}'.", path.display()))?;
        toml::from_str(&content).context(format_err!("Failed to parse '{}'.", path.display()))
    }

    pub fn get_combined_bindings(&self) -> Result<CombinedIncoming> {
        // bind listen addresses
        let mut bindings: Vec<AddrIncoming> = Vec::new();
        for socket_addr in &self.bindings {
            bindings.push(AddrIncoming::bind(&socket_addr)?)
        }
        Ok(CombinedIncoming(bindings))
    }

    pub fn get_db_url(&self) -> &Url {
        &self.db_url
    }

    pub fn get_session_secret(&self) -> &String {
        &self.session_secret
    }
}

#[derive(Debug)]
pub struct CombinedIncoming (Vec<AddrIncoming>);

impl Accept for CombinedIncoming {
    type Conn = <AddrIncoming as Accept>::Conn;
    type Error = <AddrIncoming as Accept>::Error;

    fn poll_accept(
        mut self: Pin<&mut Self>,
        cx: &mut Ctx<'_>,
    ) -> Poll<Option<Result<Self::Conn, Self::Error>>> {
        for x in &mut self.0 {
            if let Poll::Ready(Some(value)) = Pin::new(x).poll_accept(cx) {
                return Poll::Ready(Some(value));
            }
        }

        Poll::Pending
    }
}