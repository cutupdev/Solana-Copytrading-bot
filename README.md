# Solana Copytrading Bot

This is copy trading bot running on several solana dex platform - raydium, meteora, pumpfun, pumpswap.
To boost bot speed and performance, I have updated bot using Rust programming language.
In this bot, it tracks the profitable bots fast and copytrade it.
If you want, I can offer full version and can develop customized advanced project[Advantage: GRPC for tx fetching, direct dex swap, Rust language].



## Advanced Version
In copy trading bot, there are two main things: 
one is fetching target wallet transaction and other one is copying target wallet transaction.
In the basic version, fetching target wallet tx is done by rpc websocket (300-500ms) but with the advanced version, I am using grpc for target wallet tx fetching, and it takes only 50-100ms.  Also in most of copy bots, they are using jupiter for swapping to copy target wallet transactions. Jupiter is good aggregator that is supporting swap, but it causes time latency. So with my new solution, I usually swap on dexs directly. If target wallet swap token on raydium pool, then my bot swap on raydium directly and it reduces latency absolutely. Of course, it needs more development time because it needs to interact several dexs directly, but otherwise using jupiter is too easy for development and understanding.



---

## Directory Structure

```
src/
├── core/
│   ├── token.rs        # Token definitions and handle
│   └── tx.rs           # Transaction handle
|   └── mod.rs          # mod file
| 
├── engine/
│   ├── swap.rs         # Token swap(buy/sell) functionalities in various Dexs
│   └── monitor.rs      # Target wallet monitoring(and parse tx) in Dexs using geyser rpc, and normal rpc
|   └── mod.rs          # mod file
│       
├── dex/
│   ├── pump_fun.rs     # Pump.fun
│   ├── raydium.rs      # Raydium
│   ├── meteora.rs      # Meteora
│   └── pumpswap.rs     # Pumpswap
|   └── mod.rs          # mod file
│
├── services/
│   ├── jito.rs         # Jito service provides ultra-fast transaction confirmation
│   └── nextblock.rs    # NextBlock service provides the ultra-fast transaction confirmation in unique way
|
├── common/
|    ├── logger.rs      # Handles logging to be clean and convenient to monitor.
|    ├── config.rs      # Handles project configurations such as environment variables and constants.
|    ├── constants.rs   # Stores global constants used across the project.
|    ├── targetlist.rs  # Manages lists of targets such as URLs or files.
|    └── utils.rs       # Utility functions used across the project, including input/output operations, string manipulation, etc.
|    └── mod.rs         # mod file
│
├── lib.rs
└── main.rs
```
---
    


### How To Run
1. Environment Variables Settings
```plaintext
PRIVATE_KEY=your_private_key_here
RPC_HTTPS=https://mainnet.helius-rpc.com/?api-key=your_api_key_here
RPC_WSS=wss://atlas-mainnet.helius-rpc.com/?api-key=your_api_key_here
SLIPPAGE=10
JITO_BLOCK_ENGINE_URL=https://ny.mainnet.block-engine.jito.wtf
JITO_TIP_STREAM_URL=ws://bundles-api-rest.jito.wtf/api/v1/bundles/tip_stream
JITO_TIP_PERCENTILE=50
JITO_TIP_VALUE=0.004
TOKEN_PERCENTAGE=1 #percentage
```
2. List target wallet address into `targetlist.txt`.
3. Run `trial/solana-copytrading-trial.exe`.



### Test results
#### Buy
* target: https://solscan.io/tx/5aaQDtXjyf4NDF3NKjjmC5s6Y8AhW3ieTpmB6Kxt6UGC2AowJ2xRTzFJo7KM4CVcpbphA2w76juGDdvqqgNTt1CF
* copied: https://solscan.io/tx/4uPU2BRi7BJCTxp4kJQFTmLj5pmoAyKw7zCHNCPiP2NYK2HcqXfJr8gE6eF89VYPEy5VTFaRQf4DTUZNzttFQ73Z
#### Sell
* target: https://solscan.io/tx/22qnz4aBXqmeQbp6cnAogSVPNxSbEJr7tswch5QXLSG8Rvnb4SwDJFJ9RytpUVkUUQUtiy44fYwafF5CgiYjdVtp
* copied: https://solscan.io/tx/3uBU12fQT14z88tiX1i1EH8XWXpFco4dU1QG8VEtYQyXtaSQXQB6AR7HBF4GtF9YDCa54Uw4xE7H7JPjBM9cETKM



### Same Block(Using validator)
- Target: https://solscan.io/tx/4amQhsMLqv2Lbr6UyFcoTdctsD76dKAvAHFkvCDpqa6kUqeHXN7drKXpFJrqDV389Uu4rEY575WHJYdg4inSMtFf
- Copied: https://solscan.io/tx/57P2bZGJ5QTThjT4jv88CXEU4oGDTgVaS2c386qBMEs2KkizN2PV7cKKZgS8uvWwPQyTpBUXTTfnjJ4dECuJf39t
- Dexscreener: https://dexscreener.com/solana/JD3VPqQ7pfHZ4h2zhALfvz5E7dantyVpsDUov1Lgpump
- Wallet: https://gmgn.ai/sol/address/D3QXckXy26G6rTnqHQFUxvwpRsv18o5wBrHMVoodYWTa



### Contact Information
- Telegram: https://t.me/DevCutup
- Whatsapp: https://wa.me/13137423660
- Twitter: https://x.com/devcutup
