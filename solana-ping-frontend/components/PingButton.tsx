import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import { FC, useState } from 'react';
import styles from '../styles/PingButton.module.css';

const PROGRAM_ID = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa';
const DATA_ACCOUNT_PUBKEY = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod';

export const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  // State variable to hold the transaction signature
  const [signature, setSignature] = useState<string | null>(null);

  const onClick = async () => {
    if (!connection || !publicKey) {
      console.log('Wallet not connected or invalid connection');
      return;
    }

    try {
      const programId = new web3.PublicKey(PROGRAM_ID);
      const programDataAccount = new web3.PublicKey(DATA_ACCOUNT_PUBKEY);
      const transaction = new web3.Transaction();

      // Fetch the latest blockhash
      const { blockhash } = await connection.getLatestBlockhash('confirmed');

      const instruction = new web3.TransactionInstruction({
        keys: [
          {
            pubkey: programDataAccount,
            isSigner: false,
            isWritable: true,
          },
        ],
        programId,
      });

      // Add the instruction to the transaction
      transaction.add(instruction);

      // Set blockhash and fee payer
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send and confirm the transaction
      const txSignature = await sendTransaction(transaction, connection);

      // Set the transaction signature in the state
      setSignature(txSignature);
    } catch (error) {
      console.error('Error sending transaction:', error);
      setSignature(null); // Clear signature on error
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={onClick}>Ping!</button>

      {signature && (
        <div className={styles.signature}>
          <p>Transaction Signature:</p>
          <a
            href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {signature}
          </a>
        </div>
      )}
    </div>
  );
};

