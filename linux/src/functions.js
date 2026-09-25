var functions = {
    title: "Functions & Builtins",
    description: "Master Bash functions from first definition to advanced patterns — parameters, return values, scope, recursion, libraries, and the key builtins every script relies on. Write reusable, testable shell code.",
    content: `

<!-- ══════════════════════════════════════════════════════
     RAVI'S STORY — HOOK
══════════════════════════════════════════════════════ -->
<div class="story-panel">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Copy-Paste Nightmare — Day 210</div>
    <br>
    <p>Ravi had five pipeline scripts. Each one had the same 12 lines of logging at the top, the same 8 lines of DB connection validation, the same 15 lines of error handling. When Priya changed the log format, Ravi had to find and update all five scripts. He missed one. That one ran silently wrong for three days.</p>
    <br>
    <p>"You have the same code in five places," Priya said. "That means five places to update when it changes. Five places to get wrong." She took his logging block and put it in a function: <code>log_info() { printf "[INFO] %s %s\n" "$(date '+%T')" "$*"; }</code>. Then she sourced a shared library file at the top of each script. Now there was one place to update. One place to get wrong.</p>
    <br>
    <p>"A function is not just shorter code," she said. "It is a contract. It has a name, inputs, and a defined output. Once you write it right, every script that calls it benefits automatically."</p>
    <br>
    <p>This module covers functions end-to-end — how they work, how parameters pass, how values return, how scope isolates, and how to build and share function libraries across scripts.</p>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 1 — FUNCTION ANATOMY
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Function Anatomy — Definition, Call &amp; Return</h2>

<p>A Bash function is a named block of commands. When called, bash executes those commands and then resumes at the call site. Functions run in the <strong>same shell process</strong> — they are not separate programs.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <defs>
    <marker id="arr-g" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#3fb950"/></marker>
    <marker id="arr-b" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#58a6ff"/></marker>
    <marker id="arr-y" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#ffa657"/></marker>
    <marker id="arr-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#f85149"/></marker>
  </defs>
  <rect width="820" height="220" fill="#0d1117" rx="12"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="13" font-weight="bold" fill="#8b949e">Function Anatomy — Definition, Call, Execution, Return</text>

  <!-- Definition block -->
  <rect x="15" y="36" width="300" height="172" rx="8" fill="#161b22" stroke="#bc8cff" stroke-width="2"/>
  <text x="165" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">① DEFINITION (stored, not run yet)</text>
  <text x="30" y="78" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">greet() {</text>
  <text x="44" y="96" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3">local NAME="$1"</text>
  <text x="44" y="114" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3">echo "Hello, $NAME"</text>
  <text x="44" y="132" font-family="'Courier New',monospace" font-size="12" fill="#e6edf3">return 0</text>
  <text x="30" y="150" font-family="'Courier New',monospace" font-size="12" fill="#bc8cff">}</text>
  <text x="165" y="180" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Stored in bash's function table</text>
  <text x="165" y="196" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Not executed until called</text>

  <!-- Arrow: call -->
  <line x1="317" y1="110" x2="380" y2="110" stroke="#58a6ff" stroke-width="2" marker-end="url(#arr-b)"/>
  <text x="348" y="102" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#58a6ff">② CALL</text>
  <text x="348" y="122" font-family="'Courier New',monospace" font-size="9" fill="#58a6ff">greet "Ravi"</text>

  <!-- Execution block -->
  <rect x="383" y="36" width="280" height="172" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="523" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">③ EXECUTION (same shell process)</text>
  <text x="400" y="78" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">$1 → "Ravi"</text>
  <text x="400" y="96" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">local NAME="Ravi"</text>
  <text x="400" y="114" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">echo "Hello, Ravi"</text>
  <text x="400" y="132" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">return 0</text>
  <text x="523" y="158" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">No fork() — same PID</text>
  <text x="523" y="174" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Shares shell's variables</text>
  <text x="523" y="190" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">(unless local used)</text>

  <!-- Arrow: return -->
  <line x1="665" y1="110" x2="730" y2="110" stroke="#ffa657" stroke-width="2" marker-end="url(#arr-y)"/>
  <text x="696" y="102" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#ffa657">④ RETURN</text>

  <!-- Return block -->
  <rect x="732" y="56" width="76" height="108" rx="7" fill="#2a2a1a" stroke="#ffa657" stroke-width="1.5"/>
  <text x="770" y="82" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">$? = 0</text>
  <text x="770" y="98" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">exit code</text>
  <text x="770" y="118" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">stdout:</text>
  <text x="770" y="132" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">"Hello,</text>
  <text x="770" y="148" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#ffa657">Ravi"</text>
</svg>
</div>

<!-- CONSOLE 1 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 1 of 8 — Defining Functions: All Syntax Forms</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ SYNTAX FORM 1: name() { } — most common ════════════════</span>
greet() {
    echo "Hello, $1"
}
greet "Ravi"
<span class="cb-out">Hello, Ravi</span>

<span class="cb-cmt">## ═══ SYNTAX FORM 2: function name { } ════════════════════════</span>
function greet {
    echo "Hello, $1"
}
<span class="cb-cmt"># 'function' keyword is optional in bash
# Both forms are completely equivalent</span>

<span class="cb-cmt">## ═══ SYNTAX FORM 3: function name() { } (bash-specific) ══════</span>
function greet() {
    echo "Hello, $1"
}
<span class="cb-cmt"># Both keyword AND parens — redundant but valid
# Prefer form 1 (name() {}) — most readable and widely used</span>

<span class="cb-cmt">## ═══ ONE-LINE FUNCTION ════════════════════════════════════════</span>
greet() { echo "Hello, $1"; }     <span class="cb-cmt"># semicolon required before }</span>
now()    { date '+%Y-%m-%d %T'; }
die()    { echo "ERROR: $*" >&2; exit 1; }

<span class="cb-cmt">## ═══ CALL SYNTAX ══════════════════════════════════════════════</span>
greet "World"           <span class="cb-cmt"># just the function name — no () when calling!</span>
greet                   <span class="cb-cmt"># with no args — $1 will be empty</span>
greet "Ravi" "Kumar"    <span class="cb-cmt"># extra args: $1=Ravi, $2=Kumar</span>

<span class="cb-cmt">## ═══ FUNCTION MUST BE DEFINED BEFORE IT'S CALLED ═════════════</span>
<span class="cb-cmt"># This FAILS — call before definition:</span>
greet "Ravi"            <span class="cb-cmt"># ❌ greet: command not found</span>
greet() { echo "Hello, $1"; }

<span class="cb-cmt"># This WORKS — define first, call after:</span>
greet() { echo "Hello, $1"; }
greet "Ravi"            <span class="cb-cmt"># ✅</span>

<span class="cb-cmt"># Exception: calling a function from inside another function
# is fine even if called function defined later (resolved at call time):</span>
main() { helper; }          <span class="cb-cmt"># ✅ helper not defined yet, but OK</span>
helper() { echo "help"; }   <span class="cb-cmt"># defined before main() is CALLED</span>
main                        <span class="cb-cmt"># helper is resolved here — works</span>

<span class="cb-cmt">## ═══ LISTING AND DELETING FUNCTIONS ══════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">declare</span> <span class="cb-flag">-F</span>              <span class="cb-cmt"># list all function names</span>
<span class="cb-out">declare -f greet</span>
<span class="cb-out">declare -f now</span>
<span class="cb-out">declare -f die</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">declare</span> <span class="cb-flag">-f greet</span>        <span class="cb-cmt"># print function source code</span>
<span class="cb-out">greet ()</span>
<span class="cb-out">{</span>
<span class="cb-out">    echo "Hello, $1"</span>
<span class="cb-out">}</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> greet              <span class="cb-cmt"># shows function definition</span>
<span class="cb-out">greet is a function</span>
<span class="cb-out">greet ()</span>
<span class="cb-out">{</span>
<span class="cb-out">    echo "Hello, $1"</span>
<span class="cb-out">}</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">unset</span> <span class="cb-flag">-f</span> greet          <span class="cb-cmt"># delete function from memory</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 2 — PARAMETERS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Parameters — How Arguments Pass Into Functions</h2>

<p>Inside a function, positional parameters <code>$1 $2 … $9</code> refer to the function's own arguments — not the script's arguments. They are completely separate. This is one of the most important things to understand about Bash functions.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 170" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="170" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Positional Parameter Scope — Script vs Function</text>

  <!-- Script level -->
  <rect x="15" y="34" width="370" height="122" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="200" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">Script level: ./pipeline.sh alpha beta gamma</text>
  <text x="30" y="76" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">$0 = ./pipeline.sh</text>
  <text x="30" y="94" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">$1 = alpha   $2 = beta   $3 = gamma</text>
  <text x="30" y="112" font-family="'Courier New',monospace" font-size="11" fill="#3fb950">$# = 3       $@ = "alpha" "beta" "gamma"</text>
  <text x="200" y="146" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">script's $1-$9 are SHADOWED inside function calls</text>

  <!-- Arrow -->
  <text x="410" y="100" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="18" fill="#8b949e">→</text>

  <!-- Function level -->
  <rect x="435" y="34" width="370" height="122" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="620" y="54" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">Inside: process_file "data.csv" "/out" 42</text>
  <text x="450" y="76" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">$0 = ./pipeline.sh  (script name — unchanged)</text>
  <text x="450" y="94" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">$1 = data.csv  $2 = /out  $3 = 42</text>
  <text x="450" y="112" font-family="'Courier New',monospace" font-size="11" fill="#58a6ff">$# = 3   $@ = "data.csv" "/out" "42"</text>
  <text x="620" y="146" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">function's OWN $1-$9 — independent of script's</text>
</svg>
</div>

<!-- CONSOLE 2 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 2 of 8 — Parameters: $1-$9, $@, $*, $#, shift, named params</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ ACCESSING POSITIONAL PARAMETERS ════════════════════════</span>
process_file() {
    local INPUT="$1"
    local OUTPUT="$2"
    local MAX_ROWS="\${3:-1000}"     <span class="cb-cmt"># default if $3 not given</span>
    echo "Input:   $INPUT"
    echo "Output:  $OUTPUT"
    echo "Max:     $MAX_ROWS"
    echo "All args: $@"
    echo "Count:    $#"
}

process_file "data.csv" "/out/result.csv" 500
<span class="cb-out">Input:   data.csv</span>
<span class="cb-out">Output:  /out/result.csv</span>
<span class="cb-out">Max:     500</span>
<span class="cb-out">All args: data.csv /out/result.csv 500</span>
<span class="cb-out">Count:    3</span>

process_file "data.csv" "/out/result.csv"   <span class="cb-cmt"># $3 missing → default used</span>
<span class="cb-out">Max:     1000</span>

<span class="cb-cmt">## ═══ $@ vs $* — SAME RULE AS IN SCRIPTS ══════════════════════</span>
show_args() {
    echo "--- $@ (correct) ---"
    for a in "$@"; do echo "  [$a]"; done
    echo "--- $* (wrong)  ---"
    for a in "$*"; do echo "  [$a]"; done
}
show_args "hello world" "foo" "bar"
<span class="cb-out">--- $@ (correct) ---</span>
<span class="cb-out">  [hello world]    ← preserved as one arg</span>
<span class="cb-out">  [foo]</span>
<span class="cb-out">  [bar]</span>
<span class="cb-out">--- $* (wrong)  ---</span>
<span class="cb-out">  [hello world foo bar]  ← all merged</span>

<span class="cb-cmt">## ═══ PASSING ALL SCRIPT ARGS TO A FUNCTION ══════════════════</span>
main() {
    local ENV="$1"
    local DATE="$2"
    run_pipeline "$ENV" "$DATE"    <span class="cb-cmt"># pass specific args</span>
    run_pipeline "$@"              <span class="cb-cmt"># pass ALL function's args through</span>
}
main "$@"                          <span class="cb-cmt"># pass all SCRIPT args to main</span>

<span class="cb-cmt">## ═══ shift — CONSUME ARGUMENTS ONE BY ONE ════════════════════</span>
process_all() {
    while [[ $# -gt 0 ]]; do
        echo "Processing: $1"
        shift                       <span class="cb-cmt"># $2 → $1, $3 → $2, etc. $# decrements</span>
    done
}
process_all a.csv b.csv c.csv
<span class="cb-out">Processing: a.csv</span>
<span class="cb-out">Processing: b.csv</span>
<span class="cb-out">Processing: c.csv</span>

<span class="cb-cmt"># shift N: shift N positions at once</span>
parse_flags() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -e|--env)   ENV="$2"; shift 2 ;;   <span class="cb-cmt"># consume flag + value</span>
            -d|--date)  DATE="$2"; shift 2 ;;
            -v)         VERBOSE=true; shift ;;   <span class="cb-cmt"># consume flag only</span>
            --)         shift; break ;;          <span class="cb-cmt"># end of flags</span>
            *)          echo "Unknown: $1" >&2; return 1 ;;
        esac
    done
}

<span class="cb-cmt">## ═══ NAMED PARAMETER PATTERN (readable) ════════════════════</span>
load_data() {
    local FILE="\${1:?load_data: FILE required}"
    local TABLE="\${2:?load_data: TABLE required}"
    local BATCH="\${3:-1000}"
    local TRUNCATE="\${4:-false}"
    echo "Loading $FILE → $TABLE (batch=$BATCH truncate=$TRUNCATE)"
}
load_data "sales.csv" "sales_fact" 500 true

<span class="cb-cmt">## ═══ GETOPTS IN FUNCTIONS ════════════════════════════════════</span>
<span class="cb-cmt"># getopts works inside functions — OPTIND is function-local</span>
connect_db() {
    local HOST="localhost" PORT=5432 DB="analytics"
    local OPTIND=1                  <span class="cb-cmt"># reset — required for repeated calls!</span>
    while getopts "h:p:d:" opt; do
        case $opt in
            h) HOST="$OPTARG" ;;
            p) PORT="$OPTARG" ;;
            d) DB="$OPTARG"   ;;
        esac
    done
    echo "Connecting: $HOST:$PORT/$DB"
}
connect_db -h prod-db -p 5433 -d sales
<span class="cb-out">Connecting: prod-db:5433/sales</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 3 — RETURN VALUES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Return Values — Exit Codes, stdout Capture &amp; Nameref</h2>

<p>Bash functions return in three ways. Understanding the difference prevents one of the most common Bash bugs — trying to use <code>return</code> like a value when it only carries an integer exit code.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Three Ways to Return a Value From a Function</text>

  <!-- Exit code -->
  <rect x="12" y="36" width="250" height="130" rx="8" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="137" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">① Exit Code</text>
  <text x="137" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">return 0..255  →  $?</text>
  <text x="22" y="92" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">is_valid() {</text>
  <text x="22" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">  [[ $1 =~ ^[0-9]+$ ]]</text>
  <text x="22" y="124" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">}</text>
  <text x="22" y="140" font-family="'Courier New',monospace" font-size="10" fill="#3fb950">is_valid "42" && echo "ok"</text>
  <text x="137" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#3fb950">Use for: success/fail, boolean checks</text>

  <!-- stdout capture -->
  <rect x="284" y="36" width="252" height="130" rx="8" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="410" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">② stdout Capture</text>
  <text x="410" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">echo value  →  VAR=$(func)</text>
  <text x="294" y="92" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">get_date() {</text>
  <text x="294" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">  date '+%Y-%m-%d'</text>
  <text x="294" y="124" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">}</text>
  <text x="294" y="140" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">TODAY=$(get_date)</text>
  <text x="410" y="160" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#f85149">⚠ Creates subshell — vars inside not visible</text>

  <!-- nameref -->
  <rect x="557" y="36" width="250" height="130" rx="8" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="682" y="56" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">③ Nameref / global var</text>
  <text x="682" y="72" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">declare -n REF=$1  →  modify directly</text>
  <text x="567" y="92" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">get_info() {</text>
  <text x="567" y="108" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">  local -n _r="$1"</text>
  <text x="567" y="124" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">  _r="returned value"</text>
  <text x="567" y="140" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">}</text>
  <text x="567" y="156" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">get_info RESULT; echo $RESULT</text>
</svg>
</div>

<!-- CONSOLE 3 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 3 of 8 — Return Values: exit codes, stdout capture, nameref</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ METHOD 1: EXIT CODE (0=success, non-zero=failure) ═══════</span>
is_valid_date() {
    [[ $1 =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || return 1
    local YEAR="\${1:0:4}" MONTH="\${1:5:2}" DAY="\${1:8:2}"
    (( MONTH >= 1 && MONTH <= 12 )) || return 1
    (( DAY   >= 1 && DAY   <= 31 )) || return 1
    return 0
}

if is_valid_date "2024-01-15"; then
    echo "Valid date"
else
    echo "Invalid date"
fi

<span class="cb-cmt"># Chaining with && and ||:</span>
is_valid_date "2024-13-01" || { echo "Bad date" >&2; exit 1; }

<span class="cb-cmt">## ═══ return VS exit ═══════════════════════════════════════════</span>
<span class="cb-cmt"># return N — return from FUNCTION only (0-255)
# exit N   — exit the entire SCRIPT
# Without return — function's exit code = last command's exit code</span>

my_func() {
    grep -q "pattern" file.txt    <span class="cb-cmt"># if no return, this exit code propagates</span>
}
<span class="cb-cmt"># Cleaner to be explicit:</span>
my_func() {
    grep -q "pattern" file.txt && return 0 || return 1
}

<span class="cb-cmt">## ═══ METHOD 2: STDOUT CAPTURE — $() ══════════════════════════</span>
get_row_count() {
    local FILE="$1"
    wc -l < "$FILE"                <span class="cb-cmt"># prints to stdout</span>
}

COUNT=$(get_row_count data.csv)    <span class="cb-cmt"># $() captures stdout</span>
echo "Rows: $COUNT"

<span class="cb-cmt"># Capture multi-line output:</span>
list_large_files() {
    find /data -name "*.csv" -size +10M -printf "%f\n"
}
while IFS= read -r FILE; do
    echo "Large: $FILE"
done < <(list_large_files)         <span class="cb-cmt"># process substitution — no subshell</span>

<span class="cb-cmt"># CRITICAL: $() creates a subshell!
# Variables set INSIDE the $() call are NOT visible outside:</span>
bad_func() { RESULT="hello"; }     <span class="cb-cmt"># sets global RESULT</span>
X=$(bad_func)                      <span class="cb-cmt"># runs in subshell — RESULT lost!</span>
echo "$RESULT"                     <span class="cb-cmt"># empty</span>

<span class="cb-cmt">## ═══ METHOD 3: NAMEREF — modify caller's variable ═══════════</span>
<span class="cb-cmt"># Best for returning structured data without subshell</span>
get_file_stats() {
    local -n _result="$1"          <span class="cb-cmt"># _result is an alias for the var named in $1</span>
    local FILE="$2"
    _result[lines]=$(wc -l < "$FILE")
    _result[size]=$(stat -c %s "$FILE")
    _result[modified]=$(stat -c %Y "$FILE")
}

declare -A STATS
get_file_stats STATS "data.csv"
echo "Lines: \${STATS[lines]}, Size: \${STATS[size]}, Mtime: \${STATS[modified]}"

<span class="cb-cmt"># Simpler nameref for a scalar:</span>
get_hostname() {
    local -n _out="$1"
    _out=$(hostname -s)
}
get_hostname MY_HOST
echo "Host: $MY_HOST"             <span class="cb-cmt"># set by function, no subshell!</span>

<span class="cb-cmt">## ═══ COMBINING: exit code + stdout ══════════════════════════</span>
validate_and_count() {
    local FILE="$1"
    [[ -f $FILE ]] || { echo "0"; return 1; }
    [[ -s $FILE ]] || { echo "0"; return 2; }
    wc -l < "$FILE"               <span class="cb-cmt"># stdout: the count</span>
    return 0                      <span class="cb-cmt"># exit code: success</span>
}

if COUNT=$(validate_and_count "data.csv"); then
    echo "Valid file, $COUNT rows"
else
    echo "File invalid (exit $?)" >&2
fi
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 4 — SCOPE: local, global, subshell
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Variable Scope — <code>local</code>, Global &amp; Dynamic Scoping</h2>

<div class="diagram-wrap">
<svg viewBox="0 0 820 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="220" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Variable Scope — Bash Uses Dynamic Scoping</text>

  <!-- Script scope -->
  <rect x="15" y="34" width="790" height="176" rx="8" fill="#0a0e14" stroke="#30363d" stroke-width="1.5"/>
  <text x="34" y="54" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">Script scope: DB_HOST="prod-db"  (global)</text>

  <!-- Outer function -->
  <rect x="30" y="64" width="370" height="134" rx="7" fill="#161b22" stroke="#bc8cff" stroke-width="1.5"/>
  <text x="215" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">outer_func()</text>
  <text x="46" y="100" font-family="'Courier New',monospace" font-size="10" fill="#bc8cff">local X="outer"  ← local to outer_func</text>
  <text x="46" y="116" font-family="'Courier New',monospace" font-size="10" fill="#e6edf3">DB_HOST="staging"  ← modifies GLOBAL!</text>

  <!-- Inner function -->
  <rect x="46" y="124" width="338" height="62" rx="6" fill="#0e1824" stroke="#58a6ff" stroke-width="1"/>
  <text x="215" y="142" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">inner_func() — called from outer_func</text>
  <text x="62" y="160" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">echo $X       ← sees outer's local X!</text>
  <text x="62" y="176" font-family="'Courier New',monospace" font-size="10" fill="#58a6ff">echo $DB_HOST ← sees modified global</text>

  <!-- Explanation right -->
  <rect x="420" y="64" width="370" height="134" rx="7" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="605" y="84" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#e6edf3">Dynamic Scoping Rules</text>
  <text x="436" y="104" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">✅ Without local: modifies GLOBAL var</text>
  <text x="436" y="120" font-family="'Segoe UI',sans-serif" font-size="10" fill="#3fb950">✅ With local: isolated to this function</text>
  <text x="436" y="136" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">⚠ local vars ARE visible to child funcs</text>
  <text x="436" y="152" font-family="'Segoe UI',sans-serif" font-size="10" fill="#ffa657">⚠ (dynamic scope — not lexical scope)</text>
  <text x="436" y="172" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">Rule: ALWAYS use local for every</text>
  <text x="436" y="186" font-family="'Segoe UI',sans-serif" font-size="10" fill="#8b949e">variable in every function</text>
</svg>
</div>

<!-- CONSOLE 4 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 4 of 8 — Scope: local, readonly, declare, dynamic scope bug</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ local — FUNCTION-SCOPED VARIABLE ═══════════════════════</span>
ENVIRONMENT="production"           <span class="cb-cmt"># global</span>

setup_test() {
    local ENVIRONMENT="testing"    <span class="cb-cmt"># local — does NOT affect global</span>
    echo "Inside: $ENVIRONMENT"
}

setup_test
<span class="cb-out">Inside: testing</span>
echo "Outside: $ENVIRONMENT"
<span class="cb-out">Outside: production</span>    <span class="cb-cmt"># global unchanged</span>

<span class="cb-cmt">## ═══ WITHOUT local — MODIFIES GLOBAL ════════════════════════</span>
DB_HOST="prod-db"

configure() {
    DB_HOST="localhost"            <span class="cb-cmt"># NO local — modifies GLOBAL!</span>
    echo "Inside: $DB_HOST"
}

configure
echo "After: $DB_HOST"            <span class="cb-cmt"># changed!</span>
<span class="cb-out">Inside: localhost</span>
<span class="cb-out">After: localhost</span>        <span class="cb-cmt"># ← global was modified — bug!</span>

<span class="cb-cmt">## ═══ DYNAMIC SCOPE — THE HIDDEN DANGER ══════════════════════</span>
<span class="cb-cmt"># Bash uses DYNAMIC scope: local vars are visible to called functions</span>
outer() {
    local X="outer_value"
    inner                          <span class="cb-cmt"># inner is called from here</span>
}

inner() {
    echo "X in inner: $X"         <span class="cb-cmt"># sees outer's local X!</span>
}

outer
<span class="cb-out">X in inner: outer_value</span>   <span class="cb-cmt"># dynamic scope in action</span>
echo "X outside: $X"              <span class="cb-cmt"># empty — local only in outer</span>

<span class="cb-cmt"># Why this causes bugs:
# If outer() sets local DB_HOST="localhost" for testing,
# and then calls run_deployment() which reads $DB_HOST,
# run_deployment() gets "localhost" instead of the global "prod"!
# Solution: use local in EVERY function for EVERY variable</span>

<span class="cb-cmt">## ═══ local WITH ATTRIBUTES ══════════════════════════════════</span>
compute() {
    local -i COUNT=0              <span class="cb-cmt"># local integer</span>
    local -r MAX=100              <span class="cb-cmt"># local readonly</span>
    local -a ITEMS=()             <span class="cb-cmt"># local indexed array</span>
    local -A CONFIG=()            <span class="cb-cmt"># local associative array</span>
    local -l TAG                  <span class="cb-cmt"># local lowercase</span>
    local -u SEVERITY             <span class="cb-cmt"># local uppercase</span>

    COUNT=COUNT+5                 <span class="cb-cmt"># works — -i enables arithmetic assign</span>
    ITEMS+=("a" "b" "c")
    CONFIG[host]="localhost"
    TAG="PRODUCTION"              <span class="cb-cmt"># auto-lowercased → "production"</span>
    SEVERITY="warn"               <span class="cb-cmt"># auto-uppercased → "WARN"</span>
    echo "$COUNT \${ITEMS[@]} \${CONFIG[host]} $TAG $SEVERITY"
}
compute
<span class="cb-out">5 a b c localhost production WARN</span>

<span class="cb-cmt">## ═══ SUBSHELL FUNCTIONS — COMPLETE ISOLATION ════════════════</span>
<span class="cb-cmt"># Run function in a subshell using ( ):</span>
(
    GLOBAL_VAR="modified in subshell"
    setup_env
)
echo "$GLOBAL_VAR"    <span class="cb-cmt"># unchanged — subshell is isolated</span>

<span class="cb-cmt"># Useful for: temporary dir change, env changes, isolation:</span>
(
    cd /tmp
    TMPFILE=$(mktemp)
    process_data > "$TMPFILE"
    upload "$TMPFILE"
)
<span class="cb-cmt"># After: still in original directory, TMPFILE not in scope</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 5 — RECURSION
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Recursion — Functions That Call Themselves</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 5 of 8 — Recursion: Directory Trees, Factorial, Mutual</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ BASIC RECURSION ═════════════════════════════════════════</span>
factorial() {
    local N="$1"
    (( N <= 1 )) && { echo 1; return; }
    local PREV
    PREV=$(factorial $(( N - 1 )))
    echo $(( N * PREV ))
}
factorial 5
<span class="cb-out">120</span>

<span class="cb-cmt">## ═══ PRACTICAL: RECURSIVE DIRECTORY WALK ════════════════════</span>
walk_dir() {
    local DIR="$1"
    local DEPTH="\${2:-0}"
    local INDENT
    INDENT=$(printf '%*s' $(( DEPTH * 2 )) '')

    for ITEM in "$DIR"/*/; do
        [[ -d $ITEM ]] || continue
        printf "%s📁 %s\n" "$INDENT" "$(basename "$ITEM")"
        walk_dir "$ITEM" $(( DEPTH + 1 ))
    done
    for ITEM in "$DIR"/*; do
        [[ -f $ITEM ]] || continue
        printf "%s  📄 %s\n" "$INDENT" "$(basename "$ITEM")"
    done
}
walk_dir /data
<span class="cb-out">📁 raw</span>
<span class="cb-out">  📁 2024</span>
<span class="cb-out">    📄 jan.csv</span>
<span class="cb-out">    📄 feb.csv</span>
<span class="cb-out">📁 processed</span>

<span class="cb-cmt">## ═══ RECURSION WITH ACCUMULATOR ══════════════════════════════</span>
<span class="cb-cmt"># Count all files recursively — accumulator pattern</span>
count_files() {
    local DIR="$1"
    local -n _TOTAL="$2"           <span class="cb-cmt"># nameref to caller's counter</span>
    for ITEM in "$DIR"/*; do
        if [[ -f $ITEM ]]; then
            (( _TOTAL++ ))
        elif [[ -d $ITEM ]]; then
            count_files "$ITEM" "$2"   <span class="cb-cmt"># recurse — pass same nameref name</span>
        fi
    done
}
TOTAL=0
count_files /data TOTAL
echo "Total files: $TOTAL"

<span class="cb-cmt">## ═══ MUTUAL RECURSION ════════════════════════════════════════</span>
is_even() {
    (( $1 == 0 )) && return 0
    is_odd $(( $1 - 1 ))
}
is_odd() {
    (( $1 == 0 )) && return 1
    is_even $(( $1 - 1 ))
}
is_even 4 && echo "4 is even"
is_odd  7 && echo "7 is odd"

<span class="cb-cmt">## ═══ RECURSION DEPTH — BASH LIMITATION ══════════════════════</span>
<span class="cb-cmt"># Bash limits recursion via FUNCNEST (default: no limit, but stack is ~8MB)
# Deep recursion will cause "maximum recursion depth exceeded" or segfault
# Typical practical limit: ~1000-2000 levels
# For deep trees: use iterative approach with an explicit stack array</span>

<span class="cb-cmt"># Iterative directory walk (no recursion depth limit):</span>
walk_iterative() {
    local -a STACK=("$1")
    while (( \${#STACK[@]} > 0 )); do
        local DIR="\${STACK[-1]}"
        unset 'STACK[-1]'          <span class="cb-cmt"># pop from stack</span>
        for ITEM in "$DIR"/*; do
            [[ -f $ITEM ]] && echo "FILE: $ITEM"
            [[ -d $ITEM ]] && STACK+=("$ITEM")   <span class="cb-cmt"># push subdirs</span>
        done
    done
}
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 6 — FUNCTION LIBRARIES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Function Libraries — <code>source</code>, Namespacing &amp; Shared Code</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 6 of 8 — Libraries: source, ., guard pattern, namespacing</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ CREATING A LIBRARY FILE ════════════════════════════════</span>
<span class="cb-cmt"># /lib/logging.sh — a reusable logging library</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out"># Guard against double-sourcing:</span>
<span class="cb-out">[[ -n \${_LIB_LOGGING_LOADED:-} ]] && return 0</span>
<span class="cb-out">readonly _LIB_LOGGING_LOADED=1</span>
<span class="cb-out"></span>
<span class="cb-out">LOG_LEVEL="\${LOG_LEVEL:-INFO}"</span>
<span class="cb-out">LOG_FILE="\${LOG_FILE:-/dev/stderr}"</span>
<span class="cb-out"></span>
<span class="cb-out">_log() {</span>
<span class="cb-out">    local LEVEL="$1"; shift</span>
<span class="cb-out">    printf "[%s] %s %s\n" "$LEVEL" "$(date '+%T')" "$*" >> "$LOG_FILE"</span>
<span class="cb-out">}</span>
<span class="cb-out">log_info()  { [[ $LOG_LEVEL =~ ^(DEBUG|INFO)$ ]] && _log INFO  "$@"; }</span>
<span class="cb-out">log_warn()  { [[ $LOG_LEVEL =~ ^(DEBUG|INFO|WARN)$ ]] && _log WARN  "$@" >&2; }</span>
<span class="cb-out">log_error() { _log ERROR "$@" >&2; }</span>
<span class="cb-out">log_debug() { [[ $LOG_LEVEL == DEBUG ]] && _log DEBUG "$@"; }</span>

<span class="cb-cmt">## ═══ SOURCING A LIBRARY ════════════════════════════════════</span>
<span class="cb-cmt"># In your script — two equivalent ways:</span>
source /lib/logging.sh      <span class="cb-cmt"># bash-specific keyword</span>
. /lib/logging.sh           <span class="cb-cmt"># POSIX — same thing</span>

<span class="cb-cmt"># Source relative to script location (robust):</span>
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
source "\${SCRIPT_DIR}/../lib/logging.sh"
source "\${SCRIPT_DIR}/../lib/db.sh"
source "\${SCRIPT_DIR}/../lib/utils.sh"

<span class="cb-cmt"># Now use the functions:</span>
log_info "Pipeline started"
log_error "Connection failed"

<span class="cb-cmt">## ═══ GUARD AGAINST DOUBLE-SOURCING ═══════════════════════</span>
<span class="cb-cmt"># Problem: if file_a.sh and file_b.sh both source logging.sh,
# and main.sh sources both, logging.sh gets loaded twice.
# Solution — guard pattern at top of every library:</span>
[[ -n \${_LIB_MYLIB_LOADED:-} ]] && return 0
readonly _LIB_MYLIB_LOADED=1
<span class="cb-cmt"># Rest of library code here</span>

<span class="cb-cmt">## ═══ NAMESPACING FUNCTIONS ════════════════════════════════</span>
<span class="cb-cmt"># Prefix function names with module name to avoid collisions</span>

<span class="cb-cmt"># db.sh:</span>
db::connect()   { local HOST="$1"; psql -h "$HOST" -d analytics; }
db::query()     { local SQL="$1";  psql -d analytics -c "$SQL"; }
db::load_csv()  { local FILE="$1"; psql -d analytics -c "COPY t FROM '$FILE' CSV"; }

<span class="cb-cmt"># s3.sh:</span>
s3::upload()    { aws s3 cp "$1" "$2"; }
s3::download()  { aws s3 cp "$1" "$2"; }
s3::list()      { aws s3 ls "$1"; }

<span class="cb-cmt"># utils.sh:</span>
utils::timestamp() { date '+%Y%m%d_%H%M%S'; }
utils::human_size() { numfmt --to=iec "$1"; }
utils::retry()  { local MAX="$1"; shift; until "$@"; do (( --MAX > 0 )) || return 1; sleep 2; done; }

<span class="cb-cmt">## ═══ EXPORTING FUNCTIONS ══════════════════════════════════</span>
<span class="cb-cmt"># export -f makes function available to child bash processes</span>
log_info() { echo "[INFO] $*"; }
export -f log_info

bash -c 'log_info "visible in child"'   <span class="cb-cmt"># works!</span>
<span class="cb-out">[INFO] visible in child</span>

<span class="cb-cmt"># Used with xargs (which runs bash per item):</span>
process_file() {
    local FILE="$1"
    echo "Processing: $FILE"
}
export -f process_file
find /data -name "*.csv" | xargs -P 4 -I{} bash -c 'process_file "$@"' _ {}

<span class="cb-cmt">## ═══ COMPLETE LIBRARY TEMPLATE ═══════════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out"># lib/pipeline.sh — Pipeline utility functions</span>
<span class="cb-out">[[ -n \${_LIB_PIPELINE:-} ]] && return 0; readonly _LIB_PIPELINE=1</span>
<span class="cb-out"></span>
<span class="cb-out">pipeline::validate_input() {</span>
<span class="cb-out">    local FILE="\${1:?validate_input: FILE required}"</span>
<span class="cb-out">    [[ -f $FILE ]] || { echo "Not found: $FILE" >&2; return 1; }</span>
<span class="cb-out">    [[ -s $FILE ]] || { echo "Empty: $FILE"     >&2; return 2; }</span>
<span class="cb-out">    [[ -r $FILE ]] || { echo "No read: $FILE"   >&2; return 3; }</span>
<span class="cb-out">}</span>
<span class="cb-out"></span>
<span class="cb-out">pipeline::run_step() {</span>
<span class="cb-out">    local STEP="$1"; shift</span>
<span class="cb-out">    echo "[$(date '+%T')] Starting: $STEP"</span>
<span class="cb-out">    if "$@"; then</span>
<span class="cb-out">        echo "[$(date '+%T')] Done: $STEP"</span>
<span class="cb-out">    else</span>
<span class="cb-out">        echo "[$(date '+%T')] FAILED: $STEP (exit $?)" >&2</span>
<span class="cb-out">        return 1</span>
<span class="cb-out">    fi</span>
<span class="cb-out">}</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 7 — KEY BUILTINS: type, command, declare
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Key Builtins — <code>type</code>, <code>command</code>, <code>declare</code>, <code>enable</code></h2>

<p>Builtins are commands executed directly by bash — no fork, no exec. They are faster than external programs and can affect the current shell's state (which external commands cannot). Knowing which commands are builtins and which are external is important for performance and debugging.</p>

<div class="diagram-wrap">
<svg viewBox="0 0 820 180" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:820px;display:block;margin:0 auto 16px;">
  <rect width="820" height="180" fill="#0d1117" rx="10"/>
  <text x="410" y="22" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="12" font-weight="bold" fill="#8b949e">Command Resolution Order — What Bash Checks First</text>

  <!-- boxes left to right -->
  <rect x="12"  y="38" width="148" height="120" rx="7" fill="#2a1a1a" stroke="#f85149" stroke-width="2"/>
  <text x="86" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#f85149">① Alias</text>
  <text x="86" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">alias ll='ls -la'</text>
  <text x="86" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Expanded first</text>
  <text x="86" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Only in interactive</text>
  <text x="86" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">shells by default</text>
  <text x="86" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#f85149">checked 1st</text>

  <rect x="170" y="38" width="148" height="120" rx="7" fill="#1a1a3a" stroke="#bc8cff" stroke-width="2"/>
  <text x="244" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#bc8cff">② Function</text>
  <text x="244" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">greet() { ... }</text>
  <text x="244" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">No fork needed</text>
  <text x="244" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Same shell process</text>
  <text x="244" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Can modify shell</text>
  <text x="244" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#bc8cff">checked 2nd</text>

  <rect x="328" y="38" width="148" height="120" rx="7" fill="#1a2a1a" stroke="#3fb950" stroke-width="2"/>
  <text x="402" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#3fb950">③ Builtin</text>
  <text x="402" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">echo cd pwd ...</text>
  <text x="402" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Compiled into bash</text>
  <text x="402" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">No fork, very fast</text>
  <text x="402" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Can change shell state</text>
  <text x="402" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#3fb950">checked 3rd</text>

  <rect x="486" y="38" width="148" height="120" rx="7" fill="#0e1824" stroke="#58a6ff" stroke-width="2"/>
  <text x="560" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#58a6ff">④ External</text>
  <text x="560" y="76" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">/usr/bin/python3</text>
  <text x="560" y="94" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Searched in $PATH</text>
  <text x="560" y="110" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">fork() + exec()</text>
  <text x="560" y="126" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">Separate process</text>
  <text x="560" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#58a6ff">checked 4th</text>

  <rect x="644" y="38" width="162" height="120" rx="7" fill="#1f2027" stroke="#8b949e" stroke-width="1.5"/>
  <text x="725" y="58" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="11" font-weight="bold" fill="#8b949e">⑤ Not found</text>
  <text x="725" y="78" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">command_not_found</text>
  <text x="725" y="96" text-anchor="middle" font-family="'Courier New',monospace" font-size="9" fill="#e6edf3">_handler hook</text>
  <text x="725" y="114" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="9" fill="#8b949e">or: error message</text>
  <text x="725" y="148" text-anchor="middle" font-family="'Segoe UI',sans-serif" font-size="8" fill="#8b949e">final fallback</text>
</svg>
</div>

<!-- CONSOLE 7 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 7 of 8 — type, command, enable, help, All Key Builtins</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ type — WHAT IS THIS COMMAND? ════════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> echo
<span class="cb-out">echo is a shell builtin</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> ls
<span class="cb-out">ls is aliased to 'ls --color=auto'</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> python3
<span class="cb-out">python3 is /usr/bin/python3</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> greet
<span class="cb-out">greet is a function</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> <span class="cb-flag">-a</span> echo        <span class="cb-cmt"># -a: show ALL matches (builtin + external)</span>
<span class="cb-out">echo is a shell builtin</span>
<span class="cb-out">echo is /usr/bin/echo</span>

<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> <span class="cb-flag">-t</span> echo        <span class="cb-cmt"># -t: just the type word</span>
<span class="cb-out">builtin</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> <span class="cb-flag">-t</span> greet
<span class="cb-out">function</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">type</span> <span class="cb-flag">-t</span> python3
<span class="cb-out">file</span>

<span class="cb-cmt">## ═══ command — BYPASS FUNCTIONS/ALIASES ═════════════════════</span>
<span class="cb-cmt"># command runs the external version, skipping alias/function:</span>
echo() { echo "INTERCEPTED: $*"; }  <span class="cb-cmt"># override builtin</span>
echo "hello"
<span class="cb-out">INTERCEPTED: hello</span>
command echo "hello"               <span class="cb-cmt"># bypass function, use builtin</span>
<span class="cb-out">hello</span>

<span class="cb-cmt"># command -v: check if command exists (returns path or name):</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">command</span> <span class="cb-flag">-v</span> python3
<span class="cb-out">/usr/bin/python3</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">command</span> <span class="cb-flag">-v</span> notexist
<span class="cb-out"></span>         <span class="cb-cmt"># empty + exit 1 if not found</span>

<span class="cb-cmt"># Best way to check if a tool is available:</span>
command -v jq    &>/dev/null || { echo "jq required" >&2; exit 1; }
command -v aws   &>/dev/null || { echo "aws cli required" >&2; exit 1; }
command -v psql  &>/dev/null || { echo "psql required" >&2; exit 1; }

<span class="cb-cmt"># command -p: use default PATH (ignore custom PATH):</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">command</span> <span class="cb-flag">-p</span> ls       <span class="cb-cmt"># guaranteed to find system ls</span>

<span class="cb-cmt">## ═══ enable — ENABLE/DISABLE BUILTINS ═══════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">enable</span>              <span class="cb-cmt"># list all enabled builtins</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">enable</span> <span class="cb-flag">-n</span> echo     <span class="cb-cmt"># disable echo builtin → external /bin/echo used</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">enable</span> echo         <span class="cb-cmt"># re-enable</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">enable</span> <span class="cb-flag">-a</span>          <span class="cb-cmt"># enable all builtins</span>

<span class="cb-cmt">## ═══ help — BUILTIN DOCUMENTATION ═══════════════════════════</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">help</span>               <span class="cb-cmt"># list all builtins with brief description</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">help</span> read          <span class="cb-cmt"># full help for read builtin</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">help</span> declare        <span class="cb-cmt"># full help for declare</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">help</span> <span class="cb-flag">-d</span> read       <span class="cb-cmt"># -d: one-line description only</span>
<span class="cb-prompt">$</span> <span class="cb-cmd">help</span> <span class="cb-flag">-m</span> echo       <span class="cb-cmt"># -m: man page style output</span>

<span class="cb-cmt">## ═══ COMPLETE BUILTIN REFERENCE ═════════════════════════════</span>
<span class="cb-cmt"># I/O builtins:
#   echo    print with optional newline and escapes
#   printf  formatted print (C-style format strings)
#   read    read from stdin into variables
#   mapfile/readarray  read lines into array

# Variable builtins:
#   declare/typeset  set variable attributes and values
#   local           declare function-local variables
#   readonly        make variables read-only
#   export          mark for environment export
#   unset           delete variable or function

# Flow control:
#   if/then/elif/else/fi
#   for/while/until/do/done
#   case/in/esac
#   break/continue  loop control
#   return          exit function with code
#   exit            exit shell with code
#   true / false    return 0 / 1

# Process/job:
#   exec    replace shell with command (no fork)
#   source/.  run file in current shell
#   eval    build and run a command from string
#   trap    set signal handlers

# Information:
#   type    show what a name resolves to
#   command run command bypassing alias/function
#   enable  enable/disable builtins
#   help    show builtin documentation
#   hash    remember path to external commands

# Shell state:
#   set     set shell options and positional params
#   shopt   set/unset bash-specific options
#   cd      change directory
#   pwd     print working directory
#   alias   create/list command aliases
#   bind    bind key sequences (readline)
#   history manage command history

# Job control:
#   jobs    list background jobs
#   bg      resume job in background
#   fg      bring job to foreground
#   wait    wait for background jobs
#   kill    send signal to process/job
#   disown  remove job from job table</span>
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 8 — eval, exec, source
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> The Power Builtins — <code>eval</code>, <code>exec</code> &amp; <code>source</code></h2>

<!-- CONSOLE 8 -->
<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Console 8 of 8 — eval, exec, source: Power, Danger &amp; Patterns</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ eval — BUILD AND RUN A COMMAND AT RUNTIME ═════════════</span>
<span class="cb-cmt"># eval takes a string and executes it as a bash command
# Two rounds of parsing: string is expanded THEN executed</span>

<span class="cb-cmt"># Build a command dynamically:</span>
CMD="ls -la /data"
eval "$CMD"                    <span class="cb-cmt"># runs: ls -la /data</span>

<span class="cb-cmt"># Dynamic variable names (before bash 4.3 nameref existed):</span>
ENV="prod"
VARNAME="DB_HOST_\${ENV^^}"     <span class="cb-cmt"># DB_HOST_PROD</span>
eval "\${VARNAME}='prod-db.internal'"
echo "$DB_HOST_PROD"
<span class="cb-out">prod-db.internal</span>
<span class="cb-cmt"># Modern alternative — use nameref instead of eval:</span>
declare -n _ref="$VARNAME"
_ref="prod-db.internal"

<span class="cb-cmt"># Set multiple variables from a string:</span>
CONFIG_STRING="HOST=prod PORT=5432 DB=analytics"
eval "$CONFIG_STRING"          <span class="cb-cmt"># sets HOST, PORT, DB</span>
echo "$HOST $PORT $DB"
<span class="cb-out">prod 5432 analytics</span>

<span class="cb-cmt">## ═══ eval DANGERS — NEVER WITH UNTRUSTED INPUT ═══════════</span>
<span class="cb-cmt"># If USER_INPUT contains: "foo; rm -rf /"
# eval "$USER_INPUT" would execute the rm!</span>
USER_INPUT="$(read from network or user)"
eval "$USER_INPUT"             <span class="cb-cmt"># ❌ DANGEROUS — code injection!</span>

<span class="cb-cmt"># Safe alternative — use arrays and proper quoting:</span>
CMD_ARRAY=("ls" "-la" "$DIR")  <span class="cb-cmt"># ✅ no eval needed</span>
"\${CMD_ARRAY[@]}"

<span class="cb-cmt">## ═══ exec — REPLACE SHELL WITH A COMMAND ════════════════</span>
<span class="cb-cmt"># exec with a command: replaces the current shell process
# No fork — the bash process becomes the new command
# Nothing after exec runs (shell is gone)</span>

exec python3 pipeline.py       <span class="cb-cmt"># shell becomes python3 — no return</span>
echo "this never runs"         <span class="cb-cmt"># ← never reached</span>

<span class="cb-cmt"># Use exec for: launcher scripts, jail/chroot setup</span>
<span class="cb-cmt"># Typical pattern in wrapper scripts:</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out">export PYTHONPATH="/opt/myapp/lib"</span>
<span class="cb-out">export DB_HOST="prod-db.internal"</span>
<span class="cb-out">exec python3 /opt/myapp/main.py "$@"</span>
<span class="cb-cmt"># Clean: sets env, then becomes python — no extra bash process</span>

<span class="cb-cmt">## ═══ exec WITHOUT COMMAND — REDIRECT CURRENT SHELL ══════</span>
<span class="cb-cmt"># exec with just redirections: changes FDs for current shell</span>
exec > >(tee -a pipeline.log) 2>&1   <span class="cb-cmt"># all output → terminal + log</span>
echo "This goes to terminal AND pipeline.log"

exec 3> myfile.txt             <span class="cb-cmt"># open fd 3 for writing</span>
echo "to fd 3" >&3
exec 3>&-                      <span class="cb-cmt"># close fd 3</span>

<span class="cb-cmt">## ═══ source / . — RUN FILE IN CURRENT SHELL ════════════</span>
<span class="cb-cmt"># source runs a file's commands inside the CURRENT shell
# Functions, variables, and changes persist after sourcing</span>

source config.sh               <span class="cb-cmt"># load config into current shell</span>
. config.sh                    <span class="cb-cmt"># POSIX equivalent</span>

<span class="cb-cmt"># Source with arguments — $1, $2 etc set inside sourced file:</span>
source setup.sh "prod" "2024-01-15"
<span class="cb-cmt"># Inside setup.sh: $1="prod" $2="2024-01-15"</span>

<span class="cb-cmt"># Use source for: loading functions, config, virtual envs:</span>
source /opt/myapp/venv/bin/activate   <span class="cb-cmt"># activate Python venv</span>
source ~/.bashrc                       <span class="cb-cmt"># reload shell config</span>

<span class="cb-cmt"># source vs executing directly:
# ./script.sh  — runs in a child shell (fork+exec)
#                changes don't affect parent
# source script.sh — runs in CURRENT shell
#                    changes DO affect current shell
# Use source when script sets variables/functions you need</span>

<span class="cb-cmt">## ═══ mapfile / readarray ════════════════════════════════</span>
<span class="cb-cmt"># mapfile (alias: readarray) reads stdin lines into array</span>
mapfile -t LINES < data.csv         <span class="cb-cmt"># -t: strip trailing newlines</span>
echo "Lines: \${#LINES[@]}"
echo "Line 1: \${LINES[0]}"

mapfile -t SERVERS < servers.txt    <span class="cb-cmt"># server list into array</span>
mapfile -t -n 10 FIRST10 < big.csv <span class="cb-cmt"># -n: read only first 10</span>
mapfile -t -s 1 NOHEADER < data.csv <span class="cb-cmt"># -s 1: skip first line</span>

<span class="cb-cmt"># From command output:</span>
mapfile -t ACTIVE_USERS < <(who | awk '{print $1}' | sort -u)
for USER in "\${ACTIVE_USERS[@]}"; do echo "Active: $USER"; done
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 9 — KERNEL DEEP DIVE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Kernel Deep Dive — Functions vs Builtins vs External Commands</h2>

<div class="deepdive-box">
<div class="deepdive-title">⚙️ How Bash Executes Functions, Builtins &amp; External Commands at OS Level</div>
<pre style="margin:0;padding:16px;font-family:monospace;font-size:12px;color:#e6edf3;background:#010409;border-radius:0 0 8px 8px;overflow-x:auto;">
# EXECUTION MODEL — THREE COMPLETELY DIFFERENT MECHANISMS

1. BASH FUNCTIONS — No syscall, same process, same PID
   greet() { echo "hello"; }
   greet       ← bash looks up function in its internal table
               ← pushes a new call frame onto the function call stack
               ← executes the body directly in the current process
               ← pops the call frame when done
   
   Measured overhead: ~0.001ms per call (no kernel involvement)
   PID: same as the calling script
   Variables: shared with caller (unless local used)
   Shell state: fully shared (can change current dir, set vars, etc.)

2. BUILTINS — Handled inside bash, one syscall at most
   echo "hello"  ← bash checks: is this a builtin? YES
                 ← calls its internal C function: bash_echo()
                 ← write(STDOUT_FILENO, "hello\n", 6)  ← one syscall
   
   cd /data      ← calls chdir("/data")  ← one syscall
   read VAR      ← calls read(STDIN_FILENO, buf, n)
   
   NO fork(), NO exec(), NO waitpid()
   Builtins that MUST be builtins (can't be external):
   - cd    (changes current dir of THIS process)
   - source/. (reads into THIS shell)
   - export/unset (modify THIS shell's env)
   - exec  (replaces THIS process)
   - exit  (exits THIS process)
   - return (returns from THIS function)
   - set/shopt (modify THIS shell's options)

3. EXTERNAL COMMANDS — Full fork+exec+wait sequence
   python3 script.py:
   
   Step 1: bash calls fork()
           → kernel creates exact copy of bash process
           → child gets same memory, same FDs, same env
           → cost: copy-on-write page table duplication
   
   Step 2: child calls execve("/usr/bin/python3",
                              ["python3", "script.py", NULL],
                              environ)
           → kernel replaces child's code/data with python3
           → kernel sets up stack, heap for python3
           → $PATH lookup already done by bash
   
   Step 3: parent bash calls waitpid(child_pid, &status, 0)
           → parent BLOCKS until child exits
           → child's exit code stored in status
           → bash sets $? = WEXITSTATUS(status)
   
   Total cost: 1-5ms per invocation (even for simple commands)
   For loops with 1000 files: 1-5 seconds of pure overhead

4. EXEC — replaces current process
   exec python3 main.py:
   → bash calls execve("/usr/bin/python3", ..., environ)
   → NO fork() — bash process IS replaced
   → bash is gone — its PID is now python3's PID
   → All bash's open file descriptors are inherited by python3
   → bash's shell variables are NOT passed (only exported env vars)

5. FUNCTION EXPORT — export -f
   export -f my_func
   → bash stores function definition in environment:
     BASH_FUNC_my_func%%=() { ... }
   → When a child bash process starts, it reads this env var
   → It defines the function in its own function table
   → The child can now call my_func as if it defined it locally
   
   Used in: xargs -P bash -c 'func "$@"', GNU parallel

6. FUNCNEST — recursion depth limit
   FUNCNEST variable controls max function call nesting
   Default: not set (unlimited, but stack size limits it ~2000)
   $ FUNCNEST=50  # limit recursion to 50 levels
   Deep recursion → stack overflow → bash: maximum function call
   nesting depth exceeded error

7. FUNCTION CALL STACK — \${FUNCNAME[@]}
   $ inside_func() { echo "\${FUNCNAME[@]}"; }
   $ middle() { inside_func; }
   $ outer() { middle; }
   $ outer
   inside_func middle outer main  ← call stack
   \${BASH_LINENO[@]}  ← line numbers of each call
   \${BASH_SOURCE[@]}  ← source files of each call
</pre>
</div>

<div class="two-col-grid" style="margin-top:20px;">
  <div class="callout-box info-box">
    <strong>🔬 Measure fork() overhead yourself:</strong>
    <pre style="margin:6px 0 0;font-family:monospace;font-size:12px;background:transparent;border:none;padding:0;color:#e6edf3;"># External: 1000 calls to /bin/true
time for i in {1..1000}; do /bin/true; done
# ~2-3 seconds (fork+exec overhead)

# Builtin: 1000 calls to bash true
time for i in {1..1000}; do true; done
# ~0.01 seconds (no fork!)</pre>
  </div>
  <div class="callout-box info-box">
    <strong>📊 Inspect the function call stack:</strong>
    <pre style="margin:6px 0 0;font-family:monospace;font-size:12px;background:transparent;border:none;padding:0;color:#e6edf3;">debug_stack() {
  local i
  for (( i=\${#FUNCNAME[@]}-1; i>=0; i-- )); do
    printf "%*s%s() line %s\n" \
      $(( (\${#FUNCNAME[@]}-1-i)*2 )) "" \
      "\${FUNCNAME[$i]}" "\${BASH_LINENO[$i]}"
  done
}</pre>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 10 — REAL-WORLD PATTERNS
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Real-World Patterns — Production Function Design</h2>

<div class="console-block">
<div class="console-header"><span class="cb-dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></span><span class="cb-title">Production Function Patterns for Data Engineering</span></div>
<div class="console-body"><pre>
<span class="cb-cmt">## ═══ PATTERN 1: COMPLETE LOGGING LIBRARY ═════════════════════</span>
<span class="cb-out">#!/usr/bin/env bash</span>
<span class="cb-out"># lib/log.sh</span>
<span class="cb-out">[[ -n \${_LOG_LIB:-} ]] && return; readonly _LOG_LIB=1</span>
<span class="cb-out"></span>
<span class="cb-out">declare -g LOG_LEVEL="\${LOG_LEVEL:-INFO}"</span>
<span class="cb-out">declare -g LOG_FILE="\${LOG_FILE:-}"</span>
<span class="cb-out">declare -A _LOG_LEVELS=([DEBUG]=0 [INFO]=1 [WARN]=2 [ERROR]=3)</span>
<span class="cb-out"></span>
<span class="cb-out">_log() {</span>
<span class="cb-out">    local LEVEL="$1"; shift</span>
<span class="cb-out">    local LEVEL_NUM="\${_LOG_LEVELS[$LEVEL]:-1}"</span>
<span class="cb-out">    local CUR_NUM="\${_LOG_LEVELS[$LOG_LEVEL]:-1}"</span>
<span class="cb-out">    (( LEVEL_NUM < CUR_NUM )) && return 0   # below threshold</span>
<span class="cb-out">    local MSG="[$(date '+%Y-%m-%d %T')] [$LEVEL] \${FUNCNAME[2]}: $*"</span>
<span class="cb-out">    if [[ -n $LOG_FILE ]]; then</span>
<span class="cb-out">        echo "$MSG" | tee -a "$LOG_FILE" >&2</span>
<span class="cb-out">    else</span>
<span class="cb-out">        echo "$MSG" >&2</span>
<span class="cb-out">    fi</span>
<span class="cb-out">}</span>
<span class="cb-out">log::debug() { _log DEBUG "$@"; }</span>
<span class="cb-out">log::info()  { _log INFO  "$@"; }</span>
<span class="cb-out">log::warn()  { _log WARN  "$@"; }</span>
<span class="cb-out">log::error() { _log ERROR "$@"; }</span>
<span class="cb-out">log::fatal() { _log ERROR "$@"; exit 1; }</span>

<span class="cb-cmt">## ═══ PATTERN 2: SELF-DOCUMENTING FUNCTION (usage in docstring)</span>
load_csv() {
    <span class="cb-cmt">## Usage: load_csv FILE TABLE [BATCH] [--truncate]
    ## Load a CSV file into a database table.
    ## Args:
    ##   FILE      Path to CSV file (required)
    ##   TABLE     Target table name (required)
    ##   BATCH     Rows per batch (default: 1000)
    ##   --truncate  Truncate table before loading</span>
    local FILE="\${1:?load_csv: FILE required}"
    local TABLE="\${2:?load_csv: TABLE required}"
    local BATCH="\${3:-1000}"
    local TRUNCATE=false
    [[ "\${4:-}" == "--truncate" ]] && TRUNCATE=true

    log::info "Loading $FILE → $TABLE (batch=$BATCH truncate=$TRUNCATE)"
    [[ -f $FILE && -s $FILE ]] || { log::error "Invalid file: $FILE"; return 1; }
    $TRUNCATE && psql -d analytics -c "TRUNCATE $TABLE"
    python3 -c "
import csv, psycopg2
conn = psycopg2.connect(host='$DB_HOST', dbname='analytics')
# ... batch loading logic
"
    log::info "Load complete: $TABLE"
}

<span class="cb-cmt">## ═══ PATTERN 3: RETRY WITH BACKOFF (reusable) ════════════════</span>
retry() {
    local MAX="\${1:-3}"; shift
    local DELAY="\${1:-5}"; shift
    local -i attempt=0

    until "$@"; do
        (( ++attempt >= MAX )) && {
            log::error "All $MAX attempts failed: $*"
            return 1
        }
        local SLEEP=$(( DELAY * (2 ** (attempt - 1)) ))
        log::warn "Attempt $attempt/$MAX failed, retry in \${SLEEP}s"
        sleep "$SLEEP"
    done
    (( attempt > 0 )) && log::info "Succeeded after $((attempt+1)) attempts"
    return 0
}
retry 3 5 psql -d analytics -f migration.sql
retry 5 2 python3 fragile_loader.py

<span class="cb-cmt">## ═══ PATTERN 4: FUNCTION AS MIDDLEWARE ═══════════════════════</span>
<span class="cb-cmt"># Wrap any command with timing, logging, error handling</span>
timed_step() {
    local NAME="$1"; shift
    local START=$SECONDS
    log::info "START: $NAME"
    if "$@"; then
        log::info "DONE:  $NAME ($((SECONDS - START))s)"
        return 0
    else
        local CODE=$?
        log::error "FAIL:  $NAME after $((SECONDS - START))s (exit $CODE)"
        return $CODE
    fi
}
timed_step "Extract"   python3 extract.py
timed_step "Transform" python3 transform.py
timed_step "Load"      python3 load.py

<span class="cb-cmt">## ═══ PATTERN 5: ARGUMENT PARSING FUNCTION ════════════════════</span>
parse_args() {
    local -n _cfg="$1"; shift    <span class="cb-cmt"># nameref to caller's config array</span>
    local OPTIND=1

    while getopts "e:d:j:vhn" OPT; do
        case $OPT in
            e) _cfg[env]="$OPTARG" ;;
            d) _cfg[date]="$OPTARG" ;;
            j) _cfg[jobs]="$OPTARG" ;;
            v) _cfg[verbose]=true ;;
            n) _cfg[dry_run]=true ;;
            h) show_help; exit 0 ;;
            *) log::error "Unknown option: $OPT"; return 1 ;;
        esac
    done
    shift $(( OPTIND - 1 ))
    _cfg[files]="$*"             <span class="cb-cmt"># remaining positional args</span>
}

declare -A CFG=([env]=dev [jobs]=4 [verbose]=false [dry_run]=false)
parse_args CFG "$@"
log::info "Running in \${CFG[env]} with \${CFG[jobs]} workers"
</pre></div></div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 11 — COMPLETE REFERENCE
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Complete Reference — Functions &amp; Key Builtins</h2>

<div class="table-wrap">
<table class="ref-table">
<thead><tr><th style="width:28%">Syntax / Builtin</th><th>What It Does</th><th style="width:28%">Key Detail</th></tr></thead>
<tbody>
<tr><td colspan="3" style="background:#1a1a3a;color:#bc8cff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Function Definition &amp; Management</td></tr>
<tr><td style="font-family:monospace;">name() { cmds; }</td><td>Define function (preferred form)</td><td>Stored in bash's function table</td></tr>
<tr><td style="font-family:monospace;">function name { cmds; }</td><td>Alternate syntax</td><td>Same as name() — keyword optional</td></tr>
<tr><td style="font-family:monospace;">declare -f name</td><td>Print function source</td><td>Show exactly what's stored</td></tr>
<tr><td style="font-family:monospace;">declare -F</td><td>List all function names</td><td>Without source code</td></tr>
<tr><td style="font-family:monospace;">unset -f name</td><td>Delete a function</td><td>Must use -f to distinguish from variable</td></tr>
<tr><td style="font-family:monospace;">export -f name</td><td>Export to child bash processes</td><td>Stored as BASH_FUNC_name%% env var</td></tr>
<tr><td colspan="3" style="background:#1a2a1a;color:#3fb950;font-family:'Segoe UI',sans-serif;font-weight:bold;">Parameters Inside Functions</td></tr>
<tr><td style="font-family:monospace;">$1 … $9, \${10}</td><td>Function's positional parameters</td><td>Independent from script's $1-$9</td></tr>
<tr><td style="font-family:monospace;">"$@"</td><td>All function args, separately quoted</td><td>Always use this — never "$*"</td></tr>
<tr><td style="font-family:monospace;">$#</td><td>Number of function arguments</td><td>Reflects function's own arg count</td></tr>
<tr><td style="font-family:monospace;">shift [N]</td><td>Shift positional params left by N</td><td>$2→$1, $3→$2 etc. $# decrements</td></tr>
<tr><td colspan="3" style="background:#0e1824;color:#58a6ff;font-family:'Segoe UI',sans-serif;font-weight:bold;">Return Values</td></tr>
<tr><td style="font-family:monospace;">return N</td><td>Exit function, set $? to N</td><td>N must be 0-255</td></tr>
<tr><td style="font-family:monospace;">echo value; …$(func)</td><td>Return via stdout capture</td><td>Creates subshell — vars inside lost</td></tr>
<tr><td style="font-family:monospace;">local -n REF=$1; REF=val</td><td>Return via nameref</td><td>No subshell — best for structured data</td></tr>
<tr><td colspan="3" style="background:#2a2a1a;color:#ffa657;font-family:'Segoe UI',sans-serif;font-weight:bold;">Scope</td></tr>
<tr><td style="font-family:monospace;">local VAR=val</td><td>Function-local variable</td><td>Gone when function returns</td></tr>
<tr><td style="font-family:monospace;">local -i/-r/-a/-A VAR</td><td>Local with attribute</td><td>Combine local with type flag</td></tr>
<tr><td style="font-family:monospace;">local -n NAME=VAR</td><td>Local nameref</td><td>Alias for another variable</td></tr>
<tr><td colspan="3" style="background:#1f2027;color:#8b949e;font-family:'Segoe UI',sans-serif;font-weight:bold;">Key Builtins</td></tr>
<tr><td style="font-family:monospace;">type name</td><td>What is this name?</td><td>alias/function/builtin/file/not found</td></tr>
<tr><td style="font-family:monospace;">type -t name</td><td>Type as single word</td><td>alias/function/builtin/file/keyword</td></tr>
<tr><td style="font-family:monospace;">type -a name</td><td>All matches in search order</td><td>Finds both builtin and external</td></tr>
<tr><td style="font-family:monospace;">command cmd</td><td>Run cmd, skip alias/function</td><td>Uses builtin or external directly</td></tr>
<tr><td style="font-family:monospace;">command -v cmd</td><td>Path to cmd (or empty+exit 1)</td><td>Best way to check tool exists</td></tr>
<tr><td style="font-family:monospace;">eval "string"</td><td>Parse and run string as bash</td><td>Dangerous with untrusted input</td></tr>
<tr><td style="font-family:monospace;">exec cmd [args]</td><td>Replace current shell with cmd</td><td>No fork — shell is gone after</td></tr>
<tr><td style="font-family:monospace;">exec [redirects]</td><td>Redirect for current shell</td><td>exec 3&gt;file, exec &gt;&gt;log 2&gt;&amp;1</td></tr>
<tr><td style="font-family:monospace;">source file / . file</td><td>Run file in current shell</td><td>Vars/functions persist; use for libs</td></tr>
<tr><td style="font-family:monospace;">enable / enable -n</td><td>Enable/disable builtins</td><td>Rare — for overriding builtin with ext.</td></tr>
<tr><td style="font-family:monospace;">help [builtin]</td><td>Builtin documentation</td><td>Faster than man for builtins</td></tr>
<tr><td style="font-family:monospace;">mapfile -t ARR &lt; file</td><td>Read lines into array</td><td>-t strips newlines, -n limit, -s skip</td></tr>
</tbody>
</table>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 12 — COMMON MISTAKES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Common Mistakes &amp; Debugging</h2>

<div class="two-col-grid">
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Missing local — modifies global</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">process() {
    FILE="$1"  # ← no local — modifies global FILE!
}</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Every variable in every function must be <code>local</code> unless you explicitly want to modify a global.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">process() { local FILE="$1"; ... }</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ return used like a value</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">get_name() { return "Ravi"; }  # SYNTAX ERROR
NAME=$(get_name)               # NAME is empty</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>return</code> only carries an integer 0-255. Use <code>echo</code> + <code>$()</code>, or a nameref.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">get_name() { echo "Ravi"; }
NAME=$(get_name)</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ $() subshell scope loss</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">load() { LOADED=true; echo "done"; }
RESULT=$(load)
echo $LOADED   # empty — set in subshell!</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>$()</code> creates a subshell. Variables set inside are lost when it exits.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">load() { local -n _r="$1"; _r=true; }
load LOADED; echo $LOADED  # ✅ nameref</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ Calling before defining</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">run_pipeline   # ❌ not defined yet!
run_pipeline() { echo "runs"; }</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Functions must be defined before called (unless calling from inside another function defined earlier).</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">run_pipeline() { echo "runs"; }
run_pipeline   # ✅</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ OPTIND not reset in function</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">parse() { while getopts "f:" o; do ...; done; }
parse -f a
parse -f b  # second call may fail!</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;"><code>getopts</code> uses <code>OPTIND</code> — reset it to 1 at the start of any function that uses <code>getopts</code>.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">parse() { local OPTIND=1; while getopts ...; }</pre>
  </div>
  <div class="card hard-card">
    <div class="type-badge badge-warn">❌ eval with user input</div>
    <pre style="font-family:monospace;font-size:11px;color:#f85149;background:#0d1117;padding:8px;border-radius:4px;margin:8px 0 4px;">USER_CMD="$1"
eval "$USER_CMD"  # code injection risk!</pre>
    <p style="font-size:12px;color:#8b949e;margin:4px 0;">Never <code>eval</code> strings that came from user input, network, or files. Use arrays instead.</p>
    <pre style="font-family:monospace;font-size:11px;color:#3fb950;background:#0d1117;padding:8px;border-radius:4px;margin:4px 0;">CMD=("python3" "script.py" "$ARG")
"\${CMD[@]}"  # ✅ safe array execution</pre>
  </div>
</div>
</div>

<!-- ══════════════════════════════════════════════════════
     SECTION 13 — EXERCISES
══════════════════════════════════════════════════════ -->
<div class="section-block">
<h2 class="section-title"><span class="sec-num"></span> Practice Exercises with Solutions</h2>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 1 — Function Fundamentals</h4>
    <p>Write a script with the following functions, each demonstrating a different concept:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><code>greet NAME</code> — prints a greeting, uses <code>local</code>, returns 0</li>
      <li><code>is_numeric STR</code> — returns 0 if string is integer, 1 if not (use <code>[[ =~ ]]</code>)</li>
      <li><code>to_upper STR</code> — prints the string uppercased (use <code>\${STR^^}</code>)</li>
      <li><code>max A B</code> — prints the larger of two integers (use <code>(( ))</code>)</li>
      <li><code>file_info FILE</code> — prints name, size, line count using <code>local</code> for each</li>
      <li>Call each function, capture outputs with <code>$()</code> where appropriate</li>
      <li>Use <code>declare -F</code> to list all your functions, <code>declare -f max</code> to print source</li>
      <li>Use <code>type</code> on each function and on <code>echo</code>, <code>ls</code>, <code>python3</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel easy">
  <div class="ex-badge easy-badge">Easy</div>
  <div class="ex-body">
    <h4>Exercise 2 — Return Values Drill</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>Exit code:</strong> <code>db_reachable HOST PORT</code> — returns 0 if nc connects, 1 if not; use in <code>if</code> statement</li>
      <li><strong>stdout capture:</strong> <code>get_timestamp FORMAT</code> — echos formatted date; capture with <code>$()</code></li>
      <li><strong>Nameref scalar:</strong> <code>get_largest_file DIR OUTVAR</code> — sets OUTVAR to the largest filename in DIR; verify it works without subshell</li>
      <li><strong>Nameref array:</strong> <code>list_csvs DIR ARR_NAME</code> — populates an array with all CSV paths; iterate the array after calling</li>
      <li><strong>Combined:</strong> <code>validate_csv FILE STATS_VAR</code> — returns 0/1 (valid/invalid) AND sets STATS_VAR as associative array with lines, size, header</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 3 — Scope &amp; Dynamic Scoping</h4>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Demonstrate the dynamic scope bug: outer function sets <code>local DB_HOST="test"</code>, calls inner function that reads <code>$DB_HOST</code> — inner gets test, not the global prod value</li>
      <li>Fix it: inner function declares its own <code>local DB_HOST</code> at the start — now it gets the global value</li>
      <li>Write a function that intentionally modifies a global variable (no local) and document when this is acceptable</li>
      <li>Write <code>run_isolated FUNC ARGS...</code> that runs any function in a subshell <code>( )</code> so its side effects are contained</li>
      <li>Demonstrate: <code>$(func)</code> creates a subshell — any global modification inside is lost; verify with a variable set inside the captured function</li>
    </ol>
  </div>
</div>

<div class="exercise-panel medium">
  <div class="ex-badge medium-badge">Medium</div>
  <div class="ex-body">
    <h4>Exercise 4 — Build a Function Library</h4>
    <p>Create <code>lib/etl.sh</code> — a reusable ETL function library:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li>Guard against double-sourcing with <code>_LIB_ETL_LOADED</code></li>
      <li>Namespaced functions: <code>etl::validate_file</code>, <code>etl::load_csv</code>, <code>etl::summarise</code></li>
      <li><code>etl::validate_file FILE</code> — checks exists, non-empty, readable, valid CSV header; returns meaningful exit codes (1=not found, 2=empty, 3=bad header)</li>
      <li><code>etl::load_csv FILE TABLE -n BATCH</code> — use <code>getopts</code> with <code>local OPTIND=1</code>; call with different options twice to prove OPTIND reset works</li>
      <li><code>etl::summarise FILE RESULT_VAR</code> — nameref returning assoc array with rows/cols/size</li>
      <li>Test script that sources the library and calls all three functions</li>
      <li>Export <code>etl::validate_file</code> with <code>export -f</code> and use it inside <code>xargs -P 4</code></li>
    </ol>
  </div>
</div>

<div class="exercise-panel hard">
  <div class="ex-badge hard-badge">Hard</div>
  <div class="ex-body">
    <h4>Exercise 5 — Production Pipeline Framework</h4>
    <p>Build a complete function-based pipeline framework across multiple files:</p>
    <ol style="color:#8b949e;font-size:13px;line-height:2.2;padding-left:20px;">
      <li><strong>lib/log.sh:</strong> Full logging library with levels (DEBUG/INFO/WARN/ERROR), log file + stderr, caller context using <code>\${FUNCNAME[2]}</code>, guard against double-source</li>
      <li><strong>lib/db.sh:</strong> <code>db::connect</code>, <code>db::query</code>, <code>db::load_csv</code>, <code>db::table_exists</code> — all use nameref for results</li>
      <li><strong>lib/pipeline.sh:</strong> <code>pipeline::step NAME CMD...</code> (timed, logged), <code>pipeline::retry MAX CMD...</code>, <code>pipeline::run_parallel MAX FUNC ITEMS...</code></li>
      <li><strong>main.sh:</strong> Sources all libs, defines <code>main()</code> that calls parse_args, validates inputs, runs pipeline steps</li>
      <li><strong>Recursion:</strong> <code>pipeline::discover_files DIR DEPTH</code> — recursive file discovery with depth limit using <code>FUNCNEST</code> or iterative fallback</li>
      <li><strong>eval:</strong> <code>pipeline::dispatch CMD ARGS</code> — safely dispatch to namespaced functions using a whitelist (not raw eval)</li>
      <li><strong>Testing:</strong> Each library function has a matching test function; <code>run_tests</code> calls them all and reports pass/fail</li>
    </ol>
    <p><strong>All files must pass <code>shellcheck</code> with zero warnings.</strong></p>
  </div>
</div>

<!-- Wrap-up story -->
<div class="story-panel" style="margin-top:32px;">
  <div class="story-avatar">🧑‍💻</div>
  <div class="story-body">
    <div class="story-title">Ravi's Library — Day 240</div>
    <p>Thirty days after Priya showed him that first function, Ravi had built a library. <code>lib/log.sh</code>, <code>lib/db.sh</code>, <code>lib/pipeline.sh</code>. All twelve of his pipeline scripts started with three lines: <code>source "\${LIB}/log.sh"</code>, <code>source "\${LIB}/db.sh"</code>, <code>source "\${LIB}/pipeline.sh"</code>.</p>
    <p>When Priya changed the log format, Ravi edited one line in <code>lib/log.sh</code>. All twelve scripts were updated instantly. When the DB connection logic got more complex, he updated <code>db::connect</code> once. All twelve scripts benefited.</p>
    <p>He had used nameref to return structured data without subshells. He had used <code>export -f</code> to make functions available inside parallel xargs workers. He had used <code>type</code> and <code>declare -f</code> to debug function definitions at runtime. He had learned that <code>eval</code> had exactly one valid use case and seventeen ways to misuse it.</p>
    <p>Most importantly, he had stopped writing the same 12 lines of logging in every script. <strong>A function is not just shorter code. It is a single source of truth — and in production, that is everything.</strong></p>
  </div>
</div>

</div><!-- /section-block -->
\`

`
};