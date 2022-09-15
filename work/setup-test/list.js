const path = require("path");

const people = `
Name           |  NEUID   | Slack handle | github username
Zihan Zhao     | 001265988| @U042CMF7F7A | zhao-zihan

`
  .split("\n") // convert to array of lines
  .filter((line) => !!line.replace(/\s/g, "")); // Remove empty lines

if (require.main === module) {
  // Run if we are being run directly

  // List the people
  for (person of people) {
    console.log(person);
  }
}
// If not being run directly, return the text
module.exports = people;
