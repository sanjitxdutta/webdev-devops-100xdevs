function getAdultMales(arr) {
    return arr.filter(user => user.gender === "male" && user.age > 18);
}

const users = [
    { name: "Sanjit", age: 21, gender: "male" },
    { name: "Priya", age: 21, gender: "female" },
    { name: "Raman", age: 11, gender: "male" }
];

console.log(getAdultMales(users));
