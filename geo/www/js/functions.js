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


$baseUrl = "http://pixes.nl/";
var id = 2;
var mycookieLat;
var mycookieLng;
var myLat;
var myLng;
var newreceivedmessages;
var newsentmessages;
var sentmessages = new Array();
var receivedmessages = new Array();
var markers = new Array();
getCookie();
  loadMessages();
  hideNot();
  updateUserInfo();


window.setInterval(function(){
  notCheck();
  hideNot();
}, 10000);
window.setInterval(function(){
    showNot();
    checkNewMessages();
    makeCookie();
}, 2000);


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
    url: $baseUrl+"updatecookie.php?id="+id+"&sent="+sentmessages.length+"&received="+receivedmessages.length+"&marker="+markers.length+"&lat="+myLat+"&lng="+myLng,
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
         for (c= 0; c < data.cookie[0].location_lon; c++) {
          mycookieLng = data.cookie[0].location_lon;
        }
         for (d= 0; d < data.cookie[0].location_lat; d++) {
          mycookieLat = data.cookie[0].location_lat;
        }
     
      }

    }
    ,
    error: function(){
    
    }
  });
}
function hideNot() {
  var notmarker = $('.not-marker:first').text();
   notmarker = parseInt(notmarker.replace(/\s+/g, ''));
  if(notmarker == 0) {
    $('.not-marker').hide();
  } else {
    $('.not-marker').show();
  }
   var notreceived = $('.not-received:first').text();
   notreceived = parseInt(notreceived.replace(/\s+/g, ''));
   if(notreceived ==  0) {
  $('.not-received').hide();

  } else {
    $('.not-received').show();
  }
 
  var notsent = $('.not-sent:first').text();
  notsent = parseInt(notsent.replace(/\s+/g, ''));
  console.log(notsent);
  if(notsent ==  0) {
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
$( window ).on( "navigate", function( event, data ) {
  console.log( data.state.info );
  console.log( data.state.direction )
  console.log( data.state.url )
  console.log( data.state.hash )
});
$(document).on('click','.back', function (event,data) {
   event.preventDefault(); //
  window.history.back();
});
function checkNewMessages() {
  console.log("newreceivedmessage" +newreceivedmessages);
  if(newreceivedmessages > 0) {
  $('.page2-list > li:nth-child(-n+'+parseInt(newreceivedmessages)+') > a > ul > li.message_list').addClass("newitems");
}
if(newsentmessages > 0) {
  $('.page3-list > li:nth-child(-n+'+parseInt(newsentmessages)+') > a > ul > li.message_list').addClass("newitems");
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
           var notreceived = $('.not-received:first').text();
            notreceived = parseInt(notreceived.replace(/\s+/g, ''));
         
          var uiteindelijkverschil = parseInt(notreceived + parseInt(verschil));
          if(uiteindelijkverschil > 0) {
          newreceivedmessages = uiteindelijkverschil;
          }
          console.log("uiteindelijkverschil"+uiteindelijkverschil);
            $('.not-received').html(uiteindelijkverschil);
            $('.not-received').css("display", "inline-block" );
            $('.page2-list > li:nth-child(-n+'+parseInt(uiteindelijkverschil)+') > a > ul > li.message_list').addClass("newitems");

            receivedmessages = tempreceivedmessages;
          }
        } else {
          receivedmessages = tempreceivedmessages;
        }
        if((sentmessages[0] != null)) {
          if(tempsentmessages.length > sentmessages.length) {
          var verschil = tempsentmessages.length - sentmessages.length;
          var notsent = $('.not-sent:first').text();
          notsent = parseInt(notsent.replace(/\s+/g, ''));
          var uiteindelijkverschil = parseInt(notsent + parseInt(verschil));
          if(uiteindelijkverschil > 0) {
          newsentmessages = uiteindelijkverschil;
          }
            $('.not-sent').html(uiteindelijkverschil);
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
          var notmarker = $('.not-marker:first').text();
          notmarker = parseInt(notmarker.replace(/\s+/g, ''));
          var uiteindelijkverschil =  parseInt(notmarker + parseInt(verschil));
            $('.not-marker').html(uiteindelijkverschil);
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
    checkNewMessages();

}
function setMessageToUser(lat, lng, idto) {
  console.log("setmessage");
  var elem = document.getElementById("id");
  elem.value = id;
  var elem = document.getElementById("lat");
  elem.value = lat;
  var elem = document.getElementById("lng");
  elem.value = lng;
  var elem = document.getElementById("id_to");
  elem.value = idto;
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
        
     
     $('#sendmessage').css("color", "green" );
     alert("Message sent");
     loadMessages();
      window.location.replace("/#page3");
          // change submit button text
      },
      error: function(e) {
 $('#sendmessage').css("color", "red" );
       
        alert("Something went terribly wrong");  }
    });
  });

function connectToFB(fbid) {
   $.ajax({
    type: "GET",
    url: $baseUrl+"connecttofb.php?id="+id+"&fbid="+fbid+"&lon="+myLng+"&lat="+myLat,
    cache: "false",
    dataType: "json",
    success: function(data){  
    
    },
    error: function(){
      
    }
  });

}

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
checkNewMessages();
}




$(document).on('click','.page2-list ul, .page3-list ul', function () {
 
  if($.mobile.activePage[0].id == "page2") {
    console.log("nutest");
     $(this).children('li:first-child').removeClass("newitems");
     newreceivedmessages = newreceivedmessages - 1;

  }
   if($.mobile.activePage[0].id == "page3") {
     $(this).children('li:first-child').removeClass("newitems");
     newsentmessages = newsentmessages - 1;
     console.log(newsentmessages);

  }
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
  checkNewMessages();
});

$(document).on('click','.ui-navbar', function () {

  
  loadMessages();
  notCheck();

});

$(document).ready(function(){

});