var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/

exports.checkForm = function (newPost, setError) {
    if (setError === undefined || setError === null) return false;
    if (newPost == '') {
        setError('Please insert a valid review');
        return false;
    } else return true;
}