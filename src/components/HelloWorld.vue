<template>
  <div>{{ newObj.a }}{{ newObj.b }}</div>
</template>

<script>
export default {
  props: ['obj'],
  data() {
    return {

    }
  },
  computed: {
    newObj() {
      return this.obj
    }
  }
}

</script>