
const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({

  account_name: {
    type: String
  },

  account_password: {
    type: String
  },

  account_balance: {
    type: String
  }

});
module.exports = mongoose.model('account_schema', AccountSchema);
