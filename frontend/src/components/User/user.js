export function signin() {
    let uname = document.getElementById("signin_user").value
    let pass = document.getElementById("signin_pass").value
    fetch("http://localhost:3000/signin", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uname": uname, "pass": pass })
    })
    .then(response => {
        if(response.status === 200) {
            this.$user.value=uname
            this.$emit("close:successauth")
        }
    })
}

export function signup() {
    let uname = document.getElementById("signup_user").value
    let pass = document.getElementById("signup_pass").value
    let token = document.getElementById("signup_token")?.value
    console.log(token)

    fetch("http://localhost:3000/signup", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uname": uname, "pass": pass, "token": token })
    })
    .then(response => {
        if(response.status === 200) {
            response.json()
        }    
        })
}