module.exports = {
    tempTrue: (message, result) => {
        return {
            success: true,
            message,
            result,
        }
    },

    tempFalse: (rc, result, error) => {
        return {
            rc,
            success: false,
            result,
            error
        }
    },
};