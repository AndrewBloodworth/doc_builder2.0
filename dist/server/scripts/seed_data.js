"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    users_data: [
        {
            fullName: "Leon Ramirez",
            email: "leon@docs.com",
            password: "12345678",
        },
        {
            fullName: "Mike Marino",
            email: "mike@docs.com",
            password: "12345678",
        },
        {
            fullName: "John Smith",
            email: "john@docs.com",
            password: "12345678",
        },
        {
            fullName: "Mary Jane",
            email: "mary@docs.com",
            password: "12345678",
        },
    ],
    spaces_data: [{ type: "Private" }, { type: "Private" }, { type: "Shared" }],
    property_data: [
        {
            streetNumber: "1233",
            streetName: "Elm St.",
            city: "Denver",
            state: "CO",
            zip: "801227",
        },
    ],
    templates_data: [
        { name: "co_cbs_residential_2022", inputs: require("./templates_1.json") },
        {
            name: "co_cbs_residential_2022_full",
            inputs: require("./templates_2.json"),
        },
    ],
};
