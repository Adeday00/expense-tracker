// DOM Elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const expenseChartCanvas = document.getElementById('expense-chart');

// Expenses Array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Add Expense
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('expense-name').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const category = document.getElementById('expense-category').value;

  const expense = { name, amount, category, date: new Date().toISOString() };
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  renderExpenses();
  renderChart();

  expenseForm.reset();
});

// Render Expenses
function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('div');
    expenseItem.className = 'expense-item';
    expenseItem.innerHTML = `
      <span>${expense.name} (${expense.category})</span>
      <span>$${expense.amount.toFixed(2)}</span>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
  });
}

// Delete Expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
  renderChart();
}

// Render Chart
function renderChart() {
  const categories = {};
  expenses.forEach((expense) => {
    categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
  });

  const chartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  new Chart(expenseChartCanvas, {
    type: 'pie',
    data: chartData,
  });
}

// Initialize App
renderExpenses();
renderChart();
