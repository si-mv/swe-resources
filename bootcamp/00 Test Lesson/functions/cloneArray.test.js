const cloneArray = require('./cloneArray')

test('properly clones an array', () => {
    const arr = [1,2,3]
    expect(cloneArray(arr)).toEqual(arr)
    expect(cloneArray(arr)).not.toBe(arr)
})