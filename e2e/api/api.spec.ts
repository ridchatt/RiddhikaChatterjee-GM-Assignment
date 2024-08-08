import { test, expect } from "@playwright/test";
import * as apiUtils from "./api-utils";
import { TEST_CONFIG } from "../../config/config";
import { v4 as uuidv4 } from "uuid";
import { generateRandomPassword } from "./api-utils";

const randomUserName = `${uuidv4().replace("-", "")}`;
const randomPassword = generateRandomPassword();

test.describe("User and Book API Tests", () => {
  let userId: string;
  let token: string;

  test.beforeAll(async () => {
    const apiRequestContext = await apiUtils.createRequestContext();

    try {
      // Create a new user and store the userId
      const userResponse = await apiUtils.createUser(
        apiRequestContext,
        randomUserName,
        randomPassword
      );
      console.log(userResponse);
      if (userResponse.status() === 201) {
        const user = await userResponse.json();
        userId = user.userID;
      } else {
        throw new Error(`Failed to create user: ${userResponse.status()}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }

    try {
      // Generate a token for the newly created user
      token = await apiUtils.generateToken(
        apiRequestContext,
        randomUserName,
        randomPassword
      );
    } catch (error) {
      console.error("Error generating token:", error);
      throw error;
    }
  });

  test("Verify user account creation and token generation", async () => {
    expect(userId).toBeDefined();
    expect(token).toBeDefined();
  });

  test("Verify attempt to create a user account without a password should fail", async () => {
    const apiRequestContext = await apiUtils.createRequestContext();
    const randomUserNameNoPassword = `${uuidv4().replace(/-/g, "")}`;
    const response = await apiUtils.createUser(
      apiRequestContext,
      randomUserNameNoPassword,
      ""
    );
    const responseBody = await response.json();
    expect(response.status()).toBe(400);
    expect(responseBody.message).toBe("UserName and Password required.");
  });

  test("Verify user can add a list of books", async () => {
    const apiRequestContext = await apiUtils.createRequestContext();
    const response = await apiUtils.addBooks(
      apiRequestContext,
      token,
      userId,
      TEST_CONFIG.bookIsbns
    );
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.books).toContainEqual({
      isbn: TEST_CONFIG.bookIsbns[0],
    });
  });

  test("Verify user cannot add a book with invalid token", async () => {
    const apiRequestContext = await apiUtils.createRequestContext();
    const response = await apiUtils.addBooks(
      apiRequestContext,
      TEST_CONFIG.invalidToken,
      userId,
      [TEST_CONFIG.bookIsbns[0]]
    );
    expect(response.status()).toBe(401);
  });

  test("Verify user can remove one of the added books", async () => {
    const apiRequestContext = await apiUtils.createRequestContext();
    await apiUtils.addBooks(apiRequestContext, token, userId, [
      TEST_CONFIG.bookIsbns[0],
    ]);
    const getUserResponse = await apiUtils.getUser(
      apiRequestContext,
      token,
      userId
    );
    const userBeforeRemoval = await getUserResponse.json();
    expect(
      userBeforeRemoval.books.map((book: { isbn: string }) => ({
        isbn: book.isbn,
      }))
    ).toContainEqual({ isbn: TEST_CONFIG.bookIsbns[0] });

    const response = await apiUtils.removeBook(
      apiRequestContext,
      token,
      userId,
      TEST_CONFIG.bookIsbns[0]
    );
    expect(response.status()).toBe(204);

    const getUserResponseAfter = await apiUtils.getUser(
      apiRequestContext,
      token,
      userId
    );
    const userAfterRemoval = await getUserResponseAfter.json();
    expect(
      userAfterRemoval.books.map((book: { isbn: string }) => ({
        isbn: book.isbn,
      }))
    ).not.toContainEqual({ isbn: TEST_CONFIG.bookIsbns[0] });
  });

  test("Verify user cannot remove a book that does not exist in their collection", async () => {
    const apiRequestContext = await apiUtils.createRequestContext();

    await apiUtils.addBooks(apiRequestContext, token, userId, [
      TEST_CONFIG.bookIsbns[0],
    ]);

    const nonExistentBookIsbn = TEST_CONFIG.bookIsbns[1];

    const deleteResponse = await apiUtils.removeBook(
      apiRequestContext,
      token,
      userId,
      nonExistentBookIsbn
    );
    expect(deleteResponse.status()).toBe(400);
    const deleteResponseBody = await deleteResponse.json();
    expect(deleteResponseBody.message).toBe(
      "ISBN supplied is not available in User's Collection!"
    );

    const getUserResponseAfter = await apiUtils.getUser(
      apiRequestContext,
      token,
      userId
    );
    expect(getUserResponseAfter.status()).toBe(200);
    const userAfterRemoval = await getUserResponseAfter.json();
    expect(
      userAfterRemoval.books.map((book: { isbn: string }) => ({
        isbn: book.isbn,
      }))
    ).toContainEqual({ isbn: TEST_CONFIG.bookIsbns[0] });
  });
});
