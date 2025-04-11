## NFTs: What is an SVG?

We're going to use something called an SVG.

Now, an SVG is something that we can store all on chain, but the issue is that we have to be able to encode our image as an SVG. We can also encode our JSON on chain as a base 64 encoded URI.

What the heck do both of those mean? Well, first, let's go start with what is an SVG.

SVG stands for Scalable Vector Graphics. SVG defines vector-based graphics in XML format.

We can actually scroll down, and we can see an example right in this SVG example, right? So, this is it. So, it looks it's just kind of this tag where it has very specific parameters for defining what an image looks like. 

And, the reason that SVGs are so cool is because no matter how big or small you make them, they're always going to have the exact same quality because they're scalable. You know how, like, if you take an image like this one, let me view this, you know, if we take this image, right, and I make it super super big, and I make it super big. The bigger I make it, the worse the quality gets. With an SVG, you don't ever have to deal with that because you define exactly what it will look like, no matter what size.

And what we can do is we can actually make our own SVG sort of like this, right? And if you're in the W3Schools, if you try for yourself, you can see my first SVG over here, and I can change this. I can say the fill is now blue. We'll run, and now it turns blue. I can say the stroke is black, right, and it turns black.

So, there's a ton of different parameters and functions that we can do to make an SVG look a certain way. Right, so if we're back in our VS Code, we can even go up to IMG, new file, example.svg. We can code some SVG in here, so we'll do SVG xml ns equals, and this is just version stuff, http.
```bash
cd img/
base64 -i example.svg
```
We can actually base 64 encode the output, everything in here, and what I can say is, I could do base 64 - i, which means we're going to input a file and we're going to pass in this example.svg. We'll see we get this weird thing as an output.

So, now if we take this weird thing, and I'm going to actually create a little little README to make some notes here.

So, this weird output is the base 64 encoded example.svg we just created.

Now, at the start of this, we can add a beginning piece to tell our browser that this is an SVG. So, I'm going to say data colon image slash svg plus xml colon base 64 comma like this. And, if I copy this whole thing, oops, sorry, this is in this should be a semicolon here. If I copy this whole thing, and I paste it into any browser, we're going to get this Hi, your browser decoded this. So, basically what we did was we encoded this SVG file, and put this data image, SVG plus xml colon base 64, so our browser knew how to decode it, and then just passed the entire image through our browser URL. And boom. So, we can also do this with images. So, if I go back to the repo associated with this lesson, go to images, dynamic NFT, we go to happy.svg, we go down to code instead of preview, and see the exact code here, right? So we create this viewBox, oops, we create some circles, we create this path, which is how we just kind of draw lines, and I can copy this whole thing, paste it into my image, so I'm going to say, oops, image, I'm going to do happy.svg, happy.svg, paste it in here. If I pull up the preview, I see the preview is a happy. Now what I can do is I can do base 64 - i happy.svg, we get this output. I can copy this output. Let me go over to the README, paste it. I'm going to add this beginning piece to it, and then copy this whole thing. We go back to my browser, paste it in, and boom. We've passed all of this data to generate this SVG right in the URL. And, this is looks like Yes it does. a token URI, right? So, now, instead of using an IPFS hash for our token URI, we can actually 100% on-chain use this SVG thing. And, because this SVG is basically coded on chain, we can update it and interact with it to make it do whatever we want it, right?

For example, if our has happy SVG, we could say, okay, if if somebody has 10 tokens, right, they get 10 circles or something like that, right? We could do whatever we want with this.
```bash
base64 -i happy.svg
```
Welcome back. 