$(document).ready(function() {  
    $.get( "http://localhost:8000/data", function( data ) {
        var res = []
        var temp = []
        data.forEach(element => {
        if(element != "END") temp.push(element)
        else {
            if(temp.length > 0){
                res.push(temp)
                temp = []
            }
        }  
        });
        res.push(temp)
        console.log(res)
        for(var i = 0; i < res.length;i++){
        $('body').append("<div id = "+i)
        for(var j = 0; j < res[i].length;j++){ 
            var id = i.toString() + j.toString()
            var name = res[i][j] + "-" + id
            $('body').append("<form id ="+id+" ><fieldset><div class ='row><div class = 'col-md-5'><strong>"+res[i][j]+"</strong></div>"
        +"<div class = 'col-md-7'>"
        +"<label class='label' for='"+id+"-0'>"+"<input type='radio' id = '"+id+"-0' class='checkbox-inline' value='0' name='"+id+"'>"+"<i>OTHER</i></label>"
        +"<label class='label' for='"+id+"-1'>"+"<input type='radio' id = '"+id+"-1' class='checkbox-inline' value='1' name='"+id+"'>"+"<i>NUMBER</i></label>"
        +"<label class='label' for='"+id+"-17'>"+"<input type='radio' id = '"+id+"-17' class='checkbox-inline' value='17' name='"+id+"'>"+"<i>NUMBER_TYPE</i></label>"
        +"<label class='label' for='"+id+"-2'>"+"<input type='radio' id = '"+id+"-2' class='checkbox-inline' value='2' name='"+id+"'>"+"<i>PRO_TYPE</i></label>"
        +"<label class='label' for='"+id+"-3'>"+"<input type='radio' id = '"+id+"-3' class='checkbox-inline' value='3' name='"+id+"'>"+"<i>B_PRO</i></label>"
        +"<label class='label' for='"+id+"-4'>"+"<input type='radio' id = '"+id+"-4' class='checkbox-inline' value='4' name='"+id+"'>"+"<i>I_PRO</i></label>"
        +"<label class='label' for='"+id+"-5'>"+"<input type='radio' id = '"+id+"-5' class='checkbox-inline' value='5' name='"+id+"'>"+"<i>STREET_TYPE</i></label>"
        +"<label class='label' for='"+id+"-6'>"+"<input type='radio' id = '"+id+"-6' class='checkbox-inline' value='6' name='"+id+"'>"+"<i>B_STREET</i></label>"
        +"<label class='label' for='"+id+"-7'>"+"<input type='radio' id = '"+id+"-7' class='checkbox-inline' value='7' name='"+id+"'>"+"<i>I_STREET</i></label>"
        +"<label class='label' for='"+id+"-8'>"+"<input type='radio' id = '"+id+"-8' class='checkbox-inline' value='8' name='"+id+"'>"+"<i>WARD_TYPE</i></label>"
        +"<label class='label' for='"+id+"-9'>"+"<input type='radio' id = '"+id+"-9' class='checkbox-inline' value='9' name='"+id+"'>"+"<i>B_WARD</i></label>"
        +"<label class='label' for='"+id+"-10'>"+"<input type='radio' id = '"+id+"-10' class='checkbox-inline' value='10' name='"+id+"'>"+"<i>I_WARD</i></label>"
        +"<label class='label' for='"+id+"-11'>"+"<input type='radio' id = '"+id+"-11' class='checkbox-inline' value='11' name='"+id+"'>"+"<i>DIST_TYPE</i></label>"
        +"<label class='label' for='"+id+"-12'>"+"<input type='radio' id = '"+id+"-12' class='checkbox-inline' value='12' name='"+id+"'>"+"<i>B_DIST</i></label>"
        +"<label class='label' for='"+id+"-13'>"+"<input type='radio' id = '"+id+"-13' class='checkbox-inline' value='13' name='"+id+"'>"+"<i>I_DIST</i></label>"
        +"<label class='label' for='"+id+"-14'>"+"<input type='radio' id = '"+id+"-14' class='checkbox-inline' value='14' name='"+id+"'>"+"<i>CITY_TYPE</i></label>"
        +"<label class='label' for='"+id+"-15'>"+"<input type='radio' id = '"+id+"-15' class='checkbox-inline' value='15' name='"+id+"'>"+"<i>B_CITY</i></label>"
        +"<label class='label' for='"+id+"-16'>"+"<input type='radio' id = '"+id+"-16' class='checkbox-inline' value='16' name='"+id+"'>"+"<i>I_CITY</i></label>")
        +"</div></div>"
        +"</fieldset></form>"
        }  
        $('body').append("</div>")
        $('body').append("<h4 style='color:red;'>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</h7>")
        }
        $('body').append("<h3 id = 'warn'>Chỉ bấm Next khi bạn đã hoàn thành (tức đã đánh tag hết số dữ liệu trong trang này) hoặc không đánh bất tag bất kì một chữ nào, không bấm Next khi đang đánh dở ! </h3>")
        $('body').append("<a id = 'mybutton' class='mybutton'>Next >></a>");
        $("#mybutton").click(function(){
            var data = []
            for(var i = 0 ; i < res.length;i++){
                var temp = []
                for(var j = 0;j < res[i].length;j++){
                    var id = i.toString()+j.toString()
                    var name = res[i][j] + "-" + id
                        var t = $('input[name='+id+']:checked').val();
                        if(t != undefined) temp.push({ "name" : res[i][j], "tag" : t})
                }
                data.push(temp)
                temp = []
                }
                var data_send = {"data" : data}
                console.log(data_send)
                $.ajax({
                    type: 'post',
                    url: 'http://localhost:8000/tag',
                    data: JSON.stringify(data_send),
                    contentType: "application/json; charset=utf-8",
                    traditional: true,
                    success: function (data) {
                    location.reload();
                    }
                });
        });
    });
});
window.onload = function(){ 
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}};
