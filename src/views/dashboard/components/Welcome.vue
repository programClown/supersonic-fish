<template>
  <div class="app-container center">
    <!-- <el-image :src="srcImg" /> -->
    <div ref="graphContainer" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script lang="ts" setup>
import srcImg from "@/assets/layouts/logo.png"
import { onMounted, onUnmounted, ref } from "vue"
import * as echarts from "echarts"
import "echarts-gl"

const graphContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  drawOnCanvas()
})

onUnmounted(() => {
  if (myChart) {
    myChart.dispose()
  }
})

interface Node {
  x: number
  y: number
  value: number
}

interface Edge {
  source: number
  target: number
  value: number
}
function createNodes(widthCount, heightCount) {
  var nodes: Node[] = []
  for (var i = 0; i < widthCount; i++) {
    for (var j = 0; j < heightCount; j++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        value: 1
      })
    }
  }
  return nodes
}
function createEdges(widthCount, heightCount) {
  var edges: Edge[] = []
  for (var i = 0; i < widthCount; i++) {
    for (var j = 0; j < heightCount; j++) {
      if (i < widthCount - 1) {
        edges.push({
          source: i + j * widthCount,
          target: i + 1 + j * widthCount,
          value: 1
        })
      }
      if (j < heightCount - 1) {
        edges.push({
          source: i + j * widthCount,
          target: i + (j + 1) * widthCount,
          value: 1
        })
      }
    }
  }
  return edges
}
var nodes = createNodes(50, 50)
var edges = createEdges(50, 50)
let myChart: echarts.ECharts | null = null

const drawOnCanvas = () => {
  if (graphContainer.value) {
    // 初始化 ECharts 实例
    myChart = echarts.init(graphContainer.value)

    // 配置 ECharts 选项
    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}"
      },
      series: [
        {
          type: "graphGL",
          nodes: nodes,
          edges: edges,
          itemStyle: {
            color: "rgba(255,255,255,0.8)"
          },
          lineStyle: {
            color: "rgba(255,255,255,0.8)",
            width: 3
          },
          forceAtlas2: {
            steps: 5,
            jitterTolerence: 10,
            edgeWeightInfluence: 4
          }
        }
      ]
    }

    // 使用配置项显示图表
    myChart.setOption(option)
  }
}
</script>

<style lang="scss" scoped>
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
