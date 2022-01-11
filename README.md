# BYOF
BYOF (bring your own friends) allows users to follow ethereum addresses and get followed back. 

Twitter, Discord and any centralized social media platform keep their social graphs closed. If Discord suddenly shuts down, all your Discord contacts are lost. If you want to leave Twitter you cannot bring your contacts with you. Today there's nothing that gives users ownership on their lists of following/followers and make it portable from platform to platform.

With BYOF you can seamlessly bring your followers to any web3 platform. On the other side, developers can integrate BYOF to import already existing networks.  

Let's take Decentraland as potential use case.

Right now once you connect to Decentraland you have to manually enter the addresses of people you want to interact with. If after a week you wanted to move to another platform you have to start from 0 again. If Decentraland would integrate BYOF, you could import your followers (and followings) and start hanging around with them. If you meet someone cool in Decentraland you can start following them: they will always be part of your social graph, beyond Decentraland.

Every web3 application that involves network of people will, eventually, adopt BYOF.

BYOF has 2 components:
- A Dashboard where you can track the address you follow. You can check the DAOs they are part of, the NFTs they own and trading, the web3 games they are playing or the metaverse platforms where they are hang around.
- An open API that can be integrated within any web3 platform that relies on social networks.

BYOF unlocks: 
- **censorship resistant ownership** upon your list of followers
- **portability and composability** across web3 protocols
- **privacy** guaranteed by asymmetric cryptography

![BYOF illustrated1](https://user-images.githubusercontent.com/85900164/147481121-50d8c51d-0212-4746-827d-db051679691b.jpg)
![BYOF illustrated2](https://user-images.githubusercontent.com/85900164/147481132-d75b7f55-4411-41be-a3fa-80967b83b7bb.jpg)

## MVP Demo
https://youtu.be/bGmtw75th_Y

## MVP Specs
Implemented using [Ceramic](https://developers.ceramic.network/), [3id-connect](https://github.com/ceramicstudio/3id-connect), [Self.ID](https://developers.ceramic.network/tools/self-id/overview/) and  [DID](https://www.w3.org/TR/did-core/) (decentralized identifiers).

The application uses a custom data model created with Glaze called BYOFGRPH; you can find it [here] (https://github.com/enricobottazzi/BYOF/blob/master/schemas/BYOFschemaz.json) 

**everything is done off-chain so users won't need to pay gas in order to follow someone**

## Open Task Board 

https://enricob.notion.site/b262167e5b1642edbcd9d6d606e95ec9?v=99b43f78006548418ab490da532ac62b

## How to demo it yourself

- ```npm install -g @ceramicnetwork/cli``` on your machine
- run ```ceramic daemon``` to [start a ceramic node](https://developers.ceramic.network/build/cli/installation/)
- Clone this repository on your machine
- ```cd my-app```
- ```npm start```



