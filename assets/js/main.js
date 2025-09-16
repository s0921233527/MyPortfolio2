// 檔案：assets/js/main.js
// 功能 1：導覽列連結平滑捲動 + 手機點擊後收起選單
document.querySelectorAll('a.nav-link, a.back-to-top').forEach(function(a){
  a.addEventListener('click', function(e){
    // 只對同頁錨點生效
    if(this.hash){
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if(target){
        // 計算扣掉固定導覽列的位移
        const navHeight = document.querySelector('#topNav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      // 若在手機尺寸，點擊後把選單收起
      const nav = document.querySelector('#navContent');
      if(nav && nav.classList.contains('show')){
        const bsCollapse = bootstrap.Collapse.getInstance(nav);
        bsCollapse.hide();
      }
    }
  });
});

// 功能 2：捲動時自動高亮當前區塊的導覽鏈結
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('#topNav .nav-link');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(sec => io.observe(sec));

// 功能 3：回到頂端按鈕顯示/隱藏
const toTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if(window.scrollY > 600){
    toTop.classList.add('show');
  }else{
    toTop.classList.remove('show');
  }
});

// 功能 4：前端表單驗證（示範用，無後端）
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    if(!form.checkValidity()){
      e.preventDefault();
      e.stopPropagation();
    }else{
      e.preventDefault();
      alert('已送出（示範）。實際上你需要串接後端或使用表單服務。');
      form.reset();
    }
    form.classList.add('was-validated');
  }, false);
})();
