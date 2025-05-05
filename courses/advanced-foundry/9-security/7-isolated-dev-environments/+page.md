## Isolated Development Environments

Let’s learn about Isolated Development Environments. According to Chain Analysis, in 2024 the most popular type of attack was a private key leak. In this lesson we want to introduce to how to mitigate the risks of running malicious code on our host machine. This is important for any level of developer or security researcher. 

We will take a look at ways to protect our host machine against different attack vectors which all have one thing in common, running unvetted code on our host machine and giving it access to everything. 

The tool we are going to use to isolate the unvetted code is Docker containers or Dev containers, specifically Dev containers built directly into VS Code. The Red Guild has written an awesome blog on it which is linked in the description. 

Let’s imagine our computer has hardware, and a host operating system such as Linux, MacOS, or Windows, Inside this OS contains network, files and our applications. 

If we run a script in our host machine with `npm run`, or bash script, it has access to our network, files and applications. 

We can isolate these programs with docker containers, where we create isolated versions of stuff our actual computer has. 

Instead of a potentially unvetted program running directly on our machine, we can run it within the Docker container to mitigate risks

## Setting up a Dev Container

1. Clone the repo
2. Make sure docker is running
3. In VS Code open the command pallet and select: 
```
reopen in container
```
4. We can view that the container is running in the docker desktop app

Dev containers allow us to see a folder called `.devcontainer` which has the following: 
- `devcontainer.json`
- `dockerfile`

The dockerfile tells docker what tools to install and how to spin up a docker container. 

Our docker file for the foundry folder is set to start from a blank Linux Debian instance. Some of the tools this docker will install are ZSH, Rust, UV, some solidity tools, and foundry. 

There are workspace mount settings on the container, which tells VS Code to spin up an unmounted Docker container. This is where you must be specific with what access you give the container. To check where our directory is we can run the following command in the terminal:
```bash
pwd
```
It says we are in the `/workspaces` directory.

Inside of VSCode if we open a terminal and then run a `get clone` command on a github repository it will clone this code and run inside of the docker container. We can open this new directory with a code command:

```bash
code .
```

Here are some quick tips:

- Its always dangerous to run code you are not 100% sure of
- Running scripts in isolated environments like Docker containers can help protect against unknown malicious scripts
- There is no 100% sure way to be 100% safe

Keep these in mind to stay safe out there!