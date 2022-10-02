use anyhow::*;
use anyhow::Result;

mod pool;
pub use pool::MysqlDbWrapper;

// todo - remove this, it's just an example
pub async fn add_user_credentials(db: &MysqlDbWrapper, uname: &str, phc: &str, nick: &str) -> Result<()> {
    sqlx::query("INSERT INTO AUTH (UNAME, PHC, NICK) VALUES (?, ?, ?)")
    .bind(uname)
    .bind(phc)
    .bind(nick)
    .execute(db.get_pool())
    .await?; 
  
    Ok(())
}