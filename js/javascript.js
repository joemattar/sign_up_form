const inputFirstName = document.querySelector("#first-name");
const checkImageFirstName = document.querySelector("#first-name+.check>img");
const spanFirstName = document.querySelector(".first-name-error");

const inputLastName = document.querySelector("#last-name");
const checkImageLastName = document.querySelector("#last-name+.check>img");
const spanLastName = document.querySelector(".last-name-error");

const inputEmail = document.querySelector("#email");
const checkImageEmail = document.querySelector("#email+.check>img");
const spanEmail = document.querySelector(".email-error");


const submitButton = document.getElementById("submit-button");


// User input validation on First Name input
inputFirstName.addEventListener("input", () => {
    if (inputFirstName.value.length === 0 ) {
        spanFirstName.textContent = "";
        checkImageFirstName.setAttribute("src", "");
        inputFirstName.style.removeProperty("border-color");
    } else if (inputFirstName.value.length < 3 || inputFirstName.value.length > 30) {
        spanFirstName.textContent = "FIRST NAME MUST BE 3-30 CHARACTERS";
        checkImageFirstName.setAttribute("src", "./images/red_x.png");
        inputFirstName.style.setProperty("border-color", "var( --red-color)");
    } else if (inputFirstName.value.length >= 3 || inputFirstName.value.length <= 30) {
        spanFirstName.textContent = "";
        checkImageFirstName.setAttribute("src", "./images/green_check.png");
        inputFirstName.style.removeProperty("border-color");
}})

// User input validation on Last Name input
inputLastName.addEventListener("input", () => {
    if (inputLastName.value.length === 0 ) {
        spanLastName.textContent = "";
        checkImageLastName.setAttribute("src", "");
        inputLastName.style.removeProperty("border-color");
    } else if (inputLastName.value.length < 3 || inputLastName.value.length > 30) {
        spanLastName.textContent = "LAST NAME MUST BE 3-30 CHARACTERS";
        checkImageLastName.setAttribute("src", "./images/red_x.png");
        inputLastName.style.setProperty("border-color", "var( --red-color)");
    } else if (inputLastName.value.length >= 3 || inputLastName.value.length <= 30) {
        spanLastName.textContent = "";
        checkImageLastName.setAttribute("src", "./images/green_check.png");
        inputLastName.style.removeProperty("border-color");
    }
})

// User input validation on Last Name input
inputEmail.addEventListener("input", () => {
    if (inputEmail.value.length === 0 ) {
        spanEmail.textContent = "EMAIL IS A REQUIRED FIELD";
        checkImageEmail.setAttribute("src", "./images/red_x.png");
        inputEmail.style.setProperty("border-color", "var( --red-color)");
    } else if (inputEmail.value.length > 0 && inputEmail.validity.valid !== true) {
        spanEmail.textContent = "PLEASE ENTER A VALID EMAIL";
        checkImageEmail.setAttribute("src", "./images/red_x.png");
        inputEmail.style.setProperty("border-color", "var( --red-color)");
    } else if (inputEmail.value.length > 0 && inputEmail.validity.valid === true) {
        spanEmail.textContent = "";
        checkImageEmail.setAttribute("src", "./images/green_check.png");
        inputEmail.style.removeProperty("border-color");
    }
})

// ADD VALIDATION UPON SUBMIT BUTTON CLICK
submitButton.addEventListener("click", () => {
    spanFirstName.textContent = "TESTING SUBMIT BUTTON";
})


// Add event listener when the HTML document has been completely parsed, and all deferred scripts have downloaded
document.addEventListener('DOMContentLoaded', () => {
    // for all element that have an attribute placeholder and an attribute data-masks
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        // declare pattern as placeholder value
        const pattern = el.getAttribute("placeholder");
        // declare a variable slots to fetch unique data-slots symbols
        const slots = new Set(el.dataset.slots || "_");


        // const prev = (j => Array.from(pattern, (elem,index) => slots.has(elem) ? j = index + 1 : j ))(0);
        const prev = Array.from(pattern, (elem,index) => {
                if (slots.has(elem)) {
                    return index + 1;
                } else {
                    return 0;
                }
            });
        // REFINE ABOVE!!
        console.log(prev)

        // Find the index in pattern's array that matched the first instance of data-slots symbol
        const first = [...pattern].findIndex(c => slots.has(c));

        // Regex constructor depending on the element data-accept attribute
        const accept = new RegExp(el.dataset.accept || "\\d", "g");

        const clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            };

        const format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i<0? prev[prev.length-1]: back? prev[i-1] || first: i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        
        // Event listener changes {back} to true when backspace key is pressed
        let back = false;
        el.addEventListener("keydown", (e) => {
            back = e.key === "Backspace";
        });

        el.addEventListener("input", format);
        el.addEventListener("focus", format);

        // The blur event fires when an element has lost focus ~focusout // focusout bubbles while blur does not.
        // Check at blur if field matches placeholder exactly and deletes input
        el.addEventListener("blur", () => {
            if (el.value === pattern) {
                el.value = "";
        }});
    }
});


// HTML Examples for Masks
{/*
Date time: 
<input placeholder="dd/mm/yyyy hh:mm" data-slots="dmyh">
Telephone:
<input placeholder="+1 (___) ___-____" data-slots="_">
MAC Address:
<input placeholder="XX:XX:XX:XX:XX:XX" data-slots="X" data-accept="[\dA-H]">
Alphanumeric:
<input placeholder="__-__-__-____" data-slots="_" data-accept="\w" size="13">
Credit Card:
<input placeholder=".... .... .... ...." data-slots="." data-accept="\d" size="19">
*/}