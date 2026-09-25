

var systemInformation = {

    title: "System Information",
    description: "Master every command to interrogate a Linux system — hardware specs, OS details, CPU, memory, disk, network, and real-time performance monitoring",
    breadcrumb: "Getting Started > System Information",

    sections: [

        // ══════════════════════════════════════════════════════
        // SECTION 1 — Why System Information Matters
        // ══════════════════════════════════════════════════════
        {
            id: "why_sysinfo",
            content: `
<h3>📊 Why System Information Is a Core Skill</h3>

<div class="story-box">
    <h4>🕵️ The Detective Analogy</h4>
    <p>Imagine arriving at a crime scene. Before doing anything else, a detective takes stock of the environment — what's here, what's missing, what's out of place. A Linux engineer arriving at an unfamiliar server does exactly the same thing. Before running any pipeline, debugging any issue, or configuring any service, you need to <strong>know what you're working with</strong>: How many CPU cores? How much RAM? What OS version? Which kernel? How full are the disks? Is the network up?</p>
    <p>These are not optional warm-up questions. They are the answers that determine whether your Spark job will run, whether your model can be trained in memory, whether logs are about to fill the disk. System information commands are your <strong>first five minutes on any new server</strong>.</p>
</div>

<h4>📖 Core Terminology</h4>
<div class="cards-grid">
    <div class="mini-card">
        <h5>🖥️ Hardware vs Software Info</h5>
        <p><strong>Hardware info</strong> — CPU model, RAM slots, disk make — is static and comes from physical components. <strong>Software info</strong> — OS version, kernel, running services — changes with updates. Both are essential to collect when debugging problems.</p>
    </div>
    <div class="mini-card">
        <h5>🌡️ Metrics vs Specs</h5>
        <p><strong>Specs</strong> (static) = CPU cores, RAM capacity, disk size. <strong>Metrics</strong> (dynamic) = current CPU usage, free RAM, disk I/O rate. Specs tell you the ceiling; metrics tell you where you are relative to that ceiling.</p>
    </div>
    <div class="mini-card">
        <h5>📁 /proc and /sys</h5>
        <p>Two virtual filesystems where the <strong>kernel exposes live hardware and OS data</strong> as readable files. Nothing is stored on disk — the kernel generates content on demand. All system info commands ultimately read from here.</p>
    </div>
    <div class="mini-card">
        <h5>🔧 DMI / SMBIOS</h5>
        <p><strong>Desktop Management Interface</strong> — a standard for how hardware describes itself to the OS. <code>dmidecode</code> reads this table to reveal manufacturer, serial numbers, BIOS version, RAM slot details — information the kernel doesn't expose through /proc.</p>
    </div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes catPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
                .cp1{animation:catPulse 2s ease-in-out infinite 0.0s}
                .cp2{animation:catPulse 2s ease-in-out infinite 0.3s}
                .cp3{animation:catPulse 2s ease-in-out infinite 0.6s}
                .cp4{animation:catPulse 2s ease-in-out infinite 0.9s}
                .cp5{animation:catPulse 2s ease-in-out infinite 1.2s}
                .cp6{animation:catPulse 2s ease-in-out infinite 1.5s}
            </style>
        </defs>
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk">System Information — What Each Command Reveals</text>

        <rect x="10"  y="34" width="108" height="90" rx="8" fill="#0a1520" stroke="#22d3ee" stroke-width="2" class="cp1"/>
        <text x="64"  y="58" text-anchor="middle" fill="#22d3ee" font-size="22">🖥️</text>
        <text x="64"  y="76" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">uname</text>
        <text x="64"  y="92" text-anchor="middle" fill="#64748b" font-size="9">OS &amp; kernel</text>
        <text x="64"  y="108" text-anchor="middle" fill="#64748b" font-size="9">version</text>

        <rect x="128" y="34" width="108" height="90" rx="8" fill="#0a1520" stroke="#34d399" stroke-width="2" class="cp2"/>
        <text x="182" y="58" text-anchor="middle" fill="#34d399" font-size="22">⚙️</text>
        <text x="182" y="76" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">lscpu</text>
        <text x="182" y="92" text-anchor="middle" fill="#64748b" font-size="9">CPU arch,</text>
        <text x="182" y="108" text-anchor="middle" fill="#64748b" font-size="9">cores, speed</text>

        <rect x="246" y="34" width="108" height="90" rx="8" fill="#0a1520" stroke="#fbbf24" stroke-width="2" class="cp3"/>
        <text x="300" y="58" text-anchor="middle" fill="#fbbf24" font-size="22">💾</text>
        <text x="300" y="76" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">free / lsmem</text>
        <text x="300" y="92" text-anchor="middle" fill="#64748b" font-size="9">RAM total,</text>
        <text x="300" y="108" text-anchor="middle" fill="#64748b" font-size="9">used, free</text>

        <rect x="364" y="34" width="108" height="90" rx="8" fill="#0a1520" stroke="#f87171" stroke-width="2" class="cp4"/>
        <text x="418" y="58" text-anchor="middle" fill="#f87171" font-size="22">💿</text>
        <text x="418" y="76" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold" font-family="JetBrains Mono">lsblk / df</text>
        <text x="418" y="92" text-anchor="middle" fill="#64748b" font-size="9">Disks, partitions</text>
        <text x="418" y="108" text-anchor="middle" fill="#64748b" font-size="9">space used</text>

        <rect x="482" y="34" width="108" height="90" rx="8" fill="#0a1520" stroke="#a78bfa" stroke-width="2" class="cp5"/>
        <text x="536" y="58" text-anchor="middle" fill="#a78bfa" font-size="22">🌐</text>
        <text x="536" y="76" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold" font-family="JetBrains Mono">ip / ss</text>
        <text x="536" y="92" text-anchor="middle" fill="#64748b" font-size="9">Network interfaces</text>
        <text x="536" y="108" text-anchor="middle" fill="#64748b" font-size="9">IPs, connections</text>

        <rect x="600" y="34" width="108" height="90" rx="8" fill="#0a1520" stroke="#fb923c" stroke-width="2" class="cp6"/>
        <text x="654" y="58" text-anchor="middle" fill="#fb923c" font-size="22">📈</text>
        <text x="654" y="76" text-anchor="middle" fill="#fb923c" font-size="11" font-weight="bold" font-family="JetBrains Mono">top / htop</text>
        <text x="654" y="92" text-anchor="middle" fill="#64748b" font-size="9">Live CPU, RAM</text>
        <text x="654" y="108" text-anchor="middle" fill="#64748b" font-size="9">per process</text>

        <!-- The standard first 5 minutes -->
        <rect x="10" y="140" width="700" height="148" rx="10" fill="#0a1520" stroke="#334155" stroke-width="1"/>
        <text x="360" y="162" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Your First 5 Minutes on Any New Server</text>

        <text x="30"  y="184" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$ uname -a</text>
        <text x="220" y="184" fill="#64748b" font-size="10">→ OS, kernel version, architecture</text>
        <text x="30"  y="204" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$ lscpu | grep -E "Model|CPU\(s\)|MHz"</text>
        <text x="380" y="204" fill="#64748b" font-size="10">→ CPU details</text>
        <text x="30"  y="224" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$ free -h</text>
        <text x="220" y="224" fill="#64748b" font-size="10">→ RAM available</text>
        <text x="30"  y="244" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$ df -h</text>
        <text x="220" y="244" fill="#64748b" font-size="10">→ Disk space on each partition</text>
        <text x="30"  y="264" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$ ip addr show</text>
        <text x="220" y="264" fill="#64748b" font-size="10">→ Network interfaces and IP addresses</text>
        <text x="30"  y="284" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">$ uptime</text>
        <text x="220" y="284" fill="#64748b" font-size="10">→ How long running, load average</text>
    </svg>
    <div class="caption">Every professional Linux user has a mental checklist of system info commands they run on a new machine. These six cover CPU, memory, disk, network, and load in under 30 seconds.</div>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 2 — OS & Kernel Information
        // ══════════════════════════════════════════════════════
        {
            id: "os_kernel_info",
            content: `
<h3>🐧 OS & Kernel Information</h3>

<div class="story-box">
    <h4>🪪 Your Server's Identity Card</h4>
    <p>Before you install software, run a script, or troubleshoot a problem, you need to know what OS and kernel version you're dealing with. A script that works on Ubuntu 22.04 may fail on CentOS 7. A kernel parameter tunable on 5.15 may not exist on 4.15. These commands give you the server's identity card in seconds.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">os_kernel_commands.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ uname — Kernel & System Info ════</span>
<span class="prompt">$</span> uname -a                    <span class="comment"># Everything at once (most common)</span>
<span class="output">Linux prod-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux</span>
<span class="comment"># [OS] [hostname] [kernel version] [build] [arch] [type]</span>

<span class="prompt">$</span> uname -s                    <span class="comment"># OS name only</span>
<span class="output">Linux</span>
<span class="prompt">$</span> uname -r                    <span class="comment"># Kernel release version</span>
<span class="output">5.15.0-91-generic</span>
<span class="prompt">$</span> uname -v                    <span class="comment"># Kernel build version</span>
<span class="output">#101-Ubuntu SMP Fri Jan 12 19:58:23 UTC 2024</span>
<span class="prompt">$</span> uname -m                    <span class="comment"># Machine hardware (architecture)</span>
<span class="output">x86_64</span>
<span class="prompt">$</span> uname -n                    <span class="comment"># Network hostname</span>
<span class="output">prod-01</span>
<span class="prompt">$</span> uname -p                    <span class="comment"># Processor type</span>
<span class="output">x86_64</span>

<span class="comment"># ════ /etc/os-release — Distribution Info ════</span>
<span class="prompt">$</span> cat /etc/os-release
<span class="output">NAME="Ubuntu"</span>
<span class="output">VERSION="22.04.3 LTS (Jammy Jellyfish)"</span>
<span class="output">ID=ubuntu</span>
<span class="output">ID_LIKE=debian</span>
<span class="output">PRETTY_NAME="Ubuntu 22.04.3 LTS"</span>
<span class="output">VERSION_ID="22.04"</span>
<span class="output">HOME_URL="https://www.ubuntu.com/"</span>

<span class="prompt">$</span> cat /etc/os-release | grep -E "^NAME|^VERSION="   <span class="comment"># Just the key fields</span>
<span class="output">NAME="Ubuntu"</span>
<span class="output">VERSION="22.04.3 LTS (Jammy Jellyfish)"</span>

<span class="prompt">$</span> lsb_release -a              <span class="comment"># Human-friendly distro summary</span>
<span class="output">Distributor ID: Ubuntu</span>
<span class="output">Description:    Ubuntu 22.04.3 LTS</span>
<span class="output">Release:        22.04</span>
<span class="output">Codename:       jammy</span>

<span class="comment"># ════ Hostname Commands ════</span>
<span class="prompt">$</span> hostname                    <span class="comment"># Short hostname</span>
<span class="output">prod-01</span>
<span class="prompt">$</span> hostname -f                 <span class="comment"># Fully Qualified Domain Name (FQDN)</span>
<span class="output">prod-01.company.internal</span>
<span class="prompt">$</span> hostname -I                 <span class="comment"># All IP addresses of this machine</span>
<span class="output">10.0.0.5 172.17.0.1</span>
<span class="prompt">$</span> cat /etc/hostname           <span class="comment"># Where hostname is stored</span>
<span class="output">prod-01</span>

<span class="comment"># ════ System Uptime & Load ════</span>
<span class="prompt">$</span> uptime
<span class="output"> 10:47:00 up 10 days, 2:47, 3 users, load average: 2.45, 1.87, 1.24</span>
<span class="comment"># [current time] [up X days/hours] [users logged in] [load: 1min 5min 15min]</span>

<span class="prompt">$</span> uptime -p                   <span class="comment"># Human-friendly uptime</span>
<span class="output">up 10 days, 2 hours, 47 minutes</span>
<span class="prompt">$</span> uptime -s                   <span class="comment"># When did the system boot?</span>
<span class="output">2024-02-28 08:00:12</span>

<span class="comment"># ════ BIOS and hardware model ════</span>
<span class="prompt">$</span> sudo dmidecode -t system    <span class="comment"># System hardware info</span>
<span class="output">System Information</span>
<span class="output">  Manufacturer: Amazon EC2</span>
<span class="output">  Product Name: m5.4xlarge</span>
<span class="output">  Version: Not Specified</span>
<span class="prompt">$</span> sudo dmidecode -t bios      <span class="comment"># BIOS version and date</span>
<span class="output">BIOS Information</span>
<span class="output">  Vendor:  Amazon EC2</span>
<span class="output">  Version: 1.0</span>
<span class="output">  Release Date: 08/24/2006</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Decoding uname -a Output</text>

        <rect x="10" y="36" width="700" height="40" rx="6" fill="#001400" stroke="#4ade80" stroke-width="1.5"/>
        <text x="360" y="60" text-anchor="middle" fill="#4ade80" font-size="13" font-family="JetBrains Mono">Linux  prod-01  5.15.0-91-generic  #101-Ubuntu SMP  x86_64  GNU/Linux</text>

        <rect x="10"  y="88" width="70"  height="96" rx="6" fill="#0a1520" stroke="#f87171" stroke-width="2"/>
        <text x="45"  y="112" text-anchor="middle" fill="#f87171" font-size="11" font-family="JetBrains Mono">Linux</text>
        <text x="45"  y="130" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">OS NAME</text>
        <text x="45"  y="148" text-anchor="middle" fill="#64748b" font-size="8">kernel</text>
        <text x="45"  y="162" text-anchor="middle" fill="#64748b" font-size="8">family</text>
        <text x="45"  y="178" text-anchor="middle" fill="#64748b" font-size="8">uname -s</text>

        <rect x="90"  y="88" width="96"  height="96" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="138" y="110" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">prod-01</text>
        <text x="138" y="128" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">HOSTNAME</text>
        <text x="138" y="146" text-anchor="middle" fill="#64748b" font-size="8">server name</text>
        <text x="138" y="162" text-anchor="middle" fill="#64748b" font-size="8">change with:</text>
        <text x="138" y="178" text-anchor="middle" fill="#64748b" font-size="8">hostnamectl</text>

        <rect x="196" y="88" width="168" height="96" rx="6" fill="#0a1520" stroke="#fbbf24" stroke-width="2.5"/>
        <text x="280" y="108" text-anchor="middle" fill="#fbbf24" font-size="10" font-family="JetBrains Mono">5.15.0-91-generic</text>
        <text x="280" y="126" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">KERNEL VERSION</text>
        <text x="280" y="144" text-anchor="middle" fill="#64748b" font-size="8">5.15 = major.minor</text>
        <text x="280" y="160" text-anchor="middle" fill="#64748b" font-size="8">0 = patch level</text>
        <text x="280" y="176" text-anchor="middle" fill="#64748b" font-size="8">uname -r</text>

        <rect x="374" y="88" width="160" height="96" rx="6" fill="#0a1520" stroke="#34d399" stroke-width="2"/>
        <text x="454" y="110" text-anchor="middle" fill="#34d399" font-size="10" font-family="JetBrains Mono">#101-Ubuntu SMP</text>
        <text x="454" y="128" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">BUILD INFO</text>
        <text x="454" y="146" text-anchor="middle" fill="#64748b" font-size="8">101st build of this</text>
        <text x="454" y="162" text-anchor="middle" fill="#64748b" font-size="8">kernel for Ubuntu</text>
        <text x="454" y="178" text-anchor="middle" fill="#64748b" font-size="8">SMP=multi-processor</text>

        <rect x="544" y="88" width="80"  height="96" rx="6" fill="#0a1520" stroke="#a78bfa" stroke-width="2"/>
        <text x="584" y="112" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="JetBrains Mono">x86_64</text>
        <text x="584" y="130" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">ARCH</text>
        <text x="584" y="148" text-anchor="middle" fill="#64748b" font-size="8">64-bit Intel/AMD</text>
        <text x="584" y="164" text-anchor="middle" fill="#64748b" font-size="8">arm64 = ARM</text>
        <text x="584" y="180" text-anchor="middle" fill="#64748b" font-size="8">uname -m</text>

        <rect x="634" y="88" width="76"  height="96" rx="6" fill="#0a1520" stroke="#64748b" stroke-width="2"/>
        <text x="672" y="108" text-anchor="middle" fill="#64748b" font-size="9" font-family="JetBrains Mono">GNU/Linux</text>
        <text x="672" y="126" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">OS TYPE</text>
        <text x="672" y="144" text-anchor="middle" fill="#64748b" font-size="8">GNU tools</text>
        <text x="672" y="160" text-anchor="middle" fill="#64748b" font-size="8">on Linux</text>
        <text x="672" y="176" text-anchor="middle" fill="#64748b" font-size="8">kernel</text>
    </svg>
</div>

<div class="info-box">
    <h4>💡 Load Average — What Does 2.45, 1.87, 1.24 Mean?</h4>
    <p>The three numbers in uptime are <strong>1-minute, 5-minute, and 15-minute load averages</strong>. Load average represents the average number of processes wanting CPU time. On a <strong>single-core</strong> machine: 1.0 = 100% busy. On a <strong>4-core</strong> machine: 4.0 = 100% busy. The formula: <code>load / cpu_cores × 100% = utilization</code>. In the example above (2.45 on 8 cores = 30.6% busy — healthy). If load &gt; core count, processes are queuing — the CPU is overloaded. Rising trend (1.24 → 1.87 → 2.45) means the system is getting busier.</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 3 — CPU Information
        // ══════════════════════════════════════════════════════
        {
            id: "cpu_info",
            content: `
<h3>⚙️ CPU Information — Cores, Speed, Architecture</h3>

<div class="story-box">
    <h4>🏎️ Know Your Engine Before You Race</h4>
    <p>Before you set Spark's <code>--num-executors</code> or Python's multiprocessing worker count, you need to know how many CPU cores the machine has. Before you benchmark a job, you need to know the clock speed. Before you install software, you need to confirm the architecture (x86_64 vs ARM64). <code>lscpu</code> and <code>/proc/cpuinfo</code> give you the complete picture.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">cpu_info_commands.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ lscpu — CPU Summary (Best Starting Point) ════</span>
<span class="prompt">$</span> lscpu
<span class="output">Architecture:          x86_64</span>
<span class="output">CPU op-mode(s):        32-bit, 64-bit</span>
<span class="output">Byte Order:            Little Endian</span>
<span class="output">CPU(s):                8                  ← TOTAL logical CPUs</span>
<span class="output">On-line CPU(s) list:   0-7</span>
<span class="output">Thread(s) per core:    2                  ← Hyperthreading (2 threads/core)</span>
<span class="output">Core(s) per socket:    4                  ← 4 physical cores per CPU</span>
<span class="output">Socket(s):             1                  ← 1 physical CPU chip</span>
<span class="output">NUMA node(s):          1</span>
<span class="output">Vendor ID:             GenuineIntel</span>
<span class="output">Model name:            Intel(R) Xeon(R) Platinum 8275CL @ 3.00GHz</span>
<span class="output">CPU MHz:               3000.000           ← Current speed</span>
<span class="output">CPU max MHz:           3900.000           ← Turbo boost max</span>
<span class="output">CPU min MHz:           1200.000           ← Power-save min</span>
<span class="output">L1d cache:             128 KiB</span>
<span class="output">L1i cache:             128 KiB</span>
<span class="output">L2 cache:              1 MiB</span>
<span class="output">L3 cache:              16 MiB             ← Shared L3</span>
<span class="output">Flags:                 fpu vme de pse tsc avx avx2 sse4_2 ...</span>

<span class="comment"># ════ Quick extractions ════</span>
<span class="prompt">$</span> nproc                               <span class="comment"># Logical CPU count (simplest!)</span>
<span class="output">8</span>

<span class="prompt">$</span> lscpu | grep "^CPU(s)"             <span class="comment"># Total logical CPUs</span>
<span class="output">CPU(s):                8</span>

<span class="prompt">$</span> lscpu | grep "Core(s) per socket"  <span class="comment"># Physical cores per chip</span>
<span class="output">Core(s) per socket:    4</span>

<span class="prompt">$</span> lscpu | grep "Model name"           <span class="comment"># CPU model</span>
<span class="output">Model name: Intel(R) Xeon(R) Platinum 8275CL @ 3.00GHz</span>

<span class="comment"># ════ /proc/cpuinfo — Raw Kernel CPU Data ════</span>
<span class="prompt">$</span> cat /proc/cpuinfo | head -30
<span class="output">processor   : 0                         ← logical CPU index</span>
<span class="output">vendor_id   : GenuineIntel</span>
<span class="output">cpu family  : 6</span>
<span class="output">model       : 85</span>
<span class="output">model name  : Intel(R) Xeon(R) Platinum 8275CL @ 3.00GHz</span>
<span class="output">stepping    : 7</span>
<span class="output">cpu MHz     : 3000.000</span>
<span class="output">cache size  : 16384 KB</span>
<span class="output">physical id : 0</span>
<span class="output">siblings    : 8                          ← total logical CPUs on this socket</span>
<span class="output">core id     : 0                          ← physical core ID</span>
<span class="output">cpu cores   : 4                          ← physical cores on this socket</span>
<span class="output">flags       : fpu vme de avx avx2 sse4_2 ...</span>
<span class="output">bugs        : spectre_v1 spectre_v2 mds  ← known CPU vulnerabilities</span>
<span class="output">bogomips    : 6000.00</span>

<span class="comment"># ════ Useful /proc/cpuinfo extractions ════</span>
<span class="prompt">$</span> grep -c "^processor" /proc/cpuinfo   <span class="comment"># Count logical CPUs</span>
<span class="output">8</span>

<span class="prompt">$</span> grep "model name" /proc/cpuinfo | uniq
<span class="output">model name : Intel(R) Xeon(R) Platinum 8275CL @ 3.00GHz</span>

<span class="prompt">$</span> grep "cpu MHz" /proc/cpuinfo | awk '{sum+=$4; count++} END {printf "Avg: %.0f MHz\n", sum/count}'
<span class="output">Avg: 2987 MHz</span>

<span class="comment"># ════ CPU flags — check for AVX2 (needed for ML libs) ════</span>
<span class="prompt">$</span> grep -m1 flags /proc/cpuinfo | grep -o "avx2"
<span class="output">avx2                 ← NumPy, TensorFlow can use AVX2 instructions</span>

<span class="comment"># ════ Real-time CPU usage ════</span>
<span class="prompt">$</span> top -b -n 1 | head -5
<span class="output">%Cpu(s): 12.5 us, 2.1 sy, 0.0 ni, 84.4 id, 0.8 wa, 0.0 hi, 0.2 si</span>
<span class="comment"># us=user sy=kernel ni=niced id=idle wa=I/O-wait hi=hardware-irq si=softirq</span>

<span class="prompt">$</span> mpstat 1 3                           <span class="comment"># Per-CPU stats every 1s for 3 rounds</span>
<span class="prompt">$</span> sar -u 2 5                           <span class="comment"># CPU utilization every 2s for 5 rounds</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="20" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Physical Cores vs Logical CPUs — The Hyperthreading Math</text>

        <!-- Physical chip -->
        <rect x="10" y="36" width="340" height="192" rx="10" fill="#1a1005" stroke="#fbbf24" stroke-width="2"/>
        <text x="180" y="58" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="bold" font-family="Space Grotesk">1 Physical CPU (Socket)</text>
        <text x="180" y="73" text-anchor="middle" fill="#64748b" font-size="9">Intel Xeon Platinum 8275CL</text>

        <rect x="26"  y="84" width="140" height="56" rx="6" fill="#0a1520" stroke="#34d399" stroke-width="1.5"/>
        <text x="96"  y="106" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold">Physical Core 0</text>
        <rect x="32"  y="114" width="56" height="20" rx="3" fill="#0d1f0d" stroke="#34d399" stroke-width="1"/>
        <text x="60"  y="128" text-anchor="middle" fill="#34d399" font-size="8" font-family="JetBrains Mono">Thread 0</text>
        <rect x="100" y="114" width="56" height="20" rx="3" fill="#0d1f0d" stroke="#34d399" stroke-width="1"/>
        <text x="128" y="128" text-anchor="middle" fill="#34d399" font-size="8" font-family="JetBrains Mono">Thread 1</text>

        <rect x="180" y="84" width="140" height="56" rx="6" fill="#0a1520" stroke="#34d399" stroke-width="1.5"/>
        <text x="250" y="106" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold">Physical Core 1</text>
        <rect x="186" y="114" width="56" height="20" rx="3" fill="#0d1f0d" stroke="#34d399" stroke-width="1"/>
        <text x="214" y="128" text-anchor="middle" fill="#34d399" font-size="8" font-family="JetBrains Mono">Thread 2</text>
        <rect x="254" y="114" width="56" height="20" rx="3" fill="#0d1f0d" stroke="#34d399" stroke-width="1"/>
        <text x="282" y="128" text-anchor="middle" fill="#34d399" font-size="8" font-family="JetBrains Mono">Thread 3</text>

        <rect x="26"  y="152" width="140" height="56" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="96"  y="174" text-anchor="middle" fill="#22d3ee" font-size="10" font-weight="bold">Physical Core 2</text>
        <rect x="32"  y="182" width="56" height="20" rx="3" fill="#0a1f2a" stroke="#22d3ee" stroke-width="1"/>
        <text x="60"  y="196" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Thread 4</text>
        <rect x="100" y="182" width="56" height="20" rx="3" fill="#0a1f2a" stroke="#22d3ee" stroke-width="1"/>
        <text x="128" y="196" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Thread 5</text>

        <rect x="180" y="152" width="140" height="56" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="1.5"/>
        <text x="250" y="174" text-anchor="middle" fill="#22d3ee" font-size="10" font-weight="bold">Physical Core 3</text>
        <rect x="186" y="182" width="56" height="20" rx="3" fill="#0a1f2a" stroke="#22d3ee" stroke-width="1"/>
        <text x="214" y="196" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Thread 6</text>
        <rect x="254" y="182" width="56" height="20" rx="3" fill="#0a1f2a" stroke="#22d3ee" stroke-width="1"/>
        <text x="282" y="196" text-anchor="middle" fill="#22d3ee" font-size="8" font-family="JetBrains Mono">Thread 7</text>

        <!-- Right: the math -->
        <rect x="370" y="36" width="340" height="192" rx="10" fill="#0a1520" stroke="#334155" stroke-width="1"/>
        <text x="540" y="60" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="bold" font-family="Space Grotesk">lscpu Math Explained</text>

        <text x="390" y="88"  fill="#64748b" font-size="10">Socket(s):             1   ← 1 physical CPU chip</text>
        <text x="390" y="108" fill="#64748b" font-size="10">Core(s) per socket:    4   ← 4 physical cores</text>
        <text x="390" y="128" fill="#64748b" font-size="10">Thread(s) per core:    2   ← Hyperthreading ON</text>
        <line x1="390" y1="136" x2="700" y2="136" stroke="#334155" stroke-width="1"/>
        <text x="390" y="154" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">CPU(s) = 1 × 4 × 2 = 8</text>
        <text x="390" y="174" fill="#94a3b8" font-size="9">Logical CPUs (what the OS sees)</text>
        <text x="390" y="195" fill="#64748b" font-size="9">nproc prints this number (8)</text>
        <text x="390" y="215" fill="#64748b" font-size="9">Use this for: Spark --num-executors</text>
        <text x="390" y="218" fill="#64748b" font-size="9">Python mp.Pool(processes=8)</text>
    </svg>
    <div class="caption">Hyperthreading makes 4 physical cores appear as 8 logical CPUs to the OS. For CPU-bound work (ML training), physical cores matter more. For I/O-bound work (web servers), logical CPUs are fine.</div>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 4 — Memory Information
        // ══════════════════════════════════════════════════════
        {
            id: "memory_info",
            content: `
<h3>💾 Memory Information — RAM, Swap & Cache</h3>

<div class="story-box">
    <h4>🪣 The Water Tank Analogy</h4>
    <p>Think of RAM as a water tank. <code>free -h</code> shows you: total tank capacity, how much water is in use, how much is empty, how much is in a special "emergency reserve" (buff/cache, which can be freed instantly if needed), and how much is truly available. And swap is like a backup tanker truck — available in emergencies, but 1000x slower to access.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">memory_commands.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ free — Memory at a Glance ════</span>
<span class="prompt">$</span> free -h
<span class="output">              total   used   free   shared  buff/cache  available</span>
<span class="output">Mem:           15Gi   6.2Gi  1.1Gi   234Mi    8.1Gi      8.8Gi</span>
<span class="output">Swap:          2.0Gi    0     2.0Gi</span>

<span class="prompt">$</span> free -m                              <span class="comment"># In megabytes</span>
<span class="prompt">$</span> free -g                              <span class="comment"># In gigabytes (rounded)</span>
<span class="prompt">$</span> free -b                              <span class="comment"># In raw bytes</span>

<span class="comment"># ════ /proc/meminfo — Full Kernel Memory Report ════</span>
<span class="prompt">$</span> cat /proc/meminfo
<span class="output">MemTotal:       16384000 kB    ← Physical RAM installed</span>
<span class="output">MemFree:         1127424 kB    ← Completely unused</span>
<span class="output">MemAvailable:    9009152 kB    ← What programs can actually use</span>
<span class="output">Buffers:          524288 kB    ← Filesystem metadata cache</span>
<span class="output">Cached:          7864320 kB    ← File content cache (page cache)</span>
<span class="output">SwapCached:           0 kB    ← Pages that were swapped then brought back</span>
<span class="output">Active:          5242880 kB    ← Recently used — won't be swapped soon</span>
<span class="output">Inactive:        3145728 kB    ← Older — candidate for reclaim</span>
<span class="output">SwapTotal:       2097152 kB    ← Total swap space</span>
<span class="output">SwapFree:        2097152 kB    ← Available swap</span>
<span class="output">Dirty:             16384 kB    ← Modified pages not yet written to disk</span>
<span class="output">Slab:             524288 kB    ← Kernel data structure cache</span>
<span class="output">HugePages_Total:       0        ← No huge pages configured</span>

<span class="comment"># ════ lsmem — Physical RAM Layout ════</span>
<span class="prompt">$</span> lsmem
<span class="output">RANGE                                  SIZE  STATE REMOVABLE  BLOCK</span>
<span class="output">0x0000000000000000-0x000000007fffffff    2G  online       yes   0-15</span>
<span class="output">0x0000000100000000-0x000000047fffffff   14G  online       yes  32-143</span>
<span class="output">Memory block size:       128M</span>
<span class="output">Total online memory:      16G</span>

<span class="comment"># ════ dmidecode — Physical RAM Slots ════</span>
<span class="prompt">$</span> sudo dmidecode -t memory | grep -E "Size|Type:|Speed:|Manufacturer"
<span class="output">Size: 8 GB</span>
<span class="output">Type: DDR4</span>
<span class="output">Speed: 3200 MT/s</span>
<span class="output">Manufacturer: Samsung</span>
<span class="output">Size: 8 GB</span>
<span class="output">Type: DDR4</span>
<span class="output">Speed: 3200 MT/s</span>
<span class="output">Manufacturer: Samsung</span>
<span class="comment"># Two 8GB DDR4 sticks = 16GB total</span>

<span class="comment"># ════ vmstat — Memory + Swap + IO in one view ════</span>
<span class="prompt">$</span> vmstat -s | head -15
<span class="output">     16777216 K total memory</span>
<span class="output">      6356992 K used memory</span>
<span class="output">      5242880 K active memory</span>
<span class="output">      3145728 K inactive memory</span>
<span class="output">      1159168 K free memory</span>
<span class="output">       524288 K buffer memory</span>
<span class="output">      8757248 K swap cache</span>
<span class="output">      2097152 K total swap</span>
<span class="output">            0 K used swap</span>
<span class="output">      2097152 K free swap</span>

<span class="prompt">$</span> vmstat 2 5                          <span class="comment"># Live stats every 2s for 5 rounds</span>
<span class="output">procs ---------memory---------- ---swap-- -----io----</span>
<span class="output"> r  b  swpd   free  buff  cache  si  so    bi    bo</span>
<span class="output"> 1  0     0 1159168 524288 8232960  0   0   142    48</span>
<span class="comment"># r=runnable b=blocked si=swap-in so=swap-out bi=block-in bo=block-out</span>
<span class="comment"># si>0 or so>0 = SWAPPING HAPPENING = performance problem!</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 190" xmlns="http://www.w3.org/2000/svg">
        <text x="360" y="18" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Decoding free -h — Every Column Explained</text>

        <rect x="10" y="30" width="700" height="36" rx="6" fill="#001400" stroke="#4ade80" stroke-width="1.5"/>
        <text x="360" y="48" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="JetBrains Mono">             total    used    free   shared  buff/cache  available</text>
        <text x="360" y="62" text-anchor="middle" fill="#4ade80" font-size="11" font-family="JetBrains Mono">Mem:          15Gi    6.2Gi   1.1Gi   234Mi    8.1Gi       8.8Gi</text>

        <rect x="10"  y="80" width="96"  height="100" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="2"/>
        <text x="58"  y="102" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold">15Gi</text>
        <text x="58"  y="118" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">TOTAL</text>
        <text x="58"  y="134" text-anchor="middle" fill="#64748b" font-size="8">Physical RAM</text>
        <text x="58"  y="148" text-anchor="middle" fill="#64748b" font-size="8">installed on</text>
        <text x="58"  y="162" text-anchor="middle" fill="#64748b" font-size="8">motherboard</text>
        <text x="58"  y="176" text-anchor="middle" fill="#64748b" font-size="8">hardware limit</text>

        <rect x="116" y="80" width="96"  height="100" rx="6" fill="#0a1520" stroke="#fbbf24" stroke-width="2"/>
        <text x="164" y="102" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">6.2Gi</text>
        <text x="164" y="118" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">USED</text>
        <text x="164" y="134" text-anchor="middle" fill="#64748b" font-size="8">Apps + kernel</text>
        <text x="164" y="148" text-anchor="middle" fill="#64748b" font-size="8">actively using</text>
        <text x="164" y="162" text-anchor="middle" fill="#64748b" font-size="8">includes buff</text>
        <text x="164" y="176" text-anchor="middle" fill="#64748b" font-size="8">/cache</text>

        <rect x="222" y="80" width="96"  height="100" rx="6" fill="#0a1520" stroke="#f87171" stroke-width="2"/>
        <text x="270" y="102" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">1.1Gi</text>
        <text x="270" y="118" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">FREE</text>
        <text x="270" y="134" text-anchor="middle" fill="#64748b" font-size="8">Truly unused —</text>
        <text x="270" y="148" text-anchor="middle" fill="#64748b" font-size="8">Linux tries to</text>
        <text x="270" y="162" text-anchor="middle" fill="#64748b" font-size="8">keep this near</text>
        <text x="270" y="176" text-anchor="middle" fill="#64748b" font-size="8">zero (uses cache)</text>

        <rect x="328" y="80" width="118" height="100" rx="6" fill="#0a1520" stroke="#34d399" stroke-width="2"/>
        <text x="387" y="102" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">8.1Gi</text>
        <text x="387" y="118" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">BUFF/CACHE</text>
        <text x="387" y="134" text-anchor="middle" fill="#64748b" font-size="8">Disk cache — NOT</text>
        <text x="387" y="148" text-anchor="middle" fill="#64748b" font-size="8">wasted! Freed</text>
        <text x="387" y="162" text-anchor="middle" fill="#64748b" font-size="8">instantly if app</text>
        <text x="387" y="176" text-anchor="middle" fill="#64748b" font-size="8">needs memory</text>

        <rect x="456" y="80" width="118" height="100" rx="6" fill="#0a1520" stroke="#4ade80" stroke-width="3"/>
        <text x="515" y="102" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="bold">8.8Gi</text>
        <text x="515" y="118" text-anchor="middle" fill="#4ade80" font-size="9" font-weight="bold">AVAILABLE ★</text>
        <text x="515" y="134" text-anchor="middle" fill="#64748b" font-size="8">= free + reclaimable</text>
        <text x="515" y="148" text-anchor="middle" fill="#64748b" font-size="8">cache. USE THIS</text>
        <text x="515" y="162" text-anchor="middle" fill="#64748b" font-size="8">to judge if RAM</text>
        <text x="515" y="176" text-anchor="middle" fill="#64748b" font-size="8">is sufficient!</text>

        <rect x="584" y="80" width="126" height="100" rx="6" fill="#1a0505" stroke="#ef4444" stroke-width="2"/>
        <text x="647" y="100" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="bold">Swap: 0</text>
        <text x="647" y="118" text-anchor="middle" fill="#94a3b8" font-size="9" font-weight="bold">SWAP USED</text>
        <text x="647" y="134" text-anchor="middle" fill="#64748b" font-size="8">0 = perfect.</text>
        <text x="647" y="148" text-anchor="middle" fill="#64748b" font-size="8">Any swap = RAM</text>
        <text x="647" y="162" text-anchor="middle" fill="#64748b" font-size="8">pressure. Heavy</text>
        <text x="647" y="176" text-anchor="middle" fill="#64748b" font-size="8">swap = very slow!</text>
    </svg>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 5 — Disk Information
        // ══════════════════════════════════════════════════════
        {
            id: "disk_info",
            content: `
<h3>💿 Disk Information — Storage, Partitions & Space</h3>

<div class="story-box">
    <h4>🏗️ Know Your Storage Before Writing Data</h4>
    <p>A data pipeline that fills the disk is a data pipeline that fails. A data engineer who doesn't check disk layout before mounting a data warehouse is asking for trouble. These commands give you the complete picture: what disks are attached, how they're partitioned, what filesystems are mounted, and how much space remains.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">disk_info_commands.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ lsblk — Block Device Layout (Best Overview) ════</span>
<span class="prompt">$</span> lsblk
<span class="output">NAME    MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT</span>
<span class="output">sda       8:0    0    50G  0 disk</span>
<span class="output">├─sda1    8:1    0    49G  0 part /</span>
<span class="output">└─sda2    8:2    0     1G  0 part [SWAP]</span>
<span class="output">sdb       8:16   0     2T  0 disk</span>
<span class="output">└─sdb1    8:17   0     2T  0 part /data</span>
<span class="output">sr0      11:0    1  1024M  0 rom</span>

<span class="prompt">$</span> lsblk -f                              <span class="comment"># With filesystem type and UUID</span>
<span class="output">NAME    FSTYPE  LABEL  UUID                                 MOUNTPOINT</span>
<span class="output">sda</span>
<span class="output">├─sda1  ext4           a1b2c3d4-e5f6-...                    /</span>
<span class="output">└─sda2  swap           f6e5d4c3-...                         [SWAP]</span>
<span class="output">sdb</span>
<span class="output">└─sdb1  xfs            9876fedc-...                         /data</span>

<span class="prompt">$</span> lsblk -d -o NAME,SIZE,ROTA,TYPE     <span class="comment"># Disk summary — ROTA=1 is HDD, 0 is SSD</span>
<span class="output">NAME  SIZE ROTA TYPE</span>
<span class="output">sda    50G    0 disk    ← 0 = SSD (no rotation)</span>
<span class="output">sdb     2T    1 disk    ← 1 = HDD (spinning disk)</span>

<span class="comment"># ════ df — Mounted Filesystem Usage ════</span>
<span class="prompt">$</span> df -h
<span class="output">Filesystem      Size  Used Avail Use%  Mounted on</span>
<span class="output">udev            7.7G     0  7.7G   0%  /dev</span>
<span class="output">tmpfs           1.6G  2.4M  1.6G   1%  /run</span>
<span class="output">/dev/sda1        49G   22G   25G  47%  /</span>
<span class="output">tmpfs           7.7G  234M  7.5G   3%  /dev/shm</span>
<span class="output">/dev/sdb1       2.0T  800G  1.2T  40%  /data</span>

<span class="prompt">$</span> df -h /                              <span class="comment"># Just root partition</span>
<span class="prompt">$</span> df -h /data                          <span class="comment"># Just the data partition</span>
<span class="prompt">$</span> df -T                                <span class="comment"># Include filesystem type (ext4, xfs, etc.)</span>
<span class="prompt">$</span> df -i                                <span class="comment"># Inode usage (can run out even with free space!)</span>

<span class="comment"># ════ du — Directory Space Usage ════</span>
<span class="prompt">$</span> du -sh ~                             <span class="comment"># How big is my home directory?</span>
<span class="output">2.4G    /home/anuj</span>

<span class="prompt">$</span> du -sh /var/*  2>/dev/null | sort -rh | head -5   <span class="comment"># What's in /var?</span>
<span class="output">15G    /var/log</span>
<span class="output">2.1G   /var/lib</span>
<span class="output">450M   /var/cache</span>

<span class="prompt">$</span> du -sh /data/* 2>/dev/null | sort -rh | head -5   <span class="comment"># Data disk contents</span>
<span class="output">450G   /data/warehouse</span>
<span class="output">200G   /data/raw</span>
<span class="output">100G   /data/processed</span>

<span class="comment"># ════ Disk Hardware Details ════</span>
<span class="prompt">$</span> sudo fdisk -l /dev/sda               <span class="comment"># Partition table details</span>
<span class="output">Disk /dev/sda: 50 GiB, 53687091200 bytes, 104857600 sectors</span>
<span class="output">Disk model: Samsung SSD 870 EVO</span>
<span class="output">Units: sectors of 1 * 512 = 512 bytes</span>
<span class="output">Device     Boot    Start       End  Sectors  Size  Type</span>
<span class="output">/dev/sda1  *        2048 102762495  102760448   49G  Linux filesystem</span>
<span class="output">/dev/sda2       102762496 104857599    2095104    1G  Linux swap</span>

<span class="prompt">$</span> sudo hdparm -I /dev/sda | grep -E "Model|Speed|capacity"
<span class="output">Model Number: Samsung SSD 870 EVO 50GB</span>
<span class="output">Nominal Media Rotation Rate: Solid State Device</span>

<span class="comment"># ════ Find large files ════</span>
<span class="prompt">$</span> find /data -type f -size +1G 2>/dev/null | head -10
<span class="prompt">$</span> find /var/log -name "*.log" -size +100M 2>/dev/null</span></div>
</div>

<div class="info-box">
    <h4>💡 Inode Exhaustion — "No Space Left" When Disk Isn't Full</h4>
    <p>Running out of <strong>inodes</strong> causes "No space left on device" even when <code>df -h</code> shows plenty of free disk space. This happens when millions of tiny files are created (log files, cache entries, temp files). Check with <code>df -i /</code>. If IUse% approaches 100%, you're inode-starved. Fix: delete small files (log rotation), or reformat with more inodes. Common cause: Spark writing thousands of tiny partition files.</p>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 6 — Network Information
        // ══════════════════════════════════════════════════════
        {
            id: "network_info",
            content: `
<h3>🌐 Network Information — Interfaces, IPs & Connections</h3>

<div class="story-box">
    <h4>🗺️ Know Your Server's Address Book</h4>
    <p>On a multi-server data platform — Kafka brokers, Spark masters, Airflow scheduler, PostgreSQL — each machine needs to communicate with the others. Before debugging "can't connect to Kafka on port 9092," you need to know: what IP does this machine have? Is the network interface up? Is the port actually listening? These commands answer all of it.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">network_info_commands.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ ip — Modern Network Tool (replaces ifconfig) ════</span>
<span class="prompt">$</span> ip addr show                          <span class="comment"># All interfaces with IPs</span>
<span class="output">1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536</span>
<span class="output">    link/loopback 00:00:00:00:00:00</span>
<span class="output">    inet 127.0.0.1/8 scope host lo</span>
<span class="output">2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500</span>
<span class="output">    link/ether 0a:1b:2c:3d:4e:5f brd ff:ff:ff:ff:ff:ff</span>
<span class="output">    inet 10.0.0.5/24 brd 10.0.0.255 scope global eth0</span>
<span class="comment"># inet = IPv4 address   /24 = subnet mask (255.255.255.0)</span>

<span class="prompt">$</span> ip addr show eth0                     <span class="comment"># Just one interface</span>
<span class="prompt">$</span> ip link show                          <span class="comment"># Interface status only (no IPs)</span>
<span class="prompt">$</span> ip -br addr                           <span class="comment"># Brief format — easy to read</span>
<span class="output">lo               UNKNOWN        127.0.0.1/8</span>
<span class="output">eth0             UP             10.0.0.5/24</span>

<span class="prompt">$</span> ip route show                         <span class="comment"># Routing table</span>
<span class="output">default via 10.0.0.1 dev eth0 proto dhcp    ← default gateway</span>
<span class="output">10.0.0.0/24 dev eth0 proto kernel scope link ← local subnet</span>
<span class="output">172.17.0.0/16 dev docker0 proto kernel      ← docker network</span>

<span class="comment"># ════ ss — Socket Statistics (modern netstat) ════</span>
<span class="prompt">$</span> ss -tuln                              <span class="comment"># All listening TCP/UDP ports</span>
<span class="output">Netid  State   Local Address:Port  Peer Address:Port</span>
<span class="output">tcp    LISTEN  0.0.0.0:22          0.0.0.0:*       ← SSH on all interfaces</span>
<span class="output">tcp    LISTEN  127.0.0.1:5432      0.0.0.0:*       ← PostgreSQL localhost only</span>
<span class="output">tcp    LISTEN  0.0.0.0:9092        0.0.0.0:*       ← Kafka broker</span>
<span class="output">tcp    LISTEN  0.0.0.0:8080        0.0.0.0:*       ← Airflow webserver</span>
<span class="output">tcp    LISTEN  :::4040             :::*             ← Spark UI (IPv6)</span>

<span class="prompt">$</span> ss -tunp                              <span class="comment"># With process names</span>
<span class="prompt">$</span> ss -t state established               <span class="comment"># Active TCP connections</span>
<span class="prompt">$</span> ss -s                                 <span class="comment"># Summary statistics</span>
<span class="output">Total: 342</span>
<span class="output">TCP:   120 (estab 45, closed 62, orphaned 0, timewait 13)</span>

<span class="comment"># ════ Network connectivity testing ════</span>
<span class="prompt">$</span> ping -c 4 google.com                  <span class="comment"># Test internet connectivity</span>
<span class="prompt">$</span> ping -c 4 10.0.0.6                    <span class="comment"># Test LAN connectivity</span>
<span class="prompt">$</span> traceroute google.com                 <span class="comment"># Trace route to destination</span>
<span class="prompt">$</span> curl -I https://example.com           <span class="comment"># HTTP connectivity test</span>

<span class="comment"># ════ DNS lookup ════</span>
<span class="prompt">$</span> nslookup google.com                   <span class="comment"># DNS query</span>
<span class="prompt">$</span> dig google.com                        <span class="comment"># Detailed DNS query</span>
<span class="prompt">$</span> cat /etc/resolv.conf                  <span class="comment"># Which DNS servers are used?</span>
<span class="output">nameserver 8.8.8.8</span>
<span class="output">nameserver 8.8.4.4</span>
<span class="prompt">$</span> cat /etc/hosts                        <span class="comment"># Local hostname overrides</span>
<span class="output">127.0.0.1   localhost</span>
<span class="output">10.0.0.5    spark-master</span>
<span class="output">10.0.0.6    kafka-broker-01</span>

<span class="comment"># ════ Network hardware info ════</span>
<span class="prompt">$</span> lspci | grep -i "ethernet\|network"
<span class="output">00:05.0 Ethernet controller: Intel 82574L Gigabit NIC</span>
<span class="prompt">$</span> ethtool eth0 | grep -E "Speed|Duplex|Link"
<span class="output">Speed: 10000Mb/s    ← 10 Gigabit connection</span>
<span class="output">Duplex: Full</span>
<span class="output">Link detected: yes</span></div>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 7 — Real-time Performance Monitoring
        // ══════════════════════════════════════════════════════
        {
            id: "realtime_monitoring",
            content: `
<h3>📈 Real-time Performance Monitoring</h3>

<div class="story-box">
    <h4>🚦 The Dashboard Analogy</h4>
    <p>A car dashboard shows speed, RPM, fuel, temperature — all in real time. <code>top</code>, <code>htop</code>, <code>iostat</code>, and <code>vmstat</code> are your server's dashboard. When a pipeline is slow or a server is unresponsive, these are the first tools you open — not log files. They show you what's happening <em>right now</em>, in real time, across CPU, memory, disk I/O, and processes.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">monitoring_commands.sh</span>
    </div>
    <div class="terminal-body"><span class="comment"># ════ top — The Classic Live Monitor ════</span>
<span class="prompt">$</span> top                                  <span class="comment"># Interactive (press q to quit)</span>
<span class="prompt">$</span> top -b -n 1                          <span class="comment"># Non-interactive single snapshot</span>

<span class="comment"># top header decoded:</span>
<span class="output">top - 10:47:32 up 10 days, 2:47, 3 users, load average: 2.45, 1.87, 1.24</span>
<span class="output">Tasks: 146 total, 3 running, 143 sleeping</span>
<span class="output">%Cpu(s): 12.5 us,  2.1 sy,  0.0 ni, 84.2 id,  1.0 wa,  0.0 hi,  0.2 si</span>
<span class="comment"># us=user  sy=kernel  ni=niced  id=idle  wa=I/O-wait  hi=hardware-IRQ  si=soft-IRQ</span>
<span class="output">MiB Mem:  15360.0 total,   1103.4 free,   6349.8 used,   7906.8 buff/cache</span>
<span class="output">MiB Swap:  2048.0 total,   2048.0 free,      0.0 used.   8806.4 avail Mem</span>
<span class="output">PID   USER  PR  NI  VIRT    RES    SHR  S  %CPU  %MEM   TIME+   COMMAND</span>
<span class="output">4521  anuj  20   0  8.0g   4.0g  32.4m  R  45.2  25.4  12:34.56 java</span>
<span class="output">4522  anuj  20   0  4.0g   1.9g  28.1m  S  12.1   8.2   5:12.34 python3</span>

<span class="comment"># top keyboard shortcuts (interactive mode):</span>
<span class="comment"># M = sort by memory   P = sort by CPU   T = sort by time</span>
<span class="comment"># k = kill a process   r = renice   1 = per-CPU breakdown</span>
<span class="comment"># q = quit</span>

<span class="comment"># ════ htop — Better Interactive Monitor ════</span>
<span class="prompt">$</span> htop                                 <span class="comment"># Color, mouse support, tree view</span>
<span class="comment"># Install: sudo apt install htop</span>

<span class="comment"># ════ iostat — Disk I/O Statistics ════</span>
<span class="prompt">$</span> iostat -x 2 3                        <span class="comment"># Extended stats, 2s interval, 3 rounds</span>
<span class="output">Device  rrqm/s wrqm/s  r/s   w/s  rMB/s wMB/s  await  svctm  %util</span>
<span class="output">sda       0.0   12.5  142.0  48.0  1.1    0.4   125.3   6.8   98.5</span>
<span class="output">sdb       0.0    0.5   30.0  10.0  15.0   5.0    12.5   2.1   16.2</span>
<span class="comment"># %util=98.5% on sda = disk nearly SATURATED!</span>
<span class="comment"># await = average time per request in milliseconds</span>
<span class="comment"># rMB/s wMB/s = read/write throughput</span>

<span class="comment"># ════ vmstat — Combined Memory/Swap/IO/CPU ════</span>
<span class="prompt">$</span> vmstat 2 5
<span class="output">procs -----memory------ --swap- ----io---- --system-- -----cpu-----</span>
<span class="output"> r  b  swpd   free  buff   cache  si  so  bi   bo   in  cs us sy id wa</span>
<span class="output"> 2  0     0  1127k  512k  8232k   0   0  142   48  2341  892 12  2 84  1</span>
<span class="comment"># r=runnable  b=blocked  si/so=swap in/out  bi/bo=block in/out</span>

<span class="comment"># ════ sar — System Activity Reporter (historical too!) ════</span>
<span class="prompt">$</span> sar -u 2 5                           <span class="comment"># CPU every 2s for 5 rounds</span>
<span class="prompt">$</span> sar -r 2 5                           <span class="comment"># Memory stats</span>
<span class="prompt">$</span> sar -d 2 5                           <span class="comment"># Disk activity</span>
<span class="prompt">$</span> sar -n DEV 2 5                       <span class="comment"># Network interface stats</span>
<span class="prompt">$</span> sar -A | less                        <span class="comment"># Everything from today's log</span>

<span class="comment"># ════ watch — Run Any Command Repeatedly ════</span>
<span class="prompt">$</span> watch -n 2 'df -h'                   <span class="comment"># Update df -h every 2 seconds</span>
<span class="prompt">$</span> watch -n 1 'free -h'                 <span class="comment"># Memory every 1 second</span>
<span class="prompt">$</span> watch -n 5 'ps aux --sort=-%cpu | head -10'</span></div>
</div>

<div class="visual-container">
    <svg viewBox="0 0 720 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                @keyframes barGrow { from{width:0} to{width:var(--w)} }
                @keyframes barPulse { 0%,100%{opacity:0.7} 50%{opacity:1} }
                .bar{animation:barPulse 2s ease-in-out infinite}
            </style>
        </defs>
        <text x="360" y="18" text-anchor="middle" fill="#e2e8f0" font-size="13" font-weight="bold" font-family="Space Grotesk">Reading %Cpu(s) Line in top — Every Field Explained</text>

        <rect x="10" y="30" width="700" height="36" rx="6" fill="#001400" stroke="#4ade80" stroke-width="1.5"/>
        <text x="360" y="52" text-anchor="middle" fill="#4ade80" font-size="12" font-family="JetBrains Mono">%Cpu(s): 12.5 us,  2.1 sy,  0.0 ni, 84.2 id,  1.0 wa,  0.0 hi,  0.2 si</text>

        <rect x="10"  y="78" width="88"  height="112" rx="6" fill="#0a1520" stroke="#fbbf24" stroke-width="2" class="bar"/>
        <text x="54"  y="104" text-anchor="middle" fill="#fbbf24" font-size="18" font-weight="bold">12.5%</text>
        <text x="54"  y="122" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">us</text>
        <text x="54"  y="140" text-anchor="middle" fill="#64748b" font-size="8">user space</text>
        <text x="54"  y="156" text-anchor="middle" fill="#64748b" font-size="8">YOUR code</text>
        <text x="54"  y="172" text-anchor="middle" fill="#64748b" font-size="8">Python/Java</text>
        <text x="54"  y="184" text-anchor="middle" fill="#64748b" font-size="8">running</text>

        <rect x="108" y="78" width="88"  height="112" rx="6" fill="#0a1520" stroke="#22d3ee" stroke-width="2" class="bar"/>
        <text x="152" y="104" text-anchor="middle" fill="#22d3ee" font-size="18" font-weight="bold">2.1%</text>
        <text x="152" y="122" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold">sy</text>
        <text x="152" y="140" text-anchor="middle" fill="#64748b" font-size="8">system/kernel</text>
        <text x="152" y="156" text-anchor="middle" fill="#64748b" font-size="8">syscalls,</text>
        <text x="152" y="172" text-anchor="middle" fill="#64748b" font-size="8">scheduling,</text>
        <text x="152" y="184" text-anchor="middle" fill="#64748b" font-size="8">drivers</text>

        <rect x="206" y="78" width="88"  height="112" rx="6" fill="#0a1520" stroke="#34d399" stroke-width="3" class="bar"/>
        <text x="250" y="104" text-anchor="middle" fill="#34d399" font-size="18" font-weight="bold">84.2%</text>
        <text x="250" y="122" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold">id</text>
        <text x="250" y="140" text-anchor="middle" fill="#34d399" font-size="8">idle — CPU</text>
        <text x="250" y="156" text-anchor="middle" fill="#34d399" font-size="8">doing nothing.</text>
        <text x="250" y="172" text-anchor="middle" fill="#34d399" font-size="8">HIGH = good,</text>
        <text x="250" y="184" text-anchor="middle" fill="#34d399" font-size="8">plenty headroom</text>

        <rect x="304" y="78" width="88"  height="112" rx="6" fill="#1a1005" stroke="#f87171" stroke-width="2" class="bar"/>
        <text x="348" y="104" text-anchor="middle" fill="#f87171" font-size="18" font-weight="bold">1.0%</text>
        <text x="348" y="122" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">wa</text>
        <text x="348" y="140" text-anchor="middle" fill="#f87171" font-size="8">I/O wait</text>
        <text x="348" y="156" text-anchor="middle" fill="#f87171" font-size="8">CPU idle but</text>
        <text x="348" y="172" text-anchor="middle" fill="#f87171" font-size="8">waiting on disk</text>
        <text x="348" y="184" text-anchor="middle" fill="#f87171" font-size="8">&gt;20% = problem!</text>

        <rect x="402" y="78" width="148" height="112" rx="6" fill="#0a1520" stroke="#a78bfa" stroke-width="2" class="bar"/>
        <text x="476" y="100" text-anchor="middle" fill="#a78bfa" font-size="14" font-weight="bold">0.0 ni  0.0 hi  0.2 si</text>
        <text x="476" y="118" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold">ni / hi / si</text>
        <text x="476" y="136" text-anchor="middle" fill="#64748b" font-size="8">ni = niced processes</text>
        <text x="476" y="152" text-anchor="middle" fill="#64748b" font-size="8">hi = hardware IRQ</text>
        <text x="476" y="168" text-anchor="middle" fill="#64748b" font-size="8">si = software IRQ</text>
        <text x="476" y="184" text-anchor="middle" fill="#64748b" font-size="8">usually near zero</text>

        <rect x="560" y="78" width="150" height="112" rx="6" fill="#0a1520" stroke="#64748b" stroke-width="1"/>
        <text x="635" y="100" text-anchor="middle" fill="#e2e8f0" font-size="11" font-weight="bold">Quick Guide</text>
        <text x="572" y="120" fill="#64748b" font-size="8">us+sy &gt; 90% = CPU bound</text>
        <text x="572" y="136" fill="#64748b" font-size="8">wa &gt; 20% = disk bound</text>
        <text x="572" y="152" fill="#64748b" font-size="8">id &gt; 60% = CPU ok</text>
        <text x="572" y="168" fill="#64748b" font-size="8">si &gt; 5% = network saturation</text>
        <text x="572" y="184" fill="#64748b" font-size="8">press 1 in top = per core view</text>
    </svg>
</div>
`
        },

        // ══════════════════════════════════════════════════════
        // SECTION 8 — Complete System Report
        // ══════════════════════════════════════════════════════
        {
            id: "complete_report",
            content: `
<h3>📋 Building a Complete System Report</h3>

<div class="story-box">
    <h4>🗒️ The New Server Checklist</h4>
    <p>Every time you provision a new server or SSH into an unfamiliar machine, you should run a quick health check. This section shows you how to combine all the commands into a single comprehensive system report — perfect for documentation, capacity planning, or incident response handoff.</p>
</div>

<div class="terminal-block">
    <div class="terminal-header">
        <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
        <span class="terminal-title">full_system_report.sh</span>
    </div>
    <div class="terminal-body"><span class="comment">#!/bin/bash</span>
<span class="comment"># Complete Linux System Information Report</span>
<span class="comment"># Run: bash full_system_report.sh</span>

<span class="output">echo "╔══════════════════════════════════════════════════╗"</span>
<span class="output">echo "  SYSTEM REPORT — \$(date '+%Y-%m-%d %H:%M:%S')"</span>
<span class="output">echo "╚══════════════════════════════════════════════════╝"</span>

<span class="comment"># ── OS & Kernel ──────────────────────────────────</span>
<span class="output">echo ""</span>
<span class="output">echo "── OS & KERNEL ────────────────────────────"</span>
<span class="output">echo "Hostname:   \$(hostname -f)"</span>
<span class="output">echo "OS:         \$(grep PRETTY_NAME /etc/os-release | cut -d= -f2 | tr -d '\"')"</span>
<span class="output">echo "Kernel:     \$(uname -r)"</span>
<span class="output">echo "Arch:       \$(uname -m)"</span>
<span class="output">echo "Uptime:     \$(uptime -p)"</span>
<span class="output">echo "Boot Time:  \$(uptime -s)"</span>
<span class="output">echo "Load Avg:   \$(uptime | awk -F'load average:' '{print \$2}')"</span>

<span class="comment"># ── CPU ────────────────────────────────────────</span>
<span class="output">echo ""</span>
<span class="output">echo "── CPU ────────────────────────────────────"</span>
<span class="output">echo "Model:      \$(grep 'model name' /proc/cpuinfo | uniq | cut -d: -f2 | xargs)"</span>
<span class="output">echo "Cores:      \$(nproc) logical / \$(grep 'cpu cores' /proc/cpuinfo | uniq | awk '{print \$NF}') physical"</span>
<span class="output">echo "Speed:      \$(grep 'cpu MHz' /proc/cpuinfo | head -1 | awk '{printf \"%.0f MHz\", \$NF}')"</span>
<span class="output">echo "AVX2:       \$(grep -m1 flags /proc/cpuinfo | grep -q avx2 && echo YES || echo NO)"</span>

<span class="comment"># ── Memory ─────────────────────────────────────</span>
<span class="output">echo ""</span>
<span class="output">echo "── MEMORY ─────────────────────────────────"</span>
<span class="output">free -h | grep -E "Mem:|Swap:"</span>
<span class="output">echo "Page Cache: \$(awk '/^Cached:/{printf \"%.1f GB\", \$2/1048576}' /proc/meminfo)"</span>

<span class="comment"># ── Disk ───────────────────────────────────────</span>
<span class="output">echo ""</span>
<span class="output">echo "── DISK ───────────────────────────────────"</span>
<span class="output">df -h | grep -vE "tmpfs|udev|none"</span>
<span class="output">echo "Block Devices:"</span>
<span class="output">lsblk -d -o NAME,SIZE,ROTA,TYPE | grep disk</span>

<span class="comment"># ── Network ────────────────────────────────────</span>
<span class="output">echo ""</span>
<span class="output">echo "── NETWORK ────────────────────────────────"</span>
<span class="output">ip -br addr | grep -v "^lo"</span>
<span class="output">echo "Listening ports:"</span>
<span class="output">ss -tuln | grep LISTEN | awk '{print \$5}' | sort -t: -k2 -n</span>

<span class="comment"># ── Top Processes ──────────────────────────────</span>
<span class="output">echo ""</span>
<span class="output">echo "── TOP PROCESSES (CPU) ────────────────────"</span>
<span class="output">ps aux --sort=-%cpu --no-headers | head -5 | awk '{printf "%-10s %5s%% %s\n", \$1, \$3, \$11}'</span>
<span class="output">echo ""</span>
<span class="output">echo "── TOP PROCESSES (MEM) ────────────────────"</span>
<span class="output">ps aux --sort=-%mem --no-headers | head -5 | awk '{printf "%-10s %5s%% %s\n", \$1, \$4, \$11}'</span>
<span class="output">echo ""</span>
<span class="output">echo "══════════════════════════════════════════════"</span></div>
</div>

<div class="tip-box">
    <h4>🎯 The Complete sysinfo Cheat Sheet</h4>
    <p>
        <strong>OS &amp; Kernel:</strong> <code>uname -a</code> · <code>cat /etc/os-release</code> · <code>lsb_release -a</code><br>
        <strong>Uptime &amp; Load:</strong> <code>uptime</code> · <code>uptime -p</code><br>
        <strong>CPU:</strong> <code>lscpu</code> · <code>nproc</code> · <code>cat /proc/cpuinfo</code><br>
        <strong>Memory:</strong> <code>free -h</code> · <code>cat /proc/meminfo</code> · <code>vmstat -s</code><br>
        <strong>Disk:</strong> <code>lsblk</code> · <code>df -h</code> · <code>du -sh *</code> · <code>fdisk -l</code><br>
        <strong>Network:</strong> <code>ip addr show</code> · <code>ip -br addr</code> · <code>ss -tuln</code><br>
        <strong>Live CPU:</strong> <code>top</code> · <code>htop</code> · <code>mpstat 1</code><br>
        <strong>Live Disk I/O:</strong> <code>iostat -x 2</code><br>
        <strong>Live Memory:</strong> <code>vmstat 2</code> · <code>watch free -h</code><br>
        <strong>Hardware deep dive:</strong> <code>sudo dmidecode -t system</code> · <code>lspci</code> · <code>lsusb</code>
    </p>
</div>
`,
            interactiveExample: {
                explanation: "A complete system information report — all commands combined into one workflow.",
                code: `$ uname -a
Linux prod-spark-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux

$ cat /etc/os-release | grep PRETTY
PRETTY_NAME="Ubuntu 22.04.3 LTS"

$ lscpu | grep -E "^CPU\(s\)|Model name|CPU MHz:"
CPU(s):      8
Model name:  Intel(R) Xeon(R) Platinum 8275CL @ 3.00GHz
CPU MHz:     3000.000

$ free -h
              total   used   free   buff/cache   available
Mem:           15Gi   6.2Gi  1.1Gi    8.1Gi       8.8Gi
Swap:          2.0Gi    0    2.0Gi

$ lsblk -d
NAME   SIZE  TYPE
sda     50G  disk   ← OS disk
sdb      2T  disk   ← Data disk

$ df -h | grep -vE "tmpfs|udev"
Filesystem  Size  Used  Avail  Use%  Mounted on
/dev/sda1    49G   22G    25G   47%  /
/dev/sdb1   2.0T  800G  1.2T   40%  /data

$ ip -br addr | grep -v lo
eth0  UP  10.0.0.5/24

$ ss -tuln | grep LISTEN
tcp  LISTEN  0.0.0.0:22    SSH
tcp  LISTEN  0.0.0.0:9092  Kafka
tcp  LISTEN  0.0.0.0:8080  Airflow

$ uptime
10:47 up 10 days, load average: 2.45, 1.87, 1.24`
            }
        }

    ], // end sections

    practiceExercises: [
        {
            id: "si_ex01",
            difficulty: "Easy",
            title: "OS Identity Card",
            description: "Gather the complete OS and kernel identity of your system.",
            starterCode: `$ uname -a
$ uname -r
$ uname -m
$ cat /etc/os-release | grep -E "^NAME|^VERSION="
$ lsb_release -a
$ hostname -f`,
            solution: `$ uname -a
Linux prod-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux

$ uname -r
5.15.0-91-generic

$ uname -m
x86_64

$ cat /etc/os-release | grep -E "^NAME|^VERSION="
NAME="Ubuntu"
VERSION="22.04.3 LTS (Jammy Jellyfish)"

$ lsb_release -a
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.3 LTS
Release:        22.04
Codename:       jammy

$ hostname -f
prod-01.company.internal`,
            explanation: "uname -a is the fastest server fingerprint — kernel version (5.15.0), hostname (prod-01), architecture (x86_64) in one line. The kernel version (5.15) and OS version (22.04.3) are completely independent — you can upgrade one without touching the other. x86_64 = 64-bit Intel/AMD. If you see aarch64 or arm64, it is ARM (AWS Graviton, Apple M1 servers) — software must be compiled for the right arch. lsb_release -a gives the distribution codename (jammy) needed when adding APT sources."
        },
        {
            id: "si_ex02",
            difficulty: "Easy",
            title: "CPU Core Count and Model",
            description: "Extract CPU details using lscpu and nproc. Understand physical vs logical core math.",
            starterCode: `$ nproc
$ lscpu | grep -E "Thread|Core|Socket|^CPU\(s\)"
$ lscpu | grep "Model name"
$ grep -m1 flags /proc/cpuinfo | grep -o "avx2"`,
            solution: `$ nproc
8

$ lscpu | grep -E "Thread|Core|Socket|^CPU\(s\)"
CPU(s):              8
Thread(s) per core:  2
Core(s) per socket:  4
Socket(s):           1

# Math: 1 socket x 4 cores x 2 threads = 8 logical CPUs

$ lscpu | grep "Model name"
Model name: Intel(R) Xeon(R) Platinum 8275CL @ 3.00GHz

$ grep -m1 flags /proc/cpuinfo | grep -o "avx2"
avx2    # AVX2 present — NumPy and TensorFlow use these faster instructions`,
            explanation: "nproc is the one-liner for Spark and Python multiprocessing: Pool(processes=nproc). The lscpu math: sockets x cores-per-socket x threads-per-core = CPU(s). 4 physical cores with hyperthreading appear as 8 logical CPUs to the OS. For CPU-bound ML training, physical cores matter more than logical. For I/O-bound web/API work, logical CPUs are fine. AVX2 enables 256-bit SIMD — NumPy matrix operations run 4x faster with it. Always check before benchmarking."
        },
        {
            id: "si_ex03",
            difficulty: "Easy",
            title: "Memory Availability Check",
            description: "Use free and /proc/meminfo to understand RAM utilization and page cache.",
            starterCode: `$ free -h
$ cat /proc/meminfo | grep -E "MemTotal:|MemAvailable:|Cached:|SwapFree:"
$ swapon --show`,
            solution: `$ free -h
              total   used   free   shared  buff/cache  available
Mem:           15Gi   6.2Gi  1.1Gi   234Mi    8.1Gi      8.8Gi
Swap:          2.0Gi    0    2.0Gi

$ cat /proc/meminfo | grep -E "MemTotal:|MemAvailable:|Cached:|SwapFree:"
MemTotal:      16777216 kB   # 16 GB physical RAM
MemAvailable:   9175040 kB   # 8.75 GB truly available
Cached:         7864320 kB   # 7.5 GB page cache (reclaimable)
SwapFree:       2097152 kB   # all swap free — healthy!

$ swapon --show
NAME      TYPE      SIZE  USED  PRIO
/dev/sda2 partition   2G    0B    -2`,
            explanation: "The most important free -h column is 'available' — not 'free'. Linux uses free RAM as disk cache (buff/cache = 8.1Gi). This looks like high usage but the cache is instantly reclaimable. Available (8.8Gi) = free + reclaimable cache. If available drops below 10% of total RAM, you have real memory pressure. Zero swap used = ideal for data engineering. Any swap usage means processes were forced to disk — a performance warning sign. MemAvailable from /proc/meminfo is the most accurate metric."
        },
        {
            id: "si_ex04",
            difficulty: "Easy",
            title: "Disk Layout and Usage",
            description: "Map all storage with lsblk and check space with df.",
            starterCode: `$ lsblk
$ lsblk -d -o NAME,SIZE,ROTA
$ lsblk -f
$ df -h | grep -vE "tmpfs|udev"
$ df -i | grep -vE "tmpfs|udev"`,
            solution: `$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0    50G  0 disk
├─sda1   8:1    0    49G  0 part /
└─sda2   8:2    0     1G  0 part [SWAP]
sdb      8:16   0     2T  0 disk
└─sdb1   8:17   0     2T  0 part /data

$ lsblk -d -o NAME,SIZE,ROTA
NAME  SIZE  ROTA
sda    50G     0    # ROTA=0 = SSD (solid state, fast)
sdb     2T     1    # ROTA=1 = HDD (spinning, slower)

$ lsblk -f
NAME    FSTYPE  UUID       MOUNTPOINT
sda
sda1    ext4    a1b2c3d4   /
sda2    swap    f6e5d4c3   [SWAP]
sdb
sdb1    xfs     9876fedc   /data

$ df -h | grep -vE "tmpfs|udev"
Filesystem  Size  Used  Avail  Use%  Mounted on
/dev/sda1    49G   22G    25G   47%  /
/dev/sdb1   2.0T  800G  1.2T   40%  /data

$ df -i | grep -vE "tmpfs|udev"
Filesystem  Inodes   IUsed   IFree  IUse%  Mounted on
/dev/sda1  3276800   97264 3179536     3%  /
/dev/sdb1 131072000 1024000 130048000   1%  /data`,
            explanation: "lsblk shows the full device tree — physical disks and their partitions. ROTA=0 means SSD (no rotating platter), ROTA=1 is HDD. For data lakes, always check whether /data is on SSD or HDD — Parquet reads are 50x faster on SSD. df -i checks inode space — separate from byte space. Running out of inodes produces 'No space left on device' even when df -h shows free space. Happens when a job creates millions of tiny files. Alert threshold: IUse% > 80% on data partitions."
        },
        {
            id: "si_ex05",
            difficulty: "Easy",
            title: "Network Interfaces and Listening Ports",
            description: "Identify IP addresses and discover which services are externally reachable.",
            starterCode: `$ ip -br addr
$ ip route show | grep default
$ ss -tuln | grep LISTEN`,
            solution: `$ ip -br addr
lo     UNKNOWN  127.0.0.1/8
eth0   UP       10.0.0.5/24
docker0 DOWN    172.17.0.1/16

$ ip route show | grep default
default via 10.0.0.1 dev eth0 proto dhcp

$ ss -tuln | grep LISTEN
tcp  LISTEN  0.0.0.0:22      # SSH reachable from anywhere
tcp  LISTEN  127.0.0.1:5432  # PostgreSQL localhost ONLY
tcp  LISTEN  0.0.0.0:9092    # Kafka reachable from anywhere
tcp  LISTEN  :::4040         # Spark UI on IPv6 wildcard`,
            explanation: "ip -br addr is the fastest interface overview — UP/DOWN state plus IP in one line. 0.0.0.0:port = listening on all IPv4 interfaces = externally reachable. 127.0.0.1:port = localhost only = not externally reachable. PostgreSQL bound to localhost is correct security practice — databases should never be directly exposed. Kafka on 0.0.0.0 means any machine on the network can connect. docker0 DOWN means Docker installed but no containers running. The /24 means 256 addresses (10.0.0.0 to 10.0.0.255) are on the local subnet."
        },
        {
            id: "si_ex06",
            difficulty: "Medium",
            title: "Load Average Interpretation",
            description: "Calculate CPU utilization from load averages and determine if the system is overloaded.",
            starterCode: `$ uptime
$ cat /proc/loadavg
$ nproc
$ python3 -c "
import os
load1, load5, load15 = os.getloadavg()
cpus = os.cpu_count()
pct = load1 / cpus * 100
trend = 'RISING' if load1 > load15 else 'FALLING' if load1 < load15 else 'STABLE'
print(f'Load: {load1:.2f} / {load5:.2f} / {load15:.2f}')
print(f'CPUs: {cpus}')
print(f'1-min utilization: {pct:.1f}%')
print(f'Trend: {trend}')
print(f'Status: {"OVERLOADED" if load1 > cpus else "OK"}')"`,
            solution: `$ uptime
 10:47:32 up 10 days, load average: 2.45, 1.87, 1.24

$ cat /proc/loadavg
2.45 1.87 1.24 4/247 3847
# 4 processes running / 247 total / last PID = 3847

$ nproc
8

$ python3 ...
Load: 2.45 / 1.87 / 1.24
CPUs: 8
1-min utilization: 30.6%
Trend: RISING       # 1-min (2.45) > 15-min (1.24) = getting busier
Status: OK`,
            explanation: "Load average is ONLY meaningful divided by CPU count. Rule: load > core_count means processes are queuing. On 8 cores: load=8.0 is 100% busy, load=16.0 is 200% (system struggling). Trend matters as much as absolute value: a rising trend from 1.0 to 2.45 over 15 minutes means something started consuming CPU — find it with ps aux --sort=-%cpu. Load average includes I/O-waiting processes — a system with load=8 from I/O wait is less alarming than load=8 from pure CPU, since disk completion will naturally relieve it."
        },
        {
            id: "si_ex07",
            difficulty: "Medium",
            title: "Find What Is Eating Disk Space",
            description: "Track down disk consumers with du and find — the essential disk full investigation workflow.",
            starterCode: `# Root filesystem at 92% — find the culprit

$ du -sh /var/* 2>/dev/null | sort -rh | head -5
$ find /var/log -name "*.log" -size +100M 2>/dev/null
$ find /tmp -atime +7 2>/dev/null | wc -l
$ du -sh /var/cache/apt/archives/`,
            solution: `$ du -sh /var/* 2>/dev/null | sort -rh | head -5
18G    /var/log       # FOUND IT
2.1G   /var/lib
450M   /var/cache

$ find /var/log -name "*.log" -size +100M 2>/dev/null
/var/log/syslog     12GB   # runaway logger!
/var/log/kern.log   2.1GB

# Empty without deleting (safe — running processes keep the inode):
$ sudo truncate -s 0 /var/log/syslog

$ find /tmp -atime +7 2>/dev/null | wc -l
1247    # 1247 temp files older than 7 days
$ sudo find /tmp -atime +7 -delete

$ du -sh /var/cache/apt/archives/
1.4G    /var/cache/apt/archives/
$ sudo apt-get clean   # Safe to delete — downloads only`,
            explanation: "Disk investigation: df -h shows the full partition, du -sh /partition/* | sort -rh drills into it, repeat until culprit found. Top disk hogs: (1) /var/log unbounded growth — fix with logrotate or truncate, (2) /var/cache/apt — safe to clean with apt-get clean, (3) /tmp stale files — find -atime +7 -delete, (4) job temp files in /data. truncate -s 0 empties a file while keeping its inode — important when a running process has it open, since deletion would not release disk space until the file descriptor closes. Always truncate running log files, never rm them."
        },
        {
            id: "si_ex08",
            difficulty: "Medium",
            title: "top Output Decoding",
            description: "Extract CPU metrics from top in batch mode — essential for monitoring scripts.",
            starterCode: `$ top -b -n 1 | grep "%Cpu"
$ top -b -n 1 | grep "%Cpu" | awk '{idle=$8+0; printf "Used: %.1f%%\nIdle: %.1f%%\niowait: %.1f%%\n", 100-idle, idle, $10+0}'
$ top -b -n 3 -d 1 | grep "%Cpu" | awk '{idle+=$8+0; c++} END {printf "3-sample avg used: %.1f%%\n", 100-idle/c}'
$ ps aux --sort=-%cpu --no-headers | head -1 | awk '{print "Top CPU process:", $11, "at", $3"%"}'`,
            solution: `$ top -b -n 1 | grep "%Cpu"
%Cpu(s): 12.5 us,  2.1 sy,  0.0 ni, 84.2 id,  1.0 wa

$ top -b -n 1 | grep "%Cpu" | awk '{idle=$8+0; printf "Used: %.1f%%\nIdle: %.1f%%\niowait: %.1f%%\n", 100-idle, idle, $10+0}'
Used: 15.8%
Idle: 84.2%
iowait: 1.0%

$ top -b -n 3 -d 1 | grep "%Cpu" | awk '{idle+=$8+0; c++} END {printf "3-sample avg used: %.1f%%\n", 100-idle/c}'
3-sample avg used: 16.3%

$ ps aux --sort=-%cpu --no-headers | head -1 | awk '{print "Top CPU process:", $11, "at", $3"%"}'
Top CPU process: java at 45.2%`,
            explanation: "top -b (batch) -n 1 (one sample) is how you use top in non-interactive scripts. The idle field is $8 in top output — CPU used = 100 - idle. $10 is iowait%. iowait > 10% is an early disk bottleneck warning — before iostat shows 100% util, iowait climbs in top. Three samples with -n 3 -d 1 gives a more stable reading than one snapshot. Always check top CPU process alongside the aggregate — 15% total usage but one process at 45% means one bad actor; 15% evenly spread is healthy background load."
        },
        {
            id: "si_ex09",
            difficulty: "Medium",
            title: "iostat Disk Performance",
            description: "Use iostat to measure disk throughput and detect I/O saturation.",
            starterCode: `$ iostat
$ iostat -x 2 2 | grep -v "^$" | head -12
$ iostat -x 1 1 | awk 'NR>6 && $NF~/[0-9]/ {printf "%-6s util:%5s%% await:%6sms reads:%5sMB/s writes:%5sMB/s\n", $1, $NF, $10, $6, $7}'`,
            solution: `$ iostat
avg-cpu:  %user  %nice  %system  %iowait  %idle
          12.54   0.00     2.10     1.00  84.36

Device    tps    kB_read/s   kB_wrtn/s
sda      48.20     1126.40      409.60   # OS disk
sdb      10.50    15360.00     5120.00   # data disk

$ iostat -x 2 2 | grep -v "^$" | head -12
Device  r/s   w/s  rMB/s  wMB/s  await  r_await  w_await  %util
sda    142.0  48.0   1.1    0.4   125.3   130.0    112.0   98.5
sdb     30.0  10.0  15.0    5.0    12.5    10.0     18.0   16.2

# sda: 98.5% util with 125ms await = SATURATED and SLOW
# sdb: 16.2% util with 12.5ms await = healthy

$ iostat -x 1 1 | awk 'NR>6 && $NF~/[0-9]/ {printf "%-6s util:%5s%% await:%6sms reads:%5sMB/s writes:%5sMB/s\n", $1, $NF, $10, $6, $7}'
sda    util: 98.5%  await: 125.3ms reads:  1.1MB/s  writes:  0.4MB/s
sdb    util: 16.2%  await:  12.5ms reads: 15.0MB/s  writes:  5.0MB/s`,
            explanation: "%util is the primary iostat metric — over 80% causes latency spikes, over 95% is saturated. await is average I/O latency in milliseconds. Normal: NVMe SSD <0.1ms, SATA SSD <1ms, HDD <10ms. The example shows sda with 125ms await — an SSD at this latency means it is completely overloaded and I/O requests are queuing. High rMB/s with low %util = large sequential reads (normal for data lake scans). High %util with low MB/s = many small random I/Os (problematic — common with row-based formats instead of Parquet)."
        },
        {
            id: "si_ex10",
            difficulty: "Medium",
            title: "Hardware Inventory",
            description: "Use dmidecode and lspci to build a hardware inventory — manufacturer, RAM slots, GPU.",
            starterCode: `$ sudo dmidecode -t system | grep -E "Manufacturer|Product|Version"
$ sudo dmidecode -t memory | grep -E "Size:|Type:|Speed:|Manufacturer:" | head -12
$ sudo dmidecode -t bios | grep -E "Vendor|Version|Release Date"
$ lspci | grep -iE "vga|3d|nvidia|amd|intel.*graphics"
$ lspci | grep -i "ethernet"`,
            solution: `$ sudo dmidecode -t system | grep -E "Manufacturer|Product|Version"
    Manufacturer: Amazon EC2
    Product Name: m5.4xlarge     # instance type confirmed!
    Version: Not Specified

$ sudo dmidecode -t memory | grep -E "Size:|Type:|Speed:|Manufacturer:" | head -12
    Size: 8 GB
    Type: DDR4
    Speed: 3200 MT/s
    Manufacturer: Samsung
    Size: 8 GB
    Type: DDR4
    Speed: 3200 MT/s
    Manufacturer: Samsung
    Size: No Module Installed    # 2 empty slots — can add more!
    Size: No Module Installed

$ sudo dmidecode -t bios | grep -E "Vendor|Version|Release Date"
    Vendor: Amazon EC2
    Version: 1.0
    Release Date: 08/24/2006

$ lspci | grep -iE "vga|3d|nvidia|amd|intel.*graphics"
00:02.0 VGA: NVIDIA Tesla V100 16GB    # GPU found!

$ lspci | grep -i "ethernet"
00:05.0 Ethernet controller: Intel 82599ES 10-Gigabit`,
            explanation: "dmidecode reveals what /proc does not: physical RAM slot details. Two 8GB sticks in a 4-slot board means 16GB expandable to 32GB without new hardware. lspci shows the PCIe bus devices — this is where GPUs, 10G NICs, and NVMe SSDs appear. For ML workloads, always lspci | grep -i nvidia BEFORE installing CUDA — no output means no GPU and CUDA setup is pointless. On cloud instances, dmidecode reveals the instance type (m5.4xlarge) which is useful when you did not provision the server yourself."
        },
        {
            id: "si_ex11",
            difficulty: "Hard",
            title: "First-Five-Minutes Server Assessment",
            description: "Run a complete systematic assessment of an unknown server in under 5 minutes.",
            starterCode: `echo "=== IDENTITY ===" && uname -a && cat /etc/os-release | grep PRETTY && hostname -f
echo "=== HEALTH ===" && uptime && free -h && df -h | grep -vE "tmpfs|udev"
echo "=== HARDWARE ===" && echo "CPUs: $(nproc)" && echo "RAM: $(free -g | awk '/Mem/{print $2}')GB"
echo "=== NETWORK ===" && ip -br addr | grep -v lo && ss -tuln | grep LISTEN
echo "=== SERVICES ===" && systemctl list-units --type=service --state=running --no-legend | head -10`,
            solution: `=== IDENTITY ===
Linux data-pipeline-01 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux
PRETTY_NAME="Ubuntu 22.04.3 LTS"
data-pipeline-01.company.internal

=== HEALTH ===
 10:47 up 10 days, load average: 2.45, 1.87, 1.24
              total   used   free  buff/cache  available
Mem:           15Gi  6.2Gi  1.1Gi    8.1Gi       8.8Gi
Swap:          2.0Gi    0   2.0Gi
Filesystem  Size  Used  Avail  Use%
/dev/sda1    49G   22G    25G   47%  /
/dev/sdb1   2.0T  800G  1.2T   40%  /data

=== HARDWARE ===
CPUs: 8
RAM: 15GB

=== NETWORK ===
eth0  UP  10.0.0.5/24
Listening: 0.0.0.0:22  0.0.0.0:9092  0.0.0.0:8080  127.0.0.1:5432

=== SERVICES ===
kafka.service        loaded active running
airflow.service      loaded active running
postgresql.service   loaded active running
ssh.service          loaded active running

# ASSESSMENT: 8-core server, 15GB RAM, 2TB data disk.
# Kafka + Airflow + PostgreSQL running.
# Kafka externally accessible, PostgreSQL localhost-only (correct).
# Load 2.45 on 8 cores = 30.6% — healthy headroom.
# Disk at 47%/40% — no immediate concern.`,
            explanation: "This five-command sequence covers: identity (what OS, what machine), health (load, memory, disk), hardware (cores, RAM), network (IPs, open ports), services (what is running). In under 2 minutes you know: whether to install software (kernel/OS compatibility), whether to run a job (memory and load headroom), whether the network is correct (PostgreSQL correctly localhost-only), and what services to not interrupt. If load were at 14 on 8 cores, you would investigate before adding more load. If disk were at 95%, you would free space before writing data."
        },
        {
            id: "si_ex12",
            difficulty: "Hard",
            title: "System Health Alert Script",
            description: "Write a monitoring script that alerts when CPU load, memory, or disk exceed safe thresholds.",
            starterCode: `cat > ~/health_check.sh << 'SCRIPT'
#!/bin/bash
ALERTS=0

# CPU load check
LOAD=$(awk '{print $1}' /proc/loadavg)
CORES=$(nproc)
LOAD_PCT=$(python3 -c "print(int($LOAD/$CORES*100))")
[ "$LOAD_PCT" -gt 80 ] && echo "WARN: CPU load \${LOAD_PCT}% (\${LOAD} on \${CORES} cores)" && ALERTS=$((ALERTS+1))

# Memory check
AVAIL=$(awk '/MemAvailable/{print $2}' /proc/meminfo)
TOTAL=$(awk '/MemTotal/{print $2}' /proc/meminfo)
AVAIL_PCT=$(python3 -c "print(int($AVAIL/$TOTAL*100))")
[ "$AVAIL_PCT" -lt 20 ] && echo "WARN: Memory only \${AVAIL_PCT}% available" && ALERTS=$((ALERTS+1))

# Disk check
while read -r USE MOUNT; do
    PCT=\${USE%%%}
    [ "$PCT" -gt 85 ] && echo "WARN: \${MOUNT} at \${PCT}% full" && ALERTS=$((ALERTS+1))
done < <(df | grep -vE "tmpfs|udev|Filesystem" | awk '{print $5, $6}')

[ "$ALERTS" -eq 0 ] && echo "OK: All systems healthy" || echo "ALERT: $ALERTS issue(s) found"
SCRIPT
chmod +x ~/health_check.sh && bash ~/health_check.sh`,
            solution: `$ bash ~/health_check.sh

# Healthy output:
OK: All systems healthy

# Stressed system:
WARN: CPU load 183% (14.64 on 8 cores)
WARN: Memory only 4% available
WARN: / at 92% full
WARN: /data at 87% full
ALERT: 4 issue(s) found

# Schedule every 5 minutes:
$ crontab -e
# Add:
*/5 * * * * /home/anuj/health_check.sh >> /var/log/health.log 2>&1`,
            explanation: "The script uses /proc directly for reliability — no parsing human-readable output. awk '/MemAvailable/{print $2}' extracts the exact kilobyte value. The ${USE%%%} strips the trailing % from df output (bash parameter substitution: %% removes the longest suffix match of %). The while read -r loop with process substitution < <(df ...) reads each filesystem line without spawning a subshell. ALERTS counter enables the summary line. For production monitoring, add: swap check, OOM event check (dmesg | grep oom), network connectivity check (ping gateway), and service status checks (systemctl is-active)."
        },
        {
            id: "si_ex13",
            difficulty: "Hard",
            title: "vmstat Live Analysis",
            description: "Use vmstat to understand memory pressure, swapping, and I/O — the most information-dense monitoring command.",
            starterCode: `$ vmstat -S M 1 5    # MB units, every 1s for 5 samples
$ vmstat -s | head -15
$ vmstat -d | head -8

# Decode the live output:
# r=runnable  b=blocked  swpd=swap_used  si=swap_in  so=swap_out
# bi=disk_reads  bo=disk_writes  us=user_cpu  wa=iowait_cpu`,
            solution: `$ vmstat -S M 1 5
procs --memory(MB)-- --swap-- ---io--- ------cpu-----
 r  b  swpd  free  buff  cache  si  so   bi   bo  us sy id wa
 2  0     0  1103   512  7906    0   0  142   48  12  2 84  1
 2  0     0  1098   512  7906    0   0  128   52  13  2 84  1
 3  0     0  1095   511  7904    0   0  160   44  14  2 83  1
 2  0     0  1093   511  7904    0   0  140   48  12  2 84  1
 2  0     0  1090   511  7902    0   0  144   48  12  2 84  1

# Healthy profile:
# si=0 so=0 = no swapping
# wa=1% = almost no I/O wait
# id=84% = plenty of idle CPU
# free slowly declining = page cache growth (normal)

$ vmstat -s | head -8
     16777216 K total memory
      6356992 K used memory
      5242880 K active memory
      3145728 K inactive memory
      1159168 K free memory
       524288 K buffer memory
      7864320 K swap cache
            0 K used swap      # perfect

# Distressed system (memory pressure + swapping):
# r=8 b=4 swpd=4096 free=100 si=450 so=380 bi=9200 bo=6100 wa=39`,
            explanation: "vmstat one-line view: r (runnable, want CPU) + b (blocked, waiting for I/O) tells you system stress instantly. si and so are the most critical columns — swap-in (si > 0) means RAM was previously short, swap-out (so > 0) means RAM is SHORT RIGHT NOW. bi and bo are disk reads and writes in blocks per second — correlated with iostat. The distressed example shows: 8 processes want CPU but 4 are blocked on I/O, 4GB swap in use, only 100MB free, heavy swap both directions (450 in + 380 out = thrashing), disk at 9200 reads + 6100 writes blocks/s, 39% iowait. This is a system in crisis — swap thrashing kills performance completely."
        },
        {
            id: "si_ex14",
            difficulty: "Hard",
            title: "Network Connectivity Diagnosis Ladder",
            description: "Systematically diagnose why a service cannot be reached using the network diagnosis ladder.",
            starterCode: `# Cannot connect to Kafka on kafka-broker-01:9092

# Step 1: DNS resolution
$ nslookup kafka-broker-01
$ dig kafka-broker-01 +short

# Step 2: Network path (ICMP)
$ ping -c 3 kafka-broker-01

# Step 3: TCP port (is it open?)
$ nc -zv kafka-broker-01 9092

# Step 4: From the Kafka server itself
$ ssh kafka-broker-01 "ss -tuln | grep 9092"
$ ssh kafka-broker-01 "systemctl is-active kafka"
$ ssh kafka-broker-01 "journalctl -u kafka --since '10 min ago' | tail -20"`,
            solution: `# Step 1: DNS
$ dig kafka-broker-01 +short
10.0.0.6    # resolved OK

# Step 2: ICMP
$ ping -c 3 10.0.0.6
3 packets transmitted, 3 received, 0% packet loss  # network path OK

# Step 3: TCP port
$ nc -zv 10.0.0.6 9092
Connection refused    # PORT IS CLOSED — service not listening

# Step 4: SSH investigation
$ ssh kafka-broker-01 "ss -tuln | grep 9092"
(no output)    # Kafka NOT listening on 9092

$ ssh kafka-broker-01 "systemctl is-active kafka"
failed         # Service crashed

$ ssh kafka-broker-01 "journalctl -u kafka --since '10 min ago' | tail -5"
Mar 09 10:15:32 kafka: FATAL: Could not bind to 9092: Address already in use
Mar 09 10:15:32 kafka: Exiting due to fatal exception

# Root cause: another process grabbed port 9092 before Kafka restarted
$ ssh kafka-broker-01 "ss -tulnp | grep 9092"
tcp LISTEN  0.0.0.0:9092  pid=8834  # another process!
$ ssh kafka-broker-01 "ps -p 8834 -o comm"
zombie_app    # the culprit found`,
            explanation: "Network diagnosis is a strict ladder: each step assumes the previous passed. DNS fail = hostname does not resolve (check /etc/hosts and DNS server). Ping fail = no network path (routing, firewall at ICMP level). nc fail = path exists but port blocked (service down or firewall drops TCP). Connection refused specifically means the host is reachable but nothing is listening on that port — different from timeout (firewall dropping packets silently). journalctl -u service is always the first investigation when systemctl is-active returns 'failed'. 'Address already in use' on startup = something else grabbed the port, usually a zombie from a previous crash."
        },
        {
            id: "si_ex15",
            difficulty: "Hard",
            title: "Memory Leak Detection",
            description: "Identify a memory leak by tracking RSS growth over time using /proc.",
            starterCode: `# Identify a process with growing RSS

$ ps aux --sort=-%mem | head -5

# Track specific process RSS over time
PID=$(pgrep -f "java" | head -1)
for i in {1..5}; do
    RSS=$(awk '/VmRSS/{print $2}' /proc/$PID/status 2>/dev/null)
    echo "$(date +%H:%M:%S) RSS: \${RSS} kB ($(( RSS/1024 )) MB)"
    sleep 5
done

# Calculate growth rate
$ dmesg | grep -i "oom\|killed process" | tail -5`,
            solution: `$ ps aux --sort=-%mem | head -3
USER   PID %CPU %MEM    VSZ      RSS  COMMAND
anuj  4521  2.1 35.4  8456789  5832704  java -jar app.jar
anuj  4522  0.8 12.1  4234567  1990656  python3

$ PID=$(pgrep -f "java" | head -1)
$ for i in {1..5}; do
    RSS=$(awk '/VmRSS/{print $2}' /proc/$PID/status)
    echo "$(date +%H:%M:%S) RSS: \${RSS} kB ($(( RSS/1024 )) MB)"
    sleep 5
done
10:47:00 RSS: 5832704 kB (5696 MB)
10:47:05 RSS: 5876736 kB (5739 MB)   +43 MB in 5 seconds!
10:47:10 RSS: 5918720 kB (5780 MB)   still growing
10:47:15 RSS: 5963776 kB (5824 MB)   no plateau
10:47:20 RSS: 6007808 kB (5867 MB)   LEAK CONFIRMED

# Rate: 43MB per 5s = 8.6 MB/s = 516 MB/min = 30 GB/hour!
# Machine has 15GB total — OOM Killer will fire in ~30 minutes

$ dmesg | grep -i "oom" | tail -2
Out of memory: Kill process 4500 (java) score 847 or sacrifice child
Killed process 4500 (java) total-vm:8456789kB anon-rss:4194304kB
# Previous instance already killed — repeat offender`,
            explanation: "Memory leak diagnosis: ps --sort=-%mem identifies suspects by current RSS. /proc/PID/status VmRSS tracks growth over time — a healthy process plateaus, a leaking one grows monotonically. Growth rate predicts OOM Killer timing: (available_MB / growth_MB_per_min) = minutes until crash. The dmesg OOM history reveals whether this is a recurring problem. Immediate fix: systemctl restart service (clears memory). Long-term fix: Java heap dump with jmap -dump then Eclipse MAT analysis; Python memory profile with tracemalloc or objgraph. Adding -Xmx4g to JVM limits heap growth but does not fix the leak — it just slows the crash."
        },
        {
            id: "si_ex16",
            difficulty: "Hard",
            title: "JSON System Snapshot for Before/After Comparison",
            description: "Capture system specs as structured JSON — useful for upgrade validation and hardware inventory.",
            starterCode: `python3 -c "
import json, subprocess, os

def sh(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True).stdout.strip()

specs = {
    'hostname': sh('hostname -f'),
    'os':       sh('grep PRETTY_NAME /etc/os-release | cut -d= -f2 | tr -d \'\"\' '),
    'kernel':   sh('uname -r'),
    'cpu_logical': int(sh('nproc')),
    'ram_gb':   round(int(sh('awk \'/MemTotal/{print \$2}\' /proc/meminfo')) / 1048576, 1),
    'load_1m':  float(sh('cut -d\' \' -f1 /proc/loadavg')),
    'uptime_days': round(float(sh('cut -d\' \' -f1 /proc/uptime')) / 86400, 1),
    'disks': {}
}

for line in sh('lsblk -d -o NAME,SIZE,ROTA --noheadings').splitlines():
    p = line.split()
    if len(p) >= 3:
        specs['disks'][p[0]] = {'size': p[1], 'type': 'SSD' if p[2]=='0' else 'HDD'}

print(json.dumps(specs, indent=2))
"`,
            solution: `$ python3 -c "..."

# Old server output:
{
  "hostname": "data-01.company.internal",
  "os": "Ubuntu 20.04.6 LTS",
  "kernel": "5.4.0-169-generic",
  "cpu_logical": 4,
  "ram_gb": 7.7,
  "load_1m": 3.21,
  "uptime_days": 45.2,
  "disks": {
    "sda": {"size": "100G", "type": "HDD"}
  }
}

# New server output (after upgrade):
{
  "hostname": "data-01.company.internal",
  "os": "Ubuntu 22.04.3 LTS",
  "kernel": "5.15.0-91-generic",
  "cpu_logical": 8,
  "ram_gb": 15.9,
  "load_1m": 0.82,
  "uptime_days": 0.1,
  "disks": {
    "sda": {"size": "50G",  "type": "SSD"},
    "sdb": {"size": "2.0T", "type": "HDD"}
  }
}

# Upgrade results: CPUs 4->8 (2x), RAM 7.7->15.9GB (2x),
# Disk HDD->SSD+HDD, OS 20.04->22.04, load 3.21->0.82 (same workload, faster hardware)`,
            explanation: "JSON snapshots enable programmatic before/after comparison. Save as server_specs_YYYY-MM-DD.json with timestamps and diff the files to spot changes across upgrades. Run this script across all servers to build a hardware inventory database. The load_1m comparison is meaningful only if captured at similar system load."
        },
        {
            id: "si_ex17",
            difficulty: "Hard",
            title: "Capacity Planning Report",
            description: "Generate a full capacity assessment with utilization percentages and recommendations.",
            starterCode: `python3 << 'EOF'
import subprocess, os

def sh(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True).stdout.strip()

# CPU
load = float(sh("cut -d' ' -f1 /proc/loadavg"))
cores = os.cpu_count()
cpu_pct = min(load / cores * 100, 100)

# Memory
mem = {l.split(':')[0]: int(l.split()[1]) for l in open('/proc/meminfo') if ':' in l}
mem_pct = (mem['MemTotal'] - mem['MemAvailable']) / mem['MemTotal'] * 100

# Disk
disks = []
for line in sh("df | grep -vE 'tmpfs|udev|Filesystem'").splitlines():
    parts = line.split()
    if len(parts) >= 6:
        disks.append((int(parts[4].rstrip('%')), parts[5]))

print(f"{'='*50}")
print(f" CAPACITY REPORT — {sh('hostname')} — {sh('date +%Y-%m-%d')}")
print(f"{'='*50}")
print(f"CPU:    {cores} cores,  {cpu_pct:.0f}% utilized,  load={load:.2f}")
print(f"Memory: {mem['MemTotal']//1048576}GB total,  {mem_pct:.0f}% utilized")
for pct, mount in disks:
    print(f"Disk:   {mount} at {pct}%")
print()
print("RECOMMENDATIONS:")
if cpu_pct > 80: print("  X CPU: Add worker nodes")
elif cpu_pct > 60: print("  ! CPU: Monitor closely")
else: print(f"  OK CPU: {100-cpu_pct:.0f}% headroom")
if mem_pct > 80: print("  X Memory: Upgrade RAM")
elif mem_pct > 60: print("  ! Memory: Monitor closely")
else: print(f"  OK Memory: {100-mem_pct:.0f}% headroom")
for pct, mount in disks:
    if pct > 85: print(f"  X Disk {mount}: CRITICAL — clean up now")
    elif pct > 70: print(f"  ! Disk {mount}: Plan for cleanup")
    else: print(f"  OK Disk {mount}: {100-pct}% free")
EOF`,
            solution: `==================================================
 CAPACITY REPORT — data-pipeline-01 — 2024-03-09
==================================================
CPU:    8 cores,  31% utilized,  load=2.45
Memory: 15GB total,  39% utilized
Disk:   / at 47%
Disk:   /data at 40%

RECOMMENDATIONS:
  OK CPU: 69% headroom
  OK Memory: 61% headroom
  OK Disk /: 53% free
  OK Disk /data: 60% free

# Stressed system:
==================================================
CPU:    8 cores,  100% utilized,  load=15.23
Memory: 15GB total,  95% utilized
Disk:   / at 92%
Disk:   /data at 87%

RECOMMENDATIONS:
  X CPU: Add worker nodes
  X Memory: Upgrade RAM
  X Disk /: CRITICAL — clean up now
  ! Disk /data: Plan for cleanup`,
            explanation: "Capacity planning translates raw metrics into decisions. Thresholds: 60% = watch, 80% = act, 95% = crisis. CPU load is capped at 100% in the formula because load > cores means queuing — showing 190% is confusing, 100% is more actionable. Memory pct uses MemAvailable for the true picture. Disk check loops all real filesystems by filtering out tmpfs and udev. The real value is running this hourly and storing results — trending from 40% to 80% disk over 30 days projects when 100% is reached, allowing proactive cleanup before a crisis."
        },
        {
            id: "si_ex18",
            difficulty: "Hard",
            title: "Per-Process Resource Accounting",
            description: "Determine cumulative CPU time and memory usage per service — useful for billing and optimization.",
            starterCode: `# Cumulative CPU time (total since process started, not instantaneous)
$ ps -eo pid,user,pcpu,pmem,cputime,etimes,comm --sort=-cputime | head -8

# Memory grouped by service name
$ ps -eo rss,comm | awk '
NR>1 {total[$2]+=$1; count[$2]++}
END {for(k in total) printf "%-20s %6d MB  (%d procs)\n", k, total[k]/1024, count[k]}
' | sort -k2 -rn | head -8

# File descriptors per process
$ ls /proc/$(pgrep java | head -1)/fd 2>/dev/null | wc -l
$ cat /proc/sys/fs/file-nr`,
            solution: `$ ps -eo pid,user,pcpu,pmem,cputime,etimes,comm --sort=-cputime | head -5
  PID USER    %CPU %MEM     TIME ELAPSED COMMAND
 4521 anuj    45.2 25.4 01:23:45   10800 java      # 1h23m CPU in 3h runtime = 46% avg
 4522 anuj    12.1  8.2 00:15:32   10800 python3   # 15m CPU in 3h = 8.6% avg
  892 root     0.0  0.2 00:00:12  864000 sshd      # minimal CPU over 10 days

# cputime/etimes = lifetime average utilization
# 4521: 5025s / 10800s wall = 46.5% avg matches %CPU=45.2 (consistent)

$ ps -eo rss,comm | awk '...' | head -5
java                  4096 MB  (2 procs)   # Spark master + executor
python3                512 MB  (3 procs)   # pipeline workers
postgres               256 MB  (8 procs)   # backend processes
sshd                     8 MB  (2 procs)
bash                     4 MB  (3 procs)

$ ls /proc/$(pgrep java | head -1)/fd | wc -l
1842    # Spark has 1842 open file descriptors (normal — sockets + shuffle files)

$ cat /proc/sys/fs/file-nr
12480   0   9223372036854775807
# 12480 system-wide open fds / unlimited max`,
            explanation: "cputime in ps is cumulative — total CPU used since process started. Divide by etimes (elapsed wall seconds) to get lifetime average CPU utilization. This is more meaningful for capacity billing than instantaneous %CPU. The awk grouping by comm name aggregates all processes with the same name — postgres typically has 8-20 backend processes each using ~32MB. Spark's high file descriptor count (1842) is normal — each network connection, shuffle file, and log stream is an fd. If a Spark job fails with 'too many open files', check ulimit -n and increase with ulimit -n 65536."
        },
        {
            id: "si_ex19",
            difficulty: "Hard",
            title: "Correlate Metrics During a Real Job",
            description: "Run a computation and watch how CPU, memory, load, and iostat respond in real time.",
            starterCode: `# Run monitoring in background, then trigger load

# Start monitoring (every 2 seconds for 30 seconds)
(for i in {1..15}; do
    LOAD=$(cut -d' ' -f1 /proc/loadavg)
    AVAIL=$(awk '/MemAvailable/{print int($2/1024)}' /proc/meminfo)
    CPU_IDLE=$(top -b -n1 | grep Cpu | awk '{gsub(/[^0-9.]/,"",$8); print $8+0}')
    echo "$(date +%H:%M:%S) load=$LOAD mem_avail=\${AVAIL}MB cpu_idle=\${CPU_IDLE}%"
    sleep 2
done) &

# Trigger CPU + memory load
python3 -c "
import multiprocessing, time
data = bytearray(512 * 1024 * 1024)  # allocate 512MB
print('Memory allocated')
def burn(n):
    x = 0
    for i in range(10**7): x += i*i
    return x
with multiprocessing.Pool(4) as p:
    p.map(burn, range(4))
print('CPU work done')
del data
print('Memory released')
"
wait`,
            solution: `# Before job:
10:47:00 load=1.24 mem_avail=8800MB cpu_idle=84.2%

# During memory allocation (512MB):
10:47:02 load=1.25 mem_avail=8287MB cpu_idle=83.9%   # mem dropped 513MB instantly

# During CPU burn (4 processes):
10:47:04 load=2.87 mem_avail=8285MB cpu_idle=45.1%   # load rising, CPU dropping
10:47:06 load=4.21 mem_avail=8280MB cpu_idle=11.2%   # 4 processes pegging CPUs
10:47:08 load=5.12 mem_avail=8278MB cpu_idle=2.1%    # near 100% CPU usage!
10:47:10 load=5.89 mem_avail=8276MB cpu_idle=1.0%    # PEGGED

# After CPU work, before del data:
10:47:20 load=4.12 mem_avail=8275MB cpu_idle=83.1%   # CPU free again

# After del data:
10:47:22 load=3.87 mem_avail=8800MB cpu_idle=83.9%   # memory returned

# Load average still declining (exponential moving average lag):
10:47:24 load=3.21 mem_avail=8800MB cpu_idle=84.1%
10:47:26 load=2.65 mem_avail=8800MB cpu_idle=84.2%   # slowly returning to baseline`,
            explanation: "Correlating metrics during real load builds intuition about what numbers mean. Key observations: (1) MemAvailable drops instantly when Python allocates 512MB — no delay, the OS immediately accounts for it. (2) CPU idle drops gradually as all 4 worker processes spin up — process startup has overhead. (3) Load average rises but lags behind CPU idle — load is a 1/5/15 minute exponential moving average, not instantaneous. (4) Memory releases instantly on del data. (5) Load average keeps declining for minutes after work completes — explains why uptime shows elevated load even after a job finishes. This lag makes load average poor for real-time alerts but great for trend analysis."
        },
        {
            id: "si_ex20",
            difficulty: "Hard",
            title: "Ultimate System Info One-liner Library",
            description: "Build a personal toolkit of precise one-liners that extract exactly one answer per command.",
            starterCode: `# Add to ~/.bashrc:

# OS & Kernel
alias os_ver='grep PRETTY_NAME /etc/os-release | cut -d= -f2 | tr -d "\"'
alias kernel_ver='uname -r'

# CPU
alias cpu_count='nproc'
alias cpu_model='grep "model name" /proc/cpuinfo | uniq | cut -d: -f2 | xargs'
alias cpu_used='top -b -n1 | grep Cpu | awk "{gsub(/[^0-9.]/,\"\",\$8); printf \"%.1f%%\\n\", 100-\$8}"'

# Memory
alias ram_gb='free -g | awk "/Mem/{print \$2}"'
alias ram_avail='free -h | awk "/Mem/{print \$7}"'
alias swap_used='free -h | awk "/Swap/{print \$3}"'

# Disk
alias disk_root='df -h / | tail -1 | awk "{print \$5, \"used\", \$4, \"free\"}"'

# Network
alias my_ip='ip -br addr | awk "/UP/{print \$3}" | cut -d/ -f1 | head -1'
alias open_ports='ss -tuln | awk "/LISTEN/{print \$5}" | sort -t: -k2 -n'

# Process
alias top3_cpu='ps aux --sort=-%cpu --no-headers | head -3 | awk "{printf \"%-8s %5s%% %s\\n\", \$1, \$3, \$11}"'
alias top3_mem='ps aux --sort=-%mem --no-headers | head -3 | awk "{printf \"%-8s %5s%% %s\\n\", \$1, \$4, \$11}"'

# System
alias load1='cut -d" " -f1 /proc/loadavg'
alias updays='uptime -p'`,
            solution: `# After source ~/.bashrc:

$ os_ver
Ubuntu 22.04.3 LTS

$ kernel_ver
5.15.0-91-generic

$ cpu_count
8

$ cpu_model
Intel(R) Xeon(R) Platinum 8275CL @ 3.00GHz

$ cpu_used
15.8%

$ ram_gb
15

$ ram_avail
8.8Gi

$ swap_used
0B

$ disk_root
47% used 25G free

$ my_ip
10.0.0.5

$ open_ports
127.0.0.1:5432
0.0.0.0:8080
0.0.0.0:9092

$ top3_cpu
anuj      45.2% java
anuj      12.1% python3
root        0.1% sshd

$ top3_mem
anuj      25.4% java
anuj       8.2% python3
postgres   1.8% postgres

$ load1
2.45

$ updays
up 10 days, 2 hours, 47 minutes`,
            explanation: "One-liner aliases are the mark of a power user. The key craft is stripping output to exactly one meaningful value using pipes. cut -d= -f2 splits on equals and takes field 2. tr removes quote characters. awk takes the 7th whitespace-delimited field. xargs trims leading and trailing whitespace. Add these to ~/.bashrc so they are available in every session. For scripts, use the full commands directly — aliases do not expand in non-interactive bash scripts. The habit of building your own toolbox compounds over time: each well-crafted alias saves you from re-inventing the same parsing every time you need that piece of information."
        }
    ],

    summary: `
<h3>📋 Chapter Summary: System Information</h3>

<div class="tip-box">
    <h4>✅ Complete Command Reference</h4>
    <p>
        <strong>OS &amp; Kernel:</strong> <code>uname -a</code> · <code>cat /etc/os-release</code> · <code>lsb_release -a</code> · <code>hostname -f</code> · <code>uptime</code><br><br>
        <strong>CPU:</strong> <code>lscpu</code> · <code>nproc</code> · <code>grep model /proc/cpuinfo | uniq</code> · <code>grep -c ^processor /proc/cpuinfo</code><br><br>
        <strong>Memory:</strong> <code>free -h</code> · <code>cat /proc/meminfo</code> · <code>vmstat -s</code> · <code>sudo dmidecode -t memory</code><br><br>
        <strong>Disk:</strong> <code>lsblk</code> · <code>lsblk -f</code> · <code>df -h</code> · <code>df -i</code> · <code>du -sh *</code> · <code>sudo fdisk -l</code><br><br>
        <strong>Network:</strong> <code>ip addr show</code> · <code>ip -br addr</code> · <code>ip route show</code> · <code>ss -tuln</code> · <code>ping</code> · <code>traceroute</code><br><br>
        <strong>Real-time:</strong> <code>top</code> · <code>htop</code> · <code>iostat -x 2</code> · <code>vmstat 2 5</code> · <code>sar -u 2 5</code> · <code>watch -n 2 cmd</code><br><br>
        <strong>Hardware deep:</strong> <code>sudo dmidecode -t system</code> · <code>lspci</code> · <code>lsusb</code> · <code>sudo hdparm -I /dev/sda</code>
    </p>
</div>

<div class="info-box">
    <h4>📚 Next: File Operations (cp, mv, rm, mkdir, touch, chmod)</h4>
    <p>With system information mastered, you can assess any server in under 5 minutes. Next: the commands that create, copy, move, delete, and protect files — hands-on daily operations.</p>
</div>
`

}; // end systemInformation