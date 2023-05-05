const radioButtons = document.querySelectorAll('input[name="size"]');
const output = document.querySelector(".price__value");
const outputSauces = document.querySelector(".sauces__value");
const outputTopings = document.querySelector(".topings__value");
const btnCancel = document.querySelectorAll(".btn-cancel");
const ingredientList = document.querySelectorAll(".common-lib");
const getDiscount = document.getElementById("banner");
let size, elemVal = 0, elem, elemBlock, elemCategory = "";


for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', showSelected);
}
size = parseInt(document.getElementById('big').value.match(/\d+/));
output.innerHTML = size + elemVal + " грн";
output.classList.add("result_value");

function showSelected (e) {
  if (this.checked) {
    size = parseInt(this.value.match(/\d+/));
    output.innerHTML = size + elemVal + " грн";
  }
}

function dragStart(event) {
  event.dataTransfer.setData("img", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  if (event.target.getAttribute('data-draggable') == 'target') {
    event.preventDefault();
    const data = event.dataTransfer.getData("img");
    event.target.appendChild(document.getElementById(data));
    document.getElementById(data).classList.add("add-ing");
    var fragmento = document.createDocumentFragment();
    fragmento.appendChild(document.getElementById(data));
    document.querySelector(".droptarget-keep").appendChild(fragmento);
    elem = document.getElementById(data).dataset.parentDiv,
    elemBlock = document.getElementById(elem),
    btnInBlock = elemBlock.querySelector(".btn-cancel");
    btnInBlock.classList.add("btn-cancel--active");
    elemVal += parseInt(elemBlock.querySelector(".common-lib-price").dataset.price);
    output.innerHTML = size + elemVal + " грн";
    if (document.getElementById(data).getAttribute('data-cheese') == 'cheese') {
      document.getElementById(data).style.zIndex = "15";
    }
    else if (document.getElementById(data).getAttribute('data-adds') == 'adds') {
      document.getElementById(data).style.zIndex = "12";
      }
    elemCategory = elemBlock.querySelector(".common-lib-price > span").innerHTML + "<br>";
    if (elemBlock.classList.contains("sauces-block")) {
      outputSauces.innerHTML += elemCategory;
      outputSauces.style.color = "blue";
      outputSauces.style.fontSize = "18px";
      outputSauces.style.marginTop = "7px";
      }
    else if (elemBlock.classList.contains("top-block")){
      outputTopings.innerHTML += elemCategory;
      outputTopings.style.color = "blue";
      outputTopings.style.fontSize = "18px";
      outputTopings.style.marginTop = "7px";
     }
  }
}

btnCancel.forEach(function (element, index, arr) {
  element.onclick = function () {
    const myId = this.dataset.myId;
    const blockId = this.dataset.blockId;
    const minusPrice = this.dataset.minusPrice;
    this.classList.remove("btn-cancel--active");
    if (document.getElementById(myId).classList.contains("add-ing")){
      var fragment = document.createDocumentFragment();
      fragment.appendChild(document.getElementById(myId));
      document.getElementById(blockId).appendChild(fragment);
      document.getElementById(myId).classList.remove("add-ing");
      let elemBlockMin = document.getElementById(minusPrice).querySelector(".common-lib-price").dataset.price;
      let elemValMin = parseInt(elemBlockMin);
      elemVal -= elemValMin;
      output.innerHTML = size + elemVal + " грн";
      let elemCategoryMin = document.getElementById(minusPrice).querySelector(".common-lib-price > span").innerHTML +"<br>";
      if (document.getElementById(minusPrice).classList.contains("sauces-block")) {
        outputSauces.innerHTML = outputSauces.innerHTML.replace(elemCategoryMin, "");
      }
      else if (document.getElementById(minusPrice).classList.contains("top-block")) {
        outputTopings.innerHTML = outputTopings.innerHTML.replace(elemCategoryMin, "");
      }  
   }
  }
})

getDiscount.addEventListener('click', function myDiscount(e) {
  var sum = size + elemVal;
  var sumDisc = Math.round(sum * 0.3);
  output.innerHTML = sum - sumDisc + "грн";

})




const form = document.info;
// validation
const init = () => {
  let formValidation = false;

  for (let j = 0; j < form.elements.length; j++) {
    const e = form.elements[j];

    // пропускаем все что не поле ввода.
    if (e.type != "text" && e.type != "tel" && e.type != "email") {
      continue;
    }

    // проверка имеются ли атрибуты требующие проверки.
    const pattern = e.getAttribute("data-val");

    if (pattern) {
      e.onchange = validateInput; // обработчик на изменение.
      formValidation = true; // форма требует проверку.
    }
  }
  if (formValidation) {
    form.onsubmit = validateForm; 
    // установка обработчика для формы на submit
  }

}

// обработчик на изменение содержимого полей ввода.
function validateInput() {
  const pattern = this.dataset.val,
  value = this.value;

  const res = value.search(pattern);
  if (res == -1) {
    this.className = "error";
  }
  else {
    this.className = "valid";
  }
}

// обработчик на submit формы.
function validateForm(e) {

  let invalid = false;

  for (let i = 0; i < this.elements.length; ++i) {
    let e = this.elements[i];
    if ((e.type == "text" || e.type == "tel" || e.type == "email") && e.onchange != null) {
      e.onchange();
      if (e.className == "error") invalid = true;
    }
  }

  if (invalid) {
    alert("Форма заповнена невірно, або не повністю!");
    return false;
  }
  sessionStorage.setItem("Value", output.textContent);
  sessionStorage.setItem("Sauses", outputSauces.textContent);
  sessionStorage.setItem("Topings", outputTopings.textContent);
  sessionStorage.setItem("Name", form.name.value);
  sessionStorage.setItem("Phone", form.phone.value);
  sessionStorage.setItem("Email", form.email.value);
}

  
// const orderInfo = document.querySelector(".order-info");
// const outputInfo = output.textContent;
// orderInfo.innerHTML = `Сума замовлення - $(outputInfo)`;

// регистрация события загрузки документа.
if (window.addEventListener) window.addEventListener("load", init, false);

$(document).ready(function () {
  $('.slider-pizza').slick({
      arrows: true,
      autoplay: true,
      autoplaySpeed: 5000
      });
    });

