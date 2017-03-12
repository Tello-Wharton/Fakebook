idsToInsert = [];

/**
 * Connects to facebook asynchronously
 */
window.fbAsyncInit = function() {
	FB.init({
		appId      : '1784046121916057',
		cookie     : true,
		xfbml      : true,
		version    : 'v2.8'
	});
	FB.AppEvents.logPageView();

	checkLoginState();
};

/**
 * I don't know but, I promise it's required
 */
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = 'https://connect.facebook.net/en_US/sdk.js';
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/**
 * Checks a user's login status and calls 'statusChangeCallback' to handle it
 */
function checkLoginState(){
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

/**
 * Retrieve the info of the previously added users and update the page to include these
 * Classes to be updated should be named "fbName-{user id}" and "fbPicture-{user id}"
 * where {user id} is the user id, not including the "{}"
 * @arg id The facebook app id of the user whose info you want retrieving
 */
function insertUsersInfos(){
	for(var i = 0; i < idsToInsert.length; i++){
		FB.api('/' + idsToInsert[i] + '?fields=id,name,picture', function(response) {
			var names = document.getElementsByClassName('fbName-' + response.id);
			var pictures = document.getElementsByClassName('fbPicture-' + response.id);
			for(var j = 0; j < names.length; j++){
				names[j].innerHTML = response.name;
				pictures[j].src = '' + response.picture.data.url;
			}
		});
	}
}

/**
 * Makes a post request telling the server to add a new user to the system
 */
function registerUser(id){
	FB.api('/' + id + '?fields=id,name', function(response) {
		$.post('/../add-user', {id: response.id, name: response.name}, function(data){
			window.location = '/userArea/';
		});
	});
}

/**
 * Find the 'post as' drop down menu and populate it with names
 */
function fillDropDownFromIDs(post_as_ids){
	for(var list_id in post_as_ids){
		FB.api('/' + list_id + '?fields=id,name', function(response){
			var sel = document.getElementById('fb-peeps');
			var opt = document.createElement('option');
			opt.innerHTML = response.name;
			opt.value = response.id;
			sel.appendChild(opt);
		});
	}
}

/**
 * Handles the response from checking the login state
 * @arg response The response object from checking the Facebook login
 */
function statusChangeCallback(response){
	if(response.status === 'connected'){
		if(!(window.location.pathname === '/login/')){
			//If logged in and not on the login page
			//Tell user that they're logged in
			//document.getElementById('fbStatus').innerHTML = 'You are logged in to Facebook and Fakebook!';
			insertUsersInfos();
			fillDropDownFromIDs(list_ids);
		} else{
			//If logged in and on the login page
			registerUser(response.authResponse.userID);
		}
	} else{
		if(!(window.location.pathname === '/login/')){
			window.location = '/login/';
		}
	}
}

function addIDToBeInserted(id){
	if(!idsToInsert.contains(id)){
		idsToInsert.push(id);
	}
}

/**
 * Array.prototype.[method name] allows you to define/overwrite an objects method
 * needle is the item you are searching for
 * this is a special variable that refers to "this" instance of an Array.
 * returns true if needle is in the array, and false otherwise
 */
Array.prototype.contains = function(needle){
	for (i in this) {
		if (this[i] == needle) return true;
	}
	return false;
}
