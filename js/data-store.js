/**
 * StudyNest – Centralized Storage & Data Store
 * ==============================================
 * All localStorage interactions go through this module.
 * Structured JSON objects instead of scattered string keys.
 */

const STORAGE_KEYS = {
    auth: 'studynest.auth',
    user: 'studynest.user',
    library: 'studynest.library',
    notifications: 'studynest.notifications',
    contributions: 'studynest.contributions',
    leaderboard: 'studynest.leaderboard',
    votes: 'studynest.votes'
};


/**
 * DEMO_MODE flag – when true, the app operates with prototype localStorage data.
 * When a Django/DRF backend is connected, set this to false and replace
 * DataStore methods with real API calls.
 */
const DEMO_MODE = true;


const DataStore = {

    // ── Generic helpers ──

    _get(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    _set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    _remove(key) {
        localStorage.removeItem(key);
    },


    // ── Auth ──

    getAuth() {
        return this._get(STORAGE_KEYS.auth) || {
            isLoggedIn: false,
            isGoogleLogin: false,
            isEmailVerified: false,
            profileCompleted: false
        };
    },

    setAuth(data) {
        const current = this.getAuth();
        const updated = { ...current, ...data };
        this._set(STORAGE_KEYS.auth, updated);

        // Keep legacy keys synchronized
        if (updated.isLoggedIn !== undefined) {
            localStorage.setItem('studynest_logged_in', updated.isLoggedIn ? 'true' : 'false');
        }
        if (updated.profileCompleted !== undefined) {
            localStorage.setItem('studynest_profile_completed', updated.profileCompleted ? 'true' : 'false');
        }
        if (updated.isGoogleLogin !== undefined) {
            localStorage.setItem('studynest_google_login', updated.isGoogleLogin ? 'true' : 'false');
        }
        return updated;
    },

    clearAuth() {
        this._remove(STORAGE_KEYS.auth);
    },


    // ── User ──

    getUser() {
        const stored = this._get(STORAGE_KEYS.user) || {};
        const legacyName = localStorage.getItem('studynest_user_name');
        const legacyEmail = localStorage.getItem('studynest_user_email');
        const legacyCountry = localStorage.getItem('studynest_country');
        const legacyLevel = localStorage.getItem('studynest_study_level');
        const legacyInst = localStorage.getItem('studynest_institution');
        const legacyDept = localStorage.getItem('studynest_department');
        const legacyBoard = localStorage.getItem('studynest_board');
        const legacyClass = localStorage.getItem('studynest_class');
        const legacyCourse = localStorage.getItem('studynest_course');
        const legacyMedUni = localStorage.getItem('studynest_medical_university');
        const legacyMedCollege = localStorage.getItem('studynest_medical_college');

        let name = stored.name || legacyName || '';
        let email = stored.email || legacyEmail || '';

        // If name is default 'Student' or empty, derive from email if available
        if ((!name || name === 'Student') && email && email.includes('@')) {
            const prefix = email.split('@')[0];
            const clean = prefix.replace(/[._-]+/g, ' ').trim();
            if (clean && clean.toLowerCase() !== 'student') {
                name = clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            }
        }

        // Project default profile name if still unset or 'Student'
        if (!name || name === 'Student') {
            name = 'Akhtaruzzaman Anik';
        }

        // Default email if unset
        if (!email) {
            email = 'anikanik@gmail.com';
        }

        const country = stored.country || legacyCountry || 'Bangladesh';
        const studyLevel = stored.studyLevel || legacyLevel || 'University';
        const institution = stored.institution || legacyInst || 'Daffodil International University';
        const department = stored.department || legacyDept || 'Computer Science & Engineering';

        return {
            name: name,
            email: email,
            avatar: stored.avatar || '',
            country: country,
            studyLevel: studyLevel,
            institution: institution,
            department: department,
            board: stored.board || legacyBoard || '',
            class: stored.class || legacyClass || '',
            course: stored.course || legacyCourse || '',
            medicalUniversity: stored.medicalUniversity || legacyMedUni || '',
            college: stored.college || legacyMedCollege || '',
            points: stored.points !== undefined ? stored.points : 120,
            contributionCount: stored.contributionCount !== undefined ? stored.contributionCount : 24
        };
    },

    setUser(data) {
        const current = this._get(STORAGE_KEYS.user) || {};
        const updated = { ...current, ...data };
        this._set(STORAGE_KEYS.user, updated);

        // Always sync legacy localStorage keys so that any page or script reads the latest updated values
        if (updated.name) localStorage.setItem('studynest_user_name', updated.name);
        if (updated.email) localStorage.setItem('studynest_user_email', updated.email);
        if (updated.country) localStorage.setItem('studynest_country', updated.country);
        if (updated.studyLevel) localStorage.setItem('studynest_study_level', updated.studyLevel);
        if (updated.institution) localStorage.setItem('studynest_institution', updated.institution);
        if (updated.department) localStorage.setItem('studynest_department', updated.department);
        if (updated.board) localStorage.setItem('studynest_board', updated.board);
        if (updated.class) localStorage.setItem('studynest_class', updated.class);
        if (updated.course) localStorage.setItem('studynest_course', updated.course);
        if (updated.medicalUniversity) localStorage.setItem('studynest_medical_university', updated.medicalUniversity);
        if (updated.college) localStorage.setItem('studynest_medical_college', updated.college);

        return updated;
    },

    clearUser() {
        this._remove(STORAGE_KEYS.user);
        const legacyKeys = [
            'studynest_user_name', 'studynest_user_email', 'studynest_country',
            'studynest_study_level', 'studynest_institution', 'studynest_department',
            'studynest_board', 'studynest_class', 'studynest_course',
            'studynest_medical_university', 'studynest_medical_college'
        ];
        legacyKeys.forEach(k => localStorage.removeItem(k));
    },


    // ── Library (saved items) ──

    getLibrary() {
        return this._get(STORAGE_KEYS.library) || [];
    },

    saveToLibrary(item) {
        const library = this.getLibrary();
        // Normalise type
        if (item.type === 'question') item.type = 'question-paper';
        // Prevent duplicates
        const exists = library.some(i => i.id === item.id && i.type === item.type);
        if (!exists) {
            item.savedAt = new Date().toISOString();
            library.push(item);
            this._set(STORAGE_KEYS.library, library);
        }
        return !exists;
    },

    removeFromLibrary(id, type) {
        let library = this.getLibrary();
        library = library.filter(i => !(i.id === id && i.type === type));
        this._set(STORAGE_KEYS.library, library);
    },

    isInLibrary(id, type) {
        if (type === 'question') type = 'question-paper';
        return this.getLibrary().some(i => i.id === id && i.type === type);
    },


    // ── Notifications ──

    getNotifications() {
        const stored = this._get(STORAGE_KEYS.notifications);
        if (stored) return stored;

        // Default demo notifications
        const defaults = [
            {
                id: 'n1',
                type: 'contribution',
                title: 'Contribution Approved',
                message: 'Your "Data Structures" playlist contribution has been approved.',
                createdAt: new Date(Date.now() - 3600000).toISOString(),
                read: false,
                link: ROUTES.myContributions
            },
            {
                id: 'n2',
                type: 'system',
                title: 'Welcome to StudyNest!',
                message: 'Start exploring academic resources and contribute to help fellow students.',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                read: false,
                link: ROUTES.home
            },
            {
                id: 'n3',
                type: 'vote',
                title: 'New Vote on Your Contribution',
                message: 'Someone upvoted your "OOP Final Exam 2024" question paper.',
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                read: true,
                link: ROUTES.myContributions
            }
        ];
        this._set(STORAGE_KEYS.notifications, defaults);
        return defaults;
    },

    markNotificationRead(id) {
        const notifications = this.getNotifications();
        const notif = notifications.find(n => n.id === id);
        if (notif) {
            notif.read = true;
            this._set(STORAGE_KEYS.notifications, notifications);
        }
    },

    markAllNotificationsRead() {
        const notifications = this.getNotifications();
        notifications.forEach(n => n.read = true);
        this._set(STORAGE_KEYS.notifications, notifications);
    },

    getUnreadCount() {
        return this.getNotifications().filter(n => !n.read).length;
    },

    addNotification(notif) {
        const notifications = this.getNotifications();
        notif.id = notif.id || 'n' + Date.now();
        notif.createdAt = notif.createdAt || new Date().toISOString();
        notif.read = false;
        notifications.unshift(notif);
        this._set(STORAGE_KEYS.notifications, notifications);
    },


    // ── Contributions ──

    getContributions() {
        return this._get(STORAGE_KEYS.contributions) || [];
    },

    addContribution(contrib) {
        const contributions = this.getContributions();
        contrib.id = contrib.id || 'c' + Date.now();
        contrib.createdAt = new Date().toISOString();
        contrib.status = contrib.status || 'Pending';
        contributions.unshift(contrib);
        this._set(STORAGE_KEYS.contributions, contributions);
        return contrib;
    },

    getContributionById(id) {
        return this.getContributions().find(c => c.id === id) || null;
    },


    // ── Votes ──

    getVotes() {
        return this._get(STORAGE_KEYS.votes) || {};
    },

    toggleVote(itemId) {
        const votes = this.getVotes();
        if (votes[itemId]) {
            delete votes[itemId];
        } else {
            votes[itemId] = true;
        }
        this._set(STORAGE_KEYS.votes, votes);
        return !!votes[itemId];
    },

    hasVoted(itemId) {
        return !!this.getVotes()[itemId];
    },



    // ── Migrate legacy localStorage keys ──

    migrateLegacy() {
        const isMigrated = localStorage.getItem('studynest._migrated');
        if (isMigrated === 'true') {
            return;
        }

        const legacyLoggedIn = localStorage.getItem('studynest_logged_in');
        const legacyGoogle = localStorage.getItem('studynest_google_login');
        const legacyProfile = localStorage.getItem('studynest_profile_completed');

        const existingAuth = this._get(STORAGE_KEYS.auth);
        if (!existingAuth && legacyLoggedIn === 'true') {
            this.setAuth({
                isLoggedIn: true,
                isGoogleLogin: legacyGoogle === 'true',
                isEmailVerified: true,
                profileCompleted: legacyProfile === 'true'
            });
        }

        const legacyName = localStorage.getItem('studynest_user_name');
        const legacyEmail = localStorage.getItem('studynest_user_email');
        const existingUser = this._get(STORAGE_KEYS.user);
        if (!existingUser && (legacyName || legacyEmail)) {
            this.setUser({
                name: legacyName || '',
                email: legacyEmail || '',
                country: localStorage.getItem('studynest_country') || '',
                studyLevel: localStorage.getItem('studynest_study_level') || '',
                institution: localStorage.getItem('studynest_institution') || '',
                department: localStorage.getItem('studynest_department') || ''
            });
        }

        localStorage.setItem('studynest._migrated', 'true');
    },


    // ── Clear everything (for logout) ──

    clearAll() {
        Object.values(STORAGE_KEYS).forEach(key => this._remove(key));
        // Also clear legacy keys
        const legacyKeys = [
            'studynest_user_name', 'studynest_user_email',
            'studynest_logged_in', 'studynest_google_login',
            'studynest_profile_completed', 'studynest_country',
            'studynest_study_level', 'studynest_institution',
            'studynest_department', 'studynest_board', 'studynest_class',
            'studynest_course', 'studynest_medical_university', 'studynest_medical_college',
            'studynest._migrated'
        ];
        legacyKeys.forEach(k => localStorage.removeItem(k));
    }
};


// Auto-migrate on load
DataStore.migrateLegacy();
