import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as web3 from '@solana/web3.js';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FC, useState } from 'react';
import styles from '../styles/Home.module.css';

export const SendSolForm: FC = () => {
    const [txSig, setTxSig] = useState<string>('');
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const link = () => {
        return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : '';
    };

    const sendSol = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!connection || !publicKey) {
            console.log('Wallet not connected or invalid connection');
            return;
        }

        try {
            const transaction = new web3.Transaction();
            const recipientPubKey = new web3.PublicKey((event.target as any).recipient.value);
            const amount = parseFloat((event.target as any).amount.value) * LAMPORTS_PER_SOL;

            // Add SOL transfer instruction
            const sendSolInstruction = web3.SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipientPubKey,
                lamports: amount,
            });

            transaction.add(sendSolInstruction);

            // Fetch the latest blockhash and set it on the transaction
            const { blockhash } = await connection.getLatestBlockhash('confirmed');
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;

            // Send transaction
            const signature = await sendTransaction(transaction, connection);
            setTxSig(signature);

            console.log(`Transaction sent with signature: ${signature}`);
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    };

    return (
        <div>
            {publicKey ? (
                <form onSubmit={sendSol} className={styles.form}>
                    <label htmlFor="amount">Amount (in SOL) to send:</label>
                    <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                    <br />
                    <label htmlFor="recipient">Send SOL to:</label>
                    <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                    <button type="submit" className={styles.formButton}>Send</button>
                </form>
            ) : (
                <span>Connect Your Wallet</span>
            )}

            {txSig && (
                <div>
                    <p>View your transaction on </p>
                    <a href={link()} target="_blank" rel="noopener noreferrer">Solana Explorer</a>
                </div>
            )}
        </div>
    );
};
