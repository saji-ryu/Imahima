
$(function () {
    var ishima;
    var seekbar = document.getElementById('himatime_bar');
    seekbar.max = 300;
    seekbar.min = 0;
    seekbar.value = 60;
    $('#himatime').text('0分')
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

    $('#himatime_bar').on("input",function () {
        //alert(JSON.stringify($('#himatime_bar').val()));
        $('#himatime').text($('#himatime_bar').val()+'分');
    });

    $('#himatime_bar').on('change',function () {
        $.post('/time',{'HimaTime':$(this).val()});
    });

    function change() {
        if (ishima) {
            $('#himabutton').text("今暇");
            $('#himabutton').css('background-color','#effff8');
            $('#time').css('visibility','');

        }else{
            $('#himabutton').text("今暇じゃない");
            $('#himabutton').css('background-color','#bababa');
            $('#time').css('visibility','hidden');
        }
    }
});