const {isEmail, isLength} = require("validator");
const {isBoolean, isInteger, inRange} = require('lodash');
const {body, param, validationResult} = require('express-validator');
const ControllerResponse = require('../res/controller.response');
const mongoose = require('mongoose');

const addAdminValidationRules = () => {
    return [
        body('username')
            .exists().withMessage('Username is require'),
        body('email')
            .isEmail().withMessage('Invalid email')
            .exists().withMessage('Email is require'),
        body('password')
            .isLength({min: 5}).withMessage('Length must > 5')
            .exists().withMessage('Password is require'),
        body('passwordConfirmation')
            .custom((value, {req}) => value === req.body.password).withMessage("Password confirmation doesn't match")
            .isLength({min: 5}).withMessage('Length must > 5')
            .exists().withMessage('Password confirmation is require'),
        body('role')
            .isIn(['2', '3']).withMessage('Invalid role')
            .exists().withMessage('Password confirmation is require'),
    ]
};

const updateAdminValidationRules = () => {
    return [
        param('id')
            .custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid Object ID')
            .exists().withMessage('Id is require'),
        body('email')
            .custom((value) => {
                if (!value) {
                    return true;
                } else {
                    return isEmail(value);
                }
            }).withMessage('Invalid email'),
        body('password')
            .custom((value) => {
                if (!value) {
                    return true;
                } else {
                    return isLength(value, {min: 5});
                }
            })
            .withMessage('Length must > 5'),
        // body('passwordConfirmation')
        //     .custom((value) => {
        //         if (!value) {
        //             return true;
        //         } else {
        //             return isLength(value, {min: 5});
        //         }
        //     })
        //     .withMessage('Length must > 5'),
        //     .custom((value, {req}) => value === req.body.password).withMessage("Password confirmation doesn't match")
        //     .isLength({min: 5}).withMessage('Length must > 5'),
        body('sex')
            .custom((value) => {
                if (!value) {
                    return true;
                } else {
                    if (isInteger(value)) {
                        return inRange(value, 0, 2);
                    }
                    return false;
                }
            })
            .withMessage('Invalid value'),
        body('is_active')
            .custom((value) => {
                if (!value) {
                    return true;
                } else {
                    return isBoolean(value);
                }
            })
            .withMessage('Invalid value')
    ]
};

const validate = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = {};
    errors.array().map(err => extractedErrors[err.param] = err.msg);
    const result = {
        code: 'EV',
        message: 'Errors in body',
        data: extractedErrors
    };
    return await ControllerResponse.validatorResponse(res, result)
};

module.exports = {
    addAdminValidationRules,
    updateAdminValidationRules,
    validate,
};