const nanoid = require('nanoid')

class User {
    constructor (firstName, secondName, age) {
        this.id = nanoid.nanoid()
        this.firstName = firstName
        this.secondName = secondName
        this.age = age
    }
    get isOldEnough () {
        return this.age >= 18
    }
    get fullName () {
        return `${this.firstName} ${this.secondName}`
    }
}

module.exports = User