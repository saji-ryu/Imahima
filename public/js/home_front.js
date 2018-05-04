
$(function () {
    var ishima;
    // console.log(JSON.stringify(window.sessionStorage));
    $.get('/confirm',function (data) {
        ishima = data;
        console.log(ishima);
        change();
    });
    $('#himabutton').click(function () {
        //alert('click');
        ishima = !ishima;
        $.post('/',{'IsHima':ishima});
        change()
    });
    function change() {
        if (ishima) {
            $('#himabutton').text("今暇");
        }else{
            $('#himabutton').text("今暇じゃない");
        }
    }
});