var codm = {
    // 配置参数
    config: {
        jsonUrl: '/codm.json',
        defaultContent: 'default'
    },
    // 控制台显示与隐藏
    showCodmConsole: function() {
        document.querySelector(".codm_console").classList.add("show");
    },
    
    hideCodmConsole: function() {
        document.querySelector(".codm_console").classList.remove("show");
    },
    // 卡片显示按钮
    level_up: function(contentType) {
        var content = this.findContent(contentType);
        if (!content) return;
    
        var cardInfo = document.querySelector('.card_info');
        if (cardInfo) {
            cardInfo.innerHTML = 
                '<div class="card_info_head">' +
                '<h1 class="info_head_name">' + content.head_name + '</h1>' +
                '</div>' +
                '<div class="card_info_body">' +
                '<img class="card_info_icon" src="' + content.icon + '" style="width:200px">' +
                '<div class="card_info_desc">' +
                    '<span>' + content.desc + '</span>' +
                '</div>' +
                '<a class="button codm" href="' + content.link + '">开始使用</a>' +
                '</div>';
        }
    },
    // 加载JSON数据
    loadData: function(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.config.jsonUrl, true);
        xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            this.data = JSON.parse(xhr.responseText);
            if (typeof callback === 'function') callback();
            } else {
            console.error('数据加载失败:', xhr.statusText);
            }
        }
        }.bind(this);
        xhr.send();
    },

    // 渲染动态元素
    renderDynamicElements: function() {
        var leftMenu = document.getElementById('left');
        if (leftMenu && this.data[0].level_up_menu) {
        this.data[0].level_up_menu.forEach(function(menuItem) {
            var button = document.createElement('div');
            button.className = 'console-btn-item';
            button.id = menuItem.id;
            button.innerHTML = '<a class="level_up" data-action="' + 
            menuItem.onclick.replace('()', '') + '">' +
            '<i class="fas ' + (menuItem.icon || 'fa-moon') + '"></i>' +
            '</a>';
            leftMenu.appendChild(button);
        });
        }
    },
}