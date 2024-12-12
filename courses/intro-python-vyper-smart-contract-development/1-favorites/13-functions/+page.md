## Functions: The `def` Keyword

We can create a function so we can actually save a value to our `my_favorite_number`. The way we declare a function is to use the `def` keyword.

The `def` keyword can be thought of as standing for definition.

```python
def store
```

We will create a function called `store`.

```python
def store()
```

Next we need to add the parentheses. We put whatever parameters this `store` function is going to take inside the parentheses. For example, we need to tell our `store` function what number we want to update `my_favorite_number` with.

```python
def store(new_number)
```

We will tell our function to update `my_favorite_number` with `new_number`, which will be of type `uint256` as well.

```python
def store(new_number: uint256)
```

Next, we need to add a colon to indicate that the next lines will be the subset of code for our function.

```python
def store(new_number: uint256):
```

We will hit enter and you will notice that we immediately get a tab. Vyper and Python are tab-based languages, and the tab tells our compiler that this line of code is associated with our function. If we were to type over here, the compiler would have a hard time knowing that this code is part of our function.

```python
def store(new_number: uint256):
    adsasdf
```

We need to add this tab which tells our compiler that this line of code is part of the function.

```python
def store(new_number: uint256):
    self.my_favorite_number
```

We will say: "Okay, self dot my favorite number equals or is set to new number".

```python
def store(new_number: uint256):
    self.my_favorite_number = new_number
```

Now, `self` is a very specific keyword in Vyper. It refers to the contract that we are writing. So, when we say `self.my_favorite_number`, we are saying "point to the storage variable or the state variable `my_favorite_number`."

If we didn't have `self` the compiler would get a little confused. It would say, "Okay, well what are you referring to? Is it my favorite number a new variable, or is it a state variable?" We put `self` in here, and the compiler says, "Ah, that's a state variable you're dealing with, got it. Makes sense."

So, what this function is going to do is: we are going to pass in a number, like seven, and we're going to save it to `my_favorite_number`.

```python
@external
def store(new_number: uint256):
    self.my_favorite_number = new_number
```

Now, similar to how we need the `public` keyword up here so we can actually get that blue button to read `my_favorite_number`, functions have the same concept. If we don't give them some type of visibility, it will automatically be considered internal.

We need to add `@external` right above our function definition. This is known as a decorator. Once again, these exist in Python as well. The `external` keyword means that this function can be called by us, by people outside of this smart contract. This doesn't quite make sense yet, but just ignore it for now. We will explain it deeper as we go on.

But, now that we have this kind of boilerplate code, we can make sure to compile this. And we can deploy this. Let's go ahead and remove that other contract and re-hit deploy. Then let's hit the little drop down here. Now, you'll see we have two buttons: we have `my_favorite_number` and we have `store`.

The reason `store` is greyed out is because we need to give it an input. If we hit `my_favorite_number`, remember this is a `public` variable, so we get this blue button. We add the number `7` in here, and then I hit `store`.

It will actually send a transaction to store the number seven at `my_favorite_number`. If we look in our little terminal section here, we can actually see that when I click this store button, these little statements show up. These are transactions.

So, storing seven or their simulated transactions on this little fake Remix environment. So storing the number seven actually is updating the state of this smart contract. And to update state, you actually have to send a transaction. So `my_favorite_number` is being populated with, well, if it's getting started as zero, but then it's getting set to seven. And when we call `my_favorite_number` now, we now get the number seven here. It's really really tiny, but we get a seven back. If I were to add some crazy number, like this, hit the `store` button and then hit `my_favorite_number`, we see it's been updated here.

```bash
store(1235)
```

We see it's been updated here.
