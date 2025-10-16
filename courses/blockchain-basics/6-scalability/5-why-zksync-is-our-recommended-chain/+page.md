## Why We Recommend zkSync Era for Smart Contract Development

Welcome to this lesson on why we have chosen zkSync Era as the primary blockchain for deploying smart contracts in this course. Before we dive in, it’s important for us to be transparent: zkSync is a kind sponsor of this educational content. However, our core principle at Cyfrin is that we only recommend tools, chains, and applications that we genuinely believe are the best for our students. We choose technologies we would use ourselves to help you become a top-tier smart contract developer.

With that in mind, let's explore the four primary reasons why zkSync Era, a Layer 2 ZK-Rollup, is our recommended platform for building and deploying decentralized applications.

### Uncompromising Security Inherited from Ethereum

The first and most critical advantage of building on zkSync Era is its security model. As a Layer 2 solution, zkSync’s security is directly inherited from the Ethereum mainnet. This means that if the Ethereum network ever identifies an issue and needs to roll back its state, the zkSync network will roll back in lockstep. You get the benefits of a scalable environment without sacrificing the battle-tested security of the world's leading smart contract platform.

Furthermore, zkSync is a ZK-Rollup, which stands for Zero-Knowledge Rollup. This architecture uses advanced cryptography in the form of "validity proofs" to guarantee the integrity of every transaction. When a bundle of transactions is submitted from zkSync (the L2) to Ethereum (the L1), it is accompanied by a cryptographic proof that mathematically verifies every single transaction in that bundle is correct and legitimate. This provides an exceptionally high degree of security and finality.

### Seamless EVM Compatibility

For developers, one of the most significant benefits of zkSync is its compatibility with the Ethereum Virtual Machine (EVM). This allows you to write your smart contracts in Solidity, the most widely used and well-supported language for smart contract development. You don't need to learn a new, niche programming language to start building.

The development process is nearly identical to building for Ethereum, with one minor difference in the compilation step. Instead of compiling your Solidity code to standard EVM bytecode, you use a specialized compiler called `zksolc`. This tool compiles your code into "EraVM bytecode," which is optimized for the zero-knowledge environment. This allows you to take existing Solidity smart contracts and deploy them to zkSync Era with minimal to no modifications. While there are a few small nuances to be aware of, we will guide you through them step-by-step in this course.

### Out-of-the-Box Ethereum Wallet Support

User experience is paramount for adoption, and zkSync excels here by working seamlessly with existing Ethereum wallets. Your users and you, as a developer, do not need to download or configure a special new wallet to interact with the zkSync network. It works flawlessly with popular wallets like MetaMask right out of the box.

Crucially, your wallet address on zkSync Era is the exact same as your address on the Ethereum mainnet. For the purposes of this course, the address you use on the zkSync Sepolia testnet will be identical to your address on the Ethereum Sepolia testnet. This consistency simplifies the onboarding process, removes friction for users, and makes development and testing much more straightforward.

### Future-Proofing with Low Costs and Scalability

Perhaps the most compelling reason to build on zkSync is for long-term scalability and cost-effectiveness. As a rollup, zkSync bundles many individual transactions into a single batch. This batch is then submitted to the Ethereum L1 as one transaction. The gas cost for that single L1 transaction is then shared across all the individual transactions within the bundle. The result is a dramatic reduction in transaction fees for each user, making your application affordable to use at scale.

This is a critical strategic advantage. Many projects that initially deploy directly on Ethereum L1 eventually face a scalability crisis. As their user base grows, high gas fees can make their application prohibitively expensive, forcing them to undergo a complex and costly migration to a Layer 2 solution.

By starting on zkSync from day one, you are future-proofing your protocol. You are building on a platform designed for growth. As your application and user base expand, you won't be constrained by high transaction costs or forced into a difficult migration. This forward-thinking approach protects both your project and your users from the scalability challenges that have plagued many successful Ethereum applications.

While we highly recommend zkSync, the skills you learn here are transferable. You are free to deploy your contracts to other popular EVM-compatible rollups like Arbitrum, Optimism, or Scroll. Now that you understand what Layer 2s and rollups are—and the specific benefits of zkSync—you are well-equipped to make the best architectural decisions for your projects.