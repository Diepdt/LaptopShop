import express, { Express } from 'express'; // const express = require('express');
import { getCreateUser, getHomePage, getUserInfo, postCreateUserInfo, postDeleteUser, updateUserInfo } from '../controllers/user.controllers';
import { getAdminUserPage, getDashboardPage, getAdminProductPage, getAdminOrderPage } from '../controllers/admin/dashboard.controllers';
import fileUploadMiddleware from '../middleware/multer';
import { getClientProductPage } from '../controllers/client/product.controllers';
const router = express.Router();

const webRoutes = (app: Express) => { // khai bao 1 ham va dat ten: webRoutes
    // user
    router.get("/", getHomePage);

    router.get("/product/:id", getClientProductPage);

    // admin
    router.get("/admin", getDashboardPage);

    router.get("/admin/user", getAdminUserPage);
    router.get("/admin/create-user", getCreateUser);
    router.post("/admin/create-user", fileUploadMiddleware("avatar"), postCreateUserInfo);
    router.post("/admin/delete-user/:id", postDeleteUser);
    router.get("/admin/update-user/:id", getUserInfo);
    router.post("/admin/update-user/:id", fileUploadMiddleware("avatar"), updateUserInfo);

    router.get("/admin/product", getAdminProductPage);

    router.get("/admin/order", getAdminOrderPage);

    app.use("/", router);
}

export default webRoutes;
