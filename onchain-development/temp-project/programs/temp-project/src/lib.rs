use anchor_lang::prelude::*;

declare_id!("F3fC8WAy8iLH6gnAVvHciwb65hnuMLUcAQDympjTVLBu");

#[program]
pub mod temp_project {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
