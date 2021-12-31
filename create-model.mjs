import { Ed25519Provider } from 'key-did-provider-ed25519'
import { randomBytes } from '@stablelib/random'
import { CeramicClient } from '@ceramicnetwork/http-client'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import { DID } from 'dids'

async function main () {

const API_URL = 'https://localhost:7007'
const ceramic = new CeramicClient(API_URL)

const resolver = {
  ...ThreeIdResolver.getResolver(ceramic),
}

const did = new DID({ resolver })
ceramic.did = did

const seed = randomBytes(32)

const provider = new Ed25519Provider(seed)

ceramic.did.setProvider(provider)

const data = await ceramic.did.authenticate()

console.log(data)

}

main()