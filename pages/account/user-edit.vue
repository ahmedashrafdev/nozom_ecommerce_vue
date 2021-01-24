<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <edit-account />
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Newsletters from '~/components/partials/commons/Newsletters';
import EditAccount from '~/components/partials/account/EditAccount';

export default {
    transition: 'zoom',
    middleware: 'auth',
    components: {
        EditAccount,
        Newsletters,
        BreadCrumb
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Edit Account'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
