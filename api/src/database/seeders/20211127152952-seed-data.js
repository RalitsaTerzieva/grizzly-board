'use strict';

//https://bootcamp.rocketacademy.co/4-4-backend-structure/4.1-orm-sequelize/4.1.2-sequelize-one-to-many-relationships
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersList = [
      {
        id: 9990,
        first_name: 'user',
        last_name: 'one',
        email: 'user1@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9991,
        first_name: 'user',
        last_name: 'two',
        email: 'user2@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9992,
        first_name: 'user',
        last_name: 'three',
        email: 'user3@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9993,
        first_name: 'user',
        last_name: 'four',
        email: 'user4@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9994,
        first_name: 'user',
        last_name: 'five',
        email: 'user5@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9995,
        first_name: 'user',
        last_name: 'six',
        email: 'user6@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9996,
        first_name: 'user',
        last_name: 'seven',
        email: 'user7@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9997,
        first_name: 'user',
        last_name: 'eight',
        email: 'user8@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9998,
        first_name: 'user',
        last_name: 'nine',
        email: 'user9@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9999,
        first_name: 'user',
        last_name: 'ten',
        email: 'user10@example.com',
        password: '$2b$10$vmu9gVVT5PEtsVuuLhXkruoyvPxDU.fndgE6zAssJpg.bb.HRfgby',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    // Insert users before items because items reference categories
    let users = await queryInterface.bulkInsert(
      'Users',
      usersList,
      { returning: true }
    );

    const entries = [];
    for (let i = 0; i < usersList.length; i++) {
      const user = usersList[i];
      
      const randInt = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      const dates = ['2021-11-01', '2021-11-02', '2021-11-03', '2021-11-04', '2021-11-05', '2021-11-06', '2021-11-07', '2021-11-08', '2021-11-09', '2021-11-10', '2021-11-11', '2021-11-12', '2021-11-13', '2021-11-14', '2021-11-15', '2021-11-16', '2021-11-17', '2021-11-18', '2021-11-19', '2021-11-20', '2021-11-21', '2021-11-22', '2021-11-23', '2021-11-24', '2021-11-25', '2021-11-26', '2021-11-27', '2021-11-28', '2021-11-29', '2021-11-30' ]
      const randLorem = () => lorem.slice(randInt(0, 50), randInt(90, 150));
      for(let i = 0; i < randInt(16, 29); i++) {
        entries.push({
          user_id: user.id,
          date: new Date(dates[i]),
          description: randLorem(),
          topic: randLorem().slice(-25),
          sleep: randInt(3, 9) + parseFloat(`0.${randInt(1, 100)}`),
          wc: randInt(0,5),
          weight: randInt(45, 51) + parseFloat(`0.${randInt(1, 100)}`),
          symptoms: randLorem().slice(-50),
          workout: !!randInt(0, 1),
          breakfast: randLorem().slice(-60),
          lunch: randLorem().slice(-60),
          snack:  randLorem().slice(-60),
          dinner:  randLorem().slice(-60),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    console.log(entries);
    await queryInterface.bulkInsert('Entries', entries, { returning: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Entries', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
