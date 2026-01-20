---
title: Your First Full Report - Making a PDF
---

_Follow along with this video:_

---

### First Professional Markdown Report

This lesson covers how to convert a list of findings into a professional-looking PDF using **Markdown**.

Our goal is to transform raw data into valuable information by creating a detailed and comprehensive report. Plus, this gives you something impressive to add to your portfolio!

## The Basics

There are some tools and resources you'll need to prepare yourself with before getting started.

[**GitHub Repo**](https://github.com/Cyfrin/audit-report-templating) - We've created a repo dedicated to assisting security reviewers with generating these reports.

[**Pandoc**](https://pandoc.org/installing.html) - a universal document converter that we'll be leveraging to generate our PDFs

[**LaTeX**](https://www.latex-project.org/get/) - a document preparation system for typesetting used in technical and scientific documentation primarily.

[**Markdown All in One**](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) - Amazing VS Code extension to get the most our of markdown formatting.

[**VSCode PDF**](https://marketplace.visualstudio.com/items?itemName=tomoki1207.pdf) - will allow us to preview PDF files within VSCode

### Adding LaTex to Pandoc

Once `Pandoc` has been installed, it should create a folder in your root directory named `.Pandoc`, within is a `templates` folder. We want to navigate there.

In our provided GitHub Repo, you'll find a specific template file named [`eisvogel.latex`](https://github.com/Cyfrin/audit-report-templating/blob/main/eisvogel.latex). You want to copy this file into your `templates` folder.

> This `eisvogel.latex` template is what's going to tell `Pandoc` how to format our PDF for us! Challenge yourself to customize this template in future!

### Setting Up

Once `Pandox` and `LaTex` have been installed, create a file named `report.md` in your audit-data folder.

Within the aforementioned GitHub Repo, you'll find `report-example.md`. Copy this into your newly created file. This will be our template for building our final report.

### Adding Your Own Logo

Lastly, let's add a bit of flare. Find an awesome logo (pdf format) and add it to the audit-data folder as well. Name this file `logo.pdf`.

### Filling out report.md

Inside our `report.md` template, we're going to want to personalize a number of things.

- **Title:** Name it something that describes your work precisely such as "Network Vulnerability Assessment".
- **Author:** You!
- **Date:** Update the audit date.

Now, let's move to the sections under `===` which you can customize according to your audit:

- **Prepared by:** You!
- **Auditors:** You again! If you're working as part of a team, you can list contributors here.
- **Protocol summary:** Describe the protocol and its workings.
- **Disclaimer:** Enter your name in the space provided, this is to assure the protocol knows that the report is not a guarantee of bug-free code.
- **Risk classifications:** Explain the criteria for classifying severities into High, Medium and low.
- **Audit details:** Include the commit hash that your findings correspond to.
- **Scope:** Include reference to the exact contracts the review has covered.
  - _Note:_ the `└── `, found in the README scope will error when we generate the PDF. Replace this with `#--`.
- **Audit roles:** The roles of the protocol, these were some of the earliest notes we took!
- **Executive summary:** Give a brief overview of the assessment process.
- **Severity and number of issues found:** Summarize the number and severity of issues detailed in the report.
- **Findings:** This is our breakdown of specific findings uncovered over the course of the audit. Paste the write-ups we've done into the respective severity categories and delete the ones we don't need!

Our report is now ready to be transformed into a professional looking PDF!

### Generating the PDF

Alright, moment of truth. In your terminal, navigate to your `audit-data` folder. Assuming everything has gone well upto now we should just have to run the command:

```bash
pandoc report.md -o report.pdf --from markdown --template=eisvogel --listings
```

And with a bit of magic, you should see a `report.pdf` file appear in your `audit-data` folder.

### Wrap Up

Wow! Our report looks amazing. It's so professional, any client we provide this to would be impressed. We absolutely should add this to our portfolio to showcase all we've learned. Let's go over that in the next lesson!

---

Ok, this wasn't easy and there are admittedly a tonned of potential pitfalls along the way. I've compiled a few possible errors/scenarios you may run into with some suggestions to troubleshoot them below.

<details>
<summary>Errors/Issues</summary>

1. **My home/root directory doesn't have a `.pandoc` file!**

   - Depending on your operating system, this file may exist elsewhere. If you're using WSL/Linux keep a few things in mind

     - The file may be hidden - files prepended with `.` are often hidden. You can reveal all files in a directory with the command `ls -a`
     - The file may be elsewhere - navigate back in directories (`cd ..`) until you reach one that looks like this

     ![making-a-pdf1](/security-section-3/28-making-a-pdf/making-a-pdf1.png)

     ...from here navigate to `usr/share/pandoc/data/templates`. In here you will find existing templates and this is where `eisvogel.latex` should be added.

2. **VS Code says I'm _unable to write a file to that directory_!**

   - This is related to your user permissions, we can force the file to be created with a sudo command. `sudo touch eisvogel.latex` - this command will create a file named `eisvogel.latex` in your current directory.
     - You may be prompted to enter your credentials or need to create an admin user.

3. **VS Code says I'm _unable to write to eisvogel.latex_!**

   - Similarly to above, this is permissions related. The easiest work around I found was through another `sudo` command.
     ```bash
     sudo tee eisvogel.latex << 'EOF'
     [copy LaTex here]
     EOF
     ```
   - The LaTex you need to copy is available [**here**](https://github.com/Cyfrin/audit-report-templating/blob/main/eisvogel.latex). Yes, you will be pasting 1068 lines into your terminal - this will overwrite your `eisvogel.latex` file, in your current directory, with that copied data.

4. **When I run `pandoc report.md -o ... etc` I get _File Not Found_**

   - This seems caused when our LaTex package is missing an important element. The easiest solution is to assure we have the full distribution of the package we're using. For WSL users `sudo apt install texlive-full` will resolve these errors.
     - Note: `texlive-full` is 5.6GB in size.

5. **When I run `pandoc report.md -o ... etc` I get _Missing number, treated as zero_**

   - Caused by an error in the LaTex syntax either in your markdown using it, or the template itself. Replace the block of LaTeX at the top of your `report.md` file with the following:

   ```
    \begin{titlepage}
    \centering
    {\Huge\bfseries Protocol Audit Report\par}
    \vspace{2cm}
    \begin{figure}[h]
    \centering
    \includegraphics[width=0.5\textwidth]{logo.pdf}
    \end{figure}
    \vspace{2cm}
    {\Large Version 1.0\par}
    \vspace{1cm}
    {\Large\itshape equious.eth\par}
    \vfill
    {\large \today\par}
    \end{titlepage}
   ```

   This should resolve the error.
