import ModeToggle from "@/components/util/mode-toggle";
import Main from "@/components/main";
import {Toaster} from "sonner";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <Toaster position={"top-center"} richColors/>
            <Main />
            <ModeToggle/>
        </div>
    );
}
