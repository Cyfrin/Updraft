---
title: Your first Certora Run
---

---

### Setting Up and Running Certora Prover

**Initial Setup**
Firstly, with the setup complete and the documents (docs) on hand, we use the Certora approver through the command line. However, for this demonstration, we'll focus on executing commands through the configuration file (comp file).

**Launching the Terminal**
Once our `FVCatches.conf` and `FVCatches.spec` are ready, we proceed with the test `invariant-break` for` of verification. The primary command used is:

```shell
certoraRun ./test/invariant-break/formal-verification/certora/conf/FVCatches.conf
```
This command connects us to the Certora cloud provider, granting access to a URL where the verification process is visible.

**Understanding the Verification Process**
After running the command and waiting for the process to complete, the output becomes visible. On the screen, several elements can be observed:
- **Rules Tab**: Located in the top left, displaying various rules and their status.
- **Spec File**: Clicking on the spec file reveals the specifications used for the verification.


**Output and Verification Results**
In the output, we note:
- A checkmark indicating the rule "hellFunc must never revert" was verified.
- A lack of contract call resolutions, as it was a straightforward assert true command.

**Practical Use of the Verification Run**
This run serves as a sanity check, demonstrating the interface and the immediate results of running a command.

**Simplifying Commands Using Makefile**
To streamline the process, we introduce the use of a makefile, so adding the command above we can the just run: 

```
make certora
```
This command within the makefile replaces the long terminal command, simplifying the execution process. It's not demonstrated here, but is prepared for use to make future processes more efficient.

