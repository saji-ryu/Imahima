$(function () {
    var ishima;
    var seekbar = document.getElementById('himatime_bar');
    var until;
    seekbar.max = 300;
    seekbar.min = 0;
    // console.log(JSON.stringify(window.sessionStorage));
    $.get('/api/me', function (data) {
        ishima = data.IsHima;
        until = data.HimaTime;
        console.log(ishima);
        loadTime();
        change();
    });
    $('#himabutton').click(function () {
        //alert('click');
        ishima = !ishima;
        $.post('/', {'IsHima': ishima});
        change()
    });

    $('#himatime_bar').on("input", function () {
        //alert(JSON.stringify($('#himatime_bar').val()));
        $('#himatime').text($('#himatime_bar').val() + '分');
    });

    $('#himatime_bar').on('change', function () {
        until = Date.now() + $(this).val() * 60 * 1000;
        $.post('/time', {'HimaTime': until});
    });

    function change() {
        if (ishima) {
            $('#himabutton').text("今暇");
            $('#himabutton').css('background-color', '#effff8');
            $('#time').css('visibility', '');

        } else {
            $('#himabutton').text("今暇じゃない");
            $('#himabutton').css('background-color', '#bababa');
            $('#time').css('visibility', 'hidden');
        }
    }

    function loadTime(){
        seekbar.value = until - Date.now() > 0 ? (until - Date.now()) / 1000 / 60 : 0;
        console.log(seekbar.value);
        $('#himatime').text(seekbar.value+'分');
    }
    setInterval(loadTime,10000);
});