document.getElementById("calcBtn").addEventListener("click", calculate);

// 手数料率（0.45%）
const feeRate = 0.0045;

function calculate() {
  const amount = Number(document.getElementById("amount").value);
  const rate = Number(document.getElementById("rate").value);

  if (!amount || !rate) {
    alert("両替額と為替レートを入力してください");
    return;
  }

  // 手数料を計算（元通貨ベース）
  const fee = amount * feeRate;

  // 受領額 = (両替額 - 手数料) * 為替レート
  const received = (amount - fee) * rate;

  // 損益分岐レート = (両替額 + 手数料) / 両替額 * 為替レート
  const breakEven = ((amount + fee) / amount) * rate;

  updateUI(received, breakEven);
}

function updateUI(received, breakEven) {
  document.getElementById("received").textContent = received.toFixed(2);
  document.getElementById("breakEven").textContent = breakEven.toFixed(2);
}
