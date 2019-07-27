
function addBook(row, currentUser, container){
	var title = row.title.getElementsByClassName('titleBook')[0].value;
	var author = row.author.getElementsByClassName('authorBook')[0].value;
	var lender = row.lender.innerText;

	var obj = {
		id: '23213123',
		title: title,
		author: author,
		lender: currentUser,
		borrower: '',
		nextRequest: ''
	}


	var book = new TableRow(obj, currentUser);
	var newRow = book.generateRow(container, 'true')
	book.updateActionPanel();
	container.appendChild(newRow);

	updateLocalData(obj)
}

function getUser() {
	var currentUser = document.getElementById('userInput').value;
	if (!currentUser) {
		alert('login to continue');
		return;
	}
	resetContainers();
	init(currentUser);
}

function updateLocalData (obj) {
	var data = JSON.parse(localStorage.getItem('bookData'));
	data.push(obj);
	localStorage.setItem('bookData', JSON.stringify(data));
}

function checkLocalData() {
	var data = localStorage.getItem('bookData')
	var dummyData = [
		{
			id: '23213123',
			title: 'asdasdasdasd',
			author: 'weqw',
			lender: 'userA',
			borrower: 'userC',
			nextRequest: 'userB'
		},
		{
			id: '23213123',
			title: 'asdasdasdasd',
			author: 'weqw',
			lender: 'userA',
		},
		{
			id: '23213123',
			title: 'asdasdasdasd',
			author: 'weqw',
			lender: 'userA',
			borrower: 'userB',
			nextRequest: ''
		}
	];

	if (!data){
		localStorage.setItem('bookData', JSON.stringify(dummyData));
		return dummyData;
	} else {
		return JSON.parse(data);
	} 

}

function resetContainers () {
	var tableContainer = document.getElementsByClassName('tableContainer')[0]; 
	tableContainer.innerHTML = '';
	var newRowContainer = document.getElementsByClassName('newRowContainer')[0]; 
	newRowContainer.innerHTML = '';
}


function init (currentUser) {
	// reference of initial containers where list is rendered
	var mainContainer = document.getElementsByClassName('mainContainer')[0];
	var tableContainer = document.getElementsByClassName('tableContainer')[0]; 
	var newRowContainer = document.getElementsByClassName('newRowContainer')[0]; 
	var data = checkLocalData();


	var currentUSer = currentUser;
	var commonFn = new Common();
	
	var tableRow = new TableRow();
	tableRow.init(tableContainer);

	data.forEach( val => {
		var book = new TableRow(val, currentUSer);
		book.generateRow(tableContainer)
	})

	var formRow = new TableRow();
	var form = formRow.addBookUI();
	form.id.innerText = '2163t2123';
	form.lender.innerText = currentUSer;
	var button = form.action.getElementsByClassName('addBook')[0]
	button.addEventListener('click', (event) => {
		addBook(form, currentUSer, tableContainer); 
	})
	newRowContainer.appendChild(form.rowRef);


};



