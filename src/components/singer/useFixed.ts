// useFixed 用以固定歌手组标题   需要根据用户滚动展示当前的标题
// 当前标题计算通过当前滚动竖向偏移值 来判断 所处歌手组的标题数组位置

// 1. 计算当前歌手组的高度集合  2. 滚动时计算滚动值与高度集合的关系 判断置顶标题的所处状态
import { SingerGroupList } from '@/service/singer'
import { reactive, Ref, ref, UnwrapNestedRefs, watch } from 'vue'
interface FiexedTitleStyle {top:number;isShow:boolean}
export default function useFixed (singerGroupList: Ref<SingerGroupList>, emit:(event: 'fixedTitleChange', ...args: any[]) => void): { singerListRef: Ref<HTMLDivElement | undefined>, fixedTitle: Ref<string>, handleScroll: (position: { y: number }) => void, scrollY:Ref<number>, fixedTitleStyle:UnwrapNestedRefs<FiexedTitleStyle>, groupHeightList:Ref<number[]> } {
  const singerListRef = ref<HTMLDivElement>()
  const fixedTitle = ref('')
  const groupHeightList = ref<number[]>([])
  const scrollY = ref<number>(0)
  const fixedTitleStyle = reactive<FiexedTitleStyle>({
    top: 0,
    isShow: true
  })
  const handleScroll = (position: { y: number }) => {
    scrollY.value = -position.y
  }

  // 监听歌手数据渲染后,获取歌手组渲染高度
  watch(singerGroupList, List => {
    if (List.length) {
      groupHeightList.value = calcaulateGroupHeight(singerListRef.value?.children as HTMLCollection)
      fixedTitle.value = singerGroupList.value[0].title
    }
  }, {
    flush: 'post'
  })

  // 监听歌手列表滚动后,设置置顶标题 (标题内容 和 标题定位)
  watch(scrollY, offset => {
    if (offset <= 0) {
      fixedTitleStyle.isShow = false
      return
    }
    fixedTitleStyle.isShow = true
    const length = groupHeightList.value.length
    let currentTitleIndex = 0

    // 标题内容
    for (let i = 0; i < length - 1; i++) {
      if (offset >= groupHeightList.value[i] && ((offset < groupHeightList.value[i + 1]) || (i + 1 === length))) {
        if (fixedTitle.value !== singerGroupList.value[i].title) {
          emit('fixedTitleChange', singerGroupList.value[i].title)
        }
        fixedTitle.value = singerGroupList.value[i].title
        currentTitleIndex = i
      }
    }
    // 标题定位
    if (groupHeightList.value[currentTitleIndex + 1] - offset < 30) {
      fixedTitleStyle.top = groupHeightList.value[currentTitleIndex + 1] - offset - 30
    } else {
      fixedTitleStyle.top = 0
    }
  })
  return { singerListRef, fixedTitle, handleScroll, scrollY, fixedTitleStyle, groupHeightList }
}

const calcaulateGroupHeight = (singerList: HTMLCollection): number[] => {
  let height = 0
  const groupHeightList: number[] = []
  groupHeightList.push(height)
  for (let index = 0; index < singerList.length; index++) {
    const singerGroup = singerList[index]
    height += singerGroup.clientHeight
    groupHeightList.push(height)
  }
  return groupHeightList
}
