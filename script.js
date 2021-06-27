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
                chess[i][j]=null;
            }
            
        }
    }
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
            if(chess[i-1][j-1]!=null){
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
    reRoll();
}
newGame();
function showMoves(i,j){
    let color = chess[row-1][col-1]["color"];
    let type = chess[row-1][col-1]["type"];
    if(type=="pawn"){

    }
}
$(".cell").click(function(e){
    let row = e.currentTarget.className.split(" ")[1].split("-")[1];
    let col = e.currentTarget.className.split(" ")[1].split("-")[2];
    let color = chess[row-1][col-1]["color"];
    if( (chess[row-1][col-1]!=null) && ((color=="white"&&turn==1)||(color=="black"&&turn==2)) ){
        $(".cell").removeClass("clicked")
        $(`.cell-${row}-${col}`).addClass("clicked")
        showMoves(row,col);
    }

})




