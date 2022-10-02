use anyhow::*;
use sqlx::{mysql::*};
use anyhow::Result;

pub struct MysqlDbWrapper(MySqlPool);

impl MysqlDbWrapper {
    pub async fn new(url: &str) -> Result<Self> {
        let pool = MySqlPoolOptions::new()
            .max_connections(10)
            .connect(url).await?;
    
        Ok(MysqlDbWrapper(pool))
    }

    pub (super) fn get_pool(&self) -> &MySqlPool {
        &self.0
    }
}