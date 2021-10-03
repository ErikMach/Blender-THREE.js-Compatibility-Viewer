let files = [];

function splash() {
  setTimeout(() => {
   document.getElementsByClassName('splash')[0].style.opacity = 0;
   setTimeout(() => {
     document.getElementsByClassName('splash')[0].style.zIndex = '-1';
   }, 500);
  }, 1200);
}

function readFile() {
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
      init(JSON.parse(e.target.result));
    });
  if (files.length == 0) {
    files = removeNGLTF(Array.from(document.getElementById('fileIn').files));
    document.getElementById('readFile').style.border = '0px solid #f06c6c';
    document.getElementById('readFile').style.margin = '0';
    document.getElementById('clearFiles').style.visibility = 'visible';
    document.getElementById('fileName').style.visibility = 'visible';
    document.getElementById('readFile').style.visibility = 'visible';
    document.getElementById('clearFiles').style.opacity = 0.5;
    document.getElementById('readFile').style.opacity = 0.5;
    document.getElementById('fileName').style.opacity = 0.5;
  } else {
    let filesTemp = files.concat(Array.from(document.getElementById('fileIn').files));
    clearFiles(1);
    files = filesTemp;
  }
  loadFile(files);
}


function loadFile(files) {
  files.forEach((file, index) => {
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
      init(JSON.parse(e.target.result));
    });
    reader.readAsText(file);
    let p = document.createElement('p');
    var ext = file.name.substr(-5, 5);
    if (file.name.substr(-5, 5) !== '.gltf') {
      p.innerHTML = `<b>'${file.name}' is not a GLTF file</b>\r\n Please Clear the selection and re-upload`;
      p.style.color = '#f06c6c';
    } else {
      p.innerHTML = `${file.name.slice(0,-4)}${sillyName}`;
      p.id = 'Step' + index;
      p.className =  'boldHover';
      p.setAttribute('onmouseover', `boldFile(${index})`);
      p.setAttribute('onmouseout', `unBoldFile(${index})`);
      fileNames.push(file.name);
    }
    document.getElementById('GLPreview').appendChild(p);
  });
  if (fileNames.length == files.length) {
    checkMissing();
  };
}