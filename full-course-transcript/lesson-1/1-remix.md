Now that we're getting to the coding part, I need to stress to absolutely use the GitHub repository or Web three Dev education associated with this course. If you're on the GitHub repo right now, and you scroll down to lesson two, and this is gonna look a little bit different when you come to it, you can click on the GitHub repo associated with this lesson.

This will have all the code that we're actually gonna be working with for this section, as well as a read me section, which is gonna have a lot of notes on how to actually work with the code. And instead of making issues and discussions on this repository here, if you have an issue, please use the discussions tab of the Foundry full course here, or use any of the areas that we've laid out.

In the questions section, we're gonna teach you how to ask questions so that they have the highest probability of being answered by either somebody else in the community, by an AI, or by a forum. Additionally, please be sure to check out web three dev. Do education for more information as well. I highly recommend that you pause the video right now and make accounts for first of all, GitHub, and then at least Stack Exchange Ethereum.

Additionally, chat JBT is a great resource to make an account for. Just remember that it will often get things wrong and isn't quite up to date find you don't need to make an account for, but it often gets things wrong sometimes as well. Typically, for each coding section, I'll give you a brief rundown of what we're actually gonna be building.

And in this lesson we're gonna be building this exact smart contract and we're gonna be building your first smart contract ever and we're gonna deploy it to a blockchain. At the end of this section, you are going to have deployed your first smart contract ever. So be sure to get to the end so you can deploy your first smart contract.

We're gonna be using something called an I D E called remix to deploy and interact and work with this smart contract, which is going to be very exciting. It's highly recommended to get the best experience outta. This is for you to follow along and you to code with me. You can change my speed on the YouTube video if I'm coding too fast or I'm coding too slow.

But you taking the time to write out the code as I code along with you is gonna ingrain the knowledge into your brain. Repetition is the mother of skill and I wanna make sure you come out the other side with skill. So actually code this. We're gonna be using a tool called Remix. You can either Google search it or you can just come to the GitHub repo or Web three Dev education and click this link to remix, which will pop open the remix web id.

So let's go ahead. Let's jump in and let's learn to deploy our first smart contract. At the end of this lesson, you will have deployed your first smart contract. You'll have written your first bit of Solidity, and we are very excited to get through this part.

Welcome to the remix I D E or the Integrated Development Environment. This is where we're gonna learn to write a lot of our code in the beginning. If you want, you can go ahead and accept to help out remix here. And if you've never been to the remix website before, it'll give you a tutorial walkthrough of some of the features that Remix has to offer.

For example, it has a Solidity, compiler Solidity is the programming language that we're gonna be using in this course to code our smart contracts where, and we need to compile them when we've written the solidity. We'll learn about that in a little bit. We have a tab here where we can actually deploy our contracts to a blockchain, and we have all these different folders and scripts since we can actually write.

JavaScript and TypeScript in remix as well. But don't worry about those too much for now because I'm gonna be explaining everything that we're going to do. Remix is an incredibly powerful tool because it has a lot of features that allow us to really see and visualize what our smart s do. Eventually we're going to move off of remix to a local development environment.

However, remix is a tool still used by some of the top auditors and smart contract developers in the space when they want to quickly check something out. And additionally, it's fantastic for learning the fundamentals of Solidity. The left hand side is where we're actually going to start interacting with Remix.

If we bring our mouse up to the top, this little file explorer is where we're gonna have all of our files and where we're gonna write our solidity or our smart contract code. If you want, you can leave all these folders in here, but I'm actually gonna go ahead and delete everything so that there's less for me to work with or or deal with.

So I'm just gonna go ahead and write, click and delete everything in here just so I can start completely from scratch. Again, if you want to leave all of these in here, feel free to do so. Doesn't matter, I just think it's cluttering up my mental space a little bit. Now we have a blank remix project, and the first thing that we're gonna want to do is create our first file to start writing and deploying our Solidity Smart contract.

We're gonna go ahead and click the create new file right here and type in Simple Storage. So, so tells our compiler that this is going to be a Solidity contract, a Solidity file, and we're going to be writing Solidity inside of this file, which again, solidity is the most popular smart contract programming language.

And you'll see we actually get popped up, a simple storage sole on the right hand side, which we can type in and actually write our Solidity code. Now, right below the File Explorer button is a little search icon, which allows us to search for different code in all of our contracts. So for example, if I type in Hello in here, and I copy that, paste that into the search bar and enter, we can see that it found this line.

Hello, in our Simple Storage Soul, let's go ahead and delete that. Right below that search icon is this Solidity compiler, and you'll see a bunch of different stuff pop up, which tells us about our compiler configuration, and we can see even more advanced configuration if we hit the dropdown. We're not gonna hit that for now.

Let's go ahead and double click the Solidity compiler over here so we can just see the simple storage sole. I'm also gonna click this high terminal button so that we just see our simple storage do sole. Now, the first thing that we want to do in all of our Solidity and smart contracts is write the Solidity version that we're gonna be working with.

Solidity is a constantly changing language, and we wanna be very specific about what version we're gonna be using to write our smart contract as each version does different things. To write your version, you're gonna do Pragma Solidity, and then type your version. For most of this course, we're gonna be using zero point.

Eight point point 19 as that's the most current edition of Solidity. However, getting used to working with different versions of Solidity is really good for you as you're going to be working with different versions of solidity. No matter where you go. Certain versions of Solidity are considered more stable than other versions right now.

There's a popular tool called Slither, which recommends using 0.8 0.18. So if you want to default to 0.8 0.18 for this course, feel free to do so. We're gonna be using a couple different versions as we code. So this line says we're stating our version. Now these two slashes here stand for what's called a comment in solidity, and this allows you to write anything after the two slashes.

And when we compile or run our code, it will just ignore what's in here. So we could type blah, blah, blah, whatever we want. Cats are cool and it doesn't matter. You can write anything in here. I highly recommend as we're going along, you should write comments in your own code as well for you to refer to later on.

And additionally, feel free to copy all the code that you write and paste it locally so that just in case your browser cash refreshes or something, you won't lose all the work you've done so. So before you lock off for the day, copy, paste this into a text file so that you can have it for later. But a good comment for here might be this is the version.

Now writing our version like this in Solidity tells the solidity compiler that we're only allowed to use 0.8 0.18 when compiling this. However, maybe a new version comes out and we're okay to use anything newer than this version to tell the compiler that we add this little hat, this little carrot, which says, this contract only works with 0.8 0.18 or anything greater than that.

This means 0.8 0.19 would work when 0.8 0.2 comes out, that one would work. However, 0.8 point 17 would not work if we were working with 0.8 0.18 or above. If we don't have the carrot, this tells the compiler that only 0.8 0.18 will work with this code. If we want to use solidity versions within a range, we could do something like this.

We could say we want our version to be greater than or equal to 0.8 0.18, but less than 0.9 0.0. This would tell the compiler that any version between these two is a valid version. For example, 0.9 0.1 would not work, neither would 0.9 0.0 because these are not strictly less than 0.9 0.0. Great, so now we know how to do compiler versions.

Now the next thing every smart contract needs to start with is something called the S P D X license identifier. Now, this actually isn't required by the compiler. It'll actually throw a warning if we compile and it won't error. It's fine if you don't have this. However, it's highly recommended. This is a way to make licensing and sharing code and IP.

Of your contracts a lot easier from a legal perspective, I have a link to more about how licenses work in the GitHub repo. Associated with this section of the course, m i t is known as one of the most permissive licenses. It basically means anybody can use this code and pretty much do whatever they want with it.

I wouldn't worry too much about the licenses right now, but let's actually go back to 0.8 0.19 and on the left hand side, let's scroll down to this compiler button and open this back up. Even right now, now that we don't even have any code, we can actually go ahead and compile this contract. Now you might see a red squiggly and you might see a warning here, but don't worry about that for now.

To choose our compiler version, we scroll up to this section and we can choose the compiler version that we wanna work with. Most of the time though, if you just hit Compile Simple Storage Sole, or you hit this big compile button, it'll automatically choose the version for you. For example, if I scroll down or to hit Compile, it'll automatically flip up to 0.8 0.19, and we were able to go ahead.

We were able to successfully compile this code. Now it says no contract compiled yet, because we haven't put a contract in here yet. We just put the version of Solidity that we're working with. Compiling our code means taking our human readable code and transforming it into computer readable code, which is essentially a bunch of zeros and ones, or it's bite code.

Computer code is very specific instructions for the computer to use, or in our case, the blockchain to use for our contract. We'll learn later about machine level code and OP codes and E V M codes in a much later section of this course. Additionally, you can hit command S or control S, which will also save and compile.

You'll see I kind of have a trigger finger and I will out of habit hit command S all the time because as somebody who codes a lot, I need to make sure I save all the time. Otherwise, things might not work as intended. As you saw, if we use a different version of Solidity and we hit the compile button, it'll automatically flip back.

But for example, let's say I, I wanted to use 0.8 0.7, anything greater than that, and we're on compiler, 0.8 0.19, and we hit Compile. It won't change. However, if I use something less than 0.8 0.7 and we hit Compile, it'll change because it wants to automatically select a Solidity version that is appropriate for the version that you chose.

Again, I want to use 0.8 point 18 and I'm gonna hit Compile and we're good to go. Yep. We're gonna go ahead and start writing our contract and to get the full screen view again, we just go ahead, click the Solidity compiler so that we can just see our code here. To start writing our contract, we're gonna use a keyword in Solidity called Contract.

This tells Solidity that the next piece of code is going to be the name for our contract that we're gonna create. You can think of a contract very similar to a class if you're familiar with JavaScript or Python or Java, or really any object-oriented programming, and we're gonna go ahead and give our contract a name here.

We're gonna call ours Simple Storage. And then we add this little open and closed curly braces or curly brackets. Everything inside of these curly brackets is gonna be considered part of this contract. Simple storage. Now if we hit enter, we go back to the compiler and hit compile. We can see once again this little green check mark popup.

This means our compilation has been successful. If we were to remove, for example, this curly brace and hit compile, we would see, we would get this error compilation failed with one error. And if we scroll to the bottom, it'll tell us where the error actually is and we'll get a little red popup saying what line the error is actually on.

We'll learn about debugging these errors in a little bit, but let's add the curly brace back. Go ahead, back to the compiler, compile, and we're good to go.