---
title: Certora
---

---


### Introduction to Certora: Cloud-Based Formal Verification

#### Overview of Certora
Certora is a cloud-based formal verification tool and is also a sponsor of this course. It offers significant advantages for running complex verification processes:

- **Cloud Processing:** Allows lengthy verification processes to be conducted in the cloud, providing more computing resources and flexibility.
- **Certora Approver:** Enhanced tooling for executing and managing verification tasks.
- **New Language for Verification:** Introduces the Certora Verification Language (SVL or CL), tailored for defining fine-grained invariants and rules applicable to smart contracts.

#### Unique Capabilities of Certora
Unlike typical unit or fuzzing tests, Certora's approach mathematically proves each rule or invariant about a protocol. This method offers near-perfect assurance—beyond what fuzzing can provide—aiming to close the gap to 100% certainty and eliminate critical bugs.

#### Getting Started with Certora
To begin using Certora:

1. **Sign Up for Free:** Certora operates on a freemium model, allowing free use up to 2000 minutes per month.
   - Visit the [Certora signup page](https://www.certora.com/signup?plan=prover).
   - Use the affiliate link provided in the course materials to help support the creation of more tutorials.

2. **Email Verification:**
   - After signing up, check your email for a verification link.
   - Follow the instructions to verify your account and receive your login details.

#### Setup with Certora
Upon receiving your Certora key (similar to an API key but with no associated funds):

1. **API Key Management:**
   - Store the API key securely; although it's not as sensitive as a private key, it's important to keep it confidential.
   - Consider integrating the key into your development environment, such as VS Code, but avoid placing it in easily accessible locations like ENV files.

2. **Logging into Certora Prover:**
   - Use the login credentials to access the Certora Prover interface.
   - You will be prompted to change your password upon first login.

#### Next Steps
Once logged in, the interface will initially be empty as no verification jobs have been run yet. However, setup is now complete, and you are ready to start using Certora's tools to ensure the robustness and security of your smart contracts.ƒ