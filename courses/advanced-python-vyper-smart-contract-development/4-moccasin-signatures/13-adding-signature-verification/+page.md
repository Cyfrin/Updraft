## Adding Signature Verification to Claim

We're going to add signature verification to our claim function. We'll do this by creating a new function called `get_message_hash`. This function will take an account address and an amount, and it will return a bytes32. 

```python
def get_message_hash(account: address, amount: uint256) -> bytes32:
    return keccak256(abi.encode(MESSAGE_TYPEHASH, AirdropClaim(account=account, amount=amount)))
```

We also need to create a new struct called `AirdropClaim` that contains an account address and an amount. 

```python
struct AirdropClaim:
    account: address
    amount: uint256
```

We'll also need to define a constant called `MESSAGE_TYPEHASH` to be used when hashing the message. 

```python
MESSAGE_TYPEHASH: constant(bytes32) = keccak256("AirdropClaim(address account, uint256 amount)")
```

We will initialize EIP712 when our contract is deployed. 

```python
def __init__(merkle_root: bytes32, airdrop_token: address):
    eip712.__init__(EIP712_NAME, EIP712_VERSION)
    MERKLE_ROOT = merkle_root
    AIRDROP_TOKEN = IERC20(airdrop_token)
```

Now, in the `claim` function we'll use our `get_message_hash` function to get the message hash and then check that the signature is valid.

```python
def claim(account: address, amount: uint256, merkle_proof: DynArray[bytes32, PROOF_MAX_LENGTH], v: uint8, r: bytes32, s: bytes32):
    """Allows users to claim the airdropped tokens."""
    assert not self.has_claimed(account), "merkle_airdrop: Account has already claimed."
    message_hash: bytes32 = self._get_message_hash(account, amount)
    assert self.is_valid_signature(account, message_hash, v, r, s, "Invalid Signature")
    leaf: bytes32 = keccak256(abi.encode(keccak256(abi.encode(account, amount))))
    assert merkle_proof_verification.verify(merkle_proof, MERKLE_ROOT, leaf), "Invalid Proof"
    self.has_claimed(account) = True
    log.Claimed(account, amount)
    success: bool =  extcall(AIRDROP_TOKEN, "transfer(address, uint256)", account, amount)
    assert success, "Transfer Failed"
```

Finally, we'll add a function called `is_valid_signature` that takes an account, message hash, v, r, and s as input, and returns a bool. 

```python
@internal
def is_valid_signature(account: address, message_hash: bytes32, v: uint8, r: bytes32, s: bytes32) -> bool:
    v: uint256 = convert(v, uint256)
    r: uint256 = convert(r, uint256)
    s: uint256 = convert(s, uint256)
    actual_signer: address = ecdssa._try_recover_vr_s(message_hash, v, r, s, account)
    return actual_signer == account
```

We need to import `ECDSA` from `snekmate.utils` to use the `_try_recover_vr_s` function. 

```python
from snekmate.utils import ECDSA
```

We've now added signature verification to our claim function. 
