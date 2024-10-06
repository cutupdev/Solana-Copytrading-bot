# Bot-Pad v_1

This is the bundle project of Solana Trading Bots running on several Solana Dex Platform such as Pumpfun and Raydium.
This Bot consists of various Trading Bot like Sniping Bot and Volume Bot , Copytrading Bot ...

In this bot , I focus on two things:

- To Prevent Scamming : I know my people feel hesitating the usage of Bot.
In this bot , You use your temporary wallet which is used in Bot-Pad.
You can deposit your sol to this temp wallet as much as you want.
Deposit little Sol to temp wallet as little as you can run this bot once.
    
- High Quality : There are many aspects that determine the high quality. RPC and Code quality.
If you use custom RPC , you can speed up the Bot quality.

- I'm not frontend Dev and sorry for poor UI, I used to develop node , telegram bot.

<h4> 📞 Cᴏɴᴛᴀᴄᴛ ᴍᴇ Oɴ ʜᴇʀᴇ: 👆🏻 </h4>

<p> 
    <a href="mailto:nakao95911@gmail.com" target="_blank">
        <img alt="Email"
        src="https://img.shields.io/badge/Email-00599c?style=for-the-badge&logo=gmail&logoColor=white"/>
    </a>
     <a href="https://x.com/_wizardev" target="_blank"><img alt="Twitter"
        src="https://img.shields.io/badge/Twitter-000000?style=for-the-badge&logo=x&logoColor=white"/></a>
    <a href="https://discordapp.com/users/471524111512764447" target="_blank"><img alt="Discord"
        src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/></a>
    <a href="https://t.me/wizardev" target="_blank"><img alt="Telegram"
        src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white"/></a>
</p>

### Structure

- Sniping Bot ( Raydium , Pumpfun )
![Screenshot_1](https://github.com/user-attachments/assets/0bf18a48-99c8-4a86-bf8b-8c8825ba4406)
- Volume Bot ( Raydium )

- Copytrading Bot ( Raydium )

- User Info
![Screenshot_2](https://github.com/user-attachments/assets/f29b5154-67de-4f52-ba28-c5e7f7b18236)
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
