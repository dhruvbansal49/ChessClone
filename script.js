let chessBoard = $(".chess-board");
let chess = [];

let forw = {
    "black":1,
    "white":-1
}
let back = {
    "black":-1,
    "white":1
}
let turn = 1;
let turnObj={
    1:"white",
    2:"black"
}
// console.log(chess);
function newGame(){
    for(let i=0;i<8;i++){
        chess[i]=[]
        for(let j=0;j<8;j++){
            if(i==0){
                if(j==0||j==7){
                    chess[i][j]={color:"black",type:"rook"};
                }else if(j==1||j==6){
                    chess[i][j]={color:"black",type:"knight"};
                }else if(j==2||j==5){
                    chess[i][j]={color:"black",type:"bishop"};
                }else if(j==3){
                    chess[i][j]={color:"black",type:"king"};
                }else{
                    chess[i][j]={color:"black",type:"queen"};
                }
            }else if(i==1){
                chess[i][j]={color:"black",type:"pawn"};
            }else if(i==6){
                chess[i][j]={color:"white",type:"pawn"};
            }else if(i==7){
                if(j==0||j==7){
                    chess[i][j]={color:"white",type:"rook"};
                }else if(j==1||j==6){
                    chess[i][j]={color:"white",type:"knight"};
                }else if(j==2||j==5){
                    chess[i][j]={color:"white",type:"bishop"};
                }else if(j==3){
                    chess[i][j]={color:"white",type:"king"};
                }else{
                    chess[i][j]={color:"white",type:"queen"};
                }
            }else{
                chess[i][j]={color:"",type:""};
            }
            
        }
        
    }
    // chess[4][5]["color"]="white";
    // chess[4][5]["type"]="bishop";
    show();
}
function show(){
    for(let i=1;i<=8;i++){
        let row = $(`<div class="row row-${i}"></div>`);
        for(let j=1;j<=8;j++){
            let col = $(`<div class="cell cell-${i}-${j}"></div>`);
            if(i%2==1){
                if(j%2==1){
                    col.addClass("black");
                }else{
                    col.addClass("white");
                }
            }else{
                if(j%2==1){
                    col.addClass("white");
                }else{
                    col.addClass("black");
                }
            }
            col.attr("color","");
            if(chess[i-1][j-1]["color"]!=""){
                let imageUrl=`./img/${chess[i-1][j-1]["color"]}-${chess[i-1][j-1]["type"]}.png`;
                console.log(imageUrl);
                // col.css('background-image',"url("+imageUrl+")");
                let img = $(`<img src=${imageUrl}>`);
                col.attr("color",chess[i-1][j-1]["color"]);
                col.append(img);
            }
            
            row.append(col);
        }
        chessBoard.append(row);
    }
    // reRoll();
}

newGame();

// function reRoll(){
//     let prev = (turn+1)%2;
//     $(`[color=${turnObj[turn]}]`).mouseover(function(){
//         $(this).addClass("hovered");
//     })
//     $(`[color=${turnObj[turn]}]`).mouseout(function(){
//         $(this).addClass("hovered");
//     })
// }
// let prev = (turn+1)%2;
function getData(classname){
    let ans = {
        "row" : Number(classname.split(" ")[1].split("-")[1]),
        "col" : Number(classname.split(" ")[1].split("-")[2])
    }
    ans["color"] = chess[ans["row"]-1][ans["col"]-1]["color"],
    ans["type"] = chess[ans["row"]-1][ans["col"]-1]["type"]
    return ans;
}
function showMoves(row,col,color,type){
    // Note here i get (row-1) and (col-1) so keep in mind to handle
    let moves=[];
    let oppColor = color=="white"?"black":"white";
    console.log(oppColor);
    if(type=="pawn"){
        if((row+forw[color]<8)&&(row+forw[color]>=0)&&chess[row+forw[color]][col]["type"]==""){
            moves.push([row+forw[color],col]);
        }
        if((row+forw[color]<8)&&(row+forw[color]>=0)&&(col-1>=0)&&chess[row+forw[color]][col-1]["color"]==oppColor){
            moves.push([row+forw[color],col-1]);
        }
        if((row+forw[color]<8)&&(row+forw[color]>=0)&&(col+1<8)&&chess[row+forw[color]][col+1]["color"]==oppColor){
            moves.push([row+forw[color],col+1]);
        }
        if(color=="black"&&row==1){
            if(chess[row+2*forw[color]][col]["type"]==""){
                moves.push([row+2*forw[color],col]);
            }
        }
        if(color=="white"&&row==6){
            if(chess[row+2*forw[color]][col]["type"]==""){
                moves.push([row+2*forw[color],col]);
            }
        }
    }else if(type=="knight"){
        let dirs=[[-2,-1],[-2,1],[-1,2],[1,2],[2,1],[2,-1],[1,-2],[-1,-2]];
        for(let i=0;i<dirs.length;i++){
            let rowdash = row+dirs[i][0];
            let coldash = col+dirs[i][1];
            if(rowdash>=0&&rowdash<8&&coldash>=0&&coldash<8&&chess[rowdash][coldash]["color"]!=color){
                moves.push([rowdash,coldash]);
            }
        }
    }else if(type=="king"){
        let dirs=[[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
        for(let i=0;i<dirs.length;i++){
            let rowdash = row+dirs[i][0];
            let coldash = col+dirs[i][1];
            if(rowdash>=0&&rowdash<8&&coldash>=0&&coldash<8&&chess[rowdash][coldash]["color"]!=color){
                moves.push([rowdash,coldash]);
            }
        }
    }else if(type=="rook"||type=="queen"){
        let temprow=row;
        let tempcol=col;
        while((temprow+forw[color]<8)&&(temprow+forw[color]>=0)&&(chess[temprow+forw[color]][col]["color"]!=color)){
            moves.push([temprow+forw[color],col]);
            if((chess[temprow+forw[color]][col]["color"]==oppColor)){
                break;
            }
            temprow=temprow+forw[color];
        }
        temprow=row;
        while((temprow-forw[color]<8)&&(temprow-forw[color]>=0)&&(chess[temprow-forw[color]][col]["color"]!=color)){
            moves.push([temprow-forw[color],col]);
            if((chess[temprow-forw[color]][col]["color"]==oppColor)){
                break;
            }
            temprow=temprow-forw[color];
        }
        temprow=row;
        while(tempcol-1>=0&&chess[temprow][tempcol-1]["color"]!=color){
            moves.push([temprow,tempcol-1]);
            if(chess[temprow][tempcol-1]["color"]==oppColor){
                break;
            }
            tempcol=tempcol-1;
        }
        tempcol=col;
        while(tempcol+1<8&&chess[temprow][tempcol+1]["color"]!=color){
            moves.push([temprow,tempcol+1]);
            if(chess[temprow][tempcol+1]["color"]==oppColor){
                break;
            }
            tempcol=tempcol+1;
        }
    }
    if(type=="bishop"||type=="queen"){
        let dirs=[[-1,-1],[-1,1],[1,1],[1,-1]];
        for(let i=0;i<dirs.length;i++){
            let temprow = row+dirs[i][0];
            let tempcol = col+dirs[i][1];
            while((temprow<8)&&(temprow>=0)&&(tempcol<8)&&(tempcol>=0)&&(chess[temprow][tempcol]["color"]!=color)){
                console.log(i+" "+temprow+" "+tempcol);
                moves.push([temprow,tempcol]);
                if((chess[temprow][tempcol]["color"]==oppColor)){
                    break;
                }
                temprow=temprow+dirs[i][0];
                tempcol=tempcol+dirs[i][1];
            }
        }
    }
    $(".cell").removeClass("move");
    for(let i=0;i<moves.length;i++){
        $(`.cell-${moves[i][0]+1}-${moves[i][1]+1}`).addClass("move")
    }
}
$(".cell").mouseover(function(e){
    let {row,col} = getData(e.currentTarget.className);
    if(turnObj[turn]==$(this).attr("color")){
        $(this).addClass("hovered")
    }
})
$(".cell").mouseout(function(){
    if(turnObj[turn]==$(this).attr("color")){
        $(this).removeClass("hovered")
    }
})

$(".cell").click(function(e){
    let {row,col,color,type} = getData(e.currentTarget.className);
    if( (chess[row-1][col-1]!=null) && turnObj[turn]==$(this).attr("color") ){
        if($(this).hasClass("clicked")){
            console.log("has")
            $(this).removeClass("clicked");
            $(".cell").removeClass("move");
        }else{
            $(".cell").removeClass("clicked");
            $(this).addClass("clicked");
            showMoves(row-1,col-1,color,type);
        } 
    }
})




