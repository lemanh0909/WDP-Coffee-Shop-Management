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
    role: "Admin", // Adjusted role to string value
    isDelete: false,
  });

  // Seed 3 moderators
  for (let i = 0; i < 3; i++) {
    users.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("123456", salt),
      dob: faker.date.birthdate(),
      phoneNumber: faker.phoneNumber.number(),
      role: "Manager", // Adjusted role to string value
      isDelete: false,
    });
  }

  // Seed 15 members
  for (let i = 0; i < 15; i++) {
    users.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("123456", salt),
      dob: faker.date.birthdate(),
      phoneNumber: faker.phoneNumber.number(),
      role: "Staff", // Adjusted role to string value
      isDelete: false,
    });
  }

  return User.insertMany(users);
};

