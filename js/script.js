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
        "featureType": "administrative.neighborhood",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ff478f"
            },
            {
                "saturation": -58
            },
            {
                "lightness": 83
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ff478f"
            },
            {
                "lightness": 73
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
        "featureType": "poi.attraction",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#3bff00"
            },
            {
                "color": "#ff478f"
            },
            {
                "visibility": "on"
            },
            {
                "weight": 0.6
            },
            {
                "lightness": 58
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#808080"
            },
            {
                "hue": "#ff0000"
            },
            {
                "saturation": 50
            },
            {
                "lightness": -13
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ff478f"
            },
            {
                "lightness": 73
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


//Changer (Select2)


//City Changer.

var mixer = mixitup('.selector__cities');