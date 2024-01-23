var userProgress = {};
var saveBlock = false;

function onload() {
  checkCookies();
  loadBasicDataAndGenerateHtml();
  //loadUserDataOrCreateDefault();
}

function changeOutput(event) {
  let val = event.target.value;
  let max = event.target.max;
  let name = event.target.id.replace("range", "");
  if (val === max) {
    const element = document.getElementById(name);
    element.classList.add("complete");
    party.confetti(element);
  } else {
    document.getElementById(name).classList.remove("complete");
  }
  document.getElementById(
    `${event.target.id}Output`
  ).innerText = `${val}/${max}`;

  const itemIndex = userProgress.findIndex((progress) => progress.id === name);
  var tmpItem = userProgress[itemIndex];
  tmpItem.count = val;

  saveUpdatedProgress();
}

function loadUserDataOrCreateDefault() {
  userProgress = loadJsonData("user-progress");
  if (userProgress === undefined) {
    userProgress = emptyUserProgress;
    saveJsonData("user-progress", userProgress);
  }
  showProgress(userProgress);
}

function showProgress(userProgress) {
  for (let i = 0; i < userProgress.length; i++) {
    let progress = userProgress[i];

    const bar = document.getElementById(`range${progress.id}`);
    bar.value = progress.count;

    const output = document.getElementById(`range${progress.id}Output`);
    output.innerHTML = `${progress.count}/${bar.max}`;

    if (progress.count == bar.max) {
      document.getElementById(progress.id).classList.add("complete");
    }
  }
}

function saveUpdatedProgress() {
  try {
    saveJsonData("user-progress", userProgress);

    if(!saveBlock) {
      saveBlock = true;
      const element = document.getElementById("autoSave");
      element.classList.add("fadeInAndOut");
      element.classList.remove("d-none");
      setTimeout(() => {
        element.classList.remove("fadeInAndOut");
        element.classList.add("d-none");
        saveBlock = false;
      }, 4000);
    }
  } catch (error) {}
}
