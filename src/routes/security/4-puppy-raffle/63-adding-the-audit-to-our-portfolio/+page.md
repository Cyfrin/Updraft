---
title: Adding The Audit To Our Portfolio
---

_Follow along with this video:_

## <iframe width="560" height="315" src="https://vimeo.com/889508128?share=copy" title="vimeo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Turning Your Audit Writeup to a PDF: A Guide

In our last session, we journeyed through the process of auditing, identifying issues and documenting them in a simple writeup. But now, we're not just done yet, we are going to elevate the sophistication of this documentation by making it a professional looking audit report. So, why don't we take that writeup, turn it into a PDF, and then pop it in our portfolio for the world to see? Let's dive in!

## Preparation Steps

Firstly, in case you want to add more detail or want to write up some of the issues I glossed over, navigate to the audit data branch, go into the audit data folder, and add in your missing pieces. You can test your writing skills there.

![](https://cdn.videotap.com/rGjBIrugIYzuJVsGkbGc-45.29.png)

Moving on, navigate to our audit data folder. Now, we are going to fetch and add some components to our report like the PDF logo. You can also use the Cyfrin logo (just copy paste it into your own files) or you can add whatever image you deem fit.

Your findings are to be added to a Markdown file like `report.md`. If unsure about structure, refer to an example Markdown file.

![](https://cdn.videotap.com/bsXkFfHK0gAQJNqbyNYr-79.26.png)

## Creating the Markdown File

Next, grab the whole thing and paste it into a new file named `reportformatted.md`. Modify the placeholder fields to fit your data (for example, change the date to November 1, 2023), the packages field, the auditors, etc.

For fields like the 'Protocol Summary' and 'Audit Details', feel free to copy information from the README file or from actual data in the original audit data branch.

For the 'Executive Summary' field, here's a chance to experience a bit of fun. Write something engaging yet professional such as, _I loved auditing this. Brilliant code base. It was fascinating to decipher Patrick's intentionally arcane code!_

## Compiling the Data

When done, it's time to fill in the 'Issues Found' field. Here's a little trick: Go back to your findings and count the different types of issues categorized based on severity - high, medium, low - and type - gas issues, info issues, etc.

![](https://cdn.videotap.com/XsF2knmP2jeZvg1FuKHO-158.52.png)

For instance, if you found three high, three medium, one low, seven info, and two gas issues, these amounts to a total of 16 findings. Interestingly, in an actual audit environment, this is greatly impressive.

## Formatting the Document

Continue by ensuring your issues are properly formatted in your Markdown file. Now, your document should look ready and well outlined, albeit sprinkled with some odd pandoc characters.

Finally, we're going into the README to add our findings. Make sure you have the `pandoc` and `Logopedia` packages installed. To compile your markdown document into a sleek PDF, run this command in your audit data folder:

```bash
pandoc report_formatted.md -o report.pdf --from markdown --template=eismogel --listings
```

![](https://cdn.videotap.com/0ZjWWIEWR93EgxbPKJGG-237.77.png)

Running this should generate a beautiful looking PDF with all the valuable findings from the audit effort.

## Showcasing Your Work

At this point, you can marvel at your work and offer yourself some well-deserved congratulations. What next? Time to showcase this piece. Navigate to your GitHub profile, grab the file, add that PDF and the Markdown file to your profile.

The beauty and professionalism of an audit report exhibit your skill and finesse to potential clients or employers. So, building a portfolio on GitHub, like large audit firms do, increases your visibility and proves that your expertise is no fluke.

> In the world of auditing, reports are regarded as trophies. They serve as a testament to your experience and expertise. So, always remember to display them proudly.

![](https://cdn.videotap.com/2Pk62x098E14kLH3rsap-328.35.png)

To wrap up, this guide has shown you how to take your simple writeup and turn it into an impressive audit report in the form of a well-structured PDF. Congratulations on this milestone! You've done phenomenal work and you're one step closer to becoming a seasoned auditor. Remember this is your portfolio, so call it as you wish and don't be shy to show off your accomplishments. After all, the world is waiting to see them!
