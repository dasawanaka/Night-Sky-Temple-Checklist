var emptyUserProgress = [];

function loadBasicDataAndGenerateHtml() {

 // const response = fetch("./data.json");
 // if (!response.ok) {
 //   throw new Error(`HTTP error! Status: ${res.status}`);
 //}
 // let data = response.json();



  fetch("./data.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      var html = generateGrid(data);
      document.getElementById("main").innerHTML = html;
      generateEmptyUserProgress(data);
      console.log(emptyUserProgress);
      loadUserDataOrCreateDefault();
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

function generateGrid(data) {
  var result = "";
  for (let iVault = 0; iVault < data.length; iVault++) {
    var itemVault = data[iVault];
    //top vault html
    result += `        <div class="row">
              <div class="row">
                  <h2>${itemVault.name}<span id="${itemVault.id}"></span> </h2>
              </div>
              <div class="row">`;

    for (let iBundle = 0; iBundle < itemVault.bundles.length; iBundle++) {
      var itemBundle = itemVault.bundles[iBundle];
      // top bundle html
      result += `<div class="col-6 py-2"> 
                    <div class="card mx-2">
                        <div class="card-body">
                            <span class="title">${itemBundle.name}<span id="${itemBundle.id}"></span></span>
                            <div class="description pr-3">`;

      for (let iItem = 0; iItem < itemBundle.items.length; iItem++) {
        var itemItem = itemBundle.items[iItem];
        //item html
        result += `<div id="${itemItem.id}" class="row vertical-card pl-3 pt-3 mb-4">
                      <div class="fit-content">
                          <img class="item" src="${itemItem.img}" alt="${itemItem.name}">
                      </div>
                      <div class="col pl-2 center-y center-x pb-4"> 
                          <span class="bold" hover-tooltip="${itemItem.tooltip}" 
                            tooltip-position="top">${itemItem.name} 🛈</span> <span id="range${itemItem.id}Output">0/${itemItem.max}</span>
                          <div class="range pr-3">
                              <input oninput="changeOutput(event)" id="range${itemItem.id}" type="range" min="0" max="${itemItem.max}" step='1' value="0" />
                          </div>
                      </div>
                  </div>`;
      }
      //bottom bundle html
      result += `</div>
                      </div>
                  </div>    
              </div>`;
    }

    //bottom vault html
    result += `            </div>
        </div>`;
  }
  return result;
}

function generateEmptyUserProgress(data) {
  for (let iVault = 0; iVault < data.length; iVault++) {
    var itemVault = data[iVault];
    for (let iBundle = 0; iBundle < itemVault.bundles.length; iBundle++) {
      var itemBundle = itemVault.bundles[iBundle];
      for (let iItem = 0; iItem < itemBundle.items.length; iItem++) {
        var itemItem = itemBundle.items[iItem];
         emptyUserProgress.push({"id": itemItem.id, "count": 0})
      }
    }
  }
}
