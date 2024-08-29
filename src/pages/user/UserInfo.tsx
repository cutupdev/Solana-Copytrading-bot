import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button, Form, FormProps, Input, InputNumber, InputNumberProps, message } from "antd";
import { useSharedContext } from "../../context/SharedContext";
import { useEffect, useState } from "react";
import { ComputeBudgetProgram, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const UserInfo = () => {

    // @ts-ignore
    const { sharedValue, setSharedValue } = useSharedContext();
    const { tempWalletPubkey } = sharedValue;
    const connection = useConnection()

    console.log("UserInfo", sharedValue)
    const wallet = useWallet();
    const [buyAmount, setBuyAmount] = useState(0)
    const [balance, setBalance] = useState(0)

    const onFinish: FormProps['onFinish'] = async () => {

        const TEMP_WALLET_PUBKEY = new PublicKey(tempWalletPubkey)

        if (wallet.publicKey == null) {
            message.error("Connect Wallet")
        } else {
            console.log(" +++++++++++++++++++++++++++++++++++++ ")

            const transferTransaction = new Transaction()
                .add(
                    ComputeBudgetProgram.setComputeUnitLimit({ units: 100_000 }),
                    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 200_000 })
                )
            console.log(" +++++++++++++++++++++++++++++++++++++ ")

            transferTransaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: TEMP_WALLET_PUBKEY,
                    lamports: buyAmount * 10 ** 9,
                }),
            );


            message.success(`Your temp Wallet : ${TEMP_WALLET_PUBKEY.toBase58()}`)

            console.log(`Your temp Wallet : ${TEMP_WALLET_PUBKEY.toBase58()}`)

            const con = connection.connection

            console.log(con)
            try {
                transferTransaction.recentBlockhash = (await con.getLatestBlockhash()).blockhash
                transferTransaction.feePayer = wallet.publicKey
                console.log(await con.simulateTransaction(transferTransaction))
                if (wallet.signTransaction) {
                    const signedTx = await wallet.signTransaction(transferTransaction)
                    const sTx = signedTx.serialize()
                    const signature = await con.sendRawTransaction(sTx, { skipPreflight: true })

                    const blockhash = await con.getLatestBlockhash()
                    await con.confirmTransaction({
                        signature,
                        blockhash: blockhash.blockhash,
                        lastValidBlockHeight: blockhash.lastValidBlockHeight
                    }, "confirmed");
                    console.log("Successfully initialized.\n Signature: ", signature);

                    message.success(`Sent : ${signature}`)

                }
            } catch (error) {
                console.log("Error in lock transaction", error)
                return null;
            }

        }
    };

    useEffect(() => {
        try {
            const TEMP_WALLET_PUBKEY = new PublicKey(tempWalletPubkey)
            connection.connection.getBalance(TEMP_WALLET_PUBKEY)
                .then(temp => setBalance(temp / (10 ** 9)))
        } catch (error) {
            setBalance(0)
        }


    }, [tempWalletPubkey])


    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeNumber: InputNumberProps['onChange'] = (value) => {
        // @ts-ignore
        setBuyAmount(parseFloat(value))
    }

    return (
        <>
            <h1>User Info</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                autoComplete="off"
            >

                <Form.Item
                    label="Temp Wallet"
                    name="temp_wallet"
                >
                    <Input disabled style={{ color: "black" }} placeholder={tempWalletPubkey} />
                </Form.Item>

                <Form.Item
                    label="Balance"
                    name="balance"
                >
                    <Input disabled style={{ color: "black" }} placeholder={`${balance}`} />
                </Form.Item>

                <Form.Item
                    label="Transfer Amount"
                    name="buy_amount"
                >
                    <InputNumber<string>
                        style={{ width: 200 }}
                        defaultValue="0"
                        min="0.0001"
                        step="0.0001"
                        onChange={onChangeNumber}
                        stringMode
                    />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" >
                        Transfer
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
}

export default UserInfo