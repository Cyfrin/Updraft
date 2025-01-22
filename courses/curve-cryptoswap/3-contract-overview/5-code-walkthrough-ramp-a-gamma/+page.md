### Ramp A Gamma and Stop Ramp A Gamma Functions

Let's explore the `ramp_A_gamma` function. This function is responsible for setting the future A and gamma parameters. It accepts three inputs: `future_A`, `future_gamma`, and `future_time`. The current A and gamma parameters will transition to match `future_A` and `future_gamma`.

The code includes a check to ensure that the `msg.sender` is the admin stored in the factory contract. This implies that the function is restricted to authorized accounts. While the code contains several checks, we will focus on the part where the state variables `initial_A_gamma` and `future_A_gamma` are set.

After some initial checks, the function gets the current A gamma parameter by calling the `A_gamma` function.

Next we can see the code does some checks, and then sets `initial_A_gamma`, the state variable, to the result of the `initial_A_gamma`, which was calculated previously. The `initial_A_gamma_time` is also set to `block.timestamp`.

The next step is setting the state variables: `future_A_gamma`, and `future_A_gamma_time`. That�s an overview of the `ramp_A_gamma` function.

Following the admin setting a `future_A_gamma`, they might want to halt the update process. This would entail invoking the `stop_ramp_A_gamma` function. It's important to note that this function is also restricted to the admin of the factory contract. The function will retrieve the current A gamma, then set both the `initial_A_gamma` and `future_A_gamma` to the current values. This completes the review of the `stop_ramp_A_gamma` function.

```javascript
    external
    def ramp_A_gamma(
        future_A: uint256, future_gamma: uint256, future_time: uint256
    ):
```

```javascript
        assert msg.sender == Factory(self.factory).admin() # dev: only owner
        assert block.timestamp > self.initial_A_gamma_time + (MIN_RAMP_TIME - 1)
        assert future_time > block.timestamp + MIN_RAMP_TIME - 1 # dev: insufficient
```

```javascript
        A_gamma: uint256[2] = self._A_gamma()
        initial_A_gamma: uint256 = A_gamma[0] << 128
        initial_A_gamma = initial_A_gamma | A_gamma[1]
```

```javascript
        ratio: uint256 = 10**18 * future_A / A_gamma[0]
        assert ratio < 10**18 * MAX_A_CHANGE + 1
        assert ratio > 10**18 / MAX_A_CHANGE - 1

        ratio = 10**18 * future_gamma / A_gamma[1]
        assert ratio < 10**18 * MAX_A_CHANGE + 1
        assert ratio > 10**18 / MAX_A_CHANGE - 1

        self.initial_A_gamma = initial_A_gamma
        self.initial_A_gamma_time = block.timestamp

        future_A_gamma: uint256 = future_A << 128
        future_A_gamma = future_A_gamma | future_gamma
        self.future_A_gamma_time = future_time
        self.future_A_gamma = future_A_gamma
```

```javascript
    external
    def stop_ramp_A_gamma():
```

```javascript
        assert msg.sender == Factory(self.factory).admin() # dev: only owner

        A_gamma: uint256[2] = self._A_gamma()
        current_A_gamma: uint256 = A_gamma[0] << 128
        current_A_gamma = current_A_gamma | A_gamma[1]
        self.initial_A_gamma = current_A_gamma
        self.future_A_gamma = current_A_gamma
        self.initial_A_gamma_time = block.timestamp
        self.future_A_gamma_time = block.timestamp
```
