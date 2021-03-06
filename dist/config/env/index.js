"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = exports.tokenKey = exports.port = void 0;
const celebrate_1 = require("celebrate");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const envVarsSchema = celebrate_1.Joi.object({
    PORT: celebrate_1.Joi.number().default(4000),
    MONGO_URI: celebrate_1.Joi.string(),
    TOKEN_KEY: celebrate_1.Joi.string()
        .required()
        .description('JWT KEY required to sign in')
}).unknown().required();
const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.port = envVars.PORT;
exports.tokenKey = envVars.TOKEN_KEY;
exports.mongo = {
    host: envVars.MONGO_URI
};
//# sourceMappingURL=index.js.map