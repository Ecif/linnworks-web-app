<template>
  <div>
    <h1>Create Category</h1>
    <b-container>
      <b-col lg="12" class="my-4">
        <b-alert
          :show="dismissCountDown"
          dismissible
          variant="danger"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
          >{{ error }}</b-alert
        >
        <!-- <div v-if="error" class="alert alert-danger">Error! </div> -->
      </b-col>

      <b-col lg="12" class="my-4">
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <b-form-group id="input-group-1" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.categoryName"
              type="text"
              required
              placeholder="Enter category name"
            ></b-form-input>
          </b-form-group>

          <b-button
            :disabled="disabled"
            class="mr-1"
            type="submit"
            variant="success"
          >
            Submit
          </b-button>
          <b-button type="reset" variant="warning">Reset</b-button>
        </b-form>
      </b-col>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        categoryName: ''
      },
      error: '',
      dismissCountDown: 0,
      disabled: false
    }
  },
  methods: {
    onSubmit() {
      this.error = ''
      this.disabled = true
      this.$store
        .dispatch('createCategory', this.form.categoryName)
        .then(response => {
          this.disabled = false
          const status = JSON.parse(response.status)
          console.log(status)
          //redirect logic
          if (status == '200') {
            this.$router.push({ name: 'category-list' })
          }
        })
        .catch(error => {
          this.disabled = false
          this.dismissCountDown = 5
          this.error = error
        })
    },
    onReset() {
      this.error = ''
      this.form.categoryName = ''
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
}
</script>

<style></style>
