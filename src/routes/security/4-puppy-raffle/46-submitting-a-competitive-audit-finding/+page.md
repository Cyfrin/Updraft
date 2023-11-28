---
title: Submitting a Competitive Audit Finding
---

_Follow along with this video:_

## <iframe width="560" height="315" src="VIDEO_LINK" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# How to Submit Findings in a Competitive Audit on Codex

We've come a long way in this guide, and now it's time to learn how to submit your findings in a Codex competitive audit. As you follow along with me in learning the ropes, remember that your write-ups need to demonstrate your skills and abilities as a security researcher. The better quality they are, the more chances you stand to earn additional rewards.

## Start Your Finding Submission

Let's start by submitting a finding. Turn your attention to the provided page with the message, "You have no findings for this contest."

![](https://cdn.videotap.com/tBS5umL1xzaBq36apSkD-26.91.png)You'll see a very familiar setup. Navigate to the Findings page and extract your title, which you'll paste into the "Title" field. At this stage, there's no need to add prefixes or suffixes to your title; keep it plain and simple.

## Root Cause, Impact, and Severity

Next, deal with the root cause and the impact of the severity of the issue. Take for instance, if the severity is about looping through a player's array to verify duplicates, it could result in a potential denial of service attack. Per our guidance before beginning the audit, if you labeled this as a medium, make sure to maintain that consistency in this report.

## Insert GitHub Links

You'll also need to provide GitHub links that are precisely related to the code base where your finding is located. For example, if the finding is within the "for loop," direct the judges to the exact repo. Let me explain how to do this:

Return to the “first flights” section and view the repo. Navigate to "SRC puppy raffle" and find the duplicate loop. By clicking on this line, you can hit "Copy permalink," and then paste this in the respective 'GitHub' field in your Codex contest review. That specific link stands as the relevant link in the code base for the contest.

```markdown
[Link to the for loop in the repo](https://github.com/yourusername/your-repository/blob/yourfile.js)
```

## Submit Findings in a Compelling Fashion

We're now at the stage where we finalize and submit the findings. The Codex contest review is divided into several sections, including: summary, details, impacts, tools used, and recommendations. In order to ensure a robust submission, consider copying and pasting your write-up into the respective sections. If you have conducted a diff (difference) at the end of the audit, this information can also be included.

```markdown
- **Summary**:- **Details**:- **Impacts**:- **Tools used**:- **Recommendations**:
```

Before hitting "Submit finding," you can hit preview to see how your submission will be displayed. Ensure it's appropriately aligned, grammar checked, and conveys your findings clearly, before submitting.

After pressing "Submit finding," you will be redirected to your report. Here, you can view and modify your submission as needed. When the competition ends, your report will be sent directly to a panel of judges for evaluation.

## Rewards for Quality Write-ups

If you display excellent knowledge and skills in your write-ups, you might stand the chance of earning an additional bonus as part of Codex's "selected report."

```markdown
> Remember: The quality of your submission is paramount. An outstanding write-up could earn you a bonus prize payout. So, go ahead and show us how fantastic your write-ups can be!
```

Visit past contests and selected findings to glean knowledge on how to make your submissions standout.

## Building Your Portfolio

All your findings can be added to your portfolio, a perfect way to showcase your abilities as a security researcher. You can easily access your findings by visiting 'My Findings' in your profile. Take pride in your work and keep building that portfolio!

## Wrap Up

At the end of the competition, the judges will review all submissions and findings, ranking them based on merit. In some instances, platforms might engage the community in the judging process. Keep an eye out for numerous opportunities coming up on Codex, as this platform supercharges your journey into becoming the best smart contract security researcher.

If you've reached the end of this post, thank you for reading! I can't wait to see the amazing security researcher you'll become with Codex. Don't forget to sign up and embark on this exciting journey.
