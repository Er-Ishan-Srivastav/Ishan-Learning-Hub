
var mount_io = {
    title: "Mount & I/O Basics",
    description: "Master Linux storage and I/O from first principles — the VFS layer, block devices, mounting filesystems, /etc/fstab, disk usage analysis with df and du, inode internals, I/O scheduling, performance monitoring with iostat and iotop, and production patterns for data engineering pipelines.",
    content: `
<style>
/* ── Keyframe animations ── */
@keyframes mi-flow  { 0%{stroke-dashoffset:28} 100%{stroke-dashoffset:0} }
@keyframes mi-pulse { 0%,100%{opacity:1} 50%{opacity:.18} }
@keyframes mi-pop   { 0%{transform:scale(0);opacity:0} 80%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
@keyframes mi-mount { 0%{transform:translateY(-12px);opacity:0} 100%{transform:translateY(0);opacity:1} }
@keyframes mi-blink { 0%,100%{fill:#3fb950;stroke:#3fb950} 50%{fill:#0d1a0d;stroke:#238636} }
@keyframes mi-spin  { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes mi-scan  { 0%{transform:translateX(0)} 100%{transform:translateX(280px)} }
@keyframes mi-fill  { 0%{width:0%} 100%{width:82%} }

.mi-flow  { stroke-dasharray:7 5; animation: mi-flow  .9s linear infinite; }
.mi-pulse { animation: mi-pulse 1.8s ease-in-out infinite; }
.mi-blink { animation: mi-blink 2.4s ease-in-out infinite; }
.mi-pop   { animation: mi-pop   .5s cubic-bezier(.34,1.56,.64,1) both; }
.mi-mount { animation: mi-mount .6s ease-out both; }
</style>

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Disk Full Disaster — Day 440</div>
    <br>
    <p>The pipeline had been writing output files for six hours. Then everything stopped. No errors at first — just no new files. Then, slowly: "No space left on device." Ravi checked <code>df -h</code>: the <code>/data</code> partition was 100% full. The pipeline had filled the disk.</p>
    <br>
    <p>What made it worse: the <code>/</code> (root) filesystem was fine. <code>/tmp</code> was fine. Only <code>/data</code> was full — a separate partition mounted at that path. Ravi hadn't realised that <code>/data</code> was its own filesystem with its own capacity. He thought of the disk as "one disk."</p>
    <br>
    <p>Priya ran four commands: <code>df -h</code> to see all mounted filesystems and their usage, <code>du -sh /data/*</code> to find what was using the space, <code>lsblk</code> to see the partition layout, and <code>findmnt /data</code> to see exactly what was mounted there. Then she explained the VFS layer — how Linux treats every storage device, network share, and virtual filesystem through the same interface, and how <code>mount</code> is what brings them all into the directory tree.</p>
    <br>
    <p>"Linux storage," she said, "is a tree of mount points. Learn to see that tree, and you'll never be surprised by a full disk again."</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — VFS: THE VIRTUAL FILE SYSTEM LAYER
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The VFS Layer — How Linux Unifies All Storage</h2>

<p>The <strong>Virtual File System (VFS)</strong> is the kernel abstraction that lets every file operation (<code>open</code>, <code>read</code>, <code>write</code>, <code>stat</code>) work identically regardless of whether the underlying storage is a local disk, an NFS share, a USB stick, a tmpfs in RAM, or a proc virtual filesystem. VFS is the reason <code>cat /proc/cpuinfo</code> and <code>cat /home/ravi/data.csv</code> use the same system call.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="mi-grn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="mi-blu" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="mi-orn" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="mi-pur" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
    <marker id="mi-red" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#f85149"/></marker>
    <marker id="mi-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#8b949e"/></marker>
  </defs>
  <rect width="820" height="360" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Linux VFS Stack — One Interface for All Storage</text>

  <!-- User space -->
  <rect x="14" y="36" width="792" height="44" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="110" y="55" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">User Space</text>
  <text x="110" y="71" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">cat, cp, python open()</text>
  <text x="450" y="55" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">open()  read()  write()  stat()  mmap()  sync()</text>
  <text x="450" y="70" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">system calls — identical for ALL file types</text>

  <!-- Syscall boundary -->
  <line x1="14" y1="88" x2="806" y2="88" stroke="#30363d" stroke-width="1" stroke-dasharray="8,4"/>
  <text x="418" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">─── kernel boundary ───</text>

  <!-- VFS layer -->
  <rect x="14" y="104" width="792" height="40" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2.5"/>
  <text x="410" y="122" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#58a6ff">VFS — Virtual File System</text>
  <text x="410" y="137" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">inode / dentry / file / superblock objects — unified interface to all filesystem drivers</text>

  <!-- FS drivers row -->
  <text x="410" y="163" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Filesystem Drivers</text>
  <rect x="14"  y="170" width="108" height="36" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="68"  y="192" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">ext4</text>

  <rect x="130" y="170" width="108" height="36" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="184" y="192" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">xfs</text>

  <rect x="246" y="170" width="108" height="36" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="300" y="192" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">btrfs</text>

  <rect x="362" y="170" width="108" height="36" rx="6" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="416" y="192" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">tmpfs</text>

  <rect x="478" y="170" width="108" height="36" rx="6" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="532" y="192" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">proc</text>

  <rect x="594" y="170" width="108" height="36" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="648" y="192" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">nfs</text>

  <rect x="710" y="170" width="96" height="36" rx="6" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="758" y="192" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">sysfs</text>

  <!-- Page cache -->
  <rect x="14" y="220" width="792" height="32" rx="6" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="410" y="240" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">Page Cache — Disk Blocks Cached in RAM (speeds up repeated reads)</text>

  <!-- Block layer -->
  <rect x="14" y="264" width="792" height="32" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="410" y="284" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Block Layer — I/O Scheduler (BFQ, mq-deadline, none)</text>

  <!-- Block devices row -->
  <text x="410" y="314" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Block Devices</text>
  <rect x="60"  y="320" width="140" height="32" rx="6" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="130" y="340" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">/dev/sda  /dev/nvme0n1</text>

  <rect x="230" y="320" width="140" height="32" rx="6" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="300" y="340" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">/dev/sdb  /dev/vda</text>

  <rect x="400" y="320" width="140" height="32" rx="6" fill="#1f2027" stroke="#30363d" stroke-width="1.5"/>
  <text x="470" y="340" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">/dev/loop0  (loopback)</text>

  <rect x="570" y="320" width="140" height="32" rx="6" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="640" y="340" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">RAM  (tmpfs/ramfs)</text>

  <!-- Animated arrow down through layers -->
  <line x1="410" y1="144" x2="410" y2="170" stroke="#58a6ff" stroke-width="2" marker-end="url(#mi-blu)" class="mi-flow"/>
  <line x1="410" y1="206" x2="410" y2="220" stroke="#ffa657" stroke-width="2" marker-end="url(#mi-orn)" class="mi-flow"/>
  <line x1="410" y1="252" x2="410" y2="264" stroke="#30363d" stroke-width="2" marker-end="url(#mi-arr)" class="mi-flow"/>
</svg>
<p class="diagram-caption">When you call <code>open("/data/input.csv", O_RDONLY)</code>, the kernel: looks up the path in the VFS dentry cache, resolves it to an inode, checks if the block is already in the page cache (if yes: return from RAM), if not: passes the I/O request to the block layer scheduler, which sends it to the physical device driver. The filesystem type (ext4, xfs, tmpfs) is fully transparent to your program.</p>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 10 — lsblk, blkid, findmnt: discover block devices and mounts</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ lsblk — BLOCK DEVICE TREE ══════════════════════════════</span>
<span class="cb-prompt">$</span> lsblk
<span class="cb-out">NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT</span>
<span class="cb-out">sda           8:0    0  500G  0 disk</span>
<span class="cb-out">├─sda1        8:1    0    1G  0 part /boot</span>
<span class="cb-out">├─sda2        8:2    0   50G  0 part /</span>
<span class="cb-out">└─sda3        8:3    0  449G  0 part /data</span>
<span class="cb-out">sdb           8:16   0    2T  0 disk</span>
<span class="cb-out">└─sdb1        8:17   0    2T  0 part /backup</span>
<span class="cb-out">loop0         7:0    0   55M  1 loop /snap/core18</span>
<span class="cb-cmt"># MAJ:MIN = major:minor device numbers
# RM = removable  RO = read-only  TYPE = disk/part/loop/lvm</span>

<span class="cb-prompt">$</span> lsblk -f           <span class="cb-cmt"># show filesystem type and UUID</span>
<span class="cb-out">NAME    FSTYPE FSVER LABEL  UUID                                 MOUNTPOINT</span>
<span class="cb-out">sda</span>
<span class="cb-out">├─sda1  ext4   1.0          abc12345-...                         /boot</span>
<span class="cb-out">├─sda2  ext4   1.0          def67890-...                         /</span>
<span class="cb-out">└─sda3  xfs                  fedcba-...                          /data</span>

<span class="cb-prompt">$</span> lsblk -o NAME,SIZE,TYPE,FSTYPE,MOUNTPOINT  <span class="cb-cmt"># custom columns</span>

<span class="cb-cmt">## ═══ blkid — BLOCK DEVICE IDENTIFIERS ════════════════════════</span>
<span class="cb-prompt">$</span> sudo blkid
<span class="cb-out">/dev/sda1: UUID="abc12345-1234-1234-1234-abcdef012345" TYPE="ext4"</span>
<span class="cb-out">/dev/sda2: UUID="def67890-5678-5678-5678-fedcba987654" TYPE="ext4"</span>
<span class="cb-out">/dev/sda3: UUID="fedcba98-abcd-abcd-abcd-123456789abc" TYPE="xfs"</span>
<span class="cb-cmt"># UUID = universally unique identifier — use in fstab instead of /dev/sdX
# Device names (/dev/sda) can change; UUIDs don't</span>

<span class="cb-prompt">$</span> sudo blkid /dev/sda3   <span class="cb-cmt"># specific device</span>
<span class="cb-prompt">$</span> sudo blkid -U "fedcba98-abcd-abcd-abcd-123456789abc"  <span class="cb-cmt"># UUID → device</span>

<span class="cb-cmt">## ═══ findmnt — MOUNT TREE ════════════════════════════════════</span>
<span class="cb-prompt">$</span> findmnt
<span class="cb-out">TARGET      SOURCE    FSTYPE OPTIONS</span>
<span class="cb-out">/           /dev/sda2 ext4   rw,relatime</span>
<span class="cb-out">├─/boot     /dev/sda1 ext4   rw,relatime</span>
<span class="cb-out">├─/data     /dev/sda3 xfs    rw,relatime</span>
<span class="cb-out">├─/proc     proc      proc   rw,nosuid,nodev</span>
<span class="cb-out">├─/sys      sysfs     sysfs  rw,nosuid,nodev</span>
<span class="cb-out">└─/tmp      tmpfs     tmpfs  rw,nosuid,nodev</span>

<span class="cb-prompt">$</span> findmnt /data           <span class="cb-cmt"># info about a specific mountpoint</span>
<span class="cb-prompt">$</span> findmnt /dev/sda3       <span class="cb-cmt"># info about a specific device</span>
<span class="cb-prompt">$</span> findmnt -t ext4         <span class="cb-cmt"># all ext4 mounts</span>
<span class="cb-prompt">$</span> findmnt --real          <span class="cb-cmt"># real filesystems only (no proc/sysfs/tmpfs)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — BLOCK DEVICES & PARTITIONS (ANIMATED)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Block Devices &amp; Partitions — The Storage Hardware View</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="240" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Physical Disk → Partitions → Filesystems → Mount Points</text>

  <!-- Physical disk -->
  <rect x="14" y="40" width="792" height="50" rx="8" fill="#161b22" stroke="#30363d" stroke-width="2"/>
  <text x="26" y="58" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Physical Disk</text>
  <text x="410" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#8b949e">/dev/sda  (500 GB SSD)</text>
  <!-- Disk bar with partition layout -->
  <rect x="26" y="66" width="100" height="18" rx="3" fill="#2a1a14" stroke="#f85149" stroke-width="1"/>
  <text x="76" y="79" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#f85149">sda1 1GB /boot</text>
  <rect x="130" y="66" width="200" height="18" rx="3" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="230" y="79" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#58a6ff">sda2 50GB / (root)</text>
  <rect x="334" y="66" width="474" height="18" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="571" y="79" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">sda3 449GB /data</text>

  <!-- Arrows down to filesystem types -->
  <line x1="76"  y1="84" x2="76"  y2="118" stroke="#f85149" stroke-width="1.5" marker-end="url(#mi-red)"/>
  <line x1="230" y1="84" x2="230" y2="118" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#mi-blu)"/>
  <line x1="571" y1="84" x2="571" y2="118" stroke="#3fb950" stroke-width="1.5" marker-end="url(#mi-grn)"/>

  <!-- Filesystem boxes -->
  <rect x="26"  y="118" width="100" height="40" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="76"  y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">ext4</text>
  <text x="76"  y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">format type</text>

  <rect x="165" y="118" width="130" height="40" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="230" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">ext4</text>
  <text x="230" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">format type</text>

  <rect x="490" y="118" width="162" height="40" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="571" y="136" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">xfs</text>
  <text x="571" y="150" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">format type</text>

  <!-- Arrows to mount points -->
  <line x1="76"  y1="158" x2="76"  y2="192" stroke="#f85149" stroke-width="1.5" marker-end="url(#mi-red)"/>
  <line x1="230" y1="158" x2="230" y2="192" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#mi-blu)"/>
  <line x1="571" y1="158" x2="571" y2="192" stroke="#3fb950" stroke-width="1.5" marker-end="url(#mi-grn)"/>

  <!-- Mount point boxes -->
  <rect x="26"  y="192" width="100" height="36" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="76"  y="213" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">/boot</text>

  <rect x="165" y="192" width="130" height="36" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="230" y="213" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">/  (root)</text>

  <rect x="490" y="192" width="162" height="36" rx="6" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="571" y="213" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">/data</text>

  <!-- Legend -->
  <text x="410" y="238" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Disk → Partition → Format (mkfs) → Mount (attach to directory tree)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 10 — fdisk, parted, mkfs: partition and format (with safety warnings)</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ VIEW PARTITION TABLE ════════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo fdisk -l /dev/sda          <span class="cb-cmt"># list partition table</span>
<span class="cb-out">Disk /dev/sda: 500 GiB, 536870912000 bytes</span>
<span class="cb-out">Disklabel type: gpt</span>
<span class="cb-out">Device       Start      End  Sectors  Size Type</span>
<span class="cb-out">/dev/sda1     2048  2099199  2097152    1G EFI System</span>
<span class="cb-out">/dev/sda2  2099200 106958847 104859648  50G Linux filesystem</span>
<span class="cb-out">/dev/sda3 106958848 976773134 869814287 415G Linux filesystem</span>

<span class="cb-prompt">$</span> sudo parted /dev/sda print      <span class="cb-cmt"># alternative: parted</span>
<span class="cb-prompt">$</span> sudo parted -l                   <span class="cb-cmt"># all disks</span>

<span class="cb-cmt">## ═══ CHECK DISK TYPE ═════════════════════════════════════════</span>
<span class="cb-prompt">$</span> cat /proc/partitions             <span class="cb-cmt"># all known partitions</span>
<span class="cb-prompt">$</span> ls -la /dev/disk/by-id/         <span class="cb-cmt"># disk IDs</span>
<span class="cb-prompt">$</span> ls -la /dev/disk/by-uuid/       <span class="cb-cmt"># disk UUIDs → device names</span>
<span class="cb-prompt">$</span> ls -la /dev/disk/by-path/       <span class="cb-cmt"># device path → device name</span>

<span class="cb-cmt">## ═══ FORMAT (CREATE FILESYSTEM) — ⚠ DESTRUCTIVE ═════════════</span>
<span class="cb-cmt"># ⚠ WARNING: mkfs DESTROYS ALL DATA on the device/partition!
# Double-check the device name before running mkfs</span>

sudo mkfs.ext4 /dev/sdb1          <span class="cb-cmt"># ext4 (most common)</span>
sudo mkfs.ext4 -L "mydata" /dev/sdb1   <span class="cb-cmt"># with label</span>
sudo mkfs.xfs  /dev/sdb1          <span class="cb-cmt"># XFS (high performance)</span>
sudo mkfs.btrfs /dev/sdb1         <span class="cb-cmt"># btrfs (advanced)</span>
sudo mkfs.vfat /dev/sdb1          <span class="cb-cmt"># FAT32 (USB, cross-platform)</span>

<span class="cb-cmt">## ═══ FILESYSTEM CHECK AND REPAIR ════════════════════════════</span>
<span class="cb-prompt">$</span> sudo fsck /dev/sda3              <span class="cb-cmt"># check (must be unmounted!)</span>
<span class="cb-prompt">$</span> sudo fsck -f /dev/sda3           <span class="cb-cmt"># -f: force check even if clean</span>
<span class="cb-prompt">$</span> sudo e2fsck -f /dev/sda2         <span class="cb-cmt"># ext2/3/4 specific</span>
<span class="cb-prompt">$</span> sudo xfs_repair /dev/sda3        <span class="cb-cmt"># XFS repair</span>
<span class="cb-cmt"># IMPORTANT: always unmount before running fsck!</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — MOUNT / UMOUNT (ANIMATED TREE)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>mount</code> &amp; <code>umount</code> — Attaching Filesystems</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="280" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">mount — Attaching a Filesystem to the Directory Tree</text>

  <!-- BEFORE mount (left) -->
  <rect x="14" y="36" width="380" height="230" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="204" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Before: mount /dev/sdb1 /mnt/data</text>

  <text x="30" y="80" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">/</text>
  <line x1="38" y1="84" x2="38" y2="220" stroke="#30363d" stroke-width="1"/>
  <text x="50" y="104" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">├─ home/</text>
  <text x="50" y="124" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">├─ tmp/</text>
  <text x="50" y="144" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">├─ var/</text>
  <text x="50" y="164" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">└─ mnt/</text>
  <text x="80" y="184" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">   └─ data/</text>
  <text x="110" y="204" font-family="'Segoe UI',sans-serif" font-size="9" fill="#30363d">         (empty directory)</text>

  <!-- /dev/sdb1 unattached -->
  <rect x="256" y="168" width="124" height="46" rx="6" fill="#2a1a14" stroke="#f85149" stroke-width="1.5" class="mi-pulse"/>
  <text x="318" y="188" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">/dev/sdb1</text>
  <text x="318" y="204" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">not mounted</text>

  <!-- Arrow between -->
  <line x1="410" y1="160" x2="446" y2="160" stroke="#bc8cff" stroke-width="3" marker-end="url(#mi-pur)"/>
  <rect x="396" y="148" width="88" height="24" rx="5" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="440" y="164" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" font-weight="bold" fill="#bc8cff">mount</text>

  <!-- AFTER mount (right) -->
  <rect x="446" y="36" width="360" height="230" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="626" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">After: /dev/sdb1 accessible at /mnt/data</text>

  <text x="462" y="80" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">/</text>
  <line x1="470" y1="84" x2="470" y2="220" stroke="#3fb950" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="482" y="104" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">├─ home/</text>
  <text x="482" y="124" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">├─ tmp/</text>
  <text x="482" y="144" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">├─ var/</text>
  <text x="482" y="164" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">└─ mnt/</text>
  <text x="512" y="184" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">   └─ </text>
  <rect x="540" y="170" width="120" height="26" rx="5" fill="#1a2a14" stroke="#3fb950" stroke-width="2" class="mi-blink"/>
  <text x="600" y="187" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">data/ 📁</text>

  <text x="568" y="210" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">↑ /dev/sdb1 contents here</text>
  <text x="568" y="224" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#8b949e">ls /mnt/data → shows disk files</text>
  <text x="568" y="238" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">umount /mnt/data → detach</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 10 — mount, umount: every flag, read-only, bind, loop, tmpfs</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC MOUNT ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo mount /dev/sdb1 /mnt/data   <span class="cb-cmt"># mount device at directory</span>
<span class="cb-prompt">$</span> sudo mount UUID="abc-123..." /mnt/data  <span class="cb-cmt"># by UUID (reliable)</span>
<span class="cb-prompt">$</span> sudo mount LABEL=mydata /mnt/data  <span class="cb-cmt"># by label</span>
<span class="cb-cmt"># Mount point must exist: mkdir -p /mnt/data</span>

<span class="cb-cmt">## ═══ MOUNT OPTIONS (-o) ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo mount -o ro /dev/sdb1 /mnt/data      <span class="cb-cmt"># read-only</span>
<span class="cb-prompt">$</span> sudo mount -o rw /dev/sdb1 /mnt/data      <span class="cb-cmt"># read-write (default)</span>
<span class="cb-prompt">$</span> sudo mount -o noexec /dev/sdb1 /mnt/data  <span class="cb-cmt"># cannot exec files (security)</span>
<span class="cb-prompt">$</span> sudo mount -o nosuid /dev/sdb1 /mnt/data  <span class="cb-cmt"># ignore setuid bits (security)</span>
<span class="cb-prompt">$</span> sudo mount -o nodev /dev/sdb1 /mnt/data   <span class="cb-cmt"># no device files</span>
<span class="cb-prompt">$</span> sudo mount -o noatime /dev/sdb1 /mnt      <span class="cb-cmt"># skip access time updates (faster)</span>
<span class="cb-prompt">$</span> sudo mount -o remount,rw /mnt/data        <span class="cb-cmt"># remount with new options</span>
<span class="cb-cmt"># Multiple options: -o ro,noexec,nosuid</span>

<span class="cb-cmt">## ═══ FILESYSTEM TYPE (-t) ════════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo mount -t ext4 /dev/sdb1 /mnt/data   <span class="cb-cmt"># explicit type (usually auto)</span>
<span class="cb-prompt">$</span> sudo mount -t tmpfs -o size=2G tmpfs /mnt/ramdisk  <span class="cb-cmt"># RAM disk</span>
<span class="cb-prompt">$</span> sudo mount -t nfs server:/share /mnt/nfs  <span class="cb-cmt"># NFS network share</span>

<span class="cb-cmt">## ═══ BIND MOUNT — REUSE A DIRECTORY ═════════════════════════</span>
<span class="cb-cmt"># Bind mount: make /data/pipeline visible at /opt/pipeline (same data)</span>
<span class="cb-prompt">$</span> sudo mount --bind /data/pipeline /opt/pipeline
<span class="cb-cmt"># Or read-only bind:
sudo mount --bind /data/pipeline /opt/pipeline
sudo mount -o remount,ro /opt/pipeline</span>

<span class="cb-cmt">## ═══ LOOP MOUNT — MOUNT AN IMAGE FILE ════════════════════════</span>
<span class="cb-prompt">$</span> sudo mount -o loop disk.img /mnt/img     <span class="cb-cmt"># mount image file</span>
<span class="cb-prompt">$</span> sudo losetup -f disk.img                 <span class="cb-cmt"># set up loop device</span>
<span class="cb-prompt">$</span> losetup -l                               <span class="cb-cmt"># list loop devices</span>

<span class="cb-cmt">## ═══ VIEW CURRENT MOUNTS ════════════════════════════════════</span>
<span class="cb-prompt">$</span> mount                        <span class="cb-cmt"># all current mounts</span>
<span class="cb-prompt">$</span> cat /proc/mounts             <span class="cb-cmt"># kernel's view of mounts</span>
<span class="cb-prompt">$</span> findmnt                      <span class="cb-cmt"># tree view (recommended)</span>

<span class="cb-cmt">## ═══ UMOUNT — DETACH ════════════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo umount /mnt/data         <span class="cb-cmt"># by mount point</span>
<span class="cb-prompt">$</span> sudo umount /dev/sdb1         <span class="cb-cmt"># by device</span>
<span class="cb-prompt">$</span> sudo umount -l /mnt/data      <span class="cb-cmt"># -l: lazy (detach when no longer busy)</span>
<span class="cb-prompt">$</span> sudo umount -f /mnt/nfs       <span class="cb-cmt"># -f: force (NFS especially)</span>
<span class="cb-cmt"># Error "device is busy" → find who's using it:
fuser -vm /mnt/data
lsof +D /mnt/data
# Or: kill all processes using it:
fuser -km /mnt/data</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — /etc/fstab (ANIMATED ANATOMY)
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>/etc/fstab</code> — Persistent Mount Configuration</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <rect width="820" height="260" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">/etc/fstab — 6 Fields, Persistent Mounts on Boot</text>

  <!-- fstab line -->
  <rect x="14" y="36" width="792" height="36" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <!-- Field boxes in line -->
  <rect x="20"  y="42" width="202" height="24" rx="4" fill="#0e1824" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="121" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">UUID=fedcba98-abcd...</text>

  <rect x="228" y="42" width="110" height="24" rx="4" fill="#1a2a1a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="283" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">/data</text>

  <rect x="344" y="42" width="76" height="24" rx="4" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="382" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">xfs</text>

  <rect x="426" y="42" width="232" height="24" rx="4" fill="#1f1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="542" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">defaults,noatime,nofail</text>

  <rect x="664" y="42" width="40" height="24" rx="4" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="684" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">0</text>

  <rect x="710" y="42" width="40" height="24" rx="4" fill="#2a1a14" stroke="#f85149" stroke-width="1.5"/>
  <text x="730" y="58" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">2</text>

  <!-- Field labels with arrows -->
  <line x1="121" y1="66" x2="121" y2="98" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#mi-blu)"/>
  <rect x="14"  y="98" width="214" height="44" rx="5" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="121" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#58a6ff">① Device / Source</text>
  <text x="121" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">UUID, LABEL, /dev/sdX, server:/path</text>

  <line x1="283" y1="66" x2="283" y2="98" stroke="#3fb950" stroke-width="1.5" marker-end="url(#mi-grn)"/>
  <rect x="228" y="98" width="110" height="44" rx="5" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="283" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#3fb950">② Mount Point</text>
  <text x="283" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">must exist</text>

  <line x1="382" y1="66" x2="382" y2="98" stroke="#ffa657" stroke-width="1.5" marker-end="url(#mi-orn)"/>
  <rect x="344" y="98" width="76" height="44" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1"/>
  <text x="382" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">③ FS Type</text>
  <text x="382" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">ext4, xfs, nfs</text>

  <line x1="542" y1="66" x2="542" y2="98" stroke="#bc8cff" stroke-width="1.5" marker-end="url(#mi-pur)"/>
  <rect x="426" y="98" width="232" height="44" rx="5" fill="#1f1428" stroke="#bc8cff" stroke-width="1"/>
  <text x="542" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">④ Options</text>
  <text x="542" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">defaults, ro, noatime, nofail, ...</text>

  <line x1="684" y1="66" x2="684" y2="98" stroke="#f85149" stroke-width="1.5" marker-end="url(#mi-red)"/>
  <rect x="664" y="98" width="40" height="44" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1"/>
  <text x="684" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">⑤</text>
  <text x="684" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">dump</text>

  <line x1="730" y1="66" x2="730" y2="98" stroke="#f85149" stroke-width="1.5" marker-end="url(#mi-red)"/>
  <rect x="710" y="98" width="40" height="44" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="1"/>
  <text x="730" y="115" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#f85149">⑥</text>
  <text x="730" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">fsck</text>

  <!-- Options reference -->
  <rect x="14" y="152" width="792" height="98" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="170" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Key Mount Options (field 4):</text>
  <text x="26"  y="188" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">defaults</text>  <text x="92"  y="188" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = rw,suid,dev,exec,auto,nouser,async  </text>
  <text x="410" y="188" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">noatime</text>  <text x="470" y="188" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = don't update access time (faster)</text>
  <text x="26"  y="205" font-family="'Courier New',monospace" font-size="10" fill="#f85149">nofail</text>    <text x="76"  y="205" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = don't halt boot if mount fails (⚠ add for removable/optional)  </text>
  <text x="490" y="205" font-family="'Courier New',monospace" font-size="10" fill="#f85149">ro</text>       <text x="508" y="205" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = read-only</text>
  <text x="26"  y="222" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">noexec</text>   <text x="84"  y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = can't execute files (security)  </text>
  <text x="300" y="222" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">nosuid</text>   <text x="360" y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = ignore setuid  </text>
  <text x="480" y="222" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">nodev</text>    <text x="530" y="222" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = no device files</text>
  <text x="26"  y="239" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">⑤ dump: 0=skip backup  ⑥ fsck order: 0=skip  1=root first  2=other (always use 0 for non-root)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 10 — /etc/fstab: write, test, mount -a, tmpfs, NFS, UUID</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ EXAMPLE /etc/fstab ═════════════════════════════════════</span>
<span class="cb-out"># &lt;device&gt;                               &lt;mountpoint&gt;  &lt;type&gt;  &lt;options&gt;           &lt;dump&gt; &lt;pass&gt;</span>
<span class="cb-out">UUID=def67890-5678-5678-5678-fedcba987654 /             ext4    defaults,noatime     0      1</span>
<span class="cb-out">UUID=abc12345-1234-1234-1234-abcdef012345 /boot         ext4    defaults,noatime     0      2</span>
<span class="cb-out">UUID=fedcba98-abcd-abcd-abcd-123456789abc /data         xfs     defaults,noatime,nofail 0  2</span>
<span class="cb-out">UUID=11223344-aabb-aabb-aabb-112233445566 /backup       ext4    defaults,nofail      0      2</span>
<span class="cb-out">tmpfs                                      /tmp          tmpfs   defaults,size=2G,noexec,nosuid 0 0</span>
<span class="cb-out">tmpfs                                      /dev/shm      tmpfs   defaults,size=512M   0      0</span>

<span class="cb-cmt">## ═══ WHY UUID INSTEAD OF /dev/sda3 ══════════════════════════</span>
<span class="cb-cmt"># /dev/sda3 can change if you add/remove disks or change boot order
# UUID is permanently assigned to the filesystem — never changes
# Get UUID: sudo blkid /dev/sda3</span>

<span class="cb-cmt">## ═══ TESTING fstab ENTRIES ═══════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo mount -a                  <span class="cb-cmt"># mount everything in fstab not yet mounted</span>
<span class="cb-cmt"># If there are errors: mounts that work will proceed, errors shown
# ⚠ Test fstab changes before rebooting:
sudo mount -a --fake             <span class="cb-cmt"># dry run (check syntax only)</span>
sudo systemctl daemon-reload     <span class="cb-cmt"># reload systemd mount units</span>

<span class="cb-cmt">## ═══ tmpfs — RAM FILESYSTEM ══════════════════════════════════</span>
<span class="cb-cmt"># tmpfs lives entirely in RAM — extremely fast, disappears on reboot</span>
<span class="cb-out">tmpfs  /tmp           tmpfs  defaults,size=2G,noexec,nosuid  0  0</span>
<span class="cb-out">tmpfs  /dev/shm       tmpfs  defaults,size=512M               0  0</span>
<span class="cb-out">tmpfs  /mnt/ramdisk   tmpfs  defaults,size=8G                 0  0</span>

<span class="cb-cmt"># Or mount tmpfs temporarily:</span>
<span class="cb-prompt">$</span> sudo mount -t tmpfs -o size=4G tmpfs /mnt/fast
<span class="cb-cmt"># Perfect for: pipeline intermediate files, sorting temp data,
# test data, session caches</span>

<span class="cb-cmt">## ═══ NFS MOUNT IN FSTAB ══════════════════════════════════════</span>
<span class="cb-out">nas.company.com:/data/raw  /mnt/nas  nfs  defaults,nofail,_netdev,rw,timeo=30  0  0</span>
<span class="cb-cmt"># _netdev = wait for network before mounting (important for NFS!)</span>
<span class="cb-cmt"># nofail = don't halt boot if NFS unreachable</span>
<span class="cb-cmt"># timeo = timeout in deciseconds</span>

<span class="cb-cmt">## ═══ systemd .mount UNITS (alternative to fstab) ════════════</span>
<span class="cb-cmt"># /etc/systemd/system/mnt-data.mount</span>
<span class="cb-out">[Unit]</span>
<span class="cb-out">Description=Data Volume</span>
<span class="cb-out">After=local-fs.target</span>
<span class="cb-out"></span>
<span class="cb-out">[Mount]</span>
<span class="cb-out">What=/dev/disk/by-uuid/fedcba98-abcd-abcd-abcd-123456789abc</span>
<span class="cb-out">Where=/mnt/data</span>
<span class="cb-out">Type=xfs</span>
<span class="cb-out">Options=defaults,noatime</span>
<span class="cb-out"></span>
<span class="cb-out">[Install]</span>
<span class="cb-out">WantedBy=multi-user.target</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — df: FILESYSTEM USAGE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>df</code> — Disk Free Space &amp; Filesystem Usage</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="210" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">df -h Output — Every Column Decoded</text>

  <!-- Header row -->
  <rect x="14" y="34" width="792" height="24" rx="4" fill="#1f2027" stroke="#30363d" stroke-width="1"/>
  <text x="130" y="51" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">Filesystem</text>
  <text x="300" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">Size</text>
  <text x="370" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">Used</text>
  <text x="440" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">Avail</text>
  <text x="510" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">Use%</text>
  <text x="640" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#ffa657">Mounted on</text>

  <!-- Data rows -->
  <rect x="14" y="60" width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="26"  y="76" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">/dev/sda2</text>
  <text x="300" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">50G</text>
  <text x="370" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">32G</text>
  <text x="440" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">16G</text>
  <text x="510" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">66%</text>
  <text x="640" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">/</text>

  <rect x="14" y="84" width="792" height="22" rx="2" fill="#161b22"/>
  <text x="26"  y="100" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">/dev/sda3</text>
  <text x="300" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">449G</text>
  <text x="370" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">447G</text>
  <text x="440" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">2.0G</text>
  <text x="510" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">100%</text>
  <text x="640" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#f85149">/data  ← FULL!</text>

  <rect x="14" y="108" width="792" height="22" rx="2" fill="#0e1824"/>
  <text x="26"  y="124" font-family="'Courier New',monospace" font-size="11" fill="#bc8cff">tmpfs</text>
  <text x="300" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">2.0G</text>
  <text x="370" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">512M</text>
  <text x="440" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">1.5G</text>
  <text x="510" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">25%</text>
  <text x="640" y="124" text-anchor="middle" font-family="'Courier New',monospace" font-size="11" fill="#e6edf3">/tmp</text>

  <!-- Usage bar visualization -->
  <rect x="14" y="142" width="792" height="60" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26"  y="160" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">/dev/sda3 (/data)  449G total:</text>
  <rect x="26"  y="166" width="600" height="18" rx="3" fill="#30363d"/>
  <!-- Used portion (100%) -->
  <rect x="26"  y="166" width="598" height="18" rx="3" fill="#f85149"/>
  <text x="325" y="179" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#fff" font-weight="bold">100% USED — 447G</text>
  <text x="640" y="179" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">2G free</text>
  <text x="26"  y="196" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Size = Used + Avail + ~5% reserved for root (ext4 reserves 5% by default)</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 10 — df: all flags, inode usage, threshold alerts</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ df KEY FLAGS ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> df -h                          <span class="cb-cmt"># human-readable (K/M/G/T)</span>
<span class="cb-prompt">$</span> df -H                          <span class="cb-cmt"># powers of 1000 (not 1024)</span>
<span class="cb-prompt">$</span> df -k                          <span class="cb-cmt"># kilobytes</span>
<span class="cb-prompt">$</span> df -m                          <span class="cb-cmt"># megabytes</span>
<span class="cb-prompt">$</span> df -T                          <span class="cb-cmt"># show filesystem type</span>
<span class="cb-prompt">$</span> df -h /data                   <span class="cb-cmt"># specific mountpoint only</span>
<span class="cb-prompt">$</span> df -h /dev/sda3               <span class="cb-cmt"># by device</span>
<span class="cb-prompt">$</span> df --total -h                  <span class="cb-cmt"># add total row at bottom</span>

<span class="cb-cmt"># Filter out virtual filesystems:</span>
<span class="cb-prompt">$</span> df -h -x tmpfs -x devtmpfs -x squashfs
<span class="cb-cmt"># Shows only real disk-backed filesystems</span>

<span class="cb-cmt">## ═══ INODE USAGE (often overlooked!) ════════════════════════</span>
<span class="cb-prompt">$</span> df -i                          <span class="cb-cmt"># inode usage (can run out even with space!)</span>
<span class="cb-out">Filesystem    Inodes  IUsed  IFree IUse% Mounted on</span>
<span class="cb-out">/dev/sda2    3276800 180234 3096566   6% /</span>
<span class="cb-out">/dev/sda3    4718592 4718580     12 100% /data  ← inodes FULL!</span>
<span class="cb-cmt"># Even though space is available, can't create new files!
# Cause: millions of tiny files (e.g. Python cache, node_modules, email)
# Fix: delete small files  OR  reformat with more inodes (mkfs -N)</span>

<span class="cb-cmt">## ═══ DISK USAGE ALERTS IN SCRIPTS ═══════════════════════════</span>
check_disk_space() {
    local THRESHOLD=90
    local ALERT=false

    while IFS= read -r line; do
        local PCT MOUNT
        PCT=$(echo "$line" | awk '{print $5}' | tr -d '%')
        MOUNT=$(echo "$line" | awk '{print $6}')

        if (( PCT >= THRESHOLD )); then
            echo "⚠ DISK ALERT: $MOUNT is \${PCT}% full!" >&2
            ALERT=true
        fi
    done < <(df -h | tail -n +2 | grep -v tmpfs)

    $ALERT && return 1
    echo "✅ All disks below \${THRESHOLD}%"
}
check_disk_space

<span class="cb-cmt">## ═══ RESERVED SPACE ══════════════════════════════════════════</span>
<span class="cb-cmt"># ext4 reserves 5% for root by default (Size != Used + Avail)
# This prevents regular users from filling root system disks
# To see: Size = Used + Avail + Reserved
# Adjust reservation for data partitions (not root):
sudo tune2fs -m 1 /dev/sda3   <span class="cb-cmt"># reduce to 1% reserved</span>
sudo tune2fs -m 0 /dev/sdb1   <span class="cb-cmt"># no reserved space</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — du: DIRECTORY USAGE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> <code>du</code> — Finding What's Using Disk Space</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 10 — du: all flags, find big files, size sorted, ncdu</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ du KEY FLAGS ════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> du -sh /data                   <span class="cb-cmt"># -s: summary total, -h: human-readable</span>
<span class="cb-out">447G    /data</span>
<span class="cb-prompt">$</span> du -sh /data/*                 <span class="cb-cmt"># summary for each subdirectory</span>
<span class="cb-out">210G    /data/raw</span>
<span class="cb-out">180G    /data/processed</span>
<span class="cb-out"> 57G    /data/archive</span>
<span class="cb-prompt">$</span> du -h --max-depth=2 /data      <span class="cb-cmt"># 2 levels deep</span>
<span class="cb-prompt">$</span> du -h --max-depth=1 /          <span class="cb-cmt"># find which top-level dir is biggest</span>

<span class="cb-cmt">## ═══ TOP 10 SPACE CONSUMERS ═════════════════════════════════</span>
<span class="cb-prompt">$</span> du -sh /data/* | sort -rh | head -10
<span class="cb-out">210G    /data/raw</span>
<span class="cb-out">180G    /data/processed</span>
<span class="cb-out"> 57G    /data/archive</span>
<span class="cb-cmt"># -r: reverse sort  -h: human-readable sort (sorts 1G > 100M correctly)</span>

<span class="cb-cmt"># Recursive: largest anywhere under /data:</span>
<span class="cb-prompt">$</span> du -ah /data | sort -rh | head -20
<span class="cb-cmt"># -a: include files, not just directories</span>

<span class="cb-cmt">## ═══ FIND LARGE FILES WITH find ══════════════════════════════</span>
<span class="cb-cmt"># Files larger than 1GB:</span>
<span class="cb-prompt">$</span> find /data -size +1G -type f -ls 2>/dev/null | sort -k7 -rn | head -10
<span class="cb-cmt"># Files larger than 100MB:</span>
<span class="cb-prompt">$</span> find /data -size +100M -printf '%s %p\n' 2>/dev/null | sort -rn | head -10
<span class="cb-cmt"># Files modified in last 24h that are large:</span>
<span class="cb-prompt">$</span> find /data -newer /tmp/24h-marker -size +10M -ls 2>/dev/null

<span class="cb-cmt">## ═══ FIND SPACE FREED BY DELETED-BUT-OPEN FILES ═════════════</span>
<span class="cb-cmt"># A file is deleted but still open by a process — space not freed!
# ls shows it gone, but disk is still used</span>
<span class="cb-prompt">$</span> sudo lsof | grep '(deleted)' | awk '{print $7, $9}' | sort -rn | head -10
<span class="cb-cmt"># Fix: restart the process that holds it open (or kill -HUP to rotate)</span>

<span class="cb-cmt">## ═══ ncdu — INTERACTIVE DISK USAGE NAVIGATOR ════════════════</span>
<span class="cb-prompt">$</span> ncdu /data                     <span class="cb-cmt"># interactive tree (install: apt/yum install ncdu)</span>
<span class="cb-cmt"># Navigate: arrows, Enter=enter dir, d=delete, q=quit
# Shows cumulative sizes, sort by size, delete files interactively</span>

<span class="cb-cmt">## ═══ du vs df DISCREPANCY ════════════════════════════════════</span>
<span class="cb-cmt"># du /data says 400G but df /data says 447G used — WHY?
# 1. Open-but-deleted files (lsof | grep deleted)
# 2. Sparse files (appear large but use less disk)
# 3. Hard links (du counts once, disk uses once)
# 4. Filesystem metadata (journal, reserved blocks)
# du counts file sizes; df counts allocated disk blocks</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — INODES & THE FILESYSTEM STRUCTURE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Inodes — What Every File Really Is</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 20px;">
  <defs>
    <marker id="mi-grn2" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#3fb950"/></marker>
    <marker id="mi-orn2" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#ffa657"/></marker>
    <marker id="mi-blu2" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#58a6ff"/></marker>
    <marker id="mi-pur2" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#bc8cff"/></marker>
  </defs>
  <rect width="820" height="270" fill="#0d1117" rx="12"/>
  <text x="410" y="24" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Inode — What a File IS (Name Lives in Directory, Data in Inode)</text>

  <!-- Directory -->
  <rect x="14" y="36" width="200" height="160" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="114" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Directory Entry</text>
  <text x="114" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">(maps name → inode #)</text>
  <line x1="24" y1="78" x2="204" y2="78" stroke="#3fb950" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="30"  y="96" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">data.csv     → </text>
  <text x="158" y="96" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">inode 1042</text>
  <text x="30" y="114" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">result.csv   → </text>
  <text x="158" y="114" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">inode 1043</text>
  <text x="30" y="132" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">hardlink.csv → </text>
  <text x="158" y="132" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">inode 1042</text>
  <text x="114" y="152" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">← same inode as data.csv!</text>
  <text x="114" y="166" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#58a6ff">hard link = two names, one file</text>
  <text x="114" y="182" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">"." → inode 990  ".." → inode 988</text>

  <!-- Arrows to inodes -->
  <line x1="214" y1="90" x2="292" y2="90" stroke="#ffa657" stroke-width="2" marker-end="url(#mi-orn2)"/>
  <line x1="214" y1="127" x2="292" y2="145" stroke="#ffa657" stroke-width="2" marker-end="url(#mi-orn2)"/>
  <line x1="214" y1="127" x2="292" y2="90" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#mi-blu2)"/>

  <!-- Inode 1042 -->
  <rect x="292" y="60" width="218" height="172" rx="8" fill="#2a2a14" stroke="#ffa657" stroke-width="2"/>
  <text x="401" y="80" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#ffa657">inode 1042</text>
  <line x1="302" y1="86" x2="500" y2="86" stroke="#ffa657" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="302" y="103" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">type:     regular file</text>
  <text x="302" y="119" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">mode:     -rw-r--r-- (0644)</text>
  <text x="302" y="135" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">uid/gid:  1001 / 1001</text>
  <text x="302" y="151" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">size:     54,321 bytes</text>
  <text x="302" y="167" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">atime:    2024-01-15 (accessed)</text>
  <text x="302" y="183" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">mtime:    2024-01-14 (modified)</text>
  <text x="302" y="199" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">ctime:    2024-01-14 (metadata chg)</text>
  <text x="302" y="215" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">nlinks:   2 (data.csv + hardlink)</text>
  <text x="302" y="228" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#ffa657">blocks:   [1024][1025][1026]…</text>

  <!-- Arrows to data blocks -->
  <line x1="510" y1="122" x2="570" y2="100" stroke="#ffa657" stroke-width="2" marker-end="url(#mi-orn2)"/>
  <line x1="510" y1="140" x2="570" y2="145" stroke="#ffa657" stroke-width="2" marker-end="url(#mi-orn2)"/>
  <line x1="510" y1="158" x2="570" y2="190" stroke="#ffa657" stroke-width="2" marker-end="url(#mi-orn2)"/>

  <!-- Data blocks -->
  <rect x="570" y="60" width="236" height="60" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="688" y="85" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#8b949e">Data Block 1024</text>
  <text x="688" y="100" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">date,value,region\n2024…</text>

  <rect x="570" y="130" width="236" height="40" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="688" y="154" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Data Block 1025  (4096 bytes)</text>

  <rect x="570" y="178" width="236" height="40" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1.5"/>
  <text x="688" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Data Block 1026  (remainder)</text>

  <!-- Key insight -->
  <rect x="14" y="212" width="792" height="48" rx="6" fill="#1a1a2a" stroke="#bc8cff" stroke-width="1"/>
  <text x="26" y="230" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#bc8cff">Key Insight: The filename is NOT stored in the inode — it's stored in the directory entry.</text>
  <text x="26" y="247" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Deleting a file = removing the directory entry (decrements link count). Data freed only when link count reaches 0 AND no process has it open.</text>
  <text x="26" y="260" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">This is why a process can hold a deleted file open and still read/write it — the inode (and data blocks) persist until the FD is closed.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 10 — stat, ls -i, inode exhaustion, hard links, deleted-but-open</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ stat — FULL INODE INFORMATION ══════════════════════════</span>
<span class="cb-prompt">$</span> stat /data/pipeline/input.csv
<span class="cb-out">  File: /data/pipeline/input.csv</span>
<span class="cb-out">  Size: 54321       Blocks: 112   IO Block: 4096  regular file</span>
<span class="cb-out">Device: 803h/2051d  Inode: 1042    Links: 2</span>
<span class="cb-out">Access: (0644/-rw-r--r--)  Uid: (1001/ravi)  Gid: (1001/ravi)</span>
<span class="cb-out">Access: 2024-01-15 10:32:44.000000000</span>
<span class="cb-out">Modify: 2024-01-14 22:15:03.000000000</span>
<span class="cb-out">Change: 2024-01-14 22:15:03.000000000</span>
<span class="cb-out"> Birth: 2024-01-14 22:15:03.000000000</span>
<span class="cb-cmt"># Access = last read, Modify = content changed, Change = metadata changed
# Birth = creation time (not all FSes support it)</span>

<span class="cb-cmt">## ═══ ls -i — SHOW INODE NUMBERS ══════════════════════════════</span>
<span class="cb-prompt">$</span> ls -li /data/pipeline/
<span class="cb-out">1042 -rw-r--r-- 2 ravi ravi 54321 Jan 14 /data/pipeline/input.csv</span>
<span class="cb-out">1043 -rw-r--r-- 1 ravi ravi 21890 Jan 14 /data/pipeline/result.csv</span>
<span class="cb-out">1042 -rw-r--r-- 2 ravi ravi 54321 Jan 14 /data/pipeline/backup.csv</span>
<span class="cb-cmt"># input.csv and backup.csv have the same inode (1042) → hard links
# "2" in link count column confirms 2 directory entries point to it</span>

<span class="cb-cmt">## ═══ INODE EXHAUSTION ═════════════════════════════════════════</span>
<span class="cb-prompt">$</span> df -i /data
<span class="cb-out">Filesystem    Inodes  IUsed  IFree IUse% Mounted on</span>
<span class="cb-out">/dev/sda3   4718592 4718590      2  100% /data</span>
<span class="cb-cmt"># Can't create new files even with space available!
# Common cause: millions of tiny files (Python __pycache__, logs, emails)
# Find directories with most files:</span>
<span class="cb-prompt">$</span> find /data -xdev -printf '%h\n' | sort | uniq -c | sort -rn | head -10
<span class="cb-cmt"># Count files per directory — find the offender</span>

<span class="cb-cmt">## ═══ DELETED-BUT-OPEN FILE SPACE ════════════════════════════</span>
<span class="cb-cmt"># File deleted but process still has it open → disk space NOT freed</span>
<span class="cb-prompt">$</span> sudo lsof | grep '(deleted)'
<span class="cb-out">python3 5001 ravi 4w REG 8,3 4.2G 1044 /data/output.csv (deleted)</span>
<span class="cb-cmt"># 4.2G is "trapped" in deleted inode until python3 closes it
# Fix 1: restart/SIGHUP the process
# Fix 2: truncate via the /proc FD:
sudo truncate -s 0 /proc/5001/fd/4   <span class="cb-cmt"># zero it in-place (space freed instantly)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — I/O BASICS: READ, WRITE, SYNC
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> I/O Basics — Buffered vs Direct, sync, fsync</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="230" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Buffered I/O vs Direct I/O vs mmap — Three Paths to Disk</text>

  <!-- Left: Buffered I/O -->
  <rect x="14" y="36" width="250" height="176" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="139" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Buffered I/O (default)</text>
  <rect x="30"  y="66" width="218" height="28" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="139" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">write() → Kernel Page Cache</text>
  <line x1="139" y1="94" x2="139" y2="110" stroke="#ffa657" stroke-width="1.5" marker-end="url(#mi-orn)"/>
  <rect x="30"  y="110" width="218" height="28" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="139" y="128" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">writeback daemon (async)</text>
  <line x1="139" y1="138" x2="139" y2="154" stroke="#ffa657" stroke-width="1.5" marker-end="url(#mi-orn)"/>
  <rect x="30"  y="154" width="218" height="28" rx="5" fill="#1f2027" stroke="#30363d" stroke-width="1"/>
  <text x="139" y="172" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">Disk (eventually)</text>
  <text x="139" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">FAST writes (cached in RAM)</text>
  <text x="139" y="214" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#ffa657">⚠ Power loss = data loss</text>

  <!-- Middle: Direct I/O -->
  <rect x="290" y="36" width="240" height="176" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="410" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Direct I/O (O_DIRECT)</text>
  <rect x="306" y="66" width="208" height="28" rx="5" fill="#1a1428" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="410" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#bc8cff">write() with O_DIRECT</text>
  <line x1="410" y1="94" x2="410" y2="110" stroke="#bc8cff" stroke-width="1.5" marker-end="url(#mi-pur)"/>
  <rect x="306" y="110" width="208" height="28" rx="5" fill="#1f2027" stroke="#30363d" stroke-width="1"/>
  <text x="410" y="128" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">Block layer (BYPASSES CACHE)</text>
  <line x1="410" y1="138" x2="410" y2="154" stroke="#30363d" stroke-width="1.5" marker-end="url(#mi-arr)"/>
  <rect x="306" y="154" width="208" height="28" rx="5" fill="#1f2027" stroke="#30363d" stroke-width="1"/>
  <text x="410" y="172" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">Disk (directly)</text>
  <text x="410" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">Predictable latency (DB use)</text>
  <text x="410" y="214" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#8b949e">Requires aligned buffers</text>

  <!-- Right: fsync/sync -->
  <rect x="556" y="36" width="250" height="176" rx="8" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="681" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">Buffered + fsync()</text>
  <rect x="572" y="66" width="218" height="28" rx="5" fill="#2a2a14" stroke="#ffa657" stroke-width="1.5"/>
  <text x="681" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">write() → Page Cache</text>
  <line x1="681" y1="94" x2="681" y2="110" stroke="#ffa657" stroke-width="1.5" marker-end="url(#mi-orn)"/>
  <rect x="572" y="110" width="218" height="28" rx="5" fill="#2a1a14" stroke="#f85149" stroke-width="2"/>
  <text x="681" y="128" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#f85149">fsync(fd) — WAITS for disk</text>
  <line x1="681" y1="138" x2="681" y2="154" stroke="#f85149" stroke-width="2" marker-end="url(#mi-red)"/>
  <rect x="572" y="154" width="218" height="28" rx="5" fill="#1f2027" stroke="#30363d" stroke-width="1"/>
  <text x="681" y="172" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#8b949e">Disk (confirmed written)</text>
  <text x="681" y="202" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">SLOWER but crash-safe</text>
  <text x="681" y="214" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8.5" fill="#3fb950">Best for: databases, journals</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 10 — sync, fsync, dd with direct, page cache flush, /proc/meminfo</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ sync — FLUSH ALL WRITES TO DISK ═══════════════════════</span>
<span class="cb-prompt">$</span> sync                       <span class="cb-cmt"># flush all dirty pages to disk</span>
<span class="cb-prompt">$</span> sync /data                 <span class="cb-cmt"># sync specific filesystem</span>
<span class="cb-cmt"># Used before: unmounting, pulling USB drives, power-off
# sync writes, then returns — data IS on disk</span>

<span class="cb-cmt">## ═══ DROP PAGE CACHE (measure real disk speed) ══════════════</span>
<span class="cb-cmt"># Clear page cache before benchmarks (otherwise reads from RAM)</span>
<span class="cb-prompt">$</span> sync
<span class="cb-prompt">$</span> echo 3 | sudo tee /proc/sys/vm/drop_caches
<span class="cb-cmt"># 1 = drop page cache
# 2 = drop dentries and inodes
# 3 = drop all (page cache + dentries/inodes)</span>

<span class="cb-cmt">## ═══ VIEW PAGE CACHE USAGE ════════════════════════════════════</span>
<span class="cb-prompt">$</span> cat /proc/meminfo | grep -E 'MemTotal|MemFree|MemAvailable|Cached|Buffers|Dirty'
<span class="cb-out">MemTotal:      16384000 kB</span>
<span class="cb-out">MemFree:        1024000 kB</span>
<span class="cb-out">MemAvailable:  10240000 kB   ← includes reclaimable cache</span>
<span class="cb-out">Buffers:         512000 kB   ← metadata buffers</span>
<span class="cb-out">Cached:         8192000 kB   ← PAGE CACHE (disk data in RAM)</span>
<span class="cb-out">Dirty:           204800 kB   ← written but not yet on disk</span>
<span class="cb-cmt"># Dirty = data sitting in cache waiting to be written to disk
# High Dirty: lots of buffered writes in progress</span>

<span class="cb-cmt">## ═══ dd — DISK BENCHMARK AND COPY ════════════════════════════</span>
<span class="cb-cmt"># Measure write speed (buffered):</span>
<span class="cb-prompt">$</span> dd if=/dev/zero of=/data/test bs=1M count=1024 conv=fdatasync
<span class="cb-out">1024+0 records in/out</span>
<span class="cb-out">1073741824 bytes (1.1 GB) copied, 2.3 s, 467 MB/s</span>

<span class="cb-cmt"># Measure write speed (direct, bypasses cache):</span>
<span class="cb-prompt">$</span> dd if=/dev/zero of=/data/test bs=1M count=1024 oflag=direct
<span class="cb-cmt"># conv=fdatasync: sync file data at end
# oflag=direct: O_DIRECT — bypasses page cache entirely

# Measure read speed (drop cache first):</span>
<span class="cb-prompt">$</span> echo 3 | sudo tee /proc/sys/vm/drop_caches >/dev/null
<span class="cb-prompt">$</span> dd if=/data/test of=/dev/null bs=1M
<span class="cb-out">1073741824 bytes (1.1 GB) copied, 1.8 s, 596 MB/s</span>

<span class="cb-cmt">## ═══ /proc/sys/vm TUNING ══════════════════════════════════════</span>
<span class="cb-prompt">$</span> cat /proc/sys/vm/dirty_ratio         <span class="cb-cmt"># % of RAM before forced writeback</span>
<span class="cb-out">20</span>
<span class="cb-prompt">$</span> cat /proc/sys/vm/dirty_background_ratio  <span class="cb-cmt"># % before background writeback starts</span>
<span class="cb-out">10</span>
<span class="cb-cmt"># Lower dirty_ratio = more frequent disk writes (safer, slower)
# Higher dirty_ratio = more buffering (faster, more data at risk)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — I/O MONITORING: iostat, iotop
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> I/O Monitoring — <code>iostat</code>, <code>iotop</code>, <code>/proc/diskstats</code></h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="200" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">iostat Output — Every Column Decoded</text>

  <!-- iostat header row -->
  <rect x="14" y="34" width="792" height="24" rx="4" fill="#1f2027" stroke="#30363d" stroke-width="1"/>
  <text x="58"  y="51" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">Device</text>
  <text x="148" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">tps</text>
  <text x="218" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">kB_read/s</text>
  <text x="318" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">kB_wrtn/s</text>
  <text x="418" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">await</text>
  <text x="490" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">svctm</text>
  <text x="560" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">%util</text>
  <text x="660" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">r_await</text>
  <text x="740" y="51" text-anchor="middle" font-family="'Courier New',monospace" font-size="10" fill="#ffa657">w_await</text>

  <!-- Data row (high util) -->
  <rect x="14" y="60" width="792" height="22" rx="2" fill="#2a1a14"/>
  <text x="58"  y="75" font-family="'Courier New',monospace" font-size="10.5" fill="#ffa657">sda</text>
  <text x="148" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#3fb950">324.5</text>
  <text x="218" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#3fb950">0.0</text>
  <text x="318" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#58a6ff">485,230</text>
  <text x="418" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#f85149">42.3</text>
  <text x="490" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#e6edf3">3.1</text>
  <text x="560" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#f85149">98.7%</text>
  <text x="660" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#8b949e">1.2</text>
  <text x="740" y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#f85149">45.1</text>

  <!-- Annotations below -->
  <rect x="14" y="92" width="792" height="100" rx="6" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="26" y="112" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Column meanings:</text>
  <text x="26"  y="130" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">tps</text>     <text x="56"  y="130" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = transfers per second (I/O operations)  </text>
  <text x="302" y="130" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">kB_read/s</text><text x="370" y="130" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = kilobytes read per second  </text>
  <text x="570" y="130" font-family="'Courier New',monospace" font-size="10" fill="#f85149">await</text>   <text x="610" y="130" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = avg wait time (ms) per request (queue + service)</text>
  <text x="26"  y="148" font-family="'Courier New',monospace" font-size="10" fill="#f85149">%util</text>   <text x="72"  y="148" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149"> = disk saturation (100% = fully saturated!)  </text>
  <text x="380" y="148" font-family="'Courier New',monospace" font-size="10" fill="#f85149">r_await/w_await</text> <text x="492" y="148" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e"> = read/write latency separately</text>
  <text x="26"  y="166" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">SSD: await should be &lt;1ms, %util can be 100% (parallel I/O).  HDD: await &gt;20ms = busy, %util &gt;80% = saturated.</text>
  <text x="26"  y="183" font-family="'Segoe UI',sans-serif" font-size="10" fill="#f85149">Here: %util=98.7% + w_await=45ms = disk is saturated by writes. Writes are queuing up. Need faster disk or write batching.</text>
</svg>
</div>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 9 of 10 — iostat, iotop, /proc/diskstats: monitor disk I/O</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ iostat — DISK I/O STATISTICS ══════════════════════════</span>
<span class="cb-prompt">$</span> iostat                          <span class="cb-cmt"># one-shot summary</span>
<span class="cb-prompt">$</span> iostat -x                       <span class="cb-cmt"># extended stats (await, %util, etc.)</span>
<span class="cb-prompt">$</span> iostat -x 2                     <span class="cb-cmt"># update every 2 seconds (live)</span>
<span class="cb-prompt">$</span> iostat -x 2 5                   <span class="cb-cmt"># 5 iterations, 2-second intervals</span>
<span class="cb-prompt">$</span> iostat -x -d sda                <span class="cb-cmt"># specific device only</span>
<span class="cb-prompt">$</span> iostat -x -p sda                <span class="cb-cmt"># include partitions</span>
<span class="cb-prompt">$</span> iostat -h                       <span class="cb-cmt"># human-readable sizes</span>
<span class="cb-cmt"># First output is since boot (not useful for live monitoring)
# Second and subsequent: since last interval — these are meaningful</span>

<span class="cb-cmt">## ═══ iotop — PER-PROCESS I/O ════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo iotop                      <span class="cb-cmt"># interactive top-like I/O view</span>
<span class="cb-prompt">$</span> sudo iotop -o                   <span class="cb-cmt"># -o: only show processes doing I/O</span>
<span class="cb-prompt">$</span> sudo iotop -b -n 5              <span class="cb-cmt"># batch, 5 iterations</span>
<span class="cb-out">TID  PRIO  USER   DISK READ  DISK WRITE  SWAPIN  IO  COMMAND</span>
<span class="cb-out">5001 be/4  ravi      0.00 B/s 485.2 M/s   0.0%  99%  python3 load.py</span>
<span class="cb-out">5234 be/4  ravi   12.5 M/s     0.00 B/s   0.0%   5%  python3 extract.py</span>
<span class="cb-cmt"># python3 load.py is writing 485 MB/s — it's the I/O hog!</span>

<span class="cb-cmt">## ═══ /proc/diskstats — RAW I/O COUNTERS ════════════════════</span>
<span class="cb-prompt">$</span> cat /proc/diskstats
<span class="cb-out">  8  0 sda  1234  567  89012 4567  890  123  45678 9012  0  5678  13579</span>
<span class="cb-cmt">#         name  reads  merged  sectors  ms_read  writes  merged  sectors  ms_write  in_flight  ms_io  ms_weighted</span>
<span class="cb-cmt"># This is what iostat reads — you can parse it directly in scripts</span>

<span class="cb-cmt">## ═══ CALCULATE I/O UTILISATION FROM /proc/diskstats ════════</span>
get_io_util() {
    local DEVICE="\${1:-sda}"
    local S1 S2 TICKS1 TICKS2 DIFF UTIL
    S1=$(awk "/^[[:space:]]+[0-9]+ [0-9]+ $DEVICE /" /proc/diskstats)
    TICKS1=$(echo "$S1" | awk '{print $13}')
    sleep 1
    S2=$(awk "/^[[:space:]]+[0-9]+ [0-9]+ $DEVICE /" /proc/diskstats)
    TICKS2=$(echo "$S2" | awk '{print $13}')
    DIFF=$(( TICKS2 - TICKS1 ))
    UTIL=$(( DIFF / 10 ))
    echo "$DEVICE: \${UTIL}% util"
}
get_io_util sda

<span class="cb-cmt">## ═══ WATCH FOR DISK SATURATION ══════════════════════════════</span>
monitor_io() {
    while true; do
        iostat -x -d sda 1 1 | awk 'NR==4 {
            util=$NF
            await=$(NF-3)
            if (util+0 > 80) print "⚠ DISK SATURATED:", util"% util, await="await"ms"
        }'
        sleep 5
    done
}
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — FILESYSTEM TYPES COMPARED
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Filesystem Types — ext4, XFS, Btrfs, tmpfs, NFS</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Filesystem Comparison — Choose the Right One</text>

  <!-- Headers -->
  <rect x="14" y="34" width="792" height="22" rx="4" fill="#1f2027"/>
  <text x="80"  y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">FS Type</text>
  <text x="230" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Best For</text>
  <text x="400" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Key Features</text>
  <text x="600" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Max File/FS Size</text>
  <text x="750" y="50" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" font-weight="bold" fill="#ffa657">Used By</text>

  <!-- ext4 -->
  <rect x="14" y="58" width="792" height="26" rx="2" fill="#0e1824"/>
  <text x="80"  y="75" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#f85149">ext4</text>
  <text x="230" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">General purpose</text>
  <text x="400" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Journaling, backwards compat</text>
  <text x="600" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">16TB / 1 EB</text>
  <text x="750" y="75" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">/ root, most Linux</text>

  <!-- XFS -->
  <rect x="14" y="86" width="792" height="26" rx="2" fill="#161b22"/>
  <text x="80"  y="103" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#3fb950">xfs</text>
  <text x="230" y="103" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Large files, high throughput</text>
  <text x="400" y="103" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Parallel I/O, no fragmentation</text>
  <text x="600" y="103" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">8 EB / 8 EB</text>
  <text x="750" y="103" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">RHEL default, /data</text>

  <!-- Btrfs -->
  <rect x="14" y="114" width="792" height="26" rx="2" fill="#0e1824"/>
  <text x="80"  y="131" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#58a6ff">btrfs</text>
  <text x="230" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Snapshots, CoW, RAID</text>
  <text x="400" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Snapshots, subvolumes, checksums</text>
  <text x="600" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">16 EB / 16 EB</text>
  <text x="750" y="131" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Fedora/SUSE</text>

  <!-- tmpfs -->
  <rect x="14" y="142" width="792" height="26" rx="2" fill="#161b22"/>
  <text x="80"  y="159" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#bc8cff">tmpfs</text>
  <text x="230" y="159" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Fast temp storage in RAM</text>
  <text x="400" y="159" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">In-memory, vanishes on reboot</text>
  <text x="600" y="159" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">limited by RAM</text>
  <text x="750" y="159" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#3fb950">/tmp /dev/shm</text>

  <!-- NFS -->
  <rect x="14" y="170" width="792" height="26" rx="2" fill="#0e1824"/>
  <text x="80"  y="187" text-anchor="middle" font-family="'Courier New',monospace" font-size="10.5" fill="#ffa657">nfs</text>
  <text x="230" y="187" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Shared network storage</text>
  <text x="400" y="187" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">Network access, shared across hosts</text>
  <text x="600" y="187" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">server-limited</text>
  <text x="750" y="187" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9.5" fill="#8b949e">shared /data, NAS</text>

  <rect x="14" y="202" width="792" height="12" rx="2" fill="#161b22"/>
  <text x="26" y="212" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">⚡ Data Engineering: Use XFS or ext4 for /data (large files).  tmpfs for intermediate pipeline stages (extreme speed, lose on crash).  NFS for shared input across workers.</text>
</svg>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — VFS, Page Cache, I/O Scheduler, Block Layer</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ How the Linux Kernel Handles File I/O — VFS Objects, Page Cache, Block Layer</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
1. VFS OBJECTS — The Four Core Structures

   superblock: represents a mounted filesystem
     - fs type, block size, inode count, free blocks
     - one per mounted filesystem
     - read from disk at mount time
   
   inode: represents one file/directory/symlink
     - permissions, owner, timestamps, size
     - block pointers (where data lives on disk)
     - one per file, identified by inode number
   
   dentry (directory entry): represents a path component
     - maps filename to inode
     - cached in "dentry cache" for fast path lookup
     - /home/ravi/data.csv → 3 dentries: home, ravi, data.csv
   
   file: represents an open file descriptor
     - per-process, per-open-call
     - holds current seek position (f_pos)
     - points to inode (which has the data blocks)
     - struct file in kernel = what open() returns to user

2. PAGE CACHE — THE MOST IMPORTANT OPTIMIZATION

   All file reads go through the page cache:
   1. read() requested for file offset X
   2. Kernel checks: is page at offset X in page cache?
   3. YES: copy from cache → user space (no disk I/O)
   4. NO: allocate new page, read from disk, cache it, return
   
   All file writes go through page cache:
   1. write() → copy data into page cache
   2. Mark page as "dirty"
   3. Return to user immediately (write appears complete)
   4. Kernel pdflush/writeback daemon flushes dirty pages
      after 30s or when dirty ratio exceeded
   
   This is why reads after writes are "fast" and why
   "free" memory looks low on busy servers (all used as cache).
   MemAvailable in /proc/meminfo = MemFree + reclaimable cache.

3. I/O SCHEDULER (Block Layer)

   The block layer receives bio (block I/O) requests from
   filesystem drivers and decides the ORDER to send to disk.
   
   BFQ (Budget Fair Queuing):
   - Default on desktop/interactive systems
   - Fair sharing of bandwidth between processes
   - Low latency for interactive tasks
   
   mq-deadline (Multi-Queue Deadline):
   - Default on many servers (NVMe, cloud VMs)
   - Prevents starvation (reads get deadline priority)
   - Good for databases and sequential workloads
   
   none (No-op):
   - No reordering — FIFO
   - Best for SSDs/NVMe that have their own internal scheduling
   - Use when device is faster than any software reordering helps
   
   Check/change scheduler:
   cat /sys/block/sda/queue/scheduler
   echo mq-deadline > /sys/block/sda/queue/scheduler

4. FSYNC VS FDATASYNC VS SYNC

   sync()      - flush ALL dirty pages across ALL filesystems
   fsync(fd)   - flush file data AND metadata (inode) for one FD
   fdatasync(fd) - flush file data ONLY, skip metadata if possible
   msync(ptr)  - flush mmap'd region to backing file
   
   Performance: fdatasync >> fsync > sync
   Safety equivalence: all guarantee data reaches storage controller
   
   Database journaling uses fdatasync for WAL (Write-Ahead Log):
   Write to log, fdatasync, then apply to data files.

5. MOUNT NAMESPACES

   Linux supports mount namespaces (CLONE_NEWNS):
   - Different processes can see different mount trees
   - Container technology (Docker) uses this:
     Container's filesystem is a separate mount namespace
     Host filesystem not visible inside container
   - bind mounts + namespaces = how Docker volumes work
   
   cat /proc/self/mountinfo   (process's mount namespace)
   lsns -t mnt                 (list all mount namespaces)
</pre>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — SPECIAL MOUNTS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Special Mounts — tmpfs, Bind, Loop, Overlay</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 10 of 10 — tmpfs pipeline, bind mounts, overlay, loop devices</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ tmpfs — RAM DISK FOR PIPELINES ═════════════════════════</span>
<span class="cb-cmt"># Extremely fast: reads/writes happen at memory speed (10-40 GB/s)
# Data disappears on reboot or umount — use for intermediate stages</span>

<span class="cb-prompt">$</span> sudo mount -t tmpfs -o size=8G tmpfs /mnt/fast
<span class="cb-prompt">$</span> df -h /mnt/fast
<span class="cb-out">tmpfs   8.0G  0  8.0G  0% /mnt/fast</span>

<span class="cb-cmt"># Pipeline pattern: download → process in tmpfs → write results to disk</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">TMPFS="/mnt/pipeline-work"</span>
<span class="cb-out">sudo mount -t tmpfs -o size=4G tmpfs "$TMPFS"</span>
<span class="cb-out">trap "sudo umount '$TMPFS'" EXIT</span>
<span class="cb-out"></span>
<span class="cb-out">cp /data/raw/input.csv "$TMPFS/"          # copy to RAM</span>
<span class="cb-out">python3 sort_huge.py "$TMPFS/input.csv"   # sort in RAM (fast!)</span>
<span class="cb-out">cp "$TMPFS/sorted.csv" /data/processed/   # save results to disk</span>
<span class="cb-cmt"># Sorting 4GB in RAM: ~10s. Sorting on disk: ~3 minutes.</span>

<span class="cb-cmt">## ═══ BIND MOUNT — ALIAS A DIRECTORY ═════════════════════════</span>
<span class="cb-cmt"># Expose /data/raw at /input without copying files</span>
<span class="cb-prompt">$</span> sudo mount --bind /data/raw /mnt/input
<span class="cb-cmt"># /mnt/input and /data/raw now show EXACTLY the same files
# Changes in one appear in the other instantly

# Read-only bind mount (expose data safely):</span>
<span class="cb-prompt">$</span> sudo mount --bind /data/raw /mnt/input
<span class="cb-prompt">$</span> sudo mount -o remount,ro,bind /mnt/input
<span class="cb-cmt"># Container can read /mnt/input but cannot modify it</span>

<span class="cb-cmt">## ═══ LOOP MOUNT — MOUNT AN IMAGE FILE ════════════════════════</span>
<span class="cb-cmt"># Create a 10GB disk image file:</span>
<span class="cb-prompt">$</span> dd if=/dev/zero of=/data/archive.img bs=1M count=10240
<span class="cb-prompt">$</span> mkfs.ext4 /data/archive.img
<span class="cb-prompt">$</span> sudo mount -o loop /data/archive.img /mnt/archive
<span class="cb-cmt"># Now /mnt/archive is a 10GB ext4 filesystem in a file
# Useful for: distributing disk images, testing, containers</span>

<span class="cb-prompt">$</span> losetup -l                    <span class="cb-cmt"># list loop devices</span>
<span class="cb-out">NAME       SIZELIMIT  OFFSET  AUTOCLEAR  RO  BACK-FILE</span>
<span class="cb-out">/dev/loop0         0       0          1   0  /data/archive.img</span>

<span class="cb-cmt">## ═══ OVERLAY FILESYSTEM (Docker/containers) ══════════════════</span>
<span class="cb-cmt"># Overlay = read-only lower layer + read-write upper layer
# Reads come from lower (base), writes go to upper (changes only)
# Used by Docker for container layers</span>
<span class="cb-prompt">$</span> sudo mount -t overlay overlay \
    -o lowerdir=/data/base,upperdir=/tmp/changes,workdir=/tmp/work \
    /mnt/overlay
<span class="cb-cmt"># /data/base = read-only base (original files)
# /tmp/changes = writes land here (only the diff)
# /mnt/overlay = merged view: base + changes</span>

<span class="cb-cmt">## ═══ NFS MOUNT ═══════════════════════════════════════════════</span>
<span class="cb-prompt">$</span> sudo mount -t nfs nas.company.com:/data /mnt/nas
<span class="cb-prompt">$</span> sudo mount -t nfs4 -o rw,hard,timeo=600 nas:/raw /mnt/nas-raw
<span class="cb-cmt"># nfs4: use NFS version 4
# hard: keep retrying if server unavailable (vs soft=fail immediately)
# timeo: timeout in deciseconds (600 = 60s)</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Storage for Data Pipelines</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Production storage patterns: monitoring, disk alerts, pipeline optimisation</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: COMPLETE DISK MONITOR ═══════════════════════</span>
<span class="cb-out">#!/bin/bash</span>
<span class="cb-out">THRESHOLD=90</span>
<span class="cb-out">INODE_THRESHOLD=80</span>
<span class="cb-out">LOG="/var/log/disk-monitor.log"</span>
<span class="cb-out"></span>
<span class="cb-out">check_all_disks() {</span>
<span class="cb-out">    local ALERTS=0</span>
<span class="cb-out">    local TS="$(date '+%Y-%m-%d %H:%M:%S')"</span>
<span class="cb-out"></span>
<span class="cb-out">    # Space check</span>
<span class="cb-out">    while IFS= read -r line; do</span>
<span class="cb-out">        local PCT MOUNT FS</span>
<span class="cb-out">        PCT=$(echo "$line" | awk '{gsub(/%/,""); print $5}')</span>
<span class="cb-out">        MOUNT=$(echo "$line" | awk '{print $6}')</span>
<span class="cb-out">        FS=$(echo "$line" | awk '{print $1}')</span>
<span class="cb-out">        if (( PCT >= THRESHOLD )); then</span>
<span class="cb-out">            echo "$TS SPACE_ALERT: $MOUNT ($FS) \${PCT}% full" | tee -a "$LOG"</span>
<span class="cb-out">            (( ALERTS++ ))</span>
<span class="cb-out">        fi</span>
<span class="cb-out">    done < <(df -h | grep '^/dev' | grep -v tmpfs)</span>
<span class="cb-out"></span>
<span class="cb-out">    # Inode check</span>
<span class="cb-out">    while IFS= read -r line; do</span>
<span class="cb-out">        local IPCT MOUNT</span>
<span class="cb-out">        IPCT=$(echo "$line" | awk '{gsub(/%/,""); print $5}')</span>
<span class="cb-out">        MOUNT=$(echo "$line" | awk '{print $6}')</span>
<span class="cb-out">        if (( IPCT >= INODE_THRESHOLD )); then</span>
<span class="cb-out">            echo "$TS INODE_ALERT: $MOUNT \${IPCT}% inodes used" | tee -a "$LOG"</span>
<span class="cb-out">            (( ALERTS++ ))</span>
<span class="cb-out">        fi</span>
<span class="cb-out">    done < <(df -i | grep '^/dev' | grep -v tmpfs)</span>
<span class="cb-out"></span>
<span class="cb-out">    return "$ALERTS"</span>
<span class="cb-out">}</span>
<span class="cb-out">check_all_disks

<span class="cb-cmt">## ═══ PATTERN 2: FIND AND CLEAN OLD DATA ═════════════════════</span>
<span class="cb-out">clean_old_outputs() {</span>
<span class="cb-out">    local DIR="\${1:-/data/processed}" DAYS="\${2:-30}"</span>
<span class="cb-out">    echo "=== Cleaning files older than $DAYS days in $DIR ==="</span>
<span class="cb-out">    local BEFORE; BEFORE=$(df -h "$DIR" | awk 'NR==2 {print $4}')</span>
<span class="cb-out">    find "$DIR" -type f -mtime "+$DAYS" -print -delete 2>/dev/null</span>
<span class="cb-out">    find "$DIR" -type d -empty -delete 2>/dev/null</span>
<span class="cb-out">    local AFTER; AFTER=$(df -h "$DIR" | awk 'NR==2 {print $4}')</span>
<span class="cb-out">    echo "Free before: $BEFORE → after: $AFTER"</span>
<span class="cb-out">}</span>

<span class="cb-cmt">## ═══ PATTERN 3: tmpfs PIPELINE ACCELERATOR ══════════════════</span>
<span class="cb-out">run_fast_pipeline() {</span>
<span class="cb-out">    local INPUT="$1" OUTPUT="$2"</span>
<span class="cb-out">    local TMPDIR; TMPDIR=$(mktemp -d /mnt/fast/pipeline.XXXXXX)</span>
<span class="cb-out">    trap "rm -rf '$TMPDIR'" EXIT</span>
<span class="cb-out"></span>
<span class="cb-out">    echo "Copying to fast storage..."</span>
<span class="cb-out">    cp "$INPUT" "$TMPDIR/input.csv"</span>
<span class="cb-out"></span>
<span class="cb-out">    echo "Processing (in RAM)..."</span>
<span class="cb-out">    time python3 /opt/etl/process.py \</span>
<span class="cb-out">        --input "$TMPDIR/input.csv" \</span>
<span class="cb-out">        --output "$TMPDIR/output.csv" \</span>
<span class="cb-out">        --sort-column date</span>
<span class="cb-out"></span>
<span class="cb-out">    echo "Saving results..."</span>
<span class="cb-out">    cp "$TMPDIR/output.csv" "$OUTPUT"</span>
<span class="cb-out">    echo "Done: $OUTPUT"</span>
<span class="cb-out">}</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 14 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:25%">Command / File</th><th>Purpose</th><th style="width:26%">Key Options</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-weight:bold;font-family:'Segoe UI',sans-serif;">Device Discovery</td></tr>
<tr><td style="font-family:monospace;">lsblk [-f]</td><td>List block devices as tree</td><td><code>-f</code> show FS+UUID, <code>-o</code> custom columns</td></tr>
<tr><td style="font-family:monospace;">blkid [device]</td><td>Show UUID, filesystem type, label</td><td><code>-U uuid</code> UUID→device, <code>-L label</code></td></tr>
<tr><td style="font-family:monospace;">fdisk -l /dev/sda</td><td>Show partition table</td><td>MBR or GPT, sector info</td></tr>
<tr><td style="font-family:monospace;">findmnt [target]</td><td>Show mount tree or specific mount</td><td><code>-t ext4</code> by type, <code>--real</code> real only</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-weight:bold;font-family:'Segoe UI',sans-serif;">Mounting</td></tr>
<tr><td style="font-family:monospace;">mount [-t type] [-o opts]</td><td>Mount a filesystem</td><td><code>--bind</code> bind, <code>-o loop</code> image, <code>-o ro</code> read-only</td></tr>
<tr><td style="font-family:monospace;">umount /path</td><td>Unmount filesystem</td><td><code>-l</code> lazy, <code>-f</code> force; use <code>fuser -km</code> if busy</td></tr>
<tr><td style="font-family:monospace;">mount -a</td><td>Mount all entries in /etc/fstab</td><td>Run after editing fstab to test</td></tr>
<tr><td style="font-family:monospace;">/etc/fstab</td><td>Persistent mount configuration</td><td>Use UUID, add <code>nofail</code> for optional mounts</td></tr>
<tr><td colspan="3" style="background:#2a2a14;color:#ffa657;font-weight:bold;font-family:'Segoe UI',sans-serif;">Disk Usage</td></tr>
<tr><td style="font-family:monospace;">df -h</td><td>Filesystem space usage</td><td><code>-i</code> inodes, <code>-T</code> type, <code>-x tmpfs</code> exclude</td></tr>
<tr><td style="font-family:monospace;">df -i</td><td>Inode usage (often overlooked!)</td><td>Can be 100% while space remains</td></tr>
<tr><td style="font-family:monospace;">du -sh /path/*</td><td>Disk usage by directory</td><td><code>--max-depth=2</code>, <code>-a</code> include files</td></tr>
<tr><td style="font-family:monospace;">du -ah | sort -rh | head</td><td>Find largest files/dirs</td><td>Combine with <code>find -size +1G</code></td></tr>
<tr><td style="font-family:monospace;">ncdu /path</td><td>Interactive disk usage explorer</td><td>Navigate, delete, most intuitive</td></tr>
<tr><td colspan="3" style="background:#2a1a14;color:#f85149;font-weight:bold;font-family:'Segoe UI',sans-serif;">I/O Monitoring</td></tr>
<tr><td style="font-family:monospace;">iostat -x 2</td><td>Disk I/O stats every 2s</td><td><code>%util</code> saturation, <code>await</code> latency</td></tr>
<tr><td style="font-family:monospace;">sudo iotop -o</td><td>Per-process I/O usage</td><td><code>-b -n 5</code> batch mode</td></tr>
<tr><td style="font-family:monospace;">stat file</td><td>Full inode information</td><td>atime/mtime/ctime, links, blocks</td></tr>
<tr><td style="font-family:monospace;">sync</td><td>Flush all dirty pages to disk</td><td>Before unmount, before shutdown</td></tr>
<tr><td style="font-family:monospace;">/proc/diskstats</td><td>Raw I/O counters per device</td><td>Source for iostat, parseable in scripts</td></tr>
</tbody>
</table>
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
    <h4>Exercise 1 — Explore Your Storage Landscape</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Run <code>lsblk -f</code> — draw the disk → partition → filesystem → mountpoint tree for your system</li>
      <li>Run <code>blkid</code> — find the UUID of your root (<code>/</code>) filesystem partition</li>
      <li>Run <code>findmnt</code> — identify which are real disk filesystems vs virtual (proc/sysfs/tmpfs)</li>
      <li>Run <code>df -h</code> and <code>df -i</code> — which filesystem has the highest inode usage %?</li>
      <li>Run <code>stat /etc/passwd</code> — identify the inode number, link count, atime, mtime, ctime</li>
      <li>Run <code>cat /proc/mounts</code> — compare to <code>findmnt</code> output</li>
      <li>Create a hard link: <code>ln /tmp/test.txt /tmp/test2.txt</code> — verify same inode with <code>ls -li</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Mount Operations</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Create a 100MB tmpfs: <code>sudo mount -t tmpfs -o size=100M tmpfs /mnt/test</code> — verify with <code>df -h</code></li>
      <li>Write a file to it, confirm it's readable, then unmount and confirm the file is gone</li>
      <li>Create a bind mount: <code>sudo mount --bind /etc /mnt/etc-copy</code> — verify same contents, unmount</li>
      <li>Create a 50MB loop-back image file, format it as ext4, mount it, create files, unmount</li>
      <li>Read <code>/etc/fstab</code> on your system — identify the root filesystem entry. What UUID is used?</li>
      <li>Add a tmpfs entry to <code>/etc/fstab</code> for <code>/tmp</code> with size=512M — test with <code>sudo mount -a</code></li>
      <li>Use <code>fuser -vm /mnt/test</code> while a process has a file open — see what's blocking unmount</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Disk Usage Investigation</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Use <code>du -sh /* 2>/dev/null</code> to find the top 5 largest directories under root</li>
      <li>Write a script that prints a disk usage report: each mountpoint, used%, free space, inode%, filesystem type</li>
      <li>Use <code>find / -size +100M -type f 2>/dev/null | head -20</code> — find the 20 largest files</li>
      <li>Simulate inode exhaustion: create 50,000 empty files in a tmpfs, verify inode usage with <code>df -i</code></li>
      <li>Use <code>lsof | grep deleted</code> to find any deleted-but-open files on your system — explain why they exist</li>
      <li>Compare <code>du -sh /var</code> vs <code>df -h /</code> — explain any difference in reported usage</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — I/O Performance Analysis</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Benchmark disk write speed using <code>dd</code>: buffered vs direct (<code>oflag=direct</code>) vs with fsync (<code>conv=fdatasync</code>). Record the speeds.</li>
      <li>Drop page cache (<code>echo 3 > /proc/sys/vm/drop_caches</code>) then benchmark read speed. Then read the same file again without dropping cache — explain the speed difference.</li>
      <li>Run <code>iostat -x 2</code> while doing a large file copy. Record <code>%util</code> and <code>await</code>. Is the disk saturated?</li>
      <li>Use <code>sudo iotop -o</code> while the copy runs — confirm which process is doing the I/O.</li>
      <li>Compare writing 1GB to <code>/tmp</code> (tmpfs) vs <code>/data</code> (real disk) — measure with <code>time</code>.</li>
      <li>Write a script that parses <code>/proc/diskstats</code> twice with a 1-second gap to calculate read/write MB/s for a specific disk.</li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Complete Storage Monitor</h4>
    <p>Build <code>storage_monitor.sh</code> — a production storage health daemon:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Disk space:</strong> Check every 5 minutes. Alert at 80%, critical at 90%. Alert on inode usage too (separate thresholds).</li>
      <li><strong>I/O saturation:</strong> Parse <code>/proc/diskstats</code> every 30s to compute %util per device. Alert if any device is &gt;80% utilised for 3 consecutive readings.</li>
      <li><strong>Deleted-but-open files:</strong> Every 10 minutes, check for large (&gt;100MB) deleted-but-open files via <code>lsof</code>. Report the process name, PID, and wasted bytes.</li>
      <li><strong>Mount health:</strong> Every minute, verify that all expected mount points from a config file are actually mounted and not read-only. Alert if a filesystem silently became read-only (can happen on error).</li>
      <li><strong>Trend analysis:</strong> Track disk usage over time, log to a CSV. Compute rate of growth (MB/hour) and project time until full. Alert if disk will be full in &lt;24 hours.</li>
      <li><strong>Auto-cleanup:</strong> If disk exceeds 95%, automatically delete files matching patterns in a config file (e.g. <code>/data/tmp/*.tmp</code> older than 7 days). Log what was deleted.</li>
    </ol>
    <p><strong>Must: run as daemon with systemd, handle SIGHUP to reload config, log with rotation, never crash on filesystem errors, work when network mounts are unavailable.</strong></p>
  </div>
</div>

<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Storage Discipline — Day 455</div>
    <p>After the disk-full incident, Ravi added the disk monitor to every server. But more than the alerting, what changed was his mental model. He stopped thinking of "the disk" as a single thing. He started seeing the storage tree: root on <code>/dev/sda2</code>, data on <code>/dev/sda3</code> (XFS, mounted <code>noatime</code>), tmpfs at <code>/tmp</code> and <code>/mnt/pipeline-fast</code>. Each filesystem with its own capacity, its own inode pool, its own performance characteristics.</p>
    <p>The biggest win came from the tmpfs pipeline pattern. The nightly sort job — which had to sort 8GB of transaction records by timestamp — dropped from 18 minutes to 4 minutes when Ravi moved the intermediate work to a 12GB tmpfs. Same CPU, same disk for input and output, but the sort itself happened entirely in RAM.</p>
    <p>He also found two processes holding deleted log files open — a combined 6.3GB of "phantom" disk space that had been wasted for weeks. Restarting those processes freed the space immediately.</p>
    <p>"Storage," Priya said, "is not one thing. It's a tree of filesystems, each with space, inodes, and performance. Know what's at each branch and you'll never be surprised."</p>
    <p><strong>df tells you how full. du tells you what's full. iostat tells you how busy. All three together tell you the whole story.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};