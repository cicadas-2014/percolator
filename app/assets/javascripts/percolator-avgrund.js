$(function() {
  $('#show').avgrund({
    height: 200,
    holderClass: 'custom',
    showClose: true,
    showCloseText: 'close',
    onBlurContainer: '.container',
    template: '<p>So implement your design and place content here! If you want to close modal, please hit "Esc", click somewhere on the screen or use special button.</p>' +
    '<div>' +
    '<a href="http://github.com/voronianski/jquery.avgrund.js" target="_blank" class="github">Avgrund on Github</a>' +
    '<a href="http://twitter.com/voronianski" target="_blank" class="twitter">Twitter</a>' +
    '<a href="http://dribbble.com/voronianski" target="_blank" class="dribble">Dribbble</a>' +
    '</div>'
  });
});
