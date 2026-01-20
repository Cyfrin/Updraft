---
title: Leveling up our conf file
---

---

### Minimalist Specifications and Advanced Parameters

In our minimalist spec, we introduce only the essential parameters. However, in the comprehensive spec (`FVCatches.conf`), additional parameters are usually included. Here, I will show you how to add some of these advanced parameters to enhance functionality.

#### Adding `wait for results`

One critical parameter to add is `--wait_for_results`, which we will set to `all`. This parameter ensures that the cloud job completes before proceeding, and it displays both the log and the results. Detailed descriptions of these parameters can be found in the documentation.

#### Implementing Rule Sanity Checking

Next, we'll introduce `--rule_sanity` set to `basic`. This feature is accessible from the Command Line Interface (CLI). By enabling sanity checking for rules, we can filter out ineffective or incorrect rules. For example, if you input a rule such as `rule high` followed by `assert true`, the system, like a hypothetical `certora approver`, would recognize this as a tautology — a rule that is always true — and discard it as invalid.


```js
rule hi(){
    assert(true);
}
```

#### Optimistic Loop Unrolling

We also add the `--optimistic_loop` parameter set to `true`. This setting is particularly useful for managing loops, such as for-loops or while-loops, in your code. It assists in unrolling loops under certain conditions, labeled as `loop unwind condition`. This can be especially beneficial when dealing with large loops that are unlikely to cause issues, effectively simplifying the loop handling by assuming that the unrolling will not lead to errors.

#### Additional Configuration and Specifications

For those following this tutorial through the provided GitHub repository, you will notice directories like the `harness` folder which contain additional configurations, such as another component (`FVCatches.conf`) and another specification (`FVCatchesInvariant.conf`). Initially, I planned to demonstrate why and how this specification doesn’t work. However, I decided it would be more productive to delay this discussion and instead focus on teaching these concepts correctly later on.

