const JSONAPIError = require('jsonapi-serializer').Error;
const errors = require('./errors.js');

// ERRORS: {
//     GENERIC: {
//         BAD_REQUEST: "Bad request",
//         REQUIRED: "Should have required property",
//         UNPROCESSABLE_ENTITY: "Unprocessable entity",
//         NOT_FOUND: "Resource not found",
//         INTERNAL_SERVER_ERROR: "Internal server error"
//     }
// }


function customErrorMessage(statusCode, title, message) {
    return new JSONAPIError({
        status: statusCode,
        title: title,
        detail: message
    });
};

function validationErrorMessage(ajvErrorValidationData) {
    if (ajvErrorValidationData[0].keyword == 'required') {
        return new JSONAPIError({
            status: 400,
            title: errors.ERRORS.GENERIC.BAD_REQUEST,
            detail: errors.ERRORS.GENERIC.REQUIRED + ": " + ajvErrorValidationData[0].params.missingProperty
        });
    } else {
        return new JSONAPIError({
            status: 400,
            title: errors.ERRORS.GENERIC.BAD_REQUEST,
            detail: ajvErrorValidationData[0].message
        });
    }
}

function unprocessableEntityErrorMessage(errorData) {
    return new JSONAPIError({
        status: 422,
        title: errors.ERRORS.GENERIC.UNPROCESSABLE_ENTITY,
        detail: errors.ERRORS.GENERIC.UNPROCESSABLE_ENTITY + ": " + errorData.message
    });
}

function unauthorizedErrorMessage() {
    return new JSONAPIError({
        status: 401
    });
}

function badRequestErrorMessage(errorData) {
    return new JSONAPIError({
        status: 400,
        title: errors.ERRORS.GENERIC.BAD_REQUEST,
        detail: errorData.message
    });
}

function internalServerErrorErrorMessage(errorData) {
    return new JSONAPIError({
        status: 500,
        title: errors.ERRORS.GENERIC.INTERNAL_SERVER_ERROR,
        detail: errorData.message
    });
}

function notFoundErrorMessage(detailMsg) {
    return new JSONAPIError({
        status: 404,
        title: errors.ERRORS.GENERIC.NOT_FOUND,
        detail: detailMsg
    });
}



module.exports = {
    customErrorMessage: customErrorMessage,
    validationErrorMessage: validationErrorMessage,
    unprocessableEntityErrorMessage: unprocessableEntityErrorMessage,
    unauthorizedErrorMessage: unauthorizedErrorMessage,
    badRequestErrorMessage: badRequestErrorMessage,
    notFoundErrorMessage: notFoundErrorMessage,
    internalServerErrorErrorMessage: internalServerErrorErrorMessage
}
