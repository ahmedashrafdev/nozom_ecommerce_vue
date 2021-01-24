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
                    <div class="ps-section--account-setting">
                        <div class="ps-section__content">
                            <div class="row">
                                <div class="col-md-12 col-12 text-right">
                                    <nuxt-link to="/account/addresses/create" class="btn"><i class="icon-plus"></i>Add</nuxt-link>
                                </div>
                                <div class="col-md-12 col-12" v-if="addresses.length > 0">
                                    <div v-for="address in addresses" :key="address.id" >
                                        <ul>
                                            <li>BuildingNo :{{address.BuildingNo}}</li>
                                            <li>RowNo :{{address.RowNo}}</li>
                                            <li>FlatNo :{{address.FlatNo}}</li>
                                            <li>Street :{{address.Street}}</li>
                                            <li>Remark :{{address.Remark}}</li>
                                            <!-- <li>Main :{{address.Main}}</li> -->
                                        </ul> 

                                        <div class="flex">
                                            <nuxt-link :to="`/account/addresses/${address.id}`" class="btn mr-5"><i class="icon-edit"></i>Edit</nuxt-link>
                                            <a @click="deleteAddress(address.id)" class="btn danger red"><i class="icon-trash"></i>Delete</a>
                                        </div>   
                                       
                                    </div>
                                </div>
                                <div class="col-md-12 col-12" v-else>
                                    <p>Sorry You don't have any address</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AccountLinks from './modules/AccountLinks';
import { mapGetters } from 'vuex';
export default {
    name: 'Addresses',
    components: { AccountLinks },

    computed: {
        ...mapGetters({
            addresses: 'user/addresses'
        })
    },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Account Information',
                    url: '/account/user-information',
                    icon: 'icon-user'
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
                    icon: 'icon-map-marker',
                    active: true
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
            ]
        };
    },
    methods: {
        getUserAddresses(){
            this.$store.dispatch('user/getAddresses')
        },
        deleteAddress(id){
            this.$store.dispatch('user/deleteAddress' , id).then(()=>{
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Address has been deleted successfully`
                });
                this.$store.dispatch('user/getAddresses')

            })
        },
        
    },
    created() {
        this.getUserAddresses()

    }
};
</script>

<style lang="scss" scoped></style>
