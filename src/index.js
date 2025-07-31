const LINE_COLOR = "#cdcdcd"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
ctx.strokeStyle = "white"
ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.moveTo(0,0)

var graph = new Graph()
var rotationCoeffs = new Coordinates(0,0,0)
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

function displayX(x) {
    return x + (canvas.width/2)
}
function displayY(y) {
    return y + (canvas.height/2)
}
function displayZ(z) {
    return Math.exp((z + 500)/1000) * 20
}

function render(graph) {
    graph.nodes.sort((a, b) => a.aparentCoordinates.z - b.aparentCoordinates.z).forEach(n => {
        if (n.color == "black") {
            console.log(n.aparentCoordinates.x,n.aparentCoordinates.y,n.aparentCoordinates.z)
        }
        ctx.beginPath()
        ctx.arc(displayX(n.aparentCoordinates.x),displayY(n.aparentCoordinates.y),displayZ(n.aparentCoordinates.z),0,2*Math.PI)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.stroke()
        n.updateCoordinates(rotationCoeffs)
        ctx.beginPath()
        ctx.arc(displayX(n.aparentCoordinates.x),displayY(n.aparentCoordinates.y),displayZ(n.aparentCoordinates.z),0,2*Math.PI)
        ctx.fillStyle = n.color//["grey","red","blue","green","black","yellow","cyan","magenta","pink","purple","seal"].at(n.value%12)
        ctx.fill()
        ctx.stroke()
    })
}

var oldPos = [0,0]
var newPos = [0,0]
canvas.onmousedown = function(event) {
    newPos = (event.x,event.y)

    function onMouseMove(event) {
        oldPos = newPos
        newPos = [event.x, event.y]
        const diff = [newPos[0]-oldPos[0],newPos[1]-oldPos[1]]
        if (diff[0]) {
            diffX = diff[0]/200
            diffY = diff[1]/200
            coefDiffX = rotationCoeffs.x + Math.sqrt(Math.pow(diffX * Math.cos(rotationCoeffs.y) * Math.sin(rotationCoeffs.z),2) + Math.pow(diffY * Math.cos(rotationCoeffs.y) * Math.cos(rotationCoeffs.z),2))
            coefDiffY = rotationCoeffs.y + Math.sqrt(Math.pow(diffX * Math.cos(rotationCoeffs.x) * Math.cos(rotationCoeffs.z),2) + Math.pow(diffY * Math.cos(rotationCoeffs.x) * Math.sin(rotationCoeffs.z),2))
            coefDiffZ = rotationCoeffs.z + Math.sqrt(Math.pow(diffX * Math.sin(rotationCoeffs.x) * Math.cos(rotationCoeffs.y),2) + Math.pow(diffY * Math.cos(rotationCoeffs.x) * Math.sin(rotationCoeffs.y),2))
            rotationCoeffs = new Coordinates(coefDiffX,coefDiffY,coefDiffZ)
            render(graph)
        }
    }

    document.addEventListener('mousemove', onMouseMove)

    canvas.onmouseleave = function() {
        document.removeEventListener('mousemove', onMouseMove)
        canvas.onmouseleave = null
        canvas.onmouseup = null
    }
    canvas.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove)
        canvas.onmouseup = null
        canvas.onmouseleave = null
    }
}
