import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button, Input, message } from 'antd';
import { useEffect } from "react";
import { post } from "../config";
import { Keypair } from "@solana/web3.js";
import { useSharedContext } from "../context/SharedContext";
import bs58 from "bs58"

const HeaderComponents = () => {

    // @ts-ignore
    const { sharedValue, setSharedValue } = useSharedContext();
    const {tempWalletPubkey} = sharedValue;
    const wallet = useWallet();
    const { setVisible } = useWalletModal();

    console.log(sharedValue)

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
            post("/key", { key: wallet.publicKey?.toBase58() })
                .then(key => {
                    const exportTempKey = key.data.temp_pubkey;
                    const exportTempPubKey = Keypair.fromSecretKey(bs58.decode(exportTempKey)).publicKey.toBase58()

                    setSharedValue({
                        ...sharedValue,
                        tempWalletPubkey: exportTempPubKey,
                        tempWalletSeckey: exportTempKey
                    })
                })
        } else {
            setSharedValue({
                ...sharedValue,
                tempWalletPubkey: "",
                tempWalletSeckey: ""
            })
        }
    }, [wallet.connected])

    return (
        <>
            <a href="/">
                <h1>Bot Pad</h1>
            </a>

            <div>
                <Input placeholder="Your Temp Wallet Address" style={{ width: "370px", marginRight: "25px", color: "white" }} disabled value={tempWalletPubkey} />
                <Button onClick={handleConnect}>{wallet.connected ? "Disconnect" : "Connet Wallet"}</Button>
            </div>
        </>)
}

export default HeaderComponents