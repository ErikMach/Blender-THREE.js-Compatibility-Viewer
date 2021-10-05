let file;

function splash() {
  setTimeout(() => {
   document.getElementsByClassName('splash')[0].style.opacity = 0;
   setTimeout(() => {
     document.getElementsByClassName('splash')[0].style.zIndex = '-1';
   }, 500);
  }, 1200);
}

function readFile() {
  if (file) {
//    while (document.getElementsByClassName('content')[0].lastChild) {
//      document.getElementsByClassName('content')[0].removeChild(document.getElementsByClassName('content')[0].lastChild);
//    }
    diseng();
  }
    file = Array.from(document.getElementById('fileIn').files)[0];
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
      init(e.target.result);
    });
    reader.readAsText(file);
    document.getElementById('filename').innerHTML = file.name;

    document.getElementById('readFile').style.border = '0px solid #f06c6c';
    document.getElementById('readFile').style.margin = '0';
    document.getElementById('clearFiles').style.visibility = 'visible';
    document.getElementById('readFile').style.visibility = 'visible';
    document.getElementById('clearFiles').style.opacity = 0.5;
    document.getElementById('readFile').style.opacity = 0.5;
}

function clearFiles(n) {
  diseng();
//CLEAR INPUT (delete.then(recreate))
  document.getElementsByClassName("LHS")[0].removeChild(document.getElementById('fileIn'));
  let newIn = document.createElement('input');
  newIn.id = 'fileIn';
  newIn.type = 'file';
  newIn.setAttribute('oninput', 'readFile()');
  document.getElementsByClassName("LHS")[0].appendChild(newIn);
//CLEAR PREVIEWS
 //   document.getElementsByClassName('content')[0].removeChild(document.getElementsByClassName('content')[0].lastChild);

  file = undefined;

  document.getElementById('filename').innerHTML = '';
//RESET BUTTON STYLES (if needed)
  if (!n) {
    document.getElementById('clearFiles').className = '';
    document.getElementById('readFile').style.opacity = 1;
    document.getElementById('clearFiles').style.opacity = 0;
    setTimeout(() => {
      document.getElementById('clearFiles').style.visibility = 'hidden';
      document.getElementById('clearFiles').className = 'vividHover';
    }, 200);
  }
}
