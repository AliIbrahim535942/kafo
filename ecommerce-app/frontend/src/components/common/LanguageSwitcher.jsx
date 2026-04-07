import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    navigate(location.pathname + location.search, { replace: true });
  };

  return (
    <select
      className="form-select form-select-sm language-switcher"
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      aria-label={t("nav.language")}
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}

export default LanguageSwitcher;
