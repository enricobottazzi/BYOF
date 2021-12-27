# BYOF

BYOF (bring your own friends) allows users to follow ethereum addresses ang get followed back. 

Twitter, Discord and any centralized social media platform keep their social graphs closed. If Discord suddenly shuts down, all your Discord contacts are lost. If you want to leave Twitter you cannot bring your contacts with you. Today there's nothing that gives users ownership on their lists of following/followers and make it portable from platform to platform.

With BYOF you can seamlessly bring your followers to any web3 platform. On the other side, developers can integrate BYOF to import already existing networks.  

Let's take Decentraland as potential use case.

Right now once you connect to Decentraland you have to manually enter the addresses of people you want to interact with. If after a week you wanted to move to another platform you have to start from 0 again. If Decentraland would integrate BYOF, you could import your followers (and followings) and start hanging around with them. If you meet someone cool in Decentraland you can start following them: they will always be part of your social graph, beyond Decentraland.

Every web3 application that involves network of people will, eventually, adopt BYOF.

BYOF has 2 components:
- An independent UI that can be used to read and update your followers/following list
- An open API that can be integrated within any web3 platform that relies on social networks.

BYOF unlocks: 
- **censorship resistant ownership** upon your list of followers
- **portability and composability** across web3 protocols
- **privacy** guaranteed by asymmetric cryptography


![BYOF illustrated1](https://user-images.githubusercontent.com/85900164/147481121-50d8c51d-0212-4746-827d-db051679691b.jpg)
![BYOF illustrated2](https://user-images.githubusercontent.com/85900164/147481132-d75b7f55-4411-41be-a3fa-80967b83b7bb.jpg)

Concept Demo: https://www.youtube.com/watch?v=6CaLt5QzQPE  


## MVP Specs

- Use OrbitDB (distrbuted database built on IPFS) to manage user data 
- Import User [identity](https://github.com/orbitdb/orbit-db-identity-provider) from MetaMask
- Allow access only to users that have a registred ENS name in order to reduce spam
- Create a [Docstore](https://github.com/orbitdb/orbit-db-docstore) DB for each user; write functions restricted to user (see [accessController](https://github.com/orbitdb/orbit-db-access-controllers))
- Let the user update his/her database adding JSON file including user signature + new followings
- Create a simple UI that shows each users' followings and followers (such as byof/enrico.eth)


**everything is done off-chain so users won't need to pay gas in order to follow someone**
