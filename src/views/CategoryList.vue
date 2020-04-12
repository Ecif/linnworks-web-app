<template>
  <!-- prettier-ignore -->
  <div>
    <h2>Category listing</h2>

    <b-container>
      <b-col lg="12" class="my-4">
        <b-alert v-model="isUpdateFailed" variant="danger" dismissible>
          Failed to update ! Please try again later. 
        </b-alert>
      </b-col>
    
      <b-col lg="12" class="my-4">
        <b-alert v-model="showCategoriesAlert" variant="danger" dismissible>
          Failed to get categories ! Please try again later.  
        </b-alert>
        <!-- <div v-if="!getCategoriesSuccess" class="alert alert-danger">
          
        </div> -->
      </b-col>
  
      <b-col lg="12" class="my-4">
        <b-alert
          :show="dismissCountDownForUpdate"
          dismissible
          variant="success"
          @dismissed="dismissCountDownForUpdate=0"
          @dismiss-count-down="countDownChanged"
        >Successfully updated '{{ latestUpdatedName }}'!</b-alert>
      </b-col>

      <b-col lg="12" class="my-4">
        <b-alert
          :show="dismissCountDownForDelete"
          dismissible
          variant="warning"
          @dismissed="dismissCountDownForDelete=0"
          @dismiss-count-down="countDownChangedForDeleted"
        >Successfully deleted '{{ latestUpdatedName }}'!</b-alert>
      </b-col>
    </b-container>
   

    <b-container>
      <b-col lg="12" class="my-4">
        <b-row>
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append> 
            </b-input-group>
          </b-form-group>
        </b-row>
      </b-col>

      <b-table
        id="my-table"
          :busy.sync="isBusy"
          :items="categories"
          :fields="fields"
          hover
          primary-key="CategoryId"
          small
          class="text-center"
          :filter="filter"
          >

        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>

        <template v-slot:cell(CategoryName)="row">
          <b-form-input  type="text" v-model="row.item.CategoryName" />
        </template>

        <template v-slot:cell(update)="row">
          <b-button @click="updateName(row.item)" variant="success">
            <b-icon-hammer></b-icon-hammer>
          </b-button>
        </template>

        <template v-slot:cell(delete)="row">
          <b-button @click="deleteCategory(row.item)" variant="warning">
            <b-icon-trash></b-icon-trash>
          </b-button>
        </template>

      </b-table>
      
    </b-container>
    
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
          key: 'update',
          label: 'Update',
          sortable: false
        },
        {
          key: 'delete',
          label: 'Delete',
          sortable: false
        }
      ],
      sortKey: '',
      reverse: false,
      isUpdateFailed: false,
      showCategoriesAlert: false,
      dismissCountDownForUpdate: 0,
      dismissCountDownForDelete: 0,
      latestUpdatedName: '',
      isBusy: false,
      filter: null
    }
  },
  methods: {
    updateName(categoryObject) {
      this.isUpdateFailed = false
      this.isBusy = true
      console.log(categoryObject)
      this.$store
        .dispatch('updateCategory', categoryObject)
        .then(() => {
          this.latestUpdatedName = categoryObject.CategoryName
          this.dismissCountDownForUpdate = 5
          this.isBusy = false
        })
        .catch(() => {
          this.isUpdateFailed = true
          this.isBusy = false
        })
    },
    deleteCategory(categoryObject) {
      this.isUpdateFailed = false
      this.isBusy = true

      this.$store
        .dispatch('deleteCategory', categoryObject.CategoryId)
        .then(() => {
          this.latestUpdatedName = categoryObject.CategoryName
          this.dismissCountDownForDelete = 5
          this.$store
            .dispatch('fetchCategories')
            .then(() => {
              this.showCategoriesAlert = false
              this.isBusy = false
            })
            .catch(() => {
              this.showCategoriesAlert = true
              this.isBusy = false
            })
        })
        .catch(() => {
          this.isUpdateFailed = true
          this.isBusy = false
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
    this.isBusy = true
    if (!this.authToken) {
      this.$store.dispatch('getAuthToken').then(() => {
        this.$store
          .dispatch('fetchCategories')
          .then(() => (this.isBusy = false))
          .catch(() => {
            this.showCategoriesAlert = true
            this.isBusy = false
          })
      })
    } else {
      this.$store
        .dispatch('fetchCategories')
        .then(() => (this.isBusy = false))
        .catch(() => {
          this.showCategoriesAlert = true
          this.isBusy = false
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
.margin-spacing {
  margin-bottom: 10px;
}
</style>
