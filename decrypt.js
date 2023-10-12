const openpgp = require('openpgp');
const fs = require('fs');

async function decryptKey() {

    const publicKeyArmored = fs.readFileSync('PATH_FILE_PUBLIC', 'utf8');
    const privateKeyArmored = fs.readFileSync('PATH_FILE_PRIV', 'utf8');
    const passphrase = '*******';

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

    const privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
        passphrase
    });

    const encryptedAndSignedMessage = fs.readFileSync('./encrypt-demo.txt', 'utf8');

    const message = await openpgp.readMessage({
        armoredMessage: encryptedAndSignedMessage
    });

    const { data: decrypted, signatures } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey,
        expectSigned: true,
        verificationKeys: publicKey,
    });

    console.log(decrypted);
}

decryptKey()
