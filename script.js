document.getElementById("calcBtn").addEventListener("click", calculate);

function calculate() {
  const amount = Number(document.getElementById("amount").value);
  const fee = Number(document.getElementById("fee").value);
  const rate = Number(document.getElementById("rate").value);

  if (!amount || !rate) {
    alert("両替額と為替レートを入力してください");
    return;
  }

  // 受領額 = (両替額 * 為替レート) - 手数料換算
  const received = (amount * rate) - (fee * rate); // 手数料も元通貨ベース

  // 損益分岐レート = (両替額 + 手数料) / 両替額 * 為替レート
  const breakEven = ((amount + fee) / amount) * rate;

  updateUI(received, breakEven);
}

function updateUI(received, breakEven) {
  document.getElementById("received").textContent = received.toFixed(2);
  document.getElementById("breakEven").textContent = breakEven.toFixed(2);
}
