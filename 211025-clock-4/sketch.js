// endless array iteration.

const container = document.getElementById('p5-container')
// make sure there is a #p5-container in index.html.

// Canvas Vars
let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let hoursMax = {n: 24, rows: 2}
let minsMax = {n: 60, rows: 1}
let secsMax = {n: 60, rows: 1}
let hsecsMax = {n: 100, rows: 1}

let clockIntervals = [hoursMax,minsMax,secsMax]

let clockGrid = []

// Recursive Grid Generator
function recursiveGrid(zeroX, zeroY, grid, gridW, gridH, initLevel, maxLevel, curTime, arr) {
    let myTiles = arr

    this.time = curTime
    this.index = 0

    this.grid = grid
    console.log(this.grid)


    this.level = initLevel

    // if (initLevel % 2 == 0) {
    //     this.cols = this.grid.rows
    //     this.rows = this.grid.n
    // } else {
    //     this.cols = this.grid.n
    //     this.rows = this.grid.rows
    // }

    this.cols = this.grid.n
    this.cols = this.grid.rows

    let tileW = gridW / this.cols
    let tileH = gridH / this.rows


    for (let x = 0; x < this.cols; x++) {
        let xOff = zeroX + (x * tileW)

            for (let y = 0; y < this.rows; y++) {
                let yOff = zeroY + (y * tileH)

                if (this.time[this.level] == this.index) { 
                    recursiveGrid(xOff, yOff, clockIntervals[this.level+1], tileW, tileH, this.level+1, maxLevel, this.time, myTiles)
                } else { 
                    myTiles.push( new Tile(xOff, yOff, tileW, tileH, 255/this.level) ) 
                }

                this.index++

            }
    }
    return myTiles
}

// p5 Setup
function setup() {
    //initial setup of canvas and container
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)
    frameRate(60)
    //actual code starts here

    background(255)

    let now = new Date()
    let time = [
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
    ]

    stroke(240)
    clockGrid = recursiveGrid(0,0,clockIntervals[0],width,height,0,clockIntervals.length,time,clockGrid)

    console.log(time, clockGrid)

    for (let t = 0; t < clockGrid.length; t++) {
        clockGrid[t].draw()
    }

}

// p5 Draw
function draw() {

}