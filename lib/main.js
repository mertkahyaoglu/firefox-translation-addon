var data             = require("sdk/self").data;
var { Panel } 	     = require("sdk/panel");
var { ToggleButton } = require("sdk/ui/button/toggle");


var button = ToggleButton({
  id: "show-panel",
  label: "Show Panel",
  icon: {
    "16": "./img/icon-16.png",
    "32": "./img/icon-32.png",
    "64": "./img/icon-64.png"
  },
  onClick: handleClick
});

var text_entry = Panel({
  contentURL: data.url("panel.html"),
  contentScriptFile: [data.url("js/panel.js"), data.url("js/util.js"), data.url("js/jquery.js")],
  position: {
	    top: 0,
	    right:0
  },
  width: 250,
  height: 185
});


function handleClick(state) {
  text_entry.show();
}


text_entry.port.on("text-entered", function (text) {
  console.log(text);
});

text_entry.port.on("translate",function(text){
    require("sdk/request").Request({
    url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
    content: {
      key: "trnsl.1.1.20140503T155134Z.d80ca533bc3f09d7.ff776c369e3ee1165cfd9b846b4f8370e0d21dfc",
      lang: "tr",
      text: text
    },
    onComplete: function(response){
      if(response.status=200) {
        console.log(response.json['text']);
        text_entry.port.emit("send", response.json['text'][0]);
      }
    }
}).get();
});

