---
title: Slither Walkthrough
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://vimeo.com/889508991/756b18afe1?share=copy" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Slithering Through Code: The Power of Slither for Solidity Auditing

Whenever you're developing a contract using the Solidity programming language (or indeed, any contract), thorough auditing is critical. One of the handiest tools for completing this process is **Slither**.

Let's deep dive into the code and uncover the treasures this utility can offer us.

## Starting From The Extremes

![](https://cdn.videotap.com/NQHSIHFaGFwd07Cdj3aB-77.3.png)

To effectively dissect your code, it's beneficial to begin with the most extreme areas and then continue downwards. Going through an example, I started my process with a function named `withdrawFees` and investigated its command for sending ETH (Ethereum's primary cryptocurrency) to an arbitrary user.

```js
function withdrawFees...
```

This line has been isolated by Slither as a potential problem. Here, Slither highlights that the `feeAddress` is an arbitrary user and there's a risk of malicious behavior. In other circumstances, this might be a significant issue, but I know that in this context, it's an intentional element. The developer designed this function so that the `feeAddress` can be manually reset if required.

## Getting Up Close And Personal With The Documentation

While the above example illustrates one instance where Slither can help, to truly benefit from this tool, it's crucial to dive into the [documentation](https://github.com/crytic/slither/wiki) and deepen your understanding.

Here, you'll find extensive information about the severity ratings, confidence levels, and possible attack vectors associated with different vulnerabilities.

Remember, while the high confidence level indicates a bug has likely been detected, a medium confidence level means it could be a false positive. Always cross-check your findings to insist on precision.

> "The severity is high, the confidence is medium here. Confidence being medium means that the tool is medium sure."

## Slithering Around False Positives

One exciting feature of Slither is how you can customize its priorities. Specifically, if your audit reveals a facet of your code that Slither identifies as a potential issue, and you want to retain the feature, you can set Slither to ignore this issue during future audits.

To do this, simply follow the formatting in the Slither documentation.

```js
/* slither-disable-next-line arbitrary-send-eth */
```

By incorporating this command directly into your code, you can ensure that Slither glosses over this line in further audits. This is a handy way of preventing critical function lines from repeatedly making noise in the audit reports.

## And The Winner Is...

![](https://cdn.videotap.com/9tgDlvKbmj5arMTdT1ql-425.15.png)

Moving on to another common piece of Solidity code—the `selectWinner` function. In this scenario, Slither identified a weakness in the PRNG (Pseudorandom Number Generator) being used. This tool is regularly used in Solidity contracts to simulate a fair lottery, but it's critical you use a robust PRNG to avoid potential exploitation. If a developer can predict the randomly selected winner, they can manipulate the result, which relegates the fairness of the lottery to a mere illusion.

> "Slither picked out the weak randomness as well. "

Slither can detect this particular issue automatically, allowing your team to correct the PRNG weakness straightforwardly, saving valuable time that manual review processes would soak up.

## Praying On Libraries

Libraries in Solidity are double-edged swords. They offer a wealth of functions and features, but they can be riddled with vulnerabilities that can exponentially increase your attack surface. Slither spares your security team the headache by scanning these areas of your contract and flagging any potential flaws.

However, it's always prudent to verify that these libraries are doing exactly what they're supposed to and aren't presenting unnecessary risks.

## Unchecked Events: A Low-Flying Concern

One advantage of auditing with Slither is its penchant for identifying unchecked events within your code. This issue usually flies under the radar in manual reviews, but unchecked events can lead to manipulation in the emitted information. While some might classify these as minor vulnerabilities, unchecked events can actually be exploited in multiple ways and interfere with important Ethereum ecosystem elements.

For this reason, I've developed a rule of thumb whereby if an event can be manipulated, omitted, or is incorrect, I usually categorize them as low-level issues. This rating is subjective, of course, but I believe that bringing them to the view helps in correcting them early.

## Unearth Old Versions and Low-Level Calls

![](https://cdn.videotap.com/jqNTpIqXL1SPGiYnAfl6-657.05.png)

Slither isn't just a guardian against dangerous codes; it's also an adviser for better coding practices. The tool diligently points out outdated Solidity version usage, encouraging the adoption of up-to-date versions. Moreover, it raises an alarm on the usage of low-level calls, guiding the programmer towards safer coding habits.

This particularly aids in learning best practices from the community and serves as a yardstick measuring the overall code quality. Following such leads can be beneficial in the long run, not only for overall security but also for smoother audits.

## Final Wrap

The somewhat tedious task of parsing through the entire slither output just goes to further underscore its utility. The resources saved in manual reviews can be better directed towards more sophisticated issues that require deeper investigation. This course is a boon not only for developers looking to hone their skills but also for audits aiming for a thorough review, thereby creating a more secure and reliable smart contract ecosystem.

Slither is an auditor's companion, discovering vulnerabilities, suggesting fixes, and promptly sniffing out potential threats waiting to rear their heads in your codes. Are you ready to let the Slither work its magic on your codes?
