//Бургерное меню
$(document).ready(function(){
    $('.header_burger').click(function(event){
//Добавляется класс:
        $('.header_burger, .header_menu').toggleClass('active');
// При открытом меню блокируется прокрутка текста:
        $('.body').toggleClass('lock');
    })
});
//Карусель
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next', 
    prevEl: '.swiper-button-prev',
},
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

//Модальное окно
let open_modal = document.querySelectorAll('.open_modal');
let close_modal = document.getElementById('close_modal');
let modal = document.getElementById('modal');
let body = document.getElementsByTagName('body')[0];
for (let i = 0; i < open_modal.length; i++) {
	open_modal[i].onclick = function() { // клик на открытие
		modal.classList.add('modal_vis'); // добавляем видимость окна
		modal.classList.remove('bounceOutDown'); // удаляем эффект закрытия
		body.classList.add('body_block'); // убираем прокрутку
	};
}
close_modal.onclick = function() { // клик на закрытие
	modal.classList.add('bounceOutDown'); // добавляем эффект закрытия
    window.setTimeout(function() { // удаляем окно через полсекунды (чтобы увидеть эффект закрытия).
		modal.classList.remove('modal_vis'); 
		body.classList.remove('body_block'); // возвращаем прокрутку
	}, 500);
};
//Плавный скролл к якорю
$(function () {
  $("a.scrollto").click(function () {
    let elementClick = $(this).attr("href")
    let destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 1100);
    return false;
  });
});
//Маска для номера телефона
// var element = document.getElementById('phone');
// var maskOptions = {
//     mask: '+7(000)000-00-00',
//     lazy: false
// } 

// jQuery(function($){
//   $("#phone").mask("(999) 999-9999");
//   });
  	
// $("#phone").mask("+7(999) 999-9999");

// Считываем поле ввода
let phoneInput = document.querySelector("#phone");
// Считываем кнопку
let btn = document.querySelector(".btn");

// Создаем маску в инпуте
const phoneMask = new IMask(phoneInput, {
  mask: "+{7}(000)-000-0000",
});

// Обработчик события для инпута
phoneInput.addEventListener("input", phoneInputHandler);
// Обработчик события для кнопки
btn.addEventListener("click", btnHandler);

// Если ввели правильно - кнопка активна
function phoneInputHandler() {
  if (phoneMask.masked.isComplete) {
    btn.classList.add("btn--active");
  } else {
    btn.classList.remove("btn--active");
  }
}

// Отправляем номер телефона
async function btnHandler(e) {
  e.preventDefault();
  return await fetch("send_msg.php", {
    method: "POST",
    body: phoneMask.unmaskedValue,
  });
}

