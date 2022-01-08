// Use this to create a new Data Model

import { writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'

async function main () {

const DID_KEY="<>"
// The key must be provided as an environment variable
const key = fromString(DID_KEY, 'base16')
// Create and authenticate the DID
const did = new DID({
  provider: new Ed25519Provider(key),
  resolver: getResolver(),
})

await did.authenticate()

// Connect to the local Ceramic node
const ceramic = new CeramicClient('http://localhost:7007')
ceramic.did = did

// Create a manager for the model
const manager = new ModelManager(ceramic)

const BYOFID = await manager.createSchema('BYOFGraph', {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "BYOFV0.1",
  type: "object",
  properties: {
    address: {
      type: "string"
    },
    followingList: {
      type: "array",
      items:{
        type: "string"
      }
    }
  }
});

  await manager.createDefinition('BYOFGRPH', {
    name: 'BYOF Graph',
    description: 'Own your social graph and bring it around',
    schema: manager.getSchemaURL(BYOFID),
  })
  
  const model = await manager.toPublished()

  await writeFile('./BYOFGRPH.json', JSON.stringify(model))

}

main()

