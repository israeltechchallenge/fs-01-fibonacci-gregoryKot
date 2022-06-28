let index = document.querySelector("#index");
const number = document.querySelector(".number");
const error50 = document.querySelector(".error50");
const spinner = document.querySelector("#spinner");
const spinner2 = document.querySelector("#spinner2");
const errorMessage = document.querySelector("#error");
const results = document.querySelector(".result");
const check = document.querySelector("#accept");
console.log(check.checked)
const button = document.querySelector(".btn");
//button Listener
button.addEventListener("click", async () => {
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
  } else 
  if (check.checked) {
    await fibonacci(input);
  } else {
    fibonacciManual(input)
  }
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
          throw new Error(text);
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
      errorMessage.innerText += "Server error:" + error;
    });
}

function getFibonacciResult() {
  spinner2.classList.remove("d-none");
  results.innerText = "";
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

  for (let i = 0; i < 10; i++) {
    let date = new Date(newResults[i].createdDate);
    results.innerHTML += `<div class="result mt-3 mb-4"><span class="fs-5 border-bottom pb-3 border-secondary">The Fibonnaci Of <b>${newResults[i].number}</b> is <b>${newResults[i].result}</b>. Calculated at:${date} </li></div> `;
  }
}

window.addEventListener("load", getFibonacciResult);
fibSequence = [1, 1];

function fibonacciManual(index) {
  number.classList.remove("d-none");
  
  if (index < 1) 
    return index;
  fibSequence.push(
    fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2]
  );

  if (index > fibSequence.length) fibonacciManual(index)

  number.innerHTML = fibSequence[index - 1];
  
}
