// ══════════════════════════════════════════
// SUPABASE CLIENT MODULE — CONSTITAPP
// ══════════════════════════════════════════

let supabaseClient = null;

// Initialisation au chargement
function initSupabase() {
    let url = localStorage.getItem('constitapp_supabase_url') || 'https://iltfzevbtamnfwzdvsir.supabase.co';
    let key = localStorage.getItem('constitapp_supabase_key') || 'sb_publishable_dBXheWPvbgfjp7xp0-tjBA_XeOxHCGV';
    const statusText = document.getElementById('chat-ai-status');

    // Nettoyer l'URL si elle se termine par /rest/v1/ ou /rest/v1
    if (url) {
        url = url.trim();
        if (url.endsWith('/rest/v1/')) {
            url = url.substring(0, url.length - 9);
        } else if (url.endsWith('/rest/v1')) {
            url = url.substring(0, url.length - 8);
        }
    }

    if (url && key) {
        try {
            // Utilise la bibliothèque chargée par CDN
            supabaseClient = window.supabase.createClient(url, key);
            logToVisualDebugger("[SYSTEM] Supabase initialisé avec succès !");
            if (statusText) statusText.textContent = "Prêts à répondre • Supabase Connecté";
        } catch (err) {
            logToVisualDebugger(`[ERROR] Échec de l'initialisation Supabase : ${err.message}`);
            supabaseClient = null;
        }
    } else {
        logToVisualDebugger("[SYSTEM] Pas de configuration Supabase. Mode Hors-ligne / Fallbacks actif.");
    }
}

// Lancer l'initialisation après le chargement du document
document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
});

// ══════════════════════════════════════════
// DATA LAYERS — ABSTRACTED API WITH FALLBACKS
// ══════════════════════════════════════════

// 1. OBTENIR LES PAYS
async function dbGetCountries() {
    if (supabaseClient) {
        logToVisualDebugger("[DB] Requête des pays sur Supabase...");
        const { data, error } = await supabaseClient
            .from('countries')
            .select('*')
            .order('name', { ascending: true });
        
        if (!error && data && data.length > 0) {
            return data; // Doit retourner {code, name, flag, year}
        }
        logToVisualDebugger(`[DB] Erreur ou table vide sur Supabase. Fallback activé. Detail: ${error?.message}`);
    }
    return COUNTRIES; // Fallback codé en dur dans app.js
}

// 2. OBTENIR LA CONSTITUTION D'UN PAYS
async function dbGetConstitutions(countryCode) {
    if (supabaseClient) {
        logToVisualDebugger(`[DB] Requête des articles (${countryCode}) sur Supabase...`);
        const { data, error } = await supabaseClient
            .from('constitutions')
            .select('*')
            .eq('country_code', countryCode);
        
        if (!error && data && data.length > 0) {
            // Mappe vers {art, txt} attendu par l'application
            return data.map(item => ({ art: item.article_title, txt: item.article_text }));
        }
        logToVisualDebugger(`[DB] Erreur ou table constitutions vide. Fallback activé. Detail: ${error?.message}`);
    }
    return CONSTITUTIONS[countryCode] || [];
}

// 3. OBTENIR LES QUESTIONS DE QUIZ
async function dbGetQuizQuestions() {
    if (supabaseClient) {
        logToVisualDebugger("[DB] Requête des questions de Quiz sur Supabase...");
        const { data, error } = await supabaseClient
            .from('quiz_questions')
            .select('*');
        
        if (!error && data && data.length > 0) {
            // Mappe vers {q, ctx, opts, ans, xp, reason}
            return data.map(item => ({
                q: item.question,
                ctx: item.context,
                opts: item.options, // Doit être un tableau de chaînes
                ans: item.answer_index,
                xp: item.xp_reward || 15,
                reason: item.explanation
            }));
        }
        logToVisualDebugger(`[DB] Erreur ou table quiz_questions vide. Fallback activé. Detail: ${error?.message}`);
    }
    return QUIZ_QUESTIONS;
}

// 4. OBTENIR LES MOTS MÉLANGÉS
async function dbGetScrambleWords() {
    if (supabaseClient) {
        logToVisualDebugger("[DB] Requête des mots mélangés sur Supabase...");
        const { data, error } = await supabaseClient
            .from('scramble_words')
            .select('*');
        
        if (!error && data && data.length > 0) {
            return data.map(item => ({
                word: item.word.toUpperCase(),
                hint: item.hint,
                def: item.definition
            }));
        }
        logToVisualDebugger(`[DB] Erreur ou table scramble_words vide. Fallback activé. Detail: ${error?.message}`);
    }
    return SCRAMBLE_WORDS;
}

// 5. OBTENIR LES ACTUALITÉS
async function dbGetNews() {
    if (supabaseClient) {
        logToVisualDebugger("[DB] Requête des actualités sur Supabase...");
        const { data, error } = await supabaseClient
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error && data && data.length > 0) {
            return data.map(item => ({
                id: item.id,
                tag: item.category,
                tagLabel: item.category_label || item.category,
                emoji: item.emoji || "📰",
                title: item.title,
                summary: item.summary,
                date: item.published_date || "Récemment",
                source: item.source || "ConstitApp",
                body: item.content
            }));
        }
        logToVisualDebugger(`[DB] Erreur ou table news vide. Fallback activé. Detail: ${error?.message}`);
    }
    return NEWS;
}

// 6. HISTORIQUE / PROFIL UTILISATEUR (XP ET SERIE)
async function dbGetUserProgress() {
    if (supabaseClient) {
        // Si vous gérez l'authentification Supabase, vous pouvez lier ceci à un profil.
        try {
            const { data: { user } } = await supabaseClient.auth.getUser();
            if (user) {
                logToVisualDebugger(`[DB] Requête de progression pour l'utilisateur ${user.email}...`);
                const { data, error } = await supabaseClient
                    .from('profiles')
                    .select('xp, streak')
                    .eq('id', user.id)
                    .single();
                if (!error && data) {
                    return data; // {xp, streak}
                }
            }
        } catch (e) {
            // Pas d'utilisateur connecté ou erreur auth, fallback local
        }
    }
    // Fallback localstorage
    return {
        xp: parseInt(localStorage.getItem('constitapp_xp_val')) || 340,
        streak: parseInt(localStorage.getItem('constitapp_streak_val')) || 7
    };
}

async function dbUpdateUserProgress(newXp, newStreak) {
    if (supabaseClient) {
        try {
            const { data: { user } } = await supabaseClient.auth.getUser();
            if (user) {
                logToVisualDebugger(`[DB] Enregistrement de la progression sur Supabase...`);
                await supabaseClient
                    .from('profiles')
                    .upsert({ id: user.id, xp: newXp, streak: newStreak });
                return;
            }
        } catch (e) {
            // Erreur auth, fallback local
        }
    }
    // Sauvegarde locale par défaut
    localStorage.setItem('constitapp_xp_val', newXp);
    localStorage.setItem('constitapp_streak_val', newStreak);
}

// 7. APPEL DE L'ASSISTANT IA SECURISE (EDGE FUNCTIONS)
async function dbChatWithAI(userPrompt) {
    if (supabaseClient) {
        logToVisualDebugger("[🛡️ AI EDGE FUNCTION] Envoi de la requête à Supabase Edge Function (mistral-proxy)...", "cont");
        try {
            // Appel sécurisé de l'Edge Function 'mistral-proxy'
            const { data, error } = await supabaseClient.functions.invoke('mistral-proxy', {
                body: { prompt: userPrompt }
            });
            
            if (error) throw error;
            if (data && data.text) {
                return data.text;
            }
        } catch (err) {
            logToVisualDebugger(`[ERROR AI EDGE FUNCTION] Échec de l'Edge Function : ${err.message}`);
        }
    }
    return null; // Déclenchera les moteurs locaux ou les fallback en fonction
}

// ══════════════════════════════════════════
// SUPABASE AUTHENTICATION WRAPPERS
// ══════════════════════════════════════════

async function dbSignUp(email, password) {
    if (supabaseClient) {
        logToVisualDebugger(`[AUTH] Tentative d'inscription pour ${email}...`);
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });
        if (error) throw error;
        return data;
    }
    throw new Error("Supabase n'est pas connecté. Mode hors-ligne actif.");
}

async function dbSignIn(email, password) {
    if (supabaseClient) {
        logToVisualDebugger(`[AUTH] Tentative de connexion pour ${email}...`);
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) throw error;
        return data;
    }
    throw new Error("Supabase n'est pas connecté. Mode hors-ligne actif.");
}

async function dbSignOut() {
    if (supabaseClient) {
        logToVisualDebugger(`[AUTH] Déconnexion de l'utilisateur...`);
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
    }
}

async function dbGetCurrentUser() {
    if (supabaseClient) {
        try {
            const { data: { user }, error } = await supabaseClient.auth.getUser();
            if (error) return null;
            return user;
        } catch (e) {
            return null;
        }
    }
    return null;
}

function dbOnAuthStateChange(callback) {
    if (supabaseClient) {
        supabaseClient.auth.onAuthStateChange((event, session) => {
            logToVisualDebugger(`[AUTH EVENT] Événement d'authentification Supabase : ${event}`);
            callback(event, session);
        });
    }
}
