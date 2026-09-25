const fs = require('fs');
let content = fs.readFileSync('src/links.js', 'utf8');

// Title fix
content = content.replace(/Hard &amp; Symbolic Links/g, 'Hard & Symbolic Links');

// Layout fixes
content = content.replace(/section-block/g, 'section-card');
content = content.replace(/story-panel/g, 'story-box');
content = content.replace(/console-block/g, 'terminal-block');
content = content.replace(/console-header/g, 'terminal-header');
content = content.replace(/console-body/g, 'terminal-body');

// Dots fix
content = content.replace(/<span class="cb-dots">.*?<\/span>/g, '<div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>');

// Console styles
content = content.replace(/cb-title/g, 'terminal-title');
content = content.replace(/cb-prompt/g, 'prompt');
content = content.replace(/cb-cmd/g, 'highlight');
content = content.replace(/cb-out/g, 'output');
content = content.replace(/cb-cmt/g, 'comment');
content = content.replace(/cb-flag/g, 'highlight');
content = content.replace(/cb-str/g, 'highlight');
content = content.replace(/cb-warn/g, 'highlight');
content = content.replace(/cb-hi/g, 'highlight');
content = content.replace(/cb-err/g, 'output');

// Deep dive
content = content.replace(/deepdive-box/g, 'deep-dive-box');
content = content.replace(/<div class="deepdive-title">(.*?)<\/div>/g, '<h4>$1</h4>');

// Exercises
content = content.replace(/exercise-panel/g, 'exercise-block');

// Callouts
content = content.replace(/callout-box info-box/g, 'info-box');
content = content.replace(/callout-box warning-box/g, 'warning-box');

// Tables
content = content.replace(/table-wrap/g, 'visual-container');

fs.writeFileSync('src/links.js', content);
console.log('Fixed links.js!');
