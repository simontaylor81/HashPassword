// Hash Password functionality.

$(function () {
    // Hook up submit event.
    $('#main-form').submit(function (event) {
        // Don't do the regular submit, as it refreshes the page.
        event.preventDefault();

        var site = $('#site-id').val();
        var masterPwd = $('#master-pwd').val();
        var sitePwd = generatePassword(site, masterPwd);
        $('#site-pwd').text(sitePwd);
    });
});

function generatePassword(siteId, masterPwd) {
    // The set of available characters to form the password.
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Hash the master and site id to create 256 bit key.
    bits = sjcl.misc.pbkdf2(masterPwd, siteId);

    var i, x;
    var result = '';

    for (i = 0; i < 16; i++) {
        // Get 16 bits from the array -- [0, 2^16).
        x = sjcl.bitArray.extract(bits, i * 16, 16);

        // Convert to character.
        result += chars[x % chars.length];
    }

    return result;
}