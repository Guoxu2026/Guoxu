// 作品管理页面交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // Tab 切换
    const tabBtns = document.querySelectorAll('.works-tab');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活跃状态
            tabBtns.forEach(tab => tab.classList.remove('active'));
            
            // 添加当前项活跃状态
            this.classList.add('active');
            
            // 可以在这里添加切换内容的逻辑
            console.log('切换到：', this.textContent);
        });
    });

    // 全选/全不选
    const checkboxAll = document.querySelector('.checkbox-all');
    const checkboxItems = document.querySelectorAll('.checkbox-item');
    
    if (checkboxAll) {
        checkboxAll.addEventListener('change', function() {
            checkboxItems.forEach(item => {
                item.checked = this.checked;
            });
        });
    }
    
    // 单个复选框变化时更新全选状态
    checkboxItems.forEach(item => {
        item.addEventListener('change', function() {
            const allChecked = Array.from(checkboxItems).every(cb => cb.checked);
            const someChecked = Array.from(checkboxItems).some(cb => cb.checked);
            
            if (checkboxAll) {
                checkboxAll.checked = allChecked;
                checkboxAll.indeterminate = someChecked && !allChecked;
            }
        });
    });

    // 批量导入按钮
    const batchImportBtn = document.querySelector('.btn-batch-import');
    if (batchImportBtn) {
        batchImportBtn.addEventListener('click', function() {
            console.log('打开批量导入对话框');
            // 这里可以添加实际的批量导入逻辑
            alert('批量导入功能');
        });
    }

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        // 点击搜索按钮
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        // 回车搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    function performSearch(keyword) {
        if (keyword.trim()) {
            console.log('搜索关键词：', keyword);
            // 这里可以添加实际的搜索逻辑
        }
    }

    // 筛选下拉框
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            console.log('筛选类型：', this.value);
            // 这里可以添加实际的筛选逻辑
        });
    }

    // 操作按钮
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.getAttribute('title');
            const row = this.closest('tr');
            const workName = row.querySelector('.work-name').textContent;
            
            console.log(`${action}：${workName}`);
            
            switch(action) {
                case '编辑':
                    // 编辑逻辑
                    alert(`编辑作品：${workName}`);
                    break;
                case '删除':
                    // 删除逻辑
                    if (confirm(`确定要删除作品「${workName}」吗？`)) {
                        console.log('删除作品：', workName);
                        // row.remove(); // 实际删除
                    }
                    break;
                case '更多':
                    // 更多选项
                    alert(`更多选项：${workName}`);
                    break;
            }
        });
    });

    // 分页
    const pageBtns = document.querySelectorAll('.page-number');
    const prevBtn = document.querySelector('.page-prev');
    const nextBtn = document.querySelector('.page-next');
    
    let currentPage = 1;
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            // 更新活跃状态
            pageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentPage = parseInt(this.textContent);
            
            // 更新上一页/下一页按钮状态
            if (prevBtn) {
                prevBtn.disabled = currentPage === 1;
            }
            if (nextBtn) {
                nextBtn.disabled = currentPage === 5; // 假设最大5页
            }
            
            console.log('切换到第', currentPage, '页');
            // 这里可以添加实际的翻页逻辑
        });
    });
    
    // 上一页
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });
    }
    
    // 下一页
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < 5) { // 假设最大5页
                currentPage++;
                updatePagination();
            }
        });
    }
    
    function updatePagination() {
        pageBtns.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === currentPage) {
                btn.classList.add('active');
            }
        });
        
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage === 5;
        }
        
        console.log('切换到第', currentPage, '页');
    }

    // 表格行点击效果
    const tableRows = document.querySelectorAll('.works-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // 如果点击的是复选框或操作按钮，不触发行点击
            if (e.target.type === 'checkbox' || e.target.closest('.action-btn')) {
                return;
            }
            
            const workName = this.querySelector('.work-name').textContent;
            console.log('查看作品详情：', workName);
            // 这里可以添加查看详情的逻辑
        });
    });

    console.log('作品管理页面已加载');
});
