---
title: Third Web Deploy
---

_Follow along the course with this video._

---

# Moving Beyond Environment Variables

A while back, I showed you a method where we utilized an environment variable (.env) to store private keys. However, times have evolved and we've acquired a much safer way to manage and protect those keys. This method involves using the Foundry's built-in ‘**cast**’ command which allows you to work with an encrypted version of the private key, thus avoiding any raw, plain-text encounters. If you're seeking a security review or an audit, and you still have a .env example left hanging around in your git repo, well, prepare yourself for a swift rejection.

## Why Moving Away From Plain Text Keys is Crucial

Previously, I showed you how to use an Ethereum Private Key RPC URL and Etherscan API key as environment variables. We know, however, that plain texts can be precarious - you might accidentally push this critical piece of information to GitHub, or worse, disclose it in your terminal inadvertently.

<img src="/foundry/update-env/env1.png" style="width: 100%; height: auto;">

Therefore, it is extremely important to ensure the security of your private keys and never leave them open in the text format.

## Solution: Encrypting your Keys Using ERC2335

The solution to this issue lies in the use of ERC2335. This is nothing but a nifty system that enables us to convert private keys into a secure JSON format.

Let’s assume that your private key is the same as the default key that comes along with the Anvil development package. On running Anvil, you receive an output where you can locate said key.

Once you have your key, from your terminal, go ahead and run the following command:

```bash
cast wallet import defaultKey --interactive
```

A highly recommended practice is **not** to run this in Visual Studio Code, but directly within your terminal or shell instead. This maneuver launches an interactive shell where you can safeguard your details. You may copy-paste your private key here. At this point of execution, you are required to enter a password, which you need to remember whenever you need to use this private key.

On successful implementation, you will be provided with this message: `default Key store was saved successfully` and you will receive an address.

Before, we fed our private key directly into our terminal and used a make file to make the operation appear easier. With our private key now securely stored and encrypted in our cast, we can verify its presence using:

```bash
cast wallet list
```

After this, you can use the following command to run our default script:

```bash
forge script script/DeployFundMe.s.sol:DeployFundMe --rpc-url http://localhost:8545 --account defaultKey --sender 0xf39...--broadcast -vvvv
```

<img src="/foundry/update-env/env2.png" style="width: 100%; height: auto;">

The term 'private key' in this command is replaced with `account defaultKey --sender.` You still however need to copy-paste the address of the sender, AKA the address associated with the private key.

A piece of advice to remember is that anytime you see your private key in plain text, your brain should give off alarm bells. And anytime you have the urge to reveal your private key, you must think twice. Even if you are using a development private key like in this course, when you start to work with real money, I highly encourage you to stick to the encrypted process.

Once you encrypt your private key, your objective should be to then never revisit it. Always remember, the chances of implications multiply significantly, anytime you expose your private key. Unfortunately, there is still no full-proof method to completely avoid revealing private keys but we can surely minimize the risk by exposing it the least number of times possible.

## Conclusion

To simplify things to the best level possible, avoid using .env files to store your private key. Instead, opt for encrypting it with **cast wallet import**. While you are at it, use a password or a password file for added security and delete the key from your history after you use it. This would ensure that your private key, especially those with real money associated, are protected most effectively.

Finally, let's take a moment to appreciate the contribution of the people who were instrumental in making Foundry a reality, making our lives as developers easier and more secure.

Stay safe, and until next time, happy coding!
