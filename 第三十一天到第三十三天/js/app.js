// 对象或数组自己根据喜好实现均可
createCheckbox(document.getElementById('region-radio-wrapper'), [{
  value: 1,
  text: "手机"
}, {
  value: 2,
  text: "笔记本"
}, {
  value: 2,
  text: "智能音箱"
}]);

createCheckbox(document.getElementById('product-radio-wrapper'), [{
  value: 1,
  text: "华南"
}, {
  value: 2,
  text: "华北"
}, {
  value: 2,
  text: "华东"
}]);

let tableWrapper = document.getElementById('table-wrapper');
let checks = document.getElementsByTagName('input');
for(let i=0;i<checks.length;i++)
checks[i].onchange = function(){     
  createNewTable();
}
createNewTable();