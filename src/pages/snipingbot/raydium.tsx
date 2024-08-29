
import { ChangeEvent, useState } from 'react';

import type { FormProps, InputNumberProps } from 'antd';
import { InputNumber, Switch, Table } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { PublicKey } from '@solana/web3.js';
import { handleCopyToClipboard, post, socketIo } from '../../config';
import { Buffer } from 'buffer';
import { useSharedContext } from '../../context/SharedContext';

// Make Buffer available globally in the browser environment
if (typeof window !== 'undefined') {
    (window as any).Buffer = Buffer;
}

let countTimer: any;

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

    const onFinish: FormProps['onFinish'] = async () => {
        if (!didAllBuy) if (tokenAddr == "" || tokenAddr == null) {
            message.error("Input TokenAddress")
            return
        }


        const data = await post("/snipingbot/raydium/startbot", {
            tokenAddr: tokenAddr,
            buyAmount: buyAmount,
            tempWalletKey: tempWalletSeckey
        })

        setDisableProc(false)

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
            <Table dataSource={txHistory.map((ele, idx) => {
                const { tempWallet,
                    marketId,
                    baseMint,
                    quoteMint,
                    txSig } = ele
                console.log(tempWallet,
                    marketId,
                    baseMint,
                    quoteMint,
                    txSig)
                //  @ts-ignore
                return {
                    key: idx,
                    //  @ts-ignore
                    tempWallet: <p style={{ cursor: "pointer" }} onClick={() => handleCopyToClipboard(tempWallet)}>{String(tempWallet).slice(0, 9)} ... </p>,
                    //  @ts-ignore
                    marketId: <p style={{ cursor: "pointer" }} onClick={() => handleCopyToClipboard(marketId)}>{String(marketId).slice(0, 9)} ... </p>,
                    //  @ts-ignore
                    baseMint: <p style={{ cursor: "pointer" }} onClick={() => handleCopyToClipboard(baseMint)}>{String(baseMint).slice(0, 9)} ... </p>,
                    //  @ts-ignore
                    quoteMint: <p style={{ cursor: "pointer" }} onClick={() => handleCopyToClipboard(quoteMint)}>{String(quoteMint).slice(0, 9)} ... </p>,
                    //  @ts-ignore
                    txSig: <p style={{ cursor: "pointer" }} onClick={() => handleCopyToClipboard(txSig)}>{String(txSig).slice(0, 9)} ... </p>,
                }
            }
            )}
                columns={columns}
            />
        </>
    )
}

export default RaydiumSniping