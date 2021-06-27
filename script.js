let chessBoard = $(".chess-board");
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
        row.append(col);
    }
    chessBoard.append(row);
}


