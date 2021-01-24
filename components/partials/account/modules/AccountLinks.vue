<template lang="html">
    <ul>
        <template v-for="link in links">
            <li :key="link.text" :class="link.active ? 'active' : ''">
                <nuxt-link :to="link.url">
                    <i :class="link.icon"></i>
                    {{ link.text }}
                </nuxt-link>
            </li>
        </template>
        <li>
            <a @click.prevent="logout()">
                    <i class="icon-power-switch"></i>
                    Logout
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'AccountLinks',
    props: {
        links: {
            type: Array,
            default: () => []
        }
    },
    methods:{
        async logout() {
            await this.$auth.logout();
        },
    }
};
</script>

<style lang="scss" scoped></style>
