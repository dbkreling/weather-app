// First we declare the function 'getUser'
var getUser = (id, callback) => {  //getUser is called with user data passed to 'callback'
    var user = {  //This is what getUser will do when called.
        id: id,
        name: 'Vikram'
    };
    setTimeout(() => {  // setTimeout(function, timeInMiliseconds);
        // 'callback' will only be called after 3000 ms.
        callback(user);  // We define 'callback' with a user object inside the 'callback' function
    }, 3000);
};

// Then we call it. getUser is called with arguments (id, function)
// this 'function' is the function we want to run when the user data comes back
getUser(31, (userObject) => {  //user is the data we are passing the function
    console.log(userObject);   // then I can manpulate it according to my needs. I just want to print it.
});
