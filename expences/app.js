
(function () {

	var expenses=[];
	var table = document.getElementById('expensesList');

	var addButton = document.getElementById('add');
	addButton.addEventListener( 'click', addNewData, false );

	loadExpenses();
	redrawExpensesUI();
	
	function addNewData(){
		var newData ={};
		var typeElement = document.getElementById('type').value;
		newData.type = typeElement;
		var rateElement = document.getElementById('rate').value;
		newData.rate = rateElement;
		var dateElement = document.getElementById('date').value;
		newData.date = dateElement;
		expenses.push(newData);
		saveExpenses();
		redrawExpensesUI();
		//reset
		typeElement.value = '';
		rateElement.value = '';
		dateElement.value = '';

	}

	function deleteData(e){
		var delIndex = e.target.dataset.index;
		expenses.forEach(function(element, index, array){
			if(index == delIndex){
				expenses.splice(index,1);
				return;
			};
		});
		saveExpenses();
		redrawExpensesUI();
	}

	function saveExpenses(){
	    localStorage.setItem('expenses', JSON.stringify(expenses));
	}

    function loadExpenses(){
	    if (!localStorage.getItem('expenses')){
	     localStorage.setItem('expenses',JSON.stringify([]));
	     }
	    expenses = JSON.parse(localStorage.getItem('expenses'));
    }


	function redrawExpensesUI (){

		var i, l, result, sum=0;
		var htmlTable = [];

		for (i = 0, l = expenses.length; i<l; i++) {			
			htmlTable.push('<tr draggable="true">');
			htmlTable.push('<td>'+ (i+1) +'</td>');
			htmlTable.push('<td width="25%">'+ expenses[i].type +'</td>');
			htmlTable.push('<td width="40%">'+ expenses[i].rate +'</td>');
			htmlTable.push('<td width="25%">'+ expenses[i].date +'</td>');
			htmlTable.push('<td width="30"><button class="delete" data-index="'+ i +'">Del</button></td>');
			htmlTable.push('</tr>');
			
			sum += parseInt(expenses[i].rate);
		}

		/*var delButton = document.createElement('button');
		delButton.innerHTML = 'del';
		delButton.className = 'delete';

		var tdIndex = document.getElementById('delIndex');
		tdIndex.appendChild(delButton);*/

		table.innerHTML = htmlTable.join('\n');
		table.className ='innerTable';

		// выводим ниже таблицы сумму всех расходов 
		result = document.getElementById('result'); 
		result.innerHTML = 'Сумма всех расходов  '+ sum +' бел.руб';

		var delButtons = document.getElementsByClassName('delete');

		for (var x=0, y= delButtons.length; x<y; x++){
		    delButtons[x].addEventListener('click', deleteData, false);
		}


	}


}) ();