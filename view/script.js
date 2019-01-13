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
        $('body').append('<div id = '+i+'>')
        for(var j = 0; j < res[i].length;j++){ 
            var id = i.toString() + j.toString()
            var name = res[i][j] + "-" + id
            $('body').append("<form id ="+id+" ><strong><fieldset>"+res[i][j]+"</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        +"<label class='label' for='"+id+"-0'>"+"<input type='radio' id = '"+id+"-0' class='checkbox-inline' value='0' name='"+id+"'>"+"<i>OOOOOO</i></label>"
        +"<label class='label' for='"+id+"-1'>"+"<input type='radio' id = '"+id+"-1' class='checkbox-inline' value='1' name='"+id+"'>"+"<i>SO_NHA</i></label>"
        +"<label class='label' for='"+id+"-2'>"+"<input type='radio' id = '"+id+"-2' class='checkbox-inline' value='2' name='"+id+"'>"+"<i>DU_AN_TYPE</i></label>"
        +"<label class='label' for='"+id+"-3'>"+"<input type='radio' id = '"+id+"-3' class='checkbox-inline' value='3' name='"+id+"'>"+"<i>DU_AN</i></label>"
        +"<label class='label' for='"+id+"-4'>"+"<input type='radio' id = '"+id+"-4' class='checkbox-inline' value='4' name='"+id+"'>"+"<i>DUONG_TYPE</i></label>"
        +"<label class='label' for='"+id+"-5'>"+"<input type='radio' id = '"+id+"-5' class='checkbox-inline' value='5' name='"+id+"'>"+"<i>DUONG</i></label>"
        +"<label class='label' for='"+id+"-6'>"+"<input type='radio' id = '"+id+"-6' class='checkbox-inline' value='6' name='"+id+"'>"+"<i>PHUONG_XA_TYPE</i></label>"
        +"<label class='label' for='"+id+"-7'>"+"<input type='radio' id = '"+id+"-7' class='checkbox-inline' value='7' name='"+id+"'>"+"<i>PHUONG_XA</i></label>"
        +"<label class='label' for='"+id+"-8'>"+"<input type='radio' id = '"+id+"-8' class='checkbox-inline' value='8' name='"+id+"'>"+"<i>QUAN_HUYEN_TYPE</i></label>"
        +"<label class='label' for='"+id+"-9'>"+"<input type='radio' id = '"+id+"-9' class='checkbox-inline' value='9' name='"+id+"'>"+"<i>QUAN_HUYEN</i></label>"
        +"<label class='label' for='"+id+"-10'>"+"<input type='radio' id = '"+id+"-10' class='checkbox-inline' value='10' name='"+id+"'>"+"<i>THANH_PHO_TYPE</i></label>"
        +"<label class='label' for='"+id+"-11'>"+"<input type='radio' id = '"+id+"-11' class='checkbox-inline' value='11' name='"+id+"'>"+"<i>THANH_PHO</i></label>")
        +"</fieldset></form>"
        }  
        $('body').append("</div>")
        $('body').append("<h4 style='color:red;'>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</h7>")
        }
        $('body').append("<button type='button' class ='btn btn-primary'>Submit</button>");
        $("button").click(function(){
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