<template>
  <div class="theysa-flex-row">
        <div class="theysa-flex-col theysa-box theysa-shadow grows">
            <h3 class="theysa-shadow">Sign in</h3>
            <form action="javascript:void(0);" class="theysa-flex-col">
                <input
                        class="theysa-shadow grows"
                        id="luser"
                        placeholder="username"
                        required
                        v-on:input = "check_input('luser')"
                        type="text"
                /><br/>
                <input
                        class="theysa-shadow grows"
                        id="lpass"
                        placeholder="password"
                        required
                        type="password"
                /><br/>
                <input class="theysa-button theysa-shadow theysa-grows" type="submit" @click="login()" value="SIGN IN"/>
            </form>
            <p style="color:red" v-if="ltexterr">Invalid char</p>
        </div>
        <div class="theysa-flex-col theysa-box theysa-shadow grows">
            <h3 class="theysa-shadow">Sign up</h3>
            <form action="javascript:void(0);" class="theysa-flex-col">
                <label class="theysa-flex-row" style="align-items: center;" for="checkbox">
                        <input type="checkbox" style="width: auto;" v-model="showToken"/>
                        <p style="margin-bottom: 0; ">Use Token</p>
                </label>
                <input
                        class="theysa-shadow grows"
                        placeholder="username"
                        id="suser"
                        required
                        v-on:input = "check_input('suser')"
                        type="text"
                /><br/>
                <input
                        class="theysa-shadow grows"
                        placeholder="password"
                        id="spass"
                        required
                        type="password"
                /><br/>
                <input
                        class="theysa-shadow grows"
                        id="cpass"
                        placeholder="confirm password"
                        required
                        v-on:input="verify()"
                        type="password"
                /><br/>
                
                <input
                        v-if="showToken"
                        class="theysa-shadow grows"
                        id="token"
                        placeholder="Token"
                        required
                        type="text"
                />
                <input class="theysa-button theysa-shadow grows" type="submit" @click="signup()" value="SIGN UP"/>
                
            </form>
            <p style="color:red" v-if="err">password does not match</p>
            <p style="color:red" v-if="stexterr">Invalid char</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { store } from './store'
        export default {
        name: 'AuTh',
        setup() {
                const showToken = ref(false)
                const err = ref(false)
                const ltexterr = ref(false)
                const stexterr = ref(false)
                function login() {
                        let uname = document.getElementById("luser").value
                        let pass = document.getElementById("lpass").value
                        fetch("http://localhost:3000/signin", {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"uname": uname, "pass": pass})
                        })
                        .then(response => {
                                if(response.status === 200) { 
                                        this.$logged.value=true 
                                        this.$emit("CloseModal")
                                        get_boards().then((res) => {store.boards=res; } )
                                        
                                }
                        }) 			
                }
                function signup() {
                        let uname = document.getElementById("suser").value
                        let pass = document.getElementById("spass").value
                        let token = document.getElementById("token")?.value
                        fetch("http://localhost:3000/signup", {
                                method: 'POST',         
                                headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"uname": uname, "pass": pass, "token": token})
                        }).then(response => response.json())
                }
                function verify() {
                        let pass = document.getElementById("spass")?.value
                        let cpass = document.getElementById("cpass")?.value
                        if(pass === cpass) {
                                err.value = false 
                        }
                        else {
                                err.value = true
                        }
                }
                function check_input(s) { 
                        let text = document.getElementById(s).value
                        let pattern = new RegExp("^[ -~]+$")
                        if(pattern.test(text)) {
                                s==="luser" ? ltexterr.value=false : stexterr.value=false
                        }
                        else {
                                s==="luser" ? ltexterr.value=true : stexterr.value=true
                        }
                }
                async function get_boards() {
                        let response = await fetch("http://localhost:3000/boards/get", {
                                method: 'GET',
                                credentials: 'include',
                        });
                        response = await response.json()
                        return response
                }
                return {
                        showToken,
                        err,
                        ltexterr,
                        stexterr,
                        login,
                        signup,
                        verify,
                        check_input,
                        get_boards,
                }
        }
}
</script>