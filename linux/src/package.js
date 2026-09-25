var package_management = {
    title: "Package Management \u2014 apt, yum, dnf & snap",
    description: "Master Linux package management across all major distributions \u2014 apt and dpkg on Debian/Ubuntu, yum and dnf on RHEL/CentOS/Fedora, snap and Flatpak for universal packages, pip and pipx for Python. Includes security updates, GPG verification, custom repositories, held packages, and automation.",
    content: `
<style>
@keyframes pm-flow  { 0%{stroke-dashoffset:28}  100%{stroke-dashoffset:0} }
@keyframes pm-pulse { 0%,100%{opacity:1}         50%{opacity:.15} }
@keyframes pm-blink { 0%,100%{fill:#3fb950;stroke:#3fb950} 50%{fill:#0a1a0a;stroke:#238636} }
@keyframes pm-lock  { 0%,100%{fill:#2a1a14;stroke:#f85149} 50%{fill:#1a0000;stroke:#ff6b6b} }
@keyframes pm-dl    { 0%{width:0%} 100%{width:88%} }
@keyframes pm-spin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes pm-pop   { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
.pm-flow  { stroke-dasharray:7 5; animation: pm-flow  .9s linear infinite; }
.pm-pulse { animation: pm-pulse 1.8s ease-in-out infinite; }
.pm-blink { animation: pm-blink 2.4s ease-in-out infinite; }
.pm-lock  { animation: pm-lock  1.2s ease-in-out infinite; }
.pm-pop   { animation: pm-pop   .6s cubic-bezier(.34,1.56,.64,1) both; }
</style>
<div class="story-panel">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">Ravi Installs Software on Production &#x2014; Day 550</div>
    <p>The new data engineering server was running Ubuntu 22.04. Ravi needed Python 3.11, PostgreSQL client, jq, csvkit, and redis-cli. He typed <code>apt install python3.11</code> and pressed Enter.</p>
    <br>
    <p>"Wait," Priya said. "What version is already installed? What will this break? Did you update the package lists first? And do you know where that package is coming from?"</p>
    <br>
    <p>Ravi had thought <code>apt install</code> was like "download and run the installer." Priya spent an hour walking him through what actually happens: the package index cache, the dependency resolver, the GPG verification chain, the dpkg database, the pre/post install scripts &#x2014; and why running <code>sudo apt upgrade</code> blindly on a database server can break production in one command.</p>
    <br>
    <p>By the end of that hour, Ravi understood that a package manager is not just a downloader. It is the mechanism by which you express the intended state of your system &#x2014; and the tool that makes that state real.</p>
  </div>
</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num">01</span> The Linux Package Ecosystem &#x2014; Distro Families &amp; Their Tools</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 330" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="pm-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="pm-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="pm-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="pm-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="pm-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="pm-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="330" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Linux Distribution Families &#x2014; Package Format &amp; Tools</text>
  <!-- DEBIAN -->
  <rect x="14"  y="36" width="252" height="282" rx="10" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="140" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">Debian Family</text>
  <text x="140" y="74"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">Format: .deb   Low-level: dpkg</text>
  <text x="140" y="90"  text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">High-level: apt / apt-get</text>
  <rect x="30"  y="100" width="222" height="26" rx="5" fill="#0e2840" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="141" y="117" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10.5" font-weight="bold" fill="#58a6ff">Debian (root)</text>
  <rect x="30"  y="134" width="104" height="26" rx="5" fill="#1a3060" stroke="#58a6ff" stroke-width="1"/>
  <text x="82"  y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Ubuntu LTS</text>
  <rect x="30"  y="168" width="104" height="26" rx="5" fill="#1a3060" stroke="#58a6ff" stroke-width="1"/>
  <text x="82"  y="185" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Ubuntu Server</text>
  <rect x="30"  y="202" width="104" height="26" rx="5" fill="#1a3060" stroke="#58a6ff" stroke-width="1"/>
  <text x="82"  y="219" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Kali / Mint</text>
  <rect x="148" y="134" width="104" height="26" rx="5" fill="#1a3060" stroke="#58a6ff" stroke-width="1"/>
  <text x="200" y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Raspberry Pi OS</text>
  <rect x="148" y="168" width="104" height="26" rx="5" fill="#1a3060" stroke="#58a6ff" stroke-width="1"/>
  <text x="200" y="185" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Pop!_OS</text>
  <rect x="148" y="202" width="104" height="26" rx="5" fill="#1a3060" stroke="#58a6ff" stroke-width="1"/>
  <text x="200" y="219" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Linux Mint</text>
  <text x="140" y="256" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Repos: /etc/apt/sources.list</text>
  <text x="140" y="271" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">DB: /var/lib/dpkg/status</text>
  <text x="140" y="286" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Keys: /etc/apt/keyrings/</text>
  <text x="140" y="309" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Data Engineering default</text>
  <!-- RHEL -->
  <rect x="284" y="36" width="252" height="282" rx="10" fill="#1a2a14" stroke="#3fb950" stroke-width="2"/>
  <text x="410" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">Red Hat Family</text>
  <text x="410" y="74"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">Format: .rpm   Low-level: rpm</text>
  <text x="410" y="90"  text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">High-level: dnf (yum legacy)</text>
  <rect x="300" y="100" width="220" height="26" rx="5" fill="#1a3a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="410" y="117" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10.5" font-weight="bold" fill="#3fb950">RHEL (root)</text>
  <rect x="300" y="134" width="104" height="26" rx="5" fill="#1a3a20" stroke="#3fb950" stroke-width="1"/>
  <text x="352" y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Fedora</text>
  <rect x="300" y="168" width="104" height="26" rx="5" fill="#1a3a20" stroke="#3fb950" stroke-width="1"/>
  <text x="352" y="185" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">CentOS Stream</text>
  <rect x="300" y="202" width="104" height="26" rx="5" fill="#1a3a20" stroke="#3fb950" stroke-width="1"/>
  <text x="352" y="219" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">AlmaLinux</text>
  <rect x="418" y="134" width="104" height="26" rx="5" fill="#1a3a20" stroke="#3fb950" stroke-width="1"/>
  <text x="470" y="151" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Rocky Linux</text>
  <rect x="418" y="168" width="104" height="26" rx="5" fill="#1a3a20" stroke="#3fb950" stroke-width="1"/>
  <text x="470" y="185" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Amazon Linux</text>
  <rect x="418" y="202" width="104" height="26" rx="5" fill="#1a3a20" stroke="#3fb950" stroke-width="1"/>
  <text x="470" y="219" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">Oracle Linux</text>
  <text x="410" y="256" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Repos: /etc/yum.repos.d/</text>
  <text x="410" y="271" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">DB: /var/lib/rpm/</text>
  <text x="410" y="286" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Keys: /etc/pki/rpm-gpg/</text>
  <text x="410" y="309" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Cloud / enterprise default</text>
  <!-- Universal -->
  <rect x="554" y="36" width="252" height="282" rx="10" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="680" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#bc8cff">Universal / Cross-Distro</text>
  <text x="680" y="74"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Sandboxed, works on any distro</text>
  <rect x="568" y="90"  width="224" height="32" rx="6" fill="#2a1a3a" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="680" y="111" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#bc8cff">snap (snapd)</text>
  <rect x="568" y="130" width="224" height="32" rx="6" fill="#1a2a3a" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="680" y="151" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#58a6ff">flatpak</text>
  <rect x="568" y="170" width="224" height="32" rx="6" fill="#1a3a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="680" y="191" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#3fb950">pip / pipx (Python)</text>
  <rect x="568" y="210" width="224" height="32" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="680" y="231" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" font-weight="bold" fill="#ffa657">AppImage (.AppImage)</text>
  <rect x="568" y="250" width="224" height="26" rx="6" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="680" y="267" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">pacman (Arch / Manjaro)</text>
  <text x="680" y="295" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Snaps: /var/lib/snapd/</text>
  <text x="680" y="310" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Flatpak: ~/.local/share/flatpak/</text>

</svg>
</div>
<p class="diagram-caption">On any unknown server: <code>cat /etc/os-release</code> identifies the distro. <code>which apt dnf yum 2>/dev/null</code> confirms the available package manager.</p>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 12 — Identify distro, detect package manager, universal installer script</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; IDENTIFY YOUR DISTRO &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> cat /etc/os-release
<span class="cb-out">NAME="Ubuntu"</span>
<span class="cb-out">VERSION="22.04.3 LTS (Jammy Jellyfish)"</span>
<span class="cb-out">ID=ubuntu</span>
<span class="cb-out">ID_LIKE=debian</span>
<span class="cb-out">VERSION_ID="22.04"</span>
<span class="cb-prompt">$</span> lsb_release -a                 <span class="cb-cmt"># Debian/Ubuntu only</span>
<span class="cb-prompt">$</span> cat /etc/redhat-release         <span class="cb-cmt"># RHEL/CentOS/Fedora</span>
<span class="cb-prompt">$</span> uname -r                        <span class="cb-cmt"># kernel version</span>
<span class="cb-out">5.15.0-91-generic</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DETECT PACKAGE MANAGER &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> which apt dnf yum pacman 2>/dev/null
<span class="cb-out">/usr/bin/apt</span>

<span class="cb-cmt"># Universal installer for cross-distro scripts:</span>
<span class="cb-out">install_package() {</span>
<span class="cb-out">    local PKG="$1"</span>
<span class="cb-out">    if   command -v apt-get &gt;/dev/null 2&gt;&amp;1; then sudo apt-get install -y "$PKG"</span>
<span class="cb-out">    elif command -v dnf     &gt;/dev/null 2&gt;&amp;1; then sudo dnf install -y "$PKG"</span>
<span class="cb-out">    elif command -v yum     &gt;/dev/null 2&gt;&amp;1; then sudo yum install -y "$PKG"</span>
<span class="cb-out">    elif command -v pacman  &gt;/dev/null 2&gt;&amp;1; then sudo pacman -S --noconfirm "$PKG"</span>
<span class="cb-out">    else echo "No supported package manager found" &gt;&amp;2; return 1; fi</span>
<span class="cb-out">}</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Package Anatomy &#x2014; Inside a .deb and .rpm</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="pm-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="pm-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="pm-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="pm-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="pm-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="pm-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="260" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">.deb Package Anatomy &#x2014; Three Layers Inside Every Package</text>
  <!-- outer .deb -->
  <rect x="14"  y="36" width="792" height="212" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="26"  y="56" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">nginx_1.24.0_amd64.deb (ar archive)</text>
  <!-- debian-binary -->
  <rect x="26"  y="64" width="760" height="28" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="36"  y="82" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">debian-binary</text>
  <text x="160" y="82" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2192; contains "2.0
" — format version marker. Checked first.</text>
  <!-- control.tar -->
  <rect x="26"  y="100" width="760" height="64" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="36"  y="120" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#ffa657">control.tar.xz</text>
  <text x="36"  y="138" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">  control    &#x2014; name, version, arch, Depends, Recommends, Description</text>
  <text x="36"  y="155" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">  preinst / postinst / prerm / postrm   &#x2014; lifecycle scripts (run as root)</text>
  <text x="36"  y="159" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">  md5sums   &#x2014; checksum of every file that will be installed</text>
  <!-- data.tar -->
  <rect x="26"  y="172" width="760" height="36" rx="5" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="36"  y="192" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#bc8cff">data.tar.xz</text>
  <text x="36"  y="202" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">  /usr/sbin/nginx   /etc/nginx/nginx.conf   /lib/systemd/system/nginx.service   /var/log/nginx/   ...</text>
  <!-- dep types key -->
  <text x="26"  y="234" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#ffa657">Dependency types: </text>
  <text x="142" y="234" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">Depends</text> <text x="192" y="234" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">=MUST  </text>
  <text x="240" y="234" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">Recommends</text> <text x="324" y="234" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">=apt installs by default  </text>
  <text x="490" y="234" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">Suggests</text> <text x="546" y="234" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">=optional  </text>
  <text x="610" y="234" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">Conflicts</text> <text x="670" y="234" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">=cannot coexist</text>
  <text x="26"  y="248" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">postinst runs after files are placed &#x2014; this is how systemctl daemon-reload happens automatically after installing a service.</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 12 — apt: update, install, remove, purge, upgrade, search, show</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ALWAYS UPDATE FIRST &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo apt update
<span class="cb-out">Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease</span>
<span class="cb-out">Get:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]</span>
<span class="cb-out">12 packages can be upgraded. Run 'apt list --upgradable'</span>
<span class="cb-cmt"># apt update ONLY refreshes the index. Never installs anything.
# Run before every install/upgrade.</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INSTALL &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo apt install nginx                          <span class="cb-cmt"># latest available</span>
<span class="cb-prompt">$</span> sudo apt install nginx=1.24.0-1ubuntu1           <span class="cb-cmt"># specific version</span>
<span class="cb-prompt">$</span> sudo apt install -y nginx jq curl                <span class="cb-cmt"># -y auto-yes, multiple pkgs</span>
<span class="cb-prompt">$</span> sudo apt install --no-install-recommends nginx   <span class="cb-cmt"># skip Recommends</span>
<span class="cb-prompt">$</span> sudo apt install -f                              <span class="cb-cmt"># fix broken deps</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; REMOVE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo apt remove nginx             <span class="cb-cmt"># remove binary (KEEP config files)</span>
<span class="cb-prompt">$</span> sudo apt purge nginx               <span class="cb-cmt"># remove + DELETE all config files</span>
<span class="cb-prompt">$</span> sudo apt autoremove                <span class="cb-cmt"># remove orphaned dependencies</span>
<span class="cb-prompt">$</span> sudo apt autoremove --purge        <span class="cb-cmt"># remove + purge orphan configs</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; UPGRADE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> apt list --upgradable              <span class="cb-cmt"># preview what would upgrade</span>
<span class="cb-prompt">$</span> sudo apt upgrade -s                <span class="cb-cmt"># -s: simulate (dry run, no changes)</span>
<span class="cb-prompt">$</span> sudo apt upgrade                   <span class="cb-cmt"># safe (won't remove packages)</span>
<span class="cb-prompt">$</span> sudo apt full-upgrade              <span class="cb-cmt"># may remove packages — review first!</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SEARCH AND INFO &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> apt search nginx                   <span class="cb-cmt"># search by name/description</span>
<span class="cb-prompt">$</span> apt show nginx                     <span class="cb-cmt"># full package details</span>
<span class="cb-prompt">$</span> apt-cache policy nginx             <span class="cb-cmt"># installed vs candidate version</span>
<span class="cb-out">nginx:</span>
<span class="cb-out">  Installed: 1.24.0-1ubuntu1</span>
<span class="cb-out">  Candidate: 1.24.0-1ubuntu1</span>
<span class="cb-out">  Version table:</span>
<span class="cb-out"> *** 1.24.0-1ubuntu1 500</span>
<span class="cb-out">        500 http://archive.ubuntu.com jammy-updates/main Packages</span>
<span class="cb-prompt">$</span> apt-cache rdepends nginx           <span class="cb-cmt"># what packages depend on nginx</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> dpkg &#x2014; Low-Level Debian Package Operations</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="pm-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="pm-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="pm-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="pm-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="pm-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="pm-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="240" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">apt install nginx &#x2014; What Happens Under the Hood</text>
  <!-- Stage boxes -->
  <rect x="14"  y="40" width="164" height="60" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="96"  y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">&#x2460; Check Index Cache</text>
  <text x="96"  y="78"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">/var/lib/apt/lists/</text>
  <text x="96"  y="92"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">package metadata</text>
  <line x1="178" y1="70" x2="218" y2="70" stroke="#ffa657" stroke-width="2.5" marker-end="url(#pm-orn)" class="pm-flow"/>
  <rect x="218" y="40" width="164" height="60" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="300" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">&#x2461; Resolve Deps</text>
  <text x="300" y="78"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">nginx needs:</text>
  <text x="300" y="92"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">libc6, libssl3, nginx-common</text>
  <line x1="382" y1="70" x2="422" y2="70" stroke="#ffa657" stroke-width="2.5" marker-end="url(#pm-orn)" class="pm-flow"/>
  <rect x="422" y="40" width="164" height="60" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="504" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">&#x2462; Download .debs</text>
  <text x="504" y="78"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">from sources.list URLs</text>
  <text x="504" y="92"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">GPG signature verified</text>
  <line x1="586" y1="70" x2="626" y2="70" stroke="#ffa657" stroke-width="2.5" marker-end="url(#pm-orn)" class="pm-flow"/>
  <rect x="626" y="40" width="180" height="60" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="716" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">&#x2463; dpkg install</text>
  <text x="716" y="74"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">preinst &#x2192; unpack &#x2192;</text>
  <text x="716" y="88"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">postinst &#x2192; update db</text>
  <!-- Dep tree -->
  <rect x="14"  y="118" width="792" height="110" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="138" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Dependency tree that apt resolves automatically:</text>
  <rect x="348" y="146" width="124" height="26" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="410" y="163" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">nginx</text>
  <line x1="348" y1="159" x2="190" y2="189" stroke="#ffa657" stroke-width="1.5" marker-end="url(#pm-orn)"/>
  <line x1="410" y1="172" x2="410" y2="189" stroke="#ffa657" stroke-width="1.5" marker-end="url(#pm-orn)"/>
  <line x1="472" y1="159" x2="630" y2="189" stroke="#ffa657" stroke-width="1.5" marker-end="url(#pm-orn)"/>
  <rect x="106" y="189" width="168" height="24" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="190" y="205" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">nginx-common (new)</text>
  <rect x="326" y="189" width="168" height="24" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="410" y="205" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">libc6 (already installed)</text>
  <rect x="546" y="189" width="168" height="24" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="630" y="205" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">libssl3 (already installed)</text>
  <text x="410" y="222" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Green = already installed (skip download)   Blue = new packages to download   apt installs in dependency order</text>

</svg>
</div>
<p class="diagram-caption"><code>apt</code> = interactive terminal use (progress bars, colour). <code>apt-get</code> = scripts/CI (stable output). <code>dpkg</code> = low-level, no dep resolution.</p>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 12 — dpkg: list, file ownership, inspect .deb, install, verify</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; LIST INSTALLED PACKAGES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> dpkg -l                            <span class="cb-cmt"># list ALL installed packages</span>
<span class="cb-prompt">$</span> dpkg -l nginx                       <span class="cb-cmt"># specific package status</span>
<span class="cb-out">||/ Name   Version         Architecture Description</span>
<span class="cb-out">ii  nginx  1.24.0-1ubuntu1 amd64        high performance web server</span>
<span class="cb-cmt"># ii=installed  rc=removed(config left)  un=not installed  hi=held</span>
<span class="cb-prompt">$</span> dpkg -l | grep "^ii" | wc -l       <span class="cb-cmt"># count installed packages</span>
<span class="cb-prompt">$</span> dpkg -l "python3*"                  <span class="cb-cmt"># wildcard search</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; LIST FILES IN A PACKAGE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> dpkg -L nginx
<span class="cb-out">/etc/nginx</span>
<span class="cb-out">/etc/nginx/nginx.conf</span>
<span class="cb-out">/lib/systemd/system/nginx.service</span>
<span class="cb-out">/usr/sbin/nginx</span>
<span class="cb-out">/var/log/nginx</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; FIND WHICH PACKAGE OWNS A FILE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> dpkg -S /usr/sbin/nginx
<span class="cb-out">nginx: /usr/sbin/nginx</span>
<span class="cb-prompt">$</span> dpkg -S /usr/bin/jq
<span class="cb-out">jq: /usr/bin/jq</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INSPECT A .deb FILE (before installing) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> dpkg -I package.deb                 <span class="cb-cmt"># show control info (deps, version)</span>
<span class="cb-prompt">$</span> dpkg --contents package.deb          <span class="cb-cmt"># list files it would install</span>
<span class="cb-prompt">$</span> dpkg -x package.deb /tmp/extracted   <span class="cb-cmt"># extract files without installing</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INSTALL / REMOVE VIA dpkg DIRECTLY &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo dpkg -i package.deb             <span class="cb-cmt"># install .deb (no dep resolution)</span>
<span class="cb-prompt">$</span> sudo apt-get install -f              <span class="cb-cmt"># fix broken deps after dpkg -i</span>
<span class="cb-prompt">$</span> sudo dpkg -r nginx                   <span class="cb-cmt"># remove (keep config)</span>
<span class="cb-prompt">$</span> sudo dpkg -P nginx                   <span class="cb-cmt"># purge (remove + config)</span>
<span class="cb-cmt"># dpkg -i is low-level. Use apt install for dep resolution.
# dpkg is useful for .deb files downloaded manually.</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Repositories &amp; sources.list &#x2014; Where Packages Come From</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="pm-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="pm-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="pm-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="pm-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="pm-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="pm-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="240" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">sources.list Entry Anatomy &#x2014; Every Field Explained</text>
  <rect x="14"  y="36" width="792" height="38" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="26"  y="60" font-family="'Courier New',monospace" font-size="12">
    <tspan fill="#f85149">deb</tspan>
    <tspan fill="#e6edf3"> </tspan>
    <tspan fill="#58a6ff">[arch=amd64 signed-by=/etc/apt/keyrings/nginx.gpg]</tspan>
    <tspan fill="#e6edf3"> </tspan>
    <tspan fill="#3fb950">https://nginx.org/packages/ubuntu</tspan>
    <tspan fill="#e6edf3"> </tspan>
    <tspan fill="#ffa657">jammy</tspan>
    <tspan fill="#e6edf3"> </tspan>
    <tspan fill="#bc8cff">nginx</tspan>
  </text>
  <line x1="37"  y1="74" x2="37"  y2="100" stroke="#f85149" stroke-width="1.5"/>
  <rect x="14"   y="100" width="68" height="46" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1"/>
  <text x="48"   y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#f85149">Type</text>
  <text x="48"   y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">deb=binary</text>
  <text x="48"   y="144" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">deb-src=source</text>
  <line x1="205" y1="74" x2="205" y2="100" stroke="#58a6ff" stroke-width="1.5"/>
  <rect x="88"   y="100" width="230" height="46" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="203"  y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#58a6ff">Options block [ ]</text>
  <text x="203"  y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">arch= limit architecture</text>
  <text x="203"  y="144" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">signed-by= GPG key path (modern)</text>
  <line x1="490" y1="74" x2="490" y2="100" stroke="#3fb950" stroke-width="1.5"/>
  <rect x="324"  y="100" width="332" height="46" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="490"  y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#3fb950">URI (repository server)</text>
  <text x="490"  y="133" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">https://nginx.org/packages/ubuntu</text>
  <text x="490"  y="144" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">or file:/// for local mirror</text>
  <line x1="680" y1="74" x2="680" y2="100" stroke="#ffa657" stroke-width="1.5"/>
  <rect x="662"  y="100" width="68" height="46" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1"/>
  <text x="696"  y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#ffa657">Suite</text>
  <text x="696"  y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">jammy</text>
  <text x="696"  y="144" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">focal/noble</text>
  <line x1="793" y1="74" x2="793" y2="100" stroke="#bc8cff" stroke-width="1.5"/>
  <rect x="736"  y="100" width="70" height="46" rx="5" fill="#1f1428" stroke="#bc8cff" stroke-width="1"/>
  <text x="771"  y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">Component</text>
  <text x="771"  y="133" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">nginx</text>
  <text x="771"  y="144" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">main/universe</text>
  <rect x="14"   y="158" width="792" height="72" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"   y="176" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Ubuntu standard components &amp; archive pockets:</text>
  <text x="26"   y="193" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">main</text>     <text x="68"  y="193" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">=Free, Canonical supported  </text>
  <text x="244"  y="193" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">universe</text><text x="304"  y="193" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">=Free, community maintained  </text>
  <text x="502"  y="193" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">restricted</text><text x="572" y="193" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">=Non-free drivers  </text>
  <text x="706"  y="193" font-family="'Courier New',monospace" font-size="10" fill="#f85149">multiverse</text>
  <text x="26"   y="211" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Pockets: </text>
  <text x="82"   y="211" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">jammy</text><text x="128" y="211" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">=release (static)  </text>
  <text x="263"  y="211" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">jammy-updates</text><text x="373" y="211" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">=bug fixes  </text>
  <text x="462"  y="211" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">jammy-security</text><text x="576" y="211" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">=CVE patches  </text>
  <text x="674"  y="211" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">jammy-backports</text>
  <text x="26"   y="225" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">&#x26A0; Always include jammy-security. Never rely on jammy alone &#x2014; it gets no updates after release.</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 12 — sources.list, PPAs, adding third-party repos with GPG keys</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; VIEW CURRENT SOURCES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> cat /etc/apt/sources.list               <span class="cb-cmt"># main file</span>
<span class="cb-prompt">$</span> ls /etc/apt/sources.list.d/             <span class="cb-cmt"># per-app .list files</span>
<span class="cb-prompt">$</span> apt-cache policy                        <span class="cb-cmt"># all active repos + priorities</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ADD A PPA (Ubuntu / Launchpad) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># PPA = Personal Package Archive (Launchpad-hosted)</span>
<span class="cb-prompt">$</span> sudo add-apt-repository ppa:deadsnakes/ppa   <span class="cb-cmt"># Python 3.12+</span>
<span class="cb-prompt">$</span> sudo apt update
<span class="cb-prompt">$</span> sudo apt install python3.12
<span class="cb-cmt"># add-apt-repository: adds GPG key + .list file automatically</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ADD THIRD-PARTY REPO (modern signed-by= approach) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Nginx official repo (Ubuntu 22.04):</span>
<span class="cb-out">curl -fsSL https://nginx.org/keys/nginx_signing.key \</span>
<span class="cb-out">    | gpg --dearmor -o /etc/apt/keyrings/nginx.gpg</span>
<span class="cb-out">chmod 644 /etc/apt/keyrings/nginx.gpg</span>
<span class="cb-out">echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/nginx.gpg] \</span>
<span class="cb-out">  https://nginx.org/packages/ubuntu $(lsb_release -cs) nginx" \</span>
<span class="cb-out">  | sudo tee /etc/apt/sources.list.d/nginx.list</span>
<span class="cb-out">sudo apt update &amp;&amp; sudo apt install nginx</span>

<span class="cb-cmt"># Docker official repo:</span>
<span class="cb-out">install -m 0755 -d /etc/apt/keyrings</span>
<span class="cb-out">curl -fsSL https://download.docker.com/linux/ubuntu/gpg \</span>
<span class="cb-out">    | gpg --dearmor -o /etc/apt/keyrings/docker.gpg</span>
<span class="cb-out">echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \</span>
<span class="cb-out">  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \</span>
<span class="cb-out">  | sudo tee /etc/apt/sources.list.d/docker.list</span>
<span class="cb-out">sudo apt update &amp;&amp; sudo apt install docker-ce</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; REMOVE A REPO &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo add-apt-repository --remove ppa:deadsnakes/ppa
<span class="cb-prompt">$</span> sudo rm /etc/apt/sources.list.d/nginx.list
<span class="cb-prompt">$</span> sudo rm /etc/apt/keyrings/nginx.gpg
<span class="cb-prompt">$</span> sudo apt update &amp;&amp; sudo apt autoremove
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> GPG Verification &amp; Secure Repository Setup</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="pm-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="pm-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="pm-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="pm-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="pm-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="pm-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">GPG Verification Chain &#x2014; How apt Trusts a Package</text>
  <rect x="14"  y="36" width="130" height="54" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="79"  y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Trusted Key</text>
  <text x="79"  y="73"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#8b949e">/etc/apt/keyrings/</text>
  <text x="79"  y="85"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#bc8cff">nginx.gpg</text>
  <line x1="144" y1="63" x2="180" y2="63" stroke="#bc8cff" stroke-width="2" marker-end="url(#pm-pur)" class="pm-flow"/>
  <rect x="180" y="36" width="140" height="54" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="250" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">InRelease file</text>
  <text x="250" y="73"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">signed by repo owner</text>
  <text x="250" y="85"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">verified vs key &#x2713;</text>
  <line x1="320" y1="63" x2="356" y2="63" stroke="#ffa657" stroke-width="2" marker-end="url(#pm-orn)" class="pm-flow"/>
  <rect x="356" y="36" width="140" height="54" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="426" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Packages.gz</text>
  <text x="426" y="73"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">SHA256 from InRelease</text>
  <text x="426" y="85"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">hash verified &#x2713;</text>
  <line x1="496" y1="63" x2="532" y2="63" stroke="#3fb950" stroke-width="2" marker-end="url(#pm-grn)" class="pm-flow"/>
  <rect x="532" y="36" width="140" height="54" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="602" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">nginx.deb SHA256</text>
  <text x="602" y="73"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">from Packages.gz</text>
  <text x="602" y="85"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">hash verified &#x2713;</text>
  <line x1="672" y1="63" x2="708" y2="63" stroke="#58a6ff" stroke-width="2" marker-end="url(#pm-blu)" class="pm-flow"/>
  <rect x="708" y="36" width="98"  height="54" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="757" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">&#x2705; Install</text>
  <text x="757" y="73"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">chain complete</text>
  <text x="757" y="85"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">trusted</text>
  <rect x="14"  y="104" width="792" height="84" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"  y="122" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Modern key setup (signed-by= approach &#x2014; required on Ubuntu 22.04+):</text>
  <text x="26"  y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">curl -fsSL https://nginx.org/keys/nginx_signing.key | gpg --dearmor -o /etc/apt/keyrings/nginx.gpg</text>
  <text x="26"  y="158" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/nginx.gpg] https://nginx.org/packages/ubuntu jammy nginx" \</text>
  <text x="26"  y="174" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">  | sudo tee /etc/apt/sources.list.d/nginx.list</text>
  <text x="26"  y="180" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">If ANY step in the chain fails: apt refuses to install and prints "W: GPG error"</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 12 — Security upgrades, unattended-upgrades, hold, APT pinning</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; REVIEW AVAILABLE SECURITY UPGRADES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> apt list --upgradable 2>/dev/null | grep -i security
<span class="cb-prompt">$</span> sudo apt-get -s dist-upgrade | grep "^Inst" | grep -i security | head -20
<span class="cb-cmt"># -s: simulate. Lists packages that have security updates.</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; UNATTENDED-UPGRADES (AUTO SECURITY PATCHES) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo apt install unattended-upgrades
<span class="cb-prompt">$</span> sudo dpkg-reconfigure --priority=low unattended-upgrades
<span class="cb-cmt"># Configure: /etc/apt/apt.conf.d/50unattended-upgrades
# Key settings:
#   Unattended-Upgrade::Allowed-Origins: "\${distro}-security"
#   Unattended-Upgrade::AutoFixInterruptedDpkg: true
#   Unattended-Upgrade::Remove-Unused-Dependencies: true</span>

<span class="cb-cmt"># Dry run to test:</span>
<span class="cb-prompt">$</span> sudo unattended-upgrade --dry-run --debug 2&gt;&amp;1 | head -40
<span class="cb-prompt">$</span> cat /var/log/unattended-upgrades/unattended-upgrades.log

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; HOLD PACKAGES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo apt-mark hold postgresql-14     <span class="cb-cmt"># prevent upgrade to postgresql-15</span>
<span class="cb-prompt">$</span> sudo apt-mark hold linux-image-generic   <span class="cb-cmt"># lock kernel version</span>
<span class="cb-prompt">$</span> apt-mark showhold                    <span class="cb-cmt"># list all held packages</span>
<span class="cb-out">linux-image-generic</span>
<span class="cb-out">postgresql-14</span>
<span class="cb-prompt">$</span> sudo apt-mark unhold postgresql-14   <span class="cb-cmt"># release hold</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; APT PINNING (fine-grained version control) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># /etc/apt/preferences.d/nginx.pref:</span>
<span class="cb-out">Package: nginx</span>
<span class="cb-out">Pin: version 1.24.0*</span>
<span class="cb-out">Pin-Priority: 1001    # &gt;1000 = will even downgrade if needed</span>
<span class="cb-cmt"># Priority 990 = prefer this but won't downgrade
# Check effective priorities: apt-cache policy nginx</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CHECK IF RESTART NEEDED AFTER UPGRADE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo needrestart              <span class="cb-cmt"># which services need restart</span>
<span class="cb-prompt">$</span> cat /var/run/reboot-required   <span class="cb-cmt"># exists if kernel was updated</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Upgrade Strategy, Held Packages &amp; Security</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="pm-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="pm-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="pm-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="pm-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="pm-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="pm-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Upgrade Strategy &#x2014; Choosing the Right Command</text>
  <rect x="14"  y="36" width="248" height="110" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="138" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">apt upgrade</text>
  <text x="24"  y="75"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Upgrades installed packages</text>
  <text x="24"  y="91"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Installs new deps if needed</text>
  <text x="24"  y="107" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x274C; Won't remove any package</text>
  <text x="24"  y="123" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x274C; Held-back packages stay</text>
  <text x="24"  y="139" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Safe for most servers</text>
  <rect x="286" y="36" width="248" height="110" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="410" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">apt full-upgrade</text>
  <text x="296" y="75"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Upgrades all packages</text>
  <text x="296" y="91"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Handles held-back packages</text>
  <text x="296" y="107" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">&#x26A0; MAY remove packages</text>
  <text x="296" y="123" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">&#x26A0; Review plan first: apt -s upgrade</text>
  <text x="296" y="139" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">&#x26A0; Never blindly on prod DB server!</text>
  <rect x="558" y="36" width="248" height="110" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="682" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Security-Only Updates</text>
  <text x="568" y="75"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Safest for production</text>
  <text x="568" y="91"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; CVE/security patches only</text>
  <text x="568" y="107" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">unattended-upgrades</text>
  <text x="568" y="123" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">targets jammy-security pocket</text>
  <text x="568" y="139" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#58a6ff">Enable on every server</text>
  <rect x="14"  y="158" width="792" height="26" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1.5" class="pm-lock"/>
  <text x="26"  y="175" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#f85149">&#x1F512; Hold packages: </text>
  <text x="128" y="175" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">sudo apt-mark hold nginx</text>
  <text x="310" y="175" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  &#x2014;  </text>
  <text x="330" y="175" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">sudo apt-mark unhold nginx</text>
  <text x="514" y="175" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  &#x2014;  </text>
  <text x="534" y="175" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">apt-mark showhold</text>

</svg>
</div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> dnf / yum &#x2014; Red Hat Package Management</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="pm-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="pm-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="pm-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="pm-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="pm-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="pm-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">dnf Transaction Flow &#x2014; SAT Solver, Atomic Transactions, History Rollback</text>
  <rect x="14"  y="40" width="148" height="56" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="88"  y="61"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">&#x2460; SAT Resolve</text>
  <text x="88"  y="77"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">libsolv solver</text>
  <text x="88"  y="90"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">optimal dep graph</text>
  <line x1="162" y1="68" x2="202" y2="68" stroke="#ffa657" stroke-width="2.5" marker-end="url(#pm-orn)" class="pm-flow"/>
  <rect x="202" y="40" width="148" height="56" rx="7" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="276" y="61"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">&#x2461; Download RPMs</text>
  <text x="276" y="77"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">from repos + mirrors</text>
  <text x="276" y="90"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">GPG + checksum</text>
  <line x1="350" y1="68" x2="390" y2="68" stroke="#ffa657" stroke-width="2.5" marker-end="url(#pm-orn)" class="pm-flow"/>
  <rect x="390" y="40" width="148" height="56" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="464" y="61"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">&#x2462; Test Transaction</text>
  <text x="464" y="77"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">dry-run in chroot</text>
  <text x="464" y="90"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">scriptlets executed</text>
  <line x1="538" y1="68" x2="578" y2="68" stroke="#ffa657" stroke-width="2.5" marker-end="url(#pm-orn)" class="pm-flow"/>
  <rect x="578" y="40" width="228" height="56" rx="7" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="692" y="61"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">&#x2463; Install + Log History</text>
  <text x="692" y="77"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">rpm db updated atomically</text>
  <text x="692" y="90"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">dnf history entry saved</text>
  <rect x="14"  y="112" width="792" height="76" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"  y="130" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">dnf history &#x2014; UNIQUE feature apt doesn't have:</text>
  <text x="26"  y="148" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">dnf history             </text><text x="148" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2192; list all transactions (ID, command, date, packages)</text>
  <text x="26"  y="164" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">dnf history undo 42     </text><text x="172" y="164" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2192; roll back transaction 42 (re-remove/re-install)</text>
  <text x="26"  y="180" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">dnf history rollback 40 </text><text x="196" y="180" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2192; restore system to state at transaction ID 40</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 12 — dnf / yum: install, search, info, groups, history, rollback, COPR</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DNF BASICS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo dnf install nginx          <span class="cb-cmt"># install</span>
<span class="cb-prompt">$</span> sudo dnf install -y nginx jq    <span class="cb-cmt"># non-interactive</span>
<span class="cb-prompt">$</span> sudo dnf remove nginx           <span class="cb-cmt"># remove</span>
<span class="cb-prompt">$</span> sudo dnf update                 <span class="cb-cmt"># update all installed packages</span>
<span class="cb-prompt">$</span> sudo dnf upgrade nginx          <span class="cb-cmt"># update specific package</span>
<span class="cb-prompt">$</span> sudo dnf check-update          <span class="cb-cmt"># show available updates (no install)</span>
<span class="cb-prompt">$</span> dnf search nginx                <span class="cb-cmt"># search repos</span>
<span class="cb-prompt">$</span> dnf info nginx                  <span class="cb-cmt"># package details</span>
<span class="cb-prompt">$</span> dnf list installed              <span class="cb-cmt"># list installed packages</span>
<span class="cb-prompt">$</span> dnf provides /usr/bin/jq        <span class="cb-cmt"># which package owns a file</span>
<span class="cb-prompt">$</span> dnf repolist                    <span class="cb-cmt"># list enabled repos</span>
<span class="cb-prompt">$</span> sudo dnf makecache              <span class="cb-cmt"># refresh metadata (like apt update)</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; PACKAGE GROUPS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> dnf group list                  <span class="cb-cmt"># list available groups</span>
<span class="cb-prompt">$</span> sudo dnf group install "Development Tools"
<span class="cb-prompt">$</span> dnf group info "Development Tools"

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; HISTORY AND ROLLBACK (unique to dnf) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> dnf history
<span class="cb-out">ID | Command         | Date              | Action(s) | Altered</span>
<span class="cb-out">42 | install nginx   | 2024-01-15 10:32  | Install   | 4</span>
<span class="cb-out">41 | update          | 2024-01-14 09:00  | Update    | 23</span>
<span class="cb-prompt">$</span> dnf history info 42             <span class="cb-cmt"># details of transaction 42</span>
<span class="cb-prompt">$</span> sudo dnf history undo 42        <span class="cb-cmt"># roll back transaction 42</span>
<span class="cb-prompt">$</span> sudo dnf history rollback 40    <span class="cb-cmt"># restore to state at ID 40</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; COPR (PPA equivalent for RHEL/Fedora) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo dnf install dnf-plugins-core
<span class="cb-prompt">$</span> sudo dnf copr enable user/repo
<span class="cb-prompt">$</span> sudo dnf install epel-release    <span class="cb-cmt"># EPEL: Extra Packages for Enterprise</span>
<span class="cb-prompt">$</span> sudo dnf install jq               <span class="cb-cmt"># jq not in base RHEL repos</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> rpm &#x2014; Low-Level RPM Operations</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 12 — rpm: query all, file owner, verify integrity, extract</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; rpm QUERIES (never need sudo) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> rpm -qa                            <span class="cb-cmt"># list ALL installed RPM packages</span>
<span class="cb-prompt">$</span> rpm -qa | grep -i nginx            <span class="cb-cmt"># filter</span>
<span class="cb-prompt">$</span> rpm -qi nginx                       <span class="cb-cmt"># package info (version, size, desc)</span>
<span class="cb-prompt">$</span> rpm -ql nginx                       <span class="cb-cmt"># list files installed by package</span>
<span class="cb-prompt">$</span> rpm -qf /usr/sbin/nginx             <span class="cb-cmt"># which package owns this file</span>
<span class="cb-out">nginx-1.24.3-1.el9.x86_64</span>
<span class="cb-prompt">$</span> rpm -qd nginx                       <span class="cb-cmt"># list only documentation files</span>
<span class="cb-prompt">$</span> rpm -qc nginx                       <span class="cb-cmt"># list only config files</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; QUERY AN UNINSTALLED .rpm FILE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> rpm -qp package.rpm                 <span class="cb-cmt"># query package file (not installed)</span>
<span class="cb-prompt">$</span> rpm -qp --provides package.rpm      <span class="cb-cmt"># what capabilities it provides</span>
<span class="cb-prompt">$</span> rpm -qp --requires package.rpm      <span class="cb-cmt"># what dependencies it needs</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; VERIFY FILE INTEGRITY &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> rpm -V nginx                        <span class="cb-cmt"># verify files against RPM database</span>
<span class="cb-out">S.5....T.  /etc/nginx/nginx.conf     # modified (expected for config)</span>
<span class="cb-cmt"># No output = all files unchanged (trusted state)
# Columns: S=size M=mode 5=md5 L=symlink U=user G=group T=mtime</span>
<span class="cb-prompt">$</span> rpm -Va                             <span class="cb-cmt"># verify ALL installed packages</span>
<span class="cb-prompt">$</span> rpm --rebuilddb                      <span class="cb-cmt"># rebuild DB if corrupted (hangs)</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INSTALL AND EXTRACT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo rpm -ivh package.rpm           <span class="cb-cmt"># install with verbose + progress</span>
<span class="cb-prompt">$</span> sudo rpm -e nginx                   <span class="cb-cmt"># remove (no dep handling!)</span>
<span class="cb-prompt">$</span> rpm2cpio package.rpm | cpio -idmv   <span class="cb-cmt"># extract files without installing</span>
<span class="cb-prompt">$</span> rpm2cpio package.rpm | cpio -t      <span class="cb-cmt"># list contents only</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> snap &#x2014; Universal Sandboxed Packages</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="pm-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="pm-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="pm-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="pm-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="pm-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="pm-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">snap Confinement Levels &#x2014; Security vs System Access</text>
  <rect x="14"  y="36" width="252" height="130" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="140" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">strict</text>
  <text x="24"  y="78"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Maximum isolation (AppArmor+seccomp)</text>
  <text x="24"  y="95"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Cannot access system files</text>
  <text x="24"  y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2705; Interfaces grant specific access</text>
  <text x="24"  y="129" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2705; Default for most snaps</text>
  <text x="24"  y="146" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">snap install firefox</text>
  <rect x="284" y="36" width="252" height="130" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="410" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#ffa657">classic</text>
  <text x="294" y="78"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">&#x26A0; No sandboxing at all</text>
  <text x="294" y="95"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Full system access (like .deb)</text>
  <text x="294" y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Requires explicit --classic flag</text>
  <text x="294" y="129" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">For dev tools needing full access</text>
  <text x="294" y="146" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">snap install code --classic</text>
  <rect x="554" y="36" width="252" height="130" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="680" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#f85149">devmode</text>
  <text x="564" y="78"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x274C; Development only</text>
  <text x="564" y="95"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2705; Logs violations, doesn't enforce</text>
  <text x="564" y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">For snap developers testing</text>
  <text x="564" y="129" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">Never on production systems</text>
  <text x="564" y="146" font-family="'Courier New',monospace" font-size="9" fill="#f85149">snap install app --devmode</text>
  <rect x="14"  y="178" width="792" height="26" rx="5" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26"  y="194" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">Interfaces (grant access in strict mode): </text>
  <text x="222" y="194" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">network   home   camera   audio   removable-media   x11   desktop</text>
  <text x="590" y="194" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">snap connect/disconnect</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 12 — snap: install, channels, refresh, revert, interfaces, services</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; snap BASICS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> snap find nginx                      <span class="cb-cmt"># search snap store</span>
<span class="cb-prompt">$</span> snap info firefox                     <span class="cb-cmt"># details + available channels</span>
<span class="cb-prompt">$</span> sudo snap install firefox            <span class="cb-cmt"># strict confinement (default)</span>
<span class="cb-prompt">$</span> sudo snap install code --classic     <span class="cb-cmt"># classic: full system access</span>
<span class="cb-prompt">$</span> snap list
<span class="cb-out">Name     Version  Rev  Tracking       Publisher  Notes</span>
<span class="cb-out">core20   20231030 2105 latest/stable  canonical  base</span>
<span class="cb-out">firefox  121.0.1  3779 latest/stable  mozilla    -</span>
<span class="cb-out">code     1.85.2   157  latest/stable  vscode     classic</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CHANNELS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Channel format: track/risk  (e.g. latest/stable, 22/stable)</span>
<span class="cb-prompt">$</span> sudo snap install nginx --channel=latest/stable
<span class="cb-prompt">$</span> sudo snap install nginx --channel=latest/edge    <span class="cb-cmt"># bleeding edge</span>
<span class="cb-prompt">$</span> sudo snap switch nginx --channel=latest/candidate  <span class="cb-cmt"># change channel</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; UPDATE AND ROLLBACK &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo snap refresh                    <span class="cb-cmt"># update all snaps</span>
<span class="cb-prompt">$</span> sudo snap refresh firefox            <span class="cb-cmt"># update one snap</span>
<span class="cb-prompt">$</span> sudo snap revert firefox             <span class="cb-cmt"># roll back to previous revision</span>
<span class="cb-cmt"># snap keeps previous revision on disk for instant rollback!</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INTERFACES (PERMISSIONS FOR STRICT SNAPS) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> snap connections firefox             <span class="cb-cmt"># show interface connections</span>
<span class="cb-prompt">$</span> sudo snap connect firefox:camera     <span class="cb-cmt"># grant camera access</span>
<span class="cb-prompt">$</span> sudo snap disconnect firefox:camera  <span class="cb-cmt"># revoke</span>
<span class="cb-prompt">$</span> snap changes                          <span class="cb-cmt"># recent snap operations log</span>
<span class="cb-prompt">$</span> sudo snap remove firefox             <span class="cb-cmt"># remove</span>
<span class="cb-prompt">$</span> sudo snap remove --purge firefox     <span class="cb-cmt"># remove + delete user data</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> pip, pipx &amp; venv &#x2014; Python Package Management</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 195" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="pm-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="pm-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="pm-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="pm-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="pm-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="pm-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="195" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">pip vs pipx vs venv &#x2014; Python Package Isolation Model</text>
  <rect x="14"  y="36" width="246" height="118" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="137" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">pip install (global)</text>
  <text x="24"  y="75"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x274C; Pollutes system Python</text>
  <text x="24"  y="91"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x274C; Version conflicts across projects</text>
  <text x="24"  y="107" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">&#x26A0; Blocked by PEP 668 on Ubuntu 23+</text>
  <text x="24"  y="123" font-family="'Courier New',monospace" font-size="9" fill="#f85149">sudo pip install X  # NEVER do this</text>
  <text x="137" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Breaks distro packages</text>
  <rect x="288" y="36" width="244" height="118" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="410" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">venv + pip (recommended)</text>
  <text x="298" y="75"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Isolated per-project environment</text>
  <text x="298" y="91"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; No cross-project conflicts</text>
  <text x="298" y="107" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; requirements.txt reproducible</text>
  <text x="298" y="123" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">python3 -m venv .venv</text>
  <text x="410" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Standard Python practice</text>
  <rect x="560" y="36" width="246" height="118" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="683" y="57"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">pipx (CLI tools)</text>
  <text x="570" y="75"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Each tool in its own venv</text>
  <text x="570" y="91"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Available globally as commands</text>
  <text x="570" y="107" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">For: csvkit, httpie, black, mypy</text>
  <text x="570" y="123" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">pipx install csvkit</text>
  <text x="683" y="145" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">CLI tool isolation</text>
  <rect x="14"  y="165" width="792" height="24" rx="4" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26"  y="181" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">PEP 668 (Ubuntu 23+ / Debian 12+): pip blocks system-wide install. Solutions: venv, pipx, apt python3-X, or --break-system-packages (last resort).</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 12 — pip, pipx, venv: Python package management best practices</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ALWAYS USE A VIRTUALENV &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> python3 -m venv .venv                <span class="cb-cmt"># create venv in .venv/</span>
<span class="cb-prompt">$</span> source .venv/bin/activate            <span class="cb-cmt"># activate (modifies $PATH)</span>
<span class="cb-out">(.venv) $</span>
<span class="cb-prompt">$</span> pip install pandas requests csvkit   <span class="cb-cmt"># installs into .venv/ only</span>
<span class="cb-prompt">$</span> pip freeze &gt; requirements.txt        <span class="cb-cmt"># lock all versions</span>
<span class="cb-prompt">$</span> pip install -r requirements.txt      <span class="cb-cmt"># reproduce exact environment</span>
<span class="cb-prompt">$</span> deactivate                           <span class="cb-cmt"># exit venv</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; pip OPERATIONS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> pip list                             <span class="cb-cmt"># all installed in current env</span>
<span class="cb-prompt">$</span> pip show pandas                      <span class="cb-cmt"># version, location, deps</span>
<span class="cb-prompt">$</span> pip install "pandas==2.1.0"          <span class="cb-cmt"># specific version</span>
<span class="cb-prompt">$</span> pip install "pandas&gt;=2.0,&lt;3.0"      <span class="cb-cmt"># version range</span>
<span class="cb-prompt">$</span> pip install --upgrade pandas         <span class="cb-cmt"># upgrade</span>
<span class="cb-prompt">$</span> pip uninstall pandas                 <span class="cb-cmt"># remove</span>
<span class="cb-prompt">$</span> pip check                            <span class="cb-cmt"># verify dep consistency</span>
<span class="cb-prompt">$</span> pip list --outdated                  <span class="cb-cmt"># what can be upgraded</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; pipx: CLI TOOLS WITH ISOLATION &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo apt install pipx                <span class="cb-cmt"># install pipx</span>
<span class="cb-prompt">$</span> pipx install csvkit                  <span class="cb-cmt"># csvcut, csvstat etc. available globally</span>
<span class="cb-prompt">$</span> pipx install httpie                  <span class="cb-cmt"># http command</span>
<span class="cb-prompt">$</span> pipx install black                   <span class="cb-cmt"># Python formatter</span>
<span class="cb-prompt">$</span> pipx list                            <span class="cb-cmt"># list installed CLI tools</span>
<span class="cb-prompt">$</span> pipx upgrade-all                     <span class="cb-cmt"># update all pipx tools</span>
<span class="cb-cmt"># Each tool: isolated venv in ~/.local/pipx/venvs/
# Entry point: ~/.local/bin/ (on $PATH)</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SYSTEM PYTHON PACKAGES (via apt) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo apt install python3-requests    <span class="cb-cmt"># use for: system scripts as root</span>
<span class="cb-prompt">$</span> sudo apt install python3-psycopg2    <span class="cb-cmt"># use for: compiled extensions</span>
<span class="cb-prompt">$</span> sudo apt install python3-yaml        <span class="cb-cmt"># use for: Ansible/system tools</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Automation &#x2014; Scripts, CI/CD, Docker, Ansible</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 12 — Automation: non-interactive apt, Docker, Ansible, CI scripts</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; NON-INTERACTIVE apt IN SCRIPTS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out">export DEBIAN_FRONTEND=noninteractive    # suppress all prompts</span>
<span class="cb-out">export APT_LISTCHANGES_FRONTEND=none     # suppress changelog display</span>
<span class="cb-out"></span>
<span class="cb-out">apt-get update -qq                      # quiet</span>
<span class="cb-out">apt-get install -y -q \                 # -y yes  -q quiet</span>
<span class="cb-out">    --no-install-recommends \            # minimal install</span>
<span class="cb-out">    nginx jq python3-pip curl \</span>
<span class="cb-out">    postgresql-client-14</span>

<span class="cb-cmt"># Idempotent: check before installing</span>
<span class="cb-out">install_if_missing() {</span>
<span class="cb-out">    dpkg -l "$1" 2&gt;/dev/null | grep -q "^ii" || apt-get install -y "$1"</span>
<span class="cb-out">}</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DOCKERFILE BEST PRACTICES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Combine update+install in ONE RUN layer (critical!)</span>
<span class="cb-out">RUN apt-get update &amp;&amp; apt-get install -y --no-install-recommends \</span>
<span class="cb-out">    curl jq python3 python3-pip \</span>
<span class="cb-out">    &amp;&amp; rm -rf /var/lib/apt/lists/*    # clean cache = smaller image</span>
<span class="cb-cmt"># NEVER split apt-get update and install into separate RUN layers!
# Docker caches each layer. A cached apt-get update layer will use
# an outdated package list in future builds.</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ANSIBLE apt MODULE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">- name: Install data engineering packages</span>
<span class="cb-out">  ansible.builtin.apt:</span>
<span class="cb-out">    name: [jq, python3-pip, postgresql-client-14, curl]</span>
<span class="cb-out">    state: present</span>
<span class="cb-out">    update_cache: yes</span>
<span class="cb-out">    install_recommends: no</span>
<span class="cb-out">  become: yes</span>
<span class="cb-out"></span>
<span class="cb-out">- name: Hold postgresql version</span>
<span class="cb-out">  ansible.builtin.dpkg_selections:</span>
<span class="cb-out">    name: postgresql-14</span>
<span class="cb-out">    selection: hold</span>
<span class="cb-out">  become: yes</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Flatpak, Arch &amp; apt Cache Cleanup</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 11 of 12 — Flatpak, pacman (Arch), AppImage, apt clean</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; FLATPAK &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo apt install flatpak
<span class="cb-prompt">$</span> flatpak remote-add --if-not-exists flathub     https://dl.flathub.org/repo/flathub.flatpakrepo
<span class="cb-prompt">$</span> flatpak install flathub org.gimp.GIMP
<span class="cb-prompt">$</span> flatpak run org.gimp.GIMP            <span class="cb-cmt"># run</span>
<span class="cb-prompt">$</span> flatpak list                          <span class="cb-cmt"># list installed</span>
<span class="cb-prompt">$</span> flatpak update                        <span class="cb-cmt"># update all</span>
<span class="cb-prompt">$</span> flatpak uninstall org.gimp.GIMP
<span class="cb-prompt">$</span> flatpak override --user --filesystem=home org.gimp.GIMP  <span class="cb-cmt"># grant home access</span>
<span class="cb-cmt"># snap: better for servers, headless CLI tools, daemons
# flatpak: better for GUI applications, desktop integration</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; PACMAN (Arch / Manjaro / Endeavour) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo pacman -Syu                      <span class="cb-cmt"># update all (sync + upgrade)</span>
<span class="cb-prompt">$</span> sudo pacman -S nginx                  <span class="cb-cmt"># install</span>
<span class="cb-prompt">$</span> sudo pacman -R nginx                  <span class="cb-cmt"># remove</span>
<span class="cb-prompt">$</span> sudo pacman -Rs nginx                 <span class="cb-cmt"># remove + orphan deps</span>
<span class="cb-prompt">$</span> pacman -Q                             <span class="cb-cmt"># list installed</span>
<span class="cb-prompt">$</span> pacman -Ql nginx                      <span class="cb-cmt"># files in package</span>
<span class="cb-prompt">$</span> pacman -Qo /usr/bin/jq                <span class="cb-cmt"># file owner</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CLEAN UP apt CACHE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> du -sh /var/cache/apt/archives/       <span class="cb-cmt"># check cache size</span>
<span class="cb-prompt">$</span> sudo apt clean                        <span class="cb-cmt"># remove all downloaded .debs</span>
<span class="cb-prompt">$</span> sudo apt autoclean                    <span class="cb-cmt"># remove only outdated .debs</span>
<span class="cb-prompt">$</span> dpkg -l | grep "^rc"                  <span class="cb-cmt"># find removed-but-config-left pkgs</span>
<span class="cb-prompt">$</span> dpkg -l | grep "^rc" | awk '{print $2}' | xargs sudo dpkg --purge
<span class="cb-cmt"># Purge packages in 'rc' (removed, config remaining) state</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Provisioning Script</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 12 of 12 — Complete data engineering server provisioning script</span></div>
<div class="console-body"><pre>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -Eeuo pipefail</span>
<span class="cb-out">export DEBIAN_FRONTEND=noninteractive</span>
<span class="cb-out">log() { echo "[$(date +%H:%M:%S)] $*"; }</span>
<span class="cb-out"></span>
<span class="cb-out">log "Step 1: Update package lists"</span>
<span class="cb-out">apt-get update -qq</span>
<span class="cb-out"></span>
<span class="cb-out">log "Step 2: Base tools"</span>
<span class="cb-out">apt-get install -y -q --no-install-recommends \</span>
<span class="cb-out">    curl wget git jq tmux vim \</span>
<span class="cb-out">    build-essential ca-certificates gnupg lsb-release</span>
<span class="cb-out"></span>
<span class="cb-out">log "Step 3: Python 3.12 (deadsnakes PPA)"</span>
<span class="cb-out">add-apt-repository -y ppa:deadsnakes/ppa</span>
<span class="cb-out">apt-get update -qq</span>
<span class="cb-out">apt-get install -y -q python3.12 python3.12-venv python3.12-dev</span>
<span class="cb-out"></span>
<span class="cb-out">log "Step 4: PostgreSQL 16 client (official repo)"</span>
<span class="cb-out">curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc \</span>
<span class="cb-out">    | gpg --dearmor -o /etc/apt/keyrings/postgresql.gpg</span>
<span class="cb-out">echo "deb [signed-by=/etc/apt/keyrings/postgresql.gpg] \</span>
<span class="cb-out">  https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" \</span>
<span class="cb-out">  | tee /etc/apt/sources.list.d/pgdg.list</span>
<span class="cb-out">apt-get update -qq &amp;&amp; apt-get install -y -q postgresql-client-16</span>
<span class="cb-out"></span>
<span class="cb-out">log "Step 5: Python venv for pipeline"</span>
<span class="cb-out">python3.12 -m venv /opt/pipeline/.venv</span>
<span class="cb-out">/opt/pipeline/.venv/bin/pip install -q \</span>
<span class="cb-out">    pandas requests psycopg2-binary csvkit redis</span>
<span class="cb-out"></span>
<span class="cb-out">log "Step 6: CLI tools via pipx"</span>
<span class="cb-out">pip install -q pipx</span>
<span class="cb-out">pipx install csvkit</span>
<span class="cb-out">pipx install httpie</span>
<span class="cb-out"></span>
<span class="cb-out">log "Step 7: Auto security updates"</span>
<span class="cb-out">apt-get install -y -q unattended-upgrades</span>
<span class="cb-out">dpkg-reconfigure -f noninteractive unattended-upgrades</span>
<span class="cb-out"></span>
<span class="cb-out">log "Step 8: Hold critical package versions"</span>
<span class="cb-out">apt-mark hold linux-image-generic linux-headers-generic</span>
<span class="cb-out"></span>
<span class="cb-out">log "Step 9: Clean up"</span>
<span class="cb-out">apt-get autoremove -y -q</span>
<span class="cb-out">apt-get clean</span>
<span class="cb-out">rm -rf /var/lib/apt/lists/*</span>
<span class="cb-out"></span>
<span class="cb-out">log "Verification:"</span>
<span class="cb-out">python3.12 --version; jq --version; psql --version; csvstat --version</span>
<span class="cb-out">log "Setup complete!"</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive &#x2014; dpkg DB, RPM DB, Dep Resolution, GPG Chain, snap SquashFS</h2>
<div class="deepdive-box">
<div class="deepdive-title">&#x2699;&#xFE0F; How Package Databases &amp; Verification Work Under the Hood</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. DPKG DATABASE &#x2014; /var/lib/dpkg/

   Directory-based (not SQL). No daemon needed. Flat text files.

   /var/lib/dpkg/status        &#x2014; all installed package metadata (one stanza each)
   /var/lib/dpkg/info/*.list   &#x2014; file paths installed by each package
   /var/lib/dpkg/info/*.md5sums&#x2014; checksums for integrity verification
   /var/lib/dpkg/info/*.postinst  &#x2014; maintainer lifecycle scripts

   dpkg -l reads from status. dpkg -L reads *.list. dpkg -S scans all *.list files.
   dpkg-query is faster than dpkg for scripted queries (-W -f format).

2. RPM DATABASE &#x2014; /var/lib/rpm/

   Uses Berkeley DB (old RHEL) or SQLite (modern RHEL 9+, Fedora 36+).
   /var/lib/rpm/Packages   &#x2014; main package database
   /var/lib/rpm/Name       &#x2014; name index
   /var/lib/rpm/Files      &#x2014; file-to-package reverse index (used by rpm -qf)

   If rpm commands hang: rpm --rebuilddb  (rebuilds from Packages file)

3. DEPENDENCY RESOLUTION &#x2014; SAT SOLVER vs GREEDY

   Modern apt (libsolv backend): SAT (Boolean Satisfiability) solver.
   - Models deps as boolean constraints: "if nginx installed, libssl3 must be installed"
   - Finds globally optimal solution that satisfies all constraints
   - If unsatisfiable: reports exact conflict (not just "broken deps")

   dnf: also uses libsolv since RHEL 8 / Fedora 23.
   - dnf history: atomic transactions with full rollback capability
   - Each transaction is journalled: all packages commit or nothing

   Old yum (RHEL 7 and earlier): greedy algorithm.
   - Could fail on complex dependency graphs
   - No built-in rollback at the transaction level

4. APT GPG VERIFICATION CHAIN

   1. Download InRelease file (signed by repo key)
   2. Verify InRelease GPG signature against /etc/apt/keyrings/*.gpg
   3. InRelease contains SHA256 hash of Packages.gz
   4. Download and verify Packages.gz hash matches
   5. Packages.gz contains SHA256 of each .deb file
   6. Download .deb, verify its hash matches
   7. ONLY then: dpkg installs the package

   Any failure in the chain: "W: GPG error: ... NO_PUBKEY"
   Fix: ensure correct key is in /etc/apt/keyrings/ and signed-by= matches.

5. SNAP SQUASHFS ARCHITECTURE

   Each snap is a SquashFS (compressed, read-only filesystem image):
   - Mounted read-only at /snap/name/revision/ via loopback device
   - Writable data: /var/snap/name/revision/ and ~/snap/name/revision/
   - AppArmor profile: /var/lib/snapd/apparmor/profiles/snap.name.app
   - seccomp filter: syscall whitelist per snap

   snap refresh keeps previous revision on disk:
   /snap/firefox/3779/  (current)  /snap/firefox/3742/  (previous)
   /snap/firefox/current -> /snap/firefox/3779  (symlink)

   snap revert: just changes the symlink (instant, no download needed).

   Systemd mounts are auto-created:
   snap-firefox-3779.mount -> mounts /snap/firefox/3779 via loop device
</pre>
</div>
</div><div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference &#x2014; All Package Management Commands</h2>
<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:26%">Command</th><th>Purpose</th><th style="width:24%">Key Options</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Debian / Ubuntu (apt + dpkg)</td></tr>
<tr><td style="font-family:monospace;">sudo apt update</td><td>Refresh package index (always first!)</td><td>Never skips install, just updates metadata</td></tr>
<tr><td style="font-family:monospace;">sudo apt install pkg</td><td>Install with full dep resolution</td><td><code>-y</code> auto, <code>=ver</code> pin, <code>--no-install-recommends</code></td></tr>
<tr><td style="font-family:monospace;">sudo apt purge pkg</td><td>Remove binary + all config files</td><td><code>remove</code> keeps config; <code>autoremove</code> orphans</td></tr>
<tr><td style="font-family:monospace;">sudo apt upgrade</td><td>Upgrade installed (won't remove)</td><td>Always simulate first with <code>-s</code></td></tr>
<tr><td style="font-family:monospace;">apt-cache policy pkg</td><td>Installed vs candidate version</td><td><code>rdepends</code> reverse deps; <code>showdep</code> tree</td></tr>
<tr><td style="font-family:monospace;">dpkg -l / -L / -S</td><td>List pkgs / files in pkg / file owner</td><td><code>-I file.deb</code> inspect; <code>-i</code> install; <code>-x</code> extract</td></tr>
<tr><td style="font-family:monospace;">sudo apt-mark hold pkg</td><td>Prevent package from upgrading</td><td><code>unhold</code> release; <code>showhold</code> list held</td></tr>
<tr><td colspan="3" style="background:#1a2a14;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">RHEL / CentOS / Fedora (dnf + rpm)</td></tr>
<tr><td style="font-family:monospace;">sudo dnf install pkg</td><td>Install with SAT dep resolution</td><td><code>-y</code> auto, <code>group install</code> for groups</td></tr>
<tr><td style="font-family:monospace;">sudo dnf update</td><td>Update all installed packages</td><td><code>check-update</code> preview; <code>upgrade pkg</code> one</td></tr>
<tr><td style="font-family:monospace;">dnf history undo N</td><td>Roll back a transaction by ID</td><td>Unique to dnf. <code>history rollback N</code> to state</td></tr>
<tr><td style="font-family:monospace;">rpm -qa / -ql / -qf</td><td>List all / files / file owner</td><td><code>-qi</code> info; <code>-V</code> verify integrity vs db</td></tr>
<tr><td colspan="3" style="background:#1f1428;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Universal / Python</td></tr>
<tr><td style="font-family:monospace;">sudo snap install pkg</td><td>Install sandboxed snap package</td><td><code>--classic</code> no sandbox; <code>--channel=X</code> track</td></tr>
<tr><td style="font-family:monospace;">sudo snap revert pkg</td><td>Instant rollback to previous rev</td><td>Previous squashfs kept on disk always</td></tr>
<tr><td style="font-family:monospace;">flatpak install hub app</td><td>Sandboxed GUI/desktop app</td><td><code>override --filesystem=home</code> for access</td></tr>
<tr><td style="font-family:monospace;">python3 -m venv .venv</td><td>Create isolated Python environment</td><td>Always activate before pip install</td></tr>
<tr><td style="font-family:monospace;">pipx install tool</td><td>CLI tool in isolated venv, global cmd</td><td><code>upgrade-all</code>; <code>list</code>; <code>uninstall</code></td></tr>
</tbody>
</table>
</div>
</div><div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 &#x2014; System Exploration</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Identify your Linux distro, version, and which package manager is installed</li>
      <li>Count the total number of installed packages</li>
      <li>Find which package owns <code>/usr/bin/curl</code></li>
      <li>List all files installed by the <code>curl</code> package</li>
      <li>Search for packages related to "json" &#x2014; install <code>jq</code></li>
      <li>Use <code>apt show jq</code> to find what jq depends on</li>
      <li>Check the installed vs candidate version of <code>jq</code> using apt-cache policy</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 &#x2014; Python Package Management</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create a Python venv at <code>/opt/my-project/.venv</code></li>
      <li>Activate it and install: <code>requests pandas csvkit</code></li>
      <li>Freeze the requirements to <code>requirements.txt</code></li>
      <li>Deactivate, create a second venv, reproduce from requirements.txt</li>
      <li>Install <code>httpie</code> globally using <code>pipx</code></li>
      <li>Verify the <code>http</code> command is available globally</li>
      <li>Run <code>pipx list</code> and locate the isolated venv for httpie</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 &#x2014; Repository &amp; Security Management</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Add the official nginx repository using the modern <code>signed-by=</code> GPG approach</li>
      <li>Install nginx from the official repo &#x2014; verify the version is newer than Ubuntu's</li>
      <li>Hold the nginx version to prevent accidental upgrades: <code>apt-mark hold</code></li>
      <li>Install <code>unattended-upgrades</code> and configure it for security-only updates</li>
      <li>Run a dry-run of unattended-upgrade and interpret the output</li>
      <li>Set up APT pinning to prefer a specific nginx version over others</li>
      <li>Remove the nginx repo and restore to Ubuntu's version without losing config</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 &#x2014; snap &amp; Package Investigation</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Install VS Code via snap with the correct confinement level</li>
      <li>Inspect all interfaces VS Code connects to: <code>snap connections code</code></li>
      <li>Find the squashfs mount point and revision directories for a snap you installed</li>
      <li>Find any packages in <code>rc</code> state (removed but config files remain) and purge them</li>
      <li>Find packages installed recently (hint: grep dpkg.log or use zgrep on old logs)</li>
      <li>Write a script that verifies all installed apt packages have no changed files: <code>dpkg -V</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 &#x2014; Complete Server Provisioning Script</h4>
    <p>Write a complete, idempotent <code>provision.sh</code> for a data engineering server:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Detection:</strong> Auto-detect distro (Ubuntu/RHEL/Fedora) and use the correct package manager for each step</li>
      <li><strong>Repositories:</strong> Add PostgreSQL official repo with GPG key; deadsnakes PPA on Ubuntu</li>
      <li><strong>System packages:</strong> jq, curl, git, tmux, postgresql-client-16, python3.12, python3.12-venv</li>
      <li><strong>Python environment:</strong> Create <code>/opt/data-eng/.venv</code>, install from requirements.txt</li>
      <li><strong>CLI tools:</strong> csvkit, httpie via pipx</li>
      <li><strong>Security:</strong> Enable unattended security upgrades; hold kernel and postgresql version</li>
      <li><strong>Idempotency:</strong> Script safe to run multiple times; each step checks before acting</li>
      <li><strong>Verification:</strong> Final block prints version of every installed tool; exit non-zero if any missing</li>
    </ol>
    <p><strong>Must handle: no sudo available, Ubuntu 20.04/22.04/24.04 differences, RHEL without EPEL, already-installed packages, network failures with retry.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">Ravi's Provisioning Script &#x2014; Day 560</div>
    <p>The provisioning script ran in eleven minutes. It installed everything, added GPG-verified repos, created the isolated Python environment, enabled automatic security patches, held the kernel version, and printed a green verification table at the end.</p>
    <p>Two months later, the security scanner reported that the server was missing three critical OpenSSL patches. Ravi checked: <code>unattended-upgrades</code> had applied them automatically overnight, two days after the CVEs were published. The server had never been manually touched. It had healed itself.</p>
    <p>He showed the junior engineer the provisioning script. "The script doesn't just install software," he said. "It encodes your operational decisions &#x2014; which repos to trust, which versions to lock, which updates to allow automatically. A provisioning script is a specification of your system's intended state."</p>
    <p><strong>Package management is not about installing software. It is about expressing, codifying, and enforcing the intended state of your system.</strong></p>
  </div>
</div>
</div>
`
};