// --- SINGLE SOURCE OF TRUTH FOR NAVIGATION ---
// To add, remove, or change a link, you only need to edit this array.
const PAGES = [
    // Standalone link example
    { id: 'hub', title: 'Hub', url: '#hub', isStandalone: true }, // Changed
    // Grouped links example
    { id: 'listing', title: 'Listing', url: '#listing', description: '...', icon: '...', group: 'NC Group' }, // Changed
    { id: 'creation', title: 'Creation', url: '#creation', description: '...', icon: '...', group: 'NC Group' }, // Changed
    { id: 'view', title: 'View', url: '#view', description: '...', icon: '...', group: 'NC Group' }, // Changed
    { id: 'dashboard', title: 'Dashboard', url: '#dashboard', description: '...', icon: '...', group: 'NC Group' }, // Changed
    { id: '8d_view', title: 'View', url: '#', description: '...', icon: '...', group: '8D Group' },
    { id: 'copq_mapping', title: 'Mapping', url: '#copq_mapping', description: '...', icon: '...', group: 'CoPQ Group' }, // Changed
];

// Group pages by their 'group' property
const pageGroups = PAGES.reduce((acc, page) => {
    if (page.group) {
        if (!acc[page.group]) acc[page.group] = [];
        acc[page.group].push(page);
    }
    return acc;
}, {});


function createHeaderHTML() {
    const standaloneLinks = PAGES.filter(p => p.isStandalone);

    let desktopNavHTML = standaloneLinks.map(p => `<a href="${p.url}" class="nav-link">${p.title}</a>`).join('');
    let mobileNavHTML = standaloneLinks.map(p => `<a href="${p.url}" class="nav-link block">${p.title}</a>`).join('');

    for (const groupName in pageGroups) {
        const groupPages = pageGroups[groupName];
        
        // Desktop Dropdown
        desktopNavHTML += `
            <div class="relative">
              <button class="nav-link dropdown-toggle">
                ${groupName}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div class="dropdown-menu">
                <div class="py-1">
                  ${groupPages.map(p => `<a href="${p.url}" class="block px-4 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600">${p.title}</a>`).join('')}
                </div>
              </div>
            </div>
        `;
        
        // Mobile Accordion
        mobileNavHTML += `<div class="px-3 py-2 text-xs font-semibold text-slate-500 uppercase">${groupName}</div>`;
        groupPages.forEach(p => {
           mobileNavHTML += `<a href="${p.url}" class="nav-link block ml-2">${p.title}</a>`;
        });
    }

    return `
        <div class="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center gap-4">
                        <a href="index.html" class="flex items-center gap-3 group">
                            <div class="h-10 w-10 rounded-lg bg-primary-600 text-white grid place-items-center font-black text-lg shadow-md group-hover:scale-105 transition-transform">N</div>
                            <div>
                                <p class="text-xs tracking-wider text-slate-500 uppercase font-medium">NC Module</p>
                                <h1 class="text-base font-bold text-slate-800">Navigation Hub</h1>
                            </div>
                        </a>
                    </div>
                    <nav class="hidden md:flex items-center gap-1">${desktopNavHTML}</nav>
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-primary-600 hover:bg-primary-50 focus:outline-none">
                            <span class="sr-only">Open main menu</span>
                            <svg id="menu-icon-open" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                            <svg id="menu-icon-close" class="h-6 w-6 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div id="mobile-menu" class="md:hidden hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">${mobileNavHTML}</div>
            </div>
        </div>
    `;
}

function generateHubSections() {
    const hubContainer = document.getElementById('hub-sections-container');
    if (!hubContainer) return; // Only run on the index page
    hubContainer.innerHTML = '';

    for (const groupName in pageGroups) {
       const groupPages = pageGroups[groupName];
       hubContainer.innerHTML += `
        <section>
          <h3 class="text-2xl font-bold text-slate-800 mb-6">${groupName}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            ${groupPages.map(page => `
              <a href="${page.url}" class="card p-6 text-center group flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300">
                <div class="mb-4 h-16 w-16 rounded-full bg-primary-100 text-primary-600 grid place-items-center transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110">
                  ${page.icon}
                </div>
                <h4 class="text-lg font-bold text-slate-800">${page.title}</h4>
                <p class="mt-1 text-sm text-slate-500">${page.description}</p>
              </a>
            `).join('')}
          </div>
        </section>
       `;
    }
}


// This function runs when the script is loaded
function initializeHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) {
        console.error('Header placeholder not found. Make sure you have <header id="header-placeholder"></header> in your HTML.');
        return;
    }

    headerPlaceholder.innerHTML = createHeaderHTML();
    
    // After injecting HTML, add event listeners
    
    // 1. Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            menuIconOpen.classList.toggle('hidden', !isHidden);
            menuIconClose.classList.toggle('hidden', isHidden);
        });
    }

    // 2. Clickable Dropdowns
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const dropdownMenu = toggle.nextElementSibling;
            
            // Close other open dropdowns first
            document.querySelectorAll('.dropdown-menu.active').forEach(openMenu => {
                if (openMenu !== dropdownMenu) {
                    openMenu.classList.remove('active');
                }
            });

            dropdownMenu.classList.toggle('active');
        });
    });

    // Close dropdowns if clicking outside
    window.addEventListener('click', (event) => {
        if (!event.target.matches('.dropdown-toggle')) {
            document.querySelectorAll('.dropdown-menu.active').forEach(openMenu => {
                openMenu.classList.remove('active');
            });
        }
    });

    // 3. Generate Hub page content (if on the right page)
    generateHubSections();
}

// Run the initialization
document.addEventListener('DOMContentLoaded', initializeHeader);
