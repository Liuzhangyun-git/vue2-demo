<template>
  <div>
    <a-modal style="width: 550px;" destroyOnClose :title="type === 'add' ? '新增日程' : '编辑日程'" :visible="visible" okText="确定"
      cancelText="取消" @ok="handleOk" @cancel="handleCancel" :footer="type === 'view' ? null : undefined">
      <a-form-model :model="form" ref="ruleForm" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="分类" prop="categoryId">
          <a-select v-model="form.categoryId" :disabled="type === 'view'">
            <a-select-option :value="item.id" v-for="(item, index) in calendars" :key="item.id">
              <div class="category-item">
                <div :style="{ backgroundColor: item.backgroundColor }" class="category-color-circle"></div>
                <span>{{ item.name }}</span>
              </div>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="标题" prop="title">
          <a-input v-model="form.title" :disabled="type === 'view'" />
        </a-form-model-item>
        <a-form-model-item label="时间">
          <div class="time-container">
            <a-range-picker :disabled="type === 'view'" :show-time="form.allDay ? false : showTime"
              :format="form.allDay ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'" :placeholder="['开始时间', '结束时间']"
              v-model="form.time" />
            <a-checkbox v-model="form.allDay" :disabled="type === 'view'">全天</a-checkbox>
          </div>
        </a-form-model-item>
        <a-form-model-item label="禁用">
          <a-switch checked-children="禁止编辑" :disabled="type === 'view'" un-checked-children="允许编辑"
            v-model="form.disabled" />
        </a-form-model-item>
      </a-form-model>
      <template slot="footer">
        <a-button type="danger" @click="handleDel" v-if="type === 'edit'">删除</a-button>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleOk"> 确认 </a-button>
      </template>
    </a-modal>
  </div>
</template>


<script>
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
moment.locale('zh-cn')
export default {
  data() {
    return {
      showTime: { format: 'HH:mm', defaultValue: [moment().startOf('day'), moment().startOf('day')] },
      moment,
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        time: [{ required: true, message: '请输入请选择时间', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
      },
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
      calendars: [
        {
          id: '0',
          name: '待办',
          backgroundColor: '#2CA9FF',
          borderColor: '#2CA9FF',
        },
        {
          id: '1',
          name: '进行中',
          backgroundColor: '#9E60FF',
          borderColor: '#9E60FF',
        },
        {
          id: '2',
          name: '已完成',
          backgroundColor: '#28BD9E',
          borderColor: '#28BD9E',
        },
        {
          id: '3',
          name: '已取消',
          backgroundColor: '#BBDC00',
          borderColor: '#BBDC00',
        },
        {
          id: '4',
          name: '待确认',
          backgroundColor: '#9D9D9D',
          borderColor: '#9D9D9D',
        },
      ],
      form: {
        title: '',
        categoryId: undefined,
        allDay: true,
        time: [],
      },
      visible: false,
      type: 'add',
      clickInfo: null,
      endTime: null
    };
  },
  watch: {
    // 老外认为 1-3号全天的话 结束时间必须是 4号的 00:00:00
    // 如果不做处理的话 选择了1-3号得到的时间就是 2024-10-1 00:00:00 ~ 2024-10-4 00:00:00
    // 所以这里需要判断一下 如果结束时间是 00:00:00 那么需要减去1秒,在保存的时候再加回去
    'form.allDay': {
      handler(newVal) {
        if (newVal) {
          if (this.endTime) {
            const hour = this.endTime.hour();   // 获取小时
            const minute = this.endTime.minute(); // 获取分钟
            const second = this.endTime.second(); // 获取秒数
            if (hour + minute + second === 0) {
              this.form.time[1] = this.endTime.subtract(1, 'seconds')
            }
          }
        }
      },
      deep: true
    }
  },
  methods: {
    showModal(selectInfo, type) {
      this.type = type
      if (type === 'add') {
        this.form = {
          disabled: false,
          title: '',
          allDay: selectInfo.allDay,
          time: [moment(selectInfo.startStr), moment(selectInfo.endStr)],
          categoryId: null
        };
      } else {
        this.clickInfo = selectInfo
        this.form = {
          id: selectInfo.event.id,
          title: selectInfo.event.title,
          allDay: selectInfo.event.allDay,
          time: [moment(selectInfo.event.startStr), moment(selectInfo.event.endStr)],
          disabled: Boolean(selectInfo.event?.extendedProps?.disabled),
          categoryId: selectInfo.event.extendedProps.categoryId,
        };
      }
      this.endTime = this.form.time[1]
      if (this.form.disabled) {
        this.type = 'view'
      }
      this.visible = true;
    },
    handleOk(e) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let cs = this.calendars.find(item => item.id === this.form.categoryId);
          let obj = {
            ...this.form,
            start: this.form.time[0].toDate(),
            end: this.form.allDay ? this.form.time[1].add(1, 'seconds').toDate() : this.form.time[1].toDate(),
            backgroundColor: cs.backgroundColor,
            borderColor: cs.borderColor,
          };
          this.visible = false;
          this.$emit('ok', obj, this.type);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleDel() {
      this.clickInfo.event.remove()
      this.visible = false
      this.$emit('del');
    },
  },
};
</script>

<style scoped>
.category-item {
  display: flex;
  align-items: center;
}

.category-color-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.time-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
