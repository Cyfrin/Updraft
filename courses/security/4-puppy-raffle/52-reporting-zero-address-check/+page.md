---
title: Reporting - Zero Address Check
---

_Follow along with this video:_

---

### Zero Address Check

We're flying through these! Next note that comes up when we search our `@Audit` tag is ...

```js
constructor(uint256 _entranceFee, address _feeAddress, uint256 _raffleDuration) ERC721 ("Puppy Raffle, "PR""){
// @Audit: check for zero address!
...
}
```

This is another finding `Aderyn` caught for us, we can just copy and paste this write up into our report like so:

````md
### [I-3] Missing checks for `address(0)` when assigning values to address state variables

Assigning values to address state variables without checking for `address(0)`.

- Found in src/PuppyRaffle.sol [Line: 69](src/PuppyRaffle.sol#L69)

  ```solidity
          feeAddress = _feeAddress;
  ```

- Found in src/PuppyRaffle.sol [Line: 159](src/PuppyRaffle.sol#L159)

  ```solidity
          previousWinner = winner;
  ```

- Found in src/PuppyRaffle.sol [Line: 182](src/PuppyRaffle.sol#L182)

  ```solidity
          feeAddress = newFeeAddress;
  ```
````

Leveraging our tools is a great way to speed up the write up process. Thanks, `Aderyn`! Mark the note as complete and we'll move on to the next finding!

```js
constructor(uint256 _entranceFee, address _feeAddress, uint256 _raffleDuration) ERC721 ("Puppy Raffle, "PR""){
// @Written: check for zero address!
...
}
```
