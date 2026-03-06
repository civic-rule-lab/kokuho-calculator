let municipalities = [];

fetch("registry/municipalities.json")
  .then(res => res.json())
  .then(data => {
    municipalities = data.items;
    showResults(municipalities);
  });

const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", function () {
  const keyword = this.value.trim();

  const filtered = municipalities.filter(city =>
    city.cityName.includes(keyword) ||
    city.cityId.toLowerCase().includes(keyword.toLowerCase())
    city.prefecture.includes(keyword)
  );

  showResults(filtered);
});

function showResults(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  list.forEach(city => {
    const li = document.createElement("li");

    // 今は国保ページへ飛ばす
    let link = "#";
    if (city.cityId === "chigasaki") {
      link = "chigasaki-kokuho.html";
    } else if (city.cityId === "fujisawa") {
      link = "fujisawa-kokuho.html";
    } else if (city.cityId === "hiratsuka") {
      link = "hiratsuka-kokuho.html";
    } else if (city.cityId === "ota") {
      link = "ota-kokuho.html";
    }

    if (link === "#") {
      li.innerHTML = `${city.cityName}（${city.prefecture}） <span style="color:#888;">準備中</span>`;
    } else {
      li.innerHTML = `<a href="${link}">${city.cityName}（${city.prefecture}）</a>`;
    }

    results.appendChild(li);
  });
}
