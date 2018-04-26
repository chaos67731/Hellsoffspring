$(document).ready(function() {
    // Run service Worker
    navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // console.log('Excellent, registered with scope: ', registration.scope);
    });    
    // Vars 1: site hash 2: the year 3: Page Title
    var hash = document.URL.substr(document.URL.indexOf('#') + 1),
        year = new Date().getFullYear(),
        pageName = "Hells Offspring",
        contentFade = 150;
    // Set Page Title
    document.title = pageName;
    // Site Name
    $('[data-item="siteName"]').html(pageName);
    // logo Title
    $('#logoTitle').attr("title", pageName);
    // The Year
    $('[data-item="year"]').html(year); 
    // Load the dropdown and make it nice
    $.each(monsterPages, function(file, name) {
        $('#monsters').append('<option value="' + file + '">' + name + '</option>');
    });
    $("#monsters").chosen({});
    // Load Content partials
    $.fn.WhatContent = function() {
        var MenuSetTo = $('#monsters').val();
        if (MenuSetTo == null) {
            $("#js-content").load('partials/start.html');
            $('body').addClass('StartPage');
            $('body').removeClass('SearchPage');
        } else {
            $("#js-content").load('partials/search.html');
            $('body').removeClass('StartPage');
            $('body').addClass('SearchPage');
        }
    }
    $('#monsters').change(function() {
        if ($('body').hasClass('SearchPage')) {} else {
            $.fn.WhatContent();
        }
    });
    //based on the hash
    if (window.location.hash) {
        if (window.location.href.indexOf('#' + hash) > -1) {
            // select dropdown 
            $('#monsters option[value="' + hash + '"]').attr("selected", "selected");
            $.fn.WhatContent();
            // Load the content                 
            $.getScript('pages/' + hash + '.js', function() {
                $.fn.ShowMonsterContent();
            }).fail(function(){
                $("#js-content").load('partials/error.html');
            });;
        }

    } else {
        $.fn.WhatContent();
    }
    // When someone picks a monster    
    $('[class="DropDown"]').change(function() {
        var valueSelected = this.value; // Vars of what was selected        
        // Scroll to Top after picking a new monster
        $("html, body").animate({
            scrollTop: 0
        }, contentFade );
        // Set option
        $('#monsters option[value="' + hash + '"]').attr("selected", "selected"); // Set option
        // load the content 
        $.getScript('pages/' + valueSelected + '.js', function() {
            $.fn.ShowMonsterContent();
        });
        // Changes the Hash #
        var url = $(this).val();
        window.location.hash = url;

    });
    // Change Out the congent 
    $.fn.ShowMonsterContent = function() {
        $('[data-item="name"]').html(name);
        // $('[data-item="name"]').load('pages/'+ hash +'.html #item-name');
        $('[data-item="img"]').html('<img src="img/monsters/' + img + '" class="img" title="The ' + name + '" alt="' + name + '"/>');
        $('[data-item="meter"]').html(meter + '%');
        $('[data-item="description"]').hide().html(description).delay(contentFade).slideDown(1000);
        $('[data-item="lives"]').hide().html(lives).delay(contentFade).slideDown(contentFade);
        $('[data-item="kill"]').hide().html(kill).delay(contentFade).slideDown(contentFade);
        $('[data-item="eats"]').hide().html(eats).delay(contentFade).slideDown(contentFade);
        $('.DangerScaleValue').attr("id", 'percent' + meter);
        // Page Title
        document.title = name + ' - ' + pageName;
        // Logo Title
        $('#logoTitle').attr("title", name + ' - ' + pageName);
        // chosen-focus-input
        $('.chosen-single span').html('Learning About: <strong>' + name + '</strong>');
        // Danger Meter
        var progressValue = document.querySelector('.DangerScaleValue');
        var RADIUS = 54;
        var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

        function progress(value) {
            var progress = value / 100;
            var dashoffset = CIRCUMFERENCE * (1 - progress);
            progressValue.style.strokeDashoffset = dashoffset;
        }

        progressValue.style.strokeDasharray = CIRCUMFERENCE;
        progress(100);
        progress(meter);
    }

    // Click Top Logo
    $( "#logoTitle" ).click(function() {
        var uri = window.location.toString();
        if (uri.indexOf("#") > 0) {
        $('body').addClass('StartPage');
        $('body').removeClass('SearchPage');
        $('#logoTitle').attr("title", pageName);
        document.title = pageName;
        $('#monsters').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
        $("#js-content").load('partials/start.html');
        var clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);
        }
        event.preventDefault();
    });

    // Wills Page
   $('[data-action="WillRiter"]').click(function() {
        if (window.location.href.indexOf('#WillRiter') > -1) {}else{
            parent.location.hash = '#WillRiter';
            $("#js-content").load('partials/search.html');
            $('body').addClass('SearchPage');
            $('body').removeClass('StartPage');
            $('#monsters').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');    
            var whash = document.URL.substr(document.URL.indexOf('#WillRiter') + 1);
            setTimeout(function() {
               $.getScript('pages/' + whash + '.js', function() {
                    $.fn.ShowMonsterContent();
                }).fail(function(){
                    $("#js-content").load('partials/error.html');
                });;
            }, 30);
        }
        event.preventDefault();
    });

    // Load Basic Page
    function LoadBasicPage() {     
        PageHash = document.URL.substr(document.URL.indexOf('#') + 1);
        $("#js-content").load('pages/html/'+PageHash+'.html');
        console.log(PageHash);

        if(jQuery.inArray(PageHash, monsterPages) !== -1){
            console.log("yes?");
        }
    }
    // 
    $('[data-item="page"]').click(function() {
        setTimeout(LoadBasicPage, 100);
    });


 

















});