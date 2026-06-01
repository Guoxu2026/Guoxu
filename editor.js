// PPT编辑器页面交互

document.addEventListener('DOMContentLoaded', function() {
    // 左侧幻灯片缩略图点击
    const slideThumbs = document.querySelectorAll('.slide-thumb');
    const filmFrames = document.querySelectorAll('.film-frame');
    const pageNums = document.querySelectorAll('.page-num');

    function selectSlide(slideNum) {
        slideThumbs.forEach(t => t.classList.remove('active'));
        filmFrames.forEach(f => f.classList.remove('active'));
        pageNums.forEach(p => p.classList.remove('active'));

        const thumb = document.querySelector(`.slide-thumb[data-slide="${slideNum}"]`);
        const frame = document.querySelector(`.film-frame[data-slide="${slideNum}"]`);
        const page = document.querySelector(`.page-num:nth-child(${slideNum})`);

        if (thumb) thumb.classList.add('active');
        if (frame) frame.classList.add('active');
        if (page) page.classList.add('active');
        if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    slideThumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            selectSlide(this.getAttribute('data-slide'));
        });
    });

    filmFrames.forEach(frame => {
        frame.addEventListener('click', function() {
            selectSlide(this.getAttribute('data-slide'));
        });
    });

    pageNums.forEach((page, index) => {
        page.addEventListener('click', function() {
            selectSlide(String(index + 1));
        });
    });

    // 模式Tab切换
    const modeTabs = document.querySelectorAll('.mode-tab');
    modeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            modeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 应用方式按钮
    const applyBtns = document.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            applyBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 保存并生成视频
    const generateBtn = document.querySelector('.btn-generate');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            alert('视频生成任务已提交！');
        });
    }

    // ==================== 片头片尾选择面板功能 ====================

    let currentSelectType = ''; // 'intro' 或 'outro'

    const videoSelectOverlay = document.getElementById('videoSelectOverlay');
    const videoSelectPanel = document.getElementById('videoSelectPanel');
    const videoSelectTitle = document.getElementById('videoSelectTitle');
    const videoSelectClose = document.getElementById('videoSelectClose');
    const videoSelectTabs = document.querySelectorAll('.video-select-tab');
    const videoSelectContents = document.querySelectorAll('.video-select-content');
    const libraryContent = document.getElementById('libraryContent');
    const uploadContent = document.getElementById('uploadContent');
    const uploadBox = document.getElementById('uploadBox');
    const localFileInput = document.getElementById('localFileInput');

    // 打开选择面板
    function openVideoSelect(type) {
        currentSelectType = type;
        videoSelectTitle.textContent = type === 'intro' ? '选择片头' : '选择片尾';
        videoSelectOverlay.classList.remove('hidden');
        // 默认显示素材库
        switchTab('library');
    }

    // 关闭选择面板
    function closeVideoSelect() {
        videoSelectOverlay.classList.add('hidden');
        currentSelectType = '';
    }

    // 切换Tab
    function switchTab(tabName) {
        videoSelectTabs.forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
        });
        videoSelectContents.forEach(content => {
            content.classList.toggle('active', content.id === tabName + 'Content');
        });
    }

    // Tab点击事件
    videoSelectTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.getAttribute('data-tab'));
        });
    });

    // 关闭按钮
    if (videoSelectClose) {
        videoSelectClose.addEventListener('click', closeVideoSelect);
    }

    // 点击遮罩关闭
    if (videoSelectOverlay) {
        videoSelectOverlay.addEventListener('click', function(e) {
            if (e.target === videoSelectOverlay) {
                closeVideoSelect();
            }
        });
    }

    // 片头占位符点击
    const introPlaceholder = document.getElementById('introPlaceholder');
    if (introPlaceholder) {
        introPlaceholder.addEventListener('click', function() {
            openVideoSelect('intro');
        });
    }

    // 片尾占位符点击
    const outroPlaceholder = document.getElementById('outroPlaceholder');
    if (outroPlaceholder) {
        outroPlaceholder.addEventListener('click', function() {
            openVideoSelect('outro');
        });
    }

    // 素材库视频选择
    const videoLibraryItems = document.querySelectorAll('.video-library-item');
    videoLibraryItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoName = this.querySelector('.video-name').textContent;
            const videoSrc = this.getAttribute('data-video');

            if (currentSelectType === 'intro') {
                setIntroOutroVideo('intro', videoSrc, videoName);
            } else if (currentSelectType === 'outro') {
                setIntroOutroVideo('outro', videoSrc, videoName);
            }
            closeVideoSelect();
        });
    });

    // 本地上传区域点击
    if (uploadBox && localFileInput) {
        uploadBox.addEventListener('click', function() {
            localFileInput.click();
        });
    }

    // 本地上传文件选择
    if (localFileInput) {
        localFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('video/')) {
                const url = URL.createObjectURL(file);
                if (currentSelectType === 'intro') {
                    setIntroOutroVideo('intro', url, file.name);
                } else if (currentSelectType === 'outro') {
                    setIntroOutroVideo('outro', url, file.name);
                }
                closeVideoSelect();
            }
        });
    }

    // 设置片头/片尾视频
    function setIntroOutroVideo(type, src, name) {
        const video = document.getElementById(type + 'Video');
        const preview = document.getElementById(type + 'Preview');
        const placeholder = document.getElementById(type + 'Placeholder');

        if (video && preview && placeholder) {
            video.src = src;
            placeholder.classList.add('hidden');
            preview.classList.remove('hidden');
        }
    }

    // 删除片头
    const deleteIntro = document.getElementById('deleteIntro');
    if (deleteIntro) {
        deleteIntro.addEventListener('click', function(e) {
            e.stopPropagation();
            const video = document.getElementById('introVideo');
            const preview = document.getElementById('introPreview');
            const placeholder = document.getElementById('introPlaceholder');
            if (video && preview && placeholder) {
                video.src = '';
                preview.classList.add('hidden');
                placeholder.classList.remove('hidden');
            }
        });
    }

    // 删除片尾
    const deleteOutro = document.getElementById('deleteOutro');
    if (deleteOutro) {
        deleteOutro.addEventListener('click', function(e) {
            e.stopPropagation();
            const video = document.getElementById('outroVideo');
            const preview = document.getElementById('outroPreview');
            const placeholder = document.getElementById('outroPlaceholder');
            if (video && preview && placeholder) {
                video.src = '';
                preview.classList.add('hidden');
                placeholder.classList.remove('hidden');
            }
        });
    }

    console.log('PPT编辑器页面已加载');
});
