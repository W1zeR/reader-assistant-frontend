import { Metadata } from "next";
import SettingsForm from "@/components/Forms/SettingsForm";

export const metadata: Metadata = {
  title: "Помощник читателя | Настройки",
  description: "Это страница с настройками аккаунта"
};

const Settings = () => {
  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-nowrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Настройки аккаунта
                </h3>
                <div className="mb-8 flex items-center justify-center" />
                <SettingsForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
