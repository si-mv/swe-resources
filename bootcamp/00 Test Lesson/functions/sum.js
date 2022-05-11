function sum (a,b) {
    if (isNaN(a) || isNaN(b)) {
        throw new TypeError('sum only accepts numbers!')
    }
    return a + b
}

module.exports = sum