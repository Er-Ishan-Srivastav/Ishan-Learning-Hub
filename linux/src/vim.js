
// ============================================================

var vim = {
    title: "Vi & Vim — The Programmer's Text Editor",
    description: "Master Vim from zero to productive. Understand modes, navigation, editing, search, macros, and configuration — the editor used on every Linux server, embedded system, and production machine on the planet.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's First Server — Day 62</div>
    <p>It was Ravi's first day with SSH access to the production data server. His manager sent a quick task: "Fix line 47 in <code>/etc/spark/spark-defaults.conf</code> — change the memory setting from 2g to 8g." Simple enough.</p>
    <br>
    <p>Ravi typed <code>nano spark-defaults.conf</code> and got: <code>-bash: nano: command not found</code>. He tried <code>gedit</code>. Not found. <code>mousepad</code>. Not found. Then he tried <code>vi spark-defaults.conf</code> — it opened. He made a change and pressed Escape, then typed <code>:q</code>. The file didn't save. He pressed every key he could think of. Nothing worked right.</p>
    <br>
    <p>He ended up killing the SSH session to escape vim. His manager laughed. "Every Linux professional has that story. Let me show you why vim is <em>the</em> editor you want to know." Two hours later, Ravi was editing faster than he ever had with a GUI.</p>
    <br>
    <p><strong>Vim is on every Linux system — servers, containers, embedded devices, cloud VMs — because it ships with the OS. You will need it. Let's master it.</strong></p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — VIM HISTORY & WHY IT MATTERS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> What Is Vim & Why Every Engineer Needs It</h2>

<div class="two-col-grid">
  <div>
    <h3>The Family Tree</h3>
    <div class="table-wrap">
    <table class="ref-table">
    <thead><tr><th>Editor</th><th>Year</th><th>Key Fact</th></tr></thead>
    <tbody>
    <tr><td><code>ed</code></td><td>1969</td><td>Original Unix line editor — no cursor, no screen</td></tr>
    <tr><td><code>ex</code></td><td>1976</td><td>Extended ed with visual mode option</td></tr>
    <tr><td><code>vi</code></td><td>1976</td><td>Bill Joy at Berkeley — first visual (screen) editor</td></tr>
    <tr><td><code>vim</code></td><td>1991</td><td>"Vi IMproved" by Bram Moolenaar — 3000+ improvements</td></tr>
    <tr><td><code>neovim</code></td><td>2014</td><td>Vim fork — async, Lua config, LSP built-in</td></tr>
    </tbody>
    </table>
    </div>
  </div>
  <div>
    <h3>Why Vim Over Other Editors</h3>
    <div class="callout-box info-box" style="margin:0;">
      <ul style="margin:0;padding-left:18px;line-height:2.2;font-size:13.5px;color:#e6edf3;">
        <li><strong>Always available</strong> — every Linux server has <code>vi</code> (POSIX standard)</li>
        <li><strong>No mouse required</strong> — hands never leave keyboard</li>
        <li><strong>Composable commands</strong> — <code>d3w</code> = delete 3 words (verb + count + motion)</li>
        <li><strong>Runs over SSH</strong> — edit remote files without GUI</li>
        <li><strong>Handles huge files</strong> — 10GB log file? No problem</li>
        <li><strong>Universal muscle memory</strong> — vim keys appear in bash, less, man, git</li>
        <li><strong>Infinitely extensible</strong> — 10,000+ plugins</li>
      </ul>
    </div>
  </div>
</div>

<!-- Timeline SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:20px auto;">
  <rect width="820" height="120" fill="#0d1117" rx="10"/>
  <!-- Timeline line -->
  <line x1="40" y1="55" x2="780" y2="55" stroke="#30363d" stroke-width="2"/>
  <polygon points="780,50 780,60 792,55" fill="#30363d"/>

  <!-- ed 1969 -->
  <circle cx="70" cy="55" r="8" fill="#1f6feb" stroke="#58a6ff" stroke-width="2"/>
  <text x="70" y="35" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">ed</text>
  <text x="70" y="22" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">1969</text>
  <text x="70" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">line editor</text>

  <!-- ex 1976 -->
  <circle cx="220" cy="55" r="8" fill="#1f6feb" stroke="#58a6ff" stroke-width="2"/>
  <text x="220" y="35" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">ex</text>
  <text x="220" y="22" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">1976</text>
  <text x="220" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">extended ed</text>

  <!-- vi 1976 -->
  <circle cx="370" cy="55" r="10" fill="#1a3a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="370" y="35" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">vi</text>
  <text x="370" y="22" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">1976</text>
  <text x="370" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Bill Joy</text>
  <text x="370" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">first visual ed</text>

  <!-- vim 1991 -->
  <circle cx="560" cy="55" r="14" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2.5"/>
  <text x="560" y="37" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#bc8cff">vim</text>
  <text x="560" y="22" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">1991</text>
  <text x="560" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Bram Moolenaar</text>
  <text x="560" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Vi IMproved</text>

  <!-- neovim 2014 -->
  <circle cx="730" cy="55" r="12" fill="#1a2a1a" stroke="#39d353" stroke-width="2"/>
  <text x="730" y="35" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#39d353">nvim</text>
  <text x="730" y="22" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">2014</text>
  <text x="730" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#39d353">Neovim</text>
  <text x="730" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">async + Lua</text>
</svg>
</div>

<div class="callout-box warn-box">
  <strong>⚠️ vi vs vim:</strong> On modern Ubuntu/Debian, typing <code>vi</code> runs <code>vim</code> (symlinked). On minimal server installs, <code>vi</code> may be a stripped-down <code>vim tiny</code> — some features missing. Always check with <code>vim --version</code>. Install full vim with <code>sudo apt install vim</code>.
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — THE MODE SYSTEM (MOST IMPORTANT)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The Mode System — The Core Concept That Changes Everything</h2>

<p>Unlike every other editor, <strong>Vim has modes</strong>. Keys mean different things in different modes. This is why pressing <code>j</code> moves the cursor down instead of typing "j". Once you internalize this, everything else makes sense.</p>

<!-- Mode State Machine SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <defs>
    <marker id="arrowh" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#8b949e"/></marker>
    <marker id="arrowg" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arrowb" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arrowy" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
    <marker id="arrowp" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#bc8cff"/></marker>
    <style>
      @keyframes mode-pulse { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
      .normal-pulse { animation: mode-pulse 3s infinite; }
    </style>
  </defs>

  <rect width="820" height="380" fill="#0d1117" rx="12"/>
  <text x="410" y="26" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#8b949e">Vim Mode State Machine</text>

  <!-- NORMAL MODE (center) -->
  <rect x="300" y="130" width="220" height="90" rx="12" fill="#1a1a3a" stroke="#bc8cff" stroke-width="3" class="normal-pulse"/>
  <text x="410" y="165" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="16" font-weight="bold" fill="#bc8cff">NORMAL MODE</text>
  <text x="410" y="185" text-anchor="middle" font-family="monospace" font-size="11" fill="#8b949e">navigate · delete · yank</text>
  <text x="410" y="202" text-anchor="middle" font-family="monospace" font-size="11" fill="#8b949e">search · undo · macros</text>
  <text x="410" y="340" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#bc8cff">← always come back here with ESC</text>

  <!-- INSERT MODE (top) -->
  <rect x="310" y="35" width="200" height="68" rx="10" fill="#1a3a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="410" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#3fb950">INSERT MODE</text>
  <text x="410" y="80" text-anchor="middle" font-family="monospace" font-size="11" fill="#8b949e">type text normally</text>
  <text x="410" y="95" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">i  I  a  A  o  O  s  S  c</text>

  <!-- VISUAL MODE (left) -->
  <rect x="60" y="148" width="185" height="68" rx="10" fill="#1a2a3a" stroke="#58a6ff" stroke-width="2"/>
  <text x="152" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#58a6ff">VISUAL MODE</text>
  <text x="152" y="193" text-anchor="middle" font-family="monospace" font-size="11" fill="#8b949e">select text blocks</text>
  <text x="152" y="208" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">v  V  Ctrl-v</text>

  <!-- COMMAND MODE (bottom) -->
  <rect x="310" y="280" width="200" height="68" rx="10" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="410" y="307" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#f85149">COMMAND MODE</text>
  <text x="410" y="325" text-anchor="middle" font-family="monospace" font-size="11" fill="#8b949e">:w  :q  :s///  :set</text>
  <text x="410" y="340" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">enter with  :  /  ?  !</text>

  <!-- REPLACE MODE (right) -->
  <rect x="575" y="148" width="185" height="68" rx="10" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="667" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#ffa657">REPLACE MODE</text>
  <text x="667" y="193" text-anchor="middle" font-family="monospace" font-size="11" fill="#8b949e">overwrite characters</text>
  <text x="667" y="208" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">R  (hold Shift+r)</text>

  <!-- Normal → Insert -->
  <line x1="390" y1="130" x2="390" y2="105" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arrowg)"/>
  <text x="330" y="120" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">i/a/o/A/I/O</text>
  <!-- Insert → Normal -->
  <line x1="430" y1="103" x2="430" y2="128" stroke="#f85149" stroke-width="1.5" marker-end="url(#arrowp)"/>
  <text x="435" y="118" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">Esc</text>

  <!-- Normal → Visual -->
  <line x1="300" y1="168" x2="248" y2="177" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arrowb)"/>
  <text x="248" y="163" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">v / V / Ctrl-v</text>
  <!-- Visual → Normal -->
  <line x1="246" y1="195" x2="300" y2="185" stroke="#f85149" stroke-width="1.5" marker-end="url(#arrowp)"/>
  <text x="248" y="210" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">Esc</text>

  <!-- Normal → Command -->
  <line x1="410" y1="220" x2="410" y2="278" stroke="#f85149" stroke-width="1.5" marker-end="url(#arrowh)"/>
  <text x="420" y="255" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">: / ? / !</text>
  <!-- Command → Normal -->
  <line x1="380" y1="278" x2="380" y2="222" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arrowg)"/>
  <text x="300" y="255" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Enter/Esc</text>

  <!-- Normal → Replace -->
  <line x1="520" y1="178" x2="573" y2="178" stroke="#ffa657" stroke-width="1.5" marker-end="url(#arrowy)"/>
  <text x="525" y="170" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">R</text>
  <!-- Replace → Normal -->
  <line x1="573" y1="196" x2="520" y2="196" stroke="#f85149" stroke-width="1.5" marker-end="url(#arrowp)"/>
  <text x="525" y="210" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">Esc</text>
</svg>
<p class="diagram-caption"><strong>Normal Mode is home base.</strong> You always start in Normal mode. Press <code>i</code> to type, <code>Esc</code> to return. Every other mode exists for a specific purpose — you enter it, do the task, and escape back to Normal.</p>
</div>

<!-- Mode Quick Reference -->
<div class="table-wrap">
<table class="ref-table">
<thead><tr><th>Mode</th><th>Enter With</th><th>Exit With</th><th>Purpose</th><th>Cursor Looks Like</th></tr></thead>
<tbody>
<tr>
  <td style="color:#bc8cff;font-weight:bold;">Normal</td>
  <td>Start of vim, or <code>Esc</code> from any mode</td>
  <td>Never — this is home</td>
  <td>Navigate, delete, copy, undo, macros</td>
  <td>Block cursor █</td>
</tr>
<tr>
  <td style="color:#3fb950;font-weight:bold;">Insert</td>
  <td><code>i a o O A I s S c</code></td>
  <td><code>Esc</code> or <code>Ctrl-[</code></td>
  <td>Type new text</td>
  <td>Thin line cursor |</td>
</tr>
<tr>
  <td style="color:#58a6ff;font-weight:bold;">Visual</td>
  <td><code>v</code> (char), <code>V</code> (line), <code>Ctrl-v</code> (block)</td>
  <td><code>Esc</code></td>
  <td>Select text, then operate on it</td>
  <td>Block cursor, selection highlighted</td>
</tr>
<tr>
  <td style="color:#f85149;font-weight:bold;">Command</td>
  <td><code>:</code> or <code>/</code> or <code>?</code></td>
  <td><code>Enter</code> (execute) or <code>Esc</code> (cancel)</td>
  <td>Run ex commands, search, substitute</td>
  <td>Command line at bottom</td>
</tr>
<tr>
  <td style="color:#ffa657;font-weight:bold;">Replace</td>
  <td><code>R</code></td>
  <td><code>Esc</code></td>
  <td>Overwrite characters (like Insert key)</td>
  <td>Block cursor on char being replaced</td>
</tr>
<tr>
  <td style="color:#ffa657;font-weight:bold;">Replace (single)</td>
  <td><code>r</code> then one key</td>
  <td>Automatic after 1 char</td>
  <td>Replace exactly one character</td>
  <td>Block cursor</td>
</tr>
</tbody>
</table>
</div>

<div class="callout-box info-box">
  <strong>💡 The Most Important Rule:</strong> When in doubt, press <code>Esc</code> (sometimes twice). It always brings you back to Normal mode. New Vim users get stuck because they're in Insert mode pressing Vim keys — the keys type characters instead of moving. <code>Esc</code> is the escape hatch. Seriously, tattoo it on your brain: <strong>Esc → Normal Mode → safe ground.</strong>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — OPENING, SAVING, QUITTING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Opening, Saving &amp; Quitting — Survive Day One</h2>

<!-- CONSOLE 1: Opening and Quitting -->
<div class="console-block">
<div class="console-header">
  <span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span>
  <span class="cb-title">Console 1 of 7 — Opening, Saving &amp; Quitting Vim</span>
</div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── OPENING FILES ────────────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> filename.txt          <span class="cb-cmt"># open (or create) a file</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">+42</span> config.py         <span class="cb-cmt"># open and jump to line 42</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">+/pattern</span> file.txt    <span class="cb-cmt"># open and jump to first match of pattern</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">-R</span> file.txt           <span class="cb-cmt"># open read-only (safe for viewing)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">view</span> file.txt             <span class="cb-cmt"># alias for vim -R</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> file1.txt file2.txt   <span class="cb-cmt"># open multiple files (buffers)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">-p</span> *.py               <span class="cb-cmt"># open all .py files in tabs</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">-O</span> left.txt right.txt <span class="cb-cmt"># open in vertical split side-by-side</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">-o</span> top.txt bottom.txt <span class="cb-cmt"># open in horizontal split</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">-d</span> old.py new.py      <span class="cb-cmt"># diff mode — vimdiff</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">--noplugin</span> file.txt   <span class="cb-cmt"># open without loading plugins (debugging)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo vim</span> /etc/hosts       <span class="cb-cmt"># edit system files (use with care!)</span>

<span class="cb-cmt">## ─── INSIDE VIM — SAVING & QUITTING (Command Mode with :) ─────</span>
<span class="cb-cmt"># First enter Command mode by pressing : in Normal mode</span>

:w                  <span class="cb-cmt"># write (save) the file</span>
:w filename.txt     <span class="cb-cmt"># save as new filename (keeps original open)</span>
:w!                 <span class="cb-cmt"># force write (override read-only warning if you own file)</span>
:wa                 <span class="cb-cmt"># write ALL open buffers</span>

:q                  <span class="cb-cmt"># quit (only if no unsaved changes)</span>
:q!                 <span class="cb-cmt"># quit WITHOUT saving (discard all changes)</span>
:qa                 <span class="cb-cmt"># quit ALL open windows</span>
:qa!                <span class="cb-cmt"># force quit ALL (discard all changes in all files)</span>

:wq                 <span class="cb-cmt"># write then quit</span>
:wq!                <span class="cb-cmt"># force write then quit</span>
:wqa                <span class="cb-cmt"># write all + quit all</span>
:x                  <span class="cb-cmt"># like :wq but only writes if changes were made (smarter)</span>
ZZ                  <span class="cb-cmt"># Normal mode shortcut for :x (save and quit)</span>
ZQ                  <span class="cb-cmt"># Normal mode shortcut for :q! (quit without saving)</span>

:saveas newname.txt <span class="cb-cmt"># save as AND switch to new filename</span>
:e!                 <span class="cb-cmt"># reload file from disk (discard current edits)</span>

<span class="cb-cmt">## ─── THE CLASSIC STUCK SCENARIO ──────────────────────────────</span>
<span class="cb-cmt"># You're stuck and nothing works? Run this sequence:</span>
<span class="cb-cmt"># 1. Press Esc (multiple times if needed)</span>
<span class="cb-cmt"># 2. Type exactly:  :q!  then Enter</span>
<span class="cb-cmt"># Done. You're out. No file saved.</span>

<span class="cb-cmt">## ─── RECOVERING FROM A CRASH ─────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">-r</span> filename.txt       <span class="cb-cmt"># recover from swap file after crash</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> ~/.vim/swap/            <span class="cb-cmt"># or check for .swp files</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> .filename.txt.swp      <span class="cb-cmt"># swap file in same directory</span>
<span class="cb-cmt"># Inside vim after crash: press R to recover, then :wq to save</span>
</pre></div></div>

<!-- Vim Screen Layout SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:20px auto;">
  <rect width="760" height="320" fill="#0d1117" rx="10"/>
  <!-- Terminal frame -->
  <rect x="20" y="20" width="720" height="280" rx="6" fill="#0d1117" stroke="#30363d" stroke-width="2"/>
  <!-- Top bar -->
  <rect x="20" y="20" width="720" height="26" rx="6" fill="#161b22"/>
  <rect x="20" y="34" width="720" height="12" fill="#161b22"/>
  <text x="380" y="37" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">spark-defaults.conf (~) - VIM</text>

  <!-- File content area label -->
  <rect x="30" y="56" width="700" height="190" fill="#0a0e14"/>
  <text x="40" y="74" font-family="monospace" font-size="12" fill="#8b949e">  1 </text>
  <text x="75" y="74" font-family="monospace" font-size="12" fill="#e6edf3"># Spark Configuration File</text>
  <text x="40" y="90" font-family="monospace" font-size="12" fill="#8b949e">  2 </text>
  <text x="75" y="90" font-family="monospace" font-size="12" fill="#8b949e"># ===========================</text>
  <text x="40" y="106" font-family="monospace" font-size="12" fill="#8b949e">  3 </text>
  <text x="40" y="122" font-family="monospace" font-size="12" fill="#8b949e">  4 </text>
  <text x="75" y="122" font-family="monospace" font-size="12" fill="#e6edf3">spark.master                  </text><text x="333" y="122" font-family="monospace" font-size="12" fill="#ffa657">local[*]</text>
  <text x="40" y="138" font-family="monospace" font-size="12" fill="#8b949e">  5 </text>
  <text x="75" y="138" font-family="monospace" font-size="12" fill="#e6edf3">spark.executor.memory         </text><text x="333" y="138" font-family="monospace" font-size="12" fill="#f85149">2g</text>
  <text x="40" y="154" font-family="monospace" font-size="12" fill="#8b949e">  6 </text>
  <text x="75" y="154" font-family="monospace" font-size="12" fill="#e6edf3">spark.driver.memory           </text><text x="333" y="154" font-family="monospace" font-size="12" fill="#ffa657">4g</text>
  <!-- Cursor block on line 5 -->
  <rect x="333" y="128" width="14" height="16" fill="#bc8cff" opacity="0.8"/>
  <text x="40" y="170" font-family="monospace" font-size="12" fill="#8b949e">  7 </text>
  <text x="40" y="186" font-family="monospace" font-size="12" fill="#8b949e">  8 </text>
  <text x="75" y="186" font-family="monospace" font-size="12" fill="#e6edf3">spark.sql.shuffle.partitions  </text><text x="357" y="186" font-family="monospace" font-size="12" fill="#ffa657">200</text>
  <text x="40" y="202" font-family="monospace" font-size="12" fill="#8b949e">  9 </text>
  <text x="75" y="202" font-family="monospace" font-size="12" fill="#8b949e">~</text>
  <text x="75" y="218" font-family="monospace" font-size="12" fill="#8b949e">~</text>
  <text x="75" y="234" font-family="monospace" font-size="12" fill="#8b949e">~</text>

  <!-- Status line -->
  <rect x="30" y="248" width="700" height="18" fill="#1a1a3a"/>
  <text x="38" y="261" font-family="monospace" font-size="11" fill="#bc8cff">-- NORMAL --</text>
  <text x="590" y="261" font-family="monospace" font-size="11" fill="#8b949e">5,33</text>
  <text x="680" y="261" font-family="monospace" font-size="11" fill="#8b949e">62%</text>

  <!-- Command line -->
  <rect x="30" y="268" width="700" height="20" fill="#0d1117"/>
  <text x="38" y="282" font-family="monospace" font-size="11" fill="#e6edf3">:w</text>
  <rect x="52" y="271" width="7" height="14" fill="#e6edf3" opacity="0.8"/>

  <!-- Labels -->
  <text x="745" y="170" text-anchor="end" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">← editing</text>
  <text x="745" y="187" text-anchor="end" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">   area</text>
  <text x="745" y="261" text-anchor="end" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">← status</text>
  <text x="745" y="281" text-anchor="end" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">← cmd line</text>

  <!-- Tilde explanation -->
  <text x="40" y="308" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">~ lines = empty lines below end of file   |   5,33 = line 5, column 33   |   62% = position in file</text>
</svg>
<p class="diagram-caption">Vim's screen layout: editing area (most of screen), status line (mode + filename + flags), command line (bottom, for : commands).</p>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — NAVIGATION (NORMAL MODE)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Navigation — Moving Without a Mouse</h2>

<p>In Normal mode, your keyboard becomes a navigation controller. The goal is to <strong>never reach for arrow keys</strong> — your fingers stay on the home row. This is where vim speed comes from.</p>

<!-- Keyboard layout SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:0 auto;">
  <rect width="760" height="200" fill="#0d1117" rx="10"/>
  <text x="380" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Key Navigation — Home Row Focus</text>

  <!-- h j k l keys -->
  <rect x="150" y="100" width="50" height="50" rx="6" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="175" y="128" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#bc8cff">h</text>
  <text x="175" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">← left</text>

  <rect x="210" y="100" width="50" height="50" rx="6" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="235" y="128" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#bc8cff">j</text>
  <text x="235" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">↓ down</text>

  <rect x="270" y="100" width="50" height="50" rx="6" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="295" y="128" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#bc8cff">k</text>
  <text x="295" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">↑ up</text>

  <rect x="330" y="100" width="50" height="50" rx="6" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="355" y="128" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#bc8cff">l</text>
  <text x="355" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">→ right</text>

  <!-- word keys w b e -->
  <rect x="440" y="35" width="50" height="50" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="465" y="63" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#3fb950">w</text>
  <text x="465" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">next word</text>

  <rect x="440" y="100" width="50" height="50" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="465" y="128" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#3fb950">b</text>
  <text x="465" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">back word</text>

  <rect x="500" y="35" width="50" height="50" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="525" y="63" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#3fb950">e</text>
  <text x="525" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">end word</text>

  <!-- Line keys 0 $ -->
  <rect x="560" y="100" width="50" height="50" rx="6" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="585" y="128" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#f85149">0</text>
  <text x="585" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">line start</text>

  <rect x="620" y="100" width="50" height="50" rx="6" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="645" y="128" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="#f85149">$</text>
  <text x="645" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">line end</text>

  <!-- G gg -->
  <rect x="680" y="100" width="50" height="50" rx="6" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="705" y="125" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#ffa657">G/gg</text>
  <text x="705" y="142" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">file end/top</text>

  <!-- Labels -->
  <text x="255" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#bc8cff">Basic Navigation</text>
  <text x="490" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">Word Motion</text>
  <text x="637" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">Line / File</text>

  <!-- Mnemonic -->
  <text x="252" y="55" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Think: j looks like a down-arrow ↓   k is above j like ↑   h is left, l is right</text>
</svg>
</div>

<!-- CONSOLE 2: Navigation -->
<div class="console-block">
<div class="console-header">
  <span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span>
  <span class="cb-title">Console 2 of 7 — Navigation: Every Motion Command</span>
</div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── BASIC CHARACTER MOVEMENT ────────────────────────────────</span>
h            <span class="cb-cmt"># ← left one character</span>
j            <span class="cb-cmt"># ↓ down one line</span>
k            <span class="cb-cmt"># ↑ up one line</span>
l            <span class="cb-cmt"># → right one character</span>

<span class="cb-cmt"># COUNTS: any number before a command repeats it</span>
5j           <span class="cb-cmt"># move down 5 lines</span>
10l          <span class="cb-cmt"># move right 10 characters</span>
3h           <span class="cb-cmt"># move left 3 characters</span>

<span class="cb-cmt">## ─── WORD MOVEMENT ────────────────────────────────────────────</span>
w            <span class="cb-cmt"># move to START of next word (word = alphanumeric+underscore)</span>
W            <span class="cb-cmt"># move to START of next WORD (WORD = any non-whitespace)</span>
b            <span class="cb-cmt"># move to START of previous word</span>
B            <span class="cb-cmt"># move to START of previous WORD</span>
e            <span class="cb-cmt"># move to END of current/next word</span>
E            <span class="cb-cmt"># move to END of current/next WORD</span>
ge           <span class="cb-cmt"># move to END of previous word</span>

<span class="cb-cmt"># Example: cursor on 'spark.executor.memory   2g'
# w moves between spark . executor . memory (word = alphanum+_)
# W jumps across the whole 'spark.executor.memory' in one hit</span>

<span class="cb-cmt">## ─── LINE MOVEMENT ────────────────────────────────────────────</span>
0            <span class="cb-cmt"># go to column 0 (very start of line)</span>
^            <span class="cb-cmt"># go to first NON-BLANK character of line</span>
\$            <span class="cb-cmt"># go to last character of line</span>
g_           <span class="cb-cmt"># go to last NON-BLANK character of line</span>
+            <span class="cb-cmt"># go to first non-blank of NEXT line</span>
-            <span class="cb-cmt"># go to first non-blank of PREVIOUS line</span>
|            <span class="cb-cmt"># go to specific column: 40| goes to column 40</span>

<span class="cb-cmt">## ─── FILE MOVEMENT ────────────────────────────────────────────</span>
gg           <span class="cb-cmt"># go to FIRST line of file</span>
G            <span class="cb-cmt"># go to LAST line of file</span>
42G          <span class="cb-cmt"># go to line 42 (use with :set number for line numbers)</span>
:42          <span class="cb-cmt"># same as 42G — go to line 42 via command mode</span>
50%          <span class="cb-cmt"># go to 50% through the file</span>

<span class="cb-cmt">## ─── SCREEN MOVEMENT ──────────────────────────────────────────</span>
Ctrl-f       <span class="cb-cmt"># page down (forward one screen)</span>
Ctrl-b       <span class="cb-cmt"># page up (back one screen)</span>
Ctrl-d       <span class="cb-cmt"># half page down</span>
Ctrl-u       <span class="cb-cmt"># half page up</span>
Ctrl-e       <span class="cb-cmt"># scroll down 1 line (cursor stays)</span>
Ctrl-y       <span class="cb-cmt"># scroll up 1 line (cursor stays)</span>
zt           <span class="cb-cmt"># scroll so current line is at TOP of screen</span>
zz           <span class="cb-cmt"># scroll so current line is at MIDDLE of screen</span>
zb           <span class="cb-cmt"># scroll so current line is at BOTTOM of screen</span>
H            <span class="cb-cmt"># move cursor to top of screen (High)</span>
M            <span class="cb-cmt"># move cursor to middle of screen (Middle)</span>
L            <span class="cb-cmt"># move cursor to bottom of screen (Low)</span>

<span class="cb-cmt">## ─── CHARACTER SEARCH ON LINE ─────────────────────────────────</span>
f{char}      <span class="cb-cmt"># find char forward on line:  fa jumps to next 'a'</span>
F{char}      <span class="cb-cmt"># find char backward on line</span>
t{char}      <span class="cb-cmt"># till char — stop one before: ta stops before 'a'</span>
T{char}      <span class="cb-cmt"># till backward</span>
;            <span class="cb-cmt"># repeat last f/F/t/T forward</span>
,            <span class="cb-cmt"># repeat last f/F/t/T backward</span>

<span class="cb-cmt"># Practical: cursor on 'spark.executor.memory'
# f.  → jumps to first dot
# ;   → jumps to second dot
# ;   → jumps to third dot</span>

<span class="cb-cmt">## ─── MARKS — BOOKMARKS INSIDE VIM ────────────────────────────</span>
ma           <span class="cb-cmt"># set mark 'a' at current position (a-z for local, A-Z for global)</span>
'a           <span class="cb-cmt"># jump to LINE of mark 'a'</span>
\`a           <span class="cb-cmt"># jump to EXACT position (line+column) of mark 'a'</span>
''           <span class="cb-cmt"># jump back to last position before a jump (very useful!)</span>
'.           <span class="cb-cmt"># jump to position of last change</span>
:marks       <span class="cb-cmt"># list all current marks</span>

<span class="cb-cmt">## ─── BRACKET MATCHING ─────────────────────────────────────────</span>
%            <span class="cb-cmt"># jump to matching bracket: () [] {} — works for code!</span>

<span class="cb-cmt">## ─── SHOW CURRENT POSITION ────────────────────────────────────</span>
Ctrl-g       <span class="cb-cmt"># show filename, total lines, current position %</span>
g Ctrl-g     <span class="cb-cmt"># show word/char/byte count of current file</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — INSERT MODE: ENTERING TEXT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Insert Mode — Every Way to Enter Text</h2>

<p>There are many ways to enter Insert mode — each one positions the cursor differently. Choosing the right entry point eliminates extra cursor movement.</p>

<!-- Insert mode entry SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:0 auto;">
  <rect width="760" height="160" fill="#0d1117" rx="10"/>
  <text x="380" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Insert Mode Entry Points — Example Line: "spark.executor.memory   2g"</text>

  <!-- The line -->
  <rect x="30" y="55" width="700" height="30" fill="#161b22" rx="4"/>
  <text x="45" y="75" font-family="monospace" font-size="14" fill="#e6edf3">spark.executor.memory   2g</text>

  <!-- Cursor block on 's' -->
  <rect x="44" y="56" width="9" height="28" fill="#bc8cff" opacity="0.7"/>

  <!-- Key labels above/below the line -->
  <!-- I - start of line non-blank -->
  <line x1="55" y1="52" x2="55" y2="46" stroke="#3fb950" stroke-width="1.5"/>
  <text x="55" y="42" text-anchor="middle" font-family="monospace" font-size="11" fill="#3fb950">I</text>
  <text x="55" y="32" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">line start</text>

  <!-- i - before cursor -->
  <text x="100" y="42" text-anchor="middle" font-family="monospace" font-size="11" fill="#3fb950">i</text>
  <text x="100" y="32" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">before cur</text>
  <line x1="100" y1="44" x2="100" y2="52" stroke="#3fb950" stroke-width="1.5"/>

  <!-- a - after cursor -->
  <text x="200" y="100" text-anchor="middle" font-family="monospace" font-size="11" fill="#3fb950">a</text>
  <text x="200" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">after cur</text>
  <line x1="200" y1="86" x2="200" y2="98" stroke="#3fb950" stroke-width="1.5"/>

  <!-- A - end of line -->
  <text x="660" y="42" text-anchor="middle" font-family="monospace" font-size="11" fill="#3fb950">A</text>
  <text x="660" y="32" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">line end</text>
  <line x1="660" y1="44" x2="660" y2="52" stroke="#3fb950" stroke-width="1.5"/>

  <!-- o - new line below -->
  <text x="380" y="120" text-anchor="middle" font-family="monospace" font-size="11" fill="#ffa657">o</text>
  <text x="380" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">new line below</text>

  <!-- O - new line above -->
  <text x="530" y="42" text-anchor="middle" font-family="monospace" font-size="11" fill="#ffa657">O</text>
  <text x="530" y="32" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">new line above</text>
</svg>
</div>

<div class="console-block">
<div class="console-header">
  <span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span>
  <span class="cb-title">Console 3 of 7 — Insert Mode: Entry Keys &amp; Special Insert Tricks</span>
</div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── ALL WAYS TO ENTER INSERT MODE (from Normal) ─────────────</span>
i            <span class="cb-cmt"># Insert BEFORE cursor</span>
I            <span class="cb-cmt"># Insert at start of line (first non-blank char)</span>
a            <span class="cb-cmt"># Append AFTER cursor</span>
A            <span class="cb-cmt"># Append at END of line</span>
o            <span class="cb-cmt"># Open new line BELOW current + enter insert</span>
O            <span class="cb-cmt"># Open new line ABOVE current + enter insert</span>
s            <span class="cb-cmt"># Substitute: delete char under cursor + insert</span>
S            <span class="cb-cmt"># Substitute line: delete entire line content + insert</span>
C            <span class="cb-cmt"># Change to end of line: delete from cursor to EOL + insert</span>
cc           <span class="cb-cmt"># Change entire line: delete line content + insert</span>
cw           <span class="cb-cmt"># Change word: delete from cursor to end of word + insert</span>
ciw          <span class="cb-cmt"># Change inner word: delete whole word + insert</span>
ci"          <span class="cb-cmt"># Change inside quotes: delete content between "" + insert</span>
ci(          <span class="cb-cmt"># Change inside parentheses + insert</span>
ci{          <span class="cb-cmt"># Change inside curly braces + insert</span>
gi           <span class="cb-cmt"># Re-enter insert mode at LAST insert position</span>

<span class="cb-cmt">## ─── INSIDE INSERT MODE — SPECIAL KEYS ───────────────────────</span>
Ctrl-h       <span class="cb-cmt"># Backspace (delete char before cursor)</span>
Ctrl-w       <span class="cb-cmt"># Delete word before cursor</span>
Ctrl-u       <span class="cb-cmt"># Delete from cursor to start of line</span>
Ctrl-j       <span class="cb-cmt"># Same as Enter/newline</span>
Ctrl-t       <span class="cb-cmt"># Indent current line one level</span>
Ctrl-d       <span class="cb-cmt"># Un-indent current line one level</span>
Ctrl-n       <span class="cb-cmt"># Auto-complete: next match from document words</span>
Ctrl-p       <span class="cb-cmt"># Auto-complete: previous match from document words</span>
Ctrl-x Ctrl-f <span class="cb-cmt"># Auto-complete filenames</span>
Ctrl-x Ctrl-l <span class="cb-cmt"># Auto-complete whole lines</span>
Ctrl-r {reg} <span class="cb-cmt"># Paste from register:  Ctrl-r a  pastes register 'a'</span>
Ctrl-r "     <span class="cb-cmt"># Paste from default yank register (most recent yank)</span>
Ctrl-r +     <span class="cb-cmt"># Paste from system clipboard</span>
Ctrl-o {cmd} <span class="cb-cmt"># Execute ONE Normal mode command then return to Insert</span>
             <span class="cb-cmt"># Example: Ctrl-o zz  centers screen without leaving insert</span>
Esc          <span class="cb-cmt"># Return to Normal mode</span>
Ctrl-[       <span class="cb-cmt"># Equivalent to Esc (easier to type on some keyboards)</span>

<span class="cb-cmt">## ─── PRACTICAL EXAMPLE ────────────────────────────────────────</span>
<span class="cb-cmt"># Task: Change "2g" to "8g" on line: "spark.executor.memory   2g"
#
# Method 1: Navigate to 2, press s (substitute), type 8, press Esc
# Method 2: Navigate to 2, press r8 (single char replace — no Insert mode needed!)
# Method 3: Navigate to 2, press ciw (change inner word), type 8g, Esc
#
# r is the fastest for single char changes — it doesn't even enter Insert mode!</span>

<span class="cb-cmt">## ─── INSERT COUNT: REPEAT INSERT ─────────────────────────────</span>
5i-          <span class="cb-cmt"># Then Esc → inserts "-----" (5 dashes)</span>
             <span class="cb-cmt"># Pattern: {count}i{text}Esc repeats the insert count times</span>
3o           <span class="cb-cmt"># Then type text, Esc → inserts same text on 3 new lines</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — EDITING COMMANDS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Editing Commands — Delete, Copy, Paste, Undo</h2>

<p>Vim editing follows a grammar: <strong>Verb + Motion</strong> (or <strong>Verb + Text Object</strong>). Once you know the grammar, you can compose commands you've never used before and they'll just work.</p>

<div class="callout-box info-box">
  <strong>🧠 Vim Grammar:</strong><br>
  <code>[count] verb [count] motion</code> or <code>[count] verb text-object</code><br>
  Example: <code>d3w</code> = delete 3 words | <code>y$</code> = yank to end of line | <code>c2j</code> = change 2 lines down
</div>

<!-- CONSOLE 4: Editing -->
<div class="console-block">
<div class="console-header">
  <span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span>
  <span class="cb-title">Console 4 of 7 — Editing: Delete, Yank, Put, Change, Undo</span>
</div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── DELETE (d = delete, also copies to register) ───────────</span>
dd           <span class="cb-cmt"># delete entire current line</span>
3dd          <span class="cb-cmt"># delete 3 lines</span>
dw           <span class="cb-cmt"># delete from cursor to start of next word</span>
dW           <span class="cb-cmt"># delete from cursor to start of next WORD (incl. punctuation)</span>
de           <span class="cb-cmt"># delete from cursor to end of word</span>
d\$           <span class="cb-cmt"># delete from cursor to end of line</span>
d0           <span class="cb-cmt"># delete from cursor to start of line</span>
dG           <span class="cb-cmt"># delete from current line to end of file</span>
dgg          <span class="cb-cmt"># delete from current line to start of file</span>
diw          <span class="cb-cmt"># delete INNER word (whole word cursor is on)</span>
daw          <span class="cb-cmt"># delete A Word (word + surrounding space)</span>
di"          <span class="cb-cmt"># delete inside quotes (leaves the quotes)</span>
da"          <span class="cb-cmt"># delete Around quotes (deletes quotes too)</span>
di(          <span class="cb-cmt"># delete inside () parentheses</span>
di{          <span class="cb-cmt"># delete inside {} braces</span>
di[          <span class="cb-cmt"># delete inside [] brackets</span>
dt{char}     <span class="cb-cmt"># delete Till char (up to but not including char)</span>
df{char}     <span class="cb-cmt"># delete Find char (up to and including char)</span>
D            <span class="cb-cmt"># delete from cursor to end of line (same as d\$)</span>
x            <span class="cb-cmt"># delete character UNDER cursor (like Delete key)</span>
X            <span class="cb-cmt"># delete character BEFORE cursor (like Backspace)</span>
5x           <span class="cb-cmt"># delete 5 characters</span>

<span class="cb-cmt">## ─── YANK (y = copy to register) ─────────────────────────────</span>
yy           <span class="cb-cmt"># yank (copy) entire current line</span>
Y            <span class="cb-cmt"># same as yy</span>
3yy          <span class="cb-cmt"># yank 3 lines</span>
yw           <span class="cb-cmt"># yank from cursor to start of next word</span>
y\$           <span class="cb-cmt"># yank from cursor to end of line</span>
y0           <span class="cb-cmt"># yank from cursor to start of line</span>
yiw          <span class="cb-cmt"># yank inner word</span>
yaw          <span class="cb-cmt"># yank a word (with surrounding space)</span>
yi"          <span class="cb-cmt"># yank inside quotes</span>
yG           <span class="cb-cmt"># yank from current line to end of file</span>

<span class="cb-cmt">## ─── PUT (p = paste from register) ───────────────────────────</span>
p            <span class="cb-cmt"># put AFTER cursor (or below line if line was yanked)</span>
P            <span class="cb-cmt"># put BEFORE cursor (or above line if line was yanked)</span>
3p           <span class="cb-cmt"># paste 3 times</span>
]p           <span class="cb-cmt"># paste with auto-indent adjustment</span>
gp           <span class="cb-cmt"># paste after and move cursor to end of pasted text</span>

<span class="cb-cmt">## ─── CHANGE (c = delete + enter insert mode) ─────────────────</span>
cc           <span class="cb-cmt"># change entire line (clear + insert)</span>
cw           <span class="cb-cmt"># change from cursor to end of word</span>
ciw          <span class="cb-cmt"># change inner word (whole word)</span>
ci"          <span class="cb-cmt"># change inside quotes</span>
ci(          <span class="cb-cmt"># change inside parentheses</span>
c\$           <span class="cb-cmt"># change from cursor to end of line</span>
C            <span class="cb-cmt"># same as c\$</span>
ct{char}     <span class="cb-cmt"># change till char</span>
3cw          <span class="cb-cmt"># change 3 words</span>

<span class="cb-cmt">## ─── UNDO / REDO ──────────────────────────────────────────────</span>
u            <span class="cb-cmt"># undo last change</span>
5u           <span class="cb-cmt"># undo last 5 changes</span>
Ctrl-r       <span class="cb-cmt"># redo (re-apply undone change)</span>
U            <span class="cb-cmt"># undo ALL changes on current line (since you moved to it)</span>
:undolist    <span class="cb-cmt"># show undo tree (vim has branching undo!)</span>
:earlier 5m  <span class="cb-cmt"># go back to file state 5 minutes ago</span>
:later 30s   <span class="cb-cmt"># go forward 30 seconds in undo history</span>
<span class="cb-cmt"># Vim keeps UNLIMITED undo history during a session!</span>

<span class="cb-cmt">## ─── REPEAT ───────────────────────────────────────────────────</span>
.            <span class="cb-cmt"># repeat LAST change (the dot command — most powerful in vim!)</span>
<span class="cb-cmt"># Example workflow:
# ciw → type "8g" → Esc   (change one word to "8g")
# Move to next occurrence, press .   (repeat the change!)
# Move again, press .   (repeat again!)</span>

<span class="cb-cmt">## ─── CASE CHANGES ────────────────────────────────────────────</span>
~            <span class="cb-cmt"># toggle case of character under cursor</span>
g~w          <span class="cb-cmt"># toggle case of current word</span>
g~\$          <span class="cb-cmt"># toggle case to end of line</span>
gUw          <span class="cb-cmt"># UPPERCASE current word</span>
gUU          <span class="cb-cmt"># UPPERCASE entire line</span>
guw          <span class="cb-cmt"># lowercase current word</span>
guu          <span class="cb-cmt"># lowercase entire line</span>

<span class="cb-cmt">## ─── INDENT / DEDENT ─────────────────────────────────────────</span>
>>           <span class="cb-cmt"># indent current line one level (right)</span>
<<           <span class="cb-cmt"># dedent current line one level (left)</span>
3>>          <span class="cb-cmt"># indent 3 lines</span>
=G           <span class="cb-cmt"># auto-indent from cursor to end of file</span>
==           <span class="cb-cmt"># auto-indent current line</span>
gg=G         <span class="cb-cmt"># auto-indent ENTIRE file (gg=go top, =auto-indent, G=to end)</span>

<span class="cb-cmt">## ─── SORTING ──────────────────────────────────────────────────</span>
:sort        <span class="cb-cmt"># sort all lines alphabetically</span>
:sort!       <span class="cb-cmt"># sort reverse</span>
:sort n      <span class="cb-cmt"># sort numerically</span>
:sort u      <span class="cb-cmt"># sort unique (remove duplicates)</span>
:'&lt;,'&gt;sort   <span class="cb-cmt"># sort only selected lines (use after visual selection)</span>

<span class="cb-cmt">## ─── JOIN LINES ───────────────────────────────────────────────</span>
J            <span class="cb-cmt"># join current line with next line (adds space)</span>
gJ           <span class="cb-cmt"># join lines WITHOUT adding space</span>
3J           <span class="cb-cmt"># join 3 lines together</span>

<span class="cb-cmt">## ─── TEXT OBJECTS REFERENCE (crucial for efficiency) ─────────</span>
<span class="cb-cmt"># Format: {verb}i{obj} or {verb}a{obj}
# i = inner (content only)   a = around (content + delimiter)
#
# iw / aw   word
# iW / aW   WORD (includes punctuation)
# is / as   sentence
# ip / ap   paragraph
# i" / a"   inside/around double quotes
# i' / a'   inside/around single quotes
# i\` / a\`  inside/around backticks
# i( / a(   inside/around parentheses  (also ib / ab)
# i{ / a{   inside/around curly braces (also iB / aB)
# i[ / a[   inside/around square brackets
# it / at   inside/around HTML/XML tags
#
# Examples:
# di{  — delete everything inside curly braces of a function body
# ya"  — yank the quoted string including the quotes
# ci(  — change arguments inside a function call ()</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — SEARCH AND REPLACE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Search &amp; Replace — The Power of <code>:s</code></h2>

<!-- CONSOLE 5: Search and Replace -->
<div class="console-block">
<div class="console-header">
  <span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span>
  <span class="cb-title">Console 5 of 7 — Search, Replace, Global Commands</span>
</div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── SEARCH ──────────────────────────────────────────────────</span>
/pattern     <span class="cb-cmt"># search FORWARD for pattern (opens command line)</span>
?pattern     <span class="cb-cmt"># search BACKWARD for pattern</span>
n            <span class="cb-cmt"># jump to NEXT match (same direction as last search)</span>
N            <span class="cb-cmt"># jump to PREVIOUS match (reverse direction)</span>
*            <span class="cb-cmt"># search forward for word UNDER cursor (exact whole word)</span>
#            <span class="cb-cmt"># search backward for word under cursor</span>
g*           <span class="cb-cmt"># search forward for word under cursor (partial match OK)</span>
g#           <span class="cb-cmt"># search backward (partial match)</span>

<span class="cb-cmt"># Search highlights all matches. Clear highlight:</span>
:noh         <span class="cb-cmt"># (no highlight) — turn off search highlighting temporarily</span>
:set nohlsearch  <span class="cb-cmt"># turn off permanently (add to .vimrc)</span>

<span class="cb-cmt">## ─── SEARCH WITH REGEX ────────────────────────────────────────</span>
/\bspark\b   <span class="cb-cmt"># word boundary: exact "spark" not "sparkling"</span>
/^spark      <span class="cb-cmt"># lines STARTING with "spark"</span>
/memory\$    <span class="cb-cmt"># lines ENDING with "memory"</span>
/[0-9]\+g    <span class="cb-cmt"># one or more digits followed by 'g'</span>
/\d\+        <span class="cb-cmt"># one or more digits (\d = [0-9])</span>
/\w\+        <span class="cb-cmt"># one or more word characters</span>
/\s\+        <span class="cb-cmt"># one or more whitespace</span>
/.\{3\}      <span class="cb-cmt"># exactly 3 of any character</span>
/^#.*        <span class="cb-cmt"># lines starting with # (comment lines)</span>
/\v(foo|bar) <span class="cb-cmt"># \v = very magic mode — use without escaping +|()  </span>

<span class="cb-cmt">## ─── SUBSTITUTE (:s = search and replace) ────────────────────</span>
<span class="cb-cmt"># Syntax: :[range]s/pattern/replacement/[flags]</span>

:s/2g/8g/              <span class="cb-cmt"># replace FIRST occurrence on current line</span>
:s/2g/8g/g             <span class="cb-cmt"># replace ALL occurrences on current line (g = global)</span>
:s/2g/8g/gc            <span class="cb-cmt"># replace with CONFIRMATION each time (c = confirm)</span>
:s/2g/8g/gi            <span class="cb-cmt"># replace case-INsensitive (i = ignore case)</span>
:s/2g/8g/gI            <span class="cb-cmt"># replace case-SENSITIVE (override ignorecase setting)</span>

<span class="cb-cmt">## ─── SUBSTITUTE WITH RANGE ────────────────────────────────────</span>
:1,10s/old/new/g        <span class="cb-cmt"># replace in lines 1 to 10</span>
:10,\$s/old/new/g       <span class="cb-cmt"># replace from line 10 to end of file</span>
:%s/old/new/g           <span class="cb-cmt"># replace in ENTIRE FILE (% = all lines)</span>
:5s/old/new/g           <span class="cb-cmt"># replace only on line 5</span>
:'&lt;,'&gt;s/old/new/g       <span class="cb-cmt"># replace in visual selection (auto-filled after V)</span>
:.,+5s/old/new/g        <span class="cb-cmt"># current line and 5 lines below</span>

<span class="cb-cmt">## ─── REAL WORLD SUBSTITUTION EXAMPLES ────────────────────────</span>
:%s/spark\.executor\.memory\s\+2g/spark.executor.memory   8g/
<span class="cb-cmt"># Exactly replaces the memory setting line</span>

:%s/\s\+\$//g           <span class="cb-cmt"># remove trailing whitespace from all lines</span>
:%s/^/  /               <span class="cb-cmt"># indent all lines by 2 spaces (add to start)</span>
:%s/\t/    /g           <span class="cb-cmt"># replace all tabs with 4 spaces</span>
:%s/localhost/10.0.0.1/gc  <span class="cb-cmt"># change all hostnames with confirmation</span>
:%s/\bTrue\b/true/g     <span class="cb-cmt"># change Python True to JS true (word boundaries)</span>

<span class="cb-cmt">## ─── SUBSTITUTE FLAGS REFERENCE ──────────────────────────────</span>
<span class="cb-cmt"># g  — global: all occurrences per line (not just first)
# c  — confirm: ask y/n/a/q/l for each replacement
# i  — case insensitive
# I  — case sensitive (overrides ignorecase setting)
# n  — count matches without replacing (dry run!)
# e  — don't error if no match
# p  — print each line where replacement was made
#
# During confirm (c flag) prompts:
# y  = yes this one
# n  = no skip this one
# a  = all remaining (no more prompts)
# q  = quit substitution
# l  = last: replace this one then quit</span>

<span class="cb-cmt">## ─── BACK-REFERENCES IN REPLACEMENT ──────────────────────────</span>
:%s/\(memory\)\s\+\(.*\)/\\1   \\2/
<span class="cb-cmt"># \\1 and \\2 = back-references to captured groups</span>

:%s/\v(\w+)\.(\w+)/\\2.\\1/g
<span class="cb-cmt"># swap word.word → word.word (reverse the two parts)</span>

:%s/\v"([^"]+)"/'\\1'/g
<span class="cb-cmt"># change "double quoted" → 'single quoted'  (capture content, rewrap)</span>

<span class="cb-cmt">## ─── GLOBAL COMMAND (:g = run command on matching lines) ─────</span>
:g/pattern/d            <span class="cb-cmt"># delete all lines matching pattern</span>
:g/^#/d                 <span class="cb-cmt"># delete all comment lines (start with #)</span>
:g/^\s*\$/d             <span class="cb-cmt"># delete all blank lines</span>
:g/error/p              <span class="cb-cmt"># print all lines containing "error"</span>
:g/spark/yank A         <span class="cb-cmt"># yank all "spark" lines into register A (appends!)</span>
:g/TODO/normal 0i// DONE: <span class="cb-cmt"># prefix all TODO lines with "// DONE: "</span>
:v/pattern/d            <span class="cb-cmt"># delete lines NOT matching pattern (:v = inverse :g)</span>
:g!/pattern/d           <span class="cb-cmt"># same as :v — keep only matching lines</span>
:g/^/m 0                <span class="cb-cmt"># reverse the order of all lines in file!</span>

<span class="cb-cmt">## ─── COUNT OCCURRENCES ───────────────────────────────────────</span>
:%s/pattern//gn         <span class="cb-cmt"># count matches (n = no replace, just count)</span>
:g/pattern/             <span class="cb-cmt"># show all matching lines (like grep)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — VISUAL MODE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Visual Mode — Select, Then Act</h2>

<p>Visual mode lets you <strong>select text first</strong>, then apply an operation to the selection. Three types: character-wise, line-wise, and block (column) selection.</p>

<!-- Visual Mode SVG showing character vs line vs block -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:0 auto;">
  <rect width="760" height="220" fill="#0d1117" rx="10"/>
  <text x="380" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Three Visual Selection Types</text>

  <!-- v: character visual -->
  <text x="130" y="45" text-anchor="middle" font-family="monospace" font-size="11" fill="#3fb950">v — character visual</text>
  <text x="40" y="70" font-family="monospace" font-size="13" fill="#8b949e">spark.executor</text>
  <rect x="83" y="57" width="80" height="16" fill="#3fb950" opacity="0.3"/>
  <text x="83" y="70" font-family="monospace" font-size="13" fill="#3fb950">executor</text>
  <text x="40" y="88" font-family="monospace" font-size="13" fill="#8b949e">spark.driver</text>
  <text x="40" y="106" font-family="monospace" font-size="13" fill="#8b949e">spark.sql</text>
  <text x="40" y="125" text-anchor="start" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">select any arbitrary range of characters</text>

  <!-- V: line visual -->
  <text x="400" y="45" text-anchor="middle" font-family="monospace" font-size="11" fill="#58a6ff">V — line visual</text>
  <text x="270" y="70" font-family="monospace" font-size="13" fill="#8b949e">spark.executor</text>
  <rect x="268" y="73" width="175" height="16" fill="#58a6ff" opacity="0.3"/>
  <text x="270" y="88" font-family="monospace" font-size="13" fill="#58a6ff">spark.driver  </text>
  <rect x="268" y="91" width="175" height="16" fill="#58a6ff" opacity="0.3"/>
  <text x="270" y="106" font-family="monospace" font-size="13" fill="#58a6ff">spark.sql     </text>
  <text x="270" y="125" text-anchor="start" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">always selects whole lines</text>

  <!-- Ctrl-v: block visual -->
  <text x="645" y="45" text-anchor="middle" font-family="monospace" font-size="11" fill="#ffa657">Ctrl-v — block visual</text>
  <text x="520" y="70" font-family="monospace" font-size="13" fill="#8b949e">spark.executor   </text>
  <rect x="581" y="57" width="42" height="16" fill="#ffa657" opacity="0.3"/>
  <text x="581" y="70" font-family="monospace" font-size="13" fill="#ffa657">xecu</text>
  <text x="520" y="88" font-family="monospace" font-size="13" fill="#8b949e">spark.driver     </text>
  <rect x="581" y="75" width="42" height="16" fill="#ffa657" opacity="0.3"/>
  <text x="581" y="88" font-family="monospace" font-size="13" fill="#ffa657">driv</text>
  <text x="520" y="106" font-family="monospace" font-size="13" fill="#8b949e">spark.sql        </text>
  <rect x="581" y="93" width="42" height="16" fill="#ffa657" opacity="0.3"/>
  <text x="581" y="106" font-family="monospace" font-size="13" fill="#ffa657">sql.</text>
  <text x="520" y="125" text-anchor="start" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">column/rectangle selection</text>

  <!-- Example use cases -->
  <line x1="20" y1="145" x2="740" y2="145" stroke="#30363d" stroke-width="1"/>
  <text x="130" y="165" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Use case: yank partial line, replace specific phrase</text>
  <text x="400" y="165" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Use case: delete/indent/sort multiple lines</text>
  <text x="640" y="165" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Use case: add prefix to multiple lines, edit columns</text>
  <text x="130" y="185" text-anchor="middle" font-family="monospace" font-size="10" fill="#3fb950">v → move → d/y/c/&gt;/</text>
  <text x="400" y="185" text-anchor="middle" font-family="monospace" font-size="10" fill="#58a6ff">V → move → d/y/c/&gt;/:s</text>
  <text x="640" y="185" text-anchor="middle" font-family="monospace" font-size="10" fill="#ffa657">Ctrl-v → I/A for multi-line insert</text>
</svg>
</div>

<div class="console-block">
<div class="console-header">
  <span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span>
  <span class="cb-title">Console 6 of 7 — Visual Mode: Selection, Operations &amp; Block Editing</span>
</div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── ENTERING VISUAL MODE ─────────────────────────────────────</span>
v            <span class="cb-cmt"># character-wise visual (select chars)</span>
V            <span class="cb-cmt"># line-wise visual (select whole lines)</span>
Ctrl-v       <span class="cb-cmt"># block visual = column/rectangle select</span>
gv           <span class="cb-cmt"># re-select last visual selection</span>
o            <span class="cb-cmt"># while in visual: move cursor to OTHER end of selection</span>
O            <span class="cb-cmt"># in block visual: move to other corner</span>

<span class="cb-cmt">## ─── OPERATIONS ON VISUAL SELECTION ──────────────────────────</span>
d            <span class="cb-cmt"># delete selection</span>
y            <span class="cb-cmt"># yank (copy) selection</span>
c            <span class="cb-cmt"># change (delete + insert mode)</span>
&gt;            <span class="cb-cmt"># indent selection</span>
&lt;            <span class="cb-cmt"># dedent selection</span>
=            <span class="cb-cmt"># auto-indent selection</span>
~            <span class="cb-cmt"># toggle case of selection</span>
u            <span class="cb-cmt"># lowercase selection</span>
U            <span class="cb-cmt"># UPPERCASE selection</span>
J            <span class="cb-cmt"># join selected lines</span>
!{cmd}       <span class="cb-cmt"># pipe selection through shell command: !sort !python3</span>
:s/old/new/g <span class="cb-cmt"># substitute only within selection (auto-adds '&lt;,'&gt; range)</span>

<span class="cb-cmt">## ─── PRACTICAL VISUAL SELECTION EXAMPLES ─────────────────────</span>
<span class="cb-cmt"># TASK: Indent 5 config lines
# 1. Move to first line
# 2. Press V (line visual)
# 3. Press 4j (extend selection 4 lines down)
# 4. Press > (indent once)   or   3> (indent 3 levels)</span>

<span class="cb-cmt"># TASK: Comment out 3 lines with #
# 1. Move to first line  
# 2. Press Ctrl-v (block visual)
# 3. Press 2j (extend down 2 lines)
# 4. Press I (capital i — insert at start of block)
# 5. Type # then space
# 6. Press Esc → # is added to ALL selected lines!</span>

<span class="cb-cmt"># TASK: Remove a specific column from a config file
# 1. Press Ctrl-v (block visual)
# 2. Navigate to select the column
# 3. Press d → entire column deleted!</span>

<span class="cb-cmt">## ─── BLOCK INSERT — ADD TEXT TO MULTIPLE LINES AT ONCE ───────</span>
<span class="cb-cmt"># Example: add "export " prefix to these 3 lines:
#   PATH=/usr/bin
#   HOME=/home/ravi
#   USER=ravi
#
# 1. Ctrl-v → go to start of first line
# 2. 2j → extend selection down 2 lines
# 3. I → block insert mode
# 4. Type "export "
# 5. Esc → "export " added to ALL 3 lines simultaneously!</span>

<span class="cb-cmt">## ─── SELECT ALL FILE ──────────────────────────────────────────</span>
ggVG         <span class="cb-cmt"># select entire file: gg=top, V=line visual, G=bottom</span>
ggdG         <span class="cb-cmt"># delete entire file content: gg=top, d=delete, G=to bottom</span>
ggyG         <span class="cb-cmt"># yank entire file content</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — REGISTERS, MACROS, MULTIPLE FILES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Registers, Macros &amp; Multiple Files</h2>

<!-- CONSOLE 7: Registers, Macros, Multiple Files -->
<div class="console-block">
<div class="console-header">
  <span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span>
  <span class="cb-title">Console 7 of 7 — Registers, Macros, Buffers, Windows &amp; Tabs</span>
</div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ REGISTERS — Named Clipboards ══════════════════════════</span>
<span class="cb-cmt"># Vim has 26 named registers (a-z), plus special registers
# Use "x before a yank/delete to use register 'x'</span>

"ayy         <span class="cb-cmt"># yank current line into register 'a'</span>
"byw         <span class="cb-cmt"># yank current word into register 'b'</span>
"ap          <span class="cb-cmt"># paste from register 'a'</span>
"Ayy         <span class="cb-cmt"># APPEND current line to register 'a' (capital = append)</span>
:registers   <span class="cb-cmt"># list all registers and their contents</span>
:reg         <span class="cb-cmt"># shorthand for :registers</span>

<span class="cb-cmt"># Special registers:</span>
""           <span class="cb-cmt"># unnamed register: last d/y/c automatically goes here</span>
"0           <span class="cb-cmt"># yank register: last YANK (y) goes here, not affected by d</span>
"1 to "9     <span class="cb-cmt"># history: last 9 deleted line blocks</span>
"-           <span class="cb-cmt"># small delete register: last single-line delete</span>
".           <span class="cb-cmt"># last inserted text</span>
":           <span class="cb-cmt"># last command-mode command</span>
"/           <span class="cb-cmt"># last search pattern</span>
"%           <span class="cb-cmt"># current filename</span>
"#           <span class="cb-cmt"># alternate filename (last file edited)</span>
"*           <span class="cb-cmt"># system clipboard (primary selection — Ctrl-c)</span>
"+           <span class="cb-cmt"># system clipboard (Ctrl-v clipboard — most useful!)</span>
"_           <span class="cb-cmt"># black hole register: delete without affecting any register</span>
             <span class="cb-cmt"># "_dd = delete line without affecting yank/paste register</span>

<span class="cb-cmt">## ═══ MACROS — Record and Replay ════════════════════════════</span>
<span class="cb-cmt"># Macros record a sequence of keystrokes and replay them</span>

qa           <span class="cb-cmt"># START recording macro into register 'a'</span>
             <span class="cb-cmt"># ... do your editing steps ...</span>
q            <span class="cb-cmt"># STOP recording</span>
@a           <span class="cb-cmt"># PLAY macro from register 'a'</span>
@@           <span class="cb-cmt"># repeat last played macro</span>
10@a         <span class="cb-cmt"># play macro 'a' 10 times</span>
100@a        <span class="cb-cmt"># play macro 100 times (stops at end of file)</span>

<span class="cb-cmt"># PRACTICAL MACRO EXAMPLE:
# Task: Add a semicolon at end of every 10 config lines
#
# 1. Position on first line
# 2. qa       (start recording into 'a')
# 3. A;Esc    (Append ; at end, then Esc)
# 4. j        (move to next line)
# 5. q        (stop recording)
# 6. 9@a      (replay 9 more times = 10 lines total)
#
# DONE! 10 lines edited in 7 keystrokes.</span>

<span class="cb-cmt"># View macro contents (it's stored in the register):</span>
:reg a       <span class="cb-cmt"># shows what's stored in register 'a'</span>

<span class="cb-cmt"># Edit a macro:
# "ap     — paste the macro on a line
# edit it as text
# "ayy    — yank it back into register 'a'</span>

<span class="cb-cmt">## ═══ MULTIPLE FILES — Buffers ════════════════════════════</span>
:e file.txt          <span class="cb-cmt"># open file.txt in current window</span>
:e!                  <span class="cb-cmt"># reload current file (discard changes)</span>
:bn                  <span class="cb-cmt"># next buffer (bnext)</span>
:bp                  <span class="cb-cmt"># previous buffer (bprevious)</span>
:b3                  <span class="cb-cmt"># go to buffer 3</span>
:b filename          <span class="cb-cmt"># go to buffer by filename (tab-complete works!)</span>
:ls                  <span class="cb-cmt"># list all open buffers</span>
:buffers             <span class="cb-cmt"># same as :ls</span>
:bd                  <span class="cb-cmt"># buffer delete: close current buffer</span>
:bd 3                <span class="cb-cmt"># close buffer 3</span>
:bufdo %s/old/new/g  <span class="cb-cmt"># run :s on ALL open buffers</span>
:wa                  <span class="cb-cmt"># write (save) ALL modified buffers</span>

<span class="cb-cmt">## ═══ WINDOWS (splits) ══════════════════════════════════</span>
:sp file.txt         <span class="cb-cmt"># horizontal split: open file in new pane above</span>
:vsp file.txt        <span class="cb-cmt"># vertical split: open file in pane to the left</span>
Ctrl-w s             <span class="cb-cmt"># split current file horizontally</span>
Ctrl-w v             <span class="cb-cmt"># split current file vertically</span>
Ctrl-w w             <span class="cb-cmt"># cycle between windows</span>
Ctrl-w h/j/k/l       <span class="cb-cmt"># move to window left/down/up/right</span>
Ctrl-w H/J/K/L       <span class="cb-cmt"># MOVE current window to left/bottom/top/right</span>
Ctrl-w =             <span class="cb-cmt"># equalize all window sizes</span>
Ctrl-w _             <span class="cb-cmt"># maximize current window height</span>
Ctrl-w |             <span class="cb-cmt"># maximize current window width</span>
Ctrl-w +/-           <span class="cb-cmt"># increase/decrease current window height</span>
:q                   <span class="cb-cmt"># close current window (split)</span>
:only                <span class="cb-cmt"># close all other windows, keep only current</span>

<span class="cb-cmt">## ═══ TABS ══════════════════════════════════════════════</span>
:tabnew file.txt     <span class="cb-cmt"># open file in a new tab</span>
:tabnew              <span class="cb-cmt"># open empty new tab</span>
gt                   <span class="cb-cmt"># go to next tab</span>
gT                   <span class="cb-cmt"># go to previous tab</span>
3gt                  <span class="cb-cmt"># go to tab 3</span>
:tabc                <span class="cb-cmt"># close current tab</span>
:tabonly             <span class="cb-cmt"># close all other tabs</span>
:tabs                <span class="cb-cmt"># list all tabs</span>
:tabdo %s/old/new/g  <span class="cb-cmt"># run :s in all tabs</span>
</pre></div></div>

<!-- Buffer/Window/Tab Architecture SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:20px auto;">
  <rect width="760" height="200" fill="#0d1117" rx="10"/>
  <text x="380" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Vim: Buffer → Window → Tab Architecture</text>

  <!-- Tab bar -->
  <rect x="20" y="35" width="120" height="24" rx="4" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="80" y="51" text-anchor="middle" font-family="monospace" font-size="10" fill="#bc8cff">Tab 1</text>
  <rect x="145" y="35" width="120" height="24" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="205" y="51" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">Tab 2</text>
  <rect x="270" y="35" width="120" height="24" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="330" y="51" text-anchor="middle" font-family="monospace" font-size="10" fill="#8b949e">Tab 3</text>

  <!-- Tab 1 content: two windows -->
  <rect x="20" y="65" width="700" height="120" fill="#0a0e14" rx="4" stroke="#1a1a3a" stroke-width="1.5"/>

  <!-- Left window -->
  <rect x="25" y="70" width="340" height="110" fill="#161b22" rx="4" stroke="#bc8cff" stroke-width="1"/>
  <text x="195" y="88" text-anchor="middle" font-family="monospace" font-size="11" fill="#bc8cff">Window 1</text>
  <text x="40" y="105" font-family="monospace" font-size="10" fill="#3fb950">Buffer: config.py</text>
  <text x="40" y="120" font-family="monospace" font-size="10" fill="#8b949e">spark.executor.memory 8g</text>
  <text x="40" y="135" font-family="monospace" font-size="10" fill="#8b949e">spark.driver.memory   4g</text>
  <text x="40" y="165" font-family="monospace" font-size="10" fill="#30363d">:vsp → split here</text>

  <!-- Right window -->
  <rect x="370" y="70" width="345" height="110" fill="#161b22" rx="4" stroke="#58a6ff" stroke-width="1"/>
  <text x="542" y="88" text-anchor="middle" font-family="monospace" font-size="11" fill="#58a6ff">Window 2</text>
  <text x="385" y="105" font-family="monospace" font-size="10" fill="#3fb950">Buffer: notes.txt</text>
  <text x="385" y="120" font-family="monospace" font-size="10" fill="#8b949e">TODO: update memory setting</text>
  <text x="385" y="135" font-family="monospace" font-size="10" fill="#8b949e">Done: fixed ports</text>

  <!-- Annotations -->
  <text x="445" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Buffers = files in memory | Windows = viewports | Tabs = window groups</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — .VIMRC CONFIGURATION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> .vimrc — Configuring Vim for Data Engineering</h2>

<p>Your <code>~/.vimrc</code> (or <code>~/.config/nvim/init.vim</code> for Neovim) is read every time vim starts. It makes vim <em>yours</em>. Here's a production-ready config for data engineers and analysts.</p>

<div class="console-block">
<div class="console-header">
  <span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span>
  <span class="cb-title">~/.vimrc — Complete Data Engineer Config with Explanations</span>
</div>
<div class="console-body"><pre>
<span class="cb-cmt">" ─────────────────────────────────────────────────────────────
" ~/.vimrc — Data Engineer / Analyst / ML Setup
" Lines starting with " are comments in vimscript
" ─────────────────────────────────────────────────────────────

" ── ESSENTIAL: Must be first ──────────────────────────────────</span>
set nocompatible          <span class="cb-cmt">" disable vi compatibility (unlock all vim features)</span>
filetype plugin indent on <span class="cb-cmt">" detect filetype, load plugins, use filetype indentation</span>
syntax on                 <span class="cb-cmt">" enable syntax highlighting</span>

<span class="cb-cmt">" ── DISPLAY ───────────────────────────────────────────────────</span>
set number                <span class="cb-cmt">" show line numbers</span>
set relativenumber        <span class="cb-cmt">" show relative numbers (great for 5j 10dd etc)</span>
set cursorline            <span class="cb-cmt">" highlight the line your cursor is on</span>
set colorcolumn=80,120    <span class="cb-cmt">" visual rulers at column 80 and 120</span>
set signcolumn=yes        <span class="cb-cmt">" always show sign column (for git/linting symbols)</span>
set laststatus=2          <span class="cb-cmt">" always show status bar at bottom</span>
set ruler                 <span class="cb-cmt">" show cursor position in status bar</span>
set showcmd               <span class="cb-cmt">" show command being typed in bottom right</span>
set showmode              <span class="cb-cmt">" show current mode (INSERT/VISUAL/REPLACE)</span>
set wildmenu              <span class="cb-cmt">" tab-completion shows a menu in command mode</span>
set wildmode=longest,list <span class="cb-cmt">" complete longest match, then list options</span>

<span class="cb-cmt">" ── SEARCH ────────────────────────────────────────────────────</span>
set hlsearch              <span class="cb-cmt">" highlight all search matches</span>
set incsearch             <span class="cb-cmt">" incremental search: jump to matches as you type</span>
set ignorecase            <span class="cb-cmt">" case-insensitive search by default</span>
set smartcase             <span class="cb-cmt">" BUT: case-sensitive if pattern has uppercase</span>

<span class="cb-cmt">" ── INDENTATION ──────────────────────────────────────────────</span>
set expandtab             <span class="cb-cmt">" convert tabs to spaces (critical for Python!)</span>
set tabstop=4             <span class="cb-cmt">" display width of a tab character</span>
set shiftwidth=4          <span class="cb-cmt">" >> and << indent by 4 spaces</span>
set softtabstop=4         <span class="cb-cmt">" Tab in insert mode inserts 4 spaces</span>
set autoindent            <span class="cb-cmt">" keep indent of previous line on new lines</span>
set smartindent           <span class="cb-cmt">" auto-indent after { and similar</span>

<span class="cb-cmt">" ── FILE HANDLING ─────────────────────────────────────────────</span>
set encoding=utf-8        <span class="cb-cmt">" UTF-8 everywhere (essential for data work)</span>
set fileencoding=utf-8    <span class="cb-cmt">" write files as UTF-8</span>
set nobackup              <span class="cb-cmt">" don't create backup~ files</span>
set noswapfile            <span class="cb-cmt">" don't create .swp files (use version control instead)</span>
set undofile              <span class="cb-cmt">" persist undo history across sessions!</span>
set undodir=~/.vim/undo   <span class="cb-cmt">" where to store undo files</span>
set autoread              <span class="cb-cmt">" auto-reload file if changed outside vim</span>

<span class="cb-cmt">" ── EDITING UX ───────────────────────────────────────────────</span>
set backspace=indent,eol,start  <span class="cb-cmt">" backspace works across newlines and indents</span>
set clipboard=unnamedplus       <span class="cb-cmt">" use system clipboard for y/p (requires +clipboard)</span>
set mouse=a               <span class="cb-cmt">" enable mouse in all modes (scroll, click to position)</span>
set scrolloff=8           <span class="cb-cmt">" keep 8 lines visible above/below cursor</span>
set sidescrolloff=8       <span class="cb-cmt">" keep 8 cols visible left/right of cursor</span>
set wrap                  <span class="cb-cmt">" wrap long lines visually (don't scroll horizontally)</span>
set linebreak             <span class="cb-cmt">" wrap at word boundaries, not mid-word</span>
set confirm               <span class="cb-cmt">" ask instead of fail when saving unsaved buffer</span>
set splitright            <span class="cb-cmt">" :vsp opens new window on the RIGHT</span>
set splitbelow            <span class="cb-cmt">" :sp opens new window BELOW</span>
set hidden                <span class="cb-cmt">" allow switching buffers without saving</span>

<span class="cb-cmt">" ── KEY MAPPINGS ──────────────────────────────────────────────</span>
let mapleader = " "       <span class="cb-cmt">" set Space as leader key (leader = custom prefix)</span>

<span class="cb-cmt">" Quick save / quit</span>
nnoremap &lt;leader&gt;w :w&lt;CR&gt;     <span class="cb-cmt">" Space+w saves file</span>
nnoremap &lt;leader&gt;q :q&lt;CR&gt;     <span class="cb-cmt">" Space+q quits</span>
nnoremap &lt;leader&gt;x :x&lt;CR&gt;     <span class="cb-cmt">" Space+x save and quit</span>

<span class="cb-cmt">" Clear search highlight with Esc in Normal mode</span>
nnoremap &lt;Esc&gt; :noh&lt;CR&gt;&lt;Esc&gt;

<span class="cb-cmt">" Better window navigation</span>
nnoremap &lt;C-h&gt; &lt;C-w&gt;h         <span class="cb-cmt">" Ctrl+h moves to left window</span>
nnoremap &lt;C-j&gt; &lt;C-w&gt;j         <span class="cb-cmt">" Ctrl+j moves to window below</span>
nnoremap &lt;C-k&gt; &lt;C-w&gt;k         <span class="cb-cmt">" Ctrl+k moves to window above</span>
nnoremap &lt;C-l&gt; &lt;C-w&gt;l         <span class="cb-cmt">" Ctrl+l moves to right window</span>

<span class="cb-cmt">" Move lines up/down (like VS Code Alt+↑/↓)</span>
nnoremap &lt;A-j&gt; :m .+1&lt;CR&gt;==   <span class="cb-cmt">" Alt+j moves current line down</span>
nnoremap &lt;A-k&gt; :m .-2&lt;CR&gt;==   <span class="cb-cmt">" Alt+k moves current line up</span>
vnoremap &lt;A-j&gt; :m '&gt;+1&lt;CR&gt;gv= <span class="cb-cmt">" in visual: move selection down</span>
vnoremap &lt;A-k&gt; :m '&lt;-2&lt;CR&gt;gv= <span class="cb-cmt">" in visual: move selection up</span>

<span class="cb-cmt">" Stay in visual mode after indent</span>
vnoremap &lt; &lt;gv                 <span class="cb-cmt">" dedent and keep selection</span>
vnoremap &gt; &gt;gv                 <span class="cb-cmt">" indent and keep selection</span>

<span class="cb-cmt">" ── DATA ENGINEER SPECIFIC ────────────────────────────────────</span>
<span class="cb-cmt">" Python: follow PEP8</span>
autocmd FileType python setlocal expandtab tabstop=4 shiftwidth=4

<span class="cb-cmt">" SQL: 2-space indent</span>
autocmd FileType sql setlocal expandtab tabstop=2 shiftwidth=2

<span class="cb-cmt">" CSV: show a ruler at column 1 for alignment</span>
autocmd BufRead,BufNewFile *.csv set nowrap

<span class="cb-cmt">" Highlight trailing whitespace (shows up red)</span>
highlight TrailingWhitespace ctermbg=red guibg=red
match TrailingWhitespace /\s\+\$/

<span class="cb-cmt">" ── ABBREVIATIONS (typo corrections + shortcuts) ─────────────</span>
iabbrev teh the           <span class="cb-cmt">" auto-fix common typo</span>
iabbrev @@ ravi@company.com  <span class="cb-cmt">" @@ expands to email</span>
</pre></div></div>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ Kernel Deep-Dive — How Vim Talks to the Terminal</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# When you type a key in Vim, here's what happens at the OS level:

1. KEY PRESS EVENT
   Keyboard → USB/PS2 interrupt → kernel keyboard driver
   → generates a keycode (e.g., 'j' = 0x6A)

2. TERMINAL EMULATOR
   Terminal (xterm/gnome-terminal/iTerm) receives keycode
   → converts to escape sequence or raw byte
   → writes to the PTY (pseudo-terminal) master side

3. PTY SLAVE → VIM'S stdin
   Kernel PTY driver buffers the input
   Vim reads from /dev/pts/N via read(2) syscall
   vim's select()/poll() loop detects input available

4. VIM PROCESSES INPUT
   vim's getchar() reads one or more bytes
   Checks current mode (NORMAL? INSERT? COMMAND?)
   Dispatches to mode-specific key handler
   In NORMAL: 'j' → motion handler → cursor.row++
   In INSERT: 'j' → insert_char() → add 'j' to buffer

5. VIM UPDATES SCREEN
   After each keypress: vim computes minimal diff between
   current screen state and desired state
   Writes ANSI escape codes to stdout:
     \\033[5;33H  = move cursor to row 5, col 33
     \\033[32m    = set color to green
     "executor"  = write text
   Terminal emulator interprets escape codes → updates display

6. FILE WRITE (:w)
   vim calls write(2) or writev(2) with file content
   Kernel: dirty page cache → VFS → filesystem driver → disk
   On :w! to a file you don't own: write(2) returns EACCES

# THIS is why vim feels instant even on slow networks:
# It sends minimal escape code diffs, not full redraws.
# Even over a 9600 baud serial line, vim was usable.
# nano redraws the full screen on every keypress. Vim doesn't.
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — COMPLETE QUICK REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Quick Reference — All Important Commands</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th colspan="2" style="text-align:center;color:#bc8cff;background:#1a1a3a;">🟣 NORMAL MODE — Navigation</th></tr></thead>
<tbody>
<tr><td style="font-family:monospace;color:#bc8cff;width:30%">h j k l</td><td>← ↓ ↑ → one character/line</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">w W b B e E</td><td>word motions: next/prev word start, word end</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">0 ^ \$ g_</td><td>line start (col0), first non-blank, end, last non-blank</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">gg G {N}G</td><td>file start, file end, go to line N</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">% { }</td><td>matching bracket, prev/next paragraph</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">Ctrl-f Ctrl-b</td><td>page down, page up</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">Ctrl-d Ctrl-u</td><td>half page down, half page up</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">f{c} F{c} t{c} T{c}</td><td>find/till char forward/backward on line. ; , to repeat</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">'' \`\` ''.</td><td>last jump, exact last jump, last change</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">m{a} '{a}</td><td>set mark a, jump to mark a</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">zz zt zb</td><td>center/top/bottom cursor on screen</td></tr>
</tbody>
</table>
</div>

<div class="table-wrap" style="margin-top:12px;">
<table class="ref-table">
<thead><tr><th colspan="2" style="text-align:center;color:#3fb950;background:#1a3a1a;">🟢 NORMAL MODE — Editing</th></tr></thead>
<tbody>
<tr><td style="font-family:monospace;color:#3fb950;width:30%">dd D x X</td><td>delete line, to EOL, char fwd, char back</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">d{motion}</td><td>delete + motion: dw de d\$ d0 dG dgg</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">yy Y y{motion}</td><td>yank line, yank + motion</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">p P</td><td>put after/before cursor or line</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">cc C c{motion}</td><td>change line, to EOL, + motion</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">r{c} R</td><td>replace single char, enter Replace mode</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">u Ctrl-r U</td><td>undo, redo, undo all on line</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">.</td><td>repeat last change (THE most powerful command)</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">&gt;&gt; &lt;&lt; ==</td><td>indent, dedent, auto-indent line</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">J gJ</td><td>join with next line (with/without space)</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">~ gUU guu</td><td>toggle case char, UPPER line, lower line</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">qa ... q @a @@</td><td>record macro a, replay a, replay last</td></tr>
</tbody>
</table>
</div>

<div class="table-wrap" style="margin-top:12px;">
<table class="ref-table">
<thead><tr><th colspan="2" style="text-align:center;color:#f85149;background:#2a1a1a;">🔴 COMMAND MODE — :commands</th></tr></thead>
<tbody>
<tr><td style="font-family:monospace;color:#f85149;width:30%">:w :w! :wa</td><td>save, force save, save all</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:q :q! :qa!</td><td>quit, force quit, force quit all</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:wq :x ZZ ZQ</td><td>save+quit, save if changed+quit, shortcuts</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:e file :e!</td><td>edit file, reload current</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:r file :r !cmd</td><td>read file/command output into buffer</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:%s/old/new/gc</td><td>global substitute with confirmation</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:g/pat/d :v/pat/d</td><td>delete matching/non-matching lines</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:set nu :set rnu</td><td>line numbers, relative numbers</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:noh</td><td>clear search highlight</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:sp :vsp</td><td>horizontal/vertical split</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:tabnew :tabc gt gT</td><td>new tab, close tab, next/prev tab</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:ls :bn :bp :bd</td><td>list buffers, next/prev/delete buffer</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:sort :sort! :sort n</td><td>sort lines alpha, reverse, numeric</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:!cmd</td><td>run shell command without leaving vim</td></tr>
<tr><td style="font-family:monospace;color:#f85149;">:reg :marks</td><td>show registers / show marks</td></tr>
</tbody>
</table>
</div>

<div class="table-wrap" style="margin-top:12px;">
<table class="ref-table">
<thead><tr><th colspan="2" style="text-align:center;color:#3fb950;background:#1a3a1a;">🟢 INSERT MODE ENTRY (from Normal)</th></tr></thead>
<tbody>
<tr><td style="font-family:monospace;color:#3fb950;width:30%">i I</td><td>insert before cursor / start of line</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">a A</td><td>append after cursor / end of line</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">o O</td><td>new line below / above</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">s S</td><td>substitute char / whole line</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">c{motion} cc C</td><td>change motion / line / to EOL</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">gi</td><td>re-insert at last insert position</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">Esc Ctrl-[</td><td>exit insert → Normal mode</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Survive and Edit</h4>
    <p>Create a file <code>spark.conf</code> with 5 key=value config lines. Open it in vim. Navigate to line 3 using <code>3G</code>. Change the value using <code>ciw</code>. Navigate to line 5 using <code>G</code>. Append text using <code>A</code>. Save and quit using <code>:wq</code>. Open it again with <code>vim +2 spark.conf</code> to jump to line 2. Verify the change. Quit without saving using <code>:q!</code>.</p>
    <p><strong>Key commands to practice:</strong> <code>vim</code>, <code>G</code>, <code>gg</code>, <code>i</code>, <code>a</code>, <code>A</code>, <code>ciw</code>, <code>Esc</code>, <code>:w</code>, <code>:q</code>, <code>:wq</code></p>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Search and Fix</h4>
    <p>Create <code>pipeline.py</code> with 20 lines of Python including <code>localhost</code> appearing 5 times and <code>port=3306</code> appearing 3 times. Open in vim. Use <code>*</code> to search for "localhost". Navigate hits with <code>n</code> and <code>N</code>. Use <code>:%s/localhost/db.production.internal/gc</code> to replace all with confirmation — try saying <code>y</code> for some, <code>n</code> for others. Count how many replacements you made. Use <code>:%s/3306/5432/gn</code> to count the port occurrences without replacing.</p>
    <p><strong>Key commands:</strong> <code>*</code>, <code>n</code>, <code>N</code>, <code>:%s///gc</code>, <code>:%s///gn</code></p>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Visual Block Power</h4>
    <p>Create a file with these 5 lines of shell variable declarations:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">DB_HOST=localhost
DB_PORT=5432
DB_NAME=analytics
DB_USER=ravi
DB_PASS=secret123</pre>
    <p>Task 1: Use <code>Ctrl-v</code> block visual to select the entire left column (variable names) — copy them all. Task 2: Use <code>Ctrl-v</code> + <code>I</code> to add <code>export </code> as a prefix to ALL 5 lines simultaneously. Task 3: Delete the <code>DB_</code> prefix from all variable names in one block visual operation.</p>
    <p><strong>Key commands:</strong> <code>Ctrl-v</code>, <code>I</code>, <code>d</code>, <code>y</code>, <code>Esc</code></p>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — The Macro Multiplier</h4>
    <p>You have a CSV file with 50 lines. Each line is a raw SQL insert missing a semicolon and missing proper quoting around the second field:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">INSERT INTO sales VALUES (1, Delhi, 5421)
INSERT INTO sales VALUES (2, Mumbai, 4832)</pre>
    <p>Record a macro that: moves to the city name, surrounds it with quotes using <code>bi"Ea"</code>, then moves to end of line and adds a semicolon, then moves to the next line. Play the macro 49 more times. Verify using <code>:g/INTO/</code> to see all lines.</p>
    <p><strong>Key commands:</strong> <code>qa</code>, <code>q</code>, <code>@a</code>, <code>49@a</code>, <code>.</code></p>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Split-Screen Analysis</h4>
    <p>Open two files side by side: a Python ETL script and a config file. Using <code>:vsp config.yml</code> to open a vertical split. In the config file, find all database hostnames (<code>/db_host</code>). For each one, use <code>Ctrl-w w</code> to switch to the Python file, update the connection string there, switch back, and move to the next. Use registers to copy values between the two windows: <code>"ayiw</code> in the config window to yank a value into register a, switch windows, and <code>"ap</code> to paste it at the right location. Finally: use <code>:bufdo %s/DEBUG/INFO/g</code> to change log level across both files at once. Save all with <code>:wa</code>.</p>
    <p><strong>Bonus:</strong> Record the entire workflow as a macro and replay it on 3 more config files opened in new buffers.</p>
  </div>
</div>



</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — ADVANCED SEARCH & REGEX
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Advanced Search &amp; Regex — Find Anything in Any File</h2>

<p>Vim uses its own regex dialect with four "magic" levels. Mastering it lets you search for patterns no GUI editor can match — find all Python function definitions, all log lines with ERROR, all config values that are wrong.</p>

<!-- Vim Regex Magic Levels SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Vim Regex Magic Levels — Controls Which Characters Need Escaping</text>

  <!-- \v very magic -->
  <rect x="15" y="35" width="185" height="130" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="107" y="55" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#bc8cff">\\v  Very Magic</text>
  <text x="107" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Most like Perl/Python regex</text>
  <text x="25" y="93" font-family="monospace" font-size="10" fill="#3fb950">/\v(foo|bar)+</text>
  <text x="25" y="109" font-family="monospace" font-size="10" fill="#8b949e"># no escaping needed</text>
  <text x="25" y="125" font-family="monospace" font-size="10" fill="#8b949e"># () | + ? all work</text>
  <text x="107" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">USE THIS for complex patterns</text>

  <!-- \m magic (default) -->
  <rect x="210" y="35" width="185" height="130" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="302" y="55" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#3fb950">\\m  Magic (default)</text>
  <text x="302" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">. * [] no escape needed</text>
  <text x="220" y="93" font-family="monospace" font-size="10" fill="#3fb950">/\(foo\|bar\)\+</text>
  <text x="220" y="109" font-family="monospace" font-size="10" fill="#8b949e"># () | + need \\</text>
  <text x="220" y="125" font-family="monospace" font-size="10" fill="#8b949e"># . * [] don't</text>
  <text x="302" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">DEFAULT — what vim uses</text>

  <!-- \M nomagic -->
  <rect x="405" y="35" width="185" height="130" rx="8" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="497" y="55" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#ffa657">\\M  Nomagic</text>
  <text x="497" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Most chars are literal</text>
  <text x="415" y="93" font-family="monospace" font-size="10" fill="#ffa657">/\M(foo|bar)</text>
  <text x="415" y="109" font-family="monospace" font-size="10" fill="#8b949e"># ( ) | are literal</text>
  <text x="415" y="125" font-family="monospace" font-size="10" fill="#8b949e"># only ^ \$ special</text>
  <text x="497" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">For literal string searches</text>

  <!-- \V very nomagic -->
  <rect x="600" y="35" width="205" height="130" rx="8" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="702" y="55" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#f85149">\\V  Very Nomagic</text>
  <text x="702" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Almost everything literal</text>
  <text x="610" y="93" font-family="monospace" font-size="10" fill="#f85149">/\Vsome.literal.text</text>
  <text x="610" y="109" font-family="monospace" font-size="10" fill="#8b949e"># . is a literal dot</text>
  <text x="610" y="125" font-family="monospace" font-size="10" fill="#8b949e"># only \\ and / special</text>
  <text x="702" y="155" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">For exact string searches</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 12 — Advanced Regex &amp; Search Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── MAGIC MODES IN PRACTICE ─────────────────────────────────</span>
/\v(error|warning)\s+\d+      <span class="cb-cmt"># \v: () | \s \d all work without escaping</span>
/\(error\|warning\)\s\+\d\+   <span class="cb-cmt"># same in default magic — verbose!</span>
/\Vsome.exact.text             <span class="cb-cmt"># \V: dot is LITERAL — search for "some.exact.text"</span>
<span class="cb-cmt"># Recommendation: always start complex patterns with \v</span>

<span class="cb-cmt">## ─── CHARACTER CLASSES ────────────────────────────────────────</span>
\d          <span class="cb-cmt"># digit [0-9]</span>
\D          <span class="cb-cmt"># non-digit</span>
\w          <span class="cb-cmt"># word char [a-zA-Z0-9_]</span>
\W          <span class="cb-cmt"># non-word char</span>
\s          <span class="cb-cmt"># whitespace (space, tab)</span>
\S          <span class="cb-cmt"># non-whitespace</span>
\\a          <span class="cb-cmt"># alphabetic [a-zA-Z]</span>
\\l          <span class="cb-cmt"># lowercase letter [a-z]</span>
\\u          <span class="cb-cmt"># uppercase letter [A-Z]</span>
\\x          <span class="cb-cmt"># hex digit [0-9a-fA-F]</span>
\.          <span class="cb-cmt"># literal dot (in default magic)</span>
[^abc]      <span class="cb-cmt"># any char EXCEPT a, b, c</span>
[0-9a-f]    <span class="cb-cmt"># hex character class</span>

<span class="cb-cmt">## ─── ANCHORS ──────────────────────────────────────────────────</span>
^           <span class="cb-cmt"># start of line</span>
\$          <span class="cb-cmt"># end of line</span>
\&lt;          <span class="cb-cmt"># start of word boundary</span>
\&gt;          <span class="cb-cmt"># end of word boundary</span>
\&lt;spark\&gt;  <span class="cb-cmt"># exact word "spark" (not "sparkling" or "nospark")</span>
\%^         <span class="cb-cmt"># start of FILE</span>
\%\$        <span class="cb-cmt"># end of FILE</span>
\%42l       <span class="cb-cmt"># match only on line 42</span>
\%v         <span class="cb-cmt"># match only at visual selection start</span>

<span class="cb-cmt">## ─── QUANTIFIERS ──────────────────────────────────────────────</span>
*           <span class="cb-cmt"># 0 or more (greedy)</span>
\+          <span class="cb-cmt"># 1 or more (greedy) — in \v mode: just +</span>
\=          <span class="cb-cmt"># 0 or 1 (optional) — in \v mode: just ?</span>
\{n}        <span class="cb-cmt"># exactly n times</span>
\{n,m}      <span class="cb-cmt"># between n and m times</span>
\{n,}       <span class="cb-cmt"># n or more times</span>
\{-}        <span class="cb-cmt"># 0 or more (NON-GREEDY — matches as few as possible)</span>
\{-1,}      <span class="cb-cmt"># 1 or more (non-greedy)</span>

<span class="cb-cmt">## ─── GROUPS & ALTERNATION ─────────────────────────────────────</span>
\(foo\)     <span class="cb-cmt"># capture group (default magic)</span>
\vfoo       <span class="cb-cmt"># in \v: (foo) is a capture group</span>
\(foo\)\\1   <span class="cb-cmt"># backreference: match "foofoo"</span>
foo\|bar    <span class="cb-cmt"># alternation: foo OR bar (default magic)</span>
\v(foo|bar) <span class="cb-cmt"># same with \v magic</span>

<span class="cb-cmt">## ─── LOOKAHEAD & LOOKBEHIND ───────────────────────────────────</span>
foo\@=      <span class="cb-cmt"># lookahead: followed by foo (match pos before foo)</span>
foo\@!      <span class="cb-cmt"># negative lookahead: NOT followed by foo</span>
foo\@&lt;=     <span class="cb-cmt"># lookbehind: preceded by foo</span>
foo\@&lt;!     <span class="cb-cmt"># negative lookbehind: NOT preceded by foo</span>
<span class="cb-cmt"># Example: find all "memory" not preceded by "executor"</span>
/\(executor\)\@&lt;!memory

<span class="cb-cmt">## ─── REAL-WORLD SEARCH PATTERNS ──────────────────────────────</span>
/\v^\s*def \w+         <span class="cb-cmt"># all Python function definitions</span>
/\v^\s*class \w+       <span class="cb-cmt"># all Python class definitions</span>
/\v^(ERROR|WARN|FATAL) <span class="cb-cmt"># log lines with severity</span>
/\v\d{4}-\d{2}-\d{2}   <span class="cb-cmt"># ISO date: 2024-01-15</span>
/\v\d+\.\d+\.\d+\.\d+  <span class="cb-cmt"># IPv4 address</span>
/\v[a-zA-Z0-9._%+-]+\@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}  <span class="cb-cmt"># email address</span>
/\v"[^"]*"             <span class="cb-cmt"># any double-quoted string</span>
/\vtodo|fixme|hack|xxx <span class="cb-cmt"># code review markers (case insensitive: \c)</span>
/\v\c(todo|fixme)      <span class="cb-cmt"># \c inside pattern = case insensitive</span>
/\v^(.+)\n\\1\$         <span class="cb-cmt"># duplicate consecutive lines!</span>

<span class="cb-cmt">## ─── SEARCH WITH LINE NUMBER DISPLAY ─────────────────────────</span>
:g/\v^\s*def /         <span class="cb-cmt"># list ALL function definitions with line numbers</span>
:g/ERROR/p             <span class="cb-cmt"># print all ERROR lines</span>
:g/WARN/nu             <span class="cb-cmt"># print with line numbers</span>
:%s/\v(TODO)/\\1/gn     <span class="cb-cmt"># count TODOs in file without replacing</span>
</pre></div></div>
</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — FOLDING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Folding — Collapse &amp; Focus on What Matters</h2>

<p>Folding hides blocks of text — a Python function body, a long config section, a log block — so you see only what you need. When working with 500-line Spark config or 2000-line pipeline scripts, folding is essential.</p>

<!-- Folding SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:0 auto;">
  <rect width="760" height="230" fill="#0d1117" rx="10"/>
  <text x="200" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Unfolded</text>
  <text x="570" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Folded</text>
  <line x1="380" y1="15" x2="380" y2="215" stroke="#30363d" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Unfolded left -->
  <rect x="15" y="30" width="350" height="190" fill="#0a0e14" rx="6"/>
  <text x="25" y="50" font-family="monospace" font-size="11" fill="#8b949e"> 1 </text><text x="50" y="50" font-family="monospace" font-size="11" fill="#bc8cff">def</text><text x="75" y="50" font-family="monospace" font-size="11" fill="#e6edf3"> load_data(path):</text>
  <text x="25" y="66" font-family="monospace" font-size="11" fill="#8b949e"> 2 </text><text x="50" y="66" font-family="monospace" font-size="11" fill="#8b949e">   """Load CSV data"""</text>
  <text x="25" y="82" font-family="monospace" font-size="11" fill="#8b949e"> 3 </text><text x="50" y="82" font-family="monospace" font-size="11" fill="#8b949e">   df = pd.read_csv(path)</text>
  <text x="25" y="98" font-family="monospace" font-size="11" fill="#8b949e"> 4 </text><text x="50" y="98" font-family="monospace" font-size="11" fill="#8b949e">   df.columns = df.columns.str.lower()</text>
  <text x="25" y="114" font-family="monospace" font-size="11" fill="#8b949e"> 5 </text><text x="50" y="114" font-family="monospace" font-size="11" fill="#8b949e">   df = df.dropna()</text>
  <text x="25" y="130" font-family="monospace" font-size="11" fill="#8b949e"> 6 </text><text x="50" y="130" font-family="monospace" font-size="11" fill="#8b949e">   return df</text>
  <text x="25" y="146" font-family="monospace" font-size="11" fill="#8b949e"> 7 </text>
  <text x="25" y="162" font-family="monospace" font-size="11" fill="#8b949e"> 8 </text><text x="50" y="162" font-family="monospace" font-size="11" fill="#bc8cff">def</text><text x="75" y="162" font-family="monospace" font-size="11" fill="#e6edf3"> clean_data(df):</text>
  <text x="25" y="178" font-family="monospace" font-size="11" fill="#8b949e"> 9 </text><text x="50" y="178" font-family="monospace" font-size="11" fill="#8b949e">   df = df.drop_duplicates()</text>
  <text x="25" y="194" font-family="monospace" font-size="11" fill="#8b949e">10 </text><text x="50" y="194" font-family="monospace" font-size="11" fill="#8b949e">   return df</text>
  <text x="25" y="210" font-family="monospace" font-size="11" fill="#8b949e">11 </text>

  <!-- Arrow -->
  <text x="380" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="20" fill="#3fb950">→</text>

  <!-- Folded right -->
  <rect x="395" y="30" width="350" height="190" fill="#0a0e14" rx="6"/>
  <text x="405" y="50" font-family="monospace" font-size="11" fill="#8b949e"> 1 </text>
  <!-- Fold line -->
  <rect x="415" y="55" width="320" height="16" fill="#1a2a1a" rx="3"/>
  <text x="420" y="67" font-family="monospace" font-size="11" fill="#3fb950">+-- def load_data(path):  [6 lines] -----</text>
  <text x="405" y="90" font-family="monospace" font-size="11" fill="#8b949e"> 7 </text>
  <text x="405" y="106" font-family="monospace" font-size="11" fill="#8b949e"> 8 </text>
  <!-- Fold line 2 -->
  <rect x="415" y="111" width="320" height="16" fill="#1a2a1a" rx="3"/>
  <text x="420" y="123" font-family="monospace" font-size="11" fill="#3fb950">+-- def clean_data(df):   [3 lines] -----</text>
  <text x="405" y="146" font-family="monospace" font-size="11" fill="#8b949e">11 </text>

  <!-- Labels -->
  <text x="200" y="220" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">11 visible lines</text>
  <text x="570" y="220" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">3 visible lines — functions collapsed</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 12 — Folding: Methods, Commands &amp; Data Engineering Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── FOLD METHODS — set before using folds ────────────────────</span>
:set foldmethod=manual    <span class="cb-cmt"># you create folds manually with zf</span>
:set foldmethod=indent    <span class="cb-cmt"># fold based on indentation (GREAT for Python!)</span>
:set foldmethod=syntax    <span class="cb-cmt"># fold based on syntax (functions, classes)</span>
:set foldmethod=marker    <span class="cb-cmt"># fold between {{{  }}} markers in the file</span>
:set foldmethod=expr      <span class="cb-cmt"># fold using a custom expression</span>
:set foldmethod=diff      <span class="cb-cmt"># fold unchanged sections in vimdiff mode</span>

<span class="cb-cmt">## ─── OPENING & CLOSING FOLDS ──────────────────────────────────</span>
zo          <span class="cb-cmt"># open fold under cursor (one level)</span>
zO          <span class="cb-cmt"># open ALL folds under cursor recursively</span>
zc          <span class="cb-cmt"># close fold under cursor</span>
zC          <span class="cb-cmt"># close ALL folds under cursor recursively</span>
za          <span class="cb-cmt"># TOGGLE fold (open if closed, close if open) — most used!</span>
zA          <span class="cb-cmt"># toggle ALL folds under cursor recursively</span>
zR          <span class="cb-cmt"># open ALL folds in file (R = reduce to nothing)</span>
zM          <span class="cb-cmt"># close ALL folds in file (M = maximize folding)</span>
zv          <span class="cb-cmt"># open just enough folds to show cursor line</span>

<span class="cb-cmt">## ─── CREATING MANUAL FOLDS ────────────────────────────────────</span>
:set foldmethod=manual
zf5j        <span class="cb-cmt"># create fold: current + 5 lines below</span>
zf%         <span class="cb-cmt"># fold to matching bracket (fold entire function body!)</span>
zfip        <span class="cb-cmt"># fold inner paragraph</span>
zfat        <span class="cb-cmt"># fold around HTML/XML tag</span>
<span class="cb-cmt"># In Visual mode: select lines, then zf to fold selection</span>
Vjj zf      <span class="cb-cmt"># visual line select 3 lines, then fold</span>

<span class="cb-cmt">## ─── DELETING FOLDS ───────────────────────────────────────────</span>
zd          <span class="cb-cmt"># delete fold at cursor (unfold and forget)</span>
zD          <span class="cb-cmt"># delete all folds at cursor recursively</span>
zE          <span class="cb-cmt"># eliminate ALL folds in window</span>

<span class="cb-cmt">## ─── FOLD NAVIGATION ──────────────────────────────────────────</span>
zj          <span class="cb-cmt"># move to NEXT fold</span>
zk          <span class="cb-cmt"># move to PREVIOUS fold</span>
[z          <span class="cb-cmt"># move to start of current open fold</span>
]z          <span class="cb-cmt"># move to end of current open fold</span>

<span class="cb-cmt">## ─── FOLD LEVEL ───────────────────────────────────────────────</span>
:set foldlevel=2    <span class="cb-cmt"># show folds up to level 2 (deeper = collapsed)</span>
:set foldlevel=0    <span class="cb-cmt"># collapse everything</span>
:set foldlevel=99   <span class="cb-cmt"># open everything</span>
zm              <span class="cb-cmt"># decrease foldlevel by 1 (fold more)</span>
zr              <span class="cb-cmt"># increase foldlevel by 1 (open more)</span>

<span class="cb-cmt">## ─── MARKER FOLDS (add markers to file) ──────────────────────</span>
:set foldmethod=marker
<span class="cb-cmt"># Add these markers directly to your file:</span>
<span class="cb-cmt"># --- SPARK CONFIG {{{</span>
<span class="cb-cmt">spark.executor.memory 8g</span>
<span class="cb-cmt">spark.driver.memory   4g</span>
<span class="cb-cmt"># }}} END SPARK CONFIG</span>
<span class="cb-cmt"># Everything between {{{ and }}} collapses into one line</span>

<span class="cb-cmt">## ─── PYTHON DATA ENGINEERING WORKFLOW ────────────────────────</span>
<span class="cb-cmt"># Open big ETL script:  vim pipeline.py</span>
:set foldmethod=indent   <span class="cb-cmt"># Python uses indentation — perfect!</span>
:set foldlevel=0         <span class="cb-cmt"># collapse all: see only function defs at top level</span>
zR                       <span class="cb-cmt"># open all to review</span>
zM                       <span class="cb-cmt"># collapse all again</span>
<span class="cb-cmt"># Now navigate just the function names:</span>
/def                     <span class="cb-cmt"># search for function defs</span>
za                       <span class="cb-cmt"># toggle the one you want to edit</span>

<span class="cb-cmt">## ─── SAVE & RESTORE FOLDS ─────────────────────────────────────</span>
:mkview             <span class="cb-cmt"># save fold state + cursor position to view file</span>
:loadview           <span class="cb-cmt"># restore saved view</span>
<span class="cb-cmt"># Auto-save/restore folds in .vimrc:</span>
<span class="cb-cmt">" autocmd BufWinLeave *.py mkview</span>
<span class="cb-cmt">" autocmd BufWinEnter *.py silent! loadview</span>
</pre></div></div>
</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 15 — SPELL CHECK
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Spell Check — For Docs, Configs, Markdown &amp; Comments</h2>

<p>Vim has a powerful built-in spell checker. For data engineers writing <code>README.md</code> files, docstrings, Confluence pages in vim, or config comments — spell check catches embarrassing mistakes.</p>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 12 — Spell Check: All Commands &amp; Configuration</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── ENABLE/DISABLE SPELL CHECK ──────────────────────────────</span>
:set spell              <span class="cb-cmt"># turn on spell check</span>
:set nospell            <span class="cb-cmt"># turn off</span>
:set spell!             <span class="cb-cmt"># toggle on/off</span>
:set spelllang=en_us    <span class="cb-cmt"># set language to American English</span>
:set spelllang=en_gb    <span class="cb-cmt"># British English</span>
:set spelllang=en_us,en_gb  <span class="cb-cmt"># check against both</span>

<span class="cb-cmt"># Misspelled words are highlighted (usually red underline or bg color)
# Add to .vimrc to auto-enable for specific filetypes:</span>
<span class="cb-cmt">" autocmd FileType markdown,text,gitcommit setlocal spell spelllang=en_us</span>

<span class="cb-cmt">## ─── NAVIGATING SPELLING ERRORS ──────────────────────────────</span>
]s          <span class="cb-cmt"># jump to NEXT spelling mistake</span>
[s          <span class="cb-cmt"># jump to PREVIOUS spelling mistake</span>
]S          <span class="cb-cmt"># next mistake (skip rare words)</span>
[S          <span class="cb-cmt"># previous mistake (skip rare words)</span>

<span class="cb-cmt">## ─── FIXING SPELLING ERRORS ──────────────────────────────────</span>
z=          <span class="cb-cmt"># suggest corrections for word under cursor — numbered list</span>
            <span class="cb-cmt"># Press the number to accept that suggestion</span>
1z=         <span class="cb-cmt"># accept the FIRST suggestion immediately (no menu)</span>
zg          <span class="cb-cmt"># mark word as GOOD (add to personal dictionary)</span>
zG          <span class="cb-cmt"># mark word as GOOD temporarily (this session only)</span>
zw          <span class="cb-cmt"># mark word as WRONG (add to bad word list)</span>
zW          <span class="cb-cmt"># mark as wrong temporarily</span>
zug         <span class="cb-cmt"># undo zg (remove word from personal dictionary)</span>
zuw         <span class="cb-cmt"># undo zw</span>

<span class="cb-cmt">## ─── PRACTICAL WORKFLOW ───────────────────────────────────────</span>
<span class="cb-cmt"># Writing a README — find and fix all mistakes:
# :set spell
# ]s           → jump to first misspelling
# z=           → see suggestions, pick one
# ]s           → jump to next
# zg           → "Pyspark" is not a mistake — add to dictionary
# 1z=          → auto-accept top suggestion for obvious typos</span>

<span class="cb-cmt">## ─── SPELL CHECK FOR CODE COMMENTS ONLY ─────────────────────</span>
<span class="cb-cmt"># In .vimrc: spell check only in comments/strings, not code:</span>
<span class="cb-cmt">" syntax spell toplevel   " check everywhere</span>
<span class="cb-cmt">" syntax spell notoplevel " check only in comments/strings</span>

<span class="cb-cmt">## ─── CUSTOM SPELL FILES ───────────────────────────────────────</span>
:set spellfile=~/.vim/spell/tech.utf-8.add   <span class="cb-cmt"># custom word list file</span>
<span class="cb-cmt"># Add technical terms that vim doesn't know:
# zg on: DataFrame, PySpark, Hadoop, Airflow, Kafka, Snowflake, dbt
# These go into your personal spellfile automatically</span>

<span class="cb-cmt">## ─── SPELL CHECK SPECIFIC REGION (Visual) ────────────────────</span>
<span class="cb-cmt"># Select text with V, then: just navigate to it and check]
# Vim highlights inline — no special command needed for region</span>
</pre></div></div>
</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 16 — VIMDIFF
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> vimdiff — Compare &amp; Merge Files Like a Pro</h2>

<p>vimdiff shows two (or three) files side-by-side with differences highlighted. Indispensable for: comparing dev vs prod configs, reviewing changes before deploying, merging conflict files, checking old vs new versions of a pipeline script.</p>

<!-- vimdiff SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <rect width="820" height="260" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">vimdiff — dev.conf vs prod.conf with Difference Highlighting</text>

  <!-- Left pane: dev.conf -->
  <rect x="15" y="32" width="385" height="220" fill="#0a0e14" rx="6"/>
  <rect x="15" y="32" width="385" height="22" fill="#1f2937" rx="6"/>
  <rect x="15" y="44" width="385" height="10" fill="#1f2937"/>
  <text x="207" y="47" text-anchor="middle" font-family="monospace" font-size="11" fill="#58a6ff">dev.conf</text>

  <text x="25" y="71" font-family="monospace" font-size="11" fill="#8b949e"> 1 </text><text x="50" y="71" font-family="monospace" font-size="11" fill="#8b949e">db.host=localhost</text>
  <text x="25" y="87" font-family="monospace" font-size="11" fill="#8b949e"> 2 </text><text x="50" y="87" font-family="monospace" font-size="11" fill="#8b949e">db.port=5432</text>
  <!-- changed line -->
  <rect x="15" y="92" width="385" height="16" fill="rgba(255,107,107,0.15)"/>
  <text x="25" y="103" font-family="monospace" font-size="11" fill="#8b949e"> 3 </text><text x="50" y="103" font-family="monospace" font-size="11" fill="#f85149">log.level=DEBUG</text>
  <text x="25" y="119" font-family="monospace" font-size="11" fill="#8b949e"> 4 </text><text x="50" y="119" font-family="monospace" font-size="11" fill="#8b949e">max.pool=5</text>
  <!-- missing line (only in dev) -->
  <rect x="15" y="124" width="385" height="16" fill="rgba(79,255,176,0.12)"/>
  <text x="25" y="135" font-family="monospace" font-size="11" fill="#8b949e"> 5 </text><text x="50" y="135" font-family="monospace" font-size="11" fill="#3fb950">debug.trace=true</text>
  <text x="25" y="151" font-family="monospace" font-size="11" fill="#8b949e"> 6 </text><text x="50" y="151" font-family="monospace" font-size="11" fill="#8b949e">timeout=30</text>
  <!-- changed -->
  <rect x="15" y="156" width="385" height="16" fill="rgba(255,107,107,0.15)"/>
  <text x="25" y="167" font-family="monospace" font-size="11" fill="#8b949e"> 7 </text><text x="50" y="167" font-family="monospace" font-size="11" fill="#f85149">workers=2</text>

  <!-- Right pane: prod.conf -->
  <rect x="420" y="32" width="385" height="220" fill="#0a0e14" rx="6"/>
  <rect x="420" y="32" width="385" height="22" fill="#1f2937" rx="6"/>
  <rect x="420" y="44" width="385" height="10" fill="#1f2937"/>
  <text x="612" y="47" text-anchor="middle" font-family="monospace" font-size="11" fill="#3fb950">prod.conf</text>

  <text x="430" y="71" font-family="monospace" font-size="11" fill="#8b949e"> 1 </text><text x="455" y="71" font-family="monospace" font-size="11" fill="#8b949e">db.host=db.prod.internal</text>
  <text x="430" y="87" font-family="monospace" font-size="11" fill="#8b949e"> 2 </text><text x="455" y="87" font-family="monospace" font-size="11" fill="#8b949e">db.port=5432</text>
  <rect x="420" y="92" width="385" height="16" fill="rgba(255,107,107,0.15)"/>
  <text x="430" y="103" font-family="monospace" font-size="11" fill="#8b949e"> 3 </text><text x="455" y="103" font-family="monospace" font-size="11" fill="#f85149">log.level=INFO</text>
  <text x="430" y="119" font-family="monospace" font-size="11" fill="#8b949e"> 4 </text><text x="455" y="119" font-family="monospace" font-size="11" fill="#8b949e">max.pool=50</text>
  <!-- missing in prod (filler) -->
  <rect x="420" y="124" width="385" height="16" fill="rgba(30,30,50,0.8)"/>
  <text x="612" y="135" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#30363d">---  (line only in dev)  ---</text>
  <text x="430" y="151" font-family="monospace" font-size="11" fill="#8b949e"> 5 </text><text x="455" y="151" font-family="monospace" font-size="11" fill="#8b949e">timeout=30</text>
  <rect x="420" y="156" width="385" height="16" fill="rgba(255,107,107,0.15)"/>
  <text x="430" y="167" font-family="monospace" font-size="11" fill="#8b949e"> 6 </text><text x="455" y="167" font-family="monospace" font-size="11" fill="#f85149">workers=16</text>

  <!-- Legend -->
  <rect x="15" y="200" width="790" height="45" fill="#0d1117" rx="4"/>
  <rect x="25" y="212" width="14" height="12" fill="rgba(255,107,107,0.3)" rx="2"/>
  <text x="45" y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">changed line</text>
  <rect x="150" y="212" width="14" height="12" fill="rgba(79,255,176,0.2)" rx="2"/>
  <text x="170" y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">added line (only in this file)</text>
  <rect x="380" y="212" width="14" height="12" fill="rgba(30,30,50,0.8)" rx="2"/>
  <text x="400" y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#30363d">filler (line missing here)</text>
  <text x="25" y="238" font-family="monospace" font-size="10" fill="#8b949e">]c = next diff   [c = prev diff   dp = diff put (push change)   do = diff obtain (pull change)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">vimdiff — Opening, Navigating, Merging Differences</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── OPENING VIMDIFF ──────────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vimdiff</span> dev.conf prod.conf           <span class="cb-cmt"># two-file diff from shell</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vimdiff</span> old.py new.py patch.py       <span class="cb-cmt"># three-way diff (merge)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">-d</span> dev.conf prod.conf            <span class="cb-cmt"># same as vimdiff</span>

<span class="cb-cmt"># From inside vim — open diff of current file vs another:</span>
:diffsplit prod.conf      <span class="cb-cmt"># horizontal split + diff</span>
:vert diffsplit prod.conf <span class="cb-cmt"># vertical split + diff (better for most files)</span>
:diffthis                 <span class="cb-cmt"># mark current window as part of diff</span>
:diffoff                  <span class="cb-cmt"># stop diffing current window</span>
:diffoff!                 <span class="cb-cmt"># stop diffing ALL windows</span>

<span class="cb-cmt">## ─── DIFF vs VERSION CONTROL ──────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">git</span> difftool HEAD~1 pipeline.py       <span class="cb-cmt"># diff vs last commit</span>
<span class="cb-cmt"># Set vim as git's difftool in ~/.gitconfig:</span>
<span class="cb-cmt"># [diff]</span>
<span class="cb-cmt">#     tool = vimdiff</span>
<span class="cb-cmt"># [difftool]</span>
<span class="cb-cmt">#     prompt = false</span>

<span class="cb-cmt">## ─── NAVIGATING DIFFERENCES ───────────────────────────────────</span>
]c          <span class="cb-cmt"># jump to NEXT difference</span>
[c          <span class="cb-cmt"># jump to PREVIOUS difference</span>
Ctrl-w w    <span class="cb-cmt"># switch between left and right pane</span>
Ctrl-w h/l  <span class="cb-cmt"># move to left/right window</span>

<span class="cb-cmt">## ─── MERGING CHANGES ──────────────────────────────────────────</span>
dp          <span class="cb-cmt"># diff PUT: push current change TO the other file</span>
do          <span class="cb-cmt"># diff OBTAIN: pull change FROM the other file INTO this one</span>
<span class="cb-cmt"># Mnemonic: dp = "I'm right, push mine over", do = "get theirs"</span>

<span class="cb-cmt"># THREE-WAY MERGE (common in git conflicts):</span>
<span class="cb-cmt"># vimdiff MINE BASE THEIRS</span>
<span class="cb-cmt"># Left = your version, Center = common ancestor, Right = their version</span>
<span class="cb-cmt"># Use dp/do to pull changes into the center buffer</span>
<span class="cb-cmt"># Save the center file = merged result</span>

<span class="cb-cmt">## ─── DIFF UPDATE ──────────────────────────────────────────────</span>
:diffupdate <span class="cb-cmt"># recompute diff (if file was changed externally)</span>
:set diffopt+=iwhite     <span class="cb-cmt"># ignore whitespace differences</span>
:set diffopt+=vertical   <span class="cb-cmt"># always use vertical split</span>
:set diffopt+=context:5  <span class="cb-cmt"># show 5 lines of context around each diff</span>

<span class="cb-cmt">## ─── FOLD UNCHANGED SECTIONS ─────────────────────────────────</span>
<span class="cb-cmt"># vimdiff auto-folds unchanged sections by default</span>
zR          <span class="cb-cmt"># show ALL lines (unfold everything)</span>
zM          <span class="cb-cmt"># collapse unchanged sections again</span>

<span class="cb-cmt">## ─── DATA ENGINEER WORKFLOW: COMPARE DEV vs PROD CONFIGS ─────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vimdiff</span> configs/dev.yml configs/prod.yml
<span class="cb-cmt"># ]c → jump to first diff (e.g., log.level=DEBUG vs INFO)</span>
<span class="cb-cmt"># do  → pull prod value into dev (update dev to match prod setting)</span>
<span class="cb-cmt"># ]c → next diff (workers=2 vs workers=16)</span>
<span class="cb-cmt"># dp  → push dev's value to prod (rare — usually other way)</span>
<span class="cb-cmt"># :wqa → save both and quit</span>
</pre></div></div>
</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 17 — SHELL INTEGRATION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Shell Integration — Run Commands Without Leaving Vim</h2>

<p>One of vim's superpowers: running shell commands, reading their output into the buffer, filtering text through external programs — all without ever leaving the editor. Essential for data engineers running Python, SQL, and system commands.</p>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 11 of 12 — Shell Integration: Run, Filter, Terminal</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── RUN SHELL COMMANDS ───────────────────────────────────────</span>
:!ls -la                  <span class="cb-cmt"># run ls, see output, press Enter to return</span>
:!python3 %               <span class="cb-cmt"># run current file (% = current filename)</span>
:!python3 -m pytest %     <span class="cb-cmt"># run tests on current file</span>
:!git add % &amp;&amp; git commit -m "fix config"  <span class="cb-cmt"># git from vim!</span>
:!echo %                  <span class="cb-cmt"># see current filename expansion</span>
:!date                    <span class="cb-cmt"># run date command</span>
:!mkdir -p /data/output   <span class="cb-cmt"># create directories</span>

<span class="cb-cmt">## ─── READ COMMAND OUTPUT INTO BUFFER ─────────────────────────</span>
:r !date                  <span class="cb-cmt"># insert current date below cursor</span>
:r !ls *.py               <span class="cb-cmt"># insert list of python files into buffer</span>
:r !cat /etc/hostname     <span class="cb-cmt"># insert hostname</span>
:r !python3 -c "import pandas; print(pandas.__version__)"
                          <span class="cb-cmt"># insert pandas version</span>
:r !curl -s api.example.com/data  <span class="cb-cmt"># read API response into buffer!</span>
:r template.py            <span class="cb-cmt"># read contents of a file below cursor</span>

<span class="cb-cmt">## ─── WRITE BUFFER TO COMMAND (pipe buffer to shell) ──────────</span>
:w !python3               <span class="cb-cmt"># run current buffer through python3 (but don't save)</span>
:w !bash                  <span class="cb-cmt"># execute entire buffer as bash script</span>
:w !wc -l                 <span class="cb-cmt"># count lines in current buffer</span>
:5,20w !python3           <span class="cb-cmt"># run only lines 5-20 through python3</span>

<span class="cb-cmt">## ─── FILTER LINES THROUGH EXTERNAL PROGRAM ───────────────────</span>
:%!sort                   <span class="cb-cmt"># sort entire file (replace with sorted output)</span>
:%!sort -u                <span class="cb-cmt"># sort and remove duplicates</span>
:%!python3 -m json.tool   <span class="cb-cmt"># pretty-print JSON in current buffer!</span>
:%!sort -t, -k2 -n        <span class="cb-cmt"># sort CSV by column 2 numerically</span>
:5,15!sort                <span class="cb-cmt"># sort only lines 5-15</span>
<span class="cb-cmt"># In Normal mode: select lines with V, then:  !sort</span>
Vjj !sort -r              <span class="cb-cmt"># select 3 lines, sort reverse</span>

<span class="cb-cmt">## ─── SPECIAL: FILTER THROUGH PYTHON ─────────────────────────</span>
<span class="cb-cmt"># Current buffer has messy CSV — clean with Python:</span>
:%!python3 -c "
import sys,csv
r=csv.reader(sys.stdin)
w=csv.writer(sys.stdout)
for row in r:
    w.writerow([x.strip() for x in row])
"
<span class="cb-cmt"># Buffer is now cleaned CSV in place!</span>

<span class="cb-cmt">## ─── BUILT-IN TERMINAL (vim 8+ / neovim) ─────────────────────</span>
:term                     <span class="cb-cmt"># open terminal in current window</span>
:vert term                <span class="cb-cmt"># open terminal in vertical split</span>
:term python3             <span class="cb-cmt"># open python3 REPL directly</span>
:term ipython             <span class="cb-cmt"># open IPython session</span>
:term bash                <span class="cb-cmt"># open bash shell</span>

<span class="cb-cmt"># Inside terminal window:</span>
Ctrl-w N      <span class="cb-cmt"># switch terminal to NORMAL mode (scroll, copy text!)</span>
Ctrl-w w      <span class="cb-cmt"># switch back to editing window</span>
i             <span class="cb-cmt"># from Normal mode back to Terminal mode</span>
Ctrl-w :q     <span class="cb-cmt"># close terminal window</span>

<span class="cb-cmt">## ─── SUSPEND VIM TEMPORARILY ─────────────────────────────────</span>
Ctrl-z        <span class="cb-cmt"># suspend vim → drop to shell (vim still running in bg)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">fg</span>          <span class="cb-cmt"># bring vim back to foreground</span>
:sh           <span class="cb-cmt"># spawn a sub-shell; type exit to return to vim</span>

<span class="cb-cmt">## ─── PRACTICAL WORKFLOW: WRITE + TEST LOOP ────────────────────</span>
<span class="cb-cmt"># 1. Edit validate.py in vim
# 2. :w to save
# 3. :!python3 % to run
# 4. See error on line 42
# 5. :42 to jump to line 42
# 6. Fix it
# 7. Repeat from step 2
# Never leave vim. The whole dev loop stays inside.</span>

<span class="cb-cmt">## ─── QUICKFIX: JUMP TO ERROR LINES ──────────────────────────</span>
:make         <span class="cb-cmt"># run make/compile and capture errors in quickfix list</span>
:copen        <span class="cb-cmt"># open quickfix window with all errors</span>
:cn           <span class="cb-cmt"># jump to next error</span>
:cp           <span class="cb-cmt"># jump to previous error</span>
:cc 3         <span class="cb-cmt"># jump to error number 3</span>
:cclose       <span class="cb-cmt"># close quickfix window</span>
<span class="cb-cmt"># Also works with :grep — :grep pattern *.py → :copen → navigate!</span>
</pre></div></div>
</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 18 — VIMSCRIPT BASICS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Vimscript Basics — Automate Anything in Your Editor</h2>

<p>Vimscript is vim's built-in language. You write it in <code>.vimrc</code> and <code>.vim</code> files. Even basic knowledge lets you build custom keymaps, auto-commands, and functions that save hours of repeated editing work.</p>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Vimscript — Variables, Mappings, Functions, Autocmds, Conditionals</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">" ─── COMMENTS ────────────────────────────────────────────────
" Double-quote starts a comment in Vimscript (inside .vimrc/.vim files)
" In vim command mode: :echo "hello" runs vimscript directly</span>

<span class="cb-cmt">" ─── VARIABLES ───────────────────────────────────────────────</span>
let x = 42                   <span class="cb-cmt">" number</span>
let name = "Ravi"            <span class="cb-cmt">" string</span>
let items = [1, 2, 3]        <span class="cb-cmt">" list</span>
let opts = {'key': 'val'}    <span class="cb-cmt">" dictionary</span>
echo x                       <span class="cb-cmt">" print to command line</span>
echo len(items)              <span class="cb-cmt">" 3</span>
echo get(opts, 'key', '')    <span class="cb-cmt">" 'val' — get with default</span>

<span class="cb-cmt">" Variable scopes:</span>
let g:name = "global"        <span class="cb-cmt">" g: global scope</span>
let l:name = "local"         <span class="cb-cmt">" l: function local</span>
let b:name = "buffer"        <span class="cb-cmt">" b: current buffer</span>
let w:name = "window"        <span class="cb-cmt">" w: current window</span>
let t:name = "tab"           <span class="cb-cmt">" t: current tab</span>
let v:count = 5              <span class="cb-cmt">" v: vim's own variables (read-only)</span>

<span class="cb-cmt">" ─── CONDITIONALS ────────────────────────────────────────────</span>
if x &gt; 10
    echo "big"
elseif x == 5
    echo "five"
else
    echo "small"
endif

<span class="cb-cmt">" Useful condition checks:</span>
if has('nvim')               <span class="cb-cmt">" are we running neovim?</span>
    set termguicolors        <span class="cb-cmt">" neovim-only setting</span>
endif
if has('clipboard')          <span class="cb-cmt">" is clipboard support compiled in?</span>
    set clipboard=unnamedplus
endif
if filereadable(expand('~/.vimrc.local'))  <span class="cb-cmt">" load local overrides if file exists</span>
    source ~/.vimrc.local
endif

<span class="cb-cmt">" ─── LOOPS ───────────────────────────────────────────────────</span>
for item in ['foo', 'bar', 'baz']
    echo item
endfor

let i = 0
while i &lt; 5
    echo i
    let i += 1
endwhile

<span class="cb-cmt">" ─── FUNCTIONS ───────────────────────────────────────────────</span>
function! SayHello(name)
    echo "Hello, " . a:name . "!"
endfunction
call SayHello("Ravi")        <span class="cb-cmt">" Hello, Ravi!</span>
<span class="cb-cmt">" ! in function! = overwrite if already defined (safe to re-source)</span>
<span class="cb-cmt">" a: prefix = function argument namespace</span>

<span class="cb-cmt">" Function that returns a value:</span>
function! GetVersion()
    return system('python3 --version')
endfunction
echo GetVersion()            <span class="cb-cmt">" Python 3.11.7\n</span>

<span class="cb-cmt">" ─── MAPPINGS ────────────────────────────────────────────────</span>
<span class="cb-cmt">" Syntax: {mode}noremap {keys} {action}
" noremap = non-recursive (safe, always use noremap over map)</span>
nnoremap &lt;F5&gt; :w&lt;CR&gt;:!python3 %&lt;CR&gt;      <span class="cb-cmt">" F5 = save + run python</span>
nnoremap &lt;F6&gt; :w&lt;CR&gt;:!python3 -m pytest %&lt;CR&gt;  <span class="cb-cmt">" F6 = save + run tests</span>
nnoremap &lt;leader&gt;f :Explore&lt;CR&gt;           <span class="cb-cmt">" Space+f = open file browser</span>
nnoremap &lt;leader&gt;/ :noh&lt;CR&gt;               <span class="cb-cmt">" Space+/ = clear search highlights</span>
vnoremap &lt;leader&gt;s :sort&lt;CR&gt;              <span class="cb-cmt">" Space+s (in visual) = sort selection</span>
inoremap jj &lt;Esc&gt;                          <span class="cb-cmt">" jj in insert = Esc (home row escape!)</span>
inoremap &lt;C-l&gt; &lt;Right&gt;                    <span class="cb-cmt">" Ctrl+l = move right in insert mode</span>

<span class="cb-cmt">" Mapping mode prefixes:
"   n  = Normal     i  = Insert    v  = Visual
"   c  = Command    x  = Visual only   o  = Operator-pending</span>

<span class="cb-cmt">" ─── AUTOCOMMANDS ────────────────────────────────────────────</span>
<span class="cb-cmt">" Autocommands run automatically when events happen</span>

<span class="cb-cmt">" Auto-trim trailing whitespace on save:</span>
autocmd BufWritePre * :%s/\s\+\$//e

<span class="cb-cmt">" Set Python-specific settings when editing .py files:</span>
autocmd FileType python setlocal
    \ expandtab tabstop=4 shiftwidth=4
    \ textwidth=79
    \ foldmethod=indent

<span class="cb-cmt">" Auto-reload .vimrc when saved:</span>
autocmd BufWritePost ~/.vimrc source ~/.vimrc

<span class="cb-cmt">" Return to last cursor position when reopening file:</span>
autocmd BufReadPost *
    \ if line("'\"") &gt; 1 &amp;&amp; line("'\"") &lt;= line("\$") |
    \   exe "normal! g'\"" |
    \ endif

<span class="cb-cmt">" ─── USEFUL BUILT-IN FUNCTIONS ───────────────────────────────</span>
strlen("hello")         <span class="cb-cmt">" 5 — string length</span>
toupper("ravi")         <span class="cb-cmt">" "RAVI"</span>
tolower("RAVI")         <span class="cb-cmt">" "ravi"</span>
substitute("hello", "l", "L", "g")  <span class="cb-cmt">" "heLLo"</span>
split("a,b,c", ",")     <span class="cb-cmt">" ['a', 'b', 'c']</span>
join(['a','b'], '-')     <span class="cb-cmt">" "a-b"</span>
expand('%')             <span class="cb-cmt">" current filename</span>
expand('%:p')           <span class="cb-cmt">" full absolute path</span>
expand('%:h')           <span class="cb-cmt">" directory of current file</span>
expand('%:t')           <span class="cb-cmt">" filename without path</span>
expand('%:r')           <span class="cb-cmt">" filename without extension</span>
expand('%:e')           <span class="cb-cmt">" just the extension</span>
line('.')               <span class="cb-cmt">" current line number</span>
col('.')                <span class="cb-cmt">" current column number</span>
getline('.')            <span class="cb-cmt">" text of current line</span>
getline(42)             <span class="cb-cmt">" text of line 42</span>
system('date')          <span class="cb-cmt">" run shell command, return output</span>
<span class="cb-cmt">" ─── AUGROUP (prevent duplicate autocommands) ────────────────</span>
augroup MyPythonSettings
    autocmd!
    autocmd FileType python setlocal foldmethod=indent
    autocmd FileType python nnoremap &lt;buffer&gt; &lt;F5&gt; :!python3 %&lt;CR&gt;
augroup END
</pre></div></div>
</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 19 — PLUGINS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Plugins — Extending Vim for Data Engineering</h2>

<p>Vim has 10,000+ plugins. A few essential ones transform vim into a modern IDE. For data engineers, these are the ones that matter most.</p>

<!-- Plugin ecosystem SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Essential Vim Plugin Ecosystem for Data Engineers</text>

  <!-- vim-plug center -->
  <ellipse cx="410" cy="110" rx="55" ry="35" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="106" text-anchor="middle" font-family="monospace" font-size="11" fill="#bc8cff">vim-plug</text>
  <text x="410" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">plugin manager</text>

  <!-- Plugins around center -->
  <ellipse cx="160" cy="60" rx="70" ry="28" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="160" y="56" text-anchor="middle" font-family="monospace" font-size="10" fill="#3fb950">fzf.vim</text>
  <text x="160" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">fuzzy file/code search</text>
  <line x1="230" y1="75" x2="356" y2="100" stroke="#30363d" stroke-width="1"/>

  <ellipse cx="660" cy="60" rx="70" ry="28" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="660" y="56" text-anchor="middle" font-family="monospace" font-size="10" fill="#3fb950">NERDTree</text>
  <text x="660" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">file browser sidebar</text>
  <line x1="590" y1="75" x2="464" y2="100" stroke="#30363d" stroke-width="1"/>

  <ellipse cx="90" cy="150" rx="70" ry="28" fill="#1a2a3a" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="90" y="146" text-anchor="middle" font-family="monospace" font-size="10" fill="#58a6ff">ale / coc.nvim</text>
  <text x="90" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">linting + autocomplete</text>
  <line x1="160" y1="150" x2="356" y2="120" stroke="#30363d" stroke-width="1"/>

  <ellipse cx="730" cy="150" rx="70" ry="28" fill="#1a2a3a" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="730" y="146" text-anchor="middle" font-family="monospace" font-size="10" fill="#58a6ff">vim-fugitive</text>
  <text x="730" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">git integration</text>
  <line x1="660" y1="150" x2="464" y2="120" stroke="#30363d" stroke-width="1"/>

  <ellipse cx="160" cy="170" rx="70" ry="24" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="160" y="166" text-anchor="middle" font-family="monospace" font-size="10" fill="#ffa657">vim-airline</text>
  <text x="160" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">status line theme</text>

  <ellipse cx="660" cy="170" rx="70" ry="24" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="660" y="166" text-anchor="middle" font-family="monospace" font-size="10" fill="#ffa657">gruvbox/onedark</text>
  <text x="660" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">color schemes</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Plugin Manager Setup &amp; Essential Plugins for Data Engineers</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── VIM-PLUG SETUP (most popular plugin manager) ────────────</span>
<span class="cb-prompt">$</span> curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
<span class="cb-cmt"># Then add to .vimrc:</span>

call plug#begin('~/.vim/plugged')

<span class="cb-cmt">" ── FILE NAVIGATION ──────────────────────────────────────────</span>
Plug 'preservim/nerdtree'       <span class="cb-cmt">" file browser sidebar</span>
Plug 'junegunn/fzf', { 'do': { -&gt; fzf#install() } }
Plug 'junegunn/fzf.vim'         <span class="cb-cmt">" fuzzy finder for files, lines, buffers</span>
Plug 'christoomey/vim-tmux-navigator'  <span class="cb-cmt">" seamless vim/tmux navigation</span>

<span class="cb-cmt">" ── CODE QUALITY ─────────────────────────────────────────────</span>
Plug 'dense-analysis/ale'       <span class="cb-cmt">" async linting: flake8, pylint, sqlfluff</span>
Plug 'neoclide/coc.nvim', {'branch': 'release'}  <span class="cb-cmt">" LSP autocomplete</span>
Plug 'vim-python/python-syntax' <span class="cb-cmt">" better Python highlighting</span>
Plug 'Vimjas/vim-python-pep8-indent'  <span class="cb-cmt">" PEP8 auto-indentation</span>

<span class="cb-cmt">" ── GIT INTEGRATION ──────────────────────────────────────────</span>
Plug 'tpope/vim-fugitive'       <span class="cb-cmt">" :Git commands inside vim</span>
Plug 'airblade/vim-gitgutter'   <span class="cb-cmt">" show +/~/- in gutter for git changes</span>

<span class="cb-cmt">" ── EDITING UTILITIES ────────────────────────────────────────</span>
Plug 'tpope/vim-surround'       <span class="cb-cmt">" cs"' = change " to ', ds" = delete "", ysiw" = add "" around word</span>
Plug 'tpope/vim-commentary'     <span class="cb-cmt">" gcc = comment line, gc = comment motion</span>
Plug 'jiangmiao/auto-pairs'     <span class="cb-cmt">" auto-close () [] {} "" ''</span>

<span class="cb-cmt">" ── DATA ENGINEERING SPECIFIC ────────────────────────────────</span>
Plug 'vim-scripts/csv.vim'      <span class="cb-cmt">" CSV viewer: column highlighting, navigation</span>
Plug 'elzr/vim-json'            <span class="cb-cmt">" JSON highlighting + folding</span>
Plug 'stephpy/vim-yaml'         <span class="cb-cmt">" YAML syntax (Airflow DAGs!)</span>
Plug 'lifepillar/pgsql.vim'     <span class="cb-cmt">" PostgreSQL syntax</span>

<span class="cb-cmt">" ── VISUAL ───────────────────────────────────────────────────</span>
Plug 'vim-airline/vim-airline'  <span class="cb-cmt">" beautiful status bar</span>
Plug 'morhetz/gruvbox'          <span class="cb-cmt">" popular retro color scheme</span>
Plug 'joshdick/onedark.vim'     <span class="cb-cmt">" Atom-inspired scheme</span>

call plug#end()

<span class="cb-cmt">" ─── INSTALL: Open vim then run:</span>
:PlugInstall                    <span class="cb-cmt">" installs all listed plugins</span>
:PlugUpdate                     <span class="cb-cmt">" update all plugins</span>
:PlugClean                      <span class="cb-cmt">" remove plugins no longer in list</span>
:PlugStatus                     <span class="cb-cmt">" show plugin status</span>

<span class="cb-cmt">## ─── VIM-SURROUND — Extremely Useful ─────────────────────────</span>
<span class="cb-cmt"># Cursor on word "hello":</span>
ysiw"    <span class="cb-cmt"># → "hello"  (yank surround inner word with ")</span>
ysiw(    <span class="cb-cmt"># → (hello)  (surround with parentheses)</span>
cs"'     <span class="cb-cmt"># change " to ' → 'hello'</span>
ds"      <span class="cb-cmt"># delete surrounding " → hello</span>
yss)     <span class="cb-cmt"># surround entire LINE with ()</span>

<span class="cb-cmt">## ─── VIM-COMMENTARY — Comment/Uncomment Lines ────────────────</span>
gcc      <span class="cb-cmt"># toggle comment on current line</span>
gc3j     <span class="cb-cmt"># toggle comment on 3 lines below</span>
gcip     <span class="cb-cmt"># toggle comment on inner paragraph</span>
<span class="cb-cmt"># In visual mode: gc toggles comment on selection</span>
<span class="cb-cmt"># Auto-detects filetype: # for Python, // for JS, -- for SQL</span>

<span class="cb-cmt">## ─── FZF — Fuzzy Search Everything ──────────────────────────</span>
:Files       <span class="cb-cmt"># fuzzy find and open any file in project</span>
:Rg pattern  <span class="cb-cmt"># ripgrep search across ALL files (like project-wide /)</span>
:Lines       <span class="cb-cmt"># fuzzy search lines in open buffers</span>
:BLines      <span class="cb-cmt"># fuzzy search lines in current buffer</span>
:Buffers     <span class="cb-cmt"># fuzzy switch between open buffers</span>
:GFiles      <span class="cb-cmt"># fuzzy find git-tracked files</span>
:History     <span class="cb-cmt"># recently opened files</span>
:Commands    <span class="cb-cmt"># fuzzy search all vim commands</span>
</pre></div></div>
</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 20 — VIM FOR DATA FILES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Vim for Data Files — CSV, JSON, YAML, SQL, Logs</h2>

<p>As a data engineer, you edit these file types daily. Vim handles each one differently — here are the patterns that matter most for each format.</p>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Data File Workflows — CSV · JSON · YAML · SQL · Log Files</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ══ CSV FILES ════════════════════════════════════════════════</span>
<span class="cb-cmt"># Navigate CSV without losing your column alignment:</span>
:set nowrap           <span class="cb-cmt"># disable line wrap — CSVs are wide</span>
:set scrollopt+=hor   <span class="cb-cmt"># sync horizontal scroll between split windows</span>

<span class="cb-cmt"># Filter CSV rows containing "ERROR":</span>
:g/ERROR/d            <span class="cb-cmt"># delete all non-error lines (keep only ERRORs)</span>
:v/ERROR/d            <span class="cb-cmt"># same — delete lines NOT matching ERROR</span>

<span class="cb-cmt"># Sort CSV by column 2:</span>
:%!sort -t, -k2       <span class="cb-cmt"># sort by field 2, comma-delimited</span>
:%!sort -t, -k2 -n    <span class="cb-cmt"># numeric sort by column 2</span>

<span class="cb-cmt"># Count fields in a row (check consistency):</span>
:s/,/,/gn             <span class="cb-cmt"># count commas on current line (n=dry run)</span>

<span class="cb-cmt"># Add header row if missing:</span>
ggO                   <span class="cb-cmt"># go to top, open new line above, enter insert</span>
<span class="cb-cmt"># type: date,sales,region,customer</span>

<span class="cb-cmt"># Remove duplicate lines (sort first, then uniq):</span>
:%!sort | uniq        <span class="cb-cmt"># sort + remove duplicate lines</span>
:%!sort -u            <span class="cb-cmt"># same, shorter</span>

<span class="cb-cmt">## ══ JSON FILES ═══════════════════════════════════════════════</span>
<span class="cb-cmt"># Pretty-print a minified JSON file:</span>
:%!python3 -m json.tool             <span class="cb-cmt"># format in place with proper indentation</span>
:%!python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin), indent=2))"

<span class="cb-cmt"># Compact a pretty-printed JSON:</span>
:%!python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin),separators=(',',':')))"

<span class="cb-cmt"># Validate JSON (see errors):</span>
:!python3 -m json.tool % &gt; /dev/null &amp;&amp; echo "VALID" || echo "INVALID"

<span class="cb-cmt"># Search inside JSON for a key:</span>
/\"executor_memory\"  <span class="cb-cmt"># find the key</span>
/\"2g\"               <span class="cb-cmt"># find a specific value</span>

<span class="cb-cmt"># Set JSON folding (fold arrays/objects):</span>
:set foldmethod=syntax
:set filetype=json    <span class="cb-cmt"># ensure filetype is detected</span>
zM                    <span class="cb-cmt"># collapse all JSON objects/arrays</span>

<span class="cb-cmt">## ══ YAML FILES (Airflow DAGs, Kubernetes, Ansible) ═══════════</span>
<span class="cb-cmt"># YAML is whitespace-sensitive — vim settings critical:</span>
:set expandtab tabstop=2 shiftwidth=2  <span class="cb-cmt"># YAML uses 2-space indent</span>
:set list listchars=tab:&gt;-,trail:·    <span class="cb-cmt"># show tabs and trailing spaces visually</span>

<span class="cb-cmt"># Validate YAML from vim:</span>
:!python3 -c "import yaml,sys; yaml.safe_load(open('%').read()); print('VALID')"

<span class="cb-cmt"># Navigate Airflow DAG structure:</span>
/^  tasks:            <span class="cb-cmt"># find tasks section (2-space indent)</span>
/^    - name:         <span class="cb-cmt"># find each task definition</span>

<span class="cb-cmt"># Duplicate a YAML block (copy task definition):</span>
<span class="cb-cmt"># Position on first line of block</span>
V}y                   <span class="cb-cmt"># visual line select to end of paragraph, yank</span>
}p                    <span class="cb-cmt"># paste after next paragraph (next YAML block)</span>

<span class="cb-cmt">## ══ SQL FILES ════════════════════════════════════════════════</span>
<span class="cb-cmt"># SQL formatting convention: keywords uppercase</span>
:%s/\vselect/SELECT/gi   <span class="cb-cmt"># uppercase SELECT</span>
:%s/\vfrom/FROM/gi       <span class="cb-cmt"># uppercase FROM</span>
:%s/\vwhere/WHERE/gi     <span class="cb-cmt"># uppercase WHERE</span>
:%s/\vjoin/JOIN/gi       <span class="cb-cmt"># uppercase JOIN</span>

<span class="cb-cmt"># Comment out a WHERE clause to test:</span>
/WHERE                   <span class="cb-cmt"># find WHERE</span>
V/;j                     <span class="cb-cmt"># visual select to semicolon (next line)</span>
gc                       <span class="cb-cmt"># toggle comment (with vim-commentary plugin)</span>

<span class="cb-cmt"># Run SQL from vim (psql):</span>
:!psql -U ravi -d analytics -f %     <span class="cb-cmt"># run current file against PostgreSQL</span>
:!psql -U ravi -d analytics &lt; %     <span class="cb-cmt"># same via stdin</span>

<span class="cb-cmt"># Run ONLY selected SQL lines:</span>
<span class="cb-cmt"># Select lines with V, then:</span>
!psql -U ravi -d analytics            <span class="cb-cmt"># pipe selection to psql</span>

<span class="cb-cmt">## ══ LOG FILES ════════════════════════════════════════════════</span>
<span class="cb-cmt"># Open large log file efficiently:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">-R</span> /var/log/spark/application.log   <span class="cb-cmt"># read-only (no accidental edits)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">+\$</span> application.log                  <span class="cb-cmt"># open at LAST line (like tail)</span>

<span class="cb-cmt"># Navigate log by severity:</span>
/ERROR           <span class="cb-cmt"># jump to next ERROR</span>
/\v(ERROR|FATAL) <span class="cb-cmt"># jump to ERROR or FATAL</span>
n                <span class="cb-cmt"># next match</span>

<span class="cb-cmt"># Extract only error lines into a new file:</span>
:g/ERROR/y A     <span class="cb-cmt"># append all ERROR lines to register A</span>
:enew            <span class="cb-cmt"># open new empty buffer</span>
"Ap              <span class="cb-cmt"># paste register A = all errors in new buffer</span>
:w errors.log    <span class="cb-cmt"># save errors to file</span>

<span class="cb-cmt"># Delete all DEBUG lines to reduce noise:</span>
:g/DEBUG/d       <span class="cb-cmt"># delete all DEBUG lines</span>

<span class="cb-cmt"># Show only lines from the last hour (with timestamp search):</span>
:g/2024-01-15 1[0-9]:/  <span class="cb-cmt"># show lines from 10:xx to 19:xx</span>

<span class="cb-cmt"># Follow log file in real-time (like tail -f):</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">tail</span> <span class="cb-flag">-f</span> /var/log/spark/app.log | <span class="cb-cmd">vim</span> <span class="cb-flag">-</span>   <span class="cb-cmt"># pipe tail output to vim</span>
<span class="cb-cmt"># Inside vim: :e! periodically to refresh</span>

<span class="cb-cmt">## ══ MARKDOWN & DOCUMENTATION ═════════════════════════════════</span>
<span class="cb-cmt"># Preview markdown (requires external tool):</span>
:!grip % &amp;       <span class="cb-cmt"># start grip markdown preview server in background</span>
:!pandoc % -o %.pdf  <span class="cb-cmt"># convert to PDF</span>

<span class="cb-cmt"># Markdown table alignment:</span>
:'&lt;,'&gt;!column -t -s '|'  <span class="cb-cmt"># align selected table columns</span>

<span class="cb-cmt"># Count words in document:</span>
g Ctrl-g         <span class="cb-cmt"># shows word count + char count + line count</span>
</pre></div></div>
</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 21 — TIPS, TRICKS & PRODUCTIVITY HACKS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Tips, Tricks &amp; Productivity Hacks</h2>

<p>These are the commands experienced vim users use every day that beginners discover too late. Each one removes friction from your workflow.</p>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Power User Tricks — The Commands You'll Use Every Day</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── THE DOT FORMULA (most underrated workflow) ──────────────</span>
<span class="cb-cmt"># The . command repeats the last CHANGE. The power workflow:
# 1. Make a change (e.g., ciw → type "8g" → Esc)
# 2. /pattern → jump to next occurrence
# 3. .         → repeat the change
# 4. n.n.n.   → blaze through the file
# This is faster than search-and-replace for surgical edits.</span>

<span class="cb-cmt">## ─── cgn — The Power Combination ────────────────────────────</span>
/2g            <span class="cb-cmt"># search for "2g"</span>
cgn            <span class="cb-cmt"># change next match (opens insert mode on first match)</span>
8g&lt;Esc&gt;        <span class="cb-cmt"># type replacement</span>
.              <span class="cb-cmt"># repeat on next match (moves to next automatically!)</span>
<span class="cb-cmt"># cgn is BETTER than :%s because you can skip occurrences with n</span>

<span class="cb-cmt">## ─── QUICK PATTERNS EVERY VIM USER USES ─────────────────────</span>
gg=G           <span class="cb-cmt"># auto-indent entire file (go-top, =indent, G=to-end)</span>
ggyG           <span class="cb-cmt"># copy entire file to clipboard</span>
ggdG           <span class="cb-cmt"># delete entire file content</span>
:%y+           <span class="cb-cmt"># yank entire file to system clipboard</span>
:g/^\s*\$/d    <span class="cb-cmt"># delete all blank lines</span>
:%s/\s\+\$//e  <span class="cb-cmt"># remove all trailing whitespace</span>
:g/^/m0        <span class="cb-cmt"># reverse all lines in file</span>
:%!uniq        <span class="cb-cmt"># remove consecutive duplicate lines</span>

<span class="cb-cmt">## ─── NAVIGATE BETWEEN RECENTLY EDITED SPOTS ─────────────────</span>
Ctrl-o         <span class="cb-cmt"># jump BACK in jump list (like browser back)</span>
Ctrl-i         <span class="cb-cmt"># jump FORWARD in jump list</span>
g;             <span class="cb-cmt"># jump to OLDER change position</span>
g,             <span class="cb-cmt"># jump to NEWER change position</span>
''             <span class="cb-cmt"># jump back to last cursor position before big jump</span>
:jumps         <span class="cb-cmt"># see the full jump history list</span>
:changes       <span class="cb-cmt"># see the full change history list</span>

<span class="cb-cmt">## ─── NUMBERS IN NORMAL MODE ──────────────────────────────────</span>
Ctrl-a         <span class="cb-cmt"># INCREMENT number under cursor (5 → 6)</span>
Ctrl-x         <span class="cb-cmt"># DECREMENT number under cursor (5 → 4)</span>
10 Ctrl-a      <span class="cb-cmt"># add 10 to number under cursor</span>
<span class="cb-cmt"># In visual mode: g Ctrl-a increments each line's number sequentially!</span>
<span class="cb-cmt"># e.g., select 3 lines with 0, 0, 0 → g Ctrl-a → becomes 1, 2, 3</span>

<span class="cb-cmt">## ─── EDITING SAME PATTERN ACROSS MULTIPLE LINES ─────────────</span>
<span class="cb-cmt"># Method 1: Macros (see Section 9)</span>
<span class="cb-cmt"># Method 2: :g with :normal</span>
:g/def /normal A:     <span class="cb-cmt"># add colon to end of every line containing "def "</span>
:g/^#/normal dd       <span class="cb-cmt"># delete every comment line</span>
:g/^$/normal kJ       <span class="cb-cmt"># join each blank line with line above it</span>

<span class="cb-cmt">## ─── INSERT THE FILENAME / DATE ANYWHERE ─────────────────────</span>
:r !date               <span class="cb-cmt"># insert today's date below cursor</span>
:r !date +\%Y-\%m-\%d <span class="cb-cmt"># insert ISO date: 2024-01-15</span>
Ctrl-r %               <span class="cb-cmt"># in INSERT mode: paste current filename</span>
Ctrl-r :               <span class="cb-cmt"># in INSERT mode: paste last command</span>
Ctrl-r /               <span class="cb-cmt"># in INSERT mode: paste last search pattern</span>

<span class="cb-cmt">## ─── MULTIPLE CURSOR SIMULATION ──────────────────────────────</span>
<span class="cb-cmt"># Vim doesn't have "multiple cursors" like VS Code
# But these achieve the same results:
# 1. Block visual (Ctrl-v) + I/A for multi-line insert
# 2. :g/pattern/normal {cmd} for running same cmd on many lines
# 3. Macro + @@ repeat
# 4. cgn + . for iterating over search matches</span>

<span class="cb-cmt">## ─── SESSION MANAGEMENT ──────────────────────────────────────</span>
:mksession ~/session.vim    <span class="cb-cmt"># save current session (open files, splits, etc)</span>
:source ~/session.vim       <span class="cb-cmt"># restore saved session</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">vim</span> <span class="cb-flag">-S</span> ~/session.vim      <span class="cb-cmt"># restore session from command line</span>

<span class="cb-cmt">## ─── FILE ENCRYPTION ─────────────────────────────────────────</span>
:set cryptmethod=blowfish2  <span class="cb-cmt"># use blowfish2 encryption</span>
:X                          <span class="cb-cmt"># set encryption password for current file</span>
<span class="cb-cmt"># Save with :w — file is encrypted on disk</span>
<span class="cb-cmt"># Next open: vim asks for password</span>
<span class="cb-cmt"># Use for config files with passwords/secrets</span>

<span class="cb-cmt">## ─── COMMAND LINE HISTORY ────────────────────────────────────</span>
q:         <span class="cb-cmt"># open command history window (browse past :commands)</span>
q/         <span class="cb-cmt"># open search history window</span>
Ctrl-f     <span class="cb-cmt"># (while in : command line) open command history window</span>

<span class="cb-cmt">## ─── netrw — BUILT-IN FILE BROWSER (no plugin needed) ────────</span>
:Explore   <span class="cb-cmt"># open file browser in current directory</span>
:Vexplore  <span class="cb-cmt"># open in vertical split</span>
:Sexplore  <span class="cb-cmt"># open in horizontal split</span>
<span class="cb-cmt"># Inside netrw:
# Enter = open file/dir    - = go up a level
# % = create new file      d = create new directory
# D = delete               R = rename
# v = open in vsplit       o = open in hsplit</span>
</pre></div></div>
</div><!-- /section-block -->

<!-- ══════════════════════════════════════════════════════
     SECTION 22 — COMPLETE EXERCISES WITH SOLUTIONS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Practice Exercises with Full Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Survive &amp; Edit Your First Config File</h4>
    <p>Create a file <code>spark.conf</code> with these 6 lines using <code>cat &gt; spark.conf</code>:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">spark.master                local[*]
spark.executor.memory       2g
spark.driver.memory         2g
spark.executor.cores        2
spark.sql.shuffle.partitions 200
spark.app.name              MyETLJob</pre>
    <p><strong>Tasks:</strong></p>
    <ol style="color:#8b949e;font-size:13.5px;line-height:2.4;padding-left:20px;">
      <li>Open in vim: <code>vim spark.conf</code></li>
      <li>Enable line numbers: <code>:set number</code></li>
      <li>Navigate to line 2 using <code>2G</code></li>
      <li>Change <code>2g</code> to <code>8g</code> — use <code>$</code> to go to end, <code>ciw</code> to change the word</li>
      <li>Navigate to line 3 (<code>3G</code>), change its <code>2g</code> to <code>4g</code> using <code>.</code> then fix if needed</li>
      <li>Go to line 4 (<code>4G</code>), change <code>2</code> to <code>4</code> using <code>r4</code> (single char replace)</li>
      <li>Go to last line (<code>G</code>), append <code> v2.0</code> using <code>A</code></li>
      <li>Save and quit: <code>:wq</code></li>
      <li>Reopen and verify: <code>vim +2 spark.conf</code></li>
    </ol>
    <div class="tip-box" style="margin-top:12px;">
      <strong>💡 Solution Key Commands:</strong>
      <code>vim spark.conf</code> → <code>:set nu</code> → <code>2G</code> → <code>\$</code> → <code>ciw</code> → <code>8g</code> → <code>Esc</code> → <code>3G\$ciw4gEsc</code> → <code>4Gr4</code> → <code>GA v2.0Esc</code> → <code>:wq</code>
    </div>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Navigation Speed Drill</h4>
    <p>Open any Python file (or create one with 30 lines of code). Practice these navigation patterns without using arrow keys or mouse:</p>
    <ol style="color:#8b949e;font-size:13.5px;line-height:2.4;padding-left:20px;">
      <li>Go to line 1: <code>gg</code> — then to last line: <code>G</code></li>
      <li>Go to 50% through file: <code>50%</code></li>
      <li>Move forward 5 words: <code>5w</code> — back 3: <code>3b</code></li>
      <li>Jump to end of current line: <code>\$</code> — start: <code>0</code> — first non-blank: <code>^</code></li>
      <li>Find the letter 'e' on the current line: <code>fe</code> — repeat: <code>;</code></li>
      <li>Set a mark at current position: <code>ma</code> — jump around the file — return to mark: <code>'a</code></li>
      <li>Scroll half-page down: <code>Ctrl-d</code> — up: <code>Ctrl-u</code></li>
      <li>Center current line on screen: <code>zz</code></li>
      <li>Jump to matching bracket (position cursor on a <code>(</code>): <code>%</code></li>
      <li>Jump back to where you were before: <code>Ctrl-o</code> — forward: <code>Ctrl-i</code></li>
    </ol>
    <p><strong>Goal:</strong> Complete the navigation circuit in under 60 seconds without touching arrow keys.</p>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — ETL Script Cleanup</h4>
    <p>Create this badly formatted Python file <code>etl.py</code>:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">import pandas as pd
import os  
def load_data(path):
  df = pd.read_csv(path)
  return df
def clean_data(df):
  df = df.dropna()
  df = df.drop_duplicates()
  return df
def save_data(df,output):
  df.to_csv(output,index=False)
  print("saved to",output)</pre>
    <p><strong>Fix everything using only vim commands:</strong></p>
    <ol style="color:#8b949e;font-size:13.5px;line-height:2.4;padding-left:20px;">
      <li>Fix indentation of whole file: <code>gg=G</code></li>
      <li>Remove trailing whitespace on line 2 (after <code>import os</code>): <code>2G</code> then <code>:%s/\s\+\$//e</code></li>
      <li>Add a blank line after each <code>return df</code>: <code>/return df</code>, then <code>o</code> + <code>Esc</code>, repeat with <code>n</code> + <code>.</code></li>
      <li>Add spaces after commas in <code>def save_data(df,output)</code>: go to line, use <code>:s/,\(\S\)/, \\1/g</code></li>
      <li>Change all <code>print(</code> to <code>logging.info(</code>: <code>:%s/print(/logging.info(/g</code></li>
      <li>Run the script from vim: <code>:!python3 -c "import etl; print('syntax OK')"</code></li>
      <li>Add a module docstring at top: <code>ggO</code>, type <code>"""ETL Pipeline for data processing."""</code>, <code>Esc</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Multi-File Config Update with Macros</h4>
    <p>Create three config files: <code>dev.conf</code>, <code>staging.conf</code>, <code>prod.conf</code>. Each contains:</p>
    <pre style="background:#161b22;padding:12px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:10px 0;">db.host=localhost
db.port=5432
db.name=myapp_ENV
log.level=DEBUG
max.connections=10
timeout.seconds=30</pre>
    <p><strong>Tasks using vim:</strong></p>
    <ol style="color:#8b949e;font-size:13.5px;line-height:2.4;padding-left:20px;">
      <li>Open all three: <code>vim dev.conf staging.conf prod.conf</code></li>
      <li>List all open buffers: <code>:ls</code></li>
      <li>In dev.conf: replace <code>ENV</code> with <code>dev</code>: <code>:%s/ENV/dev/</code></li>
      <li>Switch to staging: <code>:bn</code>, replace ENV: <code>:%s/ENV/staging/</code></li>
      <li>Switch to prod: <code>:bn</code>, replace ENV: <code>:%s/ENV/prod/</code></li>
      <li>Change <code>log.level=DEBUG</code> to <code>INFO</code> in ALL files at once: <code>:bufdo %s/DEBUG/INFO/g</code></li>
      <li>In prod only — change <code>max.connections=10</code> to <code>100</code>: <code>:b prod.conf</code> then <code>:%s/10/100/</code></li>
      <li>Save all: <code>:wa</code></li>
      <li>Compare dev vs prod: <code>:vert diffsplit dev.conf</code> from prod.conf buffer</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — The Complete Data Engineer Vim Workflow</h4>
    <p><strong>Scenario:</strong> You're SSH'd into a production server. No GUI. You need to write, test, debug, and deploy a data validation script — entirely in vim.</p>
    <ol style="color:#8b949e;font-size:13.5px;line-height:2.4;padding-left:20px;">
      <li><strong>Create script from scratch:</strong> <code>vim validate.py</code> → enter Insert → write a function that reads a CSV with pandas and checks for null values in required columns. Use <code>Ctrl-n</code> for autocomplete.</li>
      <li><strong>Auto-indent everything:</strong> <code>Esc</code> → <code>gg=G</code></li>
      <li><strong>Run it:</strong> <code>:!python3 %</code> — note any error line numbers</li>
      <li><strong>Jump to errors:</strong> <code>:42</code> — fix, run again</li>
      <li><strong>Add logging:</strong> <code>:%s/print(/logging.info(/g</code> then add <code>import logging</code> at top with <code>ggO</code></li>
      <li><strong>Record a macro</strong> that adds a <code># TODO: add unit test</code> above every function definition: <code>qa</code> → <code>/^def </code> → <code>n</code> → <code>O# TODO: add unit test</code> → <code>Esc</code> → <code>q</code> → <code>5@a</code></li>
      <li><strong>Search entire project</strong> for uses of old function name: <code>:vimgrep /old_func/ **/*.py</code> → <code>:copen</code> → navigate with <code>:cn</code></li>
      <li><strong>Open a split terminal:</strong> <code>:vert term ipython</code> — test the function interactively without leaving vim</li>
      <li><strong>Git workflow:</strong> <code>:!git diff %</code> → review → <code>:!git add % &amp;&amp; git commit -m "add null validation"</code></li>
      <li><strong>Save session:</strong> <code>:mksession ~/validate_work.vim</code> — restore tomorrow with <code>vim -S ~/validate_work.vim</code></li>
    </ol>
    <div class="tip-box" style="margin-top:14px;">
      <strong>🏆 Mastery Check:</strong> If you complete this entire workflow without using arrow keys, the mouse, or any other editor, you've reached professional vim proficiency. The goal isn't memorizing every command — it's fluency in the grammar: <em>verb + motion + text-object</em>.
    </div>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Vim Journey — Six Months Later</div>
    <p>Six months after that first disastrous SSH session, Ravi's colleague asked him to help fix a production issue. They were screen-sharing. Ravi's fingers barely seemed to move. In 90 seconds he had: opened the log file, jumped to the error section, identified the bad config value, opened the config in a split, changed the value, verified the diff, saved it, and triggered a service reload — all from the keyboard, all from within vim, without once reaching for the mouse.</p>
    <p>His colleague said, "Can you slow down? How did you do that?"</p>
    <p>Ravi smiled. "I didn't learn every command. I learned the grammar. <em>Verb + motion. Delete + word. Change + inside quotes. Yank + paragraph.</em> Once you have the grammar, the commands compose themselves."</p>
    <p>Vim isn't a tool you master in a day. It's a tool that keeps getting faster the longer you use it. The investment compounds. Start with <code>i</code>, <code>Esc</code>, <code>:wq</code>. Add one command per week. In six months, you'll be the one screen-sharing and hearing: "Can you slow down?"</p>
  </div>
</div>

</div><!-- /section-block for exercises -->

`
};