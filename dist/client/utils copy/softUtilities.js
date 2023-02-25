"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initNavBlurOnScroll = exports.toggleSidenav = exports.toggleSideNav = exports.toggleFixedPlugin = void 0;
const toggleFixedPlugin = () => {
    const fixedPlugin = document.querySelector(".fixed-plugin");
    if (fixedPlugin) {
        if (!fixedPlugin.classList.contains("show")) {
            fixedPlugin.classList.add("show");
        }
        else {
            fixedPlugin.classList.remove("show");
        }
    }
};
exports.toggleFixedPlugin = toggleFixedPlugin;
const toggleSideNav = () => {
    if (document.querySelector(".sidenav-toggler")) {
        const sidenavShow = document.getElementsByClassName("g-sidenav-show")[0];
        const toggleNavbarMinimize = document.getElementById("navbarMinimize");
        if (!sidenavShow.classList.contains("g-sidenav-hidden")) {
            sidenavShow.classList.remove("g-sidenav-pinned");
            sidenavShow.classList.add("g-sidenav-hidden");
            if (toggleNavbarMinimize) {
                toggleNavbarMinimize.click();
                toggleNavbarMinimize.setAttribute("checked", "true");
            }
        }
        else {
            sidenavShow.classList.remove("g-sidenav-hidden");
            sidenavShow.classList.add("g-sidenav-pinned");
            if (toggleNavbarMinimize) {
                toggleNavbarMinimize.click();
                toggleNavbarMinimize.removeAttribute("checked");
            }
        }
    }
};
exports.toggleSideNav = toggleSideNav;
const toggleSidenav = () => {
    console.log("FDSAFDSA");
    const className = "g-sidenav-pinned";
    const sidenav = document.getElementById("sidenav-main");
    const body = document.getElementsByTagName("body")[0];
    const iconSidenav = document.getElementById("iconSidenav");
    if (body.classList.contains(className)) {
        body.classList.remove(className);
        setTimeout(function () {
            sidenav === null || sidenav === void 0 ? void 0 : sidenav.classList.remove("bg-white");
        }, 100);
        sidenav === null || sidenav === void 0 ? void 0 : sidenav.classList.remove("bg-transparent");
    }
    else {
        body.classList.add(className);
        sidenav === null || sidenav === void 0 ? void 0 : sidenav.classList.add("bg-white");
        sidenav === null || sidenav === void 0 ? void 0 : sidenav.classList.remove("bg-transparent");
        iconSidenav === null || iconSidenav === void 0 ? void 0 : iconSidenav.classList.remove("d-none");
    }
};
exports.toggleSidenav = toggleSidenav;
const initNavBlurOnScroll = () => {
    if (document.getElementById("navbarBlur")) {
        navbarBlurOnScroll("navbarBlur");
    }
};
exports.initNavBlurOnScroll = initNavBlurOnScroll;
const navbarBlurOnScroll = (id) => {
    const navbar = document.getElementById(id);
    let navbarScrollActive = navbar ? navbar.getAttribute("data-scroll") : false;
    let scrollDistance = 5;
    let classes = ["blur", "shadow-blur", "left-auto"];
    let toggleClasses = ["shadow-none"];
    const blurNavbar = () => {
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.add(...classes);
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.remove(...toggleClasses);
        toggleNavLinksColor("blur");
    };
    const transparentNavbar = () => {
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.remove(...classes);
        navbar === null || navbar === void 0 ? void 0 : navbar.classList.add(...toggleClasses);
        toggleNavLinksColor("transparent");
    };
    if (window.scrollY > scrollDistance) {
        blurNavbar();
    }
    else {
        transparentNavbar();
    }
    if (navbarScrollActive == "true") {
        window.onscroll = debounce(function () {
            if (window.scrollY > scrollDistance) {
                blurNavbar();
            }
            else {
                transparentNavbar();
            }
        }, 10, false);
    }
    else {
        window.onscroll = debounce(function () {
            transparentNavbar();
        }, 10, false);
    }
    var isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;
    if (isWindows) {
        var content = document.querySelector(".main-content");
        if (navbarScrollActive == "true") {
            content === null || content === void 0 ? void 0 : content.addEventListener("ps-scroll-y", debounce(function () {
                if ((content === null || content === void 0 ? void 0 : content.scrollTop) > scrollDistance) {
                    blurNavbar();
                }
                else {
                    transparentNavbar();
                }
            }, 10, false));
        }
        else {
            content === null || content === void 0 ? void 0 : content.addEventListener("ps-scroll-y", debounce(function () {
                transparentNavbar();
            }, 10, false));
        }
    }
};
// Debounce Function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = undefined;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
const toggleNavLinksColor = (type) => {
    let navLinks = document.querySelectorAll(".navbar-main .nav-link");
    let navLinksToggler = document.querySelectorAll(".navbar-main .sidenav-toggler-line");
    if (type === "blur") {
        navLinks.forEach((element) => {
            element.classList.remove("text-body");
        });
        navLinksToggler.forEach((element) => {
            element.classList.add("bg-dark");
        });
    }
    else if (type === "transparent") {
        navLinks.forEach((element) => {
            element.classList.add("text-body");
        });
        navLinksToggler.forEach((element) => {
            element.classList.remove("bg-dark");
        });
    }
};
