<template>
    <Draggable ghostClass="ghost" tag="tbody" v-model="data.dataSource" @change="onChange" handle=".drag-handle">
        <slot></slot>
    </Draggable>
</template>
<script>
import Draggable from "vuedraggable";

export default {
    name: 'CustomWrapper',
    components: {
        Draggable
    },
    inject: ["data"],
    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {
        onChange(evt) {
            this.data.listChange(this.data.dataSource)
        }
    }

};
</script>