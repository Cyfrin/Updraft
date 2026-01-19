### Fee Growth Outside at Tick i

First, we will learn how *fee growth outside* at tick \(i\) is initialized and updated in an algorithm:

\[
f_{o,i} := \text{Fee growth outside at tick } i
\]

### **Initialize**
```plaintext
f_o,i = f_g  if  i ≤ current tick i_c
      = 0    otherwise
```

### **Update**
```plaintext
when f_g crosses tick i:
    f_o,i = f_g - f_o,i
```

---

## Fee Growth Below

Now let's examine how this algorithm is used to calculate *fee growth below*, \( f_b \). We start by defining some variables:

\[
f_g = \text{Fee growth of token Y at current time}
\]
\[
f_g^k = \text{Fee growth of token Y at time } t_k
\]

Here, our time variable \( t_k \) has the property:

\[
t_k < t_{k+1} < \dots
\]

We define:

\[
f_b = \text{Fee growth of token Y below tick } i
\]

We create a giant table with each row representing a time interval:

- \( t_0 \le t < t_1 \)
- \( t_1 \le t < t_2 \)
- \(\dots\)
- \( t_6 \le t < t_7 \)

The first column will represent what \( f_b \) should be in each time interval, the second column will represent *fee growth inside* according to the algorithm, and lastly we rewrite \( f_b \) in terms of *fee growth outside*.

### **Row 1**: \( t_0 \le t < t_1 \)

- At time \( t_0 \), fee growth is \( f_g^0 \).
- Between \( t_0 \) and \( t_1 \), the fee growth *below* (the height of the bottom red rectangle) is \( f_g^0 \).

Thus,
\[
f_b = f_g^0.
\]

### **Row 2**: \( t_1 \le t < t_2 \)

- Fee growth crosses over tick \( i \).
- The fee growth below will be the previous \( f_b \) plus the height of the second red rectangle, which is \((f_g^1 - f_g^0)\).

Hence,
\[
f_b = f_g^0 + (f_g^1 - f_g^0) = f_g^1.
\]

### **Row 3**: \( t_2 \le t < t_3 \)

- Fee growth is above tick \( i \).
- We add the red rectangle \((f_g^2 - f_g^1)\) to the previous \( f_b \).

So,
\[
f_b = (f_g^0 + (f_g^1 - f_g^0)) + (f_g^2 - f_g^1) = f_g^2.
\]

### **Row 4**: \( t_3 \le t < t_4 \)

- Fee growth has gone below tick \( i \).
- The red rectangle is \( f_g^3 - (f_g^2 - f_g^1 + f_g^0) \).

So we add that to the previous fee growth:
\[
f_b = f_g^2 + \Bigl[f_g^3 - (f_g^2 - f_g^1 + f_g^0)\Bigr] 
    = f_g^3 - f_g^1 + f_g^0.
\]

### **Row 5**: \( t_4 \le t < t_5 \)

- Fee growth is now above tick \( i \) again.
- We carry over the previous value and add the new red rectangle \(\bigl[f_g^4 - (f_g^3 - f_g^2 + f_g^1 - f_g^0)\bigr]\).

Hence,
\[
f_b = \bigl(f_g^3 - f_g^1 + f_g^0\bigr) + \Bigl[f_g^4 - (f_g^3 - f_g^2 + f_g^1 - f_g^0)\Bigr] 
    = f_g^4 - f_g^2 + f_g^0.
\]

### **Row 6**: \( t_5 \le t < t_6 \)

- Fee growth is still above tick \( i \).
- Again, we add \(\bigl[f_g^5 - (f_g^4 - f_g^3 + f_g^2 - f_g^1 + f_g^0)\bigr]\).

Thus,
\[
f_b = \bigl(f_g^4 - f_g^2 + f_g^0\bigr) + \Bigl[f_g^5 - (f_g^4 - f_g^3 + f_g^2 - f_g^1 + f_g^0)\Bigr]
    = f_g^5 - f_g^3 + f_g^1.
\]

### **Row 7**: \( t_6 \le t < t_7 \)

- Fee growth has crossed below tick \( i \).
- We add \(\bigl[f_g^6 - (f_g^5 - f_g^4 + f_g^3 - f_g^2 + f_g^1 - f_g^0)\bigr]\).

Hence,
\[
f_b = \bigl(f_g^5 - f_g^3 + f_g^1\bigr) + \Bigl[f_g^6 - (f_g^5 - f_g^4 + f_g^3 - f_g^2 + f_g^1 - f_g^0)\Bigr]
    = f_g^6 - f_g^4 + f_g^2 - f_g^0.
\]

---

## Fee Growth Inside

Next, we fill out the *fee growth inside* column using the same example:

- For \( t_0 \le t < t_1 \) (fee growth is above tick \( i \)):  
  \[
  f_{o,i} = f_g^0.
  \]

- For \( t_1 \le t < t_2 \) (current tick > \( i \)):  
  \[
  f_{o,i} = f_g^1 - f_g^0.
  \]

- For \( t_2 \le t < t_3 \):  
  \[
  f_{o,i} = f_g^2 - \bigl(f_g^1 - f_g^0\bigr) = f_g^2 - f_g^1 + f_g^0.
  \]

- For \( t_3 \le t < t_4 \):  
  \[
  f_{o,i} = f_g^3 - \bigl(f_g^2 - f_g^1 + f_g^0\bigr) = f_g^3 - f_g^2 + f_g^1 - f_g^0.
  \]

- For \( t_4 \le t < t_5 \):  
  \[
  f_{o,i} = f_g^4 - \bigl(f_g^3 - f_g^2 + f_g^1 - f_g^0\bigr) = f_g^4 - f_g^3 + f_g^2 - f_g^1 + f_g^0.
  \]

- For \( t_5 \le t < t_6 \):  
  \[
  f_{o,i} = f_g^5 - \bigl(f_g^4 - f_g^3 + f_g^2 - f_g^1 + f_g^0\bigr) = f_g^5 - f_g^4 + f_g^3 - f_g^2 + f_g^1 - f_g^0.
  \]

- For \( t_6 \le t < t_7 \):  
  \[
  f_{o,i} = f_g^6 - \bigl(f_g^5 - f_g^4 + f_g^3 - f_g^2 + f_g^1 - f_g^0\bigr) 
          = f_g^6 - f_g^5 + f_g^4 - f_g^3 + f_g^2 - f_g^1 + f_g^0.
  \]

---

## Rewriting \(f_b\) in Terms of \(f_{o,i}\)

Finally, we rewrite \( f_b \) in terms of *fee growth outside*, \( f_{o,i} \).

- Compare the first \( f_b \) with \( f_{o,i} \):
  - Both are equal to \( f_g^0 \) in the first interval.
  - Thus, \( f_b = f_{o,i} \) (for that interval).

- In the second interval, \( f_b = f_g^1 \). Rewriting in terms of \( f_{o,i} \), we also see it matches.

- For the third interval, \( f_b = f_g^2 - f_g^1 + f_g^0 \), which again matches \( f_{o,i} \).

Observing a pattern for *even rows* (where fee growth has just crossed over tick \( i \) to go above \( i \)), we have:

\[
f_{o,i} = f_g - f_{o,i}.
\]

Hence, the generalized equation for *fee growth below*, \( f_b \), becomes:

\[
f_b =
\begin{cases}
f_{o,i} & \text{if } i \le i_c,\\[6pt]
f_g - f_{o,i} & \text{if } i_c < i.
\end{cases}
\]

We will derive the equation for *fee growth above* in the next lesson.