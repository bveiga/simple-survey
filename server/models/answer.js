'use strict';
module.exports = function(sequelize, DataTypes) {
	var Answer = sequelize.define('Answer', {
		option: DataTypes.INTEGER,
		text: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				// Using additional options like CASCADE etc for demonstration
				// Can also simply do Task.belongsTo(models.User);

				Answer.belongsTo(models.Question, {
					onDelete: 'CASCADE'
				});
			}
		}
	});
	
	return Answer;
};