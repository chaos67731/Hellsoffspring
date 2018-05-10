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
    $.each(monsterPagesNew, function(page) {
        $('#monsters').append(`
          <option value="${monsterPagesNew[page].page}">
            ${monsterPagesNew[page].text}
          </option>
        `);
    }); 
    // Make array Random
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }    
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
        setTimeout(RandomMonsterList, 10);
    }else{
        $('body').addClass('StartPage');
        $("#js-content").load('partials/start.html');
        setTimeout(RandomMonsterList, 10);
    }
    // Hash Changes
    window.onhashchange = function () {
        setTimeout(ContentToLoad, 100);
        setTimeout(scrollTop, 10);
        setTimeout(RandomMonsterList, 10);
    }
    // What to load Function
    function ContentToLoad() {
        var hash = document.URL.substr(document.URL.indexOf('#') + 1);
        // For Google Analytics
        ga('send', 'pageview', location.pathname + '#' + hash);
        isThereMonster = monsterPagesNew.filter(vendor => (vendor.page === hash));

        // if(hash in monsterPages){
        if (isThereMonster.length === 1){
            $('#monsters option[value="' + hash + '"]').attr("selected", "selected");   
            // Monster Page
            if ($("body").hasClass("SearchPage")) {}else{
                $("#js-content").load('partials/search.html');
            };
            $.getScript('pages/' + hash + '.js', function() {
                function LoadMonsterPage() {
                    $('[data-item="name"]').html(name);
                    $('[data-item="img"]').html('<img src="/monsters/'+img.trim()+'" class="img" title="The '+name.trim()+'" alt="'+name.trim()+'"/>');
                    $('[data-item="meter"]').html(meter.trim()+'%');
                    $('[data-item="description"]').hide().html(description).delay(contentFade).slideDown(1000);
                    $('[data-item="lives"]').hide().html(lives).delay(contentFade).slideDown(contentFade);
                    $('[data-item="kill"]').hide().html(kill).delay(contentFade).slideDown(contentFade);
                    $('[data-item="eats"]').hide().html(eats).delay(contentFade).slideDown(contentFade);
                    $('.DangerScaleValue').attr("id", 'percent' + meter);
                    // 
                    document.title = name + ' - ' + siteName;                  
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
                // 
                $('body').removeClass('StartPage');
                $('body').removeClass('NormalPage');
                $('body').addClass('SearchPage');                 
            });
        } else if (hash in normalPages){
            // Normal Page
            $("#js-content").load('pages/html/'+hash+'.html');
            // if(jQuery.inArray(hash, monsterPages) !== -1){}
            $('body').removeClass('StartPage');
            $('body').removeClass('SearchPage');
            $('body').addClass('NormalPage');

            $('.chosen-single span').html('Pick a Monster');
            $.each(normalPages, function(file, name) {
                if (hash == file) {
                    document.title = name + ' - ' + siteName;
                }        
            });
            $("#monsters").val("home");

        }else if (window.location.pathname == '/'){
            $("#js-content").load('partials/start.html');
        }else{
            $("#js-content").load('partials/error.html');
             document.title = 'Not Found - ' + siteName;
        }
    } 
    // Click Top Logo
    $( "#logoTitle" ).click(function() {
        event.preventDefault();
        $('body').addClass('StartPage');
        $('body').removeClass('SearchPage');
        $('body').removeClass('NormalPage');        
        var uri = window.location.toString();
        if (uri.indexOf("#") > 0) {
            document.title = siteName;
            $('#monsters').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
            $("#js-content").load('partials/start.html');
            var clean_uri = uri.substring(0, uri.indexOf("#"));
            window.history.replaceState({}, document.title, clean_uri);
            setTimeout(scrollTop, 10);
        }
    });
    // 
    function scrollTop() {
        $("html, body").animate({
            scrollTop: 0
        }, contentFade).delay(200);
    }

    // The Random Monster List
    function RandomMonsterList() {
        var theRandomMonsterList = monsterPagesNew.sort( function() { return 0.5 - Math.random() } );
        $( "#randomMonsters" ).after().html(`
            <a href="#${theRandomMonsterList[0].page}" class="col-12 col-md-3 randomMonsterBlock" style="background-image: url(/monsters/${theRandomMonsterList[0].img})">
              <div>${theRandomMonsterList[0].text}</div>
            </a>
            <a href="#${theRandomMonsterList[1].page}" class="col-12 col-md-3 randomMonsterBlock" style="background-image: url(/monsters/${theRandomMonsterList[1].img})">
              <div>${theRandomMonsterList[1].text}</div>
            </a>
            <a href="#${theRandomMonsterList[2].page}" class="col-12 col-md-3 randomMonsterBlock" style="background-image: url(/monsters/${theRandomMonsterList[2].img})">
              <div>${theRandomMonsterList[2].text}</div>
            </a>
        `);
    };




 
 

});