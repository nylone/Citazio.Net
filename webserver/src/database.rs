use anyhow::Result;
use anyhow::*;

pub use wrapper::DbWrapper;
mod wrapper {
    use anyhow::Result;
    use anyhow::*;
    use sqlx::mysql::*;
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

        pub(super) fn get_pool(&self) -> &MySqlPool {
            &self.0
        }
    }
}

impl DbWrapper {
    pub async fn add_user_credentials(&self, uname: &str, phc: &str, nick: &str) -> Result<()> {
        sqlx::query("INSERT INTO AUTH (UNAME, PHC, NICK) VALUES (?, ?, ?)")
            .bind(uname)
            .bind(phc)
            .bind(nick)
            .execute(self.get_pool())
            .await?;

        Ok(())
    }
}
