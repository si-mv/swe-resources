const User = require('./js/User.js')
const Scooter = require('./js/Scooter.js')

const user1 = new User('Aqsa', 'Hussein', 19)

console.log(user1)

const scooter1 = new Scooter(
    'oir928',
    user1,
    null,
    'Birmingham 23',
    null,
    false,
    null
)

scooter1.dock(false, 0.1, 'Manchester 13')

console.log(scooter1)