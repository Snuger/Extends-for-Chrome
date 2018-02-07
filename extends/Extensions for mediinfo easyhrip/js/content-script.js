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

 window.addEventListener("message",
    function (event) {
        var laserExtensionId = "hbmnbacgopboghnhofehjoapibhcehkb";
     chrome.runtime.sendMessage(laserExtensionId,{opera:event.data.type},
         function(response) {
            if(response){
                if(response.result){
                    switch(event.data.type){
                        case "readCard":
                            document.getElementById("idCard").value= response.cardInfo.id;
                            document.getElementById("fullName").value=response.cardInfo.name;
                            document.getElementById("address").value=response.cardInfo.addrss;
                            break;
                        default:
                            return;
                    }
                }
             }
     });
 } , false);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{    sendResponse(JSON.stringify(request));
});

