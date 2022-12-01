function Comentarios() {
    if ($('.product-tabs').length != 0) {
        $('a[href=\'#tab-review\']').trigger('click');
        $('#input-name').focus();  // adiciona foco ao primeiro input do form de comentarios
        $("html, body").animate({
            scrollTop: $('.product-tabs').offset().top
        }, 1000);
    }
}