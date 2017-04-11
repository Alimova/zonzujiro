let response;
let xhr = new XMLHttpRequest();
const gallery = document.getElementById("gallery");
const prof = document.getElementById("profile");
const bio = document.getElementById("bio");
const friends = document.getElementById("friends");
const replies = document.querySelector('.replies');
const button = document.querySelector('button');
const input = document.querySelector('input');

window.onload = function() {
    init()
}

button.addEventListener('click', addReply);
input.addEventListener('keydown', (e) => {
    if (e == 13) addReply()
});

function addReply(){
    console.log('a!');
    let text = input.value.trim();
    let reply = document.createElement('div');
    reply.classList.add('reply');
    reply.innerHTML = `<p>${text}</p>`;
    replies.appendChild(reply);
    input.value=null;
}

//function get (url,callback){
//    let xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = (e) => {
//        if(xhr.status == 200 && xhr.readyState == 4){
//            callback(JSON.parse(xhr.responseText));
//        }
//    }
//    xhr.open('GET', url, true);
//    xhr.send();
//}

function get(url){
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest()

        xhr.onreadystatechange = function() {
            if (xhr.status == 200 && xhr.readyState == 4) {
                resolve(JSON.parse(xhr.responseText))
            }
        }

        xhr.open('GET', url, true)

        xhr.send(null)
    })
}


function init() {
    const getMe = () => get('https://randomuser.me/api').then(getProfile)
    const getGallery = () => get('/data').then(drawPhotos)
    const getFriends = () => get('https://randomuser.me/api/?results=15').then(getFriends)

    getMe().then(getGallery).then(getFriends)//.then(activateChat)
}

//get('/data', drawPhotos);
//get('https://randomuser.me/api', getProfile);
//get('https://randomuser.me/api/?results=15', getFriends);

//присваиваем свойство объекту, в который будем получать результат запроса
//xhr.onreadystatechange = function (e) {

function drawPhotos(photos){
    //let photos = JSON.parse(xhr.responseText);
    photos.forEach(drawPhoto);
        function drawPhoto(item){
            let photo = document.createElement('div');
                img = document.createElement('img');
            photo.classList.add('photo'); //если другой класс уже есть - добавит
            // если такой же класс есть - второй раз добавлять не будет
            //photo.className = 'photo'; //если класс был, то он перепишется
            //console.log(item);
            img.src = item.url;
            photo.appendChild(img);
            gallery.appendChild(photo);
    }
}

function getProfile(profile){
    profile = profile.results[0]
    let email = document.getElementsByClassName('email')[0];
    let phone = document.getElementsByClassName('phone')[0];
    let name = document.getElementsByClassName('name')[0];
    let avatar = document.getElementsByClassName('avatar')[0];
    email.innerHTML = profile.email;
    phone.innerHTML = profile.phone;
    name.innerHTML = profile.name.first[0].toUpperCase() + profile.name.first.substring(1)
        +' '+profile.name.last[0].toUpperCase() + profile.name.last.substring(1);
    avatar.src = profile.picture.large;
    phone.innerText = profile.phone;
}

function getFriends(list){
    list = list.results;
    console.log(list.length);
    for(let i=0;i<list.length;i++){
        let friend = document.createElement('div');
        let photo  = document.createElement('img');
        friend.classList.add('friend');
        photo.src = list[i].picture.thumbnail;
        //console.log(list[i].picture.thumbnail);
        friend.appendChild(photo);
        friends.appendChild(friend);
    }
}

//backlog

//xhr.open('GET', '/hello', true); // запрос асинхронный
//xhr.send(null);

//xhr.open('GET', '/data', true); // запрос асинхронный
//xhr.send();

//const xhr2 = new XMLHttpRequest();
//xhr2.onreadystatechange = (e) => {
//    if(xhr2.status == 200 & xhr2.readyState == 4){
//        let profile = JSON.parse(xhr2.responseText).results[0]
//        let email = document.getElementsByClassName('email')[0];
//        let phone = document.getElementsByClassName('phone')[0];
//        let name = document.getElementsByClassName('name')[0];
//        let avatar = document.getElementsByClassName('avatar')[0];
//        email.innerHTML = profile.email;
//        phone.innerHTML = profile.phone;
//        name.innerHTML = profile.name.first[0].toUpperCase() + profile.name.first.substring(1)
//            +' '+profile.name.last[0].toUpperCase() + profile.name.last.substring(1);
//        avatar.src = profile.picture.large;
//        phone.innerText = profile.phone;
//   }
//}
//xhr2.open('GET', 'https://randomuser.me/api', true);
//xhr2.send();



//const xhr3 = new XMLHttpRequest();
//xhr3.onreadystatechange = (e) => {
//    if(xhr3.status == 200 && xhr3.readyState == 4) {
//        let list = JSON.parse(xhr3.responseText).results;
//        for(let i=0;i<list.length;i++){
//            let friend = document.createElement('div');
//            let photo  = document.createElement('img');
//            friend.classList.add('friend');
//            photo.src = list[i].picture.thumbnail;
//            //console.log(list[i].picture.thumbnail);
//            friend.appendChild(photo);
//            friends.appendChild(friend);
//        }
//
//    }
//}
//xhr3.open('GET', 'https://randomuser.me/api/?results=18', true);
//xhr3.send();