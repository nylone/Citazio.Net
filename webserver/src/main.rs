use std::sync::Arc;

use anyhow::*;

mod db_wrapper;

#[tokio::main]
async fn main() -> Result<()> {
    // DB url needs to be extracted from a config file, for now this is the spec
    let db_url = "mysql://theysa_user:theysa_pass@localhost:3306/theysa_db";
    let db = Arc::new(db_wrapper::MysqlDbWrapper::new(db_url).await?);

    db_wrapper::add_user_credentials(&db, "test1", "1", "boh").await?;
    db_wrapper::add_user_credentials(&db, "test2", "1", "boh").await?;
    db_wrapper::add_user_credentials(&db, "test3", "1", "boh").await?;
    db_wrapper::add_user_credentials(&db, "test4", "1", "boh").await?;
    db_wrapper::add_user_credentials(&db, "test5", "1", "boh").await?;

    Ok(())
}