export default {
    init() {
        const button = document.querySelector('[data-btn-scroll]');
        if (!button) return;
    
        const toggleAndScroll = () => {
            button.style.display = window.scrollY > 200 ? 'block' : 'none';
        };
    
        window.addEventListener('scroll', toggleAndScroll);
        button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    
        toggleAndScroll();
    }
  };