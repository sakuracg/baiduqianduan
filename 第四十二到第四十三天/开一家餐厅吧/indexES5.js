// ES5
function extend(Sub,Sup){
  var F = function(){};
  // 设置空函数的原型为超类
  F.prototype = Sup.prototype;
  // 实例化空函数，来传递超类
  Sub.prototype = new F();
  // 重置子类构造器为子类本身
  Sub.prototype.constructor = Sub;

  if(Sup.prototype.constructor === Object.prototype.constructor){
    // 检查超类原型
    Sup.prototype.constructor = Sup;
  }
}

// 餐厅类
function Restaurant(cash, seats, staff){
  this.cash = cash;
  this.seats = seats;
  this.staff = staff;
}
// 雇佣职员
Restaurant.prototype.hire = function(newCook){
    this.staff.push(newCook);
}
// 解雇职员
Restaurant.prototype.fire = function(cook){
  for(let i=0;i<this.staff.length;i++){
    if(cook.id == this.staff[i].id){
      this.staff.splice(i,1);      
    }
  }
}

// 职员类
function Employee(id, name, salary){
  this.id = id;
  this.name = name;
  this.salary = salary;
}
// 完成一次工作
Employee.prototype.completeWork = function(){
  console.log(this.name + '完成了工作');
}

// 服务员类继承自职员类
function Attendant(id, name, salary, foods){
  Employee.call(this, id, name, salary);
  this.foods = foods;
}
Attendant.prototype = Object.create(Employee.prototype);
Attendant.prototype.constructor = Attendant;
// 重写完成工作的方法
Attendant.prototype.completeWork = function(){  
  let txt = '';
  if(typeof this.foods === Array){    
    txt = '您要点的菜为:';
    for(let i=0;i<this.foods.length;i++){
      txt += ' ' + this.foods[i].name;
    }    
  }else{
    txt = '给您上菜完毕';
  }
  console.log(txt);
}

// 厨师类
function Cook(id, name, salary, food){
  Employee.apply(this,arguments);
  this.food = food;
}
Cook.prototype = Object.create(Employee.prototype);
Cook.prototype.constructor = Cook;
Cook.prototype.completeWork = function(){
  console.log(this.name + '做完了' + this.food);
}

// 顾客类
function Customer(){
}
Customer.prototype.ChooseDish = function(food){
  console.log('我要点' + food.name);
}
Customer.prototype.Eat = function(){
  console.log('我开始吃了');
}

// 菜品类
function Food(name, cost, price){
  this.name = name;
  this.cost = cost;
  this.price = price;
}

let ifeRestaurant = new Restaurant(100000,20,[]);
let newCook = new Cook('0001', 'Tony', 10000);
ifeRestaurant.hire(newCook);
console.log(ifeRestaurant.staff);
ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);
