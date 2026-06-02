// 素材库页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 资源类型标签切换
    const resourceTabs = document.querySelectorAll('.resource-tab');
    
    resourceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有活跃状态
            resourceTabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前项活跃状态
            this.classList.add('active');
            
            const type = this.dataset.type;
            console.log(`切换到资源类型: ${type}`);
            
            // 这里可以添加切换资源类型的逻辑
            // 例如：根据类型加载不同的素材
            loadMaterialsByType(type);
        });
    });
    
    // 根据类型加载素材
    function loadMaterialsByType(type) {
        // 模拟加载不同类别的素材
        const materialsGrid = document.querySelector('.materials-grid');
        
        // 这里可以根据类型发送请求获取对应的素材
        // 目前只是演示，实际使用时需要连接后端API
        console.log(`加载 ${type} 类型的素材`);
        
        // 示例：切换时更新格式提示
        const formatHint = document.querySelector('.format-hint span:first-child');
        if (type === 'intro') {
            formatHint.textContent = '*支持格式MP4、MOV，大小不超过100M，宽高比为16:9';
        } else if (type === 'bgm') {
            formatHint.textContent = '*支持格式MP3、WAV，大小不超过20M';
        } else if (type === 'ppt') {
            formatHint.textContent = '*支持格式PPT、PPTX，大小不超过50M';
        } else {
            formatHint.textContent = '*支持格式PNG、JPG、JPEG，大小不超过10M，宽高比为16:9';
        }
    }
    
    // 筛选下拉框
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const category = this.value;
            console.log(`筛选类别: ${category}`);
            // 这里可以添加筛选逻辑
        });
    }
    
    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const keyword = searchInput.value.trim();
            if (keyword) {
                console.log(`搜索: ${keyword}`);
                // 这里可以添加搜索逻辑
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // 上传按钮
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            console.log('打开上传对话框');
            // 这里可以添加上传逻辑
            alert('上传功能开发中...');
        });
    }
    
    // 素材卡片点击
    const materialCards = document.querySelectorAll('.material-card');
    
    materialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是删除按钮，不触发卡片点击
            if (e.target.closest('.delete-btn')) {
                return;
            }
            
            const name = this.querySelector('.material-name').textContent;
            console.log(`查看素材: ${name}`);
            // 这里可以添加预览逻辑
        });
    });
    
    // 删除按钮
    const deleteBtns = document.querySelectorAll('.delete-btn');
    
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.material-card');
            const name = card.querySelector('.material-name').textContent;
            
            if (confirm(`确定要删除 "${name}" 吗？`)) {
                console.log(`删除素材: ${name}`);
                card.remove();
                // 这里可以添加删除逻辑
            }
        });
    });
    
    // 预览按钮
    const previewBtns = document.querySelectorAll('.preview-btn');
    
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.material-card');
            const name = card.querySelector('.material-name').textContent;
            console.log(`预览素材: ${name}`);
            // 这里可以添加预览逻辑
        });
    });
    
    // 分页按钮
    const pageBtns = document.querySelectorAll('.page-btn');
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            
            const page = this.textContent;
            console.log(`切换到第 ${page} 页`);
            
            // 更新活跃状态
            pageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 这里可以添加分页加载逻辑
        });
    });
    
    // 上一页/下一页
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('上一页');
            // 这里可以添加上一页逻辑
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('下一页');
            // 这里可以添加下一页逻辑
        });
    }
    
    console.log('素材库页面已加载');
});
