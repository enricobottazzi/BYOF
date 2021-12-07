var IPFS = require ('ipfs-core');


async function initializeIPFS () {

    const ipfs = await IPFS.create()

    return ipfs

}

module.exports = initializeIPFS;