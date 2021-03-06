var timeCurrent = moment();

// set time from 9am to 5pm
const totalHour = 9;
const startHour = 9;


function changeClass(element, target) {
    var classList = ['past', 'present', 'future'];
    var idx = classList.indexOf(target);

    for (var i = 0; i < classList.length; i++) {
        if (i === idx) {
            element.toggleClass(classList[i], true);
        } else {
            element.toggleClass(classList[i], false);
        }
    }
};


// add function to generate all the needed time rows
function generateRows() {
    
    var o1El = $("<o1>");
    o1El.attr("class", "time-block");
    $('.container').append(o1El);

    // individual rows
    for (var i = startHour; i < 18; i++) {
        var liEl = $("<li>");
        liEl.attr("class", "row");
        $('.time-block').append(liEl);

        var str = "";
        var h = i % 24;
        if (h < 12) {
            str = h + "AM";
        } else if (h == 12) {
            str = h + "PM";
        } else {
            str = (h - 12) + "PM";
        };

        var label = $("<label>");
        label.attr("class", "col-1 hour py-3");
        label.text(str);

        var inputEl = $("<textarea>");
        inputEl.attr({
            'class': "col-10",
            'id': str,
            'data-begin': h,
        });

        label.attr("for", inputEl.attr('id'));
        inputEl.val(localStorage.getItem(inputEl.attr('id')));

        var saveBtn = $('<button>');
        saveBtn.attr("class", "col-1 saveBtn");
        saveBtn.html("<i class='fa fa-save'></i>")

        liEl.append(label).append(inputEl).append(saveBtn);

        saveBtn.click(callBack);
    }
};

// change color function
function setTime() {

    dateToday = timeCurrent.format('LL');
    $('#currentDay').text(dateToday);

    $('textarea').each(function() {
        if ($(this).attr('data-begin') < timeCurrent.hour()) {
            changeClass($(this), 'past');
        } else if ($(this).attr('data-begin') == timeCurrent.hour()) {
            changeClass($(this), 'present');
        } else {
            changeClass($(this), 'future');
        }
    });
};

// allow callback function for clicking save button eventListener
function callBack(event) {
    var element = $(event.target);
    if (element.is("i")) {
        element = element.parent();
    }

    var inputEl = element.prev();
    var key = inputEl.attr('id');
    var value = inputEl.val();
    localStorage.setItem(key, value);
}

$(document).ready(function() {
    generateRows();
    setTime();

    // slot time update for every hour
    var timer = setInterval(function() {
        timeCurrent = moment();
        var currentMin = currentTime.minute();
        minBeforeRefresh = (60 - currentMin) % 60;
        if (minBeforeRefresh === 0) {
            setTime();
        }
    }, 1000 * 60);
});

generateRows();