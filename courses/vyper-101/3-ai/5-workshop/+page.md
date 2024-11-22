## Section 3: Prompting, Asking Questions, and Researching

We've learned a lot about Vyper in the previous sections and now we are ready to put that knowledge to the test. We are going to do some work with AI. While AI can be a powerful tool, it is important to understand its limitations and use it wisely. It's crucial to be aware of situations where AI might be mistaken or give us incorrect information.

For this workshop, we'll be testing out a few different AI tools and comparing their abilities. We'll be asking them some softball questions to gauge their understanding of smart contract development.

**Our First Test:**

Our first test will be to ask the AI to make a minimal Vyper contract.

**Next, we'll ask the AI to explain the difference between a dynamic array and a fixed-sized array in Vyper.**

**We can also test the AI's ability to understand Vyper code by asking it to explain a code snippet.**

For example, we can ask:

```python
@external
def add_person(name: String[100], favorite_number: uint256):
    new_person = Person(self.list_of_people_index, favorite_number, name=name)
    self.list_of_people[self.list_of_people_index] = new_person
    self.list_of_numbers[self.list_of_people_index] = favorite_number
    self.list_of_people_index += 1
    self.name_to_favorite_number[name] = favorite_number
```

**What does this code do?**

**Finally, we'll test the AI's knowledge of Vyper security by asking it to analyze a code snippet and identify any potential vulnerabilities.**

For example, we can ask:

```python
send(OWNER, self.balance)
```

**Is this Vyper code safe?**

We've learned that we need to use **raw call** in Vyper instead of **send** for security reasons. Let's ask the AI to tell us if our code is safe and suggest a better way to send funds:

```python
send(OWNER, self.balance)
```

**What's a better way?**

**Let's test the AI's understanding of how to use the `raw_call` method.**

We can ask:

```python
success = raw_call(self.owner, amount, gas=3000, value=amount)
```

**How can we use the `raw_call` method for sending Ether to prevent reentrancy issues?**

**In the previous sections, we learned about the `raw_call` method.** It is a powerful tool in Vyper that allows us to interact with other contracts directly. But it is important to use the `raw_call` method cautiously and to be aware of the risks associated with it, specifically the risk of reentrancy.

We are also going to test the AI to make sure it can provide secure solutions.

**By testing these AI tools, we can gain a better understanding of how they work and how they can be used to help us write better Vyper contracts.**
