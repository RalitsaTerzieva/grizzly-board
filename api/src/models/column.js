import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Column extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Column.belongsTo(models.Board, {
                as: 'board',
                onDelete: 'SET NULL',
                foreignKey: "board_id",
            })
            models.Column.belongsTo(models.User, {
                as: 'author',
                onDelete: 'SET NULL',
                foreignKey: "user_id",
            })
            models.Board.hasMany(models.Column, { foreignKey: "board_id", as: "columns" });
        }
    };
    Column.init({
       index: DataTypes.INTEGER,
       name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Column',
    });
    return Column;
};