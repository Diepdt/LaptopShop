import express, { Express } from 'express'; // const express = require('express');
import { getCreateUser, getHomePage, getUserInfo, postCreateUserInfo, postDeleteUser, updateUserInfo } from '../controllers/user.controllers';
import { getAdminUserPage, getDashboardPage } from '../controllers/admin/dashboard.controllers';
import fileUploadMiddleware from '../middleware/multer';
import { getClientProductPage } from '../controllers/client/product.controllers';
import { getAdminOrderPage } from '../controllers/admin/order.controllers';
import { getAdminProductPage, getCreateProduct, postCreateProduct } from '../controllers/admin/product.controllers';
import validate from '../middleware/validator';
import { createUserSchema } from '../validations/user.validation';
import { createProductSchema } from '../validations/product.validation';
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
    router.post("/admin/update-user/:id", fileUploadMiddleware("avatar"), validate(createUserSchema), updateUserInfo);

    router.get("/admin/product", getAdminProductPage);
    router.get("/admin/create-product", getCreateProduct);
    router.post("/admin/create-product", fileUploadMiddleware("productImage", "images/products"), validate(createProductSchema), postCreateProduct);


    router.get("/admin/order", getAdminOrderPage);

    app.use("/", router);
}

export default webRoutes;
