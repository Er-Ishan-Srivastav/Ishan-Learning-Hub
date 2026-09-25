
var cron = {
    title: "Cron Jobs & Scheduling",
    description: "Master Linux scheduling completely — crontab syntax from first principles, all special strings and operators, the hidden environment pitfalls that break cron jobs, output handling, overlap prevention, systemd timers, at/anacron, and production scheduling patterns for data pipelines.",
    content: `
<style>
/* ── Keyframe animations ── */
@keyframes cr-tick  { 0%,100%{opacity:1} 50%{opacity:.15} }
@keyframes cr-flow  { 0%{stroke-dashoffset:24} 100%{stroke-dashoffset:0} }
@keyframes cr-pop   { 0%{transform:scale(0);opacity:0} 80%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
@keyframes cr-spin  { 0%{transform:rotate(0deg);transform-origin:410px 130px} 100%{transform:rotate(360deg);transform-origin:410px 130px} }
@keyframes cr-pulse { 0%,100%{fill:#1a2a1a;stroke:#3fb950} 50%{fill:#0a1a0a;stroke:#238636} }
@keyframes cr-blink { 0%,100%{opacity:1} 50%{opacity:.2} }
@keyframes cr-slide { 0%{transform:translateX(-20px);opacity:0} 100%{transform:translateX(0);opacity:1} }

.cr-tick  { animation: cr-tick  1s ease-in-out infinite; }
.cr-flow  { stroke-dasharray:6 4; animation: cr-flow .8s linear infinite; }
.cr-pulse { animation: cr-pulse 2.5s ease-in-out infinite; }
.cr-blink { animation: cr-blink 1.4s ease-in-out infinite; }
.cr-pop   { animation: cr-pop   .5s cubic-bezier(.34,1.56,.64,1) both; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Silent Failure — Day 370</div>
    <br>
    <p>The daily ETL job had "been running" for three weeks. The crontab entry was there. Ravi had verified it multiple times. But one Monday morning, the dashboard showed four days of missing data. The cron job had been silently failing — every single day — for four days, and nobody knew.</p>
    <br>
    <p>The problem turned out to be three separate things. First, the script referenced <code>python3</code> but cron's PATH doesn't include <code>/usr/local/bin</code> where it was installed — the script was failing with "command not found." Second, all the error output was going to a mail spool nobody ever checked. Third, when the fix was deployed, two jobs overlapped and both wrote to the output file simultaneously, corrupting it.</p>
    <br>
    <p>Priya sat down and rebuilt the cron entry properly: absolute paths, explicit environment, output redirected to a log file with timestamps, a lock file to prevent overlap, and an exit code check that sent an alert on failure. Four lines of setup that would have saved four days of data.</p>
    <br>
    <p>"Cron is not a scheduler," she said. "Cron is an execution environment that happens to run on a schedule. The schedule is the easy part. Getting the environment right is the skill."</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — THE CRONTAB FORMAT (FULL ANATOMY)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Crontab Syntax — Every Field, Range, and Operator</h2>

<p>A cron entry has <strong>6 fields</strong>: five time fields followed by the command. Each time field has a specific meaning and accepts specific values. Understanding all five fields and their operators unlocks everything cron can express.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="cr-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
    <marker id="cr-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="cr-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="cr-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="cr-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="cr-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
  </defs>
  <rect width="820" height="320" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Crontab Entry Anatomy — All 6 Fields Labelled</text>

  <!-- The cron line -->
  <rect x="14" y="36" width="792" height="40" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <!-- Field boxes -->
  <rect x="24"  y="42" width="68" height="28" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="58"  y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#58a6ff">30</text>

  <rect x="100" y="42" width="68" height="28" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="134" y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">6</text>

  <rect x="176" y="42" width="68" height="28" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="210" y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#ffa657">*</text>

  <rect x="252" y="42" width="68" height="28" rx="5" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="286" y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#bc8cff">*</text>

  <rect x="328" y="42" width="68" height="28" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="362" y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#f85149">1</text>

  <rect x="404" y="42" width="394" height="28" rx="5" fill="#1a1a1a" stroke="#30363d" stroke-width="1.5"/>
  <text x="601" y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" fill="#e6edf3">/usr/bin/python3 /opt/etl/run.py</text>

  <!-- Arrows down to labels -->
  <line x1="58"  y1="70" x2="58"  y2="96" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#cr-blu)"/>
  <line x1="134" y1="70" x2="134" y2="96" stroke="#3fb950" stroke-width="1.5" marker-end="url(#cr-grn)"/>
  <line x1="210" y1="70" x2="210" y2="96" stroke="#ffa657" stroke-width="1.5" marker-end="url(#cr-orn)"/>
  <line x1="286" y1="70" x2="286" y2="96" stroke="#bc8cff" stroke-width="1.5" marker-end="url(#cr-pur)"/>
  <line x1="362" y1="70" x2="362" y2="96" stroke="#f85149" stroke-width="1.5" marker-end="url(#cr-red)"/>
  <line x1="601" y1="70" x2="601" y2="96" stroke="#30363d" stroke-width="1.5" marker-end="url(#cr-arr)"/>

  <!-- Field label boxes -->
  <rect x="14"  y="96" width="110" height="46" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="69"  y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">MINUTE</text>
  <text x="69"  y="130" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">0–59</text>

  <rect x="132" y="96" width="110" height="46" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="187" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">HOUR</text>
  <text x="187" y="130" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">0–23</text>

  <rect x="250" y="96" width="110" height="46" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="305" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">DAY OF MONTH</text>
  <text x="305" y="130" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">1–31</text>

  <rect x="368" y="96" width="110" height="46" rx="6" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="423" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">MONTH</text>
  <text x="423" y="130" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">1–12 or Jan–Dec</text>

  <rect x="486" y="96" width="110" height="46" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="541" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">DAY OF WEEK</text>
  <text x="541" y="130" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">0–7 or Sun–Sat</text>

  <rect x="604" y="96" width="202" height="46" rx="6" fill="#1a1a1a" stroke="#30363d" stroke-width="1.5"/>
  <text x="705" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">COMMAND</text>
  <text x="705" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">full path required!</text>

  <!-- Operators section -->
  <text x="410" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Operators — Can Be Used in Any Time Field</text>

  <!-- Operator boxes -->
  <rect x="14"  y="170" width="152" height="60" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="90"  y="189" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#58a6ff">*</text>
  <text x="90"  y="206" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Every value</text>
  <text x="90"  y="221" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">* = every minute/hour/day</text>

  <rect x="174" y="170" width="152" height="60" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="250" y="189" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#3fb950">a-b</text>
  <text x="250" y="206" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Range (inclusive)</text>
  <text x="250" y="221" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">1-5 = Mon to Fri</text>

  <rect x="334" y="170" width="152" height="60" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="410" y="189" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#ffa657">a,b,c</text>
  <text x="410" y="206" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">List (multiple values)</text>
  <text x="410" y="221" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">1,15 = 1st and 15th</text>

  <rect x="494" y="170" width="152" height="60" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="570" y="189" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#bc8cff">*/n</text>
  <text x="570" y="206" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Step / every Nth</text>
  <text x="570" y="221" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">*/15 = :00 :15 :30 :45</text>

  <rect x="654" y="170" width="152" height="60" rx="7" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="730" y="189" text-anchor="middle" font-family="'Courier New',monospace" font-size="16" font-weight="bold" fill="#f85149">a-b/n</text>
  <text x="730" y="206" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Range with step</text>
  <text x="730" y="221" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#f85149">8-18/2 = 8,10,12,14,16,18</text>

  <!-- DOW note -->
  <rect x="14" y="240" width="792" height="70" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="258" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">⚠ Day-of-Week (DOW) Critical Notes:</text>
  <text x="26" y="274" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">• 0 and 7 BOTH mean Sunday — both are valid and equivalent in vixie-cron</text>
  <text x="26" y="288" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">• Names: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6  (first 3 letters, case-insensitive)</text>
  <text x="26" y="302" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">• When BOTH day-of-month AND day-of-week are non-*, it fires when EITHER matches (OR logic, not AND!)</text>
</svg>
<p class="diagram-caption">The entry <code>30 6 * * 1</code> means: minute=30, hour=6, any day-of-month, any month, Monday. Fires at 06:30 every Monday. The command must use <strong>absolute paths</strong> — cron's PATH is minimal and does not include <code>/usr/local/bin</code>.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 10 — crontab: edit, list, remove, syntax examples, crontab -u</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ MANAGING CRONTABS ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> crontab -e              <span class="cb-cmt"># edit current user's crontab (uses $EDITOR or vi)</span>
<span class="cb-prompt">$</span> crontab -l              <span class="cb-cmt"># list current user's crontab</span>
<span class="cb-prompt">$</span> crontab -r              <span class="cb-cmt"># REMOVE crontab (no confirmation — be careful!)</span>
<span class="cb-prompt">$</span> crontab -l | wc -l     <span class="cb-cmt"># count cron entries</span>

<span class="cb-cmt"># For root / other users:</span>
<span class="cb-prompt">$</span> sudo crontab -e -u ravi  <span class="cb-cmt"># edit ravi's crontab (as root)</span>
<span class="cb-prompt">$</span> sudo crontab -l -u ravi  <span class="cb-cmt"># list ravi's crontab</span>

<span class="cb-cmt"># Backup before editing:</span>
<span class="cb-prompt">$</span> crontab -l > ~/crontab.bak.$(date +%Y%m%d)

<span class="cb-cmt">## ═══ CRONTAB SYNTAX EXAMPLES — COMPLETE ═════════════════════</span>
<span class="cb-cmt"># Format: MIN HOUR DOM MON DOW COMMAND</span>
<span class="cb-cmt"># ─────────────────────────────────────────────────────────────</span>
<span class="cb-cmt"># Every minute:</span>
<span class="cb-out">* * * * * /opt/heartbeat.sh</span>

<span class="cb-cmt"># Every 5 minutes:</span>
<span class="cb-out">*/5 * * * * /opt/poll.sh</span>

<span class="cb-cmt"># Daily at 02:30 AM:</span>
<span class="cb-out">30 2 * * * /opt/etl/daily.sh</span>

<span class="cb-cmt"># Every weekday (Mon–Fri) at 08:00:</span>
<span class="cb-out">0 8 * * 1-5 /opt/reports/morning.sh</span>

<span class="cb-cmt"># 1st and 15th of every month at midnight:</span>
<span class="cb-out">0 0 1,15 * * /opt/billing/generate.sh</span>

<span class="cb-cmt"># Every 15 minutes between 08:00 and 18:00 on weekdays:</span>
<span class="cb-out">*/15 8-18 * * 1-5 /opt/sync.sh</span>

<span class="cb-cmt"># First Monday of the month at 06:00 (workaround — cron can't express this natively):</span>
<span class="cb-out">0 6 1-7 * 1 [ $(date +%d) -le 7 ] && /opt/monthly_monday.sh</span>

<span class="cb-cmt"># Last day of month (trick: tomorrow is the 1st):</span>
<span class="cb-out">0 23 28-31 * * [ "$(date -d tomorrow +%d)" = "01" ] && /opt/month_end.sh</span>

<span class="cb-cmt"># Every 2 hours:</span>
<span class="cb-out">0 */2 * * * /opt/aggregate.sh</span>

<span class="cb-cmt"># Multiple times per hour (at :00 :20 :40):</span>
<span class="cb-out">0,20,40 * * * * /opt/refresh.sh</span>

<span class="cb-cmt"># Quarterly (Jan/Apr/Jul/Oct at midnight):</span>
<span class="cb-out">0 0 1 1,4,7,10 * /opt/quarterly.sh</span>

<span class="cb-cmt"># Weekend nights (Fri/Sat at 23:00):</span>
<span class="cb-out">0 23 * * 5,6 /opt/weekend_batch.sh</span>

<span class="cb-cmt"># Weekdays AND 15th of month (DOW+DOM = OR logic!):</span>
<span class="cb-out">0 9 15 * 1-5 /opt/meeting.sh</span>
<span class="cb-cmt"># FIRES ON: every weekday AND every 15th (not: only the 15th when it's a weekday)</span>
<span class="cb-cmt"># To get AND: add [ condition ] test inside the command</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — CRON TIMING VISUALISER (ANIMATED CLOCK)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Cron Timing Visualised — When Jobs Actually Fire</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="290" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Cron Expression Timeline — When Each Pattern Fires (24h view)</text>

  <!-- 24h timeline axis -->
  <line x1="40" y1="48" x2="800" y2="48" stroke="#30363d" stroke-width="1.5"/>
  <!-- Hour ticks -->
  <text x="40"  y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">0</text>
  <text x="72"  y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">1</text>
  <text x="104" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">2</text>
  <text x="136" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">3</text>
  <text x="168" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">4</text>
  <text x="200" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">5</text>
  <text x="232" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">6</text>
  <text x="264" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">7</text>
  <text x="296" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">8</text>
  <text x="328" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">9</text>
  <text x="360" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">10</text>
  <text x="392" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">11</text>
  <text x="424" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">12</text>
  <text x="456" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">13</text>
  <text x="488" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">14</text>
  <text x="520" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">15</text>
  <text x="552" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">16</text>
  <text x="584" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">17</text>
  <text x="616" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">18</text>
  <text x="648" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">19</text>
  <text x="680" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">20</text>
  <text x="712" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">21</text>
  <text x="744" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">22</text>
  <text x="776" y="44" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">23</text>

  <!-- Pattern 1: 30 2 * * * (daily 02:30) -->
  <text x="26" y="68" text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">30 2</text>
  <circle cx="120" cy="64" r="5" fill="#58a6ff" class="cr-blink"/>
  <text x="130" y="68" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">02:30 daily</text>

  <!-- Pattern 2: 0 */2 * * * (every 2h) -->
  <text x="26" y="90" text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">0 */2</text>
  <circle cx="40"  cy="86" r="4" fill="#3fb950"/>
  <circle cx="104" cy="86" r="4" fill="#3fb950"/>
  <circle cx="168" cy="86" r="4" fill="#3fb950"/>
  <circle cx="232" cy="86" r="4" fill="#3fb950"/>
  <circle cx="296" cy="86" r="4" fill="#3fb950"/>
  <circle cx="360" cy="86" r="4" fill="#3fb950"/>
  <circle cx="424" cy="86" r="4" fill="#3fb950"/>
  <circle cx="488" cy="86" r="4" fill="#3fb950"/>
  <circle cx="552" cy="86" r="4" fill="#3fb950"/>
  <circle cx="616" cy="86" r="4" fill="#3fb950"/>
  <circle cx="680" cy="86" r="4" fill="#3fb950"/>
  <circle cx="744" cy="86" r="4" fill="#3fb950"/>
  <text x="760" y="90" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">every 2h</text>

  <!-- Pattern 3: */15 8-18 * * 1-5 -->
  <text x="26" y="112" text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">*/15 8-18 wkd</text>
  <rect x="296" y="104" width="320" height="14" rx="3" fill="#1a1a00" stroke="#ffa657" stroke-width="1"/>
  <!-- dots every 15 min within 8-18 range -->
  <circle cx="296" cy="111" r="3" fill="#ffa657"/>
  <circle cx="308" cy="111" r="3" fill="#ffa657"/>
  <circle cx="320" cy="111" r="3" fill="#ffa657"/>
  <circle cx="332" cy="111" r="3" fill="#ffa657"/>
  <circle cx="344" cy="111" r="3" fill="#ffa657"/>
  <circle cx="356" cy="111" r="3" fill="#ffa657"/>
  <circle cx="368" cy="111" r="3" fill="#ffa657"/>
  <circle cx="380" cy="111" r="3" fill="#ffa657"/>
  <circle cx="392" cy="111" r="3" fill="#ffa657"/>
  <circle cx="404" cy="111" r="3" fill="#ffa657"/>
  <circle cx="416" cy="111" r="3" fill="#ffa657"/>
  <circle cx="428" cy="111" r="3" fill="#ffa657"/>
  <circle cx="440" cy="111" r="3" fill="#ffa657"/>
  <circle cx="452" cy="111" r="3" fill="#ffa657"/>
  <circle cx="464" cy="111" r="3" fill="#ffa657"/>
  <circle cx="476" cy="111" r="3" fill="#ffa657"/>
  <circle cx="488" cy="111" r="3" fill="#ffa657"/>
  <circle cx="500" cy="111" r="3" fill="#ffa657"/>
  <circle cx="512" cy="111" r="3" fill="#ffa657"/>
  <circle cx="524" cy="111" r="3" fill="#ffa657"/>
  <circle cx="536" cy="111" r="3" fill="#ffa657"/>
  <circle cx="548" cy="111" r="3" fill="#ffa657"/>
  <circle cx="560" cy="111" r="3" fill="#ffa657"/>
  <circle cx="572" cy="111" r="3" fill="#ffa657"/>
  <circle cx="584" cy="111" r="3" fill="#ffa657"/>
  <circle cx="596" cy="111" r="3" fill="#ffa657"/>
  <circle cx="608" cy="111" r="3" fill="#ffa657"/>
  <circle cx="616" cy="111" r="3" fill="#ffa657"/>
  <text x="625" y="115" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">8:00-18:00, wkdays</text>

  <!-- Pattern 4: 0 0 1,15 * * (1st and 15th) -->
  <text x="26" y="138" text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">0 0 1,15</text>
  <text x="44" y="138" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">midnight on 1st and 15th of each month</text>

  <!-- Pattern 5: @reboot -->
  <text x="26" y="160" text-anchor="end" font-family="'Courier New',monospace" font-size="9" fill="#f85149">@reboot</text>
  <text x="44" y="160" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">once when cron daemon starts (system reboot)</text>

  <!-- Timing pitfalls -->
  <rect x="14" y="172" width="792" height="108" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="192" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">⚠ Critical Timing Pitfalls:</text>

  <text x="26" y="210" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">1. DOM + DOW = OR, not AND:</text>
  <text x="200" y="210" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">0 0 15 * 1</text>
  <text x="300" y="210" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">fires on the 15th AND every Monday (not 15th-that-is-Monday)</text>

  <text x="26" y="228" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">2. No seconds:</text>
  <text x="115" y="228" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">cron minimum resolution is 1 minute. For sub-minute scheduling, use sleep loops or systemd timers.</text>

  <text x="26" y="246" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">3. DST gaps:</text>
  <text x="108" y="246" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">jobs at 02:30 may fire twice or not at all during Daylight Saving transitions. Schedule at non-DST hours.</text>

  <text x="26" y="264" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">4. Feb 29:</text>
  <text x="100" y="264" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">0 0 29 2 * fires only in leap years. For monthly-ish: use 1 * (1st of each month) instead.</text>

  <text x="26" y="280" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">5. 0 vs 7 for Sunday:</text>
  <text x="158" y="280" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">both are valid in vixie-cron. Use 0 for clarity. Don't mix 0 and 7 in the same entry.</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — SPECIAL STRINGS (@daily, @reboot etc.)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Special Strings — @reboot, @daily, @hourly and More</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Special Cron Strings — Human-Readable Alternatives to 5-Field Syntax</text>

  <!-- 8 special strings in 2 rows of 4 -->
  <!-- Row 1 -->
  <rect x="14"  y="34" width="185" height="68" rx="8" fill="#2a1a1a" stroke="#f85149" stroke-width="1.8"/>
  <text x="106" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#f85149">@reboot</text>
  <text x="106" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Once at startup</text>
  <text x="106" y="87" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">(when crond starts)</text>
  <text x="106" y="98" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#f85149">no 5-field equivalent</text>

  <rect x="208" y="34" width="185" height="68" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="300" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#58a6ff">@hourly</text>
  <text x="300" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Once per hour</text>
  <text x="300" y="87" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">= 0 * * * *</text>

  <rect x="402" y="34" width="185" height="68" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="494" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">@daily</text>
  <text x="494" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Once per day</text>
  <text x="494" y="87" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">= 0 0 * * *</text>

  <rect x="596" y="34" width="210" height="68" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="701" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#3fb950">@midnight</text>
  <text x="701" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Same as @daily</text>
  <text x="701" y="87" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">= 0 0 * * *</text>

  <!-- Row 2 -->
  <rect x="14"  y="112" width="185" height="68" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="106" y="134" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#ffa657">@weekly</text>
  <text x="106" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Once per week</text>
  <text x="106" y="165" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">= 0 0 * * 0</text>

  <rect x="208" y="112" width="185" height="68" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="300" y="134" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#bc8cff">@monthly</text>
  <text x="300" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Once per month</text>
  <text x="300" y="165" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">= 0 0 1 * *</text>

  <rect x="402" y="112" width="185" height="68" rx="8" fill="#1a1a2a" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="494" y="134" text-anchor="middle" font-family="'Courier New',monospace" font-size="14" font-weight="bold" fill="#58a6ff">@yearly</text>
  <text x="494" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Once per year</text>
  <text x="494" y="165" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">= 0 0 1 1 *</text>

  <rect x="596" y="112" width="210" height="68" rx="8" fill="#1a1a2a" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="701" y="134" text-anchor="middle" font-family="'Courier New',monospace" font-size="13" font-weight="bold" fill="#58a6ff">@annually</text>
  <text x="701" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Same as @yearly</text>
  <text x="701" y="165" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">= 0 0 1 1 *</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 10 — Special strings, SHELL/PATH/MAILTO variables, cron environment</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SPECIAL STRINGS IN CRONTAB ══════════════════════════════</span>
<span class="cb-out">@reboot   /opt/startup.sh</span>
<span class="cb-out">@hourly   /opt/housekeep.sh</span>
<span class="cb-out">@daily    /opt/backup.sh</span>
<span class="cb-out">@weekly   /opt/weekly_report.sh</span>
<span class="cb-out">@monthly  /opt/billing.sh</span>
<span class="cb-out">@yearly   /opt/annual_archive.sh</span>

<span class="cb-cmt">## ═══ CRONTAB ENVIRONMENT VARIABLES ══════════════════════════</span>
<span class="cb-cmt"># Set at top of crontab file — apply to all entries below</span>

<span class="cb-cmt"># SHELL: which shell runs your commands (default: /bin/sh)</span>
<span class="cb-out">SHELL=/bin/bash</span>

<span class="cb-cmt"># PATH: where cron looks for executables (VERY different from login shell!)</span>
<span class="cb-cmt"># cron default: /usr/bin:/bin  — does NOT include /usr/local/bin!</span>
<span class="cb-out">PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</span>

<span class="cb-cmt"># MAILTO: where to send stdout/stderr (empty = discard mail)</span>
<span class="cb-out">MAILTO=""</span>           <span class="cb-cmt"># suppress all mail output</span>
<span class="cb-out">MAILTO=ops@company.com</span>  <span class="cb-cmt"># send to email</span>

<span class="cb-cmt"># HOME: working directory when job runs (default: user's home)</span>
<span class="cb-out">HOME=/opt/etl</span>

<span class="cb-cmt"># LOGNAME / USER: set automatically by crond</span>

<span class="cb-cmt">## ═══ COMPLETE SAFE CRONTAB HEADER ═══════════════════════════</span>
<span class="cb-out">SHELL=/bin/bash</span>
<span class="cb-out">PATH=/usr/local/bin:/usr/local/sbin:/usr/bin:/usr/sbin:/bin:/sbin</span>
<span class="cb-out">MAILTO=""</span>
<span class="cb-out">HOME=/home/ravi</span>
<span class="cb-out"># MIN HOUR DOM MON DOW COMMAND</span>
<span class="cb-out">30 2 * * * /opt/etl/daily.sh >> /var/log/etl/daily.log 2>&1</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — THE HIDDEN ENVIRONMENT PROBLEM (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The Environment Problem — Why Cron Jobs Fail Silently</h2>

<p>This is the single most common cause of cron job failures. The environment cron provides is <strong>radically different</strong> from your interactive shell — different PATH, no aliases, no functions, different HOME, no terminal. A command that works perfectly at the terminal will silently fail under cron.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="260" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Interactive Shell vs Cron Environment — Side-by-Side</text>

  <!-- Interactive shell column -->
  <rect x="14" y="36" width="385" height="216" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="206" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">Interactive Shell (SSH login)</text>
  <line x1="24" y1="62" x2="390" y2="62" stroke="#3fb950" stroke-width="1"/>

  <text x="24" y="80"  font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">PATH:</text>
  <text x="70" y="80"  font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">/usr/local/bin:/usr/local/sbin:/usr/bin</text>
  <text x="70" y="93"  font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">:/usr/sbin:/bin:/sbin:/home/ravi/bin</text>

  <text x="24" y="112" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">USER:</text>
  <text x="70" y="112" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">ravi</text>

  <text x="24" y="128" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">HOME:</text>
  <text x="70" y="128" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">/home/ravi</text>

  <text x="24" y="144" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">SHELL:</text>
  <text x="72" y="144" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">/bin/bash</text>

  <text x="24" y="160" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">TERM:</text>
  <text x="70" y="160" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">xterm-256color</text>

  <text x="24" y="176" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Aliases:</text>
  <text x="76" y="176" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">ll, la, ... (from .bashrc)</text>

  <text x="24" y="192" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Functions:</text>
  <text x="80" y="192" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">log_error, send_alert, ... (sourced)</text>

  <text x="24" y="208" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">virtualenv:</text>
  <text x="82" y="208" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">activated (from .bashrc)</text>

  <text x="24" y="224" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">SSH agent:</text>
  <text x="82" y="224" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">active (can git push)</text>

  <text x="206" y="244" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">python3, pip, conda, etc. all found automatically</text>

  <!-- Cron column -->
  <rect x="421" y="36" width="385" height="216" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="613" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#f85149">Cron Execution Environment</text>
  <line x1="431" y1="62" x2="796" y2="62" stroke="#f85149" stroke-width="1"/>

  <text x="431" y="80"  font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">PATH:</text>
  <text x="477" y="80"  font-family="'Courier New',monospace" font-size="9" fill="#f85149">/usr/bin:/bin</text>
  <text x="477" y="93"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">← /usr/local/bin MISSING!</text>

  <text x="431" y="112" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">USER:</text>
  <text x="477" y="112" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">ravi (same)</text>

  <text x="431" y="128" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">HOME:</text>
  <text x="477" y="128" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">/home/ravi (same — but .bashrc NOT sourced)</text>

  <text x="431" y="144" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">SHELL:</text>
  <text x="479" y="144" font-family="'Courier New',monospace" font-size="9" fill="#f85149">/bin/sh  ← NOT bash! No bash features!</text>

  <text x="431" y="160" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">TERM:</text>
  <text x="477" y="160" font-family="'Courier New',monospace" font-size="9" fill="#f85149">unset  ← no terminal at all</text>

  <text x="431" y="176" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Aliases:</text>
  <text x="483" y="176" font-family="'Courier New',monospace" font-size="9" fill="#f85149">NONE (not loaded)</text>

  <text x="431" y="192" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Functions:</text>
  <text x="487" y="192" font-family="'Courier New',monospace" font-size="9" fill="#f85149">NONE (not loaded)</text>

  <text x="431" y="208" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">virtualenv:</text>
  <text x="489" y="208" font-family="'Courier New',monospace" font-size="9" fill="#f85149">NOT active (must activate explicitly)</text>

  <text x="431" y="224" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">SSH agent:</text>
  <text x="489" y="224" font-family="'Courier New',monospace" font-size="9" fill="#f85149">NOT running</text>

  <text x="613" y="244" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">python3: command not found (if in /usr/local/bin)</text>
</svg>
<p class="diagram-caption">The most reliable fix: <strong>use absolute paths for everything</strong> in cron commands. Run <code>which python3</code>, <code>which node</code>, <code>which conda</code> in your terminal to find the absolute path, then use that path in crontab.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 10 — Diagnosing and fixing cron environment issues</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ STEP 1: SEE CRON'S ACTUAL ENVIRONMENT ══════════════════</span>
<span class="cb-cmt"># Add this entry, check the output file:</span>
<span class="cb-out">* * * * * env > /tmp/cron-env.txt 2>&1</span>
<span class="cb-prompt">$</span> cat /tmp/cron-env.txt
<span class="cb-out">SHELL=/bin/sh</span>
<span class="cb-out">HOME=/home/ravi</span>
<span class="cb-out">LOGNAME=ravi</span>
<span class="cb-out">USER=ravi</span>
<span class="cb-out">PATH=/usr/bin:/bin</span>
<span class="cb-cmt"># Notice: no TERM, no DISPLAY, no SSH_*, no custom vars</span>

<span class="cb-cmt">## ═══ STEP 2: FIND ABSOLUTE PATHS ════════════════════════════</span>
<span class="cb-prompt">$</span> which python3
<span class="cb-out">/usr/local/bin/python3</span>
<span class="cb-prompt">$</span> which node
<span class="cb-out">/usr/local/bin/node</span>
<span class="cb-prompt">$</span> which conda
<span class="cb-out">/opt/miniconda3/bin/conda</span>
<span class="cb-cmt"># Use these exact paths in crontab</span>

<span class="cb-cmt">## ═══ FIX OPTION 1: ABSOLUTE PATHS EVERYWHERE ════════════════</span>
<span class="cb-cmt"># WRONG — relies on PATH that cron doesn't have:</span>
<span class="cb-out">30 2 * * * python3 /opt/etl.py</span>
<span class="cb-cmt"># CORRECT — explicit path:</span>
<span class="cb-out">30 2 * * * /usr/local/bin/python3 /opt/etl.py</span>

<span class="cb-cmt">## ═══ FIX OPTION 2: SOURCE ENVIRONMENT IN WRAPPER SCRIPT ══════</span>
<span class="cb-out">30 2 * * * /opt/etl/run.sh</span>

<span class="cb-cmt"># /opt/etl/run.sh:</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">source /etc/profile.d/conda.sh    # load conda</span>
<span class="cb-out">source /etc/profile                # load system profile</span>
<span class="cb-out">source /home/ravi/.bash_profile   # load user profile</span>
<span class="cb-out">conda activate etl-env             # activate virtualenv</span>
<span class="cb-out">cd /opt/etl || exit 1</span>
<span class="cb-out">exec python3 main.py "$@"</span>

<span class="cb-cmt">## ═══ FIX OPTION 3: SET PATH IN CRONTAB HEADER ═══════════════</span>
<span class="cb-out">SHELL=/bin/bash</span>
<span class="cb-out">PATH=/opt/miniconda3/bin:/usr/local/bin:/usr/bin:/bin</span>
<span class="cb-out">30 2 * * * python3 /opt/etl.py   # now python3 found via PATH</span>

<span class="cb-cmt">## ═══ COMMON CRON FAILURES AND THEIR FIXES ════════════════════</span>
<span class="cb-cmt"># 1. "command not found" → use absolute path or set PATH in crontab
# 2. "permission denied" → check execute bit, check cron.deny/cron.allow
# 3. Script works manually but fails in cron → environment issue
#    Add: source ~/.bash_profile at top of script
# 4. "No such file or directory" → use absolute paths for all files
# 5. Script writes to wrong location → set cd explicitly or use abs paths
# 6. Email floods inbox → add MAILTO="" to crontab header
# 7. Virtual env not active → source activate in wrapper script
# 8. Can't find .env file → use full path to .env in script</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — OUTPUT HANDLING (ANIMATED FLOW)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Output Handling — Logs, Mail, and the Silent Failure Trap</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Cron Output Flow — What Happens to stdout and stderr</text>

  <!-- Cron command box -->
  <rect x="14" y="40" width="160" height="50" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="94" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Cron Job Runs</text>
  <text x="94" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">stdout + stderr</text>

  <!-- Arrow to split -->
  <line x1="174" y1="65" x2="220" y2="65" stroke="#8b949e" stroke-width="1.5" marker-end="url(#cr-arr)"/>

  <!-- Split point -->
  <circle cx="230" cy="65" r="6" fill="#30363d"/>

  <!-- Path 1: No redirect → mail -->
  <path d="M230,59 Q230,40 340,40" fill="none" stroke="#f85149" stroke-width="2" marker-end="url(#cr-red)" class="cr-flow"/>
  <rect x="340" y="28" width="190" height="46" rx="7" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5" class="cr-blink"/>
  <text x="435" y="48" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Mail spool (default!)</text>
  <text x="435" y="64" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">/var/spool/mail/ravi</text>
  <text x="435" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">grows forever! silent!</text>

  <!-- Path 2: redirect stdout → logfile -->
  <path d="M230,65 Q230,80 340,90" fill="none" stroke="#3fb950" stroke-width="2" marker-end="url(#cr-grn)"/>
  <rect x="340" y="78" width="190" height="30" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="435" y="98" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">cmd >> log 2>&amp;1</text>

  <!-- Path 3: suppress all -->
  <path d="M230,71 Q230,130 340,140" fill="none" stroke="#8b949e" stroke-width="1.5" marker-end="url(#cr-arr)"/>
  <rect x="340" y="128" width="190" height="30" rx="7" fill="#1f2027" stroke="#8b949e" stroke-width="1.5"/>
  <text x="435" y="148" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">cmd &gt; /dev/null 2>&amp;1</text>

  <!-- Path 4: MAILTO -->
  <path d="M230,71 Q230,175 340,185" fill="none" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#cr-blu)"/>
  <rect x="340" y="173" width="190" height="30" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="435" y="193" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">MAILTO=ops@company.com</text>

  <!-- Recommended -->
  <rect x="546" y="36" width="260" height="174" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="676" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Recommended Approach</text>
  <text x="556" y="74" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">LOG=/var/log/etl/$(date +%Y%m%d).log</text>
  <text x="556" y="92" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">mkdir -p "$(dirname "$LOG")"</text>
  <text x="556" y="110" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950"># Both stdout and stderr to log:</text>
  <text x="556" y="126" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">cmd &gt;&gt; "$LOG" 2>&amp;1</text>
  <text x="556" y="144" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950"># Or with timestamps:</text>
  <text x="556" y="160" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">cmd 2>&amp;1 | ts '%Y-%m-%d %H:%M:%S'</text>
  <text x="556" y="176" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">    &gt;&gt; "$LOG"</text>
  <text x="556" y="196" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950"># And suppress cron mail:</text>
  <text x="556" y="210" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">MAILTO="" # in crontab header</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 10 — Output handling, log rotation, exit code checking, alerting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ THE GOLDEN RULE: REDIRECT EVERYTHING ════════════════════</span>
<span class="cb-cmt"># Without redirect: output goes to mail spool, error goes there too
# With &gt;&gt; file 2>&1: both stdout and stderr go to log file</span>

<span class="cb-cmt"># Suppress all output (silent job):</span>
<span class="cb-out">30 2 * * * /opt/heartbeat.sh > /dev/null 2>&1</span>

<span class="cb-cmt"># Log everything, append mode:</span>
<span class="cb-out">30 2 * * * /opt/etl.sh >> /var/log/etl.log 2>&1</span>

<span class="cb-cmt"># Daily log file (new file each day):</span>
<span class="cb-out">30 2 * * * /opt/etl.sh >> /var/log/etl/$(date +\%Y-\%m-\%d).log 2>&1</span>
<span class="cb-cmt"># NOTE: % must be escaped as \% inside crontab commands</span>

<span class="cb-cmt">## ═══ TIMESTAMPED LOG OUTPUT ══════════════════════════════════</span>
<span class="cb-cmt"># Method 1: prefix every line with timestamp using ts (moreutils):</span>
<span class="cb-out">30 2 * * * /opt/etl.sh 2>&1 | /usr/bin/ts '\%Y-\%m-\%d \%H:\%M:\%S' >> /var/log/etl.log</span>

<span class="cb-cmt"># Method 2: wrapper script with built-in timestamps:</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">LOG=/var/log/etl/$(date +%Y-%m-%d).log</span>
<span class="cb-out">exec 1>> "$LOG"</span>
<span class="cb-out">exec 2>&1</span>
<span class="cb-out">echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting ETL"</span>
<span class="cb-out">python3 /opt/etl/main.py</span>
<span class="cb-out">RC=$?</span>
<span class="cb-out">echo "[$(date '+%Y-%m-%d %H:%M:%S')] Finished with exit code $RC"</span>
<span class="cb-out">exit $RC</span>

<span class="cb-cmt">## ═══ LOG ROTATION SETUP ══════════════════════════════════════</span>
<span class="cb-cmt"># /etc/logrotate.d/etl:</span>
<span class="cb-out">/var/log/etl/*.log {</span>
<span class="cb-out">    daily</span>
<span class="cb-out">    rotate 30</span>
<span class="cb-out">    compress</span>
<span class="cb-out">    delaycompress</span>
<span class="cb-out">    missingok</span>
<span class="cb-out">    notifempty</span>
<span class="cb-out">}</span>

<span class="cb-cmt">## ═══ EXIT CODE CHECKING AND ALERTING ═════════════════════════</span>
<span class="cb-cmt"># In crontab — wrapper that alerts on failure:</span>
<span class="cb-out">30 2 * * * /opt/etl/run_with_alert.sh</span>

<span class="cb-cmt"># run_with_alert.sh:</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">LOG=/var/log/etl/$(date +%Y-%m-%d).log</span>
<span class="cb-out">START=$(date +%s)</span>
<span class="cb-out"></span>
<span class="cb-out">/usr/local/bin/python3 /opt/etl/main.py >> "$LOG" 2>&1</span>
<span class="cb-out">EXIT_CODE=$?</span>
<span class="cb-out">DURATION=$(( $(date +%s) - START ))</span>
<span class="cb-out"></span>
<span class="cb-out">if (( EXIT_CODE != 0 )); then</span>
<span class="cb-out">    TAIL=$(tail -20 "$LOG")</span>
<span class="cb-out">    curl -s -X POST "https://hooks.slack.com/..." \</span>
<span class="cb-out">        -d "{\"text\":\"ETL FAILED (exit $EXIT_CODE, \${DURATION}s)\n\`\`\`$TAIL\`\`\`\"}"</span>
<span class="cb-out">    # Or: mail -s "ETL FAILED" ops@company.com < "$LOG"</span>
<span class="cb-out">fi</span>
<span class="cb-out">exit "$EXIT_CODE"</span>

<span class="cb-cmt">## ═══ CHECK MAIL SPOOL ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> ls -la /var/spool/mail/
<span class="cb-prompt">$</span> cat /var/spool/mail/$USER     <span class="cb-cmt"># read accumulated cron mail</span>
<span class="cb-prompt">$</span> mail                           <span class="cb-cmt"># interactive mail reader</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — OVERLAP PREVENTION (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Overlap Prevention — When Jobs Run Longer Than Expected</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Job Overlap — Without vs With Lock File Protection</text>

  <!-- Time axis -->
  <line x1="40" y1="46" x2="790" y2="46" stroke="#30363d" stroke-width="1.5"/>
  <text x="40"  y="42" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">00:00</text>
  <text x="265" y="42" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">05:00</text>
  <text x="490" y="42" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">10:00</text>
  <text x="714" y="42" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">15:00</text>

  <!-- Without lock (problem) -->
  <text x="26" y="72" text-anchor="end" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">No lock</text>

  <rect x="40"  y="58" width="340" height="24" rx="4" fill="#2a1414" stroke="#f85149" stroke-width="1.5"/>
  <text x="210" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Job instance 1 (started 00:00, runs 9h)</text>

  <rect x="265" y="58" width="340" height="24" rx="4" fill="#3a1a1a" stroke="#f85149" stroke-width="1.5" class="cr-blink"/>
  <text x="435" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">⚠ Instance 2 started 05:00 — OVERLAP!</text>

  <text x="265" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Both read same source → duplicate rows / corrupted output!</text>

  <!-- With lock (fixed) -->
  <text x="26" y="130" text-anchor="end" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">With lock</text>

  <rect x="40"  y="116" width="340" height="24" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="210" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Instance 1 running — holds lock</text>

  <rect x="265" y="116" width="40" height="24" rx="4" fill="#2a2214" stroke="#ffa657" stroke-width="1.5"/>
  <text x="285" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">2 exits</text>
  <text x="330" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">← instance 2: lock busy → skip/exit cleanly</text>

  <rect x="380" y="116" width="300" height="24" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="2" class="cr-pulse"/>
  <text x="530" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Instance 3 (after 1 finishes): acquires lock, runs</text>

  <!-- Lock file note -->
  <rect x="14" y="154" width="792" height="38" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="170" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Three locking approaches:</text>
  <text x="158" y="170" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">flock -n /tmp/etl.lock CMD</text>
  <text x="338" y="170" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">|</text>
  <text x="350" y="170" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">mkdir /tmp/etl.lock 2>/dev/null &amp;&amp; CMD</text>
  <text x="580" y="170" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">|</text>
  <text x="594" y="170" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">lockfile -1 /tmp/etl.lock</text>
  <text x="26" y="186" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">flock is the most robust — kernel-level advisory lock, released automatically even on crash</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 10 — flock, mkdir lock, PID file patterns, run_once function</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ flock — KERNEL-LEVEL ADVISORY LOCK (recommended) ═══════</span>
<span class="cb-cmt"># -n = non-blocking: exit immediately if lock not available
# -x = exclusive lock (default)
# 9  = file descriptor to use</span>
<span class="cb-out">30 2 * * * flock -n /tmp/etl.lock /opt/etl/daily.sh >> /var/log/etl.log 2>&1</span>

<span class="cb-cmt"># If locked: flock exits with code 1 (silently, no error message by default)
# flock automatically releases lock when process exits (even on crash!)</span>

<span class="cb-cmt"># With timeout (wait up to 10 minutes for lock, then give up):</span>
<span class="cb-out">30 2 * * * flock -w 600 /tmp/etl.lock /opt/etl/daily.sh >> /var/log/etl.log 2>&1</span>

<span class="cb-cmt">## ═══ flock IN WRAPPER SCRIPT (with logging) ══════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">LOCKFILE="/tmp/etl-daily.lock"</span>
<span class="cb-out">LOG="/var/log/etl/$(date +%Y-%m-%d).log"</span>
<span class="cb-out"></span>
<span class="cb-out">exec 9>> "$LOCKFILE"</span>
<span class="cb-out">if ! flock -n 9; then</span>
<span class="cb-out">    echo "[$(date)] Lock busy — previous run still going, skipping" >> "$LOG"</span>
<span class="cb-out">    exit 0</span>
<span class="cb-out">fi</span>
<span class="cb-out">echo "[$(date)] Lock acquired, starting" >> "$LOG"</span>
<span class="cb-out"></span>
<span class="cb-out">/usr/local/bin/python3 /opt/etl/main.py >> "$LOG" 2>&1</span>
<span class="cb-out">RC=$?</span>
<span class="cb-out">echo "[$(date)] Finished (exit $RC)" >> "$LOG"</span>
<span class="cb-out">exit $RC</span>

<span class="cb-cmt">## ═══ PID FILE PATTERN ════════════════════════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">PIDFILE="/var/run/etl.pid"</span>
<span class="cb-out"></span>
<span class="cb-out">if [[ -f "$PIDFILE" ]]; then</span>
<span class="cb-out">    OLD_PID=$(cat "$PIDFILE")</span>
<span class="cb-out">    if kill -0 "$OLD_PID" 2>/dev/null; then</span>
<span class="cb-out">        echo "Already running (PID $OLD_PID)" >&2</span>
<span class="cb-out">        exit 1</span>
<span class="cb-out">    fi</span>
<span class="cb-out">    echo "Stale PID file (PID $OLD_PID gone) — continuing" >&2</span>
<span class="cb-out">fi</span>
<span class="cb-out"></span>
<span class="cb-out">echo $$ > "$PIDFILE"</span>
<span class="cb-out">trap 'rm -f "$PIDFILE"' EXIT</span>
<span class="cb-out">/usr/local/bin/python3 /opt/etl/main.py</span>

<span class="cb-cmt">## ═══ ATOMIC mkdir LOCK (simple, portable) ═══════════════════</span>
<span class="cb-out">LOCKDIR="/tmp/etl-lock.$$"</span>
<span class="cb-out">if ! mkdir "$LOCKDIR" 2>/dev/null; then</span>
<span class="cb-out">    echo "Already running" >&2; exit 1</span>
<span class="cb-out">fi</span>
<span class="cb-out">trap 'rmdir "$LOCKDIR"' EXIT</span>
<span class="cb-cmt"># mkdir is atomic — kernel guarantees only one succeeds</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — DEBUGGING CRON JOBS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Debugging Cron Jobs — A Systematic Approach</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 10 — Debugging: syslog, cron logs, environment testing, dry run</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ STEP 1: CHECK IF CROND IS RUNNING ═══════════════════════</span>
<span class="cb-prompt">$</span> systemctl status cron    <span class="cb-cmt"># Debian/Ubuntu</span>
<span class="cb-prompt">$</span> systemctl status crond   <span class="cb-cmt"># RHEL/CentOS/Fedora</span>
<span class="cb-prompt">$</span> ps aux | grep cron       <span class="cb-cmt"># any distro</span>

<span class="cb-cmt">## ═══ STEP 2: CHECK CRON LOGS ═════════════════════════════════</span>
<span class="cb-prompt">$</span> grep CRON /var/log/syslog | tail -30        <span class="cb-cmt"># Ubuntu/Debian</span>
<span class="cb-prompt">$</span> grep CRON /var/log/cron | tail -30          <span class="cb-cmt"># RHEL/CentOS</span>
<span class="cb-prompt">$</span> journalctl -u cron --since "1 hour ago"    <span class="cb-cmt"># systemd</span>
<span class="cb-prompt">$</span> journalctl -u crond -n 50 -f               <span class="cb-cmt"># follow live</span>

<span class="cb-cmt"># What cron logs show:
# - When each job was started
# - Which user ran it
# - The command that ran
# - NOT the exit code or output (that goes to mail/log)</span>

<span class="cb-out">Jan 15 02:30:00 server CRON[5001]: (ravi) CMD (/opt/etl/daily.sh)</span>
<span class="cb-cmt"># ↑ This confirms cron fired the job at 02:30</span>

<span class="cb-cmt">## ═══ STEP 3: TEST THE EXACT CRON ENVIRONMENT ════════════════</span>
<span class="cb-cmt"># Run your command under the exact same environment cron uses:</span>
<span class="cb-prompt">$</span> sudo -u ravi bash --norc --noprofile -c 'env'    <span class="cb-cmt"># see minimal env</span>
<span class="cb-prompt">$</span> sudo -u ravi bash --norc --noprofile -c 'PATH=/usr/bin:/bin /opt/etl/daily.sh'

<span class="cb-cmt"># Or: use 'run-parts' simulation:</span>
<span class="cb-prompt">$</span> sudo -u ravi sh -c '/opt/etl/daily.sh' 2>&1 | head -20

<span class="cb-cmt">## ═══ STEP 4: VERIFY THE CRONTAB ENTRY ═══════════════════════</span>
<span class="cb-prompt">$</span> crontab -l                   <span class="cb-cmt"># check your crontab</span>
<span class="cb-prompt">$</span> sudo crontab -l -u ravi      <span class="cb-cmt"># check as root</span>
<span class="cb-prompt">$</span> ls -la /var/spool/cron/crontabs/  <span class="cb-cmt"># where crontabs are stored</span>
<span class="cb-prompt">$</span> ls /etc/cron.d/              <span class="cb-cmt"># system-wide cron files</span>
<span class="cb-prompt">$</span> ls /etc/cron.daily/          <span class="cb-cmt"># daily jobs</span>

<span class="cb-cmt">## ═══ STEP 5: USE env -i TO SIMULATE CRON ENVIRONMENT ═════════</span>
<span class="cb-prompt">$</span> env -i HOME=/home/ravi LOGNAME=ravi \
       PATH=/usr/bin:/bin \
       SHELL=/bin/sh \
       /opt/etl/daily.sh
<span class="cb-cmt"># env -i = completely clean environment (no inherited vars)
# This closely mimics what cron provides</span>

<span class="cb-cmt">## ═══ STEP 6: ADD A TEST ENTRY THAT FIRES SOON ═══════════════</span>
<span class="cb-cmt"># Set a job for 1-2 minutes from now, check logs and output:</span>
<span class="cb-prompt">$</span> date       <span class="cb-cmt"># check current time</span>
<span class="cb-out">Mon Jan 15 14:22:33 UTC 2024</span>
<span class="cb-prompt">$</span> crontab -e
<span class="cb-cmt"># Add: 24 14 * * * /opt/etl/daily.sh > /tmp/cron-test.log 2>&1</span>
<span class="cb-cmt"># Wait 2 minutes, then:</span>
<span class="cb-prompt">$</span> cat /tmp/cron-test.log

<span class="cb-cmt">## ═══ STEP 7: CHECK cron.allow / cron.deny ═══════════════════</span>
<span class="cb-prompt">$</span> cat /etc/cron.allow    <span class="cb-cmt"># if exists: only listed users can use cron</span>
<span class="cb-prompt">$</span> cat /etc/cron.deny     <span class="cb-cmt"># if exists: listed users cannot use cron</span>
<span class="cb-cmt"># If cron.allow exists and user not in it → permission denied silently
# If neither exists → all users can use cron</span>

<span class="cb-cmt">## ═══ COMMON DEBUGGING CHECKLIST ══════════════════════════════</span>
<span class="cb-cmt"># □ crond is running (systemctl status cron)
# □ Cron log shows the job fired (grep CRON /var/log/syslog)
# □ Script is executable (chmod +x /opt/etl/daily.sh)
# □ All paths in script are absolute (/usr/bin/python3 not python3)
# □ Script works with env -i (minimal environment test)
# □ Output logged somewhere (not discarded and not in mail spool)
# □ Exit code checked (echo $? after running manually)
# □ No syntax errors in crontab (crontab -e validates on save)
# □ % signs escaped as \% in command field
# □ No trailing spaces after command (some cron implementations)
# □ File ends with newline (some cron implementations require this)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — /etc/cron.d AND SYSTEM CRONTABS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> System Cron — <code>/etc/cron.d</code>, <code>/etc/crontab</code>, <code>run-parts</code></h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Cron Directory Structure — Where All Cron Files Live</text>

  <!-- crond -->
  <rect x="340" y="34" width="140" height="34" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="410" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#3fb950">crond</text>

  <!-- Arrows to files -->
  <line x1="340" y1="51" x2="250" y2="78" stroke="#3fb950" stroke-width="1.5" marker-end="url(#cr-grn)"/>
  <line x1="360" y1="68" x2="280" y2="94" stroke="#3fb950" stroke-width="1.5" marker-end="url(#cr-grn)"/>
  <line x1="410" y1="68" x2="410" y2="88" stroke="#3fb950" stroke-width="1.5" marker-end="url(#cr-grn)"/>
  <line x1="460" y1="68" x2="540" y2="88" stroke="#3fb950" stroke-width="1.5" marker-end="url(#cr-grn)"/>
  <line x1="480" y1="51" x2="580" y2="78" stroke="#3fb950" stroke-width="1.5" marker-end="url(#cr-grn)"/>

  <!-- File boxes -->
  <rect x="14"  y="88" width="200" height="48" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="114" y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#58a6ff">/var/spool/cron/</text>
  <text x="114" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">user crontabs (crontab -e)</text>
  <text x="114" y="135" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">one file per user</text>

  <rect x="226" y="94" width="176" height="42" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="314" y="114" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#bc8cff">/etc/crontab</text>
  <text x="314" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">system crontab + USER field</text>

  <rect x="340" y="88" width="140" height="48" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="410" y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#ffa657">/etc/cron.d/</text>
  <text x="410" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">package cron files</text>
  <text x="410" y="135" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">has USER field like /etc/crontab</text>

  <rect x="492" y="88" width="160" height="48" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="572" y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#3fb950">/etc/cron.{hourly</text>
  <text x="572" y="120" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#3fb950">daily,weekly,monthly}/</text>
  <text x="572" y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">drop scripts here (run-parts)</text>

  <rect x="664" y="88" width="142" height="48" rx="7" fill="#1a1a1a" stroke="#30363d" stroke-width="1.8"/>
  <text x="735" y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#8b949e">/etc/anacrontab</text>
  <text x="735" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">for missed jobs</text>
  <text x="735" y="135" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">(laptops/desktops)</text>

  <!-- Key difference box -->
  <rect x="14" y="148" width="792" height="74" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="166" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Key Format Difference — USER field in system crontabs:</text>
  <text x="26" y="183" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">User crontab (<tspan font-family="'Courier New',monospace">crontab -e</tspan>): 5 time fields + command (6 fields total)</text>
  <text x="26" y="197" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">System crontab (<tspan font-family="'Courier New',monospace">/etc/crontab</tspan>, <tspan font-family="'Courier New',monospace">/etc/cron.d/</tspan>): 5 time fields + USERNAME + command (7 fields total)</text>
  <text x="26" y="213" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">0 2 * * *  root  /usr/bin/certbot renew</text>
  <text x="320" y="213" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">← note "root" username field between time and command</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 10 — /etc/cron.d, /etc/crontab, run-parts, anacron</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ /etc/crontab — SYSTEM CRONTAB ═════════════════════════</span>
<span class="cb-prompt">$</span> cat /etc/crontab
<span class="cb-out">SHELL=/bin/sh</span>
<span class="cb-out">PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin</span>
<span class="cb-out"></span>
<span class="cb-out"># m h  dom mon dow user  command</span>
<span class="cb-out">17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly</span>
<span class="cb-out">25 6    * * *   root    test -x /usr/sbin/anacron || run-parts /etc/cron.daily</span>
<span class="cb-out">47 6    * * 7   root    test -x /usr/sbin/anacron || run-parts /etc/cron.weekly</span>
<span class="cb-out">52 6    1 * *   root    test -x /usr/sbin/anacron || run-parts /etc/cron.monthly</span>
<span class="cb-cmt"># Note: 7th field = username (root), 8th field = command</span>

<span class="cb-cmt">## ═══ /etc/cron.d/ — PACKAGE CRON FILES ══════════════════════</span>
<span class="cb-prompt">$</span> ls /etc/cron.d/
<span class="cb-out">certbot  logrotate  mdadm  postfix  sysstat</span>

<span class="cb-prompt">$</span> cat /etc/cron.d/certbot
<span class="cb-out">SHELL=/bin/sh</span>
<span class="cb-out">PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin</span>
<span class="cb-out">0 */12 * * * root certbot -q renew --no-self-upgrade</span>
<span class="cb-cmt"># Format: MIN HOUR DOM MON DOW  USER  COMMAND</span>
<span class="cb-cmt"># Perfect for: packages that need cron jobs without user crontab</span>

<span class="cb-cmt">## ═══ CREATING YOUR OWN /etc/cron.d/ FILE ════════════════════</span>
<span class="cb-prompt">$</span> sudo tee /etc/cron.d/etl-pipeline << 'EOF'
<span class="cb-out">SHELL=/bin/bash</span>
<span class="cb-out">PATH=/usr/local/bin:/usr/bin:/bin</span>
<span class="cb-out">MAILTO=""</span>
<span class="cb-out"># Daily ETL</span>
<span class="cb-out">30 2 * * *  ravi  /opt/etl/daily.sh >> /var/log/etl/daily.log 2>&1</span>
<span class="cb-out"># Hourly sync</span>
<span class="cb-out">0 * * * *   ravi  /opt/etl/sync.sh >> /var/log/etl/sync.log 2>&1</span>
<span class="cb-out">EOF</span>
<span class="cb-prompt">$</span> sudo chmod 644 /etc/cron.d/etl-pipeline   <span class="cb-cmt"># must be 644 or 600</span>

<span class="cb-cmt">## ═══ /etc/cron.daily/ etc. — DROP SCRIPTS IN ════════════════</span>
<span class="cb-cmt"># Just copy executable scripts here — run-parts runs them:</span>
<span class="cb-prompt">$</span> sudo cp /opt/etl/daily.sh /etc/cron.daily/etl
<span class="cb-prompt">$</span> sudo chmod 755 /etc/cron.daily/etl
<span class="cb-cmt"># IMPORTANT: script must NOT have file extension (.sh breaks run-parts!)
# run-parts skips files with dots in name by default</span>

<span class="cb-cmt">## ═══ run-parts — MANUAL TESTING ══════════════════════════════</span>
<span class="cb-prompt">$</span> run-parts --test /etc/cron.daily     <span class="cb-cmt"># show what would run (dry run)</span>
<span class="cb-prompt">$</span> run-parts /etc/cron.daily            <span class="cb-cmt"># actually run all daily jobs now</span>
<span class="cb-prompt">$</span> run-parts --report /etc/cron.daily   <span class="cb-cmt"># run + report which scripts ran</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — at AND batch
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>at</code> &amp; <code>batch</code> — One-Time Scheduled Execution</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 10 — at, batch, atq, atrm: one-time and load-based scheduling</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ at — SCHEDULE A ONE-TIME JOB ═══════════════════════════</span>
<span class="cb-cmt"># at reads the command from stdin</span>
<span class="cb-prompt">$</span> at 02:30                         <span class="cb-cmt"># today at 02:30 AM</span>
<span class="cb-out">at> /opt/etl/nightly.sh >> /var/log/nightly.log 2>&1</span>
<span class="cb-out">at> <EOT>                           # Ctrl+D to finish</span>
<span class="cb-out">job 1 at Mon Jan 15 02:30:00 2024</span>

<span class="cb-prompt">$</span> echo "/opt/cleanup.sh" | at 23:00           <span class="cb-cmt"># pipe command</span>
<span class="cb-prompt">$</span> at midnight                                   <span class="cb-cmt"># natural language time</span>
<span class="cb-prompt">$</span> at noon tomorrow                              <span class="cb-cmt"># tomorrow at noon</span>
<span class="cb-prompt">$</span> at 14:00 next monday                          <span class="cb-cmt"># next Monday 2pm</span>
<span class="cb-prompt">$</span> at now + 30 minutes                           <span class="cb-cmt"># 30 minutes from now</span>
<span class="cb-prompt">$</span> at now + 2 hours                              <span class="cb-cmt"># 2 hours from now</span>
<span class="cb-prompt">$</span> at 02:00 Jan 20 2025                          <span class="cb-cmt"># specific date</span>
<span class="cb-prompt">$</span> at -f /opt/etl/nightly.sh now + 1 hour       <span class="cb-cmt"># -f: read from file</span>

<span class="cb-cmt">## ═══ atq AND atrm — MANAGE QUEUED JOBS ══════════════════════</span>
<span class="cb-prompt">$</span> atq                               <span class="cb-cmt"># list pending at jobs</span>
<span class="cb-out">1       Mon Jan 15 02:30:00 2024 a ravi</span>
<span class="cb-out">2       Mon Jan 15 23:00:00 2024 a ravi</span>
<span class="cb-cmt"># job_id  date/time  queue_letter  user</span>

<span class="cb-prompt">$</span> at -l                             <span class="cb-cmt"># same as atq</span>
<span class="cb-prompt">$</span> atrm 1                            <span class="cb-cmt"># remove job 1</span>
<span class="cb-prompt">$</span> at -d 1                           <span class="cb-cmt"># same as atrm</span>
<span class="cb-prompt">$</span> at -c 1                           <span class="cb-cmt"># show the commands in job 1</span>

<span class="cb-cmt">## ═══ batch — RUN WHEN SYSTEM LOAD ALLOWS ════════════════════</span>
<span class="cb-cmt"># batch is like 'at now' but waits until load average < 1.5</span>
<span class="cb-prompt">$</span> echo "/opt/heavy_process.sh" | batch
<span class="cb-out">job 3 at Mon Jan 15 14:22:00 2024</span>
<span class="cb-cmt"># Job queued but will only start when load is low enough
# Useful for non-urgent heavy tasks that shouldn't impact production</span>

<span class="cb-cmt">## ═══ USE CASES FOR at ════════════════════════════════════════</span>
<span class="cb-cmt"># One-time jobs (DB migration after deployment):
at now + 10 minutes <<'EOF'
/usr/bin/psql -d prod -f /opt/migrations/add_index.sql
EOF

# Maintenance window:
at 02:00 "Sun Jan 20" <<'EOF'
systemctl stop nginx
apt-get upgrade -y
systemctl start nginx
EOF

# Cancel a deployment 30 minutes after launch if something goes wrong:
echo "ansible-playbook rollback.yml" | at now + 30 minutes</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — anacron
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>anacron</code> — Scheduling for Systems That Aren't Always On</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">cron vs anacron — When the Server Goes Down</text>

  <!-- Timeline -->
  <line x1="40" y1="56" x2="790" y2="56" stroke="#30363d" stroke-width="1.5"/>
  <text x="40"  y="50" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">Mon</text>
  <text x="190" y="50" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">Tue</text>
  <text x="340" y="50" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">Wed</text>
  <text x="490" y="50" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">Thu</text>
  <text x="640" y="50" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">Fri</text>

  <!-- Server down Tue-Thu -->
  <rect x="190" y="44" width="300" height="24" rx="3" fill="#2a1414" stroke="#f85149" stroke-width="1"/>
  <text x="340" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">SERVER DOWN (Tue-Thu)</text>

  <!-- cron behavior -->
  <text x="26" y="84" text-anchor="end" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">cron</text>
  <circle cx="40"  cy="80" r="5" fill="#3fb950"/>
  <text x="40"  cy="96" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950" text-anchor="middle">Mon ✅</text>
  <text x="340" y="92" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Tue ❌  Wed ❌  Thu ❌ (MISSED — never runs)</text>
  <circle cx="640" cy="80" r="5" fill="#3fb950"/>
  <text x="640" y="96" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">Fri ✅</text>

  <!-- anacron behavior -->
  <text x="26" y="120" text-anchor="end" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">anacron</text>
  <circle cx="40"  cy="116" r="5" fill="#3fb950"/>
  <text x="40"  y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">Mon ✅</text>
  <text x="340" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">missed (down)</text>
  <circle cx="660" cy="116" r="5" fill="#3fb950" class="cr-blink"/>
  <text x="680" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Fri: runs missed jobs on restart!</text>

  <!-- Note -->
  <rect x="14" y="144" width="792" height="28" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="26" y="158" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">anacron tracks last-run timestamps in <tspan font-family="'Courier New',monospace">/var/spool/anacron/</tspan>.  On startup: if job missed, run it (after random delay). Perfect for laptops, desktops, and servers that reboot.</text>
  <text x="26" y="170" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Configuration: <tspan font-family="'Courier New',monospace">/etc/anacrontab</tspan> — Period (days), Delay (minutes), Job-identifier, Command</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 10 — anacron, /etc/anacrontab, systemd timers vs cron</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ /etc/anacrontab FORMAT ════════════════════════════════</span>
<span class="cb-prompt">$</span> cat /etc/anacrontab
<span class="cb-out"># period-in-days  delay-in-minutes  job-id    command</span>
<span class="cb-out">1                  5                 cron.daily    run-parts /etc/cron.daily</span>
<span class="cb-out">7                  10                cron.weekly   run-parts /etc/cron.weekly</span>
<span class="cb-out">@monthly           15                cron.monthly  run-parts /etc/cron.monthly</span>
<span class="cb-cmt"># period: 1=daily  7=weekly  30=monthly  @monthly
# delay: minutes to wait after system boot before running
# job-id: unique identifier (used for /var/spool/anacron/ID timestamp file)</span>

<span class="cb-cmt"># Add your own:</span>
<span class="cb-out">2                  20   etl-daily   /opt/etl/daily.sh >> /var/log/etl.log 2>&1</span>

<span class="cb-cmt">## ═══ systemd TIMERS — MODERN ALTERNATIVE ════════════════════</span>
<span class="cb-cmt"># Create /etc/systemd/system/etl-daily.service:</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=Daily ETL Pipeline</span>
<span class="cb-out">After=network.target postgresql.service</span>
<span class="cb-out"></span>
<span class="cb-out">[Service]</span>
<span class="cb-out">Type=oneshot</span>
<span class="cb-out">User=ravi</span>
<span class="cb-out">ExecStart=/usr/local/bin/python3 /opt/etl/main.py</span>
<span class="cb-out">StandardOutput=append:/var/log/etl/daily.log</span>
<span class="cb-out">StandardError=append:/var/log/etl/daily.log</span>
<span class="cb-out">Environment=PATH=/usr/local/bin:/usr/bin:/bin</span>

<span class="cb-cmt"># Create /etc/systemd/system/etl-daily.timer:</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=Run ETL daily at 02:30</span>
<span class="cb-out"></span>
<span class="cb-out">[Timer]</span>
<span class="cb-out">OnCalendar=*-*-* 02:30:00</span>
<span class="cb-out">Persistent=true</span>         <span class="cb-cmt"># run missed jobs on next boot (like anacron!)</span>
<span class="cb-out">RandomizedDelaySec=5min  </span><span class="cb-cmt"># avoid thundering herd on shared systems</span>
<span class="cb-out"></span>
<span class="cb-out">[Install]</span>
<span class="cb-out">WantedBy=timers.target</span>

<span class="cb-cmt"># Enable and start:</span>
<span class="cb-prompt">$</span> sudo systemctl daemon-reload
<span class="cb-prompt">$</span> sudo systemctl enable --now etl-daily.timer
<span class="cb-prompt">$</span> systemctl list-timers --all     <span class="cb-cmt"># list all timers and next trigger</span>
<span class="cb-prompt">$</span> systemctl status etl-daily.timer
<span class="cb-prompt">$</span> journalctl -u etl-daily.service  <span class="cb-cmt"># view logs</span>

<span class="cb-cmt">## ═══ SYSTEMD ONCALENDAR SYNTAX ════════════════════════════</span>
<span class="cb-out">OnCalendar=daily              # every day at midnight</span>
<span class="cb-out">OnCalendar=weekly             # every week</span>
<span class="cb-out">OnCalendar=Mon *-*-* 08:00:00 # Monday 08:00 every week</span>
<span class="cb-out">OnCalendar=*-*-* 02:30:00     # every day at 02:30</span>
<span class="cb-out">OnCalendar=*-*-* *:00:00      # every hour on the hour</span>
<span class="cb-out">OnCalendar=*-*-* *:*/15:00    # every 15 minutes</span>
<span class="cb-out">OnCalendar=Mon..Fri *-*-* 09:00:00  # weekdays at 09:00</span>
<span class="cb-out">OnCalendar=*-1,4,7,10-01 00:00:00   # quarterly</span>

<span class="cb-cmt">## ═══ CRON vs SYSTEMD TIMERS COMPARISON ══════════════════════</span>
<span class="cb-cmt"># cron:
#   + universally available, well-understood
#   + simple syntax for common patterns
#   - no dependency tracking (can't wait for network)
#   - poor logging (mail or nothing)
#   - no retry on failure
#   - environment setup is tricky
#
# systemd timers:
#   + full service dependencies (After=postgresql.service)
#   + proper logging via journald
#   + Persistent=true for missed jobs
#   + RandomizedDelaySec to avoid stampedes
#   + OnBootSec for "N minutes after boot"
#   + more complex to set up</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — How crond Works Internally</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ crond Algorithm, Setuid Execution, Crontab Watching, and Edge Cases</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. CROND MAIN LOOP (vixie-cron algorithm)

   Every minute crond wakes up and:
   1. Check wall clock: read current time (minute, hour, dom, month, dow)
   2. For each loaded crontab (user + system):
      For each entry:
        if all 5 fields match current time → fork() + exec() the command
   3. Sleep until the start of the next minute
   
   Precision: crond uses sleep/alarm to wake at minute boundaries.
   It is NOT perfectly precise — may fire up to a few seconds late.
   For sub-second precision, don't use cron.

2. WATCHING FOR CRONTAB CHANGES

   Traditional vixie-cron:
   - Polls /var/spool/cron/ and /etc/crontab every minute
   - Compares mtime (modification time) of each file
   - If changed: reload that crontab without restart
   
   Modern cron (systemd-based):
   - Uses inotify watches on the cron spool directories
   - Reloads crontab as soon as it's modified (via crontab -e)
   
   crontab -e:
   - Copies crontab to a temp file, opens in EDITOR
   - On save: validates syntax, copies to /var/spool/cron/crontabs/username
   - crond picks it up within seconds (inotify) or at next minute (poll)

3. EXECUTION MODEL

   When a job fires:
   1. crond calls fork() → child process
   2. Child sets up environment:
      - setuid(uid) → run as the crontab owner
      - setgid(gid) → run as user's primary group  
      - Sets HOME, SHELL, LOGNAME, PATH (from crontab or defaults)
      - Opens /dev/null for stdin
      - Sets up output pipe (or /dev/null if MAILTO="")
   3. Child calls execve(SHELL, [SHELL, "-c", command], env)
   4. Default SHELL=/bin/sh (NOT bash!) unless set in crontab
   
   Output handling:
   - crond reads stdout and stderr from child via pipe
   - If output non-empty AND MAILTO not "":
     sends mail to user (or MAILTO address) via sendmail
   - If MAILTO="" or no sendmail: output discarded

4. MAIL SYSTEM DEPENDENCY

   cron depends on a working mail system for output delivery.
   If sendmail/postfix/exim is not installed:
   - cron jobs still run
   - output silently discarded (even without MAILTO="")
   
   Best practice: always redirect to file:
     command >> /var/log/myservice.log 2>&1
   And set MAILTO="" in crontab to suppress mail entirely.

5. CRON vs KERNEL CLOCKS

   crond uses the system clock (CLOCK_REALTIME).
   Affected by:
   - NTP adjustments: clock may jump forward/backward
   - Daylight saving time: clock jumps 1 hour
   - VM clock drift: guest clock may lag host
   
   DST handling:
   - Spring forward (02:00 → 03:00): jobs at 02:00-02:59 SKIP
   - Fall back (02:00 → 01:00): jobs at 01:00-01:59 run TWICE
   - Workaround: schedule critical jobs at non-DST-affected hours (e.g., 03:00, 04:00)

6. DOM+DOW OR LOGIC (POSIX requirement)

   When BOTH dom AND dow fields are non-wildcard (*):
   POSIX requires: fire when dom matches OR dow matches.
   
   Example: 0 0 15 * 1
   = "midnight on the 15th" OR "midnight on Monday"
   NOT "midnight on Mondays that are the 15th"
   
   To get AND behaviour:
   0 0 15 * 1 [ $(date +%d) = 15 ] && command
   (test inside the command whether it's actually the 15th)
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Scheduling Patterns — Data Engineering</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 10 — Complete production crontabs and wrapper scripts</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PRODUCTION DATA PIPELINE CRONTAB ═══════════════════════</span>
<span class="cb-out">SHELL=/bin/bash</span>
<span class="cb-out">PATH=/usr/local/bin:/opt/conda/bin:/usr/bin:/bin</span>
<span class="cb-out">MAILTO=""</span>
<span class="cb-out">HOME=/home/ravi</span>
<span class="cb-out"></span>
<span class="cb-out"># ─── CONTINUOUS JOBS ──────────────────────────────────────────</span>
<span class="cb-out">*/5  * * * *  flock -n /tmp/heartbeat.lock /opt/etl/heartbeat.sh    >> /var/log/etl/heartbeat.log 2>&1</span>
<span class="cb-out">0    * * * *  flock -n /tmp/hourly.lock    /opt/etl/hourly_sync.sh  >> /var/log/etl/hourly.log    2>&1</span>
<span class="cb-out"></span>
<span class="cb-out"># ─── DAILY PIPELINE ───────────────────────────────────────────</span>
<span class="cb-out">0    1 * * *  /opt/etl/cleanup_old_data.sh >> /var/log/etl/cleanup.log  2>&1</span>
<span class="cb-out">30   2 * * *  flock -n /tmp/daily.lock     /opt/etl/daily_pipeline.sh >> /var/log/etl/daily.log    2>&1</span>
<span class="cb-out">0    5 * * *  /opt/etl/validate_daily.sh   >> /var/log/etl/validate.log 2>&1</span>
<span class="cb-out"></span>
<span class="cb-out"># ─── WEEKLY / MONTHLY ─────────────────────────────────────────</span>
<span class="cb-out">0    3 * * 0  /opt/etl/weekly_aggregate.sh >> /var/log/etl/weekly.log  2>&1</span>
<span class="cb-out">0    4 1 * *  /opt/etl/monthly_report.sh   >> /var/log/etl/monthly.log 2>&1</span>
<span class="cb-out"></span>
<span class="cb-out"># ─── MAINTENANCE ──────────────────────────────────────────────</span>
<span class="cb-out">0   23 * * *  /usr/sbin/logrotate /etc/logrotate.d/etl</span>
<span class="cb-out">30  23 0 * *  find /tmp -name "*.lock" -mtime +1 -delete</span>

<span class="cb-cmt">## ═══ COMPLETE WRAPPER SCRIPT TEMPLATE ════════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out"># /opt/etl/daily_pipeline.sh — Production-safe cron wrapper</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out"></span>
<span class="cb-out">SCRIPT_NAME=$(basename "$0")</span>
<span class="cb-out">LOG_DIR="/var/log/etl"</span>
<span class="cb-out">LOG="\${LOG_DIR}/$(date +%Y-%m-%d)-\${SCRIPT_NAME%.sh}.log"</span>
<span class="cb-out">LOCKFILE="/tmp/\${SCRIPT_NAME%.sh}.lock"</span>
<span class="cb-out">SLACK_WEBHOOK="\${SLACK_WEBHOOK_URL:-}"</span>
<span class="cb-out">START_TIME=$(date +%s)</span>
<span class="cb-out"></span>
<span class="cb-out">mkdir -p "$LOG_DIR"</span>
<span class="cb-out">exec 1>> "$LOG"</span>
<span class="cb-out">exec 2>&1</span>
<span class="cb-out">echo "=== $(date '+%Y-%m-%d %H:%M:%S') START ==="</span>
<span class="cb-out"></span>
<span class="cb-out">cleanup() {</span>
<span class="cb-out">    local RC=\${1:-$?}</span>
<span class="cb-out">    local DURATION=$(( $(date +%s) - START_TIME ))</span>
<span class="cb-out">    echo "=== $(date '+%Y-%m-%d %H:%M:%S') END (exit=$RC, duration=\${DURATION}s) ==="</span>
<span class="cb-out">    if (( RC != 0 )) && [[ -n "$SLACK_WEBHOOK" ]]; then</span>
<span class="cb-out">        curl -s -X POST "$SLACK_WEBHOOK" \</span>
<span class="cb-out">            -H "Content-Type: application/json" \</span>
<span class="cb-out">            -d "{\"text\":\"❌ $SCRIPT_NAME FAILED (exit $RC, \${DURATION}s)\nLog: $LOG\"}"</span>
<span class="cb-out">    fi</span>
<span class="cb-out">    exit "$RC"</span>
<span class="cb-out">}</span>
<span class="cb-out">trap 'cleanup $?' EXIT</span>
<span class="cb-out"></span>
<span class="cb-out">exec 9>> "$LOCKFILE"</span>
<span class="cb-out">if ! flock -n 9; then</span>
<span class="cb-out">    echo "$(date): Already running — skipping"</span>
<span class="cb-out">    exit 0</span>
<span class="cb-out">fi</span>
<span class="cb-out"></span>
<span class="cb-out"># === ACTUAL WORK ===</span>
<span class="cb-out">echo "$(date): Extracting data..."</span>
<span class="cb-out">/usr/local/bin/python3 /opt/etl/extract.py</span>
<span class="cb-out">echo "$(date): Transforming..."</span>
<span class="cb-out">/usr/local/bin/python3 /opt/etl/transform.py</span>
<span class="cb-out">echo "$(date): Loading..."</span>
<span class="cb-out">/usr/local/bin/python3 /opt/etl/load.py</span>
<span class="cb-out">echo "$(date): Pipeline complete"</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — Cron &amp; Scheduling</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:26%">Syntax / Command</th><th>Meaning</th><th style="width:25%">Example</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Crontab Field Operators</td></tr>
<tr><td style="font-family:monospace;">*</td><td>Every value in this field</td><td><code>* * * * *</code> = every minute</td></tr>
<tr><td style="font-family:monospace;">a-b</td><td>Range from a to b (inclusive)</td><td><code>1-5</code> in DOW = Mon to Fri</td></tr>
<tr><td style="font-family:monospace;">a,b,c</td><td>List: match any of these values</td><td><code>0,6</code> in DOW = Sun and Sat</td></tr>
<tr><td style="font-family:monospace;">*/n</td><td>Every nth value (step)</td><td><code>*/15</code> in MIN = :00 :15 :30 :45</td></tr>
<tr><td style="font-family:monospace;">a-b/n</td><td>Range with step</td><td><code>8-18/2</code> in HOUR = every 2h from 8-18</td></tr>
<tr><td colspan="3" style="background:#2a1a14;color:#f85149;font-weight:bold;font-family:'Segoe UI',sans-serif;">Special Strings</td></tr>
<tr><td style="font-family:monospace;">@reboot</td><td>Once at crond startup</td><td>No 5-field equivalent</td></tr>
<tr><td style="font-family:monospace;">@hourly</td><td>Every hour (at :00)</td><td><code>0 * * * *</code></td></tr>
<tr><td style="font-family:monospace;">@daily / @midnight</td><td>Every day at midnight</td><td><code>0 0 * * *</code></td></tr>
<tr><td style="font-family:monospace;">@weekly</td><td>Every week (Sunday midnight)</td><td><code>0 0 * * 0</code></td></tr>
<tr><td style="font-family:monospace;">@monthly</td><td>Every month (1st at midnight)</td><td><code>0 0 1 * *</code></td></tr>
<tr><td style="font-family:monospace;">@yearly / @annually</td><td>Every year (Jan 1 midnight)</td><td><code>0 0 1 1 *</code></td></tr>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Crontab Environment Variables</td></tr>
<tr><td style="font-family:monospace;">SHELL=</td><td>Shell to run commands (default: /bin/sh)</td><td><code>SHELL=/bin/bash</code></td></tr>
<tr><td style="font-family:monospace;">PATH=</td><td>Command search path (very minimal by default)</td><td>Add <code>/usr/local/bin</code></td></tr>
<tr><td style="font-family:monospace;">MAILTO=</td><td>Where to send output (empty = discard)</td><td><code>MAILTO=""</code> to suppress</td></tr>
<tr><td style="font-family:monospace;">HOME=</td><td>Working directory for jobs</td><td><code>HOME=/opt/etl</code></td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">crontab Commands</td></tr>
<tr><td style="font-family:monospace;">crontab -e</td><td>Edit user crontab (validates syntax on save)</td><td>EDITOR=nano crontab -e</td></tr>
<tr><td style="font-family:monospace;">crontab -l</td><td>List current user's crontab</td><td>Backup: crontab -l &gt; backup</td></tr>
<tr><td style="font-family:monospace;">crontab -r</td><td>Remove crontab (irreversible!)</td><td>Backup first!</td></tr>
<tr><td style="font-family:monospace;">crontab -u USER</td><td>Operate on another user's crontab (root)</td><td><code>sudo crontab -l -u ravi</code></td></tr>
<tr><td colspan="3" style="background:#1f1428;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">at Commands</td></tr>
<tr><td style="font-family:monospace;">at TIME</td><td>Schedule one-time job (stdin)</td><td><code>at now + 2 hours</code></td></tr>
<tr><td style="font-family:monospace;">at -f FILE TIME</td><td>Run file at specified time</td><td><code>at -f script.sh 02:00</code></td></tr>
<tr><td style="font-family:monospace;">atq</td><td>List pending at jobs</td><td>Shows job ID, time, user</td></tr>
<tr><td style="font-family:monospace;">atrm N</td><td>Remove at job number N</td><td><code>atrm 3</code></td></tr>
<tr><td colspan="3" style="background:#1a1a1a;color:#8b949e;font-weight:bold;font-family:'Segoe UI',sans-serif;">Best Practices (Quick Reference)</td></tr>
<tr><td style="font-family:monospace;">Absolute paths</td><td>Use full paths for all commands and files</td><td>/usr/local/bin/python3, not python3</td></tr>
<tr><td style="font-family:monospace;">Redirect output</td><td>Always log stdout and stderr</td><td><code>cmd &gt;&gt; log 2&gt;&amp;1</code></td></tr>
<tr><td style="font-family:monospace;">MAILTO=""</td><td>Suppress mail output</td><td>Set at top of crontab</td></tr>
<tr><td style="font-family:monospace;">flock -n LOCK CMD</td><td>Prevent overlapping runs</td><td><code>flock -n /tmp/job.lock CMD</code></td></tr>
<tr><td style="font-family:monospace;">Escape % in cmd</td><td>% is newline in crontab — escape as \%</td><td><code>date +\%Y-\%m-\%d</code></td></tr>
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
    <h4>Exercise 1 — Cron Expression Mastery</h4>
    <p>Write crontab entries for these schedules (provide the exact 5-field expression):</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Every 10 minutes</li>
      <li>Daily at 03:45 AM</li>
      <li>Every Monday, Wednesday, and Friday at 09:00</li>
      <li>The 1st of every month at midnight and the 15th of every month at midnight (two entries OR one entry using list)</li>
      <li>Every hour from 06:00 to 22:00 on weekdays</li>
      <li>Every 30 minutes between 08:00 and 18:00</li>
      <li>The last day of each month at 23:00 (requires a workaround — explain why)</li>
      <li>Explain why <code>0 0 29 2 *</code> is dangerous for monthly reporting</li>
      <li>Convert these 5-field expressions to special strings where possible: <code>0 0 * * *</code>, <code>0 * * * *</code>, <code>0 0 1 * *</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Environment Setup and Debugging</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Add a crontab entry that captures cron's environment to <code>/tmp/cron-env.txt</code>. Compare it with <code>env</code> in your interactive shell. List 5 differences.</li>
      <li>Write a cron entry that runs <code>python3 script.py</code> — but fix it to use the correct approach (find the absolute path of python3 and use it)</li>
      <li>Write the 4 MAILTO examples: suppress all mail, send to one email, send to multiple emails, send only on failure</li>
      <li>Your script uses a conda virtualenv at <code>/opt/conda/envs/etl/</code>. Write the PATH line in crontab that makes python3 and conda available.</li>
      <li>Write a crontab entry that logs to a dated log file (e.g. <code>/var/log/etl/2024-01-15.log</code>). Remember: % must be escaped in crontab.</li>
      <li>Simulate the cron environment using <code>env -i</code> and test your script in it</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Production-Safe Cron Wrapper</h4>
    <p>Write <code>cron_wrapper.sh</code> that wraps any cron job safely:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Accept the command to run as arguments: <code>cron_wrapper.sh python3 /opt/etl/main.py</code></li>
      <li>Create a dated log file: <code>/var/log/cron_wrapper/YYYY-MM-DD_HH:MM_CMD.log</code></li>
      <li>Redirect all output (stdout+stderr) to log with timestamps on each line</li>
      <li>Use <code>flock</code> to prevent overlapping runs (lock name based on command name)</li>
      <li>Check exit code: on failure, write the last 50 lines of the log to an alert file</li>
      <li>Track run duration and log it at the end</li>
      <li>If SLACK_WEBHOOK env var is set, post a failure notification with duration and last 10 log lines</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Complete Scheduling Setup</h4>
    <p>Set up a complete scheduling system for a data pipeline:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Write a crontab with proper SHELL, PATH, MAILTO, HOME header</li>
      <li>Schedule: extract (every hour on weekdays), transform (daily 02:00), load (daily 03:00), validate (daily 04:00), weekly report (Sunday 05:00), monthly archive (1st of month 06:00)</li>
      <li>Add flock to all jobs that might overlap. Use different lock files for each</li>
      <li>All output goes to dated log files. Log directory structure: <code>/var/log/pipeline/YYYY-MM-DD/JOBNAME.log</code></li>
      <li>Create a <code>/etc/cron.d/</code> file version of the same crontab with the USERNAME field</li>
      <li>Write a <code>check_pipeline.sh</code> script that checks all log files from the last 24h and reports any failures</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Complete Pipeline Scheduler</h4>
    <p>Build a comprehensive scheduling solution:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Crontab generator:</strong> Write a script that generates a properly-formed crontab from a YAML config file. Config specifies: schedule (cron expression or special string), command, log path, lock file, timeout, alert webhook.</li>
      <li><strong>Universal wrapper:</strong> Generate the wrapper script for each job that: handles environment setup, acquires lock, runs with timeout, captures output with timestamps, checks exit code, sends alerts, rotates logs weekly.</li>
      <li><strong>Health check:</strong> Write a separate cron job (runs every 15 minutes) that monitors all other scheduled jobs: checks if expected log files were created, checks if any job is running longer than its expected duration (via PID file), sends an alert if a daily job's log is missing by 06:00.</li>
      <li><strong>Recovery:</strong> For each job, write a <code>--replay DATE</code> mode that replays a missed job for a specific date, with a different lock file to allow replay while current job runs.</li>
      <li><strong>Systemd equivalent:</strong> For the most critical job, write the equivalent systemd .service and .timer files with Persistent=true, proper dependencies, and journald logging.</li>
    </ol>
    <p><strong>Must work correctly when: NFS is slow, log directory doesn't exist yet, two cron servers run the same crontab (HA setup), system time changes due to NTP.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Zero Silent Failures — Day 385</div>
    <p>Three months after the four-days-of-missing-data incident, Ravi's pipeline had zero silent failures. Every cron job now had four components: an environment header at the top of the crontab, a flock command to prevent overlaps, output redirected to a dated log file, and a wrapper that posted to Slack on failure.</p>
    <p>The Slack webhook had fired twice. Once was real — a database was unreachable and the load step failed. Once was a false positive — a script ran 2 minutes over its expected time and the monitoring job flagged it. Both times, the notification arrived before anyone noticed anything wrong. Both times, the fix was applied before any downstream system was affected.</p>
    <p>"Cron is not magic," Ravi told a new teammate who was struggling. "It's one of the oldest tools in Unix. It's also one of the most reliable ones — as long as you understand three things: the environment is minimal and different from your shell, output goes to a mail spool nobody reads unless you redirect it, and it has no idea whether the last run succeeded or how long it took. Those three gaps are why cron jobs fail silently. Fill those gaps with explicit environment, log files, and exit code checks — and cron becomes incredibly reliable."</p>
    <p><strong>The schedule is the easy part. Getting the environment right is the skill.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};