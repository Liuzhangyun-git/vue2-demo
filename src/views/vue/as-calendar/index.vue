
<!--
@Author: liuzhangyun
@Date: 2024-11-13
@params: 参见 https://fullcalendar.io/
@Description: 节假日自动更新国务院最新数据 参见：https://github.com/NateScarlet/holiday-cn
@Description: 该组件依赖于 ant-vue-design@^1.7.8、moment、uuid组件
@Description:安装依赖命令：yarn add @fullcalendar/core@^6.1.15 @fullcalendar/daygrid@^6.1.15 @fullcalendar/interaction@^6.1.15 @fullcalendar/timegrid@^6.1.15 @fullcalendar/vue@^6.1.15 @fullcalendar/list@^6.1.15
@Description:若为vite项目 a-range-picker组件bug 参见：https://www.npmjs.com/package/vite-plugin-antdv-fix
-->
<template>
  <div class='as-calendar'>
    <FullCalendar class='full-calendar' :options='calendarOptions' ref="FullCalendar"></FullCalendar>
    <AsPop ref="AsPop" @ok="popOk" @del="delHandle"></AsPop>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import AsPop from './as-pop.vue'
import { v4 as uuidv4 } from 'uuid';

export default {
  props: {
    events: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showHoliday: {
      type: Boolean,
      default: true
    }
  },

  components: {
    FullCalendar,
    AsPop
  },

  data: function () {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        // headerToolbar: false, // 隐藏header
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '天',
          list: '我的日程'
        },
        views: {
          timeGridWeek: {
            allDayText: '全天'
          },
          timeGridDay: {
            allDayText: '全天'
          },
          listMonth: {
            allDayText: '全天',
            noEventsText: '该月暂无事件',
          }
        },
        moreLinkText: '更多', 
        dayMaxEvents: false, // 每天显示最多事件数 其余的显示在更多
        eventTimeFormat: { // 在每个事件上显示的时间的格式
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h23',
        },
        slotLabelContent: function ({date}) {
          let hour = date.getHours();  
          return `${hour}时`; 
        },
        initialView: 'dayGridMonth',
        initialEvents: [],
        timeZone: "local",
        displayEventEnd: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventDrop: this.eventDrop,
        dayCellDidMount: this.dayCellDidMount,
        firstDay: 1,
        locale: 'zh-cn',
        events: [],
        selectable: !this.disabled,
        editable: !this.disabled,
      },
      currentEvents: [],
      selectInfo: null,
      clickInfo: null,
      holidayObj: null
    }
  },
  watch: {
    events: {
      async handler(newVal) {
        await this.$nextTick()
        let FullCalendar = this.$refs.FullCalendar.getApi()
        FullCalendar.setOption('events', this.events)
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {
    if (this.showHoliday) {
      // 这里有点问题设置法定节假日是在每个cell节点挂载完成之后修改的、在这里获取数据如果网速慢就没得数据了
      this.getHolidayData().then(res => {
        this.holidayObj = res
      })
    }
  },

  methods: {
    popOk(obj, type) {
      if (type === 'add') {
        let calendarApi = this.selectInfo.view.calendar
        calendarApi.addEvent({
          id: uuidv4(),
          ...obj
        })
      } else if (type === 'edit') {
        let calendarApi = this.clickInfo.view.calendar
        const event = calendarApi.getEventById(obj.id);
        event.setProp('title', obj.title);
        event.setAllDay(obj.allDay);
        event.setStart(obj.start);
        event.setEnd(obj.end);
        event.setExtendedProp('categoryId', obj.categoryId);
        event.setExtendedProp('disabled', obj.disabled);
        event.setProp('backgroundColor', obj.backgroundColor);
        event.setProp('borderColor', obj.borderColor);
      }
      this.$emit('eventsChange', this.currentEvents);
    },
    handleDateSelect(selectInfo) {
      this.selectInfo = selectInfo
      this.$refs.AsPop.showModal(selectInfo, 'add')
    },

    handleEventClick(clickInfo) {
      this.clickInfo = clickInfo
      this.$refs.AsPop.showModal(clickInfo, 'edit')
    },
    handleEvents(events) {
      this.currentEvents = events
    },
    delHandle() {
      this.$emit('eventsChange', this.currentEvents);
    },
    eventDrop(info) {
      if (info.event.extendedProps.disabled) {
        this.$message.warning('该事件禁止编辑');
        info.revert();
        return
      }
      this.$emit('eventsChange', this.currentEvents);
    },
    async dayCellDidMount(info) {
      if (!this.showHoliday) {
        return true
      }
      const year = info.date.getFullYear();
      const month = (info.date.getMonth() + 1).toString().padStart(2, '0');
      const day = info.date.getDate().toString().padStart(2, '0');
      let dTime = `${year}-${month}-${day}`
      if (this.holidayObj && this.holidayObj[year]) {
        let item = this.holidayObj[year].find(i => i.date === dTime)
        if (item) {
          let content = `<div class='holiday'>${item.name}(${item.isOffDay ? '休' : '班'})</div>`;
          info.el.innerHTML = content;
        }
      }
    },
    async getHolidayData(year = new Date().getFullYear()) {
      // 定义获取假期数据的函数
      const fetchHolidayData = async (year) => {
        let res = await fetch(`https://cdn.jsdelivr.net/gh/NateScarlet/holiday-cn@master/${year}.json`);
        let data = await res.json();
        return { year, days: data.days };
      };

      // 使用 Promise.all 并行请求当前年、上一年和下一年的数据
      const [currentYearData, previousYearData, nextYearData] = await Promise.all([
        fetchHolidayData(year),
        fetchHolidayData(year - 1),
        fetchHolidayData(year + 1),
      ]);

      // 返回一个包含三个年份数据的对象
      return {
        [currentYearData.year]: currentYearData.days,
        [previousYearData.year]: previousYearData.days,
        [nextYearData.year]: nextYearData.days,
      };
    }
  }
}
</script>


<style>
/* 重写覆盖header中按钮的相关颜色 */
:root {
  --fc-button-active-bg-color: #096dd9;
  /* Ant Design 按钮按下时的深蓝色 */
  --fc-button-active-border-color: #096dd9;
  /* 按钮的边框颜色 */
  --fc-button-bg-color: #1890ff;
  /* Ant Design 默认的蓝色背景 */
  --fc-button-border-color: #1890ff;
  /* 按钮的边框颜色 */
  --fc-button-hover-bg-color: #40a9ff;
  /* 按钮悬停时的背景颜色 */
  --fc-button-hover-border-color: #40a9ff;
  /* 按钮悬停时的边框颜色 */
  --fc-button-text-color: #ffffff;
  /* 按钮文字的颜色 */
}

.as-calendar,
.full-calendar {
  width: 100%;
  height: 100%;
}

.as-calendar .full-calendar a {
  color: inherit;
}

.as-calendar .full-calendar .fc-header-toolbar {
  font-size: 13px;
}

.as-calendar .full-calendar .fc-toolbar-title {
  font-size: 1.2em;
}

.as-calendar .full-calendar .fc-button-primary:focus,
.fc-button:focus {
  box-shadow: none !important;
  outline: 0 !important;
}

.holiday {
  position: absolute;
  padding:6px 4px;
  color: #2890FF;
  font-size: 11px;
}
</style>
