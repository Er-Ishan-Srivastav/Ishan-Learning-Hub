
var nano = {
    title: "GNU Nano — The Friendly Terminal Editor",
    description: "Master GNU Nano completely — from first open to advanced config, macros, syntax highlighting, and scripting. The editor that just works on every Linux system, perfect for quick edits, config files, and server-side work.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body" >
    <div style="flex:1;min-width:220px;">
      <h3 style="margin:0 0 8px;color:#ce93d8;">Ravi's Quick Fix — Day 71 </h3>
      <p>Ravi had just finished mastering Vim when his new team-mate Preethi sat next to him. She needed to edit a cron job on the server — quickly. 
      She typed <code>nano /etc/cron.d/data-pipeline</code>, made her change, pressed <code>Ctrl+O</code> to save, <code>Enter</code> to confirm, <code>Ctrl+X</code> to exit. 
      Done in 40 seconds.</p>
      </br>
      <p>Ravi stared. "That's it? No modes, no colon, no escape key?" Preethi smiled. 
      "Nano is what you use when you just need to fix one line and get out. 
      Every shortcut is shown at the bottom of the screen. No memorisation required."</p>
      </br>
      <p>Ravi realized something important: <strong>different tools for different situations.</strong> Vim for serious editing sessions. 
      Nano for quick server fixes, teaching beginners, and situations where you need an editor that literally explains itself. 
      This module teaches nano completely — not just the basics, but every feature, flag, config option, and power trick.</p>
     
    </div>  
    </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — WHAT IS NANO & WHY IT MATTERS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> What Is Nano & Why Every Linux User Should Know It</h2>

<div class="two-col-grid">
  <div>
    <h3>Nano's Family Tree</h3>
    <div class="table-wrap">
    <table class="ref-table">
    <thead><tr><th>Editor</th><th>Year</th><th>Key Fact</th></tr></thead>
    <tbody>
    <tr><td><code>pico</code></td><td>1989</td><td>Part of Pine email client — simple, shortcut-driven</td></tr>
    <tr><td><code>nano</code></td><td>1999</td><td>GNU clone of pico — free, open-source, improved</td></tr>
    <tr><td><code>nano 2.0</code></td><td>2007</td><td>Regex search, multiple buffers, syntax highlighting</td></tr>
    <tr><td><code>nano 4.0</code></td><td>2019</td><td>Line numbers, smooth scrolling, improved undo</td></tr>
    <tr><td><code>nano 7.0</code></td><td>2022</td><td>Improved mouse support, recording &amp; replaying keystrokes</td></tr>
    </tbody>
    </table>
    </div>
  </div>
  <div>
    <h3>When to Choose Nano</h3>
    <div class="callout-box info-box" style="margin:0;">
      <ul style="margin:0;padding-left:18px;line-height:2.2;font-size:13.5px;color:#e6edf3;">
        <li><strong>Quick server edits</strong> — cron jobs, config files, env vars</li>
        <li><strong>Teaching beginners</strong> — shortcuts visible on screen always</li>
        <li><strong>Scripting</strong> — pipe content in/out of nano easily</li>
        <li><strong>Minimal installs</strong> — ships with Ubuntu, Debian, Raspberry Pi</li>
        <li><strong>No mode confusion</strong> — what you type always appears</li>
        <li><strong>Git commit messages</strong> — many systems default to nano</li>
        <li><strong>Shared team servers</strong> — least surprise for all users</li>
      </ul>
    </div>
  </div>
</div>

<!-- nano vs vim vs gedit differentiator table -->
<h3 style="margin-top:28px;">Nano vs Vim vs gedit — When to Use Which</h3>
<div class="table-wrap">
<table class="ref-table">
<thead>
  <tr>
    <th style="width:24%">Scenario</th>
    <th style="color:#3fb950;">nano</th>
    <th style="color:#bc8cff;">vim</th>
    <th style="color:#58a6ff;">gedit / VS Code</th>
  </tr>
</thead>
<tbody>
<tr>
  <td>Quick cron job fix on server</td>
  <td style="color:#3fb950;">✅ Best choice</td>
  <td style="color:#bc8cff;">Works, overkill</td>
  <td style="color:#f85149;">❌ No GUI on server</td>
</tr>
<tr>
  <td>Edit 2000-line Python ETL</td>
  <td style="color:#ffa657;">⚠ Possible but slow</td>
  <td style="color:#3fb950;">✅ Best choice</td>
  <td style="color:#3fb950;">✅ Good with plugins</td>
</tr>
<tr>
  <td>First day on Linux</td>
  <td style="color:#3fb950;">✅ Best choice</td>
  <td style="color:#f85149;">❌ Steep learning curve</td>
  <td style="color:#3fb950;">✅ Familiar</td>
</tr>
<tr>
  <td>Edit /etc/hosts on server</td>
  <td style="color:#3fb950;">✅ Best choice</td>
  <td style="color:#bc8cff;">Works</td>
  <td style="color:#f85149;">❌ No GUI</td>
</tr>
<tr>
  <td>Record &amp; replay keystrokes</td>
  <td style="color:#ffa657;">⚠ Limited (nano 7+)</td>
  <td style="color:#3fb950;">✅ Powerful macros</td>
  <td style="color:#ffa657;">⚠ Plugin dependent</td>
</tr>
<tr>
  <td>Syntax highlighting</td>
  <td style="color:#3fb950;">✅ Built-in .nanorc</td>
  <td style="color:#3fb950;">✅ Extensive</td>
  <td style="color:#3fb950;">✅ Excellent</td>
</tr>
<tr>
  <td>Works over slow SSH/serial</td>
  <td style="color:#3fb950;">✅ Lightweight</td>
  <td style="color:#3fb950;">✅ Very fast</td>
  <td style="color:#f85149;">❌ Needs X11</td>
</tr>
<tr>
  <td>Multiple files at once</td>
  <td style="color:#3fb950;">✅ Buffers (Alt+&lt; &gt;)</td>
  <td style="color:#3fb950;">✅ Tabs &amp; splits</td>
  <td style="color:#3fb950;">✅ Tabs</td>
</tr>
<tr>
  <td>Available everywhere</td>
  <td style="color:#3fb950;">✅ Most distros</td>
  <td style="color:#ffa657;">⚠ Not always pre-installed</td>
  <td style="color:#f85149;">❌ GUI only</td>
</tr>
</tbody>
</table>
</div>

<!-- Install check -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Installing &amp; Checking Nano Version</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── CHECK IF NANO IS INSTALLED ──────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">which</span> nano
<span class="cb-out">/usr/bin/nano</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">--version</span>
<span class="cb-out"> GNU nano, version 7.2</span>
<span class="cb-out"> (C) 2023 the Free Software Foundation and various contributors</span>
<span class="cb-out"> Compiled options: --enable-utf8 --enable-color</span>

<span class="cb-cmt">## ─── INSTALL ──────────────────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo apt install</span> nano          <span class="cb-cmt"># Ubuntu / Debian / Raspberry Pi</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo yum install</span> nano          <span class="cb-cmt"># CentOS / RHEL (older)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo dnf install</span> nano          <span class="cb-cmt"># Fedora / RHEL 8+</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo pacman -S</span> nano            <span class="cb-cmt"># Arch Linux</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">brew install</span> nano              <span class="cb-cmt"># macOS with Homebrew</span>

<span class="cb-cmt">## ─── CHECK FEATURES COMPILED IN ─────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">--version</span> | grep Compiled
<span class="cb-out"> Compiled options: --enable-utf8 --enable-color --enable-nanorc</span>
<span class="cb-cmt"># --enable-utf8   = handles emoji, Indian scripts, Chinese characters
# --enable-color  = syntax highlighting works
# --enable-nanorc = reads ~/.nanorc configuration file</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — THE NANO SCREEN EXPLAINED
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The Nano Screen — Every Part Explained</h2>

<p>Unlike Vim, nano shows you everything you need to know right on the screen. Understanding each region makes you instantly productive.</p>

<!-- Nano Screen Layout SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <defs>
    <marker id="arr-label" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
      <polygon points="0 0,7 2.5,0 5" fill="#8b949e"/>
    </marker>
  </defs>
  <rect width="820" height="360" fill="#0d1117" rx="12"/>

  <!-- Terminal outer frame -->
  <rect x="20" y="16" width="640" height="320" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>

  <!-- ① Title bar -->
  <rect x="20" y="16" width="640" height="26" rx="8" fill="#1f2937"/>
  <rect x="20" y="30" width="640" height="12" fill="#1f2937"/>
  <text x="340" y="33" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">  GNU nano 7.2          pipeline.py          Modified  </text>

  <!-- ② Edit area -->
  <rect x="20" y="42" width="640" height="232" fill="#0a0e14"/>
  <text x="30" y="60" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  1 </text>
  <text x="55" y="60" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">import</text>
  <text x="96" y="60" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3"> pandas as pd</text>
  <text x="30" y="76" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  2 </text>
  <text x="55" y="76" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">import</text>
  <text x="96" y="76" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3"> os</text>
  <text x="30" y="92" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  3 </text>
  <text x="30" y="108" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  4 </text>
  <text x="55" y="108" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">def</text>
  <text x="75" y="108" font-family="'Courier New',monospace" font-size="11" fill="#ffa657"> load_data</text>
  <text x="140" y="108" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">(path):</text>
  <!-- Cursor on line 5 -->
  <text x="30" y="124" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  5 </text>
  <text x="55" y="124" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">    df = pd.read_csv(path)</text>
  <rect x="218" y="112" width="7" height="14" fill="#e6edf3" opacity="0.9"/>
  <text x="30" y="140" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  6 </text>
  <text x="55" y="140" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">    return</text>
  <text x="109" y="140" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3"> df</text>
  <text x="30" y="156" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  7 </text>
  <text x="30" y="172" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">  8 </text>
  <text x="55" y="172" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">def</text>
  <text x="75" y="172" font-family="'Courier New',monospace" font-size="11" fill="#ffa657"> save_data</text>
  <text x="140" y="172" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">(df, path):</text>

  <!-- ③ Status bar -->
  <rect x="20" y="274" width="640" height="20" fill="#1f2937"/>
  <text x="30" y="288" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">[ Opened file pipeline.py ]</text>

  <!-- ④ Shortcut bar row 1 -->
  <rect x="20" y="294" width="640" height="20" fill="#0f1319"/>
  <text x="30" y="308" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">^G Help    ^O Write Out  ^W Where Is  ^K Cut    ^T Execute  ^C Location</text>

  <!-- ⑤ Shortcut bar row 2 -->
  <rect x="20" y="314" width="640" height="22" rx="0" fill="#0f1319"/>
  <rect x="20" y="326" width="640" height="10" rx="0" fill="#0f1319" style="border-radius:0 0 8px 8px;"/>
  <text x="30" y="328" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">^X Exit    ^R Read File  ^\ Replace   ^U Paste   ^J Justify  ^/ Go To Line</text>

  <!-- LABELS on the right -->
  <!-- Title bar label -->
  <line x1="662" y1="29" x2="690" y2="29" stroke="#ffa657" stroke-width="1.2" marker-end="url(#arr-label)"/>
  <rect x="691" y="18" width="118" height="22" rx="4" fill="#2d1f00" stroke="#ffa657" stroke-width="1"/>
  <text x="750" y="33" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">① Title Bar</text>

  <!-- Edit area label -->
  <line x1="662" y1="150" x2="690" y2="150" stroke="#3fb950" stroke-width="1.2" marker-end="url(#arr-label)"/>
  <rect x="691" y="139" width="118" height="22" rx="4" fill="#0f2d1f" stroke="#3fb950" stroke-width="1"/>
  <text x="750" y="154" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">② Edit Area</text>

  <!-- Status bar label -->
  <line x1="662" y1="284" x2="690" y2="284" stroke="#58a6ff" stroke-width="1.2" marker-end="url(#arr-label)"/>
  <rect x="691" y="273" width="118" height="22" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="750" y="288" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">③ Status Bar</text>

  <!-- Shortcut bar 1 label -->
  <line x1="662" y1="304" x2="690" y2="304" stroke="#bc8cff" stroke-width="1.2" marker-end="url(#arr-label)"/>
  <rect x="691" y="293" width="118" height="22" rx="4" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="750" y="308" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">④ Shortcut Row 1</text>

  <!-- Shortcut bar 2 label -->
  <line x1="662" y1="323" x2="690" y2="323" stroke="#bc8cff" stroke-width="1.2" marker-end="url(#arr-label)"/>
  <rect x="691" y="312" width="118" height="22" rx="4" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="750" y="326" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">⑤ Shortcut Row 2</text>

  <!-- Cursor label -->
  <line x1="222" y1="111" x2="222" y2="95" stroke="#e6edf3" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="228" y="91" font-family="'Segoe UI',sans-serif" font-size="9" fill="#e6edf3">cursor</text>

  <!-- ^ = Ctrl label -->
  <text x="30" y="348" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">^ = Ctrl key   (^O = Ctrl+O)      M- = Alt key   (M-U = Alt+U)</text>
</svg>
<p class="diagram-caption">Nano's self-documenting interface: the two bottom rows always show the most important shortcuts. <code>^</code> means <code>Ctrl</code>, <code>M-</code> means <code>Alt</code>. The title bar shows filename and modification status.</p>
</div>

<!-- Title bar explained -->
<div class="table-wrap">
<table class="ref-table">
<thead><tr><th>Screen Region</th><th>What It Shows</th><th>How to Read It</th></tr></thead>
<tbody>
<tr>
  <td style="color:#ffa657;">① Title Bar</td>
  <td>Program name, version, filename, status</td>
  <td><code>GNU nano 7.2 &nbsp; pipeline.py &nbsp; Modified</code> — "Modified" means unsaved changes</td>
</tr>
<tr>
  <td style="color:#3fb950;">② Edit Area</td>
  <td>File content with optional line numbers</td>
  <td>Cursor shown as blinking block. Scroll with arrow keys or Page Up/Down</td>
</tr>
<tr>
  <td style="color:#58a6ff;">③ Status Bar</td>
  <td>Messages: confirmations, errors, prompts</td>
  <td>Shows "File written" after save, "[ Opened file ]" on open, search prompts</td>
</tr>
<tr>
  <td style="color:#bc8cff;">④⑤ Shortcut Rows</td>
  <td>Two rows of key bindings, always visible</td>
  <td><code>^G</code> = Ctrl+G (Help), <code>M-U</code> = Alt+U (Undo). Press <code>^G</code> for full help</td>
</tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — OPENING, SAVING & QUITTING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Opening, Saving &amp; Quitting — The Essentials</h2>

<!-- CONSOLE 1 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — Opening Files, Saving &amp; Exiting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── OPENING FILES ────────────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> filename.txt          <span class="cb-cmt"># open existing or create new file</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> /etc/hosts             <span class="cb-cmt"># open system file (use sudo if needed)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo nano</span> /etc/crontab      <span class="cb-cmt"># open as root (common on servers)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">+42</span> config.py          <span class="cb-cmt"># open and jump to line 42</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">+42,10</span> config.py       <span class="cb-cmt"># open, jump to line 42 column 10</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-R</span> file.txt            <span class="cb-cmt"># open read-only — can view, cannot save</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-v</span> file.txt            <span class="cb-cmt"># view mode alias for -R</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> file1.txt file2.txt    <span class="cb-cmt"># open multiple files as buffers</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-B</span> file.txt            <span class="cb-cmt"># -B: keep backup of original before saving</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-i</span> file.txt            <span class="cb-cmt"># -i: auto-indent (preserves indentation level)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span>                        <span class="cb-cmt"># open with empty buffer (no filename yet)</span>

<span class="cb-cmt">## ─── SAVING (Write Out) ───────────────────────────────────────</span>
Ctrl+O              <span class="cb-cmt"># Write Out — save the file</span>
                    <span class="cb-cmt"># → nano shows: "File Name to Write: filename.txt"</span>
                    <span class="cb-cmt"># → Press Enter to confirm, or type new name to Save As</span>
                    <span class="cb-cmt"># → Nano stays open after saving</span>

<span class="cb-cmt"># During the "File Name to Write:" prompt:</span>
Enter               <span class="cb-cmt"># save to current filename</span>
<span class="cb-cmt">[type new name]</span>     <span class="cb-cmt"># then Enter = Save As (create a copy with new name)</span>
Ctrl+C              <span class="cb-cmt"># cancel the save operation</span>
Ctrl+T              <span class="cb-cmt"># browse filesystem to choose save location</span>

<span class="cb-cmt">## ─── EXITING ───────────────────────────────────────────────────</span>
Ctrl+X              <span class="cb-cmt"># Exit nano</span>
<span class="cb-cmt"># If file has unsaved changes, nano asks:</span>
<span class="cb-cmt"># "Save modified buffer? (Answering "No" will DISCARD changes.)"</span>
<span class="cb-cmt">#  Y = yes, save then exit</span>
<span class="cb-cmt">#  N = no, exit without saving (DISCARD ALL CHANGES)</span>
<span class="cb-cmt">#  Ctrl+C = cancel, go back to editing</span>

<span class="cb-cmt">## ─── THE COMPLETE SAVE-AND-EXIT WORKFLOW ─────────────────────</span>
<span class="cb-cmt"># Method 1: Save then exit (most common)
# Ctrl+O → Enter → Ctrl+X</span>

<span class="cb-cmt"># Method 2: Exit and say Yes to save
# Ctrl+X → Y → Enter</span>

<span class="cb-cmt"># Method 3: Exit without saving (discard changes)
# Ctrl+X → N</span>

<span class="cb-cmt">## ─── INSERTING ANOTHER FILE INTO CURRENT BUFFER ──────────────</span>
Ctrl+R              <span class="cb-cmt"># Read File — insert file at cursor position</span>
<span class="cb-cmt"># Prompt: "File to insert [from ./]: "</span>
<span class="cb-cmt"># Type filename + Enter → file content inserted at cursor</span>

Ctrl+R Ctrl+X       <span class="cb-cmt"># insert output of a shell command instead of a file</span>
<span class="cb-cmt"># Prompt: "Command to execute: "</span>
<span class="cb-cmt"># Example: date → inserts today's date at cursor</span>
<span class="cb-cmt"># Example: cat /etc/hostname → inserts hostname</span>
</pre></div></div>

<!-- Shortcut anatomy SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:20px auto;">
  <rect width="760" height="130" fill="#0d1117" rx="10"/>
  <text x="380" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Nano Key Notation — How to Read the Shortcut Bar</text>

  <!-- ^O box -->
  <rect x="30" y="38" width="60" height="50" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="60" y="62" text-anchor="middle" font-family="'Courier New',monospace" font-size="18" font-weight="bold" fill="#3fb950">^O</text>
  <text x="60" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Write Out</text>
  <text x="60" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Ctrl + O</text>
  <text x="60" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">save file</text>

  <!-- ^X box -->
  <rect x="110" y="38" width="60" height="50" rx="6" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="140" y="62" text-anchor="middle" font-family="'Courier New',monospace" font-size="18" font-weight="bold" fill="#f85149">^X</text>
  <text x="140" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Exit</text>
  <text x="140" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Ctrl + X</text>
  <text x="140" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">quit</text>

  <!-- M-U box -->
  <rect x="210" y="38" width="65" height="50" rx="6" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="242" y="62" text-anchor="middle" font-family="'Courier New',monospace" font-size="18" font-weight="bold" fill="#bc8cff">M-U</text>
  <text x="242" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Undo</text>
  <text x="242" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Alt + U</text>
  <text x="242" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">undo change</text>

  <!-- F2 box -->
  <rect x="315" y="38" width="65" height="50" rx="6" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="347" y="62" text-anchor="middle" font-family="'Courier New',monospace" font-size="18" font-weight="bold" fill="#ffa657">F2</text>
  <text x="347" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Exit alt</text>
  <text x="347" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">F2 key</text>
  <text x="347" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">same as ^X</text>

  <!-- Explanation -->
  <rect x="410" y="34" width="335" height="82" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="424" y="54" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#e6edf3">Key Notation System:</text>
  <text x="424" y="72" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">^X</text><text x="448" y="72" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e"> = Ctrl+X (hold Ctrl, press X)</text>
  <text x="424" y="88" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">M-U</text><text x="456" y="88" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e"> = Alt+U  (hold Alt, press U)</text>
  <text x="424" y="104" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">F2 </text><text x="448" y="104" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e"> = Function key F2</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — NAVIGATION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Navigation — Moving Through Files</h2>

<!-- Navigation shortcut map SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:0 auto 16px;">
  <rect width="760" height="220" fill="#0d1117" rx="10"/>
  <text x="380" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Nano Navigation Key Map</text>

  <!-- Arrow keys cluster -->
  <rect x="60" y="50" width="42" height="36" rx="5" fill="#1f2937" stroke="#30363d" stroke-width="1.5"/>
  <text x="81" y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" fill="#e6edf3">↑</text>
  <rect x="16" y="90" width="42" height="36" rx="5" fill="#1f2937" stroke="#30363d" stroke-width="1.5"/>
  <text x="37" y="112" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" fill="#e6edf3">←</text>
  <rect x="60" y="90" width="42" height="36" rx="5" fill="#1f2937" stroke="#30363d" stroke-width="1.5"/>
  <text x="81" y="112" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" fill="#e6edf3">↓</text>
  <rect x="104" y="90" width="42" height="36" rx="5" fill="#1f2937" stroke="#30363d" stroke-width="1.5"/>
  <text x="125" y="112" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" fill="#e6edf3">→</text>
  <text x="80" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">character by character</text>

  <!-- Ctrl+arrow / Prev/Next word -->
  <rect x="180" y="50" width="100" height="36" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="230" y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">Ctrl+←  Ctrl+→</text>
  <text x="230" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">prev / next word</text>

  <!-- Home / End -->
  <rect x="300" y="50" width="95" height="36" rx="5" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="347" y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">Home  /  End</text>
  <text x="347" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">start / end of line</text>

  <!-- Ctrl+Home / End — file start/end -->
  <rect x="415" y="50" width="115" height="36" rx="5" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="472" y="66" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">Ctrl+Home</text>
  <text x="472" y="80" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">Ctrl+End</text>
  <text x="472" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">file start / end</text>

  <!-- Page Up/Down -->
  <rect x="550" y="50" width="95" height="36" rx="5" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="597" y="66" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">Page Up</text>
  <text x="597" y="80" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">Page Down</text>
  <text x="597" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">scroll screen</text>

  <!-- Go to line -->
  <rect x="180" y="110" width="100" height="36" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="230" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">Ctrl+/ or ^_</text>
  <text x="230" y="157" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">go to line:col</text>

  <!-- Ctrl+W search jump -->
  <rect x="300" y="110" width="95" height="36" rx="5" fill="#1f2937" stroke="#30363d" stroke-width="1.5"/>
  <text x="347" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">Ctrl+W</text>
  <text x="347" y="157" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">search (jump)</text>

  <!-- Ctrl+C position -->
  <rect x="415" y="110" width="115" height="36" rx="5" fill="#1f2937" stroke="#30363d" stroke-width="1.5"/>
  <text x="472" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">Ctrl+C</text>
  <text x="472" y="157" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">show line/col position</text>

  <!-- Alt+G go to line simple -->
  <rect x="550" y="110" width="95" height="36" rx="5" fill="#1f2937" stroke="#30363d" stroke-width="1.5"/>
  <text x="597" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">Alt+G</text>
  <text x="597" y="157" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">go to line number</text>

  <text x="380" y="200" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">All arrow keys and Home/End/PageUp/PageDown work exactly as expected — nano behaves like a normal editor</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — Navigation: Every Movement Shortcut</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── CHARACTER & LINE MOVEMENT ───────────────────────────────</span>
Arrow keys          <span class="cb-cmt"># move one character/line in any direction</span>
Ctrl+F              <span class="cb-cmt"># forward one character (same as →)</span>
Ctrl+B              <span class="cb-cmt"># backward one character (same as ←)</span>
Ctrl+N              <span class="cb-cmt"># next line (same as ↓)</span>
Ctrl+P              <span class="cb-cmt"># previous line (same as ↑)</span>

<span class="cb-cmt">## ─── WORD MOVEMENT ────────────────────────────────────────────</span>
Ctrl+←              <span class="cb-cmt"># move to start of previous word</span>
Ctrl+→              <span class="cb-cmt"># move to start of next word</span>
Ctrl+Space          <span class="cb-cmt"># move forward one word (alternative)</span>
Alt+Space           <span class="cb-cmt"># move backward one word</span>

<span class="cb-cmt">## ─── LINE START / END ─────────────────────────────────────────</span>
Home                <span class="cb-cmt"># jump to start of current line</span>
End                 <span class="cb-cmt"># jump to end of current line</span>
Ctrl+A              <span class="cb-cmt"># same as Home</span>
Ctrl+E              <span class="cb-cmt"># same as End</span>

<span class="cb-cmt">## ─── FILE START / END ─────────────────────────────────────────</span>
Ctrl+Home           <span class="cb-cmt"># jump to very first character in file</span>
Ctrl+End            <span class="cb-cmt"># jump to very last character in file</span>
Alt+\               <span class="cb-cmt"># go to first line of file</span>
Alt+/               <span class="cb-cmt"># go to last line of file</span>

<span class="cb-cmt">## ─── SCREEN SCROLLING ─────────────────────────────────────────</span>
Page Up             <span class="cb-cmt"># scroll up one screen</span>
Page Down           <span class="cb-cmt"># scroll down one screen</span>
Ctrl+Y              <span class="cb-cmt"># same as Page Up</span>
Ctrl+V              <span class="cb-cmt"># same as Page Down</span>
Alt+-               <span class="cb-cmt"># scroll UP one line (cursor stays)</span>
Alt++               <span class="cb-cmt"># scroll DOWN one line (cursor stays)</span>

<span class="cb-cmt">## ─── GO TO SPECIFIC LINE / COLUMN ────────────────────────────</span>
Ctrl+/              <span class="cb-cmt"># Go To Line prompt: type line number + Enter</span>
Alt+G               <span class="cb-cmt"># same as Ctrl+/  — go to line</span>
Ctrl+_              <span class="cb-cmt"># same (on some keyboards)</span>

<span class="cb-cmt"># At the "Enter line number:" prompt:
# Type: 42        → jump to line 42
# Type: 42,15     → jump to line 42, column 15
# Type: ,15       → stay on current line, jump to column 15</span>

<span class="cb-cmt">## ─── SHOW CURRENT POSITION ────────────────────────────────────</span>
Ctrl+C              <span class="cb-cmt"># show: "line X/Y (Z%), col N, char N"</span>
<span class="cb-cmt"># Example output: "line 47/203 (23%), col 12, char 1402"</span>

<span class="cb-cmt">## ─── BRACKET / MATCHING ───────────────────────────────────────</span>
Alt+]               <span class="cb-cmt"># jump to matching bracket: () [] {} ""</span>
<span class="cb-cmt"># Cursor must be ON or AFTER the opening bracket</span>

<span class="cb-cmt">## ─── USING MOUSE (if enabled) ────────────────────────────────</span>
<span class="cb-cmt"># Click anywhere in the text to position cursor there
# Requires: nano -m  or  set mouse in .nanorc</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — EDITING: CUT, COPY, PASTE, UNDO
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Editing — Cut, Copy, Paste, Undo &amp; Redo</h2>

<!-- CONSOLE 3 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — Cut, Copy, Paste, Select, Undo</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── CUT (called "Cut Text" in nano) ─────────────────────────</span>
Ctrl+K              <span class="cb-cmt"># Cut (delete) current line + copy to cut buffer</span>
<span class="cb-cmt"># Press multiple times: cuts accumulate in buffer
# Ctrl+K × 3 → cuts 3 lines, all in one paste</span>

Alt+T               <span class="cb-cmt"># Cut from cursor to END of file</span>

<span class="cb-cmt">## ─── COPY (Mark + Cut without actually deleting) ─────────────</span>
<span class="cb-cmt"># Nano has no direct "copy" key — use the Mark method:
# Step 1: Alt+A or Ctrl+6  → set mark at cursor (start of selection)
# Step 2: Move cursor with arrows to end of selection
# Step 3: Alt+6            → COPY selection to cut buffer (no delete)
#      or Ctrl+K           → CUT selection to cut buffer (deletes it)</span>

Alt+A               <span class="cb-cmt"># set mark / start selection (Alt+A or Ctrl+6)</span>
Ctrl+6              <span class="cb-cmt"># same as Alt+A — toggle mark</span>
<span class="cb-cmt"># Then move cursor to extend selection (highlighted)</span>
Alt+6               <span class="cb-cmt"># copy (duplicate) the marked selection into cut buffer</span>
Ctrl+K              <span class="cb-cmt"># cut the marked selection into cut buffer</span>

<span class="cb-cmt">## ─── PASTE ────────────────────────────────────────────────────</span>
Ctrl+U              <span class="cb-cmt"># Uncut (paste) — paste the cut buffer at cursor</span>
<span class="cb-cmt"># Can paste multiple times — buffer keeps content until next cut</span>

<span class="cb-cmt">## ─── PRACTICAL COPY-PASTE EXAMPLE ────────────────────────────</span>
<span class="cb-cmt"># Copy line 5 and paste it after line 10:
# 1. Navigate to line 5
# 2. Alt+A          (set mark at start of line)
# 3. End            (move to end of line 5)
# 4. Alt+6          (copy to cut buffer)
# 5. Navigate to line 10
# 6. End            (go to end of line 10)
# 7. Ctrl+U         (paste after line 10)

# Cut lines 3-7 and move them to line 20:
# 1. Navigate to line 3
# 2. Ctrl+K × 5     (cut 5 lines — they accumulate)
# 3. Navigate to line 20
# 4. Ctrl+U         (paste all 5 lines)</span>

<span class="cb-cmt">## ─── UNDO AND REDO ────────────────────────────────────────────</span>
Alt+U               <span class="cb-cmt"># Undo last action</span>
Alt+E               <span class="cb-cmt"># Redo (re-apply undone action)</span>
<span class="cb-cmt"># Nano supports multiple undo levels — keep pressing Alt+U
# Undo history is per-session (lost on exit unless using undo file)</span>

<span class="cb-cmt">## ─── DELETE OPERATIONS ────────────────────────────────────────</span>
Delete / Backspace  <span class="cb-cmt"># delete character at/before cursor (standard)</span>
Ctrl+D              <span class="cb-cmt"># delete character under cursor (forward delete)</span>
Ctrl+H              <span class="cb-cmt"># backspace (delete character before cursor)</span>
Ctrl+K              <span class="cb-cmt"># cut (delete) entire current line</span>

<span class="cb-cmt">## ─── AUTOINDENT ───────────────────────────────────────────────</span>
<span class="cb-cmt"># When autoindent is on (nano -i or set autoindent in .nanorc):
# Pressing Enter preserves the indentation of the current line
# Useful for Python, YAML, config files</span>
Tab                 <span class="cb-cmt"># insert tab or spaces (depends on tabsize/usetabs settings)</span>
Ctrl+] or Alt+}     <span class="cb-cmt"># indent current line one tab stop</span>
Alt+{ (Alt+Shift+[) <span class="cb-cmt"># unindent current line one tab stop</span>
<span class="cb-cmt"># In visual selection (after Alt+A):
# Alt+} → indent all selected lines
# Alt+{ → unindent all selected lines</span>
</pre></div></div>

<!-- Cut/Copy/Paste flow SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:20px auto;">
  <rect width="760" height="130" fill="#0d1117" rx="10"/>
  <text x="380" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Nano Cut Buffer Flow</text>

  <!-- File buffer box -->
  <rect x="20" y="38" width="200" height="75" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="120" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#e6edf3">File Buffer</text>
  <text x="120" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">line 1: import pandas</text>
  <text x="120" y="90" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">line 2: def load():</text>
  <text x="120" y="105" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">line 3: return df</text>

  <!-- Arrow: Ctrl+K -->
  <line x1="221" y1="76" x2="289" y2="76" stroke="#f85149" stroke-width="1.5" marker-end="url(#arrowh)"/>
  <text x="255" y="68" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">Ctrl+K</text>
  <text x="255" y="93" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">cut line</text>

  <!-- Alt+6 arrow (copy, no delete) -->
  <line x1="221" y1="90" x2="289" y2="90" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arrowh)"/>
  <text x="255" y="112" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">Alt+6</text>
  <text x="255" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">copy (keep)</text>

  <!-- Cut buffer box -->
  <rect x="290" y="38" width="180" height="75" rx="8" fill="#1f2937" stroke="#ffa657" stroke-width="1.5"/>
  <text x="380" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Cut Buffer</text>
  <text x="380" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">def load():</text>
  <text x="380" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">holds last cut/copied content</text>
  <text x="380" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">accumulates with repeated Ctrl+K</text>

  <!-- Arrow: Ctrl+U paste -->
  <line x1="471" y1="76" x2="539" y2="76" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arrowh)"/>
  <text x="505" y="68" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">Ctrl+U</text>
  <text x="505" y="93" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">paste/uncut</text>

  <!-- Output buffer -->
  <rect x="540" y="38" width="200" height="75" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="640" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">At Cursor Position</text>
  <text x="640" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">line 3: def load():</text>
  <text x="640" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">pasted content appears here</text>
  <text x="640" y="105" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">can paste multiple times</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — SEARCH AND REPLACE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Search &amp; Replace — Find and Fix Anything</h2>

<!-- CONSOLE 4 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — Search, Replace, Regex &amp; All Options</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── BASIC SEARCH ─────────────────────────────────────────────</span>
Ctrl+W              <span class="cb-cmt"># open search prompt: "Search [last pattern]: "</span>
<span class="cb-cmt"># Type your search term + Enter → jumps to first match
# Wrap-around: search continues from top when reaching end of file</span>

<span class="cb-cmt"># At the search prompt, special keys:</span>
Enter               <span class="cb-cmt"># start search forward from cursor</span>
Ctrl+N              <span class="cb-cmt"># (after search) find next occurrence</span>
Ctrl+P              <span class="cb-cmt"># (after search) find previous occurrence</span>
Alt+W               <span class="cb-cmt"># search backward (while in search prompt)</span>
Alt+C               <span class="cb-cmt"># toggle case sensitivity during search</span>
Alt+R               <span class="cb-cmt"># toggle regex mode during search</span>

<span class="cb-cmt"># After closing search prompt:</span>
Alt+W               <span class="cb-cmt"># find next (after closing the search prompt)</span>
<span class="cb-cmt"># Or simply:  Ctrl+W → Enter  (re-run last search)</span>

<span class="cb-cmt">## ─── SEARCH AGAIN (repeat last search) ──────────────────────</span>
Ctrl+W  Enter       <span class="cb-cmt"># searches for the last used pattern again</span>

<span class="cb-cmt">## ─── REPLACE ──────────────────────────────────────────────────</span>
Ctrl+\              <span class="cb-cmt"># Replace — opens replace prompt</span>
<span class="cb-cmt"># Step 1: "Search [last pattern]: " → type what to find
# Step 2: "Replace with: "          → type the replacement
# Step 3: For each match, nano asks:
#    "Replace this instance?" 
#    Y = yes replace this one
#    N = no skip this one
#    A = replace All remaining (no more prompts!)
#    Ctrl+C = cancel replacement</span>

<span class="cb-cmt">## ─── REPLACE ALL IN ONE GO ────────────────────────────────────</span>
<span class="cb-cmt"># Ctrl+\  →  type search  →  Enter  →  type replace  →  Enter  →  A</span>
<span class="cb-cmt"># The "A" at the confirm prompt replaces ALL matches instantly</span>

<span class="cb-cmt">## ─── REPLACE WITH REGEX ───────────────────────────────────────</span>
<span class="cb-cmt"># At search prompt: Alt+R to enable regex mode (shows [Regexp] in prompt)</span>

<span class="cb-cmt"># Nano uses POSIX Extended Regular Expressions (ERE):
# .       = any character
# *       = zero or more of previous
# +       = one or more (ERE)
# ?       = zero or one (ERE)
# ^       = start of line
# \$      = end of line
# [abc]   = character class
# [^abc]  = negated class
# (foo)   = group (for back-references)
# \\1 \\2   = back-references in replacement</span>

<span class="cb-cmt"># Examples:</span>
<span class="cb-cmt"># Search:   ^#.*         Replace: (empty)  → delete all comment lines</span>
<span class="cb-cmt"># Search:   [0-9]+g      Replace: 16g      → change any NUMg to 16g</span>
<span class="cb-cmt"># Search:   localhost    Replace: db.prod  → change hostname</span>
<span class="cb-cmt"># Search:   "([^"]+)"    Replace: '\\1'     → change "double" to 'single' quotes</span>

<span class="cb-cmt">## ─── CASE-INSENSITIVE SEARCH ──────────────────────────────────</span>
<span class="cb-cmt"># In search prompt: Alt+C toggles case sensitivity
# Or set in .nanorc: set casesensitive  (off by default)</span>

<span class="cb-cmt">## ─── SEARCH IN A SPECIFIC RANGE ──────────────────────────────</span>
<span class="cb-cmt"># Nano doesn't have line-range substitution like vim's :%s
# Workaround: use Mark (Alt+A) to select the range,
# then Ctrl+\ operates only within selection</span>
Alt+A               <span class="cb-cmt"># mark start of range</span>
<span class="cb-cmt"># move cursor to end of range</span>
Ctrl+\              <span class="cb-cmt"># replace operates only within marked region</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — ALL KEYBOARD SHORTCUTS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Keyboard Shortcut Reference</h2>

<!-- CONSOLE 5 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — Every Nano Shortcut Organised by Category</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ FILE OPERATIONS ════════════════════════════════════════</span>
Ctrl+O              <span class="cb-cmt"># Write Out (save)</span>
Ctrl+X              <span class="cb-cmt"># Exit (prompts to save if modified)</span>
Ctrl+R              <span class="cb-cmt"># Read File (insert file at cursor)</span>
Ctrl+R Ctrl+X       <span class="cb-cmt"># Execute command and insert output</span>
Ctrl+T              <span class="cb-cmt"># Open file browser (to navigate) or run spell check</span>

<span class="cb-cmt">## ═══ EDITING ════════════════════════════════════════════════</span>
Ctrl+K              <span class="cb-cmt"># Cut current line (or selection)</span>
Ctrl+U              <span class="cb-cmt"># Paste (Uncut)</span>
Alt+6               <span class="cb-cmt"># Copy selection (without cutting)</span>
Alt+A  or  Ctrl+6   <span class="cb-cmt"># Set Mark / toggle selection</span>
Alt+U               <span class="cb-cmt"># Undo</span>
Alt+E               <span class="cb-cmt"># Redo</span>
Ctrl+D              <span class="cb-cmt"># Delete character forward</span>
Ctrl+H              <span class="cb-cmt"># Backspace</span>
Tab                 <span class="cb-cmt"># Insert tab/spaces</span>
Enter               <span class="cb-cmt"># New line</span>
Alt+T               <span class="cb-cmt"># Cut to end of file</span>
Alt+U (in prompt)   <span class="cb-cmt"># Toggle insert/overwrite mode</span>
Alt+I               <span class="cb-cmt"># Toggle auto-indent</span>
Alt+L               <span class="cb-cmt"># Toggle hard line-wrapping</span>
Alt+} (Ctrl+])      <span class="cb-cmt"># Indent current line (right)</span>
Alt+{ (Alt+Shift+[) <span class="cb-cmt"># Unindent current line (left)</span>
Alt+3               <span class="cb-cmt"># Comment/uncomment line (nano 7.1+)</span>
Ctrl+J              <span class="cb-cmt"># Justify (re-wrap paragraph to fill width)</span>
Alt+J               <span class="cb-cmt"># Justify entire file</span>

<span class="cb-cmt">## ═══ NAVIGATION ═════════════════════════════════════════════</span>
Arrow keys          <span class="cb-cmt"># character/line movement</span>
Ctrl+← / Ctrl+→     <span class="cb-cmt"># previous/next word</span>
Home / End          <span class="cb-cmt"># line start / end</span>
Ctrl+Home           <span class="cb-cmt"># file start (first character)</span>
Ctrl+End            <span class="cb-cmt"># file end (last character)</span>
Page Up             <span class="cb-cmt"># scroll one screen up (= Ctrl+Y)</span>
Page Down           <span class="cb-cmt"># scroll one screen down (= Ctrl+V)</span>
Alt+\               <span class="cb-cmt"># go to first line</span>
Alt+/               <span class="cb-cmt"># go to last line</span>
Ctrl+/ or Alt+G     <span class="cb-cmt"># go to specific line [,column]</span>
Ctrl+C              <span class="cb-cmt"># display current position</span>
Alt+]               <span class="cb-cmt"># jump to matching bracket</span>
Alt+-               <span class="cb-cmt"># scroll up one line (cursor stays)</span>
Alt++               <span class="cb-cmt"># scroll down one line</span>

<span class="cb-cmt">## ═══ SEARCH ════════════════════════════════════════════════</span>
Ctrl+W              <span class="cb-cmt"># search forward</span>
Alt+W               <span class="cb-cmt"># search next (repeat) / search backward in prompt</span>
Ctrl+\              <span class="cb-cmt"># search and replace</span>
Alt+R  (in search)  <span class="cb-cmt"># toggle regex mode</span>
Alt+C  (in search)  <span class="cb-cmt"># toggle case sensitivity</span>
Alt+B  (in search)  <span class="cb-cmt"># toggle backwards search</span>

<span class="cb-cmt">## ═══ BUFFERS (multiple files) ═══════════════════════════════</span>
Alt+&lt;  or  Alt+,    <span class="cb-cmt"># switch to previous buffer</span>
Alt+&gt;  or  Alt+.    <span class="cb-cmt"># switch to next buffer</span>
Ctrl+T              <span class="cb-cmt"># open a new file into a buffer</span>

<span class="cb-cmt">## ═══ DISPLAY ════════════════════════════════════════════════</span>
Alt+N               <span class="cb-cmt"># toggle line numbers on/off</span>
Alt+P               <span class="cb-cmt"># toggle visible whitespace (show tabs/spaces)</span>
Alt+X               <span class="cb-cmt"># toggle help bar (bottom two rows)</span>
Alt+Y               <span class="cb-cmt"># toggle syntax highlighting colour</span>
Alt+Z               <span class="cb-cmt"># toggle the title bar and help bar (distraction-free mode)</span>
Alt+D               <span class="cb-cmt"># count words/lines/chars in file</span>

<span class="cb-cmt">## ═══ SPELL CHECK ════════════════════════════════════════════</span>
Ctrl+T              <span class="cb-cmt"># in some configs: run spell check</span>
<span class="cb-cmt"># Requires: sudo apt install spell (or aspell, hunspell)</span>

<span class="cb-cmt">## ═══ EXECUTE / MACRO ════════════════════════════════════════</span>
Ctrl+T Ctrl+T       <span class="cb-cmt"># execute a shell command from within nano</span>
Alt+:               <span class="cb-cmt"># start/stop recording keystrokes macro (nano 7+)</span>
Alt+;               <span class="cb-cmt"># replay last recorded macro</span>

<span class="cb-cmt">## ═══ HELP ═══════════════════════════════════════════════════</span>
Ctrl+G              <span class="cb-cmt"># open the built-in help viewer</span>
<span class="cb-cmt"># Inside help: Space/Page Down to scroll, Q to quit</span>
</pre></div></div>

<!-- Full shortcuts table -->
<h3>Quick Reference Card</h3>
<div class="table-wrap">
<table class="ref-table">
<thead>
<tr>
  <th style="color:#3fb950;">Ctrl+ shortcut</th>
  <th>Action</th>
  <th style="color:#bc8cff;">Alt+ shortcut</th>
  <th>Action</th>
</tr>
</thead>
<tbody>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+G</td><td>Help</td><td style="color:#bc8cff;font-family:monospace;">Alt+N</td><td>Toggle line numbers</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+O</td><td>Save file</td><td style="color:#bc8cff;font-family:monospace;">Alt+U</td><td>Undo</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+X</td><td>Exit</td><td style="color:#bc8cff;font-family:monospace;">Alt+E</td><td>Redo</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+R</td><td>Read/insert file</td><td style="color:#bc8cff;font-family:monospace;">Alt+A / Ctrl+6</td><td>Set mark / select</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+W</td><td>Search</td><td style="color:#bc8cff;font-family:monospace;">Alt+6</td><td>Copy (no cut)</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+\</td><td>Replace</td><td style="color:#bc8cff;font-family:monospace;">Alt+W</td><td>Find next / search bwd</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+K</td><td>Cut line/selection</td><td style="color:#bc8cff;font-family:monospace;">Alt+T</td><td>Cut to end of file</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+U</td><td>Paste</td><td style="color:#bc8cff;font-family:monospace;">Alt+G</td><td>Go to line</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+C</td><td>Show position</td><td style="color:#bc8cff;font-family:monospace;">Alt+]</td><td>Match bracket</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+J</td><td>Justify paragraph</td><td style="color:#bc8cff;font-family:monospace;">Alt+3</td><td>Toggle comment</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+T</td><td>Execute / spell</td><td style="color:#bc8cff;font-family:monospace;">Alt+P</td><td>Show whitespace</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+Y</td><td>Page Up</td><td style="color:#bc8cff;font-family:monospace;">Alt+Y</td><td>Toggle syntax color</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+V</td><td>Page Down</td><td style="color:#bc8cff;font-family:monospace;">Alt+Z</td><td>Distraction-free mode</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+/</td><td>Go to line</td><td style="color:#bc8cff;font-family:monospace;">Alt+D</td><td>Word/line count</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+Home</td><td>File start</td><td style="color:#bc8cff;font-family:monospace;">Alt+&lt; / Alt+&gt;</td><td>Prev/next buffer</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+End</td><td>File end</td><td style="color:#bc8cff;font-family:monospace;">Alt+:</td><td>Record macro</td></tr>
<tr><td style="color:#3fb950;font-family:monospace;">Ctrl+←/→</td><td>Prev/next word</td><td style="color:#bc8cff;font-family:monospace;">Alt+;</td><td>Replay macro</td></tr>
</tbody>
</table>
</div>
</div>
\`

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — COMMAND LINE FLAGS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Command Line Flags — All <code>nano</code> Options</h2>

<!-- CONSOLE 6 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — Every nano Command-Line Flag Explained</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── OPENING BEHAVIOUR ────────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">+LINE</span> file            <span class="cb-cmt"># open at line LINE</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">+LINE,COL</span> file         <span class="cb-cmt"># open at line LINE, column COL</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-R</span> file                <span class="cb-cmt"># --restricted: read-only, cannot write</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-v</span> file                <span class="cb-cmt"># --view: same as -R (view mode)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-z</span> file                <span class="cb-cmt"># --suspendable: allow Ctrl+Z to suspend</span>

<span class="cb-cmt">## ─── DISPLAY FLAGS ────────────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-l</span> file                <span class="cb-cmt"># --linenumbers: show line numbers on left</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-c</span> file                <span class="cb-cmt"># --constantshow: always show cursor position (line/col)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-A</span> file                <span class="cb-cmt"># --smarthome: Home key goes to first non-blank, then col 0</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-L</span> file                <span class="cb-cmt"># --nonewlines: don't add newline at end of file</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-N</span> file                <span class="cb-cmt"># --noconvert: don't convert DOS/Mac line endings</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-P</span> file                <span class="cb-cmt"># --positionlog: remember cursor position between sessions</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-y</span> file                <span class="cb-cmt"># --softwrap: wrap long lines visually (don't scroll right)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-$</span> file                <span class="cb-cmt"># --softwrap + --atblanks: wrap at word boundaries</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-k</span> file                <span class="cb-cmt"># --cutfromcursor: Ctrl+K cuts from cursor to EOL (not whole line)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-p</span> file                <span class="cb-cmt"># --preserve: preserve XON/XOFF for terminal (Ctrl+S / Ctrl+Q)</span>

<span class="cb-cmt">## ─── EDITING BEHAVIOUR ────────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-i</span> file                <span class="cb-cmt"># --autoindent: auto-indent new lines to match current</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-E</span> file                <span class="cb-cmt"># --tabstospaces: convert Tab key presses to spaces</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-T 4</span> file              <span class="cb-cmt"># --tabsize=4: set tab width to 4 spaces</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-u</span> file                <span class="cb-cmt"># --undo: enable undo (default in modern nano)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-m</span> file                <span class="cb-cmt"># --mouse: enable mouse for clicking and scrolling</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-M</span> file                <span class="cb-cmt"># --trimblanks: trim trailing whitespace when wrapping</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-e</span> file                <span class="cb-cmt"># --multibuffer: open each file in its own buffer</span>

<span class="cb-cmt">## ─── FILE HANDLING FLAGS ─────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-B</span> file                <span class="cb-cmt"># --backup: save a backup of original file before writing</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-C DIR</span> file            <span class="cb-cmt"># --backupdir=DIR: save backups to DIR instead of same location</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-D</span> file                <span class="cb-cmt"># --boldtext: use bold instead of reverse video for highlights</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-F</span> file                <span class="cb-cmt"># --multibuffer: first file in new buffer</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-s PROG</span> file           <span class="cb-cmt"># --speller=PROG: use PROG as spell checker instead of default</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-f FILE</span> file           <span class="cb-cmt"># --rcfile=FILE: use FILE as .nanorc instead of ~/.nanorc</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-n</span> file                <span class="cb-cmt"># --noread: don't read existing file (create from scratch)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-w</span> file                <span class="cb-cmt"># --nowrap: disable long-line wrapping</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-x</span> file                <span class="cb-cmt"># --nohelp: hide the two shortcut rows at bottom</span>

<span class="cb-cmt">## ─── SYNTAX HIGHLIGHTING FLAGS ───────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-Y python</span> file.txt     <span class="cb-cmt"># --syntax=python: force Python syntax highlighting</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-Y sh</span> script.sh         <span class="cb-cmt"># force shell script highlighting</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-Y sql</span> query.txt         <span class="cb-cmt"># force SQL highlighting</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-Y none</span> file.txt         <span class="cb-cmt"># disable syntax highlighting</span>

<span class="cb-cmt">## ─── PRACTICAL COMBINATIONS FOR DATA ENGINEERS ───────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-l -c -i -E -T 4</span> etl.py
<span class="cb-cmt"># line numbers + cursor pos + autoindent + tabs→spaces + 4-space tabs
# The ideal Python editing setup</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-v -l -y -c</span> huge_log.log
<span class="cb-cmt"># read-only + line numbers + soft-wrap + position
# The ideal log file viewing setup</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">sudo nano</span> <span class="cb-flag">-B -w</span> /etc/spark/spark-defaults.conf
<span class="cb-cmt"># backup original + no wrapping
# The safe server config editing setup</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-R</span> access.log 2&gt;/dev/null
<span class="cb-cmt"># read-only log analysis (suppress permission errors)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — .NANORC CONFIGURATION FILE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>.nanorc</code> — Configuring Nano Permanently</h2>

<p>The <code>~/.nanorc</code> file is read every time nano starts. Set your preferences once — they apply to every file, every session. Think of it as nano's <code>.vimrc</code>.</p>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">~/.nanorc — Complete Data Engineer Config with Explanations</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─────────────────────────────────────────────────────────────
## ~/.nanorc — Data Engineer / Analyst / ML Setup
## Lines starting with # are comments
## After editing, new sessions pick up changes automatically
## ─────────────────────────────────────────────────────────────

## ── DISPLAY ────────────────────────────────────────────────</span>
set linenumbers           <span class="cb-cmt"># always show line numbers on the left</span>
set constantshow          <span class="cb-cmt"># always show cursor position at bottom (line X/Y, col N)</span>
set titlecolor bold,white,blue  <span class="cb-cmt"># title bar: bold white text on blue background</span>
set statuscolor bold,white,green  <span class="cb-cmt"># status bar colour</span>
set errorcolor bold,white,red  <span class="cb-cmt"># error messages in bold red</span>
set selectedcolor lightwhite,cyan  <span class="cb-cmt"># selected text colour</span>
set numbercolor cyan      <span class="cb-cmt"># line number colour</span>
set keycolor cyan         <span class="cb-cmt"># shortcut key colour in help bar</span>
set functioncolor green   <span class="cb-cmt"># function name colour in help bar</span>

<span class="cb-cmt">## ── EDITING BEHAVIOUR ─────────────────────────────────────</span>
set autoindent            <span class="cb-cmt"># preserve indentation level on new lines</span>
set tabsize 4             <span class="cb-cmt"># display tab as 4 spaces wide</span>
set tabstospaces          <span class="cb-cmt"># Tab key inserts spaces, not a tab character</span>
set mouse                 <span class="cb-cmt"># enable mouse (click to position, scroll)</span>
set smarthome             <span class="cb-cmt"># Home key: first non-blank char → then column 0</span>
set wordbounds            <span class="cb-cmt"># Ctrl+← and Ctrl+→ stop at word boundaries</span>
set notruncate            <span class="cb-cmt"># don't truncate long lines in search history</span>
set afterends             <span class="cb-cmt"># Ctrl+→ stops at word ENDS not just beginnings</span>

<span class="cb-cmt">## ── UNDO AND BACKUP ───────────────────────────────────────</span>
set undo                  <span class="cb-cmt"># enable undo/redo (default in nano 3+)</span>
set backup                <span class="cb-cmt"># keep backup of original file before each save</span>
set backupdir "~/.nano/backups"  <span class="cb-cmt"># store backups here (create dir first!)</span>
<span class="cb-cmt"># mkdir -p ~/.nano/backups</span>

<span class="cb-cmt">## ── VISUAL AIDS ──────────────────────────────────────────</span>
set softwrap              <span class="cb-cmt"># wrap long lines visually (don't scroll horizontally)</span>
set atblanks              <span class="cb-cmt"># wrap at word boundaries (with softwrap)</span>
set whitespace "»·"       <span class="cb-cmt"># show tab as » and space as · when whitespace visible</span>
set showcursor            <span class="cb-cmt"># always show cursor</span>
set positionlog           <span class="cb-cmt"># remember cursor position when you reopen files</span>

<span class="cb-cmt">## ── SEARCH BEHAVIOUR ─────────────────────────────────────</span>
set casesensitive         <span class="cb-cmt"># search is case-sensitive by default</span>
<span class="cb-cmt"># Remove above line for case-insensitive search by default</span>
set regexp                <span class="cb-cmt"># use regex in search/replace by default</span>
<span class="cb-cmt"># (toggle with Alt+R in search prompt regardless)</span>

<span class="cb-cmt">## ── BEHAVIOUR ────────────────────────────────────────────</span>
set multibuffer           <span class="cb-cmt"># opening a file creates a new buffer (not replaces)</span>
set zap                   <span class="cb-cmt"># Delete/Backspace over selection deletes it (like normal editors)</span>
set cutfromcursor         <span class="cb-cmt"># Ctrl+K cuts from cursor to EOL, not the whole line</span>
set jumpyscrolling        <span class="cb-cmt"># scroll half-screen instead of one line at a time</span>
set historylog            <span class="cb-cmt"># save search and replace history between sessions</span>
set locking               <span class="cb-cmt"># use lock files to prevent simultaneous edits</span>

<span class="cb-cmt">## ── SYNTAX HIGHLIGHTING (include system definitions) ─────</span>
include "/usr/share/nano/*.nanorc"  <span class="cb-cmt"># include all system syntax files</span>
<span class="cb-cmt"># This includes: Python, bash, SQL, C, HTML, CSS, JSON, YAML,
# Markdown, Makefile, Go, Rust, Java, XML, and 50+ more</span>

include "/usr/share/nano/extra/*.nanorc"  <span class="cb-cmt"># extra syntax files if available</span>

<span class="cb-cmt">## ── CUSTOM KEY BINDINGS ──────────────────────────────────</span>
<span class="cb-cmt"># Remap shortcuts you prefer:
# bind KEY FUNCTION MENU
# KEY: ^X=Ctrl+X  M-X=Alt+X  F1..F16
# FUNCTION: see nano --help for function names
# MENU: all, main, search, replace, etc.</span>

bind ^Z undo main        <span class="cb-cmt"># Ctrl+Z = undo (like most apps)</span>
bind ^Y redo main        <span class="cb-cmt"># Ctrl+Y = redo</span>
bind ^F whereis main     <span class="cb-cmt"># Ctrl+F = find (like most apps)</span>
bind ^H help main        <span class="cb-cmt"># Ctrl+H = help</span>
bind ^S savefile main    <span class="cb-cmt"># Ctrl+S = save (familiar shortcut)</span>
bind ^Q exit main        <span class="cb-cmt"># Ctrl+Q = quit</span>
bind ^D deleteword main  <span class="cb-cmt"># Ctrl+D = delete word forward</span>

<span class="cb-cmt">## ── FILETYPE-SPECIFIC SETTINGS (not built-in to nano) ───
## Use system .nanorc includes instead — see Section 10</span>
</pre></div></div>

<div class="callout-box warn-box">
  <strong>⚠️ Ctrl+S by default in terminals:</strong> In many terminals, <code>Ctrl+S</code> sends XOFF (pause output), not save. If nano seems to freeze after Ctrl+S, press <code>Ctrl+Q</code> to unfreeze. To fix permanently, add <code>stty -ixon</code> to your <code>~/.bashrc</code> — this disables flow control and frees up <code>Ctrl+S</code>/<code>Ctrl+Q</code> for other uses.
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — SYNTAX HIGHLIGHTING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Syntax Highlighting — Making Code Readable</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — Syntax Highlighting: Enable, Customise, Create</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── WHERE SYNTAX FILES LIVE ──────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> /usr/share/nano/
<span class="cb-out">python.nanorc  sh.nanorc    sql.nanorc   yaml.nanorc  json.nanorc</span>
<span class="cb-out">html.nanorc    css.nanorc   c.nanorc     go.nanorc    rust.nanorc</span>
<span class="cb-out">java.nanorc    xml.nanorc   tex.nanorc   makefile.nanorc ...</span>
<span class="cb-cmt"># 50+ syntax definition files included with nano</span>

<span class="cb-cmt">## ─── ENABLE FOR SPECIFIC FILETYPE ────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-Y python</span> script.py    <span class="cb-cmt"># force Python highlighting</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-Y sh</span> ./myscript        <span class="cb-cmt"># force shell highlighting (no .sh extension)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-Y sql</span> queries.txt       <span class="cb-cmt"># force SQL highlighting on .txt file</span>

<span class="cb-cmt">## ─── ENABLE ALL IN .NANORC (recommended) ─────────────────────</span>
<span class="cb-cmt"># Add to ~/.nanorc:</span>
include "/usr/share/nano/*.nanorc"
<span class="cb-cmt"># Now .py → Python, .sh → Bash, .sql → SQL, etc. automatically</span>

<span class="cb-cmt">## ─── SYNTAX FILE STRUCTURE ────────────────────────────────────</span>
<span class="cb-cmt"># Each .nanorc file follows this pattern:</span>

<span class="cb-cmt">## Example: custom SQL highlighting in ~/.nano/sql-custom.nanorc</span>
syntax "sql" "\.sql\$"
<span class="cb-cmt"># ↑ syntax name + regex to match filenames</span>

color brightblue  "(?i)(SELECT|FROM|WHERE|JOIN|ON|GROUP BY|ORDER BY|HAVING|LIMIT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|INDEX)"
<span class="cb-cmt"># ↑ colour SQL keywords (case-insensitive with (?i))</span>

color green       "(?i)(AND|OR|NOT|IN|LIKE|BETWEEN|IS NULL|IS NOT NULL|EXISTS)"
<span class="cb-cmt"># ↑ logical operators in green</span>

color yellow      "'[^']*'"
<span class="cb-cmt"># ↑ string literals in yellow</span>

color cyan        "--.*\$"
<span class="cb-cmt"># ↑ comments (-- to end of line) in cyan</span>

color red         "/\*"  "\*/"
<span class="cb-cmt"># ↑ block comments /* ... */</span>

color magenta     "[0-9]+"
<span class="cb-cmt"># ↑ numbers in magenta</span>

<span class="cb-cmt">## ─── CUSTOM PYTHON HIGHLIGHTING EXTRA ────────────────────────</span>
<span class="cb-cmt"># Add to existing Python nanorc or create override file:</span>
<span class="cb-cmt"># ~/.nano/python-extra.nanorc</span>
syntax "python-extra" "\.py\$"

color brightred   "\bNone\b|\bTrue\b|\bFalse\b"
<span class="cb-cmt"># ↑ None/True/False in bright red</span>

color cyan        "\b(def|class|import|from|return|yield|raise|pass|lambda|with|as|async|await)\b"
<span class="cb-cmt"># ↑ keywords in cyan</span>

color green       "\"[^\"]*\""
color green       "'[^']*'"
<span class="cb-cmt"># ↑ strings in green</span>

color brightblue  "#.*\$"
<span class="cb-cmt"># ↑ comments in bright blue</span>

<span class="cb-cmt">## ─── AVAILABLE COLOURS ────────────────────────────────────────</span>
<span class="cb-cmt"># Basic:  black  red  green  yellow  blue  magenta  cyan  white
# Bright: brightblack(grey)  brightred  brightgreen  brightyellow
#         brightblue  brightmagenta  brightcyan  brightwhite
#
# Format: color FGCOLOR[,BGCOLOR] "REGEX"
# With bold: color bold,cyan "pattern"
# With underline: color underline,green "pattern"</span>

<span class="cb-cmt">## ─── TOGGLE HIGHLIGHTING INSIDE NANO ────────────────────────</span>
Alt+Y               <span class="cb-cmt"># toggle syntax highlighting on/off</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — MULTIPLE BUFFERS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Multiple Buffers — Work with Several Files at Once</h2>

<!-- Buffer navigation SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:0 auto 16px;">
  <rect width="760" height="150" fill="#0d1117" rx="10"/>
  <text x="380" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Nano Buffer Navigation — Alt+&lt; and Alt+&gt;</text>

  <!-- Buffer tabs -->
  <rect x="20" y="40" width="160" height="70" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="100" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Buffer 1</text>
  <text x="100" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">pipeline.py</text>
  <text x="100" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">← ACTIVE</text>

  <!-- Arrow right -->
  <text x="220" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="20" fill="#8b949e">→</text>
  <text x="220" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">Alt+&gt;</text>

  <rect x="260" y="40" width="160" height="70" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="340" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Buffer 2</text>
  <text x="340" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">config.yml</text>
  <text x="340" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">inactive</text>

  <!-- Arrow right -->
  <text x="458" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="20" fill="#8b949e">→</text>
  <text x="458" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">Alt+&gt;</text>

  <rect x="500" y="40" width="160" height="70" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="580" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Buffer 3</text>
  <text x="580" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">schema.sql</text>
  <text x="580" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">inactive</text>

  <!-- Back arrows -->
  <text x="196" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">Alt+&lt; to go back</text>
  <line x1="100" y1="112" x2="340" y2="112" stroke="#bc8cff" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr-label)"/>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Multiple Buffers — Open, Switch, Manage</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── OPEN MULTIPLE FILES AT LAUNCH ──────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> pipeline.py config.yml schema.sql  <span class="cb-cmt"># 3 files = 3 buffers</span>
<span class="cb-cmt"># Opens all 3. Navigate between them with Alt+&lt; and Alt+&gt;</span>

<span class="cb-cmt">## ─── OPEN ADDITIONAL FILE WHILE INSIDE NANO ─────────────────</span>
Ctrl+R              <span class="cb-cmt"># Read File prompt — but also opens a new buffer</span>
<span class="cb-cmt"># At the prompt: Ctrl+T to browse, or just type filename + Enter</span>
<span class="cb-cmt"># With "set multibuffer" in .nanorc, the file opens in a new buffer
# Without multibuffer, it gets inserted at cursor position</span>

<span class="cb-cmt">## ─── SWITCH BETWEEN BUFFERS ──────────────────────────────────</span>
Alt+&lt;  or  Alt+,    <span class="cb-cmt"># switch to previous buffer</span>
Alt+&gt;  or  Alt+.    <span class="cb-cmt"># switch to next buffer</span>
<span class="cb-cmt"># The title bar shows: " pipeline.py [Buffer 1 of 3] "
# Buffer wraps around: from last buffer, Alt+&gt; goes to first</span>

<span class="cb-cmt">## ─── CLOSE A BUFFER ──────────────────────────────────────────</span>
Ctrl+X              <span class="cb-cmt"># close current buffer (prompts to save if modified)
# If other buffers remain open, switches to them
# Only when last buffer is closed does nano exit</span>

<span class="cb-cmt">## ─── PRACTICAL WORKFLOW: Compare Two Config Files ────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> staging.conf production.conf
<span class="cb-cmt"># Buffer 1: staging.conf — note the value on line 7
# Alt+&gt; → switch to production.conf
# Go to line 7 to check same setting
# Alt+&lt; → back to staging to copy
# Alt+A → mark start, End → mark end
# Alt+6 → copy
# Alt+&gt; → to production
# Navigate to right spot
# Ctrl+U → paste
# Ctrl+O → save production</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — SHELL INTEGRATION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Shell Integration — Nano &amp; the Terminal Together</h2>

<!-- CONSOLE 8 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — Shell Integration, Pipes, Execute &amp; Scripting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── RUN A COMMAND AND INSERT OUTPUT ─────────────────────────</span>
Ctrl+R Ctrl+X       <span class="cb-cmt"># at "File to insert" prompt: Ctrl+X to execute instead</span>
<span class="cb-cmt"># "Command to execute: " → type the command
# Output is inserted at cursor position

# Examples:
# date              → inserts: Tue Jan 15 10:30:00 IST 2024
# hostname          → inserts server name
# python3 -c "print(2**32)"  → inserts: 4294967296
# cat /etc/hostname → inserts hostname
# git log --oneline -5       → inserts last 5 commit messages
# ls -la                     → inserts directory listing</span>

<span class="cb-cmt">## ─── EXECUTE A COMMAND WITHOUT INSERTING ─────────────────────</span>
Ctrl+T Ctrl+T       <span class="cb-cmt"># "Execute Command: " prompt
# Runs the command, shows output in a page viewer
# Press Q to return to nano</span>

<span class="cb-cmt">## ─── PIPE FILE CONTENT THROUGH A COMMAND ─────────────────────</span>
<span class="cb-cmt"># Nano doesn't have :%!sort like vim, but you can:
# 1. Ctrl+T Ctrl+T → "sort < current_file.py" to sort it externally
# 2. Or exit, sort in shell, re-open:
#    Ctrl+X → $ sort file.txt > sorted.txt → $ nano sorted.txt</span>

<span class="cb-cmt">## ─── PIPE TEXT INTO NANO FROM COMMAND LINE ───────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> "hello" | <span class="cb-cmd">nano</span>        <span class="cb-cmt"># nano opens with "hello" as content</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> file.txt | <span class="cb-cmd">nano</span>         <span class="cb-cmt"># view file content in nano interactively</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls -la</span> | <span class="cb-cmd">nano</span>               <span class="cb-cmt"># browse ls output in nano (scrollable!)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">git diff</span> | <span class="cb-cmd">nano</span>             <span class="cb-cmt"># view git diff in nano (better than less for editing)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">curl -s</span> api.example.com | <span class="cb-cmd">nano</span>  <span class="cb-cmt"># view API response in nano</span>

<span class="cb-cmt">## ─── USE NANO AS GIT EDITOR ──────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">git config</span> <span class="cb-flag">--global</span> core.editor nano  <span class="cb-cmt"># set nano as default git editor</span>
<span class="cb-cmt"># Now: git commit → opens nano for commit message
# git rebase -i   → opens nano for interactive rebase
# git merge       → opens nano for merge message</span>

<span class="cb-cmt">## ─── USE NANO FOR CRON EDITING ───────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">EDITOR=nano crontab -e</span>      <span class="cb-cmt"># edit cron jobs with nano</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">export EDITOR=nano</span>           <span class="cb-cmt"># set nano as default \$EDITOR for this session</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> 'export EDITOR=nano' >> ~/.bashrc  <span class="cb-cmt"># permanent</span>
<span class="cb-cmt"># Then: crontab -e, visudo, git commit all use nano</span>

<span class="cb-cmt">## ─── USE NANO IN SCRIPTS ──────────────────────────────────────</span>
<span class="cb-cmt"># Prompt user to review/edit a file in a script:</span>
<span class="cb-prompt">$</span> cat deploy.sh
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">CONFIG=/etc/myapp/config.yaml</span>
<span class="cb-out">nano "\$CONFIG"                    # let user edit config</span>
<span class="cb-out">echo "Config updated. Deploying..."</span>
<span class="cb-out">systemctl restart myapp</span>

<span class="cb-cmt">## ─── EDIT REMOTE FILES OVER SSH ─────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ssh</span> user@server <span class="cb-flag">-t</span> "nano /etc/hosts"  <span class="cb-cmt"># -t: force TTY allocation</span>
<span class="cb-cmt"># Opens nano on the remote server in your terminal
# Edit normally, save, exit — changes saved on server</span>

<span class="cb-cmt">## ─── MACROS (nano 7+) ─────────────────────────────────────────</span>
Alt+:               <span class="cb-cmt"># START recording keystrokes</span>
<span class="cb-cmt"># ... perform your editing actions ...</span>
Alt+:               <span class="cb-cmt"># STOP recording</span>
Alt+;               <span class="cb-cmt"># REPLAY the recorded macro</span>
<span class="cb-cmt"># Macros are session-only (not saved between sessions)
# Example: record adding a ";" to end of line + moving down
# Then replay 50 times for 50 lines</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel &amp; Terminal Deep Dive — How Nano Works Under the Hood</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ How Nano Talks to the Terminal — termios &amp; Raw Mode</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# When you launch nano, here's exactly what happens at the OS level:

1. PROCESS CREATION
   shell forks → exec("nano", ["nano", "config.py"])
   nano's main() begins — reads ~/.nanorc, processes flags

2. TERMINAL MODE SWITCH (most important step!)
   Normally the terminal is in "cooked mode":
   → input is line-buffered (you type, kernel holds until Enter)
   → Ctrl+C sends SIGINT, Ctrl+Z sends SIGTSTP
   → Backspace is handled by the kernel (not your program)

   nano calls: tcgetattr(STDIN_FILENO, &amp;saved_settings)
   Then modifies the termios struct:
   → raw.c_lflag &amp;= ~(ICANON | ECHO | ISIG)
      ICANON=0 → disable line buffering (get keys one at a time)
      ECHO=0   → don't echo typed chars (nano handles display itself)
      ISIG=0   → disable signal-generating keys (Ctrl+C no longer kills)
   → raw.c_cc[VMIN] = 1    → return after 1 byte read
   → raw.c_cc[VTIME] = 0   → no timeout (block until keypress)
   nano calls: tcsetattr(STDIN_FILENO, TCSAFLUSH, &amp;raw)
   
   Now the terminal is in "raw mode" — nano gets every keypress immediately.

3. SCREEN DRAWING
   nano writes ANSI escape sequences to stdout:
   → "\\033[2J"      = clear entire screen
   → "\\033[H"       = move cursor to top-left
   → "\\033[7m"      = reverse video (for title/status bar)
   → "\\033[0m"      = reset formatting
   → "\\033[32m"     = green text (syntax highlighting)
   nano redraws only what changed (minimal I/O for speed)

4. READING KEYPRESSES
   nano calls read(STDIN_FILENO, &amp;ch, 1) in a loop
   Each keypress returns 1-3 bytes:
   → Regular keys: 1 byte  (e.g., 'a' = 0x61)
   → Ctrl keys:    1 byte  (Ctrl+O = 0x0F, Ctrl+X = 0x18)
   → Alt keys:     2 bytes (ESC + letter: Alt+U = 0x1B 0x55)
   → Arrow keys:   3 bytes (ESC + [ + letter: ↑ = 0x1B 0x5B 0x41)
   → Function keys: 4-5 bytes escape sequences

5. EDIT OPERATIONS
   All text stored in a linked list of lines (struct filestruct)
   Each line: char* data, size_t length, struct filestruct* prev/next
   Edits mutate this in-memory structure
   Undo/redo maintained as a stack of "undo_item" structs

6. SAVING (Ctrl+O → Enter)
   nano opens the file with: open(filename, O_WRONLY|O_CREAT|O_TRUNC, 0666)
   Writes line by line using write(fd, line, len)
   If --backup flag: copies original to filename~ first
   Calls fsync(fd) to flush to disk
   Closes with close(fd)

7. EXIT (Ctrl+X)
   nano calls: tcsetattr(STDIN_FILENO, TCSAFLUSH, &amp;saved_settings)
   This RESTORES the terminal to cooked mode
   Without this step: terminal would stay in raw mode — broken!
   (This is why nano exits cleanly; killed nano can leave terminal broken
    → fix with: reset  or  stty sane)

# PERFORMANCE NOTE:
# nano redraws minimally — only changed lines
# On slow SSH (56k modem-era): nano was designed for this
# It sends ~50-200 bytes per keypress vs full-screen redraws
</pre>
</div>

<div class="two-col-grid" style="margin-top:20px;">
  <div class="callout-box info-box">
    <strong>🔧 Fix a Broken Terminal After Crash:</strong><br>
    If nano crashes without restoring terminal mode, your terminal may stop echoing input or behave strangely. Fix it:<br>
    <code>reset</code> — full terminal reset<br>
    <code>stty sane</code> — restore sane defaults<br>
    <code>tput reset</code> — alternative reset<br>
    Type the command blind if needed — it still works.
  </div>
  <div class="callout-box info-box">
    <strong>📁 Nano's Lock File:</strong><br>
    When <code>set locking</code> is in .nanorc, nano creates <code>.filename.swp</code> (or <code>.nano/filename.lock</code>) to prevent two users editing simultaneously. If nano crashes, the lock remains. Delete it manually: <code>rm .pipeline.py.swp</code>. Nano will warn you on next open if a lock exists.
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — NANO FOR DATA ENGINEERING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Nano for Data Engineering — Real Workflows</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Data Engineering Workflows in Nano</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── EDITING CRON JOBS ────────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">EDITOR=nano crontab -e</span>
<span class="cb-cmt"># Opens your crontab in nano
# Cron format: MIN HOUR DOM MON DOW COMMAND
# Example lines to add:</span>
<span class="cb-out">0 2 * * * /home/ravi/pipelines/daily_load.sh >> /var/log/daily.log 2>&amp;1</span>
<span class="cb-out">*/15 * * * * python3 /home/ravi/pipelines/check_lag.py</span>
<span class="cb-cmt"># Ctrl+O → Enter → save,  Ctrl+X → exit
# Cron re-reads automatically when you exit</span>

<span class="cb-cmt">## ─── EDITING /etc/hosts (common in data infra) ───────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo nano</span> <span class="cb-flag">-B -w -c</span> /etc/hosts
<span class="cb-cmt"># -B: backup original, -w: no wrapping, -c: show position
# Add mapping: Ctrl+End → new line → type:
# 10.0.0.5   spark-master.internal spark-master
# Ctrl+O → Enter → Ctrl+X</span>

<span class="cb-cmt">## ─── EDITING SPARK CONFIG FILES ──────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo nano</span> /etc/spark/spark-defaults.conf
<span class="cb-cmt"># Find the memory setting:</span>
Ctrl+W              <span class="cb-cmt"># type: executor.memory → Enter</span>
<span class="cb-cmt"># Cursor jumps to the line
# Edit the value
# Ctrl+O → Enter → save</span>

<span class="cb-cmt">## ─── QUICK PYTHON SCRIPT EDIT ON SERVER ─────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-l -i -E -T 4</span> pipeline.py
<span class="cb-cmt"># line numbers + autoindent + tabs→spaces + 4-space tabs
# Perfect for Python editing without a full IDE</span>

<span class="cb-cmt">## ─── VIEWING LARGE LOG FILES ─────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-v -l -y -c</span> /var/log/spark/driver.log
<span class="cb-cmt"># read-only + lines + softwrap + position
# Ctrl+W → type "ERROR" → Enter  (find errors)
# Alt+W → find next error
# Ctrl+/ → 1 → Enter (jump to line 1 for beginning)
# Ctrl+End → jump to last log entry</span>

<span class="cb-cmt">## ─── EDITING YAML PIPELINE CONFIGS ──────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-l -c -i -E -T 2</span> airflow_dag.yml
<span class="cb-cmt"># 2-space tabs for YAML
# Alt+P → show whitespace (see if tabs/spaces mixed — YAML breaks with mixed!)
# Search for a key: Ctrl+W → "schedule_interval"
# Ctrl+\ → replace "0 2 * * *" with "0 6 * * 1" (change schedule)</span>

<span class="cb-cmt">## ─── EDITING ENVIRONMENT FILES (.env) ───────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-w</span> .env
<span class="cb-cmt"># -w: no wrapping (connection strings can be long)
# Use Ctrl+W to find DB_HOST, DB_PASS etc.
# NEVER commit this file — check .gitignore first!</span>

<span class="cb-cmt">## ─── QUICK SQL QUERY EDITING ─────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-Y sql -l -c</span> query.sql
<span class="cb-cmt"># Force SQL highlighting + line numbers + position
# Then run: psql -f query.sql  or  mysql < query.sql</span>

<span class="cb-cmt">## ─── BATCH EDIT MULTIPLE CONFIGS ────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> dev.conf staging.conf prod.conf
<span class="cb-cmt"># 3 buffers, Alt+&gt; to cycle through them
# Search-replace in each: Ctrl+\ → find → replace → A (all)</span>

<span class="cb-cmt">## ─── USE AS PAGER FOR PIPELINE OUTPUT ───────────────────────</span>
<span class="cb-prompt">$</span> python3 run_pipeline.py 2>&amp;1 | <span class="cb-cmd">nano</span>
<span class="cb-cmt"># Capture all output (stdout+stderr) into nano
# Now searchable, navigable — better than scrolling terminal</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 15 — TIPS, TRICKS & COMMON GOTCHAS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Tips, Tricks &amp; Common Gotchas</h2>

<div class="two-col-grid">
  <div class="card info-card">
    <div class="type-badge badge-info">💡 PRO TIPS</div>
    <ul style="color:#e6edf3;padding-left:18px;line-height:2.4;font-size:13.5px;margin-top:8px;">
      <li>Press <strong>Ctrl+G</strong> inside nano to open built-in help — all shortcuts listed there</li>
      <li>Use <strong>Alt+Z</strong> for distraction-free mode — hides title bar and shortcuts</li>
      <li>Use <strong>Alt+D</strong> to count words/lines/chars (great for docs)</li>
      <li><strong>Ctrl+\</strong> then <strong>A</strong> at confirm = replace ALL — no need to press Y every time</li>
      <li>Pipe into nano: <code>command | nano</code> — makes any output searchable</li>
      <li>Use <strong>Alt+N</strong> to toggle line numbers — helpful when debugging with error line numbers</li>
      <li>Position log (<code>set positionlog</code>) remembers where you were in each file</li>
      <li>Alt+3 (nano 7.1+) comments/uncomments current line — works for Python, bash, config files</li>
    </ul>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">⚠️ COMMON GOTCHAS</div>
    <ul style="color:#e6edf3;padding-left:18px;line-height:2.4;font-size:13.5px;margin-top:8px;">
      <li><strong>Ctrl+S freezes terminal</strong> — press Ctrl+Q to unfreeze. Add <code>stty -ixon</code> to .bashrc to fix permanently</li>
      <li><strong>Alt key not working?</strong> — try Esc instead (press Esc, release, then press the letter)</li>
      <li><strong>No undo?</strong> — nano before v2.3 had no undo. Check version: <code>nano --version</code></li>
      <li><strong>Tabs vs spaces</strong> — for Python/YAML always use <code>-E</code> flag or <code>set tabstospaces</code></li>
      <li><strong>Accidental Ctrl+K</strong> — immediately press Ctrl+U to uncut/restore</li>
      <li><strong>Modified flag never clears</strong> — you must save with Ctrl+O for it to show as unmodified</li>
      <li><strong>nano opens but can't write</strong> — check file permissions: <code>ls -la file</code>, use sudo if needed</li>
      <li><strong>Arrow keys show A B C D?</strong> — terminal issue, not nano. Try <code>TERM=xterm nano file</code></li>
    </ul>
  </div>
</div>

<div class="console-block" style="margin-top:20px;">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Troubleshooting Common Nano Issues</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── TERMINAL FROZEN AFTER Ctrl+S ────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">Ctrl+Q</span>               <span class="cb-cmt"># unfreeze (XON = resume output)</span>
<span class="cb-cmt"># Permanent fix — add to ~/.bashrc:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> 'stty -ixon' >> ~/.bashrc
<span class="cb-prompt">$</span> <span class="cb-cmd">source</span> ~/.bashrc    <span class="cb-cmt"># apply now</span>

<span class="cb-cmt">## ─── ALT KEY NOT WORKING (common on macOS / some SSH clients) ─</span>
<span class="cb-cmt"># Use Esc as Alt:
# Alt+U → press Esc, release, then press U
# This works everywhere as fallback</span>
<span class="cb-cmt"># On macOS Terminal: Preferences → Profiles → Keyboard → ✓ "Use Option as Meta key"</span>

<span class="cb-cmt">## ─── RESTORE MESSED UP TERMINAL ─────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">reset</span>                <span class="cb-cmt"># full terminal reset</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">stty sane</span>            <span class="cb-cmt"># restore sane terminal settings</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">tput reset</span>           <span class="cb-cmt"># alternative (uses terminfo)</span>

<span class="cb-cmt">## ─── NANO SAYS "File exists, OVERWRITE?" ─────────────────────</span>
<span class="cb-cmt"># This is normal when saving a new name over an existing file
# Press Y to overwrite, N to type a different name</span>

<span class="cb-cmt">## ─── WRONG ARROW KEYS (A B C D appearing) ────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">TERM=xterm nano</span> file.txt   <span class="cb-cmt"># force xterm terminal type</span>
<span class="cb-cmt"># Or add to ~/.bashrc: export TERM=xterm-256color</span>

<span class="cb-cmt">## ─── NANO WON'T OPEN / PERMISSION DENIED ────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls -la</span> /etc/hosts     <span class="cb-cmt"># check file permissions</span>
<span class="cb-out">-rw-r--r-- 1 root root 221 /etc/hosts</span>
<span class="cb-cmt"># Only root can write — use sudo:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo nano</span> /etc/hosts

<span class="cb-cmt">## ─── RECOVERING FROM ACCIDENTAL CTRL+K ──────────────────────</span>
<span class="cb-cmt"># Pressed Ctrl+K and deleted something important?
# Immediately press Ctrl+U — it pastes back what was just cut!
# If you pressed something else after Ctrl+K, use Alt+U (undo)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 16 — EXERCISES WITH SOLUTIONS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — First Edit &amp; Save</h4>
    <p>Your first nano task — the exact same thing Ravi had to do on Day 71:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create a file: <code>nano spark.conf</code></li>
      <li>Type these 5 lines exactly:<br>
        <code style="display:block;background:#161b22;padding:8px;margin:6px 0;border-radius:4px;">spark.master          local[*]<br>spark.executor.memory 2g<br>spark.driver.memory   4g<br>spark.sql.partitions  200<br>spark.log.level       DEBUG</code>
      </li>
      <li>Save: <code>Ctrl+O → Enter</code></li>
      <li>Find the memory line: <code>Ctrl+W → executor → Enter</code></li>
      <li>Change "2g" to "8g": position cursor on "2", select it, retype "8g"</li>
      <li>Change "DEBUG" to "WARN": <code>Ctrl+\ → DEBUG → Enter → WARN → Enter → Y</code></li>
      <li>Check position: <code>Ctrl+C</code> — note what line you're on</li>
      <li>Save and exit: <code>Ctrl+O → Enter → Ctrl+X</code></li>
      <li>Verify: <code>cat spark.conf</code></li>
    </ol>
    <p><strong>Expected result:</strong> File saved with executor.memory=8g and log.level=WARN</p>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Navigation &amp; Search</h4>
    <p>Create a 30-line Python file with repeating patterns:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">for i in range(30):
    print(f"Line {i}: localhost connection to port 3306")</pre>
    <p>Generate with: <code>python3 -c "..." > test.py</code>, then open with <code>nano -l -c test.py</code></p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Jump to line 15: <code>Ctrl+/ → 15 → Enter</code></li>
      <li>Show position: <code>Ctrl+C</code> — confirm you're at line 15</li>
      <li>Jump to end: <code>Ctrl+End</code></li>
      <li>Jump to beginning: <code>Ctrl+Home</code></li>
      <li>Search for "localhost": <code>Ctrl+W → localhost → Enter</code></li>
      <li>Find next: <code>Alt+W</code> — navigate all 30 occurrences</li>
      <li>Replace all "localhost" with "db.prod": <code>Ctrl+\ → localhost → Enter → db.prod → Enter → A</code></li>
      <li>Verify change: <code>Ctrl+Home → Ctrl+W → db.prod → Enter</code></li>
      <li>Exit without saving: <code>Ctrl+X → N</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Cut, Copy, Paste &amp; Multi-Buffer</h4>
    <p>Create two config files:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;"># dev.conf
db.host=localhost
db.port=5432
db.name=analytics_dev
log.level=DEBUG
max.connections=5

# prod.conf  
db.host=prod-db.internal
db.port=5432
db.name=analytics_prod
log.level=WARN
max.connections=50</pre>
    <p>Open both: <code>nano dev.conf prod.conf</code></p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>In dev.conf: copy the entire <code>db.host</code> line using <code>Alt+A → End → Alt+6</code></li>
      <li>Switch to prod.conf: <code>Alt+&gt;</code></li>
      <li>Find the db.host line: <code>Ctrl+W → db.host → Enter</code></li>
      <li>Cut the prod db.host line: <code>Ctrl+K</code></li>
      <li>Paste the dev line you copied: <code>Ctrl+U</code></li>
      <li>Switch back to dev.conf: <code>Alt+&lt;</code></li>
      <li>Cut lines 3-5 (db.name, log.level, max.connections): position on line 3, <code>Ctrl+K Ctrl+K Ctrl+K</code></li>
      <li>Switch to prod.conf: <code>Alt+&gt;</code></li>
      <li>Navigate to end: <code>Ctrl+End</code></li>
      <li>Paste the 3 lines: <code>Ctrl+U</code></li>
      <li>Save both: <code>Ctrl+O → Enter</code> (in each buffer)</li>
      <li>Close both: <code>Ctrl+X → Ctrl+X</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — .nanorc Setup &amp; Syntax Highlighting</h4>
    <p>Create your personal <code>~/.nanorc</code> and verify it works:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Open: <code>nano ~/.nanorc</code></li>
      <li>Add these settings (type them yourself for muscle memory):
        <pre style="background:#161b22;padding:10px;border-radius:4px;font-family:monospace;font-size:12px;color:#e6edf3;margin:8px 0;">set linenumbers
set constantshow
set autoindent
set tabsize 4
set tabstospaces
set mouse
set softwrap
set positionlog
include "/usr/share/nano/*.nanorc"
bind ^S savefile main
bind ^Z undo main</pre>
      </li>
      <li>Save: <code>Ctrl+O → Enter → Ctrl+X</code></li>
      <li>Test: <code>nano pipeline.py</code> — do you see line numbers? Position at bottom?</li>
      <li>Test syntax: does Python code get coloured?</li>
      <li>Test Ctrl+S: does it save now? (You rebound it in step 2)</li>
      <li>Test Tab: press Tab — do you get spaces instead of a tab character? (Use <code>Alt+P</code> to see)</li>
      <li>Test position memory: go to line 20, exit, reopen — does it remember line 20?</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — The Full Server Workflow</h4>
    <p>Simulate the complete workflow of editing a production server config using only nano:</p>
    <p><strong>Scenario:</strong> Your company's Airflow DAG has the wrong database connection. You need to find and fix 3 config files, create a change log, and leave no backup clutter.</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create 3 files: <code>airflow.cfg</code>, <code>connections.json</code>, <code>variables.yaml</code> — each with realistic content containing <code>old-db.internal</code></li>
      <li>Open all 3: <code>nano airflow.cfg connections.json variables.yaml</code></li>
      <li>In <strong>airflow.cfg</strong>: use <code>Ctrl+\</code> to replace all <code>old-db.internal</code> with <code>new-db.cluster.internal</code></li>
      <li>Switch to <strong>connections.json</strong> with <code>Alt+&gt;</code>: make the same replacement</li>
      <li>Switch to <strong>variables.yaml</strong>: make the same replacement</li>
      <li>Save all 3 files (one at a time with <code>Ctrl+O → Enter</code> in each buffer)</li>
      <li>Without exiting, create a changelog: <code>Ctrl+R Ctrl+X → date</code> to insert current date at top of airflow.cfg</li>
      <li>Add a comment above it: navigate to top (<code>Ctrl+Home</code>), new line, type: <code># Updated: db host changed to new cluster</code></li>
      <li>Count words in airflow.cfg: <code>Alt+D</code></li>
      <li>Turn off syntax highlighting briefly: <code>Alt+Y</code> (see the difference), toggle back on</li>
      <li>Exit all buffers: <code>Ctrl+X</code> three times</li>
      <li>Verify all changes: <code>grep -r "new-db" *.cfg *.json *.yaml</code></li>
    </ol>
    <p><strong>Bonus challenge:</strong> Use the macro feature (nano 7+): record <code>Alt+: → Ctrl+W → old-db → Enter → Alt+: </code> to record a "jump to old-db" macro, then replay it with <code>Alt+;</code> to verify no old-db references remain.</p>
  </div>
</div>


<!-- ══════════════════════════════════════════════════════
     SECTION 17 — WORD COUNT, SPELL CHECK & JUSTIFY
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Word Count, Spell Check &amp; Text Justification</h2>

<p>Nano isn't just for code — data engineers write documentation, README files, analysis reports, and data dictionaries. These features make that work professional and error-free.</p>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Word Count, Spell Check &amp; Justify — Full Coverage</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ WORD COUNT ════════════════════════════════════════════</span>
Alt+D               <span class="cb-cmt"># display word/line/character count for current file</span>
<span class="cb-cmt"># Output in status bar (bottom):
# "Words: 1,243  Lines: 87  Chars: 7,891"
# Use for: README word limits, report length checks, data dictionary sizing</span>

<span class="cb-cmt"># Count words of a SELECTION only:
# Alt+A → mark start
# move to end of selection
# Alt+D → shows count for selected region only</span>

<span class="cb-cmt"># Shell alternative — count without opening nano:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">wc</span> <span class="cb-flag">-l -w -c</span> README.md
<span class="cb-out">  87  1243  7891 README.md</span>
<span class="cb-cmt"># lines  words  chars</span>

<span class="cb-cmt">## ═══ SPELL CHECK ════════════════════════════════════════════</span>
<span class="cb-cmt"># Nano uses an external spell checker (spell, aspell, or hunspell)</span>

<span class="cb-cmt"># Install a spell checker first:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo apt install</span> aspell aspell-en    <span class="cb-cmt"># recommended (best interface)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo apt install</span> hunspell           <span class="cb-cmt"># alternative</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo apt install</span> spell              <span class="cb-cmt"># minimal (less friendly)</span>

<span class="cb-cmt"># Configure spell checker in ~/.nanorc:</span>
<span class="cb-cmt"># set speller "aspell -x -c"</span>
<span class="cb-cmt"># set speller "hunspell -l"</span>

<span class="cb-cmt"># Run spell check inside nano:</span>
Ctrl+T              <span class="cb-cmt"># triggers spell checker (if configured as speller)</span>
<span class="cb-cmt"># aspell interface:
# Each misspelled word highlighted
# Numbered list of suggestions shown
# Press number → accept suggestion
# Press 'i'    → ignore this occurrence
# Press 'a'    → accept (add to personal dictionary)
# Press 'r'    → type replacement manually
# Press 'x'    → exit spell check</span>

<span class="cb-cmt"># Specify language for spell check:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-s "aspell -x -c --lang=en_GB"</span> document.md
<span class="cb-cmt"># British English spell checking</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-s "aspell -x -c --lang=en_US"</span> document.md
<span class="cb-cmt"># American English</span>

<span class="cb-cmt"># Pre-check before opening nano:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">aspell check</span> README.md             <span class="cb-cmt"># interactive check in terminal</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">aspell list</span> < README.md            <span class="cb-cmt"># just print misspelled words</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">hunspell</span> <span class="cb-flag">-l</span> README.md             <span class="cb-cmt"># list misspelled words (hunspell)</span>

<span class="cb-cmt">## ═══ JUSTIFY / TEXT WRAP ════════════════════════════════════</span>
Ctrl+J              <span class="cb-cmt"># justify current PARAGRAPH (re-wrap to fill line width)</span>
Alt+J               <span class="cb-cmt"># justify ENTIRE file</span>

<span class="cb-cmt"># What justify does:
# Takes a paragraph (text block separated by blank lines)
# Merges its lines into one long paragraph
# Then re-wraps at the wrap column (default 72, or --fill N)
#
# Before justify:
# "This is a very  long
#  line that is badly
#  wrapped."
#
# After Ctrl+J:
# "This is a very long line that is badly wrapped."  ← clean single paragraph</span>

<span class="cb-cmt"># Set fill column for justify:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">--fill=80</span> README.md           <span class="cb-cmt"># wrap at 80 characters</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">--fill=72</span> email_draft.txt     <span class="cb-cmt"># 72 chars (email convention)</span>
<span class="cb-cmt"># Or in ~/.nanorc: set fill 80</span>

<span class="cb-cmt"># Unjustify (undo justify):</span>
Alt+U               <span class="cb-cmt"># undo — reverts the justify operation</span>

<span class="cb-cmt"># Hard wrap vs soft wrap:
# Hard wrap (default): actually inserts newlines in file at wrap column
# Soft wrap (set softwrap in .nanorc): visually wraps but no newlines added
#
# For prose/docs: use hard wrap (Ctrl+J to clean up)
# For code/config: use soft wrap (--softwrap flag)</span>

Alt+L               <span class="cb-cmt"># toggle hard wrap on/off while editing</span>
Alt+I               <span class="cb-cmt"># toggle auto-indent on/off while editing</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 18 — MACROS: RECORD & REPLAY
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Macros — Record &amp; Replay Keystrokes (Nano 7+)</h2>

<p>Since nano 7.0, you can record a sequence of keystrokes and replay it — perfect for repetitive edits across many lines. Not as powerful as Vim macros, but enough for 80% of real tasks.</p>

<!-- Macro flow SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 140" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:0 auto 16px;">
  <rect width="760" height="140" fill="#0d1117" rx="10"/>
  <text x="380" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Nano Macro Lifecycle — Record → Store → Replay</text>

  <!-- Step 1 -->
  <rect x="20" y="38" width="155" height="70" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="97" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">① Start Recording</text>
  <text x="97" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">Alt + :</text>
  <text x="97" y="97" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">status bar shows: "Recording..."</text>

  <!-- Arrow -->
  <line x1="176" y1="73" x2="210" y2="73" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-label)"/>

  <!-- Step 2 -->
  <rect x="212" y="38" width="175" height="70" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="299" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">② Do Your Edits</text>
  <text x="299" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">End → ; → Down</text>
  <text x="299" y="97" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">every keypress is recorded</text>

  <!-- Arrow -->
  <line x1="388" y1="73" x2="422" y2="73" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-label)"/>

  <!-- Step 3 -->
  <rect x="424" y="38" width="155" height="70" rx="8" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="501" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">③ Stop Recording</text>
  <text x="501" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">Alt + :</text>
  <text x="501" y="97" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">macro stored in memory</text>

  <!-- Arrow -->
  <line x1="580" y1="73" x2="614" y2="73" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-label)"/>

  <!-- Step 4 -->
  <rect x="616" y="38" width="125" height="70" rx="8" fill="#2a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="678" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">④ Replay</text>
  <text x="678" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">Alt + ;</text>
  <text x="678" y="97" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">repeats as many times as needed</text>

  <text x="380" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">One macro slot in memory — new recording overwrites old. Not saved between sessions.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Macros — Record, Replay &amp; Practical Examples</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── BASIC MACRO USAGE ────────────────────────────────────────</span>
Alt+:               <span class="cb-cmt"># START recording (status bar: "Recording...")</span>
<span class="cb-cmt"># ... perform your editing keystrokes ...</span>
Alt+:               <span class="cb-cmt"># STOP recording (status bar: "Stopped recording")</span>
Alt+;               <span class="cb-cmt"># REPLAY the recorded macro once</span>
<span class="cb-cmt"># Press Alt+; again → replay again
# No count prefix (unlike vim's 50@a) — press repeatedly</span>

<span class="cb-cmt">## ─── PRACTICAL EXAMPLE 1: Add semicolon to end of each line ───</span>
<span class="cb-cmt"># File content:
# INSERT INTO users VALUES (1, 'Ravi')
# INSERT INTO users VALUES (2, 'Priya')
# INSERT INTO users VALUES (3, 'Arjun')
#
# Task: add ; to end of each line
#
# 1. Position cursor at start of line 1
# 2. Alt+: (start recording)
# 3. End → go to end of line
# 4. Type: ;
# 5. Down Arrow → move to next line
# 6. Home → go to start of line
# 7. Alt+: (stop recording)
# 8. Alt+; × 2 → apply to lines 2 and 3
# Result: all 3 lines end with ;</span>

<span class="cb-cmt">## ─── PRACTICAL EXAMPLE 2: Comment out lines ──────────────────</span>
<span class="cb-cmt"># Task: add "# " prefix to each of 20 config lines
#
# 1. Go to first line, Home
# 2. Alt+: (record)
# 3. Home → go to start of line
# 4. Type: # (with space after)
# 5. Down Arrow → next line
# 6. Alt+: (stop)
# 7. Alt+; × 19 → apply to remaining 19 lines</span>

<span class="cb-cmt">## ─── PRACTICAL EXAMPLE 3: Normalize CSV ──────────────────────</span>
<span class="cb-cmt"># CSV with inconsistent spacing: "  Ravi  ,  Mumbai  ,  42  "
# Task: trim spaces around commas
#
# Use search-replace instead for this:
# Ctrl+\ → " , " → "," → A (all instances)</span>

<span class="cb-cmt">## ─── PRACTICAL EXAMPLE 4: Add line numbers to output ─────────</span>
<span class="cb-cmt"># Instead of macros, use shell:
# Before opening nano:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> <span class="cb-flag">-n</span> file.txt > numbered.txt   <span class="cb-cmt"># add line numbers</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nl</span> file.txt > numbered.txt        <span class="cb-cmt"># alternative: nl command</span>

<span class="cb-cmt">## ─── MACRO LIMITATIONS ────────────────────────────────────────</span>
<span class="cb-cmt"># ⚠ Only ONE macro can be stored at a time
# ⚠ Macros NOT saved between sessions (unlike vim's registers)
# ⚠ No named macros (vim has a-z registers)
# ⚠ No count replay (must press Alt+; multiple times)
# ⚠ Available only in nano 7.0+ (check: nano --version)
#
# For complex repetitive edits → use sed/awk/python instead:
# sed 's/$/;/' file.txt → adds ; to end of every line
# awk '{print $0 ";"}' file.txt → same with awk</span>

<span class="cb-cmt">## ─── WHEN TO USE SHELL INSTEAD OF MACROS ─────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sed</span> <span class="cb-flag">-i</span> 's/DEBUG/WARN/g' *.conf    <span class="cb-cmt"># replace across all .conf files</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sed</span> <span class="cb-flag">-i</span> 's/^/# /' config.py         <span class="cb-cmt"># comment every line</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sed</span> <span class="cb-flag">-n</span> '10,20p' big.log            <span class="cb-cmt"># extract lines 10-20</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">awk</span> '{print NR": "\$0}' file.txt    <span class="cb-cmt"># add line numbers</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sort</span> file.txt | <span class="cb-cmd">uniq</span>               <span class="cb-cmt"># sort and deduplicate</span>
<span class="cb-cmt"># These are MORE powerful than macros for bulk operations</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 19 — UNICODE, DOS/MAC LINE ENDINGS, ENCODINGS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Unicode, Encodings &amp; Line Ending Conversions</h2>

<p>Data engineers constantly deal with files from different systems — Windows CSVs with CRLF, JSON with UTF-8 BOM, logs with mixed encodings. Nano handles all of this.</p>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Encodings, Unicode, DOS/Mac Line Endings</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── DETECTING FILE ENCODING & LINE ENDINGS ──────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">file</span> data.csv
<span class="cb-out">data.csv: UTF-8 Unicode text, with CRLF line terminators</span>
<span class="cb-cmt"># CRLF = Windows line endings (\r\n) — common in downloaded CSVs</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">file</span> report.txt
<span class="cb-out">report.txt: ASCII text</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">hexdump</span> <span class="cb-flag">-C</span> data.csv | head -2
<span class="cb-out">0000  64 61 74 65 2c 73 61 6c  65 73 0d 0a 32 30 32 34  |date,sales..2024|</span>
<span class="cb-cmt"># 0d 0a = \r\n = CRLF (Windows). In nano these show as ^M at line end</span>

<span class="cb-cmt">## ─── WHAT WINDOWS CRLF LOOKS LIKE IN NANO ────────────────────</span>
<span class="cb-cmt"># When you open a Windows file, nano shows ^M at the end of each line:
# "2024-01-15,5421,Mumbai^M"
# The ^M is the carriage return (\r) — harmless visually but breaks:
# → bash scripts (scripts fail with "command not found" for Windows scripts)
# → Python csv.reader (may include \r in field values)
# → YAML/JSON parsers</span>

<span class="cb-cmt">## ─── CONVERT CRLF → LF (remove Windows line endings) ────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sed</span> <span class="cb-flag">-i</span> 's/\r//' data.csv           <span class="cb-cmt"># in-place removal of \r</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">dos2unix</span> data.csv                  <span class="cb-cmt"># dedicated tool (apt install dos2unix)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">dos2unix</span> <span class="cb-flag">-k</span> data.csv              <span class="cb-cmt"># -k: keep file timestamp</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">dos2unix</span> *.csv                     <span class="cb-cmt"># convert all CSVs at once</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">tr</span> <span class="cb-flag">-d</span> '\r' < data.csv > clean.csv  <span class="cb-cmt"># using tr (always available)</span>

<span class="cb-cmt">## ─── CONVERT LF → CRLF (for Windows recipients) ─────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">unix2dos</span> report.txt               <span class="cb-cmt"># convert to Windows format</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sed</span> <span class="cb-flag">-i</span> 's/\n/\r\n/' report.txt    <span class="cb-cmt"># sed alternative</span>

<span class="cb-cmt">## ─── NANO'S BUILT-IN CONVERSION ──────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> data.csv                      <span class="cb-cmt"># opens CRLF file — nano auto-detects</span>
<span class="cb-cmt"># Nano READS CRLF correctly — no display issues in nano 5+
# When saving: nano preserves the original line ending format
# To FORCE Unix (LF only) on save:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-N</span> data.csv                   <span class="cb-cmt"># -N: --noconvert: don't auto-convert</span>
<span class="cb-cmt"># Then: Ctrl+O → at filename prompt, use Alt+D → switch to Unix mode</span>

<span class="cb-cmt">## ─── UNICODE & UTF-8 IN NANO ─────────────────────────────────</span>
<span class="cb-cmt"># Nano fully supports UTF-8 (compiled with --enable-utf8)
# You can type/display: Hindi, Chinese, Arabic, Emoji, math symbols</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> <span class="cb-flag">-u</span> hindi.txt                 <span class="cb-cmt"># -u: enable undo (also signals UTF-8 mode)</span>
<span class="cb-cmt"># Type Hindi in Insert mode: works if terminal supports UTF-8
# Verify terminal UTF-8: echo \$LANG → should show "en_IN.UTF-8" or similar</span>

<span class="cb-cmt"># Insert a Unicode character by code point:</span>
<span class="cb-cmt"># In insert mode: Ctrl+Shift+U → then type hex codepoint → Enter
# Example: Ctrl+Shift+U → 20B9 → Enter → inserts ₹ (Indian Rupee)
# Example: Ctrl+Shift+U → 03B1 → Enter → inserts α (alpha)
# Example: Ctrl+Shift+U → 2713 → Enter → inserts ✓ (checkmark)
# This is a terminal feature, not nano-specific</span>

<span class="cb-cmt">## ─── CHECK IF TERMINAL SUPPORTS UTF-8 ───────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> <span class="cb-str">\$LANG</span>
<span class="cb-out">en_IN.UTF-8</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">locale</span>
<span class="cb-out">LANG=en_IN.UTF-8</span>
<span class="cb-out">LC_ALL=en_IN.UTF-8</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> "₹ α ✓ → ←"          <span class="cb-cmt"># if these display correctly: UTF-8 works</span>

<span class="cb-cmt">## ─── UTF-8 BOM (Byte Order Mark) — Common Windows Problem ───</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">hexdump</span> <span class="cb-flag">-C</span> data.csv | head -1
<span class="cb-out">0000  ef bb bf 64 61 74 65 2c  |...date,|</span>
<span class="cb-cmt"># ef bb bf = UTF-8 BOM — Excel adds this. Breaks many Linux tools.
# Remove BOM:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sed</span> <span class="cb-flag">-i</span> 's/\xef\xbb\xbf//' data.csv
<span class="cb-prompt">$</span> <span class="cb-cmd">tail</span> <span class="cb-flag">-c +4</span> data.csv > nobom.csv  <span class="cb-cmt"># skip first 3 BOM bytes</span>

<span class="cb-cmt">## ─── MAC LINE ENDINGS (old Mac OS 9, CR only \r) ─────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">file</span> old_mac.txt
<span class="cb-out">old_mac.txt: ASCII text, with CR line terminators</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">tr</span> '\r' '\n' < old_mac.txt > fixed.txt  <span class="cb-cmt"># convert CR to LF</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">mac2unix</span> old_mac.txt                    <span class="cb-cmt"># if mac2unix available</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 20 — NANO SCRIPTING & AUTOMATION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Nano in Scripts &amp; Automation</h2>

<p>Nano isn't just interactive — it integrates into shell scripts, CI/CD pipelines, and automation workflows in ways most people never discover.</p>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Nano Scripting — Stdin Pipes, Here-Doc, Automation Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── NANO FROM STDIN (pipe text into nano) ───────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> "hello world" | <span class="cb-cmd">nano</span>         <span class="cb-cmt"># edit piped content</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> file.txt | <span class="cb-cmd">nano</span>              <span class="cb-cmt"># view and edit file via pipe</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">command</span> | <span class="cb-cmd">nano</span> <span class="cb-flag">-</span>               <span class="cb-cmt"># '-' explicitly means stdin</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">curl</span> <span class="cb-flag">-s</span> https://api.example.com/config | <span class="cb-cmd">nano</span>
<span class="cb-cmt"># Useful when: API returns config you want to view and edit before applying</span>

<span class="cb-cmt">## ─── HERE-DOC TO CREATE FILES WITH NANO ─────────────────────</span>
<span class="cb-cmt"># Create file content and immediately open in nano for editing:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nano</span> pipeline.sh << 'EOF'
#!/bin/bash
# Data Pipeline Script — edit me
SOURCE_DIR=/data/raw
OUTPUT_DIR=/data/processed
python3 transform.py \$SOURCE_DIR \$OUTPUT_DIR
EOF
<span class="cb-cmt"># The here-doc creates a temp buffer that nano opens for editing</span>

<span class="cb-cmt">## ─── NANO IN SHELL SCRIPTS (interactive editing flow) ────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> deploy_config.sh
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">set -e</span>
<span class="cb-out">CONFIG_FILE="/etc/myapp/production.yaml"</span>
<span class="cb-out"></span>
<span class="cb-out"># Make a backup</span>
<span class="cb-out">cp "\$CONFIG_FILE" "\${CONFIG_FILE}.bak.\$(date +%Y%m%d_%H%M%S)"</span>
<span class="cb-out"></span>
<span class="cb-out"># Let operator review and edit config</span>
<span class="cb-out">echo "Opening config for review. Save (Ctrl+O) then exit (Ctrl+X) to continue."</span>
<span class="cb-out">nano "\$CONFIG_FILE"</span>
<span class="cb-out"></span>
<span class="cb-out"># Validate YAML after edit</span>
<span class="cb-out">python3 -c "import yaml; yaml.safe_load(open('\$CONFIG_FILE'))" && echo "YAML valid" || {</span>
<span class="cb-out">    echo "ERROR: Invalid YAML! Restoring backup."</span>
<span class="cb-out">    cp "\${CONFIG_FILE}.bak.\$(date +%Y%m%d_%H%M%S)" "\$CONFIG_FILE"</span>
<span class="cb-out">    exit 1</span>
<span class="cb-out">}</span>
<span class="cb-out">echo "Config updated. Restarting service..."</span>
<span class="cb-out">systemctl restart myapp</span>

<span class="cb-cmt">## ─── TMPFILE PATTERN (edit and capture result) ────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> capture_edit.sh
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">TMPFILE=\$(mktemp /tmp/nano_edit.XXXXXX)</span>
<span class="cb-out">echo "# Write your SQL query below:" > "\$TMPFILE"</span>
<span class="cb-out">echo "SELECT * FROM sales WHERE date = '2024-01-15';" >> "\$TMPFILE"</span>
<span class="cb-out">nano "\$TMPFILE"</span>
<span class="cb-out"># After user edits and exits nano, run the query:</span>
<span class="cb-out">QUERY=\$(cat "\$TMPFILE" | grep -v '^#')</span>
<span class="cb-out">echo "Running: \$QUERY"</span>
<span class="cb-out">psql -d analytics -c "\$QUERY"</span>
<span class="cb-out">rm "\$TMPFILE"</span>

<span class="cb-cmt">## ─── SETTING NANO AS SYSTEM EDITOR ──────────────────────────</span>
<span class="cb-cmt"># For current session:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">export</span> EDITOR=nano
<span class="cb-prompt">$</span> <span class="cb-cmd">export</span> VISUAL=nano

<span class="cb-cmt"># Permanent (add to ~/.bashrc):</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> 'export EDITOR=nano' >> ~/.bashrc
<span class="cb-prompt">$</span> <span class="cb-cmd">echo</span> 'export VISUAL=nano' >> ~/.bashrc

<span class="cb-cmt"># System-wide default editor (update-alternatives):</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo update-alternatives</span> <span class="cb-flag">--config editor</span>
<span class="cb-out">There are 3 choices for the alternative editor:</span>
<span class="cb-out">  1  /bin/nano    40    auto mode</span>
<span class="cb-out">  2  /usr/bin/vim.basic  30   manual mode</span>
<span class="cb-out">  3  /usr/bin/vim.tiny   10   manual mode</span>
<span class="cb-out">Press &lt;enter&gt; to keep the current choice, or type selection number: 1</span>

<span class="cb-cmt">## ─── NON-INTERACTIVE EDITS (use sed/awk instead of nano) ─────</span>
<span class="cb-cmt"># For CI/CD pipelines, never use interactive nano
# Use sed for line replacements:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sed</span> <span class="cb-flag">-i</span> "s/version: .*/version: \${NEW_VERSION}/" config.yaml
<span class="cb-prompt">$</span> <span class="cb-cmd">sed</span> <span class="cb-flag">-i</span> "s/DEBUG/WARN/g" application.properties
<span class="cb-prompt">$</span> <span class="cb-cmd">python3</span> <span class="cb-flag">-c</span> "
import yaml
with open('config.yaml') as f: cfg = yaml.safe_load(f)
cfg['database']['host'] = 'new-db.prod'
with open('config.yaml', 'w') as f: yaml.dump(cfg, f)
"
<span class="cb-cmt"># These are reproducible, scriptable, and work without a terminal</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 21 — ADVANCED .NANORC: KEYBINDINGS & COLOURS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Advanced <code>.nanorc</code> — Custom Keybindings &amp; Full Colour Themes</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Advanced .nanorc — All bind Options, Colour System, Per-filetype Config</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── KEYBINDING SYNTAX (bind command) ────────────────────────</span>
<span class="cb-cmt"># bind KEY FUNCTION MENU
#
# KEY formats:
#   ^X      = Ctrl+X
#   M-X     = Alt+X (Meta+X)
#   F1..F16 = Function keys
#   Sh-M-X  = Shift+Alt+X (rare)
#
# MENU options:
#   all       = works in every context
#   main      = normal editing (most common)
#   search    = while in search prompt
#   replace   = while in replace prompt
#   replace2  = replace confirmation
#   yesno     = yes/no dialog
#   spell     = spell check mode
#   linter    = linter mode
#   browser   = file browser
#   help      = help viewer
#   whereis   = search in help</span>

<span class="cb-cmt"># FUNCTION names (partial list — full list in man nanorc):</span>
<span class="cb-cmt"># savefile   writeout   exit   insert   whereis   findnext
# replace    cut       copy   paste    undo      redo
# up  down  left  right  home  end
# prevword   nextword   prevpage  nextpage
# firstline  lastline   gotoline  mark
# indent     unindent   justify   comment
# wordcount  speller    execute   browser
# refresh    suspend    mouse     help</span>

<span class="cb-cmt">## ─── COMPLETE CUSTOM KEYBINDINGS EXAMPLE ─────────────────────</span>
<span class="cb-cmt"># ~/.nanorc — Keybinding section</span>

<span class="cb-cmt"># Familiar shortcuts for users coming from GUI editors:</span>
bind ^S savefile main        <span class="cb-cmt"># Ctrl+S = Save (like every GUI app)</span>
bind ^Z undo main            <span class="cb-cmt"># Ctrl+Z = Undo</span>
bind ^Y redo main            <span class="cb-cmt"># Ctrl+Y = Redo (note: default Ctrl+Y is Page Up)</span>
bind ^A mark main            <span class="cb-cmt"># Ctrl+A = Select All (sets mark at start)</span>
bind ^C copy main            <span class="cb-cmt"># Ctrl+C = Copy (now conflicts with cancel — remove if unwanted)</span>
bind ^V paste main           <span class="cb-cmt"># Ctrl+V = Paste (default is Page Down)</span>
bind ^F whereis main         <span class="cb-cmt"># Ctrl+F = Find</span>
bind ^H help main            <span class="cb-cmt"># Ctrl+H = Help</span>
bind ^Q exit main            <span class="cb-cmt"># Ctrl+Q = Quit</span>
bind ^D deleteword main      <span class="cb-cmt"># Ctrl+D = Delete word</span>
bind M-n linenumbers main    <span class="cb-cmt"># Alt+N = Toggle line numbers</span>

<span class="cb-cmt"># Function key bindings:</span>
bind F2 exit main            <span class="cb-cmt"># F2 = Exit</span>
bind F3 whereis main         <span class="cb-cmt"># F3 = Search</span>
bind F4 replace main         <span class="cb-cmt"># F4 = Replace</span>
bind F5 gotoline main        <span class="cb-cmt"># F5 = Go to line</span>
bind F6 wordcount main       <span class="cb-cmt"># F6 = Word count</span>
bind F7 speller main         <span class="cb-cmt"># F7 = Spell check</span>

<span class="cb-cmt">## ─── COLOUR SYSTEM — 256 COLOURS ─────────────────────────────</span>
<span class="cb-cmt"># Nano supports 256-colour mode in modern terminals
# Format: color FGCOLOR,BGCOLOR "REGEX"

# Named colours:
# black red green yellow blue magenta cyan white
# brightblack brightred brightgreen brightyellow
# brightblue brightmagenta brightcyan brightwhite

# 256-colour by number (0-255):
# color ,255 "pattern"     → background only
# color 196,255 "pattern"  → fg 196, bg 255

# Modifiers:
# bold,red     → bold red
# italic,blue  → italic blue (terminal must support)
# underline,green → underlined green</span>

<span class="cb-cmt"># Example: custom data file highlighting for .env files
# Add to ~/.nanorc:</span>
syntax "dotenv" "\.env(\..*)?\$"
color brightred   "^[^=]+(?==)"      <span class="cb-cmt"># key names in red</span>
color brightgreen "=.*\$"             <span class="cb-cmt"># values in green</span>
color cyan        "^#.*\$"            <span class="cb-cmt"># comments in cyan</span>
color yellow      "=\$"               <span class="cb-cmt"># empty values highlighted</span>

<span class="cb-cmt"># Example: CSV column highlighting</span>
syntax "csv" "\.csv\$"
color brightblue  "^[^,\n]+"         <span class="cb-cmt"># first column</span>
color brightgreen ",[^,\n]+"         <span class="cb-cmt"># subsequent columns</span>
color yellow      "\"[^\"]*\""       <span class="cb-cmt"># quoted fields</span>
color red         ",,"               <span class="cb-cmt"># empty fields (double comma)</span>

<span class="cb-cmt">## ─── PER-FILETYPE CONFIG WITH INCLUDE ────────────────────────</span>
<span class="cb-cmt"># Create separate config files per filetype:</span>
<span class="cb-cmt"># ~/.nano/python.nanorc</span>
syntax "python" "\.py\$"
color brightcyan  "\b(def|class|import|from|return|yield|raise|pass|lambda|with|as|async|await|for|while|if|elif|else|try|except|finally|in|is|not|and|or)\b"
color brightgreen "\"\"\".*\"\"\"|'''.*'''"   <span class="cb-cmt"># docstrings</span>
color green       "\"[^\"]*\"|'[^']*'"       <span class="cb-cmt"># strings</span>
color brightred   "\b(None|True|False)\b"
color brightblue  "[0-9]+\.?[0-9]*"          <span class="cb-cmt"># numbers</span>
color cyan        "#.*\$"                     <span class="cb-cmt"># comments</span>
color ,red        "\t"                        <span class="cb-cmt"># highlight tabs (bad in Python!)</span>
<span class="cb-cmt"># The last line: tabs get RED BACKGROUND — impossible to miss</span>

<span class="cb-cmt"># Then in ~/.nanorc:</span>
<span class="cb-cmt"># include "~/.nano/python.nanorc"</span>

<span class="cb-cmt">## ─── COMPLETE UI COLOUR THEME ────────────────────────────────</span>
<span class="cb-cmt"># Modern dark theme for ~/.nanorc:</span>
set titlecolor bold,white,blue       <span class="cb-cmt"># title bar: bold white on blue</span>
set statuscolor bold,white,green     <span class="cb-cmt"># status: white on green</span>
set errorcolor bold,white,red        <span class="cb-cmt"># errors: white on red</span>
set selectedcolor black,cyan         <span class="cb-cmt"># selection: black on cyan</span>
set numbercolor cyan                 <span class="cb-cmt"># line numbers: cyan</span>
set keycolor brightgreen             <span class="cb-cmt"># shortcut keys: bright green</span>
set functioncolor yellow             <span class="cb-cmt"># function names in shortcuts: yellow</span>
set stripecolor ,234                 <span class="cb-cmt"># alternating line stripe (256-colour)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 22 — NANO vs VIM vs OTHER EDITORS (DEEP COMPARISON)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Nano vs Vim vs Other Editors — The Definitive Comparison</h2>

<p>Understanding when to choose which tool is the mark of an experienced Linux professional. Here's the complete picture.</p>

<!-- Editor comparison SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="260" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Terminal Editor Comparison — Choose the Right Tool</text>

  <!-- nano column -->
  <rect x="20" y="36" width="240" height="210" rx="8" fill="#0f2d1f" stroke="#3fb950" stroke-width="2"/>
  <text x="140" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#3fb950">nano</text>
  <text x="140" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">GNU nano 7.x</text>
  <line x1="30" y1="84" x2="250" y2="84" stroke="#1f4f2f" stroke-width="1"/>
  <!-- nano pros -->
  <text x="35" y="102" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Self-documenting shortcuts</text>
  <text x="35" y="118" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Zero learning curve</text>
  <text x="35" y="134" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Works on all Linux systems</text>
  <text x="35" y="150" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Safe: no mode confusion</text>
  <text x="35" y="166" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Great for quick edits</text>
  <text x="35" y="182" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">⚠ Limited macro support</text>
  <text x="35" y="198" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">⚠ No split windows</text>
  <text x="35" y="214" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Slow for bulk edits</text>
  <text x="35" y="230" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Limited scripting</text>

  <!-- vim column -->
  <rect x="290" y="36" width="240" height="210" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#bc8cff">vim</text>
  <text x="410" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Vim 8+ / Neovim</text>
  <line x1="300" y1="84" x2="520" y2="84" stroke="#2a2a5f" stroke-width="1"/>
  <text x="305" y="102" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Blazing fast editing</text>
  <text x="305" y="118" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Powerful macros</text>
  <text x="305" y="134" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Splits, tabs, buffers</text>
  <text x="305" y="150" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Unlimited plugins</text>
  <text x="305" y="166" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Best for large files</text>
  <text x="305" y="182" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">⚠ 2-4 week learning curve</text>
  <text x="305" y="198" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">⚠ Not always pre-installed</text>
  <text x="305" y="214" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Mode confusion for beginners</text>
  <text x="305" y="230" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Overkill for quick edits</text>

  <!-- emacs column -->
  <rect x="560" y="36" width="240" height="210" rx="8" fill="#1a1218" stroke="#f85149" stroke-width="1.5"/>
  <text x="680" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#ffa657">emacs</text>
  <text x="680" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">GNU Emacs 29+</text>
  <line x1="570" y1="84" x2="790" y2="84" stroke="#3f1f1f" stroke-width="1"/>
  <text x="575" y="102" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Truly extensible (Elisp)</text>
  <text x="575" y="118" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Built-in email, git, shell</text>
  <text x="575" y="134" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Org-mode (unmatched)</text>
  <text x="575" y="150" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">⚠ Large memory footprint</text>
  <text x="575" y="166" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">⚠ Complex key chording</text>
  <text x="575" y="182" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">⚠ Steep learning curve</text>
  <text x="575" y="198" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Not for quick SSH edits</text>
  <text x="575" y="214" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Not always installed</text>
  <text x="575" y="230" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ RSI risk (Ctrl+X Ctrl+S etc)</text>
</svg>
</div>

<div class="table-wrap">
<table class="ref-table">
<thead>
  <tr>
    <th style="width:28%">Situation</th>
    <th style="color:#3fb950;width:24%">Best Choice</th>
    <th style="width:48%">Reason</th>
  </tr>
</thead>
<tbody>
<tr>
  <td>First time on a new server</td>
  <td style="color:#3fb950;">nano</td>
  <td>Always available, shortcuts on screen, no setup needed</td>
</tr>
<tr>
  <td>Edit /etc/hosts on production</td>
  <td style="color:#3fb950;">nano</td>
  <td>Quick, safe, Ctrl+O save / Ctrl+X exit — done in 30 seconds</td>
</tr>
<tr>
  <td>Write a 500-line Python ETL</td>
  <td style="color:#bc8cff;">vim</td>
  <td>Grammar-based editing, text objects, macros, splits</td>
</tr>
<tr>
  <td>Teaching a beginner to edit files</td>
  <td style="color:#3fb950;">nano</td>
  <td>Self-documenting — shortcuts always visible, no mode confusion</td>
</tr>
<tr>
  <td>Edit git commit message</td>
  <td style="color:#3fb950;">nano</td>
  <td>Set EDITOR=nano — simplest workflow, easy to save and exit</td>
</tr>
<tr>
  <td>Refactor 20 Python files</td>
  <td style="color:#bc8cff;">vim</td>
  <td>:bufdo, macros, visual block, :s///g across buffers</td>
</tr>
<tr>
  <td>View a large log file (read-only)</td>
  <td style="color:#3fb950;">nano -v</td>
  <td>Searchable, scrollable, line numbers with -l, safe read-only</td>
</tr>
<tr>
  <td>Compare two config files</td>
  <td style="color:#bc8cff;">vimdiff</td>
  <td>Side-by-side diff, navigate diffs, merge with do/dp</td>
</tr>
<tr>
  <td>Script that needs user to edit a file</td>
  <td style="color:#3fb950;">nano</td>
  <td>Users know how to exit nano — they don't know how to exit vim</td>
</tr>
<tr>
  <td>Embedded system / minimal container</td>
  <td style="color:#3fb950;">nano or vi</td>
  <td>Both available on minimal installs; nano friendlier</td>
</tr>
<tr>
  <td>Write daily notes and org tasks</td>
  <td style="color:#ffa657;">emacs</td>
  <td>Org-mode is genuinely unmatched for this use case</td>
</tr>
<tr>
  <td>Live data pipeline config change</td>
  <td style="color:#3fb950;">nano -B</td>
  <td>-B makes a backup before saving — safety net on production</td>
</tr>
</tbody>
</table>
</div>

<div class="callout-box info-box" style="margin-top:20px;">
  <strong>🎓 The Professional's Rule:</strong> Know <strong>nano</strong> for survival on any Linux system. Know <strong>vim</strong> for productive editing sessions. Know <strong>sed/awk</strong> for scripted bulk edits. These three together cover every editing scenario you'll encounter as a data engineer, DevOps engineer, or ML practitioner. You don't have to choose — use all three for what each does best.
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 23 — NANO QUICK REFERENCE POSTER
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Quick Reference — All Shortcuts in One Place</h2>

<p>Print this or keep it open when starting out. Within a week, these will be muscle memory.</p>

<!-- Full reference SVG poster -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="420" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#e6edf3">GNU Nano — Complete Shortcut Reference</text>
  <text x="410" y="38" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">^ = Ctrl    M- = Alt    All shortcuts work in the default edit mode</text>

  <!-- Column 1: File + Navigation -->
  <rect x="12" y="48" width="192" height="360" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <rect x="12" y="48" width="192" height="24" rx="6" fill="#1f2937"/>
  <rect x="12" y="60" width="192" height="12" fill="#1f2937"/>
  <text x="108" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">FILE OPERATIONS</text>
  <text x="22" y="84" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">^G</text><text x="50" y="84" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Help</text>
  <text x="22" y="98" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">^O</text><text x="50" y="98" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Save (Write Out)</text>
  <text x="22" y="112" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">^X</text><text x="50" y="112" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Exit</text>
  <text x="22" y="126" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">^R</text><text x="50" y="126" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Read/Insert file</text>
  <text x="22" y="140" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">^T</text><text x="50" y="140" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Execute / Spell</text>

  <line x1="18" y1="150" x2="196" y2="150" stroke="#30363d" stroke-width="1"/>
  <text x="108" y="164" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">NAVIGATION</text>
  <text x="22" y="180" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">Arrows</text><text x="80" y="180" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Move char/line</text>
  <text x="22" y="194" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">^←/→</text><text x="80" y="194" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Prev/next word</text>
  <text x="22" y="208" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">Home/End</text><text x="96" y="208" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Line start/end</text>
  <text x="22" y="222" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">^Home</text><text x="80" y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">File start</text>
  <text x="22" y="236" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">^End</text><text x="80" y="236" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">File end</text>
  <text x="22" y="250" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">PgUp/Dn</text><text x="96" y="250" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Scroll screen</text>
  <text x="22" y="264" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">^/ M-G</text><text x="84" y="264" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Go to line</text>
  <text x="22" y="278" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">^C</text><text x="50" y="278" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Show position</text>
  <text x="22" y="292" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">M-]</text><text x="50" y="292" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Match bracket</text>

  <!-- Column 2: Edit + Search -->
  <rect x="214" y="48" width="192" height="360" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <rect x="214" y="48" width="192" height="24" rx="6" fill="#1f2937"/>
  <rect x="214" y="60" width="192" height="12" fill="#1f2937"/>
  <text x="310" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">EDITING</text>
  <text x="224" y="84" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">^K</text><text x="250" y="84" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Cut line/selection</text>
  <text x="224" y="98" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">^U</text><text x="250" y="98" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Paste (Uncut)</text>
  <text x="224" y="112" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-6</text><text x="258" y="112" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Copy selection</text>
  <text x="224" y="126" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-A / ^6</text><text x="290" y="126" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Set mark</text>
  <text x="224" y="140" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-U</text><text x="258" y="140" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Undo</text>
  <text x="224" y="154" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-E</text><text x="258" y="154" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Redo</text>
  <text x="224" y="168" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-T</text><text x="258" y="168" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Cut to file end</text>
  <text x="224" y="182" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">^J</text><text x="250" y="182" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Justify paragraph</text>
  <text x="224" y="196" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-J</text><text x="258" y="196" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Justify file</text>
  <text x="224" y="210" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-3</text><text x="258" y="210" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Comment line</text>
  <text x="224" y="224" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-}</text><text x="258" y="224" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Indent line</text>
  <text x="224" y="238" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-{</text><text x="258" y="238" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Unindent line</text>

  <line x1="220" y1="248" x2="398" y2="248" stroke="#30363d" stroke-width="1"/>
  <text x="310" y="262" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">SEARCH &amp; REPLACE</text>
  <text x="224" y="278" font-family="'Courier New',monospace" font-size="10" fill="#f85149">^W</text><text x="250" y="278" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Search</text>
  <text x="224" y="292" font-family="'Courier New',monospace" font-size="10" fill="#f85149">M-W</text><text x="258" y="292" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Find next</text>
  <text x="224" y="306" font-family="'Courier New',monospace" font-size="10" fill="#f85149">^\</text><text x="250" y="306" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Search &amp; Replace</text>
  <text x="224" y="320" font-family="'Courier New',monospace" font-size="10" fill="#f85149">M-C (in ^W)</text><text x="318" y="320" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Case toggle</text>
  <text x="224" y="334" font-family="'Courier New',monospace" font-size="10" fill="#f85149">M-R (in ^W)</text><text x="318" y="334" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Regex toggle</text>
  <text x="224" y="348" font-family="'Courier New',monospace" font-size="10" fill="#f85149">A (in replace)</text><text x="326" y="348" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Replace all</text>

  <!-- Column 3: Display + Buffers + Macros -->
  <rect x="416" y="48" width="192" height="360" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <rect x="416" y="48" width="192" height="24" rx="6" fill="#1f2937"/>
  <rect x="416" y="60" width="192" height="12" fill="#1f2937"/>
  <text x="512" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">DISPLAY</text>
  <text x="426" y="84" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">M-N</text><text x="460" y="84" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Toggle line numbers</text>
  <text x="426" y="98" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">M-P</text><text x="460" y="98" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Show whitespace</text>
  <text x="426" y="112" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">M-Y</text><text x="460" y="112" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Toggle syntax color</text>
  <text x="426" y="126" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">M-X</text><text x="460" y="126" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Toggle help bar</text>
  <text x="426" y="140" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">M-Z</text><text x="460" y="140" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Distraction-free</text>
  <text x="426" y="154" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">M-D</text><text x="460" y="154" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Word/line/char count</text>
  <text x="426" y="168" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">M-L</text><text x="460" y="168" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Toggle hard wrap</text>
  <text x="426" y="182" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">M-I</text><text x="460" y="182" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Toggle auto-indent</text>

  <line x1="422" y1="192" x2="600" y2="192" stroke="#30363d" stroke-width="1"/>
  <text x="512" y="206" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">BUFFERS</text>
  <text x="426" y="222" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">M-&lt;</text><text x="458" y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Prev buffer</text>
  <text x="426" y="236" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">M-&gt;</text><text x="458" y="236" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Next buffer</text>

  <line x1="422" y1="246" x2="600" y2="246" stroke="#30363d" stroke-width="1"/>
  <text x="512" y="260" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">MACROS (nano 7+)</text>
  <text x="426" y="276" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-:</text><text x="458" y="276" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Start/stop record</text>
  <text x="426" y="290" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">M-;</text><text x="458" y="290" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Replay macro</text>

  <line x1="422" y1="300" x2="600" y2="300" stroke="#30363d" stroke-width="1"/>
  <text x="512" y="314" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">SPELL / EXEC</text>
  <text x="426" y="330" font-family="'Courier New',monospace" font-size="10" fill="#f85149">^T</text><text x="452" y="330" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Spell check</text>
  <text x="426" y="344" font-family="'Courier New',monospace" font-size="10" fill="#f85149">^T^T</text><text x="468" y="344" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Execute command</text>
  <text x="426" y="358" font-family="'Courier New',monospace" font-size="10" fill="#f85149">^R^X</text><text x="468" y="358" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Insert cmd output</text>

  <!-- Column 4: .nanorc cheatsheet -->
  <rect x="618" y="48" width="192" height="360" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <rect x="618" y="48" width="192" height="24" rx="6" fill="#1f2937"/>
  <rect x="618" y="60" width="192" height="12" fill="#1f2937"/>
  <text x="714" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">KEY .NANORC SETTINGS</text>
  <text x="628" y="84" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set linenumbers</text>
  <text x="628" y="98" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set constantshow</text>
  <text x="628" y="112" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set autoindent</text>
  <text x="628" y="126" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set tabsize 4</text>
  <text x="628" y="140" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set tabstospaces</text>
  <text x="628" y="154" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set mouse</text>
  <text x="628" y="168" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set softwrap</text>
  <text x="628" y="182" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set backup</text>
  <text x="628" y="196" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set positionlog</text>
  <text x="628" y="210" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set casesensitive</text>
  <text x="628" y="224" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set smarthome</text>
  <text x="628" y="238" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">set zap</text>

  <line x1="624" y1="248" x2="802" y2="248" stroke="#30363d" stroke-width="1"/>
  <text x="714" y="262" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">KEY BINDINGS</text>
  <text x="628" y="278" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">bind ^S savefile main</text>
  <text x="628" y="292" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">bind ^Z undo main</text>
  <text x="628" y="306" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">bind ^Y redo main</text>
  <text x="628" y="320" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">bind ^Q exit main</text>
  <text x="628" y="334" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">bind ^F whereis main</text>

  <line x1="624" y1="344" x2="802" y2="344" stroke="#30363d" stroke-width="1"/>
  <text x="714" y="358" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">INCLUDE SYNTAX</text>
  <text x="628" y="374" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">include "/usr/share/</text>
  <text x="628" y="386" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">  nano/*.nanorc"</text>
  <text x="628" y="400" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">set speller "aspell -x -c"</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 24 — UPDATED COMPLETE EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Bonus Exercises — Advanced Scenarios</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 6 — Word Count &amp; Spell Check a README</h4>
    <p>Create a <code>README.md</code> with intentional spelling mistakes and poor formatting:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">This is a data piepline project. It procceses CSV files
from mulitple sources and loades them
into a Postgresql database.

The pipeline handels dupplicates automaticaly.
Contact: ravi@exampl.com</pre>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Open: <code>nano -l -c README.md</code></li>
      <li>Check word count: <code>Alt+D</code> — note the count</li>
      <li>Fix "piepline" → "pipeline": <code>Ctrl+\</code> → type <code>piepline</code> → Enter → type <code>pipeline</code> → Enter → <code>A</code></li>
      <li>Fix all spelling mistakes with global replace one by one</li>
      <li>Justify the paragraph: position cursor in first paragraph, <code>Ctrl+J</code></li>
      <li>Check word count again: <code>Alt+D</code> — did it change?</li>
      <li>Toggle whitespace display: <code>Alt+P</code> — see spaces and line endings</li>
      <li>Save: <code>Ctrl+O</code> → Enter → <code>Ctrl+X</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 7 — Macro for Bulk SQL Formatting</h4>
    <p>Create <code>inserts.sql</code> with 20 lines like:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">insert into orders values (1, 'delhi', 5421)
insert into orders values (2, 'mumbai', 4832)
... (20 lines total)</pre>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Generate with: <code>python3 -c "cities=['delhi','mumbai','bangalore','pune','chennai']; [print(f\"insert into orders values ({i+1}, '{cities[i%5]}', {(i+1)*500})\") for i in range(20)]" > inserts.sql</code></li>
      <li>Open: <code>nano -l inserts.sql</code></li>
      <li>Use <code>Ctrl+\</code> to uppercase all SQL keywords: search <code>insert into orders values</code> → replace <code>INSERT INTO orders VALUES</code> → <code>A</code></li>
      <li>Record macro (<code>Alt+:</code>) that: goes to End of line, types <code>;</code>, moves Down, goes to Home → stops recording (<code>Alt+:</code>)</li>
      <li>Replay macro 19 times with <code>Alt+;</code> pressed 19 times</li>
      <li>Verify: <code>Ctrl+Home</code> → scan through file — all lines should end with <code>;</code></li>
      <li>Save and exit</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 8 — The Production Config Migration</h4>
    <p><strong>Scenario:</strong> Your team is migrating from old infrastructure to new. You have 4 config files that need coordinated updates. No automation tools available — only nano.</p>
    <p>Create these 4 files with realistic content:</p>
    <ul style="color:#8b949e;font-size:13px;line-height:2;padding-left:20px;">
      <li><code>airflow.cfg</code> — contains <code>old-db.internal:5432</code> (database connection)</li>
      <li><code>spark.conf</code> — contains <code>executor.memory=2g</code> and <code>driver.memory=2g</code></li>
      <li><code>kafka.properties</code> — contains <code>bootstrap.servers=old-kafka:9092</code></li>
      <li><code>pipeline.yaml</code> — contains <code>env: staging</code> and <code>debug: true</code></li>
    </ul>
    <p><strong>Tasks:</strong></p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Open all 4 files: <code>nano airflow.cfg spark.conf kafka.properties pipeline.yaml</code></li>
      <li>Check buffer list: <code>Ctrl+O → Ctrl+C</code> (at filename prompt press Ctrl+C to see buffers, then Escape)</li>
      <li>In <strong>airflow.cfg</strong>: replace <code>old-db.internal</code> → <code>prod-db.cluster.internal</code></li>
      <li>Switch to <strong>spark.conf</strong> (<code>Alt+&gt;</code>): replace both <code>2g</code> memory values → <code>16g</code> and <code>8g</code> respectively using separate searches</li>
      <li>Switch to <strong>kafka.properties</strong>: replace <code>old-kafka:9092</code> → <code>prod-kafka-1:9092,prod-kafka-2:9092</code></li>
      <li>Switch to <strong>pipeline.yaml</strong>: replace <code>staging</code> → <code>production</code> AND replace <code>debug: true</code> → <code>debug: false</code></li>
      <li>Save all 4 files — go through each buffer and <code>Ctrl+O → Enter</code></li>
      <li>Without exiting nano: use <code>Ctrl+R Ctrl+X</code> to execute <code>grep -r "old-" .</code> and confirm no old references remain</li>
      <li>Use <code>Ctrl+R Ctrl+X</code> to execute <code>date</code> and note the timestamp</li>
      <li>In airflow.cfg: add a comment at the top: <code># Migrated to prod cluster on [timestamp]</code></li>
      <li>Save all and exit all buffers</li>
    </ol>
    <p><strong>Verification:</strong> <code>grep -r "old-\|staging\|2g\|debug: true" *.cfg *.conf *.properties *.yaml</code> should return nothing.</p>
  </div>
</div>
</div>



<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Toolkit — Day 90</div>
    <p>By his 90th day, Ravi had a clear mental model. When his junior asked "which editor should I learn?", Ravi didn't say "vim" or "nano" — he said: <strong>"Both. For different jobs."</strong></p>
    <p>Vim for deep editing sessions — refactoring Python, editing large configs, working across many files. Nano for quick fixes — a cron entry, a single line in /etc/hosts, a git commit message on a new server where he hadn't set up vim yet. The key insight: <em>nano is the only editor that tells you how to use it while you're using it.</em> The shortcuts are always on screen. You never get stuck.</p>
    <p>Two months later, when a new intern joined the team and couldn't figure out how to exit vim, Ravi walked over and typed <code>:q!</code>. Then showed them nano. "Start here," he said. "Learn this first. Then learn vim. Then you'll have the right tool for every situation."</p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};