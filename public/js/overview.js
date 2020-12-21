jQuery(document).ready(function () {
  jQuery("#vmap").vectorMap({
    map: "world_en",
    backgroundColor:
      localStorage.getItem("darkMode") !== "enabled"
        ? "rgb(231, 228, 220)"
        : "rgb(117, 103, 72)",
    borderColor: "#524B29",
    borderOpacity: 0.5,
    borderWidth: 1,
    color: "#D9D2AD",
    enableZoom: true,
    hoverColor: "#D1C069",
    hoverOpacity: null,
    normalizeFunction: "linear",
    scaleColors: ["#D9D2AD", "#D1C069"],
    selectedColor: "#9E914F",
    selectedRegions: null,
    showTooltip: true,
    onRegionClick: function (element, code, region) {
      region = region.toLowerCase();
      if (region.includes(' ')) region = region.split(' ').join('-');
      window.location.href = `tour/${region}`;
    },
  });
});

let minPriceRange = document.getElementById("minPriceRange");
let maxPriceRange = document.getElementById("maxPriceRange");
let minPrice = document.getElementById("minPrice");
let maxPrice = document.getElementById("maxPrice");

minPrice.innerHTML = minPriceRange.value;
maxPrice.innerHTML = maxPriceRange.value;

minPriceRange.oninput = function () {
  minPrice.textContent = `${this.value}`;
};

maxPriceRange.oninput = function () {
  maxPrice.textContent = `${this.value}`;
};
