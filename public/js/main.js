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
    return siteId + masterPwd;
}