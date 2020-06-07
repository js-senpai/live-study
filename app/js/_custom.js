'use strict';
document.addEventListener("DOMContentLoaded", function() {
    //Lazy Load
    let lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });
    lazyLoadInstance.update();
    //Scroll
    const scrollTo = (elem,attr) => {
        $(elem).on("click", function () {
            let anchor = $(this).attr(attr);
            console.log(anchor);
            $('html, body').stop().animate({
                scrollTop: $('#'+anchor).offset().top - 60
            }, 1500);
        });
    };
    //Submenu settings
    const submenuToggle = (button,item)=>{
        $(item).parent().append('<span class="fas fa-chevron-right toggle-btn"></span>');
        $(button).click(function () {
            $(this).toggleClass('active');
            $(this).siblings(item).fadeToggle('fast');
        });
        if($(window).width() > 990 && item === '.sub-menu') {
            $(item).parent().addClass('itsSubmenu');
            $('.itsSubmenu').mouseenter(function () {
                $(this).addClass('active');
                $(this).children(item).fadeIn('fast');
            });
            let parentClick = $(item).parent();
            parentClick.mouseleave(function () {
               $(this).removeClass('active');
               $(this).find(item).fadeOut('fast');
            });
        }
    };
    submenuToggle('.toggle-btn','.sub-menu');
    //Video slider
    $('.video-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<span class="fas fa-chevron-left btn slider-btn slider-btn-left"></span>',
        nextArrow: '<span class="fas fa-chevron-right btn slider-btn  slider-btn-right"></span>',
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 880,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });
    //Footer nav
    $('.footer-menu-item').prepend('<i class="fas fa-plus"></i>');
    //Header nav
    $('.toggle-nav').click(function () {
        $(this).toggleClass('active');
        $('.header-bottom').fadeToggle('slow');
    })
    // Youtube
    if($('.youtube').length>0){
        $('.youtube').each(function () {
            let youtube_url = $(this).attr('data-youtube');
            youtube_url = youtube_url.replace('https://www.youtube.com/watch?v=','');
            $(this).attr('data-youtube',youtube_url);
        });

    }
    //Video preview
    if($('.youtube').length>0) {
        (function () {
            if (!document.getElementsByClassName) {
                // Поддержка IE8
                const getElementsByClassName = function (node, classname) {
                    const a = [];
                    let re = new RegExp('(^| )' + classname + '( |$)');
                    let els = node.getElementsByTagName("*");
                    for (let i = 0, j = els.length; i < j; i++)
                        if (re.test(els[i].className)) a.push(els[i]);
                    return a;
                };
                var videos = getElementsByClassName(document.body, "youtube");
            } else {
                var videos = document.querySelectorAll(".youtube");
            }
            let nb_videos = videos.length;
            for (let i = 0; i < nb_videos; i++) {
                // Находим постер для видео, зная ID нашего видео
                if (videos[i].getAttribute('data-youtube-img') !== '') {
                    videos[i].style.backgroundImage = 'url(' + videos[i].getAttribute('data-youtube-img') + ')';
                } else {
                    videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].dataset.youtube + '/sddefault.jpg)';
                }
                // Размещаем над постером кнопку Play, чтобы создать эффект плеера
                const play = document.createElement("div"),
                    youtubeSettings = document.createElement('div');
                if (videos[i].getAttribute('data-youtube-text')) {
                    const youtubeText = document.createElement('div');
                    youtubeText.setAttribute('class', 'youtube-text');
                    youtubeText.textContent = videos[i].getAttribute('data-youtube-text');
                    youtubeSettings.appendChild(youtubeText);
                }
                play.setAttribute("class", "play");
                youtubeSettings.setAttribute('class', 'flex-container youtube-container');
                youtubeSettings.appendChild(play);
                videos[i].append(youtubeSettings);
                videos[i].onclick = function () {
                    // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
                    const iframe = document.createElement("iframe");
                    let iframe_url = "https://www.youtube.com/embed/" + videos[i].dataset.youtube + "?autoplay=1&autohide=1";
                    if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
                    iframe.setAttribute("src", iframe_url);
                    iframe.setAttribute("frameborder", '0');
                    // Высота и ширина iFrame будет как у элемента-родителя
                    iframe.style.width = this.style.width;
                    iframe.style.height = this.style.height;
                    // Заменяем начальное изображение (постер) на iFrame
                    this.parentNode.replaceChild(iframe, this);
                }
            }
        })();
    }
    //Service nav
    if($('.service-submenu').length>0) {
        submenuToggle('.toggle-btn', '.service-submenu');
    }
    if($('.service-nav').length>0){
        let currentUrl = document.location.href,
            currentItem = $(`.service-nav a[href="${currentUrl}"]`);
        currentItem.addClass('active');
        $('.service-nav a.active').parent('li').addClass('active').parent('ul').addClass('active').parent('li').addClass('active').parent('ul').addClass('active').parent('li').addClass('active').parent('ul').addClass('active');

    }
    //Table button
    if($('.service-content table').length>0){
        $('.service-content table').append(`
        <tr>
           <td></td>
           <td><button class="btn  btn-table-popup" data-package="Start">Order</button></td>
           <td><button class="btn  btn-table-popup" data-package="Start+">Order</button></td>
           <td><button class="btn  btn-table-popup" data-package="Standart">Order</button></td>
           <td><button class="btn  btn-table-popup" data-package="VIP">Order</button></td>
        </tr>
        `);
        $('.service-content table').after(`<span class="mobile-table-message">Rotate your device to see all table</span>`);
    }
    //Service number
    const listCount = (item) =>{
        if($(item).length>0){
            if(item === '.list-page-list.page-list-v2 .list-page-type'){
                $(item).each(function () {
                    $(this).addClass('fas fa-chevron-right');
                })
            }
            else if(item === '.list-page-list.page-list-v3 .list-page-type'){
                $(item).each(function () {
                    $(this).addClass('fas fa-check');
                })
            }
            else {
                let count = 0;
                $(item).each(function () {
                    count += 1;
                    $(this).text(count);
                })
            }
        }
    };
    listCount('.service-advantages-number');
    listCount('.list-page-list.page-list-v1 .list-page-type');
    listCount('.list-page-list.page-list-v2 .list-page-type');
    listCount('.list-page-list.page-list-v3 .list-page-type');
    //Popup
    const togglePopup = (button,item) =>{
        if($(button).length>0){
            $(button).click(function () {
                $(item).fadeIn(500);
            });
            $('.popup-close').click(function () {
                $(this).parent().parent().parent().fadeOut(500);
            });
            $(item).on( 'wpcf7submit', function( event ) {
               $(this).fadeOut(500);
            });
        }
    };
    togglePopup('.btn-table-popup','.popup-order');
    if($('.btn-table-popup').length>0){
        $('.btn-table-popup').click(function () {
            let currentPackage = $(this).attr('data-package');
            $('.popup-package').val(currentPackage);
        })
    }
    togglePopup('.btn-request','.popup-consult');
});

