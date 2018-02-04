function easyhrip() {
 this.name="Extensions for mediinfo easyhrip";
    this.version="1.0.0.1";
    //扩展方法
  this.readCard=readCard; 
    function readCard() {
        window.postMessage({type:'readCard'},'*');
    };
}
/*
window.addEventListener("message",
    function (event) {
        console.log("inject.js接收到返回消息:"+JSON.stringify(event.data));
    } , false);*/