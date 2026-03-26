export interface DataAnakState {
  errors: {
    name?: string[];
    age?: string[];
    weight?: string[];
    height?: string[];
    _form?: string[];
  };
  values: {
    name?: string;
    age?: string;
    ageDetail?: string;
    weight?: string;
    height?: string;
  };
}
