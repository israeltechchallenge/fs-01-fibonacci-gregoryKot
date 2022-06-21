let index, number;

document.querySelector(".btn").addEventListener("click", async function () {
  index = document.querySelector("#index").value;
   await fibonacci(index);
  
});

function fibonacci(index) {
fetch('http://localhost:5050/fibonacci/'+index).then(response => {
   response.json().then(text => {
    number = document.querySelector(".number").innerHTML = text.result
});
})
}

