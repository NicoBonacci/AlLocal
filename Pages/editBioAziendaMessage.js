var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

exports.checkForm = function (descrizione, setError) {
    if (setError === undefined || setError === null) return false;
    if (descrizione === "") {
        setError('Please complete biography fields');
        return false;
    } else return true;
}