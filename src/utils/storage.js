const storage = {
    saveStorage: (token, userId, role) => {
        localStorage.setItem(process.env.REACT_APP_USER_TOKEN, token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
    },

    loadStorage: () => {
        const local = {
            token: localStorage.getItem(process.env.REACT_APP_USER_TOKEN),
            userId: localStorage.getItem('userId'),
            role: localStorage.getItem('role'),
        };
        if (!local.token) {
            return false;
        }
        return local;
    },

    clearStorage: () => {
        localStorage.setItem(process.env.REACT_APP_USER_TOKEN, '');
        localStorage.setItem('userId', '');
        localStorage.setItem('role', '');
    }
};

export default storage;