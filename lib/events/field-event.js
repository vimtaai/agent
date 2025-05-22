import { Validator } from "../utils/validator.js";

export class FieldEvent extends Event {
  constructor(type, field) {
    Validator.validateField(field);

    super(type);
    this.field = field;
  }
}
