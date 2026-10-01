/**
 * StudyNest – Shared UI Components
 * ==================================
 * Injects consistent header, sidebar, footer, profile dropdown,
 * and notification badge across ALL authenticated pages.
 *
 * Usage: include this script on every authenticated page AFTER routes.js, data-store.js, auth.js
 * Then call: SharedUI.init('pageName')
 * where pageName matches a key in ROUTES (e.g. 'home', 'academicCourses', etc.)
 */

const SharedUI = {

    currentPage: '',

    /**
     * Initialize shared UI on a page.
     * @param {string} pageName – key from ROUTES that identifies the current page
     */
    init(pageName) {
        this.currentPage = pageName;
        this._removeExistingElements();
        this._injectHeader();
        this._injectSidebar();
        this._injectOverlay();
        this._injectFooter();
        this._bindEvents();
        this._updateNotificationBadge();
        this._loadUserInfo();
    },

    /**
     * Remove existing inline navbar, sidebar, overlay, footer
     * so the shared versions can be injected without duplicates.
     */
    _removeExistingElements() {
        // Remove existing navbars (not our injected one)
        document.querySelectorAll('.navbar:not(#sn-navbar)').forEach(el => el.remove());
        // Remove existing sidebars
        document.querySelectorAll('.sidebar:not(#sn-sidebar), aside.sidebar:not(#sn-sidebar)').forEach(el => el.remove());
        // Remove existing overlays
        document.querySelectorAll('.overlay:not(#sn-overlay)').forEach(el => el.remove());
        // Remove existing footers – replace with placeholder for shared footer
        document.querySelectorAll('footer.footer:not(#sn-footer)').forEach(el => {
            const placeholder = document.createElement('div');
            placeholder.id = 'sn-footer-placeholder';
            el.replaceWith(placeholder);
        });
    },


    // ── HEADER ──

    _injectHeader() {
        const existing = document.getElementById('sn-navbar');
        if (existing) return; // Already injected

        const header = document.createElement('nav');
        header.className = 'navbar';
        header.id = 'sn-navbar';
        header.setAttribute('role', 'navigation');
        header.setAttribute('aria-label', 'Main navigation');

        const user = DataStore.getUser();
        const unread = DataStore.getUnreadCount();

        let hamburgerHTML = '';
        if (this.currentPage !== 'terms' && this.currentPage !== 'privacy') {
            hamburgerHTML = `
                <button class="hamburger" id="hamburgerBtn" 
                        aria-label="Open menu" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>`;
        }

        header.innerHTML = `
            <div class="nav-left">
                ${hamburgerHTML}

                <a href="${ROUTES.home}" class="logo" aria-label="StudyNest home">
                    <div class="logo-icon">
                        <i class="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div class="logo-text">
                        <h2>StudyNest</h2>
                        <p>Learn. Share. Grow.</p>
                    </div>
                </a>
            </div>

            <div class="nav-right">
                <a href="${ROUTES.notifications}" class="notification" id="notificationBtn"
                   aria-label="Notifications${unread > 0 ? ' (' + unread + ' unread)' : ''}">
                    <i class="fa-regular fa-bell"></i>
                    <span class="notification-badge" id="notifBadge" 
                          style="${unread > 0 ? '' : 'display:none'}">${unread}</span>
                </a>

                <div class="nav-divider"></div>

                <div class="profile" id="profileBtn" tabindex="0" 
                     role="button" aria-label="User profile menu" aria-expanded="false">
                    <div class="profile-img">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div class="profile-info">
                        <strong id="navUserName">${user.name || 'Student'}</strong>
                        <span id="navUserStatus">${user.studyLevel || 'Student'}</span>
                    </div>
                    <i class="fa-solid fa-chevron-down profile-arrow"></i>
                </div>

                <div class="profile-dropdown" id="profileDropdown">
                    <a href="${ROUTES.profile}" class="dropdown-item">
                        <i class="fa-regular fa-user"></i> View Profile
                    </a>
                    <a href="${ROUTES.settings}" class="dropdown-item">
                        <i class="fa-solid fa-gear"></i> Settings
                    </a>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item logout-btn" id="logoutBtn">
                        <i class="fa-solid fa-right-from-bracket"></i> Log Out
                    </button>
                </div>
            </div>
        `;

        // Insert at the very top of body
        document.body.insertBefore(header, document.body.firstChild);
    },


    // ── SIDEBAR ──

    _injectSidebar() {
        if (document.getElementById('sn-sidebar')) return;

        const sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        sidebar.id = 'sn-sidebar';
        sidebar.setAttribute('role', 'complementary');
        sidebar.setAttribute('aria-label', 'Side navigation');

        let menuHTML = `
            <div class="sidebar-header">
                <div class="sidebar-logo">
                    <div class="sidebar-logo-icon">
                        <i class="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div>
                        <h3>StudyNest</h3>
                        <p>Learn. Share. Grow.</p>
                    </div>
                </div>
                <button class="close-sidebar" id="closeSidebar" aria-label="Close menu">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="sidebar-menu">
        `;

        const currentFile = window.location.pathname.split('/').pop() || 'index.html';

        SIDEBAR_MENU.forEach(item => {
            if (item.divider) {
                menuHTML += '<div class="sidebar-divider"></div>';
                return;
            }
            if (item.header) {
                menuHTML += `<div class="sidebar-heading" style="padding: 14px 16px 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #8096bb; font-weight: 700; margin-top: 8px;">${item.header}</div>`;
                return;
            }
            if (item.action === 'logout') {
                menuHTML += `
                    <a href="#" id="sidebarLogoutBtn" class="menu-item" style="color: #ff5252;">
                        <i class="${item.icon}"></i>
                        <span>${item.label}</span>
                    </a>
                `;
                return;
            }
            const isActive = item.href === currentFile;
            menuHTML += `
                <a href="${item.href}" class="menu-item${isActive ? ' active' : ''}">
                    <i class="${item.icon}"></i>
                    <span>${item.label}</span>
                </a>
            `;
        });

        menuHTML += '</div>';
        sidebar.innerHTML = menuHTML;
        document.body.appendChild(sidebar);
    },


    // ── OVERLAY ──

    _injectOverlay() {
        if (document.getElementById('sn-overlay')) return;
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'sn-overlay';
        document.body.appendChild(overlay);
    },


    // ── FOOTER ──

    _injectFooter() {
        // Check if a footer placeholder exists
        const placeholder = document.getElementById('sn-footer-placeholder');
        if (!placeholder) return; // Page doesn't want a footer

        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.id = 'sn-footer';

        let linksHTML = '';
        FOOTER_LINKS.forEach(link => {
            linksHTML += `<a href="${link.href}">${link.label}</a>\n`;
        });

        footer.innerHTML = `
            <div class="footer-top">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <div class="footer-logo-icon">
                            <i class="fa-solid fa-graduation-cap"></i>
                        </div>
                        <div>
                            <h3>StudyNest</h3>
                            <p>Learn. Share. Grow.</p>
                        </div>
                    </div>
                    <p class="footer-description">
                        A student-driven platform for learning, sharing and growing together.
                    </p>
                    <div class="socials">
                        <a href="#" class="social" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" class="social" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
                        <a href="#" class="social" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="social" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#" class="social" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>

                <div class="footer-column">
                    <h4><i class="fa-solid fa-headset"></i>&nbsp; Support</h4>
                    <div class="footer-links">
                        ${linksHTML}
                    </div>
                </div>

                <div class="footer-column">
                    <h4><i class="fa-regular fa-envelope"></i>&nbsp; Contact Us</h4>
                    <div class="contact-box">
                        <div class="contact-icon">
                            <i class="fa-regular fa-envelope"></i>
                        </div>
                        <div>
                            <div class="contact-email">support@studynest.com</div>
                            <div class="contact-sub">We'd love to hear from you!</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div>© 2026 StudyNest. All rights reserved.</div>
                <div class="made">
                    <span>♥</span>&nbsp; Made for students, by students.
                </div>
            </div>
        `;

        placeholder.replaceWith(footer);
    },


    // ── EVENT BINDINGS ──

    _bindEvents() {
        const hamburger = document.getElementById('hamburgerBtn');
        const sidebar = document.getElementById('sn-sidebar');
        const overlay = document.getElementById('sn-overlay');
        const closeBtn = document.getElementById('closeSidebar');
        const profileBtn = document.getElementById('profileBtn');
        const profileDropdown = document.getElementById('profileDropdown');
        const logoutBtn = document.getElementById('logoutBtn');

        // Sidebar open
        if (hamburger && sidebar && overlay) {
            hamburger.addEventListener('click', () => {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                hamburger.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            });
        }

        // Sidebar close
        const closeSidebar = () => {
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);

        // Escape key closes sidebar and dropdown
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSidebar();
                if (profileDropdown) profileDropdown.classList.remove('active');
            }
        });

        // Profile dropdown toggle
        if (profileBtn && profileDropdown) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('active');
                profileBtn.setAttribute('aria-expanded',
                    profileDropdown.classList.contains('active'));
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                    profileDropdown.classList.remove('active');
                }
            });
        }

        // Logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                Auth.logoutUser();
            });
        }
        
        const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');
        if (sidebarLogoutBtn) {
            sidebarLogoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                Auth.logoutUser();
            });
        }
    },


    // ── HELPERS ──

    _updateNotificationBadge() {
        const badge = document.getElementById('notifBadge');
        const btn = document.getElementById('notificationBtn');
        if (!badge) return;
        const count = DataStore.getUnreadCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? '' : 'none';
        if (btn) {
            btn.setAttribute('aria-label',
                'Notifications' + (count > 0 ? ' (' + count + ' unread)' : ''));
        }
    },

    _loadUserInfo() {
        const user = DataStore.getUser();
        
        // Helper to update elements by ID or Class
        const updateText = (selector, text) => {
            if (text === undefined || text === null) return;
            document.querySelectorAll(selector).forEach(el => el.textContent = text);
        };

        const name = user.name || 'Akhtaruzzaman Anik';
        const initial = name.charAt(0).toUpperCase();

        updateText('#navUserName, #navName, #userName, #welcomeName, #profileFullName, #displayName', name);
        updateText('#navUserStatus, #displayStudyLevel, #overviewStudyLevel', user.studyLevel || 'University');
        updateText('#userEmail, #profileEmail, #displayEmail', user.email || 'anikanik@gmail.com');
        updateText('#navAvatar, #bigAvatar, #largeAvatar, #profileAvatar, .avatar', initial);
        updateText('#userCountry, #displayCountry, #overviewCountry', user.country || 'Bangladesh');
        updateText('#userStudyLevel', user.studyLevel || 'University');
        updateText('#userInstitution, #displayInstitution, #overviewInstitution', user.institution || 'Daffodil International University');
        updateText('#userDepartment, #displayDepartment, #overviewDepartment', user.department || 'Computer Science & Engineering');

        // Prepopulate input fields if on settings page
        const fullNameInput = document.getElementById('fullName');
        if (fullNameInput && !fullNameInput.value) {
            fullNameInput.value = name;
        }
        const emailInput = document.getElementById('email');
        if (emailInput && !emailInput.value) {
            emailInput.value = user.email || 'anikanik@gmail.com';
        }
    },

    /**
     * Refresh notification badge (call after marking as read, etc.)
     */
    refreshBadge() {
        this._updateNotificationBadge();
    }
};
