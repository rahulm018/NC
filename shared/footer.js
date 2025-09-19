function createFooterHTML() {
    let footerLinksHTML = '';

    for (const groupName in pageGroups) { // Assumes pageGroups is available from header.js
        const groupPages = pageGroups[groupName];
        footerLinksHTML += `
            <div>
              <h4 class="text-sm font-semibold text-slate-800">${groupName}</h4>
              <div class="flex flex-col items-start gap-1 mt-2">
                ${groupPages.map(p => `<a href="${p.url}" class="text-sm text-slate-600 hover:text-primary-600 transition-colors">${p.title}</a>`).join('')}
              </div>
            </div>
        `;
    }
    
    return `
        <div class="bg-white border-t border-slate-200 mt-auto">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p class="text-sm text-slate-500">&copy; 2024 NC Module Demo. All Rights Reserved.</p>
                    <div class="grid grid-cols-2 md:flex items-start gap-8">
                        ${footerLinksHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initializeFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
     if (!footerPlaceholder) {
        console.error('Footer placeholder not found. Make sure you have <footer id="footer-placeholder"></footer> in your HTML.');
        return;
    }

    // Check if pageGroups is loaded from header.js, if not, wait a bit.
    if (typeof pageGroups !== 'undefined') {
        footerPlaceholder.innerHTML = createFooterHTML();
    } else {
        setTimeout(initializeFooter, 50); // Retry after 50ms
    }
}

document.addEventListener('DOMContentLoaded', initializeFooter);

