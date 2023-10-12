const fs = require('fs');
const openpgp = require('openpgp');

async function encryptAndSignFile() {
  const publicKeyArmored = fs.readFileSync('PATH_FILE_PUBLIC', 'utf8');
  const privateKeyArmored = fs.readFileSync('PATH_FILE_PRIV', 'utf8');
  const passphrase = '*******';
  const fileToEncrypt = fs.readFileSync('PATH_FILE', 'utf8');

  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });


  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: fileToEncrypt }),
    encryptionKeys: publicKey,
    signingKeys: privateKey
  });

  fs.writeFileSync('NAME_FILE_ENCRYPTED', encrypted);
  console.log('SUCCESS');
}

encryptAndSignFile().catch((error) => {
  console.error('Error:', error);
});