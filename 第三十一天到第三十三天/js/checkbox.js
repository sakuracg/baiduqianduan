// CheckBox选项的参数对象或者数组
function createCheckbox( obj,  params) {      
  let txtHtml = '';
  let type = obj.getAttribute('type');  // 获取obj的type 区分不同的复选框组
  //创建复选框
  let checkboxParent = '<label><input type="checkbox" checkbox-type="all" id="'+ type +'" value="全选"/>全选</label>'
  txtHtml += checkboxParent;  
  params.forEach((item,index) => {
    let child = '<p><label><input type="checkbox" name="check'+ type  +'" checkbox-type="child" value="'+ item.text +'"/>' + item.text + '</label></p>';    
    txtHtml += child;
  });
  // 容器innerHTML = 生成好的html集合  
  obj.innerHTML = txtHtml;
  document.getElementsByName('check' + type)[0].checked = true;

  let checkChilds = document.getElementsByName('check' + type);  
  obj.onclick = function(event){
    event = event || window.event;
    let target = event.target || event.srcElement;        
    if(target.type == 'checkbox'){      
      let attribute = target.getAttribute('checkbox-type');
      if(attribute == 'all'){ //全选
        let flag = 0;                
        if(target.checked){
          flag = 1;
        }        
        //遍历所有的子选项        
        for(let i=0;i<checkChilds.length;i++){                    
          if(flag){
            checkChilds[i].checked = true;
          }else{
            checkChilds[i].checked = false;
          }
        }
      }else{   // 非全选        
        // 遍历所有子选项
        let len = 0;
        for(let i=0;i<checkChilds.length;i++){
          if(checkChilds[i].checked){
            len += 1;
          }
        }
        // 是否只有一个 只剩下一个则不会被取消选中        
        if(len < 1){
          target.checked = true;
        }
        // 是否为全选        
        if(len == checkChilds.length){
          document.getElementById(type).checked = true;
        }else{
          document.getElementById(type).checked = false;
        }        
      }
    }
  }    
}