<template lang="html">
    <form>
        <div class="ps-form__content">
            <div class="mb-10" v-if="msg">
                <span class="error">{{msg}}</span>
            </div>
            <h5>Register An Account</h5>
            <div class="form-group">
                <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    @input="$v.name.$touch()"
                    placeholder="name"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    placeholder="Email Address"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="phone"
                    :error-messages="phoneErrors"
                    @input="$v.phone.$touch()"
                    placeholder="Phone"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    type="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Password"
                    class="ps-text-field"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                    v-if="isLoading"
                >
                    Loading ...
                </button>
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                    v-else
                >
                    Register 
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    name: 'Register',
    computed: {
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.required && errors.push('This field is required');
            return errors;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push('This field is required');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('This field is required');
            return errors;
        },
        phoneErrors() {
            const errors = [];
            if (!this.$v.phone.$dirty) return errors;
            !this.$v.phone.required && errors.push('This field is required');
            return errors;
        }
    },
    data() {
        return {
            email: 'ahmed@ahmed.com',
            password: 123456,
            name: 'ahmed',
            phone: '012049',
            isLoading: false,
            msg : "",

        };
    },
    validations: {
        email: { required , email },
        password: { required },
        name: { required },
        phone: { required },
    },
    methods: {
         handleSubmit()  {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.$store.dispatch('myAuth/register', {email : this.email ,name : this.name , phone : this.phone , password :this.password})
                .then(async () => {
                    
                    await this.$auth.loginWith('local', { data: {emailOrPhone : this.email , password :this.password} })
                    this.$router.push('/')
                    this.isLoading = false
                })
                .catch(e => {
                    this.msg = e
                    this.isLoading = false

                });
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

