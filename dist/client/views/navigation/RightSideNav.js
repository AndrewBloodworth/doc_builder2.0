"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const softUtilities_1 = require("../../utils/softUtilities");
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(() => {
    return (react_1.default.createElement("div", { className: "fixed-plugin" },
        react_1.default.createElement("a", { className: "fixed-plugin-button text-dark position-fixed px-3 py-2", onClick: softUtilities_1.toggleFixedPlugin },
            react_1.default.createElement("i", { className: "fa fa-cog py-2" }, " ")),
        react_1.default.createElement("div", { className: "card shadow-lg blur" },
            react_1.default.createElement("div", { className: "card-header pb-0 pt-3  bg-transparent " },
                react_1.default.createElement("div", { className: "float-start" },
                    react_1.default.createElement("h5", { className: "mt-3 mb-0" }, "Soft UI Configurator"),
                    react_1.default.createElement("p", null, "See our dashboard options.")),
                react_1.default.createElement("div", { className: "float-end mt-4" },
                    react_1.default.createElement("button", { className: "btn btn-link text-dark p-0 fixed-plugin-close-button", onClick: softUtilities_1.toggleFixedPlugin },
                        react_1.default.createElement("i", { className: "fa fa-close" })))),
            react_1.default.createElement("hr", { className: "horizontal dark my-1" }),
            react_1.default.createElement("div", { className: "card-body pt-sm-3 pt-0" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement("h6", { className: "mb-0" }, "Sidebar Colors")),
                react_1.default.createElement("a", { 
                    // href="javascript:void(0)"
                    className: "switch-trigger background-color" },
                    react_1.default.createElement("div", { className: "badge-colors my-2 text-start" },
                        react_1.default.createElement("span", { className: "badge filter bg-gradient-primary active", "data-color": "primary", onClick: () => "sidebarColor(this)" }),
                        react_1.default.createElement("span", { className: "badge filter bg-gradient-dark", "data-color": "dark", onClick: () => "sidebarColor(this)" }),
                        react_1.default.createElement("span", { className: "badge filter bg-gradient-info", "data-color": "info", onClick: () => "sidebarColor(this)" }),
                        react_1.default.createElement("span", { className: "badge filter bg-gradient-success", "data-color": "success", onClick: () => "sidebarColor(this)" }),
                        react_1.default.createElement("span", { className: "badge filter bg-gradient-warning", "data-color": "warning", onClick: () => "sidebarColor(this)" }),
                        react_1.default.createElement("span", { className: "badge filter bg-gradient-danger", "data-color": "danger", onClick: () => "sidebarColor(this)" }))),
                react_1.default.createElement("div", { className: "mt-3" },
                    react_1.default.createElement("h6", { className: "mb-0" }, "Sidenav Type"),
                    react_1.default.createElement("p", { className: "text-sm" }, "Choose between 2 different sidenav types.")),
                react_1.default.createElement("div", { className: "d-flex" },
                    react_1.default.createElement("button", { className: "btn bg-gradient-primary w-100 px-3 mb-2 active", "data-class": "bg-transparent", onClick: () => "sidebarType(this)" }, "Transparent"),
                    react_1.default.createElement("button", { className: "btn bg-gradient-primary w-100 px-3 mb-2 ms-2", "data-class": "bg-white", onClick: () => "sidebarType(this)" }, "White")),
                react_1.default.createElement("p", { className: "text-sm d-xl-none d-block mt-2" }, "You can change the sidenav type just on desktop view."),
                react_1.default.createElement("div", { className: "mt-3" },
                    react_1.default.createElement("h6", { className: "mb-0" }, "Navbar Fixed")),
                react_1.default.createElement("div", { className: "form-check form-switch ps-0" },
                    react_1.default.createElement("input", { className: "form-check-input mt-1 ms-auto", type: "checkbox", id: "navbarFixed", onClick: () => "navbarFixed(this)" })),
                react_1.default.createElement("hr", { className: "horizontal dark mb-1 d-xl-block d-none" }),
                react_1.default.createElement("div", { className: "mt-2 d-xl-block d-none" },
                    react_1.default.createElement("h6", { className: "mb-0" }, "Sidenav Mini")),
                react_1.default.createElement("div", { className: "form-check form-switch ps-0 d-xl-block d-none" },
                    react_1.default.createElement("input", { className: "form-check-input mt-1 ms-auto", type: "checkbox", id: "navbarMinimize", onClick: () => "navbarMinimize(this)" })),
                react_1.default.createElement("hr", { className: "horizontal dark mb-1 d-xl-block d-none" }),
                react_1.default.createElement("div", { className: "mt-2 d-xl-block d-none" },
                    react_1.default.createElement("h6", { className: "mb-0" }, "Light/Dark")),
                react_1.default.createElement("div", { className: "form-check form-switch ps-0 d-xl-block d-none" },
                    react_1.default.createElement("input", { className: "form-check-input mt-1 ms-auto", type: "checkbox", id: "dark-version", onClick: () => "darkMode(this)" })),
                react_1.default.createElement("hr", { className: "horizontal dark my-sm-4" }),
                react_1.default.createElement("a", { className: "btn bg-gradient-info w-100", href: "https://themes.getbootstrap.com/product/soft-ui-dashboard-pro/" }, "Buy now"),
                react_1.default.createElement("a", { className: "btn btn-outline-dark w-100", href: "https://www.creative-tim.com/learning-lab/bootstrap-marketplace/overview/soft-ui-dashboard" }, "View documentation"),
                react_1.default.createElement("div", { className: "w-100 text-center" },
                    react_1.default.createElement("a", { className: "github-button", href: "https://github.com/creativetimofficial/ct-soft-ui-dashboard-pro", "data-icon": "octicon-star", "data-size": "large", "data-show-count": "true", "aria-label": "Star creativetimofficial/soft-ui-dashboard on GitHub" }, "Star"),
                    react_1.default.createElement("h6", { className: "mt-3" }, "Thank you for sharing!"),
                    react_1.default.createElement("a", { href: "https://twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20PRO%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-pro", className: "btn btn-dark mb-0 me-2", target: "_blank" },
                        react_1.default.createElement("i", { className: "fab fa-twitter me-1", "aria-hidden": "true" }),
                        " Tweet"),
                    react_1.default.createElement("a", { href: "https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/soft-ui-dashboard-pro", className: "btn btn-dark mb-0 me-2", target: "_blank" },
                        react_1.default.createElement("i", { className: "fab fa-facebook-square me-1", "aria-hidden": "true" }),
                        " ",
                        "Share"))))));
});
