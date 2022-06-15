let gridColumns = 32;
let gridRows = gridColumns;
let pixelWidth= 10;
let isPainting = false;
let eraseMode = false;
sketchs=[[],[],[]];
let sketchNum = 0;
let sketch = [];
let audio = document.getElementById("buttonClick"); 

let createGrid = function(columns,rows){
    let container = document.querySelector('.grid-container');
    let gridColStyle = '';
    for(let col=0;col<gridColumns;col++){
        gridColStyle += 'auto ';
    }
    container.style.gridTemplateColumns = gridColStyle;
    for(let i=0;i<gridRows;i++){
        addItems(columns);
    }
}


let addItems = function(columns){
    let container = document.querySelector('.grid-container');
    let cols = document.querySelectorAll('.grid-item').length;
    for (let i=cols;i<columns+cols;i++){
        let gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.dataset.col=i+1;
        container.appendChild(gridItem);
    }
}

let removeGrid = function(){
    let container = document.querySelector('.grid-container');
    let child = container.lastElementChild; 
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
}


let paintItem = function(e){
    let index = e.path[0].dataset.col;
    let item = document.querySelector(`[data-col="${index}"]`);
    if (isPainting){
        if(eraseMode){
            item.classList.remove('painted');
            sketchs[sketchNum][index-1]=false;
        }
        else{
            item.classList.add('painted');
            sketchs[sketchNum][index-1]=true;
        }
    }
    else {
    };
}

let switchSketch = function(){
    sketchNum++;
    if (sketchNum>=sketchs.length){
        sketchNum = 0;
    }
    paintSketch(sketchNum);
}

let createSketchs = function(){
    for(let i=0;i<sketchs.length;i++) {
        sketchs[i] = Array.apply(null, Array(gridColumns*gridRows)).map(function () {});
    };
}

let paintSketch = function(index){
    let dots = document.querySelectorAll('.grid-item');
    dots.forEach(dot => {
            dot.classList.remove('painted');
    })   
    sketchArray=sketchs[index];
    for(let i=0;i<sketchArray.length;i++){
        let dot = document.querySelector(`[data-col="${i+1}"]`);
        if (sketchArray[i]==true){
            dot.classList.add('painted');
        }
        else{
            dot.classList.remove('painted');
        }
    }
}


let init = function(){

    window.addEventListener('mousedown',(e) => {
        isPainting = true;
    });
    window.addEventListener('mouseup',(e) => {
        isPainting = false;
    });


    let switchButton = document.querySelector('#switch_button');
    switchButton.addEventListener('click',(e) => {
        audio.currentTime = 0;
        audio.play();
        switchSketch();
    });

    let eraserButton = document.querySelector('#eraser_button');
    eraserButton.addEventListener('click',(e) => {
        eraseMode=!eraseMode;
        eraseMode ? eraserButton.classList.add('button_active') : eraserButton.classList.remove('button_active');
        audio.currentTime = 0;
        audio.play();
    });

    let newButton = document.querySelector('#new_button');
    newButton.addEventListener('click',(e) => {
        removeGrid();  
        let value = Number(askQty());
        gridColumns=value;
        gridRows=value;
        newSketch();
        audio.currentTime = 0;
        audio.play();
    });

    newSketch();
}

let askQty = function(error=false){
    let value;
    if(error){
        value = window.prompt('Invalid value. How many pixels per line? (10 to 90)'); 
    }
    else{
        value = window.prompt('How many pixels per line? (10 to 90)');
    }
    if(value>=10 && value<=90){
        return value;
        
    }
    else{
        return askQty(true);
    }
}

let newSketch = function(){
    createGrid(gridColumns,gridRows);

    let gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(e => {
        e.addEventListener('mouseover',(e) => {
            paintItem(e)
        });
    })

    createSketchs();
}

init();