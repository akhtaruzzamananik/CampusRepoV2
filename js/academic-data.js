/**
 * StudyNest – Academic Data
 * ==========================
 * Central academic data structure for institutions, departments, etc.
 * Used by institution.html, contribute.html, settings.html, profile.html, etc.
 */

const AcademicData = {

    countries: [
        { code: 'BD', name: 'Bangladesh' },
        { code: 'IN', name: 'India' },
        { code: 'PK', name: 'Pakistan' },
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' }
    ],

    studyLevels: [
        { id: 'University',           icon: '🎓', label: 'University',           description: 'Undergraduate & postgraduate studies' },
        { id: 'Medical',              icon: '🩺', label: 'Medical',              description: 'MBBS, BDS and medical education' },
        { id: 'Polytechnic',          icon: '⚙️', label: 'Polytechnic',          description: 'Diploma and technical education' },
        { id: 'National University',  icon: '📚', label: 'National University',  description: 'Undergraduate and postgraduate programs' },
        { id: 'School',               icon: '🏫', label: 'School',               description: 'School-level education' },
        { id: 'College',              icon: '📖', label: 'College',              description: 'Higher secondary education' }
    ],

    /**
     * Universities keyed by country, then by study level.
     */
    institutions: {
        'Bangladesh': {
            'University': [
                {
                    name: 'Daffodil International University',
                    departments: [
                        'Computer Science & Engineering',
                        'Software Engineering',
                        'Electrical & Electronic Engineering',
                        'Civil Engineering',
                        'Business Administration',
                        'English',
                        'Textile Engineering',
                        'Pharmacy',
                        'Law',
                        'Journalism & Mass Communication'
                    ]
                },
                {
                    name: 'University of Dhaka',
                    departments: [
                        'Computer Science & Engineering',
                        'Electrical & Electronic Engineering',
                        'Physics',
                        'Chemistry',
                        'Mathematics',
                        'English',
                        'Business Administration',
                        'Law',
                        'Economics'
                    ]
                },
                {
                    name: 'Bangladesh University of Engineering and Technology',
                    departments: [
                        'Computer Science & Engineering',
                        'Electrical & Electronic Engineering',
                        'Mechanical Engineering',
                        'Civil Engineering',
                        'Chemical Engineering',
                        'Architecture'
                    ]
                },
                {
                    name: 'BRAC University',
                    departments: [
                        'Computer Science & Engineering',
                        'Electrical & Electronic Engineering',
                        'Architecture',
                        'Business Administration',
                        'English',
                        'Economics',
                        'Pharmacy',
                        'Law'
                    ]
                },
                {
                    name: 'North South University',
                    departments: [
                        'Computer Science & Engineering',
                        'Electrical & Electronic Engineering',
                        'Business Administration',
                        'Economics',
                        'English',
                        'Architecture'
                    ]
                }
            ],
            'Medical': {
                'Dhaka University (DU)': {
                    'MBBS': [
                        'Dhaka Medical College',
                        'Sir Salimullah Medical College',
                        'Shaheed Suhrawardy Medical College',
                        'Mymensingh Medical College',
                        'Faridpur Medical College',
                        'Sher-E-Bangla Medical College',
                        'Shaheed Tajuddin Ahmad Medical College',
                        'Sheikh Sayera Khatun Medical College, Gopalganj',
                        'Enam Medical College',
                        'Bangladesh Medical College',
                        'Ibrahim Medical College (BIRDEM)',
                        'Holy Family Red Crescent Medical College',
                        'Anwer Khan Modern Medical College',
                        'Kumudini Women\'s Medical College'
                    ],
                    'BDS': [
                        'Dhaka Dental College',
                        'Dental Unit, Sir Salimullah Medical College',
                        'Dental Unit, Shaheed Suhrawardy Medical College',
                        'Dental Unit, Mymensingh Medical College',
                        'Dental Unit, Sher-E-Bangla Medical College',
                        'Pioneer Dental College',
                        'Sapporo Dental College',
                        'City Dental College, Dhaka',
                        'Bangladesh Dental College',
                        'University Dental College',
                        'Marks Dental College',
                        'Mandi Dental College'
                    ]
                },
                'Rajshahi Medical University (RMU)': {
                    'MBBS': [
                        'Rajshahi Medical College',
                        'Rangpur Medical College',
                        'Shaheed Ziaur Rahman Medical College',
                        'Dinajpur Medical College',
                        'Bogura Medical College',
                        'Pabna Medical College',
                        'Kushtia Medical College',
                        'Shaheed M. Monsur Ali Medical College, Sirajganj',
                        'Naogaon Medical College',
                        'Nilphamari Medical College',
                        'Islami Bank Medical College, Rajshahi',
                        'Barind Medical College, Rajshahi',
                        'TMSS Medical College, Bogura'
                    ],
                    'BDS': [
                        'Dental Unit, Rajshahi Medical College',
                        'Dental Unit, Rangpur Medical College',
                        'Udayan Dental College, Rajshahi',
                        'Dental Unit, Islami Bank Medical College, Rajshahi',
                        'Rangpur Community Dental College',
                        'Dental Unit, TMSS Medical College, Bogura'
                    ]
                },
                'Chittagong Medical University (CMU)': {
                    'MBBS': [
                        'Chittagong Medical College',
                        'Comilla Medical College',
                        'Noakhali Medical College',
                        "Cox's Bazar Medical College",
                        'Chandpur Medical College',
                        'Rangamati Medical College',
                        'Brahmanbaria Medical College',
                        'Southern Medical College',
                        'Marine City Medical College',
                        'BGC Trust Medical College'
                    ],
                    'BDS': [
                        'Dental Unit, Chittagong Medical College',
                        'Chittagong International Dental College',
                        'Dental Unit, Southern Medical College'
                    ]
                },
                'Sylhet Medical University (SMU)': {
                    'MBBS': [
                        'Sylhet MAG Osmani Medical College',
                        'Jalalabad Ragib-Rabeya Medical College',
                        'North East Medical College',
                        'Parkview Medical College',
                        'Sylhet Women\'s Medical College',
                        'Bangabandhu Medical College, Sunamganj'
                    ],
                    'BDS': [
                        'Dental Unit, Sylhet MAG Osmani Medical College',
                        'Dental Unit, Jalalabad Ragib-Rabeya Medical College',
                        'Dental Unit, North East Medical College'
                    ]
                },
                'Khulna Medical University (KMU)': {
                    'MBBS': [
                        'Khulna Medical College',
                        'Jessore Medical College',
                        'Satkhira Medical College',
                        'Magura Medical College',
                        'Ad-din Akij Medical College, Khulna',
                        'Gazi Medical College, Khulna'
                    ],
                    'BDS': [
                        'Dental Unit, Khulna Medical College',
                        'Dental Unit, Jessore Medical College',
                        'City Dental College, Khulna'
                    ]
                },
                'Bangabandhu Sheikh Mujib Medical University (BSMMU)': {
                    'MBBS': [
                        'Faculty of Medicine, BSMMU',
                        'National Institute of Cardiovascular Diseases (NICVD)',
                        'National Institute of Neurosciences & Hospital (NINS)'
                    ],
                    'BDS': [
                        'Faculty of Dentistry, BSMMU'
                    ]
                }
            },
            'Polytechnic': {
                institutes: [
                    'Dhaka Polytechnic Institute',
                    'Chittagong Polytechnic Institute',
                    'Rajshahi Polytechnic Institute',
                    'Rangpur Polytechnic Institute',
                    'Khulna Polytechnic Institute',
                    'Mymensingh Polytechnic Institute'
                ],
                departments: [
                    'Computer Technology',
                    'Electrical Technology',
                    'Electronics Technology',
                    'Civil Technology',
                    'Mechanical Technology',
                    'Architecture Technology'
                ]
            },
            'boards': [
                'Dhaka Board',
                'Rajshahi Board',
                'Comilla Board',
                'Jessore Board',
                'Chittagong Board',
                'Barisal Board',
                'Sylhet Board',
                'Dinajpur Board',
                'Mymensingh Board',
                'Madrasah Education Board',
                'Technical Education Board'
            ],
            'National University': {
                programTypes: [
                    { id: 'honours', name: 'General Honours' },
                    { id: 'degree', name: 'General Degree' },
                    { id: 'professional', name: 'Professional' }
                ],
                programs: {
                    'honours': [
                        { id: 'english', name: 'English' },
                        { id: 'economics', name: 'Economics' },
                        { id: 'accounting', name: 'Accounting' },
                        { id: 'management', name: 'Management' },
                        { id: 'political-science', name: 'Political Science' },
                        { id: 'physics', name: 'Physics' }
                    ],
                    'degree': [
                        { id: 'ba-pass', name: 'B.A. (Pass)' },
                        { id: 'bss-pass', name: 'B.S.S. (Pass)' },
                        { id: 'bsc-pass', name: 'B.Sc. (Pass)' },
                        { id: 'bbs-pass', name: 'B.B.S. (Pass)' }
                    ],
                    'professional': [
                        { id: 'prof-bba', name: 'Professional BBA', structure: 'semester' },
                        { id: 'prof-cse', name: 'Computer Science (CSE)', structure: 'semester' },
                        { id: 'prof-thm', name: 'Tourism & Hospitality', structure: 'semester' }
                    ]
                },
                years: {
                    'honours': ['1st Year', '2nd Year', '3rd Year', '4th Year'],
                    'degree': ['1st Year', '2nd Year', '3rd Year'],
                    'semester': ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']
                },
                examTypes: [
                    { id: 'in_course', name: 'In-Course', scopeType: 'INSTITUTION' },
                    { id: 'test', name: 'Test', scopeType: 'INSTITUTION' },
                    { id: 'practical', name: 'Practical', scopeType: 'INSTITUTION', requiresPractical: true },
                    { id: 'viva', name: 'Viva', scopeType: 'INSTITUTION', requiresViva: true },
                    { id: 'final', name: 'Final Examination', scopeType: 'NATIONAL_UNIVERSITY' }
                ],
                colleges: [
                    'Dhaka College',
                    'Eden Mohila College',
                    'Tejgaon College',
                    'Titumir College',
                    'Govt. Bangla College',
                    'Ananda Mohan College',
                    'Carmichael College',
                    'Rajshahi College',
                    'Chittagong College'
                ],
                subjects: {
                    'english': {
                        '1st Year': [{id:'eng101', name:'Introduction to Poetry'}, {id:'eng102', name:'English Reading Skills'}],
                        '2nd Year': [{id:'eng201', name:'Romantic Poetry'}, {id:'eng202', name:'Advanced Reading and Writing'}],
                        '3rd Year': [{id:'eng301', name:'Victorian Poetry'}, {id:'eng302', name:'Modern Drama'}],
                        '4th Year': [{id:'eng401', name:'American Literature'}, {id:'eng402', name:'Classics in Translation'}]
                    },
                    'physics': {
                        '1st Year': [{id:'phy101', name:'Mechanics'}, {id:'phy102', name:'Electricity and Magnetism', hasPractical: true}],
                        '2nd Year': [{id:'phy201', name:'Optics'}, {id:'phy202', name:'Thermodynamics', hasPractical: true}]
                    },
                    'prof-bba': {
                        '1st Semester': [{id:'pbba101', name:'Introduction to Business'}, {id:'pbba102', name:'Business Mathematics'}],
                        '2nd Semester': [{id:'pbba201', name:'Financial Accounting'}]
                    },
                    'default': {
                        '1st Year': [{id:'gen101', name:'Fundamentals of Program 1'}, {id:'gen102', name:'Core Subject 1', hasPractical: true}],
                        '2nd Year': [{id:'gen201', name:'Core Subject 2'}, {id:'gen202', name:'Advanced Studies'}],
                        '3rd Year': [{id:'gen301', name:'Major Subject 1'}],
                        '4th Year': [{id:'gen401', name:'Specialization 1'}, {id:'gen402', name:'Project / Thesis'}],
                        '1st Semester': [{id:'sem101', name:'Fundamentals 1'}],
                        '2nd Semester': [{id:'sem201', name:'Core 2'}]
                    }
                }
            },
            'School': {
                classes: [
                    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
                    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'
                ],
                subjectsByClass: {
                    'Class 1': ['Bangla', 'English', 'Mathematics'],
                    'Class 2': ['Bangla', 'English', 'Mathematics'],
                    'Class 3': ['Bangla', 'English', 'Mathematics', 'Science', 'Social Science'],
                    'Class 4': ['Bangla', 'English', 'Mathematics', 'Science', 'Social Science'],
                    'Class 5': ['Bangla', 'English', 'Mathematics', 'Science', 'Social Science'],
                    'Class 6': ['Bangla', 'English', 'Mathematics', 'Science', 'Social Science', 'Religion', 'ICT'],
                    'Class 7': ['Bangla', 'English', 'Mathematics', 'Science', 'Social Science', 'Religion', 'ICT'],
                    'Class 8': ['Bangla', 'English', 'Mathematics', 'Science', 'Social Science', 'Religion', 'ICT'],
                    'Class 9': ['Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Higher Math', 'Accounting', 'Finance', 'Geography', 'History', 'Religion', 'ICT'],
                    'Class 10': ['Bangla', 'English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Higher Math', 'Accounting', 'Finance', 'Geography', 'History', 'Religion', 'ICT']
                },
                examTypes: [
                    'First Term',
                    'Second Term',
                    'Half-Yearly',
                    'Third Term',
                    'Final / Annual',
                    'Pre-Test',
                    'Test'
                ],
                schoolsByBoard: {
                    'Dhaka Board': ['Dhaka Residential Model College', 'Ideal School and College', 'Rajuk Uttara Model College', 'Viqarunnisa Noon School'],
                    'Rajshahi Board': ['Rajshahi Collegiate School', 'Rajshahi Government City College', 'Rajshahi Govt. Girls\' High School'],
                    'Comilla Board': ['Comilla Zilla School', 'Nawab Faizunnesa Govt. Girls\' High School'],
                    'Jessore Board': ['Jessore Zilla School', 'Jessore Govt. Girls\' High School'],
                    'Chittagong Board': ['Chittagong Collegiate School', 'Dr. Khastagir Govt. Girls\' High School'],
                    'Barisal Board': ['Barisal Zilla School', 'Barisal Govt. Girls\' High School'],
                    'Sylhet Board': ['Sylhet Govt. Pilot High School', 'Blue Bird High School'],
                    'Dinajpur Board': ['Dinajpur Zilla School', 'Dinajpur Govt. Girls\' High School'],
                    'Mymensingh Board': ['Mymensingh Zilla School', 'Vidyamoyee Govt. Girls\' High School']
                }
            },
            'College': {
                courses: [
                    { id: 'physics', name: 'Physics' },
                    { id: 'chemistry', name: 'Chemistry' },
                    { id: 'higher-mathematics', name: 'Higher Mathematics' },
                    { id: 'biology', name: 'Biology' },
                    { id: 'accounting', name: 'Accounting' },
                    { id: 'finance', name: 'Finance & Banking' },
                    { id: 'economics', name: 'Economics' },
                    { id: 'business-org', name: 'Business Organization and Management' },
                    { id: 'ict', name: 'ICT' },
                    { id: 'bangla', name: 'Bangla' },
                    { id: 'english', name: 'English' }
                ],
                examTypes: [
                    'First Term',
                    'Second Term',
                    'Half-Yearly',
                    'Test',
                    'Pre-Test',
                    'Final / Annual'
                ],
                collegesByBoard: {
                    'Dhaka Board': ['Dhaka College', 'Notre Dame College', 'Holy Cross College', 'Rajuk Uttara Model College'],
                    'Rajshahi Board': ['Rajshahi College', 'New Govt. Degree College', 'Rajshahi Govt. City College'],
                    'Comilla Board': ['Comilla Victoria Govt. College', 'Comilla Govt. College'],
                    'Jessore Board': ['Michael Madhusudan College', 'Jessore Govt. City College'],
                    'Chittagong Board': ['Chittagong College', 'Haji Muhammad Mohsin College'],
                    'Barisal Board': ['Brojomohun College', 'Govt. Syed Hatem Ali College'],
                    'Sylhet Board': ['MC College', 'Sylhet Govt. College'],
                    'Dinajpur Board': ['Dinajpur Govt. College', 'Dinajpur Govt. City College'],
                    'Mymensingh Board': ['Mymensingh Govt. College', 'Ananda Mohan College']
                }
            }
        }
    },

    /**
     * Get institutions for a given country and study level.
     */
    getInstitutions(country, studyLevel) {
        const countryData = this.institutions[country];
        if (!countryData) return [];

        if (studyLevel === 'University') {
            return (countryData['University'] || []).map(u => u.name);
        }
        return [];
    },

    /**
     * Get departments for a given institution within a country.
     */
    getDepartments(country, institution) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['University']) return [];

        const uni = countryData['University'].find(u => u.name === institution);
        return uni ? uni.departments : [];
    },

    /**
     * Get medical universities for a country.
     */
    getMedicalUniversities(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['Medical']) return {};
        return countryData['Medical'];
    },

    /**
     * Get courses (MBBS, BDS) for a medical university.
     */
    getMedicalCourses(country, university) {
        const medData = this.getMedicalUniversities(country);
        if (!medData || !medData[university]) return [];
        return Object.keys(medData[university]);
    },

    /**
     * Get colleges for a medical university and course.
     */
    getMedicalColleges(country, university, course) {
        const medData = this.getMedicalUniversities(country);
        if (!medData || !medData[university] || !medData[university][course]) return [];
        return medData[university][course];
    },

    /**
     * Get polytechnic data for a country.
     */
    getPolytechnicData(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['Polytechnic']) return { institutes: [], departments: [] };
        return countryData['Polytechnic'];
    },

    /**
     * Get education boards for a country.
     */
    getBoards(country) {
        const countryData = this.institutions[country];
        return countryData ? (countryData['boards'] || []) : [];
    },

    /**
     * Get National University departments for a country.
     */
    getNationalUniversityDepts(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['National University']) return [];
        return countryData['National University'].departments || [];
    },

    /**
     * Get School Classes.
     */
    getSchoolClasses(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['School']) return [];
        return countryData['School'].classes || [];
    },

    /**
     * Get School Subjects by Class.
     */
    getSchoolSubjects(country, schoolClass) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['School']) return [];
        return countryData['School'].subjectsByClass[schoolClass] || [];
    },

    /**
     * Get School Exam Types.
     */
    getSchoolExamTypes(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['School']) return [];
        return countryData['School'].examTypes || [];
    },

    /**
     * Get Schools by Board.
     */
    getSchoolsByBoard(country, board) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['School']) return [];
        return countryData['School'].schoolsByBoard[board] || [];
    },

    /**
     * Get College Courses.
     */
    getCollegeCourses(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['College']) return [];
        return countryData['College'].courses || [];
    },

    /**
     * Get College Exam Types.
     */
    getCollegeExamTypes(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['College']) return [];
        return countryData['College'].examTypes || [];
    },

    /**
     * Get Colleges by Board.
     */
    getCollegesByBoard(country, board) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['College']) return [];
        return countryData['College'].collegesByBoard[board] || [];
    },

    /**
     * Get National University Program Types.
     */
    getNuProgramTypes(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['National University']) return [];
        return countryData['National University'].programTypes || [];
    },

    /**
     * Get National University Programs.
     */
    getNuPrograms(country, programType) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['National University']) return [];
        const progs = countryData['National University'].programs;
        if (!programType) {
            return [...progs['honours'], ...progs['degree'], ...progs['professional']];
        }
        return progs[programType] || [];
    },

    /**
     * Get National University Years/Semesters.
     */
    getNuYears(country, structureType = 'honours') {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['National University']) return [];
        return countryData['National University'].years[structureType] || [];
    },

    /**
     * Get National University Subjects by Program and Year.
     */
    getNuSubjects(country, programId, year) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['National University']) return [];
        const subjectsData = countryData['National University'].subjects || {};
        
        let progData = subjectsData[programId] || subjectsData['default'];
        if (!progData) return [];
        
        return progData[year] || [];
    },

    /**
     * Get National University Exam Types.
     */
    getNuExamTypes(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['National University']) return [];
        return countryData['National University'].examTypes || [];
    },

    /**
     * Get National University Colleges.
     */
    getNuColleges(country) {
        const countryData = this.institutions[country];
        if (!countryData || !countryData['National University']) return [];
        return countryData['National University'].colleges || [];
    },

    // =========================================
    // MEDICAL DATA STRUCTURES
    // =========================================
    
    medicalPrograms: [
        { id: 'MBBS', name: 'MBBS' },
        { id: 'BDS', name: 'BDS' }
    ],

    medicalPhases: {
        'MBBS': [
            '1st Professional',
            '2nd Professional',
            '3rd Professional',
            '4th Professional'
        ],
        'BDS': [
            '1st Professional',
            '2nd Professional',
            '3rd Professional',
            '4th Professional'
        ]
    },

    medicalSubjects: {
        'MBBS': {
            '1st Professional': ['Anatomy', 'Physiology', 'Biochemistry'],
            '2nd Professional': ['Community Medicine', 'Forensic Medicine'],
            '3rd Professional': ['Pharmacology', 'Pathology', 'Microbiology'],
            '4th Professional': ['Medicine', 'Surgery', 'Obstetrics & Gynaecology']
        },
        'BDS': {
            '1st Professional': ['Anatomy', 'Physiology', 'Biochemistry', 'Science of Dental Materials'],
            '2nd Professional': ['General Pharmacology', 'Pathology & Microbiology', 'Oral Anatomy & Physiology'],
            '3rd Professional': ['General Medicine', 'General Surgery', 'Periodontology & Oral Pathology'],
            '4th Professional': ['Oral & Maxillofacial Surgery', 'Conservative Dentistry & Endodontics', 'Prosthodontics', 'Orthodontics & Dentofacial Orthopaedics', 'Pediatric Dentistry', 'Dental Public Health']
        }
    },

    /**
     * Get Medical Programs
     */
    getMedicalPrograms() {
        return this.medicalPrograms;
    },

    /**
     * Get Medical Phases for a specific Program
     */
    getMedicalPhases(program) {
        return this.medicalPhases[program] || [];
    },

    /**
     * Get Medical Subjects for a specific Program and Phase
     */
    getMedicalSubjects(program, phase) {
        if (!this.medicalSubjects[program]) return [];
        return this.medicalSubjects[program][phase] || [];
    }
};
