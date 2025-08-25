const html = document.documentElement;

const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

function createModernToggle(button) {
  if (!button) return;

  button.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'w-14 h-7 flex items-center rounded-full p-1 bg-gray-300 dark:bg-gray-700 relative cursor-pointer transition-colors duration-300';

  const sun = document.createElement('span');
  sun.className = 'absolute left-2 text-yellow-500 text-sm';
  sun.textContent = '🔅';

  const moon = document.createElement('span');
  moon.className = 'absolute right-2 text-gray-200 text-sm';
  moon.textContent = '🌒';

  const dot = document.createElement('div');
  dot.id = 'toggleDot';
  dot.className = 'w-5 h-5 rounded-full shadow-md bg-white transform transition-transform duration-300';

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
  };
}

createModernToggle(themeToggle);
createModernToggle(themeToggleMobile);
