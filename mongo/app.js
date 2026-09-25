// ===== Global Variables =====
let currentTheme = localStorage.getItem('theme') || 'light';

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeMobileMenu();
    initializeSearch();
    initializeActiveNavigation();
    initializeSmoothScrolling();
    initializeCodeCopyButtons();
    initializeBackToTop();
    highlightCurrentPage();
});

// ===== Theme Management =====
function initializeTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    applyTheme(savedTheme);
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
}

function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('.theme-icon');
        const themeText = themeToggleBtn.querySelector('.theme-text');
        
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark Mode';
        }
    }
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// ===== Mobile Menu =====
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            sidebar.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        const navLinks = sidebar.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// ===== Page Search Functionality =====
function initializeSearch() {
    const searchInput = document.getElementById('page-search');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });
    }
}

function performSearch(query) {
    if (!query || query.length < 2) {
        clearSearchHighlights();
        return;
    }
    
    const content = document.querySelector('.main-content');
    const searchRegex = new RegExp(query, 'gi');
    
    // Simple search highlighting
    clearSearchHighlights();
    
    const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    const nodesToReplace = [];
    
    while (node = walker.nextNode()) {
        if (node.nodeValue.match(searchRegex) && 
            !node.parentElement.closest('script, style, .search-box')) {
            nodesToReplace.push(node);
        }
    }
    
    nodesToReplace.forEach(node => {
        const span = document.createElement('span');
        span.innerHTML = node.nodeValue.replace(searchRegex, '<mark class="search-highlight">$&</mark>');
        node.parentNode.replaceChild(span, node);
    });
    
    // Scroll to first result
    const firstHighlight = document.querySelector('.search-highlight');
    if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const text = highlight.textContent;
        const textNode = document.createTextNode(text);
        highlight.parentNode.replaceChild(textNode, highlight);
    });
}

// ===== Active Navigation =====
function initializeActiveNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function highlightCurrentPage() {
    initializeActiveNavigation();
}

// ===== Smooth Scrolling =====
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Code Copy Buttons =====
function initializeCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code, .code-block');
    
    codeBlocks.forEach((block, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '📋 Copy';
        copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
        
        copyBtn.addEventListener('click', () => {
            copyToClipboard(block.textContent, copyBtn);
        });
        
        if (block.parentNode.tagName === 'PRE') {
            block.parentNode.parentNode.insertBefore(wrapper, block.parentNode);
            wrapper.appendChild(block.parentNode);
        } else {
            block.parentNode.insertBefore(wrapper, block);
            wrapper.appendChild(block);
        }
        
        wrapper.appendChild(copyBtn);
    });
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copied!';
        button.style.background = '#4DB33D';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.innerHTML = '❌ Failed';
        setTimeout(() => {
            button.innerHTML = '📋 Copy';
        }, 2000);
    });
}

// ===== Back to Top Button =====
function initializeBackToTop() {
    let backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            box-shadow: 0 4px 12px rgba(77, 179, 61, 0.3);
            z-index: 999;
        `;
        document.body.appendChild(backToTopBtn);
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Expandable Sections =====
function initializeExpandableSections() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const content = document.getElementById(target);
            
            if (content) {
                content.classList.toggle('expanded');
                this.textContent = content.classList.contains('expanded') ? 
                    '▼ Collapse' : '▶ Expand';
            }
        });
    });
}

// ===== Tab Functionality =====
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabGroup = this.closest('.tabs');
            const targetId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons in this group
            tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Hide all tab contents in this group
            tabGroup.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activate clicked button and corresponding content
            this.classList.add('active');
            const targetContent = tabGroup.querySelector(`#${targetId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===== Quiz Functionality =====
function initializeQuiz() {
    const quizForms = document.querySelectorAll('.quiz-form');
    
    quizForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            checkQuizAnswers(this);
        });
    });
}

function checkQuizAnswers(form) {
    const questions = form.querySelectorAll('.quiz-question');
    let correct = 0;
    let total = questions.length;
    
    questions.forEach(question => {
        const selectedAnswer = question.querySelector('input[type="radio"]:checked');
        const correctAnswer = question.querySelector('input[data-correct="true"]');
        const feedback = question.querySelector('.feedback');
        
        if (selectedAnswer) {
            if (selectedAnswer.dataset.correct === 'true') {
                correct++;
                if (feedback) {
                    feedback.textContent = '✅ Correct!';
                    feedback.style.color = '#4DB33D';
                }
            } else {
                if (feedback) {
                    feedback.textContent = `❌ Incorrect. The correct answer is: ${correctAnswer.nextElementSibling.textContent}`;
                    feedback.style.color = '#FF6B6B';
                }
            }
            if (feedback) {
                feedback.style.display = 'block';
            }
        }
    });
    
    const resultDiv = form.querySelector('.quiz-result');
    if (resultDiv) {
        const percentage = (correct / total) * 100;
        let message = '';
        
        if (percentage === 100) {
            message = '🎉 Perfect score! Excellent work!';
        } else if (percentage >= 70) {
            message = '👍 Great job! You\'re on the right track!';
        } else if (percentage >= 50) {
            message = '📚 Good effort! Review the material and try again.';
        } else {
            message = '💪 Keep learning! Go back and review the concepts.';
        }
        
        resultDiv.innerHTML = `
            <h3>Your Score: ${correct}/${total} (${percentage.toFixed(0)}%)</h3>
            <p>${message}</p>
        `;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ===== Interactive Code Examples =====
function initializeInteractiveCode() {
    const runButtons = document.querySelectorAll('.run-code-btn');
    
    runButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.previousElementSibling;
            const outputDiv = this.nextElementSibling;
            
            if (codeBlock && outputDiv) {
                try {
                    const code = codeBlock.textContent;
                    // For demonstration - in real implementation, use a safe sandbox
                    outputDiv.textContent = 'Code execution simulated. In production, use a proper sandbox.';
                    outputDiv.style.display = 'block';
                } catch (error) {
                    outputDiv.textContent = `Error: ${error.message}`;
                    outputDiv.style.display = 'block';
                }
            }
        });
    });
}

// ===== Progress Tracking =====
function trackProgress(section) {
    let progress = JSON.parse(localStorage.getItem('mongoProgress') || '{}');
    progress[section] = true;
    localStorage.setItem('mongoProgress', JSON.stringify(progress));
    updateProgressIndicators();
}

function updateProgressIndicators() {
    const progress = JSON.parse(localStorage.getItem('mongoProgress') || '{}');
    const completed = Object.keys(progress).length;
    
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const total = bar.dataset.total || 16;
        const percentage = (completed / total) * 100;
        bar.style.width = `${percentage}%`;
        bar.setAttribute('aria-valuenow', percentage);
    });
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('page-search');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
        }
    }
});

// ===== Intersection Observer for Animations =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== Local Storage Utilities =====
function saveNote(section, note) {
    let notes = JSON.parse(localStorage.getItem('mongoNotes') || '{}');
    notes[section] = note;
    localStorage.setItem('mongoNotes', JSON.stringify(notes));
}

function loadNote(section) {
    const notes = JSON.parse(localStorage.getItem('mongoNotes') || '{}');
    return notes[section] || '';
}

// ===== Print Functionality =====
function initializePrintButton() {
    const printButtons = document.querySelectorAll('.print-btn');
    
    printButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.print();
        });
    });
}

// ===== Table of Contents Generator =====
function generateTableOfContents() {
    const tocContainer = document.querySelector('.toc-container');
    if (!tocContainer) return;
    
    const headings = document.querySelectorAll('.main-content h2, .main-content h3');
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    
    headings.forEach((heading, index) => {
        const id = heading.id || `heading-${index}`;
        heading.id = id;
        
        const li = document.createElement('li');
        li.className = heading.tagName.toLowerCase();
        
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        
        li.appendChild(link);
        tocList.appendChild(li);
    });
    
    tocContainer.appendChild(tocList);
}

// ===== Highlight TOC Section on Scroll =====
function highlightTOC() {
    const sections = document.querySelectorAll('.main-content h2, .main-content h3');
    const tocLinks = document.querySelectorAll('.toc-list a');
    let lastActiveIndex = -1;

    sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
            lastActiveIndex = i;
        }
    });

    tocLinks.forEach(link => link.classList.remove('active'));
    if (lastActiveIndex >= 0 && tocLinks[lastActiveIndex]) {
        tocLinks[lastActiveIndex].classList.add('active');
    }
}

window.addEventListener('scroll', highlightTOC);
window.addEventListener('DOMContentLoaded', highlightTOC);

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    // Log page load time for development
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// ===== Export functions for use in other scripts =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        applyTheme,
        performSearch,
        copyToClipboard,
        trackProgress
    };
}
(function() {
    'use strict';
    
    console.log('🍃 myPathshala - MongoDB Tutorial initialized');
    
    // ===== Sidebar Toggle =====
    function toggleSection(header) {
        const section = header.closest('.path-section');
        const content = section.querySelector('.path-section-content');
        const toggle = header.querySelector('.path-section-toggle');
        
        if (section.classList.contains('expanded')) {
            section.classList.remove('expanded');
            toggle.textContent = '▶';
        } else {
            section.classList.add('expanded');
            toggle.textContent = '▼';
        }
    }
    
    // Make toggleSection available globally
    window.toggleSection = toggleSection;
    
    // ===== Mobile Menu Toggle =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // ===== Close sidebar when clicking outside on mobile =====
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar && sidebar.contains(event.target);
        const isClickOnToggle = mobileMenuToggle && mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle && sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
    
    // ===== Search Functionality =====
    const searchInput = document.getElementById('page-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const allLinks = document.querySelectorAll('.path-section-links a');
            
            allLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                const listItem = link.parentElement;
                
                if (text.includes(searchTerm)) {
                    listItem.style.display = '';
                    // Expand parent section if match found
                    const section = link.closest('.path-section');
                    if (section && searchTerm.length > 0) {
                        section.classList.add('expanded');
                        const toggle = section.querySelector('.path-section-toggle');
                        if (toggle) toggle.textContent = '▼';
                    }
                } else {
                    listItem.style.display = searchTerm ? 'none' : '';
                }
            });
        });
    }
    
    // ===== Theme Toggle (Disabled - Dark Mode Only) =====
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        // Theme toggle is disabled in dark-mode-only version
        themeToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('ℹ️ Theme toggle disabled - Dark mode only');
        });
    }
    
    // ===== Active Page Highlighting =====
    function highlightActivePage() {
        const currentPage = window.location.pathname.split('/').pop();
        const allLinks = document.querySelectorAll('.path-section-links a');
        
        allLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
                
                // Expand parent section
                const section = link.closest('.path-section');
                if (section) {
                    section.classList.add('expanded');
                    const toggle = section.querySelector('.path-section-toggle');
                    if (toggle) toggle.textContent = '▼';
                }
            }
        });
    }
    
    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== Initialize on Page Load =====
    document.addEventListener('DOMContentLoaded', function() {
        highlightActivePage();
        
        // Log page load time
        if (window.performance) {
            const loadTime = Math.round(performance.now());
            console.log(`⚡ Page loaded in ${loadTime}ms`);
        }
    });
    
    // ===== Export functions for external use =====
    window.MongoDBTutorial = {
        toggleSection,
        highlightActivePage
    };
    
})();
(function() {
    'use strict';
    
    console.log('🍃 myPathshala - MongoDB Tutorial initialized');
    
    // ===== Sidebar Toggle =====
    function toggleSection(header) {
        const section = header.closest('.path-section');
        const content = section.querySelector('.path-section-content');
        const toggle = header.querySelector('.path-section-toggle');
        
        if (section.classList.contains('expanded')) {
            section.classList.remove('expanded');
            toggle.textContent = '▶';
        } else {
            section.classList.add('expanded');
            toggle.textContent = '▼';
        }
    }
    
    // Make toggleSection available globally
    window.toggleSection = toggleSection;
    
    // ===== Mobile Menu Toggle =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // ===== Close sidebar when clicking outside on mobile =====
    document.addEventListener('click', function(event) {
        const isClickInsideSidebar = sidebar && sidebar.contains(event.target);
        const isClickOnToggle = mobileMenuToggle && mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideSidebar && !isClickOnToggle && sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
    
    // ===== Search Functionality =====
    const searchInput = document.getElementById('page-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const allLinks = document.querySelectorAll('.path-section-links a');
            
            allLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                const listItem = link.parentElement;
                
                if (text.includes(searchTerm)) {
                    listItem.style.display = '';
                    // Expand parent section if match found
                    const section = link.closest('.path-section');
                    if (section && searchTerm.length > 0) {
                        section.classList.add('expanded');
                        const toggle = section.querySelector('.path-section-toggle');
                        if (toggle) toggle.textContent = '▼';
                    }
                } else {
                    listItem.style.display = searchTerm ? 'none' : '';
                }
            });
        });
    }
    
    // ===== Theme Toggle (Disabled - Dark Mode Only) =====
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        // Theme toggle is disabled in dark-mode-only version
        themeToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('ℹ️ Theme toggle disabled - Dark mode only');
        });
    }
    
    // ===== Active Page Highlighting =====
    function highlightActivePage() {
        const currentPage = window.location.pathname.split('/').pop();
        const allLinks = document.querySelectorAll('.path-section-links a');
        
        allLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
                
                // Expand parent section
                const section = link.closest('.path-section');
                if (section) {
                    section.classList.add('expanded');
                    const toggle = section.querySelector('.path-section-toggle');
                    if (toggle) toggle.textContent = '▼';
                }
            }
        });
    }
    
    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== Initialize on Page Load =====
    document.addEventListener('DOMContentLoaded', function() {
        highlightActivePage();
        
        // Log page load time
        if (window.performance) {
            const loadTime = Math.round(performance.now());
            console.log(`⚡ Page loaded in ${loadTime}ms`);
        }
    });
    
    // ===== Export functions for external use =====
    window.MongoDBTutorial = {
        toggleSection,
        highlightActivePage
    };
    
})();
