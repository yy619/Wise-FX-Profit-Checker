let feeData = {};

// JSON読み込み
async function loadFees() {
  const res = await fetch("fees.json");
  feeData = await res.json();
  console.log("feeData:", feeData);
  populatePairs();
}

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

  // 1. Entry受領額
  const receivedAmount = (entryAmount - entryFee) * entryRate;

  // 2. 利益が出るレート（ブレークイーブン）
  const breakEvenRate = entryAmount / receivedAmount;

  // 3. 計算額（手数料を引いた額）と式
  const calcAmount = receivedAmount * breakEvenRate;

  // 結果表示
  document.getElementById("receivedAmount").textContent =
    `Entry受領額: ${receivedAmount.toFixed(2)} ${feeData[pair].quote}`;

  document.getElementById("breakEvenRate").textContent =
    `利益が出るレート: ${breakEvenRate.toFixed(4)} ${feeData[pair].quote}/${feeData[pair].base}`;

  document.getElementById("calcAmount").textContent =
    `計算額: ${calcAmount.toFixed(2)} (${receivedAmount.toFixed(2)} × ${breakEvenRate.toFixed(4)})`;
}

// イベント
document.getElementById("calcBtn").addEventListener("click", calculate);

// 初期化
loadFees();
