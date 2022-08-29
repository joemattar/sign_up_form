const inputFirstName = document.querySelector("#first-name");
const checkImageFirstName = document.querySelector("#first-name+.check>img");
const spanFirstName = document.querySelector(".first-name-error");

const inputLastName = document.querySelector("#last-name");
const checkImageLastName = document.querySelector("#last-name+.check>img");
const spanLastName = document.querySelector(".last-name-error");

const inputEmail = document.querySelector("#email");
const checkImageEmail = document.querySelector("#email+.check>img");
const spanEmail = document.querySelector(".email-error");

const inputPhone = document.querySelector("#phone");
const checkImagePhone = document.querySelector("#phone+.check>img");
const spanPhone = document.querySelector(".phone-error");

const inputPassword = document.querySelector("#password");
const checkImagePassword = document.querySelector("#password+.check>img");
const spanPasswordUppercase = document.querySelector(".char-uppercase");
const spanPasswordLowercase = document.querySelector(".char-lowercase");
const spanPasswordNumber = document.querySelector(".char-number");
const spanPasswordSymbol = document.querySelector(".char-symbol");
const spanPasswordMinimum = document.querySelector(".char-minimum");
const spansPassword = document.querySelectorAll(".password-error");

const inputConfirmPassword = document.querySelector("#confirm-password");
const checkImageConfirmPassword = document.querySelector("#confirm-password+.check>img");
const spanConfirmPassword = document.querySelector(".confirm-password-error");

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

// User input validation on Email input
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

// GENERAL MASKING - BUT SPECIFICALLY FOR PHONE INPUT
// Add event listener when the HTML document has been completely parsed, and all deferred scripts have downloaded
document.addEventListener('DOMContentLoaded', () => {
    // for all element that have an attribute placeholder and an attribute data-masks
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        // declare pattern as placeholder value
        const pattern = el.getAttribute("placeholder");
        // declare a variable slots to fetch unique data-slots symbols
        const slots = new Set(el.dataset.slots || "_");

        // CODE below to study
        // const prev = (j => Array.from(pattern, (elem,index) => slots.has(elem) ? j = index + 1 : j ))(0);
  
        // Creates an array of previous ???
        let prev = Array.from(pattern);
        for (let i = 0; i < prev.length; i++) {
            if (slots.has(prev[i])) {
                prev[i] = i + 1;
            } else if (i === 0) {
                prev[i] = 0;
            } else if (prev[i-1] > 0) {
                prev[i] = prev[i-1];
            } else {
                prev[i] = 0;
            }
        }

        // Find the index in pattern's array that matched the first instance of data-slots symbol
        const first = [...pattern].findIndex(c => slots.has(c));

        // Regex constructor depending on the element data-accept attribute
        const accept = new RegExp(el.dataset.accept || "\\d", "g");

        // Function to delete the data slot symbol for the inputted digit
        function clean(input) {
            // Create an array of accepted inputs so far
            input = input.match(accept) || [];
            // Use the created array to replace data slot symbols in pattern array and return the "clean" array
            return Array.from(pattern, c => {
                if (input[0] === c || slots.has(c)) {
                    return input.shift() || c
                } else {
                    return c
                }
            })
        };

        function format() {
            // Find the placement of the cursor in a valid location just after the closest previous valid character
            const [i, j] = [el.selectionStart, el.selectionEnd].map(k => {
                k = clean(el.value.slice(0, k)).findIndex(c => slots.has(c));
                if (k < 0) {
                    return prev[prev.length-1]
                } else if (back) {
                    return prev[k-1] || first
                } else {
                    return k
                }
            });

            // Join the clean array into a string
            el.value = clean(el.value).join("");
            // Place the curser in the valid location
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

    // User input validation on Phone input
    inputPhone.addEventListener("input", () => {
    if (inputPhone.value === inputPhone.placeholder) {
            spanPhone.textContent = "";
            checkImagePhone.setAttribute("src", "");
            inputPhone.style.removeProperty("border-color");
        } else if (inputPhone.validity.patternMismatch) {
            spanPhone.textContent = "PLEASE ENTER A 10 DIGIT PHONE NUMBER";
            checkImagePhone.setAttribute("src", "./images/red_x.png");
            inputPhone.style.setProperty("border-color", "var( --red-color)");
        } else if (!inputPhone.validity.patternMismatch) {
            spanPhone.textContent = "";
            checkImagePhone.setAttribute("src", "./images/green_check.png");
            inputPhone.style.removeProperty("border-color");
        }
    })
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

// User input validation on Password input
inputPassword.addEventListener("input", () => {
    if (inputPassword.value === "") {
        checkImagePassword.setAttribute("src", "");
        inputPassword.style.removeProperty("border-color");
        for (let element of spansPassword) {
            element.textContent = "";
        }
    } else if (!inputPassword.validity.patternMismatch) {
        checkImagePassword.setAttribute("src", "./images/green_check.png");
        inputPassword.style.removeProperty("border-color");
        for (let element of spansPassword) {
            element.style.setProperty("color", "var(--green-color)");
        }
    } else if (inputPassword.validity.patternMismatch) {
        checkImagePassword.setAttribute("src", "./images/red_x.png");
        inputPassword.style.setProperty("border-color", "var( --red-color)");
        spanPasswordUppercase.textContent = "PASSWORD MUST HAVE 1 UPPERCASE CHAR";
        spanPasswordLowercase.textContent = "PASSWORD MUST HAVE 1 LOWERCASE CHAR";
        spanPasswordNumber.textContent = "PASSWORD MUST HAVE 1 NUMBER CHAR";
        spanPasswordSymbol.textContent = "PASSWORD MUST HAVE 1 SPECIAL CHAR";
        spanPasswordMinimum.textContent = "PASSWORD MUST BE MINIMUM 8 CHARS";
        for (let element of spansPassword) {
            element.style.removeProperty("color");
        }
        if (inputPassword.value.match(/[A-Z]/g) !== null) {
            spanPasswordUppercase.style.setProperty("color", "var(--green-color)");
        }
        if (inputPassword.value.match(/[a-z]/g) !== null) {
            spanPasswordLowercase.style.setProperty("color", "var(--green-color)");
        }
        if (inputPassword.value.match(/[0-9]/g) !== null) {
            spanPasswordNumber.style.setProperty("color", "var(--green-color)");
        }
        if (inputPassword.value.match(/[!#\$%&'\(\)\*\+,\-\.\/:;=>\?@\[\\\]\^_`\{\|\}~]/g) !== null) {
            spanPasswordSymbol.style.setProperty("color", "var(--green-color)");
        }
        if (inputPassword.value.length >= 8) {
            spanPasswordMinimum.style.setProperty("color", "var(--green-color)");
        }
    }
    confirmPassword()
})

// Function for user input validation on Confirm Password input
function confirmPassword() {
    if (inputConfirmPassword.value === "") {
            spanConfirmPassword.textContent = "";
            spanConfirmPassword.style.removeProperty("color");
            checkImageConfirmPassword.setAttribute("src", "");
            inputConfirmPassword.style.removeProperty("border-color");
        } else if (inputConfirmPassword.value !== inputPassword.value) {
            spanConfirmPassword.textContent = "PASSWORDS MUST MATCH";
            spanConfirmPassword.style.removeProperty("color");
            checkImageConfirmPassword.setAttribute("src", "./images/red_x.png");
            inputConfirmPassword.style.setProperty("border-color", "var( --red-color)");
        } else if (inputConfirmPassword.value === inputPassword.value) {
            spanConfirmPassword.textContent = "PASSWORDS MUST MATCH";
            spanConfirmPassword.style.setProperty("color", "var(--green-color)");
            checkImageConfirmPassword.setAttribute("src", "./images/green_check.png");
            inputConfirmPassword.style.removeProperty("border-color");
        }
    }

// Event listener for user input validation on Confirm Password input
inputConfirmPassword.addEventListener("input", () => {
    confirmPassword()
})

// ADD VALIDATION UPON SUBMIT BUTTON CLICK
submitButton.addEventListener("click", () => {
})
