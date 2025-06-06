use solana_program::{account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::{ProgramResult},
    instruction::{AccountMeta, Instruction},
    program::invoke,
    pubkey::Pubkey
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {
    // create a pda onchain
    // pda, userAcc, systemProgram

    let mut iter = accounts.iter();
    let pda = next_account_info(iter);
    let user_acc = next_account_info(iter);
    let system_program = next_account_info(iter);
    let seeds = &[user_acc.key.as_ref(), b"user"];

    let (pda_public_key, bump) = Pubkey::find_program_address(seeds, program_id);

    let ix = create_account(
        user_acc.key,
        pda.key,
        1000000000,
        8,
        program_id
    );

    invoke_signed(&ix, accounts, &[&[seeds, &[bump]]]);

    Ok()
}