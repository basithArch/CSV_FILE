//Module to search a particular row in a table
function search() {
    var total_rows = document.getElementsByTagName('tr');
    for(let j = 0;j < total_rows.length; j++ ){
        total_rows[j].style.backgroundColor = "white";
    }
    var title_name = document.getElementById("search_Form").elements["search_Item"].value;
    var pattern = title_name.toLowerCase();
    var target_Id = "";
    var divisions = document.getElementsByClassName("col_md_2");
    for (let i = 0; i < divisions.length; i++) {
       var indx = divisions[i].innerText.toLowerCase().indexOf(pattern);
       if (indx != -1) {
          target_Id = divisions[i].parentNode.id;
          document.getElementById(target_Id).scrollIntoView();
          document.getElementById(target_Id).style.backgroundColor = 'orange';
          break;
       }
    }  
 }


//  For back to top features
window.addEventListener('scroll', function() {
   var backToTopButton = document.getElementById('back-to-top');
   if (window.pageYOffset > 100) {backToTopButton.style.display = 'block';
   } else {backToTopButton.style.display = 'none';
   }
 });
 document.getElementById('back-to-top').addEventListener('click', function() {
   window.scrollTo({ top: 0, behavior: 'smooth' });
 });