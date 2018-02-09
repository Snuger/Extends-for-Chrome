function easyhrip() {
 this.name="Extensions for mediinfo easyhrip";
    this.version="1.0.0.1";
    //扩展方法
  this.readCard=readCard; 
    function readCard() {
        window.postMessage({type:'readCard'},'*');
    };
    //复杂交易,传递JSON对象
    this.ComplexTranscction=ComplexTranscction;
    function ComplexTranscction(obj) {
         window.postMessage(obj,'*');
    }
}
