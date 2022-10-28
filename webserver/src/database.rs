use anyhow::*;
use sqlx::mysql::MySqlPoolOptions;
use sqlx::prelude::*;
use sqlx::MySqlPool;
use url::Url;

#[derive(Debug, Clone)]
pub struct DbWrapper(MySqlPool);

impl DbWrapper {
    pub async fn new(url: &Url) -> Result<Self> {
        let pool = MySqlPoolOptions::new()
            .max_connections(10)
            .connect(url.as_str())
            .await?;

        Ok(DbWrapper(pool))
    }

    pub fn get_pool(&self) -> &MySqlPool {
        &self.0
    }

    pub async fn add_user_credentials(
        &self,
        uname: &str,
        phc: &str,
        nick: &str,
        token: &str,
    ) -> Result<()> {
        sqlx::query!("call add_new_user(?, ?, ?, ?);", uname, phc, nick, token)
            .execute(self.get_pool())
            .await?;
        Ok(())
    }

    pub async fn get_user_phc(&self, uname: &str) -> Result<String> {
        let result = sqlx::query!("call get_phc_from_username(?);", uname)
            .fetch_optional(self.get_pool())
            .await?;
        if let Some(row) = result {
            Ok(row.get(0))
        } else {
            bail!("no user found")
        }
    }
}
