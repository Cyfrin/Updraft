# Circle's Cross Chain Transfer Protocol (CCTP)

CCTP is Circle’s solution for moving USDC across different chains. For example, suppose we want to move USDC from Ethereum to Base, Optimism, or Arbitrum. With traditional crosschain transfers, we have the following problems that CCTP solves:

- Wrapped tokens:
  - Adding an additional IOU layer of risk
  - If bridges are compromised, IOUs are rendered worthless
- Liquidity problems:
  - Liquidity becomes fragmented since original tokens are locked, which is inefficient

CCTP solves the issues in the previous model with a burn and mint method. The protocol burns the USDC, thus taking it out of circulation on the source chain, and mints fresh tokens on the destination chain.

CCTP is also permissionless and includes sophisticated message passing between chains, which ensures every transfer is secure.

Now, here is how CCTP works on a deeper level. CCTP currently has two different methods for bridging USDC:

- Standard transfer
- Fast transfer
  The Standard transfer is available in both CCTP V1 and V2, and is the default method for transferring USDC across different blockchains. The protocol operates on the finality of transactions on the source chain. It uses Circle’s attestation service to enable “hard finality” transfers. The steps are as follows:
- Initiation
- Burning event
- Attestation
- Minting event
- Completion

The Fast transfer is available in CCTP V2 and is only available on testnet. For use cases where speed is a priority, it uses Circle’s attestation service as well as the “fast transfer allowance” enabling faster than finality or “soft finality” transfers.

Now, let's look at some code written in ethers to transfer USDC cross chain with CCTP:

```javascript
const { ethers } = require("ethers");
const dotenv = require("dotenv");
const tokenMessengerAbi = require("./abis/cctp/TokenMessenger.json");
const messageAbi = require("./abis/cctp/Message.json");
const usdcAbi = require("./abis/Usdc.json");
const messageTransmitterAbi = require("./abis/cctp/MessageTransmitter.json");

dotenv.config();

const main = async () => {
  const ethProvider = new ethers.providers.JsonRpcProvider(
    process.env.ETH_TESTNET_RPC
  );
  const baseProvider = new ethers.providers.JsonRpcProvider(
    process.env.BASE_TESTNET_RPC
  );

  // Wallets
  const ethWallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, ethProvider);
  const baseWallet = new ethers.Wallet(
    process.env.BASE_PRIVATE_KEY,
    baseProvider
  );

  // Testnet Contract Addresses
  const ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS =
    "0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5";
  const USDC_ETH_CONTRACT_ADDRESS =
    "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
  const ETH_MESSAGE_CONTRACT_ADDRESS =
    "0x80537e4e8bAb73D21096baa3a8c813b45CA0b7c9";
  const BASE_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS =
    "0x7865fAfC2db2093669d92c0F33AeEF291086BEFD";

  // Initialize contracts
  const ethTokenMessenger = new ethers.Contract(
    ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS,
    tokenMessengerAbi,
    ethWallet
  );
  const usdcEth = new ethers.Contract(
    USDC_ETH_CONTRACT_ADDRESS,
    usdcAbi,
    ethWallet
  );
  const ethMessage = new ethers.Contract(
    ETH_MESSAGE_CONTRACT_ADDRESS,
    messageAbi,
    ethWallet
  );
  const baseMessageTransmitter = new ethers.Contract(
    BASE_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
    messageTransmitterAbi,
    baseWallet
  );

  const mintRecipient = process.env.RECIPIENT_ADDRESS;
  const BASE_DESTINATION_DOMAIN = 6;
  const amount = process.env.AMOUNT;

  // Convert recipient address to bytes32
  const destinationAddressInBytes32 = await ethMessage.addressToBytes32(
    mintRecipient
  );

  // Approve
  const approveTx = await usdcEth.approve(
    ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS,
    amount
  );
  await approveTx.wait();
  console.log("ApproveTxReceipt:", approveTx.hash);

  // Burn USDC
  const burnTx = await ethTokenMessenger.depositForBurn(
    amount,
    BASE_DESTINATION_DOMAIN,
    destinationAddressInBytes32,
    USDC_ETH_CONTRACT_ADDRESS
  );
  await burnTx.wait();
  console.log("BurnTxReceipt:", burnTx.hash);

  // Retrieve message bytes
  const receipt = await ethProvider.getTransactionReceipt(burnTx.hash);
  const eventTopic = ethers.utils.id("MessageSent(bytes)");
  const log = receipt.logs.find((l) => l.topics[0] === eventTopic);
  const messageBytes = ethers.utils.defaultAbiCoder.decode(
    ["bytes"],
    log.data
  )[0];
  const messageHash = ethers.utils.keccak256(messageBytes);

  console.log("MessageBytes:", messageBytes);
  console.log("MessageHash:", messageHash);

  // Fetch attestation signature
  let attestationResponse = { status: "pending" };
  while (attestationResponse.status !== "complete") {
    const response = await fetch(
      `https://iris-api-sandbox.circle.com/attestations/${messageHash}`
    );
    attestationResponse = await response.json();
    await new Promise((r) => setTimeout(r, 2000));
  }

  const attestationSignature = attestationResponse.attestation;
  console.log("Signature:", attestationSignature);

  // Receive funds on BASE
  const receiveTx = await baseMessageTransmitter.receiveMessage(
    messageBytes,
    attestationSignature
  );
  await receiveTx.wait();
  console.log("ReceiveTxReceipt:", receiveTx.hash);
};

main().catch(console.error);
```

To better understand how ethers works, we encourage visiting their documentation. With CCTP, there are limits for burning and minting.
Circle itself has this “minter allowance”, which specifies a limit for the amount of USDC that can be minted. There is also a message burn limit. All the code above can be found in this github repo: https://github.com/ciaranightingale/cctp-v1-ethers, where more information can be found!

CCTP enables the following use cases:

- Fast crosschain rebalancing
- Enables composable cross-chain swaps
- Programmable purchases
