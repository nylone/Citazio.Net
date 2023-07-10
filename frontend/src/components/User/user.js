export function signin() {
    let uname = document.getElementById("signin_user").value
    let pass = document.getElementById("signin_pass").value
    fetch(`${this.$path}/signin`, {
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
            this.$emit("close:successauth")
        }
    })
}

export async function signup() {
    let uname = document.getElementById("signup_user").value
    let pass = document.getElementById("signup_pass").value
    let token = document.getElementById("signup_token")?.value
    let body
    if (token !== "")
        body = JSON.stringify({ "uname": uname, "pass": pass, "token": token })
    else
        body = JSON.stringify({ "uname": uname, "pass": pass})

    let response = await fetch(`${this.$path}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    })
    if(response.status === 200) {
        this.$emit("close:successauth")
        return true
    }
    else {
        return false
    }
    
}

export function signout() {
    fetch(`${this.$path}/signout`, {
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


// Validates the password security level
function validate_password(password) {
    /* This variables hold the patterns required for a strong or medium password. 
        The requirements are:

            STRONG PASSWORD
            - at least one uppercase and lowercase letter
            - at least one special character
            - at least one digit
            - at least 8 characters long

            MEDIUM PASSWORD
            - at least one uppercase and lowercase letter
            - at least 6 characters long
            - at least one special character
            - there are no digits AND all the previous requirements are met

        Source: https://stackoverflow.com/questions/5142103/regex-to-validate-password-strength
    */
    let StrongPattern = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

    let MediumPattern = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{6,}))')
    
    if(StrongPattern.test(password)) {
        return 3  // Strong
    }
    else if(MediumPattern.test(password)) {
        return 2  // Medium
    }
    else {
        return 1  // Weak
    }
}


// Checks if the input is valid
export function check_input(Id) {
    let input = document.getElementById(Id)?.value  // The element that needs to be checked
    let pattern  // variable used for storing the RegEx pattern

    // Checks short_identifiable_string
    if(Id === "signup_user" || Id === "signin_user") {
        pattern = new RegExp("^[a-zA-Z0-9_-]{3,32}$")
        if(pattern.test(input) || input === '') {
            return true
        }
        else {
            return false
        }
    }

    // Checks short_ascii_string
    else if(Id === "signup_token") {
        pattern = new RegExp("^[ -~]{1,32}$")
        if(pattern.test(input) || input === '') {
            return true
        }
        else {
            return false
        }
    }

    else if(Id === "signup_pass" || Id === "signin_pass" ) {
        if(input.length > 32) {
            return 0;
        }
        else {
            return validate_password(input)
        }
    }
}

// Checks if the cookie is still valid
export async function check_session() {
    let response = await fetch(`${this.$path}/session/check`, {
        method: 'GET',
        credentials: 'include'
    })
    if(response.status === 200) {
        return true
    }
    else {
        return false
    }
}

// Returns session info
export async function get_session_info() {
    let response = await fetch(`${this.$path}/session/get`, {
        method: 'GET',
        credentials: 'include'
    })
    if(response.status === 200) {
        return response.json()
    }
    else {
        return false
    }
}


