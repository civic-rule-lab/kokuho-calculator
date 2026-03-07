function showResults(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  list.forEach(city => {
    const li = document.createElement("li");

    let link = "";
    if (city.cityId === "chigasaki") {
      link = "./chigasaki-kokuho.html";
    }

    if (link) {
      li.innerHTML = `
        <a href="${link}" class="result-link">
          <div class="result-city">${city.cityName}（${city.prefecture}）</div>
          <div class="muted">国民健康保険料 計算ツール</div>
        </a>
      `;
    } else {
      li.innerHTML = `
        <div class="result-city">${city.cityName}（${city.prefecture}）</div>
        <div class="muted">準備中</div>
      `;
    }

    results.appendChild(li);
  });
}
