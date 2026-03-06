let municipalities = [];

fetch("registry/municipalities.json")
  .then(res => res.json())
  .then(data => {
    municipalities = data.items;
    showResults(municipalities);
  });

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", function () {
  const keyword = this.value.trim().toLowerCase();

  const filtered = municipalities.filter(city =>
    city.cityName.includes(this.value.trim()) ||
    city.cityId.toLowerCase().includes(keyword) ||
    city.prefecture.includes(this.value.trim())
  );

  showResults(filtered);
});

function showResults(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  list.forEach(city => {
    const li = document.createElement("li");

    let link = "";
    if (city.cityId === "chigasaki") {
      link = "chigasaki-kokuho.html";
    }

    if (link) {
      li.innerHTML = `
        <a href="${link}">${city.cityName}（${city.prefecture}）</a><br>
        <span class="muted">国民健康保険料 計算ツール</span>
      `;
    } else {
      li.innerHTML = `
        ${city.cityName}（${city.prefecture}）<br>
        <span class="muted">準備中</span>
      `;
    }

    results.appendChild(li);
  });
}
