### Workshop 1: Mocksen NFTs

We are going to be working with a centralized gateway. The centralized option we are using is:

```text
https://gateway.pinata.cloud/ipfs/QmAnOFS6q43HRTW32wVSv6ITTFv3aKqFTf8qKFfTmciJMK
```

The first workshop involves completing two prompts:

1.  **Upload your own dog image to IPFS, mint it as an NFT, and then see it in your Metamask!**
2.  **Write tests to get at least 80% coverage!**

If we are using our own IPFS, our IPFS node must be running. Our desktop app has a node option in the top right. If we want to stop it, we can turn it off.

Alternatively, we can use a centralized service like Pinata Cloud. Pinata Cloud allows us to upload directly to the service.

We need to ensure that our token URI returns a JSON object. The JSON object must include the image and image attributes.

If we want to use the dog images provided in the Github repo for this course, we can find them under the /images/static directory.

### Workshop 2: Mocksen DeFi | Algorithmic Trading

The second workshop prompt is:

**Spend at most 25 minutes on all of these prompts without the aide of AI. If you�re unable to solve them after 25 minutes, stop, take a break, and then work with an AI or the discussions to help you solve them. Good luck!**

We can test our code in the terminal:

```bash
mox test --coverage
```

This completes our introduction to the Mocksen NFTs and testing workshops. Pause the video, complete these workshops, and we'll see you in a bit!
