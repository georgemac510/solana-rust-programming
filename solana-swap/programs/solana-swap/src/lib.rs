pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("7LrTs649PzzDqnuG997XZn3vHPtJSsu6SswZ2xjNS85W");

#[program]
pub mod solana_swap {
    use instruction::MakeOffer;

    use super::*;

    pub fn make_offer(ctx: Context<MakeOffer>) -> Result<()> {
        
        instructions::make_offer::send_offered_tokens_to_vault
        ()?;
        instructions::make_offer::save_offer();
    }
}
