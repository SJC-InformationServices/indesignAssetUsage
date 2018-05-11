#include "../json-js/json2.js";
#include "../json-js/json_parse.js";
#include "../json-js/json_parse_state.js";
#include "../json-js/cycle.js";
#include "../base64/base64-encode-decode.js";

function submitResults (type,obj){
    var conn = new Socket(); 
    var o = JSON.stringify(obj);
    //alert(o);
    try{   
        
        conn.open("10.2.1.143:80","UTF-8")
     
         var str = "PUT /storeme_createHistory.php?type="+type+" HTTP/1.0\r\n";
         str += "Content-Type:application/json; charset=utf-8 \r\n";
         str += "Content-Length:"+o.length +"\r\n";
         str += "\r\n";
         str += o;
         
         conn.write(str);
         var results = conn.read(99999999);         
         //alert(results);
         conn.close();
         return results;
    }catch(e){
        alert('Server Connection Failed Please Notify Information Services' + e.message);
    }
}
function registerDocument(ev)
{

    var doc = ev.target;
    
    if(doc.constructor.name !== 'Document')
    {
        return;
    }
    var docObj = {
        'documentsuser':$.getenv("USERNAME"),
        'documentssystemid':$.getenv("COMPUTERNAME"),
        'documentsname': doc.name,
        'documentsfullpath':doc.filePath.fullName,
        'documentsevent':ev.eventType
    };
    
    submitResults('documents',docObj);   
}

function registerChanges(ev)
{    
    var doc = ev.target;
        
    if(doc.constructor.name !== 'Document')
    {
        return;
    }
    //Todo: Get DocumentID
    var links = doc.links;
    var allLinks = {
         'documentsuser':$.getenv("USERNAME"),
        'documentssystemid':$.getenv("COMPUTERNAME"),
        'documentsname': doc.name,
        'documentsfullpath':doc.filePath.fullName,
        'documentsevent':ev.eventType,
        allLinks:[]
    };
    for(var i =0;i<links.length;i++)
    {
        var link = links[i];        
        var lk = {
            'linkid':link.id,
            'linkname' : link.name, 
            'linklabel':link.label, 
            'linktype' : link.linkType,
            'linksize' : link.size,
            'linkfullpath':link.filePath
        };        
        if(link.name.indexOf('fpo') != -1 || link.name.indexOf('hires') != -1 )
        {
            var imgkey = link.name.substr(0,link.name.indexOf ('v')).replace('fpo','').replace('hires','');
            lk['linklagoid'] = imgkey;
        }
        allLinks.allLinks.push(lk);
    }
    submitResults('documentlinks',allLinks);
}