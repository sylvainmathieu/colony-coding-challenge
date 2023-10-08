import { JsonRpcProvider } from "ethers";
import React, { useEffect, useState } from "react";

export function useRecipientAccounts() {
    const [recipientAccounts, setRecipientAccounts] = useState<Array<{ address: string }>>([]);
  
    useEffect(() => {
      const getRecipientAccounts = async () => {
        const provider = new JsonRpcProvider('http://localhost:8545');
        return await provider.listAccounts();
      }
      getRecipientAccounts().then((accounts) => setRecipientAccounts(() => accounts))
    }, [])
  
    return recipientAccounts
  }