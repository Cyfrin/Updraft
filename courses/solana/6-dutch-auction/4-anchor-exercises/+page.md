# Dutch Auction (Anchor)

In a Dutch auction, the seller sets a starting price.
The price decreases over time until the buyer buys.

Complete all tasks below
- Implement a Dutch auction program
- Test locally

# Update program id
```shell
anchor keys sync
```

# Task 1 - Implement [`init`](https://github.com/Cyfrin/solana-course/blob/main/apps/auction/anchor/exercise/programs/auction/src/lib.rs)

- Check sell token != buy token

- Check start price >= end price

- Check current timestamp <= start time < end time

- Check sell amount > 0

- Send sell token to `auction_sell_ata`

Call `lib::transfer` to send tokens

- Store Auction state

# Task 2 - Implement [`buy`](https://github.com/Cyfrin/solana-course/blob/main/apps/auction/anchor/exercise/programs/auction/src/lib.rs)

- Check auction has started

- Check auction has not ended

- Calculate price

Price should decrease linearly over time from `start_price` to `end_price`.

- Check current price is greater than or equal to `end_price`

- Check current price is less than or equal to `max_price`

- Calculate amount of buy token to send to seller

- Send buy token to seller

- Send sell token to buyer

Call `lib::transfer_from_pda` to send token to buyer

- Close `auction_sell_ata`

```shell
close_account(CpiContext::new_with_signer(
    ctx.accounts.token_program.to_account_info(),
    CloseAccount {
        account: ctx.accounts.auction_sell_ata.to_account_info(),
        destination: ctx.accounts.seller.to_account_info(),
        authority: ctx.accounts.auction.to_account_info(),
    },
    &[seeds],
))?;
```

# Task 3 - Implement [`cancel`](https://github.com/Cyfrin/solana-course/blob/main/apps/auction/anchor/exercise/programs/auction/src/lib.rs)

- Send sell token to seller

- Close `auction_sell_ata`

# Build

```shell
anchor build
```

# Test
```shell
anchor test
```

