//Author: jyx
//Date: 2014.10.11
//Description: This is a javaScript file use for handle contextMenus action
//When click the contextMenus, it will sent the infomation to native app

var port = null;
var bException=false;
var bSelfQuit = false;

//chrome与本地程序通信的桥梁，根据该名称进行配置项的寻找。windows下在注册表HKEY_CURRENT_USER\Software\Google\Chrome\NativeMessagingHosts内寻找，
//linux下在目录/etc/opt/chrome/native-messaging-hosts/寻找该名称的json文件（本例子为com.ctrip.ops.mysql.callapp.json）

//onNativeDisconnect
function onDisconnected()
{    //alert("连接到FastDownload服务失败: " + chrome.runtime.lastError.message);
    port = null;
    if (!bSelfQuit) {
        port = null;
        bException = true;
    }

}

function onNativeMessage(message) {
 console.log(message);
 /*if(message){
     if(message.type=="back"){
         sendResponse({result:true,cardInfo:{id:"41132719881010497X",name:"马庆俭",addrss:"浙江省杭州市" }});
     }
 }*/

}

function sendNativeMsg(msg) {
    if (port != null) {
        port.postMessage(msg);
        console.log("sendNativeMsg msg:%s sucess!", msg);
    }
    else {
        console.log("sendNativeMsg failed!");
    }
}



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch(request.opera){
              case "readCard":
             //sendResponse({result:true,cardInfo:{id:"41132719881010497X",name:"马庆俭",addrss:"浙江省杭州市" }});

             /* connectToNativeHost();
                IdReadCrd(request);
                sendResponse({result:true,cardInfo:{id:"41132719881010497X",name:"马庆俭",addrss:"浙江省杭州市" }});
                chrome.runtime.sendNativeMessage(nativeHostName,
                   { opeara: "readCard" },
                   function(response) {
                  sendResponse({result:true,cardInfo:{id:"41132719881010497X",name:"马庆俭",addrss:"浙江省杭州市" }});
                  console.log("Received " + response);
              });*/
               var msg={opera:"readCard"};
               sendNativeMsg(msg);
               break;
       }
   });


function connectNativeApp() {
    bSelfQuit = false;
    var hostName = "com.mediinfo.NativeMegDemo";
    port = chrome.runtime.connectNative(hostName);

    if (port != null)
    {
        console.log("connectNativeApp sucessful!");
        port.onMessage.addListener(onNativeMessage);
        port.onDisconnect.addListener(onDisconnected);
    }
    else
    {
        bException = true;
        //SetToolbarExceptionStatus();
        console.log("connectNativeApp failed!");
    }
}

function Init() {
    connectNativeApp();
}
Init();