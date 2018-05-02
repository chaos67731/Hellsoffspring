$(document).ready(function() {
    // Run service Worker
    navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // console.log('Excellent, registered with scope: ', registration.scope);
    });    
    // Vars 1: site hash 2: the year 3: Page Title
    var hash = document.URL.substr(document.URL.indexOf('#') + 1),
        year = new Date().getFullYear(),
        siteName = "Hell's Offspring",
        contentFade = 150;
    // Set Page Title
    document.title = siteName;
    // Site Name
    $('[data-item="siteName"]').html(siteName);
    // logo Title
    $('#logoTitle').attr("title", siteName);
    // The Year
    $('[data-item="year"]').html(year); 
    // Load the dropdown and make it nice
    $.each(monsterPages, function(file, name) {
        $('#monsters').append('<option class="view" value="' + file + '">' + name + '</option>');
    });
    $("#monsters").chosen({});
    // When Dropdown Used    
    $('[class="DropDown"]').change(function() {
        var valueSelected = this.value; // Vars of what was selected        
        $('#monsters option[value="' + hash + '"]').attr("selected", "selected"); // Set option
        // Changes the Hash #
        var url = $(this).val();
        window.location.hash = url;
    });
    // If Site Has Hash // Else Load home page
    if (window.location.hash) {
        setTimeout(ContentToLoad, 10);
    }else{
        $("#js-content").load('partials/start.html');        
    }
    // Hash Changes
    window.onhashchange = function () {
        setTimeout(ContentToLoad, 10);
        $("html, body").animate({
            scrollTop: 0
        }, contentFade );
    }
    // What to load Function
    function ContentToLoad() {
        var hash = document.URL.substr(document.URL.indexOf('#') + 1);
        // For Google Analytics
        ga('send', 'pageview', location.pathname + '#' + hash);
        if(hash in monsterPages){
            $('#monsters option[value="' + hash + '"]').attr("selected", "selected");
            // Monster Page
            $("#js-content").load('partials/search.html');
            $.getScript('pages/' + hash + '.js', function() {
                
                function LoadMonsterPage() {
                    $('[data-item="name"]').append(name);
                    $('[data-item="img"]').html('<img src="/monsters/'+img.trim()+'" class="img" title="The '+name.trim()+'" alt="'+name.trim()+'"/>');
                    $('[data-item="meter"]').html(meter.trim()+'%');
                    $('[data-item="description"]').hide().html(description).delay(contentFade).slideDown(1000);
                    $('[data-item="lives"]').hide().html(lives).delay(contentFade).slideDown(contentFade);
                    $('[data-item="kill"]').hide().html(kill).delay(contentFade).slideDown(contentFade);
                    $('[data-item="eats"]').hide().html(eats).delay(contentFade).slideDown(contentFade);
                    $('.DangerScaleValue').attr("id", 'percent' + meter);

                    // 
                    $.each(monsterPages, function(file, name) {
                        if (hash == file) {
                            document.title = name + ' - ' + siteName;
                        }        
                    });                    
                    // chosen-focus-input
                    $('.chosen-single span').html('Learning About: <strong>' + name + '</strong>');
                    // Danger Meter
                    var progressValue = document.querySelector('.DangerScaleValue'),
                        RADIUS = 54,
                        CIRCUMFERENCE = 2 * Math.PI * RADIUS;

                    function progress(value) {
                        var progress = value / 100,
                            dashoffset = CIRCUMFERENCE * (1 - progress);
                        progressValue.style.strokeDashoffset = dashoffset;
                    }
                    progressValue.style.strokeDasharray = CIRCUMFERENCE;
                    progress(100);
                    progress(meter);
                }
                setTimeout(LoadMonsterPage, 100);
            });
        } else if (hash in normalPages){
            // Normal Page
            $("#js-content").load('pages/html/'+hash+'.html');
            if(jQuery.inArray(hash, monsterPages) !== -1){}
            $('.chosen-single span').html('Pick a Monster');
            $("meta[property='og\\:image']").attr("content", 'https://hellsoffspring.com/preview.jpg');
            $.each(normalPages, function(file, name) {
                if (hash == file) {
                    document.title = name + ' - ' + siteName;
                }        
            });
            $("#monsters").val("home");

        }else if (window.location.pathname == '/'){
            $("#js-content").load('partials/start.html');
            $("meta[property='og\\:image']").attr("content", 'https://hellsoffspring.com/preview.jpg');
        }else{
            $("#js-content").load('partials/error.html');
            document.title = 'Not Found - ' + siteName;
            $("meta[property='og\\:image']").attr("content", 'https://hellsoffspring.com/preview.jpg');

        }
    } 
    // Click Top Logo
    $( "#logoTitle" ).click(function() {
        event.preventDefault();
        $('body').addClass('StartPage');
        $('body').removeClass('SearchPage');
        var uri = window.location.toString();
        if (uri.indexOf("#") > 0) {
            document.title = siteName;
            $('#monsters').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
            $("#js-content").load('partials/start.html');
            var clean_uri = uri.substring(0, uri.indexOf("#"));
            window.history.replaceState({}, document.title, clean_uri);
        }
    });
});