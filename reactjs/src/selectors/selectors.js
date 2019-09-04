export const authorsFormattedForDropdown = authors => {
  if (!authors) {
    return;
  }

  return authors.map(author => {
    return {
      value: author.id,
      text: `${author.firstName} ${author.lastName}`
    };
  });
};

export const productCategoriesFormattedForDropdown = productCategories => {
  if (!productCategories) {
    return;
  }

  return productCategories.map(productCategory => {
    return {
      value: productCategory.id,
      text: `${productCategory.name}`
    };
  });
};
