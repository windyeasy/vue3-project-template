<script setup>
import { BaseEchart } from "@/base-ui/page-echarts/index"
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};
</script>

<template>
  <div>
    <base-echart :option="option"/>
  </div>
</template>

<style lang="scss" scoped></style>
