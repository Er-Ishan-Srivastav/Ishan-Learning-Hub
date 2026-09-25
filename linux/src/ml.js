var title = "";
var pText = "";
var padding = "";
var i = 1;
var max = 1;
var cbody = "";

const mlWorkflowsContent = 
{
    title: "ML/AI Workflows on Linux",
    description: "Master the full Linux-native pipeline for machine learning and AI, from environment setup to data processing to GPU training and model serving.",
    content:`
<div class="module-container">

<!-- ============================================================
     HERO / RAVI HOOK
     ============================================================ -->
<div class="story-panel">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">${title}</div>
    <p>${pText}</p>
  </div>
</div>

<!-- ============================================================
     SECTION 1 — THE ML LINUX STACK
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    A production ML workflow on Linux spans five layers: the <strong>hardware &amp; kernel</strong>
    layer (GPU drivers, NUMA, huge pages), the <strong>environment</strong> layer
    (Python venvs, conda, containers), the <strong>data</strong> layer (pipelines,
    filesystem layout, streaming), the <strong>training</strong> layer (process
    management, GPU monitoring, distributed jobs), and the <strong>serving</strong>
    layer (model export, inference daemons, systemd services).
  </p>

  <!-- SVG 1 — Full ML stack diagram -->
  <div class="svg-container">
    <svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" class="ml-stack-svg" aria-label="Linux ML/AI full stack diagram">
      <defs>
        <style>
          .ml-stack-svg { font-family: 'Fira Mono', monospace; }
          @keyframes ml-rise { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
          .r1{animation:ml-rise 0.4s 0.1s both}
          .r2{animation:ml-rise 0.4s 0.3s both}
          .r3{animation:ml-rise 0.4s 0.5s both}
          .r4{animation:ml-rise 0.4s 0.7s both}
          .r5{animation:ml-rise 0.4s 0.9s both}
          @keyframes ml-pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
          .ml-gpu { animation: ml-pulse 2s infinite; }
        </style>
      </defs>
      <!-- Layer 5: Serving -->
      <rect x="20" y="14" width="720" height="60" rx="8" fill="#1a2e1a" stroke="#00b894" stroke-width="2" class="r5"/>
      <text x="40" y="38" fill="#00b894" font-size="12" font-weight="bold" class="r5">SERVING</text>
      <text x="40" y="56" fill="#55efc4" font-size="10" class="r5">FastAPI · Flask · TorchServe · Triton · ONNX Runtime · systemd service · nginx reverse proxy</text>
      <text x="700" y="40" fill="#00b894" font-size="22" text-anchor="middle" class="r5 ml-gpu">🚀</text>

      <!-- Layer 4: Training -->
      <rect x="20" y="84" width="720" height="60" rx="8" fill="#1a1a2e" stroke="#a29bfe" stroke-width="2" class="r4"/>
      <text x="40" y="108" fill="#a29bfe" font-size="12" font-weight="bold" class="r4">TRAINING</text>
      <text x="40" y="126" fill="#c7b8ff" font-size="10" class="r4">PyTorch · TensorFlow · JAX · tmux/screen · nohup · nvidia-smi · nvtop · Weights &amp; Biases · MLflow</text>
      <text x="700" y="108" fill="#a29bfe" font-size="22" text-anchor="middle" class="r4 ml-gpu">🧠</text>

      <!-- Layer 3: Data -->
      <rect x="20" y="154" width="720" height="60" rx="8" fill="#2e1a1a" stroke="#e17055" stroke-width="2" class="r3"/>
      <text x="40" y="178" fill="#e17055" font-size="12" font-weight="bold" class="r3">DATA</text>
      <text x="40" y="196" fill="#fab1a0" font-size="10" class="r3">pandas · DuckDB · Parquet · Arrow · Kafka · awk/sed/jq · find/xargs · GNU parallel · rsync</text>
      <text x="700" y="178" fill="#e17055" font-size="22" text-anchor="middle" class="r3">📊</text>

      <!-- Layer 2: Environment -->
      <rect x="20" y="224" width="720" height="60" rx="8" fill="#1a2a2e" stroke="#74b9ff" stroke-width="2" class="r2"/>
      <text x="40" y="248" fill="#74b9ff" font-size="12" font-weight="bold" class="r2">ENVIRONMENT</text>
      <text x="40" y="266" fill="#a4d4ff" font-size="10" class="r2">venv · conda · mamba · pipx · Docker · Singularity · pyproject.toml · requirements.txt</text>
      <text x="700" y="248" fill="#74b9ff" font-size="22" text-anchor="middle" class="r2">📦</text>

      <!-- Layer 1: Hardware/Kernel -->
      <rect x="20" y="294" width="720" height="60" rx="8" fill="#2e2a10" stroke="#ffeaa7" stroke-width="2" class="r1"/>
      <text x="40" y="318" fill="#ffeaa7" font-size="12" font-weight="bold" class="r1">HARDWARE / KERNEL</text>
      <text x="40" y="336" fill="#fdcb6e" font-size="10" class="r1">CUDA · cuDNN · NVIDIA driver · NUMA · huge pages · CPU affinity · perf · iostat · htop</text>
      <text x="700" y="318" fill="#ffeaa7" font-size="22" text-anchor="middle" class="r1 ml-gpu">⚡</text>

      <!-- Linux base -->
      <rect x="20" y="364" width="720" height="44" rx="8" fill="#111" stroke="#636e72" stroke-width="1" class="r1"/>
      <text x="380" y="391" fill="#636e72" font-size="11" text-anchor="middle" class="r1">Linux Kernel — VFS · cgroups · namespaces · scheduler · IOMMU · DMA · GPU passthrough</text>
    </svg>
  </div>
</div>

<!-- ============================================================
     SECTION 2 — ENVIRONMENT SETUP
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    Python's packaging ecosystem is notoriously complex. For ML/AI work three
    tools dominate: <code>venv</code> (stdlib, lightweight), <code>conda</code>
    (handles non-Python deps like CUDA, MKL), and <code>mamba</code>
    (drop-in conda replacement, 10–100× faster solver). Choose the right one
    for the job.
  </p>

  <h3>venv — Lightweight Python-only Isolation</h3>
  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>

  <h3>conda / mamba — GPU-stack Aware Environments</h3>
  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>

  <!-- SVG 2 — venv vs conda vs container decision tree -->
  <div class="svg-container">
    <svg viewBox="0 0 740 340" xmlns="http://www.w3.org/2000/svg" class="ml-env-svg" aria-label="Environment tool decision tree">
      <defs>
        <style>
          .ml-env-svg { font-family: 'Fira Mono', monospace; }
          @keyframes ml-nod { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
          .nd1{animation:ml-nod 0.4s 0.1s both}
          .nd2{animation:ml-nod 0.4s 0.4s both}
          .nd3{animation:ml-nod 0.4s 0.7s both}
          .nd4{animation:ml-nod 0.4s 1.0s both}
          .nd5{animation:ml-nod 0.4s 1.3s both}
        </style>
        <marker id="arrML" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#74b9ff"/>
        </marker>
      </defs>
      <!-- Root -->
      <rect x="270" y="10" width="200" height="44" rx="22" fill="#2d3436" stroke="#74b9ff" stroke-width="2" class="nd1"/>
      <text x="370" y="28" fill="#74b9ff" font-size="11" text-anchor="middle" class="nd1">New ML project:</text>
      <text x="370" y="44" fill="#74b9ff" font-size="11" text-anchor="middle" class="nd1">which environment?</text>

      <line x1="270" y1="54" x2="150" y2="100" stroke="#74b9ff" stroke-width="1.5" marker-end="url(#arrML)" class="nd2"/>
      <line x1="370" y1="54" x2="370" y2="100" stroke="#74b9ff" stroke-width="1.5" marker-end="url(#arrML)" class="nd2"/>
      <line x1="470" y1="54" x2="590" y2="100" stroke="#74b9ff" stroke-width="1.5" marker-end="url(#arrML)" class="nd2"/>

      <text x="150" y="90" fill="#ffeaa7" font-size="9" text-anchor="middle" class="nd2">Python-only deps?</text>
      <text x="370" y="90" fill="#ffeaa7" font-size="9" text-anchor="middle" class="nd2">Need CUDA/MKL pinned?</text>
      <text x="590" y="90" fill="#ffeaa7" font-size="9" text-anchor="middle" class="nd2">Reproducible deploy?</text>

      <!-- venv -->
      <rect x="60" y="104" width="180" height="80" rx="8" fill="#1a2a1a" stroke="#00b894" stroke-width="2" class="nd3"/>
      <text x="150" y="126" fill="#00b894" font-size="12" text-anchor="middle" font-weight="bold" class="nd3">venv</text>
      <text x="70" y="145" fill="#55efc4" font-size="9" class="nd3">• stdlib, no install</text>
      <text x="70" y="159" fill="#55efc4" font-size="9" class="nd3">• Python packages only</text>
      <text x="70" y="173" fill="#55efc4" font-size="9" class="nd3">• Fast, minimal overhead</text>

      <!-- conda/mamba -->
      <rect x="280" y="104" width="180" height="80" rx="8" fill="#1a1a2e" stroke="#a29bfe" stroke-width="2" class="nd4"/>
      <text x="370" y="126" fill="#a29bfe" font-size="12" text-anchor="middle" font-weight="bold" class="nd4">conda / mamba</text>
      <text x="290" y="145" fill="#c7b8ff" font-size="9" class="nd4">• CUDA, cuDNN, MKL</text>
      <text x="290" y="159" fill="#c7b8ff" font-size="9" class="nd4">• Cross-language deps</text>
      <text x="290" y="173" fill="#c7b8ff" font-size="9" class="nd4">• environment.yml export</text>

      <!-- Docker/Singularity -->
      <rect x="500" y="104" width="200" height="80" rx="8" fill="#2e1a1a" stroke="#e17055" stroke-width="2" class="nd5"/>
      <text x="600" y="126" fill="#e17055" font-size="12" text-anchor="middle" font-weight="bold" class="nd5">Docker / Singularity</text>
      <text x="510" y="145" fill="#fab1a0" font-size="9" class="nd5">• Full OS-level isolation</text>
      <text x="510" y="159" fill="#fab1a0" font-size="9" class="nd5">• HPC: Singularity/Apptainer</text>
      <text x="510" y="173" fill="#fab1a0" font-size="9" class="nd5">• Production deploy standard</text>

      <!-- Bottom guidance -->
      <rect x="20" y="210" width="700" height="112" rx="8" fill="#111" stroke="#444" stroke-width="1" class="nd5"/>
      <text x="40" y="232" fill="#74b9ff" font-size="10" font-weight="bold">Quick rules of thumb:</text>
      <text x="40" y="252" fill="#a0a0a0" font-size="10">• Local experimentation / notebook work         → venv (fast, disposable)</text>
      <text x="40" y="270" fill="#a0a0a0" font-size="10">• GPU training with CUDA version sensitivity    → conda/mamba (pin the full CUDA stack)</text>
      <text x="40" y="288" fill="#a0a0a0" font-size="10">• CI/CD, cloud training, production inference   → Docker image (identical everywhere)</text>
      <text x="40" y="306" fill="#a0a0a0" font-size="10">• HPC cluster / SLURM jobs                     → Singularity/Apptainer (no root needed)</text>
    </svg>
  </div>
</div>

<!-- ============================================================
     SECTION 3 — DATA PIPELINE ON LINUX
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    Before a model trains, data must be ingested, cleaned, and formatted.
    Linux command-line tools are often 10–100× faster than Python for
    large flat-file operations because they avoid interpreter overhead
    and work directly with kernel I/O.
  </p>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 4 — GPU MANAGEMENT
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    GPU monitoring is as fundamental to ML engineering as <code>top</code> is to
    CPU work. <code>nvidia-smi</code> is the canonical tool; <code>nvtop</code>
    provides a real-time interactive view analogous to <code>htop</code>.
  </p>

  <!-- SVG 3 — GPU anatomy and monitoring metrics -->
  <div class="svg-container">
    <svg viewBox="0 0 760 360" xmlns="http://www.w3.org/2000/svg" class="ml-gpu-svg" aria-label="GPU monitoring metrics anatomy">
      <defs>
        <style>
          .ml-gpu-svg { font-family: 'Fira Mono', monospace; }
          @keyframes ml-bar-grow { from{width:0} to{width:var(--bw)} }
          .bar-g { animation: ml-bar-grow 1.2s 0.6s both ease-out; }
          @keyframes ml-gfade { from{opacity:0} to{opacity:1} }
          .gf1{animation:ml-gfade 0.5s 0.2s both}
          .gf2{animation:ml-gfade 0.5s 0.5s both}
          .gf3{animation:ml-gfade 0.5s 0.8s both}
          .gf4{animation:ml-gfade 0.5s 1.1s both}
          .gf5{animation:ml-gfade 0.5s 1.4s both}
        </style>
      </defs>
      <rect x="10" y="10" width="740" height="340" rx="10" fill="#0d0d1a" stroke="#76b900" stroke-width="2"/>
      <text x="380" y="36" fill="#76b900" font-size="13" text-anchor="middle" font-weight="bold">nvidia-smi — GPU Metrics at a Glance</text>

      <!-- GPU utilization bar -->
      <text x="30" y="66" fill="#a0a0a0" font-size="10" class="gf1">GPU Util</text>
      <rect x="110" y="52" width="560" height="18" rx="4" fill="#1a1a2e" class="gf1"/>
      <rect x="110" y="52" style="--bw:476px" height="18" rx="4" fill="#a29bfe" class="bar-g gf1"/>
      <text x="680" y="66" fill="#a29bfe" font-size="10" class="gf1">85%</text>

      <!-- Memory bar -->
      <text x="30" y="96" fill="#a0a0a0" font-size="10" class="gf2">VRAM Used</text>
      <rect x="110" y="82" width="560" height="18" rx="4" fill="#1a1a2e" class="gf2"/>
      <rect x="110" y="82" style="--bw:392px" height="18" rx="4" fill="#e17055" class="bar-g gf2"/>
      <text x="680" y="96" fill="#e17055" font-size="10" class="gf2">22G/24G</text>

      <!-- Temp bar -->
      <text x="30" y="126" fill="#a0a0a0" font-size="10" class="gf3">Temp</text>
      <rect x="110" y="112" width="560" height="18" rx="4" fill="#1a1a2e" class="gf3"/>
      <rect x="110" y="112" style="--bw:308px" height="18" rx="4" fill="#fdcb6e" class="bar-g gf3"/>
      <text x="680" y="126" fill="#fdcb6e" font-size="10" class="gf3">72°C</text>

      <!-- Power bar -->
      <text x="30" y="156" fill="#a0a0a0" font-size="10" class="gf4">Power</text>
      <rect x="110" y="142" width="560" height="18" rx="4" fill="#1a1a2e" class="gf4"/>
      <rect x="110" y="142" style="--bw:420px" height="18" rx="4" fill="#00b894" class="bar-g gf4"/>
      <text x="680" y="156" fill="#00b894" font-size="10" class="gf4">300W/400W</text>

      <!-- SM Clock bar -->
      <text x="30" y="186" fill="#a0a0a0" font-size="10" class="gf5">SM Clock</text>
      <rect x="110" y="172" width="560" height="18" rx="4" fill="#1a1a2e" class="gf5"/>
      <rect x="110" y="172" style="--bw:504px" height="18" rx="4" fill="#74b9ff" class="bar-g gf5"/>
      <text x="680" y="186" fill="#74b9ff" font-size="10" class="gf5">1785 MHz</text>

      <!-- Process table -->
      <line x1="20" y1="202" x2="740" y2="202" stroke="#333" stroke-width="1" class="gf5"/>
      <text x="30" y="222" fill="#ffeaa7" font-size="10" font-weight="bold" class="gf5">Processes on GPU:</text>
      <text x="30" y="240" fill="#636e72" font-size="9" class="gf5">PID       NAME                    VRAM</text>
      <text x="30" y="256" fill="#a0a0a0" font-size="9" class="gf5">12847     python3 train.py        18432 MiB</text>
      <text x="30" y="272" fill="#a0a0a0" font-size="9" class="gf5">12901     python3 eval.py          3584 MiB</text>
      <line x1="20" y1="282" x2="740" y2="282" stroke="#333" stroke-width="1" class="gf5"/>
      <text x="30" y="302" fill="#636e72" font-size="9" class="gf5">nvidia-smi dmon -s u       ← stream utilisation every second</text>
      <text x="30" y="318" fill="#636e72" font-size="9" class="gf5">nvidia-smi --query-gpu=name,memory.used,utilization.gpu --format=csv,noheader</text>
      <text x="30" y="334" fill="#636e72" font-size="9" class="gf5">watch -n 1 nvidia-smi     ← refresh dashboard every second</text>
    </svg>
  </div>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 5 — LONG-RUNNING TRAINING JOBS
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    Model training can run for hours or days. SSH disconnects kill foreground
    processes. The Linux toolkit for persistent processes includes
    <code>tmux</code>, <code>screen</code>, <code>nohup</code>, and
    <code>systemd</code> user services.
  </p>

  <!-- SVG 4 — tmux session layout for ML training -->
  <div class="svg-container">
    <svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" class="ml-tmux-svg" aria-label="tmux session layout for ML training">
      <defs>
        <style>
          .ml-tmux-svg { font-family: 'Fira Mono', monospace; }
          @keyframes ml-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
          .tmux-cursor { animation: ml-cursor 1s infinite; }
          @keyframes ml-slide2 { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
          .ts1{animation:ml-slide2 0.4s 0.2s both}
          .ts2{animation:ml-slide2 0.4s 0.5s both}
          .ts3{animation:ml-slide2 0.4s 0.8s both}
          .ts4{animation:ml-slide2 0.4s 1.1s both}
        </style>
      </defs>
      <!-- Terminal outer frame -->
      <rect x="10" y="10" width="740" height="300" rx="8" fill="#1a1a1a" stroke="#555" stroke-width="2"/>
      <!-- tmux status bar -->
      <rect x="10" y="280" width="740" height="30" rx="0" fill="#333"/>
      <rect x="10" y="280" width="740" height="30" rx="0" fill="#2d2d2d"/>
      <text x="20" y="300" fill="#00b894" font-size="10">[0] 0:train* 1:monitor 2:logs 3:shell</text>
      <text x="600" y="300" fill="#636e72" font-size="10">ravi@gpu-server  12:34</text>
      <!-- Pane 1: training log (left) -->
      <rect x="10" y="10" width="380" height="270" rx="0" fill="#0d1117"/>
      <text x="20" y="30" fill="#636e72" font-size="9" class="ts1">$ python3 train.py --epochs 100 --batch 256</text>
      <text x="20" y="48" fill="#a29bfe" font-size="9" class="ts1">Epoch  1/100  loss=0.8821  acc=0.612</text>
      <text x="20" y="62" fill="#a29bfe" font-size="9" class="ts2">Epoch  2/100  loss=0.7104  acc=0.681</text>
      <text x="20" y="76" fill="#a29bfe" font-size="9" class="ts2">Epoch  3/100  loss=0.6023  acc=0.724</text>
      <text x="20" y="90" fill="#a29bfe" font-size="9" class="ts3">Epoch  4/100  loss=0.5411  acc=0.751</text>
      <text x="20" y="104" fill="#55efc4" font-size="9" class="ts3">Epoch  5/100  loss=0.4892  acc=0.773  ← best</text>
      <text x="20" y="118" fill="#a0a0a0" font-size="9" class="ts4">...</text>
      <text x="20" y="132" fill="#a29bfe" font-size="9" class="ts4">Epoch 47/100  loss=0.2104  acc=0.912</text>
      <text x="20" y="152" fill="#ffeaa7" font-size="9" class="ts4">ETA: 1h 23m remaining</text>
      <text x="20" y="170" fill="#00b894" font-size="9" class="ts4">█<tspan class="tmux-cursor">_</tspan></text>
      <!-- Divider -->
      <line x1="390" y1="10" x2="390" y2="280" stroke="#444" stroke-width="2"/>
      <!-- Pane 2: nvidia-smi (top right) -->
      <rect x="392" y="10" width="358" height="135" rx="0" fill="#0d1117"/>
      <text x="402" y="28" fill="#76b900" font-size="9" class="ts1">$ watch -n2 nvidia-smi</text>
      <text x="402" y="44" fill="#a0a0a0" font-size="8" class="ts2">GPU 0: A100-SXM4-80GB</text>
      <text x="402" y="58" fill="#74b9ff" font-size="8" class="ts2">Util: 94% | Mem: 58G/80G</text>
      <text x="402" y="72" fill="#fdcb6e" font-size="8" class="ts3">Temp: 68°C | Pwr: 312W</text>
      <text x="402" y="86" fill="#a0a0a0" font-size="8" class="ts3">PID 12847: train.py 55G</text>
      <!-- Divider horizontal -->
      <line x1="392" y1="145" x2="750" y2="145" stroke="#444" stroke-width="2"/>
      <!-- Pane 3: htop (bottom right) -->
      <rect x="392" y="147" width="358" height="133" rx="0" fill="#0d1117"/>
      <text x="402" y="165" fill="#636e72" font-size="9" class="ts2">$ htop --sort-key PERCENT_CPU</text>
      <text x="402" y="181" fill="#55efc4" font-size="8" class="ts3">CPU: ████████████░░ 78%</text>
      <text x="402" y="195" fill="#74b9ff" font-size="8" class="ts3">MEM: ██████░░░░░░░░ 44G/128G</text>
      <text x="402" y="209" fill="#a0a0a0" font-size="8" class="ts4">Load: 31.2 / 30.8 / 28.4</text>
      <text x="402" y="225" fill="#a0a0a0" font-size="8" class="ts4">PID 12847  python3  CPU:620%</text>
    </svg>
  </div>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 6 — KERNEL DEEP DIVE
     ============================================================ -->
<div class="section-block">
  <div class="info-block">
  <div class="info-title">${title}</div>

    <h3>CUDA Memory &amp; DMA</h3>
    <p>
      When PyTorch allocates a GPU tensor, the path is:
      <code>torch.Tensor</code> → <code>CUDAAllocator</code> → CUDA runtime
      → NVIDIA kernel driver → <code>nvmap</code> (or GEM) → IOMMU →
      GPU BAR (Base Address Register) mapped into the PCIe address space.
      The CPU sees GPU memory through the PCIe BAR exposed under
      <code>/proc/iomem</code>. DMA transfers use <code>dma_alloc_coherent()</code>
      to pin host pages so the GPU can access them without TLB shootdowns.
    </p>

    <h3>NUMA Awareness for Multi-GPU Training</h3>
    <pre class="console-pre" style="background:#0d0d0d;">
<span class="cb-cmt"># Check NUMA topology of GPUs</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">nvidia-smi</span> <span class="cb-flag">topo -m</span>
<span class="cb-out">        GPU0    GPU1    GPU2    GPU3    NIC0    CPU Affinity    NUMA Affinity
GPU0     X      NV12    SYS     SYS     SYS     0-23            0
GPU1    NV12     X      SYS     SYS     SYS     0-23            0
GPU2    SYS     SYS      X      NV12    PHB     24-47           1
GPU3    SYS     SYS     NV12     X      PHB     24-47           1
</span>
<span class="cb-cmt"># Pin training process to NUMA node 0 (GPUs 0,1)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">numactl</span> <span class="cb-flag">--cpunodebind=0 --membind=0</span> <span class="cb-str">python3 train.py</span>
<span class="cb-cmt"># This avoids cross-NUMA memory bandwidth penalty (can be 50% slower)</span></pre>

    <h3>Huge Pages — Reducing TLB Pressure for Large Tensors</h3>
    <pre class="console-pre" style="background:#0d0d0d;">
<span class="cb-cmt"># Check huge page status</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> <span class="cb-str">/proc/meminfo</span> <span class="cb-flag">|</span> <span class="cb-cmd">grep</span> <span class="cb-str">Huge</span>
<span class="cb-out">AnonHugePages:   4194304 kB   ← transparent huge pages auto-allocated
HugePages_Total:    1024
HugePages_Free:      512
Hugepagesize:       2048 kB
</span>
<span class="cb-cmt"># Enable transparent huge pages for ML workloads</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo always</span> <span class="cb-flag">|</span> <span class="cb-cmd">sudo tee</span> <span class="cb-str">/sys/kernel/mm/transparent_hugepage/enabled</span>

<span class="cb-cmt"># Pre-allocate 1024 x 2MB huge pages for PyTorch DataLoader workers</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">echo 1024</span> <span class="cb-flag">|</span> <span class="cb-cmd">sudo tee</span> <span class="cb-str">/proc/sys/vm/nr_hugepages</span></pre>

    <h3>CPU Scheduling — Pinning DataLoader Workers</h3>
    <pre class="console-pre" style="background:#0d0d0d;">
<span class="cb-cmt"># Set CPU affinity for the main training process</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">taskset</span> <span class="cb-flag">-cp</span> <span class="cb-str">0-15</span> <span class="cb-str">12847</span>
<span class="cb-cmt"># Pin to physical cores only (avoid hyperthreading interference)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">numactl</span> <span class="cb-flag">--physcpubind=0-15</span> <span class="cb-str">python3 train.py --num-workers 8</span></pre>
  </div>
</div>

<!-- ============================================================
     SECTION 7 — EXPERIMENT TRACKING
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <p>
    MLflow is the de-facto open-source experiment tracker. On Linux it runs
    as a local server or remotely, backed by a Postgres/SQLite metadata store
    and a filesystem/S3/GCS artifact store.
  </p>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 8 — MODEL EXPORT & SERVING
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>

  <!-- SVG 5 — Model export and serving pipeline -->
  <div class="svg-container">
    <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" class="ml-serve-svg" aria-label="Model export and serving pipeline">
      <defs>
        <style>
          .ml-serve-svg { font-family: 'Fira Mono', monospace; }
          @keyframes ml-flow2 { from{stroke-dashoffset:400} to{stroke-dashoffset:0} }
          .flow2 { stroke-dasharray:400; animation: ml-flow2 1.8s linear forwards; }
          @keyframes ml-pop { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
          .p1{animation:ml-pop 0.4s 0.2s both}
          .p2{animation:ml-pop 0.4s 0.5s both}
          .p3{animation:ml-pop 0.4s 0.8s both}
          .p4{animation:ml-pop 0.4s 1.1s both}
          .p5{animation:ml-pop 0.4s 1.4s both}
        </style>
        <marker id="arrSrv" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#00b894"/>
        </marker>
      </defs>

      <!-- Stage 1: PyTorch model -->
      <rect x="10" y="90" width="120" height="70" rx="8" fill="#1a1a2e" stroke="#a29bfe" stroke-width="2" class="p1"/>
      <text x="70" y="116" fill="#a29bfe" font-size="10" text-anchor="middle" class="p1">PyTorch</text>
      <text x="70" y="132" fill="#a29bfe" font-size="10" text-anchor="middle" class="p1">model.pt</text>
      <text x="70" y="148" fill="#636e72" font-size="8" text-anchor="middle" class="p1">training</text>

      <!-- arrow -->
      <line x1="130" y1="125" x2="168" y2="125" stroke="#00b894" stroke-width="2" marker-end="url(#arrSrv)" class="flow2"/>
      <text x="149" y="118" fill="#ffeaa7" font-size="8" text-anchor="middle">torch.onnx</text>
      <text x="149" y="128" fill="#ffeaa7" font-size="8" text-anchor="middle">.export()</text>

      <!-- Stage 2: ONNX -->
      <rect x="170" y="90" width="110" height="70" rx="8" fill="#1a2a1a" stroke="#00b894" stroke-width="2" class="p2"/>
      <text x="225" y="116" fill="#00b894" font-size="10" text-anchor="middle" class="p2">ONNX</text>
      <text x="225" y="132" fill="#00b894" font-size="10" text-anchor="middle" class="p2">model.onnx</text>
      <text x="225" y="148" fill="#636e72" font-size="8" text-anchor="middle" class="p2">portable</text>

      <!-- arrow -->
      <line x1="280" y1="125" x2="318" y2="125" stroke="#00b894" stroke-width="2" marker-end="url(#arrSrv)" class="flow2"/>
      <text x="299" y="118" fill="#ffeaa7" font-size="8" text-anchor="middle">onnxruntime</text>
      <text x="299" y="128" fill="#ffeaa7" font-size="8" text-anchor="middle">/ TensorRT</text>

      <!-- Stage 3: Optimised -->
      <rect x="320" y="90" width="120" height="70" rx="8" fill="#2e1a1a" stroke="#e17055" stroke-width="2" class="p3"/>
      <text x="380" y="112" fill="#e17055" font-size="10" text-anchor="middle" class="p3">Optimised</text>
      <text x="380" y="128" fill="#e17055" font-size="10" text-anchor="middle" class="p3">TensorRT</text>
      <text x="380" y="144" fill="#e17055" font-size="10" text-anchor="middle" class="p3">engine.trt</text>

      <!-- arrow -->
      <line x1="440" y1="125" x2="478" y2="125" stroke="#00b894" stroke-width="2" marker-end="url(#arrSrv)" class="flow2"/>
      <text x="459" y="118" fill="#ffeaa7" font-size="8" text-anchor="middle">Triton /</text>
      <text x="459" y="128" fill="#ffeaa7" font-size="8" text-anchor="middle">TorchServe</text>

      <!-- Stage 4: Inference server -->
      <rect x="480" y="70" width="130" height="110" rx="8" fill="#1a2e2e" stroke="#74b9ff" stroke-width="2" class="p4"/>
      <text x="545" y="96" fill="#74b9ff" font-size="10" text-anchor="middle" class="p4">Inference</text>
      <text x="545" y="112" fill="#74b9ff" font-size="10" text-anchor="middle" class="p4">Server</text>
      <text x="490" y="132" fill="#a4d4ff" font-size="8" class="p4">• Triton</text>
      <text x="490" y="146" fill="#a4d4ff" font-size="8" class="p4">• TorchServe</text>
      <text x="490" y="160" fill="#a4d4ff" font-size="8" class="p4">• FastAPI/uvicorn</text>

      <!-- arrow -->
      <line x1="610" y1="125" x2="648" y2="125" stroke="#00b894" stroke-width="2" marker-end="url(#arrSrv)" class="flow2"/>

      <!-- Stage 5: Client -->
      <rect x="650" y="90" width="100" height="70" rx="8" fill="#2e2e10" stroke="#ffeaa7" stroke-width="2" class="p5"/>
      <text x="700" y="116" fill="#ffeaa7" font-size="10" text-anchor="middle" class="p5">REST /</text>
      <text x="700" y="132" fill="#ffeaa7" font-size="10" text-anchor="middle" class="p5">gRPC</text>
      <text x="700" y="148" fill="#636e72" font-size="8" text-anchor="middle" class="p5">clients</text>

      <!-- Bottom notes -->
      <text x="70" y="200" fill="#636e72" font-size="9" text-anchor="middle" class="p5">sklearn→joblib</text>
      <text x="225" y="200" fill="#636e72" font-size="9" text-anchor="middle" class="p5">onnx-simplifier</text>
      <text x="380" y="200" fill="#636e72" font-size="9" text-anchor="middle" class="p5">INT8 quantize</text>
      <text x="545" y="200" fill="#636e72" font-size="9" text-anchor="middle" class="p5">batching + warmup</text>
      <text x="700" y="200" fill="#636e72" font-size="9" text-anchor="middle" class="p5">nginx TLS</text>

      <!-- sklearn alternative path -->
      <text x="380" y="240" fill="#636e72" font-size="9" text-anchor="middle">sklearn alternative: joblib.dump(model, 'model.pkl') → FastAPI + joblib.load()</text>
      <text x="380" y="258" fill="#636e72" font-size="9" text-anchor="middle">HuggingFace: model.save_pretrained('./hf_model/') → pipeline() inference</text>
    </svg>
  </div>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 9 — FILESYSTEM LAYOUT & BEST PRACTICES
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>

  <!-- SVG 6 — Recommended ML project directory tree -->
  <div class="svg-container">
    <svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" class="ml-tree-svg" aria-label="Recommended ML project filesystem layout">
      <defs>
        <style>
          .ml-tree-svg { font-family: 'Fira Mono', monospace; }
          @keyframes ml-treeIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
          .ti { animation: ml-treeIn 0.5s calc(var(--d)*0.06s) both; }
        </style>
      </defs>
      <rect x="10" y="10" width="740" height="360" rx="10" fill="#0d1117" stroke="#333" stroke-width="1.5"/>
      <text x="380" y="34" fill="#74b9ff" font-size="12" text-anchor="middle" font-weight="bold">Recommended ML Project Layout</text>

      <!-- tree lines -->
      <text x="30" y="58" fill="#00b894" font-size="11" style="--d:1" class="ti">churn_project/</text>

      <text x="50" y="78" fill="#636e72" font-size="10" style="--d:2" class="ti">├── data/</text>
      <text x="70" y="94" fill="#a0a0a0" font-size="10" style="--d:3" class="ti">│   ├── raw/          ← original immutable data, never edited</text>
      <text x="70" y="110" fill="#a0a0a0" font-size="10" style="--d:4" class="ti">│   ├── processed/    ← cleaned, feature-engineered Parquet files</text>
      <text x="70" y="126" fill="#a0a0a0" font-size="10" style="--d:5" class="ti">│   └── splits/       ← train/val/test splits</text>

      <text x="50" y="146" fill="#636e72" font-size="10" style="--d:6" class="ti">├── notebooks/        ← exploratory analysis (not production code)</text>

      <text x="50" y="166" fill="#636e72" font-size="10" style="--d:7" class="ti">├── src/</text>
      <text x="70" y="182" fill="#a0a0a0" font-size="10" style="--d:8" class="ti">│   ├── data/         ← dataset classes, loaders, transforms</text>
      <text x="70" y="198" fill="#a0a0a0" font-size="10" style="--d:9" class="ti">│   ├── models/       ← model architecture definitions</text>
      <text x="70" y="214" fill="#a0a0a0" font-size="10" style="--d:10" class="ti">│   ├── training/     ← train.py, loss.py, optimizer configs</text>
      <text x="70" y="230" fill="#a0a0a0" font-size="10" style="--d:11" class="ti">│   └── serving/      ← app.py, schemas, inference utils</text>

      <text x="50" y="250" fill="#636e72" font-size="10" style="--d:12" class="ti">├── models/           ← saved model checkpoints &amp; exports</text>
      <text x="70" y="266" fill="#a0a0a0" font-size="10" style="--d:13" class="ti">│   ├── checkpoints/  ← epoch_*.pt (keep last 3, delete rest)</text>
      <text x="70" y="282" fill="#a0a0a0" font-size="10" style="--d:14" class="ti">│   ├── onnx/</text>
      <text x="70" y="298" fill="#a0a0a0" font-size="10" style="--d:15" class="ti">│   └── production/   ← symlink to current best model</text>

      <text x="50" y="318" fill="#636e72" font-size="10" style="--d:16" class="ti">├── configs/          ← YAML/TOML hyperparameter configs</text>
      <text x="50" y="334" fill="#636e72" font-size="10" style="--d:17" class="ti">├── tests/            ← unit tests for data/model/serving</text>
      <text x="50" y="350" fill="#636e72" font-size="10" style="--d:18" class="ti">├── Makefile          ← make train / make eval / make serve</text>
      <text x="50" y="366" fill="#636e72" font-size="10" style="--d:19" class="ti">└── environment.yml / requirements.txt</text>
    </svg>
  </div>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 10 — PERFORMANCE PROFILING
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <table class="diff-table">
    <thead><tr><th>Bottleneck</th><th>Symptom</th><th>Tool</th><th>Fix</th></tr></thead>
    <tbody>
      <tr><td>GPU underutilisation</td><td>GPU util &lt; 50%</td><td><code>nvidia-smi dmon</code></td><td>Increase batch size; pin DataLoader workers to CPU cores</td></tr>
      <tr><td>CPU DataLoader bottleneck</td><td>GPU waits between batches</td><td><code>py-spy top</code></td><td>Increase <code>num_workers</code>; use Parquet over CSV; prefetch</td></tr>
      <tr><td>Disk I/O bottleneck</td><td>Low GPU, high iowait</td><td><code>iostat -x 1</code></td><td>Move data to NVMe/SSD; use memory-mapped files; cache to RAM</td></tr>
      <tr><td>VRAM OOM crash</td><td><code>CUDA out of memory</code></td><td><code>nvidia-smi</code></td><td>Reduce batch; gradient checkpointing; mixed precision (FP16)</td></tr>
      <tr><td>Cross-NUMA penalty</td><td>High latency, low bandwidth</td><td><code>numastat</code></td><td><code>numactl --cpunodebind</code> to pin to local NUMA node</td></tr>
      <tr><td>Python GIL contention</td><td>CPUs pegged, no throughput</td><td><code>py-spy</code></td><td>Use <code>multiprocessing</code> not threads; move hot loops to C/Cython</td></tr>
      <tr><td>Slow model save/load</td><td>Long checkpoint pauses</td><td><code>strace -e write</code></td><td>Save to NVMe; use async checkpointing; save only state_dict</td></tr>
    </tbody>
  </table>

  <div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console ${i++} of ${max} — ${title}</span></div>
<div class="console-body"><pre>${cbody}</pre></div></div>
</div>

<!-- ============================================================
     SECTION 11 — DIFFERENTIATOR TABLE
     ============================================================ -->
<div class="section-block">
  <h2 class="section-title"><span class="sec-num">${padding}</span> ${title}</h2>
  <table class="diff-table">
    <thead><tr><th>Task</th><th>Command</th></tr></thead>
    <tbody>
      <tr><td>Create ML venv</td><td><code>python3 -m venv ~/.venvs/mymodel &amp;&amp; source ~/.venvs/mymodel/bin/activate</code></td></tr>
      <tr><td>Pin conda CUDA env</td><td><code>mamba create -n ml python=3.11 cudatoolkit=12.1</code></td></tr>
      <tr><td>GPU dashboard</td><td><code>watch -n1 nvidia-smi</code></td></tr>
      <tr><td>Stream GPU metrics</td><td><code>nvidia-smi dmon -s ugmt -d 1</code></td></tr>
      <tr><td>Select GPUs for job</td><td><code>CUDA_VISIBLE_DEVICES=0,1 python3 train.py</code></td></tr>
      <tr><td>Persistent training session</td><td><code>tmux new -s train</code> then <code>Ctrl-b d</code> to detach</td></tr>
      <tr><td>Background training with log</td><td><code>nohup python3 train.py &gt; train.log 2&gt;&amp;1 &amp;</code></td></tr>
      <tr><td>Parallel preprocessing</td><td><code>ls *.csv | parallel -j8 'python3 prep.py {}'</code></td></tr>
      <tr><td>Fast CSV stats</td><td><code>awk -F, 'NR&gt;1{sum+=$2;n++}END{print sum/n}' data.csv</code></td></tr>
      <tr><td>Query Parquet (no server)</td><td><code>python3 -c "import duckdb; duckdb.sql('SELECT ... FROM read_parquet(...)')"</code></td></tr>
      <tr><td>Export model to ONNX</td><td><code>torch.onnx.export(model, dummy, 'model.onnx')</code></td></tr>
      <tr><td>Serve model (FastAPI)</td><td><code>uvicorn app:app --host 0.0.0.0 --port 8000 --workers 4</code></td></tr>
      <tr><td>NUMA-aware training</td><td><code>numactl --cpunodebind=0 --membind=0 python3 train.py</code></td></tr>
      <tr><td>Disk I/O bottleneck check</td><td><code>iostat -xz 1</code></td></tr>
      <tr><td>Python CPU profiling (live)</td><td><code>py-spy top --pid &lt;PID&gt;</code></td></tr>
      <tr><td>Delete old checkpoints</td><td><code>ls -t epoch_*.pt | tail -n +4 | xargs rm -f</code></td></tr>
    </tbody>
  </table>
</div>

<!-- ============================================================
     RAVI WRAP-UP
     ============================================================ -->
<div class="ravi-story-box" style="margin-top:28px;">
  <div class="ravi-avatar">👨‍💻</div>
  <div class="ravi-bubble">
    <strong>Ravi's reflection:</strong> Six hours later, the churn model is training
    inside a tmux session, nvidia-smi showing 94% GPU utilization, MLflow tracking
    every epoch, and a FastAPI server already serving predictions on GPU 1.
    "The GUI tools hide all of this," Ravi messages his team lead. "On Linux
    you see the whole machine — the scheduler, the NUMA topology, the PCIe bus.
    Once you own the infrastructure, you own the model."
  </div>
</div>

<!-- ============================================================
     EXERCISES
     ============================================================ -->
<div class="section-card exercises-section">
  <h2>🎯 Exercises</h2>

  <div class="exercise-panel easy">
    <div class="exercise-header">Exercise 1 — Easy</div>
    <div class="exercise-body">
      <p>Create a Python virtual environment named <code>ml_lab</code> inside
      <code>~/.venvs/</code>, activate it, install <code>scikit-learn pandas pyarrow</code>,
      freeze the installed packages to <code>requirements.txt</code>, then deactivate.
      Verify the venv is isolated by confirming <code>sklearn</code> is not importable
      outside the venv.</p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-prompt">$</span> <span class="cb-cmd">python3</span> <span class="cb-flag">-m venv</span> <span class="cb-str">~/.venvs/ml_lab</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">source</span> <span class="cb-str">~/.venvs/ml_lab/bin/activate</span>
<span class="cb-prompt">(ml_lab) $</span> <span class="cb-cmd">pip install</span> <span class="cb-str">scikit-learn pandas pyarrow</span>
<span class="cb-prompt">(ml_lab) $</span> <span class="cb-cmd">pip freeze</span> <span class="cb-flag">&gt;</span> <span class="cb-str">requirements.txt</span>
<span class="cb-prompt">(ml_lab) $</span> <span class="cb-cmd">deactivate</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">python3</span> <span class="cb-flag">-c</span> <span class="cb-str">"import sklearn"</span>
<span class="cb-out">ModuleNotFoundError: No module named 'sklearn'  ← isolated correctly</span></pre>
      </details>
    </div>
  </div>

  <div class="exercise-panel easy">
    <div class="exercise-header">Exercise 2 — Easy</div>
    <div class="exercise-body">
      <p>Given a CSV file <code>sales.csv</code> with columns
      <code>date,product,amount,category</code> and 5 million rows, use only
      <code>awk</code> and shell tools (no Python) to:
      find the total <code>amount</code> per <code>category</code>, and print
      the result sorted by total descending.</p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-prompt">$</span> <span class="cb-cmd">awk</span> <span class="cb-flag">-F,</span> <span class="cb-str">'NR>1 {sum[$4]+=$3} END {for(c in sum) print sum[c], c}'</span> <span class="cb-str">sales.csv</span> <span class="cb-flag">|</span> <span class="cb-cmd">sort</span> <span class="cb-flag">-rn</span>
<span class="cb-out">4821044.50 Electronics
2103882.00 Clothing
 891234.75 Books
</span></pre>
      </details>
    </div>
  </div>

  <div class="exercise-panel medium">
    <div class="exercise-header">Exercise 3 — Medium</div>
    <div class="exercise-body">
      <p>You have a directory <code>images/</code> containing 20,000 PNG files.
      Write a one-liner using <code>find</code> and <code>GNU parallel</code>
      that converts every PNG to a 224×224 JPEG using <code>convert</code>
      (ImageMagick), saving outputs to <code>images_resized/</code>, using all
      available CPU cores, and prints a progress bar.</p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-prompt">$</span> <span class="cb-cmd">mkdir</span> <span class="cb-flag">-p</span> <span class="cb-str">images_resized</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">find</span> <span class="cb-str">images/</span> <span class="cb-flag">-name</span> <span class="cb-str">'*.png'</span> <span class="cb-flag">|</span> \
  <span class="cb-cmd">parallel</span> <span class="cb-flag">--progress</span> \
  <span class="cb-str">'convert {} -resize 224x224^ -gravity Center -extent 224x224 images_resized/{/.}.jpg'</span></pre>
      </details>
    </div>
  </div>

  <div class="exercise-panel medium">
    <div class="exercise-header">Exercise 4 — Medium</div>
    <div class="exercise-body">
      <p>Create a <code>systemd</code> user service that runs
      <code>python3 /home/ravi/serve/app.py</code> at boot, restarts it on
      failure with a 10-second delay, sets <code>CUDA_VISIBLE_DEVICES=0</code>,
      and logs to the journal. Enable and start it, then confirm it is running
      with <code>systemctl --user status</code>.</p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-prompt">$</span> <span class="cb-cmd">mkdir</span> <span class="cb-flag">-p</span> <span class="cb-str">~/.config/systemd/user</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> <span class="cb-flag">&gt;</span> <span class="cb-str">~/.config/systemd/user/ml-serve.service</span> <span class="cb-str">&lt;&lt;EOF</span>
<span class="cb-out">[Unit]
Description=ML Model Serving
After=network.target

[Service]
ExecStart=/usr/bin/python3 /home/ravi/serve/app.py
Restart=on-failure
RestartSec=10
Environment=CUDA_VISIBLE_DEVICES=0
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=default.target
EOF</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">systemctl</span> <span class="cb-flag">--user daemon-reload</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">systemctl</span> <span class="cb-flag">--user enable --now</span> <span class="cb-str">ml-serve</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">systemctl</span> <span class="cb-flag">--user status</span> <span class="cb-str">ml-serve</span></pre>
      </details>
    </div>
  </div>

  <div class="exercise-panel hard">
    <div class="exercise-header">Exercise 5 — Hard</div>
    <div class="exercise-body">
      <p>Write a shell script <code>gpu_monitor.sh</code> that:
      <br>1. Runs continuously, sampling GPU utilisation and VRAM every 5 seconds
      <br>2. Appends a timestamped CSV row to <code>gpu_log.csv</code>
      <br>3. Sends an alert message to <code>~/alerts.log</code> if GPU temp exceeds 80°C
      <br>4. Automatically kills the highest VRAM process if VRAM usage exceeds 95%
      <br>5. Exits cleanly on Ctrl-C (trap SIGINT)
      <br>Use only <code>nvidia-smi</code>, <code>awk</code>, <code>date</code>, and standard bash.</p>
      <details>
        <summary>Solution</summary>
        <pre class="console-pre">
<span class="cb-cmt">#!/bin/bash  — gpu_monitor.sh</span>
<span class="cb-out">LOGFILE="gpu_log.csv"
ALERTFILE="\${HOME}/alerts.log"
TEMP_THRESH=80
VRAM_THRESH=95

echo "timestamp,gpu_util,vram_used_mb,vram_total_mb,temp_c,power_w" > "\${LOGFILE}"

cleanup() { echo "Monitor stopped."; exit 0; }
trap cleanup INT TERM

while true; do
  TS=$(date '+%Y-%m-%dT%H:%M:%S')

  # Read all metrics in one call
  METRICS=$(nvidia-smi --query-gpu=utilization.gpu,memory.used,memory.total,temperature.gpu,power.draw \
    --format=csv,noheader,nounits | head -1)

  UTIL=$(echo "\${METRICS}"  | awk -F, '{gsub(/ /,"",$1); print $1}')
  VMEM=$(echo "\${METRICS}"  | awk -F, '{gsub(/ /,"",$2); print $2}')
  VTOT=$(echo "\${METRICS}"  | awk -F, '{gsub(/ /,"",$3); print $3}')
  TEMP=$(echo "\${METRICS}"  | awk -F, '{gsub(/ /,"",$4); print $4}')
  PWR=$(echo  "\${METRICS}"  | awk -F, '{gsub(/ /,"",$5); print int($5)}')

  echo "\${TS},\${UTIL},\${VMEM},\${VTOT},\${TEMP},\${PWR}" >> "\${LOGFILE}"

  # Temperature alert
  if [ "\${TEMP}" -ge "\${TEMP_THRESH}" ]; then
    echo "[\${TS}] ALERT: GPU temp \${TEMP}C >= \${TEMP_THRESH}C" >> "\${ALERTFILE}"
  fi

  # VRAM threshold — kill top consumer
  VRAM_PCT=$(awk "BEGIN{printf \"%d\", (\${VMEM}/\${VTOT})*100}")
  if [ "\${VRAM_PCT}" -ge "\${VRAM_THRESH}" ]; then
    TOP_PID=$(nvidia-smi --query-compute-apps=pid,used_memory \
      --format=csv,noheader,nounits | sort -t, -k2 -rn | head -1 | cut -d, -f1 | tr -d ' ')
    echo "[\${TS}] VRAM \${VRAM_PCT}% >= \${VRAM_THRESH}% — killing PID \${TOP_PID}" >> "\${ALERTFILE}"
    kill -9 "\${TOP_PID}" 2>/dev/null
  fi

  sleep 5
done
</span></pre>
      </details>
    </div>
  </div>

</div>

</div>
`};