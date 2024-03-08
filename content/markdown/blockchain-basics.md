---
id: 32bb0733-5e24-4b43-959f-76f85d2bb5c6
blueprint: course
title: "Blockchain Basics"
updated_at: 1706012013116
github_url: "https://github.com/Cyfrin/path-solidity-developer-2023"
preview_image: https://res.cloudinary.com/droqoz7lg/image/upload/v1701193477/updraft/courses/nq7uojmdogr2dijnokng.png
duration: 3
description: |-
        Kickstart your web3 career. Start from the complete blockchain fundamentals and build your knowledge from here!
overview: |-
        What is a blockchain, How do blockchains work, Proof of work, smart contracts basics, blockchain transactions
preRequisites: |-
    
authors:
  - content/authors/patrick-collins.json
sections:
  -
    title: "Blockchain Basics"
    slug: basics
    lessons:
      -
        type: new_lesson
        enabled: true
        id: a0e53ee0-46d4-4bde-aa69-1300180d41a3
        title: "Welcome to Updraft!"
        slug: welcome-to-updraft
        duration: 14
        video_url: "YM00LkWhjJoEHyCGkjak021uRZSdofTZwBWLa7h01026k00I"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/1-welcome/+page.md"
        description: |-
                    Welcome to the course!
        markdown_content: |-
          ***
          
          ## title: Welcome to the course!
          
          *Follow along with this video:*
          
          ***
          
          *Quick tip, we will be constantly using resources from the [GitHub Repo](https://github.com/Cyfrin/foundry-full-course-f23/)*
          
          ### Welcome to Cyfrin Updraft!
          
          Hello and welcome! If you're interested in the world of Web3 development, then you're in the right place. This is the most cutting edge and comprehensive course ever created.
          
          Let's talk about what to expect!
          
          ### Why Take This Course?
          
          With the massive demand for Solidity and Smart Contract developers, this course is a golden opportunity to launch, advance, or switch to a career in Web3. As you navigate the course, you will learn how to work with AI tools so that you can fast-track your learning journey and become a proficient `10x` developer.
          
          Don't worry if you've never coded before, let me assure you that this course is designed for learners at all levels. If you're an experienced Smart Contract engineer or familiar with blockchain development, you're welcome to skip around and cherry-pick modules that interest you. But most importantly, this course aims to turn you into a pioneering force within Web3.
          
          ### Who Am I?
          
          My name is Patrick Collins, a seasoned Smart Contract engineer, security researcher, and dedicated advocate for Web3. I co-founded Cyfrin, a Smart Contract Security firm, I'm an average Web3 [YouTuber](https://www.youtube.com/c/patrickcollins) and the co-creator of Cyfrin Updraft.
          
          I live and breathe smart contract development.
          
          But beyond that, I love taking passionate smart contract developers, like you, into the journey of Web3.
          
          ### What to Expect
          
          This is not your run-of-the-mill course. Instead, it's a culmination of all the knowledge we've accumulated after years of working in this industry as a Smart Contract developers and security researchers. Our track record guarantees you'll exit the other side, armed with the knowledge necessary to make a significant impact in the cryptocurrency and blockchain industry.
          
          Beyond just teaching you to code, this course prepares you to maneuver DeFi, NFTs, DAOs, Tokens, Upgradeable Smart Contracts and more. By the end, you'll have a clear path forward and a wealth of economic opportunities at your disposal – all you need is the willingness to take the steps.
          
          ### Best Practices
          
          <img src="/blockchain-basics/git-repo.png" style="width: 100%; height: auto;" alt="git repo">
          
          Let's start by covering some of the best practices to help you get the absolute most out of this course.
          
          **[Use the GitHub repo as your Bible!](https://github.com/Cyfrin/foundry-full-course-f23/)** it will have all the resources you'll need to succeed. Contained within, you'll find a `discussions` tab. Any questions you have or hurdles you face can be posted here!
          
          **Ask meaningful questions and interact with like-minded learners** – this is just as important as grasping the actual technologies.
          
          **Code along with me** - As we progress through the course, it's a good idea to code along with me. Actually *doing* the work and performing the actions is how you'll build familiarity with these processes and how they'll really stick.
          
          **Watch for Updates** - This space moves very quickly - as things are updated, I do my best to catalogue them in **[Chronological Updates](https://github.com/Cyfrin/foundry-full-course-f23/blob/main/chronological-updates.md)** in our GitHub Repo. Reference here if it seems like something is out of date!
          
          **Move at your Pace** - Adjust the pace of the course to meet your needs. The course is modular, so if you want to skip to particular areas - absolutely do that.
          
          **Reflect on your Learnings** - repetition is the mother of skill. The more you repeat these development practices, the more they'll stick
          
          **Complete the Optional Challenges** - The GitHub Repo has links to fun challenges at the end of each lesson - these are meant to test your skills and reward you with a fun way to show of your progress as a smart contract developer!
          
          **Leverage the Community** - Blockchain development is incredibly collaborative. Get involved on **[GitHub](https://github.com/Cyfrin/foundry-full-course-f23/discussions)**, **[Peeranha](https://peeranha.io/)** and other forums. Join our **[Discord](https://discord.gg/cyfrin)** server and have conversations with developers just like yourself.
          
          > **Remember:** a challenge is not a roadblock, but an opportunity to learn something new.
          
          ### Let's Get Started
          
          With the above understanding in place, get ready. We're above to embark on a journey of knowledge and opportunity.
          
          Our first step will be understanding how the blockchain even works, what smart contracts even are.
          
          Let's get Froggy 🐸
          
      -
        type: new_lesson
        enabled: true
        id: a0e53ee0-46d4-4bde-aa69-1300180d41d2
        title: "What is a blockchain?"
        slug: what-is-a-blockchain
        duration: 11
        video_url: "dfgwvXaxpyBJoWz00psKKFgu9ImCzJYxbzM5IW01tmvSs"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/2-what-is-a-blockchain/+page.md"
        description: |-
                    Introduction to blockchain technology, its evolution from Bitcoin to Ethereum, and the significance of smart contracts.
        markdown_content: |-
          ***
          
          ## title: What is a blockchain?
          
          *Follow along with this video:*
          
          ***
          
          You can follow along with this section of the course here.
          
          ### Bitcoin and Blockchain
          
          You might be familiar with `Bitcoin`, which is one of the first protocols to utilize the revolutionary blockchain technology. The Bitcoin Whitepaper, authored by the pseudonymous `Satoshi Nakamoto`, described how Bitcoin could facilitate peer-to-peer transactions within a decentralized network using cryptography. This gave rise to censorship-resistant finance and presented `Bitcoin` as a superior digital store of value, often referred to as *digital gold*. There is a fixed amount of Bitcoin, similar to the scarcity of gold. You can learn more about this in the [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf).
          
          ### Ethereum and Smart Contracts
          
          A few years after Bitcoin's creation, Vitalik Buterin and others founded `Ethereum`, which builds upon the blockchain infrastructure, but with additional capabilities. With Ethereum, you can create decentralized transactions, organizations, and agreements without a centralized intermediary. This was achieved through the addition of `smart contracts`.
          
          Though the concept of smart contracts was originally conceived in 1994 by **[Nick Szabo](https://en.wikipedia.org/wiki/Nick_Szabo)**, Ethereum made it a reality.
          
          > Smart contracts are a set of instructions executed in a decentralized way without the need for a centralized or third party intermediary.
          
          Smart Contract functionality is the primary difference between blockchains like `Ethereum` and `Bitcoin`. Technically `Bitcoin` does have smart contracts but they're intentionally `turing incomplete`.
          
          ### The Oracle Problem
          
          However, smart contracts face a significant limitation – they cannot interact with or access data from the real world. This is known as the `Oracle Problem`.
          
          Blockchains are deterministic systems, so everything happens within their ecosystem. To make smart contracts more useful and capable of handling real-world data, they need external data and computation.
          
          Oracles serve this purpose. They are devices or services that provide data to blockchains or run external computation. To maintain decentralization, it's necessary to use a decentralized Oracle network rather than relying on a single source. This combination of on-chain logic with off-chain data leads to `hybrid smart contracts`.
          
          > **Note:** Most of this course will assume we'r working with an Etherum or EVM environment. The skills you learn here will be compatible with the vast majority of blockchain architectures!
          
          ### Chainlink
          
          **[Chainlink](https://chain.link/)** is a popular decentralized Oracle network that enables smart contracts to access external data and computation. Chainlink is also blockchain agnostic - so it's going to work with any chain out there.
          
          ### Layer 2 Scaling Solutions
          
          As blockchains grow, they face scaling issues. Layer 2, or L2, solutions have been developed to address this. L2 solutions involve other blockchains hooking into the main blockchain, essentially allowing it to scale. There are two primary types of L2 solutions:
          
          * **Optimistic Rollups:** eg. Optimism, Arbitrum
          * **Zero-Knowledge Rollups:** eg. ZK Sync, Polygon ZK EVM
          
          Don't worry too much about this now. Once we understand how blockchains work 'under the hood', we'll go further into Layer 2's then.
          
          ### Terminology
          
          You're going to hear some terms used in this course (and the community as a whole) a little interchangeably. Maybe you haven't heard these terms before. I hope this offers a bit of clarification.
          
          <details>
          <summary>Common Terms</summary>
          
          1. **Blockchain**: In web3, a blockchain is a digital ledger that records transactions across many computers in a secure and decentralized manner. Each block contains a number of transactions, and every new block is linked to the previous one, forming a chain. This makes the data tamper-resistant. *Example*: Bitcoin's blockchain records all BTC transactions.
          2. **Oracle**: Oracles in web3 are intermediaries that provide smart contracts with external data. They act as bridges between blockchains and the outside world, allowing smart contracts to execute based on real-world events and data. *Example*: A weather oracle provides data for a smart contract that triggers crop insurance payments based on rainfall data.
          3. **Layer 2**: Layer 2 solutions in web3 are technologies built on top of a blockchain (Layer 1) to improve its scalability and efficiency. These solutions handle transactions off the main chain, reducing congestion and fees, and then settle the final state on the main chain. *Example*: The Lightning Network for Bitcoin.
          4. **Dapp (Decentralized Application)**: A Dapp is an application that runs on a decentralized network, typically a blockchain. It is powered by smart contracts and operates without a central authority. Dapps can serve various purposes, from finance to gaming. *Example*: Uniswap, a decentralized finance application.
          5. **Smart Contract**: In web3, a smart contract is a self-executing contract with the terms of the agreement directly written into code. They run on blockchains and automatically execute when predetermined conditions are met, without the need for intermediaries. *Example*: A smart contract for an escrow service.
          6. **Hybrid Smart Contract**: Hybrid smart contracts combine on-chain code (running on a blockchain) with off-chain data and computations provided by oracles. This allows the contracts to interact with data and systems outside their native blockchain. *Example*: A smart contract for insurance that uses real-world data (like weather or flight delays) provided by oracles.
          7. **Ethereum/EVM (Ethereum Virtual Machine)**: Ethereum is a blockchain platform known for its smart contract functionality. The Ethereum Virtual Machine (EVM) is its computation engine that executes smart contracts. Ethereum allows developers to build decentralized applications and is the basis for many web3 projects. *Example*: ERC-20 tokens, a standard for creating fungible tokens on Ethereum.
          
          </details>
          
          ### Web3
          
          Web3 is a term used to describe the new paradigm of the internet powered by blockchain and smart contracts. Unlike the previous versions of the web, web3 is permissionless and relies on decentralized networks rather than centralized servers. This ushers in an era of censorship-resistant and transparent agreements and transactions, often called an ownership economy.
          
          **Web1:** The permissionless open sources web with static content
          
          **Web2:** The permissioned web, with dynamic content where companies run your agreements on their servers.
          
          **Web3:** The permissionless web with dynamic content.
          
          * Decentralized censorship reesistant networks run your agreemeent and code.
          * User owned ecosystems where one owns a portion of the protocol they interact with - instead of solely being the product
          
          ### Wrap Up
          
          We've taken a high-level view of the blockchain landscape, including its history and the problems that smart contracts solve.
          
          At this point you might be asking yourself *what do these smart contracts really mean?* or *what is meant by trust minimized agreements/unbreakable promises?*
          
          In my mind a technology is really only as good as the problem it solves. So next, we're going to look at what the **purpose** of `smart contracts` is - what's the value proposition exactly?
          
          Let's take a closer look at the undeniable value of `smart contracts` in the next lesson.
          
      -
        type: new_lesson
        enabled: true
        id: 3e87b91a-c18e-4152-a9f7-dac2a0aa7819
        title: "The purpose of smart contracts"
        slug: the-purpose-of-smart-contracts
        duration: 14
        video_url: "mWYTvJoCNJN2Ri8KpL3dioc102na9iB6z2csWjWyefSk"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/3-the-purpose-of-smart-contracts/+page.md"
        description: |-
                    Exploration of the purpose of smart contracts, their advantages over traditional agreements, and their impact on various industries.
        markdown_content: |-
          ***
          
          ## title: The purpose of smart contracts
          
          *Follow along with this video:*
          
          ***
          
          ### The Essence of Blockchain and Smart Contracts
          
          Almost every interaction or transaction in our lives involves some form of agreement or contract. For instance, purchasing a chair involves a contract to buy lumber, assemble it, and sell the finished product. Your electricity supply is also based on an agreement between you and the electric company.
          
          To make it more relatable, think of contracts and agreements as promises. When you get an oil change for your car, you're promised a service in exchange for money. Traditional contracts, however, require trust between parties, and this doesn’t always work in favor of honesty and fairness.
          
          ### The Problem with Traditional Agreements
          
          Let's take an example: In the 80s and 90s, McDonald’s Monopoly game promised customers a chance to win money through game cards obtained with purchases. However, it turned out that the game was rigged by insiders who manipulated the system for their gain. Essentially, McDonald’s failed to keep its promise.
          
          This example demonstrates that relying on trust within agreements can lead to fraudulent activities and broken promises.
          
          ### Enter Smart Contracts
          
          With smart contracts, we can eliminate the need for trust. A smart contract is an agreement or a set of instructions that are deployed on a decentralized blockchain. Once deployed, it cannot be altered, it automatically executes, and everyone can see its terms.
          
          Imagine if McDonald’s Monopoly game was operated on a blockchain through a smart contract. The fraudulent activities would have been impossible due to the immutable, decentralized, and transparent nature of smart contracts.
          
          ## Real-World Implications and Solutions
          
          ### Financial Markets Access
          
          Centralized bodies, like traditional exchanges, have the power to restrict access to financial markets. This was evident when Robinhood restricted trading on certain assets in 2021. With decentralized exchanges like Uniswap, there is no central authority that can alter or limit market access. This introduces fairness and openness to the financial markets.
          
          ### Banking and Trust
          
          Traditional banks have sometimes failed to keep the promise of safeguarding people's money, as seen during the Great Depression. Blockchain and smart contracts can ensure transparency and execute automated solvency checks, preventing the bank from becoming insolvent.
          
          The core of blockchain and smart contracts lies in creating a trustless system where agreements are transparent, unchangeable, and executed without human intervention. This technology holds the potential to revolutionize industries and everyday agreements by ensuring honesty and fairness.
          
          #### Comparison
          
          * Traditional Agreements: Require trust in a centralized entity.
          * Smart Contracts: Transparent, decentralized, and tamper-proof.
          
          In a scenario where you have to choose, smart contracts are an obvious choice as they cannot be manipulated or altered in anyone's favor.
          
          ### Applications and Innovations
          
          Smart contracts are relatively new, but have already started transforming various markets. One such example is decentralized finance (DeFi), which has over 200 billion dollars in protocols. This movement is providing a more fair, accountable, and transparent financial system.
          
          More industries are adopting smart contracts and blockchain due to the numerous advantages they offer. This results in trust-minimized agreements or what can be simply termed as unbreakable promises.
          
          ### Beyond Trust Minimization
          
          It is important to note that blockchain, smart contracts, and cryptocurrencies are not just about trust-minimized agreements. They offer security benefits, uptime advantages, execution speed, and much more.
          
          ### Caution: Not All Are Equal
          
          However, beware of platforms that claim to be decentralized but are not in practice. An example from 2022 is the `SBF's FTX platform`. It presented itself as a Web3 platform, but was essentially a traditional Web2 company using cryptocurrency without the benefits of smart contracts.
          
          As an emerging developer or user in this space, it's important to discern between legitimate projects and those that aren't contributing to the ethos of Web3.
          
          ### Summary
          
          * Bitcoin was the first to bring blockchain technology and cryptocurrencies to the mainstream as a decentralized store of value.
          * Ethereum and other platforms took it a step further by enabling smart contracts, allowing for decentralized, trust-minimized agreements.
          * Smart contracts can interact with the real world through decentralized oracle networks like Chainlink. It combines on-chain logic with off-chain data, allowing smart contracts to have the features that traditional contracts have.
          * Digital currencies like Ethereum and Bitcoin have inherent value even without smart contracts. The decentralized, censorship-resistant nature of these currencies is a powerful aspect.
          
      -
        type: new_lesson
        enabled: true
        id: 39bb34be-6a9f-40f5-ba68-7956777d2d9d
        title: "Current smart contract landscape"
        slug: smart-contract-landscape
        duration: 9
        video_url: "e02f015lD00xWapTfzFs7maaARxsNWorKwpWBQ9r6y7DyA"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/4-current-smart-contract-landscape/+page.md"
        description: |-
                    Overview of the current landscape of smart contracts, their features like decentralization, transparency, and applications in different fields.
        markdown_content: |-
          ***
          
          ## title: The Current Smart Contract Landscape
          
          You can follow along with this section of the course here.
          
          ## Features of Smart Contracts
          
          Smart contracts come with various features that distinguish them from traditional agreements.
          
          ### Decentralization
          
          The first feature is decentralization; smart contracts do not rely on any centralized intermediary. Instead, they run on a blockchain which is maintained by thousands of individuals known as node operators. It's the collective effort of these node operators running the smart contracts that make the network decentralized. This aspect will be discussed more in-depth later.
          
          ### Transparency and Flexibility
          
          Transparency is inherent to blockchain networks. Since all node operators can see everything happening on-chain, there is no room for unfair or hidden deals. This transparency ensures that everyone has access to the same information and plays by the same rules.
          
          It is important to note that this transparency does not necessarily compromise privacy. Blockchain is pseudo-anonymous, meaning that your transactions are not directly tied to your real-world identity.
          
          ### Speed and Efficiency
          
          Smart contracts and blockchain transactions are incredibly fast and efficient compared to traditional banking systems. For example, bank transfers, especially international ones, can take up to several weeks, whereas blockchain transactions happen almost instantly. This speed is not only convenient but also allows for more efficient interactions between parties.
          
          ### Security and Immutability
          
          Once a smart contract is deployed, it cannot be altered or tampered with. This immutability ensures that the terms of the contract are set in stone. This is a stark contrast to centralized systems where a server or database can be hacked, and data can be altered. The decentralized nature of blockchain makes hacking nearly impossible since an attacker would have to take control of more than half the nodes, which is significantly more challenging than compromising a single centralized server.
          
          Additionally, the data on a blockchain is resilient. In a traditional system, if your computer and backups fail, you lose all your data. In contrast, in a blockchain, your data is replicated across thousands of nodes. Even if several nodes were to go down, your data would remain secure as long as there is at least one copy of the blockchain.
          
          ### Elimination of Counterparty Risk
          
          Smart contracts eliminate the need for trust in transactions. Once a smart contract is deployed, its terms cannot be changed. This means that parties cannot alter the agreement based on greed or any other factors. This ensures that the agreement is enforced as originally intended.
          
          In traditional systems, there is always a risk that the other party might not fulfill their end of the bargain. With smart contracts, this risk is eliminated, and agreements are enforced programmatically.
          
          ## Applications of Smart Contracts
          
          Smart contracts have given rise to new industries and revolutionized existing ones.
          
          ### Decentralized Finance (DeFi)
          
          DeFi, or Decentralized Finance, allows users to engage with financial markets without relying on centralized intermediaries. With smart contracts, users have transparent access to financial markets and can engage with sophisticated financial products efficiently and securely. We will provide practical examples of how to build and interact with DeFi protocols in upcoming lessons.
          
          ### Decentralized Autonomous Organizations (DAOs)
          
          DAOs are governed entirely by smart contracts and operate in a decentralized manner. This structure offers benefits such as transparent governance, efficient engagement, and clear rules. DAOs are an evolution in politics and governance, and we will cover how to build and work with DAOs in future lessons.
          
          ### Non-Fungible Tokens (NFTs)
          
          NFTs, or Non-Fungible Tokens, can be thought of as digital art or unique assets. NFTs have created new avenues for artists and creators to monetize their work. We will also cover how to create and interact with NFTs in this course.
          
          ### Other Applications
          
          And then, maybe *you'll* be the one to discover the next iteration of smart contract applications!
          
          ## Making Your First Transaction
          
          You've gained a high-level understanding of smart contracts and their applications. It’s now time to dive into the practical aspect. In the next section, we will guide you through setting up a wallet and making your first transaction. Let's immerse ourselves in this new world.
          
      -
        type: new_lesson
        enabled: true
        id: 9a54e679-4c55-4947-a2ab-4bd749634a99
        title: "Setup your wallet - making your first transaction"
        slug: metamask-setup-making-your-first-transaction
        duration: 20
        video_url: "CyWaIeeuhMigPsLhkmtkcXwMuHTApA00oYJUIrcvhkx8"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/5-making-your-first-transaction/+page.md"
        description: |-
                    Guidance on setting up a Metamask wallet, understanding its interface, and the significance of secret recovery phrases in Ethereum transactions.
        markdown_content: |-
          ***
          
          ## title: Making your first transaction
          
          You can follow along with this section of the course here.
          
          ## Setting up Metamask for Ethereum Transactions
          
          In this section, we will learn how to make a transaction on a test Ethereum blockchain using Metamask, a popular cryptocurrency wallet.
          
          ### Visiting Ethereum Website
          
          * Go to the Ethereum website [ethereum.org](https://ethereum.org).
          
          ### Understanding Blockchains
          
          * We will make our first transaction on a test Ethereum blockchain.
          * This process works the same across all EVM (Ethereum Virtual Machine) compatible blockchains and layer 2 solutions like Arbitrum, Ethereum, ZK Sync, etc.
          * EVM compatibility will be explained later.
          
          ### Setting up Metamask Wallet
          
          1. To send a transaction on EVM chains, set up a wallet. We'll use Metamask as it's one of the most popular and easiest wallets.
          2. Go to [Metamask](https://metamask.io).
          3. Install the Metamask extension for your browser (e.g., Chrome, Firefox, or Brave).
          4. Once installed, you’ll see the extension in the top-right corner of your browser.
          5. Click "Get Started".
          6. Select "Create a New Wallet".
          7. Agree to help Metamask improve (optional).
          8. Create a password. Make sure it’s secure.
          
             **Note**: This wallet will be for development purposes, so you may use a weaker password. But never put real money into this wallet. Treat it as a real wallet to familiarize yourself with good wallet safety.
          
          ### Secret Recovery Phrase (Master Key)
          
          1. Metamask will provide you with a secret recovery phrase.
          2. This is a series of 12 words generated when you first set up Metamask.
          3. The phrase allows you to recover your wallet and funds if you ever lose access.
          4. Secure your wallet by keeping your secret recovery phrase safe and secret. Write it down, store it in a safe deposit box, or use a secure password manager. Some even engrave their phrase on a metal plate.
          
             **Warning**: If anyone gets access to your secret recovery phrase, they can access and take all your funds. No one, including the Metamask team, can help you recover your wallet if you lose the phrase.
          5. Select "Secure My Wallet".
          6. Write down your secret recovery phrase and save it securely.
          7. Confirm by re-entering your phrase.
          8. Click "Got it" after creating your wallet.
          
          ### Understanding the Metamask Interface
          
          1. You can see the interface of your Metamask wallet.
          2. Pin Metamask to the top of your browser for easy access.
          3. In Metamask, you can create multiple accounts. Each account has a different address.
          4. All accounts created in Metamask share the same secret phrase but have different private keys.
          
             **Note**: Access to the secret phrase grants control to all accounts, while access to a private key only grants control to a single account.
          
          ### Selecting a Network
          
          1. At the top-right of the Metamask interface, you’ll see “Ethereum Mainnet”.
          2. Click on it to see all the networks that Metamask can access.
          
          In this section, we have set up a Metamask wallet for development purposes and learned about the secret recovery phrase and its importance. In the next section, we will make a transaction on a test Ethereum blockchain.
          
      -
        type: new_lesson
        enabled: true
        id: 8f1efe3d-f43e-4e53-aa3f-0eff1b1afc1c
        title: "Introduction to gas"
        slug: introduction-to-gas
        duration: 10
        video_url: "WSgFweMwihZANonY8nulxWhnUOuG6rx8d8YBjsvSJbE"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/6-introduction-to-gas/+page.md"
        description: |-
                    Introduction to the concept of 'gas' in Ethereum, its role in transactions, and the mechanics of calculating transaction fees.
        markdown_content: |-
          ***
          
          ## title: Introduction to Gas
          
          You can follow along with this section of the course here.
          
          ***
          
          Welcome to our comprehensive guide on understanding Ethereum transactions. Here, we will discuss important concepts ranging from transaction fees and gas prices, mining incentives, computational measures in transactions, to hands-on experience of sending a transaction in Ethereum’s test network.
          
          Let's jump right in!
          
          ## Transaction Fee and Gas Price: What are they?
          
          <img src="/blockchain-basics/tx-etherscan.png" style="width: 100%; height: auto;" alt="etherscan transaction">
          
          While inspecting an Ethereum transaction, two terms invariably catch the glance: "transaction fee" and "gas price". Let's clarify what they are and why they matter.
          
          The transaction fee is the amount rewarded to the block producer for processing the transaction. It is paid in Ether or GWei. The gas price, also defined in either Ether or GWei, is the cost per unit of gas specified for the transaction. The higher the gas price, the greater the chance of the transaction being included in a block.
          
          > Gas price is not to be confused with gas. While gas refers to the computational effort required to execute the transaction, gas price is the cost per unit of that effort.
          
          When we click on "more details" in a transaction overview, we can see further information including the `gasLimit and Usage by transaction`.
          
          Now, let's address an important question: who gets these transaction fees and why?
          
          ## The Role of Nodes in Blockchain
          
          Blockchains are run by a group of different nodes, sometimes referred to as miners or validators, depending on the network. These miners get incentivized for running the blockchain by earning a fraction of the native blockchain currency for processing transactions. For instance, Ethereum miners get paid in Ether, while those in Polygon get rewarded in MATIC, the native token of Polygon. This remuneration encourages people to continue running these nodes.
          
          ## Understanding Gas in Transactions
          
          In the context of transactions, gas signifies a unit of computational complexity.
          
          The higher a transaction's complexity, the more gas it requires. For instance, common transactions like sending Ether are less complex and require relatively small amounts of gas. However, more sophisticated transactions like minting an NFT, deploying a smart contract, or depositing funds into a DeFi protocol, demand more gas due to their complexity.
          
          The total transaction fee can be calculated by multiplying the gas used with the gas price in Ether (not GWei). Therefore, `Transaction fee = gasPrice * gasUsed`.
          
          ## Hands-on: Sending an Ethereum Transaction
          
          In any blockchain, making a transaction requires the payment of a transaction fee (in terms of the native token) to the blockchain nodes processing that transaction. Let's take an example of a transaction using the MetaMask extension, a popular Ethereum wallet.
          
          Here are the steps:
          
          1. Open MetaMask and click "Expand View".
          2. Choose the account to use for the transaction.
          3. Click on "Send".
          4. Select "Transfer between my accounts".
          5. Enter the account to send the Ether to, and the amount you wish to send.
          6. Click "Next". MetaMask will automatically calculate the gas fee for you. The total amount to be paid is the sum of the Ether value you're sending and the gas fee.
          7. Click "Confirm".
          
          The transaction would now appear in the Activity tab of MetaMask. After a short while, the transaction gets processed, and you can view its details in a block explorer like Etherscan.
          
          You have now executed your first blockchain transaction!
          
          Despite its simplicity, knowing how to process transactions with MetaMask is vital and empowers you to interact with protocols on the Ethereum network and other blockchains. However, to fully understand Ethereum and the blockchain landscape, it's crucial to delve into the details behind these transactions and the fundamental mechanics of blockchains.
          
          Remember, mastering the nuances of blockchain transactions and understanding the mechanics behind Ethereum will enable you to become a powerful developer in the decentralized world.
          
          Stay tuned for more insights into the world of blockchain development!
          
      -
        type: new_lesson
        enabled: true
        id: 813188a3-0241-4fac-85f4-a05d1e5349cc
        title: "How do blockchains work"
        slug: how-do-blockchains-work
        duration: 18
        video_url: "SiM1dHjrSYX4BWfqynAup00pHV4sFEFS01ko36WwYBSu8"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/7-how-do-blockchains-work/+page.md"
        description: |-
                    Detailed explanation of the working of blockchains, the importance of hash functions, and the concept of blockchain immutability.
        markdown_content: |-
          ***
          
          ## title: How do blockchains work?
          
          You can follow along with this section of the course here.
          
          In this in-depth tutorial, we're going to immerse ourselves in the complex yet captivating world of blockchain technology. Specifically, we're going to break down the process and the technology itself using a widely-praised and accessible demo available [here](https://andersbrownworth.com/blockchain/).
          
          ## Understanding Hash Functions
          
          <img src="/blockchain-basics/hash-func.png" style="width: 100%; height: auto;">
          
          At its simplest, a hash is a unique, fixed-length string that serves to identify any piece of data. When you input any kind of data into a hash function, it produces a hash. In this demo, the hash algorithm we'll focus on is SHA-256.
          
          If I add `Patrick Collins` to our `SHA-256` algorithm, it will:
          
          1. Convert the letters to numbers
          2. Convert the numbers to a fixed-length “string” or “hash”
          
          `Patrick Collins` gets converted to `7e5b5a1a6b80e2908b534dd5728a998173d502469c37121dd63fca283068077c`
          
          Ethereum, a popular blockchain platform, uses its own version of a hashing algorithm that isn't exactly SHA-256 but belongs to the SHA family. This doesn't change things significantly as we're primarily concentrating on the concept of hashing.
          
          In the application, whatever data you enter into the data section, undergoes processing by the SHA-256 hash algorithm resulting in a unique hash.
          
          > For example, when I input my name as "Patrick Collins," the resulting hash uniquely represents "Patrick Collins." The fascinating aspect is, no matter how much data is input, the length of the generated hash string remains constant.
          
          ## Blockchain: Building Block by Block
          
          <img src="/blockchain-basics/blockchain.png" style="width: 100%; height: auto;">
          
          Now that we've grasped the concept of hashing and fixed-length string, let's inspect the structure of a blockchain—a collection of "blocks."
          
          A block takes the same data input, but instead of a singular data field, a block is divided into 'block', 'nunce', and 'data.' All three are then run through the hash algorithm, producing the hash for that block. Hence, even a minor change in the data leads to an entirely different hash, hence, invalidating the block.
          
          The data input can also change through a process called "mining". In essence, mining involves the computational trial and error process of finding an acceptable value to produce a hash which typically follows a certain pattern, such as starting with four zeros. The value found, which satisfies this criterion, is known as the 'nunce'.
          
          ## The Inherent Beauty of Blockchain: Immutability
          
          <img src="/blockchain-basics/distributed.png" style="width: 100%; height: auto;">
          
          In a blockchain, which is essentially a sequence of blocks, one block corresponds to the data of block 'nonce', 'nunce' and the hash of the previous block. As a result of this, the tampering of any single block invalidates the rest of the chain instantly, due to the cascading effect of the hash changes. This reveals the inherent feature of immutability in a blockchain.
          
          > For instance, even typing a single 'A' in the place of a 'B' in a block data would require the entire blockchain to be re-computed to restore validity, an extremely resource intensive operation.
          
          ## Dissecting the Decentralization & Distributed Aspect
          
          <img src="/blockchain-basics/tokens.png" style="width: 100%; height: auto;">
          
          Moving forward, the crux of blockchain's power lies in its decentralization or distributed nature. Under this system, multiple entities or "peers" run the blockchain technology, each holding equal weight and power. In the event of disparity between the blockchains run by different peers (due to tampering or otherwise), the majority hash wins, as the majority of the network agrees on it. Hence, in summary, the majority rules in the world of blockchain technology.
          
          ## Interplay of Blockchain & Transactions
          
          <img src="/blockchain-basics/transactions.png" style="width: 100%; height: auto;">
          
          A blockchain is much more than an immutable record—it is an efficient and secure medium for transactions. Just as we allowed ourselves to experiment with random strings of data, we can replace the data sections with transaction information. In the event of an attempt to tamper with a past transaction—for instance, transferring a higher amount of money from one peer to another—the rest of the blockchain immediately becomes invalid, and the tampered blockchain will stand out as different from the majority of honest blockchains.
          
          ## Wrapping up with Private & Public Keys
          
          Finally, if you're wondering how the system ascertains the identities behind the transactions—consider Darcy sending $25 to Bingley—this is where public and private keys come into play. Without going too deep into this topic, these keys ensure the authenticity and non-repudiation of transactions.
          
          To summarize, every transaction, block, and indeed the whole blockchain itself comes down to understanding the concept of a hash—this unique fixed-length string that is intrinsically linked with the original data. We've also underscored the importance of decentralization and highlighted how the concept of immutability plays into the system's security. Stay tuned for subsequent posts where we delve into topics like public and private keys, smart contracts, and more.
          
      -
        type: new_lesson
        enabled: true
        id: a3c23224-9059-4be2-a5aa-d860451df2de
        title: "Signing transactions"
        slug: signing-ethereum-transactions
        duration: 10
        video_url: "ZG83igjpCM6n7i02RbEmmGYCxbmWGXpWrte600TbNtRf00"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/8-signing-transactions/+page.md"
        description: |-
                    In-depth look at the process of signing blockchain transactions, the role of private and public keys, and their significance in maintaining security.
        markdown_content: |-
          ***
          
          ## title: Signing Transactions
          
          You can follow along with this section of the course here.
          
          # Understanding Blockchain Transaction Signatures, Private and Public Keys
          
          The beauty and security of blockchain technology revolve around the privacy and secure nature of transactions. In this blog post, we will demystify this concept by digging deeper into how transaction signing, private and public keys, and other cryptographic pieces lend credence to blockchain transactions.
          
          <img src="/blockchain-basics/public-private-key.png" style="width: 100%; height: auto;" alt="public private key">
          
          ## What are Private and Public Keys?
          
          Understanding the relationship between private and public keys is essential to grasping the concept of blockchain transactions. In essence, a private key is a randomly generated secret key used to sign all transactions.
          
          ```python
          private_key = generate_random()
          ```
          
          The private key is then passed through an algorithm (the Elliptic Curve Digital Signature Algorithm for Ethereum and Bitcoin) to create the corresponding public key. Both the private and public keys are central to the transaction process. However, while the private key must remain secret, the public key needs to be accessible to everyone.
          
          ## How does Transaction Signing Happen?
          
          Consider a simple scenario; Darcy sends $400 to Bingley. To verify this transaction, Darcy uses her private key to sign the transaction.
          
          ```python
          signature = sign(data, private_key)
          ```
          
          This creates a unique message signature that can't be used to derive the private key, but can be verified using the public key.
          
          ```python
          verify(signature, public_key)
          ```
          
          When person X attempts to impersonate Darcy and send a transaction, the fake transaction can be easily detected as the transaction signature doesn't match the public key.
          
          ## Importance of Hiding Private Keys
          
          The concept of private keys is implemented in your MetaMask account, nestled away in the Settings section. The private key isn't displayed, but is readily available when the password is entered, telling a tale of how critical it is to secure it.
          
          ```python
          print(meta_mask_private_key)
          ```
          
          Anyone with access to the private key can perform and sign transactions, consequently making it absolutely vital to safeguard private keys.
          
          ## The Ethereum Address and your Private Key
          
          <img src="/blockchain-basics/sign-a-tx.png" style="width: 100%; height: auto;" alt="sign a tx">
          
          Interestingly, the Ethereum address is a part of your public key. It's derived from hashing the public key via the Ethereum hashing algorithm and extracting the last 20 bytes. While the procedure may differ from one blockchain to another, the principle remains the same - the address is a derivative of the public key.
          
          ## Recapping the Key Concepts
          
          * Your private key is super-secret, held securely by you alone as it holds the power to authorize transactions.
          * The public key created via digital signature algorithm on your private key verifies your transaction signatures.
          * The Ethereum address, an offshoot of your public key, is publicized and harmless.
          
          <img src="/blockchain-basics/key-chart.png" style="width: 100%; height: auto;" alt="key chart">
          
          The private and public keys, paired with the address, create a securely functioning transaction system. This security is extended in the MetaMask account with the creation of new accounts.
          
          The creation of any new account in your MetaMask involves your 'mnemonic' or secret phrase. The process employs simple hashing and takes your secret phrase, adds a number to it (corresponding to the new account number you want), and generates a new hash to create a private key for your new account.
          
          Thus, if your mnemonic is shared, access to all the accounts created in your MetaMask or wallet is granted. However, sharing your private key only allows access to a single account, while sharing your public key or address is perfectly safe.
          
          On a note of caution, the mnemonic is a highly treasured piece of information that needs unrelenting protection. A stolen mnemonic means access to all your accounts. Losing access to a single account due to a mishandled private key, although worrisome, is less damaging. Your public key and address, albeit valueless when displaced, are crucial pillars that solidify blockchain's security architecture.
          
          In summary, your private key, public key, and address closely collaborate to generate, authenticate and secure transactions in the blockchain world. Maintaining their confidentiality and understanding their functions in the transaction process ensures seamless and safe blockchain usage.
          
      -
        type: new_lesson
        enabled: true
        id: 6f36bc8a-e920-406a-9885-39642b7864ef
        title: "Gas in depth"
        slug: gas-in-depth
        duration: 10
        video_url: "HMm00lQXm42nLZJCbpH2OagFlxrmuHZvNB3Ff9TqcHIc"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/9-gas-II/+page.md"
        description: |-
                    Further exploration into the concept of 'gas' in blockchain transactions, including gas limits, transaction fees, and Ethereum's EIP 1559.
        markdown_content: |-
          ***
          
          ## title: Gas II
          
          You can follow along with this section of the course here.
          
          # Decoding the Essence of Blockchains: Transactions and Gas
          
          Over the previous couple of blog posts, we've tried to unravel the mechanism underlying blockchains in detail. Today, the focus is on blockchain transactions and the concept of 'gas.'
          
          Don't stress if this topic sounds complex; by the end of this post, the understanding of transactions and gas in the blockchain world will become more accessible.
          
          <img src="/blockchain-basics/block-fee.png" style="width: 100%; height: auto;" alt="block fee">
          
          ## Back to Basics: Transaction Fee and Gas Limit
          
          To start, let's focus on a transaction's cost or its transaction fee. It's the expense incurred when performing a transaction. You can view this on Etherscan under the block base fee per gas plus the max priority fee per gas times the gas used section.
          
          Take a close look, though. Ethereum, like other digital currencies, may govern transactions differently. It follows EIP 1559, for instance.
          
          <img src="/blockchain-basics/set-mm-fee.png" style="width: 100%; height: auto;" alt="set mm fee">
          
          If we delve deeper, we find that the transaction used gas equal to the gas limit. Now the gas limit is changeable and is the maximum gas you're willing to use up in a transaction. This limits the computation units and prevents overuse. It can be adjusted using MetaMask (or any other Ethereum wallet).
          
          ```python
          click Send-> Advanced -> change Gas limit.
          ```
          
          MetaMask defaults the gas to 21,000 (Base cost for transferring Ether). Also present here are the priority fee and max base fee. If the gas needed exceeds the limit set, the transaction fails.
          
          ## Blockchain Jargon: Gwei and Ether
          
          Pricing in Ethereum uses a unit called `gwei`. Unfamiliar with this term? Let me simplify it for you. Just as dollars and cents are part of the same family, Ethereum and gwei are too. Visit [Ethconverter.com](https://eth-converter.com/) to see one Ether's worth in terms of GWei.
          
          <img src="/blockchain-basics/eth-converter.png" style="width: 100%; height: auto;" alt="set mm fee">
          
          The Max fee refers to the maximum gas fee we're ready to shell out for the transaction. It could be more than the actually paid gas price. Furthermore, the 'Max Priority Fee' accounts both for the maximum gas fee and the maximum tip given to miners.
          
          ## Gas Burning and Transaction Fees
          
          With Ethereum's EIP 1559, a portion of the transaction fee is subtracted permanently from the total Ether supply, thereby 'burning' it. This eventually leads to a decrease in its circulation. The rest proceeds to miners. To tabulate the exact amount given to miners, subtract the 'burnt' fee from the total fee.
          
          Each transaction type is unique, and Ethereum type 2 EIP 1559 signifies these gas fee and burning transactions.
          
          <img src="/blockchain-basics/burn-fee.png" style="width: 100%; height: auto;" alt="brun fee">
          
          Ethereum's unique base fee system changes in response to the demand for transaction inclusion. If more transactions need inclusion, the base fee rises, and vice versa. This base fee is mathematically adjusted to maintain block capacity at around 50%.
          
          ## A Recap on Transactions
          
          > "Every transaction on blockchain consists of unique transaction hash, status, block number, block confirmations, gas used, gas limit, timestamp, senders and receiver's address, transaction fee and so on."
          
          Check the image below for a more comprehensive overview.
          
          <img src="/blockchain-basics/gas-ii-summary.png" style="width: 100%; height: auto;" alt="gas ii summary">
          
          ## Minutiae of Blockchains
          
          * The unique transaction hash identifies each transaction.
          * 'Block confirmations' signify the number of blocks mined after a block's inclusion. The higher the number of confirmations, the more secure the blockchain.
          * Once the transaction is included, you can see the block and all its transactions.
          * For Ethereum transfers, input data remains blank, but for Smart Contracts, it holds crucial transaction information.
          * The State tab, for advanced users, shows state changes linked to the transaction.
          
          With the basics of blockchains, transactions, and gas now clearer, it's time to dive deeper into the blockchain fundamentals. Y
          
          Now that you're all geared up with the theoretical know-how, it's time to dive into the practice! Incidentally, that's what we will be exploring in the next post. Stay tuned!
          
      -
        type: new_lesson
        enabled: true
        id: 872fe9ea-6511-413a-acaf-5f997e725417
        title: "Blockchain Overview"
        slug: how-the-blockchain-works
        duration: 20
        video_url: "7YOYCLtpHfUmV014ikN93lYZyKPUkPtf9YLKK1K02orDE"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/10-blockchain-fundamentals/+page.md"
        description: |-
                    Comprehensive overview of fundamental blockchain concepts including cryptography, node operations, consensus protocols, and scaling solutions.
        markdown_content: |-
          ***
          
          ## title: High Level Blockchain Fundamentals
          
          You can follow along with this section of the course here.
          
          ## Understanding Cryptography and Blockchain
          
          In our previous discussions, we have covered basic concepts of cryptography and elements of blockchain. Now, let's discuss how these concepts translate into real-world applications. It is important to bear in mind that varying blockchains utilize different algorithms and criteria, so there might be minute variations in the implementation, but the core principles remain consistent.
          
          In the traditional sense, when we interact with an application or a server, such as a website, we are essentially engaging with a centralized entity. Contrarily, as we've seen, a blockchain operates within a network of independent nodes, all managed by individual users running blockchain software.
          
          In the realm of blockchain, the term `node` takes on a special significance, emerging as the heartbeat of the decentralized system. Imagine it this way - each `node` represents an individual user's server, pulsating with the rhythmic cadence of blockchain technology. When these nodes sync and engage with each other, they weave together an intricate and robust blockchain network. The real magic, however, lies in its democratic essence. In this decentralized universe, anyone armed with the right hardware and software can join the network, embodying the true spirit of decentralization. This is not just a technological concept; it's a silent revolution celebrating inclusivity and accessibility.
          
          For those eager to participate, Websites like GitHub offer the opportunity to set up your own Ethereum node in a matter of seconds!
          
          ## Blockchain: A Decentralized Powerhouse Resilient to Disruptions
          
          The primary advantage of blockchain technology is its resilience to disruptions. Here's the reason: traditional online systems run by centralized entities are vulnerable. If they shut down due to a variety of reasons (like being hacked or due to internal issues), their services are interrupted.
          
          On the other hand, blockchains are decentralized, and the chances of all nodes shutting down simultaneously are extremely low. So, even if one or more nodes fail, the system continues to operate unabated, as long as there is at least one functioning node. This inherent backup feature makes blockchain an incredibly resilient system. Popular chains like Bitcoin and Ethereum consist of thousands of nodes which makes them even more resistant to disruptions.
          
          ## The Consensus Protocols: Proof of Work and Proof of Stake
          
          <img src="/blockchain-basics/09-blockchain-fundamentals/blockchain-fundamentals.jpg" style="width: 100%; height: auto;" alt="block fee">
          
          Now that we've reviewed some fundamentals, let's move on to two key concepts you may have heard about: 'Proof of Work' and 'Proof of Stake'. These concepts are crucial to understanding how blockchains work.
          
          Proof of work and proof of stake fall under the umbrella of consensus. Consensus is a critical topic when it comes to blockchains because it is used to reach an agreement on the state or a single value on the blockchain, especially in a decentralized system.
          
          In the majority of blockchains, the consensus protocol can be broken down into two constituent parts; a chain selection algorithm and a civil resistance mechanism. We'll touch on the main characteristics of each mechanism and then cover in more detail how Proof of Stake forms an evolved alternative to the electricity-hungry Proof of Work.
          
          ### Proof of Work: Deciphering the Consensus Protocol
          
          As already discussed, Proof of Work is a civil resistance mechanism, a way to avert potential Sybil attacks. A Sybil attack is when a user creates numerous pseudonymous identities aiming to gain a disproportionately influential sway over the system. In the Proof of Work environment, such an attack is difficult to execute. As Sybil resistance is inherent in the mechanism, irrespective of how many aliases an attacker creates, every identity must undertake the highly resource-intense process of mining to find the answer to the blockchain's puzzle.
          
          The Proof of Work mechanism also interacts with the consensus protocol's other key component: the chain selection rule. With this, the decentralized network decides that the longest chain - i.e., the one with the highest number of blocks - will be the authoritative chain.
          
          ### Consensus and Scalability Issues
          
          One key compromise with Proof of Work is the substantial demands it puts on electricity, rendering it environmentally unfriendly. This has spurred the development of more eco-friendly protocols, such as Proof of Stake. This alternative consensus protocol follows a different sybil resistance mechanism: rather than expending substantial computational resources to mine blocks, in Proof of Stake, nodes or "validators" instead stake collateral as a surety they will behave honestly.
          
          However, another significant issue requiring attention is scalability. As the number of transactions exceeds the amount of block space, latency and high transaction costs, or "gas fees", can become a hindrance.
          
          ### Layer 1 and Layer 2 Scaling Solutions
          
          Blockchain developers have devised two key options in response to this limitation:
          
          1. `Layer 1` solutions: This refers to base layer blockchain implementations like Bitcoin or Ethereum.
          2. `Layer 2` solutions: These are applications added on top of a layer one, like [Chainlink](https://chain.link/) or [Arbitrum](https://arbitrum.io/).
          
          Options like Arbitrum, for instance, use a "roll-up" approach where transactions are processed in bulk and then rolled up into a Layer 1 blockchain. This increases the effective capacity of a Layer 1 blockchain, allowing it to absorb more transactions, effectively easing the scalability issue.
          
      -
        type: new_lesson
        enabled: true
        id: 1a5beaf9-4b6d-44b4-904d-357908e344fb
        title: "Congratulations"
        slug: blockchian-basics-completed
        duration: 2
        video_url: "cJGYVJceDwFyvVI9VQE7jlp4CAFeE01at5RheTcVCbBU"
        raw_markdown_url: "/routes/blockchain-basics/1-basics/11-basics-completed/+page.md"
        description: |-
                    Celebratory conclusion of the blockchain basics series, highlighting the journey from theoretical understanding to practical application.
        markdown_content: |-
          ***
          
          ## title: Congratulations!
          
          If you reached this section you are awesome!! You can follow along with this section of the course here.
          
          ## Demystifying Blockchain: From Basics to Code
          
          As we wrap up our series on blockchain basics and elaborate further with insightful blockchain explainers, we not only aim to offer a seamless transition into blockchain-related fields but also make it enjoyable and interesting. With the knowledge you've garnered, you are now equipped to explore the world of blockchains more competently and confidently.
          
          By marching this far, you should not only be proud of your accomplishments but also be excited about the journey ahead. It is indeed commendable that you took upon yourself to understand the complexities of blockchain technology.
          
          <img src="/blockchain-basics/Final-Congrats/quote.png" style="width: 100%; height: auto;" alt="block fee">
          
          ## Venturing into The Coding Aspect
          
          Now that you've grasped a lot of the basics and fundamental concepts of blockchain, it's time to delve into the coding aspect. This is where the more practical aspects of blockchain technology come into focus. The transition from theoretical insights to practical applications can be a thrilling journey, especially when we're talking about something as ground-breaking as blockchain.
          
          ### Learning Solidity Basics
          
          Solidity is a statically-typed programming language designed for implementing smart contracts on Ethereum-based blockchain platforms. To put it simply, if blockchain was a car, Solidity would be the engine that drives it, or more specifically, the language in which the engine's instructions are written.
          
          Our next section will introduce you to the solidity fundamentals. This will equip you with the necessary skills to start coding in Solidity and offer an in-depth understanding of how smart contracts work under the hood.
          
          At this juncture, it is appropriate to revisit your achievements. After all, learning is a continual process and every milestone deserves a celebration.
          
          #### Give yourself a virtual high-five for your fantastic progress. If you've found our content helpful, we'd love to hear more about your journey. You can reach out to us in the GitHub discussions!
          
          The switch from learning blockchain concepts to actually applying them might be stark, yet it's exhilarating. It signals the progression from rudimentary understanding, to applying that knowledge, and finally, creating something new and valuable. And let's face it, in today's tech-savvy world, knowing how to code is a power in itself.
          
          So congratulations are in order! By seeking to learn Solidity and understanding how to interact with blockchains, you’re standing at the gateway of endless potential. Get ready to unlock new opportunities in the world of technology, as you step into the exciting realm of blockchain coding. Remember, every code you write brings us one step closer to a decentralized world. Happy coding!
          
          Your next Chapter is to learn the:
          
          <a href="/solidity/remix/1-simple-storage" style="color: blue; text-decoration: underline;">
          <button  style="background-color: white; color: #f4899c; border: 2px solid white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; transition: border 0.3s ease; border-radius: 5px;" onmouseover="this.style.borderColor='#f4899c';" onmouseout="this.style.borderColor='white';">Solidity Basics</button>
          </a>
          
          <!-- TODO: make this a big button a general style -->
          
    type: new_section
    enabled: true
---
