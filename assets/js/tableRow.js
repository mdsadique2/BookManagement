var _lib = new Common();

class TableRow {
	constructor (data, currentUser) {
		if (data) {
			this.currentUser = currentUser
			this.data = data;
			this.borrowDuration = 3;
			this.returnTimer = null;
		}

		this.markup = {
			rowRef: '',
			id: '',
			title: '',
			author: '',
			lender: '',
			borrower: '',
		}

	}

	createRowCells (data) {
		this.markup.id 		= _lib.createElement('div', 'cell id', data.id);
		this.markup.title 	= _lib.createElement('div', 'cell author', data.title);
		this.markup.author 	= _lib.createElement('div', 'cell author', data.author);
		this.markup.lender 	= _lib.createElement('div', 'cell lender', data.lender);
		this.markup.borrower = _lib.createElement('div', 'cell borrower', data.borrower);
		this.markup.action 	= _lib.createElement('div', 'cell action', data.action);
		
		this.markup.rowRef.appendChild(this.markup.id);
		this.markup.rowRef.appendChild(this.markup.title);
		this.markup.rowRef.appendChild(this.markup.author);
		this.markup.rowRef.appendChild(this.markup.lender);
		this.markup.rowRef.appendChild(this.markup.borrower);
		this.markup.rowRef.appendChild(this.markup.action);

		return this.markup.rowRef;
	}


	addBookUI () {
		this.markup.id 		= _lib.createElement('div', 'cell id');
		this.markup.title 	= _lib.createElement('div', 'cell title');
		this.markup.author 	= _lib.createElement('div', 'cell author');
		this.markup.lender 	= _lib.createElement('div', 'cell lender', this.currentUser);
		this.markup.borrower = _lib.createElement('div', 'cell borrower', '--');
		this.markup.action 	= _lib.createElement('div', 'cell action');
		this.markup.rowRef = _lib.createElement('div', 'row');
		this.markup.rowRef.appendChild(this.markup.id);
		this.markup.rowRef.appendChild(this.markup.title);
		this.markup.rowRef.appendChild(this.markup.author);
		this.markup.rowRef.appendChild(this.markup.lender);
		this.markup.rowRef.appendChild(this.markup.borrower);
		this.markup.rowRef.appendChild(this.markup.action);

		var inputTitle = _lib.createElement('input', 'titleBook');
		inputTitle.setAttribute('placeholder', 'title');
		var inputAuthor = _lib.createElement('input', 'authorBook');
		inputAuthor.setAttribute('placeholder', 'author');
		
		this.markup.title.appendChild(inputTitle);
		this.markup.author.appendChild(inputAuthor);


		var button = _lib.createElement('button', 'addBook', 'Add Book');
		this.markup.action.appendChild(button);

		return this.markup;
	}



	generateRow (parentContainer, returnval) {
		this.markup.rowRef = _lib.createElement('div', 'row');
		this.createRowCells(this.data);
		if (returnval === undefined) {
			parentContainer.appendChild(this.markup.rowRef);
			this.updateActionPanel();
			return;
		}
		return this.markup.rowRef
	}

	updateActionPanel () {
		var currentUser = this.currentUser.toLowerCase();
		var lender = this.data.lender.toLowerCase();
		var borrower = (this.data.borrower || '').toLowerCase();
		var buttonText = '--';
		var buttonClass = ''
		var showButton = false;

		if (currentUser !== lender) {
			if (currentUser === borrower){
				buttonClass = 'return',
				buttonText = 'Return'
			} else if (borrower !== '' && currentUser !== borrower) {
				if (!this.data.nextRequest) {
					buttonClass = 'requestNext',
					buttonText = 'Request Next'
				} else {
					var requester = this.data.nextRequest.toLowerCase() === currentUser ? 'You' : this.data.nextRequest;
					this.markup.action.innerText = 'Requested by ' + requester;
					return;
				}
				
			} else if (!borrower) {
				buttonClass = 'borrow',
				buttonText = 'Borrow'
			}

			var button = _lib.createElement('button', buttonClass, buttonText);
			this.markup.action.appendChild(button);
			button.addEventListener('click', (event) => {
				this.handleAction(event)
			})
			return;
		} 

		
		this.markup.action.innerText = 'You own this book';
		console.log(this.data)
	}

	handleBorrowedTimer () {
		this.returnTimer = setTimeout(()=>{
			this.returnBook();
			this.updateActionPanel();
		}, this.borrowDuration * 1000)
	}

	returnBook (returnVal) {
		this.data.borrower = '';
		this.markup.action.innerHTML = '';
		this.markup.borrower.innerText = '';
	}


	handleAction () {
		var className = event.target.className;

		if (className === 'borrow') {
			this.data.borrower = this.currentUser;
			this.markup.action.innerHTML = '';
			this.markup.borrower.innerText = this.currentUser;
			this.handleBorrowedTimer();

		}

		if (className === 'return') {
			this.returnBook();
			clearTimeout(this.returnTimer);
		}

		if (className === 'requestNext') {
			this.data.nextRequest = this.currentUser;
			this.markup.action.innerHTML = '';
		}
		this.updateActionPanel('return');
	}


	createTableHeaderRow (parentContainer) {
		this.markup.rowRef = _lib.createElement('div', 'row header');
		this.createRowCells({
			id: 'id',
			title: 'title',
			author: 'author',
			lender: 'lender',
			borrower: 'borrower',
			action: 'action'
		});
		parentContainer.appendChild(this.markup.rowRef);
	}


	init (container) {
		this.createTableHeaderRow(container);
	}
}