use anyhow::*;
use hyper::server::{accept::Accept, conn::AddrIncoming};
use serde::Deserialize;
use std::time::Duration;
use std::{fs, path::PathBuf};
use std::{
    net::SocketAddr,
    pin::Pin,
    task::{Context as Ctx, Poll},
};
use url::Url;

#[derive(Deserialize, Debug)]
// Webserver config
pub struct Config {
    pub db_url: Url,
    pub session_duration: Duration,
    pub session_secret: String,
    pub bindings: Vec<SocketAddr>,
}

impl Config {
    pub fn parse(path: &PathBuf) -> Result<Self> {
        let content = fs::read_to_string(path)
            .context(format_err!("Failed to read '{}'.", path.display()))?;
        let parsed = toml::from_str::<Self>(&content)
            .context(format_err!("Failed to parse '{}'.", path.display()))?;
        if parsed.session_secret.len() < 64 {
            bail!("Session secret must be at least 64 characters long.");
        } else {
            Ok(parsed)
        }
    }

    pub fn get_combined_bindings(&self) -> Result<CombinedIncoming> {
        // bind listen addresses
        let mut bindings: Vec<AddrIncoming> = Vec::new();
        for socket_addr in &self.bindings {
            bindings.push(AddrIncoming::bind(&socket_addr)?)
        }
        Ok(CombinedIncoming(bindings))
    }
}

#[derive(Debug)]
pub struct CombinedIncoming(Vec<AddrIncoming>);

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
