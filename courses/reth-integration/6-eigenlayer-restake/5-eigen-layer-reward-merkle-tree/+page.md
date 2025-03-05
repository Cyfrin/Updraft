## EigenLayer Rewards Merkle Tree

Rewards in EigenLayer are submitted as a Merkle tree root. It’s helpful to know what this Merkle tree represents when claiming rewards.

At the top of the Merkle tree structure is the Merkle root. Each leaf contains information about the earner. Let's say that we have N earners. Each earner will contain two pieces of data: the address of the earner, and the token root. The token root is another root to a Merkle tree.

For example, earner two can claim up to K tokens as reward. Earner two will contain information about the address for earner two and the token root specific to earner two. The token root is a Merkle tree root. At the leaf is some information about the token, i.e. token 1 to K.

Each of these will contain information about the address of the token and cumulative earnings, or the amount of tokens that they have earned so far.
