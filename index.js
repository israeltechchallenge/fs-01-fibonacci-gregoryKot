
let index  = document.querySelector("#index");
const number =  document.querySelector(".number");
const error50 = document.querySelector(".error50")
const spinner = document.getElementById("spinner");
const errorMessage = document.getElementById("error")
document.querySelector( ".btn").addEventListener("click", async function () {
  number.classList.add("d-none");
  index.classList.remove("is-invalid")
  error50.classList.add("d-none")
  
  errorMessage.innerText = ""
  let input  = parseInt(index.value);
if (!input) {
  input = 0
}
if (input > 50) {
  spinner.classList.add("d-none");
index.classList.add("is-invalid")
error50.classList.remove("d-none")
error50.innerHTML = "Can’t be larger than 50"
  } else 
   await fibonacci(input);

});

function fibonacci(input) {
    
  spinner.classList.remove("d-none");
fetch('http://localhost:5050/fibonacci/'+input).then(response => {
  errorMessage.classList.add("d-none");
        if (response.ok) {
          return response.json();
        } else {
          return response.text()
       .then((text) => {
       
         throw(text);
       });
        }
    })
    .then(text => {
     spinner.classList.add("d-none");
     number.classList.remove("d-none");
    number.innerHTML = text.result
   
})
.catch((error) => {
    console.log(error)
    spinner.classList.add("d-none");
    errorMessage.classList.remove("d-none");
errorMessage.innerHTML = ""
    errorMessage.innerText += " " + error
  });
}




