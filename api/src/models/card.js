import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Card extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Card.belongsTo(models.Column, {
                as: 'column',
                onDelete: 'SET NULL',
                foreignKey: "column_id",
            })
            models.Card.belongsTo(models.User, {
                as: 'author',
                onDelete: 'SET NULL',
                foreignKey: "user_id",
            })
            models.Column.hasMany(models.Card, { foreignKey: "column_id", as: 'cards' });
        }
    };
    Card.init({
       title: DataTypes.STRING,
       index: DataTypes.INTEGER,
       description: {
            type: DataTypes.TEXT,
            allowNull: {
                args: false,
                msg: 'Please enter the description of the entry',
            },
       },
       comment: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Card',
    });
    return Card;
};