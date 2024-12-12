## Testing for Events

We've learned what events are and what they're used for. Let's look at our `snek_token` and see if we need to add it anywhere. Okay, maybe for this mint function. Okay, maybe for our initial deploy, but actually, does this mint function already emit logs? Let's take a look. And, yep, it sure does. Okay, so we don't need to do any logging on our `snek_token`. Our `snek_token` is good. 

Let's go to our test token though and let's learn how to read these logs to make sure that we're actually using them.  

So we'll do a little test or a def test `token_emits_event` like this.

```python
def test_token_emits_event():
    snek_token = deploy()
    with boa.env.prank(snek_token.owner):
        snek_token.transfer(RANDOM_USER, INITIAL_SUPPLY)
        logs = snek_token.get_logs()
        log_owner = logs[0].topics[0]
        assert log_owner == snek_token.owner()
```

We'll run this line again, which again is not good. We should be using this as a fixture. But then, we'll do `with boa.env.prank(snek_token.owner):` Let's just be the `snek_token.owner`. 

We need to import boa. 

```python
import boa
```

Let's do `snek_token.transfer(boa.accounts[1], 100)` to some random users. So I'm going to say `RANDOM_USER = boa.env.generate_address('random_user')` like this.

```python
RANDOM_USER = boa.env.generate_address('random_user')
```

We'll do `snek_token.transfer(RANDOM_USER, INITIAL_SUPPLY)`. So this transfer function, if we go to def `transfer`, this is on the `erc20.vy` and it calls this `self.transfer`. This internal transfer function, which is a whole bunch of code here, but basically, this is what updates the balance, right? So the balance of a certain address is really just a mapping. So when people are like, "Oh, I have X number of tokens," what they're really saying is "Oh, I have seven in my mapping on that contract," or however many tokens they have, right? That's really all having tokens is, is having an entry in this mapping in this smart contract. Kind of crazy, right? Well, when we do `snek_token.transfer`, this transfer emits this `IERC20.Transfer(owner, to, amount)`. So this transfer event is actually specified in the `IERC20` interface. 

And events, by the way, they look just like structs. To make an event or a log, you just have event, the name of the event, and any of the parameters in it. And then, you emit it like this or you log it like this. So in the `IERC20` interface, it has those event objects. Specified, one such is the transfer event, but it takes the owner, the to, and the amount and it emits them. 

So we can actually get this log back in our test here after we do the transfer function, but still inside of this this with context, we'll say we can say logs equals `snek_token.get_logs` like this. And this will return a little array of logs. So I can even do a little breakpoint in here and let's run this test.  So we'll do `mox test -k` paste that in. We'll pop us into this little terminal here. So, let's see what the the logs variable looks like. So the logs has a single event in it. So this is an array of different logs or events that have happened. And there's a single transfer event in it with a sender, receiver, and a value. So we have We see sender, receiver, value. We'll go back to the `erc20`. We go down to this. We have sender, receiver, and value exactly as the transfer log is doing. 

So to do a little assertion here we could say, let's even look at the `snek_token.owner`. `snek_token.owner` is this address here. We can see that it is also the sender. So what we could do is we could say the log owner is going to be equal to the logs, zero. So the first log or the first event.topics, which we learned about from the video we just watched, zero, which is going to be this sender. And we could do `assert log_owner == snek_token.owner`. We can even run this. We can even run this in our little terminal down here. Let's paste that line in here. 

```bash
mox test -k test_token_emits_event
```

We get a little error cuz we're editing our test in a breakpoint, which is annoying. And then, we can run this.

```bash
mox test -k test_token_emits_event
```

And we get true. So, I'm going to type `q`. We're going to quit that. Got rid of the breakpoint. We could also add another assert in here if we want it. We can say assert `snek_token.balanceOf(RANDOM_USER) == INITIAL_SUPPLY`. 
