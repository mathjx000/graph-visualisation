class Coordinates {
    constructor(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }

    copy() {
        return new Coordinates(this.x,this.y,this.z)
    }

    multiply(factor) {
        const x = Math.sqrt(Math.pow(this.x * Math.cos(factor.y) * Math.cos(factor.z),2) + Math.pow(this.y * Math.cos(factor.x) * Math.sin(factor.z),2) + Math.pow(this.z * Math.cos(factor.x) * Math.sin(factor.y),2))
        const y = Math.sqrt(Math.pow(this.x * Math.cos(factor.x) * Math.sin(factor.z),2) + Math.pow(this.y * Math.cos(factor.x) * Math.cos(factor.z),2) + Math.pow(this.z * Math.sin(factor.x) * Math.cos(factor.y),2))
        const z = Math.sqrt(Math.pow(this.x * Math.sin(factor.x) * Math.cos(factor.z),2) + Math.pow(this.y * Math.sin(factor.x) * Math.cos(factor.z),2) + Math.pow(this.z * Math.cos(factor.x) * Math.cos(factor.y),2))
        return new Coordinates(x,y,z)
    }
}