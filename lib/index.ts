import { SendMailOptions } from "./interfaces";

export * from "./module";
export * from "./service";
export * from "./mailman";
export * from "./interfaces";
export * from "./message";

/** Has to be exported separately since we want local SendMailOptions to take priority */
export { SendMailOptions };
export * from "nodemailer";
