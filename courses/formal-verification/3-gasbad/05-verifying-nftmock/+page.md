---
title: Verifying NftMock
---

_Follow along with this video:_

---

### Verifying NftMock

Before anything else, let's prepare our workspace. We'll begin with creating a new file named `_certora_`. Remember to export our Certora key – we'll need it, and we don't want any hiccups later on with missing credentials.

```bash
export CERTORA_KEY=your_actual_certora_key_here
```

Next up, create 2 folders within our `certora` directory named `conf` for out configuration files and `spec` for our specifications, or specs.

### NftMock Configuration File

Alright, let's begin with our `NftMock` config. Create an `NftMock.conf` file within our conf folder.

```js

{
    "files": [
        "./test/mocks/NftMock.sol"
    ],
    "verify": "NftMock:./certora/spec/NftMock.spec",
    "wait_for_results": "all",
    "msg": "Verification of NftMock"
}

```

With this in place, let's perform some quick sanity checks to make sure things are working. We'll need to set up our `NftMock.spec` like so:

```js

/*
* Verification of NftMock
*/

rule sanity {
    satisfy true;
}
```

Then we can run:

```bash
certoraRun ./certora/conf/NftMock.conf
```

> ❗ **NOTE**
> You don't need to run the Certora prover as often as I do, sometimes these runs can take a long time, so if you want to follow along that's fine. I do recommend you run it a few times to get a feel for it and build your familiarity however.

Running the above on our current spec is going to of course pass. The proof is a tautology and our spec isn't testing anything meaningful.

![verifying-nftmock1](/formal-verification-3/5-verifying-nftmock/verifying-nftmock1.png)

`Certora` refers to situations like this as `vacuous` and we can actually add a check into our `conf` file to validate this sort of thing.

```js
{
    "files": [
    "./test/mocks/NftMock.sol"
    ],
    "verify": "NftMock:./certora/spec/NftMock.spec",
    "wait_for_results": "all",
    "msg": "Verification of NftMock",
    "rule_sanity": "basic"
}
```

By adding this flag and running the prover again...

![verifying-nftmock2](/formal-verification-3/5-verifying-nftmock/verifying-nftmock2.png)

We should see an output like this in our terminal indicating that our spec is violating `vacuity`.

We can set the `rule_sanity` property to `none` to avoid this warning for the time being.

```js
"rule_sanity": "none"
```

### Wrap Up

Ok, things seem more or less set up, and we've testing that our configs and specs are working, we've tested that we can send jobs to Certora - great.

In the next lesson let's actually set up a rule to test that our totalSupply is never negative.

See you there!
