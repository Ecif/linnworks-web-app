import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:44333'
})

export default {
  getCategories(authToken) {
    console.log(authToken)
    return apiClient.get('/api/getCategories', {
      headers: {
        Authorization: authToken
      }
    })
  },
  getCategoriesWithProductCount(authToken) {
    return apiClient.get('/api/CategoriesWithProductCount', {
      headers: {
        Authorization: authToken
      }
    })
  },
  updateCategory(category, authToken) {
    return apiClient.post('/api/UpdateCategory', category, {
      headers: {
        Authorization: authToken
      }
    })
  },
  deleteCategory(categoryId, authToken) {
    return apiClient.post(
      '/api/DeleteCategory',
      { categoryId: categoryId },
      {
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    )
  },
  createCategory(name, authToken) {
    return apiClient.post(
      'api/CreateCategory',
      { categoryName: name },
      {
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    )
  }
}
