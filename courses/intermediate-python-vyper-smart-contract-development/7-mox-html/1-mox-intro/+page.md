## HTML/JS Introduction

This lesson is a little bit different, because we are going to be teaching you how your wallets and how your Metamask interacts with websites.

If you scroll down in this repo, the front-end code we have written here is actually going to work great for both Foundry and for Moccasin running anvil in the background.

So, if you want to go ahead and follow along with me here, you can Whenever I say, hey, run this with Foundry, to deploy this with Foundry, just know that I mean with Moccasin.

And we have some instructions in here on how to get started here with Moccasin instead of Foundry.

Now, you do not have to follow along with me here. You can just watch and learn because it is really important that you understand what is actually happening when your Metamask pops up and says, hey, confirm this transaction.

Because, if you confirm the wrong transaction, that's actually really scary.

So, we want to learn how interacting with websites work, what it looks like. And if you have no intention of ever being a front-end developer, which is totally fine if you're like, hey, screw this I just want to be a Python dev, then great. You don't need to follow along here at all.

But, if you would like to, the instructions in here for Moccasin are here as well.

Additionally, the Foundry version of this project is just called fund me for the Moccasin edition. I thought it would be way nicer and more advanced if we called it buy me a coffee.

So, whenever whenever I refer to fund me, just know that I am referring to the same buy me a coffee contract. Okay?

So, we are going to go ahead We are going to go through the We are going to go through with this section I'm going to, you know, this is a slightly older video I'm going to be showing you how to do a lot of stuff using Foundry, but again, you can just as easily use Moccasin for this as well.

So, let's go ahead, let's learn how websites actually work and how our wallets interact with these websites. So, here we go.

**[Insert Metamask image here]**

We are going to clone this repository:

```bash
git clone https://github.com/Cyfrin/html-fund-me-cu
```

```bash
cd html-fund-me-cu
```

We are going to run the following commands to deploy to Moccasin:

```bash
git clone https://github.com/Cyfrin/buy-me-a-coffee-cu
cd buy-me-a-coffee-cu
anvil
```

We are going to open up another terminal and run the following commands:

```bash
mox run deploy --network anvil
```

**[Insert connect button image here]**

When we click the **connect** button in the HTML code, Metamask will pop up and ask us to confirm a transaction.

**[Insert Metamask transaction confirmation image here]**

This transaction is actually just a call to the blockchain that is running in the background and will allow the connected wallet to interact with our website.

**[Insert constants.js image here]**

Here in our **constants.js** file we can see the address of our deployed contract.

**[Insert Metamask add network image here]**

We are going to add this network to Metamask.

```bash
mox run deploy --network anvil
```

Let's take a look at the HTML code:

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fund Me</title>
</head>
<body>
    <h1>Fund Me</h1>
    <button id="connect">Connect</button>
    <script src="constants.js"></script>
    <script src="index.js"></script>
</body>
</html>
```

This is the simple front-end for our project that we are going to connect with our contract.

We will connect to our contract with the **index.js** file.

```python
const connectButton = document.getElementById("connect");

connectButton.addEventListener('click', async () => {
    if(typeof window.ethereum !== 'undefined'){
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log("Connected", accounts);
    } else {
        alert("Please install Metamask!");
    }
})

```

Here in this code, we are selecting the button and assigning it to a variable. We are then adding an event listener, which will fire when the button is clicked.

The function fires when the button is clicked. It is then going to check if the user has Metamask installed, which we will check with the command `window.ethereum`. If it does, it will request the accounts from the user. And if it doesn't, it will alert the user.

Hopefully this gives you a good overview of how to interact with your contracts from a web application!
