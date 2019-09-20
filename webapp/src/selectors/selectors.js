export const authorsFormattedForDropdown = authors => {
  if (!authors) {
    return;
  }

  return authors.map(author => {
    return {
      value: author.id,
      label: `${author.firstName} ${author.lastName}`
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

export const productsFormattedForDropdown = products => {
  if (!products) {
    return;
  }

  return products.map(product => {
    return {
      value: product.id,
      label: `${product.name}`
    };
  });
};

export const uomsFormattedForDropdown = uoms => {
  if (!uoms) {
    return;
  }

  return uoms.map(uom => {
    return {
      value: uom.name,
      label: `${uom.name}`
    };
  });
};

export const contactsFormattedForDropdown = contacts => {
  if (!contacts) {
    return;
  }
  return contacts.map(contact => {
    return {
      value: contact.id,
      label: `${contact.name}-${contact.description}`
    };
  });
};
