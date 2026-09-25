// ═══════════════════════════════════════════════════════════════════════════════
// myPathshala — Linux Programming
// Module: welcome.js (Home / Welcome Page)
// Story: Ravi's First Day as a Data Engineer 🐧
// Sections: 6 | Exercises: 15 | SVG Diagrams: 8+ | Terminal Examples: 20+
// ═══════════════════════════════════════════════════════════════════════════════
// IMPORTANT: No export statements! This file is loaded via <script> tag.
// CSS classes used: beginner-tip, info-box, warning-box, tip-box, story-box,
//   deep-dive-box, danger-box, terminal-tip, visual-container, step-guide
// ═══════════════════════════════════════════════════════════════════════════════

var welcome = {
    title: "Welcome to Linux Programming",
    description: "Your complete guide to mastering Linux for Data Engineering, Data Science & AI/ML careers",
    breadcrumb: ["Getting Started", "Welcome"],

    sections: [
        // ═══════════════════════════════════════════════════════════════════
        // SECTION 1: RAVI'S STORY — WHY LINUX MATTERS
        // ═══════════════════════════════════════════════════════════════════
        {
            id: "ravis-story",
            title: "🐧 Meet Ravi — Why Linux Will Define Your Career",
            content: `
                <h3>🐧 Meet Ravi — His First Day as a Data Engineer</h3>

                <div class="story-box">
                    <h4>🎬 Ravi's Story</h4>
                    <p style="font-size:17px; line-height:1.9;">
                        Ravi just landed his first job as a <strong>Junior Data Engineer</strong> at a tech company in Pune. 
                        He's excited — he knows Python, SQL, and Spark. But on Day 1, his manager says:
                    </p>
                    <div style="background:rgba(34,211,238,0.08); padding:16px 20px; border-radius:10px; margin:16px 0; border-left:3px solid #22d3ee;">
                        <p style="font-size:17px; line-height:1.9; margin:0; font-style:italic; color:#22d3ee;">
                            "Here's your laptop. Our entire data platform runs on Linux. Every server, every database, every 
                            pipeline. You'll SSH into 15 different machines today. There's no Windows here."
                        </p>
                    </div>
                    <p style="font-size:17px; line-height:1.9;">
                        Ravi froze. He'd only used Windows his entire life. He didn't know what <code>ssh</code> meant, 
                        couldn't navigate a terminal, and didn't understand why there was no desktop or mouse cursor on the server.
                    </p>
                    <p style="font-size:17px; line-height:1.9;">
                        <strong>This course exists so YOU never feel like Ravi did on that first day.</strong> 
                        By the time you finish, you'll be the person others ask for help.
                    </p>
                </div>

                <h4>🌍 Where Linux Runs — It's Literally Everywhere</h4>

                <p style="font-size:16px; line-height:1.9;">
                    Before we write a single command, you need to understand <em>why</em> Linux is unavoidable in your career. 
                    It's not just "another operating system" — it's the <strong>foundation of modern technology</strong>.
                </p>

                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
                    <div style="background:rgba(34,211,238,0.06); border:1px solid rgba(34,211,238,0.2); border-radius:12px; padding:20px;">
                        <h5 style="color:#22d3ee; margin-bottom:8px; font-size:15px;">☁️ Cloud Servers (96.3%)</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.7;">
                            AWS EC2, Google Cloud, Microsoft Azure — when you launch a virtual machine, 
                            it runs Linux by default. Every company you'll work for uses cloud Linux servers.
                        </p>
                    </div>
                    <div style="background:rgba(167,139,250,0.06); border:1px solid rgba(167,139,250,0.2); border-radius:12px; padding:20px;">
                        <h5 style="color:#a78bfa; margin-bottom:8px; font-size:15px;">📱 Android Phones (72%)</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.7;">
                            Every Android phone runs a modified Linux kernel. If you own an Android, 
                            you've been using Linux every day without knowing it!
                        </p>
                    </div>
                    <div style="background:rgba(52,211,153,0.06); border:1px solid rgba(52,211,153,0.2); border-radius:12px; padding:20px;">
                        <h5 style="color:#34d399; margin-bottom:8px; font-size:15px;">🖥️ Supercomputers (100%)</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.7;">
                            ALL of the world's top 500 supercomputers run Linux. Every AI model you've heard of 
                            — GPT, LLaMA, Gemini — was trained on Linux clusters.
                        </p>
                    </div>
                    <div style="background:rgba(251,191,36,0.06); border:1px solid rgba(251,191,36,0.2); border-radius:12px; padding:20px;">
                        <h5 style="color:#fbbf24; margin-bottom:8px; font-size:15px;">🐳 Docker & Kubernetes</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.7;">
                            Every Docker container is a mini Linux machine. Kubernetes orchestrates thousands 
                            of Linux containers. These are the tools of modern data engineering.
                        </p>
                    </div>
                    <div style="background:rgba(248,113,113,0.06); border:1px solid rgba(248,113,113,0.2); border-radius:12px; padding:20px;">
                        <h5 style="color:#f87171; margin-bottom:8px; font-size:15px;">🗄️ Databases</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.7;">
                            PostgreSQL, MySQL, MongoDB, Cassandra, Redis — every major database runs 
                            best on Linux. Your data lives on Linux servers.
                        </p>
                    </div>
                    <div style="background:rgba(251,146,60,0.06); border:1px solid rgba(251,146,60,0.2); border-radius:12px; padding:20px;">
                        <h5 style="color:#fb923c; margin-bottom:8px; font-size:15px;">🤖 AI/ML Infrastructure</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.7;">
                            TensorFlow, PyTorch, CUDA GPU drivers — all built for Linux first. 
                            ML training clusters are Linux machines with NVIDIA GPUs.
                        </p>
                    </div>
                </div>

                <!-- SVG: Where Linux Runs Visualization -->
                <div class="visual-container">
                    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" style="stop-color:#22d3ee;stop-opacity:0.3"/>
                                <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0"/>
                            </radialGradient>
                        </defs>

                        <text x="400" y="28" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold" font-family="Space Grotesk, sans-serif">Linux Powers Everything You'll Work With</text>

                        <!-- Central Linux Penguin -->
                        <circle cx="400" cy="180" r="55" fill="url(#centerGlow)"/>
                        <circle cx="400" cy="180" r="45" fill="#0d1321" stroke="#22d3ee" stroke-width="2"/>
                        <text x="400" y="175" text-anchor="middle" fill="#fff" font-size="28">🐧</text>
                        <text x="400" y="198" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono, monospace">LINUX</text>

                        <!-- Orbiting Nodes -->
                        <!-- Cloud -->
                        <line x1="355" y1="160" x2="200" y2="90" stroke="#22d3ee" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>
                        <circle cx="170" cy="80" r="32" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
                        <text x="170" y="76" text-anchor="middle" font-size="18">☁️</text>
                        <text x="170" y="95" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Cloud 96%</text>

                        <!-- Phones -->
                        <line x1="355" y1="195" x2="150" y2="230" stroke="#a78bfa" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>
                        <circle cx="120" cy="230" r="32" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5"/>
                        <text x="120" y="226" text-anchor="middle" font-size="18">📱</text>
                        <text x="120" y="245" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Android 72%</text>

                        <!-- Supercomputers -->
                        <line x1="445" y1="155" x2="600" y2="80" stroke="#34d399" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>
                        <circle cx="630" cy="75" r="32" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
                        <text x="630" y="71" text-anchor="middle" font-size="18">🖥️</text>
                        <text x="630" y="90" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">HPC 100%</text>

                        <!-- Docker -->
                        <line x1="445" y1="190" x2="630" y2="200" stroke="#fbbf24" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>
                        <circle cx="660" cy="200" r="32" fill="#131a2b" stroke="#fbbf24" stroke-width="1.5"/>
                        <text x="660" y="196" text-anchor="middle" font-size="18">🐳</text>
                        <text x="660" y="215" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Containers</text>

                        <!-- AI/ML -->
                        <line x1="430" y1="220" x2="560" y2="300" stroke="#fb923c" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>
                        <circle cx="580" cy="310" r="32" fill="#131a2b" stroke="#fb923c" stroke-width="1.5"/>
                        <text x="580" y="306" text-anchor="middle" font-size="18">🤖</text>
                        <text x="580" y="325" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">AI/ML</text>

                        <!-- Databases -->
                        <line x1="370" y1="220" x2="240" y2="310" stroke="#f87171" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>
                        <circle cx="220" cy="315" r="32" fill="#131a2b" stroke="#f87171" stroke-width="1.5"/>
                        <text x="220" y="311" text-anchor="middle" font-size="18">🗄️</text>
                        <text x="220" y="330" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Databases</text>

                        <!-- IoT -->
                        <line x1="400" y1="135" x2="400" y2="60" stroke="#22d3ee" stroke-width="1" stroke-dasharray="4,3" opacity="0.4"/>
                        <circle cx="400" cy="55" r="28" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
                        <text x="400" y="51" text-anchor="middle" font-size="16">🌐</text>
                        <text x="400" y="68" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">IoT</text>
                    </svg>
                    <div class="caption">Linux sits at the center of every technology stack you'll work with</div>
                </div>

                <div class="info-box">
                    <h4>💡 What This Means for YOU</h4>
                    <p style="font-size:15px; line-height:1.9;">
                        Whether you become a <strong>Data Engineer</strong> (building pipelines), 
                        <strong>Data Scientist</strong> (analyzing data), or <strong>ML Engineer</strong> (training models) — 
                        Linux will be your daily operating system. It's not optional. It's the floor you stand on.
                    </p>
                </div>
            `,
            interactiveExample: {
                code: `# Let's verify: What does Ravi see when he first logs into a Linux server?
# These are the FIRST commands every data engineer runs:

# 1. Who am I?
whoami

# 2. Where am I?
pwd

# 3. What machine is this?
hostname

# 4. What operating system is running?
cat /etc/os-release | head -4

# 5. How long has this server been running?
uptime

# 6. How much memory does this server have?
free -h | head -2

# Try running each command and observe the output!`,
                explanation: "These are the first 6 commands Ravi runs on his first day. Each one tells him something about the server he's connected to. Run them on your own Linux terminal!"
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // SECTION 2: THE ORIGIN STORY — HOW LINUX WAS BORN
        // ═══════════════════════════════════════════════════════════════════
        {
            id: "linux-origin",
            title: "📜 The Origin Story — How a Student Created Linux",
            content: `
                <h3>📜 The Origin Story — How a 21-Year-Old Changed Computing Forever</h3>

                <div class="story-box">
                    <h4>🎬 Scene: Helsinki, Finland — August 1991</h4>
                    <p style="font-size:16px; line-height:1.9;">
                        Linus Torvalds, a 21-year-old computer science student at the University of Helsinki, 
                        was frustrated. He couldn't afford the expensive UNIX operating system for his new PC, 
                        and the free alternative (MINIX) had too many limitations. So he did what any great 
                        engineer would do — <strong>he built his own</strong>.
                    </p>
                    <p style="font-size:16px; line-height:1.9;">
                        On August 25, 1991, Linus posted this message to a Usenet newsgroup:
                    </p>
                    <div style="background:#0d1a0d; padding:18px 22px; border-radius:10px; border:1px solid #1a3a1a; font-family:'JetBrains Mono', monospace; font-size:13px; color:#4ade80; line-height:1.8;">
                        From: torvalds@klaava.Helsinki.FI (Linus Benedict Torvalds)<br>
                        Subject: What would you like to see most in minix?<br><br>
                        "Hello everybody out there using minix -<br>
                        I'm doing a (free) operating system (just a hobby, won't be big and<br>
                        professional like gnu) for 386(486) AT clones."
                    </div>
                    <p style="font-size:16px; line-height:1.9; margin-top:16px;">
                        That "hobby project" now powers <strong>every Android phone, every cloud server, every supercomputer, 
                        and the International Space Station</strong>. Not bad for a college project! 😄
                    </p>
                </div>

                <h4>🕐 The Complete Timeline — From UNIX to Your Laptop</h4>
                <p style="font-size:15px; line-height:1.9;">
                    Linux didn't appear from nowhere. It stands on the shoulders of decades of computing history. 
                    Understanding this timeline helps you understand <em>why</em> Linux works the way it does.
                </p>

                <!-- SVG: Timeline -->
                <div class="visual-container">
                    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
                        <text x="400" y="25" text-anchor="middle" fill="#e2e8f0" font-size="15" font-weight="bold" font-family="Space Grotesk, sans-serif">The Road to Linux — Complete Timeline</text>

                        <!-- Timeline line -->
                        <line x1="80" y1="60" x2="80" y2="460" stroke="#1e293b" stroke-width="3"/>

                        <!-- 1969: UNIX -->
                        <circle cx="80" cy="75" r="8" fill="#22d3ee"/>
                        <text x="100" y="72" fill="#22d3ee" font-size="12" font-weight="bold" font-family="JetBrains Mono">1969 — UNIX Born</text>
                        <text x="100" y="90" fill="#94a3b8" font-size="11">Ken Thompson & Dennis Ritchie at AT&T Bell Labs create UNIX.</text>
                        <text x="100" y="105" fill="#64748b" font-size="10">The grandparent of ALL modern operating systems. Written in C language.</text>

                        <!-- 1983: GNU -->
                        <circle cx="80" cy="135" r="8" fill="#a78bfa"/>
                        <text x="100" y="132" fill="#a78bfa" font-size="12" font-weight="bold" font-family="JetBrains Mono">1983 — GNU Project Starts</text>
                        <text x="100" y="150" fill="#94a3b8" font-size="11">Richard Stallman says: "Software should be FREE." Launches GNU Project.</text>
                        <text x="100" y="165" fill="#64748b" font-size="10">Creates free tools (gcc, bash, ls, cp, mv) but can't finish the kernel.</text>

                        <!-- 1985: FSF -->
                        <circle cx="80" cy="195" r="8" fill="#a78bfa"/>
                        <text x="100" y="192" fill="#a78bfa" font-size="12" font-weight="bold" font-family="JetBrains Mono">1985 — Free Software Foundation</text>
                        <text x="100" y="210" fill="#94a3b8" font-size="11">Stallman creates FSF. Defines "4 Freedoms" of software.</text>
                        <text x="100" y="225" fill="#64748b" font-size="10">Freedom to: use, study, modify, and share software.</text>

                        <!-- 1989: GPL -->
                        <circle cx="80" cy="255" r="8" fill="#fbbf24"/>
                        <text x="100" y="252" fill="#fbbf24" font-size="12" font-weight="bold" font-family="JetBrains Mono">1989 — GPL License Created</text>
                        <text x="100" y="270" fill="#94a3b8" font-size="11">GNU General Public License (GPL) — the legal backbone of free software.</text>
                        <text x="100" y="285" fill="#64748b" font-size="10">Any software using GPL code must also be open source. "Copyleft" concept.</text>

                        <!-- 1991: Linux -->
                        <circle cx="80" cy="315" r="10" fill="#34d399" stroke="#34d399" stroke-width="3"/>
                        <text x="100" y="312" fill="#34d399" font-size="13" font-weight="bold" font-family="JetBrains Mono">1991 — LINUX KERNEL RELEASED! 🐧</text>
                        <text x="100" y="330" fill="#94a3b8" font-size="11">Linus Torvalds (age 21) releases Linux kernel version 0.01.</text>
                        <text x="100" y="345" fill="#34d399" font-size="10" font-weight="bold">GNU tools + Linux kernel = Complete FREE operating system!</text>

                        <!-- 2004: Ubuntu -->
                        <circle cx="80" cy="375" r="8" fill="#fb923c"/>
                        <text x="100" y="372" fill="#fb923c" font-size="12" font-weight="bold" font-family="JetBrains Mono">2004 — Ubuntu Makes Linux Easy</text>
                        <text x="100" y="390" fill="#94a3b8" font-size="11">Mark Shuttleworth creates Ubuntu — "Linux for human beings."</text>
                        <text x="100" y="405" fill="#64748b" font-size="10">Makes Linux accessible to everyone, not just experts. Free CDs shipped worldwide!</text>

                        <!-- 2020s: Everywhere -->
                        <circle cx="80" cy="440" r="8" fill="#f87171"/>
                        <text x="100" y="437" fill="#f87171" font-size="12" font-weight="bold" font-family="JetBrains Mono">2020s — Linux Runs the World</text>
                        <text x="100" y="455" fill="#94a3b8" font-size="11">96% of cloud, 100% of supercomputers, all Android phones, SpaceX rockets.</text>
                        <text x="100" y="470" fill="#64748b" font-size="10">Microsoft itself now uses Linux internally and contributes to the kernel!</text>
                    </svg>
                    <div class="caption">From a university project in Finland to the world's most important operating system</div>
                </div>

                <h4>🧩 The GNU + Linux Connection — Why People Say "GNU/Linux"</h4>
                <p style="font-size:15px; line-height:1.9;">
                    This is a common interview question and an important concept to understand:
                </p>

                <!-- SVG: GNU + Linux = Complete OS -->
                <div class="visual-container">
                    <svg viewBox="0 0 750 220" xmlns="http://www.w3.org/2000/svg">
                        <!-- GNU Box -->
                        <rect x="30" y="40" width="250" height="140" rx="14" fill="#131a2b" stroke="#a78bfa" stroke-width="2"/>
                        <text x="155" y="72" text-anchor="middle" fill="#a78bfa" font-size="16" font-weight="bold" font-family="JetBrains Mono">GNU Project (1983)</text>
                        <text x="155" y="95" text-anchor="middle" fill="#94a3b8" font-size="12">Created the TOOLS:</text>
                        <text x="155" y="116" text-anchor="middle" fill="#4ade80" font-size="11" font-family="JetBrains Mono">bash, gcc, ls, cp, mv, rm</text>
                        <text x="155" y="136" text-anchor="middle" fill="#4ade80" font-size="11" font-family="JetBrains Mono">grep, awk, sed, make</text>
                        <text x="155" y="160" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">❌ Missing: Kernel</text>

                        <!-- Plus sign -->
                        <text x="320" y="120" text-anchor="middle" fill="#fbbf24" font-size="36" font-weight="bold">+</text>

                        <!-- Linux Box -->
                        <rect x="360" y="40" width="250" height="140" rx="14" fill="#131a2b" stroke="#fbbf24" stroke-width="2"/>
                        <text x="485" y="72" text-anchor="middle" fill="#fbbf24" font-size="16" font-weight="bold" font-family="JetBrains Mono">Linux Kernel (1991)</text>
                        <text x="485" y="95" text-anchor="middle" fill="#94a3b8" font-size="12">Created the ENGINE:</text>
                        <text x="485" y="116" text-anchor="middle" fill="#4ade80" font-size="11" font-family="JetBrains Mono">Process management</text>
                        <text x="485" y="136" text-anchor="middle" fill="#4ade80" font-size="11" font-family="JetBrains Mono">Memory, Files, Devices</text>
                        <text x="485" y="160" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold">❌ Missing: User tools</text>

                        <!-- Equals -->
                        <text x="648" y="120" text-anchor="middle" fill="#34d399" font-size="30" font-weight="bold">=</text>

                        <!-- Result -->
                        <rect x="670" y="70" width="70" height="65" rx="12" fill="#131a2b" stroke="#34d399" stroke-width="2"/>
                        <text x="705" y="100" text-anchor="middle" font-size="24">🐧</text>
                        <text x="705" y="120" text-anchor="middle" fill="#34d399" font-size="9" font-weight="bold" font-family="JetBrains Mono">GNU/Linux</text>
                    </svg>
                    <div class="caption">GNU gave the tools, Linux gave the kernel — together, they made a complete free operating system</div>
                </div>

                <div class="deep-dive-box">
                    <h4>🔬 What is a "Kernel" Actually?</h4>
                    <p style="font-size:15px; line-height:1.9;">
                        Think of the <strong>kernel</strong> as the <em>brain</em> of the computer. It's the very first software 
                        that loads when you turn on the machine, and it controls <strong>everything</strong>:
                    </p>
                    <p style="font-size:15px; line-height:1.9;">
                        • <strong>Process Management:</strong> Which programs get CPU time? When should a program pause so another can run?<br>
                        • <strong>Memory Management:</strong> Which program gets how much RAM? What happens when RAM is full?<br>
                        • <strong>File System:</strong> How is data organized on the hard drive? Where does each file physically live?<br>
                        • <strong>Device Drivers:</strong> How to talk to the keyboard, mouse, network card, GPU?<br>
                        • <strong>Security:</strong> Can this user access that file? Can this program use the network?
                    </p>
                    <p style="font-size:15px; line-height:1.9;">
                        You <em>never</em> interact with the kernel directly. You talk to the <strong>shell</strong> (like bash), 
                        which translates your commands into kernel instructions. We'll explore this in the Architecture section.
                    </p>
                </div>

                <h4>📋 The GPL License — Why Linux Stays Free Forever</h4>
                <div class="info-box">
                    <h4>💡 The 4 Freedoms (Interview Favorite!)</h4>
                    <p style="font-size:15px; line-height:1.9;">
                        The GNU GPL guarantees these <strong>four freedoms</strong> to every user:
                    </p>
                    <p style="font-size:15px; line-height:1.9;">
                        <strong>Freedom 0:</strong> Run the program for any purpose<br>
                        <strong>Freedom 1:</strong> Study and modify the source code<br>
                        <strong>Freedom 2:</strong> Redistribute copies<br>
                        <strong>Freedom 3:</strong> Distribute your modified versions
                    </p>
                    <p style="font-size:15px; line-height:1.9;">
                        The <strong>key rule ("copyleft"):</strong> If you modify GPL software and distribute it, 
                        your modified version <em>must also</em> be GPL. This is why Linux can never become proprietary — 
                        it's legally protected to stay free forever.
                    </p>
                </div>
            `,
            interactiveExample: {
                code: `# Let's check: What version of the Linux kernel are YOU running?

# Show the kernel version
uname -r

# Show ALL system information
uname -a

# What does each part of 'uname -a' output mean?
# Example output: Linux ubuntu 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux
#
# Linux        → Kernel name
# ubuntu       → Hostname (your machine's name)  
# 5.15.0-91    → Kernel version (major.minor.patch)
# #101-Ubuntu  → Build number
# SMP          → Symmetric Multi-Processing (supports multiple CPUs)
# x86_64       → 64-bit architecture
# GNU/Linux    → Operating system name

# Show your distribution details
cat /etc/os-release`,
                explanation: "The 'uname' command tells you about your kernel — the brain of your Linux system. Run 'uname -a' on your terminal and match each part of the output to the breakdown above!"
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // SECTION 3: LINUX VS WINDOWS VS MAC — THE HONEST COMPARISON
        // ═══════════════════════════════════════════════════════════════════
        {
            id: "linux-vs-others",
            title: "⚔️ Linux vs Windows vs Mac — The Honest Comparison",
            content: `
                <h3>⚔️ Linux vs Windows vs macOS — What's Actually Different?</h3>

                <div class="story-box">
                    <h4>🤔 Ravi's Question on Day 1</h4>
                    <p style="font-size:16px; line-height:1.9;">
                        "Why can't we just use Windows? I know Windows! Everything works on Windows!"<br><br>
                        His senior engineer smiled and said: <em>"Windows is great for using Excel and browsing the web. 
                        But when you need to process 500 GB of data at 3 AM on a remote server with no screen attached — 
                        Linux is the only game in town."</em>
                    </p>
                </div>

                <h4>The Comparison Table Every Student Needs</h4>

                <table style="width:100%; border-collapse:collapse; margin:18px 0; font-size:14px;">
                    <thead>
                        <tr>
                            <th style="background:#182035; color:#22d3ee; padding:14px; text-align:left; border:1px solid #1e293b; font-family:'JetBrains Mono', monospace; font-size:12px;">Feature</th>
                            <th style="background:#182035; color:#22d3ee; padding:14px; text-align:left; border:1px solid #1e293b; font-family:'JetBrains Mono', monospace; font-size:12px;">🐧 Linux</th>
                            <th style="background:#182035; color:#22d3ee; padding:14px; text-align:left; border:1px solid #1e293b; font-family:'JetBrains Mono', monospace; font-size:12px;">🪟 Windows</th>
                            <th style="background:#182035; color:#22d3ee; padding:14px; text-align:left; border:1px solid #1e293b; font-family:'JetBrains Mono', monospace; font-size:12px;">🍎 macOS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#131a2b; font-weight:600;">Cost</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#131a2b;">FREE (open source)</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#131a2b;">₹10,000+ license</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#fbbf24; background:#131a2b;">Free (but needs Apple hardware)</td>
                        </tr>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#182035; font-weight:600;">Source Code</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#182035;">Open — anyone can read/modify</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#182035;">Closed — Microsoft owns it</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#fbbf24; background:#182035;">Partially open (Darwin kernel)</td>
                        </tr>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#131a2b; font-weight:600;">Server Usage</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#131a2b;">96.3% of servers worldwide</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#131a2b;">~3% of servers</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#131a2b;">Almost 0% servers</td>
                        </tr>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#182035; font-weight:600;">Command Line</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#182035;">Native, powerful, essential</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#fbbf24; background:#182035;">CMD/PowerShell (limited)</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#182035;">Terminal (Unix-based, similar)</td>
                        </tr>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#131a2b; font-weight:600;">Customization</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#131a2b;">TOTAL — change anything</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#131a2b;">Limited to what Microsoft allows</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#131a2b;">Limited to what Apple allows</td>
                        </tr>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#182035; font-weight:600;">Updates</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#182035;">You control when & what</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#182035;">Forced restarts at 2 AM 😤</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#fbbf24; background:#182035;">Gentle but persistent nagging</td>
                        </tr>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#131a2b; font-weight:600;">Package Install</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#131a2b; font-family:'JetBrains Mono', monospace; font-size:12px;">apt install python3 (1 command!)</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#131a2b;">Download .exe → Next → Next → Next</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#131a2b; font-family:'JetBrains Mono', monospace; font-size:12px;">brew install python3</td>
                        </tr>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#182035; font-weight:600;">Stability</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#182035;">Years of uptime, no reboot needed</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#182035;">Regular reboots for updates</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#fbbf24; background:#182035;">Good, but occasional kernel panics</td>
                        </tr>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#131a2b; font-weight:600;">Docker Support</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#131a2b;">Native — Docker IS Linux containers</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#fbbf24; background:#131a2b;">Runs via WSL2 (Linux inside Windows)</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#fbbf24; background:#131a2b;">Runs via Linux VM (Docker Desktop)</td>
                        </tr>
                        <tr>
                            <td style="padding:12px; border:1px solid #1e293b; color:#e2e8f0; background:#182035; font-weight:600;">RAM at Idle</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#4ade80; background:#182035;">~200-400 MB (server)</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#f87171; background:#182035;">~2-4 GB</td>
                            <td style="padding:12px; border:1px solid #1e293b; color:#fbbf24; background:#182035;">~2-3 GB</td>
                        </tr>
                    </tbody>
                </table>

                <div class="warning-box">
                    <h4>⚠️ Common Misconception</h4>
                    <p style="font-size:15px; line-height:1.9;">
                        "Linux is hard" — This was true in 2005. In 2026, Ubuntu Desktop is easier to install than Windows! 
                        The terminal might feel unfamiliar at first, but that's like saying "driving is hard" when you've 
                        only ever been a passenger. After 2 weeks of practice, the terminal becomes faster than any GUI.
                    </p>
                </div>

                <h4>🏗️ The Architecture Difference — Why This Matters</h4>

                <!-- SVG: Architecture Comparison -->
                <div class="visual-container">
                    <svg viewBox="0 0 800 310" xmlns="http://www.w3.org/2000/svg">
                        <text x="400" y="25" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk, sans-serif">How You Interact With the Computer</text>

                        <!-- Windows Side -->
                        <rect x="30" y="45" width="230" height="250" rx="12" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
                        <text x="145" y="70" text-anchor="middle" fill="#22d3ee" font-size="13" font-weight="bold" font-family="JetBrains Mono">🪟 Windows Way</text>
                        <rect x="50" y="85" width="190" height="35" rx="6" fill="#182035" stroke="#334155"/>
                        <text x="145" y="107" text-anchor="middle" fill="#94a3b8" font-size="11">🖱️ Click "File" menu</text>
                        <text x="145" y="135" text-anchor="middle" fill="#64748b" font-size="14">↓</text>
                        <rect x="50" y="145" width="190" height="35" rx="6" fill="#182035" stroke="#334155"/>
                        <text x="145" y="167" text-anchor="middle" fill="#94a3b8" font-size="11">🖱️ Click "New Folder"</text>
                        <text x="145" y="195" text-anchor="middle" fill="#64748b" font-size="14">↓</text>
                        <rect x="50" y="205" width="190" height="35" rx="6" fill="#182035" stroke="#334155"/>
                        <text x="145" y="227" text-anchor="middle" fill="#94a3b8" font-size="11">⌨️ Type name → Enter</text>
                        <text x="145" y="265" text-anchor="middle" fill="#fbbf24" font-size="11">⏱️ ~8 seconds, 4 clicks</text>

                        <!-- VS -->
                        <text x="400" y="180" text-anchor="middle" fill="#fbbf24" font-size="20" font-weight="bold">VS</text>

                        <!-- Linux Side -->
                        <rect x="540" y="45" width="230" height="250" rx="12" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
                        <text x="655" y="70" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="JetBrains Mono">🐧 Linux Way</text>
                        <rect x="560" y="140" width="190" height="50" rx="6" fill="#0d1a0d" stroke="#1a3a1a"/>
                        <text x="655" y="165" text-anchor="middle" fill="#4ade80" font-size="12" font-family="JetBrains Mono">mkdir my_folder</text>
                        <text x="655" y="220" text-anchor="middle" fill="#34d399" font-size="11">⏱️ ~1 second, 1 command</text>
                        <text x="655" y="245" text-anchor="middle" fill="#94a3b8" font-size="10">AND it's scriptable — create</text>
                        <text x="655" y="260" text-anchor="middle" fill="#94a3b8" font-size="10">1000 folders in same time!</text>
                    </svg>
                    <div class="caption">The terminal isn't harder — it's faster. One command replaces many clicks.</div>
                </div>

                <div class="tip-box">
                    <h4>🎯 The Real Advantage: Automation</h4>
                    <p style="font-size:15px; line-height:1.9;">
                        The GUI way works for 1 folder. But what about 1,000? Or 10,000 files? In Linux:
                    </p>
                    <div style="background:#0d1a0d; padding:14px 18px; border-radius:8px; margin:12px 0; font-family:'JetBrains Mono', monospace; font-size:13px; color:#4ade80;">
                        mkdir -p project/{data,scripts,models,logs}/{raw,processed,archive}
                    </div>
                    <p style="font-size:15px; line-height:1.9;">
                        That <strong>single command</strong> creates 12 nested directories in under 1 second. Try doing that with a mouse! 
                        This is why every data pipeline, every automation script, every deployment tool uses the command line.
                    </p>
                </div>
            `,
            interactiveExample: {
                code: `# Linux vs Windows: The Power of One Command
# Imagine you need to create a project structure:

# On Windows: Click... click... click... (30+ clicks for this)
# On Linux: ONE command creates EVERYTHING:

mkdir -p my_project/{data/{raw,clean,processed},scripts/{python,shell},models/{v1,v2},logs,configs}

# Let's verify what was created:
find my_project -type d | sort

# Output shows 12 directories created instantly:
# my_project/
# my_project/configs/
# my_project/data/
# my_project/data/clean/
# my_project/data/processed/
# my_project/data/raw/
# my_project/logs/
# my_project/models/
# my_project/models/v1/
# my_project/models/v2/
# my_project/scripts/
# my_project/scripts/python/
# my_project/scripts/shell/

echo "That's the power of Linux! 🐧"`,
                explanation: "This demonstrates why data engineers love Linux — one command creates an entire project structure that would take dozens of mouse clicks in Windows. The 'mkdir -p' command with brace expansion creates all nested directories at once."
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // SECTION 4: HOW LINUX WORKS INSIDE — ARCHITECTURE OVERVIEW
        // ═══════════════════════════════════════════════════════════════════
        {
            id: "how-linux-works",
            title: "🏗️ How Linux Works Inside — The Architecture",
            content: `
                <h3>🏗️ How Linux Works Inside — Understanding the Architecture</h3>

                <div class="story-box">
                    <h4>🏨 Think of Linux as a Smart Hotel</h4>
                    <p style="font-size:16px; line-height:1.9;">
                        Imagine a 5-star hotel. It has layers that work together:
                    </p>
                    <p style="font-size:15px; line-height:1.9;">
                        <strong>🏢 The Building (Hardware)</strong> — The physical structure: walls, floors, plumbing, electricity. 
                        Without the building, nothing else exists.<br><br>
                        <strong>🧠 The Manager (Kernel)</strong> — Knows every room, every pipe, every wire. Manages who gets 
                        which room, controls the electricity, handles emergencies. Guests never talk to the manager directly.<br><br>
                        <strong>📞 The Front Desk (Shell)</strong> — Your point of contact. You tell the front desk what you need, 
                        they translate it into instructions for the manager. The shell is YOUR front desk.<br><br>
                        <strong>🧑‍💼 The Guests (Applications)</strong> — Python, Spark, Docker, your scripts. They make requests 
                        through the front desk, never touching the plumbing directly.
                    </p>
                </div>

                <!-- SVG: Complete Architecture Diagram -->
                <div class="visual-container">
                    <svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="hwGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#64748b;stop-opacity:0.15"/>
                                <stop offset="100%" style="stop-color:#64748b;stop-opacity:0.03"/>
                            </linearGradient>
                            <linearGradient id="kGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#f87171;stop-opacity:0.15"/>
                                <stop offset="100%" style="stop-color:#f87171;stop-opacity:0.03"/>
                            </linearGradient>
                            <linearGradient id="sGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:0.15"/>
                                <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:0.03"/>
                            </linearGradient>
                            <linearGradient id="aGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#22d3ee;stop-opacity:0.15"/>
                                <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0.03"/>
                            </linearGradient>
                        </defs>

                        <text x="400" y="25" text-anchor="middle" fill="#e2e8f0" font-size="16" font-weight="bold" font-family="Space Grotesk, sans-serif">Linux Architecture — The Complete Picture</text>

                        <!-- Layer 4: User Applications -->
                        <rect x="60" y="45" width="680" height="100" rx="12" fill="url(#aGrad)" stroke="#22d3ee" stroke-width="1.5"/>
                        <text x="400" y="68" text-anchor="middle" fill="#22d3ee" font-size="14" font-weight="bold" font-family="JetBrains Mono">🧑‍💼 USER SPACE — Applications (The Guests)</text>
                        
                        <rect x="85" y="80" width="100" height="48" rx="8" fill="#0d1321" stroke="#22d3ee" stroke-width="1" opacity="0.8"/>
                        <text x="135" y="101" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">🐍 Python</text>
                        <text x="135" y="117" text-anchor="middle" fill="#64748b" font-size="8">Your scripts</text>

                        <rect x="200" y="80" width="100" height="48" rx="8" fill="#0d1321" stroke="#22d3ee" stroke-width="1" opacity="0.8"/>
                        <text x="250" y="101" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">⚡ Spark</text>
                        <text x="250" y="117" text-anchor="middle" fill="#64748b" font-size="8">Data processing</text>

                        <rect x="315" y="80" width="100" height="48" rx="8" fill="#0d1321" stroke="#22d3ee" stroke-width="1" opacity="0.8"/>
                        <text x="365" y="101" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">🐳 Docker</text>
                        <text x="365" y="117" text-anchor="middle" fill="#64748b" font-size="8">Containers</text>

                        <rect x="430" y="80" width="100" height="48" rx="8" fill="#0d1321" stroke="#22d3ee" stroke-width="1" opacity="0.8"/>
                        <text x="480" y="101" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">📝 vim</text>
                        <text x="480" y="117" text-anchor="middle" fill="#64748b" font-size="8">Text editor</text>

                        <rect x="545" y="80" width="100" height="48" rx="8" fill="#0d1321" stroke="#22d3ee" stroke-width="1" opacity="0.8"/>
                        <text x="595" y="101" text-anchor="middle" fill="#22d3ee" font-size="10" font-family="JetBrains Mono">🌐 Browser</text>
                        <text x="595" y="117" text-anchor="middle" fill="#64748b" font-size="8">Firefox/Chrome</text>

                        <!-- Arrow down -->
                        <text x="400" y="160" text-anchor="middle" fill="#94a3b8" font-size="11">⬇️ Applications make REQUESTS through the shell ⬇️</text>

                        <!-- Layer 3: Shell & Libraries -->
                        <rect x="60" y="175" width="680" height="90" rx="12" fill="url(#sGrad)" stroke="#fbbf24" stroke-width="1.5"/>
                        <text x="400" y="198" text-anchor="middle" fill="#fbbf24" font-size="14" font-weight="bold" font-family="JetBrains Mono">📞 SHELL & SYSTEM LIBRARIES (The Front Desk)</text>

                        <rect x="100" y="210" width="130" height="38" rx="8" fill="#0d1321" stroke="#fbbf24" stroke-width="1" opacity="0.8"/>
                        <text x="165" y="233" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">bash / zsh / sh</text>

                        <rect x="260" y="210" width="130" height="38" rx="8" fill="#0d1321" stroke="#fbbf24" stroke-width="1" opacity="0.8"/>
                        <text x="325" y="233" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">glibc (C library)</text>

                        <rect x="420" y="210" width="140" height="38" rx="8" fill="#0d1321" stroke="#fbbf24" stroke-width="1" opacity="0.8"/>
                        <text x="490" y="233" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">GNU Coreutils</text>

                        <rect x="590" y="210" width="130" height="38" rx="8" fill="#0d1321" stroke="#fbbf24" stroke-width="1" opacity="0.8"/>
                        <text x="655" y="233" text-anchor="middle" fill="#fbbf24" font-size="11" font-family="JetBrains Mono">System Calls</text>

                        <!-- Arrow down -->
                        <text x="400" y="282" text-anchor="middle" fill="#94a3b8" font-size="11">⬇️ Shell translates to SYSTEM CALLS for the kernel ⬇️</text>

                        <!-- Layer 2: Kernel -->
                        <rect x="60" y="295" width="680" height="110" rx="12" fill="url(#kGrad)" stroke="#f87171" stroke-width="1.5"/>
                        <text x="400" y="318" text-anchor="middle" fill="#f87171" font-size="14" font-weight="bold" font-family="JetBrains Mono">🧠 KERNEL SPACE (The Manager — Heart of Linux)</text>

                        <rect x="85" y="330" width="145" height="55" rx="8" fill="#0d1321" stroke="#f87171" stroke-width="1" opacity="0.8"/>
                        <text x="157" y="352" text-anchor="middle" fill="#f87171" font-size="11" font-family="JetBrains Mono">Process Mgmt</text>
                        <text x="157" y="370" text-anchor="middle" fill="#64748b" font-size="9">Who gets CPU time?</text>

                        <rect x="245" y="330" width="145" height="55" rx="8" fill="#0d1321" stroke="#f87171" stroke-width="1" opacity="0.8"/>
                        <text x="317" y="352" text-anchor="middle" fill="#f87171" font-size="11" font-family="JetBrains Mono">Memory Mgmt</text>
                        <text x="317" y="370" text-anchor="middle" fill="#64748b" font-size="9">Who gets RAM?</text>

                        <rect x="405" y="330" width="145" height="55" rx="8" fill="#0d1321" stroke="#f87171" stroke-width="1" opacity="0.8"/>
                        <text x="477" y="352" text-anchor="middle" fill="#f87171" font-size="11" font-family="JetBrains Mono">File System</text>
                        <text x="477" y="370" text-anchor="middle" fill="#64748b" font-size="9">Where's the data?</text>

                        <rect x="565" y="330" width="155" height="55" rx="8" fill="#0d1321" stroke="#f87171" stroke-width="1" opacity="0.8"/>
                        <text x="642" y="352" text-anchor="middle" fill="#f87171" font-size="11" font-family="JetBrains Mono">Device Drivers</text>
                        <text x="642" y="370" text-anchor="middle" fill="#64748b" font-size="9">Talk to hardware</text>

                        <!-- Arrow down -->
                        <text x="400" y="425" text-anchor="middle" fill="#94a3b8" font-size="11">⬇️ Kernel sends INSTRUCTIONS to hardware ⬇️</text>

                        <!-- Layer 1: Hardware -->
                        <rect x="60" y="440" width="680" height="60" rx="12" fill="url(#hwGrad)" stroke="#64748b" stroke-width="1.5"/>
                        <text x="400" y="468" text-anchor="middle" fill="#64748b" font-size="14" font-weight="bold" font-family="JetBrains Mono">🏢 HARDWARE (The Building)</text>
                        <text x="145" y="488" text-anchor="middle" fill="#475569" font-size="10">CPU</text>
                        <text x="290" y="488" text-anchor="middle" fill="#475569" font-size="10">RAM</text>
                        <text x="430" y="488" text-anchor="middle" fill="#475569" font-size="10">Hard Drive / SSD</text>
                        <text x="590" y="488" text-anchor="middle" fill="#475569" font-size="10">Network Card</text>
                        <text x="700" y="488" text-anchor="middle" fill="#475569" font-size="10">GPU</text>
                    </svg>
                    <div class="caption">Each layer only talks to its neighbors — Applications never touch hardware directly</div>
                </div>

                <h4>🔍 What Happens When You Type a Command?</h4>
                <p style="font-size:15px; line-height:1.9;">
                    Let's trace exactly what happens when Ravi types <code>ls -la /data</code> on his terminal. 
                    This is how every single command works in Linux:
                </p>

                <!-- SVG: Command Flow Trace -->
                <div class="visual-container">
                    <svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
                        <text x="400" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk, sans-serif">What Happens When You Type: ls -la /data</text>

                        <!-- Step 1 -->
                        <rect x="20" y="45" width="150" height="65" rx="10" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
                        <text x="95" y="65" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">STEP 1</text>
                        <text x="95" y="82" text-anchor="middle" fill="#94a3b8" font-size="10">You type command</text>
                        <text x="95" y="98" text-anchor="middle" fill="#4ade80" font-size="10" font-family="JetBrains Mono">ls -la /data</text>

                        <text x="185" y="80" fill="#fbbf24" font-size="16">→</text>

                        <!-- Step 2 -->
                        <rect x="200" y="45" width="150" height="65" rx="10" fill="#131a2b" stroke="#fbbf24" stroke-width="1.5"/>
                        <text x="275" y="65" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold" font-family="JetBrains Mono">STEP 2</text>
                        <text x="275" y="82" text-anchor="middle" fill="#94a3b8" font-size="10">Shell parses command</text>
                        <text x="275" y="98" text-anchor="middle" fill="#94a3b8" font-size="9">Finds /usr/bin/ls</text>

                        <text x="365" y="80" fill="#fbbf24" font-size="16">→</text>

                        <!-- Step 3 -->
                        <rect x="380" y="45" width="150" height="65" rx="10" fill="#131a2b" stroke="#f87171" stroke-width="1.5"/>
                        <text x="455" y="65" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold" font-family="JetBrains Mono">STEP 3</text>
                        <text x="455" y="82" text-anchor="middle" fill="#94a3b8" font-size="10">Kernel creates process</text>
                        <text x="455" y="98" text-anchor="middle" fill="#94a3b8" font-size="9">fork() + exec()</text>

                        <text x="545" y="80" fill="#fbbf24" font-size="16">→</text>

                        <!-- Step 4 -->
                        <rect x="560" y="45" width="210" height="65" rx="10" fill="#131a2b" stroke="#f87171" stroke-width="1.5"/>
                        <text x="665" y="65" text-anchor="middle" fill="#f87171" font-size="11" font-weight="bold" font-family="JetBrains Mono">STEP 4</text>
                        <text x="665" y="82" text-anchor="middle" fill="#94a3b8" font-size="10">Kernel reads /data from disk</text>
                        <text x="665" y="98" text-anchor="middle" fill="#94a3b8" font-size="9">File system → inode → blocks</text>

                        <!-- Second row -->
                        <text x="665" y="135" fill="#fbbf24" font-size="16">↓</text>

                        <!-- Step 5 -->
                        <rect x="560" y="150" width="210" height="65" rx="10" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5"/>
                        <text x="665" y="170" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="bold" font-family="JetBrains Mono">STEP 5</text>
                        <text x="665" y="187" text-anchor="middle" fill="#94a3b8" font-size="10">Kernel checks permissions</text>
                        <text x="665" y="203" text-anchor="middle" fill="#94a3b8" font-size="9">Can this user read /data?</text>

                        <text x="545" y="185" fill="#fbbf24" font-size="16">←</text>

                        <!-- Step 6 -->
                        <rect x="380" y="150" width="150" height="65" rx="10" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
                        <text x="455" y="170" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">STEP 6</text>
                        <text x="455" y="187" text-anchor="middle" fill="#94a3b8" font-size="10">ls formats output</text>
                        <text x="455" y="203" text-anchor="middle" fill="#94a3b8" font-size="9">Names, sizes, permissions</text>

                        <text x="365" y="185" fill="#fbbf24" font-size="16">←</text>

                        <!-- Step 7 -->
                        <rect x="200" y="150" width="150" height="65" rx="10" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
                        <text x="275" y="170" text-anchor="middle" fill="#34d399" font-size="11" font-weight="bold" font-family="JetBrains Mono">STEP 7</text>
                        <text x="275" y="187" text-anchor="middle" fill="#94a3b8" font-size="10">Output to terminal</text>
                        <text x="275" y="203" text-anchor="middle" fill="#94a3b8" font-size="9">stdout → your screen</text>

                        <!-- Summary -->
                        <rect x="80" y="240" width="640" height="55" rx="10" fill="#0d1a0d" stroke="#1a3a1a" stroke-width="1"/>
                        <text x="400" y="263" text-anchor="middle" fill="#4ade80" font-size="12" font-family="JetBrains Mono">All 7 steps happen in under 0.001 seconds (1 millisecond)!</text>
                        <text x="400" y="283" text-anchor="middle" fill="#94a3b8" font-size="11">You → Shell → Kernel → Hardware → Kernel → Shell → You</text>
                    </svg>
                    <div class="caption">Every command follows this path: You → Shell → Kernel → Hardware → back to You</div>
                </div>

                <div class="deep-dive-box">
                    <h4>🔬 Deep Dive: Kernel Space vs User Space</h4>
                    <p style="font-size:15px; line-height:1.9;">
                        This is one of the most important concepts in Linux:
                    </p>
                    <p style="font-size:15px; line-height:1.9;">
                        <strong>Kernel Space (Ring 0)</strong> — The kernel runs in "privileged mode." It has <em>full access</em> 
                        to all hardware, all memory, everything. If the kernel crashes, the entire system crashes (called a 
                        "kernel panic" — Linux's equivalent of the Windows Blue Screen of Death).
                    </p>
                    <p style="font-size:15px; line-height:1.9;">
                        <strong>User Space (Ring 3)</strong> — Your applications run in "restricted mode." They <em>cannot</em> 
                        directly access hardware or other programs' memory. If Python crashes, only Python dies — 
                        the rest of the system keeps running perfectly. This is WHY Linux servers run for years without rebooting!
                    </p>
                    <p style="font-size:15px; line-height:1.9;">
                        <strong>System Calls (syscalls)</strong> — The bridge between user space and kernel space. When your Python 
                        script calls <code>open("data.csv")</code>, Python asks the kernel (via a syscall) to open the file. 
                        The kernel checks permissions, finds the file on disk, and returns a file descriptor back to Python.
                    </p>
                </div>

                <div class="terminal-tip">
                    <h4>🖥️ Where Are Commands Stored?</h4>
                    <p style="font-size:14px; line-height:1.9;">
                        Every command you type is actually a small program stored as a file. You can find where any command lives:<br><br>
                        <code>which ls</code> → <code>/usr/bin/ls</code><br>
                        <code>which python3</code> → <code>/usr/bin/python3</code><br>
                        <code>which bash</code> → <code>/usr/bin/bash</code><br><br>
                        The shell searches for commands in directories listed in your <code>$PATH</code> variable. 
                        If a command isn't in any <code>$PATH</code> directory, you get "command not found."
                    </p>
                </div>
            `,
            interactiveExample: {
                code: `# Let's explore the architecture from inside Linux!

# 1. See the kernel version (the brain of your system)
uname -r

# 2. Where are commands stored? Let's find them!
which ls
which python3
which bash
which grep

# 3. What directories does the shell search for commands?
echo $PATH
# Output: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
# The shell checks each directory in order!

# 4. How many processes are running right now?
ps aux | wc -l

# 5. How much memory (RAM) is available?
free -h

# 6. How much disk space is used?
df -h /

# 7. What is Process ID 1? (The first process — systemd or init)
ps -p 1 -o comm=

# Each of these commands goes through ALL 7 steps we just learned!`,
                explanation: "These commands let you peek inside the Linux architecture. 'which' shows where commands live on disk. '$PATH' shows where the shell looks for them. 'ps' shows running processes. 'free' shows memory. Each command travels: You → Shell → Kernel → Hardware → back to you!"
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // SECTION 5: LINUX DISTRIBUTIONS — CHOOSING YOUR VERSION
        // ═══════════════════════════════════════════════════════════════════
        {
            id: "linux-distros",
            title: "🐧 Linux Distributions — Choosing Your Version",
            content: `
                <h3>🐧 Linux Distributions — Which One Should You Use?</h3>

                <div class="story-box">
                    <h4>🍦 Think of Linux Like Ice Cream</h4>
                    <p style="font-size:16px; line-height:1.9;">
                        The Linux <strong>kernel</strong> is the base ice cream. A <strong>distribution (distro)</strong> 
                        is a complete flavor — the kernel plus toppings (package manager, desktop environment, 
                        pre-installed tools). Vanilla (Ubuntu), Chocolate (CentOS), Strawberry (Debian) — 
                        all are ice cream, but each tastes different!
                    </p>
                </div>

                <h4>The Distros That Matter for Your Career</h4>

                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:16px; margin:20px 0;">
                    <div style="background:#131a2b; border:1px solid rgba(34,211,238,0.3); border-radius:12px; padding:24px;">
                        <h5 style="color:#22d3ee; font-size:17px; margin-bottom:12px;">🟠 Ubuntu</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.8;">
                            <strong>Best for:</strong> Learning, development, cloud<br>
                            <strong>Package Manager:</strong> <code style="background:#0d1321; padding:2px 6px; border-radius:4px; color:#4ade80;">apt</code><br>
                            <strong>Based on:</strong> Debian<br>
                            <strong>Release Cycle:</strong> Every 6 months (LTS every 2 years)<br>
                            <strong>Why it matters:</strong> Default on AWS, GCP, Azure. Most tutorials use Ubuntu. 
                            If you're a student, <strong>start here</strong>.<br>
                            <strong>Used by:</strong> Most startups, cloud deployments, WSL2 default
                        </p>
                    </div>
                    <div style="background:#131a2b; border:1px solid rgba(167,139,250,0.3); border-radius:12px; padding:24px;">
                        <h5 style="color:#a78bfa; font-size:17px; margin-bottom:12px;">🔴 CentOS / Rocky / Alma</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.8;">
                            <strong>Best for:</strong> Enterprise, production servers<br>
                            <strong>Package Manager:</strong> <code style="background:#0d1321; padding:2px 6px; border-radius:4px; color:#4ade80;">yum</code> / <code style="background:#0d1321; padding:2px 6px; border-radius:4px; color:#4ade80;">dnf</code><br>
                            <strong>Based on:</strong> Red Hat Enterprise Linux (RHEL)<br>
                            <strong>Release Cycle:</strong> Stable, long support (10 years)<br>
                            <strong>Why it matters:</strong> Banks, telecom, government servers. Many Hadoop/Spark clusters run on CentOS.<br>
                            <strong>Used by:</strong> TCS, Infosys, large enterprises, data centers
                        </p>
                    </div>
                    <div style="background:#131a2b; border:1px solid rgba(52,211,153,0.3); border-radius:12px; padding:24px;">
                        <h5 style="color:#34d399; font-size:17px; margin-bottom:12px;">🟢 Debian</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.8;">
                            <strong>Best for:</strong> Maximum stability servers<br>
                            <strong>Package Manager:</strong> <code style="background:#0d1321; padding:2px 6px; border-radius:4px; color:#4ade80;">apt</code><br>
                            <strong>Based on:</strong> Independent (the "grandfather")<br>
                            <strong>Release Cycle:</strong> Slow, ultra-stable<br>
                            <strong>Why it matters:</strong> Ubuntu is BASED on Debian. Docker images often use Debian. 
                            The most "pure" Linux experience.<br>
                            <strong>Used by:</strong> Servers that absolutely cannot fail
                        </p>
                    </div>
                    <div style="background:#131a2b; border:1px solid rgba(251,191,36,0.3); border-radius:12px; padding:24px;">
                        <h5 style="color:#fbbf24; font-size:17px; margin-bottom:12px;">🟡 Amazon Linux</h5>
                        <p style="color:#94a3b8; font-size:14px; line-height:1.8;">
                            <strong>Best for:</strong> AWS-native workloads<br>
                            <strong>Package Manager:</strong> <code style="background:#0d1321; padding:2px 6px; border-radius:4px; color:#4ade80;">yum</code> / <code style="background:#0d1321; padding:2px 6px; border-radius:4px; color:#4ade80;">dnf</code><br>
                            <strong>Based on:</strong> Fedora / CentOS<br>
                            <strong>Why it matters:</strong> Optimized for AWS EC2. Free on AWS. If your company uses AWS, 
                            you'll see this frequently.<br>
                            <strong>Used by:</strong> AWS-heavy companies
                        </p>
                    </div>
                </div>

                <h4>📦 Package Managers: apt vs yum — The Biggest Difference</h4>
                <p style="font-size:15px; line-height:1.9;">
                    The biggest practical difference between Ubuntu and CentOS is how you <strong>install software</strong>. 
                    It's like the difference between shopping at two different stores — same products, different checkout system:
                </p>

                <table style="width:100%; border-collapse:collapse; margin:18px 0; font-size:14px;">
                    <thead>
                        <tr>
                            <th style="background:#182035; color:#22d3ee; padding:12px; text-align:left; border:1px solid #1e293b; font-family:'JetBrains Mono', monospace; font-size:12px;">Action</th>
                            <th style="background:#182035; color:#22d3ee; padding:12px; text-align:left; border:1px solid #1e293b; font-family:'JetBrains Mono', monospace; font-size:12px;">Ubuntu (apt)</th>
                            <th style="background:#182035; color:#22d3ee; padding:12px; text-align:left; border:1px solid #1e293b; font-family:'JetBrains Mono', monospace; font-size:12px;">CentOS (yum/dnf)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:10px; border:1px solid #1e293b; color:#e2e8f0; background:#131a2b;">Update package list</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#131a2b; font-family:'JetBrains Mono', monospace; font-size:12px;">sudo apt update</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#131a2b; font-family:'JetBrains Mono', monospace; font-size:12px;">sudo yum check-update</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #1e293b; color:#e2e8f0; background:#182035;">Install a package</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#182035; font-family:'JetBrains Mono', monospace; font-size:12px;">sudo apt install python3</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#182035; font-family:'JetBrains Mono', monospace; font-size:12px;">sudo yum install python3</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #1e293b; color:#e2e8f0; background:#131a2b;">Remove a package</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#131a2b; font-family:'JetBrains Mono', monospace; font-size:12px;">sudo apt remove python3</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#131a2b; font-family:'JetBrains Mono', monospace; font-size:12px;">sudo yum remove python3</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #1e293b; color:#e2e8f0; background:#182035;">Upgrade everything</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#182035; font-family:'JetBrains Mono', monospace; font-size:12px;">sudo apt upgrade</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#182035; font-family:'JetBrains Mono', monospace; font-size:12px;">sudo yum update</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #1e293b; color:#e2e8f0; background:#131a2b;">Search for package</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#131a2b; font-family:'JetBrains Mono', monospace; font-size:12px;">apt search nginx</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#4ade80; background:#131a2b; font-family:'JetBrains Mono', monospace; font-size:12px;">yum search nginx</td>
                        </tr>
                        <tr>
                            <td style="padding:10px; border:1px solid #1e293b; color:#e2e8f0; background:#182035;">Package format</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#94a3b8; background:#182035;">.deb (Debian package)</td>
                            <td style="padding:10px; border:1px solid #1e293b; color:#94a3b8; background:#182035;">.rpm (Red Hat package)</td>
                        </tr>
                    </tbody>
                </table>

                <div class="warning-box">
                    <h4>⚠️ CentOS Drama: Know This for Interviews!</h4>
                    <p style="font-size:15px; line-height:1.9;">
                        In December 2020, Red Hat <strong>killed CentOS</strong> as a stable downstream clone of RHEL and 
                        replaced it with "CentOS Stream" (a rolling-release testing ground). The community was furious! 
                        Two alternatives were born: <strong>Rocky Linux</strong> (by CentOS co-founder) and 
                        <strong>AlmaLinux</strong>. These are now the go-to RHEL-compatible distros for production.
                    </p>
                </div>

                <!-- SVG: Distro Family Tree -->
                <div class="visual-container">
                    <svg viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg">
                        <text x="375" y="22" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold" font-family="Space Grotesk, sans-serif">Linux Distribution Family Tree</text>

                        <!-- Debian Family -->
                        <rect x="30" y="50" width="120" height="45" rx="10" fill="#131a2b" stroke="#34d399" stroke-width="2"/>
                        <text x="90" y="77" text-anchor="middle" fill="#34d399" font-size="13" font-weight="bold" font-family="JetBrains Mono">Debian</text>

                        <line x1="90" y1="95" x2="90" y2="130" stroke="#34d399" stroke-width="1.5"/>
                        <line x1="90" y1="130" x2="45" y2="130" stroke="#34d399" stroke-width="1.5"/>
                        <line x1="90" y1="130" x2="145" y2="130" stroke="#34d399" stroke-width="1.5"/>

                        <rect x="10" y="135" width="90" height="38" rx="8" fill="#131a2b" stroke="#22d3ee" stroke-width="1.5"/>
                        <text x="55" y="159" text-anchor="middle" fill="#22d3ee" font-size="11" font-weight="bold" font-family="JetBrains Mono">Ubuntu</text>

                        <rect x="110" y="135" width="90" height="38" rx="8" fill="#131a2b" stroke="#94a3b8" stroke-width="1"/>
                        <text x="155" y="159" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">Linux Mint</text>

                        <line x1="55" y1="173" x2="55" y2="200" stroke="#22d3ee" stroke-width="1"/>
                        <rect x="10" y="205" width="100" height="35" rx="6" fill="#131a2b" stroke="#64748b" stroke-width="1"/>
                        <text x="60" y="227" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="JetBrains Mono">Pop!_OS, Zorin</text>

                        <!-- Red Hat Family -->
                        <rect x="310" y="50" width="120" height="45" rx="10" fill="#131a2b" stroke="#f87171" stroke-width="2"/>
                        <text x="370" y="77" text-anchor="middle" fill="#f87171" font-size="13" font-weight="bold" font-family="JetBrains Mono">RHEL</text>

                        <line x1="370" y1="95" x2="370" y2="130" stroke="#f87171" stroke-width="1.5"/>
                        <line x1="370" y1="130" x2="300" y2="130" stroke="#f87171" stroke-width="1.5"/>
                        <line x1="370" y1="130" x2="440" y2="130" stroke="#f87171" stroke-width="1.5"/>

                        <rect x="270" y="135" width="90" height="38" rx="8" fill="#131a2b" stroke="#a78bfa" stroke-width="1.5"/>
                        <text x="315" y="159" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="bold" font-family="JetBrains Mono">CentOS ☠️</text>

                        <rect x="400" y="135" width="90" height="38" rx="8" fill="#131a2b" stroke="#fbbf24" stroke-width="1.5"/>
                        <text x="445" y="159" text-anchor="middle" fill="#fbbf24" font-size="10" font-family="JetBrains Mono">Fedora</text>

                        <line x1="315" y1="173" x2="315" y2="200" stroke="#a78bfa" stroke-width="1"/>
                        <line x1="315" y1="200" x2="280" y2="200" stroke="#a78bfa" stroke-width="1"/>
                        <line x1="315" y1="200" x2="370" y2="200" stroke="#a78bfa" stroke-width="1"/>

                        <rect x="245" y="205" width="90" height="35" rx="6" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
                        <text x="290" y="227" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold" font-family="JetBrains Mono">Rocky</text>

                        <rect x="345" y="205" width="90" height="35" rx="6" fill="#131a2b" stroke="#34d399" stroke-width="1.5"/>
                        <text x="390" y="227" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold" font-family="JetBrains Mono">AlmaLinux</text>

                        <!-- Arch Family -->
                        <rect x="570" y="50" width="120" height="45" rx="10" fill="#131a2b" stroke="#fbbf24" stroke-width="2"/>
                        <text x="630" y="77" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="bold" font-family="JetBrains Mono">Arch</text>

                        <line x1="630" y1="95" x2="630" y2="135" stroke="#fbbf24" stroke-width="1.5"/>
                        <rect x="580" y="135" width="100" height="38" rx="8" fill="#131a2b" stroke="#94a3b8" stroke-width="1"/>
                        <text x="630" y="159" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="JetBrains Mono">Manjaro</text>

                        <!-- Legend -->
                        <text x="375" y="270" text-anchor="middle" fill="#64748b" font-size="10">☠️ CentOS discontinued (2020) — Rocky &amp; Alma are its successors</text>
                    </svg>
                    <div class="caption">Three major families: Debian (apt), Red Hat (yum/dnf), and Arch (pacman)</div>
                </div>

                <div class="tip-box">
                    <h4>🎯 Our Recommendation for This Course</h4>
                    <p style="font-size:15px; line-height:1.9;">
                        <strong>Use Ubuntu for learning.</strong> It has the best documentation, the largest community, 
                        and is the default on all major cloud platforms. Everything you learn on Ubuntu transfers to 
                        CentOS/Rocky with minor command differences. Once you're comfortable, practice the <code>yum</code> 
                        equivalents on a CentOS VM.
                    </p>
                </div>
            `,
            interactiveExample: {
                code: `# Let's find out EXACTLY what Linux distro YOU are running!

# Method 1: The standard way (works on all modern distros)
cat /etc/os-release

# Method 2: Pretty print (Ubuntu/Debian)
lsb_release -a

# Method 3: System details
hostnamectl

# Method 4: Check the package manager (tells you the family!)
# If this works → you're on Debian/Ubuntu:
apt --version 2>/dev/null && echo "You're on a Debian-based distro!"

# If this works → you're on RHEL/CentOS/Rocky:
yum --version 2>/dev/null && echo "You're on a Red Hat-based distro!"

# Bonus: When was this system installed?
stat / | grep Birth`,
                explanation: "These commands help you identify any Linux system you connect to. In real jobs, you'll SSH into unknown servers — the first thing you do is check what distro it is, so you know which package manager to use!"
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // SECTION 6: SETTING UP YOUR ENVIRONMENT — GET STARTED NOW
        // ═══════════════════════════════════════════════════════════════════
        {
            id: "setup-environment",
            title: "🚀 Setting Up Your Linux Environment — Start Now!",
            content: `
                <h3>🚀 Setting Up Your Linux Environment — Let's Get Started!</h3>

                <div class="story-box">
                    <h4>🎬 Ravi's Setup on Day 1</h4>
                    <p style="font-size:16px; line-height:1.9;">
                        Ravi's manager gave him three options: "Install Ubuntu in VirtualBox for practice, 
                        use WSL2 on your Windows laptop for daily work, and here's SSH access to our AWS servers." 
                        Ravi used all three. Let's set up each one.
                    </p>
                </div>

                <h4>🏆 Option 1: WSL2 on Windows (Fastest — 5 Minutes)</h4>
                <div class="info-box">
                    <h4>💡 What is WSL2?</h4>
                    <p style="font-size:15px; line-height:1.9;">
                        <strong>Windows Subsystem for Linux version 2</strong> — Microsoft built a real Linux kernel 
                        into Windows! You get a full Ubuntu terminal running inside Windows without any virtual machine. 
                        It's fast, lightweight, and perfect for students.
                    </p>
                </div>

                <div style="background:#0d1a0d; border:1px solid #1a3a1a; border-radius:12px; margin:18px 0; overflow:hidden;">
                    <div style="background:#0d1a0d; padding:8px 14px; display:flex; align-items:center; gap:8px; border-bottom:1px solid #1a3a1a;">
                        <div style="width:10px;height:10px;border-radius:50%;background:#f87171;"></div>
                        <div style="width:10px;height:10px;border-radius:50%;background:#fbbf24;"></div>
                        <div style="width:10px;height:10px;border-radius:50%;background:#34d399;"></div>
                        <span style="font-family:'JetBrains Mono', monospace; font-size:11px; color:#64748b; margin-left:8px;">PowerShell (Run as Administrator)</span>
                    </div>
                    <div style="padding:16px 18px; font-family:'JetBrains Mono', monospace; font-size:13px; line-height:1.8; color:#4ade80; white-space:pre-wrap;">
<span style="color:#6a9955;"># STEP 1: Open PowerShell as Administrator</span>
<span style="color:#6a9955;"># Right-click Start menu → "Windows Terminal (Admin)"</span>

<span style="color:#22d3ee;">PS></span> wsl --install
<span style="color:#cbd5e1;"># This installs WSL2 + Ubuntu automatically!</span>
<span style="color:#cbd5e1;"># Your computer will restart.</span>

<span style="color:#6a9955;"># STEP 2: After restart, Ubuntu opens automatically</span>
<span style="color:#6a9955;"># Set your username and password</span>

<span style="color:#6a9955;"># STEP 3: Verify it works</span>
<span style="color:#22d3ee;">PS></span> wsl --list --verbose
<span style="color:#cbd5e1;">  NAME      STATE    VERSION</span>
<span style="color:#cbd5e1;">  Ubuntu    Running  2</span>

<span style="color:#6a9955;"># STEP 4: Enter Linux!</span>
<span style="color:#22d3ee;">PS></span> wsl
<span style="color:#22d3ee;">$</span> whoami
<span style="color:#cbd5e1;">ravi</span>
<span style="color:#22d3ee;">$</span> cat /etc/os-release | head -2
<span style="color:#cbd5e1;">NAME="Ubuntu"</span>
<span style="color:#cbd5e1;">VERSION="24.04 LTS"</span>

<span style="color:#6a9955;"># STEP 5: Update everything (ALWAYS do this first!)</span>
<span style="color:#22d3ee;">$</span> sudo apt update && sudo apt upgrade -y

<span style="color:#34d399;"># 🎉 You now have a full Linux environment on Windows!</span></div>
                </div>

                <h4>🏆 Option 2: VirtualBox VM (Best for Learning Installation)</h4>
                <div style="background:#131a2b; border:1px solid #1e293b; border-radius:12px; padding:24px; margin:18px 0;">
                    <p style="font-size:15px; line-height:1.9; color:#94a3b8;">
                        <strong style="color:#22d3ee;">Step 1:</strong> Download VirtualBox from virtualbox.org (free)<br>
                        <strong style="color:#22d3ee;">Step 2:</strong> Download Ubuntu Server ISO from ubuntu.com<br>
                        <strong style="color:#22d3ee;">Step 3:</strong> Create a new VM: 2 GB RAM, 20 GB disk, Ubuntu 64-bit<br>
                        <strong style="color:#22d3ee;">Step 4:</strong> Mount the ISO and boot → Follow installation wizard<br>
                        <strong style="color:#22d3ee;">Step 5:</strong> Choose "Ubuntu Server" (no GUI) for authentic experience<br>
                        <strong style="color:#22d3ee;">Step 6:</strong> After install, run <code style="background:#0d1321; padding:2px 6px; border-radius:4px; color:#4ade80;">sudo apt update && sudo apt upgrade -y</code>
                    </p>
                    <p style="font-size:14px; line-height:1.9; color:#fbbf24; margin-top:12px;">
                        ⚠️ This is the only way to practice the full installation process from your syllabus 
                        (BIOS, GRUB, partitioning, run levels). You NEED this for the exam.
                    </p>
                </div>

                <h4>🏆 Option 3: Cloud VM — AWS Free Tier</h4>
                <div style="background:#131a2b; border:1px solid #1e293b; border-radius:12px; padding:24px; margin:18px 0;">
                    <p style="font-size:15px; line-height:1.9; color:#94a3b8;">
                        <strong style="color:#22d3ee;">Step 1:</strong> Create an AWS account (aws.amazon.com — free tier available)<br>
                        <strong style="color:#22d3ee;">Step 2:</strong> Launch an EC2 instance → Ubuntu Server 24.04 LTS<br>
                        <strong style="color:#22d3ee;">Step 3:</strong> Choose t2.micro (free tier eligible)<br>
                        <strong style="color:#22d3ee;">Step 4:</strong> Create a key pair (.pem file) for SSH<br>
                        <strong style="color:#22d3ee;">Step 5:</strong> Connect via SSH: <code style="background:#0d1321; padding:2px 6px; border-radius:4px; color:#4ade80;">ssh -i mykey.pem ubuntu@your-ip</code>
                    </p>
                    <p style="font-size:14px; line-height:1.9; color:#34d399; margin-top:12px;">
                        ✅ This is how you'll work in real jobs. Practice this early!
                    </p>
                </div>

                <h4>🛠️ Essential First Commands After Setup</h4>
                <div style="background:#0d1a0d; border:1px solid #1a3a1a; border-radius:12px; margin:18px 0; overflow:hidden;">
                    <div style="background:#0d1a0d; padding:8px 14px; display:flex; align-items:center; gap:8px; border-bottom:1px solid #1a3a1a;">
                        <div style="width:10px;height:10px;border-radius:50%;background:#f87171;"></div>
                        <div style="width:10px;height:10px;border-radius:50%;background:#fbbf24;"></div>
                        <div style="width:10px;height:10px;border-radius:50%;background:#34d399;"></div>
                        <span style="font-family:'JetBrains Mono', monospace; font-size:11px; color:#64748b; margin-left:8px;">first_commands.sh — Run These After Any Fresh Install</span>
                    </div>
                    <div style="padding:16px 18px; font-family:'JetBrains Mono', monospace; font-size:13px; line-height:1.8; color:#4ade80; white-space:pre-wrap;">
<span style="color:#6a9955;"># ═══ UPDATE SYSTEM (ALWAYS first thing!) ═══</span>
<span style="color:#22d3ee;">$</span> sudo apt update                  <span style="color:#6a9955;"># Refresh package list</span>
<span style="color:#22d3ee;">$</span> sudo apt upgrade -y               <span style="color:#6a9955;"># Upgrade all packages</span>

<span style="color:#6a9955;"># ═══ INSTALL ESSENTIAL TOOLS ═══</span>
<span style="color:#22d3ee;">$</span> sudo apt install -y vim git curl wget htop tree net-tools

<span style="color:#6a9955;"># What did we just install?</span>
<span style="color:#6a9955;"># vim      → The text editor (you'll use daily)</span>
<span style="color:#6a9955;"># git      → Version control (mandatory for all projects)</span>
<span style="color:#6a9955;"># curl     → Download files from URLs</span>
<span style="color:#6a9955;"># wget     → Download files (alternative to curl)</span>
<span style="color:#6a9955;"># htop     → Beautiful process monitor (better than top)</span>
<span style="color:#6a9955;"># tree     → Visualize directory structures</span>
<span style="color:#6a9955;"># net-tools → Network utilities (ifconfig, etc.)</span>

<span style="color:#6a9955;"># ═══ VERIFY EVERYTHING WORKS ═══</span>
<span style="color:#22d3ee;">$</span> git --version
<span style="color:#22d3ee;">$</span> vim --version | head -1
<span style="color:#22d3ee;">$</span> python3 --version

<span style="color:#34d399;"># 🎉 Your Linux machine is ready for action!</span></div>
                </div>

                <h4>📋 What You'll Be Able to Do After This Course</h4>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:20px 0;">
                    <div style="background:#131a2b; border:1px solid #1e293b; border-radius:10px; padding:20px;">
                        <h5 style="color:#22d3ee; margin-bottom:8px; font-size:14px;">By Week 1</h5>
                        <p style="color:#94a3b8; font-size:13px; line-height:1.7;">
                            Navigate the file system, create/copy/move/delete files, 
                            read logs, search with grep, understand permissions.
                        </p>
                    </div>
                    <div style="background:#131a2b; border:1px solid #1e293b; border-radius:10px; padding:20px;">
                        <h5 style="color:#a78bfa; margin-bottom:8px; font-size:14px;">By Week 2</h5>
                        <p style="color:#94a3b8; font-size:13px; line-height:1.7;">
                            Use vim confidently, set permissions/ACLs, pipe commands, 
                            process text with grep/awk/sed, compress/archive files.
                        </p>
                    </div>
                    <div style="background:#131a2b; border:1px solid #1e293b; border-radius:10px; padding:20px;">
                        <h5 style="color:#fbbf24; margin-bottom:8px; font-size:14px;">By Week 3-4</h5>
                        <p style="color:#94a3b8; font-size:13px; line-height:1.7;">
                            Write shell scripts, automate tasks, manage processes, 
                            use SSH, schedule cron jobs, build data pipelines in bash.
                        </p>
                    </div>
                    <div style="background:#131a2b; border:1px solid #1e293b; border-radius:10px; padding:20px;">
                        <h5 style="color:#34d399; margin-bottom:8px; font-size:14px;">After This Course</h5>
                        <p style="color:#94a3b8; font-size:13px; line-height:1.7;">
                            Confidently operate production Linux servers, debug data pipelines, 
                            use Docker, deploy ML models, and impress your manager on Day 1!
                        </p>
                    </div>
                </div>

                <div class="tip-box">
                    <h4>🎯 The Single Best Advice for Learning Linux</h4>
                    <p style="font-size:16px; line-height:1.9;">
                        <strong>Use Linux every day.</strong> Don't just read about commands — type them. 
                        Break things and fix them. The terminal is a muscle that gets stronger with daily exercise. 
                        Set up WSL2 today and use it for everything — even homework, file management, and projects. 
                        After 2 weeks, you'll wonder how you ever lived without it.
                    </p>
                </div>
            `,
            interactiveExample: {
                code: `# YOUR FIRST LINUX SESSION — Run each command and observe!

# ═══ WHO ARE YOU? ═══
echo "=== System Identity ==="
whoami                    # Your username
hostname                  # Machine name
echo $SHELL               # Your shell (probably /bin/bash)

# ═══ WHERE ARE YOU? ═══
echo ""
echo "=== Location ==="
pwd                       # Current directory
ls -la                    # What's in this directory?

# ═══ WHAT'S RUNNING? ═══
echo ""
echo "=== System Status ==="
uptime                    # How long has this machine been on?
free -h | head -3         # Memory (RAM) status
df -h / | tail -1         # Disk space on root

# ═══ WHAT CAN YOU DO? ═══
echo ""
echo "=== Available Tools ==="
echo "Bash version:" && bash --version | head -1
python3 --version 2>/dev/null || echo "Python3 not installed"
git --version 2>/dev/null || echo "Git not installed"

# ═══ YOUR FIRST CREATION ═══
echo ""
echo "=== Your First File ==="
echo "Hello, I am learning Linux!" > my_first_file.txt
cat my_first_file.txt     # Read what you just wrote!
ls -la my_first_file.txt  # See the file details

echo ""
echo "🎉 Congratulations! You've completed your first Linux session!"`,
                explanation: "This is your very first interactive session with Linux! Each command teaches you something about your system. 'whoami' tells you your username, 'pwd' shows your location, 'free' shows memory, and 'echo > file' creates your first file. Run it and read every output carefully!"
            }
        }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // PRACTICE EXERCISES
    // ═══════════════════════════════════════════════════════════════════
    practiceExercises: [
        {
            id: "ex1",
            difficulty: "Easy",
            title: "Exercise 1: System Discovery",
            description: "Run commands to discover everything about your Linux system.",
            starterCode: `# EXERCISE: System Discovery
# Run each command and write down what it shows:

# 1. What is your username?
whoami

# 2. What is the hostname of your machine?
hostname

# 3. What Linux kernel version are you running?
# YOUR COMMAND HERE:


# 4. What distribution are you using?
# YOUR COMMAND HERE:


# 5. How long has this system been running?
# YOUR COMMAND HERE:
`,
            solution: `# SOLUTION: System Discovery

# 1. What is your username?
whoami

# 2. What is the hostname of your machine?
hostname

# 3. What Linux kernel version are you running?
uname -r

# 4. What distribution are you using?
cat /etc/os-release | head -4

# 5. How long has this system been running?
uptime`,
            explanation: "Each of these commands queries different parts of the system. 'whoami' reads the current user ID. 'hostname' reads /etc/hostname. 'uname -r' asks the kernel directly for its version. '/etc/os-release' is a file that stores distribution info. 'uptime' reads from /proc/uptime."
        },
        {
            id: "ex2",
            difficulty: "Easy",
            title: "Exercise 2: Create Your Project Structure",
            description: "Use a single command to create a complete data engineering project structure.",
            starterCode: `# EXERCISE: Create this project structure using ONE command:
# 
# ml_project/
# ├── data/
# │   ├── raw/
# │   ├── processed/
# │   └── output/
# ├── notebooks/
# ├── scripts/
# │   ├── python/
# │   └── shell/
# ├── models/
# └── logs/
#
# Hint: Use mkdir -p with brace expansion {a,b,c}

# YOUR COMMAND HERE:


# Verify your work:
find ml_project -type d | sort`,
            solution: `# SOLUTION: One command creates everything!
mkdir -p ml_project/{data/{raw,processed,output},notebooks,scripts/{python,shell},models,logs}

# Verify your work:
find ml_project -type d | sort

# Optional: Beautiful tree view (if 'tree' is installed)
tree ml_project`,
            explanation: "The 'mkdir -p' command creates parent directories as needed. Brace expansion {a,b,c} generates multiple arguments. So 'data/{raw,processed,output}' becomes 'data/raw data/processed data/output'. The shell expands ALL combinations BEFORE running mkdir. This is why Linux is powerful — one line replaces dozens of mouse clicks!"
        },
        {
            id: "ex3",
            difficulty: "Easy",
            title: "Exercise 3: File Creation & Reading",
            description: "Create files, write content to them, and read them back.",
            starterCode: `# EXERCISE: File Operations

# 1. Create a file called "intro.txt" with the text "Hello Linux!"
# Hint: Use echo with > redirection
# YOUR COMMAND:


# 2. APPEND a second line "I am learning the terminal" to intro.txt
# Hint: Use >> (double arrow) to append
# YOUR COMMAND:


# 3. Display the contents of intro.txt
# YOUR COMMAND:


# 4. Count how many lines are in intro.txt
# YOUR COMMAND:


# 5. Create a file called "data.csv" with 3 lines of CSV data
# YOUR COMMAND (use echo three times with >>):
`,
            solution: `# SOLUTION: File Operations

# 1. Create a file with content
echo "Hello Linux!" > intro.txt

# 2. Append a second line
echo "I am learning the terminal" >> intro.txt

# 3. Display the contents
cat intro.txt

# 4. Count lines
wc -l intro.txt

# 5. Create CSV data
echo "name,age,city" > data.csv
echo "Ravi,24,Pune" >> data.csv
echo "Priya,26,Mumbai" >> data.csv
cat data.csv`,
            explanation: "The '>' operator CREATES a file and writes to it (overwrites if exists). The '>>' operator APPENDS to the end without erasing. 'cat' reads and displays the file. 'wc -l' counts lines. These are the absolute basics of file I/O in Linux — you'll use them thousands of times!"
        },
        {
            id: "ex4",
            difficulty: "Medium",
            title: "Exercise 4: Finding Where Commands Live",
            description: "Discover how the shell finds and executes commands.",
            starterCode: `# EXERCISE: How Does the Shell Find Commands?

# 1. Where is the 'ls' command stored on disk?
# Hint: Use 'which' command
# YOUR COMMAND:


# 2. Where is 'python3' stored?
# YOUR COMMAND:


# 3. What's in the $PATH variable?
# YOUR COMMAND:


# 4. How many directories are in your $PATH?
# Hint: Count the colons and add 1, or use tr and wc
# YOUR COMMAND:


# 5. What type of file is /usr/bin/ls?
# Hint: Use the 'file' command
# YOUR COMMAND:
`,
            solution: `# SOLUTION: How the Shell Finds Commands

# 1. Where is 'ls'?
which ls
# Output: /usr/bin/ls

# 2. Where is 'python3'?
which python3
# Output: /usr/bin/python3

# 3. What's in $PATH?
echo $PATH
# Output: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# 4. How many directories in $PATH?
echo $PATH | tr ':' '\\n' | wc -l
# This replaces colons with newlines, then counts lines!

# 5. What type of file is ls?
file /usr/bin/ls
# Output: ELF 64-bit LSB executable (it's a compiled binary!)`,
            explanation: "When you type 'ls', the shell doesn't know where 'ls' is. It searches each directory in $PATH in order: first /usr/local/sbin, then /usr/local/bin, etc. The first match wins. 'which' shows you which one it found. 'file' tells you what TYPE of file it is — 'ls' is a compiled binary (ELF executable), not a script. Understanding $PATH is essential for managing Python virtual environments and custom tools!"
        },
        {
            id: "ex5",
            difficulty: "Medium",
            title: "Exercise 5: System Resource Check",
            description: "Write a mini system health check using Linux commands.",
            starterCode: `# EXERCISE: Mini System Health Check
# Run commands to check your system's health

# 1. Check total RAM and how much is used
# Hint: free -h
# YOUR COMMAND:


# 2. Check disk space usage
# Hint: df -h
# YOUR COMMAND:


# 3. How many processes are running right now?
# Hint: Use ps aux and count lines with wc -l
# YOUR COMMAND:


# 4. What is the most memory-hungry process?
# Hint: ps aux --sort=-%mem | head -5
# YOUR COMMAND:


# 5. What is the system load average?
# Hint: uptime
# YOUR COMMAND:
`,
            solution: `# SOLUTION: Mini System Health Check

# 1. RAM check
free -h
# Shows total, used, free, shared, cache, available

# 2. Disk space
df -h /
# Shows total, used, available, use%, mount point

# 3. Process count
ps aux | wc -l
# Subtract 1 for the header line!

# 4. Top memory consumers
ps aux --sort=-%mem | head -5
# Shows the 5 most memory-hungry processes

# 5. Load average
uptime
# Shows: load average: 0.15, 0.10, 0.05
# These are 1-min, 5-min, 15-min CPU load averages
# If load > number of CPU cores, system is overloaded!`,
            explanation: "'free -h' reads from /proc/meminfo and formats it. 'df -h' queries the filesystem for disk stats. 'ps aux' lists all running processes. The --sort flag lets you sort by any column (-%mem = descending memory). Load average is crucial for data engineers — if your Spark job pushes load above CPU count, the server is struggling!"
        },
        {
            id: "ex6",
            difficulty: "Medium",
            title: "Exercise 6: Navigation Challenge",
            description: "Navigate the Linux file system and understand key directories.",
            starterCode: `# EXERCISE: Navigate and Explore!

# 1. Go to the root directory (/) and list its contents
# YOUR COMMANDS:


# 2. Go to /var/log and find what log files exist
# YOUR COMMANDS:


# 3. Go to /etc and find the hostname file
# YOUR COMMANDS:


# 4. Go back to your home directory using ~ shortcut
# YOUR COMMAND:


# 5. Use ONE command to see the directory tree of /usr (2 levels deep)
# Hint: tree -L 2 /usr (if tree is installed)
# Alternative: find /usr -maxdepth 2 -type d | head -20
# YOUR COMMAND:
`,
            solution: `# SOLUTION: Navigation Challenge

# 1. Root directory
cd /
ls -la

# 2. Log files
cd /var/log
ls -lht | head -15

# 3. Hostname file
cd /etc
cat hostname

# 4. Back to home
cd ~
pwd

# 5. Directory tree
tree -L 2 /usr 2>/dev/null || find /usr -maxdepth 2 -type d | head -20`,
            explanation: "'/' is the root — the topmost directory (like C:\\ on Windows, but better). '/var/log' stores all system logs — data engineers check these constantly. '/etc' stores configuration files. '~' is a shortcut for your home directory. Every directory in Linux has a specific purpose — we'll learn each one in the File System Hierarchy lesson!"
        },
        {
            id: "ex7",
            difficulty: "Hard",
            title: "Exercise 7: Build a System Info Script",
            description: "Combine everything you've learned to create a system information report.",
            starterCode: `# EXERCISE: Create a System Info Report
# Combine multiple commands to generate a nice report

# Create a file called system_report.txt with:
# - Current date and time
# - Username and hostname
# - Linux distro info  
# - Kernel version
# - CPU info
# - Memory (RAM) status
# - Disk usage
# - Number of running processes
# - Top 3 memory-hungry processes
#
# Hint: Use echo and >> to build the file
# Start with: echo "=== SYSTEM REPORT ===" > system_report.txt
#
# YOUR COMMANDS HERE:
`,
            solution: `# SOLUTION: System Info Report

echo "========================================" > system_report.txt
echo "   SYSTEM INFORMATION REPORT" >> system_report.txt
echo "========================================" >> system_report.txt
echo "" >> system_report.txt
echo "Date: $(date)" >> system_report.txt
echo "User: $(whoami)" >> system_report.txt
echo "Host: $(hostname)" >> system_report.txt
echo "" >> system_report.txt
echo "--- Distribution ---" >> system_report.txt
cat /etc/os-release | head -3 >> system_report.txt
echo "" >> system_report.txt
echo "--- Kernel ---" >> system_report.txt
uname -r >> system_report.txt
echo "" >> system_report.txt
echo "--- Memory ---" >> system_report.txt
free -h | head -2 >> system_report.txt
echo "" >> system_report.txt
echo "--- Disk Usage ---" >> system_report.txt
df -h / | tail -1 >> system_report.txt
echo "" >> system_report.txt
echo "--- Running Processes ---" >> system_report.txt
echo "Total: $(ps aux | wc -l) processes" >> system_report.txt
echo "" >> system_report.txt
echo "--- Top 3 Memory Consumers ---" >> system_report.txt
ps aux --sort=-%mem | head -4 >> system_report.txt
echo "" >> system_report.txt
echo "========================================" >> system_report.txt

# Display the report:
cat system_report.txt`,
            explanation: "This exercise combines EVERYTHING: file creation (>), appending (>>), command substitution $(command), piping (|), and multiple Linux commands. The $(command) syntax runs a command inside a string. This is actually a very basic shell script — by the Shell Programming section, you'll be writing these with loops, conditionals, and functions! System reports like this are used daily in production to monitor server health."
        }
    ],

    // ═══════════════════════════════════════════════════════════════════
    // SUMMARY
    // ═══════════════════════════════════════════════════════════════════
    summary: `
        <h3>🎉 Welcome Module Complete!</h3>

        <div class="tip-box">
            <h4>✅ What You've Learned</h4>
            <p style="font-size:15px; line-height:2;">
                ✅ <strong>Why Linux matters</strong> — 96%+ of servers, all containers, all supercomputers, all AI training<br>
                ✅ <strong>The Origin Story</strong> — Unix → GNU → Linux kernel → complete OS, and the GPL license<br>
                ✅ <strong>Linux vs Windows vs Mac</strong> — Why Linux dominates servers and data infrastructure<br>
                ✅ <strong>How Linux Works</strong> — Architecture layers (Hardware → Kernel → Shell → Applications)<br>
                ✅ <strong>What happens when you type a command</strong> — The 7-step journey from you to hardware and back<br>
                ✅ <strong>Distributions</strong> — Ubuntu (apt) vs CentOS/Rocky (yum) and when to use each<br>
                ✅ <strong>Setting up your environment</strong> — WSL2, VirtualBox, and AWS EC2<br>
                ✅ <strong>First commands</strong> — whoami, pwd, ls, echo, cat, free, df, uname, ps
            </p>
        </div>

        <div class="info-box">
            <h4>🚀 What's Next?</h4>
            <p style="font-size:15px; line-height:1.9;">
                In the next module, we'll dive into <strong>Essential Commands</strong> — the core toolkit every 
                Linux user must master. You'll learn navigation (cd, pwd, ls), file operations (cp, mv, rm, mkdir), 
                viewing files (cat, head, tail), and searching (grep, find). These are the commands you'll use 
                <em>every single day</em> of your career.
            </p>
        </div>

        <div class="story-box">
            <h4>🐧 Ravi's Status at End of Week 1</h4>
            <p style="font-size:15px; line-height:1.9;">
                After learning everything in this module, Ravi could log into servers, check system health, 
                navigate directories, and create files. He wasn't an expert yet, but he wasn't lost anymore. 
                His manager noticed the improvement and said: <em>"You're picking this up fast. Tomorrow we'll 
                start working with the data pipeline."</em>
            </p>
            <p style="font-size:16px; line-height:1.9;">
                <strong>That's going to be you. Let's keep going! 🚀</strong>
            </p>
        </div>
    `
};

// Register the module
console.log("✅ welcome.js loaded successfully! (Linux Programming - Welcome Module)");