import * as web3 from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

const PING_PROGRAM_ADDRESS = new web3.PublicKey(
    "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa",
);
  const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
    "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
  
);

// Load keypair from environment
const payer = getKeypairFromEnvironment("SECRET_KEY");

// Establish connection to the Devnet
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

// Function to fetch and print wallet address and balance
async function printWalletDetails() {
  // Print wallet address (public key)
  console.log(`Wallet Address: ${payer.publicKey.toBase58()}`);

  // Fetch balance in SOL
  const balance = await connection.getBalance(payer.publicKey);
  console.log(`Wallet Balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);
}

// Call the function to print details
await printWalletDetails();

const transaction = new web3.Transaction();
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

const instruction = new web3.TransactionInstruction({
    keys: [
      {
        pubkey: pingProgramDataId,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
});

transaction.add(instruction);
 
const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer],
);
 
console.log(
    `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
);
