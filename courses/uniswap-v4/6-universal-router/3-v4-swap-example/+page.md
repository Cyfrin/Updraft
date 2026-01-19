## How to Execute a Swap on Uniswap V4 with the Universal Router

Uniswap V4 introduces a powerful and flexible architecture centered around the `UniversalRouter.sol` contract. This router acts as a single entry point for complex interactions, including swaps, by executing a sequence of commands in one atomic transaction. This guide will break down how to construct a transaction to perform a basic swap using the Universal Router, focusing on the two critical parameters: `commands` and `inputs`.

## Understanding the Core `execute` Function

All interactions with the Universal Router begin with its primary function, `execute`. This function is designed to be highly generic, capable of processing any combination of supported commands you provide.

**Function Signature:**
```solidity
// File: UniversalRouter.sol

function execute(bytes calldata commands, bytes[] calldata inputs) public payable override;
```

To call this function successfully, you must correctly prepare two arguments:

*   `bytes calldata commands`: This is a tightly packed byte string that specifies *what* actions you want the router to perform. Each command is represented by a single byte.
*   `bytes[] calldata inputs`: This is an array of byte strings, where each element contains the ABI-encoded parameters for the corresponding command in the `commands` string. The length of this array must exactly match the number of commands.

## Constructing the `commands` Parameter for a V4 Swap

The `commands` parameter is a blueprint for your transaction's execution path. For a Uniswap V4 swap, the specific command we need is `V4_SWAP`.

This command, like others, is defined as a constant in the `Commands.sol` library contract. The `V4_SWAP` command has a hexadecimal value of `0x10`.

**From `Commands.sol`:**
```solidity
// File: Commands.sol

// Command Types where 0x10 <= value < 0x20
uint256 constant V4_SWAP = 0x10;
```

To prepare the `commands` parameter for the `execute` function, you must encode this constant into a `bytes` string. Since each command is a single byte, you first cast the `uint256` constant to a `uint8` and then use `abi.encodePacked` to create the final byte string.

For a single `V4_SWAP` command, the construction is straightforward:

```solidity
// Solidity pseudo-code for creating the 'commands' parameter
bytes memory commands = abi.encodePacked(uint8(Commands.V4_SWAP));
```

If you were to chain multiple commands, you would simply pack them together in the desired order of execution.

## Building the `inputs` Parameter: Actions and Params

While `commands` tells the router *what* to do, the `inputs` parameter provides the specific details on *how* to do it. For the `V4_SWAP` command, its corresponding input is not a simple set of values but a structured, ABI-encoded payload containing two distinct parts:

1.  `bytes actions`: A byte string of encoded action identifiers that outline the sequence of low-level operations required to complete the swap (e.g., performing the swap, settling balances, and transferring tokens).
2.  `bytes[] params`: An array of ABI-encoded parameters, where each element corresponds one-to-one with an action in the `actions` string.

These two parts must be ABI-encoded *together* to form the single `bytes` element that serves as the input for our `V4_SWAP` command.

**Pseudo-code for the `inputs` Parameter:**
```solidity
// 1. Define the low-level actions and their corresponding parameters.
//    (Details on these actions are in the next section)
bytes memory actions = ...;
bytes[] memory params = ...;

// 2. ABI-encode the actions and params together to create the input for V4_SWAP.
bytes memory v4SwapInput = abi.encode(actions, params);

// 3. Create the final 'inputs' array for the 'execute' function.
//    Since we only have one command (V4_SWAP), this array has one element.
bytes[] memory inputs = new bytes[](1);
inputs[0] = v4SwapInput;
```

## A Deeper Dive into Swap `actions` and Their `params`

A V4 swap is not a monolithic operation. It's a sequence of distinct `actions` that manage token balances within the singleton V4 architecture. A typical exact-input swap requires the following sequence of actions:

1.  **`SWAP_EXACT_IN`**: Executes the core token-for-token exchange.
2.  **`SETTLE`**: Pays the pool for the input tokens taken from it. This settles the router's temporary debt.
3.  **`TAKE`**: Withdraws the output tokens from the router's internal balance and sends them to the specified recipient.

Each of these actions requires its own set of parameters, which must be individually ABI-encoded and placed in the `params` array in the correct order.

#### a. Parameters for `SWAP_EXACT_IN`

The parameters for this action are defined by the `ExactInputParams` struct found in `IV4Router.sol`.

**Struct Definition:**
```solidity
struct ExactInputParams {
    Currency currencyIn;
    PathKey[] path;
    uint128 amountIn;
    uint128 amountOutMinimum;
}
```
You would create an instance of this struct, populate it, and then ABI-encode it to get the first element for your `params` array.

#### b. Parameters for `SETTLE`

By inspecting the `handleAction` logic in the `V4Router.sol` contract, we can determine the parameters for the `SETTLE` action.

*   **Required Parameters:** `(Currency currency, uint256 amount, bool payerIsUser)`
*   **Encoding:** These three values must be ABI-encoded into a single `bytes` string (`abi.encode(...)`).

#### c. Parameters for `TAKE`

Similarly, the `handleAction` logic reveals the parameters for the `TAKE` action.

*   **Required Parameters:** `(Currency currency, address recipient, uint256 amount)`
*   **Encoding:** These three values must also be ABI-encoded into a `bytes` string.

Putting it all together, your final `params` array will be a `bytes[]` containing three elements: the encoded `ExactInputParams` struct, the encoded `SETTLE` parameters, and the encoded `TAKE` parameters.

## Tying It All Together: The Call Flow

Understanding the internal call flow helps clarify why this nested data structure is necessary. When you call `execute`:

1.  **`UniversalRouter.sol`**: The `execute` function receives your `commands` and `inputs`. It begins iterating through the commands.
2.  **`Dispatcher.sol`**: For the `V4_SWAP` command (`0x10`), the Universal Router calls `dispatch`, which routes the request to the appropriate handler—the V4 Router.
3.  **`V4Router.sol`**: The V4 Router receives the corresponding input (`inputs[0]`). It decodes this input back into `actions` and `params`. It then iterates through each action, calling its internal `_handleAction` function with the corresponding parameter from the `params` array, executing your swap step-by-step.

## Key Principles for Interacting with the Universal Router

*   **Commands vs. Actions**: Remember the distinction. **Commands** (`V4_SWAP`) are high-level instructions for the Universal Router. **Actions** (`SWAP_EXACT_IN`, `SETTLE`) are the granular, low-level operations executed by the V4 Router to fulfill a command.
*   **ABI Encoding is Critical**: The entire system relies on precise ABI encoding at multiple levels. You must encode the parameters for each action, and then you must encode the complete list of actions and params together for the V4_SWAP command's input.
*   **Consult the Source Code**: To determine the correct parameters for any given action, the ultimate source of truth is the V4 periphery contracts. Locate the action constant in `Actions.sol` and trace its implementation within the `handleAction` function in `V4Router.sol` to see how it decodes its `params`.