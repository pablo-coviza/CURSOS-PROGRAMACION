const numbers = [1, 2, 5, 123, 32, 35, 52, "Bearer ", "Bearer", 98];

function checkAge(age) {
    return age > 18;
}

function checkToken(token) {

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === "Bearer") {
            token = numbers[i];
            return token;
        }
    }
}

function checkIncludes(token) {
    if (numbers.includes("Bearer")) {
        return token;
    }
}
//console.log(numbers.find(checkAge));
console.log(numbers.find(checkToken));
console.log(numbers.find(checkIncludes));
