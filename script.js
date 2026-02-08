let feeData = {};

// JSON読み込み
async function loadFees() {
  const res = await fetch("fees.json");
  feeData = await res.json();
  console.log("feeData:", feeData)
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

  const exitRate = parseFloat(document.getElementById("exitRate").value);
  const exitFee = parseFloat(document.getElementById("exitFee").value);

  // Entry受領額
  const receivedAmount = (entryAmount - entryFee) * entryRate;

  // Exit後金額
  const exitNet = (receivedAmount / exitRate) - exitFee;

  // 損益
  const profit = exitNet - entryAmount;

  // 損益率
  const profitRate = (profit / entryAmount) * 100;

  // ブレークイーブンレート
  const breakEvenRate = receivedAmount / (entryAmount + exitFee);

  // 結果表示
  document.getElementById("receivedAmount").textContent = `Entry受領額: ${receivedAmount.toFixed(2)} ${feeData[pair].quote}`;
  document.getElementById("exitNet").textContent = `現在戻せる金額: ${exitNet.toFixed(2)} ${feeData[pair].base}`;
  document.getElementById("profit").textContent = `損益: ${profit.toFixed(2)} ${feeData[pair].base}`;
  document.getElementById("profitRate").textContent = `損益率: ${profitRate.toFixed(2)} %`;
  document.getElementById("breakEvenRate").textContent = `損益分岐レート: ${breakEvenRate.toFixed(4)} ${feeData[pair].quote}`;
}

// イベント
document.getElementById("calcBtn").addEventListener("click", calculate);

// 初期化
loadFees();
