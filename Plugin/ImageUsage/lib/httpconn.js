function httpconn(method,ssl){
// todo: implements test for set of methods
this._coveredMethods = [“GET”,”POST”];
this.method = (method     == undefined)?”GET”:method;
this.port     = (ssl         == undefined)?”80″:ssl;
this.init();
}
httpconn.prototype.setUrl=function(url){
this.url    =    url;
this._configureSocket();
return this;
}
httpconn.prototype.init=function(){
this.socket = new Socket;
this.socket.timeout = 15;
this._parsedparam = new Object();
this.params = new Object();
this.contentType = “Content-Type: application/x-www-form-urlencoded; charset=UTF-8”;
this.extraHeader = “”;
}
httpconn.prototype.clean=httpconn.prototype.init;
httpconn.prototype._configureSocket=function(){
var _urlsplit        = this.url.replace(/[http|https]*[://]*/,””);
_urlsplit            = _urlsplit.split(“/”);
this.host             = _urlsplit[0];
if (_urlsplit[1] != undefined ){
_urlsplit.shift();
this.path        = “/”+ _urlsplit.join(“/”);
}else{
this.path        = “/”;
}
return this;
}
httpconn.prototype._parseParam=function(){
var _parsedparam = “”;
for (i in this.params){
_parsedparam = _parsedparam + ( ( (_parsedparam.length!=0)?”&”:””)+i+”=”+String( this.params[i]) );
}
this._parsedparam.str = _parsedparam;
this._parsedparam.length = _parsedparam.length;
return this;
}
httpconn.prototype.addParam=function(name, value){
this.params[name] =value;
return this;
}
httpconn.prototype.setContentType=function(ct){
this.contentType = ct+”n”;
}
httpconn.prototype.addHeader=function(headerLine){
this.extraHeader+=headerLine+”n”;
}
httpconn.prototype.request=function(){
var _request = this.method;

if (this.method==”POST”)
_request +=” “+this.path+” HTTP/1.1n”;
else
_request +=” “+this.path+”?”+this._parsedparam.str+” HTTP/1.1n”;

_request +=”Host: “+this.host+”:”+this.port+” n” +
“User-Agent: Arizona Systemsn” +
“Accept: */*n”+
this.contentType;
_request+=this.extraHeader;
if (this.method==”POST”)
_request+=”Content-Length: “+this._parsedparam.length+”n”;

_request+=”Connection: keep-alivernrn”;

alert(“host:”+this.host+”n method:”+this.method+”n port:”+this.port+”n dados:”+this._parsedparam.str);
alert(“request:”+_request);
this.socket.listen(this.port);
this.socket.open(this.host+”:”+this.port);
this.socket.write(_request);
this.socket.write(this._parsedparam.str);
//    this.clean();
return this.socket.read();
}