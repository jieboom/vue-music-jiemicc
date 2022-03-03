export const addClass = (el:HTMLElement, className:string):void => {
  if (el.classList.contains(className)) return
  el.classList.add(className)
}
export const removeClass = (el:HTMLElement, className:string):void => {
  if (!el.classList.contains(className)) return
  el.classList.remove(className)
}
