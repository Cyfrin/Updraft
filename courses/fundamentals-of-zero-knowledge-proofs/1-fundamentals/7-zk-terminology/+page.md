Welcome to this foundational lesson on Zero-Knowledge Proof (ZKP) terminology. Understanding these core concepts is essential as we delve deeper into the world of ZKPs. This lesson will equip you with a baseline understanding of terms frequently encountered in ZKP research and discussions.

It's important to note a general caveat before we begin: the terminology in the ZKP space is not always used with universal consistency. Meanings can subtly shift based on context, and you might encounter slight disagreements on precise definitions within the broader community. However, the definitions provided here are crucial for understanding the material in this course and for navigating ZKP literature effectively.

## Understanding Claims and Statements in ZKPs

A **Claim** or **Statement** is an assertion that something is true. In the context of Zero-Knowledge Proofs, it refers to the specific property that a prover wishes to demonstrate is true, without revealing any additional, secret information related to that property. The terms "claim" and "statement" are often used interchangeably. Essentially, it's the assertion the prover makes, for which they possess a "witness" (a concept we'll define shortly).

Let's consider a couple of examples:

1.  **Mathematical Example:**
    The statement could be: "I know a number `x` such that `x^2 = 9`."
    Here, the prover wants to convince a verifier that they indeed know such a number `x`, but critically, *without revealing the actual value of `x`* (which could be 3 or -3).

2.  **Real-world Example:**
    The statement could be: "I am over the minimum age required to enter this adults-only club."
    In this scenario, the prover needs to convince the verifier that they meet the age requirement *without disclosing their specific age or date of birth*.

In summary, the statement or claim is the central assertion that the prover aims to validate through the ZKP.

## Differentiating Private and Public Inputs

In a ZKP system, **Inputs** are akin to variables. These inputs are broadly categorized into private and public inputs.

### Private Inputs

**Private Inputs** are values known *only* to the prover. They are not disclosed to the verifier or any other party. These inputs are integral to the "witness," which is the secret information the prover uses to construct the proof.

Examples of private inputs include:

*   Passwords
*   Secret cryptographic keys

Let's revisit our previous examples:

*   In the statement "I know `x` such that `x^2 = 9`," the value of `x` itself is the **private input**.
*   In the statement "I am over the minimum age," the individual's actual `my age` (e.g., their specific date of birth or age in years) is the **private input**.

### Public Inputs

**Public Inputs** are values known to *both* the prover and the verifier. These inputs are used by the verifier to check the validity of the proof provided by the prover. They often define the specific instance of the problem being proven.

Examples of public inputs include:

*   Cryptographic commitments
*   A public key
*   A hash digest

Considering our examples:

*   For "I know `x` such that `x^2 = 9`," while not explicitly stated as a distinct public input in its simplest form, the value `9` could be considered a public input as it defines the target of the equation.
*   For "I am over the minimum age," the `minimum age` itself (e.g., 18 or 21) is a **public input**. Both the prover and the verifier are aware of this threshold.

## Defining Constraints: The Rules of the Game

A **Constraint** is a mathematical condition or equation that must be satisfied for the claim to be considered valid. Constraints define the rules that the inputs (both private and public) must adhere to. The way constraints are expressed depends on the specific ZKP constraint system being used, such as R1CS (Rank-1 Constraint System) or Plonkish systems.

Let's apply this to our examples:

1.  **For the claim `x^2 = 9`:**
    *   A direct constraint could be: `Assert that x^2 = 9`.
    *   In some constraint systems like R1CS, this single assertion might be broken down into multiple, simpler constraints involving intermediate variables. For instance:
        1.  `x * x = z` (where `z` is an intermediate variable representing `x^2`)
        2.  `z - 9 = 0` (asserting that `z` is indeed equal to `9`)
    It's worth noting that many higher-level ZKP programming languages (like Noir or Circom) often abstract away this level of granular detail, allowing developers to express constraints more intuitively.

2.  **For the age verification claim:**
    *   The constraint would be: `my_age >= min_age`. This mathematically expresses the condition that the prover's private age must be greater than or equal to the public minimum age.

## What is a Circuit in Zero-Knowledge Proofs?

A **Circuit** in the ZKP context is a system of constraints. It represents a collection of mathematical relations and operations that, taken together, define the computation or property being proven. For the overall claim to be deemed valid by the verifier, *all* constraints within the circuit must be satisfied.

Building on our examples:

1.  **For `x^2 = 9`:**
    *   If the claim is represented by the single constraint `x^2 = 9`, then the circuit consists of just this one constraint.
    *   If it's broken down R1CS-style, the circuit would be the set of constraints: `{ x * x = z, z - 9 = 0 }`.

2.  **Extended Age Verification Example:**
    Suppose the claim is more complex: "I am over the minimum age AND below a maximum age."
    This would involve two constraints:
    *   Constraint 1: `my_age >= min_age`
    *   Constraint 2: `my_age < max_age`
    The **circuit** would then comprise both these constraints. The proof would need to satisfy both to be valid.

## The Role of the Witness in ZKPs

The **Witness** is the set of *secret (private) values* that enables a prover to demonstrate that their claim or statement is true and satisfies all defined constraints. It primarily includes the private inputs. However, it can also encompass intermediate values computed during the proof generation process that are necessary to satisfy the constraints. For example, in the `x * x = z` and `z - 9 = 0` constraint system, the value of `z` would also be part of the witness, alongside the private input `x`.

A critical requirement is that the witness *must* satisfy all the constraints defined within the circuit.

There's a nuance to this definition: some literature (notably, Vitalik Buterin's blog post on Quadratic Arithmetic Programs) may refer to the "witness" as the complete assignment of *all* variables in the circuit. This includes private inputs, public inputs, and all intermediate values. For our purposes, we'll primarily focus on the witness as the secret information known to the prover.

In our `x^2 = 9` example:
*   The primary witness is the value of `x`.
*   If intermediate variables like `z` (where `x^2 = z`) are used in the constraint system, then `z` would also be considered part of the witness.

## The Prover and Verifier: Roles Revisited

With these new terms defined, let's revisit the roles of the Prover and Verifier:

### Prover

The **Prover** is the entity responsible for generating the proof of computation. Key aspects of the Prover's role include:

*   Possessing the **witness** (the secret information).
*   Using the witness to demonstrate that all **constraints** within the **circuit** are satisfied.
*   Generating a proof that convinces the verifier of the validity of the **claim/statement**.
*   Crucially, doing so *without revealing the witness itself* or any other secret information.
The Prover essentially provides a "proof of computation," assuring the Verifier that a specific computation was performed correctly with inputs that satisfy the defined rules.

### Verifier

The **Verifier** is the entity that checks whether the proof provided by the Prover is valid. The Verifier's role involves:

*   Receiving the proof from the Prover, along with any **public inputs** relevant to the claim.
*   Running a verification algorithm using the proof and public inputs.
*   Confirming whether the Prover's **claim/statement** is true without learning any private information (like the witness).
Verification can occur in various contexts, such as off-chain by an individual or application, or on-chain via a smart contract.

## Navigating ZKP Terminology: Key Takeaways and Next Steps

The terminology surrounding Zero-Knowledge Proofs can be nuanced and, at times, challenging to grasp fully due to slight variations in usage across different resources. Context is key to understanding the intended meaning of a term.

Don't be discouraged if these concepts don't click immediately. Repeated exposure through re-watching lessons, reading blog posts, and engaging with ZKP materials will help solidify your understanding.

In our next lesson, we will explore another critical ZKP concept: the "Trusted Setup." Stay tuned to continue building your ZKP knowledge.