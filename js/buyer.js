//My orders settings.

document.addEventListener("DOMContentLoaded", function(){
var main = document.querySelector('th input[type="checkbox"]'),
    all = document.querySelectorAll('td input[type="checkbox"]');

for(var i=0; i<all.length; i++) {  // 1 и 2 пункт задачи
    all[i].onclick = function() {
        var allChecked = document.querySelectorAll('td  [type="checkbox"]:checked').length;
        main.checked = allChecked == all.length;
        main.indeterminate = allChecked > 0 && allChecked < all.length;
    }
}


main.addEventListener("click", function() {  // 3
    for(var i=0; i<all.length; i++) {
        all[i].checked = this.checked;
    }
});
});