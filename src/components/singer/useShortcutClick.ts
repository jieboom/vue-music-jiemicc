import { Ref, ref } from 'vue'
export type HandleShortcutClick = (title:string, index:number) => void;
export default function useShortcutClick (emit:(event: 'onShortcutClick', ...args: any[]) => void):{
    activeGroupTitle:Ref<string>;
    handleShortcutClick:HandleShortcutClick
    changeActiveGroupTitle:(title:string) => void;
} {
  const activeGroupTitle = ref('')
  function changeActiveGroupTitle (title:string) {
    activeGroupTitle.value = title
  }
  function handleShortcutClick (title:string, index:number) {
    changeActiveGroupTitle(title)
    emit('onShortcutClick', index)
  }
  return {
    activeGroupTitle,
    handleShortcutClick,
    changeActiveGroupTitle
  }
}
