import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const ErrorPage: React.FC<Props> = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <p>{t("404")}</p>
    </div>
  );
};
