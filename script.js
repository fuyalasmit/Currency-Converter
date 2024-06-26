const BASE_URL = "https://v6.exchangerate-api.com/v6/8160896acdbc8e2199e280f8/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

//namellist 
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        //usd npr const 
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "NPR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    //flag change-1
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

//flag change-2
const updateFlag = (element) => {
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}



btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if (amtVal === "" || amtVal <= 0) {
        amtVal = 1;
        amount.value = "1";
    }


    console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(URL);
    console.log(response);
    let data = await response.json();
    let to = toCurr.value;
    let rate = data.conversion_rates[toCurr.value];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

}

window.addEventListener("load", () => {
    updateExchangeRate();
});