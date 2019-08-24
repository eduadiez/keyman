#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ethers = require('ethers');

let randomWallet = ethers.Wallet.createRandom();

let infuraProvider = new ethers.providers.InfuraProvider('rinkeby', "918963fae0a24ff4beafa5f080d659df");

var args = process.argv.slice(2);

console.log(args)
const directoryPath = path.join(__dirname, 'wallets/');

const pass = args[0]
const filename = args[1]
if (pass && filename) {
    try {
        const file = directoryPath + filename
        console.log(file)
        if (fs.existsSync(file)) {
            //file exists
            console.log("file exists")
            ethers.Wallet.fromEncryptedJson(fs.readFileSync(file, 'utf8'), pass).then(function(wallet) {
                console.log("Address: " + wallet.address);
                var connected_wallet = wallet.connect(infuraProvider)
                // "Address: 0x88a5C2d9919e46F883EB62F7b8Dd9d0CC45bc290"
                //infuraProvider.getBalance(wallet.address).then((balance) => {
                // balance is a BigNumber (in wei); format is as a sting (in ether)
                //let etherString = ethers.utils.formatEther(balance);
                //console.log("Balance: " + etherString);
                //});

                let tx = {
                    to: "0x70F264A331a9C3B3248537aCf2470D963be741e3",
                    // ... or supports ENS names
                    // to: "ricmoo.firefly.eth",

                    // We must pass in the amount as wei (1 ether = 1e18 wei), so we
                    // use this convenience function to convert ether to wei.
                    value: ethers.utils.parseEther('0.0001')
                };

                let sendPromise = connected_wallet.sendTransaction(tx);

                sendPromise.then((tx) => {
                    console.log(tx);
                    // {
                    //    // All transaction fields will be present
                    //    "nonce", "gasLimit", "pasPrice", "to", "value", "data",
                    //    "from", "hash", "r", "s", "v"
                    // }
                });
            });
        }
    } catch (err) {
        console.error(err)
    }
} else {

    randomWallet.encrypt(pass).then((wallet) => {
        console.log(wallet)
        fs.writeFile("wallets/0", wallet, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    })
}

