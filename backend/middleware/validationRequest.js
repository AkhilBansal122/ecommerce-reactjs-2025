function validationRequest(req, res, next, schema) {

    try {


        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        };

        const { error, value } = schema.validate(req.body, options);
        if (error) {

            let message = "";
            let errorMessages = {};

            for (var i = 0; i < error.details.length; i++) {
                let errorData = {
                    "message": error.details[i].message.replace(/[|&;$%@"<>()+,]/g, "")
                };
                // console.log(errorData);
                let keyy = error.details[i].path[0];
                errorMessages[keyy] = errorData;
                if (i == 0)
                    message = error.details[i].message.replace(/[|&;$%@"<>()+,]/g, "");
                // errorMessage.push(errorData);
            }
            //return res.status(400).json({ status: false, status_code: 400, error_message: errorMessages, message: message });
            return res.status(401).json({ status: false, message: message });

        } else {
            req.body = value;
            next();
        }
    } catch (error) {
        return res.status(400).json({ status: false, status_code: 400, message: "In Currect Format" });

    }

}
module.exports = validationRequest;
