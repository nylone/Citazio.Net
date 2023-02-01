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
                        type="password"
                /><br/>
                
                <input
                        v-if="showToken"
                        class="theysa-shadow grows"
                        name="Token"
                        placeholder="Token"
                        required
                        type="password"
                />
                <input class="theysa-button theysa-shadow grows" type="submit" @click="signup()" value="SIGN UP"/>
                
            </form>
            <p style="color:red" v-if="err">Confirm password does not match</p>
        </div>
    </div>
</template>

<script>
        import { ref } from 'vue'
        export default {
        name: 'AuTh',
        setup() {
                const showToken = ref(false)
                const err = ref(false)
                function login() {
                        let uname = document.getElementById("luser").value
                        let pass = document.getElementById("lpass").value
                        fetch("http://localhost:3000/login", {
                                method: 'POST',
                                headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({"uname": uname, "pass": pass})
                        }).then(response => response.json())
                }
                function signup() {
                        let uname = document.getElementById("suser").value
                        let pass = document.getElementById("spass").value
                        let cpass = document.getElementById("cpass").value
                        if(cpass === pass) {
                                err.value = false;
                                fetch("http://localhost:3000/signup", {
                                        method: 'POST',         
                                        headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({"uname": uname, "pass": pass})
                                }).then(response => response.json())
                        }
                        else {
                                err.value = true
                        }
                }
                return {
                        showToken,
                        err,
                        login,
                        signup,
                }
        }
}
</script>