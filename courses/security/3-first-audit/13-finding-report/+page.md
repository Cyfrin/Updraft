---
title: Writing an amazing finding report
---

_Follow along with this video:_



---

## Moving Forward After Identifying Vulnerabilities

After the identification phase, we are tasked with communicating our findings to the protocol. This phase is crucial on several levels:

1. We need to convince the protocol that the identified vulnerabilities are issues.
2. The issues require necessary fixes to prevent a recurrence.
3. Our intention is not merely pointing out the problems but to make the protocol safer.
4. In a competitive audit, proving the issues to the judges is our primary focus.

By effectively communicating this information, we position ourselves as educators, helping the protocol understand **why** these vulnerabilities are issues, **why** they were overlooked, and **how** to fix them to avoid running into the same issues in the future.

## Writing Your First Finding

Now comes an incredibly exciting part - doing a minimalistic write up of the vulnerabilities you've found. If this is your first time writing a finding, then buckle up!

For this walkthrough, we'll be using our main GitHub repository, from where we scroll all the way up to the files and look for a file named 'findinglayout.md' This minimalist markdown layout will guide us on what our findings should ideally look like. Here, we can quickly view its raw format and, for convenience, copy it over to our codebase.

We could create a new folder named 'Audit Data' and a new file marked 'Finding Layout MD' and paste the copied markdown layout here. This way, we have a markdown version of what our findings should look like.

If you use Visual Studio Code, you can preview the markdown layout by pressing "command Shift V" on a Mac. Fear not if you're on Linux or Windows, just opening the command palette and choosing 'preview Markdown open preview,' you'll get the same result.

## Layout for Your Finding Writeup

You're free to customize the information in your finding writeup as per your style and the severity of the issues found. The aim is to convince the protocol that there's a problem, articulate the severity of the issue, and finally suggest how to fix it.

Having copied the markdown layout, we can create a new file called 'Findings MD' and paste the layout here as a starting point for our first finding.

## Making Your Case

Let's say our first finding is that the password variable is not as private as it may initially appear. Despite being marked 'private,' this does not mean that the data is inherently secure, as the keyword just denotes that other contracts can't read it. However, human beings can still read from a stored variable in the blockchain!

To illustrate the vulnerability, we provide the following example:

> "The S password variable is not actually private. This is not a safe place to secure your password."

It falls onto us to convince the protocol that the private keyword doesn't impart the level of security they might think, necessitating a change.

## Conclusion

Writing an audit report demands a deep understanding not only of the protocol's vulnerabilities but also the deft skill in communicating these findings effectively. As you develop your professional style, always remember the importance of your role as an educator. If executed correctly, your findings can drive crucial changes for a more secure protocol in the future.
