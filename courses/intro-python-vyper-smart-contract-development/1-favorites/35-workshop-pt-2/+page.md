## Welcome to the Workshop: Reinforce Your Vyper Skills

Congratulations on completing Section 1: Welcome to Remix - Favorite's List! To help you solidify the concepts you've just learned, we're introducing a recurring feature called the "Workshop". You'll find a workshop section like this one at the end of every section moving forward.

The primary goal of these workshops is simple: practice. By working through targeted exercises, you'll actively apply the principles covered in the preceding lessons. This hands-on application is crucial for building proficiency. Remember, repetition is the mother of skill, and these workshops provide the perfect opportunity to drill in your learning.

## Recommended Workshop Workflow: Practice, Pause, and Proceed

To get the most out of these workshops while avoiding unnecessary frustration, we recommend the following approach, integrating tools like AI assistants (ChatGPT, Copilot, etc.) effectively:

1.  **Attempt Independently First:** Before seeking any help, dedicate focused time to solving the workshop prompts on your own. Set a timer for **25 minutes** and try your best to work through the challenges using only what you've learned so far.
2.  **Know When to Pause:** If the 25-minute timer runs out and you're still stuck on a particular prompt, **stop**. It's important not to spend excessive time feeling frustrated. Take a break, step away, and clear your head.
3.  **Seek Assistance Smartly:** *After* your break, if you still need help, leverage the available resources. This is where AI tools can be very useful; they can often provide correct solutions or point you in the right direction. Remember, there might be multiple valid ways to solve a problem. You can also:
    *   Consult the course discussion forums.
    *   Ask for guidance in the community Discord channel.
    *   Refer back to the section's code, often available in a linked GitHub repository (for this section: `https://github.com/Cyfrin/remix-favorites-cu`).

This workflow encourages genuine problem-solving effort first, then provides avenues for help, ensuring you learn effectively without getting permanently blocked.

## Workshop Prompts: Remix Favorites List (`favorites.vy`)

Based on the `favorites.vy` contract developed in the "Favorite's List" section, tackle the following three prompts. These exercises build directly on the concepts of state variables, functions, constructors, and structs.

**Prompt 1: Create an `add` Function**

*   **Task:** Define a new function within your contract named `add`.
*   **Functionality:** This function should increment the value stored in the `my_favorite_number` state variable by `1` each time it's called.
*   **Context:** Your contract likely already has a state variable like `my_favorite_number: uint256` and functions to store (`store`) and retrieve (`retrieve`) its value. You are adding a new way to *modify* this stored number.

    ```vyper
    # Example state variable declaration
    my_favorite_number: uint256

    # You will need to add a new function definition, likely similar in structure to:
    # @external
    # def add():
    #     # Your logic here to increment self.my_favorite_number
    ```

**Prompt 2: Modify the Starting Value**

*   **Task:** Change the initial value assigned to the `my_favorite_number` state variable when the contract is first deployed. Choose any value **other than `7`**.
*   **Verification:** After modifying the contract, deploy it again. Use the existing `retrieve` function (or similar) to check that `my_favorite_number` was correctly initialized with your new chosen value upon deployment.
*   **Context:** This involves editing the contract's constructor function, `__init__`.

    ```vyper
    # Find and modify the constructor function
    @deploy
    def __init__():
        # Change the value assigned here
        self.my_favorite_number = 7 # <-- Modify this line
    ```

**Prompt 3: Create and Use a New Struct (Challenge)**

This prompt is a bit more challenging and involves multiple steps:

1.  **Define a New Struct:** Using the `struct` keyword, define a completely new custom data type. You decide on the name and the fields (variables) it contains. Look at the existing `struct Person:` for inspiration if needed.

    ```vyper
    # Example of an existing struct definition
    # struct Person:
    #    favorite_number: uint256
    #    name: String[100]

    # Define your NEW struct here, e.g.:
    # struct YourStructName:
    #     field1: uint256 # Or any other type
    #     field2: bool    # Or any other type
    ```

2.  **Create a New State Variable:** Declare a new state variable within your contract whose type is the *new struct* you just defined. This variable will hold an instance of your struct on the blockchain.

    ```vyper
    # Declare a state variable of your new struct type, alongside existing ones
    # my_favorite_number: uint256
    # your_struct_instance: YourStructName # <-- Add something like this
    ```

3.  **Create a Struct-Populating Function:** Write a new function that accepts input parameters corresponding to the fields of your new struct. Inside this function, create an instance of your struct using the provided inputs and store it in the new state variable you declared in step 2.

    ```vyper
    # Example of a function signature you might create:
    # @external
    # def set_my_struct(input1: uint256, input2: bool): # Match types to your struct fields
    #    # Logic to create and save an instance of YourStructName
    #    # using input1 and input2 into self.your_struct_instance
    ```

*   **Extra Credit:** Try creating an additional function (likely a `@view` function) that allows you to retrieve and view the data currently stored in your new struct state variable.

Now, put your knowledge into practice. Do the workshop!