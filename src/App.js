import './App.css';
import React, {useState} from 'react'
import { create } from 'ipfs-http-client'
import { ethers } from 'ethers'


function App() {

  const [accountConnected, setAccount] = useState(null)
  const [followingAddress, setFollowingAddress] = useState(null)
  const [provider, setProvider] = useState(null)

  let signature1;

  const connectWalletHandler = () => {
    //we ask if the user has metamask installed
    if (window.ethereum) { 
        window.ethereum.request({method: 'eth_requestAccounts'})
            .then (result => {
              setAccount(result[0])})
        setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
    else {
        console.log('Install MetaMask')
    }
}

  const uploadToIPFS = async () => {
    const ipfs = await create('http://127.0.0.1:5001/');
    const natCid = await ipfs.dag.put({ 
      owner: accountConnected,
      following: followingAddress,
      signature: signature1
      })
    console.log(natCid)
  }


  const signMessage = async () => {
    const signer = provider.getSigner()
    signature1 = await signer.signMessage("update your list of followings") 
  }




  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(followingAddress);
    await signMessage();
    uploadToIPFS()

    }


  return (
    <div className="App">

    <h4> {"Connect to Metamask using window.ethereum methods"} </h4>
            <button onClick={connectWalletHandler}> {"Connect Wallet"} </button>

      <div className='accountDisplay'>
                <h3> Address: {accountConnected} </h3>
            </div>

      <form onSubmit={handleSubmit}>
        <label> Add new address to your list of friends 
        <input type='text' onChange={(e) => setFollowingAddress(e.target.value)}/>
        </label>
        <input type="submit" value='submit'/>
      </form>
    </div>
  );
}

export default App;





