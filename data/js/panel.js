var text;
var textArea = document.getElementById("edit-box");
var button 	 = document.getElementById("btn-translate");
var parag	 = document.getElementById("result");
var option   = document.getElementById("lan");

button.addEventListener("click", function(event){
	  text = textArea.value;
	  self.port.emit("translate", text, option.value);
});

self.port.on("send", function(translated_text){
	  parag.innerHTML = translated_text.capitalize();
});