import { ethers } from "ethers";
var CryptoJS = require("crypto-js");

const abi = require("../GangAbi.json");
const gangAddr = "0x72a06dF9039c6416D985871bac9C66EF1B634aC7";

export const createGang = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const managerContract = new ethers.Contract(gangAddr, abi, signer);

  await managerContract
    .connect(signer)
    .createManager();

  managerContract.on("newGang", (addr, id) => {
    console.log(addr + " Created new gang with ID: " + id);
  });
};

export const addMember = async (id, login, addr) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const signer = provider.getSigner();

    let address = CryptoJS.AES.encrypt(addr, login).toString();
  
    const managerContract = new ethers.Contract(gangAddr, abi, signer);
  
    await managerContract
      .connect(signer)
      .addMember(address, id);
};

export const retrieveGang = async (id, login) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    const managerContract = new ethers.Contract(gangAddr, abi, signer);
  
    const gang = await managerContract
      .connect(signer)
      .retrieveGang(id);

    let newArr = []

    for(let i = 0; i < gang.length; i++) {
        let bytes = CryptoJS.AES.decrypt(gang[i], login);
        newArr.push(bytes.toString(CryptoJS.enc.Utf8))
    }
    return newArr
};

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
        };
      }
    } else {
      return {
        address: "",
      };
    }
  };
  
  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
          };
        } else {
          return {
            address: "",
          };
        }
      } catch (err) {
        return {
          address: "",
        };
      }
    } else {
      return {
        address: "",
      };
    }
  };
  