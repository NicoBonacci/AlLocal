var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

exports.checkForm = function (email, password, setError) {
    if (setError === undefined || setError === null) return false;
    if (email === '' || password === '') {
        setError('Please complete all fields to log in ');
        return false;
    } else if (!re.test(email)) {
        setError('Please insert a valid email');
        return false;
    } else return true;
}