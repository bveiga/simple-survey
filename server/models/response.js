'use strict';
module.exports = function(sequelize, DataTypes) {
	var Response = sequelize.define('Response', {
		option: DataTypes.INTEGER,
		text: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Response.belongsTo(models.User, {
					onDelete: 'CASCADE'
				});

				Response.belongsTo(models.Question, {
					onDelete: 'CASCADE'
				});
			}
		}
	});
	
	return Response;
};