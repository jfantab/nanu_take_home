export const clients = [
    {
        id: 1,
        name: 'client1',
    },
    {
        id: 2,
        name: 'client2',
    },
    {
        id: 3,
        name: 'client3',
    },
    {
        id: 4,
        name: 'client4',
    },
    {
        id: 5,
        name: 'client5',
    },
];

export const data = {
    settings: {
        notifications: {
            email: true,
            sms: false,
            push: {
                android: false,
                ios: true,
            },
        },
        privacy: {
            location: false,
            camera: true,
            microphone: false,
        },
        security: {
            twoFactorAuth: false,
            backupCodes: true,
        },
    },
    preferences: {
        theme: {
            darkMode: false,
            highContrast: false,
        },
        language: {
            english: true,
            spanish: false,
            nested: {
                regionalDialects: {
                    catalan: true,
                    quechua: false,
                },
            },
        },
    },
    integrations: {
        slack: false,
        github: {
            issues: true,
            pullRequests: false,
        },
        jira: {
            basic: false,
            advanced: {
                workflows: true,
                automations: false,
            },
        },
    },
};
