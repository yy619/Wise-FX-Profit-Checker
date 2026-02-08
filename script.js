document.getElementById("calcBtn").addEventListener("click", calculate);

function calculate() {
  const amount = Number(document.getElementById("amount").value);
  const fee = Number(document.getElementById("fee").value);
  const received = Number(document.getElementById("received").value);
  const rate = Number(document.getElementById("rate").value);

  if (!amount || !received || !rate) return;

  // 保有通貨量 = 受領額 / 為替レート
  const foreignAmount = received / rate;

  // 現在価値 = 受領額（今は為替レートで戻す想定）
  const currentValue = foreignAmount * rate;

  // 損益 = 現在価値 - (両替額 + 手数料)
  const profit = currentValue - (amount + fee);

  // 損益分岐レート = (両替額 + 手数料) / foreignAmount
  const breakEven = (amount + fee) / foreignAmount;

  updateUI(foreignAmount, currentValue, profit, breakEven);
}

function updateUI(foreignAmount, currentValue, profit, breakEven) {
  document.getElementById("foreignAmount").textContent = foreignAmount.toFixed(2);
  document.getElementById("currentValue").textContent = currentValue.toFixed(2);

  const profitEl = document.getElementById("profit");
  profitEl.textContent = profit.toFixed(2);
  profitEl.className = profit >= 0 ? "profit" : "loss";

  document.getElementById("breakEven").textContent = breakEven.toFixed(2);
}
