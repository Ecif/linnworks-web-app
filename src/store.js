import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/AuthorizationTokenService.js'
import CategoryService from '@/services/CategoryService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorizationToken: null,
    categories: []
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loadingStatus = status
    },
    SET_AUTH_TOKEN(state, token) {
      state.authorizationToken = token
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    REMOVE_CATEGORY(state, categoryId) {
      const categoriesTemp = [...state.categories]
      const index = categoriesTemp.find(x => x.categoryId === categoryId)
      categoriesTemp.splice(index)
      state.categories = categoriesTemp
    }
  },
  actions: {
    getAuthToken(context) {
      return new Promise((resolve, reject) => {
        AuthService.getAuthToken()
          .then(response => {
            context.commit('SET_AUTH_TOKEN', response.data.Token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchCategories(context) {
      return CategoryService.getCategoriesWithProductCount(
        context.state.authorizationToken
      ).then(response => {
        context.commit('SET_CATEGORIES', response.data)
      })
    },
    updateCategory(context, category) {
      return CategoryService.updateCategory(
        category,
        context.state.authorizationToken
      )
    },
    deleteCategory(context, categoryId) {
      return CategoryService.deleteCategory(
        categoryId,
        context.state.authorizationToken
      )
    },
    createCategory(context, categoryName) {
      return CategoryService.createCategory(
        categoryName,
        context.state.authorizationToken
      )
    }
  },
  modules: {},
  getters: {
    getCategories(state) {
      return state.categories
    },
    getAuthToken(state) {
      return state.authorizationToken
    }
  }
})
