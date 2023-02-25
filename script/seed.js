/* eslint-disable no-unused-vars */
const addAudience = require("./injectAudienceStats");
("use strict");

const database = require("../dist/db");

const db = database.default.db;
const { User, Interest, Question, Company, Category } = database.default.models;
const csvParser = require("./csv");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const {
    user_seed_data,
    question_seed_data,
    company_seed_data,
    category_seed_data,
  } = require("./seed_data");

  const myDB = {
    users: (() =>
      user_seed_data.map((user) => {
        const { f, l, r, a } = user;
        return {
          firstName: f,
          lastName: l,
          email: `${f + l}@kollektor.app`,
          password: "U?3w2a9qJ?XZ39n",
          limit: 5,
          role: r,
        };
      }))(),
    questions: (() =>
      question_seed_data.map((question) => {
        return {
          ...question,
        };
      }))(),
    companies: (() =>
      company_seed_data.map((company) => {
        return {
          ...company,
        };
      }))(),
    categories: (() =>
      category_seed_data.map((category) => {
        return {
          ...category,
        };
      }))(),
  };
  const { users, questions, companies, categories } = myDB;

  //Create Users in Database
  const allUsers = await User.bulkCreate(users, {
    returning: true,
  });

  //Create Companies in Database
  const allCompanies = await Company.bulkCreate(companies, {
    returning: true,
  });

  //Create Users in Database
  const allCategories = await Category.bulkCreate(categories, {
    returning: true,
  });

  //Create Questions in Database
  const allQuestions = await Question.bulkCreate(questions, {
    returning: true,
  });

  user.__proto__;
  // //Parse Interests from CSV
  // const interests = await csvParser();
  // //Create Interests in Database
  // const allInterests = await Interest.bulkCreate(interests, {
  //   returning: true,
  // });
  // const getRandomSet = () => {
  //   let randomInts = new Set();
  //   for (let i = 0; i < 40; i++) {
  //     const randomInt = Math.floor(Math.random() * allInterests.length - 1);
  //     randomInts.add(randomInt);
  //   }
  //   return [...randomInts];
  // };

  const [admin, user] = allUsers;

  const token = user.createToken();
  console.log({ token });
  // const [company1, company2, company3] = allCompanies;

  // const [category1, category2, category3] = allCategories;

  // await user.addCompanies([company1, company2]);
  // await company1.setCategory(category1);
  // await company2.setCategory(category2);
  // await company3.setCategory(category3);

  // const [q1, q2, q3, q4] = allQuestions;
  // await company1.addQuestion(q1);
  // await company2.addQuestion([q2, q3]);
  // await company3.addQuestion(q4);
  // for (const question of allQuestions) {
  //   for (const interestIndex of getRandomSet()) {
  //     await question.addInterest(allInterests[interestIndex]);
  //   }
  // }
  // await q1.addInterests(allInterests);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
    // await addAudience();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
