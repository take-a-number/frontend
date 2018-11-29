// Adapted from https://stackoverflow.com/a/49826736
const formDataToJSON = (formData: FormData): string => {
  const json = {};
  formData.forEach((value, key) => {
    // Check if property already exists
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      let current = json[key];
      if (!Array.isArray(current)) {
        // If it's not an array, convert it to an array.
        current = json[key] = [current];
      }
      current.push(value); // Add the new value to the array.
    } else {
      json[key] = value;
    }
  });
  return JSON.stringify(json);
};

export { formDataToJSON };
