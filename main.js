/* Variables */
var count = 0;
var randomTimer;
var jsonReturn;
var loadDelay = 2500;
var runCount = 0;


/* Random.org Functions */
function getMyAjaxContent(submitTo,dataString,dataType) {
    
    var ajaxResult = $.ajax({
        dataType:dataType,
        data: dataString,
        url: submitTo,
        timeout: 30000
    });
    
	return ajaxResult;	
    
}


function runJSON() {
    
    var listOfCharacters = $('.characters .character:not(.disabled)');
    
    if (listOfCharacters.length >= 2) {
        var otherUrl = "https://www.random.org/integers/?num=1&min=1&max=" + listOfCharacters.length + "&col=1&base=10&format=plain&rnd=new";
        var ajaxRequest = getMyAjaxContent(otherUrl,"","html");
        ajaxRequest.success(function (json) {
            returnJSON(json);
        });
    } else {
        console.log("Not Run");
        clearTimeout(randomTimer);
        $('.button').removeClass('disabled');
        enableDisableToggle();
        randomSelect();
        resetSelections();
        stopRandom();
    }
    
}
    

function returnJSON(returnedData) {

    clearTimeout(randomTimer);
    jsonReturn = parseInt(returnedData);
    
    var listOfCharacters = $('.characters .character:not(.disabled)');
    var random = returnedData;
    var result = $('.characters .character:not(.disabled)')[random];

    $('.result').html($(result).html()); 
    $('.button').removeClass('disabled');
    
    enableDisableToggle();
    randomSelect();
    resetSelections();
    stopRandom();
    
}



function enableDisableToggle() {
    $('.characters .character').click(function() {
       $(this).toggleClass('disabled');
    });
}


function randomSelect() {
    $('.random-button').click(function() {
        $('.button').addClass('disabled');
        $('.button').unbind('click');
        $('.characters .character').unbind('click');
        loadingCharacter();
        setTimeout(function() {
            runJSON();
        },loadDelay);
    });
}

function loadingCharacter() {
    clearTimeout(randomTimer);
    var listOfCharacters = $('.characters .character:not(.disabled)');
    var random = Math.floor(Math.random() * (listOfCharacters.length));
    var result = $('.characters .character:not(.disabled)')[random];
    $('.result').html($(result).html());
    randomTimer = setInterval(function() {
        listOfCharacters = $('.characters .character:not(.disabled)');
        if (listOfCharacters.length < 1) {
            $('.result').html('');
        } else {
            random = Math.floor(Math.random() * (listOfCharacters.length));
            result = $('.characters .character:not(.disabled)')[random];
            $('.result').html($(result).html());
        }
    },75);
}

function stopRandom() {
    $('.stop-button').click(function() {
        clearTimeout(randomTimer);
    });
}

function resetSelections() {
     $('.reset-button').click(function() {
         $('.character').each(function() {
            $(this).removeClass('disabled'); 
         });
         $('.result').html('');
        clearTimeout(randomTimer);
     });
}

$(document).ready(function() {	
    enableDisableToggle();
    randomSelect();
    resetSelections();
    stopRandom();
});