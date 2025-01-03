import { ref } from "vue"

interface AnimationList {
  aniName: string
}

/** 动画列表 */
const animationList: AnimationList[] = [
  {
    aniName: "ScatteredDots"
  },
  {
    aniName: "SierpinskiLoop"
  }
]

const activeAnimationName = ref(animationList[0].aniName)

/** 主题 hook */
export function useAnimations() {
  return { animationList, activeAnimationName }
}
