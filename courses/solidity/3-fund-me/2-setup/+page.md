---
title: Project Set up
---
*Follow along this chapter with the video bellow*



On this chapter, we are going to delve into the heart of the Ethereum Blockchain - smart contracts. We'll start to code 'FundMe.' It will be a simple contract that allows users to send funds into it, and later, an owner can withdraw the funds from it. But you already know that, let's start by cleaning up our Remix IDE workspace.

### **1. Preparing our Remix IDE workspace**

Open your [Remix IDE](https://remix.ethereum.org/) and delete all preexisting contracts to start afresh. You might find contracts named simple storage, add five extra, storage factory, etc., from our previous lesson posts. Just right-click each one and select 'delete.' Make sure your workspace is clear before moving to the next step. Also, you can just create a new workspace and leave the previous contracts for reference purposes. Remember tough that if you delete the cookies and history on your browser, you will lose all your previous work.


Now let's get down to business and start creating our contract. You can name it 'FundMe.' A valuable tip for any coding process is to first write down what you want your code to achieve in plain English.

For our 'FundMe' contract, we primarily want it to perform three tasks:

1. **Allow users to send funds into the contract:** A standard function in any fundraising platform; users should be able to donate funds into the 'FundMe' contract.
2. **Enable withdrawal of funds by the contract owner:** The contract owner, or whoever has control over the 'FundMe' contract, should be able to withdraw the accumulated funds.
3. **Set a minimum funding value in USD:** There should be a lower limit for donations to prevent negligible amounts—e.g., a penny.

Now, armed with these guidelines, we'll start building the contract. Start by declaring the SPDX license identifier and the solidity version:

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract FundMe {}
```

### **3. Outlining the Contract Functions**

Before diving into the nitty-gritty of our code, let's lay down the functions we aim to implement for our contract functionality. Two primary functions will form the backbone of our 'FundMe' contract:

1. **`fund`:** This function will facilitate the donation of funds into the contract by users.
2. **`withdraw`:** This function will enable the contract owner to extract the funds that have been donated.

These functions will represent the main interaction points with our contract. We may add more features later, but for now, we'll establish these two at the core of our contract.

But coding everything at once can be overwhelming, especially for large projects. Thus, best practice dictates that we comment out the `withdraw` function and pay singular attention to building the `fund` function.

```js
contract FundMe {
    // users will use this function to send funds into our contract
    function fund() public {code here}
    // Function for owner to withdraw funds
    /*function withdraw() public {// code for the `withdraw` function will go here}*/}
```

That's all for this post. Join us in the next one as we delve into crafting the `fund` function and give life to our 'FundMe' contract.

<img src="/solidity/remix/lesson-4/setup/setup1.png" style="width: 100%; height: auto;">
