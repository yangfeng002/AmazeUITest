/* 
*Created by fengyang on 2018/11/14
**/
$(function () {
   /*fn1:部门列表点击事件*/
    $("#collapse-head").on("click","li.am-item-list",function (e) {
         $(".am-home-detail").removeClass("am-show").addClass("am-hide");
         $(".am-dept-detail").removeClass("am-hide").addClass("am-show");
         $("li.am-item-list").removeClass("am-active");
         $(this).addClass("am-active");
         $(this).siblings().removeClass("am-active");
         //面包屑导航处理
        var secondMenu = $(this).closest(".am-dropdown-content").find("li.am-dropdown-header").html();
        var thirdMenu = $(this).find("a").html();
        $(".am-dept-detail").find(".am-breadcrumb").find(".second-menu").find("a").text(secondMenu);
        $(".am-dept-detail").find(".am-breadcrumb").find(".third-menu").text(thirdMenu);
         //调用请求，获取相关数据，展示表格内容
         var url = $(this).find("a").attr("data-url");
        $.getJSON("assets/dataJson/"+url+".json","", function(data) {
             $(".am-dept-detail").find(".detail-h2").html(data.header);
             if(data.list && data.list.length>0){
                 var temp =[];
                 $.each(data.list,function (i,v) {
                   temp.push('<tr>' +
                       '<td><xmp>'+v.rank+'</xmp></td>' +
                       '<td><xmp>'+v.title+'</xmp></td>' +
                       '<td>'+v.rule+'</td>' +
                       '</tr>');
                 });
                 $("#deptList").empty().append(temp.join(""));
             }else{
                 var colspan = $("#deptList").prev("thead").find("tr").length;
                 $("#deptList").empty().append('<tr><td colspan="'+colspan+'">暂无数据</td></tr>');
             }
        });
    });
    /*fn2:首页点击事件*/
    $("#showHomeDetail").on("click",function () {
        //$(this).siblings().removeClass("am-active");
        //$(this).addClass("am-active");
        $("li.am-item-list").removeClass("am-active");
        $(".am-home-detail").removeClass("am-hide").addClass("am-show");
        $(".am-dept-detail").removeClass("am-show").addClass("am-hide");
        $.getJSON("assets/dataJson/home.json","", function(data) {
            $(".am-home-detail").find(".detail-h2").html(data.header);
            $(".am-home-detail").find(".detail-p").html(data.desc);
        });
    });
    $(".am-icon-home").on("click",function () {
        $("#showHomeDetail").trigger("click");
    });
    $("#showHomeDetail").trigger("click");
});
