---
title: Reporting - Templates
---

_Follow along with this video:_

---

### Reporting Templates

Throughout this course we have been, and will continue to use our [**audit-report-templating**](https://github.com/Cyfrin/audit-report-templating) repo to assist us with generating our final findings reports. I wanted to take a moment to make you aware of some alternatives, should you wish to try them out.

### Cyfrin GitHub Report Template

[**audit-repo-cloner**](https://github.com/Cyfrin/audit-repo-cloner)

On the Cyfrin team, we won't write up reports in markdown, we actually report our findings through issues directly on the GitHub repo, this is beneficial for collaborative situations. We use this repo cloner to prepare a repo for an audit by the Cyfrin team. From the README:

```
It will take the following steps:

1. Take the source repository you want to set up for audit
2. Take the target repository name you want to use for the private --repo
3. Add an issue_template to the repo, so issues can be formatted as audit findings, like:

'''
**Description:**
**Impact:**
**Proof of Concept:**
**Recommended Mitigation:**
**[Project]:**
**Cyfrin:**
'''

4. Update labels to label issues based on severity and status
5. Create an audit tag at the given commit hash (full SHA)
6. Create branches for each of the auditors participating
7. Create a branch for the final report
8. Add the report-generator-template to the repo to make it easier to compile the report, and add a button in GitHub actions to re-generate the report on-demand
9. Attempt to set up a GitHub project board
```

### Report Generator Template

[**report-generator-template**](https://github.com/Cyfrin/report-generator-template)

This is a fork of the [**Spearbit Report Generator**](https://github.com/spearbit-audits/report-generator-template) and is used to consolidate issues/projects on a GitHub repo into a PDF Audit report.

From the README:

```
This repository is meant to be a single-step solution to:

- Fetch all issues from a given repository
- Sort them by severity according to their labels
- Generate a single Markdown file with all issues sorted by descending severity
- Integrate that Markdown file into a LaTeX template
- Generate a PDF report with all the issues and other relevant information

```

These tools/templates are especially great when working with a team. They save you from having to manually consolidate markdown write ups. If this is a method you'd like to try in your own auditing process, I encourage you to experiment and determine what works best for you!

For the purposes of this course, we'll continue with the methods we've been using thus far.

Now, we won't _always_ be writing the reports together, but it's imperative that you put in the time to practice. The ability to create high quality reports is necessary for becoming a successful security researcher. Practice, get good at it. Get comfortable with `Proofs of Concept/Code`.

Let's finally get to writing this one together though!
