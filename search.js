const municipalities = [
  {
    cityName: "茅ヶ崎市",
    prefecture: "神奈川県",
    file: "/chigasaki-kokuho.html",
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

  if (q === "") {
    return;
  }

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
