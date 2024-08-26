import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button, message } from 'antd';
import { useEffect } from "react";

const HeaderComponents = () => {

    const wallet = useWallet();
    const { setVisible } = useWalletModal();

    const handleConnect = () => {
        if (wallet.connected) {
            wallet.disconnect();
            message.success('Wallet disconnected!')
        } else {
            setVisible(true);
        }
    }


    useEffect(() => {
        if (wallet.connected) {
            message.success("Wallet connected!")
        }
    }, [wallet.connected])

    return (
        <>
            <a href="/">
                <h1>Bot Pad</h1>
            </a>

            <Button onClick={handleConnect}>{wallet.connected ? "Disconnect" : "Connet Wallet"}</Button>
        </>)
}

export default HeaderComponents