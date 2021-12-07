// Upload the ciphertext to IPFS
async function upload (ciphertext, ownerAdd, ipfs) {

    const obj = await ipfs.add(ciphertext);
    cid = obj.path;
    console.log("encrypted file uploaded to IPFS cid =>" , cid, "of address", ownerAdd);
    return cid;

}

module.exports = upload;
