// ** Faker
import { faker } from "@faker-js/faker";

// ** Bcrypt
import bcrypt from "bcrypt";

import User from "../models/user.js"

export const seedUser = () => {
  const salt = bcrypt.genSaltSync();
  const users = [];

  // Seed 1 admin
  users.push({
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("123456", salt),
    dob: faker.date.birthdate(),

    phoneNumber: faker.phoneNumber.number(),

    role: {
      id: 1,
      name: "Admin",
    },
    isDelete: false,
  });

  // Seed 3 moderator

  users.push({
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("123456", salt),
    dob: faker.date.birthdate(),

    phoneNumber: faker.phoneNumber.number(),

    role: {
      id: 2,
      name: "Manager",
    },
    isDelete: false,
  });


  // Seed 15 member

  users.push({
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("123456", salt),
    dob: faker.date.birthdate(),

    phoneNumber: faker.phoneNumber.number(),

    role: {
      id: 3,
      name: "Staff",
    },
    isDelete: false,
  });


  return User.insertMany(users);
};
