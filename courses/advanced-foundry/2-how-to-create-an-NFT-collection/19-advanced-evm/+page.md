---
title: Advanced EVM - Opcodes, Calling, and Encoding
---

_Follow along the course with this video._

---

### Advanced EVM - Opcodes, Calling, and Encoding

You can find all the code we'll be working with in this section in this [**Sublesson Repo**](https://github.com/PatrickAlphaC/hardhat-nft-fcc/tree/main/contracts/sublesson).

Until now, we've been using abi.encode and abi.encodePacked effectively as a means to concatenate strings (which has actually been deprecated in favour of string.concat). In this lesson we'll head back into [**Remix**](https://remix.ethereum.org) to further explore what's actually happening when we invoke these functions.

> ❗ **NOTE**
> This section is definitely going to be a little advanced. We're going to go deep into the Ethereum Virtual Machine, op codes and the binary that makes everything work behind the scene.
>
> If you don't understand things right away that's 100% ok. I encourage you to challenge yourself to absorb as much of this as possible before moving on. There's no shame in going through the content a couple times.

### Encoding

When ready, in [**Remix**](https://remix.ethereum.org), create a new file named `Encoding.sol`. We can set this contract up with some boilerplate before writing the functions we'll use to explore encoding and decoding.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Encoding {}
```

Within this contract, let's now right a simple function to concatenate two strings using `abi.encodePacked`.

```solidity
function combineStrings() public pure returns(string memory){
    return string(abi.encodePacked("Hi Mom! ", "Miss you!"));
}
```

Now, if we deploy this and call our combineStrings function, our output is `Hi Mom! Miss you!`.

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm1.png' style='width: 100%; height: auto;'}

What our function is ultimately doing is encoding `Hi Mom! ` and `Miss you!` into its bytes form and then casting these bytes into a string.

If we just run abi.encodePacked without converting to a string we get:

```
bytes: 0x4869204d6f6d21204d69737320796f7521
```

`abi.encodePacked` exists in Solidity as a [**globally available method**](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#abi-encoding-and-decoding-functions). Solidity actually has a whole bunch of these. You can use the [**Cheatsheet**](https://docs.soliditylang.org/en/latest/cheatsheet.html) made available in the Solidity documentation as a reference.

You'll see lots of things throughout this list that you're already familiar with. Things like `msg.sender`, `msg.value`, `block.chainid` and more. I encourage you to look through the list!

> ❗ **NOTE**
> Since Solidity v0.8.12, you no longer need to use abi.encodePacked to concatenate strings. The preferred method is via `string.concat(stringA, stringB)`.

Before we dive deeper into what's happening when we call `encodePacked`, let's first investigate some of the finer details of sending a transaction.

### Compilation

When we compile using `forge build`, a JSON file is added to our `out` directory. This file contains a lot of data, but our purposes focus primarily on the abi and the bytecode.

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm2.png' style='width: 100%; height: auto;'}

Looking at this for the first time can be a little overwhelming, but don't worry we'll break things down a bit.

You can actually get this data right out of Remix. With our `Encoding.sol` deployed, navigate to the `Solidity Compiler` tab and click `Compilation Details`. This will provide a readout which includes the ABI and Bytecode for this contract!

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm3.png' style='width: 100%; height: auto;'}

The Bytecode object represents the binary that is actually being put on the blockchain, when we send a transaction.

When our transaction is a new deployment, the `to` parameter is left empty, but our `data` parameter is very important. The bytecode we send to the blockchain represents our `contract's initialization code` and the `contract itself`.

We can see this in Etherscan for any contract we've deployed. Here's an [**example deployment**](https://sepolia.etherscan.io/tx/0x72d701257bd21f261294e47bb749ff28409aec5e7de64528c3d8d8cb220f4bb4) of `BasicNFT.sol`. The input data you can see at the bottom (`show more details`) represents the binary data, the bytecode that we've been talking about. This data includes both the initialization of a contract as well as data representing the contract itself.

**_How does the blockchain understand what to do with this bytecode?_**

### Op Codes

Bytecode Example

```
0x60806040523480156200001157600080fd5b506040518060400160405280600881526020016710985cda58d3919560c21b8152506040518060400160405280600381526020016210919560ea1b815250816000908162000060919062000124565b5060016200006f828262000124565b5050600060065550620001f0565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000a857607f821691505b602082108103620000c957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200011f576000816000526020600020601f850160051c81016020861015620000fa5750805b601f850160051c820191505b818110156200011b5782815560010162000106565b5050505b505050565b81516001600160401b038111156200014057620001406200007d565b620001588162000151845462000093565b84620000cf565b602080601f831160018114620001905760008415620001775750858301515b600019600386901b1c1916600185901b1785556200011b565b600085815260208120601f198616915b82811015620001c157888601518255948401946001909101908401620001a0565b5085821015620001e05787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61133f80620002006000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806370a082311161008c578063b88d4fde11610066578063b88d4fde146101e1578063c87b56dd146101f4578063e985e9c514610207578063fb37e8831461021a57600080fd5b806370a08231146101a557806395d89b41146101c6578063a22cb465146101ce57600080fd5b8063095ea7b3116100c8578063095ea7b31461015757806323b872dd1461016c57806342842e0e1461017f5780636352211e1461019257600080fd5b806301ffc9a7146100ef57806306fdde0314610117578063081812fc1461012c575b600080fd5b6101026100fd366004610d6d565b61022d565b60405190151581526020015b60405180910390f35b61011f61027f565b60405161010e9190610dd7565b61013f61013a366004610dea565b610311565b6040516001600160a01b03909116815260200161010e565b61016a610165366004610e1f565b610338565b005b61016a61017a366004610e49565b610452565b61016a61018d366004610e49565b610483565b61013f6101a0366004610dea565b61049e565b6101b86101b3366004610e85565b6104fe565b60405190815260200161010e565b61011f610584565b61016a6101dc366004610ea0565b610593565b61016a6101ef366004610f68565b6105a2565b61011f610202366004610dea565b6105da565b610102610215366004610fe4565b61067c565b6101b8610228366004611017565b6106aa565b60006001600160e01b031982166380ac58cd60e01b148061025e57506001600160e01b03198216635b5e139f60e01b145b8061027957506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461028e90611060565b80601f01602080910402602001604051908101604052809291908181526020018280546102ba90611060565b80156103075780601f106102dc57610100808354040283529160200191610307565b820191906000526020600020905b8154815290600101906020018083116102ea57829003601f168201915b5050505050905090565b600061031c826106ea565b506000908152600460205260409020546001600160a01b031690565b60006103438261049e565b9050806001600160a01b0316836001600160a01b0316036103b55760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103d157506103d1813361067c565b6104435760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c00000060648201526084016103ac565b61044d838361074c565b505050565b61045c33826107ba565b6104785760405162461bcd60e51b81526004016103ac9061109a565b61044d838383610819565b61044d838383604051806020016040528060008152506105a2565b6000818152600260205260408120546001600160a01b0316806102795760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103ac565b60006001600160a01b0382166105685760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016103ac565b506001600160a01b031660009081526003602052604090205490565b60606001805461028e90611060565b61059e33838361097d565b5050565b6105ac33836107ba565b6105c85760405162461bcd60e51b81526004016103ac9061109a565b6105d484848484610a4b565b50505050565b60008181526007602052604090208054606091906105f790611060565b80601f016020809104026020016040519081016040528092919081815260200182805461062390611060565b80156106705780601f1061064557610100808354040283529160200191610670565b820191906000526020600020905b81548152906001019060200180831161065357829003601f168201915b50505050509050919050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60065460008181526007602052604081209091906106c88482611137565b506106d33382610a7e565b6006546106e19060016111f7565b60065592915050565b6000818152600260205260409020546001600160a01b03166107495760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b60448201526064016103ac565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906107818261049e565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806107c68361049e565b9050806001600160a01b0316846001600160a01b031614806107ed57506107ed818561067c565b806108115750836001600160a01b031661080684610311565b6001600160a01b0316145b949350505050565b826001600160a01b031661082c8261049e565b6001600160a01b0316146108525760405162461bcd60e51b81526004016103ac90611218565b6001600160a01b0382166108b45760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103ac565b826001600160a01b03166108c78261049e565b6001600160a01b0316146108ed5760405162461bcd60e51b81526004016103ac90611218565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b0316036109de5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103ac565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610a56848484610819565b610a6284848484610a98565b6105d45760405162461bcd60e51b81526004016103ac9061125d565b61059e828260405180602001604052806000815250610b99565b60006001600160a01b0384163b15610b8e57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610adc9033908990889088906004016112af565b6020604051808303816000875af1925050508015610b17575060408051601f3d908101601f19168201909252610b14918101906112ec565b60015b610b74573d808015610b45576040519150601f19603f3d011682016040523d82523d6000602084013e610b4a565b606091505b508051600003610b6c5760405162461bcd60e51b81526004016103ac9061125d565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610811565b506001949350505050565b610ba38383610bcc565b610bb06000848484610a98565b61044d5760405162461bcd60e51b81526004016103ac9061125d565b6001600160a01b038216610c225760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103ac565b6000818152600260205260409020546001600160a01b031615610c875760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103ac565b6000818152600260205260409020546001600160a01b031615610cec5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103ac565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6001600160e01b03198116811461074957600080fd5b600060208284031215610d7f57600080fd5b8135610d8a81610d57565b9392505050565b6000815180845260005b81811015610db757602081850181015186830182015201610d9b565b506000602082860101526020601f19601f83011685010191505092915050565b602081526000610d8a6020830184610d91565b600060208284031215610dfc57600080fd5b5035919050565b80356001600160a01b0381168114610e1a57600080fd5b919050565b60008060408385031215610e3257600080fd5b610e3b83610e03565b946020939093013593505050565b600080600060608486031215610e5e57600080fd5b610e6784610e03565b9250610e7560208501610e03565b9150604084013590509250925092565b600060208284031215610e9757600080fd5b610d8a82610e03565b60008060408385031215610eb357600080fd5b610ebc83610e03565b915060208301358015158114610ed157600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff80841115610f0d57610f0d610edc565b604051601f8501601f19908116603f01168101908282118183101715610f3557610f35610edc565b81604052809350858152868686011115610f4e57600080fd5b858560208301376000602087830101525050509392505050565b60008060008060808587031215610f7e57600080fd5b610f8785610e03565b9350610f9560208601610e03565b925060408501359150606085013567ffffffffffffffff811115610fb857600080fd5b8501601f81018713610fc957600080fd5b610fd887823560208401610ef2565b91505092959194509250565b60008060408385031215610ff757600080fd5b61100083610e03565b915061100e60208401610e03565b90509250929050565b60006020828403121561102957600080fd5b813567ffffffffffffffff81111561104057600080fd5b8201601f8101841361105157600080fd5b61081184823560208401610ef2565b600181811c9082168061107457607f821691505b60208210810361109457634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b601f82111561044d576000816000526020600020601f850160051c810160208610156111105750805b601f850160051c820191505b8181101561112f5782815560010161111c565b505050505050565b815167ffffffffffffffff81111561115157611151610edc565b6111658161115f8454611060565b846110e7565b602080601f83116001811461119a57600084156111825750858301515b600019600386901b1c1916600185901b17855561112f565b600085815260208120601f198616915b828110156111c9578886015182559484019460019091019084016111aa565b50858210156111e75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b8082018082111561027957634e487b7160e01b600052601160045260246000fd5b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906112e290830184610d91565b9695505050505050565b6000602082840312156112fe57600080fd5b8151610d8a81610d5756fea264697066735822122043a0d877831374d5912a657fb0f0442ba8618c52e0dec412cde065bffa638b3564736f6c63430008180033
```

The above may look like random numbers and letters to us, but to the `Ethereum Virtual Machine (EVM)`, this is effectively the alphabet it uses to perform computation. Every 2 bytes in the data above actually represents an op code. The website [**evm.codes**](https://www.evm.codes/) is an amazing resource for referencing these things.

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm5.png' style='width: 100%; height: auto;'}

You could almost use this reference like a dictionary. It tells us any time we see `00` in our bytecode, this represents the `STOP` operation, for example. In the bytecode example above, the first op code is `60`. This pertains to the PUSH1 operation!

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm6.png' style='width: 100%; height: auto;'}

This is what is meant by being `EVM Compatible`, `Polygon`, `Avalanche`, `Arbitrum` etc all compile to the same style of binary, readable by the `Ethereum Virtual Machine`.

Now, why are we talking about all this? How does it relate to abi encoding?

Until now we've only seen abi.encodePacked used to concatenate strings, but it's capable of much more.

### abi.encode

Strictly speaking, we can use abi encoding to encode anything we want into the bytecode format understood by the EVM.

Lets write a function to explore this. In our Encoding.sol file, in Remix add:

```solidity
function encodeNumber() public pure returns(bytes memory){
    bytes memory number = abi.encode(1);
    return number;
}
```

> ❗ **IMPORTANT**
> ABI stands for application binary interface. What we've largely seen is the human readable version of an ABI.

Go ahead and compile/deploy Encoding.sol with this new function and call it. We should have the encoded version of the number `1` output.

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm7.png' style='width: 100%; height: auto;'}

This hex format, this encoding, is how a computer understands the number `1`.

Now, as mentioned, this can be used to encode basically anything, we can write a function to encode a string and see what it's output would be just the same.

```solidity
function encodeString() public pure returns(string memory){
    byte memory someString = abi.encode("some string");
    return someString;
}
```

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm8.png' style='width: 100%; height: auto;'}

Something you may notice of each of our outputs is how many bytes of the output are comprised of zeros. This padding takes up a lot of space, whether or not it is important to the value being returned.

```bash
bytes: 0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b736f6d6520737472696e67000000000000000000000000000000000000000000
```

This is where [**abi.encodePacked**](https://docs.soliditylang.org/en/latest/abi-spec.html#abi-packed-mode) comes in and is available as a `non-standard packed mode`.

### abi.encodePacked

abi.encodePacked does much of the same encoding as abi.encode, but comes with some disclaimers.

- types shorter than 32 bytes are concatenated directly, without padding or sign extension

- dynamic types are encoded in-place and without the length.

- array elements are padded, but still encoded in-place

You can kind of think of encodePacked as a compressor which removed unnecessary padding of our binary objects.

We can demonstrate this in Remix by adding this function, redeploying our Encoding.sol contract and calling it.

```solidity
function encodeStringPacked() public pure returns(bytes memory){
    bytes memory someString = abi.encodePacked("some string");
    return someString;
}
```

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm9.png' style='width: 100%; height: auto;'}

We can clearly see how much smaller the encodePacked output is, if we were trying to by gas efficient, the advantages of one over the other are obvious.

Encoding in this way is very similar to something else we've done before, typecasting. Add this function to Encoding.sol, and redeploy to see how these compare in practice:

```solidity
function encodeStringBytes() public pure returns(bytes memory) {
    bytes memory someString = bytes("some string");
    return someString;
}
```

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm10.png' style='width: 100%; height: auto;'}

So, it looks like abi.encodePacked and bytes casting are doing the same thing here, and for us - functionally they are - but behind the scenes things are a little more complicated. We won't go into the spefics here, but I encourage you to check out the deep dive in [**this forum post**](https://forum.openzeppelin.com/t/difference-between-abi-encodepacked-string-and-bytes-string/11837).

### Decoding

Concatenating strings is fun and all, but in addition to _encoding_ things, we can also _decode_.

From the docs we can see the decode function takes the encoded data and a tuple of types to decode the data into.

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm11.png' style='width: 100%; height: auto;'}

```solidity
function decodeString() public pure returns(string memory) {
    string memory someString = abi.decode(encodeString(), (string));
    return someString;
}
```

Once again, we can add this function to our Encoding.sol contract and redeploy in remix to see how it works.

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm12.png' style='width: 100%; height: auto;'}

### Muli-Encoding/MultiDecoding

To take all this one step further, this encoding functionality affords us the ability to encode as much as we want. We can demonstrate this with the following functions:

```solidity
function multiEncode() public pure returns(bytes memory){
    bytes memory someString = abi.encode("some string", "it's bigger!");
    return someString;
}

function multiDecode() public pure returns(string memory, string memory){
    (string memory someString, string memory someOtherString) = abi.decode(multiEncode(),(string,string));
    return (someString, someOtherString)
}
```

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm13.png' style='width: 100%; height: auto;'}

When we multiEncode, you can see that our output is an _even bigger_ bytes object, with tonnes of padding. What do you think we can do about it?

You probably guessed, we can **also** multiEncodePacked. Try it out with:

```solidity
function multiEncodePacked() public pure returns (bytes memory){
    bytes memory someString = abi.encodePacked("some string", "it's bigger!");
    return someString;
}
```

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm14.png' style='width: 100%; height: auto;'}

This is actually where our fun stops a little bit. Because we're packing the encoding of multiple strings, the decoding function is unable to properly split these up. It's not possible to multiDecode a multiEncodePacked object 😦. If you try something like:

```solidity
function multiDecodePacked() public pure returns (string memory, string memory){
    string memory someString = abi.decode(multiEncodePacked(), (string));
    return someString;
}
```

... this will actually error. We do have an alternative method though.

```solidity
function multiStringCastPacked() public pure returns (string memory){
    string memory someString = string(multiEncodePacked());
    return someString;
}
```

This one actually _will_ work.

::image{src='/foundry-nfts/19-advanced-evm/advanced-evm15.png' style='width: 100%; height: auto;'}

### Wrap Up

Don't feel bad if this doesn't click right away, we're broaching some low-level concepts and functions here.

We're making great progress though and should have at least a somewhat better understanding of how the various methods of encoding and decoding are used in the EVM.

In the next lesson we'll apply these learnings and demonstrate how entire function calls can be encoded.
