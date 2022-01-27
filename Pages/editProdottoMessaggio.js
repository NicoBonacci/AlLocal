var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

exports.checkForm = function (nomeProdotto, descrizione, prezzo, setError) {
    if (setError === undefined || setError === null) return false;
    if (nomeProdotto === '' || descrizione === "" || prezzo === "") {
        setError('Please complete all fields to continue');
        return false;
    } else return true;
}