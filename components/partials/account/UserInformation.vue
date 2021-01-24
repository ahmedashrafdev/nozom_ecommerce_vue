<template lang="html">
  <section class="ps-my-account ps-page--account">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="ps-section__left">
            <aside class="ps-widget--account-dashboard">
              <div class="ps-widget__header">
                <img src="/img/users/3.jpg" />
                <figure>
                  <figcaption>Hello</figcaption>
                  <p>{{$auth.user.email}}</p>
                </figure>
              </div>
              <div class="ps-widget__content">
                <AccountLinks :links="accountLinks" />
              </div>
            </aside>
          </div>
        </div>
        <div class="col-lg-8">
          <section class="ps-section--account-setting">
            <div class="ps-section__content">
                <div class="flex-space mb-20">
                    <ul>
                        <li>email :{{$auth.user.email}}</li>
                        <li>name :{{$auth.user.name}}</li>
                    </ul>
                    <nuxt-link to="/account/user-edit" class="btn mr-5"
                      ><i class="icon-edit"></i>Edit Account</nuxt-link>
                </div>
              <div class="flex-space">
                <h3>phones</h3>
                <a @click="showCreatePhone()" class="btn"
                  ><i class="icon-plus"></i>Add Phone</a
                >
              </div>
              <div class="phone-form" v-if="creatingPhone">
                <div class="form-group">
                  <label> Phone<sup>*</sup> </label>
                  <input
                    type="text"
                    v-model="phone"
                    placeholder=""
                    class="form-control"
                  />
                  <div class="err-list" v-if="msg.phone">
                    <ul>
                      <li class="error" v-for="err in msg.phone">
                        {{err}}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="form-group submit">
                  <button class="ps-btn" v-if="isLoading">Loading ...</button>
                  <button class="ps-btn" @click.prevent="addPhone()" v-else>
                    Save Phone
                  </button>
                </div>
              </div>
              <ul>
                <li v-for="ph in $auth.user.phones" :key="ph.id">
                  <span>phone :{{ph.phone}}</span>
                  <div class="flex">
                    <a @click="showEditPhone(ph)" class="btn mr-5"
                      ><i class="icon-edit"></i>Edit Phone</a
                    >
                    <a @click="deletePhone(ph.id)" class="btn danger red"
                      ><i class="icon-trash"></i>Delete Phone</a
                    >
                  </div>
                  <div class="phone-form" v-if="editingPhoneId == ph.id">
                    <div class="form-group">
                      <label> Phone<sup>*</sup> </label>
                      <input
                        type="text"
                        v-model="phone"
                        placeholder=""
                        class="form-control"
                      />
                      <div class="err-list" v-if="msg.phone">
                        <ul>
                          <li class="error" v-for="err in msg.phone">
                            {{err}}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="form-group submit">
                      <button class="ps-btn" v-if="isLoading">
                        Loading ...
                      </button>
                      <button class="ps-btn" @click.prevent="editPhone(ph.id)" v-else>
                        Save Phone
                      </button>
                    </div>
                  </div>
                </li>
              </ul>

              
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AccountLinks from './modules/AccountLinks';
// import { mapGetters } from 'vuex';
export default {
    name: 'UserInformation',
    components: { AccountLinks },
    // computed: {
    //     ...mapGetters({
    //         user: 'auth/loggedInUser',
    //     })
    // },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Account Information',
                    url: '/account/user-information',
                    icon: 'icon-user',
                    active: true

                },
                {
                    text: 'Notifications',
                    url: '/account/notifications',
                    icon: 'icon-alarm-ringing'
                },
                {
                    text: 'Invoices',
                    url: '/account/invoices',
                    icon: 'icon-papers'
                },
                {
                    text: 'Address',
                    url: '/account/addresses',
                    icon: 'icon-map-marker'
                },
                {
                    text: 'Recent Viewed Product',
                    url: '/account/recent-viewed-product',
                    icon: 'icon-store'
                },
                {
                    text: 'Wishlist',
                    url: '/account/wishlist',
                    icon: 'icon-heart'
                }
            ],
            creatingPhone:false,
            phone:"",
            isLoading:false,
            editingPhoneId:null,
            msg:""
        };
    },
    methods:{
        addPhone(){
            this.isLoading = true
            this.$store.dispatch('user/addPhone' , {phone : this.phone})
            .then(async ()=>{
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Phone has been created successfully`
                });
                await this.$auth.fetchUser()
                this.creatingPhone = false
                this.phone = null
                this.isLoading = false
                this.msg = null

            })
            .catch(e => {
                    this.msg = e
                    this.isLoading = false
                });
        },
        showEditPhone(phone){
            this.phone = phone.phone
            this.creatingPhone = false
            this.editingPhoneId = phone.id
        },
        showCreatePhone(){
          this.creatingPhone = true
          this.phone = null
          this.editingPhoneId = null
        },
        editPhone(id){
            this.isLoading = true
                this.$store.dispatch('user/editPhone', {phone :this.phone , id: id})
            .then(async ()=>{
                 this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Phone has been updated successfully`
                });
                await this.$auth.fetchUser()
                this.phone = null
                this.editingPhoneId = null
                this.isLoading = false
                this.msg = null

            })
            .catch(e => {
                this.msg = e
                this.isLoading = false
            });
        },
        deletePhone(id){
            this.isLoading = true
            this.$store.dispatch('user/deletePhone' ,  id)
            .then(async()=>{
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Phone has been deleted successfully`
                });
                await this.$auth.fetchUser()
                this.isLoading = false
                this.msg = null
            })
            .catch(e => {
                    this.msg = e
                    this.isLoading = false
                });

        }
    },
    created(){
        
    }
};
</script>

<style lang="scss" scoped></style>
