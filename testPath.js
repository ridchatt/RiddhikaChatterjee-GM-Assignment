const path = require("path");
const fs = require("fs");

const dataPath =
  "C:/Users/raha/Desktop/RiddhikaChatterjee-GM-Assignment/data.json";
console.log(`Resolved path: ${dataPath}`);

try {
  const rawData = fs.readFileSync(dataPath, "utf-8");
  console.log("File content:", rawData);
} catch (error) {
  console.error("Error reading file:", error);
}
