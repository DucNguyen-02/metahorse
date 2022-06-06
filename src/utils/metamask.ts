/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcSigner } from '@ethersproject/providers/lib/json-rpc-provider'
import authApi from 'apis/authApi'
import userApi from 'apis/userApi'
import { ethers } from 'ethers'
import { CurrentUser, PostLoginBody, RequestAccountsError } from 'models'
import { handleAsyncRequest } from './helper'

export function isEthereumWalletInstalled(): boolean {
  return Boolean(window.ethereum)
}

export async function getSigner() {
  const [error] = await handleAsyncRequest(window.ethereum.request({ method: 'eth_requestAccounts' }))

  if (error) throw error

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  return signer
}

export async function getRandomMessage() {
  const [error, randomMessageResponse] = await handleAsyncRequest(authApi.getRandomMessage())

  if (randomMessageResponse) {
    return randomMessageResponse.data.message
  }

  throw error
}

export async function getPostLoginBody(signer: JsonRpcSigner, message: string): Promise<PostLoginBody> {
  const sign = await signer.signMessage(message)
  const address = await signer.getAddress()

  const postLoginBody: PostLoginBody = {
    sign,
    address,
    message
  }

  return postLoginBody
}

export async function getBalance(signer: JsonRpcSigner): Promise<number> {
  const hexBalance = await signer.getBalance()
  const balance = hexBalance.toNumber()

  return balance
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const [currentUserError, currentUserResponse] = await handleAsyncRequest(userApi.getCurrentUserInfo())
  if (!currentUserResponse) throw currentUserError

  const { data: currentUser } = currentUserResponse

  return currentUser
}

export function isRequestAccountsError(candidate: any): candidate is RequestAccountsError {
  return candidate.code === 4001
}
