---
title: Pre-Deployment Steps
---

**Follow along with this video:**

---

Now that we understand the current state of security in the industry and the topics we will cover in this section, let's start with the protocol's perspective on pre-deployment steps. For those deploying smart contracts, these steps are crucial.

### Pre-Deployment Best Practices

Before deploying your project, ensure robust security measures are in place:

1. **Pass the Rekt Test**: Perform the Rekt Test, provided by Trail of Bits, to identify potential vulnerabilities. [Read more about the Rekt Test](https://blog.trailofbits.com/2023/08/14/can-you-pass-the-rekt-test/).

2. **Set Up a Security Contact**: Include a security contact email in your code. For DAOs, consider electing a security officer or provide clear instructions for reporting security issues.

3. **Implement Monitoring Systems**: Establish monitoring for invariants and potential issues. Effective monitoring is crucial for early detection of hacks.

4. **Establish a Bug Bounty Program**: Set up a bug bounty or safe harbor program to encourage responsible disclosure and help identify vulnerabilities before they can be exploited.

### Example: OpenZeppelin

OpenZeppelin is an excellent example of setting up a security contact and policy. On their [GitHub security tab](https://github.com/OpenZeppelin/openzeppelin-contracts/security), they outline their security policy, including contact details and their use of the Immunefi bug bounty platform.

- **Security Policy**: Vulnerabilities should be disclosed via Immunefi or by emailing `security@openzeppelin.com`.
- **Bug Bounty**: OpenZeppelin has a bug bounty program for reporting issues and getting compensated.
- **Advisories**: They provide detailed advisories on past bugs, affected versions, and patches.

### Legal Considerations

OpenZeppelin includes a legal section on their GitHub, outlining the legal bindings of their protocol. This information is crucial for users and security researchers to understand their legal obligations and rights.

### Safe Harbor Agreements

The Security Alliance introduced safe harbor agreements to protect white hat hackers from legal repercussions if they disclose vulnerabilities responsibly. [Learn more about Safe Harbor](https://github.com/security-alliance/safe-harbor).

As a security researcher, always check if a protocol has a safe harbor agreement and understand it thoroughly before proceeding with any actions.

### Encouraging Best Practices

Protocols should:

- Provide contact information for security issues.
- Set up bug bounty programs with appropriate rewards (e.g., 10% of TVL, capped at $5 million).
- Detail security patches, disclosures, and advisories on their GitHub page.
- Optionally include a safe harbor agreement.

Security researchers should:

- Encourage protocols to implement these security measures.
- Avoid exploiting vulnerabilities and instead report them responsibly.

By following these pre-deployment steps, protocols can ensure their projects are secure and resilient against potential threats, maintaining the integrity and trustworthiness of blockchain projects.

---

For more detailed steps and examples, refer to the resources linked above. Stay proactive in securing your protocols and contributing to a safer blockchain ecosystem.
