import fs from "fs";

const input = fs.readFileSync("./day1/input.txt").toString().split("\n");

const digitMatcher = /\d/g;

const partOneAnswer = input.reduce((answer, value) => {
  const matches = value.match(digitMatcher);
  const firstDigit = matches ? matches[0] : "";
  const lastDigit = matches ? matches[matches.length - 1] : "";

  const firstNumber = lookup[firstDigit] ?? firstDigit;
  const lastNumber = lookup[lastDigit] ?? lastDigit;

  answer += Number(firstNumber + lastNumber);

  return answer;
}, 0);

const lookup: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const matcher = /\d|one|two|three|four|five|six|seven|eight|nine/g;

const partTwoAnswer = input.reduce((answer, value) => {
  let matches: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(value)) != null) {
    if (match[0]) {
      matches.push(match[0]);
      matcher.lastIndex -= match[0].length - 1; // backup the regex for overlap
    }
  }

  const firstDigit = matches[0] ?? "";
  const lastDigit = matches[matches.length - 1] ?? "";

  const firstNumber = lookup[firstDigit] ?? firstDigit;
  const lastNumber = lookup[lastDigit] ?? lastDigit;

  answer += Number(firstNumber + lastNumber);

  return answer;
}, 0);

console.log({ partOneAnswer, partTwoAnswer });
