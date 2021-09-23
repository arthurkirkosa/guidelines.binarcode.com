<template>
<span
    class="inline-flex items-center px-3 py-1 leading-5 rounded-full text-base tracking-tight"
    :class="{
      'bg-primary-100 dark:bg-primary-900 text-primary-500': type === 'primary',
      'bg-red-100 dark:bg-red-900 text-red-500': type === 'danger',
    }">

  <slot></slot>
</span>
</template>

<script>
export default {
  name: "BaseBadge",
  props: {
    type: {
      type: String,
      default: 'primary', // danger| primary
    }
  }
}
</script>

<style scoped>

</style>