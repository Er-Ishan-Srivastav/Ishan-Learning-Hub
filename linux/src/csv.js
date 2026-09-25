// ============================================================
// myPathshala – Linux Programming Course
// Module: csv_json.js
// Topic: CSV / JSON Processing
// ============================================================
// COMPLETE EXPERT-LEVEL BUILD:
//  • 20 sections
//  • 12 simulation consoles
//  • 14 animated SVG diagrams:
//    - CSV anatomy (header, fields, quoting, escaping)
//    - CSV edge cases visual (embedded commas, newlines, quotes)
//    - cut vs awk vs python CSV comparison
//    - jq filter chain animated
//    - JSON structure tree (nested objects/arrays)
//    - jq select/map/reduce pipeline
//    - TSV vs CSV vs PSV format comparison
//    - JSON Lines (JSONL) streaming visual
//    - csvkit tool suite overview
//    - In2csv format conversion map
//    - CSV join/merge diagram
//    - JSON schema validation visual
//    - Transformation pipeline (CSV→filter→enrich→JSON→load)
//    - Performance comparison chart (tools × file sizes)
//  • CSS keyframe animations throughout
//  • CSV: RFC 4180, quoting rules, embedded newlines,
//    BOM handling, encoding, cut, awk -F, csvkit (csvstat,
//    csvcut, csvgrep, csvjoin, csvsort, csvformat, in2csv)
//  • JSON: structure, jq (every filter, select, map, reduce,
//    group_by, unique_by, env, @base64, @uri, @csv, @tsv,
//    try-catch, def, paths, getpath, setpath), json.tool
//  • JSONL: streaming, jq -c, parallel processing
//  • Conversions: CSV↔JSON, TSV↔CSV, Excel→CSV, XML→JSON
//  • Python one-liners for complex transformations
//  • Real ETL: API responses, database exports, enrichment
//  • 5 exercises Easy → Hard
//  • Ravi storyline throughout
// ============================================================

var csv_json = {
    title: "CSV / JSON Processing",
    description: "Master structured data processing in the shell — parse CSV files correctly (including edge cases with quoting and embedded delimiters), transform data with cut, awk, and the csvkit suite, query and transform JSON with jq at expert depth, process streaming JSON Lines, convert between formats, and build complete ETL pipelines from API responses to database-ready output.",
    content: `
<style>
/* ── Keyframe animations ── */
@keyframes cj-flow  { 0%{stroke-dashoffset:28} 100%{stroke-dashoffset:0} }
@keyframes cj-pulse { 0%,100%{opacity:1} 50%{opacity:.15} }
@keyframes cj-pop   { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
@keyframes cj-blink { 0%,100%{fill:#3fb950;stroke:#3fb950} 50%{fill:#0a1a0a;stroke:#238636} }
@keyframes cj-parse { 0%{fill:#161b22} 50%{fill:#1a2a1a} 100%{fill:#1a3a1a} }
@keyframes cj-slide { 0%{transform:translateX(-20px);opacity:0} 100%{transform:translateX(0);opacity:1} }
@keyframes cj-warn  { 0%,100%{fill:#2a1a14;stroke:#f85149} 50%{fill:#1a0000;stroke:#ff6b6b} }
@keyframes cj-mark  { 0%{opacity:0} 100%{opacity:1} }

.cj-flow  { stroke-dasharray:7 5; animation: cj-flow  .9s linear infinite; }
.cj-pulse { animation: cj-pulse 1.8s ease-in-out infinite; }
.cj-blink { animation: cj-blink 2.4s ease-in-out infinite; }
.cj-pop   { animation: cj-pop   .5s cubic-bezier(.34,1.56,.64,1) both; }
.cj-warn  { animation: cj-warn  1.2s ease-in-out infinite; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Broken Pipeline — Day 530</div>
    <br>
    <p>The pipeline had been working perfectly for months. Then one day it produced wrong results. The aggregation numbers were off by thousands. After two hours of debugging, Priya found the problem in a single line of the input CSV:</p>
    <pre style="font-family:monospace;font-size:12px;background:#161b22;padding:8px;border-radius:4px;color:#f85149;">2024-01-15,"Acme Corp, Ltd",UK,"1,234.56",CONFIRMED</pre>
    <br>
    <p>The company name contained a comma. So did the amount. The pipeline was splitting on commas naïvely — <code>cut -d, -f4</code> — and getting the wrong field. The amount <code>"1,234.56"</code> was being split into two fields: <code>"1</code> and <code>234.56"</code>.</p>
    <br>
    <p>"CSV has rules," Priya said. "Fields containing commas, quotes, or newlines must be quoted. Quoted fields can contain anything. But most tools don't handle the edge cases. <code>cut</code> doesn't understand quoting at all."</p>
    <br>
    <p>She rewrote the pipeline using <code>csvkit</code>. Three commands. The same pipeline that had been broken for an unknown number of months immediately produced correct numbers.</p>
    <br>
    <p>That afternoon Ravi learned the difference between naïve delimiter splitting and RFC 4180-compliant CSV parsing. He also learned to never trust <code>cut</code> on real-world CSV data. And he learned <code>jq</code> — the tool that does for JSON what <code>awk</code> does for text.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — CSV ANATOMY & RFC 4180
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> CSV Anatomy — RFC 4180 &amp; The Edge Cases That Break Pipelines</h2>

<p>CSV looks simple but has strict rules under RFC 4180. Violating them — or ignoring them in your parsing — produces silent data corruption. The hardest bugs to find are the ones where the tool runs successfully but returns the wrong data.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="cj-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="cj-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="cj-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="cj-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="cj-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="cj-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>
  <rect width="820" height="320" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">CSV RFC 4180 Rules — What Each Quoting Pattern Means</text>

  <!-- Header row anatomy -->
  <rect x="14" y="36" width="792" height="50" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="26" y="56" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Header row (first line):</text>
  <text x="26" y="76" font-family="'Courier New',monospace" font-size="11.5">
    <tspan fill="#58a6ff">date</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#3fb950">company</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#ffa657">country</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#bc8cff">amount</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#e6edf3">status</tspan>
  </text>
  <text x="606" y="56" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">← field names (no quoting needed)</text>

  <!-- Row 1: Simple -->
  <rect x="14" y="96" width="792" height="42" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="26" y="114" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#58a6ff">✅ Simple row:</text>
  <text x="26" y="130" font-family="'Courier New',monospace" font-size="11">
    <tspan fill="#58a6ff">2024-01-15</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#3fb950">AcmeCorp</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#ffa657">UK</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#bc8cff">1234.56</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#e6edf3">CONFIRMED</tspan>
  </text>
  <text x="610" y="122" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">No quoting needed: no comma, newline, or quote in fields</text>

  <!-- Row 2: Comma in field -->
  <rect x="14" y="148" width="792" height="42" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="26" y="166" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#ffa657">⚠ Comma in field (MUST quote):</text>
  <text x="26" y="182" font-family="'Courier New',monospace" font-size="11">
    <tspan fill="#58a6ff">2024-01-15</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#f85149">"</tspan><tspan fill="#3fb950">Acme Corp, Ltd</tspan><tspan fill="#f85149">"</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#ffa657">UK</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#f85149">"</tspan><tspan fill="#bc8cff">1,234.56</tspan><tspan fill="#f85149">"</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#e6edf3">CONFIRMED</tspan>
  </text>
  <text x="646" y="166" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">MUST wrap in double quotes</text>
  <text x="646" y="180" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">cut -d, -f4 FAILS here!</text>

  <!-- Row 3: Quote in field -->
  <rect x="14" y="200" width="792" height="42" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="26" y="218" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#f85149">⚠ Double-quote in field (escape by doubling):</text>
  <text x="26" y="234" font-family="'Courier New',monospace" font-size="11">
    <tspan fill="#58a6ff">2024-01-15</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#f85149">"</tspan><tspan fill="#3fb950">She said </tspan><tspan fill="#f85149">""</tspan><tspan fill="#3fb950">hello</tspan><tspan fill="#f85149">""</tspan><tspan fill="#3fb950"> to me</tspan><tspan fill="#f85149">"</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#ffa657">UK</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#bc8cff">99.99</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#e6edf3">DONE</tspan>
  </text>
  <text x="556" y="216" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">"" inside quoted field = literal " character</text>
  <text x="556" y="230" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">NOT backslash escape (\") — that's wrong!</text>

  <!-- Row 4: Newline in field -->
  <rect x="14" y="252" width="792" height="42" rx="6" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="26" y="270" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#bc8cff">⚠ Newline in field (must still be quoted):</text>
  <text x="26" y="286" font-family="'Courier New',monospace" font-size="11">
    <tspan fill="#58a6ff">2024-01-15</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#f85149">"</tspan><tspan fill="#3fb950">line one</tspan><tspan fill="#bc8cff">\n</tspan><tspan fill="#3fb950">line two</tspan><tspan fill="#f85149">"</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#ffa657">UK</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#bc8cff">50.00</tspan><tspan fill="#30363d">,</tspan>
    <tspan fill="#e6edf3">OK</tspan>
  </text>
  <text x="604" y="270" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">Actual embedded newline in the CSV file</text>
  <text x="604" y="284" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Makes grep/tail/wc -l all wrong!</text>
</svg>
<p class="diagram-caption">The rule: a field containing a comma, a double-quote, or a newline MUST be enclosed in double-quotes. A double-quote inside a quoted field is represented by two double-quotes (<code>""</code>). This is RFC 4180. <strong>Tools that split on commas naively (like <code>cut -d,</code>) will corrupt data silently when these cases occur.</strong></p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 12 — CSV basics: structure, BOM, encoding, CRLF, python -c validation</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ INSPECT A CSV FILE ════════════════════════════════════</span>
<span class="cb-prompt">$</span> head -3 sales.csv                   <span class="cb-cmt"># view first 3 lines</span>
<span class="cb-out">date,company,country,amount,status</span>
<span class="cb-out">2024-01-15,AcmeCorp,UK,1234.56,CONFIRMED</span>
<span class="cb-out">2024-01-15,"Acme Corp, Ltd",UK,"1,234.56",CONFIRMED</span>

<span class="cb-prompt">$</span> wc -l sales.csv                     <span class="cb-cmt"># line count (⚠ wrong if embedded newlines!)</span>
<span class="cb-prompt">$</span> file sales.csv                      <span class="cb-cmt"># detect encoding</span>
<span class="cb-out">sales.csv: UTF-8 Unicode (with BOM) text, with CRLF line terminators</span>

<span class="cb-cmt">## ═══ COMMON CSV PROBLEMS AND FIXES ════════════════════════</span>
<span class="cb-cmt"># Fix 1: Windows CRLF → Unix LF:</span>
<span class="cb-prompt">$</span> sed 's/\r//' sales.csv > clean.csv
<span class="cb-prompt">$</span> dos2unix sales.csv                  <span class="cb-cmt"># or use dos2unix</span>

<span class="cb-cmt"># Fix 2: Remove BOM (UTF-8 with BOM = \xEF\xBB\xBF at start):</span>
<span class="cb-prompt">$</span> sed 's/^\xEF\xBB\xBF//' sales.csv > clean.csv
<span class="cb-prompt">$</span> file clean.csv
<span class="cb-out">clean.csv: UTF-8 Unicode text</span>

<span class="cb-cmt"># Fix 3: Convert encoding (latin1 → UTF-8):</span>
<span class="cb-prompt">$</span> iconv -f latin1 -t utf8 sales.csv > clean.csv

<span class="cb-cmt">## ═══ VALIDATE CSV WITH PYTHON ══════════════════════════════</span>
<span class="cb-cmt"># Quick validation using Python's csv module (RFC 4180 compliant):</span>
<span class="cb-prompt">$</span> python3 -c "
import csv, sys
with open('sales.csv', newline='', encoding='utf-8-sig') as f:
    r = csv.reader(f)
    header = next(r)
    print('Columns:', header)
    print('Header count:', len(header))
    errors = 0
    for i, row in enumerate(r, 2):
        if len(row) != len(header):
            print(f'Row {i}: expected {len(header)} fields, got {len(row)}')
            errors += 1
    print(f'Rows checked. Errors: {errors}')
"
<span class="cb-out">Columns: ['date', 'company', 'country', 'amount', 'status']</span>
<span class="cb-out">Header count: 5</span>
<span class="cb-out">Rows checked. Errors: 0</span>

<span class="cb-cmt">## ═══ COUNT ACTUAL DATA ROWS (handles embedded newlines) ════</span>
<span class="cb-prompt">$</span> python3 -c "
import csv
with open('sales.csv', newline='') as f:
    print(sum(1 for _ in csv.reader(f)) - 1, 'data rows')
"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — CSV TOOLS COMPARISON (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> CSV Tool Selection — cut vs awk vs csvkit vs Python</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="270" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">CSV Tool Comparison — Quoting Support &amp; Capabilities</text>

  <!-- Headers -->
  <rect x="14" y="36" width="792" height="26" rx="4" fill="#1f2027"/>
  <text x="110" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Tool</text>
  <text x="240" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">RFC 4180?</text>
  <text x="370" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Best For</text>
  <text x="610" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Limitations</text>

  <!-- cut -->
  <rect x="14" y="64" width="792" height="28" rx="2" fill="#2a1a14"/>
  <text x="110" y="82" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">cut -d,</text>
  <text x="240" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">❌ None</text>
  <text x="370" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Simple delimited, no quoting</text>
  <text x="610" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">BREAKS on quoted fields</text>

  <!-- awk -->
  <rect x="14" y="94" width="792" height="28" rx="2" fill="#2a2a14"/>
  <text x="110" y="112" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">awk -F,</text>
  <text x="240" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">⚠ Partial</text>
  <text x="370" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Aggregation, math, groupby</text>
  <text x="610" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">Ignores quoting; breaks on commas in fields</text>

  <!-- csvkit -->
  <rect x="14" y="124" width="792" height="28" rx="2" fill="#1a2a1a"/>
  <text x="110" y="142" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">csvkit</text>
  <text x="240" y="142" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">✅ Full</text>
  <text x="370" y="142" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">CSV cut, grep, join, sort, stat</text>
  <text x="610" y="142" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Python dependency; slower on huge files</text>

  <!-- miller -->
  <rect x="14" y="154" width="792" height="28" rx="2" fill="#0e1824"/>
  <text x="110" y="172" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">mlr (miller)</text>
  <text x="240" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">✅ Full</text>
  <text x="370" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Swiss army knife: CSV/TSV/JSON/NIDX</text>
  <text x="610" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Separate install; learning curve</text>

  <!-- Python csv -->
  <rect x="14" y="184" width="792" height="28" rx="2" fill="#1f1428"/>
  <text x="110" y="202" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">python csv</text>
  <text x="240" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">✅ Full</text>
  <text x="370" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Complex logic, custom transforms</text>
  <text x="610" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Most verbose; usually fastest for complex</text>

  <!-- Decision guide -->
  <rect x="14" y="224" width="792" height="36" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="242" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Decision guide: </text>
  <text x="126" y="242" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Simple fixed-format (no quoting risk): </text>
  <text x="334" y="242" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">cut</text>
  <text x="362" y="242" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">  |  Real-world CSV with quoting: </text>
  <text x="538" y="242" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">csvkit</text>
  <text x="580" y="242" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">or </text>
  <text x="602" y="242" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">mlr</text>
  <text x="26" y="256" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">⚠ Always check: does your CSV actually have quoted fields?  If yes: never use cut or bare awk for field extraction</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 12 — cut: when it works and when it breaks; awk -F safe patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ cut — FAST BUT FRAGILE ════════════════════════════════</span>
<span class="cb-prompt">$</span> cut -d, -f1     sales.csv    <span class="cb-cmt"># field 1 (date)</span>
<span class="cb-prompt">$</span> cut -d, -f1,3   sales.csv    <span class="cb-cmt"># fields 1 and 3</span>
<span class="cb-prompt">$</span> cut -d, -f2-4   sales.csv    <span class="cb-cmt"># fields 2 through 4</span>
<span class="cb-prompt">$</span> cut -d, -f4-    sales.csv    <span class="cb-cmt"># field 4 to end</span>
<span class="cb-cmt"># cut is safe ONLY when you know:
# 1. No quoted fields containing commas
# 2. Fixed, known delimiter everywhere
# Real-world CSV: use csvcut instead</span>

<span class="cb-cmt">## ═══ cut -c: CHARACTER-BASED (always safe) ════════════════</span>
<span class="cb-prompt">$</span> cut -c1-10  timestamps.txt   <span class="cb-cmt"># first 10 characters of each line</span>
<span class="cb-prompt">$</span> cut -c11-   timestamps.txt   <span class="cb-cmt"># from char 11 to end</span>
<span class="cb-cmt"># Character-based cut never needs quoting awareness</span>

<span class="cb-cmt">## ═══ awk -F: BETTER THAN cut, STILL NOT QUOTE-AWARE ═══════</span>
<span class="cb-prompt">$</span> awk -F, 'NR>1{print $1, $3}' sales.csv     <span class="cb-cmt"># fields 1 and 3 (skip header)</span>
<span class="cb-prompt">$</span> awk -F, 'NR>1 && $5=="CONFIRMED"' sales.csv  <span class="cb-cmt"># filter by status</span>
<span class="cb-prompt">$</span> awk -F, 'NR>1{sum+=$4} END{print sum}' sales.csv   <span class="cb-cmt"># sum amounts</span>
<span class="cb-cmt"># awk advantages over cut: arithmetic, filtering, aggregation
# awk disadvantage: still split-on-comma, breaks on quoted commas</span>

<span class="cb-cmt">## ═══ TSV: THE SAFER ALTERNATIVE ════════════════════════════</span>
<span class="cb-cmt"># Tab-separated values: fields rarely contain tabs
# cut and awk work reliably with TSV</span>
<span class="cb-prompt">$</span> cut -f1,3 data.tsv                          <span class="cb-cmt"># -f with default tab delimiter</span>
<span class="cb-prompt">$</span> awk -F'\t' '{print $2}' data.tsv            <span class="cb-cmt"># explicit tab FS</span>

<span class="cb-cmt"># Convert CSV → TSV (naively — breaks if commas in quoted fields):</span>
<span class="cb-prompt">$</span> sed 's/,/\t/g' simple.csv > simple.tsv

<span class="cb-cmt"># Safe CSV → TSV using csvformat (from csvkit):</span>
<span class="cb-prompt">$</span> csvformat -T sales.csv > sales.tsv          <span class="cb-cmt"># RFC 4180 compliant</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — csvkit: COMPLETE SUITE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> csvkit — The Complete CSV Toolkit</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">csvkit Tool Suite — 8 Commands, One Data Pipeline</text>

  <!-- in2csv -->
  <rect x="14"  y="36" width="180" height="60" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="104" y="57" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#bc8cff">in2csv</text>
  <text x="104" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Excel/JSON/DBF/fixed</text>
  <text x="104" y="87" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">→ CSV</text>

  <line x1="194" y1="66" x2="230" y2="66" stroke="#ffa657" stroke-width="2" marker-end="url(#cj-orn)" class="cj-flow"/>

  <!-- csvclean -->
  <rect x="230" y="36" width="160" height="60" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="310" y="57" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#ffa657">csvclean</text>
  <text x="310" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">validate, fix encoding</text>
  <text x="310" y="87" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">report bad rows</text>

  <line x1="390" y1="66" x2="426" y2="66" stroke="#ffa657" stroke-width="2" marker-end="url(#cj-orn)" class="cj-flow"/>

  <!-- csvcut -->
  <rect x="426" y="36" width="160" height="60" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="506" y="57" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#58a6ff">csvcut</text>
  <text x="506" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">select/reorder columns</text>
  <text x="506" y="87" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">by name or number</text>

  <line x1="586" y1="66" x2="622" y2="66" stroke="#ffa657" stroke-width="2" marker-end="url(#cj-orn)" class="cj-flow"/>

  <!-- csvgrep -->
  <rect x="622" y="36" width="184" height="60" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="714" y="57" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#3fb950">csvgrep</text>
  <text x="714" y="73" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">filter rows by value/regex</text>
  <text x="714" y="87" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">quote-aware grep</text>

  <!-- Row 2 of tools -->
  <rect x="14"  y="114" width="180" height="60" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="104" y="135" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#3fb950">csvsort</text>
  <text x="104" y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">sort by any column</text>
  <text x="104" y="165" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">type-aware sorting</text>

  <rect x="210" y="114" width="180" height="60" rx="7" fill="#2a1a14" stroke="#f85149" stroke-width="1.8"/>
  <text x="300" y="135" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#f85149">csvjoin</text>
  <text x="300" y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">merge two CSVs on key</text>
  <text x="300" y="165" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">inner/left/right join</text>

  <rect x="406" y="114" width="180" height="60" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="496" y="135" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#bc8cff">csvstat</text>
  <text x="496" y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">descriptive statistics</text>
  <text x="496" y="165" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">min/max/mean/median/mode</text>

  <rect x="602" y="114" width="204" height="60" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="704" y="135" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#58a6ff">csvformat</text>
  <text x="704" y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">convert delimiters</text>
  <text x="704" y="165" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">CSV↔TSV, requote, strip</text>

  <rect x="14" y="192" width="792" height="30" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="208" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">Install: </text>
  <text x="76" y="208" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">pip install csvkit</text>
  <text x="214" y="208" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  or  </text>
  <text x="248" y="208" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">apt install csvkit</text>
  <text x="390" y="208" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  |  All tools pipe to each other:  </text>
  <text x="582" y="208" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">in2csv data.xlsx | csvclean | csvgrep -c status -m CONFIRMED | csvstat</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 12 — csvkit: all tools with real examples, csvjoin, in2csv</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ csvstat — DATA PROFILING ═══════════════════════════════</span>
<span class="cb-prompt">$</span> csvstat sales.csv
<span class="cb-out">  1. date</span>
<span class="cb-out">     Type: Date   Nulls: False   Unique: 365</span>
<span class="cb-out">     Min: 2024-01-01   Max: 2024-12-31</span>
<span class="cb-out">  4. amount</span>
<span class="cb-out">     Type: Number   Nulls: False</span>
<span class="cb-out">     Min: 0.01   Max: 99999.99   Mean: 1234.56   Median: 432.10</span>
<span class="cb-out">Row count: 54321</span>

<span class="cb-prompt">$</span> csvstat -c amount sales.csv                <span class="cb-cmt"># stats for one column</span>
<span class="cb-prompt">$</span> csvstat --mean -c amount sales.csv         <span class="cb-cmt"># just the mean</span>
<span class="cb-prompt">$</span> csvstat --count sales.csv                  <span class="cb-cmt"># just row count</span>

<span class="cb-cmt">## ═══ csvcut — COLUMN SELECTION ══════════════════════════════</span>
<span class="cb-prompt">$</span> csvcut -n sales.csv                        <span class="cb-cmt"># list column names and numbers</span>
<span class="cb-out">  1: date
  2: company
  3: country
  4: amount
  5: status</span>
<span class="cb-prompt">$</span> csvcut -c date,amount,status sales.csv     <span class="cb-cmt"># by name</span>
<span class="cb-prompt">$</span> csvcut -c 1,4,5 sales.csv                  <span class="cb-cmt"># by number</span>
<span class="cb-prompt">$</span> csvcut -C amount sales.csv                 <span class="cb-cmt"># -C: exclude columns</span>

<span class="cb-cmt">## ═══ csvgrep — QUOTE-AWARE FILTERING ════════════════════════</span>
<span class="cb-prompt">$</span> csvgrep -c status -m CONFIRMED sales.csv   <span class="cb-cmt"># exact match</span>
<span class="cb-prompt">$</span> csvgrep -c country -m UK sales.csv         <span class="cb-cmt"># by column name</span>
<span class="cb-prompt">$</span> csvgrep -c company -r "Acme.*Ltd" sales.csv  <span class="cb-cmt"># -r: regex match</span>
<span class="cb-prompt">$</span> csvgrep -c amount -m "" -i sales.csv       <span class="cb-cmt"># -i: invert (find NULLs)</span>
<span class="cb-prompt">$</span> csvgrep -c status -m CONFIRMED sales.csv | csvgrep -c country -m UK | csvstat

<span class="cb-cmt">## ═══ csvsort — TYPE-AWARE SORTING ═══════════════════════════</span>
<span class="cb-prompt">$</span> csvsort -c amount sales.csv               <span class="cb-cmt"># sort by amount (numeric!)</span>
<span class="cb-prompt">$</span> csvsort -c amount -r sales.csv            <span class="cb-cmt"># -r: descending</span>
<span class="cb-prompt">$</span> csvsort -c date,amount sales.csv          <span class="cb-cmt"># sort by date then amount</span>

<span class="cb-cmt">## ═══ csvjoin — MERGE TWO CSV FILES ══════════════════════════</span>
<span class="cb-prompt">$</span> csvjoin -c company sales.csv regions.csv  <span class="cb-cmt"># inner join on company</span>
<span class="cb-prompt">$</span> csvjoin --left -c company sales.csv regions.csv   <span class="cb-cmt"># left join</span>
<span class="cb-prompt">$</span> csvjoin -c 1,2 sales.csv lookup.csv       <span class="cb-cmt"># join on col 1 from left, col 2 from right</span>

<span class="cb-cmt">## ═══ in2csv — CONVERT OTHER FORMATS ═════════════════════════</span>
<span class="cb-prompt">$</span> in2csv sales.xlsx > sales.csv             <span class="cb-cmt"># Excel → CSV</span>
<span class="cb-prompt">$</span> in2csv --sheet "Sheet2" sales.xlsx        <span class="cb-cmt"># specific Excel sheet</span>
<span class="cb-prompt">$</span> in2csv -f json data.json > data.csv       <span class="cb-cmt"># JSON → CSV</span>
<span class="cb-prompt">$</span> in2csv -f fixed -s schema.csv data.txt    <span class="cb-cmt"># fixed-width with schema</span>
<span class="cb-prompt">$</span> in2csv -f geojson map.geojson             <span class="cb-cmt"># GeoJSON → CSV</span>

<span class="cb-cmt">## ═══ csvformat — CONVERT DELIMITER ══════════════════════════</span>
<span class="cb-prompt">$</span> csvformat -T sales.csv                    <span class="cb-cmt"># -T: tab-separated (TSV)</span>
<span class="cb-prompt">$</span> csvformat -D '|' sales.csv                <span class="cb-cmt"># -D: custom delimiter</span>
<span class="cb-prompt">$</span> csvformat -U 1 sales.csv                  <span class="cb-cmt"># -U 1: always quote all fields</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — JSON ANATOMY (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> JSON Structure — Types, Nesting &amp; jq Basics</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="290" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">JSON Structure — Types, Access Paths &amp; jq Equivalents</text>

  <!-- JSON object display -->
  <rect x="14" y="36" width="380" height="244" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="24" y="56" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">{</text>
  <text x="24" y="74" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">  "id"</tspan><tspan fill="#e6edf3">: </tspan><tspan fill="#3fb950">4521</tspan><tspan fill="#8b949e">,</tspan>
  </text>
  <text x="24" y="91" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">  "name"</tspan><tspan fill="#e6edf3">: </tspan><tspan fill="#ffa657">"Ravi Kumar"</tspan><tspan fill="#8b949e">,</tspan>
  </text>
  <text x="24" y="108" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">  "active"</tspan><tspan fill="#e6edf3">: </tspan><tspan fill="#f85149">true</tspan><tspan fill="#8b949e">,</tspan>
  </text>
  <text x="24" y="125" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">  "score"</tspan><tspan fill="#e6edf3">: </tspan><tspan fill="#3fb950">98.5</tspan><tspan fill="#8b949e">,</tspan>
  </text>
  <text x="24" y="142" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">  "address"</tspan><tspan fill="#e6edf3">: {</tspan>
  </text>
  <text x="24" y="159" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">    "city"</tspan><tspan fill="#e6edf3">: </tspan><tspan fill="#ffa657">"Mumbai"</tspan><tspan fill="#8b949e">,</tspan>
  </text>
  <text x="24" y="176" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">    "pin"</tspan><tspan fill="#e6edf3">: </tspan><tspan fill="#ffa657">"400001"</tspan>
  </text>
  <text x="24" y="193" font-family="'Courier New',monospace" font-size="10.5"><tspan fill="#e6edf3">  }</tspan><tspan fill="#8b949e">,</tspan></text>
  <text x="24" y="210" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">  "tags"</tspan><tspan fill="#e6edf3">: [</tspan><tspan fill="#ffa657">"python"</tspan><tspan fill="#e6edf3">, </tspan><tspan fill="#ffa657">"data"</tspan><tspan fill="#e6edf3">, </tspan><tspan fill="#ffa657">"linux"</tspan><tspan fill="#e6edf3">]</tspan><tspan fill="#8b949e">,</tspan>
  </text>
  <text x="24" y="227" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#58a6ff">  "history"</tspan><tspan fill="#e6edf3">: [</tspan>
  </text>
  <text x="24" y="244" font-family="'Courier New',monospace" font-size="10.5">
    <tspan fill="#e6edf3">    {</tspan><tspan fill="#58a6ff">"date"</tspan><tspan fill="#e6edf3">:</tspan><tspan fill="#ffa657">"2024-01"</tspan><tspan fill="#e6edf3">,</tspan><tspan fill="#58a6ff">"amt"</tspan><tspan fill="#e6edf3">:</tspan><tspan fill="#3fb950">100</tspan><tspan fill="#e6edf3">}</tspan>
  </text>
  <text x="24" y="261" font-family="'Courier New',monospace" font-size="10.5"><tspan fill="#e6edf3">  ]</tspan></text>
  <text x="24" y="274" font-family="'Courier New',monospace" font-size="10.5"><tspan fill="#e6edf3">}</tspan></text>

  <!-- jq access paths (right side) -->
  <rect x="410" y="36" width="396" height="244" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="420" y="56" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">jq access expressions:</text>
  <line x1="420" y1="62" x2="796" y2="62" stroke="#3fb950" stroke-width="1" stroke-dasharray="4,2"/>

  <text x="420" y="78" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">.id</text>
  <text x="470" y="78" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → 4521  (number)</text>

  <text x="420" y="95" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">.name</text>
  <text x="474" y="95" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → "Ravi Kumar"  (string)</text>

  <text x="420" y="112" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">.active</text>
  <text x="478" y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → true  (boolean)</text>

  <text x="420" y="129" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">.score</text>
  <text x="474" y="129" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → 98.5  (number)</text>

  <text x="420" y="148" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">.address</text>
  <text x="484" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → {"city":"Mumbai","pin":"400001"}  (object)</text>

  <text x="420" y="165" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">.address.city</text>
  <text x="510" y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → "Mumbai"  (nested)</text>

  <text x="420" y="182" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">.tags</text>
  <text x="462" y="182" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → ["python","data","linux"]  (array)</text>

  <text x="420" y="199" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">.tags[0]</text>
  <text x="490" y="199" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → "python"  (array index)</text>

  <text x="420" y="216" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">.tags[-1]</text>
  <text x="492" y="216" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → "linux"  (negative index)</text>

  <text x="420" y="233" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">.tags[]</text>
  <text x="478" y="233" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → "python" / "data" / "linux"  (iterate)</text>

  <text x="420" y="250" font-family="'Courier New',monospace" font-size="10" fill="#f85149">.history[0].amt</text>
  <text x="528" y="250" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → 100  (array of objects)</text>

  <text x="420" y="267" font-family="'Courier New',monospace" font-size="10" fill="#f85149">.history[].date</text>
  <text x="530" y="267" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> → all dates from array</text>

  <text x="420" y="275" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">Null-safe: .missing? → null not error  |  Optional: .foo.bar? → null if missing</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 12 — jq basics: access, pipe, comma, [], {}, type checking</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ jq BASICS ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo '{"name":"Ravi","age":25}' | jq .          <span class="cb-cmt"># pretty-print</span>
<span class="cb-prompt">$</span> echo '{"name":"Ravi","age":25}' | jq .name      <span class="cb-cmt"># extract field → "Ravi"</span>
<span class="cb-prompt">$</span> echo '{"name":"Ravi","age":25}' | jq -r .name  <span class="cb-cmt"># -r: raw (no quotes)</span>
<span class="cb-out">Ravi</span>
<span class="cb-prompt">$</span> jq .name data.json                              <span class="cb-cmt"># from file</span>
<span class="cb-prompt">$</span> jq -c . data.json                               <span class="cb-cmt"># -c: compact (one line)</span>
<span class="cb-prompt">$</span> curl -s https://api.example.com/users | jq .    <span class="cb-cmt"># API output</span>

<span class="cb-cmt">## ═══ ARRAY OPERATIONS ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> echo '[1,2,3,4,5]' | jq '.[2]'                 <span class="cb-cmt"># → 3 (index 2)</span>
<span class="cb-prompt">$</span> echo '[1,2,3,4,5]' | jq '.[-1]'                <span class="cb-cmt"># → 5 (last)</span>
<span class="cb-prompt">$</span> echo '[1,2,3,4,5]' | jq '.[1:3]'              <span class="cb-cmt"># → [2,3] (slice)</span>
<span class="cb-prompt">$</span> echo '[1,2,3,4,5]' | jq '.[]'                  <span class="cb-cmt"># iterate: 1 then 2 then 3...</span>
<span class="cb-prompt">$</span> echo '[1,2,3]' | jq 'length'                   <span class="cb-cmt"># → 3</span>

<span class="cb-cmt">## ═══ CONSTRUCT NEW OBJECTS ══════════════════════════════════</span>
<span class="cb-cmt"># {} = create object, [] = create array</span>
<span class="cb-prompt">$</span> jq '{id: .id, name: .name}' users.json          <span class="cb-cmt"># project fields</span>
<span class="cb-prompt">$</span> jq '{id, name}' users.json                      <span class="cb-cmt"># shorthand (same as above)</span>
<span class="cb-prompt">$</span> jq '[.id, .name, .score]' users.json            <span class="cb-cmt"># to array</span>
<span class="cb-prompt">$</span> jq '{id: .id, city: .address.city}' users.json  <span class="cb-cmt"># nested access in output</span>

<span class="cb-cmt">## ═══ PIPE AND COMMA ════════════════════════════════════════</span>
<span class="cb-cmt"># | (pipe): output of left is input to right</span>
<span class="cb-prompt">$</span> jq '.address | .city' data.json                 <span class="cb-cmt"># same as .address.city</span>
<span class="cb-prompt">$</span> jq '.tags | length' data.json                   <span class="cb-cmt"># count tags</span>
<span class="cb-prompt">$</span> jq '.tags | .[]' data.json                      <span class="cb-cmt"># iterate tags</span>
<span class="cb-cmt"># , (comma): generates multiple outputs</span>
<span class="cb-prompt">$</span> jq '.name, .age' data.json                      <span class="cb-cmt"># prints name then age</span>

<span class="cb-cmt">## ═══ TYPE CHECKING ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> jq 'type' data.json                             <span class="cb-cmt"># "object"</span>
<span class="cb-prompt">$</span> jq '.score | type' data.json                    <span class="cb-cmt"># "number"</span>
<span class="cb-prompt">$</span> jq '.tags | type' data.json                     <span class="cb-cmt"># "array"</span>
<span class="cb-prompt">$</span> jq 'keys' data.json                             <span class="cb-cmt"># list all keys</span>
<span class="cb-prompt">$</span> jq 'has("name")' data.json                      <span class="cb-cmt"># → true/false</span>
<span class="cb-prompt">$</span> jq '.score // 0' data.json                      <span class="cb-cmt"># // = alternative (if null)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — jq FILTERS: select, map, reduce (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> jq Filters — select, map, group_by, reduce, sort_by</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="250" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">jq Filter Pipeline — Transform Arrays of Objects</text>

  <!-- Input array -->
  <rect x="14"  y="36" width="160" height="170" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="94"  y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Input (array)</text>
  <text x="24"  y="76" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">[ </text>
  <text x="28"  y="92" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3"> {id:1,reg:"UK",amt:100},</text>
  <text x="28" y="108" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3"> {id:2,reg:"US",amt:50},</text>
  <text x="28" y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3"> {id:3,reg:"UK",amt:200},</text>
  <text x="28" y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3"> {id:4,reg:"IN",amt:75},</text>
  <text x="28" y="156" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3"> {id:5,reg:"UK",amt:300}</text>
  <text x="24" y="172" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">]</text>
  <text x="94" y="198" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">5 objects</text>

  <!-- select arrow -->
  <line x1="174" y1="121" x2="210" y2="121" stroke="#ffa657" stroke-width="2" marker-end="url(#cj-orn)" class="cj-flow"/>
  <text x="192" y="113" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">select</text>
  <text x="192" y="135" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">(.reg=="UK")</text>

  <!-- After select -->
  <rect x="210" y="60" width="136" height="120" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="278" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">UK only</text>
  <text x="220" y="98"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">{id:1,amt:100}</text>
  <text x="220" y="114" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">{id:3,amt:200}</text>
  <text x="220" y="130" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">{id:5,amt:300}</text>
  <text x="278" y="170" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">3 objects</text>

  <!-- map arrow -->
  <line x1="346" y1="121" x2="382" y2="121" stroke="#3fb950" stroke-width="2" marker-end="url(#cj-grn)" class="cj-flow"/>
  <text x="364" y="113" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">map</text>
  <text x="364" y="135" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">(.amt * 1.2)</text>

  <!-- After map -->
  <rect x="382" y="80" width="110" height="90" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="437" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">+20% amounts</text>
  <text x="392" y="120" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">120</text>
  <text x="392" y="136" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">240</text>
  <text x="392" y="152" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">360</text>

  <!-- add arrow -->
  <line x1="492" y1="121" x2="528" y2="121" stroke="#bc8cff" stroke-width="2" marker-end="url(#cj-pur)" class="cj-flow"/>
  <text x="510" y="113" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">add</text>

  <!-- After add -->
  <rect x="528" y="92" width="90" height="58" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="573" y="116" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#bc8cff">Total</text>
  <text x="573" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#bc8cff">720</text>

  <!-- Full pipeline label -->
  <rect x="14" y="218" width="792" height="24" rx="5" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="234" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">Full pipeline: </text>
  <text x="114" y="234" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">jq '[.[] | select(.region=="UK")] | map(.amount * 1.2) | add' data.json</text>
  <text x="560" y="234" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">→ 720</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 12 — jq: select, map, group_by, sort_by, reduce, unique_by, paths</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ select — FILTER OBJECTS ═══════════════════════════════</span>
<span class="cb-prompt">$</span> jq '.[] | select(.status == "active")' users.json
<span class="cb-prompt">$</span> jq '.[] | select(.amount > 1000)' sales.json
<span class="cb-prompt">$</span> jq '.[] | select(.region == "UK" and .amount > 500)' sales.json
<span class="cb-prompt">$</span> jq '.[] | select(.name | startswith("A"))' users.json
<span class="cb-prompt">$</span> jq '.[] | select(.tags | contains(["python"]))' users.json
<span class="cb-prompt">$</span> jq '.[] | select(.email | test("@example\\.com$"))' users.json  <span class="cb-cmt"># regex</span>
<span class="cb-prompt">$</span> jq '[.[] | select(.score != null)]' users.json    <span class="cb-cmt"># exclude nulls</span>

<span class="cb-cmt">## ═══ map — TRANSFORM EACH ELEMENT ══════════════════════════</span>
<span class="cb-prompt">$</span> jq 'map(.name)' users.json                        <span class="cb-cmt"># extract one field from all</span>
<span class="cb-prompt">$</span> jq 'map({id, name, city: .address.city})' u.json  <span class="cb-cmt"># project + rename</span>
<span class="cb-prompt">$</span> jq 'map(.amount * 1.1)' sales.json               <span class="cb-cmt"># calculate new values</span>
<span class="cb-prompt">$</span> jq 'map(. + {vat: (.amount * 0.2)})' sales.json  <span class="cb-cmt"># add a field to each</span>
<span class="cb-prompt">$</span> jq 'map(select(.active)) | map(.name)' users.json  <span class="cb-cmt"># chain: filter then extract</span>
<span class="cb-cmt"># map(f) is shorthand for [.[] | f]</span>

<span class="cb-cmt">## ═══ sort_by, unique_by, group_by, min_by, max_by ══════════</span>
<span class="cb-prompt">$</span> jq 'sort_by(.amount)' sales.json                  <span class="cb-cmt"># ascending</span>
<span class="cb-prompt">$</span> jq 'sort_by(.amount) | reverse' sales.json        <span class="cb-cmt"># descending</span>
<span class="cb-prompt">$</span> jq 'sort_by(.date, .amount)' sales.json           <span class="cb-cmt"># multi-key sort</span>
<span class="cb-prompt">$</span> jq 'unique_by(.company)' sales.json               <span class="cb-cmt"># dedup by field</span>
<span class="cb-prompt">$</span> jq 'unique' data.json                             <span class="cb-cmt"># dedup by whole value</span>
<span class="cb-prompt">$</span> jq 'min_by(.amount)' sales.json                   <span class="cb-cmt"># object with min amount</span>
<span class="cb-prompt">$</span> jq 'max_by(.date)' sales.json                     <span class="cb-cmt"># most recent</span>

<span class="cb-prompt">$</span> jq 'group_by(.region)' sales.json                 <span class="cb-cmt"># array of arrays by region</span>
<span class="cb-out">[ [{"region":"IN",...}, ...], [{"region":"UK",...}, ...], ... ]</span>

<span class="cb-cmt">## ═══ reduce — AGGREGATE ════════════════════════════════════</span>
<span class="cb-prompt">$</span> jq 'map(.amount) | add' sales.json               <span class="cb-cmt"># sum all amounts</span>
<span class="cb-prompt">$</span> jq '[.[] | .amount] | add / length' sales.json   <span class="cb-cmt"># mean</span>
<span class="cb-prompt">$</span> jq 'length' sales.json                           <span class="cb-cmt"># count</span>
<span class="cb-prompt">$</span> jq 'reduce .[] as $item (0; . + $item.amount)' sales.json  <span class="cb-cmt"># explicit reduce</span>
<span class="cb-cmt"># reduce EXPR as $var (INIT; UPDATE)
# Accumulates: starts at INIT, runs UPDATE for each $var</span>

<span class="cb-cmt">## ═══ GROUP AND AGGREGATE (GROUP BY PATTERN) ════════════════</span>
<span class="cb-prompt">$</span> jq '
  group_by(.region) |
  map({
    region: .[0].region,
    count:  length,
    total:  map(.amount) | add,
    avg:    (map(.amount) | add) / length
  })' sales.json
<span class="cb-out">[
  {"region":"IN","count":12,"total":890,"avg":74.17},
  {"region":"UK","count":31,"total":15420,"avg":497.42}
]</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — jq ADVANCED: STRING, FORMAT, ENV, DEF
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> jq Advanced — Strings, Format Strings, env, def, try-catch</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 12 — jq: @csv @tsv @base64 @uri, string interpolation, env, def</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ STRING INTERPOLATION ═══════════════════════════════════</span>
<span class="cb-prompt">$</span> jq -r '"Hello, \(.name)! Score: \(.score)"' user.json
<span class="cb-out">Hello, Ravi Kumar! Score: 98.5</span>
<span class="cb-prompt">$</span> jq -r '"\(.date),\(.region),\(.amount)"' sales.json   <span class="cb-cmt"># CSV output</span>
<span class="cb-prompt">$</span> jq -r '[.date, .region, (.amount | tostring)] | join(",")' sales.json

<span class="cb-cmt">## ═══ FORMAT STRINGS: @csv @tsv @base64 @uri @html @json ════</span>
<span class="cb-cmt"># @csv: properly quoted CSV output</span>
<span class="cb-prompt">$</span> jq -r '[.date, .name, .amount] | @csv' sales.json
<span class="cb-out">"2024-01-15","Acme Corp, Ltd",1234.56</span>
<span class="cb-cmt"># @csv handles quoting: fields with commas are quoted automatically!</span>

<span class="cb-cmt"># @tsv: tab-separated output</span>
<span class="cb-prompt">$</span> jq -r '[.id, .name, .score] | @tsv' users.json

<span class="cb-cmt"># Convert entire array to CSV (with header):</span>
<span class="cb-prompt">$</span> jq -r '
  ["id","name","amount","status"],
  (.[] | [.id, .name, .amount, .status])
  | @csv' sales.json

<span class="cb-cmt"># @base64 / @base64d: encode/decode</span>
<span class="cb-prompt">$</span> jq -r '.password | @base64d' config.json         <span class="cb-cmt"># decode base64</span>
<span class="cb-prompt">$</span> jq -rn '"secret" | @base64'                      <span class="cb-cmt"># encode: "c2VjcmV0"</span>

<span class="cb-cmt"># @uri: URL encoding</span>
<span class="cb-prompt">$</span> jq -rn '"hello world & more" | @uri'
<span class="cb-out">hello%20world%20%26%20more</span>

<span class="cb-cmt"># @html: HTML entity escaping</span>
<span class="cb-prompt">$</span> jq -rn '"<b>hello</b>" | @html'
<span class="cb-out">&lt;b&gt;hello&lt;/b&gt;</span>

<span class="cb-cmt">## ═══ ENVIRONMENT VARIABLES ════════════════════════════════</span>
<span class="cb-prompt">$</span> REGION=UK jq --arg r "$REGION" '.[] | select(.region == $r)' sales.json
<span class="cb-prompt">$</span> jq --arg key "$API_KEY" '{Authorization: ("Bearer " + $key)}' token.json
<span class="cb-prompt">$</span> jq -n --argjson n 100 '$n * 2'                  <span class="cb-cmt"># --argjson: raw JSON value</span>
<span class="cb-prompt">$</span> jq -n 'env.HOME'                                 <span class="cb-cmt"># access env vars via env object</span>
<span class="cb-prompt">$</span> jq -n 'env | keys'                               <span class="cb-cmt"># all environment variables</span>

<span class="cb-cmt">## ═══ USER-DEFINED FUNCTIONS (def) ═══════════════════════════</span>
<span class="cb-prompt">$</span> jq '
def to_eur: . * 0.92;
def format_amount: "€" + (. | to_eur | tostring);
.[] | .amount | format_amount
' sales.json
<span class="cb-out">€113.84</span>
<span class="cb-out">€46.00</span>

<span class="cb-cmt">## ═══ try-catch — ERROR HANDLING ═════════════════════════════</span>
<span class="cb-prompt">$</span> jq '.[] | try .amount catch "N/A"' mixed.json    <span class="cb-cmt"># catch errors</span>
<span class="cb-prompt">$</span> jq '.[] | .amount? // 0' mixed.json              <span class="cb-cmt"># null/missing → 0</span>
<span class="cb-prompt">$</span> jq -e '.status == "ok"' response.json            <span class="cb-cmt"># -e: exit 1 if null/false</span>
<span class="cb-prompt">$</span> echo '{"x": "not a number"}' | jq '.x | tonumber?' 2>/dev/null
<span class="cb-cmt"># tonumber? → null if fails, no crash</span>

<span class="cb-cmt">## ═══ BUILT-IN FUNCTIONS (more) ══════════════════════════════</span>
<span class="cb-prompt">$</span> jq 'to_entries' obj.json                         <span class="cb-cmt"># object → [{key,value}]</span>
<span class="cb-prompt">$</span> jq 'from_entries' kvs.json                        <span class="cb-cmt"># [{key,value}] → object</span>
<span class="cb-prompt">$</span> jq 'with_entries(.value += 1)' counts.json        <span class="cb-cmt"># transform object values</span>
<span class="cb-prompt">$</span> jq 'paths' data.json                             <span class="cb-cmt"># all paths in the object</span>
<span class="cb-prompt">$</span> jq 'flatten' nested.json                         <span class="cb-cmt"># deep flatten arrays</span>
<span class="cb-prompt">$</span> jq 'flatten(1)' nested.json                      <span class="cb-cmt"># one level deep only</span>
<span class="cb-prompt">$</span> jq 'ascii_downcase' str.json                     <span class="cb-cmt"># lowercase string</span>
<span class="cb-prompt">$</span> jq 'split(",")' str.json                        <span class="cb-cmt"># split string</span>
<span class="cb-prompt">$</span> jq '["a","b","c"] | join("-")' <<<'null'         <span class="cb-cmt"># → "a-b-c"</span>
<span class="cb-prompt">$</span> jq 'ltrimstr("prefix_")' str.json               <span class="cb-cmt"># remove prefix</span>
<span class="cb-prompt">$</span> jq 'gsub("old";"new")' str.json                  <span class="cb-cmt"># replace all occurrences</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — JSONL / JSON LINES (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> JSON Lines (JSONL) — Streaming JSON for Large Data</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">JSON vs JSONL — One Object Per Line Enables Streaming</text>

  <!-- JSON (full document) -->
  <rect x="14" y="36" width="370" height="164" rx="8" fill="#161b22" stroke="#f85149" stroke-width="2"/>
  <text x="199" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">JSON (full array) — Must load ALL into memory</text>
  <text x="24"  y="76" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">[</text>
  <text x="24"  y="92" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">  {"id":1,"amount":100,"status":"OK"},</text>
  <text x="24" y="108" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">  {"id":2,"amount":200,"status":"FAIL"},</text>
  <text x="24" y="124" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">  {"id":3,"amount":150,"status":"OK"},</text>
  <text x="24" y="140" font-family="'Courier New',monospace" font-size="10.5" fill="#30363d">  ... 10 million more objects ...</text>
  <text x="24" y="156" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">  {"id":9999999,"amount":50,"status":"OK"}</text>
  <text x="24" y="172" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">]</text>
  <text x="199" y="192" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">⚠ jq loads entire file: OOM on large data</text>

  <!-- JSONL (one per line) -->
  <rect x="400" y="36" width="406" height="164" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="603" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">JSONL — One object per line, streaming</text>
  <text x="410" y="76"  font-family="'Courier New',monospace" font-size="10.5" fill="#3fb950">{"id":1,"amount":100,"status":"OK"}</text>
  <text x="410" y="92"  font-family="'Courier New',monospace" font-size="10.5" fill="#3fb950">{"id":2,"amount":200,"status":"FAIL"}</text>
  <text x="410" y="108" font-family="'Courier New',monospace" font-size="10.5" fill="#3fb950">{"id":3,"amount":150,"status":"OK"}</text>
  <text x="410" y="124" font-family="'Courier New',monospace" font-size="10.5" fill="#30363d">... 10 million more lines ...</text>
  <text x="410" y="140" font-family="'Courier New',monospace" font-size="10.5" fill="#3fb950">{"id":9999999,"amount":50,"status":"OK"}</text>
  <text x="603" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">✅ jq -c processes one line at a time: constant memory!</text>
  <text x="603" y="178" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">grep | wc -l works correctly. Each line = one record.</text>
  <text x="603" y="192" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#58a6ff">tail -F events.jsonl streams live events</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 12 — JSONL: jq -c, streaming processing, parallel, convert to CSV</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ jq WITH JSONL ═════════════════════════════════════════</span>
<span class="cb-cmt"># Key: -c flag outputs compact JSON (one line per object)
# Default jq mode: reads/outputs pretty JSON
# JSONL mode: jq reads one JSON value per line, outputs compact</span>

<span class="cb-cmt"># Filter JSONL (no -c needed for input — jq reads line by line):</span>
<span class="cb-prompt">$</span> jq 'select(.status == "FAIL")' events.jsonl
<span class="cb-prompt">$</span> jq -c 'select(.amount > 100)' events.jsonl       <span class="cb-cmt"># -c: compact output</span>

<span class="cb-cmt"># Extract a field from every line:</span>
<span class="cb-prompt">$</span> jq -r '.amount' events.jsonl | awk '{sum+=$1} END{print sum}'

<span class="cb-cmt"># Count matching:</span>
<span class="cb-prompt">$</span> jq -c 'select(.status == "FAIL")' events.jsonl | wc -l

<span class="cb-cmt"># JSONL → CSV (with header):</span>
<span class="cb-prompt">$</span> { echo "id,amount,status";
    jq -r '[.id, .amount, .status] | @csv' events.jsonl; } > output.csv

<span class="cb-cmt">## ═══ STREAMING LARGE JSONL ══════════════════════════════════</span>
<span class="cb-cmt"># Constant-memory aggregation (no --slurp needed):</span>
<span class="cb-prompt">$</span> jq -r '.amount' events.jsonl | awk '{sum+=$1; n++} END{print sum, n, sum/n}'

<span class="cb-cmt"># Group by field using sort + uniq pattern:</span>
<span class="cb-prompt">$</span> jq -r '.region' events.jsonl | sort | uniq -c | sort -rn

<span class="cb-cmt"># Live monitoring of event stream:</span>
<span class="cb-prompt">$</span> tail -F events.jsonl | jq -r 'select(.level=="ERROR") | "\(.timestamp) \(.message)"'

<span class="cb-cmt">## ═══ PARALLEL JSONL PROCESSING ═══════════════════════════════</span>
<span class="cb-cmt"># Split JSONL into chunks and process in parallel:</span>
<span class="cb-prompt">$</span> split -l 100000 events.jsonl chunk_
<span class="cb-prompt">$</span> ls chunk_* | parallel 'jq -r "[.id,.amount] | @csv" {} > {}.csv'
<span class="cb-prompt">$</span> cat chunk_*.csv > all_output.csv

<span class="cb-cmt">## ═══ SLURP MODE — JSONL → JSON ARRAY ═══════════════════════</span>
<span class="cb-cmt"># --slurp (-s): read all lines, combine into JSON array</span>
<span class="cb-prompt">$</span> jq -s '.' events.jsonl                           <span class="cb-cmt"># → [{...},{...},...] array</span>
<span class="cb-prompt">$</span> jq -s 'map(.amount) | add' events.jsonl          <span class="cb-cmt"># sum with slurp</span>
<span class="cb-prompt">$</span> jq -s 'group_by(.region)' events.jsonl           <span class="cb-cmt"># group_by needs array input</span>
<span class="cb-cmt"># ⚠ --slurp loads everything into memory: avoid for huge files</span>

<span class="cb-cmt">## ═══ JSON ARRAY → JSONL ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> jq -c '.[]' data.json > data.jsonl               <span class="cb-cmt"># array → JSONL</span>
<span class="cb-cmt"># -c: compact, .[] iterates, each on its own line</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — CSV ↔ JSON CONVERSIONS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> CSV ↔ JSON Conversions — Practical Transformation Recipes</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Format Conversion Map — Shell-Native Paths</text>

  <!-- CSV box -->
  <rect x="14"  y="44" width="130" height="50" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="79"  y="68" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">CSV</text>
  <text x="79"  y="85" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">.csv files</text>

  <!-- TSV box -->
  <rect x="14"  y="120" width="130" height="50" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="79"  y="144" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#58a6ff">TSV</text>
  <text x="79"  y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">.tsv files</text>

  <!-- JSON box -->
  <rect x="580" y="44" width="130" height="50" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="645" y="68" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#ffa657">JSON</text>
  <text x="645" y="85" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">.json files</text>

  <!-- JSONL box -->
  <rect x="580" y="120" width="130" height="50" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="645" y="144" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#bc8cff">JSONL</text>
  <text x="645" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">.jsonl files</text>

  <!-- Excel/other -->
  <rect x="297" y="82" width="226" height="50" rx="8" fill="#1a1a2a" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="104" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">Excel / XML / DBF</text>
  <text x="410" y="120" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">in2csv (csvkit)</text>

  <!-- Arrows -->
  <line x1="144" y1="69"  x2="297" y2="107" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#cj-grn)"/>
  <text x="210" y="82" font-family="'Courier New',monospace" font-size="8" fill="#3fb950">in2csv</text>

  <line x1="144" y1="145" x2="297" y2="112" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#cj-blu)"/>
  <text x="200" y="142" font-family="'Courier New',monospace" font-size="8" fill="#58a6ff">in2csv -f</text>

  <line x1="523" y1="107" x2="580" y2="69"  stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#cj-orn)"/>
  <text x="555" y="82" font-family="'Courier New',monospace" font-size="8" fill="#ffa657">csvjson</text>

  <line x1="523" y1="112" x2="580" y2="145" stroke="#bc8cff" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#cj-pur)"/>
  <text x="535" y="145" font-family="'Courier New',monospace" font-size="8" fill="#bc8cff">csvjson -l</text>

  <!-- Direct paths -->
  <path d="M144,72 Q360,44 580,69" fill="none" stroke="#ffa657" stroke-width="1.5" marker-end="url(#cj-orn)"/>
  <text x="360" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#ffa657">csvjson / python / mlr</text>

  <path d="M580,148 Q360,185 144,148" fill="none" stroke="#3fb950" stroke-width="1.5" marker-end="url(#cj-grn)"/>
  <text x="360" y="195" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#3fb950">jq @csv / mlr / python csv.writer</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 12 — CSV→JSON, JSON→CSV, TSV conversions, csvjson, python</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ CSV → JSON (csvjson — RFC-compliant) ═══════════════════</span>
<span class="cb-prompt">$</span> csvjson sales.csv                               <span class="cb-cmt"># → JSON array of objects</span>
<span class="cb-prompt">$</span> csvjson -i 4 sales.csv                         <span class="cb-cmt"># pretty-print indented</span>
<span class="cb-prompt">$</span> csvjson -k company sales.csv                   <span class="cb-cmt"># -k: key by column (dict)</span>
<span class="cb-prompt">$</span> csvjson -l sales.csv                            <span class="cb-cmt"># -l: output as JSON Lines (JSONL)</span>
<span class="cb-out">{"date":"2024-01-15","company":"AcmeCorp","country":"UK","amount":1234.56,"status":"CONFIRMED"}</span>
<span class="cb-out">{"date":"2024-01-15","company":"Acme Corp, Ltd","country":"UK","amount":1234.56,...}</span>

<span class="cb-cmt">## ═══ JSON → CSV (jq @csv) ════════════════════════════════════</span>
<span class="cb-cmt"># Step 1: extract header from first object keys:</span>
<span class="cb-prompt">$</span> jq -r '.[0] | keys_unsorted | @csv' data.json
<span class="cb-out">"date","company","country","amount","status"</span>

<span class="cb-cmt"># Step 2: extract values as CSV rows:</span>
<span class="cb-prompt">$</span> jq -r '.[] | [.date, .company, .country, .amount, .status] | @csv' data.json

<span class="cb-cmt"># Complete JSON array → CSV with header:</span>
<span class="cb-prompt">$</span> jq -r '
  (.[0] | keys_unsorted),
  (.[] | [.[]])
  | @csv' data.json > output.csv

<span class="cb-cmt">## ═══ JSON → CSV WITH PYTHON (most reliable) ════════════════</span>
<span class="cb-prompt">$</span> python3 -c "
import json, csv, sys
data = json.load(sys.stdin)
if not data: sys.exit(0)
writer = csv.DictWriter(sys.stdout, fieldnames=data[0].keys())
writer.writeheader()
writer.writerows(data)
" < data.json > output.csv

<span class="cb-cmt">## ═══ CSV → JSON WITH PYTHON (handles edge cases) ═══════════</span>
<span class="cb-prompt">$</span> python3 -c "
import csv, json, sys
reader = csv.DictReader(sys.stdin)
json.dump(list(reader), sys.stdout, indent=2)
" < sales.csv > sales.json

<span class="cb-cmt">## ═══ TSV ↔ CSV ════════════════════════════════════════════</span>
<span class="cb-cmt"># CSV → TSV (quote-safe):</span>
<span class="cb-prompt">$</span> csvformat -T sales.csv > sales.tsv
<span class="cb-cmt"># TSV → CSV:</span>
<span class="cb-prompt">$</span> csvformat -d $'\t' sales.tsv > sales.csv

<span class="cb-cmt">## ═══ JSONL → CSV ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> python3 -c "
import json, csv, sys
rows = [json.loads(line) for line in sys.stdin]
if not rows: sys.exit(0)
writer = csv.DictWriter(sys.stdout, fieldnames=rows[0].keys())
writer.writeheader()
writer.writerows(rows)
" < events.jsonl > events.csv
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — miller (mlr): THE SWISS ARMY KNIFE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> miller (<code>mlr</code>) — Multi-Format Data Tool</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">miller (mlr) — Same Verb Syntax Across CSV, TSV, JSON, JSONL</text>

  <!-- Input formats -->
  <rect x="14"  y="36" width="200" height="130" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="114" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Input format</text>
  <text x="24"  y="78" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">--csv   --tsv</text>
  <text x="24"  y="95" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">--json  --jsonl</text>
  <text x="24" y="112" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">--pprint (pretty)</text>
  <text x="24" y="129" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">--nidx  (positional)</text>
  <text x="24" y="146" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">--dkvp  (key=val)</text>
  <text x="114" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">auto-detects from ext</text>

  <!-- mlr core -->
  <line x1="214" y1="101" x2="254" y2="101" stroke="#ffa657" stroke-width="2.5" marker-end="url(#cj-orn)" class="cj-flow"/>
  <rect x="254" y="54" width="312" height="112" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="410" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">mlr verbs (chained with +then+)</text>
  <text x="264" y="93"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">filter   head    tail    sort</text>
  <text x="264" y="110" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">cut      reorder rename  label</text>
  <text x="264" y="127" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">stats1   stats2  histogram tee</text>
  <text x="264" y="144" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">join     unsparsify  flatten</text>
  <text x="264" y="158" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">put      uniq    count-distinct</text>

  <!-- Output formats -->
  <line x1="566" y1="101" x2="606" y2="101" stroke="#ffa657" stroke-width="2.5" marker-end="url(#cj-orn)" class="cj-flow"/>
  <rect x="606" y="36" width="200" height="130" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="706" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Output format</text>
  <text x="616" y="78" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">OFS=csv  OFS=tsv</text>
  <text x="616" y="95" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">OFS=json OFS=jsonl</text>
  <text x="616" y="112" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">OFS=pprint</text>
  <text x="706" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">ANY input → ANY output</text>
  <text x="706" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Same command works</text>
  <text x="706" y="164" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">across all formats!</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 12 — miller: filter, sort, stats, put, join, format conversion</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ mlr BASICS ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> mlr --csv head -n 5 sales.csv              <span class="cb-cmt"># first 5 rows (with header)</span>
<span class="cb-prompt">$</span> mlr --csv cat sales.csv                    <span class="cb-cmt"># pass through (validate)</span>
<span class="cb-prompt">$</span> mlr --csv label date,company,country,amount,status sales.csv  <span class="cb-cmt"># add header</span>

<span class="cb-cmt">## ═══ filter — QUOTE-AWARE FILTERING ════════════════════════</span>
<span class="cb-prompt">$</span> mlr --csv filter '$status == "CONFIRMED"' sales.csv
<span class="cb-prompt">$</span> mlr --csv filter '$amount > 1000 && $country == "UK"' sales.csv
<span class="cb-prompt">$</span> mlr --csv filter 'NR > 1 && $amount > 0' sales.csv   <span class="cb-cmt"># skip header</span>

<span class="cb-cmt">## ═══ sort ═══════════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> mlr --csv sort -f country sales.csv        <span class="cb-cmt"># -f: lexicographic</span>
<span class="cb-prompt">$</span> mlr --csv sort -n amount sales.csv         <span class="cb-cmt"># -n: numeric ascending</span>
<span class="cb-prompt">$</span> mlr --csv sort -nr amount sales.csv        <span class="cb-cmt"># -nr: numeric descending</span>
<span class="cb-prompt">$</span> mlr --csv sort -f country -nr amount sales.csv  <span class="cb-cmt"># multi-key</span>

<span class="cb-cmt">## ═══ stats — AGGREGATION ════════════════════════════════════</span>
<span class="cb-prompt">$</span> mlr --csv stats1 -a sum,mean,count -f amount -g country sales.csv
<span class="cb-out">country,amount_sum,amount_mean,amount_count</span>
<span class="cb-out">UK,154200,4974.19,31</span>
<span class="cb-out">US,89100,3562.40,25</span>
<span class="cb-out">IN,23450,1954.17,12</span>

<span class="cb-prompt">$</span> mlr --csv stats1 -a min,max,p25,p50,p75,p95 -f amount sales.csv
<span class="cb-prompt">$</span> mlr --csv count-distinct -f country sales.csv   <span class="cb-cmt"># unique values + counts</span>

<span class="cb-cmt">## ═══ put — COMPUTE NEW FIELDS ═══════════════════════════════</span>
<span class="cb-prompt">$</span> mlr --csv put '$vat = $amount * 0.2' sales.csv      <span class="cb-cmt"># add calculated field</span>
<span class="cb-prompt">$</span> mlr --csv put '$total = $amount + $amount * 0.2' sales.csv
<span class="cb-prompt">$</span> mlr --csv put '$amount = float($amount)' sales.csv  <span class="cb-cmt"># cast to float</span>
<span class="cb-prompt">$</span> mlr --csv put '$month = substr($date, 1, 7)' sales.csv  <span class="cb-cmt"># extract month</span>

<span class="cb-cmt">## ═══ FORMAT CONVERSION ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> mlr --csv --ojson cat sales.csv              <span class="cb-cmt"># CSV → JSON array</span>
<span class="cb-prompt">$</span> mlr --csv --ojsonl cat sales.csv             <span class="cb-cmt"># CSV → JSONL</span>
<span class="cb-prompt">$</span> mlr --json --ocsv cat data.json              <span class="cb-cmt"># JSON → CSV</span>
<span class="cb-prompt">$</span> mlr --jsonl --ocsv cat events.jsonl          <span class="cb-cmt"># JSONL → CSV</span>
<span class="cb-prompt">$</span> mlr --csv --otsv cat sales.csv              <span class="cb-cmt"># CSV → TSV</span>

<span class="cb-cmt">## ═══ CHAINING VERBS WITH +then+ ═════════════════════════════</span>
<span class="cb-prompt">$</span> mlr --csv \
    filter '$status == "CONFIRMED"' \
    then put '$vat = $amount * 0.2' \
    then sort -nr amount \
    then head -n 20 \
    sales.csv
<span class="cb-cmt"># All verbs process in sequence with one pass through the file</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — PYTHON ONE-LINERS FOR CSV/JSON
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Python One-Liners — When Shell Tools Aren't Enough</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 12 — Python csv/json modules: one-liners, embedded newlines, type casting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ CSV PROCESSING PATTERNS ═══════════════════════════════</span>
<span class="cb-cmt"># Count rows (handles embedded newlines):</span>
<span class="cb-prompt">$</span> python3 -c "import csv; f=open('sales.csv'); print(sum(1 for _ in csv.reader(f))-1)"

<span class="cb-cmt"># Filter and write subset:</span>
<span class="cb-prompt">$</span> python3 << 'EOF'
import csv, sys
with open('sales.csv', newline='') as fin, open('uk.csv', 'w', newline='') as fout:
    r = csv.DictReader(fin)
    w = csv.DictWriter(fout, fieldnames=r.fieldnames)
    w.writeheader()
    w.writerows(row for row in r if row['country'] == 'UK')
EOF

<span class="cb-cmt"># Aggregate: sum by group (handles all CSV edge cases):</span>
<span class="cb-prompt">$</span> python3 -c "
import csv
from collections import defaultdict
totals = defaultdict(float)
with open('sales.csv', newline='') as f:
    for row in csv.DictReader(f):
        try: totals[row['country']] += float(row['amount'])
        except ValueError: pass
for k, v in sorted(totals.items(), key=lambda x: -x[1]):
    print(f'{k:20} {v:12.2f}')
"

<span class="cb-cmt"># Type-cast all numeric fields automatically:</span>
<span class="cb-prompt">$</span> python3 -c "
import csv, json, sys
def cast(v):
    try: return int(v)
    except ValueError: pass
    try: return float(v)
    except ValueError: pass
    return v
with open('sales.csv', newline='') as f:
    rows = [{k: cast(v) for k, v in row.items()} for row in csv.DictReader(f)]
json.dump(rows, sys.stdout, indent=2)
"

<span class="cb-cmt">## ═══ JSON PROCESSING PATTERNS ═══════════════════════════════</span>
<span class="cb-cmt"># Flatten nested JSON to flat dict:</span>
<span class="cb-prompt">$</span> python3 -c "
import json, sys
def flatten(d, parent='', sep='.'):
    items = {}
    for k, v in d.items():
        key = f'{parent}{sep}{k}' if parent else k
        if isinstance(v, dict): items.update(flatten(v, key, sep))
        else: items[key] = v
    return items
data = json.load(sys.stdin)
for row in (data if isinstance(data, list) else [data]):
    print(json.dumps(flatten(row)))
" < nested.json

<span class="cb-cmt"># Process large JSON Lines (streaming, constant memory):</span>
<span class="cb-prompt">$</span> python3 -c "
import json, sys
total = 0; count = 0
for line in sys.stdin:
    try:
        obj = json.loads(line)
        total += obj.get('amount', 0)
        count += 1
    except json.JSONDecodeError:
        pass
print(f'Sum: {total:.2f}  Count: {count}  Avg: {total/count:.2f}')
" < events.jsonl

<span class="cb-cmt">## ═══ PANDAS ONE-LINERS (when available) ════════════════════</span>
<span class="cb-cmt"># Read CSV with auto type detection:</span>
<span class="cb-prompt">$</span> python3 -c "import pandas as pd; df=pd.read_csv('sales.csv'); print(df.groupby('country')['amount'].agg(['sum','mean','count']))"

<span class="cb-cmt"># Convert Excel to CSV (all sheets):</span>
<span class="cb-prompt">$</span> python3 -c "
import pandas as pd
xls = pd.ExcelFile('sales.xlsx')
for sheet in xls.sheet_names:
    xls.parse(sheet).to_csv(f'{sheet}.csv', index=False)
    print(f'Exported: {sheet}.csv')
"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — API RESPONSE PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> API Response Patterns — curl + jq in Production</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">curl + jq Pattern — Download → Filter → Transform → Load</text>

  <!-- Stage boxes -->
  <rect x="14"  y="40" width="138" height="60" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="83"  y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">curl API</text>
  <text x="83"  y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">-s -f -H auth</text>
  <text x="83"  y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">JSON response</text>

  <line x1="152" y1="70" x2="188" y2="70" stroke="#ffa657" stroke-width="2" marker-end="url(#cj-orn)" class="cj-flow"/>

  <rect x="188" y="40" width="138" height="60" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="257" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">jq filter</text>
  <text x="257" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">.data[]</text>
  <text x="257" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">select/map</text>

  <line x1="326" y1="70" x2="362" y2="70" stroke="#ffa657" stroke-width="2" marker-end="url(#cj-orn)" class="cj-flow"/>

  <rect x="362" y="40" width="138" height="60" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="431" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">transform</text>
  <text x="431" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">@csv / project</text>
  <text x="431" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">reshape fields</text>

  <line x1="500" y1="70" x2="536" y2="70" stroke="#ffa657" stroke-width="2" marker-end="url(#cj-orn)" class="cj-flow"/>

  <rect x="536" y="40" width="138" height="60" rx="7" fill="#2a1a14" stroke="#f85149" stroke-width="1.8"/>
  <text x="605" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">paginate</text>
  <text x="605" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">while next_page</text>
  <text x="605" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">loop + append</text>

  <line x1="674" y1="70" x2="710" y2="70" stroke="#ffa657" stroke-width="2" marker-end="url(#cj-orn)" class="cj-flow"/>

  <rect x="710" y="40" width="96" height="60" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="758" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">load</text>
  <text x="758" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">CSV/DB/file</text>

  <!-- Error handling note -->
  <rect x="14" y="118" width="792" height="72" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="136" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Key patterns:</text>
  <text x="26"  y="153" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">curl -sf URL | jq '.data[]? // empty'</text>
  <text x="300" y="153" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">→ safe: won't fail if .data is null</text>
  <text x="26"  y="170" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">jq -e '.status == "ok"' &amp;&amp; process || echo "API error"</text>
  <text x="26"  y="187" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">NEXT=$(curl -s URL | tee response.json | jq -r '.meta.next // empty')</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 11 of 12 — API patterns: paginated download, error checking, parallel</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC API → CSV PIPELINE ═══════════════════════════════</span>
<span class="cb-prompt">$</span> curl -sf "https://api.example.com/sales?date=2024-01-15" \
    -H "Authorization: Bearer $API_TOKEN" |
    jq -r '
        .data[] |
        [.id, .company, .amount, .status] |
        @csv' >> sales.csv

<span class="cb-cmt">## ═══ PAGINATED API DOWNLOAD ═════════════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">BASE_URL="https://api.example.com"</span>
<span class="cb-out">PAGE=1</span>
<span class="cb-out">OUTPUT="all_data.jsonl"</span>
<span class="cb-out">: > "$OUTPUT"  # empty the output file</span>
<span class="cb-out"></span>
<span class="cb-out">while true; do</span>
<span class="cb-out">    echo "Fetching page $PAGE..."</span>
<span class="cb-out">    RESPONSE=$(curl -sf "$BASE_URL/records?page=$PAGE&per_page=1000" \</span>
<span class="cb-out">        -H "Authorization: Bearer $API_TOKEN")</span>
<span class="cb-out">    </span>
<span class="cb-out">    # Check API status</span>
<span class="cb-out">    STATUS=$(echo "$RESPONSE" | jq -r '.status // "ok"')</span>
<span class="cb-out">    [[ "$STATUS" != "ok" ]] && { echo "API error: $STATUS"; break; }</span>
<span class="cb-out">    </span>
<span class="cb-out">    # Write records to JSONL</span>
<span class="cb-out">    echo "$RESPONSE" | jq -c '.data[]' >> "$OUTPUT"</span>
<span class="cb-out">    </span>
<span class="cb-out">    # Check for next page</span>
<span class="cb-out">    TOTAL_PAGES=$(echo "$RESPONSE" | jq -r '.meta.total_pages // 1')</span>
<span class="cb-out">    (( PAGE >= TOTAL_PAGES )) && break</span>
<span class="cb-out">    (( PAGE++ ))</span>
<span class="cb-out">    sleep 0.1  # rate limit</span>
<span class="cb-out">done</span>
<span class="cb-out">echo "Downloaded $(wc -l < "$OUTPUT") records"</span>

<span class="cb-cmt">## ═══ jq RECIPES FOR API RESPONSES ══════════════════════════</span>
<span class="cb-cmt"># Check success and extract data:</span>
<span class="cb-prompt">$</span> curl -sf https://api.example.com/health |
    jq -e '.status == "healthy"' || { echo "UNHEALTHY"; exit 1; }

<span class="cb-cmt"># Extract error message on failure:</span>
<span class="cb-prompt">$</span> RESP=$(curl -sf -w "\n%{http_code}" https://api.example.com/data)
<span class="cb-out">HTTP_CODE=$(echo "$RESP" | tail -1)</span>
<span class="cb-out">BODY=$(echo "$RESP" | head -n -1)</span>
<span class="cb-out">if (( HTTP_CODE != 200 )); then</span>
<span class="cb-out">    echo "Error $HTTP_CODE: $(echo "$BODY" | jq -r '.error // .message // "Unknown"')"</span>
<span class="cb-out">    exit 1</span>
<span class="cb-out">fi</span>

<span class="cb-cmt"># Build API request body from CSV row:</span>
<span class="cb-prompt">$</span> while IFS=, read -r date company amount; do
    jq -n \
        --arg date "$date" \
        --arg company "$company" \
        --argjson amount "$amount" \
        '{date: $date, company: $company, amount: $amount}' |
    curl -sf -X POST https://api.example.com/record \
        -H "Content-Type: application/json" \
        -d @-
  done < <(tail -n +2 sales.csv)
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — PERFORMANCE COMPARISON
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Performance — Speed Tips &amp; Tool Benchmarks</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Relative Performance — 10M rows CSV / 1M line JSONL (1GB)</text>

  <!-- Y axis -->
  <line x1="80" y1="36" x2="80" y2="170" stroke="#30363d" stroke-width="1"/>
  <text x="74" y="44"  text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">fast</text>
  <text x="74" y="170" text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">slow</text>

  <!-- Bars -->
  <rect x="90"  y="82" width="60" height="88" rx="3" fill="#3fb950" opacity=".9"/>
  <text x="120" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">0.8s</text>
  <text x="120" y="183" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">cut</text>

  <rect x="164" y="72" width="60" height="98" rx="3" fill="#3fb950" opacity=".8"/>
  <text x="194" y="66" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">1.1s</text>
  <text x="194" y="183" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">awk</text>

  <rect x="238" y="62" width="60" height="108" rx="3" fill="#58a6ff" opacity=".8"/>
  <text x="268" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#58a6ff">1.5s</text>
  <text x="268" y="183" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#58a6ff">jq</text>

  <rect x="312" y="52" width="60" height="118" rx="3" fill="#58a6ff" opacity=".7"/>
  <text x="342" y="46" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#58a6ff">2.0s</text>
  <text x="342" y="183" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#58a6ff">mlr</text>

  <rect x="386" y="44" width="60" height="126" rx="3" fill="#ffa657" opacity=".8"/>
  <text x="416" y="38" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">2.5s</text>
  <text x="416" y="183" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">python csv</text>

  <rect x="460" y="36" width="60" height="134" rx="3" fill="#ffa657" opacity=".7"/>
  <text x="490" y="30" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">3.0s</text>
  <text x="490" y="183" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">csvkit</text>

  <rect x="534" y="128" width="60" height="42" rx="3" fill="#bc8cff" opacity=".8"/>
  <text x="564" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#bc8cff">8s</text>
  <text x="564" y="183" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#bc8cff">pandas</text>

  <!-- Baseline -->
  <line x1="80" y1="170" x2="780" y2="170" stroke="#30363d" stroke-width="1"/>

  <!-- Notes -->
  <rect x="620" y="36" width="186" height="128" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="713" y="55" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#ffa657">Speed tips:</text>
  <text x="628" y="73" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">✅ awk beats cut for CSV</text>
  <text x="628" y="88" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">   (filtering saves later work)</text>
  <text x="628" y="106" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">✅ jq -c: compact output</text>
  <text x="628" y="121" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">   (faster than pretty)</text>
  <text x="628" y="139" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">✅ Stream: avoid --slurp</text>
  <text x="628" y="154" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">   for JSONL input</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 12 of 12 — Complete ETL: API download → clean → validate → aggregate → load</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ COMPLETE ETL PIPELINE ══════════════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -Eeuo pipefail</span>
<span class="cb-out">DATE="\${1:-$(date +%Y-%m-%d)}"</span>
<span class="cb-out">TMPDIR=$(mktemp -d)</span>
<span class="cb-out">trap "rm -rf '$TMPDIR'" EXIT</span>
<span class="cb-out"></span>
<span class="cb-out"># 1. Download from API (JSON response → JSONL)</span>
<span class="cb-out">echo "Downloading..."</span>
<span class="cb-out">curl -sf "https://api.example.com/sales?date=$DATE" \</span>
<span class="cb-out">    -H "Authorization: Bearer $API_TOKEN" |</span>
<span class="cb-out">    jq -e '.status == "ok"' >/dev/null || { echo "API error"; exit 1; }</span>
<span class="cb-out">curl -sf "https://api.example.com/sales?date=$DATE" \</span>
<span class="cb-out">    -H "Authorization: Bearer $API_TOKEN" |</span>
<span class="cb-out">    jq -c '.data[]' > "$TMPDIR/raw.jsonl"</span>
<span class="cb-out">echo "Downloaded $(wc -l < "$TMPDIR/raw.jsonl") records"</span>
<span class="cb-out"></span>
<span class="cb-out"># 2. Validate schema (jq)</span>
<span class="cb-out">echo "Validating..."</span>
<span class="cb-out">INVALID=$(jq -c 'select(.id == null or .amount == null or .status == null)' \</span>
<span class="cb-out">    "$TMPDIR/raw.jsonl" | wc -l)</span>
<span class="cb-out">(( INVALID > 0 )) && echo "Warning: $INVALID invalid records"</span>
<span class="cb-out">jq -c 'select(.id != null and .amount != null and .status != null)' \</span>
<span class="cb-out">    "$TMPDIR/raw.jsonl" > "$TMPDIR/valid.jsonl"</span>
<span class="cb-out"></span>
<span class="cb-out"># 3. Transform: enrich with lookup, convert to CSV</span>
<span class="cb-out">echo "Transforming..."</span>
<span class="cb-out">jq -r '[.id, .date, .company, .region, (.amount | tonumber), .status] | @csv' \</span>
<span class="cb-out">    "$TMPDIR/valid.jsonl" > "$TMPDIR/data.csv"</span>
<span class="cb-out"></span>
<span class="cb-out"># 4. Add header and regional enrichment via csvjoin</span>
<span class="cb-out">{ echo "id,date,company,region,amount,status"</span>
<span class="cb-out">  cat "$TMPDIR/data.csv"; } |</span>
<span class="cb-out">    csvjoin --left -c region - /data/lookups/regions.csv \</span>
<span class="cb-out">    > "$TMPDIR/enriched.csv"</span>
<span class="cb-out"></span>
<span class="cb-out"># 5. Aggregate summary</span>
<span class="cb-out">mlr --csv stats1 -a sum,count -f amount -g region "$TMPDIR/enriched.csv" \</span>
<span class="cb-out">    > "$TMPDIR/summary.csv"</span>
<span class="cb-out"></span>
<span class="cb-out"># 6. Load to PostgreSQL</span>
<span class="cb-out">psql -d analytics << EOSQL</span>
<span class="cb-out">BEGIN;</span>
<span class="cb-out">DELETE FROM sales WHERE date = '$DATE';</span>
<span class="cb-out">\copy sales FROM '$TMPDIR/enriched.csv' CSV HEADER</span>
<span class="cb-out">\copy sales_summary FROM '$TMPDIR/summary.csv' CSV HEADER</span>
<span class="cb-out">COMMIT;</span>
<span class="cb-out">EOSQL</span>
<span class="cb-out">echo "Loaded. Summary:"</span>
<span class="cb-out">csvstat --sum -c amount "$TMPDIR/enriched.csv"</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — How jq Parses JSON, CSV Streaming</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ JSON Parsing (jq internals), CSV RFC 4180, Streaming vs In-Memory</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. HOW jq PARSES JSON

   jq uses a hand-written recursive descent parser in C.
   
   Parsing stages:
   1. Lexer (jv_parse.c): tokenise input into tokens
      - Token types: string, number, boolean, null, {, }, [, ], , :
      - Numbers: parsed as IEEE 754 double (64-bit)
      - Note: large integers > 2^53 lose precision!
   
   2. Parser: build jv (jq value) tree from tokens
      - jv = tagged union: can hold string, number, bool, null, array, object
      - Objects stored as sorted key-value pairs (for key lookup)
      - Arrays stored as dynamic arrays with O(1) append
   
   3. Filter compilation: jq DSL → bytecode
      - Compiled at startup, not per-input-line
      - Why jq is fast with JSONL: compile once, run for each line
   
   4. VM execution: interpret bytecode against input jv
      - Stack-based virtual machine
      - jq's | operator = just pass output of left to right
      - select(expr): filter — don't emit if expr is false

   Memory model:
   - jq reads entire input into memory (by default)
   - Exception: streaming mode (jq -n --stream) for huge files
   - JSONL: each line is independent — jq -c processes streaming

2. CSV RFC 4180 — The State Machine

   A conforming CSV parser is a simple state machine:
   
   States: START, UNQUOTED_FIELD, QUOTED_FIELD, AFTER_QUOTE
   
   START:
     " → goto QUOTED_FIELD
     , → emit empty field, goto START
     \n → emit empty field, goto START (end of record)
     char → append to field_buf, goto UNQUOTED_FIELD
   
   UNQUOTED_FIELD:
     , → emit field_buf, clear, goto START
     \n → emit field_buf, clear, emit record (end of record)
     char → append to field_buf, stay
     " → ERROR (RFC 4180: unescaped quote in unquoted field)
   
   QUOTED_FIELD:
     " → goto AFTER_QUOTE
     \n → append \n to field_buf, stay (embedded newline!)
     char → append to field_buf, stay
   
   AFTER_QUOTE (saw one " in quoted field):
     " → append " to field_buf, goto QUOTED_FIELD (escaped quote)
     , → emit field_buf (without outer quotes), goto START
     \n → emit field_buf, emit record, goto START
   
   This state machine is why:
   - cut -d, fails: doesn't implement the state machine
   - Python csv.reader works: implements RFC 4180 state machine
   - csvkit works: uses Python csv.reader internally

3. WHY EMBEDDED NEWLINES BREAK NAIVE TOOLS

   Naive tools (grep, wc -l, tail, head) work on line boundaries.
   
   If a CSV field contains a literal newline:
   "He said\nOK","next_field"
   
   This spans TWO physical lines. grep sees two separate lines.
   wc -l counts it as 2 rows (actually 1 record).
   tail -n 1 might give you half a record.
   
   Only RFC 4180-aware parsers handle this correctly.
   Solution: convert to JSONL (no embedded newlines in JSON strings,
   they're escaped as \n) before using line-oriented tools.

4. JSON NUMBER PRECISION

   JSON numbers use IEEE 754 double precision (like JavaScript).
   Max exact integer: 2^53 = 9007199254740992
   
   If your IDs or amounts exceed this, use strings in JSON:
   {"amount": "9999999999999999.99"}  (string, preserves precision)
   vs
   {"amount": 9999999999999999.99}   (number, loses precision!)
   
   jq represents numbers as doubles:
   jq -n '9007199254740993'  → 9007199254740992  (WRONG!)
   
   Solutions:
   - jq --jsonargs: pass large numbers as strings
   - Use Python decimal for high-precision arithmetic
   - Store amounts in cents (integer) rather than decimal
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — CSV &amp; JSON Quick Lookup</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:28%">Command / Filter</th><th>Purpose</th><th style="width:24%">Key Options</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">CSV Tools</td></tr>
<tr><td style="font-family:monospace;">csvstat file.csv</td><td>Data profiling: types, nulls, min/max/mean</td><td><code>-c col</code> specific column, <code>--mean</code></td></tr>
<tr><td style="font-family:monospace;">csvcut -c col1,col2</td><td>Select columns by name or number</td><td><code>-C</code> exclude, <code>-n</code> list columns</td></tr>
<tr><td style="font-family:monospace;">csvgrep -c col -m val</td><td>Filter rows by value (RFC 4180 aware)</td><td><code>-r regex</code>, <code>-i</code> invert</td></tr>
<tr><td style="font-family:monospace;">csvsort -c col -r</td><td>Sort by column, type-aware (numeric/date)</td><td><code>-n</code> treat as numeric, <code>-r</code> reverse</td></tr>
<tr><td style="font-family:monospace;">csvjoin --left -c key</td><td>Join two CSVs on a key column</td><td><code>--left --right --outer</code> join types</td></tr>
<tr><td style="font-family:monospace;">in2csv file.xlsx</td><td>Convert Excel/JSON/DBF/fixed → CSV</td><td><code>--sheet Name</code>, <code>-f json</code></td></tr>
<tr><td style="font-family:monospace;">csvformat -T</td><td>Convert delimiter (CSV → TSV)</td><td><code>-D '|'</code> custom delimiter</td></tr>
<tr><td style="font-family:monospace;">csvjson -l</td><td>CSV → JSON Lines</td><td><code>-i 4</code> pretty JSON array</td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">jq Filters</td></tr>
<tr><td style="font-family:monospace;">.key / .key.nested</td><td>Access object field / nested</td><td><code>.[0]</code> array index, <code>.[]</code> iterate</td></tr>
<tr><td style="font-family:monospace;">select(condition)</td><td>Filter — keep only matching</td><td>Combine with: and, or, not, ==, >, &lt;</td></tr>
<tr><td style="font-family:monospace;">map(expr)</td><td>Transform each element of array</td><td>= <code>[.[] | expr]</code></td></tr>
<tr><td style="font-family:monospace;">group_by(.key)</td><td>Group array by field value</td><td>Returns array of arrays</td></tr>
<tr><td style="font-family:monospace;">sort_by(.key) | reverse</td><td>Sort descending by field</td><td><code>unique_by</code>, <code>min_by</code>, <code>max_by</code></td></tr>
<tr><td style="font-family:monospace;">[.[] | expr] | @csv</td><td>Array → CSV row (properly quoted)</td><td><code>@tsv @base64 @uri @html</code></td></tr>
<tr><td style="font-family:monospace;">to_entries | from_entries</td><td>Object ↔ array of {key, value}</td><td><code>with_entries(.value|...)</code></td></tr>
<tr><td style="font-family:monospace;">jq -r -c -s -e -n</td><td>Raw output / compact / slurp / exit / null input</td><td>Most common flags</td></tr>
<tr><td colspan="3" style="background:#1f1428;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">miller (mlr)</td></tr>
<tr><td style="font-family:monospace;">mlr --csv filter</td><td>Filter rows, quote-aware</td><td>Arithmetic: ==, >, &lt;, &&</td></tr>
<tr><td style="font-family:monospace;">mlr --csv stats1</td><td>Aggregation with groupby</td><td><code>-a sum,mean,count -f col -g group</code></td></tr>
<tr><td style="font-family:monospace;">mlr --csv --ojson cat</td><td>Convert CSV → JSON</td><td><code>--ocsv --ojsonl --otsv</code></td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 15 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — CSV Basics and Edge Cases</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create a CSV with a field containing a comma, a field containing double-quotes, and a field containing an embedded newline. Verify with <code>csvstat --count</code> that it counts correctly.</li>
      <li>Run <code>cut -d, -f2</code> on your CSV — show that it gives wrong output for the quoted-comma field. Then run <code>csvcut -c 2</code> — show it gives correct output.</li>
      <li>Use <code>csvstat</code> to profile a CSV: find column names, types, null counts, and numeric min/max/mean.</li>
      <li>Use <code>in2csv</code> to convert a multi-sheet Excel file — extract all sheets to separate CSVs.</li>
      <li>Use <code>csvgrep</code> to filter to only rows where status is "CONFIRMED" AND country is "UK".</li>
      <li>Use <code>csvjoin</code> to left-join two CSVs on a key column. Verify the row count is correct.</li>
      <li>Fix a Windows CSV file: remove BOM, convert CRLF to LF, fix encoding from latin1 to UTF-8.</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — jq Fundamentals</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Given a JSON file with users (id, name, email, active, score), use jq to: extract all names, filter to active users only, find the user with the highest score.</li>
      <li>Use <code>jq</code> to convert a JSON array to CSV with a header row using <code>@csv</code></li>
      <li>Access a nested field: given <code>{"user": {"address": {"city": "Mumbai"}}}</code>, extract the city</li>
      <li>Use <code>group_by</code> and <code>map</code> to compute total sales per region from a JSON array</li>
      <li>Use <code>select</code> with a regex test: find all users whose email ends with "@company.com"</li>
      <li>Use <code>to_entries | from_entries</code> to rename a field (e.g. rename "amount" to "total")</li>
      <li>Use <code>--arg</code> to pass a shell variable into a jq filter</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — jq Advanced and JSONL</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Download a real API (e.g. <code>https://jsonplaceholder.typicode.com/posts</code>). Use jq to: count posts, find the user with the most posts, extract a @csv of id/title.</li>
      <li>Write a jq filter that flattens a nested object (e.g. <code>{"a": {"b": 1}}</code> → <code>{"a.b": 1}</code>) using <code>paths</code> and <code>getpath</code></li>
      <li>Process a JSONL file of events: count by event type, find the top 5 user IDs, compute hourly rate (events per hour).</li>
      <li>Convert a JSONL file to CSV: first determine all unique keys across all objects, use those as headers, handle missing fields as empty strings.</li>
      <li>Write a jq program using <code>def</code> to define reusable functions: <code>to_eur</code>, <code>round2</code>, <code>format_amount</code>. Apply to all sales records.</li>
      <li>Use <code>jq -e</code> in a script to validate API responses: exit non-zero if <code>.status != "ok"</code> or <code>.data | length == 0</code>.</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Format Conversion Pipeline</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Build a complete CSV → JSON → JSONL → CSV round-trip: verify the final CSV is identical to the input (row count, field values including those with commas and quotes).</li>
      <li>Download an Excel file with multiple sheets. Convert all sheets to CSV, validate each with <code>csvclean</code>, produce a single merged JSONL with a "sheet" field added.</li>
      <li>Build a CSV quality report: use csvstat to get types; use csvgrep to find rows with null required fields; output a structured report as JSON.</li>
      <li>Use miller to: read a CSV, add a calculated field (vat = amount * 0.2), sort by date then amount descending, export as JSONL.</li>
      <li>Write a Python one-liner pipeline that: reads CSV, casts all numeric fields, filters where amount > 100, writes valid JSON array to stdout.</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Complete Data Ingestion Pipeline</h4>
    <p>Build a production-grade data ingestion script <code>ingest.sh SOURCE DATE</code>:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Multi-format ingestion:</strong> Accept CSV, TSV, XLSX, or JSON/JSONL. Auto-detect format from file extension. Use the appropriate tool (csvkit for CSV/Excel, jq for JSON).</li>
      <li><strong>Schema validation:</strong> Check required columns exist. Validate data types (dates match YYYY-MM-DD, amounts are numeric, IDs are integers). Reject and log bad rows.</li>
      <li><strong>Deduplication:</strong> Use csvkit or jq to identify and remove duplicate rows by ID. Report how many duplicates were found.</li>
      <li><strong>Enrichment:</strong> Join with a regions lookup CSV. Add calculated fields (vat, total_with_vat). Validate that amounts balance.</li>
      <li><strong>Output:</strong> Produce three outputs: (a) clean CSV for database load, (b) JSONL for streaming consumers, (c) aggregated summary JSON by region and month.</li>
      <li><strong>Quality report:</strong> Print a JSON quality report: total rows, rejected rows by reason, enrichment success rate, and data freshness (max date in file).</li>
    </ol>
    <p><strong>Must handle: missing files, API timeouts, corrupt CSV (bad quoting), XLSX with BOM, mixed date formats, amounts with currency symbols, and files with millions of rows within 512MB RAM.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Data Quality Culture — Day 545</div>
    <p>The broken pipeline had taught Ravi two things. The first was technical: CSV has rules, and tools that ignore them corrupt data silently. The second was cultural: the worst bugs are the ones that don't crash — the ones that run successfully and return the wrong answer for months before anyone notices.</p>
    <p>He added a data quality check to every pipeline. Every CSV ingest now ran through <code>csvclean</code> first. Every API response was validated with <code>jq -e</code>. Every aggregation was checked against the raw row count. And every output had a quality report: row counts, null rates, value distributions, date ranges.</p>
    <p>Six months after the incident, a new colleague onboarded. On their first day they wrote a pipeline that used <code>cut -d, -f4</code> on customer data. Ravi saw it in code review and left a comment: "This will silently corrupt data on any row where the company name contains a comma. Use <code>csvcut -c 4</code> instead, or <code>awk -F',' '{print $4}'</code> if you need speed — and first check whether your CSV has quoted fields."</p>
    <p>He knew this not because he was clever, but because he had been the one who got it wrong first.</p>
    <p><strong>CSV looks simple. JSON looks simple. The edge cases are not simple — and the tools that handle them correctly are the ones worth learning.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};