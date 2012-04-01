// configure the selection of hawt dates in Home
var dates = [
  {
    name: "Evil Mc.Evil",
    face: "evil.png",
    description: "Evil absolutely hates %hate% with an obsessive passion. Don't be surprised if you come Home to find %hate% with an evil curse on it. In fact, I would also keep an eye on %fave% too, since this one has a habit of just cursing everything.<br />Has an odd habit of collecting bottles of blood. There is only one empty bottle in their 'blood bank' with the name %name% inscribed on it. Maybe it's a present for you?"
  },
  {
    name: "Lara Corset",
    face: "bathing.png",
    description: "She giggles at everything you say, specially when you discuss your vast knowledge of %fave%. She is always sporting the latest in Home fashion.<br />She used to be a fan of %hate% before you made her realise it was all so silly.<br />Fun fact: is actually a 47 year old man with a \"I love %name% tattoo\" on his leg."
  },
  {
    name: "Blondie",
    face: "blondie.png",
    description: "Blondie spends her days locked away in a tower. Luckily she has the internet, so she was able to fill our her online dating profile and go on Home (that's while she wasn't posting angry comments on YouTube about %hate%).<br />She loves to sing songs in her tower about birds, flowers and %fave%.<br />At night, she dreams of a mysterious %name%, which legend says will one day come to rescue her. But alas, she is still waiting for her knight to arrive."
  },
  {
    name: "Daisy",
    face: "daisy.png",
    description: "Your perfect match is Daisy. She is not a fan of technology or modern luxuries and would rather spend her time with the flowers... apart from the time she spends on PlayStation Home, of course...<br />She has started a protest group against %hate% and regularly meditates to improve her knowledge of %fave%.<br />Apparently the wind talks to her and says, \"Find %name%, you are destined to be with them.\" But she has yet to work out what this means."
  },
  {
    name: "Lifeguard",
    face: "lifeguard.png",
    description: "Not your type? The algorithms never lie. He is your type.<br />And why not! This guy will save you when you're in danger, specially if you were swimming whilst enjoying %fave% (you're still not sure why you thought that was a good idea).<br />He also owns a boat, with the strictest \"no %hate%\" rule. He named his boat after somebody he met in a dream. %name%."
  },
  {
    name: "Alien",
    face: "alien.png",
    description: "Sorry, we were unable to find any human matches for you. This is the best we could find.<br />This guy enjoys killing all humans. Specially those who like %fave%.<br />He has a particular love of %hate% and killing anyone called %name%."
  }
];
// memory
var data = {};
var load;
var htmlEncode;
// calculator

function num(a){
  var b = 0;
  for(var i=0; i<a.length; i++){
    b += a.charCodeAt(i);
  }
  return b;
}
function parsed(d){
  d = d.replace(/%fave%/g, "<i>"+htmlEncode(data.fave)+"</i>");
  d = d.replace(/%hate%/g, "<i>"+htmlEncode(data.hate)+"</i>");
  return d.replace(/%name%/g, "<b>"+htmlEncode(data.username)+"</b>");
}
function calc(){
  var n = num(data.username)+num(data.fave)+num(data.hate);
  var p = dates[n%(dates.length)];
  // render
  var h = "<img src='img/"+p.face+"' style='float:right' /><h2>"+p.name+" ("+(20+(n%80))+"% match)</h2>";
  h += "<p>"+parsed(p.description)+"</p>";
  $("#profilebody").html(h);
}
// JSON-er for forms
(function( $ ){
$.fn.serializeJSON=function() {
var json = {};
jQuery.map($(this).serializeArray(), function(n, i){
json[n['name']] = n['value'];
});
return json;
};
})( jQuery );
// some hooks
$(document).ready(function(){
  htmlEncode = function(value){
    return $('<div/>').text(value).html();
  }
  var progress = function(am){
    if (am>100) am = 100;
    $("#progress").css("width", am+"%");
  };
  var loadprogress = function(cb){
    var a = 0;
    var inter = setInterval(function(){
      a += 6;
      progress(a);
      if (a>150){ // change
        clearInterval(inter);
        progress(0);
        cb();
      }
    },200);
    $('#loading').on('hidden', function(){
      clearInterval(inter);
      progress(0);
    });
  };
  load = function(){
    // make spinny thing
    $('#loading').modal();
    loadprogress(function(){
      $('#loading').modal("hide");
      $('#profile').modal();
    });
  };
  $("#submit").click(function(){
    // store data
    data = $('#form').serializeJSON();
    if (data.username == "" || data.fave == "" || data.hate == ""){
    }else{
      // calculate "match"
      calc();
      // show silly pretend loader and deadly serious results
      load();
    }
  });
});