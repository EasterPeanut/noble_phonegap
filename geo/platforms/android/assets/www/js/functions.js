// JavaScript Document

/*
$('p').on('tap',function(){
$(this).hide();
});
$('p').on('taphold',function(){
$(this).hide();
});
$('.a').on('swipe',function(){
	alert("You swiped!");
});
$('p').on('swipeleft',function(){
	alert("You swiped left!");
});
$('p').on('swiperight',function(){
	alert("You swiped right!");
});
*/ 

//APPARAAT ID
var id = 1;

$baseUrl = "http://pienvandalen.nl/";


function loadMessages(){
  $( ".page2-list" ).empty();
  $( ".page3-list" ).empty();

  $.ajax({
    type: "GET",
    url: $baseUrl+"getmessages.php?id="+id,
    cache: "false",
    dataType: "json",
    success: function(data){  
      if(!(jQuery.isEmptyObject(data))) {
        $.each(data, function(index, element) {
          // console.log(element[1].date);
          for (var key in element) {
            var obj = element[key];
            for (var prop in obj) {
              if((prop == "id_to") && (obj['id_to'] == id)) {
                $('.page2-list').append('<li><a href="#" class="ui-btn" data-transition="slide"><ul><li class="message_list">'+obj.message+'</li><li class="location_list"><img src="img/pin_1.png" alt="location">&nbsp;&nbsp; '+obj.location_name+'</li><li class="date_list"><img src="img/calendar.png" alt="location">&nbsp;&nbsp; '+obj.date+'</li></ul></a></li>');
              }
              if((prop == "id_from") && (obj['id_from'] == id)) {
                $('.page3-list').append('<li><a href="#" class="ui-btn" data-transition="slide"><ul><li class="message_list">'+obj.message+'</li><li class="location_list"><img src="img/pin_1.png" alt="location">&nbsp;&nbsp;  '+obj.location_name+'</li><li class="date_list"><img src="img/calendar.png" alt="location">&nbsp;&nbsp; '+obj.date+'</li></ul></a></li>');
              }
            }
          }
        });
      }else{
        $('.page2-list, .page3-list').append('No sent messages yet.');
      }
    },
    error: function(){
      $('.page2-list, .page3-list').append('There was an error loading the messages.');
    }
  });
}


$(document).on('click','.page2-list ul, .page3-list ul', function () {
  if($(this).children('.date_list').hasClass("collapse_display" )) {
    $(this).children('.date_list').removeClass("collapse_display" );
    $(this).children('.message_list').removeClass("collapse" );
    $(this).removeClass("collapse_background" );
  }else{
    $(this).children('.date_list').addClass("collapse_display" );
    $(this).children('.message_list').addClass("collapse" );
    $(this).addClass("collapse_background" );
  }
});


$(document).ready(function(){
  loadMessages();
});