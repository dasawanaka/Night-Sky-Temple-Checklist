function checkCookies() {
  if (getCookie("cookie-accepted") === null) {
    document.querySelector("header").classList.add("d-none");
    document.querySelector("main").classList.add("d-none");
    document.getElementById("cookies-container").classList.remove("d-none");
  }
}

function cookiesAccept() {
  document.querySelector("header").classList.remove("d-none");
  document.querySelector("main").classList.remove("d-none");
  document.getElementById("cookies-container").classList.add("d-none");
  setCookie("cookie-accepted", true, 365);
}

function goBack() {
  window.history.back();
}

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  return decodeURI(dc.substring(begin + prefix.length, end));
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
