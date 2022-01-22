const toggleDarkMode = (document: Document, darkMode: boolean) => {
    document.body.classList.toggle('dark', darkMode);
};

export default toggleDarkMode;
