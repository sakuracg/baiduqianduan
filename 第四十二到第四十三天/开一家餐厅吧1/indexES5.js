// ES5
// var ifeRestaurant = new Restaurant({
//   cash: 1000000,
//   seats: 20,
//   staff: []
// });

// var newCook = new Cook("Tony", 10000);
// ifeRestaurant.hire(newCook);

// console.log(ifeRestaurant.staff);

// ifeRestaurant.fire(newCook);
// console.log(ifeRestaurant.staff);

// 餐厅类
// 属性 资金  座位数  员工
// 方法 雇佣和解雇员工
function Restaurant(obj){
  this.cash = obj.cash;
  this.seats = obj.seats;
  this.staff = obj.staff;
}
// 雇佣职员
Restaurant.prototype.hire = function(newCook){
  newCook.id = '00' + this.staff.length;
  this.staff.push(newCook);
  console.log('Hello,' + newCook.name + '！我们的伙伴！');
}
// 解雇职员
Restaurant.prototype.fire = function(cook){  
  let index = this.staff.indexOf(cook);
  if(index !== -1){
    console.log(cook.name + '你被解雇了，再见吧！');
    this.staff.splice(index,1);    
  }else{
    console.log('咱们还没有雇佣这位小哥欧！');
  }
}

// 职员类
// 属性ID 姓名 薪水
// 方法 完成工作
function Employee(name, salary){
  this.id = '';
  this.name = name;
  this.salary = salary;
}
// 完成一次工作
Employee.prototype.completeWork = function(){
  console.log(this.name + '完成了工作');
}

// 服务员类继承自职员类
function Attendant(name, salary){
  Employee.call(this, name, salary);
  this.foods = [];
}
Attendant.prototype = Object.create(Employee.prototype);
Attendant.prototype.constructor = Attendant;
Attendant.prototype.completeWork = function(foods){    
  if(typeof foods === Array){     //  点菜    
    for(let i=0;i<foods.length;i++){
      this.foods.push(foods[i]);         
    } 
    console.log('您要点的菜为:' + this.foods.join());   
  }else{   //  上菜
    this.foods = [];
    console.log('给你上菜完毕');    
  }  
}

// 厨师类
function Cook(name, salary){
  Employee.call(this, name, salary);
}
Cook.prototype = Object.create(Employee.prototype);
Cook.prototype.constructor = Cook;
Cook.prototype.completeWork = function(food){
  console.log(this.name + '做完了' + food);
}

// 顾客类
function Customer(){
  this.menu = [];
}
Customer.prototype.chooseDish = function(food){
  this.menu.push(food);
  console.log('我要点' + food.name);
}
Customer.prototype.eat = function(){
  if(this.menu.length !== 0){
    this.menu.splice(this.menu.indexOf(food),1);
    console.log('我开始吃了' + food.name);
  }else{
    console.log('没菜了！');
  }    
}

// 菜品类
function Food(name, cost, price){
  this.name = name;
  this.cost = cost;
  this.price = price;
}

// 测试
var ifeRestaurant = new Restaurant({
  cash: 1000000,
  seats: 20,
  staff: []
});

var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);
