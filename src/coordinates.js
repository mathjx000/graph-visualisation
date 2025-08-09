class Coordinates {
    constructor(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }

    copy() {
        return new Coordinates(this.x,this.y,this.z)
    }

    toDOM() {
        return new DOMPointReadOnly(this.x, this.y, this.z);
    }
}
