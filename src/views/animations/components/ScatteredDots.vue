<template>
  <div class="water-bottle" ref="waterBottle">
    <canvas ref="canvasRef" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue"

// 定义属性
const props = defineProps({
  percentage: {
    type: Number,
    default: 80
  }
})

// 初始化 canvas 引用
const waterBottle = ref<HTMLCanvasElement>()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctxRef = ref<CanvasRenderingContext2D | null>(null)
const canvasWidth = ref(100)
const canvasHeight = ref(100)

// 波动相关变量
const angle1 = ref(0)
const angle2 = ref(Math.PI)
const waveHeight = ref(10)
const waveLength = ref(200)
const waveSpeed = ref(0.05)

// 初始化画布
const initCanvas = () => {
  ctxRef.value = canvasRef.value!.getContext("2d")
  drawLiquid()
}

// 绘制液体填充
const drawLiquid = () => {
  if (!ctxRef.value) {
    console.error("Context is null, cannot draw.")
    return
  }

  ctxRef.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value)

  // 绘制外圈
  ctxRef.value.beginPath()
  ctxRef.value.arc(canvasWidth.value / 2, canvasHeight.value / 2, canvasWidth.value / 2, 0, Math.PI * 2)
  ctxRef.value.strokeStyle = "transparent"
  ctxRef.value.lineWidth = 0
  ctxRef.value.stroke()

  ctxRef.value.save()
  ctxRef.value.beginPath()
  ctxRef.value.arc(canvasWidth.value / 2, canvasHeight.value / 2, canvasWidth.value / 2 - 10, 0, Math.PI * 2)
  ctxRef.value.clip()

  const gradient = ctxRef.value.createLinearGradient(0, 0, canvasWidth.value, canvasHeight.value)
  gradient.addColorStop(0, "#1ED6FF")
  gradient.addColorStop(1, "rgba(30, 214, 255, 0.2)")

  // 绘制第一个液态波
  const waveOffset = (1 - props.percentage / 100) * canvasHeight.value

  ctxRef.value.fillStyle = gradient

  ctxRef.value.beginPath()
  ctxRef.value.moveTo(0, canvasHeight.value)

  for (let x = 0; x <= canvasWidth.value; x++) {
    const y = waveOffset + waveHeight.value * Math.sin((x / waveLength.value) * Math.PI * 2 + angle1.value)
    ctxRef.value.lineTo(x, y)
  }

  ctxRef.value.lineTo(canvasWidth.value, canvasHeight.value)
  ctxRef.value.closePath()
  ctxRef.value.fill()

  // 绘制第二个液态波
  ctxRef.value.fillStyle = gradient
  ctxRef.value.beginPath()
  ctxRef.value.moveTo(0, canvasHeight.value)

  for (let x = 0; x <= canvasWidth.value; x++) {
    const y = waveOffset + waveHeight.value * Math.sin((x / waveLength.value) * Math.PI * 2 + angle2.value)
    ctxRef.value.lineTo(x, y)
  }

  ctxRef.value.lineTo(canvasWidth.value, canvasHeight.value)
  ctxRef.value.closePath()
  ctxRef.value.fill()

  ctxRef.value.restore()

  angle1.value += waveSpeed.value
  angle2.value -= waveSpeed.value // 反转第二个波的方向

  requestAnimationFrame(drawLiquid)
}

// 监听 percentage 变化
watch(
  () => props.percentage,
  () => {
    ctxRef.value!.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
    angle1.value = 0
    angle2.value = Math.PI
  }
)

// 页面挂载时初始化画布
onMounted(() => {
  // 获取DOM元素的宽高，并赋值给画布
  canvasWidth.value = waterBottle.value!.clientWidth as number
  canvasHeight.value = waterBottle.value!.clientHeight as number

  nextTick(() => {
    initCanvas()
  })
})
</script>

<style lang="scss" scoped>
.water-bottle {
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
