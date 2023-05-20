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

export async function signup() {
    let uname = document.getElementById("signup_user").value
    let pass = document.getElementById("signup_pass").value
    let token = document.getElementById("signup_token")?.value

    let response = await fetch("http://localhost:3000/signup", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uname": uname, "pass": pass, "token": token })
    })
    if(response.status === 200) {
        return true
    }
    else {
        return false
    }
    
}

export function signout() {
    fetch("http://localhost:3000/signout", {
        method: 'POST',
    })
    .then(()=> {this.$emit('logout')})
}

export function compare() {
    let pass = document.getElementById('signup_pass')?.value
    let confirmpass = document.getElementById('signup_confirmpass')?.value

    if(pass === confirmpass || confirmpass === '') {  
        return true
    }
    else {
        return false
    }
}

export function check_input(Id) {
    let input = document.getElementById(Id)?.value
    let pattern

    // Checks short_identifiable_string
    if(Id === "signup_user" || Id === "signin_user") {
        pattern = new RegExp("^[a-z0-9_-]{3,32}$")
        if(pattern.test(input) || input === '') {
            return true
        }
        else {
            return false
        }
    }

    // Checks short_ascii_string
    else if(Id === "signup_pass" || Id === "signin_pass" || Id === "signup_token") {
        pattern = new RegExp("^[ -~]{3,32}$")
        if(pattern.test(input) || input === '') {
            return true
        }
        else {
            return false
        }
    }
}
