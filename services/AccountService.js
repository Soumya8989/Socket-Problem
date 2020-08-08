let AccountModel = require('../models/Account_Schema');
let q = require('q');

function AccountService() {



	function findAccountDetails(user_id) {
		var deferred = q.defer();
		AccountModel.findOne({ '_id': user_id }).then(function (result) {
			deferred.resolve(result);
		}).catch(function (error) {
			deferred.reject(error)
		})
		return deferred.promise;
	}



	return {

		findAccountDetails: findAccountDetails,

	}
};

module.exports = AccountService();