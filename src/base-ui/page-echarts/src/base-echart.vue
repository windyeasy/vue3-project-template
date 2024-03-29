<script lang="ts" setup>
import * as echarts from "echarts";

const props = defineProps({
  option: {
    type: Object,
    default: () => ({}),
  },
  height: {
    type: [Number, String],
    default: 300,
  },
});
const echartHeight = computed(() => {
  const height =
    typeof props.height === "number" ? props.height + "px" : props.height;
  return height;
});

const chartRef = ref();
const echartsInstanceRef = ref();
// 初始化
onMounted(() => {
  const echartsInstance = echarts.init(chartRef.value, "light", {
    renderer: "canvas",
  });
  echartsInstanceRef.value = echartsInstance;
  watchEffect(() => {
    echartsInstance.setOption(props.option);
  });

  window.addEventListener("resize", () => {
    echartsInstance.resize();
  });
});
const eventOffMap = {};
const eventOnMap = {};

// 添加移除事件
function addOffFns() {
  const offKeys = Object.keys(eventOffMap);
  for (const key of offKeys) {
    for (const fn of eventOffMap[key]) {
      echartsInstanceRef.value.off(key, fn);
    }
  }
}
// 添加事件监听
function addOnFns() {
  const offKeys = Object.keys(eventOnMap);
  for (const key of offKeys) {
    for (const fn of eventOnMap[key]) {
      echartsInstanceRef.value.on(key, fn);
    }
  }
}
// 监测echarts渲染完成后添加事件的监听与移除
watchEffect(() => {
  if (echartsInstanceRef.value) {
    addOffFns();
    addOnFns();
  }
});
// 抛出事件监听与移除方法
defineExpose({
  echartsInstanceRef,
  off(keyName, fn) {
    if (!eventOffMap[keyName]) {
      eventOffMap[keyName] = [];
      eventOffMap[keyName].push(fn);
    } else {
      eventOffMap[keyName].push(fn);
    }
  },
  on(keyName, fn) {
    if (!eventOnMap[keyName]) {
      eventOnMap[keyName] = [];
      eventOnMap[keyName].push(fn);
    } else {
      eventOnMap[keyName].push(fn);
    }
  },
});
</script>

<template>
  <div class="echart" ref="chartRef" :style="{ height: echartHeight }"></div>
</template>
