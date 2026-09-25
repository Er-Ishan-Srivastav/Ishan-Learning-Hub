

var acl = {
    title: "Access Control Lists (ACL)",
    description: "Master Linux ACLs — the powerful extension to Unix permissions that lets you grant precise access to specific users and groups beyond the classic owner/group/other model. Essential for multi-team data environments.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div style="flex:1;min-width:220px;">Ravi's Permission Problem — Day 162
    <p>The data team had a shared directory: <code>/data/processed/</code>. Ravi's pipeline wrote files there (owner: <code>ravi</code>). The analytics team needed to read them. The ML team needed to read and write their own subdirectory. The data governance team needed read-only access to everything.</p>
    <br>
    <p>With classic Unix permissions, Ravi had three choices — none of them good. Put everyone in the same group (too broad). Make files world-readable (security risk). Write a complex permission script that ran after every file creation (fragile).</p>
    <br>
    <p>"You're trying to solve a four-party problem with a three-slot system," Priya said. "That's what ACLs are for." She typed <code>setfacl -m u:analyst:r-- /data/processed/report.csv</code>. The analytics user could read the file. Owner permissions unchanged. No new groups. No scripts. One command.</p>
    <br>
    <p>ACLs give every file and directory a full access list — any number of users and groups, each with their own permissions. This module covers every form, flag, and real-world pattern.</p>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — WHY ACLs EXIST
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Why ACLs Exist — The Limits of Classic Unix Permissions</h2>

<p>Traditional Unix permissions assign exactly <strong>three sets of rwx bits</strong>: owner, group, and others. This is elegant but inflexible. ACLs (Access Control Lists) are a POSIX standard extension that adds <em>arbitrary numbers of named user and group entries</em> to any file or directory.</p>

<!-- Classic vs ACL comparison SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f85149"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
  </defs>
  <rect width="820" height="260" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Classic Permissions vs ACL — The Problem ACLs Solve</text>

  <!-- Classic permissions box -->
  <rect x="20" y="38" width="365" height="208" rx="8" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="202" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#f85149">Classic Permissions (3 slots only)</text>
  <rect x="35" y="72" width="90" height="52" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="80" y="93" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">owner</text>
  <text x="80" y="112" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">rw-</text>
  <rect x="145" y="72" width="90" height="52" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="190" y="93" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">group</text>
  <text x="190" y="112" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#58a6ff">r--</text>
  <rect x="255" y="72" width="90" height="52" rx="5" fill="#2a1a1a" stroke="#f85149" stroke-width="1.5"/>
  <text x="300" y="93" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">others</text>
  <text x="300" y="112" text-anchor="middle" font-family="'Courier New',monospace" font-size="12" fill="#f85149">---</span></text>

  <text x="202" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ analytics team needs read access</text>
  <text x="202" y="168" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ ml team needs read+write access</text>
  <text x="202" y="186" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ audit team needs read-only access</text>
  <text x="202" y="204" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Only ONE group slot — you can't satisfy 3 teams!</text>
  <text x="202" y="232" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Making world-readable breaks security</text>

  <!-- Arrow -->
  <line x1="393" y1="142" x2="418" y2="142" stroke="#ffa657" stroke-width="2" marker-end="url(#arr-y)"/>
  <text x="405" y="135" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">ACL</text>

  <!-- ACL box -->
  <rect x="420" y="38" width="380" height="208" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="2"/>
  <text x="610" y="60" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">ACL (unlimited named entries)</text>

  <!-- ACL rows -->
  <rect x="435" y="68" width="350" height="22" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="445" y="83" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">user::rw-</text>
  <text x="640" y="83" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">owner (ravi)</text>
  <rect x="435" y="94" width="350" height="22" rx="3" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="445" y="109" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">user:analyst:r--</text>
  <text x="640" y="109" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">named user: analyst</text>
  <rect x="435" y="120" width="350" height="22" rx="3" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="445" y="135" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">user:priya:rw-</text>
  <text x="640" y="135" font-family="'Segoe UI',sans-serif" font-size="9" fill="#bc8cff">named user: priya</text>
  <rect x="435" y="146" width="350" height="22" rx="3" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="445" y="161" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">group::r--</text>
  <text x="640" y="161" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">owning group</text>
  <rect x="435" y="172" width="350" height="22" rx="3" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="445" y="187" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">group:ml-team:rw-</text>
  <text x="640" y="187" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">named group: ml-team</text>
  <rect x="435" y="198" width="350" height="22" rx="3" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="445" y="213" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">group:audit:r--</text>
  <text x="640" y="213" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">named group: audit</text>
  <rect x="435" y="224" width="350" height="16" rx="3" fill="#1f2027" stroke="#30363d" stroke-width="1"/>
  <text x="445" y="236" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">other::---    mask::rw-</text>
</svg>
</div>

<div class="table-wrap" style="margin-top:20px;">
<table class="ref-table">
<thead><tr><th>Feature</th><th style="color:#f85149;">Classic Permissions</th><th style="color:#3fb950;">ACL</th></tr></thead>
<tbody>
<tr><td>Max permission entries</td><td style="color:#f85149;">3 (owner, group, other)</td><td style="color:#3fb950;">Unlimited named users &amp; groups</td></tr>
<tr><td>Per-user control</td><td style="color:#f85149;">Only the owner</td><td style="color:#3fb950;">Any named user on the system</td></tr>
<tr><td>Per-group control</td><td style="color:#f85149;">Only one group</td><td style="color:#3fb950;">Any number of named groups</td></tr>
<tr><td>Directory inheritance</td><td style="color:#f85149;">Not built-in</td><td style="color:#3fb950;">Default ACLs auto-applied to new files</td></tr>
<tr><td>Filesystem support</td><td style="color:#3fb950;">All filesystems</td><td style="color:#ffa657;">ext2/3/4, XFS, Btrfs, OCFS2 (not FAT/NTFS)</td></tr>
<tr><td>Visible in ls -l</td><td style="color:#3fb950;">Yes</td><td style="color:#ffa657;">+ indicator only; getfacl for full view</td></tr>
<tr><td>Standard</td><td style="color:#3fb950;">POSIX.1</td><td style="color:#3fb950;">POSIX.1e (widely implemented)</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — SETUP: CHECK & ENABLE ACL SUPPORT
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Setup — Check &amp; Enable ACL Support</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Checking ACL Support &amp; Installing Tools</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ─── CHECK IF FILESYSTEM HAS ACL SUPPORT ─────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">mount</span> | grep "on / "
<span class="cb-out">/dev/sda1 on / type ext4 (rw,relatime,acl,user_xattr)</span>
<span class="cb-cmt"># Look for "acl" in mount options — if present, ACLs are enabled</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">tune2fs</span> <span class="cb-flag">-l</span> /dev/sda1 | grep "Default mount"
<span class="cb-out">Default mount options: user_xattr acl</span>
<span class="cb-cmt"># ext4: check if acl is a default mount option</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">grep</span> -E "acl|xfs" /etc/fstab
<span class="cb-out">/dev/sda1  /  ext4  defaults,acl  0 1</span>
<span class="cb-cmt"># /etc/fstab: add "acl" to mount options if not present</span>

<span class="cb-cmt">## ─── ENABLE ACL ON EXISTING FILESYSTEM ───────────────────────</span>
<span class="cb-cmt"># Option 1: remount with acl option (temporary — until reboot)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo mount</span> <span class="cb-flag">-o remount,acl</span> /

<span class="cb-cmt"># Option 2: set as default mount option in tune2fs (permanent)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo tune2fs</span> <span class="cb-flag">-o acl</span> /dev/sda1

<span class="cb-cmt"># Option 3: add to /etc/fstab (permanent, recommended)</span>
<span class="cb-out">/dev/sda1  /  ext4  defaults,acl  0 1</span>

<span class="cb-cmt"># XFS: ACLs are enabled by default — no extra config needed
# Btrfs: ACLs enabled by default</span>

<span class="cb-cmt">## ─── INSTALL ACL TOOLS ────────────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo apt install</span> acl          <span class="cb-cmt"># Ubuntu / Debian</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo yum install</span> acl          <span class="cb-cmt"># CentOS / RHEL</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">sudo dnf install</span> acl          <span class="cb-cmt"># Fedora</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">which</span> getfacl setfacl
<span class="cb-out">/usr/bin/getfacl</span>
<span class="cb-out">/usr/bin/setfacl</span>

<span class="cb-cmt">## ─── QUICK VERIFY ACLs WORK ──────────────────────────────────</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">touch</span> /tmp/test_acl.txt
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> u:nobody:r-- /tmp/test_acl.txt
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> /tmp/test_acl.txt
<span class="cb-out"># file: tmp/test_acl.txt</span>
<span class="cb-out"># owner: ravi</span>
<span class="cb-out"># group: ravi</span>
<span class="cb-out">user::rw-</span>
<span class="cb-out">user:nobody:r--</span>
<span class="cb-out">group::rw-</span>
<span class="cb-out">mask::rw-</span>
<span class="cb-out">other::r--</span>
<span class="cb-cmt"># If you see these entries, ACLs are working correctly</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — getfacl: READING ACLs
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>getfacl</code> — Reading &amp; Understanding ACL Entries</h2>

<!-- ACL structure SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="280" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">ACL Entry Anatomy — Understanding Every Part of getfacl Output</text>

  <!-- Entry types column -->
  <rect x="15" y="36" width="500" height="232" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="30" y="56" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">getfacl output for report.csv:</text>

  <!-- Header lines -->
  <text x="30" y="76" font-family="'Courier New',monospace" font-size="11" fill="#8b949e"># file: data/report.csv</text>
  <text x="30" y="92" font-family="'Courier New',monospace" font-size="11" fill="#8b949e"># owner: ravi</text>
  <text x="30" y="108" font-family="'Courier New',monospace" font-size="11" fill="#8b949e"># group: dataeng</text>

  <!-- ACL entries with labels -->
  <rect x="22" y="114" width="486" height="22" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="30" y="129" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">user::rw-</text>
  <text x="200" y="129" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">← owner entry (empty qualifier = owner)</text>

  <rect x="22" y="140" width="486" height="22" rx="3" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="30" y="155" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">user:analyst:r--</text>
  <text x="200" y="155" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">← named user entry</text>

  <rect x="22" y="166" width="486" height="22" rx="3" fill="#1a1a3a" stroke="#bc8cff" stroke-width="1"/>
  <text x="30" y="181" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">user:priya:rw-</text>
  <text x="200" y="181" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">← named user entry</text>

  <rect x="22" y="192" width="486" height="22" rx="3" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="30" y="207" font-family="'Courier New',monospace" font-size="12" fill="#58a6ff">group::r--</text>
  <text x="200" y="207" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">← owning group entry (empty qualifier)</text>

  <rect x="22" y="218" width="486" height="22" rx="3" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="30" y="233" font-family="'Courier New',monospace" font-size="12" fill="#58a6ff">group:ml-team:rw-</text>
  <text x="200" y="233" font-family="'Segoe UI',sans-serif" font-size="10" fill="#58a6ff">← named group entry</text>

  <rect x="22" y="244" width="486" height="22" rx="3" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="30" y="259" font-family="'Courier New',monospace" font-size="12" fill="#ffa657">mask::rw-</text>
  <text x="200" y="259" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">← mask (limits named user/group effective perms)</text>

  <!-- Right column: entry format breakdown -->
  <rect x="530" y="36" width="278" height="232" rx="8" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <text x="545" y="56" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#e6edf3">Entry format:</text>
  <text x="545" y="76" font-family="'Courier New',monospace" font-size="13" fill="#bc8cff">TYPE:NAME:PERMS</text>
  <line x1="540" y1="84" x2="800" y2="84" stroke="#30363d" stroke-width="1"/>
  <text x="545" y="102" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">TYPE:</text>
  <text x="595" y="102" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">user  group  mask  other</text>
  <text x="545" y="120" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">NAME:</text>
  <text x="595" y="120" font-family="'Segoe UI',sans-serif" font-size="10" fill="#e6edf3">username, groupname, or empty</text>
  <text x="545" y="138" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">PERMS:</text>
  <text x="595" y="138" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">rwx  rw-  r--  ---</text>
  <line x1="540" y1="148" x2="800" y2="148" stroke="#30363d" stroke-width="1"/>
  <text x="545" y="166" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">Required entries:</text>
  <text x="545" y="182" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">user::  group::  other::</text>
  <text x="545" y="198" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">(mirror classic Unix bits)</text>
  <text x="545" y="218" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">mask:: added automatically</text>
  <text x="545" y="234" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">when any named entry added</text>
  <text x="545" y="252" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">ls -l shows + if ACL present</text>
</svg>
</div>

<!-- CONSOLE 1 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — getfacl: All Options &amp; Output Interpretation</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC getfacl ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> report.csv
<span class="cb-out"># file: report.csv</span>
<span class="cb-out"># owner: ravi</span>
<span class="cb-out"># group: dataeng</span>
<span class="cb-out">user::rw-</span>          <span class="cb-cmt">← file owner: ravi</span>
<span class="cb-out">user:analyst:r--</span>   <span class="cb-cmt">← named user: analyst</span>
<span class="cb-out">group::r--</span>         <span class="cb-cmt">← owning group: dataeng</span>
<span class="cb-out">group:ml-team:rw-</span>  <span class="cb-cmt">← named group: ml-team</span>
<span class="cb-out">mask::rw-</span>          <span class="cb-cmt">← maximum effective perms for named entries</span>
<span class="cb-out">other::---</span>         <span class="cb-cmt">← everyone else</span>

<span class="cb-cmt">## ═══ THE + INDICATOR IN ls -l ════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> <span class="cb-flag">-la</span> report.csv
<span class="cb-out">-rw-rw----+ 1 ravi dataeng 4096 Jan 15 10:30 report.csv</span>
<span class="cb-cmt">#          ^ the + means "this file has an ACL"
# The rwx bits shown are ONLY the owner, group, other entries
# Named user/group entries are NOT visible in ls -l
# Use getfacl to see the full picture</span>

<span class="cb-cmt">## ═══ getfacl FLAGS ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> <span class="cb-flag">-n</span> report.csv   <span class="cb-cmt"># -n: show UID/GID numbers instead of names</span>
<span class="cb-out">user::rw-</span>
<span class="cb-out">user:1001:r--</span>              <span class="cb-cmt">← UID instead of "analyst"</span>
<span class="cb-out">group:2010:rw-</span>             <span class="cb-cmt">← GID instead of "ml-team"</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> <span class="cb-flag">-e</span> report.csv   <span class="cb-cmt"># -e: show effective permissions (after mask)</span>
<span class="cb-out">user::rw-</span>
<span class="cb-out">user:analyst:r--</span>      <span class="cb-cmt"># effective: r--</span>
<span class="cb-out">group::r--</span>            <span class="cb-cmt"># effective: r--</span>
<span class="cb-out">group:ml-team:rw-</span>     <span class="cb-cmt"># effective: rw-</span>
<span class="cb-out">mask::rw-</span>
<span class="cb-out">other::---</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> <span class="cb-flag">-p</span> report.csv   <span class="cb-cmt"># -p: skip leading / in absolute paths</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> <span class="cb-flag">-R</span> /data/      <span class="cb-cmt"># -R: recursive (all files in directory)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> <span class="cb-flag">-R</span> /data/ > acl_backup.txt   <span class="cb-cmt"># save all ACLs to file</span>

<span class="cb-cmt">## ═══ MULTIPLE FILES ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> file1.csv file2.csv file3.csv
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> *.csv                  <span class="cb-cmt"># all CSVs in current directory</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">find</span> /data -name "*.csv" | xargs getfacl   <span class="cb-cmt"># recursive find + getfacl</span>

<span class="cb-cmt">## ═══ CHECK IF A FILE HAS ACLS ════════════════════════════════</span>
<span class="cb-cmt"># Method 1: look for + in ls -l</span>
<span class="cb-prompt">$</span> ls -la report.csv | grep -q '+' && echo "has ACL"

<span class="cb-cmt"># Method 2: compare getfacl output line count</span>
<span class="cb-prompt">$</span> getfacl report.csv | grep -c "^[^#]"
<span class="cb-out">6</span>
<span class="cb-cmt"># minimal ACL = 3 lines (user::, group::, other::)
# extended ACL = 4+ lines (includes mask:: and named entries)</span>

<span class="cb-cmt"># Method 3: check for mask entry (only present if ACL exists)</span>
<span class="cb-prompt">$</span> getfacl report.csv | grep -q "^mask::" && echo "has extended ACL"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — setfacl: SETTING ACLs
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>setfacl</code> — Adding, Modifying &amp; Removing ACL Entries</h2>

<!-- CONSOLE 2 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — setfacl: -m modify, -x remove, -b remove all, -R recursive</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ -m : MODIFY (add or update entry) ══════════════════════</span>
<span class="cb-cmt"># Syntax: setfacl -m TYPE:NAME:PERMS file(s)</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> u:analyst:r-- report.csv
<span class="cb-cmt"># grant user 'analyst' read-only access</span>
<span class="cb-cmt"># u: = user  (also: user:)</span>
<span class="cb-cmt"># analyst = username</span>
<span class="cb-cmt"># r-- = read only</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> user:priya:rw- report.csv
<span class="cb-cmt"># grant user 'priya' read+write</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> g:ml-team:rwx /data/models/
<span class="cb-cmt"># grant group 'ml-team' full access to directory</span>
<span class="cb-cmt"># g: = group  (also: group:)</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> o::--- report.csv
<span class="cb-cmt"># set 'other' permissions to none</span>
<span class="cb-cmt"># o: = other  (also: other:)</span>

<span class="cb-cmt">## ═══ MULTIPLE ENTRIES IN ONE COMMAND ══════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> u:analyst:r--,g:ml-team:rw-,g:audit:r-- report.csv
<span class="cb-cmt"># Comma-separated list — apply all in one call</span>

<span class="cb-cmt">## ═══ PERMISSION NOTATION ══════════════════════════════════════</span>
<span class="cb-cmt"># Symbolic (recommended — most readable):
# r--  read only
# rw-  read and write
# r-x  read and execute
# rwx  read, write, execute
# ---  no permissions

# Octal (also accepted):
# 4 = r  2 = w  1 = x  0 = none
# setfacl -m u:analyst:4   = r--
# setfacl -m g:ml-team:6   = rw-
# setfacl -m u:admin:7     = rwx</span>

<span class="cb-cmt">## ═══ -x : REMOVE SPECIFIC ENTRY ══════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-x</span> u:analyst report.csv
<span class="cb-cmt"># remove the analyst user entry
# Note: no permission field needed with -x</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-x</span> g:ml-team report.csv
<span class="cb-cmt"># remove the ml-team group entry</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-x</span> u:analyst,g:ml-team report.csv
<span class="cb-cmt"># remove multiple entries at once</span>

<span class="cb-cmt">## ═══ -b : REMOVE ALL ACL ENTRIES (restore to classic perms) ══</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-b</span> report.csv
<span class="cb-cmt"># remove ALL extended ACL entries (named users/groups + mask)
# File reverts to just classic user::, group::, other:: bits
# The + disappears from ls -l output</span>

<span class="cb-cmt">## ═══ -k : REMOVE DEFAULT ACL ONLY ════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-k</span> /data/processed/
<span class="cb-cmt"># remove default ACL from directory (see Section 6 for default ACLs)
# Does NOT affect the directory's own ACL</span>

<span class="cb-cmt">## ═══ -R : RECURSIVE ══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-Rm</span> g:audit:r-- /data/
<span class="cb-cmt"># apply to directory AND all files/subdirs recursively</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-Rb</span> /data/
<span class="cb-cmt"># remove ALL ACLs recursively from /data/ and everything in it</span>

<span class="cb-cmt">## ═══ --set : REPLACE ENTIRE ACL ══════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">--set</span> u::rw-,g::r--,o::---,u:analyst:r-- report.csv
<span class="cb-cmt"># REPLACES the entire ACL with exactly these entries
# Must include user::, group::, other:: (minimum required entries)
# Useful when you want exact control, not incremental changes</span>

<span class="cb-cmt">## ═══ -M : READ ENTRIES FROM FILE ════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cat</span> acl_spec.txt
<span class="cb-out">u:analyst:r--</span>
<span class="cb-out">u:priya:rw-</span>
<span class="cb-out">g:ml-team:rw-</span>
<span class="cb-out">g:audit:r--</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-M</span> acl_spec.txt report.csv
<span class="cb-cmt"># apply all entries from file — great for bulk/automated setup</span>

<span class="cb-cmt">## ═══ --restore : RESTORE FROM getfacl BACKUP ══════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> <span class="cb-flag">-R</span> /data/ > /backup/data_acls.txt
<span class="cb-cmt"># ... later, after a system restore ...</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">--restore</span> /backup/data_acls.txt
<span class="cb-cmt"># restore ALL ACLs from the backup file</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — THE MASK
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The Mask — The Most Misunderstood Part of ACLs</h2>

<p>The <strong>mask</strong> is the upper bound on effective permissions for all named user and group entries (but NOT the file owner and NOT the <code>other</code> entry). Every time you add a named entry, bash recalculates the mask. Misunderstanding the mask is the source of most ACL confusion.</p>

<!-- Mask calculation SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Mask — Effective Permission = Entry AND Mask</text>

  <!-- Left side: entries -->
  <rect x="15" y="36" width="380" height="172" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="205" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">ACL Entries (what's stored)</text>

  <text x="30" y="78" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">user::rw-</text>
  <text x="220" y="78" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">→ NOT affected by mask</text>

  <text x="30" y="100" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">user:analyst:r--</text>
  <text x="30" y="122" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">user:priya:rwx</text>
  <text x="30" y="144" font-family="'Courier New',monospace" font-size="12" fill="#58a6ff">group::r--</text>
  <text x="30" y="166" font-family="'Courier New',monospace" font-size="12" fill="#58a6ff">group:ml-team:rw-</text>
  <text x="220" y="130" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">← these are all</text>
  <text x="220" y="145" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">affected by mask</text>

  <rect x="22" y="174" width="366" height="24" rx="4" fill="#2a2a1a" stroke="#ffa657" stroke-width="2"/>
  <text x="30" y="190" font-family="'Courier New',monospace" font-size="12" fill="#ffa657">mask::rw-</text>
  <text x="150" y="190" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">← upper bound for named entries</text>

  <text x="30" y="202" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">other::---</text>
  <text x="150" y="202" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">→ NOT affected by mask</text>

  <!-- Arrow -->
  <line x1="397" y1="120" x2="422" y2="120" stroke="#ffa657" stroke-width="2" marker-end="url(#arr-y)"/>
  <text x="409" y="113" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">AND</text>

  <!-- Right side: effective permissions -->
  <rect x="425" y="36" width="380" height="172" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="2"/>
  <text x="615" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Effective Permissions (what actually applies)</text>

  <text x="440" y="78" font-family="'Courier New',monospace" font-size="12" fill="#3fb950">user::rw-</text>
  <text x="580" y="78" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">rw- (unchanged)</text>

  <text x="440" y="100" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">user:analyst:r--  #effective: r--</text>
  <text x="440" y="118" font-family="'Courier New',monospace" font-size="11" fill="#f85149">user:priya:rwx    #effective: rw-</text>
  <text x="440" y="136" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">← priya has rwx but mask is rw-: execute bit removed!</text>
  <text x="440" y="154" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">group::r--        #effective: r--</text>
  <text x="440" y="172" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">group:ml-team:rw- #effective: rw-</text>

  <text x="440" y="196" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Effective = stored_permission AND mask</text>
  <text x="440" y="210" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">rwx AND rw- = rw- (x bit masked out)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — The Mask: Auto-calculation, Manual Override &amp; ls -l</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ HOW THE MASK IS CALCULATED AUTOMATICALLY ════════════════</span>
<span class="cb-cmt"># When you add named entries, bash sets mask = union of all named perms</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> u:analyst:r-- report.csv    <span class="cb-cmt"># mask becomes r--</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> g:ml-team:rw- report.csv    <span class="cb-cmt"># mask becomes rw-</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> u:admin:rwx report.csv      <span class="cb-cmt"># mask becomes rwx</span>

<span class="cb-cmt">## ═══ MASK = WHAT ls -l SHOWS AS THE GROUP BITS ════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">ls</span> <span class="cb-flag">-la</span> report.csv
<span class="cb-out">-rw-rw----+ 1 ravi dataeng 4096 report.csv</span>
<span class="cb-cmt">#      ^^^  the middle rwx field = MASK value (not the group:: entry!)
# This is the single most confusing thing about ACLs in ls -l
# The actual group:: entry is shown by getfacl</span>

<span class="cb-cmt">## ═══ SETTING THE MASK MANUALLY ════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> m::r-- report.csv
<span class="cb-cmt"># Restrict mask to r-- — now no named entry can have effective write
# Even if an entry has rw-, effective permission is r-- (AND mask)</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> m::rwx report.csv
<span class="cb-cmt"># Open mask to rwx — named entries get their full permissions</span>

<span class="cb-cmt">## ═══ WHY MODIFY THE MASK? ═════════════════════════════════════</span>
<span class="cb-cmt"># Scenario: You have an ACL granting ml-team:rw- on a directory
# But you want to temporarily block ALL writes without removing entries:
$ setfacl -m m::r-- /data/archive/
# Now ml-team can only read, even though their entry says rw-
# Restore later:
$ setfacl -m m::rw- /data/archive/
# All entries regain their write access</span>

<span class="cb-cmt">## ═══ -n FLAG: DON'T RECALCULATE MASK ══════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-n -m</span> u:analyst:rwx report.csv
<span class="cb-cmt"># -n: do NOT recalculate mask after adding entry
# Existing mask stays as-is even if new entry has higher perms</span>

<span class="cb-cmt">## ═══ UNDERSTANDING EFFECTIVE PERMISSIONS ═════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> <span class="cb-flag">-e</span> report.csv       <span class="cb-cmt"># -e shows effective perms explicitly</span>
<span class="cb-out">user::rw-</span>
<span class="cb-out">user:analyst:r--</span>      <span class="cb-cmt"># effective: r--</span>
<span class="cb-out">user:priya:rwx</span>        <span class="cb-cmt"># effective: rw-  ← x removed by mask</span>
<span class="cb-out">group::r--</span>            <span class="cb-cmt"># effective: r--</span>
<span class="cb-out">group:ml-team:rw-</span>     <span class="cb-cmt"># effective: rw-</span>
<span class="cb-out">mask::rw-</span>
<span class="cb-out">other::---</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — DEFAULT ACLs: INHERITANCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Default ACLs — Automatic Inheritance for New Files</h2>

<p>A <strong>default ACL</strong> on a directory is a template — any new file or subdirectory created inside that directory automatically inherits those permissions. This eliminates the need to set ACLs on every new file manually.</p>

<!-- Default ACL inheritance SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Default ACL Inheritance — Template Propagates to New Files</text>

  <!-- Parent directory -->
  <rect x="20" y="38" width="240" height="148" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="140" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#3fb950">/data/processed/ (dir)</text>
  <text x="35" y="76" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">Access ACL:</text>
  <text x="35" y="90" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">user::rwx</text>
  <text x="35" y="104" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">group::r-x</text>
  <text x="35" y="118" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">other::---</text>
  <text x="35" y="136" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">Default ACL:</text>
  <text x="35" y="150" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">default:user::rw-</text>
  <text x="35" y="164" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">default:user:analyst:r--</text>
  <text x="35" y="178" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">default:group:ml:rw-</text>

  <!-- Arrow -->
  <line x1="262" y1="120" x2="310" y2="80" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-y)"/>
  <line x1="262" y1="130" x2="310" y2="130" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-y)"/>
  <line x1="262" y1="140" x2="310" y2="175" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arr-y)"/>
  <text x="280" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">auto-</text>
  <text x="280" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">inherit</text>

  <!-- New file 1 -->
  <rect x="315" y="52" width="155" height="65" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="392" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">sales.csv (new file)</text>
  <text x="325" y="86" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">user::rw-</text>
  <text x="325" y="99" font-family="'Courier New',monospace" font-size="9" fill="#bc8cff">user:analyst:r--</text>
  <text x="325" y="112" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">group:ml:rw-</text>

  <!-- New subdir -->
  <rect x="315" y="113" width="155" height="65" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="392" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">archive/ (new dir)</text>
  <text x="325" y="147" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">user::rwx</text>
  <text x="325" y="160" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">+inherits default ACL</text>
  <text x="325" y="173" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">for its own children</text>

  <!-- New file 2 (existing file — not inherited) -->
  <rect x="315" y="172" width="155" height="18" rx="4" fill="#1f2027" stroke="#30363d" stroke-width="1"/>
  <text x="392" y="184" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">old.csv (existing) — unchanged</text>

  <!-- Note -->
  <rect x="490" y="38" width="315" height="148" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="505" y="58" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#e6edf3">Key Rules for Default ACLs:</text>
  <text x="505" y="78" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ Only directories can have default ACLs</text>
  <text x="505" y="96" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ New files inherit access ACL from default</text>
  <text x="505" y="114" font-family="'Segoe UI',sans-serif" font-size="11" fill="#3fb950">✅ New dirs inherit default ACL too (to propagate)</text>
  <text x="505" y="132" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">⚠ Existing files NOT affected</text>
  <text x="505" y="150" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">⚠ umask still applies to new files</text>
  <text x="505" y="168" font-family="'Segoe UI',sans-serif" font-size="11" fill="#f85149">❌ Removing default: doesn't remove existing</text>
</svg>
</div>

<!-- CONSOLE 4 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — Default ACLs: Set, View, Remove, Inheritance</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SETTING DEFAULT ACLs ════════════════════════════════════</span>
<span class="cb-cmt"># Prefix entries with d: or default: to make them default</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> d:u:analyst:r-- /data/processed/
<span class="cb-cmt"># d: = default — analyst gets read on all NEW files here</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> default:g:ml-team:rw- /data/models/
<span class="cb-cmt"># 'default:' prefix also works (same as d:)</span>

<span class="cb-cmt"># Set access AND default ACL together in one command:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> u:analyst:r--,d:u:analyst:r--,g:ml-team:rw-,d:g:ml-team:rw- /data/processed/

<span class="cb-cmt">## ═══ COMPLETE SETUP: ACCESS + DEFAULT FOR A SHARED DIR ═══════</span>
<span class="cb-cmt"># Full setup for /data/processed/ — multiple teams:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> \
    u::rwx,g::r-x,o::---,           \   <span class="cb-cmt"># owner, group, other (access)</span>
    u:analyst:r-x,                  \   <span class="cb-cmt"># analyst: read+exec dir (access)</span>
    g:ml-team:rwx,                  \   <span class="cb-cmt"># ml-team: full (access)</span>
    g:audit:r-x,                    \   <span class="cb-cmt"># audit: read+exec (access)</span>
    d:u::rw-,d:g::r--,d:o::---,     \   <span class="cb-cmt"># owner,group,other defaults for new files</span>
    d:u:analyst:r--,                \   <span class="cb-cmt"># analyst: read on new files</span>
    d:g:ml-team:rw-,                \   <span class="cb-cmt"># ml-team: read+write on new files</span>
    d:g:audit:r-- /data/processed/      <span class="cb-cmt"># audit: read on new files</span>

<span class="cb-cmt">## ═══ VIEWING DEFAULT ACLs ════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> /data/processed/
<span class="cb-out"># file: data/processed</span>
<span class="cb-out"># owner: ravi</span>
<span class="cb-out"># group: dataeng</span>
<span class="cb-out">user::rwx</span>
<span class="cb-out">user:analyst:r-x</span>
<span class="cb-out">group::r-x</span>
<span class="cb-out">group:ml-team:rwx</span>
<span class="cb-out">group:audit:r-x</span>
<span class="cb-out">mask::rwx</span>
<span class="cb-out">other::---</span>
<span class="cb-out">default:user::rw-</span>      <span class="cb-cmt">← default entries for new files</span>
<span class="cb-out">default:user:analyst:r--</span>
<span class="cb-out">default:group::r--</span>
<span class="cb-out">default:group:ml-team:rw-</span>
<span class="cb-out">default:group:audit:r--</span>
<span class="cb-out">default:mask::rw-</span>
<span class="cb-out">default:other::---</span>

<span class="cb-cmt">## ═══ VERIFY INHERITANCE WORKS ════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">touch</span> /data/processed/new_report.csv
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> /data/processed/new_report.csv
<span class="cb-out">user::rw-</span>             <span class="cb-cmt">← from default:user::rw-</span>
<span class="cb-out">user:analyst:r--</span>      <span class="cb-cmt">← inherited from default ACL!</span>
<span class="cb-out">group::r--</span>
<span class="cb-out">group:ml-team:rw-</span>     <span class="cb-cmt">← inherited from default ACL!</span>
<span class="cb-out">group:audit:r--</span>
<span class="cb-out">mask::rw-</span>
<span class="cb-out">other::---</span>
<span class="cb-cmt"># No setfacl needed! Inheritance did it automatically.</span>

<span class="cb-cmt">## ═══ REMOVE DEFAULT ACL ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-k</span> /data/processed/        <span class="cb-cmt"># -k: remove ALL default entries</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-x</span> d:u:analyst /data/processed/  <span class="cb-cmt"># remove one default entry</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — PERMISSION EVALUATION ALGORITHM
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Permission Evaluation Algorithm — How Linux Decides Access</h2>

<p>When a user tries to access a file with an ACL, Linux walks through a specific decision sequence. Understanding this is critical for diagnosing "why can't X access Y?"</p>

<!-- Permission evaluation flowchart SVG -->
<div class="diagram-wrap">
<svg viewBox="0 0 820 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <defs>
    <marker id="arr-g2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-r2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f85149"/></marker>
    <marker id="arr-b2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
  </defs>
  <rect width="820" height="340" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">ACL Permission Check Algorithm — Step by Step</text>

  <!-- Step 1 -->
  <polygon points="410,38 510,68 410,98 310,68" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="65" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">User == owner?</text>
  <text x="410" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">(UID match)</text>

  <text x="520" y="65" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">YES →</text>
  <line x1="512" y1="68" x2="620" y2="68" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g2)"/>
  <rect x="623" y="52" width="180" height="32" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="713" y="68" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Apply user:: entry</text>
  <text x="713" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">(mask NOT applied)</text>

  <text x="395" y="108" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">NO ↓</text>
  <line x1="410" y1="100" x2="410" y2="118" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-b2)"/>

  <!-- Step 2 -->
  <polygon points="410,120 510,150 410,180 310,150" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="147" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">Named user entry</text>
  <text x="410" y="160" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">user:NAME exists?</text>

  <text x="520" y="152" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">YES →</text>
  <line x1="512" y1="150" x2="620" y2="150" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g2)"/>
  <rect x="623" y="134" width="180" height="32" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="713" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Apply user:NAME AND mask</text>
  <text x="713" y="162" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">(effective perm used)</text>

  <text x="395" y="190" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">NO ↓</text>
  <line x1="410" y1="182" x2="410" y2="200" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-b2)"/>

  <!-- Step 3 -->
  <polygon points="410,202 510,232 410,262 310,232" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="410" y="229" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">User in named group</text>
  <text x="410" y="242" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">or owning group?</text>

  <text x="520" y="234" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">YES →</text>
  <line x1="512" y1="232" x2="620" y2="232" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr-g2)"/>
  <rect x="623" y="216" width="180" height="32" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="713" y="232" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">Apply group entry AND mask</text>
  <text x="713" y="244" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">if multiple matches: OR all</text>

  <text x="395" y="272" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">NO ↓</text>
  <line x1="410" y1="264" x2="410" y2="282" stroke="#8b949e" stroke-width="1.5" marker-end="url(#arr-b2)"/>

  <!-- Step 4 -->
  <rect x="290" y="284" width="240" height="40" rx="7" fill="#1f2027" stroke="#8b949e" stroke-width="2"/>
  <text x="410" y="308" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" fill="#8b949e">Apply other:: entry</text>
  <text x="713" y="310" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">(mask NOT applied)</text>

  <!-- Note at bottom -->
  <text x="410" y="335" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#30363d">Only ONE branch is taken per access check — the first matching step is used, evaluation stops</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — Diagnosing Permission Decisions</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ TRACE A PERMISSION DECISION ════════════════════════════</span>
<span class="cb-cmt"># Example: user 'analyst' tries to write to report.csv
# ACL:  user::rw-  user:analyst:r--  group::r--  mask::rw-  other::---
#
# Step 1: Is analyst == owner (ravi)? NO
# Step 2: Named user entry for analyst? YES → user:analyst:r--
#         Effective = r-- AND mask (rw-) = r--
#         Write requested, r-- has no w → ACCESS DENIED
#
# Fix: change entry to rw-</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> u:analyst:rw- report.csv

<span class="cb-cmt">## ═══ USER IN MULTIPLE MATCHING GROUPS ════════════════════════</span>
<span class="cb-cmt"># priya is in both 'ml-team' (rw-) and 'audit' (r--)
# ACL:  group:ml-team:rw-  group:audit:r--
#
# Step 3: priya in ml-team? YES (rw- AND mask)
#          priya in audit?  YES (r-- AND mask)
#         Multiple matches → Union of effective perms = rw-
# So priya gets rw- (the broader access)</span>

<span class="cb-cmt">## ═══ THE OWNER BYPASS (critical security point) ══════════════</span>
<span class="cb-cmt"># Owner uses user:: entry — mask NEVER applies to owner
# Even if mask::r--, the owner still gets their full user:: perms</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">-m</span> u::rw-,m::r-- report.csv
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> <span class="cb-flag">-e</span> report.csv
<span class="cb-out">user::rw-</span>                  <span class="cb-cmt">← effective: rw- (mask ignored for owner!)</span>
<span class="cb-out">user:analyst:r--</span>           <span class="cb-cmt">← effective: r-- (r-- AND r-- = r--)</span>
<span class="cb-out">group::r--</span>                 <span class="cb-cmt">← effective: r-- (r-- AND r-- = r--)</span>
<span class="cb-out">mask::r--</span>

<span class="cb-cmt">## ═══ other:: BYPASS ═══════════════════════════════════════════</span>
<span class="cb-cmt"># 'other' entry is reached ONLY if user is not owner, not named user,
# and not in any matching group
# The mask also does NOT apply to other::</span>

<span class="cb-cmt">## ═══ PRACTICAL: ACCESS CHECK SCRIPT ════════════════════════</span>
check_access() {
    local USER="$1" FILE="$2" PERM="$3"   <span class="cb-cmt"># PERM: r, w, or x</span>

    <span class="cb-cmt"># Check if user can access file with given permission</span>
    sudo -u "$USER" test -"$PERM" "$FILE" 2>/dev/null \
        && echo "$USER CAN $PERM $FILE" \
        || echo "$USER CANNOT $PERM $FILE"
}

check_access analyst /data/processed/report.csv r
check_access analyst /data/processed/report.csv w
check_access priya   /data/processed/report.csv w
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — COPYING & CLONING ACLs
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Copying &amp; Cloning ACLs Between Files</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — Copy ACLs: getfacl | setfacl, apply to many files</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ COPY ACL FROM ONE FILE TO ANOTHER ══════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> source.csv | <span class="cb-cmd">setfacl</span> <span class="cb-flag">--set-file=-</span> target.csv
<span class="cb-cmt"># - means read from stdin
# --set-file replaces the target's entire ACL with source's ACL</span>

<span class="cb-cmt"># Shorter with process substitution:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">--set-file=</span>&lt;(getfacl source.csv) target.csv

<span class="cb-cmt">## ═══ APPLY ONE FILE'S ACL TO MANY FILES ══════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> template.csv | <span class="cb-cmd">setfacl</span> <span class="cb-flag">--set-file=-</span> file1.csv file2.csv file3.csv

<span class="cb-cmt"># Apply to all CSVs in a directory:</span>
<span class="cb-prompt">$</span> getfacl template.csv | xargs -I{} setfacl --set-file=<(getfacl template.csv) {}  < <(find . -name "*.csv")

<span class="cb-cmt"># Simpler with a loop:</span>
ACL_TEMPLATE=$(getfacl template.csv)
for file in /data/processed/*.csv; do
    echo "$ACL_TEMPLATE" | setfacl --set-file=- "$file"
done

<span class="cb-cmt">## ═══ BACKUP AND RESTORE ALL ACLs IN A DIRECTORY ═════════════</span>
<span class="cb-cmt"># Backup:</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">getfacl</span> <span class="cb-flag">-R -p</span> /data/ > /backup/acls_$(date +%Y%m%d).txt
<span class="cb-cmt"># -R: recursive  -p: preserve absolute paths</span>

<span class="cb-cmt"># Restore (run from / or adjust paths):</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">setfacl</span> <span class="cb-flag">--restore</span> /backup/acls_20240115.txt

<span class="cb-cmt">## ═══ cp AND PRESERVING ACLs ═══════════════════════════════════</span>
<span class="cb-cmt"># Standard cp does NOT preserve ACLs by default</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cp</span> report.csv report_copy.csv            <span class="cb-cmt"># ACLs are LOST</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cp</span> <span class="cb-flag">--preserve=all</span> report.csv copy.csv   <span class="cb-cmt"># ACLs preserved (GNU cp)</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">cp</span> <span class="cb-flag">-a</span> report.csv report_copy.csv         <span class="cb-cmt"># -a = archive = preserves ACLs</span>

<span class="cb-cmt">## ═══ rsync AND ACLs ═══════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">rsync</span> <span class="cb-flag">-avA</span> /data/source/ /data/dest/      <span class="cb-cmt"># -A = preserve ACLs</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">rsync</span> <span class="cb-flag">-aAX</span> /data/source/ user@server:/data/ <span class="cb-cmt"># -X = preserve xattrs too</span>
<span class="cb-cmt"># Note: destination filesystem must also support ACLs</span>

<span class="cb-cmt">## ═══ tar AND ACLs ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">tar</span> <span class="cb-flag">--acls -czf</span> archive.tar.gz /data/    <span class="cb-cmt"># preserve ACLs in tar</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">tar</span> <span class="cb-flag">--acls -xzf</span> archive.tar.gz            <span class="cb-cmt"># restore with ACLs</span>
<span class="cb-cmt"># Standard tar WITHOUT --acls strips all ACL information!</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — UMASK & ACL INTERACTION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> umask &amp; ACL Interaction</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — umask with ACLs, New File Permissions</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ HOW umask INTERACTS WITH DEFAULT ACLs ═══════════════════</span>
<span class="cb-cmt"># When a new file is created in a directory with a default ACL:
# 1. Default ACL is used as the permission template
# 2. umask is applied to the default:user::, default:group::, default:other::
# 3. umask is NOT applied to named user/group entries
#
# Example:
# default:user::rw-   with umask 022 → file owner gets rw-
# default:group::rw-  with umask 022 → group gets r-- (write removed by umask)
# default:u:analyst:r-- → analyst still gets r-- (umask doesn't touch this)</span>

<span class="cb-prompt">$</span> umask
<span class="cb-out">0022</span>

<span class="cb-prompt">$</span> touch /data/processed/new.csv
<span class="cb-prompt">$</span> getfacl /data/processed/new.csv
<span class="cb-out">user::rw-</span>       <span class="cb-cmt">← default:user::rw- minus umask 022 = rw-</span>
<span class="cb-out">user:analyst:r--</span> <span class="cb-cmt">← umask NOT applied to named users</span>
<span class="cb-out">group::r--</span>       <span class="cb-cmt">← default:group::rw- minus umask 022 = r--</span>
<span class="cb-out">group:ml-team:rw-</span> <span class="cb-cmt">← umask NOT applied to named groups</span>
<span class="cb-out">mask::rw-</span>
<span class="cb-out">other::---</span>       <span class="cb-cmt">← default:other::--- minus umask = ---</span>

<span class="cb-cmt">## ═══ AVOID UMASK INTERFERENCE ════════════════════════════════</span>
<span class="cb-cmt"># If umask 022 removes group write from new files despite your default ACL:
# Option 1: change umask temporarily</span>
umask 002          <span class="cb-cmt"># allow group write</span>
touch newfile.csv
umask 022          <span class="cb-cmt"># restore</span>

<span class="cb-cmt"># Option 2: use install or tee for more controlled file creation</span>
echo "" | tee /data/processed/newfile.csv > /dev/null

<span class="cb-cmt"># Option 3: set ACL explicitly after creation</span>
touch /data/processed/newfile.csv
setfacl -m g:ml-team:rw- /data/processed/newfile.csv

<span class="cb-cmt">## ═══ SET UMASK IN SCRIPT FOR CONSISTENT RESULTS ═══════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">umask 007          # owner: all, group: all, other: none</span>
<span class="cb-out"># New files: rw- for owner (files), rwx for owner (dirs)</span>
<span class="cb-out"># Combined with default ACL: named group entries fully effective</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — How ACLs Are Stored &amp; Checked</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ ACLs in the Linux Kernel — xattr, VFS, and POSIX ACL Implementation</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# HOW ACLs ARE STORED

1. EXTENDED ATTRIBUTES (xattr)
   ACLs are stored as extended attributes on the inode.
   Two xattr keys are used:
     system.posix_acl_access  → access ACL (the regular ACL)
     system.posix_acl_default → default ACL (for directories)
   
   Each xattr value is a binary structure:
     4-byte header: ACL_EA_VERSION (2)
     Per entry (4 bytes each):
       2 bytes: tag (ACL_USER_OBJ, ACL_USER, ACL_GROUP, etc.)
       2 bytes: permission bits
       4 bytes: qualifier (UID/GID for named entries, 0 otherwise)
   
   View raw xattr:
   $ getfattr -n system.posix_acl_access report.csv
   $ getfattr -d report.csv   # dump all xattrs

2. FILESYSTEM STORAGE
   ext4: xattrs stored in inode body (up to 128 bytes) or in
         a dedicated xattr block for larger ACLs.
         Enabled by: tune2fs -o acl /dev/sda1
         The ACL_EA flag in the inode's i_file_acl points to xattr block.
   
   XFS:  xattrs stored in the inode (small) or in B-tree attributes
         (larger). ACLs enabled by default on XFS.
   
   Btrfs: xattrs stored as items in the filesystem tree.

3. VFS PERMISSION CHECK — inode_permission()
   Kernel entry point: security_inode_permission() (LSM hook)
   Falls through to: generic_permission() in fs/namei.c
   
   generic_permission() calls acl_permission_check():
     if (inode has ACL)  → call posix_acl_permission()
     else               → classic rwx check
   
   posix_acl_permission() in fs/posix_acl.c:
     for each ACL entry (in order):
       ACL_USER_OBJ:  if uid == owner → use these perms, return
       ACL_USER:      if uid == entry.uid → mask & entry.perms, return
       ACL_GROUP_OBJ: if gid matches → collect perms (don't return yet)
       ACL_GROUP:     if user in entry.gid → collect perms
       ACL_MASK:      apply mask to collected group perms, return if any match
       ACL_OTHER:     use these perms, return
   
   Key insight: GROUP entries are collected (union) before mask is applied.

4. READING ACL FROM DISK
   getfacl calls: getxattr(path, "system.posix_acl_access", buf, len)
   Kernel: looks up inode, calls inode->i_op->getxattr()
           Filesystem decodes xattr from disk into POSIX ACL structure
           Returns binary encoding to userspace
   getfacl: decodes binary to human-readable text

5. WRITING ACL TO DISK
   setfacl calls: setxattr(path, "system.posix_acl_access", buf, len, 0)
   Kernel: calls inode->i_op->setxattr()
           Validates the ACL structure
           Writes to filesystem-specific xattr storage
           Updates inode ctime
           For ext4: may allocate new xattr block if needed

6. /proc/fs/ext4/sda1/options — check ACL mount option
   $ cat /proc/fs/ext4/sda1/options | grep acl
   
7. PERFORMANCE
   Each file access: one xattr read if ACL present (cached in inode)
   The kernel caches ACLs in a per-inode ACL pointer (struct posix_acl*)
   Cached ACL is freed when inode is evicted from icache
   Overhead: ~1 pointer dereference per access if ACL is cached
</pre>
</div>

<div class="two-col-grid" style="margin-top:20px;">
  <div class="callout-box info-box">
    <strong>🔬 Inspect Raw ACL xattr:</strong>
    <pre style="margin:6px 0 0;font-family:monospace;font-size:12px;background:transparent;border:none;padding:0;color:#e6edf3;">$ apt install attr
$ getfattr -n system.posix_acl_access report.csv
# file: report.csv
system.posix_acl_access=0s...

$ getfattr -d -m ".*" report.csv
# show ALL extended attributes</pre>
  </div>
  <div class="callout-box info-box">
    <strong>📁 NFS &amp; Samba Considerations:</strong>
    <p style="margin:6px 0 0;font-size:13px;">NFSv4 has its own ACL model (richer than POSIX ACLs). NFSv3 passes ACLs via NFSACL protocol — not universally supported. Samba maps Windows NTFS ACLs to POSIX ACLs when <code>vfs objects = acl_xattr</code> is set. Always test ACL behaviour when sharing across protocols.</p>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Multi-Team Data Access</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — Production ACL Patterns for Data Platforms</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: DATA LAKE SETUP — TIERED ACCESS ═══════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">set -euo pipefail</span>
<span class="cb-out"></span>
<span class="cb-out">setup_data_lake() {</span>
<span class="cb-out">    local BASE="/data"</span>
<span class="cb-out"></span>
<span class="cb-out">    # Raw zone: only pipelines can write</span>
<span class="cb-out">    setfacl -Rm  u::rwx,g::r-x,o::---                    "$BASE/raw/"</span>
<span class="cb-out">    setfacl -Rm  d:g:pipelines:rwx,d:g:analysts:r-x       "$BASE/raw/"</span>
<span class="cb-out"></span>
<span class="cb-out">    # Processed zone: analysts and ML team can read</span>
<span class="cb-out">    setfacl -Rm  d:g:analysts:r-x,d:g:ml-team:rwx         "$BASE/processed/"</span>
<span class="cb-out">    setfacl -Rm  d:g:audit:r-x,d:g:governance:r-x         "$BASE/processed/"</span>
<span class="cb-out"></span>
<span class="cb-out">    # Models zone: ML team writes, data science reads</span>
<span class="cb-out">    setfacl -Rm  d:g:ml-team:rwx,d:g:datascience:r-x      "$BASE/models/"</span>
<span class="cb-out"></span>
<span class="cb-out">    # Archive zone: read-only for everyone except owner</span>
<span class="cb-out">    setfacl -Rm  g:analysts:r--,g:ml-team:r--,o::---      "$BASE/archive/"</span>
<span class="cb-out">    echo "Data lake ACLs configured"</span>
<span class="cb-out">}</span>

<span class="cb-cmt">## ═══ PATTERN 2: GRANT TEMP ACCESS TO A CONTRACTOR ═════════════</span>
grant_temp_access() {
    local USER="$1" DIR="$2" PERM="\${3:-r--}" DAYS="\${4:-7}"
    local EXPIRY
    EXPIRY=$(date -d "+\${DAYS} days" +%Y-%m-%d)

    setfacl -m "u:\${USER}:\${PERM}" "$DIR"
    echo "# ACL_TEMP user=$USER dir=$DIR perm=$PERM expiry=$EXPIRY" \
        >> /etc/acl_temp_grants.log
    echo "Granted $PERM on $DIR to $USER until $EXPIRY"
}

<span class="cb-cmt"># Cron job to revoke expired grants:</span>
revoke_expired() {
    local TODAY
    TODAY=$(date +%Y-%m-%d)
    while IFS= read -r line; do
        [[ $line == "# ACL_TEMP "* ]] || continue
        eval "\${line#'# ACL_TEMP '}"
        [[ $expiry < $TODAY ]] || continue
        setfacl -x "u:$user" "$dir" 2>/dev/null && \
            echo "Revoked $user from $dir (expired $expiry)"
    done < /etc/acl_temp_grants.log
}

<span class="cb-cmt">## ═══ PATTERN 3: ACL AUDIT SCRIPT ════════════════════════════</span>
audit_acls() {
    local DIR="$1"
    echo "=== ACL Audit: $DIR ==="
    echo "Files with non-standard ACLs:"
    find "$DIR" -print0 | while IFS= read -r -d '' file; do
        local acl
        acl=$(getfacl -p "$file" 2>/dev/null)
        <span class="cb-cmt"># Check if it has named user/group entries</span>
        if echo "$acl" | grep -qE "^(user|group):[^:]+:"; then
            echo "  $file"
            echo "$acl" | grep -E "^(user|group):[^:]+:" | sed 's/^/    /'
        fi
    done
}

<span class="cb-cmt">## ═══ PATTERN 4: PIPELINE CREATES FILES WITH CORRECT ACLs ═════</span>
<span class="cb-cmt"># Step 1: set default ACL on output directory ONCE at setup:</span>
setfacl -m d:g:analysts:r--,d:g:ml-team:r--,d:g:audit:r-- /data/output/

<span class="cb-cmt"># Step 2: pipeline just creates files normally — ACLs auto-inherited</span>
python3 generate_report.py > /data/output/daily_report.csv
<span class="cb-cmt"># No explicit setfacl call needed in the pipeline!</span>

<span class="cb-cmt">## ═══ PATTERN 5: VERIFY ACCESS ACROSS TEAMS ══════════════════</span>
verify_access() {
    local FILE="$1"
    declare -A EXPECTED_ACCESS=(
        [ravi]="rw"
        [analyst]="r"
        [priya]="rw"
        [ml-user]="rw"
        [audit-user]="r"
        [nobody]=""
    )

    echo "=== Access verification: $FILE ==="
    for USER in "\${!EXPECTED_ACCESS[@]}"; do
        local ACTUAL="" EXPECTED="\${EXPECTED_ACCESS[$USER]}"
        id "$USER" &>/dev/null || continue
        sudo -u "$USER" test -r "$FILE" 2>/dev/null && ACTUAL="\${ACTUAL}r"
        sudo -u "$USER" test -w "$FILE" 2>/dev/null && ACTUAL="\${ACTUAL}w"
        if [[ "$ACTUAL" == "$EXPECTED" ]]; then
            echo "  ✅ $USER: $ACTUAL (expected $EXPECTED)"
        else
            echo "  ❌ $USER: $ACTUAL (expected $EXPECTED) — MISMATCH"
        fi
    done
}

<span class="cb-cmt">## ═══ PATTERN 6: setfacl IN CRON / AUTOMATION ═════════════════</span>
<span class="cb-cmt"># After nightly pipeline creates new partition directories:</span>
post_pipeline_acl() {
    local DATE_DIR="/data/processed/$(date +%Y/%m/%d)"
    [[ -d "$DATE_DIR" ]] || return

    setfacl -Rm g:analysts:r-x,g:ml-team:rwx,g:audit:r-x "$DATE_DIR"
    setfacl -Rm d:g:analysts:r--,d:g:ml-team:rw-,d:g:audit:r-- "$DATE_DIR"
    echo "ACLs set on $DATE_DIR"
}
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — NFS, SAMBA & FILESYSTEM NOTES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Filesystem Notes — NFS, Samba &amp; Compatibility</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th>Filesystem / Protocol</th><th>ACL Support</th><th>Notes</th></tr></thead>
<tbody>
<tr><td><strong>ext4</strong></td><td style="color:#3fb950;">✅ Full POSIX ACL</td><td>Requires <code>acl</code> mount option (or default in many distros)</td></tr>
<tr><td><strong>XFS</strong></td><td style="color:#3fb950;">✅ Full POSIX ACL</td><td>ACLs enabled by default — no extra config needed</td></tr>
<tr><td><strong>Btrfs</strong></td><td style="color:#3fb950;">✅ Full POSIX ACL</td><td>ACLs enabled by default, stored in xattrs</td></tr>
<tr><td><strong>tmpfs</strong></td><td style="color:#3fb950;">✅ POSIX ACL</td><td>Requires <code>acl</code> mount option</td></tr>
<tr><td><strong>FAT32 / exFAT</strong></td><td style="color:#f85149;">❌ No ACL</td><td>No extended attributes at all</td></tr>
<tr><td><strong>NTFS (ntfs-3g)</strong></td><td style="color:#ffa657;">⚠ Windows ACLs only</td><td>Windows ACL format, not POSIX — different model</td></tr>
<tr><td><strong>NFSv3</strong></td><td style="color:#ffa657;">⚠ Via NFSACL protocol</td><td>Optional protocol extension — not all servers/clients support it</td></tr>
<tr><td><strong>NFSv4</strong></td><td style="color:#ffa657;">⚠ NFSv4 ACLs</td><td>Rich ACL model, different from POSIX — <code>nfs4-acl-tools</code> package</td></tr>
<tr><td><strong>Samba / CIFS</strong></td><td style="color:#ffa657;">⚠ With vfs_acl_xattr</td><td>Set <code>vfs objects = acl_xattr</code> in smb.conf; maps NT → POSIX</td></tr>
<tr><td><strong>ZFS (on Linux)</strong></td><td style="color:#3fb950;">✅ NFSv4-style ACLs</td><td>Uses richacl / NFSv4 model — different from POSIX ACLs</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — COMPLETE COMMAND REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Command Reference</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:34%">Command</th><th>Action</th></tr></thead>
<tbody>
<tr><td colspan="2" style="background:#0e1824;color:#58a6ff;font-family:'Segoe UI',sans-serif;font-weight:bold;">getfacl — Reading ACLs</td></tr>
<tr><td style="font-family:monospace;">getfacl file</td><td>Show full ACL of file</td></tr>
<tr><td style="font-family:monospace;">getfacl -e file</td><td>Show effective permissions (after mask)</td></tr>
<tr><td style="font-family:monospace;">getfacl -n file</td><td>Show UIDs/GIDs instead of names</td></tr>
<tr><td style="font-family:monospace;">getfacl -R dir/</td><td>Recursive — all files in directory</td></tr>
<tr><td style="font-family:monospace;">getfacl -R -p dir/</td><td>Recursive with absolute paths (for backup)</td></tr>
<tr><td style="font-family:monospace;">getfacl -R dir/ &gt; backup.txt</td><td>Save all ACLs to file</td></tr>
<tr><td colspan="2" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">setfacl — Modifying ACLs</td></tr>
<tr><td style="font-family:monospace;">setfacl -m u:USER:PERMS file</td><td>Add/update named user entry</td></tr>
<tr><td style="font-family:monospace;">setfacl -m g:GROUP:PERMS file</td><td>Add/update named group entry</td></tr>
<tr><td style="font-family:monospace;">setfacl -m m::PERMS file</td><td>Set mask manually</td></tr>
<tr><td style="font-family:monospace;">setfacl -m d:u:USER:PERMS dir/</td><td>Set default ACL for named user</td></tr>
<tr><td style="font-family:monospace;">setfacl -m d:g:GROUP:PERMS dir/</td><td>Set default ACL for named group</td></tr>
<tr><td style="font-family:monospace;">setfacl -x u:USER file</td><td>Remove named user entry</td></tr>
<tr><td style="font-family:monospace;">setfacl -x g:GROUP file</td><td>Remove named group entry</td></tr>
<tr><td style="font-family:monospace;">setfacl -b file</td><td>Remove ALL ACL entries (revert to classic)</td></tr>
<tr><td style="font-family:monospace;">setfacl -k dir/</td><td>Remove default ACL from directory</td></tr>
<tr><td style="font-family:monospace;">setfacl -Rm ENTRY dir/</td><td>Apply recursively to all files</td></tr>
<tr><td style="font-family:monospace;">setfacl -n -m ENTRY file</td><td>Don't recalculate mask after change</td></tr>
<tr><td style="font-family:monospace;">setfacl --set u::rwx,g::r--,o::--- file</td><td>Replace entire ACL (specify all entries)</td></tr>
<tr><td style="font-family:monospace;">setfacl -M acl_file.txt file</td><td>Read entries from file</td></tr>
<tr><td style="font-family:monospace;">setfacl --restore backup.txt</td><td>Restore ACLs from getfacl backup</td></tr>
<tr><td style="font-family:monospace;">getfacl src | setfacl --set-file=- dst</td><td>Clone ACL from one file to another</td></tr>
<tr><td colspan="2" style="background:#2a2a1a;color:#ffa657;font-family:'Segoe UI',sans-serif;font-weight:bold;">Entry Format Quick Reference</td></tr>
<tr><td style="font-family:monospace;">u:USER:rwx</td><td>Named user with rwx (also: user:USER:rwx)</td></tr>
<tr><td style="font-family:monospace;">g:GROUP:r--</td><td>Named group read-only (also: group:GROUP:r--)</td></tr>
<tr><td style="font-family:monospace;">u::rw-</td><td>File owner entry (empty name = owner)</td></tr>
<tr><td style="font-family:monospace;">g::r--</td><td>Owning group entry</td></tr>
<tr><td style="font-family:monospace;">o::---</td><td>Others entry (also: other::---)</td></tr>
<tr><td style="font-family:monospace;">m::rw-</td><td>Mask entry</td></tr>
<tr><td style="font-family:monospace;">d:u:USER:r--</td><td>Default named user (on directories)</td></tr>
<tr><td style="font-family:monospace;">d:g:GROUP:rw-</td><td>Default named group</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — COMMON MISTAKES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Common Mistakes &amp; Gotchas</h2>

<div class="two-col-grid">
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ MISTAKE: Forgetting mask</div>
    <p style="font-size:12px;color:#8b949e;margin:8px 0;">Setting a named user to <code>rwx</code> but mask is <code>r--</code> — effective permission is <code>r--</code>. Always check with <code>getfacl -e</code>.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;">setfacl -m u:user:rwx,m::rwx file
getfacl -e file   # verify effective</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ MISTAKE: ls -l showing wrong group perms</div>
    <p style="font-size:12px;color:#8b949e;margin:8px 0;">The group bits in <code>ls -l</code> show the <strong>mask</strong>, not the <code>group::</code> entry. Don't rely on <code>ls -l</code> to understand ACLs — use <code>getfacl</code>.</p>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ MISTAKE: Default ACL on files</div>
    <p style="font-size:12px;color:#8b949e;margin:8px 0;">Only <em>directories</em> can have default ACLs. Setting <code>d:u:user:r--</code> on a regular file silently fails or returns an error.</p>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ MISTAKE: cp loses ACLs</div>
    <p style="font-size:12px;color:#8b949e;margin:8px 0;">Plain <code>cp file dest</code> strips ACLs. Use <code>cp -a</code> or <code>cp --preserve=all</code> to preserve them. Same applies to <code>tar</code> without <code>--acls</code>.</p>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ MISTAKE: setfacl -R on executable files</div>
    <p style="font-size:12px;color:#8b949e;margin:8px 0;">Running <code>setfacl -Rm g:team:rwx /data/</code> gives <code>x</code> to every file including text/data files. Separate file and directory permissions in automation scripts.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;">find /data -type f | xargs setfacl -m g:team:rw-
find /data -type d | xargs setfacl -m g:team:rwx</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ MISTAKE: Expecting ACLs to work over NFS</div>
    <p style="font-size:12px;color:#8b949e;margin:8px 0;">NFSv3 ACL support varies by server/client. NFSv4 uses a different ACL model. Always test on the actual mount — don't assume ext4 ACLs behave the same over NFS.</p>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 15 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — First ACL Setup</h4>
    <p>Create a shared file and set up multi-user access:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create <code>/tmp/acl_lab/</code> directory and <code>sales.csv</code> inside it</li>
      <li>Check current permissions: <code>ls -la</code> and <code>getfacl</code></li>
      <li>Grant user <code>nobody</code> read-only access to <code>sales.csv</code>: <code>setfacl -m u:nobody:r--</code></li>
      <li>Verify the <code>+</code> appears in <code>ls -la</code></li>
      <li>Run <code>getfacl -e sales.csv</code> — note which entries are affected by the mask</li>
      <li>Add a named group entry: <code>setfacl -m g:nogroup:rw-</code></li>
      <li>Check what happened to the mask automatically</li>
      <li>Remove the nobody entry: <code>setfacl -x u:nobody</code></li>
      <li>Remove ALL ACL entries: <code>setfacl -b sales.csv</code></li>
      <li>Confirm the <code>+</code> is gone from <code>ls -la</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Default ACL Inheritance</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create <code>/tmp/shared_data/</code> directory</li>
      <li>Set a default ACL so <code>nobody</code> gets read access to all new files: <code>setfacl -m d:u:nobody:r-- /tmp/shared_data/</code></li>
      <li>View the default ACL with <code>getfacl /tmp/shared_data/</code> — find the <code>default:</code> entries</li>
      <li>Create a new file inside: <code>touch /tmp/shared_data/report.txt</code></li>
      <li>Run <code>getfacl /tmp/shared_data/report.txt</code> — verify nobody's entry was inherited</li>
      <li>Create a subdirectory: <code>mkdir /tmp/shared_data/archive/</code></li>
      <li>Run <code>getfacl /tmp/shared_data/archive/</code> — verify it also has the default ACL</li>
      <li>Create a file in the subdirectory and verify it also inherits</li>
      <li>Remove the default ACL: <code>setfacl -k /tmp/shared_data/</code></li>
      <li>Create another file — confirm it no longer inherits</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Mask Behaviour</h4>
    <p>Explore how the mask controls effective permissions:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create <code>data.csv</code> and add: <code>setfacl -m u:nobody:rwx,g:nogroup:rw-</code></li>
      <li>Run <code>getfacl -e data.csv</code> — note the current mask and effective permissions</li>
      <li>Manually restrict the mask: <code>setfacl -m m::r--</code></li>
      <li>Run <code>getfacl -e data.csv</code> again — what are the effective permissions now?</li>
      <li>Verify: <code>sudo -u nobody test -w data.csv && echo "can write" || echo "cannot write"</code></li>
      <li>Re-open the mask: <code>setfacl -m m::rwx</code></li>
      <li>Use <code>-n</code> flag: add a new entry with <code>setfacl -n -m u:nobody:rwx</code> — check if mask changed</li>
      <li>Without <code>-n</code>: <code>setfacl -m u:nobody:rwx</code> — now check the mask</li>
      <li>Explain in a comment why <code>ls -l</code> shows different group permissions than <code>getfacl</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — ACL Backup, Clone &amp; Restore</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create <code>/tmp/acl_test/</code> with three files: <code>a.csv b.csv c.csv</code></li>
      <li>Set different ACLs on each file (different users, different permissions)</li>
      <li>Set a default ACL on the directory</li>
      <li>Backup ALL ACLs recursively: <code>getfacl -R -p /tmp/acl_test/ &gt; /tmp/acl_backup.txt</code></li>
      <li>View the backup file — understand its format</li>
      <li>Remove all ACLs: <code>setfacl -Rb /tmp/acl_test/</code></li>
      <li>Verify ACLs are gone with <code>getfacl -R /tmp/acl_test/</code></li>
      <li>Restore: <code>setfacl --restore /tmp/acl_backup.txt</code></li>
      <li>Verify restoration was successful</li>
      <li>Clone ACL from <code>a.csv</code> to <code>b.csv</code>: <code>getfacl a.csv | setfacl --set-file=- b.csv</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Production Data Platform ACL Setup</h4>
    <p>Build a complete ACL setup script for a multi-team data platform:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Structure:</strong> Create <code>/tmp/data_platform/{raw,processed,models,reports,archive}/</code></li>
      <li><strong>Teams:</strong> Use system groups <code>pipelines</code>, <code>analysts</code>, <code>mlteam</code>, <code>governance</code> — create them if they don't exist</li>
      <li><strong>Access matrix:</strong> raw: pipelines=rwx, analysts=r-x, others=none | processed: pipelines=rwx, analysts=rwx, mlteam=r-x | models: mlteam=rwx, analysts=r-x | reports: analysts=rwx, governance=r-x | archive: governance=rwx, analysts=r-x, others=none</li>
      <li><strong>Default ACLs:</strong> Each zone's default ACL must match its access ACL (so new files inherit correctly)</li>
      <li><strong>Files vs directories:</strong> Apply <code>rw-</code> (no x) to files, <code>rwx</code> (with x) to directories — use <code>find -type f</code> and <code>find -type d</code> separately</li>
      <li><strong>Verification function:</strong> Write <code>verify_setup()</code> that runs <code>getfacl</code> on each zone and checks expected entries exist using <code>grep</code></li>
      <li><strong>Audit function:</strong> Write <code>audit_access()</code> that finds any files with <code>other::r</code> or <code>other::w</code> and prints a warning</li>
      <li><strong>Backup:</strong> Save the complete ACL setup to <code>/tmp/platform_acls_$(date +%Y%m%d).txt</code></li>
    </ol>
    <p><strong>The script must be idempotent</strong> — running it twice produces the same result.</p>
  </div>
</div>

<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Data Platform — Day 180</div>
    <p>Six months after Priya showed him that one <code>setfacl</code> command, Ravi had built a complete data platform access system. Twelve teams. Four data zones. Default ACLs on every directory so new pipeline outputs were immediately accessible to the right people — automatically, with zero manual intervention.</p>
    <p>The governance team could read everything. The ML team could write to their zone and read processed data. The analytics team could read processed outputs and write reports. Pipeline service accounts could write to raw and processed. And nobody could reach the archive zone except the data governance team.</p>
    <p>All of this with ACLs — and classic Unix permissions intact underneath. The security team ran a quarterly audit: <code>getfacl -R /data/ | grep "^other::rw"</code> — empty output, as expected. Not a single file was world-writable.</p>
    <p>"This is what least-privilege looks like," Priya told him. "Not one big permission for everyone — but exactly the right permission for each person, in each zone, at each time." <strong>That's what ACLs make possible.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};