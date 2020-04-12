<template>
  <!-- prettier-ignore -->
  <div>
    <h2>Category listing</h2>

    <div v-if="!updateSuccess" class="alert alert-danger">Failed to update ! Please try again later.</div>
    <div
      v-if="!getCategoriesSuccess"
      class="alert alert-danger"
    >Failed to get categories ! Please try again later.</div>
    <div>
      <b-alert
        :show="dismissCountDownForUpdate"
        dismissible
        variant="success"
        @dismissed="dismissCountDownForUpdate=0"
        @dismiss-count-down="countDownChanged"
      >Successfully updated '{{ latestUpdatedName }}'!</b-alert>
    </div>

    <div>
      <b-alert
        :show="dismissCountDownForDelete"
        dismissible
        variant="warning"
        @dismissed="dismissCountDownForDelete=0"
        @dismiss-count-down="countDownChangedForDeleted"
      >Successfully deleted '{{ latestUpdatedName }}'!</b-alert>
    </div>

    <b-table-simple hover small caption-top responsive>
      <b-thead>
        <b-tr>
          <b-th>Name</b-th>
          <b-th>Product Count</b-th>
          <b-th></b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="category in categories" :key="category.CategoryId">
          <b-td>
            <b-form-input type="text" v-model="category.CategoryName" />
          </b-td>
          <b-td>{{ category.ProductCount }}</b-td>
          <b-td>
            <b-button @click="updateName(category)" variant="success">
              <b-icon-hammer></b-icon-hammer>
            </b-button>
          </b-td>
          <b-td>
            <b-button @click="deleteCategory(category)" variant="success">
              <b-icon-trash></b-icon-trash>
            </b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
// import CategoryCard from '@/components/CategoryCard.vue'

export default {
  data() {
    return {
      fields: [
        {
          key: 'CategoryName',
          sortable: true
        },
        {
          key: 'ProductCount',
          sortable: true
        },
        {
          key: 'delete',
          label: '',
          sortable: false
        },
        {
          key: 'update',
          label: '',
          sortable: false
        }
      ],
      sortKey: '',
      reverse: false,
      updateSuccess: true,
      getCategoriesSuccess: true,
      dismissCountDownForUpdate: 0,
      dismissCountDownForDelete: 0,
      latestUpdatedName: ''
    }
  },
  methods: {
    updateName(categoryObject) {
      this.updateSuccess = true
      this.$store
        .dispatch('updateCategory', categoryObject)
        .then(() => {
          this.latestUpdatedName = categoryObject.CategoryName
          this.dismissCountDownForUpdate = 5
        })
        .catch(() => {
          this.updateSuccess = false
        })
    },
    deleteCategory(categoryObject) {
      this.updateSuccess = true
      this.$store
        .dispatch('deleteCategory', categoryObject.CategoryId)
        .then(() => {
          this.latestUpdatedName = categoryObject.CategoryName
          this.dismissCountDownForDelete = 5
          this.$store
            .dispatch('fetchCategories')
            .then(() => {
              this.getCategoriesSuccess = true
            })
            .catch(() => {
              this.getCategoriesSuccess = false
            })
        })
        .catch(() => {
          this.updateSuccess = false
        })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDownForUpdate = dismissCountDown
    },
    countDownChangedForDeleted(dismissCountDown) {
      this.dismissCountDownForDelete = dismissCountDown
    }
  },
  components: {
    // CategoryCard
  },
  created() {
    if (!this.authToken) {
      this.$store.dispatch('getAuthToken').then(() => {
        this.$store.dispatch('fetchCategories').catch(() => {
          this.getCategoriesSuccess = false
        })
      })
    } else {
      this.$store.dispatch('fetchCategories').catch(() => {
        this.getCategoriesSuccess = false
      })
    }
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories
    },
    authToken() {
      return this.$store.getters.getAuthToken
    }
  }
}
</script>

<style>
.category:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
</style>
