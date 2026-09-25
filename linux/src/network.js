var networks = {
    title: "Linux Network Commands",
    description: "Master Linux networking from the ground up — the TCP/IP model, IP addressing, interface management with ip, connectivity testing with ping and traceroute, port inspection with ss and netstat, DNS resolution, HTTP with curl, and production monitoring tools. The complete toolkit for debugging network issues and building data pipelines.",
    content: `
<style>
/* ── Keyframe animations ── */
@keyframes nw-flow  { 0%{stroke-dashoffset:28} 100%{stroke-dashoffset:0} }
@keyframes nw-pulse { 0%,100%{opacity:1} 50%{opacity:.18} }
@keyframes nw-pop   { 0%{transform:scale(0);opacity:0} 80%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
@keyframes nw-blink { 0%,100%{fill:#3fb950;opacity:1} 50%{fill:#238636;opacity:.3} }
@keyframes nw-slide { 0%{transform:translateX(-20px);opacity:0} 100%{transform:translateX(0);opacity:1} }
@keyframes nw-ping  { 0%{r:4;opacity:1} 100%{r:18;opacity:0} }
@keyframes nw-hop   { 0%{opacity:0;transform:translateX(-10px)} 100%{opacity:1;transform:translateX(0)} }
@keyframes nw-spin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }

.nw-flow  { stroke-dasharray:7 5; animation: nw-flow  .9s linear infinite; }
.nw-pulse { animation: nw-pulse 1.8s ease-in-out infinite; }
.nw-blink { animation: nw-blink 1.4s ease-in-out infinite; }
.nw-pop   { animation: nw-pop   .5s cubic-bezier(.34,1.56,.64,1) both; }
.nw-ping  { animation: nw-ping  1.2s ease-out infinite; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Pipeline Outage — Day 420</div>
    <br>
    <p>The data pipeline had stopped flowing. No errors in the application logs. No exceptions. The process was running, the database was up, the disk had space. Everything looked fine — except no data was arriving. Ravi stared at the dashboard for twenty minutes.</p>
    <br>
    <p>Priya walked over, glanced at the terminal, and typed four commands. <code>ss -tlnp | grep 5432</code> — the postgres port was listening. <code>curl -sI http://api.datasource.io</code> — timeout. <code>dig api.datasource.io</code> — DNS returned correctly. <code>traceroute api.datasource.io</code> — packets died at the third hop. The upstream provider's network was down.</p>
    <br>
    <p>Four commands, ninety seconds, complete diagnosis. "Network debugging," she said, "follows a layered approach. DNS first, then connectivity, then port, then application protocol. You work from the outside in. Miss any layer and you're guessing."</p>
    <br>
    <p>Ravi had been guessing for twenty minutes. Now he had a framework.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — TCP/IP MODEL (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> TCP/IP Model — The Four Layers Every Command Lives In</h2>

<p>Every network command targets a specific layer. Understanding the model tells you which command to use when debugging: DNS problems are at the Application layer, routing problems at the Network layer, physical problems at the Link layer.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="nw-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="nw-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="nw-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="nw-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="nw-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="nw-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>
  <rect width="820" height="320" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">TCP/IP 4-Layer Model — Commands, Protocols, and PDUs at Each Layer</text>

  <!-- Layer 4: Application -->
  <rect x="14" y="36" width="792" height="58" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="110" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">Application Layer</text>
  <text x="110" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">PDU: Data / Message</text>
  <text x="300" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Protocols:</text>
  <text x="400" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">HTTP HTTPS FTP SSH DNS SMTP SFTP</text>
  <text x="300" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Commands:</text>
  <text x="430" y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">curl  wget  dig  nslookup  host  nc  ssh</text>
  <text x="740" y="60" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">port 80 443 22 53</text>
  <text x="740" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">Layer 4 of 4</text>

  <!-- Layer 3: Transport -->
  <rect x="14" y="102" width="792" height="58" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="110" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">Transport Layer</text>
  <text x="110" y="138" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">PDU: Segment (TCP) / Datagram (UDP)</text>
  <text x="300" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Protocols:</text>
  <text x="390" y="122" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">TCP (reliable)  UDP (fast)</text>
  <text x="300" y="138" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Commands:</text>
  <text x="410" y="138" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">ss  netstat  nc  tcpdump  nmap</text>
  <text x="740" y="126" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">ports + sockets</text>
  <text x="740" y="142" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">Layer 3 of 4</text>

  <!-- Layer 2: Network / Internet -->
  <rect x="14" y="168" width="792" height="58" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="110" y="188" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">Network / Internet Layer</text>
  <text x="110" y="204" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">PDU: Packet</text>
  <text x="300" y="188" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Protocols:</text>
  <text x="390" y="188" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">IPv4  IPv6  ICMP  OSPF  BGP</text>
  <text x="300" y="204" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Commands:</text>
  <text x="410" y="204" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">ip addr  ip route  ping  traceroute  mtr</text>
  <text x="740" y="192" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">IP addresses</text>
  <text x="740" y="208" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">Layer 2 of 4</text>

  <!-- Layer 1: Link -->
  <rect x="14" y="234" width="792" height="58" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="110" y="254" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">Link / Network Access Layer</text>
  <text x="110" y="270" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">PDU: Frame</text>
  <text x="300" y="254" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Protocols:</text>
  <text x="390" y="254" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">Ethernet  WiFi  ARP</text>
  <text x="300" y="270" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Commands:</text>
  <text x="410" y="270" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">ip link  ethtool  arp  tcpdump  iwconfig</text>
  <text x="740" y="258" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">MAC addresses</text>
  <text x="740" y="274" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">Layer 1 of 4</text>

  <!-- Data flow arrows (right side) -->
  <text x="800" y="65"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950" transform="rotate(-90,800,65)">SEND</text>
  <line x1="808" y1="80" x2="808" y2="280" stroke="#3fb950" stroke-width="1.5" marker-end="url(#nw-grn)" class="nw-flow"/>

  <!-- Layer labels -->
  <text x="20" y="300" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Debugging order: Start at Application (curl) → Transport (ss) → Network (ping/traceroute) → Link (ip link)</text>
</svg>
<p class="diagram-caption">When debugging a network problem, <strong>work top-down from the application</strong>: first check if the service responds (curl), then if the port is open (ss/nc), then if the host is reachable (ping), then if routing works (traceroute), then if the interface is up (ip link). This eliminates layers systematically.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 10 — Systematic network debugging: the layered approach</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SYSTEMATIC DEBUGGING WORKFLOW ══════════════════════════</span>
<span class="cb-cmt"># Problem: "Can't reach api.datasource.io on port 443"</span>

<span class="cb-cmt"># Step 1 — DNS: Does the name resolve? (Application layer)</span>
<span class="cb-prompt">$</span> dig api.datasource.io +short
<span class="cb-out">203.0.113.42</span>
<span class="cb-cmt"># DNS works. If empty: DNS problem → check /etc/resolv.conf</span>

<span class="cb-cmt"># Step 2 — ICMP: Is the host reachable? (Network layer)</span>
<span class="cb-prompt">$</span> ping -c 3 api.datasource.io
<span class="cb-out">PING api.datasource.io (203.0.113.42): 56 bytes</span>
<span class="cb-out">64 bytes from 203.0.113.42: icmp_seq=0 ttl=55 time=22.4 ms</span>
<span class="cb-cmt"># Host is up. If timeout: routing/firewall problem</span>

<span class="cb-cmt"># Step 3 — TCP PORT: Is the port open? (Transport layer)</span>
<span class="cb-prompt">$</span> nc -zv api.datasource.io 443
<span class="cb-out">Connection to api.datasource.io 443 port [tcp/https] succeeded!</span>
<span class="cb-cmt"># Port open. If refused: service down. If timeout: firewall</span>

<span class="cb-cmt"># Step 4 — HTTP: Does the application respond? (Application layer)</span>
<span class="cb-prompt">$</span> curl -sI https://api.datasource.io
<span class="cb-out">HTTP/2 200</span>
<span class="cb-out">content-type: application/json</span>
<span class="cb-cmt"># Application responds. If TLS error: certificate problem</span>

<span class="cb-cmt"># Step 5 — ROUTE: Where does traffic go? (Network layer)</span>
<span class="cb-prompt">$</span> traceroute api.datasource.io
<span class="cb-cmt"># Shows each hop — find where packets die</span>

<span class="cb-cmt"># Step 6 — INTERFACE: Is the network interface up? (Link layer)</span>
<span class="cb-prompt">$</span> ip link show
<span class="cb-prompt">$</span> ip addr show
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — IP ADDRESSING & INTERFACES (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> IP Addressing &amp; Interfaces — <code>ip addr</code>, CIDR, Subnets</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="260" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">ip addr Output Anatomy — Every Field Explained</text>

  <!-- ip addr show output simulation -->
  <rect x="14" y="36" width="500" height="214" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>

  <!-- Line 1: interface number -->
  <text x="24" y="58" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">2: </text>
  <text x="44" y="58" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">eth0</text>
  <text x="90" y="58" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">: &lt;BROADCAST,MULTICAST,</text>
  <text x="24" y="74" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">    UP,LOWER_UP&gt; mtu </text>
  <text x="170" y="74" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">1500</text>
  <text x="210" y="74" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3"> qdisc fq_codel state UP</text>

  <!-- Line 3: link/ether (MAC) -->
  <text x="24" y="96" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">    link/ether </text>
  <text x="120" y="96" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">52:54:00:ab:cd:ef</text>
  <text x="254" y="96" font-family="'Courier New',monospace" font-size="11" fill="#8b949e"> brd ff:ff:ff:ff:ff:ff</text>

  <!-- Line 4: inet (IPv4) -->
  <text x="24" y="118" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">    inet </text>
  <text x="62" y="118" font-family="'Courier New',monospace" font-size="11" fill="#f85149">10.0.0.15</text>
  <text x="122" y="118" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">/24</text>
  <text x="144" y="118" font-family="'Courier New',monospace" font-size="11" fill="#8b949e"> brd </text>
  <text x="174" y="118" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">10.0.0.255</text>
  <text x="258" y="118" font-family="'Courier New',monospace" font-size="11" fill="#8b949e"> scope global </text>
  <text x="360" y="118" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">eth0</text>

  <!-- Line 5: inet6 (IPv6) -->
  <text x="24" y="140" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">    inet6 fe80::5054:ff:feab:cdef/64 scope link</text>

  <!-- Annotations right side -->
  <line x1="44" y1="58" x2="524" y2="50" stroke="#ffa657" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#nw-orn)"/>
  <rect x="525" y="36" width="281" height="22" rx="4" fill="#2a2a14" stroke="#ffa657" stroke-width="1"/>
  <text x="665" y="51" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">Interface name (eth0, ens3, enp0s3)</text>

  <line x1="170" y1="74" x2="524" y2="74" stroke="#58a6ff" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#nw-blu)"/>
  <rect x="525" y="62" width="281" height="22" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="665" y="77" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">MTU: max transmission unit bytes</text>

  <line x1="120" y1="96" x2="524" y2="96" stroke="#bc8cff" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#nw-pur)"/>
  <rect x="525" y="84" width="281" height="22" rx="4" fill="#1f1428" stroke="#bc8cff" stroke-width="1"/>
  <text x="665" y="99" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">MAC address (hardware, 6 bytes)</text>

  <line x1="62" y1="118" x2="524" y2="118" stroke="#f85149" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#nw-red)"/>
  <rect x="525" y="106" width="281" height="22" rx="4" fill="#2a1a14" stroke="#f85149" stroke-width="1"/>
  <text x="665" y="121" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">IPv4 address (assigned to interface)</text>

  <line x1="122" y1="118" x2="524" y2="128" stroke="#ffa657" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#nw-orn)"/>
  <rect x="525" y="118" width="281" height="22" rx="4" fill="#2a2a14" stroke="#ffa657" stroke-width="1"/>
  <text x="665" y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">CIDR prefix /24 = subnet mask 255.255.255.0</text>

  <!-- CIDR explanation box -->
  <rect x="14" y="158" width="500" height="90" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="176" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">CIDR Notation Quick Reference:</text>
  <text x="26" y="193" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">/8  </text><text x="52" y="193" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= 255.0.0.0    — 16M hosts   — class A (10.x.x.x)</text>
  <text x="26" y="209" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">/16 </text><text x="52" y="209" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= 255.255.0.0  — 65534 hosts — class B (172.16-31.x.x)</text>
  <text x="26" y="225" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">/24 </text><text x="52" y="225" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= 255.255.255.0 — 254 hosts  — class C (192.168.x.x)</text>
  <text x="26" y="241" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">/32 </text><text x="52" y="241" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= single host (loopback, VPN endpoints)</text>

  <!-- State flag legend -->
  <rect x="525" y="148" width="281" height="104" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="665" y="166" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Interface State Flags:</text>
  <text x="535" y="182" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">UP</text><text x="560" y="182" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = admin up (enabled)</text>
  <text x="535" y="198" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">LOWER_UP</text><text x="610" y="198" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = carrier detected (cable in)</text>
  <text x="535" y="214" font-family="'Courier New',monospace" font-size="10" fill="#f85149">DOWN</text><text x="572" y="214" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = admin disabled or no cable</text>
  <text x="535" y="230" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">BROADCAST</text><text x="610" y="230" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = supports broadcast</text>
  <text x="535" y="246" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">LOOPBACK</text><text x="605" y="246" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = loopback interface (lo)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 10 — ip addr, ip link, ip route: view and manage interfaces</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ip addr — VIEW IP ADDRESSES ═══════════════════════════</span>
<span class="cb-prompt">$</span> ip addr                          <span class="cb-cmt"># all interfaces</span>
<span class="cb-prompt">$</span> ip addr show                     <span class="cb-cmt"># same</span>
<span class="cb-prompt">$</span> ip addr show eth0                <span class="cb-cmt"># specific interface</span>
<span class="cb-prompt">$</span> ip -4 addr                       <span class="cb-cmt"># IPv4 only</span>
<span class="cb-prompt">$</span> ip -6 addr                       <span class="cb-cmt"># IPv6 only</span>
<span class="cb-prompt">$</span> ip -brief addr                   <span class="cb-cmt"># compact view</span>
<span class="cb-out">lo    UNKNOWN  127.0.0.1/8 ::1/128</span>
<span class="cb-out">eth0  UP       10.0.0.15/24 fe80::5054:ff:feab:cdef/64</span>

<span class="cb-cmt">## ═══ ip link — VIEW/MANAGE INTERFACES ═══════════════════════</span>
<span class="cb-prompt">$</span> ip link show                     <span class="cb-cmt"># all links (no IP info)</span>
<span class="cb-prompt">$</span> ip link show eth0                 <span class="cb-cmt"># specific interface</span>
<span class="cb-prompt">$</span> ip -brief link                   <span class="cb-cmt"># compact view</span>
<span class="cb-out">lo    UNKNOWN  00:00:00:00:00:00 &lt;LOOPBACK,UP,LOWER_UP&gt;</span>
<span class="cb-out">eth0  UP       52:54:00:ab:cd:ef &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt;</span>

<span class="cb-cmt"># Bring interface up/down:</span>
<span class="cb-prompt">$</span> sudo ip link set eth0 up
<span class="cb-prompt">$</span> sudo ip link set eth0 down

<span class="cb-cmt">## ═══ ip route — ROUTING TABLE ════════════════════════════════</span>
<span class="cb-prompt">$</span> ip route                         <span class="cb-cmt"># show routing table</span>
<span class="cb-prompt">$</span> ip route show                    <span class="cb-cmt"># same</span>
<span class="cb-out">default via 10.0.0.1 dev eth0 proto dhcp src 10.0.0.15 metric 100</span>
<span class="cb-out">10.0.0.0/24 dev eth0 proto kernel scope link src 10.0.0.15</span>
<span class="cb-out">169.254.0.0/16 dev eth0 scope link metric 1000</span>
<span class="cb-cmt"># "default via 10.0.0.1" = default gateway (where unknown traffic goes)
# "10.0.0.0/24 dev eth0" = local subnet (reach directly)
# ip route get 8.8.8.8  = show which route would be used</span>

<span class="cb-prompt">$</span> ip route get 8.8.8.8
<span class="cb-out">8.8.8.8 via 10.0.0.1 dev eth0 src 10.0.0.15 uid 1000</span>
<span class="cb-cmt"># "via 10.0.0.1" = go through this gateway</span>

<span class="cb-cmt">## ═══ QUICK TOOLS: hostname, my IP ════════════════════════════</span>
<span class="cb-prompt">$</span> hostname                         <span class="cb-cmt"># local hostname</span>
<span class="cb-prompt">$</span> hostname -I                      <span class="cb-cmt"># all IP addresses</span>
<span class="cb-out">10.0.0.15 172.17.0.1</span>
<span class="cb-prompt">$</span> hostname -f                      <span class="cb-cmt"># fully qualified domain name</span>
<span class="cb-prompt">$</span> curl -s ifconfig.me              <span class="cb-cmt"># public/external IP</span>
<span class="cb-out">203.0.113.100</span>
<span class="cb-prompt">$</span> curl -s ipinfo.io/ip             <span class="cb-cmt"># another public IP source</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — ping: CONNECTIVITY TEST (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>ping</code> — ICMP Connectivity Testing</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">ping — ICMP Echo Request/Reply Round Trip</text>

  <!-- Your host -->
  <rect x="40" y="60" width="140" height="50" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="110" y="83" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Your Host</text>
  <text x="110" y="99" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">10.0.0.15</text>

  <!-- Remote host -->
  <rect x="640" y="60" width="140" height="50" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="710" y="83" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Remote Host</text>
  <text x="710" y="99" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">8.8.8.8</text>

  <!-- ICMP Request arrow -->
  <line x1="180" y1="75" x2="640" y2="75" stroke="#3fb950" stroke-width="2.5" marker-end="url(#nw-grn)" class="nw-flow"/>
  <text x="410" y="65" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">ICMP Echo Request (type 8)</text>

  <!-- ICMP Reply arrow -->
  <line x1="640" y1="95" x2="180" y2="95" stroke="#58a6ff" stroke-width="2.5" marker-end="url(#nw-blu)" class="nw-flow"/>
  <text x="410" y="112" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">ICMP Echo Reply (type 0)</text>

  <!-- Animated ping pulse on remote host -->
  <circle cx="710" cy="85" r="4" fill="#58a6ff" class="nw-ping"/>

  <!-- ping output decoded -->
  <rect x="40" y="132" width="740" height="58" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="56"  y="150" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">64 bytes from </text>
  <text x="155" y="150" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">8.8.8.8</text>
  <text x="198" y="150" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">: icmp_seq=</text>
  <text x="284" y="150" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">1</text>
  <text x="298" y="150" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3"> ttl=</text>
  <text x="332" y="150" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">117</text>
  <text x="356" y="150" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3"> time=</text>
  <text x="402" y="150" font-family="'Courier New',monospace" font-size="11" fill="#f85149">22.4 ms</text>

  <text x="56"  y="170" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">64 bytes=packet size  </text>
  <text x="169" y="170" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">src IP  </text>
  <text x="210" y="170" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">  seq=packet count  </text>
  <text x="325" y="170" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">  ttl=hops remaining  </text>
  <text x="455" y="170" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">  RTT = round-trip time</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 10 — ping: all flags, TTL, flood test, specific interface, IPv6</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC PING USAGE ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> ping google.com                  <span class="cb-cmt"># continuous ping (Ctrl+C to stop)</span>
<span class="cb-prompt">$</span> ping -c 4 google.com             <span class="cb-cmt"># -c: send exactly 4 packets</span>
<span class="cb-prompt">$</span> ping -c 1 8.8.8.8                <span class="cb-cmt"># quick single test</span>

<span class="cb-cmt">## ═══ KEY FLAGS ═══════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> ping -c 4 -W 2 google.com        <span class="cb-cmt"># -W: timeout in seconds per packet</span>
<span class="cb-prompt">$</span> ping -c 4 -i 0.2 google.com      <span class="cb-cmt"># -i: interval between packets (0.2s)</span>
<span class="cb-prompt">$</span> ping -c 4 -s 1400 google.com     <span class="cb-cmt"># -s: packet size (test MTU issues)</span>
<span class="cb-prompt">$</span> ping -c 4 -t 5 google.com        <span class="cb-cmt"># -t: TTL (max hops before dying)</span>
<span class="cb-prompt">$</span> ping -c 4 -q google.com          <span class="cb-cmt"># -q: quiet (summary only)</span>
<span class="cb-prompt">$</span> ping -I eth0 google.com          <span class="cb-cmt"># -I: use specific interface</span>
<span class="cb-prompt">$</span> ping6 ::1                        <span class="cb-cmt"># ping IPv6 (loopback)</span>
<span class="cb-prompt">$</span> ping -6 google.com               <span class="cb-cmt"># force IPv6</span>

<span class="cb-cmt">## ═══ READING ping OUTPUT ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> ping -c 4 8.8.8.8
<span class="cb-out">PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.</span>
<span class="cb-out">64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=22.4 ms</span>
<span class="cb-out">64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=21.8 ms</span>
<span class="cb-out">64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=22.1 ms</span>
<span class="cb-out">64 bytes from 8.8.8.8: icmp_seq=4 ttl=117 time=22.3 ms</span>
<span class="cb-out"></span>
<span class="cb-out">--- 8.8.8.8 ping statistics ---</span>
<span class="cb-out">4 packets transmitted, 4 received, 0% packet loss, time 3004ms</span>
<span class="cb-out">rtt min/avg/max/mdev = 21.8/22.15/22.4/0.22 ms</span>
<span class="cb-cmt"># 0% loss = good
# mdev (mean deviation) = jitter — higher = less consistent network
# ttl: starts at 64 (Linux) or 128 (Windows). 117 = about 11 hops</span>

<span class="cb-cmt">## ═══ DIAGNOSING PING RESULTS ═════════════════════════════════</span>
<span class="cb-cmt"># Request timeout → host unreachable OR firewall blocks ICMP
# 100% loss → host down, route missing, or ICMP blocked
# Increasing RTT → congestion on route
# High mdev (jitter) → unstable connection
# "Destination Net Unreachable" → no route to host
# "Destination Host Unreachable" → last-hop can't reach target</span>

<span class="cb-cmt">## ═══ PING IN SCRIPTS (exit code) ════════════════════════════</span>
<span class="cb-prompt">$</span> ping -c 1 -W 2 8.8.8.8 &>/dev/null && echo "up" || echo "down"
<span class="cb-cmt"># Exit 0 = at least one reply received
# Exit 1 = no replies
# Exit 2 = error (bad arguments)</span>

check_host() {
    local HOST="$1"
    if ping -c 1 -W 3 "$HOST" &>/dev/null; then
        echo "$HOST is reachable"
    else
        echo "$HOST is UNREACHABLE" >&2
        return 1
    fi
}
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — traceroute / mtr (ANIMATED HOPS)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>traceroute</code> &amp; <code>mtr</code> — Path Discovery</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">traceroute — TTL Trick: Each Hop Decrements TTL, ICMP Time-Exceeded Reveals It</text>

  <!-- Hops -->
  <rect x="14"  y="44" width="100" height="44" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="64"  y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#3fb950">Your host</text>
  <text x="64"  y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">10.0.0.15</text>

  <line x1="114" y1="66" x2="152" y2="66" stroke="#ffa657" stroke-width="2" marker-end="url(#nw-orn)" class="nw-flow"/>
  <text x="133" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">TTL=1</text>

  <rect x="152" y="44" width="110" height="44" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="207" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#ffa657">Hop 1: Gateway</text>
  <text x="207" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">10.0.0.1</text>

  <line x1="262" y1="66" x2="300" y2="66" stroke="#ffa657" stroke-width="2" marker-end="url(#nw-orn)" class="nw-flow"/>
  <text x="281" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">TTL=2</text>

  <rect x="300" y="44" width="120" height="44" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="360" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#ffa657">Hop 2: ISP Router</text>
  <text x="360" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">100.64.0.1</text>

  <line x1="420" y1="66" x2="458" y2="66" stroke="#ffa657" stroke-width="2" marker-end="url(#nw-orn)" class="nw-flow"/>
  <text x="439" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">TTL=3</text>

  <rect x="458" y="44" width="120" height="44" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="518" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#ffa657">Hop 3: Core Router</text>
  <text x="518" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">72.14.x.x</text>

  <text x="600" y="66" font-family="'Courier New',monospace" font-size="12" fill="#30363d">···</text>

  <rect x="650" y="44" width="110" height="44" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="705" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#58a6ff">Destination</text>
  <text x="705" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#8b949e">8.8.8.8</text>

  <!-- ICMP Time-Exceeded arrows back -->
  <path d="M207,88 Q207,120 64,120 Q64,110 64,110" fill="none" stroke="#f85149" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#nw-red)"/>
  <text x="134" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#f85149">ICMP Time-Exceeded → reveals hop 1 IP</text>

  <!-- Output sample -->
  <rect x="14" y="148" width="792" height="62" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="166" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">traceroute to 8.8.8.8:</text>
  <text x="26" y="182" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3"> 1  </text>
  <text x="50" y="182" font-family="'Courier New',monospace" font-size="10.5" fill="#ffa657">10.0.0.1</text>
  <text x="120" y="182" font-family="'Courier New',monospace" font-size="10.5" fill="#3fb950">  1.234 ms  1.156 ms  1.201 ms</text>
  <text x="26" y="198" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3"> 2  </text>
  <text x="50" y="198" font-family="'Courier New',monospace" font-size="10.5" fill="#ffa657">100.64.0.1</text>
  <text x="130" y="198" font-family="'Courier New',monospace" font-size="10.5" fill="#3fb950">  8.445 ms  8.223 ms  8.389 ms</text>
  <text x="400" y="198" font-family="'Courier New',monospace" font-size="10.5" fill="#f85149">* * *</text>
  <text x="440" y="198" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">← firewall blocks ICMP (hop hidden)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 10 — traceroute, mtr, TCP traceroute, reading * * * hops</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC USAGE ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> traceroute 8.8.8.8              <span class="cb-cmt"># default: UDP probes</span>
<span class="cb-prompt">$</span> traceroute -I 8.8.8.8           <span class="cb-cmt"># -I: use ICMP (like Windows tracert)</span>
<span class="cb-prompt">$</span> traceroute -T 8.8.8.8           <span class="cb-cmt"># -T: use TCP SYN probes (port 80)</span>
<span class="cb-prompt">$</span> traceroute -T -p 443 8.8.8.8    <span class="cb-cmt"># TCP on port 443 (HTTPS)</span>
<span class="cb-prompt">$</span> traceroute -n 8.8.8.8           <span class="cb-cmt"># -n: no DNS resolution (faster)</span>
<span class="cb-prompt">$</span> traceroute -q 1 8.8.8.8         <span class="cb-cmt"># -q: 1 probe per hop (faster)</span>
<span class="cb-prompt">$</span> traceroute -m 20 8.8.8.8        <span class="cb-cmt"># -m: max hops (default 30)</span>
<span class="cb-prompt">$</span> traceroute6 google.com           <span class="cb-cmt"># IPv6 traceroute</span>

<span class="cb-cmt">## ═══ READING OUTPUT ══════════════════════════════════════════</span>
<span class="cb-out"> 1  10.0.0.1         1.2 ms  1.1 ms  1.2 ms   ← local gateway</span>
<span class="cb-out"> 2  100.64.1.1       8.4 ms  8.2 ms  8.3 ms   ← ISP router</span>
<span class="cb-out"> 3  * * *                                      ← firewall blocks ICMP</span>
<span class="cb-out"> 4  142.250.4.53    12.1 ms 11.9 ms 12.0 ms   ← Google's network</span>
<span class="cb-out"> 5  8.8.8.8         22.4 ms 21.8 ms 22.1 ms   ← destination</span>
<span class="cb-cmt"># Each number is one network hop (router)
# Three times = three probe packets
# * * * = router doesn't respond to ICMP (not necessarily a problem)
# Latency should increase with each hop (not dramatically)</span>

<span class="cb-cmt">## ═══ mtr — MY TRACEROUTE (best of both) ═════════════════════</span>
<span class="cb-cmt"># Combines ping + traceroute with live continuous updates</span>
<span class="cb-prompt">$</span> mtr 8.8.8.8                     <span class="cb-cmt"># interactive real-time</span>
<span class="cb-prompt">$</span> mtr -n 8.8.8.8                  <span class="cb-cmt"># no DNS resolution</span>
<span class="cb-prompt">$</span> mtr -r -c 10 8.8.8.8            <span class="cb-cmt"># -r: report mode, -c: 10 packets</span>
<span class="cb-out">HOST: prod-server               Loss%  Snt   Last   Avg  Best  Wrst StDev</span>
<span class="cb-out">  1. AS???  10.0.0.1             0.0%   10    1.2   1.1   0.9   1.4  0.1</span>
<span class="cb-out">  2. AS???  100.64.1.1           0.0%   10    8.3   8.2   7.9   8.6  0.2</span>
<span class="cb-out">  3. AS15169 142.250.4.53        0.0%   10   12.1  12.0  11.8  12.3  0.1</span>
<span class="cb-out">  4. AS15169 8.8.8.8             0.0%   10   22.3  22.1  21.8  22.6  0.2</span>
<span class="cb-cmt"># Loss% = packet loss at each hop
# StDev = standard deviation (jitter)
# Find where loss FIRST appears = where the problem is</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — ss AND netstat: SOCKET INSPECTION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>ss</code> &amp; <code>netstat</code> — Socket &amp; Port Inspection</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">TCP Connection States — From Listen to Established to Closed</text>

  <!-- State machine boxes -->
  <rect x="14"  y="40" width="100" height="34" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2" class="nw-blink"/>
  <text x="64"  y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#3fb950">LISTEN</text>

  <line x1="114" y1="57" x2="180" y2="57" stroke="#3fb950" stroke-width="2" marker-end="url(#nw-grn)" class="nw-flow"/>
  <text x="147" y="48" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">SYN rcvd</text>

  <rect x="180" y="40" width="120" height="34" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="240" y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">SYN_RECV</text>

  <line x1="300" y1="57" x2="380" y2="57" stroke="#58a6ff" stroke-width="2" marker-end="url(#nw-blu)" class="nw-flow"/>
  <text x="340" y="48" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#58a6ff">ACK rcvd</text>

  <rect x="380" y="40" width="150" height="34" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2.5"/>
  <text x="455" y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#3fb950">ESTABLISHED</text>

  <line x1="530" y1="57" x2="600" y2="57" stroke="#ffa657" stroke-width="2" marker-end="url(#nw-orn)"/>
  <text x="565" y="48" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">FIN sent</text>

  <rect x="600" y="40" width="120" height="34" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="660" y="61" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">FIN_WAIT_1</text>

  <line x1="720" y1="57" x2="790" y2="57" stroke="#ffa657" stroke-width="2" marker-end="url(#nw-orn)"/>
  <text x="755" y="48" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">FIN+ACK</text>

  <!-- Time Wait -->
  <rect x="600" y="100" width="120" height="34" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="660" y="121" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">TIME_WAIT</text>
  <line x1="660" y1="74" x2="660" y2="100" stroke="#f85149" stroke-width="1.5" marker-end="url(#nw-red)"/>

  <!-- CLOSE_WAIT -->
  <rect x="380" y="100" width="150" height="34" rx="6" fill="#1a1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="455" y="121" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">CLOSE_WAIT</text>
  <line x1="455" y1="74" x2="455" y2="100" stroke="#bc8cff" stroke-width="1.5" marker-end="url(#nw-pur)"/>
  <text x="479" y="94" font-family="'Segoe UI',sans-serif" font-size="8" fill="#bc8cff">passive close</text>

  <!-- ss/netstat output annotation -->
  <rect x="14" y="152" width="792" height="68" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="170" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Key states to watch for:</text>
  <text x="26" y="188" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">LISTEN </text><text x="76" y="188" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= server waiting for connections  </text>
  <text x="280" y="188" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">ESTABLISHED </text><text x="365" y="188" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= active connection  </text>
  <text x="530" y="188" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">TIME_WAIT </text><text x="606" y="188" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= closing (60s wait)</text>
  <text x="26" y="208" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">CLOSE_WAIT </text><text x="107" y="208" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= remote closed, we haven't — often a bug (app not closing sockets)  </text>
  <text x="550" y="208" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">SYN_RECV </text><text x="620" y="208" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">= half-open (SYN flood?)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 10 — ss and netstat: all options, filtering, port checks</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ss — SOCKET STATISTICS (modern, preferred) ══════════════</span>
<span class="cb-prompt">$</span> ss -tlnp            <span class="cb-cmt"># TCP listening, numeric, with process</span>
<span class="cb-out">State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process</span>
<span class="cb-out">LISTEN 0      128    0.0.0.0:22          0.0.0.0:*          sshd(pid=1234)</span>
<span class="cb-out">LISTEN 0      5      127.0.0.1:5432      0.0.0.0:*          postgres(pid=5678)</span>
<span class="cb-cmt"># -t = TCP  -u = UDP  -x = Unix sockets
# -l = listening  -n = numeric (no hostname resolution)
# -p = process (pid/name)  -a = all states (not just LISTEN)</span>

<span class="cb-prompt">$</span> ss -tlnp6           <span class="cb-cmt"># IPv6 listening only</span>
<span class="cb-prompt">$</span> ss -tnp             <span class="cb-cmt"># established TCP connections</span>
<span class="cb-prompt">$</span> ss -unlp            <span class="cb-cmt"># UDP listening</span>
<span class="cb-prompt">$</span> ss -s               <span class="cb-cmt"># summary statistics</span>
<span class="cb-out">Total: 180</span>
<span class="cb-out">TCP:   24 (estab 10, closed 5, orphaned 0, timewait 3)</span>

<span class="cb-cmt">## ═══ FILTERING WITH ss ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> ss -tnp state established         <span class="cb-cmt"># only ESTABLISHED connections</span>
<span class="cb-prompt">$</span> ss -tnp state time-wait           <span class="cb-cmt"># only TIME_WAIT</span>
<span class="cb-prompt">$</span> ss -tnp 'sport = :22'            <span class="cb-cmt"># filter by source port</span>
<span class="cb-prompt">$</span> ss -tnp 'dport = :5432'          <span class="cb-cmt"># filter by destination port</span>
<span class="cb-prompt">$</span> ss -tnp 'dst 10.0.0.50'          <span class="cb-cmt"># connections to specific IP</span>
<span class="cb-prompt">$</span> ss -tnp | grep python3            <span class="cb-cmt"># connections by process name</span>

<span class="cb-cmt">## ═══ COMMON ss USE CASES ══════════════════════════════════════</span>
<span class="cb-cmt"># Is postgres listening?</span>
<span class="cb-prompt">$</span> ss -tlnp | grep 5432
<span class="cb-out">LISTEN 0 5 127.0.0.1:5432 0.0.0.0:* postgres(5678)</span>

<span class="cb-cmt"># How many active connections to my web server?</span>
<span class="cb-prompt">$</span> ss -tnp state established 'dport = :443' | wc -l

<span class="cb-cmt"># Find process using port 8080:</span>
<span class="cb-prompt">$</span> ss -tlnp | grep ':8080'

<span class="cb-cmt"># Count connections by state:</span>
<span class="cb-prompt">$</span> ss -tan | awk 'NR>1 {print $1}' | sort | uniq -c | sort -rn
<span class="cb-out">     10 ESTABLISHED</span>
<span class="cb-out">      3 TIME-WAIT</span>
<span class="cb-out">      5 LISTEN</span>

<span class="cb-cmt">## ═══ netstat — LEGACY (but widely available) ══════════════════</span>
<span class="cb-prompt">$</span> netstat -tlnp         <span class="cb-cmt"># TCP listening (same flags as ss)</span>
<span class="cb-prompt">$</span> netstat -an           <span class="cb-cmt"># all connections, numeric</span>
<span class="cb-prompt">$</span> netstat -r            <span class="cb-cmt"># routing table (like ip route)</span>
<span class="cb-prompt">$</span> netstat -s            <span class="cb-cmt"># protocol statistics</span>
<span class="cb-cmt"># netstat is deprecated (net-tools package)
# Use ss instead — it's faster and more powerful</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — DNS: dig, nslookup, host (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> DNS Resolution — <code>dig</code>, <code>nslookup</code>, <code>host</code></h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="240" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">DNS Resolution Chain — How a Name Becomes an IP Address</text>

  <!-- Cache check -->
  <rect x="14" y="40" width="128" height="46" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="78" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Browser/OS</text>
  <text x="78" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Local cache</text>

  <line x1="142" y1="63" x2="180" y2="63" stroke="#3fb950" stroke-width="2" marker-end="url(#nw-grn)" class="nw-flow"/>
  <text x="161" y="55" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">miss</text>

  <!-- Recursive resolver -->
  <rect x="180" y="40" width="152" height="46" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="256" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Recursive Resolver</text>
  <text x="256" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">8.8.8.8 / /etc/resolv.conf</text>

  <line x1="332" y1="63" x2="370" y2="63" stroke="#58a6ff" stroke-width="2" marker-end="url(#nw-blu)" class="nw-flow"/>
  <text x="351" y="55" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#58a6ff">query</text>

  <!-- Root server -->
  <rect x="370" y="40" width="120" height="46" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="430" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Root Server</text>
  <text x="430" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">13 root servers</text>

  <line x1="490" y1="63" x2="528" y2="63" stroke="#ffa657" stroke-width="2" marker-end="url(#nw-orn)" class="nw-flow"/>
  <text x="509" y="55" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">referral</text>

  <!-- TLD server -->
  <rect x="528" y="40" width="120" height="46" rx="7" fill="#2a1428" stroke="#f85149" stroke-width="2"/>
  <text x="588" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">TLD Server</text>
  <text x="588" y="76" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">.com / .io / .org</text>

  <line x1="648" y1="63" x2="686" y2="63" stroke="#f85149" stroke-width="2" marker-end="url(#nw-red)" class="nw-flow"/>
  <text x="667" y="55" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#f85149">referral</text>

  <!-- Authoritative -->
  <rect x="686" y="40" width="120" height="46" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="746" y="57" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Authoritative</text>
  <text x="746" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">NS Server</text>
  <text x="746" y="82" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">company.com NS</text>

  <!-- Return answer -->
  <path d="M746,86 Q746,130 256,130 Q256,120 256,110" fill="none" stroke="#bc8cff" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#nw-pur)"/>
  <text x="500" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">Answer: api.company.com → 203.0.113.42 (TTL: 300s)</text>

  <!-- DNS Record Types -->
  <rect x="14" y="162" width="792" height="68" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="180" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Common DNS Record Types:</text>
  <text x="26"  y="198" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">A</text>    <text x="44"  y="198" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = hostname → IPv4  </text>
  <text x="162" y="198" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">AAAA</text> <text x="196" y="198" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = hostname → IPv6  </text>
  <text x="336" y="198" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">CNAME</text><text x="376" y="198" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = alias → canonical  </text>
  <text x="516" y="198" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">MX</text>   <text x="534" y="198" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = mail server  </text>
  <text x="636" y="198" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">TXT</text>  <text x="658" y="198" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = text (SPF, DKIM, verify)</text>
  <text x="26"  y="220" font-family="'Courier New',monospace" font-size="10" fill="#f85149">NS</text>   <text x="44"  y="220" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = nameserver for domain  </text>
  <text x="200" y="220" font-family="'Courier New',monospace" font-size="10" fill="#f85149">PTR</text>  <text x="228" y="220" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = reverse lookup (IP → hostname)  </text>
  <text x="430" y="220" font-family="'Courier New',monospace" font-size="10" fill="#f85149">SOA</text>  <text x="460" y="220" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = start of authority (zone info)  </text>
  <text x="646" y="220" font-family="'Courier New',monospace" font-size="10" fill="#f85149">SRV</text>  <text x="676" y="220" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = service locator</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 10 — dig: all record types, trace, short, MX, TXT, reverse, /etc/resolv.conf</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ dig BASICS ══════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> dig google.com                  <span class="cb-cmt"># A record (IPv4)</span>
<span class="cb-prompt">$</span> dig google.com A                 <span class="cb-cmt"># explicit type</span>
<span class="cb-prompt">$</span> dig +short google.com            <span class="cb-cmt"># just the answer</span>
<span class="cb-out">142.250.80.46</span>

<span class="cb-cmt">## ═══ RECORD TYPES ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> dig google.com AAAA              <span class="cb-cmt"># IPv6 address</span>
<span class="cb-prompt">$</span> dig google.com MX                <span class="cb-cmt"># mail servers</span>
<span class="cb-out">google.com.  MX  10 smtp.google.com.</span>
<span class="cb-prompt">$</span> dig google.com NS                <span class="cb-cmt"># nameservers</span>
<span class="cb-prompt">$</span> dig google.com TXT               <span class="cb-cmt"># TXT records (SPF, DKIM, verification)</span>
<span class="cb-prompt">$</span> dig google.com SOA               <span class="cb-cmt"># zone authority record</span>
<span class="cb-prompt">$</span> dig google.com ANY               <span class="cb-cmt"># all records (not always returned)</span>
<span class="cb-prompt">$</span> dig -x 8.8.8.8                   <span class="cb-cmt"># reverse lookup (PTR)</span>
<span class="cb-out">8.8.8.8.in-addr.arpa.  PTR  dns.google.</span>

<span class="cb-cmt">## ═══ CHOOSING DNS SERVER ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> dig @8.8.8.8 google.com          <span class="cb-cmt"># use Google's DNS</span>
<span class="cb-prompt">$</span> dig @1.1.1.1 google.com          <span class="cb-cmt"># use Cloudflare's DNS</span>
<span class="cb-prompt">$</span> dig @localhost google.com        <span class="cb-cmt"># use local resolver</span>
<span class="cb-cmt"># Useful for: compare results from different DNS servers
# Debugging: does my DNS vs 8.8.8.8 return different answers?</span>

<span class="cb-cmt">## ═══ FULL TRACE (see entire resolution chain) ════════════════</span>
<span class="cb-prompt">$</span> dig +trace google.com
<span class="cb-out">;; Querying the root servers directly...</span>
<span class="cb-out">.         518400  NS  a.root-servers.net.</span>
<span class="cb-out">com.      172800  NS  a.gtld-servers.net.</span>
<span class="cb-out">google.com. 172800 NS ns1.google.com.</span>
<span class="cb-out">google.com. 300    A  142.250.80.46</span>

<span class="cb-cmt">## ═══ READING dig OUTPUT ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> dig google.com
<span class="cb-out">;; QUESTION SECTION:</span>
<span class="cb-out">;google.com.   IN  A</span>
<span class="cb-out"></span>
<span class="cb-out">;; ANSWER SECTION:</span>
<span class="cb-out">google.com.  300  IN  A  142.250.80.46</span>
<span class="cb-cmt">#             ↑          ↑  ↑
#             TTL (300s)  IN=Internet class  A=record type  IP=answer</span>

<span class="cb-out">;; Query time: 12 msec</span>
<span class="cb-out">;; SERVER: 8.8.8.8#53</span>    <span class="cb-cmt">← which DNS server answered</span>

<span class="cb-cmt">## ═══ /etc/resolv.conf — DNS CONFIGURATION ═══════════════════</span>
<span class="cb-prompt">$</span> cat /etc/resolv.conf
<span class="cb-out">nameserver 8.8.8.8        # primary DNS server</span>
<span class="cb-out">nameserver 8.8.4.4        # fallback DNS</span>
<span class="cb-out">search company.com        # appended to short names</span>
<span class="cb-out">options ndots:1           # names with < 1 dot → search first</span>

<span class="cb-cmt">## ═══ host AND nslookup — SIMPLER TOOLS ══════════════════════</span>
<span class="cb-prompt">$</span> host google.com                 <span class="cb-cmt"># simple lookup</span>
<span class="cb-out">google.com has address 142.250.80.46</span>
<span class="cb-prompt">$</span> host -t MX google.com           <span class="cb-cmt"># specific type</span>
<span class="cb-prompt">$</span> host 8.8.8.8                    <span class="cb-cmt"># reverse lookup</span>
<span class="cb-prompt">$</span> nslookup google.com             <span class="cb-cmt"># interactive or one-shot</span>
<span class="cb-prompt">$</span> nslookup google.com 8.8.8.8    <span class="cb-cmt"># use specific server</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — curl: THE SWISS ARMY KNIFE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>curl</code> — HTTP Client &amp; API Tool</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">HTTP Request/Response Flow — What curl Does</text>

  <!-- curl client -->
  <rect x="14" y="40" width="150" height="50" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="89" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">curl client</text>
  <text x="89" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">your machine</text>

  <!-- Request arrow -->
  <line x1="164" y1="58" x2="330" y2="58" stroke="#3fb950" stroke-width="2.5" marker-end="url(#nw-grn)" class="nw-flow"/>
  <text x="247" y="48" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">HTTP REQUEST</text>
  <text x="247" y="70" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">GET /api/data HTTP/2</text>

  <!-- Web server -->
  <rect x="330" y="40" width="160" height="50" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="410" y="62" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Web Server</text>
  <text x="410" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">api.example.com</text>

  <!-- Response arrow -->
  <line x1="330" y1="78" x2="164" y2="78" stroke="#58a6ff" stroke-width="2.5" marker-end="url(#nw-blu)" class="nw-flow"/>
  <text x="247" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">HTTP RESPONSE</text>

  <!-- Response breakdown -->
  <rect x="510" y="34" width="296" height="100" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="658" y="52" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">HTTP Response Components</text>
  <text x="520" y="68" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">HTTP/2 200 OK</text>
  <text x="520" y="82" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">Content-Type: application/json</text>
  <text x="520" y="96" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">X-RateLimit-Remaining: 99</text>
  <text x="520" y="110" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">&lt;blank line&gt;</text>
  <text x="520" y="126" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">{"data": [...], "total": 42}</text>

  <!-- Status codes -->
  <rect x="14" y="108" width="482" height="80" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="126" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">HTTP Status Codes:</text>
  <text x="26" y="144" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">2xx</text><text x="54" y="144" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> 200 OK  201 Created  204 No Content  206 Partial Content</text>
  <text x="26" y="160" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">3xx</text><text x="54" y="160" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> 301 Moved  302 Found  304 Not Modified  307 Temp Redirect</text>
  <text x="26" y="176" font-family="'Courier New',monospace" font-size="10" fill="#f85149">4xx</text><text x="54" y="176" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> 400 Bad Request  401 Unauth  403 Forbidden  404 Not Found  429 Rate Limited</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 10 — curl: GET/POST, headers, auth, TLS, download, timing</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC REQUESTS ═════════════════════════════════════════</span>
<span class="cb-prompt">$</span> curl https://api.example.com/data          <span class="cb-cmt"># GET (default)</span>
<span class="cb-prompt">$</span> curl -s https://api.example.com/data       <span class="cb-cmt"># -s: silent (no progress bar)</span>
<span class="cb-prompt">$</span> curl -sI https://api.example.com           <span class="cb-cmt"># -I: headers only (HEAD)</span>
<span class="cb-out">HTTP/2 200</span>
<span class="cb-out">content-type: application/json</span>
<span class="cb-out">x-ratelimit-remaining: 99</span>

<span class="cb-cmt">## ═══ HTTP METHODS ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> curl -X GET    https://api.example.com/users
<span class="cb-prompt">$</span> curl -X POST   https://api.example.com/users   -d '{"name":"ravi"}'
<span class="cb-prompt">$</span> curl -X PUT    https://api.example.com/users/1 -d '{"name":"ravi"}'
<span class="cb-prompt">$</span> curl -X PATCH  https://api.example.com/users/1 -d '{"email":"r@e.io"}'
<span class="cb-prompt">$</span> curl -X DELETE https://api.example.com/users/1

<span class="cb-cmt">## ═══ HEADERS AND AUTHENTICATION ═════════════════════════════</span>
<span class="cb-prompt">$</span> curl -H "Authorization: Bearer eyJhb..." https://api.example.com/data
<span class="cb-prompt">$</span> curl -H "Content-Type: application/json" -H "Accept: application/json" ...
<span class="cb-prompt">$</span> curl -u username:password https://api.example.com/data   <span class="cb-cmt"># Basic auth</span>
<span class="cb-prompt">$</span> curl -H "X-API-Key: abc123" https://api.example.com/data

<span class="cb-cmt">## ═══ POST WITH JSON ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> curl -s -X POST \
     -H "Content-Type: application/json" \
     -d '{"date":"2024-01-15","records":1000}' \
     https://api.example.com/jobs
<span class="cb-cmt"># Or from file:</span>
<span class="cb-prompt">$</span> curl -s -X POST -H "Content-Type: application/json" \
     -d @payload.json https://api.example.com/jobs

<span class="cb-cmt">## ═══ TLS / CERTIFICATES ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> curl -k https://self-signed.example.com   <span class="cb-cmt"># -k: skip cert verification (dev only!)</span>
<span class="cb-prompt">$</span> curl --cacert /path/to/ca.crt https://internal.example.com
<span class="cb-prompt">$</span> curl --cert /path/to/client.crt --key /path/to/client.key https://...

<span class="cb-cmt">## ═══ DOWNLOADING FILES ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> curl -O https://example.com/file.csv       <span class="cb-cmt"># -O: save with remote filename</span>
<span class="cb-prompt">$</span> curl -o output.csv https://example.com/file  <span class="cb-cmt"># -o: custom local filename</span>
<span class="cb-prompt">$</span> curl -L -O https://example.com/file        <span class="cb-cmt"># -L: follow redirects</span>
<span class="cb-prompt">$</span> curl -C - -O https://example.com/large.csv <span class="cb-cmt"># -C -: resume download</span>
<span class="cb-prompt">$</span> curl --limit-rate 1M -O https://...        <span class="cb-cmt"># limit bandwidth to 1MB/s</span>

<span class="cb-cmt">## ═══ USEFUL COMBINATIONS ════════════════════════════════════</span>
<span class="cb-cmt"># Pretty print JSON response:</span>
<span class="cb-prompt">$</span> curl -s https://api.example.com/data | python3 -m json.tool
<span class="cb-prompt">$</span> curl -s https://api.example.com/data | jq .

<span class="cb-cmt"># Show request+response details:</span>
<span class="cb-prompt">$</span> curl -v https://api.example.com/data 2>&1 | head -40

<span class="cb-cmt"># Timing breakdown (very useful for debugging):</span>
<span class="cb-prompt">$</span> curl -s -o /dev/null -w "
    DNS:     %{time_namelookup}s
    Connect: %{time_connect}s
    TLS:     %{time_appconnect}s
    TTFB:    %{time_starttransfer}s
    Total:   %{time_total}s
    HTTP:    %{http_code}
" https://api.example.com/data
<span class="cb-out">    DNS:     0.012s</span>
<span class="cb-out">    Connect: 0.035s</span>
<span class="cb-out">    TLS:     0.089s</span>
<span class="cb-out">    TTFB:    0.124s</span>
<span class="cb-out">    Total:   0.134s</span>
<span class="cb-out">    HTTP:    200</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — nc, nmap, tcpdump
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>nc</code>, <code>nmap</code>, <code>tcpdump</code> — Probing &amp; Capturing</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 10 — nc: port test, simple server; nmap: port scan; tcpdump: packet capture</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ nc (netcat) — THE TCP SWISS ARMY KNIFE ═════════════════</span>
<span class="cb-cmt"># Port test (is port open?):</span>
<span class="cb-prompt">$</span> nc -zv server 5432            <span class="cb-cmt"># -z: don't send data -v: verbose</span>
<span class="cb-out">Connection to server 5432 port [tcp/postgresql] succeeded!</span>
<span class="cb-prompt">$</span> nc -zv -w 3 server 5432       <span class="cb-cmt"># -w 3: timeout in 3 seconds</span>

<span class="cb-cmt"># Port scan (multiple ports):</span>
<span class="cb-prompt">$</span> nc -zv server 80 443 8080     <span class="cb-cmt"># test multiple ports</span>
<span class="cb-prompt">$</span> nc -zv server 1-1024 2>&1 | grep succeeded  <span class="cb-cmt"># scan range</span>

<span class="cb-cmt"># Simple TCP server (listen for data):</span>
<span class="cb-prompt">$</span> nc -l -p 9999                 <span class="cb-cmt"># listen on port 9999</span>
<span class="cb-cmt"># In another terminal:</span>
<span class="cb-prompt">$</span> echo "hello world" | nc localhost 9999

<span class="cb-cmt"># Transfer a file:</span>
<span class="cb-cmt"># Receiver:   nc -l -p 9999 > received_file.csv</span>
<span class="cb-cmt"># Sender:     nc receiver_ip 9999 < file.csv</span>

<span class="cb-cmt"># In scripts (check before connecting):</span>
check_port() {
    nc -zw 3 "$1" "$2" 2>/dev/null
}
check_port db.internal 5432 && echo "DB reachable" || echo "DB unreachable"

<span class="cb-cmt">## ═══ nmap — PORT SCANNER ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> nmap server.example.com          <span class="cb-cmt"># scan common ports</span>
<span class="cb-prompt">$</span> nmap -p 22,80,443,5432 server    <span class="cb-cmt"># specific ports</span>
<span class="cb-prompt">$</span> nmap -p 1-1024 server            <span class="cb-cmt"># range</span>
<span class="cb-prompt">$</span> nmap -p- server                  <span class="cb-cmt"># all 65535 ports</span>
<span class="cb-prompt">$</span> nmap -sV server                  <span class="cb-cmt"># -sV: detect service versions</span>
<span class="cb-prompt">$</span> nmap -sn 10.0.0.0/24             <span class="cb-cmt"># -sn: ping sweep (no port scan)</span>
<span class="cb-out">Nmap scan report for server (10.0.0.15)</span>
<span class="cb-out">PORT     STATE  SERVICE  VERSION</span>
<span class="cb-out">22/tcp   open   ssh      OpenSSH 8.9</span>
<span class="cb-out">80/tcp   closed http</span>
<span class="cb-out">443/tcp  open   https    nginx 1.22</span>
<span class="cb-out">5432/tcp open   postgres PostgreSQL 14</span>

<span class="cb-cmt">## ═══ tcpdump — PACKET CAPTURE ════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo tcpdump -i eth0             <span class="cb-cmt"># capture all on interface</span>
<span class="cb-prompt">$</span> sudo tcpdump -i eth0 port 5432  <span class="cb-cmt"># postgres traffic only</span>
<span class="cb-prompt">$</span> sudo tcpdump -i eth0 host 8.8.8.8  <span class="cb-cmt"># traffic to/from specific host</span>
<span class="cb-prompt">$</span> sudo tcpdump -i eth0 'tcp port 443 and host api.example.com'
<span class="cb-prompt">$</span> sudo tcpdump -i eth0 -n          <span class="cb-cmt"># -n: no DNS resolution (faster)</span>
<span class="cb-prompt">$</span> sudo tcpdump -i eth0 -w dump.pcap  <span class="cb-cmt"># save to file (open in Wireshark)</span>
<span class="cb-prompt">$</span> sudo tcpdump -r dump.pcap         <span class="cb-cmt"># read saved file</span>
<span class="cb-cmt"># BPF filter syntax:
# host, port, src, dst, net, tcp, udp, icmp
# and, or, not  — boolean operators
# Example: 'tcp and port 80 and src 10.0.0.15'</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — BANDWIDTH MONITORING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Bandwidth &amp; Traffic Monitoring</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Network Monitoring Tools — Bandwidth, Connections, Throughput</text>

  <!-- Tool boxes -->
  <rect x="14"  y="36" width="150" height="70" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.8"/>
  <text x="89"  y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#3fb950">iftop</text>
  <text x="89"  y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">live per-connection</text>
  <text x="89"  y="86" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">bandwidth usage</text>
  <text x="89"  y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">interactive, top-like</text>

  <rect x="176" y="36" width="150" height="70" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.8"/>
  <text x="251" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#58a6ff">nethogs</text>
  <text x="251" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">per-process</text>
  <text x="251" y="86" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">bandwidth usage</text>
  <text x="251" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">"which app is using BW?"</text>

  <rect x="338" y="36" width="150" height="70" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="1.8"/>
  <text x="413" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#ffa657">nload</text>
  <text x="413" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">interface total</text>
  <text x="413" y="86" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">IN / OUT bandwidth</text>
  <text x="413" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">bar graphs, simple</text>

  <rect x="500" y="36" width="150" height="70" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="1.8"/>
  <text x="575" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#bc8cff">iperf3</text>
  <text x="575" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">throughput test</text>
  <text x="575" y="86" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">client-server model</text>
  <text x="575" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">max network capacity</text>

  <rect x="662" y="36" width="144" height="70" rx="8" fill="#1a1a1a" stroke="#30363d" stroke-width="1.8"/>
  <text x="734" y="56" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" font-weight="bold" fill="#8b949e">vnstat</text>
  <text x="734" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">historical traffic</text>
  <text x="734" y="86" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">daily/monthly stats</text>
  <text x="734" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">low overhead daemon</text>

  <!-- /proc/net/dev note -->
  <rect x="14" y="118" width="792" height="52" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="136" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Built-in: /proc/net/dev  — read interface counters directly (no package needed)</text>
  <text x="26" y="152" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">cat /proc/net/dev   # bytes/packets TX and RX per interface</text>
  <text x="26" y="166" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">ip -s link show eth0   # same info via iproute2  (RX/TX bytes, errors, drops)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 10 — iftop, nethogs, iperf3, /proc/net/dev, ip -s, ss -s</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ iftop — PER-CONNECTION BANDWIDTH ══════════════════════</span>
<span class="cb-prompt">$</span> sudo iftop -i eth0               <span class="cb-cmt"># interactive display</span>
<span class="cb-prompt">$</span> sudo iftop -i eth0 -n            <span class="cb-cmt"># no hostname resolution</span>
<span class="cb-prompt">$</span> sudo iftop -i eth0 -f 'port 5432'  <span class="cb-cmt"># filter to postgres</span>
<span class="cb-cmt"># iftop shows: source → destination and bandwidth each direction
# Press 'q' to quit, 'n' to toggle DNS, 'p' to toggle ports</span>

<span class="cb-cmt">## ═══ nethogs — PER-PROCESS BANDWIDTH ════════════════════════</span>
<span class="cb-prompt">$</span> sudo nethogs eth0                <span class="cb-cmt"># show per-process bandwidth</span>
<span class="cb-out">PID     USER    PROGRAM                SENT    RECEIVED</span>
<span class="cb-out">5001    ravi    python3 etl.py         12.5 KB  1.2 MB</span>
<span class="cb-out">1234    root    sshd: ravi@pts/0        0.5 KB  0.1 KB</span>
<span class="cb-cmt"># "which process is using all my bandwidth?" → nethogs</span>

<span class="cb-cmt">## ═══ iperf3 — NETWORK THROUGHPUT TEST ═══════════════════════</span>
<span class="cb-cmt"># On server (receive):</span>
<span class="cb-prompt">$</span> iperf3 -s                        <span class="cb-cmt"># server mode, port 5201</span>
<span class="cb-prompt">$</span> iperf3 -s -p 9000                <span class="cb-cmt"># custom port</span>

<span class="cb-cmt"># On client (send):</span>
<span class="cb-prompt">$</span> iperf3 -c server.example.com     <span class="cb-cmt"># test to server</span>
<span class="cb-out">Connecting to host server.example.com, port 5201</span>
<span class="cb-out">[ ID] Interval    Transfer    Bitrate</span>
<span class="cb-out">[  5]  0.0-10.0s  1.10 GBytes  944 Mbits/sec</span>
<span class="cb-prompt">$</span> iperf3 -c server -R              <span class="cb-cmt"># -R: reverse (server sends, client receives)</span>
<span class="cb-prompt">$</span> iperf3 -c server -u -b 100M      <span class="cb-cmt"># -u: UDP test at 100 Mbps</span>
<span class="cb-prompt">$</span> iperf3 -c server -t 30           <span class="cb-cmt"># test for 30 seconds</span>

<span class="cb-cmt">## ═══ BUILT-IN: INTERFACE STATISTICS ═════════════════════════</span>
<span class="cb-prompt">$</span> ip -s link show eth0
<span class="cb-out">2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; ...</span>
<span class="cb-out">    RX:  bytes   packets  errors  dropped  missed  mcast</span>
<span class="cb-out">     8521234    65432       0        0        0      0</span>
<span class="cb-out">    TX:  bytes   packets  errors  dropped  carrier  collisions</span>
<span class="cb-out">      543123     5432       0        0        0        0</span>
<span class="cb-cmt"># errors > 0 = hardware/cable problem
# dropped > 0 = overloaded buffer</span>

<span class="cb-prompt">$</span> cat /proc/net/dev                 <span class="cb-cmt"># raw interface counters</span>
<span class="cb-prompt">$</span> ss -s                             <span class="cb-cmt"># socket summary statistics</span>
<span class="cb-out">Total: 180 (kernel 220)</span>
<span class="cb-out">TCP:  24 (estab 10, closed 5, orphaned 0, timewait 3)</span>
<span class="cb-out">UDP:  8 0</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — TCP Stack, Socket Lifecycle, Routing</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ TCP/IP in the Linux Kernel — Sockets, sk_buff, Routing Table, Netfilter</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. SOCKET LIFECYCLE IN THE KERNEL

   User calls: socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)
   → Kernel creates struct sock in memory
   → File descriptor returned, backed by socket file

   connect() → TCP three-way handshake:
     Client: SYN           (ISN = random Initial Sequence Number)
     Server: SYN+ACK       (server's ISN, ack = client ISN + 1)
     Client: ACK           (ack = server ISN + 1)
   → State: ESTABLISHED
   
   Data flows via sk_buff (socket buffer):
   - Each packet = one sk_buff structure
   - sk_buff holds pointer to packet data + metadata
   - Passed down through layers (TCP → IP → NIC driver)
   
   Receive path: NIC driver → softirq → IP → TCP → sock receive buffer
   Send path: write() → TCP segment → IP header → NIC queue

2. TCP SEND AND RECEIVE BUFFERS

   ss -tlnp shows: Recv-Q and Send-Q
   
   Send-Q: bytes sent but not yet ACK'd (in-flight)
   Recv-Q (on LISTEN): incoming connections not yet accept()'d
   Recv-Q (ESTABLISHED): bytes received but app hasn't read yet
   
   Large Send-Q: slow receiver or congestion
   Large Recv-Q: application not reading fast enough
   
   Buffer sizes configurable via sysctl:
   /proc/sys/net/core/rmem_max    (max receive buffer)
   /proc/sys/net/core/wmem_max    (max send buffer)
   /proc/sys/net/ipv4/tcp_rmem   (min/default/max for TCP receive)
   /proc/sys/net/ipv4/tcp_wmem   (min/default/max for TCP send)

3. ROUTING TABLE LOOKUP

   When kernel needs to send a packet:
   1. Look up destination IP in routing table (ECMP if multiple)
   2. Find best match: most specific prefix wins (/32 > /24 > /0)
   3. Get next-hop gateway from route
   4. ARP lookup: get MAC address of gateway
   5. Send frame to gateway's MAC on the interface
   
   Routing table stored in: struct fib_table (Forwarding Info Base)
   Cached for fast lookup in: route cache / neighbour cache
   
   ip route show = reads from /proc/net/route (simplified)
   ip route get 8.8.8.8 = simulates full routing lookup

4. NETFILTER / iptables

   Kernel framework for packet filtering, NAT, mangling.
   Hooks at 5 points in packet path:
   
   PREROUTING → FORWARD → POSTROUTING   (forwarded packets)
   PREROUTING → INPUT                    (local delivery)
   OUTPUT → POSTROUTING                  (locally generated)
   
   Tables: filter (deny/allow), nat (rewrite), mangle (modify headers)
   nftables is the modern replacement for iptables.
   
   iptables -L -n        list all rules
   iptables -L -n -v     with packet counts
   iptables -L INPUT -n  list INPUT chain only

5. TIME_WAIT AND PORT EXHAUSTION

   After connection closes, TCP stays in TIME_WAIT for 2×MSL (60s).
   This prevents stale packets from old connections being misdelivered.
   
   On high-connection-rate servers, TIME_WAIT connections accumulate.
   Solutions:
   - SO_REUSEADDR: allow binding to port in TIME_WAIT
   - tcp_tw_reuse: reuse TIME_WAIT connections for new outgoing
   - tcp_fin_timeout: reduce from 60s (be careful)
   
   ss -tan | grep TIME-WAIT | wc -l   (count TIME_WAIT connections)
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Network Debugging &amp; Data Engineering</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 10 — Production debugging scripts, API monitoring, health checks</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: LAYERED NETWORK DEBUGGER ════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">debug_connection() {</span>
<span class="cb-out">    local HOST="$1" PORT="\${2:-80}"</span>
<span class="cb-out">    echo "=== Debugging $HOST:$PORT ==="</span>
<span class="cb-out"></span>
<span class="cb-out">    echo "--- DNS ---"</span>
<span class="cb-out">    IP=$(dig +short "$HOST" | head -1)</span>
<span class="cb-out">    [[ -z $IP ]] && { echo "❌ DNS FAIL: $HOST cannot be resolved"; return 1; }</span>
<span class="cb-out">    echo "✅ DNS: $HOST → $IP"</span>
<span class="cb-out"></span>
<span class="cb-out">    echo "--- ICMP ---"</span>
<span class="cb-out">    if ping -c 1 -W 3 "$HOST" &>/dev/null; then</span>
<span class="cb-out">        RTT=$(ping -c 1 "$HOST" 2>/dev/null | grep 'time=' | grep -oP 'time=\K[0-9.]+')</span>
<span class="cb-out">        echo "✅ PING: $HOST reachable (\${RTT}ms)"</span>
<span class="cb-out">    else</span>
<span class="cb-out">        echo "⚠  PING: Host unreachable or ICMP blocked"</span>
<span class="cb-out">    fi</span>
<span class="cb-out"></span>
<span class="cb-out">    echo "--- TCP Port ---"</span>
<span class="cb-out">    if nc -zw 3 "$HOST" "$PORT" 2>/dev/null; then</span>
<span class="cb-out">        echo "✅ PORT $PORT: Open"</span>
<span class="cb-out">    else</span>
<span class="cb-out">        echo "❌ PORT $PORT: Closed or filtered"; return 1</span>
<span class="cb-out">    fi</span>
<span class="cb-out"></span>
<span class="cb-out">    if (( PORT == 80 || PORT == 443 )); then</span>
<span class="cb-out">        echo "--- HTTP ---"</span>
<span class="cb-out">        local PROTO="http"; (( PORT == 443 )) && PROTO="https"</span>
<span class="cb-out">        local STATUS</span>
<span class="cb-out">        STATUS=$(curl -sI -o /dev/null -w "%{http_code}" --connect-timeout 5 "$PROTO://$HOST/")</span>
<span class="cb-out">        echo "✅ HTTP: Status $STATUS"</span>
<span class="cb-out">    fi</span>
<span class="cb-out">}</span>
<span class="cb-out">debug_connection api.datasource.io 443</span>

<span class="cb-cmt">## ═══ PATTERN 2: API HEALTH MONITOR ══════════════════════════</span>
monitor_api() {
    local ENDPOINT="$1" INTERVAL="\${2:-60}"
    local LOG="/var/log/api-monitor.log"
    while true; do
        local TS CODE TTFB
        TS=$(date +%Y-%m-%dT%H:%M:%S)
        read -r CODE TTFB < <(curl -s -o /dev/null \
            -w "%{http_code} %{time_starttransfer}" \
            --connect-timeout 10 --max-time 30 \
            "$ENDPOINT")
        if [[ $CODE -ge 200 && $CODE -lt 300 ]]; then
            printf "%s ✅ %s: HTTP %s TTFB %.3fs\n" "$TS" "$ENDPOINT" "$CODE" "$TTFB" | tee -a "$LOG"
        else
            printf "%s ❌ %s: HTTP %s TTFB %.3fs\n" "$TS" "$ENDPOINT" "$CODE" "$TTFB" | tee -a "$LOG" >&2
            curl -s -X POST "$SLACK_WEBHOOK" -d "{\"text\":\"API DOWN: $ENDPOINT returned $CODE\"}"
        fi
        sleep "$INTERVAL"
    done
}

<span class="cb-cmt">## ═══ PATTERN 3: PORT SCANNER FOR SERVICE VALIDATION ═════════</span>
check_services() {
    local HOST="\${1:-localhost}"
    declare -A EXPECTED=(
        [ssh]=22  [http]=80  [https]=443
        [postgres]=5432  [redis]=6379  [app]=8080
    )
    local ALL_OK=true
    for SERVICE in "\${!EXPECTED[@]}"; do
        PORT="\${EXPECTED[$SERVICE]}"
        if nc -zw 2 "$HOST" "$PORT" 2>/dev/null; then
            echo "✅ $SERVICE (:$PORT)"
        else
            echo "❌ $SERVICE (:$PORT) NOT LISTENING" >&2
            ALL_OK=false
        fi
    done
    $ALL_OK && echo "All services up" || { echo "Some services DOWN!" >&2; return 1; }
}

<span class="cb-cmt">## ═══ PATTERN 4: DNS CACHE COMPARISON ════════════════════════</span>
compare_dns() {
    local DOMAIN="$1"
    echo "=== DNS comparison for $DOMAIN ==="
    for SERVER in "local" "8.8.8.8" "1.1.1.1" "9.9.9.9"; do
        if [[ $SERVER == "local" ]]; then
            RESULT=$(dig +short "$DOMAIN")
        else
            RESULT=$(dig +short "@$SERVER" "$DOMAIN")
        fi
        printf "%-12s → %s\n" "$SERVER" "\${RESULT:-FAIL}"
    done
}
compare_dns api.datasource.io
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — All Network Commands</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:24%">Command</th><th>Purpose</th><th style="width:28%">Key Flags</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">Network Layer — Interfaces &amp; Routing</td></tr>
<tr><td style="font-family:monospace;">ip addr [show]</td><td>View IP addresses on all interfaces</td><td><code>-brief</code> compact, <code>-4/-6</code> IPv4/6, <code>show eth0</code></td></tr>
<tr><td style="font-family:monospace;">ip link show</td><td>View network interfaces and state</td><td><code>set eth0 up/down</code> to toggle</td></tr>
<tr><td style="font-family:monospace;">ip route [show]</td><td>Show routing table</td><td><code>get 8.8.8.8</code> to trace route</td></tr>
<tr><td style="font-family:monospace;">ping -c 4 host</td><td>ICMP echo test, measure RTT</td><td><code>-W</code> timeout, <code>-i</code> interval, <code>-s</code> size, <code>-I</code> interface</td></tr>
<tr><td style="font-family:monospace;">traceroute host</td><td>Show path (hops) to destination</td><td><code>-I</code> ICMP, <code>-T</code> TCP, <code>-n</code> no DNS, <code>-q 1</code> 1 probe</td></tr>
<tr><td style="font-family:monospace;">mtr -r -c 10 host</td><td>Combined ping+traceroute with stats</td><td><code>-n</code> no DNS, <code>-r</code> report mode</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Transport Layer — Sockets &amp; Ports</td></tr>
<tr><td style="font-family:monospace;">ss -tlnp</td><td>List listening TCP ports with PIDs</td><td><code>-u</code> UDP, <code>-a</code> all, <code>-s</code> summary, filter with <code>state</code></td></tr>
<tr><td style="font-family:monospace;">nc -zv host port</td><td>Test if TCP port is open</td><td><code>-w</code> timeout, <code>-l -p</code> listen mode, <code>-u</code> UDP</td></tr>
<tr><td style="font-family:monospace;">nmap -p ports host</td><td>Port scanner with service detection</td><td><code>-sV</code> version, <code>-sn</code> ping sweep, <code>-p-</code> all ports</td></tr>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Application Layer — DNS, HTTP, Transfer</td></tr>
<tr><td style="font-family:monospace;">dig host [type]</td><td>DNS lookup — most powerful</td><td><code>+short</code>, <code>+trace</code>, <code>@server</code>, <code>-x</code> reverse</td></tr>
<tr><td style="font-family:monospace;">host domain</td><td>Simple DNS lookup</td><td><code>-t MX/NS/TXT</code> record type</td></tr>
<tr><td style="font-family:monospace;">curl -s URL</td><td>HTTP client — GET, POST, headers</td><td><code>-I</code> headers, <code>-X</code> method, <code>-H</code> header, <code>-d</code> data</td></tr>
<tr><td style="font-family:monospace;">wget URL</td><td>File downloader with resume</td><td><code>-c</code> continue, <code>-q</code> quiet, <code>--limit-rate</code></td></tr>
<tr><td colspan="3" style="background:#1f1428;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Capture &amp; Monitoring</td></tr>
<tr><td style="font-family:monospace;">tcpdump -i eth0</td><td>Packet capture and analysis</td><td><code>-n</code> no DNS, <code>-w file.pcap</code> save, BPF filters</td></tr>
<tr><td style="font-family:monospace;">sudo iftop -i eth0</td><td>Per-connection live bandwidth</td><td><code>-n</code> no DNS, <code>-f</code> filter</td></tr>
<tr><td style="font-family:monospace;">sudo nethogs eth0</td><td>Per-process bandwidth usage</td><td>Shows which app uses bandwidth</td></tr>
<tr><td style="font-family:monospace;">iperf3 -c server</td><td>Network throughput test</td><td><code>-R</code> reverse, <code>-u</code> UDP, <code>-t</code> duration</td></tr>
<tr><td style="font-family:monospace;">ip -s link show</td><td>Interface stats (RX/TX/errors)</td><td>Built-in, always available</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Interface and Connectivity</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Use <code>ip addr</code> to find your machine's IP address, subnet mask (CIDR), and MAC address</li>
      <li>Use <code>ip route</code> to find the default gateway. What does "default via X.X.X.X" mean?</li>
      <li>Use <code>ip route get 8.8.8.8</code> — which interface and gateway would be used?</li>
      <li>Ping 127.0.0.1 (loopback) and 8.8.8.8 with 4 packets each. Explain the TTL difference.</li>
      <li>Use <code>hostname -I</code> to list all IPs. Compare with <code>ip addr</code> output.</li>
      <li>Run <code>traceroute 8.8.8.8</code> — count the hops, identify where latency jumps significantly.</li>
      <li>Use <code>mtr -r -c 5 8.8.8.8</code> — which hop has the highest packet loss?</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — DNS and Ports</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Use <code>dig google.com</code> — identify the TTL value. What does it mean?</li>
      <li>Use <code>dig +short google.com MX</code> to find Google's mail servers</li>
      <li>Use <code>dig +trace google.com</code> — identify each level of the DNS hierarchy</li>
      <li>Compare: <code>dig @8.8.8.8 google.com +short</code> vs <code>dig @1.1.1.1 google.com +short</code></li>
      <li>Use <code>dig -x 8.8.8.8</code> — what hostname does Google's DNS server have?</li>
      <li>Use <code>ss -tlnp</code> to list all listening TCP ports on your machine. Identify which service owns each.</li>
      <li>Use <code>nc -zv localhost 22</code> — verify SSH is listening locally</li>
      <li>Count total ESTABLISHED connections: <code>ss -tn state established | wc -l</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — curl and HTTP</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Use <code>curl -sI https://google.com</code> — what status code does it return? Why?</li>
      <li>Follow the redirect: <code>curl -sIL https://google.com</code> — how many redirects?</li>
      <li>Use the timing format to measure DNS, connect, TLS, and total time for https://google.com</li>
      <li>Fetch the JSONPlaceholder API: <code>curl -s https://jsonplaceholder.typicode.com/posts/1 | python3 -m json.tool</code></li>
      <li>POST a new resource: <code>curl -X POST -H "Content-Type: application/json" -d '{"title":"test"}' https://jsonplaceholder.typicode.com/posts</code></li>
      <li>Write a shell function <code>api_get URL TOKEN</code> that: makes a GET request with bearer auth, checks HTTP status code, prints body if 200, prints error if not</li>
      <li>Use <code>curl -s -o /dev/null -w "%{http_code}" URL</code> in a loop to monitor an endpoint every 30 seconds and alert if it goes down</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Network Debugging</h4>
    <p>Build <code>netcheck.sh HOST PORT</code> — a complete layered network diagnostic script:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>DNS check: resolve hostname, print IP, fail clearly if unresolvable</li>
      <li>Ping check: test ICMP reachability, print RTT</li>
      <li>TCP check: verify port is open with nc, fail with message if closed</li>
      <li>HTTP check (if port 80/443): curl the endpoint, print status code and TTFB</li>
      <li>Route trace: call traceroute with a timeout, print first 5 hops</li>
      <li>Local socket check: use ss to verify the port is listening (if checking localhost)</li>
      <li>Print a summary table at the end: each check with ✅ or ❌ and a description of what it means</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Production Network Monitor</h4>
    <p>Build a complete network monitoring suite for a data pipeline:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Service checker:</strong> Define a list of host:port pairs in a config file. Every 60 seconds, nc-check all of them in parallel, record up/down status with timestamp.</li>
      <li><strong>API monitor:</strong> For a list of HTTP endpoints, measure response time and HTTP status every 30s. Alert (curl to Slack webhook) if: status ≥ 400, TTFB &gt; 2s, or connection timeout.</li>
      <li><strong>DNS staleness checker:</strong> Compare DNS resolution from your machine vs 8.8.8.8 and 1.1.1.1. Alert if they disagree (possible DNS poisoning or split-horizon issue).</li>
      <li><strong>Bandwidth alert:</strong> Parse <code>/proc/net/dev</code> every 10 seconds. Calculate bytes/second for each interface. Alert if throughput drops to zero unexpectedly (possible interface down).</li>
      <li><strong>Connection flood detector:</strong> Parse <code>ss -tan</code> output every 30s. Alert if: TIME_WAIT &gt; 10000, or a single remote IP has &gt; 100 connections (possible DDoS).</li>
      <li><strong>Report:</strong> Every hour, generate a summary: uptime % for each service, avg/p95 response times, total bytes transferred, top 5 connected IPs.</li>
    </ol>
    <p><strong>Must run continuously as a daemon, handle signals (HUP=reload config), log to file with rotation, survive network outages without crashing.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Framework — Day 430</div>
    <p>Three months after the four-command diagnosis that found the provider outage, Ravi had built the network monitor. It ran on every server. When the pipeline stopped flowing, a Slack alert fired within 90 seconds — not "pipeline down" but "DNS resolution for api.datasource.io returning 0 results from 10.0.0.53 but 203.0.113.42 from 8.8.8.8 — possible DNS issue." The on-call engineer knew exactly where to look before they even opened a terminal.</p>
    <p>The second alert, two weeks later, was more interesting: "api.datasource.io responding HTTP 200 in 0.089s, but 45 connections to it are in CLOSE_WAIT state." That one turned out to be a connection leak — the application was opening HTTP connections but not closing them properly. The monitor found it before any timeout errors appeared in the application logs.</p>
    <p>"The network tells you everything," Ravi said to the team at the next retrospective. "DNS, connectivity, port, protocol, application — each layer tells you one thing. If you know which tool interrogates each layer, you can narrow any problem to one layer in under two minutes."</p>
    <p><strong>Network debugging is not about running every tool. It's about knowing which tool answers which question — and asking them in the right order.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};