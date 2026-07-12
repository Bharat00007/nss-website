const fs = require('fs');

let page = fs.readFileSync('src/app/core-committee/page.tsx', 'utf8');

// 1. Imports
page = page.replace(
  'RotateCcw, Sparkles, Check, Info, ChevronRight, X, Image as ImageIcon, Upload, Move, ZoomIn',
  'RotateCcw, Sparkles, Check, Info, ChevronRight, X, Image as ImageIcon, Upload, Move, ZoomIn,\n  Mail, Shield, GraduationCap, Star, ArrowRight, Users, ChevronDown, ChevronUp'
);

// 2. Constants and States
const constants = \
const CATEGORY_ORDER = ["Advisory", "Core Committee", "Junior Committee", "Executive Members"];

const CATEGORY_META: Record<string, { color: string; bg: string; border: string; desc: string }> = {
  "Advisory": { color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/25", desc: "Senior mentor guiding the unit with experience and strategic vision." },
  "Core Committee": { color: "text-nss-blue dark:text-blue-400", bg: "bg-nss-blue/10", border: "border-nss-blue/25", desc: "Core leadership driving all major campaigns and decisions of the NSS Unit." },
  "Junior Committee": { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/25", desc: "Rising leaders managing operations, outreach, design, and documentation." },
  "Executive Members": { color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/25", desc: "Active volunteers powering every event and community service drive." }
};

const FACULTY_CONFIG: Record<string, { gradient: string; border: string; accent: string; icon: string }> = {
  "Dean Student Development": { gradient: "from-blue-600 to-indigo-700", border: "border-blue-500/30", accent: "text-blue-400", icon: "grad" },
  "NSS Programme Officer": { gradient: "from-rose-600 to-red-700", border: "border-rose-500/30", accent: "text-rose-400", icon: "shield" },
};
\;
page = page.replace('export default function CommitteeRevealPage() {', constants + '\\nexport default function CommitteeRevealPage() {');

const states = \
  const { committeeMembers = [], leadership = [] } = useNssData();
  const [showFullTeam, setShowFullTeam] = useState(false);
  const teamSectionRef = useRef<HTMLDivElement>(null);

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Advisory": true,
    "Core Committee": true,
    "Junior Committee": false,
    "Executive Members": false,
  });

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const grouped = CATEGORY_ORDER.reduce<Record<string, typeof committeeMembers>>((acc, cat) => {
    acc[cat] = committeeMembers.filter(m => m.category === cat);
    return acc;
  }, {});
\;
page = page.replace(
  '  const { committeeMembers = [] } = useNssData();',
  states
);

// 3. Hide reveal block
page = page.replace(
  '{step === "reveal" && selectedMember && (',
  '{step === "reveal" && selectedMember && !showFullTeam && ('
);

// 4. Add CTA button
const cta = \                <div className="pt-2 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleReset}
                    className="rounded-full bg-muted border border-border hover:bg-muted/75 px-6 py-3 text-xs font-bold text-white shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" /> Reveal Another Committee Officer
                  </button>

                  {!showFullTeam && (
                    <button
                      onClick={() => {
                        setShowFullTeam(true);
                        setTimeout(() => {
                          teamSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="rounded-full bg-accent px-6 py-3 text-xs font-bold text-white shadow-lg transition-all hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      Meet the Complete NSS Team <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>\;

// Replace the original reset button block with the new CTA
page = page.replace(/<div className="pt-2 flex justify-center">[\\s\\S]*?<RotateCcw className="h-4 w-4" \\/> Reveal Another Committee Officer[\\s\\S]*?<\/button>\\s*<\/div>/, cta);

// 5. Append Sections
let teamSection = fs.readFileSync('c29881a_team.tsx', 'utf8');
let teamSectionLines = teamSection.split('\\n').slice(101, 248).join('\\n'); // Lines 102 to 248

let coreSection = fs.readFileSync('c29881a_core.tsx', 'utf8');
let completeListLines = coreSection.split('\\n').slice(685, 920).join('\\n');

// Inject the download button into the completeListLines
const downloadInjection = \            <p className="text-xs text-slate-400 mb-6">
              Browse the officially designated leaders serving JIT NSS for the academic year 2026–27.
            </p>
            <div className="pt-4 flex justify-center">
              <a 
                href="/results/NSS_Committee_Results_2026_27.pdf" 
                download
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-nss-gold px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all inline-flex items-center gap-2 group"
              >
                <Download className="h-4 w-4 group-hover:text-nss-gold transition-colors" />
                Download Official Results PDF
              </a>
            </div>
          </div>\;

completeListLines = completeListLines.replace(
  /<p className="text-xs text-slate-400">\s*Browse the officially designated leaders serving JIT NSS for the academic year 2026ΓÇô27\.\s*<\/p>\s*<\/div>/,
  downloadInjection
);

// Fallback replacement if 'ΓÇô' got sanitized out during file reads:
completeListLines = completeListLines.replace(
  /<p className="text-xs text-slate-400">[\s\S]*?Browse the officially designated leaders serving JIT NSS for the academic year 2026[^]*?27\.[\s\S]*?<\/p>\s*<\/div>/,
  downloadInjection
);


const finalSections = \
        {showFullTeam && (
          <div ref={teamSectionRef} className="pt-16 border-t border-border/30 mt-16 space-y-20 fade-in">
\ + teamSectionLines + '\\n\\n' + completeListLines + '\\n          </div>\\n        )}\\n';

page = page.replace(
  /        <\/AnimatePresence>\s*<\/div>\s*<\/div>\s*\);\s*}/,
  '        </AnimatePresence>\\n\\n' + finalSections + '\\n      </div>\\n    </div>\\n  );\\n}'
);

fs.writeFileSync('src/app/core-committee/page.tsx', page);
