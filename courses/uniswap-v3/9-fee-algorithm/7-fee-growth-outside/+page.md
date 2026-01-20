### Fee Growth Outside

Inside of Uniswap V3's code, there is a state variable called `fee growth outside`, and it's used to calculate both the `fee growth above` and `fee growth below`. In the next few videos, we'll explain how this works.

In this video, we'll start by explaining how `fee growth outside` is initialized and how it's updated. Let's first start by defining some variables:
`f_g` = Fee growth
`f_o,i` = Fee growth outside at tick i

Next, let's take a look at the algorithm. The state variable `fee growth outside` is initialized as follows:
```javascript
f_o,i = f_g if i <= current tick i_c
        = 0 otherwise
```

This may not be obvious right away why `fee growth outside` is initialized in this way. However, in the next couple of videos, when we look at an example of how `fee growth outside` is used to calculate `fee growth above` and `fee growth below`, this will become more clear.

The way that `fee growth outside` is updated is as follows:
When `f_g` crosses tick i,
```javascript
f_o,i = f_g - f_o,i
```

So that's how `fee growth outside` is initialized and updated.
In the next couple of videos, we will see how this algorithm correctly calculates `fee growth above` and `fee growth below`.
