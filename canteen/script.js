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
        $.each(rows, function(index, row) {
            if (row.trim() === '') {
                // 如果是空行，单独成一个 td
                var tr = $('<tr></tr>');
                var td = $('<td></td>');
                tr.append(td);
                table.append(tr);
            } else {
                // 非空行，分为两列
                var parts = row.split('，');
                if (parts.length < 2) {
                    parts = [row, ''];
                }
                var tr = $('<tr></tr>');
                var td1 = $('<td>' + parts[0] + '</td>');
                var td2 = $('<td>' + parts[1] + '</td>');
                tr.append(td1);
                tr.append(td2);
                table.append(tr);
            }
        });
        var menuDisplay = $('<div id="menu-display"></div>');
        menuDisplay.append(table);
        // 添加返回按钮
        var backButton = $('<button>返回</button>');
        backButton.click(function() {
            $('#menu-display').empty();
            $('#window-list').show();
            $('#hello-message').show();
            // 确保菜单隐藏
            table.remove();
        });
        // 添加顶部返回查看餐厅窗口按钮
        var topBackButton = $('<button>返回餐厅窗口</button>');
        topBackButton.click(function() {
            $('#menu-display').empty();
            $('#window-list').show();
            $('#hello-message').show();
            // 确保菜单隐藏
            table.remove();
        });
        menuDisplay.prepend(topBackButton);
        menuDisplay.append(backButton);
        $('#window-list').hide();
        $('#hello-message').hide();
        $('body').append(menuDisplay);
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
 