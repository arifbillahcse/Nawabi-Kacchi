/* ============================================================
   NAWABI KACCHI — Menu Page
   ============================================================ */

const tabs   = document.querySelectorAll('.menu-tab');
const panels = document.querySelectorAll('.menu-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const panel = document.getElementById('panel-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');

    // Re-trigger reveal for new panel items
    panel.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('visible');
      requestAnimationFrame(() => el.classList.add('visible'));
    });
  });
});
