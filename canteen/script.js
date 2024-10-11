// 读取窗口名称文件
$.get('canteen//window.txt', function(data) {
    // 将窗口名称解析为列表
    var windows = data.split('\n');
    var windowList = $('<ul></ul>');
    $.each(windows, function(index, windowName) {
        // 去除序号和多余的空格
        var cleanWindowName = windowName.replace(/^\d+\.\s*/, '');
        var listItem = $('<li>' + cleanWindowName + '</li>');
        listItem.click(function() {
            // 根据点击的窗口序号加载对应的菜品文件
            var mealFileName = 'canteen//meal0' + (index + 1) + '.txt';
            if (index + 1 >= 10) {
                mealFileName = 'meal' + (index + 1) + '.txt';
            }
            loadMenu(cleanWindowName, mealFileName);
        });
        windowList.append(listItem);
    });
    $('#window-list').html(windowList);
});

function loadMenu(windowName, mealFileName) {
    // 根据窗口名称和菜品文件加载对应的菜品
    $.get(mealFileName, function(data) {
        var rows = data.split('\n');
        var table = $('<table></table>');
        var backgroundColor = '#f9eec7'; // 浅黄色
        $.each(rows, function(index, row) {
            if (row.trim() === '') {
                // 如果是空行，单独成一个 td
                var tr = $('<tr></tr>');
                var td = $('<td></td>');
                tr.append(td);
                table.append(tr);
            } else {
                var parts = row.split(/\s+/);
                if (parts.length > 1 && /^\d/.test(parts[1])) {
                    var tr = $('<tr></tr>');
                    var td1 = $('<td style="background-color:' + backgroundColor + '">' + parts[0] + '</td>');
                    var td2 = $('<td style="background-color:' + (backgroundColor === '#f9eec7'? '#c7e8f9' : '#f9eec7') + '">' + parts[1] + '</td>');
                    tr.append(td1);
                    tr.append(td2);
                    table.append(tr);
                } else {
                    var tr = $('<tr></tr>');
                    var td = $('<td style="background-color:' + backgroundColor + '">' + row + '</td>');
                    tr.append(td);
                    table.append(tr);
                }
            }
        });
        var menuDisplay = $('<div id="menu-display"></div>');
        menuDisplay.append(table);
        // 添加返回按钮
        var backButton = $('<button>返回</button>');
        backButton.click(function() {
            // 隐藏当前查看的内容
            $('#menu-display').empty();
            // 显示窗口列表和底部的提示信息
            $('#window-list').show();
            $('#hello-message').show();
            // 隐藏返回按钮
            $(this).hide();
            // 不操作音频控件
            // 恢复其他状态到初始状态
            $('body').removeClass('viewing-menu');
            // 确保之前的 table 被隐藏
            table.hide();
        });
        menuDisplay.prepend(backButton);
        $('#window-list').hide();
        $('#hello-message').hide();
        $('body').addClass('viewing-menu').append(menuDisplay);

        // 调整字体大小
        table.find('td').css('font-size', '24px');
    });
}


let isPlayed = false;
$(document).on('click touchstart', function (event) {
    if (!isPlayed) {
        const audio = $('audio[name="music_top"]')[0];
        audio.play();
        isPlayed = true;
    }
});
 