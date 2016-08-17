function placeIndex(category, name){
  if (category === 'activity'){
    category = 'activities';
  } else {
    category = category + 's';
  }

  var index;
  window[category].forEach(function(el, i){
    if (el.name === name){
      index = i;
    }
  });
  return index;
}
//global variables
var x = 1;
var markerCollection = {}; //stores markers
var itineraryArray = [];
$(document).ready(function(){

$('[data-action = "add"]').click(function(e){
  // console.log(this); //returns the element
  var $selectedData = $($(this).siblings('select')).val(); //TODO WHY IS IT NOT OPTION?
  var $category = $($(this).siblings('select')).attr('data-type');

  var input = '<li><div class="itinerary-item"><span class="title">' + $selectedData + '</span>';
  var button = '<button class="btn btn-xs btn-danger remove btn-circle">' + "x" + '</button></div></li>';
  $("." + $category + "Title").append(input + button);

  var index = placeIndex($category, $selectedData);
  markerCollection[$selectedData] = drawMarker ($category, hotels[index].place.location);
  //in progress
  var $day = $('#day-title').children('span').text();
  $day = +$day.slice(-1) - 1;

 var temp = {};
  temp[$category] = $selectedData;

  iternaryArray[$day].push(temp);

});

$('#itinerary').on('click', '.remove', function (e) {

  var placeName = $(this).siblings('span').text();
  markerCollection[placeName].setMap(null);
  delete markerCollection[placeName];
  $(this).parent().parent().remove();

});

$('.day-buttons').on('click', '#day-add', function (e) {
  x++;
  var input = '<button class="btn btn-circle day-btn current-day day' + x + '">' + x + '</button>';

  $input = $(input).on('click', function(){
    $('#day-title').children('span').text('Day ' + $(input).text());
  });

  $('#day-add').before($input);
});



});

