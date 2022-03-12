import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Board extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Board.belongsTo(models.User, {
                as: 'author',
                onDelete: 'SET NULL',
                foreignKey: "user_id",
            });
            models.User.hasMany(models.Board, { foreignKey: "user_id" });
        }
    };
    Board.init({
        name: DataTypes.STRING,
        goals: DataTypes.TEXT,
        description: {
            type: DataTypes.TEXT,
            allowNull: {
                args: false,
                msg: 'Please enter the description of the entry',
            },
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: {
                args: false,
                msg: 'Please enter the date of the entry',
            },
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: {
                args: false,
                msg: 'Please enter the date of the entry',
            },
        }
    }, {
        sequelize,
        modelName: 'Board',
    });
    return Board;
};