// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// class Ball {
//   constructor(x, y, velx, vely, color, size) {
//     this.x = x;
//     this.y = y;
//     this.velx = velx;
//     this.vely = vely;
//     this.color = color;
//     this.size = size;
//   }
//   // 创建球的方法
//   draw () {
//     ctx.beginPath();
//     ctx.fillStyle = this.color;
//     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//     ctx.fill();
//   }
//   // 更新小球数据
//   update () {
//     if ((this.x + this.size) >= width) {
//       this.velx = -this.velx;
//     }
//     if ((this.x - this.size) <= 0) {
//       this.velx = -this.velx;
//     }
//     if ((this.y + this.size) >= height) {
//       this.vely = -this.vely;
//     }
//     if ((this.y - this.size) <= 0) {
//       this.vely = -this.vely;
//     }
//     this.x += this.velx;
//     this.y += this.vely;
//   }
//   // 碰撞检测，碰撞了两者一起换颜色
//   collisionDetect () {
//     for (let i = 0; i < balls.length; i++) {
//       if (!(this == balls[i])) {
//         let dx = this.x - balls[i].x;
//         let dy = this.y - balls[i].y;
//         let distance = Math.sqrt(dx * dx + dy * dy); //返回平方根
//         if (distance < this.size + balls[i].size) {
//           this.color = balls[i].color = randomColor();
//         }
//       }
//     }
//   }
// }
// 创建球的构造函数
function Ball(x,y,velx,vely,color,size){
  this.x = x;
  this.y = y;
  this.velx = velx;
  this.vely = vely;
  this.color = color;
  this.size = size;
}

// 创建球的方法
Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill();
}

// 更新小球数据
Ball.prototype.update = function(){
  if((this.x + this.size) >= width){
    this.velx = -this.velx;
  }
  if((this.x - this.size) <= 0){
    this.velx = -this.velx;
  }
  if((this.y + this.size) >= height){
    this.vely = -this.vely;
  }
  if((this.y - this.size) <= 0){
    this.vely = -this.vely;
  }
  this.x += this.velx;
  this.y += this.vely;  
}

// 碰撞检测，碰撞了两者一起换颜色
Ball.prototype.collisionDetect = function(){
  for(let i=0;i<balls.length;i++){
    if(!(this==balls[i])){
      let dx = this.x - balls[i].x;
      let dy = this.y - balls[i].y;
      let distance = Math.sqrt(dx*dx + dy*dy); //返回平方根
      if(distance < this.size + balls[i].size){
        this.color = balls[i].color = randomColor();
      }
    }
  }
}

// 小球动
function loop(){
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  // 创建小球数量
  while(balls.length < 25){
    let ball = new Ball(
      random(0, width),
      random(0, height),
      random(-7, 7),
      random(-7, 7),
      randomColor(),
      random(10, 20)
    );
    balls.push(ball);
  }

  for(let i=0;i<balls.length;i++){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}
// 调用loop函数
let balls = [];
loop();


// 生成随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}
