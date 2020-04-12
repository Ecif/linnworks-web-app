<template>
  <div>
    <h1>Create Category</h1>
    <div v-if="error" class="alert alert-danger">Error! {{ error }}</div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.categoryName"
          type="text"
          required
          placeholder="Enter category name"
        ></b-form-input>
      </b-form-group>

      <b-button style="margin-right:5px" type="submit" variant="primary"
        >Submit</b-button
      >
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        categoryName: ''
      },
      error: ''
    }
  },
  methods: {
    onSubmit(evt) {
      this.error = ''
      evt.preventDefault()
      this.$store
        .dispatch('createCategory', this.form.categoryName)
        .then(response => {
          const status = JSON.parse(response.status)
          console.log(status)
          //redirect logic
          if (status == '200') {
            this.$router.push({ name: 'category-list' })
          }
        })
        .catch(error => {
          this.error = error.response.data
        })
    },
    onReset(evt) {
      this.error = ''
      evt.preventDefault()
      this.form.categoryName = ''
    }
  }
}
</script>

<style></style>
