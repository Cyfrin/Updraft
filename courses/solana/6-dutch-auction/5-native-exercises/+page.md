# Dutch Auction (Native)

This program will create a Dutch auction.
Seller sells token on a Dutch auction.
Price of the token decreases linearly over time.
Auction ends when a buyer buys.

Complete all tasks below
- Implement the Dutch auction program
- Test locally with LiteSVM
- Deploy locally to `solana-test-validator` and test with Rust script

*** Hint ***
See [`instructions/lib.rs`](https://github.com/Cyfrin/solana-course/blob/main/apps/auction/native/exercise/src/instructions/lib.rs) for token helpers.

# Task 1 - Implement [`instructions::init`](https://github.com/Cyfrin/solana-course/blob/main/apps/auction/native/exercise/src/instructions/init.rs)

- Check seller is signer
- Check that `auction_pda` matches expected PDA
- Check that `auction_sell_ata`
- Check that `seller_sell_ata`
- Check that sell token != buy token
- Check that `start_price` >= `end_price`
- Check that `now` <= `start_time` < `end_time`
- Check `sell_amt` > 0
- Create PDA account to store `Auction` state
- Create an associated token account for `auction_pda` to store `mint_sell` transferred from the seller.
- Send sell token to `auction_sell_ata` (associated token account of `auction_pda`)
- Store `Auction` state

# Task 2 - Implement [`instructions::buy`](https://github.com/Cyfrin/solana-course/blob/main/apps/auction/native/exercise/src/instructions/buy.rs)

- Check buyer is signer
- Check that `auction_pda` matches expected PDA
- Check that `auction_sell_ata` matches calculated account
- Check that `buyer_sell_ata` matches calculated account
- Check that `buyer_buy_ata` matches calculated account
- Check that `seller_buy_ata` matches calculated account
- Check that auction has started
- Check that auction has not ended
- Calculate the current price
- Check current price is greater than or equal to `end_price`
- Check current price is less than or equal to `max_price`
- Calculate amount of buy token to send to seller
- Send buy token to seller
- Send sell token to buyer
- Close `auction_sell_ata`
- Close `auction_pda`

# Task 3 - Implement [`instructions::cancel`](https://github.com/Cyfrin/solana-course/blob/main/apps/auction/native/exercise/src/instructions/cancel.rs)
- Check seller is signer
- Check that `auction_pda` matches expected PDA
- Check that `auction_sell_ata` matches calculated account
- Check that `buyer_sell_ata` matches calculated account
- Get sell amount locked in `auction_sell_ata`
- Send sell token to seller
- Close `auction_sell_ata`
- Close `auction_pda`

# Build

```shell
cargo build-sbf
```

# Test
```shell
cargo test -- --nocapture
```

# Test with script

Run local validator
```shell
solana config set -ul
solana-test-validator
```

Deploy program
```shell
solana program deploy ./target/deploy/auction.so
```

Execute demo script
```shell
PROGRAM_ID=your program ID
RPC=http://localhost:8899
KEYPAIR=path to key pair

cargo run --example demo $KEYPAIR $RPC $PROGRAM_ID
```

