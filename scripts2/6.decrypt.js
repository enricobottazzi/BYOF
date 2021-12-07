var CryptoJS = require("crypto-js");
const getTokenURI = require('./5.getTokenURI.js');

async function decrypt(contractAddress, _tokenID, secretKey, ipfs) {

    tokenURI = await getTokenURI(contractAddress, _tokenID);

    // retrieve data from IPFS
    const cid = tokenURI.split('/').reverse()[0];
    const stream = ipfs.cat(cid);
    let data = '';
    for await (const chunk of stream) {
    data += chunk.toString()
    }

    // decrypt it 
    var bytes  = CryptoJS.AES.decrypt(data, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData);

    return decryptedData;
}

module.exports = decrypt;



