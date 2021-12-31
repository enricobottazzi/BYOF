import { Caip10Link } from '@ceramicnetwork/stream-caip10-link';

async function getDid (add) {
    const ceramic = new CeramicClient(endpoint)
    const accountLink = await Caip10Link.fromAccount(
      ceramic,
      `${add}@eip155:1`
      )
    const linkedDid = accountLink.did

    console.log(linkedDid)

    return linkedDid
  }
