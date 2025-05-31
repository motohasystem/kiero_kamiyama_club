// const Kiero = {};
// Kiero.materials = [];
// Kiero.hello = function(){
//   console.log("hello, kiero!");
//   console.log(Kiero.materials);
// }

// Kiero.log = function(){
//   console.log(Kiero.materials);
// }

// Kiero.append = function(str){
//   Kiero.materials.push(str);
// }

document.addEventListener("DOMContentLoaded", function(){
  // const Kiero = require("kiero");
  // Kiero.hello();
  console.log("kiero_materials");
  // KieroMaterials = require('KieroMaterials');
  console.log(window.KieroMaterials);
  const el = document.getElementById("listup_materials");
  for(str in Kiero.materials){
      const newItem = el.createElement("LI")
      newItem.innerText = str;
      el.appendChild(newItem);
  }
});
