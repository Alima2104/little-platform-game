// created by Alima Zhagufarova
// game where player can move the platform using left and right arrows and the aim is to shoot as many little squares as possible. to do so player should use mouse. 

var player1;
var enemy;
let bullets = [];
let borders = [];
var score = 0;
let step = 20;


function setup(){
  createCanvas(600,600);
  v = createVector(4, 0);
  g = createVector(0,0.2);
  x= createVector(mouseX, mouseY);
  c1 = color('#385F71');
  c2 = color('#2B4162');
  c3 = color('#A7CECB'); //opal color
  c4 = color('#F5CB5C'); //beaituful yellow
  c5 = color('#DAB6C4'); //pink
  player1 = new Player(10, 40, 100, 30, c1);
  enemy = new Enemy(150);
  enemy2 = new Enemy(250);
  enemy3 = new Enemy(350);
  
  textSize(20);
  for (let i=0; i<6; ++i){
    borders[i] = new Border((i*100), 5, 100, 25);
  }
  
  for (let i=6; i<12; ++i){
    borders[i] = new Border(((i-6)*100), height-30, 100, 25);
  }
}
function draw(){
  clear();
  background(255);
  enemy.show();
  enemy3.show();
  enemy2.show();
  enemy.move();
  enemy2.move();
  enemy3.move();
  
  player1.show();
  player1.update1(); 
  player1.checkPlBorders();
  
   for (let i=0; i<6; i++){
    borders[i].display();
  }
  for (let i=6; i<12; i++){
    borders[i].display();
  }
  
  let keepbullets = []
  let anyhit = false;
  for (let i=0; i < bullets.length; ++ i) {
      bullets[i].toMouse();
      let hit = dist(bullets[i].x, bullets[i].y, enemy.x, enemy.y) <= enemy.r;
      anyhit = anyhit || hit
      if (!hit && bullets[i].onScreen()) {
          keepbullets.push(bullets[i]);
          bullets[i].show();
          bullets[i].checkBorders();
          bullets[i].applyForce(g);
         // bullets[i].update();
      }
  }
  bullets = keepbullets;
  if (anyhit) {
      enemy = new Enemy(150);
      score += 50;
  }
  
  let keepbullets2 = []
  let anyhit2 = false;
  for (let i=0; i < bullets.length; ++ i) {
      bullets[i].toMouse();
      let hit2 = dist(bullets[i].x, bullets[i].y, enemy2.x, enemy2.y) <= enemy2.r;
      anyhit2 = anyhit2 || hit2
      if (!hit2 && bullets[i].onScreen()) {
          keepbullets2.push(bullets[i]);
          bullets[i].show();
        bullets[i].checkBorders();
        bullets[i].applyForce(g);
       // bullets[i].update();
      }
  }
  bullets = keepbullets2;
  if (anyhit2) {
      enemy2 = new Enemy(250);
      score += 50;
  }
  
  let keepbullets3 = []
  let anyhit3 = false;
  for (let i=0; i < bullets.length; ++ i) {
      bullets[i].toMouse();
      let hit3 = dist(bullets[i].x, bullets[i].y, enemy3.x, enemy3.y) <= enemy3.r;
      anyhit3 = anyhit3 || hit3
      if (!hit3 && bullets[i].onScreen()) {
          keepbullets3.push(bullets[i]);
          bullets[i].show();
         bullets[i].checkBorders();
        bullets[i].applyForce(g);
        //bullets[i].update();
      }
  }
  bullets = keepbullets2;
  if (anyhit3) {
      enemy3 = new Enemy(350);
      score += 50;
  }
  
  
  fill(0);
  text(score,500,500,100,100)
}

function mousePressed(){
    if (mouseX != player1.px || mouseY != player1.py ) {
        bullets.push( new Bullet(mouseX,mouseY,player1.px+50,player1.py+50, v) )
    }
}

function Bullet(X,Y,PX,PY, v){
    this.speed = 2;
    this.x = PX;
    this.y = PY;
    this.dir = createVector(X-PX, Y-PY).normalize()
    this.m = 1;
    this.r = 5*this.m;
    this.a = createVector(player1.px, player1.py);
    
    this.v = v;
    
    this.show = function(){
      fill('#2B4162');
      stroke('#2B4162');
      circle(this.x,this.y,this.r);
    }
  this.applyForce = function(force) { 
    let f = p5.Vector.div(force, this.m);
    this.a.add(f);
  }
  //this.update = function() {
   // this.v.add(this.a); // velocity gets changed by acceleration
    //this.x.add(this.v); // position gets changed by velocity
   // this.a.mult(0); // acceleration has to be reset (if we want dynamic acceleration we have to introduce an additional quantity, called the jerk.
  //}

    this.toMouse = function() {
        this.x += this.dir.x * this.speed;
        this.y += this.dir.y * this.speed;
    }
    this.onScreen = function() {
      return this.x > -this.r && this.x < width+this.r &&
              this.y > -this.r && this.y < height+this.r;
    }
  this.checkBorders = function(){
    if (this.x > width - this.r ) {
      this.x = width - this.r;
       this.v.x *= -1;
    } else if (this.x < this.r) {
      this.x = this.r;
      //this.v.x *= -1;
    }
    if (this.y > height - this.r-30) {
      this.y = height - this.r-30;
      this.v.y *= -1;
    } else if (this.y < this.r) {
      this.y = this.r;
      //this.v.y *= -1;
    }
  }
  
}

function Enemy(y){
  this.r = 25;
  this.x = random(0, width)+this.r;
  this.y = y+this.r;
  this.chance = random(0,1);
  console.log(this.chance);
  if (this.chance <= 0.33){
    this.speed = 4;
    this.r = 15;
    this.col = color('#DAB6C4');
  } else if(this.chance > 0.33 && this.chance <=0.66) {
    this.speed = 2.5;
    this.col = color('#F5CB5C');
  } else {
    this.speed = 1;
    this.col = color('#A7CECB');
  }
  this.show = function(){
    fill(this.col);
    stroke(this.col);
    rect(this.x,this.y,this.r, this.r);
  }
  this.move = function(){
    this.x+=this.speed;
    
    if (this.x>=(width-this.r)){
      this.x=0;
      this.x+=this.speed;
    }
    
  }
  
}

class Player {
 constructor (px, py, pw, ph, pc){
  this.px = px;
  this.py = py;
  this.pw = pw;
  this.ph = ph;
  this.pc = pc;
  this.show = function(){
    noStroke();
    fill(this.pc);
    rect(this.px, this.py, this.pw, this.ph);
  }
  this.moveY = function(number){
    this.y += (number*this.speed);
  }
  this.moveX = function(number){
    this.x += (number*this.speed);
  }
 }
  
  update1(){
    if ( keyIsDown(LEFT_ARROW) ){
       this.px -=step;
    }
    else if (keyIsDown(RIGHT_ARROW)){
        this.px +=step;
    }
  }
  
  checkPlBorders(){
    if (this.px<0){
      this.px=0;
    }
    if (this.px>(width-this.pw)){
      this.px=(width-this.pw);
    }
  }
}


class Border{
  constructor(bx, by, bw, bh){
    this.bx = bx;
    this.by = by;
    this.bw = bw;
    this.bh = bh;
    this.bc = color('#D7B377');
  }
  
  display(){
    stroke('#8F754F');
    fill(this.bc);
    rect(this.bx, this.by, this.bw, this.bh);
  }
}
  
  
