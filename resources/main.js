var load640Header = function(){
  document.getElementById('header-img-container').appendChild(document.createElement('img')).setAttribute('id', 'header-img');
  document.getElementById('header-img').setAttribute('src', '/resources/img/header/640.gif');
}
var load1024Header = function(){
  document.getElementById('header-img-container').appendChild(document.createElement('img')).setAttribute('id', 'header-img');
  document.getElementById('header-img').setAttribute('src', '/resources/img/header/1024.gif');
}
var load1440Header = function(){
  document.getElementById('header-img-container').appendChild(document.createElement('img')).setAttribute('id', 'header-img');
  document.getElementById('header-img').setAttribute('src', '/resources/img/header/1440.gif');
}
var load1920Header = function(){
  document.getElementById('header-img-container').appendChild(document.createElement('img')).setAttribute('id', 'header-img');
  document.getElementById('header-img').setAttribute('src', '/resources/img/header/1920.gif');
}

var loadResponsiveHeader = function(){
  if (document.documentElement.clientWidth < 641) {
    load640Header();
  } else if (document.documentElement.clientWidth > 640 && document.documentElement.clientWidth < 1025) {
    load1024Header();
  } else if (document.documentElement.clientWidth > 1024 && document.documentElement.clientWidth < 1441) {
    load1440Header();
  } else {
    load1920Header();
  }
};