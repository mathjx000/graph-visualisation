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
     * @param {Graph} parent
     * @param {number} value
     * @param {string} color
     * @param {number[]} nbs
     * @param {Coordinates} coords
     */
    constructor(parent, value, color, nbs, coords) {
        parent.addChild(this)
        this.value = value
        this.color = color
        this.nbs = nbs
        this.absoluteCoordinates = coords //new Coordinates(Math.floor(Math.random() * 500),Math.floor(Math.random() * 500),Math.floor(Math.random() * 250))
        this.aparentCoordinates = this.absoluteCoordinates.toDOM();
    }
}
