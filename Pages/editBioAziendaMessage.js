var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

exports.checkForm = function (descrizione, setError) {
    if (setError === undefined || setError === null) return false;
    if (descrizione === "") {
        setError('Please complete all fields to continue');
        return false;
    } else return true;
}