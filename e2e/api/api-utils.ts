import { APIRequestContext, request } from "@playwright/test";
import { BASE_URL, API_ENDPOINTS } from "../../config/config";

// Create a new API request context for making HTTP requests
export const createRequestContext = async (): Promise<APIRequestContext> => {
  return request.newContext();
};

// Generate a random password with a mix of character types
export function generateRandomPassword(length = 9): string {
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const specialChars = "@";

  let password = "";
  password += upperCaseChars.charAt(
    Math.floor(Math.random() * upperCaseChars.length)
  );
  password += lowerCaseChars.charAt(
    Math.floor(Math.random() * lowerCaseChars.length)
  );
  password += digits.charAt(Math.floor(Math.random() * digits.length));
  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );

  const allChars = upperCaseChars + lowerCaseChars + digits + specialChars;

  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
}

// Create a new user via API
export async function createUser(
  requestContext: APIRequestContext,
  username: string,
  password: string
) {
  const response = await requestContext.post(
    `${BASE_URL}${API_ENDPOINTS.userCreation}`,
    {
      data: {
        userName: username,
        password: password,
      },
    }
  );

  return response;
}

// Generate an authentication token via API
export async function generateToken(
  requestContext: APIRequestContext,
  username: string,
  password: string
) {
  const response = await requestContext.post(
    `${BASE_URL}${API_ENDPOINTS.tokenGeneration}`,
    {
      data: {
        userName: username,
        password: password,
      },
    }
  );
  const data = await response.json();
  return data.token;
}

// Add books to a user's collection via API
export async function addBooks(
  requestContext: APIRequestContext,
  token: string,
  userId: string,
  isbnList: string[]
) {
  return await requestContext.post(`${BASE_URL}${API_ENDPOINTS.addBooks}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: {
      userId: userId,
      collectionOfIsbns: isbnList.map((isbn) => ({ isbn })),
    },
  });
}

// Remove a book from a user's collection via API
export async function removeBook(
  requestContext: APIRequestContext,
  token: string,
  userId: string,
  isbn: string
) {
  return await requestContext.delete(`${BASE_URL}${API_ENDPOINTS.removeBook}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userId: userId,
      isbn: isbn,
    },
  });
}

// Get user details via API
export async function getUser(
  requestContext: APIRequestContext,
  token: string,
  userId: string
) {
  return await requestContext.get(
    `${BASE_URL}${API_ENDPOINTS.getUser}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
