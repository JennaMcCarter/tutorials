


var myapp = angular.module('myapp', ['ui']);

myapp.controller('controller', function ($scope) {
	//variables
	$scope.newItemPlaceholder = "";

	
	//get saved
	var savedList = getLocalStorage("saveTodoListTasks");
	var savedDate  = getLocalStorage("saveTodoListDate");
	
	
	//get list
	if(savedList != null) {
		$scope.list = toArrayList(savedList);
	}
	else{
		$scope.list = [
					{"itemStatus": "completed", "item": "can add item"}, 
					{"itemStatus": "completed", "item": "can edit item"}, 
					{"itemStatus": "completed", "item": "can delete item"}, 
			                {"itemStatus": "completed", "item": "can mark as complete"},
			                {"itemStatus": "completed", "item": "can reorder list"},
					{"itemStatus": "inProgress", "item": "can save items"}];
	}
	
	
	//get date
	if(savedDate != null) {
		$scope.lastSavedDate = savedDate;
	}
	else{
		$scope.lastSavedDate = "last saved: N/A";
	}

	
	
	$scope.addToList = function(){
		//add a new item to the html list
		if($scope.list.includes($scope.newItemPlaceholder) == false && $scope.newItemPlaceholder != ""){
			$scope.list.push({itemStatus: "inProgress", item: $scope.newItemPlaceholder});  
			$scope.newItemPlaceholder = "";
		}
	}
	$scope.addToList();
	
	
	$scope.completeItemOnList = function(index){
		if(index != undefined) {
			//if there is an index, remove from the list
			//check if completed
			var classList = $("ol li")[index].getAttribute("class");
			if(classList.includes("completed") == false){
				//task is comepleted
				$scope.list[index].itemStatus = "completed"
			}
			else{
				//task is not completed
				$scope.list[index].itemStatus = "inProgress";
				
			}
		}
	}

	
	$scope.deleteFromList = function(index){
		if(index != undefined) {
			//if there is an index, remove from the list
			$scope.list.splice(index, 1);
		}
	}
	$scope.deleteFromList();
	
	
	
	$scope.saveList = function(index){
			//reset last saved date/time
			$scope.lastSavedDate = "last saved: " + getDate();
			//save list
			var newlist = toStringList($scope.list);
			setLocalStorage("saveTodoListTasks", newlist);
			setLocalStorage("saveTodoListDate", $scope.lastSavedDate);
	}
});

angular.bootstrap(document, ['myapp']);


//get current date and time
function getDate(){
	var date = new Date();
	var lastSaved = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear() 
	+ " " + formatTime(date.getHours()) + ":" + formatTime(date.getMinutes()) + ":" + formatTime(date.getMilliseconds());
	return lastSaved;
}


//format nurmber so it is at least two digits
function formatTime(num){
	if(num < 10) { num = "0" + num; }
	return num;
}

function toStringList(list) {
	var newList = "";
	for (var i = 0; i < list.length; ++i) {
		newList += list[i].itemStatus + "," + list[i].item + ";";
	}
	return newList;
}

function toArrayList(stringList){
	var newList = [];
	var task; var statusItem; var item;
	if(stringList != null || stringList != undefined){
		var list = stringList.split(";");
		for (var i = 0; i < list.length; ++i){
			if(list[i] != ""){
				task = list[i].split(",");
				statusItem = task[0];
				item = task[1];
				newList.push({"itemStatus": statusItem, "item": item});
			}
		}
	}
	return newList;
}


