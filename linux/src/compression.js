// ============================================================
// myPathshala – Linux Programming Course
// Module: compression.js  |  Topic: Compression & Archives
// Commands: gzip · gunzip · zcat · bzip2 · xz
//           zip · unzip · tar · split · strings
// ============================================================
// EXPERT FACULTY APPROACH:
//  • 6 dedicated consoles — one per command group
//  • Story: Ravi's data pipeline disk space crisis
//  • Differentiator tables: which algorithm when
//  • Behind-the-scenes: how compression algorithms work
//  • 5 progressive real-world exercises
// ============================================================

var compressions = {
  title: "Compression & Archives",
  description: "Master every compression tool Linux offers — from quick gzip to maximum-ratio xz, single-file to multi-volume archives, password-protected zips to streaming compressed pipelines.",
  breadcrumb: ["Essential Commands", "Compression & Archives"],

  sections: [

    // ════════════════════════════════════════════════════════════
    // OPENING STORY
    // ════════════════════════════════════════════════════════════
    {
      id: "compression-intro",
      title: "The 500GB Problem — and How Compression Saved the Project",
      content: `
<div class="story-box">
  <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap;">
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="38" r="38" fill="#1a1a2e"/>
      <rect x="18" y="20" width="40" height="36" rx="4" fill="#1f6feb" stroke="#58a6ff" stroke-width="1.5"/>
      <rect x="24" y="28" width="28" height="4" rx="2" fill="#58a6ff" opacity="0.7"/>
      <rect x="24" y="36" width="20" height="4" rx="2" fill="#58a6ff" opacity="0.5"/>
      <rect x="24" y="44" width="24" height="4" rx="2" fill="#58a6ff" opacity="0.3"/>
      <rect x="14" y="52" width="48" height="14" rx="4" fill="#f9a825"/>
      <text x="38" y="63" fill="#1a1a2e" font-size="10" font-weight="bold" text-anchor="middle">SQUEEZE</text>
    </svg>
    <div style="flex:1;min-width:220px;">
      <h3 style="margin:0 0 8px;color:#ce93d8;">📦 Friday 4 PM — "We're Out of Disk Space"</h3>
      <p>Ravi's team had been collecting IoT sensor data for 3 months. The <code>/data</code> partition hit 98%. The monthly upload to S3 was scheduled for 6 PM — 2 hours away. Moving 500GB over the network would take 14 hours at their connection speed.</p>
      <p>His manager walked over: <em>"Can we push to Monday?"</em></p>
      <p>Ravi said: <em>"Give me 20 minutes."</em></p>
      <p>He compressed the data. It went from <strong>500GB → 47GB</strong>. Uploaded in 80 minutes. Pipeline ran on time. His manager never asked that question again.</p>
    </div>
  </div>
  <p style="margin-top:14px;color:#ce93d8;font-style:italic;">"The three most important numbers in data engineering: how big is it, how fast can you move it, and how small can you make it."</p>
</div>

<div class="info-box" style="margin-top:16px;">
  <strong>📌 Two Concepts You Must Separate:</strong>
  <div class="visual-container" style="margin-top:12px;">
  <svg width="660" height="130" viewBox="0 0 660 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="660" height="130" fill="#0d1117" rx="10"/>
    <!-- Archive side -->
    <rect x="15" y="20" width="295" height="94" rx="8" fill="#0d1f3c" stroke="#58a6ff" stroke-width="2"/>
    <text x="163" y="44" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">ARCHIVE (tar)</text>
    <text x="163" y="62" fill="#8b949e" font-size="10" text-anchor="middle">Bundle many files into ONE file</text>
    <text x="30"  y="82" fill="#e6edf3" font-size="10" font-family="monospace">file1.csv + file2.csv + dir/</text>
    <text x="163" y="82" fill="#58a6ff" font-size="14">→</text>
    <text x="200" y="82" fill="#3fb950" font-size="10" font-family="monospace">archive.tar</text>
    <text x="163" y="102" fill="#8b949e" font-size="9" text-anchor="middle">Size may be SAME or larger (adds metadata)</text>
    <!-- Compress side -->
    <rect x="350" y="20" width="295" height="94" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
    <text x="498" y="44" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">COMPRESS (gzip/bzip2/xz)</text>
    <text x="498" y="62" fill="#8b949e" font-size="10" text-anchor="middle">Make ONE file smaller</text>
    <text x="363" y="82" fill="#e6edf3" font-size="10" font-family="monospace">data.csv (500 MB)</text>
    <text x="498" y="82" fill="#3fb950" font-size="14">→</text>
    <text x="530" y="82" fill="#3fb950" font-size="10" font-family="monospace">data.csv.gz (47 MB)</text>
    <text x="498" y="102" fill="#8b949e" font-size="9" text-anchor="middle">Still ONE file — just smaller</text>
  </svg>
  </div>
  <p style="margin-top:8px;"><strong>In practice:</strong> you almost always do BOTH — <code>tar</code> to bundle, then <code>gzip</code> to shrink. This creates <code>.tar.gz</code> files (also called <strong>tarballs</strong>).</p>
</div>

<div class="info-box" style="margin-top:12px;">
  <strong>🗺️ Commands Covered in This Module:</strong>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:10px;">
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #3fb950;">
      <strong style="color:#3fb950;">gzip Family</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>gzip</code> · <code>gunzip</code> · <code>zcat</code> · <code>zgrep</code></span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #58a6ff;">
      <strong style="color:#58a6ff;">bzip2 & xz</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>bzip2</code> · <code>bunzip2</code> · <code>xz</code> · <code>unxz</code></span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #d29922;">
      <strong style="color:#d29922;">zip / unzip</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>zip</code> · <code>unzip</code> · password · split</span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #bc8cff;">
      <strong style="color:#bc8cff;">tar — The Swiss Army Knife</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>tar</code> create · extract · list · update</span>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #f85149;">
      <strong style="color:#f85149;">Advanced</strong><br>
      <span style="color:#8b949e;font-size:12px;"><code>split</code> · <code>strings</code> · streaming</span>
    </div>
  </div>
</div>`
    },

    // ════════════════════════════════════════════════════════════
    // GZIP
    // ════════════════════════════════════════════════════════════
    {
      id: "gzip-section",
      title: "gzip — The Data Engineer's Daily Driver",
      content: `
<div class="story-box">
  <strong>📖 Ravi's First Command — 4:02 PM:</strong>
  <p>Ravi checked disk usage: <code>du -sh /data/sensors/</code> → 500GB. He ran <code>gzip -9 -r /data/sensors/</code> and watched the files shrink. JSON sensor data went from 500GB to 41GB — a 91.8% reduction. gzip is tuned for text data like JSON, CSV, and logs.</p>
</div>

<p><code>gzip</code> (GNU zip) is the most common compression tool on Linux. It compresses a single file using the DEFLATE algorithm — the same algorithm used in HTTP/2, PNG images, and ZIP files. Fast to compress, extremely fast to decompress.</p>

<!-- HOW GZIP WORKS DIAGRAM -->
<div class="visual-container">
<svg width="680" height="150" viewBox="0 0 680 150" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="150" fill="#0d1117" rx="12"/>
  <text x="340" y="22" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">gzip File Lifecycle</text>

  <!-- Original file -->
  <rect x="20" y="40" width="130" height="80" rx="8" fill="#161b22" stroke="#8b949e" stroke-width="1.5"/>
  <text x="85" y="70" fill="#e6edf3" font-size="11" font-weight="bold" text-anchor="middle">data.csv</text>
  <text x="85" y="88" fill="#8b949e" font-size="10" text-anchor="middle">500 MB</text>
  <text x="85" y="106" fill="#8b949e" font-size="9" text-anchor="middle">plain text</text>

  <!-- gzip arrow -->
  <rect x="168" y="68" width="90" height="24" rx="5" fill="#0f2a0f" stroke="#3fb950"/>
  <text x="213" y="84" fill="#3fb950" font-size="11" font-weight="bold" text-anchor="middle">gzip</text>
  <line x1="150" y1="80" x2="168" y2="80" stroke="#3fb950" stroke-width="1.5"/>
  <polygon points="165,75 178,80 165,85" fill="#3fb950"/>
  <line x1="258" y1="80" x2="276" y2="80" stroke="#3fb950" stroke-width="1.5"/>
  <polygon points="273,75 286,80 273,85" fill="#3fb950"/>

  <!-- Compressed file -->
  <rect x="286" y="40" width="130" height="80" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <text x="351" y="70" fill="#3fb950" font-size="11" font-weight="bold" text-anchor="middle">data.csv.gz</text>
  <text x="351" y="88" fill="#3fb950" font-size="10" text-anchor="middle">47 MB</text>
  <text x="351" y="106" fill="#8b949e" font-size="9" text-anchor="middle">-90.6% size</text>

  <!-- gunzip arrow -->
  <rect x="434" y="68" width="90" height="24" rx="5" fill="#1a0f0f" stroke="#f85149"/>
  <text x="479" y="84" fill="#f85149" font-size="11" font-weight="bold" text-anchor="middle">gunzip</text>
  <line x1="416" y1="80" x2="434" y2="80" stroke="#f85149" stroke-width="1.5"/>
  <polygon points="431,75 444,80 431,85" fill="#f85149"/>
  <line x1="524" y1="80" x2="542" y2="80" stroke="#f85149" stroke-width="1.5"/>
  <polygon points="539,75 552,80 539,85" fill="#f85149"/>

  <!-- Restored file -->
  <rect x="552" y="40" width="110" height="80" rx="8" fill="#161b22" stroke="#8b949e" stroke-width="1.5"/>
  <text x="607" y="70" fill="#e6edf3" font-size="11" font-weight="bold" text-anchor="middle">data.csv</text>
  <text x="607" y="88" fill="#8b949e" font-size="10" text-anchor="middle">500 MB</text>
  <text x="607" y="106" fill="#3fb950" font-size="9" text-anchor="middle">bit-for-bit identical</text>

  <!-- zcat path -->
  <path d="M 351 120 Q 351 140 420 140 Q 490 140 490 120" fill="none" stroke="#d29922" stroke-width="1.5" stroke-dasharray="4,3"/>
  <text x="421" y="148" fill="#d29922" font-size="9" text-anchor="middle">zcat: read WITHOUT decompressing</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 1 — gzip / gunzip / zcat: Every Option</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── gzip (compress) ─────────────────────────────────────</span>
$ <span style="color:#3fb950;">gzip data.csv</span>
<span style="color:#6a9955;">← Compresses data.csv → data.csv.gz
← DELETES the original file by default!
← The .gz file replaces data.csv</span>

$ ls
data.csv.gz    <span style="color:#6a9955;">← original is GONE</span>

<span style="color:#6a9955;"># gzip -k  ─ keep original (don't delete)</span>
$ <span style="color:#3fb950;">gzip -k data.csv</span>
$ ls
data.csv       <span style="color:#6a9955;">← original still exists</span>
data.csv.gz    <span style="color:#6a9955;">← AND compressed version created</span>

<span style="color:#6a9955;"># gzip -1 to -9  ─ compression level</span>
$ <span style="color:#3fb950;">gzip -1 data.csv</span>     <span style="color:#6a9955;">← fastest compression, biggest file</span>
$ <span style="color:#3fb950;">gzip -6 data.csv</span>     <span style="color:#6a9955;">← DEFAULT level (balance of speed/size)</span>
$ <span style="color:#3fb950;">gzip -9 data.csv</span>     <span style="color:#6a9955;">← maximum compression, slowest
                        Level 1: fast but 65% size reduction
                        Level 6: default, ~75% size reduction
                        Level 9: slow but ~80% size reduction
                        For text data: -6 vs -9 difference is small</span>

<span style="color:#6a9955;"># gzip -r  ─ recursive (compress ALL files in directory)</span>
$ <span style="color:#3fb950;">gzip -r /data/sensors/</span>
<span style="color:#6a9955;">← Compresses every file in /data/sensors/ and subdirs
← Each file becomes file.gz (each compressed separately)
← THIS is what Ravi ran at 4:02 PM on 500GB of data</span>

<span style="color:#6a9955;"># gzip -v  ─ verbose (show compression ratio)</span>
$ <span style="color:#3fb950;">gzip -v customers.csv</span>
customers.csv:   90.6% -- replaced with customers.csv.gz
<span style="color:#6a9955;">← Shows filename, compression ratio, and what it became
← 90.6% reduction on JSON/CSV is typical for text data</span>

$ <span style="color:#3fb950;">gzip -v -r /data/logs/</span>
access.log:      72.3% -- replaced with access.log.gz
error.log:       68.1% -- replaced with error.log.gz
app.log:         81.4% -- replaced with app.log.gz
<span style="color:#6a9955;">← See compression ratio for each file when doing bulk compress</span>

<span style="color:#6a9955;"># gzip -l  ─ list compression info (without decompressing)</span>
$ <span style="color:#3fb950;">gzip -l customers.csv.gz</span>
         compressed        uncompressed  ratio uncompressed_name
             47832             524288    90.9% customers.csv
<span style="color:#6a9955;">← Shows original size, compressed size, ratio — NO decompression
← Essential: check file size before deciding whether to extract</span>

<span style="color:#6a9955;"># gzip -t  ─ test integrity (verify file is not corrupted)</span>
$ <span style="color:#3fb950;">gzip -t backup.tar.gz</span>
<span style="color:#6a9955;">← No output = file is OK
← Error output = file is CORRUPTED (network transfer was incomplete)
← ALWAYS run this after downloading compressed files!</span>

$ <span style="color:#3fb950;">gzip -tv backup.tar.gz</span>
backup.tar.gz:   OK    <span style="color:#6a9955;">← -v shows OK explicitly</span>

<span style="color:#6a9955;"># ── gunzip (decompress) ─────────────────────────────────</span>
$ <span style="color:#3fb950;">gunzip customers.csv.gz</span>
<span style="color:#6a9955;">← Decompresses → customers.csv, DELETES .gz file</span>

$ <span style="color:#3fb950;">gunzip -k customers.csv.gz</span>
<span style="color:#6a9955;">← Keep .gz file AND create decompressed version</span>

$ <span style="color:#3fb950;">gunzip -c customers.csv.gz > /tmp/customers_temp.csv</span>
<span style="color:#6a9955;">← -c (stdout): send decompressed output to stdout, DON'T delete .gz
← Redirect to new location — original .gz intact</span>

<span style="color:#6a9955;"># ── zcat ─ read compressed file WITHOUT extracting ───────</span>
$ <span style="color:#3fb950;">zcat customers.csv.gz</span>
id,name,department,salary
1,Alice,Engineering,85000
2,Bob,Marketing,62000
<span style="color:#6a9955;">← Outputs decompressed content to stdout — .gz file UNCHANGED
← Like: gunzip -c customers.csv.gz</span>

$ <span style="color:#3fb950;">zcat huge_log.gz | grep "ERROR" | head -20</span>
<span style="color:#6a9955;">← Search INSIDE compressed log without extracting it!
← Saves disk space AND time — no 4GB extracted file</span>

$ <span style="color:#3fb950;">zcat customers.csv.gz | wc -l</span>
2000001    <span style="color:#6a9955;">← count lines without extracting</span>

$ <span style="color:#3fb950;">zcat data_jan.csv.gz data_feb.csv.gz data_mar.csv.gz | awk -F',' '{sum+=$4} END{print sum}'</span>
<span style="color:#6a9955;">← Sum salary across 3 compressed files — never touches disk
← Pure streaming: decompress | process | result</span>

<span style="color:#6a9955;"># ── zgrep ─ grep INSIDE compressed files ─────────────────</span>
$ <span style="color:#3fb950;">zgrep "ERROR" /var/log/old_logs.gz</span>
<span style="color:#6a9955;">← Equivalent to: zcat old_logs.gz | grep "ERROR"
← Slightly faster: skips the intermediate pipe</span>

$ <span style="color:#3fb950;">zgrep -c "timeout" /var/log/archive/*.gz</span>
/var/log/archive/jan.gz:   42
/var/log/archive/feb.gz:   18
/var/log/archive/mar.gz:  127
<span style="color:#6a9955;">← Count timeouts per month across compressed log archives!</span></pre>
</div>

<div class="deep-dive-box" style="margin-top:12px;">
  <h4>🔬 How DEFLATE Compression Works</h4>
  <p>gzip uses the <strong>DEFLATE algorithm</strong> — a combination of two techniques: (1) <strong>LZ77</strong> finds repeated sequences of bytes and replaces them with back-references ("same as 50 bytes ago, length 12"), and (2) <strong>Huffman coding</strong> assigns shorter bit patterns to frequent characters. Text data compresses extremely well because words repeat constantly. Binary data (already compressed images, videos, encrypted files) compresses poorly — often growing slightly due to metadata overhead.</p>
</div>`,
      interactiveExample: {
        code: `# Check compression ratio before committing
gzip -v -k sample.csv

# Compress entire log directory, keeping originals
gzip -9 -k -r /var/log/old_logs/

# Search a compressed log without extracting
zcat /var/log/archive/march.log.gz | grep "database" | wc -l

# Test downloaded file integrity
gzip -t downloaded_backup.tar.gz && echo "File is OK" || echo "CORRUPTED!"`,
        explanation: "The -t flag for integrity testing is critical in data engineering — always verify compressed files after downloading from S3, SFTP, or network transfer. A silent corruption can cause a pipeline to fail hours later with confusing errors."
      }
    },

    // ════════════════════════════════════════════════════════════
    // BZIP2 / XZ
    // ════════════════════════════════════════════════════════════
    {
      id: "bzip2-xz-section",
      title: "bzip2 & xz — When You Need Smaller Files",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Tuesday Decision:</strong>
  <p>After the Friday win, Ravi decided to set up proper archival. The sensor data needed to live in cold storage for 7 years. He ran benchmarks: same 500GB dataset, three algorithms. The results changed his archival strategy entirely.</p>
</div>

<!-- COMPRESSION ALGORITHM COMPARISON -->
<div class="visual-container">
<svg width="680" height="230" viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="230" fill="#0d1117" rx="12"/>
  <text x="340" y="22" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">Compression Algorithm Comparison — Same 500GB Dataset</text>

  <!-- Headers -->
  <text x="100" y="46" fill="#8b949e" font-size="10" font-weight="bold" text-anchor="middle">Algorithm</text>
  <text x="240" y="46" fill="#8b949e" font-size="10" font-weight="bold" text-anchor="middle">Speed</text>
  <text x="370" y="46" fill="#8b949e" font-size="10" font-weight="bold" text-anchor="middle">Output Size</text>
  <text x="490" y="46" fill="#8b949e" font-size="10" font-weight="bold" text-anchor="middle">Ratio</text>
  <text x="600" y="46" fill="#8b949e" font-size="10" font-weight="bold" text-anchor="middle">Best For</text>

  <!-- gzip row -->
  <rect x="10" y="52" width="660" height="44" rx="4" fill="#0f2a0f" opacity="0.5"/>
  <text x="100" y="78" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">gzip</text>
  <!-- Speed bar -->
  <rect x="170" y="64" width="120" height="16" rx="3" fill="#3fb950"/>
  <text x="300" y="76" fill="#3fb950" font-size="9">██████ Fast (2 min)</text>
  <!-- Size bar -->
  <rect x="310" y="64" width="80" height="16" rx="3" fill="#3fb950" opacity="0.7"/>
  <text x="430" y="76" fill="#3fb950" font-size="9">47 GB</text>
  <text x="490" y="78" fill="#3fb950" font-size="11" text-anchor="middle">90.6%</text>
  <text x="600" y="78" fill="#8b949e" font-size="9" text-anchor="middle">Daily work, pipelines</text>

  <!-- bzip2 row -->
  <rect x="10" y="100" width="660" height="44" rx="4" fill="#0d1f3c" opacity="0.5"/>
  <text x="100" y="126" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">bzip2</text>
  <rect x="170" y="112" width="65" height="16" rx="3" fill="#58a6ff"/>
  <text x="300" y="124" fill="#58a6ff" font-size="9">███ Medium (11 min)</text>
  <rect x="310" y="112" width="55" height="16" rx="3" fill="#58a6ff" opacity="0.7"/>
  <text x="430" y="124" fill="#58a6ff" font-size="9">38 GB</text>
  <text x="490" y="126" fill="#58a6ff" font-size="11" text-anchor="middle">92.4%</text>
  <text x="600" y="126" fill="#8b949e" font-size="9" text-anchor="middle">Smaller than gzip</text>

  <!-- xz row -->
  <rect x="10" y="148" width="660" height="44" rx="4" fill="#1a0f2a" opacity="0.5"/>
  <text x="100" y="174" fill="#bc8cff" font-size="12" font-weight="bold" text-anchor="middle">xz</text>
  <rect x="170" y="160" width="25" height="16" rx="3" fill="#bc8cff"/>
  <text x="300" y="172" fill="#bc8cff" font-size="9">█ Slow (48 min)</text>
  <rect x="310" y="160" width="33" height="16" rx="3" fill="#bc8cff" opacity="0.7"/>
  <text x="430" y="172" fill="#bc8cff" font-size="9">23 GB</text>
  <text x="490" y="174" fill="#bc8cff" font-size="11" text-anchor="middle">95.4%</text>
  <text x="600" y="174" fill="#8b949e" font-size="9" text-anchor="middle">Cold storage, archives</text>

  <text x="340" y="214" fill="#d29922" font-size="10" text-anchor="middle">⚠️  All algorithms are LOSSLESS — original data is perfectly restored</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 2 — bzip2 & xz: All Options</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── bzip2 (Burrows-Wheeler algorithm) ───────────────────</span>
$ <span style="color:#58a6ff;">bzip2 data.csv</span>
<span style="color:#6a9955;">← Compresses → data.csv.bz2, deletes original (same as gzip)
← ~15-20% smaller than gzip, but 3-5x slower to compress</span>

$ <span style="color:#58a6ff;">bzip2 -k data.csv</span>         <span style="color:#6a9955;">← keep original</span>
$ <span style="color:#58a6ff;">bzip2 -v data.csv</span>         <span style="color:#6a9955;">← verbose: show ratio</span>
$ <span style="color:#58a6ff;">bzip2 -9 data.csv</span>         <span style="color:#6a9955;">← maximum compression (default is already high)</span>
$ <span style="color:#58a6ff;">bzip2 -t backup.bz2</span>       <span style="color:#6a9955;">← test integrity</span>

<span style="color:#6a9955;"># bunzip2 (decompress)</span>
$ <span style="color:#58a6ff;">bunzip2 data.csv.bz2</span>      <span style="color:#6a9955;">← restore data.csv</span>
$ <span style="color:#58a6ff;">bunzip2 -k data.csv.bz2</span>   <span style="color:#6a9955;">← keep .bz2, also create data.csv</span>

<span style="color:#6a9955;"># bzcat ─ read .bz2 without extracting (like zcat for bzip2)</span>
$ <span style="color:#58a6ff;">bzcat archive.bz2 | grep "ERROR"</span>
$ <span style="color:#58a6ff;">bzcat data.csv.bz2 | head -5</span>
<span style="color:#6a9955;">← Search/preview bz2 files without decompressing to disk</span>

<span style="color:#6a9955;"># ── xz (LZMA2 algorithm — maximum compression) ──────────</span>
$ <span style="color:#bc8cff;">xz data.csv</span>
<span style="color:#6a9955;">← Compresses → data.csv.xz
← Smallest file size of the three — but slowest
← Used for: software releases (.tar.xz), cold storage archives</span>

$ <span style="color:#bc8cff;">xz -k data.csv</span>             <span style="color:#6a9955;">← keep original</span>
$ <span style="color:#bc8cff;">xz -v data.csv</span>             <span style="color:#6a9955;">← show progress and ratio</span>
$ <span style="color:#bc8cff;">xz -T 4 data.csv</span>           <span style="color:#6a9955;">← use 4 CPU threads (MUCH faster on multi-core!)</span>
$ <span style="color:#bc8cff;">xz -0 data.csv</span>             <span style="color:#6a9955;">← fastest xz (level 0 = like gzip speed)</span>
$ <span style="color:#bc8cff;">xz -9 data.csv</span>             <span style="color:#6a9955;">← maximum compression (default is -6)</span>
$ <span style="color:#bc8cff;">xz -t archive.xz</span>           <span style="color:#6a9955;">← test integrity</span>

<span style="color:#6a9955;"># unxz (decompress)</span>
$ <span style="color:#bc8cff;">unxz data.csv.xz</span>           <span style="color:#6a9955;">← restore data.csv</span>
$ <span style="color:#bc8cff;">xz -d data.csv.xz</span>          <span style="color:#6a9955;">← same as unxz (-d = decompress)</span>

<span style="color:#6a9955;"># xzcat ─ read without extracting</span>
$ <span style="color:#bc8cff;">xzcat data.csv.xz | head -5</span>

<span style="color:#d29922;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WHEN TO USE EACH:
  gzip  → Daily work: logs, CSVs, pipeline temp files
          Fast compress, fast decompress, universally supported
  bzip2 → When 15-20% smaller than gzip matters more than speed
          Still widely supported, slower than gzip
  xz    → Cold storage: archives you compress ONCE and rarely read
          Maximum compression, multi-threaded with -T flag
          Used by Linux distros for .tar.xz release packages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span></pre>
</div>`
    },

    // ════════════════════════════════════════════════════════════
    // ZIP / UNZIP
    // ════════════════════════════════════════════════════════════
    {
      id: "zip-section",
      title: "zip & unzip — Cross-Platform Archives with Passwords",
      content: `
<div class="story-box">
  <strong>📖 Wednesday — Sharing with the Windows Team:</strong>
  <p>Ravi needed to send the quarterly report data to the business analytics team — they were on Windows. He couldn't send a .tar.gz (they'd need 7-Zip or WSL). He used <code>zip</code> with a password: <code>zip -er Q1_report.zip Q1_data/</code>. Native Windows extraction, password-protected.</p>
</div>

<div class="info-box">
  <strong>zip vs tar.gz — The Fundamental Difference:</strong>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px;">
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #d29922;">
      <strong style="color:#d29922;">zip</strong>
      <p style="font-size:12px;margin:6px 0 0;">• Each file compressed individually<br>• Can extract single files without reading whole archive<br>• Native on Windows/macOS<br>• Supports passwords<br>• Less efficient compression than tar+gzip</p>
    </div>
    <div style="background:#0d1117;padding:10px;border-radius:6px;border-left:3px solid #bc8cff;">
      <strong style="color:#bc8cff;">tar.gz</strong>
      <p style="font-size:12px;margin:6px 0 0;">• All files bundled, then compressed together<br>• Better compression (shared dictionary across files)<br>• Native on Linux/macOS<br>• No built-in encryption<br>• Must extract everything to access one file</p>
    </div>
  </div>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 3 — zip & unzip: All Options</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── zip (create archives) ───────────────────────────────</span>
$ <span style="color:#d29922;">zip archive.zip file1.csv file2.csv</span>
  adding: file1.csv (deflated 72%)
  adding: file2.csv (deflated 68%)
<span style="color:#6a9955;">← Creates archive.zip containing both files
← Shows compression ratio per file</span>

<span style="color:#6a9955;"># zip -r  ─ include directories recursively</span>
$ <span style="color:#d29922;">zip -r project.zip project_dir/</span>
<span style="color:#6a9955;">← Zips entire directory with subdirectories
← MOST COMMON zip usage</span>

<span style="color:#6a9955;"># zip compression levels (-0 to -9)</span>
$ <span style="color:#d29922;">zip -9 -r archive.zip data/</span>     <span style="color:#6a9955;">← maximum compression (slow)</span>
$ <span style="color:#d29922;">zip -0 -r archive.zip data/</span>     <span style="color:#6a9955;">← store only (no compression, just bundle)</span>
$ <span style="color:#d29922;">zip -1 -r archive.zip data/</span>     <span style="color:#6a9955;">← fastest compression</span>

<span style="color:#6a9955;"># zip -e  ─ encrypt with password (prompts interactively)</span>
$ <span style="color:#d29922;">zip -e confidential.zip salary_data.csv</span>
Enter password:
Verify password:
  adding: salary_data.csv (deflated 71%)
<span style="color:#6a9955;">← Password-encrypted zip — opens natively on Windows
← Uses older ZipCrypto encryption (not the strongest)
← For stronger encryption: use -P flag with AES (see below)</span>

<span style="color:#6a9955;"># zip -er  ─ encrypt recursive directory</span>
$ <span style="color:#d29922;">zip -er Q1_report.zip Q1_data/</span>
<span style="color:#6a9955;">← THIS is what Ravi used for the Windows team</span>

<span style="color:#6a9955;"># zip -u  ─ update (only add changed/new files)</span>
$ <span style="color:#d29922;">zip -u archive.zip new_file.csv</span>
<span style="color:#6a9955;">← Only adds files newer than what's in the archive
← Efficient incremental archiving</span>

<span style="color:#6a9955;"># zip -d  ─ delete file from existing archive</span>
$ <span style="color:#d29922;">zip -d archive.zip unwanted_file.csv</span>

<span style="color:#6a9955;"># zip -x  ─ exclude files matching pattern</span>
$ <span style="color:#d29922;">zip -r project.zip project/ -x "*.pyc" -x "__pycache__/*" -x ".git/*"</span>
<span style="color:#6a9955;">← Zip project but exclude Python cache and git history
← CRITICAL for packaging Python projects cleanly</span>

<span style="color:#6a9955;"># zip -s  ─ split into multiple volumes</span>
$ <span style="color:#d29922;">zip -s 100m -r split_archive.zip large_data/</span>
split_archive.z01    <span style="color:#6a9955;">← Part 1 (100 MB)</span>
split_archive.z02    <span style="color:#6a9955;">← Part 2 (100 MB)</span>
split_archive.zip    <span style="color:#6a9955;">← Final part (remainder) + central directory</span>
<span style="color:#6a9955;">← Split large archives for email limits, FAT32, or USB drives
← Sizes: 10m (10 MB), 100m (100 MB), 1g (1 GB)</span>

<span style="color:#6a9955;"># ── unzip (extract) ─────────────────────────────────────</span>
$ <span style="color:#d29922;">unzip archive.zip</span>
<span style="color:#6a9955;">← Extract to current directory</span>

$ <span style="color:#d29922;">unzip archive.zip -d /target/directory/</span>
<span style="color:#6a9955;">← Extract to specific directory
← ALWAYS use -d to avoid cluttering current dir!</span>

$ <span style="color:#d29922;">unzip -l archive.zip</span>
  Length      Date    Time    Name
---------  ---------- -----   ----
   524288  2024-03-10 08:00   data/customers.csv
    12288  2024-03-10 08:00   data/orders.csv
---------                     -------
   536576                     2 files
<span style="color:#6a9955;">← List contents WITHOUT extracting
← See what's inside before committing to extract</span>

$ <span style="color:#d29922;">unzip archive.zip specific_file.csv</span>
<span style="color:#6a9955;">← Extract ONLY one specific file (zip's unique advantage over tar)</span>

$ <span style="color:#d29922;">unzip -p archive.zip data.csv | head -5</span>
<span style="color:#6a9955;">← -p (pipe): extract to stdout without writing to disk
← Like zcat but for zip files</span>

$ <span style="color:#d29922;">unzip -o archive.zip</span>        <span style="color:#6a9955;">← overwrite without asking</span>
$ <span style="color:#d29922;">unzip -n archive.zip</span>        <span style="color:#6a9955;">← never overwrite existing files</span>

$ <span style="color:#d29922;">unzip -v archive.zip</span>
<span style="color:#6a9955;">← Verbose listing: shows compression method, ratio, CRC per file</span>

<span style="color:#6a9955;"># Test zip integrity</span>
$ <span style="color:#d29922;">unzip -t archive.zip</span>
    testing: data/customers.csv   OK
No errors detected in compressed data in archive.zip.
<span style="color:#6a9955;">← Test ALL files in archive without extracting</span></pre>
</div>`,
      interactiveExample: {
        code: `# Package Python project cleanly (exclude cache/git)
zip -r9 project_v1.2.zip my_project/ -x "*.pyc" -x "__pycache__/*" -x ".git/*" -x "*.log"

# Inspect what's in a zip before extracting
unzip -l mystery_archive.zip

# Extract a single file from large archive
unzip large_dataset.zip data/customers_2024.csv -d /tmp/

# Test archive integrity before sending
unzip -t backup.zip && echo "Archive OK" || echo "CORRUPTED!"`,
        explanation: "zip -x patterns are critical for clean project packaging — Python projects contain .pyc files and __pycache__ directories that shouldn't be shared. The unzip -p pipe trick lets you process a file from inside a zip without extracting to disk, saving space in constrained environments."
      }
    },

    // ════════════════════════════════════════════════════════════
    // TAR — THE MAIN EVENT
    // ════════════════════════════════════════════════════════════
    {
      id: "tar-section",
      title: "tar — The Swiss Army Knife of Linux Archiving",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Production Backup — Thursday Morning:</strong>
  <p>After the Friday incident, Ravi set up a proper backup system. Every night at midnight: <code>tar -czvf /backups/data_$(date +%Y%m%d).tar.gz /data/processed/</code>. Automatic, dated backups of all processed data. When a junior developer accidentally deleted a folder on a Thursday, Ravi had Wednesday's backup restored in 3 minutes.</p>
</div>

<p><code>tar</code> (Tape Archive) is the universal Linux archiving tool. Its name comes from the days of magnetic tape backups, but it's used everywhere today. Master these flags and you'll never be stuck.</p>

<!-- TAR FLAGS MNEMONIC SVG -->
<div class="visual-container">
<svg width="680" height="140" viewBox="0 0 680 140" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="140" fill="#0d1117" rx="12"/>
  <text x="340" y="22" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">tar Flag Mnemonic — "Can Xtract Zipped Jars Very Fast"</text>

  <rect x="20"  y="36" width="80" height="80" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="2"/>
  <text x="60"  y="68" fill="#3fb950" font-size="26" font-weight="bold" text-anchor="middle">c</text>
  <text x="60"  y="88" fill="#8b949e" font-size="10" text-anchor="middle">Create</text>
  <text x="60"  y="102" fill="#8b949e" font-size="9" text-anchor="middle">archive</text>

  <rect x="112" y="36" width="80" height="80" rx="8" fill="#2a0d0d" stroke="#f85149" stroke-width="2"/>
  <text x="152" y="68" fill="#f85149" font-size="26" font-weight="bold" text-anchor="middle">x</text>
  <text x="152" y="88" fill="#8b949e" font-size="10" text-anchor="middle">eXtract</text>
  <text x="152" y="102" fill="#8b949e" font-size="9" text-anchor="middle">files</text>

  <rect x="204" y="36" width="80" height="80" rx="8" fill="#1a1a0a" stroke="#d29922" stroke-width="2"/>
  <text x="244" y="68" fill="#d29922" font-size="26" font-weight="bold" text-anchor="middle">t</text>
  <text x="244" y="88" fill="#8b949e" font-size="10" text-anchor="middle">lisT</text>
  <text x="244" y="102" fill="#8b949e" font-size="9" text-anchor="middle">contents</text>

  <rect x="296" y="36" width="80" height="80" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="1.5"/>
  <text x="336" y="68" fill="#3fb950" font-size="26" font-weight="bold" text-anchor="middle">z</text>
  <text x="336" y="88" fill="#8b949e" font-size="10" text-anchor="middle">gZip</text>
  <text x="336" y="102" fill="#8b949e" font-size="9" text-anchor="middle">.tar.gz</text>

  <rect x="388" y="36" width="80" height="80" rx="8" fill="#0d1f3c" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="428" y="68" fill="#58a6ff" font-size="26" font-weight="bold" text-anchor="middle">j</text>
  <text x="428" y="88" fill="#8b949e" font-size="10" text-anchor="middle">bzip2</text>
  <text x="428" y="102" fill="#8b949e" font-size="9" text-anchor="middle">.tar.bz2</text>

  <rect x="480" y="36" width="80" height="80" rx="8" fill="#1a0f2a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="520" y="68" fill="#bc8cff" font-size="26" font-weight="bold" text-anchor="middle">J</text>
  <text x="520" y="88" fill="#8b949e" font-size="10" text-anchor="middle">xz (big J)</text>
  <text x="520" y="102" fill="#8b949e" font-size="9" text-anchor="middle">.tar.xz</text>

  <rect x="572" y="36" width="80" height="80" rx="8" fill="#0f2a0f" stroke="#3fb950" stroke-width="1.5"/>
  <text x="612" y="68" fill="#3fb950" font-size="26" font-weight="bold" text-anchor="middle">v</text>
  <text x="612" y="88" fill="#8b949e" font-size="10" text-anchor="middle">Verbose</text>
  <text x="612" y="102" fill="#8b949e" font-size="9" text-anchor="middle">show files</text>

  <text x="340" y="130" fill="#d29922" font-size="9" text-anchor="middle">f = File  (ALWAYS last — takes filename as argument)</text>
</svg>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 4 — tar: Create, Extract, List, Update — Every Combination</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ════ CREATE ARCHIVES ════════════════════════════════════</span>

<span style="color:#6a9955;"># tar -cvf  ─ create uncompressed archive</span>
$ <span style="color:#3fb950;">tar -cvf archive.tar project_dir/</span>
project_dir/
project_dir/data.csv
project_dir/scripts/etl.py
project_dir/config/settings.yml
<span style="color:#6a9955;">← c=create, v=verbose (list files), f=filename
← Creates archive.tar — same size as source (no compression)
← Use when speed matters more than size (same filesystem)</span>

<span style="color:#6a9955;"># tar -czvf  ─ create + gzip compress (.tar.gz)</span>
$ <span style="color:#3fb950;">tar -czvf backup.tar.gz /data/processed/</span>
<span style="color:#6a9955;">← z=gzip: creates backup.tar.gz
← THE most common archive format on Linux
← "Tarball" = tar + gzip
← Ravi's nightly backup command uses this</span>

<span style="color:#6a9955;"># tar -cjvf  ─ create + bzip2 compress (.tar.bz2)</span>
$ <span style="color:#3fb950;">tar -cjvf archive.tar.bz2 /data/sensors/</span>
<span style="color:#6a9955;">← j=bzip2: smaller than gzip, slower</span>

<span style="color:#6a9955;"># tar -cJvf  ─ create + xz compress (.tar.xz)</span>
$ <span style="color:#3fb950;">tar -cJvf archive.tar.xz /data/cold_storage/</span>
<span style="color:#6a9955;">← J=xz (capital J): maximum compression
← Ravi's cold storage archival command</span>

<span style="color:#6a9955;"># Backup with date in filename ─ PROFESSIONAL PATTERN</span>
$ <span style="color:#3fb950;">tar -czvf backup_$(date +%Y%m%d_%H%M%S).tar.gz /data/</span>
backup_20240310_040000.tar.gz
<span style="color:#6a9955;">← date +%Y%m%d_%H%M%S generates: 20240310_040000
← Each backup has unique timestamp in filename
← Safe to run multiple times — never overwrites</span>

<span style="color:#6a9955;"># tar with multiple sources</span>
$ <span style="color:#3fb950;">tar -czvf weekly_backup.tar.gz /data/processed/ /etc/pipeline/ /var/log/etl/</span>
<span style="color:#6a9955;">← Archive MULTIPLE directories into one tar.gz</span>

<span style="color:#6a9955;"># tar --exclude  ─ exclude files/patterns</span>
$ <span style="color:#3fb950;">tar -czvf clean_backup.tar.gz /data/ --exclude="*.tmp" --exclude="__pycache__" --exclude="/data/raw/"</span>
<span style="color:#6a9955;">← Exclude temp files, Python cache, and raw data subdir
← Multiple --exclude flags are allowed</span>

<span style="color:#6a9955;"># ════ LIST CONTENTS ═══════════════════════════════════════</span>

<span style="color:#6a9955;"># tar -tvf  ─ list archive contents (without extracting)</span>
$ <span style="color:#3fb950;">tar -tvf backup.tar.gz</span>
drwxr-xr-x ravi/data    0 2024-03-10 00:00 data/
-rw-r--r-- ravi/data 524288 2024-03-10 08:00 data/customers.csv
-rw-r--r-- ravi/data 12288 2024-03-09 22:00 data/orders.csv
<span style="color:#6a9955;">← Shows permissions, owner, size, date, path of each file
← t=list, v=verbose (show details), f=filename
← NO extraction happens — like unzip -l</span>

$ <span style="color:#3fb950;">tar -tf backup.tar.gz | grep "\.csv$"</span>
<span style="color:#6a9955;">← List only CSV files inside the archive
← Pipe tar list output to grep for filtering</span>

$ <span style="color:#3fb950;">tar -tf backup.tar.gz | wc -l</span>
<span style="color:#6a9955;">← Count total files in archive</span>

<span style="color:#6a9955;"># ════ EXTRACT ARCHIVES ════════════════════════════════════</span>

<span style="color:#6a9955;"># tar -xzvf  ─ extract gzipped archive</span>
$ <span style="color:#3fb950;">tar -xzvf backup.tar.gz</span>
<span style="color:#6a9955;">← Extracts to CURRENT directory
← x=extract, z=gzip, v=verbose, f=filename</span>

$ <span style="color:#3fb950;">tar -xzvf backup.tar.gz -C /restore/location/</span>
<span style="color:#6a9955;">← -C: extract to SPECIFIC directory
← ALWAYS use -C to control where files land!
← Without -C: files extracted to current dir (messy)</span>

$ <span style="color:#3fb950;">tar -xzvf backup.tar.gz -C /tmp/ data/customers.csv</span>
<span style="color:#6a9955;">← Extract ONLY ONE specific file from the archive!
← Much faster than extracting everything then copying one file
← data/customers.csv is the path inside the archive (from tar -t)</span>

<span style="color:#6a9955;"># Auto-detect compression format</span>
$ <span style="color:#3fb950;">tar -xvf archive.tar.gz</span>     <span style="color:#6a9955;">← tar auto-detects gzip</span>
$ <span style="color:#3fb950;">tar -xvf archive.tar.bz2</span>    <span style="color:#6a9955;">← auto-detects bzip2</span>
$ <span style="color:#3fb950;">tar -xvf archive.tar.xz</span>     <span style="color:#6a9955;">← auto-detects xz</span>
$ <span style="color:#3fb950;">tar -xvf archive.tar</span>        <span style="color:#6a9955;">← uncompressed</span>
<span style="color:#6a9955;">← Modern tar (GNU tar) auto-detects format — no z/j/J needed for extraction!</span>

<span style="color:#6a9955;"># ════ UPDATE / APPEND ═════════════════════════════════════</span>

<span style="color:#6a9955;"># tar -u  ─ update (add files newer than archive)</span>
$ <span style="color:#3fb950;">tar -uvf archive.tar new_file.csv</span>
<span style="color:#6a9955;">← Only adds file if newer than version already in archive
← NOTE: -u only works with UNCOMPRESSED .tar (not .tar.gz)</span>

<span style="color:#6a9955;"># tar -r  ─ append files to existing archive</span>
$ <span style="color:#3fb950;">tar -rvf archive.tar additional_file.csv</span>
<span style="color:#6a9955;">← Appends file to existing archive
← NOTE: also only works with uncompressed .tar</span>

<span style="color:#6a9955;"># ════ PROFESSIONAL PATTERNS ═══════════════════════════════</span>

<span style="color:#6a9955;"># Backup and verify in one line</span>
$ <span style="color:#3fb950;">tar -czvf backup.tar.gz /data/ && tar -tvf backup.tar.gz | wc -l</span>
847    <span style="color:#6a9955;">← Created backup AND immediately verified file count</span>

<span style="color:#6a9955;"># Streaming tar to remote server (no local temp file!)</span>
$ <span style="color:#3fb950;">tar -czvf - /data/ | ssh user@remote "cat > /backups/data.tar.gz"</span>
<span style="color:#6a9955;">← - (dash) as filename = stdout
← Pipe directly to SSH → saved on remote server
← Never writes .tar.gz locally at all!</span>

<span style="color:#6a9955;"># Extract from remote server (streaming)</span>
$ <span style="color:#3fb950;">ssh user@remote "cat /backups/data.tar.gz" | tar -xzvf - -C /local/restore/</span>
<span style="color:#6a9955;">← Stream from remote, extract locally — no temp file</span>

<span style="color:#6a9955;"># Progress bar while archiving (with pv installed)</span>
$ <span style="color:#3fb950;">tar -czvf - /data/ | pv | gzip > backup.tar.gz</span>
<span style="color:#6a9955;">← pv = pipe viewer, shows progress and speed</span>

<span style="color:#6a9955;"># See archive size during creation</span>
$ <span style="color:#3fb950;">tar -czvf backup.tar.gz /data/ && ls -lh backup.tar.gz</span></pre>
</div>

<div class="deep-dive-box" style="margin-top:12px;">
  <h4>🔬 Why tar + gzip Compresses Better than zip</h4>
  <p>When zip compresses, it treats each file independently — it can't use patterns from one file to compress another. When tar bundles first, then gzip compresses, gzip has a view of the ENTIRE dataset. If two CSV files have the same column headers, that repeated string is learned once and reused — resulting in significantly better overall compression. This is why a 100-file directory compressed as <code>.tar.gz</code> is always smaller than the same 100 files as a <code>.zip</code>.</p>
</div>`,
      interactiveExample: {
        code: `# Create dated backup of data directory
tar -czvf backup_$(date +%Y%m%d).tar.gz /data/processed/ --exclude="*.tmp"

# List what's in a backup before restoring
tar -tvf backup_20240310.tar.gz | head -20

# Restore only one specific file from backup
tar -xzvf backup_20240310.tar.gz -C /tmp/ data/customers.csv

# Stream backup to remote server (no local temp file)
tar -czvf - /data/ | ssh ravi@backup-server "cat > ~/backups/data_$(date +%Y%m%d).tar.gz"`,
        explanation: "The dated backup pattern ($(date +%Y%m%d)) is used in production cron jobs worldwide. The streaming tar via SSH pattern is crucial when the local disk doesn't have space for a temp file — you compress and transfer simultaneously."
      }
    },

    // ════════════════════════════════════════════════════════════
    // SPLIT / STRINGS
    // ════════════════════════════════════════════════════════════
    {
      id: "split-strings-section",
      title: "split & strings — Handling Very Large and Binary Files",
      content: `
<div class="story-box">
  <strong>📖 Ravi's Thursday Problem:</strong>
  <p>The 47GB compressed archive needed to move to an external drive — but the drive was FAT32 formatted (max 4GB per file, because it was shared with Windows systems). He used <code>split</code> to break it into 3.9GB chunks, moved them, and used <code>cat</code> to reassemble. Old technique, still essential.</p>
</div>

<div class="terminal-block">
  <div class="terminal-header">
    <span class="terminal-dot" style="background:#ff5f56"></span>
    <span class="terminal-dot" style="background:#ffbd2e"></span>
    <span class="terminal-dot" style="background:#27c93f"></span>
    <span style="margin-left:8px;color:#888;font-size:11px;">Console 5 — split & strings: Large File Handling</span>
  </div>
  <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;background:#000a00;"><span style="color:#6a9955;"># ── split ─ cut large files into smaller pieces ──────────</span>
$ <span style="color:#3fb950;">split -b 3900m sensors_backup.tar.gz sensors_part_</span>
sensors_part_aa     <span style="color:#6a9955;">← Part 1 (3.9 GB)</span>
sensors_part_ab     <span style="color:#6a9955;">← Part 2 (3.9 GB)</span>
sensors_part_ac     <span style="color:#6a9955;">← Part 3 (3.9 GB)</span>
sensors_part_ad     <span style="color:#6a9955;">← Part 4 (remaining)</span>
<span style="color:#6a9955;">← -b = split by BYTES
← 3900m = 3900 megabytes per piece
← sensors_part_ = prefix for output filenames
← Auto-appends aa, ab, ac... to prefix
← WHY: FAT32 max file size = 4GB, email attachments, USB limits</span>

<span style="color:#6a9955;"># split by lines (for processing large text files)</span>
$ <span style="color:#3fb950;">split -l 1000000 huge_dataset.csv chunk_</span>
chunk_aa    <span style="color:#6a9955;">← first 1,000,000 lines</span>
chunk_ab    <span style="color:#6a9955;">← next 1,000,000 lines</span>
chunk_ac    <span style="color:#6a9955;">← etc.</span>
<span style="color:#6a9955;">← -l = split by LINES
← Useful for parallel processing: run awk on each chunk in parallel</span>

<span style="color:#6a9955;"># split with numeric suffixes</span>
$ <span style="color:#3fb950;">split -b 100m -d archive.tar.gz part_</span>
part_00     <span style="color:#6a9955;">← -d = numeric suffixes (00, 01, 02...) instead of aa, ab</span>
part_01
part_02
<span style="color:#6a9955;">← Easier to read order with -d flag</span>

<span style="color:#6a9955;"># split with suffix length</span>
$ <span style="color:#3fb950;">split -b 1g -a 3 large.tar.gz part_</span>
<span style="color:#6a9955;">← -a 3 = 3-character suffix (aaa, aab, aac...)
← Handles 17,576 parts (26^3) vs default 676 (26^2)</span>

<span style="color:#6a9955;"># ── REASSEMBLE split files ────────────────────────────────</span>
$ <span style="color:#3fb950;">cat sensors_part_* > sensors_backup_restored.tar.gz</span>
<span style="color:#6a9955;">← cat concatenates all parts back into one file
← The glob sensors_part_* matches all parts in alphabetical order
← Alphabetical order = correct order (aa, ab, ac...)</span>

<span style="color:#6a9955;"># Verify the reassembled file</span>
$ <span style="color:#3fb950;">gzip -t sensors_backup_restored.tar.gz && echo "Reassembly successful"</span>
Reassembly successful

$ <span style="color:#3fb950;">md5sum original.tar.gz</span>
a3f7e2b91c4d5e6f  original.tar.gz
$ <span style="color:#3fb950;">md5sum sensors_backup_restored.tar.gz</span>
a3f7e2b91c4d5e6f  sensors_backup_restored.tar.gz   <span style="color:#3fb950;">← IDENTICAL hashes!</span>
<span style="color:#6a9955;">← md5sum verifies byte-for-byte identical files
← Use sha256sum for cryptographic verification</span>

<span style="color:#6a9955;"># ── strings ─ extract readable text from binary files ────</span>
$ <span style="color:#3fb950;">strings /usr/bin/python3 | head -20</span>
/lib64/ld-linux-x86-64.so.2
GLIBC_2.3.4
...
<span style="color:#6a9955;">← strings finds sequences of printable characters in BINARY files
← Useful for: finding embedded strings, version numbers, paths</span>

$ <span style="color:#3fb950;">strings mystery_binary | grep -i "version\|copyright\|author"</span>
Version: 2.1.4
Copyright 2024 DataCorp Inc.
<span style="color:#6a9955;">← Identify what a binary file is without running it</span>

$ <span style="color:#3fb950;">strings archive.tar.gz | grep "\.csv$"</span>
<span style="color:#6a9955;">← Find CSV filenames embedded in a compressed archive!
← Less reliable than tar -t but works on partially corrupt archives</span>

$ <span style="color:#3fb950;">strings /dev/sda | grep -i "password\|secret"</span>
<span style="color:#6a9955;">← Security: find plaintext credentials stored in filesystem
← Forensic use: recover deleted file fragments</span></pre>
</div>

<div class="tip-box" style="margin-top:12px;">
  <strong>💡 Parallel Compression — Data Engineering Performance Tip:</strong>
  <p>For very large files, standard gzip uses only one CPU core. Use <code>pigz</code> (parallel gzip) to use all cores:</p>
  <div class="terminal-block" style="margin-top:8px;">
    <div class="terminal-header"><span class="terminal-dot" style="background:#ff5f56"></span><span class="terminal-dot" style="background:#ffbd2e"></span><span class="terminal-dot" style="background:#27c93f"></span></div>
    <pre style="color:#e6edf3;padding:12px;margin:0;background:#000a00;font-family:'JetBrains Mono',monospace;font-size:12px;"># Install pigz (parallel gzip)
sudo apt install pigz

# Use pigz instead of gzip with tar
tar -cvf - /data/ | pigz -9 -p 8 > backup.tar.gz
# -p 8 = use 8 CPU cores
# On an 8-core machine: 8x faster compression!

# Also works for decompression
pigz -d -p 8 backup.tar.gz</pre>
  </div>
</div>`
    },

    // ════════════════════════════════════════════════════════════
    // MASTER DECISION TABLE
    // ════════════════════════════════════════════════════════════
    {
      id: "compression-decision",
      title: "The Master Decision Guide — Which Tool for Which Job",
      content: `
<div class="visual-container">
<svg width="680" height="280" viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg">
  <rect width="680" height="280" fill="#0d1117" rx="12"/>
  <text x="340" y="24" fill="#e6edf3" font-size="13" font-weight="bold" text-anchor="middle">Compression Decision Tree</text>

  <!-- Root -->
  <rect x="240" y="36" width="200" height="34" rx="8" fill="#21262d" stroke="#58a6ff" stroke-width="2"/>
  <text x="340" y="58" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">What are you compressing?</text>

  <!-- Branch: Multiple files -->
  <line x1="300" y1="70" x2="160" y2="106" stroke="#3fb950" stroke-width="1.5"/>
  <rect x="60" y="106" width="200" height="30" rx="6" fill="#0f2a0f" stroke="#3fb950"/>
  <text x="160" y="126" fill="#3fb950" font-size="10" font-weight="bold" text-anchor="middle">Multiple files / directory</text>

  <!-- sub-answers for multiple files -->
  <line x1="120" y1="136" x2="100" y2="162" stroke="#3fb950" stroke-width="1"/>
  <rect x="20"  y="162" width="160" height="52" rx="6" fill="#161b22" stroke="#3fb950"/>
  <text x="100" y="180" fill="#3fb950" font-size="10" font-weight="bold" text-anchor="middle">Linux → Linux</text>
  <text x="100" y="196" fill="#e6edf3" font-size="10" font-family="monospace" text-anchor="middle">tar -czvf</text>
  <text x="100" y="210" fill="#8b949e" font-size="9" text-anchor="middle">archive.tar.gz</text>

  <line x1="195" y1="136" x2="215" y2="162" stroke="#d29922" stroke-width="1"/>
  <rect x="165" y="162" width="160" height="52" rx="6" fill="#161b22" stroke="#d29922"/>
  <text x="245" y="180" fill="#d29922" font-size="10" font-weight="bold" text-anchor="middle">Share with Windows</text>
  <text x="245" y="196" fill="#e6edf3" font-size="10" font-family="monospace" text-anchor="middle">zip -r</text>
  <text x="245" y="210" fill="#8b949e" font-size="9" text-anchor="middle">archive.zip</text>

  <!-- Branch: Single file -->
  <line x1="380" y1="70" x2="520" y2="106" stroke="#bc8cff" stroke-width="1.5"/>
  <rect x="420" y="106" width="240" height="30" rx="6" fill="#1a0f2a" stroke="#bc8cff"/>
  <text x="540" y="126" fill="#bc8cff" font-size="10" font-weight="bold" text-anchor="middle">Single file (log / CSV / data)</text>

  <line x1="475" y1="136" x2="450" y2="162" stroke="#3fb950" stroke-width="1"/>
  <rect x="358" y="162" width="144" height="52" rx="6" fill="#161b22" stroke="#3fb950"/>
  <text x="430" y="180" fill="#3fb950" font-size="10" font-weight="bold" text-anchor="middle">Daily work / fast</text>
  <text x="430" y="196" fill="#e6edf3" font-size="10" font-family="monospace" text-anchor="middle">gzip -6</text>
  <text x="430" y="210" fill="#8b949e" font-size="9" text-anchor="middle">file.gz</text>

  <line x1="595" y1="136" x2="610" y2="162" stroke="#bc8cff" stroke-width="1"/>
  <rect x="518" y="162" width="150" height="52" rx="6" fill="#161b22" stroke="#bc8cff"/>
  <text x="593" y="180" fill="#bc8cff" font-size="10" font-weight="bold" text-anchor="middle">Cold storage</text>
  <text x="593" y="196" fill="#e6edf3" font-size="10" font-family="monospace" text-anchor="middle">xz -T 4</text>
  <text x="593" y="210" fill="#8b949e" font-size="9" text-anchor="middle">file.xz (smallest)</text>

  <!-- Bottom note -->
  <rect x="20" y="232" width="640" height="36" rx="8" fill="#21262d" stroke="#30363d"/>
  <text x="340" y="248" fill="#d29922" font-size="10" font-weight="bold" text-anchor="middle">🔑 Key rule: tar bundles → gzip/bzip2/xz compresses</text>
  <text x="340" y="263" fill="#8b949e" font-size="9" text-anchor="middle">Never compress an already compressed file (image, video, zip) — it will grow larger!</text>
</svg>
</div>

<table class="comparison-table">
  <thead>
    <tr>
      <th>Format</th><th>Command to Create</th><th>Command to Extract</th><th>Size</th><th>Speed</th><th>Use Case</th>
    </tr>
  </thead>
  <tbody>
    <tr><td><code>.tar.gz</code></td><td><code>tar -czvf out.tar.gz dir/</code></td><td><code>tar -xzvf out.tar.gz</code></td><td style="color:#3fb950;">Good</td><td style="color:#3fb950;">Fast</td><td>Daily Linux archiving, CI/CD</td></tr>
    <tr><td><code>.tar.bz2</code></td><td><code>tar -cjvf out.tar.bz2 dir/</code></td><td><code>tar -xjvf out.tar.bz2</code></td><td style="color:#58a6ff;">Better</td><td style="color:#d29922;">Medium</td><td>Smaller backups, distributions</td></tr>
    <tr><td><code>.tar.xz</code></td><td><code>tar -cJvf out.tar.xz dir/</code></td><td><code>tar -xJvf out.tar.xz</code></td><td style="color:#bc8cff;">Best</td><td style="color:#f85149;">Slow</td><td>Cold storage, software releases</td></tr>
    <tr><td><code>.gz</code></td><td><code>gzip file</code></td><td><code>gunzip file.gz</code></td><td style="color:#3fb950;">Good</td><td style="color:#3fb950;">Fast</td><td>Single-file compression, logs</td></tr>
    <tr><td><code>.zip</code></td><td><code>zip -r out.zip dir/</code></td><td><code>unzip out.zip</code></td><td style="color:#d29922;">OK</td><td style="color:#3fb950;">Fast</td><td>Cross-platform, passwords, Windows</td></tr>
    <tr><td><code>.bz2</code></td><td><code>bzip2 file</code></td><td><code>bunzip2 file.bz2</code></td><td style="color:#58a6ff;">Better</td><td style="color:#d29922;">Medium</td><td>Single-file, smaller than gzip</td></tr>
    <tr><td><code>.xz</code></td><td><code>xz file</code></td><td><code>unxz file.xz</code></td><td style="color:#bc8cff;">Best</td><td style="color:#f85149;">Slow</td><td>Maximum compression single file</td></tr>
  </tbody>
</table>

<div class="warning-box" style="margin-top:12px;">
  <strong>⚠️ Never compress already-compressed files:</strong> Running <code>gzip video.mp4</code> or <code>gzip image.jpg</code> will make the file <em>larger</em> — these formats are already compressed. Applies to: <code>.mp4</code>, <code>.jpg</code>, <code>.png</code>, <code>.mp3</code>, <code>.pdf</code>, <code>.docx</code>, <code>.zip</code>, <code>.gz</code>, <code>.parquet</code>.
</div>`
    }

  ], // end sections

  // ════════════════════════════════════════════════════════════
  // PRACTICE EXERCISES
  // ════════════════════════════════════════════════════════════
  practiceExercises: [
    {
      id: "comp-ex1",
      difficulty: "Easy",
      title: "Compression Ratio Explorer",
      description: "Compress the same file with gzip levels 1, 6, and 9. Use gzip -l to compare the resulting sizes. Then use zcat to verify the content is intact without decompressing.",
      starterCode: `#!/bin/bash
# Create a test CSV with repetitive data (compresses well)
python3 -c "
import random, string
print('id,name,department,salary,city')
depts = ['Engineering','Marketing','HR','Finance','Operations']
cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Chennai']
for i in range(10000):
    name = ''.join(random.choices(string.ascii_uppercase, k=6))
    print(f'{i},{name},{random.choice(depts)},{random.randint(40000,120000)},{random.choice(cities)}')
" > employees_10k.csv

echo "Original size:"
ls -lh employees_10k.csv

echo ""
echo "Compress at level 1 (fastest):"
gzip -1 -k employees_10k.csv -c > employees_level1.gz
gzip -l employees_level1.gz

echo ""
echo "Compress at level 6 (default):"
???

echo ""
echo "Compress at level 9 (maximum):"
???

echo ""
echo "Verify content with zcat (no extraction):"
zcat employees_level1.gz | ???     # show first 3 lines
zcat employees_level1.gz | ???     # count total lines`,
      solution: `#!/bin/bash
python3 -c "
import random, string
print('id,name,department,salary,city')
depts = ['Engineering','Marketing','HR','Finance','Operations']
cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Chennai']
for i in range(10000):
    name = ''.join(random.choices(string.ascii_uppercase, k=6))
    print(f'{i},{name},{random.choice(depts)},{random.randint(40000,120000)},{random.choice(cities)}')
" > employees_10k.csv

echo "Original size:"
ls -lh employees_10k.csv

echo ""
echo "Compress at level 1 (fastest):"
gzip -1 -k employees_10k.csv -c > employees_level1.gz
gzip -l employees_level1.gz

echo ""
echo "Compress at level 6 (default):"
gzip -6 -k employees_10k.csv -c > employees_level6.gz
gzip -l employees_level6.gz

echo ""
echo "Compress at level 9 (maximum):"
gzip -9 -k employees_10k.csv -c > employees_level9.gz
gzip -l employees_level9.gz

echo ""
echo "Verify content with zcat (no extraction):"
zcat employees_level1.gz | head -3
zcat employees_level1.gz | wc -l`,
      explanation: "gzip -c writes to stdout instead of creating a file — combined with redirect > it lets you name the output file freely. The -l flag reads the gzip header to show sizes without decompressing. For text data, you'll typically see level 1 giving ~65% reduction and level 9 giving ~80% — the difference is smaller than many people expect, which is why level 6 (the default) is usually the right choice."
    },
    {
      id: "comp-ex2",
      difficulty: "Easy",
      title: "Safe Backup Creator",
      description: "Create a tar.gz backup of a directory with a timestamp in the filename, list its contents, verify its integrity, then practice extracting just one specific file from it.",
      starterCode: `#!/bin/bash
# Create test project directory
mkdir -p ~/test_project/{data,scripts,config}
echo "id,name,salary" > ~/test_project/data/employees.csv
echo "1,Alice,85000" >> ~/test_project/data/employees.csv
echo "#!/bin/bash" > ~/test_project/scripts/run.sh
echo "host: localhost" > ~/test_project/config/settings.yml

echo "=== Step 1: Create dated backup ==="
BACKUP="project_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
???                                    # create the tar.gz with date in name
echo "Created: $BACKUP"

echo ""
echo "=== Step 2: List contents ==="
???                                    # list without extracting

echo ""
echo "=== Step 3: Verify integrity ==="
???                                    # test the archive

echo ""
echo "=== Step 4: Extract only the CSV file ==="
# First find the path inside the archive
CSVPATH=$(tar -tf "$BACKUP" | grep "\.csv$")
echo "Found CSV at: $CSVPATH"
tar -xzvf "$BACKUP" -C /tmp/ "$CSVPATH"   # extract just the CSV
echo "Extracted to /tmp/$CSVPATH"`,
      solution: `#!/bin/bash
mkdir -p ~/test_project/{data,scripts,config}
echo "id,name,salary" > ~/test_project/data/employees.csv
echo "1,Alice,85000" >> ~/test_project/data/employees.csv
echo "#!/bin/bash" > ~/test_project/scripts/run.sh
echo "host: localhost" > ~/test_project/config/settings.yml

echo "=== Step 1: Create dated backup ==="
BACKUP="project_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czvf "$BACKUP" ~/test_project/
echo "Created: $BACKUP"

echo ""
echo "=== Step 2: List contents ==="
tar -tvf "$BACKUP"

echo ""
echo "=== Step 3: Verify integrity ==="
gzip -t "$BACKUP" && echo "Archive integrity: OK"

echo ""
echo "=== Step 4: Extract only the CSV file ==="
CSVPATH=$(tar -tf "$BACKUP" | grep "\.csv$")
echo "Found CSV at: $CSVPATH"
tar -xzvf "$BACKUP" -C /tmp/ "$CSVPATH"
echo "Extracted to /tmp/$CSVPATH"`,
      explanation: "Storing the backup filename in a variable ($BACKUP) lets the entire script work with any timestamp. tar -tf piped to grep finds the path of a specific file type inside the archive — this path is then used to extract just that one file. This workflow (list → find path → targeted extract) is exactly how you'd restore a single accidentally deleted file from a nightly backup."
    },
    {
      id: "comp-ex3",
      difficulty: "Medium",
      title: "Log Archive Pipeline",
      description: "Simulate a monthly log archival process: compress all logs older than 7 days, create a monthly tar.gz archive, search inside without extracting, and calculate total space saved.",
      starterCode: `#!/bin/bash
# Create simulated log files with different dates
mkdir -p /tmp/log_archive_test/logs

# Create 'old' logs (simulate older timestamps)
for i in 1 2 3 4 5; do
    echo "[INFO] Log entry from week ago" > /tmp/log_archive_test/logs/app_old_\${i}.log
    for j in $(seq 1 500); do echo "[INFO] 2024-02-\${i} processed record $j"; done >> /tmp/log_archive_test/logs/app_old_\${i}.log
    touch -d "10 days ago" /tmp/log_archive_test/logs/app_old_\${i}.log
done

# Create 'recent' logs
for i in 1 2; do
    echo "[INFO] Recent log entry" > /tmp/log_archive_test/logs/app_recent_\${i}.log
    touch -d "2 days ago" /tmp/log_archive_test/logs/app_recent_\${i}.log
done

echo "=== Before archival ==="
du -sh /tmp/log_archive_test/logs/
ls -la /tmp/log_archive_test/logs/

echo ""
echo "=== Step 1: Find logs older than 7 days ==="
find /tmp/log_archive_test/logs/ ??? | sort

echo ""
echo "=== Step 2: Compress old logs with gzip ==="
find /tmp/log_archive_test/logs/ -name "*.log" -mtime +7 -exec ??? \;

echo ""
echo "=== Step 3: Create monthly archive of compressed logs ==="
???

echo ""
echo "=== Step 4: Search for 'record 100' across ALL .gz logs without extracting ==="
???

echo ""
echo "=== Step 5: Space comparison ==="
echo "Archive size:"
ls -lh /tmp/log_archive_test/monthly_*.tar.gz`,
      solution: `#!/bin/bash
mkdir -p /tmp/log_archive_test/logs

for i in 1 2 3 4 5; do
    echo "[INFO] Log entry from week ago" > /tmp/log_archive_test/logs/app_old_\${i}.log
    for j in $(seq 1 500); do echo "[INFO] 2024-02-\${i} processed record $j"; done >> /tmp/log_archive_test/logs/app_old_\${i}.log
    touch -d "10 days ago" /tmp/log_archive_test/logs/app_old_\${i}.log
done

for i in 1 2; do
    echo "[INFO] Recent log entry" > /tmp/log_archive_test/logs/app_recent_\${i}.log
    touch -d "2 days ago" /tmp/log_archive_test/logs/app_recent_\${i}.log
done

echo "=== Before archival ==="
du -sh /tmp/log_archive_test/logs/
ls -la /tmp/log_archive_test/logs/

echo ""
echo "=== Step 1: Find logs older than 7 days ==="
find /tmp/log_archive_test/logs/ -name "*.log" -mtime +7 | sort

echo ""
echo "=== Step 2: Compress old logs with gzip ==="
find /tmp/log_archive_test/logs/ -name "*.log" -mtime +7 -exec gzip -9 {} \;

echo ""
echo "=== Step 3: Create monthly archive of compressed logs ==="
tar -czvf /tmp/log_archive_test/monthly_$(date +%Y%m).tar.gz \
    /tmp/log_archive_test/logs/*.gz

echo ""
echo "=== Step 4: Search for 'record 100' across ALL .gz logs without extracting ==="
zgrep "record 100" /tmp/log_archive_test/logs/*.gz

echo ""
echo "=== Step 5: Space comparison ==="
echo "Archive size:"
ls -lh /tmp/log_archive_test/monthly_*.tar.gz`,
      explanation: "The find -exec gzip {} \\; pattern compresses each found file in place — the find handles the file selection, gzip handles the compression. Piping zgrep across multiple .gz files searches all compressed logs simultaneously. This two-stage process (gzip individual logs, then tar.gz the collection) is standard in log management: individual gzip for access, tar.gz for transport and archival."
    },
    {
      id: "comp-ex4",
      difficulty: "Medium",
      title: "Cross-Platform Package Creator",
      description: "Create a deployment package using zip that can be shared with Windows teams: exclude development files, add a password, verify integrity, and demonstrate extracting a single file.",
      starterCode: `#!/bin/bash
# Create a mock Python project
mkdir -p ~/deploy_test/{src,config,tests,__pycache__,.git}
echo "def process(): pass" > ~/deploy_test/src/pipeline.py
echo "def test_process(): pass" > ~/deploy_test/tests/test_pipeline.py
echo "host: localhost" > ~/deploy_test/config/prod.yml
echo "binary_data" > ~/deploy_test/__pycache__/pipeline.cpython-39.pyc
echo ".git objects" > ~/deploy_test/.git/COMMIT_EDITMSG
echo "README for deployment" > ~/deploy_test/README.md

echo "=== Full directory size ==="
du -sh ~/deploy_test/

echo ""
echo "=== Step 1: Create clean deployment zip (exclude dev files) ==="
# Exclude: __pycache__, .git, test files, .pyc files
zip -r9 ~/deploy_v1.0.zip ~/deploy_test/ \
    ??? \
    ??? \
    ???

echo ""
echo "=== Step 2: List zip contents (verify exclusions worked) ==="
unzip -l ~/deploy_v1.0.zip

echo ""
echo "=== Step 3: Create password-protected version for external share ==="
???

echo ""
echo "=== Step 4: Verify archive integrity ==="
???

echo ""
echo "=== Step 5: Extract only the config file ==="
unzip ~/deploy_v1.0.zip ??? -d /tmp/deploy_restore/`,
      solution: `#!/bin/bash
mkdir -p ~/deploy_test/{src,config,tests,__pycache__,.git}
echo "def process(): pass" > ~/deploy_test/src/pipeline.py
echo "def test_process(): pass" > ~/deploy_test/tests/test_pipeline.py
echo "host: localhost" > ~/deploy_test/config/prod.yml
echo "binary_data" > ~/deploy_test/__pycache__/pipeline.cpython-39.pyc
echo ".git objects" > ~/deploy_test/.git/COMMIT_EDITMSG
echo "README for deployment" > ~/deploy_test/README.md

echo "=== Full directory size ==="
du -sh ~/deploy_test/

echo ""
echo "=== Step 1: Create clean deployment zip (exclude dev files) ==="
zip -r9 ~/deploy_v1.0.zip ~/deploy_test/ \
    -x "*/__pycache__/*" \
    -x "*/.git/*" \
    -x "*/tests/*" \
    -x "*.pyc"

echo ""
echo "=== Step 2: List zip contents (verify exclusions worked) ==="
unzip -l ~/deploy_v1.0.zip

echo ""
echo "=== Step 3: Create password-protected version for external share ==="
zip -er ~/deploy_v1.0_secure.zip ~/deploy_test/ \
    -x "*/__pycache__/*" -x "*/.git/*" -x "*/tests/*" -x "*.pyc"

echo ""
echo "=== Step 4: Verify archive integrity ==="
unzip -t ~/deploy_v1.0.zip

echo ""
echo "=== Step 5: Extract only the config file ==="
unzip ~/deploy_v1.0.zip "*/config/prod.yml" -d /tmp/deploy_restore/`,
      explanation: "The -x patterns in zip use shell glob-style matching — the leading */ means 'any path prefix', making the exclusion work regardless of how deep the directory is. The -r9 combination means recursive + maximum compression. Using unzip -t for integrity testing before sending a zip to a client is professional practice — discovering corruption before they do saves embarrassment."
    },
    {
      id: "comp-ex5",
      difficulty: "Hard",
      title: "Production Data Archival System",
      description: "Build a complete archival script that: compresses files with the optimal algorithm based on type, creates a dated tarball, splits for FAT32 compatibility, verifies all pieces, and generates a manifest file for audit purposes.",
      starterCode: `#!/bin/bash
# ╔══════════════════════════════════════════════════════╗
# ║  Production Archival Script — Complete Build         ║
# ║  Requirements:                                       ║
# ║  1. Compress .csv files with gzip -9                 ║
# ║  2. Compress .log files with bzip2 (better ratio)   ║
# ║  3. Bundle everything into dated tar.gz             ║
# ║  4. Split into 50MB chunks (FAT32 simulation)       ║
# ║  5. Generate SHA256 checksums for all pieces        ║
# ║  6. Create manifest with file counts & total size   ║
# ╚══════════════════════════════════════════════════════╝

set -e  # Exit on any error
WORKDIR="/tmp/archival_test"
ARCHIVE_DIR="/tmp/archive_output"
DATE=$(date +%Y%m%d)

# Setup test data
mkdir -p "$WORKDIR"/{data,logs}
for i in $(seq 1 5); do
    python3 -c "
print('id,value,category')
for i in range(1000):
    print(f'{i},{i*100},{\"ABC\"[i%3]}')
" > "$WORKDIR/data/dataset_\${i}.csv"
done
for i in $(seq 1 3); do
    for j in $(seq 1 200); do echo "[INFO] 2024-03-10 Log entry $j from service $i"; done > "$WORKDIR/logs/service_\${i}.log"
done

mkdir -p "$ARCHIVE_DIR"

echo "╔══ STEP 1: Compress by type ══╗"
# Compress CSVs with gzip
???
# Compress logs with bzip2
???

echo "Original → Compressed sizes:"
du -sh "$WORKDIR"/data/ "$WORKDIR"/logs/

echo ""
echo "╔══ STEP 2: Create dated tarball ══╗"
TARBALL="$ARCHIVE_DIR/data_archive_\${DATE}.tar.gz"
???
echo "Created: $TARBALL ($(du -sh $TARBALL | cut -f1))"

echo ""
echo "╔══ STEP 3: Split into 50MB chunks ══╗"
???
echo "Chunks created:"
ls -lh "$ARCHIVE_DIR"/chunk_*

echo ""
echo "╔══ STEP 4: Generate checksums ══╗"
cd "$ARCHIVE_DIR"
sha256sum chunk_* > checksums.sha256
cat checksums.sha256

echo ""
echo "╔══ STEP 5: Verify checksums ══╗"
sha256sum -c checksums.sha256

echo ""
echo "╔══ STEP 6: Generate manifest ══╗"
cat > "$ARCHIVE_DIR/MANIFEST.txt" << EOF
Archive Manifest — Generated: $(date)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Original files:
  CSV files: $(find "$WORKDIR/data" -name "*.csv.gz" | wc -l) compressed CSVs
  Log files: $(find "$WORKDIR/logs" -name "*.bz2" | wc -l) compressed logs
Archive:     $(basename $TARBALL)
Total size:  $(du -sh "$ARCHIVE_DIR" | cut -f1)
Chunks:      $(ls "$ARCHIVE_DIR"/chunk_* | wc -l) pieces
EOF
cat "$ARCHIVE_DIR/MANIFEST.txt"

echo ""
echo "╔══ RESTORE TEST: Reassemble and extract ══╗"
???   # reassemble chunks back to tar.gz
???   # verify reassembled file integrity
echo "Restore test PASSED"`,
      solution: `#!/bin/bash
set -e
WORKDIR="/tmp/archival_test"
ARCHIVE_DIR="/tmp/archive_output"
DATE=$(date +%Y%m%d)

mkdir -p "$WORKDIR"/{data,logs}
for i in $(seq 1 5); do
    python3 -c "
print('id,value,category')
for i in range(1000):
    print(f'{i},{i*100},{\"ABC\"[i%3]}')
" > "$WORKDIR/data/dataset_\${i}.csv"
done
for i in $(seq 1 3); do
    for j in $(seq 1 200); do echo "[INFO] 2024-03-10 Log entry $j from service $i"; done > "$WORKDIR/logs/service_\${i}.log"
done

mkdir -p "$ARCHIVE_DIR"

echo "╔══ STEP 1: Compress by type ══╗"
find "$WORKDIR/data" -name "*.csv" -exec gzip -9 {} \;
find "$WORKDIR/logs" -name "*.log" -exec bzip2 -9 {} \;
echo "Original → Compressed sizes:"
du -sh "$WORKDIR"/data/ "$WORKDIR"/logs/

echo ""
echo "╔══ STEP 2: Create dated tarball ══╗"
TARBALL="$ARCHIVE_DIR/data_archive_\${DATE}.tar.gz"
tar -czvf "$TARBALL" -C "$WORKDIR" data/ logs/
echo "Created: $TARBALL ($(du -sh $TARBALL | cut -f1))"

echo ""
echo "╔══ STEP 3: Split into 50MB chunks ══╗"
split -b 50m -d "$TARBALL" "$ARCHIVE_DIR/chunk_"
echo "Chunks created:"
ls -lh "$ARCHIVE_DIR"/chunk_*

echo ""
echo "╔══ STEP 4: Generate checksums ══╗"
cd "$ARCHIVE_DIR"
sha256sum chunk_* > checksums.sha256
cat checksums.sha256

echo ""
echo "╔══ STEP 5: Verify checksums ══╗"
sha256sum -c checksums.sha256

echo ""
echo "╔══ STEP 6: Generate manifest ══╗"
cat > "$ARCHIVE_DIR/MANIFEST.txt" << EOF
Archive Manifest — Generated: $(date)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Original files:
  CSV files: $(find "$WORKDIR/data" -name "*.csv.gz" | wc -l) compressed CSVs
  Log files: $(find "$WORKDIR/logs" -name "*.bz2" | wc -l) compressed logs
Archive:     $(basename $TARBALL)
Total size:  $(du -sh "$ARCHIVE_DIR" | cut -f1)
Chunks:      $(ls "$ARCHIVE_DIR"/chunk_* | wc -l) pieces
EOF
cat "$ARCHIVE_DIR/MANIFEST.txt"

echo ""
echo "╔══ RESTORE TEST: Reassemble and extract ══╗"
cat "$ARCHIVE_DIR"/chunk_* > /tmp/restored_archive.tar.gz
gzip -t /tmp/restored_archive.tar.gz && echo "Restore test PASSED"`,
      explanation: "This script follows production data engineering practices: set -e exits immediately on any error (prevents silent failures), find -exec handles bulk compression without shell loops, sha256sum -c verifies ALL checksums in one command and fails if any mismatch. The manifest file creates an audit trail — critical for compliance in data engineering. The restore test at the end proves the entire pipeline is reversible before you delete the originals."
    }
  ],

  // ════════════════════════════════════════════════════════════
  // SUMMARY
  // ════════════════════════════════════════════════════════════
  summary: `
<div style="background:#0d1117;border:1px solid #30363d;border-radius:10px;padding:20px;">
  <h3 style="color:#bc8cff;margin-top:0;">📚 Ravi's Compression Toolkit — Complete Reference</h3>

  <div class="cards-grid">
    <div class="mini-card">
      <strong style="color:#3fb950;">gzip</strong>
      <p><code>gzip -9 -k file</code> compress keeping original. <code>zcat file.gz | grep</code> search without extracting. <code>gzip -t</code> verify integrity. Daily driver.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#58a6ff;">bzip2 / xz</strong>
      <p>bzip2: 15-20% smaller than gzip, 3x slower. xz: maximum compression with <code>-T 4</code> for parallel. Use xz for cold storage.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#d29922;">zip</strong>
      <p><code>zip -r9</code> recursive max compression. <code>zip -e</code> password. <code>zip -x "*.pyc"</code> exclude patterns. Cross-platform — always works on Windows.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#bc8cff;">tar</strong>
      <p><code>tar -czvf</code> create .tar.gz. <code>tar -tvf</code> list without extract. <code>-C dir/</code> extract to directory. <code>$(date +%Y%m%d)</code> dated backups.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#f85149;">split</strong>
      <p><code>split -b 3900m</code> chunk by size. <code>split -l 1000000</code> chunk by lines. <code>cat parts_* > restored</code> reassemble. Use <code>sha256sum</code> to verify.</p>
    </div>
    <div class="mini-card">
      <strong style="color:#3fb950;">zcat / zgrep</strong>
      <p>Search compressed files without extracting. <code>zcat *.gz | awk</code> streams work on compressed data. Saves disk space in pipelines.</p>
    </div>
  </div>

  <div style="background:#0d1117;border:1px solid #3fb950;border-radius:8px;padding:16px;margin-top:16px;">
    <strong style="color:#3fb950;">🏆 Ravi's Production Nightly Backup One-Liner:</strong>
    <div class="terminal-block" style="margin-top:10px;">
      <div class="terminal-header">
        <span class="terminal-dot" style="background:#ff5f56"></span>
        <span class="terminal-dot" style="background:#ffbd2e"></span>
        <span class="terminal-dot" style="background:#27c93f"></span>
      </div>
      <pre style="color:#e6edf3;padding:12px;margin:0;background:#000a00;font-family:'JetBrains Mono',monospace;font-size:12px;">tar -czvf - /data/processed/ --exclude="*.tmp" | \
  ssh backup@10.0.0.5 "cat > ~/backups/data_$(date +%Y%m%d).tar.gz" && \
  echo "Backup complete: $(date)"

<span style="color:#6a9955;"># Streams compressed data directly to backup server
# No temp file on local disk | Dated filename | Success message</span></pre>
    </div>
  </div>

  <div style="margin-top:16px;text-align:center;">
    <span style="color:#8b949e;font-size:13px;">Next Module: </span>
    <strong style="color:#bc8cff;">System Information — uname, df, du, free, top ➡️</strong>
  </div>
</div>`

}; // end var compression