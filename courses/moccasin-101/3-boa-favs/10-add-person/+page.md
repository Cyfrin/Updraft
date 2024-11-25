## Titanboa Add Person

We know how to set the RPC URL, add an account, deploy a contract, interact with a contract, and then interact with the same contract later on.

Assuming that address exists. Now, luckily blockchains don't just get deleted. So, when we interact with Ethereum or ZK Sync, or like a real network. Once an address is deployed, it's there forever. So, typically we won't have to worry about running into errors like that except for when we're testing and when we're loading stuff like this.

Now let's come back over to deploy favorites. And, let's just do one more thing. So, we've been working with this store number a whole lot, right? This, if we go back to the favorites .vi, we've been working with this store function. Which is cool but, like, what about this add person? This is a little bit more complex. It takes a name and a favorite number, and the name is, like, a string array, like, what? How do How do we call this? How do we interact with this? Well let's go ahead, let's get rid of some of this store stuff here. Right? Let's not even worry about that.

Now, instead, let's now do

```bash
print "Storing a person."
```

It sounds a little weird, but, all right, sure. "Storing a person." And, we'll do

```bash
favorites contract .add person
```

Let's call this add person function which takes a name and a favorite number. So let's give it a name as a string, we'll do

```bash
"Alice"
```

and then a favorite number as

```bash
25
```

Now this is just a regular Python string, and Python strings are actually dynamic by default, whereas Vyper strings are not dynamic. So, we gave our string a maximum size of 100 characters. So if we tried to add, you know, 101 characters in here, this transaction would fail. Let's go ahead, let's test it out with just one person, and then we'll do we'll say

```bash
person data equals favorites contract . get person "Alice".
```

We can do

```bash
list of people at index 0.
```

Since Alice is the first person that we added, they should be at index 0. Then we can print it out, we can do

```bash
print f"Person: {person data}."
```

So, now back on our terminal, we have to kick up anvil again because this script is working with anvil. Let's pop open a new terminal. And, let's go ahead, let's run this. We can either, you know, do

```bash
source .env
```

we could kick up our .env, but I'm just going to do

```bash
uv run Python deploy favorites .py
```

Right this, and we'll see transaction broadcasted. Contract deployed. Storing person that sends another transaction. And, then we have person 25 Alice returned from the blockchain, right? Because down here we have person person data, the person data is going to be 25 and Alice. Because we go back to the favorites .vi, we have a list of Person structs. Right? And a Person struct is made up of a favorite number, which is a number, and a name which is a string. So, we're given back the favorite number and the name exactly as Vyper have told us. Nice.
