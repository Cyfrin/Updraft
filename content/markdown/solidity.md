---
id: 5d004a66-1e36-4679-a54f-6fd426913ba3
blueprint: course
title: "Solidity fundamentals"
updated_at: 1702912458686
github_url: "https://github.com/Cyfrin/path-solidity-developer-2023"
preview_image: https://res.cloudinary.com/droqoz7lg/image/upload/v1701193477/updraft/courses/qkrcodmbwwphpplbon0r.png
duration: 5
description: |-
        If you’re new to writing smart contracts, start here! Get started developing smart contracts with Solidity, learn the best practices followed by the top-industry experts and kickstart your web3 career.
overview: |-
        Introduction to smart contracts development and deployment, Introduction to blockchain oracles, Introduction to smart contracts testing 
preRequisites: |-
    Blockchain basics
authors:
  - content/authors/patrick-collins.json
  - content/authors/austin-griffith.json
sections:
  -
    title: "Simple Storage"
    slug: simple-storage
    lessons:
      -
        type: new_lesson
        enabled: true
        id: eb95ab4e-315d-4c2c-ada7-de40ad9ea462
        title: "Introduction"
        slug: introduction
        duration: 3
        video_url: "pUV2AeUKnl1lDC7JLX00EhV3AsxCQiq2QEuVcGga9O5o"
        raw_markdown_url: "/routes/solidity/1-simple-storage/1-introduction/+page.md"
        description: |-
                    This lesson provides an introduction to the course, guiding students through accessing and navigating the GitHub repository, understanding the usage of the repository for cloning lesson codes, and engaging in discussions. It also covers the importance of asking questions and setting up for coding, including accessing educational resources and preparing for building and deploying a smart contract.
        markdown_content: |-
          ---
          title: Repository Access and Navigation
          ---
          
          *If you'd like, you can follow along with the course here.*
          
          
          
          
          ## Introduction
          
          To get started, navigate to our [GitHub repository](https://github.com/Cyfrin/foundry-full-course-f23) 
          
          <img src="/solidity/remix/lesson-2/section-1/1.png" style="width: 100%; height: auto;">
          
          
          The interface might look slightly different when you first access it, but no need to worry. What you're looking for is the repository associated specifically with this lesson. This repository will contain all the code required for this stage of the course, together with a `README` section. The `README` will provide you with a wealth of notes on how to work with the code.
          
          ## Usage of the repository
          
          The repository serves two main purposes:
          
          - **Access and Clone:** It provides easy access to all lesson codes, allowing you to clone them effortlessly.
          
          - **Discussion Section:** Engage with fellow students, ask questions, and participate in collaborative learning.
          
          Make the most of this repository by accessing and cloning lesson codes quickly, while also taking part in interactive discussions with your peers. Happy learning!
          
          ## Asking Questions
          
          Throughout your journey, you'll likely have queries that you'd need answers to. We recommend using the Questions section provided. We'll guide you on how to ask questions such that they have the highest chance of receiving an answer from the community, an AI, or a forum.
          
          <img src="/solidity/remix/lesson-2/section-1/lesson-2-section-1-quoute.png" style="width: 100%; height: auto;">
          
          
          
          ## Setting Up
          
          Before we dive into coding, it is essential that you have access to the code repository and educational resources provided.
          
          1. Access the GitHub repository associated with this course. The repository contains all the code we will be working with, as well as a README file which includes important notes on working with the code.
          2. If you face any issues or want to participate in discussions, use the discussions tab on GitHub instead of creating issues.
          
          Also, I recommend creating accounts on the following platforms if you haven't already:
          - [GitHub](https://github.com/)
          - [Stack Exchange Ethereum](https://ethereum.stackexchange.com/)
          - [Chat GPT](https://openai.com/blog/chatgpt) (but remember it might not always provide accurate information).
          
          ## Let's Start Coding!
          
          Now, comes the exciting part — we're actually going to be building and deploying your first smart contract!
          
          
          We're going to be utilizing a tool called an IDE — specifically, Remix, for deploying and interacting with this smart contract. The best way to get the most out of this guide is to code along with me. You're encouraged to change the speed on the tutorial video to match your coding pace. Remember, repetition is critical to building a new skill and we want to make sure that you come out on the other side armed with it!
          
          ## The Deployment Tool: Remix
          
          <img src="/solidity/remix/remix-screenshot.png" style="width: 100%; height: auto;">
          
          
          To plunge into coding, we're going to be using [Remix](https://remix.ethereum.org/). You can either Google search it or access it directly from the link provided.
          
          So, let's jump right in and start deploying your first smart contract! By the end of this lesson, you'll have deployed your first smart contract and written your first bit of Solidity code. We can't wait to get through this exciting journey with you!
          
          
          
          
          
      -
        type: new_lesson
        enabled: true
        id: 47b4427f-fb3e-4d7a-bb25-e26129720573
        title: "Setting up your first contract"
        slug: create-solidity-smart-contract
        duration: 11
        video_url: "kA2wBENMmT6kXSDhSEOyj39XHI006iP6FNV4kX7Ww52A"
        raw_markdown_url: "/routes/solidity/1-simple-storage/2-setting-up-your-first-contract/+page.md"
        description: |-
                    A beginner's guide to creating a Solidity smart contract using Remix IDE. The lesson covers the basics of setting up a Solidity development environment, including creating a new file, writing the contract, understanding SPDX License Identifier, and compiling the contract.
        markdown_content: |-
          ---
          title: Setting Up Your First Contract
          ---
          
          *If you'd like, you can follow along with the course here.*
          
          
          
          
          # Introduction
          
          To get started, we want to open up <a href="https://remix.ethereum.org/" target="_blank" style="color: blue; text-decoration: underline;">remix</a>. When you open it up, you'll be greeted with a site that looks like this.
          
          <img src="/solidity/remix/remix-screenshot.png" style="width: 100%; height: auto;">
          
          You may select "Accept" or just ignore. 
          
          
          ## Using Remix IDE
          
          Remix IDE is a powerful tool used for developing smart contracts in Solidity. In this section, we will be creating our smart contract and deploying it on a blockchain.
          
          1. Open Remix IDE by either searching on Google or visiting the link provided in the GitHub repository.
          2. If it's your first time using Remix, it will provide you a tutorial walkthrough of its features. You can choose to go through it.
          3. Clean the environment by right-clicking and deleting the existing folders (optional).
          4. Create a new file by clicking on the "create new file" button and give it a name, e.g., SimpleStorage.sol. The `.sol` extension indicates it is a Solidity file.
          
          <!--TODO: Add Support for Solidity on svelte-->
          
          ```js
          // Your first line in SimpleStorage.sol
          pragma solidity ^0.8.19;
          ```
          
          This line specifies the version of Solidity you are using. The caret (^) symbol specifies that the code is compatible with the mentioned version and any new version till (but not including) 0.9.0.
          
          ## SPDX License Identifier
          
          It's a good practice to start your smart contract with an SPDX License Identifier. Though it's not mandatory, it helps in making licensing and sharing code easier from a legal perspective.
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          ```
          
          MIT is known as one of the most permissive licenses which means anybody can use this code and pretty much do whatever they want with it.
          
          ## Writing the Smart Contract
          
          Start by writing your contract using the keyword `contract`. Give it a name, e.g., SimpleStorage. Everything inside the curly brackets will be considered part of this contract.
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          
          contract SimpleStorage {
          
          }
          ```
          
          ## Compiling the Contract
          
          1. In Remix IDE, select the Solidity Compiler.
          2. Choose the version of the compiler that matches the version specified in your Solidity file.
          3. Hit the `Compile` button.
          
          Compiling your code means taking human-readable code and transforming it into computer-readable code or bytecode.
          
          If you see a green checkmark, it means your compilation was successful. If there is any error, Remix will point out where the error is, and you can debug it accordingly.
          
          ## Congratulations
          
          Technically, you just drafted your first Smart Contract. It's a straightforward operation and the script doesn't do anything yet. However, we're well on our way.
          
          
      -
        type: new_lesson
        enabled: true
        id: 390707ce-edd1-40df-9b81-8eb7c47ebb96
        title: "Basic variable types"
        slug: solidity-basic-types
        duration: 9
        video_url: "qxt4xCD01jvWLIxO01qREuS9LIG00igdJL8wIz5d02mzWTI"
        raw_markdown_url: "/routes/solidity/1-simple-storage/3-basic-types/+page.md"
        description: |-
                    This lesson introduces basic variable types in Solidity, such as Boolean, Uint, Integer, Address, and Bytes. It explains how to define variables in a Solidity contract and their default values, providing a foundational understanding of data types in smart contract programming.
        markdown_content: |-
          ---
          title: Basic Solidity Types
          ---
          
          *If you'd like, you can follow along with the course here.*
          
          
          
          ## Learning about Solidity Types
          
          Solidity supports many different types, from primitive types like integers to complex ones like user-defined types. You can read more about them in the [Solidity documentation](https://docs.soliditylang.org/en/v0.8.20/types.html#types).
          
          For now, let's focus on some of the basic types:
          
          - **Boolean:** Represents true or false value.
          - **Uint:** Uncapped positive whole number (An unsigned integer).
          - **Integer:** It could be positive or negative. (Whole numbers only, no fractions or decimals).
          - **Address:** A unique identifier similar to our everyday address.
          - **Bytes:** A set of bytes (a lower-level type that could be a string in hexadecimal representation).
          
          
          <img src="/solidity/remix/lesson-2/solidity-types/types.png" style="width: 100%; height: auto;">
          
          
          ## Variables definitions in Solidity
          
          Now, let's understand variables. They are just placeholders for values, and these values can have one of the types from the list above (or even other types). For instance, we could create a Boolean variable named `hasFavoriteNumber`, which would represent whether someone has a favorite number or not (`True` or `False`).
          
          ```bash
          bool hasFavoriteNumber = true;
          ```
          
          In the above statement, the variable `hasFavoriteNumber` now represents `True`.
          
          String and bytes have a special connection. In fact, strings are just bytes with special treatment for text. So, a string text can easily be converted to bytes.
          
          ## The Magic that is 'Bytes'
          
          Bytes could be observed in many shapes and forms, like an assortment of characters or words written in hexadecimal representation. Like integers, bytes too can be allocated size (but only up to `32`). For example:
          
          ```bash
          bytes4 myBytes = "test";
          ```
          
          In the above statement, `myBytes` is a bytes variable, of size 4, holding the value "test".
          
          ## Solidity Contract: Storing Favorite Numbers!
          
          Let's mark up a simple contract where we aim to store the favorite numbers of different people. We would only need the variable `favoriteNumber` of type Uint for this task.
          
          ```bash
          uint256 favoriteNumber;
          ```
          
          Now every variable in Solidity comes with a default value which may or may not be initialized. Like Uint256, it's default to Zero (0) and an uninitialized boolean defaults to `False`.
          
          ```bash
          uint256 favoriteNumber = 0;
          ```
          
          Above statement suggests that favoriteNumber has been set to the default value of 0.
          
          ## Wrapping Up
          
          You've just created one smart contract and explored fundamental types and variables in Solidity in the process. Remember to write comments in your code. They’re like your map when re-visiting your code or explaining it to others.
          
          So, keep experimenting, keep learning and let's continue with the next lesson.
      -
        type: new_lesson
        enabled: true
        id: f89fb538-7afa-486c-8a95-c402d755621c
        title: "Functions"
        slug: solidity-functions
        duration: 20
        video_url: "00D7glGDsJMTZ01T89urxC37iIriN02EhdQQxtHff00xqGw"
        raw_markdown_url: "/routes/solidity/1-simple-storage/4-functions/+page.md"
        description: |-
                    This lesson focuses on creating functions in Solidity, specifically a 'Store' function for updating a variable. It explains the syntax and structure of functions, including visibility specifiers, and guides students through deploying and interacting with the smart contract using the Remix IDE.
        markdown_content: |-
          ---
          title: Functions & Deployment
          ---
          
          
          *Follow along with the course here.*
          
          
          
          <!-- <img src="/solidity/remix/lesson-2/solidity-types/types.png" style="width: 100%; height: auto;"> -->
          
          Let's dive into creating our first Solidity function called `Store`. The function `Store` will be responsible for updating our `favoriteNumber` variable.
          
          ## Building the Store Function
          
          In Solidity programming, functions are identified by the keyword `Function`. You write the `Function` keyword, followed by the function's name, and additional parameters enclosed in parentheses. The parameters define the data a function needs to execute. For instance, to inform our `Store` function about the value it should use to update `favoriteNumber`, we pass a variable of type `uint256` named `_FavoriteNumber`.
          
          Here's how to define the function:
          
          
          
          ```js
          function Store(uint256 _favoriteNumber) public {favoriteNumber = _favoriteNumber;}
          ```
          
          Within these brackets `{'{'}...{'}'}`, we indicate that the `favoriteNumber` variable is updated to `_favoriteNumber` whenever the `Store` function is called.
          
          The prefix `_` indicates that `_favoriteNumber` is different from the favoriteNumber variable outside the function. This helps prevent potential confusion when dealing with different variables with similar names.
          
          This function can be tested out on the local Remix VM.
          
          ## Deploying the Smart Contract
          
          At this stage, you can compile your code by navigating to the compile tab and hitting Compile. After compiling, navigate to the tab titled **Deploy and Run Transactions** to test your function.
          
          The **Deploy and Run Transactions** tab holds a variety of parameters that are used during the deployment and running of transactions. The contract will be deployed to a simulated Remix VM environment.
          
          <img src="/solidity/remix/lesson-2/functions/deploy_and_run.png" style="width: 100%; height: auto;">
          
          In the environment, your contract will have been assigned a unique address. As with MetaMask wallets, you can copy the contract's address using the copy tool and save it as a comment in your code.
          
          <img src="/solidity/remix/lesson-2/functions/deployment_address.png" style="width: 100%; height: auto;">
          
          
          As shown below:
          
          ```go
          The Address of our Contract is: 0xd9145CCE52D386f254917e481eB44e9943F39138 This is a Sample Address
          
          ```
          
          Again, you can re-access your deployed contract by expanding the **Deployed Contracts** interface and simultaneously opening the terminal, which shows log data of all contract deployment and transactions.
          
          ### Making Transactions with the Store Function
          
          Now, you can send a transaction to your `Store` function to change the variable `favoriteNumber`. By inputting a number and pressing the `Store` button, a transaction is initiated. After some time, the transaction's status will change from pending to complete.
          
          Every transaction consumes Ether from your account as it is processed; Ether is spent for each operation inside Ethereum's virtual machine or EVM. In our case, deploying a contract and invoking its functions consumes gas (Ether).
          
          Keep in mind: whenever a value on the blockchain is modified, it's done by sending a transaction that consumes gas.
          
          ### Checking the Transaction
          
          At this point, you may want to confirm that the favorite number has actually been updated. The visibility of the `favoriteNumber` variable, however, is defaulted to internal thereby not allowing outside contracts and people to view it. But fear not, simply append the keyword `public` to variable `favoriteNumber` and you will be able to see it.
          
          ```bash
          uint256 public favoriteNumber;
          ```
          
          After compilation and deployment, a button labeled `favoriteNumber` will become visible. When pressed, it should return the value of `favoriteNumber`.
          
          <img src="/solidity/remix/lesson-2/functions/favorite-number.png" style="width: 100%; height: auto;">
          
          
          ## Understanding Function &amp; Variable Visibility
          
          In Solidity, functions and variables can have one of four visibility specifiers: 
          - `public`
          - `private`
          - `external` 
          - `internal`. 
            
          If a visibility specifier is not given, it defaults to `internal`.
          
          <img src="/solidity/remix/lesson-2/functions/f1.png" style="width: 100%; height: auto;">
          <img src="/solidity/remix/lesson-2/functions/f2.png" style="width: 100%; height: auto;">
          
          ## Deeper Understanding of Functions
          
          In the case of retrieving a value from the blockchain without modification, Solidity provides `view` and `pure` keywords.
          
          A function marked as `view` is used when we simply need to read state from the blockchain (without modifying it). It is correspondent to the blue buttons in the Remix interface.
          
          ```bash
          function retrieve() public view returns(uint256){return favoriteNumber;}
          ```
          
          <img src="/solidity/remix/lesson-2/functions/blue-button.png" style="width: 100%; height: auto;">
          
          
          A `pure` function, on the other hand, disallows any reading from the state or storage or any modification of the state.
          
          ```bash
          function retrieve() public pure returns(uint256){return 7;}
          ```
          
          It's worth mentioning that while calling `view` or `pure` functions don’t require gas, they do require gas when called by another function that modifies the state or storage through a transaction.
          
          ## Understanding the Scope of a Variable
          
          The scope of a variable is determined by the curly braces `{'{'}...{'}'}` in which it is declared. A variable can only be accessed within its declared scope. Therefore, if you need to access a variable on different functions, you should declare it outside the functions but inside the contract.
          
          ## Conclusion
          
          In this walk-through, you have learnt how to build a function in Solidity, define its visibility, and understand how it operates on values within a smart contract. You have also explored different transactions and how they consume gas. By understanding functions and their operations, you can take the next step in creating and deploying sophisticated smart contracts on the Ethereum blockchain.
          
          Let's keep learning!
      -
        type: new_lesson
        enabled: true
        id: 271a2535-9ece-4e0b-8678-8794bd84a0b0
        title: "Arrays and structs"
        slug: solidity-arrays-and-structs
        duration: 13
        video_url: "wYHVJXyPlhgyY01VPHRYnx8emKqR8QUZa1Zoj02wAJYoE"
        raw_markdown_url: "/routes/solidity/1-simple-storage/5-arrays-and-structs/+page.md"
        description: |-
                    This lesson explores the use of arrays and structs in Solidity for creating a list of favorite numbers and tying them to individuals. It demonstrates how to create and manipulate arrays and structs, enhancing the functionality of a smart contract to handle multiple data entries.
        markdown_content: |-
          ---
          title: Solidity Arrays & Structs
          ---
          
          *Follow along with the course here.*
          
          
          
          ## Storing and Tracking Favorite Numbers in Our Contract
          
          Our smart contract, as is, does an excellent job. It primarily enables users to store their favorite numbers, update them, and view them later. Sounds brilliant, right? Yet, it has been specifically designed to store a single favorite number at a time. What if we wanted to maintain not just our favorite number, but others as well?
          
          In this lesson, we will explore how we can extend this functionality. We'll learn how to create a list of favorite numbers using arrays. Additionally, we will delve into using `structs` for creating new types in Solidity. Let's get started!
          
          ### An Array of Favorite Numbers
          
          The idea is to say goodbye to one `uint256` favorite number and say hello to a list of `uint256` numbers, or in our case, a list of favorite numbers. Here's the magic syntax:
          
          ```bash
          uint256[] list_of_favorite_numbers;
          ```
          
          The bracket syntax identifies that we have a list of `uint256`, a list or array of numbers. An array of numbers would look something like this:
          
          ```bash
          Array_Example_list_of_favorite_numbers = [0, 78, 90];
          ```
          
          Arrays are very dominant in computer science and programming, and an array in Solidity bears resemblance to an array in any other programming language. If you're new to arrays or lists, remember arrays are zero indexed. The first element starts from index zero, the second from index one, and so on.
          
          ### Creating a Struct for `Person`
          
          But an array of numbers is not enough - we wouldn't know whose favorite number is which! We need a way to tie favorite numbers to people. So let's evolve our code by defining a new type `Person` using the `Struct` keyword.
          
          ```bash
          struct Person {uint256 favorite_number;string name;}
          ```
          
          Realize the beauty of this new type? Now each `Person` has a favorite number and a name! Remember we need to be particular about scope - don't let your internal variable names clash.
          
          ```bash
          Renaming to avoid clashuint256 my_favorite_number;
          ```
          
          We can now create a variable of type `Person` the same way we did for `uint256`. Meet our friend Pat!
          
          ```bash
          Person public my_friend = Person(7, 'Pat');
          ```
          
          So, we've now created our own type `Person` and defined Pat who has a favorite number of seven and a name of 'Pat'. We can retrieve these details using the generated getter function thanks to the `public` visibility.
          
          ### An Array of `Person`
          
          Creating individual variables for each friend might become a tedious task, especially when we'd like to add a large number of friends. What we can do instead is use the array syntax we've learned and create an array or list of `Person`.
          
          ```bash
          Person[] public list_of_people;
          ```
          
          When using a dynamic array, we can add as many `Person` objects as we wish to our list, as the size of the array can now grow and shrink dynamically in Solidity. We can access each `Person` object in our array by its index.
          
          ### Adding Persons to the List
          
          Next, we need to create a function that will allow us to add people to our list.
          
          ```bash
          function add_person(string memory _name, uint256 _favorite_number) public {
              list_of_people.push(Person(_favorite_number, _name));
          }
          ```
          
          `add_person` is a function that takes two variables as input - the name and favorite number of the person. It creates a new `Person` object and adds it to our `list_of_people` array.
          
          ### Final Thoughts
          
          With these additions, our Solidity contract is now able to store multiple favorite numbers, each tied to a specific person. When called, our `add_person` function will create a new `Person`, add them to the dynamic array and we can view each person and corresponding favorite number via their array index.
          
          And that's it! We've now gone from a simple contract that stores just one favorite number to one that can handle multiple favorite numbers from different people. Happy coding!
          
          <img src="/solidity/remix/lesson-2/arrays-structs/note.png" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: 1b19ae88-aafa-4d49-be07-40f1a34bb6b7
        title: "Errors and warnings"
        slug: solidity-errors-and-warnings
        duration: 5
        video_url: "aylvinWWznTCbheZ7tEick97wRum01401nzrlzZuT3NL4"
        raw_markdown_url: "/routes/solidity/1-simple-storage/6-errors-and-warnings/+page.md"
        description: |-
                    A guide to understanding and resolving errors and warnings in Solidity programming. The lesson covers interpreting the color coding of error messages, leveraging online resources like Phind, and effectively using communities like GitHub discussions and Stack Exchange for problem-solving.
        markdown_content: |-
          ---
          title: Errors and Warnings
          ---
          
          *Follow along with the course here.*
          
          
          
          <!-- <img src="/solidity/remix/lesson-2/arrays-structs/note.png" style="width: 100%; height: auto;"> -->
          
          ## Interpreting the Color Coding
          
          When working with Solidity, if we negligently eliminate something crucial from our code – like semicolon – and then try to compile, we are met with a stream of red error messages. Whenever you see these red errors, it indicates that your code is not compiling. In essence, Solidity isn't able to convert your written code into machine-readable form.
          
          Here's an illustrative error message you might encounter:
          
          
          
          <img src="/solidity/remix/lesson-2/errors-warnings/errors2.png" style="width: 100%; height: auto;">
          
          
          
          Here, Solidity is complaining about a missing semicolon. So, to rectify this, we simply need to append a semicolon at the appropriate point in the code, then recompile. With the semicolon in place, no errors will occur, and we can go on to deploying our code to the blockchain.
          
          On another note, let's consider what happens when we delete the SPDX license identifier from the top of our code, then recompile. Instead of a sea of red, we get a yellow box alerting us to a warning, rather than an error.
          
          ```markdown
          > Warning: SPDX license identifier not provided in source file
          ```
          <img src="/solidity/remix/lesson-2/errors-warnings/warning.png" style="width: 100%; height: auto;">
          
          
          
          It's encouraging to note that, despite warnings, we can still compile and deploy our code. These warnings function as alerts; not as impediments. However, this should not be interpreted as carte blanche to ignore these alerts. They are warnings for a good reason. Often, they highlight poor or risky practices in your code, sometimes hinting at bugs. Thus, it's often wise to heed these warnings and modify your code accordingly.
          
          To recap:
          
          - If it's <span style="color:red">*red*</span>, it's broken.
          - If it's <span style="color:#808000">*yellow*</span>, you might want to double-check.
          
          ## Learning to Leverage Online Resources
          
          In situations when the errors or warnings remain cryptic, we can turn to online resources for assistance. Suppose you encounter an error message that leaves you bewildered. In such cases, copying the error message and performing a Google search, or using resources highlighted in this course – such as Chat GPT, GitHub Discussions, Ethereum Stack Exchange – can make the situation clearer. Each of these resources has its strengths and weaknesses, which we will discuss later in the course.
          
          ### Utilizing Phind – The AI Search Engine for Developers
          
          For instance, using [Phind](https://www.phind.com/) can prove beneficial. **Phind** is an AI-powered search engine for developers. It operates by first conducting a Google search based on your query, then parsing the results to give you a contextual response.
          
          <img src="/solidity/remix/lesson-2/errors-warnings/questions.png" style="width: 100%; height: auto;">
          
          
          We can enter the compiler error under the drop-down selection, then execute the search. The result is a detailed insight into why the error occurred and how to fix it.
          
          
          <img src="/solidity/remix/lesson-2/errors-warnings/phind-answer.png" style="width: 100%; height: auto;">
          
          
          
          After intensive AI analysis, **Phind** suggests that a simple addition of a semicolon where the new person is being pushed onto the dynamic 'people' array list, can resolve the issue.
          
          
          
          ## Other Key Online Developer Resources
          
          Several AI tools are still in their developmental stages so they may not always render the perfect solution.
          
          Other remarkable communities include **GitHub discussions, Stack Exchange** among others.
          
          <img src="/solidity/remix/lesson-2/errors-warnings/quote1.png" style="width: 100%; height: auto;">
          
          
          We encourage you to actively use these resources, as they can significantly enhance your understanding and skill.
          
          In later parts of this course, we will take a closer look at posing effective questions, AI prompting, structuring your questions, as well as searching and learning more.
          
          Should you receive a less than satisfactory answer from Find or Chat GPT, feel free to use the GitHub discussions for course-specific queries. For broader questions about Solidity or Foundry, there are several other resources at your disposal.
          
          Congratulations! You've just taken your first steps into the domain of prompt engineering and the understanding to face errors and warnings head-on. In the next lesson, we will take a closer look at the Solidity and more advanced features of Remix.
      -
        type: new_lesson
        enabled: true
        id: 1d8d1ef5-924a-4a2a-89cd-25c31f274e62
        title: "Memory storage and calldata"
        slug: solidity-memory-storage-calldata
        duration: 6
        video_url: "ZoY4VGpMRZ00yx2qXv5HKWCRrFOjNYCyl02sfzArg7fxM"
        raw_markdown_url: "/routes/solidity/1-simple-storage/7-memory-storage-calldata/+page.md"
        description: |-
                    An in-depth look at data locations in Solidity, focusing on the differences and applications of 'memory', 'storage', and 'calldata'. The lesson explains these concepts with examples, clarifying their roles in temporary and permanent data storage within smart contracts.
        markdown_content: |-
          ---
          title: Memory, Storage, and Calldata
          ---
          
          
          *Follow along with the course here.*
          
          
          
          
          One aspect that crashes the compilers and gets heads scratching is the `memory` keyword, which we can gloss over, as it's heavily entwined with the data locations in Solidity. You might be puzzled when you delete the keyword sometimes and you receive a compilation error. Let's dive into this conundrum.
          
          ## Data Locations in Solidity
          
          Solidity allows data to be stored in 6 locations:
          
          1. Stack
          2. Memory
          3. Storage
          4. Calldata
          5. Code
          6. Logs
          
          For the purposes of this post, we will focus on three principal ones: Call Data, Memory, and Storage. Adding a word of caution – this can get quite intricate. If you don’t comprehend everything on the first go, remember perseverance is the key.
          
          ## Call Data and Memory: Temporary Variables
          
          <img src="/solidity/remix/lesson-2/memory/memory1.jpg" style="width: 100%; height: auto;">
          
          
          In Solidity, `calldata` and `memory` relate to temporary variables that only exist during the execution of a function. If you run a function with a variable name for once, you can access it only for that particular function execution. If you try to retrieve the variable in the next function execution, you will fail because it was stored temporarily.
          
          Example:
          
          ```bash
          string memory name = "Patrick";
          uint256 favoriteNumber = 7;
          ```
          
          Strings need special attention. In Solidity, you must specify either memory or call data due to the way arrays work in memory. Most variables automatically default to memory variables, while strings require explicit specification.
          
          <img src="/solidity/remix/lesson-2/memory/memory3.png" style="width: 100%; height: auto;">
          
          
          So far, so right, but why do we have two variants of temporary variables? Let's explore more with an example.
          
          <img src="/solidity/remix/lesson-2/memory/calldata.png" style="width: 100%; height: auto;">
          
          
          Now, If we replace `memory` with `calldata` and try to compile it, we receive an error message. This occurred because, unlike `memory` variables, `calldata` variables can't be manipulated – they are read-only.
          
          ## Storage: Permanent Variables
          
          While `calldata` and `memory` are designated for temporary variables, `storage` is for permanent variables that can be altered.
          
          <img src="/solidity/remix/lesson-2/memory/memory2.jpg" style="width: 100%; height: auto;">
          
          
          Variables declared outside any function, directly under the contract scope, are implicitly converted to storage variables.
          
          ```bash
          contract MyContract {
              uint256 favoriteNumber = 123
              };
          ```
          
          You can always retrieve these permanent variables later, even outside function calls.
          
          ## The Essence of Memory Keyword
          
          Now, you might be thinking, why do we explicitly use the `memory` keyword on the String and not on the `uint256`, also you'll get an error stating `Data location can only be specified for array, struct, or mapping type`.
          
          <img src="/solidity/remix/lesson-2/memory/memory-err.png" style="width: 100%; height: auto;">
          
          
          Solidity recognizes `string` as an array of bytes (a special type) and due to memory management workings, we need to use `memory` with it. Primitive types such as the `uint256` are smart enough and know where to be located under the hood.
          
          Remember, you can't use the `storage` keyword for temporary variables inside a function. Only `memory` and `calldata` are allowed here because the variable only lives for a short duration.
          
          ## Key Takeaway
          
          - When passed as function parameters, structs, mappings, and arrays in Solidity need to use the explicit `memory` keyword.
          - Strings, considered an array of bytes, require explicit `memory` or `calldata` keyword.
          
          Congratulations for reaching this point, now let's delve into Solidity mappings.
      -
        type: new_lesson
        enabled: true
        id: 2022d3b1-4a00-429a-8fbd-e984114ba876
        title: "Mappings"
        slug: solidity-mappings
        duration: 5
        video_url: "oKWRkN01aLcvYfUhZxenOHx4Br9pYltuQG4kJyrLGB200"
        raw_markdown_url: "/routes/solidity/1-simple-storage/8-mappings/+page.md"
        description: |-
                    This lesson introduces the concept of mappings in Solidity, explaining how they can be used to efficiently link information, such as connecting names to numbers. It demonstrates how to define and use mappings to improve data access in a smart contract.
        markdown_content: |-
          ---
          title: Solidity Mappings
          ---
          
          *Follow along with the course here.*
          
          
          
          
          
          ## Understanding the Problem with Arrays
          
          Imagine you have a contract that holds a list of individuals along with their favorite numbers:
          
          ```json
          [
              ("Pat", 7),
              ("John", 8), 
              ("Mariah", 10), 
              ("Chelsea", 232)
          ]
          ```
          
          Now, if you want to know Chelsea's favorite number, you will have to run a loop through the array. This might seem fine when managing data of a few individuals, but imagine scaling this up to 1,000 or more. Constantly iterating through large arrays to locate a specific element can be incredibly time-consuming and inefficient.
          
          Take the scenario:
          
          ```json
          Oh, what was Chelsea's favorite number?
              Array element at 0 - Pat.
              Array element at 1 - John.
              Array element at 2 - Mariah.
              Array element at 3 - Chelsea => favorite number: 232.
          ```
          
          Is there a better data structure that can improve this access process and make finding individual information a breeze?
          
          Meet `mapping`.
          
          ## Mapping: A Simpler Way to Link Information
          
          Think of mapping in coding like a dictionary: each word in a dictionary has a unique meaning or a chunk of text associated with it. Similarly, a mapping in code is essentially a set of keys with each key returning a unique set of information. Thus, if you look up a word or a 'string' in coding terms, the corresponding output will be the text or 'number' associated only with that string.
          
          A typical way of defining a mapping starts with the keyword 'mapping', the key type, the datatype of data to be linked with each key and the visibility type. Let's create a mapping type:
          
          ```javascript
          mapping (string => uint256) public nameToFavoriteNumber;
          ```
          
          With this, we have constructed a mapping that maps every string to a uint256 number emulating a link between a person's name and their favorite number. Now, rather than iterating through an array, we can directly enter the name and get their favorite number.
          
          ## Augmenting the AddPerson Function
          
          Previously, we had an `addPerson` function that enabled us to add someone to our list. Let's modify this function to update our mapping every time a person is added:
          
          ```javascript
          // Adding someone to the mapping
          nameToFavoriteNumber[_name] = _favoriteNumber;
          ```
          
          This line will add a person's name to the mapping where each name will point to their favorite number. The result? A far quicker way to access a person's favorite number just by knowing their name.
          
          <img src="/solidity/remix/lesson-2/mappings/mappings1.png" style="width: 100%; height: auto;">
          
          
          ## A Test Run
          
          <img src="/solidity/remix/lesson-2/mappings/mappings2.png" style="width: 100%; height: auto;">
          
          
          The last example illustrates an important point. In a mapping, the default value for all key types is zero. Therefore, if you look up a key (person's name in this case) that hasn't been added yet, it will return the default value which is zero.
          
          ## Wrapping Up
          
          In conclusion, mapping in code can be a versatile tool to increase efficiency when attempting to find elements within larger lists or arrays. By streamlining the process with the use of a mapping, you can avoid the woes of constant iteration and instead achieve results more directly. As such, mapping is a useful tool every programmer should have in their toolbox.
      -
        type: new_lesson
        enabled: true
        id: bdcd4385-ca14-49c0-8367-cdf923c9e6ec
        title: "Deploying your first contract"
        slug: deploying-solidity-smart-contract
        duration: 10
        video_url: "900kcAE01NeJdsjhuTLqS368dCw902e7FKIpZHiATdnbGE"
        raw_markdown_url: "/routes/solidity/1-simple-storage/9-deploying/+page.md"
        description: |-
                    A practical guide to deploying a Solidity smart contract on a testnet. The lesson walks through the pre-deployment audit, compilation check, changing the environment, connecting accounts, confirming transactions, and interacting with the deployed contract.
        markdown_content: |-
          ---
          title: Deploying a Contract
          ---
          
          *Follow along with the course here.*
          
          
          
          
          # Deploying A Simple Storage Contract On A Testnet
          
          If you’ve been following along through our work with simple storage contract, you will see that we have progressively added functionality to our solidity contract. With our favorite number feature, typing person, public list, favorite number retrieval, and update functions, we’ve built up a solid contract structure. Now, it’s time to steer away from abstract theorizing and practically deploy this to a real **testnet**.
          
          
          ## Pre-Deployment Audit
          
          <img src="/solidity/remix/lesson-2/deploying/deploying1.png" style="width: 100%; height: auto;">
          
          
          ## Compilation Check
          
          This ensures that our contract has no errors or warnings and is fit for deployment. Go to your development environment and ensure that you have a green checkmark, indicating a successful compilation.
          
          ## Changing The Environment
          
          The deployment process Kicks off by switching from the local virtual environment (Remix VM) to MetaMask as the Injected provider. Here's how you can make the switch:
          
          1. Navigate to the deploy tab
          2. Delete any content there
          3. Change the environment
          
          Choose the **Injected Provider MetaMask** option. This allows the web interface to interact with your MetaMask account.
          
          <img src="/solidity/remix/lesson-2/deploying/deploying2.png" style="width: 100%; height: auto;">
          
          
          ## Connecting The Account
          
          Upon choosing MetaMask as your injected provider, you will be prompted to pick a specific account for use. Choose your desired account and proceed to connect it. Next, check your MetaMask display and ensure that your account is properly connected to Remix. It’s critical to double-check that you are on the correct testnet as this guide uses the Sapolia testnet.
          
          <img src="/solidity/remix/lesson-2/deploying/deploying3.png" style="width: 100%; height: auto;">
          
          
          If have sufficient Sapolia ETH in your account provided from a [faucet](https://sepoliafaucet.com/), you can now go ahead and click the "Deploy" button.
          
          
          ## Confirming The Transaction
          
          Upon hitting the deploy button, MetaMask will prompt you to confirm the transaction for contract deployment.
          
          Since we are on the Sapolia testnet and not on a mainnet, the money spent here is not real.
          
          Click "Confirm" to launch the contract deployment.
          
          <img src="/solidity/remix/lesson-2/deploying/deploying4.png" style="width: 100%; height: auto;">
          
          
          ## Checking The Deployment
          
          After you confirm, you should now find the following indicators that your contract deployment is successful:
          
          - Green checkmark appears
          - Invocation status changes to ‘block confirmations’
          - Contract address appears under deployed contracts
          
          <img src="/solidity/remix/lesson-2/deploying/deploying5.png" style="width: 100%; height: auto;">
          
          
          
          If you wait and refresh your etherscan page, you’ll see a "Success" status, along with the complete details of your transaction. For deployment transactions, the input data field will be larger than normal transaction data; it contains contract creation data, along with the gas fee details because any action that alters the blockchain requires gas for implementation.
          
          <img src="/solidity/remix/lesson-2/deploying/deploying6.png" style="width: 100%; height: auto;">
          
          
          # Interacting With The Deployed Contract
          
          Now that your contract has been successfully deployed, we can recreate the same Flexibility as we had on the virtual environment on this testnet.
          
          We can call the Retrieve function, and Name to favorite function which returns zero and nothing respectively as we haven't updated anything. Adding zero in for the list of people also returns nothing as expected.
          
          # Updating The Blockchain
          
          To update the blockchain, press store and input a number (e.g., 7878). MetaMask will prompt you to confirm the update transaction. This will update the favorite number on the contract.
          
          Similar confirmation checks will be run, with transaction details available on etherscan.
          
          <img src="/solidity/remix/lesson-2/deploying/deploying7.png" style="width: 100%; height: auto;">
          
          ## Celebrate Small Wins
          
          If you’ve successfully followed all these steps, you’ve just navigated your first practical deployment of a smart contract to a testnet! Don't underestimate the importance of celebrating small developmental milestones. They are key psychological boosts that will keep you motivated and engage with any new skill you’re learning.
          
          
          ## Deploying to Another Testnet
          
          If you wanted to deploy to another testnet, just switch to the testnet, ensure sufficient ETH and repeat the deployment process.
          
          ## Deploying to Mainnet
          
          For the mainnet, the same process is applicable with the main difference being that you would require Ethereum, or in other words real money, to deploy.
          
          Moreover, if you want to deploy to other EVM compatible networks, we'll cover that in future guides.
          
          ## Coining Yourself As A Solidity Developer
          
          By deploying and interacting with your smart contract, you can confidently call yourself a solidity developer. Remember, every developer's journey comes with constant learning curves, so don’t stop here. Keep exploring and experimenting with Solidity and of course keep learning with the next lessons.
      -
        type: new_lesson
        enabled: true
        id: 61efb7c8-e936-47de-8e49-dc8814b31ff6
        title: "Section recap"
        slug: evm-recap
        duration: 3
        video_url: "3ziv44zKK011WjfKUpny6pnAA601ifajZKsbasEW2evHw"
        raw_markdown_url: "/routes/solidity/1-simple-storage/10-evm-recap/+page.md"
        description: |-
                    A recap of the section, emphasizing the understanding and workings of the Ethereum Virtual Machine (EVM) and its compatibility with various blockchains. The lesson revisits the essentials of writing a smart contract, types and structures in Solidity, functions, data locations, and the importance of continued learning in Solidity development.
        markdown_content: |-
          ---
          title: Recap & Congratulations
          ---
          
          *Follow along with the course here.*
          
          
          
          
          <!-- <img src="/solidity/remix/lesson-2/deploying/deploying1.png" style="width: 100%; height: auto;"> -->
          
          ## Working with Ethereum Virtual Machine (EVM)
          
          One term that frequently comes up when talking about deploying code onto a blockchain network is "EVM," which stands for `Ethereum Virtual Machine`. Now, the EVM might seem like a complex term, but essentially it's a standard for how to compile and deploy smart contracts to a blockchain.
          
          For anyone interacting with the blockchain space, particularly those deploying smart contracts, understanding the basic functioning and application of the Ethereum virtual machine is invaluable.
          
          
          
          ## EVM Compatible Blockchains
          
          Any smart contract or solidity code you write can be deployed to any blockchain that is compatible with the EVM. Prime examples of such blockchains and Layer 2 solutions include **Ethereum**, **Polygon**, **Arbitram**, **Optimism**, and **Zksync**. Even though a blockchain, such as Zksync, might be EVM-compatible, it's critical to ensure that all keywords are compatible as some do not work with every EVM-compatible blockchain.
          
          <img src="/solidity/remix/lesson-2/evm/evm1.png" style="width: 100%; height: auto;">
          
          
          Now that we've understood the basics of EVM and its deployment, let's dive into the nitty-gritty of writing your solidity code for smart contracts.
          
          ## Writing Your First Smart Contract
          
          At the start of any smart contract or Solidity code you write, always mention the version you want to work with. Right above the version, insert the SPDX license Identifier. If you're unsure about the version to use, you can default to the *MIT license* for the time being.
          
          Here's an example:
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity >=0.7.0 <0.9.0;[...]
          ```
          
          Next, you need to create what is known as a contract object. This contract object constitutes the basic structure of your smart contract. A `contract` in Solidity is somewhat similar to a class in other programming languages, where anything inside the curly brackets `{'{'}...{'}'}` forms part of that contract.
          
          ## Types and Structures
          
          Solidity supports multiple types like `uint256`, `string`, `boolean`, `int`, and others. Further, Solidity also allows for the creation of custom types using a feature known as a `struct`.
          
          Though this language might seem foreign, take solace in the fact that Solidity, like other programming languages, supports the creation of arrays (or lists), and mappings (akin to dictionaries or hash tables). As a quick reference, if you provide a key to your mapping, you'll receive the variable associated with that key.
          
          ## Functions and Behavior
          
          The real magic happens when we start creating functions in Solidity that can modify the state of the blockchain. In addition, we can create functions that are "read-only", meaning they don’t modify the blockchain’s state - these are known as `view` and `pure` functions.
          
          ## Data Locations and Memory
          
          We can specify different data locations in our parameters. Notice that this only applies to particular types like strings, structs, and arrays. The terms `calldata` and `memory` are used to denote temporary variables that exist only for the duration of a function call. On the other hand, `storage` variables are permanent and remain in the contract forever.
          
          An important caveat is that function parameters can't be `storage` variables, as they will only exist for the duration of the function call.
          
          ## Conclusion
          
          When we compile our smart contract, it essentially compiles our Solidity code down to EVM-compatible bytecode (machine-readable code). We will delve into these specifications in later posts.
          
          But for now, congratulations on making your first step toward creating a contract on the blockchain! Go reward yourself with some ice-cream, an extra cup of coffee, or anything else you fancy. Happy coding!
          
    type: new_section
    enabled: true
  -
    title: "Storage Factory"
    slug: storage-factory
    lessons:
      -
        type: new_lesson
        enabled: true
        id: 5fabb153-8853-4b94-9984-d15dfe6501a5
        title: "Storage factory introduction"
        slug: factory-introduction
        duration: 4
        video_url: "DQzQrGEcP01z1XkK96EBqt01MFopa01qbOIb14qkRH3Jhc"
        raw_markdown_url: "/routes/solidity/2-storage-factory/1-factory-introduction/+page.md"
        description: |-
                    Introduction to deploying and interacting with contracts, focusing on Remix Storage Factory. The lesson involves working with 'SimpleStorage.sol', 'AddFiveStorage.sol', and 'StorageFactory.sol', demonstrating how other contracts can deploy and interact with new contracts.
        markdown_content: |-
          ---
          title: Introduction
          ---
          *If you'd like, you can follow along with the course here.*
          
          
          
          Welcome back to our developer tutorial series! We've made our way to lesson three, where we'll dive deeper into the world of contracts, by discussing their deployment and interaction abilities. As always, all the resources for this session can be found in the [Github Repo](https://github.com/Cyfrin/foundry-full-course-f23#lesson-3-remix-storage-factory). For this lesson, we'll focus on the Remix Storage Factory.
          
          
          ## What To Expect in This Lesson
          
          In this session, we'll be working with three new contract files, namely:
          
          1. `SimpleStorage.sol` - we'll be working with a slightly modified version of this Smart Contract,
          2. `AddFiveStorage.sol` - a completely new one for this lesson,
          3. `StorageFactory.sol` - our main character for this lesson.
          
          Our `StorageFactory.sol` will serve as a workshop, creating and deploying new Simple Storage contracts. It's crucial to note that other contracts can indeed deploy new contracts. Beyond deployment, our storage factory will also interact with these freshly minted contracts.
          
          ## Diving Deeper Into the Code
          
          Before we delve into writing code, let's visualize how this whole thing works. We'll take you through these steps with the help of the Remix VM, let's take a look to the main functions we are going to work with.
          
          ```js
          contract simplestorage {
              function createSimpleStorageContract() public {};
              function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {};
              function sFGet(uint256 _simpleStorageIndex) public view returns (uint256) {}
              }
          ```
          
          Follow along:
          
          1. Compile our code and deploy to the Remix VM.
          2. Scroll down to choose 'storage factory' from the contract selection.
          3. Now we have deployed this contract.
          
          The first function is `createSimpleStorageContract()`. We'll trigger this and see a new transaction appear. This transaction shows us deploying a Simple Storage contract from our Storage Factory contract.
          
          As a bonus, we can interact with our Simple Storage contract via the `Store` function. This function accepts a favorite number input. Let's test this by using the `sfStore` function from our Storage Factory contract. We'll enter `0` as the index for our Simple Storage contract (as we've only deployed one so far), and we'll say our new favorite number is `123`. We'll execute `sfStore` and voila!
          
          Now type `sFGet(0)`, we'll retrieve the favorite number 123 we stored earlier.
          
          
          ## Wrapping Up
          
          Aside from the storage factory, this lesson is also about introducing you to critical Solidity features such as imports and inheritance. But remember this is just a introduction, we are going to dive on how this contracts works step by step on the next lessons.
      -
        type: new_lesson
        enabled: true
        id: cd198711-c9ff-44fa-825f-3ca72733a5d9
        title: "Setting the project"
        slug: setting-up-the-factory
        duration: 6
        video_url: "EOBi900bPdfkGM6q1RHussQYVTjECssypDODFRUrTgII"
        raw_markdown_url: "/routes/solidity/2-storage-factory/2-setting-up-the-factory/+page.md"
        description: |-
                    This lesson explores the concept of composability in smart contracts, particularly in DeFi, and introduces the 'StorageFactory' contract that interacts with and deploys the 'SimpleStorage' contract. It covers setting up the StorageFactory contract in Remix and emphasizes the importance of version consistency in Solidity.
        markdown_content: |-
          ---
          title: Setting up
          ---
          
          *If you'd like, you can follow along with the course here.*
          
          
          
          
          ## What is Composability in Smart Contracts?
          
          <img src="/solidity/remix/lesson-3/setting-up/setting-up2.png" style="width: 100%; height: auto;">
          
          
          One of the key aspects of blockchain development is the seamless and permissionless interaction among contracts, referred to as composability. This becomes especially important in decentralized finance (DeFi), where intricate financial products interact compatibly using the same smart contract interface.
          
          In this lesson, we'll be creating a contract titled `StorageFactory` that will interact with and deploy our existing `SimpleStorage` contract.
          
          ## Setting Up the StorageFactory Contract
          
          Creating our new contract in Remix follows the same steps we've previously covered. The power of repetition is indeed vastly underrated — and this principle will hold even more merit when we begin working with AI pair programming tools.
          
          The primary structure of every Solidity smart contract begins with the SPDX License Identifier and the desired version of Solidity expressed as a pragma statement.
          
          ```js
          // SPDX-License-Identifier: MITpragma solidity ^0.8.18;
          ```
          
          Next, we'll define our contract:
          
          ```dart
          contract StorageFactory {}
          ```
          
          Once your contract is defined, remember to hit `Compile` The caret sign `(^)` before the solidity version implies that any version greater than or equal to 0.8.18 is acceptable.
          
          ## Creating and Deploying the SimpleStorage Contract
          
          The StorageFactory contract needs to deploy a SimpleStorage contract. For it to do this, the StorageFactory contract should know and understand what the SimpleStorage contract is and how it works.
          
          One way to ensure this is by placing the SimpleStorage contract code within the same file as the StorageFactory. This can be done by copying the SimpleStorage code and pasting it above the StorageFactory contract but below the pragma solidity line.
          
          ```dart
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          
          contract SimpleStorage {SimpleStorage code here}
          
          contract StorageFactory {}
          ```
          
          This option does allow for successful compilation, and both contracts can exist within the same file. However, this isn't best practice, especially with larger projects where multiple contracts in a single file can cause confusion and difficulty in code navigation. As a best practice, each contract should reside in its own file.
          
          When deploying contracts, if you select Remix VM and scroll down to the `Choose Contract` section, you'll notice that both contracts (SimpleStorage and StorageFactory) appear if the StorageFactory.sol file is open.
          
          <img src="/solidity/remix/lesson-3/setting-up/setting-up3.png" style="width: 100%; height: auto;">
          
          Next, in our StorageFactory.sol file, we'll create a function - `createSimpleStorageContract` that can deploy the SimpleStorage contract.
          
          The journey of harnessing the full potential of Solidity across these lessons is both challenging and exciting, stay tuned for more updates.
          Happy coding!
          
          <img src="/solidity/remix/lesson-3/setting-up/setting-up1.png" style="width: 100%; height: auto;">
      -
        type: new_lesson
        enabled: true
        id: 4e6c8899-247a-480a-9893-1b4d15cbd6b1
        title: "Deploying a contract from a contract"
        slug: deploying-a-contract-from-a-contract
        duration: 3
        video_url: "MgFDg37Nw6l27D9AJt4VXznQv00HBu3SBmWHk2Dk334w"
        raw_markdown_url: "/routes/solidity/2-storage-factory/3-deploying-a-contract-from-a-contract/+page.md"
        description: |-
                    The chapter focuses on deploying a Simple Storage contract in Solidity and saving it to a storage or state variable. It covers the syntax for creating a Simple Storage contract within another contract and demonstrates the deployment and interaction process in Remix.
        markdown_content: |-
          ---
          title: Deploying a Contract from a Contract (Factory)
          ---
          
          *If you'd like, you can follow along with the course here.*
          
          
          
          
          This chapter covers the process of deploying a Simple Storage contract in Solidity by saving it to a storage or state variable. This will be implemented similarly to saving any variable.
          
          ## Understanding the Syntax
          
          Let's begin by recalling an example of assigning a variable: `uint256 public favoriteNumber`. This follows the format `type visibility name`. In our case, we are going to do the exact same thing.
          
          The type of a Simple Storage contract will be `SimpleStorage`. The contract keyword here is similar to the Struct keyword, allowing us to create a new type.
          
          <img src="/solidity/remix/lesson-3/deploying/deploying-4.png" style="width: 100%; height: auto;">
          
          
          It is important to point out a syntax frequently used in Solidity and can be confusing for beginners: `SimpleStorage simpleStorage;`. The difference between `SimpleStorage` on the left and `simpleStorage` on the right lies in the case sensitivity. `Simple Storage` refers to the contract type while `simpleStorage` refers to the variable name.
          
          <img src="/solidity/remix/lesson-3/deploying/deploying-3.png" style="width: 100%; height: auto;">
          
          
          You will often find programmers naming the variable the same way as the contract itself.
          
          ## Creating A Simple Storage Contract
          
          We will go ahead and identify our contract in our `createSimpleStorageContract()` function. To do this, we will assign `simpleStorage = new SimpleStorage();`. Solidity knows to deploy a contract when we use the `new` keyword.
          
          This code should now succesfully compile. We can proceed to deploy it. Ensure that you are on the storagefactory.sol on the right-hand side, then scroll down to the contract. Now, you should be able to deploy the `StorageFactory`.
          
          ## Testing The Deployment
          
          After hitting the deploy button, you can observe the transaction visibility in the terminal. You will notice two buttons: a blue `View Function` button, which is there because the public keyword automatically gives the variable name a getter function, and an orange `createSimpleStorageContract` button that corresponds to the transaction.
          
          If we call the `createSimpleStorageContract` and then call `SimpleStorage` blue view function, the address that appears verifies that our `SimpleStorage` contract has been deployed.
          
          <img src="/solidity/remix/lesson-3/deploying/deploy-factory1.png" style="width: 100%; height: auto;">
          
          
          And just like that, you now know how to have a contract deploy another contract. Congratulations on tackling this important aspect of smart contract programming in Solidity. Despite the often subtle and sometimes confusing notation, the process itself is fairly straightforward. Familiarity comes with practice, so keep working with contracts and making deployments!
      -
        type: new_lesson
        enabled: true
        id: 2160e3d9-a66b-4f67-a5b8-bb759d5d9e10
        title: "Solidity imports"
        slug: solidity-imports
        duration: 6
        video_url: "DuspE4PMGeoLl400cRPLTGPDeihTguMS4us3vUfeWwbA"
        raw_markdown_url: "/routes/solidity/2-storage-factory/4-solidity-imports/+page.md"
        description: |-
                    This lesson covers the use of the 'import' statement in Solidity for organizing contract files, managing Solidity versions, and the advanced method of 'named imports'. It demonstrates how importing improves workflow and allows for selective inclusion of contract elements.
        markdown_content: |-
          ---
          title: Solidity Imports
          ---
          
          *If you'd like, you can follow along with the course here.*
          
          
          
          
          In this lesson, we will look at a more improved way of organizing your Solidity contract files using the `import` statement, making the task of making any changes in your contract files much simpler. We’ll also address potential issues around consistency in Solidity version between multiple files, and we'll focus primarily on the more advanced import method called `named imports` that you should always use.
          
          ## The Immaculate Import
          
          Most programmers are familiar with the concept of import – it's like adding a new tool to your toolbox, allowing you to use code from different files without cluttering your current project file. In Solidity, this is no different.
          
          Let's say we are dealing with two contract files: `SimpleStorage.sol` and `StorageFactory.sol`. Prior to using `import`, you would have to constantly copy-paste your contents of `SimpleStorage.sol` into `StorageFactory.sol` and vice-versa if any changes are made. If you're thinking that's too much work, then you are absolutely right!
          
          Instead, you can just use the `import` statement:
          
          ```js
          import "./SimpleStorage.sol";
          ```
          
          With this single line of code, you can effortlessly incorporate `SimpleStorage.sol` into `StorageFactory.sol`, drastically improving your workflow. It's as good as planting the entire `SimpleStorage.sol` within `StorageFactory.sol`, but without the mess.
          
          ## Manage Your Solidity Versions
          
          With multiple contracts in place, a word of caution: be wary of the versions of Solidity you're using. This is crucial because while Remix will automatically adjust the version upwards to ensure compatibility (e.g., bumping `0.8.16` to `0.8.18`), going the other direction can lead to compile errors. Ensuring that you are consistent with your version of Solidity is vital for smooth compiling of all your contracts.
          
          ## Named Imports: Your New Best Friend
          
          Although the import statement brings a breath of fresh air into your code organization, diving a little deeper will reveal a even better way of handling imports - the named imports.
          
          Imagine `SimpleStorage.sol` has multiple contract files (`SimpleStorage2`, `SimpleStorage3`, `SimpleStorage4`) which are quite extensive in size.
          
          ```js
          import "./simplestorage.sol"
          ```
          
          Using this statement will import everything from `SimpleStorage.sol`, including all the bulky contract files, leading to a far more expensive deployment of the `StorageFactory.sol`.
          
          Here's where named imports come into play. Named imports allow you to cherry pick the exact contracts you need:
          
          ```js
          import { SimpleStorage } from "./SimpleStorage.sol";
          ```
          
          Even if your `SimpleStorage.sol` has other contracts, named imports allow you to just import what you need (`SimpleStorage`), thus avoiding any unecessary imports.
          
          If you need multiple contracts, named imports have got you covered:
          
          ```js
          import { SimpleStorage, SimpleStorage2 } from "./SimpleStorage.sol";
          ```
          
          Now, this will only import `SimpleStorage` and `SimpleStorage2`, without bringing in any other possibly gargantuan contracts present in your `SimpleStorage.sol` file.
          
          By sticking to named imports, you're not just making your future coding lives simpler, but you're also staying ahead of the curve. Incredibly, just by employing named imports, you're setting yourself apart, ahead of 80% of current Solidity developers.
          
          ## Wrapping Up
          
          Now we've explored a more effective way of managing our Solidity contract files through the use of import statements, understood the need for solidity version management, and learned how to go one step further with named imports. Congratulations, you're now more equipped to organize your code, manage multiple contract files, and make your Solidity programming more efficient and tidy.
          
          Remember, in coding and in life, always aim to be incredibly efficient, even if that means being a little lazy.
      -
        type: new_lesson
        enabled: true
        id: ce675e0a-d6e9-4d32-8201-2882b2c8ef5d
        title: "Use AI to help pt.1"
        slug: ai-help-developing-coding
        duration: 4
        video_url: "dqTiKRtS8sWJPXZ9mgCNXD0211QcDAgXLvVP5iH14N9M"
        raw_markdown_url: "/routes/solidity/2-storage-factory/5-ai-help-ii/+page.md"
        description: |-
                    The lesson discusses utilizing AI chat platforms like ChatGPT and Bard to assist in understanding programming concepts. It emphasizes the importance of formulating questions effectively for AI platforms and provides guidance on using these tools for coding assistance.
        markdown_content: |-
          ---
          title: 5-ai-help-ii
          ---
          
          
          
          
          We've all been there. Staring blankly at a line of code and scratching our heads, trying to make sense of it. Sometimes a new concept or technique can trip us up. And it's not really surprising—the world of programming and technology is vast and constantly evolving and, sooner or later, we're bound to hit a roadblock.
          
          But fret not. Because AI is here to save the day. More specifically, AI chat platforms like **ChatGPT** and **Bard**. They can be a helpful resource to gain clarity when we're navigating the rocky terrain of programming.
          
          However, remember that 'how' you ask questions can significantly impact the clarity and effectiveness of the answers.
          
          ## Ask Questions the Right Way
          
          Let's say you come across a line of code and can't quite understand the difference between two instances of `SimpleStorage`. Here's how you can formulate a question for the AI:
          
          1. Open ChatGPT or any other AI chatbot platform you prefer.
          2. Start with a simple and straightforward query like:
             
              `"Hi, I'm having a hard time understanding the difference between these simple storages on this line."`
          3. Highlight **only the line** you're confused about and copy it.
          4. Paste this line of code within your question in a block format. In markdown, you can create a block by adding three backticks `"`````"` before and after the block of text or code.
          
          ```
              ```
              // paste your line of code here
              ```
          ```
          
          This signifies that it is a block of code and makes it easier for the AI to understand.
          
          5. If your code is small enough, you can paste the **entire code** as well, but remember to mark it as a code block too. Some AI may struggle to handle large amounts of code, so try to be as concise as possible.
              
              Here's an example of how it would look:
          
          ```
          Hi, I'm having a hard time understanding the difference between these simple storages on this line:
          ```
          
          ```
          ```// paste the confusing line of code here```
          ```
          
          ```
          Here is my full code:
          ```
          
          ```
          ```// paste the full code here```
          ```
          
          
          Now, just hit "Send" and let the AI do its magic!## Interpreting AI Responses
          
          <img src="/solidity/remix/lesson-3/ai-support/ai-support.png" style="width: 100%; height: auto;">
          
          
          The AI can provide insightful answers to help unravel the mysteries of your code. For instance, with the `SimpleStorage` example, an AI may indicate that "simple storage is a variable of type simple storage, which is a contract defined in simple storage.sol". If all goes well, this should help clarify any doubts you might have. 
          
          > "A lot of this beginner basic stuff AIS are really good at. As we get more and more advanced, AIs are going to start breaking apart. But at least for the beginning, AIs are going to be incredibly helpful and incredibly good at explaining a lot."From the basic to the more advanced stuff, you can lean on the AI chat as a "learning buddy".
          
          ## Not Always Right
          
          Despite their overwhelming benefits, remember that AI chat platforms are not infallible. They can, and do, get things wrong or misunderstood sometimes. When that happens, don't lose hope! You can engage other platforms like [Stack Exchange](https://ethereum.stackexchange.com/), or the discussion forums related to the course or topic you're studying.For instance, when querying about `SimpleStorage`, an AI response might refer to a 'stored data variable', which doesn't exist in the code you provided. Don't panic! It's just an example of how AI's often work on context-based inference and may sometimes link to unrelated concepts.
          
          Stay patient, stay curious, and keep learning!
          
      -
        type: new_lesson
        enabled: true
        id: 85b888f4-25c2-43e2-bece-6cfd3a09183b
        title: "Interacting with contracts ABI"
        slug: interacting-with-smart-contracts-abi
        duration: 10
        video_url: "gef1j01mhlA01Jc3K1DwsC02brjAifuN02VNxdBKf00E66UE"
        raw_markdown_url: "/routes/solidity/2-storage-factory/6-interacting-with-contracts-abi/+page.md"
        description: |-
                    This lesson teaches how to keep track of contract addresses when deploying new contracts using Solidity's 'new' keyword. It introduces the concept of ABI (Application Binary Interface) for contract interaction and demonstrates how to interact with contracts using ABI and address in Solidity.
        markdown_content: |-
          ---
          title: Interacting with Contracts ABI
          ---
          
          
          
          Let's assume that every time we call `createSimpleStorageContract()`, we're deploying a new Simple Storage Contract. But there's a catch – we're not keeping track of all the addresses that this simple storage contract is being deployed to. Let's fix that.
          
          ### Solution: A Running List of Contracts
          
          A better approach is to transform our variable into a list or an array of Simple Storage Contracts. This way, whenever a contract is created, it gets added to our list. Renaming the new list as `listOfSimpleStorageContracts` gives us a dynamic array for contract storage.
          
          ```dart
           SimpleStorage[] public listOfSimpleStorageContracts;
          ```
          
          Now, whenever a new contract is deployed, it gets pushed to this dynamic array.
          
          ```js
          function createSimpleStorageContract() public {
                  SimpleStorage simpleStorageContractVariable = new SimpleStorage();
                  listOfSimpleStorageContracts.push(simpleStorageContractVariable);
              }
          ```
          
          Once compiled and deployed you will be able to interact with the contract like so:
          
          ```js
          StorageFactory storageFactory = new StorageFactory();
          storageFactory.createSimpleStorageContract();
          ```
          
          On the deployed contract, you should be able to access `listOfSimpleStorageContracts` which now has a `uint256` input allowing you to choose the index of the variable to interact with.
          
          
          ### Interacting with Smart Contracts
          
          Our `StorageFactory` contract can be considered as the manager of all the Simple Storage Contracts. Up next, we'll discuss how our `StorageFactory` contract can call the `store` function of the simple storage that it deploys. To make this happen, we create a function called SF Store.
          
          ```js
          function sfStore(uint _simpleStorageIndex, uint _simpleStorageNumber) public {...}
          ```
          
          Whenever you interact with another contract, you need two things – an address and the ABI (Application Binary Interface). A simple rule of thumb to remember is ABI and address are key for contract interaction. The ABI works like a user manual, guiding code interaction with other contracts.
          
          If you go to Solidity's compile tab and scroll down, you will find a button to copy the ABI to clipboard. This ABI provides compilation details and helps define how to interact with the contract.
          
          Essentially, the buttons you see upon deploying a contract are the same as the ones you see inside the ABI. The presence and quantity of buttons is determined by the ABI.
          
          <img src="/solidity/remix/lesson-3/interacting/interacting-contract1.png" style="width: 100%; height: auto;">
          
          
          In our case, the ABI is automatically known to the compiler because the compiler generates it for Solidity. We also know the address because we have a list of all of them. Now, with the ABI and the address at our disposal, we can interact with other contracts with ease.
          
          Let's use the `SFstore` function to store a new number on one of those simple storage contracts using the index in our array:
          
          ```js
          listOfSimpleStorageContracts[_simpleStorageIndex].store(
                      _simpleStorageNumber
                  );
          ```
          
          It is also possible to retrieve the stored value from our Simple Storage contract:
          
          ```js
          function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
                  // return SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).retrieve();
                  return listOfSimpleStorageContracts[_simpleStorageIndex].retrieve();
              }
          ```
          
          After compiling these newly added features and deploying the contract, you will be able to interact with your contract in the expected manner:
          
          
          
          In conclusion, we have built a contract `StorageFactory` that creates `SimpleStorage` contracts and allows for interaction (saving and retrieving data) with these contracts. As a final touch, we can simplify the `SfGet` and `sfStore` functions as below:
          
          ```js
           function sfStore(
                  uint256 _simpleStorageIndex,
                  uint256 _simpleStorageNumber
              ) public {
                  
                  listOfSimpleStorageContracts[_simpleStorageIndex].store(
                      _simpleStorageNumber
                  );
              }
          ```
          
          By leveraging the capacities of the Solidity language, we can construct and manage a dynamic array of contracts, and interact with them seamlessly. Keep exploring and happy coding!
          
          <img src="/solidity/remix/lesson-3/interacting/interacting-contract2.png" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: f8e837c4-c9c8-4a26-925a-f82d341ea7e4
        title: "Inheritance in Solidity"
        slug: inheritance-in-solidity-smart-contracts
        duration: 7
        video_url: "ITGrwcwBZxmpF7JKMXbww4I9qLQDWoaBSfcfnCMDLAw"
        raw_markdown_url: "/routes/solidity/2-storage-factory/7-inheritance-in-solidity/+page.md"
        description: |-
                    An introduction to inheritance and overriding in Solidity, showcasing how to extend the functionality of a contract without duplicating it. The lesson involves creating a new contract 'addFiveStorage.sol' that inherits from 'SimpleStorage.sol' and overrides its functions.
        markdown_content: |-
          ---
          title: Inheritance in Solidity
          ---
          
          
          
          
          In past lessons, we have been using a simple storage contract designed to store a user's favorite number. While we understand that it's amazing, what if we want to expand its functionality a bit?
          
          Suppose we want our contract to not only store users favorite numbers but also to add five to each favorite number stored. We could duplicate the entire contract and make changes to the new version, but as an efficient programmer, I'd say we should look for a smarter way to achieve this functionality.
          
          In this blog, we are going to get introduced to inheritance and overriding in Solidity — two concepts that offer cleaner, clearer, and more reusable code.
          
          Let's create a new file for our enhanced contract and label it `addFiveStorage.sol`. We will again include the [SPDX license identifier](https://spdx.org/licenses/MIT.html) and specify the Solidity version.
          
          A typical new contract would look like this:
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          contract AddFiveStorage {}
          ```
          
          ### Leveraging Inheritance
          
          As much as we are tempted to copy-paste all of our prior contract's content into the new `addFiveStorage.sol`, we will resist the temptation. This is where inheritance comes into play.
          
          Inheritance allows `AddFiveStorage` contract to be a child contract of the `SimpleStorage` contract. Hence, `AddFiveStorage` will be able to perform all tasks performed by `SimpleStorage` and even more.
          
          First, we import `SimpleStorage.sol` into `addFiveStorage.sol` using Solidity's named imports:
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          import "./SimpleStorage.sol";
          
          contract AddFiveStorage is SimpleStorage {}
          ```
          
          The `is` keyword indicates inheritance, demonstrating the relationship between `AddFiveStorage` and `SimpleStorage`. After successful compilation and deployment, you will notice that `AddFiveStorage` has the same buttons as `SimpleStorage` because it inherited all of `SimpleStorage`'s functionality.
          
          ### Implementing Overriding
          
          Overriding allows us to customize functions in `AddFiveStorage.sol` that have already been defined in `SimpleStorage.sol`.
          
          Take a look at the following code snippet:
          
          ```js
          function store(uint256 _newFavNumber) public {}
          ```
          
          If we attempt to compile this, an error will occur saying there is an overriding function without an override specifier.
          
          > *Type error: Overriding function is missing "override" specifier.*
          
          To resolve this, add the `override` keyword:
          
          ```js
          function store(uint256 _newFavNumber) public override {// function body}
          ```
          
          Yet, another error will pop up:
          
          > *CompileError: Trying to override a non-virtual function.*
          
          To solve this, we will have to mark the `store` function in `SimpleStorage.sol` as `virtual`, allowing it to be overridable:
          
          ```js
          function store(uint256 favNumber) public virtual {// function body}
          ```
          
          Now back to `AddFiveStorage.sol`, let's add our preferred functionality to the `store` function:
          
          ```js
          function store(uint256 _newFavNumber) public override {
              favoriteNumber = _newFavNumber + 5;
              }
          ```
          
          So, we have used inheritance to adopt code from the `SimpleStorage` contract, and we have overridden the `store` function to customize its functionality.
          
          
          ### Wrapping Up
          
          After deploying your new contract and attempting to store the number `2`, you will find that the stored number, upon retrieving, will be `7`. This confirms that our `store` function in `AddFiveStorage` contract is overriding the `store` in `SimpleStorage` as is adding `5` to each number stored.
          
          As demonstrated in this lesson, taking advantage of inheritance and overriding not only simplifies our work but also harnesses the power of OOP in Solidity. Happy coding!
      -
        type: new_lesson
        enabled: true
        id: 87b15470-d532-41fc-93e6-05277b0a79b1
        title: "Sections summary and recap"
        slug: summary-and-recap
        duration: 2
        video_url: "utS4t02WF004mvL6fUU9lXJ1w3wOYEio2l5C005TTD4BhY"
        raw_markdown_url: "/routes/solidity/2-storage-factory/8-summary-and-recap/+page.md"
        description: |-
                    A summary and recap of the lessons covering deploying contracts using the 'new' keyword, importing contracts, named imports, interacting with contracts using ABI, and contract inheritance in Solidity. The lesson celebrates progress made and encourages continued learning.
        markdown_content: |-
          ---
          title: Summary and Recap
          ---
          
          
          
          
          ## Deploying contracts using new keyword
          
          One of the initial things we explored is how to deploy contracts from other contracts using the `new` keyword. Solidity enables us to clone existing contracts and produce new ones on the fly. This feature allows developers to deploy multiple instances of a contract without manually copy-pasting code – a handy tool, particularly for applications with multiple contract instances.
          
          ## Importing other contracts
          
          Beyond deploying contracts from within contracts, Solidity also equips us with the capability to import other contracts. Essentially, importing contracts is equivalent to copying and pasting the code into a file. This feature enhances reusability and modularity of code. A sample of importing contracts can be represented as:
          
          ```js
          import './myOtherContract.sol';
          ```
          
          ## Named Imports
          
          In the journey of mastering Solidity, we also encountered the nifty concept of 'Named Imports'. Named imports can help make your code more organized and easier to read. They're going to elevate your coding game and make you shine among other Solidity devs out there.
          
          ```js
          import { Contract as MyContract } from './myOtherContract.sol';
          ```
          
          ## Interacting with contracts
          
          Solidity enables interaction with other contracts, given that we have the contract's address and its Application Binary Interface (ABI). In our tutorial, we realized that the `simple storage` type conveniently provides both the address and the ABI, simplifying our interaction with it.
          
          ```js
          SimpleStorage storage = SimpleStorage(address);
          uint256 storedData = storage.retrieve();
          ```
          
          As of now, we haven't delved too much regarding ABIs. However, in subsequent sections, we will explore more about ABIs
          
          ## Contract Inheritance
          
          Solidity also offers a powerful feature in the form of contract inheritance. If you want to create a child contract and inherit the features of another contract, import the parent contract and use the `is` keyword.
          
          To override a function of the base class, the `override` keyword is used. But the base (parent) class must tag the function we want to override with the `virtual` keyword. The syntax can be represented as below:
          
          ```js
          import './BaseContract.sol';
          contract ChildContract is BaseContract {
              function foo() public override { Override functionality here}
              }
          ```
          
          
          
          ### Celebrating Progress
          
          And that's it! You've made it to the end of this section. By now, you've acquired some potent capabilities in Solidity. So take a moment to give yourself a resounding pat on the back! Embrace a well-deserved break because taking mental pauses is good for your cognitive health. Go for a walk, indulge in a cup of coffee or some ice cream, or better yet, share your achievements with your friends be it in person or across the world via social media.
          
          Remember, each stride you make in mastering Solidity is a significant one. So be sure to celebrate these crucial little wins that keep you excited and fuel your curiosity.
          
          Keep learning, keep coding, and above all, keep pushing the boundaries.
          
          *Congratulations! You have successfully completed Lesson 3 of the Solidity Course.*
    type: new_section
    enabled: true
  -
    title: "Fund Me"
    slug: fund-me
    lessons:
      -
        type: new_lesson
        enabled: true
        id: 972a84be-9bff-4730-8c17-3a75979eeef1
        title: "Fund me introduction"
        slug: fund-me-intro
        duration: 4
        video_url: "A49NlkiPpsO02KKDZkBu00ytxHf4EqRgavkNBTVbIFBcw"
        raw_markdown_url: "/routes/solidity/3-fund-me/1-fund-me-intro/+page.md"
        description: |-
                    Introduction to decentralized crowdfunding contract 'FundMe.sol', allowing users to send native blockchain cryptocurrency, with the owner being able to withdraw the funds. The lesson covers deploying on a testnet and handling transactions in Ethereum, Polygon, or Avalanche.
        markdown_content: |-
          ---
          title: Introduction
          ---
          
          *Follow along the course with this video.*
          
          
          
          
          Hello everyone, I’m glad to have you back with us for Lesson 4 in our Web3 Development series. This time we’re diving headfirst into **FundMe.sol**, our very own decentralized crowdfunding contract.
          
          ## Breaking Down The Contracts
          
          In this lesson, we'll be creating one main contract - **FundMe.sol**. However, we'll also use another file called **PriceConverter.sol** which we will discuss later.
          
          <img src="/solidity/remix/lesson-4/introduction/intro-fundme1.png" style="width: 100%; height: auto;">
          
          Our **FundMe contract** is a perfect example of a crowdfunded project. Think of it as your very own decentralized `Kickstarter`, where users can send any native blockchain cryptocurrency. It allows the owner of the contract to withdraw all the funds collected for their new project. It is designed so that it can be deployed on a **testnet**. 
          
          
          <img src="/solidity/remix/lesson-4/introduction/intro-fundme2.png" style="width: 100%; height: auto;">
          
          
          Once deployed, you will see a set of buttons along with a new **red button** named **Fund**. The red button is a giveaway that the function is payable where you can send native Ethereum, Polygon, Avalanche, or any other native blockchain currency.
          
          
          **Remember**: Fund function is payable. You can send native Ethereum, Polygon, Avalanche, or any other native blockchain currency.
          
          To transfer funds, navigate to the **value section** of the contract user interface then hit **'Fund'**. Following this, your connected wallet (e.g., Metamask) will open for you to confirm the transaction. During this transaction, the contract balance in the functional section will show zero until the fund transfer process completes.
          
          Once the transaction has completed, the contract balance will update to display the transferred amount. The contract owner can then withdraw the funds.
          
          ### Practically Speaking....
          
          We can go through the process using 0.1 ether as an example. After input the amount to be sent, and hit the `fund` button, confirm the transaction using my connected wallet (in this case, MetaMask), and the balance of the contract will show as zero. After a while, once the transaction has been completed, we will see a balance of 0.1 ETH appearing on Etherscan and Remix. The slight delay merely reflects transaction processing times.
          
          Following this, we can give permission to the contract owner to withdraw the funds. Since in this case, we are also the owner of the contract, the balance will be transferred back into our account. The balance can also be returned to MetaMask if kept open for long enough. 
           
          ## Wrapping Up 
          
          And that's it! Once you complete this section, you would have grasped most of the fundamentals of working with Solidity! So keep watching this lesson chapters and get learn how to implement this `FundMe` contract yourself step by step.
          
          Be sure to write down any questions you may have and direct them towards our GitHub discussions thread.
          
          Ready to get started? Let's jump back in!
      -
        type: new_lesson
        enabled: true
        id: dab8c9d9-9cde-4765-96f1-2f6f09a744c0
        title: "Project setup"
        slug: setup
        duration: 2
        video_url: "01z3qi17GtxPd4p400rqz3l9ImptmZ8SJ4DAVCa3tCND00"
        raw_markdown_url: "/routes/solidity/3-fund-me/2-setup/+page.md"
        description: |-
                    This lesson guides through the initial steps in coding the 'FundMe' contract, which allows users to send funds and an owner to withdraw them. It involves setting up the Remix IDE workspace, outlining the contract functions, and focusing on the 'fund' function.
        markdown_content: |-
          ---
          title: Project Set up
          ---
          *Follow along this chapter with the video bellow*
          
          
          
          On this chapter, we are going to delve into the heart of the Ethereum Blockchain - smart contracts. We'll start to code 'FundMe.' It will be a simple contract that allows users to send funds into it, and later, an owner can withdraw the funds from it. But you already know that, let's start by cleaning up our Remix IDE workspace.
          
          ### **1. Preparing our Remix IDE workspace**
          
          Open your [Remix IDE](https://remix.ethereum.org/) and delete all preexisting contracts to start afresh. You might find contracts named simple storage, add five extra, storage factory, etc., from our previous lesson posts. Just right-click each one and select 'delete.' Make sure your workspace is clear before moving to the next step. Also, you can just create a new workspace and leave the previous contracts for reference purposes. Remember tough that if you delete the cookies and history on your browser, you will lose all your previous work.
          
          
          Now let's get down to business and start creating our contract. You can name it 'FundMe.' A valuable tip for any coding process is to first write down what you want your code to achieve in plain English.
          
          For our 'FundMe' contract, we primarily want it to perform three tasks:
          
          1. **Allow users to send funds into the contract:** A standard function in any fundraising platform; users should be able to donate funds into the 'FundMe' contract.
          2. **Enable withdrawal of funds by the contract owner:** The contract owner, or whoever has control over the 'FundMe' contract, should be able to withdraw the accumulated funds.
          3. **Set a minimum funding value in USD:** There should be a lower limit for donations to prevent negligible amounts—e.g., a penny.
          
          Now, armed with these guidelines, we'll start building the contract. Start by declaring the SPDX license identifier and the solidity version:
          
          ```js
          // SPDX-License-Identifier: MIT
          pragma solidity ^0.8.18;
          contract FundMe {}
          ```
          
          ### **3. Outlining the Contract Functions**
          
          Before diving into the nitty-gritty of our code, let's lay down the functions we aim to implement for our contract functionality. Two primary functions will form the backbone of our 'FundMe' contract:
          
          1. **`fund`:** This function will facilitate the donation of funds into the contract by users.
          2. **`withdraw`:** This function will enable the contract owner to extract the funds that have been donated.
          
          These functions will represent the main interaction points with our contract. We may add more features later, but for now, we'll establish these two at the core of our contract.
          
          But coding everything at once can be overwhelming, especially for large projects. Thus, best practice dictates that we comment out the `withdraw` function and pay singular attention to building the `fund` function.
          
          ```js
          contract FundMe {
              // users will use this function to send funds into our contract
              function fund() public {code here}
              // Function for owner to withdraw funds
              /*function withdraw() public {// code for the `withdraw` function will go here}*/}
          ```
          
          That's all for this post. Join us in the next one as we delve into crafting the `fund` function and give life to our 'FundMe' contract.
          
          <img src="/solidity/remix/lesson-4/setup/setup1.png" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: 43475ec4-ae9d-465f-b8dc-b45353801e56
        title: "Sending ETH through a function"
        slug: sending-eth-through-a-function
        duration: 5
        video_url: "YHJ01O14lGvDu8Qw012PoLh2jr8PSxwfPnPYsHEd9VInw"
        raw_markdown_url: "/routes/solidity/3-fund-me/3-sending-eth-through-a-function/+page.md"
        description: |-
                    This chapter explains how to create a function in a smart contract that requires a minimum amount of Ethereum (ETH) to be sent
        markdown_content: |-
          ---
          title: Sending ETH trough a function
          ---
          
          *Follow along this chapter with the video bellow*
          
          
          
          
          In this chapter, we'll explore how to establish a mechanism that enables users to send Ethereum (ETH) to a smart contract. Specifically, we'll create a function that requires a minimum amount of ETH.
          
          ## How Does the Transaction Work?
          
          When a transaction on the blockchain occurs, a value field is always populated. This field represents the quantity of native blockchain cryptocurrency sent in each transaction. For instance, when the value field in a transaction between our accounts was populated through MetaMask, it indicated the amount of ETH being transferred.
          
          
          ## Enabling Our Function to Accept Cryptocurrency
          
          For our function to be able to receive the native blockchain currency, we need to make the function 「payable」. In Solidity, this is accomplished using the keyword `payable`. This keyword turns the function red in the Remix UI, signifying that it can accept cryptocurrency.
          
          ```js
          function fund() public payable{...}
          ```
          
          ## Holding Funds in Contract
          
          Just as wallets hold funds, contracts can serve a similar role. Following deployment, a contract behaves almost identically to a wallet address. It can receive funds, interact with them, and as seen in our demo, the contract can amass a balance akin to a wallet.
          
          <img src="/solidity/remix/lesson-4/transact/transact1.png" style="width: 100%; height: auto;">
          
          
          ## Transaction Value - The Message Value
          
          The value amount of a transaction can be accessed using the `message value` global in Solidity.
          
          ```javascript
          msg.value
          ```
          
          This represents the number of 'wei' sent with the message. Here, 'wei' is the smallest denomination of ETH.
          
          ## Implementing Requirements for Transactions
          
          To enforce a minimum threshold of one ether sent via our function, we can utilize the `require` keyword.
          
          ```javascript
          require(msg.value > 1 ether);
          ```
          
          This essentially ensures that the transaction only proceeds if at least one ether is contained within the value field. If the requirement isn’t met, the transaction reverts.
          
          Should we wish to offer more context to the user, we can supplement the require statement with a custom error message.
          
          ```javascript
          require(msg.value > 1 ether, "Didn't send enough ETH");
          ```
          
          An online tool like [Ethconverter](https://eth-converter.com/) can be useful for converting between ether, wei, and Gwei (another denomination of ether).
          
          ## Reverting Transactions
          
          If a user attempts to send less than the required amount, the transaction will fail and a message will be displayed. For instance, if a user attempts to send 1000 wei, which is significantly less than one ether `(1 x 10^18 wei)`, the transaction will not proceed.
          
          To demonstrate this, see the example below where the user is attempting to send `3000000` wei:
          
          <img src="/solidity/remix/lesson-4/transact/transact2.png" style="width: 100%; height: auto;">
          
          As you can see, the require statement has the power to control the behavior of the transaction. If the condition set is not satisfied, it reverts the transaction with the provided error message. This guarantees our contract gets the minimum amount of ETH required.
          
          By understanding how to enforce payment requirements, you gain more control over the behavior and security of your contracts. Continue exploring Solidity's capabilities to build amazing Smart Contract, let's continue with the next lesson.
      -
        type: new_lesson
        enabled: true
        id: 265a0fdd-801d-46cd-bc4b-c1fb65468812
        title: "Solidity reverts"
        slug: solidity-reverts
        duration: 4
        video_url: "01l85yffFPNlmNuAFbI7afHdYp2JafpvMUG9aYI9uvV00"
        raw_markdown_url: "/routes/solidity/3-fund-me/4-solidity-reverts/+page.md"
        description: |-
                    The lesson focuses on understanding 'reverts' and 'gas' in Ethereum transactions. It covers the concept of reverting transactions, checking gas usage, and how gas is used and refunded in failed transactions. The lesson also explores transaction fields and gas limits.
        markdown_content: |-
          ---
          title: Solidity Reverts and Gas
          ---
          
          *Follow along this chapter with the video bellow*
          
          
          
          <!-- <img src="/solidity/remix/lesson-4/transact/transact2.png" style="width: 100%; height: auto;"> -->
          
          
          # Understanding Reverts and Gas in Ethereum Blockchain
          
          In this lesson will emphasize **reverts** and how **gas** works in transactions.
          
          ## What is a Revert?
          
          Reverts can at times be confusing and appear tricky. A revert, in essence, undoes previous actions, sending back the remaining gas associated with that transaction. But what does this mean in context?
          
          Let's illustrate this with an example using our `FundMe` contract. Here's some code to start with:
          
          ```javascript
              uint256 public myValue;
              myValue = 1;
              function fund() public {
                  myValue = myValue + 2;
              }
          ```
          
          In our `fund` function, we increase `myValue` by two each time it executes successfully. However, if we encounter a revert statement, the previous action (where we added two to `myValue`) is undone and `myValue` is reset to its original state.
          
          <img src="/solidity/remix/lesson-4/reverts/revert1.png" style="width: 100%; height: auto;">
          
          
          This means that if the transaction reverts, `myValue` returns to its previous value (in this case, one). Although technically, the line `myValue = myValue + 2;` was executed, the reverting line following it ensures this change never gets confirmed.
          
          ## Checking the Gas Usage
          
          Now arises an important question – will the gas used in the transaction be refunded if my transaction didn't go through because it reverted? Unfortunately, no. If a transaction fails, you still consume the gas because computers executed the code before the transaction reverting.
          
          
          Users, however, can specify how much gas they're willing to allocate to a transaction. For instance, if a function contained lines of computation after the `require` line, a significant quantity of gas would be needed to operate and run this function. However, if a revert is encountered midway, the unused gas is refunded to whoever initiated the transaction.
          
          Here's a simple rule of thumb:
          
          <img src="/solidity/remix/lesson-4/reverts/revert2.png" style="width: 100%; height: auto;">
          
          ## A Look at Transaction Fields
          
          <img src="/solidity/remix/lesson-4/reverts/revert3.png" style="width: 100%; height: auto;">
          
          
          Every transaction includes specific fields, such as nonce (transaction count for the account), gas price, gas limit (seen on Etherscan), the recipient's address, the transaction value, and data. The data field holds the function call or contract deployment information. These transactions also include cryptographic elements in the V, R, and S fields.
          
          If sending value, the gas limit is typically set to 21,000, the data field remains empty, and the recipient's address is filled in.
          
          
          <img src="/solidity/remix/lesson-4/reverts/revert4.png" style="width: 100%; height: auto;">
          
          
          In the Remix Ethereum IDE, values can be set in Wei, Gwei or Ether units. Each Ether is worth `1,000,000,000,000,000,000` Wei or `1,000,000,000` Gwei.
          
          ## Conclusion
          
          While reverts and gas may seem tricky and can at times be confusing, they help uphold the integrity of the blockchain and its state.In sum, reverts validate integrity by reversing transactions when failures occur. Gas powers transactions, running the EVM, and even when transactions fail, the gas used is not recoverable. To manage this, Ethereum allows users to set the maximum amount of gas they're willing to use for transactions.
          
          Let's keep learning with the next lesson!
      -
        type: new_lesson
        enabled: true
        id: 0640be76-d633-468b-b959-feb7ad8e9be9
        title: "Intro to oracles - getting real world price data"
        slug: real-world-price-data
        duration: 15
        video_url: "kKcW3F00nT5GAXrw00VQWL00uEfXdORQGgPneUqu00uGDw8"
        raw_markdown_url: "/routes/solidity/3-fund-me/5-real-world-price-data/+page.md"
        description: |-
                    This lesson introduces the concept of decentralized oracles and Chainlink for getting real-world price data into smart contracts. It explains how to update contracts for currency conversion, use Chainlink data feeds, and discusses Chainlink's role in blockchain oracles.
        markdown_content: |-
          ---
          title: Real World Price Data
          ---
          
          *Follow along this chapter with the video bellow*
          
          
          
          
          With the advancement of blockchain technology and the increasing integration of decentralized finance (DeFi) platforms, the need to accommodate a range of digital currencies has exploded. Allowing users to transact in their preferred digital coinage not only enhances the user experience, but also broadens the market reach of your platform. This lesson will walk you through the steps to adding currency conversion features and setting price thresholds in your smart contracts with Chainlink Oracle, a decentralized network for external data.
          
          <img src="/solidity/remix/lesson-4/datafeeds/datafeed1.png" style="width: 100%; height: auto;">
          
          
          ## Updating Our Minimal Contract
          
          Currently, our contract is too simplified. It requires the message value to exceed one full Ethereum (ETH). If we want our users to spend a minimum of $5 instead of one ETH, we will need to update our contract. To specify this new value, add the line `uint256 minimumUSD = 5` at the top of your contract. To make this value public, replace `internal` with `public`. You can optimize this `minimumUSD` later on for a more gas-efficient contract.
          
          For the `fund` function within the contract, change the condition to check if the message value meets or exceeds `minimumUSD`. However, we face a roadblock here. The `minimumUSD` value is in USD while the message value is in terms of ETH. This is the part where we introduce *Oracles*, particularly *Chainlink*, into our code.
          
          ## Understanding Decentralized Oracles and Chainlink
          
          In the financial markets, the USD price of assets like Ethereum is externally assigned and does not originate from the blockchain technology itself. Abstracting this price information requires a bridge between the off-chain and on-chain data, which is achieved by using a *decentralized Oracle network* or an Oracle.
          
          <img src="/solidity/remix/lesson-4/datafeeds/datafeed2.png" style="width: 100%; height: auto;">
          
          
          Blockchain exists in a vacuum, ignorant of real-world data and occurrences. It doesn't inherently know the value of ETH or other external data like the weather or a random number. This limitation is due to its deterministic nature that allows all nodes to reach a consensus without diverging or causing conflicts. Attempting to introduce external and variable data or results of API calls will disrupt this consensus, resulting in what is referred to as a *smart contract connectivity issue* or *the Oracle problem*.
          
          ## Chainlink and Blockchain Oracles
          
          In order for our smart contracts to replace traditional understandings of agreement, they must be able to interact with real-world data. This is achievable with Chainlink and blockchain Oracles. A blockchain Oracle serves as a device that broadcasts off-chain data or computations to the smart contracts.
          
          It's not enough to cascade data through a centralized Oracle because that reintroduces failure point. Centralizing our data source contradicts our goal of decentralization and potentially jeopardizes the trust assumptions that are vital to the operations of blockchains. Consequently, centralized nodes make poor sources for external data or computation capacity. Chainlink provides a solution to these centralized problems.
          
          ## How Chainlink Works
          
          Chainlink is a modular, decentralized Oracle network that enables the integration of data and external computation into our smart contracts. As mentioned earlier, hybrid smart contracts are highly feature-rich and powerful applications that combine on-chain and off-chain data.
          
          With Chainlink, we discard the idea of making HTTP calls on blockchain nodes to an API endpoint. These nodes cannot make HTTP calls without breaking consensus. Instead, we assign a network of decentralized Chainlink Oracles the job of delivering data to our smart contracts.
          
          Chainlink networks offer flexibility in that they can be configured to deliver any data or execute any external computation at will. Although it requires some work to achieve this level of customization, Chainlink offers ready-made features that can be added to your smart contract applications. Let's go over these features.
          
          ## Chainlink Data Feeds
          
          Responsible for powering over $50 billion in the DeFi world, Chainlink data feeds are arguably the most utilized feature. This network of Chainlink nodes sources data from various exchanges and data providers, with each node independently evaluating the asset price.
          
          They aggregate this data and deliver it to a reference contract, price feed contract, or data contract in a single transaction. These contracts contain the pricing information that powers DeFi applications.
          
          
          
          ## Chainlink Verifiable Randomness Function (VRF)
          
          Next up is the Chainlink VRF, a solution for generating provably random numbers. This feature ensures fairness in applications, randomizing NFTs, lotteries, gaming, and more within the blockchain environment. These numbers can't be manipulated as they are determined outside of the blockchain.
          
          <img src="/solidity/remix/lesson-4/datafeeds/datafeed3.png" style="width: 100%; height: auto;">
          
          
          ## Chainlink Keepers
          
          Another great feature is Chainlink's system of keepers—nodes that listen to a registration contract for specific events. Upon detection of triggers that have been programmed into the contract, these nodes perform the intended actions.
          
          Finally, *Chainlink Functions* offer an extreme level of customization—it allows making API calls in a decentralized context. It can be used to create novel applications and is recommended for advanced users who have a deep understanding of Chainlink.
          
          ## Conclusion
          
          Integrating currency conversion and setting a price threshold in your smart contract is made easy with Chainlink. This decentralized Oracle network not only addresses the 'Oracle problem', but provides a suite of additional features for enhancing your dApp capabilities. With Chainlink, you can create a more user-friendly experience for your blockchain platform users.
          
          We look forward to seeing you unleash the true potential of your smart contracts and how to implement Chainlink in your dApps.
      -
        type: new_lesson
        enabled: true
        id: 5883e116-4ba3-4df1-8721-ebf022f9029c
        title: "Mid section recap"
        slug: mid-section-recap-fund-me
        duration: 1
        video_url: "Konn1o9302Wm02BbS2pa5ln8SCwoXxx6VxxJtfie3L3SE"
        raw_markdown_url: "/routes/solidity/3-fund-me/6-mid-lesson-recap/+page.md"
        description: |-
                    A recap of key concepts covered so far, including marking functions as payable for transactions, using 'require' statements, handling values with 'msg.value', and integrating external data using Chainlink for accurate real-world asset pricing in smart contracts.
        markdown_content: |-
          ---
          title: Mid Lesson Recap
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          <!-- <img src="/solidity/remix/lesson-4/datafeeds/datafeed3.png" style="width: 100%; height: auto;"> -->
          
          Just before we get deeper, let's do a quick review of what we have covered so far. We understand we haven't written that much code, but we've definitely gone over a ton of concepts. We've learned about native blockchain tokens such as Ethereum, as well as crucial elements to incorporate in your smart contract, like marking a function as payable whenever there is a need to receive native blockchain token in a function, among others.
          
          ## Payable and Required Statements in Smart Contract Functions
          
          In the decentralized world of blockchain, a transaction does not just occur. This is especially true when you want to force a transaction to do something specific or want it to fail under certain circumstances. One of the requirements for a function to receive a native blockchain token such as Ethereum is to mark it as payable. Here is a simple yet illustrative code showing how to make a function payable.
          
          ```js
          function deposit() public payable {
              balances[msg.sender] += msg.value;
          }
          ```
          
          The critical bit here is `payable`, which allows the function to accept Ethereum as part of the process. Remember, the function must be marked `payable` in order to receive ether in a transaction.
          
          <img src="/solidity/remix/lesson-4/midlesson/midlesson1.png" style="width: 100%; height: auto;">
          
          But what happens when you would like an operation to fail if a particular condition is not met? This is where `require` statements come in handy. For instance, when making a bank transfer, we want the operation to fail if the sender does not have enough balance. Here's an example;
          
          ```js
          function transfer(address recipient, uint amount) public {
              require(balances[msg.sender] >= amount);
              balances[msg.sender] -= amount;
              balances[recipient] += amount;
          }
          ```
          
          In this piece of code, if the condition `balances[msg.sender] >= amount` is not met, the transaction will revert. This literally means the operation undoes any work it previously did and returns the initially used gas to the user. In other words, `require` can be viewed as a gatekeeper, only allowing transactions to proceed when certain conditions are met.
          
          Moreover, obtaining values sent with a transaction is achieved via the solidity global `msg.value` property. This comes in handy when you need to handle values within a transaction context.
          
          ## Integrating External Data with Chainlink
          
          Chainlink is a revolutionary technology for getting external data and computation into our smart contracts. It provides a decentralized way of injecting data into your smart contract which is particularly useful for assets whose values change over time. For instance, if your smart contract deals with real-world assets such as stocks or commodities, obtaining real-time pricing information is crucial.
          
          This is where the Chainlink data feeds or Chainlink price feeds come in. It helps in sourcing this pricing information in a decentralized manner — hence reflecting the real-world fluctuation of asset prices in your smart contracts.
          
          <img src="/solidity/remix/lesson-4/midlesson/midlesson2.png" style="width: 100%; height: auto;">
          
          To illustrate this, let's consider that we are building a smart contract that deals with commodities like Gold. Chainlink price feeds can give real-time gold prices, allowing your smart contract to reflect the real world market prices.
          
          ```js
          import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
          contract GoldPriceContract {
              AggregatorV3Interface internal priceFeed;
              //The Chainlink price feed contract address
              constructor() public {priceFeed = AggregatorV3Interface(0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507);}
              // Get the latest gold price
              function getLatestGoldPrice() public view returns (int) {
                  (,int price,,,) = priceFeed.latestRoundData();
                  return price;
                  }
              }
          ```
          
          In this example, Chainlink feeds are used to query the latest price of Gold. It can then be used in a more complex calculation according to the logic of your contract.
          
          To summarise, Chainlink is a tool that broadens the capabilities of smart contracts by enabling access to real-world data and computations. By learning how to use it, it's easy to see that the potential applications for smart contracts are virtually limitless!
          
      -
        type: new_lesson
        enabled: true
        id: da69799d-656b-4681-85c8-1783021913cc
        title: "Solidity interfaces"
        slug: solidity-smart-contract-interfaces
        duration: 7
        video_url: "DKgXN7zDb5cqaT0102xpAWa1SbEcN7SwSGw1DsjX4OzlU"
        raw_markdown_url: "/routes/solidity/3-fund-me/7-interfaces/+page.md"
        description: |-
                    This lesson delves into using Solidity interfaces for converting Ethereum into USD and interacting with contracts. It explains how interfaces work, the importance of contract addresses and ABIs, and demonstrates interfacing with the Chainlink Aggregator V3 for price feeds.
        markdown_content: |-
          ---
          title: Interfaces
          ---
          
          *Follow along this chapter with the video bellow*
          
          
          
          
          Making transactions with Ethereum has become quite straightforward. But converting Ethereum into dollars or other currencies is where things get a little tricky. So today, we're going to take a deep dive into converting Ethereum into USD and interacting with other contracts lodged within the Ethereum blockchain.
          
          ## Converting Ethereum into USD
          
          When it comes to determining whether the amount of Ethereum sent via a transaction meets a minimum USD value (e.g., $5), the conversion from Ethereum into USD becomes necessary. This conversion requires us to identify the price of Ethereum (or any other native blockchain token we're working with) in terms of USD; after which, we apply a conversion rate to ascertain its USD equivalent.
          
          Now, let’s see how to implement these steps in code.
          
          ```js
              // Function to get the price of Ethereum in USD
              function getPrice() public {}
              // Function to convert a value based on the price
              function getConversionRate() public {}
          ```
          
          The two functions we're going to create here, `getPrice()` and `getConversionRate()`, will serve our purposes. For the time being, we're making them public so we can easily test, play with, and fine-tune them as we see fit.
          
          ## Leveraging Chainlink for Ethereum Prices
          
          Our primary source for Ethereum prices will be a Chainlink data feed. Chainlink documentation provides a basic example written in Solidity that demonstrates how to interact with their price feed. Take a look at it [here](https://docs.chain.link/docs/get-the-latest-price/).
          
          This example makes use of the `latestRoundData` function of a contract at a given address, returning a multitude of data points. However, our interest is solely in the Ethereum price for the time being.
          
          ## Interfacing with the Contract
          
          The process of interfacing with this contract (and subsequently getting the Ethereum price) requires us to know two essentials: the contract's address and its Application Binary Interface (ABI). The address is easy to access via the Chainlink documentation, specifically under the 'Price Feed Contracts' section.
          
          As noted in Chainlink's contract addresses for Ethereum (ETH), we only need to obtain the Ethereum to USD price feed (ETH/USD!). You can access it [here](https://docs.chain.link/data-feeds/price-feeds/addresses).
          
          Next, we tackle the ABI.
          
          The simplest way to obtain the ABI is by importing, compiling, and deploying the entire contract — a somewhat cumbersome method for our current task, especially considering that we don't need to comprehend the whole contract. We only need a key: what methods (functions) can be called on this contract, their inputs, whether they're payable or view functions, and other similar details.
          
          An alternate approach relies on the concept of `Interface`.
          
          ## Solidity Interface: A Mode of Interaction
          
          In Solidity, an interface essentially is a declaration of methods without implemented logic — merely a list of possible interactions with a contract. The interface allows us to call these functions on the contract without needing the contract code. If the contract is deployed, the logic is also automatically included with it.
          
          Chainlink's GitHub repository provides a detailed rundown of different contracts, and our focus is on the Aggregator V3 Interface. You can review it [here](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol). This interface is what we need to interact with the contract for our task. It contains the `getVersion()` function, among others, key for our usage.
          
          By copying the interface and employing Remix, Solidity's online compiler, we can test the `getVersion()` function. Testing on testnets can be time-consuming; hence, it is best to defer full deployment until the end.
          
          ```js
              // Copy the Aggregator V3 Interface from Chainlink's GitHub
              AggregatorV3Interface interface = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
              // Create a function to call the getVersion() function in the interface
              function getVersion() public view returns (uint256) {
                  return interface.version();
              }
          ```
          
          These code snippets allow us to interact with the Chainlink Price Feed contract and retrieve the current version.
          
          It's beneficial to remember that in the dynamic field of blockchain and Ethereum, learning is an ongoing cycle. Patience, persistence, and practice are your allies in harnessing the power of Ethereum and Solidity.
          
          Join us in exploring this exciting technology, and together, let's keep coding!
          
          <img src="/solidity/remix/lesson-4/interfaceslesson/interfaces1.png" style="width: 100%; height: auto;">
          
      -
        type: new_lesson
        enabled: true
        id: 4a672ede-7ebe-4c9f-a9b6-50c914249926
        title: "Use AI to help pt.2"
        slug: ai-help-development-part-2
        duration: 3
        video_url: "aU9o6pGYc2QCrm8KZgmTaLTfFpT3023rZsbzct01W7QAo"
        raw_markdown_url: "/routes/solidity/3-fund-me/8-ai-help-iii/+page.md"
        description: |-
                    A lesson on using AI models like ChatGPT for understanding complex programming concepts in Solidity, focusing on the function of returning values without logic defined in interfaces. It explores the interaction between functions, contracts, and addresses using AI insights.
        markdown_content: |-
          ---
          title: AI Help III
          ---
          
          *Follow along this chapter with the video bellow*
          
          
          
          In our quest for mastering the field of programming, questions and confusions are inevitable stepping stones. From deciphering the unintended consequences of a code block to understanding the intricate mechanisms behind built-in functions, every step in this journey is an opportunity to learn something new. Today, we'll discuss a common confusion that many developers stumble upon: *How does a Solidity function return a value when no logic is defined within it?*
          
          We'll simplify this problem by providing a context of the Aggregator v3 Interface and explore the interaction between the function, contract, and the address associated with it. This lesson signifies an interactive approach where we speculate, ask questions, and validate our understanding of the topic with the help of AI model Chat GPT. So, let's dive in!
          
          ## The Conundrum of the 'Get Version' Function
          
          The journey begins with an intriguing question related to the Solidity function from the Aggregator v3 Interface.
          
          Here's the question that sets the ball rolling:
          
          
          <img src="/solidity/remix/lesson-4/aihelp/ai1.png" style="width: 100%; height: auto;">
          
          
          To form a clearer picture, let's look at the code snippet in question:
          
          ```js
          function getVersion() external view returns (string memory);
          ```
          
          One of the common challenges new developers face is understanding the underlying mechanism of this 'get version' function. How is it able to return a value when there isn't any code defined in the Aggregator v3 Interface? Moreover, what makes it work when we insert an address?
          
          This is where the incredible AI model Chat GBT comes into play to help unravel the mystery.
          
          ## Insights from AI
          
          In response to the confusion at hand, our AI companion provided an enlightening explanation. According to Chat GBT v3.5,
          
          <img src="/solidity/remix/lesson-4/aihelp/ai2.png" style="width: 100%; height: auto;">
          
          
          This confirms our suspicion.
          
          <img src="/solidity/remix/lesson-4/aihelp/ai4.png" style="width: 100%; height: auto;">
          
          
          The `version` function exists within the contract that incorporates this interface. By wrappering the address with Aggregator v3 Interface, we're instructing our Solidity compiler that at this address lies the 'version' function or all the functions encompassed within the Aggregator v3 Interface. If this address lacks the 'version' function, the code would break.
          
          ## Further Clarification: What Happens If The Function Doesn't Exist?
          
          Given the proactive nature of our AI companion, it is responsible and recommended to ensure accurate responses. So, it raises the question: *What would happen if that contract address didn't have that function?*
          
          As explained by our AI:
          
          <img src="/solidity/remix/lesson-4/aihelp/ai3.png" style="width: 100%; height: auto;">
          
          What this entails is that despite not leading to a compilation error, the transaction would consequently revert if the contract address lacks a 'version' function.
          
          ## Cross-Verifying with Discussions Forum
          
          Accurate understanding is of paramount importance, and therefore, double-checking is a good practice. In such a scenario, the next step would be to validate this understanding on a discussions forum.
          
          In conclusion, this lesson elucidates the inner workings of the 'get version' function and the Aggregator v3 Interface, unravelling the hidden interactions and dependencies with the help of AI. By constantly questioning and confirming our understanding of each step, we can ensure we are on the path to mastering blockchain programming.
          
          Keep learning and we'll see you on the next lesson. Happy coding!
          
          
      -
        type: new_lesson
        enabled: true
        id: 007993d3-d26f-4bba-9f1b-86ae1ac98cf4
        title: "Importing libaries from NPM and Github"
        slug: import-libraries-smart-contracts-from-npm-github
        duration: 3
        video_url: "p500TL1PRf6ITdaP5XPEq9ZAbpfRI5RKgTK99FjVSKh00"
        raw_markdown_url: "/routes/solidity/3-fund-me/9-importing-from-npm-github/+page.md"
        description: |-
                    This chapter explores how to import libraries and interfaces directly from GitHub or NPM in Ethereum contract development. It covers the benefits of direct imports for managing interfaces, using the Chainlink AggregatorV3Interface as an example.
        markdown_content: |-
          ---
          title: Importing from NPM & GitHub
          ---
          
          *Follow along this chapter with the video bellow*
          
          *Follow along this chapter with the video bellow*
          
          
          In Ethereum contract development, we frequently need to interface with other smart contracts. This usually means importing and dealing with potentially complex and numerous interfaces which can make our contracts untidy and difficult to manage. Is there a better way to do this? Let's explore how to streamline this process in Ethereum's programming environment, the Remix IDE, using Chainlink contracts as an example.
          
          
          ### Understanding Interfaces
          
          The purpose of an interface is to specify the contract's functions and addresses that we want to use or interact with. However, managing many interfaces within our contracts can clutter our files and make working with them cumbersome.
          
          Consider using the SmartContract interface as an example:
          
          ```js
          interface SmartContract {
              function someFunction() external view returns(uint, uint);
          }
          ```
          
          In the case where we are working with a contract that isn't in our project's local directories such as SimpleStorage, we've learnt that we can easily import the contract by stating `import "./SimpleStorage.sol"` at the top of our contract file.
          
          But what if the contract you want to work with isn't locally stored in your project? Can we still import it as we did with SimpleStorage?
          
          ### Direct Imports from GitHub
          
          The good news is, contracts hosted on GitHub can be directly imported into your project. To demonstrate, let's take the example of the `AggregatorV3Interface` contract from Chainlink. We didn't create this interface, and it isn't stored locally in our project's directory.
          
          One approach could be to copy the entire code, create a new file within our project (for example, `AggregatorV3Interface.sol`), paste the copied code, and then import this file into our contract. Effective, but tedious.
          
          ```js
          import "./AggregatorV3Interface.sol";
          ```
          
          Is there a more efficient way? Let's return to the [Chainlink documentation](https://docs.chain.link/docs/using-chainlink-reference-contracts). As we scroll down, we notice an `import` statement.
          
          ```js
          import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
          ```
          
          This import command contains the path that corresponds to the `AggregatorV3Interface.sol` GitHub repository. This means we can directly import the contract from GitHub or NPM, ridding us of the need to manually copy and paste.
          
          ### Understanding the Import Method
          
          To further comprehend what this import does, let's dissect it. `@chainlink/contracts` is a package existing on NPM (Node Package Manager), it consists of different versions of combinations of code that we can download and use. This package is directly derived from Chainlink's GitHub repository. The rest of the path tells Remix specifically which file we want to import.
          
          Remix is intelligent enough to interpret this `import`, observing `@chainlink/contracts` as referring to the NPM package. Consequently, Remix downloads all the necessary code from NPM, which is essentially sourced directly from GitHub.
          
          Adding the `import` statement to our contract is, therefore, equal to copy-pasting the entire interface at the top of our contract. Simplifying our effort and reducing clutter.
          
          ```js
              pragma solidity 0.8.18;
              import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
              contract MyContract {}
          ```
          
          After adding the `import` statement, we can successfully compile the `AggregatorV3Interface` contract. Badaboom, badaboom.
          
          <img src="/solidity/remix/lesson-4/imports/imports1.png" style="width: 100%; height: auto;">
          
          Indeed, this method ensures we are following efficient development practices and keeps our code clean and manageable.
          
          ## Conclusion
          
          It's crucial to regularly wise up to new and efficient tricks to keep our code clean and easier to manage. Importing contracts directly from NPM or GitHub is one such smart method! Happy coding.
      -
        type: new_lesson
        enabled: true
        id: 1e873454-026c-446a-89d5-dc5a6267d01b
        title: "Getting real world price data from Chainlink"
        slug: getting-prices-from-chainlink
        duration: 4
        video_url: "yEBSFZZHXtAoELBOtcNipRDrmCu21DbELH6Z975KVBM"
        raw_markdown_url: "/routes/solidity/3-fund-me/10-getting-prices-from-chainlink/+page.md"
        description: |-
                    The lesson focuses on extracting real-world pricing information using the Aggregator V3 interface from Chainlink. It covers creating contract instances, summoning 'latestRoundData', dealing with decimals in Solidity, and typecasting for price and value compatibility.
        markdown_content: |-
          ---
          title: Getting Prices from Chainlink
          ---
          
          *Follow along this chapter with the video bellow*
          
          
          
          
          When it comes to blockchain development and interaction with smart contracts, JSON RPC interfaces and Application Binary Interfaces (ABIs) play an essential role. One such interface is the Aggregator V3, which provides a minimalistic ABI for developers to interact with their contracts. Today, we'll explore how to extract requested pricing information using Solidity.
          
          ## Creating a New Contract Instance
          
          The `AggregatorV3` interface encloses the prerequisites like the `latestRoundData` function which is commodious for getting the latest price.
          
          To proceed, we'll initiate declaring the `AggregatorV3` interface and creating a new variable named `priceFeed`. This variable will denote a contract instance at a specific address, which is legit for Sapolia network:
          
          ```js
              AggregatorV3Interface priceFeed = AggregatorV3Interface(/*address to your contract*/)
          
          ```
          
          The object `priceFeed` now allows us to summon the `latestRoundData` function on it.
          
          ## Summoning latestRoundData
          
          In the official documentation on GitHub, `latestRoundData` is described to return multiple results, including the last round ID, price, the time the price started on-chain, timestamp, and the round ID of the last round when the price was answered. However, we'd only be concerned with the price for now, so we'll exclude other return types:
          
          ```js
          function getLatestPrice() public view returns (int) {
              (,int price,,,) = priceFeed.latestRoundData();
              return price;
          }
          ```
          
          Here, we leave the commas to placeholders for exit variables, which we don't need.
          
          Our new function `getLatestPrice()` now extracts the latest price from the `latestRoundData()` function. This function returns the value of Ether in USD.
          
          Generally, the returned price exists as an integer since Solidity's incompatibility with decimals. This brings us to the tricky part of compatibility between `price` (a `uint256`) and `msg.value` which is an `int256`.
          
          ## Dealing with Decimals
          
          Typically, `msg.value` has 18 decimal places. This means that the `price` returned from our `latestRoundData` function isn't compatible with `msg.value`. To make them match, we simply multiply `price` by `1e10`:
          
          ```js
          return price * 1e10;
          ```
          
          There's been a little confusion here. `Price` is an `int256` and `msg.value` is a `uint256`. At this juncture, we will perform an operation known as 'typecasting' to convert the 'price' from `int256` to `uint256`.
          
          ## Typecasting in Solidity
          
          Typecasting is an operation you can use to convert one datatype into another. It's important to note that not all datatypes can be converted into one another, but for our situation, we can boldly convert an `int` to a `uint`.
          
          ```js
          return uint(price) * 1e10;
          ```
          
          So, we've managed to get the same number of decimals for both the variables, and also ensured that they're now of the same type; in other words, made them compatible for mathematical operations.
          
          Being a function that reads storage without modifying any state, our function can be made a `view` function and it should return a `uint256`:
          
          ```js
          function getLatestPrice() public view returns (uint) {
              (,int price,,,) = priceFeed.latestRoundData();
              return uint(price) * 1e10;
              }
          ```
          
          By compiling our contract now, we refactor all earlier warnings and errors.
          
          Working with Solidity can be arduous, especially since there aren't any decimal places, but practice makes perfect!
          
          <img src="/solidity/remix/lesson-4/prices/prices1.png" style="width: 100%; height: auto;">
          
          
          As long as we keep in mind the limitations of Solidity and Ethereum, we can take advantage of what they offer to create compelling smart contracts and applications. And with that, you've now learned how to make sense of `AggregatorV3Interface` to extract useful contract data. We are certain that armed with this knowledge, you can advance your smart contract development skills to greater heights.
          
          But we are just getting started. In the next lesson, we'll explore more Solidity Math, so stay tuned!
      -
        type: new_lesson
        enabled: true
        id: e82b4210-de20-4557-8924-1a21a2ded429
        title: "Solidity math"
        slug: solidity-math
        duration: 7
        video_url: "Gyv2LgnbWUWrezE9eKGQVq2e6lVfqbf9o3O233ecDVc"
        raw_markdown_url: "/routes/solidity/3-fund-me/11-more-solidity-math/+page.md"
        description: |-
                    This lesson provides insights into converting Ethereum value to USD using Solidity. It covers the implementation of 'getPrice' and 'getConversionRate' functions, understanding decimal places, value validation, and deployment on a testnet.
        markdown_content: |-
          ---
          title: More Solidity Math
          ---
          
          *Follow along this chapter with the video bellow*
          
          
          
          
          In this lesson, we're going to walk through the conversion of the Ethereum value to USD using Solidity. The purpose of this tutorial is to understand how Ethereum contract operations work, using the `getPrice` and `getConversionRate` functions.
          
          ## Settling Down with the `getPrice` Function
          
          The `getPrice` function returns the value of Ethereum in terms of USD. This value is returned as a `uint256`. Armed with this handy function, we can convert message value into dollar terms.
          
          ## Breaking Down the `getConversionRate` Function
          
          The `getConversionRate` function takes a `uint256` Ethereum (ETH) amount as input. The core objective of this function is to convert ETH into USD dollar value.
          
          
          ### Understanding the Importance of Decimal Places
          
          In Solidity, due to the lack of decimal numbers (only whole numbers work), we should always multiply before dividing. Coupled with the fact that both values have 18 decimal places, we have to divide the final calculated product by `1E18`.
          
          <img src="/solidity/remix/lesson-4/math/math1.png" style="width: 100%; height: auto;">
          
          For instance, let's put $2000 as ETH's value in dollar terms. The calculation would look like this:
          
          1. `ETH_Price`= $2000 (with 18 decimal places)
          2. Multiply ETH\_Price by 1 ETH
          3. Now we'll have an extra 36 decimal places since 1 ETH also has 18 decimal places
          4. Divide the result with `1E18`
          
          This function helps to handle the bulk of the math conversions for us. It takes our ETH amount and returns its equivalent in USD.
          
          ## Value Validation
          
          Now, if we want to magnify the application of this function, let's assume we want to check if our users are sending at least $5.
          
          ```js   
              getConversionRate(msg.value) >= Minimum_USD
              // In other terms:
              require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
          ```
          
          The value returned by `getConversionRate` function are calculated in 18 decimal places, so our $5 threshold would be `5E18` or `5*1E18`.
          
          ## Deployment to the Testnet
          
          Let's say we deploy this to a testnet. After a long pause, we get our deployed contract. Using the `getPrice` function, we would get the current value of Ethereum.
          
          Now, if we try to add $5 to the fund, we'll probably get an error saying,
          
          ```js
          Gas estimation failed. Error execution reverted, didn't send enough ETH.
          ```
          <img src="/solidity/remix/lesson-4/math/math2.png" style="width: 100%; height: auto;">
          
          
          This error is triggered when the amount in ETH is less than our $5 benchmark.
          
          
          But if we attempt to fund with at least $5 worth of ETH,
          
          Our transaction gets through probably and shows no sign of the previous gas error.
          
          ## Wrapping Up
          
          Solidity is a powerful language for writing smart contracts, and the ability to convert Ethereum into USD is a fundamental task.
          
          As it stands, the `getConversionRate` function is working effectively in routing transactions worth less than $5 and ratifying ones equivalent to or more than $5 worth of ETH.
          
          In our future lessons, the focus will be on withdrawal functions and contract interactions using Solidity. But for now, it's time to move forward!
          
          <img src="/solidity/remix/lesson-4/math/math3.png" style="width: 100%; height: auto;">
          
          
          Happy Coding!
          
      -
        type: new_lesson
        enabled: true
        id: eb82b3ce-5af7-4f79-9fe5-1004776159e0
        title: "Msg sender explained"
        slug: solidity-msg-sender
        duration: 2
        video_url: "FlrqCT8YNodzU2jTzYuRtV5POuxwoJAX007iMDAPPWVA"
        raw_markdown_url: "/routes/solidity/3-fund-me/12-msg-sender/+page.md"
        description: |-
                    The lesson introduces the use of Solidity's global variables, arrays, and mappings to track users sending money to a contract. It covers creating a mechanism to record addresses and amounts sent by users using 'msg.sender' and mappings.
        markdown_content: |-
          ---
          title: Message Sender (msg.sender)
          ---
          
          *Follow along this chapter with the video bellow*
          
          
          
          
          As you continue to dive deeper into the world of Solidity, you may find yourself wondering: "How can I keep track of users sending money within a contract?" and "How can I easily look up how much each user has spent?" In today's lesson, we'll walk through how to achieve this using Solidity's global variables, arrays, and mappings.
          
          ## What are we doing next?
          
          The first task at hand is to create a mechanism within the contract that keeps track of the users (addresses) who send money to the contract. For this purpose, we will create an array of addresses. The array will constantly be updated depending on who sends us money.
          
          ```js
          address[] public funders;
          ```
          
          Note that the array is `public`. Meaning, it is accessible to anyone who interacts with the contract.
          
          We will then update this array whenever money is incoming. Let's indicate this action by adding:
          
          ```js
          funders.push(msg.sender);
          ```
          
          The `msg.sender` global variable is a key feature in Solidity. It refers to the address that initiates a transaction (i.e., the sender of the transaction). In essence, we're saying "whenever someone sends us money, add their address to the `funders` array".
          
          <img src="/solidity/remix/lesson-4/sender/sender1.png" style="width: 100%; height: auto;">
          
          
          ## Mapping addresses to their funds
          
          Let's take this a step further and also associate the address of each funder to the amount sent using mappings.
          
          This mapping will make it easier to look up the total amount each user has sent quick and easy. Let’s denote a mapping within Solidity as:
          
          ```js
          mapping (address => uint256) public addressToAmountFunded;
          ```
          
          In Solidity, we now also have the capability to name the types in your mapping which adds clarity to our code. Here's an example:
          
          ```js
          mapping (address => uint256 funderMappedToAmountFunded) public addressToAmountFunded;
          ```
          
          In this line of code, the variable name `addressToAmountFunded` is highly explicit and self-explanatory. It adds what is commonly referred to as "syntactic sugar," making it easier to read what the mapping is about.
          
          Finally, let’s complete this mapping by adding the amount the user sends to their total funds.
          
          ```js
          addressToAmountFunded[msg.sender] += msg.value;
          ```
          
          ## What Have We Achieved?
          
          <img src="/solidity/remix/lesson-4/sender/sender2.png" style="width: 100%; height: auto;">
          
          We now have a way to keep track of funders sending money to our contract and to easily determine how much they've sent in total. This knowledge will aid in designing more complex contracts in the future, as well as creating a more intuitive and user-friendly blockchain experience.
          
          Be sure to join us for our next tutorial to further your understanding of Solidity and blockchain!
          
          
      -
        type: new_lesson
        enabled: true
        id: abed0d0d-602d-46bc-a9ad-f1df9e6c42f6
        title: "Quick section recap"
        slug: quick-recap-fund-me
        duration: 1
        video_url: "Ci36Of4FIrBkZPPsMIfnpDjv00uSseDgJh35U5rqAFog"
        raw_markdown_url: "/routes/solidity/3-fund-me/13-quick-recap-ii/+page.md"
        description: |-
                    A comprehensive refresher on key concepts in Advanced Solidity, covering contract addresses and ABIs, interfacing with contracts, using Chainlink Price Feeds, handling decimals and global units in Solidity, and the importance of these elements in smart contract development.
        markdown_content: |-
          ---
          title: Quick Recap II
          ---
          
          *Follow along this chapter with the video bellow*
          
          
          
          # Advanced Solidity: A Comprehensive Refresher
          
          Hey you, welcome back! Having ventured into the depths of Advanced Solidity, We are sure you have been inundated with loads of information, from compiler instructions to price feeds. Let's re-trace our learning path and perform a detailed recap of what we've tackled so far. Remember, every move in the arduous world of Solidity programming counts.
          
          ## Starting With a Contract: Address and Abi
          
          The bedrock of any smart contract is the `address` and `Abi` (Application Binary Interface.) Remember, to interact with any contract, you need these two elements ideally. In the most straightforward terms, an `address` is similar to a house number that helps identify the specific contract in the blockchain universe. The `Abi`, on the other hand, is a manual revealing how the contract can be used.
          
          ```js
              // In JavaScript
              let contractAddress = "0x....";
              let contractAbi = [...];
          ```
          
          <img src="/solidity/remix/lesson-4/recap/recap1.png" style="width: 100%; height: auto;">
          
          ## Interfacing with the Contract
          
          To get the Abi easily and subsequently interact with another contract, you need to compile an interface. This is a critical step, akin to building a radio set that helps you tune into the contract's frequency. Combining the contract `address` with the interface essentially streamlines calling on the contract's functions.
          
          
          ## Linking Up: Using Chainlink Price Feeds
          
          In our sturdy armor of Solidity programming, [Chainlink Price Feeds](https://docs.chain.link/docs/using-chainlink-reference-contracts/) are the trusty sword. They provide an efficient way to access real-world data, particularly **pricing data**, and inject it into our smart contracts – a process that's as seamless as sipping coffee while going through the morning news!
          
          <img src="/solidity/remix/lesson-4/recap/recap2.png" style="width: 100%; height: auto;">
          
          
          ## Making Math Work in the EVM
          
          When it comes to working with mathematics in Solidity and the Ethereum Virtual Machine (EVM) in general, decimals are a no-go zone - they just don't play well in here. So, make sure you're always using the correct unit conversion when dealing with your contracts.
          
          
          ## Getting to Grips with Global Units in Solidity
          
          Dominated by two players: `msg.value` and `msg.sender`, globally available units in Solidity tell a lot about the transaction at hand. `msg.sender` refers to the account that started the current function call, while `msg.value` represents the number of wei sent with that particular function call.
          
          ```js
              function updateValue() public payable {
                  require(msg.value >= 1 ether, "Not enough Ether provided.");
              }
          ```
          
          <img src="/solidity/remix/lesson-4/recap/recap3.png" style="width: 100%; height: auto;">
          
          To wrap it up, I believe you now have a thorough understanding - if not a complete masterclass of what we've learned so far in Advanced Solidity. As we continue our journey, always remember that understanding and mastering the basics create a solid foundation for the complex elements to come as we further demystify Solidity!
      -
        type: new_lesson
        enabled: true
        id: e5043367-e48c-44b4-9a50-6016c9057d19
        title: "Creating your own libraries"
        slug: create-solidity-library
        duration: 5
        video_url: "ua02h028O800yic1501IYq3Rxs8UXIMZIBKK9EqD6NLJutE"
        raw_markdown_url: "/routes/solidity/3-fund-me/14-libraries/+page.md"
        description: |-
                    This lesson covers the creation and use of Solidity Libraries to streamline code and avoid redundancy. It demonstrates how to create a library, transfer functions to it, and utilize the library in contracts for efficient code management and functionality enhancement.
        markdown_content: |-
          ---
          title: Libraries
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          Ever wanted to streamline your code by getting rid of some repeated functions or routine workflows? Is it too tiresome and annoying to rewrite code snippets to maintain pricing information? Well, then, you're in the right place! In this blog post, we will discuss an efficient way to solve these problems using Solidity Libraries.
          
          Solidity Libraries are instrumental for reusing codes and adding functionality to different Solidity types. So, let's dive straight into some code and see how we can significantly refine our workflow.
          
          ## What is a Solidity Library?
          
          Solidity Libraries are similar to contracts but do not allow the declaration of any state variables and you can't send ether to them. An important point to note is that a library gets embedded into the contract if all library functions are internal. And in case any library functions are not internal, the library must be deployed and then linked before the contract is deployed.
          
          In this post, we will create a library that will allow us to work with our `getPrice`, `getConversionRate` and `getVersion` functions much more efficiently.
          
          ## Creating a New Library
          
          Begin by creating a new file called `PriceConverter.sol`. This is going to accommodate the library we desire to create and we'll call it `PriceConverter`. We kickstart by providing the SPDX license identifier and a specified compiler pragma, in our case `0.8.18`. Be careful to replace the `contract` keyword with `library`.
          
          ```js
              // SPDX-License-Identifier: MIT
              pragma solidity ^0.8.18;
              library PriceConverter {}
          ```
          
          Remember, library in Solidity won't contain any state variables and must mark all the functions as `internal`.
          
          Let's move our `getPrice`, `getConversionRate` and `getVersion` functions from the `FundMe.sol` contract to our new library. Follow the steps below:
          
          - Go to `FundMe.sol`, and copy `getPrice`, `getConversionRate` and `getVersion` functions.
          - Paste them in the `PriceConverter.sol`.
          - Import the `AggregatorV3Interface` into `PriceConverter.sol`.
          
          Now, mark all these functions as internal, and you've done setting up your library!
          
          ```js
          library PriceConverter {
              // SPDX-License-Identifier: MIT
              pragma solidity ^0.8.18;
          
              import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
          
              function getPrice() internal view returns (uint256) {
                  AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
                  (, int256 answer, , , ) = priceFeed.latestRoundData();
                  return uint256(answer * 10000000000);
              }
          
          
              function getConversionRate(
                  uint256 ethAmount
              ) internal view returns (uint256) {
                  uint256 ethPrice = getPrice();
                  uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
                  return ethAmountInUsd;
              }
          }
          ```
          
          ## Make your library functionalities accessible in contract
          
          To use the library functions in your contract, import the library in your contract and attach it to the desired type. Here, we attach the library to `uint256` as follows:
          
          ```javascript
          import "./PriceConverter.sol";
          using PriceConverter for uint256;
          ```
          
          Now, these library functions act as if they belonged to the `uint256` type. Even though you're not passing any variables in `getPrice()` and `getVersion()` functions, the value will still pass on and get ignored.
          
          Calling the `getConversionRate()` function now looks like this:
          
          ```javascript
          uint256 conversionRate = msg.value.getConversionRate();
          ```
          
          Here, `msg.value`, which is a `uint256` type, has been enhanced to include the `getConversionRate()` function. The `msg.value` gets passed as the first argument to the function.
          
          For more than one argument, the additional arguments will be passed after the first argument as demonstrated below:
          
          ```javascript
          uint256 result = msg.value.getConversionRate(123);
          ```
          
          Here `123` will be passed as the second `uint256` argument in the function.
          
          ## Final Thoughts
          
          Congrats on creating your very first Solidity Library! Now, you can handle even complicated pricing details effortlessly! This process saves time and reduces the redundancy of code reuse across the project. It also helps to provide more clarity to the code by encapsulating some functionalities away from the smart contract.
          
          In conclusion, Solidity libraries are a great way to enhance your contracts with additional functionalities, thereby contributing to more robust and cleanly written smart contracts. Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: b9897219-bdc3-4e41-b7fd-0d02708bafaa
        title: "Using Safemath"
        slug: safemath
        duration: 6
        video_url: "tjsmSlrZgcVBEB02c4tXeCYnSqgetvH3EyIyDMp9bkmY"
        raw_markdown_url: "/routes/solidity/3-fund-me/15-safemath/+page.md"
        description: |-
                    An introduction to the SafeMath library in Solidity, explaining its significance before Solidity 0.8 and the reasons for its reduced usage post Solidity 0.8. The lesson covers integer overflow issues and the implementation of automatic checks in newer Solidity versions.
        markdown_content: |-
          ---
          title: SafeMath
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          ## Introduction to SafeMath Library
          
          The world of Solidity is rich with various libraries designed to make your smart contract development journey smoother. However, there's this one library that has gained notoriety in the Solidity community – `SafeMath.sol`. Whether you are a seasoned Solidity engineer or just starting, you'd likely encounter SafeMath in your interaction with the Ethereum world. But, as with most software components, libraries evolve with time. Let's explore what `SafeMath.sol` used to be, and why its usage has decreased.
          
          <img src="/solidity/remix/lesson-4/safemath/safemath1.png" style="width: 100%; height: auto;">
          
          ## Understanding SafeMath Library
          
          `SafeMath.sol` was a staple in Solidity contracts before version 0.8. However, its usage has dropped significantly. So, if it was once popular, why did developers stop using it? What exactly changed? Let's examine what `SafeMath.sol` was designed to manage.
          
          First, let's create a new file called `SafeMathTester.sol` and explore this library in action.
          
          ```javascript
          // SafeMathTester.sol
          pragma solidity ^0.6.0;
          contract SafeMathTester {
              uint8 public bigNumber = 255;
              function add() public {
                  bigNumber = bigNumber + 1;
                 }
          }
          ```
          
          Here, we use the version `0.6.0` of Solidity. The `SafeMathTester` contract has a `uint8` data type `bigNumber` with the maximum capacity of `255`.
          
          After deploying this contract to a JavaScript Virtual Machine (JVM) or even a test network, invoking the `bigNumber` function will return `255` (its initial value), as anticipated. Interestingly, invoking the `add` function (which adds `1` to `bigNumber`) returns `0` when queried again, not `256` as one might expect. What's going on?
          
          Before the 0.8 version of Solidity, signed and unsigned integers were unchecked, meaning that if your calculations exceeded the numerical limit of the variable type, it would wrap around to the lower limit. This pattern is known as integer overflow and it’s exactly what SafeMath library was designed to prevent.
          
          ## Addressing Integer Overflow with SafeMath.sol
          
          SafeMath.sol provided a mechanism to halt transactions upon reaching the maximum limit of a `uint256` or `int256` data type. It was a typical security measure and a convention across contracts to avoid erroneous calculations and potential exploits.
          
          ```javascript
          function add(uint a, uint b) public pure returns (uint) {
              uint c = a + b;
              require(c >= a, "SafeMath: addition overflow");
              return c;
          }
          ```
          
          In the above example, through `require` statements, `SafeMath.sol` ensures the result of the addition operation always equals or exceeds the first operand. This approach effectively prevents an overflow.
          
          However, the SafeMath library is less common in newer versions of Solidity. Why?
          
          ## Changes in Solidity 0.8 and the Decline of SafeMath.sol
          
          With the introduction of Solidity version 0.8, automatic checks for overflows and underflows were implemented, making SafeMath less essential.
          
          ```javascript
          // SafeMathTester.sol
          pragma solidity ^0.8.0;
          contract SafeMathTester {
              uint8 public bigNumber = 255;
              function add() public {
                  bigNumber = bigNumber + 1;
              }
          }
          ```
          
          In the `SafeMathTester.sol` contract, if we deploy this to a JavaScript VM using Solidity `0.8.0`, invoking the `add` function will cause a transaction to fail, whereas, in older versions, it would have reset back to zero. The introduction of this automatic check in Solidity `0.8.0` effectively rendered the `SafeMath.sol` library redundant for overflow and underflow checking.
          
          However, for scenarios where mathematical operations are known not to exceed a variable's limit, Solidity introduced the `unchecked` construct to make code more gas-efficient. Wrapping the addition operation with `unchecked` will bypass overflow and underflow checks and revert back to the old behavior, where exceeding the limit wraps the value to zero.
          
          ```javascript
          uint8 public bigNumber = 255;
              function add() public {
                  unchecked {bigNumber = bigNumber + 1;
              }
          }
          ```
          
          It's important to note that unchecked blocks should be used with caution as they reintroduce the chance for overflows and underflows to occur.
          
          ## Conclusion
          
          The evolution of Solidity and `SafeMath.sol` illustrates the continuous advancements in Smart Contract development on Ethereum. While `SafeMath.sol` has become less essential with recent updates, it is still a critical piece of Ethereum's history, and understanding it gives us a broader perspective of Solidity's progress. In our daily work, we can now focus our efforts on using the latest features like the Price Converter library in our newly created FundMe contract.
          
          By constantly learning and adapting to new changes, we can make the most of the versatile, yet intricate world of Solidity development.
          Keep learning and we will see you on the next chapter!
          
      -
        type: new_lesson
        enabled: true
        id: ac452aa0-0d21-468f-b1b6-aafa7cd7a811
        title: "Solidity for Loop"
        slug: solidity-for-loop
        duration: 5
        video_url: "mM02BhICwDRJUEM02IO4K68gK9BDx7iYGUABJ7UoxeTKQ"
        raw_markdown_url: "/routes/solidity/3-fund-me/16-for-loop/+page.md"
        description: |-
                    This lesson teaches the concept of for loops in Solidity, demonstrating how they can be used to access and manipulate arrays. It focuses on practical applications in a smart contract, particularly for iterating over arrays and resetting mappings.
        markdown_content: |-
          ---
          title: For Loop
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          Hey there, awesome learners! In the previous lesson, we've managed to get the basics of the math for our `FundMe` contract. Up to now, people can send us money and we keep track of them - a crucial foundation for our contract. Now, we are ready to move to the next step of our project: withdrawing the accumulated funds. After withdrawing, we'll also reset all the mappings back to zero. We'll accomplish this using a concept known as a for loop.
          
          ## Understanding for Loops
          
          In many programming languages, you'll encounter the concept of a for loop. Essentially, a for loop enables us to loop through a list or execute a block of code a designated number of times.
          
          For instance, consider this list:
          
          ```js
          List_Example = [1, 2, 3, 4];
          ```
          
          The elements of the list are the numbers 1 through 4, with indices ranging from 0 through 3; i.e., 1 is at the 0th index, 2 is at the first index, and so forth.
          
          To access all the elements in this list, we would loop from 0 to 3. You can identify elements via their indexes.
          
          This looping process uses the `for` keyword. A typical `for` loop structure in programming languages can initialize at some starting index, iterate until an end index, and increment by certain steps. For instance, starting at index 0, ending at index 10, and incrementing by 1 each time would get you:
          
          ```
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
          ```
          
          However, starting at the 3rd index, ending at the 12th index, and incrementing by 2 each time would get you:
          
          ```
          3, 5, 7, 9, 11
          ```
          
          In this process, we can capture the essence of the `for` loop: repeat a set of actions for a determined sequence of values.
          
          ## Using for Loops in Solidity: Fund Me Contract
          
          Let us implement this concept in our project.
          
          ```js
          uint256 funderIndex;
          for(funderIndex = 0; funderIndex < funders.length; funderIndex++) {
              address funder = funders[funderIndex];
              addressToAmountFunded[funder] = 0;
              }
          ```
          
          Let's dissect this block of code. The loop begins at the 0th index and traverses through the `funders` array until it reaches the final element. With each iteration, it accesses the `funderAddress` at the current index and then resets the corresponding funding amount in the `addressToAmountFunded` mapping to zero, effectively clearing the record of the associated donation.
          
          <img src="/solidity/remix/lesson-4/forloop/forloop1.png" style="width: 100%; height: auto;">
          
          Additionally, we have used two shortcuts in our code.
          
          1. `funderIndex++`: Instead of writing `funderIndex = funderIndex + 1`, we can use the `++` operator to simplify the increment by one within the loop.
          2. `+=`: Another handy shorthand is `+=`, used when you want to add something to an existing value. Instead of writing `x = x + y`, you can write `x += y`.
          
          Let's summarize the for loop process in our case. We start from `funderIndex` 0, get the address of the funder at the 0th position in our funder array, and set the amount they funded to zero in our mapping. After that, we increment `funderIndex` by 1 and check whether it is still less than the total number of funders. We then get the address of the funder at the first position, again set their funding amount to zero, and continue this process until `funderIndex` equals the total number of funders.
          
          With our `withdraw` function, we can now access and withdraw the money our contract has raised. Once we've withdrawn the money, we clear all previous records and ready ourselves for new transactions. This gives us a clean slate, symbolising the precise management of funds in our financing smart contract.
          
          This is just an illustration of how important and useful loops can be in programming and development of smart contracts. Indeed, familiarity with loops is a crucial aspect of becoming a competent developer - they help us write clean, efficient, and repetitive code blocks.
          
          Stay tuned for more updates on our developing smart contract!
          
      -
        type: new_lesson
        enabled: true
        id: 82088b31-f119-4d15-b2ec-f6fa644e626f
        title: "Resetting an Array"
        slug: solidity-reset-an-array
        duration: 2
        video_url: "yPI5eLPwMwpmvXdLc01IW7o1i5jKVNed5WpMco5zKIf8"
        raw_markdown_url: "/routes/solidity/3-fund-me/17-resetting-an-array/+page.md"
        description: |-
                    A guide on effectively resetting arrays in Solidity, particularly within the context of smart contracts. The lesson addresses the importance of resetting arrays for managing and updating contract states, and demonstrates the process using practical examples.
        markdown_content: |-
          ---
          title: Resetting an Array
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          In the previous lesson on smart contracts in Ethereum, we discussed how to handle value funds and introduced the `mapping` keyword with Ethereum's Solidity. In this stage of our course, our main focus will be on how to reset an array effectively and to withdraw funds appropriately from our smart contract.
          
          Now, you might remember that we have two overdue tasks from our last session:
          
          1. Resetting the array
          2. Withdrawing the funds
          
          Let's get started by tackling these one by one.
          
          ## Resetting the Array
          
          We have previously learned that one can accumulate value in the `msg.value` function with a fund function and then subsequently reset the funders array. For this purpose, we can adopt the same tactic we previously employed with 'mapping'; accessing and resetting each single address at each index.
          
          However, there also exists a simpler solution: let's just recreate the whole funders array anew! Here's how you can do that:
          
          ```js
          funders = new address[](0);
          ```
          
          The `new` keyword, you may recall, we used in a different context within our last course - deploying a contract. Its use here, however, is to reset the `funders` array. This equates to initializing a brand-new, blank address array.
          
          I want to take a moment here to remind you that this particular use might initially seem perplexing. Nonetheless, it is crucial not to let it deter your learning progress.
          
          <img src="/solidity/remix/lesson-4/arrays/arrays1.png" style="width: 100%; height: auto;">
          
          Now that we successfully reset the array, our next step would be to handle the fund withdrawal from the contract.
          
          ## Withdrawing the Funds
          
          For this section, I would refer back to a course we had done previously as the content to withdraw funds aligns precisely with this function. If you need a refresher.
          
          Remember, even if we're dealing with a smart contract this round, the concept remains the same, even in a JavaScript runtime environment, like Remix VM.
          
          Code functionality, be it resetting arrays or withdrawing funds, may seem simple on the surface but they carry great weight in the realm of smart contracts. Remember, clarity of function and security of execution is the mantra to follow in our line of work. Remain persistent and keep exploring. Happy coding!
          
      -
        type: new_lesson
        enabled: true
        id: a87b6e64-814d-477e-bd2e-8a40c296ed3d
        title: "Sending ETH from a contract"
        slug: sending-eth-from-a-contract
        duration: 8
        video_url: "69DIUIVnKx6OBtxD00Rort008VfEPT5Nrf3lR7C004nHbw"
        raw_markdown_url: "/routes/solidity/3-fund-me/18-sending-eth-from-a-contract/+page.md"
        description: |-
                    An exploration of three methods for sending Ether from a contract in Solidity: transfer, send, and call. The lesson compares these methods, discussing their syntax, behavior, and appropriate use cases, with a focus on their gas usage and security implications.
        markdown_content: |-
          ---
          title: Transfer, Send and Call
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          One important aspect is understanding how to securely and effectively withdraw funds from a smart contract. This tutorial explores three different methods of doing this – `transfer`, `send`, and `call`. We will examine their differences, understand how each one works, and determine when to use each strategy.
          
          ## Transfer Function In Ethereum
          
          We start by discussing the `transfer` function, mostly due to its simplicity and straightforwardness. Here is a basic representation of how to use this function:
          
          ```js
          payable(msg.sender).transfer(address(this).balance);
          ```
          
          We utilize `msg.sender` which refers to the address initiating the transaction. The `transfer` function is used to send the specified amount of Ether (or the native cryptocurrency on the current blockchain).
          
          It is worth noting the necessity of converting the `msg.sender` to a payable address to facilitate the transfer. This is achieved by wrapping the `msg.sender` with the `payable` keyword.
          
          However, `transfer` has a significant limitation. It can only use up to 2300 gas and it reverts any transaction that exceeds the gas limit. When your transaction requires more gas, this function fails and reverts the transaction entirely. Additionally, [Solidity by example](https://solidity-by-example.org/sending-ether/) offers an excellent reference point for this discussion.
          
          ## Send Function
          
          Our second method is the `send` function. Syntax-wise, it is similar to `transfer`, but it has a slightly different behavior. Here is how you would write it:
          
          ```js
          bool success = payable(msg.sender).send(address(this).balance);
          equire(success, "Send failed");
          ```
          
          Similar to the `transfer` function, `send` also has a gas limit of 2300. However, instead of completely reverting the transaction, it returns a Boolean value (`true` or `false`) to indicate the success or failure of the transaction. In case of failure, the contract is still intact. It is your responsibility as a developer to ensure that errors are caught, which is the purpose of `require(success, "Send failed");`. This line of code enforces that the send operation must be successful.
          
          ## Call Function
          
          Finally, the `call` function is the most flexible and powerful of the three. It can be used to call virtually any function in Ethereum without requiring the function's abi (application binary interface). More importantly, it does not have a capped gas limit. It forwards all available gas to the transaction.
          
          ```js
          (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
          require(success, "Call failed");
          ```
          
          To send funds using the `call` function, we modify our syntax slightly by including squiggly brackets `{'{'}...{'}'}`, where we can add details about the transaction, such as the value being transacted.
          
          The `call` function also returns two variables: a Boolean for success or failure, and a byte object which stores returned data if any. The code `require(success, "Call failed");` ensures that the transaction must succeed, similar to the `send` method.
          
          <img src="/solidity/remix/lesson-4/transfer/transfer1.png" style="width: 100%; height: auto;">
          
          However, understanding the difference between these three functions may be challenging initially. Don't worry! Continue experimenting and learning about lower-level functions and the concept of gas. Go back to this tutorial when you have a broader understanding of these topics.
          
          Feel free to refer to [Solidity, by example](http://solidity-by-example.org), which provides a comprehensive comparison among these three functions. To summarize, `transfer` throws errors when transactions fail and is capped at 2300 gas. `send` operates similarly but returns a Boolean value instead of reverting the entire transaction. `call`, on the other hand, forwards any available gas and is therefore not capped, returning a Boolean value similar to `send`.
          
          Hopefully, this tutorial makes it clear how to use these three functions to send and transfer Ethereum or other blockchain native currency tokens.
          
          Keep Learning and we will see you in the next chapter!
          
      -
        type: new_lesson
        enabled: true
        id: 38e91f6c-1127-4ef3-961c-ed859b75546f
        title: "Smart contract constructor"
        slug: solidity-smart-contract-constructor
        duration: 4
        video_url: "d7GLMilTvbVdyVbzzRUSq00aoOFcyPqVGyO2gxxUH02Uw"
        raw_markdown_url: "/routes/solidity/3-fund-me/19-constructor/+page.md"
        description: |-
                    This lesson focuses on using the constructor function in Solidity for role assignment, particularly for setting a contract owner. It discusses the security implications and demonstrates how to restrict certain functionalities, like fund withdrawal, to the owner.
        markdown_content: |-
          ---
          title: Constructor
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          # Solidity: Bolstering Contract Security
          
          Welcome to another exciting guide on Solidity. In this blog, we will further explore the complex, puzzling, but intriguing world of smart contracts. Our primary focus will be on securing the withdrawal functions in contracts. This effort ensures that only contract owners can withdraw funds, not just any layperson.
          
          To sweeten the deal, I'll be using the same code we used in the previous video tutorial. Thus those familiar with the old code (or those brave enough to peek at the previous guide) will be at ease. Now let's dive in!
          
          ## Addressing the Security Gap
          
          Every complex code has a potential loophole, and our contract code is no exception. In our current setup, anyone - you heard me correctly, anyone - can call the `withdraw` function and empty all the funds from the contract. Unacceptable, right? So we need to seal that loophole tightly, and the best way to do this is by restricting the withdrawal privilege to only the contract owner.
          
          <img src="/solidity/remix/lesson-4/constructor/constructor1.png" style="width: 100%; height: auto;">
          
          ## Implementing the Constructor for Role Assignment
          
          The crucial question now becomes: How can we set up this contract such that only the contract owner can call the `withdraw` function?
          
          We could try to create a function, let's name it `callMeRightAway`. This function would assign the role of contract owner to the contract's creator as soon as the contract is deployed. However, this would require two transactions. As engineers, we strive for efficiency; we need a leaner solution.
          
          Luckily for us, Solidity has a tool built for this task: the Constructor function. For those familiar with other programming languages, you'll notice the Constructor function is quite similar across the spectrum.
          
          In Solidity, creating a constructor function is straightforward:
          
          ```js
          constructor() {}
          ```
          
          Note that we don't use the `function` keyword, nor do we need the `public` keyword. Remix will even conveniently highlight it pink for us.
          
          ## Using Constructor to Assign Contract Owner
          
          Now that we have our constructor sorted out, let's discuss its functionality. The constructor function is immediately and automatically called when you deploy your contract, within the same transaction that deploys the contract.
          
          Given this attribute, we can use the constructor to set an address as the contract's owner right after the contract's deployment.
          
          ```js
          address public owner;
          constructor() {
              owner = msg.sender;
          }
          ```
          
          Here, we initiated `address public owner;` a global variable which will hold the contract owner address. Then in the constructor function, we assign `msg.sender` to the owner variable. In this context, `msg.sender` refers to the contract's deployer.
          
          ## Modifying the Withdraw Function
          
          With the contract owner now set using the `constructor`, the next step is to update the `withdraw` function, ensuring it can only be called by the owner.
          
          ```js
          function withdraw() public {
              require(msg.sender == owner, "must be owner");
          }
          ```
          
          The `require` keyword checks to ensure that the `msg.sender`, which, as we noted earlier, refers to the caller of the function, must be the owner. If the caller isn't the owner, the operation reverts with an error message "must be owner."
          
          ## Wrapping Up
          
          This modification essentially restricts the access to the `withdraw` function to the contract's owner, sealing the security loophole we identified earlier.
          
          Once you've updated your contract, you're free to deploy, test your code, and appreciate the efficiency of our new smart contract. With this, you have a more secure and efficient contract.
          
          Happy Coding!
          
      -
        type: new_lesson
        enabled: true
        id: 34ce586a-265f-4ab8-9c7f-0b4dc8fd9c72
        title: "Solidity function modifiers"
        slug: solidity-function-modifiers
        duration: 3
        video_url: "l7VMTCFgQsY7myOEW1Lgc3iIBTXQ7H7BZfIVC013qJ9k"
        raw_markdown_url: "/routes/solidity/3-fund-me/20-modifiers/+page.md"
        description: |-
                    A deep dive into the use of function modifiers in Solidity. The lesson covers how modifiers can streamline code, especially for administrative functions, and includes practical examples to illustrate the implementation and benefits of using modifiers in contracts.
        markdown_content: |-
          ---
          title: Modifiers
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          In an earlier lesson, we looked at Solidity and how to create smart contracts on the Ethereum blockchain. One of the most useful aspects of Solidity, especially when dealing with functions that should only be called by a certain administrator or contractor, are its modifiers. In this piece, we are going to dive deep into how modifiers can simplify our code and boost productivity.
          
          ## The Problem with Repeated Conditions
          
          Let's imagine we have a smart contract full of administrative functions; these functions should only be executed by the contract owner. The straightforward way to achieve this is by adding a condition to every function to check whether the caller (message sender) is the owner:
          
          ```js
          require(msg.sender == owner, "Sender is not owner");
          ```
          
          However, having to copy and paste this line of code in every function is a surefire way to clutter our contract, making it more difficult to read, maintain, and debug. What we need is a technique or tool to bundle up this common functionality and apply it to our functions when necessary. This is where Solidity's modifiers come into play.
          
          ## Introducing Solidity Modifiers
          
          A modifier in Solidity allows us to embed functionality easily and quickly within any function. They are like regular functions but are used to modify the behavior of the functions in our contract. Let’s create our first modifier.
          
          Here is how we create a modifier:
          
          ```js
          modifier onlyOwner {
              require(msg.sender == owner, "Sender is not owner");
              _;
          }
          ```
          
          **Note**: The modifier's name is 'onlyOwner', mimicking the condition it checks. There's also this weird underscore (`_`) sitting right there in our code.
          
          ### Understanding the `_` (Underscore) in Modifiers
          
          The underscore in the modifier signifies where the remaining code of our function will execute. So if you stick it right after the `require` statement, your function's logic will run only if the `require` condition is met.
          
          Here's an example of how we can apply the `onlyOwner` modifier to our contract's `withdraw` function:
          
          ```js
          function withdraw(uint amount) public onlyOwner {}
          ```
          
          Now when `withdraw` is called, the smart contract checks the `onlyOwner` modifier first. If the `require` statement in the modifier passes, the rest of the function's code is then executed. We can see how this not only streamlines our code, but also enhances visibility of function behaviours.
          
          ## The Order of Underscores in Modifiers
          
          <img src="/solidity/remix/lesson-4/modifier/modifier1.png" style="width: 100%; height: auto;">
          
          For instance, assuming that all the necessary conditions in our `onlyOwner` modifier have been met, if we had the underscore above the `require` statement, the contract executes the `withdraw` function's code first before executing the `require` statement.
          
          ## Summary
          
          In essence, modifiers offer a smart and effective way of handling preconditions in our functions, without having to repeat lines of code. Now, the next time you find yourself having to copy, paste, and check the same line of conditions in multiple functions, consider using a modifier instead- because the best developers, they never work harder, they work smarter.
          
          In upcoming lessons, we'll look into advanced modifier usages and explore more ways to optimize our smart contract code. Stay tuned!
          
      -
        type: new_lesson
        enabled: true
        id: a47d88b5-9ca7-49b4-bcde-eca953f80e67
        title: "Test the smart contract without a testnet"
        slug: testnet-demo
        duration: 6
        video_url: "wnewZ2y9H6gLCpO92kg701vJiTeUm9naFuo01k5WO97LA"
        raw_markdown_url: "/routes/solidity/3-fund-me/21-testnet-demo/+page.md"
        description: |-
                    A guide to testing Solidity contracts without deploying to a testnet, focusing on compiling, deploying, and interacting with the 'FundMe.sol' contract. The lesson includes steps for using MetaMask, tracking transactions, and ensuring successful contract interaction.
        markdown_content: |-
          ---
          title: Testnet Demo
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          In this lesson, we'll explore end-to-end testing of a Solidity contract deployment and execution without actually deploying to a testnet. However, if you wish to follow along and deploy on a testnet, feel free to do so.
          
          ## Getting Started
          
          First off, let's compile our `FundMe.sol` Solidity contract to check if our code is correct. If any contracts were deployed previously, delete them so that you can start fresh.
          
          <img src="/solidity/remix/lesson-4/testnet/testnet1.png" style="width: 100%; height: auto;">
          
          Now, set the **injected provider** to MetaMask and check if it's synced to the correct testnet. Validate that you have some ether (ETH) available in your wallet for testnet transactions.
          
          <img src="/solidity/remix/lesson-4/testnet/testnet2.png" style="width: 100%; height: auto;">
          
          ## Locating and Selecting the Contract
          
          Next, we'll navigate to our contract area to identify the correct contract we wish to deploy. If you attempt to deploy an interface, an alert message like, _"This contract might be abstract"_ will pop up. However, we'll be deploying the `FundMe` contract. Hit deploy and confirm in MetaMask.
          
          Note that the contract's deployment might take some time, which you can track in the terminal.
          
          ## Contract Interaction
          
          Upon successful deployment, you'll find several buttons to interact with your Solidity contract:
          
          - Red button for payable function `fund`
          - Orange button for non-payable withdrawing function
          - Blue buttons for `view` and `pure` functions
          
          The fund button allows us to send ETH to the contract, the `owner` of the contract is our MetaMask account since we deployed this contract. The minimum value will be set to 5 USD.
          
          You can call the `fund` function, provided you send some ETH along with it. If called without any value, you will encounter a gas estimation error, indicating insufficient ETH.
          
          ```
          Warning: The fund() function encounter a gas estimation error, hinting that you might not have sent enough ETH along with your transaction!
          ```
          
          Avoid wasting gas by cancelling the transaction and providing a sufficient amount.
          
          ## Ensuring Successful Transaction
          
          Set the amount to 0.1 ETH (or an amount equivalent to the minimum USD amount) and hit confirm on MetaMask. You can track the transaction on etherscan.
          
          Following your transaction's successful processing, you'll see the contract’s balance increase by the set value. The `funders` array will register your address, and the mapping `addressToAmountFunded` will reflect your transaction.
          
          You can check these changes in the ether scan transaction log, which will show the `fund` function call.
          
          ## Withdraw Function and Errors
          
          Next, you can initiate the `withdraw` function to reset the mapping and the array. However, keep in mind that our contract set-up only permits the owner to withdraw.
          
          If a non-owner account tries to withdraw, you will encounter another gas estimation error, indicating that the sender is not an owner. So, we revert to the owner account and initiate a successful withdrawal. Again, this can be tracked in the terminal.
          
          Upon successful withdrawal, the balance resets to zero. Additionally, the `funders` array and mapping also reset to their initial zero states. Attempting to call `addressToAmountFunded` with the same address returns zero.
          
          ## Advanced Solidity Concepts
          
          Remember, the following section explores more sophisticated attributes of Solidity. Don't worry if you find difficulty understanding it the first time. Mastery of these concepts isn't necessary to continue.
          
          You may remember that earlier editions of this tutorial deployed to the Rinkeby testnet, while latest versions encourage deployment to the Sepolia testnet or the most contemporary testnet. Alternatively, you can follow along without deploying to a testnet.
          
          In this section, we'll explore advanced Solidity pieces focused on efficient gas usage, coding practices that make your code cleaner, and improving overall coding practices. You'll want to pay close attention to these concepts if you aim to excel as an Ethereum Smart Contract coder.
          
          Always remember that when we refer to the JavaScript VM, we mean the Remix VM. Stay tuned for more fun and learning with Solidity in subsequent posts!
          
      -
        type: new_lesson
        enabled: true
        id: 10e8c090-dab6-499f-8f1e-0d3e1c4c8efb
        title: "Immutability and constants"
        slug: solidity-immutability-and-constants
        duration: 8
        video_url: "EWzhWCqphXCIMcEuMXbRhpAz8biwdh9RSKv02AUN5XfE"
        raw_markdown_url: "/routes/solidity/3-fund-me/22-immutability-and-constants/+page.md"
        description: |-
                    A tutorial on optimizing Solidity smart contracts for gas efficiency using custom errors. The lesson explains the concept of custom errors and demonstrates how to use them for efficient error handling and reverts in smart contracts.
        markdown_content: |-
          ---
          title: Immutability and Constants
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          The Solidity programming language provides tools for improving the efficiency of smart contracts. These tools can be useful when modifying existing contracts to achieve higher levels of professionalism. Although contracts might not reach an 'end to end' level of amazement, they can certainly become better. This blog post focuses on how to utilize these tools in the case of variables set only one time. We will explore this through the optimization of example variables, namely, `owner` and `minimumUSD`.
          
          ## Identifying Variables for Optimization
          
          We talk about `owner` and `minimumUSD` because once these variables are set in our contract, they never change again. Specifically, the `owner` gets set one time during our contract creation whereas the `minimumUSD` gets set one time outside of the constructor function itself. Solidity has some tools that make the process of setting these variables more gas efficient.
          
          Let's use an example contract, named `FundMe`, to illustrate this. We first compile and then deploy this contract onto a JavaScript virtual machine. Money related actions such as funding and withdrawing aren't operational since there's currently no Chainlink network on our JavaScript VM. However, that's not what we're primarily concerned with right now.
          
          ## Evaluating the FundMe Contract
          
          Our concerns are twofold:
          
          1. The amount of gas required to send the contract.
          2. The gas cost required to create the contract.
          
          To give a sense of scale, creating this contract initially costs about 859,000 gas. Throughout this lesson, we're going to learn some tricks to reduce this number.
          
          ## Implementing Tricks: Constant and Immutable
          
          The two tricks in focus today are `constant` and `immutable` keywords. The Solidity language provides these keywords to ensure that your variables remain unchanged. To understand these keywords in greater depth, consult the [Solidity documentation](https://solidity.readthedocs.io/).
          
          We can apply the `constant` keyword to a variable that we assign once outside of a function and then never change afterwards. If it's assigned at compile time, we can add the `constant` keyword. Adding the 'constant' keyword has an additional benefit in that it prevents our variable from occupying a storage slot, thus making it easier to read.
          
          ### Constant Optimization
          
          To assess the benefits of adding the 'constant' keyword, let's contrast the gas usage between both contracts. Remarkably, applying the 'constant' keyword results in a saving of approximately 19,000 gas. This reduction is of the order of the gas cost necessary to send Ethereum. However, keep in mind that naming conventions for 'constant' variables usually involve all caps with underscores (e.g. `MINIMUM_USD`).
          
          A little experiment to corroborate this: if we remove the 'constant' keyword and repeat all actions, the system indeed shows higher gas cost for non-'constant' variables. This might not make much difference in cheaper chains but for expensive chains like Ethereum, it's going to be significant.
          
          - As an aside, to convert gas cost to actual monetary terms, you can take the current gas price of Ethereum and multiply this by the cost of calling our 'minimumUSD'.
          
          <img src="/solidity/remix/lesson-4/constants/constant1.png" style="width: 100%; height: auto;">
          
          ### Immutable Optimization
          
          While 'constant' variables are assigned outside of a function, 'immutable' keyword can be used in case we want to assign a variable within a function, but only once. A good practice for specifying 'immutable' variables is prefixing the variable with 'I\_' (e.g. `i_owner`).
          
          For our 'owner' variable, we can't set it in the global scope because no function is executing there. However, in functions, there's a message sender. So, we set `i_owner` to message sender within the function. We then modify our 'Require' statement in the contract to check against `i_owner` instead of 'owner'.
          
          Comparing the gas usage after making 'owner' an 'immutable' variable, we observe savings similar to the 'constant' case.
          
          ## Wrapping up and looking forward
          
          These small gas optimization tricks will make a world of difference in running smart contracts. However, as you're learning Solidity, don't fret about making your contracts as gas efficient as possible from the get-go. As you become more seasoned and grasp Solidity efficiently, you can revisit and work on gas optimization.
          
          <img src="/solidity/remix/lesson-4/constants/constant2.png" style="width: 100%; height: auto;">
          
          Optimized contracts store variables directly into the bytecode of the contract instead of storing them inside a storage slot. The implications of this fact will unfold more clearly as you grow in your Solidity journey, so stay tuned!
          
      -
        type: new_lesson
        enabled: true
        id: 76e2a14f-a694-430a-80bb-b5189b7186ec
        title: "Creating custom errors"
        slug: solidity-custom-errors
        duration: 3
        video_url: "UI59x5fBKBH00mnEfg0213ueWQPok2xxQtMhnsHsMceFU"
        raw_markdown_url: "/routes/solidity/3-fund-me/23-custom-errors/+page.md"
        description: |-
                    A tutorial on optimizing Solidity smart contracts for gas efficiency using custom errors. The lesson explains the concept of custom errors and demonstrates how to use them for efficient error handling and reverts in smart contracts.
        markdown_content: |-
          ---
          title: Custom Errors
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          ## Optimizing Smart Contracts for Gas Efficiency Using Custom Errors
          
          Hello, everyone! It's great to have you back. In this lesson, we'll be taking strides to improve the efficiency of our smart contracts. Recently, we've emphasized making our contracts more gas-efficient. Little by little, we've introduced elements of gas efficiency — something I will be explaining further as we delve deeper into the complexities of smart contracts.
          
          For now, let's not get too bogged down in the nitty-gritty details of these gas efficiencies. If you find the details too complex, don't sweat! We will elaborate on them later.
          
          ## Existing Gas Optimizations
          
          With recent enhancements, we're able to adopt more efficient approaches with our contracts. Let's discuss our current gas optimizations and how to improve yet further.
          
          ## Enhancing Efficiency: Updating Requires
          
          One way to elevate our gas efficiency is by updating our `require` statements. As it stands, our `require` statement forces us to store this 'sender is not an owner' as a string array. When you consider how each character in this error log is stored individually, it quickly becomes apparent that the logic required to manage it all can be bulky and inefficient, especially when there is a far more gas-friendly alternative available.
          
          ## Utilize Custom Errors for Reverts
          
          Introduced with Solidity 0.8.4, we can now take advantage of custom errors for our reverts. This feature allows us to declare errors at the top of our code, and utilize `if` statements instead of `require`. All our error calls will no longer need to address the entire error message string - instead, we'll simply call the error code.
          
          Let's break this down into a practical example.
          
          Instead of using the `require` statement, we could create a custom error of our own:
          
          ```js
          error NotOwner()
          ```
          
          Please note that this definition is out of the contract's scope. With our custom error defined named 'NotOwner', we can amend our 'onlyOwner' function.
          
          Firstly, we'll replace the `require` function with an `if` statement:
          
          ```js
          if (msg.sender != I owner) {}
          ```
          
          By using the `revert` function with our newly-created 'NotOwner' error, we replace the necessity for the error string.
          
          ```js
          revert NotOwner();
          ```
          
          This strategy saves us resources as we no longer need to store or emit an extensive string, and instead, rely on the much more efficient error code.
          
          Please bear in mind, this less efficient coding style is still prevalent as custom errors are relatively new to Solidity. Hence, becoming proficient in both methods will prove beneficial.
          
          <img src="/solidity/remix/lesson-4/errors/customerrors1.png" style="width: 100%; height: auto;">
          
          While the current syntax is more abundant, I anticipate, as the shorthand syntax gains popularity, we will see a shift towards the more legible and compact style.
          
          ## The Power of Revert
          
          The "revert" keyword performs the same function as `require`, but it doesn't need a conditional statement beforehand. Therefore, it provides an efficient way to revert any transaction or function call midway through the function call.
          
          Improving our require statement is just one way to increase gas efficiency. We could convert all of our require statements to this more efficient form, but I'll leave some in their original state in this post to illustrate both methods.
          
          Stay tuned for more posts where we delve deeper into the finer details of Solidity and its best practices.
          
      -
        type: new_lesson
        enabled: true
        id: e1882df5-5415-4d86-b1d5-5aa6875f35c7
        title: "Implementing the receive fallback"
        slug: receive-fallback
        duration: 13
        video_url: "hi9h3yO003dRo7pbzK2F02i01ObtblVRcJo8gQbjDB1yys"
        raw_markdown_url: "/routes/solidity/3-fund-me/24-receive-fallback/+page.md"
        description: |-
                    This lesson covers the implementation of '_receive_' and '_fallback_' functions in Solidity. It explains their significance in handling Ether sent directly to a contract and demonstrates their practical application in a 'FundMe' contract scenario.
        markdown_content: |-
          ---
          title: Receive & Fallback
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          In Solidity, a hurdle can arise when users send Ether directly to a contract without passing through necessary function calls. This lesson provides a step-by-step guide on how to mitigate this issue using Solidity's special functions, namely `_receive_` and `_fallback_`.
          
          To illustrate, take a contract that requires funding. Without passing through the specified function calls (e.g., the "fund" function), the contract would not track the funder nor update their details. If the contract aimed to reward funders, those who funded directly, bypassing the necessary function calls, would be overlooked. This lack of tracking could be whether the user misdialed the function or did not use a tool that notifies on probable transaction failure. But there is a solution — the _receive_ and _fallback_ functions.
          
          ## Special Functions in Solidity
          
          Two special functions in Solidity allow the triggering of certain code when users send Ether directly to the contract or call non-existent functions. These are the _receive_ function and the _fallback_ function. They cannot have arguments and don't return anything, thus needing external visibility and payable state mutability.
          
          In simple terms, they are coded as follows:
          
          ```js
          receive() external payable { }
          fallback() external payable { }
          ```
          
          To experiment with this, let's create a separate contract.
          
          ```js
          //SPX-License-Identifier: MIT
          pragma solidity ^0.8.7;
          contract FallbackExample {
              uint256 public result;
              receive() external payable {
                  result = 1;
              }
          }
          ```
          
          In this contract, `result` is initialized to zero. Upon sending Ether to the contract, the `receive` function is triggered, hence `result` equals one.
          
          For an added twist, we can code the contract to call a non-existent function upon sending Ether.
          
          ```js
          fallback() external payable {result = 2;}
          ```
          
          With data in the transaction, the `receive` function isn't triggered. Instead, the contract seeks a matching function for the data input without finding one. Consequently, it defers to the `fallback` function. Hence, `result` equals two.
          
          As an aside, the `fallback` function is also triggered when a contract is called with no valid function.
          
          These two functions are brilliantly elucidated in a chart on SolidityByExample.org [here](https://solidity-by-example.org/fallback/).
          
          ## Application on FundMe Contract
          
          With this understanding, let's consider how to apply the special functions to our FundMe contract to ensure that every funder is tracked.
          
          ```js
          receive() external payable {
              fund();
          }
          fallback() external payable {
              fund();
          }
          ```
          
          In the event of a user sending Ether directly to the contract, instead of calling the `fund` function, the `receive` function picks it up and re-routes the transaction to `fund`.
          
          <img src="/solidity/remix/lesson-4/fallback/fallback1.png" style="width: 100%; height: auto;">
          
          Test our updated FundMe contract on Sepolia, a 'real' testnet, substituting your contract's address:
          
          Copy the contract's address and send some Ether to it via MetaMask. On confirming the transaction, we should ideally see that the 'fund' function is being called.
          
          Checking back at Remix, the `funders` array will update to reflect the successful transaction. This signifies that the `receive` function rerouted the funding to the `fund` function properly.
          
          This workaround ensures all transactions - correct or misdialed - are processed in the intended manner. Although a direct call to the `fund` function costs less gas, the user's contribution is acknowledged and credited.
          
          Thanks for reading! Keep learning and we'll see you in the next lesson.
          
      -
        type: new_lesson
        enabled: true
        id: 84d77e62-a910-4104-a981-77dbf5887722
        title: "Congratulations"
        slug: recap-congratulations-fundme
        duration: 3
        video_url: "01i3hlzOJ4XznjNg9fSHpottSOdxwnSN101EyzMUzzebU"
        raw_markdown_url: "/routes/solidity/3-fund-me/25-recap-congratulations/+page.md"
        description: |-
                    A recap of the advanced aspects of Solidity covered in previous lessons, highlighting the transition from using Remix to a code editor. The lesson congratulates learners on mastering Solidity basics and introduces upcoming advanced topics for further exploration.
        markdown_content: |-
          ---
          title: Recap & Congratulations
          ---
          
          _Follow along this chapter with the video bellow_
          
          
          
          We've ventured into the advanced realm of Solidity, and it has been an enlightening journey, to say the least. Brace yourselves, because we're about to dig deeper. However, we're not using Remix this time around. We are migrating to a code editor for a more comprehensive view and working process of Solidity. And as we transition into advanced sections, let's pat ourselves on the back for mastering the majority of Solidity basics!
          
          But do not rest on your laurels just yet, there's a whole ocean of knowledge still waiting to be explored.
          
          ## Advanced Sections of Solidity
          
          There's plenty to learn still, starting from `enums` `event_`, `try/catch` `function selectors`, and `abi encoding hashing`. It may seem daunting at first, but if you've made it this far, chances are, you can already decipher most Solidity code. Great job!
          
          But for now, let’s summarize some of the advanced aspects we've come across.
          
          ## Special Functions in Solidity
          
          In the dazzling sphere of Solidity, we have some special functions, namely `receive`, `fallback`, and `constructor`.
          
          These unique functions don't need the `function` keyword to be called.
          
          ```js
          function receive() external payable { }
          ```
          
          Both `receive` and `fallback` are unique. They come into play when data is sent through a transaction, but no function was specified. Here, the transaction will default to the fallback function, provided it exists.
          
          And, if this data is empty and there's a `receive` function, the transaction will call this function instead.
          
          ## Saving Gas with Keywords
          
          In an era of rising gas prices, Solidity offers a couple of handy keywords like `constant` and `immutable` to help you save gas.
          
          These keywords are for variables that can only be declared and updated once. A perfect example is:
          
          ```js
          uint constant minimumUSD = 50 * 1e18;
          ```
          
          In this case, `minimumUSD` can never be changed again, thus saving gas.
          
          While similar to `constant`, `immutable` differs in allowing one-time variable declaration within the `constructor`. After declaration, the variable cannot be changed.
          
          Attempts to update either `constant` or `immutable` variables will be met with compiler errors explicitly stating they cannot be written to.
          
          ## Sending Ether with Remix
          
          Remix provides a simple way to send Ether to a contract on the JavaScript virtual machine. Simply deploy the contract, then press the `transact` button without any call data while updating the transaction's value. A lack of call data will trigger the `receive` function (if it exists); otherwise it will set off the `fallback` function.
          
          <img src="/solidity/remix/lesson-4/end/recapend.png" style="width: 100%; height: auto;">
          
          As we delve deeper into the advanced features of Solidity, there's much more to explore. Here's to unraveling the ins and outs of Solidity, and celebrating more milestones together on our coding journey!
          
          Congratulations again for making it this far! You're doing great!
          
    type: new_section
    enabled: true
  -
    title: "AI Prompting"
    slug: ai-prompting
    lessons:
      -
        type: new_lesson
        enabled: true
        id: 8bf2aad7-26e9-4950-9c37-c7991d8fd579
        title: "AI and forums"
        slug: ai-and-forums
        duration: 13
        video_url: "uUi007zUap15KAtCmh59kFbRxxcHy01RQjOxHG101VVUoA"
        raw_markdown_url: "/routes/solidity/4-ai-prompting/1-ai-and-forums/+page.md"
        description: |-
                    A lesson on using AI tools like Chat GPT, Bing's AI, and Google's BERT for debugging in software engineering. It covers the importance of understanding errors, writing clear instructions for AI, and the limitations of AI in debugging. The lesson also emphasizes the significance of documentation and online forums for resolving coding issues.
        markdown_content: |-
          ---
          title: AI prompting and Forums
          ---
          
          _Follow along the course with this video._
          
          The barrier for entry into the world of software and blockchain engineering is smaller than ever. Inevitably we're going to run into problems while coding and knowing where and how to find solutions is an extremely valuable skill.
          
          Here are the exact 6 steps to solve any problem you may face.
          
          1. Tinker
          2. Ask Your AI
          3. Read Docs
          4. Web Search
          5. Ask in a Forum
          6. Ask on the Support Forum or GitHub
          7. Iterate
          
          Lets go through them.
          
          ### Tinker
          
          Pinpoint your error, review your code manually making small adjustments you suspect may resolve the issue. Pinpointing the error in your code will help you frame your question/prompt in the next step.
          
          <img src="/solidity/ai-prompting/debug1.png" style="width: 100%; height: auto;">
          
          ### Ask Your AI
          
          There are several AI models available these days, each with their pros and cons. Here are a few to consider.
          
          - [**ChatGPT**](https://chat.openai.com) - The OG. This model offered by OpenAI is robust, multi-modal, includes code interpretion and can browse the web. The best quality unfortunately comes from the paid version.
          - [**Phind**](https://www.phind.com/search?home=true) - This is a programming focused model with intuition allowing it to proactively ask questions to clarify assumptions. Can also browse the web, and has a VS Code extension!
          - [**Copilot**](https://www.microsoft.com/en-us/edge/features/copilot?form=MA13FJ) - formerly `Bing Chat`, and not to be confused with the IDE AI assistant, Copilot is rapidly becoming Microsoft's whole ecosystem response to the age of AI
          - [**Google Bard**](https://bard.google.com/) - ehhhhh - results may vary.
          
          There are `6 principles` to prompt engineering to get the best out of your AI.
          
          - **Principle 1:** Write clear and specific instructions
          - **Principle 2:** Give as much context as possible
          - **Principle 3:** Use delimiters to clearerly indicate distinct parts of the input
          - **Principle 4:** Look out for `hallucinations`
          - **Principle 5:** Understand the limitations of the model - many have strict context token limits (though this is rapidly changing)
          - **Principle 6:** Iterate constantly
          
          > Hallucinations are when an AI provides a response that it thinks is correct, but is wrong. These can be hard to spot and require a little experience to call out.
          
          Asking questions is a skill, so keep practicing. There's a great free course at [**learn.deeplearning.ai**](https://learn.deeplearning.ai/) that can help software engineers become better prompt engineers.
          
          ### Read Docs
          
          If a problem is occuring with a particular implementation, framework, language - whatever - you can almost always read the documentation for further insight and examples of how to accomplish your goals.
          
          > You can even use AI to help you here by copying docs as context into a model like ChatGPT and asking questions to it
          
          ### Web Search
          
          Something many AIs are lacking is the ability to retrieve up to date information, or they're limited by not having access to the web. This is where good ol' fashioned web search comes in.
          
          If you're running into an issue, it's highly likely someone else has to, and search engines like Google have already indexed these questions to serve their answers to you.
          
          > Note: AI Models are advancing rapidly and many models as of Dec 2023 also include web search.
          
          ### Ask in a Forum
          
          Sometimes the information we need just isn't out there and we're forced to interact with _human beings_
          
          We always want to ask our questions in a web-indexed forum which will allow search engines and future AI models to index this new information. A few examples are:
          
          - [**Ethereum Stack Exchange**](https://ethereum.stackexchange.com/) - a community-driven question-and-answer platform dedicated to Ethereum, and blockchain technology
          - [**Stack Overflow**](https://stackoverflow.com/) - online platform that facilitates knowledge exchange and problem-solving within the global programming and software development community
          - [**Peerhana**](https://peeranha.io) - Peeranha is a decentralized knowledge sharing platform built on web3 technology, particularly blockchain
          - [**Reddit**](https://www.reddit.com/) - Reddit is a widely popular and diverse social media platform that serves as a hub for online communities, discussions, and content sharing
          
          Questions asked on Discord and Twitter are likely to get buried in their conversational chaos and will never be indexed, so use these avenues sparingly.
          
          > The super secret alpha is to post your question on a forum like Stack Exchange, then link to that question in your Discord message!
          
          Always remember to format your questions using markdown when appropriate.
          
          ### Ask on the Support GitHub or Forum
          
          If the tool you're using isn't open source - maybe reconsider how necessary it is! Haha
          
          Open source projects on GitHub allow people to submit improvements and raise issues, this is how we improve our code.
          
          ### Iterate
          
          Repeat the above steps again and again.
          
          ### General Tips
          
          The above are a number of effective steps to overcome issues you'll have while learning. Here are a few additional general tips to keep in mind:
          
          1. **Limit self-triage to 15/20 minutes** - don't force yourself to struggle through solving an issue alone. There are countless tools available to assist in focusing on where the error is and how to solve it
          2. **Don't be afraid to ask AI, but don't skip learning** - AI is going to `hallucinate` it's going to get things wrong. It's only by learning and understanding the underlying concepts that someone will be able to spot these errors and inconsistencies
          3. **Use the Forums!!!** - Asking questions in the GitHub discussions and on forums is a great way to find support - and helping others with their problems is a great way to reinforce what you've learnt
          4. **Google the exact error** - A problem you're having is likely to have been faced by someone else. Leverage search engines to find past solutions
          5. **Make Accounts on Stack Exchange and Peeranha** - These communities are invaluable to assist with Web3 software engineering and coding problems. Use them.
          6. **Post Issues on GitHub/Git** - Interacting with the community is an integral part of the Web3 and software development communities. Open source projects allow the submission of `Issues` and `Pull Requests` on GitHub. Be respectful, but if you're unable to find answers, or believe you're hitting a bug in a protocol - creating issues is a great way to bring these problems to a project's attention.
          
          > Be sure to search for already open issues before submitting a new one to an open source project
          
          If you don't have any experience with GitHub, don't worry. Our next lesson will be going over the set up of an account to get you started.
          
          And, as ChatGPT would say "Keep hopping through the code, and until next time, stay ribbeting, my fellow blockchaineers!" 🤦‍♂️😬
          
      -
        type: new_lesson
        enabled: true
        id: fa0c07d3-1169-49e7-ab1e-761b2d8645d8
        title: "Setting up Github"
        slug: setting-up-github
        duration: 2
        video_url: "Sy8tjlB6ifXrZx8016dcGuzw4fifUguJJhlU02fpdiARQ"
        raw_markdown_url: "/routes/solidity/4-ai-prompting/2-setting-up-github/+page.md"
        description: |-
                    This lesson guides through the process of setting up a GitHub account, emphasizing its importance in the software development community. It discusses how to ask well-crafted questions on GitHub to engage effectively with the coding community and get helpful responses.
        markdown_content: |-
          ---
          title: Setting up GitHub
          ---
          
          _Follow along the course with this video._
          
          ---
          
          Here I'm going to walk you through the creation of a GitHub account.
          
          Asking well-formatted, articulate questions greatly enhances your chances of receiving prompt and effective answers. Many times, these communities are comprised of people who answer queries simply out of goodwill and a shared passion for the knowledge involved. Therefore, make sure your questions are well-crafted to do justice to their time and effort!
          
          <img src="/solidity/ai-prompting/github1.png" style="width: 100%; height: auto;">
          
          A key platform to engage with these communities is GitHub. If you haven't already, now's the perfect time to activate an account. Don't skip ahead, this is imperative. Let's get started.
          
          ### **Step 1: Signing Up for GitHub**
          
          GitHub is the go-to platform for developers. It offers a manageable approach to maintaining code repositories and facilitates collaborative coding and issue resolution. Setting up an account on GitHub is pretty straightforward. If you haven't already done this, you will need an email to get started.
          
          <img src="/solidity/ai-prompting/github3.png" style="width: 100%; height: auto;">
          
          To sign up for GitHub, just click on "Sign up" and enter your valid email address.
          
          <img src="/solidity/ai-prompting/github4.png" style="width: 100%; height: auto;">
          
          ## **Step 2: Account Creation**
          
          Click on "Create account". After registering your email on GitHub, you will receive an email with a launch code. Provide this to GitHub and answer a few preliminary questions.
          
          When prompted, choose the free version.
          
          <img src="/solidity/ai-prompting/github5.png" style="width: 100%; height: auto;">
          
          And voila! You've created your GitHub profile.
          
          <img src="/solidity/ai-prompting/github6.png" style="width: 100%; height: auto;">
          
          ### **Moving Forward: Asking 'Great' Questions**
          
          The following lesson is going to have a focus on question formatting. In order to get timely responses in communities like GitHub you need to be considerate of the questions you're asking and how you're asking them.
          
          Don't skip the next lesson!
          
      -
        type: new_lesson
        enabled: true
        id: 199491e0-daaa-45e2-ac0a-d4ad722e07aa
        title: "Formatting a question"
        slug: formatting-a-question
        duration: 6
        video_url: "328fVZjDMFig701DvBAFs4yGV9INkei2huUt00kacN00b4"
        raw_markdown_url: "/routes/solidity/4-ai-prompting/3-formatting-a-question/+page.md"
        description: |-
                    A guide on how to ask effective questions in code discussions, particularly on GitHub. It covers the importance of clear, concise, and well-formatted questions, and includes tips on using markdown for code formatting and highlighting specific errors to get better responses.
        markdown_content: |-
          ---
          Formatting a Question
          ---
          
          _Follow along the course with this video._
          
          Hello, coders! In this lesson we'll be covering the importance of well crafted questions and how to properly format our inquires to give them the best chance of receiving a response.
          
          ## Creating Discussions in GitHub
          
          As practice, I want you to navigate to the [**GitHub discussions page**](https://github.com/Cyfrin/foundry-full-course-f23/discussions) for this course and try creating a discussion yourself!
          
          > Try to categorize your discussion appropriately. `General` for conversations and discussions, `QA` for questions.
          
          <img src="/solidity/ai-prompting/question1.png" style="width: 100%; height: auto;">
          
          ## The Art of Asking Questions
          
          We often come across questions that are asked in a hasty and incoherent manner. Here's an example of a poorly formatted question:
          
          ```
          "Hey why my code not be good?"
          
          quire(msg.value == entranceFee * newPlayers.length, "PuppyRaffle: Must send enough to enter raffle");
                  for (uint256 i = 0; i < newPlayers.length; i++) {
          ```
          
          We need to be clear in describing our problem, the steps we took that got us to the problem, and explicit in any errors we're receiving.
          
          A better example would be:
          
          ---
          
          "I am receiving this error when compiling.":
          
          ```bash
          TypeError: Exactly one argument expected for explicit type conversion.
          --> PriceConvertor.sol:21:43:
          |
          21|    AggregatorV3Interface priceFeed = AggregatorV3Interface()
          |
          ```
          
          Here's my code:
          
          ```js
          AggregatorV3Interface priceFeed = AggregatorV3Interface()
          ```
          
          Could someone please help me figure out what the issue is? 🙏
          
          ---
          
          Quite simply, we can take the following necessary steps while crafting our questions:
          
          1. **Describe the issue clearly and concisely** - Be clear in the problem you're facing and what steps got you there
          2. **Highlight the specific error you're experiencing** - including exact error messages can provide those helping you with valuable insight into where things went wrong
          3. **Use markdown for code formatting** - this is critical, formatting your code allows your question to be more readable and approachable for those trying to understand the problem
          4. **Share the relevant part of the code causing the issue** - only include what's relevant to your issue. Don't paste a whole contract into your question unless appropriate to do so. You can provide _too much_ information.
          
          With a well formatted question, you're going to see a much higher rate of success in receiving help from others as well as AI.
          
          > The importance of markdown formatting cannot be stressed enough. If you're unfamiliar with markdown, don't hesitate to ask an AI like ChatGPT for advice, or to format things for you.
          
          ### Wrapping Up
          
          Always remember, there are no _`bad questions`_ but there are _`poorly formatted questions`_. Make your questions count and format them appropriately.
          
          A pillar of becoming a software engineer is being involved in these communities. Jump in and participate, ask questions and meet people. Contribution is the cornerstone of open source communities. Do your best to answer as many questions as you ask, this will reinforce your knowledge.
          
          > You don't have to be an expert to help those on the journey behind you.
          
      -
        type: new_lesson
        enabled: true
        id: f5b5f8d6-59cc-45ff-8704-1cf86308b2c5
        title: "Speedrun"
        slug: speedrun
        duration: 4
        video_url: "yLfCXa3ej702tbVp2f4QlW7AVGMBtXtihXO6zpCeXZlw"
        raw_markdown_url: "/routes/solidity/4-ai-prompting/4-speedrun/+page.md"
        description: |-
                    An introduction to 'Speedrun Ethereum' by Austin Griffin, a resource for learning about Ethereum and the Ethereum Virtual Machine (EVM). The lesson covers various projects like creating NFTs, staking apps, and learning about on-chain randomness, and recommends using Scaffold ETH for practical learning.
        markdown_content: |-
          ---
          title: Speedrun Ethereum
          ---
          
          _Follow along the course with this video._
          
          ---
          
          In this section we're examining a resource that isn't explicitly part of this course but is highly useful in expanding your knowledge about Ethereum and the Ethereum Virtual Machine (EVM). This resource comes courtesy of my good friend Austin Griffin. Let's go over what it can do for you.
          
          <img src="/solidity/speedrun/speedrun1.png" style="width: 100%; height: auto;">
          
          ### Introduction to Speedrun Ethereum w/ Austin Griffin
          
          Austin Griffin, renowned for his conspicuous bow tie, is eager to help you kickstart your journey of creating on Ethereum through [**speedrunethereum.com**](https://speedrunethereum.com/). He's developed this resource to clarify the ‘HOW’ and ‘WHY’ behind Ethereum building.
          
          Through Speedrun Ethereum, you'll delve into a plethora of projects, including:
          
          - **Creating a simple Non-Fungible Token (NFT)**
          - **Constructing a decentralized staking app**
          - **Developing a token vendor**
          - **Building a Dice Game** - learning about randomness on chain
          - **Creating a Decentralized Exchange (Dex)**
          - **Contructing and using a MultiSig Wallet**
          - **SVG NFTs and on chain Data**
          
          ...and much more
          
          <img src="/solidity/speedrun/speedrun2.png" style="width: 100%; height: auto;">
          
          To take advantage of these learning opportunities, visit [Speedrunethereum.com](https://speedrunethereum.com/) and get started!
          
          ### Intro to Scaffold-ETH2
          
          Scaffold-eth-2 is a great resource for those learning Solidity and trying to visualize what their code is doing.
          
          It provides a clean front-end UI that will update dynamically with your smart contract changes, allowing you to interact with it and monitor adjustments you've made.
          
          <img src="/solidity/speedrun/speedrun3.png" style="width: 100%; height: auto;">
          
          ### Final Remarks
          
          Leverage the knowledge and resources provided by speedrun ethereum and Scaffold ETH to equip you in building innovative solutions on Ethereum. With determined effort and continuous learning, you're sure to make significant strides in the blockchain ecosystem.
          
          Happy Bow-Tie Friday, Austin.
          
          ### Congratulations!
          
          You did it. That's all for this section - you should be incredibly proud. Take a break and rest up, cause you're ready to move on to [**Foundry Fundamentals**](https://updraft.cyfrin.io/courses/foundry)!
          
    type: new_section
    enabled: true
---
