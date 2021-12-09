import React from "react";
import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";
import { Button } from "react-bootstrap";

export default function Wallet() {
  //State variables
  const [walletAddress, setWallet] = useState("");

  //called only once
  useEffect(async () => {
    const { address } = await getCurrentWalletConnected();

    setWallet(address);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
        }
      });
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };

  return (
    <div>
      <Button size="sm" id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </Button>
    </div>
  );
}