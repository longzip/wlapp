//This is to ensure that we can see the entirety of the store

export default {
  authorReducer: {
    authors: []
  },

  productsReducer: {
    products: []
  },

  selectedProductReducer: {
    course: undefined
  },

  coursesReducer: {
    courses: []
  },

  selectedCourseReducer: {
    course: undefined
  },

  apiReducer: {
    apiCallsInProgress: 0
  }
};
