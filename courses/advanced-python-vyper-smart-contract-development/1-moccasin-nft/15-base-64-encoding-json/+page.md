## Base64 Encoding JSON on-chain

We are going to gloss over some of the actual method we use to do this. It's really low level and not critical to your learning.  If you want to pause and try to figure out how to base64 encode the JSON string yourself, or figure out how it works, go for it!

So, now we have the SVG stored here, we need to figure out how to convert this, or add this to the token metadata, right? 'Cause this is what we need to show. Right? Something that looks like like this. 

So, what we can do, and this is why we didn't export the ERC721 functions, is we can actually create our own 

```python
@external
def tokenURI(token_id: uint256) -> String[FINAL_STRING_SIZE]:
    pass
```

function ourselves.

So, if we go to the ERC721.vy look up def tokenURI. We can do the exact same thing. It does except we're going to have our tokenURI. Actually let's do return like this. We are going to have our tokenURI do some clever stuff. 

So, we need to create a tokenURI that returns something that looks like this. 

Right? So, what we can do is we can use the concat feature in Vyper. 

So Vyper has another built in function called concat which takes two or more bytes arrays, or basically strings, of type bytes, bytes or string, and combines them into a single value. If the input arguments are all string, the return type is string, otherwise it's will be bytes. 

So, what we can do is, I can do a little I can say json string. We'll say string 1024 equals concat and this is where I can literally pass in this kind of data here. Right? So, I could say a little single quote bracket name double quote single quote comma. And here's where it's going to get a little confusing. So, we're basically going to be piecemealing together this JSON object, but then we'll say name comma single quote double quote comma double quote description

```python
json_string: String[1024] = concat(
    "{\"name\":", NAME, ", \"description\":\"A Mood NFT that reflects the mood of the owner, 100% on Chain!\",",
    "\"attributes\":[{\"trait_type\":\"moodiness\",\"value\":100}],\"image\":\"",
    image_uri,
    "}\""
)
```

um and if you want, if you're like, "What? I'm going to screw this up because there's all these single quotes and double quotes." You just go to the GitHub repo associated with this. Go to src/ mood-nft.vy scroll down to the tokenURI and just copy this section here. Right? Just, just so that you don't actually screw something up. You don't have imageURI yet, but that's okay. So, this is kind of us piecemealing together that JSON string that JSON metadata. Right? The only thing that we don't have yet is the imageURI, so we could though, we could just say imageURI type string 800 equals happy SVGURI, right? Boom. And this would make a JSON string that looks you know, just like this, but with this imageURI of the happy SVGURI. Nice. Now this having this JSON string is great, but the tokenURI needs to return a tokenURI, right? And this needs to return something that looks like, you know, ipfs/ blah blah blah blah blah, right? Not this JSON thing, this or like https/ blah blah blah blah blah. And then this returns this. I know that's kind of confusing, but so we need to convert this. We need to encode this to be base64 encoded. And, don't worry, we're going to make this dynamic pretty soon. 

So, when I was originally creating this course, I was going to walk you through kind of the giant process of converting this from a string to a base64 encoded object, but I don't know if it's really worth it because it's just kind of like a lot of math with the base64 encoding and doing all this weird chunking and stuff. So, here's what I'm going to say that you can do for now. Same thing. Go to the GitHub repo associated with this. scroll down and you'll see this SVG to URI and this set indice truncated. Copy both of those. Bring them over to the contract. Paste them in and and up at the top you're going to have to say from 

```python
from snekmate.utils import base64
```

You're going to need to do final string size is going to be a constant uint256 equals it's going to be four times base 

```python
FINAL_STRING_SIZE: constant uint256 = 4 * base64.DATA_OUTPUT_BOUND + 80
```

constant and then additionally you're going to have a JSON base URI which will be a constant 

```python
JSON_BASE_URI: constant String[29] = "data:application/json;base64,"
```

string of 29 equals data colon application slash JSON semicolon base64 comma and then you're going to need an image base URI size. image base URI size constant 

```python
IMG_BASE_URI_SIZE: constant uint256 = 26
```

constant 

```python
IMG_BASE_URI: constant String[IMG_BASE_URI_SIZE] = "data:image/svg+xml;base64,"
```

of constant string of size that equals data colon image slash SVG plus XML base64.

So, I know this is a little bit anticlimactic in working with this this stuff, but we do kind of a lot of low level Vyper stuff here which I could walk you through, but what I'd rather do is I'd actually rather just teach you all the different concepts that are in here so that you know what this is doing. We do our sub lessons, which is going to teach us about ABI encoding and decoding, so that you can understand everything in here. But, actually writing it, I think it will kind of go over a lot of your heads at the moment, so I know, like like I said, it was a little anticlimactic, but just copy paste this. I'm going to explain what these do and yeah, and then actually same thing with the with the tokenURI, we're going to cheat a little bit more here. Go to the GitHub repo underneath the JSON string, there's all of this stuff. Just copy this for now. Paste it in JSON base URI size. We need that as well. JSON base URI size is going to be constant uint256 equals 29. So, I know that's kind of a lot of copy pasting. Return results. And, this is going to be final string size like that. So, a bit anticlimactic, but let me walk you through kind of all this stuff that we just put in here. What the heck is going on? um so that we can actually understand this code and and keep going. 

So, we were running into the problem where this is what we had. Right? We had JSON string and we had nothing else. We basically had like kind of this object like this this stringified object. Right? And, we needed to convert it from the stringified object to a tokenURI. Right? Something that looks like this, like a base64 encoded tokenURI. And, what we did to do that was first we converted it from a string to a bytes using the Vyper built in convert. And, this is where it starts to get weird is 

```python
json_bytes: Bytes[1024] = convert(json_string, Bytes[1024])
```

We chunked it. So, we called base64.encode. If you look in your lib here in the lib, pypi snekmate.utils base64, there's this encode function that it has and essentially what it does is it returns the maximum 4-character user-readable string array that combined results in the base64 encoding of data. What does that mean? Well, this encode function basically converted this JSON bytes into the base64 encoded object except instead of it being a string it was this array of arrays. Right? So it's this kind of low level blah blah blah comma uh, OX blah blah blah or, I guess it's four here. Yeah, so it's this low level array of arrays which is essentially a base64 encoded string and we needed to take it from this weird array of arrays bytes data and convert it into a string.  So, we loop through the array, created this custom function called set indice truncated which did some kind of bizarre array multiple uh, array manipulation and then did this weird ABI encode and decode which we definitely have not gone over and we will go over very soon. Essentially, it was, we looped through this array of raw bytes data and we updated it into a string and boom return results. That's kind of the final string the base64 encoded string. So, essentially we did a lot of weird encoding and decoding stuff, array manipulation to get this JSON object from a JSON string into a base64 encoded string. Everything in here you pretty much should recognize. Right? Everything in here you pretty much should recognize. So, we have this encode function. We don't really know what it does, but we have a dynamic array of type string four. So, you yes you can have an array of strings. This is the max size here. That's one we understand. Yep, we understand this. We understand this. We have a four loop here. Great. We understand four loops. We have this set indice truncated. 

```python
encoded_chunks: DynArray[String[4]] = base64.encode(json_bytes, True)
```

slice is new, slice is something we haven't gone over, but it's pretty straightforward, basically copies a list of bytes and returns a specified slice. So, for example um yeah, here's here's a perfect example. example contract .foo why hello, how are you? If we just say, hey grab grab just a slice of this string starting at position four and going for five. So, we'd go 0 1 2 3 4. We'd start with the H. We go for 5 1 2 3 4 5. Boom, and it prints out hello. So slice is just getting like a subsection of an array.  So, for example this string 32 elements size four, we would just get hello. But, the thing we do not know is this ABI encode and decode and we're finally going to learn what this is. How does this ABI encode stuff and so much more. PP. 
