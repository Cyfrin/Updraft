## Our first Python file

We've been working with `cells.ipynb` files. Let's create our first basic Python file. This is how professional software engineers work with Python.

Google Colab and these Jupyter Notebooks are great for testing, tinkering, learning, and working with stuff and the like, but they aren't great for professional environments. This is because, similar to Remix, if we wanted to test something and had to do shift-enter or execute all these cells at the same time, it could be very annoying. This isn't how professional projects work.

What they do instead is they create Python files to run and execute. For example, we are going to create a new file called `basic_python.py`.

The `.py` file extension is how VS Code and other Python tools know that this is a Python file.

In here, we can type and run kind of the basic Python stuff. We can do

```python
print("hi")
```

in here. Remember, this little white dot means it's not saved. Hit `command s` to save it. And then we can hit this little plus button that comes with this, and it will run my Python file with this `hi`.

Now there is a whole bunch of other stuff that it will do, and so this is kind of like a cheat sheet shortcut. This is something that you can use to run your Python files. However, we are going to discourage that use for a lot of reasons.

Instead, in your terminal, if you do

```bash
ls
```

you can see we have this `basic_python.py`. We are going to write

```bash
python3.11 basic_python.py
```

Hit enter and we will see it prints out `hi`.

This is how we can execute an entire file of Python, like so.
