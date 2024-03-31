import * as AuthSchema from "./auth";
import * as UtilSchema from "./utilSchema";

export * from "./auth";
export * from "./utilSchema";
export { AuthSchema, UtilSchema };
export default { ...AuthSchema, ...UtilSchema };
