import "./styles/app.scss";
import fb from "./assets/fb.svg";
import ig from "./assets/ig.svg";
import li from "./assets/li.svg";
import tw from "./assets/tw.svg";
import pic from "./assets/self_portrait.jpg";
import $ from "jquery";

const $body = $('body');
const $elems = $('.pause-anim');
const $cards = $('.card');
const $window = $(window);
const $module = $('.project-module');
const $moduleText = $module.find('.text');
const $moduleTitle = $module.find('h3');
const $moduleImg = $module.find('img');
const $moduleLink = $('#project_demo');
const $moduleCode = $('#project_code');
const $exit_btn = $('.exit-wrapper');
const $menu = $('.menu');
const $nav_bar = $('nav');
const viewOffset = 90;

$('.facebook_icon').attr('src',fb);
$('.instagram_icon').attr('src',ig);
$('.linkedin_icon').attr('src',li);
$('.twitter_icon').attr('src',tw);
$('.portrait').attr('src',pic);

let window_height = $window.height();

$menu.click(()=>{
	$body.toggleClass('behind');
	$nav_bar.toggleClass('hidden');
	$menu.toggleClass('active');
});

$('.study').click(function(){
	show_projct_module(this);
});

$exit_btn.click(()=>{
	show_projct_cards();
});

$window.on('scroll', check_if_in_view);
$window.on('resize', () => {window_height = $window.height();});

$('.options a').on("click", function(e) {
	e.preventDefault();
	$('html, body').animate({
        scrollTop: $(this.getAttribute("href")).offset().top
    }, 1000);
    reset_nav_bar();
});

$('.study').on("click", function() {
	$('html, body').animate({
        scrollTop: $('#projects').offset().top
    }, 270);
})

function check_if_in_view() {

  for (let i = 0; i < $elems.length; i++) {
  	let elem = $elems[i];
  	let elemHeight = elem.getBoundingClientRect().height;
  	let elemTop = elem.getBoundingClientRect().top;
  	let elemBottom = (elemTop + elemHeight);

  	if((elemBottom >= viewOffset) && (elemTop <= (window_height - viewOffset))){
  		$elems[i].className = $elems[i].className.replace('pause-anim', 'in-view');
  	}
  }
}

function show_projct_module(domNode) {
	const $node = $(domNode);
	$module.toggleClass('hidden');
	$exit_btn.toggleClass('hidden');

	let text = $node.parent().next('.text').html();
	let link = $node.parent().siblings('.demo').attr('href');
	let code = $node.parent().siblings('.code').attr('href');
	let title = $node.siblings('h3').html();
	let img_src = $node.parent().siblings('.project-img').children('img').attr('src');
	$moduleText.html(text);
	$moduleTitle.html(title);
	$moduleImg.attr('src',img_src);
	console.log(link,code);
	$moduleLink.attr('href',link);
	$moduleCode.attr('href',code);


	for(let card of $cards){
		card.classList.toggle('hidden');
	}
}

function show_projct_cards(evn) {
	$module.toggleClass('hidden');
	$moduleText.empty();
	$exit_btn.toggleClass('hidden');

	for(let card of $cards){
		card.classList.toggle('hidden');
	}
}

function reset_nav_bar() {
	$nav_bar.addClass('hidden');
	$menu.removeClass('active');
	$body.removeClass('behind');
}