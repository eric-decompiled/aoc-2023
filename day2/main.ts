import fs from "fs";

const games = fs.readFileSync("./day2/input.txt").toString().split("\n");

const knownCubes: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const answer = games.reduce(
  (answer, game) => {
    let possible = true;

    const mostSeen: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const id = game.match(/\d+/)![0];

    const formatted = game.replace(/Game \d+:/, "").trim();

    const reveals = formatted.split(";");

    reveals.forEach((reveal) => {
      reveal
        .trim()
        .split(",")
        .forEach((seenCube) => {
          const [strNumber, color] = seenCube.trim().split(" ");
          const number = Number(strNumber);

          const previousMax = mostSeen[color];

          if (number > previousMax) {
            mostSeen[color] = number;
          }

          const max = knownCubes[color];
          if (Number(strNumber) > max) {
            possible = false;
          }
        });
    });

    if (possible) {
      answer.part1 += Number(id);
    }

    const power = Object.values(mostSeen).reduce(
      (ans, val) => ans * Number(val),
      1
    );

    answer.part2 += power;

    return answer;
  },
  { part1: 0, part2: 0 }
);

console.log({ answer });
