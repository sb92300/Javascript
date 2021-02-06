// $('.tab-button').eq(0).on('click', function() {
//         $('.tab-button').removeClass('active');
//     $('.tab-content').removeClass('show');
//     $('.tab-button').eq(0).addClass('active');
//     $('.tab-content').eq(0).addClass('show');
// });
// $('.tab-button').eq(1).on('click', function() {
//     $('.tab-button').removeClass('active');
//     $('.tab-content').removeClass('show');
// $('.tab-button').eq(1).addClass('active');
// $('.tab-content').eq(1).addClass('show');
// });
// $('.tab-button').eq(2).on('click', function() {
//     $('.tab-button').removeClass('active');
//     $('.tab-content').removeClass('show');
// $('.tab-button').eq(2).addClass('active');
// $('.tab-content').eq(2).addClass('show');
// });
var tab = $('.tab-content');
for (let i = 0; i < tab.length; i++) {
    $('.tab-button').eq(i).on('click', function() {
        $('.tab-button').removeClass('active');
        $('.tab-content').removeClass('show');
        $('.tab-button').eq(i).addClass('active');
        $('.tab-content').eq(i).addClass('show');
    });
};
