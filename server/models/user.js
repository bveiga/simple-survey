'use strict';
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		email: DataTypes.STRING,
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		classMethods: {
			associate: function(models) {
				User.hasMany(models.Response);
			}
		}
	});
	return User;
};
