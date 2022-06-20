fibSequence = [0, 1]
function fibonacci (index) {
if (index < 1) {
    return index
}
    for (let i = 0; i < index-2; i++) {
        fibSequence.push(fibSequence[fibSequence.length-1] + fibSequence[fibSequence.length-2])
    }
    return fibSequence[index-1]
    }
    let index, number;
    document.querySelector(".btn").addEventListener("click", function() {
         index = document.querySelector("#index").value;
    
         number = document.querySelector(".number").innerHTML = fibonacci(index);
        })
    
    console.log(index, number)