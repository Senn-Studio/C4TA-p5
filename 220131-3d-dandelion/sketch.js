/*
Convert this (https://dersenn.github.io/C4TA-svg/211121-make-some-noise/3_dandelion.html) into 3d space.

Points on a sphere Distribution adapted from this (Processing):
https://openprocessing.org/sketch/69005/
Theory:
http://mathworld.wolfram.com/SpherePointPicking.html
*/


// Canvas Vars
const container = document.getElementById('p5-container')
let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side
let landscape = false
if (canW > canH) landscape = true

// "Global" vars
let randomPoints = 100

let center
let sphereRadius = canW / 2.5

// p5 Setup
function setup() {
  let canvas = createCanvas(canW,canH,WEBGL)
  canvas.parent(container)

  center = createVector(0,0,0)
  stroke(0,0,255)
  strokeWeight(5)
  rsp = new randomSpherePoints(randomPoints, sphereRadius, center)

  // v1 = createVector(0,0,0)
  // v2 = createVector(100,100,100)
  // let l = p5.Vector.lerp(v1,v2,.5)
  // console.log(l)
}

// animation vars
let rotX = .005
let rotY = .005

// p5 Draw
function draw() {
  background(0)
  orbitControl()

  pointLight(0,255,0,-canW/2, canW/2, canW/2)

  push()
  rotateX(frameCount * rotX)
  rotateY(frameCount * rotY)
  rsp.draw()
  pop()

  // drawCenterPoint()
}

function drawCenterPoint() {
  push()
  stroke(255,0,0)
  strokeWeight(10)
  point(0,0,0)
  pop()
}
