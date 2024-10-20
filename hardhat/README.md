# CryptoBASO - Crypto Buy and Sell Orders

Create a .env file and copy the line below, replacing `<private-key>` with your SKALE testnet private key:
`SKALE_PRIVATE_KEY = "<private-key>"`

To run deploy the contracts and server, change your directory to the hardhat folder. If you want to deploy on local hardhat node, run `npx harhat node` and then `npx hardhat run scripts/server.js --network localhost`

If you want to deploy on SKALE network, run `npx hardhat run scripts/server.js --network skale`
