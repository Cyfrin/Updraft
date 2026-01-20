---
title: Formal Verification Setup
---

---

### Transition to Formal Verification

After discussing the limitations of fuzzing, we are now transitioning to formal verification techniques to enhance our codebase's reliability. In this section, we will explore two specific tools, Halmos and Certora, and examine the trade-offs associated with each.

### Exploring Verification Tools: Halmos and Certora

#### Halmos
Halmos offers a similar API to another tool named Kontrol, but it is notably faster. This speed advantage makes it a preferable choice in scenarios where time efficiency is critical. Due to its faster performance, we will focus on Halmos and not delve into Kontrol, as installing and executing Kontrol can be significantly more time-consuming.

#### Certora
Certora, along with Halmos, will be part of our hands-on demonstration. We will analyze its integration into our projects and its specific benefits in a formal verification context.

### Practical Steps: Setting Up Our Environment

To effectively learn and implement these verification tools, follow these steps:
1. Open the project directory containing the Certora folder, Halmos, and Kontrol.
2. Delete all existing files in these folders to prepare for a clean slate.
3. We will then recreate each formal verification suite from scratch, beginning with Halmos.

### Acknowledgments and Recommendations

A special acknowledgment to the team at Runtime Verification for their invaluable assistance in understanding the nuances of formal verification. For those interested in further expanding their knowledge or applying formal verification tools like Kontrol in your own projects, it is highly recommended to explore the resources provided by Runtime Verification post-course.

### Starting with Halmos

As we proceed, our first task will be to write the Halmos formal verification suite. This hands-on approach will not only reinforce learning but also provide practical experience in implementing formal verification within your projects.
