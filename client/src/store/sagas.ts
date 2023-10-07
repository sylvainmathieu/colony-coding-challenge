import { takeEvery } from 'redux-saga/effects';
import { JsonRpcProvider, Transaction, TransactionResponse, TransactionReceipt, BrowserProvider, Signer } from 'ethers';

import apolloClient from '../apollo/client';
import { Actions } from '../types';
import { SaveTransaction } from '../queries';

function* sendTransaction({ payload }: any) {

  const { sender, recipient, amount } = payload

  // this could have been passed along in a more elegant fashion,
  // but for the purpouses of this scenario it's good enough
  // @ts-ignore
  const walletProvider = new BrowserProvider(window.web3.currentProvider);

  const signer: Signer = yield walletProvider.getSigner();

  const transaction = {
    to: recipient,
    value: BigInt(parseFloat(amount) * 1e18), // Convert ETH to WEI
  };

  try {
    const txResponse: TransactionResponse = yield signer.sendTransaction(transaction);
    const response: TransactionReceipt = yield txResponse.wait();

    const receipt: Transaction = yield response.getTransaction();

    const variables = {
      transaction: {
        gasLimit: (receipt.gasLimit && receipt.gasLimit.toString()) || '0',
        gasPrice: (receipt.gasPrice && receipt.gasPrice.toString()) || '0',
        to: receipt.to,
        from: receipt.from,
        value: (receipt.value && receipt.value.toString()) || '',
        data: receipt.data || null,
        chainId: (receipt.chainId && receipt.chainId.toString()) || '123456',
        hash: receipt.hash,
      }
    };

    yield apolloClient.mutate({
      mutation: SaveTransaction,
      variables,
    });

  } catch (error) {
    console.error(error)
  }

}

export function* rootSaga() {
  yield takeEvery(Actions.SendTransaction, sendTransaction);
}
