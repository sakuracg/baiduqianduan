var restaurant = document.getElementsByClassName('restaurant')[0];
var moneyAll = document.getElementById('moneyAll');
var cooker = document.getElementById('cooker');
var cooking = document.getElementById('cooking');
var cookerState = document.getElementById('cookerState');
var attend = document.getElementById('attendant');
var attendantSpeak = document.getElementById('attendant-speak');
var cusList = document.getElementById('cusList');
var cus = document.querySelectorAll('.cus');
var customerMenu = document.getElementById('customerMenu');


// 餐厅类
// 属性 资金  座位数  员工
// 方法 雇佣和解雇员工
function Restaurant(obj){
  this.cash = obj.cash || 2000;
  this.seats = obj.seats || 1;
  this.staff = obj.staff || 1;
}
Restaurant.prototype.hire = function(employee){
  employee.id = '00' + this.staff.length;
  this.staff.push(employee);  
}
Restaurant.prototype.fire = function(employee){
  let index = this.staff.indexOf(employee);  
  if(index != -1){
    this.staff.splice(index,1);
  }else{
    alert('没有' + employee.name + '员工');
  }
}

// 职员类
// 属性ID 姓名 薪水
// 方法 完成工作
function Employee(name,salary){
  this.id = '';
  this.name = name;
  this.salary = salary;
}
Employee.prototype.completeWork = function(){
  console.log('完成了工作!');
}


// 服务员类继承自职员类
var singleAttendant = (function(){
  var instance = null;
  function Attendant(name,salary){
    Employee.call(this,name,salary);
    this.menu = [];    
    this.dishState = {
      '0': '还未上',
      '1': '菜已上',
      '2': '正在吃',
      '3': '已吃完',
    };
  }

  Attendant.prototype = {
    constructor: Attendant,
    completeWork: function(dishs){
      if(Array.isArray(dishs)){
        this.menu = dishs;
        console.log('点菜完毕');
        attendant.leftMove();  // 服务员向厨师移动
        cooker.completeWork(dishs);  // 让厨师工作        
      }else{
        // TODO 菜的状态
        attendant.rightMove();  //服务员向顾客移动
        //判断是否上完菜
        setTimeout(function(){
          if(cooker.state == 1){
            attendant.leftMove();
          }else{
            attendant.rightMove();
          }
        },1000);
        // 顾客过来吃
        queueCus.front().eat(dishs)
      }
    },

    leftMove: function(){
      attend.className = 'attendant-bg leftMove';  
    },
    rightMove: function(){
      attend.className = 'attendant-bg rightMove';  
    },
    originMove: function(){
      attend.className = 'attendant-bg'; 
    }
  }
  return {
    name: 'Attendant',
    getInstance: function(name,salary){
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
  
  function Cook(name,salary){
    Employee.call(this,name,salary);
    this.state = 0;  // 0为闲着  1为工作
  }
  
  Cook.prototype = {
    constructor: Cook,
    completeWork: function(dishs){
      if(!dishs.length){
        // console.log('已经没菜了')
        attendant.rightMove();
        cookerState.innerHTML = '没菜可做，闲的没事！';
        this.state = 0;        
        return;
      }
      let str = '';
      let time = dishs[0].time;
      for(let i=0;i<dishs.length;i++){
        str += '<li>' + dishs[i].name + '</li>';
      }
      cooking.innerHTML = str;
      function cook(resolve,reject){
        var timer = setInterval(() => {
          cooker.state = 1;
          time--;
          // console.log('我再做这个菜');
          let stateStr = '我正在做' + dishs[0].name + '还剩下<span>' + time + '秒<span>';
          cookerState.innerHTML = stateStr;
          if(!time){
            // console.log('做好了一道菜，端走吧小服务员');
            dishs[0].state = 1;
            var newDishs = dishs.filter(function(item){
              return item.state == 0;
            });
            var result = {
              dish: newDishs,
              done: dishs[0]
            }
            clearInterval(timer);
            resolve(result);
          }
        }, 1000);
      }
      new Promise(cook).then((result) => {
        cooker.completeWork(result.dish);
        attendant.completeWork(result.done);
      })
    }
  }

  return {
    name:'Cook',
    getInstance: function(name,salary){
      if(instance === null){
        instance = new Cook(name,salary);
      }
      return instance;
    }
  }
})();


// 顾客类
function Customer(name){
  this.name = name;
  this.menu = [];
}
Customer.prototype.chooseDishs = function(){
  // 顾客和客服一起移动到桌子旁
  var thinkTime = 3;
  attendant.rightMove();  
  queueCus.front().cusLeftMove();  

  // console.log('我正在想吃什么！');
  attendantSpeak.innerHTML = this.name + '快点点菜！';  
  var num = Math.floor(Math.random() * 3 + 2);
  var menus = this.menu;

  function thingking(resolve,reject){    
    for(let i=0;i<num;i++){   //点菜      
      let index = Math.floor(Math.random() * dishMenu.length);
      dishMenu[index].state = 0;
      let obj = {};
      for(let key in dishMenu[index]){
        obj[key] = dishMenu[index][key];
      }
      menus.push(obj);
    }
    console.log('想想中.....');
    var timer = setInterval(function () {      
      var think = '想想吃啥呢...' + (--thinkTime) + '秒'
      attendantSpeak.innerHTML = think;
      if (!thinkTime) {
        attendantSpeak.innerHTML = '';
        clearInterval(timer);
        resolve(menus);
      }
    }, 1000);            
  }
  new Promise(thingking).then((result) => {
    console.log('主人我点菜完毕了!');
    let menuStr = '';
    for(let i=0;i<result.length;i++)
      menuStr += result[i].name + '<br>';
    attendantSpeak.innerHTML = menuStr;
    attendant.completeWork(menus);
  })
}
Customer.prototype.eat = function(dish){
  var menu = attendant.menu;
  // console.log('开吃吧！');
  attendantSpeak.innerHTML = '开吃吧！';
  var str = '';
  
  for(let i=0;i<menu.length;i++){
    if(menu[i].state == 2){
      continue;
    }
    str += '<li>' + menu[i].name + '<span>' + attendant.dishState[menu[i].state] + '</span></li>';
  }
  customerMenu.innerHTML = str;
  var time = dish.time;
  function eatting(resolve,reject){
    var timer = setInterval(() => {
      dish.state = 2;
      var stateStr = '正在吃' + dish.name + '还剩下' + --time + '秒';
      attendantSpeak.innerHTML = stateStr;
      if(!time){
        clearInterval(timer);
        dish.state = 3;
        resolve(dish);
      }
    }, 1000);
  }

  new Promise(eatting).then((result) => {
    // 吃完更新菜单状态
    queueCus.front().upDateMenu(attendant.menu);
    var flag = true;
    // 判断是否吃完了
    for(let i=0;i<menu.length;i++){
      if(menu[i].state != 3){
        flag = false;
      }
    }

    if(flag){   // 吃完了 下一位
      attendantSpeak.innerHTML = '吃完了，结账吧！';
      for(let i=0;i<menu.length;i++)
        totalMoney += menu[i].price;      
      attendantSpeak.innerHTML += '<br>结账完毕！';  
      customerMenu.innerHTML = '';  // 餐桌清理
      // 店铺总金额
      ifeRestaurant.cash += totalMoney;
      moneyAll.innerHTML = parseInt(moneyAll.innerHTML) + totalMoney;
      if (!queueCus.isEmpty()) {
        queueCus.dequeue();
        updateCustomer(queueCus.getArr());
        run();
      }
    }else{
      var leftMenu = menu.filter((item) => {
        return item.state == 1;
      });
      if (leftMenu.length) {
          queueCus.front().eat(leftMenu[0]);
      }
    }    
  });
}
Customer.prototype.cusLeftMove = function(){
  document.querySelectorAll('#cusList>li')[0].className = 'cus';
} 
Customer.prototype.upDateMenu = function(menu){
  let str = '';
  for (let i = 0; i < menu.length; i++) {
      str += '<li>' + menu[i].name + '<span>'
           + attendant.dishState[menu[i].state] + '</span></li>';
  }
  customerMenu.innerHTML = str;
}

// 菜品
function Dish(name,price,time){
  this.name = name;
  this.price = price;
  this.time = time;
}

// 菜单
function getMenus(dishs){
  let menu = [];
  for(let i=0;i<dishs.length;i++){
    let obj = {};
    obj.name = dishs[i].name;
    obj.price = dishs[i].price;
    obj.time = dishs[i].time;
    menu.push(obj);
  }
  return menu;
}

// 顾客队列
function CustomerQueue(){
  var arr = [];
  this.enqueue = function(customer){
    arr.push(customer);
  }
  // 先入先出
  this.dequeue = function(){
    arr.shift();
  }
  this.front = function(){
    return arr[0];
  }
  this.getArr = function(){
    return arr;
  }
  this.isEmpty = function(){
    return arr.length == 0;
  }
}


var ifeDish = [
  new Dish("麻辣小龙虾", 30, 5),
  new Dish("酸辣土豆丝", 80, 3),
  new Dish("肉末茄子", 12, 6),
  new Dish("水煮肉片", 30, 5),
  new Dish("拍黄瓜", 45, 3),
  new Dish("水煮鱼", 10, 4),
  new Dish("水果沙拉", 20, 5),
];

var dishMenu = getMenus(ifeDish);
var totalMoney = 0;

var ifeRestaurant = new Restaurant({
  cash: 2000,
  seats: 1,
  staff: []
});

var cooker = singleCook.getInstance('王小二',2000);
var attendant = singleAttendant.getInstance('王大厨',4000);

ifeRestaurant.hire(cooker);
ifeRestaurant.hire(attendant);

// 顾客
var pik = new Customer('pik');
var loi = new Customer('loi');
var wang = new Customer('wang');

var queueCus = new CustomerQueue();
queueCus.enqueue(wang);
queueCus.enqueue(pik);
queueCus.enqueue(loi);

function updateCustomer(list) {
  var str = '';
  for (let i = 0; i < list.length; i++) {
      str += '<li><img src="img/customer' + list[i].name
          + '.jpg" alt=""><span class="customer">' + list[i].name
          + '</span></li>';
  }
  cusList.innerHTML = str;
}
updateCustomer(queueCus.getArr())


function run(){
  if(!queueCus.isEmpty()){
    var currentCus = queueCus.front();    
    attendant.rightMove();
    currentCus.cusLeftMove();
    currentCus.chooseDishs();
  }else{
    console.log('休息啦');
    attendantSpeak.innerHTML = '待机中....';
  }
}
run();


