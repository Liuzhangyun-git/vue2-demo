<template>
    <div class="container">
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae tempore ab maxime, qui ipsam, nulla
            nemo earum odit architecto et aspernatur! Ducimus, architecto natus soluta incidunt vitae saepe non ullam!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi suscipit quas vitae architecto,
            debitis atque veritatis illum quaerat dolores magnam ipsam ipsa officiis soluta hic unde totam ut
            consectetur.
        </p>

        <p class="eraser">
            <span class="text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae tempore ab maxime, qui ipsam, nulla
                nemo earum odit architecto et aspernatur! Ducimus, architecto natus soluta incidunt vitae saepe non
                ullam!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi suscipit quas vitae architecto,
                debitis atque veritatis illum quaerat dolores magnam ipsam ipsa officiis soluta hic unde totam ut
                consectetur.
            </span>
        </p>
    </div>
</template>
<script>

export default {
    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {

    }

};
</script>

<style scoped>
.container {
    background: #000;
    color: #fff;
    position: relative;
    margin: 0;
    min-height: 100vh;
    line-height: 2;
}


.container .eraser {
    position: absolute;
    left: 0;
    top: 0;
}

@property --p {
    syntax: '<percentage>';
    initial-value: 0%;
    inherits: false;
}

.container .eraser .text {
    --p: 10%;
    background: linear-gradient(to right, #0000 var(--p), #000 calc(var(--p) + 100px));
    color: transparent;
    animation: erase 5s forwards;
}

@keyframes erase {
    to {
        --p: 100%;
    }
}
</style>