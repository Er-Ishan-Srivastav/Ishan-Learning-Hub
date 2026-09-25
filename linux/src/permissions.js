
var permissions = {
  title: "chmod, chown & chgrp — File Permissions",
  description: "Master Linux permission bits from first principles — who can read, write, and execute which files, why it matters for security, and exactly which commands change what.",
  breadcrumb: ["Permissions & Security", "chmod, chown & chgrp"],

  sections: [

    // ════════════════════════════════════════════════════════════
    // OPENING STORY + PERMISSION MODEL OVERVIEW
    // ════════════════════════════════════════════════════════════
    {
      id: "permissions-intro",
      title: "The Collaboration Disaster — and What Permissions Protect",
      content: `
<div class="story-box">
  <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="38" r="38" fill="#1a1a2e"/>
      <!-- lock body -->
      <rect x="22" y="36" width="32" height="24" rx="5" fill="#f85149"/>
      <!-- lock shackle -->
      <path d="M27 36 L27 28 Q38 18 49 28 L49 36" fill="none" stroke="#f85149" stroke-width="4" stroke-linecap="round"/>
      <!-- keyhole -->
      <circle cx="38" cy="47" r="4" fill="#1a1a2e"/>
      <rect x="36" y="47" width="4" height="7" rx="1" fill="#1a1a2e"/>
    </svg>
    <div style="flex:1;min-width:220px;">
      <h3 style="margin:0 0 8px;color:#ce93d8;">🔐 The Day the Salary File Became Public</h3>
      <p>Ravi's team had a shared data directory. A new engineer joined and couldn't access the pipeline configs — so a well-meaning colleague ran <code>chmod 777 /data/configs/</code> to "fix" it quickly. That directory also happened to contain <code>salary_bands.csv</code>. By end of day, everyone in the company could read salary information.</p>
      <p>One command. One misunderstanding. A week of HR meetings.</p>
      <p>The fix took 30 seconds: <code>chmod 750 /data/configs/</code> and <code>chgrp data-team /data/configs/</code>. Understanding permissions means this never happens on your watch.</p>
    </div>
  </div>
</div>

<div class="info-box" style="margin-top:14px;">
  <strong>📌 The Three Questions Linux Asks for Every File Access:</strong>
  <ol style="margin:10px 0 0;padding-left:20px;line-height:1.9;">
    <li><strong>Are you the owner?</strong> → Apply <strong>owner (u)</strong> permissions</li>
    <li><strong>Are you in the owning group?</strong> → Apply <strong>group (g)</strong> permissions</li>
    <li><strong>Neither?</strong> → Apply <strong>others (o)</strong> permissions</li>
  </ol>
  <p style="margin-top:8px;">Only ONE set applies — the most specific match wins. If you're the owner, group and others permissions are ignored entirely, even if they grant more access.</p>
</div>

<!-- PERMISSION BITS SVG — THE MASTER DIAGRAM -->
<div class="visual-container">
<svg width="700" height="250" viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg">
  <rect width="700" height="250" fill="#0d1117" rx="12"/>
  <text x="350" y="22" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">Anatomy of Linux Permissions — Every Bit Explained</text>

  <!-- Example ls -l output -->
  <rect x="20" y="34" width="660" height="28" rx="6" fill="#161b22" stroke="#30363d"/>
  <text x="36" y="53" fill="#8b949e" font-size="12" font-family="monospace">$  ls -l  salary.csv</text>
  <text x="175" y="53" fill="#f85149" font-size="13" font-family="monospace" font-weight="bold">-</text>
  <text x="188" y="53" fill="#3fb950" font-size="13" font-family="monospace" font-weight="bold">rwx</text>
  <text x="222" y="53" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">r-x</text>
  <text x="256" y="53" fill="#d29922" font-size="13" font-family="monospace" font-weight="bold">---</text>
  <text x="295" y="53" fill="#8b949e" font-size="12" font-family="monospace">  1  ravi  data-team  52428  Mar 10  salary.csv</text>

  <!-- File type annotation -->
  <line x1="175" y1="62" x2="175" y2="82" stroke="#f85149" stroke-width="1.5"/>
  <rect x="100" y="82" width="148" height="38" rx="5" fill="#2a0d0d" stroke="#f85149"/>
  <text x="174" y="99"  fill="#f85149" font-size="10" font-weight="bold" text-anchor="middle">File Type</text>
  <text x="174" y="113" fill="#8b949e" font-size="9"  text-anchor="middle">- file  d dir  l link  b block</text>

  <!-- Owner bits -->
  <line x1="204" y1="62" x2="204" y2="82" stroke="#3fb950" stroke-width="1.5"/>
  <rect x="140" y="120" width="128" height="60" rx="5" fill="#0f2a0f" stroke="#3fb950"/>
  <text x="204" y="138" fill="#3fb950" font-size="10" font-weight="bold" text-anchor="middle">OWNER (u=user)</text>
  <text x="148" y="154" fill="#e6edf3" font-size="9" font-family="monospace">r = read    (4)</text>
  <text x="148" y="168" fill="#e6edf3" font-size="9" font-family="monospace">w = write   (2)</text>
  <text x="148" y="182" fill="#e6edf3" font-size="9" font-family="monospace">x = execute (1)</text>
  <line x1="204" y1="82" x2="204" y2="120" stroke="#3fb950" stroke-width="1.5"/>

  <!-- Group bits -->
  <line x1="238" y1="62" x2="238" y2="82" stroke="#58a6ff" stroke-width="1.5"/>
  <rect x="300" y="82" width="128" height="60" rx="5" fill="#0d1f3c" stroke="#58a6ff"/>
  <text x="364" y="100" fill="#58a6ff" font-size="10" font-weight="bold" text-anchor="middle">GROUP (g)</text>
  <text x="308" y="116" fill="#e6edf3" font-size="9" font-family="monospace">r = read    (4)</text>
  <text x="308" y="130" fill="#e6edf3" font-size="9" font-family="monospace">- = NO write</text>
  <text x="308" y="144" fill="#e6edf3" font-size="9" font-family="monospace">x = execute (1)</text>
  <line x1="238" y1="82" x2="364" y2="82" stroke="#58a6ff" stroke-dasharray="3,3"/>
  <line x1="364" y1="82" x2="364" y2="82" stroke="#58a6ff" stroke-width="1.5"/>

  <!-- Others bits -->
  <line x1="272" y1="62" x2="272" y2="200" stroke="#d29922" stroke-width="1.5"/>
  <rect x="480" y="120" width="180" height="60" rx="5" fill="#1a1a0a" stroke="#d29922"/>
  <text x="570" y="138" fill="#d29922" font-size="10" font-weight="bold" text-anchor="middle">OTHERS (o = world)</text>
  <text x="488" y="154" fill="#e6edf3" font-size="9" font-family="monospace">--- = NO permissions</text>
  <text x="488" y="168" fill="#8b949e" font-size="9">no access at all</text>
  <line x1="272" y1="200" x2="570" y2="200" stroke="#d29922" stroke-dasharray="3,3"/>
  <line x1="570" y1="200" x2="570" y2="180" stroke="#d29922" stroke-width="1.5"/>

  <!-- Octal row -->
  <rect x="20" y="210" width="660" height="30" rx="6" fill="#21262d"/>
  <text x="175" y="229" fill="#f85149" font-size="11" font-family="monospace" font-weight="bold">-</text>
  <text x="198" y="229" fill="#3fb950" font-size="12" font-family="monospace" font-weight="bold">7</text>
  <text x="232" y="229" fill="#58a6ff" font-size="12" font-family="monospace" font-weight="bold">5</text>
  <text x="266" y="229" fill="#d29922" font-size="12" font-family="monospace" font-weight="bold">0</text>
  <text x="310" y="229" fill="#8b949e" font-size="10">← Octal equivalent:  rwx=7   r-x=5   ---=0   →   chmod 750 salary.csv</text>
</svg>
</div>

<table class="comparison-table">
  <thead>
    <tr><th>Bit</th><th>Symbol</th><th>Value</th><th>On a File means</th><th>On a Directory means</th></tr>
  </thead>
  <tbody>
    <tr><td>Read</td><td><code>r</code></td><td>4</td><td>Can view file content (<code>cat</code>, <code>less</code>)</td><td>Can <code>ls</code> the directory</td></tr>
    <tr><td>Write</td><td><code>w</code></td><td>2</td><td>Can modify / delete file content</td><td>Can create, rename, delete files inside</td></tr>
    <tr><td>Execute</td><td><code>x</code></td><td>1</td><td>Can run as a program / script</td><td>Can <code>cd</code> into it, access contents</td></tr>
    <tr><td>None</td><td><code>-</code></td><td>0</td><td colspan="2">Permission denied</td></tr>
  </tbody>
</table>

<div class="warning-box" style="margin-top:12px;">
  <strong>⚠️ Execute on Directories is Different — Easy to Get Wrong:</strong>
  <p>A directory with <code>r</code> but no <code>x</code> lets you see the names (<code>ls</code> works) but you cannot <code>cd</code> into it or open any files inside. A directory with <code>x</code> but no <code>r</code> lets you <code>cd</code> in and access files <em>if you know their exact names</em> — but <code>ls</code> is blank. Both permissions together (<code>rx</code>) is the normal directory setup.</p>
</div>`
    },

    // ════════════════════════════════════════════════════════════
    // chmod — SYMBOLIC MODE
    // ════════════════════════════════════════════════════════════
    {
      id: "chmod-symbolic",
      title: "chmod — Changing Permissions (Symbolic Mode)",
      content: `
<div class="story-box">
  <strong>📖 Ravi's First chmod Task:</strong>
  <p>After the salary file incident, Ravi's manager asked him to audit all shared scripts. The ETL scripts needed to be executable by the team but not writable. Config files needed to be readable by the app user. He used symbolic chmod because the operations were relative — add this, remove that — rather than setting an absolute value.</p>
</div>

<p>Symbolic mode describes changes <strong>relative to the current permissions</strong>. You specify WHO (<code>u</code>/<code>g</code>/<code>o</code>/<code>a</code>), what OPERATION (<code>+</code>/<code>-</code>/<code>=</code>), and which BITS (<code>r</code>/<code>w</code>/<code>x</code>).</p>

<!-- SYMBOLIC CHMOD ANATOMY SVG -->
<div class="visual-container">
<svg width="680" height="120" viewBox="0 0 680 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="120" fill="#0d1117" rx="10"/>
  <text x="340" y="20" fill="#e6edf3" font-size="12" font-weight="bold" text-anchor="middle">chmod Symbolic Mode — Anatomy</text>

  <!-- command -->
  <text x="80"  y="52" fill="#e6edf3"  font-size="20" font-family="monospace" font-weight="bold" text-anchor="middle">chmod</text>
  <text x="195" y="52" fill="#3fb950"  font-size="24" font-family="monospace" font-weight="bold" text-anchor="middle">u</text>
  <text x="240" y="52" fill="#f85149"  font-size="24" font-family="monospace" font-weight="bold" text-anchor="middle">+</text>
  <text x="285" y="52" fill="#58a6ff"  font-size="24" font-family="monospace" font-weight="bold" text-anchor="middle">x</text>
  <text x="380" y="52" fill="#8b949e"  font-size="20" font-family="monospace" text-anchor="middle">script.sh</text>

  <!-- labels -->
  <text x="195" y="72" fill="#3fb950"  font-size="10" text-anchor="middle">WHO</text>
  <text x="240" y="72" fill="#f85149"  font-size="10" text-anchor="middle">OP</text>
  <text x="285" y="72" fill="#58a6ff"  font-size="10" text-anchor="middle">WHAT</text>

  <!-- WHO legend -->
  <text x="36"  y="98" fill="#3fb950" font-size="10">u=user(owner)</text>
  <text x="140" y="98" fill="#3fb950" font-size="10">g=group</text>
  <text x="215" y="98" fill="#3fb950" font-size="10">o=others</text>
  <text x="290" y="98" fill="#3fb950" font-size="10">a=all(ugo)</text>
  <!-- OP legend -->
  <text x="400" y="98" fill="#f85149" font-size="10">+=add</text>
  <text x="445" y="98" fill="#f85149" font-size="10">-=remove</text>
  <text x="510" y="98" fill="#f85149" font-size="10">=set exactly</text>
  <!-- WHAT legend -->
  <text x="598" y="98" fill="#58a6ff" font-size="10">r  w  x</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 1 — chmod Symbolic Mode: Every Combination</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># First: see current permissions</span>
$ <span style="color:#3fb950;">ls -l script.sh</span>
-rw-r--r-- 1 ravi data-team 1024 Mar 10 script.sh
<span style="color:#6a9955;">←  rw-  = owner can read+write (no execute)
   r--  = group can read only
   r--  = others can read only</span>

<span style="color:#6a9955;"># ── + (ADD a permission) ────────────────────────────────</span>
$ <span style="color:#3fb950;">chmod u+x script.sh</span>       <span style="color:#6a9955;">← add execute for owner only</span>
$ ls -l script.sh
-r<span style="color:#3fb950;">w</span><span style="color:#f85149;">x</span>r--r-- 1 ravi data-team 1024 script.sh
<span style="color:#6a9955;">← Only changed the owner's execute bit
← Other permissions untouched</span>

$ <span style="color:#3fb950;">chmod g+x script.sh</span>       <span style="color:#6a9955;">← add execute for group</span>
$ <span style="color:#3fb950;">chmod o+x script.sh</span>       <span style="color:#6a9955;">← add execute for others</span>
$ <span style="color:#3fb950;">chmod a+x script.sh</span>       <span style="color:#6a9955;">← add execute for ALL (u+g+o)</span>
$ <span style="color:#3fb950;">chmod +x script.sh</span>        <span style="color:#6a9955;">← same as a+x (WHO defaults to 'a')</span>

$ <span style="color:#3fb950;">chmod g+rw config.yml</span>     <span style="color:#6a9955;">← add read+write for group (multiple bits)</span>
$ <span style="color:#3fb950;">chmod ug+x pipeline.sh</span>    <span style="color:#6a9955;">← add execute for BOTH owner and group</span>

<span style="color:#6a9955;"># ── - (REMOVE a permission) ─────────────────────────────</span>
$ <span style="color:#3fb950;">chmod o-r salary.csv</span>      <span style="color:#6a9955;">← remove read from others (FIX the incident!)</span>
$ <span style="color:#3fb950;">chmod o-rwx salary.csv</span>    <span style="color:#6a9955;">← remove ALL from others</span>
$ <span style="color:#3fb950;">chmod g-w shared_file</span>     <span style="color:#6a9955;">← remove write from group</span>
$ <span style="color:#3fb950;">chmod a-x script.sh</span>       <span style="color:#6a9955;">← remove execute from everyone</span>

<span style="color:#6a9955;"># ── = (SET exactly — replaces all bits for that target) ──</span>
$ <span style="color:#3fb950;">chmod u=rwx script.sh</span>     <span style="color:#6a9955;">← owner gets EXACTLY rwx (replaces existing bits)</span>
$ <span style="color:#3fb950;">chmod g=rx  script.sh</span>     <span style="color:#6a9955;">← group gets EXACTLY rx (removes w if it had it)</span>
$ <span style="color:#3fb950;">chmod o=    script.sh</span>     <span style="color:#6a9955;">← others get NOTHING (= with no bits = remove all)</span>

<span style="color:#6a9955;"># ── Multiple targets in one command ─────────────────────</span>
$ <span style="color:#3fb950;">chmod u=rwx,g=rx,o= script.sh</span>
<span style="color:#6a9955;">← Set owner=rwx, group=rx, others=nothing
← ALL in one command — comma-separated
← COMMON PATTERN for deployment scripts</span>

$ ls -l script.sh
-rwxr-x--- 1 ravi data-team 1024 script.sh
<span style="color:#6a9955;">←  rwx = owner can read+write+execute
   r-x = group can read+execute (not write)
   --- = others can do nothing</span>

<span style="color:#6a9955;"># ── Recursive: apply to entire directory tree ──────────</span>
$ <span style="color:#3fb950;">chmod -R g+rx /data/pipelines/</span>
<span style="color:#6a9955;">← Apply g+rx to /data/pipelines/ AND all files/dirs inside
← -R = recursive
← DANGER: this applies SAME change to files AND directories
← Often you want different permissions for files vs dirs (see exercise)</span>

<span style="color:#6a9955;"># Better recursive: use find to target files vs dirs separately</span>
$ <span style="color:#3fb950;">find /data/pipelines/ -type f -exec chmod 640 {} \;</span>
$ <span style="color:#3fb950;">find /data/pipelines/ -type d -exec chmod 750 {} \;</span>
<span style="color:#6a9955;">← Files get 640 (rw-r-----)
← Directories get 750 (rwxr-x---)
← Directories need x to be traversable; files usually don't</span>

<span style="color:#6a9955;"># ── Verbose mode — see every change ─────────────────────</span>
$ <span style="color:#3fb950;">chmod -v u+x *.sh</span>
mode of 'etl.sh' changed from 0644 (rw-r--r--) to 0744 (rwxr--r--)
mode of 'pipeline.sh' changed from 0644 (rw-r--r--) to 0744 (rwxr--r--)
<span style="color:#6a9955;">← -v shows both old and new mode for each file</span></pre>
</div>`,
      interactiveExample: {
        code: `# Create test files to practise on
touch test_script.sh test_config.yml test_data.csv

# Check starting permissions
ls -l test_*

# Make script executable by owner only
chmod u+x test_script.sh

# Make config readable by group, not writable
chmod g=r,o= test_config.yml

# Lock down sensitive data file
chmod u=rw,g=,o= test_data.csv

# See the results
ls -l test_*`,
        explanation: "The = operator is safer than + for sensitive files because it sets an absolute state rather than relative — you always know exactly what you end up with. chmod u=rw,g=,o= on a data file is the pattern Ravi should have applied to salary.csv from the start."
      }
    },

    // ════════════════════════════════════════════════════════════
    // chmod — OCTAL MODE
    // ════════════════════════════════════════════════════════════
    {
      id: "chmod-octal",
      title: "chmod — Octal Mode (The Fast Way)",
      content: `
<div class="story-box">
  <strong>📖 Why Ravi Switched to Octal:</strong>
  <p>After writing <code>chmod u=rwx,g=rx,o=</code> for the fiftieth time, a senior engineer showed him: <code>chmod 750</code>. Same result, 8 characters saved. Octal mode is what experienced engineers use — faster to type, easier to read in scripts, and you always know the complete final state of every bit.</p>
</div>

<!-- OCTAL REFERENCE GRID SVG -->
<div class="visual-container">
<svg width="680" height="220" viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="220" fill="#0d1117" rx="12"/>
  <text x="340" y="22" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">Octal Permission Reference — Memorise This Grid</text>

  <!-- Header row -->
  <text x="60"  y="46" fill="#8b949e" font-size="11" font-weight="bold" text-anchor="middle">Octal</text>
  <text x="130" y="46" fill="#8b949e" font-size="11" font-weight="bold" text-anchor="middle">Binary</text>
  <text x="200" y="46" fill="#8b949e" font-size="11" font-weight="bold" text-anchor="middle">rwx</text>
  <text x="280" y="46" fill="#8b949e" font-size="11" font-weight="bold" text-anchor="middle">Meaning</text>

  <!-- 8 rows -->
  <!-- 0 -->
  <rect x="20" y="52" width="280" height="18" rx="3" fill="#161b22"/>
  <text x="60"  y="65" fill="#f85149" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">0</text>
  <text x="130" y="65" fill="#8b949e" font-size="11" font-family="monospace" text-anchor="middle">000</text>
  <text x="200" y="65" fill="#8b949e" font-size="12" font-family="monospace" text-anchor="middle">---</text>
  <text x="280" y="65" fill="#8b949e" font-size="10" text-anchor="middle">no access</text>
  <!-- 1 -->
  <text x="60"  y="83" fill="#d29922" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">1</text>
  <text x="130" y="83" fill="#8b949e" font-size="11" font-family="monospace" text-anchor="middle">001</text>
  <text x="200" y="83" fill="#d29922" font-size="12" font-family="monospace" text-anchor="middle">--x</text>
  <text x="280" y="83" fill="#8b949e" font-size="10" text-anchor="middle">execute only</text>
  <!-- 2 -->
  <rect x="20" y="88" width="280" height="18" rx="3" fill="#161b22"/>
  <text x="60"  y="101" fill="#d29922" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">2</text>
  <text x="130" y="101" fill="#8b949e" font-size="11" font-family="monospace" text-anchor="middle">010</text>
  <text x="200" y="101" fill="#d29922" font-size="12" font-family="monospace" text-anchor="middle">-w-</text>
  <text x="280" y="101" fill="#8b949e" font-size="10" text-anchor="middle">write only (rare)</text>
  <!-- 3 -->
  <text x="60"  y="119" fill="#d29922" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">3</text>
  <text x="130" y="119" fill="#8b949e" font-size="11" font-family="monospace" text-anchor="middle">011</text>
  <text x="200" y="119" fill="#d29922" font-size="12" font-family="monospace" text-anchor="middle">-wx</text>
  <text x="280" y="119" fill="#8b949e" font-size="10" text-anchor="middle">write+execute</text>
  <!-- 4 -->
  <rect x="20" y="124" width="280" height="18" rx="3" fill="#161b22"/>
  <text x="60"  y="137" fill="#58a6ff" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">4</text>
  <text x="130" y="137" fill="#8b949e" font-size="11" font-family="monospace" text-anchor="middle">100</text>
  <text x="200" y="137" fill="#58a6ff" font-size="12" font-family="monospace" text-anchor="middle">r--</text>
  <text x="280" y="137" fill="#8b949e" font-size="10" text-anchor="middle">read only</text>
  <!-- 5 -->
  <text x="60"  y="155" fill="#58a6ff" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">5</text>
  <text x="130" y="155" fill="#8b949e" font-size="11" font-family="monospace" text-anchor="middle">101</text>
  <text x="200" y="155" fill="#58a6ff" font-size="12" font-family="monospace" text-anchor="middle">r-x</text>
  <text x="280" y="155" fill="#8b949e" font-size="10" text-anchor="middle">read+execute</text>
  <!-- 6 -->
  <rect x="20" y="160" width="280" height="18" rx="3" fill="#161b22"/>
  <text x="60"  y="173" fill="#3fb950" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">6</text>
  <text x="130" y="173" fill="#8b949e" font-size="11" font-family="monospace" text-anchor="middle">110</text>
  <text x="200" y="173" fill="#3fb950" font-size="12" font-family="monospace" text-anchor="middle">rw-</text>
  <text x="280" y="173" fill="#8b949e" font-size="10" text-anchor="middle">read+write (files)</text>
  <!-- 7 -->
  <text x="60"  y="191" fill="#3fb950" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">7</text>
  <text x="130" y="191" fill="#8b949e" font-size="11" font-family="monospace" text-anchor="middle">111</text>
  <text x="200" y="191" fill="#3fb950" font-size="12" font-family="monospace" text-anchor="middle">rwx</text>
  <text x="280" y="191" fill="#8b949e" font-size="10" text-anchor="middle">full access</text>

  <!-- Common combos column -->
  <rect x="380" y="36" width="300" height="178" rx="8" fill="#0d1f0d" stroke="#3fb950" stroke-width="1.5"/>
  <text x="530" y="58" fill="#3fb950" font-size="11" font-weight="bold" text-anchor="middle">Most Common Combinations</text>
  <text x="394" y="80"  fill="#3fb950" font-size="13" font-family="monospace" font-weight="bold">755</text>
  <text x="440" y="80"  fill="#e6edf3" font-size="10">rwxr-xr-x  Public scripts, dirs</text>
  <text x="394" y="98"  fill="#3fb950" font-size="13" font-family="monospace" font-weight="bold">750</text>
  <text x="440" y="98"  fill="#e6edf3" font-size="10">rwxr-x---  Team scripts, dirs</text>
  <text x="394" y="116" fill="#3fb950" font-size="13" font-family="monospace" font-weight="bold">700</text>
  <text x="440" y="116" fill="#e6edf3" font-size="10">rwx------  Private scripts</text>
  <text x="394" y="134" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">644</text>
  <text x="440" y="134" fill="#e6edf3" font-size="10">rw-r--r--  Public files (default)</text>
  <text x="394" y="152" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">640</text>
  <text x="440" y="152" fill="#e6edf3" font-size="10">rw-r-----  Config files (team)</text>
  <text x="394" y="170" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">600</text>
  <text x="440" y="170" fill="#e6edf3" font-size="10">rw-------  SSH keys, private cfg</text>
  <text x="394" y="188" fill="#f85149" font-size="13" font-family="monospace" font-weight="bold">777</text>
  <text x="440" y="188" fill="#f85149" font-size="10">rwxrwxrwx  ⚠️ NEVER in production!</text>

  <text x="530" y="208" fill="#d29922" font-size="9" text-anchor="middle">Formula: r=4, w=2, x=1. Add for each target (u/g/o)</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 2 — chmod Octal Mode: Every Common Pattern</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── How to calculate octal ──────────────────────────────
# rwx  = 4+2+1 = 7
# rw-  = 4+2+0 = 6
# r-x  = 4+0+1 = 5
# r--  = 4+0+0 = 4
# ---  = 0+0+0 = 0
#
# Three digits: [owner][group][others]
# chmod 750 = owner:rwx(7) group:r-x(5) others:---(0)</span>

$ <span style="color:#3fb950;">chmod 755 script.sh</span>
<span style="color:#6a9955;">← rwxr-xr-x: owner=all, group=read+execute, others=read+execute
← Standard for public executable scripts and program binaries
← Everyone can run it; only owner can modify it</span>

$ <span style="color:#3fb950;">chmod 644 config.yml</span>
<span style="color:#6a9955;">← rw-r--r--: owner=read+write, group+others=read only
← DEFAULT for most files created by system
← Config files readable by everyone, writable by owner</span>

$ <span style="color:#3fb950;">chmod 600 ~/.ssh/id_rsa</span>
<span style="color:#6a9955;">← rw-------: ONLY owner can read/write
← SSH REQUIRES this — SSH refuses to use a key file
   with group/others permissions set (security risk)
← Error if wrong: "Permissions 0644 for id_rsa are too open"</span>

$ <span style="color:#3fb950;">chmod 700 ~/.ssh/</span>
<span style="color:#6a9955;">← rwx------: Only owner can enter this directory
← Companion to 600 on key files — SSH requires this too</span>

$ <span style="color:#3fb950;">chmod 750 /data/pipelines/</span>
<span style="color:#6a9955;">← rwxr-x---: Ravi's team fix after the incident
← owner=full, data-team group=read+execute, others=nothing
← Team can run scripts but not create/delete them
← External people: completely locked out</span>

$ <span style="color:#3fb950;">chmod 640 /etc/app/settings.conf</span>
<span style="color:#6a9955;">← rw-r-----: owner=read+write, group=read, others=nothing
← Config file accessible to the app group, hidden from world</span>

$ <span style="color:#3fb950;">chmod 777 /tmp/shared_workspace</span>
<span style="color:#6a9955;">← rwxrwxrwx: EVERYONE can read/write/execute
← Only acceptable in /tmp (cleared on reboot)
← NEVER use 777 on production files or permanent directories!
← 777 is a security disaster: any user can overwrite anything</span>

<span style="color:#6a9955;"># ── Verify with ls -l ───────────────────────────────────</span>
$ <span style="color:#3fb950;">ls -l</span>
-rwxr-xr-x  script.sh      <span style="color:#6a9955;">← 755</span>
-rw-r--r--  config.yml     <span style="color:#6a9955;">← 644</span>
-rw-------  ~/.ssh/id_rsa  <span style="color:#6a9955;">← 600</span>
-rwxr-x---  pipeline.py    <span style="color:#6a9955;">← 750</span>

<span style="color:#6a9955;"># ── stat shows the exact octal ──────────────────────────</span>
$ <span style="color:#3fb950;">stat -c "%a %n" *</span>
755 script.sh
644 config.yml
750 pipeline.py
<span style="color:#6a9955;">← %a = octal permissions, %n = filename
← Useful in scripts to CHECK current permissions programmatically</span>

$ <span style="color:#3fb950;">stat -c "%a" ~/.ssh/id_rsa</span>
600    <span style="color:#6a9955;">← just the number — use in scripts: if [ $(stat -c "%a" key) -ne 600 ]</span>

<span style="color:#6a9955;"># ── chmod -R with octal ─────────────────────────────────</span>
$ <span style="color:#3fb950;">chmod -R 750 /opt/pipeline/</span>
<span style="color:#6a9955;">← Sets 750 on ALL files AND directories
← Problem: directories need x to be traversable, but so do scripts
   Regular text data files with 750 (execute bit on data?) is odd
← Better approach:</span>
$ <span style="color:#3fb950;">find /opt/pipeline/ -type f -exec chmod 640 {} \;</span>
$ <span style="color:#3fb950;">find /opt/pipeline/ -type d -exec chmod 750 {} \;</span>
<span style="color:#6a9955;">← Files: 640 (rw-r-----) — read-only for group, no execute
← Dirs:  750 (rwxr-x--) — traversable by group</span></pre>
</div>

<table class="comparison-table">
  <thead><tr><th>Mode</th><th>ls -l</th><th>Use case</th><th>Risk level</th></tr></thead>
  <tbody>
    <tr><td><code>777</code></td><td>rwxrwxrwx</td><td>/tmp scratch only</td><td style="color:#f85149;">🔴 Never in prod</td></tr>
    <tr><td><code>755</code></td><td>rwxr-xr-x</td><td>Public scripts, /usr/bin programs</td><td style="color:#d29922;">🟡 Public access</td></tr>
    <tr><td><code>750</code></td><td>rwxr-x---</td><td>Team scripts, pipeline dirs</td><td style="color:#3fb950;">🟢 Team access</td></tr>
    <tr><td><code>700</code></td><td>rwx------</td><td>Private scripts, root scripts</td><td style="color:#3fb950;">🟢 Owner only</td></tr>
    <tr><td><code>644</code></td><td>rw-r--r--</td><td>Config files, web files</td><td style="color:#d29922;">🟡 World-readable</td></tr>
    <tr><td><code>640</code></td><td>rw-r-----</td><td>App configs with sensitive data</td><td style="color:#3fb950;">🟢 Team-readable</td></tr>
    <tr><td><code>600</code></td><td>rw-------</td><td>SSH keys, passwords, tokens</td><td style="color:#3fb950;">🟢 Owner only</td></tr>
    <tr><td><code>400</code></td><td>r--------</td><td>Read-only archives, law-enforced logs</td><td style="color:#3fb950;">🟢 Immutable</td></tr>
  </tbody>
</table>`,
      interactiveExample: {
        code: `# Practise reading octal from ls -l output:
# -rw-r--r-- = ?  (answer: 644)
# -rwxr-x--- = ?  (answer: 750)
# -rw------- = ?  (answer: 600)

# Verify your answers with stat:
touch testfile
chmod 644 testfile && stat -c "%a %A" testfile
chmod 750 testfile && stat -c "%a %A" testfile
chmod 600 testfile && stat -c "%a %A" testfile`,
        explanation: "stat -c '%a %A' shows both the octal number AND the symbolic string side by side — the best way to build the mental mapping between them. After running this a few times you'll instantly read 640 as rw-r----- in your head."
      }
    },

    // ════════════════════════════════════════════════════════════
    // chown / chgrp
    // ════════════════════════════════════════════════════════════
    {
      id: "chown-chgrp",
      title: "chown & chgrp — Changing Ownership",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Deployment Problem:</strong>
  <p>The ETL scripts were owned by <code>ravi</code> (his personal account). The production deployment ran as the <code>etl-runner</code> service account. When the scripts deployed to <code>/opt/pipeline/</code>, the service couldn't read them. Fix: <code>chown -R etl-runner:data-team /opt/pipeline/</code>. Three seconds. Pipeline running.</p>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 3 — chown & chgrp: Every Form</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># See current ownership</span>
$ <span style="color:#58a6ff;">ls -l /opt/pipeline/</span>
-rwxr-x--- 1 <span style="color:#3fb950;">ravi</span> <span style="color:#d29922;">data-team</span> 4096 etl.py
-rw-r----- 1 <span style="color:#3fb950;">ravi</span> <span style="color:#d29922;">data-team</span> 1024 settings.conf
<span style="color:#6a9955;">←          owner↑  group↑</span>

<span style="color:#6a9955;"># ── chown: change owner ────────────────────────────────</span>
<span style="color:#6a9955;"># chown USER file</span>
$ <span style="color:#58a6ff;">sudo chown etl-runner etl.py</span>
<span style="color:#6a9955;">← Change OWNER to etl-runner (group unchanged)
← Requires sudo: only root can give away file ownership</span>

$ ls -l etl.py
-rwxr-x--- 1 <span style="color:#3fb950;">etl-runner</span> data-team 4096 etl.py

<span style="color:#6a9955;"># chown USER:GROUP file  ─ change BOTH owner and group</span>
$ <span style="color:#58a6ff;">sudo chown etl-runner:etl-group etl.py</span>
<span style="color:#6a9955;">← Change owner AND group in one command
← The colon separates user:group</span>

$ ls -l etl.py
-rwxr-x--- 1 <span style="color:#3fb950;">etl-runner</span> <span style="color:#d29922;">etl-group</span> 4096 etl.py

<span style="color:#6a9955;"># chown :GROUP file  ─ change ONLY the group (same as chgrp)</span>
$ <span style="color:#58a6ff;">sudo chown :data-team settings.conf</span>
<span style="color:#6a9955;">← Just change the group — owner untouched
← Colon with no user = group only</span>

<span style="color:#6a9955;"># chown -R  ─ recursive (entire directory tree)</span>
$ <span style="color:#58a6ff;">sudo chown -R etl-runner:data-team /opt/pipeline/</span>
<span style="color:#6a9955;">← Change owner+group for /opt/pipeline/ AND everything inside
← THIS is Ravi's deployment fix
← Most common production chown pattern</span>

$ ls -l /opt/pipeline/
-rwxr-x--- 1 etl-runner data-team 4096 etl.py
-rw-r----- 1 etl-runner data-team 1024 settings.conf
<span style="color:#6a9955;">← All files now owned by etl-runner:data-team</span>

<span style="color:#6a9955;"># chown with --from  ─ only change if current owner matches</span>
$ <span style="color:#58a6ff;">sudo chown --from=ravi etl-runner:data-team etl.py</span>
<span style="color:#6a9955;">← Only change ownership if current owner is 'ravi'
← Safe in scripts: won't accidentally touch files you don't mean to</span>

<span style="color:#6a9955;"># ── chgrp: change group only ───────────────────────────</span>
$ <span style="color:#58a6ff;">sudo chgrp data-team salary.csv</span>
<span style="color:#6a9955;">← Change ONLY the group to data-team (owner unchanged)
← Regular users CAN use chgrp if they're a member of the target group</span>

$ <span style="color:#58a6ff;">sudo chgrp -R data-team /data/shared/</span>
<span style="color:#6a9955;">← Recursively change group on entire directory</span>

<span style="color:#6a9955;"># ── Practical patterns for data engineering ─────────────</span>

<span style="color:#6a9955;"># Pattern 1: Secure deployment — set service account ownership</span>
$ <span style="color:#58a6ff;">sudo chown -R etl-runner:etl-group /opt/pipeline/</span>
$ <span style="color:#58a6ff;">sudo chmod -R 750 /opt/pipeline/</span>
<span style="color:#6a9955;">← After deploying: take personal ownership away, give to service account</span>

<span style="color:#6a9955;"># Pattern 2: Shared data directory — group readable, owner writable</span>
$ <span style="color:#58a6ff;">sudo chown -R ravi:data-team /data/shared/</span>
$ <span style="color:#58a6ff;">sudo chmod -R 2770 /data/shared/</span>   <span style="color:#6a9955;">← 2=setGID (covered in next section)</span>
<span style="color:#6a9955;">← ravi writes, data-team reads — new files inherit group</span>

<span style="color:#6a9955;"># Pattern 3: Web server content</span>
$ <span style="color:#58a6ff;">sudo chown -R www-data:www-data /var/www/html/</span>
$ <span style="color:#58a6ff;">sudo chmod -R 755 /var/www/html/</span>

<span style="color:#6a9955;"># Pattern 4: Database files — only db user can access</span>
$ <span style="color:#58a6ff;">sudo chown -R mysql:mysql /var/lib/mysql/</span>
$ <span style="color:#58a6ff;">sudo chmod -R 700 /var/lib/mysql/</span>

<span style="color:#d29922;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  chown vs chgrp:
  chown USER:GROUP  → change both in one shot (most common)
  chown :GROUP      → change group only (like chgrp)
  chgrp GROUP       → change group only (explicit, clearer intent)
  Prefer chown USER:GROUP when you want to change both.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span></pre>
</div>`,
      interactiveExample: {
        code: `# Check current ownership of key system dirs
ls -la /var/log/ | head -6
ls -la /var/lib/mysql/ 2>/dev/null || echo "MySQL not installed"
ls -la /var/www/ 2>/dev/null || echo "Web server not installed"

# See what groups you belong to (chgrp only works to groups you're in)
groups

# Check who owns files in /tmp
ls -la /tmp/ | head -10`,
        explanation: "groups shows which groups you belong to — you can only chgrp files to groups you're already a member of (without sudo). This is why adding yourself to the docker or sudo group requires logout/login to take effect — your shell session has the old group list cached."
      }
    },

    // ════════════════════════════════════════════════════════════
    // UMASK
    // ════════════════════════════════════════════════════════════
    {
      id: "umask-section",
      title: "umask — Default Permissions for New Files",
      content: `
<div class="story-box">
  <strong>📖 Ravi's "Why Is This 644?" Question:</strong>
  <p>Ravi noticed every new file he created was <code>rw-r--r--</code> (644). Every new directory was <code>rwxr-xr-x</code> (755). He never set those — where did they come from? The answer: <strong>umask</strong>. It's the default permissions mask applied to every new file and directory you create.</p>
</div>

<!-- UMASK CALCULATION SVG -->
<div class="visual-container">
<svg width="680" height="160" viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="160" fill="#0d1117" rx="12"/>
  <text x="340" y="22" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">How umask Works — Permissions Subtraction</text>

  <!-- Files row -->
  <text x="50"  y="55" fill="#8b949e" font-size="11" text-anchor="middle">FILES</text>
  <text x="200" y="55" fill="#8b949e" font-size="11" text-anchor="middle">Maximum possible</text>
  <rect x="280" y="40" width="80" height="24" rx="4" fill="#0f2a0f" stroke="#3fb950"/>
  <text x="320" y="57" fill="#3fb950" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">0666</text>
  <text x="380" y="57" fill="#8b949e" font-size="14" text-anchor="middle">−</text>
  <text x="430" y="55" fill="#8b949e" font-size="11" text-anchor="middle">umask</text>
  <rect x="460" y="40" width="80" height="24" rx="4" fill="#2a0d0d" stroke="#f85149"/>
  <text x="500" y="57" fill="#f85149" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">0022</text>
  <text x="560" y="57" fill="#8b949e" font-size="14" text-anchor="middle">=</text>
  <rect x="580" y="40" width="80" height="24" rx="4" fill="#0d1f3c" stroke="#58a6ff"/>
  <text x="620" y="57" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">0644</text>

  <!-- Dirs row -->
  <text x="50"  y="105" fill="#8b949e" font-size="11" text-anchor="middle">DIRS</text>
  <text x="200" y="105" fill="#8b949e" font-size="11" text-anchor="middle">Maximum possible</text>
  <rect x="280" y="90" width="80" height="24" rx="4" fill="#0f2a0f" stroke="#3fb950"/>
  <text x="320" y="107" fill="#3fb950" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">0777</text>
  <text x="380" y="107" fill="#8b949e" font-size="14" text-anchor="middle">−</text>
  <text x="430" y="105" fill="#8b949e" font-size="11" text-anchor="middle">umask</text>
  <rect x="460" y="90" width="80" height="24" rx="4" fill="#2a0d0d" stroke="#f85149"/>
  <text x="500" y="107" fill="#f85149" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">0022</text>
  <text x="560" y="107" fill="#8b949e" font-size="14" text-anchor="middle">=</text>
  <rect x="580" y="90" width="80" height="24" rx="4" fill="#0d1f3c" stroke="#58a6ff"/>
  <text x="620" y="107" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">0755</text>

  <text x="340" y="145" fill="#8b949e" font-size="10" text-anchor="middle">umask 0022: blocks write for group and others → standard Ubuntu default</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 4 — umask: Default Permissions Control</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── Check current umask ─────────────────────────────────</span>
$ <span style="color:#d29922;">umask</span>
0022    <span style="color:#6a9955;">← four digits: first is special bits (usually 0), then ugo
← 0022 = block write for group (2) and others (2)
← 666 - 022 = 644 for files (rw-r--r--)
← 777 - 022 = 755 for dirs  (rwxr-xr-x)</span>

$ <span style="color:#d29922;">umask -S</span>
u=rwx,g=rx,o=rx    <span style="color:#6a9955;">← -S = symbolic display of WHAT IS ALLOWED (inverse of umask)</span>

<span style="color:#6a9955;"># Verify: create a file and dir with default umask</span>
$ touch newfile.txt && mkdir newdir
$ ls -l
-rw-r--r-- 1 ravi ravi 0 newfile.txt    <span style="color:#6a9955;">← 644 ✓</span>
drwxr-xr-x 2 ravi ravi 4096 newdir/    <span style="color:#6a9955;">← 755 ✓</span>

<span style="color:#6a9955;"># ── Set umask ───────────────────────────────────────────</span>
$ <span style="color:#d29922;">umask 027</span>
<span style="color:#6a9955;">← New umask: block write for group, ALL for others
← Files:  666 - 027 = 640 (rw-r-----)
← Dirs:   777 - 027 = 750 (rwxr-x---)</span>

$ touch team_file.csv && mkdir team_dir
$ ls -l
-rw-r----- 1 ravi ravi 0 team_file.csv    <span style="color:#6a9955;">← 640 ✓ group can read, others nothing</span>
drwxr-x--- 2 ravi ravi 4096 team_dir/    <span style="color:#6a9955;">← 750 ✓</span>

<span style="color:#6a9955;"># Tighter: block everything for group and others</span>
$ <span style="color:#d29922;">umask 077</span>
<span style="color:#6a9955;">← Files:  666 - 077 = 600 (rw-------)
← Dirs:   777 - 077 = 700 (rwx------)</span>

$ touch private.key && ls -l private.key
-rw------- 1 ravi ravi 0 private.key    <span style="color:#6a9955;">← 600 — only owner can read</span>
<span style="color:#6a9955;">← Use umask 077 when creating SSH keys, API tokens, credentials</span>

<span style="color:#6a9955;"># umask is per-PROCESS — only affects current shell session</span>
<span style="color:#6a9955;"># To make permanent: add to ~/.bashrc or /etc/profile</span>
$ <span style="color:#d29922;">echo "umask 027" >> ~/.bashrc</span>
<span style="color:#6a9955;">← Every new shell session will start with umask 027
← Team standard: put in /etc/profile for all users</span>

<span style="color:#d29922;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Common umask values and their meaning:
  0022 → files:644 dirs:755  Standard (Ubuntu default)
  0027 → files:640 dirs:750  Team/enterprise standard
  0077 → files:600 dirs:700  High-security (private keys)
  0002 → files:664 dirs:775  Shared group writes (devs)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span></pre>
</div>`,
      interactiveExample: {
        code: `# See your current umask and what it produces
umask
touch test_umask_file && mkdir test_umask_dir
ls -l test_umask_*
rm -f test_umask_file && rmdir test_umask_dir

# Try a tighter umask temporarily
( umask 077 && touch private_test && ls -l private_test && rm private_test )
# The subshell () means umask change only affects that subshell

# Restore default
umask 022`,
        explanation: "Running umask changes inside a subshell () is a common scripting technique — it temporarily tightens permissions for creating sensitive files without affecting the rest of the script. This is used in deployment scripts when writing tokens or keys to disk."
      }
    },

    // ════════════════════════════════════════════════════════════
    // SPECIAL BITS — setUID / setGID / sticky
    // ════════════════════════════════════════════════════════════
    {
      id: "special-bits",
      title: "Special Permission Bits — setUID, setGID & Sticky Bit",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Mystery: Why Can Normal Users Change Passwords?</strong>
  <p>Ravi ran <code>passwd</code> to change his password. It worked — even though password hashes live in <code>/etc/shadow</code> which is only writable by root. How? He ran <code>ls -l /usr/bin/passwd</code> and saw <code>-rw<strong>s</strong>r-xr-x</code>. That <strong>s</strong> in the owner execute position is the setUID bit — the key to understanding how privilege escalation works legitimately in Linux.</p>
</div>

<!-- SPECIAL BITS SVG -->
<div class="visual-container">
<svg width="680" height="155" viewBox="0 0 680 155" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="155" fill="#0d1117" rx="12"/>
  <text x="340" y="20" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">Special Permission Bits — The Three Extra Bits</text>

  <!-- setUID -->
  <rect x="15"  y="30" width="208" height="112" rx="8" fill="#2a0d0d" stroke="#f85149" stroke-width="2"/>
  <text x="119" y="52" fill="#f85149" font-size="12" font-weight="bold" text-anchor="middle">setUID  (SUID)</text>
  <text x="119" y="68" fill="#e6edf3" font-size="11" font-family="monospace" text-anchor="middle">ls: -rw<tspan fill="#f85149">s</tspan>r-xr-x</text>
  <text x="119" y="82" fill="#e6edf3" font-size="11" font-family="monospace" text-anchor="middle">chmod: 4755</text>
  <text x="25"  y="98" fill="#8b949e" font-size="9">Runs as FILE OWNER</text>
  <text x="25"  y="112" fill="#8b949e" font-size="9">not as calling user</text>
  <text x="25"  y="128" fill="#d29922" font-size="9">Example: /usr/bin/passwd</text>
  <text x="25"  y="140" fill="#d29922" font-size="9">runs as root, called by user</text>

  <!-- setGID -->
  <rect x="238" y="30" width="206" height="112" rx="8" fill="#0d1f3c" stroke="#58a6ff" stroke-width="2"/>
  <text x="341" y="52" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">setGID  (SGID)</text>
  <text x="341" y="68" fill="#e6edf3" font-size="11" font-family="monospace" text-anchor="middle">ls: -rwxr-<tspan fill="#58a6ff">s</tspan>r-x</text>
  <text x="341" y="82" fill="#e6edf3" font-size="11" font-family="monospace" text-anchor="middle">chmod: 2755</text>
  <text x="248" y="98" fill="#8b949e" font-size="9">On dirs: new files inherit</text>
  <text x="248" y="112" fill="#8b949e" font-size="9">the directory's GROUP</text>
  <text x="248" y="128" fill="#d29922" font-size="9">Key for shared team dirs!</text>
  <text x="248" y="140" fill="#d29922" font-size="9">chmod 2770 /data/shared/</text>

  <!-- Sticky -->
  <rect x="460" y="30" width="205" height="112" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <text x="562" y="52" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">Sticky Bit</text>
  <text x="562" y="68" fill="#e6edf3" font-size="11" font-family="monospace" text-anchor="middle">ls: drwxrwxrw<tspan fill="#3fb950">t</tspan></text>
  <text x="562" y="82" fill="#e6edf3" font-size="11" font-family="monospace" text-anchor="middle">chmod: 1777</text>
  <text x="470" y="98" fill="#8b949e" font-size="9">On dirs: only file OWNER</text>
  <text x="470" y="112" fill="#8b949e" font-size="9">can delete their own files</text>
  <text x="470" y="128" fill="#d29922" font-size="9">Used on /tmp — world write</text>
  <text x="470" y="140" fill="#d29922" font-size="9">but can't delete others' files</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 5 — setUID · setGID · Sticky Bit: Special Permissions</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── setUID (SUID) ─ run as file owner ───────────────────</span>
$ <span style="color:#f85149;">ls -l /usr/bin/passwd</span>
-rwsr-xr-x 1 root root 68208 /usr/bin/passwd
<span style="color:#6a9955;">← The 's' in owner-execute position = setUID bit set
← passwd runs as ROOT regardless of who calls it
← How: user calls passwd → kernel sees SUID → runs as owner (root)
←      → root can write /etc/shadow → password updated
← Without SUID: regular user couldn't touch /etc/shadow</span>

$ <span style="color:#f85149;">ls -l /usr/bin/sudo</span>
-r-ws--x--x 1 root root 166056 /usr/bin/sudo
<span style="color:#6a9955;">← sudo itself has SUID! That's how it elevates to root
← S (capital S) = SUID set but NO execute permission on owner</span>

<span style="color:#6a9955;"># Find all SUID programs on system (security audit)</span>
$ <span style="color:#f85149;">find / -perm -4000 -type f 2>/dev/null</span>
/usr/bin/passwd
/usr/bin/sudo
/usr/bin/mount
/usr/bin/umount
/usr/bin/su
<span style="color:#6a9955;">← -perm -4000 = files with SUID bit set
← KNOW this list! Any unexpected SUID binary = possible rootkit</span>

<span style="color:#6a9955;"># Set SUID on a file (rarely done; only for specific use cases)</span>
$ <span style="color:#f85149;">sudo chmod u+s myprogram</span>    <span style="color:#6a9955;">← symbolic</span>
$ <span style="color:#f85149;">sudo chmod 4755 myprogram</span>   <span style="color:#6a9955;">← octal (4=SUID digit in front)</span>

<span style="color:#6a9955;"># ── setGID (SGID) ─ shared directory group inheritance ──</span>
<span style="color:#6a9955;"># THE most useful special bit for data engineering teams</span>

<span style="color:#6a9955;"># Problem without SGID:</span>
$ mkdir /data/shared
$ ls -la /data/
drwxrwxr-x 2 root data-team /data/shared
$ touch /data/shared/ravi_file.csv
$ ls -l /data/shared/
-rw-r--r-- 1 <span style="color:#f85149;">ravi ravi</span> 0 ravi_file.csv   <span style="color:#6a9955;">← group is RAVI not data-team!</span>
<span style="color:#6a9955;">← Without SGID: new files get the CREATOR's primary group
← data-team members can't read ravi_file.csv!</span>

<span style="color:#6a9955;"># Fix: set SGID on the shared directory</span>
$ <span style="color:#58a6ff;">sudo chmod g+s /data/shared/</span>     <span style="color:#6a9955;">← symbolic</span>
$ <span style="color:#58a6ff;">sudo chmod 2770 /data/shared/</span>    <span style="color:#6a9955;">← octal (2=SGID in front)</span>

$ ls -la /data/
drwxrws--- 2 root data-team /data/shared
<span style="color:#6a9955;">← 's' in GROUP execute position = SGID set
← Now: any file created inside inherits 'data-team' group</span>

$ touch /data/shared/ravi_file2.csv
$ ls -l /data/shared/
-rw-r--r-- 1 ravi <span style="color:#3fb950;">data-team</span> 0 ravi_file2.csv  <span style="color:#6a9955;">← group auto-set to data-team!</span>
<span style="color:#6a9955;">← SGID makes shared directories self-managing
← No manual chgrp needed after every file creation</span>

<span style="color:#6a9955;"># SGID on a directory — full production setup</span>
$ <span style="color:#58a6ff;">sudo mkdir /data/team_data</span>
$ <span style="color:#58a6ff;">sudo chown root:data-team /data/team_data</span>
$ <span style="color:#58a6ff;">sudo chmod 2770 /data/team_data</span>
<span style="color:#6a9955;">← 2770 = SGID + rwxrws--- (owner+group full, others nothing)
← Any data-team member creates files → auto-owned by data-team
← Nobody outside can see anything</span>

<span style="color:#6a9955;"># ── Sticky Bit ─ protect files in world-writable dirs ───</span>
$ <span style="color:#3fb950;">ls -la / | grep tmp</span>
drwxrwxrw<span style="color:#3fb950;">t</span>  19 root root 4096 /tmp
<span style="color:#6a9955;">← 't' in others-execute position = sticky bit set
← /tmp is writable by EVERYONE (rwxrwxrwx part)
← But sticky bit means: you can only DELETE your OWN files
← Without sticky bit: ravi could delete priya's /tmp files!</span>

$ <span style="color:#3fb950;">sudo chmod +t /data/shared_scratch/</span>    <span style="color:#6a9955;">← add sticky bit</span>
$ <span style="color:#3fb950;">sudo chmod 1777 /data/shared_scratch/</span>  <span style="color:#6a9955;">← world-writable + sticky</span>

<span style="color:#6a9955;"># Combined special bits in octal — the leading digit:</span>
<span style="color:#6a9955;"># 4--- = SUID       (4000)</span>
<span style="color:#6a9955;"># 2--- = SGID       (2000)</span>
<span style="color:#6a9955;"># 1--- = Sticky     (1000)</span>
<span style="color:#6a9955;"># 4+2  = SUID+SGID  (6000)  — unusual</span>
<span style="color:#6a9955;"># Examples:</span>
<span style="color:#6a9955;">#   chmod 4755 = SUID + 755</span>
<span style="color:#6a9955;">#   chmod 2770 = SGID + 770  ← shared dir</span>
<span style="color:#6a9955;">#   chmod 1777 = sticky + 777 ← /tmp-like</span>

<span style="color:#6a9955;"># Find all directories with SGID set</span>
$ <span style="color:#3fb950;">find / -perm -2000 -type d 2>/dev/null | head -5</span></pre>
</div>

<div class="deep-dive-box" style="margin-top:12px;">
  <h4>🔬 How the Kernel Checks Permissions — Every File Access</h4>
  <p>Every time you access a file, the kernel performs this exact check in the VFS (Virtual Filesystem) layer: (1) Get the calling process's effective UID/GIDs. (2) Get the file's owner UID, group GID, and permission bits from the inode. (3) If effective UID == 0 (root): grant access regardless of bits (except execute on files with no execute bit). (4) If effective UID == file owner UID: apply owner bits only. (5) If any of the process's GIDs == file group GID: apply group bits only. (6) Else: apply others bits. This check happens at the syscall boundary — <code>open()</code>, <code>read()</code>, <code>write()</code>, <code>execve()</code>. There is no way to bypass it from userspace.</p>
</div>`
    }

  ], // end sections

  // ════════════════════════════════════════════════════════════
  // PRACTICE EXERCISES
  // ════════════════════════════════════════════════════════════
  practiceExercises: [
    {
      id: "perm-ex1",
      difficulty: "Easy",
      title: "Permission Reader",
      description: "Given ls -l output, read the permission string and convert to octal — and back. Practice stat -c to verify your mental math.",
      starterCode: `#!/bin/bash
echo "=== PERMISSION READING EXERCISE ==="

# Create files with specific permissions
mkdir -p /tmp/perm_test_$$
cd /tmp/perm_test_$$

touch file_a file_b file_c file_d
chmod 644 file_a
chmod 750 file_b
chmod 600 file_c
chmod 755 file_d

echo ""
echo "File permissions (ls -l):"
ls -l

echo ""
echo "Your task: for each file, what is the octal?"
echo "file_a: ??? (answer should be 644)"
echo "file_b: ??? (answer should be 750)"
echo "file_c: ??? (answer should be 600)"
echo "file_d: ??? (answer should be 755)"

echo ""
echo "Verify with stat:"
stat -c "%n: octal=%a  symbolic=%A" file_a file_b file_c file_d

echo ""
echo "=== REVERSE: octal to symbolic ==="
echo "644 = ??? (rw-r--r--)"
echo "750 = ??? (rwxr-x---)"
echo "600 = ??? (rw-------)"
echo "755 = ??? (rwxr-xr-x)"

cd - && rm -rf /tmp/perm_test_$$`,
      solution: `#!/bin/bash
echo "=== PERMISSION READING EXERCISE ==="

mkdir -p /tmp/perm_test_$$
cd /tmp/perm_test_$$

touch file_a file_b file_c file_d
chmod 644 file_a
chmod 750 file_b
chmod 600 file_c
chmod 755 file_d

echo ""
echo "File permissions (ls -l):"
ls -l

echo ""
echo "Verify with stat:"
stat -c "%n: octal=%a  symbolic=%A" file_a file_b file_c file_d

echo ""
echo "=== Decode each: ==="
for f in file_a file_b file_c file_d; do
    oct=$(stat -c "%a" $f)
    sym=$(stat -c "%A" $f)
    echo "$f → octal: $oct → symbolic: $sym"
    # Explain each digit
    o1=$((oct / 100));     o2=$(( (oct % 100) / 10 ));    o3=$((oct % 10))
    echo "  owner($o1) group($o2) others($o3)"
done

cd - && rm -rf /tmp/perm_test_$$`,
      explanation: "The mental math formula: for each digit, add up what's set: r=4, w=2, x=1. For rwx: 4+2+1=7. For r-x: 4+0+1=5. For rw-: 4+2+0=6. For ---: 0. stat -c '%a' gives you the clean octal number to verify — this will become instant mental arithmetic after 50 or so repetitions."
    },
    {
      id: "perm-ex2",
      difficulty: "Easy",
      title: "Script Deployment Permissions",
      description: "Apply the correct permissions for a small ETL project: executable scripts, readable-only configs, private credential files, and a shared output directory.",
      starterCode: `#!/bin/bash
# Create a mock ETL project structure
mkdir -p /tmp/etl_project_$$/{ scripts, config, credentials, output }
touch /tmp/etl_project_$$/scripts/{etl.sh,transform.sh,load.sh}
touch /tmp/etl_project_$$/config/{settings.yml,logging.conf}
touch /tmp/etl_project_$$/credentials/{db_password.txt,api_key.txt}
touch /tmp/etl_project_$$/output/.gitkeep

PROJ="/tmp/etl_project_$$"

echo "=== Before permissions setup ==="
find "$PROJ" | xargs ls -ld 2>/dev/null | awk '{print $1, $NF}'

echo ""
echo "=== Applying correct permissions ==="

echo "1. Scripts: executable by owner, readable+executable by group:"
???   # chmod for scripts/

echo "2. Config files: readable by group, not writable:"
???   # chmod for config/

echo "3. Credentials: ONLY owner can read (no group/others access):"
???   # chmod for credentials/ AND files inside

echo "4. Output directory: writable by group (for pipeline output):"
???   # chmod for output/

echo ""
echo "=== After permissions setup ==="
find "$PROJ" | xargs ls -ld 2>/dev/null | awk '{print $1, $NF}'

rm -rf /tmp/etl_project_$$`,
      solution: `#!/bin/bash
mkdir -p /tmp/etl_project_$$/{scripts,config,credentials,output}
touch /tmp/etl_project_$$/scripts/{etl.sh,transform.sh,load.sh}
touch /tmp/etl_project_$$/config/{settings.yml,logging.conf}
touch /tmp/etl_project_$$/credentials/{db_password.txt,api_key.txt}
touch /tmp/etl_project_$$/output/.gitkeep

PROJ="/tmp/etl_project_$$"

echo "=== Before permissions setup ==="
find "$PROJ" | xargs ls -ld 2>/dev/null | awk '{print $1, $NF}'

echo ""
echo "=== Applying correct permissions ==="

echo "1. Scripts: executable by owner, readable+executable by group:"
chmod 750 "$PROJ/scripts/"
chmod 750 "$PROJ/scripts/"*.sh

echo "2. Config files: readable by group, not writable:"
chmod 750 "$PROJ/config/"
chmod 640 "$PROJ/config/"*

echo "3. Credentials: ONLY owner can read:"
chmod 700 "$PROJ/credentials/"
chmod 600 "$PROJ/credentials/"*

echo "4. Output directory: writable by group:"
chmod 770 "$PROJ/output/"

echo ""
echo "=== After permissions setup ==="
find "$PROJ" | xargs ls -ld 2>/dev/null | awk '{print $1, $NF}'

rm -rf /tmp/etl_project_$$`,
      explanation: "The critical insight: directories need x to be traversable even if their contents don't need x. So config gets 750 (dir traversable by group) while config files get 640 (readable by group, no execute needed on data files). Credential directories should be 700 (not even visible to group) with 600 files inside — belt AND suspenders."
    },
    {
      id: "perm-ex3",
      difficulty: "Medium",
      title: "The Salary File Recovery",
      description: "Recreate and fix the salary file incident from the story. Apply 777, observe the security problem, then fix it correctly using proper permissions and group ownership.",
      starterCode: `#!/bin/bash
echo "=== RECREATING THE SALARY FILE INCIDENT ==="

# Setup: create users and groups would need root; simulate with files
mkdir -p /tmp/incident_sim_$$/{configs,shared}
echo "employee,salary" > /tmp/incident_sim_$$/configs/salary_bands.csv
echo "spark.master=local" > /tmp/incident_sim_$$/configs/pipeline.conf
echo "db.password=secret123" > /tmp/incident_sim_$$/configs/db_settings.conf

SIMDIR="/tmp/incident_sim_$$"

echo ""
echo "Step 1: The 'quick fix' that caused the incident"
chmod 777 "$SIMDIR/configs/"
chmod 777 "$SIMDIR/configs/"*
echo "After chmod 777:"
ls -l "$SIMDIR/configs/"

echo ""
echo "Step 2: What damage is visible? Anyone can:"
stat -c "File: %n | Permissions: %A (%a)" "$SIMDIR/configs/"*

echo ""
echo "Step 3: THE FIX — apply proper permissions"
echo "  - Directory: group can enter/read (750)"
echo "  - Pipeline config: group can read (640)"
echo "  - Salary data: owner only! (600)"
echo "  - DB settings: owner only! (600)"

# Apply the fix:
???  # fix directory
???  # fix pipeline.conf
???  # fix salary_bands.csv
???  # fix db_settings.conf

echo ""
echo "Step 4: Verify the fix:"
ls -l "$SIMDIR/configs/"

echo ""
echo "Step 5: Check each file's security level:"
for f in "$SIMDIR/configs/"*; do
    perm=$(stat -c "%a" "$f")
    name=$(basename "$f")
    if [ "$perm" -le 640 ]; then
        echo "✅ SECURE: $name ($perm)"
    else
        echo "⚠️  WARNING: $name ($perm) — too permissive!"
    fi
done

rm -rf /tmp/incident_sim_$$`,
      solution: `#!/bin/bash
echo "=== RECREATING THE SALARY FILE INCIDENT ==="

mkdir -p /tmp/incident_sim_$$/{configs,shared}
echo "employee,salary" > /tmp/incident_sim_$$/configs/salary_bands.csv
echo "spark.master=local" > /tmp/incident_sim_$$/configs/pipeline.conf
echo "db.password=secret123" > /tmp/incident_sim_$$/configs/db_settings.conf

SIMDIR="/tmp/incident_sim_$$"

echo ""
echo "Step 1: The 'quick fix' that caused the incident"
chmod 777 "$SIMDIR/configs/"
chmod 777 "$SIMDIR/configs/"*
echo "After chmod 777:"
ls -l "$SIMDIR/configs/"

echo ""
echo "Step 2: What damage is visible?"
stat -c "File: %n | Permissions: %A (%a)" "$SIMDIR/configs/"*

echo ""
echo "Step 3: THE FIX"
chmod 750 "$SIMDIR/configs/"
chmod 640 "$SIMDIR/configs/pipeline.conf"
chmod 600 "$SIMDIR/configs/salary_bands.csv"
chmod 600 "$SIMDIR/configs/db_settings.conf"

echo ""
echo "Step 4: Verify the fix:"
ls -l "$SIMDIR/configs/"

echo ""
echo "Step 5: Security audit:"
for f in "$SIMDIR/configs/"*; do
    perm=$(stat -c "%a" "$f")
    name=$(basename "$f")
    if [ "$perm" -le 640 ]; then
        echo "✅ SECURE: $name ($perm)"
    else
        echo "⚠️  WARNING: $name ($perm) — too permissive!"
    fi
done

rm -rf /tmp/incident_sim_$$`,
      explanation: "The security audit loop at the end (comparing permission numbers arithmetically) is a real technique used in deployment verification scripts. 640 or lower means only owner+group can access. The critical lesson: db_settings.conf containing a password should ALWAYS be 600 — not even the group should read database credentials. Use environment variables or a secrets manager instead of config files when possible."
    },
    {
      id: "perm-ex4",
      difficulty: "Medium",
      title: "setGID Shared Directory Setup",
      description: "Set up a production-quality shared team directory using setGID so that all files created by any team member automatically belong to the shared group — without manual chgrp.",
      starterCode: `#!/bin/bash
echo "=== SHARED TEAM DIRECTORY SETUP ==="

SHARED="/tmp/team_data_$$"
mkdir -p "$SHARED"

echo ""
echo "Step 1: Check initial state"
ls -ld "$SHARED"

echo ""
echo "Step 2: Set up as shared directory (owner:group, permissions, SGID)"
# Set group ownership to simulate a team group (use your own group)
MY_GROUP=$(id -gn)
sudo chown :$MY_GROUP "$SHARED" 2>/dev/null || chown :$MY_GROUP "$SHARED" 2>/dev/null || true
???  # Set permissions 2770 (SGID + rwxrws---)

echo ""
echo "Step 3: Verify SGID is set"
ls -ld "$SHARED"
echo "SGID set? Look for 's' in group-execute position"

echo ""
echo "Step 4: Create files and verify group inheritance"
touch "$SHARED/file_from_user1.csv"
mkdir "$SHARED/subdir_from_user1"
touch "$SHARED/subdir_from_user1/nested_file.csv"

ls -lR "$SHARED/"

echo ""
echo "Step 5: Verify all files got the correct group"
find "$SHARED" -type f | while read f; do
    grp=$(stat -c "%G" "$f")
    echo "$(basename $f) → group: $grp"
done

echo ""
echo "Step 6: Show the octal permission of the directory"
stat -c "%a %A %n" "$SHARED"

rm -rf "$SHARED"`,
      solution: `#!/bin/bash
echo "=== SHARED TEAM DIRECTORY SETUP ==="

SHARED="/tmp/team_data_$$"
mkdir -p "$SHARED"

echo ""
echo "Step 1: Check initial state"
ls -ld "$SHARED"

echo ""
echo "Step 2: Set up as shared directory"
MY_GROUP=$(id -gn)
chown :$MY_GROUP "$SHARED" 2>/dev/null || true
chmod 2770 "$SHARED"

echo ""
echo "Step 3: Verify SGID is set"
ls -ld "$SHARED"
stat -c "Octal: %a  Symbolic: %A" "$SHARED"

echo ""
echo "Step 4: Create files and verify group inheritance"
touch "$SHARED/file_from_user1.csv"
mkdir "$SHARED/subdir_from_user1"
touch "$SHARED/subdir_from_user1/nested_file.csv"

ls -lR "$SHARED/"

echo ""
echo "Step 5: Verify group inheritance"
find "$SHARED" -type f -o -type d | while read f; do
    grp=$(stat -c "%G" "$f")
    perm=$(stat -c "%a" "$f")
    echo "$(basename $f) → group: $grp | perms: $perm"
done

echo ""
echo "Step 6: Check subdirectory also has SGID (inherited on mkdir)"
stat -c "Octal: %a  Symbolic: %A  Name: %n" "$SHARED/subdir_from_user1"

rm -rf "$SHARED"`,
      explanation: "Note that SGID on a directory does NOT automatically propagate to newly created subdirectories — the subdirectory itself needs SGID set if you want the behavior to continue recursively. This is a subtle gotcha: mkdir creates a new dir without SGID, so only files at the top level inherit the group automatically. For deep shared directory trees, add SGID to subdirectories as they're created, or use a find -exec approach after creation."
    },
    {
      id: "perm-ex5",
      difficulty: "Hard",
      title: "Production Permission Audit Script",
      description: "Write a complete permission auditor that scans a project directory, identifies security problems (world-writable files, SUID binaries, exposed credentials), generates a report, and applies fixes automatically.",
      starterCode: `#!/bin/bash
# ╔═══════════════════════════════════════════════════════════╗
# ║  PRODUCTION PERMISSION AUDITOR                            ║
# ║  Scans project directory for:                             ║
# ║  1. World-writable files (perm & 002 != 0)               ║
# ║  2. Files with no owner permissions (perm & 400 == 0)    ║
# ║  3. Likely credential files with wrong permissions        ║
# ║  4. SUID/SGID files (unexpected)                         ║
# ║  5. Directories missing execute (untraversable)          ║
# ║  Outputs: report + optional auto-fix                     ║
# ╚═══════════════════════════════════════════════════════════╝

set -euo pipefail

SCAN_DIR="\${1:- /tmp/audit_test_$$}"
REPORT = "/tmp/perm_audit_report_$$.txt"
ISSUES = 0

# ── Create test environment with problems ─────────────────
setup_test_env() {
  mkdir - p "$SCAN_DIR" / { scripts, config, credentials, data, logs }
    echo '#!/bin/bash' > "$SCAN_DIR/scripts/etl.sh"
    echo 'select * from users' > "$SCAN_DIR/scripts/query.sql"
    echo 'spark.master=yarn' > "$SCAN_DIR/config/app.conf"
    echo 'DB_PASSWORD=SuperSecret123' > "$SCAN_DIR/credentials/db.env"
    echo 'API_KEY=sk-abcd1234' > "$SCAN_DIR/credentials/api.key"
    echo 'id,name,salary' > "$SCAN_DIR/data/employees.csv"
    echo 'ERROR: connection failed' > "$SCAN_DIR/logs/app.log"

    # Plant permission problems:
    chmod 777 "$SCAN_DIR/scripts/etl.sh"        # world - writable script!
    chmod 666 "$SCAN_DIR/credentials/db.env"    # world - readable credential!
    chmod 644 "$SCAN_DIR/credentials/api.key"   # group - readable API key!
    chmod 777 "$SCAN_DIR/data/"                 # world - writable data dir!
    chmod 000 "$SCAN_DIR/logs/"                 # totally broken!
}

# ── Audit functions ────────────────────────────────────────
check_world_writable() {
    echo "=== WORLD-WRITABLE FILES ===" >> "$REPORT"
    ???  # find world - writable files, append to report
}

check_credential_files() {
    echo "=== CREDENTIAL FILE EXPOSURE ===" >> "$REPORT"
    # Check files that look like credentials(*.env, *.key, *.pem, * password *, * secret *)
    ???
}

check_broken_dirs() {
    echo "=== BROKEN DIRECTORY PERMISSIONS ===" >> "$REPORT"
    # Find directories where owner lacks execute
    ???
}

apply_fixes() {
    echo ""
    echo "Applying automatic fixes..."
    # Fix world - writable files(remove world write)
    find "$SCAN_DIR" - type f - perm -002 - exec chmod o - w { } \;
    # Fix credentials to 600
    find "$SCAN_DIR" - type f \(-name "*.env" - o - name "*.key" - o - name "*.pem" \) \
  -exec chmod 600 { } \;
    # Fix broken directories(add owner execute)
    find "$SCAN_DIR" - type d - not - perm - 100 - exec chmod u + x { } \;
    echo "Fixes applied."
}

# ── Main ──────────────────────────────────────────────────
setup_test_env
echo "Scanning: $SCAN_DIR" | tee "$REPORT"
echo "Date: $(date)" >> "$REPORT"
echo "" >> "$REPORT"

check_world_writable
check_credential_files
check_broken_dirs

echo ""
cat "$REPORT"
echo ""
echo "Issues found: $ISSUES"

read - p "Apply automatic fixes? [y/N] " - n 1 - r
echo
if [[$REPLY = ~ ^ [Yy]$]]; then
apply_fixes
    echo ""
    echo "=== AFTER FIXES ==="
    find "$SCAN_DIR" - type f | xargs stat - c "%a %n" | sort
fi

rm - rf "$SCAN_DIR" "$REPORT"`,
    solution: `#!/bin/bash
set - euo pipefail

SCAN_DIR = "\${1:-/tmp/audit_test_$$}"
REPORT = "/tmp/perm_audit_report_$$.txt"
ISSUES = 0

setup_test_env() {
  mkdir - p "$SCAN_DIR" / { scripts, config, credentials, data, logs }
    echo '#!/bin/bash' > "$SCAN_DIR/scripts/etl.sh"
    echo 'select * from users' > "$SCAN_DIR/scripts/query.sql"
    echo 'spark.master=yarn' > "$SCAN_DIR/config/app.conf"
    echo 'DB_PASSWORD=SuperSecret123' > "$SCAN_DIR/credentials/db.env"
    echo 'API_KEY=sk-abcd1234' > "$SCAN_DIR/credentials/api.key"
    echo 'id,name,salary' > "$SCAN_DIR/data/employees.csv"
    echo 'ERROR: connection failed' > "$SCAN_DIR/logs/app.log"

    chmod 777 "$SCAN_DIR/scripts/etl.sh"
    chmod 666 "$SCAN_DIR/credentials/db.env"
    chmod 644 "$SCAN_DIR/credentials/api.key"
    chmod 777 "$SCAN_DIR/data/"
    chmod 000 "$SCAN_DIR/logs/"
}

check_world_writable() {
    echo "=== WORLD-WRITABLE FILES ===" >> "$REPORT"
    local found
  found = $(find "$SCAN_DIR" - type f - perm -002 2 > /dev/null)
  if [-n "$found"]; then
        echo "$found" | while read f; do
            echo "  ⚠️  WORLD-WRITABLE: $(stat -c '%a' "$f") $f" >> "$REPORT"
  ISSUES = $((ISSUES + 1))
  done
    else
        echo "  ✅ No world-writable files found" >> "$REPORT"
  fi
    echo "" >> "$REPORT"
}

check_credential_files() {
    echo "=== CREDENTIAL FILE EXPOSURE ===" >> "$REPORT"
    find "$SCAN_DIR" - type f \(-name "*.env" - o - name "*.key" - o - name "*.pem" \
  -o - name "*password*" - o - name "*secret*" - o - name "*credential*" \) 2 > /dev/null \
    | while read f; do
    perm = $(stat - c "%a" "$f")
        if ["$perm" - gt 600]; then
            echo "  ⚠️  EXPOSED CREDENTIAL: $perm $f (should be 600)" >> "$REPORT"
  ISSUES = $((ISSUES + 1))
        else
            echo "  ✅ OK: $perm $f" >> "$REPORT"
  fi
  done
    echo "" >> "$REPORT"
}

check_broken_dirs() {
    echo "=== BROKEN DIRECTORY PERMISSIONS ===" >> "$REPORT"
    find "$SCAN_DIR" - type d - not - perm - 100 2 > /dev/null | while read d; do
        echo "  ⚠️  UNTRAVERSABLE DIR: $(stat -c '%a' "$d") $d" >> "$REPORT"
  ISSUES = $((ISSUES + 1))
  done
    echo "" >> "$REPORT"
}

apply_fixes() {
    echo ""
    echo "Applying automatic fixes..."
    find "$SCAN_DIR" - type f - perm -002 - exec chmod o - w { } \;
    find "$SCAN_DIR" - type f \(-name "*.env" - o - name "*.key" - o - name "*.pem" \) \
  -exec chmod 600 { } \;
    find "$SCAN_DIR" - type d - not - perm - 100 - exec chmod u + x { } \;
    echo "Fixes applied."
}

setup_test_env
echo "Scanning: $SCAN_DIR" | tee "$REPORT"
echo "Date: $(date)" >> "$REPORT"
echo "" >> "$REPORT"

check_world_writable
check_credential_files
check_broken_dirs

echo ""
cat "$REPORT"
echo ""
echo "Issues found: $ISSUES"

read - p "Apply automatic fixes? [y/N] " - n 1 - r
echo
if [[$REPLY = ~ ^ [Yy]$]]; then
apply_fixes
    echo ""
    echo "=== AFTER FIXES ==="
    find "$SCAN_DIR" - type f | xargs stat - c "%a %n" 2 > /dev/null | sort
fi

rm - rf "$SCAN_DIR" "$REPORT"`,
    explanation: "find -perm -002 uses the minus sign to mean 'AT LEAST these bits set' — specifically checking if the world-write bit is set regardless of other bits. Comparing stat's octal output as an integer ($perm -gt 600) works because 601, 640, 644, 777 are all numerically greater than 600, making the check fast and readable. This audit + fix pattern is deployed in CI/CD pipelines to catch permission regressions before code reaches production."
  }
],

// ════════════════════════════════════════════════════════════
// SUMMARY
// ════════════════════════════════════════════════════════════
summary: `
  < div style = "background:#0d1117;border:1px solid #30363d;border-radius:10px;padding:20px;" >
  <h3 style="color:#bc8cff;margin-top:0;">📚 chmod, chown & chgrp — The Complete Reference</h3>

  <div class="cards-grid">
    <div class="mini-card">
      <strong style="color:#3fb950;">chmod symbolic</strong>
      <p><code>u/g/o/a</code> + <code>+/-/=</code> + <code>r/w/x</code>. Best for relative changes. <code>u=rwx,g=rx,o=</code> — comma-separate multiple targets.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#58a6ff;">chmod octal</strong>
      <p>r=4 w=2 x=1. Add per target. <strong>644</strong> files, <strong>755</strong> scripts, <strong>750</strong> team scripts, <strong>600</strong> credentials. Never <strong>777</strong> in production.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#d29922;">chown</strong>
      <p><code>chown USER:GROUP file</code> changes both. <code>chown :GROUP</code> changes group only. <code>-R</code> for recursive. Needs sudo to change owner.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#bc8cff;">umask</strong>
      <p>Subtracts from 666 (files) or 777 (dirs). Default <code>0022</code> → 644/755. Set <code>umask 027</code> for team environments. Persist in <code>~/.bashrc</code>.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#f85149;">setUID (4xxx)</strong>
      <p>Process runs as FILE OWNER. <code>/usr/bin/passwd</code> runs as root. Find all: <code>find / -perm -4000</code>. Security audit: unexpected SUID = danger.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#3fb950;">setGID (2xxx)</strong>
      <p>New files inherit directory's group. <code>chmod 2770 /data/shared/</code> — the team collaboration fix. Essential for shared data directories.</p>
    </div>
  </div>

  <div style="background:#0d1117;border:1px solid #58a6ff;border-radius:8px;padding:16px;margin-top:16px;">
    <strong style="color:#58a6ff;">🏆 Ravi's Production Permission Cheatsheet:</strong>
    <div class="terminal-block" style="margin-top:10px;">
      <div class="terminal-header">
        <span class="terminal-dot" style="background:#ff5f56"></span>
        <span class="terminal-dot" style="background:#ffbd2e"></span>
        <span class="terminal-dot" style="background:#27c93f"></span>
      </div>
      <pre style="color:#e6edf3;padding:12px;margin:0;background:#000a00;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.8;"># New deployment — set service account ownership
sudo chown -R etl-runner:data-team /opt/pipeline/
find /opt/pipeline/ -type f -exec chmod 640 {} \;
find /opt/pipeline/ -type d -exec chmod 750 {} \;
chmod 750 /opt/pipeline/scripts/*.sh  # scripts need execute

# Shared team directory (SGID magic)
sudo mkdir /data/team_shared
sudo chown root:data-team /data/team_shared
sudo chmod 2770 /data/team_shared   # SGID + rwxrws---

# Lock down credentials
chmod 600 ~/.ssh/id_rsa ~/.aws/credentials .env
chmod 700 ~/.ssh/

# Quick permission audit
find /opt/ -perm -002 -type f  # world-writable files = bad!</pre>
    </div>
  </div>

  <div style="margin-top:16px;text-align:center;">
    <span style="color:#8b949e;font-size:13px;">Next Module: </span>
    <strong style="color:#bc8cff;">ACL — Access Control Lists ➡️</strong>
  </div>
</div > `

}; // end var permissions