import { BrowserProvider, Signer } from "ethers";
import React, { useEffect, useState } from "react";

export function useWalletAccount() {
    const [walletAccount, setWalletAccount] = useState<string>();
  
    useEffect(() => {
       const getWalletAccount = async () => {
        //@ts-ignore
        const walletProvider = new BrowserProvider(window.web3.currentProvider);
        const signer: Signer = await walletProvider.getSigner();
        return signer.getAddress();
      }
      getWalletAccount().then((accounts) => setWalletAccount(accounts))
    }, [])
  
    return walletAccount
  }