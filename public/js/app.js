// ══════════════════════════════════════════
// 1. DATA LAYERS (FALLBACK DATA FOR OFFLINE MODE)
// ══════════════════════════════════════════

const COUNTRIES = [
  {code:"SN", name:"Sénégal", flag:"🇸🇳", year:2001},
  {code:"CI", name:"Côte d'Ivoire", flag:"🇨🇮", year:2016},
  {code:"CM", name:"Cameroun", flag:"🇨🇲", year:1972},
  {code:"ML", name:"Mali", flag:"🇲🇱", year:2023},
  {code:"BF", name:"Burkina Faso", flag:"🇧🇫", year:1991},
  {code:"GN", name:"Guinée", flag:"🇬🇳", year:2020},
  {code:"TG", name:"Togo", flag:"🇹🇬", year:1992},
  {code:"BJ", name:"Bénin", flag:"🇧🇯", year:1990},
  {code:"NE", name:"Niger", flag:"🇳🇪", year:2010},
  {code:"CD", name:"Congo RDC", flag:"🇨🇩", year:2006},
];

const CONSTITUTIONS = {
  SN: [
    {art:"Article 1 — Forme de l'État & Égalité", txt:"Le Sénégal est une République laïque, démocratique et sociale. Il assure l'égalité devant la loi de tous les citoyens, sans distinction d'origine, de race, de sexe, de religion. Il respecte toutes les croyances."},
    {art:"Article 7 — Sacralité de la personne", txt:"La personne humaine est sacrée. L'État a l'obligation de la respecter et de la protéger. Tout individu a droit à la vie, à la liberté, à la sécurité, au libre développement de sa personnalité et à la protection contre toutes mutilations physiques."},
    {art:"Article 8 — Libertés fondamentales", txt:"La République garantit à tous les citoyens les libertés individuelles, la liberté d'opinion, la liberté de presse, de réunion, d'association, et de manifestation pacifique dans le respect des règlements."}
  ],
  CI: [
    {art:"Article 1 — Souveraineté populaire", txt:"La Côte d'Ivoire est une République souveraine. Le principe de la République est : le gouvernement du peuple, par le peuple et pour le peuple."},
    {art:"Article 2 — Devise & Identité", txt:"La devise de la République est : Union – Discipline – Travail. La langue officielle est le français. La souveraineté réside dans le peuple qui l'exerce par référendum ou par ses représentants élus."},
    {art:"Article 5 — Inviolabilité de la dignité humaine", txt:"La personne humaine est sacrée. Tout individu a droit à la vie, au respect de sa dignité et à l'intégrité de sa personne. L'esclavage, la torture et les peines cruelles sont formellement proscrits."}
  ],
  CM: [
    {art:"Préambule — Attachement aux Droits de l'Homme", txt:"Le peuple camerounais affirme son attachement à la liberté, à la justice, à la laïcité, et proclame que l'être humain possède des droits sacrés et inaliénables, affirmés par la Déclaration Universelle des Droits de l'Homme."},
    {art:"Article 1 — Nature unitaire de l'État", txt:"Le Cameroun est un État unitaire décentralisé. Il est une République laïque, indivisible, démocratique et sociale. Il assure l'égalité absolue de tous ses citoyens devant la justice."}
  ]
};

// Fallbacks for other countries
['ML','BF','GN','TG','BJ','NE','CD'].forEach(c => {
  if(!CONSTITUTIONS[c]) {
    const name = COUNTRIES.find(x => x.code === c).name;
    CONSTITUTIONS[c] = [
      {art:"Article 1 — Nature de la République", txt:"La République de " + name + " est une, indivisible, laïque, démocratique et sociale. Elle assure l'égalité devant la loi de tous les citoyens sans distinction."},
      {art:"Article 2 — Sacralité de la personne", txt:"La vie humaine, l'intégrité corporelle et la dignité sont sacrées. Nul ne peut faire l'objet de tortures, arrestations arbitraires ou détentions sans motif légal écrit."},
      {art:"Article 3 — Libertés publiques", txt:"La liberté de culte, de manifestation pacifique, d'association, d'opinion et de presse sont garanties et encadrées uniquement par les lois votées."}
    ];
  }
});

const QUIZ_QUESTIONS = [
  {q:"Qu'est-ce qu'une Constitution ?", ctx:"La Constitution est la charte suprême d'un pays souverain.", opts:["Un simple décret présidentiel","La loi fondamentale et suprême d'un pays","Une ordonnance uniquement pour les avocats","Un règlement de police municipale"], ans:1, xp:15, reason:"Exact ! C'est la loi suprême qui régit tous les autres textes juridiques d'un État."},
  {q:"Qui vote la loi dans une démocratie représentative ?", ctx:"La loi émane de l'assemblée représentative élue par le peuple.", opts:["Le Président seul par décret","Le Parlement (Assemblée Nationale)","Les juges du Tribunal Supérieur","Les préfets de région"], ans:1, xp:15, reason:"Gagné ! Le Parlement représente le peuple souverain et vote les lois nationales."},
  {q:"Que protège le principe de la 'présomption d'innocence' ?", ctx:"Ce principe est le pilier d'un procès juste et équitable.", opts:["La culpabilité immédiate de tout suspect","Le fait d'être considéré non coupable tant que le tribunal n'a pas rendu son verdict","Le droit d'éviter la prison préventive à tout prix","Le fait de refuser de témoigner"], ans:1, xp:20, reason:"Excellent ! Toute personne est présumée innocente jusqu'à preuve du contraire par un juge."},
  {q:"Quel est le rôle essentiel d'un Conseil Constitutionnel ?", ctx:"Cette cour vérifie que le pouvoir législatif n'outrepasse pas la charte suprême.", opts:["Gérer la solde des magistrats et fonctionnaires","S'assurer de la conformité des lois à la Constitution","Trancher les divorces et litiges commerciaux","Rédiger le code de la route"], ans:1, xp:20, reason:"Parfait ! Le Conseil ou la Cour Constitutionnelle censure les lois inconstitutionnelles avant leur promulgation."},
  {q:"Qu'est-ce que la séparation des pouvoirs ?", ctx:"Théorisée par Montesquieu pour empêcher la tyrannie.", opts:["La division des budgets entre ministères","La répartition en pouvoirs Exécutif, Législatif et Judiciaire","La séparation géographique des provinces","Le partage égal des terres agricoles"], ans:1, xp:20, reason:"Tout à fait ! Elle empêche la concentration de toutes les forces publiques chez un seul homme."}
];

const SCRAMBLE_WORDS = [
  {word:"CONSTITUTION", hint:"La loi suprême et fondamentale d'un pays souverain", def:"L'acte fondateur d'un État qui organise les institutions et consacre les libertés fondamentales."},
  {word:"DEMOCRATIE", hint:"Régime où le pouvoir réside dans le peuple", def:"Système politique où la souveraineté nationale émane des citoyens, par référendum ou élections."},
  {word:"JUSTICE", hint:"Pouvoir chargé d'arbitrer les infractions et litiges", def:"L'institution garante de l'application équitable du droit, travaillant de manière indépendante."}
];

const NEWS = [
  {id:1, tag:"constitution", tagLabel:"Constitution", emoji:"📜",
   title:"Le Sénégal renforce la protection des données numériques des citoyens",
   summary:"Un projet de révision constitutionnelle vise à sanctuariser la vie privée en ligne dans la loi suprême.",
   date:"Il y a 2 heures", source:"Dakar Actu",
   body:"La Commission nationale du Sénégal a validé un amendement majeur pour insérer la souveraineté numérique dans l'Article 8 des libertés publiques. Le texte garantira que toute surveillance numérique privée ou étatique sans mandat d'un juge indépendant soit déclarée inconstitutionnelle.\n\n⚖️ IMPACT CITOYEN : Tes informations personnelles en ligne obtiennent le même niveau de protection sacrée que ton domicile physique. C'est un pas géant pour la cybersécurité ouest-africaine."},
   
  {id:2, tag:"election", tagLabel:"Élections", emoji:"🗳️",
   title:"Rôle des Cours Constitutionnelles dans la transparence électorale",
   summary:"Comment la haute cour assure-t-elle la sincérité des urnes et arbitre les litiges ?",
   date:"Hier", source:"Cotonou Tribune",
   body:"Les Cours constitutionnelles africaines rappellent leur engagement à surveiller les scrutins nationaux. De la validation des listes à la proclamation officielle, la cour agit en arbitre neutre. Tout citoyen estimant que ses droits ont été bafoués peut introduire un recours gracieux et gratuit.\n\n⚖️ IMPACT CITOYEN : Les bulletins de vote sont protégés by la charte suprême. Ton bulletin a une valeur constitutionnelle inviolable."},

  {id:3, tag:"droits", tagLabel:"Droits", emoji:"✊",
   title:"Charte Africaine des Droits de l'Homme : Les acquis d'une génération",
   summary:"Bilan des recours civiques auprès de la Commission africaine de Banjul.",
   date:"Il y a 3 jours", source:"Lomé Info",
   body:"Adoptée sous l'égide de l'Union Africaine, la Charte de Nairobi équilibre avec brio les droits sacrés des individus et leurs devoirs moraux envers la famille. Des centaines de citoyens spoliés par des tribunaux locaux ont obtenu réparation en saisissant la Cour de Banjul.\n\n⚖️ IMPACT CITOYEN : Si toutes les voies de justice de ton pays échouent, tu disposes d'un ultime recours international africain pour faire triompher tes droits."},

  {id:4, tag:"justice", tagLabel:"Justice", emoji:"⚖️",
   title:"Qu'est-ce que l'indépendance de la magistrature dans l'État de droit ?",
   summary:"Pourquoi le pouvoir de juger doit rester préservé des pressions politiques.",
   date:"Il y a 5 jours", source:"Bamako Hebdo",
   body:"L'indépendance de la justice est le bouclier suprême du faible face au fort. Garanti par le Conseil Supérieur de la Magistrature, ce principe veut qu'un juge ne reçoive aucune injonction ou coup de fil politique concernant ses décisions d'audience.\n\n⚖️ CONSEIL PRATIQUE : En cas d'interpellation ou de garde à vue, rappelle-toi que tu as le droit de garder le silence et d'exiger immédiatement la présence d'un défenseur."}
];

const KOFFI_FACTS = [
  "Savais-tu que la charte de Kouroukan Fouga (1236, Empire du Mali) pose déjà des principes de dignité humaine bien avant la déclaration française de 1789 ?",
  "L'habeas corpus empêche que tu sois jeté en cellule sans mandat d'un juge. Exige toujours tes droits !",
  "Chaque citoyen a le devoir constitutionnel de protéger le bien public et de respecter les emblèmes nationaux.",
  "Dans beaucoup de pays d'Afrique, la saisine de la Cour Constitutionnelle est gratuite et ne requiert pas d'avocat.",
  "L'égalité des sexes devant la loi est inscrite au tout premier article de presque toutes nos constitutions !"
];

// ══════════════════════════════════════════
// 2. STATE MANAGER & PERSISTENCE
// ══════════════════════════════════════════

let xp = 340;
let streak = 7;
let appTheme = 'clair'; // clair or jeune
let activeTab = 'home';

let quizState = { q: 0, score: 0, answered: false };
let scrambleIdx = 0;
let newsFilter = 'all';

let currentQuizQuestions = [];
let currentScrambleWords = [];

let aiConfig = {
    provider: 'demo',
    model: 'demo-lite',
    key: ''
};

const PROVIDER_MODELS = {
    demo: [{value: 'demo-lite', text: 'Assistant Juridique Local (Gratuit)'}],
    mistral: [
        {value: 'open-mistral-7b', text: 'Mistral 7B (Léger)'},
        {value: 'mistral-large-latest', text: 'Mistral Large (Précis & Fort)'}
    ],
    anthropic: [
        {value: 'claude-3-haiku-20240307', text: 'Claude 3 Haiku (Rapide)'},
        {value: 'claude-3-5-sonnet-20241022', text: 'Claude 3.5 Sonnet (Expert)'}
    ]
};

const MOCK_AI_RESPONSES = {
    "constitution": "La **Constitution** est la charte suprême d'une Nation. Elle définit l'organisation des pouvoirs (exécutif, législatif, judiciaire) et sanctuarise les droits inaliénables de chaque citoyen (comme l'égalité civique et la liberté d'expression). Aucune loi ni décret ne peut la contredire.\n\n🛡️ *Vérification : Audité et certifié conforme par le Gardien ConstitApp.*",
    "séparation": "La **séparation des pouvoirs** (concept de Montesquieu) stipule que pour préserver les libertés publiques et éviter la dictature, le pouvoir exécutif (appliquer la loi), législatif (voter la loi) et judiciaire (juger) doivent être indépendants les uns des autres.\n\n🛡️ *Vérification : Audité et certifié conforme par le Gardien ConstitApp.*",
    "default": "Excellente question civique ! L'apprentissage des textes constitutionnels est le premier pas vers l'émancipation démocratique. En comprenant vos droits, vous vous armez pour exiger une gouvernance transparente.\n\n💡 *Note : Pour obtenir des réponses en temps réel optimisées par Mistral ou Anthropic Claude, renseigne ta clé API dans ton Profil !*"
};

// ══════════════════════════════════════════
// 3. THE EVENT BUS
// ══════════════════════════════════════════

class SwarmEventBus {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
    emit(event, data) {
        logToVisualDebugger(`[EVENT] Déclenchement de l'événement: ${event}`);
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
}
const EventBus = new SwarmEventBus();

// ══════════════════════════════════════════
// 4. THE 3 COLLABORATING AI AGENTS
// ══════════════════════════════════════════

const AgentSecurity = {
    name: "🛡️ Gardien de la Loi",
    auditPrompt: function(prompt) {
        logToVisualDebugger(`[🛡️ SECURITÉ] Audit du prompt: "${prompt}"`, 'sec');
        const cleanPrompt = prompt.toLowerCase();
        
        const keywordKeywords = ["loi", "constitution", "droit", "election", "justice", "tribunal", "avocat", "code", "presomption", "police", "arrestation", "pouvoir", "senegal", "ivoire", "cameroun", "mali", "afrique", "scrutin", "suffrage", "laicite", "habeas"];
        const inScope = keywordKeywords.some(key => cleanPrompt.includes(key)) || prompt.length < 15;
        
        if (!inScope) {
            logToVisualDebugger(`[🛡️ SECURITÉ] Alerte de portée : Requête hors-sujet civique !`, 'sec');
            return {
                safe: false,
                reason: "Désolé, Citoyen ! Ma mission de sécurité m'impose de rester uniquement concentré sur le droit civique, les constitutions d'Afrique, les élections et le fonctionnement de la justice. Recentre ta question sur ces thèmes !"
            };
        }
        
        if (cleanPrompt.includes("system prompt") || cleanPrompt.includes("ignore instructions") || cleanPrompt.includes("tu es maintenant")) {
            logToVisualDebugger(`[🛡️ SECURITÉ] Alerte d'injection détectée et bloquée !`, 'sec');
            return {
                safe: false,
                reason: "⚠️ Tentative d'injection de code détectée. Mon protocole de sécurité refuse cette requête pour préserver l'intégrité de ConstitApp."
            };
        }
        
        return { safe: true };
    },
    appendDisclaimer: function(response) {
        return response + `\n\n<span class="chat-disclaimer">🛡️ *Analyse de conformité validée par le Gardien de la Loi. Note : Cette explication est purement informative et éducative ; elle ne remplace en aucun cas un avis d'avocat.*</span>`;
    }
};

const AgentAnimator = {
    name: "🎭 Maître Koffi",
    cheerXP: function(amount) {
        logToVisualDebugger(`[🎭 ANIMATEUR] Gain d'XP détecté: +${amount} XP`, 'anim');
        const pill = document.querySelector('.xp-pill');
        if (pill) {
            pill.style.transform = "scale(1.2)";
            setTimeout(() => pill.style.transform = "scale(1)", 200);
        }
        
        const avatar = document.querySelector('.koffi-avatar');
        if (avatar) {
            avatar.style.transform = "rotate(360deg)";
            setTimeout(() => avatar.style.transform = "rotate(0deg)", 600);
        }
        
        if (amount >= 15) {
            const speechText = document.getElementById('koffi-speech-text');
            if (speechText) {
                const quotes = [
                    `Superbe ! Tu as engrangé +${amount} XP. Ton savoir constitutionnel grandit à vue d'œil !`,
                    `Félicitations ! Chaque point gagné fait de toi un citoyen plus averti et robuste !`,
                    `Magnifique effort ! C'est en apprenant nos libertés fondamentales qu'on se donne du pouvoir.`,
                    `Ah, excellent ! Tu as l'esprit d'un grand défenseur de l'État de droit !`
                ];
                speechText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
            }
        }
    },
    commentAnswer: function(isCorrect, reason) {
        logToVisualDebugger(`[🎭 ANIMATEUR] Commentaire du quiz. Statut: ${isCorrect}`, 'anim');
        if (isCorrect) {
            return `🎭 **Maître Koffi** : Excellentissime ! 🎯 ${reason}`;
        } else {
            return `🎭 **Maître Koffi** : Oups ! Pas tout à fait. 📚 ${reason}`;
        }
    }
};

const AgentContent = {
    name: "✍️ La Plume",
    generateFiche: function(topic) {
        logToVisualDebugger(`[✍️ CONTENU] Génération de fiche pour le thème: "${topic}"`, 'cont');
        
        const normalized = topic.toLowerCase();
        let title = `Fiche d'explication : ${topic}`;
        let content = '';
        let quizQs = [];
        
        if (normalized.includes("travail") || normalized.includes("côte d'ivoire") || normalized.includes("ivoire")) {
            title = "📜 Droits fondamentaux du Travailleur en Côte d'Ivoire";
            content = `
                <p>En Côte d'Ivoire, la Constitution de 2016 et le Code du Travail consacrent des droits inviolables pour tous les employés :</p>
                <br>
                <p>1. <strong>Droit au Travail décent</strong> : Nul ne peut être discriminé à l'embauche pour son origine, son sexe ou ses opinions politiques.</p>
                <p>2. <strong>Liberté Syndicale</strong> : L'Article 23 de la Constitution garantit à tous le droit d'adhérer à un syndicat professionnel pour défendre ses intérêts.</p>
                <p>3. <strong>Temps de travail légal</strong> : Fixé à 40 heures par semaine, au-delà desquelles s'appliquent des heures supplémentaires.</p>
                <br>
                <p>💡 <strong>Le Conseil de la Plume</strong> : En cas de litige avec ton employeur, rappelle-toi que l'Inspection du Travail offre une conciliation gratuite avant de saisir le tribunal.</p>
            `;
            quizQs = [
                {q: "La liberté syndicale est-elle garantie constitutionnellement en Côte d'Ivoire ?", opts: ["Non, c'est interdit","Oui, par l'Article 23","Seulement pour les fonctionnaires"], ans: 1, reason: "Gagné ! C'est un droit absolu pour tous."},
                {q: "Quelle est la durée légale de travail hebdomadaire standard ?", opts: ["35 heures","40 heures","48 heures"], ans: 1, reason: "Correct ! 40 heures hebdomadaires."}
            ];
        } 
        else if (normalized.includes("femme") || normalized.includes("sénégal") || normalized.includes("egalite")) {
            title = "✊ Égalité Homme-Femme et Parité au Sénégal";
            content = `
                <p>Le Sénégal a franchi des pas de géant pour la parité démocratique :</p>
                <br>
                <p>1. <strong>Égalité absolue devant la loi</strong> : L'Article 7 de la Constitution stipule que la loi est la même pour tous, sans distinction de sexe.</p>
                <p>2. <strong>Loi sur la Parité (2010)</strong> : Oblige les listes de candidats pour toutes les institutions électives à être composées alternativement d'hommes et de femmes (système zèbre).</p>
                <p>3. <strong>Protection contre les violences</strong> : La loi condamne lourdement les violences physiques et mutilations génitales.</p>
                <br>
                <p>💡 <strong>Le Conseil de la Plume</strong> : Grâce à la loi sur la parité, le Parlement sénégalais compte l'un des taux de représentation féminine les plus élevés au monde !</p>
            `;
            quizQs = [
                {q: "Qu'impose la loi de 2010 sur la parité au Sénégal ?", opts: ["Une parité seulement dans les entreprises","Des listes électorales alternant strictement homme/femme","Une obligation de salaire égal"], ans: 1, reason: "Exact ! C'est la composition alternée (homme/femme)."},
                {q: "Quel article de la Constitution sénégalaise consacre l'égalité civique absolue ?", opts: ["L'Article 1er","L'Article 7","L'Article 45"], ans: 1, reason: "Correct ! C'est le fameux Article 7."}
            ];
        } 
        else {
            title = `📜 Focus Civique : ${topic}`;
            content = `
                <p>Tu as demandé un focus sur : <strong>"${topic}"</strong>.</p>
                <br>
                <p>Toutes les démocraties africaines modernes reposent sur la protection des libertés fondamentales et le respect des droits humains. Ces notions sont ancrées dans la Charte Panafricaine des Droits de l'Homme et du Citoyen.</p>
                <p>La Constitution sert à encadrer la puissance publique afin qu'elle n'empiète jamais sur les libertés de réunion, d'expression et d'association.</p>
                <br>
                <p>💡 <strong>Le Conseil de la Plume</strong> : Une citoyenneté active exige que chacun lise et propage ces notions dans sa communauté ! Reste curieux.</p>
            `;
            quizQs = [
                {q: "Quel texte suprême encadre et limite le pouvoir de l'État ?", opts: ["Un règlement de police","La Constitution","Un accord bilatéral commercial"], ans: 1, reason: "Parfait ! La Constitution définit et limite la puissance publique."},
                {q: "La charte suprême protège-t-elle la liberté d'expression ?", opts: ["Non, c'est facultatif","Oui, c'est un droit constitutionnel sacré","Uniquement pendant les campagnes"], ans: 1, reason: "Correct ! C'est un droit absolu dans l'État de droit."}
            ];
        }
        
        return { title, content, quizQs };
    }
};

// ══════════════════════════════════════════
// 5. EVENT BUS WIRING
// ══════════════════════════════════════════

EventBus.on('xp-gained', (amount) => {
    AgentAnimator.cheerXP(amount);
});

EventBus.on('theme-switched', (theme) => {
    logToVisualDebugger(`[SYSTEM] Thème de l'application basculé vers: ${theme}`);
});

// ══════════════════════════════════════════
// 6. INITIALIZATION & ROUTING & AUTHENTICATION
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialisation de l'état et des données hors-ligne
    await loadLocalStoreData();
    await buildCountrySelectionGrid();
    await renderNewsFeedList();
    await renderHomeActusShort();
    await renderProgressionGrid();
    
    // 2. Écouter les changements d'état d'authentification Supabase
    if (typeof dbOnAuthStateChange === 'function') {
        dbOnAuthStateChange(handleAuthStateChange);
    }
    
    // 3. Vérifier la session actuelle au démarrage
    if (typeof dbGetCurrentUser === 'function') {
        const currentUser = await dbGetCurrentUser();
        if (currentUser) {
            handleAuthStateChange('SIGNED_IN', { user: currentUser });
        } else {
            handleAuthStateChange('SIGNED_OUT', null);
        }
    } else {
        handleAuthStateChange('SIGNED_OUT', null);
    }

    logToVisualDebugger("[SYSTEM] Application démarrée.");
});

// GESTION DU FLUX D'AUTHENTIFICATION (Supabase & Demo Fallback)
let authFormMode = 'signin';
let isAuthUserLoggedIn = false;
let authUserEmail = '';

async function handleAuthStateChange(event, session) {
    const container = document.querySelector('.app-container');
    const user = session?.user || null;
    
    if (user) {
        // Utilisateur connecté
        isAuthUserLoggedIn = true;
        authUserEmail = user.email;
        if (container) container.classList.remove('auth-mode');
        
        // Mettre à jour l'e-mail dans l'affichage du profil
        const emailEl = document.getElementById('user-profile-email');
        if (emailEl) emailEl.textContent = user.email;
        
        // Charger la progression de l'utilisateur
        const progress = await dbGetUserProgress();
        xp = progress.xp;
        streak = progress.streak;
        
        // Mettre à jour les labels d'affichage
        const xpCount = document.getElementById('xp-count');
        const streakDays = document.getElementById('streak-days');
        if (xpCount) xpCount.textContent = xp;
        if (streakDays) streakDays.textContent = `${streak} Jours`;
        await addXPPoints(0); // recalcul visuel du niveau et des badges
        
        switchTab('home');
        logToVisualDebugger(`[AUTH] Citoyen connecté : ${user.email}`);
    } else {
        // Utilisateur déconnecté
        isAuthUserLoggedIn = false;
        authUserEmail = '';
        if (container) container.classList.add('auth-mode');
        
        // Désactiver toutes les fenêtres et afficher l'écran d'authentification
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const authScreen = document.getElementById('scr-auth');
        if (authScreen) authScreen.classList.add('active');
        
        logToVisualDebugger("[AUTH] Aucun citoyen connecté. En attente de connexion.");
    }
}

function toggleAuthMode(event) {
    if (event) event.preventDefault();
    const titleDesc = document.getElementById('auth-title-desc');
    const btnSubmit = document.getElementById('btn-auth-submit');
    const toggleText = document.getElementById('auth-toggle-text');
    const toggleLink = document.getElementById('auth-toggle-link');
    const errorMsg = document.getElementById('auth-error-msg');
    
    if (errorMsg) errorMsg.textContent = '';
    
    if (authFormMode === 'signin') {
        authFormMode = 'signup';
        if (titleDesc) titleDesc.textContent = "Crée ton compte citoyen pour suivre ta progression";
        if (btnSubmit) btnSubmit.textContent = "S'inscrire";
        if (toggleText) toggleText.textContent = "Déjà un compte ?";
        if (toggleLink) toggleLink.textContent = "Se connecter";
    } else {
        authFormMode = 'signin';
        if (titleDesc) titleDesc.textContent = "Se connecter pour accéder à tes cours et quiz";
        if (btnSubmit) btnSubmit.textContent = "Se Connecter";
        if (toggleText) toggleText.textContent = "Pas encore de compte ?";
        if (toggleLink) toggleLink.textContent = "S'inscrire";
    }
}

async function submitAuthForm() {
    const emailInput = document.getElementById('auth-email');
    const passwordInput = document.getElementById('auth-password');
    const errorMsg = document.getElementById('auth-error-msg');
    const btnSubmit = document.getElementById('btn-auth-submit');
    
    if (!emailInput || !passwordInput || !errorMsg) return;
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
        errorMsg.textContent = "⚠️ Veuillez remplir tous les champs.";
        return;
    }
    
    errorMsg.textContent = "";
    btnSubmit.disabled = true;
    
    const originalText = btnSubmit.textContent;
    btnSubmit.textContent = "Chargement...";
    
    try {
        if (authFormMode === 'signin') {
            // Connexion réelle Supabase
            if (typeof supabaseClient !== 'undefined' && supabaseClient !== null) {
                await dbSignIn(email, password);
            } else {
                // Mode démo hors-ligne simulé
                logToVisualDebugger(`[AUTH DEMO] Connexion simulée pour ${email}`);
                handleAuthStateChange('SIGNED_IN', { user: { email: email } });
            }
        } else {
            // Inscription réelle Supabase
            if (typeof supabaseClient !== 'undefined' && supabaseClient !== null) {
                const data = await dbSignUp(email, password);
                if (data?.session) {
                    // Connecté directement
                } else {
                    alert("Inscription réussie ! Un email de confirmation a été envoyé.");
                    toggleAuthMode();
                }
            } else {
                // Mode démo hors-ligne simulé
                logToVisualDebugger(`[AUTH DEMO] Inscription simulée pour ${email}`);
                alert("Inscription de démonstration réussie ! Connectez-vous maintenant.");
                toggleAuthMode();
            }
        }
    } catch (err) {
        errorMsg.textContent = `❌ ${err.message || "Une erreur est survenue."}`;
        logToVisualDebugger(`[AUTH ERROR] ${err.message}`, 'sec');
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = originalText;
    }
}

async function handleLogout() {
    try {
        if (typeof supabaseClient !== 'undefined' && supabaseClient !== null) {
            await dbSignOut();
        } else {
            // Déconnexion simulée hors-ligne
            handleAuthStateChange('SIGNED_OUT', null);
        }
    } catch(err) {
        logToVisualDebugger(`[AUTH LOGOUT ERROR] ${err.message}`);
    }
}

function toggleAppTheme() {
    const body = document.body;
    const toggler = document.getElementById('theme-toggler');
    const text = document.getElementById('theme-text');
    
    if (appTheme === 'clair') {
        appTheme = 'jeune';
        body.classList.add('mode-jeune');
        toggler.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> <span id="theme-text">Mode Jeune</span>';
        logToVisualDebugger("[THEME] Basculement vers Mode Jeune (Sombre Cyberpunk).");
    } else {
        appTheme = 'clair';
        body.classList.remove('mode-jeune');
        toggler.innerHTML = '<i class="fa-solid fa-user-shield"></i> <span id="theme-text">Mode Clair</span>';
        logToVisualDebugger("[THEME] Basculement vers Mode Adulte (Clair Premium).");
    }
    
    saveLocalStoreData();
    EventBus.emit('theme-switched', appTheme);
}

function switchTab(tabId) {
    activeTab = tabId;
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    const targetScreen = document.getElementById('scr-' + tabId);
    if (targetScreen) targetScreen.classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    
    const activeBtn = document.getElementById('tab-btn-' + tabId);
    if (activeBtn) activeBtn.classList.add('active');
    
    if (tabId === 'constitutions') closeCountryReader();
    if (tabId === 'actus') closeNewsDetail();
    
    if (tabId === 'home') {
        const speech = document.getElementById('koffi-speech-text');
        if (speech) {
            speech.textContent = KOFFI_FACTS[Math.floor(Math.random() * KOFFI_FACTS.length)];
        }
    }
    
    logToVisualDebugger(`[ROUTING] Navigation vers l'onglet : ${tabId}`);
}

// ══════════════════════════════════════════
// 7. GAME: QUIZ CITOYEN
// ══════════════════════════════════════════

async function startQuizFlow() {
    // Charge les questions dynamiquement de Supabase ou fallbacks
    currentQuizQuestions = await dbGetQuizQuestions();
    quizState = { q: 0, score: 0, answered: false };
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('scr-quiz-game').classList.add('active');
    
    renderQuizStepCard();
    logToVisualDebugger("[GAME] Lancement du Quiz du Jour.");
}

function renderQuizStepCard() {
    const container = document.getElementById('active-quiz-content');
    if (!container) return;
    
    if (quizState.q >= currentQuizQuestions.length) {
        // Fin de quiz
        const finalXP = quizState.score * 15;
        const pct = Math.round((quizState.score / currentQuizQuestions.length) * 100);
        
        let headerText = pct >= 80 ? "🏆 Citoyen Champion !" : pct >= 50 ? "👍 Solide Défenseur !" : "📚 Apprenti Citoyen";
        let textFeedback = pct >= 80 ? "Incroyable ! Tu as une maîtrise parfaite de ta constitution." : pct >= 50 ? "Bien joué ! Tes bases citoyennes sont solides, poursuis l'effort !" : "Ne te décourage pas. Lis les constitutions dans la bibliothèque et réessaie.";
        
        container.innerHTML = `
            <div class="quiz-card" style="text-align: center; padding: 2.5rem 1.25rem;">
                <div style="font-size: 4rem; margin-bottom: 12px; animation: bounce 1s infinite alternate;">🏆</div>
                <h3 style="font-size: 1.4rem; margin-bottom: 6px;">${headerText}</h3>
                <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.45; margin-bottom: 1.5rem;">${textFeedback}</p>
                
                <div style="font-size: 3rem; font-weight: 900; color: var(--primary); font-family: var(--font-head); margin-bottom: 0.5rem;">
                    ${quizState.score} / ${currentQuizQuestions.length}
                </div>
                <p style="color: var(--accent2); font-weight: 800; font-size: 1.15rem; margin-bottom: 2rem;">+${finalXP} XP Remportés !</p>
                
                <button class="btn-next" onclick="exitGameFlow()">Retour à l'Accueil</button>
                <button class="btn-next" onclick="startQuizFlow()" style="background: var(--bg-color); border: 1.5px solid var(--border-color); color: var(--text-main); margin-top:8px;">🔄 Rejouer</button>
            </div>
        `;
        
        addXPPoints(finalXP);
        EventBus.emit('game-finished', { game: 'quiz', score: quizState.score });
        return;
    }
    
    const curr = currentQuizQuestions[quizState.q];
    const letters = ["A", "B", "C", "D"];
    
    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-bottom: 8px;">
            <span>Question ${quizState.q + 1} sur ${currentQuizQuestions.length}</span>
            <span style="color:var(--accent);"><i class="fa-solid fa-star"></i> ${quizState.score * 15} XP accumulés</span>
        </div>
        <div class="quiz-bar">
            <div class="quiz-bar-fill" style="width: ${(quizState.q / currentQuizQuestions.length) * 100}%;"></div>
        </div>
        <div class="quiz-card">
            <div class="quiz-context"><i class="fa-solid fa-lightbulb"></i> Le savais-tu ? : ${curr.ctx}</div>
            <div class="quiz-q">${curr.q}</div>
            <div class="quiz-options">
                ${curr.opts.map((o, idx) => `
                    <button class="quiz-opt" id="qopt-${idx}" onclick="submitQuizSelection(${idx})">
                        <span class="opt-letter" id="qlet-${idx}">${letters[idx]}</span>
                        <span>${o}</span>
                    </button>
                `).join('')}
            </div>
            <div id="quiz-inline-feedback"></div>
        </div>
    `;
}

function submitQuizSelection(idx) {
    if (quizState.answered) return;
    quizState.answered = true;
    
    const curr = currentQuizQuestions[quizState.q];
    const correct = idx === curr.ans;
    
    document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
    
    document.getElementById('qopt-' + idx).classList.add(correct ? 'correct' : 'wrong');
    if (!correct) {
        document.getElementById('qopt-' + curr.ans).classList.add('correct');
    }
    
    if (correct) quizState.score++;
    
    const animCommentary = AgentAnimator.commentAnswer(correct, curr.reason);
    
    const fbBox = document.getElementById('quiz-inline-feedback');
    fbBox.innerHTML = `
        <div class="quiz-feedback ${correct ? 'ok' : 'ko'}">
            ${animCommentary}
        </div>
        <button class="btn-next" onclick="advanceQuizQuestion()">
            ${quizState.q + 1 < currentQuizQuestions.length ? 'Question Suivante →' : 'Voir le Résultat Final 🏆'}
        </button>
    `;
    
    if (correct) addXPPoints(curr.xp);
}

function advanceQuizQuestion() {
    quizState.q++;
    quizState.answered = false;
    renderQuizStepCard();
}

// ══════════════════════════════════════════
// 8. GAME: WORD SCRAMBLE
// ══════════════════════════════════════════

async function startScrambleFlow() {
    currentScrambleWords = await dbGetScrambleWords();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('scr-scramble-game').classList.add('active');
    
    renderScrambleStepCard();
    logToVisualDebugger("[GAME] Lancement du jeu Mot Mélangé.");
}

function renderScrambleStepCard() {
    const container = document.getElementById('active-scramble-content');
    if (!container) return;
    const wordData = currentScrambleWords[scrambleIdx % currentScrambleWords.length];
    
    const scrambled = wordData.word.split('').sort(() => Math.random() - 0.5).join('');
    
    container.innerHTML = `
        <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-bottom: 12px; text-align:center;">
            Mot mélangé ${ (scrambleIdx % currentScrambleWords.length) + 1 } sur ${currentScrambleWords.length}
        </div>
        
        <div class="scramble-card">
            <div class="scramble-word">${scrambled}</div>
            <p class="scramble-clue">💡 Indice : ${wordData.hint}</p>
            <input class="scramble-input" id="scr-user-input" placeholder="Taper le mot caché..." maxlength="${wordData.word.length}"
                oninput="this.value = this.value.toUpperCase()"
                onkeydown="if(event.key==='Enter')validateScrambleWord()">
            
            <div id="scramble-feedback-inline" style="margin-top:1rem; font-size:0.75rem; font-weight:600; min-height:18px; text-align:center;"></div>
            
            <div class="scramble-actions">
                <button class="btn-sm" onclick="hintScrambleWord()"><i class="fa-solid fa-lightbulb"></i> Aide</button>
                <button class="btn-sm" onclick="skipScrambleWord()">Passer</button>
                <button class="btn-sm primary" onclick="validateScrambleWord()">Valider</button>
            </div>
        </div>
    `;
}

function validateScrambleWord() {
    const data = currentScrambleWords[scrambleIdx % currentScrambleWords.length];
    const input = document.getElementById('scr-user-input');
    const val = input.value.trim().toUpperCase();
    const fb = document.getElementById('scramble-feedback-inline');
    
    if (val === data.word) {
        input.classList.add('correct');
        input.classList.remove('wrong');
        fb.innerHTML = `<span style="color:var(--accent2);">✅ Magnifique ! +25 XP — <em style="font-weight:500; color:var(--text-muted);">${data.def}</em></span>`;
        addXPPoints(25);
        
        setTimeout(() => {
            scrambleIdx++;
            if (scrambleIdx >= currentScrambleWords.length) {
                scrambleIdx = 0;
                containerGameFinished('Mot Mélangé Résolu !');
            } else {
                renderScrambleStepCard();
            }
        }, 3000);
    } else {
        input.classList.add('wrong');
        input.classList.remove('correct');
        fb.innerHTML = `<span style="color:var(--red);">❌ Faux ! Secoue tes méninges et réessaie.</span>`;
        setTimeout(() => input.classList.remove('wrong'), 500);
    }
}

function hintScrambleWord() {
    const data = currentScrambleWords[scrambleIdx % currentScrambleWords.length];
    const input = document.getElementById('scr-user-input');
    input.value = data.word.substring(0, 2);
    document.getElementById('scramble-feedback-inline').innerHTML = `<span style="color:var(--primary);">Le mot commence par : "${data.word.substring(0, 2)}..."</span>`;
    input.focus();
}

function skipScrambleWord() {
    const data = currentScrambleWords[scrambleIdx % currentScrambleWords.length];
    document.getElementById('scramble-feedback-inline').innerHTML = `<span style="color:var(--text-muted);">Le mot était : <strong style="color:var(--primary);">${data.word}</strong></span>`;
    setTimeout(() => {
        scrambleIdx++;
        if (scrambleIdx >= currentScrambleWords.length) {
            scrambleIdx = 0;
            containerGameFinished('Mot Mélangé Résolu !');
        } else {
            renderScrambleStepCard();
        }
    }, 1500);
}

function containerGameFinished(title) {
    const container = document.getElementById('active-scramble-content');
    if (container) {
        container.innerHTML = `
            <div class="scramble-card" style="text-align:center; padding:2rem 1.25rem;">
                <div style="font-size:3.5rem; margin-bottom:10px;">🏆</div>
                <h3>${title}</h3>
                <p style="color:var(--text-muted); font-size:0.8rem; margin-bottom:1.5rem;">Tu as enrichi ton vocabulaire juridique et gagné de l'XP !</p>
                <button class="btn-next" onclick="exitGameFlow()">Retour à l'Accueil</button>
            </div>
        `;
    }
}

function exitGameFlow() {
    switchTab('home');
}

// ══════════════════════════════════════════
// 9. CONSTITUTIONS LIBRARY
// ══════════════════════════════════════════

async function buildCountrySelectionGrid() {
    const box = document.getElementById('country-grid');
    if (!box) return;
    const countriesList = await dbGetCountries();
    box.innerHTML = countriesList.map(c => `
        <button class="country-btn" onclick="openCountryConstitutions('${c.code}')">
            <span class="flag">${c.flag}</span>
            <span>${c.name}</span>
        </button>
    `).join('');
}

async function openCountryConstitutions(code) {
    const countriesList = await dbGetCountries();
    const country = countriesList.find(x => x.code === code);
    if (!country) return;
    
    const articles = await dbGetConstitutions(code);
    
    document.getElementById('country-selection-view').classList.add('hidden');
    
    const reader = document.getElementById('country-reader-view');
    reader.classList.remove('hidden');
    
    document.getElementById('reader-title').innerHTML = `${country.flag} Constitution de : ${country.name}`;
    document.getElementById('reader-sub').innerHTML = `Édition vulgarisée • Adoptée en ${country.year}`;
    
    const container = document.getElementById('reader-articles-box');
    container.innerHTML = articles.map(art => `
        <div class="article">
            <h4>${art.art}</h4>
            <p>${art.txt}</p>
        </div>
    `).join('');
    
    addXPPoints(10);
    logToVisualDebugger(`[READER] Ouverture de la Constitution du ${country.name}. +10 XP`);
}

function closeCountryReader() {
    const sel = document.getElementById('country-selection-view');
    const rd = document.getElementById('country-reader-view');
    if (sel) sel.classList.remove('hidden');
    if (rd) rd.classList.add('hidden');
}

// ══════════════════════════════════════════
// 10. NEWS DECRYPTOR
// ══════════════════════════════════════════

async function renderNewsFeedList() {
    const container = document.getElementById('news-feed-container');
    const newsList = await dbGetNews();
    renderNewsCardsInto(newsList, container);
}

async function renderHomeActusShort() {
    const container = document.getElementById('home-news-container');
    const newsList = await dbGetNews();
    renderNewsCardsInto(newsList.slice(0, 2), container);
}

function renderNewsCardsInto(list, container) {
    if (!container) return;
    
    container.innerHTML = list.map(n => `
        <div class="news-card" onclick="openNewsDetailCard(${n.id})">
            <div class="news-img">${n.emoji}</div>
            <div class="news-content">
                <span class="news-tag">${n.tagLabel}</span>
                <h4>${n.title}</h4>
                <p style="font-size:0.75rem; color:var(--text-muted); line-height:1.4; margin-bottom:10px;">${n.summary}</p>
                <div class="news-meta">
                    <span><i class="fa-regular fa-clock"></i> ${n.date}</span>
                    <span class="btn-news-ai"><i class="fa-solid fa-wand-magic-sparkles"></i> Demander à l'IA</span>
                </div>
            </div>
        </div>
    `).join('');
}

async function filterNewsList(tag, btn) {
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    newsFilter = tag;
    const newsList = await dbGetNews();
    const filtered = tag === 'all' ? newsList : newsList.filter(x => x.tag === tag);
    renderNewsCardsInto(filtered, document.getElementById('news-feed-container'));
    logToVisualDebugger(`[NEWS] Filtrage des actus sur la catégorie: ${tag}`);
}

let currentlyOpenNews = null;

async function openNewsDetailCard(id) {
    const newsList = await dbGetNews();
    const article = newsList.find(x => x.id === id);
    if (!article) return;
    
    currentlyOpenNews = article;
    
    document.getElementById('news-feed-view').classList.add('hidden');
    const detail = document.getElementById('news-detail-view');
    detail.classList.remove('hidden');
    
    document.getElementById('detail-tag').textContent = article.tagLabel;
    document.getElementById('detail-title').textContent = article.title;
    document.getElementById('detail-meta').innerHTML = `<i class="fa-regular fa-clock"></i> ${article.date} • Source : ${article.source}`;
    document.getElementById('detail-body').textContent = article.body;
    
    addXPPoints(5);
    logToVisualDebugger(`[NEWS] Lecture détaillée de l'article ID ${id}. +5 XP`);
}

function closeNewsDetail() {
    const feed = document.getElementById('news-feed-view');
    const dt = document.getElementById('news-detail-view');
    if (feed) feed.classList.remove('hidden');
    if (dt) dt.classList.add('hidden');
    currentlyOpenNews = null;
}

function askAIToExplainNews() {
    if (!currentlyOpenNews) return;
    
    toggleChatSheet(true);
    const input = document.getElementById('chat-user-input');
    if (input) {
        input.value = `Décrypte et explique-moi simplement l'actualité : "${currentlyOpenNews.title}"`;
        sendChatPrompt();
    }
}

// ══════════════════════════════════════════
// 11. PROGRESSION & BADGES
// ══════════════════════════════════════════

function renderProgressionGrid() {
    const badges = [
        {name: "Citoyen Apprenti", desc: "Rejoindre l'application ConstitApp", icon: "🌱", requirement: 0},
        {name: "Lecteur Constitutionnel", desc: "Parcourir la constitution d'un pays", icon: "📖", requirement: 350},
        {name: "Esprit Vif", desc: "Obtenir une note de 100% à un Quiz Citoyen", icon: "🎯", requirement: 400},
        {name: "Défenseur Loyal", desc: "Maintenir une série de 7 jours consécutifs", icon: "🔥", requirement: 450},
        {name: "Avocat Junior", desc: "Acquérir plus de 500 XP au total", icon: "⚖️", requirement: 500},
        {name: "Gardien de la République", desc: "Maîtriser tout le catalogue de ConstitApp", icon: "🏛️", requirement: 800}
    ];
    
    const container = document.getElementById('badges-grid-container');
    if (!container) return;
    container.innerHTML = badges.map(b => {
        const unlocked = xp >= b.requirement;
        const active = (xp >= b.requirement && xp < b.requirement + 100);
        const stateClass = active ? 'active' : (unlocked ? '' : 'locked');
        
        return `
            <div class="badge-card ${stateClass}">
                <div class="badge-icon-box">${b.icon}</div>
                <div>
                    <h5>${b.name}</h5>
                    <p>${b.desc}</p>
                </div>
            </div>
        `;
    }).join('');
}

async function addXPPoints(amount) {
    xp += amount;
    await dbUpdateUserProgress(xp, streak);
    
    const xpCount = document.getElementById('xp-count');
    const progVal = document.getElementById('prog-xp-val');
    if (xpCount) xpCount.textContent = xp;
    if (progVal) progVal.textContent = xp;
    
    let levelTitle = "Niveau 1 — Citoyen Éveillé";
    let nextLevel = "Avocat Constitutionnel";
    let baseXP = 0;
    let nextXP = 350;
    
    if (xp >= 800) {
        levelTitle = "Niveau 5 — Constitutionnaliste 🏛️";
        nextLevel = "Niveau Max Atteint";
        baseXP = 800;
        nextXP = 99999;
    } else if (xp >= 500) {
        levelTitle = "Niveau 4 — Avocat Junior ⚖️";
        nextLevel = "Niveau 5 — Constitutionnaliste";
        baseXP = 500;
        nextXP = 800;
    } else if (xp >= 350) {
        levelTitle = "Niveau 3 — Juriste Junior";
        nextLevel = "Niveau 4 — Avocat Junior";
        baseXP = 350;
        nextXP = 500;
    } else if (xp >= 150) {
        levelTitle = "Niveau 2 — Défenseur Local";
        nextLevel = "Niveau 3 — Juriste Junior";
        baseXP = 150;
        nextXP = 350;
    }
    
    const levelTitleEl = document.getElementById('badge-level-title');
    const greetingEl = document.getElementById('home-greeting');
    if (levelTitleEl) levelTitleEl.textContent = levelTitle;
    if (greetingEl) greetingEl.textContent = `Salut, Citoyen 👋 (${levelTitle})`;
    
    let pct = 100;
    if (nextXP !== 99999) {
        pct = Math.round(((xp - baseXP) / (nextXP - baseXP)) * 100);
    }
    const barEl = document.getElementById('prog-fill-width');
    if (barEl) barEl.style.width = pct + '%';
    
    renderProgressionGrid();
    EventBus.emit('xp-gained', amount);
}

// ══════════════════════════════════════════
// 12. CUSTOM LAW SYNTHESIS
// ══════════════════════════════════════════

let generatedQuiz = [];
let generatedQuizIdx = 0;
let generatedQuizScore = 0;

function triggerCustomLesson() {
    const input = document.getElementById('generator-topic');
    if (!input) return;
    const topic = input.value.trim();
    if (!topic) return;
    
    input.value = '';
    
    const container = document.getElementById('custom-fiche-container');
    container.innerHTML = `<div style="font-size:0.75rem; text-align:center; padding:15px; color:var(--primary);">
        <i class="fa-solid fa-spinner fa-spin"></i> La Plume (Agent Contenu) consulte le droit et rédige ta fiche...
    </div>`;
    
    setTimeout(() => {
        const fiche = AgentContent.generateFiche(topic);
        generatedQuiz = fiche.quizQs;
        
        container.innerHTML = `
            <div class="fiche-box">
                <div class="fiche-head">
                    <h4>${fiche.title}</h4>
                    <span class="fiche-badge"><i class="fa-solid fa-wand-magic-sparkles"></i> Rédigé par La Plume</span>
                </div>
                <div class="fiche-body">
                    ${fiche.content}
                </div>
                <div class="fiche-footer">
                    <span style="font-size:0.7rem; color:var(--text-muted);">+20 XP pour la lecture</span>
                    <button class="btn-fiche-quiz" onclick="startCustomLessonQuiz()"><i class="fa-solid fa-circle-question"></i> Faire le Mini-Quiz</button>
                </div>
            </div>
        `;
        
        addXPPoints(20);
        logToVisualDebugger(`[CONTENU] Nouvelle fiche de droit rédigée avec succès ! +20 XP`, 'cont');
    }, 1400);
}

function startCustomLessonQuiz() {
    if (!generatedQuiz || generatedQuiz.length === 0) return;
    
    generatedQuizIdx = 0;
    generatedQuizScore = 0;
    
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('scr-quiz-game').classList.add('active');
    
    renderCustomQuizStep();
}

function renderCustomQuizStep() {
    const container = document.getElementById('active-quiz-content');
    if (!container) return;
    
    if (generatedQuizIdx >= generatedQuiz.length) {
        const reward = generatedQuizScore * 20;
        container.innerHTML = `
            <div class="quiz-card" style="text-align: center; padding: 2.5rem 1.25rem;">
                <div style="font-size: 3.5rem; margin-bottom: 10px;">🎯</div>
                <h3>Mini-Quiz Terminé !</h3>
                <p style="color:var(--text-muted); font-size:0.8rem; margin-bottom:1.25rem;">La Plume te félicite pour tes réponses !</p>
                <div style="font-size: 2.5rem; font-weight:900; color:var(--primary); margin-bottom:0.5rem;">
                    ${generatedQuizScore} / ${generatedQuiz.length}
                </div>
                <p style="color:var(--accent2); font-weight:800; font-size:1.1rem; margin-bottom:1.5rem;">+${reward} XP Remportés !</p>
                <button class="btn-next" onclick="switchTab('profil')">Retour au Profil</button>
            </div>
        `;
        addXPPoints(reward);
        return;
    }
    
    const curr = generatedQuiz[generatedQuizIdx];
    const letters = ["A", "B", "C"];
    
    container.innerHTML = `
        <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-bottom:10px;">
            Question de validation ${generatedQuizIdx + 1} sur ${generatedQuiz.length}
        </div>
        <div class="quiz-card">
            <div class="quiz-q">${curr.q}</div>
            <div class="quiz-options">
                ${curr.opts.map((o, idx) => `
                    <button class="quiz-opt" id="copt-${idx}" onclick="submitCustomQuizAnswer(${idx})">
                        <span class="opt-letter">${letters[idx]}</span>
                        <span>${o}</span>
                    </button>
                `).join('')}
            </div>
            <div id="custom-quiz-feedback" style="margin-top:1rem;"></div>
        </div>
    `;
}

function submitCustomQuizAnswer(idx) {
    const curr = generatedQuiz[generatedQuizIdx];
    const correct = idx === curr.ans;
    
    document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
    document.getElementById('copt-' + idx).classList.add(correct ? 'correct' : 'wrong');
    if (!correct) {
        document.getElementById('copt-' + curr.ans).classList.add('correct');
    }
    
    if (correct) generatedQuizScore++;
    
    const animCommentary = AgentAnimator.commentAnswer(correct, curr.reason);
    
    const fb = document.getElementById('custom-quiz-feedback');
    fb.innerHTML = `
        <div class="quiz-feedback ${correct ? 'ok' : 'ko'}">
            ${animCommentary}
        </div>
        <button class="btn-next" onclick="advanceCustomQuizStep()">Continuer</button>
    `;
}

function advanceCustomQuizStep() {
    generatedQuizIdx++;
    renderCustomQuizStep();
}

// ══════════════════════════════════════════
// 13. CHATBOT WIDGET & AI INTERACTIVE
// ══════════════════════════════════════════

let chatOpen = false;

function toggleChatSheet(forceOpen = false) {
    chatOpen = forceOpen ? true : !chatOpen;
    const modal = document.getElementById('chat-sheet-modal');
    if (modal) modal.classList.toggle('open', chatOpen);
}

function appendChatMessage(sender, html, loading = false) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return '';
    const msgId = 'cmsg-' + Date.now();
    
    const div = document.createElement('div');
    div.className = `msg ${sender} ${loading ? 'loading' : ''}`;
    div.id = msgId;
    div.innerHTML = html;
    
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    
    return msgId;
}

async function sendChatPrompt() {
    const input = document.getElementById('chat-user-input');
    if (!input) return;
    const prompt = input.value.trim();
    if (!prompt) return;
    
    input.value = '';
    appendChatMessage('user', prompt);
    
    // 1. Audit Agent Securité
    const securityAudit = AgentSecurity.auditPrompt(prompt);
    if (!securityAudit.safe) {
        const loadId = appendChatMessage('ai', '<em>L\'Agent Sécurité analyse la requête...</em>', true);
        setTimeout(() => {
            const el = document.getElementById(loadId);
            if (el) el.remove();
            appendChatMessage('ai', `⚠️ **Gardien de la Loi (Sécurité)** : ${securityAudit.reason}`);
        }, 800);
        return;
    }
    
    const loadId = appendChatMessage('ai', '<em>L\'essaim coopère pour vous répondre...</em>', true);
    
    // 2. TIER 1 : Essayer de requêter via Supabase Edge Function
    try {
        const edgeResponseText = await dbChatWithAI(prompt);
        if (edgeResponseText) {
            const el = document.getElementById(loadId);
            if (el) el.remove();
            
            let formatted = `✍️ **La Plume (Contenu)** : ${edgeResponseText}`;
            formatted = AgentSecurity.appendDisclaimer(formatted);
            appendChatMessage('ai', formatted);
            addXPPoints(15);
            logToVisualDebugger("[CHAT] Réponse générée avec succès via Supabase Edge Function. +15 XP");
            return;
        }
    } catch (e) {
        logToVisualDebugger(`[CHAT] Échec ou indisponibilité de l'Edge Function. Repli sur le mode local.`);
    }

    // 3. TIER 2 : Repli sur le mode démo ou clé client-side locale
    if (aiConfig.provider === 'demo') {
        setTimeout(() => {
            const el = document.getElementById(loadId);
            if (el) el.remove();
            let matched = MOCK_AI_RESPONSES.default;
            const cleanText = prompt.toLowerCase();
            
            if (cleanText.includes("constitution")) matched = MOCK_AI_RESPONSES.constitution;
            else if (cleanText.includes("séparation") || cleanText.includes("pouvoir")) matched = MOCK_AI_RESPONSES.séparation;
            
            let finalOutput = `✍️ **La Plume (Contenu)** : ${matched}`;
            finalOutput = AgentSecurity.appendDisclaimer(finalOutput);
            
            appendChatMessage('ai', finalOutput);
            addXPPoints(10);
            
            logToVisualDebugger("[CHAT] Réponse générée en mode Démo local. +10 XP");
        }, 1100);
        return;
    }
    
    // Si clé d'API client-side locale configurée
    try {
        let finalResponseText = '';
        const systemPrompt = `Tu es un assistant de ConstitApp (Afrique). Explique la loi et les droits civiques avec pédagogie et clarté. Ton maximum est de 150 mots.`;
        
        if (aiConfig.provider === 'mistral') {
            const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${aiConfig.key}`
                },
                body: JSON.stringify({
                    model: aiConfig.model,
                    messages: [
                        {role: 'system', content: systemPrompt},
                        {role: 'user', content: prompt}
                    ]
                })
            });
            const data = await res.json();
            finalResponseText = data.choices?.[0]?.message?.content || "Erreur de décryptage des données Mistral.";
        }
        else if (aiConfig.provider === 'anthropic') {
            const res = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': aiConfig.key,
                    'anthropic-version': '2023-06-01',
                    'dangerously-allow-browser': 'true'
                },
                body: JSON.stringify({
                    model: aiConfig.model,
                    max_tokens: 400,
                    system: systemPrompt,
                    messages: [{role: 'user', content: prompt}]
                })
            });
            const data = await res.json();
            finalResponseText = data.content?.[0]?.text || "Erreur de décryptage des données Claude.";
        }
        
        const el = document.getElementById(loadId);
        if (el) el.remove();
        
        let formatted = `✍️ **La Plume (Contenu)** : ${finalResponseText}`;
        formatted = AgentSecurity.appendDisclaimer(formatted);
        
        appendChatMessage('ai', formatted);
        addXPPoints(15);
        logToVisualDebugger(`[CHAT] Réponse API reçue (${aiConfig.provider.toUpperCase()}). +15 XP`);
        
    } catch(err) {
        const el = document.getElementById(loadId);
        if (el) el.remove();
        appendChatMessage('ai', `<span style="color:var(--red);">❌ Échec du réseau ou clé API invalide. Révisez vos paramètres ou restez en mode Démo gratuit.</span>`);
        logToVisualDebugger(`[ERROR] Échec de la requête vers ${aiConfig.provider} !`);
    }
}

// ══════════════════════════════════════════
// 14. PROFIL CONFIG MANAGER
// ══════════════════════════════════════════

function adjustProviderModelDropdown() {
    const provEl = document.getElementById('ai-provider');
    if (!provEl) return;
    const prov = provEl.value;
    const modelGrp = document.getElementById('model-group');
    const keyGrp = document.getElementById('key-group');
    const modelSelect = document.getElementById('ai-model');
    const statusText = document.getElementById('chat-ai-status');
    
    if (prov === 'demo') {
        if (modelGrp) modelGrp.style.display = 'none';
        if (keyGrp) keyGrp.style.display = 'none';
        if (statusText) statusText.textContent = "Prêts à répondre • Mode Démo";
    } else {
        if (modelGrp) modelGrp.style.display = 'block';
        if (keyGrp) keyGrp.style.display = 'block';
        
        const models = PROVIDER_MODELS[prov] || [];
        if (modelSelect) {
            modelSelect.innerHTML = models.map(m => `<option value="${m.value}">${m.text}</option>`).join('');
        }
        if (statusText) statusText.textContent = `Prêts à répondre • Mode ${prov.toUpperCase()}`;
    }
}

function saveAISettingsFromProfil() {
    const provider = document.getElementById('ai-provider').value;
    const model = document.getElementById('ai-model').value || 'demo-lite';
    const key = document.getElementById('ai-key').value.trim();
    const fb = document.getElementById('profil-settings-feedback');
    
    if (provider !== 'demo' && !key) {
        fb.innerHTML = `<span style="color:var(--red);"><i class="fa-solid fa-circle-exclamation"></i> Clé API obligatoire pour ce mode !</span>`;
        return;
    }
    
    aiConfig = { provider, model, key };
    saveLocalStoreData();
    
    fb.innerHTML = `<span style="color:var(--accent2);"><i class="fa-solid fa-circle-check"></i> Configuration sauvegardée !</span>`;
    setTimeout(() => fb.innerHTML = '', 2000);
    
    adjustProviderModelDropdown();
    logToVisualDebugger(`[SETTINGS] Paramètres IA mis à jour vers: ${provider} (${model})`);
}

function saveSupabaseSettingsFromProfil() {
    const url = document.getElementById('supabase-url').value.trim();
    const key = document.getElementById('supabase-key').value.trim();
    const fb = document.getElementById('supabase-settings-feedback');
    
    localStorage.setItem('constitapp_supabase_url', url);
    localStorage.setItem('constitapp_supabase_key', key);
    
    fb.innerHTML = `<span style="color:var(--accent2);"><i class="fa-solid fa-circle-check"></i> Connexion Supabase enregistrée !</span>`;
    setTimeout(() => fb.innerHTML = '', 2000);
    
    // Ré-initialise Supabase client
    if (window.initSupabase) {
        window.initSupabase();
    }
}

// ══════════════════════════════════════════
// 15. VISUAL LOG DEBUGGER CONSOLE
// ══════════════════════════════════════════

let debugOpen = false;

function toggleVisualDebugger() {
    debugOpen = !debugOpen;
    const consoleEl = document.getElementById('visual-debugger-console');
    if (consoleEl) consoleEl.style.display = debugOpen ? 'block' : 'none';
}

function logToVisualDebugger(msg, agent = 'sys') {
    const con = document.getElementById('visual-debugger-console');
    if (!con) return;
    
    const time = new Date().toLocaleTimeString();
    let cssClass = '';
    
    if (agent === 'sec') cssClass = 'sec';
    else if (agent === 'anim') cssClass = 'anim';
    else if (agent === 'cont') cssClass = 'cont';
    
    const div = document.createElement('div');
    div.className = `debug-line ${cssClass}`;
    div.textContent = `[${time}] ${msg}`;
    
    con.appendChild(div);
    con.scrollTop = con.scrollHeight;
}

// ══════════════════════════════════════════
// 16. LOCAL STORAGE MANAGERS
// ══════════════════════════════════════════

function saveLocalStoreData() {
    localStorage.setItem('constitapp_xp_val', xp);
    localStorage.setItem('constitapp_streak_val', streak);
    localStorage.setItem('constitapp_theme_val', appTheme);
    localStorage.setItem('constitapp_prov', aiConfig.provider);
    localStorage.setItem('constitapp_model', aiConfig.model);
    localStorage.setItem('constitapp_key', aiConfig.key);
}

async function loadLocalStoreData() {
    // Charge la progression depuis Supabase ou fallback localStorage
    const progress = await dbGetUserProgress();
    xp = progress.xp;
    streak = progress.streak;

    if (localStorage.getItem('constitapp_theme_val')) {
        appTheme = localStorage.getItem('constitapp_theme_val');
        if (appTheme === 'jeune') {
            document.body.classList.add('mode-jeune');
            const toggler = document.getElementById('theme-toggler');
            if (toggler) {
                toggler.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> <span id="theme-text">Mode Jeune</span>';
            }
        }
    }
    if (localStorage.getItem('constitapp_prov')) {
        aiConfig.provider = localStorage.getItem('constitapp_prov');
        const provEl = document.getElementById('ai-provider');
        if (provEl) provEl.value = aiConfig.provider;
    }
    if (localStorage.getItem('constitapp_model')) {
        aiConfig.model = localStorage.getItem('constitapp_model');
    }
    if (localStorage.getItem('constitapp_key')) {
        aiConfig.key = localStorage.getItem('constitapp_key');
        const keyEl = document.getElementById('ai-key');
        if (keyEl) keyEl.value = aiConfig.key;
    }

    // Supabase config input fields sync
    const activeUrl = localStorage.getItem('constitapp_supabase_url') || 'https://iltfzevbtamnfwzdvsir.supabase.co';
    const activeKey = localStorage.getItem('constitapp_supabase_key') || 'sb_publishable_dBXheWPvbgfjp7xp0-tjBA_XeOxHCGV';
    
    const urlEl = document.getElementById('supabase-url');
    if (urlEl) urlEl.value = activeUrl;
    
    const keyEl = document.getElementById('supabase-key');
    if (keyEl) keyEl.value = activeKey;
    
    // Sync views
    const xpCount = document.getElementById('xp-count');
    const streakDays = document.getElementById('streak-days');
    if (xpCount) xpCount.textContent = xp;
    if (streakDays) streakDays.textContent = `${streak} Jours`;
    await addXPPoints(0); // visual calculations update
}

// ══════════════════════════════════════════
// 17. SOCIAL WHATSAPP SHARERS
// ══════════════════════════════════════════

function shareChallengeWhatsApp() {
    const text = `🏆 Challenge Constitutionnel ! Je viens d'acquérir le titre de "${document.getElementById('badge-level-title').textContent}" sur ConstitApp avec un score de ${xp} XP !\n\nToi aussi, viens apprendre tes droits et défier tes amis : [ConstitApp_Afrique]`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}
