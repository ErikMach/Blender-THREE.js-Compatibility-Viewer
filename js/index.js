let TKnodes = [];
let TKparas = [];
let TKIBID = [];
let pure = [];
let GLContent = '';
let GLSize;
let files = [];
let fileNames = [];
let fileName = '';
const fakeExt = ['gtlb', 'gtif', "don'tGetConverted", 'TGIFRIDAYS', 'LGBT', 'gltf', 'NelsonRocks', "Erik's a Beast", 'gtfl', 'lgfi'];
const legoKey = {
  1: "Camera",
  2: "Axel - Beam Connector - 180",
  3: "Axel Connector",
  4: "Axel Connector Hub - 3",
  5: "Axel Pin Connector - 1 PH",
  6: "Axel Pin Connector - 2 PH",
  7: "Axel Pin Connector - Angled #1",
  8: "Axel Pin Connector - Angled #2",
  9: "Axel Pin Connector - Angled #3",
  10: "Axel Pin Connector - Angled #4",
  11: "Ball Joint",
  12: "Beam 1x3",
  13: "Beam 1x5",
  14: "Beam 1x5 - Thin",
  15: "Beam 1x7",
  16: "Beam 1x7 - Bent Thick",
  17: "Beam 1x9",
  18: "Beam 1x9 - Bent Thick",
  19: "Beam 1x11",
  20: "Beam 1x11.5 - Double Bent Thick",
  21: "Beam 1x13",
  22: "Beam 1x15",
  23: "Brick 1x2",
  24: "Brick 1x2 - Hole",
  25: "Brick 1x4",
  26: "Brick 1x4 - Hole",
  27: "Brick 1x6",
  28: "Brick 1x6 - Hole",
  29: "Brick 1x8",
  30: "Brick 1x8 - Hole",
  31: "Brick 1x16 - Hole",
  32: "Bush",
  33: "Bush - Half",
  34: "Buzzer",
  35: "Curved Panel",
  36: "DC Motor",
  37: "DC Motors",
  38: "DC Motor Controller",
  39: "DC Motor Drive",
  40: "DC Motor Rotating Element",
  41: "DC Motor Rig",
  42: "DC Motor Cable Header",
  43: "Bone",
  44: "Fairing Long - A",
  45: "Fairing Short - B",
  46: "Fairing Short - A",
  47: "Fairing Short - B",
  48: "Frame 5x7",
  49: "Gear - 8 Tooth",
  50: "Gear - 20 Tooth",
  51: "Gear - 24 Tooth",
  52: "Gear - 24 Tooth Crown",
  53: "Gear - 40 Tooth",
  54: "i - Beam",
  55: "IR Detector Sensor",
  56: "IR Transceiver",
  57: "Joystick",
  58: "Keys",
  59: "L - Beam 2x4",
  60: "L - Beam 3x5",
  61: "LED Digital Display",
  62: "Light Sensor",
  63: "Main Controller Hub",
  64: "Micro USB Cable",
  65: "Mini B USB Cable",
  66: "Perpendicular Connector Hub - 3L",
  67: "Perpendicular Connector Hub - 3x3",
  68: "Pin Connector Hub",
  69: "Plate 1x4",
  70: "Plate 1x6",
  71: "Plate 2x4",
  72: "Plate 2x6",
  73: "Plate 2x10",
  74: "Plate 6x8",
  75: "Plate 6x12",
  76: "Plate 8x12",
  77: "Plate 10x20",
  78: "RFID",
  79: "RGB Lamp",
  80: "Rotary Knob",
  81: "Rotor Blade - Small",
  82: "RTC",
  83: "Soil Humidity Sensor",
  84: "Sound Sensor",
  85: "T - Beam",
  86: "Technic Axle - 1.5cm",
  87: "Technic Axle - 2.3cm",
  88: "Technic Axle - 3.1cm",
  89: "Technic Axle - 4.7cm",
  90: "Technic Axle - 5.5cm",
  91: "Technic Axle - 7.9cm",
  92: "Technic Axle + Stop",
  93: "Technic Pin 3 - Quart",
  94: "Technic Pin and Axle",
  95: "Technic Pin Long",
  96: "Technic Pin Long - Tan",
  97: "Technic Pin Short",
  98: "Technic Pin Short - Grey",
  99: "Temp + Humidity Sensor",
  100: "Tile 1x4",
  101: "Tile 1x6",
  102: "Touch Switch",
  103: "Tyre",
  104: "Ultrasonic Sensor",
  105: "Water Pump",
  106:"Water Pump Cable Header",
  107:"Water Pump Rig",
  108: "Wedge Belt Wheel",
  109: "Wheel",
  110: "Worm Gear",
  111: "2.4G Wireless"
}

const legoDel = [
  "DC Motor Wire",
  "Cable Cover"
];
//FOR STATS
let stats = JSON.parse(localStorage.getItem('stats')) || [["Name","#Steps","GLTF Size","TK Size", "Compression Ratio", "IbidSave", "Saved Space"]];
let IbidSave = 0;
let MiniSave = 0;
let totals;
let legoPieces = {};

displayStats();
totalsUpdate();

document.getElementById('fileName').addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    download();
  }
});

function splash() {
  setTimeout(() => {
   document.getElementsByClassName('splash')[0].style.opacity = 0;
   setTimeout(() => {
     document.getElementsByClassName('splash')[0].style.zIndex = '-1';
   }, 500);
  }, 600);
}

function readFile() {
  if (files.length == 0) {
    files = removeNGLTF(Array.from(document.getElementById('fileIn').files));
    document.getElementById('readFile').style.border = '0px solid #f06c6c';
    document.getElementById('readFile').style.margin = '0';
    document.getElementById('DLFile').style.visibility = 'visible';
    document.getElementById('clearFiles').style.visibility = 'visible';
    document.getElementById('fileSizeRatio').style.visibility = 'visible';
    document.getElementById('fileName').style.visibility = 'visible';
    document.getElementById('readFile').style.visibility = 'visible';
    document.getElementById('DLFile').style.opacity = 0.5;
    document.getElementById('clearFiles').style.opacity = 0.5;
    document.getElementById('readFile').style.opacity = 0.5;
    document.getElementById('fileSizeRatio').style.opacity = 1;
    document.getElementById('fileName').style.opacity = 0.5;
  } else {
    let filesTemp = removeNGLTF(removeDupesNSort(files.concat(Array.from(document.getElementById('fileIn').files))));
    clearFiles(1);
    files = filesTemp;
  }
  loadFile(files); 
}

function removeNGLTF(fileArr) {
  for (i=fileArr.length-1; i>-1; i--) {
   if (fileArr[i].name.substr(-5, 5) !== '.gltf') {
     fileArr.splice(i,1);
     console.log(fileArr);
   }
  };
  return fileArr;
}

function removeDupesNSort(arr) {
  var b = {};
  arr.forEach((a, i) => {
    b[a.name] = a;
  });
  arr = [];
  for (x in b) {
    let i = -1;
    for (y in b) {
      i += (x < y) ? (0) : (1);
    };
    arr[i] = b[x];
  };
  return arr;
}

function loadFile(files) {
  GLSize = 0;
  TKparas = [];
  let sillyName = fakeExt[Math.floor(Math.random()*(fakeExt.length))];
  files.forEach((file, index) => {
    GLSize += file.size;
    let reader = new FileReader();
    reader.addEventListener('load', function(e) {
      let OlNodes = JSON.parse(e.target.result).nodes;
      createTK(OlNodes, index);
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

function checkMissing() {
  let stepnums = [];
  let missingSteps = [];
  fileNames.forEach(fn => {
    stepnums.push(parseInt(fn.match(/\d+/g)));
  });
  for (i=stepnums[stepnums.length - 1]; i>0; i--) {
    if (!stepnums.includes(i)) {
      missingSteps.unshift(i);
    };
  };
  if (missingSteps.length > 0) {
    alert(`Oh no! It looks like you're missing the following step(s):\n${missingSteps.join('\n')}`);
  }
  fileNames = [];
}

function showPieces(index) {
  let step = document.getElementById('step' + index)
  if (step.style.height == 0) {
    step.style.height = 'auto';
  } else if (step.style.height == 'auto') {
    step.style.height = '0';
  } else {
  console.log(`There's an error with the Step ${index}'s pieces`);
  }
}

function createTK(OlNodes, index) {
  let nodes = [];
/*
//DELETE UN-NEEDED NODES
  for (i=OlNodes.length-1; i>-1; i--) {
//if (OlNodes[i]) {
    if (OlNodes[i].name.includes("Cable Cover") || OlNodes[i].name.includes("DC Motor Wire")) {
      OlNodes.splice(i,1);
    }
//} else {console.log(i)};
  }
*/

//RE-ORDER CHILDREN
  let fuZi = {};
  let haiZi = [];
  let fuMu = [];
  OlNodes.forEach((node, i) => {
    if (node.children) {
      fuZi[i] = [];
      node.children.forEach(childInd => {
	fuZi[i].push(childInd);
	haiZi.push(childInd);
      });
    }
  });
  Object.keys(fuZi).forEach(zi => {
    if (haiZi.includes(parseInt(zi))) {
    } else if (!haiZi.includes(parseInt(zi))) {
      fuMu.push(parseInt(zi));
    }  else {
      console.log("We are missing some Children");
    }
  });
//LOG PIECES OF LAST STEP
  if (index == files.length-1) {
    legoPieces = {};
    OlNodes.forEach((nod, ind) => {
     if (fuMu.includes(ind) || !haiZi.includes(ind)) {
    if ((nod.name.lastIndexOf('.') == nod.name.length-4) && (!isNaN(nod.name.slice(nod.name.length-3, nod.name.length)))) {
     nod.name = nod.name.slice(0, nod.name.length-4);
      if (!Object.keys(legoPieces).includes(nod.name)) {
	legoPieces[nod.name] = 1;
      } else {
	legoPieces[nod.name] += 1;
      }
    }
     }
    });
    displayPieces();
  }
//MINIFY NAMES USING LEGOKEY
  OlNodes.forEach((olnode, jit) => {
    for (i=Object.values(legoKey).length-1; i>-1; i--) {
      let lego = Object.values(legoKey)[i];
      if (olnode.name.indexOf(lego) !== -1 && olnode.name.indexOf(legoDel) === -1 ) {
	OlNodes[jit].name = parseInt(Object.keys(legoKey)[i]);
	break;
      };
    };
    if (typeof OlNodes[jit].name !== "number" && olnode.name.indexOf(legoDel) !== -1) {
      console.log(`Erik hasn't logged ${olnode.name} in the LegoKey yet`);
    }
  });
//APPEND CHILDREN TO APPROPRIATE PARENTS
  let parentNode = {};
  let thing;
  for (let x in fuZi) {
    thing = OlNodes[x];
    thing["c"] = [];
    fuZi[x].forEach(zi => {
      let obj = {};
      if (parentNode[zi]) {
if (parentNode[zi].skin) {console.log(`${parentNode[zi].name} from parentNode has a skin`);};
	if (parentNode[zi].name) {
	  obj.n = parentNode[zi].name;
	};
	if (parentNode[zi].translation) {
	  obj.t = parentNode[zi].translation;
	};
	if (parentNode[zi].rotation) {
	  obj.r = parentNode[zi].rotation;
	};
	if (parentNode[zi].scale) {
	  obj.s = parentNode[zi].scale;
	};
	if (parentNode[zi].c) {
	  obj.c = parentNode[zi].c;
	};
	thing["c"].push(obj);
      } else if (!legoDel.includes(OlNodes[zi].name)) {
	if (OlNodes[zi].name) {
	  obj.n = OlNodes[zi].name;
	};
	if (OlNodes[zi].translation) {
	  obj.t = OlNodes[zi].translation;
	};
	if (OlNodes[zi].rotation) {
	  obj.r = OlNodes[zi].rotation;
	};
	if (OlNodes[zi].scale) {
	  obj.s = OlNodes[zi].scale;
	};
        thing["c"].push(obj);
      }
    parentNode[x] = thing;
    });
  };
  haiZi.forEach(zi => {
    delete parentNode[zi];
  });
//REPLACE ALL [CHILDREN AND PARENTS] WITH [PARENT NODES THAT CONTAIN THEIR CHILDREN]
  OlNodes.forEach((node, index) => {
    if (haiZi.includes(index)) {
      OlNodes[index] = undefined;
    }
    if (fuMu.includes(index)) {
      OlNodes[index] = parentNode[index];
      delete OlNodes[index].children;
    }
  });

//EXTRACT NECESSARY INFO INTO `${nodes}`
  OlNodes.forEach((node, index) => {
    if (node) {
      let obj = {};
      if (node.name) {
	obj.n = node.name;
      } else {
	console.log(`The ${index}-th node has no name`);
      }
      if (node.translation) {
	obj.t = node.translation;
      }
      if (node.rotation) {
	obj.r = node.rotation;
      }
      if (node.scale) {
	obj.s = node.scale;
      }
      if (node.c) {
	obj.c = node.c;
      }
      nodes.push(obj);
    }
  });

  TKnodes[index] = nodes;
  let p = document.createElement('p');
  p.id =  'file' + index;
  p.className = 'boldHover';
  p.setAttribute('onmouseover', `boldFile1(${index})`);
  p.setAttribute('onmouseout', `unBoldFile1(${index})`);
  TKparas[index] = p;

  if (TKnodes.length == files.length && !TKnodes.includes(undefined)) {
    IbidSave = JSON.stringify(TKnodes).length;
    TKIBID = applyIBID(TKnodes);
    IbidSave -= JSON.stringify(TKIBID).length;
    TKIBID.forEach((ib, index) => {
      TKparas[index].innerHTML = JSON.stringify(ib);
    });
    TKparas.forEach(pa => {
      document.getElementById('TKPreview').appendChild(pa);
      pure.push(JSON.parse(pa.innerText));
    });
    window.init(pure);
  document.getElementById('fileSizeGL').innerHTML = `Original Size: <b>${convertByteSize(GLSize)}</b>`;
  document.getElementById('fileSizeTK').innerHTML = `TK File Size: <b>${convertByteSize(JSON.stringify(TKIBID).length)}</b>`;
  document.getElementById('fileSizeRatio').innerHTML = `Minified by <b>${Math.round(GLSize/(JSON.stringify(TKIBID).length))}&times;</b>`;
  } else {
//File Sizes & Comparison
  document.getElementById('fileSizeGL').innerHTML = `Original Size: <b>${convertByteSize(GLSize)}</b>`;
  document.getElementById('fileSizeTK').innerHTML = `TK File Size: <b>${convertByteSize(TKnodes.toString().length)}</b>`;
  document.getElementById('fileSizeRatio').innerHTML = `Minified by <b>${Math.round(GLSize/TKnodes.toString().length)}&times;</b>`;
  };
}

function applyIBID(XZ) {
for (i=1; i<XZ.length; i++) {
//console.log(`Changing step ${i+1}`);
  let toDel = [];
  XZ[i].push({});
  XZ[i][XZ[i].length-1].n = 'i';
  XZ[i].forEach((X, k) => {
    let check = false;
    for (j=0; j<i; j++) {
//console.log(`Searching step ${j+1}`);
      XZ[j].forEach((Z, l) => {
        if (objEq(X,Z) && X.n !== "i" && Z.n !== "i") {
	  if (XZ[i][XZ[i].length-1][j] === undefined) {
	    XZ[i][XZ[i].length-1][j] = [];
	  }
	  if (XZ[i][XZ[i].length-1][j].includes(l)) {
	    console.log(`We got a Dupe (a lego piece with same transform and name as another)`);
	  }
	  XZ[i][XZ[i].length-1][j].push(l);
	  toDel.unshift(k);
	  check = true;
//console.log(`Step ${i+1}'s ${X.n} will be replaced with step ${j+1}'s ${Z.n} `);
        }
      });
      if (check) {break;}
    }
  });
  if (Object.keys(XZ[i][XZ[i].length-1]).length == 1) {
console.log(`Step ${i} has no changes`);
    XZ[i].pop();
  } else {
    toDel.forEach(Y => {
      XZ[i].splice(Y, 1);
    });
  }
}
  return XZ;
}


function objEq(obj1, obj2, s) {
  let see;
  if (s === undefined) {
    see = true;
  } else if (s === true || s === false) {
    see = s;
  } else {console.log(`s has a stray value of ${s}`);};

  if (obj1 == undefined || obj2 == undefined) {
    see = false;
  } else {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    see = false;
  } else {
    for (x in obj1) {
      if (typeof obj1[x] === 'object') {
	if (obj1[x] instanceof Array) {
	  see = ArrEq(obj1[x], obj2[x], see);
	  if (see === false) {
	    return see;
	  }
	} else if (obj1[x] instanceof Object) {
	  see = objEq(obj1[x], obj2[x], see);
	  if (see === false) {
	    return see;
	  }
	} else {
	  console.log(`We cannot check objects with object values that are not objects or arrays`);
	}
      } else if (typeof obj1[x] === 'string' || typeof obj1[x] === 'number' || typeof obj1[x] === 'boolean' || typeof obj1[x] === 'undefined') {
	if (obj1[x] !== obj2[x]) {
          see = false;
	  break;
	}
      }
    }
  }
  }
  return see;
}


function ArrEq(arr1, arr2, s) {
  let see;
  if (s === undefined) {
    see = true;
  } else if (s === true || s === false) {
    see = s;
  } else {console.log(`s has a stray value of ${s}`);};

  if (arr1 == undefined || arr2 == undefined) {
    see = false;
    return see;
  } else {
  if (arr1.length !== arr2.length) {
    see = false;
    return see;
  } else {
    for (ii=0; ii<arr1.length; ii++) {
      let val1 = arr1[ii];
      if (typeof val1 === 'object'){
        if (val1 instanceof Array) {
	  if (ArrEq(val1, arr2[ii]) === false) {
	    return false
	  }
        } else if (val1 instanceof Object) {
	  if (objEq(val1, arr2[ii]) === false) {
	    return false
	  }
        } else {
	  console.log(`We cannot check objects with object values that are not objects or arrays`);
        }
      } else if (typeof val1 === 'string' || typeof val1 === 'number' || typeof val1 === 'boolean' || typeof val1 === 'undefined') {
	if (val1 !== arr2[ii]) {
	  see = false;
        }
      }
    };
  }
  }
  return see;
}

function convertByteSize(byteSize) {
  return size = (byteSize<1024) ? (`${(Math.round(100*byteSize)/100).toFixed(2)} Bytes`) : ((byteSize<1024**2) ? (`${(Math.round(100*byteSize/1024)/100).toFixed(2)} Kb`) : ((byteSize<1024**3) ? (`${(Math.round(100*byteSize/1024**2)/100).toFixed(2)} Mb`) : (`${(Math.round(100*byteSize/1024**3)/100).toFixed(2)} Gb`)));
}

function boldFile(index) {
  if (document.getElementById('file' + index)) {
    document.getElementById('file' + index).className = 'bolded';
    document.getElementById('file' + index).scrollIntoView({behaviour: "smooth"});
  }
  if (document.getElementsByClassName('list-item')[index]) {
    document.getElementsByClassName('list-item')[index].scrollIntoView({behaviour: "smooth"});
  }
}

function unBoldFile(index) {
  if (document.getElementById('file' + index)) {
    document.getElementById('file' + index).className = 'boldHover';
  }
}

function boldFile1(index) {
  document.getElementById('Step' + index).className = 'bolded';
  document.getElementById('Step' + index).scrollIntoView({behaviour: "smooth"});
  if (document.getElementsByClassName('list-item')[index]) {
    document.getElementsByClassName('list-item')[index].scrollIntoView({behaviour: "smooth"});
  }
}

function unBoldFile1(index) {
  document.getElementById('Step' + index).className = 'boldHover';
}

function displayMe(e, th) {
  for (i=0; i<document.getElementsByClassName('content').length; i++) {
    document.getElementsByClassName('content')[i].style.visibility = 'hidden';
  }
  document.getElementById(e).style.visibility = 'visible';
  for (i=0; i<document.getElementsByClassName('SIHeadingCont')[0].children.length; i++) {
    document.getElementsByClassName('SIHeadingCont')[0].children[i].className = 'boldHover';
  }
  th.className = 'boldHover selected';
}

function clearFiles(n) {
  diseng();
//CLEAR INPUT (delete.then(recreate))
  document.getElementById("previewCont").removeChild(document.getElementById('fileIn'));
  let newIn = document.createElement('input');
  newIn.id = 'fileIn';
  newIn.type = 'file';
  newIn.multiple = 'multiple';
  newIn.setAttribute('oninput', 'readFile()');
  document.getElementById("previewCont").appendChild(newIn);
//CLEAR PREVIEWS
  while (document.getElementById("GLPreview").lastChild) {
    document.getElementById("GLPreview").removeChild(document.getElementById("GLPreview").lastChild);
  }
  while (document.getElementById("TKPreview").lastChild) {
    document.getElementById("TKPreview").removeChild(document.getElementById("TKPreview").lastChild);
  }
  while (document.getElementsByClassName('content')[0].lastChild) {
    document.getElementsByClassName('content')[0].removeChild(document.getElementsByClassName('content')[0].lastChild);
  }

  files = [];
  TKparas = [];
  TKnodes = [];
  TKIBID = [];
  pure = [];
//CLEAR SIZE COMPARISONS
  document.getElementById('fileSizeGL').innerHTML = 'Original Size: 0 Bytes';
  document.getElementById('fileSizeTK').innerHTML = 'TK File Size: 0 Bytes';
  document.getElementById('fileSizeRatio').innerHTML = 'Minified by 1&times;';
//RESET BUTTON STYLES (if needed)
  if (!n) {
    document.getElementById('clearFiles').className = '';
    document.getElementById('readFile').style.opacity = 1;
    document.getElementById('DLFile').style.opacity = 0;
    document.getElementById('clearFiles').style.opacity = 0;
    setTimeout(() => {
      document.getElementById('DLFile').style.visibility = 'hidden';
      document.getElementById('clearFiles').style.visibility = 'hidden';
      document.getElementById('clearFiles').className = 'vividHover';
    }, 200);
  }
}

function logName(e) {
  if (e.keycode === 13) {
    document.getElementById('DLFile').click();
  }
  fileName = e.value;
  e.style.border = '2px solid #89d289';
}

function download() {
  fileName = document.getElementById('fileName').value;
  if (fileName == '') {
    document.getElementById('fileName').style.border = '2px solid #f06c6c';
  } else {
    if (TKIBID.length === 0) {
      document.getElementById('readFile').style.border = '2px solid #f06c6c';
      document.getElementById('readFile').style.margin = '-2px';
    } else {
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text;charset=utf-8,' + encodeURI(JSON.stringify(TKIBID));
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.tk';
    hiddenElement.click();
    stats.push([fileName, TKIBID.length, GLSize, JSON.stringify(TKIBID).length, GLSize/JSON.stringify(TKIBID).length, IbidSave, GLSize-JSON.stringify(TKIBID).length]);
    localStorage.setItem('stats', JSON.stringify(stats));
    displayStats();
    fileName = '';
    }
  }
}

function displayPieces() {
  while (document.getElementById('legoPieces').lastChild) {
    document.getElementById('legoPieces').removeChild(document.getElementById('legoPieces').lastChild);
  }
  let pieceList = document.createElement('ul');
  for (x in legoPieces) {
    let dot = document.createElement('li');
    dot.innerHTML = `${legoPieces[x]}&times; ${x}`;
    pieceList.appendChild(dot);
  }
  document.getElementById('legoPieces').appendChild(pieceList);
}
/* STATISTICS:
Instruction Name
#steps
GLSize
TKSize
Ibid size saved
Minification size saved
*/
function displayStats() {
  while (document.getElementById('stats').lastChild) {
    document.getElementById('stats').removeChild(document.getElementById('stats').lastChild);
  }
  let statsTable = document.createElement('table');
  stats.forEach((stat, index) => {
    let row = document.createElement('tr');
    stat.forEach((datum, ind) => {
      let cell = document.createElement('td');
      if (index === 0) {cell.innerHTML = datum;} else {
      if (ind >=2 && ind !== 4) {
	cell.innerHTML = convertByteSize(datum);
      } else if (ind === 4) {
	cell.innerHTML = `${Math.round(datum)}&times;`;
      } else {
	cell.innerHTML = datum;
      }
      }
      row.appendChild(cell);
    });
    statsTable.appendChild(row);
  });
  totalsUpdate();
  let rowF = document.createElement('tr');
  totals.forEach(total => {
    let cell = document.createElement('td');
    cell.innerHTML = total;
    rowF.appendChild(cell);
  });
  statsTable.appendChild(rowF);

  document.getElementById('stats').appendChild(statsTable);
}

function totalsUpdate() {
  totals = [stats.length-1, 0, 0, 0, 0, 0, 0];
  stats.forEach((stat, index) => {
    stat.forEach((datum, ind) => {
      if (index !== 0) {
      if (ind >=1 && ind !== 4) {
	totals[ind] += datum;
      }
      }
    });
  });
  totals[4] = `${Math.round(totals[2]/totals[3])}&times;`;
    totals.forEach((total, ind) => {
      if (ind >=2 && ind !== 4) {
	totals[ind] = convertByteSize(total);
      }
    });
}

function reposition() {
document.getElementById('readFile').style.top = document.getElementById('GLPreview').offsetTop + 'px';
document.getElementById('readFile').style.left = document.getElementById('GLPreview').offsetLeft + document.getElementById('GLPreview').offsetWidth - document.getElementById('readFile').offsetWidth + 'px' ;

document.getElementById('clearFiles').style.top = document.getElementById('GLPreview').offsetTop + document.getElementById('GLPreview').offsetHeight - document.getElementById('clearFiles').offsetHeight + 'px';
document.getElementById('clearFiles').style.left = document.getElementById('GLPreview').offsetLeft + document.getElementById('GLPreview').offsetWidth - document.getElementById('clearFiles').offsetWidth + 'px' ;

document.getElementById('DLFile').style.top = document.getElementById('TKPreview').offsetTop + 'px';
document.getElementById('DLFile').style.left = document.getElementById('TKPreview').offsetLeft + document.getElementById('TKPreview').offsetWidth - document.getElementById('DLFile').offsetWidth + 'px' ;
}