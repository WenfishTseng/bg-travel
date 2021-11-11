"use strict";

$(function () {
  console.log('Hello Bootstrap5');
});
"use strict";

console.log(12222);
var data = [{
  id: 0,
  name: "肥宅心碎賞櫻3日",
  imgUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
  area: "高雄",
  description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！「櫻花祭」是許多人心中的首選，櫻花品種眾多，包含八重櫻、富士櫻和吉野櫻，一次滿足賞花迷的喜好。除了標榜保證看見滿開的櫻花外，園內還有設置市集、可以參拜幸福神社，並換上浴衣體驗日式文化風情，甚至能夠進行一場浪漫的野餐！",
  group: 87,
  price: 1400,
  rate: 10
}, {
  id: 1,
  name: "貓空纜車雙程票",
  imgUrl: "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  area: "台北",
  description: "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
  group: 99,
  price: 240,
  rate: 2
}, {
  id: 2,
  name: "台中谷關溫泉會1日",
  imgUrl: "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  area: "台中",
  description: "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
  group: 20,
  price: 1765,
  rate: 7
}];
var newAry = [];
var elList = document.querySelector(".js-list");
var elArea = document.querySelector(".js-area");
var elImg = document.querySelector(".js-img");
var elRate = document.querySelector(".js-rate");
var elTitle = document.querySelector(".js-title");
var elDis = document.querySelector(".js-dis");
var elNum = document.querySelector(".js-num");
var elPrice = document.querySelector(".js-price");
var ticketName = document.getElementById("ticketName");
var ticketImgUrl = document.getElementById("ticketImgUrl");
var ticketArea = document.getElementById("ticketArea");
var ticketPrice = document.getElementById("ticketPrice");
var ticketNum = document.getElementById("ticketNum");
var ticketRate = document.getElementById("ticketRate");
var ticketDes = document.getElementById("ticketDes");
var addBtn = document.querySelector(".js-add-btn");
var chooseArea = document.querySelector(".js-select-area");
var dataNum = document.querySelector(".js-num");
var alertModal = new bootstrap.Modal(document.getElementById("myModal"));
init();
addBtn.addEventListener("click", function (e) {
  e.preventDefault; // 清除提示框空值警告

  clearInputWarnings(); // 檢查提示框有無值

  checkInputData();
});
chooseArea.addEventListener("change", function () {
  var target = chooseArea.value;
  var selectAry = [];
  if (target == "") return;

  if (target === "全部地區") {
    selectAry = newAry;
  }

  newAry.forEach(function (item) {
    if (target === item.ticketArea) {
      selectAry.push(item);
    }
  });
  renderData(selectAry);
  dataNum.textContent = selectAry.length;
});

function clearInputWarnings() {
  var elInputWarnings = document.querySelectorAll(".alert-message");
  elInputWarnings.forEach(function (item) {
    item.remove();
  });
}

function checkInputData() {
  var ticketData = {};
  ticketData["ticketName"] = ticketName.value;
  ticketData["ticketImgUrl"] = ticketImgUrl.value;
  ticketData["ticketArea"] = ticketArea.value;
  ticketData["ticketPrice"] = ticketPrice.value;
  ticketData["ticketNum"] = ticketNum.value;
  ticketData["ticketRate"] = ticketRate.value;
  ticketData["ticketDes"] = ticketDes.value.trim();
  console.log(ticketData);
  var ary = [];
  var times = 0;

  for (var key in ticketData) {
    if (ticketData.hasOwnProperty(key)) {
      // 將沒有寫入值的屬性放入陣列
      if (ticketData[key] == "") {
        console.log("沒有值: " + key);
        if (key !== "ticketDes") ary.push(key);
      }
    }

    if (key !== "ticketDes" && ticketData[key] !== "") {
      times += 1;
    }
  } // 必輸入欄位都有值


  if (times >= 6) {
    newAry.push(ticketData);
    renderData(newAry);
    dataNum.textContent = newAry.length;
    clearInputValue();
    alertModal.show();
  } // 將陣列內的值拿出來放入getElement組html


  ary.forEach(function (item) {
    var newDiv = document.createElement("div");
    newDiv.className = "alert-message text-danger d-flex align-items-center pt-1";
    var newSpan = document.createElement("span");
    newSpan.className = "material-icons ps-1";
    var textNodeError = document.createTextNode("error");
    newSpan.appendChild(textNodeError);
    newDiv.appendChild(newSpan);
    var textNode = document.createTextNode("必填!");
    newDiv.appendChild(textNode);
    document.getElementById(item).parentElement.appendChild(newDiv);
  });
}

function clearInputValue() {
  ticketName.value = "";
  ticketImgUrl.value = "";
  ticketArea.value = "";
  ticketPrice.value = "";
  ticketNum.value = "";
  ticketRate.value = "";
  ticketDes.value = "";
}

function init() {
  data.forEach(function (item) {
    var newData = {};
    newData["ticketId"] = item.id;
    newData["ticketName"] = item.name;
    newData["ticketImgUrl"] = item.imgUrl;
    newData["ticketArea"] = item.area;
    newData["ticketPrice"] = item.price;
    newData["ticketNum"] = item.group;
    newData["ticketRate"] = item.rate;
    newData["ticketDes"] = item.description;
    newAry.push(newData);
  });
  renderData(newAry);
  dataNum.textContent = newAry.length;
}

function renderData(data) {
  var str = "";
  data.forEach(function (item) {
    str += "\n            <li class=\"col-4 mb-11\">\n            <div class=\"borderShadow card h-100 border-0 position-relative\">\n              <span\n                class=\"\n                  badge\n                  bg-secondary\n                  position-absolute\n                  top-0\n                  start-0\n                  translate-middle-y\n                  py-3\n                  px-7\n                  js-area\n                \"\n                style=\"font-size: 1.25rem\"\n                >".concat(item.ticketArea, "</span\n              >\n              <img\n                src=\"").concat(item.ticketImgUrl, "\"\n                class=\"card-img-top js-img\"\n                alt=\"photo-1\"\n              />\n              <div class=\"card-body position-relative pb-0\">\n                <span\n                  class=\"\n                    badge\n                    bg-primary\n                    position-absolute\n                    top-0\n                    start-0\n                    translate-middle-y\n                    py-1\n                    px-3\n                    fw-light\n                    js-rate\n                  \"\n                  style=\"font-size: 1rem\"\n                  >").concat(item.ticketRate, "</span\n                >\n                <h5\n                  class=\"\n                    card-title\n                    text-primary\n                    fw-medium\n                    border-bottom border-2 border-primary\n                    py-1\n                    h4\n                    js-title\n                  \"\n                >\n                  ").concat(item.ticketName, "\n                </h5>\n                <p class=\"card-text text-dark pt-6 fz-6 js-dis\">\n                 ").concat(item.ticketDes, " </p>\n              </div>\n              <div\n                class=\"\n                  card-footer\n                  d-flex\n                  text-primary\n                  justify-content-between\n                  mt-8\n                  py-0\n                  js-num\n                  bg-transparent border-0\n                \"\n              >\n                <p class=\"d-flex align-items-center\">\n                  <span class=\"material-icons me-2\"> error </span>\n                  \u5269\u4E0B\u6700\u5F8C ").concat(item.ticketNum, " \u7D44\n                </p>\n                <p class=\"d-flex align-items-center\">\n                  TWD<span class=\"h2 js-price\">$").concat(item.ticketPrice, " </span>\n                </p>\n              </div>\n            </div>\n          </li>\n  ");
  });
  elList.innerHTML = str;
}
//# sourceMappingURL=all.js.map
