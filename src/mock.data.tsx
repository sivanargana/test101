const mockData = {
    navigation: {
        primary: [
            {
                "label": "Home",
                "icon": "fi fi-rr-home",
                "href": "/admin/home"
            },
            {
                "label": "Inbox",
                "icon": "fi fi-rr-inbox",
                "href": "/admin/inbox"
            },
            {
                "label": "Clients",
                "icon": "fi fi-rr-users",
                "children": [
                    { "label": "Add Clients", "href": "" },
                    { "label": "Manage Clients", "href": "" },
                    { "label": "Manage Client Types", "href": "" },
                    { "label": "Manage Client Countries", "href": "" },
                    { "label": "Manage Client States", "href": "" },
                    { "label": "Manage Client Districts", "href": "" },
                    { "label": "Manage Client Locations", "href": "" }
                ]
            },
            {
                "label": "Cases",
                "icon": "fi fi-rr-legal-case",
                "children": [
                    { "label": "Case Registeration", "href": "" },
                    { "label": "Manage Cases", "href": "" },
                    { "label": "Manage Services", "href": "/admin/services" },
                    { "label": "Manage Status", "href": "/admin/status" }
                ]
            },
            {
                "label": "Employees",
                "icon": "fi fi-rr-users",
                "children": [
                    { "label": "Manage Employees", "href": "" },
                    { "label": "Manage Designations", "href": "" },
                    { "label": "Manage Regions", "href": "" },
                    { "label": "Manage Document types", "href": "" }
                ]
            },
            {
                "label": "Invoices",
                "icon": "fi fi-rr-file-invoice",
                "children": [
                    { "label": "Manage Invoices & Payments", "href": "" },
                    { "label": "Manage Invoice Services", "href": "" },
                    { "label": "Manage Receipts", "href": "" }
                ]
            },
            {
                "label": "Timesheets",
                "icon": "fi fi-rr-clock",
                "children": [
                    { "label": "Manage Activities", "href": "" },
                    { "label": "Manage Holidays", "href": "" },
                    { "label": "Manage Time Sheets", "href": "" },
                    { "label": "Manage Regional Activities", "href": "" },
                    { "label": "Regional Activity Report", "href": "" },
                    { "label": "Add Regional Activity", "href": "" },
                    { "label": "Add Time Sheet", "href": "" },
                    { "label": "Time Sheet Report Generation", "href": "" },
                    { "label": "Timesheet Report Settings", "href": "" },
                    { "label": "Calendar View", "href": "" }
                ]
            },
            {
                "label": "Settings",
                "icon": "fi fi-rr-sliders-v",
                "children": [
                    { "label": "Manage File Name Setting(s)", "href": "" },
                    { "label": "GSTIN Setup", "href": "" },
                    { "label": "Notification Setup", "href": "" },
                    { "label": "Tax Setup", "href": "" },
                    { "label": "Notification User Setup", "href": "" },
                    { "label": "Inbox Settings", "href": "" },
                    { "label": "Single Point Of Contact", "href": "" },
                    { "label": "Manage IP Address", "href": "" },
                    { "label": "User Logs", "href": "" }
                ]
            },
            {
                "label": "Reports",
                "icon": "fi fi-rr-analytics",
                "children": [
                    { "label": "Periodic Report", "href": "" },
                    { "label": "Clientwise Report", "href": "" },
                    { "label": "DWR Report", "href": "" },
                    { "label": "Statuswise Report", "href": "" },
                    { "label": "Case user & expert cases report", "href": "" },
                    { "label": "Case Report", "href": "" },
                    { "label": "Delayed Case Report", "href": "" },
                    { "label": "Discounted Cases Report", "href": "" },
                    { "label": "Write-Off/Cancel Report", "href": "" },
                    { "label": "Invoice Report", "href": "" }
                ]
            },
            {
                "label": "Dashboard",
                "icon": "fi fi-rr-dashboard-monitor",
                "children": [
                    { "label": "Case Dashboard", "href": "" },
                    { "label": "Invoice Dashboard", "href": "" },
                    { "label": "Receipt Dashboard", "href": "" }
                ]
            }
        ],
        secondary: [

            {
                "label": "John Doe",
                "icon": "fi fi-rr-circle-user",
                "children": [
                    { "label": "My Profile", "href": "" },
                    { "label": "Change Password", "href": "" },
                    { "label": "Logout", "href": "" },
                ]
            },

        ]
    },
    inbox:[
    {
        "id": "MRS/CF/004/2025",
        "client": "Wasanth Kumaar, Senior Software Engineer, Anakapalle, Visakhapatnam, ANDHRA PRADESH",
        "purpose": "Data Retrieval",
        "date": "01/09/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/DNA01/001/2025(FL)",
        "client": "CaseUser Cum Expert, American Oncology Institute, North East Delhi, North East Delhi, DELHI",
        "purpose": "Social Networking Websites and Webpages",
        "date": "01/08/2025",
        "status": "Pending"
    },
    {
        "id": "TLH/BC/004/2025(FP)",
        "client": "CaseUser, Syndicate Bank, Visakhapatnam (Urban), Visakhapatnam, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "31/07/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/AV/011/2025(BC_CF_FP_DNA_D",
        "client": "Principal Senior Civil Iudge, Kakinada (Urban), East Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "31/07/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/BC/002/2025(FP)",
        "client": "Ganta Ramu, Kakinada (Urban), East Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "30/07/2025",
        "status": "Pending"
    },
    {
        "id": "MRS/BC/002/2025(CF)",
        "client": "R.Adilaxmi, Kakinada (Urban), East Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "29/07/2025",
        "status": "Pending"
    },
    {
        "id": "MRS/PC/001/2025(PE)",
        "client": "Principal Senior Civil Iudge, Kakinada (Urban), East Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "30/07/2025",
        "status": "Pending"
    },
    {
        "id": "TLI/FA/001/2025(IIC)",
        "client": "ADITI CONSULTANTS PVT. LIMITED, Kakinada (Urban), East Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "29/07/2025",
        "status": "Pending"
    },
    {
        "id": "TLI/IIC/001/2025(IIF)",
        "client": "ADITI CONSULTANTS PVT. LIMITED, Kakinada (Urban), East Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "29/07/2025",
        "status": "Pending"
    },
    {
        "id": "TLI/PC/001/2025(QD)",
        "client": "ADITI INSURANCE SURVEYORS AND LOSS ASSESMENT PVT. LIMITED, Kakinada (Urban), East Godavari, ANDHRA\n                PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "28/07/2025",
        "status": "Pending"
    },
    {
        "id": "MRS/FL/001/2025(PC)",
        "client": "Praveen, Inspector/DIU, Andhra Pradesh Police, Guntur, Guntur, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "29/07/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/PC/001/2025(PE)",
        "client": "Principal Senior Civil Iudge, Kakinada (Urban), East Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "28/07/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/PE/001/2025(QD)",
        "client": "(Deputy Director / Admin), Kakinada (Urban), East Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "29/07/2025",
        "status": "Pending"
    },
    {
        "id": "TLI/CS/001/2025(IIF)",
        "client": "Kumar, 2126 Alizia Canyon, Calabasas, California",
        "purpose": "Social Networking Websites and Webpages",
        "date": "28/07/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/FA/003/2025(IEF)",
        "client": "Kumar, 2126 Alizia Canyon, Calabasas, California",
        "purpose": "Social Networking Websites and Webpages",
        "date": "28/07/2025",
        "status": "Pending"
    },
    {
        "id": "TLH/FL/003/2025(PE)",
        "client": "Testcomnc, Manthani, Karim Nagar, TELANGANA",
        "purpose": "Social Networking Websites and Webpages",
        "date": "25/07/2025",
        "status": "Pending"
    },
    {
        "id": "TLH/BC/002/2025(CF_FP)",
        "client": "Kruthika Chari, Senior Manager , ADIVA HOSPITAL, Saidabad, Hyderabad, TELANGANA",
        "purpose": "Social Networking Websites and Webpages",
        "date": "25/07/2025",
        "status": "Pending"
    },
    {
        "id": "MRS/TR/002/2025",
        "client": "Kumar Vasantha, Jagadamba junction, Visakhapatnam, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "23/07/2025",
        "status": "Pending"
    },
    {
        "id": "MRS/BC/001/2025",
        "client": "Satish, Tadepalligudem, West Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "18/07/2025",
        "status": "Pending"
    },
    {
        "id": "MRS/FPI/001/2025(FC)",
        "client": "Sachin, (Inspector), Warangal, Warangal, TELANGANA",
        "purpose": "Social Networking Websites and Webpages",
        "date": "18/07/2025",
        "status": "Pending"
    },
    {
        "id": "TLK/CS/001/2025(IEF)",
        "client": "Satish, Tadepalligudem, West Godavari, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "17/07/2025",
        "status": "Pending"
    },
    {
        "id": "MRS/CF/003/2025",
        "client": "Wasanth Kumaar, Senior Software Engineer, Anakapalle, Visakhapatnam, ANDHRA PRADESH",
        "purpose": "Data Retrieval not for Legal report",
        "date": "16/07/2025",
        "status": "Pending"
    },
    {
        "id": "TLH/FA/003/2025(IEF_IIC)",
        "client": "Vasu Dev, AP FILM CHAMBER OF COMMERCE, Rajahmundry (Urban), East Godavari, ANDHRA PRADESH",
        "purpose": "testing",
        "date": "15/07/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/IEF/003/2025",
        "client": "Suneesha, Dfdsfdsf, Hyderabad, Hyderabad, TELANGANA",
        "purpose": "Social Networking Websites and Webpages",
        "date": "03/07/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/CF/004/2025",
        "client": "Lakshmi NG, (Advocate), Madhira High COurt, Madhira, Khammam, TELANGANA",
        "purpose": "Social Networking Websites and Webpages",
        "date": "01/07/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/CF/003/2025",
        "client": "The Divisional Manager, Parvatipuram, Vizianagaram, ANDHRA PRADESH",
        "purpose": "gggg",
        "date": "30/06/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/CF/002/2025",
        "client": "G VENKATESHWAR RAO, Hyderabad, Hyderabad, TELANGANA",
        "purpose": "Social Media Application Data Retrieval",
        "date": "26/06/2025",
        "status": "Pending"
    },
    {
        "id": "MSR/IEF/002/2025(IIC)",
        "client": "N.Laxmi, Nampally, Hyderabad, TELANGANA",
        "purpose": "Social Networking Websites and Webpages",
        "date": "23/06/2025",
        "status": "Pending"
    },
    {
        "id": "MRS/TR/001/2025",
        "client": "Wasanth Kumaar, Senior Software Engineer, Anakapalle, Visakhapatnam, ANDHRA PRADESH",
        "purpose": "Social Networking Websites and Webpages",
        "date": "19/06/2025",
        "status": "Pending"
    },
    {
        "id": "TLK/DNA01/001/2025(FL_PE)",
        "client": "Prabhas, Nampally, Hyderabad, TELANGANA",
        "purpose": "Employee Screening",
        "date": "08/06/2025",
        "status": "Pending"
    }
]
}

export default mockData;