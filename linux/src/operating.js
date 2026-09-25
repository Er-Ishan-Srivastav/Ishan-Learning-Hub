
var operatingSystem = {

    title: "What Is an Operating System & How It Works",
    description: "Understand the invisible layer that makes all computing possible — from kernel internals to boot sequences to why your Spark job crashes at 3AM",
    breadcrumb: "Getting Started > What Is an Operating System",

    sections: [

        // ══════════════════════════════════════════════════════════════════
        // SECTION 1 — The Big Picture
        // ══════════════════════════════════════════════════════════════════
        {
            id: "big_picture",
            content: `
<h3>🌍 The Big Picture — Why Does an OS Exist?</h3>

<div class="story-box">
    <h4>🏨 The 5-Star Hotel Analogy</h4>
    <p>Imagine a brand-new 5-star hotel. The <strong>building itself</strong> (rooms, electricity, plumbing, kitchen equipment, elevators) is incredibly powerful — but completely passive. It does nothing on its own. On the other side, <strong>guests</strong> want services — hot water, food, a clean room, WiFi — but they have no idea how any of the building's systems actually work, and they shouldn't need to.</p>
    <p>Between them sits <strong>hotel management</strong> — the invisible system that allocates rooms, ensures hot water when you turn the tap, routes your room service order to the kitchen, prevents one guest from barging into another's room, and cleans up after checkout. Without management, the building is useless. Without the building, management has nothing to manage.</p>
    <p>In computing: <strong>Hardware</strong> = the building. <strong>Applications</strong> = guests. <strong>Operating System</strong> = hotel management. The OS is the invisible layer that makes everything work together — translating human intentions into machine instructions and managing shared resources so 50 programs can run on one CPU without stepping on each other.</p>
</div>

<h4>📖 Core Terminology — Every Word Defined</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>🧠 Operating System (OS)</h5>
        <p>The <strong>system software that manages hardware resources and provides services for application programs</strong>. It sits between hardware and user applications. Examples: Linux, Windows, macOS, Android. The OS never stops running from boot to shutdown.</p>
    </div>
    <div class="mini-card">
        <h5>⚙️ Kernel</h5>
        <p>The <strong>core of the OS</strong> — the program that has direct access to hardware and runs in privileged mode. All other software goes through the kernel to access hardware. Linux is just the kernel; the full "Linux OS" adds tools and a shell on top.</p>
    </div>
    <div class="mini-card">
        <h5>🔲 Process</h5>
        <p>A <strong>running instance of a program</strong>. When you launch Python, the OS creates a process — gives it a PID (Process ID), allocates memory, and schedules it on the CPU. The same program can have multiple processes running simultaneously.</p>
    </div>
    <div class="mini-card">
        <h5>💾 Memory (RAM)</h5>
        <p><strong>Random Access Memory</strong> — fast, temporary storage where running programs live. When power is cut, RAM is wiped. The OS controls which process gets how much RAM and protects processes from reading each other's memory.</p>
    </div>
    <div class="mini-card">
        <h5>📞 System Call</h5>
        <p>The <strong>official request mechanism</strong> for user programs to ask the kernel for something — "write this file," "allocate memory," "create a network socket." It's the ONLY legal way for applications to access hardware. Everything else is blocked.</p>
    </div>
    <div class="mini-card">
        <h5>🚗 Device Driver</h5>
        <p>A <strong>software translator</strong> that knows how to communicate with specific hardware. Your GPU needs a different driver than your keyboard. Drivers live in kernel space. This is why installing a graphics card requires installing a driver.</p>
    </div>
    <div class="mini-card">
        <h5>🗓️ Scheduler</h5>
        <p>The OS component that <strong>decides which process runs on the CPU at any moment</strong>. With 100 processes and 4 CPU cores, the scheduler constantly rotates which process gets time — creating the illusion of simultaneous execution.</p>
    </div>
    <div class="mini-card">
        <h5>🗺️ Virtual Memory</h5>
        <p>An <strong>illusion the OS creates</strong> — each process believes it has the entire computer's memory to itself. The OS maps these "virtual" addresses to real physical RAM locations, protecting processes from each other and enabling more processes than RAM can hold.</p>
    </div>
    <div class="mini-card">
        <h5>🔐 Privilege Levels</h5>
        <p>Hardware-enforced <strong>security rings</strong>. Ring 0 (kernel mode) = full hardware access. Ring 3 (user mode) = restricted. Your Python script runs in Ring 3 and cannot directly touch hardware — it must ask Ring 0 via system calls. CPUs enforce this in hardware.</p>
    </div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes layerPulse { 0%,100%{opacity:0.7} 50%{opacity:1} }
                @keyframes arrowFlow { 0%{stroke-dashoffset:40} 100%{stroke-dashoffset:0} }
                @keyframes glow { 0%,100%{filter:drop-shadow(0 0 4px #f87171)} 50%{filter:drop-shadow(0 0 12px #f87171)} }
                .lp1{animation:layerPulse 2.5s ease-in-out infinite 0.0s}
                .lp2{animation:layerPulse 2.5s ease-in-out infinite 0.5s}
                .lp3{animation:layerPulse 2.5s ease-in-out infinite 1.0s}
                .lp4{animation:layerPulse 2.5s ease-in-out infinite 1.5s}
                .af{stroke-dasharray:10,5;animation:arrowFlow 1s linear infinite}
                .kg{animation:glow 2s ease-in-out infinite}
            </style>
        </defs>

        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="Space Grotesk">The OS Layer Model — Software Stack from Hardware to You</text>

        <!-- Hardware layer -->
        <rect x="40" y="340" width="640" height="64" rx="10" fill="#1a0505" stroke="#f87171" stroke-width="2.5" class="lp4"/>
        <text x="360" y="368" text-anchor="middle" fill="#f87171" font-size="16" font-weight="bold" font-family="Space Grotesk">HARDWARE</text>
        <text x="360" y="388" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="JetBrains Mono">CPU · RAM · Disk · Network Card · USB · GPU · Keyboard</text>
        <text x="60"  y="378" fill="#64748b" font-size="9">Dumb. Powerful.</text>
        <text x="60"  y="390" fill="#64748b" font-size="9">Only understands binary.</text>

        <!-- Kernel layer -->
        <rect x="40" y="254" width="640" height="72" rx="10" fill="#1a1205" stroke="#fbbf24" stroke-width="2.5" class="lp3 kg"/>
        <text x="360" y="280" text-anchor="middle" fill="#fbbf24" font-size="16" font-weight="bold" font-family="Space Grotesk">KERNEL (OS Core)</text>
        <text x="360" y="300" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="JetBrains Mono">Process Mgmt · Memory Mgmt · Filesystem · Device Drivers · Security</text>
        <text x="60"  y="290" fill="#fbbf24" font-size="9">RING 0</text>
        <text x="60"  y="302" fill="#64748b" font-size="9">Full hardware access</text>
        <text x="660" y="290" text-anchor="end" fill="#fbbf24" font-size="9">Kernel Space</text>
        <text x="660" y="302" text-anchor="end" fill="#64748b" font-size="9">Protected</text>

        <!-- System call boundary -->
        <line x1="40" y1="252" x2="680" y2="252" stroke="#ef4444" stroke-width="2" stroke-dasharray="8,4"/>
        <text x="360" y="248" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold" font-family="JetBrains Mono">──── SYSTEM CALL BOUNDARY  ·  Cannot be crossed directly ────</text>

        <!-- System libs layer -->
        <rect x="40" y="180" width="640" height="60" rx="10" fill="#0a1520" stroke="#22d3ee" stroke-width="2" class="lp2"/>
        <text x="360" y="205" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold" font-family="Space Grotesk">SYSTEM LIBRARIES (libc, glibc)</text>
        <text x="360" y="225" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="JetBrains Mono">C Standard Library · POSIX API · Python stdlib · Java JVM</text>
        <text x="60"  y="210" fill="#22d3ee" font-size="9">RING 3</text>
        <text x="60"  y="222" fill="#64748b" font-size="9">Wraps system calls</text>

        <!-- Shell layer -->
        <rect x="40" y="112" width="640" height="56" rx="10" fill="#0a1520" stroke="#34d399" stroke-width="2" class="lp1"/>
        <text x="360" y="136" text-anchor="middle" fill="#34d399" font-size="14" font-weight="bold" font-family="Space Grotesk">SHELL / TERMINAL (bash, zsh)</text>
        <text x="360" y="154" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="JetBrains Mono">Command interpreter · Script runner · Your interactive interface</text>

        <!-- Applications layer -->
        <rect x="40" y="38" width="640" height="62" rx="10" fill="#0a1520" stroke="#a78bfa" stroke-width="2" class="lp1"/>
        <text x="360" y="62" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold" font-family="Space Grotesk">APPLICATIONS</text>
        <text x="360" y="82" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="JetBrains Mono">Python · Spark · Kafka · Airflow · Chrome · VS Code · Your Code</text>
        <text x="660" y="65" text-anchor="end" fill="#a78bfa" font-size="9">User Space</text>
        <text x="660" y="77" text-anchor="end" fill="#64748b" font-size="9">Restricted</text>

        <!-- Arrows between layers -->
        <line x1="360" y1="100" x2="360" y2="115" stroke="#64748b" stroke-width="2" marker-end="url(#arr)" class="af"/>
        <line x1="360" y1="168" x2="360" y2="180" stroke="#64748b" stroke-width="2" class="af"/>
        <line x1="360" y1="240" x2="360" y2="254" stroke="#ef4444" stroke-width="2.5" class="af"/>
        <line x1="360" y1="326" x2="360" y2="340" stroke="#64748b" stroke-width="2" class="af"/>

        <text x="376" y="110" fill="#64748b" font-size="9">uses</text>
        <text x="376" y="176" fill="#64748b" font-size="9">calls</text>
        <text x="376" y="248" fill="#ef4444" font-size="9" font-weight="bold">syscall</text>
        <text x="376" y="336" fill="#64748b" font-size="9">controls</text>
    </svg>
    <div class="caption">Every program you run lives in User Space. To do anything real (file I/O, network, memory), it must cross the system call boundary and ask the kernel — which alone can touch hardware.</div>
</div>

<div class="info-box">
    <h4>💡 Why This Separation Exists — Security by Design</h4>
    <p>If any program could directly access hardware, one buggy line in a web browser could corrupt your disk, read another app's passwords, or crash your machine. The hardware privilege separation (Ring 0 vs Ring 3) makes this physically impossible. A program in Ring 3 that tries to execute a privileged instruction gets an immediate hardware exception — the CPU refuses and the kernel kills the offending process. This is why Chrome crashing doesn't corrupt your files — it literally cannot touch them without asking the kernel first.</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════════════════
        // SECTION 2 — Process Management & CPU Scheduling
        // ══════════════════════════════════════════════════════════════════
        {
            id: "process_management",
            content: `
<h3>🧠 Process Management — How the OS Juggles Everything</h3>

<div class="story-box">
    <h4>🎪 The Juggler with One Hand</h4>
    <p>A CPU core can only execute ONE instruction at a time. Yet you have Chrome, Spotify, VS Code, a Python script, and 40 background services all "running simultaneously." How? The OS is a <strong>master juggler</strong> — it switches between processes so fast (every 5–10 milliseconds) that your brain perceives parallelism. A modern 4-core machine can run 4 things truly simultaneously, but the OS still manages 300+ processes by rapidly rotating which 4 get CPU time at any moment.</p>
</div>

<h4>📖 Process Terminology</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>🔢 PID (Process ID)</h5>
        <p>A <strong>unique integer the OS assigns to every running process</strong>. The kernel (PID 1 = systemd/init) is always first. Your bash shell gets a PID, Python gets a PID, every process has one. See them with <code>ps aux</code> or in <code>/proc/</code>.</p>
    </div>
    <div class="mini-card">
        <h5>👨‍👦 Parent & Child Processes</h5>
        <p>Every process (except PID 1) is <strong>created by another process</strong> via <code>fork()</code>. When you type python3 in bash, bash forks a child process. The child inherits the parent's environment. PID 1 is the ancestor of all processes.</p>
    </div>
    <div class="mini-card">
        <h5>⏱️ Time Slice (Quantum)</h5>
        <p>The <strong>maximum CPU time a process gets before the scheduler interrupts it</strong> — typically 5–20 milliseconds. After the quantum expires, the scheduler picks the next process. This creates the illusion of simultaneous execution.</p>
    </div>
    <div class="mini-card">
        <h5>🎯 Process States</h5>
        <p>A process moves through states: <strong>New</strong> (being created) → <strong>Ready</strong> (waiting for CPU) → <strong>Running</strong> (executing on CPU) → <strong>Waiting</strong> (blocked on I/O) → <strong>Terminated</strong>. The scheduler manages these transitions.</p>
    </div>
    <div class="mini-card">
        <h5>🧵 Thread</h5>
        <p>A <strong>lightweight execution unit within a process</strong>. A process can have multiple threads sharing the same memory space. Your Python script is single-threaded. Spark workers are multi-threaded. The OS schedules threads, not just processes.</p>
    </div>
    <div class="mini-card">
        <h5>🏆 Priority & Nice Value</h5>
        <p>The OS gives <strong>higher-priority processes more CPU time</strong>. In Linux, the "nice" value (-20 to +19) controls this — negative = high priority, positive = low priority (being "nice" to others). System processes typically have higher priority than user apps.</p>
    </div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes stateMove { 0%,100%{opacity:0.5} 40%,60%{opacity:1} }
                @keyframes cpuSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                @keyframes sliceAnim { 0%{width:0} 100%{width:160px} }
                @keyframes procWait { 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
                .sm1{animation:stateMove 3s ease-in-out infinite 0.0s}
                .sm2{animation:stateMove 3s ease-in-out infinite 0.5s}
                .sm3{animation:stateMove 3s ease-in-out infinite 1.0s}
                .sm4{animation:stateMove 3s ease-in-out infinite 1.5s}
                .pw{animation:procWait 1.5s ease-in-out infinite}
            </style>
        </defs>

        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Process State Machine — Every Process Follows This Lifecycle</text>

        <!-- State nodes -->
        <circle cx="120" cy="100" r="42" fill="#0d1f0d" stroke="#34d399" stroke-width="2" class="sm1"/>
        <text x="120" y="95" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold">NEW</text>
        <text x="120" y="112" text-anchor="middle" fill="#64748b" font-size="9">fork() called</text>
        <text x="120" y="124" text-anchor="middle" fill="#64748b" font-size="9">OS creates PCB</text>

        <circle cx="310" cy="100" r="42" fill="#0a1520" stroke="#22d3ee" stroke-width="2.5" class="sm2"/>
        <text x="310" y="95" text-anchor="middle" fill="#22d3ee" font-size="12" font-weight="bold">READY</text>
        <text x="310" y="112" text-anchor="middle" fill="#64748b" font-size="9">Waiting for CPU</text>
        <text x="310" y="124" text-anchor="middle" fill="#64748b" font-size="9">In scheduler queue</text>

        <circle cx="500" cy="100" r="42" fill="#1a0505" stroke="#f87171" stroke-width="3" class="sm3"/>
        <text x="500" y="91" text-anchor="middle" fill="#f87171" font-size="12" font-weight="bold">RUNNING</text>
        <text x="500" y="107" text-anchor="middle" fill="#f87171" font-size="9">On CPU RIGHT NOW</text>
        <text x="500" y="120" text-anchor="middle" fill="#64748b" font-size="9">Executing instructions</text>

        <circle cx="500" cy="260" r="42" fill="#0a1520" stroke="#fbbf24" stroke-width="2" class="sm4"/>
        <text x="500" y="255" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold">WAITING</text>
        <text x="500" y="272" text-anchor="middle" fill="#64748b" font-size="9">Blocked on I/O</text>
        <text x="500" y="284" text-anchor="middle" fill="#64748b" font-size="9">e.g. reading disk</text>

        <circle cx="680" cy="180" r="42" fill="#0a1520" stroke="#64748b" stroke-width="2"/>
        <text x="680" y="175" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold">TERMINATED</text>
        <text x="680" y="192" text-anchor="middle" fill="#64748b" font-size="9">exit() called</text>
        <text x="680" y="204" text-anchor="middle" fill="#64748b" font-size="9">or killed</text>

        <!-- Transitions -->
        <line x1="162" y1="100" x2="268" y2="100" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#a)"/>
        <text x="215" y="92" text-anchor="middle" fill="#22d3ee" font-size="9">admitted</text>

        <line x1="352" y1="100" x2="458" y2="100" stroke="#34d399" stroke-width="1.5" marker-end="url(#a)"/>
        <text x="405" y="92" text-anchor="middle" fill="#34d399" font-size="9">scheduler dispatch</text>

        <path d="M 468 120 Q 390 180 348 120" fill="none" stroke="#fbbf24" stroke-width="1.5" marker-end="url(#a)" stroke-dasharray="5,3"/>
        <text x="390" y="168" text-anchor="middle" fill="#fbbf24" font-size="9">time slice expired</text>
        <text x="390" y="180" text-anchor="middle" fill="#64748b" font-size="8">(preempted by OS)</text>

        <line x1="500" y1="142" x2="500" y2="218" stroke="#fbbf24" stroke-width="1.5" marker-end="url(#a)"/>
        <text x="518" y="185" fill="#fbbf24" font-size="9">I/O wait</text>

        <path d="M 462 245 Q 380 220 348 118" fill="none" stroke="#22d3ee" stroke-width="1.5" marker-end="url(#a)" stroke-dasharray="5,3"/>
        <text x="360" y="235" text-anchor="middle" fill="#22d3ee" font-size="9">I/O complete</text>

        <line x1="542" y1="100" x2="638" y2="160" stroke="#64748b" stroke-width="1.5" marker-end="url(#a)"/>
        <text x="605" y="122" fill="#64748b" font-size="9">exit()</text>

        <line x1="542" y1="260" x2="638" y2="205" stroke="#64748b" stroke-width="1.5" marker-end="url(#a)"/>

        <!-- CPU Time Slice visualization -->
        <rect x="40" y="310" width="640" height="60" rx="8" fill="#0a1520" stroke="#334155" stroke-width="1"/>
        <text x="360" y="330" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="Space Grotesk">CPU Time Slicing — One Core, Many Processes</text>
        <text x="60"  y="352" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">0ms</text>
        <rect x="80" y="340" width="80" height="24" rx="3" fill="#1e3a4a" stroke="#22d3ee" stroke-width="1"/>
        <text x="120" y="356" text-anchor="middle" fill="#22d3ee" font-size="9" font-family="JetBrains Mono">Chrome(5ms)</text>
        <rect x="162" y="340" width="64" height="24" rx="3" fill="#1a1a05" stroke="#fbbf24" stroke-width="1"/>
        <text x="194" y="356" text-anchor="middle" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">Python</text>
        <rect x="228" y="340" width="80" height="24" rx="3" fill="#1e3a4a" stroke="#22d3ee" stroke-width="1"/>
        <text x="268" y="356" text-anchor="middle" fill="#22d3ee" font-size="9" font-family="JetBrains Mono">Chrome</text>
        <rect x="310" y="340" width="56" height="24" rx="3" fill="#0d1a0d" stroke="#34d399" stroke-width="1"/>
        <text x="338" y="356" text-anchor="middle" fill="#34d399" font-size="9" font-family="JetBrains Mono">Bash</text>
        <rect x="368" y="340" width="72" height="24" rx="3" fill="#0a0a1a" stroke="#a78bfa" stroke-width="1"/>
        <text x="404" y="356" text-anchor="middle" fill="#a78bfa" font-size="9" font-family="JetBrains Mono">Spotify</text>
        <rect x="442" y="340" width="80" height="24" rx="3" fill="#1e3a4a" stroke="#22d3ee" stroke-width="1"/>
        <text x="482" y="356" text-anchor="middle" fill="#22d3ee" font-size="9" font-family="JetBrains Mono">Chrome</text>
        <rect x="524" y="340" width="64" height="24" rx="3" fill="#1a1a05" stroke="#fbbf24" stroke-width="1"/>
        <text x="556" y="356" text-anchor="middle" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">Python</text>
        <rect x="590" y="340" width="72" height="24" rx="3" fill="#0d1a0d" stroke="#34d399" stroke-width="1"/>
        <text x="626" y="356" text-anchor="middle" fill="#34d399" font-size="9" font-family="JetBrains Mono">Bash...</text>
        <text x="360" y="376" text-anchor="middle" fill="#64748b" font-size="9" font-style="italic">Switches every 5-10ms — appears simultaneous to human perception</text>
    </svg>
    <div class="caption">The process state machine governs every program. Most processes spend most of their time in WAITING (blocked on disk/network I/O), not actually using the CPU.</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">process_exploration.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ═══ See all processes on your system ═══</span>
<span class="prompt">$</span> ps aux | head -10
<span class="output">USER       PID %CPU %MEM    VSZ   RSS TTY   STAT START   TIME COMMAND</span>
<span class="output">root         1  0.0  0.1 167816 11232 ?     Ss   Mar01   0:12 /sbin/init (systemd)</span>
<span class="output">root         2  0.0  0.0      0     0 ?     S    Mar01   0:00 [kthreadd]</span>
<span class="output">anuj      2847  0.1  0.5 123456 45678 pts/0 Ss   10:30   0:02 bash</span>
<span class="output">anuj      3521  0.0  0.0  14456  1024 pts/0 R+   10:31   0:00 ps aux</span>

<span class="comment"># PID=1 is ALWAYS systemd/init — ancestor of all processes</span>
<span class="comment"># STAT R=Running S=Sleeping D=Disk-wait Z=Zombie</span>

<span class="comment"># ═══ See YOUR processes ═══</span>
<span class="prompt">$</span> ps -u \$USER
<span class="prompt">$</span> pstree -p \$\$            <span class="comment"># Tree view — see parent-child relationships</span>
<span class="output">systemd(1)---sshd(892)---sshd(2846)---bash(2847)---pstree(3600)</span>
<span class="comment"># You can trace ancestry: bash is child of sshd is child of systemd</span>

<span class="comment"># ═══ Real-time process viewer ═══</span>
<span class="prompt">$</span> top             <span class="comment"># Live CPU/memory usage per process (press q to quit)</span>
<span class="prompt">$</span> htop            <span class="comment"># Better version (install: sudo apt install htop)</span>

<span class="comment"># ═══ Process details from /proc ═══</span>
<span class="prompt">$</span> echo \$\$             <span class="comment"># Print YOUR shell's PID</span>
<span class="output">2847</span>
<span class="prompt">$</span> ls /proc/2847/      <span class="comment"># See everything about this process</span>
<span class="output">cmdline  cwd  environ  exe  fd  maps  mem  mounts  stat  status</span>
<span class="prompt">$</span> cat /proc/2847/status | head -10
<span class="output">Name:   bash</span>
<span class="output">State:  S (sleeping)</span>
<span class="output">Pid:    2847</span>
<span class="output">PPid:   2846               ← Parent PID</span>
<span class="output">VmRSS:  45678 kB           ← RAM actually being used</span>
<span class="output">VmSize: 123456 kB          ← Virtual memory size</span>

<span class="comment"># ═══ Controlling processes ═══</span>
<span class="prompt">$</span> sleep 60 &           <span class="comment"># Start a background process</span>
<span class="output">[1] 3720</span>
<span class="prompt">$</span> kill 3720            <span class="comment"># Terminate it (sends SIGTERM)</span>
<span class="prompt">$</span> kill -9 3720         <span class="comment"># Force kill (SIGKILL — kernel kills immediately)</span>
<span class="prompt">$</span> nice -n 10 python3 heavy_job.py  <span class="comment"># Run with LOWER priority (nice to others)</span></div>
</div>

<div class="deep-dive-box">
    <h4>🔬 fork() + exec() — How Every Process Is Born</h4>
    <p>In Unix/Linux, new processes are created by exactly two system calls: <strong>fork()</strong> creates an exact clone of the current process (same code, same memory, different PID). Then <strong>exec()</strong> replaces that clone's code with a new program. When you type <code>python3 script.py</code> in bash: (1) bash calls fork() → creates a copy of bash, (2) the copy calls exec() with "python3 script.py" → its code is replaced with the Python interpreter, (3) Python runs your script. When Python exits, bash continues. This fork+exec pattern is how every single process on Linux is created. PID 1 (systemd) was started by the kernel directly — the only exception.</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════════════════
        // SECTION 3 — Memory Management
        // ══════════════════════════════════════════════════════════════════
        {
            id: "memory_management",
            content: `
<h3>💾 Memory Management — The Illusion of Infinite RAM</h3>

<div class="story-box">
    <h4>🏢 The Apartment Building Analogy</h4>
    <p>Imagine a 100-room apartment building (your 16GB RAM). 200 families (processes) each need to live there. Solution: each family gets told they have <strong>their own personal building</strong>. Secretly, the building manager (OS) shuffles which rooms map to which family, and when the building is full, temporarily moves some families into temporary storage (swap on disk) while other families use the rooms. Each family sees a perfect, isolated home. None of them know about the others or the shuffling happening behind the scenes. This is <strong>virtual memory</strong>.</p>
</div>

<h4>📖 Memory Terminology</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>📍 Virtual Address Space</h5>
        <p>The <strong>range of memory addresses a process can use</strong>. On 64-bit Linux, each process gets a 128TB virtual address space — far more than any physical RAM. Most is unused; the OS only allocates physical RAM when the process actually uses a page.</p>
    </div>
    <div class="mini-card">
        <h5>📄 Page</h5>
        <p>The <strong>unit of memory management</strong> — typically 4096 bytes (4KB). Both virtual and physical memory are divided into pages. The OS maps virtual pages to physical pages via a page table. Moving data to/from disk also happens one page at a time.</p>
    </div>
    <div class="mini-card">
        <h5>🗃️ Swap Space</h5>
        <p>A <strong>dedicated disk area that acts as overflow RAM</strong>. When physical RAM is full, the OS moves least-recently-used memory pages to swap. When needed again, they're loaded back. Swap is ~1000x slower than RAM — heavy swapping kills performance.</p>
    </div>
    <div class="mini-card">
        <h5>💨 Page Cache</h5>
        <p>Linux uses <strong>free RAM as a cache for disk data</strong>. Files you read are kept in RAM so the next read is instant (RAM speed) instead of slow (disk speed). The <code>cached</code> and <code>buff/cache</code> in <code>free -h</code> output show this. It's not wasted RAM — it's smart RAM.</p>
    </div>
    <div class="mini-card">
        <h5>💀 OOM Killer</h5>
        <p>The <strong>Out Of Memory Killer</strong> — the OS component that activates when RAM + swap is completely full. It picks the least important process (based on a scoring algorithm) and kills it to free memory. This is why your Spark job dies mysteriously: OOM Killer chose it.</p>
    </div>
    <div class="mini-card">
        <h5>🗺️ MMU</h5>
        <p>The <strong>Memory Management Unit</strong> — a hardware chip on the CPU that translates virtual addresses to physical addresses. Every memory access goes through the MMU. It enforces memory isolation: process A cannot read process B's memory because the MMU's page tables don't map it.</p>
    </div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes mapFlash { 0%,80%,100%{opacity:0.4} 30%,50%{opacity:1} }
                @keyframes pageMove { 0%{transform:translateY(0)} 50%{transform:translateY(-6px)} 100%{transform:translateY(0)} }
                .mf1{animation:mapFlash 3s ease-in-out infinite 0.0s}
                .mf2{animation:mapFlash 3s ease-in-out infinite 0.5s}
                .mf3{animation:mapFlash 3s ease-in-out infinite 1.0s}
                .mf4{animation:mapFlash 3s ease-in-out infinite 1.5s}
                .pm{animation:pageMove 2s ease-in-out infinite}
            </style>
        </defs>

        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Virtual Memory — Each Process Sees Its Own Private Address Space</text>

        <!-- Process A virtual space -->
        <rect x="10" y="36" width="130" height="200" rx="8" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="75" y="56" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">Process A</text>
        <text x="75" y="70" text-anchor="middle" fill="#64748b" font-size="9">(Python)</text>
        <rect x="20" y="78" width="110" height="22" rx="3" fill="#1e3a4a" stroke="#22d3ee" stroke-width="1" class="mf1"/>
        <text x="75" y="93" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">0x0000: code</text>
        <rect x="20" y="103" width="110" height="22" rx="3" fill="#1e3a4a" stroke="#22d3ee" stroke-width="1" class="mf2"/>
        <text x="75" y="118" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">0x1000: heap</text>
        <rect x="20" y="128" width="110" height="22" rx="3" fill="#1e3a4a" stroke="#22d3ee" stroke-width="1" class="mf3"/>
        <text x="75" y="143" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">0x5000: data</text>
        <rect x="20" y="153" width="110" height="22" rx="3" fill="#1e3a4a" stroke="#22d3ee" stroke-width="1" class="mf4"/>
        <text x="75" y="168" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">0xFF00: stack</text>
        <text x="75" y="210" text-anchor="middle" fill="#64748b" font-size="8" font-style="italic">sees 0x0000-0xFFFF</text>
        <text x="75" y="222" text-anchor="middle" fill="#64748b" font-size="8" font-style="italic">as its OWN memory</text>

        <!-- Process B virtual space -->
        <rect x="580" y="36" width="130" height="200" rx="8" fill="#0a1520" stroke="#a78bfa" stroke-width="2"/>
        <text x="645" y="56" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold" font-family="JetBrains Mono">Process B</text>
        <text x="645" y="70" text-anchor="middle" fill="#64748b" font-size="9">(Spark)</text>
        <rect x="590" y="78" width="110" height="22" rx="3" fill="#1a1230" stroke="#a78bfa" stroke-width="1" class="mf2"/>
        <text x="645" y="93" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="JetBrains Mono">0x0000: code</text>
        <rect x="590" y="103" width="110" height="22" rx="3" fill="#1a1230" stroke="#a78bfa" stroke-width="1" class="mf3"/>
        <text x="645" y="118" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="JetBrains Mono">0x1000: heap</text>
        <rect x="590" y="128" width="110" height="22" rx="3" fill="#1a1230" stroke="#a78bfa" stroke-width="1" class="mf4"/>
        <text x="645" y="143" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="JetBrains Mono">0x5000: data</text>
        <rect x="590" y="153" width="110" height="22" rx="3" fill="#1a1230" stroke="#a78bfa" stroke-width="1" class="mf1"/>
        <text x="645" y="168" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="JetBrains Mono">0xFF00: stack</text>
        <text x="645" y="210" text-anchor="middle" fill="#64748b" font-size="8" font-style="italic">SAME virtual addresses</text>
        <text x="645" y="222" text-anchor="middle" fill="#64748b" font-size="8" font-style="italic">DIFFERENT physical RAM</text>

        <!-- Physical RAM -->
        <rect x="240" y="36" width="240" height="200" rx="8" fill="#1a1005" stroke="#fbbf24" stroke-width="2"/>
        <text x="360" y="56" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">Physical RAM (16GB)</text>
        <rect x="250" y="66" width="220" height="18" rx="3" fill="#1e3a4a" stroke="#22d3ee" stroke-width="1"/>
        <text x="360" y="79" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Page 0001: A's code (frame 0)</text>
        <rect x="250" y="87" width="220" height="18" rx="3" fill="#1a1230" stroke="#a78bfa" stroke-width="1"/>
        <text x="360" y="100" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="JetBrains Mono">Page 0002: B's code (frame 1)</text>
        <rect x="250" y="108" width="220" height="18" rx="3" fill="#1e3a4a" stroke="#22d3ee" stroke-width="1"/>
        <text x="360" y="121" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Page 0003: A's heap (frame 2)</text>
        <rect x="250" y="129" width="220" height="18" rx="3" fill="#1a1230" stroke="#a78bfa" stroke-width="1"/>
        <text x="360" y="142" text-anchor="middle" fill="#a78bfa" font-size="8" font-family="JetBrains Mono">Page 0004: B's data (frame 3)</text>
        <rect x="250" y="150" width="220" height="18" rx="3" fill="#0d1f0d" stroke="#34d399" stroke-width="1"/>
        <text x="360" y="163" text-anchor="middle" fill="#34d399" font-size="8" font-family="JetBrains Mono">Page 0005: OS kernel code</text>
        <rect x="250" y="171" width="220" height="18" rx="3" fill="#1a1a05" stroke="#fbbf24" stroke-width="1"/>
        <text x="360" y="184" text-anchor="middle" fill="#fbbf24" font-size="8" font-family="JetBrains Mono">Page 0006: File cache (disk data)</text>
        <text x="360" y="215" text-anchor="middle" fill="#64748b" font-size="8">MMU maps virtual → physical using page tables</text>
        <text x="360" y="228" text-anchor="middle" fill="#64748b" font-size="8">A cannot access B's pages — hardware enforced</text>

        <!-- Arrows from virtual to physical -->
        <line x1="140" y1="89" x2="240" y2="75" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="4,2" class="mf1"/>
        <line x1="140" y1="114" x2="240" y2="120" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="4,2" class="mf2"/>
        <line x1="580" y1="89" x2="480" y2="96" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,2" class="mf2"/>
        <line x1="580" y1="143" x2="480" y2="141" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,2" class="mf3"/>

        <!-- Swap space -->
        <rect x="10" y="256" width="700" height="56" rx="8" fill="#1a0a0a" stroke="#f87171" stroke-width="1.5"/>
        <text x="360" y="276" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold" font-family="JetBrains Mono">SWAP SPACE (on Disk) — 1000x Slower Than RAM</text>
        <text x="360" y="296" text-anchor="middle" fill="#94a3b8" font-size="9">When RAM is full, OS moves least-used pages here · Heavy swapping = system grinds to a halt</text>
        <text x="360" y="312" text-anchor="middle" fill="#64748b" font-size="9">free -h shows swap usage · Spark jobs should NEVER use swap — always allocate enough RAM</text>

        <text x="360" y="352" text-anchor="middle" fill="#64748b" font-size="11" font-style="italic">Two processes using address 0x1000 are reading DIFFERENT physical memory — complete isolation</text>
    </svg>
    <div class="caption">Virtual memory gives every process the illusion of private, unlimited RAM. The MMU hardware enforces isolation — one buggy process cannot read another's data.</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">memory_investigation.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ═══ Check memory usage ═══</span>
<span class="prompt">$</span> free -h
<span class="output">              total   used   free   shared  buff/cache  available</span>
<span class="output">Mem:           15Gi   6.2Gi  1.1Gi   234Mi    8.1Gi      8.8Gi</span>
<span class="output">Swap:          2.0Gi  512Mi  1.5Gi</span>

<span class="comment"># buff/cache = Linux using FREE RAM as disk cache (SMART, not waste!)</span>
<span class="comment"># "available" is what programs can actually use (free + reclaimable cache)</span>
<span class="comment"># Swap used = 512MB — some pages swapped to disk (performance concern)</span>

<span class="comment"># ═══ Detailed memory info ═══</span>
<span class="prompt">$</span> cat /proc/meminfo | head -20
<span class="output">MemTotal:       16384000 kB   ← total physical RAM</span>
<span class="output">MemFree:         1158144 kB   ← completely unused RAM</span>
<span class="output">MemAvailable:    9064448 kB   ← available for new programs</span>
<span class="output">Buffers:          524288 kB   ← filesystem metadata cache</span>
<span class="output">Cached:          7864320 kB   ← file content cache</span>
<span class="output">SwapTotal:       2097152 kB</span>
<span class="output">SwapFree:        1572864 kB</span>

<span class="comment"># ═══ Memory usage per process ═══</span>
<span class="prompt">$</span> ps aux --sort=-%mem | head -10
<span class="output">USER       PID  %CPU %MEM    VSZ      RSS    COMMAND</span>
<span class="output">anuj      4521  12.3 25.4  8456789  4194304  java -jar spark-worker</span>
<span class="output">anuj      4522   8.1 15.2  5234567  2506752  python3 transform.py</span>
<span class="comment"># RSS = Resident Set Size = actual RAM in use right now</span>
<span class="comment"># VSZ = Virtual Size = virtual address space claimed (much larger)</span>

<span class="comment"># ═══ When OOM killer strikes ═══</span>
<span class="prompt">$</span> dmesg | grep -i "oom\|killed process" | tail -10
<span class="output">Out of memory: Kill process 4521 (java) score 847 or sacrifice child</span>
<span class="output">Killed process 4521 (java) total-vm:8456789kB, anon-rss:4194304kB</span>
<span class="comment"># Your Spark job was killed! OOM score 847 = chosen for termination</span>
<span class="comment"># Fix: reduce executor memory, add swap, or get more RAM</span></div>
</div>

<div class="warning-box">
    <h4>⚠️ Why Your Spark Job Dies at 3AM — OOM Killer Explained</h4>
    <p>When your pipeline processes data overnight and suddenly the Python/Java process dies with no error message, check <code>dmesg | grep -i oom</code>. The OS ran out of RAM, and the OOM Killer scored every process by how much RAM it was using and how recently it started — then killed the highest scorer. Your Spark executor, using gigabytes of RAM, loses this competition every time. The fix: either add <code>--executor-memory 4g</code> to spark-submit to limit each executor's RAM, or increase the machine's available memory.</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════════════════
        // SECTION 4 — Filesystem Management
        // ══════════════════════════════════════════════════════════════════
        {
            id: "filesystem_management",
            content: `
<h3>📁 Filesystem Management — How the OS Handles Every File</h3>

<div class="story-box">
    <h4>📚 The Library Cataloging System</h4>
    <p>A library has two separate systems: the <strong>catalog cards</strong> (metadata — book title, author, ISBN, which shelf it's on) and the <strong>actual books</strong> on the shelves (data). When you ask for "Linux Pocket Guide," the librarian looks up the catalog, gets shelf location "B-7-3", goes there, and retrieves the book. In Linux: the <strong>inode</strong> is the catalog card. The <strong>data blocks on disk</strong> are the actual book. The <strong>directory</strong> maps human-readable names ("data.csv") to catalog card numbers (inodes). This separation is what makes Linux filesystems extraordinarily powerful.</p>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes writeFlow { 0%{stroke-dashoffset:100} 100%{stroke-dashoffset:0} }
                @keyframes blockFill { 0%{fill:#0a1520} 50%{fill:#1e3a4a} 100%{fill:#0a1520} }
                .wf{stroke-dasharray:10,5;animation:writeFlow 1.5s linear infinite}
                .bf{animation:blockFill 2s ease-in-out infinite}
            </style>
        </defs>

        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">How Linux Stores a File — From Filename to Disk Blocks</text>

        <!-- Directory entry -->
        <rect x="10" y="36" width="180" height="120" rx="8" fill="#0a1520" stroke="#34d399" stroke-width="2"/>
        <text x="100" y="56" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">Directory</text>
        <text x="100" y="70" text-anchor="middle" fill="#64748b" font-size="8">/home/anuj/data/</text>
        <rect x="20" y="78" width="160" height="20" rx="3" fill="#0d1f0d" stroke="#34d399" stroke-width="1"/>
        <text x="100" y="92" text-anchor="middle" fill="#34d399" font-size="9" font-family="JetBrains Mono">sales.csv → inode 29481</text>
        <rect x="20" y="100" width="160" height="20" rx="3" fill="#131a2b" stroke="#64748b" stroke-width="1"/>
        <text x="100" y="114" text-anchor="middle" fill="#64748b" font-size="9" font-family="JetBrains Mono">model.py  → inode 29482</text>
        <rect x="20" y="122" width="160" height="20" rx="3" fill="#131a2b" stroke="#64748b" stroke-width="1"/>
        <text x="100" y="136" text-anchor="middle" fill="#64748b" font-size="9" font-family="JetBrains Mono">config.yaml → inode 29483</text>
        <text x="100" y="150" text-anchor="middle" fill="#64748b" font-size="8" font-style="italic">Name → inode mapping</text>

        <!-- Arrow to inode -->
        <line x1="190" y1="88" x2="245" y2="88" stroke="#34d399" stroke-width="2" class="wf"/>
        <text x="218" y="80" text-anchor="middle" fill="#34d399" font-size="9">lookup</text>

        <!-- Inode -->
        <rect x="245" y="36" width="190" height="200" rx="8" fill="#1a1005" stroke="#fbbf24" stroke-width="2"/>
        <text x="340" y="56" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">Inode #29481</text>
        <text x="340" y="70" text-anchor="middle" fill="#fbbf24" font-size="8">sales.csv metadata</text>
        <text x="255" y="90" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Type:     regular file</text>
        <text x="255" y="108" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Size:     1,258,291,200</text>
        <text x="255" y="126" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Owner:    anuj (UID 1000)</text>
        <text x="255" y="144" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Perms:    644 (-rw-r--r--)</text>
        <text x="255" y="162" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Created:  2024-03-01</text>
        <text x="255" y="180" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Modified: 2024-03-09</text>
        <text x="255" y="198" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">Blocks:   [4021,4022,</text>
        <text x="255" y="214" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">           4023...9871]</text>
        <text x="340" y="232" text-anchor="middle" fill="#64748b" font-size="8" font-style="italic">Filename NOT stored here!</text>

        <!-- Arrow to data blocks -->
        <line x1="435" y1="206" x2="490" y2="206" stroke="#fbbf24" stroke-width="2" class="wf"/>
        <text x="462" y="198" text-anchor="middle" fill="#fbbf24" font-size="9">points to</text>

        <!-- Data blocks -->
        <rect x="490" y="36" width="220" height="236" rx="8" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="600" y="56" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">Disk Data Blocks</text>
        <text x="600" y="70" text-anchor="middle" fill="#64748b" font-size="8">Actual file content</text>

        <rect x="500" y="80" width="90" height="36" rx="4" fill="#182035" stroke="#22d3ee" stroke-width="1" class="bf"/>
        <text x="545" y="100" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Block 4021</text>
        <text x="545" y="112" text-anchor="middle" fill="#64748b" font-size="7">date,sales,...</text>

        <rect x="602" y="80" width="90" height="36" rx="4" fill="#182035" stroke="#22d3ee" stroke-width="1" class="bf"/>
        <text x="647" y="100" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Block 4022</text>
        <text x="647" y="112" text-anchor="middle" fill="#64748b" font-size="7">2024-01-01...</text>

        <rect x="500" y="122" width="90" height="36" rx="4" fill="#182035" stroke="#22d3ee" stroke-width="1" class="bf"/>
        <text x="545" y="142" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Block 4023</text>

        <rect x="602" y="122" width="90" height="36" rx="4" fill="#182035" stroke="#22d3ee" stroke-width="1" class="bf"/>
        <text x="647" y="142" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Block 4024</text>

        <text x="600" y="186" text-anchor="middle" fill="#64748b" font-size="8">... 307,190 more blocks ...</text>
        <text x="600" y="204" text-anchor="middle" fill="#fbbf24" font-size="8" font-family="JetBrains Mono">Block 9871 (last)</text>
        <rect x="500" y="210" width="192" height="28" rx="4" fill="#182035" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="596" y="228" text-anchor="middle" fill="#fbbf24" font-size="8">Each block = 4096 bytes (4KB)</text>
        <text x="600" y="258" text-anchor="middle" fill="#64748b" font-size="8">1.2GB file = ~307,200 blocks</text>

        <!-- Page cache note -->
        <rect x="10" y="280" width="700" height="64" rx="8" fill="#0d1f0d" stroke="#34d399" stroke-width="1.5"/>
        <text x="360" y="300" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="Space Grotesk">Page Cache — Linux Keeps Recently Read Files in RAM</text>
        <text x="360" y="320" text-anchor="middle" fill="#94a3b8" font-size="10">First read: disk → RAM → program (SLOW: ~10ms)</text>
        <text x="360" y="336" text-anchor="middle" fill="#34d399" font-size="10">Second read: RAM → program (FAST: ~0.0001ms) — 100,000x faster!</text>
    </svg>
    <div class="caption">A filename is just a label. The inode is the real file identity — it stores all metadata. Directories map names to inodes. This is why renaming a file is instant — only the directory entry changes, no data moves.</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">filesystem_internals.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ═══ See inode numbers ═══</span>
<span class="prompt">$</span> ls -i /home/anuj/data/
<span class="output">29481 sales.csv   29482 model.py   29483 config.yaml</span>
<span class="comment"># 29481 is the inode number for sales.csv</span>

<span class="comment"># ═══ See ALL inode metadata ═══</span>
<span class="prompt">$</span> stat sales.csv
<span class="output">  File: sales.csv</span>
<span class="output">  Size: 1258291200       Blocks: 2457600    IO Block: 4096</span>
<span class="output">Device: 802h/2050d       Inode: 29481       Links: 1</span>
<span class="output">Access: (0644/-rw-r--r--)  Uid: (1000/anuj)   Gid: (1000/anuj)</span>
<span class="output">Access: 2024-03-09 10:30:00</span>
<span class="output">Modify: 2024-03-08 14:22:00    ← data last changed</span>
<span class="output">Change: 2024-03-08 14:22:00    ← inode last changed (metadata)</span>

<span class="comment"># ═══ Why mv within same disk is INSTANT ═══</span>
<span class="prompt">$</span> time mv sales.csv sales_backup.csv  <span class="comment"># Rename 1.2GB file</span>
<span class="output">real  0m0.001s   ← 1 millisecond! Not 10+ seconds!</span>
<span class="comment"># Only changes directory entry: "sales.csv" → "sales_backup.csv"</span>
<span class="comment"># Inode 29481 unchanged. Data blocks unchanged. Just the label changed.</span>

<span class="comment"># ═══ Hard links — two names, one inode ═══</span>
<span class="prompt">$</span> ln sales.csv sales_link.csv       <span class="comment"># Create hard link</span>
<span class="prompt">$</span> ls -i sales.csv sales_link.csv
<span class="output">29481 sales.csv    29481 sales_link.csv    ← SAME inode!</span>
<span class="comment"># Both names point to same inode = same data, same permissions</span>
<span class="comment"># Deleting either one doesn't delete data until link count = 0</span>

<span class="comment"># ═══ Filesystem types ═══</span>
<span class="prompt">$</span> df -T
<span class="output">Filesystem  Type     1K-blocks     Used Available Use% Mounted on</span>
<span class="output">/dev/sda1   ext4     52428800  23068672  26738688  47% /</span>
<span class="output">/data       xfs     2147483648  838860800  1258291200  40% /data</span>
<span class="comment"># ext4 = standard Linux filesystem (journaling, reliable)</span>
<span class="comment"># xfs = high-performance (better for large files, used for data lakes)</span></div>
</div>

<div class="deep-dive-box">
    <h4>🔬 Journaling — How Your Files Survive a Power Cut</h4>
    <p>What happens when power cuts out while you're writing a 1GB file? Without protection, the file could be half-written, with the inode pointing to some valid blocks and some garbage. Modern filesystems like <strong>ext4 and XFS are journaling filesystems</strong>. Before making any change, they write their intention to a <strong>journal</strong> (a dedicated area of disk). If power fails mid-write, on reboot the OS reads the journal and either completes or reverses the operation — no corrupted files. Think of it like database transactions, but for the filesystem itself.</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════════════════
        // SECTION 5 — System Calls: The Bridge
        // ══════════════════════════════════════════════════════════════════
        {
            id: "system_calls",
            content: `
<h3>📞 System Calls — The Bridge Between Programs and the OS</h3>

<div class="story-box">
    <h4>🏦 The Bank Teller Analogy</h4>
    <p>You cannot walk into a bank vault and take your money directly — the vault is secured, and only authorized bank staff can access it. Instead, you fill out a form (your request), hand it to a teller (the system call interface), the teller validates your identity and permissions, enters the secured area, performs the operation, and hands you the result. The separation exists for security — everyone gets access only through the proper channel.</p>
    <p>In Linux: your program (the customer) cannot directly access hardware (the vault). It must go through a system call (the teller window) — a formal, validated request to the kernel, which alone has the keys.</p>
</div>

<h4>📖 System Call Terminology</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>📡 System Call (syscall)</h5>
        <p>A <strong>controlled entry point from user space into kernel space</strong>. The CPU switches from Ring 3 to Ring 0, the kernel executes the requested operation, then switches back. Linux has ~300+ system calls: open, read, write, close, fork, exec, mmap, socket, etc.</p>
    </div>
    <div class="mini-card">
        <h5>📚 C Library (libc/glibc)</h5>
        <p>A <strong>wrapper library that hides raw system call complexity</strong>. You call <code>fopen()</code> in C or <code>open()</code> in Python — these call the C library, which formats arguments correctly and invokes the actual <code>sys_open</code> system call. The library handles error codes and portability.</p>
    </div>
    <div class="mini-card">
        <h5>🔄 Context Switch</h5>
        <p>The CPU operation of <strong>switching from user mode to kernel mode</strong> (or between processes). The CPU saves the current process's registers to memory, loads the kernel's state, executes kernel code, then restores everything. Each context switch takes ~1–10 microseconds.</p>
    </div>
    <div class="mini-card">
        <h5>🔢 Syscall Number</h5>
        <p>Every system call has a unique number. <code>read</code>=0, <code>write</code>=1, <code>open</code>=2, <code>close</code>=3... Your program puts the syscall number in a CPU register, then executes a special CPU instruction (<code>syscall</code> or <code>int 0x80</code>) to trigger the kernel.</p>
    </div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes callFlow { 0%{stroke-dashoffset:50} 100%{stroke-dashoffset:0} }
                @keyframes modeSwitch { 0%,100%{fill:#0a1520} 40%,60%{fill:#1e3a4a} }
                @keyframes stepAppear { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
                .cf{stroke-dasharray:8,4;animation:callFlow 1s linear infinite}
                .step1{animation:stepAppear 0.3s ease-out 0.1s both}
                .step2{animation:stepAppear 0.3s ease-out 0.4s both}
                .step3{animation:stepAppear 0.3s ease-out 0.7s both}
                .step4{animation:stepAppear 0.3s ease-out 1.0s both}
                .step5{animation:stepAppear 0.3s ease-out 1.3s both}
                .step6{animation:stepAppear 0.3s ease-out 1.6s both}
                .step7{animation:stepAppear 0.3s ease-out 1.9s both}
                .step8{animation:stepAppear 0.3s ease-out 2.2s both}
            </style>
        </defs>

        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">What Happens When Python Calls open("data.csv")</text>

        <!-- Left column: steps -->
        <rect x="10" y="36" width="320" height="372" rx="10" fill="#0a1520" stroke="#334155" stroke-width="1"/>
        <text x="170" y="58" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="Space Grotesk">Step-by-Step Call Chain</text>

        <!-- Steps -->
        <rect x="22" y="68" width="296" height="36" rx="6" fill="#0d1f0d" stroke="#34d399" stroke-width="1.5" class="step1"/>
        <text x="38" y="83" fill="#34d399" font-size="11" font-family="JetBrains Mono">1. Python code: open("data.csv")</text>
        <text x="38" y="97" fill="#64748b" font-size="9">Your Python script calls the built-in open()</text>

        <rect x="22" y="110" width="296" height="36" rx="6" fill="#0d1f0d" stroke="#22d3ee" stroke-width="1.5" class="step2"/>
        <text x="38" y="125" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">2. Python calls C: fopen()</text>
        <text x="38" y="139" fill="#64748b" font-size="9">Python's C extension wraps in C library</text>

        <rect x="22" y="152" width="296" height="36" rx="6" fill="#1a1a05" stroke="#fbbf24" stroke-width="2" class="step3"/>
        <text x="38" y="167" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">3. C lib: syscall(sys_open, path)</text>
        <text x="38" y="181" fill="#fbbf24" font-size="9">Puts args in registers, triggers syscall</text>

        <line x1="170" y1="188" x2="170" y2="208" stroke="#ef4444" stroke-width="3" class="cf"/>
        <rect x="22" y="208" width="296" height="36" rx="6" fill="#1a0505" stroke="#f87171" stroke-width="2.5" class="step4"/>
        <text x="38" y="223" fill="#f87171" font-size="11" font-weight="bold" font-family="JetBrains Mono">4. CPU: User → Kernel Mode</text>
        <text x="38" y="237" fill="#f87171" font-size="9">Hardware privilege switch (Ring 3 → Ring 0)</text>

        <rect x="22" y="250" width="296" height="36" rx="6" fill="#1a1005" stroke="#fbbf24" stroke-width="1.5" class="step5"/>
        <text x="38" y="265" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">5. Kernel: validate permissions</text>
        <text x="38" y="279" fill="#64748b" font-size="9">Does anuj own this file? Is it readable? (644 check)</text>

        <rect x="22" y="292" width="296" height="36" rx="6" fill="#1a1005" stroke="#fbbf24" stroke-width="1.5" class="step6"/>
        <text x="38" y="307" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">6. Kernel: find inode 29481</text>
        <text x="38" y="321" fill="#64748b" font-size="9">Looks up directory → inode → data block locations</text>

        <rect x="22" y="334" width="296" height="36" rx="6" fill="#0a1520" stroke="#a78bfa" stroke-width="1.5" class="step7"/>
        <text x="38" y="349" fill="#a78bfa" font-size="11" font-family="JetBrains Mono">7. Kernel: return file descriptor</text>
        <text x="38" y="363" fill="#64748b" font-size="9">Returns integer fd (e.g. 3) to process</text>

        <line x1="170" y1="370" x2="170" y2="390" stroke="#ef4444" stroke-width="3" class="cf"/>
        <rect x="22" y="376" width="296" height="24" rx="6" fill="#1a0505" stroke="#f87171" stroke-width="2.5" class="step8"/>
        <text x="38" y="391" fill="#f87171" font-size="10" font-weight="bold" font-family="JetBrains Mono">8. CPU: Kernel → User Mode (back)</text>

        <!-- Right column: visualization -->
        <rect x="350" y="36" width="360" height="372" rx="10" fill="#0a1520" stroke="#334155" stroke-width="1"/>
        <text x="530" y="58" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="Space Grotesk">Privilege Level Visualization</text>

        <!-- User space box -->
        <rect x="362" y="68" width="336" height="120" rx="8" fill="#0d1430" stroke="#a78bfa" stroke-width="2"/>
        <text x="530" y="86" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold">USER SPACE (Ring 3)</text>
        <text x="530" y="104" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">Your Python code lives here</text>
        <rect x="400" y="112" width="260" height="32" rx="5" fill="#1a1230" stroke="#a78bfa" stroke-width="1"/>
        <text x="530" y="128" text-anchor="middle" fill="#a78bfa" font-size="10" font-family="JetBrains Mono">open("data.csv", "r")</text>
        <text x="530" y="142" text-anchor="middle" fill="#64748b" font-size="9">↓ cannot touch hardware ↓</text>
        <text x="530" y="158" text-anchor="middle" fill="#64748b" font-size="9">↓ must cross boundary ↓</text>
        <text x="530" y="174" text-anchor="middle" fill="#64748b" font-size="9">↓ via system call ↓</text>

        <!-- Boundary -->
        <line x1="362" y1="200" x2="698" y2="200" stroke="#ef4444" stroke-width="3" stroke-dasharray="10,4"/>
        <text x="530" y="196" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold" font-family="JetBrains Mono">══ SYSCALL BOUNDARY (enforced by CPU hardware) ══</text>

        <!-- Kernel space box -->
        <rect x="362" y="208" width="336" height="188" rx="8" fill="#1a1005" stroke="#fbbf24" stroke-width="2"/>
        <text x="530" y="226" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">KERNEL SPACE (Ring 0)</text>
        <text x="530" y="244" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">Full hardware access</text>
        <rect x="375" y="252" width="130" height="30" rx="5" fill="#182035" stroke="#22d3ee" stroke-width="1"/>
        <text x="440" y="271" text-anchor="middle" fill="#22d3ee" font-size="9" font-family="JetBrains Mono">VFS Layer</text>
        <rect x="515" y="252" width="130" height="30" rx="5" fill="#1e1a05" stroke="#fbbf24" stroke-width="1"/>
        <text x="580" y="271" text-anchor="middle" fill="#fbbf24" font-size="9" font-family="JetBrains Mono">Inode Cache</text>
        <rect x="375" y="292" width="130" height="30" rx="5" fill="#0d1f0d" stroke="#34d399" stroke-width="1"/>
        <text x="440" y="311" text-anchor="middle" fill="#34d399" font-size="9" font-family="JetBrains Mono">ext4 Driver</text>
        <rect x="515" y="292" width="130" height="30" rx="5" fill="#1a1230" stroke="#a78bfa" stroke-width="1"/>
        <text x="580" y="311" text-anchor="middle" fill="#a78bfa" font-size="9" font-family="JetBrains Mono">Page Cache</text>
        <rect x="425" y="332" width="210" height="30" rx="5" fill="#1a0505" stroke="#f87171" stroke-width="1"/>
        <text x="530" y="351" text-anchor="middle" fill="#f87171" font-size="9" font-family="JetBrains Mono">Block Device Driver (disk)</text>
        <text x="530" y="386" text-anchor="middle" fill="#64748b" font-size="9" font-style="italic">Returns: file descriptor integer (e.g. 3)</text>
    </svg>
    <div class="caption">Every single file operation, network connection, memory allocation — everything your program does goes through this boundary crossing. The kernel validates, executes, and returns results to user space.</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">tracing_syscalls.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># strace — watch EVERY system call a program makes</span>
<span class="prompt">$</span> strace python3 -c "f = open('test.txt', 'w'); f.write('hello'); f.close()"
<span class="output">execve("/usr/bin/python3", ["python3", "-c", ...], ...)  = 0</span>
<span class="output">... (many init syscalls) ...</span>
<span class="output">openat(AT_FDCWD, "test.txt", O_WRONLY|O_CREAT|O_TRUNC, 0666) = 3</span>
<span class="comment"># ↑ kernel opened test.txt, returned fd=3</span>
<span class="output">write(3, "hello", 5)             = 5</span>
<span class="comment"># ↑ kernel wrote 5 bytes to fd=3</span>
<span class="output">close(3)                         = 0</span>
<span class="comment"># ↑ kernel closed fd=3</span>

<span class="comment"># Count how many syscalls a program makes</span>
<span class="prompt">$</span> strace -c python3 -c "print('hello')" 2>&1 | tail -15
<span class="output">% time     seconds  usecs/call     calls    errors syscall</span>
<span class="output"> 35.21    0.002341          19       124           mmap</span>
<span class="output"> 21.45    0.001426          20        71           read</span>
<span class="output"> 15.32    0.001018          25        41           openat</span>
<span class="output">  8.91    0.000592          14        42           close</span>
<span class="comment"># Just printing "hello" makes 400+ system calls!</span>
<span class="comment"># Python startup alone (importing modules) is expensive</span></div>
</div>
`
        },

        // ══════════════════════════════════════════════════════════════════
        // SECTION 6 — Device Management & Drivers
        // ══════════════════════════════════════════════════════════════════
        {
            id: "device_management",
            content: `
<h3>🔌 Device Management — How the OS Talks to Hardware</h3>

<div class="story-box">
    <h4>🌍 The Universal Translator</h4>
    <p>Your hard drive speaks SATA protocol. Your GPU speaks PCIe. Your keyboard speaks USB HID. Your NIC speaks Ethernet. These are all completely different "languages." Without a translation layer, you'd need a different operating system for every hardware combination. Instead, the OS uses <strong>device drivers</strong> — dedicated translators that know one hardware protocol — plus a unified interface so all programs talk to devices the same way regardless of the underlying hardware.</p>
</div>

<div class="cards-grid">
    <div class="mini-card">
        <h5>🔧 Device Driver</h5>
        <p>A software module that <strong>knows how to communicate with specific hardware</strong>. Runs in kernel space. There's one driver per hardware model. The OS kernel provides a driver API that all drivers must implement — so applications use drivers uniformly without knowing hardware details.</p>
    </div>
    <div class="mini-card">
        <h5>🔔 Interrupt</h5>
        <p>A <strong>signal from hardware to the CPU</strong> saying "I need attention!" When your keyboard key is pressed, it sends an interrupt. The CPU pauses what it's doing, runs the interrupt handler (part of the kernel), then resumes. This is how hardware communicates asynchronously with the OS.</p>
    </div>
    <div class="mini-card">
        <h5>📁 Everything is a File</h5>
        <p>Linux's radical design: <strong>every device appears as a file</strong> in <code>/dev/</code>. Your disk is <code>/dev/sda</code>. Your terminal is <code>/dev/pts/0</code>. <code>/dev/null</code> discards everything you write to it. <code>/dev/random</code> generates random bytes. This unified interface means programs don't need special device code.</p>
    </div>
    <div class="mini-card">
        <h5>🚌 Device Bus</h5>
        <p>The physical/logical pathway connecting devices to the CPU. <strong>PCIe</strong> (GPU, NVMe SSD), <strong>USB</strong> (keyboard, mouse, external drives), <strong>SATA</strong> (traditional hard drives). The OS enumerates all connected devices on boot via these buses.</p>
    </div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">device_exploration.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ═══ Everything is a file in /dev ═══</span>
<span class="prompt">$</span> ls -la /dev/ | head -20
<span class="output">crw-rw-rw-  1 root tty   5, 0 /dev/tty       ← your terminal (character device)</span>
<span class="output">brw-rw----  1 root disk  8, 0 /dev/sda       ← first hard disk (block device)</span>
<span class="output">brw-rw----  1 root disk  8, 1 /dev/sda1      ← first partition</span>
<span class="output">crw-rw-rw-  1 root root  1, 3 /dev/null      ← the black hole</span>
<span class="output">crw-rw-rw-  1 root root  1, 8 /dev/random    ← entropy source</span>
<span class="output">crw-rw-rw-  1 root root  1, 9 /dev/urandom   ← non-blocking random</span>
<span class="comment"># 'b' = block device (disk: random access)  'c' = character device (stream)</span>

<span class="comment"># ═══ Practical /dev usage ═══</span>
<span class="prompt">$</span> echo "discard this output" > /dev/null   <span class="comment"># /dev/null = discard</span>
<span class="prompt">$</span> command 2>/dev/null                      <span class="comment"># Suppress error messages</span>

<span class="prompt">$</span> cat /dev/urandom | head -c 32 | base64   <span class="comment"># Generate random bytes</span>
<span class="output">qK9mP2bX7yL3nV8wZ5cR1eF4hJ6tG0=</span>
<span class="comment"># Used for: passwords, tokens, session keys, encryption</span>

<span class="comment"># ═══ Disk information ═══</span>
<span class="prompt">$</span> lsblk                                    <span class="comment"># List block devices</span>
<span class="output">NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT</span>
<span class="output">sda      8:0    0    50G  0 disk</span>
<span class="output">sda1     8:1    0    50G  0 part /</span>
<span class="output">sdb      8:16   0     2T  0 disk</span>
<span class="output">sdb1     8:17   0     2T  0 part /data</span>

<span class="prompt">$</span> lspci | grep -i "vga\|nvidia\|amd"        <span class="comment"># Find GPU</span>
<span class="output">0000:00:02.0 VGA compatible controller: Intel UHD 630</span>

<span class="prompt">$</span> lsusb                                     <span class="comment"># List USB devices</span>
<span class="output">Bus 002 Device 003: ID 046d:c52b Logitech Wireless Mouse</span>

<span class="comment"># ═══ Loaded kernel drivers ═══</span>
<span class="prompt">$</span> lsmod | head -15                           <span class="comment"># List loaded kernel modules (drivers)</span>
<span class="output">Module                  Size  Used by</span>
<span class="output">ext4                  729088  2         ← filesystem driver</span>
<span class="output">e1000e                245760  0         ← Intel NIC driver</span>
<span class="output">i915                 2420736  7         ← Intel GPU driver</span>

<span class="prompt">$</span> dmesg | grep -i "usb\|disk\|error" | tail -20   <span class="comment"># Hardware event log</span></div>
</div>

<div class="info-box">
    <h4>💡 Why /dev/null Is Your Best Friend in Scripts</h4>
    <p><code>/dev/null</code> is a special device that accepts any data and silently discards it — like a black hole. Use <code>command 2>/dev/null</code> to suppress error messages. Use <code>command > /dev/null 2>&1</code> to discard ALL output (stdout and stderr). This is used constantly in scripts and cron jobs when you want a command to run silently. <code>/dev/zero</code> outputs infinite zero bytes — used to create test files: <code>dd if=/dev/zero of=testfile bs=1M count=1024</code> creates a 1GB file of zeros instantly.</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════════════════
        // SECTION 7 — The Boot Process
        // ══════════════════════════════════════════════════════════════════
        {
            id: "boot_process",
            content: `
<h3>🚀 The Boot Process — From Power Button to Your Shell</h3>

<div class="story-box">
    <h4>🌅 The Morning Startup Routine</h4>
    <p>Think of booting like opening a restaurant in the morning. Before the first customer arrives: the owner arrives (BIOS/UEFI), checks all equipment works (POST), unlocks the building (bootloader), turns on the kitchen (kernel init), calls in the staff (systemd starts services), and finally opens the door to customers (login prompt appears). Each step depends on the previous one. If the kitchen fails to start, you can't serve customers — just like if the kernel crashes during boot, you never get a login prompt.</p>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 520" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes bootStep  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
                @keyframes bootPulse { 0%,100%{stroke-width:2} 50%{stroke-width:4} }
                .bs1{animation:bootStep 0.5s ease-out 0.1s both}
                .bs2{animation:bootStep 0.5s ease-out 0.5s both}
                .bs3{animation:bootStep 0.5s ease-out 0.9s both}
                .bs4{animation:bootStep 0.5s ease-out 1.3s both}
                .bs5{animation:bootStep 0.5s ease-out 1.7s both}
                .bs6{animation:bootStep 0.5s ease-out 2.1s both}
                .bs7{animation:bootStep 0.5s ease-out 2.5s both}
                .bp{animation:bootPulse 2s ease-in-out infinite}
            </style>
        </defs>

        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="Space Grotesk">Linux Boot Sequence — Power Button to Shell</text>

        <!-- Timeline line -->
        <line x1="100" y1="52" x2="100" y2="490" stroke="#334155" stroke-width="2"/>

        <!-- Step 1: Power On -->
        <circle cx="100" cy="70" r="14" fill="#1a1005" stroke="#fbbf24" stroke-width="2.5" class="bs1"/>
        <text x="100" y="75" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">1</text>
        <rect x="124" y="46" width="574" height="52" rx="8" fill="#1a1005" stroke="#fbbf24" stroke-width="2" class="bs1"/>
        <text x="144" y="68" fill="#fbbf24" font-size="13" font-weight="bold" font-family="Space Grotesk">POWER ON — Electricity Flows</text>
        <text x="144" y="86" fill="#94a3b8" font-size="10">CPU jumps to a hardwired address in ROM where BIOS/UEFI code lives. Every PC does this.</text>

        <!-- Step 2: BIOS/UEFI -->
        <circle cx="100" cy="128" r="14" fill="#0a1520" stroke="#22d3ee" stroke-width="2.5" class="bs2"/>
        <text x="100" y="133" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold">2</text>
        <rect x="124" y="104" width="574" height="64" rx="8" fill="#0a1520" stroke="#22d3ee" stroke-width="2" class="bs2"/>
        <text x="144" y="124" fill="#22d3ee" font-size="13" font-weight="bold" font-family="Space Grotesk">BIOS / UEFI — Hardware Self-Test (POST)</text>
        <text x="144" y="140" fill="#94a3b8" font-size="10">Tests RAM, CPU, storage. Detects all hardware. Finds bootable device (disk with boot flag).</text>
        <text x="144" y="156" fill="#64748b" font-size="9">UEFI is modern BIOS — supports larger disks, faster boot, Secure Boot, GUI interface.</text>

        <!-- Step 3: Bootloader -->
        <circle cx="100" cy="200" r="14" fill="#0a1520" stroke="#a78bfa" stroke-width="2.5" class="bs3"/>
        <text x="100" y="205" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold">3</text>
        <rect x="124" y="176" width="574" height="64" rx="8" fill="#0a1520" stroke="#a78bfa" stroke-width="2" class="bs3"/>
        <text x="144" y="196" fill="#a78bfa" font-size="13" font-weight="bold" font-family="Space Grotesk">BOOTLOADER — GRUB2 Loads the Kernel</text>
        <text x="144" y="212" fill="#94a3b8" font-size="10">GRUB reads /boot/grub/grub.cfg, shows OS selection menu (if dual-boot), loads kernel</text>
        <text x="144" y="228" fill="#64748b" font-size="9">file (/boot/vmlinuz) and initial RAM disk (/boot/initrd) into memory. Then hands control to kernel.</text>

        <!-- Step 4: Kernel Init -->
        <circle cx="100" cy="278" r="14" fill="#1a1005" stroke="#f87171" stroke-width="2.5" class="bs4 bp"/>
        <text x="100" y="283" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">4</text>
        <rect x="124" y="254" width="574" height="72" rx="8" fill="#1a1005" stroke="#f87171" stroke-width="2.5" class="bs4"/>
        <text x="144" y="274" fill="#f87171" font-size="13" font-weight="bold" font-family="Space Grotesk">KERNEL INITIALIZATION — The OS Core Wakes Up</text>
        <text x="144" y="290" fill="#94a3b8" font-size="10">Kernel decompresses itself, detects CPU/RAM, initializes memory management and scheduler,</text>
        <text x="144" y="306" fill="#94a3b8" font-size="10">loads device drivers, mounts the root filesystem (/) — your entire Linux tree becomes accessible.</text>
        <text x="144" y="320" fill="#64748b" font-size="9">This is where kernel messages appear: [    0.000000] Linux version 5.15.0...</text>

        <!-- Step 5: systemd -->
        <circle cx="100" cy="366" r="14" fill="#0a1520" stroke="#34d399" stroke-width="2.5" class="bs5"/>
        <text x="100" y="371" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">5</text>
        <rect x="124" y="342" width="574" height="64" rx="8" fill="#0a1520" stroke="#34d399" stroke-width="2" class="bs5"/>
        <text x="144" y="362" fill="#34d399" font-size="13" font-weight="bold" font-family="Space Grotesk">systemd (PID 1) — Starts All Services</text>
        <text x="144" y="378" fill="#94a3b8" font-size="10">Kernel runs /sbin/init (always PID 1). systemd reads unit files, starts services in parallel:</text>
        <text x="144" y="394" fill="#64748b" font-size="9">networking, SSH daemon, logging, cron, database servers, web servers, etc. Sets hostname, mounts filesystems.</text>

        <!-- Step 6: Services -->
        <circle cx="100" cy="444" r="14" fill="#0a1520" stroke="#fb923c" stroke-width="2.5" class="bs6"/>
        <text x="100" y="449" text-anchor="middle" fill="#fb923c" font-size="11" font-weight="bold">6</text>
        <rect x="124" y="420" width="574" height="52" rx="8" fill="#0a1520" stroke="#fb923c" stroke-width="2" class="bs6"/>
        <text x="144" y="440" fill="#fb923c" font-size="13" font-weight="bold" font-family="Space Grotesk">Login Prompt / Shell — YOU Take Control</text>
        <text x="144" y="456" fill="#94a3b8" font-size="10">SSH login creates a new bash process. Console shows login: prompt. Your session begins.</text>
        <text x="144" y="468" fill="#64748b" font-size="9">Total time: ~5-30 seconds (modern SSD) | Your bash PID ~ 1200+, kernel was PID 1.</text>

        <!-- Time indicators -->
        <text x="68" y="70"  text-anchor="end" fill="#64748b" font-size="8">0s</text>
        <text x="68" y="128" text-anchor="end" fill="#64748b" font-size="8">1s</text>
        <text x="68" y="200" text-anchor="end" fill="#64748b" font-size="8">3s</text>
        <text x="68" y="278" text-anchor="end" fill="#64748b" font-size="8">5s</text>
        <text x="68" y="366" text-anchor="end" fill="#64748b" font-size="8">8s</text>
        <text x="68" y="444" text-anchor="end" fill="#34d399" font-size="8">15s</text>
    </svg>
    <div class="caption">Boot is a strict dependency chain — each stage depends on the previous completing successfully. A failure at any stage stops the boot process at that point.</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">boot_investigation.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ═══ See kernel boot messages ═══</span>
<span class="prompt">$</span> dmesg | head -30
<span class="output">[    0.000000] Linux version 5.15.0-91-generic (Ubuntu)</span>
<span class="output">[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15 root=/dev/sda1</span>
<span class="output">[    0.008000] BIOS-provided physical RAM map:</span>
<span class="output">[    0.162000] PCI: Using configuration type 1 for base access</span>
<span class="output">[    1.204000] EXT4-fs (sda1): mounted filesystem</span>
<span class="comment"># Timestamps in brackets = seconds since kernel started</span>

<span class="comment"># ═══ systemd service status ═══</span>
<span class="prompt">$</span> systemctl status sshd
<span class="output">● ssh.service - OpenBSD Secure Shell server</span>
<span class="output">     Loaded: loaded (/lib/systemd/system/ssh.service)</span>
<span class="output">     Active: active (running) since 2024-03-09 08:00:12; 2h 47min ago</span>
<span class="output">   Main PID: 892 (sshd)</span>

<span class="prompt">$</span> systemctl list-units --type=service --state=running | head -15
<span class="comment"># Shows all currently running services</span>

<span class="comment"># ═══ Boot timing analysis ═══</span>
<span class="prompt">$</span> systemd-analyze
<span class="output">Startup finished in 3.204s (kernel) + 8.721s (userspace) = 11.925s</span>

<span class="prompt">$</span> systemd-analyze blame | head -10     <span class="comment"># Which services took longest</span>
<span class="output">4.512s apt-daily.service</span>
<span class="output">2.104s networkd-dispatcher.service</span>
<span class="output">1.821s snapd.service</span>

<span class="comment"># ═══ How long has this machine been running? ═══</span>
<span class="prompt">$</span> uptime -p
<span class="output">up 10 days, 2 hours, 47 minutes</span>
<span class="prompt">$</span> who -b
<span class="output">         system boot  2024-02-28 08:00</span></div>
</div>
`
        },

        // ══════════════════════════════════════════════════════════════════
        // SECTION 8 — Linux Kernel Specifically
        // ══════════════════════════════════════════════════════════════════
        {
            id: "linux_kernel",
            content: `
<h3>🐧 The Linux Kernel — What Makes Linux, Linux</h3>

<div class="story-box">
    <h4>🧩 Linux Is Just the Kernel — Not the Whole OS</h4>
    <p>This surprises most beginners: Linux is the name of the <strong>kernel only</strong> — written by Linus Torvalds in 1991. The operating system you use is technically "GNU/Linux" — GNU tools (bash, gcc, ls, cat, grep, awk — written by Richard Stallman's GNU Project since 1983) + the Linux kernel + a desktop environment or distribution. When you use Ubuntu, you're using: Linux kernel + GNU tools + Ubuntu's package manager (apt) + GNOME desktop + Ubuntu's branding and defaults. The kernel is about 30 million lines of code managing every piece of hardware.</p>
</div>

<div class="cards-grid">
    <div class="mini-card">
        <h5>🏗️ Monolithic Kernel</h5>
        <p>Linux is a <strong>monolithic kernel</strong> — all OS services (memory, process, filesystem, networking, device drivers) run in a single large program in kernel space. Fast because no communication overhead. Risky because a buggy driver crashes the entire kernel. Contrast: microkernel (Minix, L4) puts services in user space.</p>
    </div>
    <div class="mini-card">
        <h5>📦 Kernel Modules</h5>
        <p>Linux supports <strong>loadable kernel modules (LKM)</strong> — pieces of kernel code that can be loaded/unloaded at runtime without rebooting. Device drivers, filesystems, and network protocols are often modules. <code>lsmod</code> lists loaded modules. <code>insmod</code>/<code>rmmod</code> load/unload them.</p>
    </div>
    <div class="mini-card">
        <h5>🌐 Open Source</h5>
        <p>The Linux kernel is <strong>licensed under GPL v2</strong> — anyone can read, modify, and distribute the source code. Every year, 4000+ developers from companies like Google, Intel, Red Hat, and IBM contribute code. The kernel.org website hosts the official source.</p>
    </div>
    <div class="mini-card">
        <h5>📊 Linux vs Kernel Version</h5>
        <p>Your Ubuntu 22.04 runs Linux kernel 5.15. Ubuntu 24.04 runs 6.8. The kernel version is separate from the distro version. <code>uname -r</code> shows your kernel version. Kernel updates bring new hardware support and security fixes without changing your applications.</p>
    </div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">linux_kernel_exploration.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ═══ Kernel information ═══</span>
<span class="prompt">$</span> uname -a
<span class="output">Linux ubuntu-prod-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux</span>
<span class="comment"># Linux = kernel name | 5.15.0-91-generic = version | x86_64 = architecture</span>

<span class="prompt">$</span> uname -r               <span class="comment"># Just kernel version</span>
<span class="output">5.15.0-91-generic</span>

<span class="prompt">$</span> uname -m               <span class="comment"># Machine hardware</span>
<span class="output">x86_64                   ← 64-bit Intel/AMD</span>

<span class="comment"># ═══ Kernel modules ═══</span>
<span class="prompt">$</span> lsmod | head -10
<span class="output">Module                  Size  Used by</span>
<span class="output">ext4                  729088  2</span>
<span class="output">mbcache                16384  1 ext4</span>
<span class="output">jbd2                  163840  1 ext4</span>
<span class="output">e1000e                245760  0         ← Intel NIC driver (loaded)</span>

<span class="prompt">$</span> modinfo ext4 | head -10
<span class="output">filename: /lib/modules/5.15.0-91-generic/kernel/fs/ext4/ext4.ko</span>
<span class="output">description: Fourth Extended Filesystem</span>
<span class="output">author:      Remy Card, Stephen Tweedie, Andrew Morton...</span>
<span class="output">license:     GPL</span>

<span class="comment"># ═══ Kernel parameters (tunable) ═══</span>
<span class="prompt">$</span> sysctl -a | grep "vm.swappiness"
<span class="output">vm.swappiness = 60</span>
<span class="comment"># swappiness: 0=avoid swap  60=default  100=swap aggressively</span>
<span class="comment"># For data engineering servers: lower is usually better</span>
<span class="prompt">$</span> sudo sysctl -w vm.swappiness=10    <span class="comment"># Reduce swapping for Spark workloads</span>

<span class="prompt">$</span> sysctl net.core.somaxconn          <span class="comment"># Max network connection queue</span>
<span class="output">net.core.somaxconn = 4096</span>
<span class="comment"># High-traffic Kafka/web servers often need: sysctl -w net.core.somaxconn=65535</span>

<span class="comment"># ═══ Linux vs GNU ═══</span>
<span class="prompt">$</span> ls --version | head -2
<span class="output">ls (GNU coreutils) 8.32</span>
<span class="comment"># ls is GNU! The kernel provides the file API, GNU tools use it</span>

<span class="prompt">$</span> bash --version | head -2
<span class="output">GNU bash, version 5.1.16(1)-release</span>
<span class="comment"># bash is GNU! Your shell = GNU bash + Linux kernel system calls</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">What "Ubuntu Linux" Actually Is — Layers of Components</text>

        <!-- Layers stacked -->
        <rect x="10"  y="36"  width="700" height="36" rx="6" fill="#0a0a1a" stroke="#a78bfa" stroke-width="2"/>
        <text x="360" y="60" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold" font-family="Space Grotesk">Ubuntu Packaging, apt, GNOME Desktop, Ubuntu Branding</text>

        <rect x="10"  y="76"  width="700" height="36" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="360" y="100" text-anchor="middle" fill="#22d3ee" font-size="12" font-weight="bold" font-family="Space Grotesk">Applications: Python, Spark, Chrome, VS Code, Airflow...</text>

        <rect x="10"  y="116" width="700" height="36" rx="6" fill="#0d1f0d" stroke="#34d399" stroke-width="2"/>
        <text x="360" y="140" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="Space Grotesk">GNU Tools: bash, ls, cat, grep, awk, sed, gcc, glibc...</text>

        <rect x="10"  y="156" width="700" height="48" rx="6" fill="#1a1005" stroke="#fbbf24" stroke-width="2.5"/>
        <text x="360" y="178" text-anchor="middle" fill="#fbbf24" font-size="14" font-weight="bold" font-family="Space Grotesk">Linux Kernel (Linus Torvalds, 1991) — The OS Core</text>
        <text x="360" y="196" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">Process · Memory · Filesystem · Networking · Device Drivers · Security</text>

        <rect x="10"  y="208" width="700" height="36" rx="6" fill="#1a0505" stroke="#f87171" stroke-width="2"/>
        <text x="360" y="232" text-anchor="middle" fill="#f87171" font-size="12" font-weight="bold" font-family="Space Grotesk">Hardware: CPU · RAM · Disk · GPU · Network · USB...</text>

        <!-- Labels -->
        <text x="718" y="58"  text-anchor="end" fill="#64748b" font-size="8">Distro</text>
        <text x="718" y="100" text-anchor="end" fill="#64748b" font-size="8">Apps</text>
        <text x="718" y="140" text-anchor="end" fill="#34d399" font-size="8">GNU</text>
        <text x="718" y="182" text-anchor="end" fill="#fbbf24" font-size="8">Kernel</text>
        <text x="718" y="232" text-anchor="end" fill="#64748b" font-size="8">HW</text>

        <text x="360" y="258" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">When someone says "Linux," they usually mean the full stack. Technically, Linux is just the kernel layer.</text>
    </svg>
</div>
`
        },

        // ══════════════════════════════════════════════════════════════════
        // SECTION 9 — OS and Data Engineering
        // ══════════════════════════════════════════════════════════════════
        {
            id: "os_data_engineering",
            content: `
<h3>🏭 OS Knowledge for Data Engineers — Why This Matters Daily</h3>

<div class="story-box">
    <h4>🔧 Every Performance Problem Traces to the OS</h4>
    <p>When your Spark job is slow, the cause is CPU scheduling, memory pressure, or disk I/O — all OS responsibilities. When your Python script crashes, it's OOM Killer, file descriptor limits, or permission errors — all OS concepts. When your Kafka consumer lags, it's socket buffer sizes and interrupt handling — OS tuning. Understanding the OS isn't theory — it's the diagnostic toolkit for every real-world problem you'll face as a data engineer.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">data_engineer_os_toolkit.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ═══ SCENARIO 1: Spark Job Running Slow ═══</span>
<span class="comment"># OS DIAGNOSIS: Check CPU, memory, and I/O bottlenecks</span>

<span class="prompt">$</span> top -b -n 1 | head -20
<span class="comment"># %us = user CPU  %sy = kernel CPU  %wa = waiting on I/O (BAD if high)</span>
<span class="output">%Cpu(s): 12.5 us,  2.1 sy,  0.0 ni, 45.4 id, 39.8 wa,  0.0 hi</span>
<span class="comment"># 39.8% wa = waiting for disk I/O — your disk is the bottleneck!</span>

<span class="prompt">$</span> free -h
<span class="output">              total    used    free   buff/cache  available</span>
<span class="output">Mem:           15Gi   14Gi   128Mi   800Mi      512Mi</span>
<span class="comment"># Only 512Mi available! Spark is memory-starved → heavy swapping</span>

<span class="prompt">$</span> vmstat 2 5    <span class="comment"># Memory/swap/IO stats every 2 seconds, 5 times</span>
<span class="output">procs -----------memory---------- ---swap-- -----io---- -system--</span>
<span class="output"> r  b  swpd   free  buff  cache  si  so    bi    bo  in  cs</span>
<span class="output"> 2  4  512000  64000  12000  400000  200  400  8000  4000  1200  3000</span>
<span class="comment"># si=200, so=400 = heavy swap in/out = performance disaster</span>
<span class="comment"># Fix: reduce Spark executor memory, add nodes, get more RAM</span>

<span class="comment"># ═══ SCENARIO 2: Process Dies Unexpectedly ═══</span>
<span class="prompt">$</span> dmesg | grep -i "oom\|killed" | tail -5
<span class="output">Out of memory: Kill process 8421 (java) score 873 or sacrifice child</span>
<span class="output">Killed process 8421 (java) total-vm:12582912kB anon-rss:8388608kB</span>
<span class="comment"># OOM Killer struck! Spark executor used 8GB, OS had no choice</span>
<span class="comment"># Fix: add --conf spark.executor.memory=4g to limit per-executor RAM</span>

<span class="comment"># ═══ SCENARIO 3: Too Many Open Files Error ═══</span>
<span class="prompt">$</span> ulimit -n              <span class="comment"># Max file descriptors per process</span>
<span class="output">1024</span>
<span class="comment"># Python opens 1 fd per network connection + files</span>
<span class="comment"># With 1024 limit, high-concurrency apps fail!</span>
<span class="prompt">$</span> ulimit -n 65536         <span class="comment"># Increase for current session</span>
<span class="prompt">$</span> cat /proc/sys/fs/file-max  <span class="comment"># System-wide max</span>
<span class="output">9223372036854775807</span>

<span class="comment"># ═══ SCENARIO 4: CPU Affinity for Spark ═══</span>
<span class="prompt">$</span> nproc                   <span class="comment"># How many CPU cores?</span>
<span class="output">16</span>
<span class="prompt">$</span> cat /proc/cpuinfo | grep "cpu MHz" | sort -t: -k2 -rn | head -4
<span class="output">cpu MHz : 3400.000      ← max frequency (not throttled)</span>

<span class="comment"># ═══ SCENARIO 5: Disk I/O profiling ═══</span>
<span class="prompt">$</span> iostat -x 2 3           <span class="comment"># Extended disk I/O stats</span>
<span class="output">Device  rrqm/s  wrqm/s  r/s   w/s  rMB/s  wMB/s  await  util</span>
<span class="output">sda       0.0    12.5  142.0  48.0  1.1    0.4   125.3  98.5%</span>
<span class="comment"># util=98.5% = disk nearly saturated! r=142 IOPS w=48 IOPS</span>
<span class="comment"># Fix: use SSD, move to /data partition, use columnar formats (Parquet)</span>

<span class="comment"># ═══ SCENARIO 6: Find what's holding a file open ═══</span>
<span class="prompt">$</span> lsof /data/warehouse/sales.parquet
<span class="output">COMMAND  PID  USER  FD  TYPE  SIZE/OFF  NAME</span>
<span class="output">java    8421  anuj   12r  REG  1073741824  /data/warehouse/sales.parquet</span>
<span class="comment"># java process 8421 has the file open for reading (12r)</span>
<span class="comment"># Can't delete/overwrite it until this process closes it</span>

<span class="comment"># ═══ SCENARIO 7: Network connection investigation ═══</span>
<span class="prompt">$</span> ss -tuln | grep -E "8080|5432|9092"
<span class="output">tcp  LISTEN  0  128  0.0.0.0:5432   0.0.0.0:*    ← PostgreSQL listening</span>
<span class="output">tcp  LISTEN  0  128  0.0.0.0:9092   0.0.0.0:*    ← Kafka listening</span>
<span class="comment"># Services are up and listening. Network ok.</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">OS Concepts → Real Data Engineering Problems</text>

        <!-- 3 columns of mappings -->
        <rect x="10"  y="32" width="218" height="212" rx="8" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="119" y="52" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="Space Grotesk">OS Concept</text>
        <text x="22"  y="74" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Process Scheduling</text>
        <text x="22"  y="106" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Memory Management</text>
        <text x="22"  y="138" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">OOM Killer</text>
        <text x="22"  y="170" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Page Cache</text>
        <text x="22"  y="202" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">File Descriptors</text>
        <text x="22"  y="234" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Swap Space</text>

        <rect x="238" y="32" width="244" height="212" rx="8" fill="#1a1005" stroke="#fbbf24" stroke-width="2"/>
        <text x="360" y="52" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="Space Grotesk">Symptom You See</text>
        <text x="250" y="74" fill="#fbbf24" font-size="9">Spark job CPU 100% but slow output</text>
        <text x="250" y="106" fill="#fbbf24" font-size="9">Python script slowly getting sluggish</text>
        <text x="250" y="138" fill="#fbbf24" font-size="9">Spark executor dies, no error message</text>
        <text x="250" y="170" fill="#fbbf24" font-size="9">Re-reading same files is slow first time</text>
        <text x="250" y="202" fill="#fbbf24" font-size="9">"Too many open files" exception</text>
        <text x="250" y="234" fill="#fbbf24" font-size="9">Everything grinds to a halt overnight</text>

        <rect x="492" y="32" width="218" height="212" rx="8" fill="#0d1f0d" stroke="#34d399" stroke-width="2"/>
        <text x="601" y="52" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="Space Grotesk">The Fix</text>
        <text x="504" y="74" fill="#34d399" font-size="9">nice/taskset, --executor-cores</text>
        <text x="504" y="106" fill="#34d399" font-size="9">--executor-memory, tune JVM GC</text>
        <text x="504" y="138" fill="#34d399" font-size="9">dmesg | grep oom, add RAM</text>
        <text x="504" y="170" fill="#34d399" font-size="9">fast=cached, slow=1st read, normal</text>
        <text x="504" y="202" fill="#34d399" font-size="9">ulimit -n 65536, set in systemd unit</text>
        <text x="504" y="234" fill="#34d399" font-size="9">vm.swappiness=10, add RAM/nodes</text>
    </svg>
</div>

<div class="tip-box">
    <h4>🎯 The Data Engineer's OS Diagnostic Toolkit</h4>
    <p>
        <strong>CPU bottleneck?</strong> <code>top</code>, <code>htop</code>, check %wa (I/O wait) and %us (user CPU)<br>
        <strong>Memory problem?</strong> <code>free -h</code>, <code>vmstat 2 5</code>, <code>dmesg | grep oom</code><br>
        <strong>Disk I/O slow?</strong> <code>iostat -x 2</code>, check %util per device<br>
        <strong>Process died?</strong> <code>dmesg | grep killed</code>, check journalctl<br>
        <strong>File locked?</strong> <code>lsof /path/to/file</code><br>
        <strong>Port in use?</strong> <code>ss -tuln | grep 8080</code><br>
        <strong>Too many files?</strong> <code>ulimit -n</code> and <code>/proc/sys/fs/file-max</code><br>
        <strong>Boot issues?</strong> <code>journalctl -b</code> (boot log) and <code>dmesg</code>
    </p>
</div>
`
        }

    ], // end sections

    practiceExercises: [
        {
            id: "os_ex01",
            difficulty: "Easy",
            title: "Identify OS Layers on Your System",
            description: "Explore each layer of the OS stack on your actual Linux system — verify what kernel, tools, and shell you are running.",
            starterCode: `# LAYER 1: Hardware
$ uname -m               # CPU architecture?
$ cat /proc/cpuinfo | grep "model name" | uniq
$ cat /proc/meminfo | grep MemTotal

# LAYER 2: Kernel  
$ uname -r               # Kernel version?
$ uname -a               # Full kernel info

# LAYER 3: GNU Tools
$ bash --version | head -1
$ ls --version | head -1
$ python3 --version

# LAYER 4: Your OS Distribution
$ cat /etc/os-release | grep -E "^NAME|^VERSION"`,
            solution: `$ uname -m
x86_64

$ cat /proc/cpuinfo | grep "model name" | uniq
model name : Intel(R) Xeon(R) Platinum 8275CL CPU @ 3.00GHz

$ cat /proc/meminfo | grep MemTotal
MemTotal:       16384000 kB    # 16 GB RAM

$ uname -r
5.15.0-91-generic

$ uname -a
Linux ubuntu-prod-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux

$ bash --version | head -1
GNU bash, version 5.1.16(1)-release (x86_64-pc-linux-gnu)
# "GNU bash" — the shell is a GNU tool, not Linux kernel

$ ls --version | head -1
ls (GNU coreutils) 8.32
# "GNU coreutils" — even ls is from GNU project!

$ python3 --version
Python 3.10.12

$ cat /etc/os-release | grep -E "^NAME|^VERSION"
NAME="Ubuntu"
VERSION="22.04.3 LTS (Jammy Jellyfish)"`,
            explanation: "This exercise maps your real system to the OS layers. uname -r gives you the Linux KERNEL version (e.g., 5.15.0). bash --version says 'GNU bash' — proving your shell is a GNU tool, not part of the kernel. ls --version says 'GNU coreutils' — same thing. Python is an application. The distro name (Ubuntu) is just branding around all these components. The kernel version (5.15) and distro version (22.04) are completely independent — Ubuntu 22.04 ships with kernel 5.15, but you can update the kernel independently."
        },

        {
            id: "os_ex02",
            difficulty: "Easy",
            title: "Explore the Process Hierarchy",
            description: "Investigate running processes, see the parent-child relationships, and understand how PID 1 is the ancestor of everything.",
            starterCode: `# Q1: What is PID 1 and what does it do?
$ cat /proc/1/comm
$ ps -p 1 -o pid,ppid,comm,cmd

# Q2: What is YOUR shell's PID?
$ echo \$\$

# Q3: See the parent-child tree
$ pstree -p | head -20

# Q4: How many total processes are running?
$ ps aux | wc -l

# Q5: Which process is using the most CPU?
$ ps aux --sort=-%cpu | head -5

# Q6: See YOUR bash process in /proc
$ ls /proc/\$\$`,
            solution: `$ cat /proc/1/comm
systemd    # PID 1 is always systemd on modern Ubuntu

$ ps -p 1 -o pid,ppid,comm,cmd
PID  PPID COMM   CMD
  1     0 systemd /sbin/init
# PPID=0 means no parent — kernel created it directly

$ echo \$\$
2847    # YOUR shell's process ID

$ pstree -p | head -10
systemd(1)---ModemManager(756)
           ---NetworkManager(758)---dhclient(1024)
           ---sshd(892)---sshd(2846)---bash(2847)---pstree(3712)
# bash(2847) = your shell, child of sshd(2846)

$ ps aux | wc -l
147    # 146 processes + header line

$ ps aux --sort=-%cpu | head -3
USER  PID  %CPU %MEM  COMMAND
anuj  4521  45.2  8.1  java -jar spark-worker  # Spark using most CPU

$ ls /proc/\$\$
attr  cgroup  cmdline  comm  cwd  environ  exe  fd  fdinfo
maps  mem  mounts  net  oom_adj  oom_score  smaps  stat  status`,
            explanation: "PID 1 is ALWAYS systemd (or init on older systems) — it's the first user-space process the kernel creates. PPID (Parent PID) of 0 means it was spawned by the kernel itself. Your bash shell was forked from sshd (SSH daemon), which was forked from systemd — you can trace any process back to PID 1. ps aux | wc -l counts all processes (subtract 1 for the header). The /proc/PID/ directory is a virtual filesystem — it shows live kernel data about that process: fd/ = open file descriptors, environ = environment variables, maps = memory mappings. Every number you see in ls /proc/ is a running process PID."
        },

        {
            id: "os_ex03",
            difficulty: "Easy",
            title: "Memory Investigation",
            description: "Use free, /proc/meminfo, and ps to understand how memory is being used on your system.",
            starterCode: `# Q1: How much total, used, and available RAM?
$ free -h

# Q2: Detailed breakdown from kernel
$ cat /proc/meminfo | grep -E "MemTotal|MemFree|MemAvailable|Cached|SwapTotal|SwapFree"

# Q3: Which process uses the most RAM?
$ ps aux --sort=-%mem | head -5

# Q4: What is buff/cache in free output?
# (Answer in explanation)

# Q5: Is there any swap being used?
$ swapon --show

# Q6: Calculate: what % of RAM is "available"?
$ echo "Available / Total * 100 = ?"`,
            solution: `$ free -h
              total   used   free   shared  buff/cache  available
Mem:           15Gi   6.2Gi  1.1Gi   234Mi    8.1Gi      8.8Gi
Swap:          2.0Gi    0    2.0Gi

$ cat /proc/meminfo | grep -E "MemTotal|MemFree|MemAvailable|Cached|SwapTotal|SwapFree"
MemTotal:       16384000 kB    # 16GB total
MemFree:         1127424 kB    # physically unused RAM
MemAvailable:    9009152 kB    # ACTUALLY available for programs
Cached:          6291456 kB    # file cache (can be freed if needed)
SwapTotal:       2097152 kB    # 2GB swap configured
SwapFree:        2097152 kB    # all swap is free (good!)

$ ps aux --sort=-%mem | head -4
USER     PID  %CPU  %MEM    VSZ      RSS   COMMAND
anuj    4521   8.1  25.4  8456789  4194304  java -jar spark-worker.jar
anuj    4522   5.2  12.1  4234567  1990656  python3 ml_training.py
root     892   0.0   0.2  103456    32768   /usr/sbin/sshd

$ swapon --show
NAME      TYPE      SIZE  USED PRIO
/dev/sda2 partition   2G    0B   -2
# Swap configured but nothing using it — memory is comfortable

# Available %:
$ python3 -c "print(f'{9009152/16384000*100:.1f}% of RAM is available')"
55.0% of RAM is available`,
            explanation: "free -h output explanation: 'total' = physical RAM installed. 'used' = actively used by processes. 'free' = completely unused RAM. 'buff/cache' = Linux intelligently using free RAM as disk cache — this is NOT wasted RAM, Linux will free it immediately if an app needs memory. 'available' = free + reclaimable buff/cache = what you can actually use. So 8.8Gi available even though only 1.1Gi 'free'. RSS (Resident Set Size) in ps = actual physical RAM a process is using right now. VSZ (Virtual Size) = virtual address space claimed — much larger than RSS because most virtual space isn't mapped to real RAM yet."
        },

        {
            id: "os_ex04",
            difficulty: "Easy",
            title: "Explore /proc — The Live Kernel Window",
            description: "/proc is a virtual filesystem where the kernel exposes live system information. Every file you read returns live data generated by the kernel on demand.",
            starterCode: `# /proc is NOT on your disk — kernel generates these "files" on demand

# Q1: Kernel version
$ cat /proc/version

# Q2: How long has the system been running?
$ cat /proc/uptime
# Format: seconds_up  idle_seconds

# Q3: CPU info
$ grep "model name" /proc/cpuinfo | uniq

# Q4: How many CPU cores?
$ grep -c "^processor" /proc/cpuinfo

# Q5: Current system load averages
$ cat /proc/loadavg
# Format: 1min_avg 5min_avg 15min_avg running/total last_pid

# Q6: YOUR process details
$ cat /proc/\$\$/status | grep -E "^Name|^State|^Pid|^PPid|^VmRSS"`,
            solution: `$ cat /proc/version
Linux version 5.15.0-91-generic (buildd@lcy02-amd64-043) 
(gcc (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0)

$ cat /proc/uptime
864321.58 3215678.23
# 864321 seconds up = ~10 days | 3215678 idle time (multiple cores sum)
# python3 -c "print(864321/3600/24, 'days')" → 10.0 days

$ grep "model name" /proc/cpuinfo | uniq
model name : Intel(R) Xeon(R) Platinum 8275CL CPU @ 3.00GHz

$ grep -c "^processor" /proc/cpuinfo
8    # 8 CPU cores (logical, including hyperthreading)

$ cat /proc/loadavg
2.45 1.87 1.24 4/247 3847
# 1min=2.45, 5min=1.87, 15min=1.24  ← rising load (2.45 > 1.24)
# 4/247 = 4 processes running, 247 total processes
# 3847 = last PID created

$ cat /proc/\$\$/status | grep -E "^Name|^State|^Pid|^PPid|^VmRSS"
Name:   bash
State:  S (sleeping)        ← waiting for your input
Pid:    2847
PPid:   2846                ← SSH daemon is parent
VmRSS:  45678 kB            ← bash is using ~44MB RAM`,
            explanation: "Every file in /proc is a live window into kernel data — not stored on disk, generated on read. /proc/uptime first number / 3600 / 24 = days running. Load average: 1.0 on a single-core machine = 100% busy. On an 8-core machine, load average of 8.0 = 100% busy. Values above your core count = overloaded. State 'S (sleeping)' = process is waiting (for I/O, for input, for a timer) — not using CPU. Most processes spend most of their time sleeping. State 'R (running)' = on CPU right now. 'D (disk wait)' = blocked waiting for disk — if many processes in D state, disk is overloaded."
        },

        {
            id: "os_ex05",
            difficulty: "Easy",
            title: "System Call Tracing with strace",
            description: "Use strace to watch every system call a program makes — the fundamental interface between user programs and the kernel.",
            starterCode: `# strace shows EVERY system call a program makes

# Q1: Basic trace — what syscalls does echo use?
$ strace echo "hello world" 2>&1 | tail -10

# Q2: Count syscalls
$ strace -c echo "hello world" 2>&1

# Q3: Trace only file-related syscalls
$ strace -e openat,read,write,close echo "hello" 2>&1

# Q4: What happens when Python opens a file?
$ strace -e openat python3 -c "f=open('/tmp/test.txt','w'); f.close()" 2>&1 | grep openat | tail -5

# Q5: How many syscalls does a simple Python script make?
$ strace -c python3 -c "print('hello')" 2>&1 | tail -5`,
            solution: `$ strace echo "hello world" 2>&1 | tail -5
write(1, "hello world\n", 12)  = 12
close(1)                       = 0
close(2)                       = 0
exit_group(0)                  = ?
+++ exited with 0 +++
# write(1,...) = write to fd 1 (stdout) = the actual output!
# exit_group(0) = program exited with code 0 (success)

$ strace -c echo "hello world" 2>&1
% time     seconds  usecs/call  calls  syscall
 45.2    0.000124         14      9    mmap
 22.1    0.000061         20      3    openat
 18.3    0.000050         25      2    read
  8.1    0.000022          7      3    close
  6.3    0.000017          8      2    write
-------- --------------- ------  -----
100.00    0.000274                19 total
# Even simple "echo" makes 19 system calls!

$ strace -e openat python3 -c "f=open('/tmp/test.txt','w'); f.close()" 2>&1 | grep openat | tail -3
openat(AT_FDCWD, "/tmp/test.txt", O_WRONLY|O_CREAT|O_TRUNC|O_CLOEXEC, 0666) = 3
# AT_FDCWD = current directory | O_WRONLY=write-only | O_CREAT=create if missing
# = 3 means kernel returned file descriptor #3

$ strace -c python3 -c "print('hello')" 2>&1 | tail -3
100.00    0.015000              412 total
# Python "hello" = 412 system calls! (loading interpreter, importing builtins)`,
            explanation: "strace reveals the true cost of every operation. fd 0=stdin, fd 1=stdout, fd 2=stderr — these are always the first 3 file descriptors. When you see write(1, ...) that IS stdout. Every file open gets a new fd number starting from 3. O_WRONLY|O_CREAT|O_TRUNC are flags passed to the kernel — they tell it: write-only access, create if not exists, truncate if exists. The return value = 3 is the file descriptor — your code uses this number for all subsequent reads/writes. 412 syscalls for a Python print shows the real cost of interpreter startup — this is why Python startup time (cold start) matters for short-lived Lambda functions."
        },

        {
            id: "os_ex06",
            difficulty: "Medium",
            title: "CPU Scheduling Investigation",
            description: "Observe how the OS schedules CPU time, understand process priorities, and see time-slicing in action.",
            starterCode: `# Q1: Run a CPU-intensive task and observe scheduling
$ time python3 -c "sum(range(10**8))"

# Q2: Run the same task with LOWER priority (nicer to others)
$ time nice -n 19 python3 -c "sum(range(10**8))"

# Q3: See process priorities
$ ps -eo pid,ni,pri,cmd --sort=-ni | head -10
# ni = nice value (-20 to +19)  pri = priority

# Q4: Start a background job, see it in process list
$ python3 -c "import time; time.sleep(30)" &
$ ps aux | grep python3
$ kill %1   # kill the background job

# Q5: What are the running vs sleeping processes?
$ ps aux | awk '{print \$8}' | sort | uniq -c | sort -rn`,
            solution: `$ time python3 -c "sum(range(10**8))"
real  0m3.241s    # 3.2 seconds on real clock
user  0m3.195s    # 3.1 seconds of CPU time (it had CPU ~98% of real time)
sys   0m0.046s    # 0.04 seconds in kernel

$ time nice -n 19 python3 -c "sum(range(10**8))"
real  0m4.876s    # 4.9 seconds — slower! OS gave it less CPU time
user  0m3.192s    # But same user CPU time — the job DID the same work
sys   0m0.043s    # It just had to WAIT more between time slices

# Interpretation: real > user = process spent time waiting for CPU
# real ≈ user = process got CPU time continuously

$ ps -eo pid,ni,pri,cmd --sort=-ni | head -5
PID   NI  PRI  CMD
892    0   20  /usr/sbin/sshd
2847   0   20  bash
4521   0   20  java -jar spark-worker
3800  19    1  nice -n 19 python3  ← lowest priority process

$ python3 -c "import time; time.sleep(30)" &
[1] 4200
$ ps aux | grep python3
anuj  4200  0.0  0.1  ...  python3 -c import time...
$ kill %1

$ ps aux | awk '{print \$8}' | sort | uniq -c | sort -rn
    142 S     # 142 processes Sleeping (waiting for something)
      3 R     # 3 processes Running (on CPU right now)
      1 D     # 1 process in Disk-wait (blocked on I/O)`,
            explanation: "nice -n 19 makes a process the most 'polite' — it gets time slices only when no other process wants CPU. 'real' time = wall clock elapsed. 'user' time = CPU time actually executing your code. 'sys' time = CPU time in kernel on your behalf (system calls). real > user means CPU was shared — your process waited in the ready queue while other processes ran. real ≈ user means you had CPU almost continuously. The nice-d process: same user time (did same work), longer real time (had to wait more). In production: never run Spark jobs with nice -n 0 on a shared server — lower priority for batch jobs, high priority for latency-sensitive services."
        },

        {
            id: "os_ex07",
            difficulty: "Medium",
            title: "Virtual Memory and the OOM Killer",
            description: "Understand virtual vs physical memory, investigate swap usage, and simulate what happens when the OOM killer activates.",
            starterCode: `# Q1: Understand virtual vs physical memory for a process
$ cat /proc/\$\$/status | grep -E "^VmPeak|^VmSize|^VmRSS|^VmSwap"
# VmPeak = peak virtual  VmSize = current virtual  VmRSS = physical  VmSwap = swap

# Q2: List processes by RSS (actual physical RAM used)
$ ps aux --sort=-%mem --no-headers | awk '{printf "%6s %6s %s\n", \$4, \$6, \$11}' | head -8
# %MEM, RSS, COMMAND

# Q3: How does Linux use free RAM as cache?
$ free -m                          # Before
$ cat /tmp/largefile 2>/dev/null || dd if=/dev/zero of=/tmp/largefile bs=1M count=100 2>/dev/null
$ cat /tmp/largefile > /dev/null   # Read it into page cache
$ free -m                          # After — buff/cache increased!

# Q4: Check if OOM killer has ever fired
$ dmesg | grep -i "oom\|killed" 2>/dev/null | tail -5

# Q5: See OOM score for current processes
$ cat /proc/\$\$/oom_score
$ cat /proc/1/oom_score            # systemd's score`,
            solution: `$ cat /proc/\$\$/status | grep -E "^VmPeak|^VmSize|^VmRSS|^VmSwap"
VmPeak:    134896 kB    # 132MB peak virtual address space claimed
VmSize:    123456 kB    # 120MB virtual space currently in use
VmRSS:      45678 kB    # 44MB of ACTUAL physical RAM
VmSwap:         0 kB    # 0 bytes swapped to disk (good!)

# VmSize >> VmRSS is NORMAL — virtual space is cheap, only mapped pages
# cost physical RAM. The other 75MB is virtual but never accessed yet.

$ free -m
              total    used    free  buff/cache  available
Mem:          15258    6241    1127        7890       8843

# Create and read a 100MB file:
$ dd if=/dev/zero of=/tmp/largefile bs=1M count=100 2>/dev/null
$ cat /tmp/largefile > /dev/null

$ free -m
              total    used    free  buff/cache  available
Mem:          15258    6241     940        8077       8730
# buff/cache: 7890 → 8077 = +187MB  ← 100MB file now in page cache!
# available barely changed — Linux VERY efficiently uses free RAM

$ dmesg | grep -i "oom" | tail -3
Out of memory: Kill process 8421 (java) score 847 or sacrifice child
Killed process 8421 (java) total-vm:8456789kB, anon-rss:4194304kB
# OOM fired! Java using 4GB RAM was killed

$ cat /proc/\$\$/oom_score
20      # bash has low OOM score (won't be killed)

$ cat /proc/1/oom_score
-1000   # systemd has -1000 = NEVER kill this (special protection)`,
            explanation: "VmSize >> VmRSS is always the case — virtual memory is a cheap illusion, physical RAM is the real resource. The OS only maps virtual pages to physical RAM when actually accessed (lazy allocation). Page cache: Linux uses free RAM to cache recently read files. re-reading cached files is ~100,000x faster than disk reads. The cache uses 'free' RAM but is reclaimed immediately if a program needs that RAM — 'available' stays nearly the same. OOM score: 0 = never kill. -1000 = absolutely never kill (systemd, kernel threads). High scores = chosen first when RAM is critically low. Spark executors get high scores because they use lots of RAM — that's why they die first."
        },

        {
            id: "os_ex08",
            difficulty: "Medium",
            title: "Filesystem Internals — Inodes and Links",
            description: "Explore how Linux stores files using inodes, understand hard links, and see why renaming large files is instant.",
            starterCode: `# Q1: Create a file and examine its inode
$ echo "hello filesystem" > ~/inode_test.txt
$ ls -i ~/inode_test.txt          # See inode number
$ stat ~/inode_test.txt           # Full inode metadata

# Q2: Why is mv (rename) INSTANT even for huge files?
$ dd if=/dev/zero of=/tmp/bigfile.dat bs=1M count=500 2>/dev/null
$ time mv /tmp/bigfile.dat /tmp/bigfile_renamed.dat

# Q3: Create a hard link — TWO names, ONE inode
$ ln ~/inode_test.txt ~/inode_hardlink.txt
$ ls -i ~/inode_test.txt ~/inode_hardlink.txt  # Same inode number!

# Q4: Deleting one hard link doesn't delete data
$ rm ~/inode_test.txt
$ cat ~/inode_hardlink.txt        # Still accessible!

# Q5: Check inode usage on filesystem
$ df -i /
$ df -ih /`,
            solution: `$ echo "hello filesystem" > ~/inode_test.txt
$ ls -i ~/inode_test.txt
2097281 /home/anuj/inode_test.txt    # inode number = 2097281

$ stat ~/inode_test.txt
  File: /home/anuj/inode_test.txt
  Size: 17              Blocks: 8      IO Block: 4096
Device: 802h            Inode: 2097281  Links: 1
Access: (0644/-rw-r--r--)  Uid: (1000/anuj)   Gid: (1000/anuj)
Access: 2024-03-09 10:30:00
Modify: 2024-03-09 10:30:00
Change: 2024-03-09 10:30:00

$ dd if=/dev/zero of=/tmp/bigfile.dat bs=1M count=500 2>/dev/null
$ time mv /tmp/bigfile.dat /tmp/bigfile_renamed.dat
real  0m0.001s    ← 1ms to "move" 500MB! No data moved at all.
# Kernel only changed directory entry: "bigfile.dat" → "bigfile_renamed.dat"
# Inode unchanged. 500MB of data blocks untouched.

$ ln ~/inode_test.txt ~/inode_hardlink.txt
$ ls -i ~/inode_test.txt ~/inode_hardlink.txt
2097281 /home/anuj/inode_test.txt
2097281 /home/anuj/inode_hardlink.txt    ← SAME inode!

$ rm ~/inode_test.txt         # Reduces link count from 2 to 1
$ cat ~/inode_hardlink.txt
hello filesystem              ← still there! Data only deleted when link count=0

$ df -i /
Filesystem      Inodes  IUsed  IFree  IUse%  Mounted on
/dev/sda1      3276800  97264  3179536    3%  /
# 3.2 million total inodes, 97K used — each file uses one inode slot`,
            explanation: "An inode is the kernel's internal record for a file — it stores everything EXCEPT the filename. Directories map filenames to inode numbers. mv within the same filesystem = change a directory entry (microseconds), no data moves. mv across filesystems = must copy all data blocks (slow, proportional to file size). Hard links: multiple directory entries pointing to the same inode. The kernel tracks how many links exist (link count). rm decrements the link count — data is only deleted when count reaches 0 AND no process has the file open. This is why you can delete a file that a running program has open — the program keeps the inode alive via its file descriptor."
        },

        {
            id: "os_ex09",
            difficulty: "Medium",
            title: "Device Files and /dev",
            description: "Explore Linux's 'everything is a file' philosophy — interact with hardware and virtual devices through the /dev filesystem.",
            starterCode: `# Q1: List device files and understand types
$ ls -la /dev/ | grep -E "^[bc]" | head -10
# b = block device (disk)  c = character device (stream)

# Q2: Use /dev/null — the black hole
$ echo "this will vanish" > /dev/null
$ cat /dev/null                    # Always empty!

# Q3: Use /dev/urandom for random data
$ cat /dev/urandom | head -c 16 | xxd | head -2

# Q4: Generate a random password using /dev/urandom
$ cat /dev/urandom | tr -dc 'A-Za-z0-9!@#\$' | head -c 20; echo

# Q5: See your disk devices
$ lsblk

# Q6: Your terminal IS a file
$ tty                              # What device file is your terminal?
$ echo "hello from a file" > \$(tty)  # Write to your terminal file`,
            solution: `$ ls -la /dev/ | grep "^[bc]" | head -5
brw-rw---- 1 root disk    8,   0 /dev/sda      ← hard disk (block)
brw-rw---- 1 root disk    8,   1 /dev/sda1     ← partition 1
crw-rw-rw- 1 root root    1,   3 /dev/null     ← black hole (char)
crw-rw-rw- 1 root root    1,   8 /dev/random   ← random (char)
crw-rw-rw- 1 root tty     4,   0 /dev/tty0     ← console (char)
# Major:minor numbers (8,0) identify hardware to kernel driver

$ echo "this will vanish" > /dev/null
$ cat /dev/null
                   ← completely empty! Always returns EOF

$ cat /dev/urandom | head -c 16 | xxd | head -1
00000000: 8f3a 2b91 c045 e72d 9f18 4c3b 7a02 d8f5  .:+..E.-..L;z...
# 16 random bytes in hex — genuinely random from kernel entropy pool

$ cat /dev/urandom | tr -dc 'A-Za-z0-9!@#\$' | head -c 20; echo
Kx9!mP2bZ7yL3nV8wQ5c
# A strong 20-character random password!

$ lsblk
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   50G  0 disk
└─sda1   8:1    0   50G  0 part /

$ tty
/dev/pts/0         ← your terminal IS a file!
$ echo "hello from a file" > /dev/pts/0
hello from a file  ← appeared in your terminal`,
            explanation: "/dev/null accepts infinite input and discards it — essential for suppressing command output: command 2>/dev/null. /dev/urandom is the kernel's cryptographically secure random number generator — uses hardware entropy sources (CPU timing, network interrupts, disk timing) to generate unpredictable bytes. Always use /dev/urandom (not /dev/random) for passwords — it never blocks and is equally secure on modern kernels. Your terminal is /dev/pts/N (pseudo-terminal slave) — writing to it = writing to your screen. This 'everything is a file' design means you can use UNIX pipes, redirection, and file tools on literally any hardware interface."
        },

        {
            id: "os_ex10",
            difficulty: "Medium",
            title: "Boot Process Investigation",
            description: "Investigate how your system booted — examine kernel messages, systemd services, and boot timing.",
            starterCode: `# Q1: When did this machine last boot?
$ who -b
$ uptime -p

# Q2: Kernel boot messages (first 20 lines)
$ dmesg | head -20

# Q3: How long did boot take?
$ systemd-analyze

# Q4: Which services took longest to start?
$ systemd-analyze blame | head -10

# Q5: What services are currently running?
$ systemctl list-units --type=service --state=running | head -15

# Q6: Check if a specific service is running
$ systemctl is-active sshd
$ systemctl status sshd | head -8`,
            solution: `$ who -b
         system boot  2024-02-28 08:00:12
# Booted 10 days ago

$ uptime -p
up 10 days, 2 hours, 47 minutes

$ dmesg | head -5
[    0.000000] Linux version 5.15.0-91-generic (Ubuntu 22.04)
[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-91 root=/dev/sda1 ro quiet
[    0.000000] BIOS-provided physical RAM map:
[    0.032000] PCI: Using configuration type 1 for base access
[    0.120000] clocksource: tsc-early: mask: 0xffffffffffffffff

$ systemd-analyze
Startup finished in 3.204s (kernel) + 8.721s (userspace) = 11.925s
graphical.target reached after 11.543s

$ systemd-analyze blame | head -5
4.512s apt-daily.service          ← apt update check on boot
2.104s networkd-dispatcher.service
1.821s snapd.service
0.950s ssh.service
0.741s postfix.service

$ systemctl list-units --type=service --state=running | head -5
  UNIT               LOAD   ACTIVE SUB     DESCRIPTION
  cron.service       loaded active running Regular background program
  networking.service loaded active running Raise network interfaces
  ssh.service        loaded active running OpenBSD Secure Shell server
  syslog.service     loaded active running System Logging Service

$ systemctl is-active sshd
active

$ systemctl status sshd | head -6
● ssh.service - OpenBSD Secure Shell server
     Loaded: loaded (/lib/systemd/system/ssh.service; enabled)
     Active: active (running) since 2024-02-28 08:00:23; 10 days ago
   Main PID: 892 (sshd)`,
            explanation: "dmesg timestamps are seconds since kernel start — [0.000000] = kernel first instruction, [0.120000] = 120ms into boot. systemd-analyze splits boot time into kernel phase (decompressing, loading drivers) and userspace phase (starting services). systemd-analyze blame shows which services slowed your boot — apt-daily.service at 4.5s is often the biggest culprit on Ubuntu (apt checking for updates on boot). systemctl is-active returns 'active' or 'inactive' — useful in scripts: systemctl is-active sshd || systemctl start sshd. When a server fails to respond, the first thing to check is: uptime (just rebooted?), dmesg | tail -20 (any kernel errors?), systemctl --failed (any services that crashed?)."
        },

        {
            id: "os_ex11",
            difficulty: "Hard",
            title: "Diagnose a Simulated System Under Stress",
            description: "A real-world scenario: the monitoring team reports the server is slow. Use OS-level tools to diagnose the bottleneck.",
            starterCode: `# SCENARIO: Users report the Spark pipeline is 3x slower than usual
# Your job: diagnose using OS tools in under 10 minutes

# Step 1: Quick system overview (5 seconds)
$ uptime                   # Load average vs CPU count?
$ free -h                  # Memory pressure?
$ df -h                    # Disk full?

# Step 2: CPU analysis
$ top -b -n 1 | head -15   # %wa = I/O wait?  %us = user CPU?

# Step 3: Memory analysis
$ vmstat 2 3               # si/so = swap in/out?

# Step 4: Disk I/O analysis
$ iostat -x 2 2 2>/dev/null | grep -v "^$" | head -15

# Step 5: Which processes are the culprits?
$ ps aux --sort=-%cpu | head -8
$ ps aux --sort=-%mem | head -8

# Step 6: Check for OOM events
$ dmesg | grep -i "oom\|killed" | tail -5

# Step 7: File descriptor exhaustion?
$ lsof 2>/dev/null | wc -l      # Total open files
$ ulimit -n                      # Per-process limit`,
            solution: `$ uptime
 10:47:32 up 10 days, load average: 15.23, 12.45, 8.91
# 15.23 load on an 8-core machine = ~190% load! HEAVILY OVERLOADED
# load > CPU count = processes waiting for CPU

$ free -h
              total    used    free   buff/cache   available
Mem:           15Gi   14.8Gi   0.1Gi    0.1Gi       0.0Gi
Swap:           2Gi    1.8Gi   0.2Gi
# CRITICAL: only 0GB available! 90% of swap in use!

$ df -h
Filesystem     Size  Used Avail Use%
/dev/sda1       50G   49G  800M  99%    ← DISK NEARLY FULL!

$ top -b -n 1 | head -5
%Cpu(s):  2.1 us, 0.8 sy, 0.0 ni, 12.3 id, 84.5 wa  ← 84.5% I/O WAIT!
# 84% of CPU time waiting for disk I/O — disk is the bottleneck

$ vmstat 2 3
r  b  swpd    free    si   so    bi    bo
8  4  1835000  98000  450  380  9200  6100
8  3  1836200  92000  520  440  10200  7200
# si/so > 0 = heavy swapping. bi/bo = disk reads/writes through roof

$ iostat -x 2 2 | grep sda
sda  142.3  48.2  1.1  0.4  8.2  0.9  125.3  98.7%
# util=98.7% = disk completely saturated!

$ ps aux --sort=-%mem | head -4
anuj  4521  2.1  85.4  ... java -jar spark-master.jar  ← 85% RAM!
anuj  4522  0.8  10.2  ... java -jar spark-worker.jar

# DIAGNOSIS: Spark job is using too much memory (85%),
# causing heavy swapping, which saturated disk I/O,
# creating 84% I/O wait, causing everything to slow down.

# FIXES:
# 1. reduce spark.executor.memory
# 2. clean /var/log to free disk space
# 3. add nodes or increase machine RAM
# 4. kill other memory-heavy processes`,
            explanation: "This is real-world performance diagnosis. The chain reaction: Spark used too much RAM (85%) → system started swapping to disk → disk became saturated (98.7% util) → all processes started waiting for disk (84.5% iowait) → everything appeared slow. Load average 15 on 8 cores = 7+ processes per core waiting in queue. The key diagnostic chain: uptime → free -h → top (check iowait%) → iostat (confirm disk saturation) → ps (find the memory hog). Always check in this order: CPU → Memory → Disk → Network. The bottleneck is usually the FIRST resource that's fully utilized."
        },

        {
            id: "os_ex12",
            difficulty: "Hard",
            title: "System Call Deep Dive — What Python Really Does",
            description: "Use strace to understand exactly what system calls Python makes for common data operations, and calculate the overhead.",
            starterCode: `# MISSION: Understand the true cost of Python I/O operations

# Q1: How many syscalls to write a file?
$ strace -c python3 -c "
with open('/tmp/sc_test.txt', 'w') as f:
    f.write('test data\\n')
" 2>&1 | tail -10

# Q2: What are the file-related syscalls specifically?
$ strace -e trace=openat,read,write,close python3 -c "
with open('/tmp/sc_test.txt', 'w') as f:
    f.write('line1\\n')
    f.write('line2\\n')
" 2>&1 | grep -v "^Exec\|^---\|python3"

# Q3: Network operation syscalls
$ strace -e trace=socket,connect,send,recv python3 -c "
import urllib.request
# urllib.request.urlopen('http://example.com')  # Uncomment if network available
print('socket syscalls above')
" 2>&1 | head -20

# Q4: Compare: buffered vs unbuffered I/O performance
$ time python3 -c "
f = open('/tmp/perf_test.txt', 'w')
for i in range(100000): f.write('line\\n')
f.close()
"

$ time python3 -c "
import os
f = os.open('/tmp/perf_test2.txt', os.O_WRONLY|os.O_CREAT, 0o644)
for i in range(100000): os.write(f, b'line\\n')
os.close(f)
"`,
            solution: `$ strace -c python3 -c "
with open('/tmp/sc_test.txt', 'w') as f:
    f.write('test data\\n')
" 2>&1 | tail -8
% time     seconds  usecs/call  calls  syscall
 35.2    0.002341          19    124    mmap
 21.4    0.001426          20     71    read
 15.3    0.001018          25     41    openat
  8.9    0.000592          14     42    close
  5.2    0.000346          18     19    mprotect
  4.1    0.000272          17     16    pread64
  3.8    0.000252          63      4    write      ← ONLY 4 write calls!
----
Total: 437 syscalls to write 10 bytes to a file!

$ strace -e trace=openat,read,write,close python3 -c "
with open('/tmp/sc_test.txt', 'w') as f:
    f.write('line1\\n')
    f.write('line2\\n')
" 2>&1 | grep -E "openat.*sc_test|write.*line|close" | tail -5
openat(AT_FDCWD, "/tmp/sc_test.txt", O_WRONLY|O_CREAT|O_TRUNC) = 3
# Note: f.write('line1') + f.write('line2') = only ONE write syscall!
write(3, "line1\\nline2\\n", 12) = 12   ← Python BUFFERED both writes!
close(3) = 0

# Buffered I/O (default):
$ time python3 -c "f = open('/tmp/perf_test.txt', 'w'); [f.write('line\\n') for i in range(100000)]; f.close()"
real  0m0.189s   # Fast! write() calls buffered, few actual syscalls

# Unbuffered I/O (os.write):
$ time python3 -c "import os; f = os.open('/tmp/perf_test2.txt', os.O_WRONLY|os.O_CREAT, 0o644); [os.write(f, b'line\\n') for i in range(100000)]; os.close(f)"
real  0m1.847s   # 10x SLOWER! Each write() is a syscall (context switch)`,
            explanation: "Python's open() with default buffering collects write() calls in memory and flushes in chunks — 100,000 f.write() calls → only a handful of actual write() system calls. os.write() bypasses buffering → 100,000 syscalls → each one crosses the user/kernel boundary → 10x slower. This is why unbuffered I/O is almost always the wrong choice. Each system call costs ~1-10 microseconds for the context switch alone. 100,000 × 5μs = 500ms of pure overhead. Buffering collapses that to ~5 syscalls = 25μs overhead. This same principle applies to database queries: always batch your SQL inserts, never insert one row at a time in a loop."
        },

        {
            id: "os_ex13",
            difficulty: "Hard",
            title: "Complete OS Knowledge Audit",
            description: "A comprehensive exercise testing everything: process management, memory, filesystem, devices, and the boot sequence.",
            starterCode: `# PART A: Process Management
# 1. How many processes are currently running (state=R)?
$ ps aux | awk '{print \$8}' | grep -c "^R"

# 2. Find the oldest running process (first started)
$ ps -eo pid,lstart,cmd --sort=lstart | head -5

# PART B: Memory
# 3. Total physical RAM in GB
$ free -g | grep Mem | awk '{print \$2}'

# 4. How much memory is the kernel itself using?
$ cat /proc/meminfo | grep -E "Slab:|KernelStack:"

# PART C: Filesystem
# 5. Largest file on the system (may take time)
$ find / -type f -size +100M 2>/dev/null | head -5

# 6. How many inodes are available?
$ df -i / | tail -1

# PART D: Devices
# 7. How many block devices (disks) are attached?
$ lsblk -d | grep -v NAME | wc -l

# PART E: Complete System Summary
# 8. One command — your entire system at a glance
$ uname -a && echo "---" && free -h | head -2 && echo "---" && df -h | grep "/$"`,
            solution: `# PART A:
$ ps aux | awk '{print \$8}' | grep -c "^R"
3    # Only 3 processes actually on CPU right now (others sleeping/waiting)

$ ps -eo pid,lstart,cmd --sort=lstart | head -3
PID  STARTED                   CMD
  1  Wed Feb 28 08:00:01 2024  /sbin/init  ← oldest: systemd!
  2  Wed Feb 28 08:00:01 2024  [kthreadd]  ← kernel thread manager

# PART B:
$ free -g | grep Mem | awk '{print \$2}'
15    # 15 GB RAM (free -g rounds to GB)

$ cat /proc/meminfo | grep -E "Slab:|KernelStack:"
Slab:            524288 kB    # 512MB kernel data structures (inodes, file handles)
KernelStack:      32768 kB    # 32MB kernel stack space (per-process)

# PART C:
$ find / -type f -size +100M 2>/dev/null | head -3
/opt/spark/jars/spark-core_2.12-3.4.0.jar    (412MB)
/home/anuj/training_data.parquet             (1.2GB)
/var/cache/apt/archives/cuda-toolkit.deb     (2.1GB)

$ df -i / | tail -1
/dev/sda1  3276800  97264  3179536    3%   /
# 3,179,536 inodes free = can create ~3.2 million more files

# PART D:
$ lsblk -d | grep -v NAME | wc -l
2    # 2 physical disks: sda (OS), sdb (data)

# PART E:
$ uname -a && echo "---" && free -h | head -2 && echo "---" && df -h | grep "/$"
Linux ubuntu-prod-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux
---
              total   used   free  buff/cache   available
Mem:           15Gi   6.2Gi  1.1Gi    8.1Gi       8.8Gi
---
/dev/sda1       50G    22G   26G   46% /`,
            explanation: "Typically only 2-5 processes are in state R (actually running on CPU) regardless of how many total processes exist — the rest are in S (sleeping/waiting). PID 1 (systemd) and PID 2 (kthreadd) are always the oldest processes — they start at kernel boot time. The kernel itself uses memory for Slab (caches of frequently allocated objects like inodes, dentry structures, network buffers) and KernelStack (each process needs a small kernel stack for system call execution). Running out of inodes (df -i shows 100%) causes 'no space left on device' even when df -h shows plenty of disk space — happens when millions of tiny files are created (log files, cache files, temp files)."
        },

        {
            id: "os_ex14",
            difficulty: "Hard",
            title: "Kernel Tuning for Data Engineering Workloads",
            description: "Learn how to tune kernel parameters for Spark, Kafka, and high-throughput data pipelines. Understand what each setting controls.",
            starterCode: `# Kernel parameters are tunable at runtime with sysctl
# These affect OS behavior for ALL processes on the system

# Q1: Check current swappiness (0=avoid swap, 100=swap aggressively)
$ sysctl vm.swappiness

# Q2: Check network buffer sizes (important for Kafka/Spark)
$ sysctl net.core.rmem_max net.core.wmem_max net.core.somaxconn

# Q3: Check file descriptor limits
$ sysctl fs.file-max                    # System-wide limit
$ ulimit -n                             # Per-process limit

# Q4: Check memory overcommit settings
$ sysctl vm.overcommit_memory           # 0=heuristic 1=always 2=never

# Q5: For a Spark server, what would you tune?
# (See explanation for production recommendations)
$ echo "Current vm.swappiness:"; sysctl -n vm.swappiness
$ echo "Max open files:"; sysctl -n fs.file-max`,
            solution: `$ sysctl vm.swappiness
vm.swappiness = 60    # Default: start swapping when 40% free RAM remains

# For Spark/data engineering: swappiness=10 or even 1
$ sudo sysctl -w vm.swappiness=10
vm.swappiness = 10    # Now only starts swapping at 10% free RAM
# Spark HATES swap — one swap event can stall a task for seconds

$ sysctl net.core.rmem_max net.core.wmem_max net.core.somaxconn
net.core.rmem_max = 212992          # 208KB max TCP receive buffer
net.core.wmem_max = 212992          # 208KB max TCP send buffer
net.core.somaxconn = 4096           # Max pending connection queue

# For Kafka/high-throughput: increase to 128MB+
$ sudo sysctl -w net.core.rmem_max=134217728    # 128MB
$ sudo sysctl -w net.core.wmem_max=134217728

$ sysctl fs.file-max
fs.file-max = 9223372036854775807   # Effectively unlimited (modern Linux)

$ ulimit -n
1024    # Per-process limit — typically needs increasing for high-concurrency

$ sysctl vm.overcommit_memory
vm.overcommit_memory = 0    # Heuristic: OS guesses if allocation will succeed

# For Spark: vm.overcommit_memory=1 (always allow allocation)
# Prevents "Cannot allocate memory" on large mmap() calls

# ═══ Production Spark Server sysctl.conf ═══
# /etc/sysctl.conf additions:
vm.swappiness = 10          # Strongly prefer RAM over swap
vm.overcommit_memory = 1    # Allow Java's large memory allocations
net.core.somaxconn = 65535  # Handle more simultaneous connections
fs.file-max = 2000000       # Allow millions of open files
net.ipv4.tcp_max_syn_backlog = 8192  # More queued connections`,
            explanation: "Kernel parameters are the deepest level of OS tuning — they change how the kernel itself makes decisions. vm.swappiness: lowering this makes Linux prefer to keep processes in RAM rather than swap them out. For Spark, swapping is catastrophic — even 1 second of swap latency stalls a task. net.core.somaxconn controls the backlog of TCP connections waiting to be accepted — critical for Kafka which handles thousands of connections. vm.overcommit_memory=1 tells the kernel to always 'trust' memory allocation requests — needed for Java's JVM which greedily allocates virtual memory at startup. Changes made with sysctl -w are temporary (lost on reboot). To persist: add to /etc/sysctl.conf and run sysctl -p."
        },

        {
            id: "os_ex15",
            difficulty: "Hard",
            title: "Security — Permission Model & Process Isolation",
            description: "Explore Linux's security model: permission bits, process isolation, and why one process cannot read another's memory.",
            starterCode: `# Q1: Create files with different permission levels
$ mkdir ~/security_test && cd ~/security_test
$ echo "public data" > public.txt   && chmod 644 public.txt
$ echo "owner only"  > private.txt  && chmod 600 private.txt
$ echo "executable"  > script.sh    && chmod 755 script.sh
$ ls -la

# Q2: See your effective user/group IDs
$ id

# Q3: Can you read another user's private files?
$ ls -la /root/.bashrc 2>&1 || echo "Permission denied"

# Q4: Process isolation — processes cannot read each other's memory
$ cat /proc/1/mem 2>&1 | head -2   # Try to read systemd's memory

# Q5: What is the sticky bit (/tmp)?
$ ls -la / | grep tmp

# Q6: Check who can write to /etc/passwd (critical file)
$ ls -la /etc/passwd /etc/shadow`,
            solution: `$ ls -la ~/security_test/
total 24
drwxr-xr-x 2 anuj anuj 4096 public.txt  ← rw-r--r-- = owner rw, others ro
-rw-r--r-- 1 anuj anuj   12 public.txt   (644)
-rw------- 1 anuj anuj   10 private.txt  ← rw------- = ONLY owner can access (600)
-rwxr-xr-x 1 anuj anuj   11 script.sh    ← rwxr-xr-x = exec for all (755)

$ id
uid=1000(anuj) gid=1000(anuj) groups=1000(anuj),4(adm),27(sudo),998(docker)
# uid=1000 is what the kernel uses for all permission checks
# groups membership determines group-permission access

$ ls -la /root/.bashrc 2>&1
ls: cannot access '/root/.bashrc': Permission denied
# root's home (/root) has drwx------ → only root can read/write/enter

$ cat /proc/1/mem 2>&1 | head -1
cat: /proc/1/mem: Operation not permitted
# Linux enforces process isolation at the KERNEL level
# You cannot read another process's memory — hardware + kernel prevents it
# (only allowed: own process, or root with ptrace capability)

$ ls -la / | grep tmp
drwxrwxrwt 14 root root 4096 tmp
# drwxrwxrwt — note the 't' at end = STICKY BIT
# World-writable (rwxrwxrwx) BUT sticky bit = you can only DELETE your own files
# Without sticky bit: anyone could delete anyone's files in /tmp!

$ ls -la /etc/passwd /etc/shadow
-rw-r--r-- 1 root root   2847 /etc/passwd  ← world-readable (usernames public)
-rw-r----- 1 root shadow 1456 /etc/shadow  ← only root+shadow group (hashed passwords)`,
            explanation: "chmod 600 (rw-------)  is the most restrictive regular file permission — only the owner can read or write. Used for SSH private keys (~/.ssh/id_rsa) and credential files. chmod 644 is typical for data files — owner can edit, others can read. chmod 755 is typical for scripts and directories — everyone can read/execute, only owner can modify. Sticky bit (t at end): on /tmp, prevents users from deleting each other's files even though the directory is world-writable. /etc/shadow stores hashed passwords — readable only by root and the 'shadow' group — if this were world-readable, attackers could crack passwords offline. Process isolation: the kernel's process table maps each PID to an owner UID. ptrace() system call (used by strace/gdb) requires either same UID or root privilege to inspect another process's memory."
        },

        {
            id: "os_ex16",
            difficulty: "Hard",
            title: "Inter-Process Communication — Pipes and Sockets",
            description: "Explore how processes communicate with each other — the OS mechanisms for passing data between programs.",
            starterCode: `# IPC = Inter-Process Communication
# Processes need to share data but have isolated memory

# Q1: Named pipe (FIFO) — two processes talking
$ mkfifo /tmp/my_pipe
$ echo "hello from producer" > /tmp/my_pipe &   # producer (background)
$ cat /tmp/my_pipe                               # consumer reads it
$ rm /tmp/my_pipe

# Q2: Pipe in shell (|) — inline IPC
$ ps aux | grep python | grep -v grep | awk '{print \$1, \$11}'

# Q3: See all network sockets (processes talking over network)
$ ss -tuln | head -15

# Q4: Unix domain sockets (local IPC, faster than network)
$ ls -la /var/run/*.sock 2>/dev/null | head -5

# Q5: Shared memory usage
$ ipcs -m | head -10              # System V shared memory segments`,
            solution: `$ mkfifo /tmp/my_pipe
$ ls -la /tmp/my_pipe
prw-r--r-- 1 anuj anuj 0 /tmp/my_pipe   ← 'p' = named pipe (FIFO)

$ echo "hello from producer" > /tmp/my_pipe &   # blocked until someone reads
[1] 4812
$ cat /tmp/my_pipe
hello from producer    ← received from the pipe!
[1]+ Done

# Q2: Classic Unix pipeline — stdout of ps aux → stdin of grep → awk
$ ps aux | grep python | grep -v grep | awk '{print \$1, \$11}'
anuj /usr/bin/python3

# Q3: Network sockets — services listening for connections
$ ss -tuln | head -8
Netid  State   Recv-Q Send-Q  Local Address:Port
tcp    LISTEN    0     4096    127.0.0.1:5432    ← PostgreSQL (only localhost)
tcp    LISTEN    0     128     0.0.0.0:22        ← SSH (all interfaces)
tcp    LISTEN    0     128     0.0.0.0:9092      ← Kafka (all interfaces)
udp    UNCONN    0     0       0.0.0.0:68        ← DHCP client

# Q4: Unix sockets — faster than network for local IPC
$ ls -la /var/run/*.sock 2>/dev/null
srw-rw---- 1 postgres postgres  /var/run/postgresql/.s.PGSQL.5432  ← Postgres!
srw-rw-rw- 1 root     root      /var/run/docker.sock               ← Docker!
# Python's psycopg2 connects via this socket (no network overhead!)

$ ipcs -m | head -5
------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch
0x00000000 32768      postgres   600        56         5     ← PostgreSQL shared buffer!
# PostgreSQL uses shared memory for its buffer pool`,
            explanation: "Pipes (|) are the most basic IPC — stdout of one process becomes stdin of the next. The kernel creates an in-memory buffer; the first process writes, the second reads. Named pipes (FIFO) allow unrelated processes to communicate through a filesystem path. Network sockets: ss -tuln shows what services are listening. Port 5432=PostgreSQL, 22=SSH, 9092=Kafka, 8080=common web. 0.0.0.0 = listening on all network interfaces. 127.0.0.1 = localhost only (not accessible from outside). Unix domain sockets (/var/run/*.sock) are like network sockets but within one machine — no TCP overhead. Python to PostgreSQL often uses /var/run/postgresql/.s.PGSQL.5432 — 5-10x faster than TCP loopback."
        },

        {
            id: "os_ex17",
            difficulty: "Hard",
            title: "The Data Engineer's OS Performance Toolkit",
            description: "Build a comprehensive OS monitoring script for data engineering workloads — combining everything learned.",
            starterCode: `# Create a reusable system health check script

cat > ~/system_health.sh << 'HEALTHEOF'
#!/bin/bash
echo "════════════════════════════════════════"
echo "SYSTEM HEALTH REPORT: \$(date)"
echo "Server: \$(hostname)"
echo "════════════════════════════════════════"

echo ""
echo "── UPTIME & LOAD ──────────────────────"
uptime

echo ""
echo "── CPU ────────────────────────────────"
echo "Cores: \$(nproc)"
echo "Load per core: \$(python3 -c "import os; print(f'{os.getloadavg()[0]/os.cpu_count():.1%}')")"

echo ""
echo "── MEMORY ─────────────────────────────"
free -h

echo ""
echo "── DISK ───────────────────────────────"
df -h | grep -E "^/|Filesystem"

echo ""
echo "── TOP 5 PROCESSES (CPU) ──────────────"
ps aux --sort=-%cpu --no-headers | head -5 | awk '{printf "PID=%s CPU=%s%% MEM=%s%% CMD=%s\n", \$2, \$3, \$4, \$11}'

echo ""
echo "── TOP 5 PROCESSES (MEM) ──────────────"
ps aux --sort=-%mem --no-headers | head -5 | awk '{printf "PID=%s CPU=%s%% MEM=%s%% CMD=%s\n", \$2, \$3, \$4, \$11}'

echo ""
echo "── OOM EVENTS (last 24h) ──────────────"
dmesg | grep -i "oom\|killed process" | tail -5 || echo "No OOM events"

echo ""
echo "── NETWORK LISTENERS ──────────────────"
ss -tuln | grep LISTEN | awk '{print \$5}' | sort -u

echo "════════════════════════════════════════"
HEALTHEOF

chmod +x ~/system_health.sh
~/system_health.sh`,
            solution: `$ ~/system_health.sh
════════════════════════════════════════
SYSTEM HEALTH REPORT: Sat Mar  9 10:47:00 UTC 2024
Server: prod-spark-master-01
════════════════════════════════════════

── UPTIME & LOAD ──────────────────────
 10:47:00 up 10 days, load average: 2.45, 1.87, 1.24

── CPU ────────────────────────────────
Cores: 8
Load per core: 30.6%    ← healthy (under 80% per core)

── MEMORY ─────────────────────────────
              total   used   free  buff/cache  available
Mem:           15Gi   6.2Gi  1.1Gi    8.1Gi      8.8Gi
Swap:           2Gi   0       2Gi

── DISK ───────────────────────────────
Filesystem     Size  Used Avail Use%  Mounted on
/dev/sda1       50G   22G   26G  46%  /
/dev/sdb1        2T  800G  1.2T  40%  /data

── TOP 5 PROCESSES (CPU) ──────────────
PID=4521 CPU=45.2% MEM=25.4% CMD=java
PID=4522 CPU=12.1% MEM=8.2%  CMD=python3
PID=892  CPU=0.0%  MEM=0.2%  CMD=/usr/sbin/sshd

── TOP 5 PROCESSES (MEM) ──────────────
PID=4521 CPU=45.2% MEM=25.4% CMD=java        ← Spark executor
PID=4522 CPU=12.1% MEM=8.2%  CMD=python3

── OOM EVENTS (last 24h) ──────────────
No OOM events     ← Clean! No memory crises

── NETWORK LISTENERS ──────────────────
0.0.0.0:22      ← SSH
0.0.0.0:9092    ← Kafka
127.0.0.1:5432  ← PostgreSQL (local only)
0.0.0.0:8080    ← Airflow webserver

════════════════════════════════════════`,
            explanation: "This script is a practical toolkit that combines all the OS diagnostic commands learned in this chapter. os.getloadavg()[0]/os.cpu_count() calculates load per core — the meaningful metric (load of 4 on 4 cores = 100% utilization, same load on 8 cores = 50%). The heredoc (cat << 'HEALTHEOF' ... HEALTHEOF) creates multi-line file content from the terminal — the single quotes around HEALTHEOF prevent variable expansion during writing, so \\$variables are literally written. Run this script every 5 minutes via cron: */5 * * * * /home/anuj/system_health.sh >> /var/log/health.log. Understanding every line of this output is the mark of a production-ready data engineer."
        },

        {
            id: "os_ex18",
            difficulty: "Hard",
            title: "OS Knowledge Integration — Full System Understanding",
            description: "A final comprehensive test connecting all OS concepts — from hardware to process management to filesystem to security.",
            starterCode: `# INTEGRATION TEST — Use everything learned

# Q1: Complete stack trace — what happens when you type "ls"?
# (Answer conceptually based on what you learned)

# Q2: Verify the stack by counting syscalls
$ strace -c ls > /dev/null 2>&1 || strace -c ls /tmp 2>&1 | tail -8

# Q3: See the full process family tree for this terminal session
$ pstree -p \$\$

# Q4: How does the OS know who you are? Check all sources
$ echo "Shell UID: \$UID"
$ cat /etc/passwd | grep "^\$USER:"
$ id

# Q5: What kernel feature makes your Spark job's memory isolated?
$ cat /proc/\$\$/maps | head -5  # Virtual memory map of current bash process

# Q6: The complete picture — everything in one command
$ uname -r && echo "Kernel" && \
  ps -p 1 -o comm | tail -1 && echo "Init System" && \
  free -h | grep Mem | awk '{print \$2}' && echo "Total RAM" && \
  df -h / | tail -1 | awk '{print \$5}' && echo "Root disk used" && \
  ps aux | wc -l && echo "Running processes"`,
            solution: `# Q1: What happens when you type "ls"
# 1. bash (shell) reads your keystrokes via read() syscall on /dev/pts/0
# 2. bash searches PATH env var for 'ls' → finds /usr/bin/ls
# 3. bash calls fork() → creates child process (copy of bash)
# 4. child calls exec("/usr/bin/ls") → replaces itself with ls binary
# 5. ls's code runs, calls openat() to open the directory
# 6. kernel validates permissions, returns file descriptor
# 7. ls calls getdents() to read directory entries (inodes + names)
# 8. ls calls stat() on each file to get metadata (size, perms, etc.)
# 9. ls calls write(1, ...) to print to stdout (fd 1 = terminal)
# 10. write goes to kernel → kernel sends bytes to /dev/pts/0 → terminal shows output
# 11. ls calls exit() → child process terminates
# 12. bash gets SIGCHLD, resumes waiting for next command

$ strace -c ls /tmp 2>&1 | tail -8
% time  seconds  calls  syscall
 38.2   0.00245    124  mmap
 22.1   0.00142     71  read
 12.4   0.00080     41  openat
  9.8   0.00063     42  close
  7.2   0.00046     18  getdents64    ← reading directory entries
  4.1   0.00026     16  newfstatat    ← getting file metadata
Total: 437 calls

$ pstree -p \$\$
bash(2847)---pstree(4921)
# pstree itself is a child of bash!

$ echo "Shell UID: \$UID"; cat /etc/passwd | grep "^\$USER:"; id
Shell UID: 1000
anuj:x:1000:1000:Anuj Sharma,,,:/home/anuj:/bin/bash
uid=1000(anuj) gid=1000(anuj) groups=1000(anuj),27(sudo),998(docker)

$ cat /proc/\$\$/maps | head -3
55a8b4200000-55a8b422b000 r--p 00000000 08:01 2097281  /usr/bin/bash
55a8b422b000-55a8b42f5000 r-xp 0002b000 08:01 2097281  /usr/bin/bash
7f2c4a000000-7f2c4a028000 r--p 00000000 08:01 131072   /usr/lib/x86_64-linux-gnu/libc.so.6
# Each line = virtual address range : permissions : file mapped in

$ uname -r && echo "Kernel" && ps -p 1 -o comm | tail -1 && echo "Init System" && free -h | grep Mem | awk '{print \$2}' && echo "Total RAM" && df -h / | tail -1 | awk '{print \$5}' && echo "Root disk used" && ps aux | wc -l && echo "Running processes"
5.15.0-91-generic
Kernel
systemd
Init System
15Gi
Total RAM
46%
Root disk used
147
Running processes`,
            explanation: "The ls execution chain demonstrates all OS concepts at once: process creation (fork+exec), filesystem access (openat, getdents), system calls, and I/O. /proc/PID/maps shows the virtual address space layout — each line is a region of virtual memory mapped to either a file (code, shared libraries) or anonymous memory (heap, stack). r--p = read-only private. r-xp = read+execute private (code). The process isolation you see here (each process has its own maps) is enforced by the MMU using per-process page tables. This is the fundamental reason why one process crashing doesn't corrupt another — their virtual address spaces are completely separate at the hardware level."
        },

        {
            id: "os_ex19",
            difficulty: "Hard",
            title: "Simulate and Recover from Common Production OS Failures",
            description: "Practice the investigation and recovery procedures for the most common OS-level failures in data engineering environments.",
            starterCode: `# FAILURE 1: Disk space critical
$ df -h /
# Simulate investigation:
$ du -sh /var/* 2>/dev/null | sort -rh | head -5
$ find /var/log -name "*.log" -size +100M 2>/dev/null | head -5
$ find /tmp -atime +7 2>/dev/null | wc -l   # Files not accessed in 7 days

# FAILURE 2: Process consuming too much CPU
# Find it and reduce its priority:
$ ps aux --sort=-%cpu | head -5
# For a specific PID (replace 1234):
# renice +10 1234   # Lower priority
# kill -STOP 1234   # Pause it
# kill -CONT 1234   # Resume it

# FAILURE 3: "Permission denied" on a data directory
$ ls -la /data 2>/dev/null || echo "Cannot list /data"
$ stat /data 2>/dev/null | grep -E "Uid|Gid|Access"
# Fix would be: sudo chown -R anuj:anuj /data or sudo chmod 755 /data

# FAILURE 4: Service not responding
$ systemctl is-active postgresql || echo "PostgreSQL down"
$ journalctl -u postgresql --since "1 hour ago" | tail -20`,
            solution: `# FAILURE 1: Disk space investigation
$ df -h /
Filesystem     Size  Used Avail Use%  Mounted on
/dev/sda1       50G   49G  800M  99%  /   ← CRITICAL!

$ du -sh /var/* 2>/dev/null | sort -rh | head -3
15G   /var/log        ← logs are eating disk!
2.1G  /var/lib
 450M /var/cache

$ find /var/log -name "*.log" -size +100M 2>/dev/null
/var/log/syslog         (12GB - runaway syslog!)
/var/log/nginx/access.log (1.2GB)

# Investigation reveals: a misbehaving app is spamming syslog
# Recovery:
# sudo truncate -s 0 /var/log/syslog   # Empty log immediately
# sudo journalctl --vacuum-size=1G     # Clean old journal logs
# sudo apt autoremove && apt clean     # Clean package cache

$ find /tmp -atime +7 2>/dev/null | wc -l
1247    # 1247 old temp files — safe to clean
# Recovery: sudo find /tmp -atime +7 -delete

# FAILURE 2: CPU hog
$ ps aux --sort=-%cpu | head -3
USER   PID %CPU %MEM  COMMAND
anuj  9821 99.8  2.1  python3 infinite_loop.py

$ renice +15 9821    # Drop priority drastically
$ ps -p 9821 -o pid,ni
  PID  NI
 9821  15    ← now has lower priority

# FAILURE 3: Permission denied
$ ls -la /data 2>/dev/null || echo "Cannot list /data"
Cannot list /data
$ stat /data | grep -E "Uid|Gid|Access"
Uid: (    0/    root)   Gid: (    0/    root)
Access: (0700/drwx------)   ← root-only!
# Fix: sudo chown -R anuj:anuj /data

# FAILURE 4: Service down
$ systemctl is-active postgresql
inactive    ← down!
$ journalctl -u postgresql --since "1 hour ago" | tail -5
Mar 09 10:30:15 postgresql[5432]: FATAL: could not create lock file "/var/run/postgresql/.s.PGSQL.5432.lock": No space left on device
# ROOT CAUSE: disk full → PostgreSQL can't create lock file → fails to start
# Chain: disk full → service fails → app can't connect → everything breaks`,
            explanation: "Production failures rarely have a single cause — they cascade. This exercise shows the most common cascade: disk full → services can't write lock/temp files → services fail to start → applications can't connect → users see errors. The investigation pattern: check the symptom (service down), check the logs (journalctl), find the root cause (disk full). truncate -s 0 file empties a log file without deleting it (important: running processes have the file open by fd; deleting would free space only after they close it; truncating immediately frees space). renice changes priority of a running process without stopping it — useful when a runaway job needs to be throttled without killing it. Each failure scenario maps to a specific OS subsystem: disk=filesystem, CPU=scheduler, permissions=security model, services=init system."
        },

        {
            id: "os_ex20",
            difficulty: "Hard",
            title: "Build Your OS Mental Model — The Complete Picture",
            description: "A reflection and synthesis exercise: draw the complete OS knowledge map from hardware to your data pipelines.",
            starterCode: `# FINAL EXERCISE: Connect every OS concept to your work

# 1. The complete chain: your Python open() to actual disk
# Trace each layer:
$ strace -e trace=openat,read,write python3 -c "
data = open('/proc/version').read()
print('Kernel:', data[:40])
" 2>&1

# 2. How processes see each other (process namespace)
$ ls /proc | grep "^[0-9]" | wc -l    # How many processes have entries?
$ ls /proc | grep "^[0-9]" | sort -n | head -5   # Lowest PIDs (oldest)
$ ls /proc | grep "^[0-9]" | sort -n | tail -5   # Highest PIDs (newest)

# 3. Your complete session lineage
$ pstree -p \$\$                # Who spawned this bash?
$ cat /proc/\$\$/environ | tr '\\0' '\\n' | grep -E "^HOME|^USER|^SHELL|^PATH" | head -5

# 4. The OS as a resource allocator — see everything it manages
$ echo "Processes: \$(ps aux | wc -l)"
$ echo "Open files: \$(lsof 2>/dev/null | wc -l)"
$ echo "Network connections: \$(ss -t | wc -l)"
$ echo "Disk I/O ops/sec: \$(iostat 2>/dev/null | grep sda | awk '{print \$4}')"

# 5. One final synthesis
$ cat << 'EOF'
The OS is:
- A REFEREE (CPU time allocation between competing processes)
- A TRANSLATOR (hardware ↔ application via drivers + syscalls)
- A PROTECTOR (memory isolation, permission enforcement)
- A LIBRARIAN (filesystem: name→inode→data mapping)
- A CONCIERGE (providing services: networking, logging, time)
EOF`,
            solution: `$ strace -e trace=openat,read,write python3 -c "
data = open('/proc/version').read()
print('Kernel:', data[:40])
" 2>&1
openat(AT_FDCWD, "/proc/version", O_RDONLY|O_CLOEXEC) = 3
# ^kernel opens /proc/version, returns fd=3
read(3, "Linux version 5.15.0-91-generic", 32768) = 132
# ^kernel reads 132 bytes from fd=3 (the /proc/version virtual file)
close(3) = 0
write(1, "Kernel: Linux version 5.15.0-91-", 32) = 32
# ^writes our print() output to fd=1 (stdout)
Kernel: Linux version 5.15.0-91-generic

$ ls /proc | grep "^[0-9]" | wc -l
146    # 146 running processes have entries in /proc

$ ls /proc | grep "^[0-9]" | sort -n | head -3
1      # systemd (PID 1) — oldest
2      # kthreadd — kernel thread manager
3      # kernel threads

$ ls /proc | grep "^[0-9]" | sort -n | tail -3
4918   # recently started process
4919
4920   # most recently created process

$ pstree -p \$\$
sshd(892)---sshd(2846)---bash(2847)---pstree(4921)
# Lineage: SSH daemon → your session → bash → pstree

$ cat /proc/\$\$/environ | tr '\\0' '\\n' | grep -E "^HOME|^USER|^SHELL|^PATH" | head -4
HOME=/home/anuj
USER=anuj
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

$ echo "Processes: \$(ps aux | wc -l)"; echo "Open files: \$(lsof 2>/dev/null | wc -l)"
Processes: 147
Open files: 4823    # 4823 file descriptors open across all processes!

The OS is:
- A REFEREE (CPU time allocation between competing processes)
- A TRANSLATOR (hardware ↔ application via drivers + syscalls)
- A PROTECTOR (memory isolation, permission enforcement)
- A LIBRARIAN (filesystem: name→inode→data mapping)
- A CONCIERGE (providing services: networking, logging, time)`,
            explanation: "This final exercise brings together every concept: the strace output shows the complete syscall chain for a simple Python one-liner. /proc/1 always exists as long as the system is running — systemd (PID 1) is the heartbeat of the OS. Process IDs increase monotonically (until they wrap at ~4 million) — lower PIDs = older processes. Process environment variables (in /proc/PID/environ) are separated by null bytes (\\0), not newlines — tr '\\0' '\\n' converts them. 4823 open files across 147 processes means ~33 open file descriptors per process on average — sockets, pipes, log files, config files, shared libraries, all count. The five-role summary captures the entire purpose of an OS in one mental model: referee, translator, protector, librarian, concierge. Every command you've learned in this chapter connects to one of these roles."
        }
    ],

    summary: `
<h3>📋 Chapter Summary: What Is an Operating System & How It Works</h3>

<div class="tip-box">
    <h4>✅ Complete Knowledge Map</h4>
    <p>
        <strong>The OS exists</strong> because hardware is dumb (can only execute binary instructions) and applications are helpless (can't touch hardware directly). The OS is the translator and manager in between.
    </p>
    <p>
        <strong>Two Worlds:</strong> User Space (Ring 3, restricted) and Kernel Space (Ring 0, full hardware access). The hardware-enforced boundary between them is crossed ONLY via system calls — the kernel's official request interface.
    </p>
    <p>
        <strong>The 6 Core Jobs:</strong> CPU management (scheduling/time-slicing), Memory management (virtual memory/paging), Filesystem management (inodes/blocks/cache), Device management (drivers/interrupts), Security & access control (permissions/process isolation), Inter-process communication (pipes/sockets).
    </p>
    <p>
        <strong>Processes:</strong> Every program is a process with a unique PID. Created via fork()+exec(). Every process traces ancestry back to PID 1 (systemd). The scheduler time-slices CPU giving each process 5-20ms — creating the illusion of parallelism.
    </p>
    <p>
        <strong>Memory:</strong> Virtual memory gives each process an isolated address space — they cannot read each other's memory. The MMU (hardware) enforces this via page tables. Linux uses free RAM as page cache for recently accessed files. OOM Killer terminates high-memory processes when RAM is exhausted.
    </p>
    <p>
        <strong>Filesystem:</strong> Filenames are just labels in directories. Inodes store all metadata. Data lives in disk blocks pointed to by inodes. Renaming within the same filesystem is instant (one directory entry change). Hard links share inodes. Journaling prevents corruption on power failure.
    </p>
    <p>
        <strong>System Calls:</strong> The ONLY way programs get anything done. Every file open, network connection, memory allocation goes through: user code → C library → syscall instruction → kernel mode → hardware → back to user mode. strace shows every syscall a program makes.
    </p>
    <p>
        <strong>Linux = Kernel + GNU + Distro:</strong> Linus Torvalds wrote the kernel. GNU Project wrote the tools (bash, ls, cat...). Ubuntu/Debian/CentOS add packaging and configuration. uname -r shows kernel version independently of distro version.
    </p>
    <p>
        <strong>For Data Engineers:</strong> Every performance problem traces to one OS subsystem — CPU scheduler (load average), memory manager (OOM/swap), filesystem (iowait), or network stack (socket buffers). Learn to read top, free, iostat, vmstat, and dmesg fluently.
    </p>
</div>

<div class="info-box">
    <h4>📚 Next: File Operations (cp, mv, rm, mkdir, touch, chmod)</h4>
    <p>With deep OS and filesystem knowledge, you're now ready to master the commands that create, copy, move, delete, and protect files and directories — the hands-on manipulation of everything the OS manages.</p>
</div>
`

}; // end operatingSystem