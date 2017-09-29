$(document).ready(function () {

  // Ширина окна
  var window_width = $(window).width();

  $(window).on('resize', function() {
    window_width = $(window).width();
  });

  // Маска для телефона

  $('.phone').mask("+7 (999) 999-9999");

  // Дата рождения
  $('.date_day').mask("99");
  $('.date_month').mask("99");
  $('.date_year').mask("9999");

  // Всплывающее окно

  function pop(pop_name) {
    var top = $(window).scrollTop() + 60;
    $(pop_name).css({'top' : top,'position' : 'absolute'});
    $('#overlay,' + pop_name).addClass('fadeIn');
  }
  $('.login-link').on('click', function(e) {
    e.preventDefault();
    pop('.pop_login');
  });
  $('.size-link').on('click', function(e) {
    e.preventDefault();
    pop('.pop_size');
  });
  $('.close-btn, #overlay').on('click', function(e) {
    e.preventDefault();
    $('#overlay, .pop, #left-menu').removeClass('fadeIn');
  });

  // Открыть меню
  $('.open-menu').on('click', function(e) {
    e.preventDefault();

    if (!$(this).hasClass('active')) {
      $('#left-menu, #overlay').addClass('fadeIn');
    } else {
      $('#left-menu, #overlay').removeClass('fadeIn');
    }
  });

  // Открыть сайдбар
  $('.open-sidebar').on('click', function(e) {

    e.preventDefault();

    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).next().addClass('active');
      $(this).children('span').text('Закрыть');
    } else {
      $(this).removeClass('active');
      $(this).next().removeClass('active');
      $(this).children('span').text('Открыть');
    }

  });

  $(document).on('click', function(e) {
    if (!$(e.target).closest(".open-sidebar, .left-column").length) {
      $('.content_block, .open-sidebar').removeClass('active');
      $('.open-sidebar').children('span').text('Открыть');
    }
    e.stopPropagation();
  });


  // Подменю
  $('.left-menu').find('.has-submenu').children('a').on('click', function(e) {
    e.preventDefault();
    var $parent = $(this).parents('li');

    if (!$parent.hasClass('active')) {
      $('.left-menu').find('li').removeClass('active');
      $('.left-menu').find('.hidden').slideUp(300);
      $parent.addClass('active');
      $parent.find('.hidden').slideDown(300);
    } else {
      $parent.removeClass('active');
      $parent.find('.hidden').slideUp(300);
    }
  });

  // Доступные размеры и цвета

  $('.sizes, .colors_block').find('li').on('click', function(e) {
    e.preventDefault();

    if (!$(this).hasClass('active')) {
      $(this).parent().children().removeClass('active');
      $(this).addClass('active');
    }
  });

  // Информация о товаре

  $('.good-info').find('a').on('click', function(e) {
    e.preventDefault();

    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).siblings('.hidden').slideDown(300);
    } else {
      $(this).removeClass('active');
      $(this).siblings('.hidden').slideUp(300);
    }
  });

  // Увеличение фото при наведении

  var lense = $('.zoom');
  if (lense.length > 0) {
    lense.find('img').elevateZoom({
      zoomType: "inner",
      zoomWindowFadeIn: 300,
      zoomWindowFadeOut: 300,
      gallery:'card_gallery',
      galleryActiveClass: "active"
     }); 
  }

  // Карточка товара

  $('.small_imgs').find('a').on('click', function(e) {
    e.preventDefault();

    var $url = $(this).data('zoom-image');

    $(this).parents('.card-imgs').find('.main_img').find('.zoom').attr('href', $url);
  });

  // Счетчик
  $('.counter .plus').on('click', function(e) {

    e.preventDefault();

    var $input = $(this).parent().find('.counter-input');
    var $value = $input.val();
    $value++;
    $input.val($value);

  });
  $('.counter .minus').on('click', function(e) {

    e.preventDefault();

    var $input = $(this).parent().find('.counter-input');
    var $value = $input.val();
    if ($value <= 0) {
      return false;
    }
    $value--;
    $input.val($value);

  });
  $('input[type="number"]').on('change', function(e) {

    var $value = $(this).val();

    if ($value <= 0) {
      $(this).val(0);
    }

  });

  // Редактировать информацию
  $('.edit-input').on('click', function(e) {
    e.preventDefault();

    $(this).parent().find('input').removeAttr('disabled').focus();
  });

  // Копировать промокод в буфер

  $('.copy-link').on('click', function(e) {
    e.preventDefault();

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(this).parent().find('.promocode').text()).select();
    document.execCommand("copy");
    $temp.remove();

  });

  // Всплывашка с корзиной

  $('.open-cart').on('click', function(e) {
    e.preventDefault();

    if (!$(this).hasClass('active')) {
      $(this).addClass('active');
      $(this).parents('.right-menu').addClass('active');
    } else {
      $(this).removeClass('active');
      $(this).parents('.right-menu').removeClass('active');
    }
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest(".right-menu").length) {
      $('.right-menu, .open-cart').removeClass('active');
    }
    e.stopPropagation();
  });

  // Поле select

  $('.slct').each(function() {

      var dropBlock = $(this).parent().find('.drop');

      $(this).on('click', function(e){
        e.preventDefault();
        if( !dropBlock.hasClass('visible') ) {
          $('.drop').removeClass('visible');
          $('.slct').removeClass('active');
          dropBlock.addClass('visible');
          $(this).addClass('active');
        } else {
          dropBlock.removeClass('visible');
          $(this).removeClass('active');
        }
      });

      dropBlock.find('li a').on('click', function(e){
        e.preventDefault();
          var $selectResult = $(this).text();
          $(this).parents('.select').find('.slct').removeClass('active').html($selectResult);
          $(this).parents('.drop').removeClass('visible');
          $(this).parents('.select').find('.select-hidden').val($selectResult);
      });

    });

    $(document).on('click', function(e) {
      if (!$(e.target).closest(".select").length) {
        $('.drop').removeClass('visible');
        $('.slct').removeClass('active');
      }
      e.stopPropagation();
    });

  // Табы

  $('.tabs').each(function() {

    var tab = $(this).find('.active').children('a').attr('href');
    var height = $(tab).outerHeight();
    $(tab).addClass('visible');

    $(this).siblings('.tabs-content').height(height);

  });

  $('.tabs a').on('click', function() {
    
    if ($(this).parent().hasClass('active')) {
      return false;
    }

    var container = $(this).parents('.tabs').siblings('.tabs-content');

    var link = $(this).attr('href');
    var prevLink = $(this).parents('.tabs').find('.active a').attr('href');

    var height = $(link).outerHeight();

    $(this).parents('.tabs').find('li').removeClass('active');
    $(this).parent().addClass('active');

    $(prevLink).removeClass('visible');
    $(link).addClass('visible');

    container.height(height);

    return false;

  });

  $(window).on('resize', function() {

    $('.tabs').each(function() {

      var tab = $(this).find('.active').children('a').attr('href');
      var height = $(tab).outerHeight();
      $(this).siblings('.tabs-content').height(height);

    });

  });

  // Карусель

  var $carousel = $(".cat-carousel");
  if ($carousel.hasClass('owl-carousel')) {

    $carousel.owlCarousel({

    nav: true,
    navText: ['',''],
    smartSpeed: 500,
    margin: 30,
    dots: false,
    rewind: true,
    loop: true,
    responsive:{
        0: {
            items:2
        },
        600: {
            items:3
        },
        900:{
            items:4
        }
    }

    });

  }

  var $brands = $(".brands-carousel");
  if ($brands.hasClass('owl-carousel')) {

    $brands.owlCarousel({

    nav: true,
    navText: ['',''],
    smartSpeed: 500,
    margin: 30,
    dots: false,
    rewind: true,
    loop: true,
    responsive:{
        0: {
            items:2
        },
        480: {
            items:3
        },
        600: {
            items:4
        },
        900:{
            items:6
        }
    }

    });

  }

  // Слайдер

  var $slider = $(".slider");
  if ($slider.hasClass('owl-carousel')) {

  $slider.owlCarousel({

    items: 1,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    rewind: true,
    smartSpeed: 500

    });

  }

  var $reviews = $(".reviews-slider");
  if ($reviews.hasClass('owl-carousel')) {

  $reviews.owlCarousel({

    items: 1,
    nav: false,
    dots: true,
    autoplay: false,
    rewind: true,
    smartSpeed: 500

    });

  }

  var $articles = $(".articles-slider");
  if ($articles.hasClass('owl-carousel')) {

  $articles.owlCarousel({

    items: 1,
    nav: false,
    dots: true,
    autoplay: false,
    rewind: true,
    smartSpeed: 500

    });

  }

  // Обработчик формы

  $('input, textarea').blur( function() {

    var id = $(this).attr('name');
    var val = $(this).val();
    if ($(this).attr('required')) {
    if(val.length > 2 && val != '') {
      $(this).removeClass('error');
      $(this).addClass('not_error');
    } else {
      $(this).removeClass('not_error');
      $(this).addClass('error');
    }
    switch(id)
      {

        // Проверка email
        case 'email':
          var rv_mail = /.+@.+\..+/i;
          if(val != '' && rv_mail.test(val)) {
            $(this).removeClass('error');
            $(this).addClass('not_error');
          } else {
            $(this).removeClass('not_error');
            $(this).addClass('error');
          }
        break;
       }
    }

  });

  // Теперь отправим наше письмо с помощью AJAX
  $('.ajax-form').submit(function(e){

    e.preventDefault();

    $(this).find('input, textarea').each(function(){
      if ($(this).attr('required')) {
        $(this).addClass('require');
      }
    });

    var count = $(this).find('.require').length;

    if($(this).find('.not_error').length >= count) {

      $('input, textarea').removeAttr('disabled');
      $(this).find('input, textarea').not(':hidden').val('').removeClass('error not_error');
      $('#overlay, .pop').removeClass('fadeIn');

    } else {
      $(this).find('input, textarea').each(function(){
        if($(this).hasClass('require') && !$(this).hasClass('not_error')) {
          $(this).addClass('error');
        }
      });
      return false;
    }

  });

});

//Cart_unlogin acco from 700px.
    $(".tab_content").hide();
    $(".tab_content:first").show();
    /* в режиме вкладок */
    $("ul.tabs li").click(function () {
        $(".tab_content").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn();
        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".tab_accordion").removeClass("d_active");
        $(".tab_accordion[rel^='" + activeTab + "']").addClass("d_active");
    });
    $(".tab_accordion").click(function () {
        $(".tab_content").hide();
        var d_activeTab = $(this).attr("rel");
        $("#" + d_activeTab).fadeIn();
        $(".tab_accordion").removeClass("d_active");
        $(this).addClass("d_active");
        $("ul.tabs li").removeClass("active");
        $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
    });
    $('ul.tabs li').last().addClass("tab_last");


//Cart_unlogin from max-width: 700px 

$(document).ready(function() {
    $(".tabs").on("click", ".tab__li", function(){
    	$(".tabs .tab__li").removeClass("cart__tab-active"); 
    	$(this).addClass("cart__tab-active"); 
    });
});

//Настройка Google Maps.

      var neighborhoods = [
        {lat: 56.832648,  lng: 60.5800283},
        {lat: 54.785281,  lng: 56.0308721},
        {lat: 53.761725,  lng: 87.1175593},
        {lat: 56.8381913, lng: 60.6351335},
        {lat: 45.0561239, lng: 39.0138663},
        {lat: 43.4351699, lng: 39.9182638},
        {lat: 55.9992328, lng: 92.9193416},
        {lat: 55.6400975, lng: 37.6077231},
        {lat: 68.969097,  lng: 33.0687003},
        {lat: 56.32513,   lng: 43.9437603},
        {lat: 55.0296808, lng: 82.9164256},
        {lat: 52.980238,  lng: 36.0683233},
        {lat: 58.0156126, lng: 56.2777176},
        {lat: 43.0932264, lng: 131.9191213},
        {lat: 47.2769618, lng: 39.7141992},
        {lat: 54.628889,  lng: 39.7293403},
        {lat: 53.217663,  lng: 50.2384593},
        {lat: 53.5111149, lng: 49.4118433},
        {lat: 45.0378094, lng: 41.9725492},
        {lat: 55.8239621, lng: 49.1457356},
        {lat: 56.8341,    lng: 35.8992093},
        {lat: 54.1752418, lng: 37.5969542},
        {lat: 60.932669,  lng: 76.6159743},
        {lat: 61.2588357, lng: 73.3996139},
        {lat: 56.871192,  lng: 53.2233872},
        {lat: 55.1580052, lng: 61.3831673},
        {lat: 56.125814,  lng: 47.2469613},
        {lat: 57.5853718, lng: 39.8522656},
        {lat: 50.6006149, lng: 36.5742594},
        {lat: 48.511466,  lng: 44.5425933},
        {lat: 51.6376023, lng: 39.2368126},
        {lat: 52.581614,  lng: 39.5351113},
        {lat: 51.7422718, lng: 36.1492268},
        {lat: 58.6039153, lng: 49.6758668},
        {lat: 55.3642063, lng: 86.0705141},
        {lat: 54.7116059, lng: 20.5346844},
        {lat: 54.515221,  lng: 36.2408493},
      ];

      var markers = [];
      var map;

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          mapTypeControl: false,
          disableDefaultUI: true,
          center: {lat: 62.3371518, lng: 90.2720958},
          styles: [
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#6600ff"
            },
            {
                "saturation": "-16"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "0"
            },
            {
                "gamma": "0.7"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "27"
            },
            {
                "hue": "#3200ff"
            },
            {
                "lightness": "3"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "weight": "0.01"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-58"
            },
            {
                "lightness": "28"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-31"
            },
            {
                "lightness": "7"
            },
            {
                "visibility": "on"
            },
            {
                "gamma": "1"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "weight": "1"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.01"
            },
            {
                "gamma": "1"
            },
            {
                "lightness": "0"
            },
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-58"
            },
            {
                "lightness": "28"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-58"
            },
            {
                "lightness": "28"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "-58"
            },
            {
                "lightness": "28"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-58"
            },
            {
                "lightness": "28"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-58"
            },
            {
                "lightness": "28"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-58"
            },
            {
                "lightness": "28"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#6600ff"
            },
            {
                "saturation": "-57"
            },
            {
                "lightness": "-28"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "lightness": "-100"
            },
            {
                "saturation": "10"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": "0"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": "100"
            },
            {
                "saturation": "100"
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "-45"
            },
            {
                "weight": 1.3
            },
            {
                "color": "#6600ff"
            },
            {
                "saturation": "-57"
            },
            {
                "gamma": "2.35"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#5e00ff"
            },
            {
                "saturation": -16
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -72
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -65
            },
            {
                "hue": "#1900ff"
            },
            {
                "lightness": 8
            }
        ]
    }
],
        });
          
          
      }

      function drop() {
        clearMarkers();
        for (var i = 0; i < neighborhoods.length; i++) {
          addMarkerWithTimeout(neighborhoods[i], i * 300);
        }
      }

      function addMarkerWithTimeout(position, timeout) {
        window.setTimeout(function() {
          markers.push(new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
          }));
        }, timeout);
      }

      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      };

//Menu Acco.

        $(document).ready(function () {

          if (checkCookie != "") {
            $('#menu > li.sub > a:eq('+checkCookie+')').addClass('active').next().show();
          }
          $('#menu > li.sub > a').click(function(){
              var navIndex = $('#menu > li.sub > a').index(this);
              $.cookie("sub-nav", navIndex);
              $('#menu li ul').slideUp();
               if ($(this).next().is(":visible")){
                   $(this).next().slideUp();
               } else {
               $(this).next().slideToggle();
               }
               $('#menu li a').removeClass('active');
               $(this).addClass('active');
          });
            var checkCookie = $.cookie("sub-link");
          if (checkCookie != "") {
            $('#menu > li.sub > ul li a:eq('+checkCookie+')').addClass('active');
          }
            $('.sub ul li a').click(function(){
                var subIndex = $('.sub ul li a').index(this);
              $.cookie("sub-link", subIndex);
           $('.sub ul li a').removeClass('active');
           $(this).addClass('active');
        });
        });

//City Form Changer Settings.

$(document).ready(function(){
    $('.city-link').on('click', function(){
        $('.popup__cities').toggle();
    });
    
    
});

$(document).ready(function(){
    $('.popup__close').on('click', function(){
        $('.popup__cities').toggle();
    });
});

$(document).ready(function(){
    $('.popup__bg').on('click', function(){
        $('.popup__cities').toggle();
    });
});

//Cart_unlogin shadow.

var containers = $('.reg__container-left, .reg__container-right').on({
    mouseenter: function() {
        containers.not(this).addClass('show_bg');
        $(this).removeClass('show_bg');
    },
    mouseleave: function() {
        containers.removeClass('show_bg');
    }
});

 //Test owl. 

var $carousel = $(".buyer__slider");
$('owl-carousel').owlCarousel({
    stagePadding: 50,
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})


//My orders settings.

document.addEventListener("DOMContentLoaded", function(){
var main = document.querySelector('th input[type="checkbox"]'),
    all = document.querySelectorAll('td input[type="checkbox"]');

for(var i=0; i<all.length; i++) {  // 1 и 2 пункт задачи
    all[i].onclick = function() {
        var allChecked = document.querySelectorAll('td  [type="checkbox"]:checked').length;
        main.checked = allChecked == all.length;
        main.indeterminate = allChecked > 0 && allChecked < all.length;
    }
}


main.addEventListener("click", function() {  // 3
    for(var i=0; i<all.length; i++) {
        all[i].checked = this.checked;
    }
});
});

//Pop up main 




//Pop up cart.

$(document).ready(function(){
    $('.change-size__1').on('click', function(){
        $('.popup-cart__sizes-1').toggle();
    });  
});

$(document).ready(function(){
    $('.popup__close-link-1').on('click', function(){
        $('.popup-cart__sizes-1').toggle();
    });
});

$(document).ready(function(){
    $('.popup__main-item-one').on('click', function(){
        $('.popup-cart__sizes-1').toggle();
    });
});

$(document).ready(function(){
    $('.popup-cart__bg-1').on('click', function(){
        $('.popup-cart__sizes-1').toggle();
    });
});

//Second Popup

$(document).ready(function(){
    $('.change-size__2').on('click', function(){
        $('.popup-cart__sizes-2').toggle();
    });  
});

$(document).ready(function(){
    $('.popup-cart__bg-2').on('click', function(){
        $('.popup-cart__sizes-2').toggle();
    });
});

$(document).ready(function(){
    $('.popup__main-item-two').on('click', function(){
        $('.popup-cart__sizes-2').toggle();
    });
});

$(document).ready(function(){
    $('.popup__close-link-2').on('click', function(){
        $('.popup-cart__sizes-2').toggle();
    });
});




//Left menu catalog.

jQuery.fn.initMenu = function() {  
    return this.each(function(){
        var theMenu = $(this).get(0);
        $('.acitem', this).hide();
        $('li.expand > .acitem', this).show();
        $('li.expand > .acitem', this).prev().addClass('active');
        $('li a', this).click(
            function(e) {
                e.stopImmediatePropagation();
                var theElement = $(this).next();
                var parent = this.parentNode.parentNode;
                if($(parent).hasClass('noaccordion')) {
                    if(theElement[0] === undefined) {
                        window.location.href = this.href;
                    }
                    $(theElement).slideToggle('normal', function() {
                        if ($(this).is(':visible')) {
                            $(this).prev().addClass('active');
                        }
                        else {
                            $(this).prev().removeClass('active');
                        }    
                    });
                    return false;
                }
                else {
                    if(theElement.hasClass('acitem') && theElement.is(':visible')) {
                        if($(parent).hasClass('collapsible')) {
                            $('.acitem:visible', parent).first().slideUp('normal', 
                            function() {
                                $(this).prev().removeClass('active');
                            }
                        );
                        return false;  
                    }
                    return false;
                }
                if(theElement.hasClass('acitem') && !theElement.is(':visible')) {         
                    $('.acitem:visible', parent).first().slideUp('normal', function() {
                        $(this).prev().removeClass('active');
                    });
                    theElement.slideDown('normal', function() {
                        $(this).prev().addClass('active');
                    });
                    return false;
                }
            }
        }
    );
});
};

$('.cat__ul').initMenu();




//Cart sizes onclick 




//First window.

$('.popup__main-one50').on('click', function() {
  $('.size__main1').html('50'); // либо .text()
});

$('.popup__main-one52').on('click', function() {
  $('.size__main1').html('52');
});

$('.popup__main-one54').on('click', function() {
  $('.size__main1').html('54');
});

$('.popup__main-one56').on('click', function() {
  $('.size__main1').html('56');
});

$('.popup__main-one58').on('click', function() {
  $('.size__main1').html('58');
});

$('.popup__main-one60').on('click', function() {
  $('.size__main1').html('60');
});

//Second window

$('.popup__main-two50').on('click', function() {
  $('.size__main2').html('50'); // либо .text()
});

$('.popup__main-two52').on('click', function() {
  $('.size__main2').html('52');
});

$('.popup__main-two54').on('click', function() {
  $('.size__main2').html('54');
});

$('.popup__main-two56').on('click', function() {
  $('.size__main2').html('56');
});

$('.popup__main-two58').on('click', function() {
  $('.size__main2').html('58');
});

$('.popup__main-two60').on('click', function() {
  $('.size__main2').html('60');
});

