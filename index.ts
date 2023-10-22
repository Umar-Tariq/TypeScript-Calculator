#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let output: number = 0;

function operations(number1: number, number2: number, operation: string) {
  if (operation === "Addition") {
    output = number1 + number2;
    console.log("Answer: ", output);
    return output;
  } else if (operation === "Subtraction") {
    output = number1 - number2;
    console.log("Answer: ", output);
    return output;
  } else if (operation === "Multiplication") {
    output = number1 * number2;
    console.log("Answer: ", output);
    return output;
  } else if (operation === "Division") {
    if (number2 === 0) {
      console.log("Answer: Cannot divide by zero");
    } else {
      output = number1 / number2;
      console.log("Answer: ", output);
      return output;
    }
  }
}

function animateMessage() {
  const animationSpeed = 100;
  const message = "Welcome to My Calculator";
  let index = 0;
  const chalkColors = [
    chalk.blue,
    chalk.green,
    chalk.yellow,
    chalk.magenta,
    chalk.cyan,
    chalk.red,
  ];

  function displayCharacter() {
    process.stdout.write(
      chalkColors[index % chalkColors.length](message[index])
    );
    index++;

    if (index < message.length) {
      setTimeout(displayCharacter, animationSpeed);
    } else {
      console.log();
      Calculator();
    }
  }
  displayCharacter();
}

function again(val: number) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "again",
        message: "Do you want to continue?",
      },
    ])
    .then((answers) => {
      if (answers.again === true) {
        inquirer
          .prompt([
            {
              type: "number",
              name: "number1",
              message: chalk.bgCyan("Enter number: "),
            },
            {
              type: "list",
              name: "operation",
              message: chalk.green.bgRedBright("Select operation"),
              choices: [
                "Addition",
                "Subtraction",
                "Multiplication",
                "Division",
              ],
            },
          ])
          .then((answers) => {
            let val2 = operations(val, answers.number1, answers.operation);
            if (val2 !== undefined) {
              again(val2);
            }
          });
      } else {
        console.log(`
             _____________________________
            |  _________________________  |
            | | ANSWER                  | |
                            ${output}  
            | |_________________________| |
            |  _____ _____ _____   _____  |
            | |  7  |  8  |  9  | |  +  | |
            | |_____|_____|_____| |_____| |
            | |  4  |  5  |  6  | |  -  | |
            | |_____|_____|_____| |_____| |
            | |  1  |  2  |  3  | |  *  | |
              |_____|_____|_____| |_____|  
            | |  .  |  0  |  =  | |  /  | |
            | |_____|_____|_____| |_____| |
            |_____________________________|
            `);

        console.log("Thank you for using our calculator");
      }
    });
}

function Calculator() {
  inquirer
    .prompt([
      {
        type: "number",
        name: "number1",
        message: chalk.bgCyan("Enter first number: "),
      },
      {
        type: "list",
        name: "operation",
        message: chalk.green("Select operation"),
        choices: ["Addition", "Subtraction", "Multiplication", "Division"],
      },
      {
        type: "number",
        name: "number2",
        message: chalk.green.bgRedBright("Select operation"),
      },
    ])
    .then((answers) => {
      let num = operations(answers.number1, answers.number2, answers.operation);
      if (num !== undefined) {
        again(num);
      }
    });
}

animateMessage();
