// JavaScript Document

;(function(global) {
  global.data = [{
    "dealId": "1",
    "dealImg": "image/c300x181.jpg",
    "dealTitle": "Bewerben Sie Ihre Produkte",
    "dealPrice": "288.00",
    "dealNum": "1",
    "dealDetail": "München:2:5;Hamburg:1:8;Frankfurt:2:10;"
  },
  {
    "dealId": "2",
    "dealImg": "image/c300x181 (5).jpg",
    "dealTitle": "Faites la promotion de vos produits",
    "dealPrice": "388.00",
    "dealNum": "1",
    "dealDetail": "Marseille:1:15;Lyon:4:28;Toulouse:3:20;"
  }, 
  {
    "dealId": "3",
    "dealImg": "image/c300x181 (3).jpg",
    "dealTitle": "Promuovi i tuoi prodotti",
    "dealPrice": "588.00",
    "dealNum": "1",
    "dealDetail": "Milano:2:30;Torino:1:50;"
   },
   {
    "dealId": "4",
    "dealImg": "image/c300x181 (2).jpg",
    "dealTitle": "Advertise Your Products",
    "dealPrice": "488.00",
    "dealNum": "1",
    "dealDetail": "Manchester:2:20;Birmingham:1:25;"
   }
   ];
  
  global.tmpl = function() {
    var cache = {}
    return function(str, data) {
      var fn = cache[str] || new Function("obj", "var p=[];" + "for(var i in obj){" + "if(obj.hasOwnProperty(i)){p.push('" + str.replace(/[\r\t\n]/g, "").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');}")
      cache[str] = fn
      return fn(data)
    }
  }()
})(this)