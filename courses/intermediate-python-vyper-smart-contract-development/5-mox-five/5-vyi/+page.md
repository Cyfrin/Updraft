## File Interfaces

We will learn about file interfaces in Vyper, which are a more efficient way of dealing with interfaces.  You may be asking "What's wrong with the inline interfaces?"  And that's a fair question.  The inline interfaces are perfectly valid and there is nothing wrong with using them.  However, there are some reasons why using a file interface can be a better approach.

One reason to use a file interface is that if we have a contract with a lot of functions, for example an interface with 50 functions, the inline interface would be very long and visually clunky.

We can create a file interface in a separate file and import it into our main contract file.  For example, we will make a file interface for our *favorites* contract.

We can start by creating a new folder and then a new file in that folder.

```bash
mkdir interfaces
touch interfaces/i_favorites.vyi
```

We like to use an 'i_' prefix for our interface files, but this is not a requirement of Vyper.

Now, the interface that we wrote earlier was an inline interface.  An inline interface is written directly within our contract file, for example:

```vyper
interface i_favorites:
    def store(new_number: uint256): nonpayable
    def retrieve() -> uint256: view
```

And the file interface that we just created is written in a separate file.

Now, in our factory file, we can go ahead and import our *i_favorites* file interface.  We can do this by using a similar syntax to Python.

```vyper
from interfaces import i_favorites
```

We don't need to include the '.vyi' extension after the *i_favorites* import, as Vyper knows that it is a file interface.

So, this one line of code is equivalent to writing the interface directly inline.

Now, we can actually call our interface in our factory file.  Let's go ahead and do that.

```vyper
favorites_contract: i_favorites = i_favorites(self.list_of_favorite_contracts[favorites_index])
favorites_contract.store(new_number)
```

We can test our code by running:

```bash
mox compile
```

It should compile successfully.

We have now created our first file interface in Vyper.  We are going to go ahead and tweak one more piece of our factory contract. 

 courses\moccasin-101\5-mox-five\5-vyi\+page.md
