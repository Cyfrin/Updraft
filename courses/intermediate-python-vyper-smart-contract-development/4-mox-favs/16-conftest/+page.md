In this lesson, we're going to take a look at a different way to write tests. Typically, we code our contract, like we did in the previous lesson, and then code our tests. We also have our fixtures at the top of the file. In this lesson, we're going to do things a little differently. 

We're going to create a new file, called `conftest.py`, in our `tests` folder. 

```python
import pytest
from script.deploy import deploy_favorites

@pytest.fixture(scope="session")
def favorites_contract():
  favorites_contract = deploy_favorites()
  return favorites_contract
```

Now, we need to import `pytest` in the `conftest.py` file, as well as import the `deploy_favorites` function. We'll also write our fixture, like we did in the previous lesson. 

Next, let's go into our `test_favorites.py` file. 

```python
from script.deploy import deploy_favorites
import pytest
```

We can now delete the fixture from `test_favorites.py`, since we now have it in the `conftest.py` file, and we can also delete the `import pytest` line. 

We can now run `mox test` to verify that everything passes. 

```bash
mox test
```

This method is just an alternative way to write and organize your tests. 
