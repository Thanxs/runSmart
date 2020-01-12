"use strict";

function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.responseType = 'json';
              
      xhr.addEventListener('load', () => {
        if (xhr.status >= 400) {
            reject(xhr.response);
          } else {                                  
            resolve(xhr.response);
          }
      });
  
      xhr.send();
    });
}

function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
}

function createCatalogContent(products, selector, categoryName) {
    let productsByCategory = products.filter((product) => {
      return product.category === categoryName;
    });           
    
    $(productsByCategory).each((_, product) => {
      $(selector).append(`
          <div class="catalog-item">
              <div class="catalog-item__wrapper">
                  <div class="catalog-item__content catalog-item__content_active">
                      <img src="${product.picture}" alt="пульсометр" class="catalog-item__img">
                      <div class="catalog-item__subtitle">${product.name}</div>
                      <div class="catalog-item__descr">${product.description}</div>
                      <a href="#" class="catalog-item__link">ПОДРОБНЕЕ</a>
                  </div>
                  <ul class="catalog-item__list">
                      <li>Вы услышите звуковое оповещение о нужном пульсе во время тренировки;</li>
                      <li>Вы увидите информативный графический индикатор целевых тренировочных зон пульса;</li>
                      <li>Также Вы увидите информацию о расходе калорий за тренировку;</li>
                      <li>Вы сможете посмотреть данные по 10 тренировкам.</li>
                      <a href="#" class="catalog-item_back">назад</a>
                  </ul>
              </div>
              <hr>
              <div class="catalog-item__footer">
                  <div class="catalog-item__prices">
                      <div class="catalog-item__old-price">${product.oldPrice}</div>
                      <div class="catalog-item__new-price">${product.newPrice}</div>
                  </div>
                  <button class="button button_mini">КУПИТЬ</button>
              </div>
          </div>`);
    });        
  }

//Validate forms          
function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        }
      },
      name: 'required',
      phone: 'required',
      email: {
        required: true,
        email: true
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  }