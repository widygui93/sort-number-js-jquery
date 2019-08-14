$(document).ready(function(){
	//create table
	$("h1").after($("<table></table>"));
	//create row and column with looping
	for(let i=0; i < 10; i++){
		let row = $("<tr></tr>");
		for(let j=0; j < 10; j++){
			let col = $("<td></td>");
			row.append(col);
		}
		$("table").append(row);
	}
	//input 0 to 9 into column
	let idxRow = [];
	let idxCol = [];
	let idxRowExist = false;
	let idxColExist = false;
	let randRow, randCol;
	for(let num=0; num < 10; num++){
		RandRowAndCol()
		$("tr:eq("+randRow+") td:eq("+randCol+")").text(num);
		idxRow.push(randRow);
		idxCol.push(randCol);
	}
	//function random row and column
	function RandRowAndCol(){
		randRow = Math.floor(Math.random() * 10); 
		randCol = Math.floor(Math.random() * 10); 
		for(let i=0; i < idxRow.length; i++){
			if(randRow == idxRow[i]){
				idxRowExist = true;
				break;
			}
			idxRowExist = false;
		}
		for(let i=0; i < idxCol.length; i++){
			if(randCol == idxCol[i]){
				idxColExist = true;
				break;
			}
			idxColExist = false;
		}
		if(idxRowExist == true && idxColExist == true){
			RandRowAndCol();
		}
		return randRow,randCol;
	}
	//when user click button start
	let logRow = ""; let logCol = "";
	$("button").click(function(){
		//disabled the button
		$("button").attr("disabled","true");
		for(let x=0; x < idxRow.length; x++){
			logRow = logRow + idxRow[x] + ",";
		}
		console.log("content array idxRow: "+logRow);
		for(let x=0; x < idxCol.length; x++){
			logCol = logCol + idxCol[x] + ",";
		}
		console.log("content array idxCol: "+logCol);
		//change number into X
		for(let i=0; i < idxRow.length; i++){
			$("tr:eq("+idxRow[i]+") td:eq("+idxCol[i]+")").text("X");
		}
		//find out index of column when user click it
		let idxColClicked;
		$("td").click(function() {
			idxColClicked = $(this).index();
			console.log("index of column when user click: "+idxColClicked);
		});
		//find out index of row when user click it
		let idxRowClicked;
		let numInOder = 0;
		$("tr").click(function() {
			idxRowClicked = $(this).index();
			console.log("index of row when user click: "+idxRowClicked);
			//check if user click the right coordinate of number 
			if(idxRowClicked == idxRow[0] && idxColClicked == idxCol[0]){
				console.log("User click row "+idxRowClicked+" and column "+idxColClicked);
				$("tr:eq("+idxRow[0]+") td:eq("+idxCol[0]+")").text(numInOder);
				$("tr:eq("+idxRow[0]+") td:eq("+idxCol[0]+")").css("background-color", "#7FFFD4");
				numInOder = numInOder + 1;
				idxRow.shift();
				idxCol.shift();
				if(idxRow.length == 0 && idxCol.length == 0){
					alert("BRAV0!! You Complete it very well");
					window.location.reload();
				}
			} else {
				alert("You have Lost");
				window.location.reload();
			}
		});
	});
});