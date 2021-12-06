const getTokenURI = require ('./5.getTokenURI.js');
var CryptoJS = require("crypto-js");
var IPFS = require ('ipfs-core')
let secretKey

async function decrypt() {

    tokenURI = await getTokenURI();
    const cid = tokenURI.split('/').reverse()[0];

    const node = await IPFS.create()

    const stream = node.cat(cid);
    let data = '';

    for await (const chunk of stream) {
    // chunks of data are returned as a Buffer, convert it back to a string
    data += chunk.toString()
    }

    var bytes  = CryptoJS.AES.decrypt(data, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    console.log(decryptedData);

    return decryptedData;
}

decrypt();


