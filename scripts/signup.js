document.querySelector("form").addEventListener("submit",handleSignup)

let users=JSON.parse(localStorage.getItem("users")) || []

function handleSignup(event){
    event.preventDefault()
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("pass").value;
    let newUser={name,email,password,favourites:[]}
    if(password.length<=5){
        alert("password should be atleast 6 characters long")
    }
    else if(isUser(email)){
        alert("user already exists")
    }else{
        users.push(newUser)
        localStorage.setItem("users",JSON.stringify(users))
        localStorage.setItem("currentUser",JSON.stringify(newUser))
        window.location.href="./index.html"
    }
}


function isUser(email){
    let filtered=users.filter((e)=>e.email===email)
    console.log(filtered);
    return filtered.length>0
}