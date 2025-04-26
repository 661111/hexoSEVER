var codm = {
    // 控制台显示与隐藏
    showCodmConsole: function() {
        document.querySelector(".codm_console").classList.add("show");
    },
    
    hideCodmConsole: function() {
        document.querySelector(".codm_console").classList.remove("show");
    }
}

// 全局变量定义
var codm = {
    // 初始化标志
    initialized: false,
    
    // 配置参数
    config: {
      jsonUrl: '/data/codm.json',
      defaultContent: 'default'
    },
  
    // 初始化方法
    init: function() {
      if (this.initialized) return;
      
      this.loadData(function() {
        this.bindEvents();
        this.renderDynamicElements();
        this.showContent(this.config.defaultContent);
        this.initialized = true;
      }.bind(this));
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
  
    // 事件绑定
    bindEvents: function() {
      var consoleContainer = document.querySelector('.codm_console');
      
      // 使用事件委托处理动态元素
      consoleContainer.addEventListener('click', function(e) {
        var target = e.target;
        while (target !== consoleContainer) {
          if (target.matches('[data-action]')) {
            var action = target.getAttribute('data-action');
            if (typeof codm[action] === 'function') {
              codm[action]();
            }
            return;
          }
          target = target.parentNode;
        }
      });
  
      // 关闭按钮
      var closeBtn = document.querySelector('.close_up_bottom');
      if (closeBtn) {
        closeBtn.addEventListener('click', this.hideConsole.bind(this));
      }
    },
  
    // 显示内容
    showContent: function(contentType) {
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
  
    // 查找内容数据
    findContent: function(contentType) {
      if (!this.data || !this.data[0].level_up_group) return null;
      return this.data[0].level_up_group.find(function(item) {
        return item.head_name.toLowerCase().indexOf(contentType) > -1;
      });
    },
  };
  
  // 页面加载后初始化
  if (window.addEventListener) {
    window.addEventListener('load', function() {
      codm.init();
    });
  } else {
    window.attachEvent('onload', function() {
      codm.init();
    });
  }