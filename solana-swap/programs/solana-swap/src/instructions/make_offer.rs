use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct MakeOffer {}

pub fn send_offered_tokens_to_vault(ctx: Context<Initialize>) -> Result<()> {
    msg!("Greetings from: {{:?}}", ctx.program_id);
    Ok(())
}
