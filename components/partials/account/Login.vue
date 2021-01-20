<template lang="html">
    <form>
        <div class="ps-form__content">
            <h5>Log In Your Account</h5>
            <div class="form-group">
                <v-text-field
                    v-model="emailOrPhone"
                    class="ps-text-field"
                    :error-messages="emailOrPhoneErrors"
                    @input="$v.emailOrPhone.$touch()"
                    placeholder="Phone or email"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    type="password"
                    class="ps-text-field"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Please enter password"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-checkbox label="Remember me" color="warning" />
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                >
                    Login
                </button>
            </div>
        </div>
       <!-- <div class="ps-form__footer">
            <p>Connect with:</p>
            <ul class="ps-list--social">
                <li>
                    <a href="#" class="facebook">
                        <i class="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="google">
                        <i class="fa fa-google-plus"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="twitter">
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="instagram">
                        <i class="fa fa-instagram"></i>
                    </a>
                </li>
            </ul>
        </div>!-->
    </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    name: 'Login',
    computed: {
        emailOrPhoneErrors() {
            const errors = [];
            if (!this.$v.emailOrPhone.$dirty) return errors;
            !this.$v.emailOrPhone.required && errors.push('This field is required');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('This field is required');
            return errors;
        }
    },
    data() {
        return {
            emailOrPhone: null,
            password: null
        };
    },
    validations: {
        emailOrPhone: { required },
        password: { required }
    },
    methods: {
        handleSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.$store.dispatch('auth/login', this.$data);
                
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.ps-form--account .ps-form__content {
    padding: 30px;
}
</style>
