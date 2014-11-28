var IMG_NUM = 40;
var IMG_BORDER = 10 + 6;
var IMG_H = 90;
var IMG_W = 160;

var images = [];
var img_num = 0;
var max_scroll = 0;
var Main = document.getElementById('main'); 


window.onscroll = function() 
{
	console.clear();
	w_rect = {height: html.clientHeight, width: html.clientWidth};

	var image_row = (Main.width / (IMG_W + IMG_BORDER)).toFixed(0); 

	max_scroll = Math.max(max_scroll, window.screenY + w_rect.height);
	var new_sz = image_row * ((max_scroll / (IMG_H + IMG_BORDER)).toFixed(0) + 1);

	if (new_sz > img_num)
	{
		for (var i = img_num; i < new_sz; i++)
		{
			images[i] = document.createElement("img");
			images[i].className = "image";
			images[i].src = i + ".jpg";
			document.body.appendChild(images[i]);
		}
	}
}
