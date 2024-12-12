We are going to understand the concept of the EIP-712 version thing we keep seeing.  

As Kira just spoke about, this EIP-712 version is going to be the version of EIP-712 that we're working with, which we're working with number one. We can look up EIP-712 in the Ethereum uh in the Ethereum Improvement Proposals website, which is this typed structured data hashing and signing. This is what Kira just went over and if we scroll down, we can see in here we see version. Where is version? Version. We can finally see what these EIP-712 things are for. So, right, anytime we create a token, we usually add this name and this version thing for some reason. So, if we go to the ERC20, we see it's the name EIP-712 and the version EIP-712. So, the name EIP-712 is going to be the maximum 50 character user-readable string name of the signing domain and then the version is the maximum 20 character current version of the signing domain. Signatures from different versions are not compatible. 

If we scroll down, all we really do with these two is we do this EIP-712 domain separator .init. So, we can look that up as well in the utils. Scroll down, EIP-712 domain separator. We can look at the init here.

```javascript
function signMessageEIP712(uint256 message) internal view returns (uint8, bytes32, bytes32) {
  // to encode this, we need to know the domain separator!
  bytes32 prefix = bytes32(hex"19");
  // EIP-712 is version 1 of EIP-191
  bytes32 eip191Version = bytes32(hex"01");
  bytes32 hashedMessageStruct = keccak256(abi.encodePacked(signatureVerifier.TYPEHASH(), SignatureVerifier.number(message, number)));
  bytes32 digest = keccak256(abi.encodePacked(prefix, eip191Version, signatureVerifier.domain_separator(), hashedMessageStruct));
  return vm.signUser.key, digest;
}
```

All this is doing is it's making is it's setting this contract up so that it can do these signatures without running into security issues like signature replays or chain replays etc. So, there's just a ton of stuff in here, a ton of boilerplate in here that has to do with the different versions of EIP-712 domain separator's, getting hash data, etc. So, everything in here is just making doing signatures much better. 

Now, one of the questions is, okay, cool Patrick, but like why is this why is this here? Like, what what do we care about signatures? Does this ERC20 have any signature functionality? And the answer is absolutely. So, on here, there's this function called permit and if you look here, you can see this looks pretty similar to approve except it has a v r and s at the end here.

```javascript
function permit(uint256 message, uint8 v, bytes32 r, bytes32 s) public {
  // Sign a message
  (uint8 v, bytes32 r, bytes32 s) = signMessageEIP712(message);
  // Verify the message
  bool verifiedOnce = signatureVerifier.verifySignerEIP712(messageStruct, v, r, s, userAddr);
  assertEq(verifiedOnce, true);
}
```

So, as you've seen by now having done many different tests, anytime you want to interact with a smart contract, you need to send two transactions, right? You need to first do an approve and then you need to call the transfer from. Now, this is incredibly annoying for a lot of people, for a lot of reasons because the user has to call this approve every single time. So, what a lot of people in the Ethereum community did was they said hey, it would be great if the approver could just sign something somebody else could pay the gas cost of approving that way I could just roll up and call my single function and have a much better experience. There's this EIP-2612 which talks a lot about this permit extension to EIP-20 signed approvals and so, a lot of tokens have taken on this permit functionality to make people's lives with working with tokens a lot easier. So, it's a bit of a mouthful but essentially, this name and EIP-712 version this makes signing and working with this permit functionality much easier. Prevents replay attacks and prevents a lot of attacks like that. So, it's incredibly powerful and we're going to be using some of it here. 
