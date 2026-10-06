/**
 * Campus Repo – Academic Preferences Module
 * =========================================
 * Manages academic preferences (study level, institution, department, etc.)
 * independently of authentication state.
 *
 * Works for BOTH guest and logged-in users:
 * - Guests: preferences stored in localStorage under 'Campus Repo.guest_prefs'
 * - Logged-in: preferences stored in the user object (Campus Repo.user)
 *
 * This module provides a unified API so pages don't need to know
 * whether the user is a guest or authenticated.
 *
 * Load AFTER: routes.js, data-store.js, auth.js
 */

const GUEST_PREFS_KEY = 'Campus Repo.guest_prefs';

const AcademicPreferences = {

    /**
     * Default preferences used when nothing is stored yet.
     */
    _defaults: {
        country: 'Bangladesh',
        studyLevel: 'University',
        institution: 'Daffodil International University',
        department: 'Computer Science & Engineering',
        board: '',
        class: '',
        course: '',
        medicalUniversity: '',
        college: ''
    },

    // ── Internal helpers ──

    _getGuestPrefs() {
        try {
            const raw = localStorage.getItem(GUEST_PREFS_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    _setGuestPrefs(data) {
        const current = this._getGuestPrefs() || { ...this._defaults };
        const updated = { ...current, ...data };
        localStorage.setItem(GUEST_PREFS_KEY, JSON.stringify(updated));
        return updated;
    },

    // ── Public API ──

    /**
     * Get current academic preferences.
     * If logged in, reads from user data.
     * If guest, reads from guest prefs in localStorage.
     */
    get() {
        if (Auth.isLoggedIn()) {
            const user = DataStore.getUser();
            return {
                country: user.country || this._defaults.country,
                studyLevel: user.studyLevel || this._defaults.studyLevel,
                institution: user.institution || this._defaults.institution,
                department: user.department || this._defaults.department,
                board: user.board || '',
                class: user.class || '',
                course: user.course || '',
                medicalUniversity: user.medicalUniversity || '',
                college: user.college || ''
            };
        }

        // Guest mode
        const guest = this._getGuestPrefs();
        if (guest) {
            return {
                country: guest.country || this._defaults.country,
                studyLevel: guest.studyLevel || this._defaults.studyLevel,
                institution: guest.institution || this._defaults.institution,
                department: guest.department || this._defaults.department,
                board: guest.board || '',
                class: guest.class || '',
                course: guest.course || '',
                medicalUniversity: guest.medicalUniversity || '',
                college: guest.college || ''
            };
        }

        return { ...this._defaults };
    },

    /**
     * Update academic preferences.
     * If logged in, saves to user data.
     * If guest, saves to guest prefs.
     */
    set(data) {
        if (Auth.isLoggedIn()) {
            DataStore.setUser(data);
        } else {
            this._setGuestPrefs(data);
        }
    },

    /**
     * Check if a study level has been explicitly chosen by the user/guest.
     */
    hasChosenStudyLevel() {
        if (localStorage.getItem('Campus Repo.has_chosen_level') === 'true') {
            return true;
        }
        if (Auth.isLoggedIn()) {
            const user = DataStore.getUser();
            return !!(user && user.studyLevel);
        }
        const guest = this._getGuestPrefs();
        return !!(guest && guest.studyLevelChosen);
    },

    /**
     * Set a specific field and reset dependent fields when necessary.
     * E.g., changing studyLevel resets institution, department, etc.
     */
    setStudyLevel(studyLevel) {
        this.set({
            studyLevel: studyLevel,
            studyLevelChosen: true,
            institution: '',
            department: '',
            board: '',
            class: '',
            course: '',
            medicalUniversity: '',
            college: ''
        });
        localStorage.setItem('Campus Repo.has_chosen_level', 'true');
    },

    setInstitution(institution) {
        this.set({
            institution: institution,
            department: ''
        });
    },

    setCountry(country) {
        this.set({
            country: country,
            studyLevel: '',
            institution: '',
            department: '',
            board: '',
            class: '',
            course: '',
            medicalUniversity: '',
            college: ''
        });
    },

    /**
     * Merge guest preferences into user data on login/register.
     * Called after successful authentication.
     * Guest prefs are applied as the user's initial prefs
     * (unless the user already has prefs set from a previous session).
     */
    mergeGuestPrefsOnLogin() {
        const guestPrefs = this._getGuestPrefs();
        if (!guestPrefs) return;

        const currentUser = DataStore.getUser();

        // Only merge if the user doesn't already have preferences from a previous session
        // Check if user has explicitly set preferences already
        const userRaw = DataStore._get('Campus Repo.user');
        const hasExistingPrefs = userRaw && userRaw.studyLevel;

        if (!hasExistingPrefs) {
            DataStore.setUser({
                country: guestPrefs.country || currentUser.country,
                studyLevel: guestPrefs.studyLevel || currentUser.studyLevel,
                institution: guestPrefs.institution || currentUser.institution,
                department: guestPrefs.department || currentUser.department,
                board: guestPrefs.board || currentUser.board,
                class: guestPrefs.class || currentUser.class,
                course: guestPrefs.course || currentUser.course,
                medicalUniversity: guestPrefs.medicalUniversity || currentUser.medicalUniversity,
                college: guestPrefs.college || currentUser.college
            });
        }

        // Clear guest prefs after merge
        localStorage.removeItem(GUEST_PREFS_KEY);
    },

    /**
     * Check if guest has set any preferences.
     */
    hasGuestPrefs() {
        return this._getGuestPrefs() !== null;
    }
};
