
let item = document.querySelector('.spa')
let currentUser = false
let users = []
async function home() {
    if (currentUser){
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let data = await response.json();
        console.log(data);
        let glav = item.innerHTML = ``;
        data.forEach(post => {
            item.innerHTML += `
                <div class="cart">
                    <h3>Пост: </h3>
                    <p>${post.title}</p>
                    <a href="#" onclick="info_post(${post.id}); return false;">Подробнее</a>
                    <hr>
                </div>
            `;
        });} else{
            login_html()
        }
}

async function info_post(pk) {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${pk}`);
        let post = await response.json();
        console.log(post);
        let glav = item.innerHTML = ``;
        item.innerHTML += `
            <div class="cart_ll">
                <h3>Пост: </h3>
                <p>${post.title}</p>
                <h3>Описание: </h3>
                <p>${post.body}</p>
                <h3>Комментарии</h3>
                <div id="commentsSection"></div>
            </div>
        `;
        let commentsSection = document.querySelector("#commentsSection");
        let response2 = await fetch(`https://jsonplaceholder.typicode.com/comments`);
        let comment = await response2.json();
        console.log(comment);
        for (let comm of comment){
            if (comm.postId == pk){
                commentsSection.innerHTML +=`
                <p>Коммент: ${comm.body}</p>
                `
            }
        }

}


function register_html(){
    item.innerHTML = `
    <div class="margin">
    <a class="button72" >Регистрация</a><br>
        <input type="text" name="username" id="username" placeholder="Имя пользователя"><br>
        <input type="password" name="password" id="password" placeholder="Пароль"><br>
        <button class="button7" onclick="register()">Регистрация</button>
        </div>
    `;
}

function login_html(){
    item.innerHTML = `
    <div class="margin">
    <a class="button72" >Авторизация</a><br>
        <input type="text" name="username" id="username" placeholder="Имя пользователя"><br>
        <input type="password" name="password" id="password" placeholder="Пароль"><br>
        <button class="button7" onclick="login()">Авторизация</button>
        </div>
    `;}
function register() {
    let usernameInput = document.querySelector("#username");
    let passwordInput = document.querySelector("#password");
    let username = usernameInput.value;
    let password = passwordInput.value;
    let newUser = { username: username, password: password };
    users.push(newUser);
    console.log("Пользователь зарегистрирован:", newUser);
    login_html()
}

function login() {
    let usernameInput = document.querySelector("#username");
    let passwordInput = document.querySelector("#password");
    let username = usernameInput.value;
    let password = passwordInput.value;

    let user = users.find(user => user.username === username && user.password === password);
    if (user) {
        console.log("Успешная авторизация для пользователя:", user);
        currentUser = true;
        home();
    } else {
        console.log("Пользователь с указанными учетными данными не найден.");
    }
}