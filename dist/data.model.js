"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataDefaultModel = void 0;
const mongoose_1 = require("mongoose");
// # scheduler template schema
const DataSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
});
exports.DataDefaultModel = (0, mongoose_1.model)("Data", DataSchema);
//# sourceMappingURL=data.model.js.map