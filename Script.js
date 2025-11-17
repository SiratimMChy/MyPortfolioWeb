const html = document.documentElement;

const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

// Load theme from localStorage on page load
if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark');
} else {
  html.classList.remove('dark');
}

function createModernToggle(button) {
  if (!button) return;

  button.innerHTML = '';

  const container = document.createElement('div');
  container.className =
    'w-14 h-7 flex items-center rounded-full p-1 bg-gray-300 dark:bg-gray-700 relative cursor-pointer transition-colors duration-300';

  const sun = document.createElement('span');
  sun.className = 'absolute left-2 text-yellow-500 text-sm select-none';
  sun.textContent = '🔅';

  const moon = document.createElement('span');
  moon.className = 'absolute right-2 text-gray-200 text-sm select-none';
  moon.textContent = '🌒';

  const dot = document.createElement('div');
  dot.id = 'toggleDot';
  dot.className =
    'w-5 h-5 rounded-full shadow-md bg-white transform transition-transform duration-300';

  // Set initial position of toggle dot
  if (html.classList.contains('dark')) {
    dot.classList.add('translate-x-7');
  }

  container.appendChild(sun);
  container.appendChild(moon);
  container.appendChild(dot);
  button.appendChild(container);

  button.onclick = () => {
    html.classList.toggle('dark');
    dot.classList.toggle('translate-x-7');

    // Save theme to localStorage
    if (html.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  };
}

createModernToggle(themeToggle);
createModernToggle(themeToggleMobile);

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
});

// Staggered text animation
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.stagger').forEach(el => {
    const text = el.textContent || '';
    el.textContent = '';
    [...text].forEach((ch, i) => {
      if (ch === ' ') {
        el.appendChild(document.createTextNode(' '));
        return;
      }
      const span = document.createElement('span');
      span.textContent = ch;
      span.style.setProperty('--i', i);
      el.appendChild(span);
    });
  });
});
