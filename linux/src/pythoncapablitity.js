var title = "";
var pText = "";
var padding = "";
var i = 1;
var max = 1;
var cbody = "";

const capabilitiesContent = 
 {
    title: "Python + Linux Power: Capabilities Unleashed",
    description: "Master Linux capabilities to run Python tools with surgical privileges — no root required. Essential for secure ML infrastructure.",
    content: `

<div class="module-container">

<!-- ============================================================
     HERO / RAVI HOOK
     ============================================================ -->
<div class="story-panel">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">${title}</div>
    <p>${pText}</p>
  </div>
</div>

<!-- ============================================================
     SECTION 1 — WHY CAPABILITIES EXIST
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    Traditional Unix has a brutal binary: a process is either <strong>root (UID 0)</strong>
    — omnipotent — or a normal user with almost no elevated privilege. This is the
    <em>all-or-nothing</em> problem. If your web server needs to bind to port 80, it
    needs root — and suddenly it can also rewrite <code>/etc/passwd</code>, load kernel
    modules, and do anything else.
  </p>
  <p>
    Linux Capabilities, introduced in kernel 2.2 and refined in POSIX.1e, decompose the
    root privilege into <strong>~40 distinct units</strong>. Each capability governs a
    specific privileged action. A process can hold exactly the capabilities it needs and
    nothing more — the <em>principle of least privilege</em> in practice.
  </p>

  <!-- SVG 1 — Root monolith vs capability decomposition -->
  <div class="svg-container">
    <svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" class="cap-svg1" aria-label="Root monolith vs capabilities model">
      <defs>
        <style>
          .cap-svg1 { font-family: 'Fira Mono', monospace; }
          @keyframes cap-fade { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
          .cf1{animation:cap-fade 0.5s 0.1s both}
          .cf2{animation:cap-fade 0.5s 0.3s both}
          .cf3{animation:cap-fade 0.5s 0.5s both}
          .cf4{animation:cap-fade 0.5s 0.7s both}
          .cf5{animation:cap-fade 0.5s 0.9s both}
          .cf6{animation:cap-fade 0.5s 1.1s both}
          .cf7{animation:cap-fade 0.5s 1.3s both}
          @keyframes cap-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
          .danger-pulse { animation: cap-pulse 2s infinite; }
        </style>
      </defs>
      <!-- Left: root monolith -->
      <rect x="20" y="20" width="300" height="320" rx="12" fill="#2e1a1a" stroke="#e94560" stroke-width="2" class="cf1"/>
      <text x="170" y="48" fill="#e94560" font-size="13" text-anchor="middle" font-weight="bold" class="cf1">☠ ROOT (UID 0) — All or Nothing</text>
      <rect x="36" y="58" width="268" height="26" rx="4" fill="#3a1515" class="cf2"/>
      <text x="50" y="76" fill="#ff6b9d" font-size="10" class="cf2">bind ports &lt; 1024</text>
      <rect x="36" y="90" width="268" height="26" rx="4" fill="#3a1515" class="cf3"/>
      <text x="50" y="108" fill="#ff6b9d" font-size="10" class="cf3">load kernel modules</text>
      <rect x="36" y="122" width="268" height="26" rx="4" fill="#3a1515" class="cf4"/>
      <text x="50" y="140" fill="#ff6b9d" font-size="10" class="cf4">raw socket access</text>
      <rect x="36" y="154" width="268" height="26" rx="4" fill="#3a1515" class="cf5"/>
      <text x="50" y="172" fill="#ff6b9d" font-size="10" class="cf5">change any file ownership</text>
      <rect x="36" y="186" width="268" height="26" rx="4" fill="#3a1515" class="cf6"/>
      <text x="50" y="204" fill="#ff6b9d" font-size="10" class="cf6">bypass all file permissions</text>
      <rect x="36" y="218" width="268" height="26" rx="4" fill="#3a1515" class="cf7"/>
      <text x="50" y="236" fill="#ff6b9d" font-size="10" class="cf7">kill any process</text>
      <text x="36" y="272" fill="#ffeaa7" font-size="10" class="cf7">+ 34 more dangerous powers...</text>
      <text x="170" y="308" fill="#e94560" font-size="22" text-anchor="middle" class="danger-pulse">⚠ ONE COMPROMISE = TOTAL SYSTEM LOSS</text>

      <!-- Right: capabilities -->
      <rect x="360" y="20" width="420" height="320" rx="12" fill="#1a2e1a" stroke="#00b894" stroke-width="2" class="cf1"/>
      <text x="570" y="48" fill="#00b894" font-size="13" text-anchor="middle" font-weight="bold" class="cf1">✅ Capabilities — Surgical Privileges</text>
      <!-- cap boxes in grid -->
      <rect x="376" y="60" width="180" height="34" rx="5" fill="#162916" stroke="#00b894" stroke-width="1" class="cf2"/>
      <text x="386" y="74" fill="#55efc4" font-size="9" class="cf2">CAP_NET_BIND_SERVICE</text>
      <text x="386" y="87" fill="#a0a0a0" font-size="8" class="cf2">bind ports &lt; 1024 only</text>
      <rect x="566" y="60" width="196" height="34" rx="5" fill="#162916" stroke="#a29bfe" stroke-width="1" class="cf3"/>
      <text x="576" y="74" fill="#a29bfe" font-size="9" class="cf3">CAP_SYS_MODULE</text>
      <text x="576" y="87" fill="#a0a0a0" font-size="8" class="cf3">load kernel modules only</text>
      <rect x="376" y="102" width="180" height="34" rx="5" fill="#162916" stroke="#74b9ff" stroke-width="1" class="cf4"/>
      <text x="386" y="116" fill="#74b9ff" font-size="9" class="cf4">CAP_NET_RAW</text>
      <text x="386" y="129" fill="#a0a0a0" font-size="8" class="cf4">raw/packet sockets only</text>
      <rect x="566" y="102" width="196" height="34" rx="5" fill="#162916" stroke="#fdcb6e" stroke-width="1" class="cf5"/>
      <text x="576" y="116" fill="#fdcb6e" font-size="9" class="cf5">CAP_CHOWN</text>
      <text x="576" y="129" fill="#a0a0a0" font-size="8" class="cf5">chown any file only</text>
      <rect x="376" y="144" width="180" height="34" rx="5" fill="#162916" stroke="#fd7272" stroke-width="1" class="cf6"/>
      <text x="386" y="158" fill="#fd7272" font-size="9" class="cf6">CAP_DAC_OVERRIDE</text>
      <text x="386" y="171" fill="#a0a0a0" font-size="8" class="cf6">bypass file perm checks</text>
      <rect x="566" y="144" width="196" height="34" rx="5" fill="#162916" stroke="#e17055" stroke-width="1" class="cf7"/>
      <text x="576" y="158" fill="#e17055" font-size="9" class="cf7">CAP_KILL</text>
      <text x="576" y="171" fill="#a0a0a0" font-size="8" class="cf7">send signals to any process</text>
      <!-- more caps -->
      <rect x="376" y="186" width="180" height="34" rx="5" fill="#162916" stroke="#81ecec" stroke-width="1" class="cf6"/>
      <text x="386" y="200" fill="#81ecec" font-size="9" class="cf6">CAP_SYS_TIME</text>
      <text x="386" y="213" fill="#a0a0a0" font-size="8" class="cf6">set system clock only</text>
      <rect x="566" y="186" width="196" height="34" rx="5" fill="#162916" stroke="#00cec9" stroke-width="1" class="cf7"/>
      <text x="576" y="200" fill="#00cec9" font-size="9" class="cf7">CAP_NET_ADMIN</text>
      <text x="576" y="213" fill="#a0a0a0" font-size="8" class="cf7">network interface config</text>
      <rect x="376" y="228" width="386" height="34" rx="5" fill="#0a1a0a" stroke="#636e72" stroke-width="1" class="cf7"/>
      <text x="569" y="248" fill="#636e72" font-size="9" text-anchor="middle" class="cf7">~32 more granular capabilities — grant only what's needed</text>
      <!-- bottom text -->
      <text x="570" y="308" fill="#00b894" font-size="11" text-anchor="middle" class="cf7">One capability compromised → minimal blast radius 🛡</text>
    </svg>
  </div>

  <div class="info-block">
  <div class="info-title">${title}</div>
  <p>${pText}</p>
</div>
</div>

<!-- ============================================================
     SECTION 2 — CAPABILITY SETS
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    Every process carries <strong>five capability sets</strong>. Each is a bitmask
    of up to 64 bits. Understanding these sets is the foundation of everything else.
  </p>

  <!-- SVG 2 — Five sets diagram -->
  <div class="svg-container">
    <svg viewBox="0 0 780 380" xmlns="http://www.w3.org/2000/svg" class="cap-sets-svg" aria-label="Five capability sets diagram">
      <defs>
        <style>
          .cap-sets-svg { font-family: 'Fira Mono', monospace; }
          @keyframes cap-expand { from{transform:scaleX(0)} to{transform:scaleX(1)} }
          @keyframes cap-set-in { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
          .cs1{animation:cap-set-in 0.5s 0.1s both}
          .cs2{animation:cap-set-in 0.5s 0.3s both}
          .cs3{animation:cap-set-in 0.5s 0.5s both}
          .cs4{animation:cap-set-in 0.5s 0.7s both}
          .cs5{animation:cap-set-in 0.5s 0.9s both}
        </style>
        <marker id="arrD" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#a29bfe"/>
        </marker>
      </defs>
      <rect x="10" y="10" width="760" height="360" rx="10" fill="#111"/>

      <!-- Headers -->
      <text x="100" y="36" fill="#74b9ff" font-size="11" text-anchor="middle" font-weight="bold">Set Name</text>
      <text x="260" y="36" fill="#74b9ff" font-size="11" text-anchor="middle" font-weight="bold">On Process</text>
      <text x="400" y="36" fill="#74b9ff" font-size="11" text-anchor="middle" font-weight="bold">On File (xattr)</text>
      <text x="630" y="36" fill="#74b9ff" font-size="11" text-anchor="middle" font-weight="bold">What it means</text>
      <line x1="20" y1="44" x2="760" y2="44" stroke="#333" stroke-width="1"/>
      <line x1="175" y1="10" x2="175" y2="370" stroke="#222" stroke-width="1"/>
      <line x1="340" y1="10" x2="340" y2="370" stroke="#222" stroke-width="1"/>
      <line x1="460" y1="10" x2="460" y2="370" stroke="#222" stroke-width="1"/>

      <!-- Permitted -->
      <text x="100" y="70" fill="#00b894" font-size="11" text-anchor="middle" font-weight="bold" class="cs1">Permitted (P)</text>
      <text x="260" y="62" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs1">superset of effective;</text>
      <text x="260" y="76" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs1">caps a process MAY enable</text>
      <text x="400" y="62" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs1">caps added to permitted</text>
      <text x="400" y="76" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs1">when file is exec'd</text>
      <text x="630" y="62" fill="#55efc4" font-size="9" text-anchor="middle" class="cs1">Upper bound — process can never</text>
      <text x="630" y="76" fill="#55efc4" font-size="9" text-anchor="middle" class="cs1">gain caps outside this set</text>

      <!-- Effective -->
      <line x1="20" y1="90" x2="760" y2="90" stroke="#222" stroke-width="1"/>
      <text x="100" y="116" fill="#e17055" font-size="11" text-anchor="middle" font-weight="bold" class="cs2">Effective (E)</text>
      <text x="260" y="108" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs2">currently active caps</text>
      <text x="260" y="122" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs2">kernel checks these</text>
      <text x="400" y="108" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs2">single bit: if set, permitted</text>
      <text x="400" y="122" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs2">→ effective on exec</text>
      <text x="630" y="108" fill="#fdcb6e" font-size="9" text-anchor="middle" class="cs2">What the kernel checks on every</text>
      <text x="630" y="122" fill="#fdcb6e" font-size="9" text-anchor="middle" class="cs2">privileged operation</text>

      <!-- Inheritable -->
      <line x1="20" y1="136" x2="760" y2="136" stroke="#222" stroke-width="1"/>
      <text x="100" y="162" fill="#a29bfe" font-size="11" text-anchor="middle" font-weight="bold" class="cs3">Inheritable (I)</text>
      <text x="260" y="154" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs3">caps preserved across</text>
      <text x="260" y="168" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs3">execve() calls</text>
      <text x="400" y="154" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs3">caps the file allows to</text>
      <text x="400" y="168" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs3">inherit from parent</text>
      <text x="630" y="154" fill="#a29bfe" font-size="9" text-anchor="middle" class="cs3">Permits cap transfer through</text>
      <text x="630" y="168" fill="#a29bfe" font-size="9" text-anchor="middle" class="cs3">exec chain (rarely used directly)</text>

      <!-- Bounding -->
      <line x1="20" y1="182" x2="760" y2="182" stroke="#222" stroke-width="1"/>
      <text x="100" y="208" fill="#74b9ff" font-size="11" text-anchor="middle" font-weight="bold" class="cs4">Bounding (B)</text>
      <text x="260" y="200" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs4">per-process cap ceiling</text>
      <text x="260" y="214" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs4">set at process creation</text>
      <text x="400" y="207" fill="#636e72" font-size="9" text-anchor="middle" class="cs4">N/A (process-only set)</text>
      <text x="630" y="200" fill="#74b9ff" font-size="9" text-anchor="middle" class="cs4">Hard limit — caps dropped from</text>
      <text x="630" y="214" fill="#74b9ff" font-size="9" text-anchor="middle" class="cs4">bounding can NEVER be regained</text>

      <!-- Ambient -->
      <line x1="20" y1="228" x2="760" y2="228" stroke="#222" stroke-width="1"/>
      <text x="100" y="254" fill="#81ecec" font-size="11" text-anchor="middle" font-weight="bold" class="cs5">Ambient (A)</text>
      <text x="260" y="246" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs5">added in kernel 4.3</text>
      <text x="260" y="260" fill="#a0a0a0" font-size="9" text-anchor="middle" class="cs5">inherited by non-root exec</text>
      <text x="400" y="253" fill="#636e72" font-size="9" text-anchor="middle" class="cs5">N/A (process-only set)</text>
      <text x="630" y="246" fill="#81ecec" font-size="9" text-anchor="middle" class="cs5">Lets non-root scripts exec</text>
      <text x="630" y="260" fill="#81ecec" font-size="9" text-anchor="middle" class="cs5">with caps without file xattrs</text>

      <!-- Formula box -->
      <rect x="20" y="296" width="740" height="56" rx="6" fill="#0d1117" stroke="#333" stroke-width="1"/>
      <text x="400" y="316" fill="#ffeaa7" font-size="11" text-anchor="middle" font-weight="bold">Permitted transition formula on execve():</text>
      <text x="400" y="338" fill="#55efc4" font-size="10" text-anchor="middle">P' = (P_inheritable ∩ F_inheritable) ∪ (F_permitted ∩ Bounding) ∪ Ambient</text>
      <text x="400" y="354" fill="#636e72" font-size="9" text-anchor="middle">E' = Ambient ∪ (E_file ? P' : ∅)     |    A' = (not setuid/setgid file) ? Ambient : ∅</text>
    </svg>
  </div>
</div>

<!-- ============================================================
     SECTION 3 — TOOLS: capsh, getcap, setcap
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>

  <h3>3a. <code>capsh</code> — Capability Shell</h3>
  <p><code>capsh</code> (part of <code>libcap2-bin</code>) decodes, prints, and manipulates
  process capability sets. It's the Swiss Army knife for capability introspection.</p>

  <div class="command-anatomy">
    <div class="cmd-title">Command Anatomy</div>
    <div class="cmd-line">
      <span class="cb-cmd">capsh</span>
      <span class="cb-flag"> --print</span>
      <span class="cb-flag"> --decode=HEX</span>
      <span class="cb-flag"> --caps=CAPSET</span>
    </div>
  </div>

  <table class="flag-table">
    <thead><tr><th>Flag</th><th>Purpose</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><code>--print</code></td><td>Show current process capability sets</td><td><code>capsh --print</code></td></tr>
      <tr><td><code>--decode=HEX</code></td><td>Decode hex bitmask to human names</td><td><code>capsh --decode=0000003fffffffff</code></td></tr>
      <tr><td><code>--caps=SET</code></td><td>Set caps then exec a shell</td><td><code>capsh --caps="cap_net_raw+eip" -- -c id</code></td></tr>
      <tr><td><code>--drop=CAP</code></td><td>Drop from bounding set</td><td><code>capsh --drop=cap_sys_module</code></td></tr>
      <tr><td><code>--inh=SET</code></td><td>Set inheritable caps</td><td><code>capsh --inh=cap_net_raw</code></td></tr>
      <tr><td><code>--</code></td><td>Separator: args after go to shell</td><td><code>capsh --print -- -c "ls"</code></td></tr>
    </tbody>
  </table>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>

  <h3>3b. <code>getcap</code> — Read File Capabilities</h3>
  <p>File capabilities are stored as extended attributes on the binary's inode.
  <code>getcap</code> reads and displays them.</p>

  <div class="command-anatomy">
    <div class="cmd-title">Command Anatomy</div>
    <div class="cmd-line">
      <span class="cb-cmd">getcap</span>
      <span class="cb-flag"> [-r]</span>
      <span class="cb-flag"> [-v]</span>
      <span class="cb-str"> FILE...</span>
    </div>
  </div>

  <table class="flag-table">
    <thead><tr><th>Flag</th><th>Purpose</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><code>-r</code></td><td>Recursive directory scan</td><td><code>getcap -r /usr/bin/</code></td></tr>
      <tr><td><code>-v</code></td><td>Verbose — show files with no caps too</td><td><code>getcap -v /bin/ping</code></td></tr>
      <tr><td><code>-n</code></td><td>Show numeric capability values</td><td><code>getcap -n /usr/bin/tcpdump</code></td></tr>
    </tbody>
  </table>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>

  <h3>3c. <code>setcap</code> — Set File Capabilities</h3>
  <p><code>setcap</code> writes capability sets to a binary's extended attributes.
  Requires <code>CAP_SETFCAP</code> (typically root). The capability string format
  is <code>cap_name[,cap_name...]=FLAGS</code>.</p>

  <div class="command-anatomy">
    <div class="cmd-title">Command Anatomy</div>
    <div class="cmd-line">
      <span class="cb-cmd">setcap</span>
      <span class="cb-str"> CAPSTRING</span>
      <span class="cb-str"> FILE</span>
    </div>
  </div>

  <table class="flag-table">
    <thead><tr><th>Flag suffix</th><th>Set affected</th><th>Meaning</th></tr></thead>
    <tbody>
      <tr><td><code>=ep</code></td><td>Effective + Permitted</td><td>Cap is active on exec (most common)</td></tr>
      <tr><td><code>=p</code></td><td>Permitted only</td><td>Program must explicitly raise to effective</td></tr>
      <tr><td><code>=eip</code></td><td>Effective + Inheritable + Permitted</td><td>Also passes cap through exec chain</td></tr>
      <tr><td><code>-r</code> (flag to setcap)</td><td>Remove all</td><td><code>setcap -r /path/to/bin</code></td></tr>
    </tbody>
  </table>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 4 — /proc INSPECTION
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    Every process exposes its capability sets in <code>/proc/PID/status</code>
    as hex bitmasks. This is the raw kernel view — invaluable for debugging
    containers, systemd services, and setuid programs.
  </p>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>

  <!-- SVG 3 — /proc/status cap fields annotated -->
  <div class="svg-container">
    <svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" class="cap-proc-svg" aria-label="proc status capability fields">
      <defs>
        <style>
          .cap-proc-svg { font-family: 'Fira Mono', monospace; }
          @keyframes cap-scan { 0%{transform:translateY(0)} 100%{transform:translateY(190px)} }
          .scan-line { animation: cap-scan 3s linear infinite; opacity:0.3; }
        </style>
        <marker id="arrE" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#74b9ff"/>
        </marker>
      </defs>
      <rect x="10" y="10" width="760" height="240" rx="10" fill="#0d1117" stroke="#333"/>
      <!-- scanning line effect -->
      <rect x="10" y="10" width="760" height="4" fill="#00b894" rx="2" class="scan-line"/>

      <!-- file content -->
      <text x="30" y="46" fill="#636e72" font-size="11">/proc/self/status</text>
      <text x="30" y="68" fill="#74b9ff" font-size="11">CapInh:</text>
      <text x="130" y="68" fill="#a29bfe" font-size="11" font-family="monospace">0000000000000000</text>
      <text x="320" y="68" fill="#a0a0a0" font-size="10">← Inheritable set (hex bitmask)</text>

      <text x="30" y="92" fill="#74b9ff" font-size="11">CapPrm:</text>
      <text x="130" y="92" fill="#00b894" font-size="11" font-family="monospace">0000000000003000</text>
      <text x="320" y="92" fill="#a0a0a0" font-size="10">← Permitted set — caps this process MAY use</text>

      <text x="30" y="116" fill="#74b9ff" font-size="11">CapEff:</text>
      <text x="130" y="116" fill="#e17055" font-size="11" font-family="monospace">0000000000003000</text>
      <text x="320" y="116" fill="#a0a0a0" font-size="10">← Effective set — kernel checks this ← most important</text>

      <text x="30" y="140" fill="#74b9ff" font-size="11">CapBnd:</text>
      <text x="130" y="140" fill="#fdcb6e" font-size="11" font-family="monospace">000001ffffffffff</text>
      <text x="320" y="140" fill="#a0a0a0" font-size="10">← Bounding set — hard ceiling, cannot exceed</text>

      <text x="30" y="164" fill="#74b9ff" font-size="11">CapAmb:</text>
      <text x="130" y="164" fill="#81ecec" font-size="11" font-family="monospace">0000000000000000</text>
      <text x="320" y="164" fill="#a0a0a0" font-size="10">← Ambient set — inherited by non-setuid exec</text>

      <!-- decode annotation -->
      <line x1="128" y1="116" x2="128" y2="210" stroke="#e17055" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arrE)"/>
      <rect x="140" y="196" width="340" height="30" rx="4" fill="#1a1a1a" stroke="#e17055" stroke-width="1"/>
      <text x="152" y="210" fill="#e17055" font-size="10">capsh --decode=0000000000003000</text>
      <text x="152" y="222" fill="#55efc4" font-size="10">→ cap_net_bind_service,cap_net_raw</text>
    </svg>
  </div>
</div>

<!-- ============================================================
     SECTION 5 — KERNEL DEEP DIVE
     ============================================================ -->
<div class="section-block">
  <div class="info-block">
  <div class="info-title">${title}</div>

    <h3>Storage</h3>
    <p>
      Process capabilities live in the <code>struct cred</code> structure
      (<code>include/linux/cred.h</code>). Each capability set is a
      <code>kernel_cap_t</code> — currently a single 64-bit integer.
      File capabilities are stored as extended attributes under the namespace
      <code>security.capability</code>, encoded as a
      <code>vfs_cap_data</code> struct (version 2 or 3 for namespace support).
    </p>

    <h3>Key kernel files</h3>
    <table class="flag-table">
      <thead><tr><th>File</th><th>Role</th></tr></thead>
      <tbody>
        <tr><td><code>kernel/capability.c</code></td><td>syscall implementations: <code>capget(2)</code>, <code>capset(2)</code></td></tr>
        <tr><td><code>security/commoncap.c</code></td><td>VFS hooks: exec capability transition logic</td></tr>
        <tr><td><code>include/uapi/linux/capability.h</code></td><td>Userspace-visible cap definitions and numbers</td></tr>
        <tr><td><code>fs/xattr.c</code></td><td>xattr read/write — backs <code>getcap</code> / <code>setcap</code></td></tr>
      </tbody>
    </table>

    <h3>Relevant syscalls</h3>
    <table class="flag-table">
      <thead><tr><th>Syscall</th><th>Purpose</th></tr></thead>
      <tbody>
        <tr><td><code>capget(2)</code></td><td>Read process capability sets by PID</td></tr>
        <tr><td><code>capset(2)</code></td><td>Modify process capability sets (only drop, not raise outside permitted)</td></tr>
        <tr><td><code>prctl(2) PR_CAP_AMBIENT_*</code></td><td>Add/drop/query ambient caps (kernel ≥ 4.3)</td></tr>
        <tr><td><code>prctl(2) PR_SET_SECUREBITS</code></td><td>Lock capability-related security bits (e.g., no-setuid-root)</td></tr>
        <tr><td><code>prctl(2) PR_SET_NO_NEW_PRIVS</code></td><td>Prevent any future privilege escalation (execve can't raise caps)</td></tr>
      </tbody>
    </table>

    <h3>strace observation</h3>
    <pre class="console-pre" style="background:#0d0d0d;">
<span class="cb-prompt">$</span> <span class="cb-cmd">strace</span> <span class="cb-flag">-e</span> <span class="cb-str">capget,capset,prctl</span> <span class="cb-cmd">ping</span> <span class="cb-flag">-c1</span> <span class="cb-str">8.8.8.8</span> <span class="cb-str">2>&1 | head -20</span>
<span class="cb-out">capget({version=_LINUX_CAPABILITY_VERSION_3, pid=0}, NULL) = 0
capget({version=_LINUX_CAPABILITY_VERSION_3, pid=0},
  {effective=CAP_NET_RAW, permitted=CAP_NET_RAW, inheritable=0}) = 0
prctl(PR_SET_KEEPCAPS, 1)             = 0
prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0) = 0
</span>
<span class="cb-cmt"># ping reads its own caps via capget, confirms CAP_NET_RAW is present,
# then locks itself with PR_SET_NO_NEW_PRIVS before opening raw socket</span></pre>

    <h3>Securebits</h3>
    <p>
      Securebits are per-process flags that modify how capabilities interact with
      UID 0. Setting <code>SECBIT_NO_SETUID_FIXUP</code> prevents automatic capability
      grants when switching to UID 0. Setting <code>SECBIT_NOROOT</code> makes UID 0
      no longer automatically receive capabilities. Containers use these to create
      "rootless root" — a process with UID 0 but no capabilities.
    </p>
  </div>
</div>

<!-- ============================================================
     SECTION 6 — IMPORTANT CAPABILITIES REFERENCE
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <!-- SVG 4 — capability categories wheel/grid -->
  <div class="svg-container">
    <svg viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg" class="cap-ref-svg" aria-label="Capability categories grid">
      <defs>
        <style>
          .cap-ref-svg { font-family: 'Fira Mono', monospace; }
          @keyframes cap-glow2 { 0%,100%{filter:none} 50%{filter:drop-shadow(0 0 6px currentColor)} }
          .cap-cat { animation: cap-glow2 4s infinite; }
        </style>
      </defs>
      <!-- Network category -->
      <rect x="10" y="10" width="235" height="155" rx="8" fill="#0d1a2e" stroke="#74b9ff" stroke-width="1.5" class="cap-cat"/>
      <text x="127" y="32" fill="#74b9ff" font-size="11" text-anchor="middle" font-weight="bold">🌐 Network</text>
      <text x="22" y="52" fill="#a0e4ff" font-size="9">CAP_NET_RAW       — raw/packet sockets</text>
      <text x="22" y="68" fill="#a0e4ff" font-size="9">CAP_NET_ADMIN     — interface config, firewall</text>
      <text x="22" y="84" fill="#a0e4ff" font-size="9">CAP_NET_BIND_SERVICE — ports &lt; 1024</text>
      <text x="22" y="100" fill="#a0e4ff" font-size="9">CAP_NET_BROADCAST — socket broadcast</text>
      <text x="22" y="130" fill="#fdcb6e" font-size="8" font-style="italic">DE use: tcpdump, packet capture agents,</text>
      <text x="22" y="143" fill="#fdcb6e" font-size="8" font-style="italic">custom Kafka network monitors</text>

      <!-- Filesystem category -->
      <rect x="255" y="10" width="235" height="155" rx="8" fill="#1a2e0d" stroke="#00b894" stroke-width="1.5" class="cap-cat"/>
      <text x="372" y="32" fill="#00b894" font-size="11" text-anchor="middle" font-weight="bold">📁 Filesystem</text>
      <text x="267" y="52" fill="#a0ffcc" font-size="9">CAP_DAC_OVERRIDE  — bypass rwx checks</text>
      <text x="267" y="68" fill="#a0ffcc" font-size="9">CAP_DAC_READ_SEARCH — bypass r+x checks</text>
      <text x="267" y="84" fill="#a0ffcc" font-size="9">CAP_CHOWN         — change file ownership</text>
      <text x="267" y="100" fill="#a0ffcc" font-size="9">CAP_FOWNER        — bypass owner uid check</text>
      <text x="267" y="116" fill="#a0ffcc" font-size="9">CAP_FSETID        — set setuid/setgid bits</text>
      <text x="267" y="142" fill="#fdcb6e" font-size="8" font-style="italic">DE use: ETL scripts reading protected data</text>
      <text x="267" y="155" fill="#fdcb6e" font-size="8" font-style="italic">lake directories</text>

      <!-- Process category -->
      <rect x="500" y="10" width="270" height="155" rx="8" fill="#2e1a2e" stroke="#a29bfe" stroke-width="1.5" class="cap-cat"/>
      <text x="635" y="32" fill="#a29bfe" font-size="11" text-anchor="middle" font-weight="bold">⚙ Process Control</text>
      <text x="512" y="52" fill="#d4b0ff" font-size="9">CAP_KILL          — signal any process</text>
      <text x="512" y="68" fill="#d4b0ff" font-size="9">CAP_SETUID        — change process UID</text>
      <text x="512" y="84" fill="#d4b0ff" font-size="9">CAP_SETGID        — change process GID</text>
      <text x="512" y="100" fill="#d4b0ff" font-size="9">CAP_SETPCAP       — transfer/drop bounding caps</text>
      <text x="512" y="116" fill="#d4b0ff" font-size="9">CAP_SYS_NICE      — set process priority/scheduling</text>
      <text x="512" y="142" fill="#fdcb6e" font-size="8" font-style="italic">DE use: Spark executors, Airflow workers</text>
      <text x="512" y="155" fill="#fdcb6e" font-size="8" font-style="italic">adjusting scheduling priority</text>

      <!-- System category -->
      <rect x="10" y="175" width="235" height="155" rx="8" fill="#2e2a0d" stroke="#fdcb6e" stroke-width="1.5" class="cap-cat"/>
      <text x="127" y="197" fill="#fdcb6e" font-size="11" text-anchor="middle" font-weight="bold">🖥 System</text>
      <text x="22" y="217" fill="#ffe8a0" font-size="9">CAP_SYS_MODULE    — load kernel modules</text>
      <text x="22" y="233" fill="#ffe8a0" font-size="9">CAP_SYS_TIME      — set system clock</text>
      <text x="22" y="249" fill="#ffe8a0" font-size="9">CAP_SYS_BOOT      — reboot/kexec</text>
      <text x="22" y="265" fill="#ffe8a0" font-size="9">CAP_SYS_CHROOT    — use chroot(2)</text>
      <text x="22" y="281" fill="#ffe8a0" font-size="9">CAP_SYS_PTRACE    — ptrace any process</text>
      <text x="22" y="307" fill="#fdcb6e" font-size="8" font-style="italic">Avoid in containers unless</text>
      <text x="22" y="320" fill="#fdcb6e" font-size="8" font-style="italic">strictly required</text>

      <!-- IPC / Security category -->
      <rect x="255" y="175" width="235" height="155" rx="8" fill="#2e0d0d" stroke="#e17055" stroke-width="1.5" class="cap-cat"/>
      <text x="372" y="197" fill="#e17055" font-size="11" text-anchor="middle" font-weight="bold">🔒 Security / IPC</text>
      <text x="267" y="217" fill="#ffb8a0" font-size="9">CAP_IPC_LOCK      — lock memory (mlock)</text>
      <text x="267" y="233" fill="#ffb8a0" font-size="9">CAP_IPC_OWNER     — bypass IPC perm checks</text>
      <text x="267" y="249" fill="#ffb8a0" font-size="9">CAP_AUDIT_WRITE   — write to audit log</text>
      <text x="267" y="265" fill="#ffb8a0" font-size="9">CAP_MAC_ADMIN     — override MAC (SELinux)</text>
      <text x="267" y="281" fill="#ffb8a0" font-size="9">CAP_SYSLOG        — kernel log access</text>
      <text x="267" y="307" fill="#fdcb6e" font-size="8" font-style="italic">CAP_IPC_LOCK: critical for ML</text>
      <text x="267" y="320" fill="#fdcb6e" font-size="8" font-style="italic">models using huge pages / GPUs</text>

      <!-- Resource category -->
      <rect x="500" y="175" width="270" height="155" rx="8" fill="#0d2e2e" stroke="#81ecec" stroke-width="1.5" class="cap-cat"/>
      <text x="635" y="197" fill="#81ecec" font-size="11" text-anchor="middle" font-weight="bold">📊 Resources</text>
      <text x="512" y="217" fill="#a0ffff" font-size="9">CAP_SYS_RESOURCE  — override resource limits</text>
      <text x="512" y="233" fill="#a0ffff" font-size="9">CAP_SYS_ADMIN     — broad admin (avoid!)</text>
      <text x="512" y="249" fill="#a0ffff" font-size="9">CAP_MKNOD         — create device files</text>
      <text x="512" y="265" fill="#a0ffff" font-size="9">CAP_LINUX_IMMUTABLE — set immutable flag</text>
      <text x="512" y="307" fill="#fd7272" font-size="8" font-style="italic">CAP_SYS_ADMIN ≈ "almost root"</text>
      <text x="512" y="320" fill="#fd7272" font-size="8" font-style="italic">Never grant to containers!</text>
    </svg>
  </div>
</div>

<!-- ============================================================
     SECTION 7 — CONTAINERS & DOCKER
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    Containers are the most common place Data Engineers encounter capabilities.
    Docker grants a <strong>default capability set</strong> to containers — a subset
    of all capabilities, enough for most services. You can drop or add capabilities
    at container start.
  </p>

  <!-- SVG 5 — Docker default caps and drop/add pattern -->
  <div class="svg-container">
    <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" class="cap-docker-svg" aria-label="Docker capability model">
      <defs>
        <style>
          .cap-docker-svg { font-family: 'Fira Mono', monospace; }
          @keyframes cap-drop { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
          .drop1{animation:cap-drop 0.4s 0.2s both}
          .drop2{animation:cap-drop 0.4s 0.5s both}
          .drop3{animation:cap-drop 0.4s 0.8s both}
          .drop4{animation:cap-drop 0.4s 1.1s both}
          .drop5{animation:cap-drop 0.4s 1.4s both}
        </style>
        <marker id="arrF" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#a29bfe"/>
        </marker>
      </defs>

      <!-- Default grants -->
      <rect x="10" y="10" width="230" height="300" rx="10" fill="#0d1a1a" stroke="#00b894" stroke-width="1.5" class="drop1"/>
      <text x="125" y="34" fill="#00b894" font-size="11" text-anchor="middle" font-weight="bold">Default Container Caps</text>
      <text x="22" y="54" fill="#55efc4" font-size="9" class="drop1">✅ CAP_CHOWN</text>
      <text x="22" y="70" fill="#55efc4" font-size="9" class="drop2">✅ CAP_DAC_OVERRIDE</text>
      <text x="22" y="86" fill="#55efc4" font-size="9" class="drop2">✅ CAP_FOWNER</text>
      <text x="22" y="102" fill="#55efc4" font-size="9" class="drop3">✅ CAP_KILL</text>
      <text x="22" y="118" fill="#55efc4" font-size="9" class="drop3">✅ CAP_NET_BIND_SERVICE</text>
      <text x="22" y="134" fill="#55efc4" font-size="9" class="drop4">✅ CAP_SETGID</text>
      <text x="22" y="150" fill="#55efc4" font-size="9" class="drop4">✅ CAP_SETUID</text>
      <text x="22" y="166" fill="#55efc4" font-size="9" class="drop5">✅ CAP_SETPCAP</text>
      <text x="22" y="182" fill="#55efc4" font-size="9" class="drop5">✅ CAP_MKNOD</text>
      <text x="22" y="198" fill="#55efc4" font-size="9">✅ CAP_AUDIT_WRITE</text>
      <text x="22" y="214" fill="#55efc4" font-size="9">✅ CAP_SYS_CHROOT</text>
      <text x="22" y="240" fill="#636e72" font-size="8" font-style="italic">~14 caps granted by default</text>
      <text x="22" y="254" fill="#636e72" font-size="8" font-style="italic">~26 caps NOT granted</text>
      <text x="22" y="268" fill="#636e72" font-size="8" font-style="italic">(incl. SYS_ADMIN, SYS_MODULE)</text>

      <!-- arrow -->
      <line x1="240" y1="160" x2="278" y2="160" stroke="#a29bfe" stroke-width="2" marker-end="url(#arrF)"/>

      <!-- Middle: drop all, add only needed -->
      <rect x="280" y="10" width="210" height="300" rx="10" fill="#1a0d1a" stroke="#a29bfe" stroke-width="1.5"/>
      <text x="385" y="34" fill="#a29bfe" font-size="11" text-anchor="middle" font-weight="bold">Hardened Pattern</text>
      <text x="292" y="56" fill="#ffeaa7" font-size="9">docker run \</text>
      <text x="292" y="72" fill="#fd7272" font-size="9">  --cap-drop ALL \</text>
      <text x="292" y="88" fill="#55efc4" font-size="9">  --cap-add NET_RAW \</text>
      <text x="292" y="120" fill="#a0a0a0" font-size="8">Drop everything, add</text>
      <text x="292" y="134" fill="#a0a0a0" font-size="8">only what's needed.</text>
      <text x="292" y="160" fill="#a0a0a0" font-size="8">Principle of Least</text>
      <text x="292" y="174" fill="#a0a0a0" font-size="8">Privilege.</text>
      <rect x="292" y="196" width="185" height="80" rx="6" fill="#0d0d1a" stroke="#55efc4" stroke-width="1"/>
      <text x="302" y="214" fill="#55efc4" font-size="8">Result: container has</text>
      <text x="302" y="228" fill="#55efc4" font-size="8">ONLY cap_net_raw=ep</text>
      <text x="302" y="244" fill="#55efc4" font-size="8">Even if compromised,</text>
      <text x="302" y="258" fill="#55efc4" font-size="8">attacker can't chown,</text>
      <text x="302" y="270" fill="#55efc4" font-size="8">kill, or bind ports.</text>

      <!-- arrow -->
      <line x1="490" y1="160" x2="528" y2="160" stroke="#a29bfe" stroke-width="2" marker-end="url(#arrF)"/>

      <!-- K8s securityContext -->
      <rect x="530" y="10" width="220" height="300" rx="10" fill="#0d1a2e" stroke="#74b9ff" stroke-width="1.5"/>
      <text x="640" y="34" fill="#74b9ff" font-size="11" text-anchor="middle" font-weight="bold">K8s securityContext</text>
      <text x="542" y="56" fill="#ffeaa7" font-size="8">securityContext:</text>
      <text x="542" y="72" fill="#ffeaa7" font-size="8">  capabilities:</text>
      <text x="542" y="88" fill="#fd7272" font-size="8">    drop: ["ALL"]</text>
      <text x="542" y="104" fill="#55efc4" font-size="8">    add: ["NET_RAW"]</text>
      <text x="542" y="136" fill="#ffeaa7" font-size="8">  runAsNonRoot: true</text>
      <text x="542" y="152" fill="#ffeaa7" font-size="8">  runAsUser: 1000</text>
      <text x="542" y="168" fill="#ffeaa7" font-size="8">  allowPrivilegeEsc: false</text>
      <text x="542" y="200" fill="#a0a0a0" font-size="8" font-style="italic">K8s maps directly to</text>
      <text x="542" y="214" fill="#a0a0a0" font-size="8" font-style="italic">kernel capabilities via</text>
      <text x="542" y="228" fill="#a0a0a0" font-size="8" font-style="italic">container runtime (runc)</text>
      <text x="542" y="258" fill="#81ecec" font-size="8">PSP / Pod Security</text>
      <text x="542" y="272" fill="#81ecec" font-size="8">Standards enforce this</text>
      <text x="542" y="286" fill="#81ecec" font-size="8">cluster-wide</text>
    </svg>
  </div>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 8 — AMBIENT CAPABILITIES
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    Before kernel 4.3, giving a shell script a capability required setting file
    capabilities on the interpreter binary itself (e.g., on <code>/bin/bash</code>),
    which is dangerous. Ambient capabilities allow a <em>process</em> to pass
    specific caps to child exec'd processes even when those children are non-root
    and the executed file has no file caps.
  </p>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 9 — SVG 6: complete workflow diagram
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>

  <div class="svg-container">
    <svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" class="cap-flow-svg" aria-label="End to end capability workflow">
      <defs>
        <style>
          .cap-flow-svg { font-family: 'Fira Mono', monospace; }
          @keyframes cap-step { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
          .st1{animation:cap-step 0.4s 0.1s both}
          .st2{animation:cap-step 0.4s 0.4s both}
          .st3{animation:cap-step 0.4s 0.7s both}
          .st4{animation:cap-step 0.4s 1.0s both}
          .st5{animation:cap-step 0.4s 1.3s both}
        </style>
        <marker id="arrG" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#00b894"/>
        </marker>
      </defs>
      <!-- Step boxes horizontal flow -->
      <!-- Step 1 -->
      <rect x="10" y="80" width="130" height="80" rx="8" fill="#1a2e1a" stroke="#00b894" stroke-width="1.5" class="st1"/>
      <text x="75" y="106" fill="#00b894" font-size="10" text-anchor="middle" font-weight="bold" class="st1">1. Identify</text>
      <text x="75" y="122" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st1">What privileged</text>
      <text x="75" y="134" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st1">operation does</text>
      <text x="75" y="146" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st1">the tool need?</text>

      <line x1="140" y1="120" x2="158" y2="120" stroke="#00b894" stroke-width="2" marker-end="url(#arrG)"/>

      <!-- Step 2 -->
      <rect x="160" y="80" width="130" height="80" rx="8" fill="#1a1a2e" stroke="#a29bfe" stroke-width="1.5" class="st2"/>
      <text x="225" y="106" fill="#a29bfe" font-size="10" text-anchor="middle" font-weight="bold" class="st2">2. Map cap</text>
      <text x="225" y="122" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st2">strace the binary</text>
      <text x="225" y="134" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st2">or check man page</text>
      <text x="225" y="146" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st2">→ find exact cap</text>

      <line x1="290" y1="120" x2="308" y2="120" stroke="#00b894" stroke-width="2" marker-end="url(#arrG)"/>

      <!-- Step 3 -->
      <rect x="310" y="80" width="130" height="80" rx="8" fill="#2e1a1a" stroke="#e17055" stroke-width="1.5" class="st3"/>
      <text x="375" y="106" fill="#e17055" font-size="10" text-anchor="middle" font-weight="bold" class="st3">3. setcap</text>
      <text x="375" y="122" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st3">setcap cap_net_raw</text>
      <text x="375" y="134" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st3">=ep /opt/tool</text>
      <text x="375" y="146" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st3">or systemd unit</text>

      <line x1="440" y1="120" x2="458" y2="120" stroke="#00b894" stroke-width="2" marker-end="url(#arrG)"/>

      <!-- Step 4 -->
      <rect x="460" y="80" width="130" height="80" rx="8" fill="#1a2e2e" stroke="#81ecec" stroke-width="1.5" class="st4"/>
      <text x="525" y="106" fill="#81ecec" font-size="10" text-anchor="middle" font-weight="bold" class="st4">4. Verify</text>
      <text x="525" y="122" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st4">getcap /opt/tool</text>
      <text x="525" y="134" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st4">grep CapEff /proc</text>
      <text x="525" y="146" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st4">Run as non-root</text>

      <line x1="590" y1="120" x2="608" y2="120" stroke="#00b894" stroke-width="2" marker-end="url(#arrG)"/>

      <!-- Step 5 -->
      <rect x="610" y="80" width="130" height="80" rx="8" fill="#2e1a2e" stroke="#fdcb6e" stroke-width="1.5" class="st5"/>
      <text x="675" y="106" fill="#fdcb6e" font-size="10" text-anchor="middle" font-weight="bold" class="st5">5. Audit</text>
      <text x="675" y="122" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st5">getcap -r /usr/</text>
      <text x="675" y="134" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st5">Periodic review</text>
      <text x="675" y="146" fill="#a0a0a0" font-size="8" text-anchor="middle" class="st5">of all file caps</text>

      <!-- Labels above -->
      <text x="75" y="66" fill="#636e72" font-size="9" text-anchor="middle">e.g. raw sockets</text>
      <text x="225" y="66" fill="#636e72" font-size="9" text-anchor="middle">capability.h</text>
      <text x="375" y="66" fill="#636e72" font-size="9" text-anchor="middle">or -d flag</text>
      <text x="525" y="66" fill="#636e72" font-size="9" text-anchor="middle">capsh --print</text>
      <text x="675" y="66" fill="#636e72" font-size="9" text-anchor="middle">compliance</text>

      <!-- Bottom example -->
      <rect x="10" y="200" width="740" height="100" rx="8" fill="#0d1117" stroke="#333" stroke-width="1"/>
      <text x="380" y="224" fill="#ffeaa7" font-size="11" text-anchor="middle" font-weight="bold">Example: Ravi's packet-capture ML feature extractor</text>
      <text x="26" y="248" fill="#a0a0a0" font-size="9">1. Tool needs raw sockets → 2. man 7 capabilities → CAP_NET_RAW</text>
      <text x="26" y="266" fill="#55efc4" font-size="9">3. sudo setcap cap_net_raw=ep /opt/ml/pkt_features.py   ← one line, no root runtime</text>
      <text x="26" y="284" fill="#74b9ff" font-size="9">4. getcap /opt/ml/pkt_features.py  →  /opt/ml/pkt_features.py cap_net_raw=ep</text>
      <text x="26" y="302" fill="#a29bfe" font-size="9">5. Run as ravi (UID 1000) — captures packets, cannot touch /etc, cannot kill other procs</text>

      <!-- Blast radius note -->
      <rect x="10" y="318" width="740" height="72" rx="8" fill="#1a0a0a" stroke="#e94560" stroke-width="1"/>
      <text x="380" y="340" fill="#e94560" font-size="11" text-anchor="middle" font-weight="bold">🛡 Blast radius reduction</text>
      <text x="26" y="360" fill="#a0a0a0" font-size="9">Root approach: if compromised → attacker owns system, can exfiltrate all data, install rootkits</text>
      <text x="26" y="378" fill="#55efc4" font-size="9">CAP_NET_RAW only: if compromised → attacker can capture packets on this host only. Period.</text>
    </svg>
  </div>
</div>

<!-- ============================================================
     SECTION 10 — DIFFERENTIATOR TABLE
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <table class="diff-table">
    <thead><tr><th>Task</th><th>Command</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td>Show current process caps</td><td><code>capsh --print</code></td><td>Decodes all 5 sets</td></tr>
      <tr><td>Decode hex bitmask</td><td><code>capsh --decode=HEX</code></td><td>From /proc/PID/status</td></tr>
      <tr><td>Read file capabilities</td><td><code>getcap /path/to/bin</code></td><td>Shows e/i/p flags</td></tr>
      <tr><td>Scan directory for caps</td><td><code>getcap -r /usr/bin/</code></td><td>Security audit sweep</td></tr>
      <tr><td>Set file cap (ep)</td><td><code>setcap cap_net_raw=ep /bin</code></td><td>Requires CAP_SETFCAP</td></tr>
      <tr><td>Set multiple caps</td><td><code>setcap cap_net_raw,cap_net_admin=ep /bin</code></td><td>Comma-separated</td></tr>
      <tr><td>Remove all file caps</td><td><code>setcap -r /bin</code></td><td>Reverts to normal binary</td></tr>
      <tr><td>View raw cap hex</td><td><code>grep Cap /proc/PID/status</code></td><td>5 fields: Inh Prm Eff Bnd Amb</td></tr>
      <tr><td>Drop from bounding set</td><td><code>capsh --drop=cap_sys_module</code></td><td>Permanent for session</td></tr>
      <tr><td>Systemd service caps</td><td><code>AmbientCapabilities=CAP_NET_RAW</code></td><td>In [Service] unit section</td></tr>
      <tr><td>Docker: drop all, add one</td><td><code>docker run --cap-drop ALL --cap-add NET_RAW</code></td><td>Safest container pattern</td></tr>
      <tr><td>No new privileges</td><td><code>prctl PR_SET_NO_NEW_PRIVS</code></td><td>Irreversible — use in daemons</td></tr>
      <tr><td>Check if binary has setuid</td><td><code>ls -l /usr/bin/ping</code></td><td>Modern systems use caps, not setuid</td></tr>
      <tr><td>Audit all cap-enabled bins</td><td><code>getcap -r / 2>/dev/null</code></td><td>Compliance and security scan</td></tr>
    </tbody>
  </table>
</div>

<!-- ============================================================
     SECTION 11 — RAVI WRAP-UP
     ============================================================ -->
<div class="ravi-story-box" style="margin-top:28px;">
  <div class="ravi-avatar">👨‍💻</div>
  <div class="ravi-bubble">
    <strong>Ravi's takeaway:</strong> The packet-capture tool now runs as <code>ravi</code>
    with <code>cap_net_raw=ep</code> — no root, no sudoers entry, no setuid bit.
    If the tool is ever compromised, the blast radius is a single capability on a
    single host. "Capabilities are the Unix permission model grown up," his mentor
    says. "chmod taught you who can open a file. Capabilities control what a
    running process can do to the entire system."
  </div>
</div>

<!-- ============================================================
     EXERCISES
     ============================================================ -->
<div class="section-card exercises-section">
  <h2>🎯 Exercises</h2>

  <div class="exercise-panel easy">
    <div class="exercise-header">Exercise 1 — Easy</div>
    <div class="exercise-body">
      <p>Run <code>capsh --print</code> as your normal user, then as root (with <code>sudo</code>).
      Identify the difference in the <em>Effective</em> set. Then use
      <code>capsh --decode=</code> to decode the <code>CapBnd</code> hex value
      from <code>/proc/self/status</code>.</p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-prompt">$</span> <span class="cb-cmd">capsh</span> <span class="cb-flag">--print</span>
<span class="cb-cmt"># Current: =  (empty — no caps as normal user)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo</span> <span class="cb-cmd">capsh</span> <span class="cb-flag">--print</span>
<span class="cb-cmt"># Current: =ep  (all caps effective+permitted as root)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-str">CapBnd</span> <span class="cb-str">/proc/self/status</span>
<span class="cb-out">CapBnd: 000001ffffffffff
</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">capsh</span> <span class="cb-flag">--decode=</span><span class="cb-str">000001ffffffffff</span>
<span class="cb-cmt"># Lists all caps — this is the full Linux bounding set</span></pre>
      </details>
    </div>
  </div>

  <div class="exercise-panel easy">
    <div class="exercise-header">Exercise 2 — Easy</div>
    <div class="exercise-body">
      <p>Use <code>getcap -r /usr/bin/ 2>/dev/null</code> to list all binaries
      with file capabilities on your system. For each one, identify:
      (a) what capability it holds, (b) what privilege that grants, and (c) why
      it needs it instead of setuid root.</p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-prompt">$</span> <span class="cb-cmd">getcap</span> <span class="cb-flag">-r</span> <span class="cb-str">/usr/bin/</span> <span class="cb-str">2>/dev/null</span>
<span class="cb-out">/usr/bin/ping cap_net_raw=ep
</span>
<span class="cb-cmt"># a) CAP_NET_RAW
# b) Allows creation of raw/packet sockets (ICMP needs this)
# c) With setuid, ping would run as root — any exploit gives root access.
#    With cap_net_raw=ep, even if ping is exploited, attacker only gets
#    raw socket access, not full root.</span></pre>
      </details>
    </div>
  </div>

  <div class="exercise-panel medium">
    <div class="exercise-header">Exercise 3 — Medium</div>
    <div class="exercise-body">
      <p>Write a Python script <code>port_listener.py</code> that binds to port 80
      and prints "Listening on 80". Grant it <code>cap_net_bind_service=ep</code>
      and confirm it can bind to port 80 without running as root. Then remove the
      capability and verify it fails.</p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-cmt"># port_listener.py</span>
<span class="cb-out">import socket
s = socket.socket()
s.bind(('', 80))
print("Listening on 80")
s.close()
</span>
<span class="cb-cmt"># Grant cap</span>
<span class="cb-prompt">#</span> <span class="cb-cmd">setcap</span> <span class="cb-str">cap_net_bind_service=ep</span> <span class="cb-str">/usr/bin/python3.11</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">python3</span> <span class="cb-str">port_listener.py</span>
<span class="cb-out">Listening on 80
</span>
<span class="cb-cmt"># Remove cap and test failure</span>
<span class="cb-prompt">#</span> <span class="cb-cmd">setcap</span> <span class="cb-flag">-r</span> <span class="cb-str">/usr/bin/python3.11</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">python3</span> <span class="cb-str">port_listener.py</span>
<span class="cb-out">PermissionError: [Errno 13] Permission denied
</span></pre>
      </details>
    </div>
  </div>

  <div class="exercise-panel medium">
    <div class="exercise-header">Exercise 4 — Medium</div>
    <div class="exercise-body">
      <p>Inspect the capability sets of three running processes on your system
      (e.g., systemd PID 1, sshd, and a user process). For each, decode the
      <code>CapEff</code> hex value using <code>capsh --decode</code> and explain
      why each process has or doesn't have capabilities.</p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-cmt"># PID 1 (systemd)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-str">CapEff</span> <span class="cb-str">/proc/1/status</span>
<span class="cb-out">CapEff: 000001ffffffffff
</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">capsh</span> <span class="cb-flag">--decode=</span><span class="cb-str">000001ffffffffff</span>
<span class="cb-cmt"># All caps — systemd starts as root and needs full control</span>

<span class="cb-cmt"># sshd</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-str">CapEff</span> <span class="cb-str">/proc/$(pgrep sshd | head -1)/status</span>
<span class="cb-cmt"># Usually 000001ffffffffff — sshd needs to authenticate and setuid to user</span>

<span class="cb-cmt"># User shell process</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> <span class="cb-str">CapEff</span> <span class="cb-str">/proc/self/status</span>
<span class="cb-out">CapEff: 0000000000000000
</span>
<span class="cb-cmt"># Empty — normal users have no effective capabilities</span></pre>
      </details>
    </div>
  </div>

  <div class="exercise-panel hard">
    <div class="exercise-header">Exercise 5 — Hard</div>
    <div class="exercise-body">
      <p>Write a shell script <code>cap_audit.sh</code> that:
      <br>1. Scans <code>/usr</code>, <code>/bin</code>, <code>/sbin</code>, <code>/opt</code> recursively for all binaries with file capabilities
      <br>2. For each found binary, decodes the capability names using <code>capsh</code>
      <br>3. Flags any binary with <code>cap_sys_admin</code>, <code>cap_dac_override</code>, or <code>cap_setuid</code> as HIGH RISK
      <br>4. Outputs a formatted report with: path, raw cap string, decoded names, risk level
      <br>5. Saves the report to <code>/tmp/cap_audit_YYYYMMDD.txt</code></p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-out">#!/bin/bash
# cap_audit.sh — capability security audit
REPORT="/tmp/cap_audit_$(date +%Y%m%d).txt"
HIGH_RISK="cap_sys_admin|cap_dac_override|cap_setuid"
echo "=== Capability Audit $(date) ===" | tee "$REPORT"
echo "" | tee -a "$REPORT"

getcap -r /usr /bin /sbin /opt 2>/dev/null | while IFS= read -r line; do
  BIN=$(echo "$line" | awk '{print $1}')
  CAPSTR=$(echo "$line" | awk '{print $2}')
  HEX=$(getfattr --only-values -n security.capability "$BIN" 2>/dev/null | xxd -p 2>/dev/null || echo "?")
  RISK="LOW"
  echo "$CAPSTR" | grep -qiE "$HIGH_RISK" && RISK="HIGH ⚠"

  printf "%-50s %-30s %s\n" "$BIN" "$CAPSTR" "[$RISK]" | tee -a "$REPORT"
done

echo "" | tee -a "$REPORT"
echo "Report saved to: $REPORT"
</span></pre>
      </details>
    </div>
  </div>

</div>
</div>
`};