import delay from "./delay";

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const products = [];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = course => {
  return replaceAll(course.title, " ", "-");
};

class ProductApi {
  static getAll() {
    console.log("get all product")
    let product = new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], products));
      }, delay);
    });
    console.log(product);
    return product;
  }

  static save(course) {
    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          const existingCourseIndex = products.findIndex(
            a => a.id === course.id
          );
          products.splice(existingCourseIndex, 1, course);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new products in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/products/${course.id}`;
          products.push(course);
        }

        resolve(course);
      }, delay);
    });
  }

  static delete(courseId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const indexOfCourseToDelete = products.findIndex(
          course => course.id === courseId
        );
        products.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }

  static get(courseId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const existingCourseIndex = products.findIndex(
          course => course.id === courseId
        );

        const courseFound = Object.assign({}, products[existingCourseIndex]);

        resolve(courseFound);
      }, delay);
    });
  }
}

export default ProductApi;
