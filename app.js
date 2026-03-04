function calculateKokuho() {
  const income = Number(document.getElementById("income").value);
  const dependents = Number(document.getElementById("dependents").value);

  if (!income) {
    alert("所得を入力してください");
    return;
  }

  // 簡易計算（テスト用）
  const base = income * 0.1;
  const perPerson = dependents * 20000;

  const total = Math.floor(base + perPerson);

  document.getElementById("result").innerText =
    "年間国保目安: " + total.toLocaleString() + " 円";
}
