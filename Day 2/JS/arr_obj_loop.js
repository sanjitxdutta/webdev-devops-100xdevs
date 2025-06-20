function getAdultMales(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].gender === "male" && arr[i].age > 18) {
            result.push(arr[i]);
        }
    }
    return result;
}


const users = [
    { name: "Sanjit", age: 21, gender: "male" },
    { name: "Priya", age: 21, gender: "female" },
    { name: "Raman", age: 11, gender: "male" }
];

console.log(getAdultMales(users));
