---
title: Aragon
---

_Follow along with this video._

<iframe width="560" height="315" src="https://www.youtube.com/embed/pu2m54_Q7Xs?si=oujHos8spVJhH5Lt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

# Building a DAO from Scratch: No Code Required, with Aragon

Today, we're venturing into the exciting world of Decentralized Autonomous Organizations (DAOs), and we'll be doing it in a surprisingly code-light way. We're delighted to have Juliet Cevalier from the Aragon team as our expert guide. She's here to introduce Aragon's no-code node solution for the relatively simple creation of powerful, customizable DAOs.

<img src="/daos/2-aragon/aragon1.png" alt="Dao Image" style="width: 100%; height: auto;">

## Meet Our Aragon Expert

Before we dive in, let's welcome Juliet Cevalier. As the developer advocate for Aragon, she'll give us insights on how to build a DAO without using a single line of code.

<img src="/daos/2-aragon/aragon2.png" alt="Dao Image" style="width: 100%; height: auto;">

## Introduction to the Aragon DAO Framework

To undertake this task, Juliet is using the [Aragon DAO framework](https://aragon.org/). To understand how Aragon's architecture is set up, let’s first consider the base structure of DAOs.

DAOs primarily consist of a smart contract responsible for containing all of the organization's managed assets, acting effectively as the treasury. Still, the beauty and power of DAOs come from their highly extendable functionality, made possible through plugins.

Ready to proceed with the DAO-building journey? Let's follow Juliet's step-by-step guide.

## Step 1: Creating a DAO on Aragon

Firstly, log on to [app.aragon.org](https://app.aragon.org/). Once there, click on 'Create a DAO'. You’ll then see an outline of the process we'll be following, starting with choosing the blockchain where our DAO will be deployed.

<img src="/daos/2-aragon/aragon3.png" alt="Dao Image" style="width: 100%; height: auto;">

## Step 2: Describing Your DAO

Next is the DAO’s descriptive details including name, logo, and brief description. For the sake of this tutorial, we'll name ours “Developer DAO”.

<img src="/daos/2-aragon/aragon4.png" alt="Dao Image" style="width: 100%; height: auto;">

## Step 3: Defining DAO Membership

Defining membership is a crucial next step as it’s what determines who can participate in the governance of these assets. Currently, Aragon supports token holders and multisig members as types of governance members.

The token holders method allows holders of specific tokens to vote in the organization. The multisig members, on the other hand, establishes a specific quorum that needs to be met for a proposal to go through.

_These governance mechanisms, with their own unique decision-making and asset management abilities, are facilitated by back-end plugins. These are powerful extensions that can also perform tasks like fund movement, treasury management, and enabling different coordination styles._

## Step 4: Create a DAO Token

The creation of a unique DAO token comes next. Let's call ours 'DVP'. We can assign 1000 tokens to ourselves and specify a minimum amount of tokens that a member needs for proposal creation.

_In this instance, we'll suggest a minimum of ten tokens to prevent proposal spam._

## Step 5: Set Up Governance Settings

Once the token creation is complete, we proceed to set up governance settings which includes specifying the minimum support threshold required for a valid proposal, the minimum participation needed, and the minimum time that a proposal should be open for voting.

We'll also decide whether to enable early execution, which means that we wait for the entire time of the proposal's duration, and whether to allow change of vote after submission.

## Step 6: Review and Finalize

Lastly, we'll review the parameters that we've set. It's crucial to note that the blockchain selection is the only non-editable item since it forms the basis for the DAO’s deployment. Everything else can later be changed via a proposal vote.

_This flexibility gives us the power to adapt and evolve our DAO with changing circumstances and needs._

## Step 7: DAO Deployment

With the parameters set, we'll deploy our DAO by signing the proposal. What happens next is the creation of a DAO instance with the defined plugins and settings.

<img src="/daos/2-aragon/aragon5.png" alt="Dao Image" style="width: 100%; height: auto;">

Once the deployment is complete, we can easily monitor, manage, and make decisions within the DAO through the dashboard.

## Final Thoughts

While Aragon provides you with a basic template to get started, remember, your DAO’s evolution and customization possibilities are endless. You can expect more iterations, plugin options, and decision-making strategies to take your DAO to the next level.

Thank you for joining us today. We look forward to seeing the powerful, value-driven DAOs you create.
