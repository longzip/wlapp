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
      label: `${product.name}`,
      uom: product.uom
    };
  });
};

export const routingsFormattedForDropdown = routings => {
  if (!routings) {
    return;
  }

  return routings.map(routing => {
    return {
      value: routing.id,
      label: `${routing.name}`
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

export const bomsFormattedForDropdown = boms => {
  if (!boms) {
    return;
  }

  return boms.map(bom => {
    return {
      value: bom.id,
      label: `${bom.name}`
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
