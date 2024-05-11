import inquirer from "inquirer";
const randomNumber = Math.floor(10000 + Math.random() * 99000);
let myBalance = 0;
let answer = await inquirer.prompt([
  {
    name: "student",
    type: "input",
    message: "Enter student name",
    validate: function (value) {
      if (value.trim !== "") {
        return true;
      }
      return "Please enter a valid name";
    },
  },
  {
    name: "courses",
    type: "list",
    message: "Select the course you want to enroll in.",
    choices: [
      "JavaScript Course",
      "Python Course",
      "C++ Course",
      "Java Course",
      "Angular Course",
    ],
  },
]);
const courseFees = {
  "JavaScript Course": 10000,
  "Python Course": 20000,
  "C++ Course": 30000,
  "Java Course": 20000,
  "Angular Course": 50000,
};
console.log(`\nCourse Fees: ${courseFees[answer.courses]}/-\n`);
console.log(`Your Balance is: ${myBalance}\n`);
let paymentMethod = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: "Select the payment method you want to use",
    choices: ["Debit Card", "Credit Card", "Net Banking", "Other Wallet"],
  },
  {
    name: "amount",
    type: "input",
    message: "Enter the amount you want to pay in this transaction",
    validate: function (value) {
      if (value.trim() !== "") {
        return true;
      }
      return "Please enter a valid payment amount";
    },
  },
]);
console.log(`\n Your Payment Method is: ${paymentMethod.payment}`);
const tuitionFees = courseFees[answer.courses];
const paymentAmount = parseFloat(paymentMethod.amount);
if (tuitionFees === paymentAmount) {
  console.log(
    `Congratulations! You have successfully paid the tuition fees for this ${answer.courses}.\n`
  );
  let status = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "What would you like to do next?",
      choices: ["View Status", "Exit"],
    },
  ]);
  if (status.select === "View Status") {
    console.log("\n*******Status*******\n");
    console.log(`Student Name: ${answer.student}`);
    console.log(`Student ID: ${randomNumber}`);
    console.log(`Course: ${answer.courses}`);
    console.log(`Tuition Fees Paid: ${paymentAmount}`);
    console.log(`Balance: ${(myBalance += paymentAmount)}`);
  } else {
    console.log("\n Exiting Student Management Student\n");
  }
} else {
  console.log(
    `Sorry, you are not eligible to pay the tuition fees for this ${answer.courses}. Please try again later.\n`
  );
}
