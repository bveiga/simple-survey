'use strict';
module.exports = function(sequelize, DataTypes) {
	var Question = sequelize.define('Question', {
		text: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Question.hasMany(models.Answer);
				Question.hasMany(models.Response);
			}
		}
	});
	return Question;
};