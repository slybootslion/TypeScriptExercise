import {add} from "./tsTest/tsInDir";

interface Person {
    name: string
}

const teacher: Person = {
    name: 'Dell Lee'
}

class testClass {
    a = 1

    printFun(a: number) {
        console.log(a)
    }

    printTest() {
        console.log('this is a test ts file')
    }
}

const addRes = add({a: 3, b: 6})
console.log(addRes)
