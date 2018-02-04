jQuery.validator.addMethod("validEmail", function(value, element) {
    if (value === '')
        return true;
    var str = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm,
        check = str.test(value);
    return check;
}, "Please use a valid email address.");