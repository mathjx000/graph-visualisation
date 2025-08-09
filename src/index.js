const LINE_COLOR = "#cdcdcd"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const world2CanvasMatrix = new DOMMatrix()
    .translateSelf(canvas.width / 2, canvas.height / 2, 0)
    // .scaleSelf(1, 1, 1);

var graph = new Graph()
let rotationMatrix = new DOMMatrix();
new Node(graph,0,"black",[],new Coordinates(-200,-200,200))
new Node(graph,0,"red",[],new Coordinates(-200,200,200))
new Node(graph,0,"green",[],new Coordinates(200,-200,200))
new Node(graph,0,"blue",[],new Coordinates(-200,-200,-200))
new Node(graph,0,"cyan",[],new Coordinates(200,-200,-200))
new Node(graph,0,"magenta",[],new Coordinates(-200,200,-200))
new Node(graph,0,"yellow",[],new Coordinates(200,200,200))
new Node(graph,0,"lightgrey",[],new Coordinates(200,200,-200))
render(graph)

function addNode() {
    new Node(graph,Math.floor(Math.random() * 50),[])
    render(graph)
}

function class_of(obj) {
    if (obj == null) return "null"
    return obj.constructor.name
}

function render(graph) {
    const transform = world2CanvasMatrix.multiply(rotationMatrix);

    for (const n of graph.nodes) {
        n.aparentCoordinates = transform.transformPoint(n.absoluteCoordinates.toDOM());
    }
    graph.nodes.sort((a, b) => a.aparentCoordinates.z - b.aparentCoordinates.z);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const n of graph.nodes) {
        ctx.beginPath()
        ctx.arc(
            n.aparentCoordinates.x,
            n.aparentCoordinates.y,
            Math.exp((n.aparentCoordinates.z + 500) / 1000) * 20,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = n.color//["grey","red","blue","green","black","yellow","cyan","magenta","pink","purple","seal"].at(n.value%12)
        ctx.fill()
    }
}

let oldPos = [0, 0];
let newPos = [0, 0];
let activePointerId = null;

canvas.addEventListener("pointerdown", (event) => {
    if (activePointerId !== null) return;

    canvas.setPointerCapture(activePointerId = event.pointerId);

    newPos = [event.x, event.y];
}, false);

canvas.addEventListener("pointerup", (event) => {
    if (activePointerId !== event.pointerId) return;
    activePointerId = null;
}, false);

canvas.addEventListener("pointercancel", (event) => {
    if (activePointerId !== event.pointerId) return;
    activePointerId = null;
}, false);

canvas.addEventListener("pointermove", (event) => {
    if (activePointerId !== event.pointerId) return;

    oldPos = newPos
    newPos = [event.x, event.y]
    const diff = [newPos[0] - oldPos[0], newPos[1] - oldPos[1]]

    const rotation = new DOMMatrix();
    rotation.rotateSelf(-diff[1] / 10, diff[0] / 10, 0);
    rotationMatrix.preMultiplySelf(rotation);

    render(graph)
}, false);
