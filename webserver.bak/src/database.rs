use std::fmt;

use anyhow::*;
use sqlx::mysql::MySqlPoolOptions;
use sqlx::MySqlPool;
use sqlx::mysql::MySqlRow;
use sqlx::prelude::*;
use url::Url;

#[derive(Debug, Clone)]
pub struct DbWrapper(MySqlPool);

pub struct Board {
    id: u64,
    name: String,
    path: String,
    access_lvl: u8,
}

impl fmt::Display for Board {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "({}, {}, {}, {})", self.id, self.name, self.path, self.access_lvl)
    }
}

impl DbWrapper {
    pub async fn new(url: &Url) -> Result<Self> {
        let pool = MySqlPoolOptions::new()
            .max_connections(10)
            .connect(url.as_str())
            .await?;

        Ok(DbWrapper(pool))
    }

    fn get_pool(&self) -> &MySqlPool {
        &self.0
    }

    pub async fn get_user_id(&self, username: String) -> u64 {
        let row: MySqlRow = sqlx::query!("call get_user_id(?);", username)
            .fetch_one(self.get_pool())
            .await.unwrap();
        row.get("user_id")
    }

    pub async fn add_user_credentials(
        &self,
        uname: &str,
        phc: &str,
        nick: &str,
        token: Option<String>,
    ) -> Result<()> {
        sqlx::query!("call add_user(?, ?, ?, ?);", uname, phc, nick, token)
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

    pub async fn get_public_boards(&self, userid: u64) -> Vec<Board> {
        let result: Vec<MySqlRow> = sqlx::query!("call get_public_boards(?);", userid)
            .fetch_all(self.get_pool())
            .await.unwrap();
        result.into_iter().map(|row| {
            Board{
                id: row.get("board_id"),
                name: row.get("name"),
                path: row.get("path"),
                access_lvl: 0
            }
        }).collect()
    }

    pub async fn get_own_boards(&self, userid: u64) -> Vec<Board> {
        let result: Vec<MySqlRow> = sqlx::query!("call get_own_boards(?);", userid)
            .fetch_all(self.get_pool())
            .await.unwrap();
        result.into_iter().map(|row| {
            Board{
                id: row.get("board_id"),
                name: row.get("name"),
                path: row.get("path"),
                access_lvl: 0
            }
        }).collect()
    }

    pub async fn get_subscribed_boards(&self, userid: u64) -> Vec<Board> {
        let result: Vec<MySqlRow> = sqlx::query!("call get_subscribed_boards(?);", userid)
            .fetch_all(self.get_pool())
            .await.unwrap();
        result.into_iter().map(|row| {
            Board{
                id: row.get("board_id"),
                name: row.get("name"),
                path: row.get("path"),
                access_lvl: row.get("access_lvl"),
            }
        }).collect()
    }
}
