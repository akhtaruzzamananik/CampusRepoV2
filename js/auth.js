/**
 * StudyNest – Authentication Module
 * ===================================
 * Centralized auth state handling.
 * All pages use these functions instead of direct localStorage calls.
 *
 * When a Django/DRF backend is ready, replace the DEMO_MODE implementations
 * with real API calls via authService.
 */

const Auth = {

    isLoggedIn() {
        return DataStore.getAuth().isLoggedIn === true;
    },

    getCurrentUser() {
        return DataStore.getUser();
    },

    setCurrentUser(data) {
        DataStore.setUser(data);
    },

    isProfileCompleted() {
        return DataStore.getAuth().profileCompleted === true;
    },

    isEmailVerified() {
        return DataStore.getAuth().isEmailVerified === true;
    },

    /**
     * Require authentication – redirect to login if not logged in.
     * Call this at the top of every authenticated page.
     */
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = ROUTES.login;
            return false;
        }
        return true;
    },

    /**
     * Require profile completion – redirect to setup flow if incomplete.
     */
    requireProfileCompletion() {
        if (!this.isProfileCompleted()) {
            window.location.href = ROUTES.country;
            return false;
        }
        return true;
    },

    /**
     * Log out the current user.
     * Clears all auth and session state, then redirects to login.
     */
    logoutUser() {
        DataStore.clearAll();
        window.location.href = ROUTES.login;
    },

    /**
     * Derive a clean full name from email username if name is not set.
     */
    deriveNameFromEmail(email) {
        if (!email) return 'Akhtaruzzaman Anik';
        const prefix = email.split('@')[0];
        const clean = prefix.replace(/[._-]+/g, ' ').trim();
        if (!clean || clean.toLowerCase() === 'student') return 'Akhtaruzzaman Anik';
        return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    },

    /**
     * Log in (prototype / demo mode).
     */
    loginUser(email, password) {
        if (!email || !password) return false;

        DataStore.setAuth({
            isLoggedIn: true,
            isGoogleLogin: false,
            isEmailVerified: true,
            profileCompleted: true
        });

        const currentUser = DataStore.getUser();
        let name = currentUser.name;
        if (!name || name === 'Student') {
            name = this.deriveNameFromEmail(email);
        }

        DataStore.setUser({
            email: email,
            name: name
        });

        return true;
    },

    /**
     * Register (prototype / demo mode).
     */
    registerUser(name, email, password) {
        DataStore.setAuth({
            isLoggedIn: true,
            isGoogleLogin: false,
            isEmailVerified: false,
            profileCompleted: false
        });

        DataStore.setUser({
            name: name || this.deriveNameFromEmail(email),
            email: email
        });

        return true;
    },

    /**
     * Google login (prototype / demo mode).
     */
    googleLogin() {
        const auth = DataStore.getAuth();
        const isExistingUser = auth.profileCompleted === true && auth.isLoggedIn === true;

        DataStore.setAuth({
            isLoggedIn: true,
            isGoogleLogin: true,
            isEmailVerified: true
        });

        const currentUser = DataStore.getUser();
        let name = currentUser.name && currentUser.name !== 'Student' ? currentUser.name : 'Akhtaruzzaman Anik';
        let email = currentUser.email || 'anikanik@gmail.com';

        DataStore.setUser({ name: name, email: email });

        if (isExistingUser) {
            window.location.href = ROUTES.home;
        } else {
            DataStore.setAuth({ profileCompleted: false });
            window.location.href = ROUTES.country;
        }
    }
};


/**
 * AuthService – Backend-ready abstraction layer.
 * In DEMO_MODE, these return simulated promises.
 * Replace with real fetch() calls when backend is ready.
 */
const AuthService = {

    async register(name, email, password) {
        if (DEMO_MODE) {
            Auth.registerUser(name, email, password);
            return { success: true, message: 'Registration successful (demo mode).' };
        }
        // TODO: POST /api/auth/register
        throw new Error('Backend not connected');
    },

    async sendVerificationEmail(email) {
        if (DEMO_MODE) {
            console.log('[DEMO] Verification email would be sent to:', email);
            return { success: true, message: 'Verification code sent (demo mode). Use code: 123456' };
        }
        // TODO: POST /api/auth/send-verification
        throw new Error('Backend not connected');
    },

    async verifyEmail(email, code) {
        if (DEMO_MODE) {
            const cleanCode = String(code || '').trim();
            if (cleanCode === '123456') {
                DataStore.setAuth({ isEmailVerified: true });
                if (email) {
                    DataStore.setUser({ email: email });
                }
                return { success: true, message: 'Email verified successfully!' };
            }
            return { success: false, message: 'Invalid verification code. Use demo code: 123456' };
        }
        // TODO: POST /api/auth/verify-email
        throw new Error('Backend not connected');
    },

    async resendVerification(email) {
        return this.sendVerificationEmail(email);
    },

    async requestPasswordReset(email) {
        if (DEMO_MODE) {
            console.log('[DEMO] Password reset email would be sent to:', email);
            return { success: true, message: 'Reset link sent (demo mode). Use code: 123456' };
        }
        // TODO: POST /api/auth/forgot-password
        throw new Error('Backend not connected');
    },

    async resetPassword(email, code, newPassword) {
        if (DEMO_MODE) {
            if (code === '123456') {
                return { success: true, message: 'Password reset successful (demo mode).' };
            }
            return { success: false, message: 'Invalid code. In demo mode, use: 123456' };
        }
        // TODO: POST /api/auth/reset-password
        throw new Error('Backend not connected');
    },

    async login(email, password) {
        if (DEMO_MODE) {
            const ok = Auth.loginUser(email, password);
            return { success: ok, message: ok ? 'Login successful' : 'Invalid credentials' };
        }
        // TODO: POST /api/auth/login
        throw new Error('Backend not connected');
    }
};
