const templates = {
  required: `This is required`,
  spaces: `This cannot contain only space(s)`,
  alphaNumeric: `This can only be alphanumeric inclusive of spaces and -`,
  maxLength: (length) =>
    `This cannot exceed ${length} characters including spaces`,
  minLength: (length) => `This must be at least be ${length} characters`,
  email: `This is not a valid email address`,
};

const regex = {
  spaces: /^[\s]*$/,
  alphaNumeric: /^[A-Za-zÀ-ȕ0-9\s-]*$/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};

const loginValidator = ({ login, password }) => {
  const messages = {};

  if (!login) {
    messages.login = templates.required;
  } else if (regex.spaces.test(login)) {
    messages.login = templates.spaces;
  } else if (login.includes("@")) {
    if (!regex.email.test(login)) messages.login = templates.email;
    if (login.length > 320) messages.login = templates.maxLength(320);
  }

  if (!password) {
    messages.password = templates.required;
  } else if (regex.spaces.test(password)) {
    messages.password = templates.spaces;
  }

  return messages;
};

export { templates, regex, loginValidator };
