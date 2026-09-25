// Learning Tracker - MongoDB Tutorial
// This tracks user progress through the tutorial

(function() {
    'use strict';
    
    // Initialize learning tracker
    console.log('📊 Learning Tracker initialized');
    
    // Check if localStorage is available
    const storageAvailable = typeof(Storage) !== "undefined";
    
    if (!storageAvailable) {
        console.warn('⚠️ LocalStorage not available - progress tracking disabled');
        return;
    }
    
    // Get current page
    const currentPage = getCurrentPage();
    
    // Mark current page as visited
    if (currentPage) {
        markPageVisited(currentPage);
        updateProgress();
    }
    
    // Helper functions
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        return page.replace('.html', '') || 'index';
    }
    
    function markPageVisited(pageName) {
        try {
            const visited = JSON.parse(localStorage.getItem('visited_pages') || '[]');
            if (!visited.includes(pageName)) {
                visited.push(pageName);
                localStorage.setItem('visited_pages', JSON.stringify(visited));
                console.log(`✅ Page marked as visited: ${pageName}`);
            }
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }
    
    function updateProgress() {
        try {
            const visited = JSON.parse(localStorage.getItem('visited_pages') || '[]');
            const totalPages = 64; // Total tutorial pages
            const progress = Math.round((visited.length / totalPages) * 100);
            
            // Update progress indicators if they exist
            const progressElements = document.querySelectorAll('.learning-progress');
            progressElements.forEach(el => {
                el.textContent = `${progress}% Complete`;
                el.setAttribute('data-progress', progress);
            });
            
            console.log(`📈 Progress: ${visited.length}/${totalPages} pages (${progress}%)`);
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    }
    
    // Export functions for external use
    window.LearningTracker = {
        markPageVisited,
        updateProgress,
        getCurrentPage,
        getVisitedPages: function() {
            return JSON.parse(localStorage.getItem('visited_pages') || '[]');
        },
        resetProgress: function() {
            localStorage.removeItem('visited_pages');
            console.log('🔄 Progress reset');
        }
    };
    
})();

// Learning Tracker - MongoDB Tutorial
// This tracks user progress through the tutorial

(function() {
    'use strict';
    
    // Initialize learning tracker
    console.log('📊 Learning Tracker initialized');
    
    // Check if localStorage is available
    const storageAvailable = typeof(Storage) !== "undefined";
    
    if (!storageAvailable) {
        console.warn('⚠️ LocalStorage not available - progress tracking disabled');
        return;
    }
    
    // Get current page
    const currentPage = getCurrentPage();
    
    // Mark current page as visited
    if (currentPage) {
        markPageVisited(currentPage);
        updateProgress();
    }
    
    // Helper functions
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1);
        return page.replace('.html', '') || 'index';
    }
    
    function markPageVisited(pageName) {
        try {
            const visited = JSON.parse(localStorage.getItem('visited_pages') || '[]');
            if (!visited.includes(pageName)) {
                visited.push(pageName);
                localStorage.setItem('visited_pages', JSON.stringify(visited));
                console.log(`✅ Page marked as visited: ${pageName}`);
            }
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }
    
    function updateProgress() {
        try {
            const visited = JSON.parse(localStorage.getItem('visited_pages') || '[]');
            const totalPages = 64; // Total tutorial pages
            const progress = Math.round((visited.length / totalPages) * 100);
            
            // Update progress indicators if they exist
            const progressElements = document.querySelectorAll('.learning-progress');
            progressElements.forEach(el => {
                el.textContent = `${progress}% Complete`;
                el.setAttribute('data-progress', progress);
            });
            
            console.log(`📈 Progress: ${visited.length}/${totalPages} pages (${progress}%)`);
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    }
    
    // Export functions for external use
    window.LearningTracker = {
        markPageVisited,
        updateProgress,
        getCurrentPage,
        getVisitedPages: function() {
            return JSON.parse(localStorage.getItem('visited_pages') || '[]');
        },
        resetProgress: function() {
            localStorage.removeItem('visited_pages');
            console.log('🔄 Progress reset');
        }
    };
    
})();




























