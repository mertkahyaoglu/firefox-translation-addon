var text,
	textArea = document.getElementById("edit-box"),
	button 	 = document.getElementById("btn-translate"),
	parag	 = document.getElementById("result"),
	textArea = document.getElementById("edit-box");

button.addEventListener("click", function(event){
	  text = textArea.value;
	  self.port.emit("translate", text);
});

self.port.on("send", function(translated_text){
	  parag.textContent = translated_text.capitalize();
});

self.port.on("show", function onShow() {
  textArea.focus();
});
