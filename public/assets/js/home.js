$(document).ready(function(){

    $('.hbb-slider').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: false,
        prevArrow: $('#hbb .scroll-left'),
        nextArrow: $('#hbb .scroll-right'),
        responsive: [
 
        {
            breakpoint: 560,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2
            }
        }
        ]
    });

    $('.dessert-slider').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: false,
        prevArrow: $('#desserts .scroll-left'),
        nextArrow: $('#desserts .scroll-right'),
        responsive: [
        {
            breakpoint: 560,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2
            }
        }
        ]
    });

});
