class Graph {
    constructor() {
        this.nodes = []
    }

    addChild(node){
        this.nodes.push(node)
    }
}

class Node {
    /**
     * 
     * @param {Graph} parent
     * @param {number} value
     * @param {number[]} nbs
     */
    constructor(parent, value, color, nbs, coords) {
        parent.addChild(this)
        this.value = value
        this.color = color
        this.nbs = nbs
        this.absoluteCoordinates = coords //new Coordinates(Math.floor(Math.random() * 500),Math.floor(Math.random() * 500),Math.floor(Math.random() * 250))
        this.aparentCoordinates = this.absoluteCoordinates.copy()
    }

    /**
     * 
     * @param {Coordinates} rotationFactor 
     */
    updateCoordinates(rotationFactor) {
        this.aparentCoordinates = this.absoluteCoordinates.multiply(rotationFactor)
    }
}