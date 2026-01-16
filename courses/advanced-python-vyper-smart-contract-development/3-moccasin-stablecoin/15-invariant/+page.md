## Invariants

Invariants are a key testing concept when fuzzing smart contracts. 

Invariants are properties of the system that should always hold true.  We can use the *invariant* keyword in Hypothesis to check these invariants. 

The *invariant* keyword automatically runs a function after every rule that's executed.  If the invariant is false, an exception is raised.

Let's write an invariant for our stablecoin protocol:

```python
@invariant
def protocol_must_have_more_value_than_total_supply(self):
  total_supply = self.dsc.total_supply()
  weth_deposited = self.weth.balance_of(self.dsce.address)
  wbtc_deposited = self.wbtc.balance_of(self.dsce.address)
  weth_value = self.dsc.get_usd_value(self.weth, weth_deposited)
  wbtc_value = self.dsc.get_usd_value(self.wbtc, wbtc_deposited)
  assert (weth_value + wbtc_value) >= total_supply
```

This invariant checks that the total value of the collateral deposited (WETH and WBTC) is greater than or equal to the total supply of the stablecoin.

We can run our fuzzer with this invariant to see if it holds true. 

```bash
mox test-s stablecoin_fuzzer
```

This will run the fuzzer and automatically test our invariant.  If any rule breaks the invariant, the fuzzer will throw an exception.
