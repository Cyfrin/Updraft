## Jupyter and Python VS Code Extensions

We can create an environment very similar to a Google Colab environment by creating a file in VS Code called `cells.ipynb`.

To run the cells in this notebook, we need to install two extensions:

1. **Jupyter Notebook**: This extension provides support for Jupyter notebooks.
   ```bash
   jupyter
   ```
2. **Python**: This extension provides language support for Python and helpful tools, including syntax highlighting and formatting.
   ```bash
   python
   ```

After we install these extensions, we need to select a kernel. We can do this by clicking the three dots in the top right corner of the VS Code window and selecting "Extensions". Alternatively, we can click the "Extensions" button on the left side of the window.

We can then select the desired Python environment. We'll choose `Python 3.11.9` in this example.

Now we can run the cells in our Jupyter notebook by typing `shift enter`. We'll see that the output of the cells will appear below the cell itself.

We can also run basic Python commands in a Jupyter notebook in VS Code. For example, we can create a variable called `my_var` and set it equal to 8. We can then run the cell to assign the value to the variable.

```python
my_var = 8
```

Then, we can print the value of the variable `my_var`.

```python
print(my_var)
```

We can see that the output of this cell will be the number 8.
