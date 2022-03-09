export default {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Entries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            topic: {
                type: Sequelize.STRING
            },
            sleep: {
                type: Sequelize.FLOAT
            },
            wc: {
                type: Sequelize.INTEGER
            },
            weight: {
                type: Sequelize.FLOAT
            },
            symptoms: {
                type: Sequelize.TEXT
            },
            workout: {
                type: Sequelize.BOOLEAN
            },
            breakfast: {
                type: Sequelize.TEXT
            },
            lunch: {
                type: Sequelize.TEXT
            },
            snack: {
                type: Sequelize.TEXT
            },
            dinner: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Entries');
    }
};