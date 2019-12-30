var tabs = document.querySelectorAll('.info-box li a');
var panels = document.querySelectorAll('.info-box article');

// 遍历所有选项卡
for(let i=0;i<tabs.length;i++){
  let tab = tabs[i];
  setTabHandler(tab,i);
}

function setTabHandler(tab, tabIndex){
  tab.onclick = function(){
    // 去掉原来的样式
    for(let i=0;i<tabs.length;i++){
      if(tabs[i].getAttribute('class')){
        tabs[i].classList.remove('active');
      }
    }

    // 添加样式
    tabs[tabIndex].setAttribute('class','active');

    // 去掉面板的样式
    for(let i=0;i<panels.length;i++){
      if(panels[i].getAttribute('class')){
        panels[i].classList.remove('active-panel');
      }
    }

    // 添加样式
    panels[tabIndex].setAttribute('class','active-panel');

  }
}