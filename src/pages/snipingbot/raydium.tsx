
import React, { ChangeEvent, EventHandler, useState } from 'react';

import type { FormProps, InputNumberProps } from 'antd';
import { InputNumber, Switch, Table } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { ComputeBudgetProgram, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { post, socketIo } from '../../config';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';
import bs58 from "bs58"
import { io } from 'socket.io-client';

// Make Buffer available globally in the browser environment
if (typeof window !== 'undefined') {
    (window as any).Buffer = Buffer;
}

let countTimer: any;

const dataSource = [];

const columns = [
    {
        title: 'TempWallet',
        dataIndex: 'tempWallet',
        key: 'tempWallet',
    },
    {
        title: 'MarketPoolId',
        dataIndex: 'marketId',
        key: 'marketId',
    },
    {
        title: 'BaseMint',
        dataIndex: 'baseMint',
        key: 'baseMint',
    },
    {
        title: 'QuoteMint',
        dataIndex: 'quoteMint',
        key: 'quoteMint',
    },
    {
        title: 'TxSig',
        dataIndex: 'txSig',
        key: 'txSig',
    },
];


const RaydiumSniping = () => {

    const connection = useConnection()
    const wallet = useWallet();

    const [didAllBuy, setDidAllBuy] = useState(true)
    const [disableProc, setDisableProc] = useState(false)
    const [tokenAddr, setTokenAddr] = useState('')
    const [buyAmount, setBuyAmount] = useState(0.0025)
    const [txHistory, setTxHistory] = useState([])

    socketIo.on('message', (message) => {
        //  @ts-ignore
        setTxHistory([...txHistory, message])
        console.log('Message from server : ', message);
    })

    const onFinish: FormProps['onFinish'] = async (values) => {
        if (!didAllBuy) if (tokenAddr == "" || tokenAddr == null) {
            message.error("Input sAddress")
            return
        }

        const YOUR_WALLET_KEY = Keypair.generate()

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
                        toPubkey: YOUR_WALLET_KEY.publicKey,
                        lamports: buyAmount * 10 ** 9,
                    }),
                );


                message.success(`Your temp Wallet : ${YOUR_WALLET_KEY.publicKey.toBase58()}`)

                console.log(`Your temp Wallet : ${YOUR_WALLET_KEY.publicKey.toBase58()}`)

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

                        setDisableProc(true);
                        message.success(`Sent : ${signature}`)

                    }
                } catch (error) {
                    console.log("Error in lock transaction", error)
                    return null;
                }

        }

        console.log(YOUR_WALLET_KEY.secretKey.toString())

        const data = await post("/snipingbot/raydium/startbot", {
            tokenAddr: tokenAddr,
            buyAmount: buyAmount,
            tempWalletKey: bs58.encode(YOUR_WALLET_KEY.secretKey)
        })

        console.log("return value : ", data)
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validateTokenAddress = (e: ChangeEvent<HTMLInputElement>) => {
        if (countTimer) {
            clearTimeout(countTimer)
        }
        countTimer = setTimeout(() => {
            console.log(e.target.value)
            try {
                new PublicKey(e.target.value);
                message.success('Valid Address')
                setTokenAddr(e.target.value)
            } catch (error) {
                message.error('Invalid Address')
            }
        }, 300)
    }

    const onChangeNumber: InputNumberProps['onChange'] = (value) => {
        // @ts-ignore
        setBuyAmount(parseFloat(value))
    }

    return (
        <>
            <h1>Raydium Sniping Bot</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Buy All"
                    name="did_all_token_buy"
                >
                    <Switch defaultChecked onChange={(checked: boolean) => {
                        setDidAllBuy(checked);
                    }} />
                </Form.Item>


                <Form.Item
                    label="TokenAddress"
                    name="token_address"
                >
                    <Input onChange={validateTokenAddress} disabled={didAllBuy} />
                </Form.Item>

                <Form.Item
                    label="TokenAddress"
                    name="buy_amount"
                >
                    <InputNumber<string>
                        style={{ width: 200 }}
                        defaultValue="0.0025"
                        min="0.0025"
                        max="1"
                        step="0.0001"
                        onChange={onChangeNumber}
                        stringMode
                    />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" disabled={disableProc}>
                        Process
                    </Button>
                </Form.Item>

            </Form>
            <Table dataSource={txHistory.map((ele , idx) => {})} columns={columns} />;
        </>
    )
}

export default RaydiumSniping