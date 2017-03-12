ids = [12345, 67890, 10293, 84756];

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
	console.log('list of ids: ' + ids);
	for(var i = 0; i < ids.length; i++){
		FB.api('/' + ids[i] + '?fields=id,name,picture', function(response) {
			console.log('id is ' + response.id + ', name: ' + response.name);
			var names = document.getElementsByClassName('fbName-' + response.id);
			var pictures = document.getElementsByClassName('fbPicture-' + response.id);
			for(var j = 0; j < names.length; j++){
				names[j].innerHTML = 'Hello, ' + response.name + '!';
				pictures[j].innerHTML = '<img src="' + response.picture.data.url + '"></img>';
			}
		});
	}
}

function registerUser(id){
	FB.api('/' + id + '?fields=id,name', function(response) {
		$.post("add-user", {id: response.id, name: response.name}, function(data){
			console.log(data);
			window.location = '/';
		});
	});
}

/**
 * Handles the response from checking the login state
 * @arg response The response object from checking the Facebook login
 */
function statusChangeCallback(response){
	if(response.status === 'connected'){
		if(!(window.location.pathname === '/login.html')){
			//If logged in and not on the login page
			document.getElementById('fbStatus').innerHTML = 'You are logged in to Facebook and Fakebook!';
			insertUsersInfos();
		} else{
			//If logged in and on the login page
			registerUser(response.authResponse.userID);
			//window.location = '/';
		}
	} else{
		if(!(window.location.pathname === '/login.html')){
			window.location = 'login.html';
		}
	}
}

function addIDToBeInserted(id){
	if(!ids.contains(id)){
		ids.push(id);
	}
	console.log(ids);
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
