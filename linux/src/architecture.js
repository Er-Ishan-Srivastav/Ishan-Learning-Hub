// ============================================================
// architecture.js — Linux Architecture
// myPathshala Linux Programming Platform
// Variable: linuxArchitecture
// ============================================================

var linuxArchitecture = {

    title: "Linux Architecture",
    description: "Understanding kernel space, user space, and how everything fits together",
    breadcrumb: "Getting Started > Linux Architecture",

    sections: [

        // ── SECTION 1: Big Picture ──
        {
            id: "big_picture",
            content: `
<h3>🏗️ The Big Picture: How Linux Is Organized</h3>

<div class="story-box">
    <h4>🏨 The Hotel Analogy</h4>
    <p>Think of Linux as a luxury hotel. The <strong>hardware</strong> is the physical building — walls, plumbing, electricity. The <strong>kernel</strong> is the building's management system — it controls who gets a room (CPU time), how much water flows (memory), which doors can be opened (device access). The <strong>shell</strong> is the front desk — you speak to it in a language you understand, and it translates your requests into building operations. <strong>Applications</strong> are the guests — they enjoy the services without needing to know how the plumbing works.</p>
</div>

<div class="visual-container">
    <svg viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="archAppGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#22d3ee;stop-opacity:0.18"/>
                <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0.04"/>
            </linearGradient>
            <linearGradient id="archLibGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#a78bfa;stop-opacity:0.18"/>
                <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:0.04"/>
            </linearGradient>
            <linearGradient id="archKernGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#f87171;stop-opacity:0.18"/>
                <stop offset="100%" style="stop-color:#f87171;stop-opacity:0.04"/>
            </linearGradient>
            <linearGradient id="archHWGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#64748b;stop-opacity:0.25"/>
                <stop offset="100%" style="stop-color:#64748b;stop-opacity:0.10"/>
            </linearGradient>
        </defs>

        <text x="380" y="26" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="Space Grotesk">Linux Architecture — Layered Model</text>

        <!-- Layer 4: User Applications -->
        <rect x="30" y="42" width="700" height="90" rx="12" fill="url(#archAppGrad)" stroke="#22d3ee" stroke-width="2"/>
        <text x="380" y="68" text-anchor="middle" fill="#22d3ee" font-size="13" font-weight="bold" font-family="JetBrains Mono">USER SPACE — Applications</text>
        <text x="100"  y="98" text-anchor="middle" fill="#94a3b8" font-size="11">Python</text>
        <text x="190"  y="98" text-anchor="middle" fill="#94a3b8" font-size="11">Spark</text>
        <text x="280"  y="98" text-anchor="middle" fill="#94a3b8" font-size="11">TensorFlow</text>
        <text x="380"  y="98" text-anchor="middle" fill="#94a3b8" font-size="11">Docker</text>
        <text x="470"  y="98" text-anchor="middle" fill="#94a3b8" font-size="11">vim</text>
        <text x="560"  y="98" text-anchor="middle" fill="#94a3b8" font-size="11">Browsers</text>
        <text x="660"  y="98" text-anchor="middle" fill="#94a3b8" font-size="11">Airflow</text>
        <text x="380"  y="120" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">→ "Ring 3" — restricted, cannot directly access hardware</text>

        <!-- Divider label -->
        <line x1="30" y1="148" x2="730" y2="148" stroke="#334155" stroke-width="1" stroke-dasharray="6,3"/>
        <rect x="290" y="140" width="180" height="16" rx="4" fill="#0a0e17"/>
        <text x="380" y="152" text-anchor="middle" fill="#fbbf24" font-size="10" font-family="JetBrains Mono">USER SPACE / KERNEL SPACE BOUNDARY</text>

        <!-- Layer 3: System Libraries & Shell -->
        <rect x="30" y="162" width="700" height="90" rx="12" fill="url(#archLibGrad)" stroke="#a78bfa" stroke-width="2"/>
        <text x="380" y="188" text-anchor="middle" fill="#a78bfa" font-size="13" font-weight="bold" font-family="JetBrains Mono">SHELL &amp; SYSTEM LIBRARIES</text>
        <text x="140" y="218" text-anchor="middle" fill="#94a3b8" font-size="11">bash / zsh / sh</text>
        <text x="300" y="218" text-anchor="middle" fill="#94a3b8" font-size="11">glibc (GNU C Library)</text>
        <text x="460" y="218" text-anchor="middle" fill="#94a3b8" font-size="11">GNU Coreutils</text>
        <text x="620" y="218" text-anchor="middle" fill="#94a3b8" font-size="11">libpthread, libm</text>
        <text x="380" y="242" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">→ Translates high-level calls into kernel system calls (syscalls)</text>

        <!-- System Call Interface -->
        <rect x="30" y="266" width="700" height="30" rx="6" fill="#182035" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="380" y="286" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">SYSTEM CALL INTERFACE (syscalls: read, write, fork, exec, open...)</text>

        <!-- Layer 2: Kernel Space -->
        <rect x="30" y="308" width="700" height="100" rx="12" fill="url(#archKernGrad)" stroke="#f87171" stroke-width="2"/>
        <text x="380" y="332" text-anchor="middle" fill="#f87171" font-size="13" font-weight="bold" font-family="JetBrains Mono">KERNEL SPACE — Linux Kernel</text>
        <text x="380" y="352" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">→ "Ring 0" — full hardware access, runs in privileged mode</text>

        <rect x="50"  y="360" width="140" height="36" rx="6" fill="#131a2b" stroke="#f87171" stroke-width="1"/>
        <text x="120" y="382" text-anchor="middle" fill="#f87171" font-size="10" font-family="JetBrains Mono">Process Mgmt</text>

        <rect x="205" y="360" width="140" height="36" rx="6" fill="#131a2b" stroke="#f87171" stroke-width="1"/>
        <text x="275" y="382" text-anchor="middle" fill="#f87171" font-size="10" font-family="JetBrains Mono">Memory Mgmt</text>

        <rect x="360" y="360" width="140" height="36" rx="6" fill="#131a2b" stroke="#f87171" stroke-width="1"/>
        <text x="430" y="382" text-anchor="middle" fill="#f87171" font-size="10" font-family="JetBrains Mono">File Systems</text>

        <rect x="515" y="360" width="140" height="36" rx="6" fill="#131a2b" stroke="#f87171" stroke-width="1"/>
        <text x="585" y="382" text-anchor="middle" fill="#f87171" font-size="10" font-family="JetBrains Mono">Device Drivers</text>

        <!-- Layer 1: Hardware -->
        <rect x="30" y="422" width="700" height="28" rx="8" fill="url(#archHWGrad)" stroke="#64748b" stroke-width="1.5"/>
        <text x="380" y="440" text-anchor="middle" fill="#64748b" font-size="12" font-weight="bold" font-family="JetBrains Mono">HARDWARE — CPU · RAM · Disk · Network Card · GPU</text>
    </svg>
    <div class="caption">The layered architecture ensures applications can NEVER directly touch hardware — everything goes through the kernel for safety and security</div>
</div>

<h4>Why Layers Matter</h4>
<p>Each layer serves a critical purpose:</p>
<ul>
    <li><strong>Portability:</strong> Applications don't need to know if you're running on Intel, AMD, or ARM processors. The kernel abstracts all of that.</li>
    <li><strong>Security:</strong> A buggy Python script cannot corrupt your filesystem or crash the kernel. It only crashes itself.</li>
    <li><strong>Stability:</strong> Multiple applications share the same hardware resources without interfering with each other.</li>
    <li><strong>Modularity:</strong> You can swap out pieces (use a different filesystem, add a new device driver) without rebuilding everything.</li>
</ul>
            `
        },

        // ── SECTION 2: Kernel Space vs User Space ──
        {
            id: "kernel_vs_user",
            content: `
<h3>⚔️ Kernel Space vs User Space</h3>

<p>This is the most important architectural concept in Linux — and it comes up in data engineering when you're debugging container permissions, memory limits, and system call overhead.</p>

<div class="visual-container">
    <svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Kernel Space vs User Space — Protection Rings</text>

        <!-- Concentric rings diagram -->
        <!-- Ring 0 - Kernel -->
        <circle cx="360" cy="190" r="135" fill="#1a0808" stroke="#f87171" stroke-width="2.5"/>
        <text x="360" y="100" text-anchor="middle" fill="#f87171" font-size="13" font-weight="bold" font-family="JetBrains Mono">Ring 0</text>
        <text x="360" y="118" text-anchor="middle" fill="#f87171" font-size="11" font-family="JetBrains Mono">KERNEL</text>
        <text x="360" y="140" text-anchor="middle" fill="#64748b" font-size="10">Full hardware access</text>
        <text x="360" y="156" text-anchor="middle" fill="#64748b" font-size="10">Can crash entire system</text>
        <text x="360" y="172" text-anchor="middle" fill="#64748b" font-size="10">Runs: process scheduler,</text>
        <text x="360" y="188" text-anchor="middle" fill="#64748b" font-size="10">memory allocator,</text>
        <text x="360" y="204" text-anchor="middle" fill="#64748b" font-size="10">device drivers,</text>
        <text x="360" y="220" text-anchor="middle" fill="#64748b" font-size="10">network stack</text>

        <!-- Ring 3 - User Space (outer area) -->
        <circle cx="360" cy="190" r="135" fill="none" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="8,4"/>

        <!-- User Space label (outside) -->
        <text x="70" y="180" text-anchor="middle" fill="#22d3ee" font-size="12" font-weight="bold" font-family="JetBrains Mono">Ring 3</text>
        <text x="70" y="196" text-anchor="middle" fill="#22d3ee" font-size="11" font-family="JetBrains Mono">USER SPACE</text>
        <text x="70" y="216" text-anchor="middle" fill="#64748b" font-size="9">Limited privileges</text>
        <text x="70" y="232" text-anchor="middle" fill="#64748b" font-size="9">Cannot directly</text>
        <text x="70" y="248" text-anchor="middle" fill="#64748b" font-size="9">access hardware</text>

        <!-- Syscall arrow -->
        <line x1="225" y1="190" x2="135" y2="190" stroke="#fbbf24" stroke-width="2" marker-end="url(#arrowYellow)"/>
        <defs>
            <marker id="arrowYellow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#fbbf24"/>
            </marker>
        </defs>
        <text x="182" y="182" text-anchor="middle" fill="#fbbf24" font-size="10" font-family="JetBrains Mono">syscall</text>
        <text x="182" y="198" text-anchor="middle" fill="#64748b" font-size="9">request</text>

        <!-- Return arrow -->
        <line x1="135" y1="210" x2="225" y2="210" stroke="#34d399" stroke-width="2" marker-end="url(#arrowGreen2)"/>
        <defs>
            <marker id="arrowGreen2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6" fill="#34d399"/>
            </marker>
        </defs>
        <text x="182" y="225" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">return</text>
        <text x="182" y="240" text-anchor="middle" fill="#64748b" font-size="9">result</text>

        <!-- User space apps (right side) -->
        <text x="560" y="150" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">python3</text>
        <text x="620" y="170" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">spark</text>
        <text x="590" y="200" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">docker</text>
        <text x="640" y="220" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">nginx</text>
        <text x="555" y="240" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">bash</text>

        <text x="360" y="320" text-anchor="middle" fill="#64748b" font-size="11" font-family="JetBrains Mono">System Call Interface = the only legal bridge between rings</text>
    </svg>
    <div class="caption">Protection rings: only the kernel runs in Ring 0 with full privileges. User applications always request services via system calls.</div>
</div>

<div class="deep-dive-box">
    <h4>🔬 What Happens When You Open a File in Python?</h4>
    <p>When your Python script runs <code>open("data.csv")</code>, here's the complete journey:</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">syscall_trace.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># Watch system calls in real-time with strace!</span>
<span class="prompt">$</span> strace python3 -c "open('data.csv')" 2>&1 | grep -E "open|read|stat"

<span class="output">execve("/usr/bin/python3", ["python3", "-c"...])  = 0</span>
<span class="output">openat(AT_FDCWD, "data.csv", O_RDONLY|O_CLOEXEC) = 3</span>
<span class="comment">#         ↑ syscall name          ↑ kernel returns fd=3</span>

<span class="comment"># The full journey for open("data.csv"):</span>
<span class="comment"># 1. Python calls C function fopen()</span>
<span class="comment"># 2. glibc translates to syscall: openat()</span>
<span class="comment"># 3. CPU switches from Ring 3 → Ring 0</span>
<span class="comment"># 4. Kernel checks permissions, finds file on disk</span>
<span class="comment"># 5. Kernel returns file descriptor (integer: 3)</span>
<span class="comment"># 6. CPU switches back Ring 0 → Ring 3</span>
<span class="comment"># 7. Python continues with the file object</span>

<span class="comment"># Count ALL syscalls made by a simple Python script:</span>
<span class="prompt">$</span> strace -c python3 -c "print('hello')" 2>&1 | tail -20</div>
</div>

<h4>Key Differences</h4>
<table class="comparison-table">
    <thead>
        <tr><th>Property</th><th>Kernel Space</th><th>User Space</th></tr>
    </thead>
    <tbody>
        <tr><td>CPU Ring</td><td>Ring 0 (privileged)</td><td>Ring 3 (restricted)</td></tr>
        <tr><td>Hardware Access</td><td>Direct, full access</td><td>Via syscalls only</td></tr>
        <tr><td>Memory Access</td><td>All physical memory</td><td>Only assigned virtual memory</td></tr>
        <tr><td>Crash Impact</td><td>Entire system crashes (kernel panic)</td><td>Only that process crashes</td></tr>
        <tr><td>Who Runs Here</td><td>Linux kernel, device drivers, kernel modules</td><td>All applications (Python, Spark, Docker, bash)</td></tr>
        <tr><td>Context Switch</td><td>—</td><td>Every syscall switches to kernel mode and back</td></tr>
    </tbody>
</table>

<div class="info-box">
    <h4>💡 Why This Matters for Data Engineering</h4>
    <p>Frequent syscalls have overhead. This is why libraries like NumPy and Pandas use optimized C extensions — fewer Python → C → syscall transitions means better performance. It's also why "zero-copy" techniques in Kafka and Arrow are powerful: they reduce kernel/user space data copying. Understanding this architecture helps you write faster data pipelines.</p>
</div>
            `
        },

        // ── SECTION 3: The Kernel Subsystems ──
        {
            id: "kernel_subsystems",
            content: `
<h3>🔧 Linux Kernel Subsystems</h3>

<p>The kernel isn't a monolithic black box — it's organized into specialized subsystems, each responsible for a specific area of system management.</p>

<div class="visual-container">
    <svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Linux Kernel Subsystems</text>

        <!-- Central Kernel box -->
        <rect x="280" y="140" width="160" height="80" rx="12" fill="#131a2b" stroke="#f87171" stroke-width="2"/>
        <text x="360" y="176" text-anchor="middle" fill="#f87171" font-size="13" font-weight="bold" font-family="JetBrains Mono">Linux</text>
        <text x="360" y="196" text-anchor="middle" fill="#f87171" font-size="13" font-weight="bold" font-family="JetBrains Mono">Kernel</text>
        <text x="360" y="213" text-anchor="middle" fill="#64748b" font-size="9">torvalds/linux</text>

        <!-- Process Management -->
        <rect x="30" y="40" width="175" height="80" rx="10" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="117" y="68" text-anchor="middle" fill="#22d3ee" font-size="12" font-weight="bold" font-family="JetBrains Mono">Process Mgmt</text>
        <text x="117" y="86" text-anchor="middle" fill="#64748b" font-size="10">Scheduling (CFS)</text>
        <text x="117" y="102" text-anchor="middle" fill="#64748b" font-size="10">fork() exec() wait()</text>
        <text x="117" y="115" text-anchor="middle" fill="#64748b" font-size="10">Signals &amp; PIDs</text>
        <line x1="205" y1="80" x2="280" y2="160" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="4,2"/>

        <!-- Memory Management -->
        <rect x="30" y="180" width="175" height="80" rx="10" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="117" y="208" text-anchor="middle" fill="#a78bfa" font-size="12" font-weight="bold" font-family="JetBrains Mono">Memory Mgmt</text>
        <text x="117" y="226" text-anchor="middle" fill="#64748b" font-size="10">Virtual Memory (VMM)</text>
        <text x="117" y="242" text-anchor="middle" fill="#64748b" font-size="10">Page Tables, Swap</text>
        <text x="117" y="255" text-anchor="middle" fill="#64748b" font-size="10">malloc → brk/mmap</text>
        <line x1="205" y1="220" x2="280" y2="200" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="4,2"/>

        <!-- VFS / Filesystems -->
        <rect x="30" y="270" width="175" height="80" rx="10" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
        <text x="117" y="298" text-anchor="middle" fill="#34d399" font-size="12" font-weight="bold" font-family="JetBrains Mono">Virtual FS (VFS)</text>
        <text x="117" y="316" text-anchor="middle" fill="#64748b" font-size="10">ext4, xfs, btrfs</text>
        <text x="117" y="332" text-anchor="middle" fill="#64748b" font-size="10">tmpfs, procfs, sysfs</text>
        <text x="117" y="345" text-anchor="middle" fill="#64748b" font-size="10">open() read() write()</text>
        <line x1="205" y1="310" x2="280" y2="210" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,2"/>

        <!-- Device Drivers -->
        <rect x="515" y="40" width="175" height="80" rx="10" fill="#131a2b" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="602" y="68" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold" font-family="JetBrains Mono">Device Drivers</text>
        <text x="602" y="86" text-anchor="middle" fill="#64748b" font-size="10">Block (disk, NVMe)</text>
        <text x="602" y="102" text-anchor="middle" fill="#64748b" font-size="10">Character (tty, GPU)</text>
        <text x="602" y="115" text-anchor="middle" fill="#64748b" font-size="10">Network (eth, wifi)</text>
        <line x1="515" y1="80" x2="440" y2="160" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="4,2"/>

        <!-- Network Stack -->
        <rect x="515" y="180" width="175" height="80" rx="10" fill="#131a2b" stroke="#fb923c" stroke-width="1.5"/>
        <text x="602" y="208" text-anchor="middle" fill="#fb923c" font-size="12" font-weight="bold" font-family="JetBrains Mono">Network Stack</text>
        <text x="602" y="226" text-anchor="middle" fill="#64748b" font-size="10">TCP/IP, UDP</text>
        <text x="602" y="242" text-anchor="middle" fill="#64748b" font-size="10">Sockets, Netfilter</text>
        <text x="602" y="255" text-anchor="middle" fill="#64748b" font-size="10">eBPF, tc, iptables</text>
        <line x1="515" y1="220" x2="440" y2="200" stroke="#fb923c" stroke-width="1.5" stroke-dasharray="4,2"/>

        <!-- IPC -->
        <rect x="515" y="270" width="175" height="80" rx="10" fill="#131a2b" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="602" y="298" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold" font-family="JetBrains Mono">IPC &amp; Security</text>
        <text x="602" y="316" text-anchor="middle" fill="#64748b" font-size="10">Pipes, Sockets, Signals</text>
        <text x="602" y="332" text-anchor="middle" fill="#64748b" font-size="10">Namespaces, cgroups</text>
        <text x="602" y="345" text-anchor="middle" fill="#64748b" font-size="10">SELinux, seccomp</text>
        <line x1="515" y1="310" x2="440" y2="210" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,2"/>
    </svg>
    <div class="caption">The kernel is organized into specialized subsystems — each handles a specific system resource</div>
</div>

<h4>What Each Subsystem Does (For Data Engineers)</h4>

<div class="cards-grid">
    <div class="mini-card">
        <h5>⚙️ Process Management (CFS Scheduler)</h5>
        <p>The Completely Fair Scheduler decides which process gets CPU time. When you run 10 Spark workers on a node, the kernel's scheduler fairly distributes CPU across them. <code>nice</code> and <code>taskset</code> commands influence this.</p>
    </div>
    <div class="mini-card">
        <h5>🧠 Memory Management (VMM)</h5>
        <p>Every process sees its own virtual address space. When Python allocates a NumPy array, it calls <code>malloc()</code> → kernel maps physical pages. OOM (Out of Memory) killer? That's when the kernel has to choose which process to kill to free memory.</p>
    </div>
    <div class="mini-card">
        <h5>📂 Virtual File System</h5>
        <p>The VFS provides a unified interface to all filesystems. Whether you're reading from ext4, NFS, or HDFS via FUSE — the application uses the same <code>open()/read()/write()</code> calls. In Linux, <em>everything is a file</em>.</p>
    </div>
    <div class="mini-card">
        <h5>🌐 Network Stack</h5>
        <p>Linux's TCP/IP stack is what makes Kafka, Spark, and distributed databases possible. Features like <strong>cgroups</strong> and <strong>namespaces</strong> (used by Docker) are part of the kernel's IPC/security subsystem.</p>
    </div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">kernel_exploration.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># Explore the running kernel</span>
<span class="prompt">$</span> uname -r                     <span class="comment"># Kernel version</span>
<span class="output">5.15.0-91-generic</span>

<span class="prompt">$</span> lsmod | wc -l                <span class="comment"># How many kernel modules loaded?</span>
<span class="output">103</span>

<span class="prompt">$</span> lsmod | head -5              <span class="comment"># List loaded modules</span>
<span class="output">Module                  Size  Used by</span>
<span class="output">nls_utf8               16384  1</span>
<span class="output">isofs                  53248  1</span>

<span class="prompt">$</span> cat /proc/meminfo | head -10  <span class="comment"># Kernel memory stats</span>
<span class="output">MemTotal:       16348272 kB</span>
<span class="output">MemFree:         8423456 kB</span>
<span class="output">MemAvailable:   10234892 kB</span>

<span class="prompt">$</span> cat /proc/cpuinfo | grep "model name" | head -1
<span class="output">model name : Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz</span>

<span class="prompt">$</span> cat /proc/loadavg             <span class="comment"># Live load average</span>
<span class="output">0.52 0.48 0.41 2/847 12345</span>
<span class="comment"># load1 load5 load15  running/total  last-pid</span></div>
</div>
            `
        },

        // ── SECTION 4: The Shell ──
        {
            id: "the_shell",
            content: `
<h3>🐚 The Shell: Your Interface to the Kernel</h3>

<div class="story-box">
    <h4>🔍 What Actually Happens When You Type a Command?</h4>
    <p>When you type <code>ls -la /home</code> and press Enter, a sophisticated chain of events unfolds in milliseconds. Understanding this chain makes you a better troubleshooter.</p>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Command Execution Pipeline</text>

        <!-- Step boxes -->
        <rect x="10"  y="45" width="100" height="60" rx="8" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="60"  y="73" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">You Type</text>
        <text x="60"  y="90" text-anchor="middle" fill="#64748b" font-size="10">ls -la /home</text>

        <text x="120" y="80" fill="#fbbf24" font-size="16">→</text>

        <rect x="130" y="45" width="115" height="60" rx="8" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="187" y="68" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold" font-family="JetBrains Mono">Shell Parses</text>
        <text x="187" y="84" text-anchor="middle" fill="#64748b" font-size="10">cmd="ls"</text>
        <text x="187" y="98" text-anchor="middle" fill="#64748b" font-size="10">args=["-la","/home"]</text>

        <text x="253" y="80" fill="#fbbf24" font-size="16">→</text>

        <rect x="263" y="45" width="115" height="60" rx="8" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
        <text x="320" y="68" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">Find Binary</text>
        <text x="320" y="84" text-anchor="middle" fill="#64748b" font-size="10">Search $PATH</text>
        <text x="320" y="98" text-anchor="middle" fill="#64748b" font-size="10">/usr/bin/ls ✓</text>

        <text x="386" y="80" fill="#fbbf24" font-size="16">→</text>

        <rect x="396" y="45" width="115" height="60" rx="8" fill="#131a2b" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="453" y="68" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">fork() + exec()</text>
        <text x="453" y="84" text-anchor="middle" fill="#64748b" font-size="10">New process</text>
        <text x="453" y="98" text-anchor="middle" fill="#64748b" font-size="10">Load ls binary</text>

        <text x="519" y="80" fill="#fbbf24" font-size="16">→</text>

        <rect x="529" y="45" width="115" height="60" rx="8" fill="#131a2b" stroke="#f87171" stroke-width="1.5"/>
        <text x="586" y="68" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold" font-family="JetBrains Mono">Kernel Work</text>
        <text x="586" y="84" text-anchor="middle" fill="#64748b" font-size="10">Read directory</text>
        <text x="586" y="98" text-anchor="middle" fill="#64748b" font-size="10">Check permissions</text>

        <text x="650" y="80" fill="#fbbf24" font-size="16">→</text>

        <rect x="660" y="45" width="50" height="60" rx="8" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
        <text x="685" y="73" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">Output</text>
        <text x="685" y="89" text-anchor="middle" fill="#64748b" font-size="10">stdout</text>

        <!-- Steps labels -->
        <text x="60"  y="130" text-anchor="middle" fill="#64748b" font-size="9">① Input</text>
        <text x="187" y="130" text-anchor="middle" fill="#64748b" font-size="9">② Parse</text>
        <text x="320" y="130" text-anchor="middle" fill="#64748b" font-size="9">③ Locate</text>
        <text x="453" y="130" text-anchor="middle" fill="#64748b" font-size="9">④ Spawn</text>
        <text x="586" y="130" text-anchor="middle" fill="#64748b" font-size="9">⑤ Execute</text>
        <text x="685" y="130" text-anchor="middle" fill="#64748b" font-size="9">⑥ Print</text>

        <text x="360" y="165" text-anchor="middle" fill="#64748b" font-size="11">All of this happens in under 10 milliseconds</text>
        <text x="360" y="182" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">fork() creates a child process; exec() replaces it with the command binary</text>
    </svg>
    <div class="caption">Every command you run creates a new process via fork() + exec() — the shell waits for it to finish, then shows the next prompt</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">shell_mechanics.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># See where a command lives (after $PATH search)</span>
<span class="prompt">$</span> which ls
<span class="output">/usr/bin/ls</span>

<span class="prompt">$</span> which python3
<span class="output">/usr/bin/python3</span>

<span class="prompt">$</span> type ls               <span class="comment"># Is it a binary, alias, or builtin?</span>
<span class="output">ls is aliased to 'ls --color=auto'</span>

<span class="prompt">$</span> type cd               <span class="comment"># cd is special!</span>
<span class="output">cd is a shell builtin</span>
<span class="comment"># cd cannot be a separate binary — it would change the child</span>
<span class="comment"># process's directory, not the parent shell's directory!</span>

<span class="comment"># Watch processes being created in real-time:</span>
<span class="prompt">$</span> watch -n 1 'ps aux | wc -l'   <span class="comment"># Count processes every second</span>

<span class="comment"># See your shell's process hierarchy:</span>
<span class="prompt">$</span> pstree -p $$           <span class="comment"># $$ = current shell's PID</span>

<span class="comment"># Every process has a parent (PPID)</span>
<span class="prompt">$</span> ps -p $$ -o pid,ppid,cmd
<span class="output">  PID  PPID CMD</span>
<span class="output">12345 12344 bash</span>
<span class="comment"># Your shell was started by PID 12344 (the terminal emulator)</span></div>
</div>

<div class="info-box">
    <h4>💡 Why cd Is a Shell Builtin</h4>
    <p>Most commands are separate binaries that the shell forks and executes. But <code>cd</code> must be a builtin — if it were a separate process, it would change <em>its own</em> working directory, then exit, and the parent shell would remain unchanged. <code>cd</code>, <code>export</code>, <code>source</code>, and <code>alias</code> are all builtins because they need to modify the shell's own state.</p>
</div>
            `
        },

        // ── SECTION 5: Everything Is a File ──
        {
            id: "everything_is_a_file",
            content: `
<h3>📁 "Everything Is a File" — The Unix Philosophy</h3>

<div class="story-box">
    <h4>🎯 The Unifying Principle</h4>
    <p>One of Linux's most powerful design choices: <strong>everything is represented as a file</strong>. Not just your text files — your hard drive is a file. Your network connection is a file. Your running processes have files. Your hardware devices are files. This uniform interface is why Linux is so scriptable and composable.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">everything_is_a_file.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ─── Regular Files ───</span>
<span class="prompt">$</span> cat /etc/hostname          <span class="comment"># Text file</span>
<span class="output">ubuntu22</span>

<span class="comment"># ─── /proc: Running processes as files ───</span>
<span class="prompt">$</span> cat /proc/version          <span class="comment"># Kernel version — from a "file"!</span>
<span class="output">Linux version 5.15.0-91-generic...</span>

<span class="prompt">$</span> cat /proc/meminfo          <span class="comment"># Memory stats as a file</span>
<span class="prompt">$</span> cat /proc/cpuinfo          <span class="comment"># CPU info as a file</span>
<span class="prompt">$</span> cat /proc/$$/status        <span class="comment"># YOUR shell's own status!</span>
<span class="comment"># $$ = current PID, so /proc/[PID]/status</span>

<span class="comment"># ─── /dev: Hardware devices as files ───</span>
<span class="prompt">$</span> ls -la /dev/ | head -20   <span class="comment"># All devices are "files"</span>
<span class="output">brw-rw---- 1 root disk 8, 0 /dev/sda</span>   <span class="comment"># Hard disk!</span>
<span class="output">crw-rw-rw- 1 root tty  5, 0 /dev/tty</span>   <span class="comment"># Terminal!</span>

<span class="comment"># Write directly to a disk (CAREFUL - dangerous in real use!)</span>
<span class="comment"># dd if=/dev/sda of=/backup/disk.img    # Backup whole disk to file</span>

<span class="comment"># /dev/null — the black hole</span>
<span class="prompt">$</span> echo "ignore this" > /dev/null   <span class="comment"># Discard output</span>

<span class="comment"># /dev/zero — generates zeros infinitely</span>
<span class="prompt">$</span> dd if=/dev/zero of=1gb.img bs=1M count=1024  <span class="comment"># Create 1GB file of zeros</span>

<span class="comment"># /dev/random — random data source</span>
<span class="prompt">$</span> head -c 16 /dev/urandom | base64  <span class="comment"># Generate random 16 bytes → base64</span>

<span class="comment"># ─── /sys: Kernel parameters as files ───</span>
<span class="prompt">$</span> cat /sys/class/net/eth0/speed     <span class="comment"># Network interface speed</span>
<span class="prompt">$</span> cat /sys/class/thermal/thermal_zone0/temp  <span class="comment"># CPU temperature!</span></div>
</div>

<h4>The Special Filesystems</h4>
<table class="comparison-table">
    <thead>
        <tr><th>Filesystem</th><th>Mount Point</th><th>What It Contains</th><th>Persistent?</th></tr>
    </thead>
    <tbody>
        <tr><td>ext4 / xfs</td><td>/</td><td>Regular files, your data</td><td>Yes (on disk)</td></tr>
        <tr><td>procfs</td><td>/proc</td><td>Running processes, kernel stats</td><td>No (RAM only)</td></tr>
        <tr><td>sysfs</td><td>/sys</td><td>Kernel/hardware parameters</td><td>No (RAM only)</td></tr>
        <tr><td>devfs/udev</td><td>/dev</td><td>Device files (disks, terminals)</td><td>No (RAM only)</td></tr>
        <tr><td>tmpfs</td><td>/tmp, /run</td><td>Temporary files</td><td>No (cleared on reboot)</td></tr>
    </tbody>
</table>

<div class="tip-box">
    <h4>🎯 Data Engineering Use: /proc for Monitoring</h4>
    <p>Production monitoring scripts often read directly from <code>/proc</code>: <br>
    <code>cat /proc/meminfo | grep MemAvailable</code> — available memory in your pipeline<br>
    <code>cat /proc/loadavg</code> — current CPU load<br>
    <code>cat /proc/net/tcp | wc -l</code> — number of TCP connections<br>
    These are faster than tools like <code>free</code> because they read raw kernel data directly.</p>
</div>
            `
        },

        // ── SECTION 6: Boot Process ──
        {
            id: "boot_process",
            content: `
<h3>🚀 The Linux Boot Process</h3>

<p>Understanding the boot process is essential for production server administration — when a server won't boot after a kernel update, you need to know where to intervene.</p>

<div class="visual-container">
    <svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">Linux Boot Sequence (Modern systemd)</text>

        <!-- Step 1 -->
        <rect x="50" y="40" width="620" height="50" rx="10" fill="#131a2b" stroke="#64748b" stroke-width="1.5"/>
        <text x="140" y="69" text-anchor="middle" fill="#fbbf24" font-size="22">1</text>
        <text x="220" y="63" text-anchor="left" fill="#fbbf24" font-size="13" font-weight="bold" font-family="JetBrains Mono">BIOS / UEFI</text>
        <text x="220" y="80" text-anchor="left" fill="#64748b" font-size="11">Power On → POST (Power-On Self Test) → Find boot device (disk, USB, network)</text>

        <text x="360" y="105" text-anchor="middle" fill="#22d3ee" font-size="14">↓</text>

        <!-- Step 2 -->
        <rect x="50" y="115" width="620" height="50" rx="10" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="140" y="144" text-anchor="middle" fill="#22d3ee" font-size="22">2</text>
        <text x="220" y="138" text-anchor="left" fill="#22d3ee" font-size="13" font-weight="bold" font-family="JetBrains Mono">GRUB2 Bootloader</text>
        <text x="220" y="155" text-anchor="left" fill="#64748b" font-size="11">Reads /boot/grub/ → Shows boot menu → Loads kernel + initrd into RAM</text>

        <text x="360" y="180" text-anchor="middle" fill="#22d3ee" font-size="14">↓</text>

        <!-- Step 3 -->
        <rect x="50" y="190" width="620" height="50" rx="10" fill="#131a2b" stroke="#f87171" stroke-width="1.5"/>
        <text x="140" y="219" text-anchor="middle" fill="#f87171" font-size="22">3</text>
        <text x="220" y="213" text-anchor="left" fill="#f87171" font-size="13" font-weight="bold" font-family="JetBrains Mono">Linux Kernel Initializes</text>
        <text x="220" y="230" text-anchor="left" fill="#64748b" font-size="11">Detects hardware → Loads drivers → Mounts root filesystem → Starts PID 1</text>

        <text x="360" y="255" text-anchor="middle" fill="#22d3ee" font-size="14">↓</text>

        <!-- Step 4 -->
        <rect x="50" y="265" width="620" height="50" rx="10" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5"/>
        <text x="140" y="294" text-anchor="middle" fill="#a78bfa" font-size="22">4</text>
        <text x="220" y="288" text-anchor="left" fill="#a78bfa" font-size="13" font-weight="bold" font-family="JetBrains Mono">systemd (PID 1)</text>
        <text x="220" y="305" text-anchor="left" fill="#64748b" font-size="11">Starts services in parallel → Mounts filesystems → Activates targets (multi-user.target)</text>

        <text x="360" y="330" text-anchor="middle" fill="#22d3ee" font-size="14">↓</text>

        <!-- Step 5 -->
        <rect x="50" y="340" width="620" height="30" rx="10" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
        <text x="140" y="360" text-anchor="middle" fill="#34d399" font-size="18">5</text>
        <text x="220" y="360" text-anchor="left" fill="#34d399" font-size="12" font-weight="bold" font-family="JetBrains Mono">Login Prompt (getty) → You're in!</text>
    </svg>
    <div class="caption">The boot process from power button to shell prompt takes ~10-30 seconds on a typical server</div>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">boot_analysis.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ═══ Analyze boot time ═══</span>
<span class="prompt">$</span> systemd-analyze              <span class="comment"># Total boot time</span>
<span class="output">Startup finished in 2.841s (kernel) + 8.249s (userspace) = 11.090s</span>

<span class="prompt">$</span> systemd-analyze blame         <span class="comment"># Which service took longest?</span>
<span class="output">3.421s NetworkManager-wait-online.service</span>
<span class="output">1.203s apt-daily-upgrade.service</span>
<span class="output">0.847s docker.service</span>

<span class="comment"># ═══ Runlevels and systemd targets ═══</span>
<span class="comment"># Traditional SysVinit runlevels → Modern systemd targets:</span>
<span class="comment"># 0 → poweroff.target    (shutdown)</span>
<span class="comment"># 1 → rescue.target      (single user, recovery)</span>
<span class="comment"># 3 → multi-user.target  (servers, no GUI)</span>
<span class="comment"># 5 → graphical.target   (desktop with GUI)</span>
<span class="comment"># 6 → reboot.target      (reboot)</span>

<span class="prompt">$</span> systemctl get-default        <span class="comment"># Current boot target</span>
<span class="output">multi-user.target</span>
<span class="comment"># Production servers should be multi-user.target (no GUI!)</span>

<span class="prompt">$</span> systemctl set-default multi-user.target  <span class="comment"># Save for next boot</span>

<span class="comment"># ═══ View boot messages ═══</span>
<span class="prompt">$</span> dmesg | head -30             <span class="comment"># Kernel boot messages</span>
<span class="prompt">$</span> dmesg | grep -i error        <span class="comment"># Boot errors</span>
<span class="prompt">$</span> journalctl -b                <span class="comment"># Full boot log (systemd)</span>
<span class="prompt">$</span> journalctl -b -p err         <span class="comment"># Only errors from last boot</span></div>
</div>

<div class="warning-box">
    <h4>⚠️ Production Servers: Always multi-user.target</h4>
    <p>Production Linux servers NEVER run a GUI. The graphical.target wastes RAM, increases attack surface, and adds unnecessary processes. When you SSH into an AWS EC2 instance, it's running multi-user.target — no desktop, just the command line. Understanding this helps you configure servers correctly and reduces resource waste.</p>
</div>
            `,
            interactiveExample: {
                explanation: "Analyze your system's boot process and understand which services start at boot.",
                code: `# Check what target your system boots into:
$ systemctl get-default
multi-user.target

# See how long boot took:
$ systemd-analyze
Startup finished in 3.2s (kernel) + 9.1s (userspace) = 12.3s

# Which services are slowest to start?
$ systemd-analyze blame | head -5
4.1s NetworkManager-wait-online.service
1.8s docker.service
0.9s snapd.service

# Is PID 1 really systemd?
$ ps -p 1 -o pid,comm,args
  PID COMMAND  COMMAND
    1 systemd  /sbin/init`
            }
        },

        // ── SECTION 7: File System Hierarchy ──
        {
            id: "fhs",
            content: `
<h3>🌳 File System Hierarchy Standard (FHS)</h3>

<p>The FHS defines where everything lives in the Linux filesystem. Knowing this is <em>essential</em> — when a config file is missing or a log is huge, you need to know exactly where to look.</p>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">filesystem_tour.sh</span>
    </div>
    <div class="terminal-body"><span class="comment">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="comment">         LINUX FILESYSTEM HIERARCHY</span>
<span class="comment">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span class="highlight">/</span>              Root — everything starts here
<span class="highlight">/bin</span>           Essential user binaries (ls, cp, mv, bash)
<span class="highlight">/sbin</span>          System binaries (only root should run: fdisk, ip)
<span class="highlight">/usr</span>           User programs (read-only, shareable)
<span class="highlight">/usr/bin</span>       Most user commands (python3, git, vim)
<span class="highlight">/usr/local</span>     Locally installed software (your custom installs)
<span class="highlight">/lib</span>           Shared libraries (.so files, like .dll on Windows)
<span class="highlight">/etc</span>           Configuration files — CRITICAL directory
   /etc/passwd          User accounts
   /etc/shadow          Password hashes (root only!)
   /etc/group           Group definitions
   /etc/hosts           Static hostname resolution
   /etc/fstab           Filesystem mount table
   /etc/crontab         System-wide scheduled tasks
   /etc/ssh/sshd_config SSH server configuration
   /etc/environment     System-wide environment variables
<span class="highlight">/home</span>          User home directories (/home/anuj, /home/ubuntu)
<span class="highlight">/root</span>          Root user's home (separate from /home!)
<span class="highlight">/var</span>           Variable data — grows over time!
   /var/log/            All system and application logs
   /var/log/syslog      General system messages
   /var/log/auth.log    SSH logins, sudo usage
   /var/lib/            Application state (databases, docker)
   /var/spool/          Print queues, mail, cron jobs
<span class="highlight">/tmp</span>           Temporary files (cleared on reboot)
<span class="highlight">/proc</span>          Virtual — running processes as files
<span class="highlight">/sys</span>           Virtual — kernel hardware interface
<span class="highlight">/dev</span>           Device files
   /dev/sda, /dev/nvme0n1   Hard disks
   /dev/null, /dev/zero     Special devices
<span class="highlight">/mnt</span>           Mount point for temporary mounts
<span class="highlight">/media</span>         Auto-mounted removable media (USB drives)
<span class="highlight">/opt</span>           Optional/third-party software (Spark, Java)
<span class="highlight">/boot</span>          Boot files (kernel, GRUB config)
<span class="highlight">/run</span>           Runtime data (cleared each boot)</div>
</div>

<div class="cards-grid">
    <div class="mini-card">
        <h5>🔥 /var/log — Your First Stop</h5>
        <p>When something breaks: <code>tail -f /var/log/syslog</code> or <code>journalctl -f</code>. Application logs often in <code>/var/log/appname/</code>. The <code>-f</code> flag follows the log in real-time.</p>
    </div>
    <div class="mini-card">
        <h5>⚙️ /etc — All Configuration</h5>
        <p>Never hardcode paths to /etc files — they're text files you edit. <code>/etc/hosts</code> for DNS overrides, <code>/etc/crontab</code> for scheduling, <code>/etc/environment</code> for global env vars.</p>
    </div>
    <div class="mini-card">
        <h5>📦 /opt — Big Software</h5>
        <p>Apache Spark, Java, Anaconda, and other large packages often install to <code>/opt/spark</code>, <code>/opt/java</code>. You'll set <code>SPARK_HOME=/opt/spark</code> in your <code>~/.bashrc</code>.</p>
    </div>
    <div class="mini-card">
        <h5>🏠 /home — Your Space</h5>
        <p>Your workspace: <code>~/.bashrc</code> for shell config, <code>~/.ssh/</code> for SSH keys, <code>~/projects/</code> for code. Keep big datasets in <code>/data/</code> or <code>/mnt/data/</code>, not in home.</p>
    </div>
</div>
            `
        }

    ], // end sections

    practiceExercises: [
        {
            id: "arch_ex1",
            difficulty: "Easy",
            title: "Map the Architecture with Real Commands",
            description: "Verify each layer of Linux architecture by running commands that directly interact with them.",
            starterCode: `# User Space - run an application:
$ echo "Hello from User Space"

# Shell layer - check what shell you're using:
$ echo $SHELL && echo $BASH_VERSION

# System Call layer - watch syscalls:
$ strace echo "hello" 2>&1 | head -10

# Kernel - get kernel info:
$ uname -r && cat /proc/version | head -1

# Hardware - check hardware:
$ cat /proc/cpuinfo | grep "model name" | uniq`,
            solution: `$ echo "Hello from User Space"
Hello from User Space

$ echo $SHELL && echo $BASH_VERSION
/bin/bash
5.1.16(1)-release

$ strace echo "hello" 2>&1 | head -5
execve("/usr/bin/echo", ["echo", "hello"], ...) = 0
brk(NULL) = 0x55a2d3f47000
access("/etc/ld.so.nohwcap", F_OK) = -1
openat(AT_FDCWD, "/etc/ld.so.preload", ...) = -1
openat(AT_FDCWD, "/etc/ld.so.cache", ...) = 3

$ uname -r
5.15.0-91-generic

$ cat /proc/cpuinfo | grep "model name" | uniq
model name : Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz`,
            explanation: "You've just touched every layer of Linux architecture: user space (echo), shell (bash variables), syscall interface (strace), kernel (/proc/version), and hardware (/proc/cpuinfo). This is how professionals verify a system's stack."
        },
        {
            id: "arch_ex2",
            difficulty: "Easy",
            title: "Explore the /proc Virtual Filesystem",
            description: "The /proc filesystem gives you live kernel data through files. Explore your running system's processes, memory, and network via /proc.",
            starterCode: `# Check system uptime through /proc:
$ cat /proc/uptime

# See memory details:
$ grep -E "MemTotal|MemFree|MemAvailable" /proc/meminfo

# See your own process info:
$ cat /proc/$$/status | head -10   # $$ = your PID

# How many processes are running?
$ ls /proc | grep -E "^[0-9]+" | wc -l

# Network connections via /proc:
$ cat /proc/net/tcp | wc -l`,
            solution: `$ cat /proc/uptime
47382.45 189342.12
# First number: seconds since boot; Second: idle CPU seconds

$ grep -E "MemTotal|MemFree|MemAvailable" /proc/meminfo
MemTotal:       16348272 kB
MemFree:         8423456 kB
MemAvailable:   10987234 kB
# MemAvailable is what you can actually use (includes reclaimable cache)

$ cat /proc/$$/status | head -10
Name:   bash
Umask:  0022
State:  S (sleeping)
Tgid:   12345
Ngid:   0
Pid:    12345
PPid:   12344
FDSize: 256
Groups: 1000 4 24 27...
VmPeak: 12804 kB

$ ls /proc | grep -E "^[0-9]+" | wc -l
312   # 312 processes currently running

$ cat /proc/net/tcp | wc -l
48    # 48 TCP connections (header + 47 connections)`,
            explanation: "/proc is a virtual filesystem that presents kernel data as readable files — no disk I/O, just reading from memory. Your own shell process has an entire directory at /proc/$$ with maps, status, file descriptors, and more. This is how monitoring tools like top, htop, and ps work internally."
        },
        {
            id: "arch_ex3",
            difficulty: "Medium",
            title: "Trace a Command Through the Architecture",
            description: "Use strace to see exactly which system calls a simple Python file-read makes. Understand each syscall.",
            starterCode: `# Create a test file first:
$ echo "Hello, Linux Architecture!" > /tmp/test_arch.txt

# Now trace Python reading that file:
$ strace python3 -c "
f = open('/tmp/test_arch.txt')
data = f.read()
print(data)
f.close()
" 2>&1 | grep -E "openat|read|write|close" | head -20

# Count total syscalls:
$ strace -c python3 -c "print('hi')" 2>&1 | tail -15`,
            solution: `# Create test file:
$ echo "Hello, Linux Architecture!" > /tmp/test_arch.txt

# Trace filtered output:
$ strace python3 -c "f=open('/tmp/test_arch.txt'); print(f.read()); f.close()" 2>&1 | grep -E "openat|read|write|close"

openat(AT_FDCWD, "/tmp/test_arch.txt", O_RDONLY|O_CLOEXEC) = 3
# ↑ Kernel opens file, returns fd=3

read(3, "Hello, Linux Architecture!\\n", 4096) = 27
# ↑ Read 27 bytes from fd=3

write(1, "Hello, Linux Architecture!\\n", 27) = 27
# ↑ Write to stdout (fd=1)

close(3)   = 0
# ↑ Close the file

# Syscall statistics:
$ strace -c python3 -c "print('hi')" 2>&1 | tail -10
% time     seconds  usecs/call     calls    syscall
  38.2    0.001234          18        68    mmap
  22.1    0.000714          10        72    read
  18.4    0.000596          12        50    openat
   9.3    0.000300           8        37    close
# Python makes ~300 syscalls even for "print('hi')"!`,
            explanation: "Every operation that touches hardware goes through a syscall. open() maps to the openat syscall, which asks the kernel to find the file on disk. The kernel returns a file descriptor (integer like 3) — a handle your program uses for subsequent reads. Even 'print' triggers a write syscall to stdout. This overhead is why 'system call minimization' is an important optimization technique."
        },
        {
            id: "arch_ex4",
            difficulty: "Medium",
            title: "Analyze the Boot Process",
            description: "Investigate your system's boot sequence, timing, and which services systemd starts.",
            starterCode: `# How long did your system take to boot?
$ systemd-analyze

# What's slowing down boot?
$ systemd-analyze blame | head -10

# What is the default boot target?
$ systemctl get-default

# List all active services:
$ systemctl list-units --type=service --state=active | head -20

# Is Docker/Python/Spark set to start at boot?
$ systemctl is-enabled docker 2>/dev/null || echo "docker not installed"`,
            solution: `$ systemd-analyze
Startup finished in 2.841s (kernel) + 11.249s (userspace) = 14.090s
graphical.target reached after 14.058s in userspace

$ systemd-analyze blame | head -10
 5.421s NetworkManager-wait-online.service
 3.203s snapd.service
 1.847s docker.service
 1.203s apt-daily-upgrade.service
 0.899s dev-sda1.device
 0.756s accounts-daemon.service
 0.421s ssh.service

$ systemctl get-default
multi-user.target     # or graphical.target on desktop

$ systemctl list-units --type=service --state=active | head -5
  UNIT                          LOAD   ACTIVE SUB     DESCRIPTION
  accounts-daemon.service       loaded active running Accounts Service
  cron.service                  loaded active running Regular background program
  docker.service                loaded active running Docker Application Container
  networking.service            loaded active running Raise network interfaces`,
            explanation: "systemd-analyze shows your boot time split between kernel initialization and userspace startup. 'blame' identifies which services are the bottleneck. On production servers, NetworkManager-wait-online is often disabled or configured with a timeout to speed up boots — critical when auto-scaling cloud instances need to start fast."
        },
        {
            id: "arch_ex5",
            difficulty: "Hard",
            title: "Memory Architecture Investigation",
            description: "Investigate how Linux manages memory for a running process. See virtual vs physical memory, understand the OOM killer.",
            starterCode: `# Start a Python process in background:
$ python3 -c "import time; x=[0]*10000000; time.sleep(60)" &
$ PYPID=$!

# See its memory map:
$ cat /proc/$PYPID/status | grep -i "vm\|mem"

# See all memory mappings:
$ cat /proc/$PYPID/maps | head -20

# See system-wide memory:
$ free -h
$ vmstat -s | head -10

# When done:
$ kill $PYPID`,
            solution: `$ python3 -c "import time; x=[0]*10000000; time.sleep(60)" &
[1] 13421

$ cat /proc/13421/status | grep -i "vm\|mem"
VmPeak:   155876 kB   # Peak virtual memory used
VmSize:   155876 kB   # Current virtual memory
VmRSS:     83492 kB   # Resident Set Size (physical RAM actually used)
VmData:    82040 kB   # Heap size (where x list lives)
VmStk:       132 kB   # Stack size

$ cat /proc/13421/maps | head -5
55a2d3e00000-55a2d3e01000 r--p  /usr/bin/python3.10  (text segment)
7f8b12345000-7f8b16345000 rw-p  [heap]  (your list x is here!)
7fff12345000-7fff12365000 rw-p  [stack]

$ free -h
              total  used  free  buff/cache  available
Mem:           15Gi  4.8Gi  7.6Gi  312Mi   3.1Gi      10Gi

$ kill 13421
[1]+ Terminated   python3 -c ...`,
            explanation: "VmSize (virtual memory) is always larger than VmRSS (physical RAM used) because Linux uses lazy allocation — pages are only actually allocated in physical RAM when first written. The list [0]*10000000 allocates 80MB virtually but the kernel may not commit all physical pages immediately. This is why you can 'overcommit' memory on Linux. When physical RAM is truly exhausted, the OOM killer selects processes to terminate based on their memory usage and priority."
        }
    ],

    summary: `
<h3>📋 Chapter Summary: Linux Architecture</h3>
<div class="tip-box">
    <h4>✅ Key Concepts Mastered</h4>
    <ul>
        <li><strong>Layered Architecture:</strong> Hardware → Kernel → System Libraries/Shell → User Applications. Each layer only communicates with adjacent layers.</li>
        <li><strong>Kernel Space vs User Space:</strong> The kernel runs in Ring 0 (full privileges). Applications run in Ring 3 (restricted). They communicate via system calls (syscalls).</li>
        <li><strong>Kernel Subsystems:</strong> Process Management (CFS scheduler), Memory Management (VMM, paging), Virtual File System (VFS), Device Drivers, Network Stack, IPC &amp; Security (namespaces, cgroups).</li>
        <li><strong>Everything Is a File:</strong> /proc for processes, /dev for devices, /sys for hardware parameters — the unified file interface is Linux's superpower for scripting and automation.</li>
        <li><strong>Boot Process:</strong> BIOS/UEFI → GRUB2 → Kernel init → systemd (PID 1) → Services → Login. Use <code>systemd-analyze blame</code> to diagnose slow boots.</li>
        <li><strong>Filesystem Hierarchy:</strong> /etc (configs), /var/log (logs), /proc (kernel data), /opt (big software), /home (users), /dev (devices).</li>
    </ul>
</div>
<div class="info-box">
    <h4>📚 Coming Up Next</h4>
    <p>Next: <strong>Installation &amp; Setup</strong> — installing Ubuntu via WSL2 on Windows, setting up a cloud VM on AWS, and the essential startup/shutdown commands. You'll have a working Linux environment to practice all upcoming lessons.</p>
</div>
    `

}; // end linuxArchitecture