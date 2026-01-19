import express, { Express } from 'express'; // const express = require('express');
import { getCreateUser, getHomePage, getUserInfo, postCreateUserInfo, postDeleteUser, updateUserInfo } from '../controllers/user.controllers';
import { getAdminUserPage, getDashboardPage } from '../controllers/admin/dashboard.controllers';
import fileUploadMiddleware from '../middleware/multer';
import { getClientProductPage } from '../controllers/client/product.controllers';
import { getAdminOrderPage } from '../controllers/admin/order.controllers';
import { getAdminProductPage, getAdminUpdateProductPage, getCreateProduct, postCreateProduct, updateProductInfo } from '../controllers/admin/product.controllers';
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
    router.get("/admin/create-product", getCreateProduct);
    router.post("/admin/create-product", fileUploadMiddleware("productImage", "images/products"), postCreateProduct);
    router.get("/admin/update-product/:id", getAdminUpdateProductPage);
    router.post("/admin/update-product/:id", fileUploadMiddleware("productImage", "images/products"), updateProductInfo)

    router.get("/admin/order", getAdminOrderPage);

    app.use("/", router);
}

export default webRoutes;
