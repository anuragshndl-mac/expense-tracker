// ==========================================================
//  Expense Tracker - script.js
//  Read this file top to bottom. Each section has a comment
//  explaining what it does and why.
// ==========================================================


// ---------- 1. GRAB ELEMENTS FROM THE PAGE ----------
// JavaScript can't change the page until it has "found" the elements.
// document.getElementById("x") finds the element whose id="x" in index.html.
const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");
const emptyMessage = document.getElementById("empty-message");
const filterCategory = document.getElementById("filter-category");
const chartCanvas = document.getElementById("category-chart");


// ---------- 2. DATA ----------
// All expenses live in this array. Each expense is an object like:
// { id: 1731360000000, title: "Lunch", amount: 120, category: "Food", date: "2026-11-12" }
let expenses = loadExpenses();

// Will hold the Chart.js chart so we can destroy and redraw it.
let chart = null;


// ---------- 3. SAVING AND LOADING (localStorage) ----------
// localStorage is a small storage space inside the browser.
// It only stores text, so we convert the array to text with JSON.stringify
// and back to an array with JSON.parse.
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
  const saved = localStorage.getItem("expenses");
  // If nothing is saved yet (first visit), start with an empty array.
  return saved ? JSON.parse(saved) : [];
}


// ---------- 4. ADD AN EXPENSE ----------
// This runs when the form is submitted (button click or pressing Enter).
form.addEventListener("submit", function (event) {
  // By default a form reloads the page. We stop that.
  event.preventDefault();

  const title = titleInput.value.trim(); // trim() removes extra spaces
  const amount = Number(amountInput.value); // inputs give text, so convert to number
  const category = categoryInput.value;
  const date = dateInput.value;

  // Validation: don't accept bad data.
  if (title === "" || amount <= 0 || category === "" || date === "") {
    alert("Please fill all fields with valid values.");
    return;
  }

  // Create the expense object.
  const expense = {
    id: Date.now(), // current time in milliseconds: unique enough to use as an id
    title: title,
    amount: amount,
    category: category,
    date: date,
  };

  expenses.push(expense); // add to the array
  saveExpenses();         // save to localStorage
  render();               // redraw the page

  form.reset();           // clear the form
  setTodayAsDefaultDate();
});


// ---------- 5. DELETE AN EXPENSE ----------
function deleteExpense(id) {
  // filter() builds a NEW array keeping only items where the condition is true.
  // So we keep every expense whose id is NOT the one we want to delete.
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  saveExpenses();
  render();
}


// ---------- 6. FILTER ----------
// Returns the expenses that should currently be shown.
function getVisibleExpenses() {
  const selected = filterCategory.value;

  if (selected === "all") {
    return expenses;
  }
  return expenses.filter(function (expense) {
    return expense.category === selected;
  });
}


// ---------- 7. TOTAL ----------
// reduce() walks through the array and combines everything into one value.
// 'sum' starts at 0, and for each expense we add its amount.
function calculateTotal(items) {
  return items.reduce(function (sum, expense) {
    return sum + expense.amount;
  }, 0);
}


// ---------- 8. CHART ----------
function updateChart(items) {
  // If Chart.js failed to load (e.g. no internet), skip the chart quietly.
  if (typeof Chart === "undefined") {
    return;
  }

  // Add up the amount for each category: { Food: 300, Travel: 120, ... }
  const totals = {};
  items.forEach(function (expense) {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
  });

  // A chart that already exists must be destroyed before drawing a new one.
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(chartCanvas, {
    type: "doughnut",
    data: {
      labels: Object.keys(totals),
      datasets: [{ data: Object.values(totals) }],
    },
  });
}


// ---------- 9. SHOW EVERYTHING ON THE PAGE ----------
// render() is the most important function. Whenever data changes,
// we call render() and it redraws the whole list, total and chart.
function render() {
  const visible = getVisibleExpenses();

  // Newest date first. (Copy with [...visible] so we don't change the original order.)
  const sorted = [...visible].sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  list.innerHTML = ""; // clear the old list

  sorted.forEach(function (expense) {
    // Build one <li> for each expense.
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "expense-info";

    const titleEl = document.createElement("strong");
    titleEl.textContent = expense.title; // textContent is safe (no HTML injection)

    const detailEl = document.createElement("small");
    detailEl.textContent = expense.category + " · " + expense.date;

    info.appendChild(titleEl);
    info.appendChild(detailEl);

    const right = document.createElement("div");
    right.className = "expense-right";

    const amountEl = document.createElement("span");
    amountEl.textContent = "₹" + expense.amount;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteExpense(expense.id);
    });

    right.appendChild(amountEl);
    right.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(right);
    list.appendChild(li);
  });

  totalEl.textContent = "₹" + calculateTotal(visible);

  // Show the "no expenses" message only when the list is empty.
  emptyMessage.style.display = visible.length === 0 ? "block" : "none";

  updateChart(visible);
}


// ---------- 10. SMALL HELPERS AND START-UP ----------
// Pre-fill the date box with today's date (format YYYY-MM-DD).
function setTodayAsDefaultDate() {
  dateInput.value = new Date().toLocaleDateString("en-CA");
}

// When the filter dropdown changes, redraw the page.
filterCategory.addEventListener("change", render);

// Runs once when the page opens.
setTodayAsDefaultDate();
render();