class User {
    fullName: string
    firstName: string
    lastName: string

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.fullName = firstName + ' ' + lastName
    }
}

interface Person {
    firstName: string
    lastName: string
}

const greeter = (person: Person) => {
    return `Hello, ${person.firstName} ${person.lastName}`
}

const user1 = new User('Lu', 'Gang')
const user2 = {
    firstName: 'Lu',
    lastName: 'Gang'
}

console.log(greeter(user2))
console.log(greeter(user1))
