export interface RegisterState {
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    _form?: string[];
  };
  values: {
    name?: string;
    email?: string;
    password?: string;
  };
}

export interface LoginState {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
}
