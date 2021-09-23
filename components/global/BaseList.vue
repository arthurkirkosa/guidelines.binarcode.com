<template>
  <div>
    <div v-for="(item, index) in list" :key="index" class="mt-3 flex">
      <span :class="`list-${type}`" class="mt-px mr-3 flex-shrink-0">
        <component :is="iconName" class="h-6 w-6"/>
      </span>
      <span v-html="item"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseList",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'primary',
      validator (value) {
        return ['primary', 'info', 'success', 'warning', 'danger'].includes(value)
      }
    }
  },
  computed: {
    iconName () {
      return this.icon || ({
        primary: 'IconBadgeCheck',
        info: 'IconInformationCircle',
        success: 'IconCheckCircle',
        warning: 'IconExclamationCircle',
        danger: 'IconXCircle'
      })[this.type]
    }
  }
}
</script>

<style scoped>

</style>