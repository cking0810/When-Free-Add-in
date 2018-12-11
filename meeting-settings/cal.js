$(function () {
  var day = getMonday();
  var i = 0;
  $('[data-index]').each(function () {
    if (isToday(day)) {
      $(this).addClass('se lected');
    }
    $(this).attr('data-index', i++);
    $(this).attr('data-day', day.getDate());
    $(this).html(day.getDate());
    day = day.addDays(1);
    var holiday = getHoliday(day);
    if (holiday != null) {
      $(this).append('<span class="holiday">' + holiday + ' </span>');
    }
  });
})

$('body').on('click', '.day', onSelectDay);

var down = false;
var downIndex = -1;
var drag = true;
$('.day').mousedown(function () {
  event.preventDefault();
  if (!window.event.shiftKey && !window.event.ctrlKey) {
    down = true;
  }
  downIndex = $(this).data('index');
})
  .mousemove(function () {
    event.preventDefault();
    drag = true;
    if (down) {
      selectSpanFromTo(downIndex, $(this).data('index'));
    }
  })
  .mouseup(function () {
    down = false;
    var i = $(this).data('index');
    if (drag && downIndex != i) {
      //$('.holiday').text(downIndex + ' to ' + i);
      selectSpanFromTo(downIndex, i);
      downIndex = -1;
      drag = false;
    }
  });

function onSelectDay() {
  if (window.event.ctrlKey) {
    selectDay(this);
  } else if (window.event.shiftKey) {
    selectSpan(this);
  } else {
    unSelectAll();
    selectDay(this);
  }
}
function selectDay(element) {
  $(element).addClass('selected');
}
function unSelectAll() {
  $('.day').removeClass('selected');
}
function selectSpan(toElement) {
  var lowest = Number.MAX_SAFE_INTEGER;
  $('.selected').each(function () {
    var day = $(this).data('day');
    if (day < lowest) {
      lowest = day;
    }
  });
  var startIndex = $('[data-day="' + lowest + '"]').data('index');
  var endIndex = $(toElement).data('index');
  selectSpanFromTo(startIndex, endIndex);
}
function selectSpanFromTo(start, end) {
  unSelectAll();
  for (var i = start; i < end + 1; i++) {
    selectDay($('[data-index="' + i + '"]'));
  }
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}
function getMonday() {
  var d = new Date();
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
function isToday(date) {
  return date.setHours(0, 0, 0, 0) == (new Date()).setHours(0, 0, 0, 0);
}
function getHoliday(date) {
  if (date.getDate() === 26) {
    return "Christmas";
  }
  //var holiday = holidays[date.getMonth() + "," + date.getWeekOfMonth(true) + "," + date.getDay()];
  return null;
}
var holidays = { // keys are formatted as month,week,day
  "0,2,1": "Martin Luther King, Jr. Day",
  "1,1,1": "President's Day",
  "2,1,0": "Daylight Savings Time Begins",
  "3,3,3": "Administrative Assistants Day",
  "4,1,0": "Mother's Day",
  "4,-1,1": "Memorial Day",
  "5,2,0": "Father's Day",
  "6,2,0": "Parents Day",
  "8,0,1": "Labor Day",
  "8,1,0": "Grandparents Day",
  "8,-1,0": "Gold Star Mothers Day",
  "9,1,1": "Columbus Day",
  "10,0,0": "Daylight Savings Time Ends",
  "10,3,4": "Thanksgiving Day",
  "12,-1,25": "Christmas",
};
Date.prototype.getWeekOfMonth = function (exact) {
  var month = this.getMonth()
    , year = this.getFullYear()
    , firstWeekday = new Date(year, month, 1).getDay()
    , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
    , offsetDate = this.getDate() + firstWeekday - 1
    , index = 1 // start index at 0 or 1, your choice
    , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
    , week = index + Math.floor(offsetDate / 7)
    ;
  if (exact || week < 2 + index) return week;
  return week === weeksInMonth ? index + 5 : week;
};