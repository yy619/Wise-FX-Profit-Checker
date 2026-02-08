const inputs = document.querySelectorAll("input, select");

inputs.forEach(el => {
el.addEventListener("input", calculate);
});

function calculate() {

const baseAmount = Number(document.getElementById("baseAmount").value);
const initialRate = Number(document.getElementById("initialRate").value);
const currentRate = Number(document.getElementById("currentRate").value);
const feePercent = Number(document.getElementById("feePercent").value);

if (!baseAmount || !initialRate || !currentRate) return;

const feeRate = feePercent / 100;

// 円 → 外貨
const netAmount = baseAmount * (1 - feeRate);
const foreignAmount = netAmount / initialRate;

// 外貨 → 円
const currentValue = foreignAmount * currentRate * (1 - feeRate);

// 損益
const profit = currentValue - baseAmount;

// 損益分岐
const breakEven = baseAmount / (foreignAmount * (1 - feeRate));

updateUI(foreignAmount, currentValue, profit, breakEven);
}

function updateUI(foreignAmount, currentValue, profit, breakEven) {

document.getElementById("foreignAmount").textContent =
foreignAmount.toFixed(2);

document.getElementById("currentValue").textContent =
currentValue.toFixed(2);

const profitEl = document.getElementById("profit");
profitEl.textContent = profit.toFixed(2);

profitEl.className = profit >= 0 ? "profit" : "loss";

document.getElementById("breakEven").textContent =
breakEven.toFixed(2);
}
