const User = require('../js/User.js')

describe('User', () => {
        const user = new User('Louis', 'Armstrong', 19)
    test('should have an id', () => {
        expect(user.id).toBeTruthy()
    })
    test('should have a first name', () => {
        expect(user.firstName).toBe('Louis')
    })
    test('should have a second name', () => {
        expect(user.secondName).toBe('Armstrong')
    })
    test('should have a full name', () => {
        expect(user.fullName).toBe('Louis Armstrong')
    })
    test('should have an age', () => {
        expect(user.age).toBe(19)
    })
    test('should be old enough when 19', () => {
        expect(user.isOldEnough).toBe(true)
    })
    test('should not be old enough when 17', () => {
        user.age = 17
        expect(user.isOldEnough).toBe(false)
    })
})
