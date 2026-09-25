
var links = {
  title: "Hard & Symbolic Links",
  description: "Master inodes, hard links, and symbolic links — the backbone of how Linux manages files. Used daily in data pipelines, version management, backup systems, and ML workflows.",
  content: `

<!-- ═══════════════════════════════════════════════════════
     RAVI STORY — HOOK
═══════════════════════════════════════════════════════ -->
<div class="story-box">
  <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">🧑‍💻</div>
  
    <div style="flex:1;min-width:220px;">Ravi's Pipeline Crisis — Day 58</div>
    <br>
    <p>It was 11 PM. Ravi's Spark job had been running for 6 hours when it suddenly crashed: <code>FileNotFoundError: /data/current/sales_q4.parquet</code>. His manager's script expected the data at <code>/data/current/</code>, but the data team stored it at <code>/data/2024_01_15/</code>. A new batch ran daily — every day the path changed.</p>
    <br>
    <p>His senior, Priya, looked at the terminal and typed one command: <code>ln -sfn /data/2024_01_15 /data/current</code>. "Now your script never needs to change," she said. "The symlink is the stable address. The data can move freely behind it."</p>
    <br>
    <p>That night, Ravi understood something fundamental: <strong>in Linux, file <em>names</em> and file <em>data</em> are completely separate things.</strong> A file can have multiple names — or you can name a path that points somewhere else entirely. This module teaches both.</p>
 
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════
     SECTION 1 — INODE: THE FOUNDATION
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> What Is an Inode? The Foundation of Everything</h2>

<p>Before understanding links, you <strong>must</strong> understand inodes. Every concept in this module flows from one key insight:</p>

<div class="info-box">
  <strong>🔑 The Core Rule:</strong> In Linux, a file has <em>two separate parts</em> — its <strong>data</strong> (stored in disk blocks, referenced by an inode) and its <strong>name</strong> (stored in a directory entry). These are NOT the same object. You can have one data + many names (hard links), or a name that points to another name (symlink).
</div>

<!-- INODE ANATOMY SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 860 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:860px;display:block;margin:0 auto;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#4caf50"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#64b5f6"/></marker>
    <marker id="arr-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ef5350"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffb300"/></marker>
    <style>
      .svg-mono { font-family: 'Courier New', monospace; }
      .svg-sans { font-family: 'Segoe UI', sans-serif; }
      @keyframes blink-inode { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
      .inode-pulse { animation: blink-inode 2.5s infinite; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="860" height="400" fill="#0d1117" rx="12"/>

  <!-- === DIRECTORY TABLE (left) === -->
  <rect x="20" y="30" width="220" height="190" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <rect x="20" y="30" width="220" height="32" rx="8" fill="#1f2937"/>
  <rect x="20" y="50" width="220" height="12" fill="#1f2937"/>
  <text x="130" y="51" text-anchor="middle" class="svg-sans" font-size="12" fill="#8b949e">DIRECTORY  /home/ravi/</text>
  <text x="40" y="82" class="svg-mono" font-size="11" fill="#8b949e">NAME           INODE</text>
  <line x1="30" y1="88" x2="230" y2="88" stroke="#30363d" stroke-width="1"/>
  <text x="40" y="107" class="svg-mono" font-size="12" fill="#e6edf3">report.csv</text>
  <text x="190" y="107" class="svg-mono" font-size="12" fill="#58a6ff" text-anchor="middle">4821</text>
  <text x="40" y="127" class="svg-mono" font-size="12" fill="#e6edf3">backup.csv</text>
  <text x="190" y="127" class="svg-mono" font-size="12" fill="#58a6ff" text-anchor="middle">4821</text>
  <text x="40" y="147" class="svg-mono" font-size="12" fill="#ffa657">link.csv</text>
  <text x="190" y="147" class="svg-mono" font-size="12" fill="#ffa657" text-anchor="middle">5900</text>
  <text x="40" y="167" class="svg-mono" font-size="12" fill="#8b949e">notes.txt</text>
  <text x="190" y="167" class="svg-mono" font-size="12" fill="#8b949e" text-anchor="middle">4920</text>
  <text x="40" y="187" class="svg-mono" font-size="12" fill="#8b949e">readme.md</text>
  <text x="190" y="187" class="svg-mono" font-size="12" fill="#8b949e" text-anchor="middle">5010</text>
  <text x="130" y="215" text-anchor="middle" class="svg-sans" font-size="10" fill="#30363d">Each row = one directory entry</text>
  <text x="80" y="90" class="svg-sans" font-size="9" fill="#ef5350">← hard links share same inode</text>

  <!-- === INODE 4821 (center) === -->
  <rect x="305" y="20" width="250" height="270" rx="10" fill="#161b22" stroke="#58a6ff" stroke-width="2"/>
  <rect x="305" y="20" width="250" height="34" rx="10" fill="#1f3a5f"/>
  <rect x="305" y="40" width="250" height="14" fill="#1f3a5f"/>
  <text x="430" y="42" text-anchor="middle" class="svg-sans" font-size="13" font-weight="bold" fill="#58a6ff">INODE  #4821</text>
  <text x="325" y="68" class="svg-mono" font-size="11" fill="#8b949e">type:</text>
  <text x="420" y="68" class="svg-mono" font-size="11" fill="#3fb950">regular file</text>
  <text x="325" y="86" class="svg-mono" font-size="11" fill="#8b949e">permissions:</text>
  <text x="420" y="86" class="svg-mono" font-size="11" fill="#e6edf3">-rw-r--r--</text>
  <text x="325" y="104" class="svg-mono" font-size="11" fill="#8b949e">uid / gid:</text>
  <text x="420" y="104" class="svg-mono" font-size="11" fill="#e6edf3">1000 / 1000</text>
  <text x="325" y="122" class="svg-mono" font-size="11" fill="#8b949e">size:</text>
  <text x="420" y="122" class="svg-mono" font-size="11" fill="#e6edf3">4312 bytes</text>
  <text x="325" y="140" class="svg-mono" font-size="11" fill="#8b949e">blocks:</text>
  <text x="420" y="140" class="svg-mono" font-size="11" fill="#e6edf3">16</text>
  <text x="325" y="158" class="svg-mono" font-size="11" fill="#8b949e">link_count:</text>
  <text x="420" y="158" class="svg-mono" font-size="11" fill="#ef5350" font-weight="bold">2</text>
  <text x="325" y="176" class="svg-mono" font-size="11" fill="#8b949e">atime:</text>
  <text x="420" y="176" class="svg-mono" font-size="11" fill="#8b949e">2024-01-15</text>
  <text x="325" y="194" class="svg-mono" font-size="11" fill="#8b949e">mtime:</text>
  <text x="420" y="194" class="svg-mono" font-size="11" fill="#8b949e">2024-01-14</text>
  <text x="325" y="212" class="svg-mono" font-size="11" fill="#8b949e">ctime:</text>
  <text x="420" y="212" class="svg-mono" font-size="11" fill="#8b949e">2024-01-14</text>
  <text x="325" y="230" class="svg-mono" font-size="11" fill="#8b949e">data_ptrs:</text>
  <text x="420" y="230" class="svg-mono" font-size="11" fill="#ffa657">→ blocks</text>
  <text x="430" y="270" text-anchor="middle" class="svg-sans" font-size="10" fill="#30363d">← filename NOT stored here!</text>

  <!-- === SYMLINK INODE 5900 === -->
  <rect x="305" y="310" width="250" height="80" rx="8" fill="#161b22" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3"/>
  <rect x="305" y="310" width="250" height="28" rx="8" fill="#2d1f00"/>
  <rect x="305" y="326" width="250" height="12" fill="#2d1f00"/>
  <text x="430" y="328" text-anchor="middle" class="svg-sans" font-size="12" fill="#ffa657">SYMLINK INODE  #5900</text>
  <text x="325" y="352" class="svg-mono" font-size="11" fill="#8b949e">type:</text>
  <text x="390" y="352" class="svg-mono" font-size="11" fill="#ffa657">symlink</text>
  <text x="325" y="370" class="svg-mono" font-size="11" fill="#8b949e">content:</text>
  <text x="390" y="370" class="svg-mono" font-size="11" fill="#ffa657">"report.csv"</text>

  <!-- === DATA BLOCKS (right) === -->
  <rect x="620" y="60" width="210" height="200" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <rect x="620" y="60" width="210" height="30" rx="8" fill="#0f2d1f"/>
  <rect x="620" y="78" width="210" height="12" fill="#0f2d1f"/>
  <text x="725" y="80" text-anchor="middle" class="svg-sans" font-size="12" fill="#3fb950">DISK DATA BLOCKS</text>
  <text x="635" y="108" class="svg-mono" font-size="10" fill="#3fb950">Block 0:</text>
  <text x="700" y="108" class="svg-mono" font-size="10" fill="#8b949e">date,sales,region</text>
  <text x="635" y="124" class="svg-mono" font-size="10" fill="#3fb950">Block 1:</text>
  <text x="700" y="124" class="svg-mono" font-size="10" fill="#8b949e">2024-01-01,5421,N</text>
  <text x="635" y="140" class="svg-mono" font-size="10" fill="#3fb950">Block 2:</text>
  <text x="700" y="140" class="svg-mono" font-size="10" fill="#8b949e">2024-01-02,4832,S</text>
  <text x="635" y="156" class="svg-mono" font-size="10" fill="#3fb950">Block 3:</text>
  <text x="700" y="156" class="svg-mono" font-size="10" fill="#8b949e">...</text>
  <rect x="635" y="165" width="180" height="6" rx="3" fill="#1c3a28"/>
  <rect x="635" y="175" width="160" height="6" rx="3" fill="#1c3a28"/>
  <rect x="635" y="185" width="170" height="6" rx="3" fill="#1c3a28"/>
  <rect x="635" y="195" width="140" height="6" rx="3" fill="#1c3a28"/>
  <rect x="635" y="205" width="180" height="6" rx="3" fill="#1c3a28"/>
  <rect x="635" y="215" width="150" height="6" rx="3" fill="#1c3a28"/>
  <text x="725" y="250" text-anchor="middle" class="svg-sans" font-size="10" fill="#3fb950">4312 bytes of CSV data</text>

  <!-- === ARROWS === -->
  <!-- report.csv → inode 4821 -->
  <line x1="240" y1="103" x2="300" y2="120" stroke="#ef5350" stroke-width="1.5" marker-end="url(#arr-r)"/>
  <!-- backup.csv → inode 4821 -->
  <line x1="240" y1="124" x2="300" y2="140" stroke="#ef5350" stroke-width="1.5" marker-end="url(#arr-r)"/>
  <!-- inode 4821 → data blocks -->
  <line x1="555" y1="140" x2="615" y2="155" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
  <!-- symlink → report.csv (resolve) -->
  <line x1="240" y1="147" x2="240" y2="330" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#arr-y)"/>
  <line x1="305" y1="352" x2="255" y2="352" stroke="#ffa657" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="242" y="248" class="svg-sans" font-size="9" fill="#ffa657" transform="rotate(90,242,248)">follows path</text>

  <!-- Labels -->
  <text x="130" y="12" text-anchor="middle" class="svg-sans" font-size="11" font-weight="bold" fill="#ef5350">Directory Entries (names)</text>
  <text x="430" y="12" text-anchor="middle" class="svg-sans" font-size="11" font-weight="bold" fill="#58a6ff">Inode Table (metadata)</text>
  <text x="725" y="50" text-anchor="middle" class="svg-sans" font-size="11" font-weight="bold" fill="#3fb950">Disk Data Blocks</text>
</svg>
<p class="diagram-caption">Hard links (report.csv &amp; backup.csv) both map to inode #4821. The symlink (link.csv) is inode #5900 whose <em>content</em> is the string "report.csv" — the kernel does a second lookup at runtime.</p>
</div>

<!-- WHAT STAT SHOWS -->
<h3>Reading an Inode with <code>stat</code></h3>
<div class="terminal-block">
<div class="terminal-header"><div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div><span class="dot y"></span><span class="dot g"></span></span><span class="terminal-title">stat — read every inode field</span></div>
<div class="terminal-body"><pre>
<span class="prompt">$</span> <span class="highlight">stat</span> report.csv
  File: report.csv
  Size: 4312            Blocks: 16         IO Block: 4096   regular file
Device: 8,1             Inode: <span class="highlight">4821</span>        Links: <span class="highlight">2</span>
Access: (<span class="highlight">0644/-rw-r--r--</span>)  Uid: (1000/ravi)   Gid: (1000/ravi)
Access: 2024-01-15 10:32:01.000000000 +0530   <span class="comment"># last READ time</span>
Modify: 2024-01-14 18:45:22.000000000 +0530   <span class="comment"># last DATA change</span>
Change: 2024-01-14 18:45:22.000000000 +0530   <span class="comment"># last METADATA change (perms/owner)</span>
 Birth: 2024-01-10 09:00:00.000000000 +0530   <span class="comment"># file creation time (ext4+)</span>

<span class="comment"># KEY FIELDS EXPLAINED:
# Inode: 4821       — unique ID on this filesystem
# Links: 2          — two directory entries point here (hard links)
# Size: 4312        — bytes of actual data
# Blocks: 16        — 512-byte disk sectors used (16 × 512 = 8192, allocated &gt; actual)
# IO Block: 4096    — optimal transfer size (filesystem block size)
# 0644              — octal permissions

# Compare the symlink — its inode is DIFFERENT:</span>
<span class="prompt">$</span> <span class="highlight">stat</span> link.csv
  File: link.csv -&gt; report.csv
  Size: 10            Blocks: 0          IO Block: 4096   symbolic link
Device: 8,1           Inode: <span class="highlight">5900</span>        Links: 1
<span class="comment"># Size=10 = len("report.csv") — the PATH STRING, not data size
# Blocks=0 — "fast symlink": path stored in inode itself, no data block needed</span>

<span class="prompt">$</span> <span class="highlight">stat</span> <span class="highlight">-L</span> link.csv         <span class="comment"># -L: stat the TARGET, not the link</span>
  File: link.csv
  Size: 4312            Inode: <span class="highlight">4821</span>       <span class="comment"># ← same inode as report.csv!</span>
</pre></div></div>

<!-- ls -lai -->
<h3>Seeing Inode Numbers with <code>ls -lai</code></h3>
<div class="terminal-block">
<div class="terminal-header"><div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div><span class="dot y"></span><span class="dot g"></span></span><span class="terminal-title">ls -lai — the most revealing combination</span></div>
<div class="terminal-body"><pre>
<span class="prompt">$</span> <span class="highlight">ls</span> <span class="highlight">-lai</span> /home/ravi/
<span class="comment">#  INODE        PERMS        LINKS USER  GROUP   SIZE NAME</span>
    <span class="highlight">4821</span>  -rw-r--r--    <span class="highlight">2</span>   ravi  ravi    4312  backup.csv   <span class="comment">← same inode as report.csv</span>
    <span class="highlight">4920</span>  -rw-r--r--    1   ravi  ravi     256  notes.txt
    <span class="highlight">4821</span>  -rw-r--r--    <span class="highlight">2</span>   ravi  ravi    4312  report.csv   <span class="comment">← inode 4821, link_count=2</span>
    <span class="highlight">5900</span>  lrwxrwxrwx    1   ravi  ravi      10  link.csv -&gt; report.csv
    <span class="comment">#   ↑ different inode, 'l' prefix, size = path length, always 777</span>

<span class="comment"># READING THE OUTPUT:
# Column 1 (INODE): unique file ID — matching numbers = same file
# Column 3 (LINKS): hard link count — 2 means two names for one inode
# 'l' in permissions = symbolic link
# Symlink perms always show lrwxrwxrwx — actual access controlled by TARGET</span>
</pre></div></div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 2 — THE ANALOGIES
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> Analogies — Before You Touch the Terminal</h2>

<div class="analogy-container">
  <div class="analogy-col hard-col">
    <div class="analogy-emoji">📚</div>
    <h3 style="color:#ef5350;">Hard Link = Book in Two Libraries</h3>
    <p>One physical book sits in a warehouse. <strong>Library A</strong> and <strong>Library B</strong> both have a catalogue card pointing to it. The book is not duplicated — there is one copy, two catalogue entries.</p>
    <p>If Library A's card is torn up (file deleted), the book still exists. Library B's card still works. Only when <em>every</em> catalogue card is destroyed does the warehouse discard the book.</p>
    <p><strong>In Linux:</strong> The inode is the book. The directory entries (filenames) are the catalogue cards. Hard link count = number of catalogue cards.</p>
  </div>
  <div class="analogy-col sym-col">
    <div class="analogy-emoji">🗺️</div>
    <h3 style="color:#64b5f6;">Symlink = Signpost on a Road</h3>
    <p>A signpost says "Hospital → 3 km north." The signpost is <em>not</em> the hospital. It's a separate object with directions written on it.</p>
    <p>If the hospital moves, the signpost points to the wrong place — <strong>dangling symlink</strong>. If someone steals the sign, the hospital still exists — deleting a symlink never deletes the target.</p>
    <p><strong>In Linux:</strong> The symlink is the signpost. Its "content" is the path string. The OS re-reads the directions every time you use it.</p>
  </div>
</div>

<!-- Real estate analogy -->
<div class="tip-box" style="margin-top:20px;">
  <strong>🏠 Real Estate Analogy (for absolute clarity):</strong>
  <table style="width:100%;margin-top:10px;font-size:13px;border-collapse:collapse;">
    <tr>
      <td style="padding:8px;width:30%;color:#8b949e;font-family:monospace;">Hard Link</td>
      <td style="padding:8px;color:#e6edf3;">Two families <em>jointly own</em> one flat. Both have equal rights. The flat is demolished only when both families give up ownership.</td>
    </tr>
    <tr style="border-top:1px solid #30363d;">
      <td style="padding:8px;color:#8b949e;font-family:monospace;">Symbolic Link</td>
      <td style="padding:8px;color:#e6edf3;">A forwarding address card: "I've moved to 42 Green Park." If you move again, old cards become wrong. The card has its own existence — throw it away and your new home is fine.</td>
    </tr>
    <tr style="border-top:1px solid #30363d;">
      <td style="padding:8px;color:#8b949e;font-family:monospace;">Regular File</td>
      <td style="padding:8px;color:#e6edf3;">One family, one flat, one ownership deed. Delete the deed (name) → flat demolished.</td>
    </tr>
  </table>
</div>

<!-- Second Visual — Book / Signpost SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:800px;display:block;margin:20px auto;">
  <rect width="800" height="260" fill="#0d1117" rx="10"/>

  <!-- HARD LINK SIDE -->
  <text x="190" y="28" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#ef5350">Hard Links</text>

  <!-- Library cards -->
  <rect x="20" y="45" width="130" height="50" rx="6" fill="#1f2937" stroke="#ef5350" stroke-width="1.5"/>
  <text x="85" y="66" text-anchor="middle" font-family="monospace" font-size="12" fill="#ef5350">report.csv</text>
  <text x="85" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">dir entry</text>

  <rect x="20" y="115" width="130" height="50" rx="6" fill="#1f2937" stroke="#ef5350" stroke-width="1.5"/>
  <text x="85" y="136" text-anchor="middle" font-family="monospace" font-size="12" fill="#ef5350">backup.csv</text>
  <text x="85" y="154" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">dir entry</text>

  <!-- Central inode -->
  <ellipse cx="250" cy="120" rx="60" ry="45" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="250" y="112" text-anchor="middle" font-family="monospace" font-size="12" fill="#3fb950">inode</text>
  <text x="250" y="128" text-anchor="middle" font-family="monospace" font-size="12" fill="#3fb950">#4821</text>
  <text x="250" y="144" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">4312 bytes</text>

  <!-- Data blocks -->
  <rect x="340" y="85" width="90" height="70" rx="6" fill="#0f2d1f" stroke="#3fb950" stroke-width="1"/>
  <text x="385" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">disk</text>
  <text x="385" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">blocks</text>
  <text x="385" y="146" text-anchor="middle" font-family="monospace" font-size="10" fill="#3fb950">data ✓</text>

  <!-- Arrows hard link -->
  <line x1="150" y1="70" x2="192" y2="102" stroke="#ef5350" stroke-width="1.5" marker-end="url(#arr-r)"/>
  <line x1="150" y1="140" x2="192" y2="128" stroke="#ef5350" stroke-width="1.5" marker-end="url(#arr-r)"/>
  <line x1="310" y1="120" x2="340" y2="120" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>

  <!-- SYMLINK SIDE -->
  <line x1="480" y1="20" x2="480" y2="245" stroke="#30363d" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="625" y="28" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="14" font-weight="bold" fill="#64b5f6">Symbolic Link</text>

  <!-- Symlink box -->
  <rect x="490" y="45" width="140" height="60" rx="6" fill="#1f2937" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="560" y="68" text-anchor="middle" font-family="monospace" font-size="12" fill="#ffa657">link.csv</text>
  <text x="560" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">inode #5900</text>
  <text x="560" y="98" text-anchor="middle" font-family="monospace" font-size="10" fill="#ffa657">"report.csv"</text>

  <!-- Target file -->
  <rect x="490" y="155" width="140" height="50" rx="6" fill="#1f2937" stroke="#ef5350" stroke-width="1.5"/>
  <text x="560" y="178" text-anchor="middle" font-family="monospace" font-size="12" fill="#ef5350">report.csv</text>
  <text x="560" y="196" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">inode #4821</text>

  <!-- Symlink arrow -->
  <line x1="560" y1="105" x2="560" y2="152" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-y)"/>
  <text x="575" y="133" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">path lookup</text>

  <!-- Kernel resolves to data -->
  <rect x="660" y="155" width="120" height="50" rx="6" fill="#0f2d1f" stroke="#3fb950" stroke-width="1"/>
  <text x="720" y="178" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">disk data</text>
  <text x="720" y="196" text-anchor="middle" font-family="monospace" font-size="10" fill="#3fb950">4312 bytes</text>
  <line x1="630" y1="180" x2="658" y2="180" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>
</svg>
</div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 3 — ln COMMAND (HARD LINKS)
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> Hard Links — <code>ln</code> Command Deep Dive</h2>

<div class="info-box">
  <strong>Syntax:</strong> <code>ln [OPTIONS] TARGET LINK_NAME</code><br>
  Without <code>-s</code>, <code>ln</code> always creates a hard link. Both TARGET and LINK_NAME must be on the <strong>same filesystem</strong>.
</div>

<!-- CONSOLE 1: Hard Links -->
<div class="terminal-block">
<div class="terminal-header"><div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div><span class="dot y"></span><span class="dot g"></span></span><span class="terminal-title">Console 1 of 5 — ln (Hard Links): All Patterns</span></div>
<div class="terminal-body"><pre>
<span class="comment">## ─── BASIC HARD LINK ──────────────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> report.csv backup.csv
<span class="comment"># Creates backup.csv pointing to the SAME inode as report.csv
# No output on success (use -v for confirmation)</span>

<span class="prompt">$</span> <span class="highlight">ls</span> <span class="highlight">-li</span> report.csv backup.csv
<span class="highlight">4821</span> -rw-r--r-- <span class="highlight">2</span> ravi ravi 4312 backup.csv
<span class="highlight">4821</span> -rw-r--r-- <span class="highlight">2</span> ravi ravi 4312 report.csv
<span class="comment"># Proof: identical inode (4821), link count = 2</span>

<span class="comment">## ─── VERBOSE OUTPUT ────────────────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-v</span> report.csv archive.csv
<span class="output">'archive.csv' =&gt; 'report.csv'</span>
<span class="comment"># -v: shows what was created (= means hard link)</span>

<span class="comment">## ─── LINK INTO A DIFFERENT DIRECTORY ──────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> report.csv /home/ravi/backups/
<span class="comment"># Links into backups/ using SAME filename (report.csv)
# Equivalent: ln report.csv /home/ravi/backups/report.csv</span>

<span class="prompt">$</span> <span class="highlight">ls</span> <span class="highlight">-li</span> report.csv /home/ravi/backups/report.csv
<span class="highlight">4821</span> -rw-r--r-- <span class="highlight">3</span> ravi ravi 4312 /home/ravi/backups/report.csv
<span class="highlight">4821</span> -rw-r--r-- <span class="highlight">3</span> ravi ravi 4312 report.csv
<span class="comment"># Link count is now 3</span>

<span class="comment">## ─── LINK COUNT BEHAVIOUR ──────────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">stat</span> <span class="highlight">--format="%h links to inode %i"</span> report.csv
<span class="output">3 links to inode 4821</span>

<span class="prompt">$</span> <span class="highlight">rm</span> backup.csv
<span class="prompt">$</span> <span class="highlight">stat</span> <span class="highlight">--format="%h"</span> report.csv
<span class="output">2</span>
<span class="comment"># Link count decreased. Data still alive.</span>

<span class="prompt">$</span> <span class="highlight">rm</span> archive.csv
<span class="prompt">$</span> <span class="highlight">stat</span> <span class="highlight">--format="%h"</span> report.csv
<span class="output">1</span>

<span class="comment">## ─── EDITING THROUGH ANY HARD LINK ────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> report.csv copy.csv
<span class="prompt">$</span> <span class="highlight">echo</span> "2024-01-16,9900,W" &gt;&gt; copy.csv   <span class="comment"># append via copy.csv</span>
<span class="prompt">$</span> <span class="highlight">tail</span> <span class="highlight">-1</span> report.csv
<span class="output">2024-01-16,9900,W</span>
<span class="comment"># report.csv sees the change — they ARE the same file</span>

<span class="comment">## ─── BACKUP BEFORE LINKING (-b) ────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-b</span> report.csv existing_file.csv
<span class="comment"># Renames existing_file.csv → existing_file.csv~ then creates link</span>

<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-bS</span> .bak report.csv existing_file.csv
<span class="comment"># -S .bak: use .bak as backup suffix instead of ~</span>

<span class="comment">## ─── MULTIPLE TARGETS INTO ONE DIR (-t) ────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-t</span> /data/backup/ sales.csv returns.csv inventory.csv
<span class="comment"># Creates 3 hard links in /data/backup/ for all 3 files</span>
<span class="comment"># Equivalent to running ln 3 times</span>

<span class="comment">## ─── WHAT HARD LINKS CANNOT DO ─────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> /home/ravi/ hardlink_to_dir      <span class="comment"># try linking a DIRECTORY</span>
<span class="output">ln: /home/ravi/: hard link not allowed for directory</span>
<span class="comment"># Directories cannot be hard-linked (would create loops in fs tree)</span>

<span class="prompt">$</span> <span class="highlight">ln</span> /mnt/usb/file.csv /home/ravi/link.csv   <span class="comment"># cross filesystem</span>
<span class="output">ln: failed to create hard link '/home/ravi/link.csv' =&gt; '/mnt/usb/file.csv': Invalid cross-device link</span>
<span class="comment"># EXDEV error — inodes are filesystem-local, can't share across</span>
</pre></div></div>

<!-- Hard Link internals box -->
<div class="deep-dive-box">
<h4>⚙️ Kernel Internals — What <code>ln</code> Actually Does</h4>
<pre style="margin:0;padding:14px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# ln(1) calls the link(2) system call:
#   int link(const char *oldpath, const char *newpath);
#
# Kernel steps:
#   1. Resolve oldpath → find inode #4821
#   2. Check: caller has write permission on parent dir of newpath
#   3. Check: oldpath inode is NOT a directory (EPERM if it is)
#   4. Check: both paths are on same device (EXDEV if not)
#   5. Create new directory entry: {name:"backup.csv", inode:4821}
#   6. Increment inode.i_nlink (link count) by 1
#   7. Update inode ctime (metadata change time)
#   8. Return 0 on success
#
# rm(1) calls the unlink(2) system call:
#   int unlink(const char *pathname);
#
# Kernel steps for unlink:
#   1. Remove the directory entry
#   2. Decrement inode.i_nlink
#   3. If i_nlink == 0 AND no open file descriptors:
#      → call iput() → free inode → free data blocks
#   4. If i_nlink == 0 BUT file is still open by a process:
#      → data survives until last fd is closed (unlinked but not freed)
#      → THIS is how mktemp/tmpfile works — create, unlink, keep fd!
</pre>
</div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 4 — SYMBOLIC LINKS
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> Symbolic Links — <code>ln -s</code> Deep Dive</h2>

<div class="info-box">
  <strong>Syntax:</strong> <code>ln -s TARGET LINK_NAME</code><br>
  <strong>TARGET</strong> = what the link points to (doesn't need to exist yet!)<br>
  <strong>LINK_NAME</strong> = the name of the symlink file being created<br>
  <em>Common mistake: reversing the order!</em>
</div>

<!-- CONSOLE 2: Symbolic Links -->
<div class="terminal-block">
<div class="terminal-header"><div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div><span class="dot y"></span><span class="dot g"></span></span><span class="terminal-title">Console 2 of 5 — ln -s (Symbolic Links): Every Pattern</span></div>
<div class="terminal-body"><pre>
<span class="comment">## ─── BASIC SYMLINK ────────────────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> report.csv link.csv
<span class="comment"># Creates link.csv → report.csv (relative path)</span>

<span class="prompt">$</span> <span class="highlight">ls</span> <span class="highlight">-la</span> link.csv
<span class="output">lrwxrwxrwx 1 ravi ravi 10 Jan 15 10:00 link.csv -&gt; report.csv</span>
<span class="comment"># 'l' = symlink, size=10 = len("report.csv"), perms always 777</span>

<span class="comment">## ─── ABSOLUTE PATH SYMLINK ────────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> /home/ravi/data/report.csv /tmp/report_link.csv
<span class="comment"># Absolute path — works from ANYWHERE on system
# ⚠ Breaks if the filesystem is moved or mounted elsewhere</span>

<span class="comment">## ─── RELATIVE PATH SYMLINK (preferred for portability) ────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> ../data/report.csv /home/ravi/project/link.csv
<span class="comment"># Path resolved relative to link's LOCATION, not current dir
# If you move the whole project folder, relative links survive</span>

<span class="comment">## ─── AUTOMATIC RELATIVE SYMLINK (-r GNU extension) ────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sr</span> /home/ravi/data/report.csv /home/ravi/project/link.csv
<span class="comment"># -r: compute relative path automatically</span>
<span class="prompt">$</span> <span class="highlight">readlink</span> /home/ravi/project/link.csv
<span class="output">../data/report.csv</span>

<span class="comment">## ─── SYMLINK TO A DIRECTORY ───────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> /opt/python-3.11.7/ /usr/local/python
<span class="prompt">$</span> <span class="highlight">ls</span> /usr/local/python/bin/
<span class="output">python3  pip3  idle3  2to3</span>
<span class="comment"># Directory symlink works like the directory itself</span>

<span class="comment">## ─── FORCE OVERWRITE EXISTING SYMLINK (-f) ────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sf</span> /opt/python-3.12.0/ /usr/local/python
<span class="comment"># -f: remove existing symlink, create new one
# Atomic version swap — no window where link is broken</span>

<span class="comment">## ─── UPDATE DIRECTORY SYMLINK CORRECTLY (-sfn) ────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sfn</span> /data/2024_01_16 /data/current
<span class="comment"># -n: treat /data/current as a regular file (not as a dir)
# Without -n: ln -sf would create a link INSIDE current/ instead
# -sfn is the CORRECT way to update directory symlinks</span>

<span class="comment">## ─── INTERACTIVE MODE (-i) ────────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-si</span> target.csv existing_link.csv
<span class="output">ln: replace 'existing_link.csv'? y</span>

<span class="comment">## ─── VERBOSE (-v) ─────────────────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sv</span> /opt/models/bert_v2/ /ml/model_prod
<span class="output">'/ml/model_prod' -&gt; '/opt/models/bert_v2/'</span>
<span class="comment"># -> means symlink (vs = for hard link)</span>

<span class="comment">## ─── CREATING SYMLINK CHAIN ───────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> report.csv step1.csv
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> step1.csv step2.csv
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> step2.csv step3.csv
<span class="prompt">$</span> <span class="highlight">cat</span> step3.csv     <span class="comment"># kernel follows: step3→step2→step1→report.csv</span>
<span class="output">date,sales,region ...</span>
<span class="comment"># Works! Kernel follows up to MAXSYMLINKS=40 hops</span>

<span class="comment">## ─── CREATING DANGLING SYMLINK (target doesn't exist yet) ─────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> /tmp/future_file.txt placeholder.txt
<span class="comment"># Target doesn't exist — kernel doesn't check at creation time!
# Useful for circular dependencies (A→B, B→A setup)</span>
<span class="prompt">$</span> <span class="highlight">cat</span> placeholder.txt
<span class="output">cat: placeholder.txt: No such file or directory</span>
<span class="comment"># Access fails until target is created</span>

<span class="comment">## ─── COMMON MISTAKE: REVERSED ARGUMENTS ───────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> my_link.csv report.csv    <span class="comment"># WRONG! reversed!</span>
<span class="comment"># Creates: report.csv → my_link.csv (my_link.csv doesn't exist)
# Rule: ln -s WHAT_IT_POINTS_TO NAME_OF_THE_LINK</span>

<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> report.csv my_link.csv    <span class="comment"># CORRECT</span>
</pre></div></div>

<!-- Symlink Resolution Diagram SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:20px auto;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Kernel VFS Path Resolution for /home/ravi/link.csv</text>

  <!-- Steps -->
  <!-- Step 1 -->
  <rect x="15" y="40" width="110" height="60" rx="6" fill="#1f2937" stroke="#30363d" stroke-width="1"/>
  <text x="70" y="64" text-anchor="middle" font-family="monospace" font-size="10" fill="#58a6ff">lookup</text>
  <text x="70" y="78" text-anchor="middle" font-family="monospace" font-size="10" fill="#e6edf3">/home</text>
  <text x="70" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">→ inode dir</text>
  <text x="70" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">1</text>

  <line x1="125" y1="70" x2="145" y2="70" stroke="#30363d" stroke-width="1.5" marker-end="url(#arr-g)"/>

  <!-- Step 2 -->
  <rect x="148" y="40" width="110" height="60" rx="6" fill="#1f2937" stroke="#30363d" stroke-width="1"/>
  <text x="203" y="64" text-anchor="middle" font-family="monospace" font-size="10" fill="#58a6ff">lookup</text>
  <text x="203" y="78" text-anchor="middle" font-family="monospace" font-size="10" fill="#e6edf3">ravi</text>
  <text x="203" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">→ inode dir</text>

  <line x1="258" y1="70" x2="278" y2="70" stroke="#30363d" stroke-width="1.5" marker-end="url(#arr-g)"/>

  <!-- Step 3 -->
  <rect x="281" y="40" width="130" height="60" rx="6" fill="#1f2937" stroke="#ffa657" stroke-width="1.5"/>
  <text x="346" y="64" text-anchor="middle" font-family="monospace" font-size="10" fill="#ffa657">lookup</text>
  <text x="346" y="78" text-anchor="middle" font-family="monospace" font-size="10" fill="#ffa657">link.csv</text>
  <text x="346" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">→ S_IFLNK!</text>
  <text x="346" y="120" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">read target string</text>
  <text x="346" y="134" text-anchor="middle" font-family="monospace" font-size="9" fill="#ffa657">"report.csv"</text>
  <text x="346" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">restart walk!</text>

  <line x1="411" y1="70" x2="431" y2="70" stroke="#ffa657" stroke-width="1.5" marker-end="url(#arr-y)"/>

  <!-- Step 4 (restart) -->
  <rect x="434" y="40" width="130" height="60" rx="6" fill="#1f2937" stroke="#3fb950" stroke-width="1.5"/>
  <text x="499" y="64" text-anchor="middle" font-family="monospace" font-size="10" fill="#3fb950">lookup</text>
  <text x="499" y="78" text-anchor="middle" font-family="monospace" font-size="10" fill="#3fb950">report.csv</text>
  <text x="499" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">→ S_IFREG ✓</text>

  <line x1="564" y1="70" x2="584" y2="70" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g)"/>

  <!-- Step 5 -->
  <rect x="587" y="40" width="140" height="60" rx="6" fill="#0f2d1f" stroke="#3fb950" stroke-width="1.5"/>
  <text x="657" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">return inode</text>
  <text x="657" y="80" text-anchor="middle" font-family="monospace" font-size="12" fill="#3fb950">#4821</text>
  <text x="657" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">→ caller gets data</text>

  <!-- Label -->
  <text x="346" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">⚠ Symlink detected — kernel restarts path walk with target</text>
</svg>
<p class="diagram-caption">VFS path walk for a symlink: the kernel finds the <code>S_IFLNK</code> inode, reads the stored path string, and restarts the resolution. This is why symlinks have a small performance cost — an extra lookup.</p>
</div>

<!-- Dangling Symlinks -->
<h3>Detecting and Cleaning Dangling Symlinks</h3>
<div class="terminal-block">
<div class="terminal-header"><div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div><span class="dot y"></span><span class="dot g"></span></span><span class="terminal-title">Dangling symlink detection &amp; cleanup</span></div>
<div class="terminal-body"><pre>
<span class="comment">## ─── CREATE AND DETECT ────────────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> /tmp/session.log live_log.txt
<span class="prompt">$</span> <span class="highlight">rm</span> /tmp/session.log
<span class="comment"># live_log.txt is now dangling</span>

<span class="prompt">$</span> <span class="highlight">ls</span> <span class="highlight">-la</span> live_log.txt
<span class="output">lrwxrwxrwx 1 ravi ravi 16 live_log.txt -&gt; <span class="output">/tmp/session.log</span></span>
<span class="comment"># Terminal shows target in RED or blinking when dangling</span>

<span class="prompt">$</span> <span class="highlight">cat</span> live_log.txt
<span class="output">cat: live_log.txt: No such file or directory</span>

<span class="comment">## ─── FIND ALL DANGLING SYMLINKS ───────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">find</span> . <span class="highlight">-xtype l</span>
<span class="output">./live_log.txt</span>
<span class="comment"># -xtype l: find entries where the TYPE OF TARGET != type of entry
# i.e., symlinks whose target is missing or inaccessible</span>

<span class="prompt">$</span> <span class="highlight">find</span> /home/ravi <span class="highlight">-xtype l</span> <span class="highlight">-print</span>
<span class="prompt">$</span> <span class="highlight">find</span> /home/ravi <span class="highlight">-xtype l</span> <span class="highlight">-ls</span>    <span class="comment"># with long listing</span>
<span class="prompt">$</span> <span class="highlight">find</span> /home/ravi <span class="highlight">-xtype l</span> <span class="highlight">-delete</span> <span class="comment"># delete all dangling links</span>

<span class="comment">## ─── TEST IF A SYMLINK IS VALID IN BASH ───────────────────────</span>
<span class="prompt">$</span> <span class="highlight">test</span> <span class="highlight">-L</span> live_log.txt &amp;&amp; echo "is symlink" || echo "not symlink"
<span class="output">is symlink</span>
<span class="prompt">$</span> <span class="highlight">test</span> <span class="highlight">-e</span> live_log.txt &amp;&amp; echo "target exists" || echo "DANGLING"
<span class="output">DANGLING</span>
<span class="comment"># -L: is a symlink? -e: does the target exist?</span>

<span class="comment">## ─── SCRIPT: CHECK AND REPORT ALL DANGLING LINKS ──────────────</span>
<span class="prompt">$</span> <span class="highlight">find</span> /home/ravi <span class="highlight">-type l</span> | <span class="highlight">while</span> read link; do
    [ ! -e "<span class="highlight">\${link}</span>" ] &amp;&amp; echo "BROKEN: \${link} -&gt; \$(readlink \${link})"
  done
<span class="output">BROKEN: /home/ravi/live_log.txt -&gt; /tmp/session.log</span>
</pre></div></div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 5 — readlink COMMAND
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> <code>readlink</code> — Inspect and Resolve Symlinks</h2>

<!-- CONSOLE 3: readlink -->
<div class="terminal-block">
<div class="terminal-header"><div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div><span class="dot y"></span><span class="dot g"></span></span><span class="terminal-title">Console 3 of 5 — readlink: Every Flag and Use Case</span></div>
<div class="terminal-body"><pre>
<span class="comment">## ─── BASIC: READ THE STORED PATH ─────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">readlink</span> link.csv
<span class="output">report.csv</span>
<span class="comment"># Shows exactly what string is stored in the symlink inode
# Does NOT follow the link — reads the link itself</span>

<span class="prompt">$</span> <span class="highlight">readlink</span> /usr/bin/python3
<span class="output">python3.11</span>

<span class="prompt">$</span> <span class="highlight">readlink</span> /usr/bin/python3.11
<span class="output">python3.11.7</span>
<span class="comment"># Chain: python3 → python3.11 → python3.11.7</span>

<span class="comment">## ─── -f: FOLLOW ENTIRE CHAIN TO CANONICAL PATH ───────────────</span>
<span class="prompt">$</span> <span class="highlight">readlink</span> <span class="highlight">-f</span> /usr/bin/python3
<span class="output">/usr/bin/python3.11.7</span>
<span class="comment"># -f: follows ALL symlinks in the chain
# Resolves relative paths to absolute
# Last component does NOT need to exist (creates conceptual path)</span>

<span class="prompt">$</span> <span class="highlight">readlink</span> <span class="highlight">-f</span> .               <span class="comment"># get absolute path of current dir</span>
<span class="output">/home/ravi/project</span>

<span class="prompt">$</span> <span class="highlight">readlink</span> <span class="highlight">-f</span> ../data/         <span class="comment"># resolve relative path</span>
<span class="output">/home/ravi/data</span>

<span class="comment">## ─── -e: LIKE -f BUT TARGET MUST EXIST ───────────────────────</span>
<span class="prompt">$</span> <span class="highlight">readlink</span> <span class="highlight">-e</span> valid_link.csv
<span class="output">/home/ravi/data/report.csv</span>

<span class="prompt">$</span> <span class="highlight">readlink</span> <span class="highlight">-e</span> dangling_link.csv
<span class="output"></span>
<span class="comment"># Exits non-zero (1) if ANY component doesn't exist
# Use in scripts for strict path validation:</span>
<span class="prompt">$</span> TARGET=<span class="highlight">\$(readlink -e link.csv)</span> || { echo "Target missing!"; exit 1; }

<span class="comment">## ─── -m: RESOLVE WITHOUT REQUIRING EXISTENCE ─────────────────</span>
<span class="prompt">$</span> <span class="highlight">readlink</span> <span class="highlight">-m</span> /future/path/file.csv
<span class="output">/future/path/file.csv</span>
<span class="comment"># Like -f but doesn't fail. Use when computing output paths before creating them</span>

<span class="comment">## ─── -n: NO TRAILING NEWLINE (for subshells) ─────────────────</span>
<span class="prompt">$</span> TARGET=<span class="highlight">\$(readlink -fn link.csv)</span>
<span class="comment"># -n: omit newline — cleaner in variable assignment</span>

<span class="comment">## ─── SCRIPT PATTERN: FIND SCRIPT'S OWN REAL LOCATION ─────────</span>
<span class="prompt">$</span> cat my_script.sh
<span class="output">#!/bin/bash</span>
<span class="output">SCRIPT_PATH=\$(readlink -f "\$0")</span>
<span class="output">SCRIPT_DIR=\$(dirname "\$SCRIPT_PATH")</span>
<span class="output">echo "Running from: \$SCRIPT_DIR"</span>
<span class="comment"># Works correctly even when script is called via a symlink</span>

<span class="comment">## ─── CHECK IF FILE IS A SYMLINK ──────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">readlink</span> report.csv     <span class="comment"># not a symlink</span>
<span class="output"></span>
<span class="comment"># Returns empty string + exit code 1 for non-symlinks</span>
<span class="prompt">$</span> <span class="highlight">echo</span> <span class="highlight">\$?</span>
<span class="output">1</span>

<span class="prompt">$</span> <span class="highlight">readlink</span> link.csv
<span class="output">report.csv</span>
<span class="prompt">$</span> <span class="highlight">echo</span> <span class="highlight">\$?</span>
<span class="output">0</span>
<span class="comment"># Use this to test if something is a symlink in scripts</span>

<span class="comment">## ─── PRACTICAL: VERSION MANAGEMENT SWITCH ────────────────────</span>
<span class="prompt">$</span> <span class="highlight">readlink</span> /usr/local/python
<span class="output">/opt/python-3.11.7</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sfn</span> /opt/python-3.12.0 /usr/local/python
<span class="prompt">$</span> <span class="highlight">readlink</span> /usr/local/python
<span class="output">/opt/python-3.12.0</span>
<span class="comment"># Seamless version upgrade — one command, no downtime</span>
</pre></div></div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 6 — find FOR LINKS
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> <code>find</code> — Searching Links Like a Pro</h2>

<!-- CONSOLE 4: find -->
<div class="terminal-block">
<div class="terminal-header"><div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div><span class="dot y"></span><span class="dot g"></span></span><span class="terminal-title">Console 4 of 5 — find: All Link-Related Operations</span></div>
<div class="terminal-body"><pre>
<span class="comment">## ─── FIND ALL SYMLINKS ────────────────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">find</span> /home/ravi <span class="highlight">-type l</span>
<span class="output">./link.csv</span>
<span class="output">./current</span>
<span class="output">./model_prod.pt</span>
<span class="comment"># -type l matches symbolic links only</span>

<span class="prompt">$</span> <span class="highlight">find</span> . <span class="highlight">-type l</span> <span class="highlight">-ls</span>
<span class="output">1047500 0 lrwxrwxrwx 1 ravi ravi 10 Jan 15 link.csv -&gt; report.csv</span>
<span class="output">1047501 0 lrwxrwxrwx 1 ravi ravi 14 Jan 15 current -&gt; ./data/2024_01_15</span>
<span class="comment"># -ls: long format with inode, similar to ls -lai</span>

<span class="comment">## ─── FIND BROKEN/DANGLING SYMLINKS ───────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">find</span> /home/ravi <span class="highlight">-xtype l</span>
<span class="output">./live_log.txt</span>
<span class="comment"># -xtype l: follow symlinks and test TYPE of TARGET
# If target doesn't exist → -xtype l matches</span>

<span class="prompt">$</span> <span class="highlight">find</span> / <span class="highlight">-xtype l</span> 2&gt;/dev/null     <span class="comment"># system-wide scan</span>
<span class="prompt">$</span> <span class="highlight">find</span> . <span class="highlight">-xtype l</span> <span class="highlight">-exec</span> echo "DANGLING: {}" \;
<span class="prompt">$</span> <span class="highlight">find</span> . <span class="highlight">-xtype l</span> <span class="highlight">-delete</span>       <span class="comment"># remove all dangling</span>

<span class="comment">## ─── FIND ALL HARD LINKS BY INODE ────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">stat</span> <span class="highlight">--format="%i"</span> report.csv
<span class="output">4821</span>

<span class="prompt">$</span> <span class="highlight">find</span> / <span class="highlight">-inum 4821</span> 2&gt;/dev/null
<span class="output">/home/ravi/report.csv</span>
<span class="output">/home/ravi/backups/report_archive.csv</span>
<span class="comment"># Found ALL names for the same physical file!</span>

<span class="prompt">$</span> <span class="highlight">find</span> . <span class="highlight">-samefile</span> report.csv
<span class="output">./report.csv</span>
<span class="output">./backups/report_archive.csv</span>
<span class="comment"># -samefile: more readable — find everything sharing report.csv's inode</span>

<span class="comment">## ─── FIND FILES WITH MULTIPLE HARD LINKS ─────────────────────</span>
<span class="prompt">$</span> <span class="highlight">find</span> . <span class="highlight">-links +1</span>
<span class="output">./report.csv</span>
<span class="output">./backups/report_archive.csv</span>
<span class="comment"># +1: more than 1 hard link (has duplicates)
# Useful for auditing: which files have multiple names?</span>

<span class="prompt">$</span> <span class="highlight">find</span> . <span class="highlight">-links 2</span>     <span class="comment"># exactly 2 hard links</span>
<span class="prompt">$</span> <span class="highlight">find</span> . <span class="highlight">-links +3</span>    <span class="comment"># more than 3 hard links</span>

<span class="comment">## ─── FIND SYMLINKS POINTING TO SPECIFIC TARGET ───────────────</span>
<span class="prompt">$</span> <span class="highlight">find</span> /usr <span class="highlight">-type l</span> <span class="highlight">-ls</span> | <span class="highlight">grep</span> "python3.11"
<span class="output">python3 -&gt; python3.11</span>
<span class="output">python3.11 -&gt; python3.11.7</span>
<span class="comment"># Find all symlinks related to python3.11</span>

<span class="comment">## ─── SYMLINKS WITHIN A TIME RANGE ────────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">find</span> . <span class="highlight">-type l</span> <span class="highlight">-newer</span> reference.txt
<span class="comment"># Symlinks newer than reference.txt</span>

<span class="comment">## ─── SYMLINKS INSIDE A SPECIFIC DIRECTORY (no recursion) ─────</span>
<span class="prompt">$</span> <span class="highlight">find</span> /usr/bin <span class="highlight">-maxdepth 1</span> <span class="highlight">-type l</span>
<span class="comment"># Only immediate symlinks in /usr/bin, no subdirectories</span>

<span class="comment">## ─── FOLLOW SYMLINKS WHEN SEARCHING (find -L) ────────────────</span>
<span class="prompt">$</span> <span class="highlight">find</span> <span class="highlight">-L</span> /data/current <span class="highlight">-name "*.parquet"</span>
<span class="comment"># -L: follow symlinks, search inside them as real dirs
# /data/current is a symlink to /data/2024_01_15 — -L follows it</span>

<span class="comment">## ─── DO NOT FOLLOW SYMLINKS (default, explicit with -P) ───────</span>
<span class="prompt">$</span> <span class="highlight">find</span> <span class="highlight">-P</span> /data <span class="highlight">-type l</span> <span class="highlight">-name "current"</span>
<span class="comment"># -P: never follow — find the symlink ITSELF, not what's inside</span>
</pre></div></div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 7 — COMPLETE FLAG TABLE
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> Complete Flag Reference Tables</h2>

<h3><code>ln</code> — All Options</h3>
<div class="visual-container">
<table class="ref-table">
<thead><tr><th>Flag</th><th>Long Form</th><th>What It Does</th><th>When to Use</th></tr></thead>
<tbody>
<tr><td>-s</td><td>--symbolic</td><td>Create a symlink instead of a hard link</td><td>Virtually always — hard link is the default</td></tr>
<tr><td>-f</td><td>--force</td><td>Remove existing LINK_NAME before creating</td><td>Updating existing symlink</td></tr>
<tr><td>-n</td><td>--no-dereference</td><td>Treat an existing symlink-to-dir as a normal file</td><td><strong>Essential</strong> for <code>ln -sfn</code> on dir symlinks</td></tr>
<tr><td>-v</td><td>--verbose</td><td>Print name of each linked file</td><td>Scripts, confirmation</td></tr>
<tr><td>-i</td><td>--interactive</td><td>Prompt before overwriting</td><td>Manual, careful operations</td></tr>
<tr><td>-b</td><td>--backup[=CTRL]</td><td>Backup existing destination file first</td><td>When old link has value</td></tr>
<tr><td>-S</td><td>--suffix=SUFFIX</td><td>Backup suffix (default ~), used with -b</td><td><code>ln -bS .bak ...</code></td></tr>
<tr><td>-t DIR</td><td>--target-directory</td><td>Create all links in DIR</td><td>Linking multiple files into one dir</td></tr>
<tr><td>-T</td><td>--no-target-directory</td><td>LINK_NAME always treated as a regular file</td><td>Prevent unexpected dir expansion</td></tr>
<tr><td>-r</td><td>--relative</td><td>Make symlink path relative to link location</td><td>Portable symlinks (GNU ln only)</td></tr>
<tr><td>--help</td><td></td><td>Show help and exit</td><td></td></tr>
<tr><td>--version</td><td></td><td>Show version and exit</td><td></td></tr>
</tbody>
</table>
</div>

<h3><code>readlink</code> — All Options</h3>
<div class="visual-container">
<table class="ref-table">
<thead><tr><th>Flag</th><th>Long Form</th><th>What It Does</th><th>Exit Code Behaviour</th></tr></thead>
<tbody>
<tr><td>(none)</td><td></td><td>Print path stored in symlink. Fail if not a symlink.</td><td>0=symlink found, 1=not symlink</td></tr>
<tr><td>-f</td><td>--canonicalize</td><td>Resolve all symlinks. Last component may not exist.</td><td>0 always (if dir components exist)</td></tr>
<tr><td>-e</td><td>--canonicalize-existing</td><td>Like -f but ALL components must exist.</td><td>1 if any component missing</td></tr>
<tr><td>-m</td><td>--canonicalize-missing</td><td>Like -f but no component need exist.</td><td>0 always</td></tr>
<tr><td>-n</td><td>--no-newline</td><td>Don't append trailing newline to output.</td><td></td></tr>
<tr><td>-q</td><td>--quiet</td><td>Suppress error messages.</td><td></td></tr>
<tr><td>-s</td><td>--silent</td><td>Alias for --quiet.</td><td></td></tr>
<tr><td>-v</td><td>--verbose</td><td>Report errors even if quiet mode.</td><td></td></tr>
<tr><td>-z</td><td>--zero</td><td>NUL-terminate each output line (safe for filenames with spaces).</td><td></td></tr>
</tbody>
</table>
</div>

<h3><code>find</code> — Link-Related Tests</h3>
<div class="visual-container">
<table class="ref-table">
<thead><tr><th>Option/Test</th><th>Description</th><th>Example</th></tr></thead>
<tbody>
<tr><td>-type l</td><td>Match symbolic links (by the link's own type)</td><td><code>find . -type l</code></td></tr>
<tr><td>-xtype l</td><td>Match broken symlinks (type of target, not link)</td><td><code>find . -xtype l</code></td></tr>
<tr><td>-inum N</td><td>Match files with specific inode number</td><td><code>find / -inum 4821</code></td></tr>
<tr><td>-samefile FILE</td><td>Match files sharing inode with FILE</td><td><code>find . -samefile report.csv</code></td></tr>
<tr><td>-links N</td><td>Files with exactly N hard links</td><td><code>find . -links 2</code></td></tr>
<tr><td>-links +N</td><td>Files with more than N hard links</td><td><code>find . -links +1</code></td></tr>
<tr><td>-links -N</td><td>Files with fewer than N hard links</td><td><code>find . -links -2</code></td></tr>
<tr><td>-L (option)</td><td>Follow all symlinks during traversal</td><td><code>find -L /data -name *.csv</code></td></tr>
<tr><td>-P (option)</td><td>Never follow symlinks (default)</td><td><code>find -P /data -type l</code></td></tr>
<tr><td>-H (option)</td><td>Follow symlinks on command line only</td><td><code>find -H /data/current -type f</code></td></tr>
<tr><td>-ls</td><td>Print result in ls -lai format</td><td><code>find . -type l -ls</code></td></tr>
<tr><td>-delete</td><td>Delete found files/links</td><td><code>find . -xtype l -delete</code></td></tr>
</tbody>
</table>
</div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 8 — DIFFERENTIATOR TABLE
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> Hard Link vs Symbolic Link — Complete Comparison</h2>

<!-- Comparison SVG Visual -->
<div class="diagram-wrap">
<svg viewBox="0 0 760 90" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;display:block;margin:0 auto 20px;">
  <rect width="760" height="90" fill="#0d1117" rx="8"/>
  <!-- Hard Link box -->
  <rect x="10" y="10" width="350" height="70" rx="8" fill="#1a1218" stroke="#ef5350" stroke-width="2"/>
  <text x="185" y="34" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#ef5350">Hard Link</text>
  <text x="30" y="52" font-family="monospace" font-size="11" fill="#e6edf3">ln  source  link        </text>
  <text x="30" y="68" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Same inode · Same filesystem · No dangling</text>

  <!-- VS -->
  <text x="380" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="16" font-weight="bold" fill="#30363d">VS</text>

  <!-- Symlink box -->
  <rect x="400" y="10" width="350" height="70" rx="8" fill="#0e1824" stroke="#64b5f6" stroke-width="2"/>
  <text x="575" y="34" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#64b5f6">Symbolic Link</text>
  <text x="420" y="52" font-family="monospace" font-size="11" fill="#e6edf3">ln -s  source  link     </text>
  <text x="420" y="68" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">New inode · Any filesystem · Can dangle</text>
</svg>
</div>

<div class="visual-container">
<table class="ref-table diff-table">
<thead>
<tr>
  <th style="width:28%">Property</th>
  <th style="color:#ef5350;width:36%">🔴 Hard Link</th>
  <th style="color:#64b5f6;width:36%">🔵 Symbolic Link</th>
</tr>
</thead>
<tbody>
<tr><td>System call</td><td style="color:#ef9090">link(2)</td><td style="color:#90b8f8">symlink(2)</td></tr>
<tr><td>Own inode?</td><td style="color:#ef9090">❌ Shares target's inode</td><td style="color:#90b8f8">✅ Gets a new inode (S_IFLNK)</td></tr>
<tr><td><code>ls -l</code> prefix</td><td style="color:#ef9090"><code>-</code> (identical to regular file)</td><td style="color:#90b8f8"><code>l</code> with <code>→ target</code> shown</td></tr>
<tr><td>Permissions shown</td><td style="color:#ef9090">Target's real permissions</td><td style="color:#90b8f8"><code>lrwxrwxrwx</code> always (777)</td></tr>
<tr><td>Size shown</td><td style="color:#ef9090">Target's file size in bytes</td><td style="color:#90b8f8">Length of path string in bytes</td></tr>
<tr><td>Link to directories</td><td style="color:#ef9090">❌ Not allowed (circular loops)</td><td style="color:#90b8f8">✅ Very common and safe</td></tr>
<tr><td>Cross filesystem</td><td style="color:#ef9090">❌ Same device only (EXDEV)</td><td style="color:#90b8f8">✅ Any filesystem, even NFS/FUSE</td></tr>
<tr><td>Survives target deletion</td><td style="color:#ef9090">✅ Data lives on</td><td style="color:#90b8f8">❌ Becomes dangling link</td></tr>
<tr><td>Can dangle?</td><td style="color:#ef9090">❌ Never possible</td><td style="color:#90b8f8">✅ Yes — if target is deleted</td></tr>
<tr><td>Link count effect</td><td style="color:#ef9090">Increments inode nlink</td><td style="color:#90b8f8">No effect on target's nlink</td></tr>
<tr><td>Path type</td><td style="color:#ef9090">No path — direct inode reference</td><td style="color:#90b8f8">Absolute or relative path string</td></tr>
<tr><td>Performance</td><td style="color:#ef9090">Zero overhead — direct inode</td><td style="color:#90b8f8">One extra path lookup per access</td></tr>
<tr><td>Disk space</td><td style="color:#ef9090">Zero extra (no new inode)</td><td style="color:#90b8f8">~256 bytes for inode (or 0 for fast symlinks ≤60 chars)</td></tr>
<tr><td>Detect with</td><td style="color:#ef9090"><code>ls -li</code> matching inode numbers</td><td style="color:#90b8f8"><code>ls -l</code> showing → arrow</td></tr>
<tr><td>Version switching</td><td style="color:#ef9090">❌ Both names see same data always</td><td style="color:#90b8f8">✅ Re-point the link with ln -sfn</td></tr>
<tr><td>Cross-host (NFS mount)</td><td style="color:#ef9090">❌ Inode numbers are local</td><td style="color:#90b8f8">✅ Path-based, works if mounted</td></tr>
<tr><td>Typical use</td><td style="color:#ef9090">rsync backups, dedup, kernel headers</td><td style="color:#90b8f8">Version mgmt, dotfiles, pipelines, ML</td></tr>
</tbody>
</table>
</div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 9 — KERNEL / SYSCALL DEEP DIVE
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> Kernel &amp; Syscall Deep Dive</h2>

<!-- CONSOLE 5: Kernel / strace -->
<div class="terminal-block">
<div class="terminal-header"><div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div><span class="dot y"></span><span class="dot g"></span></span><span class="terminal-title">Console 5 of 5 — Kernel Internals &amp; strace Verification</span></div>
<div class="terminal-body"><pre>
<span class="comment">## ─── STRACE: SEE WHAT SYSCALLS ln MAKES ──────────────────────</span>
<span class="prompt">$</span> <span class="highlight">strace</span> <span class="highlight">-e</span> link,symlink,unlink ln report.csv backup2.csv
<span class="output">link("report.csv", "backup2.csv")        = 0</span>
<span class="comment"># One syscall: link(2). Kernel creates dir entry + increments nlink</span>

<span class="prompt">$</span> <span class="highlight">strace</span> <span class="highlight">-e</span> link,symlink,unlink ln <span class="highlight">-s</span> report.csv sym2.csv
<span class="output">symlink("report.csv", "sym2.csv")        = 0</span>
<span class="comment"># Different syscall: symlink(2). Creates new inode with path string as content</span>

<span class="prompt">$</span> <span class="highlight">strace</span> <span class="highlight">-e</span> link,symlink,unlink rm backup2.csv
<span class="output">unlink("backup2.csv")                    = 0</span>
<span class="comment"># unlink(2) — removes dir entry, decrements nlink</span>

<span class="comment">## ─── INODE nlink LIVE DEMO ────────────────────────────────────</span>
<span class="prompt">$</span> echo "test" &gt; x.txt
<span class="prompt">$</span> <span class="highlight">stat</span> <span class="highlight">--format="%h"</span> x.txt
<span class="output">1</span>
<span class="prompt">$</span> <span class="highlight">ln</span> x.txt y.txt; <span class="highlight">stat</span> <span class="highlight">--format="%h"</span> x.txt
<span class="output">2</span>
<span class="prompt">$</span> <span class="highlight">ln</span> x.txt z.txt; <span class="highlight">stat</span> <span class="highlight">--format="%h"</span> x.txt
<span class="output">3</span>
<span class="prompt">$</span> <span class="highlight">rm</span> y.txt; <span class="highlight">stat</span> <span class="highlight">--format="%h"</span> x.txt
<span class="output">2</span>
<span class="prompt">$</span> <span class="highlight">rm</span> z.txt x.txt; <span class="comment"># now nlink=0 → kernel frees inode &amp; blocks</span>

<span class="comment">## ─── THE UNLINKED-BUT-OPEN TRICK (mkstemp pattern) ───────────</span>
<span class="prompt">$</span> python3 <span class="highlight">-c</span> "
import os, tempfile
fd, path = tempfile.mkstemp()
os.unlink(path)           # delete the name immediately!
os.write(fd, b'secret')   # file still accessible via fd
data = os.pread(fd, 100, 0)
print(data)               # b'secret' — data alive with no name!
os.close(fd)              # NOW data is freed
"
<span class="output">b'secret'</span>
<span class="comment"># This is how tmpfile() works in C. No name = no leakage on crash.
# nlink=0 but open fds keep the inode alive until all fds close.</span>

<span class="comment">## ─── MAX SYMLINK DEPTH: MAXSYMLINKS = 40 ─────────────────────</span>
<span class="prompt">$</span> for i in <span class="highlight">\$(seq 1 41)</span>; do ln <span class="highlight">-sf</span> "link\${i}" "link\$((i+1))"; done
<span class="prompt">$</span> cat link42
<span class="output">cat: link42: Too many levels of symbolic links</span>
<span class="comment"># ELOOP error — kernel aborts after 40 symlink hops
# Prevents infinite loops: A→B→A→B→...
# Kernel constant: #define MAXSYMLINKS 40 (fs/namei.c)</span>

<span class="comment">## ─── STAT SYSTEM CALLS: stat vs lstat ────────────────────────</span>
<span class="prompt">$</span> python3 <span class="highlight">-c</span> "
import os
# lstat(): info about the SYMLINK itself (does not follow)
s = os.lstat('link.csv')
print('lstat type bits:', oct(s.st_mode)[:3])  # 0o12 = symlink
print('lstat inode:',  s.st_ino)               # symlink's inode

# stat(): follows symlink, info about TARGET
s = os.stat('link.csv')
print('stat inode:',   s.st_ino)               # target's inode
print('stat nlink:',   s.st_nlink)
"
<span class="output">lstat type bits: 0o12</span>
<span class="output">lstat inode: 5900</span>
<span class="output">stat inode: 4821</span>
<span class="output">stat nlink: 2</span>

<span class="comment">## ─── EXT4 FAST SYMLINK OPTIMISATION ──────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">stat</span> link.csv
<span class="output">  Size: 10     Blocks: 0    <span class="highlight">&lt;-- Blocks=0 means fast symlink</span></span>
<span class="comment"># If path ≤ 60 bytes (ext4): stored directly in inode.i_block[]
# No data block allocated — zero extra disk I/O on read!
# Paths &gt; 60 bytes: stored in a regular data block (slow symlink)</span>

<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-s</span> /this/is/a/very/long/absolute/path/that/exceeds/sixty/characters/total.csv long_link.csv
<span class="prompt">$</span> <span class="highlight">stat</span> long_link.csv
<span class="output">  Size: 76     Blocks: 8    <span class="highlight">&lt;-- Blocks&gt;0 means slow symlink (data block used)</span></span>

<span class="comment">## ─── DIRECTORY HARD LINK COUNT TRICK ─────────────────────────</span>
<span class="prompt">$</span> <span class="highlight">ls</span> <span class="highlight">-ld</span> /home/ravi/project/
<span class="output">drwxr-xr-x <span class="highlight">5</span> ravi ravi 4096 /home/ravi/project/</span>
<span class="comment"># Directories start with nlink=2 (. and ..)
# Each subdirectory adds +1 (because subdir contains .. pointing to parent)
# 5 links = 2 + 3 subdirectories inside project/</span>

<span class="prompt">$</span> <span class="highlight">ls</span> project/
<span class="output">data/   models/   scripts/</span>
<span class="comment"># Confirmed: 3 subdirs → nlink = 2 + 3 = 5</span>
</pre></div></div>

<div class="deep-dive-box">
<h4>⚙️ Kernel Internals Summary — link(2) vs symlink(2)</h4>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
/* ── link(2): Hard Link System Call ─────────────────────────── */
int link(const char *oldpath, const char *newpath);

Kernel steps:
  1. vfs_path_lookup(oldpath) → dentry *old_dentry (resolve inode)
  2. security_inode_link() → LSM/SELinux check
  3. Check: old_dentry is NOT a directory → EPERM if it is
  4. Check: old and new are on same device → EXDEV if not
  5. inode_lock(old_inode) → prevent concurrent modifications
  6. d_entry = vfs_link(old_dentry, dir_inode, new_dentry)
  7. Increments old_inode->i_nlink
  8. Updates old_inode->i_ctime (metadata changed)
  9. Returns 0 on success

/* ── symlink(2): Symbolic Link System Call ───────────────────── */
int symlink(const char *target, const char *linkpath);

Kernel steps:
  1. vfs_path_lookup(linkpath's parent dir) → where to create link
  2. security_inode_symlink() → LSM check
  3. Allocate NEW inode → type set to S_IFLNK
  4. If strlen(target) ≤ EXT4_FAST_LINK_SIZE (60 bytes):
       Store target string directly in inode.i_block[] array
       Set inode.i_blocks = 0 (fast symlink — no disk block)
     Else:
       Allocate a data block, write target string there
       inode.i_block[0] → pointer to data block
  5. Create directory entry in parent: {name:linkname, inode:new_inode}
  6. new_inode.i_nlink = 1 (a symlink always has nlink=1)
  7. target string is NOT validated — can be any string including nonexistent

/* ── readlink(2): Read Symlink Target ───────────────────────── */
ssize_t readlink(const char *path, char *buf, size_t bufsiz);
  → lstat() the path → verify S_IFLNK
  → if fast symlink: copy from inode.i_block[]
  → if slow symlink: read from data block
  → does NOT follow the link — reads the link itself

/* ── Symlink Resolution (fs/namei.c: link_path_walk) ─────────── */
  → kernel maintains follow_link depth counter
  → each symlink encountered: depth++
  → if depth > MAXSYMLINKS (40): return -ELOOP
  → on symlink inode: call inode->i_op->follow_link()
  → read target string → restart path walk from that string
</pre>
</div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 10 — REAL-WORLD PATTERNS
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Data Engineering &amp; DevOps</h2>

<div class="pattern-grid">
  <!-- Pattern 1 -->
  <div class="pattern-card sym-card-bg">
    <div class="pattern-icon">📊</div>
    <h3>Data Pipeline Version Pointer</h3>
    <div class="code-snippet">
<pre>
<span class="comment"># Daily batch: new data in dated dir
# Pipeline script always reads from "current"</span>

<span class="prompt">$</span> <span class="highlight">ls</span> /data/
<span class="output">2024_01_13/  2024_01_14/  2024_01_15/
current -&gt; 2024_01_14/</span>

<span class="comment"># New batch arrives:</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sfn</span> /data/2024_01_15 /data/current
<span class="comment"># Pipeline auto-reads new data — no code changes</span>
</pre>
    </div>
  </div>

  <!-- Pattern 2 -->
  <div class="pattern-card hard-card-bg">
    <div class="pattern-icon">💾</div>
    <h3>rsync Hard-Link Incremental Backup</h3>
    <div class="code-snippet">
<pre>
<span class="comment"># Day 1: full backup</span>
<span class="prompt">$</span> <span class="highlight">rsync</span> <span class="highlight">-av</span> /data/ /backup/day1/

<span class="comment"># Day 2: only changed files copied
# Unchanged files → hard linked from day1</span>
<span class="prompt">$</span> <span class="highlight">rsync</span> <span class="highlight">-av --link-dest</span>=../day1/ /data/ /backup/day2/

<span class="comment"># Day2 looks complete — only diff uses space
# Hard links = zero duplication cost</span>
<span class="prompt">$</span> <span class="highlight">du</span> <span class="highlight">-sh</span> /backup/day1/ /backup/day2/
<span class="output">2.1G  /backup/day1/</span>
<span class="output">4.2M  /backup/day2/   ← only changes!</span>
</pre>
    </div>
  </div>

  <!-- Pattern 3 -->
  <div class="pattern-card sym-card-bg">
    <div class="pattern-icon">🐍</div>
    <h3>Python/Node Version Management</h3>
    <div class="code-snippet">
<pre>
<span class="comment"># Install multiple Python versions:</span>
<span class="prompt">$</span> <span class="highlight">ls</span> /opt/
<span class="output">python-3.10.12/  python-3.11.7/  python-3.12.0/</span>

<span class="comment"># Point system python3 at 3.11:</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sfn</span> /opt/python-3.11.7 /usr/local/python
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sf</span> /usr/local/python/bin/python3 /usr/bin/python3

<span class="comment"># Upgrade to 3.12 instantly:</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sfn</span> /opt/python-3.12.0 /usr/local/python
<span class="comment"># ↑ All dependent symlinks update automatically</span>
</pre>
    </div>
  </div>

  <!-- Pattern 4 -->
  <div class="pattern-card sym-card-bg">
    <div class="pattern-icon">🤖</div>
    <h3>ML Model Artifact Aliasing</h3>
    <div class="code-snippet">
<pre>
<span class="comment"># Training creates versioned checkpoints:</span>
<span class="output">/models/bert_ep001.pt  bert_ep010.pt  bert_ep047.pt</span>

<span class="comment"># Alias "best" and "prod" without copying:</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sf</span> bert_ep047.pt model_best.pt
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sf</span> bert_ep010.pt model_prod.pt
<span class="comment"># Serving code loads "model_prod.pt" always
# Swap prod without touching serving code:</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sf</span> bert_ep047.pt model_prod.pt
</pre>
    </div>
  </div>

  <!-- Pattern 5 -->
  <div class="pattern-card hard-card-bg">
    <div class="pattern-icon">🔍</div>
    <h3>Find All Hard Links to a File</h3>
    <div class="code-snippet">
<pre>
<span class="comment"># Get inode of the file:</span>
<span class="prompt">$</span> INO=<span class="highlight">\$(stat --format="%i" report.csv)</span>
<span class="prompt">$</span> echo "Inode: \$INO"
<span class="output">Inode: 4821</span>

<span class="comment"># Find all names for this inode:</span>
<span class="prompt">$</span> <span class="highlight">find</span> / <span class="highlight">-inum \$INO</span> 2&gt;/dev/null
<span class="output">/home/ravi/report.csv</span>
<span class="output">/home/ravi/backups/report_archive.csv</span>

<span class="comment"># Or more elegantly:</span>
<span class="prompt">$</span> <span class="highlight">find</span> / <span class="highlight">-samefile</span> report.csv 2&gt;/dev/null
</pre>
    </div>
  </div>

  <!-- Pattern 6 -->
  <div class="pattern-card sym-card-bg">
    <div class="pattern-icon">🏠</div>
    <h3>Dotfile Configuration Management</h3>
    <div class="code-snippet">
<pre>
<span class="comment"># All configs live in git-tracked dotfiles/:</span>
<span class="prompt">$</span> <span class="highlight">ls</span> ~/dotfiles/
<span class="output">.bashrc  .vimrc  .tmux.conf  .gitconfig</span>

<span class="comment"># Link from home directory:</span>
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sf</span> ~/dotfiles/.bashrc ~/.bashrc
<span class="prompt">$</span> <span class="highlight">ln</span> <span class="highlight">-sf</span> ~/dotfiles/.vimrc ~/.vimrc
<span class="comment"># Edit ~/.vimrc → change tracked in git
# Same config across all machines via clone + link</span>
</pre>
    </div>
  </div>
</div>

<h3 style="margin-top:32px;">Stat Fields — Quick Reference</h3>
<div class="visual-container">
<table class="ref-table">
<thead><tr><th><code>stat --format</code></th><th>Field Meaning</th><th>Example Value</th></tr></thead>
<tbody>
<tr><td>%i</td><td>Inode number</td><td>4821</td></tr>
<tr><td>%h</td><td>Hard link count (nlink)</td><td>2</td></tr>
<tr><td>%f</td><td>Hex file mode (type + perms)</td><td>81a4</td></tr>
<tr><td>%s</td><td>File size in bytes</td><td>4312</td></tr>
<tr><td>%b</td><td>Number of 512-byte blocks allocated</td><td>16</td></tr>
<tr><td>%B</td><td>Block size in bytes</td><td>512</td></tr>
<tr><td>%n</td><td>File name</td><td>report.csv</td></tr>
<tr><td>%N</td><td>Quoted file name with dereference (shows → for symlinks)</td><td>'link.csv' → 'report.csv'</td></tr>
<tr><td>%F</td><td>File type string</td><td>regular file / symbolic link</td></tr>
<tr><td>%u</td><td>User ID of owner</td><td>1000</td></tr>
<tr><td>%U</td><td>User name of owner</td><td>ravi</td></tr>
<tr><td>%g</td><td>Group ID</td><td>1000</td></tr>
<tr><td>%G</td><td>Group name</td><td>ravi</td></tr>
<tr><td>%a</td><td>Access rights in octal</td><td>644</td></tr>
<tr><td>%A</td><td>Access rights in human form</td><td>-rw-r--r--</td></tr>
<tr><td>%x</td><td>Last access time (atime)</td><td>2024-01-15 10:32:01</td></tr>
<tr><td>%y</td><td>Last modification time (mtime)</td><td>2024-01-14 18:45:22</td></tr>
<tr><td>%z</td><td>Last status change time (ctime)</td><td>2024-01-14 18:45:22</td></tr>
<tr><td>%w</td><td>Birth time (file creation, ext4+)</td><td>2024-01-10 09:00:00</td></tr>
<tr><td>%d</td><td>Device number in decimal</td><td>2049</td></tr>
</tbody>
</table>
</div>
</div><!-- /section-card -->

<!-- ═══════════════════════════════════════════════════════
     SECTION 11 — EXERCISES
═══════════════════════════════════════════════════════ -->
<div class="section-card">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises</h2>

<div class="exercise-block easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Inode Inspector</h4>
    <p>Create a file <code>data.csv</code> with 5 lines of CSV content. Create a hard link <code>backup.csv</code>. Use <code>ls -li</code> and <code>stat</code> to confirm they share the same inode. Record the inode number and link count. Delete <code>data.csv</code>. Check link count again. Verify <code>backup.csv</code> still has the original content.</p>
    <p><strong>Key commands:</strong> <code>echo</code>, <code>ln</code>, <code>ls -li</code>, <code>stat --format="%i %h"</code>, <code>rm</code>, <code>cat</code></p>
    <p><strong>Expected learning:</strong> Understanding that rm only removes a directory entry, not the inode, until nlink reaches zero.</p>
  </div>
</div>

<div class="exercise-block easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Symlink Chain Explorer</h4>
    <p>Create: <code>original.txt</code> → hard link → <code>link1.txt</code> → symlink → <code>link2.txt</code> → symlink → <code>link3.txt</code>. Use <code>readlink link3.txt</code> and <code>readlink -f link3.txt</code> to see the difference. Use <code>ls -lai</code> to show all inode numbers. Delete <code>link1.txt</code>. Use <code>find . -xtype l</code> to detect dangling links. Delete the dangling ones.</p>
    <p><strong>Expected learning:</strong> readlink without -f reads one hop; -f resolves the full chain.</p>
  </div>
</div>

<div class="exercise-block medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Data Pipeline Current Pointer</h4>
    <p>Create directories <code>data_v1/</code> and <code>data_v2/</code>, each containing a <code>sales.csv</code> with different data. Write a script <code>process.sh</code> that reads <code>current/sales.csv</code> and prints the line count and first line. Create a symlink <code>current → data_v1/</code> and run <code>process.sh</code>. Then switch the pointer to <code>data_v2/</code> using <code>ln -sfn</code> and run <code>process.sh</code> again. Confirm the output changed without modifying the script.</p>
    <p><strong>Expected learning:</strong> The symlink-as-stable-pointer pattern is fundamental to data engineering pipelines.</p>
  </div>
</div>

<div class="exercise-block medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Hard-Link Space-Saving Backup</h4>
    <p>Create a <code>source/</code> directory with 5 files (3 identical content, 2 unique). Copy to <code>backup_day1/</code>. Now modify 2 files in <code>source/</code>. For <code>backup_day2/</code>, use <code>rsync --link-dest=../backup_day1/ source/ backup_day2/</code>. Run <code>ls -li backup_day1/ backup_day2/</code> and identify which files share inodes (unchanged) and which are new inodes (changed). Calculate disk savings using <code>du -sh</code>.</p>
    <p><strong>Expected learning:</strong> rsync --link-dest is how time-machine style backups work in production.</p>
  </div>
</div>

<div class="exercise-block hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Hard Link Finder Script</h4>
    <p>Write a complete bash script <code>find_hardlinks.sh</code> that: (1) Accepts a filename as argument. (2) Detects if the file is a symlink and resolves it first using <code>readlink -f</code>. (3) Extracts the inode number using <code>stat</code>. (4) Finds all hard links to that inode using <code>find</code>. (5) Excludes the input file from the results. (6) Prints the count of additional hard links found. (7) Handles error cases: file doesn't exist, not a regular file, no additional hard links found.</p>
    <p><strong>Bonus:</strong> Add a <code>-d DIR</code> option to limit the search to a specific directory tree.</p>
    <p><strong>Expected learning:</strong> Combining stat, find -inum, readlink -f, and error handling in a real script.</p>
  </div>
</div>

<!-- Wrap-up story -->
<div class="story-box" style="margin-top:32px;">
  <div>🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Pipeline — 7 Days Later</div>
    <p>The next week, Ravi set up the entire pipeline with one principle: <em>stable names, moving data</em>. His <code>/data/current</code> symlink updated every morning via cron. His <code>model_prod.pt</code> symlink pointed to the latest validated checkpoint. His rsync backup job ran with <code>--link-dest</code>, saving 94% disk space. When his manager asked how the job "just knew" to read new data without any code changes, Ravi smiled: "In Linux, filenames and file data are separate. We gave the data a stable name — and the data behind that name changes, not the name itself."</p>
  </div>
</div>

</div><!-- /section-card -->
`
};