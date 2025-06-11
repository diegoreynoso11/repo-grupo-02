const validateProduct = (body, isPartial = false) => {
  const errors = [];

  if (!isPartial || "name" in body) {
    if (body.name === undefined) {
      errors.push("'name' is required");
    } else if (typeof body.name !== "string") {
      errors.push("'name' must be a string");
    } else {
      if (body.name.length < 4) {
        errors.push("'name' must be at least 4 characters long");
      }

      if (body.name.length > 100) {
        errors.push("'name' must be at most 45 characters long");
      }
    }
  }

  if (!isPartial || "description" in body) {
    if (body.description === undefined) {
      errors.push("'description' is required");
    } else if (typeof body.description !== "string") {
      errors.push("'description' must be a string");
    } else {
      if (body.description.length < 5) {
        errors.push("'description' must be at least 10 characters long");
      }

      if (body.description.length > 255) {
        errors.push("'description' must be at most 255 characters long");
      }
    }
  }

  return errors;
};

module.exports = { validateProduct };
