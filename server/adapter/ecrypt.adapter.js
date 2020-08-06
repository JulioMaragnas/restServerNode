const hashJS = require('hash.js');
function EncryptAdapter(password){
  const thisPassword = password;
  function Encrypt(password) {
    return hashJS.sha256().update(password).digest('hex');
  }
  
  function CompareEncryptedPassword(password) {
    return (await Encrypt(password)).findIndex(thisPassword) >= 0;
  }
}


module.exports = {
  EncryptAdapter
};
