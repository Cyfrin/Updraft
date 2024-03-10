---
title: Writing Stateful Fuzz Test Suite
---



---

# Unearthing Invariant Bugs in T Swap: An In-Depth Look at Stateful Fuzzing

In the world of code development, testing isn't just a good practice – it's essential. This article provides a holistic perspective on a recent exploration into T Swap's codebase, observed practices, and the application of stateful fuzzing test suites.

## Understanding T Swap: The Prelude

Before we delve into our primary focus, let's backtrack and recap.

While sifting the codebase, it was evident that T Swap is well-grounded in underlying unit tests. However, the presence of specific entity, a certain critical invariant, led to a realization about the absence of something integral.

> "If the codebase has unit tests but no stateful fuzzing test, should we be concerned?"

Our answer to this turned out to be a resounding yes. It was a hint pointing towards the potential issues nestled within the T Swap system. Identifying these areas for improvement was not held within the realms of SRC – it was staring right at us.

## The Task at Hand: Writing an Invariant Test Suite

Stepping back to our main branch, we essentially locked eyes with an important discrepancy. Our codebase recognized its unit tests yet failed to host stateful fuzzing tests. And thus, the mission was clear. We were mandated to write the stateful fuzzing test suite and slightly so, expected to discover bugs in the process.

The task involved working directly with the T Swap's codebase, devising an automated stateful fuzzing invariant test suite. We believed that by accomplishing this, we would be able to unmask potential bugs within the system.

## The Rollout: A Zero Manual Review Approach

In a paradigm shift from conventional methods, we decided to go zero manual review - a method entirely run by an automated test suite. While this may seem daunting, the focus was to write an automated test suite that will identify the bugs without human interference.

However, to validate our automated test suite's competence, we decided to undertake a modest amount of manual review. This was a complimentary step to ensure the robustness of our newly coded test suite.

After exacting the plan, we were ready to run our test suite and examine the results.

## In Summary

Using hints from the T Swap's system peculiarities and their own testing protocols, we realized that there was an absence of an integral part of test coverage – stateful fuzzing tests. A thorough exploration of this deficiency led us to write an automated invariant test suite, supplemented by a hint of manual review.

The goal was to find bugs with minimum manual intervention, and guess what? We did find some. So, stay tuned for the next part of this journey as we dissect the bugs and understand how to rectify them!

Remember at all times, coding might be art, but testing is a science!
