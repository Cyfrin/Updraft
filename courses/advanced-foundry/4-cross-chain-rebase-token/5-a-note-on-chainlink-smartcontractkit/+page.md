## Critical Update: Migration to the `chainlink-ccip` Repository

Before we dive into the upcoming section on Chainlink’s Cross-Chain Interoperability Protocol (CCIP), there is a critical update regarding the project structure that you need to be aware of.

Since the creation of this course content, the official GitHub repository used for Chainlink CCIP development has migrated. The original repository featured in the video lectures has been **archived** by the maintainers and is now read-only. To ensure your code works correctly and adheres to current standards, you must use the new, active repository.

### The Repository Change

You will notice that the videos may reference the old repository. Please note the following change:

*   **Archived (Do Not Use):** `smartcontractkit/ccip`
*   **Active (Use This):** `smartcontractkit/chainlink-ccip`

You should direct all your cloning, referencing, and documentation searches to the new **`chainlink-ccip`** repository.

### Technical Impact on Your Workflow

While the core concepts and logic of CCIP remain largely consistent, this migration introduces syntax and configuration changes that will affect your development workflow. As you proceed through the lessons, be prepared to adjust the following:

1.  **Installation Commands:**
    Because the package location and name have changed, the command line instructions (using NPM, Yarn, or Foundry) used to install dependencies in the video will differ from what is currently required.
2.  **Import Paths:**
    When writing your Smart Contracts or deployment scripts, the directory structure within the `node_modules` or library folders will be different. You will need to update your import statements to reflect the new file paths in the `chainlink-ccip` repository.
3.  **API Adjustments:**
    There have been minor updates to the API. Expect slight differences in function calls or how you interact with the router and protocol compared to the video demonstrations.

### How to Navigate the Course

To help you manage these changes, we have added **text-based notes and comments** accompanying the videos in this section.

**Do not rely solely on the code explicitly typed in the video.** Instead, please verify the text resources provided with each lesson. These notes will highlight the specific tweaks required—such as the correct install commands and updated import paths—to ensure you can successfully build and deploy your project using the modern codebase.