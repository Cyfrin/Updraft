---
title: What If I Find A Bug
---

**Follow along with this video:**

---

### Handling Bug Discoveries

As a white hat or security researcher, finding a bug in production code requires careful handling. We discussed this topic with OpenZeppelin security expert Michael Lewin, who shared insights from his experience with live scenarios. You can watch the interview [here](https://www.youtube.com/watch?v=KhmRoF1NynM).

### Key Steps When You Find a Bug

1. **Do Not Exploit It**: Exploiting the bug can lead to legal consequences and unintended outcomes. Instead, follow responsible vulnerability disclosure practices.

2. **Contact the Team**: Your first step should be to reach out to the protocol's team. If you can't reach them, consider contacting Seal 911 or another smart contract emergency service.

3. **Secure Communication**: Once in contact, use a secure, encrypted channel like Signal to discuss the vulnerability. Share your audit write-up detailing the issue and its potential impact.

4. **Develop a Fix Plan**: Work with the protocol team to develop a plan to fix the bug. If there are complexities, such as governance windows or immutable code, seek additional help from Seal 911 or similar groups. Use MEV-proof RPC or MEV protection during the fix deployment to prevent exploitation.

### What If Scenarios

- **No Security Contact or Bug Bounty**: If you can't find a responsible party, announce a window for users to exit the protocol before public disclosure. This should be a last resort.
- **Ignored Bug**: If the protocol ignores the bug, give them a window to respond. If they still do nothing, consider public disclosure, allowing users to leave the protocol safely.

- **No Compensation**: If the protocol refuses to pay for your findings, it reflects poorly on them. While you could publicize this, it may backfire. Ideally, protocols should act in good faith and reward security researchers.

- **Active Exploitation**: If an attack is already in the mempool, front-running the exploit might be necessary. Legal implications still apply, but safe harbor agreements can provide some protection.

### Summary

In an ideal scenario, do not exploit the bug. Instead, contact the protocol team, work with them to fix the issue, and hope for a reward. If complications arise, use the guidelines above to navigate the situation carefully. Responsible disclosure helps maintain security and trust in the web3 ecosystem.

---

By following these steps, you can handle bug discoveries responsibly, ensuring the security and integrity of the affected protocol while minimizing potential legal and ethical issues.
