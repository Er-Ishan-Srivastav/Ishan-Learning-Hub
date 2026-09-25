// ============================================================
// terminal.js — Terminal & Shell Basics
// myPathshala Linux Programming Platform
// Variable: terminalBasics
// ============================================================

var terminalBasics = {

    title: "Terminal & Shell Basics",
    description: "From bare metal to your command line — the complete story of OS, terminals, and shells",
    breadcrumb: "Getting Started > Terminal &amp; Shell Basics",

    sections: [

// ═══ SECTION 1 — What Is an Operating System ═══
{
    id: "what_is_os",
    content: `
<h3>🖥️ What Is an Operating System?</h3>

<div class="story-box">
    <h4>🏙️ The City Government Analogy</h4>
    <p>Imagine a city with thousands of residents, cars, buildings, power lines, and water pipes — but no government. Every person fights for the same road, companies dump waste anywhere, construction happens randomly. Chaos. An <strong>Operating System is the government of your computer</strong>. It decides who gets CPU time, who gets memory, who can write to disk, and who can talk to the network — all simultaneously, all fairly, all securely.</p>
</div>

<div class="visual-container">
    <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes appPulse { 0%,100%{opacity:0.55} 50%{opacity:1} }
                @keyframes flowLine { 0%{stroke-dashoffset:20} 100%{stroke-dashoffset:0} }
                .ap1{animation:appPulse 2s ease-in-out infinite}
                .ap2{animation:appPulse 2s ease-in-out infinite 0.65s}
                .ap3{animation:appPulse 2s ease-in-out infinite 1.3s}
                .fl{stroke-dasharray:5,3;animation:flowLine 1s linear infinite}
            </style>
        </defs>
        <text x="380" y="22" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="Space Grotesk">Operating System — The Resource Manager</text>

        <!-- Apps row -->
        <rect x="30"  y="42" width="100" height="48" rx="8" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5" class="ap1"/>
        <text x="80"  y="66"  text-anchor="middle" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">Python</text>
        <text x="80"  y="82"  text-anchor="middle" fill="#64748b" font-size="9">your script</text>

        <rect x="148" y="42" width="100" height="48" rx="8" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5" class="ap2"/>
        <text x="198" y="66"  text-anchor="middle" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">Spark</text>
        <text x="198" y="82"  text-anchor="middle" fill="#64748b" font-size="9">data pipeline</text>

        <rect x="266" y="42" width="100" height="48" rx="8" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5" class="ap3"/>
        <text x="316" y="66"  text-anchor="middle" fill="#a78bfa" font-size="11" font-family="JetBrains Mono">Docker</text>
        <text x="316" y="82"  text-anchor="middle" fill="#64748b" font-size="9">container</text>

        <rect x="384" y="42" width="100" height="48" rx="8" fill="#131a2b" stroke="#34d399" stroke-width="1.5" class="ap1"/>
        <text x="434" y="66"  text-anchor="middle" fill="#34d399" font-size="11" font-family="JetBrains Mono">bash</text>
        <text x="434" y="82"  text-anchor="middle" fill="#64748b" font-size="9">your shell</text>

        <rect x="502" y="42" width="100" height="48" rx="8" fill="#131a2b" stroke="#fbbf24" stroke-width="1.5" class="ap2"/>
        <text x="552" y="66"  text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">TensorFlow</text>
        <text x="552" y="82"  text-anchor="middle" fill="#64748b" font-size="9">ML training</text>

        <rect x="620" y="42" width="110" height="48" rx="8" fill="#131a2b" stroke="#fb923c" stroke-width="1.5" class="ap3"/>
        <text x="675" y="66"  text-anchor="middle" fill="#fb923c" font-size="11" font-family="JetBrains Mono">vim / nginx</text>
        <text x="675" y="82"  text-anchor="middle" fill="#64748b" font-size="9">editor / server</text>

        <text x="380" y="110" text-anchor="middle" fill="#64748b" font-size="11" font-weight="bold" font-family="JetBrains Mono">── USER SPACE (Applications) ──</text>

        <!-- Syscall arrows apps→kernel -->
        <line x1="80"  y1="90" x2="100" y2="162" stroke="#22d3ee" stroke-width="1.5" class="fl"/>
        <line x1="198" y1="90" x2="200" y2="162" stroke="#22d3ee" stroke-width="1.5" class="fl"/>
        <line x1="316" y1="90" x2="310" y2="162" stroke="#a78bfa" stroke-width="1.5" class="fl"/>
        <line x1="434" y1="90" x2="400" y2="162" stroke="#34d399" stroke-width="1.5" class="fl"/>
        <line x1="552" y1="90" x2="500" y2="162" stroke="#fbbf24" stroke-width="1.5" class="fl"/>
        <line x1="675" y1="90" x2="610" y2="162" stroke="#fb923c" stroke-width="1.5" class="fl"/>
        <text x="200" y="138" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">system calls (syscalls)</text>

        <!-- OS Kernel -->
        <rect x="30" y="162" width="700" height="78" rx="14" fill="#1a0e1a" stroke="#f87171" stroke-width="2.5"/>
        <text x="380" y="190" text-anchor="middle" fill="#f87171" font-size="14" font-weight="bold" font-family="JetBrains Mono">OPERATING SYSTEM KERNEL</text>
        <text x="95"  y="215" text-anchor="middle" fill="#94a3b8" font-size="10">Process Scheduler</text>
        <text x="220" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">Memory Manager</text>
        <text x="340" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">File System</text>
        <text x="455" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">Network Stack</text>
        <text x="570" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">Device Drivers</text>
        <text x="680" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">Security</text>
        <text x="380" y="234" text-anchor="middle" fill="#64748b" font-size="9" font-style="italic">— allocates, protects, schedules, arbitrates all hardware resources —</text>

        <!-- Hardware arrows kernel→hw -->
        <line x1="95"  y1="240" x2="80"  y2="268" stroke="#f87171" stroke-width="1.5" class="fl"/>
        <line x1="198" y1="240" x2="198" y2="268" stroke="#f87171" stroke-width="1.5" class="fl"/>
        <line x1="316" y1="240" x2="316" y2="268" stroke="#f87171" stroke-width="1.5" class="fl"/>
        <line x1="434" y1="240" x2="434" y2="268" stroke="#f87171" stroke-width="1.5" class="fl"/>
        <line x1="552" y1="240" x2="552" y2="268" stroke="#f87171" stroke-width="1.5" class="fl"/>

        <!-- Hardware row -->
        <rect x="30"  y="268" width="100" height="42" rx="8" fill="#182035" stroke="#64748b" stroke-width="1.5"/>
        <text x="80"  y="290" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">CPU</text>
        <text x="80"  y="304" text-anchor="middle" fill="#64748b" font-size="9">8 cores</text>

        <rect x="148" y="268" width="100" height="42" rx="8" fill="#182035" stroke="#64748b" stroke-width="1.5"/>
        <text x="198" y="290" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">RAM</text>
        <text x="198" y="304" text-anchor="middle" fill="#64748b" font-size="9">16 GB</text>

        <rect x="266" y="268" width="100" height="42" rx="8" fill="#182035" stroke="#64748b" stroke-width="1.5"/>
        <text x="316" y="290" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">DISK</text>
        <text x="316" y="304" text-anchor="middle" fill="#64748b" font-size="9">1 TB NVMe</text>

        <rect x="384" y="268" width="100" height="42" rx="8" fill="#182035" stroke="#64748b" stroke-width="1.5"/>
        <text x="434" y="290" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">NETWORK</text>
        <text x="434" y="304" text-anchor="middle" fill="#64748b" font-size="9">1 Gbps NIC</text>

        <rect x="502" y="268" width="100" height="42" rx="8" fill="#182035" stroke="#64748b" stroke-width="1.5"/>
        <text x="552" y="290" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">GPU</text>
        <text x="552" y="304" text-anchor="middle" fill="#64748b" font-size="9">NVIDIA A100</text>

        <rect x="620" y="268" width="110" height="42" rx="8" fill="#182035" stroke="#64748b" stroke-width="1.5"/>
        <text x="675" y="290" text-anchor="middle" fill="#64748b" font-size="10" font-family="JetBrains Mono">I/O DEVICES</text>
        <text x="675" y="304" text-anchor="middle" fill="#64748b" font-size="9">kbd · mouse · display</text>

        <text x="380" y="326" text-anchor="middle" fill="#64748b" font-size="11" font-weight="bold" font-family="JetBrains Mono">── HARDWARE LAYER ──</text>
    </svg>
    <div class="caption">The OS kernel sits between ALL applications and ALL hardware — nothing bypasses it</div>
</div>

<h4>The 6 Core Jobs of Any Operating System</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>⚙️ 1. Process Management</h5>
        <p>Creates, schedules, and kills processes. On an 8-core machine, the OS juggles <strong>500+ processes</strong> simultaneously using time-slicing — switching every 1ms so fast you perceive parallelism.</p>
    </div>
    <div class="mini-card">
        <h5>🧠 2. Memory Management</h5>
        <p>Gives each process a private virtual address space. 10 programs each "think" they have all 16GB RAM. The MMU translates virtual→physical at hardware speed.</p>
    </div>
    <div class="mini-card">
        <h5>📂 3. File System</h5>
        <p>Abstracts storage into directories and files. Handles reads/writes, permissions, journaling, and caching. In Linux, <strong>everything is a file</strong> — even hardware devices.</p>
    </div>
    <div class="mini-card">
        <h5>🌐 4. Device Management</h5>
        <p>Device drivers give a uniform interface to hardware. Your Python reads a file the same way whether it's on NVMe SSD, HDD, or NFS over the network.</p>
    </div>
    <div class="mini-card">
        <h5>🔐 5. Security &amp; Access Control</h5>
        <p>Enforces permissions (chmod/chown). Prevents process A from reading process B's memory. Implements syscall filtering (seccomp) for containers.</p>
    </div>
    <div class="mini-card">
        <h5>🔀 6. I/O Management</h5>
        <p>Handles all input/output with <strong>buffering and caching</strong> so programs don't wait for slow hardware directly. Page cache means second reads are near-instant.</p>
    </div>
</div>
`
},

// ═══ SECTION 2 — OS Internals: Scheduling & Virtual Memory ═══
{
    id: "os_internals",
    content: `
<h3>⚙️ How the OS Really Works — Scheduling &amp; Virtual Memory</h3>

<div class="story-box">
    <h4>🎭 The Great Illusion</h4>
    <p>Right now your computer appears to run hundreds of programs at once. But if you have 4 cores, only 4 threads can <em>physically execute</em> at the same moment. How does the OS create the illusion of 400 simultaneous programs? The answer is the most brilliant engineering in modern computing.</p>
</div>

<h4>🔄 CPU Time-Slicing — The Scheduler</h4>
<div class="visual-container">
    <svg viewBox="0 0 740 290" xmlns="http://www.w3.org/2000/svg">
        <defs><style>
            @keyframes cpuGlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
            .cg1{animation:cpuGlow 1.5s ease-in-out infinite}
            .cg2{animation:cpuGlow 1.5s ease-in-out infinite 0.5s}
            .cg3{animation:cpuGlow 1.5s ease-in-out infinite 1.0s}
        </style></defs>

        <text x="370" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">CPU Time-Slicing: 1 Core, 3 Processes, 1ms slices each</text>

        <text x="30" y="55"  fill="#94a3b8" font-size="11" font-family="JetBrains Mono">Process A</text>
        <text x="30" y="95"  fill="#94a3b8" font-size="11" font-family="JetBrains Mono">Process B</text>
        <text x="30" y="135" fill="#94a3b8" font-size="11" font-family="JetBrains Mono">Process C</text>
        <text x="30" y="175" fill="#f87171" font-size="11" font-family="JetBrains Mono">OS Kernel</text>

        <!-- Time axis -->
        <line x1="100" y1="192" x2="720" y2="192" stroke="#334155" stroke-width="1.5"/>
        <text x="100" y="208" fill="#64748b" font-size="9" font-family="JetBrains Mono">0ms</text>
        <text x="214" y="208" fill="#64748b" font-size="9" font-family="JetBrains Mono">3ms</text>
        <text x="328" y="208" fill="#64748b" font-size="9" font-family="JetBrains Mono">6ms</text>
        <text x="442" y="208" fill="#64748b" font-size="9" font-family="JetBrains Mono">9ms</text>
        <text x="556" y="208" fill="#64748b" font-size="9" font-family="JetBrains Mono">12ms</text>
        <text x="670" y="208" fill="#64748b" font-size="9" font-family="JetBrains Mono">15ms</text>

        <!-- Process A (every 3rd slot, starting 0) -->
        <rect x="100" y="38" width="34" height="22" rx="4" fill="#22d3ee" class="cg1"/>
        <rect x="214" y="38" width="34" height="22" rx="4" fill="#22d3ee"/>
        <rect x="328" y="38" width="34" height="22" rx="4" fill="#22d3ee"/>
        <rect x="442" y="38" width="34" height="22" rx="4" fill="#22d3ee"/>
        <rect x="556" y="38" width="34" height="22" rx="4" fill="#22d3ee"/>
        <rect x="670" y="38" width="34" height="22" rx="4" fill="#22d3ee"/>

        <!-- Process B (offset 1) -->
        <rect x="138" y="78" width="34" height="22" rx="4" fill="#a78bfa" class="cg2"/>
        <rect x="252" y="78" width="34" height="22" rx="4" fill="#a78bfa"/>
        <rect x="366" y="78" width="34" height="22" rx="4" fill="#a78bfa"/>
        <rect x="480" y="78" width="34" height="22" rx="4" fill="#a78bfa"/>
        <rect x="594" y="78" width="34" height="22" rx="4" fill="#a78bfa"/>

        <!-- Process C (offset 2) -->
        <rect x="176" y="118" width="34" height="22" rx="4" fill="#34d399" class="cg3"/>
        <rect x="290" y="118" width="34" height="22" rx="4" fill="#34d399"/>
        <rect x="404" y="118" width="34" height="22" rx="4" fill="#34d399"/>
        <rect x="518" y="118" width="34" height="22" rx="4" fill="#34d399"/>
        <rect x="632" y="118" width="34" height="22" rx="4" fill="#34d399"/>

        <!-- Kernel context-switch blips -->
        <rect x="134" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="172" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="210" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="248" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="286" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="324" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="362" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="400" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="438" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="476" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="514" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>
        <rect x="552" y="158" width="8" height="22" rx="2" fill="#f87171" opacity="0.9"/>

        <!-- Legend -->
        <rect x="100" y="228" width="12" height="10" rx="2" fill="#22d3ee"/>
        <text x="116" y="238" fill="#94a3b8" font-size="10">Process slice (1ms)</text>
        <rect x="290" y="228" width="12" height="10" rx="2" fill="#f87171"/>
        <text x="306" y="238" fill="#94a3b8" font-size="10">Context switch (~0.05ms)</text>
        <text x="370" y="260" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">Each process believes it runs alone — context switches are invisible to them</text>
        <text x="370" y="278" text-anchor="middle" fill="#64748b" font-size="9">Scheduler runs 1000x/second — saving &amp; restoring CPU registers for each switch</text>
    </svg>
    <div class="caption">The CFS (Completely Fair Scheduler) gives every process fair CPU time using a red-black tree sorted by virtual runtime</div>
</div>

<h4>🧠 Virtual Memory — Each Process Gets Its Own Universe</h4>
<div class="visual-container">
    <svg viewBox="0 0 720 310" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Virtual Memory: Two Processes, Both Start at Address 0 — No Conflict</text>

        <!-- Python virtual space -->
        <rect x="25" y="38" width="148" height="240" rx="10" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="99" y="58" text-anchor="middle" fill="#22d3ee" font-size="12" font-weight="bold" font-family="JetBrains Mono">Python (PID 1234)</text>
        <text x="99" y="74" text-anchor="middle" fill="#64748b" font-size="9">Virtual: 0x0000 → 0xFFFF...</text>
        <rect x="35" y="84"  width="128" height="26" rx="4" fill="#22d3ee" opacity="0.25"/>
        <text x="99" y="101" text-anchor="middle" fill="#22d3ee" font-size="10">Stack (local vars)</text>
        <rect x="35" y="114" width="128" height="26" rx="4" fill="#a78bfa" opacity="0.25"/>
        <text x="99" y="131" text-anchor="middle" fill="#a78bfa" font-size="10">Heap (numpy arrays)</text>
        <rect x="35" y="144" width="128" height="26" rx="4" fill="#34d399" opacity="0.25"/>
        <text x="99" y="161" text-anchor="middle" fill="#34d399" font-size="10">Data (global vars)</text>
        <rect x="35" y="174" width="128" height="26" rx="4" fill="#fbbf24" opacity="0.25"/>
        <text x="99" y="191" text-anchor="middle" fill="#fbbf24" font-size="10">Code (.py bytecode)</text>
        <rect x="35" y="204" width="128" height="26" rx="4" fill="#64748b" opacity="0.2"/>
        <text x="99" y="221" text-anchor="middle" fill="#64748b" font-size="10">Shared Libs (numpy.so)</text>
        <rect x="35" y="234" width="128" height="26" rx="4" fill="#f87171" opacity="0.15"/>
        <text x="99" y="251" text-anchor="middle" fill="#64748b" font-size="9">[unmapped — SIGSEGV]</text>

        <!-- Spark virtual space -->
        <rect x="286" y="38" width="148" height="240" rx="10" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="360" y="58" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold" font-family="JetBrains Mono">Spark (PID 5678)</text>
        <text x="360" y="74" text-anchor="middle" fill="#64748b" font-size="9">Virtual: 0x0000 → 0xFFFF...</text>
        <rect x="296" y="84"  width="128" height="26" rx="4" fill="#22d3ee" opacity="0.25"/>
        <text x="360" y="101" text-anchor="middle" fill="#22d3ee" font-size="10">Stack</text>
        <rect x="296" y="114" width="128" height="60" rx="4" fill="#a78bfa" opacity="0.25"/>
        <text x="360" y="148" text-anchor="middle" fill="#a78bfa" font-size="10">Heap (HUGE — JVM 8GB)</text>
        <rect x="296" y="178" width="128" height="26" rx="4" fill="#fbbf24" opacity="0.25"/>
        <text x="360" y="195" text-anchor="middle" fill="#fbbf24" font-size="10">Code (JVM bytecode)</text>
        <rect x="296" y="208" width="128" height="26" rx="4" fill="#64748b" opacity="0.2"/>
        <text x="360" y="225" text-anchor="middle" fill="#64748b" font-size="10">Shared Libs</text>
        <rect x="296" y="238" width="128" height="26" rx="4" fill="#f87171" opacity="0.15"/>
        <text x="360" y="255" text-anchor="middle" fill="#64748b" font-size="9">[unmapped — SIGSEGV]</text>

        <!-- Physical RAM -->
        <rect x="545" y="38" width="155" height="240" rx="10" fill="#182035" stroke="#34d399" stroke-width="1.5"/>
        <text x="622" y="58" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="JetBrains Mono">Physical RAM</text>
        <text x="622" y="74" text-anchor="middle" fill="#64748b" font-size="9">16 GB actual pages (4KB each)</text>
        <rect x="555" y="84"  width="135" height="20" rx="3" fill="#22d3ee" opacity="0.35"/>
        <text x="622" y="99"  text-anchor="middle" fill="#22d3ee" font-size="9">Python stack page</text>
        <rect x="555" y="108" width="135" height="20" rx="3" fill="#a78bfa" opacity="0.35"/>
        <text x="622" y="123" text-anchor="middle" fill="#a78bfa" font-size="9">Python heap page</text>
        <rect x="555" y="132" width="135" height="20" rx="3" fill="#a78bfa" opacity="0.35"/>
        <text x="622" y="147" text-anchor="middle" fill="#a78bfa" font-size="9">Spark heap page</text>
        <rect x="555" y="156" width="135" height="20" rx="3" fill="#fbbf24" opacity="0.35"/>
        <text x="622" y="171" text-anchor="middle" fill="#fbbf24" font-size="9">Shared lib (numpy.so)</text>
        <rect x="555" y="180" width="135" height="20" rx="3" fill="#34d399" opacity="0.35"/>
        <text x="622" y="195" text-anchor="middle" fill="#34d399" font-size="9">OS kernel pages</text>
        <rect x="555" y="204" width="135" height="40" rx="3" fill="#64748b" opacity="0.18"/>
        <text x="622" y="228" text-anchor="middle" fill="#64748b" font-size="9">Free pages</text>
        <rect x="555" y="248" width="135" height="22" rx="3" fill="#f87171" opacity="0.25"/>
        <text x="622" y="263" text-anchor="middle" fill="#64748b" font-size="9">Swap on disk (overflow)</text>

        <!-- MMU arrows -->
        <defs><marker id="mmArrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#334155"/></marker></defs>
        <line x1="173" y1="101" x2="545" y2="97"  stroke="#22d3ee" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#mmArrow)"/>
        <line x1="173" y1="127" x2="545" y2="120" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#mmArrow)"/>
        <line x1="434" y1="148" x2="545" y2="140" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#mmArrow)"/>

        <text x="360" y="300" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">MMU (Memory Management Unit) translates virtual → physical at hardware speed</text>
    </svg>
    <div class="caption">Both processes start at virtual address 0 — they can NEVER access each other's memory. A crash in Python cannot corrupt Spark.</div>
</div>

<div class="deep-dive-box">
    <h4>🔬 Why Does a Crashed Python Script NOT Crash Your Server?</h4>
    <p>Virtual memory isolation. When your script segfaults, the kernel kills only <em>that process</em>. Its virtual address space is destroyed, physical pages are reclaimed, but all other processes continue untouched. This is also the foundation of Docker containers — namespaces add another isolation layer on top of virtual memory.</p>
</div>
`
},

// ═══ SECTION 3 — What Is a Terminal ═══
{
    id: "what_is_terminal",
    content: `
<h3>🖥️ What Is a Terminal? The Full Story</h3>

<div class="story-box">
    <h4>📺 1960s: The Physical Terminal</h4>
    <p>Before personal computers, computing happened on massive mainframes. A "terminal" was a physical machine — keyboard + display — connected by a serial cable to a remote mainframe. The terminal had <strong>zero computing power</strong>. You typed, bytes traveled over the wire, the mainframe processed them, results came back. The terminal was purely an input/output device. The word "terminal" literally means "terminal point of a communication line."</p>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">
        <defs><style>
            @keyframes serialFlow { 0%{stroke-dashoffset:20;opacity:0.3} 50%{opacity:1} 100%{stroke-dashoffset:0;opacity:0.3} }
            @keyframes cursorBlink { 0%,89%,100%{opacity:1} 90%,99%{opacity:0} }
            .sf{stroke-dasharray:6,4;animation:serialFlow 1.4s linear infinite}
            .sf2{stroke-dasharray:6,4;animation:serialFlow 1.4s linear infinite 0.7s}
            .cb{animation:cursorBlink 1.1s step-end infinite}
        </style></defs>

        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Evolution of the Terminal — 1960s to Today</text>

        <!-- ─── Era 1: Physical Terminal ─── -->
        <text x="110" y="46" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">1960s–70s: Physical</text>

        <!-- DEC VT100 drawing -->
        <rect x="20" y="56" width="94" height="72" rx="6" fill="#0d1321" stroke="#64748b" stroke-width="2"/>
        <rect x="26" y="62" width="82" height="48" rx="3" fill="#001a00" stroke="#334155" stroke-width="1"/>
        <text x="67" y="81"  text-anchor="middle" fill="#4ade80" font-size="8" font-family="JetBrains Mono">DEC VT100</text>
        <text x="67" y="95"  text-anchor="middle" fill="#4ade80" font-size="8" font-family="JetBrains Mono">login: anuj_</text>
        <text x="38" y="106" fill="#4ade80" font-size="9" font-family="JetBrains Mono" class="cb">█</text>
        <rect x="26" y="114" width="82" height="14" rx="3" fill="#1e293b"/>
        <text x="67" y="125" text-anchor="middle" fill="#64748b" font-size="7">⌨ keyboard</text>

        <!-- Serial cable -->
        <line x1="114" y1="92" x2="178" y2="92" stroke="#fbbf24" stroke-width="2.5" class="sf"/>
        <text x="146" y="82" text-anchor="middle" fill="#64748b" font-size="8">serial</text>
        <text x="146" y="105" text-anchor="middle" fill="#64748b" font-size="8">cable</text>

        <!-- Mainframe box -->
        <rect x="178" y="56" width="62" height="88" rx="6" fill="#1a1a2e" stroke="#f87171" stroke-width="2"/>
        <text x="209" y="80"  text-anchor="middle" fill="#f87171" font-size="9" font-family="JetBrains Mono">IBM</text>
        <text x="209" y="94"  text-anchor="middle" fill="#f87171" font-size="9" font-family="JetBrains Mono">Main</text>
        <text x="209" y="108" text-anchor="middle" fill="#f87171" font-size="9" font-family="JetBrains Mono">frame</text>
        <rect x="186" y="118" width="10" height="7" rx="1" fill="#22d3ee"/>
        <rect x="200" y="118" width="10" height="7" rx="1" fill="#34d399"/>
        <rect x="214" y="118" width="10" height="7" rx="1" fill="#fbbf24"/>
        <text x="209" y="143" text-anchor="middle" fill="#64748b" font-size="7">CPU + RAM</text>

        <!-- ─── Era 2: Terminal Emulator (80s–90s) ─── -->
        <text x="400" y="46" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">1980s–90s: Software Emulator</text>

        <rect x="290" y="56" width="110" height="80" rx="6" fill="#0d1321" stroke="#22d3ee" stroke-width="2"/>
        <rect x="297" y="63" width="96" height="54" rx="3" fill="#001a00" stroke="#1a3a1a" stroke-width="1"/>
        <text x="345" y="81" text-anchor="middle" fill="#4ade80" font-size="8" font-family="JetBrains Mono">HyperTerminal</text>
        <text x="345" y="95" text-anchor="middle" fill="#4ade80" font-size="8" font-family="JetBrains Mono">$ ls -la</text>
        <text x="345" y="109" text-anchor="middle" fill="#4ade80" font-size="8" font-family="JetBrains Mono">total 48</text>
        <rect x="297" y="121" width="96" height="14" rx="3" fill="#1e293b"/>
        <text x="345" y="132" text-anchor="middle" fill="#64748b" font-size="7">IBM PC / Macintosh</text>

        <!-- SSH arrow -->
        <line x1="400" y1="96" x2="458" y2="96" stroke="#22d3ee" stroke-width="2" class="sf2"/>
        <text x="429" y="85" text-anchor="middle" fill="#64748b" font-size="8">SSH</text>
        <text x="429" y="109" text-anchor="middle" fill="#64748b" font-size="8">TCP/IP</text>

        <!-- Remote server -->
        <rect x="458" y="58" width="66" height="72" rx="6" fill="#1a0e1a" stroke="#a78bfa" stroke-width="2"/>
        <text x="491" y="82"  text-anchor="middle" fill="#a78bfa" font-size="9" font-family="JetBrains Mono">Unix</text>
        <text x="491" y="96"  text-anchor="middle" fill="#a78bfa" font-size="9" font-family="JetBrains Mono">Server</text>
        <rect x="466" y="106" width="50" height="16" rx="2" fill="#1e293b"/>
        <text x="491" y="118" text-anchor="middle" fill="#64748b" font-size="7">runs bash</text>

        <!-- ─── Era 3: Modern ─── -->
        <text x="640" y="46" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">Today: Modern Apps</text>

        <rect x="560" y="53" width="150" height="112" rx="8" fill="#0d1321" stroke="#34d399" stroke-width="2"/>
        <rect x="560" y="53" width="150" height="18" rx="8" fill="#182035"/>
        <circle cx="572" cy="62" r="4" fill="#f87171"/>
        <circle cx="584" cy="62" r="4" fill="#fbbf24"/>
        <circle cx="596" cy="62" r="4" fill="#34d399"/>
        <text x="635" y="66" text-anchor="middle" fill="#64748b" font-size="8">Alacritty / iTerm2</text>
        <text x="568" y="86"  fill="#94a3b8" font-size="8" font-family="JetBrains Mono">anuj@prod:~$</text>
        <text x="568" y="100" fill="#4ade80" font-size="8" font-family="JetBrains Mono">python3 train.py</text>
        <text x="568" y="114" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">Epoch 1: loss=0.42</text>
        <text x="568" y="128" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">Epoch 2: loss=0.38</text>
        <text x="568" y="141" fill="#4ade80" font-size="8" font-family="JetBrains Mono" class="cb">█</text>

        <!-- Bottom explanation -->
        <rect x="20" y="170" width="680" height="170" rx="12" fill="#131a2b" stroke="#334155" stroke-width="1"/>
        <text x="360" y="194" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">How a Modern Terminal Works Internally</text>

        <!-- Three boxes inside -->
        <rect x="40"  y="208" width="180" height="120" rx="8" fill="#182035" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="130" y="228" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">Terminal App</text>
        <text x="130" y="246" text-anchor="middle" fill="#64748b" font-size="9">gnome-terminal</text>
        <text x="130" y="262" text-anchor="middle" fill="#64748b" font-size="9">iTerm2, Alacritty</text>
        <text x="130" y="278" text-anchor="middle" fill="#64748b" font-size="9">• Renders glyphs + colors</text>
        <text x="130" y="294" text-anchor="middle" fill="#64748b" font-size="9">• Handles fonts, scrollback</text>
        <text x="130" y="308" text-anchor="middle" fill="#64748b" font-size="9">• Creates PTY pair</text>

        <line x1="220" y1="268" x2="256" y2="268" stroke="#22d3ee" stroke-width="2" class="sf"/>

        <rect x="256" y="208" width="180" height="120" rx="8" fill="#182035" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="346" y="228" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">PTY (kernel)</text>
        <text x="346" y="246" text-anchor="middle" fill="#64748b" font-size="9">/dev/pts/0</text>
        <text x="346" y="262" text-anchor="middle" fill="#64748b" font-size="9">master ↔ slave pair</text>
        <text x="346" y="278" text-anchor="middle" fill="#64748b" font-size="9">• Fake serial port in kernel</text>
        <text x="346" y="294" text-anchor="middle" fill="#64748b" font-size="9">• Ctrl+C → SIGINT signal</text>
        <text x="346" y="308" text-anchor="middle" fill="#64748b" font-size="9">• Handles terminal settings</text>

        <line x1="436" y1="268" x2="472" y2="268" stroke="#a78bfa" stroke-width="2" class="sf2"/>

        <rect x="472" y="208" width="208" height="120" rx="8" fill="#182035" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="576" y="228" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold" font-family="JetBrains Mono">Shell (bash/zsh)</text>
        <text x="576" y="246" text-anchor="middle" fill="#64748b" font-size="9">Reads PTY slave fd</text>
        <text x="576" y="262" text-anchor="middle" fill="#64748b" font-size="9">• Parses your commands</text>
        <text x="576" y="278" text-anchor="middle" fill="#64748b" font-size="9">• Manages environment</text>
        <text x="576" y="294" text-anchor="middle" fill="#64748b" font-size="9">• Spawns child processes</text>
        <text x="576" y="308" text-anchor="middle" fill="#64748b" font-size="9">• Shows the prompt (PS1)</text>
    </svg>
    <div class="caption">Today's "terminal" is a software emulator using the kernel's PTY subsystem to mimic 1960s hardware terminals</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">pty_exploration.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># See your pseudo-terminal device:</span>
<span class="prompt">$</span> tty
<span class="output">/dev/pts/0</span>
<span class="comment"># You are connected to pseudo-terminal slave #0</span>

<span class="comment"># List ALL active PTY sessions:</span>
<span class="prompt">$</span> ls /dev/pts/
<span class="output">0  1  2  ptmx</span>
<span class="comment"># 3 terminal sessions open; ptmx = PTY multiplexer (creates new pairs)</span>

<span class="comment"># Who is using each PTY?</span>
<span class="prompt">$</span> who
<span class="output">anuj    pts/0   2024-03-09 10:30 (192.168.1.5)  ← SSH from laptop</span>
<span class="output">anuj    pts/1   2024-03-09 11:00 (192.168.1.5)  ← another terminal tab</span>

<span class="comment"># Terminal settings (what each special key does):</span>
<span class="prompt">$</span> stty -a | head -4
<span class="output">speed 38400 baud; rows 40; columns 200;</span>
<span class="output">intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;</span>
<span class="comment"># "intr = ^C" means: Ctrl+C → kernel sends SIGINT to foreground process</span>
<span class="comment"># "eof  = ^D" means: Ctrl+D → EOF signal (exits shell, Python REPL etc)</span></div>
</div>

<div class="info-box">
    <h4>💡 Why Ctrl+C Kills Programs — The Real Reason</h4>
    <p>When you press Ctrl+C, the <strong>kernel's PTY driver</strong> (not bash!) intercepts the byte 0x03 and converts it into a <strong>SIGINT signal</strong>, sent to the entire foreground process group. The process terminates unless it catches the signal. This happens in kernel space — that's why Ctrl+C works even when bash itself appears frozen.</p>
</div>
`
},

// ═══ SECTION 4 — Terminal vs Shell vs Console vs CLI ═══
{
    id: "terminal_vs_shell",
    content: `
<h3>🔍 Terminal vs Shell vs Console vs CLI — Cleared Up Forever</h3>

<div class="warning-box">
    <h4>⚠️ The Most Confused Terminology in Tech</h4>
    <p>Senior developers mix these up constantly. After this section you'll never be confused again — and you'll be able to correct others confidently in interviews.</p>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 410" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Nesting: Console ⊃ Terminal ⊃ Shell ⊃ CLI</text>

        <!-- Console (outermost) -->
        <rect x="18" y="36" width="684" height="360" rx="14" fill="#0d1321" stroke="#64748b" stroke-width="2" stroke-dasharray="8,4"/>
        <text x="360" y="56" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold" font-family="JetBrains Mono">CONSOLE — physical keyboard + screen on the machine</text>
        <text x="360" y="72" text-anchor="middle" fill="#64748b" font-size="9">The actual hardware directly attached to the server (server room keyboard, laptop screen)</text>

        <!-- Terminal (nested 1) -->
        <rect x="38" y="84" width="644" height="300" rx="12" fill="#0a1628" stroke="#fbbf24" stroke-width="2"/>
        <text x="360" y="104" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold" font-family="JetBrains Mono">TERMINAL — software I/O window with PTY</text>
        <text x="360" y="120" text-anchor="middle" fill="#64748b" font-size="9">Renders text, handles colors, scrollback, font, window resize — creates a PTY pair and hands slave to shell</text>
        <text x="360" y="133" text-anchor="middle" fill="#64748b" font-size="9">Examples: gnome-terminal · iTerm2 · Alacritty · Windows Terminal · xterm · Kitty</text>

        <!-- Shell (nested 2) -->
        <rect x="58" y="145" width="604" height="224" rx="10" fill="#0d1321" stroke="#22d3ee" stroke-width="2"/>
        <text x="360" y="164" text-anchor="middle" fill="#22d3ee" font-size="12" font-weight="bold" font-family="JetBrains Mono">SHELL — the command interpreter process</text>
        <text x="360" y="180" text-anchor="middle" fill="#64748b" font-size="9">Reads stdin from PTY slave · parses &amp; executes commands · manages env variables · runs programs</text>
        <text x="360" y="194" text-anchor="middle" fill="#64748b" font-size="9">Examples: bash · zsh · sh · fish · dash · ksh — they are ALL shells</text>

        <!-- CLI (nested 3) -->
        <rect x="78" y="208" width="564" height="148" rx="8" fill="#131a2b" stroke="#a78bfa" stroke-width="2"/>
        <text x="360" y="228" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold" font-family="JetBrains Mono">CLI — Command Line Interface (concept)</text>
        <text x="360" y="244" text-anchor="middle" fill="#64748b" font-size="9">Any text-based interface where you type commands. The shell IS a CLI. So are many other tools.</text>

        <!-- CLI examples -->
        <rect x="96"  y="258" width="115" height="84" rx="6" fill="#182035" stroke="#a78bfa" stroke-width="1"/>
        <text x="153" y="276" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="bold">bash CLI</text>
        <text x="103" y="293" fill="#4ade80" font-size="8" font-family="JetBrains Mono">$ ls -la</text>
        <text x="103" y="307" fill="#4ade80" font-size="8" font-family="JetBrains Mono">$ git push</text>
        <text x="103" y="321" fill="#4ade80" font-size="8" font-family="JetBrains Mono">$ python3</text>

        <rect x="228" y="258" width="115" height="84" rx="6" fill="#182035" stroke="#34d399" stroke-width="1"/>
        <text x="285" y="276" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold">Python REPL</text>
        <text x="235" y="293" fill="#4ade80" font-size="8" font-family="JetBrains Mono">&gt;&gt;&gt; import os</text>
        <text x="235" y="307" fill="#4ade80" font-size="8" font-family="JetBrains Mono">&gt;&gt;&gt; os.getcwd()</text>
        <text x="235" y="321" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">'/home/anuj'</text>

        <rect x="360" y="258" width="115" height="84" rx="6" fill="#182035" stroke="#fbbf24" stroke-width="1"/>
        <text x="417" y="276" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="bold">MySQL CLI</text>
        <text x="367" y="293" fill="#4ade80" font-size="8" font-family="JetBrains Mono">mysql&gt; SELECT</text>
        <text x="367" y="307" fill="#4ade80" font-size="8" font-family="JetBrains Mono"> * FROM users</text>
        <text x="367" y="321" fill="#4ade80" font-size="8" font-family="JetBrains Mono"> LIMIT 10;</text>

        <rect x="492" y="258" width="115" height="84" rx="6" fill="#182035" stroke="#fb923c" stroke-width="1"/>
        <text x="549" y="276" text-anchor="middle" fill="#fb923c" font-size="10" font-weight="bold">kubectl CLI</text>
        <text x="499" y="293" fill="#4ade80" font-size="8" font-family="JetBrains Mono">$ kubectl get</text>
        <text x="499" y="307" fill="#4ade80" font-size="8" font-family="JetBrains Mono">   pods -n prod</text>
        <text x="499" y="321" fill="#94a3b8" font-size="8" font-family="JetBrains Mono">NAME  READY</text>
    </svg>
    <div class="caption">CLI is the concept. Shell is one implementation. Terminal is the window. Console is physical hardware.</div>
</div>

<h4>The Definitive Reference Table</h4>
<table class="comparison-table">
    <thead><tr><th>Term</th><th>One-Line Definition</th><th>Examples</th><th>Layer</th></tr></thead>
    <tbody>
        <tr><td><strong>Console</strong></td><td>Physical keyboard + display directly attached to a machine</td><td>Server room keyboard, laptop screen</td><td>Hardware</td></tr>
        <tr><td><strong>Terminal</strong></td><td>Software that renders text I/O, handles colors, creates PTY session</td><td>gnome-terminal, iTerm2, Alacritty, Windows Terminal</td><td>Application</td></tr>
        <tr><td><strong>Shell</strong></td><td>Program that reads your typed commands and executes them</td><td>bash, zsh, sh, fish, dash, PowerShell</td><td>Process</td></tr>
        <tr><td><strong>CLI</strong></td><td>Any text-based interface where you type commands (not just shell)</td><td>bash prompt, Python REPL, mysql, git, docker, kubectl</td><td>Interface concept</td></tr>
        <tr><td><strong>TTY</strong></td><td>TeleTYpewriter — original name, now means any terminal device</td><td>/dev/tty0 (console), /dev/pts/0 (SSH session)</td><td>Kernel device</td></tr>
        <tr><td><strong>PTY</strong></td><td>Pseudo-TTY — software-emulated terminal pair in the kernel</td><td>/dev/pts/0 master/slave pair</td><td>Kernel driver</td></tr>
    </tbody>
</table>

<div class="tip-box">
    <h4>🎯 The Quick Test</h4>
    <p>
        "Open a <strong>terminal</strong>" → open the terminal emulator app (gnome-terminal, iTerm2)<br>
        "Type in the <strong>shell</strong>" → type into bash/zsh (the command interpreter)<br>
        "Use the <strong>CLI</strong>" → text-based interface (could be bash, or Python REPL, etc.)<br>
        "Physical <strong>console</strong>" → the keyboard actually attached to the bare-metal server<br>
        In everyday speech, "terminal" is used loosely to mean all three combined.
    </p>
</div>
`
},

// ═══ SECTION 5 — Shell Deep Dive ═══
{
    id: "shell_deep_dive",
    content: `
<h3>🐚 The Shell — A Complete Deep Dive</h3>

<div class="story-box">
    <h4>🏗️ The Shell Is a Full Programming Language</h4>
    <p>People treat the shell as "just where you type commands." In reality, bash is a <strong>complete programming language interpreter</strong> with variables, functions, loops, conditionals, arrays, string manipulation, arithmetic, and more. It manages your entire working environment, maintains job queues, and orchestrates inter-process communication. Understanding it deeply makes you dramatically more effective.</p>
</div>

<h4>Shell Family Tree</h4>
<div class="visual-container">
    <svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Shell Family Tree — sh is the ancestor of all</text>

        <!-- sh root -->
        <rect x="305" y="32" width="110" height="48" rx="8" fill="#131a2b" stroke="#64748b" stroke-width="2"/>
        <text x="360" y="56" text-anchor="middle" fill="#64748b" font-size="13" font-weight="bold" font-family="JetBrains Mono">sh</text>
        <text x="360" y="72" text-anchor="middle" fill="#64748b" font-size="9">Bourne Shell (1979)</text>

        <!-- Branch lines -->
        <line x1="280" y1="80" x2="140" y2="120" stroke="#22d3ee" stroke-width="1.5"/>
        <line x1="360" y1="80" x2="360" y2="120" stroke="#a78bfa" stroke-width="1.5"/>
        <line x1="440" y1="80" x2="580" y2="120" stroke="#34d399" stroke-width="1.5"/>

        <!-- bash -->
        <rect x="60" y="120" width="160" height="82" rx="8" fill="#131a2b" stroke="#22d3ee" stroke-width="2"/>
        <text x="140" y="146" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold" font-family="JetBrains Mono">bash</text>
        <text x="140" y="163" text-anchor="middle" fill="#94a3b8" font-size="9">Bourne Again Shell</text>
        <text x="140" y="178" text-anchor="middle" fill="#64748b" font-size="8">Default: Ubuntu, most Linux</text>
        <text x="140" y="192" text-anchor="middle" fill="#64748b" font-size="8">POSIX + extensions + arrays</text>

        <!-- dash (child of bash lineage) -->
        <line x1="140" y1="202" x2="140" y2="232" stroke="#22d3ee" stroke-width="1"/>
        <rect x="60" y="232" width="160" height="38" rx="6" fill="#131a2b" stroke="#22d3ee" stroke-width="1" stroke-dasharray="4,2"/>
        <text x="140" y="254" text-anchor="middle" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">dash</text>
        <text x="140" y="266" text-anchor="middle" fill="#64748b" font-size="8">Ubuntu /bin/sh, fast scripts</text>

        <!-- zsh -->
        <rect x="280" y="120" width="160" height="82" rx="8" fill="#131a2b" stroke="#a78bfa" stroke-width="2"/>
        <text x="360" y="146" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="JetBrains Mono">zsh</text>
        <text x="360" y="163" text-anchor="middle" fill="#94a3b8" font-size="9">Z Shell (ksh + tcsh ideas)</text>
        <text x="360" y="178" text-anchor="middle" fill="#64748b" font-size="8">Default: macOS 10.15+</text>
        <text x="360" y="192" text-anchor="middle" fill="#64748b" font-size="8">Better autocomplete + Oh My Zsh</text>

        <!-- fish -->
        <rect x="500" y="120" width="160" height="82" rx="8" fill="#131a2b" stroke="#34d399" stroke-width="2"/>
        <text x="580" y="146" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="JetBrains Mono">fish</text>
        <text x="580" y="163" text-anchor="middle" fill="#94a3b8" font-size="9">Friendly Interactive Shell</text>
        <text x="580" y="178" text-anchor="middle" fill="#64748b" font-size="8">Autosuggestions built-in</text>
        <text x="580" y="192" text-anchor="middle" fill="#64748b" font-size="8">NOT POSIX compatible!</text>
    </svg>
</div>

<h4>Shell Command Processing — 9 Stages</h4>
<div class="visual-container">
    <svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">What Bash Does With Your Command — Every Stage</text>

        <!-- Input command -->
        <rect x="28" y="30" width="664" height="30" rx="6" fill="#001a00" stroke="#4ade80" stroke-width="1.5"/>
        <text x="360" y="50" text-anchor="middle" fill="#4ade80" font-size="12" font-family="JetBrains Mono">$ cat data.csv | grep Mumbai | awk -F',' '{sum+=$3} END{print sum}' &gt; total.txt</text>

        <!-- Row 1 stages -->
        <rect x="28"  y="72" width="148" height="62" rx="8" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="102" y="94"  text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">① Tokenize</text>
        <text x="102" y="110" text-anchor="middle" fill="#94a3b8" font-size="9">Split into tokens</text>
        <text x="102" y="126" text-anchor="middle" fill="#64748b" font-size="8">"cat" "|" "grep" "'Mumbai'"</text>
        <text x="181" y="107" fill="#fbbf24" font-size="14">→</text>

        <rect x="190" y="72" width="148" height="62" rx="8" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="264" y="94"  text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">② Parse</text>
        <text x="264" y="110" text-anchor="middle" fill="#94a3b8" font-size="9">Build AST (syntax tree)</text>
        <text x="264" y="126" text-anchor="middle" fill="#64748b" font-size="8">pipeline: [cat→grep→awk]</text>
        <text x="343" y="107" fill="#fbbf24" font-size="14">→</text>

        <rect x="352" y="72" width="148" height="62" rx="8" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="426" y="94"  text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold" font-family="JetBrains Mono">③ Expand</text>
        <text x="426" y="110" text-anchor="middle" fill="#94a3b8" font-size="9">Brace/tilde/var/$( )</text>
        <text x="426" y="126" text-anchor="middle" fill="#64748b" font-size="8">$HOME→/home/anuj *.csv→files</text>
        <text x="505" y="107" fill="#fbbf24" font-size="14">→</text>

        <rect x="514" y="72" width="178" height="62" rx="8" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="603" y="94"  text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold" font-family="JetBrains Mono">④ Quote Remove</text>
        <text x="603" y="110" text-anchor="middle" fill="#94a3b8" font-size="9">Strip quoting chars</text>
        <text x="603" y="126" text-anchor="middle" fill="#64748b" font-size="8">'Mumbai' → Mumbai</text>

        <!-- Down arrows -->
        <text x="102"  y="150" text-anchor="middle" fill="#fbbf24" font-size="14">↓</text>
        <text x="264"  y="150" text-anchor="middle" fill="#fbbf24" font-size="14">↓</text>
        <text x="426"  y="150" text-anchor="middle" fill="#fbbf24" font-size="14">↓</text>
        <text x="603"  y="150" text-anchor="middle" fill="#fbbf24" font-size="14">↓</text>

        <!-- Row 2 stages -->
        <rect x="28"  y="162" width="148" height="62" rx="8" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
        <text x="102" y="184" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">⑤ Redirect</text>
        <text x="102" y="200" text-anchor="middle" fill="#94a3b8" font-size="9">Setup I/O redirects</text>
        <text x="102" y="216" text-anchor="middle" fill="#64748b" font-size="8">&gt; total.txt → fd 1 to file</text>
        <text x="181" y="197" fill="#fbbf24" font-size="14">→</text>

        <rect x="190" y="162" width="148" height="62" rx="8" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
        <text x="264" y="184" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">⑥ Locate</text>
        <text x="264" y="200" text-anchor="middle" fill="#94a3b8" font-size="9">Find binaries in PATH</text>
        <text x="264" y="216" text-anchor="middle" fill="#64748b" font-size="8">/usr/bin/cat, /usr/bin/grep</text>
        <text x="343" y="197" fill="#fbbf24" font-size="14">→</text>

        <rect x="352" y="162" width="148" height="62" rx="8" fill="#131a2b" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="426" y="184" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">⑦ Fork+Exec</text>
        <text x="426" y="200" text-anchor="middle" fill="#94a3b8" font-size="9">Spawn child processes</text>
        <text x="426" y="216" text-anchor="middle" fill="#64748b" font-size="8">fork()×3, pipe(), exec()</text>
        <text x="505" y="197" fill="#fbbf24" font-size="14">→</text>

        <rect x="514" y="162" width="178" height="62" rx="8" fill="#131a2b" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="603" y="184" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">⑧ Wait+Collect</text>
        <text x="603" y="200" text-anchor="middle" fill="#94a3b8" font-size="9">Shell waits (or & bg)</text>
        <text x="603" y="216" text-anchor="middle" fill="#64748b" font-size="8">wait() → $? = exit code</text>

        <!-- Down arrow to stage 9 -->
        <line x1="360" y1="224" x2="360" y2="250" stroke="#fbbf24" stroke-width="1.5"/>

        <rect x="245" y="250" width="230" height="60" rx="8" fill="#131a2b" stroke="#fb923c" stroke-width="2"/>
        <text x="360" y="272" text-anchor="middle" fill="#fb923c" font-size="11" font-weight="bold" font-family="JetBrains Mono">⑨ Display Prompt Again</text>
        <text x="360" y="288" text-anchor="middle" fill="#94a3b8" font-size="9">$? stored · history updated</text>
        <text x="360" y="302" text-anchor="middle" fill="#64748b" font-size="8">Show PS1 → ready for next command</text>

        <!-- Expansion example at bottom -->
        <rect x="28" y="330" width="664" height="56" rx="8" fill="#001a00" stroke="#4ade80" stroke-width="1"/>
        <text x="48" y="350" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">Stage ③ Expansion example:</text>
        <text x="48" y="368" fill="#4ade80" font-size="10" font-family="JetBrains Mono">$ echo "User: $USER, Date: \$(date +%Y-%m-%d), Count: \$(ls *.csv | wc -l)"</text>
        <text x="48" y="382" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">  User: anuj, Date: 2024-03-09, Count: 47</text>
    </svg>
    <div class="caption">All 9 stages happen in microseconds — understanding them explains 90% of shell "mysteries"</div>
</div>

<h4>Shell Expansion Types (Stage ③)</h4>
<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">expansions.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># 1. Brace Expansion (happens FIRST, before filesystem)</span>
<span class="prompt">$</span> echo file{1..5}.csv
<span class="output">file1.csv file2.csv file3.csv file4.csv file5.csv</span>
<span class="prompt">$</span> mkdir -p project/{src,tests,docs,data/{raw,processed}}

<span class="comment"># 2. Tilde Expansion</span>
<span class="prompt">$</span> echo ~
<span class="output">/home/anuj</span>
<span class="prompt">$</span> echo ~root
<span class="output">/root</span>

<span class="comment"># 3. Variable Expansion with modifiers</span>
<span class="prompt">$</span> name="DataPipeline"
<span class="prompt">$</span> echo "\${name}"
<span class="output">DataPipeline</span>
<span class="prompt">$</span> echo "\${name,,}"          <span class="comment"># lowercase</span>
<span class="output">datapipeline</span>
<span class="prompt">$</span> echo "\${name:0:4}"        <span class="comment"># substring: first 4 chars</span>
<span class="output">Data</span>
<span class="prompt">$</span> echo "\${#name}"           <span class="comment"># string length</span>
<span class="output">12</span>
<span class="prompt">$</span> echo "\${name/Data/ETL}"   <span class="comment"># substitution</span>
<span class="output">ETLPipeline</span>

<span class="comment"># 4. Command Substitution</span>
<span class="prompt">$</span> today=\\$(date +%Y-%m-%d)
<span class="prompt">$</span> files=\\$(ls *.csv | wc -l)
<span class="prompt">$</span> echo "Found \$files CSV files on \$today"
<span class="output">Found 47 CSV files on 2024-03-09</span>

<span class="comment"># 5. Arithmetic Expansion</span>
<span class="prompt">$</span> echo \\$((10 * 1024 * 1024))     <span class="comment"># 10MB in bytes</span>
<span class="output">10485760</span>
<span class="prompt">$</span> echo \\$((2**10))                <span class="comment"># Powers!</span>
<span class="output">1024</span>

<span class="comment"># 6. Glob / Pathname Expansion</span>
<span class="prompt">$</span> ls data_202[34]_*.parquet       <span class="comment"># match 2023 or 2024</span>
<span class="prompt">$</span> ls **/*.py                      <span class="comment"># recursive (shopt -s globstar)</span></div>
</div>
`
},

// ═══ SECTION 6 — Behind the Scenes: Full Command Journey ═══
{
    id: "behind_the_scenes",
    content: `
<h3>🔍 Behind the Scenes — 9 Steps When You Press Enter</h3>

<div class="story-box">
    <h4>🚀 The Full Journey of: <code>ls -la /home</code></h4>
    <p>You press Enter. In the next <strong>0.001 seconds</strong>, an extraordinary sequence of events unfolds across hardware, kernel space, and user space. Let's trace every single step.</p>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 570" xmlns="http://www.w3.org/2000/svg">
        <defs><style>
            @keyframes stepPulse { 0%,100%{opacity:0.7} 50%{opacity:1} }
            @keyframes arrowFlow { 0%{stroke-dashoffset:16} 100%{stroke-dashoffset:0} }
            .step-arrow{stroke-dasharray:5,3;animation:arrowFlow 0.9s linear infinite}
        </style></defs>

        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Full Journey: $ ls -la /home [Enter]</text>

        <!-- Region labels on left -->
        <rect x="18" y="35" width="58" height="520" rx="4" fill="#1e293b" opacity="0.5"/>
        <text x="47" y="68"  text-anchor="middle" fill="#64748b" font-size="8" font-family="JetBrains Mono" transform="rotate(-90,47,68)">HARDWARE</text>
        <text x="47" y="122" text-anchor="middle" fill="#f87171" font-size="8" font-family="JetBrains Mono" transform="rotate(-90,47,122)">KERNEL</text>
        <text x="47" y="180" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono" transform="rotate(-90,47,180)">USER / SHELL</text>
        <text x="47" y="280" text-anchor="middle" fill="#f87171" font-size="8" font-family="JetBrains Mono" transform="rotate(-90,47,280)">KERNEL</text>
        <text x="47" y="420" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono" transform="rotate(-90,47,420)">ls PROCESS</text>
        <text x="47" y="500" text-anchor="middle" fill="#f87171" font-size="8" font-family="JetBrains Mono" transform="rotate(-90,47,500)">KERNEL</text>

        <!-- Timeline spine -->
        <line x1="358" y1="38" x2="358" y2="548" stroke="#334155" stroke-width="2"/>

        <!-- Step 1 -->
        <circle cx="358" cy="52" r="11" fill="#22d3ee"/>
        <text x="358" cy="56" y="56" text-anchor="middle" fill="#0d1321" font-size="9" font-weight="bold">1</text>
        <rect x="378" y="38" width="318" height="32" rx="6" fill="#131a2b" stroke="#22d3ee" stroke-width="1"/>
        <text x="388" y="52" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">Keyboard Interrupt</text>
        <text x="388" y="65" fill="#64748b" font-size="9">CPU hardware interrupt → kernel reads keycode from keyboard buffer → sends to PTY driver</text>

        <!-- Step 2 -->
        <circle cx="358" cy="106" r="11" fill="#a78bfa"/>
        <text x="358" y="110" text-anchor="middle" fill="#0d1321" font-size="9" font-weight="bold">2</text>
        <rect x="378" y="92" width="318" height="32" rx="6" fill="#131a2b" stroke="#a78bfa" stroke-width="1"/>
        <text x="388" y="106" fill="#a78bfa" font-size="11" font-weight="bold" font-family="JetBrains Mono">PTY Driver Echoes</text>
        <text x="388" y="119" fill="#64748b" font-size="9">Terminal driver echoes char to screen AND writes to PTY slave buffer for bash to read</text>

        <!-- Step 3 -->
        <circle cx="358" cy="160" r="11" fill="#34d399"/>
        <text x="358" y="164" text-anchor="middle" fill="#0d1321" font-size="9" font-weight="bold">3</text>
        <rect x="378" y="146" width="318" height="32" rx="6" fill="#131a2b" stroke="#34d399" stroke-width="1"/>
        <text x="388" y="160" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">bash readline() Reads</text>
        <text x="388" y="173" fill="#64748b" font-size="9">readline library detects Enter key, returns complete line "ls -la /home\n" to bash</text>

        <!-- Step 4 -->
        <circle cx="358" cy="214" r="11" fill="#fbbf24"/>
        <text x="358" y="218" text-anchor="middle" fill="#0d1321" font-size="9" font-weight="bold">4</text>
        <rect x="378" y="200" width="318" height="32" rx="6" fill="#131a2b" stroke="#fbbf24" stroke-width="1"/>
        <text x="388" y="214" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">Shell Parses &amp; Expands</text>
        <text x="388" y="227" fill="#64748b" font-size="9">cmd="ls", args=["-la", "/home"] — no pipes, no redirects, no expansions needed</text>

        <!-- Step 5 -->
        <circle cx="358" cy="268" r="11" fill="#f87171"/>
        <text x="358" y="272" text-anchor="middle" fill="#0d1321" font-size="9" font-weight="bold">5</text>
        <rect x="378" y="254" width="318" height="32" rx="6" fill="#131a2b" stroke="#f87171" stroke-width="1"/>
        <text x="388" y="268" fill="#f87171" font-size="11" font-weight="bold" font-family="JetBrains Mono">PATH Lookup</text>
        <text x="388" y="281" fill="#64748b" font-size="9">Search /usr/local/bin, /usr/bin... → stat() each dir → found: /usr/bin/ls</text>

        <!-- Step 6 -->
        <circle cx="358" cy="322" r="11" fill="#fb923c"/>
        <text x="358" y="326" text-anchor="middle" fill="#0d1321" font-size="9" font-weight="bold">6</text>
        <rect x="378" y="308" width="318" height="40" rx="6" fill="#131a2b" stroke="#fb923c" stroke-width="1"/>
        <text x="388" y="322" fill="#fb923c" font-size="11" font-weight="bold" font-family="JetBrains Mono">fork() System Call</text>
        <text x="388" y="336" fill="#64748b" font-size="9">Kernel creates child (PID copy of bash). Inherits: env, open fds, signal masks.</text>
        <text x="388" y="347" fill="#64748b" font-size="8">Parent bash: sleeps in wait(). Child process: proceeds to exec().</text>

        <!-- Step 7 -->
        <circle cx="358" cy="382" r="11" fill="#22d3ee"/>
        <text x="358" y="386" text-anchor="middle" fill="#0d1321" font-size="9" font-weight="bold">7</text>
        <rect x="378" y="368" width="318" height="32" rx="6" fill="#131a2b" stroke="#22d3ee" stroke-width="1"/>
        <text x="388" y="382" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">execve() System Call</text>
        <text x="388" y="395" fill="#64748b" font-size="9">Load ELF binary /usr/bin/ls into child address space. Load shared libs (libc.so).</text>

        <!-- Step 8 -->
        <circle cx="358" cy="436" r="11" fill="#a78bfa"/>
        <text x="358" y="440" text-anchor="middle" fill="#0d1321" font-size="9" font-weight="bold">8</text>
        <rect x="378" y="422" width="318" height="32" rx="6" fill="#131a2b" stroke="#a78bfa" stroke-width="1"/>
        <text x="388" y="436" fill="#a78bfa" font-size="11" font-weight="bold" font-family="JetBrains Mono">ls Runs — Kernel Syscalls</text>
        <text x="388" y="449" fill="#64748b" font-size="9">openat("/home"), getdents64() reads entries, stat() each file, write() to stdout</text>

        <!-- Step 9 -->
        <circle cx="358" cy="490" r="11" fill="#34d399"/>
        <text x="358" y="494" text-anchor="middle" fill="#0d1321" font-size="9" font-weight="bold">9</text>
        <rect x="378" y="476" width="318" height="32" rx="6" fill="#131a2b" stroke="#34d399" stroke-width="1"/>
        <text x="388" y="490" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">exit() + wait() → Prompt</text>
        <text x="388" y="503" fill="#64748b" font-size="9">ls exits (code 0=success). Kernel SIGCHLD → bash wait() returns. $?=0. Show PS1.</text>

        <text x="360" y="555" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">Total elapsed: 0.3ms–5ms depending on disk cache and filesystem load</text>
    </svg>
    <div class="caption">9 steps, 3 privilege-mode switches between user and kernel space — all to list a directory</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">observe_it_yourself.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># See fork+exec: watch PIDs</span>
<span class="prompt">$</span> echo "My shell PID: $$"
<span class="output">My shell PID: 12345</span>

<span class="prompt">$</span> bash -c 'echo "Child PID: $$; My parent: \$PPID"'
<span class="output">Child PID: 12346; My parent: 12345</span>
<span class="comment"># bash forked (PID 12346), parent was 12345</span>

<span class="comment"># Watch the actual syscalls ls makes:</span>
<span class="prompt">$</span> strace -e trace=openat,getdents64,write ls /tmp 2>&amp;1 | head -6
<span class="output">openat(AT_FDCWD, "/tmp", O_RDONLY|O_DIRECTORY) = 3</span>
<span class="output">getdents64(3, /* 12 entries */, 32768)         = 336</span>
<span class="output">write(1, "file1.txt  test.csv\n", 20)           = 20</span>

<span class="comment"># Measure time split: user space vs kernel space</span>
<span class="prompt">$</span> time ls /var/log > /dev/null
<span class="output">real    0m0.004s   ← wall clock</span>
<span class="output">user    0m0.001s   ← CPU time in user space (ls code)</span>
<span class="output">sys     0m0.003s   ← CPU time in kernel space (syscalls)</span>

<span class="comment"># Check exit status:</span>
<span class="prompt">$</span> ls /nonexistent 2>/dev/null; echo "Exit: $?"
<span class="output">Exit: 2</span>
<span class="comment"># 0=success, non-zero=error (2="No such file or directory" for ls)</span></div>
</div>
`
},

// ═══ SECTION 7 — Shell Environment ═══
{
    id: "shell_environment",
    content: `
<h3>🌍 The Shell Environment — Variables, PATH, Config Files</h3>

<p>Every shell session has an <strong>environment</strong> — named variables inherited by every child process you spawn. This is one of the most powerful and least understood aspects of the shell.</p>

<div class="visual-container">
    <svg viewBox="0 0 720 330" xmlns="http://www.w3.org/2000/svg">
        <defs><style>
            @keyframes pathHighlight { 0%,100%{opacity:0.4} 14%{opacity:1} }
            .ph1{animation:pathHighlight 3s ease-in-out infinite 0s}
            .ph2{animation:pathHighlight 3s ease-in-out infinite 0.43s}
            .ph3{animation:pathHighlight 3s ease-in-out infinite 0.86s}
            .ph4{animation:pathHighlight 3s ease-in-out infinite 1.29s}
            .ph5{animation:pathHighlight 3s ease-in-out infinite 1.72s}
            .phFound{animation:pathHighlight 0.8s ease-in-out infinite}
        </style></defs>

        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">PATH Lookup: bash searches left→right for "python3"</text>

        <text x="30" y="44" fill="#64748b" font-size="9" font-family="JetBrains Mono">$PATH =</text>
        <text x="90" y="44" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">/home/anuj/.local/bin : /usr/local/bin : /usr/bin : /bin : /usr/sbin</text>

        <!-- Directory search boxes -->
        <rect x="20"  y="56" width="108" height="54" rx="6" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5" class="ph1"/>
        <text x="74"  y="76"  text-anchor="middle" fill="#22d3ee" font-size="9" font-family="JetBrains Mono">~/.local/bin</text>
        <text x="74"  y="92"  text-anchor="middle" fill="#f87171" font-size="9">✗ not here</text>
        <text x="74"  y="104" text-anchor="middle" fill="#64748b" font-size="8">→ next</text>

        <rect x="138" y="56" width="108" height="54" rx="6" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5" class="ph2"/>
        <text x="192" y="76"  text-anchor="middle" fill="#a78bfa" font-size="9" font-family="JetBrains Mono">/usr/local/bin</text>
        <text x="192" y="92"  text-anchor="middle" fill="#f87171" font-size="9">✗ not here</text>
        <text x="192" y="104" text-anchor="middle" fill="#64748b" font-size="8">→ next</text>

        <rect x="256" y="56" width="108" height="54" rx="6" fill="#131a2b" stroke="#34d399" stroke-width="2.5" class="phFound"/>
        <text x="310" y="76"  text-anchor="middle" fill="#34d399" font-size="9" font-family="JetBrains Mono">/usr/bin</text>
        <text x="310" y="92"  text-anchor="middle" fill="#34d399" font-size="9">✅ FOUND!</text>
        <text x="310" y="104" text-anchor="middle" fill="#34d399" font-size="8">/usr/bin/python3</text>

        <rect x="374" y="56" width="80" height="54" rx="6" fill="#131a2b" stroke="#64748b" stroke-width="1" opacity="0.5" class="ph4"/>
        <text x="414" y="83"  text-anchor="middle" fill="#64748b" font-size="9">/bin</text>
        <text x="414" y="99"  text-anchor="middle" fill="#64748b" font-size="8">(skipped)</text>

        <rect x="464" y="56" width="90" height="54" rx="6" fill="#131a2b" stroke="#64748b" stroke-width="1" opacity="0.5" class="ph5"/>
        <text x="509" y="83"  text-anchor="middle" fill="#64748b" font-size="9">/usr/sbin</text>
        <text x="509" y="99"  text-anchor="middle" fill="#64748b" font-size="8">(skipped)</text>

        <rect x="564" y="56" width="128" height="54" rx="6" fill="#1a0808" stroke="#f87171" stroke-width="1.5"/>
        <text x="628" y="75"  text-anchor="middle" fill="#f87171" font-size="10" font-weight="bold">ALL searched,</text>
        <text x="628" y="91"  text-anchor="middle" fill="#f87171" font-size="10">nothing found:</text>
        <text x="628" y="105" text-anchor="middle" fill="#f87171" font-size="9">"command not found"</text>

        <text x="310" y="132" text-anchor="middle" fill="#4ade80" font-size="11" font-family="JetBrains Mono">$ which python3  →  /usr/bin/python3</text>
        <text x="360" y="150" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">Add to FRONT of PATH to override: export PATH="/opt/conda/bin:$PATH"</text>

        <!-- Env vars reference -->
        <rect x="20" y="168" width="320" height="148" rx="10" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="180" y="188" text-anchor="middle" fill="#22d3ee" font-size="12" font-weight="bold" font-family="JetBrains Mono">Key Environment Variables</text>

        <text x="35" y="208" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$PATH</text>
        <text x="125" y="208" fill="#94a3b8" font-size="10">Command search directories</text>
        <text x="35" y="224" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$HOME</text>
        <text x="125" y="224" fill="#94a3b8" font-size="10">/home/username</text>
        <text x="35" y="240" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$USER</text>
        <text x="125" y="240" fill="#94a3b8" font-size="10">Current username</text>
        <text x="35" y="256" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$SHELL</text>
        <text x="125" y="256" fill="#94a3b8" font-size="10">/bin/bash</text>
        <text x="35" y="272" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$PWD</text>
        <text x="125" y="272" fill="#94a3b8" font-size="10">Current working directory</text>
        <text x="35" y="288" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$PS1</text>
        <text x="125" y="288" fill="#94a3b8" font-size="10">Your prompt string</text>
        <text x="35" y="304" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$?</text>
        <text x="125" y="304" fill="#94a3b8" font-size="10">Last exit code (0=success)</text>
        <text x="35" y="310" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$$</text>
        <text x="125" y="310" fill="#94a3b8" font-size="10">Current shell PID</text>

        <!-- Data Eng vars -->
        <rect x="360" y="168" width="340" height="148" rx="10" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
        <text x="530" y="188" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="JetBrains Mono">Data Eng Env Vars (in .bashrc)</text>

        <text x="375" y="208" fill="#4ade80" font-size="10" font-family="JetBrains Mono">export SPARK_HOME=/opt/spark</text>
        <text x="375" y="224" fill="#4ade80" font-size="10" font-family="JetBrains Mono">export JAVA_HOME=/usr/lib/jvm/java-11</text>
        <text x="375" y="240" fill="#4ade80" font-size="10" font-family="JetBrains Mono">export AIRFLOW_HOME=~/airflow</text>
        <text x="375" y="256" fill="#4ade80" font-size="10" font-family="JetBrains Mono">export KAFKA_HOME=/opt/kafka</text>
        <text x="375" y="272" fill="#4ade80" font-size="10" font-family="JetBrains Mono">export AWS_DEFAULT_REGION=us-east-1</text>
        <text x="375" y="288" fill="#4ade80" font-size="10" font-family="JetBrains Mono">export HADOOP_CONF_DIR=/etc/hadoop</text>
        <text x="375" y="304" fill="#4ade80" font-size="10" font-family="JetBrains Mono">export PATH="$SPARK_HOME/bin:$PATH"</text>
    </svg>
    <div class="caption">Environment variables are inherited by ALL child processes — set SPARK_HOME once in .bashrc, use forever</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">bashrc_best_practices.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># Add to ~/.bashrc — applies to every new terminal</span>

<span class="comment"># Spark + Java</span>
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export SPARK_HOME=/opt/spark
export PATH="\$SPARK_HOME/bin:\$JAVA_HOME/bin:\$PATH"

<span class="comment"># Handy aliases</span>
alias ll='ls -lahF --color=auto'
alias ..='cd ..'
alias gs='git status'
alias py='python3'

<span class="comment"># Useful functions</span>
mkcd() { mkdir -p "\$1" &amp;&amp; cd "\$1"; }
datahead() { head -5 "\$1" | column -t -s','; }

<span class="comment"># Apply immediately without logging out:</span>
<span class="prompt">$</span> source ~/.bashrc     <span class="comment"># or:  . ~/.bashrc</span>

<span class="comment"># Why does conda activate work?  Because it does:</span>
<span class="prompt">$</span> source /opt/conda/bin/activate ml-env
<span class="comment"># source = run IN current shell, so PATH change stays!</span>
<span class="comment"># ./script.sh runs in a CHILD shell — changes don't propagate up</span></div>
</div>

<div class="deep-dive-box">
    <h4>🔬 Subshell Cannot Change Parent — Critical Rule</h4>
    <p>When you run a script (<code>./script.sh</code>), it runs in a child process. Variables set inside the script do NOT affect your terminal. That's why <code>cd</code> inside a script doesn't change your directory. <code>conda activate</code> uses <code>source</code> to run in your current shell — the only way to modify your shell's environment from a script.</p>
</div>
`
},

// ═══ SECTION 8 — First Commands ═══
{
    id: "first_commands",
    content: `
<h3>⌨️ Essential Terminal Commands — With Deep Understanding</h3>

<div class="info-box">
    <h4>💡 How to Read Command Syntax</h4>
    <p><code>command [OPTIONS] &lt;REQUIRED&gt; [OPTIONAL...]</code><br>
    <strong>[ ]</strong> = optional &nbsp;|&nbsp; <strong>&lt; &gt;</strong> = required &nbsp;|&nbsp; <strong>...</strong> = repeatable &nbsp;|&nbsp; <strong>|</strong> = choose one</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">essential_commands.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ═══ IDENTITY ═══</span>
<span class="prompt">$</span> whoami
<span class="output">anuj</span>
<span class="prompt">$</span> id
<span class="output">uid=1000(anuj) gid=1000(anuj) groups=1000(anuj),27(sudo),999(docker)</span>
<span class="comment"># "docker" group means run docker without sudo!</span>
<span class="prompt">$</span> hostname -I
<span class="output">192.168.1.45 10.0.0.2</span>

<span class="comment"># ═══ DATE &amp; TIME ═══</span>
<span class="prompt">$</span> date +"%Y-%m-%d %H:%M:%S"
<span class="output">2024-03-09 14:30:22</span>
<span class="prompt">$</span> date -d "yesterday" +"%Y-%m-%d"
<span class="output">2024-03-08</span>
<span class="comment"># Great for log file names: logfile_\\$(date +%Y%m%d).log</span>

<span class="comment"># ═══ OUTPUT ═══</span>
<span class="prompt">$</span> echo "Hello World"
<span class="prompt">$</span> echo -e "Tab:\there\nNewline above"
<span class="prompt">$</span> printf "%s processed %d rows\n" "pipeline" 1500000
<span class="output">pipeline processed 1500000 rows</span>

<span class="comment"># ═══ GETTING HELP ═══</span>
<span class="prompt">$</span> man ls               <span class="comment"># Full manual (q=quit, /=search)</span>
<span class="prompt">$</span> ls --help            <span class="comment"># Quick flag reference</span>
<span class="prompt">$</span> whatis ls
<span class="output">ls (1) - list directory contents</span>
<span class="prompt">$</span> apropos "compress"   <span class="comment"># Find commands by description</span>
<span class="prompt">$</span> type ls              <span class="comment"># Is it binary, alias, or builtin?</span>
<span class="output">ls is aliased to 'ls --color=auto'</span>
<span class="prompt">$</span> type cd
<span class="output">cd is a shell builtin</span>
<span class="comment"># cd is builtin because it must change THE current shell's dir,</span>
<span class="comment"># not a child process's dir!</span>

<span class="comment"># ═══ HISTORY ═══</span>
<span class="prompt">$</span> history | grep python
<span class="prompt">$</span> !42                  <span class="comment"># Re-run command #42</span>
<span class="prompt">$</span> !!                   <span class="comment"># Re-run LAST command</span>
<span class="prompt">$</span> sudo !!              <span class="comment"># Re-run last with sudo! Use constantly.</span>
<span class="comment"># Ctrl+R → interactive reverse history search</span></div>
</div>

<h4>⌨️ Keyboard Shortcuts — The Power User Set</h4>
<div class="visual-container">
    <svg viewBox="0 0 720 292" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Terminal Keyboard Shortcuts — Memorize These</text>

        <!-- Process Control -->
        <rect x="18" y="34" width="214" height="136" rx="10" fill="#131a2b" stroke="#f87171" stroke-width="1.5"/>
        <text x="125" y="54" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">⚡ Process Control</text>
        <text x="33" y="73"  fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+C</text>
        <text x="115" y="73" fill="#94a3b8" font-size="10">Kill foreground (SIGINT)</text>
        <text x="33" y="90"  fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+Z</text>
        <text x="115" y="90" fill="#94a3b8" font-size="10">Suspend to background</text>
        <text x="33" y="107" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+D</text>
        <text x="115" y="107" fill="#94a3b8" font-size="10">EOF — exit shell/REPL</text>
        <text x="33" y="124" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+L</text>
        <text x="115" y="124" fill="#94a3b8" font-size="10">Clear screen</text>
        <text x="33" y="141" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+S/Q</text>
        <text x="115" y="141" fill="#94a3b8" font-size="10">Pause/resume output</text>
        <text x="33" y="158" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+\</text>
        <text x="115" y="158" fill="#94a3b8" font-size="10">Kill + core dump</text>

        <!-- Line Editing -->
        <rect x="250" y="34" width="214" height="136" rx="10" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="357" y="54" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold">📝 Line Editing</text>
        <text x="265" y="73"  fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+A</text>
        <text x="347" y="73" fill="#94a3b8" font-size="10">Jump to line start</text>
        <text x="265" y="90"  fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+E</text>
        <text x="347" y="90" fill="#94a3b8" font-size="10">Jump to line end</text>
        <text x="265" y="107" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+W</text>
        <text x="347" y="107" fill="#94a3b8" font-size="10">Delete word before cursor</text>
        <text x="265" y="124" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+K</text>
        <text x="347" y="124" fill="#94a3b8" font-size="10">Delete cursor to end</text>
        <text x="265" y="141" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+U</text>
        <text x="347" y="141" fill="#94a3b8" font-size="10">Delete entire line</text>
        <text x="265" y="158" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Alt+F/B</text>
        <text x="347" y="158" fill="#94a3b8" font-size="10">Forward/back one word</text>

        <!-- History -->
        <rect x="482" y="34" width="220" height="136" rx="10" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
        <text x="592" y="54" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">🔍 History</text>
        <text x="497" y="73"  fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Up/Down</text>
        <text x="590" y="73" fill="#94a3b8" font-size="10">Previous/next command</text>
        <text x="497" y="90"  fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Ctrl+R</text>
        <text x="590" y="90" fill="#94a3b8" font-size="10">Reverse history search</text>
        <text x="497" y="107" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Tab</text>
        <text x="590" y="107" fill="#94a3b8" font-size="10">Autocomplete everything</text>
        <text x="497" y="124" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">Tab Tab</text>
        <text x="590" y="124" fill="#94a3b8" font-size="10">Show all completions</text>
        <text x="497" y="141" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">!!</text>
        <text x="590" y="141" fill="#94a3b8" font-size="10">Repeat last command</text>
        <text x="497" y="158" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">sudo !!</text>
        <text x="590" y="158" fill="#94a3b8" font-size="10">Last command as root</text>

        <!-- Bottom highlight row -->
        <rect x="18" y="186" width="684" height="90" rx="10" fill="#0d1321" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="360" y="206" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold">🏆 Three Shortcuts That Will Change Your Life</text>

        <text x="48" y="228" fill="#34d399" font-size="13" font-weight="bold" font-family="JetBrains Mono">Tab</text>
        <text x="100" y="228" fill="#94a3b8" font-size="11">Autocomplete filenames, commands, variables, hostnames. Press it constantly. Never type full names.</text>

        <text x="48" y="248" fill="#34d399" font-size="13" font-weight="bold" font-family="JetBrains Mono">Ctrl+R</text>
        <text x="120" y="248" fill="#94a3b8" font-size="11">Start typing any part of a past command → shell finds and repletes it. Fastest way to reuse commands.</text>

        <text x="48" y="268" fill="#34d399" font-size="13" font-weight="bold" font-family="JetBrains Mono">sudo !!</text>
        <text x="120" y="268" fill="#94a3b8" font-size="11">Re-run your last command as root. You WILL forget sudo. This fixes it instantly.</text>
    </svg>
</div>
`
},

// ═══ SECTION 9 — Prompt Anatomy & Special Variables ═══
{
    id: "prompt_anatomy",
    content: `
<h3>🎨 Anatomy of the Terminal Prompt</h3>

<div class="visual-container">
    <svg viewBox="0 0 720 270" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Dissecting Your Prompt — Every Character Has Meaning</text>

        <!-- Prompt line -->
        <rect x="28" y="34" width="664" height="48" rx="8" fill="#001a00" stroke="#4ade80" stroke-width="1.5"/>
        <text x="50"  y="64" fill="#22d3ee"  font-size="19" font-family="JetBrains Mono">anuj</text>
        <text x="113" y="64" fill="#94a3b8"  font-size="19" font-family="JetBrains Mono">@</text>
        <text x="129" y="64" fill="#a78bfa"  font-size="19" font-family="JetBrains Mono">ubuntu-prod</text>
        <text x="281" y="64" fill="#94a3b8"  font-size="19" font-family="JetBrains Mono">:</text>
        <text x="296" y="64" fill="#34d399"  font-size="19" font-family="JetBrains Mono">~/projects/pipeline</text>
        <text x="540" y="64" fill="#f87171"  font-size="19" font-family="JetBrains Mono">(git:main*)</text>
        <text x="658" y="64" fill="#fbbf24"  font-size="23" font-family="JetBrains Mono">$</text>
        <text x="672" y="64" fill="#4ade80"  font-size="19" font-family="JetBrains Mono">█</text>

        <!-- Annotation lines -->
        <line x1="72"  y1="82" x2="72"  y2="112" stroke="#22d3ee"  stroke-width="1.5"/>
        <line x1="197" y1="82" x2="197" y2="112" stroke="#a78bfa"  stroke-width="1.5"/>
        <line x1="418" y1="82" x2="418" y2="112" stroke="#34d399"  stroke-width="1.5"/>
        <line x1="588" y1="82" x2="588" y2="112" stroke="#f87171"  stroke-width="1.5"/>
        <line x1="661" y1="82" x2="661" y2="112" stroke="#fbbf24"  stroke-width="1.5"/>

        <!-- Labels -->
        <rect x="25"  y="112" width="88" height="38" rx="6" fill="#131a2b" stroke="#22d3ee"  stroke-width="1"/>
        <text x="69"  y="129" text-anchor="middle" fill="#22d3ee"  font-size="10" font-weight="bold">username</text>
        <text x="69"  y="144" text-anchor="middle" fill="#64748b"  font-size="9">who you are</text>

        <rect x="150" y="112" width="96" height="38" rx="6" fill="#131a2b" stroke="#a78bfa"  stroke-width="1"/>
        <text x="198" y="129" text-anchor="middle" fill="#a78bfa"  font-size="10" font-weight="bold">hostname</text>
        <text x="198" y="144" text-anchor="middle" fill="#64748b"  font-size="9">which machine</text>

        <rect x="368" y="112" width="100" height="38" rx="6" fill="#131a2b" stroke="#34d399"  stroke-width="1"/>
        <text x="418" y="129" text-anchor="middle" fill="#34d399"  font-size="10" font-weight="bold">current dir</text>
        <text x="418" y="144" text-anchor="middle" fill="#64748b"  font-size="9">~ = home</text>

        <rect x="536" y="112" width="106" height="38" rx="6" fill="#131a2b" stroke="#f87171"  stroke-width="1"/>
        <text x="589" y="129" text-anchor="middle" fill="#f87171"  font-size="10" font-weight="bold">git branch</text>
        <text x="589" y="144" text-anchor="middle" fill="#64748b"  font-size="9">* = uncommitted</text>

        <rect x="628" y="112" width="64" height="38" rx="6" fill="#131a2b" stroke="#fbbf24"  stroke-width="1"/>
        <text x="660" y="129" text-anchor="middle" fill="#fbbf24"  font-size="10" font-weight="bold">$ or #</text>
        <text x="660" y="144" text-anchor="middle" fill="#64748b"  font-size="9">$=user #=root</text>

        <!-- PS1 code -->
        <rect x="28" y="168" width="664" height="88" rx="10" fill="#131a2b" stroke="#334155" stroke-width="1"/>
        <text x="360" y="188" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">Customize Your PS1 (add to ~/.bashrc)</text>
        <text x="48" y="208" fill="#64748b" font-size="10" font-family="JetBrains Mono"># Escape codes: backslash-u=user  backslash-h=host  backslash-w=cwd  backslash-$=prompt</text>
        <text x="48" y="224" fill="#4ade80" font-size="10" font-family="JetBrains Mono">PS1='\[ESC[36m]USER\[ESC[0m]@\[ESC[35m]HOST\[ESC[0m]:\[ESC[32m]CWD\[ESC[0m]SIGN '</text>
        <text x="48" y="242" fill="#64748b" font-size="10" font-family="JetBrains Mono">#  \e[36m=cyan  \e[35m=magenta  \e[32m=green  \e[0m=reset  \[..\]=zero-width</text>
    </svg>
    <div class="caption">$PS1 is re-evaluated every time the prompt is shown — you can embed $(git branch), time, exit codes, anything</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">special_variables.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># Shell special variables</span>
<span class="prompt">$</span> echo "Shell PID: $$"          <span class="comment"># Current shell PID</span>
<span class="output">Shell PID: 12345</span>

<span class="prompt">$</span> echo "Last exit: $?"          <span class="comment"># Last command exit code</span>
<span class="output">0</span>

<span class="prompt">$</span> echo "Last bg PID: $!"        <span class="comment"># PID of last background job</span>

<span class="comment"># In scripts — argument variables:</span>
<span class="comment">#!/bin/bash</span>
<span class="comment"># $0 = script name    $1 = first arg   $2 = second arg</span>
<span class="comment"># $@ = all args (separate)   $* = all args (one string)</span>
<span class="comment"># $# = number of args</span>

if [ "\$#" -ne 2 ]; then
    echo "Usage: \$0 &lt;input.csv&gt; &lt;output_dir&gt;"
    exit 1
fi
python3 pipeline.py "\$1" "\$2" &amp;&amp; echo "Done, exit: \$?"</div>
</div>
`,
    interactiveExample: {
        explanation: "Explore your shell environment — see what variables exist and how your system is configured.",
        code: `# Who are you and where are you?
$ whoami && echo "PID: $$" && echo "Shell: $SHELL"
anuj
PID: 12345
Shell: /bin/bash

# All environment variables (sorted):
$ env | sort | head -8
COLORTERM=truecolor
HOME=/home/anuj
LANG=en_US.UTF-8
PATH=/home/anuj/.local/bin:/usr/local/bin:/usr/bin:/bin
PWD=/home/anuj
SHELL=/bin/bash
USER=anuj

# Test Ctrl+R: press Ctrl+R then type "python"
(reverse-i-search)'python': python3 train.py --epochs 100

# Fork demo:
$ bash -c 'echo "Child: $$ | Parent: \$PPID"'
Child: 12346 | Parent: 12345`
    }
}

    ], // end sections

    practiceExercises: [

        {
            id: "term_ex01",
            difficulty: "Easy",
            title: "Map the OS Architecture with Real Commands",
            description: "Verify each layer of the OS architecture by running commands that touch each one — hardware, kernel, shell, and user space.",
            starterCode: `# User space:
$ echo "Hello from User Space — PID: $$"

# Shell layer:
$ echo "Shell: $SHELL  Version: $BASH_VERSION"

# Kernel layer:
$ uname -r
$ cat /proc/version | head -1

# Hardware layer:
$ cat /proc/cpuinfo | grep "model name" | uniq
$ free -h`,
            solution: `$ echo "Hello from User Space — PID: $$"
Hello from User Space — PID: 12345

$ echo "Shell: $SHELL  Version: $BASH_VERSION"
Shell: /bin/bash  Version: 5.1.16(1)-release

$ uname -r
5.15.0-91-generic

$ cat /proc/version | head -1
Linux version 5.15.0-91-generic (buildd@...) (gcc 11.4.0) #101-Ubuntu SMP

$ cat /proc/cpuinfo | grep "model name" | uniq
model name : Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz

$ free -h
              total  used  free  available
Mem:           15Gi  4.2Gi  8.1Gi  10Gi`,
            explanation: "You touched every layer: user space (echo), shell ($SHELL), kernel (/proc/version uname), hardware (/proc/cpuinfo, free). The /proc filesystem is virtual — it's the kernel's live data presented as readable files."
        },

        {
            id: "term_ex02",
            difficulty: "Easy",
            title: "PTY and Terminal Investigation",
            description: "Explore the pseudo-terminal device underlying your session and understand how multiple terminal sessions coexist.",
            starterCode: `# What PTY are you connected to?
$ tty

# List all active sessions:
$ ls /dev/pts/
$ who

# Terminal dimensions (used by vim, htop):
$ tput cols; tput lines

# Special key mappings:
$ stty -a | head -4`,
            solution: `$ tty
/dev/pts/0

$ ls /dev/pts/
0  1  ptmx   # 2 sessions open; ptmx creates new PTY pairs

$ who
anuj    pts/0   2024-03-09 10:30 (192.168.1.5)
anuj    pts/1   2024-03-09 11:00 (192.168.1.5)

$ tput cols; tput lines
220
45

$ stty -a | head -4
speed 38400 baud; rows 45; columns 220;
intr = ^C; quit = ^\; erase = ^?; kill = ^U; eof = ^D;
# "intr = ^C" means Ctrl+C sends SIGINT to foreground process
# "eof  = ^D" means Ctrl+D signals end-of-input`,
            explanation: "/dev/pts/0 is a virtual serial port. The terminal app writes to the master end, bash reads from the slave end. The kernel TTY driver converts Ctrl+C into a SIGINT signal — that's why it kills programs even when bash looks frozen."
        },

        {
            id: "term_ex03",
            difficulty: "Easy",
            title: "Shell Expansion Playground",
            description: "Practice the 5 most useful shell expansions and see exactly what bash substitutes before running the command.",
            starterCode: `# 1. Brace expansion:
$ echo {1..5}
$ echo file_{A,B,C}.csv

# 2. Variable with modifiers:
$ name="DataEngineer"
$ echo "Length: \${#name}"
$ echo "Upper: \${name^^}"
$ echo "First4: \${name:0:4}"

# 3. Command substitution:
$ echo "Today: \$(date +%Y-%m-%d) — Files: \$(ls | wc -l)"

# 4. Arithmetic:
$ echo "10MB = \$((10 * 1024 * 1024)) bytes"

# 5. Glob:
$ ls /etc/*.conf | head -5`,
            solution: `$ echo {1..5}
1 2 3 4 5

$ echo file_{A,B,C}.csv
file_A.csv file_B.csv file_C.csv

$ name="DataEngineer"
$ echo "Length: \${#name}"
Length: 12

$ echo "Upper: \${name^^}"
Upper: DATAENGINEER

$ echo "First4: \${name:0:4}"
First4: Data

$ echo "Today: \$(date +%Y-%m-%d) — Files: \$(ls | wc -l)"
Today: 2024-03-09 — Files: 23

$ echo "10MB = \$((10 * 1024 * 1024)) bytes"
10MB = 10485760 bytes

$ ls /etc/*.conf | head -5
/etc/adduser.conf
/etc/ca-certificates.conf
/etc/debconf.conf
/etc/deluser.conf
/etc/gai.conf`,
            explanation: "Brace expansion happens before filesystem access — file_{A,B,C}.csv generates three names even if none exist. Use it to create directory trees: mkdir -p project/{src,tests,data}. Command substitution $(cmd) runs the command and inserts its output inline — perfect for timestamps in script filenames."
        },

        {
            id: "term_ex04",
            difficulty: "Easy",
            title: "Process Spawning — Watch fork() in Action",
            description: "Observe process creation using background jobs, verify the parent-child relationship, and practice job control.",
            starterCode: `# Start background jobs:
$ sleep 60 &
$ sleep 60 &

# See background jobs:
$ jobs

# See parent-child relationship:
$ ps -f -p $!   # $! = last background job PID
$ pstree -p $$ 2>/dev/null | head -5

# Kill a specific job:
$ kill %1

# Check exit:
$ echo "Exit: $?"`,
            solution: `$ sleep 60 &
[1] 13421

$ sleep 60 &
[2] 13422

$ jobs
[1]-  Running    sleep 60 &
[2]+  Running    sleep 60 &

$ ps -f -p 13422
UID    PID  PPID  C STIME TTY   TIME CMD
anuj  13422 12345  0 10:30 pts/0 00:00:00 sleep 60
# PPID=12345 = your bash shell is the parent

$ pstree -p $$ 2>/dev/null | head -4
bash(12345)-+-sleep(13421)
            \-sleep(13422)

$ kill %1
[1]   Terminated   sleep 60

$ echo "Exit: $?"
Exit: 0`,
            explanation: "Background jobs (&) fork a child but don't wait for it. pstree shows your bash is parent to both sleep processes. When the parent exits (logout), orphan processes are adopted by PID 1 (systemd) — that's how background daemons survive after you log out."
        },

        {
            id: "term_ex05",
            difficulty: "Medium",
            title: "Trace Commands with strace",
            description: "Use strace to see the actual kernel system calls made when running commands. Count them, understand each one.",
            starterCode: `# Count ALL syscalls for echo:
$ strace -c echo "hello" 2>&1

# Trace specific syscalls for ls:
$ strace -e trace=openat,getdents64,write ls /tmp 2>&1 | head -8

# Measure kernel vs user time:
$ time ls /var/log > /dev/null`,
            solution: `$ strace -c echo "hello" 2>&1
hello
% time     seconds  calls syscall
  43.2    0.000098     14 mmap
  19.8    0.000045      7 openat
  12.4    0.000028      3 read
   8.9    0.000020      4 close
   5.2    0.000012      1 write    ← the actual output
   ...
Total: ~40 syscalls just for "echo hello"!

$ strace -e trace=openat,getdents64,write ls /tmp 2>&1 | head -6
openat(AT_FDCWD, "/tmp", O_RDONLY|O_DIRECTORY) = 3
getdents64(3, /* 15 entries */, 32768)  = 416
getdents64(3, /* 0 entries */, 32768)   = 0
write(1, "file1.log  test.csv  ...\n", 33) = 33

$ time ls /var/log > /dev/null
real    0m0.004s
user    0m0.001s   ← CPU in your program (ls code)
sys     0m0.003s   ← CPU in kernel (syscalls)`,
            explanation: "strace reveals the hidden work every program does. Even echo makes 40 syscalls for dynamic library loading. The write(1,...) is the actual output — fd=1 is stdout. real/user/sys timing: when sys > user, the bottleneck is in the kernel (I/O heavy). When user > sys, it's CPU computation."
        },

        {
            id: "term_ex06",
            difficulty: "Medium",
            title: "Subshell vs Current Shell — Scoping Experiment",
            description: "Prove that subshells cannot change the parent's environment, and understand why conda activate must use 'source'.",
            starterCode: `# Test 1: unexported variable NOT inherited
$ MY_VAR="hello"
$ bash -c 'echo "\$MY_VAR"'      # What prints?

# Test 2: exported variable IS inherited
$ export MY_EXPORT="world"
$ bash -c 'echo "\$MY_EXPORT"'   # What prints?

# Test 3: subshell cd doesn't affect parent
$ cd /tmp
$ bash -c 'cd /var; echo "In subshell: $PWD"'
$ echo "In parent: $PWD"

# Test 4: source vs execute
$ echo 'LOADED="yes"' > /tmp/test.sh
$ bash /tmp/test.sh; echo \$LOADED   # empty?
$ source /tmp/test.sh; echo \$LOADED # set?`,
            solution: `# Test 1:
$ MY_VAR="hello"
$ bash -c 'echo "\$MY_VAR"'
               # EMPTY — not exported, not inherited

# Test 2:
$ export MY_EXPORT="world"
$ bash -c 'echo "\$MY_EXPORT"'
world          # Exported vars ARE inherited

# Test 3:
$ cd /tmp
$ bash -c 'cd /var; echo "In subshell: $PWD"'
In subshell: /var
$ echo "In parent: $PWD"
In parent: /tmp   # Unchanged! Subshell's cd had zero effect

# Test 4:
$ bash /tmp/test.sh; echo \$LOADED
               # EMPTY — child's variable doesn't propagate up

$ source /tmp/test.sh; echo \$LOADED
yes            # source runs IN current shell → sets variable here`,
            explanation: "This is THE most important shell concept for debugging. Subshells inherit exported vars but CANNOT change the parent. That's why conda activate uses 'source activate' — it must modify YOUR shell's PATH directly. When a script sets variables you can't see, it's running as a subshell. Solution: source it."
        },

        {
            id: "term_ex07",
            difficulty: "Medium",
            title: "Investigate Your PATH and Fix a Broken Environment",
            description: "Simulate the classic 'command not found' error and learn how to diagnose and fix broken PATH issues.",
            starterCode: `# Show your full PATH one per line:
$ echo $PATH | tr ':' '\n'

# Test what happens with a minimal PATH:
$ (export PATH="/usr/bin:/bin"; which python3)
$ (export PATH="/usr/bin:/bin"; which spark-submit 2>&1)

# Create your own command:
$ mkdir -p ~/bin
$ echo '#!/bin/bash' > ~/bin/myapp
$ echo 'echo "myapp running! Args: $@"' >> ~/bin/myapp
$ chmod +x ~/bin/myapp
$ export PATH="$HOME/bin:$PATH"
$ myapp hello world`,
            solution: `$ echo $PATH | tr ':' '\n'
/home/anuj/.local/bin
/opt/conda/bin
/opt/spark/bin
/usr/local/bin
/usr/bin
/bin

$ (export PATH="/usr/bin:/bin"; which python3)
/usr/bin/python3    # found — it's in /usr/bin

$ (export PATH="/usr/bin:/bin"; which spark-submit 2>&1)
which: no spark-submit in (/usr/bin:/bin)
# spark-submit is in /opt/spark/bin which isn't on this minimal PATH

$ mkdir -p ~/bin
$ echo -e '#!/bin/bash\necho "myapp running! Args: $@"' > ~/bin/myapp
$ chmod +x ~/bin/myapp
$ export PATH="$HOME/bin:$PATH"
$ myapp hello world
myapp running! Args: hello world

# Make permanent:
$ echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc`,
            explanation: "PATH is searched left-to-right — first match wins. conda prepends its dir so 'python3' resolves to conda's version instead of /usr/bin/python3. When you get 'command not found': 1) use 'find /opt -name cmdname' 2) add that directory to PATH. chmod +x makes a script executable — without it, 'permission denied' even as root."
        },

        {
            id: "term_ex08",
            difficulty: "Medium",
            title: "Build a Colorful PS1 Prompt",
            description: "Craft an informative bash prompt with colors, git branch indicator, and exit status display.",
            starterCode: `# Step 1: test basic PS1:
$ PS1='\\u@\\h:\\w\\$ '

# Step 2: add colors:
$ PS1='\\[\\e[36m\\]\\u\\[\\e[0m\\]@\\[\\e[35m\\]\\h\\[\\e[0m\\]:\\[\\e[32m\\]\\w\\[\\e[0m\\]\\$ '

# Step 3: add git branch function to ~/.bashrc:
git_branch() {
    git branch 2>/dev/null | grep '^\*' | cut -d' ' -f2
}

# Step 4: build the full PS1:
# (see solution for complete implementation)`,
            solution: `# Add this to ~/.bashrc:

git_branch() {
    local b=$(git branch 2>/dev/null | grep '^\*' | cut -d' ' -f2)
    [ -n "$b" ] && echo " (git:$b)"
}

show_exit() {
    local e=$?
    [ $e -ne 0 ] && echo " [exit:$e]"
}

# Build PS1 in pieces:
PS1='\n'
PS1+='[ESC[36m]USER'                 # cyan: username
PS1+='@\[\e[35m\]HOST\[\e[0m\]:'     # magenta: hostname
PS1+='[ESC[32m]WDIR'                 # green: current dir
PS1+='[ESC[31m]$(git_branch)'      # red: git branch
PS1+='[ESC[33m]$(show_exit)'       # yellow: exit code if error
PS1+='\n\[\e[0m\]\$ '              # newline + prompt char

source ~/.bashrc

# Result looks like:
# anuj@ubuntu-prod:~/projects/pipeline (git:main)
# $`,
            explanation: "PS1 is re-evaluated every prompt display — that's why $(git_branch) shows fresh data each time. The \\[ and \\] wrappers around color codes are critical: they tell readline these chars are zero-width, so cursor positioning works correctly. Without them, command history navigation breaks on long commands."
        },

        {
            id: "term_ex09",
            difficulty: "Hard",
            title: "Build a System Health Monitor",
            description: "Write a bash script that checks CPU, memory, disk, and processes with color-coded status levels.",
            starterCode: `#!/bin/bash
# system_health.sh

RED='\\033[0;31m'
YELLOW='\\033[1;33m'
GREEN='\\033[0;32m'
CYAN='\\033[0;36m'
NC='\\033[0m'

echo "═══════════════════════════════════"
echo "    SYSTEM HEALTH — \$(date +"%Y-%m-%d %H:%M")"
echo "═══════════════════════════════════"

# TODO: check CPU load, memory, disk, top process`,
            solution: `#!/bin/bash
RED='\\033[0;31m'
YELLOW='\\033[1;33m'
GREEN='\\033[0;32m'
CYAN='\\033[0;36m'
NC='\\033[0m'

echo "═══════════════════════════════════"
echo "    SYSTEM HEALTH CHECK"
echo "    \$(date '+%Y-%m-%d %H:%M:%S')"
echo "    $(hostname) | $(uname -r)"
echo "═══════════════════════════════════"

cores=$(nproc)
load=$(uptime | awk -F'average:' '{print $2}' | cut -d',' -f1 | tr -d ' ')
load_i=\${load%.*}
if [ "\${load_i:-0}" -gt "$cores" ]; then
    echo -e "CPU Load:   \${RED}\${load} CRITICAL (\${cores} cores)\${NC}"
elif [ "\${load_i:-0}" -gt "$((cores/2))" ]; then
    echo -e "CPU Load:   \${YELLOW}\${load} WARNING\${NC}"
else
    echo -e "CPU Load:   \${GREEN}\${load} OK\${NC}"
fi

mem_t=$(free -m | awk '/^Mem:/{print $2}')
mem_u=$(free -m | awk '/^Mem:/{print $3}')
mem_p=$((mem_u * 100 / mem_t))
if   [ $mem_p -gt 90 ]; then echo -e "Memory:     \${RED}\${mem_p}% CRITICAL\${NC}"
elif [ $mem_p -gt 70 ]; then echo -e "Memory:     \${YELLOW}\${mem_p}% WARNING\${NC}"
else                          echo -e "Memory:     \${GREEN}\${mem_p}% OK\${NC}"; fi

disk_p=$(df / | tail -1 | awk '{gsub(/%/,"",$5); print $5}')
if   [ $disk_p -gt 90 ]; then echo -e "Disk (/):   \${RED}\${disk_p}% CRITICAL\${NC}"
elif [ $disk_p -gt 70 ]; then echo -e "Disk (/):   \${YELLOW}\${disk_p}% WARNING\${NC}"
else                          echo -e "Disk (/):   \${GREEN}\${disk_p}% OK\${NC}"; fi

echo -e "Processes:  \${CYAN}$(ps aux | wc -l) running\${NC}"
echo ""
echo "Top memory consumers:"
ps aux --sort=-%mem | awk 'NR>1&&NR<=4{printf "  %5s%%  %s\\n",$4,$11}'
echo "═══════════════════════════════════"`,
            explanation: "This is what production monitoring scripts actually look like. awk extracts specific fields from command output. The \${var%.*} strips the decimal for integer comparison. Color codes are ANSI escapes: \\033[0;31m=red, \\033[0m=reset. The -e flag on echo enables escape interpretation. This exact pattern — thresholds with color coding — is used in Nagios, Zabbix, and custom alerting scripts."
        },

        {
            id: "term_ex10",
            difficulty: "Hard",
            title: "Complete OS Internals Investigation",
            description: "Deep dive into /proc to observe running processes, memory maps, and system calls — seeing the OS internals directly.",
            starterCode: `# Start a Python process to observe:
$ python3 -c "
import time
x = list(range(1000000))
print(f'PID: {__import__(\"os\").getpid()}')
time.sleep(30)
" &
$ PY_PID=$!

# Observe its memory layout:
$ cat /proc/\$PY_PID/status | grep -E "Vm|Mem"

# See all memory maps:
$ head -10 /proc/\$PY_PID/maps

# Check its open file descriptors:
$ ls -la /proc/\$PY_PID/fd

# Clean up:
$ kill \$PY_PID`,
            solution: `$ python3 -c "
import time, os
x = list(range(1000000))
print(f'PID: {os.getpid()}')
time.sleep(30)
" &
[1] 13500
PID: 13500

$ PY_PID=13500
$ cat /proc/\$PY_PID/status | grep -E "Vm|Mem"
VmPeak:    90868 kB   ← peak virtual memory used
VmSize:    90868 kB   ← current virtual address space
VmRSS:     52404 kB   ← Resident Set Size (physical RAM used)
VmData:    51252 kB   ← heap (where list x lives)
VmStk:       132 kB   ← stack

$ head -6 /proc/\$PY_PID/maps
55a3d4200000-55a3d4201000 r--p /usr/bin/python3.10    ← code segment
7f6b12000000-7f6b15000000 rw-p [heap]                  ← YOUR list x is here!
7fff12345000-7fff12366000 rw-p [stack]                 ← function call stack
7f6b20000000-7f6b21800000 r-xp /usr/lib/python3.10/... ← Python lib

$ ls -la /proc/\$PY_PID/fd
lrwxrwxrwx 1 anuj anuj 64 Mar 9 10:30 0 -> /dev/pts/0   ← stdin
lrwxrwxrwx 1 anuj anuj 64 Mar 9 10:30 1 -> /dev/pts/0   ← stdout
lrwxrwxrwx 1 anuj anuj 64 Mar 9 10:30 2 -> /dev/pts/0   ← stderr

$ kill \$PY_PID
[1]+  Terminated  python3 -c ...`,
            explanation: "VmRSS (physical RAM) is always less than VmSize (virtual address space) because Linux uses lazy allocation — pages are only physically allocated when first written. This is why 'overcommit' is possible. The maps file shows every memory region: code, heap (where your million-element list lives), stack, and shared libraries. /proc/PID/fd shows all open file descriptors — 0/1/2 are always stdin/stdout/stderr pointing back to your PTY."
        }

    ],

    summary: `
<h3>📋 Chapter Summary: Terminal &amp; Shell Basics</h3>
<div class="tip-box">
    <h4>✅ Everything You Now Understand</h4>
    <ul>
        <li><strong>Operating System:</strong> The resource manager — schedules processes with time-slicing (1ms/slice), manages virtual memory (each process has private address space via MMU), abstracts hardware, enforces security. All apps touch hardware ONLY via kernel syscalls.</li>
        <li><strong>Virtual Memory:</strong> Process A and Process B can both use virtual address 0 — the MMU translates to different physical pages. A crashed Python script CANNOT corrupt Spark. OOM killer picks victims when RAM is full.</li>
        <li><strong>Terminal vs Shell vs Console vs CLI:</strong> Console=physical hardware. Terminal=software app (gnome-terminal) creating a PTY. Shell=interpreter (bash/zsh) reading from PTY. CLI=any text interface concept.</li>
        <li><strong>PTY:</strong> Modern terminals use /dev/pts/N pseudo-terminal pairs. Terminal writes to master, shell reads from slave. Kernel TTY driver converts Ctrl+C → SIGINT signal.</li>
        <li><strong>9-Stage Command Pipeline:</strong> Tokenize → Parse → Expand (7 subtypes) → Quote Remove → Redirect → Locate in PATH → Fork → Exec → Wait. Every command goes through all 9.</li>
        <li><strong>Command Journey:</strong> Keyboard interrupt → PTY echo → bash readline → parse → PATH lookup → fork() → execve() → kernel executes binary → exit() → bash shows next prompt.</li>
        <li><strong>Shell Environment:</strong> export makes variables available to children. ~/.bashrc for interactive shells. source runs scripts in current shell (how conda activate works). PATH searched left-to-right.</li>
        <li><strong>Keyboard Shortcuts:</strong> Tab=autocomplete, Ctrl+R=history search, Ctrl+C=SIGINT, Ctrl+D=EOF, Ctrl+Z=suspend, sudo !!=repeat with root, Ctrl+A/E=line navigation.</li>
    </ul>
</div>
<div class="info-box">
    <h4>📚 Coming Up Next</h4>
    <p>Next: <strong>Navigation (cd, pwd, ls)</strong> — now that you understand HOW the shell and OS work, let's master moving around the Linux filesystem. You'll learn to read directory listings like a pro and create 100 files with a single command.</p>
</div>
    `

}; // end terminalBasics