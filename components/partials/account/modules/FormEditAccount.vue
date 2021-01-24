<template lang="html">
    
    <form class="ps-form--edit-address">
        <div class="mb-10" v-if="msg">
            <span class="error" v-if="typeof msg == 'string'">{{msg}}</span>
        </div>
        <div class="ps-form__header">
            <h3>Edit Account</h3>
        </div>
        <div class="ps-form__content">
            <div class="form-group">
                <label> name<sup>*</sup> </label>
                <input type="text" v-model="form.name" placeholder="" class="form-control" />
                 <div  class="err-list" v-if="msg.name">
                     <ul>
                        <li class="error" v-for="err in msg.name">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label> email <sup>*</sup> </label>
                <input type="text" v-model="form.email" placeholder="" class="form-control" />
                 <div  class="err-list" v-if="msg.email">
                     <ul>
                        <li class="error" v-for="err in msg.email">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label> password <sup>*</sup> </label>
                <input type="password" v-model="form.password" placeholder="" class="form-control" />
                 <div  class="err-list" v-if="msg.passowrd">
                     <ul>
                        <li class="error" v-for="err in msg.passowrd">
                            {{err}}
                        </li>
                    </ul>
                </div>
                <span> Leave It blank if you don't want to edit </span>
            </div>
            <div class="form-group submit">
                <button class="ps-btn" v-if="isLoading">Loading ...</button>
                <button class="ps-btn" @click.prevent="editAccount()" v-else>Save</button>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    name: 'edit-acc',
    data(){
        return {
            form:{
                name : "",
                email : "",
                password : "",
            },
            isLoading:false,
            msg:"",
        }
    },
    methods:{
        editAccount() {
                this.isLoading = true
                this.$store.dispatch('user/editAccount', this.form)
            .then(async ()=>{
                this.isLoading = false
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Account has been updated successfully`
                });
                await this.$auth.fetchUser()
                this.$router.push('/account/user-information')  
            })
            .catch(e => {
                this.msg = e
                this.isLoading = false
            });
        }
    },
    created(){
        this.form.email = this.$auth.user.email
        this.form.name = this.$auth.user.name
        this.form.password = this.$auth.user.password
    }
}
</script>
