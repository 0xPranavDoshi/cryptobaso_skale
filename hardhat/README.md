# CryptoBASO - Crypto Buy and Sell Orders

Create a .env file and copy the line below, replacing `<private-key>` with your SKALE testnet private key:
`SKALE_PRIVATE_KEY = "<private-key>"`

To run deploy the contracts and server, change your directory to the hardhat folder. If you want to deploy on local hardhat node, run `npx harhat node` and then `npx hardhat run scripts/server.js --network localhost`

If you want to deploy on SKALE network, run `npx hardhat run scripts/server.js --network skale`

When redeploying the script, you will probably want to delete the hardhat/ignition/deplyoments folder because hardhat keeps track of previously deployed contracts, meaning you aren't actually redploying anything when you run it again.

SKALE network:
Token address:  0x26cF7F3B9299078706faE762974286CfA870A11e
Dex address:  0xB2b39e11Eb27994eB1E8b5e19Ea3A6A1F7028835
Orderbook address:  0x7eEd47faDc7d8D086443BD5e0F8eb02a83CD4890