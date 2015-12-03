			var count = 0;

$(document).ready(function blubon () {
			
			count++;
			if (count<5) {
					setTimeout(function bluoff () {
			$(".b_blub").addClass("a_blub").removeClass("b_blub");
			// blubon();
			}, 900);
		setTimeout(function blubon () {
			$(".a_blub").addClass("b_blub").removeClass("a_blub");
			},800);
		setTimeout(function bluoff () {
			$(".b_blub").addClass("a_blub").removeClass("b_blub");
			// blubon();
			}, 700);
		setTimeout(function blubon () {
			$(".a_blub").addClass("b_blub").removeClass("a_blub");
			},600);
		setTimeout(function bluoff () {
			$(".b_blub").addClass("a_blub").removeClass("b_blub");
			// count = count+1;
			// console.log(count)
			blubon();
			}, 500);
		};
		
})

// 		var f = function(i){
// 		  i = i | 0;
// 		  i++;
// 		  console.log(i);
// 		  if(i<5)
// 		    setTimeout(f.bind(null,i),1000);	
// }	
// 		


