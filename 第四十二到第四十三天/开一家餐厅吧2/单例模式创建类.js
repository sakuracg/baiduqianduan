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
var singleAttendant = (function(){
  var instance = null;
  function Attendant(name,salary){
    Employee.apply(this,arguments);
    this.food = '';
  };
  Attendant.prototype = {
    constructor: Attendant,
    notifyCook: function(food){
      if(food !== null){
        this.food = food;                                
        console.log('贝厨师啊，你要做一份:' + this.food.name);   
        let ck = singleCook.getInstanceCook('贝大厨',10);        
        ck.cookFood(this.food); 
        ck.notifyAttendant(food);
        ck = null;
      }else{
        this.food = '';
        console.log('给你上菜完毕');    
      }
    },
    serveFood: function(food){
      console.log('服务员:' + food.name + '来了！');
    }

  };
  return{
    name: 'Attendant',
    getInstanceAttendant: function(name,salary){
      if(instance === null){
        instance = new Attendant(name,salary);
      }
      return instance;
    }
  }
})();


// 厨师类
var singleCook = (function(){
  var instance = null;
  
  function Cook(name, salary){
    Employee.apply(this,arguments);
  }

  Cook.prototype = {
    constructor: Cook,
    cookFood: function(food){
      console.log(this.name + '做完了' + food.name);
    },
    notifyAttendant: function(food){
      console.log('可以上菜了！');
      let adant = singleAttendant.getInstanceAttendant('贝小二',20);      
      adant.serveFood(food);
      adant = null;
    }
  }
  return {
    name: 'Cook',
    getInstanceCook: function(name, salary){
      if(instance === null){
        instance = new Cook(name, salary);
      }
      return instance;
    }
  }  
})();


// 顾客类
function Customer(name){
  this.name = name;  
}
Customer.prototype.chooseFood = function(food){  
  console.log(this.name + '要点' + food.name);
  singleAttendant.getInstanceAttendant('贝小二', 3500).notifyCook(food);
}
Customer.prototype.eat = function(food){  
  console.log('我开始吃了' + food.name);
}

// 菜品类
function Food(name, cost, price){
  this.name = name;
  this.cost = cost;
  this.price = price;
}

// 菜单
function getMenu(foods){
  let menus = [];
  for(let i=0;i<foods.length;i++){
    let objFood = {};
    objFood.name = foods[i].name;
    objFood.price = foods[i].price;
    menus.push(objFood);
  }
  return menus;
}

// 顾客来，服务员问顾客，服务员告诉厨师，厨师做完菜告诉服务员，服务员上菜，顾客吃完！

var ifeRestaurant = new Restaurant({
  cash: 100000,
  seats: 1,
  staff: []
});

// 创建厨师和服务员，并被雇佣
var newCook = singleCook.getInstanceCook('贝大厨', 100);
var newAddentand = singleAttendant.getInstanceAttendant('贝小二', 100);
ifeRestaurant.hire(newCook);
ifeRestaurant.hire(newAddentand);

// 先一个顾客
// var customer = new Customer();
// var ifeFood = new Food('水煮肉票', 23, 50);

// customer.chooseFood(ifeFood);
// newAddentand.notifyCook(ifeFood);
// newCook.notifyAttendant(ifeFood);
// customer.eat(ifeFood);

// 一个顾客队列
var customerQueue = ['王小志','张大伟','王建伟','王小胖'];

// 菜品
var ifeFoods = [
  new Food("麻辣小龙虾", 30, 88),
  new Food("酸辣土豆丝", 8, 18),
  new Food("肉末茄子", 12, 28),
  new Food("水煮肉片", 30, 58),
];

var menus = getMenu(ifeFoods);

for(let i=0, len=customerQueue.length; i<len; i++){
  let cus = new Customer(customerQueue.shift());  
  let index = Math.floor(Math.random() * menus.length);
  cus.chooseFood(menus[index]);
  cus.eat(menus[index]);
  console.log('---------------------------');
  if(!customerQueue.length){
    console.log('没有顾客了，服务员可以休息了啊！');
  }
}




