const openpgp = require('openpgp');
const fs = require('fs');

async function generatePGPKeys() {
    const { privateKey, publicKey } = await openpgp.generateKey({
        userIDs: [{ name: '', email: '' }],
        rsaBits: 2048,
        passphrase: '*******',
    });


    const privateFilePath = 'PATH_FILE_PRIV';
    const publicFilePath = 'PATH_FILE_PUBLIC';

    try {
        fs.writeFileSync(privateFilePath, privateKey);
        fs.writeFileSync(publicFilePath, publicKey);
        console.log('Generated success');
    } catch (error) {
        console.error('Error :', error);
    }

    console.log('PGP RSA de 2048 bits SUCCESS.');
    console.log(`KEY PRIVATE: ${privateKey}`);
    console.log(`KEY PUBLIC: ${publicKey}`);
}

generatePGPKeys()
