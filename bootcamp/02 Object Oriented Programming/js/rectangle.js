class Rectangle {
    constructor (height, width) {
        this.height = height
        this.width = width
    }
    area () {
        return this.height * this.width
    }
    perimeter () {
        return 2*(this.height + this.width)
    }
    static areaDiff (r1, r2) {
        return Math.abs(r1.area() - r2.area())
    }
}

const rectangle1 = new Rectangle(12, 3)
const rectangle2 = new Rectangle(15,5)

const materials = [
    { name: 'Mahogany', costPerM: 1.50 },
    { name: 'Pine', costPerM: 1.10 }
]

class Frame extends Rectangle {
    constructor (height, width, material) {
        super(height, width)
        this.material = material
    }
    calcCost () {
        return this.perimeter()*this.material.costPerM
    }
    get displayCost () {
        return `£${this.calcCost().toFixed(2)}`
    }
    get displayArea () {
        return `${super.area()}m^2`
    }
}

const f1 = new Frame(4, 5, materials[0])
console.log(f1.displayCost)
f1.material = materials[1]
console.log(f1.displayCost)