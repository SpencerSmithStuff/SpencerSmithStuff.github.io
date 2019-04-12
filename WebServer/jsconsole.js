var cns = document.createElement("textarea");
var cnsdone = document.createElement("textarea");
var form = document.createElement("div");
var execute = document.createElement("button");
//var words;
//var words2;
var almostdonewords = [];
var donewords = [];
var cnsdonestr;
var letterarray;

function cspEval(js) {
    var script = document.createElement("script")

    if(Blob) {
        var blob = new Blob([js], {"type": "application/javascript"})
        script.src = URL.createObjectURL(blob)
    } else {
        var dataUri = "data:application/javascript," + js
        script.src = dataUri
    }

    var callback = function() { document.body.appendChild(script) }
    document.readyState === "complete" ? callback() : window.onload = callback

}

cns.name="console";
cnsdone.name="consoleCompleted"
cnsdone.readOnly=true;
form.id="consoleDiv";
form.autocomplete="off";
form.autocorrect="off";
form.autocapitalize="off";
form.spellcheck=false;
execute.id = "execute";
function run() {
  cspEval(document.getElementsByName('console')[0].value); //run the code

  ///////////////////////////////////////////////////////////////////////////////// PRINT TO THE UN-EDITABLE PART OF THE CONSOLE
  almostdonewords=document.getElementsByName('console')[0].value.split(/[\s]+/);
  for(i=almostdonewords.length-1; i>=0; i--){
    letterarray=almostdonewords[i].split("");
    for(j=0; j<letterarray.length; j++){
      if(letterarray[j]==";"){
        almostdonewords.splice(i+1,0,"\n");
      }
    }
  }
  almostdonewords.unshift("\n");
  donewords.push(...almostdonewords);
  if(donewords[0]=="\n"){
      donewords.shift();
      donewords.unshift("");
  }
  cnsdonestr=donewords.join(' ');
  cnsdone.innerHTML=cnsdonestr;
  cnsdone.scrollTop=cnsdone.scrollHeight;
  cns.value="";
  /////////////////////////////////////////////////////////////////////////////////
}
execute.type = "button";
execute.value="Execute";
execute.innerHTML="Execute";

cnsdonestr=donewords.join(' ');
cnsdone.innerHTML=cnsdonestr;

form.style="z-index: 9996; border: 5px solid black; outline: none; background-color: #3d3d3d; resize: none; float: right; padding: 0; margin: 0 auto; bottom: 0; left: 0; right: 0; position: fixed; height: 40%; width: 95%;";
execute.style="z-index: 9999 !important; border-color: gray !important; background-color: gray !important; right: 2.6% !important; float: right !important; margin: 0 !important; margin-bottom: 0.5% !important; bottom: 0 !important; padding: 0 !important; position: fixed !important;";
cns.style="z-index: 9997; border: none; outline: none; background-color: #3d3d3d; resize: none; float: right; padding: 0; margin: 0 auto; bottom: 0; overflow: auto; position: fixed; height: 30%; width: 95%; color: white;";
cnsdone.style="z-index: 9998; border: none; border-bottom: 2px solid #303030; outline: none; background-color: #3d3d3d; resize: none; padding: 0; float: right; margin: 0 auto; bottom: 30%; overflow: auto; position: fixed; height: 10%; width: 95%; color: green"

form.appendChild(cns);
form.appendChild(cnsdone);
form.appendChild(execute);
document.body.append(form);
document.getElementById("execute").addEventListener("click", run);
// setInterval(function(){
//   words=document.getElementsByName('console')[0].value.split(/[\s.]+/);
//   for(i = 0; i < words.length(); i++){
//     if(isNaN(words[i])){
//
//     }
//   }
//   console.log(words);
// }, 50);
