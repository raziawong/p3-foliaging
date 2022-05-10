const templates = {
  required: `This is required`,
  spaces: `This cannot contain only space(s)`,
  alphaNumeric: `This can only be alphanumeric inclusive of '-' and/or '_'`,
  maxLength: (length) => `This cannot exceed ${length} characters`,
  minLength: (length) => `This must be at least be ${length} characters`,
  email: `This is not a valid email address`,
  passwordStrength: `Password must be at least 8 characters long and contain at least 1 symbol, 1 uppercase, 1 lowercase and 1 number`,
  passwordMatch: `Password does not match`,
};

const regex = {
  spaces: /^[\s]*$/,
  alphaNumeric: /^[A-Za-zÀ-ȕ0-9\-_]*$/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
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

const registerValidator = ({ username, email, password, confirm_password }) => {
  const messages = {};

  if (!username) {
    messages.username = templates.required;
  } else if (regex.spaces.test(username)) {
    messages.username = templates.spaces;
  } else if (username.length > 20) {
    messages.username = templates.maxLength(20);
  }

  if (!email) {
    messages.email = templates.required;
  } else if (regex.spaces.test(email)) {
    messages.email = templates.spaces;
  } else if (!regex.email.test(email)) {
    messages.email = templates.email;
  } else if (email.length > 320) {
    messages.email = templates.maxLength(320);
  }

  if (!password) {
    messages.password = templates.required;
  } else if (regex.spaces.test(password)) {
    messages.password = templates.spaces;
  } else if (!regex.password.test(password)) {
    messages.password = templates.passwordStrength;
  } else if (password !== confirm_password) {
    messages.confirm_password = templates.passwordMatch;
  }

  if (!confirm_password) {
    messages.confirm_password = templates.required;
  }

  return messages;
};

export { templates, regex, loginValidator, registerValidator };
