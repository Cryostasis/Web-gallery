var IMG_NUM = 300;
var IMG_BORDER = 10 + 6;
var IMG_H = 90;
var IMG_W = 160;

var TIME_OPEN = 600;
var TICK = 10;

var divs = [];
var images = [];
var img_num = 0;
var max_scroll = 0;
var Main = document.getElementById('main'); 
var html = document.documentElement;

var big_div = document.createElement("div");
var big_img = document.createElement("img");

var timer_up;
var timer_down;

img_load = function(img)
{
	
	img.target.style.left =  + "px";
    if (img.target.naturalWidth / img.target.naturalHeight >= 16 / 9)
    {
		img.target.style.height = "100%";
		img.target.style.width = "";
		img.target.style.left  = -((img.target.naturalWidth * IMG_H / img.target.naturalHeight - IMG_W) / 2).toFixed(0) + "px";
    }
	else
	{
		img.target.style.height = "";
		img.target.style.width = "100%";
		img.target.style.top  = -((img.target.naturalHeight * IMG_W / img.target.naturalWidth - IMG_H) / 2).toFixed(0) + "px";
	}
}

cycle_up = function()
{
	big_div.style.opacity = +big_div.style.opacity + TICK / TIME_OPEN;
	frame.style.opacity = +big_div.style.opacity * 7 / 10;

	if (+big_div.style.opacity >= 1)
	{
		big_div.style.opacity = 1;
		clearInterval(timer_up);
	}
}

cycle_down = function()
{
	big_div.style.opacity = +big_div.style.opacity - TICK / TIME_OPEN;
	frame.style.opacity = +big_div.style.opacity * 7 / 10;

	if (+big_div.style.opacity <= 0)
	{
		big_div.style.opacity = 0;
		clearInterval(timer_down);
		big_div.style.visibility = "hidden";
		frame.style.visibility = "hidden";
	}
}

big_load = function(img)
{
	img.target.style.top = Math.max(0, ((html.clientHeight - img.target.naturalHeight) / 2).toFixed(0)) + "px";
	if (img.target.naturalWidth / img.target.naturalHeight >= 16 / 9)
    {
    	img.target.style.height = "";
		if (img.target.naturalWidth > html.clientWidth)
			img.target.style.width = "100%";
		else
			img.target.style.width = img.target.naturalWidth + "px";
    }
	else
	{
		if (img.target.naturalHeight > html.clientHeight)
			img.target.style.height = "100%";
		else
			img.target.style.height = img.target.naturalHeight + "px";
		img.target.style.width = "";
		
	}
}

img_click = function(elem)
{
	var img = elem.target;

	big_img.src = "img/" + img.dataset.num + ".jpg";
	big_div.style.visibility = "visible";
	frame.style.visibility = "visible";

	clearInterval(timer_up);
	clearInterval(timer_down);
	timer_up = setInterval(cycle_up, TICK);
}

big_click = function(elem)
{
	clearInterval(timer_up);
	clearInterval(timer_down);
	timer_down = setInterval(cycle_down, TICK);
}

mouse_enter = function(elem)
{
	elem.target.style.border = "3px solid rgb(128, 0, 128)";
}

mouse_leave = function(elem)
{
	elem.target.style.border = "3px solid rgb(0, 128, 128)";
}

window.onscroll = function() 
{
	console.clear();
	w_rect = {height: html.clientHeight, width: html.clientWidth};

	var image_row = (Main.clientWidth / (IMG_W + IMG_BORDER)).toFixed(0); 

	max_scroll = Math.max(max_scroll, window.pageYOffset + w_rect.height);
	var new_sz = Math.min(image_row * (+(max_scroll / (IMG_H + IMG_BORDER)).toFixed(0) + 1), IMG_NUM);

	if (new_sz > img_num)
	{
		for (var i = img_num; i < new_sz; i++)
		{
			divs[i] = document.createElement("div");
			divs[i].className = "imageDiv";
			divs[i].onmouseenter = mouse_enter;
			divs[i].onmouseleave = mouse_leave;

			Main.appendChild(divs[i]);

			images[i] = document.createElement("img");
			images[i].className = "image";
			images[i].src = "img/" + (+i + 1) + ".jpg";
			images[i].dataset.num = +i + 1;

			images[i].onload = img_load;
			images[i].onclick = img_click;

			divs[i].appendChild(images[i]);
		}
	}

	img_num = new_sz;
}

window.onresize = window.onscroll;

big_div.className = "imageBigDiv";
big_img.className = "imageBig";
big_div.style.visibility = "hidden";
big_div.onclick = big_click;
big_img.onclick = big_click;
big_img.onload = big_load;

var frame = document.createElement("div");
frame.className = "frame";
frame.style.visibility = "hidden";
document.body.appendChild(frame);

document.body.appendChild(big_div);
big_div.appendChild(big_img);

window.onscroll();