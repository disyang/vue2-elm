<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
  <div>
    <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 v-text="count"></h3>
      </el-carousel-item>
    </el-carousel>
    <el-button @click="decrement">-</el-button>
    <el-button @click="increment">+</el-button>
    <el-button type="primary" @click="$router.push('/login')">返回</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class HelloDecorator extends Vue {
  @Prop() readonly name!: string;
  @Prop({ default: 0 }) readonly initialEnthusiasm!: number;

  enthusiasm: number = this.initialEnthusiasm;
  count: number = 0;

  increment(): void {
    this.count++;
    this.enthusiasm++;
  }
  decrement(): void {
    this.count--;
    if (this.enthusiasm > 1) {
      this.enthusiasm--;
    }
  }

  get exclamationMarks(): string {
    return Array(this.enthusiasm + 1).join("!");
  }
}
</script>

<style scoped lang="scss">
.greeting {
  font-size: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
