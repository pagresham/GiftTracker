
// alert("on?");
var lists = [];

function gt1Loaded() {
	// check for local storage, and access lists if available

	// check if LS is supported on current browser
	checkForStorage();

	// alert(" im loaded!");
	// document.getElementById("add_list").addEventListener("click", function(event) {
	// 	event.preventDefault();
	// 	alert("addlist pressed");
	// 	// addListDialog();
	// }, false);

	document.getElementById("add_list_button").addEventListener("click", function(event) {
		event.preventDefault();
		addList();
	}, false);
	
	document.getElementById("ideaButton").addEventListener('click', function(event) {
		event.preventDefault();
		//alert("add_button pressed");
		//alert("this buttons id "+this.id);
		var id = this.id;
		addGift(id);
	}, false);

	// Clears all local storage for testing 
	document.getElementById('clearStorage').addEventListener('click', function() {
		//alert('clearing local storage');
		clearStorage();
	}, false);

	// Listener for button to remove a list permanently
	document.getElementById('remove_list_btn').addEventListener('click', removeList, false);

	
	// End of pageLoaded function
}

	/**
	 * test for successful local storage
	 * @return boolean 
	 */
	function isLocalStorageSupported() {
		try {
			localStorage.setItem('blah', 'blah');
			localStorage.removeItem('blah');
			return true;
		}
		catch (e) {
			return false;
		}
	}
/**
 * Show error message if LS is not supported.
 * @return none
 */
function checkForStorage() {
	if (!isLocalStorageSupported()) {
		alert('For the Gift Tracker application to work properly, your browser must support Local Storage.');
	}
	else {
		retrieveLocalStorage();
	}			
}

/**
 * Updates local Storage 'xmasLists' with current value of lists[] array
 * @return {[type]} [description]
 */
function updateLS() {
	localStorage.setItem('xmasLists', JSON.stringify(lists));
}


function updateListsArray() {
	lists = JSON.parse(localStorage.getItem('xmasLists'));
}

function clearStorage() {
	localStorage.removeItem('xmasLists');
	lists = [];
	// also needs to clear the built list.
	var dropDown = document.getElementById("drop_id");
	// while any children are present, remove the first
	while (dropDown.firstChild) {
		dropDown.removeChild(dropDown.firstChild);
	}
	var gifts = document.getElementById("gifts");
	// empties all child nodes from the selected node. Effectively clears the text area
	while (gifts.firstChild) {
		gifts.removeChild(gifts.firstChild);
	}
	var name = document.getElementById("list_name");
	name.innerHTML = '';
}

/**
 * Looks for the xmasLists LS variable
 * If found, parses contents and places them in the lists[] array.
 * If not found, places the contents of the blank lists[] array in a new LS var called xmasLists.
 * @return {[type]} [description]
 */
function retrieveLocalStorage() {
	if (localStorage.getItem('xmasLists')) {
		console.log("FOUND");
		lists = JSON.parse(localStorage.getItem('xmasLists'));
		updateListsArray();
		buildDropdown(lists);
	}
	else {
		console.log("NOT FOUND");
		localStorage.setItem('xmasLists', JSON.stringify(lists));
		updateListsArray();
	}
}

/**
 * function to create new array from user data, and push it onto 
 * global list[] var. 
 * Clears inputs when complete
 */
function addList() {
	// change input to all lowercase, then change first letter to cap on first and last.

	//alert("addListFired!");
	var form = document.getElementById("add_form");
	var first = document.getElementById("first_name").value.toLowerCase();
	first = first.replace(first.charAt(0), first.charAt(0).toUpperCase());
	var last = document.getElementById("last_name").value;
	var p1 = document.getElementById("p1").value;
	var p2 = document.getElementById("p2").value;
	var p3 = document.getElementById("p3").value;
	
	if (first !== '') {
		var answer = window.prompt("Create new list for "+first+" "+last+"?  (y/n)").toLowerCase();
	
		if (answer === "y" || answer === "yes") {
			var newList = [first, last];
			if (p1 !== "") {
				newList.push(p1);
				//alert(p1);
					}
			if (p2 !== "") {
				newList.push(p2);
				//alert(p2);

			}
			if (p3 !== "") {
				newList.push(p3);
			}
			//lists.push(newList);
			//alert("newList:  "+newList);
			lists.push(newList);
			//alert(lists);
			var inputs = document.getElementById("add_form").inputs;
			form.reset();
			buildDropdown(lists);	

			// update the LS variable 
			updateLS();
		}
		else {
			form.reset();
		}
	}
	else {
		alert('Please include a first name for your new list\n\nThanks!\n');
	}
}

// add_form is the id for the form to enter a new list.

/**
 * Creates child li elems to populate list on lists.
 * @param  arr - an array to base the content of the list off of. 
 */
function buildDropdown(arr) {
	var dropDown = document.getElementById("drop_id");

	// while any children are present, remove the first
	while (dropDown.firstChild) {
		dropDown.removeChild(dropDown.firstChild);
	}
	
	

	// Removed this sort command // 


	//arr.sort();

	// do i need this here?
	updateLS();
	if (lists[0]){
		for (var i =0;i<arr.length;i++) {
			var li = document.createElement("li");
			var a = document.createElement("a");
			var list_box = document.getElementById('list_box');
			// this button is in the dropdown, not the list.
			// var b = document.createElement("button");
			// b.value = 'Remove';
			// b.setAttribute('type', 'button');
			a.setAttribute("class", "drop-name");
			a.setAttribute("href", "#");
			// set id of a/list item to the value of the index of its place in lists[]
			a.setAttribute("id", i);
			a.innerHTML = lists[i][0];
			a.addEventListener('click', displayList);
			li.appendChild(a);
			//li.appendChild(b);
			dropDown.appendChild(li);
		}
	}
}
/**
 * Fires when a new list is added and selected from dropdown
 * Sets id of Add Gift button to that of the current list, for reference by writeList().
 *  Fills in name of list, and writes list of gift ideas to GiftIdeas text area
 */
function displayList() {
	var id = this.id;
	

	var list_box1 = document.getElementById('list_box1');
	

	// var b = document.createElement('button');
	// b.setAttribute('id', id);
	// b.setAttribute('type', 'button');
	// b.setAttribute('class', 'remove-list-btn');
	// b.innerHTML = 'Remove List';
	// b.style.backgroundColor = 'rgba(156, 38, 27, 0.76)';
	// b.addEventListener('click', removeList, false);
	// list_box1.appendChild(b);
	

	// change name span
	var name = document.getElementById("list_name");
	name.innerHTML = lists[id][0]+" "+lists[id][1];
	
	// set id of submit button, so it can be referenced by the add gift button's function. 
	document.getElementsByClassName("add_button")[0].setAttribute("id", id);
	//alert ("button id "+ document.getElementsByClassName("add_button").id);
	writeList(id);
}
/**
 * 
 * @param id - the id of the Add Gift Button, set as the index of the list being viewed
 * 
 */
function addGift(id) {
	// alert("fuck me" +this.id);
	// If at least one list has been created and viewed
	var newGift = document.getElementById("add_idea").value;
	if (document.getElementsByClassName("add_button")[0].id !== "ideaButton" && newGift !== '') {
		lists[id].push(newGift);
		//  (lists[id]);
		document.getElementById("add_idea").value = '';
		updateLS();
		writeList(id);		
	}
	else {
		alert("Add a gift to the Gift Idea text area to add it to an existing list.");
		document.getElementById("add_idea").value = '';
	}
}


/**
 * NO LS here
 * write list to text area.
 * @param  arr_index - index of current entry in original lists array
 * @return {[type]}
 */
function writeList(arr_index) {
	var gifts = document.getElementById("gifts");
	
	// empties all child nodes from the selected node. Effectively clears the text area
	while (gifts.firstChild) {
		gifts.removeChild(gifts.firstChild);
	}
	
	// update Array before adding to it. 
	updateListsArray();
	
	// sort array alpha
	
	// tempArray holds the sorted gifts portion of the array
	var tempArray = lists[arr_index].splice(2).sort();
	var combinedArrays = lists[arr_index].concat(tempArray);
	//alert("here is the combined array "+combinedArrays);
	for (var i = 0;i<combinedArrays.length;i++) {
		lists[arr_index][i] = combinedArrays[i];
	}
	
	// update LS after editing the array
	updateLS();
	//var tempArray = lists[arr_index].
	// go through sub array, starting with element 2 since first two are names.
	for (var i=2;i<lists[arr_index].length;i++) {
		// build <li> and <button>
		var li = document.createElement('li');
		var b = document.createElement('button');
		b.innerHTML= 'Remove';
		b.setAttribute('type', 'button');
		b.setAttribute('class', 'remove-item-btn');
		// id is index of inner array
		b.setAttribute('id', i);
		// add the listener to fire the removeGift funct
		b.addEventListener('click', removeGift, false);
		li.innerHTML = lists[arr_index][i];
		li.appendChild(b);
		gifts.appendChild(li);
	}
}

/**
 * Splices out the element from the lists array
 * Updates the LS obf, and rewrites the gift list. 
 * @return {[type]} [description]
 */
function removeGift() {
	var outer_index = document.getElementsByClassName("add_button")[0].id;
	lists[outer_index].splice(this.id, 1);
	updateLS();
	writeList(outer_index);
}

function removeList() {
	// write conditional statement
	var index = document.getElementsByClassName("add_button")[0].id;
	lists.splice(index, 1);
	
	updateLS();
	
	buildDropdown(lists);

	// could be put in its own function
	var gifts = document.getElementById("gifts");
	// empties all child nodes from the selected node. Effectively clears the text area
	while (gifts.firstChild) {
	gifts.removeChild(gifts.firstChild);
	}
	var name = document.getElementById("list_name");
	name.innerHTML = '';


}


// To use the LS for my storage, I need to update it each time the working array is changed
// and I need to update the array each time I need to access the local storage. 

// To Do 
// Dont allow 2 lists with the same name
// 
// style remove button better
// Add a remove list feature

// can you see this?


















