import Link from 'next/link';
import SidebarItems from './SidebarItems';
import { Avatar, AvatarFallback } from './ui/avatar';
import { AuthSession, getUserAuth } from '@/lib/auth/utils';
import SignOutBtn from './auth/SignOutBtn';
import ChangeLanguageBtn from './translateText/changeLenguage';


const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return (
    <aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold ml-4">Dashboard</h3>
          <SidebarItems />
        </div>
        <div className="mt-auto p-4 rounded-lg">
          <UserDetails session={session} />
          <ChangeLanguageBtn /> {/* Botón para cambiar idioma */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

const UserDetails = ({ session }: { session: AuthSession }) => {
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <>
    <Link href="/account">
      <div className="flex items-center justify-between w-full border-t border-border pt-4 px-2 py-2">
        <Avatar className="h-10 w-10 me-1">
          <AvatarFallback className="border-border border-orange-400 border-2 text-muted-foreground">
            {user.name
              ? user.name
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        </Avatar>
        <div className="text-muted-foreground">
          <p className="text-xs">{user.name}</p>
          <p className="text-xs font-light pr-4">
            {user.email}
          </p>
        </div>
      </div>
    </Link>
    <SignOutBtn />
    </>
  );
};
