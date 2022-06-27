let index = document.querySelector("#index");
const number = document.querySelector(".number");
const error50 = document.querySelector(".error50");
const spinner = document.getElementById("spinner");
const spinner2 = document.getElementById("spinner2");
const errorMessage = document.getElementById("error");
const results = document.querySelector(".result");
//button Listener
document.querySelector(".btn").addEventListener("click", async function () {
  number.classList.add("d-none");
  index.classList.remove("is-invalid");
  error50.classList.add("d-none");

  errorMessage.innerText = "";
  let input = parseInt(index.value);
  if (!input) {
    input = 0;
  }
  if (input > 50) {
    spinner.classList.add("d-none");
    index.classList.add("is-invalid");
    error50.classList.remove("d-none");
    error50.innerHTML = "Can’t be larger than 50";
  } else await fibonacci(input);
  getFibonacciResult();
});

function fibonacci(input) {
  spinner.classList.remove("d-none");
  fetch("http://localhost:5050/fibonacci/" + input)
    .then((response) => {
      errorMessage.classList.add("d-none");
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((text) => {
          throw text;
        });
      }
    })
    .then((text) => {
      spinner.classList.add("d-none");
      number.classList.remove("d-none");
      number.innerHTML = text.result;
    })
    .catch((error) => {
      spinner.classList.add("d-none");
      errorMessage.classList.remove("d-none");
      errorMessage.innerHTML = "Server error:";
      errorMessage.innerText += " " + error;
    });
}

function getFibonacciResult() {
  spinner2.classList.remove("d-none");
  results.innerText =""
  fetch("http://localhost:5050/getFibonacciResults ")
    .then((response) => {
      spinner2.classList.add("d-none");
      return response.json();
    })
    .then((text) => {
      spinner2.classList.add("d-none");
      printResults(text);
    });
}
function printResults(requestResults) {
  
  let newResults = requestResults.results;

  for (let i = 0; i<3; i++) {
    let date = new Date(newResults[i].createdDate)
    results.innerHTML += `<div class="result mt-3 mb-4"><span class="fs-5 border-bottom pb-3 border-secondary">The Fibonnaci Of <b>${newResults[i].number}</b> is <b>${newResults[i].result}</b>. Calculated at:${date} </li></div> `;
  }
}

getFibonacciResult();
