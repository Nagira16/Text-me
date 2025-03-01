"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
//http://localhost:5001/auth
router.get("/", (req, res) => {
    const token = req.cookies.token;
    res.json({ token });
});
router.post("/register", auth_1.registerNewUser);
router.post("/login", auth_1.loginUser);
router.post("/logout", auth_1.logout);
exports.default = router;
