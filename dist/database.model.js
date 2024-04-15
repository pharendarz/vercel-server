"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseDefault = void 0;
class DatabaseDefault {
    constructor(databaseModel) {
        this.databaseModel = databaseModel;
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!("userId" in data)) {
                    throw new Error("User Id not provided in record!");
                }
                console.log("[create] data:", data);
                console.log("[create] model:", this.databaseModel);
                this.databaseModel.create(Object.assign({}, data), (err, payload) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(payload);
                });
            });
        });
    }
}
exports.DatabaseDefault = DatabaseDefault;
//# sourceMappingURL=database.model.js.map