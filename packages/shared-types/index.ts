import * as AuthSchema from "./auth";
import * as NotesSchema from "./notes";
import * as FoldersSchema from "./folders";
import * as UtilSchema from "./utilSchema";
import * as SharedSchema from "./shared";

export * from "./auth";
export * from "./notes";
export * from "./folders";
export * from "./utilSchema";
export * from "./shared";
export { AuthSchema, UtilSchema, NotesSchema, FoldersSchema, SharedSchema };
export default { ...AuthSchema, ...UtilSchema, ...NotesSchema, ...FoldersSchema, ...SharedSchema };
