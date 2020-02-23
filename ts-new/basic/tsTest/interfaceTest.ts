interface Person {
    name: string,
    age: number,
    gender?: string
}

const getPersonName = (person: Person): void => {
    console.log(person.name)
}

const getPersonAge = (person: Person): void => {
    console.log(person.age)
}

const setPersonName = (person: Person, name: string): void => {
    person.name = name
}

const setPersonAge = (person: Person, age: number): void => {
    person.age = age
}

export {
    Person,
    getPersonName,
    getPersonAge,
    setPersonName,
    setPersonAge
}
