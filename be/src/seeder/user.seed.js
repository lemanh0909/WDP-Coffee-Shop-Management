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
    role: "Admin", 
    isDelete: false,
  });
  // Seed 2 manager
  for (let i = 0; i < 6; i++) {
    users.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("123456", salt),
      dob: faker.date.birthdate(),
      phoneNumber: faker.phoneNumber.number(),
      role: "Manager", 
      isDelete: false,
    });
  }

  // Seed 3 staff
  for (let i = 0; i < 15; i++) {
    users.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("123456", salt),
      dob: faker.date.birthdate(),
      phoneNumber: faker.phoneNumber.number(),
      role: "Staff", 
      isDelete: false,
    });
  }

  return User.insertMany(users);
};

