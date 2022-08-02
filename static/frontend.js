import { exporter, displayBtns} from "./animation.js";
//login function
const $mainpage1 = $('#mainpage');
const $loginpage1 = $('#loginpage');
const $username = $('#username');
const $password = $('#password');
const $submit = $('#login-submit');
const $savebutton = $('#save-btn');
const $myPinsBtn = $('#mypins-btn');
const searchBox = $('.search-box');
//login submit event listener
$submit.on("click", () => {
    let user = $username.val();
    let pass = $password.val();
    login(user, pass)
})
//login function
const login = function(username, password) {
    //edge case
    if (username && password) {
        console.log("values entered!");
        let obj = {username: username, password:password};
        var currentUser = obj;
        $.ajax({
                type: "POST",
                url:'/api/aniquote/userauthentication',
                data: JSON.stringify(obj),
                success: res => {
                  if (res) {
                    $loginpage1.hide();
                    $mainpage1.show();
                  }
                },
                contentType: "application/json"
            });

    } else {
        console.log("enter values");
    }
}


$savebutton.on('click', () => {

     saveF(exporter());
})
const saveF = function(contents) {
     let obj = {contents: contents};
        $.ajax({
                type: "POST",
                url:'/api/aniquote/savequote',
                data: JSON.stringify(obj),
                success: res => {
                  if (res) {
                    $loginpage1.hide();
                    $mainpage1.show();
                  }
                },
                contentType: "application/json"
            });
}
$myPinsBtn.on('click', () => {
     getPins();
})
const getPins = () => {
  $.ajax({
    type: "GET",
    url: "/api/aniquote/getpins",
    success: res => {
      if (res) {

        displayBtns(res);
      }
     },
     contentType: "application/json"
  }) 
}

// const deletePins = (data) => {
//   $.ajax({
//     method: "DELETE",
//     url: "/api/aniquote/deletepins",
//     data: JSON.stringify(data),
//     success: res => {
//         console.log('we got your delete request')
//     }
//   })
// }