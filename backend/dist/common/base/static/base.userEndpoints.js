"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = void 0;
/**
 * ! Define User endpoints
 * * octapf - 06/04/2022
 */
var Endpoints;
(function (Endpoints) {
    Endpoints["home"] = "/";
    Endpoints["signin"] = "/signin";
    Endpoints["signup"] = "/signup";
    Endpoints["users"] = "/users";
    Endpoints["userById"] = "/users/:id";
    Endpoints["userFirstName"] = "/users/:id/firstName";
    Endpoints["userLastName"] = "/users/:id/lastName";
    Endpoints["userPassword"] = "/users/:id/password";
    Endpoints["userEmail"] = "/users/:id/email";
    Endpoints["username"] = "/users/:id/username";
    Endpoints["validateUsername"] = "/users/validateUsername";
    Endpoints["validateUserEmail"] = "/users/validateUserEmail";
})(Endpoints = exports.Endpoints || (exports.Endpoints = {}));
//# sourceMappingURL=base.userEndpoints.js.map