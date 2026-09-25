var linuxNavigation = {

    title: "Navigation — cd, pwd, ls",
    description: "Master the Linux filesystem from root to leaf — every path, every flag, every shortcut, every real-world pattern a data engineer uses daily",
    breadcrumb: "Getting Started > Navigation",

    sections: [


{
    id: "what_is_filesystem",
    content: `
<h3>🗂️ What Is a Filesystem? — The Foundation of Everything</h3>

<div class="story-box">
    <h4>📚 Before We Touch Any Command — The Library Analogy</h4>
    <p>Imagine you work in the world's largest library — 50 floors, 10 million books. On Day 1, someone just dumped every book randomly across all floors. Finding <em>anything</em> is impossible. On Day 2, a librarian installs a system: <strong>Floor → Section → Shelf → Book</strong>. Now you can find any book in 2 minutes by following the hierarchy.</p>
    <p>A <strong>filesystem</strong> is exactly that librarian's system — applied to computer storage. It's the layer between raw disk sectors and human-readable filenames. Without it, your hard disk is just billions of 0s and 1s. With it, those bits become <code>/home/anuj/projects/ml_model.py</code>.</p>
    <p>Everything you'll ever do in Linux — running scripts, analyzing data, configuring servers, deploying pipelines — <strong>involves the filesystem</strong>. Understanding it isn't optional. It's the map without which you're wandering blind.</p>
</div>

<h4>📖 Core Terminology — Every Word Defined</h4>

<div class="cards-grid">
    <div class="mini-card">
        <h5>📄 File</h5>
        <p>A named sequence of bytes stored on disk. Linux has a radical philosophy: <strong>"everything is a file"</strong> — text documents, programs, hard disks, terminals, network sockets, system memory. Even your keyboard is a file (<code>/dev/input/event0</code>). This unified model makes Linux incredibly powerful.</p>
    </div>
    <div class="mini-card">
        <h5>📁 Directory</h5>
        <p>A special file that contains a <strong>list of names paired with inode numbers</strong>. What macOS/Windows calls a "folder." Directories create hierarchy — they can contain files AND other directories, forming the tree structure of the filesystem.</p>
    </div>
    <div class="mini-card">
        <h5>🌳 Filesystem Hierarchy</h5>
        <p>The <strong>tree-shaped organization</strong> of all files, starting from a single root called <code>/</code>. Unlike Windows (C:\, D:\, E:\), Linux has exactly <strong>one unified tree</strong>. USB drives, network shares, and additional disks are all "mounted" into this same tree at specific mount points.</p>
    </div>
    <div class="mini-card">
        <h5>📍 Path</h5>
        <p>The complete <strong>address of a file</strong> — the route from a starting point to that file, written as directory names separated by <code>/</code> (forward slash). Example: <code>/home/anuj/data/sales.csv</code> means: inside root → inside home → inside anuj → inside data → file named sales.csv.</p>
    </div>
    <div class="mini-card">
        <h5>🔢 Inode</h5>
        <p>The kernel's internal <strong>unique ID number</strong> for every file. Stores metadata: permissions, owner, size, timestamps, and disk block locations — but NOT the filename. The directory maps human-readable names to inode numbers. Run <code>ls -i</code> to see inodes.</p>
    </div>
    <div class="mini-card">
        <h5>🔗 Symlink (Symbolic Link)</h5>
        <p>A file that <strong>points to another file or directory</strong> — like a Windows shortcut or macOS alias. When you access a symlink, Linux automatically follows it to the target. Run <code>ls -l</code> to see them: <code>python → python3.10</code>. Created with <code>ln -s target linkname</code>.</p>
    </div>
    <div class="mini-card">
        <h5>📌 Mount Point</h5>
        <p>A directory where an additional storage device is <strong>attached to the main tree</strong>. When you plug in a USB drive, Linux mounts it at a path like <code>/media/usb0</code>. The drive's files appear there. Everything stays in one unified tree — no drive letters.</p>
    </div>
    <div class="mini-card">
        <h5>🏠 Home Directory</h5>
        <p>Each user's <strong>personal directory</strong>, typically <code>/home/username</code>. Your files, configs, scripts, and data live here. The shell shortcut <code>~</code> (tilde) always expands to your home directory. Root user's home is special: <code>/root</code>.</p>
    </div>
    <div class="mini-card">
        <h5>🏢 Working Directory (CWD)</h5>
        <p>The directory you are <strong>currently inside</strong> — your "current location" in the filesystem. Every relative path you use is resolved starting from here. The shell displays it in your prompt. <code>pwd</code> prints it. <code>$PWD</code> holds it as an environment variable.</p>
    </div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 760 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes rootPulse { 0%,100%{stroke-width:2.5;opacity:0.8} 50%{stroke-width:4;opacity:1} }
                @keyframes nodeIn   { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }
                @keyframes lineGrow { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
                @keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
                .rootNode{animation:rootPulse 2.5s ease-in-out infinite}
                .n1{animation:nodeIn 0.4s ease-out 0.3s both}
                .n2{animation:nodeIn 0.4s ease-out 0.5s both}
                .n3{animation:nodeIn 0.4s ease-out 0.7s both}
                .n4{animation:nodeIn 0.4s ease-out 0.9s both}
                .n5{animation:nodeIn 0.4s ease-out 1.1s both}
                .n6{animation:nodeIn 0.4s ease-out 1.3s both}
                .n7{animation:nodeIn 0.4s ease-out 1.5s both}
                .n8{animation:nodeIn 0.4s ease-out 1.7s both}
                .l1{stroke-dasharray:300;animation:lineGrow 0.6s ease-out 0.2s both}
                .l2{stroke-dasharray:300;animation:lineGrow 0.6s ease-out 0.4s both}
                .l3{stroke-dasharray:300;animation:lineGrow 0.6s ease-out 0.6s both}
                .l4{stroke-dasharray:300;animation:lineGrow 0.6s ease-out 0.8s both}
                .youHere{animation:floatUp 1.8s ease-in-out infinite}
            </style>
        </defs>

        <text x="380" y="22" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="Space Grotesk">The Linux Filesystem — One Tree, Everything Inside It</text>

        <!-- Root -->
        <circle cx="380" cy="56" r="28" fill="#1a0505" stroke="#f87171" stroke-width="3" class="rootNode"/>
        <text x="380" y="62" text-anchor="middle" fill="#f87171" font-size="20" font-weight="bold" font-family="JetBrains Mono">/</text>
        <text x="380" y="96" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">Root — the ONE starting point of everything</text>

        <!-- Lines level 1 -->
        <line x1="380" y1="84" x2="80"  y2="140" stroke="#1e3a4a" stroke-width="1.5" class="l1"/>
        <line x1="380" y1="84" x2="180" y2="140" stroke="#1e3a4a" stroke-width="1.5" class="l1"/>
        <line x1="380" y1="84" x2="290" y2="140" stroke="#1e3a4a" stroke-width="1.5" class="l1"/>
        <line x1="380" y1="84" x2="390" y2="140" stroke="#1e3a4a" stroke-width="1.5" class="l2"/>
        <line x1="380" y1="84" x2="490" y2="140" stroke="#1e3a4a" stroke-width="1.5" class="l2"/>
        <line x1="380" y1="84" x2="590" y2="140" stroke="#1e3a4a" stroke-width="1.5" class="l2"/>
        <line x1="380" y1="84" x2="690" y2="140" stroke="#1e3a4a" stroke-width="1.5" class="l2"/>

        <!-- Level 1 nodes -->
        <g class="n1"><circle cx="80"  cy="154" r="22" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/><text x="80"  y="158" text-anchor="middle" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">bin</text><text x="80"  y="184" text-anchor="middle" fill="#64748b" font-size="9">commands</text></g>
        <g class="n2"><circle cx="180" cy="154" r="22" fill="#0a1520" stroke="#fbbf24" stroke-width="2"/><text x="180" y="158" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">etc</text><text x="180" y="184" text-anchor="middle" fill="#fbbf24" font-size="9">config</text></g>
        <g class="n3"><circle cx="290" cy="154" r="22" fill="#0a1520" stroke="#34d399" stroke-width="2.5"/><text x="290" y="158" text-anchor="middle" fill="#34d399" font-size="11" font-family="JetBrains Mono">home</text><text x="290" y="184" text-anchor="middle" fill="#34d399" font-size="9">users</text></g>
        <g class="n4"><circle cx="390" cy="154" r="22" fill="#0a1520" stroke="#fb923c" stroke-width="2.5"/><text x="390" y="158" text-anchor="middle" fill="#fb923c" font-size="11" font-family="JetBrains Mono">var</text><text x="390" y="184" text-anchor="middle" fill="#fb923c" font-size="9">logs/data</text></g>
        <g class="n5"><circle cx="490" cy="154" r="22" fill="#0a1520" stroke="#a78bfa" stroke-width="2"/><text x="490" y="158" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="JetBrains Mono">opt</text><text x="490" y="184" text-anchor="middle" fill="#a78bfa" font-size="9">big apps</text></g>
        <g class="n6"><circle cx="590" cy="154" r="22" fill="#0a1520" stroke="#f87171" stroke-width="2"/><text x="590" y="158" text-anchor="middle" fill="#f87171" font-size="11" font-family="JetBrains Mono">tmp</text><text x="590" y="184" text-anchor="middle" fill="#f87171" font-size="9">temporary</text></g>
        <g class="n7"><circle cx="690" cy="154" r="22" fill="#0a1520" stroke="#94a3b8" stroke-width="2"/><text x="690" y="158" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="JetBrains Mono">proc</text><text x="690" y="184" text-anchor="middle" fill="#94a3b8" font-size="9">kernel vfs</text></g>

        <!-- /home branches -->
        <line x1="290" y1="176" x2="200" y2="232" stroke="#1e3a4a" stroke-width="1.5" class="l3"/>
        <line x1="290" y1="176" x2="290" y2="232" stroke="#1e3a4a" stroke-width="1.5" class="l3"/>
        <line x1="290" y1="176" x2="380" y2="232" stroke="#1e3a4a" stroke-width="1.5" class="l3"/>

        <g class="n8"><circle cx="200" cy="246" r="19" fill="#0a1520" stroke="#34d399" stroke-width="1.5"/><text x="200" y="250" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">anuj</text></g>
        <g class="n8"><circle cx="290" cy="246" r="19" fill="#0a1520" stroke="#34d399" stroke-width="1.5"/><text x="290" y="250" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">riya</text></g>
        <g class="n8"><circle cx="380" cy="246" r="19" fill="#0a1520" stroke="#f87171" stroke-width="1.5"/><text x="380" y="250" text-anchor="middle" fill="#f87171" font-size="10" font-family="JetBrains Mono">root</text></g>

        <!-- anuj subfolders -->
        <line x1="200" y1="265" x2="130" y2="310" stroke="#1e3a4a" stroke-width="1" class="l4"/>
        <line x1="200" y1="265" x2="200" y2="310" stroke="#1e3a4a" stroke-width="1" class="l4"/>
        <line x1="200" y1="265" x2="270" y2="310" stroke="#1e3a4a" stroke-width="1" class="l4"/>

        <rect x="88"  y="312" width="84" height="26" rx="5" fill="#0a1520" stroke="#22d3ee" stroke-width="1"/>
        <text x="130" y="329" text-anchor="middle" fill="#22d3ee" font-size="9" font-family="JetBrains Mono">projects/</text>

        <rect x="160" y="312" width="80" height="26" rx="5" fill="#0a1520" stroke="#22d3ee" stroke-width="1"/>
        <text x="200" y="329" text-anchor="middle" fill="#22d3ee" font-size="9" font-family="JetBrains Mono">data/</text>

        <rect x="232" y="312" width="76" height="26" rx="5" fill="#0a1520" stroke="#a78bfa" stroke-width="1"/>
        <text x="270" y="329" text-anchor="middle" fill="#a78bfa" font-size="9" font-family="JetBrains Mono">.bashrc</text>

        <!-- data/ files -->
        <line x1="200" y1="338" x2="165" y2="372" stroke="#1e3a4a" stroke-width="1"/>
        <line x1="200" y1="338" x2="235" y2="372" stroke="#1e3a4a" stroke-width="1"/>

        <rect x="108" y="374" width="114" height="24" rx="4" fill="#0a1520" stroke="#fbbf24" stroke-width="1"/>
        <text x="165" y="390" text-anchor="middle" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">sales_2024.csv</text>

        <rect x="194" y="374" width="82" height="24" rx="4" fill="#0a1520" stroke="#fbbf24" stroke-width="1"/>
        <text x="235" y="390" text-anchor="middle" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">model.py</text>

        <!-- "You are here" indicator -->
        <g class="youHere">
            <rect x="108" y="400" width="244" height="22" rx="4" fill="#0d1f0d" stroke="#4ade80" stroke-width="1"/>
            <text x="230" y="415" text-anchor="middle" fill="#4ade80" font-size="9" font-family="JetBrains Mono">→ /home/anuj/data/sales_2024.csv</text>
        </g>

        <!-- Windows comparison -->
        <rect x="500" y="230" width="242" height="108" rx="10" fill="#1a1020" stroke="#64748b" stroke-width="1"/>
        <text x="621" y="252" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold" font-family="Space Grotesk">Windows vs Linux</text>
        <text x="514" y="272" fill="#f87171" font-size="10" font-family="JetBrains Mono">Windows: C:\Users\Anuj\data</text>
        <text x="514" y="288" fill="#64748b" font-size="9">Drive letters, backslashes</text>
        <text x="514" y="308" fill="#34d399" font-size="10" font-family="JetBrains Mono">Linux: /home/anuj/data</text>
        <text x="514" y="324" fill="#64748b" font-size="9">One root, forward slashes</text>

        <text x="380" y="454" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">Every / in a path separates one directory level — read left to right from root to file</text>
    </svg>
    <div class="caption">Linux has one unified filesystem tree. Everything — including USB drives, network shares, and even hardware devices — hangs from a single root (/).</div>
</div>

<div class="deep-dive-box">
    <h4>🔬 How Does the Kernel Actually Store Files?</h4>
    <p>On disk, every file has two parts: the <strong>inode</strong> (metadata: permissions, size, timestamps, owner, and which disk blocks hold the data) and the <strong>data blocks</strong> (the actual content). Directories don't contain files — they contain a table of <code>name → inode_number</code> mappings. When you type <code>cat /home/anuj/data.csv</code>, the kernel: (1) looks up <code>/</code>'s inode to find the root directory data, (2) scans that directory for "home", gets inode 42, (3) scans inode 42's directory for "anuj", gets inode 7861, (4) scans that for "data.csv", gets inode 29481, (5) reads inode 29481 to find the disk blocks, (6) reads those blocks and outputs the content. This explains why <code>mv</code> within the same filesystem is instant — it just changes a directory entry, never touching the data blocks.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">understanding_paths.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ ABSOLUTE PATH — starts with / ════</span>
<span class="comment"># Works from ANYWHERE in the filesystem</span>
<span class="prompt">$</span> cat /etc/hostname             <span class="comment"># Works from /home, /var, /tmp, anywhere</span>
<span class="output">ubuntu-prod-01</span>

<span class="comment"># ════ RELATIVE PATH — starts without / ════</span>
<span class="comment"># Resolved from your CURRENT directory</span>
<span class="prompt">$</span> cd /home/anuj
<span class="prompt">$</span> cat data/sales.csv            <span class="comment"># → /home/anuj/data/sales.csv</span>
<span class="prompt">$</span> cat ./data/sales.csv          <span class="comment"># Same thing — ./ means "current dir"</span>

<span class="comment"># ════ SPECIAL PATH CHARACTERS ════</span>
<span class="prompt">$</span> echo ~                        <span class="comment"># ~ expands to /home/yourusername</span>
<span class="output">/home/anuj</span>

<span class="prompt">$</span> echo .                        <span class="comment"># . = current directory</span>
<span class="output">.</span>

<span class="prompt">$</span> echo ..                       <span class="comment"># .. = parent directory</span>
<span class="output">..</span>

<span class="comment"># ════ SEEING INODES ════</span>
<span class="prompt">$</span> ls -i /home/anuj
<span class="output">2097153 data/  2097154 projects/  2097155 .bashrc</span>
<span class="comment"># Those numbers are inode IDs — the kernel's internal file IDs</span>
<span class="comment"># Name is just a human label; the kernel uses the inode number</span>

<span class="comment"># ════ UNDERSTANDING SYMLINKS ════</span>
<span class="prompt">$</span> ls -l /usr/bin/python
<span class="output">lrwxrwxrwx 1 root root 9 Mar 01 /usr/bin/python -> python3</span>
<span class="comment"># python is a symlink pointing to python3</span>
<span class="comment"># l at start = symlink type   -> shows the target</span>
<span class="prompt">$</span> ls -l /usr/bin/python3
<span class="output">lrwxrwxrwx 1 root root 16 Mar 01 /usr/bin/python3 -> python3.10</span>
<span class="comment"># python3 also points to python3.10 — chain of symlinks!</span></div>
</div>

<div class="info-box">
    <h4>💡 Why Linux Uses Forward Slash, Not Backslash</h4>
    <p>Unix (Linux's ancestor) was designed in 1969 and chose <code>/</code> as the path separator. When Microsoft built DOS/Windows in the 1980s, <code>/</code> was already being used for command-line flags (like <code>dir /p</code>), so they used <code>\</code> instead. This is why you get confused switching between Windows and Linux — the <em>direction</em> of the slash matters. In Linux: <code>/home/anuj/data</code>. In Windows: <code>C:\Users\Anuj\data</code>. Always forward slash in Linux, never backslash.</p>
</div>
`
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 2 — pwd: Where Am I?
// ══════════════════════════════════════════════════════════════════════
{
    id: "pwd_command",
    content: `
<h3>📍 pwd — Print Working Directory</h3>

<div class="story-box">
    <h4>🗺️ The "You Are Here" Pin on Every Map</h4>
    <p>Think about Google Maps. When you open it, the first thing it does is show your current location with a blue dot. That dot is context — without it, directions are meaningless. <code>pwd</code> is that blue dot for Linux. It tells you <strong>exactly where you are</strong> in the filesystem tree, in the form of an absolute path from root.</p>
    <p>New Linux users make a very common mistake: they type commands without knowing where they are, then wonder why things don't work. Professionals instinctively run <code>pwd</code> after every SSH login, every <code>cd</code> into unfamiliar territory, and every time something unexpected happens.</p>
</div>

<h4>📖 Terminology Deep Dive</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>🖨️ "Print" in Linux terminology</h5>
        <p>In command-line context, "print" means <strong>write output to the terminal screen</strong>. It comes from the era of physical teletypewriters (TTYs) that literally printed output on paper rolls. <code>pwd</code> = Print Working Directory = display your current location on screen.</p>
    </div>
    <div class="mini-card">
        <h5>🏢 Working Directory</h5>
        <p>Also called <strong>CWD</strong> (Current Working Directory). The directory you are "inside" right now. Every time you run a command without a full path, Linux resolves it relative to your working directory. It changes every time you run <code>cd</code>.</p>
    </div>
    <div class="mini-card">
        <h5>🔤 Absolute vs Logical Path</h5>
        <p><code>pwd</code> has two modes: <code>-L</code> (Logical, default) shows the path with symlinks intact. <code>-P</code> (Physical) resolves all symlinks to show the true on-disk path. Matters when your directory was accessed through a symlink.</p>
    </div>
    <div class="mini-card">
        <h5>🌐 \$PWD Environment Variable</h5>
        <p>The shell always keeps a variable <strong>\$PWD</strong> that mirrors the output of <code>pwd</code>. It's automatically updated every time you <code>cd</code>. You can use it in scripts: <code>LOG="\$PWD/pipeline.log"</code>. Also <code>\$OLDPWD</code> holds the previous directory.</p>
    </div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">pwd_complete_guide.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ The Basics ════</span>
<span class="prompt">$</span> pwd
<span class="output">/home/anuj</span>
<span class="comment"># You are INSIDE /home/anuj right now</span>

<span class="prompt">$</span> cd /var/log/nginx
<span class="prompt">$</span> pwd
<span class="output">/var/log/nginx</span>
<span class="comment"># Now inside nginx logs — 3 levels deep: var → log → nginx</span>

<span class="comment"># ════ The $PWD Variable — Use in Scripts ════</span>
<span class="prompt">$</span> echo \$PWD
<span class="output">/var/log/nginx</span>
<span class="comment"># Shell always keeps $PWD updated — same as pwd output</span>

<span class="prompt">$</span> echo "Current location: \$PWD"
<span class="output">Current location: /var/log/nginx</span>

<span class="prompt">$</span> cp access.log \$PWD/backup_access.log
<span class="comment"># Copies access.log to current dir with a new name</span>

<span class="prompt">$</span> echo \$OLDPWD
<span class="output">/home/anuj</span>
<span class="comment"># $OLDPWD = where you were BEFORE the last cd</span>

<span class="comment"># ════ -L (Logical) vs -P (Physical) ════</span>
<span class="prompt">$</span> ls -la /opt/python
<span class="output">lrwxrwxrwx  /opt/python -> /usr/bin/python3.10</span>
<span class="comment"># /opt/python is a SYMLINK to /usr/bin/python3.10</span>

<span class="prompt">$</span> cd /opt/python     <span class="comment"># Actually: can't cd into a file, but for dirs:</span>
<span class="prompt">$</span> cd /opt/spark      <span class="comment"># /opt/spark is a symlink to /usr/local/spark-3.4.0</span>
<span class="prompt">$</span> pwd -L             <span class="comment"># Logical — shows the SYMLINK path you typed</span>
<span class="output">/opt/spark</span>
<span class="prompt">$</span> pwd -P             <span class="comment"># Physical — shows the REAL resolved path</span>
<span class="output">/usr/local/spark-3.4.0</span>
<span class="comment"># Matters when your PATH has symlinks (conda envs, pyenv, etc.)</span>

<span class="comment"># ════ Real-world script usage ════</span>
<span class="comment">#!/bin/bash</span>
SCRIPT_DIR=\$(pwd)
echo "Script running from: \$SCRIPT_DIR"
LOG_DIR="\$SCRIPT_DIR/logs"
mkdir -p "\$LOG_DIR"
echo "Logs will be at: \$LOG_DIR/pipeline.log"</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes segBlink { 0%,100%{opacity:0.4} 50%{opacity:1} }
                .seg1{animation:segBlink 2.5s ease-in-out infinite 0.0s}
                .seg2{animation:segBlink 2.5s ease-in-out infinite 0.5s}
                .seg3{animation:segBlink 2.5s ease-in-out infinite 1.0s}
                .seg4{animation:segBlink 2.5s ease-in-out infinite 1.5s}
                .seg5{animation:segBlink 2.5s ease-in-out infinite 2.0s}
            </style>
        </defs>
        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Decoding pwd Output — Reading Your Location</text>

        <rect x="18" y="36" width="684" height="42" rx="8" fill="#001400" stroke="#4ade80" stroke-width="2"/>
        <text x="360" y="62" text-anchor="middle" fill="#4ade80" font-size="20" font-family="JetBrains Mono" letter-spacing="1">/home/anuj/projects/ml_pipeline</text>

        <!-- Segment cards -->
        <rect x="18"  y="96" width="56"  height="68" rx="6" fill="#0a1520" stroke="#f87171" stroke-width="2" class="seg1"/>
        <text x="46"  y="118" text-anchor="middle" fill="#f87171" font-size="18" font-family="JetBrains Mono">/</text>
        <text x="46"  y="134" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">ROOT</text>
        <text x="46"  y="148" text-anchor="middle" fill="#64748b" font-size="8">filesystem</text>
        <text x="46"  y="160" text-anchor="middle" fill="#64748b" font-size="8">anchor</text>

        <rect x="84"  y="96" width="96"  height="68" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="2" class="seg2"/>
        <text x="132" y="118" text-anchor="middle" fill="#22d3ee" font-size="14" font-family="JetBrains Mono">home</text>
        <text x="132" y="134" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">LEVEL 1</text>
        <text x="132" y="148" text-anchor="middle" fill="#64748b" font-size="8">user home</text>
        <text x="132" y="160" text-anchor="middle" fill="#64748b" font-size="8">directories</text>

        <rect x="190" y="96" width="86"  height="68" rx="6" fill="#0a1520" stroke="#34d399" stroke-width="2" class="seg3"/>
        <text x="233" y="118" text-anchor="middle" fill="#34d399" font-size="14" font-family="JetBrains Mono">anuj</text>
        <text x="233" y="134" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">LEVEL 2</text>
        <text x="233" y="148" text-anchor="middle" fill="#64748b" font-size="8">your home</text>
        <text x="233" y="160" text-anchor="middle" fill="#64748b" font-size="8">directory</text>

        <rect x="286" y="96" width="106" height="68" rx="6" fill="#0a1520" stroke="#a78bfa" stroke-width="2" class="seg4"/>
        <text x="339" y="118" text-anchor="middle" fill="#a78bfa" font-size="14" font-family="JetBrains Mono">projects</text>
        <text x="339" y="134" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">LEVEL 3</text>
        <text x="339" y="148" text-anchor="middle" fill="#64748b" font-size="8">your work</text>
        <text x="339" y="160" text-anchor="middle" fill="#64748b" font-size="8">folder</text>

        <rect x="402" y="96" width="136" height="68" rx="6" fill="#0a1520" stroke="#fbbf24" stroke-width="3" class="seg5"/>
        <text x="470" y="116" text-anchor="middle" fill="#fbbf24" font-size="12" font-family="JetBrains Mono">ml_pipeline</text>
        <text x="470" y="132" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">LEVEL 4</text>
        <text x="470" y="148" text-anchor="middle" fill="#fbbf24" font-size="9">← YOU ARE</text>
        <text x="470" y="162" text-anchor="middle" fill="#fbbf24" font-size="9">HERE (CWD)</text>

        <text x="360" y="194" text-anchor="middle" fill="#64748b" font-size="11" font-style="italic">Each / separates one level · Read left-to-right from root to current</text>
    </svg>
</div>

<div class="warning-box">
    <h4>⚠️ Don't Skip pwd — The #1 Beginner Mistake</h4>
    <p>A very common scenario: you SSH into a server, type <code>rm -rf logs/*</code> thinking you're in <code>/home/anuj/project/logs</code>, but you're actually in <code>/var/logs</code>. You just deleted production logs. <strong>Always run <code>pwd</code> first</strong> when you're in an unfamiliar location or after a long chain of navigations. Two seconds of checking saves hours of disaster recovery.</p>
</div>
`
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 3 — Absolute vs Relative Paths (Deep Dive)
// ══════════════════════════════════════════════════════════════════════
{
    id: "paths_deep_dive",
    content: `
<h3>🗺️ Paths — Absolute vs Relative (Complete Understanding)</h3>

<div class="story-box">
    <h4>📬 The Two Ways to Address a Location</h4>
    <p>Imagine you're telling someone how to reach a restaurant. You can give them either a <strong>full address</strong> ("12 Marine Drive, Colaba, Mumbai, Maharashtra, India") or <strong>relative directions from where they stand</strong> ("turn left, walk 200m, it's the red building on your right"). Both get them to the same place. Linux paths work exactly the same way.</p>
    <ul>
        <li><strong>Absolute path</strong> = full address from root, always starts with <code>/</code>, works from anywhere</li>
        <li><strong>Relative path</strong> = directions from your current location, doesn't start with <code>/</code>, depends on where you are</li>
    </ul>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 350" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes dashFlow { from{stroke-dashoffset:40} to{stroke-dashoffset:0} }
                .absLine{stroke-dasharray:8,4;animation:dashFlow 1s linear infinite}
                .relLine{stroke-dasharray:5,5;animation:dashFlow 0.8s linear infinite}
            </style>
        </defs>
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Absolute Path vs Relative Path — Two Ways to Reach the Same File</text>

        <!-- Filesystem tree (shared) -->
        <circle cx="360" cy="55" r="20" fill="#1a0505" stroke="#f87171" stroke-width="2"/>
        <text x="360" y="60" text-anchor="middle" fill="#f87171" font-size="14" font-family="JetBrains Mono">/</text>

        <line x1="360" y1="75" x2="240" y2="115" stroke="#334155" stroke-width="1.5"/>
        <line x1="360" y1="75" x2="480" y2="115" stroke="#334155" stroke-width="1.5"/>

        <circle cx="240" cy="128" r="18" fill="#0a1520" stroke="#34d399" stroke-width="1.5"/>
        <text x="240" y="133" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">home</text>

        <circle cx="480" cy="128" r="18" fill="#0a1520" stroke="#64748b" stroke-width="1.5"/>
        <text x="480" y="133" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">var</text>

        <line x1="240" y1="146" x2="180" y2="186" stroke="#334155" stroke-width="1.5"/>
        <line x1="240" y1="146" x2="300" y2="186" stroke="#334155" stroke-width="1.5"/>

        <circle cx="180" cy="199" r="18" fill="#0a1520" stroke="#34d399" stroke-width="2"/>
        <text x="180" y="204" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">anuj</text>

        <circle cx="300" cy="199" r="18" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="300" y="204" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">riya</text>

        <line x1="180" y1="217" x2="130" y2="257" stroke="#334155" stroke-width="1.5"/>
        <line x1="180" y1="217" x2="230" y2="257" stroke="#334155" stroke-width="1.5"/>

        <rect x="90"  y="260" width="80" height="26" rx="5" fill="#0a1520" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="130" y="277" text-anchor="middle" fill="#a78bfa" font-size="9" font-family="JetBrains Mono">projects/</text>

        <rect x="190" y="260" width="80" height="26" rx="5" fill="#0a1520" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="230" y="277" text-anchor="middle" fill="#22d3ee" font-size="9" font-family="JetBrains Mono">data/</text>

        <line x1="230" y1="286" x2="230" y2="314" stroke="#334155" stroke-width="1.5"/>
        <rect x="170" y="316" width="120" height="24" rx="4" fill="#0a1520" stroke="#fbbf24" stroke-width="2"/>
        <text x="230" y="332" text-anchor="middle" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">sales.csv ← TARGET</text>

        <!-- YOU ARE HERE marker -->
        <circle cx="480" cy="250" r="22" fill="#1a1005" stroke="#fbbf24" stroke-width="2.5"/>
        <text x="480" y="245" text-anchor="middle" fill="#fbbf24" font-size="8" font-family="JetBrains Mono">YOU</text>
        <text x="480" y="258" text-anchor="middle" fill="#fbbf24" font-size="8">/home/anuj</text>

        <!-- ABSOLUTE path — goes from root -->
        <path d="M 360 75 L 240 128 L 180 199 L 230 277 L 230 316" fill="none" stroke="#22d3ee" stroke-width="2.5" class="absLine"/>
        <text x="520" y="120" fill="#22d3ee" font-size="12" font-weight="bold" font-family="JetBrains Mono">ABSOLUTE:</text>
        <text x="520" y="140" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">/home/anuj/data/sales.csv</text>
        <text x="520" y="158" fill="#64748b" font-size="9">→ starts at root /</text>
        <text x="520" y="172" fill="#64748b" font-size="9">→ works from ANYWHERE</text>

        <!-- RELATIVE path — goes from CWD -->
        <path d="M 480 272 L 230 286 L 230 316" fill="none" stroke="#a78bfa" stroke-width="2.5" class="relLine"/>
        <text x="520" y="215" fill="#a78bfa" font-size="12" font-weight="bold" font-family="JetBrains Mono">RELATIVE:</text>
        <text x="520" y="235" fill="#a78bfa" font-size="11" font-family="JetBrains Mono">data/sales.csv</text>
        <text x="520" y="253" fill="#64748b" font-size="9">→ starts from CWD</text>
        <text x="520" y="267" fill="#64748b" font-size="9">→ only works if CWD</text>
        <text x="520" y="281" fill="#64748b" font-size="9">   is /home/anuj</text>
    </svg>
    <div class="caption">Absolute paths always start with / and work everywhere. Relative paths are shorter but depend on where you currently are.</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">absolute_vs_relative.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ Same file, both path styles ════</span>
<span class="prompt">$</span> cd /home/anuj

<span class="comment"># ABSOLUTE — works from anywhere</span>
<span class="prompt">$</span> cat /home/anuj/data/sales.csv          <span class="comment"># Full path from root</span>

<span class="comment"># RELATIVE — works because we ARE in /home/anuj</span>
<span class="prompt">$</span> cat data/sales.csv                      <span class="comment"># Relative to /home/anuj</span>
<span class="prompt">$</span> cat ./data/sales.csv                    <span class="comment"># ./ = explicitly current dir</span>

<span class="comment"># Both produce identical output!</span>

<span class="comment"># ════ When relative breaks ════</span>
<span class="prompt">$</span> cd /var/log
<span class="prompt">$</span> cat data/sales.csv                      <span class="comment"># ERROR: no data/ here!</span>
<span class="output">cat: data/sales.csv: No such file or directory</span>
<span class="comment"># Relative paths depend on where you are — different dir = different result</span>

<span class="comment"># ════ When to use each ════</span>
<span class="comment"># ABSOLUTE: In scripts (location independent), config files, cron jobs</span>
<span class="comment"># RELATIVE: Interactive use when you're already near the file</span>

<span class="comment"># ════ The dot notation ════</span>
<span class="prompt">$</span> cd /home/anuj
<span class="prompt">$</span> ls .             <span class="comment"># . = current directory = ls /home/anuj</span>
<span class="prompt">$</span> ls ..            <span class="comment"># .. = parent = ls /home</span>
<span class="prompt">$</span> ls ../..         <span class="comment"># two levels up = ls /</span>
<span class="prompt">$</span> ls ../../etc     <span class="comment"># two up then into etc = ls /etc</span>

<span class="comment"># ════ Chaining relative paths ════</span>
<span class="prompt">$</span> cd /home/anuj/projects
<span class="prompt">$</span> cat ../data/sales.csv     <span class="comment"># Go up to anuj/, then into data/</span>
<span class="comment"># = /home/anuj/data/sales.csv</span></div>
</div>

<div class="info-box">
    <h4>💡 The . and .. Special Directory Entries — They Exist in EVERY Directory</h4>
    <p>Every single directory in Linux contains two special entries: <code>.</code> (single dot = this directory itself) and <code>..</code> (double dot = parent directory). They're not just notation — they're real directory entries with real inode numbers. Run <code>ls -la</code> and you'll always see them at the top of the listing. At the root <code>/</code>, both <code>.</code> and <code>..</code> point to <code>/</code> itself — you can't go above root.</p>
</div>
`
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 4 — cd: Complete Command Guide
// ══════════════════════════════════════════════════════════════════════
{
    id: "cd_command",
    content: `
<h3>🚀 cd — Change Directory (Your Navigation Engine)</h3>

<div class="story-box">
    <h4>🚗 The GPS with Two Modes</h4>
    <p>A GPS app can give you a route using a full street address, or it can give you relative directions from your current position ("in 200m, turn left"). <code>cd</code> works both ways. Master every form of <code>cd</code> and you'll navigate the filesystem faster than people can type paths.</p>
</div>

<h4>📖 cd Terminology</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>🏠 Shell Builtin</h5>
        <p><code>cd</code> is built directly into the shell — it's NOT an external program. This is why <code>which cd</code> shows "cd is a shell builtin." External programs run in child processes; a child process changing its directory wouldn't affect the parent shell. Because <code>cd</code> is a builtin, it changes the shell's own directory.</p>
    </div>
    <div class="mini-card">
        <h5>🔄 Directory Stack</h5>
        <p>The shell maintains a <strong>stack of previously visited directories</strong>. <code>cd -</code> uses <code>\$OLDPWD</code> to jump to the last directory. <code>pushd</code>/<code>popd</code> give you a full stack. Think of it like browser back/forward history, but for directories.</p>
    </div>
    <div class="mini-card">
        <h5>🔗 Symlink Following</h5>
        <p>By default, <code>cd</code> follows symlinks (logical mode). <code>cd -P /path</code> resolves symlinks first (physical mode). This matters with conda/pyenv environments where activation creates symlink directories.</p>
    </div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">cd_every_form.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════════════════════════════════════════</span>
<span class="comment"># FORM 1: Absolute Path (starts with /)</span>
<span class="comment"># Works from ANYWHERE — never context-dependent</span>
<span class="comment"># ════════════════════════════════════════</span>
<span class="prompt">$</span> cd /                       <span class="comment"># Root of entire filesystem</span>
<span class="prompt">$</span> cd /home/anuj               <span class="comment"># Your home (long form)</span>
<span class="prompt">$</span> cd /var/log                 <span class="comment"># System log directory</span>
<span class="prompt">$</span> cd /etc/nginx/sites-enabled <span class="comment"># Nested — creates path in one shot</span>
<span class="prompt">$</span> cd /opt/spark/conf          <span class="comment"># Spark config — 3 levels down</span>

<span class="comment"># ════════════════════════════════════════</span>
<span class="comment"># FORM 2: Relative Path (no leading /)</span>
<span class="comment"># Resolved from current directory</span>
<span class="comment"># ════════════════════════════════════════</span>
<span class="comment"># Assume you are in /home/anuj</span>
<span class="prompt">$</span> cd projects                 <span class="comment"># Enter /home/anuj/projects</span>
<span class="prompt">$</span> cd projects/ml_pipeline     <span class="comment"># Two levels in one command</span>
<span class="prompt">$</span> cd ./scripts                <span class="comment"># ./ = "current dir" — explicit</span>

<span class="comment"># ════════════════════════════════════════</span>
<span class="comment"># FORM 3: Parent Navigation with ..</span>
<span class="comment"># ════════════════════════════════════════</span>
<span class="prompt">$</span> cd ..                       <span class="comment"># Up ONE level</span>
<span class="prompt">$</span> cd ../..                    <span class="comment"># Up TWO levels</span>
<span class="prompt">$</span> cd ../../..                 <span class="comment"># Up THREE levels</span>
<span class="prompt">$</span> cd ../sibling               <span class="comment"># Up one, then into sibling dir</span>
<span class="prompt">$</span> cd ../../etc                <span class="comment"># Up two levels, then into /etc</span>

<span class="comment"># Example: from /home/anuj/projects/ml/src:</span>
<span class="prompt">$</span> pwd
<span class="output">/home/anuj/projects/ml/src</span>
<span class="prompt">$</span> cd ../data                  <span class="comment"># = /home/anuj/projects/ml/data</span>
<span class="prompt">$</span> cd ../../..                 <span class="comment"># = /home/anuj</span>

<span class="comment"># ════════════════════════════════════════</span>
<span class="comment"># FORM 4: Home Shortcuts</span>
<span class="comment"># ════════════════════════════════════════</span>
<span class="prompt">$</span> cd ~                        <span class="comment"># YOUR home (/home/anuj)</span>
<span class="prompt">$</span> cd                          <span class="comment"># Bare cd = cd ~ (home)</span>
<span class="prompt">$</span> cd ~/projects               <span class="comment"># Into a subdir of home</span>
<span class="prompt">$</span> cd ~anuj                    <span class="comment"># Anuj's home (useful as root)</span>
<span class="prompt">$</span> cd ~riya                    <span class="comment"># Riya's home (/home/riya)</span>
<span class="prompt">$</span> cd ~root                    <span class="comment"># Root user's home (/root)</span>

<span class="comment"># ════════════════════════════════════════</span>
<span class="comment"># FORM 5: The Toggle — cd - (MOST UNDERUSED!)</span>
<span class="comment"># ════════════════════════════════════════</span>
<span class="prompt">$</span> cd /var/log/nginx           <span class="comment"># Go check some logs</span>
<span class="prompt">$</span> cd /home/anuj/projects      <span class="comment"># Back to work</span>
<span class="prompt">$</span> cd -                        <span class="comment"># Toggle! → /var/log/nginx</span>
<span class="output">/var/log/nginx</span>
<span class="prompt">$</span> cd -                        <span class="comment"># Toggle back → /home/anuj/projects</span>
<span class="output">/home/anuj/projects</span>
<span class="comment"># cd - is like Alt+Tab for directories — instant 2-location switching</span>
<span class="comment"># Works via the $OLDPWD variable which shell auto-updates</span>

<span class="comment"># ════════════════════════════════════════</span>
<span class="comment"># FORM 6: Environment Variables in Paths</span>
<span class="comment"># ════════════════════════════════════════</span>
<span class="prompt">$</span> cd \$SPARK_HOME               <span class="comment"># = /opt/spark (if SPARK_HOME is set)</span>
<span class="prompt">$</span> cd \$HOME                     <span class="comment"># Same as cd ~</span>
<span class="prompt">$</span> cd \${PROJECT_DIR}/data       <span class="comment"># Use env var + subfolder</span>

<span class="comment"># ════════════════════════════════════════</span>
<span class="comment"># HANDLING SPACES IN PATHS (important!)</span>
<span class="comment"># ════════════════════════════════════════</span>
<span class="prompt">$</span> cd "My Projects"             <span class="comment"># Quote paths with spaces</span>
<span class="prompt">$</span> cd My\ Projects              <span class="comment"># OR escape the space with backslash</span>
<span class="comment"># BEST PRACTICE: never use spaces in Linux filenames</span>
<span class="comment"># Use: my_projects  my-projects  MyProjects  — never "my projects"</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes arrowAnim { 0%,100%{opacity:0.5;transform:translateX(0)} 50%{opacity:1;transform:translateX(4px)} }
                @keyframes toggleAnim { 0%,100%{fill:#22d3ee} 50%{fill:#a78bfa} }
                .arr{animation:arrowAnim 1.5s ease-in-out infinite}
                .tog{animation:toggleAnim 2s step-end infinite}
            </style>
        </defs>
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">cd .. Navigation — Going Up the Tree</text>

        <!-- Filesystem nodes -->
        <circle cx="360" cy="55" r="18" fill="#1a0505" stroke="#f87171" stroke-width="2"/>
        <text x="360" y="60" text-anchor="middle" fill="#f87171" font-size="13" font-family="JetBrains Mono">/</text>

        <line x1="360" y1="73" x2="240" y2="105" stroke="#334155" stroke-width="1.5"/>
        <line x1="360" y1="73" x2="480" y2="105" stroke="#334155" stroke-width="1.5"/>

        <circle cx="240" cy="118" r="18" fill="#0a1520" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="240" y="123" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">home</text>

        <circle cx="480" cy="118" r="18" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="480" y="123" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">var</text>

        <line x1="240" y1="136" x2="240" y2="168" stroke="#334155" stroke-width="1.5"/>

        <circle cx="240" cy="181" r="18" fill="#0a1520" stroke="#34d399" stroke-width="1.5"/>
        <text x="240" y="186" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">anuj</text>

        <line x1="240" y1="199" x2="190" y2="231" stroke="#334155" stroke-width="1.5"/>
        <line x1="240" y1="199" x2="290" y2="231" stroke="#334155" stroke-width="1.5"/>

        <circle cx="190" cy="244" r="16" fill="#0a1520" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="190" y="249" text-anchor="middle" fill="#a78bfa" font-size="9" font-family="JetBrains Mono">data</text>

        <circle cx="290" cy="244" r="16" fill="#0a1520" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="290" y="249" text-anchor="middle" fill="#a78bfa" font-size="9" font-family="JetBrains Mono">logs</text>

        <line x1="190" y1="260" x2="190" y2="274" stroke="#334155" stroke-width="1"/>
        <circle cx="190" cy="274" r="0"/>

        <!-- YOU ARE HERE in data -->
        <rect x="150" y="257" width="80" height="20" rx="4" fill="#0d1f0d" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="190" y="271" text-anchor="middle" fill="#fbbf24" font-size="8" font-family="JetBrains Mono">YOU HERE</text>

        <!-- Annotations for cd commands -->
        <text x="500" y="95"  fill="#22d3ee" font-size="11" font-family="JetBrains Mono" class="arr">cd ../../..</text>
        <text x="500" y="112" fill="#64748b" font-size="9">→ goes to / (3 levels)</text>
        <line x1="495" y1="100" x2="385" y2="65" stroke="#22d3ee" stroke-width="1" stroke-dasharray="4,2"/>

        <text x="500" y="145" fill="#34d399" font-size="11" font-family="JetBrains Mono" class="arr">cd ../..</text>
        <text x="500" y="162" fill="#64748b" font-size="9">→ goes to /home (2 levels)</text>
        <line x1="495" y1="150" x2="265" y2="128" stroke="#34d399" stroke-width="1" stroke-dasharray="4,2"/>

        <text x="500" y="195" fill="#a78bfa" font-size="11" font-family="JetBrains Mono" class="arr">cd ..</text>
        <text x="500" y="212" fill="#64748b" font-size="9">→ goes to /home/anuj</text>
        <line x1="495" y1="200" x2="265" y2="191" stroke="#a78bfa" stroke-width="1" stroke-dasharray="4,2"/>

        <text x="500" y="245" fill="#fbbf24" font-size="11" font-family="JetBrains Mono" class="arr">cd ../logs</text>
        <text x="500" y="262" fill="#64748b" font-size="9">→ goes to /home/anuj/logs</text>
        <line x1="495" y1="250" x2="310" y2="248" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,2"/>
    </svg>
    <div class="caption">.. always means "parent directory" — use multiple .. separated by / to go up multiple levels at once</div>
</div>

<div class="deep-dive-box">
    <h4>🔬 Why Is cd a Builtin? The Child Process Explanation</h4>
    <p>In Linux, every external command (like <code>ls</code>, <code>cat</code>, <code>python3</code>) runs in a <strong>child process</strong> that is forked from your shell. When a child process exits, it returns to the parent shell — and any state changes the child made (including its working directory) are completely discarded. If <code>cd</code> were an external program, it would change its own directory, then exit, and your shell would still be in the same place. That's why <code>cd</code> MUST be a builtin — it needs to directly modify the shell's own internal state. Verify: <code>type cd</code> → "cd is a shell builtin".</p>
</div>
`
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 5 — ls: Complete Command Guide
// ══════════════════════════════════════════════════════════════════════
{
    id: "ls_command",
    content: `
<h3>📋 ls — List Directory Contents (Your Filesystem Window)</h3>

<div class="story-box">
    <h4>🔦 The Flashlight with 20 Beam Modes</h4>
    <p>You've navigated to a directory. Now what? You need to see what's there — its contents, sizes, permissions, who owns what, what was modified recently, what's hidden. <code>ls</code> is your flashlight, and it has many different beam modes (flags) that illuminate different aspects of the same directory. Master all of them and you'll extract information in seconds that takes beginners minutes of searching through GUIs.</p>
</div>

<h4>📖 Key ls Terminology</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>📋 Long Format (-l)</h5>
        <p>Shows <strong>all file metadata</strong> in a tabular layout: type, permissions, link count, owner, group, size, modification time, and name. The most important ls flag — you'll use it constantly.</p>
    </div>
    <div class="mini-card">
        <h5>👁️ All Files (-a)</h5>
        <p>Shows <strong>hidden files</strong> too — files and directories whose names start with a dot (.) are hidden by default. <code>ls -a</code> or <code>ls -la</code> reveals your entire directory including dotfiles.</p>
    </div>
    <div class="mini-card">
        <h5>📏 Human-Readable Sizes (-h)</h5>
        <p>Converts raw byte counts to <strong>KB, MB, GB</strong>. Without -h: <code>1258291200</code>. With -h: <code>1.2G</code>. Always use with -l. Combine: <code>ls -lh</code>.</p>
    </div>
    <div class="mini-card">
        <h5>🕐 Sort by Time (-t)</h5>
        <p>Lists files <strong>newest first</strong> by modification time. Essential for answering "what changed recently?" Combine with -r to reverse (oldest first) for log chronology.</p>
    </div>
    <div class="mini-card">
        <h5>📦 Sort by Size (-S)</h5>
        <p>Lists files <strong>largest first</strong>. Essential for disk space investigation: "what's eating my disk?" Combine: <code>ls -lhS</code> for sorted+human-readable sizes.</p>
    </div>
    <div class="mini-card">
        <h5>🎨 Color Output (--color)</h5>
        <p>Blue=directories, Green=executables, Cyan=symlinks, Red=archives, White=regular files. Usually on by default in Ubuntu via <code>alias ls='ls --color=auto'</code> in .bashrc.</p>
    </div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">ls_master_class.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ BASIC FORMS ════</span>
<span class="prompt">$</span> ls                                 <span class="comment"># Simple names only (current dir)</span>
<span class="output">data  logs  pipeline.sh  requirements.txt  scripts</span>

<span class="prompt">$</span> ls /var/log                        <span class="comment"># List ANY dir WITHOUT going there</span>
<span class="output">apache2  auth.log  dpkg.log  kern.log  syslog</span>

<span class="prompt">$</span> ls /home/anuj /tmp                 <span class="comment"># List MULTIPLE directories at once</span>

<span class="comment"># ════ THE ESSENTIAL FLAG: -l ════</span>
<span class="prompt">$</span> ls -l
<span class="output">total 48</span>
<span class="output">drwxr-xr-x 3 anuj staff 4096 Mar 09 10:30 data</span>
<span class="output">drwxr-xr-x 2 anuj staff 4096 Mar 08 09:15 logs</span>
<span class="output">-rwxr-xr-x 1 anuj staff 2048 Mar 07 14:22 pipeline.sh</span>
<span class="output">-rw-r--r-- 1 anuj staff  342 Mar 06 11:00 requirements.txt</span>
<span class="comment"># Columns: type+perms | links | owner | group | size | date | name</span>

<span class="comment"># ════ -la: Long + All (hidden) ════</span>
<span class="prompt">$</span> ls -la
<span class="output">total 64</span>
<span class="output">drwxr-xr-x  6 anuj staff 4096 Mar 09 .          ← current dir</span>
<span class="output">drwxr-xr-x  8 root root  4096 Mar 05 ..          ← parent dir</span>
<span class="output">-rw-------  1 anuj staff 1024 Mar 09 .bash_history  ← HIDDEN!</span>
<span class="output">-rw-r--r--  1 anuj staff  220 Mar 01 .bashrc        ← HIDDEN!</span>
<span class="output">drwxr-xr-x  3 anuj staff 4096 Mar 09 data</span>

<span class="comment"># ════ -lh: Human-readable sizes ════</span>
<span class="prompt">$</span> ls -lh
<span class="output">-rw-r--r-- 1 anuj staff  1.2G Mar 09 training_data.parquet</span>
<span class="output">-rw-r--r-- 1 anuj staff  342  Mar 09 config.yaml</span>
<span class="comment"># 1.2G instead of 1258291200 — so much more useful!</span>

<span class="comment"># ════ -lt: Sort by Time (newest first) ════</span>
<span class="prompt">$</span> ls -lt
<span class="comment"># Perfect for: "what changed recently?" "what's the latest log?"</span>
<span class="output">-rw-r--r-- 1 anuj staff 4096 Mar 09 10:45 pipeline.log  ← NEWEST</span>
<span class="output">-rw-r--r-- 1 anuj staff 2048 Mar 09 09:00 ingest.py</span>
<span class="output">-rw-r--r-- 1 anuj staff 1024 Mar 08 14:22 config.yaml</span>

<span class="comment"># -ltr = reverse time (oldest first) — for reading logs chronologically</span>
<span class="prompt">$</span> ls -ltr /var/log/nginx/

<span class="comment"># ════ -lS: Sort by Size (largest first) ════</span>
<span class="prompt">$</span> ls -lhS
<span class="output">-rw-r--r-- 1 anuj staff 5.3G training_data.tar.gz  ← BIGGEST</span>
<span class="output">-rw-r--r-- 1 anuj staff 1.2G model_weights.h5</span>
<span class="output">-rw-r--r-- 1 anuj staff 210M sales_2024.csv</span>
<span class="comment"># Perfect for: "what's eating my disk space?"</span>

<span class="comment"># ════ Viewing specific directory ════</span>
<span class="prompt">$</span> ls -ld /tmp                       <span class="comment"># -d = show DIR ITSELF, not its contents</span>
<span class="output">drwxrwxrwt 14 root root 4096 Mar 09 /tmp</span>
<span class="comment"># The 't' at end of permissions = sticky bit (special flag)</span>

<span class="comment"># ════ Listing with wildcards ════</span>
<span class="prompt">$</span> ls *.py                           <span class="comment"># All Python files</span>
<span class="prompt">$</span> ls *.{csv,parquet}                <span class="comment"># All CSV and Parquet files</span>
<span class="prompt">$</span> ls data_202?.csv                  <span class="comment"># ? = any single character</span>
<span class="prompt">$</span> ls sales_[0-9][0-9].csv          <span class="comment"># Matches sales_01.csv...sales_99.csv</span>

<span class="comment"># ════ Recursive listing ════</span>
<span class="prompt">$</span> ls -R                             <span class="comment"># List ALL subdirectories recursively</span>
<span class="prompt">$</span> ls -lhR | head -40               <span class="comment"># Recursive + long + human, first 40 lines</span>

<span class="comment"># ════ Combined power commands ════</span>
<span class="prompt">$</span> ls -lahS                          <span class="comment"># Long+All+Human+SizeSorted</span>
<span class="prompt">$</span> ls -laht                          <span class="comment"># Long+All+Human+TimeSorted</span>
<span class="prompt">$</span> ls -lhtr /var/log/                <span class="comment"># Chronological log listing</span></div>
</div>

<h4>🔬 Fully Decoded: Every Part of ls -l Output</h4>
<div class="visual-container">
    <svg viewBox="0 0 740 440" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes colHighlight { 0%,85%,100%{opacity:0.45} 40%{opacity:1} }
                .ch1{animation:colHighlight 5s infinite 0.0s}
                .ch2{animation:colHighlight 5s infinite 0.6s}
                .ch3{animation:colHighlight 5s infinite 1.2s}
                .ch4{animation:colHighlight 5s infinite 1.8s}
                .ch5{animation:colHighlight 5s infinite 2.4s}
                .ch6{animation:colHighlight 5s infinite 3.0s}
                .ch7{animation:colHighlight 5s infinite 3.6s}
                .ch8{animation:colHighlight 5s infinite 4.2s}
            </style>
        </defs>
        <text x="370" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Anatomy of ls -l: -rwxr-xr-- 2 anuj devs 4096 Mar 9 10:30 pipeline.sh</text>

        <rect x="10" y="32" width="720" height="40" rx="6" fill="#001400" stroke="#4ade80" stroke-width="1.5"/>
        <!-- Type -->
        <text x="26"  y="56" fill="#f87171" font-size="15" font-family="JetBrains Mono">-</text>
        <!-- Owner perms -->
        <text x="42"  y="56" fill="#22d3ee" font-size="15" font-family="JetBrains Mono">rwx</text>
        <!-- Group perms -->
        <text x="88"  y="56" fill="#a78bfa" font-size="15" font-family="JetBrains Mono">r-x</text>
        <!-- Other perms -->
        <text x="134" y="56" fill="#fbbf24" font-size="15" font-family="JetBrains Mono">r--</text>
        <!-- Links -->
        <text x="190" y="56" fill="#34d399" font-size="15" font-family="JetBrains Mono">2</text>
        <!-- Owner -->
        <text x="216" y="56" fill="#22d3ee" font-size="15" font-family="JetBrains Mono">anuj</text>
        <!-- Group -->
        <text x="276" y="56" fill="#fb923c" font-size="15" font-family="JetBrains Mono">devs</text>
        <!-- Size -->
        <text x="338" y="56" fill="#94a3b8" font-size="15" font-family="JetBrains Mono">4096</text>
        <!-- Date -->
        <text x="406" y="56" fill="#94a3b8" font-size="15" font-family="JetBrains Mono">Mar 9 10:30</text>
        <!-- Name -->
        <text x="524" y="56" fill="#4ade80" font-size="15" font-family="JetBrains Mono">pipeline.sh</text>

        <!-- Annotation boxes row 1 -->
        <rect x="10"  y="82" width="54"  height="80" rx="6" fill="#0a1520" stroke="#f87171" stroke-width="1.5" class="ch1"/>
        <text x="37"  y="104" text-anchor="middle" fill="#f87171" font-size="20" font-family="JetBrains Mono">-</text>
        <text x="37"  y="122" text-anchor="middle" fill="#f87171" font-size="9" font-weight="bold">TYPE</text>
        <text x="37"  y="136" text-anchor="middle" fill="#64748b" font-size="8">- = file</text>
        <text x="37"  y="148" text-anchor="middle" fill="#64748b" font-size="8">d = dir</text>
        <text x="37"  y="160" text-anchor="middle" fill="#64748b" font-size="8">l = link</text>

        <rect x="74"  y="82" width="104" height="80" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="1.5" class="ch2"/>
        <text x="126" y="104" text-anchor="middle" fill="#22d3ee" font-size="14" font-family="JetBrains Mono">rwx</text>
        <text x="126" y="122" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="bold">OWNER PERMS</text>
        <text x="126" y="136" text-anchor="middle" fill="#64748b" font-size="8">read+write</text>
        <text x="126" y="148" text-anchor="middle" fill="#64748b" font-size="8">+execute</text>
        <text x="126" y="160" text-anchor="middle" fill="#64748b" font-size="8">= 7</text>

        <rect x="188" y="82" width="100" height="80" rx="6" fill="#0a1520" stroke="#a78bfa" stroke-width="1.5" class="ch3"/>
        <text x="238" y="104" text-anchor="middle" fill="#a78bfa" font-size="14" font-family="JetBrains Mono">r-x</text>
        <text x="238" y="122" text-anchor="middle" fill="#a78bfa" font-size="9" font-weight="bold">GROUP PERMS</text>
        <text x="238" y="136" text-anchor="middle" fill="#64748b" font-size="8">read+execute</text>
        <text x="238" y="148" text-anchor="middle" fill="#64748b" font-size="8">no write</text>
        <text x="238" y="160" text-anchor="middle" fill="#64748b" font-size="8">= 5</text>

        <rect x="298" y="82" width="100" height="80" rx="6" fill="#0a1520" stroke="#fbbf24" stroke-width="1.5" class="ch4"/>
        <text x="348" y="104" text-anchor="middle" fill="#fbbf24" font-size="14" font-family="JetBrains Mono">r--</text>
        <text x="348" y="122" text-anchor="middle" fill="#fbbf24" font-size="9" font-weight="bold">OTHERS PERMS</text>
        <text x="348" y="136" text-anchor="middle" fill="#64748b" font-size="8">read only</text>
        <text x="348" y="148" text-anchor="middle" fill="#64748b" font-size="8">no write/exec</text>
        <text x="348" y="160" text-anchor="middle" fill="#64748b" font-size="8">= 4</text>

        <rect x="408" y="82" width="62"  height="80" rx="6" fill="#0a1520" stroke="#34d399" stroke-width="1.5" class="ch5"/>
        <text x="439" y="104" text-anchor="middle" fill="#34d399" font-size="18" font-family="JetBrains Mono">2</text>
        <text x="439" y="122" text-anchor="middle" fill="#34d399" font-size="9" font-weight="bold">HARD</text>
        <text x="439" y="136" text-anchor="middle" fill="#34d399" font-size="9" font-weight="bold">LINKS</text>
        <text x="439" y="150" text-anchor="middle" fill="#64748b" font-size="8">inode ref</text>
        <text x="439" y="162" text-anchor="middle" fill="#64748b" font-size="8">count</text>

        <rect x="480" y="82" width="90"  height="80" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="1.5" class="ch6"/>
        <text x="525" y="102" text-anchor="middle" fill="#22d3ee" font-size="12" font-family="JetBrains Mono">anuj</text>
        <text x="525" y="120" text-anchor="middle" fill="#fb923c" font-size="12" font-family="JetBrains Mono">devs</text>
        <text x="525" y="138" text-anchor="middle" fill="#22d3ee" font-size="9" font-weight="bold">OWNER</text>
        <text x="525" y="152" text-anchor="middle" fill="#fb923c" font-size="9" font-weight="bold">GROUP</text>

        <rect x="580" y="82" width="74"  height="80" rx="6" fill="#0a1520" stroke="#94a3b8" stroke-width="1.5" class="ch7"/>
        <text x="617" y="106" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="JetBrains Mono">4096</text>
        <text x="617" y="124" text-anchor="middle" fill="#64748b" font-size="9" font-weight="bold">SIZE</text>
        <text x="617" y="138" text-anchor="middle" fill="#64748b" font-size="8">(bytes)</text>
        <text x="617" y="152" text-anchor="middle" fill="#64748b" font-size="8">use -h for</text>
        <text x="617" y="164" text-anchor="middle" fill="#64748b" font-size="8">KB/MB/GB</text>

        <rect x="664" y="82" width="66"  height="80" rx="6" fill="#0a1520" stroke="#4ade80" stroke-width="1.5" class="ch8"/>
        <text x="697" y="108" text-anchor="middle" fill="#4ade80" font-size="9" font-family="JetBrains Mono">pipeline</text>
        <text x="697" y="124" text-anchor="middle" fill="#4ade80" font-size="9" font-family="JetBrains Mono">.sh</text>
        <text x="697" y="140" text-anchor="middle" fill="#4ade80" font-size="9" font-weight="bold">NAME</text>

        <!-- Permission decoding section -->
        <rect x="10" y="178" width="720" height="248" rx="10" fill="#0a1520" stroke="#334155" stroke-width="1"/>
        <text x="370" y="200" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="Space Grotesk">Permission Bits Deep Dive — r=4  w=2  x=1  -=0</text>

        <!-- Individual bits -->
        <rect x="26"  y="212" width="52" height="56" rx="6" fill="#182035" stroke="#34d399" stroke-width="1.5"/>
        <text x="52"  y="236" text-anchor="middle" fill="#34d399" font-size="22" font-family="JetBrains Mono">r</text>
        <text x="52"  y="252" text-anchor="middle" fill="#94a3b8" font-size="10">read</text>
        <text x="52"  y="264" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold">= 4</text>

        <rect x="88"  y="212" width="52" height="56" rx="6" fill="#182035" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="114" y="236" text-anchor="middle" fill="#fbbf24" font-size="22" font-family="JetBrains Mono">w</text>
        <text x="114" y="252" text-anchor="middle" fill="#94a3b8" font-size="10">write</text>
        <text x="114" y="264" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold">= 2</text>

        <rect x="150" y="212" width="52" height="56" rx="6" fill="#182035" stroke="#f87171" stroke-width="1.5"/>
        <text x="176" y="236" text-anchor="middle" fill="#f87171" font-size="22" font-family="JetBrains Mono">x</text>
        <text x="176" y="252" text-anchor="middle" fill="#94a3b8" font-size="10">execute</text>
        <text x="176" y="264" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold">= 1</text>

        <rect x="212" y="212" width="52" height="56" rx="6" fill="#182035" stroke="#334155" stroke-width="1"/>
        <text x="238" y="236" text-anchor="middle" fill="#64748b" font-size="22" font-family="JetBrains Mono">-</text>
        <text x="238" y="252" text-anchor="middle" fill="#64748b" font-size="10">none</text>
        <text x="238" y="264" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">= 0</text>

        <text x="306" y="248" text-anchor="middle" fill="#94a3b8" font-size="28">→</text>

        <!-- Common combos -->
        <rect x="336" y="212" width="62" height="56" rx="6" fill="#182035" stroke="#22d3ee" stroke-width="2"/>
        <text x="367" y="234" text-anchor="middle" fill="#22d3ee" font-size="14" font-family="JetBrains Mono">rwx</text>
        <text x="367" y="252" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold">= 7</text>
        <text x="367" y="266" text-anchor="middle" fill="#64748b" font-size="8">full access</text>

        <rect x="408" y="212" width="62" height="56" rx="6" fill="#182035" stroke="#a78bfa" stroke-width="2"/>
        <text x="439" y="234" text-anchor="middle" fill="#a78bfa" font-size="14" font-family="JetBrains Mono">rw-</text>
        <text x="439" y="252" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold">= 6</text>
        <text x="439" y="266" text-anchor="middle" fill="#64748b" font-size="8">data files</text>

        <rect x="480" y="212" width="62" height="56" rx="6" fill="#182035" stroke="#34d399" stroke-width="2"/>
        <text x="511" y="234" text-anchor="middle" fill="#34d399" font-size="14" font-family="JetBrains Mono">r-x</text>
        <text x="511" y="252" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold">= 5</text>
        <text x="511" y="266" text-anchor="middle" fill="#64748b" font-size="8">scripts</text>

        <rect x="552" y="212" width="62" height="56" rx="6" fill="#182035" stroke="#fbbf24" stroke-width="2"/>
        <text x="583" y="234" text-anchor="middle" fill="#fbbf24" font-size="14" font-family="JetBrains Mono">r--</text>
        <text x="583" y="252" text-anchor="middle" fill="#fbbf24" font-size="14" font-weight="bold">= 4</text>
        <text x="583" y="266" text-anchor="middle" fill="#64748b" font-size="8">read only</text>

        <rect x="624" y="212" width="96" height="56" rx="6" fill="#182035" stroke="#64748b" stroke-width="2"/>
        <text x="672" y="228" text-anchor="middle" fill="#64748b" font-size="11" font-family="JetBrains Mono">---</text>
        <text x="672" y="244" text-anchor="middle" fill="#64748b" font-size="14" font-weight="bold">= 0</text>
        <text x="672" y="260" text-anchor="middle" fill="#64748b" font-size="8">no access</text>

        <!-- Chmod line -->
        <rect x="26" y="284" width="694" height="42" rx="6" fill="#001400" stroke="#4ade80" stroke-width="1"/>
        <text x="370" y="302" text-anchor="middle" fill="#4ade80" font-size="12" font-family="JetBrains Mono">chmod 755 file  =  owner:rwx(7)  group:r-x(5)  others:r-x(5)</text>
        <text x="370" y="320" text-anchor="middle" fill="#64748b" font-size="10">chmod 644 = -rw-r--r-- (typical data file)  ·  chmod 755 = -rwxr-xr-x (scripts/dirs)</text>

        <text x="370" y="360" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="JetBrains Mono">For directories: x = "can enter this dir with cd" (not just list it)</text>
        <text x="370" y="380" text-anchor="middle" fill="#64748b" font-size="10">Without x on a dir: ls shows its contents, but cd into it fails with Permission denied</text>
        <text x="370" y="400" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="bold">ls shows you what's there — chmod changes the permissions you see</text>
        <text x="370" y="416" text-anchor="middle" fill="#64748b" font-size="10">Use: chmod 755 script.sh   chmod 644 data.csv   chmod 700 secrets/</text>
    </svg>
    <div class="caption">Every ls -l line is dense with information — learn to read each column at a glance. This becomes automatic with practice.</div>
</div>

<h4>🎨 ls Color Guide — What Each Color Means</h4>
<div class="visual-container">
    <svg viewBox="0 0 720 150" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">ls --color Output — Each Color Has a Specific Meaning</text>

        <rect x="18"  y="34" width="100" height="100" rx="8" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="68"  y="72" text-anchor="middle" fill="#22d3ee" font-size="30">📁</text>
        <text x="68"  y="92" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">BLUE</text>
        <text x="68"  y="108" text-anchor="middle" fill="#64748b" font-size="9">Directories</text>
        <text x="68"  y="122" text-anchor="middle" fill="#64748b" font-size="8">cd into these</text>

        <rect x="128" y="34" width="100" height="100" rx="8" fill="#0a1520" stroke="#4ade80" stroke-width="2"/>
        <text x="178" y="72" text-anchor="middle" fill="#4ade80" font-size="30">⚙️</text>
        <text x="178" y="92" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold" font-family="JetBrains Mono">GREEN</text>
        <text x="178" y="108" text-anchor="middle" fill="#64748b" font-size="9">Executables</text>
        <text x="178" y="122" text-anchor="middle" fill="#64748b" font-size="8">Scripts, programs</text>

        <rect x="238" y="34" width="100" height="100" rx="8" fill="#0a1520" stroke="#e2e8f0" stroke-width="2"/>
        <text x="288" y="72" text-anchor="middle" fill="#e2e8f0" font-size="30">📄</text>
        <text x="288" y="92" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="JetBrains Mono">WHITE</text>
        <text x="288" y="108" text-anchor="middle" fill="#64748b" font-size="9">Regular files</text>
        <text x="288" y="122" text-anchor="middle" fill="#64748b" font-size="8">Text, data, config</text>

        <rect x="348" y="34" width="100" height="100" rx="8" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="398" y="72" text-anchor="middle" fill="#22d3ee" font-size="30">🔗</text>
        <text x="398" y="92" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">CYAN</text>
        <text x="398" y="108" text-anchor="middle" fill="#64748b" font-size="9">Symlinks</text>
        <text x="398" y="122" text-anchor="middle" fill="#64748b" font-size="8">Shortcuts/aliases</text>

        <rect x="458" y="34" width="100" height="100" rx="8" fill="#0a1520" stroke="#f87171" stroke-width="2"/>
        <text x="508" y="72" text-anchor="middle" fill="#f87171" font-size="30">📦</text>
        <text x="508" y="92" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold" font-family="JetBrains Mono">RED</text>
        <text x="508" y="108" text-anchor="middle" fill="#64748b" font-size="9">Archives</text>
        <text x="508" y="122" text-anchor="middle" fill="#64748b" font-size="8">.tar.gz .zip .bz2</text>

        <rect x="568" y="34" width="134" height="100" rx="8" fill="#0a1520" stroke="#fbbf24" stroke-width="2"/>
        <text x="635" y="72" text-anchor="middle" fill="#fbbf24" font-size="30">🖥️</text>
        <text x="635" y="92" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">YELLOW</text>
        <text x="635" y="108" text-anchor="middle" fill="#64748b" font-size="9">Device files</text>
        <text x="635" y="122" text-anchor="middle" fill="#64748b" font-size="8">/dev/ entries</text>
    </svg>
</div>

<div class="tip-box">
    <h4>🎯 The Most Useful ls Combinations</h4>
    <p>
        <code>ls -la</code> → Everything including hidden files, full details<br>
        <code>ls -lah</code> → Same + human-readable sizes<br>
        <code>ls -lhS</code> → Sorted by size, largest first (find what's big)<br>
        <code>ls -lht</code> → Sorted by time, newest first (what changed?)<br>
        <code>ls -lhtr</code> → Sorted by time, oldest first (read log chronology)<br>
        <code>ls -ld /path</code> → Show the directory itself, not its contents<br>
        <code>ls -lahS /var/log/</code> → All logs sorted by size with human-readable values
    </p>
</div>
`
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 6 — Linux Directory Structure (FHS)
// ══════════════════════════════════════════════════════════════════════
{
    id: "linux_directory_structure",
    content: `
<h3>🌳 Linux FHS — The Complete Directory Map</h3>

<div class="info-box">
    <h4>💡 What Is FHS?</h4>
    <p><strong>FHS = Filesystem Hierarchy Standard</strong>. It's the specification that defines where everything belongs in a Linux system. <em>Every</em> Linux distribution — Ubuntu, CentOS, Debian, Amazon Linux, Alpine, even Docker containers — follows this standard. Once you know FHS, you can SSH into any Linux server in the world and immediately know where to look for configs, logs, programs, and data. It's the universal map.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">exploring_fhs_complete.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ EXPLORE THE TOP LEVEL ════</span>
<span class="prompt">$</span> ls /
<span class="output">bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var</span>

<span class="comment"># ════ /bin — Essential user command binaries ════</span>
<span class="comment"># Every command you use daily lives here</span>
<span class="prompt">$</span> ls /bin | head -20
<span class="output">bash  cat  cd  chmod  cp  date  echo  grep  ls  mkdir  mv  pwd  rm  sed  sh  touch</span>
<span class="prompt">$</span> which ls                    <span class="comment"># Where does ls actually live?</span>
<span class="output">/usr/bin/ls                  # (on modern Ubuntu, /bin → /usr/bin symlink)</span>

<span class="comment"># ════ /etc — ALL system configuration ════</span>
<span class="comment"># The first place you check when anything stops working</span>
<span class="prompt">$</span> ls /etc | head -30
<span class="output">apt  bash.bashrc  crontab  default  environment  fstab  group  hosts  hostname  passwd  profile  shadow  ssh</span>

<span class="prompt">$</span> cat /etc/hostname           <span class="comment"># Machine name</span>
<span class="output">prod-spark-master-01</span>

<span class="prompt">$</span> cat /etc/hosts              <span class="comment"># Local DNS — hostname-to-IP map</span>
<span class="output">127.0.0.1   localhost</span>
<span class="output">10.0.0.5    kafka-broker-01</span>
<span class="output">10.0.0.6    spark-master</span>
<span class="comment"># Add server names here to use hostnames instead of IPs!</span>

<span class="prompt">$</span> cat /etc/environment        <span class="comment"># System-wide environment variables</span>
<span class="output">PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"</span>
<span class="output">JAVA_HOME="/usr/lib/jvm/java-11"</span>

<span class="comment"># ════ /home — User home directories ════</span>
<span class="prompt">$</span> ls /home
<span class="output">anuj  deploy  riya</span>
<span class="comment"># Every user has a home: /home/anuj, /home/riya, etc.</span>
<span class="comment"># Root's home is special: /root (not /home/root)</span>

<span class="comment"># ════ /var — Variable data (changes while system runs) ════</span>
<span class="prompt">$</span> ls /var
<span class="output">backups  cache  lib  lock  log  mail  opt  run  spool  tmp</span>
<span class="prompt">$</span> ls /var/log | head -10
<span class="output">apache2  auth.log  dpkg.log  kern.log  nginx  syslog  wtmp</span>
<span class="comment"># /var/log is THE most important directory for debugging!</span>

<span class="comment"># ════ /opt — Optional/third-party applications ════</span>
<span class="prompt">$</span> ls /opt
<span class="output">airflow  conda  kafka  spark</span>
<span class="comment"># Big apps installed outside apt/yum package manager</span>
<span class="prompt">$</span> ls /opt/spark
<span class="output">bin  conf  data  examples  jars  licenses  python  sbin</span>
<span class="prompt">$</span> ls /opt/spark/bin
<span class="output">beeline  pyspark  run-example  spark-class  spark-shell  spark-submit</span>

<span class="comment"># ════ /tmp — Temporary files ════</span>
<span class="prompt">$</span> ls -lah /tmp | head -10
<span class="comment"># Files here are DELETED on every system reboot</span>
<span class="comment"># Safe for temp work, NEVER for important data</span>
<span class="prompt">$</span> echo "test" > /tmp/my_test_file.txt   <span class="comment"># Write a temp file</span>
<span class="prompt">$</span> cat /tmp/my_test_file.txt             <span class="comment"># Read it</span>

<span class="comment"># ════ /proc — Virtual filesystem (kernel interface) ════</span>
<span class="comment"># Files here don't exist on disk — kernel generates them on-demand!</span>
<span class="prompt">$</span> cat /proc/version
<span class="output">Linux version 5.15.0-91-generic (Ubuntu)</span>
<span class="prompt">$</span> cat /proc/cpuinfo | grep "model name" | uniq
<span class="output">model name : Intel(R) Xeon(R) Platinum 8275CL CPU @ 3.00GHz</span>
<span class="prompt">$</span> cat /proc/meminfo | grep MemTotal
<span class="output">MemTotal:       16384000 kB    # 16 GB RAM</span>
<span class="prompt">$</span> cat /proc/uptime
<span class="output">864321.58 3215678.23           # seconds running, seconds idle</span>
<span class="prompt">$</span> ls /proc/$$                  <span class="comment"># $$ = current shell's PID — see YOUR process!</span>
<span class="output">cmdline  cwd  environ  exe  fd  maps  mem  mounts  stat  status</span>

<span class="comment"># ════ /usr — Unix System Resources ════</span>
<span class="prompt">$</span> ls /usr
<span class="output">bin  include  lib  local  sbin  share</span>
<span class="prompt">$</span> which python3
<span class="output">/usr/bin/python3</span>
<span class="prompt">$</span> which spark-submit
<span class="output">/opt/spark/bin/spark-submit</span>

<span class="comment"># ════ Finding where commands live ════</span>
<span class="prompt">$</span> which grep awk sed sort    <span class="comment"># Find multiple commands</span>
<span class="output">/usr/bin/grep</span>
<span class="output">/usr/bin/awk</span>
<span class="output">/usr/bin/sed</span>
<span class="output">/usr/bin/sort</span>
<span class="prompt">$</span> type python3               <span class="comment"># More info than which</span>
<span class="output">python3 is hashed (/usr/bin/python3)</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes dirFade { 0%,100%{opacity:0.5} 50%{opacity:1} }
                .df1{animation:dirFade 3s ease-in-out infinite 0.0s}
                .df2{animation:dirFade 3s ease-in-out infinite 0.4s}
                .df3{animation:dirFade 3s ease-in-out infinite 0.8s}
                .df4{animation:dirFade 3s ease-in-out infinite 1.2s}
            </style>
        </defs>
        <text x="360" y="18" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">FHS — What Data Engineers Care About In Each Directory</text>

        <!-- 4-column directory reference -->
        <rect x="10"  y="28" width="168" height="280" rx="8" fill="#0a1520" stroke="#fbbf24" stroke-width="2" class="df1"/>
        <text x="94"  y="50" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="bold" font-family="JetBrains Mono">/etc</text>
        <text x="94"  y="66" text-anchor="middle" fill="#fbbf24" font-size="9">System Config Files</text>
        <text x="22"  y="86" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/etc/hostname</text>
        <text x="22"  y="100" fill="#64748b" font-size="8">machine name</text>
        <text x="22"  y="118" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/etc/hosts</text>
        <text x="22"  y="132" fill="#64748b" font-size="8">hostname → IP map</text>
        <text x="22"  y="150" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/etc/crontab</text>
        <text x="22"  y="164" fill="#64748b" font-size="8">scheduled jobs</text>
        <text x="22"  y="182" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/etc/environment</text>
        <text x="22"  y="196" fill="#64748b" font-size="8">global env vars</text>
        <text x="22"  y="214" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/etc/passwd</text>
        <text x="22"  y="228" fill="#64748b" font-size="8">user accounts</text>
        <text x="22"  y="246" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/etc/ssh/</text>
        <text x="22"  y="260" fill="#64748b" font-size="8">SSH server config</text>
        <text x="22"  y="278" fill="#64748b" font-size="8" font-style="italic">Check here first when</text>
        <text x="22"  y="292" fill="#64748b" font-size="8" font-style="italic">something breaks</text>

        <rect x="188" y="28" width="168" height="280" rx="8" fill="#0a1520" stroke="#fb923c" stroke-width="2" class="df2"/>
        <text x="272" y="50" text-anchor="middle" fill="#fb923c" font-size="13" font-weight="bold" font-family="JetBrains Mono">/var</text>
        <text x="272" y="66" text-anchor="middle" fill="#fb923c" font-size="9">Variable / Live Data</text>
        <text x="200" y="86" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/var/log/</text>
        <text x="200" y="100" fill="#64748b" font-size="8">ALL system logs</text>
        <text x="200" y="118" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/var/log/syslog</text>
        <text x="200" y="132" fill="#64748b" font-size="8">general system log</text>
        <text x="200" y="150" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/var/log/auth.log</text>
        <text x="200" y="164" fill="#64748b" font-size="8">login/sudo events</text>
        <text x="200" y="182" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/var/lib/</text>
        <text x="200" y="196" fill="#64748b" font-size="8">databases, state</text>
        <text x="200" y="214" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/var/cache/</text>
        <text x="200" y="228" fill="#64748b" font-size="8">apt cache, build cache</text>
        <text x="200" y="246" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/var/spool/</text>
        <text x="200" y="260" fill="#64748b" font-size="8">print/mail queues</text>
        <text x="200" y="278" fill="#64748b" font-size="8" font-style="italic">Grows! Watch disk</text>
        <text x="200" y="292" fill="#64748b" font-size="8" font-style="italic">space here</text>

        <rect x="366" y="28" width="168" height="280" rx="8" fill="#0a1520" stroke="#a78bfa" stroke-width="2" class="df3"/>
        <text x="450" y="50" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="JetBrains Mono">/opt</text>
        <text x="450" y="66" text-anchor="middle" fill="#a78bfa" font-size="9">Optional 3rd-Party Apps</text>
        <text x="378" y="86" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/opt/spark/</text>
        <text x="378" y="100" fill="#64748b" font-size="8">Apache Spark</text>
        <text x="378" y="118" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/opt/kafka/</text>
        <text x="378" y="132" fill="#64748b" font-size="8">Apache Kafka</text>
        <text x="378" y="150" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/opt/conda/</text>
        <text x="378" y="164" fill="#64748b" font-size="8">Anaconda/Miniconda</text>
        <text x="378" y="182" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/opt/airflow/</text>
        <text x="378" y="196" fill="#64748b" font-size="8">Apache Airflow</text>
        <text x="378" y="214" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/opt/hadoop/</text>
        <text x="378" y="228" fill="#64748b" font-size="8">Apache Hadoop</text>
        <text x="378" y="246" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/opt/jdk/</text>
        <text x="378" y="260" fill="#64748b" font-size="8">Java SDK</text>
        <text x="378" y="278" fill="#64748b" font-size="8" font-style="italic">Where the big</text>
        <text x="378" y="292" fill="#64748b" font-size="8" font-style="italic">tools live</text>

        <rect x="544" y="28" width="168" height="280" rx="8" fill="#0a1520" stroke="#64748b" stroke-width="2" class="df4"/>
        <text x="628" y="50" text-anchor="middle" fill="#64748b" font-size="13" font-weight="bold" font-family="JetBrains Mono">/proc</text>
        <text x="628" y="66" text-anchor="middle" fill="#64748b" font-size="9">Kernel Virtual FS</text>
        <text x="556" y="86" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/proc/cpuinfo</text>
        <text x="556" y="100" fill="#64748b" font-size="8">CPU model, cores</text>
        <text x="556" y="118" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/proc/meminfo</text>
        <text x="556" y="132" fill="#64748b" font-size="8">RAM total/free/used</text>
        <text x="556" y="150" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/proc/uptime</text>
        <text x="556" y="164" fill="#64748b" font-size="8">seconds since boot</text>
        <text x="556" y="182" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/proc/[PID]/</text>
        <text x="556" y="196" fill="#64748b" font-size="8">per-process details</text>
        <text x="556" y="214" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/proc/version</text>
        <text x="556" y="228" fill="#64748b" font-size="8">kernel version</text>
        <text x="556" y="246" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">/proc/net/</text>
        <text x="556" y="260" fill="#64748b" font-size="8">network stats</text>
        <text x="556" y="278" fill="#64748b" font-size="8" font-style="italic">Files don't exist</text>
        <text x="556" y="292" fill="#64748b" font-size="8" font-style="italic">on disk — kernel live</text>
    </svg>
    <div class="caption">Knowing FHS means you can navigate ANY Linux server instantly — Ubuntu, CentOS, Docker containers, cloud VMs all use the same layout.</div>
</div>
`
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 7 — Hidden Files & Dotfiles
// ══════════════════════════════════════════════════════════════════════
{
    id: "hidden_files",
    content: `
<h3>🔍 Hidden Files & Dotfiles — The Invisible Configuration Layer</h3>

<div class="story-box">
    <h4>🎭 The Secret Files That Configure Everything</h4>
    <p>Open your home directory in a file manager and you'll see a handful of folders. Open it with <code>ls -la</code> in a terminal and you'll see a completely different picture — dozens of hidden files and directories whose names start with a dot. These <strong>dotfiles</strong> are where your entire environment is configured: shell settings, SSH keys, Git identity, Python virtual environments, editor preferences, database credentials, API keys. Understanding dotfiles is understanding <em>how your Linux environment actually works</em>.</p>
</div>

<h4>📖 Dotfiles Terminology</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>🔵 Dotfile / Dotdir</h5>
        <p>Any file or directory whose name begins with a dot (<code>.</code>). Hidden from <code>ls</code> by default. Not locked or encrypted — just conventionally hidden to reduce clutter. Examples: <code>.bashrc</code>, <code>.ssh/</code>, <code>.gitconfig</code>.</p>
    </div>
    <div class="mini-card">
        <h5>🔧 RC File</h5>
        <p><strong>Run Commands</strong> file — a configuration file that is automatically executed when a program starts. <code>.bashrc</code> = Bash Run Commands. <code>.vimrc</code> = Vim Run Commands. These files let you customize program behavior permanently.</p>
    </div>
    <div class="mini-card">
        <h5>📜 source</h5>
        <p>The shell command that <strong>executes a file in the current shell</strong> (instead of a child process). <code>source ~/.bashrc</code> applies all your .bashrc changes immediately without logging out. Also written as <code>. ~/.bashrc</code> (dot space filename).</p>
    </div>
    <div class="mini-card">
        <h5>🌍 Environment Variable</h5>
        <p>A named variable that is <strong>available to all programs</strong> started from your shell. Set with <code>export VARNAME=value</code>. Programs read them with <code>os.environ['VARNAME']</code> in Python. Examples: PATH, HOME, JAVA_HOME, SPARK_HOME.</p>
    </div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">dotfiles_complete_guide.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ Reveal the hidden world ════</span>
<span class="prompt">$</span> ls                          <span class="comment"># Normal view — dotfiles invisible</span>
<span class="output">data  projects  scripts</span>

<span class="prompt">$</span> ls -a                        <span class="comment"># -a = ALL including hidden</span>
<span class="output">.  ..  .bash_history  .bashrc  .cache  .config  .gitconfig  .local  .profile  .ssh  data  projects  scripts</span>

<span class="prompt">$</span> ls -la                       <span class="comment"># Long + all — reveals everything</span>
<span class="output">total 96</span>
<span class="output">drwxr-xr-x 12 anuj anuj 4096 Mar 09 .              ← current dir</span>
<span class="output">drwxr-xr-x  5 root root 4096 Mar 01 ..             ← parent dir</span>
<span class="output">-rw-------  1 anuj anuj 8192 Mar 09 .bash_history   ← your command history!</span>
<span class="output">-rw-r--r--  1 anuj anuj  220 Mar 01 .bash_logout</span>
<span class="output">-rw-r--r--  1 anuj anuj 3526 Mar 01 .bashrc         ← shell configuration</span>
<span class="output">drwxr-xr-x  4 anuj anuj 4096 Mar 05 .cache/</span>
<span class="output">drwxr-xr-x  8 anuj anuj 4096 Mar 05 .config/</span>
<span class="output">-rw-r--r--  1 anuj anuj  196 Mar 03 .gitconfig      ← git user/settings</span>
<span class="output">drwxr-xr-x  3 anuj anuj 4096 Mar 03 .local/</span>
<span class="output">-rw-r--r--  1 anuj anuj  807 Mar 01 .profile</span>
<span class="output">drwx------  2 anuj anuj 4096 Mar 01 .ssh/           ← SSH keys (PRIVATE!)</span>

<span class="comment"># ════ The Key Dotfiles ════</span>
<span class="prompt">$</span> cat ~/.bashrc | head -30     <span class="comment"># Shell config — aliases, PATH, functions</span>
<span class="prompt">$</span> wc -l ~/.bash_history         <span class="comment"># How many commands you've ever run</span>
<span class="output">847</span>
<span class="prompt">$</span> ls -la ~/.ssh/
<span class="output">drwx------  2 anuj anuj 4096 .           ← 700 permissions (MUST be this!)</span>
<span class="output">drwxr-xr-x 12 anuj anuj 4096 ..</span>
<span class="output">-rw-------  1 anuj anuj 2590 id_rsa      ← private key (600 permissions!)</span>
<span class="output">-rw-r--r--  1 anuj anuj  563 id_rsa.pub  ← public key (share this)</span>
<span class="output">-rw-r--r--  1 anuj anuj 1024 known_hosts ← servers you've connected to</span>
<span class="comment"># SSH refuses to work if key permissions are too open!</span>

<span class="prompt">$</span> cat ~/.gitconfig
<span class="output">[user]</span>
<span class="output">    name = Anuj Sharma</span>
<span class="output">    email = anuj@company.com</span>
<span class="output">[core]</span>
<span class="output">    editor = vim</span>

<span class="comment"># ════ ~/.config — XDG config directory ════</span>
<span class="prompt">$</span> ls ~/.config/
<span class="output">conda  git  htop  pip  pulse  vim</span>
<span class="prompt">$</span> cat ~/.config/pip/pip.conf   <span class="comment"># pip configuration</span>

<span class="comment"># ════ Data engineering specific dotfiles ════</span>
<span class="prompt">$</span> cat ~/.condarc               <span class="comment"># conda channels, settings</span>
<span class="prompt">$</span> ls ~/anaconda3/envs/         <span class="comment"># your conda environments</span>
<span class="output">base  pyspark_env  ml_env  data_science</span>
<span class="prompt">$</span> cat ~/.local/share/jupyter/  <span class="comment"># Jupyter config</span>

<span class="comment"># ════ Creating/editing your .bashrc ════</span>
<span class="prompt">$</span> echo '# My custom config' >> ~/.bashrc
<span class="prompt">$</span> echo 'alias ll="ls -lahF --color=auto"' >> ~/.bashrc
<span class="prompt">$</span> echo 'alias ..="cd .."' >> ~/.bashrc
<span class="prompt">$</span> echo 'alias gs="git status"' >> ~/.bashrc
<span class="prompt">$</span> echo 'export SPARK_HOME=/opt/spark' >> ~/.bashrc
<span class="prompt">$</span> echo 'export PATH="\$SPARK_HOME/bin:\$PATH"' >> ~/.bashrc
<span class="prompt">$</span> source ~/.bashrc             <span class="comment"># Apply now! (no logout needed)</span>
<span class="prompt">$</span> ll                           <span class="comment"># Test the new alias!</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">~/.bashrc — Your Shell's Startup Script (Runs on Every New Terminal)</text>

        <rect x="14" y="32" width="692" height="176" rx="12" fill="#001400" stroke="#4ade80" stroke-width="1.5"/>
        <text x="34"  y="56"  fill="#6a9955" font-size="10.5" font-family="JetBrains Mono"># ~/.bashrc — executed for every new interactive bash shell</text>
        <text x="34"  y="74"  fill="#6a9955" font-size="10.5" font-family="JetBrains Mono"># ════ ENVIRONMENT VARIABLES — programs will see these ════</text>
        <text x="34"  y="90"  fill="#4ade80" font-size="10.5" font-family="JetBrains Mono">export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64</text>
        <text x="34"  y="106" fill="#4ade80" font-size="10.5" font-family="JetBrains Mono">export SPARK_HOME=/opt/spark</text>
        <text x="34"  y="122" fill="#4ade80" font-size="10.5" font-family="JetBrains Mono">export PATH="\$SPARK_HOME/bin:\$JAVA_HOME/bin:\$PATH"</text>
        <text x="34"  y="140" fill="#6a9955" font-size="10.5" font-family="JetBrains Mono"># ════ ALIASES — shortcuts for long commands ════</text>
        <text x="34"  y="156" fill="#4ade80" font-size="10.5" font-family="JetBrains Mono">alias ll='ls -lahF --color=auto'   # ll for full listing</text>
        <text x="34"  y="172" fill="#4ade80" font-size="10.5" font-family="JetBrains Mono">alias gs='git status'               # gs = git status</text>
        <text x="34"  y="188" fill="#4ade80" font-size="10.5" font-family="JetBrains Mono">alias ..='cd ..'  ...</ fill="#4ade80" font-size="10.5" font-family="JetBrains Mono">alias py='python3'</text>
        <text x="580" y="204" fill="#64748b" font-size="9" font-style="italic">source ~/.bashrc to apply</text>
    </svg>
    <div class="caption">~/.bashrc runs every time you open a new terminal — your aliases, PATH extensions, and environment variables go here.</div>
</div>

<div class="deep-dive-box">
    <h4>🔬 The Accidental Feature — Why Are Dotfiles Hidden?</h4>
    <p>Ken Thompson (creator of Unix) has admitted that hiding dotfiles was an <em>accident</em>. When implementing <code>ls</code>, he wanted to skip the <code>.</code> (current dir) and <code>..</code> (parent dir) entries to avoid cluttering output. He wrote: <code>if (name[0] == '.') skip;</code> — a one-liner check. As a side effect, <em>all</em> files starting with a dot got hidden. The feature was never intentional, but the entire Unix world adopted it. This "mistake" became the foundation for how configuration files are organized in every Unix-like system today.</p>
</div>
`
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 8 — Tab Completion & Power Navigation
// ══════════════════════════════════════════════════════════════════════
{
    id: "navigation_power",
    content: `
<h3>⚡ Power Navigation — Work 10x Faster</h3>

<div class="info-box">
    <h4>💡 The Rule Professionals Follow: Never Type a Full Path Twice</h4>
    <p>Senior Linux engineers don't hunt-and-peck at keyboards. They use Tab completion, history navigation, keyboard shortcuts, and directory stack tools. These aren't shortcuts — they're <em>fundamentals</em>. The difference between a beginner and a professional is often not knowledge but <strong>navigation speed</strong>.</p>
</div>

<h4>⌨️ Tab Completion — The Most Important Keyboard Shortcut in Linux</h4>
<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">tab_completion_complete.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ COMMAND COMPLETION ════</span>
<span class="prompt">$</span> pytho[TAB]                  <span class="comment"># → python3</span>
<span class="prompt">$</span> sys[TAB][TAB]               <span class="comment"># Double-TAB shows ALL matches</span>
<span class="output">systemctl     systemd          systemd-analyze  systemd-cat</span>
<span class="output">systemd-cgls  systemd-cgtop    systemd-delta    systemd-detect</span>
<span class="comment"># Now type more letters to narrow down</span>

<span class="comment"># ════ PATH COMPLETION ════</span>
<span class="prompt">$</span> cd /home/a[TAB]             <span class="comment"># → /home/anuj/ (if only one user starting with a)</span>
<span class="prompt">$</span> ls /var/lo[TAB]             <span class="comment"># → /var/log/</span>
<span class="prompt">$</span> cat /etc/bas[TAB]           <span class="comment"># → /etc/bash.bashrc</span>
<span class="prompt">$</span> cd /opt/sp[TAB]             <span class="comment"># → /opt/spark/</span>
<span class="prompt">$</span> cat /opt/spark/co[TAB]      <span class="comment"># → /opt/spark/conf/ (if only match)</span>

<span class="comment"># ════ MULTIPLE MATCHES — press TAB twice ════</span>
<span class="prompt">$</span> cd /var/[TAB][TAB]
<span class="output">backups/  cache/  crash/  lib/  local/  lock/  log/  mail/  opt/  run/  snap/  spool/  tmp/</span>
<span class="comment"># Type 'lo' then TAB again → /var/log/ (narrows to unique)</span>

<span class="comment"># ════ FILENAME COMPLETION ════</span>
<span class="prompt">$</span> python3 data_proc[TAB]      <span class="comment"># → data_processing_pipeline.py</span>
<span class="prompt">$</span> vim ~[TAB][TAB]             <span class="comment"># Show everything in your home</span>

<span class="comment"># ════ IMPORTANT TAB RULES ════</span>
<span class="comment"># Tab doesn't complete? Either:</span>
<span class="comment">#   a) Spelling is wrong — recheck your path</span>
<span class="comment">#   b) File doesn't exist — confirm with ls</span>
<span class="comment">#   c) Multiple matches — press Tab TWICE to see all options</span>
<span class="comment"># Tab is smarter with bash-completion installed:</span>
<span class="prompt">$</span> sudo apt install bash-completion  <span class="comment"># Enables completion for git, docker, pip, etc.</span>
<span class="prompt">$</span> git check[TAB][TAB]
<span class="output">checkout  cherry-pick  check-attr  check-ignore  check-mailmap</span></div>
</div>

<h4>🕐 History Navigation — Access Any Command You've Run</h4>
<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">history_shortcuts.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ ARROW KEYS ════</span>
<span class="comment"># UP arrow   = previous command</span>
<span class="comment"># DOWN arrow = next command</span>
<span class="comment"># Press UP 3 times = 3 commands ago</span>

<span class="comment"># ════ Ctrl+R — REVERSE SEARCH (the killer feature!) ════</span>
<span class="prompt">$</span> [Ctrl+R]
<span class="output">(reverse-i-search)'': </span>
<span class="comment"># Start typing any part of a previous command:</span>
<span class="output">(reverse-i-search)'spark': spark-submit --master yarn pipeline.py</span>
<span class="comment"># Press ENTER to run it, or Ctrl+R again to go further back</span>
<span class="comment"># This searches your ENTIRE bash history (~/.bash_history)</span>

<span class="comment"># ════ history command ════</span>
<span class="prompt">$</span> history                     <span class="comment"># Show all past commands with line numbers</span>
<span class="prompt">$</span> history 20                  <span class="comment"># Last 20 commands</span>
<span class="prompt">$</span> history | grep "cd /var"    <span class="comment"># Find all times you cd'd to /var</span>
<span class="prompt">$</span> !847                        <span class="comment"># Re-run history line 847 exactly</span>
<span class="prompt">$</span> !!                          <span class="comment"># Re-run the LAST command</span>
<span class="prompt">$</span> !spark                      <span class="comment"># Re-run the most recent command starting with "spark"</span>
<span class="prompt">$</span> sudo !!                     <span class="comment"># Re-run last command WITH sudo (very useful!)</span>

<span class="comment"># ════ Keyboard Shortcuts ════</span>
<span class="comment"># Ctrl+A = go to Beginning of line</span>
<span class="comment"># Ctrl+E = go to End of line</span>
<span class="comment"># Ctrl+K = Kill (delete) from cursor to end</span>
<span class="comment"># Ctrl+U = Kill from cursor to start</span>
<span class="comment"># Ctrl+W = delete one Word backwards</span>
<span class="comment"># Alt+F  = move Forward one word</span>
<span class="comment"># Alt+B  = move Backward one word</span>
<span class="comment"># Ctrl+L = Clear screen (like running clear)</span></div>
</div>

<h4>📚 pushd/popd — The Directory Stack</h4>
<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">pushd_popd_guide.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># Problem: You're deep in a directory tree</span>
<span class="comment"># You need to quickly go elsewhere and come back</span>
<span class="comment"># cd - only gives you ONE step back</span>

<span class="comment"># ════ The pushd/popd Solution ════</span>
<span class="prompt">$</span> cd /home/anuj/projects/sales_pipeline/src
<span class="prompt">$</span> pushd /var/log/nginx         <span class="comment"># Save current, go to nginx logs</span>
<span class="output">/var/log/nginx /home/anuj/projects/sales_pipeline/src</span>

<span class="prompt">$</span> pushd /etc/nginx/conf.d      <span class="comment"># Push again — check nginx config</span>
<span class="output">/etc/nginx/conf.d /var/log/nginx /home/anuj/projects/sales_pipeline/src</span>

<span class="prompt">$</span> dirs                         <span class="comment"># View the whole stack</span>
<span class="output">/etc/nginx/conf.d /var/log/nginx /home/anuj/projects/sales_pipeline/src</span>

<span class="prompt">$</span> dirs -v                      <span class="comment"># Numbered view</span>
<span class="output"> 0  /etc/nginx/conf.d</span>
<span class="output"> 1  /var/log/nginx</span>
<span class="output"> 2  /home/anuj/projects/sales_pipeline/src</span>

<span class="prompt">$</span> popd                         <span class="comment"># Pop top, go to /var/log/nginx</span>
<span class="output">/var/log/nginx /home/anuj/projects/sales_pipeline/src</span>

<span class="prompt">$</span> popd                         <span class="comment"># Pop again, back to original!</span>
<span class="output">/home/anuj/projects/sales_pipeline/src</span>
<span class="prompt">$</span> pwd
<span class="output">/home/anuj/projects/sales_pipeline/src</span>
<span class="comment"># Zero retyping! You're exactly where you started.</span>

<span class="comment"># ════ Jump to specific stack position ════</span>
<span class="prompt">$</span> pushd /a && pushd /b && pushd /c  <span class="comment"># Build up a stack</span>
<span class="prompt">$</span> cd ~2                        <span class="comment"># Go to position 2 in stack</span></div>
</div>

<h4>🗂️ tree — Visual Directory Map</h4>
<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">tree_command.sh</span>
    </div>
    <div class="terminal-body"><span class="prompt">$</span> tree
<span class="output">.</span>
<span class="output">├── data</span>
<span class="output">│   ├── raw</span>
<span class="output">│   │   ├── sales_2023.csv</span>
<span class="output">│   │   └── sales_2024.csv</span>
<span class="output">│   └── processed</span>
<span class="output">│       └── sales_clean.parquet</span>
<span class="output">├── scripts</span>
<span class="output">│   ├── ingest.py</span>
<span class="output">│   └── transform.py</span>
<span class="output">└── pipeline.sh</span>
<span class="output">4 directories, 5 files</span>

<span class="prompt">$</span> tree -L 2                   <span class="comment"># Limit depth to 2 levels (avoid huge output)</span>
<span class="prompt">$</span> tree -d                     <span class="comment"># Show ONLY directories</span>
<span class="prompt">$</span> tree -h                     <span class="comment"># Show file sizes (human readable)</span>
<span class="prompt">$</span> tree -a                     <span class="comment"># Include hidden files</span>
<span class="prompt">$</span> tree --dirsfirst            <span class="comment"># Directories before files</span>
<span class="prompt">$</span> tree /etc | head -30        <span class="comment"># Show first 30 lines of /etc tree</span>

<span class="comment"># Install if needed:</span>
<span class="prompt">$</span> sudo apt install tree        <span class="comment"># Ubuntu/Debian</span>
<span class="prompt">$</span> sudo yum install tree        <span class="comment"># CentOS/RHEL/Amazon Linux</span></div>
</div>
`,
    interactiveExample: {
        explanation: "A complete professional navigation session — see all the commands working together in a realistic workflow.",
        code: `$ pwd
/home/anuj

$ ls -la
total 64
drwxr-xr-x 12 anuj anuj 4096 Mar 09 .
drwxr-xr-x  5 root root 4096 Mar 01 ..
-rw-------  1 anuj anuj 8192 Mar 09 .bash_history
-rw-r--r--  1 anuj anuj 3526 Mar 01 .bashrc
drwxr-xr-x  4 anuj anuj 4096 Mar 05 data/
drwxr-xr-x  3 anuj anuj 4096 Mar 08 projects/

$ cd data && pwd
/home/anuj/data

$ ls -lh
total 1.4G
-rw-r--r-- 1 anuj anuj 1.2G Mar 09 training_data.parquet
-rw-r--r-- 1 anuj anuj 210M Mar 08 sales_2024.csv
drwxr-xr-x 2 anuj anuj 4096 Mar 07 raw/

$ ls -lhS   # sort by size
-rw-r--r-- 1 anuj anuj 1.2G training_data.parquet
-rw-r--r-- 1 anuj anuj 210M sales_2024.csv

$ cd -      # toggle back to /home/anuj
/home/anuj

$ cd ~      # home (same)
$ pwd
/home/anuj

$ df -h     # disk space
Filesystem  Size  Used Avail Use%  Mounted on
/dev/sda1    50G   22G   26G   46%  /
/data/spark   2T  800G  1.2T   40%  /data`
    }
},

// ══════════════════════════════════════════════════════════════════════
// SECTION 9 — Real-World Navigation (Data Engineering)
// ══════════════════════════════════════════════════════════════════════
{
    id: "realworld_navigation",
    content: `
<h3>🏭 Real-World Navigation — How Data Engineers Use These Commands Daily</h3>

<div class="story-box">
    <h4>🚨 Scenario: 3 AM Production Alert — Pipeline Failed</h4>
    <p>Your PagerDuty fires. Airflow says a DAG failed. You SSH into the production server. You have one goal: <strong>diagnose the problem as fast as possible</strong>. This is where filesystem navigation mastery pays off — you need muscle memory, not thinking.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">incident_response_navigation.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ STEP 1: Orientate (5 seconds) ════</span>
<span class="prompt">$</span> pwd && whoami && hostname
<span class="output">/home/anuj</span>
<span class="output">anuj</span>
<span class="output">prod-spark-master-01</span>
<span class="comment"># Three commands, one line: Am I the right user on the right machine?</span>

<span class="comment"># ════ STEP 2: Check disk space first (most common cause) ════</span>
<span class="prompt">$</span> df -h
<span class="output">Filesystem     Size  Used Avail Use% Mounted on</span>
<span class="output">/dev/sda1       50G   49G  500M  99% /          ← CRITICAL!</span>
<span class="output">/data/spark      2T  800G  1.2T  40% /data</span>

<span class="comment"># ════ STEP 3: Find what's eating the disk ════</span>
<span class="prompt">$</span> du -sh /* 2>/dev/null | sort -rh | head -5
<span class="output">18G   /var</span>
<span class="output">12G   /home</span>
<span class="output"> 8G   /tmp</span>

<span class="prompt">$</span> du -sh /var/* 2>/dev/null | sort -rh | head -5
<span class="output">15G   /var/log</span>
<span class="output"> 2G   /var/lib</span>

<span class="prompt">$</span> ls -lhS /var/log/ | head -5
<span class="output">-rw-r--r-- 1 root root 12G Mar 09 syslog       ← Found it!</span>
<span class="output">-rw-r--r-- 1 root root  1G Mar 09 kern.log</span>

<span class="comment"># ════ STEP 4: Navigate to Airflow logs ════</span>
<span class="prompt">$</span> ls /opt/airflow/
<span class="output">dags  logs  plugins  airflow.cfg  airflow.db</span>

<span class="prompt">$</span> pushd /opt/airflow/logs       <span class="comment"># Save location, check logs</span>
<span class="prompt">$</span> ls -lt | head -5              <span class="comment"># Newest logs first</span>
<span class="output">drwxr-xr-x 2 airflow airflow 4096 Mar 09 03:42 daily_etl/</span>

<span class="prompt">$</span> cd daily_etl
<span class="prompt">$</span> ls -lt | head -3
<span class="output">-rw-r--r-- 1 airflow airflow 48392 Mar 09 03:42 run_id=2024-03-09.log</span>

<span class="prompt">$</span> tail -50 run_id=2024-03-09.log | grep -i "error\|except\|fail"
<span class="output">[2024-03-09 03:41:55] ERROR: Disk full writing to /var/log/airflow</span>
<span class="comment"># Found the root cause! disk full → logs can't write → pipeline fails</span>

<span class="prompt">$</span> popd                          <span class="comment"># Back to where we were instantly</span>

<span class="comment"># ════ STEP 5: Navigate to fix ════</span>
<span class="prompt">$</span> cd /var/log
<span class="prompt">$</span> ls -lhS | head -5             <span class="comment"># Biggest log files</span>
<span class="prompt">$</span> ls -lhtr | head -5            <span class="comment"># Oldest files (safe to remove?)</span></div>
</div>

<h4>📁 Building a Professional Project Structure</h4>
<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">professional_structure.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ Create complete data engineering project ════</span>
<span class="prompt">$</span> mkdir -p ~/projects/sales_pipeline/{src,tests,data/{raw,processed,output},logs,configs,notebooks,docs}

<span class="prompt">$</span> tree ~/projects/sales_pipeline
<span class="output">sales_pipeline/</span>
<span class="output">├── configs/</span>
<span class="output">├── data/</span>
<span class="output">│   ├── output/</span>
<span class="output">│   ├── processed/</span>
<span class="output">│   └── raw/</span>
<span class="output">├── docs/</span>
<span class="output">├── logs/</span>
<span class="output">├── notebooks/</span>
<span class="output">├── src/</span>
<span class="output">└── tests/</span>
<span class="output">8 directories, 0 files</span>

<span class="comment"># ════ Add initial files with brace expansion ════</span>
<span class="prompt">$</span> touch ~/projects/sales_pipeline/src/{ingest,transform,validate,load,utils}.py
<span class="prompt">$</span> touch ~/projects/sales_pipeline/configs/{dev,staging,prod}.yaml
<span class="prompt">$</span> touch ~/projects/sales_pipeline/{README.md,.gitignore,requirements.txt,Makefile}

<span class="comment"># ════ From syllabus: Create 100 files ════</span>
<span class="prompt">$</span> mkdir -p ~/dbda/test
<span class="prompt">$</span> touch ~/dbda/test/file_{001..100}.csv  <span class="comment"># Zero-padded for correct sorting!</span>
<span class="prompt">$</span> ls ~/dbda/test | wc -l
<span class="output">100</span>
<span class="prompt">$</span> ls ~/dbda/test | head -5
<span class="output">file_001.csv</span>
<span class="output">file_002.csv</span>
<span class="output">file_003.csv</span>
<span class="comment"># With zero-padding: 001, 002... sorts correctly alphabetically!</span>
<span class="comment"># Without zero-padding: file_1, file_10, file_100, file_11... (wrong order!)</span></div>
</div>

<div class="tip-box">
    <h4>🎯 The Professional Navigation Cheat Sheet</h4>
    <p>
        <strong>Where am I?</strong> <code>pwd</code><br>
        <strong>Go home:</strong> <code>cd ~</code> or just <code>cd</code><br>
        <strong>Last dir:</strong> <code>cd -</code><br>
        <strong>Up one:</strong> <code>cd ..</code> | <strong>Up two:</strong> <code>cd ../..</code><br>
        <strong>List (full):</strong> <code>ls -la</code><br>
        <strong>List (sizes):</strong> <code>ls -lah</code><br>
        <strong>By size:</strong> <code>ls -lhS</code> | <strong>By time:</strong> <code>ls -lht</code><br>
        <strong>Disk space:</strong> <code>df -h</code><br>
        <strong>Dir sizes:</strong> <code>du -sh *</code><br>
        <strong>Find big files:</strong> <code>find / -size +100M 2>/dev/null</code><br>
        <strong>Visual map:</strong> <code>tree -L 2</code><br>
        <strong>History search:</strong> <code>Ctrl+R</code>
    </p>
</div>
`
}

    ], // end sections

    practiceExercises: [
        {
            id: "nav_ex01",
            difficulty: "Easy",
            title: "System Orientation — Map Your Machine",
            description: "Start from scratch. Use pwd, cd, and ls to systematically explore the top level of your Linux system and understand exactly where you are.",
            starterCode: `# Q1: Where are you right now?
$ pwd

# Q2: List home directory with ALL details including hidden
$ ls -la ~

# Q3: Count total items in your home (visible + hidden)
$ ls -la ~ | wc -l

# Q4: Navigate to root and see everything at the top level
$ cd / && ls -l

# Q5: Go back home in ONE character
$ cd ~
$ pwd`,
            solution: `$ pwd
/home/anuj

$ ls -la ~
total 96
drwxr-xr-x 12 anuj anuj 4096 Mar 09 .
drwxr-xr-x  5 root root 4096 Mar 01 ..
-rw-------  1 anuj anuj 8192 Mar 09 .bash_history
-rw-r--r--  1 anuj anuj  220 Mar 01 .bash_logout
-rw-r--r--  1 anuj anuj 3526 Mar 01 .bashrc
drwx------  2 anuj anuj 4096 Mar 03 .ssh/
drwxr-xr-x  3 anuj anuj 4096 Mar 05 data/
drwxr-xr-x  4 anuj anuj 4096 Mar 07 projects/

$ ls -la ~ | wc -l
12    # includes total line + . + .. + all files

$ cd / && ls -l
total 80
lrwxrwxrwx  1 root root     7 Mar 01 bin -> usr/bin
drwxr-xr-x  4 root root  4096 Mar 01 boot/
drwxr-xr-x 18 root root  3900 Mar 09 dev/
drwxr-xr-x 93 root root  4096 Mar 09 etc/
drwxr-xr-x  5 root root  4096 Mar 01 home/
...

$ cd ~
$ pwd
/home/anuj`,
            explanation: "pwd tells you your exact location. ls -la shows EVERYTHING — the hidden dotfiles (starting with .) are where all your configuration lives. wc -l counts lines — note that ls -la always shows '. ' and '..' entries plus a 'total' header line, so subtract 3 from the count for actual files. cd / takes you to the filesystem root — the starting point of everything. cd ~ always brings you home instantly."
        },

        {
            id: "nav_ex02",
            difficulty: "Easy",
            title: "Absolute Path Navigation",
            description: "Practice navigating using absolute paths — paths that start with / and work from anywhere in the filesystem.",
            starterCode: `# Navigate to each location using ABSOLUTE paths

# 1. Go to root
$ cd /
$ pwd

# 2. Go directly to /var/log
$ cd /var/log
$ pwd

# 3. Without typing /home/yourusername, go home in one character
$ cd ~
$ pwd

# 4. Check what's in /etc (the config directory)
$ ls /etc | head -10

# 5. Check the system hostname
$ cat /etc/hostname

# 6. What kernel version?
$ cat /proc/version`,
            solution: `$ cd /
$ pwd
/

$ cd /var/log
$ pwd
/var/log

$ cd ~
$ pwd
/home/anuj

$ ls /etc | head -10
adduser.conf
alternatives/
apt/
bash.bashrc
ca-certificates.conf
calendar/
cron.d/
cron.daily/
crontab
debconf.conf

$ cat /etc/hostname
prod-server-01

$ cat /proc/version
Linux version 5.15.0-91-generic (Ubuntu 22.04)`,
            explanation: "Absolute paths start with / and work from anywhere. cd / takes you to root — the top of everything. /var/log contains ALL system and application logs. /etc contains ALL configuration files — this is the first place to check when anything breaks. /proc/version shows the Linux kernel version — useful to know when troubleshooting. cat simply prints file contents to screen."
        },

        {
            id: "nav_ex03",
            difficulty: "Easy",
            title: "Relative Path Navigation",
            description: "Master relative paths — paths that start from your current directory. Practice going up, down, and sideways in the tree.",
            starterCode: `# Start in your home directory
$ cd ~
$ pwd

# 1. Create test directories to navigate
$ mkdir -p test_nav/{level1a/level2a,level1b/level2b}
$ tree test_nav

# 2. Navigate DOWN using relative paths
$ cd test_nav/level1a/level2a
$ pwd

# 3. Go UP one level (relative)
$ cd ..
$ pwd

# 4. Go to the SIBLING directory (relative)
$ cd ../level1b
$ pwd

# 5. Go all the way back to home in ONE command (relative)
$ cd ../..
$ pwd`,
            solution: `$ cd ~
$ pwd
/home/anuj

$ mkdir -p test_nav/{level1a/level2a,level1b/level2b}
$ tree test_nav
test_nav/
├── level1a/
│   └── level2a/
└── level1b/
    └── level2b/

$ cd test_nav/level1a/level2a
$ pwd
/home/anuj/test_nav/level1a/level2a

$ cd ..
$ pwd
/home/anuj/test_nav/level1a

$ cd ../level1b
$ pwd
/home/anuj/test_nav/level1b

$ cd ../..
$ pwd
/home/anuj`,
            explanation: "Relative paths are resolved from your current position. cd test_nav/level1a/level2a goes three levels down in one command. cd .. goes up exactly one level. cd ../level1b means: go up one level (to test_nav) then enter level1b — this is the 'sibling' navigation pattern used constantly in real work. cd ../.. goes up two levels at once. The key insight: you can chain as many ../ as you need."
        },

        {
            id: "nav_ex04",
            difficulty: "Easy",
            title: "cd Shortcut Mastery",
            description: "Master every cd shortcut: ~, -, bare cd. These three save thousands of keystrokes per day.",
            starterCode: `# Start at home
$ cd ~
$ pwd

# Navigate away to some deeply nested location
$ cd /var/log/apt

# Check where you are
$ pwd

# Now go to /etc
$ cd /etc
$ pwd

# Use the TOGGLE to go back to /var/log/apt
$ cd -

# Confirm
$ pwd

# Now use bare cd to go home
$ cd
$ pwd`,
            solution: `$ cd ~
$ pwd
/home/anuj

$ cd /var/log/apt
$ pwd
/var/log/apt

$ cd /etc
$ pwd
/etc

$ cd -          # Toggle to PREVIOUS location
/var/log/apt    # shell prints the dir it jumped to

$ pwd
/var/log/apt

$ cd            # bare cd = go home
$ pwd
/home/anuj`,
            explanation: "cd - is one of the most powerful navigation shortcuts. It reads from \$OLDPWD — the shell always tracks your previous directory. It's like Alt+Tab in Windows/Mac, but for filesystem locations. You can toggle between two directories indefinitely. Bare cd (no argument) always goes to your home directory (\$HOME). This is equivalent to cd ~ but even shorter. Memorize these three: cd ~ (home), cd - (previous), cd .. (parent)."
        },

        {
            id: "nav_ex05",
            difficulty: "Easy",
            title: "ls Flag Exploration",
            description: "Practice the most important ls flags and learn to read the full output. Understand what every column in ls -l means.",
            starterCode: `# Create test files with different properties
$ cd ~
$ mkdir ls_test && cd ls_test
$ touch regular.txt
$ echo "some data" > data.csv
$ mkdir my_dir
$ chmod 755 regular.txt   # Make executable
$ chmod 600 data.csv      # Owner-only
$ ln -s regular.txt my_link

# 1. Basic list
$ ls

# 2. Long format
$ ls -l

# 3. Long + all hidden
$ ls -la

# 4. Long + human sizes
$ ls -lh

# 5. Sorted by time newest first
$ ls -lt

# 6. What is the FIRST character of each line in ls -l?`,
            solution: `$ ls
data.csv  my_dir  my_link  regular.txt

$ ls -l
total 16
-rw------- 1 anuj anuj   10 Mar 09 data.csv       ← regular file, 600 perms
drwxr-xr-x 2 anuj anuj 4096 Mar 09 my_dir/        ← directory
lrwxrwxrwx 1 anuj anuj   11 Mar 09 my_link -> regular.txt  ← symlink
-rwxr-xr-x 1 anuj anuj    0 Mar 09 regular.txt    ← executable (755)

$ ls -la
total 24
drwxr-xr-x  3 anuj anuj 4096 Mar 09 .              ← current dir
drwxr-xr-x 12 anuj anuj 4096 Mar 09 ..             ← parent dir
-rw-------  1 anuj anuj   10 Mar 09 data.csv
drwxr-xr-x  2 anuj anuj 4096 Mar 09 my_dir/
lrwxrwxrwx  1 anuj anuj   11 Mar 09 my_link -> regular.txt
-rwxr-xr-x  1 anuj anuj    0 Mar 09 regular.txt

$ ls -lt
# newest modification time first
-rwxr-xr-x  regular.txt   (most recently touched)

# First characters:
# d = directory (my_dir)
# l = symlink (my_link)
# - = regular file (data.csv, regular.txt)`,
            explanation: "The first character of ls -l output tells you the file TYPE: '-' = regular file, 'd' = directory, 'l' = symlink, 'c' = character device, 'b' = block device. chmod 600 = -rw------- (only owner can read+write, no one else can do anything). chmod 755 = -rwxr-xr-x (owner has full access, group and others can read+execute). Symlinks show '-> target' at the end of the line. ls -la always shows . and .. — these are real directory entries, not just notation."
        },

        {
            id: "nav_ex06",
            difficulty: "Medium",
            title: "The dbda Directory Challenge (From Syllabus)",
            description: "The classic exercise from your curriculum: create the dbda/test structure and populate it with exactly 100 files using ONE command with brace expansion.",
            starterCode: `# TASK: Create ~/dbda/test and 100 files in one command each

# 1. Create the nested directory structure
$ mkdir -p ~/dbda/test

# 2. Navigate into it
$ cd ~/dbda/test
$ pwd

# 3. Create 100 files with ONE command (brace expansion!)
$ touch file_{001..100}.txt
# Why zero-padding? Compare: file_1 vs file_001 sorting

# 4. Verify count
$ ls | wc -l

# 5. Show first 5 and last 5
$ ls | head -5
$ ls | tail -5

# 6. Show total size of all files
$ du -sh .`,
            solution: `$ mkdir -p ~/dbda/test
$ cd ~/dbda/test
$ pwd
/home/anuj/dbda/test

$ touch file_{001..100}.txt

$ ls | wc -l
100

$ ls | head -5
file_001.txt
file_002.txt
file_003.txt
file_004.txt
file_005.txt

$ ls | tail -5
file_096.txt
file_097.txt
file_098.txt
file_099.txt
file_100.txt

# Compare zero-padded vs not:
$ touch test_{1..5} && ls test_*
test_1  test_2  test_3  test_4  test_5   ← looks fine with 5
$ touch badfile_{1..12} && ls badfile_*
badfile_1  badfile_10  badfile_11  badfile_12  badfile_2  ← WRONG ORDER!
# 10 sorts before 2! Zero-padding fixes this: 001, 002... sorts correctly

$ du -sh .
4.0K    .     ← empty files take minimal space`,
            explanation: "mkdir -p creates ALL parent directories at once — without -p, mkdir would fail if ~/dbda didn't exist yet. {001..100} is Bash brace expansion — the shell generates file_001.txt, file_002.txt ... file_100.txt BEFORE touch runs. This is the difference between 1 command and 100 commands. Zero-padded numbers (001, 002) are critical: without them, alphabetical sorting gives wrong order (1, 10, 11, 12, 2, 3...). With zero-padding: 001, 002, 003... sorts correctly. Always zero-pad when creating numbered sequences."
        },

        {
            id: "nav_ex07",
            difficulty: "Medium",
            title: "Decode ls -l Output Completely",
            description: "Given ls -l output, extract every piece of information from it. Practice reading permissions, types, ownership, and sizes.",
            starterCode: `# Create files with distinct properties
$ cd ~
$ mkdir decode_test && cd decode_test
$ touch script.sh && chmod 755 script.sh
$ echo "secret data" > secrets.txt && chmod 600 secrets.txt
$ mkdir -p data_dir && chmod 755 data_dir
$ ln -s script.sh script_link
$ dd if=/dev/zero of=bigfile.bin bs=1M count=5 2>/dev/null

# Now run ls -l and answer:
$ ls -la

# Questions:
# Q1: Which file has permissions -rwxr-xr-x?
# Q2: Which file is nobody except owner can read?
# Q3: Which entry is a symlink?
# Q4: Which entry is a directory?
# Q5: What does the first column "-rw-r--r--" mean?
# Q6: What's bigfile.bin's size?`,
            solution: `$ ls -la
total 5196
drwxr-xr-x  4 anuj anuj    4096 Mar 09 .
drwxr-xr-x 12 anuj anuj    4096 Mar 09 ..
drwxr-xr-x  2 anuj anuj    4096 Mar 09 data_dir/
-rw-r--r--  1 anuj anuj 5242880 Mar 09 bigfile.bin
-rw-------  1 anuj anuj      12 Mar 09 secrets.txt
-rwxr-xr-x  1 anuj anuj       0 Mar 09 script.sh
lrwxrwxrwx  1 anuj anuj       9 Mar 09 script_link -> script.sh

# Q1: script.sh (-rwxr-xr-x)
# Q2: secrets.txt (-rw------- = only owner can read/write, nobody else)
# Q3: script_link (starts with 'l', shows -> script.sh)
# Q4: data_dir (starts with 'd')
# Q5: -rw-r--r-- means:
#     - = regular file
#     rw- = owner can read + write (no execute)
#     r-- = group can only read
#     r-- = others can only read
#     This is "644" in octal (4+2+0, 4+0+0, 4+0+0)
# Q6: 5242880 bytes = 5MB (5*1024*1024)
#     With ls -lh it shows: 5.0M`,
            explanation: "Every column in ls -l carries specific meaning. The 10-character permission string is: [type][owner:rwx][group:rwx][others:rwx]. '-rw-------' = regular file, owner read+write, group nothing, others nothing. A '.' at the end means SELinux context. The number after permissions is the hard link count. Directories always start with 2 (one for . and one from parent). Symlinks show their target with '->' notation. du -sh shows disk usage, ls -l shows reported size — they can differ due to sparse files or metadata."
        },

        {
            id: "nav_ex08",
            difficulty: "Medium",
            title: "Hidden Files Investigation",
            description: "Explore your home directory's dotfiles. Understand what each one does, how to read them, and how to safely add your own configuration.",
            starterCode: `# Q1: How many hidden items in your home?
$ ls -la ~ | grep "^\." | wc -l

# Q2: Read your .bashrc — first 20 lines
$ head -20 ~/.bashrc

# Q3: How many commands have you typed historically?
$ wc -l ~/.bash_history

# Q4: What does your .profile contain?
$ cat ~/.profile

# Q5: Safely add a useful alias to .bashrc
$ echo 'alias ll="ls -lahF --color=auto"' >> ~/.bashrc

# Q6: Apply changes without logging out
$ source ~/.bashrc

# Q7: Test the new alias
$ ll`,
            solution: `$ ls -la ~ | grep "^\." | wc -l
8       # number of hidden items

$ head -20 ~/.bashrc
# ~/.bashrc: executed by bash(1) for non-login shells
# If not running interactively, don't do anything
case \$- in
    *i*) ;;
      *) return;;
esac
# History settings
HISTCONTROL=ignoreboth
HISTSIZE=1000
HISTFILESIZE=2000
# Enable color support
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "\$(dircolors -b ~/.dircolors)" || eval "\$(dircolors -b)"
fi

$ wc -l ~/.bash_history
342     # you've typed 342 commands in this shell!

$ cat ~/.profile
# ~/.profile: executed by login shells
if [ -n "\$BASH_VERSION" ]; then
    if [ -f "\$HOME/.bashrc" ]; then
        . "\$HOME/.bashrc"
    fi
fi
if [ -d "\$HOME/bin" ]; then
    PATH="\$HOME/bin:\$PATH"
fi

$ echo 'alias ll="ls -lahF --color=auto"' >> ~/.bashrc
$ source ~/.bashrc
$ ll                            # Now works!
total 96
drwxr-xr-x 12 anuj anuj 4096 Mar 09 ./
drwxr-xr-x  5 root root 4096 Mar 01 ../`,
            explanation: ".bashrc is the most important dotfile — it runs every time you open a new terminal. source ~/.bashrc (or . ~/.bashrc) applies changes immediately in your current shell without restarting. >> appends to a file (unlike > which overwrites). .profile is for login shells (SSH sessions, TTY logins) while .bashrc is for interactive shells. .bash_history stores your command history — grep through it to rediscover commands: history | grep 'spark'. The -F flag in ls -lahF adds type indicators: / after dirs, * after executables, @ after symlinks."
        },

        {
            id: "nav_ex09",
            difficulty: "Medium",
            title: "FHS Treasure Hunt",
            description: "Explore the Filesystem Hierarchy Standard by visiting specific directories and discovering what lives where.",
            starterCode: `# 1. What OS version are you running?
$ cat /etc/os-release | grep PRETTY_NAME

# 2. How many user accounts exist on this system?
$ cat /etc/passwd | wc -l

# 3. What's the total number of commands in /usr/bin?
$ ls /usr/bin | wc -l

# 4. What are the 5 largest files in /var/log?
$ ls -lhS /var/log 2>/dev/null | head -6

# 5. How long has the system been running?
$ cat /proc/uptime
# Calculate: first number / 3600 = hours

# 6. How much RAM?
$ grep MemTotal /proc/meminfo

# 7. What big apps are in /opt?
$ ls /opt 2>/dev/null || echo "nothing in /opt"`,
            solution: `$ cat /etc/os-release | grep PRETTY_NAME
PRETTY_NAME="Ubuntu 22.04.3 LTS"

$ cat /etc/passwd | wc -l
42      # 42 user entries including system accounts

$ ls /usr/bin | wc -l
1247    # typically 1000-2000 commands

$ ls -lhS /var/log 2>/dev/null | head -6
total 256M
-rw-r--r-- 1 root     root   45M Mar 09 syslog
-rw-r----- 1 syslog   adm    12M Mar 09 auth.log
-rw-r--r-- 1 root     root  8.4M Mar 09 dpkg.log
drwxr-xr-x 2 root     adm   4096 Mar 09 apache2/
drwxr-xr-x 2 www-data adm   4096 Mar 09 nginx/

$ cat /proc/uptime
864321.58 3215678.23
# 864321 / 3600 = ~240 hours = 10 days uptime

$ grep MemTotal /proc/meminfo
MemTotal:       16384000 kB    # 16 GB

$ ls /opt
airflow  conda  kafka  spark`,
            explanation: "/etc/os-release is the standard place to check OS version on any modern Linux. /etc/passwd lists ALL user accounts — system accounts (like www-data, mysql) are included, not just human users. /usr/bin has all user-accessible commands — the count varies by how much is installed. /var/log/syslog is the most important log file — it captures everything. /proc/uptime is a virtual file — the kernel generates it on-demand. First number = seconds since boot. /proc/meminfo has detailed RAM statistics — MemTotal is total installed RAM."
        },

        {
            id: "nav_ex10",
            difficulty: "Medium",
            title: "Disk Space Investigation",
            description: "Use ls, du, and df to investigate disk space usage — a critical real-world skill for server management.",
            starterCode: `# 1. Overall disk usage across all filesystems
$ df -h

# 2. Size of each item in /var
$ du -sh /var/* 2>/dev/null | sort -rh | head -8

# 3. Create a test dir with files of different sizes
$ mkdir ~/disk_test && cd ~/disk_test
$ dd if=/dev/zero of=file_10mb.bin bs=1M count=10 2>/dev/null
$ dd if=/dev/zero of=file_1mb.bin  bs=1M count=1  2>/dev/null
$ dd if=/dev/zero of=file_100k.bin bs=1K count=100 2>/dev/null

# 4. List sorted by size (human readable)
$ ls -lhS

# 5. Total size of the test dir
$ du -sh ~/disk_test

# 6. Find files larger than 5MB in your home
$ find ~ -type f -size +5M 2>/dev/null`,
            solution: `$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   22G   26G  46% /
/dev/sdb1         2T  800G  1.2T  40% /data
tmpfs           7.8G     0  7.8G   0% /dev/shm

$ du -sh /var/* 2>/dev/null | sort -rh | head -5
15G    /var/log
2.1G   /var/lib
450M   /var/cache
12M    /var/spool

$ mkdir ~/disk_test && cd ~/disk_test
$ dd if=/dev/zero of=file_10mb.bin bs=1M count=10 2>/dev/null
$ dd if=/dev/zero of=file_1mb.bin  bs=1M count=1  2>/dev/null
$ dd if=/dev/zero of=file_100k.bin bs=1K count=100 2>/dev/null

$ ls -lhS
-rw-r--r-- 1 anuj anuj  10M Mar 09 file_10mb.bin
-rw-r--r-- 1 anuj anuj 1.0M Mar 09 file_1mb.bin
-rw-r--r-- 1 anuj anuj 100K Mar 09 file_100k.bin

$ du -sh ~/disk_test
12M    /home/anuj/disk_test

$ find ~ -type f -size +5M 2>/dev/null
/home/anuj/disk_test/file_10mb.bin
/home/anuj/training_data.parquet`,
            explanation: "df -h shows filesystem-level disk usage — it tells you how full each mounted partition is. du -sh computes directory sizes recursively. sort -rh sorts human-readable sizes in reverse (15G before 2.1G). dd (disk dump) is the classic tool for creating files of exact sizes — bs=block size, count=number of blocks. 2>/dev/null suppresses dd's progress output. ls -lhS combines long format + human sizes + size sort. find -size +5M means files larger than 5 megabytes. The 2>/dev/null on find suppresses 'Permission denied' errors for dirs you can't read."
        },

        {
            id: "nav_ex11",
            difficulty: "Hard",
            title: "Full Navigation Speed Challenge",
            description: "Complete 10 navigation tasks as efficiently as possible. Focus on using shortcuts and minimizing keystrokes. Time yourself.",
            starterCode: `# CHALLENGE: Complete all 10 in under 5 minutes

# Task 1: Go to /var/log in ONE command
$ cd /var/log && pwd

# Task 2: From /var/log, go to /etc with ONE command
$ cd /etc && pwd

# Task 3: Use cd - to jump back to /var/log
$ cd - && pwd

# Task 4: From /var/log, get to /var using relative path
$ cd .. && pwd

# Task 5: Find the 3 largest dirs in /var
$ du -sh /var/* 2>/dev/null | sort -rh | head -3

# Task 6: Show ONLY directories in /home/anuj
$ ls -la ~ | grep "^d"

# Task 7: Use pushd to navigate without losing your place
$ pushd /etc && ls *.conf 2>/dev/null | head -3
$ popd && pwd   # back where you were!

# Task 8: Count items in /usr/bin
$ ls /usr/bin | wc -l

# Task 9: Create and navigate nested structure
$ mkdir -p ~/speed_test/{a,b,c}/{x,y,z}
$ cd ~/speed_test/b/y && pwd

# Task 10: Return home with fewest characters
$ cd`,
            solution: `# Task 1:
$ cd /var/log && pwd
/var/log

# Task 2:
$ cd /etc && pwd
/etc

# Task 3: cd - jumps to $OLDPWD
$ cd -
/var/log
$ pwd
/var/log

# Task 4: .. = parent = /var
$ cd ..
$ pwd
/var

# Task 5:
$ du -sh /var/* 2>/dev/null | sort -rh | head -3
15G   /var/log
2.1G  /var/lib
450M  /var/cache

# Task 6: grep ^d = lines starting with 'd' = directories
$ ls -la ~ | grep "^d"
drwxr-xr-x  3 anuj anuj 4096 Mar 05 data/
drwxr-xr-x  4 anuj anuj 4096 Mar 08 projects/
drwxr-xr-x  2 anuj anuj 4096 Mar 07 scripts/

# Task 7:
$ pushd /etc
/etc /var    # stack: [/etc, /var]
$ ls *.conf 2>/dev/null | head -3
adduser.conf  ca-certificates.conf  debconf.conf
$ popd
/var         # back to /var!

# Task 8:
$ ls /usr/bin | wc -l
1247

# Task 9:
$ mkdir -p ~/speed_test/{a,b,c}/{x,y,z}
# Creates 9 directories (3×3) in one command!
$ cd ~/speed_test/b/y && pwd
/home/anuj/speed_test/b/y

# Task 10:
$ cd
$ pwd
/home/anuj`,
            explanation: "cd - (dash) is the toggle — it always jumps to $OLDPWD (previous directory) and prints the new location. pushd saves a location on the directory stack and jumps to the new location — popd reverses it, returning you exactly where you pushed from. This is better than cd - because you can have multiple levels of history. mkdir -p with {a,b,c}/{x,y,z} is brace expansion nested: it generates all 9 combinations at once. Bare cd (no argument) always returns home — shortest possible way to get home."
        },

        {
            id: "nav_ex12",
            difficulty: "Hard",
            title: "Build a Complete Professional Data Project",
            description: "Create a full data engineering project structure using only mkdir, touch, and brace expansion in the fewest commands possible. Then navigate every part of it.",
            starterCode: `# Build this ENTIRE structure with as few commands as possible:
# sales_pipeline/
# ├── data/
# │   ├── raw/       (50 CSV files: sales_001.csv ... sales_050.csv)
# │   ├── processed/
# │   └── output/
# ├── src/
# │   ├── ingest.py
# │   ├── transform.py
# │   ├── validate.py
# │   └── load.py
# ├── tests/
# ├── logs/
# ├── configs/
# │   ├── dev.yaml
# │   ├── staging.yaml
# │   └── prod.yaml
# └── README.md

# VERIFY: Navigate to raw/, count files, then come back`,
            solution: `# Build the entire structure
$ mkdir -p ~/sales_pipeline/{data/{raw,processed,output},src,tests,logs,configs}

# Create source files
$ touch ~/sales_pipeline/src/{ingest,transform,validate,load}.py

# Create config files  
$ touch ~/sales_pipeline/configs/{dev,staging,prod}.yaml

# Create docs
$ touch ~/sales_pipeline/{README.md,.gitignore,requirements.txt}

# Create 50 raw data files (zero-padded!)
$ touch ~/sales_pipeline/data/raw/sales_{001..050}.csv

# Verify structure
$ tree ~/sales_pipeline
sales_pipeline/
├── .gitignore
├── README.md
├── configs/
│   ├── dev.yaml
│   ├── prod.yaml
│   └── staging.yaml
├── data/
│   ├── output/
│   ├── processed/
│   └── raw/
│       ├── sales_001.csv
│       ├── sales_002.csv
│       ... (50 files)
├── logs/
├── requirements.txt
├── src/
│   ├── ingest.py
│   ├── load.py
│   ├── transform.py
│   └── validate.py
└── tests/

# Navigate and verify
$ cd ~/sales_pipeline/data/raw
$ ls | wc -l
50

$ ls | head -3
sales_001.csv
sales_002.csv
sales_003.csv

$ cd ~/sales_pipeline   # back to project root
$ du -sh .
36K    .    # mostly empty files`,
            explanation: "The entire project structure was built in just 5 commands. mkdir -p with nested braces creates every directory at once. Brace expansion {ingest,transform,validate,load}.py generates 4 filenames before touch runs. {001..050} creates zero-padded numbers — essential so file_010 sorts correctly between file_009 and file_011. This is production-standard scaffolding: data engineers use this exact layout (data/raw, data/processed, src, tests, configs, logs) on real projects. du -sh shows the total size of the project."
        },

        {
            id: "nav_ex13",
            difficulty: "Hard",
            title: "Tab Completion and History Mastery",
            description: "Practice using Tab completion and history navigation to work efficiently without typing long paths.",
            starterCode: `# Setup: Create files to navigate
$ mkdir -p ~/completion_test/very_long_directory_name_for_testing/
$ touch ~/completion_test/very_long_directory_name_for_testing/important_data_file.csv
$ touch ~/completion_test/very_long_directory_name_for_testing/another_important_file.txt
$ touch ~/completion_test/very_long_directory_name_for_testing/script_runner.sh

# Practice 1: Navigate using Tab completion
# (In a real terminal, type: cd ~/completion_test/ver[TAB]/im[TAB])
$ cd ~/completion_test/very_long_directory_name_for_testing
$ pwd

# Practice 2: Show all files starting with 'i' (Tab completion test)
$ ls i[TAB][TAB]   # Should show: important_data_file.csv

# Practice 3: history search simulation
$ history | tail -20

# Practice 4: Use !! to repeat last command
$ ls -la
$ !!   # Same as: ls -la

# Practice 5: Show the $OLDPWD variable
$ cd /tmp
$ echo \$OLDPWD`,
            solution: `$ mkdir -p ~/completion_test/very_long_directory_name_for_testing/
$ touch ~/completion_test/very_long_directory_name_for_testing/important_data_file.csv
$ touch ~/completion_test/very_long_directory_name_for_testing/another_important_file.txt
$ touch ~/completion_test/very_long_directory_name_for_testing/script_runner.sh

# Tab completion saves typing:
# cd ~/completion_test/ver[TAB]
# → cd ~/completion_test/very_long_directory_name_for_testing/
# ls i[TAB]
# → ls important_data_file.csv (unique match)
# ls a[TAB]
# → ls another_important_file.txt

$ cd ~/completion_test/very_long_directory_name_for_testing
$ pwd
/home/anuj/completion_test/very_long_directory_name_for_testing

$ history | tail -5
  847  mkdir -p ~/completion_test/...
  848  touch ~/completion_test/.../important_data_file.csv
  849  cd ~/completion_test/very_long...
  850  pwd
  851  history | tail -5

$ ls -la
total 20
drwxr-xr-x 2 anuj anuj 4096 Mar 09 .
drwxr-xr-x 3 anuj anuj 4096 Mar 09 ..
-rw-r--r-- 1 anuj anuj    0 Mar 09 another_important_file.txt
-rw-r--r-- 1 anuj anuj    0 Mar 09 important_data_file.csv
-rw-r--r-- 1 anuj anuj    0 Mar 09 script_runner.sh

$ !!
ls -la     # bash prints the expanded command
total 20
...same output again...

$ cd /tmp
$ echo \$OLDPWD
/home/anuj/completion_test/very_long_directory_name_for_testing`,
            explanation: "Tab completion is the single biggest productivity multiplier in Linux. Every character you type is an opportunity for a typo — Tab lets the shell complete it precisely. !! expands to the last command — useful when you forget sudo: type sudo !! to re-run with sudo. !847 re-runs history entry 847. Ctrl+R starts reverse incremental search through history — the most powerful way to find commands you ran before. \$OLDPWD is automatically set by the shell every time you cd — cd - uses it. You can also use echo \$OLDPWD to see where you came from without actually going there."
        },

        {
            id: "nav_ex14",
            difficulty: "Hard",
            title: "Production Log Navigation Simulation",
            description: "Simulate a real production incident: navigate the log structure, find relevant files, investigate the issue, and create a structured incident report.",
            starterCode: `# INCIDENT: API service returning 500 errors since 2 hours ago
# YOUR JOB: Navigate to the right logs and diagnose

# Step 1: Confirm your location and server
$ pwd && whoami && hostname

# Step 2: Navigate to system logs
$ cd /var/log
$ ls -lt | head -10  # Which logs are most active?

# Step 3: Check for errors in syslog
$ grep -c "ERROR\|error" /var/log/syslog 2>/dev/null || echo "no syslog access"

# Step 4: Check if nginx/apache logs exist
$ ls /var/log/nginx/ 2>/dev/null && echo "nginx found" || echo "no nginx"
$ ls /var/log/apache2/ 2>/dev/null && echo "apache found" || echo "no apache"

# Step 5: Create an incident report structure
$ INCIDENT_DIR=~/incidents/\$(date +%Y-%m-%d_%H%M)_api_500_errors
$ mkdir -p \$INCIDENT_DIR
$ cd \$INCIDENT_DIR
$ pwd

# Step 6: Start a report
$ echo "Incident: API 500 errors" > summary.md
$ echo "Date: \$(date)" >> summary.md
$ echo "Server: \$(hostname)" >> summary.md
$ echo "Investigated by: \$(whoami)" >> summary.md
$ cat summary.md`,
            solution: `$ pwd && whoami && hostname
/home/anuj
anuj
prod-api-server-01

$ cd /var/log
$ ls -lt | head -5
-rw-r--r-- 1 syslog   adm     45M Mar 09 10:45 syslog       ← most recent
-rw-r----- 1 syslog   adm     12M Mar 09 10:44 auth.log
-rw-r--r-- 1 root     root   1.2M Mar 09 10:30 dpkg.log
drwxr-xr-x 2 www-data adm    4096 Mar 09 08:00 nginx/
drwxr-xr-x 2 root     adm    4096 Mar 09 09:00 apt/

$ grep -c "ERROR\|error" /var/log/syslog 2>/dev/null
1247    # 1247 error lines in syslog!

$ ls /var/log/nginx/
access.log  error.log    ← error.log is where API errors show

$ ls /var/log/apache2/ 2>/dev/null && echo "apache found"
apache found

$ INCIDENT_DIR=~/incidents/\$(date +%Y-%m-%d_%H%M)_api_500_errors
$ mkdir -p \$INCIDENT_DIR
$ cd \$INCIDENT_DIR
$ pwd
/home/anuj/incidents/2024-03-09_1047_api_500_errors

$ echo "Incident: API 500 errors" > summary.md
$ echo "Date: \$(date)" >> summary.md
$ echo "Server: \$(hostname)" >> summary.md
$ echo "Investigated by: \$(whoami)" >> summary.md
$ cat summary.md
Incident: API 500 errors
Date: Sat Mar  9 10:47:00 UTC 2024
Server: prod-api-server-01
Investigated by: anuj`,
            explanation: "\$(date +%Y-%m-%d_%H%M) uses command substitution — the shell runs date inside \$() and inserts its output into the directory name. This creates timestamped incident directories automatically. ls -lt on /var/log shows which logs are being actively written (newest modification time). grep -c counts matching lines — 1247 error lines in syslog is significant. The pattern: always check /var/log/nginx/error.log (or apache2/error.log) for web server errors before diving into syslog. Creating structured incident directories with timestamps is professional practice — it builds an audit trail."
        },

        {
            id: "nav_ex15",
            difficulty: "Hard",
            title: "Complete Navigation Workflow — End-to-End",
            description: "A comprehensive exercise combining everything: filesystem understanding, all cd forms, ls analysis, FHS knowledge, dotfiles, and disk investigation.",
            starterCode: `# This exercise tests EVERYTHING from this chapter

# PART A: Filesystem Knowledge
# 1. Print current location
$ pwd
# 2. Where does python3 live?
$ which python3
# 3. What's the kernel version?
$ cat /proc/version | cut -d' ' -f1-3

# PART B: Navigation
# 4. Using ONE cd command with absolute path, go to /usr/bin
# 5. Count how many commands are there
# 6. Using cd -, go back
# 7. Using . shortcut, go home

# PART C: ls Mastery
# 8. From home, list /var/log sorted by size (human readable, largest first)
# 9. From home, list /etc — just the files ending in .conf
$ ls /etc/*.conf

# PART D: Dotfiles
# 10. Show all hidden files in your home (just the names, no details)
$ ls -a ~ | grep "^\."

# PART E: Disk Space
# 11. How much free space on root filesystem?
$ df -h / | tail -1
# 12. What's the 3 largest directories in /var?`,
            solution: `# PART A: Filesystem Knowledge
$ pwd
/home/anuj

$ which python3
/usr/bin/python3

$ cat /proc/version | cut -d' ' -f1-3
Linux version 5.15.0-91-generic

# PART B: Navigation
$ cd /usr/bin
$ ls | wc -l
1247

$ cd -
/home/anuj

$ cd ~    # (or just: cd)
$ pwd
/home/anuj

# PART C: ls Mastery
$ ls -lhS /var/log | head -5
-rw-r--r-- 1 root root  45M Mar 09 syslog
-rw-r----- 1 root root  12M Mar 09 auth.log
-rw-r--r-- 1 root root 8.4M Mar 09 dpkg.log

$ ls /etc/*.conf
/etc/adduser.conf  /etc/ca-certificates.conf  /etc/debconf.conf
/etc/deluser.conf  /etc/gai.conf  /etc/hdparm.conf
/etc/host.conf     /etc/ld.so.conf  /etc/libaudit.conf
/etc/logrotate.conf  /etc/nsswitch.conf  /etc/pam.conf

# PART D: Dotfiles
$ ls -a ~ | grep "^\."
.bash_history
.bash_logout
.bashrc
.cache/
.config/
.gitconfig
.local/
.profile
.ssh/

# PART E: Disk Space
$ df -h / | tail -1
/dev/sda1       50G  22G  26G   46% /

$ du -sh /var/* 2>/dev/null | sort -rh | head -3
15G   /var/log
2.1G  /var/lib
450M  /var/cache`,
            explanation: "cut -d' ' -f1-3 splits on spaces and takes fields 1-3 — a simple way to extract parts of output. ls /etc/*.conf uses glob expansion (* = any characters) to list only .conf files — the shell expands this before ls runs. ls -a | grep '^\\.' shows hidden items: grep '^\\.' matches lines starting with a dot. df -h / | tail -1 uses tail -1 to get just the data line (not the header). This complete exercise demonstrates that every navigation skill compounds on the others — knowing FHS tells you where to look, ls flags tell you what you see, and cd shortcuts let you get there instantly."
        },

        {
            id: "nav_ex16",
            difficulty: "Hard",
            title: "pushd/popd Stack Navigation",
            description: "Master the directory stack for complex multi-location navigation tasks.",
            starterCode: `# SCENARIO: You need to check 4 different server locations,
# then return exactly to where you started — WITHOUT typing any path twice

# Start location
$ cd ~/projects/active_pipeline
$ pwd

# Task 1: Save this, go check nginx logs
$ pushd /var/log/nginx

# Task 2: Push again to check nginx config  
$ pushd /etc/nginx

# Task 3: Push to check the main system log
$ pushd /var/log

# Task 4: Show the full stack
$ dirs -v

# Task 5: Pop back through each location
$ popd && pwd
$ popd && pwd
$ popd && pwd

# Where did you end up?`,
            solution: `$ cd ~/projects/active_pipeline
$ pwd
/home/anuj/projects/active_pipeline

$ pushd /var/log/nginx
/var/log/nginx /home/anuj/projects/active_pipeline
# Stack: [/var/log/nginx, /home/anuj/projects/active_pipeline]

$ pushd /etc/nginx
/etc/nginx /var/log/nginx /home/anuj/projects/active_pipeline

$ pushd /var/log
/var/log /etc/nginx /var/log/nginx /home/anuj/projects/active_pipeline

$ dirs -v
 0  /var/log
 1  /etc/nginx
 2  /var/log/nginx
 3  /home/anuj/projects/active_pipeline

$ popd && pwd
/etc/nginx /var/log/nginx /home/anuj/projects/active_pipeline
/etc/nginx

$ popd && pwd
/var/log/nginx /home/anuj/projects/active_pipeline
/var/log/nginx

$ popd && pwd
/home/anuj/projects/active_pipeline
/home/anuj/projects/active_pipeline
# You're back exactly where you started! No path typing.`,
            explanation: "pushd is like a bookmark stack for directories. Each pushd saves your current location AND goes to the new one. popd removes the top of the stack and goes to it. dirs -v shows the numbered stack. The key advantage over cd -: cd - only gives you ONE step back. pushd/popd gives unlimited steps. This pattern is essential for scripts that need to navigate around and always return to the starting directory: pushd /some/place; do work; popd. Use it when you need to visit 3+ locations in a task and return exactly to the start."
        },

        {
            id: "nav_ex17",
            difficulty: "Hard",
            title: "Advanced ls Mastery — Find Specific Files",
            description: "Use ls and related tools to answer specific questions about the filesystem state.",
            starterCode: `# Create a test environment
$ mkdir ~/ls_advanced && cd ~/ls_advanced
$ touch file_$(date +%Y%m%d).log
$ touch old_file.log && touch -t 202301010000 old_file.log  # make it old
$ dd if=/dev/zero of=bigfile.dat bs=1M count=20 2>/dev/null
$ dd if=/dev/zero of=medium.dat bs=1K count=500 2>/dev/null
$ touch tiny.txt
$ mkdir empty_dir/ filled_dir/
$ touch filled_dir/content.txt

# QUESTIONS — answer using ls and its flags:

# Q1: What is the NEWEST file by modification time?
$ ls -lt | head -2

# Q2: What is the OLDEST file?
$ ls -ltr | head -2

# Q3: What is the LARGEST file?
$ ls -lhS | head -2

# Q4: Show ONLY directories (not files)
$ ls -la | grep "^d"

# Q5: What is the total disk used by this directory?
$ du -sh .

# Q6: Show files with their INODE numbers
$ ls -li`,
            solution: `$ mkdir ~/ls_advanced && cd ~/ls_advanced
$ touch file_$(date +%Y%m%d).log    # creates file_20240309.log
$ touch old_file.log && touch -t 202301010000 old_file.log
$ dd if=/dev/zero of=bigfile.dat bs=1M count=20 2>/dev/null
$ dd if=/dev/zero of=medium.dat bs=1K count=500 2>/dev/null
$ touch tiny.txt
$ mkdir empty_dir/ filled_dir/
$ touch filled_dir/content.txt

# Q1: Newest file
$ ls -lt | head -2
total 21548
-rw-r--r-- 1 anuj anuj 20971520 Mar 09 10:55 bigfile.dat  ← most recently touched

# Q2: Oldest file  
$ ls -ltr | head -2
total 21548
-rw-r--r-- 1 anuj anuj 0 Jan 01  2023 old_file.log ← oldest!

# Q3: Largest file
$ ls -lhS | head -2
total 21M
-rw-r--r-- 1 anuj anuj  20M Mar 09 bigfile.dat ← 20MB biggest

# Q4: Only directories
$ ls -la | grep "^d"
drwxr-xr-x 2 anuj anuj 4096 Mar 09 empty_dir/
drwxr-xr-x 2 anuj anuj 4096 Mar 09 filled_dir/

# Q5: Total size
$ du -sh .
21M    .

# Q6: With inode numbers
$ ls -li
total 21548
2097161 drwxr-xr-x 2 anuj anuj    4096 empty_dir/
2097162 drwxr-xr-x 2 anuj anuj    4096 filled_dir/
2097163 -rw-r--r-- 1 anuj anuj 20971520 bigfile.dat
2097164 -rw-r--r-- 1 anuj anuj  512000 medium.dat
2097165 -rw-r--r-- 1 anuj anuj       0 old_file.log
2097166 -rw-r--r-- 1 anuj anuj       0 tiny.txt`,
            explanation: "touch -t YYYYMMDDhhmm sets a file's timestamp to a specific date — useful for testing time-sorted listing. ls -lt newest first, ls -ltr oldest first. ls -lhS largest first. grep '^d' on ls output gets only directories. du -sh . shows total size of current directory recursively. ls -li adds inode numbers — the kernel's internal file identifier. Two files with the same inode number are hard links to the same data. \$(date +%Y%m%d) embeds today's date in the filename — a common pattern for log files and backups."
        },

        {
            id: "nav_ex18",
            difficulty: "Hard",
            title: "Brace Expansion Mastery",
            description: "Master brace expansion for rapid file and directory creation — one of the most powerful bash features for data engineers.",
            starterCode: `# BRACE EXPANSION — create many names from one pattern

# 1. Basic sequence (numbers)
$ echo {1..5}

# 2. Zero-padded sequence
$ echo {001..010}

# 3. Letter sequence
$ echo {a..z}

# 4. List form
$ echo {alpha,beta,gamma,delta}

# 5. Nested expansion — create a quarterly report structure
$ mkdir -p reports/Q{1..4}_{2023,2024}
$ ls reports/

# 6. Create monthly log files for 2024
$ touch logs/app_{jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec}_2024.log
$ ls logs/

# 7. Create source files for a data pipeline
$ touch src/{extract,transform,load,validate,report}.py
$ ls src/

# 8. Create environment configs
$ touch config/{dev,staging,prod}.{yaml,json}
$ ls config/`,
            solution: `$ echo {1..5}
1 2 3 4 5

$ echo {001..010}
001 002 003 004 005 006 007 008 009 010

$ echo {a..z}
a b c d e f g h i j k l m n o p q r s t u v w x y z

$ echo {alpha,beta,gamma,delta}
alpha beta gamma delta

$ mkdir -p reports/Q{1..4}_{2023,2024}
$ ls reports/
Q1_2023  Q1_2024  Q2_2023  Q2_2024  Q3_2023  Q3_2024  Q4_2023  Q4_2024
# 8 directories from one command!

$ mkdir -p logs && touch logs/app_{jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec}_2024.log
$ ls logs/ | wc -l
12    # 12 monthly log files

$ mkdir -p src && touch src/{extract,transform,load,validate,report}.py
$ ls src/
extract.py  load.py  report.py  transform.py  validate.py

$ mkdir -p config && touch config/{dev,staging,prod}.{yaml,json}
$ ls config/
dev.json  dev.yaml  prod.json  prod.yaml  staging.json  staging.yaml
# 6 files (3 envs × 2 formats) from one command!`,
            explanation: "Brace expansion is one of the most powerful bash features. {1..5} generates a sequence. {001..010} generates zero-padded. {a,b,c} generates a comma-separated list. They can be NESTED: {dev,staging,prod}.{yaml,json} generates ALL combinations (3×2=6). The key rule: brace expansion happens BEFORE the command runs. touch src/{extract,transform,load,validate,report}.py is exactly equivalent to: touch src/extract.py src/transform.py src/load.py src/validate.py src/report.py. Use it to create project scaffolding in seconds instead of minutes."
        },

        {
            id: "nav_ex19",
            difficulty: "Hard",
            title: "Environment Variable Navigation",
            description: "Use environment variables for navigation — a critical pattern in production scripts and automated pipelines.",
            starterCode: `# Environment variables make scripts location-independent

# 1. View current environment variables for navigation
$ echo \$HOME
$ echo \$PWD
$ echo \$OLDPWD

# 2. Set a custom env var for your project root
$ export PROJECT_ROOT=~/projects/sales_pipeline
$ mkdir -p \$PROJECT_ROOT/{data,src,logs}

# 3. Navigate using the variable
$ cd \$PROJECT_ROOT
$ pwd

# 4. Create files relative to the variable
$ touch \$PROJECT_ROOT/data/test.csv
$ ls \$PROJECT_ROOT/data/

# 5. Use in a mini-script
cat << 'EOF' > ~/test_nav_script.sh
#!/bin/bash
echo "Script starting from: \$(pwd)"
cd \$PROJECT_ROOT
echo "Now in: \$(pwd)"
ls data/
echo "Script done."
EOF
chmod +x ~/test_nav_script.sh
$ ~/test_nav_script.sh`,
            solution: `$ echo \$HOME
/home/anuj

$ echo \$PWD
/home/anuj     # current directory

$ echo \$OLDPWD
/var/log       # previous directory (from earlier navigation)

$ export PROJECT_ROOT=~/projects/sales_pipeline
$ mkdir -p \$PROJECT_ROOT/{data,src,logs}

$ cd \$PROJECT_ROOT
$ pwd
/home/anuj/projects/sales_pipeline

$ touch \$PROJECT_ROOT/data/test.csv
$ ls \$PROJECT_ROOT/data/
test.csv

$ cat << 'EOF' > ~/test_nav_script.sh
#!/bin/bash
echo "Script starting from: \$(pwd)"
cd \$PROJECT_ROOT
echo "Now in: \$(pwd)"
ls data/
echo "Script done."
EOF

$ chmod +x ~/test_nav_script.sh
$ ~/test_nav_script.sh
Script starting from: /home/anuj
Now in: /home/anuj/projects/sales_pipeline
test.csv
Script done.`,
            explanation: "Environment variables are the professional way to handle paths in scripts. Instead of hardcoding /home/anuj/projects/sales_pipeline everywhere, set PROJECT_ROOT once and use it throughout. \$HOME is always your home directory (same as ~). \$PWD is always the current directory (same as pwd output). \$OLDPWD is the previous directory. export makes a variable available to child processes — without export, the variable exists only in the current shell. In production pipelines, every path should come from an environment variable so the same script works on dev, staging, and production servers just by changing the env vars."
        },

        {
            id: "nav_ex20",
            difficulty: "Hard",
            title: "Complete Navigation Audit — Check Your Own System",
            description: "A final comprehensive exercise: audit your own system's filesystem, find large files, investigate key directories, and produce a system report.",
            starterCode: `# SYSTEM AUDIT — understand your own machine

# 1. Basic system info
$ uname -a                          # kernel, architecture
$ cat /etc/os-release | grep -E "NAME|VERSION"

# 2. Disk audit
$ df -h                             # all filesystems
$ echo "---"
$ du -sh /home/* 2>/dev/null        # home dirs by user

# 3. Find the 10 largest files on the system (may take a minute)
$ find / -type f -size +50M 2>/dev/null | head -10

# 4. Count files in key directories
$ echo "Commands in /usr/bin:"; ls /usr/bin | wc -l
$ echo "Files in /etc:"; ls /etc | wc -l
$ echo "Log files:"; ls /var/log | wc -l

# 5. Navigate to each key directory and list its size
$ for d in /etc /var/log /opt /home; do
>     echo -n "\$d: "
>     du -sh \$d 2>/dev/null
> done

# 6. What processes are running? (from /proc)
$ ls /proc | grep -E "^[0-9]+" | wc -l`,
            solution: `$ uname -a
Linux prod-server-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux

$ cat /etc/os-release | grep -E "NAME|VERSION"
NAME="Ubuntu"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
VERSION_ID="22.04"

$ df -h
Filesystem      Size  Used Avail Use%  Mounted on
/dev/sda1        50G   22G   26G   46%  /
/dev/sdb1         2T  800G  1.2T   40%  /data
tmpfs           7.8G     0  7.8G    0%  /dev/shm

$ du -sh /home/* 2>/dev/null
2.4G    /home/anuj
1.1G    /home/riya
 48M    /home/deploy

$ find / -type f -size +50M 2>/dev/null | head -5
/opt/spark/jars/spark-core_2.12-3.4.0.jar
/home/anuj/training_data.parquet
/var/log/journal/...
/opt/conda/pkgs/mkl-2023.1.0.tar.bz2

$ echo "Commands in /usr/bin:"; ls /usr/bin | wc -l
Commands in /usr/bin:
1247

$ echo "Files in /etc:"; ls /etc | wc -l
Files in /etc:
93

$ echo "Log files:"; ls /var/log | wc -l
Log files:
24

$ for d in /etc /var/log /opt /home; do echo -n "\$d: "; du -sh \$d 2>/dev/null; done
/etc: 4.8M    /etc
/var/log: 15G    /var/log
/opt: 8.2G    /opt
/home: 3.6G    /home

$ ls /proc | grep -E "^[0-9]+" | wc -l
142     # 142 running processes`,
            explanation: "uname -a gives the full kernel version string — useful for checking if a kernel is up to date. du -sh /home/* shows each user's home directory size — useful for detecting runaway disk usage. find / -size +50M finds large files that might be using your disk space. The for loop iterates over directory names and runs du -sh on each — this is your first taste of shell scripting. ls /proc | grep '^[0-9]+' counts running processes — each numbered directory in /proc corresponds to one running process (the directory name is the PID). Combining all these navigation skills gives you a complete picture of any Linux system in under 2 minutes."
        }

    ],

    summary: `
<h3>📋 Chapter Summary: Navigation (cd, pwd, ls)</h3>

<div class="tip-box">
    <h4>✅ Complete Knowledge Checklist</h4>
    <p>
        <strong>Filesystem Fundamentals:</strong> One tree starting from <code>/</code>. Everything — programs, configs, data, devices — lives in this hierarchy. No drive letters. FHS defines where everything goes and it's the same on every Linux system.
    </p>
    <p>
        <strong>Key Terminology:</strong> Inode (kernel file ID), symlink (shortcut), mount point (where attached storage joins the tree), working directory (CWD), absolute path (starts with /), relative path (starts from CWD), dotfile (hidden config file).
    </p>
    <p>
        <strong>pwd:</strong> Shows your exact absolute path. <code>\$PWD</code> variable holds the same value — use in scripts. <code>-P</code> resolves symlinks. Always run after SSH login or unfamiliar navigation.
    </p>
    <p>
        <strong>cd Forms:</strong> Absolute (<code>cd /var/log</code>), relative (<code>cd ../data</code>), home (<code>cd ~</code> or bare <code>cd</code>), toggle (<code>cd -</code>), parent (<code>cd ..</code>). <code>cd</code> is a shell builtin — not an external program.
    </p>
    <p>
        <strong>ls Flags:</strong> <code>-l</code>=long format, <code>-a</code>=all hidden, <code>-h</code>=human sizes, <code>-t</code>=by time, <code>-S</code>=by size, <code>-r</code>=reverse, <code>-d</code>=dir itself, <code>-R</code>=recursive. Colors: blue=dir, green=executable, cyan=symlink.
    </p>
    <p>
        <strong>ls -l Columns:</strong> type+perms(10 chars) | links | owner | group | size | date | name. Permissions: r=4, w=2, x=1. chmod 755=rwxr-xr-x, chmod 644=rw-r--r--.
    </p>
    <p>
        <strong>FHS Key Dirs:</strong> <code>/bin</code>=commands, <code>/etc</code>=ALL config, <code>/home</code>=users, <code>/var/log</code>=logs, <code>/opt</code>=big apps (Spark/Kafka), <code>/tmp</code>=temp (cleared on boot), <code>/proc</code>=live kernel data, <code>/usr/bin</code>=most user commands.
    </p>
    <p>
        <strong>Hidden Files:</strong> Starts with <code>.</code>. <code>ls -a</code> reveals them. <code>~/.bashrc</code>=shell config, <code>~/.ssh/</code>=SSH keys, <code>~/.bash_history</code>=command history. <code>source ~/.bashrc</code> applies changes immediately.
    </p>
    <p>
        <strong>Power Tools:</strong> Tab completion (never type paths twice), Ctrl+R (search history), <code>!!</code> (repeat last), <code>pushd</code>/<code>popd</code> (directory stack), <code>tree</code> (visual map), <code>du -sh</code> (dir sizes), <code>df -h</code> (disk space), brace expansion (<code>{001..100}</code>).
    </p>
</div>

<div class="info-box">
    <h4>📚 Next: File Operations (cp, mv, rm, mkdir, touch)</h4>
    <p>Now that you can navigate the filesystem like a professional, you'll learn to <strong>create, copy, move, rename, and delete</strong> files and directories. You'll combine navigation with file operations to manage entire data directories in seconds.</p>
</div>
`

}; // end linuxNavigation