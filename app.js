// 茅ヶ崎市 国民健康保険料（令和7年度）簡易計算
// 料率・均等割・平等割・限度額・基礎控除43万円は市FAQに基づく
// https://www.city.chigasaki.kanagawa.jp/faq/1000004/1000042/1000052.html

const RATES = {
  // 所得割率
  incomePct: {
    medical: 0.0666,
    support: 0.0277,
    nursing: 0.0262,
  },
  // 均等割（被保険者1人当たり）
  perCapita: {
    medical: 22432,
    support: 9231,
    nursing: 9485,
  },
  // 平等割（1世帯当たり）
  perHousehold: {
    medical: 27755,
    support: 11421,
    nursing: 8789,
  },
  // 限度額（年）
  caps: {
    medical: 660000,
    support: 260000,
    nursing: 170000,
    total: 1090000,
  },
  basicDeduction: 430000, // 住民税の基礎控除
};

function yen(n){
  return Math.round(n).toLocaleString("ja-JP") + " 円";
}

function floor100(n){
  return Math.floor(n / 100) * 100; // 100円未満切捨て
}

function clampInt(v, min, max){
  const n = Number.parseInt(v, 10);
  if (Number.isNaN(n)) return null;
  if (min != null && n < min) return min;
  if (max != null && n > max) return max;
  return n;
}

function calcSegment(taxBase, insuredCount, nursingCount){
  // 医療
  const medIncome = taxBase * RATES.incomePct.medical;
  const medPerCap = insuredCount * RATES.perCapita.medical;
  const medHouse  = RATES.perHousehold.medical;
  let medical = medIncome + medPerCap + medHouse;
  medical = Math.min(medical, RATES.caps.medical);

  // 支援
  const supIncome = taxBase * RATES.incomePct.support;
  const supPerCap = insuredCount * RATES.perCapita.support;
  const supHouse  = RATES.perHousehold.support;
  let support = supIncome + supPerCap + supHouse;
  support = Math.min(support, RATES.caps.support);

  // 介護（40〜64歳人数のみ）
  const nurIncome = taxBase * RATES.incomePct.nursing;
  const nurPerCap = nursingCount * RATES.perCapita.nursing;
  const nurHouse  = (nursingCount > 0) ? RATES.perHousehold.nursing : 0;
  let nursing = nurIncome + nurPerCap + nurHouse;
  nursing = Math.min(nursing, RATES.caps.nursing);

  return { medical, support, nursing };
}

function calc(){
  const income = Number(document.getElementById("income").value || 0);
  const insuredCount = clampInt(document.getElementById("insuredCount").value, 1, 99);
  const nursingCount = clampInt(document.getElementById("nursingCount").value, 0, 99);

  if (insuredCount == null || nursingCount == null){
    alert("人数を正しく入力してね");
    return;
  }
  if (