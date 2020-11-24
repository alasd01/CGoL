var canvas = document.querySelector('canvas');
var num_rows = Math.round(canvas.height / 10);
var num_cols = Math.round(canvas.width / 10);

var ctx = canvas.getContext('2d');
var keepGoing = true;
var gen = 0;
var nostart = true;

var grid = CreateGrid(num_rows);
var newGrid = CreateGrid(num_rows);
ctx.clearRect(0, 0, canvas.width, canvas.height);
imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

ClearGrid();
printGrid();


var btn = document.getElementById('stop');
btn.onmousedown = function(){
    keepGoing = false;
}

var btn2 = document.getElementById('start');
btn2.onmousedown = function(){
    keepGoing = true;
    tick();
}

var btn3 = document.getElementById('iterate');
btn3.onmousedown = function(){
    if(!keepGoing){
        UpdateGraph();
        printGrid();
        UpdateGeneration();
    }
}

var btn4 = document.getElementById('clear');
btn4.onmousedown = function(){
    keepGoing = false;
    ClearGrid();
    printGrid();
    gen = 0;
    var element = document.getElementById("generations");
    element.innerHTML = gen;
}

var btn5 = document.getElementById('rando');
btn5.onmousedown = function(){
    keepGoing = false;
    ClearGrid();
    randomGrid();
    printGrid();
    gen = 0;
    var element = document.getElementById("generations");
    element.innerHTML = gen;
}



function UpdateGeneration(){
    var element = document.getElementById("generations");
    gen++;
    element.innerHTML = gen;
}


//functions 
function tick() { //main loop
    if(keepGoing){
        printGrid();
        UpdateGraph();
        UpdateGeneration();
        setTimeout(tick, 50);
    }
}

function CreateGrid(num_rows){
    var arr = [];
    for(var i = 0; i < num_rows; i++){
        arr[i] = [];
    }
    return arr;
}

function ClearGrid(){
    for(var i = 0; i < num_rows; i++){
        for(var j = 0; j < num_cols; j++){
            grid[i][j] = 0;
        }
    }
}

function randomGrid(){
    for(var i = 0; i < num_rows; i++){
        for(var j = 0; j < num_cols; j++){
            grid[i][j] = Math.round(Math.random());
        }
    }
}

function printGrid(){
    var x = 0;
    var y = 0;
    for(var i = 0; i < num_rows; i++){
        for(var j = 0; j < num_cols; j++){
            if(grid[i][j] == 1){
                ctx.fillStyle = "#FF00F0";
                ctx.fillRect(x, y, 10, 10);
                ctx.beginPath();
                ctx.rect(x,y,10,10);
                ctx.stroke();
            }
            else{
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(x, y, 10, 10);
                ctx.beginPath();
                ctx.rect(x,y,10,10);
                ctx.stroke();
            }
            x += 10;
        }
        y += 10;
        x = 0;
    }
}

function UpdateGraph(){
    var num_alive = 0;
    var i, j;

    for(i =0; i < num_rows; i++){
        for(j = 0; j < num_cols; j++){

            if (i + 1 < num_rows){
                if(grid[i+1][j] == 1){
                    num_alive++;
                }
                if(j+1 < num_cols){
                    if (grid[i + 1][j + 1] == 1) {
                        num_alive++;
                    }
                }
                if(j-1 >= 0){
                    if(grid[i+1][j-1] == 1){
                        num_alive++;
                    }
                }

            }
            if(i - 1 >= 0){
                if(grid[i-1][j] == 1){
                    num_alive++;
                }
                if(j+1 < num_cols){
                    if (grid[i - 1][j + 1] == 1) {
                        num_alive++;
                    }
                }
                if(j-1 >= 0){
                    if(grid[i-1][j-1] == 1){
                        num_alive++;
                    }
                }
            }
            if(j - 1 >= 0){
                if(grid[i][j-1] == 1){
                    num_alive++;
                }
            }
            if(j + 1 < num_cols){
                if(grid[i][j+1] == 1){
                    num_alive++;
                }
            }

            newGrid[i][j] = 0;
            if((grid[i][j] == 1) && num_alive < 2){
                newGrid[i][j] = 0;
            }

            if((grid[i][j] == 1) && num_alive > 3){
                newGrid[i][j] = 0;
            }

            if((grid[i][j] == 1) && (num_alive == 2 || num_alive == 3)){
                newGrid[i][j] = 1;
            }


            if((grid[i][j] == 0) && (num_alive == 3)){
                newGrid[i][j] = 1;
            }

            num_alive = 0;
        }


        }
    for(i = 0; i < num_rows; i++){
        for(j =0; j < num_cols; j++){
            grid[i][j] = newGrid[i][j];
        }
    }
}

