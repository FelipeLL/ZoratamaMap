export const formValidate = (getValues) => {
    return {
        required: {
            value: true,
            message: "Complete el campo adecuadamente",
        },
        patternEmail: {
            value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto",
        },
        patternPassword: {
            value:
                /^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&@])\S{8,50}$/,
            message: "Formato incorrecto de contraseña",
        },
        minLength: {
            value: 12,
            message: "La contraseña debe contener mínimo 12 caracteres",
        },
        validateTrim: {

            trim: (v) => {
                if (!v.trim()) {
                    return "Complete el campo adecuadamente";
                }
                return true;
            },
        },
        validateEquals(getValues) {
            return {
                equals: (v) =>
                    v === getValues("password") ||
                    "No coinciden las contraseñas",

            }
            // message: "No coinciden las contraseñas",
        },
        validateEquals2(getValues) {
            return {
                equals: (v) =>
                    v === getValues("newPassword") ||
                    "No coinciden las contraseñas",

            }
            // message: "No coinciden las contraseñas",
        }
    }
}