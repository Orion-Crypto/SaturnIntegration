[DEPRECATED]

This repository is deprecated. For all new NFT Projects, please use the [Saturn V2 Integration Repository](https://github.com/Orion-Crypto/Saturn-V2-Integration)


# Saturn API Documentation Example

This repository is for the Cardano Saturn NFT documentation example. This example will go through a simple 1 - click multisig mint.
If you would like additional API examples, contact us on [Twitter](https://twitter.com/SaturnNFTio), on [Discord](http://discord.gg/NvVNfQmPjp), or on the [Mercury Chat Town Square](https://mercurychat.io/)

<br />

# One - Click Multisig Minting Test

1. Pull this repository with:

```
git clone git@github.com:Orion-Crypto/SaturnIntegration.git
```

2. To install all dependencies, run:

```
npm i
```

3. Get an API key from Saturn. By connecting and signing into https://saturnnft.io/. The site uses 1 - click wallet login, so no username or password required!

![APIKey](https://user-images.githubusercontent.com/17760631/201388005-8c64ca27-8441-463a-9ca0-6ee19ed44d94.jpg)

4. Create a .env file in the top level of this repo by copy and pasting the file /devops/environment/example.env and renaming it to .env. Paste your Saturn API Key into the SATURN_API_KEY field

```
NEXT_PUBLIC_SATURN_GRAPHQL_API_URL=https://api.saturnnft.io/graphql/
SATURN_API_KEY=
```

5. Finally, to start this repository, run:

```
npm run dev
```

4. Navigate to localhost:3000 in your browser, now click the "Create And Mint Test NFT With Saturn" button.

<b>Note</b>: With the default version of the code, this will only work with nami. You can change window.cardano.nami in this code to the wallet of your choice.

![SaturnMultiSigMintingButton](https://user-images.githubusercontent.com/17760631/201388779-bcb5a47d-6dd7-45d4-b846-38b251580bf3.PNG)

5. Sign the transaction and you have successfully minted an NFT using Saturn with 1 button click!

<br />

# Using the Saturn API To Implement Your Own Cardano Multisig Minting Engine

Saturn uses a series of GraphQL apis for its minting engine. You can read all of the available apis in the [Saturn API Documentation](https://saturnnft.io/documentation).

This repository is split into 4 parts:

1. The front end javascript found in `pages/index.tsx`
2. The API request functions that we use to call the built in NextJS API routes to protect our Saturn API key found in `src/api/Requests/`
3. The NextJS API routes found in `pages/api/` that are called by the front end request functions.
4. The Saturn GraphQL APIs that are found in `src/api/GraphQL`

To setup your own multisign minting engine. Copy the pattern for the above parts for whichever Saturn APIs you need.

If you need any help, feel free to reach out on [Twitter](https://twitter.com/SaturnNFTio), on [Discord](http://discord.gg/NvVNfQmPjp), or on the [Mercury Chat Town Square](https://mercurychat.io/) =D

<br />

# Additional - Mercury Chat Integration

In addition to the Saturn APIs, if your DAPP wants to have built in user chat, we have provided an example of how to implement that here as well =)
