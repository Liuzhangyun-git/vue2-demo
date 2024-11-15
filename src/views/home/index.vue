<template>
  <div class="home-container">
    <div class="card">
      <div
        class="item"
        @click="toPage(item.routeName)"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="title">
          <img :src="item.img" alt="" />
          <span>{{ item.name }}</span>
        </div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from "@/assets/home/医院.png";
import img2 from "@/assets/home/病历.png";
import img3 from "@/assets/home/检查.png";
import img4 from "@/assets/home/质控.png";
import img5 from "@/assets/home/设备效益.png";
import img6 from "@/assets/home/预警.png";
import img7 from "@/assets/home/知识库.png";
import img8 from "@/assets/home/考核.png";
import img9 from "@/assets/home/添加.png";

import appImg1 from "@/assets/home/给药.png";
import appImg2 from "@/assets/home/不良事件.png";
import appImg3 from "@/assets/home/核心制度.png";
import appImg4 from "@/assets/home/配置.png";

export default {
  name: "Home",
  data() {
    return {
      list: [
        {
          name: "表格拖动排序",
          desc: "基于 antd + vuedraggable",
          img: img1,
          show: true,
          routeName: "vue-draggable-table",
        },
        {
          name: "css文字擦除效果",
          desc: "css 变量、可过度的自定义属性",
          img: img2,
          show: true,
          routeName: "css-erase",
        },
        {
          name: "日程组件",
          desc: "基于 antd + FullCalendar",
          img: img4,
          show: true,
          routeName: "as-calendar-v2",
        },
        {
          name: "临时测试",
          desc: "用于零时测试模块",
          img: img3,
          show: true,
          routeName: "test",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    toPage(name) {
      if (!name) {
        this.$message.warning("开发中，敬请期待～");
        return;
      }
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="less" scoped>
.display-grid(@minWidth, @gap, @maxWidth: 1fr) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(@minWidth, @maxWidth));
  gap: @gap;
}

.item-hover(@color) {
  transition: all 0.5s;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    background-color: @color;
  }
}

.home-container {
  padding: 90px 0 10px 30px;
  min-height: 100%;
  background: url("@/assets/home/Group 323.png");
  background-repeat: repeat-y;
  min-height: 100vh;

  .card {
    width: 80%;
    .display-grid(200px, 20px);

    .item {
      padding: 20px;
      border-radius: 8px;
      .item-hover(rgba(255, 255, 255, 0.3));

      .title {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }

        span {
          font-size: 15px;
          font-weight: bold;
        }
      }

      .desc {
        font-size: 12px;
        color: #a5aab4;
      }
    }
  }

  .app {
    margin-top: 80px;

    .title {
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 20px;

      &::before {
        content: "";
        display: inline-block;
        width: 3px;
        height: 20px;
        vertical-align: text-bottom;
        background-color: #50a1eb;
        margin-right: 10px;
      }
    }

    .card {
      width: 80%;
      .display-grid(100px, 20px, 100px);

      .item {
        .item-hover(rgba(255, 255, 255, 0.3));
        padding: 15px 8px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 12px;
        font-weight: bold;

        img {
          width: 35px;
          height: 35px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
