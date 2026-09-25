var filesystemHierarchy = {

    title: "Filesystem Hierarchy",
    description: "Master the Linux directory structure — every major directory, what lives there, why it exists, and how data engineers navigate it confidently",
    breadcrumb: "Getting Started > Filesystem Hierarchy",

    sections: [

        // ══════════════════════════════════════════════════════
        // SECTION 1 — The Root of Everything
        // ══════════════════════════════════════════════════════
        {
            id: "root_of_everything",
            content: `
<h3>🌳 Everything Starts at /</h3>

<div class="story-box">
    <h4>🏙️ The City Analogy</h4>
    <p>Imagine Linux as a city. The <strong>/</strong> (root) is city hall — the one point every address references. Every file, every device, every network socket, every running process is addressable as a path starting from <code>/</code>. Unlike Windows which has <code>C:\\</code>, <code>D:\\</code>, and separate drive letters, Linux has <em>one</em> unified tree. External drives, USB sticks, network shares — they all get <strong>mounted</strong> as subdirectories inside this single tree. There is no escaping the root.</p>
    <p>This design is not accidental. It comes from Unix's philosophy: <strong>everything is a file</strong>. Your hard disk at <code>/dev/sda</code>. Your running processes at <code>/proc/1234</code>. Your network sockets at <code>/dev/net/tun</code>. Hardware settings at <code>/sys/class/net/eth0</code>. One tree, one addressing scheme, complete consistency.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">root_overview.sh</span>
    </div>
    <div class="terminal-body"><span class="prompt">$</span> ls /
<span class="output">bin   boot  dev  etc  home  lib  lib64  media  mnt  opt
proc  root  run  sbin  srv  sys  tmp  usr  var</span>

<span class="prompt">$</span> ls / | wc -l
<span class="output">20</span>          <span class="comment"># ~20 top-level directories on a typical Ubuntu install</span>

<span class="prompt">$</span> du -sh /* 2>/dev/null | sort -rh | head -6
<span class="output">7.5G    /usr      ← system programs and libraries</span>
<span class="output">4.2G    /var      ← variable data (logs, cache, databases)</span>
<span class="output">512M    /boot     ← kernel and bootloader</span>
<span class="output">220M    /lib      ← shared libraries</span>
<span class="output">64M     /etc      ← configuration files</span>
<span class="output">12M     /bin      ← essential user commands</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">The Linux Filesystem Tree — Every Major Directory</text>

        <!-- Root node -->
        <circle cx="360" cy="52" r="22" fill="#1a0a30" stroke="#a78bfa" stroke-width="3"/>
        <text x="360" y="57" text-anchor="middle" fill="#a78bfa" font-size="16" font-weight="bold" font-family="JetBrains Mono">/</text>

        <!-- Level 1 directories -->
        <!-- /bin -->
        <line x1="360" y1="74" x2="60"  y2="110" stroke="#334155" stroke-width="1.5"/>
        <rect x="18"  y="110" width="84" height="34" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="60"  y="131" text-anchor="middle" fill="#22d3ee" font-size="12" font-family="JetBrains Mono">/bin</text>

        <!-- /boot -->
        <line x1="360" y1="74" x2="155" y2="110" stroke="#334155" stroke-width="1.5"/>
        <rect x="113" y="110" width="84" height="34" rx="6" fill="#0a1520" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="155" y="131" text-anchor="middle" fill="#fbbf24" font-size="12" font-family="JetBrains Mono">/boot</text>

        <!-- /dev -->
        <line x1="360" y1="74" x2="245" y2="110" stroke="#334155" stroke-width="1.5"/>
        <rect x="203" y="110" width="84" height="34" rx="6" fill="#0a1520" stroke="#f87171" stroke-width="1.5"/>
        <text x="245" y="131" text-anchor="middle" fill="#f87171" font-size="12" font-family="JetBrains Mono">/dev</text>

        <!-- /etc -->
        <line x1="360" y1="74" x2="335" y2="110" stroke="#334155" stroke-width="1.5"/>
        <rect x="293" y="110" width="84" height="34" rx="6" fill="#0a1520" stroke="#fb923c" stroke-width="1.5"/>
        <text x="335" y="131" text-anchor="middle" fill="#fb923c" font-size="12" font-family="JetBrains Mono">/etc</text>

        <!-- /home -->
        <line x1="360" y1="74" x2="425" y2="110" stroke="#334155" stroke-width="1.5"/>
        <rect x="383" y="110" width="84" height="34" rx="6" fill="#0a1520" stroke="#34d399" stroke-width="2"/>
        <text x="425" y="131" text-anchor="middle" fill="#34d399" font-size="12" font-family="JetBrains Mono">/home</text>

        <!-- /proc -->
        <line x1="360" y1="74" x2="515" y2="110" stroke="#334155" stroke-width="1.5"/>
        <rect x="473" y="110" width="84" height="34" rx="6" fill="#1a0520" stroke="#e879f9" stroke-width="1.5"/>
        <text x="515" y="131" text-anchor="middle" fill="#e879f9" font-size="12" font-family="JetBrains Mono">/proc</text>

        <!-- /var -->
        <line x1="360" y1="74" x2="610" y2="110" stroke="#334155" stroke-width="1.5"/>
        <rect x="568" y="110" width="84" height="34" rx="6" fill="#0a1520" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="610" y="131" text-anchor="middle" fill="#fbbf24" font-size="12" font-family="JetBrains Mono">/var</text>

        <!-- MORE directories row 2 -->
        <!-- /usr line -->
        <line x1="360" y1="74" x2="360" y2="165" stroke="#334155" stroke-width="1.5"/>
        <rect x="318" y="165" width="84" height="34" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="360" y="186" text-anchor="middle" fill="#22d3ee" font-size="12" font-family="JetBrains Mono">/usr</text>

        <!-- Row 3: subdirectories of /usr -->
        <line x1="360" y1="199" x2="270" y2="230" stroke="#334155" stroke-width="1"/>
        <rect x="228" y="230" width="84" height="28" rx="5" fill="#0a1520" stroke="#22d3ee" stroke-width="1" opacity="0.7"/>
        <text x="270" y="248" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">/usr/bin</text>

        <line x1="360" y1="199" x2="360" y2="230" stroke="#334155" stroke-width="1"/>
        <rect x="318" y="230" width="84" height="28" rx="5" fill="#0a1520" stroke="#22d3ee" stroke-width="1" opacity="0.7"/>
        <text x="360" y="248" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">/usr/lib</text>

        <line x1="360" y1="199" x2="450" y2="230" stroke="#334155" stroke-width="1"/>
        <rect x="408" y="230" width="84" height="28" rx="5" fill="#0a1520" stroke="#22d3ee" stroke-width="1" opacity="0.7"/>
        <text x="450" y="248" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">/usr/local</text>

        <!-- /home subdirs -->
        <line x1="425" y1="144" x2="380" y2="175" stroke="#334155" stroke-width="1"/>
        <rect x="335" y="175" width="90" height="28" rx="5" fill="#0a1520" stroke="#34d399" stroke-width="1" opacity="0.7"/>
        <text x="380" y="193" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">/home/anuj</text>

        <line x1="425" y1="144" x2="470" y2="175" stroke="#334155" stroke-width="1"/>
        <rect x="425" y="175" width="90" height="28" rx="5" fill="#0a1520" stroke="#34d399" stroke-width="1" opacity="0.7"/>
        <text x="470" y="193" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">/home/ubuntu</text>

        <!-- /var subdirs -->
        <line x1="610" y1="144" x2="565" y2="175" stroke="#334155" stroke-width="1"/>
        <rect x="520" y="175" width="90" height="28" rx="5" fill="#0a1520" stroke="#fbbf24" stroke-width="1" opacity="0.7"/>
        <text x="565" y="193" text-anchor="middle" fill="#fbbf24" font-size="10" font-family="JetBrains Mono">/var/log</text>

        <line x1="610" y1="144" x2="655" y2="175" stroke="#334155" stroke-width="1"/>
        <rect x="610" y="175" width="90" height="28" rx="5" fill="#0a1520" stroke="#fbbf24" stroke-width="1" opacity="0.7"/>
        <text x="655" y="193" text-anchor="middle" fill="#fbbf24" font-size="10" font-family="JetBrains Mono">/var/lib</text>

        <!-- Other dirs row -->
        <rect x="10"  y="270" width="100" height="28" rx="5" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="60"  y="288" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">/tmp</text>
        <rect x="120" y="270" width="100" height="28" rx="5" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="170" y="288" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">/opt</text>
        <rect x="230" y="270" width="100" height="28" rx="5" fill="#1a0520" stroke="#e879f9" stroke-width="1"/>
        <text x="280" y="288" text-anchor="middle" fill="#e879f9" font-size="10" font-family="JetBrains Mono">/sys</text>
        <rect x="340" y="270" width="100" height="28" rx="5" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="390" y="288" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">/mnt</text>
        <rect x="450" y="270" width="100" height="28" rx="5" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="500" y="288" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">/media</text>
        <rect x="560" y="270" width="100" height="28" rx="5" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="610" y="288" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">/sbin</text>

        <!-- Legend -->
        <rect x="10" y="316" width="700" height="96" rx="8" fill="#0a1520" stroke="#334155" stroke-width="1"/>
        <text x="30" y="336" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="Space Grotesk">Key</text>
        <rect x="30" y="344" width="12" height="12" rx="3" fill="#22d3ee" opacity="0.6"/>
        <text x="48" y="354" fill="#94a3b8" font-size="9">Programs &amp; Libraries</text>
        <rect x="160" y="344" width="12" height="12" rx="3" fill="#34d399" opacity="0.6"/>
        <text x="178" y="354" fill="#94a3b8" font-size="9">User Data</text>
        <rect x="280" y="344" width="12" height="12" rx="3" fill="#fbbf24" opacity="0.6"/>
        <text x="298" y="354" fill="#94a3b8" font-size="9">Variable/Config Data</text>
        <rect x="420" y="344" width="12" height="12" rx="3" fill="#e879f9" opacity="0.6"/>
        <text x="438" y="354" fill="#94a3b8" font-size="9">Virtual Filesystems (no disk storage)</text>
        <rect x="30" y="364" width="12" height="12" rx="3" fill="#f87171" opacity="0.6"/>
        <text x="48" y="374" fill="#94a3b8" font-size="9">Device Files</text>

        <text x="30"  y="400" fill="#64748b" font-size="9">/proc and /sys are VIRTUAL — generated by the kernel on demand. No bytes are stored on disk.</text>
        <text x="30"  y="412" fill="#64748b" font-size="9">Everything under / is one unified tree. External disks mount as subdirectories.</text>
    </svg>
    <div class="caption">The Linux filesystem tree. Everything descends from /. Virtual filesystems (/proc, /sys) are generated by the kernel at runtime — they consume no disk space.</div>
</div>

<div class="info-box">
    <h4>💡 The Filesystem Hierarchy Standard (FHS)</h4>
    <p>The FHS is a specification that defines <em>what should go where</em> in Linux. It was created to stop the chaos of every Unix variant putting things in different places. The FHS separates files by two axes: <strong>shareable vs non-shareable</strong> (can this be shared across machines on a network?) and <strong>static vs variable</strong> (does this change at runtime?). Understanding these axes explains why <code>/etc</code> (config, static, non-shareable) is separate from <code>/var</code> (logs and caches, variable) and <code>/usr</code> (programs, static, shareable over NFS).</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 2 — /bin, /sbin, /usr — Programs
        // ══════════════════════════════════════════════════════
        {
            id: "programs_directories",
            content: `
<h3>⚙️ /bin, /sbin, /usr — Where Programs Live</h3>

<div class="story-box">
    <h4>📦 The Toolbox Hierarchy</h4>
    <p>Linux's program directories have a historical layering: <code>/bin</code> holds the tools everyone needs <em>always</em> — even during emergency recovery with no <code>/usr</code> mounted. <code>/usr/bin</code> holds everything else. Today on modern Ubuntu, <code>/bin</code> is actually a symlink to <code>/usr/bin</code> — the distinction has been collapsed. But understanding <em>why</em> they were separate makes the whole hierarchy make sense.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">program_directories.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ /bin — Essential user commands ════</span>
<span class="prompt">$</span> ls /bin | head -20
<span class="output">bash  cat  chmod  chown  cp  date  df  echo  grep</span>
<span class="output">gzip  ln  ls  mkdir  mv  ps  pwd  rm  rmdir  sh  tar</span>

<span class="prompt">$</span> ls -la /bin           <span class="comment"># On Ubuntu 22.04:</span>
<span class="output">lrwxrwxrwx 1 root root 7 /bin -> usr/bin</span>
<span class="comment"># /bin is now a symlink to /usr/bin — they are the same!</span>

<span class="comment"># ════ /sbin — System admin commands (need root) ════</span>
<span class="prompt">$</span> ls /sbin | head -15
<span class="output">fdisk  fsck  ifconfig  init  ip  iptables  lvm</span>
<span class="output">mkfs  mount  reboot  shutdown  swapon  sysctl</span>

<span class="prompt">$</span> ls -la /sbin           <span class="comment"># Also a symlink now:</span>
<span class="output">lrwxrwxrwx 1 root root 8 /sbin -> usr/sbin</span>

<span class="comment"># ════ /usr/bin — The main program directory ════</span>
<span class="prompt">$</span> ls /usr/bin | wc -l
<span class="output">1247</span>       <span class="comment"># over 1000 programs!</span>

<span class="prompt">$</span> ls /usr/bin | grep -E "^python|^pip|^java|^node"
<span class="output">python3   python3.10   pip3   java   node</span>

<span class="comment"># ════ /usr/local — YOUR installed software ════</span>
<span class="prompt">$</span> ls /usr/local/bin
<span class="output">spark-submit   airflow   kubectl   helm</span>
<span class="comment"># Tools YOU installed (not from apt) go here</span>

<span class="prompt">$</span> which python3        <span class="comment"># Find where a command lives</span>
<span class="output">/usr/bin/python3</span>

<span class="prompt">$</span> which airflow
<span class="output">/usr/local/bin/airflow</span>

<span class="prompt">$</span> which spark-submit
<span class="output">/usr/local/bin/spark-submit</span>

<span class="comment"># ════ /usr/lib — Shared Libraries ════</span>
<span class="prompt">$</span> ls /usr/lib/python3/
<span class="output">dist-packages/   python3.10/</span>

<span class="prompt">$</span> ls /usr/lib/jvm/
<span class="output">java-11-openjdk-amd64/    java-17-openjdk-amd64/</span>

<span class="comment"># ════ Checking what package owns a file ════</span>
<span class="prompt">$</span> dpkg -S /usr/bin/python3
<span class="output">python3-minimal: /usr/bin/python3</span>

<span class="prompt">$</span> dpkg -L python3-minimal | head -8   <span class="comment"># All files in that package</span>
<span class="output">/usr/bin/python3
/usr/share/man/man1/python3.1.gz</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="18" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Program Directory Hierarchy — Where to Find (and Install) Software</text>

        <rect x="10"  y="30" width="155" height="196" rx="8" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="87"  y="52" text-anchor="middle" fill="#22d3ee" font-size="12" font-weight="bold">/bin → /usr/bin</text>
        <text x="87"  y="70" text-anchor="middle" fill="#64748b" font-size="8">Commands everyone uses</text>
        <text x="25"  y="90"  fill="#94a3b8" font-size="9">ls, cp, mv, rm</text>
        <text x="25"  y="106" fill="#94a3b8" font-size="9">grep, cat, echo</text>
        <text x="25"  y="122" fill="#94a3b8" font-size="9">python3, pip3</text>
        <text x="25"  y="138" fill="#94a3b8" font-size="9">java, node, git</text>
        <text x="25"  y="158" fill="#64748b" font-size="8">Installed by: apt/dpkg</text>
        <text x="25"  y="172" fill="#64748b" font-size="8">Owner: root</text>
        <text x="25"  y="186" fill="#64748b" font-size="8">Writable: NO</text>
        <text x="25"  y="200" fill="#64748b" font-size="8">1000+ programs</text>
        <text x="25"  y="218" fill="#64748b" font-size="8">on typical Ubuntu</text>

        <rect x="175" y="30" width="155" height="196" rx="8" fill="#0a1520" stroke="#f87171" stroke-width="2"/>
        <text x="252" y="52" text-anchor="middle" fill="#f87171" font-size="12" font-weight="bold">/sbin → /usr/sbin</text>
        <text x="252" y="70" text-anchor="middle" fill="#64748b" font-size="8">Admin/system commands</text>
        <text x="190" y="90"  fill="#94a3b8" font-size="9">fdisk, mkfs, fsck</text>
        <text x="190" y="106" fill="#94a3b8" font-size="9">ip, iptables</text>
        <text x="190" y="122" fill="#94a3b8" font-size="9">sysctl, modprobe</text>
        <text x="190" y="138" fill="#94a3b8" font-size="9">useradd, passwd</text>
        <text x="190" y="158" fill="#64748b" font-size="8">Run as: root only</text>
        <text x="190" y="172" fill="#64748b" font-size="8">Normal users can see</text>
        <text x="190" y="186" fill="#64748b" font-size="8">but cannot execute</text>
        <text x="190" y="200" fill="#64748b" font-size="8">most of these</text>

        <rect x="340" y="30" width="175" height="196" rx="8" fill="#0a1520" stroke="#34d399" stroke-width="3"/>
        <text x="427" y="52" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">/usr/local/bin</text>
        <text x="427" y="70" text-anchor="middle" fill="#64748b" font-size="8">YOUR manually installed tools</text>
        <text x="355" y="90"  fill="#94a3b8" font-size="9">spark-submit</text>
        <text x="355" y="106" fill="#94a3b8" font-size="9">airflow, dbt, great-expectations</text>
        <text x="355" y="122" fill="#94a3b8" font-size="9">kubectl, helm, terraform</text>
        <text x="355" y="138" fill="#94a3b8" font-size="9">custom scripts</text>
        <text x="355" y="158" fill="#34d399" font-size="8" font-weight="bold">★ Install YOUR tools here</text>
        <text x="355" y="172" fill="#64748b" font-size="8">Not managed by apt</text>
        <text x="355" y="186" fill="#64748b" font-size="8">Safe from OS upgrades</text>
        <text x="355" y="200" fill="#64748b" font-size="8">Takes priority over</text>
        <text x="355" y="214" fill="#64748b" font-size="8">/usr/bin in PATH</text>

        <rect x="525" y="30" width="185" height="196" rx="8" fill="#0a1520" stroke="#a78bfa" stroke-width="2"/>
        <text x="617" y="52" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold">~/.local/bin</text>
        <text x="617" y="70" text-anchor="middle" fill="#64748b" font-size="8">Per-user installed tools</text>
        <text x="540" y="90"  fill="#94a3b8" font-size="9">pip install --user ...</text>
        <text x="540" y="106" fill="#94a3b8" font-size="9">pipx-installed tools</text>
        <text x="540" y="122" fill="#94a3b8" font-size="9">personal scripts</text>
        <text x="540" y="138" fill="#94a3b8" font-size="9">nvm, pyenv shims</text>
        <text x="540" y="158" fill="#a78bfa" font-size="8" font-weight="bold">★ No sudo needed</text>
        <text x="540" y="172" fill="#64748b" font-size="8">Only for your user</text>
        <text x="540" y="186" fill="#64748b" font-size="8">Add to PATH in ~/.bashrc:</text>
        <text x="540" y="200" fill="#64748b" font-size="8">export PATH=</text>
        <text x="540" y="214" fill="#64748b" font-size="8">"~/.local/bin:\$PATH"</text>
    </svg>
    <div class="caption">When you install a tool, location matters. apt installs go to /usr/bin (system-wide, OS-managed). Manual installs should go to /usr/local/bin. pip --user installs go to ~/.local/bin. The PATH variable determines which is found first.</div>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 3 — /etc — Configuration
        // ══════════════════════════════════════════════════════
        {
            id: "etc_config",
            content: `
<h3>🔧 /etc — The Configuration Directory</h3>

<div class="story-box">
    <h4>📋 The Policy Manual</h4>
    <p><code>/etc</code> is the server's policy manual — it contains no programs and no user data, only <strong>configuration files</strong> that tell every service how to behave. Want to change how SSH authenticates? Edit <code>/etc/ssh/sshd_config</code>. Want to add a custom hostname resolution? Edit <code>/etc/hosts</code>. Everything in <code>/etc</code> is a text file — no binary config registries, no hidden settings. This is the Unix philosophy of transparency: if you want to know how the system is configured, just <code>cat</code> the file.</p>
    <p><code>/etc</code> stands for <em>Editable Text Configuration</em> (colloquially) — and you should back it up before editing anything. It is the most impactful directory on the server: a wrong character in <code>/etc/fstab</code> can prevent boot; a mistake in <code>/etc/sudoers</code> can lock out all admin access.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">etc_exploration.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ Most important files in /etc ════</span>
<span class="prompt">$</span> ls /etc | grep -E "passwd|shadow|group|hostname|hosts|fstab|resolv|ssh|cron|sudoers|apt|systemd"
<span class="output">apt/       cron.d/    fstab      hosts      hostname</span>
<span class="output">passwd     shadow     group      resolv.conf   ssh/</span>
<span class="output">sudoers    systemd/</span>

<span class="comment"># ════ /etc/hostname — Machine name ════</span>
<span class="prompt">$</span> cat /etc/hostname
<span class="output">prod-spark-01</span>

<span class="comment"># ════ /etc/hosts — Local DNS overrides ════</span>
<span class="prompt">$</span> cat /etc/hosts
<span class="output">127.0.0.1    localhost</span>
<span class="output">127.0.1.1    prod-spark-01</span>
<span class="output">10.0.0.5     kafka-broker-01</span>  <span class="comment"># custom entries</span>
<span class="output">10.0.0.6     postgres-primary</span>
<span class="output">10.0.0.7     redis-cache</span>
<span class="comment"># /etc/hosts is checked BEFORE DNS — use for cluster hostnames</span>

<span class="comment"># ════ /etc/passwd — User accounts ════</span>
<span class="prompt">$</span> cat /etc/passwd | head -3
<span class="output">root:x:0:0:root:/root:/bin/bash</span>
<span class="output">daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin</span>
<span class="output">anuj:x:1000:1000:Anuj Kumar:/home/anuj:/bin/bash</span>
<span class="comment"># username:password_placeholder:uid:gid:full_name:home_dir:shell</span>
<span class="comment"># "x" means actual password hash is in /etc/shadow (root-readable only)</span>

<span class="prompt">$</span> grep "^anuj" /etc/passwd | cut -d: -f6,7
<span class="output">/home/anuj:/bin/bash</span>   <span class="comment"># home directory : login shell</span>

<span class="comment"># ════ /etc/group — Group memberships ════</span>
<span class="prompt">$</span> grep "^sudo\|^docker\|^anuj" /etc/group
<span class="output">sudo:x:27:anuj,ubuntu</span>
<span class="output">docker:x:998:anuj</span>
<span class="comment"># anuj is in sudo and docker groups</span>

<span class="comment"># ════ /etc/fstab — Filesystem mount table ════</span>
<span class="prompt">$</span> cat /etc/fstab
<span class="output">UUID=a1b2c3d4  /       ext4  defaults        0 1</span>
<span class="output">UUID=f6e5d4c3  none    swap  sw              0 0</span>
<span class="output">UUID=9876fedc  /data   xfs   defaults,noatime 0 2</span>
<span class="comment"># device  mountpoint  fstype  options  dump  fsck-order</span>
<span class="comment"># This file determines what gets mounted on boot — edit with extreme care!</span>

<span class="comment"># ════ /etc/resolv.conf — DNS configuration ════</span>
<span class="prompt">$</span> cat /etc/resolv.conf
<span class="output">nameserver 8.8.8.8</span>
<span class="output">nameserver 8.8.4.4</span>
<span class="output">search company.internal</span>
<span class="comment"># search = default domain suffix. "kafka-01" resolves as "kafka-01.company.internal"</span>

<span class="comment"># ════ /etc/environment — System-wide environment vars ════</span>
<span class="prompt">$</span> cat /etc/environment
<span class="output">PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"</span>
<span class="output">JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"</span>
<span class="output">SPARK_HOME="/opt/spark"</span>
<span class="comment"># Variables set here are available to ALL users and ALL services</span>

<span class="comment"># ════ /etc/cron.d — Scheduled jobs ════</span>
<span class="prompt">$</span> ls /etc/cron.d/
<span class="output">airflow   logrotate   e2scrub_all   sysstat</span>
<span class="prompt">$</span> cat /etc/cron.d/airflow
<span class="output">*/5 * * * * airflow /usr/local/bin/airflow jobs check 2>&1</span></div>
</div>

<div class="warning-box">
    <h4>⚠️ /etc/sudoers — The Most Dangerous File</h4>
    <p><code>/etc/sudoers</code> controls who can run commands as root. A syntax error here can lock out all administrator access to the server. <strong>Never edit it directly with a text editor.</strong> Always use <code>visudo</code> — it validates syntax before saving. If sudoers becomes corrupted and you're locked out, you need physical/console access or a recovery boot.</p>
    <pre>$ sudo visudo   # ALWAYS use visudo, never vim /etc/sudoers directly</pre>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 4 — /home, /root, /tmp — User Space
        // ══════════════════════════════════════════════════════
        {
            id: "user_space",
            content: `
<h3>🏠 /home, /root, /tmp — User Space</h3>

<div class="story-box">
    <h4>🏡 Your Personal Territory</h4>
    <p>Every user on a Linux system gets a <strong>home directory</strong> — a private space where their files, settings, and work live. This is the one part of the filesystem you own completely. The system administrator owns everything else. Your shell config, your SSH keys, your Python virtual environments, your project files — all live here. When you log in, Linux drops you directly into your home directory.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">user_space.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ Home directory basics ════</span>
<span class="prompt">$</span> echo ~            <span class="comment"># ~ expands to your home directory</span>
<span class="output">/home/anuj</span>
<span class="prompt">$</span> echo \$HOME        <span class="comment"># Same thing, as a variable</span>
<span class="output">/home/anuj</span>
<span class="prompt">$</span> cd ~             <span class="comment"># Go home from anywhere</span>
<span class="prompt">$</span> cd               <span class="comment"># Same — bare cd = go home</span>
<span class="prompt">$</span> pwd
<span class="output">/home/anuj</span>

<span class="comment"># ════ What lives in a typical home directory ════</span>
<span class="prompt">$</span> ls -la ~
<span class="output">drwxr-x--- 1 anuj anuj 4096 Mar 09 .          ← your home dir</span>
<span class="output">drwxr-xr-x 1 root root 4096 Mar 09 ..         ← /home (root owned)</span>
<span class="output">-rw------- 1 anuj anuj  220 .bash_logout</span>
<span class="output">-rw-r--r-- 1 anuj anuj 3526 .bashrc           ← shell config</span>
<span class="output">-rw-r--r-- 1 anuj anuj  807 .profile</span>
<span class="output">drwx------ 1 anuj anuj 4096 .ssh/             ← SSH keys (very private!)</span>
<span class="output">drwxrwxr-x 1 anuj anuj 4096 projects/</span>
<span class="output">drwx------ 1 anuj anuj 4096 .local/           ← user-specific app data</span>
<span class="output">drwxrwxr-x 1 anuj anuj 4096 .config/</span>
<span class="output">lrwxrwxrwx 1 anuj anuj   22 .venv -> projects/myapp/.venv</span>

<span class="comment"># ════ Hidden files (dotfiles) — shell and app config ════</span>
<span class="prompt">$</span> ls -la ~ | grep "^\." | awk '{print \$9}'
<span class="output">.bash_history    ← every command you've typed</span>
<span class="output">.bash_logout</span>
<span class="output">.bashrc          ← bash config (aliases, PATH, env vars)</span>
<span class="output">.gitconfig       ← git user/email settings</span>
<span class="output">.profile         ← login shell environment</span>
<span class="output">.ssh/            ← SSH keys and known_hosts</span>
<span class="output">.vimrc           ← vim editor config</span>
<span class="output">.config/         ← modern app configs (kubectl, pip, etc.)</span>

<span class="comment"># ════ .bashrc — Your shell's personality ════</span>
<span class="prompt">$</span> cat ~/.bashrc | grep -v "^#\|^$" | head -15
<span class="output">alias ll='ls -la'</span>
<span class="output">alias la='ls -la'</span>
<span class="output">alias gs='git status'</span>
<span class="output">export PATH="\$HOME/.local/bin:\$PATH"</span>
<span class="output">export SPARK_HOME="/opt/spark"</span>
<span class="output">export PYTHONPATH="\$PYTHONPATH:\$HOME/projects"</span>
<span class="output">source \$HOME/.venv/bin/activate 2>/dev/null</span>

<span class="comment"># ════ .ssh — The most security-sensitive dotfolder ════</span>
<span class="prompt">$</span> ls -la ~/.ssh/
<span class="output">-rw------- 1 anuj anuj 2622 id_rsa             ← private key (NEVER share!)</span>
<span class="output">-rw-r--r-- 1 anuj anuj  580 id_rsa.pub         ← public key (safe to share)</span>
<span class="output">-rw------- 1 anuj anuj 2048 authorized_keys    ← who can SSH into this machine</span>
<span class="output">-rw-r--r-- 1 anuj anuj 4096 known_hosts        ← servers we've connected to</span>
<span class="comment"># Permissions on .ssh MUST be 700, private key MUST be 600</span>
<span class="comment"># SSH will refuse to work if these are too permissive</span>

<span class="comment"># ════ /root — The root user's home directory ════</span>
<span class="prompt">$</span> ls /root
<span class="output">ls: cannot open directory '/root': Permission denied</span>
<span class="comment"># /root is only accessible by the root user itself</span>
<span class="prompt">$</span> sudo ls /root
<span class="output">.bashrc  .profile  .ssh/  setup-scripts/</span>

<span class="comment"># ════ /tmp — Temporary files, cleared on reboot ════</span>
<span class="prompt">$</span> ls /tmp
<span class="output">spark-4521-tmp/   pip-build-xyz/   sess_abc123   tmux-1000/</span>

<span class="prompt">$</span> stat /tmp
<span class="output">Access: (1777/drwxrwxrwt)   ← sticky bit! Anyone can write, but only owner can delete</span>

<span class="prompt">$</span> df -h /tmp
<span class="output">tmpfs  7.7G  234M  7.5G  3%  /tmp</span>
<span class="comment"># On modern Linux, /tmp is often tmpfs — stored in RAM, not on disk</span>
<span class="comment"># Anything in /tmp is DELETED on reboot — never store important data here</span></div>
</div>

<div class="deep-dive-box">
    <h4>🔍 The Sticky Bit on /tmp (drwxrwxrwt)</h4>
    <p>The <code>t</code> at the end of <code>/tmp</code>'s permissions is the <strong>sticky bit</strong>. Without it, anyone could delete anyone else's files (since /tmp is world-writable). With the sticky bit set: you can create files in /tmp, you can write to your own files, but you can <em>only delete files you own</em>. The sticky bit was originally used to keep frequently-used programs in memory (hence "sticky") — today its only practical use is this directory protection mechanism.</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 5 — /var — Variable Data
        // ══════════════════════════════════════════════════════
        {
            id: "var_directory",
            content: `
<h3>📝 /var — Variable Data (Logs, Databases, Caches)</h3>

<div class="story-box">
    <h4>🗂️ The Filing Cabinet That Never Stops Growing</h4>
    <p><code>/var</code> is where data that <em>changes at runtime</em> lives — and it is the directory most likely to fill up your disk. Logs accumulate here. Database files grow here. Mail queues build up here. Package manager caches fill here. A data engineer's production server with <code>/var/log</code> at 95% is not a hypothetical — it is a Tuesday morning incident.</p>
    <p>Understanding what's in <code>/var</code> — and why it's separate from <code>/usr</code> (which is read-only in production) — is fundamental to Linux operations.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">var_exploration.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ Overview of /var ════</span>
<span class="prompt">$</span> du -sh /var/* 2>/dev/null | sort -rh | head -8
<span class="output">8.2G    /var/lib      ← database state and package metadata</span>
<span class="output">4.1G    /var/log      ← all system and application logs</span>
<span class="output">1.4G    /var/cache    ← apt downloads, pip cache</span>
<span class="output">412M    /var/lib/postgresql   ← PostgreSQL data files</span>
<span class="output">240M    /var/lib/docker       ← Docker images and containers</span>

<span class="comment"># ════ /var/log — The Nerve Center ════</span>
<span class="prompt">$</span> ls /var/log/
<span class="output">auth.log     dpkg.log    kern.log    syslog</span>
<span class="output">apache2/     nginx/      postgresql/ airflow/</span>
<span class="output">journal/     apt/        cloud-init.log</span>

<span class="prompt">$</span> tail -20 /var/log/syslog            <span class="comment"># All system events</span>
<span class="prompt">$</span> tail -20 /var/log/auth.log           <span class="comment"># SSH logins, sudo usage</span>
<span class="prompt">$</span> tail -20 /var/log/kern.log           <span class="comment"># Kernel messages</span>
<span class="prompt">$</span> journalctl -n 50                     <span class="comment"># systemd journal (modern logging)</span>
<span class="prompt">$</span> journalctl -u nginx --since "1 hour ago"  <span class="comment"># Service-specific logs</span>

<span class="comment"># Find the largest log files:</span>
<span class="prompt">$</span> find /var/log -name "*.log" -size +50M | xargs ls -lh 2>/dev/null
<span class="output">-rw-r--r-- 1 syslog  4.2G /var/log/syslog</span>
<span class="output">-rw-r--r-- 1 www-data 800M /var/log/nginx/access.log</span>

<span class="comment"># ════ /var/lib — Application State ════</span>
<span class="prompt">$</span> ls /var/lib/
<span class="output">apt/           dpkg/        docker/</span>
<span class="output">postgresql/    systemd/     NetworkManager/</span>

<span class="prompt">$</span> ls /var/lib/apt/lists/ | head -5   <span class="comment"># Package index files</span>
<span class="output">archive.ubuntu.com_ubuntu_dists_jammy_InRelease</span>

<span class="prompt">$</span> ls /var/lib/dpkg/info/ | head -5   <span class="comment"># Installed package records</span>
<span class="output">python3.list  python3-minimal.list  bash.list</span>

<span class="comment"># ════ /var/cache — Cached Downloads ════</span>
<span class="prompt">$</span> du -sh /var/cache/apt/archives/
<span class="output">1.4G   /var/cache/apt/archives/</span>
<span class="comment"># These are downloaded .deb packages — safe to delete:</span>
<span class="prompt">$</span> sudo apt-get clean   <span class="comment"># Reclaim ~1.4GB</span>

<span class="comment"># ════ /var/run → /run — Runtime PIDs and Sockets ════</span>
<span class="prompt">$</span> ls /run/ | head -10
<span class="output">sshd.pid   nginx.pid   postgresql/   docker.sock   lock/</span>
<span class="prompt">$</span> cat /run/nginx.pid
<span class="output">1423</span>    <span class="comment"># nginx's process ID — written by the service on startup</span>
<span class="prompt">$</span> ls /run/postgresql/
<span class="output">.s.PGSQL.5432    .s.PGSQL.5432.lock</span>
<span class="comment"># Unix domain socket — local connections use this, not TCP!</span>

<span class="comment"># ════ /var/spool — Queued Work ════</span>
<span class="prompt">$</span> ls /var/spool/
<span class="output">cron/    mail/    anacron/</span>
<span class="prompt">$</span> ls /var/spool/cron/crontabs/   <span class="comment"># User cron jobs stored here</span>
<span class="output">anuj    root</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="18" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">/var Subdirectory Map — What Each Subtree Contains</text>

        <rect x="10"  y="30" width="130" height="160" rx="8" fill="#0a1520" stroke="#f87171" stroke-width="2"/>
        <text x="75"  y="52" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">/var/log</text>
        <text x="75"  y="68" text-anchor="middle" fill="#64748b" font-size="8">Log files</text>
        <text x="22"  y="86"  fill="#94a3b8" font-size="8">syslog (all events)</text>
        <text x="22"  y="100" fill="#94a3b8" font-size="8">auth.log (logins)</text>
        <text x="22"  y="114" fill="#94a3b8" font-size="8">kern.log (kernel)</text>
        <text x="22"  y="128" fill="#94a3b8" font-size="8">nginx/, apache2/</text>
        <text x="22"  y="142" fill="#94a3b8" font-size="8">airflow/, spark/</text>
        <text x="22"  y="162" fill="#f87171" font-size="8">⚠ Fills up! Use logrotate</text>
        <text x="22"  y="178" fill="#f87171" font-size="8">Monitor with df -h</text>

        <rect x="150" y="30" width="130" height="160" rx="8" fill="#0a1520" stroke="#fbbf24" stroke-width="2"/>
        <text x="215" y="52" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">/var/lib</text>
        <text x="215" y="68" text-anchor="middle" fill="#64748b" font-size="8">Application state</text>
        <text x="162" y="86"  fill="#94a3b8" font-size="8">postgresql/ (DB data)</text>
        <text x="162" y="100" fill="#94a3b8" font-size="8">mysql/ (DB data)</text>
        <text x="162" y="114" fill="#94a3b8" font-size="8">docker/ (images)</text>
        <text x="162" y="128" fill="#94a3b8" font-size="8">apt/ (pkg index)</text>
        <text x="162" y="142" fill="#94a3b8" font-size="8">dpkg/ (installed)</text>
        <text x="162" y="162" fill="#fbbf24" font-size="8">★ DB files live here</text>
        <text x="162" y="178" fill="#fbbf24" font-size="8">Back up regularly</text>

        <rect x="290" y="30" width="130" height="160" rx="8" fill="#0a1520" stroke="#34d399" stroke-width="2"/>
        <text x="355" y="52" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">/var/cache</text>
        <text x="355" y="68" text-anchor="middle" fill="#64748b" font-size="8">Cached downloads</text>
        <text x="302" y="86"  fill="#94a3b8" font-size="8">apt/archives/</text>
        <text x="302" y="100" fill="#94a3b8" font-size="8">(downloaded .debs)</text>
        <text x="302" y="114" fill="#94a3b8" font-size="8">pip/ (wheel cache)</text>
        <text x="302" y="128" fill="#94a3b8" font-size="8">man/ (man cache)</text>
        <text x="302" y="148" fill="#34d399" font-size="8">Safe to delete all:</text>
        <text x="302" y="162" fill="#34d399" font-size="8">apt-get clean</text>
        <text x="302" y="178" fill="#34d399" font-size="8">pip cache purge</text>

        <rect x="430" y="30" width="130" height="160" rx="8" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="495" y="52" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold">/run (/var/run)</text>
        <text x="495" y="68" text-anchor="middle" fill="#64748b" font-size="8">Runtime state</text>
        <text x="442" y="86"  fill="#94a3b8" font-size="8">*.pid files (PIDs)</text>
        <text x="442" y="100" fill="#94a3b8" font-size="8">*.sock (Unix sockets)</text>
        <text x="442" y="114" fill="#94a3b8" font-size="8">lock/ (file locks)</text>
        <text x="442" y="128" fill="#94a3b8" font-size="8">docker.sock</text>
        <text x="442" y="148" fill="#22d3ee" font-size="8">Lives in RAM (tmpfs)</text>
        <text x="442" y="162" fill="#22d3ee" font-size="8">Cleared on reboot</text>
        <text x="442" y="178" fill="#22d3ee" font-size="8">/var/run → /run</text>

        <rect x="570" y="30" width="140" height="160" rx="8" fill="#0a1520" stroke="#a78bfa" stroke-width="2"/>
        <text x="640" y="52" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold">/var/spool</text>
        <text x="640" y="68" text-anchor="middle" fill="#64748b" font-size="8">Queued work</text>
        <text x="582" y="86"  fill="#94a3b8" font-size="8">cron/ (crontabs)</text>
        <text x="582" y="100" fill="#94a3b8" font-size="8">mail/ (unread mail)</text>
        <text x="582" y="114" fill="#94a3b8" font-size="8">cups/ (print queue)</text>
        <text x="582" y="130" fill="#a78bfa" font-size="8">★ Crontabs stored at:</text>
        <text x="582" y="144" fill="#a78bfa" font-size="8">/var/spool/cron/</text>
        <text x="582" y="158" fill="#a78bfa" font-size="8">crontabs/username</text>
        <text x="582" y="178" fill="#64748b" font-size="8">Edit with: crontab -e</text>
    </svg>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 6 — /proc and /sys — Virtual Filesystems
        // ══════════════════════════════════════════════════════
        {
            id: "virtual_filesystems",
            content: `
<h3>👻 /proc and /sys — The Kernel's Window</h3>

<div class="story-box">
    <h4>🔮 Files That Aren't Really Files</h4>
    <p><code>/proc</code> and <code>/sys</code> are the most magical parts of Linux. They look like directories full of files — but none of them exist on disk. They are <strong>virtual filesystems</strong> generated by the kernel in real time. When you read <code>/proc/1234/status</code>, the kernel fabricates that file on the spot, filling it with the current state of process 1234. When you <em>write</em> to <code>/proc/sys/net/ipv4/ip_forward</code>, you're not writing to a file — you're changing a <strong>live kernel parameter</strong> that takes effect immediately. This is the deepest expression of "everything is a file."</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">proc_sys_exploration.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ /proc — Process and Kernel Information ════</span>
<span class="prompt">$</span> ls /proc | head -20
<span class="output">1  2  3  ...  4521  4522   ← numbered directories = running PIDs</span>
<span class="output">buddyinfo  cmdline  cpuinfo  filesystems  interrupts</span>
<span class="output">loadavg  meminfo  mounts  net  self  sys  uptime  version</span>

<span class="comment"># Every numbered directory is a running process:</span>
<span class="prompt">$</span> ls /proc/4521/
<span class="output">cmdline  cwd  environ  exe  fd/  maps  mem  net/</span>
<span class="output">ns/      smaps  stat  status  wchan</span>

<span class="prompt">$</span> cat /proc/4521/cmdline | tr '\0' ' '   <span class="comment"># How process was started</span>
<span class="output">java -Xmx4g -jar /opt/spark/jars/spark-submit.jar</span>

<span class="prompt">$</span> ls -la /proc/4521/exe                  <span class="comment"># Symlink to binary</span>
<span class="output">lrwxrwxrwx -> /usr/bin/java</span>

<span class="prompt">$</span> ls /proc/4521/fd | wc -l              <span class="comment"># Open file descriptors</span>
<span class="output">1842</span>

<span class="prompt">$</span> ls -la /proc/4521/fd | head -5        <span class="comment"># What files are open</span>
<span class="output">lrwxrwxrwx -> /dev/null         (fd 0: stdin)</span>
<span class="output">lrwxrwxrwx -> /var/log/spark/app.log (fd 1: stdout)</span>
<span class="output">lrwxrwxrwx -> /var/log/spark/app.log (fd 2: stderr)</span>

<span class="comment"># /proc self-referential shortcut:</span>
<span class="prompt">$</span> cat /proc/self/cmdline | tr '\0' ' '  <span class="comment"># Current process's command</span>
<span class="output">cat /proc/self/cmdline</span>

<span class="comment"># ════ Key /proc files ════</span>
<span class="prompt">$</span> cat /proc/version      <span class="comment"># Same as uname -a</span>
<span class="output">Linux version 5.15.0-91-generic (gcc version 11.4.0)</span>
<span class="prompt">$</span> cat /proc/uptime       <span class="comment"># Seconds since boot, idle seconds</span>
<span class="output">864000.12 6912000.48</span>
<span class="prompt">$</span> cat /proc/loadavg
<span class="output">2.45 1.87 1.24 4/247 3847</span>
<span class="prompt">$</span> cat /proc/mounts       <span class="comment"># All currently mounted filesystems</span>

<span class="comment"># ════ /proc/sys — Tunable Kernel Parameters ════</span>
<span class="prompt">$</span> ls /proc/sys/
<span class="output">kernel/  net/  vm/  fs/  debug/</span>

<span class="comment"># READ a kernel parameter:</span>
<span class="prompt">$</span> cat /proc/sys/net/ipv4/ip_forward
<span class="output">0</span>    <span class="comment"># 0 = IP forwarding disabled</span>

<span class="prompt">$</span> cat /proc/sys/vm/swappiness
<span class="output">60</span>   <span class="comment"># How aggressively to use swap (0-100)</span>

<span class="comment"># WRITE to a kernel parameter (takes effect IMMEDIATELY, lost on reboot):</span>
<span class="prompt">$</span> sudo sysctl -w vm.swappiness=10        <span class="comment"># For data engineering servers</span>
<span class="output">vm.swappiness = 10</span>
<span class="comment"># Or equivalently:</span>
<span class="prompt">$</span> echo 10 | sudo tee /proc/sys/vm/swappiness

<span class="comment"># Make permanent (survives reboot) — add to /etc/sysctl.conf:</span>
<span class="prompt">$</span> echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf
<span class="prompt">$</span> sudo sysctl -p   <span class="comment"># Reload from /etc/sysctl.conf</span>

<span class="comment"># ════ /sys — Hardware and Driver Configuration ════</span>
<span class="prompt">$</span> ls /sys/class/
<span class="output">block/  net/  power_supply/  thermal/  backlight/</span>

<span class="prompt">$</span> cat /sys/class/net/eth0/speed    <span class="comment"># Network speed</span>
<span class="output">10000</span>    <span class="comment"># 10 Gbps NIC</span>

<span class="prompt">$</span> cat /sys/class/block/sda/queue/rotational
<span class="output">0</span>        <span class="comment"># 0 = SSD</span>

<span class="prompt">$</span> cat /sys/class/block/sda/size   <span class="comment"># Size in 512-byte sectors</span>
<span class="output">104857600</span>    <span class="comment"># ÷ 2 ÷ 1048576 = 50 GB</span></div>
</div>

<div class="deep-dive-box">
    <h4>🔍 Key sysctl Tunings for Data Engineering</h4>
    <pre>
vm.swappiness=10          # Minimize swap use (default=60)
vm.dirty_ratio=40          # % RAM that can hold dirty pages before writing
vm.dirty_background_ratio=10  # Background write threshold
net.core.rmem_max=16777216    # TCP receive buffer for Kafka/Spark
net.core.wmem_max=16777216    # TCP send buffer
fs.file-max=2097152           # Max open files system-wide (for Spark)
</pre>
    <p>These are not random tweaks — they directly affect Spark shuffle performance, Kafka throughput, and database behavior. The standard Spark production tuning guide recommends setting vm.swappiness=10 on all worker nodes.</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 7 — /dev, /opt, /mnt, /media, /srv
        // ══════════════════════════════════════════════════════
        {
            id: "other_directories",
            content: `
<h3>📦 /dev, /opt, /mnt, /media, /srv, /boot</h3>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">other_directories.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ /dev — Device Files ════</span>
<span class="comment"># Every hardware device appears as a file here</span>
<span class="prompt">$</span> ls /dev/ | grep -E "^sd|^nvme|^tty|^null|^zero|^random|^loop"
<span class="output">sda   sda1   sda2     ← SATA hard disk and partitions</span>
<span class="output">nvme0n1  nvme0n1p1   ← NVMe SSD and partition</span>
<span class="output">tty0  tty1  ttyS0    ← terminals and serial ports</span>
<span class="output">null  zero  random   urandom  ← special virtual devices</span>
<span class="output">loop0  loop1          ← loop devices (for disk images)</span>

<span class="comment"># The special devices every engineer knows:</span>
<span class="prompt">$</span> cat /dev/null               <span class="comment"># Returns nothing (the void)</span>
<span class="prompt">$</span> echo "hello" > /dev/null   <span class="comment"># Discard output</span>
<span class="prompt">$</span> head -c 32 /dev/urandom | base64   <span class="comment"># Generate random data</span>
<span class="output">3Kf9mN+xQzLpR8vBjY2WcAeHtDuMsXnI</span>
<span class="prompt">$</span> dd if=/dev/zero of=/tmp/testfile bs=1M count=100   <span class="comment"># Create 100MB zero-filled file</span>

<span class="comment"># Block devices:</span>
<span class="prompt">$</span> ls -la /dev/sda
<span class="output">brw-rw---- 1 root disk 8, 0 Mar 09 /dev/sda</span>
<span class="comment"># b = block device   8,0 = major,minor numbers</span>

<span class="comment"># ════ /opt — Optional Software (Self-contained Apps) ════</span>
<span class="prompt">$</span> ls /opt/
<span class="output">spark/   kafka/   airflow/   conda/   google/   containerd/</span>

<span class="prompt">$</span> ls /opt/spark/
<span class="output">bin/  conf/  data/  jars/  logs/  python/  sbin/  work/</span>
<span class="comment"># Spark is fully self-contained under /opt/spark</span>
<span class="comment"># Rule: if software doesn't follow standard layout, put it in /opt</span>

<span class="prompt">$</span> ls /opt/kafka/
<span class="output">bin/  config/  libs/  logs/</span>

<span class="comment"># ════ /mnt — Manual Mount Point ════</span>
<span class="prompt">$</span> ls /mnt/
<span class="output">data/   backup/   nfs-share/</span>

<span class="prompt">$</span> mount /dev/sdb1 /mnt/data           <span class="comment"># Manually mount a disk</span>
<span class="prompt">$</span> mount -t nfs 10.0.0.8:/exports /mnt/nfs-share  <span class="comment"># Mount NFS share</span>
<span class="prompt">$</span> umount /mnt/data                     <span class="comment"># Unmount</span>
<span class="prompt">$</span> df -h /mnt/data                      <span class="comment"># Check what's mounted</span>

<span class="comment"># ════ /media — Removable Media (auto-mounted) ════</span>
<span class="prompt">$</span> ls /media/
<span class="output">anuj/   ← your user's removable drives appear here</span>
<span class="prompt">$</span> ls /media/anuj/
<span class="output">USB-BACKUP/   UBUNTU-22.04/</span>
<span class="comment"># Desktop systems auto-mount USB drives and DVDs here</span>
<span class="comment"># Servers rarely use /media</span>

<span class="comment"># ════ /srv — Service Data ════</span>
<span class="prompt">$</span> ls /srv/
<span class="output">www/   ftp/   nfs/</span>
<span class="comment"># Data SERVED by the server — web roots, FTP data</span>
<span class="comment"># Intentionally separate from /var (which is for the server's own data)</span>
<span class="prompt">$</span> ls /srv/www/
<span class="output">company-website/   static-assets/   api-docs/</span>

<span class="comment"># ════ /boot — Kernel and Bootloader ════</span>
<span class="prompt">$</span> ls /boot/
<span class="output">grub/   initrd.img-5.15.0-91-generic</span>
<span class="output">vmlinuz-5.15.0-91-generic   System.map-5.15.0-91-generic</span>
<span class="output">config-5.15.0-91-generic</span>

<span class="prompt">$</span> du -sh /boot/
<span class="output">512M</span>
<span class="comment"># vmlinuz = compressed Linux kernel binary (the actual kernel!)</span>
<span class="comment"># initrd.img = initial RAM disk (minimal filesystem for early boot)</span>
<span class="comment"># grub/ = bootloader that runs before the kernel</span>
<span class="prompt">$</span> file /boot/vmlinuz-5.15.0-91-generic
<span class="output">Linux kernel x86 boot executable bzImage, version 5.15.0-91-generic</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="18" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Where Should You Install Software? — Decision Guide</text>

        <rect x="10" y="30" width="220" height="180" rx="8" fill="#0a1520" stroke="#fbbf24" stroke-width="2"/>
        <text x="120" y="52" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold">apt install</text>
        <text x="120" y="68" text-anchor="middle" fill="#64748b" font-size="9">Managed by OS package manager</text>
        <text x="22"  y="88"  fill="#94a3b8" font-size="9">→ goes to /usr/bin</text>
        <text x="22"  y="104" fill="#94a3b8" font-size="9">→ config in /etc</text>
        <text x="22"  y="120" fill="#94a3b8" font-size="9">→ data in /var/lib</text>
        <text x="22"  y="140" fill="#fbbf24" font-size="8">Use for: system tools,</text>
        <text x="22"  y="154" fill="#fbbf24" font-size="8">daemons, drivers</text>
        <text x="22"  y="174" fill="#94a3b8" font-size="8">E.g.: nginx, postgresql,</text>
        <text x="22"  y="188" fill="#94a3b8" font-size="8">python3-dev, git</text>

        <rect x="240" y="30" width="220" height="180" rx="8" fill="#0a1520" stroke="#34d399" stroke-width="2"/>
        <text x="350" y="52" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">Manual install</text>
        <text x="350" y="68" text-anchor="middle" fill="#64748b" font-size="9">You manage the files</text>
        <text x="252" y="88"  fill="#94a3b8" font-size="9">→ binaries to /usr/local/bin</text>
        <text x="252" y="104" fill="#94a3b8" font-size="9">OR /opt/appname/ (self-contained)</text>
        <text x="252" y="120" fill="#94a3b8" font-size="9">→ config in /etc or /opt/app/conf</text>
        <text x="252" y="140" fill="#34d399" font-size="8">Use for: Spark, Kafka, dbt,</text>
        <text x="252" y="154" fill="#34d399" font-size="8">custom CLIs, tarball installs</text>
        <text x="252" y="174" fill="#94a3b8" font-size="8">E.g.: /opt/spark, /opt/kafka</text>
        <text x="252" y="188" fill="#94a3b8" font-size="8">/usr/local/bin/airflow</text>

        <rect x="470" y="30" width="240" height="180" rx="8" fill="#0a1520" stroke="#a78bfa" stroke-width="2"/>
        <text x="590" y="52" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold">pip/conda install</text>
        <text x="590" y="68" text-anchor="middle" fill="#64748b" font-size="9">Python-specific</text>
        <text x="482" y="88"  fill="#94a3b8" font-size="9">pip install → /usr/lib/python3/</text>
        <text x="482" y="104" fill="#94a3b8" font-size="9">pip --user → ~/.local/lib/</text>
        <text x="482" y="120" fill="#94a3b8" font-size="9">venv → any directory</text>
        <text x="482" y="140" fill="#a78bfa" font-size="8">Best practice: ALWAYS use</text>
        <text x="482" y="154" fill="#a78bfa" font-size="8">virtual environments!</text>
        <text x="482" y="174" fill="#94a3b8" font-size="8">python3 -m venv .venv</text>
        <text x="482" y="188" fill="#94a3b8" font-size="8">Never: pip install (system)</text>
    </svg>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 8 — Paths, Links, and Navigation Mastery
        // ══════════════════════════════════════════════════════
        {
            id: "paths_and_links",
            content: `
<h3>🔗 Absolute Paths, Relative Paths, and Symlinks</h3>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">paths_and_links.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ Absolute vs Relative Paths ════</span>
<span class="comment"># Absolute: starts with /  →  same meaning from ANY directory</span>
<span class="prompt">$</span> cat /etc/hosts            <span class="comment"># always means THIS file</span>
<span class="prompt">$</span> ls /var/log/              <span class="comment"># always means THIS directory</span>

<span class="comment"># Relative: starts without /  →  relative to current working directory</span>
<span class="prompt">$</span> pwd
<span class="output">/home/anuj</span>
<span class="prompt">$</span> cat .bashrc               <span class="comment"># same as cat /home/anuj/.bashrc</span>
<span class="prompt">$</span> ls projects/              <span class="comment"># same as ls /home/anuj/projects/</span>
<span class="prompt">$</span> cd ../ubuntu              <span class="comment"># go UP one level, then into ubuntu/</span>
<span class="prompt">$</span> pwd
<span class="output">/home/ubuntu</span>

<span class="comment"># Special path shortcuts:</span>
<span class="prompt">$</span> cd .          <span class="comment"># current directory (no-op)</span>
<span class="prompt">$</span> cd ..         <span class="comment"># parent directory</span>
<span class="prompt">$</span> cd ../..      <span class="comment"># grandparent directory</span>
<span class="prompt">$</span> cd ~          <span class="comment"># home directory</span>
<span class="prompt">$</span> cd -          <span class="comment"># previous directory (toggle back/forward)</span>

<span class="prompt">$</span> pwd           <span class="comment"># where am I?</span>
<span class="output">/home/ubuntu</span>
<span class="prompt">$</span> cd -
<span class="output">/home/anuj</span>    <span class="comment"># back to previous location</span>

<span class="comment"># ════ Symbolic Links (symlinks) ════</span>
<span class="comment"># A symlink is a file that points to another file or directory</span>
<span class="prompt">$</span> ln -s /opt/spark /usr/local/spark    <span class="comment"># create symlink</span>
<span class="prompt">$</span> ls -la /usr/local/ | grep spark
<span class="output">lrwxrwxrwx 1 root root 10 spark -> /opt/spark</span>
<span class="comment"># l = symlink   rw = permissions on target   -> shows target</span>

<span class="prompt">$</span> ln -s /usr/bin/python3 /usr/local/bin/python  <span class="comment"># "python" -> python3</span>

<span class="comment"># Symlinks throughout the filesystem:</span>
<span class="prompt">$</span> ls -la /bin
<span class="output">lrwxrwxrwx root root /bin -> usr/bin</span>
<span class="prompt">$</span> ls -la /lib
<span class="output">lrwxrwxrwx root root /lib -> usr/lib</span>
<span class="prompt">$</span> ls -la /var/run
<span class="output">lrwxrwxrwx root root /var/run -> ../run</span>

<span class="comment"># The current Spark symlink pattern (for version upgrades):</span>
<span class="prompt">$</span> ls /opt/
<span class="output">spark -> spark-3.5.0    spark-3.4.0/    spark-3.5.0/</span>
<span class="comment"># "spark" symlink points to current version</span>
<span class="comment"># To upgrade: install spark-3.5.1, then update the symlink:</span>
<span class="prompt">$</span> ln -sfn /opt/spark-3.5.1 /opt/spark
<span class="comment"># All scripts using /opt/spark now use the new version instantly</span>

<span class="comment"># ════ Hard Links vs Symbolic Links ════</span>
<span class="prompt">$</span> ln  /etc/hosts /tmp/hosts-hardlink   <span class="comment"># hard link (no -s)</span>
<span class="prompt">$</span> ln -s /etc/hosts /tmp/hosts-symlink  <span class="comment"># symbolic link</span>
<span class="prompt">$</span> ls -lai /etc/hosts /tmp/hosts-hardlink /tmp/hosts-symlink
<span class="output">263180 -rw-r--r-- 2 root root 220 /etc/hosts         ← inode 263180, nlink=2</span>
<span class="output">263180 -rw-r--r-- 2 root root 220 /tmp/hosts-hardlink ← SAME inode!</span>
<span class="output">287441 lrwxrwxrwx 1 root root  10 /tmp/hosts-symlink -> /etc/hosts</span>
<span class="comment"># Hard link: same inode — two names for the SAME data on disk</span>
<span class="comment"># Symbolic link: different inode — a pointer to a path</span>
<span class="comment"># Deleting the original breaks symlink but NOT hard link</span>

<span class="comment"># ════ Finding symlinks ════</span>
<span class="prompt">$</span> find /usr/local -maxdepth 2 -type l   <span class="comment"># find symlinks</span>
<span class="prompt">$</span> find /usr/local -maxdepth 2 -type l -xtype d  <span class="comment"># symlinks to directories</span>
<span class="prompt">$</span> find / -type l -xtype l 2>/dev/null | head -5  <span class="comment"># broken symlinks</span></div>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 9 — FHS Quick Reference
        // ══════════════════════════════════════════════════════
        {
            id: "fhs_reference",
            content: `
<h3>📑 Complete FHS Quick Reference</h3>

<div class="visual-container">
    <svg viewBox="0 0 720 600" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="18" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Linux Filesystem Hierarchy — Complete Reference Card</text>

        <!-- Header row -->
        <rect x="10" y="26" width="160" height="22" rx="4" fill="#1e293b"/>
        <text x="90"  y="41" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Directory</text>
        <rect x="178" y="26" width="260" height="22" rx="4" fill="#1e293b"/>
        <text x="308" y="41" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">What lives here</text>
        <rect x="446" y="26" width="264" height="22" rx="4" fill="#1e293b"/>
        <text x="578" y="41" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Data Engineer relevance</text>

        <!-- Rows -->
        <!-- / -->
        <rect x="10" y="52" width="160" height="22" rx="4" fill="#1a0a30" stroke="#a78bfa" stroke-width="1"/>
        <text x="90"  y="67" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="JetBrains Mono">/</text>
        <rect x="178" y="52" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="67" text-anchor="middle" fill="#94a3b8" font-size="9">Root — top of entire filesystem tree</text>
        <rect x="446" y="52" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="67" text-anchor="middle" fill="#64748b" font-size="9">Starting point for all absolute paths</text>

        <!-- /bin -->
        <rect x="10" y="78" width="160" height="22" rx="4" fill="#0a1520" stroke="#22d3ee" stroke-width="1"/>
        <text x="90"  y="93" text-anchor="middle" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">/bin → /usr/bin</text>
        <rect x="178" y="78" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="93" text-anchor="middle" fill="#94a3b8" font-size="9">Essential user commands (ls, cp, python3)</text>
        <rect x="446" y="78" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="93" text-anchor="middle" fill="#64748b" font-size="9">python3, pip, git — tools you run daily</text>

        <!-- /sbin -->
        <rect x="10" y="104" width="160" height="22" rx="4" fill="#0a1520" stroke="#f87171" stroke-width="1"/>
        <text x="90"  y="119" text-anchor="middle" fill="#f87171" font-size="11" font-family="JetBrains Mono">/sbin → /usr/sbin</text>
        <rect x="178" y="104" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="119" text-anchor="middle" fill="#94a3b8" font-size="9">Admin commands needing root (fdisk, ip)</text>
        <rect x="446" y="104" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="119" text-anchor="middle" fill="#64748b" font-size="9">sysctl tuning, network config, disk ops</text>

        <!-- /etc -->
        <rect x="10" y="130" width="160" height="22" rx="4" fill="#0a1520" stroke="#fb923c" stroke-width="1"/>
        <text x="90"  y="145" text-anchor="middle" fill="#fb923c" font-size="11" font-family="JetBrains Mono">/etc</text>
        <rect x="178" y="130" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="145" text-anchor="middle" fill="#94a3b8" font-size="9">All system configuration (text files only)</text>
        <rect x="446" y="130" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="145" text-anchor="middle" fill="#64748b" font-size="9">/etc/hosts, /etc/environment, /etc/cron.d</text>

        <!-- /home -->
        <rect x="10" y="156" width="160" height="22" rx="4" fill="#0a1520" stroke="#34d399" stroke-width="2"/>
        <text x="90"  y="171" text-anchor="middle" fill="#34d399" font-size="11" font-family="JetBrains Mono">/home</text>
        <rect x="178" y="156" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="171" text-anchor="middle" fill="#94a3b8" font-size="9">User home directories (/home/anuj)</text>
        <rect x="446" y="156" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="171" text-anchor="middle" fill="#34d399" font-size="9">★ Your work, code, SSH keys, .bashrc</text>

        <!-- /root -->
        <rect x="10" y="182" width="160" height="22" rx="4" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="90"  y="197" text-anchor="middle" fill="#64748b" font-size="11" font-family="JetBrains Mono">/root</text>
        <rect x="178" y="182" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="197" text-anchor="middle" fill="#94a3b8" font-size="9">Root user's home directory</text>
        <rect x="446" y="182" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="197" text-anchor="middle" fill="#64748b" font-size="9">Inaccessible unless you are root</text>

        <!-- /var -->
        <rect x="10" y="208" width="160" height="22" rx="4" fill="#0a1520" stroke="#fbbf24" stroke-width="2"/>
        <text x="90"  y="223" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">/var</text>
        <rect x="178" y="208" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="223" text-anchor="middle" fill="#94a3b8" font-size="9">Variable data (logs, DBs, caches, queues)</text>
        <rect x="446" y="208" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="223" text-anchor="middle" fill="#fbbf24" font-size="9">★ /var/log fills up! Monitor /var disk</text>

        <!-- /tmp -->
        <rect x="10" y="234" width="160" height="22" rx="4" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="90"  y="249" text-anchor="middle" fill="#64748b" font-size="11" font-family="JetBrains Mono">/tmp</text>
        <rect x="178" y="234" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="249" text-anchor="middle" fill="#94a3b8" font-size="9">Temporary files, world-writable, cleared on reboot</text>
        <rect x="446" y="234" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="249" text-anchor="middle" fill="#64748b" font-size="9">Spark shuffle files — watch for /tmp full</text>

        <!-- /proc -->
        <rect x="10" y="260" width="160" height="22" rx="4" fill="#1a0520" stroke="#e879f9" stroke-width="1"/>
        <text x="90"  y="275" text-anchor="middle" fill="#e879f9" font-size="11" font-family="JetBrains Mono">/proc</text>
        <rect x="178" y="260" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="275" text-anchor="middle" fill="#94a3b8" font-size="9">Virtual FS — process and kernel state</text>
        <rect x="446" y="260" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="275" text-anchor="middle" fill="#64748b" font-size="9">/proc/cpuinfo, meminfo, loadavg, PID/</text>

        <!-- /sys -->
        <rect x="10" y="286" width="160" height="22" rx="4" fill="#1a0520" stroke="#e879f9" stroke-width="1"/>
        <text x="90"  y="301" text-anchor="middle" fill="#e879f9" font-size="11" font-family="JetBrains Mono">/sys</text>
        <rect x="178" y="286" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="301" text-anchor="middle" fill="#94a3b8" font-size="9">Virtual FS — hardware and driver config</text>
        <rect x="446" y="286" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="301" text-anchor="middle" fill="#64748b" font-size="9">SSD detection, NIC speed, power mgmt</text>

        <!-- /dev -->
        <rect x="10" y="312" width="160" height="22" rx="4" fill="#0a1520" stroke="#f87171" stroke-width="1"/>
        <text x="90"  y="327" text-anchor="middle" fill="#f87171" font-size="11" font-family="JetBrains Mono">/dev</text>
        <rect x="178" y="312" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="327" text-anchor="middle" fill="#94a3b8" font-size="9">Device files (disks, terminals, /dev/null)</text>
        <rect x="446" y="312" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="327" text-anchor="middle" fill="#64748b" font-size="9">sda1 for disk ops, null for output sinks</text>

        <!-- /opt -->
        <rect x="10" y="338" width="160" height="22" rx="4" fill="#0a1520" stroke="#34d399" stroke-width="2"/>
        <text x="90"  y="353" text-anchor="middle" fill="#34d399" font-size="11" font-family="JetBrains Mono">/opt</text>
        <rect x="178" y="338" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="353" text-anchor="middle" fill="#94a3b8" font-size="9">Optional self-contained software packages</text>
        <rect x="446" y="338" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="353" text-anchor="middle" fill="#34d399" font-size="9">★ /opt/spark, /opt/kafka, /opt/conda</text>

        <!-- /usr -->
        <rect x="10" y="364" width="160" height="22" rx="4" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="90"  y="379" text-anchor="middle" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">/usr</text>
        <rect x="178" y="364" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="379" text-anchor="middle" fill="#94a3b8" font-size="9">Read-only shareable programs and data</text>
        <rect x="446" y="364" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="379" text-anchor="middle" fill="#64748b" font-size="9">/usr/bin (programs), /usr/lib (libraries)</text>

        <!-- /usr/local -->
        <rect x="10" y="390" width="160" height="22" rx="4" fill="#0a1520" stroke="#34d399" stroke-width="1"/>
        <text x="90"  y="405" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">/usr/local</text>
        <rect x="178" y="390" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="405" text-anchor="middle" fill="#94a3b8" font-size="9">Locally installed software (not from apt)</text>
        <rect x="446" y="390" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="405" text-anchor="middle" fill="#34d399" font-size="9">★ Your custom tools: airflow, dbt, kubectl</text>

        <!-- /mnt -->
        <rect x="10" y="416" width="160" height="22" rx="4" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="90"  y="431" text-anchor="middle" fill="#64748b" font-size="11" font-family="JetBrains Mono">/mnt</text>
        <rect x="178" y="416" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="431" text-anchor="middle" fill="#94a3b8" font-size="9">Manually mounted filesystems</text>
        <rect x="446" y="416" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="431" text-anchor="middle" fill="#64748b" font-size="9">NFS mounts, extra disks, temp mounts</text>

        <!-- /boot -->
        <rect x="10" y="442" width="160" height="22" rx="4" fill="#0a1520" stroke="#fbbf24" stroke-width="1"/>
        <text x="90"  y="457" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">/boot</text>
        <rect x="178" y="442" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="457" text-anchor="middle" fill="#94a3b8" font-size="9">Kernel (vmlinuz), initrd, GRUB bootloader</text>
        <rect x="446" y="442" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="457" text-anchor="middle" fill="#64748b" font-size="9">Don't touch — fill this and server won't boot</text>

        <!-- /lib -->
        <rect x="10" y="468" width="160" height="22" rx="4" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="90"  y="483" text-anchor="middle" fill="#64748b" font-size="11" font-family="JetBrains Mono">/lib → /usr/lib</text>
        <rect x="178" y="468" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="483" text-anchor="middle" fill="#94a3b8" font-size="9">Shared libraries (.so files)</text>
        <rect x="446" y="468" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="483" text-anchor="middle" fill="#64748b" font-size="9">libc, libpython, libjava — linked at runtime</text>

        <!-- /srv -->
        <rect x="10" y="494" width="160" height="22" rx="4" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="90"  y="509" text-anchor="middle" fill="#64748b" font-size="11" font-family="JetBrains Mono">/srv</text>
        <rect x="178" y="494" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="509" text-anchor="middle" fill="#94a3b8" font-size="9">Data served to outside (web, FTP roots)</text>
        <rect x="446" y="494" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="509" text-anchor="middle" fill="#64748b" font-size="9">/srv/www for web files on dedicated servers</text>

        <!-- /run -->
        <rect x="10" y="520" width="160" height="22" rx="4" fill="#0a1520" stroke="#22d3ee" stroke-width="1"/>
        <text x="90"  y="535" text-anchor="middle" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">/run</text>
        <rect x="178" y="520" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="535" text-anchor="middle" fill="#94a3b8" font-size="9">Runtime data: PIDs, sockets (tmpfs)</text>
        <rect x="446" y="520" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="535" text-anchor="middle" fill="#64748b" font-size="9">/run/postgresql/*.sock, /run/docker.sock</text>

        <!-- /media -->
        <rect x="10" y="546" width="160" height="22" rx="4" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="90"  y="561" text-anchor="middle" fill="#64748b" font-size="11" font-family="JetBrains Mono">/media</text>
        <rect x="178" y="546" width="260" height="22" rx="4" fill="#0a1520"/>
        <text x="308" y="561" text-anchor="middle" fill="#94a3b8" font-size="9">Auto-mounted removable media (USB, DVD)</text>
        <rect x="446" y="546" width="264" height="22" rx="4" fill="#0a1520"/>
        <text x="578" y="561" text-anchor="middle" fill="#64748b" font-size="9">Rarely used on servers</text>

        <text x="360" y="590" text-anchor="middle" fill="#64748b" font-size="9">★ = especially relevant for data engineering workloads</text>
    </svg>
</div>
`
        }
    ], // end sections

    practiceExercises: [
        {
            id: "fsh_ex01",
            difficulty: "Easy",
            title: "Explore the Root Filesystem",
            description: "Navigate the top-level directories of / and understand what category each belongs to.",
            starterCode: `# List all top-level directories
$ ls /

# Check which /bin and /sbin are symlinks (modern Ubuntu)
$ ls -la /bin /sbin /lib /lib64

# Measure the size of each top-level directory
$ du -sh /* 2>/dev/null | sort -rh | head -8`,
            solution: `$ ls /
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt
proc  root  run  sbin  srv  sys  tmp  usr  var

$ ls -la /bin /sbin /lib /lib64
lrwxrwxrwx root root  /bin   -> usr/bin    # symlink!
lrwxrwxrwx root root  /sbin  -> usr/sbin   # symlink!
lrwxrwxrwx root root  /lib   -> usr/lib    # symlink!
lrwxrwxrwx root root  /lib64 -> usr/lib64  # symlink!
# On Ubuntu 22.04, all these point into /usr

$ du -sh /* 2>/dev/null | sort -rh | head -8
7.5G  /usr      programs and libraries
4.2G  /var      logs, databases, caches
512M  /boot     kernel and bootloader
220M  /lib      (symlink to /usr/lib, counted above)
 64M  /etc      configuration files
 12M  /bin      (symlink to /usr/bin)
8.0K  /tmp      temp files (mostly in RAM)
4.0K  /opt      (empty on fresh install)`,
            explanation: "The modern 'usrmerge' means /bin, /sbin, /lib, and /lib64 are all symlinks to their /usr counterparts on Ubuntu 22.04+. This was done to simplify the filesystem. /usr is the biggest directory because it contains all installed software and libraries. /var is often the second biggest — it grows continuously as logs accumulate and services store state. /proc and /sys show 0 bytes because they are virtual filesystems generated by the kernel — nothing is stored on disk."
        },
        {
            id: "fsh_ex02",
            difficulty: "Easy",
            title: "Navigate with Absolute and Relative Paths",
            description: "Practice the difference between absolute and relative paths, and use special shortcuts like ~, .., and cd -.",
            starterCode: `# Start at home
$ cd ~
$ pwd

# Navigate with absolute path
$ cd /var/log
$ pwd

# Navigate back with relative path
$ cd ../../home/$(whoami)
$ pwd

# Use cd - to toggle
$ cd /etc
$ cd -
$ pwd

# Navigate up the tree
$ cd /var/log/nginx
$ cd ../..
$ pwd`,
            solution: `$ cd ~ && pwd
/home/anuj

$ cd /var/log && pwd
/var/log

$ cd ../../home/$(whoami) && pwd
/home/anuj
# ../../ goes up to /var, then to /  — wait, this would be /home/anuj from /var/log:
# /var/log -> .. -> /var -> .. -> / -> home -> anuj ✓

$ cd /etc
$ cd -
/home/anuj    # cd - returns to previous directory
$ pwd
/home/anuj

$ cd /var/log/nginx
$ cd ../..    # nginx -> log -> var
$ pwd
/var`,
            explanation: "Absolute paths (/var/log) work identically from any location — they always start from /. Relative paths (../../home/anuj) are interpreted from your current directory. Each .. goes up one level in the tree. cd - is the most underused navigation shortcut — it swaps between your two most recent directories, like Alt+Tab for the filesystem. cd alone (no arguments) always takes you home. These navigation skills are muscle memory for Linux professionals — practice until they are automatic."
        },
        {
            id: "fsh_ex03",
            difficulty: "Easy",
            title: "Explore /etc Configuration Files",
            description: "Read key configuration files in /etc and understand what each controls.",
            starterCode: `# View the key /etc files
$ cat /etc/hostname
$ cat /etc/hosts
$ cat /etc/os-release | grep PRETTY_NAME
$ cat /etc/passwd | grep "^$(whoami)"
$ cat /etc/group | grep "^sudo"
$ cat /etc/shells`,
            solution: `$ cat /etc/hostname
prod-spark-01

$ cat /etc/hosts
127.0.0.1    localhost
127.0.1.1    prod-spark-01
10.0.0.5     kafka-broker-01
10.0.0.6     postgres-primary
# These override DNS — checked FIRST before any DNS lookup

$ cat /etc/os-release | grep PRETTY_NAME
PRETTY_NAME="Ubuntu 22.04.3 LTS"

$ cat /etc/passwd | grep "^anuj"
anuj:x:1000:1000:Anuj Kumar:/home/anuj:/bin/bash
#    ^ x = password in /etc/shadow
#         ^ UID   ^ GID  ^ GECOS     ^ home    ^ shell

$ cat /etc/group | grep "^sudo"
sudo:x:27:anuj,ubuntu
# anuj can use sudo!

$ cat /etc/shells
/bin/sh
/bin/bash
/usr/bin/bash
/usr/bin/zsh    # if installed
/usr/bin/fish   # if installed
# Valid login shells — only these can be set as user shells`,
            explanation: "/etc is entirely text files — no binary formats, no hidden settings. Every program that needs system-wide configuration reads from here. /etc/hosts is historically interesting: it predates DNS and was the ONLY way hostnames were resolved. Today it still takes priority, making it useful for adding cluster hostnames in a data platform (kafka-broker-01, spark-master). The /etc/passwd format: username:password_placeholder:UID:GID:description:home:shell — the 'x' in the password field means the real hash is in /etc/shadow, which only root can read. This separation of auth data from identity data is a security design."
        },
        {
            id: "fsh_ex04",
            difficulty: "Easy",
            title: "Understand Home Directory Structure",
            description: "Explore the hidden dotfiles in your home directory and understand what each one does.",
            starterCode: `# See all files including hidden ones
$ ls -la ~

# Which dotfiles exist?
$ ls -la ~ | grep "^\."

# View your shell config
$ cat ~/.bashrc | head -30

# Check SSH directory permissions (must be 700)
$ ls -la ~/.ssh/ 2>/dev/null || echo "No .ssh directory yet"

# Where does bash history go?
$ tail -10 ~/.bash_history`,
            solution: `$ ls -la ~
drwxr-x--- anuj anuj  .                  # home dir: mode 750
drwxr-xr-x root root  ..                 # /home: root owned
-rw------- anuj anuj  .bash_history      # all your commands
-rw-r--r-- anuj anuj  .bashrc            # interactive shell config
-rw-r--r-- anuj anuj  .profile           # login shell config
drwx------ anuj anuj  .ssh/              # SSH keys: 700 (private!)
drwxrwxr-x anuj anuj  .local/            # user app data
drwxrwxr-x anuj anuj  .config/           # user app config
drwxrwxr-x anuj anuj  projects/          # your work

$ cat ~/.bashrc | head -20
# shell options
# PS1 prompt definition
# aliases: ll='ls -la', gs='git status'
# PATH additions: ~/.local/bin, /opt/spark/bin

$ ls -la ~/.ssh/
drwx------ anuj anuj .ssh          # 700 — correct!
-rw------- anuj anuj id_rsa        # 600 — private key (must be 600)
-rw-r--r-- anuj anuj id_rsa.pub    # 644 — public key (ok to share)
-rw------- anuj anuj authorized_keys
-rw-r--r-- anuj anuj known_hosts

$ tail -5 ~/.bash_history
cat /etc/hosts
df -h
ls -la ~
cd /var/log
grep error /var/log/syslog | tail -20`,
            explanation: "Dotfiles (hidden files starting with .) store per-user application configuration. .bashrc is loaded for every new interactive terminal — your aliases and PATH additions go here. .profile is loaded once at login — heavier environment setup goes here. .ssh must be chmod 700 (only you can read/write/enter) and id_rsa must be chmod 600 (only you can read/write). SSH will refuse to work if permissions are too open — 'UNPROTECTED PRIVATE KEY FILE' error. .bash_history is a security artifact — it stores every command you've run. On a shared server, clear sensitive commands: history -d $(history 1 | awk '{print $1}')."
        },
        {
            id: "fsh_ex05",
            difficulty: "Easy",
            title: "Explore /var/log — The Log Directory",
            description: "Navigate the log directory, identify the key log files, and understand log rotation.",
            starterCode: `# What log files exist?
$ ls /var/log/

# How much space are logs using?
$ du -sh /var/log/

# Find the largest log files
$ find /var/log -name "*.log" -type f 2>/dev/null | xargs ls -lh 2>/dev/null | sort -k5 -rh | head -5

# View recent system events
$ sudo tail -20 /var/log/syslog

# Check auth log for recent logins
$ sudo tail -20 /var/log/auth.log | grep -i "accepted\|failed\|sudo"

# Check log rotation config
$ cat /etc/logrotate.d/rsyslog`,
            solution: `$ ls /var/log/
alternatives.log  auth.log    boot.log     cloud-init.log
dpkg.log          faillog     journal/     kern.log
landscape/        lastlog     nginx/       postgresql/
syslog            syslog.1    syslog.2.gz  syslog.3.gz
wtmp

$ du -sh /var/log/
4.1G

$ find /var/log -name "*.log" | xargs ls -lh 2>/dev/null | sort -k5 -rh | head -3
-rw-r----- root adm  2.1G /var/log/syslog
-rw-r--r-- root root 800M /var/log/nginx/access.log
-rw-r----- root adm  142M /var/log/kern.log

$ sudo tail -5 /var/log/syslog
Mar 09 10:47:32 prod-01 kernel: EXT4-fs (sda1): mounted filesystem
Mar 09 10:47:45 prod-01 systemd[1]: Started Session 14 of user anuj
Mar 09 10:47:52 prod-01 sshd[4521]: Accepted publickey for anuj

$ sudo tail -5 /var/log/auth.log | grep "accepted\|failed\|sudo"
Mar 09 10:47:52 sshd[4521]: Accepted publickey for anuj from 1.2.3.4
Mar 09 10:48:12 sudo: anuj : TTY=pts/0 ; COMMAND=/bin/cat /etc/shadow

$ cat /etc/logrotate.d/rsyslog
/var/log/syslog {
    daily           # rotate every day
    rotate 7        # keep 7 rotations (7 days)
    compress        # gzip old files
    postrotate
        kill -HUP $(cat /run/rsyslogd.pid)
    endscript
}`,
            explanation: "Log rotation is critical to preventing /var/log from filling the disk. logrotate runs daily via cron and moves syslog to syslog.1, compresses older ones to .gz (syslog.2.gz), and deletes beyond the rotation count. Without it, syslog would grow indefinitely. Key logs: syslog (all system events), auth.log (all SSH logins and sudo usage — your security audit trail), kern.log (kernel messages including OOM killer and disk errors), nginx/access.log (every HTTP request). journal/ contains the systemd binary journal — use journalctl to read it, not cat. Regularly check du -sh /var/log to catch runaway loggers before they fill the disk."
        },
        {
            id: "fsh_ex06",
            difficulty: "Medium",
            title: "Read /proc — Live Kernel Data",
            description: "Use /proc to extract live process information and kernel state without any special tools.",
            starterCode: `# Find your shell's PID
$ echo $$

# Examine your own process through /proc
$ ls /proc/$$
$ cat /proc/$$/cmdline | tr '\0' ' '
$ cat /proc/$$/status | grep -E "Name:|Pid:|PPid:|VmRSS:|Threads:"
$ ls /proc/$$/fd | wc -l

# Examine a running service (find its PID first)
$ pgrep sshd | head -1
$ cat /proc/$(pgrep sshd | head -1)/cmdline | tr '\0' ' '

# Kernel-wide info
$ cat /proc/loadavg
$ cat /proc/uptime | awk '{printf "Uptime: %.0f hours\n", $1/3600}'
$ wc -l /proc/*/cmdline 2>/dev/null | tail -1`,
            solution: `$ echo $$
4892    # your shell's PID

$ ls /proc/4892/
cmdline  cwd  environ  exe  fd/  maps  mem  ns/
net/     smaps  stat  status  wchan

$ cat /proc/4892/cmdline | tr '\0' ' '
-bash     # this is the bash shell process

$ cat /proc/4892/status | grep -E "Name:|Pid:|PPid:|VmRSS:|Threads:"
Name:   bash
Pid:    4892
PPid:   4891        # parent process (your SSH session)
VmRSS:  6144 kB    # 6MB of physical RAM in use
Threads: 1

$ ls /proc/4892/fd | wc -l
4     # stdin(0), stdout(1), stderr(2), one more

$ pgrep sshd | head -1
1423
$ cat /proc/1423/cmdline | tr '\0' ' '
sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups

$ cat /proc/loadavg
2.45 1.87 1.24 4/247 3847
# 4 running / 247 total processes / last PID created = 3847

$ cat /proc/uptime | awk '{printf "Uptime: %.0f hours\n", $1/3600}'
Uptime: 240 hours    # 10 days

$ wc -l /proc/*/cmdline 2>/dev/null | tail -1
247 total    # 247 running processes — matches /proc/loadavg 4/247`,
            explanation: "/proc/self and /proc/PID are per-process windows into the kernel. cmdline shows the exact command as null-byte-separated tokens — tr '\0' ' ' makes it readable. status shows memory, threads, and the process hierarchy (Pid/PPid). fd/ contains symbolic links for every open file descriptor — counting them gives you what lsof would show. The data in /proc is LIVE — reading /proc/PID/stat polls the current CPU counters. All system monitoring tools (top, ps, htop, iostat) ultimately read from /proc. Understanding /proc means you can extract any metric even when specialized tools aren't installed."
        },
        {
            id: "fsh_ex07",
            difficulty: "Medium",
            title: "Understand and Use Symlinks",
            description: "Create, inspect, and understand symbolic links — including the version management pattern used in production.",
            starterCode: `# Create a directory structure to practice with
$ mkdir -p ~/symlink-lab/spark-3.4.0/bin
$ touch ~/symlink-lab/spark-3.4.0/bin/spark-submit
$ mkdir -p ~/symlink-lab/spark-3.5.0/bin
$ touch ~/symlink-lab/spark-3.5.0/bin/spark-submit

# Create a symlink pointing to the current version
$ ln -s ~/symlink-lab/spark-3.4.0 ~/symlink-lab/spark
$ ls -la ~/symlink-lab/

# What does the symlink resolve to?
$ readlink ~/symlink-lab/spark
$ readlink -f ~/symlink-lab/spark/bin/spark-submit  # fully resolved

# Simulate an upgrade — update symlink atomically
$ ln -sfn ~/symlink-lab/spark-3.5.0 ~/symlink-lab/spark
$ readlink ~/symlink-lab/spark  # now points to 3.5.0

# Check that /bin is itself a symlink
$ readlink /bin
$ readlink /lib`,
            solution: `$ mkdir -p ~/symlink-lab/spark-3.4.0/bin
$ touch ~/symlink-lab/spark-3.4.0/bin/spark-submit
$ mkdir -p ~/symlink-lab/spark-3.5.0/bin
$ touch ~/symlink-lab/spark-3.5.0/bin/spark-submit

$ ln -s ~/symlink-lab/spark-3.4.0 ~/symlink-lab/spark
$ ls -la ~/symlink-lab/
drwxrwxr-x anuj anuj spark-3.4.0/
drwxrwxr-x anuj anuj spark-3.5.0/
lrwxrwxrwx anuj anuj spark -> /home/anuj/symlink-lab/spark-3.4.0

$ readlink ~/symlink-lab/spark
/home/anuj/symlink-lab/spark-3.4.0

$ readlink -f ~/symlink-lab/spark/bin/spark-submit
/home/anuj/symlink-lab/spark-3.4.0/bin/spark-submit

# Upgrade: -s=symbolic -f=force (overwrite) -n=no-deref (treat target as file)
$ ln -sfn ~/symlink-lab/spark-3.5.0 ~/symlink-lab/spark
$ readlink ~/symlink-lab/spark
/home/anuj/symlink-lab/spark-3.5.0

# Anything using ~/symlink-lab/spark now uses 3.5.0 instantly!
# No config changes needed, no restart required.

$ readlink /bin
usr/bin     # relative symlink

$ readlink /lib
usr/lib`,
            explanation: "The symlink version management pattern is used by Spark, Kafka, Python pyenv, nvm for Node.js, and many other tools. Keep all versions installed (/opt/spark-3.4.0, /opt/spark-3.5.0) and point a symlink at the current one (/opt/spark -> /opt/spark-3.5.0). Upgrading means: install new version, update one symlink. Rollback means: point symlink back to old version. All scripts referencing /opt/spark get the update instantly. ln -sfn: -s=symlink, -f=force (overwrite existing), -n=treat symlink target as file not directory (critical when the target is a directory). readlink -f resolves ALL symlinks in a path to get the absolute real path."
        },
        {
            id: "fsh_ex08",
            difficulty: "Medium",
            title: "Track Down Disk Usage in /var",
            description: "Diagnose what is consuming disk space in /var — the most common source of 'disk full' incidents.",
            starterCode: `# Simulate a disk investigation
$ du -sh /var/* 2>/dev/null | sort -rh | head -8

# Drill into the biggest directory
$ du -sh /var/log/* 2>/dev/null | sort -rh | head -5

# Find files over 100MB in /var/log
$ find /var/log -type f -size +100M 2>/dev/null | xargs ls -lh 2>/dev/null

# Check how old the large log files are
$ find /var/log -type f -size +50M -printf "%TY-%Tm-%Td %f %s\n" 2>/dev/null | sort

# Check if logrotate is working (compressed files exist?)
$ ls /var/log/*.gz 2>/dev/null | head -5
$ ls /var/log/syslog* 2>/dev/null`,
            solution: `$ du -sh /var/* 2>/dev/null | sort -rh | head -5
8.2G    /var/lib
4.1G    /var/log     # investigate this!
1.4G    /var/cache
240M    /var/lib/docker

$ du -sh /var/log/* 2>/dev/null | sort -rh | head -5
2.1G    /var/log/syslog            # PROBLEM: unrotated syslog!
800M    /var/log/nginx
142M    /var/log/kern.log
 48M    /var/log/journal           # systemd journal
 12M    /var/log/auth.log

$ find /var/log -type f -size +100M 2>/dev/null | xargs ls -lh
-rw-r----- root adm  2.1G Mar 09 /var/log/syslog
-rw-r--r-- www-data   800M Mar 09 /var/log/nginx/access.log

$ ls /var/log/syslog*
/var/log/syslog      # current (2.1GB — logrotate should have caught this!)
/var/log/syslog.1    # yesterday's
/var/log/syslog.2.gz # 2 days ago, compressed
/var/log/syslog.3.gz
/var/log/syslog.4.gz
/var/log/syslog.5.gz
/var/log/syslog.6.gz

# Immediate fix — empty without deleting (safe for running processes):
$ sudo truncate -s 0 /var/log/syslog
# Reclaimed 2.1GB instantly

# Check if logrotate was failing:
$ sudo logrotate --debug /etc/logrotate.conf 2>&1 | head -10`,
            explanation: "The disk investigation workflow applies everywhere: df -h shows which partition is full, du -sh /partition/* | sort -rh drills into it, find locates the specific large files. /var/log is the most common culprit. syslog growing to 2+ GB usually means: a service is logging at DEBUG level in production, a script is in an infinite loop logging errors, or logrotate is misconfigured. truncate -s 0 filename empties the file immediately without deleting it — important because a running logger keeps the file open by inode, and deletion would not free disk space until the process closes the file descriptor. Always truncate, never rm, a log file that a running process has open."
        },
        {
            id: "fsh_ex09",
            difficulty: "Medium",
            title: "Map Software to Its FHS Location",
            description: "Given a list of installed software, determine where each component lives and why.",
            starterCode: `# Find where key programs live
$ which python3 pip3 java spark-submit airflow git

# Find where configuration lives
$ ls /etc/ | grep -E "apt|ssh|cron|systemd|environment"

# Find where application data lives  
$ ls /var/lib/ | grep -E "postgresql|docker|apt|dpkg"

# Find where manually installed tools live
$ ls /usr/local/bin/ 2>/dev/null
$ ls /opt/ 2>/dev/null

# Find Python package locations
$ python3 -c "import sys; [print(p) for p in sys.path]"
$ pip3 show pandas | grep Location`,
            solution: `$ which python3 pip3 java spark-submit airflow git
/usr/bin/python3        # installed by apt
/usr/bin/pip3           # installed by apt
/usr/lib/jvm/java-11-openjdk-amd64/bin/java  # via alternatives
/usr/local/bin/spark-submit   # manually installed
/usr/local/bin/airflow        # manually installed (pip)
/usr/bin/git                  # installed by apt

$ ls /etc/ | grep -E "apt|ssh|cron|systemd|environment"
apt/            # apt sources and config
cron.d/         # system cron jobs
cron.daily/     # daily scripts
environment     # system-wide env vars
ssh/            # sshd config
systemd/        # systemd unit configs

$ ls /var/lib/ | grep -E "postgresql|docker|apt|dpkg"
apt/            # package index
docker/         # images, containers, volumes
dpkg/           # installed package records
postgresql/     # database files!

$ ls /usr/local/bin/
airflow  dbt  great-expectations  kubectl  spark-submit  terraform

$ ls /opt/
conda  kafka  spark  spark-3.5.0  spark-3.4.0

$ python3 -c "import sys; [print(p) for p in sys.path if p]"
/usr/lib/python310.zip
/usr/lib/python3.10
/usr/lib/python3/dist-packages    # system packages (apt-installed)
/home/anuj/.local/lib/python3.10  # --user installed
/home/anuj/.venv/lib/python3.10   # virtualenv (if active)

$ pip3 show pandas | grep Location
Location: /home/anuj/.venv/lib/python3.10/site-packages`,
            explanation: "The FHS pattern for software: apt-installed programs go to /usr/bin, config to /etc, data to /var/lib. Manually installed binaries go to /usr/local/bin (preferred for system-wide tools) or /opt/appname (for self-contained apps like Spark and Kafka). Python packages: system pip goes to /usr/lib/python3/dist-packages (avoid modifying), pip --user goes to ~/.local/lib, virtualenv is isolated to wherever you create it. Always use virtualenvs for Python projects. The difference between /usr/local/bin/airflow and /opt/spark: Airflow is just a Python script so it gets a single binary in /usr/local/bin; Spark is a complex multi-file application that needs its own directory tree, so it goes under /opt."
        },
        {
            id: "fsh_ex10",
            difficulty: "Medium",
            title: "Tune a Kernel Parameter via /proc/sys",
            description: "Read and write kernel parameters through /proc/sys — the sysctl interface to the running kernel.",
            starterCode: `# Read current swappiness
$ cat /proc/sys/vm/swappiness
$ sysctl vm.swappiness  # same thing, via sysctl

# Read current file-max
$ cat /proc/sys/fs/file-max
$ cat /proc/sys/fs/file-nr  # current open files / max

# Tune swappiness for data engineering (lower = avoid swap)
$ sudo sysctl -w vm.swappiness=10
$ cat /proc/sys/vm/swappiness  # confirm it changed

# Make it permanent
$ grep vm.swappiness /etc/sysctl.conf || echo "Not yet in sysctl.conf"
$ echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf
$ sudo sysctl -p  # reload from /etc/sysctl.conf

# View all current sysctl values (hundreds!)
$ sysctl -a 2>/dev/null | grep -E "swappiness|file-max|dirty_ratio"`,
            solution: `$ cat /proc/sys/vm/swappiness
60    # default — too aggressive for data engineering

$ sysctl vm.swappiness
vm.swappiness = 60   # same result

$ cat /proc/sys/fs/file-max
9223372036854775807   # effectively unlimited on modern Linux

$ cat /proc/sys/fs/file-nr
12480   0   9223372036854775807
# 12480 open files / 0 unused / max

$ sudo sysctl -w vm.swappiness=10
vm.swappiness = 10   # takes effect IMMEDIATELY

$ cat /proc/sys/vm/swappiness
10    # confirmed

$ grep vm.swappiness /etc/sysctl.conf
(no output — not there yet)

$ echo "vm.swappiness=10" | sudo tee -a /etc/sysctl.conf
vm.swappiness=10

$ sudo sysctl -p
vm.swappiness = 10   # loaded from /etc/sysctl.conf

$ sysctl -a 2>/dev/null | grep -E "swappiness|file-max|dirty_ratio"
vm.swappiness = 10
vm.dirty_ratio = 20           # up to 20% of RAM can hold dirty pages
vm.dirty_background_ratio = 5  # background write starts at 5%`,
            explanation: "Writing to /proc/sys changes a LIVE kernel parameter with zero restart required. This is why sysctl is so powerful for production tuning. vm.swappiness=10 means: the kernel will prefer keeping data in RAM rather than swapping to disk. Default is 60 (moderately aggressive). For Spark and Kafka, 10 is the standard production recommendation — a swapping Spark executor is catastrophically slow. vm.dirty_ratio and vm.dirty_background_ratio control how many modified (dirty) pages can accumulate before being written to disk — tuning these affects write performance. Changes via sysctl -w survive until reboot. For permanent settings, add to /etc/sysctl.conf and run sysctl -p."
        },
        {
            id: "fsh_ex11",
            difficulty: "Hard",
            title: "Set Up a Proper Software Installation Layout",
            description: "Install a hypothetical data tool following FHS conventions — binary, config, data, logs, symlinks — the way production systems do it.",
            starterCode: `# We are installing "myetl" version 1.2.0
# Following FHS best practices

# Step 1: Extract to /opt with versioned directory
$ sudo mkdir -p /opt/myetl-1.2.0/{bin,conf,lib,logs}
$ sudo touch /opt/myetl-1.2.0/bin/myetl
$ sudo chmod +x /opt/myetl-1.2.0/bin/myetl

# Step 2: Create the symlink for version management
$ sudo ln -s /opt/myetl-1.2.0 /opt/myetl

# Step 3: Link binary into /usr/local/bin
$ sudo ln -s /opt/myetl/bin/myetl /usr/local/bin/myetl

# Step 4: Config goes in /etc
$ sudo mkdir -p /etc/myetl
$ sudo touch /etc/myetl/myetl.conf

# Step 5: Variable data (logs) goes in /var
$ sudo mkdir -p /var/log/myetl
$ sudo mkdir -p /var/lib/myetl

# Step 6: Environment variable in /etc/environment
$ echo 'MYETL_HOME="/opt/myetl"' | sudo tee -a /etc/environment

# Verify the layout:
$ ls -la /opt/ | grep myetl
$ ls -la /usr/local/bin/ | grep myetl
$ readlink /usr/local/bin/myetl
$ readlink -f /usr/local/bin/myetl`,
            solution: `$ sudo mkdir -p /opt/myetl-1.2.0/{bin,conf,lib,logs}
$ sudo touch /opt/myetl-1.2.0/bin/myetl && sudo chmod +x $_

$ sudo ln -s /opt/myetl-1.2.0 /opt/myetl
$ sudo ln -s /opt/myetl/bin/myetl /usr/local/bin/myetl
$ sudo mkdir -p /etc/myetl && sudo touch /etc/myetl/myetl.conf
$ sudo mkdir -p /var/log/myetl /var/lib/myetl
$ echo 'MYETL_HOME="/opt/myetl"' | sudo tee -a /etc/environment

$ ls -la /opt/ | grep myetl
drwxr-xr-x  root root myetl-1.2.0/
lrwxrwxrwx  root root myetl -> /opt/myetl-1.2.0

$ ls -la /usr/local/bin/ | grep myetl
lrwxrwxrwx root root myetl -> /opt/myetl/bin/myetl

$ readlink /usr/local/bin/myetl
/opt/myetl/bin/myetl

$ readlink -f /usr/local/bin/myetl
/opt/myetl-1.2.0/bin/myetl    # fully resolved: symlink -> symlink -> file

# To upgrade to 1.3.0:
$ sudo mkdir -p /opt/myetl-1.3.0/{bin,conf,lib,logs}
$ sudo ln -sfn /opt/myetl-1.3.0 /opt/myetl
# /usr/local/bin/myetl now automatically points to 1.3.0!
# No change to the /usr/local/bin symlink needed.`,
            explanation: "This layout mirrors how Spark, Kafka, and Elasticsearch are professionally installed. The double-symlink chain (/usr/local/bin/myetl -> /opt/myetl/bin/myetl -> /opt/myetl-1.2.0/bin/myetl) is intentional: users just run myetl and the PATH finds /usr/local/bin/myetl. The version symlink (/opt/myetl) provides upgrade atomicity — during ln -sfn, the old symlink resolves until the exact moment it's replaced. Config in /etc/myetl follows convention and survives upgrades. Logs in /var/log/myetl can be managed by logrotate. State in /var/lib/myetl persists across upgrades. MYETL_HOME in /etc/environment is available to all users and services. This is not over-engineering — it is the layout that makes operations sustainable."
        },
        {
            id: "fsh_ex12",
            difficulty: "Hard",
            title: "Diagnose a Misconfigured /etc/fstab",
            description: "Read and understand fstab entries — the wrong entry here prevents the server from booting.",
            starterCode: `# Read the current fstab
$ cat /etc/fstab

# Check what is currently mounted
$ cat /proc/mounts | grep -v "proc\|sys\|tmpfs\|devtmpfs" | head -8

# Compare fstab to actual mounts
$ mount | grep -v "proc\|sys\|tmpfs\|devtmpfs\|cgroup" | head -8

# Check UUIDs match actual disk UUIDs
$ sudo blkid | grep -E "UUID|TYPE"

# Test if fstab is valid WITHOUT rebooting (dry run)
$ sudo mount -a --dry-run 2>&1 || echo "fstab has errors!"

# Find a common mistake: wrong UUID
# (Demonstrate what a bad entry looks like)
$ grep -n "" /etc/fstab`,
            solution: `$ cat /etc/fstab
UUID=a1b2c3d4-e5f6-7890-abcd /       ext4  defaults           0 1
UUID=f6e5d4c3-b2a1-0987-fedc none    swap  sw                 0 0
UUID=9876fedc-ba98-7654-3210 /data   xfs   defaults,noatime   0 2
# /dev/sdb2  /backup  ext4  defaults  0 2   (commented out — disk removed)

$ cat /proc/mounts | grep -vE "proc|sys|tmpfs|devtmpfs" | head -4
/dev/sda1 / ext4 rw,relatime 0 0
/dev/sda2 none swap sw 0 0
/dev/sdb1 /data xfs rw,noatime 0 0

$ sudo blkid | grep UUID
/dev/sda1: UUID="a1b2c3d4-e5f6-7890-abcd" TYPE="ext4"  ✓ matches fstab
/dev/sda2: UUID="f6e5d4c3-b2a1-0987-fedc" TYPE="swap"  ✓ matches fstab
/dev/sdb1: UUID="9876fedc-ba98-7654-3210" TYPE="xfs"   ✓ matches fstab

# If a UUID in fstab doesn't match blkid output, mount -a will fail
# and the system may hang on boot waiting for a non-existent device.

$ sudo mount -a --dry-run 2>&1
(no output = fstab is valid)

$ grep -n "" /etc/fstab
1: UUID=a1b2c3d4  /     ext4  defaults         0 1
2: UUID=f6e5d4c3  none  swap  sw               0 0
3: UUID=9876fedc  /data xfs   defaults,noatime 0 2
# Column 5: dump (0=skip, 1=include)
# Column 6: fsck order (0=skip, 1=root first, 2=after root)`,
            explanation: "fstab (filesystem table) is the most boot-critical configuration file. Every error here is tested at boot time. Always use UUID= not /dev/sdaX — device names can change between boots (sda can become sdb if you add a disk), but UUIDs are permanent. The noatime mount option for /data is a production best practice — without it, every file READ updates the access time (atime), causing a disk write for every read, which kills read performance on data-intensive workloads. sudo mount -a tests all fstab entries without rebooting — always run this after editing fstab. Column 6 (fsck order): 0=never check, 1=check first (root), 2=check after root. Swap should always be 0."
        },
        {
            id: "fsh_ex13",
            difficulty: "Hard",
            title: "Write a Filesystem Health Check Script",
            description: "Build a script that validates filesystem layout, checks for common problems, and reports findings.",
            starterCode: `cat > ~/fs_health.sh << 'SCRIPT'
#!/bin/bash
echo "=== FILESYSTEM HEALTH CHECK === $(date)"
ISSUES=0

# 1. Check if key directories exist and have correct types
for dir in /etc /var/log /tmp /home /opt /usr/local/bin; do
    if [ ! -d "$dir" ]; then
        echo "MISSING: $dir"
        ISSUES=$((ISSUES+1))
    fi
done

# 2. Check /tmp has sticky bit
TMP_PERMS=$(stat -c "%a" /tmp)
[[ "$TMP_PERMS" == *1777* ]] || echo "WARN: /tmp missing sticky bit (got $TMP_PERMS)"

# 3. Check .ssh permissions if it exists
if [ -d ~/.ssh ]; then
    SSH_PERM=$(stat -c "%a" ~/.ssh)
    KEY_PERM=$(stat -c "%a" ~/.ssh/id_rsa 2>/dev/null)
    [ "$SSH_PERM" != "700" ] && echo "WARN: ~/.ssh permissions are $SSH_PERM (should be 700)"
    [ -n "$KEY_PERM" ] && [ "$KEY_PERM" != "600" ] && echo "WARN: id_rsa permissions are $KEY_PERM (should be 600)"
fi

# 4. Check for disk usage warnings
df -h | grep -vE "tmpfs|udev|Filesystem" | while read fs size used avail pct mount; do
    PCT=\${pct%%%}
    [ "$PCT" -gt 85 ] && echo "WARN: $mount at $pct full" && ISSUES=$((ISSUES+1))
done

# 5. Check /var/log size
LOG_GB=$(du -sg /var/log 2>/dev/null | awk '{print $1}')
[ "$LOG_GB" -gt 5 ] && echo "WARN: /var/log is \${LOG_GB}GB — consider log rotation"

# 6. Check for broken symlinks in /usr/local/bin
for link in /usr/local/bin/*; do
    [ -L "$link" ] && [ ! -e "$link" ] && echo "BROKEN SYMLINK: $link"
done

[ "$ISSUES" -eq 0 ] && echo "OK: Filesystem health looks good" || echo "ISSUES: $ISSUES found"
SCRIPT
chmod +x ~/fs_health.sh && bash ~/fs_health.sh`,
            solution: `$ bash ~/fs_health.sh

=== FILESYSTEM HEALTH CHECK === Sat Mar 09 10:47:32 UTC 2024

# Healthy output:
OK: Filesystem health looks good

# Output with issues:
WARN: /tmp missing sticky bit (got 777)       # security problem
WARN: ~/.ssh permissions are 755 (should be 700)  # security problem
WARN: ~/.ssh/id_rsa permissions are 644       # SSH will refuse to work!
WARN: / at 91% full                           # disk space problem
WARN: /var/log is 8GB — consider log rotation
BROKEN SYMLINK: /usr/local/bin/dbt            # dbt was removed but link remains

# Fix SSH permissions:
$ chmod 700 ~/.ssh
$ chmod 600 ~/.ssh/id_rsa

# Fix broken symlink:
$ sudo rm /usr/local/bin/dbt

# Fix /tmp sticky bit:
$ sudo chmod 1777 /tmp`,
            explanation: "The health check script demonstrates systematic filesystem validation. The sticky bit check on /tmp: stat -c '%a' prints octal permissions; 1777 has the sticky bit set. The stat format %a gives the octal numeric permissions, %A gives the rwxrwxrwt string. SSH is ruthlessly strict about permissions: ~/.ssh must be 700, private keys must be 600. Even 644 on a key causes 'Permissions too open' and SSH refuses to use it. Broken symlinks in /usr/local/bin cause confusing 'command not found' errors — find -type l -xtype l finds them. The disk check uses the same approach as health_check.sh from the system info module — these scripts compose naturally into a comprehensive server audit."
        },
        {
            id: "fsh_ex14",
            difficulty: "Hard",
            title: "Find a File Without Knowing Where It Is",
            description: "Use find, locate, which, whereis, and type to track down any file in the filesystem.",
            starterCode: `# find — search by any attribute
$ find /etc -name "*.conf" -type f | head -8
$ find /var/log -name "*.log" -newer /var/log/syslog.1 -type f
$ find / -name "spark-submit" -type f 2>/dev/null
$ find / -name "requirements*.txt" -path "*/projects/*" 2>/dev/null | head -5

# locate — fast database-backed search
$ locate spark-submit 2>/dev/null | head -5
$ locate -i "*.parquet" 2>/dev/null | head -5  # case-insensitive

# which / whereis / type — for commands
$ which python3
$ whereis python3
$ type python3
$ type ll   # finds aliases too!`,
            solution: `$ find /etc -name "*.conf" -type f | head -5
/etc/ca-certificates.conf
/etc/logrotate.conf
/etc/ssh/sshd_config
/etc/apt/apt.conf
/etc/sysctl.conf

$ find /var/log -name "*.log" -newer /var/log/syslog.1 -type f
/var/log/nginx/access.log    # modified more recently than syslog.1
/var/log/auth.log

$ find / -name "spark-submit" -type f 2>/dev/null
/opt/spark-3.5.0/bin/spark-submit    # the actual file
/opt/spark-3.4.0/bin/spark-submit

$ find / -name "requirements*.txt" -path "*/projects/*" 2>/dev/null | head -3
/home/anuj/projects/pipeline/requirements.txt
/home/anuj/projects/api/requirements-dev.txt

# locate needs updatedb to have run:
$ locate spark-submit 2>/dev/null | head -3
/opt/spark-3.5.0/bin/spark-submit
/usr/local/bin/spark-submit    # the symlink

$ which python3
/usr/bin/python3    # first match in PATH

$ whereis python3
python3: /usr/bin/python3 /usr/lib/python3 /etc/python3 /usr/share/man/man1/python3.1.gz
# whereis finds: binary, libraries, config, manpage

$ type python3
python3 is /usr/bin/python3

$ type ll
ll is aliased to 'ls -la'    # type reveals aliases, not just files!`,
            explanation: "find is the nuclear option — it searches everything but is comprehensive and slow on large filesystems. Key predicates: -name (filename), -type f (file), -type l (symlink), -size +100M (over 100MB), -newer file (modified more recently than), -path (path pattern), -mtime -7 (modified in last 7 days). The 2>/dev/null suppresses permission errors for directories you cannot read. locate uses a pre-built index (updated by updatedb, usually via nightly cron) — very fast but may be stale. which only searches PATH and returns the first match. whereis searches standard locations and finds man pages. type resolves aliases too, making it the most honest answer to 'what does this command actually do?'"
        },
        {
            id: "fsh_ex15",
            difficulty: "Hard",
            title: "Understand Mount Points and df Output",
            description: "Understand how mount points work and interpret df output — including the difference between on-disk and tmpfs filesystems.",
            starterCode: `# See all mounted filesystems
$ cat /proc/mounts
$ mount | grep -vE "cgroup|proc|sys|devtmpfs" | head -10

# Understand tmpfs (RAM-based filesystems)
$ df -h | grep tmpfs
$ cat /proc/mounts | grep tmpfs

# Why does /tmp appear on df with a size if it's "in RAM"?
$ df -h /tmp
$ mount | grep "/tmp"

# Mount an additional disk or partition (requires root)
$ sudo mkdir -p /mnt/testdisk
$ sudo mount /dev/sdb1 /mnt/testdisk
$ df -h /mnt/testdisk
$ cat /proc/mounts | grep testdisk
$ sudo umount /mnt/testdisk

# See the filesystem type of each mount
$ df -T | head -10`,
            solution: `$ mount | grep -vE "cgroup|proc|sys|devtmpfs" | head -8
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
/dev/sda1 on / type ext4 (rw,relatime)
tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev)
/dev/sdb1 on /data type xfs (rw,noatime)
tmpfs on /run type tmpfs (rw,nosuid,nodev,size=1638400k)
tmpfs on /tmp type tmpfs (rw,nosuid,nodev)    # /tmp is tmpfs!

$ df -h | grep tmpfs
tmpfs      7.7G    0   7.7G   0% /dev/shm
tmpfs      1.6G  2.4M  1.6G   1% /run
tmpfs      7.7G  234M  7.5G   3% /tmp
tmpfs      1.6G    0   1.6G   0% /run/user/1000

# /tmp is tmpfs (RAM-backed) with a size limit
$ df -h /tmp
Filesystem  Size  Used  Avail  Use%  Mounted on
tmpfs       7.7G  234M  7.5G     3%  /tmp
# 7.7G = half of 15GB RAM reserved for /tmp
# If you fill it up, you get "disk full" but RAM is the limit!

# After mounting /dev/sdb1:
$ df -h /mnt/testdisk
Filesystem  Size  Used  Avail  Use%  Mounted on
/dev/sdb1   2.0T  800G  1.2T   40%  /mnt/testdisk

$ cat /proc/mounts | grep testdisk
/dev/sdb1 /mnt/testdisk xfs rw,noatime 0 0

$ df -T | head -8
Filesystem  Type    Size  Used  Avail  Use%  Mounted on
/dev/sda1   ext4     49G   22G    25G   47%  /
/dev/sdb1   xfs     2.0T  800G  1.2T   40%  /data
tmpfs       tmpfs   7.7G  234M  7.5G    3%  /tmp`,
            explanation: "Mount points are how Linux unifies everything into one tree. When /dev/sdb1 is mounted at /data, it appears as a directory — but df reveals it's actually a separate filesystem on a separate disk. tmpfs is a RAM-backed filesystem — no disk I/O, but files disappear on reboot and count against RAM. /tmp being tmpfs explains two behaviors: (1) /tmp files are very fast to write, and (2) you can run out of /tmp space even with free disk, because it's consuming RAM. The mount options matter: rw (read-write), noatime (don't update access time on reads — huge performance gain), nosuid (setuid bit is ignored — security), noexec (can't run programs from this filesystem — security for /tmp). Check df -T to see filesystem types."
        },
        {
            id: "fsh_ex16",
            difficulty: "Hard",
            title: "Investigate a Process Through /proc",
            description: "Use /proc to get a complete picture of a running process without installing any tools.",
            starterCode: `# Pick a running process — let's use your bash shell
PID=$$

# Complete process investigation using only /proc
echo "=== Process: $PID ==="
echo "Command: $(cat /proc/$PID/cmdline | tr '\0' ' ')"
echo "Status:"
cat /proc/$PID/status | grep -E "Name:|State:|Pid:|PPid:|Threads:|VmRSS:|VmVirt:"

echo "Open file descriptors: $(ls /proc/$PID/fd 2>/dev/null | wc -l)"
echo "Open files:"
ls -la /proc/$PID/fd 2>/dev/null | awk 'NR>1 {print $NF}' | head -5

echo "Working directory:"
readlink /proc/$PID/cwd

echo "Executable:"
readlink /proc/$PID/exe

echo "Environment (first 5 vars):"
cat /proc/$PID/environ | tr '\0' '\n' | head -5`,
            solution: `PID=4892  # bash shell

=== Process: 4892 ===

Command: -bash

Status:
Name:   bash
State:  S (sleeping)      # S=sleeping, R=running, Z=zombie, D=disk-wait
Pid:    4892
PPid:   4891              # parent: sshd process that spawned this shell
Threads: 1
VmRSS:  6144 kB           # 6MB physical RAM in use
VmVirt: 16384 kB          # 16MB virtual address space (much larger than RSS)

Open file descriptors: 4

Open files:
/dev/pts/0 -> 0 (stdin: terminal)
/dev/pts/0 -> 1 (stdout: terminal)
/dev/pts/0 -> 2 (stderr: terminal)
/dev/pts/0 -> 255 (bash internal fd)

Working directory:
/home/anuj     # where the shell is currently cd'd to

Executable:
/usr/bin/bash  # the actual binary running

Environment (first 5 vars):
HOME=/home/anuj
TERM=xterm-256color
USER=anuj
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin`,
            explanation: "Every attribute of a running process is exposed through /proc/PID. Status fields: VmRSS is physical RAM actually loaded (resident set size), VmVirt is virtual address space mapped (includes memory-mapped files and swap — often much larger). Process states: S=sleeping (waiting, not consuming CPU), R=running (on CPU right now), D=uninterruptible disk wait (blocked on I/O), Z=zombie (exited but parent has not reaped it). PPid shows the process hierarchy — from a bash shell you can trace up: bash -> sshd -> sshd (master) -> systemd. The environ file contains all environment variables as null-separated strings — tr '\0' '\n' makes them readable. readlink /proc/PID/cwd is how lsof and ps know the working directory of each process."
        },
        {
            id: "fsh_ex17",
            difficulty: "Hard",
            title: "Set Up Data Engineering Directory Structure",
            description: "Create the proper FHS-compliant directory layout for a data engineering project on a fresh server.",
            starterCode: `# MISSION: Set up a production data engineering server layout
# following FHS conventions and best practices

# Application: Spark + Airflow + PostgreSQL pipeline
# Server: data-pipeline-01

# Step 1: Application installations (already done by apt/manual)
# /opt/spark -> /opt/spark-3.5.0    (already exists)
# /usr/local/bin/airflow             (already exists)
# /var/lib/postgresql                (managed by postgresql package)

# Step 2: Create pipeline-specific directories
sudo mkdir -p /data/{raw,staging,processed,archive}
sudo mkdir -p /var/log/{spark,airflow,pipeline}
sudo mkdir -p /etc/pipeline
sudo mkdir -p /var/lib/pipeline/{checkpoints,state}
sudo mkdir -p /tmp/spark-scratch

# Step 3: Set ownership (airflow user owns airflow dirs)
sudo chown -R airflow:airflow /var/log/airflow
sudo chown -R anuj:anuj /data /var/log/{spark,pipeline}
sudo chown -R postgres:postgres /var/lib/postgresql

# Step 4: Set permissions
sudo chmod 755 /data/raw /data/staging /data/processed
sudo chmod 700 /data/archive
sudo chmod 1777 /tmp/spark-scratch  # sticky bit for multi-user scratch

# Step 5: Document in /etc/environment
echo 'DATA_ROOT="/data"' | sudo tee -a /etc/environment
echo 'PIPELINE_LOG="/var/log/pipeline"' | sudo tee -a /etc/environment

# Step 6: Add to /etc/fstab if /data is a separate disk
echo "UUID=9876fedc  /data  xfs  defaults,noatime  0 2" | sudo tee -a /etc/fstab

# Verify
ls -la /data/ /var/log/ /etc/pipeline /var/lib/pipeline`,
            solution: `$ ls -la /data/
drwxr-xr-x anuj     anuj     raw/        # 755: everyone can read
drwxr-xr-x anuj     anuj     staging/
drwxr-xr-x anuj     anuj     processed/
drwx------ anuj     anuj     archive/    # 700: only owner reads

$ ls -la /var/log/ | grep -E "spark|airflow|pipeline"
drwxr-xr-x anuj    anuj    spark/
drwxr-xr-x airflow airflow airflow/    # airflow owns its own logs
drwxr-xr-x anuj    anuj    pipeline/

$ ls -la /tmp/spark-scratch
drwxrwxrwt root root /tmp/spark-scratch  # 1777: sticky bit set

$ cat /etc/environment | tail -3
JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"
DATA_ROOT="/data"
PIPELINE_LOG="/var/log/pipeline"

$ cat /etc/fstab | tail -1
UUID=9876fedc  /data  xfs  defaults,noatime  0 2

# Complete layout follows FHS:
# Programs:     /opt/spark, /usr/local/bin/airflow (installed)
# Config:       /etc/pipeline, /etc/airflow (installed)
# Data:         /data/* (new, on separate XFS disk)
# Logs:         /var/log/{spark,airflow,pipeline}
# State:        /var/lib/pipeline, /var/lib/postgresql
# Scratch:      /tmp/spark-scratch (world-writable + sticky)`,
            explanation: "This layout reflects real production setup. /data on a separate XFS disk with noatime: XFS handles large files and high-throughput I/O better than ext4 for data workloads; noatime eliminates the atime write-on-read overhead (critical when Spark reads millions of Parquet files). Archive at 700 prevents accidental deletion by other team members. Sticky bit on /tmp/spark-scratch: Spark workers run as different users; without sticky bit, one worker could delete another's shuffle files. Service-specific log directories with service ownership: airflow running as the airflow user can only write to /var/log/airflow, not /var/log/spark — least-privilege principle. DATA_ROOT in /etc/environment: all services and cron jobs see this variable without each needing their own config."
        },
        {
            id: "fsh_ex18",
            difficulty: "Hard",
            title: "Audit the Filesystem for Security Issues",
            description: "Find world-writable files, SUID/SGID binaries, and other security-relevant filesystem properties.",
            starterCode: `# Security audit of the filesystem

# 1. Find world-writable directories (anyone can write = security risk)
$ find / -maxdepth 4 -type d -perm -002 2>/dev/null | grep -v "^/proc\|^/sys\|^/dev" | head -10

# 2. Find SUID binaries (run as file owner, not caller — potential escalation vectors)
$ find /usr -type f -perm -4000 2>/dev/null  # setuid files
$ find /usr -type f -perm -2000 2>/dev/null  # setgid files

# 3. Find files not owned by any user (orphaned files)
$ find /home -nouser -o -nogroup 2>/dev/null | head -5

# 4. Check if /tmp has correct sticky bit
$ stat /tmp | grep "Access:"

# 5. Find recently modified files in /etc (potential unauthorized change)
$ find /etc -newer /etc/passwd -type f 2>/dev/null | head -10

# 6. Check SSH config security
$ sudo grep -E "PermitRootLogin|PasswordAuthentication|PubkeyAuthentication" /etc/ssh/sshd_config`,
            solution: `# 1. World-writable directories (should be minimal)
$ find / -maxdepth 4 -type d -perm -002 2>/dev/null | grep -v "proc\|sys\|dev"
/tmp                          # OK — has sticky bit
/var/tmp                      # OK — has sticky bit
/tmp/spark-scratch            # OK — created intentionally with sticky bit
/home/anuj/uploads            # CHECK! Was this intentional?

# 2. SUID binaries (legitimate ones)
$ find /usr -type f -perm -4000 2>/dev/null
/usr/bin/sudo          # SUID: runs as root (expected)
/usr/bin/passwd        # SUID: needs to write /etc/shadow (expected)
/usr/bin/ping          # SUID: needs raw socket (expected)
/usr/bin/pkexec        # SUID: polkit (expected)
/usr/bin/newgrp        # SUID: group management (expected)

# Unknown SUID binaries are red flags — investigate any unexpected entries

# 3. Orphaned files (deleted user left files behind)
$ find /home -nouser 2>/dev/null
/home/olduser/          # user was deleted but home dir remains

# 4. /tmp sticky bit
$ stat /tmp | grep "Access:"
Access: (1777/drwxrwxrwt)  # 1777 = sticky bit set. Correct!

# 5. Recently modified /etc files
$ find /etc -newer /etc/passwd -type f 2>/dev/null | head -5
/etc/environment        # modified today — we added DATA_ROOT
/etc/fstab              # modified today — we added /data mount

# 6. SSH security settings
$ sudo grep -E "PermitRootLogin|PasswordAuthentication|PubkeyAuthentication" /etc/ssh/sshd_config
PermitRootLogin no             # root cannot SSH in directly — correct!
PasswordAuthentication no      # passwords disabled, keys only — correct!
PubkeyAuthentication yes       # key auth enabled — correct!`,
            explanation: "SUID (setuid) binaries run with the file owner's privileges, not the caller's. sudo is SUID root — it temporarily runs as root to check sudoers and execute commands. Unexpected SUID binaries are a common privilege escalation vector. Audit them regularly: the list should be small and well-understood. World-writable directories without sticky bits allow one user to delete another's files — only /tmp, /var/tmp, and intentionally shared scratch directories should be world-writable, and all should have the sticky bit (1777). PermitRootLogin no is fundamental SSH hardening — root has unlimited power, compromising root SSH is a total loss. PasswordAuthentication no forces key-based auth — eliminates brute-force password attacks. Always verify these settings after provisioning any server that will be reachable from the internet."
        },
        {
            id: "fsh_ex19",
            difficulty: "Hard",
            title: "FHS Forensics — What Changed on This Server?",
            description: "Use filesystem timestamps, find, and /var/log to reconstruct what happened to an unknown server.",
            starterCode: `# You just inherited a server. What happened here recently?

# 1. Recently modified files in key directories
$ find /etc -newer /var/log/dpkg.log -type f 2>/dev/null
$ find /opt -newer /var/log/dpkg.log -type f 2>/dev/null | head -5

# 2. Package installation history
$ grep " install " /var/log/dpkg.log | tail -10

# 3. Recent systemd service installations
$ find /etc/systemd/system -newer /etc/passwd -name "*.service" 2>/dev/null

# 4. When was each major directory last modified?
$ for dir in /etc /opt /var/log /home /usr/local; do
    echo "$(stat -c '%y' $dir | cut -d. -f1)  $dir"
done | sort

# 5. What files were recently added to /usr/local/bin?
$ find /usr/local/bin -newer /usr/bin/python3 -type f -o -type l 2>/dev/null

# 6. Check cron jobs — what's scheduled?
$ ls -la /var/spool/cron/crontabs/ 2>/dev/null
$ ls -la /etc/cron.d/`,
            solution: `# 1. Recently modified /etc files
$ find /etc -newer /var/log/dpkg.log -type f 2>/dev/null
/etc/environment          # someone added env vars
/etc/fstab                # filesystem table was edited
/etc/cron.d/pipeline-job  # new cron job added
/etc/ssh/sshd_config      # SSH config was changed!

# 2. Package history
$ grep " install " /var/log/dpkg.log | tail -5
2024-03-08 14:23 install postgresql-14
2024-03-08 15:10 install python3-kafka
2024-03-09 09:15 install dbt-core
2024-03-09 09:16 install great-expectations

# 3. New systemd services
$ find /etc/systemd/system -newer /etc/passwd -name "*.service"
/etc/systemd/system/airflow-scheduler.service   # airflow set up
/etc/systemd/system/pipeline-worker.service      # custom service added

# 4. Directory modification times
2024-02-28 08:00  /usr/local  # pre-existing tools
2024-03-08 14:23  /etc        # package installs modified it
2024-03-08 15:30  /opt        # spark or kafka updated
2024-03-09 09:15  /var/log    # recent log activity
2024-03-09 10:00  /home       # user activity today

# 5. Recently added to /usr/local/bin
$ find /usr/local/bin -newer /usr/bin/python3 -type f -o -type l 2>/dev/null
/usr/local/bin/airflow    # added recently
/usr/local/bin/dbt        # added recently
/usr/local/bin/kubectl    # added recently

# 6. Scheduled cron jobs
$ ls /var/spool/cron/crontabs/
anuj   root              # two users have crontabs

$ ls /etc/cron.d/
airflow   logrotate   pipeline-job   sysstat`,
            explanation: "Filesystem timestamps are a forensic record. Directory mtime changes when files inside it are created/deleted (but not modified). Using a reference file like /var/log/dpkg.log (updated on every apt install) to find -newer shows what changed since the last package install. This forensic technique is how you reconstruct 'what was done to this server' without documentation. The cron audit is especially important on inherited servers — previous engineers may have set up jobs that are still running years later with outdated credentials or logic. /var/log/dpkg.log is your most reliable changelog for apt-installed software; /var/log/auth.log shows who ran sudo and when; journalctl --since 'yesterday' shows all service activity."
        },
        {
            id: "fsh_ex20",
            difficulty: "Hard",
            title: "FHS Mental Model — Place Every File Correctly",
            description: "Given a set of files to deploy, decide the correct FHS location for each and explain why.",
            starterCode: `# CHALLENGE: Where should each of these live?
# Decide the correct FHS path for each file.

# 1. A new command-line tool "etl-runner" you compiled yourself
# 2. Its configuration file etl-runner.conf
# 3. Its log file etl-runner.log
# 4. A database it maintains (etl_state.db)
# 5. A script that backs up the database (backup-etl.sh)
# 6. SSL certificate for the API it exposes
# 7. A Python virtualenv for its dependencies
# 8. Cron job to run the backup daily at 2am
# 9. Temporary files it creates during processing
# 10. A reference dataset (cities.csv) it reads but never modifies

# For each, explain: WHERE and WHY`,
            solution: `# 1. etl-runner binary
/usr/local/bin/etl-runner
# Why: /usr/local/bin is the standard FHS location for locally installed
# commands not managed by the OS package manager. In PATH by default.

# 2. etl-runner.conf
/etc/etl-runner/etl-runner.conf
# Why: /etc is for all system configuration. Subdirectory for multi-file configs.
# Text file, readable by sysadmins, version-controllable.

# 3. etl-runner.log
/var/log/etl-runner/etl-runner.log
# Why: /var is for variable data that changes at runtime. Logs grow continuously.
# Separate directory so logrotate can target it: /etc/logrotate.d/etl-runner

# 4. etl_state.db (SQLite database)
/var/lib/etl-runner/etl_state.db
# Why: /var/lib is for application STATE that persists and changes.
# Not logs (doesn't go in /var/log), not config (doesn't go in /etc).

# 5. backup-etl.sh
/usr/local/sbin/backup-etl.sh   (if root-only)
/usr/local/bin/backup-etl.sh    (if any user can run it)
# Why: sbin for system admin scripts, bin for general scripts.
# NOT in /etc (that's for config, not executables).
# NOT in home dir (needs to be available system-wide).

# 6. SSL certificate
/etc/ssl/certs/etl-runner.crt    (certificate — world-readable OK)
/etc/ssl/private/etl-runner.key  (private key — chmod 600, root-owned!)
# Why: /etc/ssl is the standard certificate store.
# NEVER store private keys in /var, /tmp, or world-readable locations.

# 7. Python virtualenv
/opt/etl-runner/venv/            (if system-wide installation)
# OR
/home/anuj/.venvs/etl-runner/   (if user-specific)
# Why: self-contained Python environment belongs with the application in /opt,
# or in user home for per-user installs.

# 8. Cron job (2am daily backup)
/etc/cron.d/etl-runner-backup
# Contents: 0 2 * * * etl-runner /usr/local/sbin/backup-etl.sh
# Why: /etc/cron.d for system-level cron jobs (not user crontabs).
# crontab -e would put it in /var/spool/cron/crontabs/username — OK too.

# 9. Temporary processing files
/tmp/etl-runner-$$/ or /var/tmp/etl-runner/
# /tmp: if you need it gone after reboot (fast, in RAM)
# /var/tmp: if it needs to survive reboots (slower, on disk)
# NEVER /etc or /var/lib for temp files — they are for permanent state.

# 10. Reference dataset cities.csv (static, read-only)
/usr/share/etl-runner/cities.csv   (if installed system-wide via package)
# OR
/opt/etl-runner/data/cities.csv    (if part of self-contained /opt install)
# Why: /usr/share is for read-only data that is architecture-independent.
# /var would be wrong — /var is for files that CHANGE at runtime.`,
            explanation: "The FHS mental model: (1) Does it run? -> /usr/local/bin or /usr/local/sbin. (2) Does it configure? -> /etc/appname. (3) Does it grow/change at runtime? -> /var/lib (state) or /var/log (logs). (4) Is it self-contained? -> /opt/appname. (5) Is it temporary? -> /tmp or /var/tmp. (6) Is it static reference data? -> /usr/share/appname. (7) Is it a private key? -> /etc/ssl/private with chmod 600 and never in /tmp or world-readable paths. The test: if someone deleted your /var directory and you restored from backup, would the server work? Yes — because programs (/usr, /opt) and config (/etc) are separate from runtime data (/var). This separation is the entire point of FHS."
        }
    ],

    summary: `
<h3>📋 Chapter Summary: Filesystem Hierarchy</h3>

<div class="tip-box">
    <h4>✅ The FHS Mental Model — One Sentence Per Directory</h4>
    <p>
        <strong>/</strong> — Root of everything; one unified tree<br>
        <strong>/bin, /usr/bin</strong> — Programs every user runs<br>
        <strong>/sbin, /usr/sbin</strong> — Admin commands (need root)<br>
        <strong>/usr/local/bin</strong> — YOUR manually installed tools (not apt)<br>
        <strong>/etc</strong> — All system configuration, text files only<br>
        <strong>/home/user</strong> — User's personal space; ~/.bashrc, ~/.ssh, projects<br>
        <strong>/root</strong> — Root user's home (inaccessible to normal users)<br>
        <strong>/tmp</strong> — Temporary files; world-writable; cleared on reboot<br>
        <strong>/var/log</strong> — All logs; WATCH: fills up and causes disk-full incidents<br>
        <strong>/var/lib</strong> — Application state (PostgreSQL data, Docker images)<br>
        <strong>/var/cache</strong> — Cached downloads (apt packages) — safe to delete<br>
        <strong>/proc</strong> — Virtual: live kernel and process data (no disk storage)<br>
        <strong>/sys</strong> — Virtual: hardware and driver configuration<br>
        <strong>/dev</strong> — Device files: disks (/dev/sda), terminals (/dev/tty), /dev/null<br>
        <strong>/opt</strong> — Self-contained software packages (Spark, Kafka, Conda)<br>
        <strong>/mnt</strong> — Manual mount points for extra disks and network shares<br>
        <strong>/boot</strong> — Kernel (vmlinuz), initrd, GRUB — do not fill this up<br>
    </p>
</div>

<div class="info-box">
    <h4>📚 Next: File Operations (cp, mv, rm, mkdir, touch, chmod, chown)</h4>
    <p>With the filesystem hierarchy mastered, you know where everything lives and why. Next: the commands that create, copy, move, delete, and protect files — the hands-on daily operations you will use constantly.</p>
</div>
`

}; // end filesystemHierarchy