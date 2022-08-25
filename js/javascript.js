const inputFirstName = document.querySelector("#first-name");
const checkImageFirstName = document.querySelector("#first-name+.check>img");
const spanFirstName = document.querySelector(".first-name-error");

const inputLastName = document.querySelector("#last-name");
const checkImageLastName = document.querySelector("#last-name+.check>img");
const spanLastName = document.querySelector(".last-name-error");


const submitButton = document.getElementById("submit-button");


// User input validation on First Name input
inputFirstName.addEventListener("input", () => {
    if (inputFirstName.value.length === 0 ) {
        spanFirstName.textContent = "";
        checkImageFirstName.setAttribute("src", "");
    } else if (inputFirstName.value.length < 3 || inputFirstName.value.length > 30) {
        spanFirstName.textContent = "FIRST NAME MUST BE 3-30 CHARACTERS";
        checkImageFirstName.setAttribute("src", "./images/red_x.png");
    } else if (inputFirstName.value.length >= 3 || inputFirstName.value.length <= 30) {
        spanFirstName.textContent = "";
        checkImageFirstName.setAttribute("src", "./images/green_check.png");
}})

// User input validation on Last Name input
inputLastName.addEventListener("input", () => {
    if (inputLastName.value.length === 0 ) {
        spanLastName.textContent = "";
        checkImageLastName.setAttribute("src", "");
    } else if (inputLastName.value.length < 3 || inputLastName.value.length > 30) {
        spanLastName.textContent = "LAST NAME MUST BE 3-30 CHARACTERS";
        checkImageLastName.setAttribute("src", "./images/red_x.png");
    } else if (inputLastName.value.length >= 3 || inputLastName.value.length <= 30) {
        spanLastName.textContent = "";
        checkImageLastName.setAttribute("src", "./images/green_check.png");
}})



// ADD VALIDATION UPON SUBMIT BUTTON CLICK
submitButton.addEventListener("click", () => {
    spanFirstName.textContent = "TESTING SUBMIT BUTTON";
})