var git_version_control = {
    title: "Git Version Control",
    description: "Master Git at expert depth & understand the object model (blobs, trees, commits), three working areas, branching and merging strategies, rebase versus merge trade-offs, interactive rebase for clean history, reflog for disaster recovery, and practical workflows for data engineering including secrets management, Git LFS for large files, and reproducible pipeline versioning.",
    content: `
<style>
@keyframes gt-flow  { 0%{stroke-dashoffset:28}  100%{stroke-dashoffset:0} }
@keyframes gt-pulse { 0%,100%{opacity:1}         50%{opacity:.15} }
@keyframes gt-blink { 0%,100%{fill:#3fb950;stroke:#3fb950} 50%{fill:#0a1a0a;stroke:#238636} }
@keyframes gt-merge { 0%,100%{fill:#1a1428;stroke:#bc8cff} 50%{fill:#2a1a3a;stroke:#e0a0ff} }
@keyframes gt-head  { 0%,100%{fill:#0e1824;stroke:#58a6ff} 50%{fill:#1a2a3a;stroke:#80c8ff} }
.gt-flow  { stroke-dasharray:7 5; animation: gt-flow  .9s linear infinite; }
.gt-pulse { animation: gt-pulse 1.8s ease-in-out infinite; }
.gt-blink { animation: gt-blink 2.4s ease-in-out infinite; }
.gt-merge { animation: gt-merge 2s ease-in-out infinite; }
.gt-head  { animation: gt-head  2.2s ease-in-out infinite; }
</style>
<div class="story-panel">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">Ravi Deletes the Production Config & Day 610</div>
    <br>
    <p>It was 11 PM when Ravi accidentally ran <code>rm -rf config/</code> from the wrong directory. Gone: two weeks of carefully tuned pipeline configuration files. No backup. His team's deployment was in eight hours.</p>
    <br>
    <p>Then he remembered: the project was a Git repository. He ran <code>git status</code>. Git showed the deletions as unstaged changes. He ran <code>git checkout config/</code>. In two seconds, every file was restored exactly as it had been in the last commit.</p>
    <br>
    <p>"This is what version control is for," Priya said the next morning when he told her. "Not just collaboration. Not just history. It's a time machine. It's the difference between a mistake being a catastrophe and being a three-second recovery."</p>
    <br>
    <p>That week Ravi learned Git properly. Not just <code>git add</code> and <code>git commit</code>. The object model. What HEAD actually is. What a branch actually is. How rebase differs from merge. How to read a conflict and resolve it without guessing. How to use <code>git bisect</code> to find the commit that introduced a bug. How to write commit messages that a colleague can understand six months later.</p>
  </div>
</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Git Object Model &#x2014; Blobs, Trees, Commits, Refs</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="gt-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="gt-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="gt-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="gt-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="gt-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="gt-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="290" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Git Object Model &#x2014; Four Object Types, Everything is a SHA-1 Hash</text>
  <!-- commit -->
  <rect x="14"  y="40" width="190" height="104" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="109" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">commit</text>
  <text x="24"  y="80"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">tree  4b825d...</text>
  <text x="24"  y="96"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">parent  d3a4f1...</text>
  <text x="24"  y="112" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">author  Ravi 1705...</text>
  <text x="24"  y="128" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">committer ...</text>
  <text x="24"  y="132" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">SHA: a1b2c3d4...</text>
  <!-- tree -->
  <line x1="204" y1="70" x2="244" y2="70" stroke="#ffa657" stroke-width="1.5" marker-end="url(#gt-orn)"/>
  <rect x="244" y="40" width="190" height="104" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="339" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">tree</text>
  <text x="254" y="80"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">100644 blob f8e2.. README</text>
  <text x="254" y="96"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">100644 blob 9a3c.. main.py</text>
  <text x="254" y="112" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">040000 tree 3c8a.. src/</text>
  <text x="254" y="128" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">040000 tree 7d1b.. tests/</text>
  <!-- blobs -->
  <line x1="434" y1="78" x2="474" y2="78" stroke="#3fb950" stroke-width="1.5" marker-end="url(#gt-grn)"/>
  <rect x="474" y="40" width="186" height="84" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="567" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">blob</text>
  <text x="484" y="80"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">Raw file contents</text>
  <text x="484" y="96"  font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Same content &#x2192; same SHA</text>
  <text x="484" y="112" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Stored once even if in</text>
  <text x="484" y="128" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">multiple commits/trees</text>
  <!-- tag -->
  <rect x="666" y="40" width="140" height="84" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="736" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">tag</text>
  <text x="676" y="80"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">object  a1b2c3...</text>
  <text x="676" y="96"  font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">type  commit</text>
  <text x="676" y="112" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">tag  v2.1.0</text>
  <text x="736" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">annotated tag</text>
  <!-- .git structure -->
  <rect x="14"  y="162" width="792" height="118" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="182" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">.git/ directory structure:</text>
  <text x="24"  y="200" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">.git/HEAD</text>
  <text x="120" y="200" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  &#x2192; ref: refs/heads/main   (what branch you're on)</text>
  <text x="24"  y="216" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">.git/objects/</text>
  <text x="128" y="216" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  &#x2192; all commit/tree/blob/tag objects (content-addressed)</text>
  <text x="24"  y="232" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">.git/refs/</text>
  <text x="100" y="232" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  &#x2192; heads/(branches), remotes/(remote branches), tags/</text>
  <text x="24"  y="248" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">.git/index</text>
  <text x="116" y="248" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  &#x2192; staging area (what will go into next commit)</text>
  <text x="24"  y="264" font-family="'Courier New',monospace" font-size="9.5" fill="#e6edf3">.git/config</text>
  <text x="116" y="264" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">  &#x2192; repo-local git configuration (remotes, merge strategies)</text>
  <text x="24"  y="280" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Everything in Git is immutable + content-addressed. SHA changes if content changes. History cannot be rewritten without changing all downstream SHAs.</text>

</svg>
</div>
<p class="diagram-caption">Git stores 4 object types: <strong>blob</strong> (file contents), <strong>tree</strong> (directory listing), <strong>commit</strong> (snapshot pointer + metadata), <strong>tag</strong> (annotated pointer). Every object is identified by the SHA-1 hash of its contents.</p>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 12 — Setup, init, config, SSH keys</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INITIAL SETUP &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git config --global user.name "Ravi Kumar"
<span class="cb-prompt">$</span> git config --global user.email "ravi@example.com"
<span class="cb-prompt">$</span> git config --global init.defaultBranch main
<span class="cb-prompt">$</span> git config --global core.editor vim
<span class="cb-prompt">$</span> git config --global pull.rebase false        <span class="cb-cmt"># pull = merge (default)</span>
<span class="cb-prompt">$</span> git config --global merge.conflictstyle diff3 <span class="cb-cmt"># show base in conflicts</span>
<span class="cb-prompt">$</span> git config --global rebase.autosquash true    <span class="cb-cmt"># auto-squash fixup! commits</span>
<span class="cb-prompt">$</span> git config --list --show-origin               <span class="cb-cmt"># all config + source file</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CREATE A REPO &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git init                                     <span class="cb-cmt"># new repo in current dir</span>
<span class="cb-prompt">$</span> git init my-project                          <span class="cb-cmt"># new repo in new dir</span>
<span class="cb-prompt">$</span> git clone https://github.com/user/repo.git   <span class="cb-cmt"># clone from GitHub</span>
<span class="cb-prompt">$</span> git clone git@github.com:user/repo.git        <span class="cb-cmt"># clone via SSH</span>
<span class="cb-prompt">$</span> git clone --depth 1 https://github.com/...   <span class="cb-cmt"># shallow clone (latest only)</span>
<span class="cb-prompt">$</span> git clone --branch v2.1.0 https://...        <span class="cb-cmt"># clone specific branch/tag</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; SSH KEY SETUP FOR GITHUB &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> ssh-keygen -t ed25519 -C "ravi@example.com"  <span class="cb-cmt"># generate key pair</span>
<span class="cb-prompt">$</span> cat ~/.ssh/id_ed25519.pub                     <span class="cb-cmt"># add this to GitHub Settings</span>
<span class="cb-prompt">$</span> ssh -T git@github.com                         <span class="cb-cmt"># test SSH connection</span>
<span class="cb-out">Hi ravi! You've successfully authenticated</span>
<span class="cb-cmt"># Multiple GitHub accounts:</span>
<span class="cb-out">Host github-work</span>
<span class="cb-out">    HostName github.com</span>
<span class="cb-out">    User git</span>
<span class="cb-out">    IdentityFile ~/.ssh/id_ed25519_work</span>
<span class="cb-cmt"># Then: git clone git@github-work:company/repo.git</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Three Areas &#x2014; Working Tree, Staging Index, Repository</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="gt-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="gt-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="gt-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="gt-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="gt-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="gt-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="200" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Three Areas &#x2014; Working Tree, Staging Index, Repository</text>
  <!-- Working tree -->
  <rect x="14"  y="40" width="230" height="120" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="129" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Working Tree</text>
  <text x="24"  y="80"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Files on disk (what you see)</text>
  <text x="24"  y="96"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Modified: tracked changes not staged</text>
  <text x="24"  y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Untracked: new files git doesn't know</text>
  <text x="24"  y="128" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">git diff  (working &#x2192; staged)</text>
  <text x="24"  y="144" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">git restore FILE  (discard changes)</text>
  <!-- Stage arrow -->
  <line x1="244" y1="100" x2="296" y2="100" stroke="#3fb950" stroke-width="2.5" marker-end="url(#gt-grn)" class="gt-flow"/>
  <text x="270" y="91"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">git add</text>
  <line x1="296" y1="114" x2="244" y2="114" stroke="#f85149" stroke-width="1.5" marker-end="url(#gt-red)"/>
  <text x="270" y="126" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#f85149">git restore --staged</text>
  <!-- Staging area -->
  <rect x="296" y="40" width="230" height="120" rx="8" fill="#1f1428" stroke="#bc8cff" stroke-width="2"/>
  <text x="411" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">Staging Area (Index)</text>
  <text x="306" y="80"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Snapshot of what will be committed</text>
  <text x="306" y="96"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Allows partial commits (some files)</text>
  <text x="306" y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">git add -p: stage by hunk/line</text>
  <text x="306" y="128" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">git diff --staged  (staged &#x2192; HEAD)</text>
  <!-- Commit arrow -->
  <line x1="526" y1="100" x2="578" y2="100" stroke="#3fb950" stroke-width="2.5" marker-end="url(#gt-grn)" class="gt-flow"/>
  <text x="552" y="91"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">git commit</text>
  <line x1="578" y1="114" x2="526" y2="114" stroke="#f85149" stroke-width="1.5" marker-end="url(#gt-red)"/>
  <text x="552" y="126" text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#f85149">git reset HEAD~1</text>
  <!-- Repository -->
  <rect x="578" y="40" width="228" height="120" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="692" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Repository (.git/)</text>
  <text x="588" y="80"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">All commits, all history</text>
  <text x="588" y="96"  font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Immutable object store</text>
  <text x="588" y="112" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Branches = named SHA pointers</text>
  <text x="588" y="128" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">git log (history)</text>
  <text x="588" y="144" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">git show SHA (object)</text>
  <!-- status summary -->
  <rect x="14"  y="170" width="792" height="24" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="26"  y="186" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#3fb950">git status</text>
  <text x="92"  y="186" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> shows both areas: "Changes to be committed" (staged) and "Changes not staged" (working tree)</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 12 — Stage, commit, status, diff, .gitignore</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; STAGING AND COMMITTING &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git status                            <span class="cb-cmt"># what's changed</span>
<span class="cb-prompt">$</span> git add file.py                        <span class="cb-cmt"># stage one file</span>
<span class="cb-prompt">$</span> git add src/                           <span class="cb-cmt"># stage whole directory</span>
<span class="cb-prompt">$</span> git add -A                             <span class="cb-cmt"># stage all changes (new+modified+deleted)</span>
<span class="cb-prompt">$</span> git add -p                             <span class="cb-cmt"># interactive: stage by hunk</span>
<span class="cb-out">@@ -10,7 +10,7 @@</span>
<span class="cb-out"> def process(data):</span>
<span class="cb-out">-    return data.transform()</span>
<span class="cb-out">+    return data.transform().validate()</span>
<span class="cb-out">Stage this hunk [y,n,q,a,d,e,?]?</span>
<span class="cb-cmt"># y=yes n=no s=split q=quit e=edit manually</span>

<span class="cb-prompt">$</span> git commit -m "feat: add input validation to process()"
<span class="cb-prompt">$</span> git commit                             <span class="cb-cmt"># opens editor for message</span>
<span class="cb-prompt">$</span> git commit -am "fix: update config"    <span class="cb-cmt"># -a: auto-stage tracked files</span>
<span class="cb-prompt">$</span> git commit --amend                     <span class="cb-cmt"># edit last commit (message + content)</span>
<span class="cb-prompt">$</span> git commit --amend --no-edit           <span class="cb-cmt"># amend without changing message</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DIFF &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git diff                               <span class="cb-cmt"># unstaged changes (working &#x2192; staged)</span>
<span class="cb-prompt">$</span> git diff --staged                      <span class="cb-cmt"># staged changes (staged &#x2192; HEAD)</span>
<span class="cb-prompt">$</span> git diff HEAD                          <span class="cb-cmt"># all changes (working &#x2192; HEAD)</span>
<span class="cb-prompt">$</span> git diff main..feature                 <span class="cb-cmt"># between two branches</span>
<span class="cb-prompt">$</span> git diff HEAD~3..HEAD -- file.py       <span class="cb-cmt"># specific file, last 3 commits</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; .gitignore &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out"># Python .gitignore essentials:</span>
<span class="cb-out">__pycache__/</span>
<span class="cb-out">*.pyc</span>
<span class="cb-out">.env</span>
<span class="cb-out">.venv/</span>
<span class="cb-out">*.egg-info/</span>
<span class="cb-out">dist/</span>
<span class="cb-out">.DS_Store    # macOS</span>
<span class="cb-out">*.log</span>
<span class="cb-out">data/*.csv   # ignore data files but track schema</span>
<span class="cb-prompt">$</span> git check-ignore -v some-file.csv      <span class="cb-cmt"># why is this file ignored?</span>
<span class="cb-prompt">$</span> git rm --cached file.py               <span class="cb-cmt"># untrack without deleting</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Reading History &#x2014; git log, blame, show</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 12 — git log: reading history, filtering, formatting</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; READING HISTORY &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git log                               <span class="cb-cmt"># full history</span>
<span class="cb-prompt">$</span> git log --oneline                     <span class="cb-cmt"># one line per commit</span>
<span class="cb-out">a1b2c3d feat: add validation layer</span>
<span class="cb-out">d4e5f6g fix: handle null values in CSV parser</span>
<span class="cb-out">7h8i9j0 refactor: extract process() to pipeline module</span>
<span class="cb-prompt">$</span> git log --oneline --graph --all        <span class="cb-cmt"># ASCII branch graph</span>
<span class="cb-out">* a1b2c3d (HEAD -> main, origin/main) feat: add validation</span>
<span class="cb-out">| * d4e5f6g (feature/auth) feat: add JWT auth</span>
<span class="cb-out">|/</span>
<span class="cb-out">* 7h8i9j0 refactor: extract module</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; FILTERING &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git log -5                             <span class="cb-cmt"># last 5 commits</span>
<span class="cb-prompt">$</span> git log --author="Ravi"                <span class="cb-cmt"># by author</span>
<span class="cb-prompt">$</span> git log --grep="validation"            <span class="cb-cmt"># by commit message keyword</span>
<span class="cb-prompt">$</span> git log --since="2 weeks ago"          <span class="cb-cmt"># time range</span>
<span class="cb-prompt">$</span> git log --since="2024-01-01" --until="2024-02-01"
<span class="cb-prompt">$</span> git log -- src/pipeline.py            <span class="cb-cmt"># commits touching a file</span>
<span class="cb-prompt">$</span> git log -p -- src/pipeline.py         <span class="cb-cmt"># with diffs for that file</span>
<span class="cb-prompt">$</span> git log -S "process_csv"              <span class="cb-cmt"># "pickaxe": added/removed this string</span>
<span class="cb-prompt">$</span> git log main..feature                 <span class="cb-cmt"># commits in feature not in main</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INSPECTING COMMITS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git show a1b2c3d                      <span class="cb-cmt"># show commit details + diff</span>
<span class="cb-prompt">$</span> git show HEAD~2                       <span class="cb-cmt"># two commits before HEAD</span>
<span class="cb-prompt">$</span> git show HEAD:src/main.py             <span class="cb-cmt"># file as it was in HEAD</span>
<span class="cb-prompt">$</span> git show a1b2c3d:config.json          <span class="cb-cmt"># file as it was in commit</span>
<span class="cb-prompt">$</span> git blame src/pipeline.py             <span class="cb-cmt"># who wrote each line + when</span>
<span class="cb-prompt">$</span> git blame -L 10,20 src/pipeline.py   <span class="cb-cmt"># specific line range</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Branches &#x2014; Create, Merge, Delete</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 290" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="gt-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="gt-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="gt-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="gt-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="gt-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="gt-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="290" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Branching &amp; Merging &#x2014; Commits, Branches, HEAD, Merge Strategies</text>
  <!-- Main branch commits -->
  <circle cx="60"  cy="90" r="16" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="60"  y="95"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">A</text>
  <line x1="76" y1="90" x2="124" y2="90" stroke="#3fb950" stroke-width="2" marker-end="url(#gt-grn)"/>
  <circle cx="140" cy="90" r="16" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="140" y="95"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">B</text>
  <line x1="156" y1="90" x2="204" y2="90" stroke="#3fb950" stroke-width="2" marker-end="url(#gt-grn)"/>
  <circle cx="220" cy="90" r="16" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="220" y="95"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">C</text>
  <!-- Feature branch splits from C -->
  <line x1="234" y1="82" x2="294" y2="52" stroke="#58a6ff" stroke-width="2" marker-end="url(#gt-blu)"/>
  <circle cx="310" cy="44" r="16" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="310" y="49"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">F1</text>
  <line x1="326" y1="44" x2="374" y2="44" stroke="#58a6ff" stroke-width="2" marker-end="url(#gt-blu)"/>
  <circle cx="390" cy="44" r="16" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="390" y="49"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">F2</text>
  <text x="350" y="25"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#58a6ff">feature/new-api</text>
  <!-- main continues -->
  <line x1="236" y1="90" x2="284" y2="90" stroke="#3fb950" stroke-width="2" marker-end="url(#gt-grn)"/>
  <circle cx="300" cy="90" r="16" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="300" y="95"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">D</text>
  <text x="200" y="116" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#3fb950">main</text>
  <!-- HEAD label -->
  <rect x="280" y="112" width="40" height="18" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5" class="gt-head"/>
  <text x="300" y="125" text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#58a6ff">HEAD</text>
  <line x1="300" y1="112" x2="300" y2="106" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#gt-blu)"/>
  <!-- Merge commit -->
  <line x1="406" y1="50" x2="456" y2="76" stroke="#bc8cff" stroke-width="2" marker-end="url(#gt-pur)"/>
  <line x1="316" y1="90" x2="456" y2="90" stroke="#3fb950" stroke-width="2" marker-end="url(#gt-grn)"/>
  <circle cx="470" cy="90" r="18" fill="#1a1428" stroke="#bc8cff" stroke-width="2.5" class="gt-merge"/>
  <text x="470" y="95"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">M</text>
  <text x="470" y="70"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">merge commit</text>
  <!-- Rebase path (below) -->
  <text x="26"  y="156" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">vs. Rebase (rewrites feature branch on top of latest main):</text>
  <circle cx="60"  cy="196" r="14" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="60"  y="201" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">A</text>
  <line x1="74" y1="196" x2="106" y2="196" stroke="#3fb950" stroke-width="1.5" marker-end="url(#gt-grn)"/>
  <circle cx="120" cy="196" r="14" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="120" y="201" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">B</text>
  <line x1="134" y1="196" x2="166" y2="196" stroke="#3fb950" stroke-width="1.5" marker-end="url(#gt-grn)"/>
  <circle cx="180" cy="196" r="14" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="180" y="201" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">C</text>
  <line x1="194" y1="196" x2="226" y2="196" stroke="#3fb950" stroke-width="1.5" marker-end="url(#gt-grn)"/>
  <circle cx="240" cy="196" r="14" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="240" y="201" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#3fb950">D</text>
  <line x1="254" y1="196" x2="286" y2="196" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#gt-blu)" class="gt-flow"/>
  <circle cx="300" cy="196" r="14" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="300" y="201" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">F1'</text>
  <line x1="314" y1="196" x2="346" y2="196" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#gt-blu)" class="gt-flow"/>
  <circle cx="360" cy="196" r="14" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="360" y="201" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">F2'</text>
  <text x="330" y="224" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">F1/F2 replayed on top of D (new SHAs: F1', F2')</text>
  <text x="600" y="196" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">merge: preserves branch history</text>
  <text x="600" y="212" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#58a6ff">rebase: linear history (cleaner log)</text>
  <text x="600" y="228" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">Never rebase public/shared branches!</text>
  <!-- note -->
  <rect x="14"  y="248" width="792" height="32" rx="5" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"  y="264" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">A branch is just a 41-byte file in .git/refs/heads/ containing a SHA. Creating a branch is instant and cheap. </text>
  <text x="26"  y="276" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">HEAD</text><text x="62" y="276" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> = pointer to current branch (or detached: direct SHA). Moving HEAD = switching branches.</text>

</svg>
</div>
<p class="diagram-caption">A branch is not a copy of the code. It is a 41-byte file containing a SHA hash. Git branches are instant to create, instant to switch, and cost essentially nothing.</p>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 12 — Branches: create, switch, merge, delete, rename</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; BRANCH OPERATIONS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git branch                            <span class="cb-cmt"># list local branches</span>
<span class="cb-prompt">$</span> git branch -a                          <span class="cb-cmt"># list local + remote branches</span>
<span class="cb-prompt">$</span> git branch -v                          <span class="cb-cmt"># with last commit</span>
<span class="cb-prompt">$</span> git branch feature/csv-parser         <span class="cb-cmt"># create branch at HEAD</span>
<span class="cb-prompt">$</span> git branch feature/csv-parser v2.1.0  <span class="cb-cmt"># create at tag</span>
<span class="cb-prompt">$</span> git switch feature/csv-parser         <span class="cb-cmt"># switch to branch (modern)</span>
<span class="cb-prompt">$</span> git switch -c feature/new-parser      <span class="cb-cmt"># create + switch in one step</span>
<span class="cb-prompt">$</span> git checkout -b feature/new-parser    <span class="cb-cmt"># legacy equivalent</span>
<span class="cb-prompt">$</span> git switch -                          <span class="cb-cmt"># switch to previous branch</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; MERGE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git switch main
<span class="cb-prompt">$</span> git merge feature/csv-parser          <span class="cb-cmt"># merge into current branch</span>
<span class="cb-prompt">$</span> git merge --no-ff feature/csv-parser   <span class="cb-cmt"># always create merge commit</span>
<span class="cb-prompt">$</span> git merge --squash feature/csv-parser  <span class="cb-cmt"># squash all commits into one</span>
<span class="cb-prompt">$</span> git merge --abort                      <span class="cb-cmt"># abort a conflicted merge</span>
<span class="cb-prompt">$</span> git branch -d feature/csv-parser      <span class="cb-cmt"># delete merged branch</span>
<span class="cb-prompt">$</span> git branch -D feature/wip             <span class="cb-cmt"># force delete unmerged branch</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; RENAME / TRACK REMOTE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git branch -m feature/old feature/new  <span class="cb-cmt"># rename</span>
<span class="cb-prompt">$</span> git branch --set-upstream-to=origin/main main  <span class="cb-cmt"># set tracking</span>
<span class="cb-prompt">$</span> git branch -vv                          <span class="cb-cmt"># show tracking relationships</span>
<span class="cb-cmt"># Clean up remote-tracking branches that no longer exist:</span>
<span class="cb-prompt">$</span> git fetch --prune                        <span class="cb-cmt"># remove stale origin/* refs</span>
<span class="cb-prompt">$</span> git remote prune origin                  <span class="cb-cmt"># same effect</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Remotes &#x2014; fetch, pull, push, tracking branches</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="gt-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="gt-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="gt-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="gt-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="gt-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="gt-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Remote Operations &#x2014; fetch, pull, push, tracking branches</text>
  <!-- Local repo -->
  <rect x="14"  y="38" width="360" height="136" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="194" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Local Repository</text>
  <rect x="24"  y="66"  width="155" height="28" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="101" y="84"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">main  &#x2192; a1b2c3</text>
  <rect x="24"  y="102" width="155" height="28" rx="5" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="101" y="120" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">feature &#x2192; d4e5f6</text>
  <text x="24"  y="150" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Local branches</text>
  <rect x="195" y="66"  width="165" height="60" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="278" y="84"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" font-weight="bold" fill="#58a6ff">Remote-tracking</text>
  <text x="205" y="100" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">origin/main &#x2192; a1b2c3</text>
  <text x="205" y="116" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">origin/feature &#x2192; d4e5</text>
  <text x="278" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Read-only local cache</text>
  <!-- Arrows -->
  <line x1="374" y1="90" x2="416" y2="90" stroke="#ffa657" stroke-width="2.5" marker-end="url(#gt-orn)" class="gt-flow"/>
  <text x="395" y="81"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#3fb950">push</text>
  <line x1="416" y1="106" x2="374" y2="106" stroke="#ffa657" stroke-width="2.5" marker-end="url(#gt-orn)" class="gt-flow"/>
  <text x="395" y="118" text-anchor="middle" font-family="'Courier New',monospace" font-size="8.5" fill="#58a6ff">fetch</text>
  <!-- Remote -->
  <rect x="416" y="38" width="390" height="136" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="611" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Remote Repository (origin)</text>
  <rect x="426" y="66"  width="165" height="28" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="509" y="84"  text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">main  &#x2192; a1b2c3</text>
  <rect x="426" y="102" width="165" height="28" rx="5" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="509" y="120" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">feature &#x2192; d4e5f6</text>
  <text x="611" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">GitHub / GitLab / Bitbucket</text>
  <!-- fetch vs pull note -->
  <rect x="14"  y="184" width="792" height="20" rx="4" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26"  y="199" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">fetch = download commits, update origin/*, don&#x27;t change local branches.  </text>
  <text x="330" y="199" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">pull = fetch + merge  (or fetch + rebase with pull --rebase)</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 12 — Remote: push, pull, fetch, remotes, tracking</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; REMOTES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git remote -v                           <span class="cb-cmt"># list remotes with URLs</span>
<span class="cb-out">origin  git@github.com:ravi/pipeline.git (fetch)</span>
<span class="cb-out">origin  git@github.com:ravi/pipeline.git (push)</span>
<span class="cb-prompt">$</span> git remote add upstream https://github.com/org/repo.git
<span class="cb-prompt">$</span> git remote set-url origin git@github.com:ravi/newname.git  <span class="cb-cmt"># change URL</span>
<span class="cb-prompt">$</span> git remote remove upstream

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; FETCH vs PULL &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git fetch                               <span class="cb-cmt"># download all remotes, update origin/*</span>
<span class="cb-prompt">$</span> git fetch origin                        <span class="cb-cmt"># fetch from specific remote</span>
<span class="cb-prompt">$</span> git fetch --all                         <span class="cb-cmt"># fetch from all remotes</span>
<span class="cb-prompt">$</span> git fetch --prune                       <span class="cb-cmt"># fetch + delete stale remote refs</span>
<span class="cb-cmt"># After fetch, inspect before merging:</span>
<span class="cb-prompt">$</span> git log origin/main..main              <span class="cb-cmt"># my unpushed commits</span>
<span class="cb-prompt">$</span> git log main..origin/main              <span class="cb-cmt"># remote commits not yet local</span>
<span class="cb-prompt">$</span> git diff main..origin/main             <span class="cb-cmt"># diff with remote</span>

<span class="cb-prompt">$</span> git pull                               <span class="cb-cmt"># fetch + merge (or rebase if configured)</span>
<span class="cb-prompt">$</span> git pull --rebase                      <span class="cb-cmt"># fetch + rebase (linear history)</span>
<span class="cb-prompt">$</span> git pull origin main                   <span class="cb-cmt"># explicit remote + branch</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; PUSH &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git push                               <span class="cb-cmt"># push current branch to tracking remote</span>
<span class="cb-prompt">$</span> git push origin main                   <span class="cb-cmt"># explicit</span>
<span class="cb-prompt">$</span> git push -u origin feature/csv-parser  <span class="cb-cmt"># push + set upstream tracking</span>
<span class="cb-prompt">$</span> git push --force-with-lease            <span class="cb-cmt"># safe force push (fail if remote changed)</span>
<span class="cb-prompt">$</span> git push origin --delete feature/old  <span class="cb-cmt"># delete remote branch</span>
<span class="cb-prompt">$</span> git push --tags                        <span class="cb-cmt"># push all tags</span>
<span class="cb-prompt">$</span> git push origin v2.1.0                 <span class="cb-cmt"># push specific tag</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Rebase, Cherry-pick &amp; Interactive Rebase</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="gt-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="gt-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="gt-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="gt-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="gt-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="gt-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="190" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Interactive Rebase &#x2014; Rewriting History Safely</text>
  <!-- Commits before rebase -->
  <text x="26"  y="48"  font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Before: messy feature branch commits</text>
  <circle cx="80"  cy="82" r="16" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="80"  y="87"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#58a6ff">wip1</text>
  <line x1="96" y1="82" x2="124" y2="82" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#gt-blu)"/>
  <circle cx="140" cy="82" r="16" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="140" y="87"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#58a6ff">wip2</text>
  <line x1="156" y1="82" x2="184" y2="82" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#gt-blu)"/>
  <circle cx="200" cy="82" r="16" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="200" y="87"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#58a6ff">fixup</text>
  <line x1="216" y1="82" x2="244" y2="82" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#gt-blu)"/>
  <circle cx="260" cy="82" r="16" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="260" y="87"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#58a6ff">typo</text>
  <line x1="276" y1="82" x2="304" y2="82" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#gt-blu)"/>
  <circle cx="320" cy="82" r="16" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="320" y="87"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#58a6ff">done</text>
  <!-- Arrow -->
  <line x1="360" y1="82" x2="420" y2="82" stroke="#ffa657" stroke-width="2.5" marker-end="url(#gt-orn)"/>
  <text x="390" y="72"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">git rebase -i</text>
  <text x="390" y="97"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">HEAD~5</text>
  <!-- After rebase -->
  <text x="440" y="48"  font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">After: clean, single logical commit</text>
  <circle cx="490" cy="82" r="16" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="490" y="87"  text-anchor="middle" font-family="'Courier New',monospace" font-size="8" fill="#3fb950">clean</text>
  <!-- Commands list -->
  <rect x="14"  y="112" width="792" height="70" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"  y="130" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Interactive rebase commands (in the editor):</text>
  <text x="26"  y="148" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">pick</text>    <text x="60"  y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> keep commit as-is  </text>
  <text x="190" y="148" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">reword</text>  <text x="242" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> edit commit message  </text>
  <text x="380" y="148" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">edit</text>    <text x="416" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> stop and amend commit  </text>
  <text x="572" y="148" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">squash</text>  <text x="622" y="148" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> combine with previous</text>
  <text x="26"  y="165" font-family="'Courier New',monospace" font-size="9.5" fill="#bc8cff">fixup</text>   <text x="70"  y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> squash, discard message  </text>
  <text x="210" y="165" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">drop</text>    <text x="248" y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> delete commit entirely  </text>
  <text x="380" y="165" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">exec</text>    <text x="418" y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e"> run a shell command after commit  </text>
  <text x="590" y="165" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#f85149">Never rebase pushed commits!</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 12 — Rebase: standard, interactive, --onto, cherry-pick</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; REBASE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Keep feature branch up-to-date with main:</span>
<span class="cb-prompt">$</span> git switch feature/csv-parser
<span class="cb-prompt">$</span> git rebase main                        <span class="cb-cmt"># replay feature commits on top of main</span>
<span class="cb-cmt"># Conflict during rebase:</span>
<span class="cb-cmt"># edit conflicted files, git add, then:</span>
<span class="cb-prompt">$</span> git rebase --continue                  <span class="cb-cmt"># continue after conflict resolution</span>
<span class="cb-prompt">$</span> git rebase --abort                     <span class="cb-cmt"># abandon, restore pre-rebase state</span>
<span class="cb-prompt">$</span> git rebase --skip                      <span class="cb-cmt"># skip this commit (it's empty after conflict)</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; INTERACTIVE REBASE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git rebase -i HEAD~4                   <span class="cb-cmt"># interactive: last 4 commits</span>
<span class="cb-prompt">$</span> git rebase -i main                     <span class="cb-cmt"># interactive: all commits since main</span>
<span class="cb-cmt"># In the editor, each line:  pick/reword/edit/squash/fixup/drop  SHA  message</span>
<span class="cb-cmt"># Squash wip commits into one feature commit before PR</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; REBASE --ONTO (move branch to different base) &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Move feature commits off old-base onto new-base:</span>
<span class="cb-prompt">$</span> git rebase --onto main old-base feature  <span class="cb-cmt"># syntax: --onto newbase oldbase branch</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CHERRY-PICK &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Apply a specific commit from another branch:</span>
<span class="cb-prompt">$</span> git cherry-pick a1b2c3d               <span class="cb-cmt"># apply commit to current branch</span>
<span class="cb-prompt">$</span> git cherry-pick a1b2c3..d4e5f6        <span class="cb-cmt"># apply range (exclusive start)</span>
<span class="cb-prompt">$</span> git cherry-pick --no-commit a1b2c3    <span class="cb-cmt"># apply but don't commit yet</span>
<span class="cb-cmt"># Use case: hotfix committed to feature branch, need it in main too</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Undoing Changes &#x2014; restore, reset, revert, reflog</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 12 — Reset, revert, restore — undoing changes safely</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; THE THREE WAYS TO UNDO &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt">## 1. git restore — discard working tree / staged changes</span>
<span class="cb-prompt">$</span> git restore file.py                   <span class="cb-cmt"># discard working tree change (IRREVERSIBLE)</span>
<span class="cb-prompt">$</span> git restore --staged file.py          <span class="cb-cmt"># unstage (keep working tree change)</span>
<span class="cb-prompt">$</span> git restore --staged --worktree file.py  <span class="cb-cmt"># unstage + discard</span>
<span class="cb-prompt">$</span> git restore --source=HEAD~3 file.py   <span class="cb-cmt"># restore file to 3 commits ago</span>

<span class="cb-cmt">## 2. git reset — move HEAD (and optionally working tree/index)</span>
<span class="cb-cmt"># --soft: move HEAD only (commits undone, changes staged)</span>
<span class="cb-prompt">$</span> git reset --soft HEAD~1               <span class="cb-cmt"># undo last commit, keep changes staged</span>
<span class="cb-cmt"># --mixed (default): move HEAD + unstage (changes in working tree)</span>
<span class="cb-prompt">$</span> git reset HEAD~1                      <span class="cb-cmt"># undo commit, changes unstaged</span>
<span class="cb-cmt"># --hard: move HEAD + throw away all changes (DESTRUCTIVE)</span>
<span class="cb-prompt">$</span> git reset --hard HEAD~1               <span class="cb-cmt"># discard last commit AND all its changes</span>
<span class="cb-prompt">$</span> git reset --hard origin/main          <span class="cb-cmt"># reset to remote state (discard local)</span>
<span class="cb-cmt"># ⚠ --hard loses uncommitted work. Use git stash first if unsure.</span>

<span class="cb-cmt">## 3. git revert — create a NEW commit that undoes a past commit</span>
<span class="cb-prompt">$</span> git revert a1b2c3d                    <span class="cb-cmt"># safe undo (adds a commit, preserves history)</span>
<span class="cb-prompt">$</span> git revert HEAD~3..HEAD               <span class="cb-cmt"># revert last 3 commits</span>
<span class="cb-prompt">$</span> git revert --no-commit a1b2c3d        <span class="cb-cmt"># apply revert without committing</span>
<span class="cb-cmt"># revert is safe for shared/public branches
# reset rewrites history — never on pushed commits</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; RECOVERY WITH REFLOG &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git reflog                            <span class="cb-cmt"># every HEAD movement ever (90 days)</span>
<span class="cb-out">a1b2c3d HEAD@{0}: commit: feat: validation</span>
<span class="cb-out">7h8i9j0 HEAD@{1}: reset --hard: moving to 7h8i9j0</span>
<span class="cb-out">d4e5f6g HEAD@{2}: commit: wip: work in progress</span>
<span class="cb-cmt"># Recover a "lost" commit:</span>
<span class="cb-prompt">$</span> git checkout d4e5f6g                  <span class="cb-cmt"># detached HEAD to recover it</span>
<span class="cb-prompt">$</span> git switch -c recovery/lost-work      <span class="cb-cmt"># save it to a branch</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Stash, Tags, Worktree</h2>
<div class="diagram-wrap">
<svg viewBox="0 0 820 175" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="gt-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="gt-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="gt-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="gt-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="gt-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="gt-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>

  <rect width="820" height="175" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">git worktree &#x2014; Multiple Working Directories, One Repository</text>
  <!-- Single repo -->
  <rect x="14"  y="36" width="180" height="100" rx="8" fill="#161b22" stroke="#30363d" stroke-width="2"/>
  <text x="104" y="58"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">.git/ (one repo)</text>
  <text x="104" y="76"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">All objects</text>
  <text x="104" y="92"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">All branches</text>
  <text x="104" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Shared</text>
  <line x1="194" y1="64" x2="234" y2="64" stroke="#3fb950" stroke-width="1.5" marker-end="url(#gt-grn)"/>
  <line x1="194" y1="86" x2="234" y2="86" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#gt-blu)"/>
  <line x1="194" y1="108" x2="234" y2="108" stroke="#ffa657" stroke-width="1.5" marker-end="url(#gt-orn)"/>
  <!-- Working dirs -->
  <rect x="234" y="44" width="180" height="30" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="324" y="63"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">~/proj/ (main branch)</text>
  <rect x="234" y="80" width="180" height="30" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="324" y="99"  text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#58a6ff">~/proj-hotfix/ (hotfix)</text>
  <rect x="234" y="96" width="180" height="30" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="324" y="123" text-anchor="middle" font-family="'Courier New',monospace" font-size="9.5" fill="#ffa657">~/proj-v2/ (v2-dev)</text>
  <!-- Commands -->
  <rect x="430" y="44" width="376" height="92" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="618" y="62"  text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" font-weight="bold" fill="#bc8cff">Commands:</text>
  <text x="440" y="80"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">git worktree add ../proj-hotfix hotfix</text>
  <text x="440" y="96"  font-family="'Courier New',monospace" font-size="9.5" fill="#3fb950">git worktree list</text>
  <text x="440" y="112" font-family="'Courier New',monospace" font-size="9.5" fill="#f85149">git worktree remove ../proj-hotfix</text>
  <text x="440" y="128" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Each worktree checks out a different branch.</text>
  <text x="440" y="140" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">No stashing. No repo cloning. Instant.</text>
  <rect x="14"  y="148" width="792" height="20" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="26"  y="163" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Use case: you're in the middle of a feature, production is on fire. Add a worktree for the hotfix branch. Fix it. Push. Remove worktree. Continue your feature.</text>

</svg>
</div>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 12 — Stash, tags, worktree, submodules</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; STASH &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git stash                             <span class="cb-cmt"># stash working tree + index</span>
<span class="cb-prompt">$</span> git stash push -m "wip: feature X"    <span class="cb-cmt"># named stash</span>
<span class="cb-prompt">$</span> git stash -u                          <span class="cb-cmt"># include untracked files</span>
<span class="cb-prompt">$</span> git stash list                         <span class="cb-cmt"># list all stashes</span>
<span class="cb-out">stash@{0}: WIP on main: a1b2c3d feat: add validation</span>
<span class="cb-out">stash@{1}: wip: feature X on feature/api</span>
<span class="cb-prompt">$</span> git stash pop                          <span class="cb-cmt"># apply + remove top stash</span>
<span class="cb-prompt">$</span> git stash apply stash@{1}             <span class="cb-cmt"># apply specific (keep in list)</span>
<span class="cb-prompt">$</span> git stash drop stash@{1}             <span class="cb-cmt"># remove without applying</span>
<span class="cb-prompt">$</span> git stash clear                        <span class="cb-cmt"># remove all stashes</span>
<span class="cb-prompt">$</span> git stash show -p stash@{0}           <span class="cb-cmt"># show diff of stash</span>
<span class="cb-prompt">$</span> git stash branch hotfix stash@{0}     <span class="cb-cmt"># create branch from stash</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; TAGS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git tag v2.1.0                        <span class="cb-cmt"># lightweight tag at HEAD</span>
<span class="cb-prompt">$</span> git tag -a v2.1.0 -m "Release 2.1.0"  <span class="cb-cmt"># annotated tag (use this for releases)</span>
<span class="cb-prompt">$</span> git tag -a v2.0.1 a1b2c3d             <span class="cb-cmt"># tag a past commit</span>
<span class="cb-prompt">$</span> git tag -l                             <span class="cb-cmt"># list all tags</span>
<span class="cb-prompt">$</span> git tag -l "v2.*"                      <span class="cb-cmt"># filter tags</span>
<span class="cb-prompt">$</span> git describe --tags                    <span class="cb-cmt"># most recent tag + distance</span>
<span class="cb-out">v2.1.0-3-ga1b2c3d</span>                       <span class="cb-cmt"># v2.1.0, 3 commits ahead, sha a1b2c3d</span>
<span class="cb-prompt">$</span> git push --tags                        <span class="cb-cmt"># push all tags to remote</span>
<span class="cb-prompt">$</span> git tag -d v2.1.0                      <span class="cb-cmt"># delete local tag</span>
<span class="cb-prompt">$</span> git push origin :refs/tags/v2.1.0     <span class="cb-cmt"># delete remote tag</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; WORKTREE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git worktree add ../hotfix-dir hotfix  <span class="cb-cmt"># new dir with hotfix branch</span>
<span class="cb-prompt">$</span> git worktree add -b hotfix-1.0 ../fix v1.0.0  <span class="cb-cmt"># new branch from tag</span>
<span class="cb-prompt">$</span> git worktree list                      <span class="cb-cmt"># all worktrees</span>
<span class="cb-prompt">$</span> git worktree remove ../hotfix-dir      <span class="cb-cmt"># remove when done</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Advanced &#x2014; bisect, grep, hooks, filter-repo</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 12 — Advanced: bisect, grep, archive, filter-branch, hooks</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; git bisect — FIND THE COMMIT THAT INTRODUCED A BUG &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git bisect start                      <span class="cb-cmt"># begin bisect session</span>
<span class="cb-prompt">$</span> git bisect bad                         <span class="cb-cmt"># current commit has the bug</span>
<span class="cb-prompt">$</span> git bisect good v2.0.0                 <span class="cb-cmt"># this version was fine</span>
<span class="cb-out">Bisecting: 23 revisions left to test (roughly 5 steps)</span>
<span class="cb-out">[a1b2c3d] refactor: extract pipeline module</span>
<span class="cb-cmt"># Git checks out middle commit. Test it:</span>
<span class="cb-prompt">$</span> python -m pytest tests/test_pipeline.py
<span class="cb-prompt">$</span> git bisect bad   <span class="cb-cmt"># or git bisect good</span>
<span class="cb-cmt"># Repeat until Git identifies the culprit commit.</span>
<span class="cb-prompt">$</span> git bisect reset                       <span class="cb-cmt"># return to HEAD when done</span>
<span class="cb-cmt"># Automated bisect with a test script:</span>
<span class="cb-prompt">$</span> git bisect run python -m pytest tests/test_pipeline.py

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; git grep — SEARCH THE REPOSITORY &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git grep "process_csv"                <span class="cb-cmt"># search in working tree</span>
<span class="cb-prompt">$</span> git grep -n "process_csv" HEAD        <span class="cb-cmt"># with line numbers, in HEAD</span>
<span class="cb-prompt">$</span> git grep "TODO" v2.0.0                <span class="cb-cmt"># search in a specific commit/tag</span>
<span class="cb-prompt">$</span> git grep -l "import pandas"           <span class="cb-cmt"># list files only</span>
<span class="cb-cmt"># Faster than grep on large repos (uses Git's index)</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; HOOKS — AUTOMATE ON GIT EVENTS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Hooks live in .git/hooks/ (executable scripts)</span>
<span class="cb-out">cat &gt; .git/hooks/pre-commit &lt;&lt; 'EOF'</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">set -e</span>
<span class="cb-out">python -m flake8 src/            # lint check</span>
<span class="cb-out">python -m pytest tests/ -x -q   # run tests</span>
<span class="cb-out">EOF</span>
<span class="cb-out">chmod +x .git/hooks/pre-commit</span>
<span class="cb-cmt"># Hook types: pre-commit, prepare-commit-msg, commit-msg, post-commit,
# pre-push, post-checkout, post-merge, pre-rebase</span>
<span class="cb-cmt"># Share hooks via pre-commit framework:</span>
<span class="cb-prompt">$</span> pip install pre-commit
<span class="cb-prompt">$</span> pre-commit install                    <span class="cb-cmt"># install from .pre-commit-config.yaml</span>
<span class="cb-prompt">$</span> pre-commit run --all-files            <span class="cb-cmt"># run all hooks on all files</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> GitHub Flow &amp; Conventional Commits</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 12 — GitHub Flow, PR workflow, branch protection</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; GITHUB FLOW WORKFLOW &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out"></span>
<span class="cb-out"># 1. Always start from an up-to-date main</span>
<span class="cb-out">git switch main &amp;&amp; git pull</span>
<span class="cb-out"></span>
<span class="cb-out"># 2. Create descriptive feature branch</span>
<span class="cb-out">git switch -c feature/add-csv-validation</span>
<span class="cb-out"></span>
<span class="cb-out"># 3. Work: small, focused commits with clear messages</span>
<span class="cb-out">git add src/validator.py tests/test_validator.py</span>
<span class="cb-out">git commit -m "feat(validator): add RFC 4180 CSV field validation</span>
<span class="cb-out"></span>
<span class="cb-out">Validates quoted fields, embedded commas, and newlines.</span>
<span class="cb-out">Raises ValidationError with row number on malformed input.</span>
<span class="cb-out"></span>
<span class="cb-out">Closes #42"</span>
<span class="cb-out"></span>
<span class="cb-out"># 4. Keep branch up to date before PR</span>
<span class="cb-out">git fetch origin</span>
<span class="cb-out">git rebase origin/main</span>
<span class="cb-out"></span>
<span class="cb-out"># 5. Clean up commits (squash WIPs)</span>
<span class="cb-out">git rebase -i origin/main</span>
<span class="cb-out"></span>
<span class="cb-out"># 6. Push for PR</span>
<span class="cb-out">git push -u origin feature/add-csv-validation</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; CONVENTIONAL COMMITS FORMAT &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Format: type(scope): short description
#
# Body: what and why (not how)
# Closes #42</span>
<span class="cb-out">feat:     a new feature</span>
<span class="cb-out">fix:      a bug fix</span>
<span class="cb-out">docs:     documentation only</span>
<span class="cb-out">style:    formatting (no logic change)</span>
<span class="cb-out">refactor: code change without feature/fix</span>
<span class="cb-out">test:     adding/updating tests</span>
<span class="cb-out">chore:    build process, dependencies</span>
<span class="cb-out">perf:     performance improvement</span>
<span class="cb-out">ci:       CI/CD changes</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; git shortlog / CONTRIBUTOR STATS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-prompt">$</span> git shortlog -sn --all                <span class="cb-cmt"># contributors ranked by commit count</span>
<span class="cb-prompt">$</span> git log --format='%ae' | sort | uniq -c | sort -rn  <span class="cb-cmt"># by email</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Git for Data Engineering: LFS, Secrets, Reproducibility</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 11 of 12 — Git for data engineering: large files, secrets, LFS</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; NEVER COMMIT THESE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Secrets / credentials:</span>
<span class="cb-out">*.env                   # environment files with secrets</span>
<span class="cb-out">secrets.json</span>
<span class="cb-out">credentials.yaml</span>
<span class="cb-cmt"># If you DID commit a secret, remove it from history:</span>
<span class="cb-prompt">$</span> git-filter-repo --path secrets.json --invert-paths  <span class="cb-cmt"># remove file from all commits</span>
<span class="cb-cmt"># ⚠ Must force-push. All collaborators must re-clone.
# Rotate the credentials immediately — they may already be compromised.</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; GIT LFS — LARGE FILE STORAGE &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Store large files outside the Git object store (stored as pointers)</span>
<span class="cb-prompt">$</span> sudo apt install git-lfs
<span class="cb-prompt">$</span> git lfs install
<span class="cb-prompt">$</span> git lfs track "*.parquet"             <span class="cb-cmt"># track parquet files via LFS</span>
<span class="cb-prompt">$</span> git lfs track "data/*.csv"
<span class="cb-prompt">$</span> git add .gitattributes                 <span class="cb-cmt"># commit the tracking config</span>
<span class="cb-prompt">$</span> git lfs ls-files                       <span class="cb-cmt"># list LFS-tracked files</span>
<span class="cb-prompt">$</span> git lfs migrate import --include="*.parquet"  <span class="cb-cmt"># migrate existing files</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; DATA ENGINEERING GIT PATTERNS &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-cmt"># Track schema, not data:</span>
<span class="cb-out">data/               # .gitignore: all data files</span>
<span class="cb-out">data/README.md      # document data sources</span>
<span class="cb-out">schema/             # git-tracked: SQL DDL, Avro schemas, JSON Schema</span>
<span class="cb-out">migrations/         # git-tracked: Alembic/Flyway SQL migration files</span>
<span class="cb-cmt"># Tag pipeline versions for reproducibility:</span>
<span class="cb-prompt">$</span> git tag -a pipeline-v1.2.0 -m "Pipeline used for Q1 2024 analysis"
<span class="cb-cmt"># Reproduce a past result:</span>
<span class="cb-prompt">$</span> git checkout pipeline-v1.2.0         <span class="cb-cmt"># detached HEAD: exact pipeline version</span>

<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; USEFUL ALIASES &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">git config --global alias.lg "log --oneline --graph --all --decorate"</span>
<span class="cb-out">git config --global alias.s  "status -sb"</span>
<span class="cb-out">git config --global alias.undo "reset --soft HEAD~1"</span>
<span class="cb-out">git config --global alias.wip "commit -am 'wip: checkpoint'"</span>
<span class="cb-out">git config --global alias.unwip "reset HEAD~1"</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Project Setup</h2>
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 12 of 12 — Complete data pipeline project Git setup</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## &#x2550;&#x2550;&#x2550; COMPLETE PROJECT SETUP &#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;&#x2550;</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out"></span>
<span class="cb-out"># 1. Initialize</span>
<span class="cb-out">git init data-pipeline</span>
<span class="cb-out">cd data-pipeline</span>
<span class="cb-out"></span>
<span class="cb-out"># 2. Create .gitignore</span>
<span class="cb-out">cat &gt; .gitignore &lt;&lt; 'EOF'</span>
<span class="cb-out">__pycache__/ *.pyc .venv/ .env *.env</span>
<span class="cb-out">data/*.csv data/*.parquet data/*.json</span>
<span class="cb-out">*.log .DS_Store *.egg-info/ dist/ build/</span>
<span class="cb-out">EOF</span>
<span class="cb-out"></span>
<span class="cb-out"># 3. Initial commit</span>
<span class="cb-out">git add .gitignore README.md</span>
<span class="cb-out">git commit -m "chore: initial project setup"</span>
<span class="cb-out"></span>
<span class="cb-out"># 4. Pre-commit hooks</span>
<span class="cb-out">cat &gt; .pre-commit-config.yaml &lt;&lt; 'EOF'</span>
<span class="cb-out">repos:</span>
<span class="cb-out">  - repo: https://github.com/psf/black</span>
<span class="cb-out">    rev: 24.1.0</span>
<span class="cb-out">    hooks: [{id: black}]</span>
<span class="cb-out">  - repo: https://github.com/pycqa/flake8</span>
<span class="cb-out">    rev: 7.0.0</span>
<span class="cb-out">    hooks: [{id: flake8}]</span>
<span class="cb-out">  - repo: https://github.com/Yelp/detect-secrets</span>
<span class="cb-out">    rev: v1.4.0</span>
<span class="cb-out">    hooks: [{id: detect-secrets}]</span>
<span class="cb-out">EOF</span>
<span class="cb-out">pre-commit install</span>
<span class="cb-out"></span>
<span class="cb-out"># 5. Push to GitHub</span>
<span class="cb-out">git remote add origin git@github.com:ravi/data-pipeline.git</span>
<span class="cb-out">git push -u origin main</span>
<span class="cb-out"></span>
<span class="cb-out"># 6. Feature branch workflow</span>
<span class="cb-out">git switch -c feature/csv-validator</span>
<span class="cb-out"># ... work, commit ...</span>
<span class="cb-out">git fetch origin &amp;&amp; git rebase origin/main</span>
<span class="cb-out">git rebase -i origin/main  # squash wip commits</span>
<span class="cb-out">git push -u origin feature/csv-validator</span>
<span class="cb-out"># Open PR on GitHub</span>
<span class="cb-out"></span>
<span class="cb-out"># 7. After PR merge: tag and release</span>
<span class="cb-out">git switch main &amp;&amp; git pull</span>
<span class="cb-out">git tag -a v1.0.0 -m "Initial stable release"</span>
<span class="cb-out">git push --tags</span>
</pre></div></div>

</div>
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive &#x2014; Git Object Storage, SHA-1, Packfiles, Plumbing</h2>
<div class="deepdive-box">
<div class="deepdive-title">&#x2699;&#xFE0F; How Git Actually Stores Data &#x2014; Objects, Refs, Packfiles, Plumbing Commands</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. OBJECT STORAGE &#x2014; THE CONTENT-ADDRESSED STORE

   Every object in Git is stored as:
   1. A header: "type size" (e.g., "blob 47")
   2. The content
   3. SHA-1 hash of the whole thing
   4. zlib-compressed and stored at .git/objects/XX/YY...
 
   Example: Create a blob manually
   echo -n "hello world" | git hash-object --stdin --write
   # Output: 3b18e512dba79e4c8300dd08aeb37f8e728b8dad
   # Stored at: .git/objects/3b/18e512dba79e4c8300dd08aeb37f8e728b8dad
 
   Low-level read:
   git cat-file -t 3b18e512  # type:    blob
   git cat-file -p 3b18e512  # content: hello world
   git cat-file -s 3b18e512  # size:    11
 
2. HOW A COMMIT IS BUILT (PLUMBING)
 
   # Create a tree object from current index:
   TREE=$(git write-tree)
   echo $TREE  # SHA of root tree object
 
   # Create a commit pointing to that tree:
   COMMIT=$(echo "feat: first commit" | git commit-tree $TREE)
 
   # Update HEAD to point to the commit:
   git update-ref refs/heads/main $COMMIT
 
   This is exactly what "git commit" does internally.
 
3. PACKFILES &#x2014; EFFICIENT STORAGE
 
   Initially, each object is a "loose object" in .git/objects/.
   After many commits, Git runs "git gc" (garbage collection) to:
   1. Collect loose objects into a packfile: .git/objects/pack/*.pack
   2. Delta-compress similar objects (file versions)
   3. Remove unreachable objects (garbage collection)
 
   git gc --aggressive   # force aggressive repacking
   git count-objects -v  # count loose + packed objects
 
   The packfile format stores objects as deltas:
   v2 of a large file = "v1 + these changes"
   This is why git history is compact even for large files.
 
4. REFS &#x2014; WHAT BRANCHES AND TAGS REALLY ARE
 
   .git/refs/heads/main:   contains "a1b2c3d4...
"  (one SHA)
   .git/HEAD:              contains "ref: refs/heads/main
"
 
   A branch is a 41-byte text file. That's it.
   Moving HEAD from one branch to another = rewriting HEAD.
   Creating a branch = writing one new file.
   This is why Git branching is O(1) and instant.
 
   Packed refs: when there are many branches/tags, Git stores
   them in .git/packed-refs instead of individual files.
 
5. THE REFLOG &#x2014; A SAFETY NET
 
   Every time HEAD moves, Git appends to .git/logs/HEAD:
   old-sha new-sha author timestamp timezone message
 
   This means:
   - git reset --hard, rebase, amend: all leave traces in reflog
   - You can always recover "lost" commits within 90 days
   - git reflog expires --expire=90.days.ago  (default cleanup)
 
   Recovery workflow:
   git reflog            # find the SHA of "lost" work
   git checkout SHA      # go to it (detached HEAD)
   git switch -c rescue  # save it to a branch
 
6. TRANSFER PROTOCOL &#x2014; HOW PUSH/PULL WORKS
 
   git push/pull uses either:
   - SSH: git-upload-pack and git-receive-pack over SSH
   - HTTPS: same protocol over HTTP with authentication
 
   The protocol:
   1. Client connects, server advertises refs (branch SHAs)
   2. Client determines what objects it needs/has
   3. Client requests objects as a packfile
   4. Server sends a delta-compressed packfile
   5. Client applies it to its object store
 
   Shallow clones (--depth 1) omit parent pointers,
   making the packfile much smaller for CI/CD.
</pre>
</div>
</div><div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference &#x2014; git Commands Quick Lookup</h2>
<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:28%">Command</th><th>Purpose</th><th style="width:22%">Key Options</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Setup &amp; Day-to-Day</td></tr>
<tr><td style="font-family:monospace;">git config --global</td><td>Set name, email, editor, aliases</td><td><code>--list --show-origin</code> to audit</td></tr>
<tr><td style="font-family:monospace;">git add -p</td><td>Stage changes interactively by hunk</td><td>y/n/s/e/q &#x2014; most useful git command</td></tr>
<tr><td style="font-family:monospace;">git commit --amend</td><td>Edit last commit (message + content)</td><td><code>--no-edit</code> keep message</td></tr>
<tr><td style="font-family:monospace;">git diff --staged</td><td>What will be in the next commit</td><td><code>diff HEAD</code> all changes vs last commit</td></tr>
<tr><td colspan="3" style="background:#1a2a14;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">History</td></tr>
<tr><td style="font-family:monospace;">git log --oneline --graph</td><td>Visual branch history</td><td><code>--all</code> include all branches</td></tr>
<tr><td style="font-family:monospace;">git blame -L 10,20 FILE</td><td>Who wrote each line</td><td><code>git log -S "string"</code> for pickaxe</td></tr>
<tr><td style="font-family:monospace;">git bisect run SCRIPT</td><td>Binary search for bug-introducing commit</td><td>Automated with test script</td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">Branching &amp; Remotes</td></tr>
<tr><td style="font-family:monospace;">git switch -c branch</td><td>Create + switch branch</td><td>Modern: switch. Legacy: checkout -b</td></tr>
<tr><td style="font-family:monospace;">git rebase -i HEAD~N</td><td>Interactive: squash/reword/drop/reorder</td><td>Never on pushed commits!</td></tr>
<tr><td style="font-family:monospace;">git push --force-with-lease</td><td>Safe force push (fail if remote changed)</td><td>After rebase/amend on pushed branch</td></tr>
<tr><td style="font-family:monospace;">git fetch --prune</td><td>Update remote refs + remove stale</td><td>Before inspecting origin/*</td></tr>
<tr><td colspan="3" style="background:#1f1428;color:#bc8cff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Undoing &amp; Recovery</td></tr>
<tr><td style="font-family:monospace;">git restore --staged FILE</td><td>Unstage (keep working tree change)</td><td><code>git restore FILE</code> discard change</td></tr>
<tr><td style="font-family:monospace;">git reset --soft HEAD~1</td><td>Undo commit, keep changes staged</td><td><code>--hard</code> destructive; <code>--mixed</code> default</td></tr>
<tr><td style="font-family:monospace;">git revert SHA</td><td>Safe public undo (adds new commit)</td><td>Safe on shared branches</td></tr>
<tr><td style="font-family:monospace;">git reflog</td><td>Every HEAD movement &#x2014; the safety net</td><td>90-day history, recover anything</td></tr>
</tbody>
</table>
</div>
</div><div class="section-block">
<h2 class="section-title"><span class="sec-num">16</span> Practice Exercises with Solutions</h2>
 
<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 &#x2014; Git Fundamentals</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Initialise a new repo. Create three files, stage them selectively (stage 2, leave 1 unstaged). Commit. Verify with <code>git status</code> and <code>git log</code>.</li>
      <li>Modify a file. Use <code>git diff</code> to see the change, then <code>git add -p</code> to stage only part of it.</li>
      <li>Amend the last commit to add a forgotten file without changing the commit message.</li>
      <li>Create a <code>.gitignore</code> that ignores <code>*.log</code>, <code>.env</code>, and <code>__pycache__/</code>. Verify with <code>git check-ignore -v</code>.</li>
      <li>Use <code>git show HEAD</code> to see the last commit's diff. Use <code>git show HEAD:filename</code> to view a file as it was in that commit.</li>
    </ol>
  </div>
</div>
 
<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 &#x2014; History and Inspection</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Make 10 commits. Use <code>git log --oneline --graph</code> to view them. Filter to only commits with "fix" in the message.</li>
      <li>Use <code>git log -S "some_function"</code> to find which commit added that function.</li>
      <li>Use <code>git blame</code> on a file to identify who wrote specific lines. Then use <code>git show SHA</code> on one of those commits.</li>
      <li>Use <code>git log --since="3 days ago" --oneline</code> to see recent activity.</li>
      <li>Restore a specific file to how it looked 5 commits ago using <code>git restore --source=HEAD~5</code>.</li>
    </ol>
  </div>
</div>
 
<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 &#x2014; Branching, Merging, Conflicts</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create a feature branch, make 3 commits. In main, make 2 different commits. Merge feature into main with <code>--no-ff</code>. Inspect the resulting graph.</li>
      <li>Create a conflict: make both branches modify the same line in the same file. Resolve it manually, then commit.</li>
      <li>Do the same scenario with <code>git rebase</code> instead of merge. Compare the resulting histories.</li>
      <li>Use <code>git cherry-pick</code> to apply a specific commit from one branch to another.</li>
      <li>Use <code>git stash</code> to save work in progress, switch to a different branch, do some work, come back, and restore the stash.</li>
    </ol>
  </div>
</div>
 
<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 &#x2014; Rewriting History and Recovery</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Make 5 messy WIP commits. Use <code>git rebase -i HEAD~5</code> to: squash the first 3 into one, reword one message, drop one commit.</li>
      <li>Use <code>git reset --hard HEAD~2</code> to discard 2 commits. Use <code>git reflog</code> to find the lost commits and recover them to a new branch.</li>
      <li>Simulate committing a secret file (<code>passwords.txt</code>). Use <code>git-filter-repo</code> to purge it from all history.</li>
      <li>Set up a pre-commit hook that runs <code>flake8</code> and blocks commit if there are errors.</li>
      <li>Use <code>git bisect run</code> with a test script to automatically find which of 20 commits broke a specific test.</li>
    </ol>
  </div>
</div>
 
<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 &#x2014; Complete Data Pipeline Git Workflow</h4>
    <p>Set up a production-ready Git workflow for a data pipeline project:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Repository structure:</strong> Initialise repo with proper .gitignore (data files, secrets, virtualenvs). Add Git LFS for .parquet and .csv files. Create README.md.</li>
      <li><strong>Pre-commit hooks:</strong> Configure <code>.pre-commit-config.yaml</code> with: black (formatting), flake8 (linting), detect-secrets (no credentials), and a custom hook that validates Python syntax.</li>
      <li><strong>Branch strategy:</strong> Create main (protected), develop, and feature branches. Write a GitHub Actions workflow that runs tests on every PR and requires status checks to pass before merge.</li>
      <li><strong>Conventional commits:</strong> Make 10 commits following the conventional commits format. Generate a CHANGELOG using <code>git log</code> with custom formatting.</li>
      <li><strong>Release tagging:</strong> Create an annotated tag <code>v1.0.0</code> with release notes. Write a release.sh script that: bumps the version, creates a tag, generates release notes from git log, and pushes.</li>
      <li><strong>Disaster recovery:</strong> Demonstrate recovery from: (a) accidental <code>git reset --hard</code> using reflog, (b) a mistakenly committed secret using filter-repo, (c) a broken main branch using revert.</li>
    </ol>
  </div>
</div>
 
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">&#x1F9D1;&#x200D;&#x1F4BB;</div>
  <div class="story-body">
    <div class="story-title">Ravi's Git Wisdom & Day 650</div>
    <p>A year after the accidental <code>rm -rf</code>, Ravi had become the person on the team who people came to with Git emergencies. The deleted files. The force-pushed branch. The merged feature that needed to be un-merged. The commit that introduced a performance regression six weeks ago.</p>
    <p>In every case, the answer was in the Git history. Reflog recovered the "lost" branch. Cherry-pick extracted the single important commit from the wrong branch. Bisect found the regression in eleven automated test runs. Revert un-merged the feature while leaving all subsequent commits intact.</p>
    <p>He wrote a short note for the team wiki: "Git is not version control. Version control is what the feature names suggest &#x2014; numbering versions of files. Git is a content-addressed, append-only, cryptographically verifiable distributed database of your project's complete history. Everything you have ever committed is still there. The reflog logs every HEAD movement for 90 days. <code>git reset --hard</code> is not permanent. <code>git rm</code> is not permanent. The only way to lose work in Git is to never commit it in the first place."</p>
    <p><strong>Version control is a time machine. Use it accordingly.</strong></p>
  </div>
</div>
</div>
`
};