## Account Command Line Options

We are incredibly lazy and we like to work really hard to be really lazy.  So, even just adding the `--account anvil` command is very tiring for us. We don't want to have to do that. 

So what we can do, let me get rid of this. We are using a fun little `Control+W` to quickly delete it here. This is in the `networks.anvil` section of our TOML file. We can also add a default account. 

So we can say `default_account_name = "anvil1"`. In this way, now all we have to do now in our terminal is hit enter and it's going to automatically use our anvil1 account. So if we hit enter now, it says "enter your password for keystone anvil1" and we can type our password in and boom, it sends it through. 

So this way, when we use `networks.anvil`, we automatically work with our `anvil1` key. Now, like I just said, we like to work incredibly hard to be really lazy. So there is one more thing that we can do to make this command even easier to run. Right? We did `mox run deploy --network anvil`, hit Enter. We are now prompted for our password for our `anvil1` command here. 

Well, we can do one more thing. And if we go to the, we go copy and paste this into our search bar and scroll down, in here we can see there is this `unsafe_password_file` where we can add a password file that has our password for a different account. Now, it's very specifically named `unsafe_password_file` because you really don't want people getting a hold of your password file. So, you want to put it in a location outside of your project. 

So we can actually just save a password in a file and then edit it again. Where is that? That keyword here? That `unsafe_password_file`. And then, save it as a parameter in our `mocassin.toml` file. 

Now, a lot of people are going to be tempted just to, "Oh, okay cool," you know, `password.txt` paste it in here. And then you know, print it in here and then set it here. I'm going to recommend not doing that because you might accidentally go to share your project with somebody and you are like, "Oh, what's a daisy? Your password is still in your project." You know how we do all these GitHub repos, right? If you go to share your project which you should share your project, but you forget to take the password file out. uh, well, that would be pretty bad. So what might be a nicer thing to do is if you type `cd` into your terminal here. And if you do, um, `cd .mocassin`, you'll notice that you have a new file, a new folder called `.mocassin` in your home directory. Mine is obviously `users/patrick`, yours will be `users/` wherever you are. If you type `ls` in this folder, you'll see a couple of different folders in here. You'll see you have this `keystores` file and you might have some other folders and files in here as well. 

But, what might be a better thing for you to do is in this `.mocassin`, make a new directory called `unsafe_passwords`. 

```bash
mkdir unsafe_passwords
```

`cd` into this `unsafe_passwords` file and add this password into this `unsafe_passwords` folder. So, to add some text in here, what you can type is you can enter some bash text editor like `vim`, `vi` or something like that. But, I'm just going to make your life a little bit easier. We are just going to use an `echo` command here. This is a bash, this is a Linux command. If you are not familiar with how it works, this is where AIs are very helpful. Uh, if you run this command, you should definitely ask an AI what it does and how it works. But, we can run `echo` password and this little caret command here means to like dump it in. 

```bash
echo "password" > anvil1
```

Now, if we type `ls`, we have this anvil1 file in our `unsafe_passwords` folder. And if I type `cat anvil1`. `cat` is a command to help like print out whatever is in a file. I can see my password is in anvil1. So again, this, so again, this is okay for now because we are because anvil1 is a, is a dummy key right? Like, it's just comes default with anvil. But, ideally, you are not saving your passwords for actual private keys like so, but we are just doing this to make life a little bit easier for our dummy account. 

So, now, what I can do. Let me `cd` back to my directory. I'm going to `cd` to `moxcyfrindraft` and then `cd` to `moxfavoritescyfrindraft`. Okay, great. I'm now back in this directory. I'm going to hide my terminal here. Now, I can say `unsafe_password_file` = this little tilde stands for the home directory. You could also do `.` home or dollar sign home, whatever you want to do. 

```bash
unsafe_password_file = "~/.mocassin/unsafe_passwords/anvil1"
```

So now, I have a `default_account_name` and I have an `unsafe_password_file` which is going to point to this anvil1. So now let me pull up my terminal again. I'm back in my `moxfavoritescyfrindraft`. I can now do `mox run deploy --network anvil`. I will hit Enter and I don't get prompted. It automatically decrypts my anvil account using the password we gave it here. 

So very exciting here. Just by learning this you are learning much, much safer ways to work with your private keys. You just learned how to encrypt a private key using moccasin into a keystore file, then decrypt it by being prompted or using an unsafe password file. You should be incredibly excited and incredibly proud of yourself, because like I said, the year 2024, the number one attack vector was leaked private keys. So you are going to learn how to encrypt your keys and work with keys in a much safer way than the rest of the industry does. As of right now, and this is both very exciting and very sad to hear, as of right now, you are more knowledgeable than half a billion dollars worth of money in the blockchain industry because you know how to encrypt your private keys and not share them in plain text. You should be very exciting. 
