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

function foo(name: any) {
    return name
}

const stu = new Student()
stu.say('bey ！！')

// 这是一条注释，编译之后会被删除
