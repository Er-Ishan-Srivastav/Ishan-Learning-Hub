var ssh = {
    title: "SSH, SCP & SFTP — Secure Remote Access",
    description: "Master SSH completely — cryptographic key pairs, passwordless authentication, the ssh_config file, port forwarding, jump hosts, agent forwarding, SCP and SFTP file transfer, and production security hardening. The essential toolkit for remote server management and data engineering.",
    content: `
<style>
/* ── Keyframe animations ── */
@keyframes sh-flow   { 0%{stroke-dashoffset:28} 100%{stroke-dashoffset:0} }
@keyframes sh-pulse  { 0%,100%{opacity:1} 50%{opacity:.2} }
@keyframes sh-pop    { 0%{transform:scale(0);opacity:0} 80%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
@keyframes sh-slide  { 0%{transform:translateX(-30px);opacity:0} 100%{transform:translateX(0);opacity:1} }
@keyframes sh-lock   { 0%,100%{fill:#1a2a1a;stroke:#3fb950} 50%{fill:#0d1a0d;stroke:#238636} }
@keyframes sh-blink  { 0%,100%{opacity:1;fill:#ffa657} 50%{opacity:.25;fill:#7a4800} }
@keyframes sh-travel { 0%{transform:translateX(0)} 100%{transform:translateX(360px)} }
@keyframes sh-key    { 0%{transform:rotate(-10deg)} 50%{transform:rotate(10deg)} 100%{transform:rotate(-10deg)} }

.sh-flow   { stroke-dasharray:7 5; animation: sh-flow  .9s linear infinite; }
.sh-pulse  { animation: sh-pulse 1.8s ease-in-out infinite; }
.sh-lock   { animation: sh-lock  2.5s ease-in-out infinite; }
.sh-blink  { animation: sh-blink 1.4s ease-in-out infinite; }
.sh-pop    { animation: sh-pop   .5s cubic-bezier(.34,1.56,.64,1) both; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Production Server Moment — Day 390</div>
    <br>
    <p>The database migration had to run on the production server at 2am. Ravi had never directly accessed production before. Priya sent him the connection details: a bastion host, then a jump to the app server, then a tunnel to the database port so he could run the migration locally. "It's all in the ssh_config," she said. "Just <code>ssh prod-db</code>."</p>
    <br>
    <p>One command. Three hops, encrypted. Port forwarded. Keys verified. No password typed.</p>
    <br>
    <p>Ravi had thought SSH was just "ssh user@server". He didn't know about ProxyJump chains, or ControlMaster multiplexing that made subsequent connections instant, or dynamic forwarding that turned SSH into a SOCKS proxy for an entire network. He didn't know about agent forwarding — using his local key across all the hops without ever copying the private key to any server. He didn't know that <code>~/.ssh/config</code> could define all of this so one word brought up the whole architecture.</p>
    <br>
    <p>He spent the next two hours reading the ssh_config man page. It changed how he thought about the entire infrastructure.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — SSH HANDSHAKE (ANIMATED PROTOCOL FLOW)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> SSH Protocol — What Happens When You Connect</h2>

<p>SSH is not just a login tool — it is a complete encrypted transport protocol. Understanding the handshake tells you why SSH is secure, why the "host key changed" warning matters, and what <em>actually</em> happens in those milliseconds before you see the prompt.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="sh-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="sh-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="sh-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="sh-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="sh-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="sh-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>
  <rect width="820" height="360" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">SSH Handshake Protocol — 6 Phases from TCP to Encrypted Shell</text>

  <!-- CLIENT column -->
  <rect x="14" y="36" width="150" height="36" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="89" y="59" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">CLIENT</text>
  <line x1="89" y1="72" x2="89" y2="350" stroke="#3fb950" stroke-width="2" stroke-dasharray="4,3"/>

  <!-- SERVER column -->
  <rect x="656" y="36" width="150" height="36" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="731" y="59" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">SERVER</text>
  <line x1="731" y1="72" x2="731" y2="350" stroke="#58a6ff" stroke-width="2" stroke-dasharray="4,3"/>

  <!-- Phase 1: TCP -->
  <rect x="170" y="76" width="480" height="28" rx="5" fill="#161b22"/>
  <text x="410" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#30363d">① TCP Connection (port 22)</text>
  <line x1="89" y1="90" x2="731" y2="90" stroke="#30363d" stroke-width="2" marker-end="url(#sh-arr)" class="sh-flow"/>

  <!-- Phase 2: Protocol negotiation -->
  <rect x="170" y="112" width="480" height="40" rx="5" fill="#1a1a2a"/>
  <text x="410" y="127" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">② Protocol Version &amp; Algorithm Negotiation</text>
  <text x="410" y="143" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Client + Server agree: SSH-2.0, key exchange (ECDH), cipher (ChaCha20), MAC (HMAC-SHA2)</text>
  <line x1="89"  y1="132" x2="731" y2="132" stroke="#bc8cff" stroke-width="1.5" marker-end="url(#sh-pur)"/>
  <line x1="731" y1="142" x2="89"  y2="142" stroke="#bc8cff" stroke-width="1.5" marker-end="url(#sh-pur)" stroke-dasharray="5,3"/>

  <!-- Phase 3: Key exchange -->
  <rect x="170" y="160" width="480" height="50" rx="5" fill="#142014"/>
  <text x="410" y="175" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">③ Key Exchange (ECDH Diffie-Hellman)</text>
  <text x="410" y="191" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Both sides compute shared session key — never transmitted over wire</text>
  <text x="410" y="204" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">ALL SUBSEQUENT TRAFFIC IS ENCRYPTED WITH THIS KEY</text>
  <line x1="89"  y1="175" x2="731" y2="175" stroke="#3fb950" stroke-width="1.5" marker-end="url(#sh-grn)" class="sh-flow"/>
  <line x1="731" y1="186" x2="89"  y2="186" stroke="#3fb950" stroke-width="1.5" marker-end="url(#sh-grn)" class="sh-flow"/>

  <!-- Phase 4: Host verification -->
  <rect x="170" y="218" width="480" height="50" rx="5" fill="#2a1a14"/>
  <text x="410" y="233" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">④ Server Authentication (Host Key)</text>
  <text x="410" y="249" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Server sends its host public key → client checks against ~/.ssh/known_hosts</text>
  <text x="410" y="262" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">TOFU first time: "Are you sure you want to continue connecting?" — VERIFY THE FINGERPRINT!</text>
  <line x1="731" y1="240" x2="89" y2="240" stroke="#ffa657" stroke-width="2" marker-end="url(#sh-orn)"/>

  <!-- Phase 5: User authentication -->
  <rect x="170" y="276" width="480" height="40" rx="5" fill="#1a142a"/>
  <text x="410" y="291" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">⑤ User Authentication</text>
  <text x="410" y="307" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Client proves identity: password / public key / GSSAPI / keyboard-interactive</text>
  <line x1="89" y1="295" x2="731" y2="295" stroke="#bc8cff" stroke-width="1.5" marker-end="url(#sh-pur)"/>

  <!-- Phase 6: Shell/channel -->
  <rect x="170" y="324" width="480" height="26" rx="5" fill="#0e1824" class="sh-lock"/>
  <text x="410" y="341" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">⑥ Encrypted Channel Open — Shell / Port Forward / SFTP</text>
  <line x1="89" y1="337" x2="731" y2="337" stroke="#58a6ff" stroke-width="2" marker-end="url(#sh-blu)" class="sh-flow"/>
</svg>
<p class="diagram-caption">SSH uses <strong>two different key pairs</strong>: the <em>host key</em> (server's identity — stored in <code>/etc/ssh/ssh_host_*</code>) and the <em>user key</em> (your identity — stored in <code>~/.ssh/id_*</code>). The handshake first verifies the server (phase 4), then the user (phase 5). The "host key changed" warning means phase 4 failed — a possible man-in-the-middle attack.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 10 — ssh basics: connect, verbose, fingerprint, known_hosts</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC SSH CONNECT ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> ssh user@server.example.com        <span class="cb-cmt"># basic: user@host</span>
<span class="cb-prompt">$</span> ssh server.example.com             <span class="cb-cmt"># uses local username</span>
<span class="cb-prompt">$</span> ssh -p 2222 user@server            <span class="cb-cmt"># non-standard port</span>
<span class="cb-prompt">$</span> ssh -i ~/.ssh/id_ed25519 user@host <span class="cb-cmt"># specific key file</span>
<span class="cb-prompt">$</span> ssh -l ravi server.example.com     <span class="cb-cmt"># -l = login name</span>

<span class="cb-cmt">## ═══ RUN REMOTE COMMAND WITHOUT INTERACTIVE SHELL ═════════════</span>
<span class="cb-prompt">$</span> ssh user@server 'hostname'
<span class="cb-out">prod-server-01.internal</span>
<span class="cb-prompt">$</span> ssh user@server 'df -h | grep /data'
<span class="cb-prompt">$</span> ssh user@server 'ls /var/log/*.log | wc -l'
<span class="cb-prompt">$</span> ssh user@server 'ps aux | grep python'
<span class="cb-cmt"># Single-quoted: command runs on remote, no local shell expansion
# Double-quoted: local variables expanded before sending</span>

<span class="cb-cmt">## ═══ VERBOSE MODE FOR DEBUGGING ══════════════════════════════</span>
<span class="cb-prompt">$</span> ssh -v  user@server   <span class="cb-cmt"># verbose (level 1)</span>
<span class="cb-prompt">$</span> ssh -vv user@server   <span class="cb-cmt"># more verbose (level 2)</span>
<span class="cb-prompt">$</span> ssh -vvv user@server  <span class="cb-cmt"># maximum verbose (level 3)</span>
<span class="cb-out">OpenSSH_9.0p1, OpenSSL 3.0.7</span>
<span class="cb-out">debug1: Connecting to server.example.com [203.0.113.42] port 22</span>
<span class="cb-out">debug1: Connection established.</span>
<span class="cb-out">debug1: Server host key: ecdsa-sha2-nistp256 SHA256:abcdef1234...</span>
<span class="cb-out">debug1: Offering public key: /home/ravi/.ssh/id_ed25519 ED25519</span>
<span class="cb-out">debug1: Server accepts key: /home/ravi/.ssh/id_ed25519 ED25519</span>
<span class="cb-out">debug1: Authentication succeeded (publickey).</span>

<span class="cb-cmt">## ═══ HOST KEY VERIFICATION ═══════════════════════════════════</span>
<span class="cb-cmt"># First connection — TOFU (Trust On First Use):</span>
<span class="cb-out">The authenticity of host 'server.example.com (203.0.113.42)' can't be established.</span>
<span class="cb-out">ED25519 key fingerprint is SHA256:xK5VsZerXyz1a2b3c4d5e6f7g8h9iJKLMNOP.</span>
<span class="cb-out">Are you sure you want to continue connecting (yes/no/[fingerprint])?</span>
<span class="cb-cmt"># BEFORE typing yes: verify fingerprint with server admin!
# ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub  (on server)
# If fingerprints match → type yes → added to ~/.ssh/known_hosts</span>

<span class="cb-cmt">## ═══ known_hosts MANAGEMENT ══════════════════════════════════</span>
<span class="cb-prompt">$</span> cat ~/.ssh/known_hosts             <span class="cb-cmt"># see all trusted hosts</span>
<span class="cb-prompt">$</span> ssh-keygen -R server.example.com  <span class="cb-cmt"># remove a host (after key change)</span>
<span class="cb-prompt">$</span> ssh-keygen -F server.example.com  <span class="cb-cmt"># find host in known_hosts</span>
<span class="cb-prompt">$</span> ssh-keyscan server.example.com    <span class="cb-cmt"># get server's host key (for scripts)</span>
<span class="cb-prompt">$</span> ssh-keyscan -H server.example.com >> ~/.ssh/known_hosts  <span class="cb-cmt"># add to known_hosts</span>
<span class="cb-cmt"># -H = hash the hostname (privacy — hides which hosts you connect to)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — KEY PAIR: ANIMATED VISUAL
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> SSH Key Pairs — Public &amp; Private Keys Explained</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="280" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">SSH Key Pair — How Public/Private Key Authentication Works</text>

  <!-- Private key (yours) -->
  <rect x="14" y="40" width="240" height="128" rx="10" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="134" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#f85149">🔑 Private Key</text>
  <text x="134" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">~/.ssh/id_ed25519</text>
  <text x="134" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">NEVER leaves your machine</text>
  <text x="134" y="116" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Permissions: 600 (user read only)</text>
  <text x="134" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Can be passphrase-protected</text>
  <text x="134" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Used to: SIGN challenges</text>

  <!-- Public key (server) -->
  <rect x="566" y="40" width="240" height="128" rx="10" fill="#0e1824" stroke="#3fb950" stroke-width="2"/>
  <text x="686" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">🔓 Public Key</text>
  <text x="686" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">~/.ssh/id_ed25519.pub</text>
  <text x="686" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Safe to share everywhere</text>
  <text x="686" y="116" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Copied to server's authorized_keys</text>
  <text x="686" y="132" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">~/.ssh/authorized_keys on server</text>
  <text x="686" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Used to: VERIFY signatures</text>

  <!-- Math relationship -->
  <ellipse cx="410" cy="72" rx="80" ry="30" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="410" y="68" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">mathematically</text>
  <text x="410" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">linked pair</text>
  <line x1="254" y1="72" x2="330" y2="72" stroke="#bc8cff" stroke-width="1.5" stroke-dasharray="4,2"/>
  <line x1="490" y1="72" x2="566" y2="72" stroke="#bc8cff" stroke-width="1.5" stroke-dasharray="4,2"/>

  <!-- Authentication flow -->
  <rect x="14" y="182" width="792" height="88" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="410" y="200" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Authentication Flow — 4 Steps</text>

  <!-- Steps -->
  <rect x="26"  y="208" width="168" height="52" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.2"/>
  <text x="110" y="224" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#58a6ff">① Server sends</text>
  <text x="110" y="238" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">random challenge</text>
  <text x="110" y="252" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">(encrypted w/ your pubkey)</text>

  <line x1="194" y1="234" x2="218" y2="234" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#sh-blu)"/>

  <rect x="218" y="208" width="168" height="52" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.2"/>
  <text x="302" y="224" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#f85149">② Client signs</text>
  <text x="302" y="238" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">challenge with</text>
  <text x="302" y="252" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">private key</text>

  <line x1="386" y1="234" x2="410" y2="234" stroke="#f85149" stroke-width="1.5" marker-end="url(#sh-red)"/>

  <rect x="410" y="208" width="168" height="52" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.2"/>
  <text x="494" y="224" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#3fb950">③ Server verifies</text>
  <text x="494" y="238" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">signature using</text>
  <text x="494" y="252" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">authorized_keys</text>

  <line x1="578" y1="234" x2="602" y2="234" stroke="#3fb950" stroke-width="1.5" marker-end="url(#sh-grn)"/>

  <rect x="602" y="208" width="192" height="52" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1.2"/>
  <text x="698" y="224" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#bc8cff">④ Authenticated!</text>
  <text x="698" y="238" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Shell / session</text>
  <text x="698" y="252" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">granted ✅</text>
</svg>
<p class="diagram-caption">The private key <strong>never leaves your machine</strong> — it only signs a challenge. The server verifies the signature using your public key stored in <code>~/.ssh/authorized_keys</code>. Even if an attacker intercepts the network, they cannot reconstruct the private key from the signature.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 10 — ssh-keygen: generate, types, passphrase, permissions, deploy</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ KEY TYPES — WHICH TO USE ════════════════════════════════</span>
<span class="cb-cmt"># Ed25519 — RECOMMENDED (modern, fast, small, secure):</span>
<span class="cb-prompt">$</span> ssh-keygen -t ed25519 -C "ravi@company.com"

<span class="cb-cmt"># RSA — widely compatible (use 4096 bits minimum):</span>
<span class="cb-prompt">$</span> ssh-keygen -t rsa -b 4096 -C "ravi@company.com"

<span class="cb-cmt"># ECDSA — good alternative:</span>
<span class="cb-prompt">$</span> ssh-keygen -t ecdsa -b 521 -C "ravi@company.com"

<span class="cb-cmt"># Key type comparison:
# Ed25519:  Modern, fastest, 256-bit security, smallest key. Use this.
# RSA 4096: Most compatible (older SSH servers). Larger. Use if Ed25519 fails.
# ECDSA:    Good but some controversy around NIST curves. Ed25519 preferred.
# DSA:      BROKEN — never use.</span>

<span class="cb-cmt">## ═══ GENERATE A KEY PAIR ════════════════════════════════════</span>
<span class="cb-prompt">$</span> ssh-keygen -t ed25519 -C "ravi@laptop" -f ~/.ssh/id_ed25519
<span class="cb-out">Generating public/private ed25519 key pair.</span>
<span class="cb-out">Enter passphrase (empty for no passphrase): [enter passphrase]</span>
<span class="cb-out">Enter same passphrase again: [repeat]</span>
<span class="cb-out">Your identification has been saved in /home/ravi/.ssh/id_ed25519</span>
<span class="cb-out">Your public key has been saved in /home/ravi/.ssh/id_ed25519.pub</span>
<span class="cb-out">The key fingerprint is:</span>
<span class="cb-out">SHA256:xK5VsZerXyz1234567890ABCDEFGHIJKLMNOPQRST ravi@laptop</span>

<span class="cb-cmt">## ═══ KEY FILE CONTENTS ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> cat ~/.ssh/id_ed25519.pub
<span class="cb-out">ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIOP...XYZ ravi@laptop</span>
<span class="cb-cmt"># Format: algorithm  base64-encoded-key  comment
# This entire line goes in server's ~/.ssh/authorized_keys</span>

<span class="cb-cmt">## ═══ CRITICAL PERMISSIONS ════════════════════════════════════</span>
<span class="cb-prompt">$</span> chmod 700 ~/.ssh                  <span class="cb-cmt"># directory: only owner can access</span>
<span class="cb-prompt">$</span> chmod 600 ~/.ssh/id_ed25519       <span class="cb-cmt"># private key: MUST be 600 (owner read/write)</span>
<span class="cb-prompt">$</span> chmod 644 ~/.ssh/id_ed25519.pub   <span class="cb-cmt"># public key: 644 is fine</span>
<span class="cb-prompt">$</span> chmod 600 ~/.ssh/authorized_keys  <span class="cb-cmt"># authorized_keys: 600</span>
<span class="cb-prompt">$</span> chmod 600 ~/.ssh/config           <span class="cb-cmt"># config file: 600</span>
<span class="cb-cmt"># SSH WILL REFUSE to use a private key with wrong permissions!</span>

<span class="cb-cmt">## ═══ DEPLOY PUBLIC KEY TO SERVER ════════════════════════════</span>
<span class="cb-cmt"># Method 1: ssh-copy-id (easiest):</span>
<span class="cb-prompt">$</span> ssh-copy-id user@server.example.com
<span class="cb-prompt">$</span> ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server  <span class="cb-cmt"># specific key</span>
<span class="cb-prompt">$</span> ssh-copy-id -p 2222 user@server  <span class="cb-cmt"># non-standard port</span>

<span class="cb-cmt"># Method 2: Manual (when ssh-copy-id not available):</span>
<span class="cb-prompt">$</span> cat ~/.ssh/id_ed25519.pub | ssh user@server 'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'

<span class="cb-cmt"># Method 3: On the server directly:</span>
<span class="cb-out">echo "ssh-ed25519 AAAA...XYZ ravi@laptop" >> ~/.ssh/authorized_keys</span>

<span class="cb-cmt">## ═══ KEY INSPECTION AND MANAGEMENT ══════════════════════════</span>
<span class="cb-prompt">$</span> ssh-keygen -lf ~/.ssh/id_ed25519    <span class="cb-cmt"># show fingerprint</span>
<span class="cb-prompt">$</span> ssh-keygen -lf ~/.ssh/id_ed25519 -E md5  <span class="cb-cmt"># MD5 fingerprint</span>
<span class="cb-prompt">$</span> ssh-keygen -p -f ~/.ssh/id_ed25519  <span class="cb-cmt"># change passphrase</span>
<span class="cb-prompt">$</span> ssh-keygen -y -f ~/.ssh/id_ed25519  <span class="cb-cmt"># extract public from private</span>
<span class="cb-prompt">$</span> ssh-keygen -R server.example.com    <span class="cb-cmt"># remove host from known_hosts</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — SSH AGENT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> SSH Agent — Passwordless Convenience Without Security Risk</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">SSH Agent — Unlock Key Once, Use Everywhere Securely</text>

  <!-- Local machine -->
  <rect x="14" y="34" width="360" height="188" rx="8" fill="#0e0e14" stroke="#30363d" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="194" y="52" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#30363d">Your Laptop</text>

  <!-- Agent box -->
  <rect x="26" y="58" width="150" height="80" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2" class="sh-lock"/>
  <text x="101" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">ssh-agent</text>
  <text x="101" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">holds decrypted</text>
  <text x="101" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">private key in RAM</text>
  <text x="101" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">signs on behalf</text>

  <!-- Locked private key -->
  <rect x="192" y="58" width="168" height="80" rx="7" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="276" y="78" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">🔑 Private Key</text>
  <text x="276" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">~/.ssh/id_ed25519</text>
  <text x="276" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">encrypted on disk</span></text>
  <text x="276" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">passphrase once</text>

  <!-- Socket path -->
  <rect x="26" y="154" width="334" height="28" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="193" y="172" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">$SSH_AUTH_SOCK = /tmp/ssh-XXXX/agent.1234</text>

  <!-- arrows: key to agent -->
  <line x1="192" y1="98" x2="176" y2="98" stroke="#ffa657" stroke-width="2" marker-end="url(#sh-orn)"/>
  <text x="184" y="90" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#ffa657">ssh-add</text>

  <!-- Servers -->
  <rect x="502" y="50" width="140" height="40" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="572" y="74" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#58a6ff">prod-server-01</text>

  <rect x="502" y="104" width="140" height="40" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="572" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#58a6ff">prod-server-02</text>

  <rect x="502" y="158" width="140" height="40" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="572" y="182" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#58a6ff">db-server-01</text>

  <!-- ssh connections -->
  <line x1="374" y1="70" x2="502" y2="70" stroke="#3fb950" stroke-width="2" marker-end="url(#sh-grn)" class="sh-flow"/>
  <line x1="374" y1="124" x2="502" y2="124" stroke="#3fb950" stroke-width="2" marker-end="url(#sh-grn)" class="sh-flow"/>
  <line x1="374" y1="178" x2="502" y2="178" stroke="#3fb950" stroke-width="2" marker-end="url(#sh-grn)" class="sh-flow"/>

  <text x="438" y="64" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">no password</text>
  <text x="438" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">no password</text>
  <text x="438" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">no password</text>

  <!-- Agent forward note -->
  <rect x="648" y="50" width="160" height="148" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="728" y="68" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Agent Forwarding</text>
  <text x="728" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">-A flag or</text>
  <text x="728" y="97" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">ForwardAgent yes</text>
  <text x="728" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Remote server can</text>
  <text x="728" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">use your agent</text>
  <text x="728" y="142" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">to SSH further</text>
  <text x="728" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">without copying</text>
  <text x="728" y="172" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">private key!</text>
  <text x="728" y="190" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">⚠ only trusted servers</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 10 — ssh-agent, ssh-add, agent forwarding, keychain</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ START SSH AGENT ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> eval "$(ssh-agent -s)"
<span class="cb-out">Agent pid 5001</span>
<span class="cb-cmt"># eval: sets SSH_AUTH_SOCK and SSH_AGENT_PID environment variables
# ssh-agent -s: outputs shell commands to set them</span>

<span class="cb-cmt">## ═══ ADD KEYS TO AGENT ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> ssh-add ~/.ssh/id_ed25519       <span class="cb-cmt"># add default key</span>
<span class="cb-out">Enter passphrase for /home/ravi/.ssh/id_ed25519: </span>
<span class="cb-out">Identity added: /home/ravi/.ssh/id_ed25519 (ravi@laptop)</span>

<span class="cb-prompt">$</span> ssh-add                         <span class="cb-cmt"># add all default keys (~/.ssh/id_*)</span>
<span class="cb-prompt">$</span> ssh-add -t 3600 ~/.ssh/id_ed25519  <span class="cb-cmt"># add with 1-hour expiry</span>
<span class="cb-prompt">$</span> ssh-add -l                       <span class="cb-cmt"># list loaded keys</span>
<span class="cb-out">256 SHA256:xK5V...RST ravi@laptop (ED25519)</span>
<span class="cb-prompt">$</span> ssh-add -L                       <span class="cb-cmt"># list public keys (full)</span>
<span class="cb-prompt">$</span> ssh-add -d ~/.ssh/id_ed25519     <span class="cb-cmt"># remove a specific key</span>
<span class="cb-prompt">$</span> ssh-add -D                       <span class="cb-cmt"># remove ALL keys</span>

<span class="cb-cmt">## ═══ AGENT FORWARDING ════════════════════════════════════════</span>
<span class="cb-cmt"># -A = forward agent connection to remote server
# On prod-server-01, your agent is available — can ssh to db-server</span>
<span class="cb-prompt">$</span> ssh -A user@prod-server-01
<span class="cb-cmt"># Now on prod-server-01:</span>
<span class="cb-out">[prod-server-01]$</span> ssh user@db-server-01   <span class="cb-cmt"># uses YOUR local agent!</span>
<span class="cb-cmt"># Private key never copied to prod-server-01</span>
<span class="cb-cmt"># ⚠ Only enable agent forwarding to servers YOU TRUST</span>
<span class="cb-cmt"># Root on that server can hijack your agent socket!</span>

<span class="cb-cmt">## ═══ KEYCHAIN — PERSISTENT AGENT ACROSS LOGINS ══════════════</span>
<span class="cb-cmt"># keychain (package) manages agent across shells and sessions:</span>
<span class="cb-prompt">$</span> eval "$(keychain --eval --agents ssh id_ed25519)"
<span class="cb-cmt"># Add to ~/.bash_profile for automatic key loading on login</span>

<span class="cb-cmt">## ═══ macOS KEYCHAIN INTEGRATION ══════════════════════════════</span>
<span class="cb-cmt"># On macOS: store passphrase in system Keychain</span>
<span class="cb-prompt">$</span> ssh-add --apple-use-keychain ~/.ssh/id_ed25519
<span class="cb-cmt"># Add to ~/.ssh/config:</span>
<span class="cb-out">Host *</span>
<span class="cb-out">    UseKeychain yes</span>
<span class="cb-out">    AddKeysToAgent yes</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — SSH CONFIG FILE (COMPLETE)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The <code>~/.ssh/config</code> File — Your SSH Superpower</h2>

<p>The ssh_config file transforms SSH from a command-line tool into a complete connection manager. Instead of remembering long hostnames, ports, keys, and options, you define aliases and let the config handle everything.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">ssh_config Lookup Hierarchy — Which Config Wins?</text>

  <!-- Boxes left to right showing priority -->
  <rect x="14"  y="36" width="165" height="80" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="96"  y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">① Command Line</text>
  <text x="96"  y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">ssh -p 2222 ...</text>
  <text x="96"  y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Highest priority</text>
  <text x="96"  y="104" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Always wins</text>

  <line x1="179" y1="76" x2="211" y2="76" stroke="#30363d" stroke-width="1.5" marker-end="url(#sh-arr)"/>
  <text x="195" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">then</text>

  <rect x="211" y="36" width="185" height="80" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="303" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">② User Config</text>
  <text x="303" y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">~/.ssh/config</text>
  <text x="303" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Your personal settings</span></text>
  <text x="303" y="104" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">← Edit this one</text>

  <line x1="396" y1="76" x2="428" y2="76" stroke="#30363d" stroke-width="1.5" marker-end="url(#sh-arr)"/>
  <text x="412" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">then</text>

  <rect x="428" y="36" width="185" height="80" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="520" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">③ System Config</text>
  <text x="520" y="72" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">/etc/ssh/ssh_config</text>
  <text x="520" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">System-wide defaults</text>
  <text x="520" y="104" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Admin-managed</text>

  <line x1="613" y1="76" x2="645" y2="76" stroke="#30363d" stroke-width="1.5" marker-end="url(#sh-arr)"/>
  <text x="629" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#30363d">then</text>

  <rect x="645" y="36" width="161" height="80" rx="8" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="725" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">④ Compiled-in</text>
  <text x="725" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">OpenSSH defaults</text>
  <text x="725" y="88" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Port=22, etc.</text>
  <text x="725" y="104" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Lowest priority</text>

  <!-- Match rule note -->
  <rect x="14" y="130" width="792" height="60" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="148" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">First Match Rule: config is read top-to-bottom. First matching Host block wins for each setting.</text>
  <text x="26" y="164" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Put specific host blocks FIRST, wildcard blocks (Host *) LAST. Each option is set by first occurrence — not overridden by later occurrences.</text>
  <text x="26" y="180" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">Exception: Match blocks (vs Host blocks) allow complex conditional matching (OS, user, LocalPort, etc.)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 10 — ~/.ssh/config: aliases, IdentityFile, ForwardAgent, ProxyJump, ControlMaster</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC HOST ALIAS ════════════════════════════════════════</span>
<span class="cb-cmt"># Before config: ssh -i ~/.ssh/id_ed25519 -p 2222 ravi@prod.company.com</span>
<span class="cb-cmt"># After config:  ssh prod</span>

<span class="cb-out">Host prod</span>
<span class="cb-out">    HostName        prod.company.com</span>
<span class="cb-out">    User            ravi</span>
<span class="cb-out">    Port            2222</span>
<span class="cb-out">    IdentityFile    ~/.ssh/id_ed25519</span>

<span class="cb-cmt">## ═══ WILDCARD PATTERNS ═══════════════════════════════════════</span>
<span class="cb-out">Host prod-*                       # matches prod-web, prod-db, prod-worker</span>
<span class="cb-out">    User        deploy</span>
<span class="cb-out">    IdentityFile ~/.ssh/id_ed25519_prod</span>
<span class="cb-out">    ForwardAgent yes</span>

<span class="cb-out">Host *.staging.company.com</span>
<span class="cb-out">    User        dev</span>
<span class="cb-out">    Port        22</span>

<span class="cb-cmt">## ═══ PROXYJUMP — JUMP HOSTS (modern approach) ════════════════</span>
<span class="cb-out">Host bastion</span>
<span class="cb-out">    HostName    bastion.company.com</span>
<span class="cb-out">    User        jump</span>
<span class="cb-out">    IdentityFile ~/.ssh/id_ed25519</span>

<span class="cb-out">Host prod-db</span>
<span class="cb-out">    HostName        10.0.0.50        # internal IP, only accessible via bastion</span>
<span class="cb-out">    User            ravi</span>
<span class="cb-out">    ProxyJump       bastion          # ssh via bastion first</span>
<span class="cb-out">    IdentityFile    ~/.ssh/id_ed25519</span>
<span class="cb-cmt"># Now: ssh prod-db  → connects via bastion automatically</span>
<span class="cb-cmt"># Chain: ssh -J jump1,jump2 user@final  (multiple jumps)</span>

<span class="cb-out">Host internal-*</span>
<span class="cb-out">    ProxyJump       bastion          # all internal-* go via bastion</span>
<span class="cb-out">    User            ravi</span>

<span class="cb-cmt">## ═══ CONTROLMASTER — CONNECTION MULTIPLEXING ════════════════</span>
<span class="cb-cmt"># First SSH connection creates a master socket
# Subsequent connections reuse it — near-instant!</span>
<span class="cb-out">Host *</span>
<span class="cb-out">    ControlMaster   auto</span>
<span class="cb-out">    ControlPath     ~/.ssh/cm/%r@%h:%p   # socket location (%r=user %h=host %p=port)</span>
<span class="cb-out">    ControlPersist  10m                 # keep master alive 10 min after last connection</span>
<span class="cb-cmt"># mkdir -p ~/.ssh/cm  (create directory first!)</span>
<span class="cb-cmt"># Result: second 'ssh prod' is 10x faster — no new TLS handshake</span>

<span class="cb-cmt">## ═══ COMPLETE PRODUCTION CONFIG ═════════════════════════════</span>
<span class="cb-out">Host bastion</span>
<span class="cb-out">    HostName        bastion.company.com</span>
<span class="cb-out">    User            jump</span>
<span class="cb-out">    Port            22</span>
<span class="cb-out">    IdentityFile    ~/.ssh/id_ed25519_work</span>
<span class="cb-out">    ServerAliveInterval  60</span>
<span class="cb-out">    ServerAliveCountMax  3</span>

<span class="cb-out">Host prod-*</span>
<span class="cb-out">    User            ravi</span>
<span class="cb-out">    ProxyJump       bastion</span>
<span class="cb-out">    IdentityFile    ~/.ssh/id_ed25519_work</span>
<span class="cb-out">    ForwardAgent    yes</span>

<span class="cb-out">Host *</span>
<span class="cb-out">    ServerAliveInterval  120      # send keepalive every 2 minutes</span>
<span class="cb-out">    ServerAliveCountMax  3        # disconnect after 3 missed keepalives</span>
<span class="cb-out">    ControlMaster        auto</span>
<span class="cb-out">    ControlPath          ~/.ssh/cm/%r@%h:%p</span>
<span class="cb-out">    ControlPersist       10m</span>
<span class="cb-out">    AddKeysToAgent       yes</span>
<span class="cb-out">    IdentityFile         ~/.ssh/id_ed25519  # default key</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — PORT FORWARDING (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Port Forwarding — Local, Remote &amp; Dynamic Tunnels</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="320" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Port Forwarding — Three Types: Local, Remote, Dynamic</text>

  <!-- LOCAL FORWARDING (-L) -->
  <rect x="14" y="36" width="792" height="82" rx="8" fill="#1a2a14" stroke="#3fb950" stroke-width="1.5"/>
  <text x="26" y="55" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">① Local Port Forwarding  -L  (Access remote services locally)</text>

  <rect x="26" y="62" width="110" height="46" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="81" y="79" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">localhost</text>
  <text x="81" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">:5433</text>

  <line x1="136" y1="85" x2="200" y2="85" stroke="#3fb950" stroke-width="2" marker-end="url(#sh-grn)" class="sh-flow"/>

  <rect x="200" y="62" width="130" height="46" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="265" y="79" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">SSH tunnel</text>
  <text x="265" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">encrypted</text>

  <line x1="330" y1="85" x2="394" y2="85" stroke="#3fb950" stroke-width="2" marker-end="url(#sh-grn)" class="sh-flow"/>

  <rect x="394" y="62" width="130" height="46" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="459" y="79" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">ssh-server</text>
  <text x="459" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">:22</text>

  <line x1="524" y1="85" x2="588" y2="85" stroke="#3fb950" stroke-width="2" marker-end="url(#sh-grn)"/>

  <rect x="588" y="62" width="130" height="46" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="653" y="79" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">postgres</text>
  <text x="653" y="94" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">:5432</text>

  <text x="740" y="78" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">ssh -L 5433:db:5432 server</text>
  <text x="740" y="94" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">psql -p 5433</text>

  <!-- REMOTE FORWARDING (-R) -->
  <rect x="14" y="128" width="792" height="82" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="26" y="147" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">② Remote Port Forwarding  -R  (Expose local service to remote)</text>

  <rect x="26" y="154" width="130" height="46" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="91" y="171" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">local service</text>
  <text x="91" y="186" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">:8080</text>

  <line x1="156" y1="177" x2="220" y2="177" stroke="#58a6ff" stroke-width="2" marker-end="url(#sh-blu)" class="sh-flow"/>

  <rect x="220" y="154" width="130" height="46" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="285" y="171" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">SSH tunnel</text>
  <text x="285" y="186" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">encrypted</text>

  <line x1="350" y1="177" x2="414" y2="177" stroke="#58a6ff" stroke-width="2" marker-end="url(#sh-blu)" class="sh-flow"/>

  <rect x="414" y="154" width="190" height="46" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="509" y="171" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">ssh-server listens</text>
  <text x="509" y="186" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">:9090</text>

  <text x="626" y="170" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">ssh -R 9090:localhost:8080 server</text>
  <text x="626" y="186" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">curl http://server:9090 → your local :8080</text>

  <!-- DYNAMIC FORWARDING (-D) -->
  <rect x="14" y="220" width="792" height="90" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="26" y="239" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">③ Dynamic Port Forwarding  -D  (SOCKS proxy — route ALL traffic)</text>

  <rect x="26" y="248" width="130" height="52" rx="6" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="91" y="265" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">app / browser</text>
  <text x="91" y="279" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">SOCKS5 proxy</text>
  <text x="91" y="293" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">:1080</text>

  <line x1="156" y1="274" x2="220" y2="274" stroke="#bc8cff" stroke-width="2" marker-end="url(#sh-pur)" class="sh-flow"/>

  <rect x="220" y="248" width="130" height="52" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="285" y="270" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">SSH tunnel</text>
  <text x="285" y="285" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">all traffic</text>
  <text x="285" y="297" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">encrypted</text>

  <line x1="350" y1="274" x2="414" y2="274" stroke="#bc8cff" stroke-width="2" marker-end="url(#sh-pur)" class="sh-flow"/>

  <rect x="414" y="248" width="140" height="52" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="484" y="268" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">ssh-server</text>
  <text x="484" y="283" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">routes to</text>
  <text x="484" y="298" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">ANY destination</text>

  <text x="570" y="265" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">ssh -D 1080 server</text>
  <text x="570" y="281" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Configure app to use SOCKS5 proxy at localhost:1080</text>
  <text x="570" y="297" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">All traffic exits from server's IP address</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 10 — Port forwarding: -L -R -D, background tunnels, config entries</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ LOCAL PORT FORWARDING -L ════════════════════════════════</span>
<span class="cb-cmt"># Format: -L [bind_addr:]local_port:remote_host:remote_port</span>
<span class="cb-prompt">$</span> ssh -L 5433:localhost:5432 user@db-server
<span class="cb-cmt"># localhost:5433 → tunnel → db-server:5432 (postgres)
# Now: psql -h localhost -p 5433 -U postgres mydb</span>

<span class="cb-prompt">$</span> ssh -L 8080:webapp.internal:80 user@bastion
<span class="cb-cmt"># localhost:8080 → bastion → webapp.internal:80
# Access internal web app in browser: http://localhost:8080</span>

<span class="cb-prompt">$</span> ssh -L 5432:db.internal:5432 -L 6379:redis.internal:6379 user@bastion
<span class="cb-cmt"># Multiple tunnels in one connection</span>

<span class="cb-cmt">## ═══ BACKGROUND TUNNEL (no shell) ═══════════════════════════</span>
<span class="cb-prompt">$</span> ssh -L 5433:localhost:5432 -N -f user@db-server
<span class="cb-cmt"># -N = don't execute remote command (tunnel only)
# -f = go to background before executing
# Now port 5433 is forwarded in background — no shell opened</span>

<span class="cb-cmt"># Kill background tunnel:</span>
<span class="cb-prompt">$</span> pkill -f "ssh -L 5433"
<span class="cb-cmt"># Or find and kill:</span>
<span class="cb-prompt">$</span> ps aux | grep ssh

<span class="cb-cmt">## ═══ REMOTE PORT FORWARDING -R ═══════════════════════════════</span>
<span class="cb-cmt"># Format: -R [bind_addr:]remote_port:local_host:local_port</span>
<span class="cb-prompt">$</span> ssh -R 9090:localhost:3000 user@public-server
<span class="cb-cmt"># public-server:9090 → tunnel → localhost:3000
# Share your local dev server with someone on the internet</span>

<span class="cb-prompt">$</span> ssh -R 0.0.0.0:9090:localhost:3000 user@public-server
<span class="cb-cmt"># Bind to all interfaces on remote (requires GatewayPorts yes in sshd_config)</span>

<span class="cb-cmt">## ═══ DYNAMIC FORWARDING -D (SOCKS PROXY) ════════════════════</span>
<span class="cb-prompt">$</span> ssh -D 1080 -N -f user@server
<span class="cb-cmt"># SOCKS5 proxy on localhost:1080
# Configure browser to use SOCKS5 proxy at 127.0.0.1:1080
# All browsing traffic goes through server</span>

<span class="cb-cmt"># Use with curl:</span>
<span class="cb-prompt">$</span> curl --socks5 localhost:1080 http://internal.company.com

<span class="cb-cmt">## ═══ TUNNEL IN ssh_config ════════════════════════════════════</span>
<span class="cb-out">Host db-tunnel</span>
<span class="cb-out">    HostName        db-server.internal</span>
<span class="cb-out">    User            ravi</span>
<span class="cb-out">    ProxyJump       bastion</span>
<span class="cb-out">    LocalForward    5433 localhost:5432</span>
<span class="cb-out">    LocalForward    6380 redis.internal:6379</span>
<span class="cb-out">    ExitOnForwardFailure yes</span>
<span class="cb-cmt"># ssh db-tunnel   → opens tunnel session
# ssh -N db-tunnel → opens tunnel only (no shell)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — SCP: SECURE COPY
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>scp</code> — Secure Copy, Every Flag &amp; Pattern</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">SCP — Transfer Directions &amp; Patterns</text>

  <!-- Local machine -->
  <rect x="14" y="40" width="200" height="60" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="114" y="65" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Local Machine</text>
  <text x="114" y="85" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">/home/ravi/data/</text>

  <!-- Remote machine -->
  <rect x="606" y="40" width="200" height="60" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="706" y="65" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Remote Server</text>
  <text x="706" y="85" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">/data/pipeline/</text>

  <!-- Upload arrow -->
  <line x1="214" y1="60" x2="606" y2="60" stroke="#3fb950" stroke-width="2.5" marker-end="url(#sh-grn)" class="sh-flow"/>
  <text x="410" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">UPLOAD (local → remote)</text>
  <text x="410" y="63" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">scp file.csv user@server:/data/</text>

  <!-- Download arrow -->
  <line x1="606" y1="80" x2="214" y2="80" stroke="#58a6ff" stroke-width="2.5" marker-end="url(#sh-blu)" class="sh-flow"/>
  <text x="410" y="97" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">DOWNLOAD (remote → local)</text>
  <text x="410" y="110" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">scp user@server:/data/output.csv .</text>

  <!-- Flags reference -->
  <rect x="14" y="120" width="792" height="82" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"  y="138" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Key SCP flags:</text>
  <text x="114" y="138" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-r</text><text x="132" y="138" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> recursive  </text>
  <text x="230" y="138" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-P 2222</text><text x="298" y="138" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> port  </text>
  <text x="356" y="138" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-i key</text><text x="404" y="138" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> identity  </text>
  <text x="484" y="138" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-l 1000</text><text x="540" y="138" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> bandwidth limit (Kbits/s)  </text>
  <text x="680" y="138" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-C</text><text x="698" y="138" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> compress</text>
  <text x="26"  y="157" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-p</text><text x="44" y="157" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> preserve timestamps/perms  </text>
  <text x="225" y="157" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-q</text><text x="243" y="157" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> quiet  </text>
  <text x="296" y="157" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-v</text><text x="314" y="157" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> verbose (debug)  </text>
  <text x="436" y="157" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-3</text><text x="454" y="157" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> server-to-server via local  </text>
  <text x="635" y="157" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">-o StrictHost=no</text>
  <text x="26" y="194" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">⚠ scp uses SCP protocol (legacy). For large/many files: use rsync. For interactive: use sftp. scp -O uses legacy SCP protocol; modern scp uses SFTP internally.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 10 — scp: upload, download, recursive, bandwidth, server-to-server</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC scp PATTERNS ══════════════════════════════════════</span>
<span class="cb-cmt"># Upload local file to remote:</span>
<span class="cb-prompt">$</span> scp data.csv user@server:/opt/pipeline/input/
<span class="cb-prompt">$</span> scp data.csv user@server:/opt/pipeline/input/data_$(date +%Y%m%d).csv

<span class="cb-cmt"># Download remote file to local:</span>
<span class="cb-prompt">$</span> scp user@server:/opt/pipeline/output/result.csv .
<span class="cb-prompt">$</span> scp user@server:/var/log/app.log ~/logs/

<span class="cb-cmt"># Upload to config-file alias (from ~/.ssh/config):</span>
<span class="cb-prompt">$</span> scp data.csv prod:/opt/pipeline/      <span class="cb-cmt"># uses 'prod' alias</span>

<span class="cb-cmt">## ═══ RECURSIVE DIRECTORY COPY ════════════════════════════════</span>
<span class="cb-prompt">$</span> scp -r /local/data/ user@server:/remote/data/
<span class="cb-prompt">$</span> scp -r user@server:/remote/results/ /local/results/

<span class="cb-cmt">## ═══ MULTIPLE FILES ═══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> scp file1.csv file2.csv file3.csv user@server:/data/
<span class="cb-prompt">$</span> scp *.csv user@server:/data/
<span class="cb-prompt">$</span> scp user@server:/data/{file1,file2,file3}.csv .

<span class="cb-cmt">## ═══ BANDWIDTH LIMITING ═════════════════════════════════════</span>
<span class="cb-prompt">$</span> scp -l 8000 large_file.csv user@server:/data/   <span class="cb-cmt"># limit to 8 Mbit/s</span>
<span class="cb-cmt"># -l value is in kilobits per second (Kbits/s)</span>
<span class="cb-cmt"># 8000 Kbits/s = 1 MB/s</span>

<span class="cb-cmt">## ═══ NON-STANDARD PORT ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> scp -P 2222 data.csv user@server:/data/    <span class="cb-cmt"># uppercase -P (unlike ssh lowercase -p)</span>

<span class="cb-cmt">## ═══ PRESERVE TIMESTAMPS AND PERMISSIONS ════════════════════</span>
<span class="cb-prompt">$</span> scp -p data.csv user@server:/data/         <span class="cb-cmt"># preserve timestamps, modes</span>
<span class="cb-prompt">$</span> scp -pr /local/dir/ user@server:/remote/   <span class="cb-cmt"># recursive + preserve</span>

<span class="cb-cmt">## ═══ SERVER-TO-SERVER COPY ═══════════════════════════════════</span>
<span class="cb-prompt">$</span> scp user@server1:/data/file.csv user@server2:/backup/
<span class="cb-cmt"># -3: route through local machine (more portable):
scp -3 user@server1:/data/file.csv user@server2:/backup/</span>

<span class="cb-cmt">## ═══ WITH JUMP HOST ═══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> scp -J jump-user@bastion:22 data.csv user@internal-server:/data/
<span class="cb-cmt"># Or using config alias:
scp prod:/data/result.csv .   # ProxyJump defined in config</span>

<span class="cb-cmt">## ═══ WHEN TO USE rsync INSTEAD OF scp ══════════════════════</span>
<span class="cb-cmt"># Use scp for: small/medium files, quick one-off transfers
# Use rsync for:
#   - Resumable transfers (--partial)
#   - Synchronizing directories (only transfer changes)
#   - Large files or many small files
#   - Bandwidth efficiency (--checksum)

rsync -avz --progress local/dir/ user@server:/remote/dir/
rsync -avz --partial --progress large_file.csv user@server:/data/</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — SFTP: INTERACTIVE FILE TRANSFER
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>sftp</code> — Interactive &amp; Batch File Transfer</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 10 — sftp: interactive session, all commands, batch mode, scripting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ CONNECTING ══════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> sftp user@server.example.com       <span class="cb-cmt"># basic connect</span>
<span class="cb-prompt">$</span> sftp -P 2222 user@server           <span class="cb-cmt"># non-standard port (uppercase -P)</span>
<span class="cb-prompt">$</span> sftp -i ~/.ssh/id_ed25519 user@server  <span class="cb-cmt"># specific key</span>
<span class="cb-prompt">$</span> sftp prod                          <span class="cb-cmt"># use ssh_config alias</span>
<span class="cb-out">Connected to server.example.com.</span>
<span class="cb-out">sftp></span>

<span class="cb-cmt">## ═══ SFTP INTERACTIVE COMMANDS ═══════════════════════════════</span>
<span class="cb-cmt"># NAVIGATION</span>
<span class="cb-out">sftp> pwd</span>                  <span class="cb-cmt"># remote working directory</span>
<span class="cb-out">Remote working directory: /home/ravi</span>
<span class="cb-out">sftp> lpwd</span>                 <span class="cb-cmt"># LOCAL working directory</span>
<span class="cb-out">Local working directory: /home/ravi/data</span>
<span class="cb-out">sftp> cd /data/pipeline</span>   <span class="cb-cmt"># change remote directory</span>
<span class="cb-out">sftp> lcd ~/staging</span>       <span class="cb-cmt"># change LOCAL directory</span>
<span class="cb-out">sftp> ls -la</span>               <span class="cb-cmt"># list remote files</span>
<span class="cb-out">sftp> lls</span>                  <span class="cb-cmt"># list LOCAL files</span>
<span class="cb-out">sftp> mkdir results</span>        <span class="cb-cmt"># create remote directory</span>
<span class="cb-out">sftp> lmkdir staging</span>      <span class="cb-cmt"># create LOCAL directory</span>

<span class="cb-cmt"># TRANSFER COMMANDS</span>
<span class="cb-out">sftp> get output.csv</span>                    <span class="cb-cmt"># download file</span>
<span class="cb-out">sftp> get output.csv /local/output.csv  </span><span class="cb-cmt"># download to specific path</span>
<span class="cb-out">sftp> mget *.csv</span>                        <span class="cb-cmt"># download multiple files</span>
<span class="cb-out">sftp> get -r /remote/dir/ .</span>            <span class="cb-cmt"># download directory recursively</span>
<span class="cb-out">sftp> put input.csv</span>                     <span class="cb-cmt"># upload file</span>
<span class="cb-out">sftp> put input.csv /data/input.csv</span>    <span class="cb-cmt"># upload to specific path</span>
<span class="cb-out">sftp> mput *.csv</span>                        <span class="cb-cmt"># upload multiple files</span>
<span class="cb-out">sftp> put -r /local/dir/ /remote/dir/</span>  <span class="cb-cmt"># upload directory</span>

<span class="cb-cmt"># FILE MANAGEMENT</span>
<span class="cb-out">sftp> rm old_file.csv</span>          <span class="cb-cmt"># delete remote file</span>
<span class="cb-out">sftp> rmdir empty_dir</span>          <span class="cb-cmt"># delete remote empty directory</span>
<span class="cb-out">sftp> rename old.csv new.csv</span>  <span class="cb-cmt"># rename remote file</span>
<span class="cb-out">sftp> chmod 644 file.csv</span>      <span class="cb-cmt"># change permissions</span>
<span class="cb-out">sftp> chown 1001 file.csv</span>     <span class="cb-cmt"># change owner (UID)</span>
<span class="cb-out">sftp> df -h</span>                   <span class="cb-cmt"># disk usage (supported by some servers)</span>
<span class="cb-out">sftp> exit</span>                    <span class="cb-cmt"># or: quit, bye, Ctrl+D</span>

<span class="cb-cmt">## ═══ BATCH MODE — SFTP SCRIPTING ════════════════════════════</span>
<span class="cb-cmt"># Run sftp commands non-interactively from a file:</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">DATE=$(date +%Y%m%d)</span>
<span class="cb-out">sftp user@server << EOF</span>
<span class="cb-out">cd /data/pipeline/output</span>
<span class="cb-out">get \${DATE}_results.csv /local/results/</span>
<span class="cb-out">get \${DATE}_summary.csv /local/results/</span>
<span class="cb-out">rm \${DATE}_tmp_*.csv</span>
<span class="cb-out">bye</span>
<span class="cb-out">EOF</span>

<span class="cb-cmt"># Using -b flag with a batch file:</span>
<span class="cb-out">cat > /tmp/sftp_commands.txt << 'EOF'</span>
<span class="cb-out">lcd /local/data</span>
<span class="cb-out">cd /remote/data</span>
<span class="cb-out">mget *.csv</span>
<span class="cb-out">bye</span>
<span class="cb-out">EOF</span>
<span class="cb-prompt">$</span> sftp -b /tmp/sftp_commands.txt user@server

<span class="cb-cmt">## ═══ RSYNC OVER SSH (better for large transfers) ═════════════</span>
<span class="cb-cmt"># rsync uses SSH as transport — same auth, better efficiency:</span>
<span class="cb-prompt">$</span> rsync -avz --progress data/ user@server:/opt/pipeline/data/
<span class="cb-prompt">$</span> rsync -avz --partial --progress large.csv user@server:/data/
<span class="cb-cmt"># -a = archive (preserve all attributes)
# -v = verbose
# -z = compress during transfer
# --progress = show progress
# --partial = resume incomplete transfers</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — JUMP HOSTS & BASTION ARCHITECTURE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Jump Hosts &amp; Bastion Servers — Multi-Hop SSH</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="260" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Bastion / Jump Host Architecture — One Secure Entry Point</text>

  <!-- Internet zone -->
  <rect x="14" y="36" width="180" height="216" rx="8" fill="#0e0e14" stroke="#f85149" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="104" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">Internet / Your Laptop</text>
  <rect x="26" y="62" width="156" height="50" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="104" y="83" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Your Laptop</text>
  <text x="104" y="99" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">~/.ssh/id_ed25519</text>

  <!-- DMZ zone -->
  <rect x="206" y="36" width="190" height="216" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="301" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">DMZ / Public</text>
  <rect x="220" y="62" width="162" height="60" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="301" y="85" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Bastion Host</text>
  <text x="301" y="101" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">bastion.company.com</text>
  <text x="301" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">port 22 only open</text>

  <!-- Private zone -->
  <rect x="408" y="36" width="398" height="216" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="607" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">Private Network (no direct internet access)</text>

  <rect x="420" y="62" width="158" height="50" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="499" y="83" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">prod-web-01</text>
  <text x="499" y="97" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">10.0.1.10</text>

  <rect x="588" y="62" width="158" height="50" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="667" y="83" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">prod-db-01</text>
  <text x="667" y="97" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">10.0.2.50</text>

  <rect x="420" y="128" width="158" height="50" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="499" y="149" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">prod-worker-01</text>
  <text x="499" y="163" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">10.0.1.20</text>

  <rect x="588" y="128" width="158" height="50" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="667" y="149" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">redis-01</text>
  <text x="667" y="163" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">10.0.3.10</text>

  <!-- Connections -->
  <line x1="182" y1="87" x2="220" y2="87" stroke="#3fb950" stroke-width="2" marker-end="url(#sh-grn)" class="sh-flow"/>
  <text x="201" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">SSH:22</text>

  <line x1="382" y1="87"  x2="420" y2="87"  stroke="#58a6ff" stroke-width="1.5" marker-end="url(#sh-blu)" class="sh-flow"/>
  <line x1="382" y1="90"  x2="588" y2="85"  stroke="#58a6ff" stroke-width="1.5" marker-end="url(#sh-blu)" class="sh-flow"/>
  <line x1="382" y1="95"  x2="420" y2="153" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#sh-blu)" class="sh-flow"/>
  <line x1="382" y1="98"  x2="588" y2="153" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#sh-blu)" class="sh-flow"/>

  <!-- ProxyJump label -->
  <rect x="420" y="196" width="366" height="48" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="603" y="214" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Configuration:</text>
  <text x="603" y="230" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">ProxyJump bastion  (in ~/.ssh/config)</text>
  <text x="603" y="242" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">ssh -J bastion prod-db-01  (command line)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 10 — ProxyJump, ProxyCommand, multi-hop, scp/sftp via jump</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ProxyJump (-J) — MODERN APPROACH ═══════════════════════</span>
<span class="cb-prompt">$</span> ssh -J bastion user@10.0.2.50          <span class="cb-cmt"># one jump host</span>
<span class="cb-prompt">$</span> ssh -J bastion1,bastion2 user@internal  <span class="cb-cmt"># two jump hosts (chained)</span>
<span class="cb-prompt">$</span> ssh -J user@bastion:22 user@10.0.2.50:22  <span class="cb-cmt"># explicit user+port</span>

<span class="cb-cmt">## ═══ ProxyJump IN ~/.ssh/config ═════════════════════════════</span>
<span class="cb-out">Host bastion</span>
<span class="cb-out">    HostName    bastion.company.com</span>
<span class="cb-out">    User        jump</span>

<span class="cb-out">Host prod-db</span>
<span class="cb-out">    HostName    10.0.2.50</span>
<span class="cb-out">    User        ravi</span>
<span class="cb-out">    ProxyJump   bastion</span>

<span class="cb-out">Host prod-*</span>
<span class="cb-out">    ProxyJump   bastion</span>
<span class="cb-out">    User        ravi</span>
<span class="cb-out">    IdentityFile ~/.ssh/id_ed25519_work</span>

<span class="cb-cmt"># Now:</span>
<span class="cb-prompt">$</span> ssh prod-db         <span class="cb-cmt"># connects via bastion automatically</span>
<span class="cb-prompt">$</span> scp prod-db:/data/results.csv .  <span class="cb-cmt"># scp via jump host</span>
<span class="cb-prompt">$</span> sftp prod-db                      <span class="cb-cmt"># sftp via jump host</span>

<span class="cb-cmt">## ═══ ProxyCommand — LEGACY / ADVANCED ════════════════════════</span>
<span class="cb-out">Host prod-db</span>
<span class="cb-out">    ProxyCommand ssh -W %h:%p bastion</span>
<span class="cb-cmt"># %h = target hostname, %p = target port
# More flexible than ProxyJump for custom proxy setups</span>

<span class="cb-cmt">## ═══ PORT TUNNEL TO INTERNAL DB VIA JUMP HOST ═══════════════</span>
<span class="cb-cmt"># Open tunnel to internal postgres through bastion:</span>
<span class="cb-prompt">$</span> ssh -J bastion -L 5433:10.0.2.50:5432 -N -f jump@bastion
<span class="cb-cmt"># Now: psql -h localhost -p 5433 connects to prod postgres</span>

<span class="cb-cmt"># Or in config + single command:</span>
<span class="cb-out">Host prod-db-tunnel</span>
<span class="cb-out">    HostName        10.0.2.50</span>
<span class="cb-out">    User            ravi</span>
<span class="cb-out">    ProxyJump       bastion</span>
<span class="cb-out">    LocalForward    5433 localhost:5432</span>
<span class="cb-out">    ExitOnForwardFailure yes</span>
<span class="cb-prompt">$</span> ssh -N prod-db-tunnel    <span class="cb-cmt"># tunnel only, no shell</span>

<span class="cb-cmt">## ═══ VERIFY YOU'RE JUMPING CORRECTLY ════════════════════════</span>
<span class="cb-prompt">$</span> ssh -v prod-db 2>&1 | grep -i proxy
<span class="cb-out">debug1: Setting up proxy connection via 'bastion'</span>
<span class="cb-out">debug1: Authenticating to 10.0.2.50:22</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — REMOTE COMMAND EXECUTION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Remote Command Execution — SSH as a Script Tool</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 10 — Remote exec, pipelines, heredoc, parallel SSH, exit codes</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC REMOTE COMMANDS ═══════════════════════════════════</span>
<span class="cb-prompt">$</span> ssh user@server 'df -h'
<span class="cb-prompt">$</span> ssh user@server 'ps aux | grep python'
<span class="cb-prompt">$</span> ssh user@server 'sudo systemctl restart nginx'
<span class="cb-prompt">$</span> ssh prod 'tail -100 /var/log/app.log' | grep ERROR

<span class="cb-cmt">## ═══ QUOTING: SINGLE vs DOUBLE ══════════════════════════════</span>
HOST="prod"
DATE="2024-01-15"

<span class="cb-cmt"># Single quotes: command runs LITERALLY on remote (no local expansion):</span>
<span class="cb-prompt">$</span> ssh $HOST 'echo $HOSTNAME'   <span class="cb-cmt"># prints remote hostname</span>
<span class="cb-out">prod-server-01.internal</span>

<span class="cb-cmt"># Double quotes: local variables expanded BEFORE sending to remote:</span>
<span class="cb-prompt">$</span> ssh $HOST "echo $DATE"       <span class="cb-cmt"># expands DATE locally, sends literal "2024-01-15"</span>
<span class="cb-out">2024-01-15</span>

<span class="cb-cmt"># Passing a local variable to remote:</span>
<span class="cb-prompt">$</span> ssh $HOST "python3 /opt/etl.py --date $DATE"   <span class="cb-cmt"># $DATE from local</span>

<span class="cb-cmt">## ═══ MULTI-LINE REMOTE SCRIPTS ═══════════════════════════════</span>
<span class="cb-prompt">$</span> ssh user@server << 'EOF'
set -euo pipefail
cd /opt/pipeline
echo "Starting ETL at $(date)"
python3 extract.py && python3 transform.py && python3 load.py
echo "Done at $(date)"
EOF

<span class="cb-cmt">## ═══ PIPE DATA THROUGH SSH ═══════════════════════════════════</span>
<span class="cb-cmt"># Send local file to remote command:</span>
<span class="cb-prompt">$</span> cat local_data.sql | ssh user@server 'psql -d mydb'

<span class="cb-cmt"># Get remote command output locally:</span>
<span class="cb-prompt">$</span> ssh user@server 'pg_dump mydb' | gzip > backup.sql.gz

<span class="cb-cmt"># Stream remote tar to local:</span>
<span class="cb-prompt">$</span> ssh user@server 'tar czf - /data/important/' | tar xzf - -C /backup/

<span class="cb-cmt">## ═══ EXIT CODE HANDLING ═══════════════════════════════════════</span>
<span class="cb-prompt">$</span> ssh user@server 'test -f /opt/etl/main.py'
<span class="cb-prompt">$</span> echo $?
<span class="cb-out">0</span>                              <span class="cb-cmt"># 0 = success (file exists)</span>

<span class="cb-cmt"># Use in scripts:</span>
if ssh user@server 'pgrep -x python3 > /dev/null'; then
    echo "ETL is running"
else
    echo "ETL not running — starting it"
    ssh user@server 'nohup python3 /opt/etl.py &> /var/log/etl.log &'
fi

<span class="cb-cmt">## ═══ PARALLEL SSH TO MULTIPLE SERVERS ═══════════════════════</span>
SERVERS=("prod-web-01" "prod-web-02" "prod-web-03")
PIDS=()

for SERVER in "\${SERVERS[@]}"; do
    ssh "$SERVER" 'sudo systemctl reload nginx' &
    PIDS+=($!)
done

FAIL=0
for PID in "\${PIDS[@]}"; do
    wait "$PID" || (( FAIL++ ))
done
echo "Reload complete. Failures: $FAIL"

<span class="cb-cmt">## ═══ SSH WITH TIMEOUT ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> ssh -o ConnectTimeout=10 user@server 'hostname'  <span class="cb-cmt"># 10s connect timeout</span>
<span class="cb-prompt">$</span> timeout 30 ssh user@server 'long_command'        <span class="cb-cmt"># total 30s timeout</span>

<span class="cb-cmt">## ═══ PSEUDOTERMINAL CONTROL ══════════════════════════════════</span>
<span class="cb-prompt">$</span> ssh -t user@server 'sudo htop'    <span class="cb-cmt"># -t: force TTY allocation (for interactive cmds)</span>
<span class="cb-prompt">$</span> ssh -T user@server 'command'      <span class="cb-cmt"># -T: disable TTY (for non-interactive)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — SSHD_CONFIG HARDENING
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>sshd_config</code> — Hardening the SSH Server</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">sshd_config Security Settings — Default vs Hardened</text>

  <!-- Headers -->
  <text x="240" y="44" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">Default (Insecure)</text>
  <text x="580" y="44" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Hardened (Recommended)</text>

  <!-- Setting rows -->
  <rect x="14" y="50" width="792" height="20" rx="2" fill="#1f2027"/>
  <text x="26"  y="64" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">PermitRootLogin</text>
  <text x="240" y="64" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">yes</text>
  <text x="580" y="64" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">no</text>

  <rect x="14" y="72" width="792" height="20" rx="2" fill="#161b22"/>
  <text x="26"  y="86" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">PasswordAuthentication</text>
  <text x="240" y="86" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">yes</text>
  <text x="580" y="86" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">no (keys only)</text>

  <rect x="14" y="94" width="792" height="20" rx="2" fill="#1f2027"/>
  <text x="26"  y="108" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">ChallengeResponseAuthentication</text>
  <text x="240" y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">yes</text>
  <text x="580" y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">no</text>

  <rect x="14" y="116" width="792" height="20" rx="2" fill="#161b22"/>
  <text x="26"  y="130" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">PermitEmptyPasswords</text>
  <text x="240" y="130" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">no (ok)</text>
  <text x="580" y="130" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">no</text>

  <rect x="14" y="138" width="792" height="20" rx="2" fill="#1f2027"/>
  <text x="26"  y="152" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">Port</text>
  <text x="240" y="152" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">22</text>
  <text x="580" y="152" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">22 (or non-standard)</text>

  <rect x="14" y="160" width="792" height="20" rx="2" fill="#161b22"/>
  <text x="26"  y="174" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">AllowUsers / AllowGroups</text>
  <text x="240" y="174" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">not set (all users)</text>
  <text x="580" y="174" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">AllowUsers ravi deploy</text>

  <rect x="14" y="182" width="792" height="20" rx="2" fill="#1f2027"/>
  <text x="26"  y="196" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">MaxAuthTries</text>
  <text x="240" y="196" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">6</text>
  <text x="580" y="196" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">3</text>

  <rect x="14" y="204" width="792" height="12" rx="2" fill="#161b22"/>
  <text x="26"  y="214" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">After changes: sudo sshd -t (test config)  |  sudo systemctl reload sshd  |  KEEP existing session open while testing!</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 10 — sshd_config hardening, testing, ssh audit tools</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ HARDENED /etc/ssh/sshd_config ═════════════════════════</span>
<span class="cb-cmt"># Server-side SSH configuration</span>
<span class="cb-out">Port 22</span>
<span class="cb-out">AddressFamily inet</span>
<span class="cb-out">ListenAddress 0.0.0.0</span>
<span class="cb-out"></span>
<span class="cb-out"># Host keys (keep strong types only):</span>
<span class="cb-out">HostKey /etc/ssh/ssh_host_ed25519_key</span>
<span class="cb-out">HostKey /etc/ssh/ssh_host_rsa_key</span>
<span class="cb-out"></span>
<span class="cb-out"># Cryptography:</span>
<span class="cb-out">KexAlgorithms curve25519-sha256,diffie-hellman-group14-sha256</span>
<span class="cb-out">Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com</span>
<span class="cb-out">MACs hmac-sha2-256-etm@openssh.com,hmac-sha2-512-etm@openssh.com</span>
<span class="cb-out"></span>
<span class="cb-out"># Authentication:</span>
<span class="cb-out">PermitRootLogin no</span>
<span class="cb-out">MaxAuthTries 3</span>
<span class="cb-out">MaxSessions 10</span>
<span class="cb-out">PubkeyAuthentication yes</span>
<span class="cb-out">AuthorizedKeysFile .ssh/authorized_keys</span>
<span class="cb-out">PasswordAuthentication no</span>
<span class="cb-out">PermitEmptyPasswords no</span>
<span class="cb-out">ChallengeResponseAuthentication no</span>
<span class="cb-out">KerberosAuthentication no</span>
<span class="cb-out">GSSAPIAuthentication no</span>
<span class="cb-out"></span>
<span class="cb-out"># Restriction:</span>
<span class="cb-out">AllowUsers ravi deploy ci-runner</span>
<span class="cb-out"># AllowGroups sshusers</span>
<span class="cb-out"></span>
<span class="cb-out"># Session:</span>
<span class="cb-out">ClientAliveInterval 120</span>
<span class="cb-out">ClientAliveCountMax 3</span>
<span class="cb-out">LoginGraceTime 30</span>
<span class="cb-out">Banner /etc/ssh/banner.txt  # display legal notice</span>
<span class="cb-out"></span>
<span class="cb-out"># Forwarding (disable if not needed):</span>
<span class="cb-out">AllowAgentForwarding no</span>
<span class="cb-out">AllowTcpForwarding no</span>
<span class="cb-out">X11Forwarding no</span>
<span class="cb-out"></span>
<span class="cb-out"># Subsystems:</span>
<span class="cb-out">Subsystem sftp /usr/lib/openssh/sftp-server</span>

<span class="cb-cmt">## ═══ TEST AND APPLY CHANGES ═══════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo sshd -t            <span class="cb-cmt"># test config syntax (dry run)</span>
<span class="cb-prompt">$</span> sudo sshd -T            <span class="cb-cmt"># show effective config (all settings)</span>
<span class="cb-prompt">$</span> sudo systemctl reload sshd   <span class="cb-cmt"># reload (keep existing sessions)</span>
<span class="cb-cmt"># ALWAYS keep an existing SSH session open when editing sshd_config!
# If you lock yourself out, you need console/KVM access.</span>

<span class="cb-cmt">## ═══ SSH AUDIT TOOLS ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> ssh-audit server.example.com    <span class="cb-cmt"># audit key exchange, ciphers, MACs</span>
<span class="cb-out">-- banner ----------------------------------------------------------------------</span>
<span class="cb-out">SSH-2.0-OpenSSH_9.0p1</span>
<span class="cb-out">-- key exchange algorithms -------------------------------------------------------</span>
<span class="cb-out">[info] curve25519-sha256 -- [info] diffie-hellman-group14-sha256</span>
<span class="cb-out">-- server-host-key algorithms ---------------------------------------------------</span>
<span class="cb-out">[good] ssh-ed25519</span>

<span class="cb-cmt">## ═══ authorized_keys FORMAT ══════════════════════════════════</span>
<span class="cb-cmt"># Standard entry:</span>
<span class="cb-out">ssh-ed25519 AAAA...XYZ ravi@laptop</span>

<span class="cb-cmt"># With restrictions (powerful security feature):</span>
<span class="cb-out">from="203.0.113.0/24" ssh-ed25519 AAAA...XYZ  # only from this IP range</span>
<span class="cb-out">command="/opt/backup.sh" ssh-ed25519 AAAA...XYZ  # only run this command</span>
<span class="cb-out">no-pty,no-agent-forwarding,no-port-forwarding ssh-ed25519 AAAA...XYZ</span>
<span class="cb-out">restrict,command="/opt/etl.sh" ssh-ed25519 AAAA...XYZ  # restrict all</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — OpenSSH Internals &amp; Cryptography</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ SSH Transport Layer, Key Exchange (ECDH), Ed25519, OpenSSH Architecture</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. SSH TRANSPORT LAYER (RFC 4253)

   SSH is a layered protocol:
   - Transport Layer:  key exchange, encryption, integrity
   - User Auth Layer:  identity verification
   - Connection Layer: channels (shell, port-forward, sftp)
   
   All run over a single TCP connection on port 22.
   After handshake, everything (including passwords!) is encrypted.

2. KEY EXCHANGE — ECDH WITH CURVE25519

   Both sides generate an ephemeral ECDH keypair:
   - Client:  c_pub, c_priv = ECDH.generate()
   - Server:  s_pub, s_priv = ECDH.generate()
   
   Exchange public keys:
   - Client sends c_pub to server
   - Server sends s_pub to client
   
   Compute shared secret (same on both sides):
   - Client:  secret = ECDH.compute(c_priv, s_pub)
   - Server:  secret = ECDH.compute(s_priv, c_pub)
   
   Derive session keys from secret:
   - Encryption key (client→server)
   - Encryption key (server→client)
   - MAC key (client→server)
   - MAC key (server→client)
   
   Key exchange is performed WITHOUT authenticating either party.
   Authentication comes AFTER the secure channel is established.
   
   Perfect Forward Secrecy: new ECDH keys for every session.
   If server's host key is compromised later, past sessions still safe.

3. HOST AUTHENTICATION — PROTECTING AGAINST MITM

   After key exchange, server must prove it owns the host private key:
   1. Server signs the key exchange hash with its host private key
   2. Client verifies signature using server's host public key
      from ~/.ssh/known_hosts
   
   This prevents man-in-the-middle attacks:
   An attacker can intercept the connection but cannot forge
   the signature without the host private key.
   
   Host keys live in /etc/ssh/:
   - /etc/ssh/ssh_host_ed25519_key      (private)
   - /etc/ssh/ssh_host_ed25519_key.pub  (public → client's known_hosts)

4. USER AUTHENTICATION — PUBLIC KEY METHOD

   Client says: "I have a key whose public part matches authorized_keys"
   1. Client sends: PK-algorithm, public key
   2. Server checks authorized_keys — key found?
   3. Server sends challenge: random 32 bytes + session ID
   4. Client signs challenge with private key using Ed25519
   5. Server verifies signature with public key
   6. If valid: authenticated
   
   Ed25519 signature:
   - Based on twisted Edwards curve over prime field GF(2^255 - 19)
   - 256-bit security, 64-byte signature
   - Non-deterministic (safe even with weak RNG on client)
   - No timing side-channels in reference implementation

5. CHANNEL MULTIPLEXING

   SSH connections carry multiple channels:
   - Session channel: shell, exec, subsystem (sftp)
   - Direct-tcpip: local port forwarding
   - Forwarded-tcpip: remote port forwarding
   - auth-agent@openssh.com: agent forwarding
   
   ControlMaster multiplexing works by:
   - First connection creates Unix socket (SSH_AUTH_SOCK pattern)
   - Subsequent connections talk to first via this socket
   - Request a new channel on the existing connection
   - No new TCP/TLS handshake → much faster

6. SFTP PROTOCOL

   SFTP is NOT FTP over SSH. It is a completely different protocol:
   - Runs as a channel within SSH (subsystem "sftp")
   - Binary protocol: request/response with 32-bit message IDs
   - Server: sftp-server process spawned by sshd
   - Client: sftp command (or any SFTP client)
   
   SFTP operations are atomic: each request has a unique ID,
   server sends response with matching ID. Multiple requests
   can be in flight simultaneously for better performance.
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — SSH in Data Engineering</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Production SSH patterns: tunnel for DB, remote ETL, multi-server deploy</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: PERSISTENT DB TUNNEL IN SCRIPTS ═════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">LOCAL_PORT=5433</span>
<span class="cb-out">REMOTE_DB="db.internal:5432"</span>
<span class="cb-out">JUMP_HOST="bastion"</span>
<span class="cb-out">TUNNEL_PID_FILE="/tmp/db-tunnel.pid"</span>
<span class="cb-out"></span>
<span class="cb-out">start_tunnel() {</span>
<span class="cb-out">    ssh -N -f -L "\${LOCAL_PORT}:\${REMOTE_DB}" "$JUMP_HOST" \</span>
<span class="cb-out">        -o ExitOnForwardFailure=yes \</span>
<span class="cb-out">        -o ServerAliveInterval=30 \</span>
<span class="cb-out">        -o ConnectTimeout=10</span>
<span class="cb-out">    echo $! > "$TUNNEL_PID_FILE"</span>
<span class="cb-out">    sleep 2  # give tunnel time to establish</span>
<span class="cb-out">}</span>
<span class="cb-out">stop_tunnel() { kill "$(cat "$TUNNEL_PID_FILE")" 2>/dev/null; rm -f "$TUNNEL_PID_FILE"; }</span>
<span class="cb-out">trap stop_tunnel EXIT</span>
<span class="cb-out">start_tunnel</span>
<span class="cb-out">psql -h localhost -p "$LOCAL_PORT" -U ravi -d analytics -f migration.sql</span>

<span class="cb-cmt">## ═══ PATTERN 2: MULTI-SERVER DEPLOYMENT ═════════════════════</span>
deploy_to_fleet() {
    local VERSION="$1"
    shift
    local SERVERS=("$@")
    local PIDS=() RESULTS=()

    for SERVER in "\${SERVERS[@]}"; do
        (
            ssh "$SERVER" << EOF
set -e
echo "=== Deploying $VERSION to $(hostname) ==="
cd /opt/app
git fetch && git checkout "$VERSION"
pip install -r requirements.txt -q
sudo systemctl reload app
echo "=== Done ==="
EOF
        ) &
        PIDS+=($!)
    done

    local FAIL=0
    for i in "\${!PIDS[@]}"; do
        if wait "\${PIDS[$i]}"; then
            echo "✅ \${SERVERS[$i]}"
        else
            echo "❌ \${SERVERS[$i]}" >&2
            (( FAIL++ ))
        fi
    done
    return $FAIL
}
deploy_to_fleet "v1.2.3" prod-web-01 prod-web-02 prod-web-03

<span class="cb-cmt">## ═══ PATTERN 3: REMOTE ETL WITH LOCAL KEY ═══════════════════</span>
run_remote_etl() {
    local DATE="\${1:-$(date +%Y-%m-%d)}"
    ssh -A prod-worker << EOF
    set -euo pipefail
    cd /opt/etl
    echo "Running ETL for $DATE"
    source /opt/conda/etc/profile.d/conda.sh
    conda activate etl-env
    python3 main.py --date "$DATE" 2>&1 | tee /var/log/etl/$(date +%Y%m%d).log
EOF
}

<span class="cb-cmt">## ═══ PATTERN 4: SSH KEY IN CI/CD PIPELINES ══════════════════</span>
<span class="cb-cmt"># GitHub Actions example:</span>
<span class="cb-out">- name: Deploy via SSH</span>
<span class="cb-out">  env:</span>
<span class="cb-out">    SSH_PRIVATE_KEY: \${{ secrets.DEPLOY_SSH_KEY }}</span>
<span class="cb-out">  run: |</span>
<span class="cb-out">    mkdir -p ~/.ssh</span>
<span class="cb-out">    echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_ed25519</span>
<span class="cb-out">    chmod 600 ~/.ssh/id_ed25519</span>
<span class="cb-out">    ssh-keyscan prod-server >> ~/.ssh/known_hosts</span>
<span class="cb-out">    ssh deploy@prod-server '/opt/deploy.sh'</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:26%">Command / Option</th><th>Purpose</th><th style="width:25%">Key Detail</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">SSH Connection</td></tr>
<tr><td style="font-family:monospace;">ssh user@host</td><td>Basic connect</td><td><code>-p</code> port, <code>-i</code> key, <code>-l</code> login name</td></tr>
<tr><td style="font-family:monospace;">ssh -v user@host</td><td>Debug connection (-vvv for max)</td><td>Shows exactly why auth fails</td></tr>
<tr><td style="font-family:monospace;">ssh -J jump user@host</td><td>Jump through proxy</td><td>Multiple: <code>-J jump1,jump2</code></td></tr>
<tr><td style="font-family:monospace;">ssh -t user@host cmd</td><td>Force TTY (interactive commands)</td><td><code>sudo htop</code>, <code>vim</code> need TTY</td></tr>
<tr><td style="font-family:monospace;">ssh -N -f -L ...</td><td>Background tunnel (no shell)</td><td><code>-N</code>=no cmd, <code>-f</code>=background</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Key Management</td></tr>
<tr><td style="font-family:monospace;">ssh-keygen -t ed25519</td><td>Generate Ed25519 key pair</td><td><code>-C</code> comment, <code>-f</code> filename, <code>-b</code> bits for RSA</td></tr>
<tr><td style="font-family:monospace;">ssh-copy-id user@host</td><td>Deploy public key to server</td><td><code>-i</code> specific key, <code>-p</code> port</td></tr>
<tr><td style="font-family:monospace;">ssh-keygen -lf keyfile</td><td>Show key fingerprint</td><td><code>-E md5</code> for MD5 format</td></tr>
<tr><td style="font-family:monospace;">ssh-keygen -p -f key</td><td>Change passphrase</td><td>Does not change key content</td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">SSH Agent</td></tr>
<tr><td style="font-family:monospace;">eval $(ssh-agent -s)</td><td>Start agent, export variables</td><td>Run once per session</td></tr>
<tr><td style="font-family:monospace;">ssh-add ~/.ssh/id_ed25519</td><td>Load key into agent</td><td><code>-t 3600</code> expire, <code>-l</code> list, <code>-D</code> remove all</td></tr>
<tr><td style="font-family:monospace;">ssh -A user@host</td><td>Forward agent to remote</td><td>Only to trusted servers!</td></tr>
<tr><td colspan="3" style="background:#2a1a14;color:#f85149;font-weight:bold;font-family:'Segoe UI',sans-serif;">Port Forwarding</td></tr>
<tr><td style="font-family:monospace;">ssh -L local:host:remote</td><td>Local: access remote via local port</td><td><code>-L 5433:db:5432</code></td></tr>
<tr><td style="font-family:monospace;">ssh -R remote:host:local</td><td>Remote: expose local via remote port</td><td><code>-R 9090:localhost:3000</code></td></tr>
<tr><td style="font-family:monospace;">ssh -D 1080</td><td>Dynamic: SOCKS5 proxy</td><td>Route all app traffic via SSH</td></tr>
<tr><td colspan="3" style="background:#1f1428;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">SCP / SFTP</td></tr>
<tr><td style="font-family:monospace;">scp file user@host:/path</td><td>Upload file</td><td><code>-r</code> recursive, <code>-P</code> port, <code>-l</code> bandwidth, <code>-p</code> preserve</td></tr>
<tr><td style="font-family:monospace;">scp user@host:/path file</td><td>Download file</td><td>Uppercase -P for port (unlike ssh)</td></tr>
<tr><td style="font-family:monospace;">sftp user@host</td><td>Interactive file manager</td><td>get/put/mget/mput/ls/cd/mkdir</td></tr>
<tr><td style="font-family:monospace;">sftp -b batchfile host</td><td>Non-interactive batch mode</td><td>Scriptable file operations</td></tr>
<tr><td style="font-family:monospace;">rsync -avz src user@host:dst</td><td>Efficient sync over SSH</td><td><code>--partial</code> resume, <code>--delete</code> mirror</td></tr>
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
    <h4>Exercise 1 — Key Pair Setup and Passwordless Login</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Generate an Ed25519 key pair with your email as comment: <code>ssh-keygen -t ed25519 -C "you@email.com"</code></li>
      <li>Set correct permissions on <code>~/.ssh/</code> directory and key files (700, 600, 644)</li>
      <li>Use <code>ssh-copy-id</code> to deploy the public key to a test server</li>
      <li>Verify passwordless login works: <code>ssh user@server 'whoami'</code></li>
      <li>Start ssh-agent with <code>eval $(ssh-agent -s)</code>, add your key with <code>ssh-add</code></li>
      <li>Verify the key is loaded: <code>ssh-add -l</code></li>
      <li>Show the key fingerprint and explain each part of the output</li>
      <li>Manually add a server's host key to known_hosts using <code>ssh-keyscan</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — ssh_config File</h4>
    <p>Create a complete <code>~/.ssh/config</code> file with these entries:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>A <code>dev</code> alias: connects to <code>dev.example.com</code> port 2222 as user <code>ravi</code> using a specific key</li>
      <li>A <code>prod</code> alias: connects via <code>dev</code> as jump host (ProxyJump) to <code>10.0.0.50</code></li>
      <li>A <code>bastion</code> entry with keepalive settings (ServerAliveInterval, ServerAliveCountMax)</li>
      <li>A wildcard <code>Host prod-*</code> that routes all prod-* names via bastion</li>
      <li>A <code>Host *</code> section with ControlMaster settings for connection reuse</li>
      <li>Test each alias: <code>ssh dev hostname</code>, <code>ssh prod whoami</code></li>
      <li>Verify ControlMaster works: second connection should be near-instant</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Port Forwarding and Tunnels</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Set up a local tunnel to a remote PostgreSQL: <code>ssh -L 5433:localhost:5432 -N -f user@server</code>. Connect with psql and verify it works.</li>
      <li>Create the same tunnel as a config entry with <code>LocalForward</code>. Use <code>ssh -N alias</code> to start it.</li>
      <li>Set up a remote forward: expose your local port 8080 on the remote server as port 9090</li>
      <li>Set up dynamic forwarding (<code>-D 1080</code>) and configure curl to use it: <code>curl --socks5 localhost:1080 http://example.com</code></li>
      <li>Create a tunnel management script: <code>tunnel.sh start|stop|status</code> that manages a background DB tunnel using a PID file</li>
      <li>Combine ProxyJump with LocalForward: tunnel to an internal database through a bastion host in one command</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — SCP, SFTP, and Secure File Transfer</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Upload a directory recursively with bandwidth limited to 5 MB/s using scp</li>
      <li>Write an sftp batch script that: changes to remote directory, downloads all CSV files newer than 7 days, removes files older than 30 days on remote</li>
      <li>Compare transfer speeds: scp vs sftp vs rsync for a 100MB file — explain the difference</li>
      <li>Use rsync over SSH with <code>--partial</code> — interrupt it midway and resume</li>
      <li>Write a script that syncs files to multiple servers in parallel using scp/rsync in the background, collects exit codes, and reports success/failure per server</li>
      <li>Configure an <code>authorized_keys</code> entry that only allows running a specific command (command= restriction) — test that it works</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Complete SSH Infrastructure for a Data Pipeline</h4>
    <p>Build a complete SSH-based infrastructure for a data engineering pipeline:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Key architecture:</strong> Create separate keys for different purposes: deploy key (read-only git), ETL key (write to data servers), bastion key (jump host access). Document which key goes on which server's authorized_keys.</li>
      <li><strong>ssh_config:</strong> Write a complete config file for a 3-tier setup (bastion → app servers → database servers) with proper ProxyJump chains, ControlMaster multiplexing, per-environment keys, and keepalive settings.</li>
      <li><strong>Tunnel manager:</strong> Write <code>tunnels.sh start|stop|status|restart</code> that manages persistent background tunnels to the database, stores PIDs, checks health, and auto-restarts dead tunnels.</li>
      <li><strong>Remote deployment:</strong> Write <code>deploy.sh VERSION ENVIRONMENT</code> that SSHes to all servers in an environment in parallel, runs deployment steps, checks health endpoints, and rolls back if any server fails.</li>
      <li><strong>Security hardening:</strong> Write a script that audits <code>authorized_keys</code> on all servers — finds any keys not in your approved list, reports them, and optionally removes them.</li>
      <li><strong>SFTP-only user:</strong> Configure sshd_config to create an sftp-only jail for a data-transfer user (ChrootDirectory, ForceCommand internal-sftp, no shell access).</li>
    </ol>
    <p><strong>Must handle: connection failures with retry, agent not running, key permission errors, bastion unreachable.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Infrastructure — Day 410</div>
    <p>Six months after that first production server moment, Ravi's <code>~/.ssh/config</code> had 47 entries. Staging, production, DR, all regions, all jump hosts — one word each. His tunnel manager kept the DB tunnel alive and restarted it automatically if it died. His deploy script ran in parallel across the entire fleet and rolled back automatically if any server's health check failed.</p>
    <p>More importantly, he understood what was happening at each step. When the "host key changed" warning appeared during a server rebuild, he knew why it appeared, how to verify the new fingerprint, and how to update known_hosts correctly. When a junior engineer accidentally committed a private key to Git, Ravi was the one who explained why it needed to be rotated immediately even if nobody had seen it yet — the key was compromised the moment it was in any git history, even a private repo.</p>
    <p>"SSH is not just a login tool," he told the junior engineer. "It's a cryptographic identity system. The private key is your identity. Protect it like a password you can never change."</p>
    <p><strong>Keys authenticate. Tunnels connect. Config files orchestrate. Together they turn SSH from a login tool into infrastructure.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};