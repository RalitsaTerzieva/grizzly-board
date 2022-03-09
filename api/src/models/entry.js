import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Entry extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Entry.belongsTo(models.User, {
                as: 'author',
                onDelete: 'SET NULL',
                foreignKey: "user_id",
            });
            models.User.hasMany(models.Entry, { foreignKey: "user_id" });
        }
    };
    Entry.init({
        date: {
            type: DataTypes.DATE,
            allowNull: {
                args: false,
                msg: 'Please enter the date of the entry',
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: {
                args: false,
                msg: 'Please enter the description of the entry',
            },
        },
        topic: DataTypes.STRING,
        sleep: DataTypes.FLOAT,
        wc: DataTypes.INTEGER,
        weight: DataTypes.FLOAT,
        symptoms: DataTypes.TEXT,
        workout: DataTypes.BOOLEAN,
        breakfast: DataTypes.TEXT,
        lunch: DataTypes.TEXT,
        snack: DataTypes.TEXT,
        dinner: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Entry',
    });
    return Entry;
};