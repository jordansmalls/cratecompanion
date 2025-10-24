import { SettingsForm } from "../components/forms/settings-form";
import Navbar from "../components/navbar/Navbar";

const Settings = () => {
    return (
        <div className="flex flex-col">

        <div>
            <Navbar />
        </div>

        <div className="w-1/2 self-center-safe mt-[5rem]">
            <SettingsForm />
        </div>

        </div>
     );
}

export default Settings;