"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const testController_1 = require("../controllers/testController");
const authRouter = (0, express_1.Router)();
//http://localhost:5001/auth
authRouter.get("/", testController_1.testGetToken);
authRouter.post("/register", authController_1.registerNewUser);
authRouter.post("/login", authController_1.loginUser);
authRouter.post("/logout", authController_1.logout);
exports.default = authRouter;
