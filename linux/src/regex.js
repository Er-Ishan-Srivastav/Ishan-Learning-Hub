var regex = {
    title: "Regular Expressions & Wildcards",
    description: "Master shell wildcards (globs), POSIX regular expressions (BRE and ERE), grep/sed/awk pattern matching, and Bash's own =~ operator. The toolkit for every data validation, log parsing, and text transformation task.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Log Hunt — Day 255</div>
    <br>
    <p>3,000 log files. 40 GB. Somewhere inside was the reason the pipeline had been silently corrupting timestamps for six days. Ravi opened the first file. Then the second. After the third he stopped. He couldn't read 3,000 files manually.</p>
    
    <br><p>Priya sat down and typed one command: <code>grep -r 'timestamp.*invalid\|malformed.*date' /logs/ | head -20</code>. Results in 4 seconds. Then another: <code>grep -oP '(?&lt;=timestamp=")[^"]+' /logs/pipeline-*.log | sort | uniq -c | sort -rn | head -10</code>. The ten most common malformed timestamps, counted, ranked.</p>
    <br><p>"Regular expressions," she said, "are how you talk to data. Every data engineer who can't write regex is reading files manually. Every one who can is searching 40GB in 4 seconds."</p>
    <br><p>This module teaches the complete picture — from shell globs to POSIX ERE to PCRE, with every tool: grep, sed, awk, and bash's own <code>=~</code> operator.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — GLOBS vs REGEX: NOT THE SAME THING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Globs vs Regex — Two Completely Different Systems</h2>

<p>The most common confusion in shell scripting: <strong>globs (wildcards) and regular expressions are NOT the same thing</strong>. They use some similar characters but mean different things. Globs are for matching <em>filenames</em>; regex is for matching <em>text inside files</em>.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f85149"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
  </defs>
  <rect width="820" height="230" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Globs vs Regular Expressions — Key Differences</text>

  <!-- Globs column -->
  <rect x="15" y="34" width="380" height="184" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="205" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">Shell Globs (Wildcards)</text>
  <line x1="25" y1="64" x2="385" y2="64" stroke="#30363d" stroke-width="1"/>
  <text x="30" y="82"  font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Used by: shell expansion, case, [[ == ]]</text>
  <text x="30" y="98"  font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Matches: filenames and strings</text>
  <text x="30" y="116" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">*        </text><text x="110" y="116" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">any string of chars (incl. empty)</text>
  <text x="30" y="132" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">?        </text><text x="110" y="132" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">exactly one character</text>
  <text x="30" y="148" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">[abc]    </text><text x="110" y="148" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">one char from set</text>
  <text x="30" y="164" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">{a,b,c}  </text><text x="110" y="164" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">brace expansion (not really glob)</text>
  <text x="30" y="180" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">*(pat)   </text><text x="110" y="180" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">extglob: zero or more (shopt -s)</text>
  <text x="30" y="196" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">+(pat)   </text><text x="110" y="196" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">extglob: one or more</text>
  <text x="205" y="212" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">ls *.csv   cp file?.txt   for f in *.{gz,bz2}</text>

  <!-- Regex column -->
  <rect x="425" y="34" width="380" height="184" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="615" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">Regular Expressions (Regex)</text>
  <line x1="435" y1="64" x2="795" y2="64" stroke="#30363d" stroke-width="1"/>
  <text x="440" y="82"  font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Used by: grep, sed, awk, [[ =~ ]], python</text>
  <text x="440" y="98"  font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Matches: text content (inside files)</text>
  <text x="440" y="116" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">.        </text><text x="520" y="116" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">any single char (≠ glob ?)</text>
  <text x="440" y="132" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">.*       </text><text x="520" y="132" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">any chars (≠ glob *)</text>
  <text x="440" y="148" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">[abc]    </text><text x="520" y="148" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">one char from set (same)</text>
  <text x="440" y="164" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">^  $     </text><text x="520" y="164" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">anchors: start/end of line</text>
  <text x="440" y="180" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">+  ?  {} </text><text x="520" y="180" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">quantifiers: 1+, 0/1, {n,m}</text>
  <text x="440" y="196" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">(a|b)    </text><text x="520" y="196" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">groups and alternation</text>
  <text x="615" y="212" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">grep 'error' log   sed 's/old/new/'   [[ $s =~ ^[0-9]+$ ]]</text>
</svg>
<p class="diagram-caption">Globs expand in the shell before commands run — bash replaces <code>*.csv</code> with matching filenames. Regex is interpreted by tools (<code>grep</code>, <code>sed</code>, <code>awk</code>) to search inside text. The characters look similar but behave differently: glob <code>*</code> = "any filename chars", regex <code>*</code> = "zero or more of the preceding".</p>
</div>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th>Character</th><th>In Glob</th><th>In Regex</th><th>Example</th></tr></thead>
<tbody>
<tr><td style="font-family:monospace;color:#ffa657;">*</td><td>Any string (incl. empty)</td><td>Zero or more of previous char</td><td>Glob: <code>*.csv</code>; Regex: <code>a*</code> = zero or more 'a'</td></tr>
<tr><td style="font-family:monospace;color:#ffa657;">?</td><td>Exactly one character</td><td>Zero or one of previous char</td><td>Glob: <code>file?.txt</code>; Regex: <code>colou?r</code></td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">.</td><td>Literal dot</td><td>Any single character</td><td>Glob: <code>file.csv</code>; Regex: <code>.</code> matches 'a', '1', '#'</td></tr>
<tr><td style="font-family:monospace;color:#3fb950;">[abc]</td><td>One char from set</td><td>One char from set (same!)</td><td>Both: <code>[abc]</code> matches 'a', 'b', or 'c'</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">^</td><td>No special meaning in glob</td><td>Start of line anchor</td><td>Regex: <code>^ERROR</code> = line starts with ERROR</td></tr>
<tr><td style="font-family:monospace;color:#58a6ff;">$</td><td>No special meaning in glob</td><td>End of line anchor</td><td>Regex: <code>\.csv$</code> = line ends with .csv</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">+</td><td>Literal + in glob</td><td>One or more of previous</td><td>Regex: <code>[0-9]+</code> = one or more digits</td></tr>
<tr><td style="font-family:monospace;color:#bc8cff;">{n,m}</td><td>Brace expansion: <code>{a,b}</code></td><td>Quantifier: exactly n to m</td><td>Regex: <code>[0-9]{4}</code> = exactly 4 digits</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — SHELL GLOBS IN DEPTH
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Shell Globs — Complete Wildcard Reference</h2>

<!-- CONSOLE 1 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — Shell Globs: *, ?, [], {}, extglob, nullglob, globstar</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ * — ANY STRING (including empty) ════════════════════════</span>
<span class="cb-prompt">$</span> ls /data/*.csv                <span class="cb-cmt"># files ending in .csv</span>
<span class="cb-prompt">$</span> ls /data/sales_*              <span class="cb-cmt"># files starting with sales_</span>
<span class="cb-prompt">$</span> ls /data/*.csv.gz             <span class="cb-cmt"># compressed CSVs</span>
<span class="cb-prompt">$</span> ls /data/2024-*-*.csv         <span class="cb-cmt"># date-named files: 2024-01-15.csv etc.</span>
<span class="cb-cmt"># Note: * does NOT match hidden files (starting with .)
# Note: * does NOT cross directory boundaries</span>

<span class="cb-cmt">## ═══ ? — EXACTLY ONE CHARACTER ══════════════════════════════</span>
<span class="cb-prompt">$</span> ls /data/chunk_?.csv          <span class="cb-cmt"># chunk_1.csv, chunk_a.csv (ONE char)</span>
<span class="cb-prompt">$</span> ls /data/chunk_??.csv         <span class="cb-cmt"># two chars: chunk_01.csv, chunk_ab.csv</span>
<span class="cb-prompt">$</span> ls /data/????.csv             <span class="cb-cmt"># exactly 4-char names: data.csv, test.csv</span>
<span class="cb-prompt">$</span> ls /logs/2024-??-??.log       <span class="cb-cmt"># date-format log files</span>

<span class="cb-cmt">## ═══ [set] — CHARACTER CLASS ══════════════════════════════════</span>
<span class="cb-prompt">$</span> ls /data/report_[0-9].csv     <span class="cb-cmt"># single digit: report_1.csv … report_9.csv</span>
<span class="cb-prompt">$</span> ls /data/[ABC]*.csv           <span class="cb-cmt"># starts with A, B, or C</span>
<span class="cb-prompt">$</span> ls /data/[a-zA-Z]*.csv        <span class="cb-cmt"># starts with any letter</span>
<span class="cb-prompt">$</span> ls /data/[!0-9]*.csv          <span class="cb-cmt"># does NOT start with digit (! = negate)</span>
<span class="cb-prompt">$</span> ls /data/[^0-9]*.csv          <span class="cb-cmt"># same — ^ also negates inside [ ]</span>
<span class="cb-prompt">$</span> ls /data/report[._-]*.csv     <span class="cb-cmt"># after 'report': dot, underscore, or hyphen</span>

<span class="cb-cmt">## ═══ POSIX CHARACTER CLASSES IN GLOBS ════════════════════════</span>
<span class="cb-prompt">$</span> ls /data/[[:digit:]]*.csv     <span class="cb-cmt"># starts with a digit</span>
<span class="cb-prompt">$</span> ls /data/[[:alpha:]]*.csv     <span class="cb-cmt"># starts with a letter</span>
<span class="cb-prompt">$</span> ls /data/[[:alnum:]]*.csv     <span class="cb-cmt"># starts with letter or digit</span>
<span class="cb-prompt">$</span> ls /data/[[:upper:]]*.csv     <span class="cb-cmt"># starts with uppercase</span>
<span class="cb-cmt"># [:digit:]  = 0-9    [:alpha:] = a-zA-Z   [:alnum:] = letters+digits
# [:upper:]  = A-Z    [:lower:] = a-z      [:space:] = whitespace
# [:punct:]  = punctuation     [:print:] = printable chars</span>

<span class="cb-cmt">## ═══ {} — BRACE EXPANSION (not a glob, but related) ══════════</span>
<span class="cb-prompt">$</span> echo {a,b,c}.csv
<span class="cb-out">a.csv b.csv c.csv</span>

<span class="cb-prompt">$</span> ls /data/{sales,inventory,customers}.csv
<span class="cb-prompt">$</span> ls /data/2024-{01,02,03}.csv
<span class="cb-prompt">$</span> mkdir -p /data/{raw,processed,archive}/{2024,2025}
<span class="cb-prompt">$</span> cp file.{csv,bak}           <span class="cb-cmt"># copy file.csv to file.bak</span>

<span class="cb-cmt">## ═══ GLOBSTAR — RECURSIVE MATCHING ══════════════════════════</span>
<span class="cb-prompt">$</span> shopt -s globstar           <span class="cb-cmt"># enable ** (recursive glob)</span>
<span class="cb-prompt">$</span> ls /data/**/*.csv           <span class="cb-cmt"># all CSVs at any depth under /data</span>
<span class="cb-prompt">$</span> wc -l /data/**/*.log        <span class="cb-cmt"># count lines in all logs recursively</span>
<span class="cb-prompt">$</span> shopt -u globstar           <span class="cb-cmt"># disable</span>

<span class="cb-cmt">## ═══ EXTGLOB PATTERNS (shopt -s extglob) ════════════════════</span>
<span class="cb-prompt">$</span> shopt -s extglob
<span class="cb-prompt">$</span> ls /data/!(*.gz)            <span class="cb-cmt"># all files NOT ending in .gz</span>
<span class="cb-prompt">$</span> ls /data/*.@(csv|tsv|txt)   <span class="cb-cmt"># files ending in .csv, .tsv, or .txt</span>
<span class="cb-prompt">$</span> ls /data/+(report)*.csv     <span class="cb-cmt"># starts with one or more "report"</span>
<span class="cb-prompt">$</span> ls /data/?(backup_)*.csv    <span class="cb-cmt"># optionally prefixed with backup_</span>

<span class="cb-cmt">## ═══ NULLGLOB — HANDLE EMPTY MATCHES ════════════════════════</span>
<span class="cb-prompt">$</span> shopt -s nullglob
<span class="cb-prompt">$</span> FILES=( /data/*.csv )
<span class="cb-prompt">$</span> (( \${#FILES[@]} == 0 )) && echo "No CSVs found"
<span class="cb-cmt"># Without nullglob: unmatched glob returns the literal pattern string
# With nullglob: unmatched glob returns empty list</span>

<span class="cb-cmt">## ═══ GLOB IN [[ ]] ════════════════════════════════════════════</span>
FILE="sales_report_2024.csv"
[[ $FILE == *.csv ]]           <span class="cb-cmt"># true — glob pattern on RIGHT side</span>
[[ $FILE == sales_* ]]         <span class="cb-cmt"># true — starts with sales_</span>
[[ $FILE != *.gz ]]            <span class="cb-cmt"># true — not a .gz file</span>
<span class="cb-cmt"># IMPORTANT: pattern must NOT be quoted in [[ ]]
# [[ $FILE == "*.csv" ]] → looks for literal "*.csv" string</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — REGEX FUNDAMENTALS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Regex Fundamentals — Building Blocks</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Regex Building Blocks — Five Core Concepts</text>

  <!-- Literals -->
  <rect x="12"  y="36" width="150" height="150" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="87" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">① Literals</text>
  <text x="87" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">match themselves</text>
  <text x="22" y="94" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">error</text>
  <text x="87" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">→ "error"</text>
  <text x="22" y="112" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">2024</text>
  <text x="87" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">→ "2024"</text>
  <text x="87" y="140" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Most chars are</text>
  <text x="87" y="154" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">literal — only</text>
  <text x="87" y="168" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">metachar are special</text>

  <!-- Metacharacters -->
  <rect x="172" y="36" width="150" height="150" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="247" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">② Metacharacters</text>
  <text x="247" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">have special meaning</text>
  <text x="182" y="92" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">. ^ $ * + ? { } [ ] ( ) | \</text>
  <text x="182" y="112" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">\.  → literal dot</text>
  <text x="182" y="128" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">$  → literal $</text>
  <text x="182" y="144" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">\+  → literal +</text>
  <text x="247" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Escape with \ to match literally</text>

  <!-- Anchors -->
  <rect x="332" y="36" width="150" height="150" rx="7" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="407" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">③ Anchors</text>
  <text x="407" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">position, not chars</text>
  <text x="342" y="94" font-family="'Courier New',monospace" font-size="12" fill="#ffa657">^</text><text x="370" y="94" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">start of line</text>
  <text x="342" y="112" font-family="'Courier New',monospace" font-size="12" fill="#ffa657">$</text><text x="370" y="112" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">end of line</text>
  <text x="342" y="130" font-family="'Courier New',monospace" font-size="12" fill="#ffa657">\b</text><text x="370" y="130" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">word boundary</text>
  <text x="342" y="148" font-family="'Courier New',monospace" font-size="12" fill="#ffa657">\B</text><text x="370" y="148" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">non-boundary</text>
  <text x="407" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">\b and \B: PCRE/grep -P only</text>

  <!-- Quantifiers -->
  <rect x="492" y="36" width="150" height="150" rx="7" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="567" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">④ Quantifiers</text>
  <text x="567" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">how many times</text>
  <text x="502" y="92" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">*</text><text x="524" y="92" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">0 or more</text>
  <text x="502" y="110" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">+</text><text x="524" y="110" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">1 or more</text>
  <text x="502" y="128" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">?</text><text x="524" y="128" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">0 or 1</text>
  <text x="502" y="146" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">{n}</text><text x="538" y="146" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">exactly n</text>
  <text x="502" y="164" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">{n,m}</text><text x="550" y="164" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">n to m</text>

  <!-- Groups -->
  <rect x="652" y="36" width="156" height="150" rx="7" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="730" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">⑤ Groups &amp; Alt</text>
  <text x="730" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">grouping and choice</text>
  <text x="662" y="94" font-family="'Courier New',monospace" font-size="12" fill="#f85149">(abc)</text><text x="730" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">group</text>
  <text x="662" y="112" font-family="'Courier New',monospace" font-size="12" fill="#f85149">a|b</text><text x="730" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">alternation</text>
  <text x="662" y="130" font-family="'Courier New',monospace" font-size="12" fill="#f85149">(a|b)+</text><text x="730" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">group+quant</text>
  <text x="662" y="148" font-family="'Courier New',monospace" font-size="12" fill="#f85149">\\1 \\2</text><text x="730" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">backrefs</text>
  <text x="730" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">\\1: BRE; \\1 ERE both work</text>
</svg>
</div>

<!-- CONSOLE 2 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — Regex Basics: Literals, Dot, Anchors, Classes, Escaping</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ LITERALS — match exactly ═══════════════════════════════</span>
<span class="cb-prompt">$</span> echo "2024-01-15 ERROR timeout" | grep 'ERROR'
<span class="cb-out">2024-01-15 ERROR timeout</span>
<span class="cb-cmt"># Most characters match themselves exactly</span>

<span class="cb-cmt">## ═══ . — ANY SINGLE CHARACTER ═══════════════════════════════</span>
<span class="cb-prompt">$</span> echo -e "cat\ncot\ncut\ncbt" | grep 'c.t'
<span class="cb-out">cat</span>
<span class="cb-out">cot</span>
<span class="cb-out">cut</span>
<span class="cb-out">cbt</span>
<span class="cb-cmt"># . matches any char (except newline by default)
# To match literal dot, escape it: \.</span>

<span class="cb-prompt">$</span> echo -e "file.csv\nfileXcsv" | grep 'file\.csv'
<span class="cb-out">file.csv</span>
<span class="cb-cmt"># \. matches only the literal dot, not 'X'</span>

<span class="cb-cmt">## ═══ ^ AND $ — ANCHORS ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo -e "ERROR: bad\ngood line\nERROR also" | grep '^ERROR'
<span class="cb-out">ERROR: bad</span>
<span class="cb-out">ERROR also</span>
<span class="cb-cmt"># ^ anchors to START of line — 'good line' not matched</span>

<span class="cb-prompt">$</span> echo -e "data.csv\nresult.csv.gz\nfile.json" | grep '\.csv$'
<span class="cb-out">data.csv</span>
<span class="cb-cmt"># $ anchors to END — result.csv.gz not matched (has .gz after)</span>

<span class="cb-prompt">$</span> echo -e "ERROR\n  ERROR\nERROR  " | grep '^ERROR$'
<span class="cb-out">ERROR</span>
<span class="cb-cmt"># ^ERROR$ matches the WHOLE line — nothing before or after</span>

<span class="cb-cmt">## ═══ CHARACTER CLASSES ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo -e "cat\nC3P0\n123\nABC" | grep '^[0-9]'
<span class="cb-out">123</span>
<span class="cb-cmt"># [0-9] matches any single digit at start of line</span>

<span class="cb-prompt">$</span> echo -e "INFO\nWARN\nERROR\nDEBUG" | grep '^[EW]'
<span class="cb-out">WARN</span>
<span class="cb-out">ERROR</span>
<span class="cb-cmt"># [EW] matches E or W at start of line</span>

<span class="cb-prompt">$</span> echo -e "2024-01-15\n2024-13-01\n24-01-15" | grep '^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}$'
<span class="cb-out">2024-01-15</span>
<span class="cb-out">2024-13-01</span>
<span class="cb-cmt"># BRE: {4} must be escaped as \{4\}
# Valid format: 4 digits - 2 digits - 2 digits</span>

<span class="cb-cmt">## ═══ NEGATED CLASS [^] ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo -e "hello\nWARN\n123" | grep '^[^0-9]'
<span class="cb-out">hello</span>
<span class="cb-out">WARN</span>
<span class="cb-cmt"># [^0-9] = any char that is NOT a digit at start of line</span>

<span class="cb-cmt">## ═══ POSIX CHARACTER CLASSES ═════════════════════════════════</span>
<span class="cb-prompt">$</span> echo "abc 123 ABC !@#" | grep -o '[[:alpha:]]*'
<span class="cb-out">abc</span>
<span class="cb-out">ABC</span>
<span class="cb-cmt"># [:alpha:] = any letter (locale-aware)
# [:digit:] = 0-9      [:alnum:] = letters+digits
# [:upper:] = A-Z      [:lower:] = a-z
# [:space:] = space/tab/newline/etc.
# [:punct:] = !"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~</span>

<span class="cb-cmt">## ═══ ESCAPING SPECIAL CHARACTERS ════════════════════════════</span>
<span class="cb-prompt">$</span> echo "cost: $4.99" | grep '$[0-9]'
<span class="cb-out">cost: $4.99</span>
<span class="cb-cmt"># \ escapes $ from anchor meaning → literal $</span>

<span class="cb-prompt">$</span> echo "file.csv" | grep 'file\.csv'
<span class="cb-cmt"># \. matches literal dot (not any char)</span>

<span class="cb-prompt">$</span> echo "a+b=c" | grep 'a+b'           <span class="cb-cmt"># BRE: + is literal!</span>
<span class="cb-out">a+b=c</span>
<span class="cb-prompt">$</span> echo "a+b=c" | grep -E 'a\+b'       <span class="cb-cmt"># ERE: escape + to make literal</span>
<span class="cb-out">a+b=c</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — QUANTIFIERS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Quantifiers — Controlling Repetition</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="130" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Quantifier Spectrum — Zero to Unlimited</text>

  <!-- line -->
  <line x1="40" y1="70" x2="780" y2="70" stroke="#30363d" stroke-width="2"/>

  <!-- markers -->
  <circle cx="40"  cy="70" r="4" fill="#3fb950"/>
  <circle cx="190" cy="70" r="4" fill="#58a6ff"/>
  <circle cx="390" cy="70" r="4" fill="#bc8cff"/>
  <circle cx="590" cy="70" r="4" fill="#ffa657"/>
  <circle cx="780" cy="70" r="4" fill="#f85149"/>

  <text x="40"  y="50" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">0</text>
  <text x="190" y="50" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#58a6ff">1</text>
  <text x="390" y="50" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#bc8cff">n</text>
  <text x="590" y="50" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#ffa657">m</text>
  <text x="780" y="50" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#f85149">∞</text>

  <!-- spans -->
  <rect x="40"  y="80" width="740" height="18" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="410" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">*  →  0 to ∞</text>

  <rect x="190" y="100" width="590" height="18" rx="3" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="480" y="114" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">+  →  1 to ∞</text>

  <text x="40"  y="114" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">?  0-1</text>
  <text x="390" y="114" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">{n}  {n,m}  {n,}</text>
</svg>
</div>

<!-- CONSOLE 3 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — Quantifiers: *, +, ?, {n,m}, greedy vs lazy</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ * — ZERO OR MORE ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo -e "ac\nabc\nabbc\nabbbc" | grep 'ab*c'
<span class="cb-out">ac</span>
<span class="cb-out">abc</span>
<span class="cb-out">abbc</span>
<span class="cb-out">abbbc</span>
<span class="cb-cmt"># ab*c: 'a', then zero or more 'b', then 'c'
# 'ac' matches because b* allows zero b's</span>

<span class="cb-cmt">## ═══ + — ONE OR MORE (ERE only; BRE: \+) ════════════════════</span>
<span class="cb-prompt">$</span> echo -e "ac\nabc\nabbc" | grep -E 'ab+c'
<span class="cb-out">abc</span>
<span class="cb-out">abbc</span>
<span class="cb-cmt"># 'ac' not matched — + requires AT LEAST ONE 'b'</span>

<span class="cb-cmt">## ═══ ? — ZERO OR ONE (ERE only; BRE: \?) ════════════════════</span>
<span class="cb-prompt">$</span> echo -e "colour\ncolor\ncolouur" | grep -E 'colou?r'
<span class="cb-out">colour</span>
<span class="cb-out">color</span>
<span class="cb-cmt"># u? means u is optional (0 or 1 u)
# 'colouur' not matched — only one optional u</span>

<span class="cb-cmt">## ═══ {n} {n,} {n,m} — EXACT COUNT ══════════════════════════</span>
<span class="cb-prompt">$</span> echo -e "1234\n12345\n123" | grep -E '^[0-9]{4}$'
<span class="cb-out">1234</span>
<span class="cb-cmt"># {4} = exactly 4 digits — anchors ensure full match</span>

<span class="cb-prompt">$</span> echo -e "aa\naaa\naaaa" | grep -E '^a{3,}$'
<span class="cb-out">aaa</span>
<span class="cb-out">aaaa</span>
<span class="cb-cmt"># {3,} = 3 or more — minimum only, no maximum</span>

<span class="cb-prompt">$</span> echo -e "aa\naaa\naaaa\naaaaa" | grep -E '^a{2,4}$'
<span class="cb-out">aa</span>
<span class="cb-out">aaa</span>
<span class="cb-out">aaaa</span>
<span class="cb-cmt"># {2,4} = 2, 3, or 4</span>

<span class="cb-cmt">## ═══ PRACTICAL QUANTIFIER EXAMPLES ══════════════════════════</span>
<span class="cb-cmt"># Match an IPv4 address (simplified):</span>
<span class="cb-prompt">$</span> grep -E '([0-9]{1,3}\.){3}[0-9]{1,3}' logfile.txt

<span class="cb-cmt"># Match a port number (1-65535):</span>
<span class="cb-prompt">$</span> grep -E ':[0-9]{1,5}($| )' connections.txt

<span class="cb-cmt"># Match a UUID:</span>
<span class="cb-prompt">$</span> grep -E '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' log.txt

<span class="cb-cmt">## ═══ BRE vs ERE QUANTIFIER DIFFERENCE ═══════════════════════</span>
<span class="cb-cmt"># BRE (grep without -E): + ? { } need escaping to be quantifiers</span>
grep    'a\+'    file   <span class="cb-cmt"># BRE: \+ = one or more a</span>
grep -E 'a+'     file   <span class="cb-cmt"># ERE: + = one or more a (no escape needed)</span>

grep    'a\{3\}' file   <span class="cb-cmt"># BRE: \{3\} = exactly 3 a's</span>
grep -E 'a{3}'   file   <span class="cb-cmt"># ERE: {3} = exactly 3 a's (no escape)</span>

<span class="cb-cmt">## ═══ GREEDY MATCHING (default) ═══════════════════════════════</span>
<span class="cb-cmt"># Quantifiers are GREEDY by default — match as much as possible</span>
<span class="cb-prompt">$</span> echo '<b>bold</b> and <i>italic</i>' | grep -oP '<.*>'
<span class="cb-out">&lt;b&gt;bold&lt;/b&gt; and &lt;i&gt;italic&lt;/i&gt;</span>
<span class="cb-cmt"># .* matched everything from first < to last >
# Greedy = expands as far as possible</span>

<span class="cb-cmt"># Lazy (non-greedy) with ? after quantifier (PCRE / grep -P only):</span>
<span class="cb-prompt">$</span> echo '<b>bold</b> and <i>italic</i>' | grep -oP '<.*?>'
<span class="cb-out">&lt;b&gt;</span>
<span class="cb-out">&lt;/b&gt;</span>
<span class="cb-out">&lt;i&gt;</span>
<span class="cb-out">&lt;/i&gt;</span>
<span class="cb-cmt"># .*? matched as little as possible (each tag separately)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — GROUPS, ALTERNATION & BACKREFERENCES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Groups, Alternation &amp; Backreferences</h2>

<!-- CONSOLE 4 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — Groups (abc), alternation |, backrefs \\1, named groups</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ GROUPS — ( ) ═══════════════════════════════════════════</span>
<span class="cb-cmt"># Groups: (a) captures the match; applies quantifier to group</span>
<span class="cb-prompt">$</span> echo -e "abab\nab\nababab" | grep -E '^(ab)+$'
<span class="cb-out">abab</span>
<span class="cb-out">ab</span>
<span class="cb-out">ababab</span>
<span class="cb-cmt"># (ab)+ means one or more repetitions of "ab" as a unit</span>

<span class="cb-prompt">$</span> echo -e "2024-01\n2024-01-15\n24-01-15" | grep -E '^[0-9]{4}-(0[1-9]|1[0-2])(-[0-9]{2})?$'
<span class="cb-out">2024-01</span>
<span class="cb-out">2024-01-15</span>
<span class="cb-cmt"># (0[1-9]|1[0-2]) = valid month: 01-09 or 10-12
# (-[0-9]{2})? = optional day</span>

<span class="cb-cmt">## ═══ ALTERNATION — | ═════════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo -e "cat\ndog\nbird\nfish" | grep -E 'cat|dog'
<span class="cb-out">cat</span>
<span class="cb-out">dog</span>

<span class="cb-prompt">$</span> grep -E 'ERROR|WARN|CRITICAL' app.log   <span class="cb-cmt"># multiple severity levels</span>
<span class="cb-prompt">$</span> grep -E '^(INFO|WARN|ERROR):' app.log   <span class="cb-cmt"># anchored at start</span>
<span class="cb-prompt">$</span> grep -E '\.(csv|tsv|txt|json)$' files.txt  <span class="cb-cmt"># multiple extensions</span>

<span class="cb-cmt">## ═══ BACKREFERENCES — \\1 \\2 ══════════════════════════════════</span>
<span class="cb-cmt"># \\1 refers to what group 1 matched (same text, not same pattern)</span>
<span class="cb-prompt">$</span> echo -e "the the\na b\nhello hello" | grep -E '\b(\w+)\s+\\1\b'
<span class="cb-out">the the</span>
<span class="cb-out">hello hello</span>
<span class="cb-cmt"># \\1 matches the SAME WORD that (\w+) captured
# Finds duplicate consecutive words</span>

<span class="cb-cmt"># In sed — find and rearrange fields:</span>
<span class="cb-prompt">$</span> echo "2024-01-15" | sed -E 's/([0-9]{4})-([0-9]{2})-([0-9]{2})/\\3\/\\2\/\\1/'
<span class="cb-out">15/01/2024</span>
<span class="cb-cmt"># Groups 1,2,3 capture year,month,day → rearrange as day/month/year</span>

<span class="cb-cmt">## ═══ NON-CAPTURING GROUPS — (?:) — PCRE/grep -P ══════════════</span>
<span class="cb-cmt"># (?:...) groups without capturing — saves group number</span>
<span class="cb-prompt">$</span> echo "192.168.1.1" | grep -P '(?:[0-9]{1,3}\.){3}[0-9]{1,3}'
<span class="cb-cmt"># (?:...) groups the octet+dot pattern without capturing</span>

<span class="cb-cmt">## ═══ NAMED GROUPS — (?P<name>) — PCRE ════════════════════════</span>
<span class="cb-prompt">$</span> echo "2024-01-15" | grep -oP '(?P<year>[0-9]{4})-(?P<month>[0-9]{2})-(?P<day>[0-9]{2})'
<span class="cb-out">2024-01-15</span>
<span class="cb-cmt"># Named groups — extremely useful in Python/sed replacement:
# In Python: m.group('year'), m.group('month')</span>

<span class="cb-cmt">## ═══ BASH [[ =~ ]] CAPTURE WITH BASH_REMATCH ═════════════════</span>
DATE="2024-01-15"
if [[ $DATE =~ ^([0-9]{4})-([0-9]{2})-([0-9]{2})$ ]]; then
    echo "Full match:  \${BASH_REMATCH[0]}"
    echo "Year:        \${BASH_REMATCH[1]}"
    echo "Month:       \${BASH_REMATCH[2]}"
    echo "Day:         \${BASH_REMATCH[3]}"
fi
<span class="cb-out">Full match:  2024-01-15</span>
<span class="cb-out">Year:        2024</span>
<span class="cb-out">Month:       01</span>
<span class="cb-out">Day:         15</span>
<span class="cb-cmt"># BASH_REMATCH[0] = full match
# BASH_REMATCH[N] = group N</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — BRE vs ERE vs PCRE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> BRE vs ERE vs PCRE — Three Regex Flavours</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Regex Flavours — BRE (POSIX Basic) / ERE (POSIX Extended) / PCRE</text>

  <!-- BRE -->
  <rect x="12" y="34" width="256" height="144" rx="8" fill="#1f2027" stroke="#ffa657" stroke-width="2"/>
  <text x="140" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">BRE — Basic (grep default)</text>
  <text x="22"  y="74" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">grep 'pattern'  sed 's/p/r/'</text>
  <text x="22"  y="92" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">Quantifiers need \ to be meta:</text>
  <text x="22" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">\+ \? \{ \} \( \) \|</text>
  <text x="22" y="126" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Without \: literal characters</text>
  <text x="22" y="144" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">^ $ . * [ ] \  still special</text>
  <text x="140" y="168" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">POSIX mandated — most portable</text>

  <!-- ERE -->
  <rect x="282" y="34" width="256" height="144" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="410" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">ERE — Extended (grep -E, awk)</text>
  <text x="292" y="74" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">grep -E  egrep  awk  sed -E  bash [[ =~ ]]</text>
  <text x="292" y="92" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Quantifiers are meta by default:</text>
  <text x="292" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">+  ?  {  }  (  )  |</text>
  <text x="292" y="126" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Escape to make literal: \+ \?</text>
  <text x="292" y="144" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">More readable — use for scripts</text>
  <text x="410" y="168" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">POSIX standard — use this in scripts</text>

  <!-- PCRE -->
  <rect x="552" y="34" width="256" height="144" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="680" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">PCRE — Perl Compatible (grep -P)</text>
  <text x="562" y="74" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">grep -P   python re   perl</text>
  <text x="562" y="92" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">Extra features beyond ERE:</text>
  <text x="562" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">\d \w \s \b  (shortcuts)</text>
  <text x="562" y="124" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">(?:) (?P&lt;n&gt;) (?=) (?!)  </text>
  <text x="562" y="140" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">.*? (lazy)  {n,m}? (lazy)</text>
  <text x="680" y="168" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Most powerful — not always available</text>
</svg>
</div>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:18%">Feature</th><th>BRE (grep)</th><th>ERE (grep -E, awk)</th><th>PCRE (grep -P)</th></tr></thead>
<tbody>
<tr><td>One or more</td><td style="font-family:monospace;">\+</td><td style="font-family:monospace;color:#3fb950;">+</td><td style="font-family:monospace;color:#bc8cff;">+</td></tr>
<tr><td>Zero or one</td><td style="font-family:monospace;">\?</td><td style="font-family:monospace;color:#3fb950;">?</td><td style="font-family:monospace;color:#bc8cff;">?</td></tr>
<tr><td>Exactly n</td><td style="font-family:monospace;">\{n\}</td><td style="font-family:monospace;color:#3fb950;">{n}</td><td style="font-family:monospace;color:#bc8cff;">{n}</td></tr>
<tr><td>Grouping</td><td style="font-family:monospace;">\( \)</td><td style="font-family:monospace;color:#3fb950;">( )</td><td style="font-family:monospace;color:#bc8cff;">( )  (?:)</td></tr>
<tr><td>Alternation</td><td style="font-family:monospace;">\|</td><td style="font-family:monospace;color:#3fb950;">|</td><td style="font-family:monospace;color:#bc8cff;">|</td></tr>
<tr><td>Any digit</td><td style="font-family:monospace;">[0-9]</td><td style="font-family:monospace;">[0-9]</td><td style="font-family:monospace;color:#bc8cff;">\d</td></tr>
<tr><td>Any word char</td><td style="font-family:monospace;">[a-zA-Z0-9_]</td><td style="font-family:monospace;">[a-zA-Z0-9_]</td><td style="font-family:monospace;color:#bc8cff;">\w</td></tr>
<tr><td>Any whitespace</td><td style="font-family:monospace;">[ \t]</td><td style="font-family:monospace;">[ \t]</td><td style="font-family:monospace;color:#bc8cff;">\s</td></tr>
<tr><td>Word boundary</td><td>Not available</td><td>Not available</td><td style="font-family:monospace;color:#bc8cff;">\b</td></tr>
<tr><td>Lookahead</td><td>Not available</td><td>Not available</td><td style="font-family:monospace;color:#bc8cff;">(?=pat) (?!pat)</td></tr>
<tr><td>Named groups</td><td>Not available</td><td>Not available</td><td style="font-family:monospace;color:#bc8cff;">(?P&lt;name&gt;)</td></tr>
<tr><td>Lazy match</td><td>Not available</td><td>Not available</td><td style="font-family:monospace;color:#bc8cff;">*? +? ??</td></tr>
<tr><td>Tool</td><td><code>grep</code>, <code>sed</code></td><td><code>grep -E</code>, <code>awk</code>, <code>sed -E</code>, bash <code>=~</code></td><td><code>grep -P</code>, Python, Perl</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — grep: THE REGEX WORKHORSE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>grep</code> — Every Flag &amp; Pattern</h2>

<!-- CONSOLE 5 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — grep: All Flags, ERE, PCRE, Counting, Context</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ CORE FLAGS ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-i</span> 'error' app.log     <span class="cb-cmt"># case-insensitive</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-v</span> 'DEBUG' app.log     <span class="cb-cmt"># invert: lines NOT matching</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-n</span> 'ERROR' app.log     <span class="cb-cmt"># show line numbers</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-c</span> 'ERROR' app.log     <span class="cb-cmt"># count matching lines only</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-l</span> 'ERROR' *.log       <span class="cb-cmt"># list filenames with matches</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-L</span> 'ERROR' *.log       <span class="cb-cmt"># list filenames WITHOUT matches</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-q</span> 'ERROR' app.log     <span class="cb-cmt"># quiet: exit 0/1 only (for if checks)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-m 5</span> 'ERROR' app.log   <span class="cb-cmt"># stop after 5 matches</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-o</span> 'ERROR' app.log     <span class="cb-cmt"># print only matched part (not full line)</span>

<span class="cb-cmt">## ═══ REGEX MODE FLAGS ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-E</span> 'ERROR|WARN' app.log   <span class="cb-cmt"># ERE: | + ? {} () without escaping</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-P</span> '\d{4}-\d{2}-\d{2}' log  <span class="cb-cmt"># PCRE: \d \w \s \b lookaheads</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-F</span> 'literal$string' file     <span class="cb-cmt"># fixed string: no regex at all</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-G</span> 'pattern' file            <span class="cb-cmt"># BRE (default)</span>

<span class="cb-cmt">## ═══ CONTEXT FLAGS ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-A 3</span> 'ERROR' app.log   <span class="cb-cmt"># 3 lines After each match</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-B 2</span> 'ERROR' app.log   <span class="cb-cmt"># 2 lines Before each match</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-C 5</span> 'ERROR' app.log   <span class="cb-cmt"># 5 lines Context (before AND after)</span>

<span class="cb-cmt">## ═══ MULTIPLE PATTERNS ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-e</span> 'ERROR' <span class="cb-flag">-e</span> 'WARN' app.log  <span class="cb-cmt"># multiple patterns</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-f</span> patterns.txt app.log         <span class="cb-cmt"># patterns from file (one per line)</span>

<span class="cb-cmt">## ═══ RECURSIVE AND FILE SELECTION ═══════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-r</span> 'ERROR' /var/log/          <span class="cb-cmt"># recursive through directories</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-r</span> <span class="cb-flag">--include='*.log'</span> 'ERROR' /var/log/
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-r</span> <span class="cb-flag">--exclude='*.gz'</span> 'ERROR' /var/log/
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-rl</span> 'ERROR' /var/log/          <span class="cb-cmt"># recursive, filenames only</span>

<span class="cb-cmt">## ═══ WORD BOUNDARY ═══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-w</span> 'error' log           <span class="cb-cmt"># match whole word only</span>
<span class="cb-cmt"># 'error' matches but 'errors' 'prerror' do not</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-P</span> '\berror\b' log        <span class="cb-cmt"># PCRE word boundary (same effect)</span>

<span class="cb-cmt">## ═══ POWERFUL EXTRACTION WITH -oP ═══════════════════════════</span>
<span class="cb-cmt"># -o: print only the matched part; -P: PCRE</span>

<span class="cb-cmt"># Extract all IP addresses from log:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-oP</span> '\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b' access.log | sort | uniq -c

<span class="cb-cmt"># Extract all timestamps:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-oP</span> '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}' events.log

<span class="cb-cmt"># Extract values after 'user=':</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-oP</span> '(?<=user=)\w+' access.log

<span class="cb-cmt"># Extract URLs:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-oP</span> 'https?://[^\s"]+' access.log | sort | uniq -c | sort -rn

<span class="cb-cmt"># Extract quoted values:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-flag">-oP</span> '(?<="message":")[^"]+' app.log

<span class="cb-cmt">## ═══ CHAINING GREPS ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> grep 'ERROR' app.log | grep -v 'timeout' | grep -v 'DEBUG'
<span class="cb-cmt"># Lines with ERROR but NOT timeout AND NOT DEBUG</span>

<span class="cb-prompt">$</span> grep -E 'ERROR|WARN' app.log | grep '2024-01-15'
<span class="cb-cmt"># Errors/warnings from specific date</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — sed WITH REGEX
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>sed</code> — Stream Editor with Regex</h2>

<!-- CONSOLE 6 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — sed: s//, addresses, flags, in-place, groups</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC SUBSTITUTION s/pattern/replacement/ ═══════════════</span>
<span class="cb-prompt">$</span> echo "2024-01-15" | sed 's/-/\//g'
<span class="cb-out">2024/01/15</span>
<span class="cb-cmt"># s/OLD/NEW/   replace first match per line
# s/OLD/NEW/g  replace ALL matches (g = global flag)</span>

<span class="cb-prompt">$</span> echo "Hello World" | sed 's/World/Ravi/'
<span class="cb-out">Hello Ravi</span>

<span class="cb-prompt">$</span> echo "aaabbb" | sed 's/a*/X/'   <span class="cb-cmt"># replaces first 'aaa' with 'X'</span>
<span class="cb-out">Xbbb</span>

<span class="cb-cmt">## ═══ sed FLAGS ═══════════════════════════════════════════════</span>
sed 's/foo/bar/'           <span class="cb-cmt"># replace first occurrence per line</span>
sed 's/foo/bar/g'          <span class="cb-cmt"># replace ALL occurrences</span>
sed 's/foo/bar/2'          <span class="cb-cmt"># replace only second occurrence</span>
sed 's/foo/bar/I'          <span class="cb-cmt"># case-insensitive (GNU sed)</span>
sed 's/foo/bar/gI'         <span class="cb-cmt"># global + case-insensitive</span>
sed 's/foo/bar/p'          <span class="cb-cmt"># print line if substitution made</span>
sed -n 's/foo/bar/p'       <span class="cb-cmt"># print ONLY lines where substitution happened</span>

<span class="cb-cmt">## ═══ IN-PLACE EDITING (-i) ═══════════════════════════════════</span>
<span class="cb-prompt">$</span> sed -i 's/localhost/prod-db.internal/g' config.yaml
<span class="cb-cmt"># Modify file in-place (no output, file is changed)</span>

<span class="cb-prompt">$</span> sed -i.bak 's/localhost/prod-db.internal/g' config.yaml
<span class="cb-cmt"># -i.bak: create backup config.yaml.bak before editing</span>

<span class="cb-cmt">## ═══ ERE WITH -E ══════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo "2024-01-15" | sed -E 's/([0-9]{4})-([0-9]{2})-([0-9]{2})/\\3\/\\2\/\\1/'
<span class="cb-out">15/01/2024</span>
<span class="cb-cmt"># -E enables ERE: no need for \( \) \{ \}
# \\1 \\2 \\3 = backreferences to captured groups</span>

<span class="cb-prompt">$</span> echo "phone: 098-765-4321" | sed -E 's/([0-9]{3})-([0-9]{3})-([0-9]{4})/(\\1) \\2-\\3/'
<span class="cb-out">phone: (098) 765-4321</span>

<span class="cb-cmt">## ═══ SPECIAL REPLACEMENT SEQUENCES ══════════════════════════</span>
<span class="cb-cmt"># In replacement:
# \\1-\\9  backreference to group
# &      the entire matched text
# \\u     uppercase next char
# \\l     lowercase next char
# \U     uppercase until \E or \L
# \L     lowercase until \E or \U</span>

<span class="cb-prompt">$</span> echo "hello world" | sed 's/\b\w/\\u&/g'   <span class="cb-cmt"># Title Case (GNU sed)</span>
<span class="cb-out">Hello World</span>

<span class="cb-prompt">$</span> echo "LOUD TEXT" | sed 's/.*/\L&/'         <span class="cb-cmt"># all lowercase</span>
<span class="cb-out">loud text</span>

<span class="cb-cmt">## ═══ ADDRESS RANGES ══════════════════════════════════════════</span>
sed '5s/foo/bar/'          <span class="cb-cmt"># only line 5</span>
sed '5,10s/foo/bar/'       <span class="cb-cmt"># lines 5-10</span>
sed '/ERROR/s/foo/bar/'    <span class="cb-cmt"># only lines matching /ERROR/</span>
sed '/START/,/END/s/foo/bar/'  <span class="cb-cmt"># lines between /START/ and /END/</span>

<span class="cb-cmt">## ═══ DELETE AND PRINT ════════════════════════════════════════</span>
sed '/^#/d'                <span class="cb-cmt"># delete comment lines</span>
sed '/^$/d'                <span class="cb-cmt"># delete blank lines</span>
sed '/^#/d; /^$/d'         <span class="cb-cmt"># delete both in one pass</span>
sed -n '/ERROR/p'          <span class="cb-cmt"># print only ERROR lines (like grep)</span>
sed -n '10,20p'            <span class="cb-cmt"># print lines 10-20</span>

<span class="cb-cmt">## ═══ REAL-WORLD DATA ENGINEERING sed ═════════════════════════</span>
<span class="cb-cmt"># Clean CSV: remove trailing spaces in each field</span>
sed -E 's/[[:space:]]+,/,/g; s/,[[:space:]]+/,/g' data.csv

<span class="cb-cmt"># Normalise date format: DD/MM/YYYY → YYYY-MM-DD</span>
sed -E 's|([0-9]{2})/([0-9]{2})/([0-9]{4})|\\3-\\2-\\1|g' dates.txt

<span class="cb-cmt"># Remove ANSI colour codes from log files</span>
sed -E 's/\x1B\[[0-9;]*[mGKHF]//g' coloured.log

<span class="cb-cmt"># Extract value from key=value config line</span>
sed -n 's/^db_host=//p' config.ini
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — awk WITH REGEX
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>awk</code> — Pattern/Action Regex</h2>

<!-- CONSOLE 7 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — awk: /pattern/, match(), sub(), gsub(), gensub()</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ AWK /PATTERN/ — BASIC MATCHING ═════════════════════════</span>
<span class="cb-cmt"># awk 'PATTERN { ACTION }' file
# Lines matching PATTERN get the ACTION applied</span>
<span class="cb-prompt">$</span> awk '/ERROR/' app.log              <span class="cb-cmt"># print lines matching ERROR (like grep)</span>
<span class="cb-prompt">$</span> awk '!/DEBUG/' app.log             <span class="cb-cmt"># print lines NOT matching DEBUG</span>
<span class="cb-prompt">$</span> awk '/ERROR/ { print $1, $NF }' app.log  <span class="cb-cmt"># print 1st and last field of ERROR lines</span>

<span class="cb-cmt">## ═══ FIELD-SPECIFIC MATCHING ════════════════════════════════</span>
<span class="cb-prompt">$</span> awk -F',' '$3 ~ /Mumbai/' sales.csv   <span class="cb-cmt"># field 3 matches Mumbai</span>
<span class="cb-prompt">$</span> awk -F',' '$2 !~ /^[0-9]/' data.csv  <span class="cb-cmt"># field 2 does NOT start with digit</span>
<span class="cb-prompt">$</span> awk -F: '$7 ~ /bash$/' /etc/passwd   <span class="cb-cmt"># users with bash shell</span>
<span class="cb-cmt"># ~ = field matches regex
# !~ = field does NOT match regex</span>

<span class="cb-cmt">## ═══ RANGE PATTERNS ═════════════════════════════════════════</span>
<span class="cb-prompt">$</span> awk '/START/,/END/' logfile         <span class="cb-cmt"># print from /START/ to /END/</span>
<span class="cb-prompt">$</span> awk '/2024-01-15/,/2024-01-16/' events.log  <span class="cb-cmt"># one day of events</span>

<span class="cb-cmt">## ═══ match() FUNCTION ════════════════════════════════════════</span>
<span class="cb-cmt"># match(string, regex) → returns position (1-based) or 0 if no match
# Sets RSTART and RLENGTH</span>
<span class="cb-prompt">$</span> echo "user=ravi host=prod-db" | awk '{
    if (match($0, /user=[a-z]+/)) {
        print substr($0, RSTART, RLENGTH)
    }
}'
<span class="cb-out">user=ravi</span>

<span class="cb-cmt">## ═══ match() WITH ARRAY (gawk only) ══════════════════════════</span>
<span class="cb-prompt">$</span> echo "date=2024-01-15 user=ravi" | gawk '{
    if (match($0, /date=([0-9-]+).*user=([a-z]+)/, arr)) {
        print "Date:", arr[1]
        print "User:", arr[2]
    }
}'
<span class="cb-out">Date: 2024-01-15</span>
<span class="cb-out">User: ravi</span>
<span class="cb-cmt"># Third arg to match() = array of capture groups (gawk extension)</span>

<span class="cb-cmt">## ═══ sub() AND gsub() ════════════════════════════════════════</span>
<span class="cb-cmt"># sub(regex, replacement, string) → replace first match</span>
<span class="cb-cmt"># gsub(regex, replacement, string) → replace ALL matches</span>
<span class="cb-prompt">$</span> echo "2024-01-15" | awk '{ gsub(/-/, "/"); print }'
<span class="cb-out">2024/01/15</span>

<span class="cb-prompt">$</span> awk -F',' '{ gsub(/  */, "", $2); print }' data.csv   <span class="cb-cmt"># trim spaces from col 2</span>

<span class="cb-cmt"># & in replacement = the matched text:</span>
<span class="cb-prompt">$</span> echo "error 404" | awk '{ gsub(/[0-9]+/, "[&]"); print }'
<span class="cb-out">error [404]</span>

<span class="cb-cmt">## ═══ gensub() — WITH BACKREFERENCES (gawk) ══════════════════</span>
<span class="cb-prompt">$</span> echo "2024-01-15" | gawk '{ print gensub(/([0-9]{4})-([0-9]{2})-([0-9]{2})/, "\\3/\\2/\\1", "g") }'
<span class="cb-out">15/01/2024</span>
<span class="cb-cmt"># gensub(regex, replace, how, [target])
# how: "g" = all, "1" = first, "2" = second, etc.
# Backrefs with \\1 \\2 etc.</span>

<span class="cb-cmt">## ═══ AWK DATA ENGINEERING PATTERNS ══════════════════════════</span>
<span class="cb-cmt"># Sum sales for matching region:</span>
awk -F',' '/Mumbai/ { sum += $2 } END { print sum }' sales.csv

<span class="cb-cmt"># Extract and reformat timestamped events:</span>
awk '/ERROR/ { gsub(/T/, " "); print $1, $4, $NF }' events.log

<span class="cb-cmt"># Count occurrences of each error type:</span>
awk '/ERROR/ { match($0, /ERROR: ([^,]+)/, a); counts[a[1]]++ }
     END { for(k in counts) print counts[k], k }' app.log | sort -rn
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — BASH =~ AND LOOKAROUNDS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Bash <code>=~</code> &amp; PCRE Lookarounds</h2>

<!-- CONSOLE 8 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — Bash =~, BASH_REMATCH, PCRE lookahead/lookbehind</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ [[ STRING =~ REGEX ]] ═══════════════════════════════════</span>
<span class="cb-cmt"># Uses POSIX ERE (same as grep -E)
# Pattern must NOT be quoted (or it's treated as literal)
# Stores captures in BASH_REMATCH array</span>

INPUT="sales_report_2024-01-15.csv"
if [[ $INPUT =~ ^([a-z]+)_([a-z]+)_([0-9]{4}-[0-9]{2}-[0-9]{2})\.csv$ ]]; then
    echo "Type:   \${BASH_REMATCH[1]}"
    echo "Name:   \${BASH_REMATCH[2]}"
    echo "Date:   \${BASH_REMATCH[3]}"
    echo "Full:   \${BASH_REMATCH[0]}"
fi
<span class="cb-out">Type:   sales</span>
<span class="cb-out">Name:   report</span>
<span class="cb-out">Date:   2024-01-15</span>
<span class="cb-out">Full:   sales_report_2024-01-15.csv</span>

<span class="cb-cmt">## ═══ VALIDATION PATTERNS ════════════════════════════════════</span>
<span class="cb-cmt"># Store pattern in variable for reuse (avoid quoting issue):</span>
INT_RE='^-?[0-9]+$'
FLOAT_RE='^-?[0-9]+(\.[0-9]+)?$'
DATE_RE='^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'
EMAIL_RE='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
IP_RE='^([0-9]{1,3}\.){3}[0-9]{1,3}$'
SEMVER_RE='^v?([0-9]+)\.([0-9]+)\.([0-9]+)$'

[[ "$PORT" =~ ^[0-9]+$ ]] && (( PORT >= 1 && PORT <= 65535 )) \
    || { echo "Invalid port: $PORT" >&2; exit 1; }

[[ "$EMAIL" =~ $EMAIL_RE ]] \
    || { echo "Invalid email: $EMAIL" >&2; exit 1; }

if [[ "$VERSION" =~ $SEMVER_RE ]]; then
    MAJOR="\${BASH_REMATCH[1]}"
    MINOR="\${BASH_REMATCH[2]}"
    PATCH="\${BASH_REMATCH[3]}"
fi

<span class="cb-cmt">## ═══ PCRE LOOKAHEAD (?=) — GREP -P ══════════════════════════</span>
<span class="cb-cmt"># Positive lookahead: match A only when followed by B (B not consumed)</span>
<span class="cb-prompt">$</span> echo -e "2024-01-15\n24-01-15\n2024-13-01" | grep -P '^\d{4}-(?=0[1-9]|1[0-2])'
<span class="cb-out">2024-01-15</span>
<span class="cb-cmt"># Year (4 digits) followed by valid month — month not consumed</span>

<span class="cb-cmt"># Negative lookahead: match A only when NOT followed by B</span>
<span class="cb-prompt">$</span> echo -e "ERROR\nERROR_DEBUG\nERROR test" | grep -P 'ERROR(?!_DEBUG)'
<span class="cb-out">ERROR</span>
<span class="cb-out">ERROR test</span>

<span class="cb-cmt">## ═══ PCRE LOOKBEHIND (?<=) — GREP -P ════════════════════════</span>
<span class="cb-cmt"># Positive lookbehind: match A only when preceded by B</span>
<span class="cb-prompt">$</span> echo "user=ravi port=5432 host=prod" | grep -oP '(?<=user=)\w+'
<span class="cb-out">ravi</span>
<span class="cb-cmt"># Extract value after 'user=' without including 'user=' in match</span>

<span class="cb-prompt">$</span> grep -oP '(?<=db_host=)[^\s]+' config.env
<span class="cb-prompt">$</span> grep -oP '(?<=password")[^"]+(?=")' config.yaml   <span class="cb-cmt"># value between quotes</span>

<span class="cb-cmt"># Negative lookbehind: match not preceded by B</span>
<span class="cb-prompt">$</span> echo -e "test.csv\nbackup.test.csv" | grep -P '(?<!backup\.)test'
<span class="cb-out">test.csv</span>

<span class="cb-cmt">## ═══ PCRE SHORTCUTS ══════════════════════════════════════════</span>
<span class="cb-cmt"># \d = [0-9]           \D = [^0-9]
# \w = [a-zA-Z0-9_]    \W = [^a-zA-Z0-9_]
# \s = [ \t\n\r\f]      \S = [^ \t\n\r\f]
# \b = word boundary     \B = non-boundary</span>

grep -P '\d{4}-\d{2}-\d{2}'            <span class="cb-cmt"># dates with \d shorthand</span>
grep -P '\bERROR\b'                     <span class="cb-cmt"># word boundary</span>
grep -P '^\s*#'                         <span class="cb-cmt"># comment lines</span>
grep -P '\w+@\w+\.\w+'                 <span class="cb-cmt"># email-like pattern</span>

<span class="cb-cmt">## ═══ COMPLETE DATA EXTRACTION EXAMPLES ══════════════════════</span>
<span class="cb-cmt"># Extract all JSON string values:</span>
grep -oP '(?<="value":")[^"]+' data.json

<span class="cb-cmt"># Extract HTTP status codes from access log:</span>
grep -oP '(?<= )\d{3}(?= )' access.log | sort | uniq -c | sort -rn

<span class="cb-cmt"># Extract duration from timing log:</span>
grep -oP '(?<=duration_ms=)\d+' perf.log | awk '{sum+=$1} END{print "avg:", sum/NR}'

<span class="cb-cmt"># Find malformed dates (month > 12):</span>
grep -P '20\d{2}-(1[3-9]|[2-9]\d)-\d{2}' data.csv
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — How Regex Engines Work</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ NFA vs DFA, POSIX Compliance &amp; regcomp/regexec in the Kernel</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# HOW REGEX ENGINES WORK

1. TWO ENGINE TYPES: NFA vs DFA

   NFA (Non-deterministic Finite Automaton) — used by PCRE, Perl, Python
   - Builds a state machine from the pattern
   - Explores multiple paths simultaneously (backtracking)
   - Supports backreferences (\\1 \\2) and lookarounds (?= ?!)
   - Can be O(2^n) in worst case (catastrophic backtracking)
   - Greedy/lazy quantifiers meaningfully different
   
   DFA (Deterministic Finite Automaton) — used by awk, egrep, re2
   - Each character advances to exactly one state
   - ALWAYS O(n) — no backtracking
   - Cannot support backreferences or lookarounds
   - Greedy/lazy distinction has no effect
   
   POSIX ERE (grep -E, bash =~): officially requires leftmost-longest
   match — can be NFA or DFA, but must agree on POSIX semantics

2. COMPILATION: regcomp(3)
   When grep/sed/bash encounters a pattern:
   
   regex_t compiled;
   int err = regcomp(&compiled, pattern, REG_EXTENDED | REG_NOSUB);
   
   REG_EXTENDED = ERE (otherwise BRE)
   REG_ICASE    = case-insensitive
   REG_NOSUB    = don't store submatches (faster)
   REG_NEWLINE  = ^ and $ match at embedded newlines
   
   regcomp() returns 0 on success, error code on bad pattern
   
3. EXECUTION: regexec(3)
   
   regmatch_t matches[10];  // store up to 10 group matches
   int result = regexec(&compiled, text, 10, matches, 0);
   
   result == 0         → match found
   result == REG_NOMATCH → no match
   
   matches[0].rm_so  → start offset of full match
   matches[0].rm_eo  → end offset of full match
   matches[1].rm_so  → start of group 1
   matches[N].rm_so  → start of group N
   
   This is exactly what bash [[ =~ ]] calls internally
   BASH_REMATCH is populated from the regmatch_t array

4. CATASTROPHIC BACKTRACKING
   The pattern (a+)+ on the string "aaaaaaaaaa!"
   - NFA tries: 1 group of 10 a's → fails on !
   - Backtracks: 1+9, then 2+8, then... 2^10 combinations
   - With 30 a's: billions of combinations → seconds to match
   
   Fix: rewrite to avoid nested quantifiers
   Catastrophic patterns: (a+)+  (a|a)+  ([a-zA-Z]+)*
   
5. GREP PERFORMANCE
   grep reads input with read() syscall
   Pattern matching: one or more calls to regexec() per line
   
   Performance tips:
   - grep -F 'literal'  uses Boyer-Moore string search — very fast
   - grep -E vs grep: ERE slightly faster (no BRE-to-ERE conversion)
   - Anchored patterns (^, $) allow early termination
   - LC_ALL=C grep ... speeds up character comparison (byte comparison)
   
   $ LC_ALL=C grep -F 'ERROR' 40gb.log   # much faster than default

6. BASH =~ DETAILS
   bash compiles the right-hand side pattern with regcomp()
   stores in a compiled regex cache per function scope
   calls regexec() on each [[ =~ ]] test
   populates BASH_REMATCH from regmatch_t results
   
   Pattern variable store (avoid repeated compilation):
   PATTERN='^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
   if [[ "$DATE" =~ $PATTERN ]]; ...
   # bash caches the compiled regex for $PATTERN's value
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Data Engineering Regex</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Production Regex Patterns for Data Engineering</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: COMPLETE INPUT VALIDATION LIBRARY ════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out"></span>
<span class="cb-out"># Validation patterns</span>
<span class="cb-out">declare -A PATTERNS=(</span>
<span class="cb-out">    [iso_date]='^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'</span>
<span class="cb-out">    [email]='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'</span>
<span class="cb-out">    [ipv4]='^([0-9]{1,3}\.){3}[0-9]{1,3}$'</span>
<span class="cb-out">    [port]='^[0-9]{1,5}$'</span>
<span class="cb-out">    [semver]='^v?([0-9]+)\.([0-9]+)\.([0-9]+)(-[a-zA-Z0-9.]+)?$'</span>
<span class="cb-out">    [slug]='^[a-z0-9]+(-[a-z0-9]+)*$'</span>
<span class="cb-out">    [identifier]='^[a-zA-Z_][a-zA-Z0-9_]*$'</span>
<span class="cb-out">    [uuid]='^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'</span>
<span class="cb-out">)</span>
<span class="cb-out"></span>
<span class="cb-out">validate() {</span>
<span class="cb-out">    local TYPE="$1" VALUE="$2"</span>
<span class="cb-out">    local PATTERN="\${PATTERNS[$TYPE]}"</span>
<span class="cb-out">    [[ -n $PATTERN ]] || { echo "Unknown type: $TYPE" >&2; return 2; }</span>
<span class="cb-out">    [[ $VALUE =~ $PATTERN ]]</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">validate iso_date "2024-01-15" && echo "✅ valid date"</span>
<span class="cb-out">validate email    "ravi@data.io" && echo "✅ valid email"</span>
<span class="cb-out">validate port     "5432" && (( 5432 >= 1 && 5432 <= 65535 )) && echo "✅ valid port"</span>

<span class="cb-cmt">## ═══ PATTERN 2: LOG ANALYSIS PIPELINE ════════════════════════</span>
analyse_logs() {
    local LOGDIR="$1" DATE="\${2:-$(date +%Y-%m-%d)}"

    echo "=== Log Analysis for $DATE ==="

    <span class="cb-cmt"># Error count by type:</span>
    echo "--- Error Types ---"
    grep -r "^$DATE" "$LOGDIR"/*.log 2>/dev/null \
        | grep -oP 'ERROR: [A-Za-z]+' \
        | sort | uniq -c | sort -rn | head -10

    <span class="cb-cmt"># Slowest operations:</span>
    echo "--- Slowest Operations (ms) ---"
    grep -r "^$DATE" "$LOGDIR"/*.log 2>/dev/null \
        | grep -oP 'duration_ms=\K[0-9]+' \
        | sort -rn | head -5

    <span class="cb-cmt"># Unique IPs:</span>
    echo "--- Unique IPs ---"
    grep -r "^$DATE" "$LOGDIR"/access.log 2>/dev/null \
        | grep -oP '\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b' \
        | sort | uniq | wc -l
}

<span class="cb-cmt">## ═══ PATTERN 3: CSV FIELD VALIDATION ════════════════════════</span>
validate_csv_row() {
    local LINE="$1"
    local -a FIELDS
    IFS=',' read -r -a FIELDS <<< "$LINE"

    [[ "\${#FIELDS[@]}" -eq 5 ]] || return 1

    local DATE="\${FIELDS[0]}" AMOUNT="\${FIELDS[1]}" REGION="\${FIELDS[2]}"

    [[ $DATE   =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$  ]] || return 2
    [[ $AMOUNT =~ ^[0-9]+(\.[0-9]{2})?$           ]] || return 3
    [[ $REGION =~ ^[A-Za-z ]+$                     ]] || return 4
    return 0
}

ERRORS=0
ROW_NUM=0
while IFS= read -r line; do
    (( ROW_NUM++ ))
    [[ $ROW_NUM -eq 1 ]] && continue    <span class="cb-cmt"># skip header</span>
    if ! validate_csv_row "$line"; then
        echo "Row $ROW_NUM invalid (exit $?): $line" >&2
        (( ERRORS++ ))
    fi
done < sales.csv
echo "Validation: $((ROW_NUM-1)) rows, $ERRORS invalid"

<span class="cb-cmt">## ═══ PATTERN 4: CONFIG FILE PARSER ══════════════════════════</span>
parse_config() {
    local FILE="$1"
    declare -gA CONFIG

    while IFS= read -r line; do
        [[ $line =~ ^[[:space:]]*# ]] && continue   <span class="cb-cmt"># skip comments</span>
        [[ $line =~ ^[[:space:]]*$ ]] && continue   <span class="cb-cmt"># skip blank</span>
        if [[ $line =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
            local KEY="\${BASH_REMATCH[1]}"
            local VAL="\${BASH_REMATCH[2]}"
            VAL="\${VAL%\"}"                          <span class="cb-cmt"># strip trailing quote</span>
            VAL="\${VAL#\"}"                          <span class="cb-cmt"># strip leading quote</span>
            CONFIG["$KEY"]="$VAL"
        fi
    done < "$FILE"
}
parse_config /etc/myapp/config
echo "Host: \${CONFIG[DB_HOST]}"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — All Operators &amp; Tools</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:22%">Pattern</th><th>Meaning</th><th>BRE</th><th>ERE</th><th>PCRE</th></tr></thead>
<tbody>
<tr><td colspan="5" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">Anchors &amp; Assertions</td></tr>
<tr><td style="font-family:monospace;">^</td><td>Start of line</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">$</td><td>End of line</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">\b</td><td>Word boundary</td><td>varies</td><td>varies</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">(?=pat)</td><td>Positive lookahead</td><td>❌</td><td>❌</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">(?!pat)</td><td>Negative lookahead</td><td>❌</td><td>❌</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">(?&lt;=pat)</td><td>Positive lookbehind</td><td>❌</td><td>❌</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">(?&lt;!pat)</td><td>Negative lookbehind</td><td>❌</td><td>❌</td><td>✅</td></tr>
<tr><td colspan="5" style="background:#0e1824;color:#58a6ff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Quantifiers</td></tr>
<tr><td style="font-family:monospace;">*</td><td>0 or more</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">+</td><td>1 or more</td><td><code>\+</code></td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">?</td><td>0 or 1</td><td><code>\?</code></td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">{n}</td><td>Exactly n</td><td><code>\{n\}</code></td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">{n,m}</td><td>n to m</td><td><code>\{n,m\}</code></td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">*?  +?</td><td>Lazy (non-greedy)</td><td>❌</td><td>❌</td><td>✅</td></tr>
<tr><td colspan="5" style="background:#2a2a1a;color:#ffa657;font-family:'Segoe UI',sans-serif;font-weight:bold;">Character Classes</td></tr>
<tr><td style="font-family:monospace;">.</td><td>Any char except newline</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">[abc]</td><td>Any char in set</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">[^abc]</td><td>Any char NOT in set</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">[a-z]</td><td>Range</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">[:digit:]</td><td>POSIX class</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">\d  \w  \s</td><td>PCRE shortcuts</td><td>❌</td><td>❌</td><td>✅</td></tr>
<tr><td colspan="5" style="background:#1a1a3a;color:#bc8cff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Groups &amp; Alternation</td></tr>
<tr><td style="font-family:monospace;">(abc)</td><td>Capturing group</td><td><code>\( \)</code></td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">(?:abc)</td><td>Non-capturing group</td><td>❌</td><td>❌</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">(?P&lt;n&gt;abc)</td><td>Named group</td><td>❌</td><td>❌</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">a|b</td><td>Alternation</td><td><code>\|</code></td><td>✅</td><td>✅</td></tr>
<tr><td style="font-family:monospace;">\\1  \\2</td><td>Backreference</td><td>✅</td><td>✅</td><td>✅</td></tr>
<tr><td colspan="5" style="background:#1f2027;color:#8b949e;font-family:'Segoe UI',sans-serif;font-weight:bold;">Tool Quick Reference</td></tr>
<tr><td style="font-family:monospace;">grep 'pat'</td><td>BRE matching</td><td colspan="3">-i=ignore case  -v=invert  -n=line nums  -c=count  -l=filenames  -o=match only  -q=quiet  -r=recursive  -A/-B/-C=context</td></tr>
<tr><td style="font-family:monospace;">grep -E</td><td>ERE matching</td><td colspan="3">Same flags; also: -P for PCRE  -F for fixed string  -w for whole word</td></tr>
<tr><td style="font-family:monospace;">sed 's/p/r/'</td><td>BRE substitute</td><td colspan="3">/g=all  /i=nocase  /N=Nth match  -E for ERE  -i for in-place  -n for suppress</td></tr>
<tr><td style="font-family:monospace;">awk '/pat/'</td><td>ERE match lines</td><td colspan="3">$N ~ /pat/  for field  match()  sub()  gsub()  gensub() (gawk)</td></tr>
<tr><td style="font-family:monospace;">[[ =~ ]]</td><td>bash ERE</td><td colspan="3">BASH_REMATCH[N] for groups  Pattern must not be quoted  Unset BASH_REMATCH before use</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Glob Mastery</h4>
    <p>Create test files and directories, then use globs to match them:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create: <code>sales_2024.csv  sales_2023.csv  report.csv.gz  data.json  backup.csv  README.md</code></li>
      <li>Using only globs (no grep/find), match: all CSVs, all CSVs not backup, files with exactly 4 chars before .csv, files starting with s or r</li>
      <li>Enable <code>extglob</code> and match: all non-gz files, files ending in csv OR json, files NOT starting with 'b'</li>
      <li>Use brace expansion to: create 12 monthly directory names <code>2024-01</code> through <code>2024-12</code>, copy a file with <code>.bak</code> extension in one command</li>
      <li>Enable <code>nullglob</code> and write a loop that handles the case where no <code>*.xml</code> files exist without errors</li>
      <li>Use glob in <code>[[ == ]]</code> to check if a variable matches the pattern <code>YYYY-MM-DD</code> (4 digits - 2 digits - 2 digits)</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — grep Patterns</h4>
    <p>Use this sample log data for all exercises:</p>
    <pre style="background:#161b22;padding:10px;border-radius:6px;font-family:monospace;font-size:12px;color:#e6edf3;margin:8px 0;">2024-01-15 10:30:01 INFO pipeline started user=ravi
2024-01-15 10:30:05 ERROR connection failed host=db-01 port=5432
2024-01-15 10:30:10 WARN retry 1/3 duration_ms=1523
2024-01-15 10:30:15 ERROR timeout host=api-01 port=443
2024-01-15 10:30:20 INFO processed 1000 rows</pre>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Find all ERROR lines using BRE</li>
      <li>Find ERROR or WARN lines using ERE (<code>-E</code>)</li>
      <li>Count only lines that end with a number</li>
      <li>Extract all <code>host=</code> values using <code>-oP</code> with lookbehind</li>
      <li>Extract all port numbers using <code>-oP</code></li>
      <li>Find lines where port is exactly 5432</li>
      <li>Show ERROR lines with 2 lines of context</li>
      <li>Find lines where duration exceeds 1000ms (extract and test numerically)</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — sed Transformations</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Convert all dates from <code>DD/MM/YYYY</code> to <code>YYYY-MM-DD</code> in a file using <code>sed -E</code> with 3 capture groups</li>
      <li>Remove all lines starting with <code>#</code> (comments) and blank lines in one <code>sed</code> command</li>
      <li>In a CSV file, wrap every field in double quotes: <code>a,b,c</code> → <code>"a","b","c"</code></li>
      <li>Replace <code>localhost</code> with <code>$DB_HOST</code> value in a config file — use <code>-i.bak</code></li>
      <li>Convert <code>CamelCase</code> variable names to <code>snake_case</code> using <code>sed</code></li>
      <li>Remove ANSI escape codes (<code>\e[...m</code>) from a coloured log file</li>
      <li>In-place: number each non-blank, non-comment line in a config file</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Bash =~ Validation Suite</h4>
    <p>Write a complete <code>validate.sh</code> using only <code>[[ =~ ]]</code>:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>ISO date with valid month (01-12) and day (01-31) — extract year/month/day into separate vars using <code>BASH_REMATCH</code></li>
      <li>Semantic version <code>v1.2.3</code> or <code>v1.2.3-beta.1</code> — extract major/minor/patch/pre-release</li>
      <li>Email address with domain validation</li>
      <li>IPv4 address — then validate each octet is 0-255 using arithmetic</li>
      <li>AWS S3 URI: <code>s3://bucket-name/path/to/file.csv</code> — extract bucket and path</li>
      <li>PostgreSQL connection string: <code>postgresql://user:pass@host:port/db</code> — extract all components</li>
      <li>For each validation, print ✅ or ❌ with the specific failure reason</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Log Mining Pipeline</h4>
    <p>Build <code>log_mine.sh</code> — a complete log analysis tool:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Input:</strong> Accept <code>--log-dir DIR</code>, <code>--date YYYY-MM-DD</code>, <code>--format FORMAT</code> (apache/nginx/custom) flags using shift-based parsing</li>
      <li><strong>Format detection:</strong> Use regex to auto-detect log format if <code>--format</code> not given — each format has a distinctive timestamp pattern</li>
      <li><strong>Extraction:</strong> Use <code>grep -oP</code> with named groups to extract: timestamp, level, user, host, port, duration, status_code from each line</li>
      <li><strong>Validation:</strong> Use <code>[[ =~ ]]</code> to validate each extracted field — flag rows where fields don't match expected patterns</li>
      <li><strong>Analysis:</strong> Using <code>awk</code> with regex: count by severity, top 10 errors by type, average duration per operation, requests per minute</li>
      <li><strong>Transformation:</strong> Use <code>sed -E</code> to normalise all timestamps to ISO 8601 regardless of source format</li>
      <li><strong>Report:</strong> Generate structured output with <code>printf</code> — section headers, tables, totals</li>
    </ol>
    <p><strong>Must work correctly on files with spaces in paths. Must pass <code>shellcheck</code>.</strong></p>
  </div>
</div>

<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's 4-Second Search — Day 270</div>
    <p>The corrupted timestamps turned out to be a timezone bug — the source system was sending UTC times formatted as IST, and the pipeline was treating them as UTC. Ravi found it with this one command:</p>
    <p><code>grep -oP '(?&lt;=timestamp=")[^"]+' /logs/pipeline-*.log | grep -vP '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$' | sort | uniq -c | head -5</code></p>
    <p>It extracted every timestamp, filtered out the valid ones, and showed the malformed patterns — counted and ranked. Six days of silent corruption, diagnosed in 4 seconds.</p>
    <p>Ravi now had a library of patterns. Date validation. Email check. IP extraction. Config parser. Log miner. Each one a regex he'd built, tested, and stored. "Regex is not magic," he told a new teammate who was struggling. "It's a vocabulary. You learn twenty patterns and you can read any text file. You can search anything." He paused. "But you have to know the difference between glob and regex first."</p>
    <p><strong>The shell speaks in patterns. Learn its language.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};