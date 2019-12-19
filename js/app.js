$('.carousel__inner').slick({
  speed: 1200,
  adaptiveHeight: true,
  prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
  nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
  responsive: [
    {
      breakpoint: 992,
      settings: {                  
        dots: false,
        arrows: true
      }
    }            
  ]
});
    
sendRequest('GET', 'js/data.json').then((products) => {
  createCatalogContent(products, '#catalog__running', 'running');
  createCatalogContent(products, '#catalog__cycling', 'cycling');
  createCatalogContent(products, '#catalog__fitness', 'fitness');

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index())
      .addClass('catalog__content_active');          
  });      

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item_back');

  //Modal

  $('[data-modal=consultation]').on('click', () => {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', () => {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });      
  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });
});

validateForms('#consultation-form');
validateForms('#order form');
validateForms('#consultation form');

$('input[name=phone]').mask("+38 (999) 999-9999");      

//Smooth scroll and page up
$(window).scroll(function() {
  if ($(this).scrollTop() > 800) {
    $('.page-up').fadeIn();
  } else {
    $('.page-up').fadeOut();
  }        
});

$(".page-up").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

//WOW
new WOW().init();

