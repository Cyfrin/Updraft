---
title: Nailing the Audit Details
---

_Follow along with this video:_



---

## Getting Started

Starting off, we have our Git repository linked to this tutorial. Our client has graciously updated the codebase for this security review, featuring an improved framework and enhanced verbosity in their Security Review Code V2.

Exploring the new codebase, we find it to be comprehensive with an `SRC` folder and a script detailing deployment procedures. However, as we dig in, we find that the README needs refinement and tailoring to our needs rather than the template Foundry README. There is also a glaring omission — there are no test folders.

Uncertainty remains on what changes were made to the files in the `Lib` folder and what exactly we have to audit within this codebase. It is crucial at this point to ensure we get a complete understanding of the audit scope before any actual auditing starts. This process, known as the scoping phase, will guide you to thoroughly onboard the protocol and the client.

<img src="/security-section-3/3-details/details1.png" style="width: 100%; height: auto;">

## Preparing for the Audit: Onboarding Questions

For your convenience, the GitHub repo linked with this tutorial contains an essential document called Minimal Onboarding Questions. This document will help you extract the minimum information necessary for a successful audit or security review.

Let's go through these questions and understand why each one is important in preparing for our security review.

1. **Details regarding the project and its documentation:** Knowledge about the project and its business logic is crucial. You need to be aware of what the project is intended to do so as to spot areas where code implementation does not align with the project's purpose.
2. **Understanding the codebase:** Information about the size of the codebase, how many lines of code exist, and its complexity is incredibly vital. This data will help to estimate the timeline and workload for the audit.
3. **Setting up the project:** Details regarding deployment of the project and how to build the project should be collected.
4. **Security review scope:** Know the exact commit hash that the client plans to deploy and the specific elements of the codebase it covers. You do not want to spend time auditing code that the client has already modified or doesn't plan to use.
5. **Identifying compatibilities:** Information about the solidity version the client is using, the chains they plan on working with, and the tokens they will be integrating is important.
6. **Roles within the system:** This entails understanding the different roles and powers within the system.
7. **Awareness of known issues:** Understanding existing vulnerabilities and bugs which may not disallow the system from working but are still significant to its security.

Giving these questions to the client allows you to garner the bare minimum information to conduct the audit. It's worth noting that this allied assistance is a two-way street. While our onboarding questions help clients clarify their requirements to us, we, in turn, educate them on the value of a well-executed audit, the precautions necessary for optimal security, and the potential hazards of insufficient project documentation.

## Modifying the Codebase &amp; Client Cooperation

Once our client has filled out the minimal onboarding questions and we have clarified all ambiguities, we are ready to start modifying the codebase.

Clients must provide an adequately documented codebase for comprehensive and effective auditing. For instance, missing sections like a test folder in our case clearly indicate that the codebase is unready for auditing.

In such cases, we go back to the client, highlight the gaps, and have them complete the documentation or supply any missing details.

In response, your client should comply and work on making the codebase secure, since they do not want to be vulnerable to hacking threats. We also advise our clients that including tests and elaborate documentation can only set up the codebase for more accurate assessment and effective security recommendations.

## Digging into the Updated Codebase

With the client's cooperation and our earlier efforts, we can now go forward with the codebase inspection. We find a richly documented codebase optimized for security review in the 'onboarded' branch. For a quick reference, we usually set the essential scope details in the README.

Remember, asking the right onboarding questions, setting clear auditing scopes, and ensuring proper documentation is not only helpful for a smooth auditing process but also indirectly teaches clients about taking security seriously.

Happy auditing!
