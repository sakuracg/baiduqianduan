// ES6
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
class Restaurant{
  constructor(obj){
    this.cash = obj.cash;
    this.seats = obj.seats;
    this.staff = obj.staff;
  }

  getCash(){
    return this.cash;
  }

  hire(newCook){
    newCook.id = '00' + this.staff.length;
    this.staff.push(newCook);
    console.log('Hello,' + newCook.name + '！我们的伙伴！');
  }

  fire(cook){
    let index = this.staff.indexOf(cook);
    if(index !== -1){
      console.log(cook.name + '你被解雇了，再见吧！');
      this.staff.splice(index,1);      
    }else{
      console.log('咱们还没有雇佣这位小哥欧！');
    }
  }
}

// 职员类
class Employee{
  constructor(name, salary){
    this.id = '';  // 内部定义id
    this.name = name;
    this.salary = salary;
  }

  completeWork(){
    console.log(this.name + '完成了工作');
  }
}

// 服务员类继承职员类
class Attendant extends Employee{
  constructor(name, salary){
    super(name, salary);
    this.foods = [];
  }

  completeWork(foods){
    if(foods instanceof Array){
      for(let i=0;i<foods.length;i++){
        this.foods.push(foods[i]);
      }
      console.log('您要点的菜为:' + this.foods.join());      
    }else{
      this.foods = [];
      console.log('给你上菜完毕'); 
    }
  }
}

// 厨师类继承职员类
class Cook extends Employee{
  constructor(name, salary){
    super(name, salary);
  }

  completeWork(food){
    console.log(this.name + '做完了' + food);
  }
}

// 顾客类
class Customer{
  constructor(){
    this.menu = [];  // 菜类
  }

  chooseDish(food){
    this.menu.push(food);
    console.log('我要点' + food.name);
  }
  eat(food){
    if(this.menu.length !== 0){
      this.menu.splice(this.menu.indexOf(food),1);
      console.log('我开始吃了' + food.name);
    }else{
      console.log('没菜了！');
    }    
  }  
}

// 菜品类
class Food{
  constructor(name, cost, price){
    this.name = name;
    this.cost = cost;
    this.price = price;
  }
}

// 测试
var ifeRestaurant = new Restaurant({
  cash: 1000000,
  seats: 20,
  staff: []
});

let newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);
// 调用一次方法
newCook.completeWork('莲花鱼');

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);