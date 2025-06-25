---
title: Aderyn Walkthrough
---

_Follow along with this video:_

---

### Aderyn Static Analysis

Next, let's see what `Aderyn` can do for the Puppy Raffle repo. We'll assess each of the findings in turn. Some of which will include:

- Centralization Risks
- Dynamic Types & abi.encodePacked
- Non-Indexed Events

We can start by running `aderyn .`. This should generate an already formatted markdown report for us. Once run, open `report.md`

### Aderyn Mediums

**1. Centralization Risk for Trusted Owners**

- Dangerous Calls: - Found in src/PuppyRaffle.sol [Line: 180](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L180)

      ```solidity
          function changeFeeAddress(address newFeeAddress) external onlyOwner {
      ```

  This vulnerability is likely to crop up more and more as time goes on, unfortunately. In the context of Puppy Raffle, we're going to ignore it, all the owner can really do is change the feeAddress. This is absolutely something that should be called out in private audits.

### Aderyn Lows

**1. `abi.encodePacked()` should not be used with dynamic types when passing the result to a hash function such as `keccak256()`**

- Dangerous Calls: - Found in src/PuppyRaffle.sol [Line: 213](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L213)

      ```solidity
                  abi.encodePacked(
      ```

      - Found in src/PuppyRaffle.sol [Line: 217](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L217)

      ```solidity
                              abi.encodePacked(
      ```

  `Aderyn` here is pointing out that we should only use `encodePacked` for appropriate circumstances and that `encode` should be preferred to avoid hash collisions. We're going to ignore this for the purposes of this course, but I encourage you to investigate further to understand the reasoning here and find examples of hash collisions yourself.

**2. Solidity pragma should be specific, not wide**

- Dangerous Calls: - Found in src/PuppyRaffle.sol [Line: 3](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L3)

      ```solidity
      pragma solidity ^0.7.6;
      ```

  We got this one! This is the same as our `Floating Pragma` finding.

### Aderyn Informational/Gas

**1. Missing checks for `address(0)` when assigning values to address state variables**

- Dangerous Calls: - Found in src/PuppyRaffle.sol [Line: 69](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L69)

      ```solidity
              feeAddress = _feeAddress;
      ```

      - Found in src/PuppyRaffle.sol [Line: 159](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L159)

      ```solidity
              previousWinner = winner;
      ```

      - Found in src/PuppyRaffle.sol [Line: 182](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L182)

      ```solidity
              feeAddress = newFeeAddress;
      ```

  We got this one! `zero address checks` will be a common topic in security reviews you do. Familiarize yourself with spotting them!

**2. Functions not used internally could be marked external**

- Dangerous Calls: - Found in src/PuppyRaffle.sol [Line: 86](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L86)

      ```solidity
          function enterRaffle(address[] memory newPlayers) public payable {
      ```

      - Found in src/PuppyRaffle.sol [Line: 105](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L105)

      ```solidity
          function refund(uint256 playerIndex) public {
      ```

      - Found in src/PuppyRaffle.sol [Line: 205](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L205)

      ```solidity
          function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
      ```

  Puppy Raffle has these function marked as `public`, which is _fine_, but if they aren't used internally as well as externally, we can just mark them as `external` for a small gas savings.

> **Note:** In the video, I assume this is referencing the `_getActivePlayer` function that is unused. Whoops!

**3. Constants should be defined and used instead of literals**

- Dangerous Calls - Found in src/PuppyRaffle.sol [Line: 94](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L94)
  `solidity
  for (uint256 i = 0; i < players.length - 1; i++) {
  `

      - Found in src/PuppyRaffle.sol [Line: 96](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L96)

      ```solidity
      for (uint256 j = i + 1; j < players.length; j++) {
      ```

      - Found in src/PuppyRaffle.sol [Line: 141](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L141)

      ```solidity
      uint256 prizePool = (totalAmountCollected * 80) / 100;
      ```
      - Found in src/PuppyRaffle.sol [Line: 142](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L142)

      ```solidity
          uint256 fee = (totalAmountCollected * 20) / 100;
      ```
      - Found in src/PuppyRaffle.sol [Line: 148](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L148)

      ```solidity
          uint256 rarity = uint256(keccak256(abi.encodePacked(msg.sender, block.difficulty))) % 100;
      ```

  `Aderyn` was a little too vigilant here, catching the `Magic Numbers` used in our for loops, but it also caught a `Magic Numbers` in the `prizePool` and `fee` calculations as well! We got this one earlier.

**4. Event is missing `indexed` fields**

- Dangerous Calls: - Found in src/PuppyRaffle.sol [Line: 59](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L59)

      ```solidity
          event RaffleEnter(address[] newPlayers);
      ```

      - Found in src/PuppyRaffle.sol [Line: 60](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L60)

      ```solidity
          event RaffleRefunded(address player);
      ```

      - Found in src/PuppyRaffle.sol [Line: 61](https://github.com/Cyfrin/4-puppy-raffle-audit/blob/15c50ec22382bb1f3106aba660e7c590df18dcac/src/PuppyRaffle.sol#L61)

      ```solidity
          event FeeAddressChanged(address newFeeAddress);
      ```

  Indexing fields ultimately makes it easier for off-chain tools to access the emitted event data. Indexing event parameters costs more gas however, so there's a trade-off. Not using indexed fields could be defended as a design choice, but in an ideal world, they would be indexed.

### Wrap Up

That was quick! `Aderyn` is great in that this output is already formatted beautifully and we could reasonably just copy and paste it's finding into our report. Going through the outlined issues is a good practice however, as these static analysis tools paint with wide strokes and not everything caught may be applicable or valid.
