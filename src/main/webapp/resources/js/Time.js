window.onload = function(){
  window.setInterval(function(){
    var now = new Date;
    var clock = document.getElementById("time");
    clock.innerHTML = now.toLocaleTimeString();
  },1000);
}