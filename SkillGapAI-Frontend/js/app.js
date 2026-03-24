/**
 * SkillGapAI — Unified App Bundle (non-module, bulletproof)
 * All logic consolidated here so there are zero import failures.
 */
'use strict';

/* ═══════════════════════════════════════════════════════
   TOAST NOTIFICATION SYSTEM
════════════════════════════════════════════════════════ */
window.showToast = function(type, message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ';
    toast.innerHTML = `<span class="toast-icon" style="color: var(--${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'accent-lt'});">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    
    // Trigger reflow to jumpstart CSS animation
    void toast.offsetWidth;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
};

/* ═══════════════════════════════════════════════════════
   SKILLS DATABASE
════════════════════════════════════════════════════════ */
const SKILLS_DB = [
    { name: "Python", category: "Languages", pattern: "python" },
    { name: "JavaScript", category: "Languages", pattern: "javascript|\\bjs\\b" },
    { name: "TypeScript", category: "Languages", pattern: "typescript|\\bts\\b" },
    { name: "Java", category: "Languages", pattern: "\\bjava\\b" },
    { name: "C++", category: "Languages", pattern: "c\\+\\+|\\bcpp\\b" },
    { name: "C#", category: "Languages", pattern: "c#|csharp" },
    { name: "Go / Golang", category: "Languages", pattern: "golang|\\bgo\\b" },
    { name: "Rust", category: "Languages", pattern: "\\brust\\b" },
    { name: "Ruby", category: "Languages", pattern: "\\bruby\\b" },
    { name: "PHP", category: "Languages", pattern: "\\bphp\\b" },
    { name: "Swift", category: "Languages", pattern: "\\bswift\\b" },
    { name: "Kotlin", category: "Languages", pattern: "\\bkotlin\\b" },
    { name: "Scala", category: "Languages", pattern: "\\bscala\\b" },
    { name: "Bash / Shell", category: "Languages", pattern: "bash|shell scripting" },
    { name: "React", category: "Frontend", pattern: "\\breact\\b|reactjs" },
    { name: "Angular", category: "Frontend", pattern: "angular" },
    { name: "Vue.js", category: "Frontend", pattern: "\\bvue\\b|vuejs" },
    { name: "Next.js", category: "Frontend", pattern: "next\\.js|nextjs" },
    { name: "HTML5", category: "Frontend", pattern: "\\bhtml\\b" },
    { name: "CSS3", category: "Frontend", pattern: "\\bcss\\b" },
    { name: "Tailwind CSS", category: "Frontend", pattern: "tailwind" },
    { name: "Bootstrap", category: "Frontend", pattern: "bootstrap" },
    { name: "Redux", category: "Frontend", pattern: "redux" },
    { name: "GraphQL", category: "Frontend", pattern: "graphql" },
    { name: "Node.js", category: "Backend", pattern: "node\\.js|nodejs|\\bnode\\b" },
    { name: "Express.js", category: "Backend", pattern: "express\\.js|\\bexpress\\b" },
    { name: "Django", category: "Backend", pattern: "django" },
    { name: "Flask", category: "Backend", pattern: "\\bflask\\b" },
    { name: "FastAPI", category: "Backend", pattern: "fastapi" },
    { name: "Spring Boot", category: "Backend", pattern: "spring boot|\\bspring\\b" },
    { name: "REST API", category: "Backend", pattern: "rest api|restful" },
    { name: "Microservices", category: "Backend", pattern: "microservices" },
    { name: "MySQL", category: "Databases", pattern: "mysql" },
    { name: "PostgreSQL", category: "Databases", pattern: "postgresql|postgres" },
    { name: "MongoDB", category: "Databases", pattern: "mongodb|\\bmongo\\b" },
    { name: "Redis", category: "Databases", pattern: "\\bredis\\b" },
    { name: "Firebase", category: "Databases", pattern: "firebase" },
    { name: "SQLite", category: "Databases", pattern: "sqlite" },
    { name: "SQL", category: "Databases", pattern: "\\bsql\\b" },
    { name: "NoSQL", category: "Databases", pattern: "nosql" },
    { name: "AWS", category: "Cloud & DevOps", pattern: "\\baws\\b|amazon web services" },
    { name: "Azure", category: "Cloud & DevOps", pattern: "\\bazure\\b" },
    { name: "Google Cloud", category: "Cloud & DevOps", pattern: "\\bgcp\\b|google cloud" },
    { name: "Docker", category: "Cloud & DevOps", pattern: "docker" },
    { name: "Kubernetes", category: "Cloud & DevOps", pattern: "kubernetes|\\bk8s\\b" },
    { name: "Terraform", category: "Cloud & DevOps", pattern: "terraform" },
    { name: "Jenkins", category: "Cloud & DevOps", pattern: "jenkins" },
    { name: "CI/CD", category: "Cloud & DevOps", pattern: "ci/cd|continuous integration" },
    { name: "Linux", category: "Cloud & DevOps", pattern: "\\blinux\\b|ubuntu" },
    { name: "Machine Learning", category: "Data & AI", pattern: "machine learning|\\bml\\b" },
    { name: "Deep Learning", category: "Data & AI", pattern: "deep learning" },
    { name: "TensorFlow", category: "Data & AI", pattern: "tensorflow" },
    { name: "PyTorch", category: "Data & AI", pattern: "pytorch" },
    { name: "scikit-learn", category: "Data & AI", pattern: "scikit-learn|sklearn" },
    { name: "Pandas", category: "Data & AI", pattern: "\\bpandas\\b" },
    { name: "NumPy", category: "Data & AI", pattern: "numpy" },
    { name: "NLP", category: "Data & AI", pattern: "\\bnlp\\b|natural language processing" },
    { name: "Data Analysis", category: "Data & AI", pattern: "data analysis|data analytics" },
    { name: "React Native", category: "Mobile", pattern: "react native" },
    { name: "Flutter", category: "Mobile", pattern: "flutter" },
    { name: "Android", category: "Mobile", pattern: "android" },
    { name: "Git", category: "Tools", pattern: "\\bgit\\b" },
    { name: "GitHub", category: "Tools", pattern: "github" },
    { name: "Agile", category: "Tools", pattern: "agile" },
    { name: "Scrum", category: "Tools", pattern: "scrum" },
    { name: "Figma", category: "Tools", pattern: "figma" },
    { name: "Postman", category: "Tools", pattern: "postman" },
    { name: "Jest", category: "Tools", pattern: "\\bjest\\b" },
    { name: "Leadership", category: "Soft Skills", pattern: "leadership|team lead" },
    { name: "Communication", category: "Soft Skills", pattern: "communication" },
    { name: "Problem Solving", category: "Soft Skills", pattern: "problem.solving" },
    { name: "Teamwork", category: "Soft Skills", pattern: "teamwork|collaboration" },
    { name: "Project Management", category: "Soft Skills", pattern: "project management" },
];

function getResourceFor(skillName) {
    const map = {
        "Python": { url: "https://docs.python.org/3/tutorial/", platform: "Python Docs" },
        "JavaScript": { url: "https://javascript.info", platform: "javascript.info" },
        "React": { url: "https://react.dev/learn", platform: "React Docs" },
        "Node.js": { url: "https://nodejs.org/en/docs/", platform: "Node.js Docs" },
        "AWS": { url: "https://aws.amazon.com/training/", platform: "AWS Training" },
        "Docker": { url: "https://docs.docker.com/get-started/", platform: "Docker Docs" },
        "Machine Learning": { url: "https://www.coursera.org/learn/machine-learning", platform: "Coursera" },
        "SQL": { url: "https://www.sqltutorial.org/", platform: "SQL Tutorial" },
    };
    return map[skillName] || {
        url: `https://www.coursera.org/search?query=${encodeURIComponent(skillName)}`,
        platform: "Coursera"
    };
}

/* ═══════════════════════════════════════════════════════
   SKILL EXTRACTOR
════════════════════════════════════════════════════════ */
function extractSkills(input) {
    if (!input) return [];
    const text = typeof input === 'string' ? input : (input.cleaned_text || input.raw_text || input.text || '');
    const resultsMap = new Map();
    const lower = text.toLowerCase();

    SKILLS_DB.forEach(skill => {
        try {
            const regex = new RegExp(skill.pattern, 'i');
            const match = text.match(regex);
            if (match) {
                resultsMap.set(skill.name, { ...skill, matchedKeyword: match[0] });
            }
        } catch (e) {
            if (lower.includes(skill.pattern.toLowerCase())) {
                resultsMap.set(skill.name, { ...skill, matchedKeyword: skill.pattern });
            }
        }
    });

    // Also merge in AI-extracted skills from backend
    if (input && typeof input === 'object') {
        const aiSkills = [
            ...(Array.isArray(input.spacy_skills) ? input.spacy_skills : []),
            ...(Array.isArray(input.bert_skills) ? input.bert_skills : []),
            ...(Array.isArray(input.keyword_skills) ? input.keyword_skills : []),
        ];
        aiSkills.forEach(skillStr => {
            if (!skillStr || typeof skillStr !== 'string') return;
            try {
                const found = SKILLS_DB.find(db =>
                    db.name.toLowerCase() === skillStr.toLowerCase() ||
                    (db.pattern && new RegExp(db.pattern, 'i').test(skillStr))
                );
                if (found && !resultsMap.has(found.name)) {
                    resultsMap.set(found.name, { ...found, matchedKeyword: skillStr });
                } else if (!found) {
                    const extractedName = skillStr.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    if (!resultsMap.has(extractedName)) {
                        resultsMap.set(extractedName, { name: extractedName, category: "AI Extraction", matchedKeyword: skillStr, pattern: skillStr });
                    }
                }
            } catch (e) { /* ignore */ }
        });
    }
    return Array.from(resultsMap.values());
}

/* ═══════════════════════════════════════════════════════
   GAP ANALYZER
════════════════════════════════════════════════════════ */
function analyzeGap(resumeData, jdData) {
    const resumeSkills = extractSkills(resumeData);
    const jdSkills = extractSkills(jdData);

    const resumeNames = new Set(resumeSkills.map(s => s.name));
    const jdNames = new Set(jdSkills.map(s => s.name));

    const matched = jdSkills.filter(s => resumeNames.has(s.name));
    const missing = jdSkills.filter(s => !resumeNames.has(s.name));
    const extra = resumeSkills.filter(s => !jdNames.has(s.name));

    const categories = [...new Set(jdSkills.map(s => s.category))];
    const categoryData = categories.map(cat => {
        const jdSubSet = jdSkills.filter(s => s.category === cat);
        const matchSubSet = matched.filter(s => s.category === cat);
        return {
            category: cat,
            required: jdSubSet.length,
            matched: matchSubSet.length,
            matchPct: jdSubSet.length > 0 ? Math.round((matchSubSet.length / jdSubSet.length) * 100) : 0,
            status: matchSubSet.length === jdSubSet.length ? 'complete' : matchSubSet.length === 0 ? 'absent' : 'partial'
        };
    });

    const matchPct = jdSkills.length > 0 ? Math.round((matched.length / jdSkills.length) * 100) : 0;
    const categoryMatchBonus = categoryData.filter(c => c.matchPct > 0).length * 5;
    const atsPct = Math.min(100, Math.round(matchPct * 0.6 + Math.min(resumeSkills.length * 2, 20) + categoryMatchBonus));
    const marketReadinessPct = Math.min(100, Math.round((resumeSkills.length / 15) * 100));
    const uniqueResumeCategories = [...new Set(resumeSkills.map(s => s.category))].length;
    const skillDiversityPct = Math.min(100, Math.round((uniqueResumeCategories / 8) * 100));
    const recommendations = generateRecommendations(missing).slice(0, 8);

    return { resumeSkills, jdSkills, matched, missing, extra, matchPct, atsPct: atsPct, marketReadinessPct, skillDiversityPct, categoryData, recommendations };
}

/* ═══════════════════════════════════════════════════════
   RECOMMENDATIONS
════════════════════════════════════════════════════════ */
const RECOMMENDATION_MAP = {
    "AWS": { advice: "Pursue the AWS Certified Solutions Architect Associate certification.", type: "Certification", priority: "High" },
    "Docker": { advice: "Build a multi-container app using Docker Compose to master container orchestration.", type: "Project", priority: "High" },
    "React": { advice: "Build a dashboard using React Hooks and Context API/Redux.", type: "Project", priority: "High" },
    "TypeScript": { advice: "Refactor a JavaScript project to TypeScript to understand type safety.", type: "Skill Up", priority: "High" },
    "Node.js": { advice: "Implement a scalable backend from scratch using Node.js and Express.", type: "Project", priority: "High" },
    "Python": { advice: "Explore data analysis with Pandas or web development with Django/FastAPI.", type: "Course", priority: "High" },
    "Machine Learning": { advice: "Complete the Andrew Ng Machine Learning Specialization on Coursera.", type: "Course", priority: "High" },
    "SQL": { advice: "Solve advanced SQL challenges on LeetCode or HackerRank.", type: "Practice", priority: "High" },
    "Kubernetes": { advice: "Deploy a cluster using k3s or Minikube and implement CI/CD pipelines.", type: "Project", priority: "High" },
};
const CATEGORY_ADVICE = {
    "Languages": "Master syntax, data structures, and algorithmic problem solving.",
    "Frontend": "Build a responsive portfolio project to demonstrate UI/UX expertise.",
    "Backend": "Focus on database integration, authentication, and API design.",
    "Databases": "Learn indexing, normalization, and query optimization strategies.",
    "Cloud & DevOps": "Get hands-on by deploying an app using modern CI/CD practices.",
    "Data & AI": "Work on an end-to-end data pipeline project.",
    "Mobile": "Build a simple app that uses device features like camera or location.",
    "Tools": "Integrate this tool into your daily coding workflow.",
    "Soft Skills": "Seek opportunities to lead small group projects or present your work.",
};
function generateRecommendations(missingSkills) {
    if (!missingSkills || !Array.isArray(missingSkills)) return [];
    return missingSkills.map(skill => {
        const specific = RECOMMENDATION_MAP[skill.name];
        const resource = getResourceFor(skill.name);
        return {
            skill: skill.name,
            category: skill.category,
            advice: specific ? specific.advice : (CATEGORY_ADVICE[skill.category] || "Explore official documentation and build a small test project."),
            type: specific ? specific.type : "Learning Path",
            priority: specific ? specific.priority : (["Languages", "Frontend", "Backend", "Cloud & DevOps"].includes(skill.category) ? "Medium" : "Low"),
            url: resource.url,
            platform: resource.platform
        };
    }).sort((a, b) => ({ "High": 3, "Medium": 2, "Low": 1 }[b.priority] - { "High": 3, "Medium": 2, "Low": 1 }[a.priority]));
}

/* ═══════════════════════════════════════════════════════
   PARSER (with backend + local fallback)
════════════════════════════════════════════════════════ */
const PDF_WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const BACKEND_URL = 'http://127.0.0.1:5000/api/extract';

async function parseFile(file, jdText) {
    if (!file) throw new Error('No file provided.');
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'txt', 'docx'].includes(ext)) throw new Error(`Unsupported format: .${ext}. Use PDF or TXT.`);

    // Try backend first (with timeout)
    try {
        const formData = new FormData();
        formData.append('file', file);
        if (jdText) formData.append('jd_text', jdText);

        const controller = new AbortController();
        const tid = setTimeout(() => controller.abort(), 8000);
        const response = await fetch(BACKEND_URL, { method: 'POST', body: formData, signal: controller.signal });
        clearTimeout(tid);

        if (!response.ok) {
            const e = await response.json().catch(() => ({}));
            throw new Error(e.error || `HTTP ${response.status}`);
        }
        const data = await response.json();
        console.log('[SkillGapAI] Backend parse success');
        return data;
    } catch (err) {
        console.warn('[SkillGapAI] Backend unavailable, using local fallback:', err.message);
    }

    // Local fallback
    let rawText = '';
    if (ext === 'pdf') {
        if (typeof pdfjsLib === 'undefined') throw new Error('PDF.js not loaded. Cannot parse PDF without backend running.');
        pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;
        const buf = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            rawText += content.items.map(item => item.str).join(' ') + '\n';
        }
        rawText = rawText.trim();
    } else {
        rawText = await file.text();
    }

    const cleaned = rawText.toLowerCase().replace(/[^a-zA-Z0-9\s+#.]/g, ' ').replace(/\s+/g, ' ').trim();
    const optimized = generateOptimizedResume(rawText, jdText || '');
    console.log('[SkillGapAI] Local fallback parsed, length:', cleaned.length);
    return { raw_text: rawText, cleaned_text: cleaned, optimized_text: optimized, keyword_skills: [], spacy_skills: [], bert_skills: [] };
}

/* ═══════════════════════════════════════════════════════
   CHARTS
════════════════════════════════════════════════════════ */
const chartInstances = new Map();
function destroyChart(id) {
    if (chartInstances.has(id)) { chartInstances.get(id).destroy(); chartInstances.delete(id); }
}
function renderDonutChart(id, matched, missing, extra) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    destroyChart(id);
    chartInstances.set(id, new Chart(canvas.getContext('2d'), {
        type: 'doughnut',
        data: { labels: ['Matched', 'Missing', 'Bonus'], datasets: [{ data: [matched, missing, extra], backgroundColor: ['#10b981', '#ef4444', '#6366f1'], borderColor: ['#065f46', '#7f1d1d', '#312e81'], borderWidth: 2, hoverOffset: 8 }] },
        options: { responsive: true, cutout: '68%', plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { family: 'Inter', size: 13 }, padding: 16 } } } }
    }));
}
function renderRadarChart(id, categoryData) {
    const canvas = document.getElementById(id);
    if (!canvas || !categoryData.length) return;
    destroyChart(id);
    const maxVal = Math.max(...categoryData.map(d => Math.max(d.required, d.matched)), 4);
    chartInstances.set(id, new Chart(canvas.getContext('2d'), {
        type: 'radar',
        data: { 
            labels: categoryData.map(d => d.category), 
            datasets: [
                { 
                    label: 'Job Description', 
                    data: categoryData.map(d => d.required), 
                    backgroundColor: 'rgba(244, 63, 94, 0.1)', 
                    borderColor: '#f43f5e', 
                    pointBackgroundColor: '#f43f5e', 
                    borderWidth: 2,
                    borderDash: [4, 4]
                },
                { 
                    label: 'Your Resume', 
                    data: categoryData.map(d => d.matched), 
                    backgroundColor: 'rgba(59, 130, 246, 0.35)', 
                    borderColor: '#60a5fa', 
                    pointBackgroundColor: '#60a5fa', 
                    borderWidth: 2 
                }
            ] 
        },
        options: { responsive: true, scales: { r: { min: 0, max: maxVal, ticks: { stepSize: Math.ceil(maxVal / 4), color: '#475569', backdropColor: 'transparent', font: { family: 'Inter' } }, grid: { color: 'rgba(255,255,255,0.07)' }, pointLabels: { color: '#cbd5e1', font: { family: 'Inter', size: 12, weight: 'bold' } }, angleLines: { color: 'rgba(255,255,255,0.07)' } } }, plugins: { legend: { position: 'top', labels: { color: '#f8fafc', font: { family: 'Inter', size: 13 }, padding: 16 } } } }
    }));
}
function renderBarChart(id, categoryData) {
    const canvas = document.getElementById(id);
    if (!canvas || !categoryData.length) return;
    destroyChart(id);
    chartInstances.set(id, new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: { labels: categoryData.map(d => d.category), datasets: [{ label: 'Matched', data: categoryData.map(d => d.matched), backgroundColor: '#10b981', borderRadius: 6 }, { label: 'Missing', data: categoryData.map(d => d.required - d.matched), backgroundColor: '#ef4444', borderRadius: 6 }] },
        options: { responsive: true, interaction: { mode: 'index', intersect: false }, scales: { x: { stacked: true, ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.04)' } }, y: { stacked: true, beginAtZero: true, ticks: { color: '#94a3b8', stepSize: 1 }, grid: { color: 'rgba(255,255,255,0.07)' } } }, plugins: { legend: { labels: { color: '#94a3b8' } } } }
    }));
}
function animateCounter(el, target, suffix, duration) {
    if (!el) return;
    suffix = suffix || '';
    duration = duration || 1200;
    let val = 0;
    const inc = target / (duration / 16);
    const tick = () => {
        val = Math.min(val + inc, target);
        el.textContent = Math.round(val) + suffix;
        if (val < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

/* ═══════════════════════════════════════════════════════
   HISTORY
════════════════════════════════════════════════════════ */
function saveAnalysis(results, role) {
    try {
        const history = JSON.parse(localStorage.getItem('skillgap_history') || '[]');
        history.unshift({ 
            id: Date.now(), 
            date: new Date().toLocaleDateString(), 
            role: role || 'Analysis', 
            matchPct: results.matchPct, 
            missingCount: results.missing.length, 
            matchedCount: results.matched.length,
            recommendations: results.recommendations,
            matched: results.matched.map(s => s.name || s),
            missing: results.missing.map(s => s.name || s)
        });
        localStorage.setItem('skillgap_history', JSON.stringify(history.slice(0, 5)));
    } catch (e) { /* ignore */ }
}

/* ═══════════════════════════════════════════════════════
   LOCAL AI RESUME OPTIMIZER
════════════════════════════════════════════════════════ */
function generateOptimizedResume(rawText, jdText) {
    if (!rawText || rawText.length < 10) return rawText;
    // Extract JD keywords that are not in the resume
    const jdSkills = extractSkills(jdText || '');
    const resumeSkillNames = new Set(extractSkills(rawText).map(s => s.name.toLowerCase()));
    const missingSkills = jdSkills.filter(s => !resumeSkillNames.has(s.name.toLowerCase()));

    let optimized = rawText.trim();

    // Add a professional summary if missing
    const hasSummary = /summary|objective|profile/i.test(optimized.substring(0, 300));
    if (!hasSummary) {
        const topSkills = extractSkills(rawText).slice(0, 5).map(s => s.name).join(', ');
        optimized = `PROFESSIONAL SUMMARY\n${'─'.repeat(40)}\nResults-driven professional with expertise in ${topSkills || 'multiple technical domains'}. Proven ability to deliver high-quality solutions and collaborate effectively in fast-paced environments.\n\n` + optimized;
    }

    // Append ATS Keywords section with missing skills from JD
    if (missingSkills.length > 0) {
        const keywordsToAdd = missingSkills.slice(0, 10).map(s => s.name).join(' • ');
        optimized += `\n\n${'═'.repeat(50)}\n✨ AI-SUGGESTED KEYWORDS (from Job Description)\n${'─'.repeat(50)}\nAdding the following high-demand skills to improve ATS score and hiring manager visibility:\n\n${keywordsToAdd}\n\nConsider highlighting relevant experience with these technologies in your work history or projects section.`;
    }

    // Add a closing ATS note
    optimized += `\n\n${'─'.repeat(50)}\n[Optimized by SkillGapAI — ${new Date().toLocaleDateString()}]`;
    return optimized;
}

/* exportToPDF and downloadResumePDF — defined in js/pdf-export.js */


function generateHTMLReport(data) {
    const now = new Date().toLocaleString();
    const { matched = [], missing = [], extra = [], matchPct = 0, atsPct = 0, marketReadinessPct = 0, skillDiversityPct = 0, categoryData = [], recommendations = [] } = data;
    const rawResume = document.getElementById('raw-resume-box')?.textContent || '';
    const optimizedResume = document.getElementById('optimized-resume-box')?.textContent || '';
    const esc = s => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const badges = (arr, bg, clr) => arr.length ? arr.map(s => `<span style="display:inline-block;background:${bg};color:${clr};padding:4px 14px;border-radius:999px;font-size:.78rem;font-weight:600;margin:3px;">${esc(s.name)}</span>`).join('') : '<em style="color:#94a3b8">None</em>';
    const catRows = categoryData.map(c => `<tr><td style="padding:10px 14px;border-bottom:1px solid #1e293b">${esc(c.category)}</td><td style="padding:10px 14px;border-bottom:1px solid #1e293b;text-align:center">${c.required}</td><td style="padding:10px 14px;border-bottom:1px solid #1e293b;text-align:center;color:#10b981">${c.matched}</td><td style="padding:10px 14px;border-bottom:1px solid #1e293b"><div style="background:#1e293b;height:8px;border-radius:999px"><div style="background:${c.matchPct >= 70 ? '#10b981' : c.matchPct >= 40 ? '#f59e0b' : '#f43f5e'};width:${c.matchPct}%;height:8px;border-radius:999px"></div></div><span style="font-size:.72rem;color:#94a3b8">${c.matchPct}%</span></td></tr>`).join('');
    const recHtml = recommendations.slice(0, 8).map(r => `<div style="background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:18px;margin-bottom:10px"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><strong style="color:#f8fafc">${esc(r.skill)}</strong><span style="background:${r.priority === 'High' ? 'rgba(244,63,94,.15)' : r.priority === 'Medium' ? 'rgba(245,158,11,.15)' : 'rgba(16,185,129,.15)'};color:${r.priority === 'High' ? '#f43f5e' : r.priority === 'Medium' ? '#f59e0b' : '#10b981'};padding:2px 10px;border-radius:999px;font-size:.72rem;font-weight:700">${esc(r.priority)}</span></div><div style="font-size:.72rem;color:#6366f1;margin-bottom:8px">${esc(r.category)} · ${esc(r.type)}</div><p style="color:#cbd5e1;font-size:.88rem;margin:0 0 10px">${esc(r.advice)}</p><a href="${r.url}" style="color:#8892f0;font-size:.82rem">📚 Learn on ${esc(r.platform)} →</a></div>`).join('');
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>SkillGapAI Report</title><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',sans-serif;background:#03040b;color:#f8fafc;padding:40px 20px 80px;-webkit-font-smoothing:antialiased}h1,h2,h3{font-family:'Outfit',sans-serif}.page{max-width:900px;margin:auto}.hdr{text-align:center;padding:48px 32px;background:linear-gradient(135deg,rgba(79,70,229,.12),rgba(219,39,119,.08));border:1px solid rgba(255,255,255,.06);border-radius:24px;margin-bottom:24px}.sec{background:rgba(13,17,28,.8);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:28px;margin-bottom:20px}.sec-title{font-size:1.05rem;font-weight:700;margin-bottom:16px}table{width:100%;border-collapse:collapse;font-size:.88rem}th{padding:10px 14px;background:#1e293b;color:#94a3b8;font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;font-weight:600;text-align:left}pre{background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:18px;font-family:monospace;font-size:.78rem;color:#94a3b8;white-space:pre-wrap;word-break:break-word}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body><div class="page"><div class="hdr"><div style="font-size:.8rem;color:#a78bfa;font-weight:700;letter-spacing:.1em;margin-bottom:12px">⚡ SKILLGAPAI — ANALYSIS REPORT</div><h1 style="font-size:2.2rem;font-weight:900;margin-bottom:6px">Skill Gap Analysis</h1><p style="color:#94a3b8;margin-bottom:24px">Generated ${esc(now)}</p><div style="font-size:4rem;font-weight:900;font-family:'Outfit';background:linear-gradient(135deg,#4f46e5,#db2777);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">${matchPct}%</div><div style="color:#94a3b8;font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-top:6px">OVERALL MATCH SCORE</div></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-bottom:20px"><div class="sec" style="text-align:center"><div style="font-size:.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">ATS Score</div><div style="font-size:1.8rem;font-weight:800;color:#8892f0">${atsPct}%</div></div><div class="sec" style="text-align:center"><div style="font-size:.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Market Readiness</div><div style="font-size:1.8rem;font-weight:800;color:#10b981">${marketReadinessPct}%</div></div><div class="sec" style="text-align:center"><div style="font-size:.7rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Skill Diversity</div><div style="font-size:1.8rem;font-weight:800;color:#0ea5e9">${skillDiversityPct}%</div></div></div><div class="sec"><div class="sec-title">✅ Matched Skills <span style="background:rgba(16,185,129,.15);color:#10b981;padding:2px 10px;border-radius:999px;font-size:.75rem;font-weight:700">${matched.length}</span></div>${badges(matched, 'rgba(16,185,129,.2)', '#10b981')}</div><div class="sec"><div class="sec-title">🎯 Skills to Acquire <span style="background:rgba(244,63,94,.15);color:#f43f5e;padding:2px 10px;border-radius:999px;font-size:.75rem;font-weight:700">${missing.length}</span></div>${badges(missing, 'rgba(244,63,94,.2)', '#f43f5e')}</div><div class="sec"><div class="sec-title">⭐ Bonus Skills <span style="background:rgba(99,102,241,.15);color:#8892f0;padding:2px 10px;border-radius:999px;font-size:.75rem;font-weight:700">${extra.length}</span></div>${badges(extra, 'rgba(99,102,241,.2)', '#8892f0')}</div>${categoryData.length ? `<div class="sec"><div class="sec-title">📂 Category Breakdown</div><table><thead><tr><th>Category</th><th style="text-align:center">Required</th><th style="text-align:center">Matched</th><th>Progress</th></tr></thead><tbody>${catRows}</tbody></table></div>` : ''} ${recommendations.length ? `<div class="sec"><div class="sec-title">📚 Learning Recommendations</div>${recHtml}</div>` : ''} ${rawResume ? `<div class="sec"><div class="sec-title">📄 Original Resume</div><pre>${esc(rawResume)}</pre></div>` : ''} ${optimizedResume ? `<div class="sec"><div class="sec-title">✨ AI Optimized Resume</div><pre>${esc(optimizedResume)}</pre></div>` : ''}<div style="text-align:center;margin-top:40px;color:#475569;font-size:.78rem">SkillGapAI © ${new Date().getFullYear()}</div></div></body></html>`;
}

/* ═══════════════════════════════════════════════════════
   MAIN APP CONTROLLER
════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const CIRCUMFERENCE = 2 * Math.PI * 70;

const state = { resumeFile: null, jdFile: null, analysisResult: null };
window.state = state; // Make globally accessible for chatbot 


function showSection(id) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const el = $(id);
    if (el) {
        el.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function setLoaderStep(idx, msg) {
    document.querySelectorAll('.l-step').forEach((el, i) => {
        el.classList.toggle('done', i < idx - 1);
        el.classList.toggle('current', i === idx - 1);
    });
    if ($('loader-status')) $('loader-status').textContent = msg;
}

function showError(msg, details) {
    console.error('[SkillGapAI] Error:', msg, details);
    // Always go back to upload section first so error div is visible
    showSection('upload-section');
    const el = $('error-msg');
    if (!el) { alert('Error: ' + msg); return; }
    el.style.display = 'flex';
    if ($('error-text')) $('error-text').textContent = msg;
    const dw = $('error-details-wrap');
    const dp = $('error-details');
    showToast('error', msg); // Toast popup!
    if (details && dp) {
        if (dw) dw.style.display = 'block';
        dp.textContent = typeof details === 'object' ? JSON.stringify(details, null, 2) : String(details);
    } else if (dw) {
        dw.style.display = 'none';
    }
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
}

function hideError() {
    const el = $('error-msg');
    if (el) el.style.display = 'none';
}

function formatSize(b) {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
    return (b / 1048576).toFixed(1) + ' MB';
}

function handleFileSelection(type, file) {
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'txt', 'docx'].includes(ext)) {
        showError(`Invalid file type .${ext}. Use PDF, DOCX, or TXT.`);
        return;
    }
    state[type + 'File'] = file;
    hideError();
    $(`${type}-drop-inner`).style.display = 'none';
    $(`${type}-success`).style.display = 'flex';
    $(`${type}-filename`).textContent = file.name;
    $(`${type}-filesize`).textContent = formatSize(file.size);
    showToast('success', `${file.name} uploaded successfully!`);
}

function resetFile(type) {
    if (state[type + 'File']) showToast('info', 'File removed.');
    state[type + 'File'] = null;
    $(`${type}-drop-inner`).style.display = 'block';
    $(`${type}-success`).style.display = 'none';
    $(`${type}-input`).value = '';
}

function bindDropZone(zoneId, type) {
    const zone = $(zoneId);
    if (!zone) return;
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
        e.preventDefault(); zone.classList.remove('drag-over');
        if (e.dataTransfer.files.length) handleFileSelection(type, e.dataTransfer.files[0]);
    });
}

function updateScoreRing(percent) {
    const ring = $('score-ring');
    if (!ring) return;
    const offset = CIRCUMFERENCE * (1 - percent / 100);
    const color = percent >= 80 ? 'var(--success)' : percent >= 50 ? 'var(--accent-lt)' : 'var(--danger)';
    ring.style.stroke = color;
    ring.style.strokeDasharray = CIRCUMFERENCE;
    ring.style.strokeDashoffset = CIRCUMFERENCE;
    requestAnimationFrame(() => {
        ring.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(.4,0,.2,1)';
        ring.style.strokeDashoffset = offset;
        ring.style.filter = `drop-shadow(0 0 10px ${color})`;
    });
    if ($('score-number')) $('score-number').style.color = color;
}

function renderSkillBadges(containerId, skills, type) {
    const container = $(containerId);
    if (!container) return;
    if (!skills || !skills.length) {
        container.innerHTML = '<span class="empty-note">None detected.</span>';
        return;
    }
    container.innerHTML = skills.map(s => {
        const name = s.name || s.skill || (typeof s === 'string' ? s : 'Unknown');
        const cat = s.category || 'General';
        return `<span class="badge b-${type}" title="${cat}">${name}</span>`;
    }).join('');
}

function renderCategoryBreakdown(data) {
    const c = $('cat-list');
    if (!c) return;
    if (!data || !data.length) { c.innerHTML = '<span class="empty-note">No data.</span>'; return; }
    c.innerHTML = data.map(cat => {
        const name = cat.category || cat.name || 'Other';
        const m = cat.matched || 0;
        const r = cat.required || 0;
        const p = cat.matchPct || 0;
        return `
        <div class="cp-item">
            <div class="cp-head"><span class="cp-name">${name}</span><span class="cp-val">${m}/${r} · ${p}%</span></div>
            <div class="cp-bar-bg"><div class="cp-bar-fill" style="width:${p}%"></div></div>
        </div>`;
    }).join('');
}

function renderRecommendations(recs) {
    const c = $('recs-grid');
    if (!c) return;
    if (!recs || !recs.length) { c.innerHTML = '<p class="empty-note">🎉 No significant gaps found!</p>'; return; }
    c.innerHTML = recs.map(r => {
        const name = r.skill || r.name || 'Skill';
        const cat = r.category || 'Technical';
        return `
        <div class="rec-card">
            <h4 class="rec-title">${name}</h4>
            <div class="rec-cat" style="font-size:.8rem;color:var(--accent-lt);margin-bottom:.8rem;text-transform:uppercase;letter-spacing:.05rem">${cat}</div>
            <p class="rec-desc">${r.advice || ''}</p>
            <a class="rec-btn" href="${r.url || '#'}" target="_blank" rel="noopener">Learn on ${r.platform || 'Coursera'} →</a>
        </div>`;
    }).join('');
}

function renderExplainability(skills) {
    const c = $('explain-grid');
    if (!c) return;
    if (!skills || !skills.length) { c.innerHTML = '<span class="empty-note">No skills to explain.</span>'; return; }
    c.innerHTML = skills.map(s => {
        const name = s.name || s.skill || 'Skill';
        const cat = s.category || 'General';
        const kw = s.matchedKeyword || s.pattern || 'Match';
        return `
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius);padding:1rem;display:flex;justify-content:space-between;align-items:center;">
            <div><strong style="color:var(--t1);display:block;margin-bottom:.25rem">${name}</strong><span class="badge" style="background:var(--bg4);color:var(--t2);font-size:.75rem;padding:2px 8px">${cat}</span></div>
            <div style="text-align:right;background:var(--bg2);padding:.5rem 1rem;border-radius:var(--radius);border:1px dashed var(--border)"><div style="font-size:.75rem;color:var(--t3);text-transform:uppercase">Matched Keyword</div><code style="color:var(--accent-lt);font-family:monospace">"${kw}"</code></div>
        </div>`;
    }).join('');
}

function populateDashboard(data) {
    console.log('[SkillGapAI] Populating dashboard...');
    showSection('results-section');

    if (!data || typeof data !== 'object') {
        showError('Analysis returned no data. Please try again.');
        return;
    }

    const { matched = [], missing = [], extra = [], jdSkills = [], resumeSkills = [], matchPct = 0, atsPct = 0, marketReadinessPct = 0, skillDiversityPct = 0, categoryData = [], recommendations = [] } = data;

    try { updateScoreRing(matchPct); animateCounter($('score-number'), matchPct, '%'); } catch (e) { }
    try { animateCounter($('ats-score-box'), atsPct, '%'); } catch (e) { }
    try { animateCounter($('market-readiness-box'), marketReadinessPct, '%'); } catch (e) { }
    try { animateCounter($('skill-diversity-box'), skillDiversityPct, '%'); } catch (e) { }

    const resumeCats = new Set(resumeSkills.map(s => s.category));
    const jdCats = new Set(jdSkills.map(s => s.category));
    const matchedCats = [...jdCats].filter(c => resumeCats.has(c)).length;
    if ($('pillar-match-box')) $('pillar-match-box').textContent = `${matchedCats}/${jdCats.size}`;

    const statusEl = $('result-status-msg');
    if (statusEl) {
        if (matchPct >= 80) statusEl.textContent = "Outstanding! Your profile is a near-perfect match.";
        else if (matchPct >= 50) statusEl.textContent = "Solid match. A few strategic skill additions could boost your ranking.";
        else statusEl.textContent = "Significant gaps detected. Focus on the High Priority recommendations below.";
    }

    try { animateCounter($('stat-jd'), jdSkills.length); } catch (e) { }
    try { animateCounter($('stat-matched'), matched.length); } catch (e) { }
    try { animateCounter($('stat-missing'), missing.length); } catch (e) { }
    try { animateCounter($('stat-extra'), extra.length); } catch (e) { }

    if ($('matched-count')) $('matched-count').textContent = matched.length;
    if ($('missing-count')) $('missing-count').textContent = missing.length;
    if ($('extra-count')) $('extra-count').textContent = extra.length;

    try {
        renderDonutChart('donutChart', matched.length, missing.length, extra.length);
        if (categoryData.length) {
            renderRadarChart('radarChart', categoryData);
            renderBarChart('barChart', categoryData);
        }
    } catch (e) { console.warn('Chart render error:', e); }

    if (matchPct >= 80) setTimeout(() => showToast('success', '🤯 Incredible Match! Your ATS rating is elite!'), 600);
    else if (matchPct >= 50) setTimeout(() => showToast('info', '👍 Solid profile! Focus on acquiring missing keywords.'), 600);
    else setTimeout(() => showToast('error', '⚠️ Low Match. Heavily tailor your resume for this role.'), 600);

    renderSkillBadges('matched-badges', matched, 'matched');
    renderSkillBadges('missing-badges', missing, 'missing');
    renderSkillBadges('extra-badges', extra, 'extra');
    renderCategoryBreakdown(categoryData);
    renderRecommendations(recommendations);
    renderExplainability([...matched, ...extra]);

    // ── Resume Suggestions Panel ──────────────────────────────────────
    try {
        if (typeof analyzeResumeSuggestions === 'function') {
            const jdForSug = ($('jd-textarea')?.value || '');
            const sugs = analyzeResumeSuggestions(data.raw_text || '', jdForSug);
            renderSuggestions(sugs, 'sug-grid');
            if ($('suggestions-panel')) $('suggestions-panel').style.display = 'block';
        }
    } catch (e) { console.warn('Suggestions error:', e); }

    // ── Job Match Explanation Panel ───────────────────────────────────
    try {
        const expPanel = $('match-explain-panel');
        const whyGrid = $('match-why-grid');
        const foundRow = $('match-found-row');
        const missingRow = $('match-missing-row');
        if (expPanel && whyGrid) {
            expPanel.style.display = 'block';
            // Why cards
            const whyCards = [
                { label: 'Skills Matched', value: matched.length, color: 'var(--success)', barPct: Math.round(matched.length / Math.max(jdSkills.length, 1) * 100) },
                { label: 'Match Score', value: matchPct + '%', color: 'var(--accent-lt)', barPct: matchPct },
                { label: 'ATS Score', value: atsPct + '%', color: '#60a5fa', barPct: atsPct },
                { label: 'Skill Diversity', value: skillDiversityPct + '%', color: 'var(--warning)', barPct: skillDiversityPct },
            ];
            whyGrid.innerHTML = whyCards.map(c => `
                <div class="match-why-card">
                    <div class="match-why-label">${c.label}</div>
                    <div class="match-why-value" style="color:${c.color}">${c.value}</div>
                    <div class="match-why-bar-wrap">
                        <div class="match-why-bar" style="width:${c.barPct}%;background:${c.color}"></div>
                    </div>
                </div>`).join('');
            // Skill tags
            if (foundRow) foundRow.innerHTML = matched.slice(0, 12).map(s => {
                const name = s.name || s.skill || s;
                return `<span class="match-skill-tag match-tag-found">&#10003; ${name}</span>`;
            }).join('');
            if (missingRow) missingRow.innerHTML = missing.slice(0, 12).map(s => {
                const name = s.name || s.skill || s;
                return `<span class="match-skill-tag match-tag-missing">&#10005; ${name}</span>`;
            }).join('');
        }
    } catch (e) { console.warn('Match explain error:', e); }

    // Populate resume boxes — always show content
    const rawResumeText = data.raw_text || '';
    const optimizedResumeText = data.optimized_text || data.raw_text || '';

    const rawBox = $('raw-resume-box');
    const optBox = $('optimized-resume-box');

    if (rawBox) {
        if (rawResumeText && rawResumeText.trim().length > 0) {
            rawBox.textContent = rawResumeText;
            rawBox.style.whiteSpace = 'pre-wrap';
        } else {
            rawBox.innerHTML = '<span class="empty-note">Resume text could not be extracted. Please ensure the file is a readable PDF or TXT.</span>';
        }
    }

    if (optBox) {
        if (optimizedResumeText && optimizedResumeText.trim().length > 0) {
            optBox.textContent = optimizedResumeText;
            optBox.style.whiteSpace = 'pre-wrap';
        } else {
            optBox.innerHTML = '<span class="empty-note">Optimized resume could not be generated.</span>';
        }
    }

    document.querySelectorAll('.new-analysis-trigger, #new-analysis-btn').forEach(b => b.style.display = 'inline-flex');
    if ($('new-analysis-btn-bottom')) $('new-analysis-btn-bottom').style.display = 'inline-flex';
    if ($('copy-optimized-btn')) $('copy-optimized-btn').style.display = 'inline-flex';
    if ($('download-original-pdf-btn')) $('download-original-pdf-btn').style.display = 'inline-flex';
    if ($('download-optimized-pdf-btn')) $('download-optimized-pdf-btn').style.display = 'inline-flex';
    if ($('export-json-btn')) $('export-json-btn').style.display = 'inline-flex';
    if ($('export-html-btn')) $('export-html-btn').style.display = 'inline-flex';

    console.log('[SkillGapAI] Dashboard populated. Match:', matchPct + '%');
}

/* ═══════════════════════════════════════════════════════
   MAIN ANALYSIS FLOW
════════════════════════════════════════════════════════ */
async function performAnalysis() {
    hideError();

    const activeTab = document.querySelector('.tab-btn.active')?.dataset?.tab || 'paste';
    const jdPasteText = ($('jd-textarea')?.value || '').trim();

    if (!state.resumeFile) { showError('Please upload your resume to begin.'); return; }
    if (activeTab === 'paste' && !jdPasteText) { showError('Please paste the job description.'); return; }
    if (activeTab === 'file' && !state.jdFile) { showError('Please upload the job description file.'); return; }

    showSection('loading-section');

    try {
        setLoaderStep(1, 'Extracting and parsing resume data...');
        const jdText = activeTab === 'paste' ? jdPasteText : null;
        const resumeData = await parseFile(state.resumeFile, jdText);
        await new Promise(r => setTimeout(r, 700)); // Dramatic pause

        const rText = (resumeData.cleaned_text || resumeData.raw_text || resumeData.text || '').trim();
        if (!rText || rText.length < 5) throw new Error('Resume content is too short or unreadable. Please check the file.');

        setLoaderStep(2, 'Mapping technical requirements from JD...');
        let jdData = jdText;
        if (activeTab === 'file' && state.jdFile) {
            const jdParsed = await parseFile(state.jdFile);
            jdData = jdParsed.cleaned_text || jdParsed.raw_text || jdParsed.text || '';
        }
        await new Promise(r => setTimeout(r, 800));

        setLoaderStep(3, 'Running NLP matching algorithms...');
        await new Promise(r => setTimeout(r, 1200)); // Heavy processing simulation

        const results = analyzeGap(resumeData, jdData);

        // Attach resume text to results so populateDashboard can display it
        results.raw_text = resumeData.raw_text || rText;
        results.optimized_text = resumeData.optimized_text || resumeData.raw_text || rText;

        setLoaderStep(4, 'Generating skill roadmap and dashboard...');
        await new Promise(r => setTimeout(r, 600));

        populateDashboard(results);
        state.analysisResult = results;

        try { saveAnalysis(results, state.jdFile ? state.jdFile.name.replace(/\.[^/.]+$/, '') : 'JD Analysis'); } catch (e) { }

    } catch (err) {
        console.error('[SkillGapAI] Analysis failed:', err);
        showError(err.message || 'An unexpected error occurred. Please try again.', err.stack);
    }
}

/* ═══════════════════════════════════════════════════════
   INIT (runs when DOM is ready)
════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    console.log('[SkillGapAI] App initialized (non-module bundle)');

    // File inputs
    $('resume-input')?.addEventListener('change', e => handleFileSelection('resume', e.target.files[0]));
    $('jd-input')?.addEventListener('change', e => handleFileSelection('jd', e.target.files[0]));
    $('resume-remove')?.addEventListener('click', () => resetFile('resume'));
    $('jd-remove')?.addEventListener('click', () => resetFile('jd'));

    // Drag & drop
    bindDropZone('resume-dropzone', 'resume');
    bindDropZone('jd-dropzone', 'jd');

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const tab = $('tab-content-' + btn.dataset.tab);
            if (tab) tab.classList.add('active');
        });
    });

    // Char count
    const jdTextarea = $('jd-textarea');
    if (jdTextarea) jdTextarea.addEventListener('input', () => {
        if ($('char-count')) $('char-count').textContent = jdTextarea.value.length;
    });

    // Analyze button
    $('analyze-btn')?.addEventListener('click', performAnalysis);

    // Reset logic
    const resetLogic = () => {
        resetFile('resume'); resetFile('jd');
        if (jdTextarea) jdTextarea.value = '';
        if ($('char-count')) $('char-count').textContent = '0';
        document.querySelectorAll('.new-analysis-trigger, #new-analysis-btn').forEach(b => b.style.display = 'none');
        hideError();
        showSection('upload-section');
    };

    if ($('new-analysis-btn')) $('new-analysis-btn').addEventListener('click', resetLogic);
    if ($('new-analysis-btn-bottom')) $('new-analysis-btn-bottom').addEventListener('click', resetLogic);

    // PDF export
    if ($('export-pdf-btn')) $('export-pdf-btn').addEventListener('click', () => {
        if (state.analysisResult) exportToPDF(state.analysisResult);
    });

    // JSON export
    if ($('export-json-btn')) $('export-json-btn').addEventListener('click', () => {
        if (!state.analysisResult) return;
        const a = document.createElement('a');
        a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.analysisResult, null, 2));
        a.download = 'SkillGapAI_Data.json';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    });

    // HTML report export
    if ($('export-html-btn')) $('export-html-btn').addEventListener('click', () => {
        if (!state.analysisResult) return;
        const html = generateHTMLReport(state.analysisResult);
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'SkillGapAI_Full_Report.html';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Copy optimized resume
    if ($('copy-optimized-btn')) {
        $('copy-optimized-btn').addEventListener('click', () => {
            const text = $('optimized-resume-box').textContent;
            navigator.clipboard.writeText(text).then(() => {
                showToast('success', 'Optimized resume copied to clipboard!');
            });
        });
    }

    // Individual resume PDF downloads — use shared helper in pdf-export.js
    if ($('download-original-pdf-btn')) {
        $('download-original-pdf-btn').addEventListener('click', () =>
            downloadResumePDF('raw-resume-box', 'Original_Resume_SkillGapAI.pdf', [99, 102, 241])
        );
    }
    if ($('download-optimized-pdf-btn')) {
        $('download-optimized-pdf-btn').addEventListener('click', () =>
            downloadResumePDF('optimized-resume-box', 'AI_Optimized_Resume_SkillGapAI.pdf', [16, 185, 129])
        );
    }

    document.querySelectorAll('#logout-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('info', 'Logging out securely...');
            localStorage.removeItem('user_session');
            setTimeout(() => window.location.href = 'index.html', 1200);
        });
    });

    // Backend status check (non-blocking)
    fetch(BACKEND_URL.replace('/api/extract', '/'), { method: 'HEAD', signal: AbortSignal.timeout ? AbortSignal.timeout(2000) : undefined })
        .then(() => console.log('[SkillGapAI] Backend: ONLINE'))
        .catch(() => console.warn('[SkillGapAI] Backend: OFFLINE — local fallback will be used'));

    // ── COMPARE MODE ──
    const cmpState = { fileA: null, fileB: null };

    function setupCompareDropzone(dzId, inputId, nameId, stateKey) {
        const dz = $(dzId);
        const input = $(inputId);
        if (!dz || !input) return;

        input.addEventListener('change', () => {
            const file = input.files[0];
            if (!file) return;
            cmpState[stateKey] = file;
            dz.classList.add('file-loaded');
            if ($(nameId)) $(nameId).textContent = file.name;
            checkCmpReady();
        });

        dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag-over'); });
        dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
        dz.addEventListener('drop', e => {
            e.preventDefault();
            dz.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (!file) return;
            cmpState[stateKey] = file;
            dz.classList.add('file-loaded');
            if ($(nameId)) $(nameId).textContent = file.name;
            checkCmpReady();
        });
    }

    function checkCmpReady() {
        const btn = $('compare-btn');
        if (btn) btn.disabled = !(cmpState.fileA && cmpState.fileB);
    }

    setupCompareDropzone('compare-dz-a', 'compare-input-a', 'compare-name-a', 'fileA');
    setupCompareDropzone('compare-dz-b', 'compare-input-b', 'compare-name-b', 'fileB');

    if ($('compare-btn')) {
        $('compare-btn').addEventListener('click', async () => {
            if (!cmpState.fileA || !cmpState.fileB) return;
            const btn = $('compare-btn');
            const resultPanel = $('compare-result');
            
            const activeTab = document.querySelector('.tab-btn.active')?.dataset?.tab || 'paste';
            const jdPasteText = $('jd-textarea')?.value?.trim() || '';

            btn.disabled = true;
            btn.textContent = 'Comparing...';
            if (resultPanel) resultPanel.innerHTML = `
                <div class="skeleton-card">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-line"></div>
                    <div class="skeleton skeleton-line" style="width:70%"></div>
                    <div class="skeleton skeleton-line" style="width:85%"></div>
                </div>`;

            try {
                let parsedJdText = jdPasteText;
                if (activeTab === 'file' && state.jdFile) {
                    const jdParsed = await parseFile(state.jdFile);
                    parsedJdText = jdParsed.cleaned_text || jdParsed.raw_text || jdParsed.text || '';
                }
                
                if (!parsedJdText) {
                    throw new Error('Please provide a job description (paste text or upload a file).');
                }

                const [parsedA, parsedB] = await Promise.all([
                    parseFile(cmpState.fileA, parsedJdText),
                    parseFile(cmpState.fileB, parsedJdText),
                ]);
                const textA = parsedA.cleaned_text || parsedA.raw_text || '';
                const textB = parsedB.cleaned_text || parsedB.raw_text || '';

                const dataA = analyzeGap(textA, parsedJdText);
                const dataB = analyzeGap(textB, parsedJdText);

                if (typeof compareResumes === 'function' && typeof renderComparePanel === 'function') {
                    const cmpResult = compareResumes(dataA, dataB, cmpState.fileA.name, cmpState.fileB.name);
                    renderComparePanel(cmpResult, 'compare-result');
                } else {
                    resultPanel.innerHTML = '<p style="color:var(--danger)">Compare module not loaded.</p>';
                }
            } catch (err) {
                if (resultPanel) resultPanel.innerHTML = `<p style="color:var(--danger)">Compare failed: ${err.message}</p>`;
            } finally {
                btn.disabled = false;
                btn.textContent = 'Compare Resumes';
            }
        });
    }
});
