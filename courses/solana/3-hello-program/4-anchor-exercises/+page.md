# Hello Solana (Anchor)

Create an empty folder and complete all tasks below
- Build
- Test locally
- Deploy to Devnet

# Build

Initialize a new Anchor project in an empty folder
```shell
anchor init hello --test-template rust
```

Optionally update program id
```shell
anchor keys sync
```

```shell
anchor build
```

# Test

```shell
anchor test
```

Sometimes test fails for no apparent reason. Usually resetting Anchor fixes the issue.

```shell
anchor clean
```

# Deploy to Devnet

Update `Anchor.toml`, set `cluster` to `Devnet`
```
[provider]
cluster = "Devnet"
wallet = "~/.config/solana/id.json"
```

```shell
solana config set -ud

solana balance
# Airdrop if wallet balance is low
solana airdrop 1

anchor build

anchor deploy
```

Close program to reclaim SOL
```shell
solana program close $PROGRAM_ID
```
