const sum = require('./sum')

test('Properly adds two numbers', () => {
    expect(sum(1,2)).toBe(3)
})

test('Allows only numbers', () => {
    expect(() => sum('a', 4)).toThrow(TypeError)
})
