---
title: Create a new Foundry project
---

_Follow along with this video:_

---

### More setup

Make sure we are in the folder we created in the previous lesson.

**Reminder**: We ran the following commands

```
mkdir foundry-f23
cd foundry-f23
```

Now type the following commands:

```
mkdir foundry-simple-storage-f23
cd foundry-simple-storage-f23
```

You can always make the `cd` command faster by pressing the `Tab` key after you type the first couple of letters from the destination name. `Tab` lets you autocomplete a lot of commands/paths.

If you type `code .` a new instance of VS Code will open, having the `foundry-simple-storage-f23` as the default path.

You can see the contents of this folder on the left sidebar. Try the following command:

```
touch randomFile.txt
```

This will create a `randomFile.txt`

If you want to delete it type:

```
rm randomFile.txt
```

The terminal is pretty slick when it comes to moving/opening/creating directories/files, changing paths and generally running things. I recommend going through [this tutorial](https://ubuntu.com/tutorials/command-line-for-beginners#1-overview) if you want to learn how to move extra fast.

### Creating a New Project

The way you [create a new Foundry project](https://book.getfoundry.sh/projects/creating-a-new-project) is by running the `forge init` command. This will create a new Foundry project in your current working directory.

If you want Foundry to create the new project in a new folder type `forge init nameOfNewFolder`.

Keep in mind that by default `forge init` expects an empty folder. If your folder is not empty you must run `forge init --force .`

Be sure to configure your username and email if you encounter errors related to Git configuration.

```
git config --global user.email "yourEmail@provider.com"
git config --global user.name "yourUsername"
```

And that's it, your folder should look as follows:

::image{src='/foundry-simply-storage/7-create-a-new-foundry-project/Image1.PNG' style='width: 75%; height: auto;'}

**But what does all this mean?**

`lib` is the folder where all your dependencies are installed, here you'll find things like:

- `forge-std` (the forge library used for testing and scripting)
- `openzeppelin-contracts` is the most battle-tested library of smart contracts
- and many more, depending on what you need/install

`scripts` is a folder that houses all your scripts

`src` is the folder where you put all your smart contracts

`test` is the folder that houses all your tests

`foundry.toml` - gives configuration parameters for Foundry

More on these folders and files later.

Please right-click `src`, click on `New File` and name it `SimpleStorage.sol`. Copy the code available [here](https://github.com/Cyfrin/foundry-simple-storage-f23/blob/main/src/SimpleStorage.sol).

One last thing, please delete `Counter.s.sol`, `Counter.sol` and `Counter.t.sol`. These files are a set of basic smart contracts that Foundry provides as a default when you create a new Foundry project.
