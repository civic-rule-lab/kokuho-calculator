// ===== ユーティリティ =====
function yen(n){
  return Math.round(n).toLocaleString("ja-JP") + " 円";
}

function toNum(v){
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// ===== ここが「仮の計算ロジック」 =====
// ※あなたが後で「茅ヶ崎市の正しい料率・上限・均等割」等に差し替える前提
function calcAnnual(income, insuredCount, careCount){
  // 仮：基礎控除
  const baseDeduction = 430000;

  // 仮：所得割率（例）
  const incomeRate = 0.06;      // 6%
  const careRate   = 0.02;      // 2%（介護分）

  // 仮：均等割（例）
  const perCapita = 45000;      // 被保険者1人あたり
  const carePerCapita = 16000;  // 介護対象1人あたり

  // 賦課標準（0未満なら0）
  const taxable = Math.max(0, income - baseDeduction);

  const incomePart = taxable * incomeRate;
  const careIncomePart = taxable * careRate;

  const perCapitaPart = insuredCount * perCapita;
  const carePerCapitaPart = careCount * carePerCapita;

  const annual = incomePart + perCapitaPart + careIncomePart + carePerCapitaPart;

  const breakdown =
`【入力】
総所得金額等: ${income.toLocaleString()} 円
国保人数: ${insuredCount} 人
介護対象(40-64): ${careCount} 人

【計算(仮ロジック)】
賦課標準 = max(0, 所得 - 430,000) = ${taxable.toLocaleString()} 円

所得割(6%) = ${yen(incomePart)}
均等割(45,000×人数) = ${yen(perCapitaPart)}

介護所得割(2%) = ${yen(careIncomePart)}
介護均等割(16,000×人数) = ${yen(carePerCapitaPart)}

合計(年額) = ${yen(annual)}
月額(年額÷12) = ${yen(annual/12)}
`;

  return { annual, breakdown };
}

// ===== UI =====
const incomeEl = document.getElementById("income");
const insuredEl = document.getElementById("insuredCount");
const careEl = document.getElementById("careCount");
const annualEl = document.getElementById("annual");
const monthlyEl = document.getElementById("monthly");
const breakdownEl = document.getElementById("breakdown");
const btn = document.getElementById("calcBtn");

// 入力した瞬間に自動計算（inputイベント）
function render(){
  const income = toNum(incomeEl.value);
  const insuredCount = Math.max(0, Math.floor(toNum(insuredEl.value)));
  const careCount = Math.max(0, Math.floor(toNum(careEl.value)));

  // 何も入ってない時は — に戻す
  if(!income && !insuredCount && !careCount){
    annualEl.textContent = "—";
    monthlyEl.textContent = "—";
    breakdownEl.textContent = "—";
    return;
  }

  const { annual, breakdown } = calcAnnual(income, insuredCount, careCount);

  annualEl.textContent = yen(annual);
  monthlyEl.textContent = yen(annual / 12);
  breakdownEl.textContent = breakdown;
}

// 入力変化で自動計算
[incomeEl, insuredEl, careEl].forEach(el => {
  el.addEventListener("input", render);
});

// ボタンでも計算できる（保険として残す）
btn.addEventListener("click", render);

// 初期描画
render();