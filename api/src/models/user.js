import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your first name',
            },
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your last name',
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your email address',
            },
            unique: {
                args: true,
                msg: 'Email already exists',
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email address',
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg: 'Please enter your password',
            },
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};