import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-light theme-toggle"
      onClick={toggleTheme}
      aria-label={t("nav.theme")}
    >
      {theme === "light" ? t("themes.dark") : t("themes.light")}
    </button>
  );
}

export default ThemeToggle;
