document.addEventListener("DOMContentLoaded",function () {
    injectCustomJs(); //注册脚本,让页面可以访问
});
// 向页面注入JS
function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function()
    {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
};

//接收来自台的请求消息并转发至后端back-ground.js
 window.addEventListener("message",
    function (event) {
     var laserExtensionId = "akgbmleopjmipmphdcppjiohldkgnfin";
     chrome.runtime.sendMessage(laserExtensionId,event.data,
         function(response) {
     });
 } , false);

//接收后端back-groud.js调用的应用程序返回消息
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log(request);
    if(request){
        if(request.Result.Code=="0"){
            switch(request.Result.TradeType){
                case "ReadCard":
                        document.getElementById("Name").value=request.Name;
                        document.getElementById("CardId").value=request.CardId;
                        document.getElementById("address").value=request.Address;
                        document.getElementById("Birthday").value=request.Birthday;
                    break;
            }
        }else{
            alert("读卡失败,失败原因:"+request.Result.Msg);
        }
    }
   // window.postMessage(request,'*');
});


