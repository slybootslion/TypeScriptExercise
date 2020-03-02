abstract class Person {
    abstract say(str: string): void
}

class Teacher extends Person {
    say(str: string) {
        console.log('teacher say ' + str)
    }
}

class Student extends Person {
    say(str: string) {
        console.log('student say ' + str)
    }
}

export {
    Teacher,
    Student
}
