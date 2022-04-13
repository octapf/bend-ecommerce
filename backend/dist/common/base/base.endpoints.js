"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = void 0;
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
})(Endpoints = exports.Endpoints || (exports.Endpoints = {}));
//# sourceMappingURL=base.endpoints.js.map