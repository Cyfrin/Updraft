---
title: Your First Full Report - Making a PDF
---

_Follow along with this video:_



---

# Creating Your First Professional Markdown Report

Hello and welcome back! In today's lesson, we're going to cover how to convert a list of findings into a professional-looking PDF using **Markdown**. This is particularly useful for independent security researchers, new firms, and anyone who wants to get familiar with writing reports and creating their own markdown reports.

Our goal is to transform raw data into valuable information by creating a detailed and comprehensive report. Plus, this gives you something impressive to add to your portfolio!

![](https://cdn.videotap.com/q1CDqX5IudNynKGhU2Z3-28.29.png)

## The Basics

We're going to start off on Github, specifically our tailor-made repository for creating markdown reports. Make sure to read through the documentation provided in the repo to get a good understanding of the process.

To get started working with this repo, install **Pandoc** and **Latex** on your machine.

> _Note:_ As mentioned in the course, installation will not be covered here. At this point in your journey, you should be comfortable with this process.

Another utility you'll need to install is the **[Latex project](https://www.latex-project.org/)**. Once the installations are successful, you should be able to run `Pandoc help` in terminal and receive an output like this:

```
Pandoc 2.2.3
Compiled with pandoc-types 1.17.5.1, texmath 0.11.1.2, skylighting 0.7.5...
```

This is another point at which **Windows Subsystem for Linux** can prove invaluable for Windows users.

## Including a Latex Template

The next step involves installing a latex template. For our purposes, we're using a package that leverages Pandoc to generate PDFs. This package comes with templates built with Latex syntax which we'll explore further.

You can find the template within the Github repo. Note that the syntax will look a bit strange - a mishmash of HTML and markdown.

For customizing your PDFs in future, consider using different templates or creating your own. Collaborating with colleagues proficient in Latex, like **Chat GPT**, can also yield fantastic results!

## Adding Your Own Logo

Once your template is added, it's time to make the report more personalized. Add your PDF logo to the directory - when using VS Code, you can simply drag and drop the file. If you're having trouble viewing the PDF, try installing the **Vs code PDF** extension.

## Markdown File for Findings

To detail our findings, we'll need a markdown file: `report_example.md`. On accessing the raw file, you may find the output a little crazy-looking since the markdown file is loaded with Pandoc-friendly text.

Copy this file into a new markdown file named `report.md`. This will become your official report.

Inside the report, there are several things you'll need to customize:

- **Title:** Name it something that describes your work precisely such as "Network Vulnerability Assessment".
- **Author:** Replace "_name here_" with your own name.
- **Date:** Update the audit date.
- **Other Personal Details:** Replace every instance of `your name here` from Cypher or whatever you're working with. Put in your social links for connecting with people when necessary.
- **Subtitle and logo:** Modify these fields as per your needs.

Now, let's move to the sections under `===` which you can customize according to your audit:

- **Prepared by:** Write your name.
- **Auditors:** List all the auditors involved in the assessment.
- **Protocol summary:** Describe the protocol and its workings.
- **Disclaimer:** Let your clients know that this report is not a guarantee of a bug-free code.
- **Risk classifications:** Explain the criteria for classifying severities into High, Medium and low.
- **Audit details:** Include the commit hash that your findings correspond to.
- **Audit roles:** Input the roles.
- **Executive summary:** Give a brief overview of the assessment process.
- **Severity and number of issues found:** This is a visual representation of the findings in the format of a table.
- **Findings:** Give detailed explanations of the issues found.

**Markdown All in One** extension is very useful for creating automatic Table of Contents in markdown files. It provides the update command at every save post which is really an add-on. If you want to go to any section directly, just click on it from Table of Contents section.

Our report is now ready to be transformed into a marvelous, professional looking PDF!

## Generating the PDF

We're going to use the Pandoc command provided in our Github repository's `audit report` section to convert our markdown file into a PDF.

_Note: Replace the default file name `report_example.md` with ours - `report.md`._

Once the command runs successfully, we are left with an exquisitely formatted, professional quality PDF report ready for delivery to the client. We've successfully taken raw audit data, and turned it into a report that we can be proud of.

Congratulations on creating your first professional PDF! Stay tuned for our next session, where we'll step up the game even further.

![](https://cdn.videotap.com/xt6wnkzEX5SLQlpEFKGA-660.14.png)

Don't forget to review what we've done today, and as always, happy coding!
