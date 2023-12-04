---
title: Finding Writeup Recap
---

_Follow along with this video:_



---

## Previewing Your First Write-Up

<img src="../../../../../static/security-section-3/18-writeup/writeup1.png" style="width: 100%; height: auto;">

The only thing that's missing is the severity, but don't worry, we'll come back to that a little later. For now, let's go over the structure and content of your initial write-up.

### The Write-Up Structure

1. **Title**: It's hard-hitting and to the point. For example, "Storing the password on-chain leads to privacy breach."
2. **Severity Status**: This is currently absent but we'll come back to it.
3. **Root Cause**: The title explains the bug's root cause — the password storage on-chain is visible to anyone, which is a significant privacy issue.
4. **Impact**: It highlights the considerable ramifications — that the password isn't private anymore.
5. **Description**: This is a brief explanation of the problem, widely enhanced by using markdown.
6. **Proof of Code**: It explains how anyone, with available tools, could exploit this particular vulnerability.
7. **Recommended Mitigation**: A practical mitigation is suggested, such as encrypting the password off-chain and storing the encrypted password on-chain.

While it may feel provocative to suggest ditching the whole protocol, we'd like to keep things constructive, offering more context or solutions where possible. Our goal is to educate developers on securing their smart contracts better.

With this first issue sorted, you might want to delete it, or keep it for reference — it's up to you.

_For brevity, let's move on to the next issue we spotted: missing access control._

## Identifying the Next Issue: Missing Access Control

The 'Set Password' function can be accessed by anyone, whereas it should only be callable by the owner.

### Adding a New Finding

We'll follow the previous finding's format. Here we'll begin with identifying the root cause: the 'Set Password' function in the 'Password Store' has no access controls. The impact? A non-owner could change the password.

### Crafting the Description

Here's the description I penned:

```
The 'Password Store' 'Set Password' function is an external function. However, the 'nat_spec' of the function and the purpose of the smart contract is that only the owner should set a new password.
```

Adding the flawed code segment can be helpful, as it equips readers with a clear visualization of the issue. To do this:

1. Use three backticks to start a code block.
2. Then write the language that you're using for syntax highlighting — in this case, JavaScript.

The comments explicitly mention the problematic section, making it easier for others to spot the issue. This step enhances the markdown view and provides better readability.

### Highlighting the Impact

Finally, the impact explanation underscores the problem's gravity, emphasizing that the flaw allows anyone to set or change the contract's password, grossly violating intended functionality.

Stay tuned for the next installment, where we probe further into smart contract vulnerabilities. Happy auditing!
