"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const softUtilities_1 = require("../../utils/softUtilities");
const connector = (0, react_redux_1.connect)((state) => ({}), (dispatch) => ({}));
exports.default = connector(({ pageName }) => {
    (0, react_1.useEffect)(() => {
        (0, softUtilities_1.initNavBlurOnScroll)();
    }, []);
    return (react_1.default.createElement("nav", { className: "navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky", id: "navbarBlur", "data-scroll": "true" },
        react_1.default.createElement("div", { className: "container-fluid py-1 px-3" },
            react_1.default.createElement("nav", { "aria-label": "breadcrumb" },
                react_1.default.createElement("ol", { className: "breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5" },
                    react_1.default.createElement("li", { className: "breadcrumb-item text-sm" },
                        react_1.default.createElement("a", { className: "opacity-3 text-dark" },
                            react_1.default.createElement("svg", { width: "12px", height: "12px", className: "mb-1", viewBox: "0 0 45 40", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
                                react_1.default.createElement("title", null, "shop "),
                                react_1.default.createElement("g", { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
                                    react_1.default.createElement("g", { transform: "translate(-1716.000000, -439.000000)", fill: "#252f40", fillRule: "nonzero" },
                                        react_1.default.createElement("g", { transform: "translate(1716.000000, 291.000000)" },
                                            react_1.default.createElement("g", { transform: "translate(0.000000, 148.000000)" },
                                                react_1.default.createElement("path", { d: "M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z" }),
                                                react_1.default.createElement("path", { d: "M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z" })))))))),
                    react_1.default.createElement("li", { className: "breadcrumb-item text-sm" },
                        react_1.default.createElement("a", { className: "opacity-5 text-dark" }, "Pages")),
                    react_1.default.createElement("li", { className: "breadcrumb-item text-sm text-dark active", "aria-current": "page" }, "Default")),
                react_1.default.createElement("h6", { className: "font-weight-bolder mb-0" }, pageName)),
            react_1.default.createElement("div", { className: "sidenav-toggler sidenav-toggler-inner d-xl-block d-none ", onClick: softUtilities_1.toggleSideNav },
                react_1.default.createElement("a", { 
                    // href="javascript:;"
                    className: "nav-link text-body p-0" },
                    react_1.default.createElement("div", { className: "sidenav-toggler-inner" },
                        react_1.default.createElement("i", { className: "sidenav-toggler-line" }),
                        react_1.default.createElement("i", { className: "sidenav-toggler-line" }),
                        react_1.default.createElement("i", { className: "sidenav-toggler-line" })))),
            react_1.default.createElement("div", { className: "collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4", id: "navbar" },
                react_1.default.createElement("div", { className: "ms-md-auto pe-md-3 d-flex align-items-center" },
                    react_1.default.createElement("div", { className: "input-group" },
                        react_1.default.createElement("span", { className: "input-group-text text-body" },
                            react_1.default.createElement("i", { className: "fas fa-search", "aria-hidden": "true" })),
                        react_1.default.createElement("input", { type: "text", className: "form-control", placeholder: "Type here..." }))),
                react_1.default.createElement("ul", { className: "navbar-nav  justify-content-end" },
                    react_1.default.createElement("li", { className: "nav-item d-flex align-items-center" },
                        react_1.default.createElement("a", { href: "/pages/authentication/signin/illustration.html", className: "nav-link text-body font-weight-bold px-0", target: "_blank" },
                            react_1.default.createElement("i", { className: "fa fa-user me-sm-1" }),
                            react_1.default.createElement("span", { className: "d-sm-inline d-none" }, "Sign In"))),
                    react_1.default.createElement("li", { className: "nav-item d-xl-none ps-3 d-flex align-items-center" },
                        react_1.default.createElement("a", { 
                            //  href="javascript:;"
                            className: "nav-link text-body p-0", id: "iconNavbarSidenav", onClick: softUtilities_1.toggleSidenav },
                            react_1.default.createElement("div", { className: "sidenav-toggler-inner" },
                                react_1.default.createElement("i", { className: "sidenav-toggler-line" }),
                                react_1.default.createElement("i", { className: "sidenav-toggler-line" }),
                                react_1.default.createElement("i", { className: "sidenav-toggler-line" })))),
                    react_1.default.createElement("li", { className: "nav-item px-3 d-flex align-items-center" },
                        react_1.default.createElement("a", { 
                            //href="javascript:;"
                            className: "nav-link text-body p-0" },
                            react_1.default.createElement("i", { className: "fa fa-cog fixed-plugin-button-nav cursor-pointer", onClick: softUtilities_1.toggleFixedPlugin }))),
                    react_1.default.createElement("li", { className: "nav-item dropdown pe-2 d-flex align-items-center" },
                        react_1.default.createElement("a", { 
                            // href="javascript:;"
                            className: "nav-link text-body p-0", id: "dropdownMenuButton", "data-bs-toggle": "dropdown", "aria-expanded": "false" },
                            react_1.default.createElement("i", { className: "fa fa-bell cursor-pointer" })),
                        react_1.default.createElement("ul", { className: "dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4", "aria-labelledby": "dropdownMenuButton" },
                            react_1.default.createElement("li", { className: "mb-2" },
                                react_1.default.createElement("a", { className: "dropdown-item border-radius-md" },
                                    react_1.default.createElement("div", { className: "d-flex py-1" },
                                        react_1.default.createElement("div", { className: "my-auto" },
                                            react_1.default.createElement("img", { src: "/assets/img/team-2.jpg", className: "avatar avatar-sm  me-3 ", alt: "user image" })),
                                        react_1.default.createElement("div", { className: "d-flex flex-column justify-content-center" },
                                            react_1.default.createElement("h6", { className: "text-sm font-weight-normal mb-1" },
                                                react_1.default.createElement("span", { className: "font-weight-bold" }, "New message"),
                                                " ",
                                                "from Laur"),
                                            react_1.default.createElement("p", { className: "text-xs text-secondary mb-0" },
                                                react_1.default.createElement("i", { className: "fa fa-clock me-1" }),
                                                "13 minutes ago"))))),
                            react_1.default.createElement("li", { className: "mb-2" },
                                react_1.default.createElement("a", { className: "dropdown-item border-radius-md" },
                                    react_1.default.createElement("div", { className: "d-flex py-1" },
                                        react_1.default.createElement("div", { className: "my-auto" },
                                            react_1.default.createElement("img", { src: "/assets/img/small-logos/logo-spotify.svg", className: "avatar avatar-sm bg-gradient-dark  me-3 ", alt: "logo spotify" })),
                                        react_1.default.createElement("div", { className: "d-flex flex-column justify-content-center" },
                                            react_1.default.createElement("h6", { className: "text-sm font-weight-normal mb-1" },
                                                react_1.default.createElement("span", { className: "font-weight-bold" }, "New album"),
                                                " by Travis Scott"),
                                            react_1.default.createElement("p", { className: "text-xs text-secondary mb-0" },
                                                react_1.default.createElement("i", { className: "fa fa-clock me-1" }),
                                                "1 day"))))),
                            react_1.default.createElement("li", null,
                                react_1.default.createElement("a", { className: "dropdown-item border-radius-md" },
                                    react_1.default.createElement("div", { className: "d-flex py-1" },
                                        react_1.default.createElement("div", { className: "avatar avatar-sm bg-gradient-secondary  me-3  my-auto" },
                                            react_1.default.createElement("svg", { width: "12px", height: "12px", viewBox: "0 0 43 36", version: "1.1", xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink" },
                                                react_1.default.createElement("title", null, "credit-card"),
                                                react_1.default.createElement("g", { stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
                                                    react_1.default.createElement("g", { transform: "translate(-2169.000000, -745.000000)", fill: "#FFFFFF", fillRule: "nonzero" },
                                                        react_1.default.createElement("g", { transform: "translate(1716.000000, 291.000000)" },
                                                            react_1.default.createElement("g", { transform: "translate(453.000000, 454.000000)" },
                                                                react_1.default.createElement("path", { className: "color-background", d: "M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z", opacity: "0.593633743" }),
                                                                react_1.default.createElement("path", { className: "color-background", d: "M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z" }))))))),
                                        react_1.default.createElement("div", { className: "d-flex flex-column justify-content-center" },
                                            react_1.default.createElement("h6", { className: "text-sm font-weight-normal mb-1" }, "Payment successfully completed"),
                                            react_1.default.createElement("p", { className: "text-xs text-secondary mb-0" },
                                                react_1.default.createElement("i", { className: "fa fa-clock me-1" }),
                                                "2 days"))))))))))));
});
