// 通貨ペアを直接JSに書く
const feeData = {
  "CAD-JPY": { base: "CAD", quote: "JPY" },
  "JPY-CAD": { base: "JPY", quote: "CAD" }
};

// 通貨ペア選択肢生成
function populatePairs() {
  const select = document.getElementById("pairSelect");
  Object.keys(feeData).forEach(pair => {
    const option = document.createElement("option");
    option.value = pair;
    option.textContent = pair;
    select.appendChild(option);
  });
}

// 計算ロジック
function calculate() {
  const pair = document.getElementById("pairSelect").value;
  const entryAmount = parseFloat(document.getElementById("entryAmount").value);
  const entryFee = parseFloat(document.getElementById("entryFee").value);
  const entryRate = parseFloat(document.getElementById("entryRate").value);

  if (isNaN(entryAmount) || isNaN(entryFee) || isNaN(entryRate)) return;

  const receivedAmount = (entryAmount - entryFee) * entryRate;
  const breakEvenRate = entryAmount / receivedAmount;
  const calcAmount = receivedAmount * breakEvenRate;

  document.getElementById("receivedAmount").textContent =
    `Entry受領額: ${receivedAmount.toFixed(2)} ${feeData[pair].quote}`;
  document.getElementById("breakEvenRate").textContent =
    `利益が出るレート: ${breakEvenRate.toFixed(4)} ${feeData[pair].quote}/${feeData[pair].base}`;
  document.getElementById("calcAmount").textContent =
    `計算額: ${calcAmount.toFixed(2)} (${receivedAmount.toFixed(2)} × ${breakEvenRate.toFixed(4)})`;
}

document.getElementById("calcBtn").addEventListener("click", calculate);

// 初期化
populatePairs();
