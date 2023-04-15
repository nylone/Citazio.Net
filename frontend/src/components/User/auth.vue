<template>
    <div>
        <!-- Container -->
        <b-container>
            <b-row>
                <b-col>
                    <!-- Sign in card -->
                    <b-card align="center" footer-class="background-color: var(--bg-color);">
                        <b-card-header>
                            <h3 class="theysa-shadow">Sign In</h3>
                        </b-card-header>
                        <b-card-body>
                            <b-form>
                                <b-form-input 
                                placeholder="Username" 
                                type="text" 
                                id="signin_user" 
                                size="lg" 
                                required>

                                </b-form-input>

                                <b-form-input 
                                placeholder="Password" 
                                type="password" 
                                id="signin_pass" 
                                size="lg" 
                                required>

                                </b-form-input>
                            </b-form>
                        </b-card-body>
                        <b-card-footer align="center">
                            <input class="theysa-button theysa-shadow inputButton" type="submit" @click="signin()"
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
                                <b-form-input 
                                placeholder="Username" 
                                type="text" 
                                id="signup_user" 
                                v-on:input = "signup_input = check_input('signup_user')"
                                size="lg" 
                                required>
                                </b-form-input>

                                <b-form-invalid-feedback :state="signup_input">
                                There are invalid characters
                                </b-form-invalid-feedback>

                                <b-form-input 
                                placeholder="Password" 
                                type="password" 
                                id="signup_pass" 
                                size="lg" 
                                required>

                                </b-form-input>

                                <b-form-input 
                                placeholder="Confirm Password" 
                                type="password" 
                                id="signup_confirmpass" 
                                v-on:input="verify = compare()"
                                size="lg" 
                                required>

                                </b-form-input>

                                <b-form-invalid-feedback :state="verify">
                                Password does not match
                                </b-form-invalid-feedback>

                                <!-- Token -->
                                <b-form-input
                                placeholder="Token" 
                                type="text" 
                                :disabled=!status
                                id="signup_token" 
                                size="lg" 
                                required>

                                </b-form-input>

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
                        <b-card-footer align="center">
                            <input class="theysa-button theysa-shadow inputButton" type="submit" @click="signup()"
                                value="SUBMIT" />
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
        let verify
        let signin_input 
        let signup_input
        return {
            status,
            verify,
            signin_input,
            signup_input,
            signin,
            signup,
            compare,
            check_input
        }
    },
}
</script>