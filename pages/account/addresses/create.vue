<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <create-address />
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Newsletters from '~/components/partials/commons/Newsletters';
import CreateAddress from '~/components/partials/account/CreateAddress';

export default {
    transition: 'zoom',
    middleware: 'auth',
    components: {
        CreateAddress,
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
                    text: 'Edit Address'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
