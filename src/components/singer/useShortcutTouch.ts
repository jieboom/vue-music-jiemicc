import { Ref, ref, watch } from 'vue'
import { HandleShortcutClick } from './useShortcutClick'

export default function useShortcutTouch (singerGroupTitle: Ref<string[]>, handleShortcutClick:HandleShortcutClick, activeGroupTitle:string):{
    handleTouch: (e:TouchEvent) => void;
    shortcutRef:Ref< HTMLDivElement |undefined>
} {
  const shortcutRef = ref< HTMLDivElement >()
  const shortcutItemTop = ref<number[]>([])

  watch(singerGroupTitle, () => {
    const shortcutItems = shortcutRef.value?.children as HTMLCollection
    Array.from(shortcutItems).forEach((shortcutItem, index) => {
      shortcutItemTop.value.push(shortcutItem.getBoundingClientRect().top)
      if (index === shortcutItems.length - 1) {
        shortcutItemTop.value.push(shortcutItem.getBoundingClientRect().bottom)
      }
    })
  }, {
    flush: 'post'
  })

  function handleTouch (e:TouchEvent) {
    e.preventDefault()
    for (let i = 0; i < shortcutItemTop.value.length - 1; i++) {
      const currentTop = shortcutItemTop.value[i]
      const nextTop = shortcutItemTop.value[i + 1]
      const touchTop = e.touches[0].clientY
      if (touchTop >= currentTop && touchTop < nextTop) {
        if (activeGroupTitle !== singerGroupTitle.value[i]) {
          handleShortcutClick(singerGroupTitle.value[i], i)
        }
        return
      }
    }
  }

  return {
    handleTouch,
    shortcutRef
  }
}
