const inputFirstName = document.querySelector("#first-name")
const spanFirstName = document.querySelector(".first-name-error")

inputFirstName.addEventListener("input", (e) => {
    spanFirstName.textContent = "Testing"
})