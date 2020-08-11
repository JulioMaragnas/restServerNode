const hashJS = require('hash.js');

function EncryptAdapter(password){
  const thisPassword = password;
  function Encrypt(password) {
    return hashJS.sha256().update(password).digest('hex');
  }
  
  this.CompareEncryptedPassword = (password) => {
    return Encrypt(password).indexOf(thisPassword) >= 0;
  }
}


module.exports = {
  EncryptAdapter
};
