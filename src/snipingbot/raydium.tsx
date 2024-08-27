
import React, { ChangeEvent, EventHandler, useState } from 'react';

import type { FormProps, InputNumberProps } from 'antd';
import { InputNumber, Switch, Table } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { PublicKey } from '@solana/web3.js';
import { post } from '../config';

let countTimer: any;

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];


const RaydiumSniping = () => {

    const [didAllBuy, setDidAllBuy] = useState(true)
    const [tokenAddr, setTokenAddr] = useState('')
    const [buyAmount, setBuyAmount] = useState(0.0001)

    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Success:', values);
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

    const startProcess = async () => {
        if (!didAllBuy) if (tokenAddr == "" || tokenAddr == null) {
            message.error("Input sAddress")
            return
        }

        await post("/snipingbot/raydium/startbot", {
            tokenAddr: tokenAddr,
            buyAmount: buyAmount
        })

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
                        defaultValue="0.0001"
                        min="0.0001"
                        max="0.1"
                        step="0.0001"
                        onChange={onChangeNumber}
                        stringMode
                    />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={startProcess}>
                        Process
                    </Button>
                </Form.Item>

            </Form>
            <Table dataSource={dataSource} columns={columns} />;
        </>
    )
}

export default RaydiumSniping