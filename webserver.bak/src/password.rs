use anyhow::{anyhow, Result};
use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use argon2::password_hash::rand_core::OsRng;
use argon2::password_hash::SaltString;

pub fn prepare_password(password: &str) -> Result<String> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    match argon2.hash_password(password.as_bytes(), &salt) {
        Ok(hash) => Ok(hash.to_string()),
        Err(err) => Err(anyhow!("an error occurred: {}", err.to_string())),
    }
}

pub fn verify_password(password: &str, phc: String) -> Result<bool> {
    match &PasswordHash::new(&phc) {
        Ok(phc) => match Argon2::default().verify_password(password.as_bytes(), phc) {
            Ok(_) => Ok(true),
            Err(_) => Ok(false),
        },
        Err(err) => Err(anyhow!("an error occurred: {}", err.to_string())),
    }
}
