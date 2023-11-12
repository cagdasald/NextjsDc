import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";

export const NavigationSideBar = async() => {
    const profile = await currentProfile();

    if(!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    id: profile.id
                }
            }
        }
    
    });

    return (
        <div className="space-y-4 flex flex-col items-center
        h-full text-primary w-full dark:bg-[#0a0e15] py-3">
            <NavigationAction/>
        </div>
    )
}