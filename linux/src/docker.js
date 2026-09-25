var docker = {
    title: "Docker on Linux",
    description: "Master Docker on Linux at expert depth & understand how containers use Linux namespaces and cgroups, write production-grade Dockerfiles with multi-stage builds, manage volumes and custom networks, deploy multi-container stacks with Docker Compose, apply security hardening, and build complete containerised data engineering pipelines.",
    content: `
<style>
@keyframes dk-flow  { 0%{stroke-dashoffset:28}  100%{stroke-dashoffset:0} }
@keyframes dk-pulse { 0%,100%{opacity:1}         50%{opacity:.15} }
@keyframes dk-blink { 0%,100%{fill:#3fb950;stroke:#3fb950} 50%{fill:#0a1a0a;stroke:#238636} }
@keyframes dk-build { 0%{width:0%} 100%{width:80%} }
@keyframes dk-layer { 0%{transform:translateY(20px);opacity:0} 100%{transform:translateY(0);opacity:1} }
@keyframes dk-spin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes dk-run   { 0%,100%{fill:#1a2a1a;stroke:#3fb950} 50%{fill:#0a1f0a;stroke:#52ff6e} }
.dk-flow  { stroke-dasharray:7 5; animation: dk-flow  .9s linear infinite; }
.dk-pulse { animation: dk-pulse 1.8s ease-in-out infinite; }
.dk-blink { animation: dk-blink 2.4s ease-in-out infinite; }
.dk-run   { animation: dk-run   2s ease-in-out infinite; }
</style>
<div class="story-panel">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">Ravi's "It Works on My Machine" Problem 2014; Day 580</div>
    <br>
    <p>The data pipeline worked perfectly on Ravi's Ubuntu laptop. The moment it was deployed to the CentOS 7 production server, it crashed with <code>ImportError: cannot import name 'Protocol' from 'typing'</code>. The server was running Python 3.6. His laptop had Python 3.11. The pipeline used type hints only available from 3.8.</p>
    <br>
    <p>"This is what Docker solves," Priya said. "You package the application with its exact Python version, its exact dependencies, its exact environment. The container is the environment. It runs the same on your laptop, on the CI server, on production, on any machine with Docker installed."</p>
    <br>
    <p>She wrote a Dockerfile in three minutes. Built an image in thirty seconds. Ran it. The exact same binary that crashed on the server now ran perfectly &#x2014; because inside the container, it was still running on Python 3.11, with the exact same libraries, the exact same file paths, the exact same everything.</p>
    <br>
    <p>"Docker doesn't virtualise hardware," she added. "It virtualises the userspace. Same Linux kernel underneath, different filesystem, different processes, different network namespace. Lightweight, fast, reproducible."</p>
  </div>
</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Docker Architecture &#x2014; Client, Daemon, Registry</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="dk-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="dk-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="dk-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="dk-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="dk-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="dk-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="280" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Docker Architecture &#x2014; Client, Daemon, Images, Containers, Registry</text>
  <!-- Client -->
  <rect x="14"  y="40" width="160" height="100" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="94"  y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Docker Client</text>
  <text x="94"  y="80"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">docker build</text>
  <text x="94"  y="96"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">docker run</text>
  <text x="94"  y="112" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">docker pull</text>
  <text x="94"  y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">CLI / REST API</text>
  <line x1="174" y1="90" x2="210" y2="90" stroke="#58a6ff" stroke-width="2.5" marker-end="url(#dk-blu)" class="dk-flow"/>
  <text x="192" y="82"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">REST</text>
  <!-- Daemon -->
  <rect x="210" y="36" width="220" height="108" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="320" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">dockerd (daemon)</text>
  <text x="320" y="76"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Manages containers, images</text>
  <text x="320" y="92"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">/var/run/docker.sock</text>
  <text x="320" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Uses containerd + runc</text>
  <text x="320" y="130" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">/var/lib/docker/ (storage)</text>
  <!-- Registry -->
  <line x1="430" y1="90" x2="480" y2="90" stroke="#ffa657" stroke-width="2.5" marker-end="url(#dk-orn)" class="dk-flow"/>
  <rect x="480" y="36" width="196" height="108" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="578" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Registry</text>
  <text x="578" y="76"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">Docker Hub</text>
  <text x="578" y="92"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">GHCR / ECR / GCR</text>
  <text x="578" y="108" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">Private registry</text>
  <text x="578" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Stores image layers</text>
  <!-- Containers below -->
  <text x="320" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Containers (running from images):</text>
  <rect x="210" y="170" width="100" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5" class="dk-run"/>
  <text x="260" y="193" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">nginx:latest</text>
  <rect x="320" y="170" width="100" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5" class="dk-run"/>
  <text x="370" y="193" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">postgres:16</text>
  <rect x="430" y="170" width="100" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5" class="dk-run"/>
  <text x="480" y="193" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">pipeline:v2</text>
  <!-- Kernel row -->
  <rect x="14"  y="224" width="792" height="48" rx="8" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="244" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Linux Kernel</text>
  <text x="180" y="260" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">namespaces (pid, net, mnt, uts, ipc)</text>
  <text x="540" y="260" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">cgroups (CPU, memory, IO limits)</text>

</svg>
</div>
<p class="diagram-caption">Docker uses Linux namespaces to isolate containers (each gets its own filesystem, network, process tree) and cgroups to limit resources. No hypervisor &#x2014; containers share the host kernel, making them far faster and lighter than VMs.</p>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 12 — Docker installation, daemon setup, first container</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INSTALL DOCKER ON UBUNTU &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">curl -fsSL https://get.docker.com -o get-docker.sh</span>
<span class="cb-out">sudo sh get-docker.sh</span>
<span class="cb-cmt"># Or manual (recommended for production):</span>
<span class="cb-out">curl -fsSL https://download.docker.com/linux/ubuntu/gpg \</span>
<span class="cb-out">    | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg</span>
<span class="cb-out">echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \</span>
<span class="cb-out">  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \</span>
<span class="cb-out">  | sudo tee /etc/apt/sources.list.d/docker.list</span>
<span class="cb-out">sudo apt-get update &amp;&amp; sudo apt-get install -y docker-ce docker-ce-cli containerd.io</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; POST-INSTALL: RUN WITHOUT SUDO &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo usermod -aG docker ravi       <span class="cb-cmt"># add user to docker group</span>
<span class="cb-prompt">$</span> newgrp docker                       <span class="cb-cmt"># activate without logout</span>
<span class="cb-prompt">$</span> docker version                      <span class="cb-cmt"># verify</span>
<span class="cb-out">Client: Docker Engine - Community</span>
<span class="cb-out"> Version: 26.0.0</span>
<span class="cb-out">Server: Docker Engine - Community</span>
<span class="cb-out"> Engine: Version: 26.0.0</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; FIRST CONTAINER &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker run hello-world              <span class="cb-cmt"># test installation</span>
<span class="cb-prompt">$</span> docker run -it ubuntu bash          <span class="cb-cmt"># interactive terminal</span>
<span class="cb-prompt">$</span> docker run -d -p 8080:80 nginx      <span class="cb-cmt"># detached, port mapped</span>
<span class="cb-prompt">$</span> docker run --rm alpine echo "hi"    <span class="cb-cmt"># --rm: remove when done</span>
<span class="cb-cmt"># run flags: -d=detach  -it=interactive  -p host:cont  --rm=auto-remove
# --name=name  -e KEY=val  -v vol:/path  --network=net</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DAEMON MANAGEMENT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> sudo systemctl enable docker       <span class="cb-cmt"># start on boot</span>
<span class="cb-prompt">$</span> sudo systemctl status docker        <span class="cb-cmt"># check daemon status</span>
<span class="cb-prompt">$</span> docker info                         <span class="cb-cmt"># full daemon info</span>
<span class="cb-prompt">$</span> docker system info                  <span class="cb-cmt"># storage driver, network details</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Container Management &#x2014; ps, logs, exec, inspect</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 12 — docker ps, logs, exec, inspect, stats, cp</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CONTAINER MANAGEMENT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker ps                          <span class="cb-cmt"># running containers</span>
<span class="cb-prompt">$</span> docker ps -a                        <span class="cb-cmt"># all (including stopped)</span>
<span class="cb-prompt">$</span> docker ps --format "table {{.Names}}	{{.Status}}	{{.Ports}}"
<span class="cb-out">NAMES        STATUS         PORTS</span>
<span class="cb-out">web          Up 2 hours     0.0.0.0:8080->80/tcp</span>
<span class="cb-out">db           Up 2 hours     5432/tcp</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; LOGS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker logs web                    <span class="cb-cmt"># all stdout/stderr logs</span>
<span class="cb-prompt">$</span> docker logs -f web                  <span class="cb-cmt"># follow (live)</span>
<span class="cb-prompt">$</span> docker logs --tail 50 web           <span class="cb-cmt"># last 50 lines</span>
<span class="cb-prompt">$</span> docker logs --since "1h" web        <span class="cb-cmt"># last hour</span>
<span class="cb-prompt">$</span> docker logs web 2&gt;&amp;1 | grep ERROR   <span class="cb-cmt"># filter with grep</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; EXEC — RUN COMMANDS IN RUNNING CONTAINER &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker exec -it web bash            <span class="cb-cmt"># interactive shell inside container</span>
<span class="cb-prompt">$</span> docker exec web cat /etc/hosts      <span class="cb-cmt"># run command, see output</span>
<span class="cb-prompt">$</span> docker exec web env                  <span class="cb-cmt"># see environment variables</span>
<span class="cb-prompt">$</span> docker exec -e DEBUG=1 web python -c "import os; print(os.environ)"

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INSPECT AND STATS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker inspect web                  <span class="cb-cmt"># full JSON config of container</span>
<span class="cb-prompt">$</span> docker inspect -f '{{.NetworkSettings.IPAddress}}' web
<span class="cb-out">172.17.0.2</span>
<span class="cb-prompt">$</span> docker inspect -f '{{.State.ExitCode}}' web
<span class="cb-prompt">$</span> docker stats                         <span class="cb-cmt"># live CPU/memory/IO for all</span>
<span class="cb-prompt">$</span> docker stats --no-stream              <span class="cb-cmt"># one-shot snapshot</span>
<span class="cb-prompt">$</span> docker top web                        <span class="cb-cmt"># processes inside container</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; COPY FILES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker cp web:/etc/nginx/nginx.conf ./nginx.conf  <span class="cb-cmt"># container → host</span>
<span class="cb-prompt">$</span> docker cp ./config.env web:/app/config.env         <span class="cb-cmt"># host → container</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; LIFECYCLE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker stop web                     <span class="cb-cmt"># SIGTERM then SIGKILL (10s)</span>
<span class="cb-prompt">$</span> docker kill web                     <span class="cb-cmt"># immediate SIGKILL</span>
<span class="cb-prompt">$</span> docker rm web                       <span class="cb-cmt"># remove stopped container</span>
<span class="cb-prompt">$</span> docker rm -f web                    <span class="cb-cmt"># force remove (even if running)</span>
<span class="cb-prompt">$</span> docker container prune              <span class="cb-cmt"># remove all stopped containers</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num">03</span> Image Layers &amp; Build Cache</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="dk-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="dk-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="dk-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="dk-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="dk-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="dk-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="270" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Image Layer Model &#x2014; UnionFS, Copy-on-Write, Layer Sharing</text>
  <!-- Left: image layers -->
  <rect x="14"  y="40" width="360" height="220" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="194" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Image Layers (read-only, immutable):</text>
  <!-- Layer stack -->
  <rect x="26"  y="68"  width="336" height="30" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="194" y="88"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">FROM ubuntu:22.04  (base OS ~77MB)</text>
  <rect x="26"  y="102" width="336" height="30" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="194" y="122" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">RUN apt-get install python3  (+45MB)</text>
  <rect x="26"  y="136" width="336" height="30" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="194" y="156" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">COPY requirements.txt .  (+1KB)</text>
  <rect x="26"  y="170" width="336" height="30" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="194" y="190" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">RUN pip install -r requirements.txt  (+30MB)</text>
  <rect x="26"  y="204" width="336" height="30" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="194" y="224" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">COPY src/ .  (+500KB)  &#x2190; YOUR CODE</text>
  <!-- Container layer -->
  <rect x="26"  y="234" width="336" height="20" rx="5" fill="#1f1428" stroke="#bc8cff" stroke-width="2" class="dk-pulse"/>
  <text x="194" y="249" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">+ Read-Write layer (container delta)</text>
  <!-- Right: sharing explanation -->
  <rect x="390" y="40" width="416" height="220" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="598" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Layer Sharing Benefits:</text>
  <text x="400" y="82"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; ubuntu:22.04 layer downloaded ONCE</text>
  <text x="400" y="98"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Shared between all images using it</text>
  <text x="400" y="114" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2460; Build pipeline:v1 = all 5 layers</text>
  <text x="400" y="130" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">&#x2461; pipeline:v2 (code change only):</text>
  <text x="400" y="146" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">   Layers 1-4 REUSED from cache</text>
  <text x="400" y="162" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">   Only layer 5 rebuilt (~500KB)</text>
  <text x="400" y="178" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">&#x2605; Put rarely-changing layers FIRST</text>
  <text x="400" y="194" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">&#x2605; Copy code last (invalidates fewest</text>
  <text x="400" y="210" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">   cached layers)</text>
  <text x="400" y="226" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x26A0; Each RUN = a new layer! Combine:</text>
  <text x="400" y="242" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">   RUN cmd1 &amp;&amp; cmd2 &amp;&amp; rm -rf /tmp/*</text>

</svg>
</div>
<p class="diagram-caption">Every Dockerfile instruction that changes the filesystem creates a new read-only layer. Layers are content-addressed (SHA256) and cached. If a layer hasn't changed, Docker reuses it. <strong>Proper layer ordering is the single most impactful optimisation for build speed.</strong></p>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 12 — Writing a production Dockerfile</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; PRODUCTION DOCKERFILE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Best practices baked in:</span>
<span class="cb-out"># ── Builder stage ──────────────────────────────────────────</span>
<span class="cb-out">FROM python:3.12-slim AS builder</span>
<span class="cb-out">WORKDIR /build</span>
<span class="cb-out"># Install build deps + compile Python wheels</span>
<span class="cb-out">RUN apt-get update &amp;&amp; apt-get install -y --no-install-recommends \</span>
<span class="cb-out">    gcc libpq-dev \</span>
<span class="cb-out">    &amp;&amp; rm -rf /var/lib/apt/lists/*</span>
<span class="cb-out">COPY requirements.txt .</span>
<span class="cb-out">RUN pip install --no-cache-dir --prefix=/install -r requirements.txt</span>
<span class="cb-out"></span>
<span class="cb-out"># ── Final stage ────────────────────────────────────────────</span>
<span class="cb-out">FROM python:3.12-slim</span>
<span class="cb-out">WORKDIR /app</span>
<span class="cb-out"></span>
<span class="cb-out"># Create non-root user</span>
<span class="cb-out">RUN groupadd -r pipeline &amp;&amp; useradd -r -g pipeline pipeline</span>
<span class="cb-out"></span>
<span class="cb-out"># Copy installed packages from builder</span>
<span class="cb-out">COPY --from=builder /install /usr/local</span>
<span class="cb-out"></span>
<span class="cb-out"># Copy application code (change most often → last for cache)</span>
<span class="cb-out">COPY --chown=pipeline:pipeline src/ /app/</span>
<span class="cb-out"></span>
<span class="cb-out"># Metadata</span>
<span class="cb-out">LABEL org.opencontainers.image.version="2.1.0"</span>
<span class="cb-out">LABEL org.opencontainers.image.source="https://github.com/example/pipeline"</span>
<span class="cb-out"></span>
<span class="cb-out"># Runtime config</span>
<span class="cb-out">ENV PYTHONUNBUFFERED=1 \</span>
<span class="cb-out">    PYTHONDONTWRITEBYTECODE=1 \</span>
<span class="cb-out">    PORT=8000</span>
<span class="cb-out"></span>
<span class="cb-out"># Health check</span>
<span class="cb-out">HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \</span>
<span class="cb-out">    CMD curl -fs http://localhost:$PORT/health || exit 1</span>
<span class="cb-out"></span>
<span class="cb-out"># Drop to non-root</span>
<span class="cb-out">USER pipeline</span>
<span class="cb-out">EXPOSE 8000</span>
<span class="cb-out">CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; BUILD &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker build -t pipeline:2.1.0 .           <span class="cb-cmt"># build with tag</span>
<span class="cb-prompt">$</span> docker build --no-cache -t pipeline:2.1.0 . <span class="cb-cmt"># force rebuild all layers</span>
<span class="cb-prompt">$</span> docker build --target builder -t pipeline:builder .  <span class="cb-cmt"># stop at stage</span>
<span class="cb-prompt">$</span> docker build --build-arg VERSION=2.1.0 .    <span class="cb-cmt"># pass build arg</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Images: Pull, Tag, Push, Analyse</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 12 — Images: pull, push, tag, inspect, prune, layer analysis</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; IMAGES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker images                       <span class="cb-cmt"># list local images</span>
<span class="cb-prompt">$</span> docker images -a                     <span class="cb-cmt"># include intermediate layers</span>
<span class="cb-prompt">$</span> docker pull python:3.12-slim         <span class="cb-cmt"># pull from registry</span>
<span class="cb-prompt">$</span> docker pull ghcr.io/user/app:latest  <span class="cb-cmt"># from GitHub Container Registry</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; TAGGING &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker tag pipeline:2.1.0 registry.example.com/myteam/pipeline:2.1.0
<span class="cb-prompt">$</span> docker tag pipeline:2.1.0 pipeline:latest
<span class="cb-cmt"># Image format: [registry/][namespace/]name[:tag]
# No registry = Docker Hub assumed
# No tag = :latest assumed</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; PUSH &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker login                         <span class="cb-cmt"># login to Docker Hub</span>
<span class="cb-prompt">$</span> docker login ghcr.io -u $GITHUB_USER --password-stdin &lt;&lt;&lt; "$GITHUB_TOKEN"
<span class="cb-prompt">$</span> docker push registry.example.com/myteam/pipeline:2.1.0

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INSPECT AND ANALYSE LAYERS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker inspect python:3.12-slim      <span class="cb-cmt"># image metadata</span>
<span class="cb-prompt">$</span> docker inspect -f '{{.Config.Cmd}}' python:3.12-slim
<span class="cb-prompt">$</span> docker history pipeline:2.1.0        <span class="cb-cmt"># show layers + sizes</span>
<span class="cb-out">IMAGE          CREATED   CREATED BY                                      SIZE</span>
<span class="cb-out">abc123def456   1 min     CMD ["python" "-m" "uvicorn" ...]               0B</span>
<span class="cb-out">...            1 min     COPY src/ /app/                                 524kB</span>
<span class="cb-out">...            2 min     COPY --from=builder /install /usr/local         31.2MB</span>
<span class="cb-prompt">$</span> docker image ls --format "{{.Repository}}:{{.Tag}}	{{.Size}}"
<span class="cb-cmt"># Analyse layer efficiency:</span>
<span class="cb-prompt">$</span> docker run --rm -v /var/run/docker.sock:/var/run/docker.sock     wagoodman/dive pipeline:2.1.0     <span class="cb-cmt"># interactive layer explorer</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CLEANUP &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker rmi pipeline:old              <span class="cb-cmt"># remove image</span>
<span class="cb-prompt">$</span> docker image prune                   <span class="cb-cmt"># remove dangling (&lt;none&gt;) images</span>
<span class="cb-prompt">$</span> docker system prune                  <span class="cb-cmt"># remove all unused: containers+images+nets</span>
<span class="cb-prompt">$</span> docker system prune -a               <span class="cb-cmt"># include non-running container images</span>
<span class="cb-prompt">$</span> docker system df                     <span class="cb-cmt"># disk usage by category</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Data Persistence &#x2014; Volumes &amp; Bind Mounts</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="dk-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="dk-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="dk-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="dk-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="dk-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="dk-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Data Persistence &#x2014; Volumes, Bind Mounts, tmpfs</text>
  <!-- Volumes -->
  <rect x="14"  y="38" width="244" height="128" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="136" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Named Volume</text>
  <text x="24"  y="76"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Managed by Docker</text>
  <text x="24"  y="92"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Survives container removal</text>
  <text x="24"  y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Easy backup/migrate</text>
  <text x="24"  y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">-v pgdata:/var/lib/postgresql</text>
  <text x="24"  y="140" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">/var/lib/docker/volumes/pgdata/</text>
  <text x="136" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Use for: DB data, persistent state</text>
  <!-- Bind mounts -->
  <rect x="288" y="38" width="244" height="128" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="410" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Bind Mount</text>
  <text x="298" y="76"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Full host path control</text>
  <text x="298" y="92"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Live reload for dev</text>
  <text x="298" y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x26A0; Container can modify host files</text>
  <text x="298" y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">-v /host/path:/container/path</text>
  <text x="298" y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">-v $(pwd):/app</text>
  <text x="410" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">Use for: dev, config files, logs</text>
  <!-- tmpfs -->
  <rect x="562" y="38" width="244" height="128" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="684" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">tmpfs</text>
  <text x="572" y="76"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; In-memory only</text>
  <text x="572" y="92"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Never written to disk</text>
  <text x="572" y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x26A0; Lost when container stops</text>
  <text x="572" y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">--tmpfs /tmp:size=64m</text>
  <text x="572" y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">--mount type=tmpfs,dst=/tmp</text>
  <text x="684" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Use for: secrets, temp data</text>
  <!-- rule -->
  <rect x="14"  y="176" width="792" height="28" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1"/>
  <text x="26"  y="192" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x26A0; Container filesystem is ephemeral. All data written to the container layer disappears when the container is removed.</text>
  <text x="26"  y="200" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Use volumes (or bind mounts) for any data that must outlive the container: database files, uploads, logs, configs.</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 12 — Volumes: create, mount, backup, inspect, share</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; NAMED VOLUMES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker volume create pgdata          <span class="cb-cmt"># create named volume</span>
<span class="cb-prompt">$</span> docker volume ls                      <span class="cb-cmt"># list volumes</span>
<span class="cb-prompt">$</span> docker volume inspect pgdata          <span class="cb-cmt"># show Mountpoint + metadata</span>
<span class="cb-out">  "Mountpoint": "/var/lib/docker/volumes/pgdata/_data"</span>
<span class="cb-prompt">$</span> docker volume rm pgdata               <span class="cb-cmt"># remove (must not be in use)</span>
<span class="cb-prompt">$</span> docker volume prune                   <span class="cb-cmt"># remove all unused volumes</span>

<span class="cb-cmt"># Use in docker run:</span>
<span class="cb-prompt">$</span> docker run -d --name db     -v pgdata:/var/lib/postgresql/data     -e POSTGRES_PASSWORD=secret     postgres:16

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; BIND MOUNTS (DEV WORKFLOW) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Mount current directory into container (live code reload):</span>
<span class="cb-prompt">$</span> docker run -v $(pwd):/app -p 8000:8000 pipeline:dev
<span class="cb-cmt"># Read-only bind mount:</span>
<span class="cb-prompt">$</span> docker run -v $(pwd)/config:/app/config:ro pipeline

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; BACKUP AND RESTORE VOLUMES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Backup volume to tar file:</span>
<span class="cb-prompt">$</span> docker run --rm     -v pgdata:/source:ro     -v $(pwd):/backup     alpine tar czf /backup/pgdata-$(date +%Y%m%d).tar.gz -C /source .

<span class="cb-cmt"># Restore from backup:</span>
<span class="cb-prompt">$</span> docker run --rm     -v pgdata:/dest     -v $(pwd):/backup     alpine sh -c "tar xzf /backup/pgdata-20240115.tar.gz -C /dest"

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SHARE DATA BETWEEN CONTAINERS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker run -d --name producer -v shared:/data producer-image
<span class="cb-prompt">$</span> docker run -d --name consumer -v shared:/data:ro consumer-image
<span class="cb-cmt"># Both containers share the volume; producer writes, consumer reads</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Networking &#x2014; Bridge, Host, Custom, DNS</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="dk-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="dk-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="dk-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="dk-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="dk-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="dk-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Docker Networking &#x2014; Four Network Modes</text>
  <!-- Bridge -->
  <rect x="14"  y="38" width="185" height="146" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="107" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">bridge (default)</text>
  <text x="24"  y="76"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Isolated from host</text>
  <text x="24"  y="92"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Container DNS by name</text>
  <text x="24"  y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Port mapping via -p</text>
  <text x="24"  y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">-p 8080:80</text>
  <text x="24"  y="140" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">docker0 veth pair</text>
  <text x="24"  y="156" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">172.17.0.0/16</text>
  <text x="107" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Most services</text>
  <!-- Host -->
  <rect x="213" y="38" width="185" height="146" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="305" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">host</text>
  <text x="223" y="76"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">&#x26A0; No isolation</text>
  <text x="223" y="92"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Maximum performance</text>
  <text x="223" y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Shares host network</text>
  <text x="223" y="124" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Port mapping irrelevant</text>
  <text x="223" y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">--network host</text>
  <text x="305" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">Monitoring tools, high perf</text>
  <!-- None -->
  <rect x="412" y="38" width="185" height="146" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="504" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">none</text>
  <text x="422" y="76"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Maximum isolation</text>
  <text x="422" y="92"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">No network at all</text>
  <text x="422" y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Loopback only</text>
  <text x="422" y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">--network none</text>
  <text x="504" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Batch jobs, no network needed</text>
  <!-- Custom bridge -->
  <rect x="611" y="38" width="195" height="146" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="708" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">custom bridge</text>
  <text x="621" y="76"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; DNS by container name</text>
  <text x="621" y="92"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; Isolated segment</text>
  <text x="621" y="108" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">docker network create</text>
  <text x="621" y="124" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">--driver bridge mynet</text>
  <text x="621" y="140" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Containers resolve each</text>
  <text x="621" y="156" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">other by name: db, redis</text>
  <text x="708" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">&#x2605; Recommended for apps</text>
  <!-- note -->
  <rect x="14"  y="194" width="792" height="28" rx="5" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26"  y="210" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Default bridge network does NOT support DNS by name. Create a custom bridge network for any multi-container application.</text>
  <text x="26"  y="218" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">docker run --network mynet --name db postgres  &#x2192;  app can connect using hostname "db"</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 12 — Networking: create, connect, DNS, port mapping, inspect</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; NETWORKS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker network ls                     <span class="cb-cmt"># list all networks</span>
<span class="cb-prompt">$</span> docker network create app-net         <span class="cb-cmt"># create custom bridge</span>
<span class="cb-prompt">$</span> docker network create     --driver bridge     --subnet 192.168.100.0/24     --gateway 192.168.100.1     production-net
<span class="cb-prompt">$</span> docker network inspect app-net        <span class="cb-cmt"># details (subnet, containers)</span>
<span class="cb-prompt">$</span> docker network rm app-net             <span class="cb-cmt"># remove network</span>
<span class="cb-prompt">$</span> docker network prune                  <span class="cb-cmt"># remove unused networks</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CONNECT CONTAINERS BY NAME &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker run -d --name db --network app-net postgres:16
<span class="cb-prompt">$</span> docker run -d --name api --network app-net     -e DATABASE_URL=postgresql://postgres@db/mydb     pipeline:2.1.0
<span class="cb-cmt"># api container resolves "db" via Docker DNS automatically</span>
<span class="cb-prompt">$</span> docker exec api ping -c 1 db          <span class="cb-cmt"># verify connectivity by name</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CONNECT RUNNING CONTAINER TO NETWORK &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker network connect app-net existing-container
<span class="cb-prompt">$</span> docker network disconnect app-net existing-container

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; PORT MAPPING &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker run -p 8080:80 nginx           <span class="cb-cmt"># map host:8080 to container:80</span>
<span class="cb-prompt">$</span> docker run -p 127.0.0.1:8080:80 nginx <span class="cb-cmt"># bind only to localhost</span>
<span class="cb-prompt">$</span> docker run -P nginx                   <span class="cb-cmt"># -P: auto-assign host ports</span>
<span class="cb-prompt">$</span> docker port nginx-container           <span class="cb-cmt"># show port mappings</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Docker Compose &#x2014; Multi-Container Stacks</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="dk-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="dk-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="dk-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="dk-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="dk-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="dk-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="240" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Docker Compose &#x2014; Multi-Container Application Stack</text>
  <!-- compose.yml representation -->
  <rect x="14"  y="38" width="360" height="192" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="24"  y="58"  font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">docker-compose.yml</text>
  <text x="24"  y="76"  font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">services:</text>
  <text x="24"  y="92"  font-family="'Courier New',monospace" font-size="10" fill="#3fb950">  api:</text>
  <text x="24"  y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">    build: .</text>
  <text x="24"  y="124" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">    ports: ["8000:8000"]</text>
  <text x="24"  y="140" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">    depends_on: [db, redis]</text>
  <text x="24"  y="156" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">    environment:</text>
  <text x="24"  y="172" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">      - DATABASE_URL=...</text>
  <text x="24"  y="188" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">  db:</text>
  <text x="24"  y="204" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">    image: postgres:16</text>
  <text x="24"  y="220" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">    volumes: [pgdata:/var/lib/...]</text>
  <!-- right: services running -->
  <line x1="374" y1="130" x2="418" y2="130" stroke="#ffa657" stroke-width="2" marker-end="url(#dk-orn)" class="dk-flow"/>
  <rect x="418" y="50"  width="130" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5" class="dk-run"/>
  <text x="483" y="74"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">api container</text>
  <rect x="418" y="110" width="130" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5" class="dk-run"/>
  <text x="483" y="134" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">db container</text>
  <rect x="418" y="170" width="130" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5" class="dk-run"/>
  <text x="483" y="194" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">redis container</text>
  <!-- Network -->
  <rect x="560" y="70" width="246" height="140" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="683" y="90"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Auto-created network</text>
  <text x="570" y="108" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; All services on same net</text>
  <text x="570" y="124" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">&#x2705; DNS by service name</text>
  <text x="570" y="140" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">  api &#x2192; db (hostname: db)</text>
  <text x="570" y="156" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">  api &#x2192; redis</text>
  <text x="570" y="172" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Named pgdata volume</text>
  <text x="570" y="188" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">auto-created</text>
  <!-- key commands -->
  <rect x="14"  y="204" width="390" height="28" rx="5" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="24"  y="220" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">docker compose up -d</text>
  <text x="168" y="220" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  |  </text>
  <text x="188" y="220" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">docker compose logs -f api</text>
  <text x="354" y="220" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">  |  </text>
  <text x="372" y="220" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">down</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 12 — Docker Compose: full stack deployment</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; COMPLETE docker-compose.yml &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">services:</span>
<span class="cb-out">  api:</span>
<span class="cb-out">    build:</span>
<span class="cb-out">      context: .</span>
<span class="cb-out">      dockerfile: Dockerfile</span>
<span class="cb-out">      target: final</span>
<span class="cb-out">    image: pipeline:\${TAG:-latest}</span>
<span class="cb-out">    ports: ["\${PORT:-8000}:8000"]</span>
<span class="cb-out">    environment:</span>
<span class="cb-out">      - DATABASE_URL=postgresql://postgres:\${DB_PASS}@db/analytics</span>
<span class="cb-out">      - REDIS_URL=redis://redis:6379</span>
<span class="cb-out">    env_file: .env                  # load from .env file</span>
<span class="cb-out">    depends_on:</span>
<span class="cb-out">      db:</span>
<span class="cb-out">        condition: service_healthy  # wait for healthcheck</span>
<span class="cb-out">      redis:</span>
<span class="cb-out">        condition: service_started</span>
<span class="cb-out">    restart: unless-stopped</span>
<span class="cb-out">    networks: [backend]</span>
<span class="cb-out">    volumes: [./logs:/app/logs]</span>
<span class="cb-out">    deploy:</span>
<span class="cb-out">      resources:</span>
<span class="cb-out">        limits: {memory: 2g, cpus: '1.0'}</span>
<span class="cb-out"></span>
<span class="cb-out">  db:</span>
<span class="cb-out">    image: postgres:16-alpine</span>
<span class="cb-out">    volumes: [pgdata:/var/lib/postgresql/data]</span>
<span class="cb-out">    environment:</span>
<span class="cb-out">      POSTGRES_DB: analytics</span>
<span class="cb-out">      POSTGRES_PASSWORD: \${DB_PASS}</span>
<span class="cb-out">    healthcheck:</span>
<span class="cb-out">      test: ["CMD", "pg_isready", "-U", "postgres"]</span>
<span class="cb-out">      interval: 10s; timeout: 5s; retries: 5</span>
<span class="cb-out">    networks: [backend]</span>
<span class="cb-out"></span>
<span class="cb-out">  redis:</span>
<span class="cb-out">    image: redis:7-alpine</span>
<span class="cb-out">    command: redis-server --save 60 1</span>
<span class="cb-out">    volumes: [redisdata:/data]</span>
<span class="cb-out">    networks: [backend]</span>
<span class="cb-out"></span>
<span class="cb-out">volumes:</span>
<span class="cb-out">  pgdata: {}           # named volumes survive 'docker compose down'</span>
<span class="cb-out">  redisdata: {}</span>
<span class="cb-out"></span>
<span class="cb-out">networks:</span>
<span class="cb-out">  backend:</span>
<span class="cb-out">    driver: bridge</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; COMPOSE COMMANDS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker compose up -d                 <span class="cb-cmt"># start stack in background</span>
<span class="cb-prompt">$</span> docker compose up --build -d          <span class="cb-cmt"># rebuild + start</span>
<span class="cb-prompt">$</span> docker compose down                   <span class="cb-cmt"># stop + remove (keep volumes)</span>
<span class="cb-prompt">$</span> docker compose down -v                <span class="cb-cmt"># also remove volumes</span>
<span class="cb-prompt">$</span> docker compose logs -f api            <span class="cb-cmt"># follow logs for one service</span>
<span class="cb-prompt">$</span> docker compose ps                     <span class="cb-cmt"># status of all services</span>
<span class="cb-prompt">$</span> docker compose exec api bash          <span class="cb-cmt"># shell into service</span>
<span class="cb-prompt">$</span> docker compose restart api            <span class="cb-cmt"># restart one service</span>
<span class="cb-prompt">$</span> docker compose scale api=3            <span class="cb-cmt"># run 3 instances of api</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Security &#x2014; Non-root, Capabilities, Secrets</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="dk-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="dk-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="dk-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="dk-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="dk-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="dk-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Container Security &#x2014; Defence in Depth</text>
  <!-- Grid of security items -->
  <rect x="14"  y="38" width="248" height="56" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="138" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">Never run as root</text>
  <text x="24"  y="75"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">USER nobody  (in Dockerfile)</text>
  <text x="24"  y="87"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">--user 1000:1000  (in docker run)</text>
  <rect x="14"  y="104" width="248" height="56" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="138" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Read-only filesystem</text>
  <text x="24"  y="141" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">--read-only</text>
  <text x="24"  y="153" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">+ --tmpfs /tmp for writes</text>
  <rect x="286" y="38" width="248" height="56" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="410" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">Drop capabilities</text>
  <text x="296" y="75"  font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">--cap-drop ALL</text>
  <text x="296" y="87"  font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">--cap-add NET_BIND_SERVICE</text>
  <rect x="286" y="104" width="248" height="56" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="410" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">No privilege escalation</text>
  <text x="296" y="141" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">--security-opt no-new-privileges</text>
  <text x="296" y="153" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Prevents setuid exploits</text>
  <rect x="558" y="38" width="248" height="56" rx="6" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="682" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Scan images</text>
  <text x="568" y="75"  font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">docker scout cves image</text>
  <text x="568" y="87"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">trivy image myapp:v1</text>
  <rect x="558" y="104" width="248" height="56" rx="6" fill="#1a1a2a" stroke="#30363d" stroke-width="1.5"/>
  <text x="682" y="124" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Limit resources</text>
  <text x="568" y="141" font-family="'Courier New',monospace" font-size="9.5" fill="#8b949e">--memory 512m --cpus 1.0</text>
  <text x="568" y="153" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Prevent resource starvation</text>
  <rect x="14"  y="170" width="792" height="22" rx="4" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26"  y="186" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Base image best practice: use official slim/alpine variants. Smaller attack surface. Fewer CVEs. Faster pulls.</text>
  <text x="430" y="186" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">python:3.12-slim</text><text x="512" y="186" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> vs </text><text x="534" y="186" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">python:3.12  (800MB more)</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 12 — Security: non-root, capabilities, read-only, secrets</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; RUN AS NON-ROOT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># In Dockerfile:</span>
<span class="cb-out">RUN groupadd -r appuser &amp;&amp; useradd -r -g appuser appuser</span>
<span class="cb-out">USER appuser</span>
<span class="cb-cmt"># At runtime:</span>
<span class="cb-prompt">$</span> docker run --user 1000:1000 myimage    <span class="cb-cmt"># specify UID:GID</span>
<span class="cb-prompt">$</span> docker run --user nobody myimage       <span class="cb-cmt"># use nobody user</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DROP CAPABILITIES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker run --cap-drop ALL myimage      <span class="cb-cmt"># drop everything</span>
<span class="cb-prompt">$</span> docker run --cap-drop ALL --cap-add NET_BIND_SERVICE myimage  <span class="cb-cmt"># add back only needed</span>
<span class="cb-prompt">$</span> docker run --security-opt no-new-privileges myimage  <span class="cb-cmt"># no setuid exploit</span>
<span class="cb-prompt">$</span> docker run --read-only --tmpfs /tmp myimage  <span class="cb-cmt"># read-only FS + writeable /tmp</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SECRETS (avoid ENV for sensitive values) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Docker Compose secrets (mounted at /run/secrets/name):</span>
<span class="cb-out">services:</span>
<span class="cb-out">  api:</span>
<span class="cb-out">    secrets: [db_password]</span>
<span class="cb-out">secrets:</span>
<span class="cb-out">  db_password:</span>
<span class="cb-out">    file: ./secrets/db_password.txt</span>
<span class="cb-cmt"># App reads from file: open("/run/secrets/db_password").read().strip()</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; RESOURCE LIMITS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker run --memory 512m --cpus 1.0 myimage   <span class="cb-cmt"># limit resources</span>
<span class="cb-prompt">$</span> docker run --memory-swap 512m myimage          <span class="cb-cmt"># same as memory (no swap)</span>
<span class="cb-prompt">$</span> docker run --pids-limit 100 myimage            <span class="cb-cmt"># max 100 processes</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SCAN FOR VULNERABILITIES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker scout cves pipeline:2.1.0      <span class="cb-cmt"># Docker Scout (built-in)</span>
<span class="cb-prompt">$</span> trivy image pipeline:2.1.0            <span class="cb-cmt"># Trivy (open source)</span>
<span class="cb-out">Total: 0 (HIGH: 0, CRITICAL: 0)</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Environment Variables, .dockerignore, Health Checks</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 12 — Environment variables, .dockerignore, health checks</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; ENVIRONMENT VARIABLES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Ways to pass environment variables:</span>
<span class="cb-prompt">$</span> docker run -e KEY=value myimage       <span class="cb-cmt"># single variable</span>
<span class="cb-prompt">$</span> docker run -e KEY myimage             <span class="cb-cmt"># pass from host env</span>
<span class="cb-prompt">$</span> docker run --env-file .env myimage    <span class="cb-cmt"># from file</span>

<span class="cb-cmt"># .env file for docker run or compose:</span>
<span class="cb-out">DATABASE_URL=postgresql://localhost/mydb</span>
<span class="cb-out">REDIS_URL=redis://localhost:6379</span>
<span class="cb-out">SECRET_KEY=do-not-commit-this</span>
<span class="cb-cmt"># ⚠ Never commit .env to git! Add to .gitignore</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; .dockerignore &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># .dockerignore prevents files from being sent to build context:</span>
<span class="cb-out">.git</span>
<span class="cb-out">.gitignore</span>
<span class="cb-out">__pycache__</span>
<span class="cb-out">*.pyc</span>
<span class="cb-out">.env</span>
<span class="cb-out">*.env</span>
<span class="cb-out">.venv</span>
<span class="cb-out">node_modules</span>
<span class="cb-out">tests/</span>
<span class="cb-out">*.test.py</span>
<span class="cb-out">docs/</span>
<span class="cb-out">README.md</span>
<span class="cb-cmt"># Without .dockerignore: COPY . . copies EVERYTHING including .git (huge!)</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; HEALTH CHECKS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># In Dockerfile:</span>
<span class="cb-out">HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \</span>
<span class="cb-out">    CMD wget -qO- http://localhost:8000/health || exit 1</span>
<span class="cb-cmt"># At runtime:</span>
<span class="cb-prompt">$</span> docker run --health-cmd="pg_isready" --health-interval=10s postgres
<span class="cb-prompt">$</span> docker inspect --format='{{.State.Health.Status}}' db
<span class="cb-out">healthy</span>
<span class="cb-cmt"># States: starting → healthy / unhealthy
# Compose depends_on condition: service_healthy waits for healthy</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Multi-Stage Builds &#x2014; Small Production Images</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="dk-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="dk-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="dk-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="dk-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="dk-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="dk-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Multi-Stage Build &#x2014; Build-Time Dependencies Don't Enter the Final Image</text>
  <!-- Builder stage -->
  <rect x="14"  y="40" width="340" height="140" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="184" y="60"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#ffa657">FROM python:3.12 AS builder</text>
  <text x="24"  y="80"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">RUN apt-get install gcc libpq-dev</text>
  <text x="24"  y="96"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">COPY requirements.txt .</text>
  <text x="24"  y="112" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">RUN pip install --prefix=/install -r req.txt</text>
  <text x="184" y="136" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Image size: ~800MB (with build tools)</text>
  <text x="184" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">NEVER shipped to production</text>
  <!-- Arrow with COPY --from -->
  <line x1="354" y1="110" x2="406" y2="110" stroke="#3fb950" stroke-width="2.5" marker-end="url(#dk-grn)" class="dk-flow"/>
  <text x="380" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#3fb950">COPY</text>
  <text x="380" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">--from</text>
  <!-- Final stage -->
  <rect x="406" y="40" width="400" height="140" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="606" y="60"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#3fb950">FROM python:3.12-slim</text>
  <text x="416" y="80"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">COPY --from=builder /install /usr/local</text>
  <text x="416" y="96"  font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">COPY src/ /app/</text>
  <text x="416" y="112" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">USER nobody</text>
  <text x="416" y="128" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">CMD ["python", "-m", "app.main"]</text>
  <text x="606" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Final image: ~120MB</text>
  <text x="606" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">No gcc, no build tools</text>
  <!-- note -->
  <rect x="14"  y="192" width="792" height="22" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="26"  y="207" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Multi-stage builds can have ANY number of stages. Only the FINAL stage is the image. This removes build tools (gcc, make, pip, npm) from production.</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 12 — CI/CD: GitHub Actions, build cache, multi-platform</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; GITHUB ACTIONS DOCKER WORKFLOW &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">name: Build and Push</span>
<span class="cb-out">on:</span>
<span class="cb-out">  push:</span>
<span class="cb-out">    branches: [main]</span>
<span class="cb-out">    tags: ['v*']</span>
<span class="cb-out">jobs:</span>
<span class="cb-out">  build:</span>
<span class="cb-out">    runs-on: ubuntu-latest</span>
<span class="cb-out">    steps:</span>
<span class="cb-out">      - uses: actions/checkout@v4</span>
<span class="cb-out">      - name: Set up Docker Buildx</span>
<span class="cb-out">        uses: docker/setup-buildx-action@v3</span>
<span class="cb-out">      - name: Login to GHCR</span>
<span class="cb-out">        uses: docker/login-action@v3</span>
<span class="cb-out">        with:</span>
<span class="cb-out">          registry: ghcr.io</span>
<span class="cb-out">          username: \${{ github.actor }}</span>
<span class="cb-out">          password: \${{ secrets.GITHUB_TOKEN }}</span>
<span class="cb-out">      - name: Build and push</span>
<span class="cb-out">        uses: docker/build-push-action@v5</span>
<span class="cb-out">        with:</span>
<span class="cb-out">          push: true</span>
<span class="cb-out">          tags: ghcr.io/\${{ github.repository }}:\${{ github.sha }}</span>
<span class="cb-out">          cache-from: type=gha       # GitHub Actions cache</span>
<span class="cb-out">          cache-to: type=gha,mode=max</span>
<span class="cb-out">          platforms: linux/amd64,linux/arm64  # multi-platform!</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; BUILD CACHE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Use registry as cache backend:</span>
<span class="cb-prompt">$</span> docker buildx build     --cache-from type=registry,ref=ghcr.io/myapp/cache     --cache-to type=registry,ref=ghcr.io/myapp/cache,mode=max     -t myapp:v2 --push .

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; MULTI-PLATFORM BUILDS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker buildx create --use --name multibuilder  <span class="cb-cmt"># create builder</span>
<span class="cb-prompt">$</span> docker buildx build --platform linux/amd64,linux/arm64     -t myapp:v2 --push .
<span class="cb-cmt"># Creates a manifest list — same tag works on both amd64 and arm64</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Docker for Data Engineering</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 11 of 12 — Docker for data engineering: pipelines, databases, Jupyter</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; RUN POSTGRESQL IN DOCKER &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker run -d     --name postgres     -e POSTGRES_USER=admin     -e POSTGRES_PASSWORD=secret     -e POSTGRES_DB=analytics     -v pgdata:/var/lib/postgresql/data     -p 5432:5432     --health-cmd="pg_isready -U admin"     postgres:16-alpine

<span class="cb-prompt">$</span> docker exec -it postgres psql -U admin -d analytics
<span class="cb-prompt">$</span> docker exec postgres pg_dump -U admin analytics &gt; backup.sql

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DATA PIPELINE AS A DOCKER JOB &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Run pipeline as one-shot container:</span>
<span class="cb-prompt">$</span> docker run --rm     --network app-net     -e DATABASE_URL=postgresql://admin:secret@postgres/analytics     -v $(pwd)/data:/data     pipeline:2.1.0     python -m etl.run --date 2024-01-15

<span class="cb-cmt"># Cron + Docker (in a script run by systemd timer):</span>
<span class="cb-out">docker run --rm \</span>
<span class="cb-out">    --name etl-$(date +%Y%m%d) \</span>
<span class="cb-out">    --network production-net \</span>
<span class="cb-out">    --env-file /etc/pipeline/prod.env \</span>
<span class="cb-out">    pipeline:$(cat /etc/pipeline/current_version) \</span>
<span class="cb-out">    python -m etl.daily</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; JUPYTER NOTEBOOK IN DOCKER &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker run -p 8888:8888     -v $(pwd):/home/jovyan/work     --name jupyter     jupyter/scipy-notebook
<span class="cb-cmt"># Access: http://localhost:8888  (token shown in logs)</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; REDIS, KAFKA, ELASTICSEARCH &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker run -d --name redis -p 6379:6379 redis:7-alpine
<span class="cb-prompt">$</span> docker run -d --name kafka     -e KAFKA_CFG_PROCESS_ROLES=broker,controller     -p 9092:9092 bitnami/kafka:latest
<span class="cb-prompt">$</span> docker run -d --name es     -e discovery.type=single-node     -e xpack.security.enabled=false     -p 9200:9200 elasticsearch:8.11.0
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Data Stack: Compose + Monitoring</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 12 of 12 — Complete data stack: Compose with pipeline, DB, monitoring</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; COMPLETE DATA STACK docker-compose.yml &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">services:</span>
<span class="cb-out">  db:</span>
<span class="cb-out">    image: postgres:16-alpine</span>
<span class="cb-out">    volumes: [pgdata:/var/lib/postgresql/data]</span>
<span class="cb-out">    environment: {POSTGRES_DB: analytics, POSTGRES_PASSWORD: \${DB_PASS}}</span>
<span class="cb-out">    healthcheck:</span>
<span class="cb-out">      test: [CMD, pg_isready]</span>
<span class="cb-out">      interval: 10s; timeout: 5s; retries: 5</span>
<span class="cb-out">    networks: [data]</span>
<span class="cb-out"></span>
<span class="cb-out">  pipeline:</span>
<span class="cb-out">    build: {context: ., target: final}</span>
<span class="cb-out">    env_file: .env</span>
<span class="cb-out">    depends_on: {db: {condition: service_healthy}}</span>
<span class="cb-out">    volumes: [./output:/app/output]</span>
<span class="cb-out">    networks: [data]</span>
<span class="cb-out">    restart: unless-stopped</span>
<span class="cb-out">    deploy:</span>
<span class="cb-out">      resources:</span>
<span class="cb-out">        limits: {memory: 4g, cpus: '2.0'}</span>
<span class="cb-out"></span>
<span class="cb-out">  prometheus:</span>
<span class="cb-out">    image: prom/prometheus:latest</span>
<span class="cb-out">    volumes: [./prometheus.yml:/etc/prometheus/prometheus.yml]</span>
<span class="cb-out">    ports: ["9090:9090"]</span>
<span class="cb-out">    networks: [data, monitoring]</span>
<span class="cb-out"></span>
<span class="cb-out">  grafana:</span>
<span class="cb-out">    image: grafana/grafana:latest</span>
<span class="cb-out">    volumes: [grafana:/var/lib/grafana]</span>
<span class="cb-out">    ports: ["3000:3000"]</span>
<span class="cb-out">    environment: {GF_SECURITY_ADMIN_PASSWORD: \${GRAFANA_PASS}}</span>
<span class="cb-out">    networks: [monitoring]</span>
<span class="cb-out"></span>
<span class="cb-out">volumes: {pgdata: {}, grafana: {}}</span>
<span class="cb-out">networks: {data: {}, monitoring: {}}</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DEPLOYMENT COMMANDS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> docker compose up -d db               <span class="cb-cmt"># start DB first</span>
<span class="cb-prompt">$</span> docker compose run --rm db psql -c "CREATE DATABASE analytics" <span class="cb-cmt"># init</span>
<span class="cb-prompt">$</span> docker compose up -d                   <span class="cb-cmt"># start everything</span>
<span class="cb-prompt">$</span> docker compose logs -f pipeline        <span class="cb-cmt"># watch pipeline logs</span>
<span class="cb-prompt">$</span> docker compose exec pipeline python -c "from app import db; db.check_connection()"
<span class="cb-prompt">$</span> docker compose ps                      <span class="cb-cmt"># verify health</span>
<span class="cb-out">NAME        IMAGE          STATUS                 PORTS</span>
<span class="cb-out">db          postgres:16    Up 5m (healthy)        5432/tcp</span>
<span class="cb-out">pipeline    pipeline:v2   Up 4m                  8000/tcp</span>
<span class="cb-out">prometheus  prom/prom...   Up 4m                  0.0.0.0:9090-&gt;9090/tcp</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive &#x2014; Namespaces, cgroups, UnionFS, containerd</h2>
<div class="deepdive-box">
<div class="deepdive-title">&#x2699;&#xFE0F; How Docker Uses Linux Kernel Features to Isolate Containers</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. LINUX NAMESPACES &#x2014; What Isolation Means

   A namespace wraps a global system resource, making it appear
   to processes inside that namespace as if they have their own
   isolated instance of the resource.

   Docker uses 7 namespace types:
   - pid: Container has its own process tree (PID 1 inside = main process)
   - net: Container has its own network interfaces, routing tables
   - mnt: Container has its own filesystem mount tree (UnionFS)
   - uts: Container has its own hostname and domain name
   - ipc: Container has its own SysV IPC, POSIX message queues
   - user: Container can have UIDs that map to different host UIDs
   - cgroup: Container sees its own cgroup hierarchy (cgroups v2)

   Create: clone(CLONE_NEWPID | CLONE_NEWNET | ...) syscall
   Container process is created with all namespaces unshared from host.

2. CONTROL GROUPS (cgroups v2) &#x2014; Resource Limits

   cgroups impose resource limits on groups of processes.
   Docker creates a cgroup for each container:
   /sys/fs/cgroup/system.slice/docker-CONTAINERID.scope/

   Key cgroup controllers:
   - memory.max: hard OOM limit
   - cpu.max: CPU bandwidth (quota/period)
   - io.max: block device I/O limits
   - pids.max: max number of processes

   When a container exceeds memory.max:
   1. Kernel sends SIGKILL to the most memory-hungry process in cgroup
   2. Container gets a "killed" status (exit code 137)
   3. Docker logs: "Container killed due to OOM"

3. UNION FILESYSTEM (OverlayFS) &#x2014; Layered Images

   Docker uses OverlayFS (overlay2 storage driver) on Linux:

   /var/lib/docker/overlay2/LAYER_ID/
   ├── diff/       ← this layer's changes
   ├── link        ← short name for symlink
   ├── lower       ← parent layer IDs (colon-separated)
   └── merged/     ← union mount (only present when container running)

   When you start a container:
   mount -t overlay overlay        -o lowerdir=layer5:layer4:layer3:layer2:layer1,
          upperdir=container-rw/,
          workdir=work/        /merged

   - Read: check upperdir first, then layers top-down
   - Write: copy-on-write into upperdir (container layer)
   - All image layers = read-only. Container layer = read-write.

4. CONTAINERD AND RUNC &#x2014; The Runtime Stack

   Docker (client) &#x2192; dockerd &#x2192; containerd &#x2192; runc &#x2192; container process

   - dockerd: Docker daemon, handles API, image management, networking
   - containerd: Container lifecycle manager (start/stop/exec)
     Runs as a separate daemon: /var/run/containerd/containerd.sock
   - runc: OCI-compliant container runtime (low-level)
     Actually calls clone(), mount(), execve() to create the container
     OCI spec: Open Container Initiative runtime specification

   containerd is portable &#x2014; it's used by Kubernetes (via CRI),
   not just Docker. You can use containerd directly:
   ctr images pull docker.io/library/nginx:latest
   ctr containers create docker.io/library/nginx:latest mynginx

5. CONTAINER NETWORKING &#x2014; veth pairs and iptables

   Docker bridge network implementation:
   1. Create Linux bridge: docker0 (172.17.0.1/16)
   2. For each container: create veth pair (virtual ethernet)
      - vethABC: host side, connected to docker0 bridge
      - eth0: container side, inside network namespace
   3. Assign IP to container eth0: 172.17.0.2
   4. iptables MASQUERADE rule: container traffic NAT'd to host IP

   Port mapping (-p 8080:80):
   iptables -t nat -A DOCKER -p tcp --dport 8080        -j DNAT --to-destination 172.17.0.2:80

   Custom networks use the same mechanism but with a separate bridge
   per network, enabling DNS resolution between containers.
</pre>
</div>
</div><div class="section-block">
<h2 class="section-title"><span class="sec-num">15</span> Complete Reference &#x2014; docker, docker compose, Dockerfile</h2>
<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:28%">Command</th><th>Purpose</th><th style="width:22%">Key Options</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Container Lifecycle</td></tr>
<tr><td style="font-family:monospace;">docker run IMAGE</td><td>Create and start a container</td><td><code>-d</code> detach, <code>-it</code> interactive, <code>--rm</code> auto-remove</td></tr>
<tr><td style="font-family:monospace;">docker ps / ps -a</td><td>List running / all containers</td><td><code>--format</code> custom output</td></tr>
<tr><td style="font-family:monospace;">docker logs CONT</td><td>View stdout/stderr logs</td><td><code>-f</code> follow, <code>--tail N</code>, <code>--since 1h</code></td></tr>
<tr><td style="font-family:monospace;">docker exec -it CONT bash</td><td>Run command in running container</td><td>Debug: <code>exec CONT ps aux</code></td></tr>
<tr><td style="font-family:monospace;">docker stop / rm CONT</td><td>Stop / remove container</td><td><code>rm -f</code> force; <code>container prune</code></td></tr>
<tr><td colspan="3" style="background:#1a2a14;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Images</td></tr>
<tr><td style="font-family:monospace;">docker build -t name .</td><td>Build image from Dockerfile</td><td><code>--no-cache</code>, <code>--target stage</code>, <code>--build-arg</code></td></tr>
<tr><td style="font-family:monospace;">docker pull / push NAME</td><td>Download / upload image</td><td>Login first: <code>docker login registry</code></td></tr>
<tr><td style="font-family:monospace;">docker history IMAGE</td><td>Show layers and sizes</td><td><code>docker inspect IMAGE</code> for full metadata</td></tr>
<tr><td style="font-family:monospace;">docker system prune</td><td>Remove unused resources</td><td><code>-a</code> include unused images, <code>-f</code> no confirm</td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">Networks &amp; Volumes</td></tr>
<tr><td style="font-family:monospace;">docker network create NAME</td><td>Create bridge network</td><td><code>--driver bridge</code>, <code>--subnet</code></td></tr>
<tr><td style="font-family:monospace;">docker volume create NAME</td><td>Create named volume</td><td><code>inspect</code> for Mountpoint</td></tr>
<tr><td style="font-family:monospace;">-v name:/path (run flag)</td><td>Mount named volume</td><td><code>-v /host:/cont</code> bind mount; <code>:ro</code> read-only</td></tr>
<tr><td colspan="3" style="background:#1f1428;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Compose &amp; Dockerfile</td></tr>
<tr><td style="font-family:monospace;">docker compose up -d</td><td>Start entire stack in background</td><td><code>--build</code> rebuild; <code>down</code> stop+remove</td></tr>
<tr><td style="font-family:monospace;">docker compose logs -f SVC</td><td>Follow logs for one service</td><td><code>exec SVC bash</code> for shell</td></tr>
<tr><td style="font-family:monospace;">FROM / RUN / COPY / CMD</td><td>Core Dockerfile instructions</td><td><code>HEALTHCHECK</code>, <code>ARG</code>, <code>ENV</code>, <code>USER</code>, <code>WORKDIR</code></td></tr>
<tr><td style="font-family:monospace;">FROM base AS builder</td><td>Multi-stage build (named stage)</td><td><code>COPY --from=builder</code> to copy artifacts</td></tr>
</tbody>
</table>
</div>
</div><div class="section-block">
<h2 class="section-title"><span class="sec-num">16</span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 &#x2014; Docker Basics</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Run nginx in the background, map port 8080 on the host to 80 in the container, give it the name "webserver"</li>
      <li>View the nginx access logs as they arrive (follow mode)</li>
      <li>Run a shell inside the running nginx container and explore <code>/etc/nginx/</code></li>
      <li>Check how much memory nginx is using</li>
      <li>Stop and remove the nginx container, then verify it's gone</li>
      <li>Pull the <code>python:3.12-slim</code> image. Compare its size to <code>python:3.12</code>.</li>
      <li>Use <code>docker history</code> to see the layers of the python:3.12-slim image</li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 &#x2014; Dockerfile and Images</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Write a Dockerfile for a Python script that reads a CSV and prints statistics. Use python:3.12-slim base.</li>
      <li>Add a .dockerignore file to exclude .git, __pycache__, .env, .venv</li>
      <li>Build the image and tag it as <code>csvstats:1.0</code></li>
      <li>Run it with a bind mount to pass in a CSV file from your host</li>
      <li>Add a HEALTHCHECK that verifies Python can import the main module</li>
      <li>Add a non-root USER to the Dockerfile; rebuild and verify it runs as that user</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 &#x2014; Multi-Container Stack with Compose</h4>
    <p>Build a docker-compose stack with: your pipeline app, PostgreSQL, and Redis:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Write a docker-compose.yml with all three services on a shared custom network</li>
      <li>Add a healthcheck to PostgreSQL; make the pipeline service wait for it with <code>condition: service_healthy</code></li>
      <li>Use a named volume for PostgreSQL data; verify it persists across <code>docker compose down</code> and up</li>
      <li>Pass secrets via .env file; verify the container doesn't have them in <code>docker inspect</code>'s Env array</li>
      <li>Run the stack, verify all services are healthy, exec into the pipeline container and connect to PostgreSQL by hostname</li>
      <li>Scale the pipeline service to 2 instances (change port mapping to use random host ports)</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 &#x2014; Multi-Stage Build &amp; Security</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Convert a single-stage Dockerfile to multi-stage: builder installs gcc + compiles, final stage is slim</li>
      <li>Measure the size difference between single-stage and multi-stage builds</li>
      <li>Add <code>--read-only --tmpfs /tmp</code> to the docker run command; fix any permission issues in the app</li>
      <li>Run with <code>--cap-drop ALL --security-opt no-new-privileges</code>; verify the container still works</li>
      <li>Scan the final image with <code>docker scout cves</code> or <code>trivy</code>; check for critical CVEs in the base image</li>
      <li>Create a volume backup script that archives a PostgreSQL data volume to a timestamped tar.gz</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 &#x2014; Production Data Pipeline in Docker</h4>
    <p>Build a complete containerised data pipeline system:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Multi-stage Dockerfile:</strong> Builder stage compiles all Python deps; final stage is python:3.12-slim with no build tools, non-root user, read-only filesystem, health check endpoint</li>
      <li><strong>docker-compose.yml:</strong> pipeline service + PostgreSQL 16 + Redis + Grafana + Prometheus. All on separate named networks. Database on internal-only network (no exposed ports).</li>
      <li><strong>Environment management:</strong> .env file with all secrets. Compose uses env_file. App reads secrets from files (not env vars) via Docker Compose secrets.</li>
      <li><strong>Resource limits:</strong> pipeline container limited to 4GB memory and 2 CPUs; PostgreSQL limited to 2GB and 1 CPU</li>
      <li><strong>Automation:</strong> Write a deploy.sh script that: pulls latest image, runs database migrations as a one-shot container, performs rolling replacement of the pipeline container with zero downtime</li>
      <li><strong>CI/CD:</strong> GitHub Actions workflow that builds, tests, scans for vulnerabilities, and pushes to GHCR with both <code>:latest</code> and <code>:SHA</code> tags only on main branch</li>
    </ol>
    <p><strong>Must handle: container restart on crash, DB connection retry, graceful shutdown (SIGTERM handler), log rotation, volume backup to S3-compatible storage.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">Ravi's Deployment Script &#x2014; Day 600</div>
    <p>The ImportError was fixed in three minutes. Not by installing Python 3.11 on the CentOS server &#x2014; that would have taken hours &#x2014; but by building a Docker image that contained Python 3.11, the exact right versions of every library, and the application code. The image was 134MB. It deployed to the production server in forty seconds. It ran identically on CentOS 7 as it had on Ubuntu 22.04.</p>
    <p>Six months later, the team was running twelve services: data pipeline, API, PostgreSQL, Redis, Grafana, Prometheus, Jupyter, and five internal tools. All of them containerised. The entire stack spun up from scratch in ninety seconds with <code>docker compose up -d</code>. A new developer could be running the full production-equivalent environment on their laptop within ten minutes of cloning the repository.</p>
    <p>"The container is the unit of deployment," Priya had said. "Not the script. Not the virtual machine. The container. Everything it needs, packed together, portable, reproducible, disposable."</p>
    <p><strong>Docker doesn't solve software. It makes the environment a solved problem &#x2014; so you can spend your time on the software.</strong></p>
  </div>
</div>
</div>
`
};