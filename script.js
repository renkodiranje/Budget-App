//dom

let time = document.getElementById("currentTimeSpan");
let valueBudgetHeader = document.getElementById("valueBudget");
let signBudgetHeader = document.getElementById("signBudget");
let incomeValueHeader = document.getElementById("incomeValue");
let incomeValueSignHeader = document.getElementById("incomeValueSign");
let expensessValueHeader = document.getElementById("expensessValue");
let expensessValueSignHeader = document.getElementById("expensessValueSign");
let expensessPercentageHeader = document.getElementById("expensessPercentage");
let select = document.getElementById("select");
let optionPlus = document.getElementById("plus");
let optionMinus = document.getElementById("minus");
let buttonImage = document.getElementById("image");
let description = document.getElementById("description");
let number = document.getElementById("number");
let addCase = document.getElementById("image");
let tableIncome = document.getElementById("tableIncome");
let tableExpensess = document.getElementById("tableExpensess");
let form = document.getElementById("form");

//add curent month and year

let currentTime = new Date();
let month = currentTime.getMonth();
let nameMonth = currentTime.toLocaleString("en-US", { month: "long" });

let year = currentTime.getFullYear();
time.textContent += nameMonth + " " + year + ":";

//local storage

let arrIncome = JSON.parse(localStorage.getItem("listOfIncome")) || [];

let arrExpenses = JSON.parse(localStorage.getItem("listOfExpenses")) || [];

//calculation for header

function calculation() {
  let sumIncome = 0;
  let sumExpencess = 0;

  //sum income

  for (let i = 0; i < arrIncome.length; i++) {
    sumIncome += Number(arrIncome[i][1]);
  }
  console.log(sumIncome);

  //sum expensess

  for (let i = 0; i < arrExpenses.length; i++) {
    sumExpencess += Number(arrExpenses[i][1]);
  }
  console.log(sumExpencess);

  // budget h3

  let budget = sumIncome - sumExpencess;
  console.log(budget);
  budget = budget.toFixed(2);
  valueBudgetHeader.textContent = budget;

  if (budget > 0) {
    signBudgetHeader.textContent = "+";
  }

  //income field

  if (sumIncome > 0) {
    incomeValueSignHeader.textContent = "+";
  }
  sumIncome = sumIncome.toFixed(2);
  incomeValueHeader.textContent = sumIncome;

  //expensess field

  if (sumExpencess > 0) {
    expensessValueSignHeader.textContent = "-";
  }

  let expensPercent = 0;
  if (sumIncome == 0) {
    expensessPercentageHeader.textContent = "total";
  } else {
    expensPercent = (sumExpencess * 100) / sumIncome;
    expensessPercentageHeader.textContent = expensPercent.toFixed(0) + "%";
  }

  sumExpencess = sumExpencess.toFixed(2);
  expensessValueHeader.textContent = sumExpencess;
}
calculation();

//adding from form to local storage

addCase.addEventListener("click", function () {
  let btnVal = 0;
  let descVal = description.value;
  let numbVal = number.value;
  let sumIncome = 0;
  for (let i = 0; i < arrIncome.length; i++) {
    sumIncome += Number(arrIncome[i][1]);
  }
  if (sumIncome == 0) {
    btnVal = "total";
  } else {
    btnVal = ((numbVal * 100) / sumIncome).toFixed(0);
  }
  if (select.value == "plus" && number.value >= 1) {
    let arrIncom = [];
    arrIncom.push(descVal);
    arrIncom.push(numbVal);
    arrIncome.push(arrIncom);
    localStorage.setItem("listOfIncome", JSON.stringify(arrIncome));
  } else if (select.value == "minus" && numbVal >= 1) {
    let arrExpense = [];
    arrExpense.push(descVal);
    arrExpense.push(numbVal);
    arrExpense.push(btnVal);
    arrExpenses.push(arrExpense);
    localStorage.setItem("listOfExpenses", JSON.stringify(arrExpenses));
  }
});

//print the table

function print() {
  for (let i = 0; i < arrExpenses.length; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let button = document.createElement("button");
    let img = document.createElement("img");
    img.setAttribute("src", "image/button.webp");
    img.setAttribute("alt", "delete");

    let spanMinus = document.createElement("span");
    let spanPercent = document.createElement("span");
    spanMinus.textContent = "-";
    spanPercent.textContent = "%";
    td1.textContent = arrExpenses[i][0];
    td2.textContent = Number(arrExpenses[i][1]).toFixed(2);
    button.textContent = arrExpenses[i][2];

    tr.append(td1);
    td2.prepend(spanMinus);
    button.append(spanPercent);
    td2.append(button);
    tr.append(td2);
    tr.append(img);
    tableExpensess.append(tr);

    //delete

    img.addEventListener("click", (e) => {
      console.log(e.target);
      if (e.target.tagName == "IMG") {
        e.target.parentNode.remove();

        let index = null;
        for (let i = 0; i < arrExpenses.length; i++) {
          if (e.target.parentNode.textContent == arrExpenses[i]) {
            index = i;
          }
        }
        arrExpenses.splice(index, 1);
        console.log(arrExpenses);
        localStorage.setItem("listOfExpenses", JSON.stringify(arrExpenses));
      }
    });
  }
  for (let i = 0; i < arrIncome.length; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let img = document.createElement("img");
    img.setAttribute("src", "image/button.webp");
    img.setAttribute("alt", "delete");

    let spanPlus = document.createElement("span");
    spanPlus.textContent = "+";
    td1.textContent = arrIncome[i][0];
    td2.textContent = Number(arrIncome[i][1]).toFixed(2);
    tr.append(td1);
    td2.prepend(spanPlus);
    tr.append(td2);
    tr.append(img);
    tableIncome.append(tr);

    //delete

    img.addEventListener("click", (e) => {
      console.log(e.target);
      if (e.target.tagName == "IMG") {
        e.target.parentNode.remove();
      }
      let index = 0;
      for (let i = 0; i < arrIncome.length; i++) {
        if (e.target.parentNode.textContent == arrIncome[i]) {
          index = i;
        }
        arrIncome.splice(index, 1);
        localStorage.setItem("listOfIncome", JSON.stringify(arrIncome));
      }
    });
  }
}
print();

// change color of submit button when select option is clicked

function changeSelect() {
  let select = document.getElementById("select");
  let selectedValue = select.value;
  console.log(selectedValue);
  console.log(select.value);
  if (selectedValue == "plus") {
    buttonImage.classList.add("income");
    buttonImage.classList.remove("expensess");
  } else {
    buttonImage.classList.add("expensess");
    buttonImage.classList.remove("income");
  }
}
