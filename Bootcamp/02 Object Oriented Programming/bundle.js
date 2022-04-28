(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./js/Scooter.js":2,"./js/User.js":3}],2:[function(require,module,exports){
class Scooter {
    constructor (id, user, dockedAt, dockLocation, rentedAt, broken, rangeRemaining) {
        this.id = id
        this.user = user
        this.dockedAt = dockedAt || Date.now()
        this.dockLocation = dockLocation
        this.rentedAt = rentedAt || 0
        this.broken = broken
        this.rangeRemaining = rangeRemaining || 32
    }
    get currentlyDocked () {
        return this.dockedAt > this.rentedAt
    }
    get currentlyRented () {
        return !this.currentlyDocked
    }
    get chargeLevel () {
        return Math.max(this.rangeRemaining / 32.)
    }
    get timeTilCharged () {
        return (1 - this.chargeLevel) * 2*60*60
    }
    get displayTimeTilCharged () {
        let t = this.timeTilCharged
        const h = Math.floor( t / (60*60) )
        t = t - h*60*60
        const m = Math.floor( t / 60 )
        t = t - m*60
        const s = t.toFixed(0)
        return `${h} h ${m} m ${s} s (${(this.chargeLevel*100).toFixed(2)}%)`
    }
    dock (broken, distanceTravelled, dockLocation) {
        this.broken = true
        this.dockedAt = Date.now()
        this.rangeRemaining = Math.min(this.rangeRemaining - distanceTravelled)
        this.dockLocation = dockLocation
        if (broken) {
            this.contactMaintenance()
        } else {
            this.startCharging()
        }
    }
    contactMaintenance () {
        console.log(```
            Dear maintenance,

            Scooter with id ${this.id} has been logged as broken by user ${this.user}.

            The scooter is located at ${this.dockLocation}.
        ```)
    }
    fix () {
        this.dock(false, 0, dockLocation)
        this.rangeRemaining = 32
    }
    startCharging () {
        setTimeout(() => {
            this.rangeRemaining = Math.min( this.rangeRemaining + 32 / (2*60*60), 32)
            if (this.chargeLevel < 1) {
                this.startCharging()
            }
            console.log(this.displayTimeTilCharged)
        }, '1000')
    }
}

module.exports = Scooter
},{}],3:[function(require,module,exports){
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
},{"nanoid":4}],4:[function(require,module,exports){
let { urlAlphabet } = require('./url-alphabet/index.cjs')
let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * defaultSize) / alphabet.length)
  return (size = defaultSize) => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size = 21) =>
  customRandom(alphabet, size, random)
let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte > 62) {
      id += '-'
    } else {
      id += '_'
    }
    return id
  }, '')
module.exports = { nanoid, customAlphabet, customRandom, urlAlphabet, random }

},{"./url-alphabet/index.cjs":5}],5:[function(require,module,exports){
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
module.exports = { urlAlphabet }

},{}]},{},[1]);
