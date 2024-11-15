<template>
  <div class="test">
    <a-config-provider :locale="locale">
      <div style="width: 600px;">
        <AsCalendar @eventsChange="eventsChange" :events="events"/>
      </div>
    </a-config-provider>
  </div>
</template>

<script>
import AsCalendar from './index.vue'
import ZHCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'Test',
  components: {
    AsCalendar
  },
  data() {
    return {
      locale: ZHCN,
      events:[]
    }
  },
  mounted(){
    this.events = [ { "allDay": true, "title": "去巴黎看一场时装秀", "start": "2024-11-21", "end": "2024-11-24", "id": "52168c43-f198-405f-9b40-e8f3cc345b82", "backgroundColor": "#9E60FF", "borderColor": "#9E60FF", "extendedProps": { "disabled": false, "time": [ "2024-11-20T16:00:00.000Z", "2024-11-23T16:00:00.000Z" ], "categoryId": "1" } }, {disabled:true, "allDay": true, "title": "禁用事件示例", "start": "2024-11-25", "end": "2024-11-29", "id": "d58db8ba-878a-4544-9c58-39d29dfc15ae", "backgroundColor": "#2CA9FF", "borderColor": "#2CA9FF", "extendedProps": { "disabled": false, "time": [ "2024-11-24T16:00:00.000Z", "2024-11-28T16:00:00.000Z" ], "categoryId": "0" } } ]
  },
  methods:{
    eventsChange(events){
      this.$message.warning('events 变化了 可以在这里保存数据');
    }
  }
}
</script>

<style>
.test {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 100px;
  display: flex;
  justify-content: center;
}
</style>
