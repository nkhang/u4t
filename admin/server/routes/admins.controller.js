const express = require("express");

const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const AdminService = require("../services/admin.service");
const ControllerResponse = require('../utils/res/controller.response');

const AdminValidator = require("../utils/validator/admins.validator");
const ObjectIdValidator = require("../utils/validator/objectID.validator");

router.post('/login', function (req, res) {
    passport.authenticate('local', {session: false},
        (err, admin, info) => {
            console.log('Authenticate');
            if (err || !admin) {
                const result = {
                    err: true,
                    res: null,
                    data: info
                };
                return ControllerResponse.authenticateResponse(res, result);
            }
            req.login(admin, {session: false}, (err) => {
                if (err) {
                    const result = {
                        err: false,
                        res: null,
                        data: err
                    };
                    return ControllerResponse.authenticateResponse(res, result);
                }
                const _admin = {
                    username: admin.username
                };

                const token = jwt.sign(_admin, process.env.JWT_SECRET);
                const result = {
                    err: null,
                    res: true,
                    data: {
                        jwt: token
                    }
                };
                return ControllerResponse.authenticateResponse(res, result);
            });
        })(req, res);
});

router.post('/',
    AdminValidator.addAdminValidationRules(),
    AdminValidator.validate,
    async (req, res) => {
        try {
            let result = await AdminService.addNewAdmin(req.body);
            return await ControllerResponse.postResponse(res, result);
        } catch (e) {
            console.trace(e);
            return await ControllerResponse.internalServerError(res, e);
        }
    }
);

router.get('/detail/:id',
    ObjectIdValidator.objectIDValidationRules(),
    ObjectIdValidator.validate,
    async (req, res) => {
        try {
            let result = await AdminService.getAdminById(req.params.id);
            return await ControllerResponse.getResponse(res, result);
        } catch (error) {
            console.trace(error);
            return await ControllerResponse.internalServerError(res, error);
        }
    }
);

router.get('/:role/:page/:limit',
    async (req, res) => {
        try {
            const payload = {
                role: req.params.role,
                page: req.params.page,
                limit: req.params.limit
            };
            let result = await AdminService.getAdminPagination(payload);
            return await ControllerResponse.getResponse(res, result);
        } catch (error) {
            console.trace(error);
            return await ControllerResponse.internalServerError(res, error)
        }
    }
);

router.put('/update/:id',
    AdminValidator.updateAdminValidationRules(),
    AdminValidator.validate,
    async (req, res) => {
        try {
            const id = req.params.id;
            const payload = req.body;
            let result = await AdminService.updateAdmin(id, payload);
            return await ControllerResponse.updateResponse(res, result);
        } catch (error) {
            console.trace(error);
            return await ControllerResponse.internalServerError(res, error);
        }
    }
);

router.put('/delete/:id',
    ObjectIdValidator.objectIDValidationRules(),
    ObjectIdValidator.validate,
    async (req, res) => {
        try {
            const id = req.body.id;
            let result = await AdminService.deleteAdmin(id);
            return await ControllerResponse.deleteResponse(res, result);
        } catch (error) {
            console.trace(error);
            return await ControllerResponse.internalServerError(res, error);
        }
    }
);

router.put('/lock/:id',
    ObjectIdValidator.objectIDValidationRules(),
    ObjectIdValidator.validate,
    async (req, res) => {
        try {
            const _payload = {
                update: {
                    is_active: false,
                },
                id: req.params.id
            };
            const result = await AdminService.updateActiveAdmin(_payload);
            return await ControllerResponse.updateResponse(res, result);
        } catch (e) {
            return await ControllerResponse.internalServerError(res, e)
        }
    }
);

router.put('/unlock/:id',
    ObjectIdValidator.objectIDValidationRules(),
    ObjectIdValidator.validate,
    async (req, res) => {
        try {
            const _payload = {
                update: {
                    is_active: true,
                },
                id: req.params.id
            };

            const result = await AdminService.updateActiveAdmin(_payload);
            return await ControllerResponse.updateResponse(res, result);
        } catch (e) {
            return await ControllerResponse.internalServerError(res, e);
        }
    }
);

module.exports = router;
