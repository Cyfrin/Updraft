## Getting Started: Creating Your First Noir Project with Nargo

Noir is a powerful domain-specific language designed for crafting and verifying zero-knowledge proofs. To begin your journey with Noir, you'll need its official command-line tool, `nargo`. This lesson will guide you through the process of creating a new Noir project, setting up the foundational structure for your circuits.

We'll primarily use a terminal for these operations. Ensure you have `nargo` installed and your terminal open and ready.

### Understanding `nargo init` vs. `nargo new`

Before we jump into creating a project, it's important to understand the two primary `nargo` commands for project initialization:

*   **`nargo init`**: This command initializes a new Noir project *within your current working directory*. If you already have a directory set up and want to transform it into a Noir project, `nargo init` is the command you'd use.
*   **`nargo new <project_name>`**: This command creates a new Noir project by first creating a *new directory* named after your specified `<project_name>`. The project files are then initialized within this new directory. This is generally the preferred method for starting a fresh, standalone project as it keeps your workspace organized.

For this guide, we will use `nargo new` to demonstrate a clean project setup.

### Creating a New Project with `nargo new`

Let's create our first Noir project. We'll name it `simple_circuit`.

1.  **Open your terminal.** You'll see a prompt, for example:
    ```bash
    yourusername@yourmachine current_directory %
    ```

2.  **Execute the `nargo new` command:**
    Type the following command and press Enter:
    ```bash
    nargo new simple_circuit
    ```

    *   `nargo`: Invokes the Noir package manager and build tool.
    *   `new`: The subcommand to create a new project.
    *   `simple_circuit`: The name for your new project. `nargo` will create a directory with this name.

    **A quick note on typos:** It's common to make mistakes when typing commands. For instance, if you accidentally typed `nrgo new simple_circuit` (missing the 'a'), your terminal would likely respond with an error:
    ```bash
    zsh: command not found: nrgo
    ```
    If this happens, simply correct the typo and try the command again.

3.  **Observe the output:**
    Upon successful execution, `nargo` will confirm the project creation:
    ```
    Project successfully created! It is located at /path/to/your/current_directory/simple_circuit
    ```
    The exact path will reflect your system's directory structure.

### Verifying Project Creation

To confirm that the project directory was indeed created, you can list the contents of your current directory.

1.  **Use the `ls` command (or `dir` on Windows):**
    ```bash
    ls
    ```

2.  **Check the output:**
    You should see `simple_circuit` listed among the files and directories:
    ```
    simple_circuit
    other_files_and_directories...
    ```
    This confirms that `nargo` successfully created the `simple_circuit` directory.

### Navigating into Your Project Directory

Now that your project directory exists, let's move into it to inspect its contents.

1.  **Use the `cd` (change directory) command:**
    ```bash
    cd simple_circuit
    ```
    Your terminal prompt should update to reflect that you are now inside the `simple_circuit` directory.

### Inspecting the Default Noir Project Structure

Every new Noir project created with `nargo new` comes with a standard, minimal structure. Let's see what `nargo` has set up for us.

1.  **List the contents of the `simple_circuit` directory:**
    ```bash
    ls
    ```

2.  **Examine the output:**
    You will see two items:
    ```
    Nargo.toml
    src
    ```

    Let's break down what these are:

    *   **`src/`**: This is the source directory. All your Noir code, which defines the circuits for your zero-knowledge proofs, will reside here. Typically, Noir source files have a `.nr` extension.
    *   **`Nargo.toml`**: This is the manifest file for your Noir project. It's analogous to `Cargo.toml` in Rust projects or `package.json` in Node.js projects. The `Nargo.toml` file contains crucial metadata about your project, such as its name, version, author, dependencies on other Noir libraries (crates), and compiler configurations.

You have now successfully created a new Noir project using `nargo`! This basic structure provides the foundation for you to start writing your Noir circuits and exploring the world of zero-knowledge proofs.