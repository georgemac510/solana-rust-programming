import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// Hardcoded recipient address
const recipientPubkeyString = "4XNK7FmcJws1KWGqxEnrEDNPNYAfYpJB18kYUHM5G9nA";

// Load the sender's keypair from the environment
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

// Convert the recipient string to a PublicKey object
const toPubkey = new PublicKey(recipientPubkeyString);

console.log(`Recipient Public Key: ${recipientPubkeyString}`);

// Establish connection to the Solana Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(`✅ Loaded sender's keypair, destination public key, and connected to Solana`);

const transaction = new Transaction();

// Amount to send in lamports (1 SOL = 1 billion lamports)
const LAMPORTS_TO_SEND = 50000000; // 0.005 SOL

// Create the transaction instruction to send SOL
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

// Add the instruction to the transaction
transaction.add(sendSolInstruction);

// Send and confirm the transaction
const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

// Log the result
console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} lamports to the address ${toPubkey.toBase58()}.`);
console.log(
  `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
);
