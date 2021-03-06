//A simple selector function for writing less code
function sl(sel){
    return  document.querySelector(sel);
}
//Sleep function (not using but usable for future)
function Sleep(time){
    var t0= performance.now();
    while(true){
        var t1 = performance.now();
        if(t1-t0>=time){
            break;
        }
    }
}
//Available character library
var characterLib = "1234567890qwertyuiopasdfghjklzxcvbnm!@#$%&^*)("
//Function for return random character for random password
function characterRandomizer(){
    var randomNUM;
    do{
        randomNUM = Math.floor(Math.random() * 101-1);
    }while(randomNUM<0 || randomNUM>=characterLib.length);
    return characterLib[randomNUM];
}
//Function for generating random password
function generatePassword(){
    var len =Math.floor(Math.random() * 11+8);
    var password = "";
    for(var i=0;i<len;i++){
        password+=characterRandomizer();
    }
    return password;
}
//Promise for getting data
var mypromise = new Promise(function(res,rej){
    var request = new XMLHttpRequest();
    request.open('get','https://randomuser.me/api/');
    request.onload = res;
    request.onerror = rej;
    request.send();
});
//Working promise
mypromise.then(function(data){
    userDataT = JSON.parse(data.target.response).results[0];
    //creating object for collecting usable data
    udt = {
        name:userDataT.name.first + ' ' +userDataT.name.last,
        gender:userDataT.gender,
        login:{
            email:userDataT.email,
            password:generatePassword(),
            username: userDataT.login.username,
        },
        photoSRC:userDataT.picture.large,
        nat:userDataT.nat,
        dob:userDataT.dob.date.substring(0,10)+'(yyyy-mm-dd)',
        phoneNum:userDataT.phone,
        address:{
            city: userDataT.location.city,
            country: userDataT.location.country,
            post: userDataT.location.postcode,
        }
    };
    main(udt);
}).catch(function(){
    //if fail to get data
    console.log('error');
});
//main part for filling data to UI
function main(data){
    sl('img#profileimg').setAttribute('src', data.photoSRC);
    sl('#fullname').innerHTML = data.name;
    sl('#gender').innerHTML = data.gender;
    sl('#username').innerHTML = data.login.username;
    sl('#email').innerHTML = data.login.email;
    sl('#password').innerHTML = data.login.password;
    sl('#nat').innerHTML = data.nat;
    sl('#dob').innerHTML = data.dob;
    sl('#phoneNum').innerHTML = data.phoneNum;
    sl('#city').innerHTML = data.address.city;
    sl('#country').innerHTML = data.address.country;
    sl('#post').innerHTML = data.address.post;   
}