<script>
import useKeydown from "../composables/use-keydown";
export default {
  name: "ModalView",
  setup(props, {emit}) {
    useKeydown([{key: 'Escape', fn: () => {emit('closeModal')}}])

    return {
      emit
    }

  }
}
</script>

<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')">
      <div class="modal-card">
        <slot />
      </div>
    </div>

  </div>

</template>


