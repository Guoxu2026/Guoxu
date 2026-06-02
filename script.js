// 导航栏交互 - 只处理 href="#" 的占位链接
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === '#') {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        }
    });

    // Tab 切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 功能卡片点击效果
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.feature-title').textContent;
            console.log(`打开 ${title} 功能`);
            
            // PPT模式卡片点击时弹出弹窗
            if (this.id === 'pptCard') {
                openPptModal();
                return;
            }
            
            // 这里可以添加其他功能卡片的跳转逻辑
        });
    });

    // PPT弹窗逻辑
    const pptModal = document.getElementById('pptModal');
    const pptModalClose = document.getElementById('pptModalClose');
    const importPptOption = document.getElementById('importPptOption');
    const libraryPptOption = document.getElementById('libraryPptOption');
    const autoScriptSwitch = document.getElementById('autoScriptSwitch');

    function openPptModal() {
        if (pptModal) {
            pptModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closePptModal() {
        if (pptModal) {
            pptModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // 关闭弹窗 - 点击X按钮
    if (pptModalClose) {
        pptModalClose.addEventListener('click', closePptModal);
    }

    // 关闭弹窗 - 点击遮罩层
    if (pptModal) {
        pptModal.addEventListener('click', function(e) {
            if (e.target === pptModal) {
                closePptModal();
            }
        });
    }

    // 关闭弹窗 - ESC键
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && pptModal && pptModal.classList.contains('active')) {
            closePptModal();
        }
    });

    // 选项卡片点击选中效果
    const modalOptions = document.querySelectorAll('.modal-option');
    modalOptions.forEach(option => {
        option.addEventListener('click', function() {
            modalOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // 导入PPT - 点击触发文件选择
    const pptFileInput = document.getElementById('pptFileInput');
    if (importPptOption && pptFileInput) {
        importPptOption.addEventListener('click', function(e) {
            // 选中当前选项
            modalOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            // 触发文件选择
            pptFileInput.click();
        });

        // 文件选择后跳转到编辑器页面
        pptFileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                console.log('已选择文件：', fileName);
                // 跳转到PPT编辑器页面，传递文件名
                window.location.href = 'editor.html?file=' + encodeURIComponent(fileName);
            }
        });
    }

    // 口播稿开关状态变化
    if (autoScriptSwitch) {
        autoScriptSwitch.addEventListener('change', function() {
            const enabled = this.checked;
            console.log('自动生成口播稿：', enabled ? '开启' : '关闭');
        });
    }

    // 作品卡片点击效果
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.work-title').textContent;
            console.log(`打开作品: ${title}`);
            // 这里可以添加实际的作品查看逻辑
        });
    });

    // 课程卡片点击效果
    const plazaCards = document.querySelectorAll('.plaza-card');
    
    plazaCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.plaza-title').textContent;
            console.log(`打开课程: ${title}`);
            // 这里可以添加实际的课程播放逻辑
        });
    });

    // 快速入门卡片效果
    const quickStartCard = document.querySelector('.quick-start-card');
    
    if (quickStartCard) {
        quickStartCard.addEventListener('click', function() {
            console.log('打开快速入门教程');
            // 这里可以添加实际的教程跳转逻辑
        });
    }

    // 用户资料点击效果
    const userProfile = document.querySelector('.user-profile');
    
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            console.log('打开用户菜单');
            // 这里可以添加实际的用户菜单逻辑
        });
    }

    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const featureIllustrations = document.querySelectorAll('.feature-illustration');
        
        featureIllustrations.forEach((illustration, index) => {
            const speed = 0.05;
            const yPos = -(scrolled * speed);
            illustration.style.transform = `translateY(${yPos}px)`;
        });
    });

    // 添加卡片悬停时的微交互
    const addHoverEffect = () => {
        const cards = document.querySelectorAll('.feature-card, .work-card, .plaza-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    };

    // 初始化悬停效果
    addHoverEffect();

    // 页面加载完成动画
    const animateOnLoad = () => {
        const elements = document.querySelectorAll('.feature-card, .work-card, .plaza-card');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    };

    // 页面完全加载后执行动画
    if (document.readyState === 'complete') {
        animateOnLoad();
    } else {
        window.addEventListener('load', animateOnLoad);
    }

    console.log('数字人网络课程生成系统已加载');
});
