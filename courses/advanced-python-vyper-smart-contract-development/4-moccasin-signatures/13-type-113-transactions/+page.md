## Understanding Type 113 Transactions (Optional)

In this lesson, we will discuss what a type 113 transaction is and how it's used. 

We'll go over the mechanism, or format, that allows Remix to send a transaction for us by signing a message. The way this works is by utilizing something called *account abstraction*. zkSync has *native* account abstraction, meaning it's built into the blockchain.

Account abstraction allows users' assets to be stored within smart contracts instead of externally owned accounts. This means we can use smart contracts as our accounts instead of tools like Metamask. 

Ethereum has two main types of accounts:

- **Externally Owned Accounts (EOAs)**: These accounts are owned by a private key and are used to interact with the blockchain. They are the standard way for users to interact with Ethereum. 
- **Smart Contract Accounts**: These accounts are represented by smart contracts, which are programs that execute automatically on the blockchain. They can store assets, perform actions, and interact with other smart contracts.

In zkSync, all accounts are smart contract accounts. This means that we can utilize account abstraction natively, allowing us to create accounts with custom logic, such as multiple signers or gas payment options.

Let's look at the code:

```javascript
pragma solidity ^0.4.16;

contract SimpleStorage {

    struct Person {
        uint favoriteNumber;
        string name;
    }

    Person person1;

    function SimpleStorage() public {
        person1.favoriteNumber = 1;
        person1.name = "some name";
    }

    function addPerson(uint favoriteNumber, string name) public {
        person1.favoriteNumber = favoriteNumber;
        person1.name = name;
    }

    function getNameAndFavoriteNumber() public constant returns(string, uint) {
        return (person1.name, person1.favoriteNumber);
    }

    function store(string name, uint favoriteNumber) public {
        person1.name = name;
        person1.favoriteNumber = favoriteNumber;
    }

    function retrieve() public constant returns(uint) {
        return person1.favoriteNumber;
    }
}
```

The code above shows a simple smart contract that stores a person's name and favorite number. 

In this example, a type 113 transaction is used to call the `addPerson` function and store a new person's name and favorite number.

zkSync's native account abstraction means that any Ethereum address on zkSync is automatically a smart contract account. This enables Remix to automatically send the transaction by signing an EIP 712 message.

Let's summarize the key concepts:

- **Account Abstraction**: A technology that allows users to create custom accounts with programmable logic.
- **Native Account Abstraction**:  A feature in zkSync where all accounts are smart contract accounts, providing built-in account abstraction capabilities.
- **EIP 712 Signatures**: A standard for signing messages on Ethereum, allowing Remix to send transactions for us using account abstraction.

By understanding these concepts, we gain a deeper understanding of how transactions work on zkSync and the advantages of using account abstraction.