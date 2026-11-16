function success(res, statusCode, message, data = null) {

    return res.status(statusCode).json({
        success: statusCode,
        message,
        data
    });
}

function error(res, statusCode, message) {

    return res.status(statusCode).json({
        success: statusCode,
        message
    });
}

module.exports = {
    success,
    error
};
