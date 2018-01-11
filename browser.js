const Sass = require("./sass.js");
const sass = new Sass();

document.addEventListener("DOMContentLoaded",event=>{

   if(window.SASS_FILES && window.SASS_FILES.length){
     sass.preloadFiles("", "", window.SASS_FILES, function callback() {
       run();
     });
   }else{
     run();
   }

   function run() {
     const list = document.querySelectorAll("style[type='text/scss']");

     list.forEach(style=>{
       const txt = style.innerText;
       sass.compile(txt,result=>{
         let styleDom = document.createElement("style");
         styleDom.innerText = result.text;
         document.body.appendChild(styleDom);
       });
     });
   }

});
