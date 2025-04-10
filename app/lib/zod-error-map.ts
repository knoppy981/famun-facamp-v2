import { z, ZodIssueCode } from "zod";
import { mapLabel } from './utils'

z.setErrorMap((issue, ctx) => {
  let message: string;
  const { value: labelValue, end: labelEnd } = mapLabel(issue.path[0] as string)

  /* console.log(issue)
  console.log(labelValue, labelEnd) */

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      message = `${labelValue} inválid${labelEnd}`;
      break;
    case ZodIssueCode.invalid_date:
      message = `${labelValue} inválid${labelEnd}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `${labelValue} inválid${labelEnd}`;
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "number") {
        message = `${labelValue} deve ser maior que ${issue.minimum}`;
      } else {
        if (issue.minimum === 1) {
          message = `${labelValue} inválid${labelEnd}`;
        } else {
          message = `${labelValue} deve ter no mínimo ${issue.minimum} caracteres`;
        }
      }
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "number") {
        message = `${labelValue} deve ser menor que ${issue.maximum}`;
      } else {
        message = `${labelValue} deve ter no máximo ${issue.maximum} caracteres`;
      }
      break;
    case ZodIssueCode.invalid_string:
      if (issue.validation === "email") {
        message = "E-mail inválido";
      } else {
        // In case of other invalid string validations, fallback to default error or a custom string.
        message = ctx.defaultError ?? "Invalido";
      }
      break;
    default:
      message = ctx.defaultError ?? "Invalido";
      break;
  }

  return { message };
});
