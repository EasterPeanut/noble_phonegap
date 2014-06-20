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
$(document).ready(function(){
//APPARAAT ID


$baseUrl = "http://pixes.nl/";
var id = 1;
var myLat;
var myLng;
var sentmessages = new Array();
var receivedmessages = new Array();
var markers = new Array();
getCookie();
  loadMessages();
  hideNot();
  updateUserInfo();


window.setInterval(function(){
  notCheck();
  showNot();
  makeCookie();
  hideNot();
  updateUserInfo();
}, 5000);

function updateUserInfo() {
  $.ajax({
    type: "GET",
    url: $baseUrl+"updateuser.php?id="+id+"&lat="+myLat+"&lon="+myLng+"",
    cache: "false",
    dataType: "json",
    success: function(data){  
   
    },
    error: function(){
      
    }
  });
}
function makeCookie() {
   $.ajax({
    type: "GET",
    url: $baseUrl+"updatecookie.php?id="+id+"&sent="+sentmessages.length+"&received="+receivedmessages.length+"&marker="+markers.length+"",
    cache: "false",
    dataType: "json",
    success: function(data){  
   
    },
    error: function(){
      
    }
  });
}
function getCookie() {
   $.ajax({
    type: "GET",
    url: $baseUrl+"getcookie.php?id="+id+"",
    cache: "false",
    dataType: "json",
    success: function(data){  
      if(!(jQuery.isEmptyObject(data))) {
        for (i= 0; i < data.cookie[0].sent; i++) {
          sentmessages.push("bogus");
        }
        for (a= 0; a < data.cookie[0].received; a++) {
          receivedmessages.push("bogus");
        }
        for (b= 0; b < data.cookie[0].marker; b++) {
          markers.push("bogus");
        }

     
      }

    }
    ,
    error: function(){
    
    }
  });
}
function hideNot() {
  if($('.not-marker:contains("0")')) {
    $('.not-marker').hide();
  } else {
    $('.not-marker').show();
  }
   if($('.not-received:contains("0")')) {
  $('.not-received').hide();

  } else {
    $('.not-received').show();
  }
  if($('.not-sent:contains("0")')) {
  $('.not-sent').hide();

  } else {
    $('.not-sent').show();
  }
}
function notCheck() {
  if($.mobile.activePage[0].id == "page1") {
    $('.not-marker').html("0");
  }
  if($.mobile.activePage[0].id == "page2") {
     $('.not-received').html("0");
  }
  if($.mobile.activePage[0].id == "page3") {
     $('.not-sent').html("0");
  }
}
function showNot() {
  $.ajax({
    type: "GET",
    url: $baseUrl+"getmessages.php?id="+id,
    cache: "false",
    dataType: "json",
    success: function(data){  
      if(!(jQuery.isEmptyObject(data))) {
        var tempreceivedmessages = new Array();
        var tempsentmessages = new Array();
        $.each(data, function(index, element) {
          // console.log(element[1].date);
          for (var key in element) {
            var obj = element[key];
            for (var prop in obj) {
            
              if((prop == "id_to") && (obj['id_to'] == id)) {
               tempreceivedmessages.push([obj]);
              }
              if((prop == "id_from") && (obj['id_from'] == id)) {
                tempsentmessages.push([obj]);
              }
            }
          }
        });
      }else{
       
      }
        if((receivedmessages[0] != null)) {
          if(tempreceivedmessages.length > receivedmessages.length) {
           var verschil = tempreceivedmessages.length - receivedmessages.length;
            $('.not-received').html(verschil);
            $('.not-received').css("display", "inline-block" );
            receivedmessages = tempreceivedmessages;
          }
        } else {
          receivedmessages = tempreceivedmessages;
        }
        if((sentmessages[0] != null)) {
          if(tempsentmessages.length > sentmessages.length) {
           var verschil = tempsentmessages.length - sentmessages.length;
            $('.not-sent').html(verschil);
            $('.not-sent').css("display", "inline-block" );
            sentmessages = tempsentmessages;
          }
        } else {

          sentmessages = tempsentmessages;
        }
    },
    error: function(){
      
    }
  });


 $.ajax({
    type: "GET",
    url: $baseUrl+"getchords.php?id="+id+"&lat="+myLat+"&lon="+myLng+"",
    cache: "false",
    dataType: "json",
    success: function(data){  
      if(!(jQuery.isEmptyObject(data))) {
       
       var tempmarkers = new Array();
  $.each(data, function(index, element) {
          // console.log(element[1].date);
          for (var key in element) {
            var obj = element[key];
           
            
             
               tempmarkers.push([obj]);
            
            
          }
          console.log(tempmarkers.length);
        });
      }else{
       
      }

        if((markers[0] != null)) {
          console.log("temp"+tempmarkers.length+"markers"+ markers.length);
          if(tempmarkers.length > markers.length) {
            
           var verschil = tempmarkers.length - markers.length;
            $('.not-marker').html(verschil);
            $('.not-marker').css("display", "inline-block" );
            markers = tempmarkers;
            
          }
        } else {
          markers = tempmarkers;
        }
        
    },
    error: function(){
      
    }
  });
}
function setMessageToUser(lat, lng, id_to) {
  var elem = document.getElementById("id");
  elem.value = id;
  var elem = document.getElementById("lat");
  elem.value = lat;
  var elem = document.getElementById("lng");
  elem.value = lng;
  var elem = document.getElementById("id_to");
  elem.value = id_to;
}
$(document).on('submit','#submitForm', function(e) { 
    e.preventDefault(); //
  $.ajax({
      url: 'postmessage.php', // form action url
      type: 'POST', // form submit method get/post
      dataType: 'html', // request type html/json/xml
      data: $('#submitForm').serialize(), // serialize form data 
      beforeSend: function() {
     
      },
      success: function(data) {
        
     $('#sendmessage').html("Message sent");
     $('#sendmessage').css("color", "green" );
     alert("Message sent");
      window.location.replace("/#page3");
          // change submit button text
      },
      error: function(e) {
 $('#sendmessage').css("color", "red" );
        $('#sendmessage').html("Something went terribly wrong");    
        alert("Something went terribly wrong");  }
    });
  });



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
      $('.page2-list ul, .page3-list ul').children('.date_list').removeClass("collapse_display" );
    $('.page2-list ul, .page3-list ul').children('.message_list').removeClass("collapse" );
    $('.page2-list ul, .page3-list ul').removeClass("collapse_background" );

    $(this).children('.date_list').addClass("collapse_display" );
    $(this).children('.message_list').addClass("collapse" );
    $(this).addClass("collapse_background" );
  }
});

$(document).on('click','.ui-navbar', function () {
  notCheck();
  loadMessages();
});



});