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