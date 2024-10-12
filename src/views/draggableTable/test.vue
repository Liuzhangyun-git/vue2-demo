<template>
    <div style="margin: 24px">
        <a-table :columns="columns" :dataSource="dataSource" :components="components">
            <template v-slot:action>
                <a href="javascript:;" class="drag-handle" style="cursor: move;">拖动</a>
            </template>
        </a-table>
    </div>
</template>

<script>
const CustomWrapper = () => import('./index.vue');
const columns = [
    {
        title: "id",
        dataIndex: "id",
        sorter: true,
        width: "20%",
        scopedSlots: { customRender: "name" },
    },
    {
        title: "Gender",
        dataIndex: "gender",
        filters: [
            { text: "Male", value: "male" },
            { text: "Female", value: "female" },
        ],
        width: "20%",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    name: "App",
    provide() {
        return {
            data: this,
        };
    },
    data() {
        return {
            columns,
            components: {
                body: {
                    wrapper: CustomWrapper,
                },
            },
            dataSource: [{
                id: 1,
                key: 0,
                date: '2018-02-11',
                amount: 120,
                type: 'income',
                note: 'transfer',
            },
            {
                id: 2,
                key: 1,
                date: '2018-03-11',
                amount: 243,
                type: 'income',
                note: 'transfer',
            },
            {
                id: 3,
                key: 2,
                date: '2018-04-11',
                amount: 98,
                type: 'income',
                note: 'transfer',
            }],
        };
    },
    mounted() {

    },
    methods: {
        listChange(list) {

        }
    },
};
</script>

<style></style>