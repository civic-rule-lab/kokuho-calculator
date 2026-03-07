const municipalities = [
  {
    cityName: "茅ヶ崎市",
    prefecture: "神奈川県",
    file: "chigasaki-kokuho.html",
    status: "active"
  },
  {
    cityName: "藤沢市",
    prefecture: "神奈川県",
    file: "",
    status: "planned"
  },
  {
    cityName: "平塚市",
    prefecture: "神奈川県",
    file: "",
    status: "planned"
  },
  {
    cityName: "大田区",
    prefecture: "東京都",
    file: "",
    status: "planned"
  }
];

const searchBox = document.getElementById("searchBox");
const cityList = document.getElementById("cityList");

function renderList(keyword = "") {

  const q = keyword.trim().toLowerCase();
  cityList.innerHTML = "";

  municipalities
    .filter(city => {
      const text = `${city.cityName}${city.prefecture}`.toLowerCase();
      return text.includes(q);
    })
    .forEach(city => {

      const li = document.createElement("li");

      if (city.status === "active") {

        li.innerHTML = `
          <div class="city-name">${city.cityName}</div>
          <div class="city-meta">${city.prefecture}｜国民健康保険料計算ツール</div>
        `;

        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
          window.location.href = city.file;
        });

      } else {

        li.innerHTML = `
          <div class="city-name plain">${city.cityName}</div>
          <div class="city-meta">${city.prefecture}｜準備中</div>
        `;

      }

      cityList.appendChild(li);

    });

}

searchBox.addEventListener("input", () => {
  renderList(searchBox.value);
});

renderList();
