import { config } from "dotenv";
// Load environment variables from .env file
config(); 

export const BASE_URL = process.env.BASE_URL || "https://demoqa.com";
export const API_ENDPOINTS = {
  userCreation: process.env.USER_CREATION_ENDPOINT || "/Account/v1/User",
  tokenGeneration:
    process.env.TOKEN_GENERATION_ENDPOINT || "/Account/v1/GenerateToken",
  addBooks: process.env.ADD_BOOKS_ENDPOINT || "/BookStore/v1/Books",
  removeBook: process.env.REMOVE_BOOK_ENDPOINT || "/BookStore/v1/Book",
  getUser: process.env.GET_USER_ENDPOINT || "/Account/v1/User",
};

export const TEST_CONFIG = {
  bookIsbns: [
    process.env.BOOK_ISBN_1 || "9781449325862",
    process.env.BOOK_ISBN_2 || "9781449331818",
  ],
  invalidToken: process.env.INVALID_TOKEN || "123567846",
};
