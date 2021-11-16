let newAry = [];
const elList = document.querySelector(".js-list");

const ticketName = document.getElementById("ticketName");
const ticketImgUrl = document.getElementById("ticketImgUrl");
const ticketArea = document.getElementById("ticketArea");
const ticketPrice = document.getElementById("ticketPrice");
const ticketNum = document.getElementById("ticketNum");
const ticketRate = document.getElementById("ticketRate");
const ticketDes = document.getElementById("ticketDes");
const addBtn = document.querySelector(".js-add-btn");
const chooseArea = document.querySelector(".js-select-area");
const dataNum = document.querySelector(".js-num");
const alertModal = new bootstrap.Modal(document.getElementById("myModal"));

addBtn.addEventListener("click", (e) => {
  e.preventDefault;
  // 清除提示框空值警告
  clearInputWarnings();
  // 檢查提示框有無值
  checkInputData();
});

chooseArea.addEventListener("change", () => {
  let target = chooseArea.value;
  let selectAry = [];
  if (target === "") return;
  if (target === "全部地區") {
    selectAry = newAry;
  } else {
    selectAry = newAry.filter((item) => {
      return item.ticketArea === target;
    });
  }
  // newAry.forEach((item) => {
  //   if (target === item.ticketArea) {
  //     selectAry.push(item);
  //   }
  // });
  renderData(selectAry);
});

function clearInputWarnings() {
  const elInputWarnings = document.querySelectorAll(".alert-message");
  elInputWarnings.forEach((item) => {
    item.remove();
  });
}

function checkInputData() {
  let ticketData = {};
  ticketData["ticketName"] = ticketName.value;
  ticketData["ticketImgUrl"] = ticketImgUrl.value;
  ticketData["ticketArea"] = ticketArea.value;
  ticketData["ticketPrice"] = ticketPrice.value;
  ticketData["ticketNum"] = ticketNum.value;
  ticketData["ticketRate"] = ticketRate.value;
  ticketData["ticketDes"] = ticketDes.value.trim();
  console.log(ticketData);
  let ary = [];
  let times = 0;
  for (let key in ticketData) {
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
  }
  // 必輸入欄位都有值
  if (times >= 6) {
    newAry.push(ticketData);
    renderData(newAry);
    clearInputValue();
    alertModal.show();
  }

  // 將陣列內的值拿出來放入getElement組html
  ary.forEach((item) => {
    let newDiv = document.createElement("div");
    newDiv.className =
      "alert-message text-danger d-flex align-items-center pt-1";
    let newSpan = document.createElement("span");
    newSpan.className = "material-icons ps-1";
    let textNodeError = document.createTextNode("error");
    newSpan.appendChild(textNodeError);
    newDiv.appendChild(newSpan);
    let textNode = document.createTextNode("必填!");
    newDiv.appendChild(textNode);
    document.getElementById(item).parentElement.appendChild(newDiv);
  });
}

function clearInputValue() {
  // 可以更為整個表格清空
  document.getElementById("myForm").reset();
}

function init(data) {
  data.forEach((item) => {
    let newData = {};
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
}

function renderData(data) {
  let str = "";
  data.forEach((item) => {
    str += `
            <li class="col-md-6 col-lg-4 mb-11">
            <div class="borderShadow card h-100 border-0 position-relative">
              <span
                class="
                  badge
                  bg-secondary
                  position-absolute
                  top-0
                  start-0
                  translate-middle-y
                  py-3
                  px-7
                  js-area
                "
                style="font-size: 1.25rem"
                >${item.ticketArea}</span
              >
              <img
                src="${item.ticketImgUrl}"
                class="card-img-top js-img"
                alt="photo-1"
              />
              <div class="card-body position-relative pb-0">
                <span
                  class="
                    badge
                    bg-primary
                    position-absolute
                    top-0
                    start-0
                    translate-middle-y
                    py-1
                    px-3
                    fw-light
                    js-rate
                  "
                  style="font-size: 1rem"
                  >${item.ticketRate}</span
                >
                <h5
                  class="
                    card-title
                    text-primary
                    fw-medium
                    border-bottom border-2 border-primary
                    py-1
                    h4
                    js-title
                  "
                >
                  ${item.ticketName}
                </h5>
                <p class="card-text text-dark pt-6 fz-6 js-dis">
                 ${item.ticketDes} </p>
              </div>
              <div
                class="
                  card-footer
                  d-flex
                  text-primary
                  justify-content-between
                  mt-8
                  py-0
                  js-num
                  bg-transparent border-0
                "
              >
                <p class="d-flex align-items-center">
                  <span class="material-icons me-2"> error </span>
                  剩下最後 ${item.ticketNum} 組
                </p>
                <p class="d-flex align-items-center">
                  TWD<span class="h2 js-price">$${item.ticketPrice} </span>
                </p>
              </div>
            </div>
          </li>
  `;
  });
  elList.innerHTML = str;
  dataNum.textContent = data.length;
}

axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
  )
  .then(function (response) {
    // handle success
    let axiosData = response.data.data;
    init(axiosData);
    console.log("獲取資料");
  });
