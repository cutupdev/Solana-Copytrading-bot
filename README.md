# Solana Copytrading Bot

This is copy trading bot running on several solana dex platform - raydium, meteora, pumpfun, pumpswap.
This is basic version, not full version.
In this bot, it track the profitable bots fast and copytrack it.
If you want, I can offer full version and can develop customized advanced project[Advantage: GRPC for tx fetching, direct dex swap].
    


### Contact information:
Whatspp: https://wa.me/13137423660
Telegram: https://t.me/DevCutup
Twitter: https://twitter.com/januscutup



### What can you do in this project
This is not advanced project, but it will be basic knowledge for your solana bot study.
If you wanna have solana trading bot , I can customize it for your requirement.


### Test results
Target transaction: 
https://solscan.io/tx/3REXjQfCAGFvj3eYM6LEZrPVCbH3UNeBC1MW6eXTFqq9uamEhRNSfbLmjrkkj1GeDRajZLwQFFFV9FDDMHcu1Lhm

Copy transaction: 
https://solscan.io/tx/4ciUpbved6zjXxSRqnkhY4TeZvzsUVrJb4wdcWLAppJftwgNfMB8dFVHPPrKi3LRJgYuFVztdVCZSrXxzte2ftsj


## Advanced Version
In copy trading bot, there are two main things: 
one is fetching target wallet transaction and other one is copying target wallet transaction.
In the basic version, fetching target wallet tx is done by rpc websocket (300-500ms) but with the advanced version, I am using grpc for target wallet tx fetching, and it takes only 50-100ms.  Also in most of copy bots, they are using jupiter for swapping to copy target wallet transactions. Jupiter is good aggregator that is supporting swap, but it causes time latency. So with my new solution, I usually swap on dexs directly. If target wallet swap token on raydium pool, then my bot swap on raydium directly and it reduces latency absolutely. Of course, it needs more development time because it needs to interact several dexs directly, but otherwise using jupiter is too easy for development and understanding.


### Contact Information
- Telegram: https://t.me/DevCutup
- Whatsapp: https://wa.me/13137423660
- Twitter: https://x.com/devcutup
