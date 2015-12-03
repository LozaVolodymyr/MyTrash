window.onload = function () {
    alert('choose u pizza');
    var form = document.forms[0];
    var sub = document.getElementById('sub');
   
 	sub.addEventListener('click', function () {
 		var name = document.getElementById('name');
   		var number = document.getElementById('number');

   			alert('Добрый день ' name + 'ваш номер' + number);
 	}, false);

 	name.addEventListener('click', function () {
 		
 	}, false);

 }