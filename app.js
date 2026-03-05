// 茅ヶ崎市 国保電卓（簡易）
// 入力した瞬間に自動計算 + ボタンでも計算

const elResult = document.getElementById("result");
const elIncome = document.getElementById("income");
const elInsured = document.getElementById("insuredCount");
const elCare = document.getElementById("careCount");
const btn = document.getElementById("calcBtn");

const elAnnual = document.getElementById("annual");
const elMonthly = document.getElementById("monthly");
const elBreakdown = document.getElementById("breakdown");

// ---- 設定（いまは仮の係数）----
// ※あなたの今の計算ロジックがあるなら、ここを後で“茅ヶ崎ルール値”に差し替えてOK
const BASIC_DEDUCTION = 430000;      // 基礎控除（簡易）
const INCOME_RATE = 0.06;            // 所得割（仮）
const PER_CAPITA = 20000;            // 均等割（仮）/人
const CARE_PER_CAPITA = 12000;       // 介護分均等割（仮）/人
const MAX_ANNUAL = 99999999;         // 表示の上限（保険料上限を後で実装するならここで制御）

function yen(n) {
  const v = Math.max(0, Math.round(n));
  return v.toLocaleString("ja-JP") + " 円";
}

function toInt(value) {
  if (value === "" || value === null || value === undefined) return NaN;
  const n = Number(value);
  if (!Number.isFinite(n)) return NaN;
  return Math.floor(n);
}

function calc() {
  const income = toInt(elIncome.value);
  const insured = toInt(elInsured.value);
  const care = toInt(elCare.value);

  // 入力が足りないときは表示を戻す
  if (!Number.isFinite(income) || !Number.isFinite(insured) || !Number.isFinite(care)) {
    elAnnual.textContent = "—";
    elMonthly.textContent = "—";
    elBreakdown.textContent = "—";
    return;
  }

  if (insured <= 0) {
    elAnnual.textContent = "—";
    elMonthly.textContent = "—";
    elBreakdown.textContent = "国保の人数（被保険者数）は1以上で入力してください。";
    return;
  }

  if (care < 0 || care > insured) {
    elAnnual.textContent = "—";
    elMonthly.textContent = "—";
    elBreakdown.textContent = "介護分の対象人数は 0〜被保険者数 の範囲で入力してください。";
    return;
  }

  // 簡易：賦課標準（世帯合計に1回だけ基礎控除）
  const taxable = Math.max(0, income - BASIC_DEDUCTION);

  // 仮計算（後で茅ヶ崎の料率/上限/平等割などを追加できる）
  const incomePart = taxable * INCOME_RATE;
  const perCapitaPart = insured * PER_CAPITA;
  const carePart = care * CARE_PER_CAPITA;

  let annual = incomePart + perCapitaPart + carePart;

  // 表示用上限（保険料上限を実装する場合はここで min にする）
  annual = Math.min(MAX_ANNUAL, annual);

  const monthly = annual / 12;

  elAnnual.textContent = yen(annual);
  elMonthly.textContent = yen(monthly);

  elBreakdown.textContent =
`【入力】
総所得金額等（世帯合計の目安）: ${income.toLocaleString()} 円
被保険者数: ${insured} 人
介護分対象人数（40〜64歳）: ${care} 人

【計算（簡易）】
賦課標準 = max(0, 総所得金額等 − 基礎控除 ${BASIC_DEDUCTION.toLocaleString()} 円)
= ${taxable.toLocaleString()} 円

所得割（仮）= 賦課標準 × ${INCOME_RATE * 100}%
= ${yen(incomePart)}

均等割（仮）= 被保険者数 × ${PER_CAPITA.toLocaleString()} 円
= ${yen(perCapitaPart)}

介護分（仮）= 介護分対象人数 × ${CARE_PER_CAPITA.toLocaleString()} 円
= ${yen(carePart)}

合計（年間目安）= ${yen(annual)}
月額目安 = 年間 ÷ 12 = ${yen(monthly)}
`;
}

// 入力中は「ー」に戻して、計算はしない（ボタンの意味を残す）
function resetResult() {
  elAnnual.textContent = "—";
  elMonthly.textContent = "—";
  elBreakdown.textContent = "";
}

// 入力が変わったら結果だけ消す
["input", "change"].forEach(evt => {
  elIncome.addEventListener(evt, resetResult);
  elInsured.addEventListener(evt, resetResult);
  elCare.addEventListener(evt, resetResult);
});

// ボタン押下で計算（これが唯一の計算トリガ）
btn.addEventListener("click", calc);

// 初期表示は空（勝手に計算しない）
resetResult();