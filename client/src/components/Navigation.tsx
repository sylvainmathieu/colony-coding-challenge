import React, { useCallback, useState } from 'react';
import Onboard, { WalletState } from '@web3-onboard/core'
import SendTransaction from './SendTransaction';

import injectedModule from '@web3-onboard/injected-wallets'
const injected = injectedModule()

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: 1337,
      token: 'ETH',
      label: 'Local Ganache',
      rpcUrl: 'http://localhost:8545',
    },
  ],
  appMetadata: {
    name: 'My app',
    description: 'Great app',
    recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }],
  }
})

const Navigation: React.FC = () => {
  const [wallet, setWallet] = useState<WalletState>();

  const handleConnect = useCallback(async () => {
    const wallets = await onboard.connectWallet();

    const [metamaskWallet] = wallets;

    if (metamaskWallet && metamaskWallet.label === 'MetaMask' && metamaskWallet.accounts[0].address) {
      setWallet(metamaskWallet);
    }
  }, []);

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-ful text-sm py-4 bg-gray-800">
      <nav className="max-w-[85rem] w-full mx-auto px-4 flex items-center justify-between flex-col md:flex-row gap-2 md:gap-0">
        <div className="flex items-center justify-between">
          <a className="flex-none text-xl font-semibold dark:text-white" href=".">Transactions List</a>
        </div>
        <div className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-end md:mt-0 md:pl-5">
            {wallet && (
              <>
                <SendTransaction />
                <p className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-200 text-sm">
                  {wallet.accounts[0].address}
                </p>
              </>
            )}
            {!wallet && <button type="button" onClick={handleConnect} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-200 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all text-sm">
              Connect Wallet
            </button>}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
