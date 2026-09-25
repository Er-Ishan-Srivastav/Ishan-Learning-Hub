// ============================================================
// myPathshala – Linux Programming Course
// Module: viewing.js  |  Topic: Viewing & Searching Files
// Commands: cat · tac · head · tail · less · more
//           grep · find · locate · sort · uniq · diff · comm
// ============================================================
// EXPERT FACULTY APPROACH:
//  • 7 dedicated consoles — one per command group
//  • Live story driving every section (Ravi's log crisis)
//  • Differentiator tables: "which tool when"
//  • Behind-the-scenes kernel explanations
//  • 5 progressive real-world exercises
// ============================================================

var viewing = {
    title: "Viewing & Searching Files",
    description: "Master every tool for reading, searching, filtering, and comparing files. The skills every data engineer uses daily — from inspecting CSVs to debugging production logs.",
    breadcrumb: ["Essential Commands", "Viewing & Searching"],

    sections: [

// ════════════════════════════════════════════════════════════
// OPENING STORY
// ════════════════════════════════════════════════════════════
{
id: "viewing-intro",
title: "The Night the Pipeline Broke — and Ravi's Toolkit Saved It",
content: `
<div class="story-box">
  <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="38" r="38" fill="#1a1a2e"/>
      <circle cx="38" cy="29" r="14" fill="#f9a825"/>
      <rect x="18" y="47" width="40" height="24" rx="10" fill="#0d47a1"/>
      <text x="38" y="64" fill="#fff" font-size="16" text-anchor="middle">💻</text>
      <circle cx="60" cy="16" r="13" fill="#3fb950"/>
      <text x="60" y="22" fill="#fff" font-size="18" font-weight="bold" text-anchor="middle">✓</text>
    </svg>
    <div style="flex:1;min-width:220px;">
      <h3 style="margin:0 0 8px;color:#ce93d8;">🚨 2:47 AM — Production Alert Pings Ravi</h3>
      <p><strong>Alert:</strong> <code style="color:#f85149;">ETL_pipeline_customers: FAILED — 0 records processed</code></p>
      <p>Ravi SSH'd into the production server. The pipeline had been running for 3 hours, then silently died. There were no error emails. 2 million customer records — unprocessed.</p>
      <p>His manager needed answers in 15 minutes. No GUI. No Python IDE. Just a terminal and his knowledge of these commands:</p>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-top:14px;">
    <code style="background:#0d1117;padding:8px;border-radius:6px;text-align:center;color:#3fb950;border:1px solid #1a3d1a;">tail -f</code>
    <code style="background:#0d1117;padding:8px;border-radius:6px;text-align:center;color:#58a6ff;border:1px solid #0d2040;">grep -n</code>
    <code style="background:#0d1117;padding:8px;border-radius:6px;text-align:center;color:#d29922;border:1px solid #3d2e0a;">find</code>
    <code style="background:#0d1117;padding:8px;border-radius:6px;text-align:center;color:#bc8cff;border:1px solid #2a1f40;">sort | uniq</code>
    <code style="background:#0d1117;padding:8px;border-radius:6px;text-align:center;color:#f85149;border:1px solid #3d0d0d;">diff</code>
    <code style="background:#0d1117;padding:8px;border-radius:6px;text-align:center;color:#3fb950;border:1px solid #1a3d1a;">head / cat</code>
  </div>
  <p style="margin-top:14px;color:#ce93d8;font-style:italic;">"In 8 minutes, I found the bug, confirmed its scope, and had a fix ready. Every single command in this module was used that night."</p>
</div>

<div class="info-box" style="margin-top:16px;">
  <strong>🗺️ Commands Covered in This Module:</strong>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:10px;">
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #3fb950;">
      <strong style="color:#3fb950;">Reading Files</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>cat</code> · <code>tac</code> · <code>less</code> · <code>more</code></span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #58a6ff;">
      <strong style="color:#58a6ff;">Partial View</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>head</code> · <code>tail</code> · <code>tail -f</code></span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #d29922;">
      <strong style="color:#d29922;">Searching</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>grep</code> · <code>find</code> · <code>locate</code></span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #bc8cff;">
      <strong style="color:#bc8cff;">Sorting & Dedup</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>sort</code> · <code>uniq</code></span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #f85149;">
      <strong style="color:#f85149;">Comparing</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>diff</code> · <code>comm</code></span>
    </div>
  </div>
</div>`
},

// ════════════════════════════════════════════════════════════
// CAT / TAC
// ════════════════════════════════════════════════════════════
{
id: "cat-section",
title: "cat & tac — Reading and Concatenating Files",
content: `
<div class="story-box">
  <strong>📖 Ravi's First Move — 2:49 AM:</strong>
  <p>First thing he did: <code>cat pipeline.log | tail -20</code> — but the log was empty. Something stopped writing to it. He used <code>cat</code> with <code>find</code> to locate the actual log file being written.</p>
</div>

<p><code>cat</code> (concatenate) is the simplest way to read a file. Its name hints at its original purpose — <em>concatenating</em> multiple files into one output stream. <code>tac</code> is cat backwards — it prints files in reverse line order.</p>

<!-- CAT VS TAC DIAGRAM -->
<div class="visual-container">
<svg width="680" height="160" viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="160" fill="#0d1117" rx="12"/>
  <text x="340" y="24" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">cat vs tac — Direction of Output</text>

  <!-- cat side -->
  <rect x="20" y="38" width="290" height="108" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <text x="165" y="58" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">cat file.txt</text>
  <text x="165" y="76" fill="#8b949e" font-size="10" text-anchor="middle">Top → Bottom (natural order)</text>
  <text x="40" y="96"  fill="#e6edf3" font-size="11" font-family="monospace">Line 1: id,name,salary</text>
  <text x="40" y="112" fill="#e6edf3" font-size="11" font-family="monospace">Line 2: 1,Alice,50000</text>
  <text x="40" y="128" fill="#e6edf3" font-size="11" font-family="monospace">Line 3: 2,Bob,60000</text>
  <text x="40" y="144" fill="#3fb950" font-size="10" font-family="monospace">↓ reads forward</text>

  <!-- tac side -->
  <rect x="370" y="38" width="290" height="108" rx="8" fill="#1a0f2a" stroke="#bc8cff" stroke-width="2"/>
  <text x="515" y="58" fill="#bc8cff" font-size="12" font-weight="bold" text-anchor="middle">tac file.txt</text>
  <text x="515" y="76" fill="#8b949e" font-size="10" text-anchor="middle">Bottom → Top (reversed)</text>
  <text x="390" y="96"  fill="#e6edf3" font-size="11" font-family="monospace">Line 3: 2,Bob,60000</text>
  <text x="390" y="112" fill="#e6edf3" font-size="11" font-family="monospace">Line 2: 1,Alice,50000</text>
  <text x="390" y="128" fill="#e6edf3" font-size="11" font-family="monospace">Line 1: id,name,salary</text>
  <text x="390" y="144" fill="#bc8cff" font-size="10" font-family="monospace">↑ reads backward</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 1 — cat & tac: Every Option</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── Basic cat ──────────────────────────────────────────</span>
$ <span style="color:#3fb950;">cat employees.csv</span>
id,name,department,salary
1,Alice,Engineering,85000
2,Bob,Marketing,62000
3,Charlie,Engineering,91000
4,Diana,HR,58000

<span style="color:#6a9955;"># cat -n  ─ number ALL lines (including blank)</span>
$ <span style="color:#3fb950;">cat -n employees.csv</span>
     1  id,name,department,salary
     2  1,Alice,Engineering,85000
     3  2,Bob,Marketing,62000
     4  3,Charlie,Engineering,91000
     5  4,Diana,HR,58000
<span style="color:#6a9955;">← Perfect for finding exact line numbers before editing with vim :42</span>

<span style="color:#6a9955;"># cat -b  ─ number only NON-BLANK lines</span>
$ <span style="color:#3fb950;">cat -b pipeline.log</span>
     1  [INFO] Pipeline started
     2  [INFO] Reading source: s3://data/customers.csv
<span style="color:#6a9955;">          ← blank lines are NOT numbered</span>
     3  [ERROR] Connection timeout after 30s

<span style="color:#6a9955;"># cat -A  ─ show ALL special characters (debug whitespace!)</span>
$ <span style="color:#3fb950;">cat -A config.txt</span>
HOST=localhost^I^I<span style="color:#f85149;">← ^I means TAB character — invisible bugs!</span>
PORT=5432$
USER=admin   $<span style="color:#f85149;">← trailing spaces! Would break env var parsing</span>
<span style="color:#6a9955;">← $ = end of line, ^I = tab, ^M = Windows carriage return (\r)</span>
<span style="color:#6a9955;">← Use this to debug "it works on my machine" config issues</span>

<span style="color:#6a9955;"># cat -s  ─ squeeze multiple blank lines into one</span>
$ <span style="color:#3fb950;">cat -s messy_file.txt</span>
<span style="color:#6a9955;">← Compresses runs of blank lines to single blank line</span>
<span style="color:#6a9955;">← Great for cleaning up verbose logs before piping to grep</span>

<span style="color:#6a9955;"># cat -e  ─ show $ at end of each line</span>
$ <span style="color:#3fb950;">cat -e script.sh</span>
#!/bin/bash$
echo "hello"$
<span style="color:#6a9955;">← Use to detect Windows line endings (\r\n shows as ^M$)</span>

<span style="color:#6a9955;"># CONCATENATE multiple files into one ─ cat's TRUE power</span>
$ <span style="color:#3fb950;">cat header.csv data_jan.csv data_feb.csv data_mar.csv > full_q1.csv</span>
<span style="color:#6a9955;">← Merges 4 files into one, in order
← Essential for combining monthly data exports!
← The > redirect captures the combined output to a new file</span>

<span style="color:#6a9955;"># cat to create a file inline (heredoc alternative)</span>
$ <span style="color:#3fb950;">cat > new_config.yml << 'EOF'</span>
host: localhost
port: 5432
database: production
<span style="color:#3fb950;">EOF</span>
<span style="color:#6a9955;">← Types file content interactively until EOF is entered
← Great for creating config files in scripts</span>

<span style="color:#6a9955;"># tac ─ reverse line order</span>
$ <span style="color:#3fb950;">tac pipeline.log | head -5</span>
[INFO] Pipeline finished: 2024-03-10 03:45:22
[INFO] Records written: 2,041,887
[INFO] Processing batch 204 of 204
[INFO] Processing batch 203 of 204
[INFO] Processing batch 202 of 204
<span style="color:#6a9955;">← tac + head = show LAST 5 lines (another way besides tail)
← tac is perfect when you want the most recent log entries first
← Used with grep: tac log | grep "COMPLETED" | head -1
   → finds the LAST completion event</span>

<span style="color:#6a9955;"># Practical: count lines in concatenated CSVs</span>
$ <span style="color:#3fb950;">cat data_*.csv | wc -l</span>
<span style="color:#6a9955;">← Total line count across ALL matching CSV files</span>

<span style="color:#d29922;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When NOT to use cat:
  cat huge_file.csv | grep "error"
  → BETTER: grep "error" huge_file.csv
  → Avoids loading entire file into stream first
  This is called a "Useless Use of Cat" (UUOC)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span></pre>
</div>`,
interactiveExample: {
  code: `# Debug hidden characters in a config file
cat -A database.env

# Merge monthly sales files
cat sales_jan.csv sales_feb.csv sales_mar.csv > sales_q1.csv

# Reverse a log to see most recent entries first
tac /var/log/app.log | head -20

# Number lines before editing in vim
cat -n config.py
# Now you can jump: vim +42 config.py`,
  explanation: "cat -A is the hidden gem — it reveals invisible characters like tabs (^I) and Windows carriage returns (^M) that silently break scripts and configs. Use it whenever a config 'looks right' but behaves wrong."
}
},

// ════════════════════════════════════════════════════════════
// HEAD / TAIL
// ════════════════════════════════════════════════════════════
{
id: "head-tail-section",
title: "head & tail — Peek at Files Without Loading Everything",
content: `
<div class="story-box">
  <strong>📖 Ravi's Move #2 — 2:51 AM:</strong>
  <p>He found a 4GB log file. <code>cat</code> was out of the question — it would flood the terminal for minutes. He ran <code>tail -100 /var/log/etl/customer_pipeline.log</code> to see the last 100 lines where the failure would be. Then <code>tail -f</code> to watch if any retry was happening in real time.</p>
</div>

<!-- HEAD vs TAIL VISUAL -->
<div class="visual-container">
<svg width="680" height="200" viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="200" fill="#0d1117" rx="12"/>
  <text x="340" y="22" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">head vs tail — Which End of the File</text>

  <!-- File representation -->
  <rect x="260" y="35" width="160" height="150" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="340" y="55" fill="#8b949e" font-size="10" text-anchor="middle">FILE</text>

  <!-- Lines in file -->
  <rect x="268" y="60" width="144" height="10" rx="2" fill="#3fb950" opacity="0.8"/>
  <rect x="268" y="74" width="144" height="10" rx="2" fill="#3fb950" opacity="0.6"/>
  <rect x="268" y="88" width="144" height="10" rx="2" fill="#3fb950" opacity="0.4"/>
  <text x="340" y="107" fill="#8b949e" font-size="9" text-anchor="middle">· · · middle · · ·</text>
  <rect x="268" y="118" width="144" height="10" rx="2" fill="#bc8cff" opacity="0.4"/>
  <rect x="268" y="132" width="144" height="10" rx="2" fill="#bc8cff" opacity="0.6"/>
  <rect x="268" y="146" width="144" height="10" rx="2" fill="#bc8cff" opacity="0.8"/>
  <rect x="268" y="160" width="144" height="10" rx="2" fill="#f85149" opacity="0.9"/>
  <text x="340" y="185" fill="#8b949e" font-size="9" text-anchor="middle">last line</text>

  <!-- head arrow -->
  <rect x="20" y="55" width="200" height="50" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <text x="120" y="76" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">head -n 10</text>
  <text x="120" y="93" fill="#8b949e" font-size="10" text-anchor="middle">First N lines of file</text>
  <line x1="220" y1="80" x2="260" y2="78" stroke="#3fb950" stroke-width="2"/>
  <polygon points="258,73 270,78 258,83" fill="#3fb950"/>

  <!-- tail arrow -->
  <rect x="460" y="130" width="200" height="50" rx="8" fill="#1a0f2a" stroke="#bc8cff" stroke-width="2"/>
  <text x="560" y="151" fill="#bc8cff" font-size="12" font-weight="bold" text-anchor="middle">tail -n 10</text>
  <text x="560" y="168" fill="#8b949e" font-size="10" text-anchor="middle">Last N lines of file</text>
  <line x1="460" y1="155" x2="420" y2="155" stroke="#bc8cff" stroke-width="2"/>
  <polygon points="422,150 410,155 422,160" fill="#bc8cff"/>

  <!-- tail -f -->
  <rect x="460" y="50" width="200" height="50" rx="8" fill="#2a0d0d" stroke="#f85149" stroke-width="2"/>
  <text x="560" y="71" fill="#f85149" font-size="12" font-weight="bold" text-anchor="middle">tail -f  (follow)</text>
  <text x="560" y="88" fill="#8b949e" font-size="10" text-anchor="middle">Live stream new lines</text>
  <line x1="460" y1="75" x2="420" y2="170" stroke="#f85149" stroke-width="1.5" stroke-dasharray="4"/>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 2 — head & tail: Every Option</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── head ───────────────────────────────────────────────</span>
$ <span style="color:#3fb950;">head employees.csv</span>
id,name,department,salary      <span style="color:#6a9955;">← first 10 lines by default</span>
1,Alice,Engineering,85000
2,Bob,Marketing,62000
...

<span style="color:#6a9955;"># head -n N  ─ first N lines</span>
$ <span style="color:#3fb950;">head -n 3 employees.csv</span>
id,name,department,salary
1,Alice,Engineering,85000
2,Bob,Marketing,62000

<span style="color:#6a9955;"># Shorthand: head -3 (same as head -n 3)</span>
$ <span style="color:#3fb950;">head -3 employees.csv</span>

<span style="color:#6a9955;"># head -c N  ─ first N BYTES (not lines)</span>
$ <span style="color:#3fb950;">head -c 100 large_file.bin</span>
<span style="color:#6a9955;">← Reads first 100 bytes — useful for inspecting binary file headers
← PDF files start with %PDF, ZIP files start with PK</span>

$ <span style="color:#3fb950;">head -c 4 file.pdf | xxd</span>
00000000: 2550 4446 2d                             %PDF-
<span style="color:#6a9955;">← Confirmed: it IS a real PDF (magic bytes check)</span>

<span style="color:#6a9955;"># head with multiple files ─ shows filename headers</span>
$ <span style="color:#3fb950;">head -2 *.csv</span>
==> customers.csv <==
id,name,email
1,Alice,alice@example.com

==> orders.csv <==
order_id,customer_id,amount
1001,1,299.99
<span style="color:#6a9955;">← Automatically shows ==> filename <== header for each file
← Perfect for quickly inspecting schemas of multiple CSVs</span>

<span style="color:#6a9955;"># head -n -N  ─ print ALL EXCEPT last N lines</span>
$ <span style="color:#3fb950;">head -n -1 employees.csv</span>
id,name,department,salary
1,Alice,Engineering,85000
2,Bob,Marketing,62000
3,Charlie,Engineering,91000
<span style="color:#6a9955;">← Negative N: prints everything EXCEPT the last N lines
← Useful: strip footer row from CSV before processing</span>

<span style="color:#6a9955;"># ── tail ───────────────────────────────────────────────</span>
$ <span style="color:#3fb950;">tail employees.csv</span>
<span style="color:#6a9955;">← Last 10 lines by default</span>

<span style="color:#6a9955;"># tail -n N  ─ last N lines</span>
$ <span style="color:#3fb950;">tail -100 /var/log/etl/customer_pipeline.log</span>
<span style="color:#6a9955;">← Last 100 lines — where the failure happened</span>

<span style="color:#6a9955;"># tail -n +N  ─ start from line N (skip header!)</span>
$ <span style="color:#3fb950;">tail -n +2 employees.csv</span>
1,Alice,Engineering,85000      <span style="color:#6a9955;">← header row SKIPPED</span>
2,Bob,Marketing,62000
3,Charlie,Engineering,91000
4,Diana,HR,58000
<span style="color:#6a9955;">← +2 means "start from line 2 onwards"
← THE classic way to skip CSV headers in shell pipelines!
   tail -n +2 data.csv | awk -F',' '{sum+=$4} END{print sum}'</span>

<span style="color:#6a9955;"># tail -c N  ─ last N bytes</span>
$ <span style="color:#3fb950;">tail -c 50 logfile.log</span>
<span style="color:#6a9955;">← Last 50 bytes of file — check if file ends properly</span>

<span style="color:#6a9955;"># ── tail -f  ─ THE LIVE LOG WATCHER ─────────────────────</span>
$ <span style="color:#3fb950;">tail -f /var/log/etl/customer_pipeline.log</span>
[2024-03-10 02:47:01] Processing batch 187...
[2024-03-10 02:47:03] Processing batch 188...
[2024-03-10 02:47:05] ERROR: Database connection lost
^C
<span style="color:#6a9955;">← -f (follow): keeps file open, prints NEW lines as written
← Ctrl+C to stop
← The ESSENTIAL tool for watching live logs in production
← Stays open even if file is rotated (logrotate)</span>

<span style="color:#6a9955;"># tail -F  ─ follow even if file is deleted/recreated</span>
$ <span style="color:#3fb950;">tail -F /var/log/nginx/access.log</span>
<span style="color:#6a9955;">← -F (capital): reopens file if it disappears and reappears
← Use -F for log rotation scenarios (logrotate creates new file)
← -f would stop if logrotate deletes/recreates the log</span>

<span style="color:#6a9955;"># Watch MULTIPLE log files simultaneously</span>
$ <span style="color:#3fb950;">tail -f app.log error.log access.log</span>
==> app.log <==
[INFO] Request processed

==> error.log <==
[ERROR] Timeout

==> access.log <==
192.168.1.1 GET /api 200
<span style="color:#6a9955;">← Watches all 3 files, shows which file each line comes from
← Critical for correlating application + error + access logs</span>

<span style="color:#6a9955;"># tail -f + grep ─ live filtered log stream</span>
$ <span style="color:#3fb950;">tail -f app.log | grep --line-buffered "ERROR"</span>
<span style="color:#6a9955;">← Only shows ERROR lines as they appear in real time
← --line-buffered: print each line immediately (no buffering)
← Without it, grep buffers output and you see nothing for minutes</span></pre>
</div>

<div class="deep-dive-box" style="margin-top:16px;">
  <h4>🔬 Behind the Scenes: How tail -f Works</h4>
  <p>When you run <code>tail -f logfile</code>, the kernel uses the <strong>inotify</strong> subsystem (Linux kernel ≥ 2.6.13). The tail process registers an inotify watch on the file descriptor. When the process writing to the log calls <code>write()</code>, the kernel sends an <code>IN_MODIFY</code> event to tail — which then reads the new bytes and prints them. This is extremely efficient: zero CPU usage while waiting, instant response when data arrives.</p>
</div>`,
interactiveExample: {
  code: `# Check CSV header without loading whole file
head -1 massive_dataset.csv

# Skip header row, sum salary column
tail -n +2 employees.csv | awk -F',' '{sum+=$4} END{print "Total:", sum}'

# Watch live log for errors only
tail -f /var/log/app.log | grep --line-buffered -i "error\|warning\|critical"

# Check schemas of all CSVs at once
head -1 *.csv`,
  explanation: "tail -n +2 to skip CSV headers is one of the most-used patterns in shell data processing. The +N syntax means 'start from line N' not 'last N lines' — this trips up many beginners."
}
},

// ════════════════════════════════════════════════════════════
// LESS / MORE
// ════════════════════════════════════════════════════════════
{
id: "less-more-section",
title: "less & more — Safely Navigate Large Files",
content: `
<p>When a file is too large to <code>cat</code> (anything over a few hundred lines), you need a <strong>pager</strong> — a program that lets you scroll through content. <code>less</code> is the professional's choice. <code>more</code> is its older, simpler cousin.</p>

<table class="comparison-table">
  <thead><tr><th>Feature</th><th>less</th><th>more</th></tr></thead>
  <tbody>
    <tr><td>Scroll direction</td><td style="color:#3fb950;">Both ↑ and ↓</td><td style="color:#f85149;">Only ↓ (forward)</td></tr>
    <tr><td>Search</td><td style="color:#3fb950;">/pattern (forward) and ?pattern (backward)</td><td style="color:#f85149;">/pattern (forward only)</td></tr>
    <tr><td>File size</td><td style="color:#3fb950;">Never loads full file into RAM</td><td style="color:#f85149;">Loads sections into memory</td></tr>
    <tr><td>Multiple files</td><td style="color:#3fb950;">:n = next, :p = prev file</td><td>Single file only</td></tr>
    <tr><td>Line numbers</td><td style="color:#3fb950;">-N flag shows line numbers</td><td>Not available</td></tr>
    <tr><td>Colour support</td><td style="color:#3fb950;">-R flag preserves ANSI colors</td><td>Limited</td></tr>
    <tr><td>Professional use</td><td style="color:#3fb950;">✅ Daily driver</td><td style="color:#8b949e;">Legacy / minimal systems</td></tr>
  </tbody>
</table>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 3 — less: Navigating Large Files</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># Open a file in less</span>
$ <span style="color:#3fb950;">less /var/log/syslog</span>
<span style="color:#6a9955;">← File opens. Navigate with keyboard. Press q to quit.</span>

<span style="color:#6a9955;"># less -N  ─ show line numbers</span>
$ <span style="color:#3fb950;">less -N /var/log/app.log</span>
      1 [INFO] 2024-03-10 01:00:00 Pipeline started
      2 [INFO] 2024-03-10 01:00:01 Reading config...
      3 [INFO] 2024-03-10 01:00:02 Connecting to DB...

<span style="color:#6a9955;"># less -S  ─ don't wrap long lines (horizontal scroll)</span>
$ <span style="color:#3fb950;">less -S wide_data.csv</span>
<span style="color:#6a9955;">← Long lines get cut at screen edge, scroll right with → key
← Essential for wide CSV files that would wrap and be unreadable</span>

<span style="color:#6a9955;"># less -R  ─ show ANSI colour codes (coloured output)</span>
$ <span style="color:#3fb950;">ls --color=always | less -R</span>
<span style="color:#3fb950;">projects/</span>  <span style="color:#58a6ff;">data.csv</span>  <span style="color:#3fb950;">run.sh</span>
<span style="color:#6a9955;">← -R preserves terminal colour codes from piped commands
← Without -R, you'd see raw escape codes like ^[[32m</span>

<span style="color:#6a9955;"># less +G  ─ open at END of file</span>
$ <span style="color:#3fb950;">less +G pipeline.log</span>
<span style="color:#6a9955;">← Starts at the BOTTOM (most recent log entries)
← Same as tail but with full navigation ability</span>

<span style="color:#6a9955;"># less +F  ─ follow mode (like tail -f BUT navigable)</span>
$ <span style="color:#3fb950;">less +F pipeline.log</span>
<span style="color:#6a9955;">← Watches file for new content (like tail -f)
← Press Ctrl+C to stop following and enter navigation mode
← Press F again to resume following
← SUPERIOR to tail -f: you can search back through history!</span>

<span style="color:#d29922;">━━ KEYBOARD SHORTCUTS INSIDE less ━━━━━━━━━━━━━━━━━━━━━━
  Space / f     → Page DOWN (forward)
  b             → Page UP (backward)
  ↑ / ↓         → Scroll one line
  g / G         → Go to beginning / end of file
  /pattern      → Search FORWARD for pattern
  ?pattern      → Search BACKWARD for pattern
  n             → Next search match
  N             → Previous search match
  :n / :p       → Next / Previous file (when multiple files)
  q             → QUIT
  h             → Help (full key reference)
  &pattern      → Show ONLY lines matching pattern (filter!)
  -N            → Toggle line numbers ON/OFF while viewing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span style="color:#6a9955;"># Pipe anything into less</span>
$ <span style="color:#3fb950;">man grep | less</span>              <span style="color:#6a9955;">← navigate the manual</span>
$ <span style="color:#3fb950;">git log --oneline | less</span>      <span style="color:#6a9955;">← browse git history</span>
$ <span style="color:#3fb950;">ls -laR /etc | less</span>           <span style="color:#6a9955;">← explore directory tree</span>
$ <span style="color:#3fb950;">ps aux | less</span>                 <span style="color:#6a9955;">← browse processes</span></pre>
</div>

<div class="tip-box" style="margin-top:12px;">
  <strong>💡 Faculty Tip — less is More:</strong> The saying "less is more" in Linux is literal. <code>less</code> was written as an improvement to <code>more</code>. When working on production servers with multi-GB log files, always use <code>less</code> — it reads the file in chunks and uses minimal RAM. <code>cat</code>-ing a 4GB log file would crash a low-memory server.
</div>`
},

// ════════════════════════════════════════════════════════════
// GREP — THE KING
// ════════════════════════════════════════════════════════════
{
id: "grep-section",
title: "grep — The Search King (Every Flag, Every Pattern)",
content: `
<div class="story-box">
  <strong>📖 Ravi's Move #3 — 2:53 AM:</strong>
  <p>He used <code>tail -f</code> but the log had stopped. He needed to find the exact error. He ran: <code>grep -n "ERROR\|FATAL\|Exception" customer_pipeline.log</code> — and found it on line 47,291: <em>"java.sql.SQLException: Quota exceeded on table customers_staging"</em>. Problem found in 12 seconds.</p>
</div>

<p><code>grep</code> (Global Regular Expression Print) searches for lines matching a pattern. It's arguably the most-used command in Linux after <code>ls</code> and <code>cd</code>.</p>

<!-- GREP ANATOMY SVG -->
<div class="visual-container">
<svg width="680" height="120" viewBox="0 0 680 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="120" fill="#0d1117" rx="12"/>
  <text x="340" y="22" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">Anatomy of a grep Command</text>

  <text x="40"  y="60" fill="#3fb950" font-size="18" font-family="monospace" font-weight="bold">grep</text>
  <text x="100" y="60" fill="#d29922" font-size="18" font-family="monospace">-i -n -r</text>
  <text x="210" y="60" fill="#bc8cff" font-size="18" font-family="monospace">"ERROR"</text>
  <text x="330" y="60" fill="#58a6ff" font-size="18" font-family="monospace">/var/log/*.log</text>

  <text x="55"  y="85" fill="#3fb950"  font-size="10" text-anchor="middle">command</text>
  <text x="145" y="85" fill="#d29922"  font-size="10" text-anchor="middle">flags</text>
  <text x="248" y="85" fill="#bc8cff"  font-size="10" text-anchor="middle">PATTERN</text>
  <text x="430" y="85" fill="#58a6ff"  font-size="10" text-anchor="middle">file(s) or glob</text>

  <text x="55"  y="100" fill="#8b949e" font-size="9" text-anchor="middle">search tool</text>
  <text x="145" y="100" fill="#8b949e" font-size="9" text-anchor="middle">case-insensitive<br/>+line numbers<br/>+recursive</text>
  <text x="248" y="100" fill="#8b949e" font-size="9" text-anchor="middle">what to find</text>
  <text x="430" y="100" fill="#8b949e" font-size="9" text-anchor="middle">where to search</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 4 — grep: Every Flag with Real Examples</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── Basic grep ──────────────────────────────────────────</span>
$ <span style="color:#3fb950;">grep "ERROR" app.log</span>
[2024-03-10 02:47:05] ERROR: Database connection lost
[2024-03-10 02:51:12] ERROR: Retry limit exceeded
<span style="color:#6a9955;">← Prints every line containing "ERROR"
← Case SENSITIVE by default: "error" would NOT match</span>

<span style="color:#6a9955;"># -i  ─ case-insensitive (matches ERROR, error, Error, eRrOr)</span>
$ <span style="color:#3fb950;">grep -i "error" app.log</span>
[...] ERROR: Database connection lost
[...] error: null pointer at line 42
[...] Error: Config file not found

<span style="color:#6a9955;"># -n  ─ show line numbers</span>
$ <span style="color:#3fb950;">grep -n "Exception" pipeline.log</span>
47291:[ERROR] java.sql.SQLException: Quota exceeded
<span style="color:#6a9955;">← Line number 47291! Now: vim +47291 pipeline.log</span>

<span style="color:#6a9955;"># -c  ─ count matching lines (not content)</span>
$ <span style="color:#3fb950;">grep -c "ERROR" app.log</span>
47
<span style="color:#6a9955;">← 47 error lines. Useful for: "how bad is it?"</span>

<span style="color:#6a9955;"># -v  ─ invert match (lines NOT containing pattern)</span>
$ <span style="color:#3fb950;">grep -v "^#" config.cfg</span>
host=localhost
port=5432
database=production
<span style="color:#6a9955;">← Strips comment lines (starting with #)
← grep -v "^$" removes blank lines
← grep -v "DEBUG\|INFO" log → show only errors</span>

<span style="color:#6a9955;"># -l  ─ list only FILENAMES that match (not content)</span>
$ <span style="color:#3fb950;">grep -l "API_KEY" *.env *.cfg *.yml</span>
production.env
staging.cfg
<span style="color:#6a9955;">← Shows WHICH files contain API_KEY — security audit!
← Pair with -r for recursive search</span>

<span style="color:#6a9955;"># -L  ─ list files that do NOT match</span>
$ <span style="color:#3fb950;">grep -L "version" *.yml</span>
<span style="color:#6a9955;">← Config files MISSING a version field — great for auditing</span>

<span style="color:#6a9955;"># -r  ─ recursive search through all subdirectories</span>
$ <span style="color:#3fb950;">grep -r "password" /home/ravi/projects/</span>
/home/ravi/projects/config.yml:  password: changeme123
/home/ravi/projects/old_script.py:  db_password = "admin"
<span style="color:#6a9955;">← SECURITY AUDIT: find hardcoded passwords!
← Add -l to just get filenames: grep -rl "password" .</span>

<span style="color:#6a9955;"># -w  ─ whole word match only</span>
$ <span style="color:#3fb950;">grep -w "log" app.log</span>
<span style="color:#6a9955;">← Matches "log" but NOT "logging", "syslog", "dialog"
← Without -w: "log" matches ALL of those</span>

<span style="color:#6a9955;"># -o  ─ print only the MATCHING part (not full line)</span>
$ <span style="color:#3fb950;">grep -o "[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}" access.log</span>
192.168.1.1
10.0.0.25
203.0.113.42
<span style="color:#6a9955;">← Extracts ONLY IP addresses from access log — powerful!
← Without -o: shows entire line. With -o: extracted text only.</span>

<span style="color:#6a9955;"># -e  ─ multiple patterns (OR logic)</span>
$ <span style="color:#3fb950;">grep -e "ERROR" -e "FATAL" -e "CRITICAL" app.log</span>
<span style="color:#6a9955;">← Matches ANY of the patterns
← Alternative: grep -E "ERROR|FATAL|CRITICAL" app.log</span>

<span style="color:#6a9955;"># -E  ─ Extended regex (more powerful patterns)</span>
$ <span style="color:#3fb950;">grep -E "ERROR|FATAL|Exception" app.log</span>
$ <span style="color:#3fb950;">grep -E "[0-9]{3}-[0-9]{4}" contacts.txt</span>   <span style="color:#6a9955;">← phone numbers</span>
$ <span style="color:#3fb950;">grep -E "^[A-Z].{50,}" essay.txt</span>              <span style="color:#6a9955;">← long lines starting uppercase</span>

<span style="color:#6a9955;"># -A -B -C  ─ context lines (Around, Before, After)</span>
$ <span style="color:#3fb950;">grep -A 3 "OutOfMemory" app.log</span>
[ERROR] java.lang.OutOfMemoryError: GC overhead        <span style="color:#6a9955;">← match</span>
        at java.util.Arrays.copyOf(Unknown Source)      <span style="color:#6a9955;">← 3 lines After</span>
        at com.etl.pipeline.Processor.run(Processor.java:142)
        at java.lang.Thread.run(Unknown Source)

$ <span style="color:#3fb950;">grep -B 2 "Exception" pipeline.log</span>   <span style="color:#6a9955;">← 2 lines Before</span>
$ <span style="color:#3fb950;">grep -C 5 "FATAL" app.log</span>             <span style="color:#6a9955;">← 5 lines both sides</span>
<span style="color:#6a9955;">← Context lines let you see WHAT CAUSED the error
← Most critical grep flags for debugging!</span>

<span style="color:#6a9955;"># ^ and $ anchors</span>
$ <span style="color:#3fb950;">grep "^ERROR" app.log</span>       <span style="color:#6a9955;">← lines that START with ERROR</span>
$ <span style="color:#3fb950;">grep "failed$" app.log</span>      <span style="color:#6a9955;">← lines that END with "failed"</span>
$ <span style="color:#3fb950;">grep "^$" app.log</span>           <span style="color:#6a9955;">← blank lines only</span>
$ <span style="color:#3fb950;">grep -v "^$" app.log</span>        <span style="color:#6a9955;">← remove blank lines</span>

<span style="color:#6a9955;"># --color  ─ highlight matches in output</span>
$ <span style="color:#3fb950;">grep --color=always "ERROR" app.log | less -R</span>
<span style="color:#6a9955;">← Coloured matches piped to less for navigation</span>

<span style="color:#6a9955;"># grep in pipelines ─ the real power</span>
$ <span style="color:#3fb950;">ps aux | grep python</span>         <span style="color:#6a9955;">← find running Python processes</span>
$ <span style="color:#3fb950;">history | grep "rm -r"</span>       <span style="color:#6a9955;">← find dangerous commands you ran</span>
$ <span style="color:#3fb950;">cat /etc/passwd | grep -v "nologin\|false"</span>  <span style="color:#6a9955;">← real user accounts</span>
$ <span style="color:#3fb950;">df -h | grep -v "tmpfs"</span>      <span style="color:#6a9955;">← disk usage, skip temp filesystems</span></pre>
</div>

<div class="deep-dive-box" style="margin-top:12px;">
  <h4>🔬 grep's Regex Engine — BRE vs ERE vs PCRE</h4>
  <table class="comparison-table">
    <thead><tr><th>Mode</th><th>Flag</th><th>Syntax</th><th>Use When</th></tr></thead>
    <tbody>
      <tr><td>Basic Regex (BRE)</td><td><code>grep</code></td><td><code>\+</code> <code>\{n\}</code> <code>\|</code> need backslash</td><td>Simple pattern matching</td></tr>
      <tr><td>Extended Regex (ERE)</td><td><code>grep -E</code> or <code>egrep</code></td><td><code>+</code> <code>{n}</code> <code>|</code> no backslash needed</td><td>Complex patterns, alternation (OR)</td></tr>
      <tr><td>Perl Regex (PCRE)</td><td><code>grep -P</code></td><td><code>\d</code> <code>\w</code> <code>\s</code> lookahead/behind</td><td>Advanced patterns, named groups</td></tr>
    </tbody>
  </table>
</div>`,
interactiveExample: {
  code: `# Find all Python files containing TODO comments
grep -rn "TODO\|FIXME\|HACK" --include="*.py" .

# Security audit - find hardcoded credentials
grep -riE "password\s*=\s*['\"][^'\"]+['\"]" .

# Count error types in log
grep -oE "(ERROR|WARN|INFO|DEBUG)" app.log | sort | uniq -c | sort -rn

# Show context around a crash
grep -B5 -A10 "Segmentation fault" /var/log/syslog`,
  explanation: "grep -rn + --include='*.py' restricts recursive search to specific file types — essential for searching large codebases. The -oE combo extracts just the matched text, which when piped to sort | uniq -c gives you a frequency count of any pattern."
}
},

// ════════════════════════════════════════════════════════════
// FIND
// ════════════════════════════════════════════════════════════
{
id: "find-section",
title: "find — Search the Filesystem by Any Attribute",
content: `
<div class="story-box">
  <strong>📖 Ravi's Move #4 — 2:56 AM:</strong>
  <p>The quota error on <code>customers_staging</code> meant a temp file somewhere was enormous. He ran: <code>find /tmp /var/tmp -name "*.parquet" -size +1G -mtime -1</code> — and found a 47GB orphaned Spark temp file from a crashed job 6 hours earlier. Deleted it. Pipeline restarted. Problem solved.</p>
</div>

<p><code>find</code> searches the filesystem for files and directories based on <strong>any combination</strong> of: name, type, size, date, permissions, owner, or content. Unlike <code>grep</code> (which searches inside files), <code>find</code> searches for files themselves.</p>

<!-- GREP VS FIND DIFFERENTIATOR -->
<table class="comparison-table">
  <thead><tr><th></th><th>grep</th><th>find</th><th>locate</th></tr></thead>
  <tbody>
    <tr><td><strong>Searches</strong></td><td>Content INSIDE files</td><td>File attributes (name, size, date, perms)</td><td>File names only (pre-indexed)</td></tr>
    <tr><td><strong>Speed</strong></td><td>Fast (reads sequentially)</td><td>Medium (walks filesystem)</td><td style="color:#3fb950;">Instant (database lookup)</td></tr>
    <tr><td><strong>Freshness</strong></td><td>Always current</td><td>Always current</td><td style="color:#f85149;">May be hours old</td></tr>
    <tr><td><strong>Use when</strong></td><td>Find text in files</td><td>Find files by properties</td><td>Quick file location lookup</td></tr>
    <tr><td><strong>Example</strong></td><td><code>grep "ERROR" *.log</code></td><td><code>find . -name "*.log"</code></td><td><code>locate data.csv</code></td></tr>
  </tbody>
</table>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 5 — find: Every Search Criterion</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># Syntax: find [WHERE] [WHAT] [ACTION]</span>

<span style="color:#6a9955;"># ── By NAME ────────────────────────────────────────────</span>
$ <span style="color:#3fb950;">find /home/ravi -name "*.csv"</span>
/home/ravi/projects/etl/output/customers.csv
/home/ravi/data_engineering/kafka/data.csv
<span style="color:#6a9955;">← Find ALL CSVs under /home/ravi (recursive by default)</span>

$ <span style="color:#3fb950;">find . -name "config.yml"</span>        <span style="color:#6a9955;">← exact name match</span>
$ <span style="color:#3fb950;">find . -iname "*.CSV"</span>            <span style="color:#6a9955;">← case-insensitive name</span>
$ <span style="color:#3fb950;">find . -name "*.py" -not -name "__init__.py"</span>
<span style="color:#6a9955;">← Python files EXCEPT __init__.py</span>

<span style="color:#6a9955;"># ── By TYPE ────────────────────────────────────────────</span>
$ <span style="color:#3fb950;">find . -type f</span>     <span style="color:#6a9955;">← regular files only</span>
$ <span style="color:#3fb950;">find . -type d</span>     <span style="color:#6a9955;">← directories only</span>
$ <span style="color:#3fb950;">find . -type l</span>     <span style="color:#6a9955;">← symbolic links only</span>
$ <span style="color:#3fb950;">find . -type f -name "*.log"</span>     <span style="color:#6a9955;">← files + name filter</span>

<span style="color:#6a9955;"># ── By SIZE ────────────────────────────────────────────</span>
$ <span style="color:#3fb950;">find /tmp -size +1G</span>       <span style="color:#6a9955;">← files LARGER than 1 Gigabyte</span>
$ <span style="color:#3fb950;">find . -size +100M</span>        <span style="color:#6a9955;">← larger than 100 MB</span>
$ <span style="color:#3fb950;">find . -size -1k</span>          <span style="color:#6a9955;">← smaller than 1 kilobyte (empty-ish)</span>
$ <span style="color:#3fb950;">find . -size 0</span>            <span style="color:#6a9955;">← exactly 0 bytes (truly empty files)</span>
$ <span style="color:#3fb950;">find . -empty</span>             <span style="color:#6a9955;">← empty files AND empty directories</span>
<span style="color:#6a9955;"># Sizes: c=bytes, k=kilobytes, M=megabytes, G=gigabytes</span>

<span style="color:#6a9955;"># ── By TIME ────────────────────────────────────────────</span>
$ <span style="color:#3fb950;">find . -mtime -1</span>       <span style="color:#6a9955;">← modified in the last 24 hours</span>
$ <span style="color:#3fb950;">find . -mtime -7</span>       <span style="color:#6a9955;">← modified in the last 7 days</span>
$ <span style="color:#3fb950;">find . -mtime +30</span>      <span style="color:#6a9955;">← modified MORE than 30 days ago (old files)</span>
$ <span style="color:#3fb950;">find . -mmin -60</span>       <span style="color:#6a9955;">← modified in the last 60 MINUTES</span>
$ <span style="color:#3fb950;">find . -newer reference.txt</span>  <span style="color:#6a9955;">← newer than reference.txt's mtime</span>
$ <span style="color:#3fb950;">find . -atime +90</span>      <span style="color:#6a9955;">← not accessed in 90+ days (stale data)</span>
<span style="color:#6a9955;"># mtime=modified, atime=accessed, ctime=status-changed
# - means "less than N days", + means "more than N days"</span>

<span style="color:#6a9955;"># ── By PERMISSIONS ─────────────────────────────────────</span>
$ <span style="color:#3fb950;">find . -perm 777</span>       <span style="color:#6a9955;">← files with EXACTLY 777 permissions</span>
$ <span style="color:#3fb950;">find . -perm -u+x</span>      <span style="color:#6a9955;">← user-executable files (scripts, binaries)</span>
$ <span style="color:#3fb950;">find . -perm /o+w</span>      <span style="color:#6a9955;">← world-writable files (SECURITY RISK!)</span>
$ <span style="color:#3fb950;">find /etc -perm -4000</span>  <span style="color:#6a9955;">← SUID files (run as owner, not caller)</span>

<span style="color:#6a9955;"># ── By OWNER ───────────────────────────────────────────</span>
$ <span style="color:#3fb950;">find /var -user ravi</span>   <span style="color:#6a9955;">← files owned by ravi</span>
$ <span style="color:#3fb950;">find / -nouser</span>         <span style="color:#6a9955;">← orphaned files (owner was deleted)</span>

<span style="color:#6a9955;"># ── COMBINING conditions ───────────────────────────────</span>
$ <span style="color:#3fb950;">find /tmp -name "*.parquet" -size +1G -mtime -1</span>
<span style="color:#6a9955;">← Parquet files, larger than 1GB, created today</span>
<span style="color:#6a9955;">← All conditions must be TRUE (implicit AND)</span>

$ <span style="color:#3fb950;">find . -name "*.log" -o -name "*.tmp"</span>
<span style="color:#6a9955;">← -o = OR: log files OR tmp files</span>

$ <span style="color:#3fb950;">find . -not -name "*.py"</span>     <span style="color:#6a9955;">← NOT Python files</span>

<span style="color:#6a9955;"># ── ACTIONS on found files ─────────────────────────────</span>
$ <span style="color:#3fb950;">find . -name "*.tmp" -delete</span>
<span style="color:#6a9955;">← Find AND delete in one command (BE CAREFUL!)
← Always test with just 'find . -name "*.tmp"' first</span>

$ <span style="color:#3fb950;">find . -name "*.log" -exec ls -lh {} \;</span>
<span style="color:#6a9955;">← -exec: run a command on each found file
← {} = placeholder for the found filename
← \; = end of the -exec command</span>

$ <span style="color:#3fb950;">find . -type f -name "*.csv" -exec wc -l {} \;</span>
      1000 ./output/customers.csv
       500 ./output/orders.csv
<span style="color:#6a9955;">← Count lines in every CSV file found</span>

$ <span style="color:#3fb950;">find /var/log -name "*.log" -size +100M -exec gzip {} \;</span>
<span style="color:#6a9955;">← Compress all log files larger than 100MB
← Real sysadmin/DE maintenance task!</span>

$ <span style="color:#3fb950;">find . -name "*.py" -exec grep -l "import pandas" {} \;</span>
<span style="color:#6a9955;">← Find Python files that import pandas</span>

<span style="color:#6a9955;"># -exec with + (batch mode — faster than \;)</span>
$ <span style="color:#3fb950;">find . -name "*.log" -exec gzip {} +</span>
<span style="color:#6a9955;">← + passes ALL found files to ONE gzip command
← Faster than \; which runs gzip once per file</span>

<span style="color:#6a9955;"># ── Practical real-world find commands ─────────────────</span>
<span style="color:#6a9955;"># Disk space audit — find top 10 largest files</span>
$ <span style="color:#3fb950;">find / -type f -size +100M 2>/dev/null | xargs ls -lh | sort -k5 -hr | head -10</span>

<span style="color:#6a9955;"># Clean Python cache files</span>
$ <span style="color:#3fb950;">find . -type d -name "__pycache__" -exec rm -rf {} +</span>
$ <span style="color:#3fb950;">find . -name "*.pyc" -delete</span>

<span style="color:#6a9955;"># Find recently modified config files (detect changes)</span>
$ <span style="color:#3fb950;">find /etc -name "*.conf" -mtime -1 -ls</span>

<span style="color:#6a9955;"># 2>/dev/null suppresses "Permission denied" errors</span>
$ <span style="color:#3fb950;">find / -name "*.csv" 2>/dev/null</span></pre>
</div>`
},

// ════════════════════════════════════════════════════════════
// SORT / UNIQ
// ════════════════════════════════════════════════════════════
{
id: "sort-uniq-section",
title: "sort & uniq — Order and Deduplicate Data",
content: `
<div class="story-box">
  <strong>📖 Ravi's Move #5 — 3:01 AM:</strong>
  <p>With the pipeline restarted, his manager asked: "How many unique customers were affected?" Ravi ran: <code>grep "FAILED" customer_pipeline.log | awk '{print $5}' | sort | uniq | wc -l</code> — Answer: 143,291 unique customer IDs had failed to process. That became the incident report number.</p>
</div>

<div class="info-box">
  <strong>🔑 The Golden Rule of sort + uniq:</strong> <code>uniq</code> only removes <em>adjacent</em> duplicate lines. You MUST <code>sort</code> first, then <code>uniq</code>. <code>sort | uniq</code> is one of the most-used command pairs in data engineering.
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 6 — sort & uniq: Data Analysis Tools</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── sort ────────────────────────────────────────────────</span>
<span style="color:#6a9955;"># Default: alphabetical (lexicographic) sort</span>
$ <span style="color:#3fb950;">sort names.txt</span>
Alice
Bob
Charlie
Diana

<span style="color:#6a9955;"># sort -n  ─ NUMERIC sort (critical difference!)</span>
$ echo -e "10\n9\n100\n2" | <span style="color:#3fb950;">sort</span>
10             <span style="color:#f85149;">← WRONG: alphabetical, 1 comes before 9</span>
100
2
9

$ echo -e "10\n9\n100\n2" | <span style="color:#3fb950;">sort -n</span>
2              <span style="color:#3fb950;">← CORRECT: numeric order</span>
9
10
100
<span style="color:#6a9955;">← ALWAYS use -n when sorting numbers. Without it, "100" < "9" alphabetically!</span>

<span style="color:#6a9955;"># sort -r  ─ reverse order</span>
$ <span style="color:#3fb950;">sort -rn salaries.txt</span>
91000          <span style="color:#6a9955;">← largest first</span>
85000
62000
58000

<span style="color:#6a9955;"># sort -u  ─ unique (sort + remove duplicates in one step)</span>
$ <span style="color:#3fb950;">sort -u departments.txt</span>
Engineering
HR
Marketing
<span style="color:#6a9955;">← Equivalent to sort | uniq but faster</span>

<span style="color:#6a9955;"># sort -k  ─ sort by specific COLUMN (field)</span>
$ <span style="color:#3fb950;">sort -t',' -k4 -n employees.csv</span>
4,Diana,HR,58000           <span style="color:#6a9955;">← sorted by column 4 (salary), lowest first</span>
2,Bob,Marketing,62000
1,Alice,Engineering,85000
3,Charlie,Engineering,91000
<span style="color:#6a9955;">← -t',' = comma delimiter
← -k4 = sort by field 4 (salary column)
← -n = numeric sort (critical for numbers!)</span>

<span style="color:#6a9955;"># sort by multiple columns</span>
$ <span style="color:#3fb950;">sort -t',' -k3,3 -k4,4rn employees.csv</span>
<span style="color:#6a9955;">← First sort by column 3 (department) alphabetically
← Then by column 4 (salary) in reverse numeric order
← Within each department, highest-paid employee first</span>

<span style="color:#6a9955;"># sort -h  ─ human-readable sizes (1K, 2M, 3G)</span>
$ <span style="color:#3fb950;">du -sh * | sort -h</span>
4.0K   config.yml
128K   notes.md
2.1M   dataset.csv
5.0G   model.pkl      <span style="color:#6a9955;">← largest file last</span>
<span style="color:#6a9955;">← -h understands K/M/G suffixes
← Without -h: "2.1M" would sort before "5.0G" alphabetically</span>

<span style="color:#6a9955;"># sort -V  ─ version sort (natural order)</span>
$ ls release*.txt | <span style="color:#3fb950;">sort -V</span>
release_1.0.0.txt
release_1.9.0.txt
release_1.10.0.txt    <span style="color:#6a9955;">← correct! (not after release_1.1.0)</span>
release_2.0.0.txt
<span style="color:#6a9955;">← -V handles version numbers correctly
← Without -V: 1.10 sorts before 1.9 alphabetically</span>

<span style="color:#6a9955;"># sort -f  ─ case-insensitive</span>
$ <span style="color:#3fb950;">sort -f names.txt</span>
<span style="color:#6a9955;">← alice, Alice, ALICE all treated the same</span>

<span style="color:#6a9955;"># ── uniq ────────────────────────────────────────────────</span>
<span style="color:#6a9955;"># Basic uniq ─ remove ADJACENT duplicates</span>
$ echo -e "apple\napple\nbanana\napple" | <span style="color:#3fb950;">uniq</span>
apple          <span style="color:#f85149;">← first apple</span>
banana
apple          <span style="color:#f85149;">← STILL HERE (not adjacent to first apple!)</span>
<span style="color:#6a9955;">← uniq only removes CONSECUTIVE duplicates
← ALWAYS sort before uniq for true deduplication</span>

$ echo -e "apple\napple\nbanana\napple" | sort | <span style="color:#3fb950;">uniq</span>
apple          <span style="color:#3fb950;">← now deduplicated correctly</span>
banana

<span style="color:#6a9955;"># uniq -c  ─ count occurrences (frequency analysis!)</span>
$ cat access.log | awk '{print $1}' | sort | <span style="color:#3fb950;">uniq -c | sort -rn | head -5</span>
    847 203.0.113.42     <span style="color:#6a9955;">← most frequent IP address</span>
    312 192.168.1.100
    198 10.0.0.25
     87 172.16.0.5
     23 192.168.1.200
<span style="color:#6a9955;">← THE pattern for frequency analysis:
   cat data | extract_field | sort | uniq -c | sort -rn | head
← Used for: top IPs, most common errors, most active users</span>

<span style="color:#6a9955;"># uniq -d  ─ show ONLY duplicate lines</span>
$ <span style="color:#3fb950;">sort customer_ids.txt | uniq -d</span>
CUST_00142     <span style="color:#6a9955;">← these customers appear MORE than once</span>
CUST_00891
<span style="color:#6a9955;">← Find duplicate records in a dataset!</span>

<span style="color:#6a9955;"># uniq -u  ─ show ONLY unique lines (appear once)</span>
$ <span style="color:#3fb950;">sort customer_ids.txt | uniq -u</span>
<span style="color:#6a9955;">← Lines that appear exactly ONCE — the opposite of -d</span>

<span style="color:#6a9955;"># uniq -i  ─ case-insensitive comparison</span>
$ sort names.txt | <span style="color:#3fb950;">uniq -i</span>
<span style="color:#6a9955;">← "Alice", "alice", "ALICE" all treated as duplicates</span>

<span style="color:#6a9955;"># Complete frequency analysis pipeline</span>
$ <span style="color:#3fb950;">cat /var/log/auth.log | grep "Failed password" | \</span>
  <span style="color:#3fb950;">awk '{print $11}' | sort | uniq -c | sort -rn | head -10</span>
   542 192.168.1.50
   231 10.0.0.99
<span style="color:#6a9955;">← Top 10 IPs attempting failed SSH logins — security report!</span></pre>
</div>`,
interactiveExample: {
  code: `# Find top 5 most common error types in a log
grep "ERROR" app.log | awk '{print $NF}' | sort | uniq -c | sort -rn | head -5

# Find duplicate customer IDs in CSV (data quality check)
tail -n +2 customers.csv | cut -d',' -f1 | sort | uniq -d

# Sort CSV by salary (field 4), descending
sort -t',' -k4,4rn employees.csv

# Count unique IP addresses in access log
awk '{print $1}' access.log | sort -u | wc -l`,
  explanation: "The sort | uniq -c | sort -rn pattern is the most powerful data analysis pipeline in shell. It counts occurrences of any field in any file. Master this and you can answer 'how many? which most?' questions on any dataset in seconds."
}
},

// ════════════════════════════════════════════════════════════
// DIFF / COMM
// ════════════════════════════════════════════════════════════
{
id: "diff-comm-section",
title: "diff & comm — Compare Files Like a Pro",
content: `
<div class="story-box">
  <strong>📖 Ravi's Final Move — 3:08 AM:</strong>
  <p>The pipeline restarted and finished at 3:08 AM. His manager asked: "Did the fixed run produce the same schema as yesterday?" Ravi ran <code>head -1 output_today.csv</code> and <code>head -1 output_yesterday.csv</code> — then <code>diff</code> between the two header files. No differences. Schema preserved. Incident closed.</p>
</div>

<!-- DIFF VS COMM VISUAL -->
<div class="visual-container">
<svg width="680" height="150" viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="150" fill="#0d1117" rx="12"/>
  <text x="340" y="22" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">diff vs comm — Different Comparison Styles</text>

  <rect x="20" y="38" width="295" height="98" rx="8" fill="#0d1f3c" stroke="#58a6ff" stroke-width="2"/>
  <text x="167" y="60" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">diff — Line-by-Line Changes</text>
  <text x="35" y="80"  fill="#f85149" font-size="10" font-family="monospace">< 1,Alice,Engineering,85000</text>
  <text x="35" y="95"  fill="#3fb950" font-size="10" font-family="monospace">> 1,Alice,Engineering,92000</text>
  <text x="35" y="115" fill="#8b949e" font-size="10">Shows what CHANGED between two versions</text>
  <text x="35" y="130" fill="#8b949e" font-size="9">Use for: comparing file versions, configs, code</text>

  <rect x="365" y="38" width="295" height="98" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <text x="512" y="60" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">comm — Set Operations</text>
  <text x="380" y="80"  fill="#f85149" font-size="10" font-family="monospace">col1: only in file1</text>
  <text x="380" y="95"  fill="#3fb950" font-size="10" font-family="monospace">     col2: only in file2</text>
  <text x="380" y="110" fill="#d29922" font-size="10" font-family="monospace">           col3: in both</text>
  <text x="380" y="130" fill="#8b949e" font-size="9">Use for: set intersection/difference on sorted lists</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 7 — diff & comm: File Comparison</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── diff ────────────────────────────────────────────────</span>
$ <span style="color:#3fb950;">diff config_old.yml config_new.yml</span>
3c3
< port: 5432         <span style="color:#f85149;">← OLD line (removed)</span>
---
> port: 5433         <span style="color:#3fb950;">← NEW line (added)</span>
5a6
> timeout: 30        <span style="color:#3fb950;">← line ADDED in new file</span>
<span style="color:#6a9955;"># Reading diff output:
# < = line from FIRST file (old)
# > = line from SECOND file (new)
# 3c3 = line 3 in file1 CHANGED to line 3 in file2
# 5a6 = after line 5 in file1, line 6 ADDED in file2
# 3d2 = line 3 in file1 DELETED (not in file2)</span>

<span style="color:#6a9955;"># diff -u  ─ unified format (standard for code review/patches)</span>
$ <span style="color:#3fb950;">diff -u config_old.yml config_new.yml</span>
--- config_old.yml  2024-03-09 10:00:00
+++ config_new.yml  2024-03-10 08:00:00
@@ -1,6 +1,7 @@
 host: localhost
 database: production
-port: 5432
+port: 5433
 user: ravi
 password: secret
+timeout: 30
<span style="color:#6a9955;">← - = removed line (was in old, not in new)
← + = added line (not in old, in new)
← lines without - or + = unchanged context
← This is the format used by git diff!</span>

<span style="color:#6a9955;"># diff -y  ─ side-by-side comparison</span>
$ <span style="color:#3fb950;">diff -y config_old.yml config_new.yml</span>
host: localhost         host: localhost
database: production    database: production
port: 5432            | port: 5433         <span style="color:#d29922;">← | = changed</span>
user: ravi              user: ravi
password: secret        password: secret
                      > timeout: 30        <span style="color:#3fb950;">← > = added</span>
<span style="color:#6a9955;">← | = line changed, > = added, < = removed
← Much more readable than standard diff for humans</span>

<span style="color:#6a9955;"># diff -i  ─ ignore case differences</span>
$ <span style="color:#3fb950;">diff -i file1.txt file2.txt</span>

<span style="color:#6a9955;"># diff -w  ─ ignore whitespace differences</span>
$ <span style="color:#3fb950;">diff -w script_v1.py script_v2.py</span>
<span style="color:#6a9955;">← Ignores tab vs space, indentation changes
← Great for comparing Python files where only logic changed</span>

<span style="color:#6a9955;"># diff -q  ─ quiet (just say whether files differ)</span>
$ <span style="color:#3fb950;">diff -q output_today.csv output_yesterday.csv</span>
Files output_today.csv and output_yesterday.csv differ
<span style="color:#3fb950;"># OR: (no output = identical!)</span>
<span style="color:#6a9955;">← Perfect for scripts: check if files are same without showing diff</span>

<span style="color:#6a9955;"># diff -r  ─ compare entire directories recursively</span>
$ <span style="color:#3fb950;">diff -r config_backup/ config_current/</span>
Only in config_current/: new_feature.yml
diff -r config_backup/database.yml config_current/database.yml
3c3
< host: staging-db
---
> host: prod-db
<span style="color:#6a9955;">← Compare two config directories — find all changes between deploys!</span>

<span style="color:#6a9955;"># ── comm ─ set operations on sorted files ───────────────</span>
<span style="color:#6a9955;"># comm requires SORTED files (use sort first!)</span>
$ sort customers_jan.txt > /tmp/jan_sorted.txt
$ sort customers_feb.txt > /tmp/feb_sorted.txt

$ <span style="color:#3fb950;">comm /tmp/jan_sorted.txt /tmp/feb_sorted.txt</span>
CUST001            <span style="color:#6a9955;">← only in jan (churned customers)</span>
CUST003
         CUST008   <span style="color:#6a9955;">← only in feb (new customers)</span>
         CUST015
                  CUST002   <span style="color:#6a9955;">← in both (retained customers)</span>
                  CUST006
<span style="color:#6a9955;"># Column 1: only in file1 | Column 2: only in file2 | Column 3: in both</span>

<span style="color:#6a9955;"># comm -12  ─ show ONLY lines in BOTH files (intersection)</span>
$ <span style="color:#3fb950;">comm -12 /tmp/jan_sorted.txt /tmp/feb_sorted.txt</span>
CUST002    <span style="color:#6a9955;">← customers who appear in BOTH months (retained!)</span>
CUST006
<span style="color:#6a9955;">← -1 suppresses column 1, -2 suppresses column 2
← -12 = suppress both = show only column 3 (intersection)</span>

<span style="color:#6a9955;"># comm -23  ─ lines ONLY in file1 (set difference)</span>
$ <span style="color:#3fb950;">comm -23 /tmp/jan_sorted.txt /tmp/feb_sorted.txt</span>
CUST001    <span style="color:#6a9955;">← customers who LEFT (in jan, not in feb = churned!)</span>
CUST003

<span style="color:#6a9955;"># comm -13  ─ lines ONLY in file2</span>
$ <span style="color:#3fb950;">comm -13 /tmp/jan_sorted.txt /tmp/feb_sorted.txt</span>
CUST008    <span style="color:#6a9955;">← NEW customers (in feb, not in jan)</span>
CUST015</pre>
</div>

<div class="tip-box" style="margin-top:12px;">
  <strong>💡 Data Engineering Gold — comm for Cohort Analysis:</strong> <code>comm -12 list_a list_b</code> gives you the intersection (retained users), <code>comm -23</code> gives churned users, <code>comm -13</code> gives new users. This is cohort analysis in 3 shell commands — no Pandas required for quick checks.
</div>`
},

// ════════════════════════════════════════════════════════════
// COMMAND DECISION TABLE
// ════════════════════════════════════════════════════════════
{
id: "decision-guide",
title: "The Master Decision Guide — Which Command to Use When",
content: `
<p>After learning all these commands, the skill is choosing the <strong>right tool for the right job</strong>. Here's the complete decision guide:</p>

<!-- MASTER DECISION SVG -->
<div class="visual-container">
<svg width="700" height="380" viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="380" fill="#0d1117" rx="12"/>
  <text x="350" y="24" fill="#e6edf3" font-size="14" font-weight="bold" text-anchor="middle">The Viewing &amp; Searching Decision Tree</text>

  <!-- Root question -->
  <rect x="240" y="38" width="220" height="36" rx="8" fill="#21262d" stroke="#58a6ff" stroke-width="2"/>
  <text x="350" y="61" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">What do you need?</text>

  <!-- Branch 1: Read a file -->
  <line x1="270" y1="74" x2="100" y2="110" stroke="#3fb950" stroke-width="1.5"/>
  <rect x="20" y="110" width="160" height="32" rx="6" fill="#0f2a0f" stroke="#3fb950"/>
  <text x="100" y="131" fill="#3fb950" font-size="10" font-weight="bold" text-anchor="middle">Read file contents</text>
  <!-- Sub-answers -->
  <line x1="60"  y1="142" x2="60"  y2="165" stroke="#3fb950" stroke-width="1"/>
  <rect x="15"   y="165" width="90" height="28" rx="5" fill="#161b22" stroke="#3fb950"/>
  <text x="60"   y="183" fill="#e6edf3" font-size="10" text-anchor="middle">small: cat</text>
  <line x1="120" y1="142" x2="120" y2="165" stroke="#3fb950" stroke-width="1"/>
  <rect x="75"   y="165" width="90" height="28" rx="5" fill="#161b22" stroke="#3fb950"/>
  <text x="120"  y="183" fill="#e6edf3" font-size="10" text-anchor="middle">large: less</text>
  <line x1="60"  y1="193" x2="60"  y2="216" stroke="#3fb950" stroke-width="1"/>
  <rect x="15"   y="216" width="90" height="28" rx="5" fill="#161b22" stroke="#3fb950"/>
  <text x="60"   y="234" fill="#e6edf3" font-size="10" text-anchor="middle">reversed: tac</text>

  <!-- Branch 2: Partial view -->
  <line x1="310" y1="74" x2="220" y2="110" stroke="#d29922" stroke-width="1.5"/>
  <rect x="148" y="110" width="148" height="32" rx="6" fill="#1f1a0a" stroke="#d29922"/>
  <text x="222" y="131" fill="#d29922" font-size="10" font-weight="bold" text-anchor="middle">Peek at beginning/end</text>
  <line x1="185" y1="142" x2="185" y2="165" stroke="#d29922" stroke-width="1"/>
  <rect x="143" y="165" width="84" height="28" rx="5" fill="#161b22" stroke="#d29922"/>
  <text x="185"  y="183" fill="#e6edf3" font-size="10" text-anchor="middle">top: head -N</text>
  <line x1="258" y1="142" x2="258" y2="165" stroke="#d29922" stroke-width="1"/>
  <rect x="216" y="165" width="84" height="28" rx="5" fill="#161b22" stroke="#d29922"/>
  <text x="258"  y="183" fill="#e6edf3" font-size="10" text-anchor="middle">bottom: tail -N</text>
  <line x1="222" y1="193" x2="222" y2="216" stroke="#f85149" stroke-width="1"/>
  <rect x="170"  y="216" width="104" height="28" rx="5" fill="#2a0d0d" stroke="#f85149"/>
  <text x="222"  y="234" fill="#f85149" font-size="10" text-anchor="middle">live: tail -f / -F</text>

  <!-- Branch 3: Search -->
  <line x1="390" y1="74" x2="430" y2="110" stroke="#f85149" stroke-width="1.5"/>
  <rect x="358" y="110" width="144" height="32" rx="6" fill="#2a0d0d" stroke="#f85149"/>
  <text x="430" y="131" fill="#f85149" font-size="10" font-weight="bold" text-anchor="middle">Search / Find</text>
  <line x1="395" y1="142" x2="380" y2="165" stroke="#f85149" stroke-width="1"/>
  <rect x="330" y="165" width="100" height="28" rx="5" fill="#161b22" stroke="#f85149"/>
  <text x="380"  y="183" fill="#e6edf3" font-size="10" text-anchor="middle">in file: grep</text>
  <line x1="468" y1="142" x2="480" y2="165" stroke="#f85149" stroke-width="1"/>
  <rect x="432" y="165" width="96" height="28" rx="5" fill="#161b22" stroke="#f85149"/>
  <text x="480"  y="183" fill="#e6edf3" font-size="10" text-anchor="middle">by name: find</text>
  <line x1="380" y1="193" x2="370" y2="216" stroke="#f85149" stroke-width="1"/>
  <rect x="314"  y="216" width="112" height="28" rx="5" fill="#161b22" stroke="#f85149"/>
  <text x="370"  y="234" fill="#e6edf3" font-size="10" text-anchor="middle">quick name: locate</text>

  <!-- Branch 4: Sort/Dedup/Compare -->
  <line x1="460" y1="74" x2="590" y2="110" stroke="#bc8cff" stroke-width="1.5"/>
  <rect x="518" y="110" width="162" height="32" rx="6" fill="#1a0f2a" stroke="#bc8cff"/>
  <text x="599" y="131" fill="#bc8cff" font-size="10" font-weight="bold" text-anchor="middle">Order / Compare</text>
  <line x1="555" y1="142" x2="540" y2="165" stroke="#bc8cff" stroke-width="1"/>
  <rect x="488"  y="165" width="104" height="28" rx="5" fill="#161b22" stroke="#bc8cff"/>
  <text x="540"  y="183" fill="#e6edf3" font-size="10" text-anchor="middle">order: sort</text>
  <line x1="640" y1="142" x2="642" y2="165" stroke="#bc8cff" stroke-width="1"/>
  <rect x="596"  y="165" width="88" height="28" rx="5" fill="#161b22" stroke="#bc8cff"/>
  <text x="640"  y="183" fill="#e6edf3" font-size="10" text-anchor="middle">dedup: uniq</text>
  <line x1="540" y1="193" x2="530" y2="216" stroke="#58a6ff" stroke-width="1"/>
  <rect x="478"  y="216" width="104" height="28" rx="5" fill="#161b22" stroke="#58a6ff"/>
  <text x="530"  y="234" fill="#e6edf3" font-size="10" text-anchor="middle">changes: diff</text>
  <line x1="642" y1="193" x2="645" y2="216" stroke="#58a6ff" stroke-width="1"/>
  <rect x="596"  y="216" width="96" height="28" rx="5" fill="#161b22" stroke="#58a6ff"/>
  <text x="644"  y="234" fill="#e6edf3" font-size="10" text-anchor="middle">sets: comm</text>

  <!-- Ravi's pipeline -->
  <rect x="15" y="270" width="670" height="98" rx="8" fill="#1a1a2e" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="350" y="290" fill="#bc8cff" font-size="11" font-weight="bold" text-anchor="middle">🔗 Ravi's 2:47 AM Pipeline — All Commands Working Together</text>
  <text x="30"  y="310" fill="#3fb950" font-size="10" font-family="monospace">tail -f pipeline.log</text>
  <text x="175" y="310" fill="#d29922" font-size="14">|</text>
  <text x="185" y="310" fill="#58a6ff" font-size="10" font-family="monospace">grep -E "ERROR|FATAL"</text>
  <text x="355" y="310" fill="#d29922" font-size="14">|</text>
  <text x="365" y="310" fill="#bc8cff" font-size="10" font-family="monospace">awk '{print $5}'</text>
  <text x="490" y="310" fill="#d29922" font-size="14">|</text>
  <text x="500" y="310" fill="#f85149" font-size="10" font-family="monospace">sort | uniq -c | sort -rn</text>
  <text x="30"  y="330" fill="#8b949e" font-size="9">Watch live log</text>
  <text x="185" y="330" fill="#8b949e" font-size="9">Filter errors only</text>
  <text x="350" y="330" fill="#8b949e" font-size="9">Extract field</text>
  <text x="500" y="330" fill="#8b949e" font-size="9">Frequency analysis</text>
  <text x="350" y="355" fill="#d29922" font-size="10" text-anchor="middle">→ Top errors ranked by frequency, updating live, in real time</text>
</svg>
</div>

<table class="comparison-table" style="margin-top:16px;">
  <thead><tr><th>Task</th><th>Best Command</th><th>Why</th></tr></thead>
  <tbody>
    <tr><td>Read a small file</td><td><code>cat</code></td><td>Simple, instant output</td></tr>
    <tr><td>Read a large file</td><td><code>less</code></td><td>Doesn't load into RAM, navigable</td></tr>
    <tr><td>Check CSV header</td><td><code>head -1</code></td><td>Instant, no loading</td></tr>
    <tr><td>Watch live log</td><td><code>tail -f</code></td><td>Streams new lines as written</td></tr>
    <tr><td>Skip CSV header in pipeline</td><td><code>tail -n +2</code></td><td>Start-from-line syntax</td></tr>
    <tr><td>Search inside files</td><td><code>grep</code></td><td>Pattern matching on content</td></tr>
    <tr><td>Find files by size/date/name</td><td><code>find</code></td><td>Filesystem attribute search</td></tr>
    <tr><td>Quick file name lookup</td><td><code>locate</code></td><td>Instant (pre-indexed database)</td></tr>
    <tr><td>Sort CSV by column</td><td><code>sort -t',' -k N</code></td><td>Field-based sort</td></tr>
    <tr><td>Count occurrences of values</td><td><code>sort | uniq -c | sort -rn</code></td><td>Frequency analysis pipeline</td></tr>
    <tr><td>Find duplicate records</td><td><code>sort | uniq -d</code></td><td>Shows only repeated lines</td></tr>
    <tr><td>Compare file versions</td><td><code>diff -u</code></td><td>Unified format, shows changes</td></tr>
    <tr><td>Set intersection/difference</td><td><code>comm -12 / -23</code></td><td>Column-based set operations</td></tr>
    <tr><td>Debug invisible characters</td><td><code>cat -A</code></td><td>Shows tabs, carriage returns</td></tr>
  </tbody>
</table>`
}

], // end sections

// ════════════════════════════════════════════════════════════
// PRACTICE EXERCISES
// ════════════════════════════════════════════════════════════
practiceExercises: [
  {
    id: "view-ex1",
    difficulty: "Easy",
    title: "CSV Inspector",
    description: "Given a CSV file, write commands to: (1) check the header without opening the full file, (2) see the last 5 data rows, (3) count total rows excluding the header, (4) check if any lines have invisible/special characters.",
    starterCode: `#!/bin/bash
# Setup: create sample CSV
cat > employees.csv << 'EOF'
id,name,department,salary
1,Alice,Engineering,85000
2,Bob,Marketing,62000
3,Charlie,Engineering,91000
4,Diana,HR,58000
5,Eve,Engineering,88000
EOF

echo "1. Header only:"
???                        # show first line only

echo ""
echo "2. Last 5 data rows:"
???                        # show last 5 lines

echo ""
echo "3. Total data rows (excluding header):"
???                        # count lines minus header

echo ""
echo "4. Check for special characters:"
???                        # reveal hidden chars`,
    solution: `#!/bin/bash
cat > employees.csv << 'EOF'
id,name,department,salary
1,Alice,Engineering,85000
2,Bob,Marketing,62000
3,Charlie,Engineering,91000
4,Diana,HR,58000
5,Eve,Engineering,88000
EOF

echo "1. Header only:"
head -1 employees.csv

echo ""
echo "2. Last 5 data rows:"
tail -5 employees.csv

echo ""
echo "3. Total data rows (excluding header):"
tail -n +2 employees.csv | wc -l

echo ""
echo "4. Check for special characters:"
cat -A employees.csv`,
    explanation: "head -1 reads only the first line — instant schema check. tail -n +2 starts from line 2 (skips header) — piped to wc -l gives exact data row count. cat -A reveals ^I (tabs), ^M (Windows CR), and trailing spaces that would silently break parsing."
  },
  {
    id: "view-ex2",
    difficulty: "Easy",
    title: "Log Detective",
    description: "A production log file contains mixed INFO, DEBUG, WARNING, and ERROR entries. Write grep commands to: (1) count total errors, (2) find errors with their line numbers, (3) show 5 lines of context around errors, (4) extract only ERROR lines to a new file.",
    starterCode: `#!/bin/bash
# Create sample log
cat > app.log << 'EOF'
[INFO]  2024-03-10 08:00:01 Pipeline started
[INFO]  2024-03-10 08:00:02 Connecting to database
[DEBUG] 2024-03-10 08:00:03 Query: SELECT * FROM customers
[INFO]  2024-03-10 08:00:04 Connection established
[DEBUG] 2024-03-10 08:00:05 Fetched 1000 rows
[WARNING] 2024-03-10 08:00:06 Memory usage at 78%
[INFO]  2024-03-10 08:00:07 Processing batch 1
[ERROR] 2024-03-10 08:00:08 Database timeout after 30s
[ERROR] 2024-03-10 08:00:09 Retry 1/3 failed
[INFO]  2024-03-10 08:00:10 Retry 2/3 succeeded
[INFO]  2024-03-10 08:00:11 Pipeline completed
EOF

echo "1. Total ERROR count:"
???

echo ""
echo "2. ERROR lines with line numbers:"
???

echo ""
echo "3. Each ERROR with 2 lines of context:"
???

echo "4. Save only ERROR lines to errors_only.log:"
???
wc -l errors_only.log`,
    solution: `#!/bin/bash
cat > app.log << 'EOF'
[INFO]  2024-03-10 08:00:01 Pipeline started
[INFO]  2024-03-10 08:00:02 Connecting to database
[DEBUG] 2024-03-10 08:00:03 Query: SELECT * FROM customers
[INFO]  2024-03-10 08:00:04 Connection established
[DEBUG] 2024-03-10 08:00:05 Fetched 1000 rows
[WARNING] 2024-03-10 08:00:06 Memory usage at 78%
[INFO]  2024-03-10 08:00:07 Processing batch 1
[ERROR] 2024-03-10 08:00:08 Database timeout after 30s
[ERROR] 2024-03-10 08:00:09 Retry 1/3 failed
[INFO]  2024-03-10 08:00:10 Retry 2/3 succeeded
[INFO]  2024-03-10 08:00:11 Pipeline completed
EOF

echo "1. Total ERROR count:"
grep -c "ERROR" app.log

echo ""
echo "2. ERROR lines with line numbers:"
grep -n "ERROR" app.log

echo ""
echo "3. Each ERROR with 2 lines of context:"
grep -C 2 "ERROR" app.log

echo "4. Save only ERROR lines to errors_only.log:"
grep "ERROR" app.log > errors_only.log
wc -l errors_only.log`,
    explanation: "grep -c counts without showing content — perfect for 'how bad is it?' assessments. grep -n gives line numbers so you can jump directly with vim +8 app.log. grep -C 2 shows 2 lines on each side — seeing the WARNING before an ERROR often reveals the cause. The > redirect silently creates a new filtered log file."
  },
  {
    id: "view-ex3",
    difficulty: "Medium",
    title: "Frequency Analyst",
    description: "Given an Apache access log, use sort and uniq to: (1) find the top 5 most requested URLs, (2) find the top 3 IP addresses, (3) count requests per HTTP status code, (4) find all unique user agents.",
    starterCode: `#!/bin/bash
# Create sample access log (Apache combined format)
cat > access.log << 'EOF'
192.168.1.1 - - [10/Mar/2024:08:00:01] "GET /api/data HTTP/1.1" 200 1234
10.0.0.5    - - [10/Mar/2024:08:00:02] "POST /api/upload HTTP/1.1" 201 567
192.168.1.1 - - [10/Mar/2024:08:00:03] "GET /api/data HTTP/1.1" 200 1234
203.0.113.5 - - [10/Mar/2024:08:00:04] "GET /api/users HTTP/1.1" 403 89
192.168.1.1 - - [10/Mar/2024:08:00:05] "GET /api/data HTTP/1.1" 200 1234
10.0.0.5    - - [10/Mar/2024:08:00:06] "GET /api/users HTTP/1.1" 200 445
203.0.113.5 - - [10/Mar/2024:08:00:07] "GET /api/data HTTP/1.1" 404 12
192.168.1.1 - - [10/Mar/2024:08:00:08] "GET /api/health HTTP/1.1" 200 5
10.0.0.5    - - [10/Mar/2024:08:00:09] "POST /api/upload HTTP/1.1" 500 234
192.168.1.1 - - [10/Mar/2024:08:00:10] "GET /api/data HTTP/1.1" 200 1234
EOF

echo "=== Top 5 Most Requested URLs ==="
# Extract field 7 (the URL), sort, count, sort by count desc
awk '{print ???}' access.log | ??? | ??? | ???

echo ""
echo "=== Top 3 IP Addresses ==="
awk '{print ???}' access.log | sort | uniq -c | ??? | ???

echo ""
echo "=== Requests per Status Code ==="
awk '{print ???}' access.log | sort | uniq -c | sort -rn

echo ""
echo "=== Count of Unique URLs ==="
awk '{print $7}' access.log | sort -u | wc -l`,
    solution: `#!/bin/bash
cat > access.log << 'EOF'
192.168.1.1 - - [10/Mar/2024:08:00:01] "GET /api/data HTTP/1.1" 200 1234
10.0.0.5    - - [10/Mar/2024:08:00:02] "POST /api/upload HTTP/1.1" 201 567
192.168.1.1 - - [10/Mar/2024:08:00:03] "GET /api/data HTTP/1.1" 200 1234
203.0.113.5 - - [10/Mar/2024:08:00:04] "GET /api/users HTTP/1.1" 403 89
192.168.1.1 - - [10/Mar/2024:08:00:05] "GET /api/data HTTP/1.1" 200 1234
10.0.0.5    - - [10/Mar/2024:08:00:06] "GET /api/users HTTP/1.1" 200 445
203.0.113.5 - - [10/Mar/2024:08:00:07] "GET /api/data HTTP/1.1" 404 12
192.168.1.1 - - [10/Mar/2024:08:00:08] "GET /api/health HTTP/1.1" 200 5
10.0.0.5    - - [10/Mar/2024:08:00:09] "POST /api/upload HTTP/1.1" 500 234
192.168.1.1 - - [10/Mar/2024:08:00:10] "GET /api/data HTTP/1.1" 200 1234
EOF

echo "=== Top 5 Most Requested URLs ==="
awk '{print $7}' access.log | sort | uniq -c | sort -rn | head -5

echo ""
echo "=== Top 3 IP Addresses ==="
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -3

echo ""
echo "=== Requests per Status Code ==="
awk '{print $9}' access.log | sort | uniq -c | sort -rn

echo ""
echo "=== Count of Unique URLs ==="
awk '{print $7}' access.log | sort -u | wc -l`,
    explanation: "The sort | uniq -c | sort -rn pattern is the most powerful data analysis pipeline in shell. awk '{print $N}' extracts column N (space-separated). sort groups identical values together, uniq -c counts them, sort -rn puts the highest count first. This 4-command pipeline replaces dozens of lines of Python for frequency analysis."
  },
  {
    id: "view-ex4",
    difficulty: "Medium",
    title: "File System Detective",
    description: "Use find to solve real server problems: (1) find all log files larger than 50MB, (2) find Python files modified today, (3) find world-writable files (security audit), (4) find and list files that haven't been accessed in 30 days.",
    starterCode: `#!/bin/bash
# Setup: create test directory structure
mkdir -p ~/find_test/{logs,scripts,data,config}
touch ~/find_test/logs/app.log
touch ~/find_test/logs/old.log
touch ~/find_test/scripts/etl.py
touch ~/find_test/scripts/utils.py
touch ~/find_test/data/customers.csv
touch ~/find_test/config/settings.yml
chmod 777 ~/find_test/config/settings.yml  # intentionally insecure!

echo "1. Find all Python files:"
find ~/find_test ???              # search for .py files

echo ""
echo "2. Find files modified in last 1 day:"
find ~/find_test ???              # by modification time

echo ""
echo "3. SECURITY: Find world-writable files:"
find ~/find_test ???              # by permissions

echo ""
echo "4. Find empty files:"
find ~/find_test ???              # empty files

echo ""
echo "5. Find files and show their sizes:"
find ~/find_test -type f -exec ls -lh {} \; | awk '{print $5, $NF}'`,
    solution: `#!/bin/bash
mkdir -p ~/find_test/{logs,scripts,data,config}
touch ~/find_test/logs/app.log
touch ~/find_test/logs/old.log
touch ~/find_test/scripts/etl.py
touch ~/find_test/scripts/utils.py
touch ~/find_test/data/customers.csv
touch ~/find_test/config/settings.yml
chmod 777 ~/find_test/config/settings.yml

echo "1. Find all Python files:"
find ~/find_test -name "*.py"

echo ""
echo "2. Find files modified in last 1 day:"
find ~/find_test -mtime -1 -type f

echo ""
echo "3. SECURITY: Find world-writable files:"
find ~/find_test -perm /o+w -type f

echo ""
echo "4. Find empty files:"
find ~/find_test -empty -type f

echo ""
echo "5. Find files and show their sizes:"
find ~/find_test -type f -exec ls -lh {} \; | awk '{print $5, $NF}'`,
    explanation: "find -perm /o+w is critical for security audits — world-writable files can be modified by any user, which is dangerous for config files. The /o+w syntax means 'any of these permission bits are set for others'. The -exec ls -lh {} \; pattern lets you run any command on every found file — here we get human-readable sizes."
  },
  {
    id: "view-ex5",
    difficulty: "Hard",
    title: "Production Incident Analyzer",
    description: "Simulate Ravi's 2:47 AM incident. Given a multi-service log file, write a complete analysis script that: (1) counts errors by type, (2) finds the first and last error timestamps, (3) identifies which service had the most errors, (4) generates a diff between yesterday's and today's error counts, (5) finds customer IDs that appear in both the failed list and VIP list.",
    starterCode: `#!/bin/bash
# Create simulated production logs
cat > pipeline.log << 'EOF'
[2024-03-10 02:00:01] [etl-service]  INFO  Processing started
[2024-03-10 02:10:15] [api-service]  ERROR ConnectionTimeout: DB unreachable
[2024-03-10 02:10:18] [etl-service]  ERROR BatchFailed: customer_id=C1042
[2024-03-10 02:10:20] [api-service]  ERROR ConnectionTimeout: DB unreachable
[2024-03-10 02:11:00] [etl-service]  ERROR BatchFailed: customer_id=C1099
[2024-03-10 02:11:30] [ml-service]   WARN  MemoryHigh: 89% used
[2024-03-10 02:12:00] [api-service]  ERROR ConnectionTimeout: DB unreachable
[2024-03-10 02:12:45] [etl-service]  ERROR BatchFailed: customer_id=C2031
[2024-03-10 02:15:00] [api-service]  INFO  Connection restored
[2024-03-10 02:15:30] [etl-service]  INFO  Processing resumed
EOF

cat > yesterday_errors.txt << 'EOF'
3 ConnectionTimeout
1 BatchFailed
EOF

cat > vip_customers.txt << 'EOF'
C1042
C2200
C3100
C1099
EOF

echo "═══════ INCIDENT REPORT ═══════"

echo ""
echo "1. Error count by type:"
grep "ERROR" pipeline.log | ???    # extract error type, count frequency

echo ""
echo "2. First and last error timestamp:"
echo "First:" && grep "ERROR" pipeline.log | head -1 | awk '{print $1, $2}'
echo "Last:"  && grep "ERROR" pipeline.log | ??? | awk '{print $1, $2}'

echo ""
echo "3. Which service had the most errors?"
grep "ERROR" pipeline.log | ???   # extract service name, count

echo ""
echo "4. Error count change from yesterday:"
grep "ERROR" pipeline.log | awk '{print $NF}' | cut -d: -f1 | sort | uniq -c | sort -rn > today_errors.txt
diff yesterday_errors.txt today_errors.txt

echo ""
echo "5. VIP customers in the failed batch:"
grep "BatchFailed" pipeline.log | grep -o "C[0-9]*" | sort > /tmp/failed.txt
sort vip_customers.txt > /tmp/vip_sorted.txt
comm -12 /tmp/failed.txt /tmp/vip_sorted.txt`,
    solution: `#!/bin/bash
cat > pipeline.log << 'EOF'
[2024-03-10 02:00:01] [etl-service]  INFO  Processing started
[2024-03-10 02:10:15] [api-service]  ERROR ConnectionTimeout: DB unreachable
[2024-03-10 02:10:18] [etl-service]  ERROR BatchFailed: customer_id=C1042
[2024-03-10 02:10:20] [api-service]  ERROR ConnectionTimeout: DB unreachable
[2024-03-10 02:11:00] [etl-service]  ERROR BatchFailed: customer_id=C1099
[2024-03-10 02:11:30] [ml-service]   WARN  MemoryHigh: 89% used
[2024-03-10 02:12:00] [api-service]  ERROR ConnectionTimeout: DB unreachable
[2024-03-10 02:12:45] [etl-service]  ERROR BatchFailed: customer_id=C2031
[2024-03-10 02:15:00] [api-service]  INFO  Connection restored
[2024-03-10 02:15:30] [etl-service]  INFO  Processing resumed
EOF
cat > yesterday_errors.txt << 'EOF'
3 ConnectionTimeout
1 BatchFailed
EOF
cat > vip_customers.txt << 'EOF'
C1042
C2200
C3100
C1099
EOF

echo "═══════ INCIDENT REPORT ═══════"

echo ""
echo "1. Error count by type:"
grep "ERROR" pipeline.log | awk '{print $NF}' | cut -d: -f1 | sort | uniq -c | sort -rn

echo ""
echo "2. First and last error timestamp:"
echo "First:" && grep "ERROR" pipeline.log | head -1 | awk '{print $1, $2}'
echo "Last:"  && grep "ERROR" pipeline.log | tail -1 | awk '{print $1, $2}'

echo ""
echo "3. Which service had the most errors?"
grep "ERROR" pipeline.log | awk '{print $3}' | sort | uniq -c | sort -rn

echo ""
echo "4. Error count change from yesterday:"
grep "ERROR" pipeline.log | awk '{print $NF}' | cut -d: -f1 | sort | uniq -c | sort -rn > today_errors.txt
diff yesterday_errors.txt today_errors.txt

echo ""
echo "5. VIP customers in the failed batch:"
grep "BatchFailed" pipeline.log | grep -o "C[0-9]*" | sort > /tmp/failed.txt
sort vip_customers.txt > /tmp/vip_sorted.txt
comm -12 /tmp/failed.txt /tmp/vip_sorted.txt`,
    explanation: "This is a real incident analysis script. Key patterns: (1) awk+cut+sort+uniq -c chains extract and count structured data. (2) grep | head/tail -1 finds first/last events. (3) grep -o with regex extracts ONLY the matching pattern (customer IDs). (4) comm -12 on sorted files gives intersection — VIPs who are also in the failed list. This exact workflow is used in production on-call rotations worldwide."
  }
],

// ════════════════════════════════════════════════════════════
// SUMMARY
// ════════════════════════════════════════════════════════════
summary: `
<div style="background:#0d1117;border:1px solid #30363d;border-radius:10px;padding:20px;">
  <h3 style="color:#bc8cff;margin-top:0;">📚 What Ravi Learned That Night — Your Complete Reference</h3>

  <div class="cards-grid">
    <div class="mini-card">
      <strong style="color:#3fb950;">📄 cat / tac</strong>
      <p><code>cat -A</code> reveals hidden chars. <code>cat f1 f2 > merged</code> concatenates. <code>tac</code> reverses lines. Never cat huge files — use less.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#58a6ff;">📌 head / tail</strong>
      <p><code>head -1</code> = schema check. <code>tail -n +2</code> = skip header. <code>tail -f</code> = live log watch. <code>tail -F</code> = survives log rotation.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#d29922;">🔍 grep</strong>
      <p><code>-i</code> case-insensitive. <code>-n</code> line numbers. <code>-C N</code> context. <code>-r</code> recursive. <code>-o</code> extract match only. <code>-E</code> for OR patterns.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#f85149;">🗂️ find</strong>
      <p><code>-name "*.csv"</code> by name. <code>-size +1G</code> by size. <code>-mtime -1</code> recent files. <code>-exec cmd {} \;</code> act on results.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#bc8cff;">📊 sort / uniq</strong>
      <p>Always <code>sort</code> before <code>uniq</code>. Use <code>-n</code> for numbers. <code>uniq -c</code> counts. The <code>sort | uniq -c | sort -rn</code> pipeline = frequency analysis.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#3fb950;">⚖️ diff / comm</strong>
      <p><code>diff -u</code> = unified (git style). <code>diff -y</code> = side by side. <code>comm -12</code> = intersection. <code>comm -23</code> = only in file1.</p>
    </div>
  </div>

  <div style="background:#0d1117;border:1px solid #bc8cff;border-radius:8px;padding:16px;margin-top:16px;">
    <strong style="color:#bc8cff;">🏆 The Power Pipeline — Ravi's Incident Command:</strong>
    <div class="terminal-block" style="margin-top:10px;">
      <div class="terminal-header">
        <span class="terminal-dot" style="background:#ff5f56"></span>
        <span class="terminal-dot" style="background:#ffbd2e"></span>
        <span class="terminal-dot" style="background:#27c93f"></span>
      </div>
      <pre style="color:#e6edf3;padding:12px;margin:0;background:#000a00;font-family:'JetBrains Mono',monospace;font-size:12px;">tail -f /var/log/etl/pipeline.log | grep --line-buffered -E "ERROR|FATAL" | \
  tee errors_live.log | awk '{print $5}' | sort | uniq -c | sort -rn

<span style="color:#6a9955;">↑ Live stream │ Filter errors │ Save to file │ Extract type │ Rank by frequency</span></pre>
    </div>
  </div>

  <div style="margin-top:16px;text-align:center;">
    <span style="color:#8b949e;font-size:13px;">Next Module: </span>
    <strong style="color:#bc8cff;">Compression & Archives — gzip, tar, zip ➡️</strong>
  </div>
</div>`

}; // end var viewing