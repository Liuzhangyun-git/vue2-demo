<template>
    <div>
        <CustomWrapper></CustomWrapper>
    </div>
</template>

<script>
const CustomWrapper = () => import('./index.vue');


export default {
    name: "css-erase-test",
    components: {
        CustomWrapper
    },
    data() {
        return {


        };
    },
    mounted() {

    },
    methods: {

    },
};
</script>

<style></style>