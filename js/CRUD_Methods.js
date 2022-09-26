//global variables
var food = [],
    count = -1,
    flag = 0;
jQuery(document).ready(function () {
    //datatable initialization
    //Call Methods
    hide_table();
    welcome_back();
    spinner();
    //jquery Events & Methods
    jQuery('#close_btn').on('click', function() {
        var cnfrm_close = confirm("Are You Sure Want To Close To do Application");
        if (cnfrm_close === true) {
            jQuery('select,input,button,label,#msg_box').remove();
            jQuery('#act , nav,#_print').remove();
            for (var index = 0; index <= count; index++) {
                jQuery('#actions' + index).remove();
            }
            print();
            jQuery('table,.footer').remove();
            jQuery('h1').html("Good Bye :)");
            var button = document.createElement("button");
            button.className = "btn btn-success";
            button.id = "reopen";
            var heading = jQuery('h1');
            heading.append("<br>");
            heading.append(button);
            jQuery('#reopen').html("Re-Open To Do Application");
            reopen();
        } else {
            sessionStorage["welcome"] = false;
        }
    });
    jQuery('#_print').on('click', function() {
        jQuery('select,input,button,label,#msg_box').hide();
        jQuery('#act , nav,#_print').hide();
        for (var index = 0; index <= count + 1; index++) {
            jQuery('#actions' + index).hide();
        }
        print();
        for (var index = 0; index <= count; index++) {
            jQuery('#actions' + index).show();
        }
        jQuery('select,input,button,label,#msg_box,#_print').show();
        jQuery('#act , nav').show();
    });
    jQuery('#_add').on('click', function() {
        if (Number(food_price.value) > 0 && (food_qty.value) > 0) {
            jQuery('#spinner').fadeIn("slow");
            jQuery('#msg_box').fadeIn("slow");
            for (var index = 0; index <= count; index++) {
                if (food_name.value == food[index].food_name) {
                    jQuery('#msg_box').html("<div class='alert alert-warning container'><strong>Warning! " + food[index].food_name + "</strong> Already Exist Please</div>");
                    flag = 1;
                    //animate();
                    jQuery('#spinner').hide();
                }
            }
            if (flag == 0) {
                count = count + 1;
                food.push({
                    food_name: food_name.value,
                    food_price: food_price.value,
                    food_qty: food_qty.value
                });
                var table = document.getElementById('tbl');
                var tbody = document.getElementById("tbody");
                var row = table.insertRow(1);
                row.id = "r" + count;
                tbody.appendChild(row);
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                cell0.id = "food_Name" + count;
                cell1.id = "food_Price" + count;
                cell2.id = "food_Qty" + count;
                cell3.id = "actions" + count;
                cell0.innerHTML = food[Number(count)].food_name;
                cell2.innerHTML = food[Number(count)].food_qty;
                cell1.innerHTML = cell2.innerHTML * food[Number(count)].food_price;
                cell3.innerHTML = "<button class='btn btn-danger'  onclick='Delete(" + count + ")'>Delete</button> | <button onclick='Update(" + count + ")' class='btn btn-success' id='u" + count + "'>Update</button>";
                Update(index);
                duplication();
                jQuery('msg_box').html("<div  class='alert alert-success container'><strong>" + food[index].food_name + "!</strong> Added Successfully </div>");
                animate();
                //jQuery('#r' + count).addClass('bg-success');
                if (jQuery('#r' + String((Number(count) - 1))).hasClass('bg-info text-white')) {
                    jQuery('#r' + String((Number(count) - 1))).removeClass('bg-info text-white');
                    setTimeout(() => {
                        jQuery('#r' + count).removeClass('bg-info text-white');
                    }, 20000);
                }
                setTimeout(() => {
                    jQuery('#r' + count).removeClass('bg-info text-white');
                }, 20000);
            }
            flag = 0;
            validate_Null_Table();
        } else {
            jQuery('#msg_box').html("<div class='alert alert-warning container'><strong>Warning!</strong> Fill All Fields Please</div>");
            animate();
        }
    });
});
//methods
function welcome_back() {
    if (sessionStorage["welcome"] != null) {
        alert("Welcome Back");
    }
}
function hide_table() {
    jQuery('._table').hide();
    jQuery('.menu').addClass('padding');
}
function spinner() {
    jQuery('#spinner').hide();
    jQuery("#search").on("keyup", function () {
        var value = jQuery(this).val().toLowerCase();
        jQuery("#tbody tr").filter(function () {
            jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}
function animate() {
    jQuery('#tbody').hide();
    setTimeout(function() {
        jQuery('#spinner').fadeOut("slow");
        jQuery('#tbody').fadeIn("slow");
    }, 1000 / 4);
}
if (food.length < 0) {
    food.length = 1;
}

function Sum_Data() {
    var sum_price = 0;
    var sum_qty = 0;
    for (var x in food) {
        sum_price = Number(sum_price) + Number(food[x].food_price);
        sum_qty = Number(sum_qty) + Number(food[x].food_qty);
    }
    jQuery('#total_qty').html(sum_qty);
    jQuery('#total_bill').html(sum_price);
}

function duplication() {
    for (var index = 0; index <= count; index++) {
        if (!(food_name.value == food[index].food_name)) {
            jQuery("#u" + index).prop("disabled", true);
        } else {
            jQuery("#u" + index).prop("disabled", false);
        }
    }
}

function reopen() {
    jQuery('#reopen').on('click', function() {
        window.location.href = "file:///C:/Users/Hammad/source/Repos/MyToDo_Application/ToDo_App.html";
        sessionStorage["welcome"] = "Welcome Back!";
    });
}

function Update(id) {
    jQuery('#spinner').fadeIn("slow");
    jQuery('#msg_box').fadeIn("slow");
    food[id].food_name = food_name.value;
    food[id].food_qty = food_qty.value;
    food[id].food_price = food_price.value * food[id].food_qty;
    jQuery('#' + "food_Name" + id).html(food[id].food_name);
    jQuery('#' + "food_Price" + id).html(food[id].food_price);
    jQuery('#' + "food_Qty" + id).html(food[id].food_qty);
    Sum_Data();
    animate();
}

function Delete(id) {
    if (confirm("Are You Sure Want to Delete") == true) {
        for (var i = id; i < food.length; i++) {
            food[i].food_name = food[i + 1];
        }
        jQuery('#' + "r" + id).remove();
        food.length--;
        count--;
        Sum_Data();
        if (count == -1) {
            jQuery('#spinner').fadeOut("slow");
            jQuery('#msg_box').fadeOut("slow");
        }
        validate_Null_Table();
    }
}

function food_price_Add_Once() {
    food_price.value++;
    if (food_price.value == 0) {
        dec.disabled = true
    } else {
        dec.disabled = false
    }
}

function food_price_Dec_Once() {
    food_price.value--;
    if (food_price.value == 0) {
        dec.disabled = true
    } else {
        dec.disabled = false
    }
}

function food_qty_Dec_Once() {
    food_qty.value--;
    if (food_qty.value == 0) {
        inc.disabled = true
    } else {
        inc.disabled = false
    }
}

function food_qty_Add_Once() {
    food_qty.value++;
    if (food_qty.value == 0) {
        inc.disabled = true
    } else {
        inc.disabled = false
    }
}

function Reset() {
    food_name.value = 'Zinger';
    food_price.value = 1;
    food_qty.value = 1;
}

function _neg_restrict() {
    if (food_price.value < 1) {
        alert("Invalid Value");
        food_price.value = 1;
    }
    if (food_qty.value < 1) {
        alert("Invalid Value");
        food_qty.value = 1;
    }
}
function validate_Null_Table() {
    if (count == -1 && food.length == 0) {
        //window.alert("Array is Null");
        jQuery('._table').fadeOut('slow');
        jQuery('.menu').addClass('padding');
    }
    else {
        jQuery('._table').show();
    }
}