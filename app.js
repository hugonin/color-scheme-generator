let schemeColorsArr = [];
let schemeValuesArr = [];

renderSchemeColorsInit();

document.getElementById("btn").addEventListener("click", function (e) {
  e.preventDefault();
  const pickedColor = document.getElementById("color-picker").value.slice(1);
  const selectedMode = document.getElementById("color-select").value;
  const numColors = 5;

  console.log("choix couleur", pickedColor);
  console.log("choix mode", selectedMode);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${pickedColor}&mode=${selectedMode}&count=${numColors}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      schemeColorsArr = data;
      console.log("DATA", schemeColorsArr);
      renderScheme();
    });
});

function renderSchemeColorsInit() {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=000000&mode=monochrome&count=5`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      schemeColorsArr = data;
      renderScheme();
    });
}

function renderScheme() {
  let colorsHtml = "";
  let valuesHtml = "";

  schemeColorsArr.colors.map((scheme, index) => {
    colorsHtml += `<div class="item-${index}">
                        <img class="image-container" src="${scheme.image.bare}">
                    </div> 
                    `;

    valuesHtml += `<div class="color-value-${index}">
        ${scheme.hex.value}
      </div> `;
  });

  document.getElementById("container-inner-main").innerHTML = colorsHtml;

  document.getElementById("container-inner-bottom").innerHTML = valuesHtml;
}

// function copyHexValues() {
//     navigator.clipboard.writeText(colorValueEl.textContent)
// }
