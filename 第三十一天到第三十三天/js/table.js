// 多选的表格渲染
function createNewTable() {   
  tableWrapper.innerHTML = '';  //清空原表
  // 根据表单选项获取数据
  let data = getData();
  let value = getChecksVal();   //得到所有复选框的数据
  // 渲染表格
  let otable = document.createElement('table');
  otable.setAttribute('border','1');
  otable.style.textAlign = 'center';  
  // 创建表头
    // 得到每个复选框选的个数
  let regionLen = value[0].length,
      productLen = value[1].length;
  let flag = 1;  
  if(productLen > regionLen)
    flag = 0;
  createTableTh(otable,flag);
  //创建tr，td
  for(let i=0;i<data.length;i++){
    let otr = document.createElement('tr');
    createTableTr(otr,data[i],flag);
    for(let j=0;j<data[i].sale.length;j++){
      let otd = document.createElement('td');
      otd.innerHTML = data[i].sale[j];
      otr.appendChild(otd);
    }
    otable.appendChild(otr);      
  }  
  tableWrapper.appendChild(otable);
  
// 合并相同类项
  let bigLen = (regionLen-productLen)>0? regionLen: productLen,
      smallLen = (regionLen-productLen)>0? productLen: regionLen;    
  let n = 0; 
  while(smallLen){   //遍历第一列的种类  
    let startRow = parseInt(0 + n*bigLen);
    let endRow = startRow + bigLen - 1;  // 要按照数组下标来搞
    let col = 0;   //要合并的列
    for(let i = startRow; i < endRow; i++) {      
      // 报Cannot read property 'cells' of undefined错误是因为没找找到相应的行以及单元格
      if(otable.rows[startRow].cells[col].innerHTML == otable.rows[i + 1].cells[col].innerHTML) { //如果相等就合并单元格,合并之后跳过下一行        
        otable.rows[i + 1].removeChild(otable.rows[i + 1].cells[col]);  // 移出下面相同值元素的单元格        
        otable.rows[startRow].cells[col].rowSpan = (otable.rows[startRow].cells[col].rowSpan) + 1;        
      }
    }    
    otable.rows[startRow].cells[0].setAttribute('rowspan',bigLen);         
    --smallLen;
    ++n;
  }
  // console.log(otable.rows[0].cells);
}

// 创建 商品和地区两列的数据排序
function createTableTr(obj,data,flag){  
  let td1 = document.createElement('td'),
      td2 = document.createElement('td');
  td1.innerHTML = data.product;
  td2.innerHTML = data.region;
  if(flag){
    obj.appendChild(td1);
    obj.appendChild(td2);
  }else{
    obj.appendChild(td2);
    obj.appendChild(td1);
  }
}

// 创建表头
function createTableTh(obj,flag){
// 为1（选择商品小于等于地区） 则商品在第一行，为0 则地区在第一行
  let thProduct = document.createElement('th');
  let thRegion = document.createElement('th');  
  thProduct.innerHTML = '商品';
  thRegion.innerHTML = '地区';
  if(flag){
    obj.appendChild(thProduct);
    obj.appendChild(thRegion);
  }else{
    obj.appendChild(thRegion);
    obj.appendChild(thProduct);
  }  
  for(let i=1;i<=12;i++){
    let oth = document.createElement('th');
    oth.innerHTML = i + '月';
    obj.appendChild(oth);
  }
}

// 得到单个复选框的值
function getCheckVal(obj){
  let val = [];  
  for(let i=0;i<obj.length;i++){    
    if(obj[i].checked){
      val.push(obj[i].value);
    }    
  }
  return val;
}

// 得到所有复选框的值
function getChecksVal(){
  let value = [];  
  let regions = document.getElementsByName('checkregion');
  let products = document.getElementsByName('checkproduct');  
  value.push(getCheckVal(regions));
  value.push(getCheckVal(products));
  return value;
}

//得到表格数据
function getData(){  
  // 得到复选框的值
  let value = getChecksVal();

  //判断product 和 region 谁相同的互临  来解决单元格合并问题
  let flag = 1;  // 1代表商品 0代表地区
  if(value[0].length < value[1].length){  //如果地区少，则为0
    flag = 0;
  }
  let newDataArr = [];
  
  //匹配数据
  if(flag){
    for(let prod=0;prod<value[1].length;prod++){
      for(let reg=0;reg<value[0].length;reg++){
        for(let i=0;i<sourceData.length;i++){
          if(sourceData[i].product == value[1][prod] && sourceData[i].region == value[0][reg])
            newDataArr.push(sourceData[i]);
        }
      }      
    }          
  }else{  //地区在前    
    for(let reg=0;reg<value[0].length;reg++){
      for(let prod=0;prod<value[1].length;prod++){
        for(let i=0;i<sourceData.length;i++){
          if(sourceData[i].region == value[0][reg] && sourceData[i].product == value[1][prod])
            newDataArr.push(sourceData[i]);
        }  
      }
    }      
  }  
  return newDataArr;
}