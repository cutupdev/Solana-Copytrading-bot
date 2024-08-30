# Bot-Pad

This is the bundle project of Solana Trading Bots running on several Solana Dex Platform such as Pumpfun and Raydium.
This Bot consists of various Trading Bot like Sniping Bot and Volume Bot , Copytrading Bot ...

In this bot , I focus on two things:

- To Prevent Scamming : I know my people feel hesitating the usage of Bot.
In this bot , You use your temporary wallet which is used in Bot-Pad.
You can deposit your sol to this temp wallet as much as you want.
Deposit little Sol to temp wallet as little as you can run this bot once.
    
- High Quality : There are many aspects that determine the high quality. RPC and Code quality.
If you use custom RPC , you can speed up the Bot quality. 

### Structure

- Sniping Bot ( Raydium , Pumpfun )

- Volume Bot ( Raydium )

- Copytrading Bot ( Raydium )

- User Info

# Contact

- You can easily find me in [Discord](https://discordapp.com/users/471524111512764447) , [Telegram](https://t.me/soIkeen) , [X.com](https://x.com/solkeen) , [Live URL](https://bot-pad-frontend.vercel.app/)

### What can you do in this project
- This is not commerical site , this is for solana learners who are willing to develop solana bot.
- If you wanna have solana trading bot , I can customize it for your requirement.

#### Version Info
- v_1 : Raydium Sniping Bot
- v_2 : Raydium Volume Bot


## Code Explanation

Deposit Part to temp wallet:

- Sol Deposit Part with  `web3`

```js

const UserInfo = () => {
  ...
    try {
        transferTransaction.recentBlockhash = (await con.getLatestBlockhash()).blockhash
        transferTransaction.feePayer = wallet.publicKey
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
        }
    } catch (error) {
        return null;
    }
    try {
        const TEMP_WALLET_PUBKEY = new PublicKey(tempWalletPubkey)
        connection.connection.getBalance(TEMP_WALLET_PUBKEY)
            .then(temp => setBalance(temp / (10 ** 9)))
    } catch (error) {
        setBalance(0)
    }
 ...
};

```
Raydium Sniping bot:
- Interacting Part with  `/snipingbot/raydium/startbot`

```js

const RaydiumSniping = () => {
  ...
  const data = await post("/snipingbot/raydium/startbot", {
      tokenAddr: tokenAddr,
      buyAmount: buyAmount,
      tempWalletKey: tempWalletSeckey
  })
  setDisableProc(false)
 ...
};

```