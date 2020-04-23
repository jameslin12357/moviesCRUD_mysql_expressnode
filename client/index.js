//一般直接写在一个js文件中
var layer, form, table, selected;
layui.use(['layer', 'form', 'table'], function () {
    layer = layui.layer;
    form = layui.form;
    table = layui.table;
    //layer.msg('Hello World');
    //第一个实例
    table.render({
        id: 'test',
        elem: '#demo',
        toolbar: "#tb",
        limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 500, 1000, 5000, 10000]
        , height: 500
        , url: 'http://localhost:3000/moviespag' //数据接口
        , page: true //开启分页
        , cols: [[ //表头
            { field: 'movieid', title: '电影ID', width: 80, sort: true, fixed: 'left', width: '11.11%' }
            , { field: 'name', title: '名称', width: 80, sort: true, width: '11.11%'}
            , { field: 'country', title: '国家', width: 80, sort: true, width: '11.11%' }
            , { field: 'director', title: '导演', width: 80, sort: true, width: '11.11%' }
            , { field: 'genre', title: '类型', width: 177, sort: true, width: '11.11%' }
            , { field: 'year', title: '年份', width: 80, sort: true, width: '11.11%' }
            , { field: 'rating', title: '评分', width: 80, sort: true, width: '11.11%' }
            , { field: 'create_date', title: '创建日期', width: 80, sort: true, width: '11.11%' },
            { fixed: 'right', width: '11.11%', align: 'center', toolbar: '#tb2' }

        ]]
    });
    table.on('toolbar(test)', function (obj) {
        //console.log(obj);
        //var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'create':
                var content = `<form class="layui-form layui-form-pane formCreate" action="" onsubmit="event.preventDefault();createMoviePost(this);"> 
  <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-block">
                      <input type="text" name="name"  placeholder="请输入" autocomplete="off" class="layui-input">
                    </div>
                  </div>

<div class="layui-form-item">
    <label class="layui-form-label">产地</label>
    <div id="selectCountryEdit" class="layui-input-block"><select><option value="">请选择国家</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">导演</label>
    <div id="selectDirectorEdit" class="layui-input-block"><select><option value="">请选择导演</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">类型</label>
    <div id="selectGenreEdit" class="layui-input-block"><select><option value="">请选择类型</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">年份</label>
    <div id="selectYearEdit" class="layui-input-block"><select><option value="">请选择年份</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">评分</label>
    <div id="selectRatingEdit" class="layui-input-block"><select><option value="">请选择评分</option></select></div></div>
                  





<div class="layui-form-item flex jcc tac">

   <button type="submit" class="layui-btn layui-btn-normal fr">提交</button>
</div></form>`;
                layer.open({
                    btn: '',
                    area: ['550px', '500px'],
                    resize: false,
                    shade: 0,
                    title: "新建影片",
                    content: content
                });
                form.render();
                $.ajax({
                    type: "get",
                    url: `http://localhost:3000/countries`,
                    dataType: "json",
                    success: function (d) {
                        var select = `<select lay-search=""><option value=""`;
                        //if (`${data["COUNTRY"]}` === "null") {
                        //    select += `selected`;
                        //}
                        select += `>请选择国家</option>`
                        var option, value;
                        d.data.forEach(function (c) {
                            if (c["COUNTRY"] !== "null") {
                                option = c["COUNTRY"];
                                value = c["COUNTRY"];
                                select += `<option value="${value}"`
                                //if (`${data["COUNTRY"]}` === value) {
                                //    select += `selected`;
                                //}
                                select += `>${option}</option >`;
                            }

                        });
                        select += "</select>";
                        document.getElementById('selectCountryEdit').innerHTML = select;
                        form.render();
                        //                 var dd = document.getElementsByTagName('dd');
                        //for (var i = 0; i < dd.length; i++) {
                        //    var value = dd[i].getAttribute('lay-value');
                        //    if (value === countySelected) {
                        //        dd[i].click();
                        //        break;
                        //    }
                        //}
                    },
                    error: function () {
                        console.log('error');
                    }
                });
                $.ajax({
                    type: "get",
                    url: `http://localhost:3000/directors`,
                    dataType: "json",
                    success: function (d) {
                        var select = `<select lay-search=""><option value=""`;
                        //if (`${data["MATERIAL"]}` === "null") {
                        //    select += `selected`;
                        //}
                        select += `>请选择导演</option>`
                        var option, value;
                        d.data.forEach(function (c) {
                            if (c["DIRECTOR"] !== "null") {
                                option = c["DIRECTOR"];
                                value = c["DIRECTOR"];
                                select += `<option value="${value}"`
                                //if (`${data["MATERIAL"]}` === value) {
                                //    select += `selected`;
                                //}
                                select += `>${option}</option >`;
                            }

                        });
                        select += "</select>";
                        document.getElementById('selectDirectorEdit').innerHTML = select;
                        form.render();
                        //                 var dd = document.getElementsByTagName('dd');
                        //for (var i = 0; i < dd.length; i++) {
                        //    var value = dd[i].getAttribute('lay-value');
                        //    if (value === countySelected) {
                        //        dd[i].click();
                        //        break;
                        //    }
                        //}
                    },
                    error: function () {
                        console.log('error');
                    }
                });
                $.ajax({
                    type: "get",
                    url: `http://localhost:3000/genres`,
                    dataType: "json",
                    success: function (d) {
                        var select = `<select lay-search=""><option value=""`;
                        //if (`${data["COMPANY"]}` === "null") {
                        //    select += `selected`;
                        //}
                        select += `>请选择类型</option>`
                        var option, value;
                        d.data.forEach(function (c) {
                            if (c["GENRE"] !== "null") {
                                option = c["GENRE"];
                                value = c["GENRE"];
                                select += `<option value="${value}"`
                                //if (`${data["COMPANY"]}` === value) {
                                //    select += `selected`;
                                //}
                                select += `>${option}</option >`;
                            }

                        });
                        select += "</select>";
                        document.getElementById('selectGenreEdit').innerHTML = select;
                        form.render();
                        //                 var dd = document.getElementsByTagName('dd');
                        //for (var i = 0; i < dd.length; i++) {
                        //    var value = dd[i].getAttribute('lay-value');
                        //    if (value === countySelected) {
                        //        dd[i].click();
                        //        break;
                        //    }
                        //}
                    },
                    error: function () {
                        console.log('error');
                    }
                });
                $.ajax({
                    type: "get",
                    url: `http://localhost:3000/years`,
                    dataType: "json",
                    success: function (d) {
                        var select = `<select lay-search=""><option value=""`;
                        //if (`${data["COLOR"]}` === "null") {
                        //    select += `selected`;
                        //}
                        select += `>请选择年份</option>`
                        var option, value;
                        d.data.forEach(function (c) {
                            if (c["YEAR"] !== "null") {
                                option = c["YEAR"];
                                value = c["YEAR"];
                                select += `<option value="${value}"`
                                //if (`${data["COLOR"]}` === value) {
                                //    select += `selected`;
                                //}
                                select += `>${option}</option >`;
                            }

                        });
                        select += "</select>";
                        document.getElementById('selectYearEdit').innerHTML = select;
                        form.render();
                        //                 var dd = document.getElementsByTagName('dd');
                        //for (var i = 0; i < dd.length; i++) {
                        //    var value = dd[i].getAttribute('lay-value');
                        //    if (value === countySelected) {
                        //        dd[i].click();
                        //        break;
                        //    }
                        //}
                    },
                    error: function () {
                        console.log('error');
                    }
                });
                $.ajax({
                    type: "get",
                    url: `http://localhost:3000/ratings`,
                    dataType: "json",
                    success: function (d) {
                        var select = `<select lay-search=""><option value=""`;
                        //if (`${data["COLOR"]}` === "null") {
                        //    select += `selected`;
                        //}
                        select += `>请选择评分</option>`
                        var option, value;
                        d.data.forEach(function (c) {
                            if (c["RATING"] !== "null") {
                                option = c["RATING"];
                                value = c["RATING"];
                                select += `<option value="${value}"`
                                //if (`${data["COLOR"]}` === value) {
                                //    select += `selected`;
                                //}
                                select += `>${option}</option >`;
                            }

                        });
                        select += "</select>";
                        document.getElementById('selectRatingEdit').innerHTML = select;
                        form.render();
                        //                 var dd = document.getElementsByTagName('dd');
                        //for (var i = 0; i < dd.length; i++) {
                        //    var value = dd[i].getAttribute('lay-value');
                        //    if (value === countySelected) {
                        //        dd[i].click();
                        //        break;
                        //    }
                        //}
                    },
                    error: function () {
                        console.log('error');
                    }
                });
                break;
            //case 'delete':
            //    layer.msg('删除');
            //    break;
            //case 'update':
            //    layer.msg('编辑');
            //    break;
        };
    });
    //监听工具条 
    table.on('tool(test)', function (obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
        selected = data;
        if (layEvent === 'detail') { //查看
            layer.open({
                title: '影片详情'

                , content: `<div>
                    <p><span>影片ID:</span> <span>${data["movieid"]}</span></p>
                <p><span>名称:</span> <span>${data["name"]}</span></p>
                <p><span>国家:</span> <span>${data["country"]}</span></p>
                <p><span>导演:</span> <span>${data["director"]}</span></p>
                <p><span>类型:</span> <span>${data["genre"]}</span></p>
                <p><span>年份:</span> <span>${data["year"]}</span></p>
                <p><span>评分:</span> <span>${data["rating"]}</span></p>
                <p><span>创建日期:</span> <span>${data["create_date"]}</span></p>
                            </div >`,
                btn: '',
                shade: 0,
                resize: false
            });

            console.log(data);
            //do somehing
        } else if (layEvent === 'edit') { //删除
            console.log(data);

            layer.open({
                btn: '',
                area: ['550px', '500px'],

                resize: false,
                shade: 0,
                title: "编辑影片",
                content: `<form class="layui-form layui-form-pane formEdit" action=""  onsubmit="event.preventDefault();editMoviePost(this);">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-block">
                      <input type="text" name="name"  placeholder="请输入" autocomplete="off" class="layui-input"  value="${data["name"]}">
                    </div>
                  </div>

<div class="layui-form-item">
    <label class="layui-form-label">国家</label>
    <div id="selectCountryEdit" class="layui-input-block"><select><option value="">请选择国家</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">导演</label>
    <div id="selectDirectorEdit" class="layui-input-block"><select><option value="">请选择导演</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">类型</label>
    <div id="selectGenreEdit" class="layui-input-block"><select><option value="">请选择类型</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">年份</label>
    <div id="selectYearEdit" class="layui-input-block"><select><option value="">请选择年份</option></select></div></div>
<div class="layui-form-item">
    <label class="layui-form-label">评分</label>
    <div id="selectRatingEdit" class="layui-input-block"><select><option value="">请选择评分</option></select></div></div>
                  





<div class="layui-form-item flex jcc tac">

   <button type="submit" class="layui-btn layui-btn-normal fr">提交</button>
</div></form>`
            });
            form.render();
            $.ajax({
                type: "get",
                url: `http://localhost:3000/countries`,
                dataType: "json",
                success: function (d) {
                    var select = `<select lay-search=""><option value=""`;
                    if (`${data["country"]}` === "null") {
                        select += `selected`;
                    }
                    select += `>请选择国家</option>`
                    var option, value;
                    d.data.forEach(function (c) {
                        if (c["COUNTRY"] !== "null") {
                            option = c["COUNTRY"];
                            value = c["COUNTRY"];
                            select += `<option value="${value}"`
                            if (`${data["country"]}` === value) {
                                select += `selected`;
                            }
                            select += `>${option}</option >`;
                        }
                       
                    });
                    select += "</select>";
                    document.getElementById('selectCountryEdit').innerHTML = select;
                    form.render();
                    //                 var dd = document.getElementsByTagName('dd');
                    //for (var i = 0; i < dd.length; i++) {
                    //    var value = dd[i].getAttribute('lay-value');
                    //    if (value === countySelected) {
                    //        dd[i].click();
                    //        break;
                    //    }
                    //}
                },
                error: function () {
                    console.log('error');
                }
            });
            $.ajax({
                type: "get",
                url: `http://localhost:3000/directors`,
                dataType: "json",
                success: function (d) {
                    var select = `<select lay-search=""><option value=""`;
                    if (`${data["director"]}` === "null") {
                        select += `selected`;
                    }
                    select += `>请选择导演</option>`
                    var option, value;
                    d.data.forEach(function (c) {
                        if (c["DIRECTOR"] !== "null") {
                            option = c["DIRECTOR"];
                            value = c["DIRECTOR"];
                            select += `<option value="${value}"`
                            if (`${data["director"]}` === value) {
                                select += `selected`;
                            }
                            select += `>${option}</option >`;
                        }

                    });
                    select += "</select>";
                    document.getElementById('selectDirectorEdit').innerHTML = select;
                    form.render();
                    //                 var dd = document.getElementsByTagName('dd');
                    //for (var i = 0; i < dd.length; i++) {
                    //    var value = dd[i].getAttribute('lay-value');
                    //    if (value === countySelected) {
                    //        dd[i].click();
                    //        break;
                    //    }
                    //}
                },
                error: function () {
                    console.log('error');
                }
            });
            $.ajax({
                type: "get",
                url: `http://localhost:3000/genres`,
                dataType: "json",
                success: function (d) {
                    var select = `<select lay-search=""><option value=""`;
                    if (`${data["genre"]}` === "null") {
                        select += `selected`;
                    }
                    select += `>请选择类型</option>`
                    var option, value;
                    d.data.forEach(function (c) {
                        if (c["GENRE"] !== "null") {
                            option = c["GENRE"];
                            value = c["GENRE"];
                            select += `<option value="${value}"`
                            if (`${data["genre"]}` === value) {
                                select += `selected`;
                            }
                            select += `>${option}</option >`;
                        }

                    });
                    select += "</select>";
                    document.getElementById('selectGenreEdit').innerHTML = select;
                    form.render();
                    //                 var dd = document.getElementsByTagName('dd');
                    //for (var i = 0; i < dd.length; i++) {
                    //    var value = dd[i].getAttribute('lay-value');
                    //    if (value === countySelected) {
                    //        dd[i].click();
                    //        break;
                    //    }
                    //}
                },
                error: function () {
                    console.log('error');
                }
            });
            $.ajax({
                type: "get",
                url: `http://localhost:3000/years`,
                dataType: "json",
                success: function (d) {
                    var select = `<select lay-search=""><option value=""`;
                    if (`${data["year"]}` === "null") {
                        select += `selected`;
                    }
                    select += `>请选择年份</option>`
                    var option, value;
                    d.data.forEach(function (c) {
                        if (c["YEAR"] !== "null") {
                            option = c["YEAR"];
                            value = c["YEAR"];
                            select += `<option value="${value}"`
                            if (`${data["year"]}` === value) {
                                select += `selected`;
                            }
                            select += `>${option}</option >`;
                        }

                    });
                    select += "</select>";
                    document.getElementById('selectYearEdit').innerHTML = select;
                    form.render();
                    //                 var dd = document.getElementsByTagName('dd');
                    //for (var i = 0; i < dd.length; i++) {
                    //    var value = dd[i].getAttribute('lay-value');
                    //    if (value === countySelected) {
                    //        dd[i].click();
                    //        break;
                    //    }
                    //}
                },
                error: function () {
                    console.log('error');
                }
            });
            $.ajax({
                type: "get",
                url: `http://localhost:3000/ratings`,
                dataType: "json",
                success: function (d) {
                    var select = `<select lay-search=""><option value=""`;
                    if (`${data["rating"]}` === "null") {
                        select += `selected`;
                    }
                    select += `>请选择评分</option>`
                    var option, value;
                    d.data.forEach(function (c) {
                        if (c["RATING"] !== "null") {
                            option = c["RATING"];
                            value = c["RATING"];
                            select += `<option value="${value}"`
                            if (`${data["rating"]}` === value) {
                                select += `selected`;
                            }
                            select += `>${option}</option >`;
                        }

                    });
                    select += "</select>";
                    document.getElementById('selectRatingEdit').innerHTML = select;
                    form.render();
                    //                 var dd = document.getElementsByTagName('dd');
                    //for (var i = 0; i < dd.length; i++) {
                    //    var value = dd[i].getAttribute('lay-value');
                    //    if (value === countySelected) {
                    //        dd[i].click();
                    //        break;
                    //    }
                    //}
                },
                error: function () {
                    console.log('error');
                }
            });
            //layer.confirm('真的删除行么', function (index) {
            //    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
            //    layer.close(index);
            //    //向服务端发送删除指令
            //});
        } else if (layEvent === 'delete') { //编辑
            layer.open({
                btn: '',
                shade: 0,
                title: "删除影片",
                content: `<div><div class="mb-5">确定删除影片?</div><div class="tac"><button type="submit" class="layui-btn layui-btn-danger" onclick="deleteMoviePost(this);">删除</button></div></div>`
            });
        }
    });
    form.render();
});


function createMoviePost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var selects = e.getElementsByTagName('select');
    var name = inputs[0].value;
    var country = selects[0].options[selects[0].selectedIndex].value;
    var director = selects[1].options[selects[1].selectedIndex].value;
    var genre = selects[2].options[selects[2].selectedIndex].value;
    var year = selects[3].options[selects[3].selectedIndex].value;
    var rating = selects[4].options[selects[4].selectedIndex].value;

    //if (bounds === "null") {
    //    bounds = "";
    //}
    //var shape = bounds;
    //shape = shape.replace(new RegExp("\\[\\[", "g"), '((');
    //shape = shape.replace(new RegExp("\\,", "g"), ' ');

    //shape = shape.replace(new RegExp("\\]\\ \\[", "g"), ',');
    //var first = shape.split(' ')[0].slice(2);
    //var second = shape.split(' ')[1].slice(0, shape.split(' ')[1].indexOf(','));
    //shape = shape.replace(new RegExp("\\]\\]", "g"), `,${first} ${second}))`);
    console.log(selected);
    //var PRODUCTID = selected["PRODUCTID"];
    $.ajax({
        type: "post",
        url: `http://localhost:3000/CreateMovie`,
        data: { "name": name, "country": country, "director": director, "genre": genre, "year": year, "rating": rating },

        dataType: "json",
        success: function (data) {
            if (data.count === -1) {
                var div = document.createElement('div');
                div.classList.add("clRedError");
                data.data.forEach(function (error) {
                    div.innerHTML += `<p class="mb-5">${error}</p>`;
                })
                e.appendChild(div);
            } else {
                table.reload('test', {
                });
                layer.closeAll();
                layer.msg("影片已创建");
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}



function editMoviePost(e) {
    var errors = document.getElementsByClassName("clRedError");
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
    var inputs = e.getElementsByTagName('input');
    var selects = e.getElementsByTagName('select');
    var name = inputs[0].value;
    var country = selects[0].options[selects[0].selectedIndex].value;
    var director = selects[1].options[selects[1].selectedIndex].value;
    var genre = selects[2].options[selects[2].selectedIndex].value;
    var year = selects[3].options[selects[3].selectedIndex].value;
    var rating = selects[4].options[selects[4].selectedIndex].value;
    //if (bounds === "null") {
    //    bounds = "";
    //}
    //var shape = bounds;
    //shape = shape.replace(new RegExp("\\[\\[", "g"), '((');
    //shape = shape.replace(new RegExp("\\,", "g"), ' ');

    //shape = shape.replace(new RegExp("\\]\\ \\[", "g"), ',');
    //var first = shape.split(' ')[0].slice(2);
    //var second = shape.split(' ')[1].slice(0, shape.split(' ')[1].indexOf(','));
    //shape = shape.replace(new RegExp("\\]\\]", "g"), `,${first} ${second}))`);
    console.log(selected);
    var MOVIEID = selected["movieid"];
    $.ajax({
        type: "post",
        url: `http://localhost:3000/EditMovie?MOVIEID=${MOVIEID}`,
        data: { "name": name, "country": country, "director": director, "genre": genre, "year": year, "rating": rating },

        dataType: "json",
        success: function (data) {
            if (data.count !== 1) {
                var div = document.createElement('div');
                div.classList.add("clRedError");
                data.forEach(function (error) {
                    div.innerHTML += `<p class="mb-5">${error}</p>`;
                })
                e.appendChild(div);
            } else {
                table.reload('test', {
                });
                layer.closeAll();
                layer.msg("影片已编辑");
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}


function deleteMoviePost(e) {
    var MOVIEID = selected['movieid'];
    $.ajax({
        type: "post",
        url: `http://localhost:3000/DeleteMovie?MOVIEID=${MOVIEID}`,
        dataType: "json",
        success: function (data) {
            if (data.count !== 1) {
                layer.msg('请先删除子元素');
            } else {
                table.reload('test', {
                });
                layer.closeAll();
                layer.msg("影片已删除");
            }
        },
        error: function (item, err) {
            layer.msg('请先删除子元素');
        }
    });
}


$.ajax({
    type: "get",
    url: `http://localhost:3000/countries`,
    dataType: "json",
    success: function (data) {
        var select = `<select lay-search="" id="selectCountry"><option value="">请选择国家</option>`;
        var option, value;
        data.data.forEach(function (c) {
            option = c["COUNTRY"];
            //value = c["COUNTY_ID"];
            select += `<option value="${option}">${option}</option>`;
        });
        select += '</select>';
        document.getElementById('selectCountries').innerHTML = select;
        form.render();
    },
    error: function () {
        console.log('error');
    }
});

$.ajax({
    type: "get",
    url: `http://localhost:3000/directors`,
    dataType: "json",
    success: function (data) {
        var select = `<select lay-search="" id="selectDirector"><option value="">请选择导演</option>`;
        var option, value;
        data.data.forEach(function (c) {
            option = c["DIRECTOR"];
            //value = c["COUNTY_ID"];
            select += `<option value="${option}">${option}</option>`;
        });
        select += '</select>';
        document.getElementById('selectDirectors').innerHTML = select;
        form.render();
    },
    error: function () {
        console.log('error');
    }
});

$.ajax({
    type: "get",
    url: `http://localhost:3000/genres`,
    dataType: "json",
    success: function (data) {
        var select = `<select lay-search="" id="selectGenre"><option value="">请选择类型</option>`;
        var option, value;
        data.data.forEach(function (c) {
            option = c["GENRE"];
            //value = c["COUNTY_ID"];
            select += `<option value="${option}">${option}</option>`;
        });
        select += '</select>';
        document.getElementById('selectGenres').innerHTML = select;
        form.render();
    },
    error: function () {
        console.log('error');
    }
});

//$.ajax({
//    type: "get",
//    url: `http://localhost:3000/years`,
//    dataType: "json",
//    success: function (data) {
//        var select = `<select lay-search="" id="selectYear"><option value="">请选择年份</option>`;
//        var option, value;
//        data.data.forEach(function (c) {
//            option = c["YEAR"];
//            //value = c["COUNTY_ID"];
//            select += `<option value="${option}">${option}</option>`;
//        });
//        select += '</select>';
//        document.getElementById('selectYears').innerHTML = select;
//        form.render();
//    },
//    error: function () {
//        console.log('error');
//    }
//});

$.ajax({
    type: "get",
    url: `http://localhost:3000/ratings`,
    dataType: "json",
    success: function (data) {
        var select = `<select lay-search="" id="selectRating"><option value="">请选择评分</option>`;
        var option, value;
        data.data.forEach(function (c) {
            option = c["RATING"];
            //value = c["COUNTY_ID"];
            select += `<option value="${option}">${option}</option>`;
        });
        select += '</select>';
        document.getElementById('selectRatings').innerHTML = select;
        form.render();
    },
    error: function () {
        console.log('error');
    }
});

var buttonSearchMovie = document.getElementById('buttonSearchMovie');
buttonSearchMovie.addEventListener('click', function (e) {
    var movielow = document.getElementById('yearlow').value;
    var moviehigh = document.getElementById('yearhigh').value;
    var selectCountry = document.getElementById('selectCountry');
    var country = selectCountry.options[selectCountry.selectedIndex].value;
    var selectDirector = document.getElementById('selectDirector');
    var director = selectDirector.options[selectDirector.selectedIndex].value;
    var selectGenre = document.getElementById('selectGenre');
    var genre = selectGenre.options[selectGenre.selectedIndex].value;
    //var selectYear = document.getElementById('selectYear');
    //var year = selectYear.options[selectYear.selectedIndex].value;
    var selectRating = document.getElementById('selectRating');
    var rating = selectRating.options[selectRating.selectedIndex].value;
    var name = document.getElementById('inputName').value;
    table.reload('test', {
        url: `http://localhost:3000/filtermovies?ml=${movielow}&mh=${moviehigh}&country=${country}&director=${director}&genre=${genre}&rating=${rating}&name=${name}`
        ,page: {
            curr: 1 //重新从第 1 页开始
        }
    });

});

//setTimeout(function () { form.render(); }, 3000);
