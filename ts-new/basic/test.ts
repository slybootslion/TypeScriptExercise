import {add} from "./tsTest/tsInDir";
import {getPersonAge, getPersonName, setPersonName} from "./tsTest/interfaceTest";
import {Student} from "./tsTest/class";

const addRes = add({a: 3, b: 6})
console.log(addRes)

const person = {
    name: 'slybootlsion',
    age: 18
}

getPersonName(person)
setPersonName(person, 'SlybootsLion')
getPersonName(person)
getPersonAge(person)

const stu = new Student()
stu.say('bey')
