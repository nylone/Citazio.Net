<template>
    <div>
        <!-- Container -->
        <b-container>
            <b-row>
                <b-col>
                    <!-- Sign in card -->
                    <b-card align="center">
                        <b-card-header>
                            <h3 class="theysa-shadow">Sign In</h3>
                        </b-card-header>
                        <b-card-body>
                            <b-form>
                                <b-form-input 
                                placeholder="Username" 
                                type="text" 
                                id="signin_user" 
                                v-on:input = "signin_input = check_input('signin_user')"
                                v-on:keyup.enter = "get_response('Signin')"
                                :state = "signin_response"
                                size="lg" 
                                required>

                                </b-form-input>

                                <b-form-invalid-feedback :state="signin_input">
                                Invalid input
                                </b-form-invalid-feedback>

                                <b-form-input 
                                placeholder="Password" 
                                type="password" 
                                id="signin_pass" 
                                v-on:input = "signin_pass = check_input('signin_pass')"
                                v-on:keyup.enter = "get_response('Signin')"
                                :state="signin_response"
                                size="lg" 
                                required>

                                </b-form-input>

                                <b-form-invalid-feedback :state="signin_pass">
                                Invalid input
                                </b-form-invalid-feedback>

                                <b-form-invalid-feedback :state="signin_response">
                                Login failed, please check your credentials.
                                </b-form-invalid-feedback>

                            </b-form>
                        </b-card-body>
                        <b-card-footer align="center">
                            <input class="theysa-button theysa-shadow inputButton" type="submit" @click="get_response('Signin')"
                                value="SUBMIT" />
                        </b-card-footer>
                    </b-card>
                </b-col>
                <b-col>
                    <!-- Sign up card -->
                    <b-card align="center">
                        <b-card-header>
                            <h3 class="theysa-shadow">Sign Up</h3>
                        </b-card-header>
                        <b-card-body>
                            <b-form>
                                <!-- Username  -->
                                <b-form-input 
                                placeholder="Username" 
                                type="text" 
                                id="signup_user" 
                                v-on:input = "signup_input = check_input('signup_user')"
                                v-on:keyup.enter = "get_response('Signup')"
                                size="lg" 
                                required>
                                </b-form-input>

                                <b-form-invalid-feedback :state="signup_input">
                                Invalid input
                                </b-form-invalid-feedback>

                                <!-- Password -->
                                <b-form-input 
                                placeholder="Password" 
                                type="password" 
                                id="signup_pass" 
                                v-on:input = "signup_pass = check_input('signup_pass')"
                                v-on:keyup.enter = "get_response('Signup')"
                                size="lg" 
                                required>

                                </b-form-input>
                                
                                <b-progress :max="3"  >
                                    <b-progress-bar :value="signup_pass" :variant="security_level.variant[signup_pass]">
                                        {{ security_level.level[signup_pass] }}
                                    </b-progress-bar>
                                </b-progress>

                                <!-- Confirm Password -->
                                <b-form-input 
                                placeholder="Confirm Password" 
                                type="password" 
                                id="signup_confirmpass" 
                                v-on:input="verify = compare()"
                                v-on:keyup.enter = "get_response('Signup')"
                                size="lg" 
                                required>

                                </b-form-input>

                                <b-form-invalid-feedback :state="signup_pass">
                                Invalid input
                                </b-form-invalid-feedback>

                                <b-form-invalid-feedback :state="verify">
                                Password does not match
                                </b-form-invalid-feedback>

                                <!-- Token -->
                                <b-form-input
                                placeholder="Token" 
                                type="text" 
                                :disabled=!status
                                id="signup_token" 
                                v-on:input = "signup_token = check_input('signup_token')"
                                v-on:keyup.enter = "get_response('Signup')"
                                size="lg" 
                                required>

                                </b-form-input>

                                <b-form-invalid-feedback :state="signup_token">
                                Invalid input
                                </b-form-invalid-feedback>

                                <!-- Token Checkbox -->
                                <b-form-checkbox
                                v-model="status"
                                type="text"
                                id="signup_token_checkbox"
                                size="lg"
                                >
                                    Use Token
                                </b-form-checkbox>
                            </b-form>
                            
                        </b-card-body>
                        <b-form-invalid-feedback :state="signup_response">
                            Service may also require token based authentication. <br />If so contact the admin.
                        </b-form-invalid-feedback>
                        <b-card-footer align="center">
                            <input class="theysa-button theysa-shadow inputButton" type="submit" @click="get_response('Signup')" value="SUBMIT" />
                                
                        </b-card-footer>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { signin, signup, compare, check_input } from './user'

export default {
    name: 'UserAuth',
    data() {
        let status = false
        let signup_response = null
        let signin_response = null
        let verify
        let signin_input
        let signin_pass 
        let signup_input
        let signup_pass
        let signup_token
        let security_level = {
            level: ["Error", "Weak", "Medium", "Strong"], variant: ["info", "danger", "warning", "success"]
        }
        return {
            status,
            signup_response,
            signin_response,
            verify,
            signin_input,
            signin_pass, 
            signup_input,
            signup_pass,
            signup_token,
            security_level,
            signin,
            signup,
            compare,
            check_input
        }
    },
    methods: {
        async get_response(auth_type) {
            if(auth_type === 'Signup') {
                this.signup_response = await this.signup();
            }
            else if(auth_type === 'Signin') {
                this.signin_response = await this.signin();
                console.log(this.signin_response)
            }
            
        },
    }
}
</script>