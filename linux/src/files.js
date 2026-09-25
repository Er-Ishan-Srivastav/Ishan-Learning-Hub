

var fileops = {
  title: "File Operations — Create, Copy, Move, Delete, Sync",
  description: "Master every file operation command used in real Data Engineering, MLOps, and system administration work. Seven commands, seven dedicated consoles, zero ambiguity.",
  breadcrumb: ["Essential Commands", "File Operations"],

  sections: [

    // ════════════════════════════════════════════════════════════
    // OPENING STORY
    // ════════════════════════════════════════════════════════════
    {
      id: "fileops-intro",
      title: "The Week That Taught Ravi Everything About Files",
      content: `
<div class="story-box">
  <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="38" r="38" fill="#1a1a2e"/>
      <circle cx="38" cy="29" r="14" fill="#f9a825"/>
      <rect x="18" y="47" width="40" height="24" rx="10" fill="#0d47a1"/>
      <text x="38" y="64" fill="#fff" font-size="16" text-anchor="middle">💻</text>
      <circle cx="60" cy="16" r="13" fill="#f85149"/>
      <text x="60" y="22" fill="#fff" font-size="18" font-weight="bold" text-anchor="middle">!</text>
    </svg>
    <div style="flex:1;min-width:220px;">
      <h3 style="margin:0 0 8px;color:#ce93d8;">📂 Ravi's Week-3 Nightmare — and Recovery</h3>
      <p><strong>Monday:</strong> Ravi copies a 50GB dataset to the wrong folder. Copy fails halfway. File is corrupted.</p>
      <p><strong>Tuesday:</strong> He moves the wrong directory. No undo button. Three hours of recovery.</p>
      <p><strong>Wednesday:</strong> He runs <code style="color:#f85149;">rm -rf logs/</code> — but he was in the wrong folder.</p>
      <p><strong>Thursday:</strong> He discovers <code>rsync</code> — and it changes everything.</p>
      <p><strong>Friday:</strong> He writes a single script that does in 3 minutes what took him 4 hours manually.</p>
      <p style="margin-bottom:0;color:#ce93d8;font-style:italic;">"This week was painful. But now I'll never make those mistakes again."</p>
    </div>
  </div>
</div>

<div class="info-box" style="margin-top:16px;">
  <strong>🗺️ What You'll Master in This Module:</strong>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:10px;">
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #f85149;">
      <code style="color:#f85149;">rm / rmdir</code><br>
      <span style="color:#8b949e;font-size:12px;">Safe deletion — never lose data again</span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #3fb950;">
      <code style="color:#3fb950;">cp</code><br>
      <span style="color:#8b949e;font-size:12px;">4 copy modes, backup-safe copying</span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #58a6ff;">
      <code style="color:#58a6ff;">mv</code><br>
      <span style="color:#8b949e;font-size:12px;">Move & rename, atomic operations</span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #d29922;">
      <code style="color:#d29922;">rename</code><br>
      <span style="color:#8b949e;font-size:12px;">Bulk rename with regex — 500 files in 1 command</span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #bc8cff;">
      <code style="color:#bc8cff;">rsync</code><br>
      <span style="color:#8b949e;font-size:12px;">Production-grade sync, resume, remote transfer</span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #58a6ff;">
      <code style="color:#58a6ff;">wc</code><br>
      <span style="color:#8b949e;font-size:12px;">Count lines, words, bytes — essential for pipelines</span>
    </div>
  </div>
</div>`
    },

    // ════════════════════════════════════════════════════════════
    // RM — THE DANGER ZONE
    // ════════════════════════════════════════════════════════════
    {
      id: "rm-intro",
      title: "rm — Remove Files (The Most Dangerous Command in Linux)",
      content: `
<div class="danger-box">
  <strong>⚠️ FACULTY WARNING — Read This Before Touching rm:</strong>
  <p>Linux has <strong>NO recycle bin</strong>. No Ctrl+Z. No undo. When <code>rm</code> deletes a file, the kernel marks those disk blocks as free. The data physically stays on disk until overwritten, but you have NO tool to get it back without expensive forensic recovery software.</p>
  <p style="margin-bottom:0;"><strong>In 20 years of Linux history, more data has been lost by <code>rm -rf</code> than by any other command.</strong> We'll teach you the safe way.</p>
</div>

<!-- HOW RM WORKS UNDER THE HOOD -->
<div class="visual-container" style="margin-top:16px;">
<svg width="680" height="220" viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="220" fill="#0d1117" rx="12"/>
  <text x="340" y="24" fill="#e6edf3" font-size="14" font-weight="bold" text-anchor="middle">🔬 What rm Actually Does to Your Disk</text>

  <!-- Step 1: Before rm -->
  <rect x="20" y="40" width="190" height="160" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <text x="115" y="60" fill="#3fb950" font-size="11" font-weight="bold" text-anchor="middle">Before rm</text>
  <rect x="35" y="70" width="160" height="30" rx="4" fill="#1a3d1a"/>
  <text x="115" y="90" fill="#e6edf3" font-size="10" text-anchor="middle">📄 report.csv  (inode 4821)</text>
  <rect x="35" y="108" width="160" height="50" rx="4" fill="#161b22" stroke="#30363d"/>
  <text x="115" y="124" fill="#8b949e" font-size="9" text-anchor="middle">Directory entry:</text>
  <text x="115" y="138" fill="#58a6ff" font-size="9" text-anchor="middle">"report.csv" → inode 4821</text>
  <rect x="35" y="165" width="160" height="28" rx="4" fill="#161b22" stroke="#30363d"/>
  <text x="115" y="178" fill="#8b949e" font-size="9" text-anchor="middle">inode 4821: data at block 9200</text>
  <text x="115" y="190" fill="#3fb950" font-size="9" text-anchor="middle">Block 9200: [CSV DATA HERE]</text>

  <!-- Arrow -->
  <polygon points="218,130 232,124 232,136" fill="#f85149"/>
  <line x1="210" y1="130" x2="232" y2="130" stroke="#f85149" stroke-width="2"/>
  <text x="221" y="117" fill="#f85149" font-size="10" text-anchor="middle">rm</text>
  <text x="221" y="147" fill="#f85149" font-size="9" text-anchor="middle">runs</text>

  <!-- Step 2: After rm -->
  <rect x="240" y="40" width="190" height="160" rx="8" fill="#2a0d0d" stroke="#f85149" stroke-width="2"/>
  <text x="335" y="60" fill="#f85149" font-size="11" font-weight="bold" text-anchor="middle">After rm</text>
  <rect x="255" y="70" width="160" height="30" rx="4" fill="#3d1a1a" stroke="#f85149" stroke-dasharray="4"/>
  <text x="335" y="87" fill="#f85149" font-size="10" text-anchor="middle">❌ Directory entry REMOVED</text>
  <rect x="255" y="108" width="160" height="50" rx="4" fill="#161b22" stroke="#30363d"/>
  <text x="335" y="124" fill="#f85149" font-size="9" text-anchor="middle">inode 4821: link count = 0</text>
  <text x="335" y="138" fill="#f85149" font-size="9" text-anchor="middle">Kernel marks inode FREE</text>
  <rect x="255" y="165" width="160" height="28" rx="4" fill="#161b22" stroke="#30363d"/>
  <text x="335" y="178" fill="#d29922" font-size="9" text-anchor="middle">Block 9200: MARKED FREE</text>
  <text x="335" y="192" fill="#8b949e" font-size="9" text-anchor="middle">(data still there until overwritten)</text>

  <!-- Key insight box -->
  <rect x="450" y="40" width="215" height="160" rx="8" fill="#1a1a2e" stroke="#bc8cff" stroke-width="2"/>
  <text x="557" y="60" fill="#bc8cff" font-size="11" font-weight="bold" text-anchor="middle">🔑 Key Insight</text>
  <text x="460" y="82" fill="#c9d1d9" font-size="10">rm does NOT wipe data.</text>
  <text x="460" y="98" fill="#c9d1d9" font-size="10">It removes the DIRECTORY</text>
  <text x="460" y="112" fill="#c9d1d9" font-size="10">ENTRY (the name→inode link).</text>
  <text x="460" y="134" fill="#c9d1d9" font-size="10">The actual bytes on disk</text>
  <text x="460" y="148" fill="#c9d1d9" font-size="10">remain until new data</text>
  <text x="460" y="162" fill="#c9d1d9" font-size="10">overwrites that block.</text>
  <text x="460" y="185" fill="#3fb950" font-size="9">→ forensic recovery possible</text>
  <text x="460" y="197" fill="#3fb950" font-size="9">  (with testdisk/photorec)</text>
</svg>
</div>

<div class="info-box" style="margin-top:16px;">
  <h4>📚 Faculty Explanation: Why Linux Has No Recycle Bin by Default</h4>
  <p>Unix was designed for multi-user servers where <strong>disk space was extremely expensive</strong>. A recycle bin would require disk space and a background process to manage it. The designers assumed <em>users know what they're doing</em>. That assumption is <strong>wrong for beginners</strong>. Always use the safe practices below.</p>
</div>`
    },

    {
      id: "rm-all-options",
      title: "rm — Every Option, Every Scenario",
      content: `
<p>Let's cover every <code>rm</code> option methodically. Each one solves a specific real-world problem.</p>

<!-- RM OPTION TABLE -->
<table class="comparison-table">
  <thead><tr><th>Command</th><th>What It Does</th><th>Use When</th><th>Risk Level</th></tr></thead>
  <tbody>
    <tr><td><code>rm file.txt</code></td><td>Delete a single file</td><td>You know exactly what to delete</td><td style="color:#d29922;">⚠️ Medium</td></tr>
    <tr><td><code>rm -i file.txt</code></td><td>Interactive — asks y/n before each</td><td>Not 100% sure, want to confirm</td><td style="color:#3fb950;">✅ Safe</td></tr>
    <tr><td><code>rm -v file.txt</code></td><td>Verbose — prints what was removed</td><td>Scripts, want audit trail</td><td style="color:#d29922;">⚠️ Medium</td></tr>
    <tr><td><code>rm -f file.txt</code></td><td>Force — no error if file doesn't exist</td><td>Scripts where file may not exist</td><td style="color:#f85149;">🔴 High</td></tr>
    <tr><td><code>rm -r dir/</code></td><td>Recursive — delete dir + all contents</td><td>Deleting a directory tree</td><td style="color:#f85149;">🔴 High</td></tr>
    <tr><td><code>rm -rf dir/</code></td><td>Force + recursive — no prompts</td><td>ONLY when 100% certain</td><td style="color:#f85149;">💀 EXTREME</td></tr>
    <tr><td><code>rm -ri dir/</code></td><td>Recursive + interactive</td><td>Safely clearing a directory</td><td style="color:#3fb950;">✅ Safe</td></tr>
    <tr><td><code>rm -I files*</code></td><td>Prompt once before deleting 3+</td><td>Bulk deletion with one confirmation</td><td style="color:#3fb950;">✅ Safe</td></tr>
    <tr><td><code>rm --</code> <code>-badfile</code></td><td>Double dash — treat next as filename</td><td>File starting with a dash (-)</td><td style="color:#3fb950;">✅ Safe</td></tr>
  </tbody>
</table>`,

      interactiveExample: {
        code: `# Safe single file delete
rm old_report.txt

# Ask before deleting (interactive)
rm -i important_data.csv

# See what got deleted (verbose)
rm -v temp_file.log

# Delete without error if missing (useful in scripts)
rm -f might_not_exist.tmp

# Delete a directory and all its contents
rm -r old_project/

# The SAFE way to do recursive delete — prompts before EACH file
rm -ri old_project/`,
        explanation: "The golden rule: -i makes rm ask before each deletion. Use it when you're not 100% sure. Use -v in scripts to create an audit trail."
      }
    },

    {
      id: "rm-console-1",
      title: "🖥️ Console 1 — rm: Safe Deletion Practice",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Wednesday Disaster — and the Lesson:</strong>
  <p>Ravi was cleaning up his ETL project. He had <code>/home/ravi/projects/etl_pipeline/old_outputs/</code> open in one tab, and <code>/home/ravi/projects/</code> in another. He typed <code>rm -rf old_outputs/</code> in the WRONG tab — and deleted his entire <code>projects/</code> folder instead.</p>
  <p><strong>The lesson:</strong> Always use <code>pwd</code> before <code>rm -r</code>. Always use <code>-i</code> when in doubt. And understand the difference between each flag.</p>
</div>

<div class="terminal-tip">
  <strong>🖥️ Virtual Terminal — rm Practice</strong><br>
  This console simulates Ravi's system. Try every rm variant safely. The filesystem resets if you go too far!
</div>`,

      consoleConfig: {
        id: "console-rm",
        title: "Console 1 — rm: Delete Files Safely",
        subtitle: "Practice every rm option. Type a command and press Enter.",
        filesystem: {
          cwd: "/home/ravi/cleanup_practice",
          dirs: {
            "/home/ravi/cleanup_practice": ["temp1.txt", "temp2.txt", "temp3.txt", "important.csv", "report_old.log", "report_new.log", ".hidden_config", "old_backups"],
            "/home/ravi/cleanup_practice/old_backups": ["backup_jan.tar.gz", "backup_feb.tar.gz", "backup_mar.tar.gz", "keep_this.md"]
          },
          fileInfo: {
            "temp1.txt": { size: "124", perms: "-rw-r--r--", mtime: "Mar  8 09:00" },
            "temp2.txt": { size: "256", perms: "-rw-r--r--", mtime: "Mar  9 10:30" },
            "temp3.txt": { size: "89", perms: "-rw-r--r--", mtime: "Mar  9 11:00" },
            "important.csv": { size: "204800", perms: "-rw-r--r--", mtime: "Mar 10 08:00" },
            "report_old.log": { size: "51200", perms: "-rw-r--r--", mtime: "Feb 20 14:00" },
            "report_new.log": { size: "78912", perms: "-rw-r--r--", mtime: "Mar 10 12:00" },
            ".hidden_config": { size: "512", perms: "-rw-------", mtime: "Jan 15 09:00" },
            "old_backups": { size: "4096", perms: "drwxr-xr-x", mtime: "Mar  1 09:00" },
            "backup_jan.tar.gz": { size: "10485760", perms: "-rw-r--r--", mtime: "Jan 31 23:59" },
            "backup_feb.tar.gz": { size: "11534336", perms: "-rw-r--r--", mtime: "Feb 28 23:59" },
            "backup_mar.tar.gz": { size: "12582912", perms: "-rw-r--r--", mtime: "Mar  1 23:59" },
            "keep_this.md": { size: "1024", perms: "-rw-r--r--", mtime: "Mar  5 16:00" }
          }
        },
        examples: [
          {
            label: "rm temp1.txt",
            cmd: "rm temp1.txt",
            story: "Delete a single known file",
            output: `removed 'temp1.txt'

<span style="color:#8b949e;">← File deleted. No confirmation. No undo.
← 'temp1.txt' is now gone from the directory.
← The inode and disk blocks are marked as FREE.
← Until those blocks are overwritten, forensic
   tools like testdisk could theoretically recover it.</span>`
          },
          {
            label: "rm -i temp2.txt",
            cmd: "rm -i temp2.txt",
            story: "Delete with interactive confirmation",
            output: `rm: remove regular file 'temp2.txt'? <span style="color:#d29922;">[y/N]</span>
<span style="color:#3fb950;">y</span>
removed 'temp2.txt'

<span style="color:#8b949e;">← -i flag: asks before EVERY file deletion
← This is the SAFEST way to use rm
← Press 'y' then Enter to confirm
← Press 'n' or just Enter to skip
← In a script: pipe 'yes' to auto-confirm, or use -f instead</span>`
          },
          {
            label: "rm -v temp3.txt",
            cmd: "rm -v temp3.txt",
            story: "Delete with verbose output — great for scripts",
            output: `removed 'temp3.txt'

<span style="color:#8b949e;">← -v (verbose): prints each file as it's removed
← Essential in shell scripts so you have an audit trail:
   rm -v *.log >> deletion_log.txt 2>&1
← You'll know exactly what got deleted and when</span>`
          },
          {
            label: "rm -f missing.txt",
            cmd: "rm -f missing.txt",
            story: "Force delete — no error if file doesn't exist",
            output: `<span style="color:#8b949e;">(no output — silently succeeds even though file doesn't exist)

← Without -f, this would give:
   rm: cannot remove 'missing.txt': No such file or directory
← With -f: no error, no output, exit code 0
← WHEN TO USE: cleanup scripts that run on a schedule
   The file may or may not be there — -f handles both cases:
   rm -f /tmp/app_lock.pid   ← safe in cron jobs</span>`
          },
          {
            label: "rm *.log",
            cmd: "rm *.log",
            story: "Delete all .log files using glob pattern",
            output: `removed 'report_new.log'
removed 'report_old.log'

<span style="color:#8b949e;">← Shell EXPANDS *.log BEFORE passing to rm
← rm sees: rm report_new.log report_old.log
← Both deleted in one command
← WARNING: rm *.log while in the WRONG directory
   could delete logs you need!</span>

<span style="color:#d29922;">⚠️ Always run 'ls *.log' first to SEE what will be deleted,
   then run 'rm *.log' if you're satisfied.</span>`
          },
          {
            label: "rm -r old_backups/",
            cmd: "rm -r old_backups/",
            story: "Recursively delete a directory and all contents",
            output: `removed 'old_backups/backup_jan.tar.gz'
removed 'old_backups/backup_feb.tar.gz'
removed 'old_backups/backup_mar.tar.gz'
removed 'old_backups/keep_this.md'
removed directory 'old_backups/'

<span style="color:#8b949e;">← -r (recursive): deletes directory + EVERYTHING inside
← Order: files first, then the directory itself
← 4 files + 1 directory = 5 deletions
← Note: keep_this.md was ALSO deleted — rm -r doesn't check names

<span style="color:#f85149;">LESSON: rm -r is permanent. All 4 backups = gone.
Before rm -r: run 'ls -R old_backups/' to see ALL contents.</span></span>`
          },
          {
            label: "rm -ri old_backups/",
            cmd: "rm -ri old_backups/",
            story: "THE SAFE WAY — recursive with interactive prompts",
            output: `rm: descend into directory 'old_backups/'? <span style="color:#d29922;">y</span>
rm: remove regular file 'old_backups/backup_jan.tar.gz'? <span style="color:#d29922;">y</span>
rm: remove regular file 'old_backups/backup_feb.tar.gz'? <span style="color:#d29922;">y</span>
rm: remove regular file 'old_backups/backup_mar.tar.gz'? <span style="color:#d29922;">y</span>
rm: remove regular file 'old_backups/keep_this.md'? <span style="color:#3fb950;">n</span>
rm: remove directory 'old_backups/'? <span style="color:#3fb950;">n</span>

<span style="color:#8b949e;">← -ri = recursive + interactive
← Asks permission for EVERY file and the directory itself
← We said NO to keep_this.md and the directory
← Result: 3 backups deleted, keep_this.md SAVED, directory kept
← This is the PROFESSIONAL safe deletion approach</span>`
          },
          {
            label: "rm -- -badname.txt",
            cmd: "rm -- -badname.txt",
            story: "Delete a file whose name starts with a dash",
            output: `removed '-badname.txt'

<span style="color:#8b949e;">← Files starting with - are tricky!
← rm -badname.txt → rm thinks -b, -a, -d, -n are FLAGS
← The -- (double dash) tells rm: "everything after this is
   a FILENAME, not a flag"
← Alternative: rm ./-badname.txt (prefix with ./)
← This happens when scripts create temp files with bad names</span>`
          }
        ],
        safetyTip: `<div class="danger-box" style="margin-top:16px;">
<h4>🛡️ The 5 Safety Rules Every Linux Engineer Follows</h4>
<ol style="line-height:2.2;margin-bottom:0;">
  <li><strong>Always <code>pwd</code> before <code>rm -r</code></strong> — confirm you're in the right directory</li>
  <li><strong>Run <code>ls</code> first</strong> — see what <code>rm *.ext</code> would actually delete</li>
  <li><strong>Use <code>rm -i</code></strong> when not 100% sure about a file's contents</li>
  <li><strong>Use <code>trash-cli</code> or <code>mv to_delete/ /tmp/</code></strong> as a "soft delete" first</li>
  <li><strong>Never copy-paste <code>rm -rf</code></strong> from the internet without reading it character by character</li>
</ol>
</div>`
      }
    },

    // ════════════════════════════════════════════════════════════
    // RMDIR
    // ════════════════════════════════════════════════════════════
    {
      id: "rmdir-section",
      title: "rmdir — Remove EMPTY Directories (The Safer Alternative)",
      content: `
<div class="story-box">
  <strong>📖 Why rmdir Exists:</strong>
  <p>After Ravi's Wednesday disaster, his senior engineer showed him <code>rmdir</code>. It's a <strong>safety net</strong> — it <em>only</em> deletes a directory if it's completely empty. If there's even one file inside, it refuses and tells you. This makes accidental data loss impossible.</p>
</div>

<!-- RM vs RMDIR DIFFERENTIATOR -->
<div class="visual-container">
<svg width="680" height="180" viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="180" fill="#0d1117" rx="12"/>
  <text x="340" y="24" fill="#e6edf3" font-size="14" font-weight="bold" text-anchor="middle">rm -r  vs  rmdir — When to Use Which</text>

  <!-- rm -r box -->
  <rect x="20" y="40" width="300" height="128" rx="8" fill="#2a0d0d" stroke="#f85149" stroke-width="2"/>
  <text x="170" y="62" fill="#f85149" font-size="13" font-weight="bold" text-anchor="middle">rm -r  (or rm -rf)</text>
  <text x="35" y="82" fill="#c9d1d9" font-size="10">✅ Deletes dir WHETHER empty or not</text>
  <text x="35" y="98" fill="#c9d1d9" font-size="10">✅ Deletes ALL contents recursively</text>
  <text x="35" y="114" fill="#c9d1d9" font-size="10">✅ No error if files inside</text>
  <text x="35" y="130" fill="#f85149" font-size="10">❌ High risk — no safety check</text>
  <text x="35" y="152" fill="#d29922" font-size="10">Use when: you INTEND to delete everything inside</text>

  <!-- rmdir box -->
  <rect x="360" y="40" width="300" height="128" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <text x="510" y="62" fill="#3fb950" font-size="13" font-weight="bold" text-anchor="middle">rmdir</text>
  <text x="375" y="82" fill="#c9d1d9" font-size="10">✅ ONLY deletes empty directories</text>
  <text x="375" y="98" fill="#c9d1d9" font-size="10">✅ REFUSES if any file exists inside</text>
  <text x="375" y="114" fill="#c9d1d9" font-size="10">✅ Perfect safety — can't lose data</text>
  <text x="375" y="130" fill="#c9d1d9" font-size="10">✅ Use -p to remove nested empty dirs</text>
  <text x="375" y="152" fill="#3fb950" font-size="10">Use when: cleaning up truly empty dirs</text>
</svg>
</div>

<div class="terminal-block" style="margin-top:16px;">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console — rmdir all options</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;"><span style="color:#8b949e;"># Basic rmdir — only works on empty dirs</span>
$ mkdir empty_dir
$ <span style="color:#3fb950;">rmdir empty_dir</span>
<span style="color:#8b949e;"># (silent success — directory removed)</span>

$ mkdir filled_dir && touch filled_dir/file.txt
$ <span style="color:#3fb950;">rmdir filled_dir</span>
<span style="color:#f85149;">rmdir: failed to remove 'filled_dir': Directory not empty</span>
<span style="color:#8b949e;">← PERFECT — rmdir REFUSED. Your data is safe.
← rm -r filled_dir/ would have deleted file.txt silently.</span>

<span style="color:#8b949e;"># rmdir -p — remove nested EMPTY directory chain</span>
$ mkdir -p a/b/c      <span style="color:#8b949e;"># create nested dirs (all empty)</span>
$ <span style="color:#3fb950;">rmdir -p a/b/c</span>
<span style="color:#8b949e;"># Removes c, then b (now empty), then a (now empty)
# Like unrolling the -p from mkdir!
# Stops as soon as it hits a non-empty directory</span>

$ mkdir -p x/y/z && touch x/keep.txt
$ <span style="color:#3fb950;">rmdir -p x/y/z</span>
<span style="color:#8b949e;"># Removes z, removes y, then STOPS — x has keep.txt
# x/keep.txt is safe!</span>

<span style="color:#8b949e;"># rmdir -v — verbose output</span>
$ mkdir -p logs/old/jan logs/old/feb
$ <span style="color:#3fb950;">rmdir -pv logs/old/jan</span>
rmdir: removing directory, 'logs/old/jan'
rmdir: removing directory, 'logs/old'
rmdir: removing directory, 'logs'
<span style="color:#8b949e;">← Shows exactly which dirs were removed in order</span>

<span style="color:#8b949e;"># Remove multiple empty dirs at once</span>
$ mkdir dir1 dir2 dir3
$ <span style="color:#3fb950;">rmdir dir1 dir2 dir3</span>
<span style="color:#8b949e;">← All three removed in one command</span>

<span style="color:#d29922;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FACULTY TIP: Real-world usage in scripts:

# Remove all EMPTY subdirectories (safe cleanup)
find . -type d -empty -exec rmdir {} \;

# This will NEVER accidentally delete data
# rmdir's "not empty" protection is the safety net
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span></pre>
</div>`,
      interactiveExample: {
        code: `# Safe directory cleanup workflow
mkdir -p test/logs/old test/logs/current
touch test/logs/current/today.log   # put a file in current

rmdir test/logs/old     # works — empty
rmdir test/logs/current # FAILS — has today.log (safe!)
rmdir test/logs         # FAILS — current still exists

# Clean the whole empty chain at once
rmdir -pv test/logs/old`,
        explanation: "rmdir is your safety net. It's the RIGHT tool for removing directory scaffolding you no longer need, with zero risk of accidental data loss."
      }
    },

    // ════════════════════════════════════════════════════════════
    // CP — COPY
    // ════════════════════════════════════════════════════════════
    {
      id: "cp-intro",
      title: "cp — Copy Files and Directories (4 Modes, Every Flag)",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Monday Problem — The Incomplete Copy:</strong>
  <p>Ravi ran <code>cp large_dataset.csv /data/</code> to copy a 50GB file to a new server mount. The copy ran for 40 minutes — then the SSH connection dropped. When he reconnected, the file at <code>/data/large_dataset.csv</code> was 38GB — <strong>an incomplete, corrupt copy</strong>. And the original was gone because he'd moved it.</p>
  <p>What he should have used: <code>rsync</code> (which we'll cover next) with resume capability. But first — mastering <code>cp</code>.</p>
</div>

<!-- CP 4 MODES DIAGRAM -->
<div class="visual-container">
<svg width="700" height="200" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="200" fill="#0d1117" rx="12"/>
  <text x="350" y="24" fill="#e6edf3" font-size="14" font-weight="bold" text-anchor="middle">cp — 4 Modes You Must Know</text>

  <!-- Mode 1: Basic -->
  <rect x="15" y="38" width="155" height="148" rx="8" fill="#0d1f3c" stroke="#58a6ff" stroke-width="2"/>
  <text x="92" y="58" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">cp (basic)</text>
  <text x="92" y="74" fill="#8b949e" font-size="9" text-anchor="middle">cp src dest</text>
  <line x1="25" y1="82" x2="160" y2="82" stroke="#30363d"/>
  <text x="92" y="96" fill="#c9d1d9" font-size="9" text-anchor="middle">✅ Copies ONE file</text>
  <text x="92" y="110" fill="#c9d1d9" font-size="9" text-anchor="middle">✅ Creates new file</text>
  <text x="92" y="124" fill="#f85149" font-size="9" text-anchor="middle">❌ Overwrites silently</text>
  <text x="92" y="138" fill="#f85149" font-size="9" text-anchor="middle">❌ No dirs</text>
  <text x="92" y="155" fill="#d29922" font-size="9" text-anchor="middle">timestamps reset</text>
  <text x="92" y="172" fill="#d29922" font-size="9" text-anchor="middle">to NOW</text>

  <!-- Mode 2: -n -->
  <rect x="181" y="38" width="155" height="148" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <text x="258" y="58" fill="#3fb950" font-size="11" font-weight="bold" text-anchor="middle">cp -n (safe)</text>
  <text x="258" y="74" fill="#8b949e" font-size="9" text-anchor="middle">cp -n src dest</text>
  <line x1="191" y1="82" x2="326" y2="82" stroke="#30363d"/>
  <text x="258" y="96" fill="#c9d1d9" font-size="9" text-anchor="middle">✅ Copies ONE file</text>
  <text x="258" y="110" fill="#3fb950" font-size="9" text-anchor="middle">✅ NO overwrite</text>
  <text x="258" y="124" fill="#3fb950" font-size="9" text-anchor="middle">✅ Destination safe</text>
  <text x="258" y="138" fill="#f85149" font-size="9" text-anchor="middle">❌ No dirs</text>
  <text x="258" y="155" fill="#d29922" font-size="9" text-anchor="middle">Best for: safely</text>
  <text x="258" y="172" fill="#d29922" font-size="9" text-anchor="middle">adding new files</text>

  <!-- Mode 3: -r -->
  <rect x="347" y="38" width="155" height="148" rx="8" fill="#1f1a0a" stroke="#d29922" stroke-width="2"/>
  <text x="424" y="58" fill="#d29922" font-size="11" font-weight="bold" text-anchor="middle">cp -r (dirs)</text>
  <text x="424" y="74" fill="#8b949e" font-size="9" text-anchor="middle">cp -r src/ dest/</text>
  <line x1="357" y1="82" x2="492" y2="82" stroke="#30363d"/>
  <text x="424" y="96" fill="#c9d1d9" font-size="9" text-anchor="middle">✅ Copies DIRS</text>
  <text x="424" y="110" fill="#c9d1d9" font-size="9" text-anchor="middle">✅ Recursive</text>
  <text x="424" y="124" fill="#f85149" font-size="9" text-anchor="middle">❌ Resets timestamps</text>
  <text x="424" y="138" fill="#f85149" font-size="9" text-anchor="middle">❌ Drops perms</text>
  <text x="424" y="155" fill="#d29922" font-size="9" text-anchor="middle">Best for: copying</text>
  <text x="424" y="172" fill="#d29922" font-size="9" text-anchor="middle">project folder</text>

  <!-- Mode 4: -a (archive) -->
  <rect x="513" y="38" width="172" height="148" rx="8" fill="#1a0f2a" stroke="#bc8cff" stroke-width="2.5"/>
  <text x="599" y="58" fill="#bc8cff" font-size="11" font-weight="bold" text-anchor="middle">cp -a (archive) ⭐</text>
  <text x="599" y="74" fill="#8b949e" font-size="9" text-anchor="middle">cp -a src/ dest/</text>
  <line x1="523" y1="82" x2="675" y2="82" stroke="#30363d"/>
  <text x="599" y="96" fill="#3fb950" font-size="9" text-anchor="middle">✅ Copies DIRS</text>
  <text x="599" y="110" fill="#3fb950" font-size="9" text-anchor="middle">✅ Preserves timestamps</text>
  <text x="599" y="124" fill="#3fb950" font-size="9" text-anchor="middle">✅ Preserves permissions</text>
  <text x="599" y="138" fill="#3fb950" font-size="9" text-anchor="middle">✅ Copies symlinks</text>
  <text x="599" y="155" fill="#bc8cff" font-size="9" text-anchor="middle">Best for: BACKUPS</text>
  <text x="599" y="172" fill="#bc8cff" font-size="9" text-anchor="middle">exact clone</text>
</svg>
</div>

<div class="deep-dive-box" style="margin-top:16px;">
  <h4>🔬 Behind the Scenes: What cp Actually Does</h4>
  <p>When you run <code>cp source.csv dest.csv</code>, the kernel does this:</p>
  <ol style="line-height:2;">
    <li><strong>open(source.csv, O_RDONLY)</strong> — open source for reading</li>
    <li><strong>open(dest.csv, O_WRONLY|O_CREAT)</strong> — create/open destination for writing</li>
    <li><strong>read()</strong> loop — read chunks from source (usually 64KB at a time)</li>
    <li><strong>write()</strong> loop — write each chunk to destination</li>
    <li><strong>close()</strong> both file descriptors</li>
    <li><strong>If -a: utime()</strong> — restore original timestamps</li>
  </ol>
  <p>This means <strong>cp always reads every byte</strong>. For a 50GB file, that's 50GB of disk reads + 50GB of disk writes. This is why <code>rsync</code> is better for large files — it only copies what changed.</p>
</div>`
    },

    {
      id: "cp-console",
      title: "🖥️ Console 2 — cp: Copy with Every Option",
      content: `
<div class="tip-box">
  <strong>🎓 Faculty Note — The cp Traps:</strong> Two common traps beginners fall into:
  <ol style="margin:6px 0 0;">
    <li><code>cp file dir/</code> vs <code>cp file dir/file</code> — trailing slash matters!</li>
    <li><code>cp -r dir/ dest/</code> — if dest/ exists, it copies dir/ INSIDE dest/ (not merge). If dest/ doesn't exist, it creates dest/ as the copy.</li>
  </ol>
</div>`,

      consoleConfig: {
        id: "console-cp",
        title: "Console 2 — cp: Copy Operations",
        subtitle: "Master every cp flag. Each example shows the exact outcome.",
        filesystem: {
          cwd: "/home/ravi/cp_practice",
          dirs: {
            "/home/ravi/cp_practice": ["original.csv", "config.yml", "scripts", "backup"],
            "/home/ravi/cp_practice/scripts": ["etl.py", "utils.py", "run.sh"],
            "/home/ravi/cp_practice/backup": []
          },
          fileInfo: {
            "original.csv": { size: "204800", perms: "-rw-r--r--", mtime: "Mar  8 14:30" },
            "config.yml": { size: "892", perms: "-rw-r--r--", mtime: "Mar  9 10:15" },
            "scripts": { size: "4096", perms: "drwxr-xr-x", mtime: "Mar 10 11:00" },
            "backup": { size: "4096", perms: "drwxr-xr-x", mtime: "Mar 10 09:00" },
            "etl.py": { size: "4521", perms: "-rwxr-xr-x", mtime: "Mar 10 11:00" },
            "utils.py": { size: "2048", perms: "-rwxr-xr-x", mtime: "Mar  9 16:00" },
            "run.sh": { size: "512", perms: "-rwxr-x---", mtime: "Mar  7 09:00" }
          }
        },
        examples: [
          {
            label: "cp basic",
            cmd: "cp original.csv copy.csv",
            story: "Basic copy — source to destination",
            output: `<span style="color:#8b949e;">(silent success)

Now you have:
  original.csv   ← original still exists (cp never removes source)
  copy.csv       ← new copy created

$ ls -lh *.csv</span>
-rw-r--r-- 1 ravi ravi 200K <span style="color:#d29922;">Mar 10 14:25</span> copy.csv
-rw-r--r-- 1 ravi ravi 200K <span style="color:#8b949e;">Mar  8 14:30</span> original.csv

<span style="color:#8b949e;">← NOTICE: copy.csv timestamp = NOW (Mar 10 14:25)
← original.csv timestamp = original (Mar 8 14:30)
← Timestamps are NOT preserved with basic cp
← This matters for: Makefiles, cron jobs, rsync checks</span>`
          },
          {
            label: "cp -n (no overwrite)",
            cmd: "cp -n original.csv copy.csv",
            story: "Safe copy — never overwrite existing destination",
            output: `<span style="color:#8b949e;">(silent — no copy happened)

← copy.csv already exists
← -n (no-clobber): REFUSES to overwrite it
← copy.csv is UNCHANGED
← original.csv is untouched

This is the SAFE way to copy when:
- You're distributing config files to multiple servers
- You don't want to overwrite local modifications
- Running a cp in a script on a schedule

Without -n: cp overwrites copy.csv silently — data LOST</span>`
          },
          {
            label: "cp -i (interactive)",
            cmd: "cp -i original.csv copy.csv",
            story: "Interactive copy — ask before overwriting",
            output: `cp: overwrite 'copy.csv'? <span style="color:#d29922;">[y/N]</span>
<span style="color:#3fb950;">y</span>
<span style="color:#8b949e;">(copy.csv overwritten)

← -i asks before overwriting
← Press y = overwrite (data replaced)
← Press n or Enter = skip (data preserved)
← Better than -n when you MIGHT want to overwrite
   depending on what you see</span>`
          },
          {
            label: "cp -v (verbose)",
            cmd: "cp -v config.yml backup/config.yml",
            story: "Verbose — see exactly what was copied",
            output: `'config.yml' -> 'backup/config.yml'

<span style="color:#8b949e;">← -v prints: 'source' -> 'destination'
← Essential in scripts for audit trails:
   cp -v *.cfg /etc/app/ >> deploy.log 2>&1
← You can see EXACTLY what was copied and where</span>`
          },
          {
            label: "cp -r (recursive)",
            cmd: "cp -r scripts/ backup/",
            story: "Recursive copy — copy entire directory",
            output: `<span style="color:#8b949e;">(silent success)

Result:
backup/
  scripts/          ← scripts/ copied INSIDE backup/ (it existed)
    etl.py
    utils.py
    run.sh

← CRITICAL BEHAVIOR:
   If backup/ EXISTED: scripts/ copied INSIDE → backup/scripts/
   If backup/ DIDN'T EXIST: scripts/ content → backup/ directly

← Timestamps RESET to current time
← Permissions: files get your umask, dirs get 755</span>`
          },
          {
            label: "cp -a (archive = best for backup)",
            cmd: "cp -a scripts/ scripts_backup/",
            story: "Archive mode — exact clone with ALL metadata",
            output: `<span style="color:#8b949e;">(silent success)

$ ls -la scripts/ scripts_backup/

scripts/:
-rwxr-x--- 1 ravi ravi  512 <span style="color:#3fb950;">Mar  7 09:00</span> run.sh
-rwxr-xr-x 1 ravi ravi 4521 <span style="color:#3fb950;">Mar 10 11:00</span> etl.py
-rwxr-xr-x 1 ravi ravi 2048 <span style="color:#3fb950;">Mar  9 16:00</span> utils.py

scripts_backup/:
-rwxr-x--- 1 ravi ravi  512 <span style="color:#3fb950;">Mar  7 09:00</span> run.sh   ← SAME timestamp!
-rwxr-xr-x 1 ravi ravi 4521 <span style="color:#3fb950;">Mar 10 11:00</span> etl.py   ← SAME timestamp!
-rwxr-xr-x 1 ravi ravi 2048 <span style="color:#3fb950;">Mar  9 16:00</span> utils.py ← SAME timestamp!

← -a preserves: timestamps ✅  permissions ✅  owner ✅  symlinks ✅
← -a = -dR --preserve=all (equivalent)
← ALWAYS use -a for backups. Always.</span>`
          },
          {
            label: "cp to directory",
            cmd: "cp original.csv config.yml backup/",
            story: "Copy MULTIPLE files to a directory",
            output: `<span style="color:#8b949e;">(silent success)

$ ls backup/
config.yml  original.csv

← When destination is a DIRECTORY:
   cp puts ALL listed files INTO that directory
← When copying 2+ files, destination MUST be a directory
   (or you get an error)
← Trailing slash on backup/ makes intent clear</span>`
          },
          {
            label: "cp -u (update only)",
            cmd: "cp -u original.csv backup/original.csv",
            story: "Update mode — copy only if source is newer",
            output: `<span style="color:#8b949e;">(copies only if original.csv is newer than backup/original.csv)

← -u (update): copies only when:
   source timestamp > destination timestamp
   OR destination doesn't exist

← Use case: running cp -u in a cron job to sync files
   Only transfers what actually changed
← Similar to rsync but simpler (no partial transfer resume)

$ ls -lt backup/
original.csv  Mar 10 14:35   ← updated (was older)
config.yml    Mar 10 14:28</span>`
          }
        ]
      }
    },

    // ════════════════════════════════════════════════════════════
    // MV — MOVE
    // ════════════════════════════════════════════════════════════
    {
      id: "mv-section",
      title: "mv — Move and Rename Files (Atomic Operation Explained)",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Tuesday Mistake — and the Kernel's Secret:</strong>
  <p>Ravi ran <code>mv data/processed/ data/archive/processed/</code>. But <code>data/archive/</code> didn't exist yet. Linux moved <code>processed/</code> and renamed it to <code>archive</code>. His whole processed folder became a directory named <code>archive</code>. He panicked for 20 minutes before realizing what happened.</p>
  <p><strong>The lesson: mv behavior depends on whether the destination exists.</strong></p>
</div>

<!-- MV BEHAVIOR DECISION TREE -->
<div class="visual-container">
<svg width="700" height="260" viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="260" fill="#0d1117" rx="12"/>
  <text x="350" y="24" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">mv Behavior Decision Tree</text>

  <!-- Source -->
  <rect x="270" y="38" width="160" height="32" rx="6" fill="#21262d" stroke="#58a6ff" stroke-width="2"/>
  <text x="350" y="59" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">mv source dest</text>

  <!-- Decision diamond -->
  <polygon points="350,90 430,120 350,150 270,120" fill="#1f1a0a" stroke="#d29922" stroke-width="2"/>
  <text x="350" y="115" fill="#d29922" font-size="11" text-anchor="middle">dest</text>
  <text x="350" y="130" fill="#d29922" font-size="11" text-anchor="middle">exists?</text>

  <!-- No branch -->
  <line x1="270" y1="120" x2="120" y2="120" stroke="#3fb950" stroke-width="2"/>
  <text x="195" y="113" fill="#3fb950" font-size="10" text-anchor="middle">NO</text>
  <rect x="20" y="155" width="200" height="60" rx="6" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <line x1="120" y1="120" x2="120" y2="155" stroke="#3fb950" stroke-width="2"/>
  <text x="120" y="175" fill="#3fb950" font-size="11" font-weight="bold" text-anchor="middle">RENAME</text>
  <text x="120" y="192" fill="#c9d1d9" font-size="9" text-anchor="middle">source → renamed to dest</text>
  <text x="120" y="207" fill="#8b949e" font-size="9" text-anchor="middle">mv old.csv new.csv</text>

  <!-- Yes branch -->
  <line x1="430" y1="120" x2="580" y2="120" stroke="#d29922" stroke-width="2"/>
  <text x="505" y="113" fill="#d29922" font-size="10" text-anchor="middle">YES</text>

  <!-- Is dest a dir? -->
  <polygon points="580,90 650,120 580,150 510,120" fill="#1a0f2a" stroke="#bc8cff" stroke-width="2"/>
  <text x="580" y="115" fill="#bc8cff" font-size="10" text-anchor="middle">dest is</text>
  <text x="580" y="130" fill="#bc8cff" font-size="10" text-anchor="middle">a dir?</text>

  <!-- YES = dir -->
  <line x1="580" y1="150" x2="580" y2="175" stroke="#58a6ff" stroke-width="2"/>
  <text x="596" y="167" fill="#58a6ff" font-size="10">YES</text>
  <rect x="490" y="175" width="180" height="60" rx="6" fill="#0d1f3c" stroke="#58a6ff" stroke-width="2"/>
  <text x="580" y="197" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">MOVE INTO DIR</text>
  <text x="580" y="213" fill="#c9d1d9" font-size="9" text-anchor="middle">source placed INSIDE dest</text>
  <text x="580" y="228" fill="#8b949e" font-size="9" text-anchor="middle">mv file.csv archive/ → archive/file.csv</text>

  <!-- NO = file overwrite -->
  <line x1="510" y1="120" x2="350" y2="195" stroke="#f85149" stroke-width="2"/>
  <text x="430" y="160" fill="#f85149" font-size="10" text-anchor="middle">NO (file)</text>
  <rect x="245" y="195" width="210" height="55" rx="6" fill="#2a0d0d" stroke="#f85149" stroke-width="2"/>
  <text x="350" y="217" fill="#f85149" font-size="11" font-weight="bold" text-anchor="middle">OVERWRITE</text>
  <text x="350" y="233" fill="#c9d1d9" font-size="9" text-anchor="middle">dest file replaced silently!</text>
  <text x="350" y="247" fill="#8b949e" font-size="9" text-anchor="middle">Use -i or -n to prevent</text>
</svg>
</div>

<div class="deep-dive-box" style="margin-top:16px;">
  <h4>🔬 Why mv is Faster than cp + rm (The rename() System Call)</h4>
  <p>On the <strong>same filesystem</strong>, <code>mv file.csv dest/</code> does NOT read or write any file data. It makes a single <strong>rename()</strong> system call — which just updates the directory entry. Moving a 50GB file takes milliseconds on the same disk. But <code>mv</code> across different filesystems falls back to copy+delete, which is slow.</p>
  <div class="terminal-block">
    <div class="terminal-header"><span class="terminal-dot" style="background:#ff5f56"></span><span class="terminal-dot" style="background:#ffbd2e"></span><span class="terminal-dot" style="background:#27c93f"></span></div>
    <pre style="color:#e6edf3;padding:12px;margin:0;"><span style="color:#8b949e;"># Same filesystem: INSTANT (just a rename syscall)</span>
$ time mv /data/huge_50gb_file.parquet /data/archive/
real    0m0.001s     <span style="color:#3fb950;">← milliseconds! No data moved.</span>

<span style="color:#8b949e;"># Different filesystem: SLOW (full copy + delete)</span>
$ time mv /data/huge_50gb_file.parquet /mnt/backup/
real    8m32.441s    <span style="color:#f85149;">← 8 minutes — reads all 50GB!</span>
<span style="color:#8b949e;"># Same as cp + rm when crossing filesystems</span></pre>
  </div>
</div>`,
      consoleConfig: {
        id: "console-mv",
        title: "Console 3 — mv: Move and Rename",
        subtitle: "See every mv behavior with real examples.",
        filesystem: {
          cwd: "/home/ravi/mv_practice",
          dirs: {
            "/home/ravi/mv_practice": ["report_v1.csv", "report_v2.csv", "old_config.yml", "pipeline.py", "data", "archive"],
            "/home/ravi/mv_practice/data": ["raw.parquet", "processed.parquet"],
            "/home/ravi/mv_practice/archive": []
          },
          fileInfo: {
            "report_v1.csv": { size: "51200", perms: "-rw-r--r--", mtime: "Mar  5 09:00" },
            "report_v2.csv": { size: "57344", perms: "-rw-r--r--", mtime: "Mar 10 11:00" },
            "old_config.yml": { size: "892", perms: "-rw-r--r--", mtime: "Feb 20 14:00" },
            "pipeline.py": { size: "8192", perms: "-rwxr-xr-x", mtime: "Mar 10 09:30" },
            "data": { size: "4096", perms: "drwxr-xr-x", mtime: "Mar 10 10:00" },
            "archive": { size: "4096", perms: "drwxr-xr-x", mtime: "Mar 10 09:00" },
            "raw.parquet": { size: "5242880", perms: "-rw-r--r--", mtime: "Mar  9 22:00" },
            "processed.parquet": { size: "3145728", perms: "-rw-r--r--", mtime: "Mar 10 06:00" }
          }
        },
        examples: [
          {
            label: "Rename a file",
            cmd: "mv report_v1.csv report_final.csv",
            story: "Rename a file — destination doesn't exist yet",
            output: `<span style="color:#8b949e;">(silent success)

$ ls *.csv
report_final.csv   ← renamed from report_v1.csv
report_v2.csv

← report_v1.csv no longer exists
← report_final.csv is the SAME FILE (same inode, same data)
← mv just changed the directory entry — instant operation
← ZERO disk I/O for actual file content</span>`
          },
          {
            label: "Move into directory",
            cmd: "mv report_v2.csv archive/",
            story: "Move file into an existing directory",
            output: `<span style="color:#8b949e;">(silent success)

$ ls
old_config.yml  pipeline.py  data/  archive/

$ ls archive/
report_v2.csv   ← moved here

← report_v2.csv is now at archive/report_v2.csv
← The FILENAME stays the same
← To rename AND move: mv report_v2.csv archive/final.csv</span>`
          },
          {
            label: "Move multiple files",
            cmd: "mv old_config.yml pipeline.py archive/",
            story: "Move multiple files to a directory at once",
            output: `<span style="color:#8b949e;">(silent success)

$ ls archive/
old_config.yml  pipeline.py  report_v2.csv

← Multiple sources → one destination directory
← All moved in a single command
← Destination MUST be a directory when you have multiple sources</span>`
          },
          {
            label: "mv -i (safe overwrite)",
            cmd: "mv -i data/raw.parquet data/processed.parquet",
            story: "Interactive move — ask before overwriting",
            output: `mv: overwrite 'data/processed.parquet'? <span style="color:#d29922;">[y/N]</span>
<span style="color:#3fb950;">n</span>
<span style="color:#8b949e;">(nothing moved — data/processed.parquet safe)

← Without -i: mv silently overwrites processed.parquet
← data was 3MB, raw was 5MB — overwrite would lose processed data!
← -i = interactive: your safety net for mv
← ALWAYS use -i when destination might already exist</span>`
          },
          {
            label: "mv -n (never overwrite)",
            cmd: "mv -n data/raw.parquet data/processed.parquet",
            story: "No-clobber — never overwrite, silently skip",
            output: `<span style="color:#8b949e;">(silent — nothing moved)

← -n (no-clobber): NEVER overwrites
← Silently skips if destination exists
← Great for scripts: "move only if safe"
← data/processed.parquet untouched</span>`
          },
          {
            label: "mv -v (verbose)",
            cmd: "mv -v old_config.yml archive/old_config.yml",
            story: "Verbose move — audit trail",
            output: `renamed 'old_config.yml' -> 'archive/old_config.yml'

<span style="color:#8b949e;">← -v prints each move operation
← Message: 'source' -> 'destination'
← Use in scripts to log what was moved:
   mv -v *.log /var/log/archive/ >> move_log.txt</span>`
          },
          {
            label: "mv rename + move",
            cmd: "mv data/raw.parquet archive/raw_2024-03-09.parquet",
            story: "Move AND rename simultaneously",
            output: `<span style="color:#8b949e;">(silent success)

$ ls archive/
raw_2024-03-09.parquet   ← moved AND renamed in one command

← mv can move AND rename in a single operation
← Source: data/raw.parquet
← Destination: archive/raw_2024-03-09.parquet (different name)
← This is a common pattern for archiving with date stamps</span>`
          }
        ]
      }
    },

    // ════════════════════════════════════════════════════════════
    // RENAME — BULK OPERATIONS
    // ════════════════════════════════════════════════════════════
    {
      id: "rename-section",
      title: "rename — Bulk Rename with Regex (mv's Superpowered Cousin)",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Friday Victory:</strong>
  <p>After a month of collecting data, Ravi's <code>data/</code> folder had 500 files named <code>log_2024_03_01.txt</code>, <code>log_2024_03_02.txt</code>, etc. His Spark job expected them to be named <code>log-2024-03-01.txt</code> (hyphens, not underscores). With <code>mv</code>, that's 500 commands. With <code>rename</code>, it's <strong>one command, one second</strong>.</p>
</div>

<!-- MV vs RENAME DIFFERENTIATOR -->
<table class="comparison-table">
  <thead><tr><th>Scenario</th><th>Use mv</th><th>Use rename</th></tr></thead>
  <tbody>
    <tr><td>Rename ONE file</td><td style="color:#3fb950;">✅ mv old.csv new.csv</td><td>Overkill</td></tr>
    <tr><td>Rename 500 files with a pattern</td><td style="color:#f85149;">❌ Need 500 commands</td><td style="color:#3fb950;">✅ One command with regex</td></tr>
    <tr><td>Change all .txt → .log</td><td style="color:#f85149;">❌ Loop script needed</td><td style="color:#3fb950;">✅ rename 's/.txt$/.log/' *.txt</td></tr>
    <tr><td>Add prefix/suffix to all files</td><td style="color:#f85149;">❌ Complex loop</td><td style="color:#3fb950;">✅ rename 's/^/prefix_/' *</td></tr>
    <tr><td>Replace characters in filenames</td><td style="color:#f85149;">❌ Hard</td><td style="color:#3fb950;">✅ rename 's/_/-/g' *.txt</td></tr>
    <tr><td>Lowercase all filenames</td><td style="color:#f85149;">❌ Very complex</td><td style="color:#3fb950;">✅ rename 'y/A-Z/a-z/' *</td></tr>
  </tbody>
</table>

<div class="info-box" style="margin-top:16px;">
  <h4>📚 How rename Works — Perl Regex Syntax</h4>
  <p>The <code>rename</code> command takes a Perl regex substitution expression and applies it to each filename. The format is: <code>rename '<em>s/PATTERN/REPLACEMENT/FLAGS</em>' files</code></p>
  <table class="comparison-table">
    <thead><tr><th>Component</th><th>Meaning</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><code>s/</code></td><td>Substitution command start</td><td>Always starts with s/</td></tr>
      <tr><td>PATTERN</td><td>What to find (regex)</td><td><code>.txt$</code> = ends with .txt</td></tr>
      <tr><td>REPLACEMENT</td><td>What to replace it with</td><td><code>.log</code></td></tr>
      <tr><td><code>/g</code></td><td>Global — replace ALL occurrences</td><td>Replace every _ not just first</td></tr>
      <tr><td><code>/i</code></td><td>Case insensitive</td><td>Match .TXT and .txt</td></tr>
      <tr><td><code>y/A-Z/a-z/</code></td><td>Transliterate (like tr)</td><td>Lowercase all letters</td></tr>
    </tbody>
  </table>
</div>`,

      consoleConfig: {
        id: "console-rename",
        title: "Console 4 — rename: Bulk Rename with Regex",
        subtitle: "Each example shows the BEFORE and AFTER of filenames.",
        filesystem: {
          cwd: "/home/ravi/rename_practice",
          dirs: {
            "/home/ravi/rename_practice": [
              "log_2024_03_01.txt", "log_2024_03_02.txt", "log_2024_03_03.txt",
              "Report_Jan.CSV", "Report_Feb.CSV", "Report_Mar.CSV",
              "DATA FILE 01.txt", "DATA FILE 02.txt",
              "backup.old", "config.old", "settings.old",
              "ETL_Pipeline_v1.py", "ETL_Pipeline_v2.py"
            ]
          },
          fileInfo: {
            "log_2024_03_01.txt": { size: "51200", perms: "-rw-r--r--", mtime: "Mar  1 23:59" },
            "log_2024_03_02.txt": { size: "49152", perms: "-rw-r--r--", mtime: "Mar  2 23:59" },
            "log_2024_03_03.txt": { size: "53248", perms: "-rw-r--r--", mtime: "Mar  3 23:59" },
            "Report_Jan.CSV": { size: "204800", perms: "-rw-r--r--", mtime: "Jan 31 12:00" },
            "Report_Feb.CSV": { size: "221184", perms: "-rw-r--r--", mtime: "Feb 28 12:00" },
            "Report_Mar.CSV": { size: "196608", perms: "-rw-r--r--", mtime: "Mar 31 12:00" },
            "backup.old": { size: "1024", perms: "-rw-r--r--", mtime: "Feb 10 09:00" },
            "config.old": { size: "892", perms: "-rw-r--r--", mtime: "Feb 10 09:00" },
            "settings.old": { size: "2048", perms: "-rw-r--r--", mtime: "Feb 10 09:00" }
          }
        },
        examples: [
          {
            label: "Change extension",
            cmd: "rename -n 's/\\.txt$/.log/' *.txt",
            story: "Preview: change all .txt extensions to .log",
            output: `rename(log_2024_03_01.txt, log_2024_03_01.log)
rename(log_2024_03_02.txt, log_2024_03_02.log)
rename(log_2024_03_03.txt, log_2024_03_03.log)

<span style="color:#8b949e;">← -n (dry run / no-act): PREVIEW ONLY — nothing changed yet!
← Always use -n first to see what WOULD happen
← \\.txt$ means: literal dot, then txt, at end of string ($)
← The $ is crucial — without it, a file named 'txt_notes.txt'
   would become 'log_notes.log' (changed 'txt' in the middle too!)</span>`
          },
          {
            label: "Apply the rename",
            cmd: "rename 's/\\.txt$/.log/' *.txt",
            story: "Actually rename (remove -n to execute)",
            output: `<span style="color:#8b949e;">(silent success — 3 files renamed)

$ ls *.log
log_2024_03_01.log
log_2024_03_02.log
log_2024_03_03.log

← Remove -n to execute for real
← Always: first with -n (preview), then without -n (execute)</span>`
          },
          {
            label: "Replace underscores with hyphens",
            cmd: "rename -n 's/_/-/g' log_*.log",
            story: "Replace ALL underscores with hyphens (g = global)",
            output: `rename(log_2024_03_01.log, log-2024-03-01.log)
rename(log_2024_03_02.log, log-2024-03-02.log)
rename(log_2024_03_03.log, log-2024-03-03.log)

<span style="color:#8b949e;">← /g flag: replace ALL underscores in each filename
← Without /g: only the FIRST underscore replaced
   log_2024_03_01.log → log-2024_03_01.log (only first _ changed)
← With /g: ALL underscores replaced
   log_2024_03_01.log → log-2024-03-01.log ← what we want</span>`
          },
          {
            label: "Lowercase all filenames",
            cmd: "rename -n 'y/A-Z/a-z/' Report_*.CSV",
            story: "Convert uppercase letters to lowercase",
            output: `rename(Report_Jan.CSV, report_jan.csv)
rename(Report_Feb.CSV, report_feb.csv)
rename(Report_Mar.CSV, report_mar.csv)

<span style="color:#8b949e;">← y/A-Z/a-z/ is transliteration (like the 'tr' command)
← Maps each uppercase letter to its lowercase equivalent
← A→a, B→b, C→c ... R→r, Z→z
← Both 'Report_' and '.CSV' get lowercased in one pass
← Very common for normalising filenames from Windows systems</span>`
          },
          {
            label: "Add prefix to files",
            cmd: "rename -n 's/^/archive_/' *.old",
            story: "Add 'archive_' prefix to all .old files",
            output: `rename(backup.old, archive_backup.old)
rename(config.old, archive_config.old)
rename(settings.old, archive_settings.old)

<span style="color:#8b949e;">← ^ in regex = start of string
← s/^/archive_/ means: at the start, insert 'archive_'
← Nothing is deleted — just inserting at position 0
← After: archive_backup.old, archive_config.old, etc.</span>`
          },
          {
            label: "Add date suffix",
            cmd: "rename -n 's/\\.py$/_2024.py/' ETL_*.py",
            story: "Add date suffix before extension",
            output: `rename(ETL_Pipeline_v1.py, ETL_Pipeline_v1_2024.py)
rename(ETL_Pipeline_v2.py, ETL_Pipeline_v2_2024.py)

<span style="color:#8b949e;">← s/\\.py$/_2024.py/ means:
   Find: .py at end of filename
   Replace with: _2024.py
← The extension IS the matched part, so we include it in replacement
← Result: inserts _2024 before .py</span>`
          },
          {
            label: "Remove spaces from filenames",
            cmd: "rename -n 's/ /_/g' 'DATA FILE'*.txt",
            story: "Replace spaces with underscores (critical for scripting)",
            output: `rename(DATA FILE 01.txt, DATA_FILE_01.txt)
rename(DATA FILE 02.txt, DATA_FILE_02.txt)

<span style="color:#8b949e;">← Spaces in filenames BREAK scripts and pipelines!
   cat DATA FILE 01.txt → tries to cat 3 separate files
   cat "DATA FILE 01.txt" or cat DATA\ FILE\ 01.txt needed
← rename 's/ /_/g' fixes ALL spaces in ONE command
← This is the FIRST thing to do when receiving files from Windows</span>`
          }
        ]
      }
    },

    // ════════════════════════════════════════════════════════════
    // RSYNC — PRODUCTION-GRADE SYNC
    // ════════════════════════════════════════════════════════════
    {
      id: "rsync-section",
      title: "rsync — Production-Grade File Sync (Why It Beats cp Forever)",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Thursday Discovery:</strong>
  <p>After the incomplete 50GB copy disaster (Monday), Ravi asked his senior: <em>"What should I have used?"</em></p>
  <p>The answer: <code>rsync</code>. His senior showed him three things rsync does that cp can't:</p>
  <ol>
    <li><strong>Resume from where it stopped</strong> — if interrupted, restart and it picks up where it left off</li>
    <li><strong>Skip unchanged files</strong> — only copies what actually changed (by size+timestamp or checksum)</li>
    <li><strong>Work over SSH</strong> — sync to/from remote servers as easily as local directories</li>
  </ol>
  <p>From Thursday onwards, every data transfer Ravi did used <code>rsync</code>.</p>
</div>

<!-- CP vs RSYNC COMPARISON DIAGRAM -->
<div class="visual-container">
<svg width="700" height="220" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="220" fill="#0d1117" rx="12"/>
  <text x="350" y="24" fill="#e6edf3" font-size="14" font-weight="bold" text-anchor="middle">cp vs rsync — The Critical Differences</text>

  <!-- Headers -->
  <rect x="20" y="38" width="310" height="30" rx="6" fill="#2a0d0d" stroke="#f85149"/>
  <text x="175" y="58" fill="#f85149" font-size="12" font-weight="bold" text-anchor="middle">cp — Simple Copy</text>
  <rect x="370" y="38" width="310" height="30" rx="6" fill="#0f2a0f" stroke="#3fb950"/>
  <text x="525" y="58" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">rsync — Smart Sync ⭐</text>

  <text x="35"  y="86" fill="#c9d1d9" font-size="10">❌ Copies ALL bytes every time</text>
  <text x="385" y="86" fill="#c9d1d9" font-size="10">✅ Copies ONLY changed files/blocks</text>
  <text x="35"  y="103" fill="#c9d1d9" font-size="10">❌ Interrupted = corrupt/incomplete file</text>
  <text x="385" y="103" fill="#c9d1d9" font-size="10">✅ Interrupted = resume from where stopped</text>
  <text x="35"  y="120" fill="#c9d1d9" font-size="10">❌ Local only (or via separate scp)</text>
  <text x="385" y="120" fill="#c9d1d9" font-size="10">✅ Works locally AND over SSH natively</text>
  <text x="35"  y="137" fill="#c9d1d9" font-size="10">❌ No progress bar</text>
  <text x="385" y="137" fill="#c9d1d9" font-size="10">✅ --progress shows transfer speed + ETA</text>
  <text x="35"  y="154" fill="#c9d1d9" font-size="10">❌ No dry run</text>
  <text x="385" y="154" fill="#c9d1d9" font-size="10">✅ -n dry run: preview what WOULD be copied</text>
  <text x="35"  y="171" fill="#c9d1d9" font-size="10">❌ No bandwidth limit</text>
  <text x="385" y="171" fill="#c9d1d9" font-size="10">✅ --bwlimit=1000 caps at 1MB/s</text>
  <text x="35"  y="188" fill="#c9d1d9" font-size="10">✅ Simpler syntax</text>
  <text x="385" y="188" fill="#8b949e" font-size="10">  Slightly more complex syntax</text>

  <!-- Divider -->
  <line x1="350" y1="38" x2="350" y2="200" stroke="#30363d" stroke-width="1.5" stroke-dasharray="4"/>
</svg>
</div>

<div class="deep-dive-box" style="margin-top:16px;">
  <h4>🔬 The rsync Delta Algorithm — How It Only Transfers What Changed</h4>
  <p>rsync uses the <strong>rsync delta-transfer algorithm</strong> (invented by Andrew Tridgell, 1996). For each file:</p>
  <ol style="line-height:1.8;">
    <li>Destination computes checksums for small fixed-size blocks of the existing file</li>
    <li>Source sends those checksums to source machine</li>
    <li>Source scans its copy to find matching and non-matching blocks</li>
    <li>Source sends ONLY the non-matching (changed) blocks</li>
    <li>Destination reconstructs the new file from its existing blocks + new blocks</li>
  </ol>
  <p>Result: syncing a 10GB file that had 5MB of changes → transfers only ~5MB, not 10GB.</p>
</div>`,

      consoleConfig: {
        id: "console-rsync",
        title: "Console 5 — rsync: Smart Sync & Transfer",
        subtitle: "From local sync to remote server backup. Each example builds on the last.",
        filesystem: {
          cwd: "/home/ravi",
          dirs: {
            "/home/ravi": ["projects", "data_backup", "remote_sync"],
            "/home/ravi/projects": ["etl_pipeline"],
            "/home/ravi/projects/etl_pipeline": ["main.py", "config.yml", "requirements.txt", "logs", "output"],
            "/home/ravi/projects/etl_pipeline/logs": ["pipeline_2024-03-10.log", "errors.log"],
            "/home/ravi/projects/etl_pipeline/output": ["customers.csv", "orders.parquet"],
            "/home/ravi/data_backup": [],
            "/home/ravi/remote_sync": []
          },
          fileInfo: {
            "main.py": { size: "4521", perms: "-rwxr-xr-x", mtime: "Mar 10 11:30" },
            "config.yml": { size: "892", perms: "-rw-r--r--", mtime: "Mar  9 10:15" },
            "requirements.txt": { size: "234", perms: "-rw-r--r--", mtime: "Mar  8 09:00" },
            "customers.csv": { size: "2097152", perms: "-rw-rw-r--", mtime: "Mar 10 10:15" },
            "orders.parquet": { size: "5242880", perms: "-rw-rw-r--", mtime: "Mar 10 10:15" }
          }
        },
        examples: [
          {
            label: "Basic local sync",
            cmd: "rsync -av projects/etl_pipeline/ data_backup/etl_pipeline/",
            story: "Sync a project directory to a local backup",
            output: `sending incremental file list
created directory data_backup/etl_pipeline
./
config.yml
main.py
requirements.txt
logs/
logs/errors.log
logs/pipeline_2024-03-10.log
output/
output/customers.csv
output/orders.parquet

sent 7,397,204 bytes  received 192 bytes  14,794,792 bytes/sec
total size is 7,394,803  speedup is 1.00

<span style="color:#8b949e;">← -a (archive): preserves permissions, timestamps, symlinks
← -v (verbose): shows every file being transferred
← "incremental file list" = rsync checking what needs syncing
← speedup is 1.00 = first run, everything was new (no delta savings)
← Run again and speedup would be very high (most files unchanged)</span>`
          },
          {
            label: "Dry run first",
            cmd: "rsync -av --dry-run projects/etl_pipeline/ data_backup/etl_pipeline/",
            story: "Preview what would sync WITHOUT actually doing it",
            output: `sending incremental file list
logs/pipeline_2024-03-10.log   ← only this file changed
output/customers.csv           ← and this one

sent 234 bytes  received 12 bytes  492 bytes/sec
total size is 7,394,803  speedup is ...

<span style="color:#8b949e;">← --dry-run (or -n): SIMULATES the sync, copies NOTHING
← Shows EXACTLY which files would be transferred
← Use BEFORE every important rsync to confirm you're syncing
   the right things to the right place
← Essential safety check before --delete operations!</span>`
          },
          {
            label: "With progress bar",
            cmd: "rsync -av --progress projects/etl_pipeline/output/ data_backup/output/",
            story: "See transfer progress for large files",
            output: `sending incremental file list
customers.csv
  2,097,152 100%   45.23MB/s    0:00:00 (xfr#1, to-chk=1/2)
orders.parquet
  5,242,880 100%   52.11MB/s    0:00:00 (xfr#2, to-chk=0/2)

sent 7,340,032 bytes  received 74 bytes  ...

<span style="color:#8b949e;">← --progress: shows per-file progress
   [bytes transferred] [percent] [speed] [time remaining]
← Essential for large transfers so you know it's working
← (xfr#1, to-chk=1/2) = "transferring file 1, 1 of 2 left to check"</span>`
          },
          {
            label: "rsync over SSH",
            cmd: "rsync -avz -e ssh projects/etl_pipeline/ ravi@prod-server:/data/etl/",
            story: "Sync to a REMOTE server over SSH",
            output: `ravi@prod-server's password: ****
sending incremental file list
./
main.py
config.yml
output/customers.csv
output/orders.parquet

sent 7,397,204 bytes  received 192 bytes  921,168 bytes/sec
total size is 7,394,803  speedup is 1.00

<span style="color:#8b949e;">← -e ssh: use SSH as the transport
← -z: compress data in transit (great for slow networks)
← ravi@prod-server:/data/etl/ = user@hostname:/remote/path
← rsync knows this is remote because of the : separator
← With SSH keys set up: no password prompt needed (automation!)
← This is how you deploy data pipelines to production</span>`
          },
          {
            label: "rsync --delete (mirror)",
            cmd: "rsync -av --delete --dry-run projects/etl_pipeline/ data_backup/etl_pipeline/",
            story: "Mirror: delete files in destination that don't exist in source",
            output: `sending incremental file list
deleting output/old_report.csv   ← exists in backup but NOT in source → deleted
./

sent 1,204 bytes  received 38 bytes  2,484 bytes/sec

<span style="color:#8b949e;">← --delete: makes destination IDENTICAL to source
   Files in dest that don't exist in source = DELETED
← Used for true mirroring / backup rotations
← DANGER: without --dry-run first, you might delete important files!
← Always: rsync -av --delete --dry-run first, then remove --dry-run</span>`
          },
          {
            label: "rsync with bandwidth limit",
            cmd: "rsync -avz --bwlimit=5000 projects/ ravi@prod-server:/backup/",
            story: "Limit bandwidth to avoid saturating production network",
            output: `sending incremental file list
main.py
  4,521 100%    4.89kB/s    0:00:00
config.yml
    892 100%    0.96kB/s    0:00:01

<span style="color:#8b949e;">← --bwlimit=5000: caps at 5000 KB/s = ~5 MB/s
← Without limit: rsync uses maximum available bandwidth
   This can saturate your network and affect other services
← Common in production: run backups at night with no limit,
   daytime syncs with --bwlimit to avoid impacting live traffic</span>`
          },
          {
            label: "rsync exclude patterns",
            cmd: "rsync -av --exclude='*.log' --exclude='__pycache__/' projects/ data_backup/",
            story: "Exclude log files and Python cache from backup",
            output: `sending incremental file list
./
config.yml
main.py
requirements.txt
output/
output/customers.csv
output/orders.parquet

<span style="color:#8b949e;">← --exclude='*.log': skip all log files
← --exclude='__pycache__/': skip Python cache directories
← Logs can be huge — often excluded from backups
← Multiple --exclude flags can be combined
← Alternatively: --exclude-from=exclude_list.txt (file with patterns)

Practical ML use case:
rsync -av --exclude='*.pkl' --exclude='checkpoints/' \
  --exclude='*.bin' training/ backup/training/
← Exclude large model weights, keep only the code and config</span>`
          }
        ]
      }
    },

    // ════════════════════════════════════════════════════════════
    // WC — WORD COUNT
    // ════════════════════════════════════════════════════════════
    {
      id: "wc-section",
      title: "wc — Count Lines, Words, Characters (The Pipeline Workhorse)",
      content: `
<div class="story-box">
  <strong>📖 wc in Ravi's Daily Work:</strong>
  <p>Every day in data engineering, you ask questions like: "How many records did this pipeline produce?", "How many lines does this log file have?", "How many errors occurred?". <code>wc</code> answers all of them in milliseconds — and it works beautifully in pipelines with <code>|</code>.</p>
</div>

<!-- WC OUTPUT ANATOMY -->
<div class="visual-container">
<svg width="680" height="130" viewBox="0 0 680 130" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="130" fill="#0d1117" rx="12"/>
  <text x="340" y="24" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">Anatomy of wc Output</text>

  <text x="50" y="72" fill="#3fb950" font-size="20" font-family="monospace" font-weight="bold">1000</text>
  <text x="130" y="72" fill="#58a6ff" font-size="20" font-family="monospace" font-weight="bold">8432</text>
  <text x="230" y="72" fill="#d29922" font-size="20" font-family="monospace" font-weight="bold">75891</text>
  <text x="350" y="72" fill="#e6edf3" font-size="16" font-family="monospace">customers.csv</text>

  <text x="65"  y="95" fill="#3fb950"  font-size="11" text-anchor="middle">Lines</text>
  <text x="147" y="95" fill="#58a6ff"  font-size="11" text-anchor="middle">Words</text>
  <text x="252" y="95" fill="#d29922"  font-size="11" text-anchor="middle">Bytes</text>

  <text x="65"  y="112" fill="#8b949e" font-size="9" text-anchor="middle">1000 rows</text>
  <text x="147" y="112" fill="#8b949e" font-size="9" text-anchor="middle">(whitespace-separated)</text>
  <text x="252" y="112" fill="#8b949e" font-size="9" text-anchor="middle">(file size)</text>
</svg>
</div>`,

      consoleConfig: {
        id: "console-wc",
        title: "Console 6 — wc: Count Everything",
        subtitle: "wc in standalone mode and in pipelines — the way it's used in real DE work.",
        filesystem: {
          cwd: "/home/ravi/wc_practice",
          dirs: {
            "/home/ravi/wc_practice": ["customers.csv", "errors.log", "pipeline.py", "empty.txt", "words.txt"]
          },
          fileContent: {
            "customers.csv": "1000 lines, 8432 words, 75891 bytes",
            "errors.log": "47 lines, 312 words, 2814 bytes",
            "pipeline.py": "183 lines, 1247 words, 9832 bytes",
            "empty.txt": "0 lines, 0 words, 0 bytes",
            "words.txt": "5 lines, 25 words, 148 bytes"
          }
        },
        examples: [
          {
            label: "wc (all counts)",
            cmd: "wc customers.csv",
            story: "Default — show lines, words, bytes",
            output: `  1000   8432  75891 customers.csv

<span style="color:#8b949e;">← 3 numbers: lines  words  bytes  filename
← 1000 lines = 1000 rows (perfect for CSV row count)
← 8432 words = fields separated by whitespace
← 75891 bytes = file size (same as ls -l shows)

In data engineering:
wc -l tells you how many records your pipeline produced.
It's faster than loading the file into Python just to count rows!</span>`
          },
          {
            label: "wc -l (line count)",
            cmd: "wc -l customers.csv errors.log pipeline.py",
            story: "Count lines in multiple files",
            output: `  1000 customers.csv
    47 errors.log
   183 pipeline.py
  1230 total

<span style="color:#8b949e;">← -l: only show line count (most used flag)
← When passing multiple files: shows count per file + TOTAL
← The "total" line at the bottom is automatically added
← Use case: wc -l output.csv → verify row count after pipeline run</span>`
          },
          {
            label: "wc -w (word count)",
            cmd: "wc -w words.txt",
            story: "Count words (whitespace-separated tokens)",
            output: `25 words.txt

<span style="color:#8b949e;">← -w: count words (separated by whitespace: space, tab, newline)
← Useful for: counting tokens in NLP preprocessing
← Also: wc -w *.py → count total code tokens in a project</span>`
          },
          {
            label: "wc -c (byte count)",
            cmd: "wc -c customers.csv",
            story: "Count bytes (file size)",
            output: `75891 customers.csv

<span style="color:#8b949e;">← -c: count bytes (same as file size in bytes)
← Compare with ls -l: ls -l also shows 75891 bytes
← Use case: verify a file transfer completed fully:
   wc -c remote_file == wc -c local_file? → transfer successful</span>`
          },
          {
            label: "wc -m (character count)",
            cmd: "wc -m customers.csv",
            story: "Count characters (different from bytes for UTF-8)",
            output: `75891 customers.csv

<span style="color:#8b949e;">← -m: count CHARACTERS (not bytes)
← For ASCII files: bytes = characters (same number)
← For UTF-8 files with emojis/Unicode:
   bytes > characters (emojis = 4 bytes but 1 character)
   
Example with Unicode:
$ echo "Hello 🌍" | wc -c   → 11 (bytes: H,e,l,l,o, ,🌍=4bytes,newline)
$ echo "Hello 🌍" | wc -m   → 8  (chars: H,e,l,l,o, ,🌍,newline)</span>`
          },
          {
            label: "wc -L (longest line)",
            cmd: "wc -L customers.csv",
            story: "Find the longest line length",
            output: `127 customers.csv

<span style="color:#8b949e;">← -L: length of the LONGEST line in the file (in characters)
← Use case: checking if any CSV row is abnormally long
   (might indicate merged rows, corrupt data, or JSON inside CSV)
← For data validation:
   if wc -L data.csv > 500, there might be an issue</span>`
          },
          {
            label: "wc in pipeline",
            cmd: "cat errors.log | grep 'ERROR' | wc -l",
            story: "Count errors in a log file using a pipeline",
            output: `12

<span style="color:#8b949e;">← The classic DE pattern: filter then count
← cat errors.log: output the file
← grep 'ERROR': keep only lines containing ERROR
← wc -l: count those lines
← Answer: 12 ERROR-level events in the log

More examples:
ls -la | wc -l                  ← count files in directory
cat access.log | grep '404' | wc -l  ← count 404 errors
ps aux | wc -l                  ← count running processes
cat data.csv | grep -v '^#' | wc -l  ← count non-comment rows</span>`
          },
          {
            label: "wc multiple files + total",
            cmd: "wc -l *.csv *.log *.py",
            story: "Get line counts of all files at once",
            output: `   1000 customers.csv
     47 errors.log
    183 pipeline.py
   1230 total

<span style="color:#8b949e;">← Pass multiple files or globs
← wc automatically adds a "total" line
← Use case: quick code metrics
   wc -l src/**/*.py → total lines of Python code in project</span>`
          }
        ]
      }
    },

  ], // end sections

  // ════════════════════════════════════════════════════════════
  // PRACTICE EXERCISES
  // ════════════════════════════════════════════════════════════
  practiceExercises: [
    {
      id: "fops-ex1",
      difficulty: "Easy",
      title: "Safe Cleanup Routine",
      description: "Ravi has a directory with temp files, log files, and important data. Write a script that safely deletes only temp files (.tmp) and old logs (*.old), verifies what was deleted, and confirms the important files are untouched.",
      starterCode: `#!/bin/bash
# Safe Cleanup Script

TARGET_DIR="$HOME/cleanup_test"
mkdir -p "$TARGET_DIR"

# Setup: create test files
touch "$TARGET_DIR"/{temp1.tmp,temp2.tmp,jan.old,feb.old,important.csv,config.yml}

echo "BEFORE cleanup:"
ls -la "$TARGET_DIR"/

echo ""
echo "Deleting .tmp files (verbose):"
??? "$TARGET_DIR"/*.tmp      # use rm with verbose flag

echo ""
echo "Deleting .old files (ask for confirmation):"
??? "$TARGET_DIR"/*.old      # use rm with interactive flag

echo ""
echo "AFTER cleanup:"
ls -la "$TARGET_DIR"/        # verify important files remain`,
      solution: `#!/bin/bash
TARGET_DIR="$HOME/cleanup_test"
mkdir -p "$TARGET_DIR"

touch "$TARGET_DIR"/{temp1.tmp,temp2.tmp,jan.old,feb.old,important.csv,config.yml}

echo "BEFORE cleanup:"
ls -la "$TARGET_DIR"/

echo ""
echo "Deleting .tmp files (verbose):"
rm -v "$TARGET_DIR"/*.tmp

echo ""
echo "Deleting .old files (ask for confirmation):"
rm -i "$TARGET_DIR"/*.old

echo ""
echo "AFTER cleanup:"
ls -la "$TARGET_DIR"/`,
      explanation: "rm -v gives an audit trail of what was deleted. rm -i protects you when you're not 100% sure about a file. Quoting the path ($TARGET_DIR) handles spaces in directory names. Using specific extensions (*.tmp, *.old) prevents accidental deletion of important files."
    },
    {
      id: "fops-ex2",
      difficulty: "Easy",
      title: "Backup Script with cp -a",
      description: "Write a script that creates a timestamped backup of a project directory using cp -a, then verifies the backup preserved timestamps and permissions by comparing the two directories.",
      starterCode: `#!/bin/bash
PROJECT="$HOME/my_project"
mkdir -p "$PROJECT"
touch "$PROJECT/main.py" "$PROJECT/config.yml"
chmod 750 "$PROJECT/main.py"   # set specific permissions

BACKUP_NAME="my_project_backup_$(???)"   # use date command for YYYY-MM-DD
BACKUP_DIR="$HOME/$BACKUP_NAME"

echo "Creating backup: $BACKUP_DIR"
???  # cp command that preserves ALL metadata

echo ""
echo "Verifying timestamps match:"
echo "Original:"
ls -la "$PROJECT/"
echo ""
echo "Backup:"
ls -la "$BACKUP_DIR/"

echo ""
echo "Permissions preserved? (should be identical):"
stat -c "%a %n" "$PROJECT/"* | sort
echo "---"
stat -c "%a %n" "$BACKUP_DIR/"* | sort`,
      solution: `#!/bin/bash
PROJECT="$HOME/my_project"
mkdir -p "$PROJECT"
touch "$PROJECT/main.py" "$PROJECT/config.yml"
chmod 750 "$PROJECT/main.py"

BACKUP_NAME="my_project_backup_$(date +%Y-%m-%d)"
BACKUP_DIR="$HOME/$BACKUP_NAME"

echo "Creating backup: $BACKUP_DIR"
cp -a "$PROJECT" "$BACKUP_DIR"

echo ""
echo "Verifying timestamps match:"
echo "Original:"; ls -la "$PROJECT/"
echo ""; echo "Backup:"; ls -la "$BACKUP_DIR/"

echo ""
echo "Permissions preserved? (should be identical):"
stat -c "%a %n" "$PROJECT/"* | sort
echo "---"
stat -c "%a %n" "$BACKUP_DIR/"* | sort`,
      explanation: "cp -a is the correct choice for backups because it preserves timestamps (mtime/atime), permissions (chmod values), ownership, and follows symlinks correctly. Without -a, you'd need -r --preserve=all which is just what -a expands to anyway. The stat -c '%a' shows octal permissions — they should be identical between original and backup."
    },
    {
      id: "fops-ex3",
      difficulty: "Medium",
      title: "Bulk Rename Log Files for Spark",
      description: "Your Airflow pipeline produces log files named 'airflow_dag_run_YYYY_MM_DD_HH_MM_SS.log'. Your Spark log reader expects 'dag-YYYY-MM-DD.log'. Write a rename command (or sequence) to transform 10 such files.",
      starterCode: `#!/bin/bash
# Setup: create sample log files
mkdir -p ~/rename_challenge
cd ~/rename_challenge

for i in $(seq -w 1 10); do
  touch "airflow_dag_run_2024_03_0\${i}_08_00_00.log"
done

echo "BEFORE:"
ls *.log

echo ""
echo "Transforming names..."

# Step 1: Remove time portion _HH_MM_SS
rename ??? *.log       # remove _08_00_00 from end

# Step 2: Remove 'airflow_dag_run_' prefix  
rename ??? *.log       # remove prefix

# Step 3: Replace underscores with hyphens in date
rename ??? *.log       # replace _ with -

# Step 4: The prefix should be 'dag-' not just date
rename ??? *.log       # add 'dag-' prefix

echo ""
echo "AFTER:"
ls *.log`,
      solution: `#!/bin/bash
mkdir -p ~/rename_challenge && cd ~/rename_challenge

for i in $(seq -w 1 10); do
  touch "airflow_dag_run_2024_03_0\${i}_08_00_00.log"
done

echo "BEFORE:"; ls *.log; echo ""

# Step 1: Remove time portion _HH_MM_SS
rename 's/_[0-9]{2}_[0-9]{2}_[0-9]{2}\.log$/.log/' *.log

# Step 2: Remove 'airflow_dag_run_' prefix
rename 's/^airflow_dag_run_//' *.log

# Step 3: Replace ALL underscores with hyphens
rename 's/_/-/g' *.log

# Step 4: Add 'dag-' prefix
rename 's/^/dag-/' *.log

echo "AFTER:"; ls *.log`,
      explanation: "Breaking a complex rename into steps is the professional approach — easier to debug and verify each step with -n. Step 1 uses {2} quantifier to match exactly 2 digits. The $ anchors to end of string so only the timestamp portion matches. Each intermediate step can be verified with ls before proceeding."
    },
    {
      id: "fops-ex4",
      difficulty: "Medium",
      title: "rsync Backup with Verification",
      description: "Write a production-grade backup script that: uses rsync to sync a data directory to backup, excludes temp files and logs, limits bandwidth, logs what was transferred, and verifies the backup by comparing row counts of CSV files.",
      starterCode: `#!/bin/bash
SOURCE="$HOME/pipeline_data"
BACKUP="$HOME/pipeline_backup"
LOG_FILE="$HOME/backup_$(date +%Y%m%d_%H%M%S).log"

mkdir -p "$SOURCE" "$BACKUP"
# Create some test data
echo -e "id,name\n1,Alice\n2,Bob\n3,Charlie" > "$SOURCE/customers.csv"
echo -e "id,amount\n1,100\n2,200" > "$SOURCE/orders.csv"
touch "$SOURCE/temp.tmp" "$SOURCE/debug.log"

echo "Starting backup at $(date)" | tee "$LOG_FILE"

# Run rsync with:
# - archive mode
# - verbose (log to file)
# - exclude .tmp and .log files
# - bandwidth limit 10MB/s
# - dry run first, then actual
echo "DRY RUN:" | tee -a "$LOG_FILE"
rsync ??? --dry-run "$SOURCE/" "$BACKUP/" | tee -a "$LOG_FILE"

echo ""
echo "ACTUAL BACKUP:" | tee -a "$LOG_FILE"
rsync ??? "$SOURCE/" "$BACKUP/" | tee -a "$LOG_FILE"

echo ""
echo "VERIFICATION — comparing CSV row counts:"
for csv in "$SOURCE"/*.csv; do
  filename=$(basename "$csv")
  src_count=$(???)        # count lines in source CSV
  bak_count=$(???)        # count lines in backup CSV
  echo "$filename: source=$src_count  backup=$bak_count"
  [ "$src_count" = "$bak_count" ] && echo "  ✅ Match" || echo "  ❌ MISMATCH"
done`,
      solution: `#!/bin/bash
SOURCE="$HOME/pipeline_data"
BACKUP="$HOME/pipeline_backup"
LOG_FILE="$HOME/backup_$(date +%Y%m%d_%H%M%S).log"

mkdir -p "$SOURCE" "$BACKUP"
echo -e "id,name\n1,Alice\n2,Bob\n3,Charlie" > "$SOURCE/customers.csv"
echo -e "id,amount\n1,100\n2,200" > "$SOURCE/orders.csv"
touch "$SOURCE/temp.tmp" "$SOURCE/debug.log"

echo "Starting backup at $(date)" | tee "$LOG_FILE"

RSYNC_OPTS="-av --exclude='*.tmp' --exclude='*.log' --bwlimit=10240"

echo "DRY RUN:" | tee -a "$LOG_FILE"
rsync $RSYNC_OPTS --dry-run "$SOURCE/" "$BACKUP/" | tee -a "$LOG_FILE"

echo ""; echo "ACTUAL BACKUP:" | tee -a "$LOG_FILE"
rsync $RSYNC_OPTS "$SOURCE/" "$BACKUP/" | tee -a "$LOG_FILE"

echo ""; echo "VERIFICATION:"
for csv in "$SOURCE"/*.csv; do
  filename=$(basename "$csv")
  src_count=$(wc -l < "$SOURCE/$filename")
  bak_count=$(wc -l < "$BACKUP/$filename")
  echo "$filename: source=$src_count  backup=$bak_count"
  [ "$src_count" = "$bak_count" ] && echo "  ✅ Match" || echo "  ❌ MISMATCH"
done`,
      explanation: "Storing rsync options in a variable (RSYNC_OPTS) makes the script DRY and easy to modify. The dry-run + actual pattern is essential for production scripts. wc -l < file (with redirect) counts lines without including the filename in output — crucial for the comparison. tee writes to both stdout and the log file simultaneously."
    },
    {
      id: "fops-ex5",
      difficulty: "Hard",
      title: "Data Pipeline File Manager",
      description: "Build a complete file management script for a data pipeline. It should: (1) archive yesterday's output to a dated folder with cp -a, (2) delete outputs older than 7 days, (3) rename any files with spaces, (4) count total rows across all CSV files, (5) produce a report. This simulates a real daily maintenance cron job.",
      starterCode: `#!/bin/bash
# Daily Data Pipeline File Manager
# Meant to run as a cron job: 0 1 * * * /home/ravi/maintenance.sh

PIPELINE_DIR="$HOME/pipeline"
ARCHIVE_DIR="$PIPELINE_DIR/archive"
OUTPUT_DIR="$PIPELINE_DIR/output"
REPORT_FILE="$PIPELINE_DIR/daily_report.txt"

mkdir -p "$ARCHIVE_DIR" "$OUTPUT_DIR"

# Setup: create test files
echo -e "id,val\n1,a\n2,b\n3,c" > "$OUTPUT_DIR/customers.csv"
echo -e "id,amt\n1,100" > "$OUTPUT_DIR/orders.csv"
touch "$OUTPUT_DIR/Data File With Spaces.csv"  # problematic filename
touch -d "10 days ago" "$OUTPUT_DIR/old_data.csv"  # simulate old file

echo "====== Pipeline Maintenance Report ======"
echo "Date: $(date)"
echo ""

# TASK 1: Fix filenames with spaces
echo "--- Task 1: Fixing filenames with spaces ---"
# Find files with spaces and rename them
find "$OUTPUT_DIR" -name "* *" | while read f; do
    dir=$(dirname "$f")
    base=$(basename "$f")
    newname=$(echo "$base" | ???)  # replace spaces with underscores
    mv -v "$f" "$dir/$newname"
done

# TASK 2: Archive yesterday's output
echo ""
echo "--- Task 2: Archiving to dated folder ---"
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d 2>/dev/null || date -v-1d +%Y-%m-%d)
DATED_ARCHIVE="$ARCHIVE_DIR/$YESTERDAY"
??? "$OUTPUT_DIR" "$DATED_ARCHIVE"   # copy with full metadata preservation

# TASK 3: Delete outputs older than 7 days
echo ""
echo "--- Task 3: Deleting files older than 7 days ---"
find "$OUTPUT_DIR" -name "*.csv" -mtime +7 | while read old_file; do
    ??? "$old_file"   # delete with verbose output
done

# TASK 4: Count total rows across ALL current CSVs
echo ""
echo "--- Task 4: Row counts ---"
TOTAL=0
for csv in "$OUTPUT_DIR"/*.csv; do
    [ -f "$csv" ] || continue
    count=$(wc -l < "$csv")
    echo "  $(basename $csv): $count rows"
    TOTAL=$((TOTAL + count))
done
echo "  TOTAL rows across all CSVs: $TOTAL"

# TASK 5: Write report
echo ""
echo "--- Task 5: Writing report ---"
{
    echo "Pipeline Report - $(date)"
    echo "Output files: $(ls $OUTPUT_DIR/*.csv 2>/dev/null | wc -l)"
    echo "Total rows: $TOTAL"
    echo "Archive location: $DATED_ARCHIVE"
} > "$REPORT_FILE"
echo "Report written to: $REPORT_FILE"
cat "$REPORT_FILE"`,
      solution: `#!/bin/bash
PIPELINE_DIR="$HOME/pipeline"
ARCHIVE_DIR="$PIPELINE_DIR/archive"
OUTPUT_DIR="$PIPELINE_DIR/output"
REPORT_FILE="$PIPELINE_DIR/daily_report.txt"

mkdir -p "$ARCHIVE_DIR" "$OUTPUT_DIR"
echo -e "id,val\n1,a\n2,b\n3,c" > "$OUTPUT_DIR/customers.csv"
echo -e "id,amt\n1,100" > "$OUTPUT_DIR/orders.csv"
touch "$OUTPUT_DIR/Data File With Spaces.csv"
touch -d "10 days ago" "$OUTPUT_DIR/old_data.csv"

echo "====== Pipeline Maintenance Report ======"
echo "Date: $(date)"; echo ""

echo "--- Task 1: Fixing filenames with spaces ---"
find "$OUTPUT_DIR" -name "* *" | while read f; do
    dir=$(dirname "$f")
    base=$(basename "$f")
    newname=$(echo "$base" | tr ' ' '_')
    mv -v "$f" "$dir/$newname"
done

echo ""; echo "--- Task 2: Archiving to dated folder ---"
YESTERDAY=$(date -d "yesterday" +%Y-%m-%d 2>/dev/null || date -v-1d +%Y-%m-%d)
DATED_ARCHIVE="$ARCHIVE_DIR/$YESTERDAY"
cp -av "$OUTPUT_DIR" "$DATED_ARCHIVE"

echo ""; echo "--- Task 3: Deleting files older than 7 days ---"
find "$OUTPUT_DIR" -name "*.csv" -mtime +7 | while read old_file; do
    rm -v "$old_file"
done

echo ""; echo "--- Task 4: Row counts ---"
TOTAL=0
for csv in "$OUTPUT_DIR"/*.csv; do
    [ -f "$csv" ] || continue
    count=$(wc -l < "$csv")
    echo "  $(basename $csv): $count rows"
    TOTAL=$((TOTAL + count))
done
echo "  TOTAL rows across all CSVs: $TOTAL"

echo ""; echo "--- Task 5: Writing report ---"
{
    echo "Pipeline Report - $(date)"
    echo "Output files: $(ls "$OUTPUT_DIR"/*.csv 2>/dev/null | wc -l)"
    echo "Total rows: $TOTAL"
    echo "Archive location: $DATED_ARCHIVE"
} > "$REPORT_FILE"
echo "Report written to: $REPORT_FILE"
cat "$REPORT_FILE"`,
      explanation: "This script combines all 6 commands: find+tr+mv for rename (tr ' ' '_' translates spaces to underscores inline), cp -av for archive, find -mtime +7 for age-based deletion, wc -l for counting, and {} redirection block for writing a multi-line report in one go. The [ -f '$csv' ] || continue guard prevents errors when no .csv files exist. This is exactly how real pipeline maintenance cron jobs are written."
    }
  ],

  // ════════════════════════════════════════════════════════════
  // SUMMARY
  // ════════════════════════════════════════════════════════════
  summary: `
<div style="background:#0d1117;border:1px solid #30363d;border-radius:10px;padding:20px;">
  <h3 style="color:#bc8cff;margin-top:0;">📚 Ravi's Week in Commands — What He Learned</h3>
  <div class="cards-grid">
    <div class="mini-card">
      <strong style="color:#f85149;">🗑️ rm / rmdir</strong>
      <p>No undo. Use <code>rm -i</code> when unsure. Use <code>rm -v</code> in scripts. Use <code>rmdir</code> for empty dirs — it's your safety net. Always <code>pwd</code> before <code>rm -r</code>.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#3fb950;">📋 cp (4 modes)</strong>
      <p>Basic = overwrites. <code>-n</code> = safe no-overwrite. <code>-r</code> = directories. <code>-a</code> = exact clone with metadata. Use <code>-a</code> for ALL backups. <code>-u</code> for incremental sync.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#58a6ff;">📦 mv</strong>
      <p>Instant on same filesystem (rename syscall). Slow across filesystems (copy+delete). If dest exists and is a dir: file moves inside. If dest is a file: silent overwrite (use <code>-i</code>!).</p>
    </div>
    <div class="mini-card">
      <strong style="color:#d29922;">✏️ rename</strong>
      <p>Perl regex bulk rename. Always use <code>-n</code> first (dry run). <code>s/old/new/g</code> replaces all occurrences. <code>y/A-Z/a-z/</code> lowercases. Anchor with <code>^</code> and <code>$</code>.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#bc8cff;">🔄 rsync</strong>
      <p>Beats cp for anything important: resumes interruptions, skips unchanged, works over SSH. Always <code>--dry-run</code> first. <code>-a</code> preserves metadata. <code>--delete</code> for true mirrors.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#58a6ff;">📊 wc</strong>
      <p><code>-l</code> lines, <code>-w</code> words, <code>-c</code> bytes, <code>-m</code> chars, <code>-L</code> longest line. Use <code>wc -l &lt; file</code> (redirect) for clean output in scripts. Works in pipelines.</p>
    </div>
  </div>

  <div class="comparison-table" style="margin-top:16px;">
    <table style="width:100%;">
      <thead><tr><th>Task</th><th>Best Command</th><th>Why</th></tr></thead>
      <tbody>
        <tr><td>Delete files safely</td><td><code>rm -i</code></td><td>Interactive confirmation</td></tr>
        <tr><td>Delete empty dirs</td><td><code>rmdir</code></td><td>Won't delete if not empty — safe</td></tr>
        <tr><td>Create exact backup</td><td><code>cp -a</code></td><td>Preserves all metadata</td></tr>
        <tr><td>Move large files (same disk)</td><td><code>mv</code></td><td>Instant — just a rename syscall</td></tr>
        <tr><td>Rename 100+ files</td><td><code>rename</code></td><td>Regex bulk rename, one command</td></tr>
        <tr><td>Transfer to remote server</td><td><code>rsync -avz -e ssh</code></td><td>Resumes, compresses, fast</td></tr>
        <tr><td>Sync data directory</td><td><code>rsync -av --delete</code></td><td>Only transfers changes</td></tr>
        <tr><td>Count CSV rows</td><td><code>wc -l file.csv</code></td><td>Instant, no Python needed</td></tr>
      </tbody>
    </table>
  </div>

  <div class="tip-box" style="margin-top:16px;">
    <strong>🚀 Ravi's Friday Script:</strong> By Friday, Ravi had written a single maintenance.sh that: fixed filenames with spaces (rename), archived outputs (cp -a), removed old files (rm + find), synced to a backup server (rsync), and counted total rows (wc -l). What took him 4 hours manually on Monday — <strong>now runs in 3 minutes automatically every night at 1 AM via cron</strong>.
  </div>

  <div style="margin-top:16px;text-align:center;">
    <span style="color:#8b949e;font-size:13px;">Next Module: </span>
    <strong style="color:#bc8cff;">Viewing File Contents — cat, less, head, tail, grep ➡️</strong>
  </div>
</div>`

}; // end var fileops