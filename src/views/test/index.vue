<template>
    <div class="test">
        测试
        <HelloWorld :obj="obj"></HelloWorld>
    </div>
</template>

<script>
import HelloWorld from "/src/components/HelloWorld.vue"
export default {
    components: {
        HelloWorld
    },
    data() {
        return {
            obj: {
                a: 1
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.obj.a = 3
        }, 2000);

        setTimeout(() => {
            this.obj = {
                a: 3333,
                b: 888
            }
        }, 3000);
    }
}
</script>