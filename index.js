fibSequence = [0, 1]
function fibonacci (index) {
if (index <= 1) {
    return index
}
    for (let i = 0; i < index-2; i++) {
        fibSequence.push(fibSequence[fibSequence.length-1] + fibSequence[fibSequence.length-2])
    }
    return fibSequence[index-1]
    }
const index = document.querySelector(".index")
const number = document.querySelector(".number")
index.innerHTML = 1;
number.innerHTML= (fibonacci(1))


