
import {onBeforeUnmount} from "vue";
let useKeydown = (keyCombos) => {
  let onKeydown = (e) => {

    let kc = keyCombos.find(kc => kc.key === e.key)
    if(kc) {
      kc.fn()
    }
  }
  window.addEventListener("keydown", e => onKeydown)

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown)
  })
}

export default useKeydown
