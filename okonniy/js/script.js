$(document).ready(function () {
    

    $('.show-input').on('click', function(){
      $(this).parent().find('.hidden-input').removeClass('hidden')
    })
    
    $('.slider-vertical').slick({
        vertical: true,
        verticalSwiping: true,
        slidesToShow: 3,
        autoplay: true,
        dots: true,
        // arrows: false,
        nextArrow: '<button class="slick-prev slick-arrow" aria-label="Next" type="button"><svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 11L11.3214 1.69366C10.9231 1.31065 10.2896 1.32333 9.90691 1.72196L1 11" stroke="#06F2F2" stroke-width="2" stroke-linecap="round"/></svg></button>',
        prevArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L10.6786 10.3063C11.0769 10.6893 11.7104 10.6767 12.0931 10.278L21 1" stroke="#06F2F2" stroke-width="2" stroke-linecap="round"/></svg></button>',
        swipeToSlide: true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                swipeToSlide: false,
                dots: false,
                arrows: false
              }
            }
        ]
        
    });

  

    $('.car__desc-more').on('click', function(){
      $(this).remove();
      $('.car__desc').addClass('car__desc--open')
    })

    $('.header-photos').slick({
      slidesToShow: 1,
      infinite: true,
      autoplay: false,
      dots: false,
      nextArrow: '<button class="slick-prev slick-arrow" aria-label="Next" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="82" fill="none" viewBox="0 0 12 82">  <path stroke="#06F2F2" stroke-linecap="round" stroke-width="2" d="M11 1L1.059 42.357a1 1 0 00.004.485L11 81"/></svg></button>',
      prevArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="82" fill="none" viewBox="0 0 12 82">  <path stroke="#06F2F2" stroke-linecap="round" stroke-width="2" d="M1 81l9.941-41.357a1 1 0 00-.004-.485L1 1"/></svg></button>',
      asNavFor: '.header-slider-nav',
      

    })
    $('.header-photos').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      console.log(currentSlide + ' - ' + nextSlide);
      $('#photos-slide-'+nextSlide+' video').attr('autoplay', '');
      $('#photos-slide-'+currentSlide+' video').removeAttr('autoplay');
    });
    $('.header-slider-nav').slick({
      slidesToShow: 5,
      infinite: true,
      dots: true,
      // arrows: false,
      centerMode: true,

      asNavFor: '.header-photos',
      prevArrow: '<button class="slick-arrow slick-prev"><svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L1.69366 10.6786C1.31065 11.0769 1.32333 11.7104 1.72196 12.0931L11 21" stroke="#06F2F2" stroke-width="2" stroke-linecap="round"/></svg></button>',
      nextArrow: '<button class="slick-arrow slick-next"><svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">      <path d="M1 21L10.3063 11.3214C10.6893 10.9231 10.6767 10.2896 10.278 9.90691L1 1" stroke="#06F2F2" stroke-width="2" stroke-linecap="round"/></svg></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: false,

            slidesToShow: 3,
            arrows: false
          }
        },
        {
          breakpoint: 550,
          settings: {
            centerMode: false,

            slidesToShow: 2,
            arrows: false

          }
        }
    ]

    })


    function getSearch(){
      let brand = $('.form-select').val()
      let date_start = $('#s-date-start').val()
      let date_end = $('#s-date-end').val()
      let price_min = $('.noUi-handle-lower').attr('aria-valuenow');
      let price_max = $('.noUi-handle-upper').attr('aria-valuenow');

      let ret = '?brand='+brand+'&date_start='+date_start+'&date_end='+date_end+'&price_min='+price_min+'&price_max='+price_max;
      let href =  $('.search-btn').attr('href');
      href = href.substring(0, href.length-1)+ret;
      console.log(href)
      $('.search-btn').attr('href', href);
    }

    $('.search-block input, .search-block select').on('change', function(){
      console.log(getSearch());
    })
    
    $('#range').on('click', function(){
      console.log(getSearch());
    })

    $('.eye-slider').on('click', function(){
      let nav_slider = $('.header-slider-nav');
      console.log(nav_slider)
      if (!nav_slider.hasClass('opacity-hidden')){
        nav_slider.addClass('opacity-hidden');
      }
      else {
        nav_slider.removeClass('opacity-hidden');

      }
    });


    $('input, select').on('change', function(){
      $("#f-date-start").val($("#date-start").val() + ' ' + $('#time-start').val())
      $("#f-date-end").val($("#date-end").val() + ' ' + $('#time-end').val())
    })
 
    $('.order-catalog').on('click', function(){
      let name = $(this).attr('data-name');
      $('#car-input').val(name);
    })

    

    let checkPrice = function(){
      let date1 = new Date($('#date-start').val());
      let date2 = new Date($('#date-end').val());
      var daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24))
      let val = 1;
      let last_val = 1;
      if (!daysLag){
        daysLag = 1;
      }
      console.log(daysLag);

      for (let entry of prices){
        console.log( entry[0] + ' ' +  entry[1]);
        last_val = entry[1]
        if (daysLag<=entry[0]){
          val = entry[1]
          break;
        } 
        
        else{
          val=last_val;
        }
      }

      console.log(val);
      $('.change-price').html(val);
      $('.change-total').html(val*daysLag);
    }

    if($('.date-time-input').length){
      checkPrice();
      $('.date-time-input input[type=date]').on('change', ()=>{
        checkPrice();
      })

    }
})