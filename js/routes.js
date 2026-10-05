/**
 * StudyNest – Centralized Route Configuration
 * =============================================
 * Single source of truth for ALL internal page routes.
 * Every navigation in the project must reference these constants.
 */

const ROUTES = {

    // ── Auth / Onboarding ──
    login:              'index.html',
    register:           'register.html',
    verifyEmail:        'verify_email.html',
    forgotPassword:     'forgot_password.html',
    resetPassword:      'reset_password.html',

    // ── Profile Setup ──
    country:            'country.html',
    studyLevel:         'study_level.html',
    institution:        'institution.html',

    // ── Main App (authenticated) ──
    home:               'home.html',
    academicCourses:    'academic_courses.html',
    questionBank:       'question_bank.html',
    leaderboard:        'leaderboard.html',
    contribute:         'contribute.html',
    contributionDetails:'contribution_details.html',
    myLibrary:          'my_library.html',
    myContributions:    'my_contributions.html',
    notifications:      'notifications.html',
    profile:            'profile.html',
    settings:           'settings.html',

    // ── Public / Informational ──
    about:              'about.html',
    contact:            'contact.html',
    help:               'help.html',
    terms:              'terms.html',
    privacy:            'privacy.html'
};


/**
 * Sidebar menu items for authenticated pages.
 * Order matters – this is the canonical sidebar ordering.
 */
const SIDEBAR_MENU = [
    { label: 'Home',                 icon: 'fa-solid fa-house',                  href: ROUTES.home },
    { label: 'Academic Courses',     icon: 'fa-solid fa-book-open',              href: ROUTES.academicCourses },
    { label: 'Campus Question Bank', icon: 'fa-solid fa-file-circle-question',   href: ROUTES.questionBank },
    { label: 'Leaderboard',         icon: 'fa-solid fa-trophy',                 href: ROUTES.leaderboard },
    { label: 'Contribute',          icon: 'fa-solid fa-users',                  href: ROUTES.contribute },
    { label: 'My Library',          icon: 'fa-regular fa-bookmark',             href: ROUTES.myLibrary },
    { label: 'My Contributions',    icon: 'fa-solid fa-folder-open',            href: ROUTES.myContributions },
    { label: 'Settings',            icon: 'fa-solid fa-gear',                   href: ROUTES.settings },
    { header: 'Support' },
    { label: 'About Us',            icon: 'fa-solid fa-circle-info',            href: ROUTES.about },
    { label: 'Contact Us',          icon: 'fa-regular fa-envelope',             href: ROUTES.contact },
    { label: 'Help & FAQ',          icon: 'fa-regular fa-circle-question',      href: ROUTES.help },
    { header: 'Legal' },
    { label: 'Terms of Service',    icon: 'fa-regular fa-file-lines',           href: ROUTES.terms },
    { label: 'Privacy Policy',      icon: 'fa-solid fa-shield-halved',          href: ROUTES.privacy },
    { divider: true },
    { label: 'Log Out',             icon: 'fa-solid fa-right-from-bracket',     action: 'logout' }
];


/**
 * Footer support links – canonical ordering.
 */
const FOOTER_LINKS = [
    { label: 'About Us',           href: ROUTES.about },
    { label: 'Contact Us',         href: ROUTES.contact },
    { label: 'Help & FAQ',         href: ROUTES.help },
    { label: 'Terms of Service',   href: ROUTES.terms },
    { label: 'Privacy Policy',     href: ROUTES.privacy }
];


/**
 * Profile dropdown items.
 */
const PROFILE_DROPDOWN_ITEMS = [
    { label: 'View Profile',  icon: 'fa-regular fa-user',        href: ROUTES.profile },
    { label: 'Settings',      icon: 'fa-solid fa-gear',           href: ROUTES.settings },
    { label: 'Log Out',       icon: 'fa-solid fa-right-from-bracket', action: 'logout' }
];


/**
 * Pages that require authentication to access.
 * Guests will be redirected to login when visiting these pages.
 */
const PROTECTED_PAGES = [
    ROUTES.contribute,
    ROUTES.myLibrary,
    ROUTES.myContributions,
    ROUTES.contributionDetails,
    ROUTES.profile,
    ROUTES.settings,
    ROUTES.notifications
];


/**
 * Pages that are freely accessible without authentication.
 * Guests can browse these without logging in.
 */
const PUBLIC_PAGES = [
    ROUTES.home,
    ROUTES.academicCourses,
    ROUTES.questionBank,
    ROUTES.leaderboard,
    ROUTES.about,
    ROUTES.contact,
    ROUTES.help,
    ROUTES.terms,
    ROUTES.privacy,
    ROUTES.login,
    ROUTES.register,
    ROUTES.verifyEmail,
    ROUTES.forgotPassword,
    ROUTES.resetPassword,
    ROUTES.country,
    ROUTES.studyLevel,
    ROUTES.institution
];


/**
 * Actions that require authentication.
 * When a guest triggers these, show an auth prompt instead of performing the action.
 */
const AUTH_REQUIRED_ACTIONS = {
    vote:        'vote on content',
    save:        'save to your library',
    contribute:  'contribute resources',
    bookmark:    'bookmark this item',
    comment:     'post a comment',
    download:    'download this resource'
};

