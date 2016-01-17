
var templateParserObj = {};

$("#resume_container").load("template.html"); 

this.templateParse = function(template, data) {
    var sResult = templateParserObj[template];
    if (!sResult) {
        var parserLogic = "var x=[],print=function(){x.push.apply(x,arguments);};with(obj){x.push('" +
                           template.replace(/[\r\t\n]/g, "").replace(/##\$\[(.+?)\]\$##/g, "',$1,'") +
                          "');} return x.join('');";                 
        sResult = new Function("obj", parserLogic);        
    }
    return sResult(data);
}