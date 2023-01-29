<script>
  export default {
    name: 'AuTh'
  }

</script>

<template>
  <div class="theysa-flex-row">
        <div class="theysa-flex-col theysa-box theysa-shadow grows">
            <h3 class="theysa-shadow">Sign in</h3>
            <form method="post" action="/legacy/auth/signin" class="theysa-flex-col">
                <input
                        class="theysa-shadow grows"
                        name="username"
                        placeholder="username"
                        required
                        type="text"
                /><br/>
                <input
                        class="theysa-shadow grows"
                        name="password"
                        placeholder="password"
                        required
                        type="password"
                /><br/>
                <input class="theysa-button theysa-shadow theysa-grows" type="submit" value="SIGN IN"/>
            </form>
        </div>
        <div class="theysa-flex-col theysa-box theysa-shadow grows">
            <h3 class="theysa-shadow">Sign up</h3>
            <form method="post" action="/legacy/auth/signup" class="theysa-flex-col">
                <input
                        class="theysa-shadow grows"
                        name="username"
                        placeholder="username"
                        required
                        type="text"
                /><br/>
                <input
                        class="theysa-shadow grows"
                        name="nickname"
                        placeholder="nickname"
                        required
                        type="text"
                /><br/>
                <input
                        class="theysa-shadow grows"
                        name="password"
                        placeholder="password"
                        required
                        type="password"
                /><br/>
                <input
                        class="theysa-shadow grows"
                        name="confirm"
                        placeholder="confirm password"
                        required
                        type="password"
                /><br/>
                <input
                class="theysa-shadow grows"
                name="token"
                placeholder="signup token"
                required
                type="password"
                /><br/>
                <input class="theysa-button theysa-shadow grows" type="submit" value="SIGN UP"/>
            </form>
        </div>
    </div>
</template>