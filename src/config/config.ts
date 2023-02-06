export async function setTheme(name) {
    let json = await import(`../config/Themes/${name}-theme.json`);
    const theme = Object.entries(json.theme);
    for (const t of theme) {
        const property = `${t[0]}`;
        let value = t[1] as string;
        if (getComputedStyle(document.documentElement).getPropertyValue(`--${property}`)) {
            document.documentElement.style.setProperty(`--${property}`, value);
        }
    }
}