/* eslint-disable import/no-anonymous-default-export */
import { getToken } from "next-auth/jwt"
import { getDb } from '../../lib/db'
import { getProvider } from '../../lib/provider'
import * as ethers from 'ethers'

const { Interface } = ethers.utils
const FactoryInterface = new Interface(require('../../contracts/artifacts/src/contracts/WalletFactory.sol/WalletFactory.json').abi)
const BatcherInterface = new Interface(require('../../contracts/artifacts/src/contracts/Batcher.sol/Batcher.json').abi)

const identityFactoryAddr = process.env.WALLET_FACTORY_ADDRESS
const baseIdentityAddr = process.env.BASE_WALLET_ADDRESS
const quickAccManager = process.env.MANAGER_ADDRESS
const batcherAddr = process.env.BATCHER_ADDRESS
const quickAccTimelock = process.env.MANAGER_TIMELOCK
const rpcUrl = process.env.RPC_URL

const walletsCol = getDb().collection('wallets')
const provider = getProvider(rpcUrl, 'Sepolia', 11155111)

export default async (req, res) => {
    const { frontendKeyAddress, socialHandle, socialHandleType, socialToken } = req.body

    const wallets = await walletsCol.find({ socialHandle, socialHandleType}).toArray()
    if (wallets.length === 0) {
		res.status(404).json({ success: false, message: 'Invalid social handle.' })
		return
	}

    const wallet = wallets[0]

    // TODO:

    // validate social_token against social_handle

    // change FrontendKey of wallet

    // deploy contract to receiver wallet address
    const deployTxn = [identityFactoryAddr, 0, FactoryInterface.encodeFunctionData('deploy', [wallet.bytecode, wallet.salt])]
    // TODO: change key txn
    const keyTxn = [
        //
    ]
    const batch = [deployTxn, keyTxn]
	const batcherTxn = {
        to: batcherAddr,
        data: BatcherInterface.encodeFunctionData('batchCall', [batch])
    }

    // TODO: send txn
    const backendWallet = new ethers.Wallet(process.env.BACKEND_PRIVATE_KEY, provider)
    const txn = await backendWallet.sendTransaction(batcherTxn)
        .then(async res => {
            // res.hash
        })
        .catch(error => {
            //
        })

    // // handle txn mine
    // await txn.wait()
    //     .then(async res => {
    //         // res.transactionHash
    //     })
    //     .catch(error => {
    //         //
    //     })

    res.status(200).json({
        success: true,
        session: await getToken({ req }),
    })
}