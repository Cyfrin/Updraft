## Cloning a Repo

We are going to learn how to clone a repo.

On every GitHub repo we create, we usually include an "Installation" section. This section typically includes commands like:

```bash
git clone
```

and

```bash
cd
```

Let's see what this looks like.

We will run a command in our terminal. 

Here we are in our `mox-cu` folder.

We can run the following command:

```bash
git clone https://github.com/cyfrin/mox-buy-me-a-coffee-cu cyfrin-buy-me-a-coffee-mox
```

This command will clone a repo, and we can name it something like `cyfrin-buy-me-a-coffee-mox`.

The terminal will then output a list of files that have been cloned.

We can then run the following command:

```bash
cd cyfrin-buy-me-a-coffee-mox
```

to change into the folder we just created.

We can then run the following command:

```bash
code
```

to open VS Code.

This gives us access to all of the code that is in the repo.

We can see all of the files in our explorer pane.

Now, let's go back to our terminal. We will run a few more commands here.

```bash
cd
```

This changes us back to the parent folder.

We can now change directories into the `mox-buy-me-a-coffee-cu` folder that we cloned from GitHub.

```bash
cd mox-buy-me-a-coffee-cu
```

Another command we can run in the terminal is:

```bash
git log
```

This command will display a log of all the commits to the repo.

We can see the first commit made in the terminal.

We can then make a small change in the README file. 

Let's add the following line:

```
Hello! This is a test.
```

We then save the file. 

Now, if we run the following command:

```bash
git status
```

we can see that the README file has been changed.

We can then run the following commands:

```bash
git add .
```

```bash
git status
```

This will stage the file for commit.

Next, we can commit the changes with the following command:

```bash
git commit -m 'update!'
```

We can then push the changes to the GitHub repository. 

```bash
git push
```

Now, when we go back to our GitHub repo, we can see there are two commits: our first commit and the update commit.

Sometimes, you might encounter errors when following these steps. We encourage you to work with your AI to help you solve these errors so that you can continue working with your GitHub repo.

Let's also see what this looks like on the GitHub repo. 

If we go to the repo and refresh the page, we can see the two commits we made. 

If we click on the update commit, we can see the small change we made to the README file. 

A great way to engage with the developer community is by tweeting about your work on GitHub. 

You can do this by clicking on the "Tweet Me" button, which will then send a tweet about your project to your Twitter account. 
