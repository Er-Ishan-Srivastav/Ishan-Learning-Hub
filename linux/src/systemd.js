var systemd = {
    title: "Systemd & Services Managing Daemons & System Services",
    description: "Master systemd at expert depth &#x2014; write service unit files, manage daemons with systemctl, query logs with journalctl, create timer units as cron replacements, apply resource limits and security hardening via cgroups, use drop-in overrides without touching package-provided unit files, and build production-grade services that self-heal on failure.",
    content: `
<style>
@keyframes sd-flow  { 0%{stroke-dashoffset:28}  100%{stroke-dashoffset:0} }
@keyframes sd-pulse { 0%,100%{opacity:1}         50%{opacity:.15} }
@keyframes sd-blink { 0%,100%{fill:#3fb950;stroke:#3fb950} 50%{fill:#0a1a0a;stroke:#238636} }
@keyframes sd-spin  { 0%{transform-origin:center;transform:rotate(0deg)} 100%{transform-origin:center;transform:rotate(360deg)} }
@keyframes sd-active { 0%,100%{fill:#1a2a1a;stroke:#3fb950} 50%{fill:#0a1f0a;stroke:#52ff6e} }
@keyframes sd-fail  { 0%,100%{fill:#2a1a14;stroke:#f85149} 50%{fill:#1a0000;stroke:#ff6b6b} }
@keyframes sd-pop   { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
.sd-flow   { stroke-dasharray:7 5; animation: sd-flow  .9s linear infinite; }
.sd-pulse  { animation: sd-pulse 1.8s ease-in-out infinite; }
.sd-blink  { animation: sd-blink 2.4s ease-in-out infinite; }
.sd-active { animation: sd-active 2s ease-in-out infinite; }
.sd-fail   { animation: sd-fail  1.2s ease-in-out infinite; }
.sd-pop    { animation: sd-pop   .6s cubic-bezier(.34,1.56,.64,1) both; }
</style>
<div class="story-panel">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">Ravi's Service Keeps Dying &#x2014; Day 570</div>
    <br>
    <p>The data pipeline ran perfectly in the terminal. The moment Ravi closed his SSH session, it stopped. He reopened the session, started it again with <code>&amp;</code>, it ran for an hour &#x2014; and then the server rebooted for a kernel update and the pipeline was gone again.</p>
    <br>
    <p>"You need a service," Priya said. "Not a background process. A proper systemd service that starts on boot, restarts on failure, logs to journald, and can be managed with systemctl."</p>
    <br>
    <p>Ravi wrote his first unit file. It was six lines. The pipeline started on boot, restarted itself if it crashed, and logged everything through journald. He could check its status with one command. He could read its logs with another. He could stop, start, or reload it without touching the process directly.</p>
    <br>
    <p>Then Priya showed him what else systemd could do: target dependencies, socket activation, drop-in overrides, resource limits with cgroups, timer units instead of cron, path units that watch for file changes. systemd is not just a service manager. It is the init system, the daemon supervisor, the log aggregator, and the dependency graph for the entire Linux boot process.</p>
  </div>
</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Linux Boot Process &#x2014; From BIOS to systemd</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sd-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sd-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sd-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sd-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sd-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sd-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="300" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Linux Boot Process &#x2014; From BIOS to systemd to Target</text>
  <!-- Stages -->
  <rect x="14"  y="40" width="110" height="48" rx="7" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="69"  y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">UEFI / BIOS</text>
  <text x="69"  y="78"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">firmware</text>
  <line x1="124" y1="64" x2="162" y2="64" stroke="#ffa657" stroke-width="2" marker-end="url(#sd-orn)" class="sd-flow"/>
  <rect x="162" y="40" width="110" height="48" rx="7" fill="#1f2027" stroke="#ffa657" stroke-width="1.5"/>
  <text x="217" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">GRUB</text>
  <text x="217" y="78"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">bootloader</text>
  <line x1="272" y1="64" x2="310" y2="64" stroke="#ffa657" stroke-width="2" marker-end="url(#sd-orn)" class="sd-flow"/>
  <rect x="310" y="40" width="120" height="48" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="370" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Linux Kernel</text>
  <text x="370" y="78"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">vmlinuz + initrd</text>
  <line x1="430" y1="64" x2="468" y2="64" stroke="#ffa657" stroke-width="2" marker-end="url(#sd-orn)" class="sd-flow"/>
  <rect x="468" y="40" width="120" height="48" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2.5"/>
  <text x="528" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">systemd (PID 1)</text>
  <text x="528" y="78"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">init process</text>
  <line x1="588" y1="64" x2="626" y2="64" stroke="#ffa657" stroke-width="2" marker-end="url(#sd-orn)" class="sd-flow"/>
  <rect x="626" y="40" width="180" height="48" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="716" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">default.target</text>
  <text x="716" y="78"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">multi-user or graphical</text>
  <!-- systemd units below -->
  <text x="410" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">systemd manages everything after kernel hands off:</text>
  <rect x="14"  y="126" width="118" height="50" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="73"  y="147" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#58a6ff">service</text>
  <text x="73"  y="163" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">daemons</text>
  <rect x="144" y="126" width="118" height="50" rx="6" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="203" y="147" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#bc8cff">target</text>
  <text x="203" y="163" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">runlevel groups</text>
  <rect x="274" y="126" width="118" height="50" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="333" y="147" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#ffa657">socket</text>
  <text x="333" y="163" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">socket activation</text>
  <rect x="404" y="126" width="118" height="50" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="463" y="147" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#3fb950">timer</text>
  <text x="463" y="163" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">cron replacement</text>
  <rect x="534" y="126" width="118" height="50" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="593" y="147" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#f85149">mount</text>
  <text x="593" y="163" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">filesystem mounts</text>
  <rect x="664" y="126" width="142" height="50" rx="6" fill="#1a1a2a" stroke="#30363d" stroke-width="1.5"/>
  <text x="735" y="147" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#8b949e">path / device</text>
  <text x="735" y="163" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">file/device watch</text>
  <!-- key facts -->
  <rect x="14"  y="190" width="792" height="98" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"  y="210" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Why systemd replaced SysV init:</text>
  <text x="26"  y="228" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2460; Parallel startup (deps tracked, all start simultaneously when deps met) &#x2014; vs sequential SysV</text>
  <text x="26"  y="245" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2461; Declarative unit files (describe WHAT you want, not HOW to do it) &#x2014; vs shell scripts</text>
  <text x="26"  y="262" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2462; Built-in supervision (auto-restart on failure, resource limits via cgroups)</text>
  <text x="26"  y="279" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2463; Unified logging (journald collects stdout/stderr, kernel, syslog &#x2014; queryable with journalctl)</text>
  <text x="26"  y="283" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">PID 1 = systemd. Kernel starts it. It starts everything else.</text>

</svg>
</div>
<p class="diagram-caption">systemd is PID 1 on every major Linux distribution. It manages the entire lifecycle of services, logs all output via journald, and provides dependency ordering for the boot process.</p>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 12 — systemctl: status, start, stop, restart, enable, disable</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ESSENTIAL COMMANDS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemctl status nginx            <span class="cb-cmt"># show full status + recent logs</span>
<span class="cb-out">&#x25CF; nginx.service - A high performance web server</span>
<span class="cb-out">     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; preset: enabled)</span>
<span class="cb-out">     Active: active (running) since Tue 2024-01-15 10:32:01 UTC; 2h 15min ago</span>
<span class="cb-out">    Process: 1234 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)</span>
<span class="cb-out">   Main PID: 1235 (nginx)</span>
<span class="cb-out">      Tasks: 5 (limit: 4915)</span>
<span class="cb-out">     Memory: 12.3M</span>
<span class="cb-out">        CPU: 234ms</span>
<span class="cb-out">     CGroup: /system.slice/nginx.service</span>
<span class="cb-out">             &#x251C;&#x2500;1235 "nginx: master process /usr/sbin/nginx"</span>
<span class="cb-out">             &#x2514;&#x2500;1236 "nginx: worker process"</span>

<span class="cb-prompt">$</span> sudo systemctl start nginx        <span class="cb-cmt"># start the service NOW</span>
<span class="cb-prompt">$</span> sudo systemctl stop nginx         <span class="cb-cmt"># stop NOW</span>
<span class="cb-prompt">$</span> sudo systemctl restart nginx      <span class="cb-cmt"># stop + start</span>
<span class="cb-prompt">$</span> sudo systemctl reload nginx       <span class="cb-cmt"># reload config without stopping</span>
<span class="cb-prompt">$</span> sudo systemctl reload-or-restart nginx  <span class="cb-cmt"># reload if supported, else restart</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ENABLE / DISABLE (boot persistence) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo systemctl enable nginx       <span class="cb-cmt"># start on boot (creates symlink)</span>
<span class="cb-prompt">$</span> sudo systemctl disable nginx      <span class="cb-cmt"># don't start on boot</span>
<span class="cb-prompt">$</span> sudo systemctl enable --now nginx  <span class="cb-cmt"># enable + start immediately</span>
<span class="cb-prompt">$</span> sudo systemctl disable --now nginx <span class="cb-cmt"># disable + stop immediately</span>
<span class="cb-cmt"># enable/disable affects BOOT behaviour
# start/stop affects RIGHT NOW
# These are INDEPENDENT. A disabled service can be started manually.</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CHECK STATE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemctl is-active nginx         <span class="cb-cmt"># active / inactive (exit 0/1)</span>
<span class="cb-prompt">$</span> systemctl is-enabled nginx        <span class="cb-cmt"># enabled / disabled</span>
<span class="cb-prompt">$</span> systemctl is-failed nginx         <span class="cb-cmt"># failed / not-failed</span>
<span class="cb-cmt"># Use in scripts: systemctl is-active --quiet nginx &amp;&amp; echo "running"</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; LIST SERVICES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemctl list-units --type=service          <span class="cb-cmt"># all loaded services</span>
<span class="cb-prompt">$</span> systemctl list-units --type=service --state=running  <span class="cb-cmt"># running only</span>
<span class="cb-prompt">$</span> systemctl list-units --failed                <span class="cb-cmt"># failed services</span>
<span class="cb-prompt">$</span> systemctl list-unit-files --type=service     <span class="cb-cmt"># enabled/disabled status</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Unit File Anatomy &#x2014; [Unit], [Service], [Install]</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sd-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sd-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sd-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sd-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sd-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sd-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="320" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">systemd Unit File Anatomy &#x2014; Every Section Explained</text>
  <!-- Unit file code on left -->
  <rect x="14"  y="36" width="390" height="274" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="24"  y="56"  font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#8b949e">/etc/systemd/system/pipeline.service</text>
  <!-- [Unit] section -->
  <rect x="20"  y="62"  width="378" height="2" rx="1" fill="#58a6ff" opacity=".4"/>
  <text x="24"  y="78"  font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">[Unit]</text>
  <text x="24"  y="94"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">Description=Daily Data Pipeline</text>
  <text x="24"  y="110" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">Documentation=https://wiki.example.com</text>
  <text x="24"  y="126" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">After=network.target postgresql.service</text>
  <text x="24"  y="142" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">Requires=postgresql.service</text>
  <text x="24"  y="158" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">Wants=redis.service</text>
  <!-- [Service] section -->
  <rect x="20"  y="166" width="378" height="2" rx="1" fill="#3fb950" opacity=".4"/>
  <text x="24"  y="182" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">[Service]</text>
  <text x="24"  y="198" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">Type=simple</text>
  <text x="24"  y="214" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">User=pipeline</text>
  <text x="24"  y="230" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">WorkingDirectory=/opt/pipeline</text>
  <text x="24"  y="246" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">EnvironmentFile=/etc/pipeline/env</text>
  <text x="24"  y="262" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">ExecStart=/opt/pipeline/.venv/bin/python main.py</text>
  <text x="24"  y="278" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">Restart=on-failure</text>
  <text x="24"  y="294" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">RestartSec=30s</text>
  <!-- [Install] section annotation only -->
  <!-- Annotations on right -->
  <rect x="420" y="36" width="386" height="274" rx="8" fill="#1a1a2a" stroke="#30363d" stroke-width="1.5"/>
  <text x="430" y="56"  font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">[Unit] section:</text>
  <text x="430" y="73"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">After=</text><text x="480" y="73"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">start AFTER these units finish</text>
  <text x="430" y="89"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">Requires=</text><text x="496" y="89"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">HARD dep: fail if dep fails</text>
  <text x="430" y="105" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">Wants=</text><text x="478" y="105" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">SOFT dep: OK if dep fails</text>
  <text x="430" y="121" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">BindsTo=</text><text x="490" y="121" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">stop if dep stops</text>
  <text x="430" y="137" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">PartOf=</text><text x="480" y="137" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">stop/restart with parent</text>
  <text x="430" y="158" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">[Service] section:</text>
  <text x="430" y="175" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">Type=simple</text><text x="510" y="175" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> main process stays in foreground</text>
  <text x="430" y="191" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">Type=forking</text><text x="514" y="191" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> traditional daemon forks</text>
  <text x="430" y="207" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">Type=notify</text><text x="512" y="207" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> sends sd_notify when ready</text>
  <text x="430" y="223" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">Type=oneshot</text><text x="518" y="223" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> runs &amp; exits (scripts)</text>
  <text x="430" y="239" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">EnvironmentFile=</text><text x="540" y="239" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">load env vars from file</text>
  <text x="430" y="255" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">Restart=</text><text x="488" y="255" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">on-failure | always | on-abnormal</text>
  <text x="430" y="273" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">[Install] section:</text>
  <text x="430" y="289" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">WantedBy=multi-user.target</text><text x="619" y="289" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">= enable for normal boot</text>
  <text x="430" y="302" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">symlink created by systemctl enable in /etc/systemd/system/multi-user.target.wants/</text>

</svg>
</div>
<p class="diagram-caption">The <code>[Unit]</code> section declares dependencies. <code>[Service]</code> declares how to run the process. <code>[Install]</code> declares which target should start it. <code>After=</code> controls ordering. <code>Requires=</code> controls hard dependencies.</p>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 12 — Writing a service unit file from scratch</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; WRITE YOUR FIRST SERVICE UNIT FILE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Create: /etc/systemd/system/pipeline.service</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=Daily Data Pipeline Service</span>
<span class="cb-out">Documentation=https://wiki.example.com/pipeline</span>
<span class="cb-out">After=network.target postgresql.service</span>
<span class="cb-out">Requires=postgresql.service</span>
<span class="cb-out"></span>
<span class="cb-out">[Service]</span>
<span class="cb-out">Type=simple</span>
<span class="cb-out">User=pipeline</span>
<span class="cb-out">Group=pipeline</span>
<span class="cb-out">WorkingDirectory=/opt/pipeline</span>
<span class="cb-out">EnvironmentFile=-/etc/pipeline/env    # - prefix: OK if file missing</span>
<span class="cb-out">ExecStartPre=/opt/pipeline/.venv/bin/python -c "import psycopg2"  # pre-flight</span>
<span class="cb-out">ExecStart=/opt/pipeline/.venv/bin/python /opt/pipeline/main.py</span>
<span class="cb-out">ExecReload=/bin/kill -HUP $MAINPID</span>
<span class="cb-out">Restart=on-failure</span>
<span class="cb-out">RestartSec=30s</span>
<span class="cb-out">StartLimitIntervalSec=300</span>
<span class="cb-out">StartLimitBurst=3       # allow max 3 restarts within 300s window</span>
<span class="cb-out">StandardOutput=journal</span>
<span class="cb-out">StandardError=journal</span>
<span class="cb-out">SyslogIdentifier=pipeline</span>
<span class="cb-out"></span>
<span class="cb-out">[Install]</span>
<span class="cb-out">WantedBy=multi-user.target</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ACTIVATE THE UNIT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo systemctl daemon-reload         <span class="cb-cmt"># ALWAYS after editing unit files!</span>
<span class="cb-prompt">$</span> sudo systemctl enable --now pipeline <span class="cb-cmt"># enable on boot + start now</span>
<span class="cb-prompt">$</span> systemctl status pipeline            <span class="cb-cmt"># verify running</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; VALIDATE UNIT FILE SYNTAX &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemd-analyze verify pipeline.service   <span class="cb-cmt"># check syntax + deps</span>
<span class="cb-prompt">$</span> systemctl cat pipeline.service            <span class="cb-cmt"># show the effective unit</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Service States &amp; journalctl Logs</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 250" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sd-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sd-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sd-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sd-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sd-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sd-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="250" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Service State Machine &#x2014; All Active States &amp; Transitions</text>
  <!-- States -->
  <rect x="326" y="40"  width="168" height="44" rx="8" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="66"  text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">inactive</text>
  <line x1="410" y1="84"  x2="410" y2="110" stroke="#3fb950" stroke-width="2" marker-end="url(#sd-grn)"/>
  <text x="430" y="100" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">start</text>
  <rect x="326" y="110" width="168" height="44" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="410" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">activating</text>
  <text x="410" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">ExecStartPre running</text>
  <line x1="410" y1="154" x2="410" y2="180" stroke="#3fb950" stroke-width="2" marker-end="url(#sd-grn)" class="sd-flow"/>
  <rect x="314" y="180" width="192" height="44" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5" class="sd-active"/>
  <text x="410" y="205" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#3fb950">active (running)</text>
  <!-- Fail path -->
  <line x1="314" y1="202" x2="192" y2="202" stroke="#f85149" stroke-width="2" marker-end="url(#sd-red)"/>
  <text x="252" y="193" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">crash</text>
  <rect x="14"  y="180" width="178" height="44" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2" class="sd-fail"/>
  <text x="103" y="205" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">failed</text>
  <!-- Restart arrow -->
  <path d="M14,202 Q14,248 103,248 Q192,248 192,224" fill="none" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#sd-orn)"/>
  <text x="103" y="244" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Restart=on-failure</text>
  <!-- Stop path -->
  <line x1="506" y1="202" x2="628" y2="202" stroke="#ffa657" stroke-width="2" marker-end="url(#sd-orn)"/>
  <text x="567" y="193" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">stop</text>
  <rect x="628" y="180" width="178" height="44" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="717" y="205" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">deactivating</text>
  <line x1="717" y1="180" x2="717" y2="100" stroke="#8b949e" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#sd-arr)"/>
  <line x1="717" y1="62"  x2="494" y2="62" stroke="#8b949e" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#sd-arr)"/>
  <!-- enabled vs disabled note -->
  <rect x="14"  y="230" width="792" height="12" rx="3" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26"  y="240" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#bc8cff">enabled</text>
  <text x="72"  y="240" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = starts on boot (symlink exists in .wants/)  </text>
  <text x="328" y="240" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  |  </text>
  <text x="348" y="240" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">disabled</text>
  <text x="398" y="240" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = won't start on boot  |  These are INDEPENDENT of active/inactive state!</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 12 — journalctl: view, filter, follow, export service logs</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; VIEW SERVICE LOGS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> journalctl -u pipeline            <span class="cb-cmt"># all logs for this unit</span>
<span class="cb-prompt">$</span> journalctl -u pipeline -f         <span class="cb-cmt"># follow (live tail)</span>
<span class="cb-prompt">$</span> journalctl -u pipeline -n 50      <span class="cb-cmt"># last 50 lines</span>
<span class="cb-prompt">$</span> journalctl -u pipeline -e         <span class="cb-cmt"># jump to end</span>
<span class="cb-prompt">$</span> journalctl -u pipeline --since "1 hour ago"
<span class="cb-prompt">$</span> journalctl -u pipeline --since "2024-01-15 10:00" --until "2024-01-15 11:00"
<span class="cb-prompt">$</span> journalctl -u pipeline -p err     <span class="cb-cmt"># errors only</span>
<span class="cb-prompt">$</span> journalctl -u nginx -u postgresql  <span class="cb-cmt"># multiple units</span>
<span class="cb-prompt">$</span> journalctl -u pipeline --no-pager | grep ERROR | tail -20

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; FIND CRASH LOGS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># View logs from before the last crash/reboot:</span>
<span class="cb-prompt">$</span> journalctl -u pipeline -b -1     <span class="cb-cmt"># -b -1 = previous boot</span>
<span class="cb-prompt">$</span> journalctl -b -1 -p err          <span class="cb-cmt"># all errors in previous boot</span>
<span class="cb-prompt">$</span> journalctl --list-boots           <span class="cb-cmt"># list all boot sessions</span>
<span class="cb-cmt"># Why did the service fail last time?</span>
<span class="cb-prompt">$</span> systemctl status pipeline        <span class="cb-cmt"># shows exit code + last error</span>
<span class="cb-prompt">$</span> journalctl -u pipeline --since yesterday | grep -E "ERROR|Exception|Traceback" | tail -20

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; STRUCTURED OUTPUT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> journalctl -u pipeline -o json --no-pager | jq '.MESSAGE'
<span class="cb-prompt">$</span> journalctl -u pipeline -o short-iso   <span class="cb-cmt"># ISO timestamps</span>
<span class="cb-prompt">$</span> journalctl -u pipeline -o cat          <span class="cb-cmt"># message only (no metadata)</span>
<span class="cb-cmt"># Export to file:</span>
<span class="cb-prompt">$</span> journalctl -u pipeline --since today --no-pager &gt; pipeline-$(date +%Y%m%d).log
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; JOURNAL MAINTENANCE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> journalctl --disk-usage            <span class="cb-cmt"># how much disk the journal uses</span>
<span class="cb-prompt">$</span> sudo journalctl --vacuum-size=500M <span class="cb-cmt"># trim to 500MB</span>
<span class="cb-prompt">$</span> sudo journalctl --vacuum-time=30d  <span class="cb-cmt"># remove entries older than 30 days</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Drop-In Overrides &amp; Masking</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sd-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sd-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sd-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sd-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sd-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sd-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Drop-In Override &#x2014; Extend Without Editing the Original Unit File</text>
  <!-- Original unit -->
  <rect x="14"  y="40" width="230" height="110" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="129" y="60"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">nginx.service (original)</text>
  <text x="24"  y="78"  font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">/lib/systemd/system/</text>
  <text x="24"  y="94"  font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">nginx.service</text>
  <text x="24"  y="114" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">Never edit this file!</text>
  <text x="24"  y="130" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">Package upgrades overwrite it.</text>
  <!-- Arrow -->
  <line x1="244" y1="95" x2="300" y2="95" stroke="#ffa657" stroke-width="2.5" marker-end="url(#sd-orn)" class="sd-flow"/>
  <text x="272" y="86"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#ffa657">merged</text>
  <!-- Drop-in -->
  <rect x="300" y="40" width="250" height="110" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="425" y="60"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">drop-in file (your override)</text>
  <text x="310" y="78"  font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">/etc/systemd/system/</text>
  <text x="310" y="94"  font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">nginx.service.d/override.conf</text>
  <text x="310" y="114" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">[Service]</text>
  <text x="310" y="130" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">LimitNOFILE=65536</text>
  <!-- Arrow -->
  <line x1="550" y1="95" x2="606" y2="95" stroke="#3fb950" stroke-width="2.5" marker-end="url(#sd-grn)" class="sd-flow"/>
  <!-- Merged -->
  <rect x="606" y="40" width="200" height="110" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="706" y="60"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">merged result</text>
  <text x="616" y="78"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">nginx.service settings</text>
  <text x="616" y="94"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">+ your overrides applied</text>
  <text x="616" y="114" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Override wins on conflict.</text>
  <text x="616" y="130" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Survives package upgrades.</text>
  <!-- How to -->
  <rect x="14"  y="162" width="792" height="32" rx="5" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26"  y="178" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">Create: </text>
  <text x="72"  y="178" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">systemctl edit nginx</text>
  <text x="216" y="178" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (opens editor, saves to .d/override.conf automatically)</text>
  <text x="26"  y="192" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">Full replace: </text>
  <text x="96"  y="192" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">systemctl edit --full nginx</text>
  <text x="296" y="192" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (copies whole unit, lets you edit it directly)</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 12 — Drop-in overrides, systemctl edit, masking</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DROP-IN OVERRIDES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># NEVER edit /lib/systemd/system/*.service (overwritten by pkg updates!)
# Use drop-ins instead:</span>
<span class="cb-prompt">$</span> sudo systemctl edit nginx         <span class="cb-cmt"># opens editor for override.conf</span>
<span class="cb-cmt"># Saves to /etc/systemd/system/nginx.service.d/override.conf</span>
<span class="cb-cmt"># Or create manually:</span>
<span class="cb-out">sudo mkdir -p /etc/systemd/system/nginx.service.d/</span>
<span class="cb-out">sudo tee /etc/systemd/system/nginx.service.d/override.conf &lt;&lt; 'EOF'</span>
<span class="cb-out">[Service]</span>
<span class="cb-out">LimitNOFILE=65536</span>
<span class="cb-out">MemoryMax=2G</span>
<span class="cb-out">Restart=always</span>
<span class="cb-out">RestartSec=10s</span>
<span class="cb-out">EOF</span>
<span class="cb-out">sudo systemctl daemon-reload</span>
<span class="cb-out">sudo systemctl restart nginx</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SHOW EFFECTIVE UNIT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemctl cat nginx               <span class="cb-cmt"># shows original + overrides + their paths</span>
<span class="cb-prompt">$</span> systemctl show nginx              <span class="cb-cmt"># all properties (including effective values)</span>
<span class="cb-prompt">$</span> systemctl show nginx -p Restart   <span class="cb-cmt"># single property</span>
<span class="cb-prompt">$</span> sudo systemctl edit --full nginx  <span class="cb-cmt"># copy entire unit for full edit</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; MASKING (strongest disable) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo systemctl mask bluetooth     <span class="cb-cmt"># symlinks to /dev/null (cannot start)</span>
<span class="cb-prompt">$</span> sudo systemctl unmask bluetooth   <span class="cb-cmt"># remove the mask</span>
<span class="cb-cmt"># disable: won't auto-start but can still be started manually
# mask: IMPOSSIBLE to start (symlink to /dev/null blocks all attempts)
# Use mask for: bluetooth, cups, avahi-daemon on servers you don't want them on</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> systemd Timers &#x2014; The cron Replacement</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sd-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sd-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sd-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sd-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sd-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sd-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">systemd Timer Unit &#x2014; The cron Replacement with Better Logging</text>
  <!-- Timer unit -->
  <rect x="14"  y="38" width="250" height="120" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="139" y="58"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#ffa657">backup.timer</text>
  <text x="24"  y="76"  font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">[Unit]</text>
  <text x="24"  y="92"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">Description=Daily backup</text>
  <text x="24"  y="108" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">[Timer]</text>
  <text x="24"  y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">OnCalendar=*-*-* 02:30:00</text>
  <text x="24"  y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">Persistent=true</text>
  <text x="24"  y="154" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">[Install]</text>
  <!-- activates arrow -->
  <line x1="264" y1="98" x2="314" y2="98" stroke="#ffa657" stroke-width="2" marker-end="url(#sd-orn)"/>
  <text x="289" y="88"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">activates</text>
  <!-- Service unit -->
  <rect x="314" y="38" width="250" height="120" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="439" y="58"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#58a6ff">backup.service</text>
  <text x="324" y="76"  font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">[Unit]</text>
  <text x="324" y="92"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">Description=Run backup</text>
  <text x="324" y="108" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">[Service]</text>
  <text x="324" y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">Type=oneshot</text>
  <text x="324" y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">ExecStart=/opt/backup.sh</text>
  <!-- calendar options -->
  <rect x="580" y="38" width="226" height="120" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="693" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">OnCalendar= examples:</text>
  <text x="590" y="76"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">daily         </text><text x="670" y="76"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">midnight</text>
  <text x="590" y="92"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">hourly        </text><text x="670" y="92"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">top of hour</text>
  <text x="590" y="108" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">weekly        </text><text x="670" y="108" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Mon 00:00:00</text>
  <text x="590" y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">Mon *-*-* 9:00</text><text x="706" y="124" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Mondays 9am</text>
  <text x="590" y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">*-*-1 00:00:00</text><text x="706" y="140" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">1st of month</text>
  <text x="590" y="156" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">OnBootSec=1min</text><text x="706" y="156" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">after boot</text>
  <!-- advantages -->
  <rect x="14"  y="168" width="792" height="26" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="26"  y="184" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#3fb950">Advantages over cron: </text>
  <text x="166" y="184" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Logs captured by journald  |  Persistent=true catches missed runs  |  systemctl list-timers shows next run  |  Randomized delay</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 12 — systemd timers: create, list, test, next run</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CREATE A SYSTEMD TIMER &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Two files needed: backup.timer + backup.service</span>

<span class="cb-cmt"># /etc/systemd/system/backup.timer:</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=Daily database backup at 2:30 AM</span>
<span class="cb-out"></span>
<span class="cb-out">[Timer]</span>
<span class="cb-out">OnCalendar=*-*-* 02:30:00</span>
<span class="cb-out">Persistent=true         # run missed jobs after reboot</span>
<span class="cb-out">RandomizedDelaySec=300  # random 0-5 min delay (avoid thundering herd)</span>
<span class="cb-out">Unit=backup.service     # which service to activate (default: same name)</span>
<span class="cb-out"></span>
<span class="cb-out">[Install]</span>
<span class="cb-out">WantedBy=timers.target</span>

<span class="cb-cmt"># /etc/systemd/system/backup.service:</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=Database backup job</span>
<span class="cb-out"></span>
<span class="cb-out">[Service]</span>
<span class="cb-out">Type=oneshot</span>
<span class="cb-out">User=backup</span>
<span class="cb-out">ExecStart=/opt/backup/run.sh</span>
<span class="cb-out">StandardOutput=journal</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ACTIVATE AND MONITOR &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo systemctl daemon-reload
<span class="cb-prompt">$</span> sudo systemctl enable --now backup.timer
<span class="cb-prompt">$</span> systemctl list-timers                       <span class="cb-cmt"># all timers + next run time</span>
<span class="cb-out">NEXT                         LEFT       LAST                         PASSED  UNIT          ACTIVATES</span>
<span class="cb-out">Tue 2024-01-16 02:30:21 UTC  12h left   Mon 2024-01-15 02:30:21 UTC  11h ago backup.timer  backup.service</span>
<span class="cb-prompt">$</span> systemctl status backup.timer              <span class="cb-cmt"># timer details</span>
<span class="cb-prompt">$</span> journalctl -u backup.service               <span class="cb-cmt"># logs from last run</span>
<span class="cb-cmt"># Manually trigger (test without waiting):</span>
<span class="cb-prompt">$</span> sudo systemctl start backup.service       <span class="cb-cmt"># run the service now</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ONCALENDAR SYNTAX &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemd-analyze calendar "Mon *-*-* 09:00:00"  <span class="cb-cmt"># test expression</span>
<span class="cb-out">  Original form: Mon *-*-* 09:00:00</span>
<span class="cb-out">Normalized form: Mon *-*-* 09:00:00</span>
<span class="cb-out">    Next elapse: Mon 2024-01-22 09:00:00 UTC</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Resource Control &amp; Security Hardening</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sd-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sd-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sd-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sd-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sd-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sd-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Resource Control via cgroups &#x2014; Limit CPU, Memory, IO per Service</text>
  <!-- Service box with limits -->
  <rect x="14"  y="38" width="260" height="130" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="144" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">[Service] resource limits</text>
  <text x="24"  y="76"  font-family="'Courier New',monospace" font-size="10" fill="#3fb950">CPUQuota=50%</text><text x="140" y="76"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  max 50% of one core</text>
  <text x="24"  y="92"  font-family="'Courier New',monospace" font-size="10" fill="#3fb950">CPUShares=512</text><text x="148" y="92"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  relative weight</text>
  <text x="24"  y="108" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">MemoryLimit=512M</text><text x="172" y="108" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  OOM if exceeded</text>
  <text x="24"  y="124" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">MemoryMax=1G</text><text x="140" y="124" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  hard ceiling (v2)</text>
  <text x="24"  y="140" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">IOWeight=100</text><text x="136" y="140" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  IO priority (1-10000)</text>
  <text x="24"  y="156" font-family="'Courier New',monospace" font-size="10" fill="#f85149">LimitNOFILE=65536</text><text x="176" y="156" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  open file descriptors</text>
  <!-- Security isolation -->
  <rect x="290" y="38" width="260" height="130" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="420" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Security isolation directives</text>
  <text x="300" y="76"  font-family="'Courier New',monospace" font-size="10" fill="#3fb950">User=pipeline</text><text x="400" y="76"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  run as non-root</text>
  <text x="300" y="92"  font-family="'Courier New',monospace" font-size="10" fill="#3fb950">Group=pipeline</text>
  <text x="300" y="108" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">NoNewPrivileges=yes</text>
  <text x="300" y="124" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">ProtectSystem=strict</text><text x="464" y="124" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  read-only /</text>
  <text x="300" y="140" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">PrivateTmp=true</text><text x="428" y="140" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  isolated /tmp</text>
  <text x="300" y="156" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">ReadWritePaths=/opt/data</text>
  <!-- systemd-cgtop -->
  <rect x="566" y="38" width="240" height="130" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="686" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Monitoring commands:</text>
  <text x="576" y="76"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">systemd-cgtop</text><text x="674" y="76"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  live resource view</text>
  <text x="576" y="92"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">systemctl status svc</text><text x="694" y="92"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  cgroup info</text>
  <text x="576" y="108" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">cat /sys/fs/cgroup/...</text>
  <text x="576" y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">/memory.current</text>
  <text x="576" y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">/cpu.stat</text>
  <text x="576" y="156" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">systemd-analyze blame</text>
  <!-- note -->
  <rect x="14"  y="178" width="792" height="26" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1"/>
  <text x="26"  y="194" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">After adding resource limits: </text>
  <text x="192" y="194" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">systemctl daemon-reload &amp;&amp; systemctl restart pipeline</text>
  <text x="498" y="194" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  Always reload after changing unit files.</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 12 — Resource limits, security hardening, cgroup monitoring</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; RESOURCE LIMITS IN SERVICE FILES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">[Service]</span>
<span class="cb-out"># CPU limits:</span>
<span class="cb-out">CPUQuota=200%          # up to 2 cores (200% of one core)</span>
<span class="cb-out">CPUSchedulingPolicy=idle  # lowest priority CPU scheduling</span>
<span class="cb-out"># Memory limits:</span>
<span class="cb-out">MemoryMax=2G           # hard ceiling (OOM if exceeded)</span>
<span class="cb-out">MemoryHigh=1.5G        # soft limit (throttled, but not killed)</span>
<span class="cb-out">MemorySwapMax=0        # no swap usage</span>
<span class="cb-out"># File descriptor limits:</span>
<span class="cb-out">LimitNOFILE=65536      # open file descriptors</span>
<span class="cb-out">LimitNPROC=1024        # max processes</span>
<span class="cb-out"># IO:</span>
<span class="cb-out">IOWeight=50            # relative IO priority (1-10000, default 100)</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SECURITY HARDENING &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">[Service]</span>
<span class="cb-out">User=pipeline            # run as non-root</span>
<span class="cb-out">Group=pipeline</span>
<span class="cb-out">NoNewPrivileges=yes      # no privilege escalation</span>
<span class="cb-out">PrivateTmp=yes           # private /tmp (not shared with other services)</span>
<span class="cb-out">ProtectSystem=strict     # / and /usr read-only</span>
<span class="cb-out">ProtectHome=yes          # no access to /home /root /run/user</span>
<span class="cb-out">ReadWritePaths=/opt/pipeline /var/log/pipeline</span>
<span class="cb-out">CapabilityBoundingSet=   # drop ALL capabilities</span>
<span class="cb-out">SystemCallFilter=@system-service  # allow only safe syscalls</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; MONITOR RESOURCE USAGE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemd-cgtop                         <span class="cb-cmt"># top-like view of all cgroups</span>
<span class="cb-prompt">$</span> systemctl status pipeline             <span class="cb-cmt"># shows Memory: and CPU: in status</span>
<span class="cb-prompt">$</span> cat /sys/fs/cgroup/system.slice/pipeline.service/memory.current
<span class="cb-out">524288000</span>                               <span class="cb-cmt"># bytes (500 MB)</span>
<span class="cb-prompt">$</span> systemd-analyze security pipeline    <span class="cb-cmt"># security hardening score</span>
<span class="cb-out">NAME                                                        DESCRIPTION                              EXPOSURE</span>
<span class="cb-out">&#x2715; PrivateNetwork=                                          Service has access to the host network     0.5</span>
<span class="cb-out">&#x2713; PrivateTmp=yes                                          Service has no access to other private tmp</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Targets, Dependencies &amp; Boot Analysis</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sd-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sd-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sd-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sd-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sd-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sd-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">systemd Targets &#x2014; Replacements for SysV Runlevels</text>
  <!-- Header row -->
  <rect x="14"  y="36" width="792" height="26" rx="3" fill="#1f2027"/>
  <text x="109" y="54"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Target</text>
  <text x="310" y="54"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">SysV Equivalent</text>
  <text x="540" y="54"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Description</text>
  <!-- Rows -->
  <rect x="14"  y="64"  width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="109" y="79"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">poweroff.target</text>
  <text x="310" y="79"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">runlevel 0</text>
  <text x="540" y="79"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Halt / power off</text>
  <rect x="14"  y="88"  width="792" height="22" rx="2" fill="#161b22"/>
  <text x="109" y="103" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">rescue.target</text>
  <text x="310" y="103" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">runlevel 1</text>
  <text x="540" y="103" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Single user / rescue mode</text>
  <rect x="14"  y="112" width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="109" y="127" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">multi-user.target</text>
  <text x="310" y="127" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">runlevel 3</text>
  <text x="540" y="127" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Multi-user, no GUI &#x2014; server default</text>
  <rect x="14"  y="136" width="792" height="22" rx="2" fill="#161b22"/>
  <text x="109" y="151" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">graphical.target</text>
  <text x="310" y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">runlevel 5</text>
  <text x="540" y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Multi-user + GUI &#x2014; desktop default</text>
  <rect x="14"  y="160" width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="109" y="175" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">reboot.target</text>
  <text x="310" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">runlevel 6</text>
  <text x="540" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Reboot</text>
  <rect x="14"  y="186" width="792" height="20" rx="3" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26"  y="200" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">systemctl get-default</text>
  <text x="192" y="200" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> &#x2014; see current default  |  </text>
  <text x="346" y="200" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">systemctl set-default multi-user.target</text>
  <text x="622" y="200" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> &#x2014; change boot target</text>

</svg>
</div>
<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sd-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sd-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sd-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sd-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sd-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sd-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">systemd-analyze &#x2014; Boot Performance Analysis</text>
  <!-- Boot waterfall simulation -->
  <text x="26"  y="44"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Startup finished in</text>
  <text x="150" y="44"  font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">1.234s</text><text x="196" y="44"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (firmware) +</text>
  <text x="286" y="44"  font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">2.456s</text><text x="332" y="44"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (loader) +</text>
  <text x="400" y="44"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">3.789s</text><text x="446" y="44"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (kernel) +</text>
  <text x="516" y="44"  font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">8.123s</text><text x="562" y="44"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> (userspace)</text>
  <!-- Blame-like bars -->
  <text x="26"  y="68"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">systemd-analyze blame (slowest first):</text>
  <text x="26"  y="86"  font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">4.123s</font>  <tspan fill="#e6edf3">NetworkManager-wait-online.service</tspan></text>
  <rect x="148" y="76"  width="130" height="12" rx="2" fill="#f85149" opacity=".6" class="sd-fail"/>
  <text x="26"  y="104" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">1.876s</font>  <tspan fill="#e6edf3">dev-sda1.device</tspan></text>
  <rect x="148" y="94"  width="59"  height="12" rx="2" fill="#ffa657" opacity=".6"/>
  <text x="26"  y="122" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">0.654s</font>  <tspan fill="#e6edf3">postgresql.service</tspan></text>
  <rect x="148" y="112" width="21"  height="12" rx="2" fill="#3fb950" opacity=".6"/>
  <text x="26"  y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">0.123s</font>  <tspan fill="#e6edf3">ssh.service</tspan></text>
  <rect x="148" y="130" width="4"   height="12" rx="2" fill="#58a6ff" opacity=".6"/>
  <!-- Commands list -->
  <rect x="14"  y="154" width="792" height="30" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"  y="168" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">systemd-analyze</text><text x="170" y="168" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> total time  |  </text>
  <text x="268" y="168" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">systemd-analyze blame</text><text x="414" y="168" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> slowest services  |  </text>
  <text x="526" y="168" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">systemd-analyze critical-chain</text><text x="730" y="168" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> dep path</text>
  <text x="26"  y="180" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">systemd-analyze plot &gt; boot.svg</text><text x="222" y="180" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> generate visual waterfall chart  |  </text>
  <text x="462" y="180" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">systemd-analyze security nginx</text><text x="658" y="180" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> security score</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 12 — systemctl: targets, dependencies, boot analysis</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; TARGETS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemctl get-default                 <span class="cb-cmt"># current default target</span>
<span class="cb-out">multi-user.target</span>
<span class="cb-prompt">$</span> sudo systemctl set-default multi-user.target  <span class="cb-cmt"># set default (server)</span>
<span class="cb-prompt">$</span> sudo systemctl set-default graphical.target   <span class="cb-cmt"># set default (desktop)</span>
<span class="cb-prompt">$</span> sudo systemctl isolate rescue.target          <span class="cb-cmt"># switch to rescue NOW</span>
<span class="cb-prompt">$</span> systemctl list-units --type=target            <span class="cb-cmt"># all active targets</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DEPENDENCY INSPECTION &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemctl list-dependencies pipeline  <span class="cb-cmt"># show dep tree (what it needs)</span>
<span class="cb-prompt">$</span> systemctl list-dependencies --reverse pipeline  <span class="cb-cmt"># what depends on it</span>
<span class="cb-prompt">$</span> systemctl list-dependencies --all nginx   <span class="cb-cmt"># full recursive tree</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; BOOT ANALYSIS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemd-analyze                        <span class="cb-cmt"># total boot time</span>
<span class="cb-out">Startup finished in 1.234s (firmware) + 2.456s (loader) + 3.789s (kernel) + 8.123s (userspace) = 15.602s</span>
<span class="cb-prompt">$</span> systemd-analyze blame                  <span class="cb-cmt"># slowest services</span>
<span class="cb-prompt">$</span> systemd-analyze critical-chain        <span class="cb-cmt"># critical path to boot completion</span>
<span class="cb-prompt">$</span> systemd-analyze plot &gt; /tmp/boot.svg  <span class="cb-cmt"># visual waterfall chart</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; POWER MANAGEMENT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo systemctl reboot                  <span class="cb-cmt"># reboot</span>
<span class="cb-prompt">$</span> sudo systemctl poweroff                <span class="cb-cmt"># shut down</span>
<span class="cb-prompt">$</span> sudo systemctl suspend                 <span class="cb-cmt"># suspend (laptop)</span>
<span class="cb-prompt">$</span> sudo systemctl hibernate               <span class="cb-cmt"># hibernate</span>
<span class="cb-prompt">$</span> sudo systemctl halt                    <span class="cb-cmt"># halt (no power off)</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Socket &amp; Path Units, systemd-run</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sd-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sd-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sd-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sd-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sd-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sd-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Socket Activation &#x2014; Start Service Only When First Connection Arrives</text>
  <!-- No connection state -->
  <rect x="14"  y="40" width="210" height="104" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="119" y="60"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Before connection</text>
  <rect x="24"  y="68"  width="190" height="24" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="119" y="84"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">myapp.service = inactive</text>
  <rect x="24"  y="100" width="190" height="24" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="119" y="116" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">myapp.socket = listening</text>
  <text x="119" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">systemd holds socket open</text>
  <!-- Arrow -->
  <line x1="224" y1="92" x2="280" y2="92" stroke="#ffa657" stroke-width="2.5" marker-end="url(#sd-orn)" class="sd-flow"/>
  <text x="252" y="82"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">connection</text>
  <text x="252" y="107" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">arrives</text>
  <!-- Active state -->
  <rect x="280" y="40" width="210" height="104" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="385" y="60"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">systemd wakes service</text>
  <rect x="290" y="68"  width="190" height="24" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5" class="sd-blink"/>
  <text x="385" y="84"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">myapp.service = starting</text>
  <rect x="290" y="100" width="190" height="24" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="385" y="116" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">socket passed to service</text>
  <text x="385" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">fd via LISTEN_FDS</text>
  <!-- Benefits -->
  <rect x="506" y="40" width="300" height="104" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="656" y="60"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Benefits:</text>
  <text x="516" y="78"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; No connections lost during restart</text>
  <text x="516" y="95"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Services start on-demand (faster boot)</text>
  <text x="516" y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Parallel startup &#x2014; dependency via socket</text>
  <text x="516" y="129" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Used by: dbus, sshd, cups, systemd-coredump</text>
  <!-- command -->
  <rect x="14"  y="156" width="792" height="28" rx="5" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26"  y="172" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">Enable socket activation: </text>
  <text x="176" y="172" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">systemctl enable --now myapp.socket</text>
  <text x="412" y="172" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  (enable/disable service separately)</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 12 — Socket and path units; transient units with systemd-run</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SOCKET UNIT FILE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># /etc/systemd/system/myapp.socket:</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=myapp socket</span>
<span class="cb-out"></span>
<span class="cb-out">[Socket]</span>
<span class="cb-out">ListenStream=8080          # TCP port</span>
<span class="cb-out">Accept=no                  # pass connection to service (not fork)</span>
<span class="cb-out"></span>
<span class="cb-out">[Install]</span>
<span class="cb-out">WantedBy=sockets.target</span>
<span class="cb-cmt"># The service myapp.service is started when first connection arrives
# Service receives socket via LISTEN_FDS env var</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; PATH UNIT (WATCH FOR FILE CHANGES) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># /etc/systemd/system/watch-input.path:</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=Watch /data/input for new files</span>
<span class="cb-out"></span>
<span class="cb-out">[Path]</span>
<span class="cb-out">PathExistsGlob=/data/input/*.csv   # trigger when CSV files appear</span>
<span class="cb-out">Unit=process-input.service</span>
<span class="cb-out"></span>
<span class="cb-out">[Install]</span>
<span class="cb-out">WantedBy=multi-user.target</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; TRANSIENT UNITS (systemd-run) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Run a one-off command as a systemd service (with cgroup + logging):</span>
<span class="cb-prompt">$</span> sudo systemd-run --unit=myimport python3 /opt/import_data.py
<span class="cb-cmt"># Running as user:</span>
<span class="cb-prompt">$</span> systemd-run --user --unit=myjob python3 script.py
<span class="cb-cmt"># With resource limits:</span>
<span class="cb-prompt">$</span> sudo systemd-run --property=MemoryMax=1G --property=CPUQuota=50%     python3 heavy_script.py
<span class="cb-cmt"># Check its status and logs:</span>
<span class="cb-prompt">$</span> systemctl status myimport
<span class="cb-prompt">$</span> journalctl -u myimport
<span class="cb-cmt"># Scope (attach to existing PID):</span>
<span class="cb-prompt">$</span> sudo systemd-run --scope --unit=legacy-app --slice=myslice.slice -- some_command</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> User Services &amp; loginctl</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 12 — User services, loginctl, environment, homectl</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; USER-LEVEL SERVICES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># User services: no sudo needed, run as your own user</span>
<span class="cb-cmt"># Unit file location: ~/.config/systemd/user/</span>
<span class="cb-out">mkdir -p ~/.config/systemd/user/</span>
<span class="cb-out">cat &gt; ~/.config/systemd/user/mybot.service &lt;&lt; 'EOF'</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=My Telegram bot</span>
<span class="cb-out"></span>
<span class="cb-out">[Service]</span>
<span class="cb-out">Type=simple</span>
<span class="cb-out">WorkingDirectory=%h/bot         # %h = home directory</span>
<span class="cb-out">ExecStart=%h/bot/.venv/bin/python bot.py</span>
<span class="cb-out">Restart=on-failure</span>
<span class="cb-out">Environment=BOT_TOKEN=your_token_here</span>
<span class="cb-out"></span>
<span class="cb-out">[Install]</span>
<span class="cb-out">WantedBy=default.target</span>
<span class="cb-out">EOF</span>

<span class="cb-prompt">$</span> systemctl --user daemon-reload
<span class="cb-prompt">$</span> systemctl --user enable --now mybot.service
<span class="cb-prompt">$</span> systemctl --user status mybot.service
<span class="cb-prompt">$</span> journalctl --user -u mybot.service -f

<span class="cb-cmt"># Persist user services after logout (lingering):</span>
<span class="cb-prompt">$</span> sudo loginctl enable-linger ravi    <span class="cb-cmt"># user's services survive logout</span>
<span class="cb-prompt">$</span> loginctl show-user ravi             <span class="cb-cmt"># check linger status</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; loginctl: SESSION MANAGEMENT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> loginctl list-sessions             <span class="cb-cmt"># active login sessions</span>
<span class="cb-prompt">$</span> loginctl list-users                 <span class="cb-cmt"># logged-in users</span>
<span class="cb-prompt">$</span> loginctl show-session 1            <span class="cb-cmt"># session details</span>
<span class="cb-prompt">$</span> loginctl terminate-session 1       <span class="cb-cmt"># terminate a session</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num">10</span> Troubleshooting Failed Services</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 12 — Troubleshooting failed services, rescue mode, emergency</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DIAGNOSE A FAILED SERVICE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Step 1: Find what failed</span>
<span class="cb-prompt">$</span> systemctl --failed                  <span class="cb-cmt"># list all failed units</span>
<span class="cb-out">  UNIT              LOAD   ACTIVE SUB    DESCRIPTION</span>
<span class="cb-out">&#x25CF; pipeline.service loaded failed failed Daily Data Pipeline</span>

<span class="cb-cmt"># Step 2: Get full status + exit code</span>
<span class="cb-prompt">$</span> systemctl status pipeline
<span class="cb-out">     Active: failed (Result: exit-code) since ...</span>
<span class="cb-out">    Process: 4321 ExecStart=.../python main.py (code=exited, status=1/FAILURE)</span>

<span class="cb-cmt"># Step 3: Read the logs</span>
<span class="cb-prompt">$</span> journalctl -u pipeline -n 50 --no-pager
<span class="cb-cmt"># Step 4: Check for config errors</span>
<span class="cb-prompt">$</span> systemd-analyze verify pipeline.service   <span class="cb-cmt"># unit file syntax</span>

<span class="cb-cmt"># Step 5: Clear the failed state and restart</span>
<span class="cb-prompt">$</span> sudo systemctl reset-failed pipeline
<span class="cb-prompt">$</span> sudo systemctl start pipeline

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; RESCUE / EMERGENCY MODE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Boot to single-user mode (from GRUB: add 'systemd.unit=rescue.target' to kernel line)
# Or from running system:</span>
<span class="cb-prompt">$</span> sudo systemctl rescue                 <span class="cb-cmt"># switch to rescue (warns logged-in users)</span>
<span class="cb-prompt">$</span> sudo systemctl emergency               <span class="cb-cmt"># emergency (minimal, read-only root)</span>
<span class="cb-cmt"># To return to normal:</span>
<span class="cb-prompt">$</span> sudo systemctl default                 <span class="cb-cmt"># switch back to default.target</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SERVICE START LIMIT HIT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">Jan 15 10:32:01 systemd[1]: pipeline.service: Start request repeated too quickly.</span>
<span class="cb-cmt"># Service crashed too many times in StartLimitIntervalSec window
# Fix: reset the counter, fix the underlying bug, then start</span>
<span class="cb-prompt">$</span> sudo systemctl reset-failed pipeline
<span class="cb-prompt">$</span> sudo systemctl start pipeline</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Examples: nginx, PostgreSQL, Pipeline</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 11 of 12 — Real-world examples: nginx, postgresql, custom app service</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; NGINX SERVICE MANAGEMENT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo nginx -t                         <span class="cb-cmt"># test config BEFORE reload</span>
<span class="cb-prompt">$</span> sudo systemctl reload nginx           <span class="cb-cmt"># reload config (no downtime)</span>
<span class="cb-prompt">$</span> journalctl -u nginx --since "5 min ago"

<span class="cb-cmt"># Override to increase worker connections:</span>
<span class="cb-out">sudo mkdir -p /etc/systemd/system/nginx.service.d/</span>
<span class="cb-out">sudo tee /etc/systemd/system/nginx.service.d/limits.conf &lt;&lt; 'EOF'</span>
<span class="cb-out">[Service]</span>
<span class="cb-out">LimitNOFILE=65536</span>
<span class="cb-out">EOF</span>
<span class="cb-out">sudo systemctl daemon-reload &amp;&amp; sudo systemctl restart nginx</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; POSTGRESQL SERVICE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> systemctl status postgresql@16-main   <span class="cb-cmt"># templated service</span>
<span class="cb-prompt">$</span> sudo systemctl reload postgresql@16-main   <span class="cb-cmt"># reload (pg_reload_conf())</span>
<span class="cb-prompt">$</span> journalctl -u postgresql@16-main -f

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; COMPLETE DATA PIPELINE SERVICE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># /etc/systemd/system/data-pipeline.service (production-hardened):</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=Daily Data Pipeline</span>
<span class="cb-out">After=network-online.target postgresql.service redis.service</span>
<span class="cb-out">Wants=network-online.target</span>
<span class="cb-out">Requires=postgresql.service</span>
<span class="cb-out"></span>
<span class="cb-out">[Service]</span>
<span class="cb-out">Type=simple</span>
<span class="cb-out">User=pipeline</span>
<span class="cb-out">Group=pipeline</span>
<span class="cb-out">WorkingDirectory=/opt/pipeline</span>
<span class="cb-out">EnvironmentFile=/etc/pipeline/env</span>
<span class="cb-out">ExecStart=/opt/pipeline/.venv/bin/python -m pipeline.main</span>
<span class="cb-out">Restart=on-failure</span>
<span class="cb-out">RestartSec=60s</span>
<span class="cb-out">StartLimitIntervalSec=600</span>
<span class="cb-out">StartLimitBurst=3</span>
<span class="cb-out">MemoryMax=2G</span>
<span class="cb-out">CPUQuota=200%</span>
<span class="cb-out">NoNewPrivileges=yes</span>
<span class="cb-out">PrivateTmp=yes</span>
<span class="cb-out">ProtectSystem=strict</span>
<span class="cb-out">ReadWritePaths=/opt/pipeline/data /var/log/pipeline</span>
<span class="cb-out"></span>
<span class="cb-out">[Install]</span>
<span class="cb-out">WantedBy=multi-user.target</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete ETL Setup: Service + Timer + Monitoring</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 12 of 12 — systemd in data engineering: complete service + timer + monitoring</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; COMPLETE ETL SETUP WITH SERVICE + TIMER &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out"></span>
<span class="cb-out"># Create system user (no login, no home)</span>
<span class="cb-out">useradd -r -s /sbin/nologin -d /opt/etl pipeline 2&gt;/dev/null || true</span>
<span class="cb-out"></span>
<span class="cb-out"># Environment file</span>
<span class="cb-out">mkdir -p /etc/pipeline</span>
<span class="cb-out">cat &gt; /etc/pipeline/env &lt;&lt; 'EOF'</span>
<span class="cb-out">DB_HOST=db.internal</span>
<span class="cb-out">DB_PORT=5432</span>
<span class="cb-out">DB_NAME=analytics</span>
<span class="cb-out">SLACK_WEBHOOK=https://hooks.slack.com/...</span>
<span class="cb-out">EOF</span>
<span class="cb-out">chmod 640 /etc/pipeline/env</span>
<span class="cb-out">chown root:pipeline /etc/pipeline/env</span>
<span class="cb-out"></span>
<span class="cb-out"># Service unit</span>
<span class="cb-out">tee /etc/systemd/system/etl-pipeline.service &lt;&lt; 'EOF'</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=ETL Pipeline Runner</span>
<span class="cb-out">After=network-online.target postgresql.service</span>
<span class="cb-out">Requires=postgresql.service</span>
<span class="cb-out">[Service]</span>
<span class="cb-out">Type=oneshot</span>
<span class="cb-out">User=pipeline</span>
<span class="cb-out">EnvironmentFile=/etc/pipeline/env</span>
<span class="cb-out">ExecStart=/opt/pipeline/.venv/bin/python -m etl.main</span>
<span class="cb-out">StandardOutput=journal</span>
<span class="cb-out">StandardError=journal</span>
<span class="cb-out">MemoryMax=4G</span>
<span class="cb-out">PrivateTmp=yes</span>
<span class="cb-out">NoNewPrivileges=yes</span>
<span class="cb-out">EOF</span>
<span class="cb-out"></span>
<span class="cb-out"># Timer unit</span>
<span class="cb-out">tee /etc/systemd/system/etl-pipeline.timer &lt;&lt; 'EOF'</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=Run ETL daily at 3:00 AM</span>
<span class="cb-out">[Timer]</span>
<span class="cb-out">OnCalendar=*-*-* 03:00:00</span>
<span class="cb-out">Persistent=true</span>
<span class="cb-out">RandomizedDelaySec=120</span>
<span class="cb-out">[Install]</span>
<span class="cb-out">WantedBy=timers.target</span>
<span class="cb-out">EOF</span>
<span class="cb-out"></span>
<span class="cb-out">systemctl daemon-reload</span>
<span class="cb-out">systemctl enable --now etl-pipeline.timer</span>
<span class="cb-out">systemctl list-timers etl-pipeline.timer</span>
<span class="cb-out">echo "Next run: $(systemctl list-timers etl-pipeline.timer --no-pager | tail -1)"</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive &#x2014; How systemd Works as PID 1</h2>
<div class="deepdive-box">
<div class="deepdive-title">&#x2699;&#xFE0F; systemd Internals &#x2014; PID 1, D-Bus, cgroups v2, Unit Loading, Journal Binary Format</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. PID 1 &#x2014; WHY SYSTEMD IS SPECIAL

   The Linux kernel starts exactly ONE process after mounting the rootfs:
   PID 1. This process is the init system.

   When PID 1 dies, the kernel panics. No other process can kill PID 1.
   systemd runs as PID 1 and must never exit.

   PID 1 responsibilities:
   - Adopt orphaned processes (when a parent dies, children are re-parented to PID 1)
   - Reap zombie processes (wait() for children that have exited)
   - Manage the system state machine (boot &#x2192; running &#x2192; shutdown)

2. HOW SYSTEMD STARTS SERVICES

   1. Parser reads /lib/systemd/system/ and /etc/systemd/system/ unit files
   2. Builds dependency graph (Requires, Wants, After, Before)
   3. Topological sort determines parallel startup order
   4. For each service: fork() + execve() with cgroup assignment

   The cgroup is created BEFORE execve():
   - mkdir /sys/fs/cgroup/system.slice/nginx.service/
   - write PID to /sys/fs/cgroup/system.slice/nginx.service/cgroup.procs
   - Now every process spawned by nginx is automatically tracked

3. CGROUPS v2 INTEGRATION

   systemd uses cgroups v2 (unified hierarchy) for:
   - Process accounting (which processes belong to which service)
   - Resource limits (CPU, memory, IO quotas)
   - Killing all processes of a service: write "1" to cgroup.kill

   When you run "systemctl stop nginx":
   1. systemd sends SIGTERM to the main process (ExecStop or MainPID)
   2. Waits TimeoutStopSec (default 90s)
   3. If still running: sends SIGKILL to ALL processes in the cgroup
   4. Removes the cgroup directory

   This is why systemctl stop is reliable even if a service spawns children
   that ignore SIGTERM &#x2014; they are ALL killed via the cgroup.

4. JOURNALD &#x2014; BINARY STRUCTURED LOG FORMAT

   journald captures stdout/stderr of ALL systemd services.
   The journal is a binary format (not plain text):

   Structure:
   - /run/log/journal/MACHINE-ID/    (volatile, lost on reboot if no /var)
   - /var/log/journal/MACHINE-ID/    (persistent, survives reboot)
   - Journal files are memory-mapped for fast access
   - Each entry has: timestamp, PID, UID, GID, unit name, message, and more
   - Entries are indexed by timestamp, unit, PID, and priority

   Binary format advantages:
   - Cannot be tampered with trivially (unlike plain text logs)
   - Forward-secure sealing optional (cryptographic chain)
   - Fast structured queries (journalctl -u nginx is an index scan, not grep)
   - Automatic compression of similar messages

5. D-BUS &#x2014; IPC FOR systemctl

   systemctl commands communicate with systemd via D-Bus IPC:
   systemctl start nginx &#x2192; D-Bus call to org.freedesktop.systemd1
   systemd responds asynchronously via the same bus.

   This is why "systemctl start nginx" returns quickly &#x2014; it sends the
   request and returns. The actual start happens asynchronously.

   D-Bus socket: /run/systemd/private/io.systemd.sysusers
   System bus: /run/dbus/system_bus_socket

6. UNIT FILE LOADING PRECEDENCE (highest to lowest)

   /etc/systemd/system/          &#x2014; admin overrides (HIGHEST)
   /run/systemd/system/          &#x2014; transient units (systemd-run)
   /lib/systemd/system/          &#x2014; package-provided units (LOWEST)

   Within a directory, *.d/override.conf files merge with the base unit.
   The merge algorithm: later files override earlier settings per directive.
   Exception: directives that support multiple values (ExecStartPre) APPEND.
   To clear a list directive: set it to empty first: ExecStartPre=
</pre>
</div>
</div><div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference &#x2014; systemctl, journalctl, systemd-analyze</h2>
<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:28%">Command</th><th>Purpose</th><th style="width:22%">Key Options</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">systemctl &#x2014; Service Lifecycle</td></tr>
<tr><td style="font-family:monospace;">systemctl status svc</td><td>Show status, PID, memory, recent logs</td><td>Exit 0=running, 1=failed, 3=inactive</td></tr>
<tr><td style="font-family:monospace;">systemctl start/stop/restart</td><td>Control service state immediately</td><td><code>reload</code> for graceful config reload</td></tr>
<tr><td style="font-family:monospace;">systemctl enable --now</td><td>Enable on boot AND start immediately</td><td><code>disable --now</code> to reverse</td></tr>
<tr><td style="font-family:monospace;">systemctl list-units --failed</td><td>Show all failed units</td><td><code>--type=service --state=running</code></td></tr>
<tr><td style="font-family:monospace;">systemctl reset-failed svc</td><td>Clear failed state to allow restart</td><td>After fixing the underlying issue</td></tr>
<tr><td style="font-family:monospace;">systemctl cat svc</td><td>Show unit file + all overrides</td><td><code>show svc</code> for all properties</td></tr>
<tr><td colspan="3" style="background:#1a2a14;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Unit Files &amp; Configuration</td></tr>
<tr><td style="font-family:monospace;">systemctl daemon-reload</td><td>Reload unit files after editing</td><td>Always run after changing unit files</td></tr>
<tr><td style="font-family:monospace;">systemctl edit svc</td><td>Create/edit drop-in override</td><td><code>--full</code> for full unit copy</td></tr>
<tr><td style="font-family:monospace;">systemctl mask svc</td><td>Prevent from starting (symlink /dev/null)</td><td><code>unmask</code> to reverse</td></tr>
<tr><td style="font-family:monospace;">systemd-analyze verify svc</td><td>Validate unit file syntax</td><td>Run before daemon-reload</td></tr>
<tr><td style="font-family:monospace;">systemctl list-dependencies svc</td><td>Show dependency tree</td><td><code>--reverse</code> for what depends on it</td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">journalctl &#x2014; Logs</td></tr>
<tr><td style="font-family:monospace;">journalctl -u svc -f</td><td>Follow service logs live</td><td><code>-n 50</code> last 50, <code>-e</code> jump to end</td></tr>
<tr><td style="font-family:monospace;">journalctl -u svc --since</td><td>Time-filtered logs</td><td><code>"1 hour ago"</code> or ISO datetime</td></tr>
<tr><td style="font-family:monospace;">journalctl -u svc -p err</td><td>Error messages only</td><td>0=emerg 3=err 4=warn 6=info 7=debug</td></tr>
<tr><td style="font-family:monospace;">journalctl -b -1</td><td>Logs from previous boot</td><td><code>--list-boots</code> to list all boots</td></tr>
<tr><td colspan="3" style="background:#1f1428;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Analysis &amp; Timers</td></tr>
<tr><td style="font-family:monospace;">systemd-analyze blame</td><td>Slowest services at boot</td><td><code>plot &gt; boot.svg</code> for visual chart</td></tr>
<tr><td style="font-family:monospace;">systemctl list-timers</td><td>All timers with next run time</td><td>Shows NEXT, LEFT, LAST, PASSED</td></tr>
<tr><td style="font-family:monospace;">systemd-run --unit=X cmd</td><td>Run command as transient service</td><td><code>--user</code> for user session</td></tr>
<tr><td style="font-family:monospace;">systemd-cgtop</td><td>Live cgroup resource usage</td><td>Like top, but per-service</td></tr>
</tbody>
</table>
</div>
</div><div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 &#x2014; systemctl Basics</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Check the status of nginx. Read and explain: Loaded line, Active line, Main PID, Memory, CGroup</li>
      <li>Find all currently running services on your system</li>
      <li>Find all failed services</li>
      <li>Check whether nginx starts on boot (is-enabled)</li>
      <li>Stop nginx, verify it is inactive, start it again</li>
      <li>List all dependencies that nginx requires before starting</li>
      <li>What is the default boot target? Change it to multi-user.target and back</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 &#x2014; Logs with journalctl</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>View the last 30 log lines for nginx</li>
      <li>Follow nginx logs live &#x2014; then make a request that triggers a log entry</li>
      <li>Filter nginx logs to show only errors</li>
      <li>View logs from the previous boot session</li>
      <li>Export today's nginx logs to a file in JSON format</li>
      <li>Check how much disk space the journal is using</li>
      <li>Vacuum the journal to keep only the last 7 days</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 &#x2014; Write a Service Unit</h4>
    <p>Write a complete systemd service for a Python data pipeline script:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create a system user <code>pipeline</code> with no login shell</li>
      <li>Write the unit file with: proper User/Group, WorkingDirectory, EnvironmentFile, ExecStart pointing to a venv Python</li>
      <li>Add: Restart=on-failure, RestartSec=30s, StartLimitBurst=3, StartLimitIntervalSec=300</li>
      <li>Add resource limits: MemoryMax=2G, CPUQuota=100%, NoNewPrivileges=yes, PrivateTmp=yes</li>
      <li>Enable and start the service; verify it's running and logging to journald</li>
      <li>Create a drop-in override that adds <code>LimitNOFILE=65536</code> without editing the main unit file</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 &#x2014; Timers and Boot Analysis</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create a timer that runs a backup script every day at 3:00 AM with Persistent=true</li>
      <li>Use <code>systemd-analyze calendar</code> to validate your OnCalendar expression</li>
      <li>List all timers and their next scheduled run time</li>
      <li>Manually trigger the timer's service to test it without waiting</li>
      <li>Run <code>systemd-analyze blame</code> &#x2014; identify the slowest 3 services at boot</li>
      <li>Use <code>systemd-run</code> to run a Python script as a transient service with 1GB memory limit; check its cgroup</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 &#x2014; Production Service with Full Hardening</h4>
    <p>Build and deploy a production-grade systemd-managed ETL pipeline:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Service unit:</strong> Type=simple, runs as <code>pipeline</code> user, reads from EnvironmentFile (secret config), depends on postgresql.service, restarts with backoff (30s, max 3 in 5 min)</li>
      <li><strong>Resource limits:</strong> MemoryMax=4G, CPUQuota=200%, LimitNOFILE=65536, no swap (MemorySwapMax=0)</li>
      <li><strong>Security hardening:</strong> NoNewPrivileges, PrivateTmp, ProtectSystem=strict, ReadWritePaths limited to /opt/pipeline and /var/log/pipeline, CapabilityBoundingSet empty</li>
      <li><strong>Timer:</strong> Run daily at 03:00 AM, Persistent=true (catch missed runs), RandomizedDelaySec=120</li>
      <li><strong>Monitoring:</strong> Write a script that uses <code>systemctl is-failed</code> and <code>journalctl</code> to detect failures and send a Slack alert with the last 20 log lines</li>
      <li><strong>Drop-in override:</strong> Add a drop-in that overrides MemoryMax to 8G and adds <code>Nice=-5</code> for higher scheduling priority</li>
      <li><strong>Verification:</strong> Script that checks: service enabled, timer enabled, env file permissions correct (640), log dir exists with correct ownership</li>
    </ol>
    <p><strong>Must survive: service crash, OOM kill, DB down (restart when DB recovers), server reboot, missed timer runs due to maintenance window.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">Ravi's Service &#x2014; Six Months Running</div>
    <p>The data pipeline unit file was twenty-seven lines. In six months it had run 183 times, restarted itself 7 times after transient failures, survived 4 kernel updates and 2 emergency reboots, and never once needed a human intervention to get it back up.</p>
    <p>The junior engineer asked Ravi what made the difference between a script that ran in a terminal and a proper service. Ravi thought about it. "The script is ephemeral," he said. "It exists only while you're connected. A service is a commitment &#x2014; to the system, to the process, to the users who depend on it. systemd is how you make that commitment concrete."</p>
    <p>He pointed at the unit file on screen. "Restart=on-failure is not just a directive. It's a statement: this process matters enough that when it fails, something should try again. MemoryMax=4G is a contract with the rest of the system: I will not take more than this. After=postgresql.service is an acknowledgement of reality: this process needs something to already exist."</p>
    <p><strong>A unit file is a specification of your service's behaviour, its dependencies, its resource contract, and its failure policy &#x2014; all in one declarative place.</strong></p>
  </div>
</div>
</div>
`
};