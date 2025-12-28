import express, { Express } from 'express'; // const express = require('express');
import { getCreateUser, getHomePage, getUserInfo, postCreateUserInfo, postDeleteUser, updateUserInfo } from '../controllers/user.controllers';
import { getAdminUserPage, getDashboardPage, getAdminProductPage, getAdminOrderPage } from '../controllers/admin/dashboard.controllers';
import fileUploadMiddleware from '../middleware/multer';
const router = express.Router();

const webRoutes = (app: Express) => { // khai bao 1 ham va dat ten: webRoutes
    // user
    router.get("/", getHomePage);

    router.post("/handle-delete-user/:id", postDeleteUser);
    router.get("/handle-update-user/:id", getUserInfo);
    router.post("/handle-update-user/:id", updateUserInfo);

    // admin
    router.get("/admin", getDashboardPage);

    router.get("/admin/user", getAdminUserPage);
    router.get("/create-user", getCreateUser);
    router.post("/admin/create-user", fileUploadMiddleware("avatar"), postCreateUserInfo);

    router.get("/admin/product", getAdminProductPage);

    router.get("/admin/order", getAdminOrderPage);

    app.use("/", router);
}

export default webRoutes;
