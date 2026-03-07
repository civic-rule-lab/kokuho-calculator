const elIncome = document.getElementById("income");
const elInsured = document.getElementById("insuredCount");
const elCare = document.getElementById("careCount");
const btn = document.getElementById("calcBtn");

const elAnnual = document.getElementById("annual");
const elMonthly = document.getElementById("monthly");
const elBreakdown = document.getElementById("breakdown");

const BASIC_DEDUCTION = 430000;
const INCOME_RATE = 0.06;
const PER_CAPITA = 20000;
const CARE_PER_CAPITA = 12000;

function yen(n){
  return Math.round(n).toLocaleString("ja-JP") + " 円";
}

function resetResult(){
  elAnnual.textContent = "—";
  elMonthly.textContent = "—";
  elBreakdown.textContent = "—";
}

function calc(){
  const income = Number(elIncome.value || 0);
  const insured = Number(elInsured.value || 0);
  const care = Number(elCare.value || 0);

  if (insured <= 0) {
    resetResult();
    elBreakdown.textContent = "国保人数（被保険者数）は1人以上を入力してください。";
    return;
  }

  if (care < 0 || care > insured) {
    resetResult();
    elBreakdown.textContent = "介護分の対象人数は、0以上かつ被保険者数以下で入力してください。";
    return;
  }

  const taxable = Math.max(0, income - BASIC_DEDUCTION);
  const incomePart = taxable * INCOME_RATE;
  const perCapitaPart = insured * PER_CAPITA;
  const carePart = care * CARE_PER_CAPITA;

  const annual = incomePart + perCapitaPart + carePart;
  const monthly = annual / 12;

  elAnnual.textContent = yen(annual);
  elMonthly.textContent = yen(monthly);

  elBreakdown.textContent =
`【入力】
総所得金額等（世帯合計の目安）：${income.toLocaleString()} 円
被保険者数：${insured} 人
介護分対象人数（40〜64歳）：${care} 人

【計算（簡易）】
賦課標準 = max(0, 総所得金額等 - 基礎控除 ${BASIC_DEDUCTION.toLocaleString()} 円)
= ${taxable.toLocaleString()} 円

所得割（仮） = 賦課標準 × ${INCOME_RATE * 100}%
= ${yen(incomePart)}

均等割（仮） = 被保険者数 × ${PER_CAPITA.toLocaleString()} 円
= ${yen(perCapitaPart)}

介護分（仮） = 介護分対象人数 × ${CARE_PER_CAPITA.toLocaleString()} 円
= ${yen(carePart)}

合計（年間目安） = ${yen(annual)}
月額目安 = 年間 ÷ 12 = ${yen(monthly)}`;
}

btn.addEventListener("click", calc);

resetResult();
