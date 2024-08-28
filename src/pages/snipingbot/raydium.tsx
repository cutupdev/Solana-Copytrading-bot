
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
import { useSharedContext } from '../../context/SharedContext';

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
    // @ts-ignore
    const { sharedValue, setSharedValue } = useSharedContext();
    const { tempWalletSeckey } = sharedValue;
    socketIo.on('message', (message) => {
        //  @ts-ignore
        setTxHistory([...txHistory, message])
        console.log('Message from server : ', message);
    })

    const onFinish: FormProps['onFinish'] = async (values) => {
        if (!didAllBuy) if (tokenAddr == "" || tokenAddr == null) {
            message.error("Input TokenAddress")
            return
        }


        const data = await post("/snipingbot/raydium/startbot", {
            tokenAddr: tokenAddr,
            buyAmount: buyAmount,
            tempWalletKey: tempWalletSeckey
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
                    label="Amount (SOL)"
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
            <Table dataSource={txHistory.map((ele, idx) => { })} columns={columns} />;
        </>
    )
}

export default RaydiumSniping