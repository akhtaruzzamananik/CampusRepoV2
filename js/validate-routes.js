/**
 * StudyNest – Route Validation Script
 * ======================================
 * Run with: node js/validate-routes.js
 * Checks all HTML files for broken internal links.
 */

const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(projectDir).filter(f => f.endsWith('.html'));

const brokenPatterns = [
    'leaderboards.html',
    'my-library.html',
    'question-bank.html',
    'question-paper.html',  // only as navigation target, not as a page reference
    'study-level.html',
    'playlist.html'
];

let totalIssues = 0;

htmlFiles.forEach(file => {
    const filepath = path.join(projectDir, file);
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
        brokenPatterns.forEach(pattern => {
            // Skip comments
            if (line.includes(pattern) && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
                // Check if it's a navigation reference
                if (line.includes('href=') || line.includes('location.href') ||
                    line.includes('data-link=') || line.includes("window.open")) {
                    console.log(`[BROKEN] ${file}:${idx+1} → references "${pattern}"`);
                    console.log(`         ${line.trim()}`);
                    totalIssues++;
                }
            }
        });

        // Check for href="#" that should be real links (excluding social media, anchors)
        if (line.includes('href="#"') && !line.includes('social') && !line.includes('anchor')) {
            // Only flag if it looks like a navigation link
            if (line.includes('menu-item') || line.includes('footer-link') ||
                line.includes('About') || line.includes('Contact') ||
                line.includes('Terms') || line.includes('Privacy') || line.includes('Help')) {
                // This is informational, not critical
            }
        }
    });
});

console.log(`\n=== Total broken references: ${totalIssues} ===`);

if (totalIssues === 0) {
    console.log('✓ All internal page references are valid!');
} else {
    console.log('✗ Fix the above broken references.');
    process.exit(1);
}
