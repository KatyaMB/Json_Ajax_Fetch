// Creating an object class
class Income {
    constructor(name, amount, recurring) {
        this.name = name;
        this.amount = amount;
        this.recurring = recurring;
    }
}

// Creating 5 new income instances
let income1 = new Income("Salary", 3000, true);
let income2 = new Income("Property", 1000, true);
let income3 = new Income("Birthday gift", 50, false);
let income4 = new Income("Freelance", 1500, true);
let income5 = new Income("Street money", 10, false);

let allIncome = [income1, income2, income3, income4, income5];

// Corrected to check if the storedAllIncome is not null. This was my misunderstanding.
if (sessionStorage.getItem("storedAllIncome") !== null) {
    // Make the value of storedAllIncome (session storage) the value of allIncome
    allIncome = JSON.parse(sessionStorage.getItem("storedAllIncome"));
}
// Else, store the original allIncome (default 5 items) array into the sessionStorage
else {
    sessionStorage.setItem("storedAllIncome", JSON.stringify(allIncome));
}

// Mapping all the income names, extracting them and joining as a string
// Changed back to allIncome since we defined this value above in the if statement
const incomeNames = allIncome.map(income => income.name).join(', ');

// Displaying income values before the prompts
console.table(allIncome);

try {
    // Asking user to add new object
    let nameEntry = prompt(`Enter income name. Taken names include: ${incomeNames}`);
    if (!nameEntry) {
        throw new Error("You did not enter a value.");
    } else if (incomeNames.split(', ').includes(nameEntry)) {
        throw new Error(`The name "${nameEntry}" is taken.`);
    } else {
        console.log(`The name "${nameEntry}" is available.`);
    }

    let amountEntry = parseFloat(prompt("Enter amount:"));
    if (!amountEntry) {
        throw new Error("You did not enter a value.");
    }

    let recurringEntry = prompt("Is it recurring? (true/false):").toLowerCase() === "true";
    if (recurringEntry === null) {
        throw new Error("You did not enter a value.");
    }

    let nextIncome = new Income(nameEntry, amountEntry, recurringEntry);

    allIncome.push(nextIncome);

    sessionStorage.setItem("storedAllIncome", JSON.stringify(allIncome));

    console.log("Your new income log is: ", allIncome);
} catch (error) {
    console.error(error.message);
}

// Creating an expenses object class
class Expense {
    constructor(nameToo, amountToo, recurringToo) {
        this.nameToo = nameToo;
        this.amountToo = amountToo;
        this.recurringToo = recurringToo;
    }
}

let expense1 = new Expense("Pencils", 5, false);
let expense2 = new Expense("Travel ticket", 200, true);
let expense3 = new Expense("Epson printer", 500, false);
let expense4 = new Expense("Dulux paint", 70, false);
let expense5 = new Expense("Accountant", 250, true);

// Adding them all into an array
let allExpenses = [expense1, expense2, expense3, expense4, expense5];

// Doing the same check for the expenses as we did for the incomes
if (sessionStorage.getItem("storedAllExpense") !== null) {
    allExpenses = JSON.parse(sessionStorage.getItem("storedAllExpense"));
}
// Else, store the original allExpenses (default 5 items) array into the sessionStorage
else {
    sessionStorage.setItem("storedAllExpense", JSON.stringify(allExpenses));
}

// Mapping all the expense names, extracting them and joining as a string
const expenseNames = allExpenses.map(expense => expense.nameToo).join(', ');

console.table(allExpenses);

try {
    // Asking user to add new object
    let nameExpense = prompt(`Enter expense name. Taken names include: ${expenseNames}`);
    if (!nameExpense) {
        throw new Error("You did not enter a value.");
    } else if (expenseNames.split(', ').includes(nameExpense)) {
        throw new Error(`The name "${nameExpense}" is taken.`);
    } else {
        console.log(`The name "${nameExpense}" is available.`);
    }

    let amountExpense = parseFloat(prompt("Enter amount:"));
    if (!amountExpense) {
        throw new Error("You did not enter a value.");
    }

    let recurringExpense = prompt("Is it recurring? (true/false):").toLowerCase() === "true";
    if (recurringExpense === null) {
        throw new Error("You did not enter a value.");
    }

    let nextExpense = new Expense(nameExpense, amountExpense, recurringExpense);

    allExpenses.push(nextExpense);

    sessionStorage.setItem("storedAllExpense", JSON.stringify(allExpenses));

    let sessionIncome = JSON.parse(sessionStorage.getItem("storedAllIncome"));
    let sessionExpenses = JSON.parse(sessionStorage.getItem("storedAllExpense"));

    // Calculating the disposable income then logging all the numbers
    let totalIncome = sessionIncome.reduce((acc, curr) => acc + curr.amount, 0);
    let totalExpense = sessionExpenses.reduce((acc, curr) => acc + curr.amountToo, 0);
    let disposableIncome = totalIncome - totalExpense;

    console.log("Total Income:", totalIncome);
    console.log("Total Expense:", totalExpense);

    // Prompt the disposableIncome value instead of logging it so that the user can see it
    alert("Disposable Income: £" + disposableIncome);

    let savings = parseFloat(prompt("How much would you like to add to your savings?"));

    let finalNumber = disposableIncome - savings;
    alert("You have £" + finalNumber + " in your budget");
    console.log("Savings: ", savings);

    // Prompt the finalNumber value instead of logging it so that the user can see it as well
    alert("Your budget after savings: " + finalNumber);

} catch (error) {
    console.error(error.message);
}