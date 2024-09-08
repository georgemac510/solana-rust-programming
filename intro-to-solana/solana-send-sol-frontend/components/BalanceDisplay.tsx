import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { FC, useEffect, useState } from 'react';

export const BalanceDisplay: FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        if (!connection || !publicKey) { return; }

        // Update balance after any account change
        connection.onAccountChange(
            publicKey,
            (updatedAccountInfo) => {
                setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
            },
            'confirmed'
        );

        // Fetch the initial balance
        connection.getAccountInfo(publicKey).then(info => {
            if (info) {
                setBalance(info.lamports / LAMPORTS_PER_SOL);
            }
        });
    }, [connection, publicKey]);

    return (
        <div>
            <p>
                {publicKey ? `Balance: ${(balance).toFixed(4)} SOL` : 'Connect your wallet to view balance'}
            </p>
        </div>
    );
};
