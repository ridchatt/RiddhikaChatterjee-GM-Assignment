import fs from "fs";
import path from "path";

export function getTestData() {
  const dataPath = path.resolve(__dirname, "../data.json");

  const rawData = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(rawData);
}
