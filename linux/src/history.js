// ============================================================
// myPathshala – Linux Programming Course
// Module: history.js  |  Topic: Linux History & Open Source
// ============================================================

var linuxHistory = {
    title: "The Origin Story of Linux",
    description: "Discover how a 21-year-old student's hobby project became the backbone of the modern tech world — and why it powers every AI server, cloud platform, and data pipeline you'll ever work with.",
    breadcrumb: ["Getting Started", "Linux History & Open Source"],

    sections: [

        // ─────────────────────────────────────────────────────────────
        // SECTION 1 : RAVI'S STORY HOOK
        // ─────────────────────────────────────────────────────────────
        {
            id: "ravi-story",
            title: "Ravi Discovers the Origin",
            content: `
<div class="story-box">
    <div style="display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;">
        <div style="flex:0 0 auto;">
            <!-- Ravi Avatar SVG -->
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="36" cy="36" r="36" fill="#1a1a2e"/>
                <circle cx="36" cy="28" r="14" fill="#f9a825"/>
                <rect x="18" y="46" width="36" height="22" rx="10" fill="#0d47a1"/>
                <rect x="27" y="42" width="18" height="8" rx="4" fill="#f9a825"/>
                <!-- Laptop -->
                <rect x="22" y="52" width="28" height="14" rx="3" fill="#1565c0"/>
                <rect x="24" y="54" width="24" height="10" rx="2" fill="#00e676"/>
                <text x="30" y="62" fill="#003300" font-size="7" font-family="monospace" font-weight="bold">$_</text>
            </svg>
        </div>
        <div style="flex:1;min-width:200px;">
            <h3 style="margin:0 0 8px;color:#ce93d8;">📖 Ravi's First Question</h3>
            <p>Ravi had been using Linux for three days now. His mentor had said: <em>"Linux is the foundation of everything in Data Engineering."</em></p>
            <p>One evening, staring at his terminal blinking cursor, Ravi typed his first search: <strong>"Who made Linux and why?"</strong></p>
            <p>What he found blew his mind. It wasn't a billion-dollar company. It wasn't a government project. It was a <strong>21-year-old student</strong> — just like him — who was frustrated with his university's OS.</p>
        </div>
    </div>
</div>

<div class="info-box" style="margin-top:20px;">
    <strong>🎯 Why This Matters for You:</strong>
    <p>As a Data Engineer or ML Engineer, 100% of your production workloads will run on Linux. Every AWS EC2 instance, every Google Cloud VM, every Docker container, every Kubernetes pod — they all run Linux. Understanding <em>why Linux exists</em> helps you understand <em>why it works the way it does</em>.</p>
</div>`
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 2 : TIMELINE ANIMATION
        // ─────────────────────────────────────────────────────────────
        {
            id: "linux-timeline",
            title: "The Linux Timeline — From 1969 to Today",
            content: `
<p>Let's travel through time to understand how Linux was born. Every major OS that exists today has roots in a 1969 research project at Bell Labs.</p>

<!-- ANIMATED TIMELINE SVG -->
<div class="visual-container" style="overflow-x:auto;">
<svg width="860" height="320" viewBox="0 0 860 320" xmlns="http://www.w3.org/2000/svg" style="min-width:700px;">
    <!-- Background -->
    <rect width="860" height="320" fill="#0d1117" rx="12"/>

    <!-- Main Timeline Line -->
    <line x1="40" y1="160" x2="820" y2="160" stroke="#30363d" stroke-width="3"/>

    <!-- Arrow -->
    <polygon points="820,155 835,160 820,165" fill="#58a6ff"/>

    <!-- ── 1969 UNIX ── -->
    <line x1="80" y1="160" x2="80" y2="100" stroke="#f85149" stroke-width="2" stroke-dasharray="4"/>
    <circle cx="80" cy="160" r="8" fill="#f85149"/>
    <rect x="30" y="60" width="100" height="38" rx="6" fill="#161b22" stroke="#f85149"/>
    <text x="80" y="76" fill="#f85149" font-size="11" font-weight="bold" text-anchor="middle">1969</text>
    <text x="80" y="91" fill="#c9d1d9" font-size="9" text-anchor="middle">UNIX born @</text>
    <text x="80" y="102" fill="#c9d1d9" font-size="9" text-anchor="middle">Bell Labs</text>

    <!-- ── 1977 BSD ── -->
    <line x1="180" y1="160" x2="180" y2="210" stroke="#3fb950" stroke-width="2" stroke-dasharray="4"/>
    <circle cx="180" cy="160" r="8" fill="#3fb950"/>
    <rect x="130" y="215" width="100" height="38" rx="6" fill="#161b22" stroke="#3fb950"/>
    <text x="180" y="231" fill="#3fb950" font-size="11" font-weight="bold" text-anchor="middle">1977</text>
    <text x="180" y="246" fill="#c9d1d9" font-size="9" text-anchor="middle">BSD (Berkeley</text>
    <text x="180" y="257" fill="#c9d1d9" font-size="9" text-anchor="middle">Unix)</text>

    <!-- ── 1983 GNU ── -->
    <line x1="290" y1="160" x2="290" y2="100" stroke="#d29922" stroke-width="2" stroke-dasharray="4"/>
    <circle cx="290" cy="160" r="8" fill="#d29922"/>
    <rect x="240" y="60" width="100" height="38" rx="6" fill="#161b22" stroke="#d29922"/>
    <text x="290" y="76" fill="#d29922" font-size="11" font-weight="bold" text-anchor="middle">1983</text>
    <text x="290" y="91" fill="#c9d1d9" font-size="9" text-anchor="middle">GNU Project</text>
    <text x="290" y="102" fill="#c9d1d9" font-size="9" text-anchor="middle">by Stallman</text>

    <!-- ── 1987 MINIX ── -->
    <line x1="390" y1="160" x2="390" y2="210" stroke="#58a6ff" stroke-width="2" stroke-dasharray="4"/>
    <circle cx="390" cy="160" r="8" fill="#58a6ff"/>
    <rect x="340" y="215" width="100" height="38" rx="6" fill="#161b22" stroke="#58a6ff"/>
    <text x="390" y="231" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">1987</text>
    <text x="390" y="246" fill="#c9d1d9" font-size="9" text-anchor="middle">MINIX created</text>
    <text x="390" y="257" fill="#c9d1d9" font-size="9" text-anchor="middle">by Tanenbaum</text>

    <!-- ── 1991 LINUX ── HIGHLIGHTED -->
    <line x1="520" y1="160" x2="520" y2="80" stroke="#bc8cff" stroke-width="3"/>
    <circle cx="520" cy="160" r="12" fill="#bc8cff"/>
    <text x="520" y="165" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">★</text>
    <rect x="458" y="40" width="125" height="42" rx="8" fill="#21262d" stroke="#bc8cff" stroke-width="2"/>
    <text x="520" y="57" fill="#bc8cff" font-size="12" font-weight="bold" text-anchor="middle">1991 ★</text>
    <text x="520" y="72" fill="#e6edf3" font-size="10" text-anchor="middle">Linus Torvalds</text>
    <text x="520" y="84" fill="#e6edf3" font-size="10" text-anchor="middle">releases Linux 0.01</text>

    <!-- ── 1994 v1.0 ── -->
    <line x1="640" y1="160" x2="640" y2="210" stroke="#3fb950" stroke-width="2" stroke-dasharray="4"/>
    <circle cx="640" cy="160" r="8" fill="#3fb950"/>
    <rect x="590" y="215" width="100" height="38" rx="6" fill="#161b22" stroke="#3fb950"/>
    <text x="640" y="231" fill="#3fb950" font-size="11" font-weight="bold" text-anchor="middle">1994</text>
    <text x="640" y="246" fill="#c9d1d9" font-size="9" text-anchor="middle">Linux v1.0</text>
    <text x="640" y="257" fill="#c9d1d9" font-size="9" text-anchor="middle">officially released</text>

    <!-- ── Today ── -->
    <line x1="760" y1="160" x2="760" y2="100" stroke="#ff7b72" stroke-width="2" stroke-dasharray="4"/>
    <circle cx="760" cy="160" r="8" fill="#ff7b72"/>
    <rect x="705" y="60" width="115" height="38" rx="6" fill="#161b22" stroke="#ff7b72"/>
    <text x="762" y="76" fill="#ff7b72" font-size="11" font-weight="bold" text-anchor="middle">Today</text>
    <text x="762" y="91" fill="#c9d1d9" font-size="9" text-anchor="middle">Powers 96.4% of</text>
    <text x="762" y="102" fill="#c9d1d9" font-size="9" text-anchor="middle">top web servers</text>

    <!-- Label -->
    <text x="430" y="300" fill="#8b949e" font-size="10" text-anchor="middle">Linux History Timeline — From UNIX to Modern Cloud Infrastructure</text>
</svg>
</div>

<div class="tip-box" style="margin-top:16px;">
    <strong>💡 Key Insight:</strong> Linux didn't come out of nowhere. It stood on the shoulders of giants — UNIX (1969), BSD (1977), GNU tools (1983), and MINIX (1987). Linus Torvalds combined all these ideas and made them <em>free and open</em>.
</div>`
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 3 : WHAT IS AN OPERATING SYSTEM (Deep Dive)
        // ─────────────────────────────────────────────────────────────
        {
            id: "what-is-os",
            title: "What Exactly is an Operating System?",
            content: `
<p>Before understanding Linux, we need to understand what an OS actually does. Most people think of an OS as "Windows" or "the thing that shows the desktop." But technically, an OS is the <strong>bridge between your software and your hardware</strong>.</p>

<!-- OS ARCHITECTURE DIAGRAM -->
<div class="visual-container">
<svg width="620" height="340" viewBox="0 0 620 340" xmlns="http://www.w3.org/2000/svg">
    <rect width="620" height="340" fill="#0d1117" rx="12"/>

    <!-- Layer 4 — User Applications -->
    <rect x="30" y="20" width="560" height="55" rx="8" fill="#1f2937" stroke="#3fb950" stroke-width="2"/>
    <text x="310" y="44" fill="#3fb950" font-size="13" font-weight="bold" text-anchor="middle">👤 User Applications</text>
    <text x="310" y="62" fill="#9ca3af" font-size="11" text-anchor="middle">Chrome · Python Scripts · Jupyter · Docker · Your Data Pipeline</text>

    <!-- Arrow -->
    <polygon points="305,83 315,83 310,96" fill="#58a6ff"/>
    <text x="360" y="92" fill="#58a6ff" font-size="10">system calls</text>

    <!-- Layer 3 — Shell / User Space -->
    <rect x="30" y="100" width="560" height="55" rx="8" fill="#1f2937" stroke="#58a6ff" stroke-width="2"/>
    <text x="310" y="124" fill="#58a6ff" font-size="13" font-weight="bold" text-anchor="middle">🐚 Shell / User Space (CLI &amp; GUI)</text>
    <text x="310" y="142" fill="#9ca3af" font-size="11" text-anchor="middle">Bash · Python Interpreter · System Libraries (libc) · GUI Desktop</text>

    <!-- Arrow -->
    <polygon points="305,163 315,163 310,176" fill="#f85149"/>
    <text x="360" y="172" fill="#f85149" font-size="10">kernel calls</text>

    <!-- Layer 2 — Kernel -->
    <rect x="30" y="180" width="560" height="70" rx="8" fill="#2d1f3d" stroke="#bc8cff" stroke-width="2.5"/>
    <text x="310" y="204" fill="#bc8cff" font-size="14" font-weight="bold" text-anchor="middle">⚙️ Linux Kernel</text>
    <text x="150" y="226" fill="#c9d1d9" font-size="10" text-anchor="middle">Process Mgmt</text>
    <text x="250" y="226" fill="#c9d1d9" font-size="10" text-anchor="middle">Memory Mgmt</text>
    <text x="350" y="226" fill="#c9d1d9" font-size="10" text-anchor="middle">File System</text>
    <text x="460" y="226" fill="#c9d1d9" font-size="10" text-anchor="middle">Network Stack</text>
    <text x="310" y="244" fill="#8b949e" font-size="9" text-anchor="middle">CPU Scheduling · Device Drivers · Security · System Calls</text>

    <!-- Arrow -->
    <polygon points="305,258 315,258 310,271" fill="#d29922"/>
    <text x="360" y="267" fill="#d29922" font-size="10">hardware access</text>

    <!-- Layer 1 — Hardware -->
    <rect x="30" y="275" width="560" height="50" rx="8" fill="#1f2937" stroke="#d29922" stroke-width="2"/>
    <text x="310" y="297" fill="#d29922" font-size="13" font-weight="bold" text-anchor="middle">🖥️ Hardware</text>
    <text x="310" y="315" fill="#9ca3af" font-size="11" text-anchor="middle">CPU · RAM · SSD/HDD · Network Card · GPU · USB Devices</text>
</svg>
</div>

<div class="deep-dive-box" style="margin-top:20px;">
    <h4>🔬 Behind the Scenes: What Happens When You Run <code>python train.py</code>?</h4>
    <ol style="line-height:2;">
        <li><strong>You type the command</strong> → Shell (Bash) receives it</li>
        <li><strong>Shell asks the kernel</strong>: "Please find and run <code>python</code>"</li>
        <li><strong>Kernel looks in <code>$PATH</code></strong> → Finds <code>/usr/bin/python3</code></li>
        <li><strong>Kernel allocates RAM</strong> for the Python process</li>
        <li><strong>Kernel schedules CPU time</strong> for the process</li>
        <li><strong>Python reads your .py file</strong> → Kernel opens the file from the filesystem</li>
        <li><strong>GPU/CPU is used</strong> → Kernel handles device access</li>
        <li><strong>Output appears</strong> → Kernel writes to your terminal (stdout)</li>
    </ol>
    <p>Every single step goes through the <strong>kernel</strong>. That's why the kernel is called the "heart" of the OS.</p>
</div>`
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 4 : LINUS TORVALDS STORY
        // ─────────────────────────────────────────────────────────────
        {
            id: "linus-story",
            title: "The Student Who Changed the World",
            content: `
<div class="story-box">
    <h3 style="color:#ce93d8;margin-top:0;">📬 The Famous Usenet Post — August 25, 1991</h3>
    <p>A 21-year-old Finnish student at the University of Helsinki posted this message to a public forum:</p>

    <div class="terminal-block">
        <div class="terminal-header">
            <span class="terminal-dot" style="background:#ff5f56"></span>
            <span class="terminal-dot" style="background:#ffbd2e"></span>
            <span class="terminal-dot" style="background:#27c93f"></span>
            <span style="margin-left:8px;color:#888;font-size:11px;">comp.os.minix — Usenet Post by Linus Torvalds</span>
        </div>
        <pre style="color:#e6edf3;padding:16px;margin:0;white-space:pre-wrap;">From: torvalds@klaava.Helsinki.FI (Linus Benedict Torvalds)
Subject: What would you like to see most in minix?
Date: 25 Aug 91

Hello everybody out there using minix -

I'm doing a (free) operating system (just a hobby, won't be big
and professional like gnu) for 386(486) AT clones.

This has been brewing since april, and is starting to get ready.
I'd like any feedback on things people like/dislike in minix, as
my OS resembles it somewhat...

— Linus</pre>
    </div>

    <p style="margin-top:12px;">He called it "just a hobby." Today, Linux powers:</p>
</div>

<!-- IMPACT STATS SVG -->
<div class="visual-container" style="margin-top:16px;">
<svg width="620" height="160" viewBox="0 0 620 160" xmlns="http://www.w3.org/2000/svg">
    <rect width="620" height="160" fill="#0d1117" rx="10"/>

    <!-- Card 1 -->
    <rect x="15" y="20" width="120" height="120" rx="10" fill="#161b22" stroke="#bc8cff"/>
    <text x="75" y="62" fill="#bc8cff" font-size="22" font-weight="bold" text-anchor="middle">96.4%</text>
    <text x="75" y="82" fill="#c9d1d9" font-size="10" text-anchor="middle">of top 1M</text>
    <text x="75" y="96" fill="#c9d1d9" font-size="10" text-anchor="middle">web servers</text>
    <text x="75" y="120" fill="#8b949e" font-size="9" text-anchor="middle">Netcraft 2024</text>

    <!-- Card 2 -->
    <rect x="150" y="20" width="120" height="120" rx="10" fill="#161b22" stroke="#58a6ff"/>
    <text x="210" y="62" fill="#58a6ff" font-size="22" font-weight="bold" text-anchor="middle">100%</text>
    <text x="210" y="82" fill="#c9d1d9" font-size="10" text-anchor="middle">of Top 500</text>
    <text x="210" y="96" fill="#c9d1d9" font-size="10" text-anchor="middle">Supercomputers</text>
    <text x="210" y="120" fill="#8b949e" font-size="9" text-anchor="middle">TOP500 list</text>

    <!-- Card 3 -->
    <rect x="285" y="20" width="120" height="120" rx="10" fill="#161b22" stroke="#3fb950"/>
    <text x="345" y="62" fill="#3fb950" font-size="22" font-weight="bold" text-anchor="middle">90%+</text>
    <text x="345" y="82" fill="#c9d1d9" font-size="10" text-anchor="middle">Cloud VMs run</text>
    <text x="345" y="96" fill="#c9d1d9" font-size="10" text-anchor="middle">Linux (AWS/GCP)</text>
    <text x="345" y="120" fill="#8b949e" font-size="9" text-anchor="middle">IDC 2024</text>

    <!-- Card 4 -->
    <rect x="420" y="20" width="120" height="120" rx="10" fill="#161b22" stroke="#d29922"/>
    <text x="480" y="62" fill="#d29922" font-size="22" font-weight="bold" text-anchor="middle">30M+</text>
    <text x="480" y="82" fill="#c9d1d9" font-size="10" text-anchor="middle">lines of kernel</text>
    <text x="480" y="96" fill="#c9d1d9" font-size="10" text-anchor="middle">code (Linux 6.x)</text>
    <text x="480" y="120" fill="#8b949e" font-size="9" text-anchor="middle">kernel.org</text>

    <!-- Card 5 -->
    <rect x="487" y="20" width="120" height="120" rx="10" fill="#161b22" stroke="#f85149"/>
    <text x="547" y="62" fill="#f85149" font-size="18" font-weight="bold" text-anchor="middle">Android</text>
    <text x="547" y="82" fill="#c9d1d9" font-size="10" text-anchor="middle">3+ Billion</text>
    <text x="547" y="96" fill="#c9d1d9" font-size="10" text-anchor="middle">phones run</text>
    <text x="547" y="110" fill="#c9d1d9" font-size="10" text-anchor="middle">Linux kernel</text>
    <text x="547" y="128" fill="#8b949e" font-size="9" text-anchor="middle">Statista 2024</text>
</svg>
</div>

<div class="tip-box" style="margin-top:16px;">
    <strong>🔑 The MiNIX Connection:</strong> Linus was using MINIX — an educational UNIX-like OS created by Prof. Andrew Tanenbaum. He wanted to improve it but couldn't modify it freely (it wasn't fully open). So he wrote his own kernel from scratch, releasing it under the <strong>GPL license</strong> — meaning anyone could see, modify, and contribute to it.
</div>`
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 5 : OPEN SOURCE & LICENSING
        // ─────────────────────────────────────────────────────────────
        {
            id: "open-source",
            title: "Open Source & GNU-GPL: The Legal Foundation",
            content: `
<p>Understanding open source licensing is <strong>critical for your career</strong>. When you use libraries in your data pipelines or ML models, you need to know what licenses you're dealing with.</p>

<!-- LICENSE COMPARISON DIAGRAM -->
<div class="visual-container">
<svg width="620" height="260" viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
    <rect width="620" height="260" fill="#0d1117" rx="12"/>
    <text x="310" y="28" fill="#e6edf3" font-size="14" font-weight="bold" text-anchor="middle">Open Source License Spectrum</text>

    <!-- Spectrum bar -->
    <defs>
        <linearGradient id="spectrumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#3fb950"/>
            <stop offset="50%" style="stop-color:#d29922"/>
            <stop offset="100%" style="stop-color:#f85149"/>
        </linearGradient>
    </defs>
    <rect x="40" y="50" width="540" height="20" rx="10" fill="url(#spectrumGrad)"/>
    <text x="40" y="88" fill="#3fb950" font-size="11" text-anchor="start">More Permissive</text>
    <text x="580" y="88" fill="#f85149" font-size="11" text-anchor="end">More Restrictive</text>

    <!-- MIT Box -->
    <rect x="30" y="100" width="150" height="140" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="2"/>
    <text x="105" y="120" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">MIT License</text>
    <text x="105" y="136" fill="#8b949e" font-size="9" text-anchor="middle">Permissive</text>
    <line x1="45" y1="144" x2="165" y2="144" stroke="#30363d"/>
    <text x="48" y="160" fill="#c9d1d9" font-size="10">✅ Use in any project</text>
    <text x="48" y="176" fill="#c9d1d9" font-size="10">✅ Modify freely</text>
    <text x="48" y="192" fill="#c9d1d9" font-size="10">✅ Commercial use OK</text>
    <text x="48" y="208" fill="#c9d1d9" font-size="10">✅ Keep source private</text>
    <text x="48" y="224" fill="#8b949e" font-size="9">e.g. NumPy, TensorFlow</text>

    <!-- Apache Box -->
    <rect x="195" y="100" width="150" height="140" rx="8" fill="#161b22" stroke="#d29922" stroke-width="2"/>
    <text x="270" y="120" fill="#d29922" font-size="12" font-weight="bold" text-anchor="middle">Apache 2.0</text>
    <text x="270" y="136" fill="#8b949e" font-size="9" text-anchor="middle">Permissive + Patents</text>
    <line x1="210" y1="144" x2="330" y2="144" stroke="#30363d"/>
    <text x="212" y="160" fill="#c9d1d9" font-size="10">✅ Commercial use OK</text>
    <text x="212" y="176" fill="#c9d1d9" font-size="10">✅ Modify &amp; distribute</text>
    <text x="212" y="192" fill="#c9d1d9" font-size="10">⚠️ Must state changes</text>
    <text x="212" y="208" fill="#c9d1d9" font-size="10">✅ Patent protection</text>
    <text x="212" y="224" fill="#8b949e" font-size="9">e.g. Spark, Hadoop</text>

    <!-- GPL Box -->
    <rect x="360" y="100" width="230" height="140" rx="8" fill="#1f1520" stroke="#f85149" stroke-width="2"/>
    <text x="475" y="120" fill="#f85149" font-size="12" font-weight="bold" text-anchor="middle">GPL (Copyleft)</text>
    <text x="475" y="136" fill="#8b949e" font-size="9" text-anchor="middle">Restrictive — Linux's License</text>
    <line x1="375" y1="144" x2="575" y2="144" stroke="#30363d"/>
    <text x="378" y="160" fill="#c9d1d9" font-size="10">✅ Use &amp; modify freely</text>
    <text x="378" y="176" fill="#c9d1d9" font-size="10">⚠️ Derivatives MUST be GPL</text>
    <text x="378" y="192" fill="#c9d1d9" font-size="10">⚠️ Must share source code</text>
    <text x="378" y="208" fill="#c9d1d9" font-size="10">❌ Cannot go proprietary</text>
    <text x="378" y="224" fill="#8b949e" font-size="9">e.g. Linux Kernel, Git</text>
</svg>
</div>

<div class="info-box" style="margin-top:16px;">
    <h4>🔑 What is "Copyleft"?</h4>
    <p>The GPL uses a clever legal trick called <strong>copyleft</strong>. It says: <em>"You're free to use and modify this software — but if you distribute your modified version, you MUST also make it free and open."</em></p>
    <p>This ensures Linux stays free forever. Companies like Google and Amazon use the Linux kernel and must contribute their kernel changes back to the community. That's why Linux keeps improving so rapidly — thousands of companies are legally required to share improvements!</p>
</div>

<div class="warning-box" style="margin-top:12px;">
    <strong>⚠️ Career Tip:</strong> When your company builds a data product on top of a GPL library and ships it as a product, you may legally need to open-source your code. Always check licenses! MIT/Apache = safe for proprietary. GPL = check with your legal team.
</div>`
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 6 : WHY LINUX IS SECURE
        // ─────────────────────────────────────────────────────────────
        {
            id: "linux-security",
            title: "Why Linux is More Secure Than Windows",
            content: `
<!-- SECURITY COMPARISON SVG -->
<div class="visual-container">
<svg width="620" height="200" viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="620" height="200" fill="#0d1117" rx="10"/>
    <text x="310" y="28" fill="#e6edf3" font-size="14" font-weight="bold" text-anchor="middle">Security Model Comparison</text>

    <!-- Linux Side -->
    <rect x="20" y="45" width="270" height="140" rx="8" fill="#0f2a1a" stroke="#3fb950" stroke-width="2"/>
    <text x="155" y="68" fill="#3fb950" font-size="13" font-weight="bold" text-anchor="middle">🐧 Linux Security</text>
    <text x="35" y="90" fill="#c9d1d9" font-size="11">🌐 Open source → 10,000s of eyes</text>
    <text x="35" y="108" fill="#c9d1d9" font-size="11">🔐 Strict user permission model</text>
    <text x="35" y="126" fill="#c9d1d9" font-size="11">🧩 Modular → small attack surface</text>
    <text x="35" y="144" fill="#c9d1d9" font-size="11">🔄 Fast community patches</text>
    <text x="35" y="162" fill="#c9d1d9" font-size="11">💉 No auto-execute from USB</text>

    <!-- Windows Side -->
    <rect x="330" y="45" width="270" height="140" rx="8" fill="#2a1010" stroke="#f85149" stroke-width="2"/>
    <text x="465" y="68" fill="#f85149" font-size="13" font-weight="bold" text-anchor="middle">🪟 Windows Risks</text>
    <text x="345" y="90" fill="#c9d1d9" font-size="11">🔒 Closed source → blind trust</text>
    <text x="345" y="108" fill="#c9d1d9" font-size="11">👤 Single user = admin by default</text>
    <text x="345" y="126" fill="#c9d1d9" font-size="11">📦 Monolithic = larger attack surface</text>
    <text x="345" y="144" fill="#c9d1d9" font-size="11">⏳ Slower patch distribution</text>
    <text x="345" y="162" fill="#c9d1d9" font-size="11">🦠 #1 malware target (market share)</text>
</svg>
</div>

<div class="deep-dive-box" style="margin-top:16px;">
    <h4>🔬 Behind the Scenes: Linux's Permission System</h4>
    <p>Every file and process in Linux has an owner and a set of permissions. Even if malware gets into a regular user's account, it <strong>cannot touch system files</strong> without root access. This is completely different from older Windows versions where users ran as admins by default.</p>
    <div class="terminal-block">
        <div class="terminal-header">
            <span class="terminal-dot" style="background:#ff5f56"></span>
            <span class="terminal-dot" style="background:#ffbd2e"></span>
            <span class="terminal-dot" style="background:#27c93f"></span>
            <span style="margin-left:8px;color:#888;font-size:11px;">terminal</span>
        </div>
        <pre style="color:#e6edf3;padding:16px;margin:0;">$ ls -la /etc/shadow
---------- 1 root shadow 1234 Jan 15 10:00 /etc/shadow
<span style="color:#8b949e;"># Only ROOT can read this file (passwords are stored here)
# Even if a hacker gets YOUR account, they can't read it</span>

$ cat /etc/shadow
<span style="color:#f85149;">cat: /etc/shadow: Permission denied</span>
<span style="color:#8b949e;"># Blocked! Linux stops unauthorized access at kernel level</span></pre>
    </div>
</div>`
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 7 : CLI vs GUI vs VUI
        // ─────────────────────────────────────────────────────────────
        {
            id: "interfaces",
            title: "CLI vs GUI vs VUI — Three Ways to Talk to an OS",
            content: `
<p>An OS provides different <strong>interfaces</strong> for different users. As a Data Engineer, you'll live in the CLI, but it's important to understand all three.</p>

<!-- INTERFACE COMPARISON SVG WITH ANIMATIONS -->
<div class="visual-container">
<svg width="620" height="220" viewBox="0 0 620 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="620" height="220" fill="#0d1117" rx="10"/>

    <!-- CLI Panel -->
    <rect x="15" y="20" width="185" height="185" rx="10" fill="#0d2117" stroke="#3fb950" stroke-width="2"/>
    <rect x="15" y="20" width="185" height="30" rx="10" fill="#1a3d24"/>
    <rect x="15" y="38" width="185" height="12" fill="#1a3d24"/>
    <text x="107" y="42" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">CLI</text>
    <text x="107" y="57" fill="#8b949e" font-size="9" text-anchor="middle">Command Line Interface</text>
    <text x="30" y="78" fill="#3fb950" font-size="10" font-family="monospace">$ ls -la</text>
    <text x="30" y="94" fill="#c9d1d9" font-size="9" font-family="monospace">total 48</text>
    <text x="30" y="108" fill="#c9d1d9" font-size="9" font-family="monospace">drwxr-x 5 ravi</text>
    <text x="30" y="122" fill="#c9d1d9" font-size="9" font-family="monospace">-rw-r-- 1 ravi</text>
    <text x="30" y="136" fill="#3fb950" font-size="10" font-family="monospace">$ python train.py</text>
    <!-- Blinking cursor animation -->
    <rect x="186" y="128" width="7" height="12" fill="#3fb950" opacity="0.9">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </rect>
    <text x="107" y="165" fill="#8b949e" font-size="9" text-anchor="middle">Bash · Zsh · Fish</text>
    <text x="107" y="180" fill="#8b949e" font-size="9" text-anchor="middle">Fast · Scriptable · Low RAM</text>
    <text x="107" y="198" fill="#3fb950" font-size="9" text-anchor="middle">⭐ Your primary tool</text>

    <!-- GUI Panel -->
    <rect x="215" y="20" width="185" height="185" rx="10" fill="#1a1f2e" stroke="#58a6ff" stroke-width="2"/>
    <rect x="215" y="20" width="185" height="30" rx="10" fill="#1e2d4a"/>
    <rect x="215" y="38" width="185" height="12" fill="#1e2d4a"/>
    <text x="307" y="42" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">GUI</text>
    <text x="307" y="57" fill="#8b949e" font-size="9" text-anchor="middle">Graphical User Interface</text>
    <!-- Icons simulation -->
    <rect x="232" y="70" width="36" height="36" rx="6" fill="#1565c0"/>
    <text x="250" y="94" fill="#fff" font-size="18" text-anchor="middle">📁</text>
    <rect x="282" y="70" width="36" height="36" rx="6" fill="#2e7d32"/>
    <text x="300" y="94" fill="#fff" font-size="18" text-anchor="middle">📊</text>
    <rect x="332" y="70" width="36" height="36" rx="6" fill="#6a1b9a"/>
    <text x="350" y="94" fill="#fff" font-size="18" text-anchor="middle">🌐</text>
    <rect x="232" y="118" width="36" height="36" rx="6" fill="#c62828"/>
    <text x="250" y="142" fill="#fff" font-size="18" text-anchor="middle">⚙️</text>
    <rect x="282" y="118" width="36" height="36" rx="6" fill="#e65100"/>
    <text x="300" y="142" fill="#fff" font-size="18" text-anchor="middle">📝</text>
    <text x="307" y="175" fill="#8b949e" font-size="9" text-anchor="middle">Windows · macOS · GNOME</text>
    <text x="307" y="190" fill="#8b949e" font-size="9" text-anchor="middle">Intuitive · Beginner-friendly</text>

    <!-- VUI Panel -->
    <rect x="415" y="20" width="185" height="185" rx="10" fill="#1a1a10" stroke="#d29922" stroke-width="2"/>
    <rect x="415" y="20" width="185" height="30" rx="10" fill="#2d2810"/>
    <rect x="415" y="38" width="185" height="12" fill="#2d2810"/>
    <text x="507" y="42" fill="#d29922" font-size="12" font-weight="bold" text-anchor="middle">VUI</text>
    <text x="507" y="57" fill="#8b949e" font-size="9" text-anchor="middle">Voice User Interface</text>
    <!-- Sound waves animation -->
    <circle cx="507" cy="110" r="15" fill="#d29922" opacity="0.9"/>
    <text x="507" y="117" fill="#000" font-size="16" text-anchor="middle">🎤</text>
    <!-- Animated waves -->
    <circle cx="507" cy="110" r="25" fill="none" stroke="#d29922" stroke-width="1.5" opacity="0.6">
        <animate attributeName="r" values="20;35;20" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="507" cy="110" r="40" fill="none" stroke="#d29922" stroke-width="1" opacity="0.4">
        <animate attributeName="r" values="30;50;30" dur="2s" repeatCount="indefinite" begin="0.5s"/>
        <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" begin="0.5s"/>
    </circle>
    <text x="507" y="155" fill="#8b949e" font-size="9" text-anchor="middle">"Hey Alexa, play music"</text>
    <text x="507" y="170" fill="#8b949e" font-size="9" text-anchor="middle">Siri · Alexa · Google</text>
    <text x="507" y="185" fill="#8b949e" font-size="9" text-anchor="middle">Hands-free · Accessible</text>
</svg>
</div>

<div class="info-box" style="margin-top:16px;">
    <strong>🎯 Why CLI Matters for Data Engineering:</strong>
    <ul>
        <li><strong>Speed</strong>: <code>grep -r "error" logs/</code> takes 0.1 seconds. Same in GUI: 30 seconds.</li>
        <li><strong>Automation</strong>: You can run 1000 operations with a single script. GUI requires 1000 clicks.</li>
        <li><strong>Remote servers</strong>: Cloud servers have NO GUI. CLI is the only way in.</li>
        <li><strong>Low RAM</strong>: A CLI server uses ~50MB RAM. GUI desktop uses ~2GB. On a $5000/month server, that matters.</li>
    </ul>
</div>`
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 8 : OS FUNCTIONS
        // ─────────────────────────────────────────────────────────────
        {
            id: "os-functions",
            title: "What Does an OS Actually Do? (All 8 Functions Explained)",
            content: `
<p>The OS is not just "the software that boots up." It's an active manager running every moment your computer is on. Here are all 8 core functions with real examples from your work as a Data Engineer:</p>

<table class="comparison-table">
    <thead>
        <tr>
            <th>#</th>
            <th>Function</th>
            <th>What It Does</th>
            <th>Data Engineering Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="color:#bc8cff;font-weight:bold;">1</td>
            <td><strong>CPU Scheduling</strong></td>
            <td>Decides which process runs next and for how long</td>
            <td>When you run <code>spark-submit</code> and a Jupyter notebook simultaneously, the OS decides how much CPU each gets</td>
        </tr>
        <tr>
            <td style="color:#58a6ff;font-weight:bold;">2</td>
            <td><strong>Process Management</strong></td>
            <td>Creates, pauses, resumes, and kills processes</td>
            <td>When your ETL pipeline crashes, the OS cleans up orphaned processes automatically</td>
        </tr>
        <tr>
            <td style="color:#3fb950;font-weight:bold;">3</td>
            <td><strong>Memory Management</strong></td>
            <td>Allocates RAM to programs, uses swap when full</td>
            <td>Loading a 50GB dataset into pandas — OS manages which parts stay in RAM vs. get swapped to disk</td>
        </tr>
        <tr>
            <td style="color:#d29922;font-weight:bold;">4</td>
            <td><strong>File Management</strong></td>
            <td>Organizes files in directories, manages permissions</td>
            <td>Your data lake on <code>/data/raw/</code> — OS ensures only authorized jobs can write to it</td>
        </tr>
        <tr>
            <td style="color:#f85149;font-weight:bold;">5</td>
            <td><strong>Device Management</strong></td>
            <td>Controls hardware via device drivers</td>
            <td>GPU training in PyTorch — OS/drivers coordinate data flow between RAM and VRAM</td>
        </tr>
        <tr>
            <td style="color:#bc8cff;font-weight:bold;">6</td>
            <td><strong>User Interface</strong></td>
            <td>Provides CLI/GUI for user interaction</td>
            <td>Your terminal prompt — the interface between you and the kernel</td>
        </tr>
        <tr>
            <td style="color:#58a6ff;font-weight:bold;">7</td>
            <td><strong>Networking</strong></td>
            <td>Manages all network communication</td>
            <td>Connecting to PostgreSQL database, pulling data from APIs, SSH to remote servers</td>
        </tr>
        <tr>
            <td style="color:#3fb950;font-weight:bold;">8</td>
            <td><strong>Error Handling</strong></td>
            <td>Detects and recovers from hardware/software errors</td>
            <td>When a disk fails, the OS logs the error, remounts as read-only, prevents data corruption</td>
        </tr>
    </tbody>
</table>`,
            interactiveExample: {
                code: `# See CPU scheduling in action
top -b -n 1 | head -20

# See all running processes (process management)
ps aux | head -10

# Check memory management
free -h

# Check file system
df -h

# Check what devices are connected
lsblk`,
                explanation: "Try these commands to see all 8 OS functions in action on a real Linux system."
            }
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 9 : KERNEL TYPES
        // ─────────────────────────────────────────────────────────────
        {
            id: "kernel-types",
            title: "Types of Kernels: Monolithic vs Micro vs Hybrid",
            content: `
<p>The <strong>kernel</strong> is the most critical piece of software in your OS. Different OSes use different kernel architectures. Understanding this helps you understand WHY Linux performs the way it does.</p>

<!-- KERNEL TYPES DIAGRAM -->
<div class="visual-container">
<svg width="620" height="280" viewBox="0 0 620 280" xmlns="http://www.w3.org/2000/svg">
    <rect width="620" height="280" fill="#0d1117" rx="12"/>
    <text x="310" y="24" fill="#e6edf3" font-size="14" font-weight="bold" text-anchor="middle">Kernel Architecture Comparison</text>

    <!-- MONOLITHIC (Linux/Unix) -->
    <rect x="15" y="40" width="180" height="225" rx="8" fill="#0a1a0a" stroke="#3fb950" stroke-width="2"/>
    <text x="105" y="60" fill="#3fb950" font-size="12" font-weight="bold" text-anchor="middle">Monolithic Kernel</text>
    <text x="105" y="76" fill="#8b949e" font-size="9" text-anchor="middle">Linux · Unix</text>
    <!-- All in kernel space -->
    <rect x="25" y="85" width="160" height="165" rx="6" fill="#0d2a0d" stroke="#3fb950" stroke-dasharray="4"/>
    <text x="105" y="101" fill="#8b9e8b" font-size="9" text-anchor="middle">KERNEL SPACE</text>
    <rect x="35" y="108" width="140" height="22" rx="4" fill="#1a3d1a"/>
    <text x="105" y="123" fill="#c9d1d9" font-size="9" text-anchor="middle">Process Management</text>
    <rect x="35" y="134" width="140" height="22" rx="4" fill="#1a3d1a"/>
    <text x="105" y="149" fill="#c9d1d9" font-size="9" text-anchor="middle">Memory Management</text>
    <rect x="35" y="160" width="140" height="22" rx="4" fill="#1a3d1a"/>
    <text x="105" y="175" fill="#c9d1d9" font-size="9" text-anchor="middle">File System</text>
    <rect x="35" y="186" width="140" height="22" rx="4" fill="#1a3d1a"/>
    <text x="105" y="201" fill="#c9d1d9" font-size="9" text-anchor="middle">Device Drivers</text>
    <rect x="35" y="212" width="140" height="22" rx="4" fill="#1a3d1a"/>
    <text x="105" y="227" fill="#c9d1d9" font-size="9" text-anchor="middle">Network Stack</text>
    <text x="105" y="255" fill="#3fb950" font-size="9" text-anchor="middle">⚡ Fastest</text>

    <!-- MICROKERNEL -->
    <rect x="210" y="40" width="190" height="225" rx="8" fill="#0a0d1a" stroke="#58a6ff" stroke-width="2"/>
    <text x="305" y="60" fill="#58a6ff" font-size="12" font-weight="bold" text-anchor="middle">Microkernel</text>
    <text x="305" y="76" fill="#8b949e" font-size="9" text-anchor="middle">MINIX · QNX · Hurd</text>
    <!-- Kernel space - small -->
    <rect x="220" y="85" width="170" height="65" rx="6" fill="#0d172a" stroke="#58a6ff" stroke-dasharray="4"/>
    <text x="305" y="101" fill="#8b9eb8" font-size="9" text-anchor="middle">KERNEL SPACE (minimal)</text>
    <rect x="230" y="108" width="150" height="35" rx="4" fill="#1a2a4a"/>
    <text x="305" y="121" fill="#c9d1d9" font-size="9" text-anchor="middle">Process Management</text>
    <text x="305" y="133" fill="#c9d1d9" font-size="9" text-anchor="middle">Basic Memory Management</text>
    <!-- User space - large -->
    <rect x="220" y="158" width="170" height="95" rx="6" fill="#1a1a30" stroke="#58a6ff" stroke-dasharray="2"/>
    <text x="305" y="174" fill="#8b8eb8" font-size="9" text-anchor="middle">USER SPACE</text>
    <rect x="230" y="180" width="150" height="18" rx="4" fill="#2a2a50"/>
    <text x="305" y="193" fill="#c9d1d9" font-size="9" text-anchor="middle">File System (as service)</text>
    <rect x="230" y="202" width="150" height="18" rx="4" fill="#2a2a50"/>
    <text x="305" y="215" fill="#c9d1d9" font-size="9" text-anchor="middle">Device Drivers (as service)</text>
    <rect x="230" y="224" width="150" height="18" rx="4" fill="#2a2a50"/>
    <text x="305" y="237" fill="#c9d1d9" font-size="9" text-anchor="middle">Network Stack (as service)</text>
    <text x="305" y="258" fill="#58a6ff" font-size="9" text-anchor="middle">🛡️ Most Stable</text>

    <!-- HYBRID (Windows/macOS) -->
    <rect x="415" y="40" width="190" height="225" rx="8" fill="#1a0f0a" stroke="#d29922" stroke-width="2"/>
    <text x="510" y="60" fill="#d29922" font-size="12" font-weight="bold" text-anchor="middle">Hybrid Kernel</text>
    <text x="510" y="76" fill="#8b949e" font-size="9" text-anchor="middle">Windows NT · macOS · Android</text>
    <!-- Kernel space - medium -->
    <rect x="425" y="85" width="170" height="105" rx="6" fill="#2a1a0a" stroke="#d29922" stroke-dasharray="4"/>
    <text x="510" y="101" fill="#b89e8b" font-size="9" text-anchor="middle">KERNEL SPACE</text>
    <rect x="435" y="108" width="150" height="18" rx="4" fill="#4a2a0a"/>
    <text x="510" y="121" fill="#c9d1d9" font-size="9" text-anchor="middle">Process Management</text>
    <rect x="435" y="130" width="150" height="18" rx="4" fill="#4a2a0a"/>
    <text x="510" y="143" fill="#c9d1d9" font-size="9" text-anchor="middle">Memory Management</text>
    <rect x="435" y="152" width="150" height="18" rx="4" fill="#4a2a0a"/>
    <text x="510" y="165" fill="#c9d1d9" font-size="9" text-anchor="middle">File System + Scheduling</text>
    <!-- User space -->
    <rect x="425" y="198" width="170" height="55" rx="6" fill="#1a150a" stroke="#d29922" stroke-dasharray="2"/>
    <text x="510" y="214" fill="#b89e8b" font-size="9" text-anchor="middle">USER SPACE</text>
    <rect x="435" y="220" width="150" height="18" rx="4" fill="#3a2a0a"/>
    <text x="510" y="233" fill="#c9d1d9" font-size="9" text-anchor="middle">Some Device Drivers</text>
    <text x="510" y="258" fill="#d29922" font-size="9" text-anchor="middle">⚖️ Balanced</text>
</svg>
</div>

<table class="comparison-table" style="margin-top:16px;">
    <thead>
        <tr><th>Feature</th><th>Monolithic (Linux)</th><th>Microkernel (MINIX)</th><th>Hybrid (Windows)</th></tr>
    </thead>
    <tbody>
        <tr><td>Speed</td><td style="color:#3fb950">⚡ Fastest</td><td style="color:#f85149">Slower (IPC overhead)</td><td style="color:#d29922">Medium</td></tr>
        <tr><td>Stability</td><td style="color:#d29922">Good (crash may affect kernel)</td><td style="color:#3fb950">⭐ Best (isolated services)</td><td style="color:#d29922">Good</td></tr>
        <tr><td>Size</td><td style="color:#f85149">Large kernel</td><td style="color:#3fb950">Small kernel</td><td style="color:#d29922">Medium</td></tr>
        <tr><td>Adding Drivers</td><td style="color:#3fb950">Easy (loadable modules)</td><td style="color:#d29922">Moderate</td><td style="color:#d29922">Moderate</td></tr>
        <tr><td>Use Case</td><td style="color:#3fb950">Servers, Desktops, Cloud</td><td>Embedded, Safety-critical</td><td>Consumer OS</td></tr>
    </tbody>
</table>

<div class="tip-box" style="margin-top:12px;">
    <strong>💡 Why Linux chose Monolithic:</strong> Linus Torvalds and Prof. Tanenbaum had a famous public debate about this in 1992. Tanenbaum said MINIX's microkernel was better. Torvalds defended the monolithic approach for performance. Today, Linux wins in servers because <strong>speed matters more than microkernel modularity</strong> in production workloads. Linux gets the best of both worlds through <strong>Loadable Kernel Modules (LKMs)</strong> — you can add/remove drivers without rebooting!
</div>`
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 10 : USER SPACE vs KERNEL SPACE
        // ─────────────────────────────────────────────────────────────
        {
            id: "user-kernel-space",
            title: "User Space vs Kernel Space — The Great Divide",
            content: `
<p>This is one of the most important concepts in Linux. Understanding this will make you a better programmer and help you debug hard problems.</p>

<!-- ANIMATED USER vs KERNEL SPACE -->
<div class="visual-container">
<svg width="620" height="280" viewBox="0 0 620 280" xmlns="http://www.w3.org/2000/svg">
    <rect width="620" height="280" fill="#0d1117" rx="12"/>

    <!-- User Space -->
    <rect x="20" y="20" width="580" height="100" rx="8" fill="#0d1f0d" stroke="#3fb950" stroke-width="2"/>
    <text x="310" y="42" fill="#3fb950" font-size="13" font-weight="bold" text-anchor="middle">👤 USER SPACE (Unprivileged)</text>
    <text x="80" y="68" fill="#c9d1d9" font-size="10" text-anchor="middle">Your Python Script</text>
    <text x="200" y="68" fill="#c9d1d9" font-size="10" text-anchor="middle">Apache Web Server</text>
    <text x="330" y="68" fill="#c9d1d9" font-size="10" text-anchor="middle">MySQL Database</text>
    <text x="460" y="68" fill="#c9d1d9" font-size="10" text-anchor="middle">Jupyter Notebook</text>
    <text x="562" y="68" fill="#c9d1d9" font-size="10" text-anchor="middle">Bash Shell</text>
    <text x="310" y="92" fill="#8b949e" font-size="10" text-anchor="middle">❌ Cannot directly access hardware · ❌ Cannot touch other process memory · ✅ Crashes safely (doesn't kill system)</text>
    <text x="310" y="108" fill="#8b949e" font-size="9" text-anchor="middle">Memory: ~1-32GB addressable | Protected by CPU hardware (ring 3)</text>

    <!-- System Call Interface -->
    <rect x="20" y="128" width="580" height="28" rx="4" fill="#1f2937" stroke="#58a6ff" stroke-width="1.5"/>
    <text x="310" y="147" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">⬆️ SYSTEM CALL INTERFACE (read · write · fork · exec · mmap · socket · open) ⬇️</text>
    <!-- Animated arrows -->
    <line x1="100" y1="120" x2="100" y2="156" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="4">
        <animate attributeName="stroke-dashoffset" values="0;8" dur="0.5s" repeatCount="indefinite"/>
    </line>
    <line x1="250" y1="120" x2="250" y2="156" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="4">
        <animate attributeName="stroke-dashoffset" values="0;8" dur="0.7s" repeatCount="indefinite"/>
    </line>
    <line x1="400" y1="120" x2="400" y2="156" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="4">
        <animate attributeName="stroke-dashoffset" values="0;8" dur="0.6s" repeatCount="indefinite"/>
    </line>

    <!-- Kernel Space -->
    <rect x="20" y="163" width="580" height="100" rx="8" fill="#1f0a2e" stroke="#bc8cff" stroke-width="2"/>
    <text x="310" y="183" fill="#bc8cff" font-size="13" font-weight="bold" text-anchor="middle">⚙️ KERNEL SPACE (Privileged — Ring 0)</text>
    <text x="95" y="207" fill="#c9d1d9" font-size="10" text-anchor="middle">Process Scheduler</text>
    <text x="220" y="207" fill="#c9d1d9" font-size="10" text-anchor="middle">Memory Manager</text>
    <text x="345" y="207" fill="#c9d1d9" font-size="10" text-anchor="middle">VFS (File System)</text>
    <text x="470" y="207" fill="#c9d1d9" font-size="10" text-anchor="middle">Network Stack</text>
    <text x="562" y="207" fill="#c9d1d9" font-size="10" text-anchor="middle">Device Drivers</text>
    <text x="310" y="230" fill="#8b949e" font-size="10" text-anchor="middle">✅ Direct hardware access · ✅ All memory visible · ❌ Bug here = kernel panic (system crash)</text>
    <text x="310" y="248" fill="#8b949e" font-size="9" text-anchor="middle">CPU Ring 0 — highest privilege | Protected by hardware MMU</text>
</svg>
</div>

<div class="deep-dive-box" style="margin-top:16px;">
    <h4>🔬 What Happens When You Call <code>open("data.csv")</code> in Python?</h4>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <div style="flex:1;min-width:200px;background:#0d1117;border-radius:8px;padding:12px;border:1px solid #30363d;">
            <p style="margin:0;color:#bc8cff;font-weight:bold;font-size:12px;">Step 1 — Your Code (User Space)</p>
            <code style="color:#3fb950;font-size:11px;">f = open("data.csv")</code>
            <p style="margin:4px 0 0;color:#8b949e;font-size:11px;">Python's <code>open()</code> calls <code>libc</code>'s <code>fopen()</code></p>
        </div>
        <div style="flex:0 0 auto;display:flex;align-items:center;color:#58a6ff;">→</div>
        <div style="flex:1;min-width:200px;background:#0d1117;border-radius:8px;padding:12px;border:1px solid #30363d;">
            <p style="margin:0;color:#58a6ff;font-weight:bold;font-size:12px;">Step 2 — System Call</p>
            <code style="color:#3fb950;font-size:11px;">syscall(SYS_open, path, flags)</code>
            <p style="margin:4px 0 0;color:#8b949e;font-size:11px;">CPU switches from Ring 3 → Ring 0</p>
        </div>
        <div style="flex:0 0 auto;display:flex;align-items:center;color:#58a6ff;">→</div>
        <div style="flex:1;min-width:200px;background:#0d1117;border-radius:8px;padding:12px;border:1px solid #30363d;">
            <p style="margin:0;color:#bc8cff;font-weight:bold;font-size:12px;">Step 3 — Kernel (Ring 0)</p>
            <code style="color:#3fb950;font-size:11px;">do_sys_open() → VFS → ext4</code>
            <p style="margin:4px 0 0;color:#8b949e;font-size:11px;">Checks permissions, finds inode, returns file descriptor</p>
        </div>
        <div style="flex:0 0 auto;display:flex;align-items:center;color:#58a6ff;">→</div>
        <div style="flex:1;min-width:200px;background:#0d1117;border-radius:8px;padding:12px;border:1px solid #30363d;">
            <p style="margin:0;color:#3fb950;font-weight:bold;font-size:12px;">Step 4 — Back to User Space</p>
            <code style="color:#3fb950;font-size:11px;">fd = 3  # file descriptor</code>
            <p style="margin:4px 0 0;color:#8b949e;font-size:11px;">CPU switches back Ring 0 → Ring 3. Python gets file handle.</p>
        </div>
    </div>
</div>`,
            interactiveExample: {
                code: `# See system calls made by a program
# (Run this on a real Linux system)
strace -c ls /home 2>&1 | head -20

# Count total system calls
strace -c python3 -c "f=open('/etc/hostname')" 2>&1`,
                explanation: "strace shows every system call a program makes — the exact boundary crossings between user space and kernel space."
            }
        },

        // ─────────────────────────────────────────────────────────────
        // SECTION 11 : LINUX DISTROS
        // ─────────────────────────────────────────────────────────────
        {
            id: "linux-distros",
            title: "Linux Distributions — One Kernel, Many Flavors",
            content: `
<p>Linux is just the <em>kernel</em>. A <strong>distribution (distro)</strong> bundles the kernel with tools, package managers, and a user interface. Think of it like: Linux Kernel = Engine, Distro = The full car.</p>

<!-- DISTRO FAMILY TREE SVG -->
<div class="visual-container">
<svg width="620" height="260" viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
    <rect width="620" height="260" fill="#0d1117" rx="12"/>
    <text x="310" y="24" fill="#e6edf3" font-size="14" font-weight="bold" text-anchor="middle">Linux Distribution Family Tree</text>

    <!-- Linux Kernel root -->
    <rect x="240" y="36" width="140" height="32" rx="8" fill="#21262d" stroke="#bc8cff" stroke-width="2"/>
    <text x="310" y="57" fill="#bc8cff" font-size="12" font-weight="bold" text-anchor="middle">🐧 Linux Kernel</text>

    <!-- Branch lines -->
    <line x1="180" y1="68" x2="180" y2="88" stroke="#30363d" stroke-width="2"/>
    <line x1="310" y1="68" x2="310" y2="88" stroke="#30363d" stroke-width="2"/>
    <line x1="450" y1="68" x2="450" y2="88" stroke="#30363d" stroke-width="2"/>
    <line x1="180" y1="88" x2="450" y2="88" stroke="#30363d" stroke-width="2"/>

    <!-- Debian branch -->
    <line x1="100" y1="88" x2="100" y2="108" stroke="#58a6ff" stroke-width="2"/>
    <line x1="100" y1="88" x2="220" y2="88" stroke="#58a6ff" stroke-width="1"/>
    <rect x="40" y="108" width="120" height="30" rx="6" fill="#0d1f3c" stroke="#58a6ff"/>
    <text x="100" y="128" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">Debian (1993)</text>
    <!-- Debian children -->
    <line x1="60" y1="138" x2="60" y2="158" stroke="#3fb950" stroke-width="1.5"/>
    <line x1="100" y1="138" x2="100" y2="158" stroke="#3fb950" stroke-width="1.5"/>
    <line x1="145" y1="138" x2="145" y2="158" stroke="#3fb950" stroke-width="1.5"/>
    <rect x="18" y="158" width="80" height="26" rx="4" fill="#0f2a0f" stroke="#3fb950"/>
    <text x="58" y="175" fill="#3fb950" font-size="9" text-anchor="middle">🟠 Ubuntu</text>
    <rect x="72" y="158" width="60" height="26" rx="4" fill="#0f2a0f" stroke="#3fb950"/>
    <text x="102" y="175" fill="#3fb950" font-size="9" text-anchor="middle">Kali Linux</text>
    <rect x="118" y="158" width="55" height="26" rx="4" fill="#0f2a0f" stroke="#3fb950"/>
    <text x="145" y="175" fill="#3fb950" font-size="9" text-anchor="middle">Raspberry Pi</text>

    <!-- RHEL branch -->
    <line x1="310" y1="88" x2="310" y2="108" stroke="#f85149" stroke-width="2"/>
    <rect x="240" y="108" width="140" height="30" rx="6" fill="#2a0d0d" stroke="#f85149"/>
    <text x="310" y="128" fill="#f85149" font-size="11" font-weight="bold" text-anchor="middle">Red Hat / RHEL</text>
    <!-- RHEL children -->
    <line x1="270" y1="138" x2="270" y2="158" stroke="#d29922" stroke-width="1.5"/>
    <line x1="320" y1="138" x2="320" y2="158" stroke="#d29922" stroke-width="1.5"/>
    <line x1="370" y1="138" x2="370" y2="158" stroke="#d29922" stroke-width="1.5"/>
    <rect x="230" y="158" width="70" height="26" rx="4" fill="#2a1a0a" stroke="#d29922"/>
    <text x="265" y="175" fill="#d29922" font-size="9" text-anchor="middle">🎩 Fedora</text>
    <rect x="298" y="158" width="70" height="26" rx="4" fill="#2a1a0a" stroke="#d29922"/>
    <text x="333" y="175" fill="#d29922" font-size="9" text-anchor="middle">CentOS</text>
    <rect x="348" y="158" width="68" height="26" rx="4" fill="#2a1a0a" stroke="#d29922"/>
    <text x="382" y="175" fill="#d29922" font-size="9" text-anchor="middle">Rocky Linux</text>

    <!-- Arch/SUSE branch -->
    <line x1="530" y1="88" x2="530" y2="108" stroke="#58a6ff" stroke-width="2"/>
    <line x1="450" y1="88" x2="530" y2="88" stroke="#58a6ff" stroke-width="1"/>
    <rect x="462" y="108" width="136" height="30" rx="6" fill="#1a1a30" stroke="#58a6ff"/>
    <text x="530" y="128" fill="#58a6ff" font-size="11" font-weight="bold" text-anchor="middle">SUSE / Arch Linux</text>
    <!-- Children -->
    <line x1="490" y1="138" x2="490" y2="158" stroke="#3fb950" stroke-width="1.5"/>
    <line x1="545" y1="138" x2="545" y2="158" stroke="#3fb950" stroke-width="1.5"/>
    <rect x="450" y="158" width="80" height="26" rx="4" fill="#0f2a0f" stroke="#3fb950"/>
    <text x="490" y="175" fill="#3fb950" font-size="9" text-anchor="middle">openSUSE</text>
    <rect x="510" y="158" width="72" height="26" rx="4" fill="#0f2a0f" stroke="#3fb950"/>
    <text x="546" y="175" fill="#3fb950" font-size="9" text-anchor="middle">Manjaro</text>

    <!-- Data Eng recommendation note -->
    <rect x="18" y="200" width="585" height="50" rx="8" fill="#0d1f0d" stroke="#3fb950" stroke-width="1.5"/>
    <text x="310" y="220" fill="#3fb950" font-size="11" font-weight="bold" text-anchor="middle">🎯 For Data Engineering / ML:</text>
    <text x="310" y="238" fill="#c9d1d9" font-size="10" text-anchor="middle">Ubuntu (learning/dev) · CentOS/RHEL (enterprise production servers) · Amazon Linux 2 (AWS) · Debian (stable servers)</text>
</svg>
</div>`
        }
    ],

    // ─────────────────────────────────────────────────────────────────
    // INTERACTIVE CONSOLE COMPONENT
    // ─────────────────────────────────────────────────────────────────
    interactiveConsole: {
        title: "🖥️ Try It: Linux Info Commands",
        description: "Simulate real Linux history and system commands. These are commands you'd use to check your OS version and kernel info:",
        commands: [
            {
                id: "cmd1",
                label: "Check OS info",
                command: "uname -a",
                output: `Linux ravi-laptop 6.5.0-18-generic #18-Ubuntu SMP x86_64 GNU/Linux

← Kernel name: Linux
← Hostname: ravi-laptop  
← Kernel version: 6.5.0-18-generic
← Build info: #18-Ubuntu SMP PREEMPT_DYNAMIC
← Architecture: x86_64 (64-bit)
← OS: GNU/Linux`
            },
            {
                id: "cmd2",
                label: "Kernel version only",
                command: "uname -r",
                output: `6.5.0-18-generic

← This is your running kernel version
← 6   = Major version (Linux 6.x series)
← 5   = Minor version
← 0   = Patch number  
← 18  = Local build number
← generic = kernel variant (Ubuntu's general purpose)`
            },
            {
                id: "cmd3",
                label: "Check Linux distro",
                command: "cat /etc/os-release",
                output: `PRETTY_NAME="Ubuntu 22.04.3 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"

← Ubuntu is based on Debian (ID_LIKE=debian)
← LTS = Long Term Support (5 years of security updates)
← 22.04 = Released April 2022`
            },
            {
                id: "cmd4",
                label: "Who made this kernel?",
                command: "uname -v",
                output: `#18-Ubuntu SMP PREEMPT_DYNAMIC Wed Feb  7 13:09:18 UTC 2024

← This kernel was compiled by Ubuntu on Feb 7, 2024
← SMP = Symmetric Multi-Processing (multi-core support)
← PREEMPT_DYNAMIC = can preempt kernel tasks (responsive)
← Linus Torvalds still reviews and merges the main kernel!`
            },
            {
                id: "cmd5",
                label: "Architecture (64-bit?)",
                command: "uname -m",
                output: `x86_64

← x86_64 means you're on a 64-bit Intel/AMD processor
← Other values you might see:
←   aarch64  = ARM 64-bit (Raspberry Pi 4, Apple M1/M2)
←   i686     = 32-bit Intel (old systems)
←   riscv64  = RISC-V 64-bit (emerging architecture)`
            },
            {
                id: "cmd6",
                label: "Check open source license",
                command: "cat /usr/share/doc/linux-image-$(uname -r)/copyright 2>/dev/null | head -5 || echo 'Linux Kernel License: GNU GPL v2'",
                output: `Linux Kernel License: GNU GPL v2

The Linux kernel and its associated modules are licensed under
the GNU General Public License version 2 (GPL v2).

This means:
← You can view the full source: kernel.org
← You can modify it freely
← If you distribute modifications, you MUST share source code
← Linus Torvalds deliberately chose GPL to keep Linux free forever`
            }
        ]
    },

    // ─────────────────────────────────────────────────────────────────
    // PRACTICE EXERCISES
    // ─────────────────────────────────────────────────────────────────
    practiceExercises: [
        {
            id: "ex-history-1",
            difficulty: "Easy",
            title: "System Detective",
            description: "Ravi's new job requires him to document the server's OS details. Write the commands to find: (1) the full kernel name and version, (2) the distro name and version, (3) the machine architecture.",
            starterCode: `#!/bin/bash
# Task: Document this server's OS information
# Replace the ??? with the correct commands

echo "=== Kernel Info ==="
???  # Show all kernel info in one line

echo "=== Distro Name & Version ==="
???  # Show distro details from /etc/os-release

echo "=== Architecture ==="
???  # Show CPU architecture (x86_64, aarch64, etc.)`,
            solution: `#!/bin/bash
# Task: Document this server's OS information

echo "=== Kernel Info ==="
uname -a   # Show all kernel info in one line

echo "=== Distro Name & Version ==="
cat /etc/os-release   # Show distro details

echo "=== Architecture ==="
uname -m   # Show CPU architecture`,
            explanation: "uname -a gives everything in one line. cat /etc/os-release gives detailed distro info. uname -m gives the CPU architecture which matters when downloading binaries."
        },
        {
            id: "ex-history-2",
            difficulty: "Easy",
            title: "License Explorer",
            description: "Linux uses the GPL license. Write a simple shell script that explains what open source means by printing the 4 freedoms defined by the Free Software Foundation.",
            starterCode: `#!/bin/bash
# Print the 4 essential freedoms of Free/Open Source Software

echo "The 4 Freedoms of Free Software (GNU/FSF):"
echo ""
echo "Freedom 0: ???"
echo "Freedom 1: ???"
echo "Freedom 2: ???"
echo "Freedom 3: ???"`,
            solution: `#!/bin/bash
# Print the 4 essential freedoms of Free/Open Source Software

echo "The 4 Freedoms of Free Software (GNU/FSF):"
echo ""
echo "Freedom 0: The freedom to RUN the program for any purpose"
echo "Freedom 1: The freedom to STUDY how the program works (requires source code)"
echo "Freedom 2: The freedom to REDISTRIBUTE copies to help others"
echo "Freedom 3: The freedom to DISTRIBUTE modified versions (requires source code)"
echo ""
echo "Linux is GPL — all 4 freedoms guaranteed!"`,
            explanation: "These 4 freedoms are the foundation of the open source movement. The GPL ensures all 4 are preserved even in derivative works."
        },
        {
            id: "ex-history-3",
            difficulty: "Medium",
            title: "OS Function Inspector",
            description: "Write a script that demonstrates 4 of the 8 OS functions by running appropriate commands and labeling what function each demonstrates.",
            starterCode: `#!/bin/bash
# OS Functions Demo Script

echo "======================================="
echo "  Linux OS Functions Demonstration"
echo "======================================="

echo ""
echo "1. PROCESS MANAGEMENT:"
# Show the 5 most CPU-intensive processes
???

echo ""
echo "2. MEMORY MANAGEMENT:"
# Show RAM usage in human-readable format
???

echo ""
echo "3. FILE MANAGEMENT:"
# Show disk usage of all mounted filesystems
???

echo ""
echo "4. CPU SCHEDULING (System Load):"
# Show system uptime and load average
???`,
            solution: `#!/bin/bash
# OS Functions Demo Script

echo "======================================="
echo "  Linux OS Functions Demonstration"
echo "======================================="

echo ""
echo "1. PROCESS MANAGEMENT:"
# Show the 5 most CPU-intensive processes
ps aux --sort=-%cpu | head -6

echo ""
echo "2. MEMORY MANAGEMENT:"
# Show RAM usage in human-readable format
free -h

echo ""
echo "3. FILE MANAGEMENT:"
# Show disk usage of all mounted filesystems
df -h

echo ""
echo "4. CPU SCHEDULING (System Load):"
# Show system uptime and load average
uptime`,
            explanation: "ps aux shows processes (Process Management), free -h shows RAM (Memory Management), df -h shows filesystems (File Management), and uptime shows the load average which reflects CPU Scheduling activity."
        },
        {
            id: "ex-history-4",
            difficulty: "Medium",
            title: "Kernel Space vs User Space Quiz Script",
            description: "Write a script that checks whether common programs run in user space or kernel space, and print an explanation for each.",
            starterCode: `#!/bin/bash
# Kernel Space vs User Space identification

programs=("bash" "python3" "ls" "grep")

for prog in "\${programs[@]}"; do
    echo "Program: $prog"
    echo "  Location: $(which $prog 2>/dev/null || echo 'built-in')"
    echo "  Runs in: ???"   # Add logic: all user programs run in user space
    echo "  PID when running: $(pgrep $prog | head -1 || echo 'not running')"
    echo "---"
done

echo ""
echo "NOTE: The Linux KERNEL runs in kernel space (ring 0)"
echo "All programs above run in USER space (ring 3)"`,
            solution: `#!/bin/bash
# Kernel Space vs User Space identification

programs=("bash" "python3" "ls" "grep")

for prog in "\${programs[@]}"; do
    echo "Program: $prog"
    echo "  Location: $(which $prog 2>/dev/null || echo 'built-in')"
    echo "  Runs in: USER SPACE (ring 3) - protected and sandboxed"
    echo "  PID when running: $(pgrep $prog | head -1 || echo 'not running')"
    echo "---"
done

echo ""
echo "NOTE: The Linux KERNEL runs in kernel space (ring 0)"
echo "All programs above run in USER space (ring 3)"
echo "They communicate through system calls (the bridge)"`,
            explanation: "All user programs — bash, python, ls, grep — run in user space. Only the kernel runs in kernel space. The 'which' command finds the binary location, and 'pgrep' finds running instances."
        },
        {
            id: "ex-history-5",
            difficulty: "Hard",
            title: "System Report Generator",
            description: "Ravi's manager asked for a full system report. Create a script that generates a formatted report with: OS details, kernel info, CPU architecture, uptime, memory, and a recommendation for which Linux distro to use in production (based on the detected OS family).",
            starterCode: `#!/bin/bash
# System Report Generator

echo "=========================================="
echo "       SYSTEM INFORMATION REPORT"
echo "  Generated: $(date)"
echo "=========================================="

# 1. OS Information
echo ""
echo "OS INFORMATION:"
# Get OS name and version from /etc/os-release
OS_NAME=$(grep '^NAME=' /etc/os-release | cut -d'=' -f2 | tr -d '"')
OS_VERSION=$(???)  # Get VERSION_ID from /etc/os-release
echo "  OS: $OS_NAME $OS_VERSION"

# 2. Kernel
echo ""
echo "KERNEL:"
echo "  Full: $(uname -a)"
echo "  Release: $(???)"  # Just the release number

# 3. Hardware
echo ""
echo "HARDWARE:"
ARCH=$(uname -m)
CPU_CORES=$(nproc)
echo "  Architecture: $ARCH"
echo "  CPU Cores: $CPU_CORES"
echo "  RAM: $(free -h | awk '/^Mem:/ {print $2}')"

# 4. Uptime
echo ""
echo "AVAILABILITY:"
echo "  $(uptime)"

# 5. Recommendation (based on OS family)
echo ""
echo "PRODUCTION RECOMMENDATION:"
OS_ID=$(grep '^ID=' /etc/os-release | cut -d'=' -f2 | tr -d '"')
case "$OS_ID" in
    ubuntu|debian)
        echo "  ✅ Detected Debian family"
        echo "  → For production: Use Ubuntu 22.04 LTS or Debian Stable"
        ;;
    ???)  # Add case for rhel, centos, fedora
        echo "  ✅ Detected Red Hat family"
        echo "  → For production: Use RHEL 9 or Rocky Linux 9"
        ;;
    *)
        echo "  ℹ️  OS family: $OS_ID — check distro docs for LTS recommendations"
        ;;
esac

echo ""
echo "=========================================="`,
            solution: `#!/bin/bash
# System Report Generator

echo "=========================================="
echo "       SYSTEM INFORMATION REPORT"
echo "  Generated: $(date)"
echo "=========================================="

# 1. OS Information
echo ""
echo "OS INFORMATION:"
OS_NAME=$(grep '^NAME=' /etc/os-release | cut -d'=' -f2 | tr -d '"')
OS_VERSION=$(grep '^VERSION_ID=' /etc/os-release | cut -d'=' -f2 | tr -d '"')
echo "  OS: $OS_NAME $OS_VERSION"

# 2. Kernel
echo ""
echo "KERNEL:"
echo "  Full: $(uname -a)"
echo "  Release: $(uname -r)"

# 3. Hardware
echo ""
echo "HARDWARE:"
ARCH=$(uname -m)
CPU_CORES=$(nproc)
echo "  Architecture: $ARCH"
echo "  CPU Cores: $CPU_CORES"
echo "  RAM: $(free -h | awk '/^Mem:/ {print $2}')"

# 4. Uptime
echo ""
echo "AVAILABILITY:"
echo "  $(uptime)"

# 5. Recommendation
echo ""
echo "PRODUCTION RECOMMENDATION:"
OS_ID=$(grep '^ID=' /etc/os-release | cut -d'=' -f2 | tr -d '"')
case "$OS_ID" in
    ubuntu|debian)
        echo "  ✅ Detected Debian family"
        echo "  → For production: Use Ubuntu 22.04 LTS or Debian Stable"
        ;;
    rhel|centos|fedora|rocky|almalinux)
        echo "  ✅ Detected Red Hat family"
        echo "  → For production: Use RHEL 9 or Rocky Linux 9"
        ;;
    amzn)
        echo "  ✅ Detected Amazon Linux"
        echo "  → For production: Use Amazon Linux 2023 on AWS"
        ;;
    *)
        echo "  ℹ️  OS family: $OS_ID — check distro docs for LTS recommendations"
        ;;
esac

echo ""
echo "=========================================="`,
            explanation: "This script combines: grep + cut to parse /etc/os-release key=value pairs, uname flags for kernel info, free + awk for RAM extraction, nproc for CPU count, and a case statement for OS-based recommendations. The tr -d '\"' removes quotes from values in the file."
        }
    ],

    // ─────────────────────────────────────────────────────────────────
    // SUMMARY
    // ─────────────────────────────────────────────────────────────────
    summary: `
<div style="background:#0d1117;border:1px solid #30363d;border-radius:10px;padding:20px;">
    <h3 style="color:#bc8cff;margin-top:0;">📚 What Ravi Learned Today</h3>
    <div class="cards-grid">
        <div class="mini-card">
            <strong style="color:#3fb950;">🐧 Linux Origin</strong>
            <p>Linus Torvalds (21 years old!) released Linux 0.01 in 1991. It built on UNIX (1969), GNU (1983), and MINIX (1987). Today it runs 96%+ of web servers.</p>
        </div>
        <div class="mini-card">
            <strong style="color:#58a6ff;">⚖️ GPL License</strong>
            <p>Linux uses the GPL (copyleft) license. Any derivative work MUST also be open source. This is why Linux stays free forever and companies contribute back.</p>
        </div>
        <div class="mini-card">
            <strong style="color:#d29922;">⚙️ Kernel Types</strong>
            <p>Linux uses a Monolithic kernel (fastest). MINIX uses Microkernel (most stable). Windows uses Hybrid. Linux adds modularity via loadable kernel modules (.ko files).</p>
        </div>
        <div class="mini-card">
            <strong style="color:#f85149;">🛡️ User vs Kernel Space</strong>
            <p>User programs run in ring 3 (restricted). Kernel runs in ring 0 (full access). They communicate via system calls. A crash in user space = safe. In kernel space = kernel panic.</p>
        </div>
        <div class="mini-card">
            <strong style="color:#bc8cff;">🖥️ OS Functions</strong>
            <p>8 core functions: CPU Scheduling, Process Management, Memory Management, File Management, Device Management, UI, Networking, Error Handling.</p>
        </div>
        <div class="mini-card">
            <strong style="color:#3fb950;">📊 Key Commands</strong>
            <p><code>uname -a</code> (all info), <code>uname -r</code> (kernel version), <code>uname -m</code> (architecture), <code>cat /etc/os-release</code> (distro details).</p>
        </div>
    </div>
    <div class="tip-box" style="margin-top:16px;">
        <strong>🚀 Ravi's Takeaway:</strong> "Linux isn't just a tool — it's a philosophy. Open, free, community-driven. Every time I run a command on a server, I'm using code that thousands of engineers worldwide contributed. That's powerful."
    </div>
    <div style="margin-top:16px;text-align:center;">
        <span style="color:#8b949e;font-size:13px;">Next Module: </span>
        <strong style="color:#bc8cff;">Linux Architecture — How All the Layers Fit Together ➡️</strong>
    </div>
</div>`
};