import { NavLink, Outlet, useLoaderData } from "react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import mockData from "../mock.data";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"
function PrivateLayout() {
  const navigation = mockData.navigation;
  const userInfo = useLoaderData()
  const [organisation, setOrganisation] = useState('apple');
  const [sidebar, setSidebar] = useState(false);
  console.log(userInfo);
  useEffect(() => {
    if (userInfo.organizations && userInfo.organizations.length > 0) {
      setOrganisation((userInfo.organizations[0].org_id));
    }
  }, [userInfo]);
  const Navigation = ({ items }: any) => (
    <>
      <ul
        className="flex flex-col p-[10px]
    [&_.navitem]:flex
    [&_.navitem]:items-center
    [&_.navitem]:gap-[16px]
    [&_.navitem]:h-[45px]
    [&_.navitem]:rounded-lg
    [&_.navitem]:px-[16px]
    [&_.navitem:hover]:bg-current/10
    [&_.navitem_i]:size-[24px] 
    [&_.navitem_i]:flex
    [&_.navitem_i]:items-center
    [&_.navitem_i]:justify-center
    [&_.navitem_i]:text-current/70
    [&_.navitem_i]:text-[20px] 
    [&_.navitem_span]:flex-auto
    [&_.navitem_span]:min-w-0
    [&_.navitem_span]:truncate
    [&_.navitem_span]:font-medium
    [&_.navitem_span]:text-current
    [&_.navitem:after]:font-['uicons-regular-rounded'] 
    [&_.navitem:after]:text-current/30
    [&_.navitem:after]:invisible
    [&_.navitem[data-state='closed']:after]:visible
    [&_.navitem[data-state='closed']:after]:content-['\e08f']
    [&_.navitem[data-state='open']:after]:visible
    [&_.navitem[data-state='open']:after]:content-['\e098']
    "
      >
        {items.map((item: any, i: any) => (
          <li key={i}>
            {!item.children && (
              <NavLink className="navitem" to={item.href}>
                {item.icon && <i className={item.icon}></i>}
                <span>{item.label}</span>
              </NavLink>
            )}
            {item.children && (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <span className="navitem">
                    {item.icon && <i className={item.icon}></i>}
                    <span>{item.label}</span>
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="flex flex-col pl-[40px]">
                    {item.children.map((item: any, i: any) => (
                      <li key={i}>
                        <NavLink className="navitem" to={item.href}>
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            )}
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <>
      <div className={cn(sidebar ? 'open':'close',"fixed left-0 top-0 bottom-0 z-10 w-[280px] flex flex-col bg-slate-900  text-white transition-all duration-150 ease-out [&.open+div]:pl-[0px] [&.close+div]:pl-[280px] [&.open]:-translate-x-full [&.close]:translate-x-0")}>
        <div className="absolute left-0 right-0 top-0  pt-[100%] z-[1] overflow-clip bg-linear-to-r from-red-500/20 to-violet-500/20 mask-b-from-0% mask-b-to-50% mix-blend-hard-light"></div>
        <div className="flex-none p-[20px] relative z-[2]">
          <img src="/logo-white.png" className="max-w-full h-[100px]" />
        </div>
        <div className="px-[20px] relative z-[2]">
          <Select
            value={organisation}
            onValueChange={(e) => setOrganisation(e)}
          >
            <SelectTrigger className="w-full border-current/20">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {userInfo.organizations.map((org: any) => (
                <SelectItem key={org.org_id} value={org.org_id}>
                  {org.org_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ScrollArea
          type="auto"
          className="flex-auto flex flex-col overflow-y-auto min-h-0 relative z-[2]"
        >
          <Navigation items={navigation.primary} />
        </ScrollArea>
      </div>
      <div className="h-screen flex flex-col bg-slate-100 transition-all duration-150 ease-out "  >
        <div className="flex-none min-h-[50px] bg-white shadow relative z-10 flex items-center gap-[10px] px-8">
    
          <Button variant="secondary" className="size-[30px]" onClick={()=>setSidebar(val=>!val)}> <i className="fi fi-rr-bars-staggered"></i> </Button>
          <div className="font-bold text-xl text-transparent uppercase bg-clip-text bg-linear-to-r from-red-600 to-violet-600">Trulims</div>
        <div className="ml-auto flex items-center gap-[10px]">
            <Button variant="secondary" className="size-[30px]"> <i className="fi fi-rr-bell"></i> </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        </div>
        <div className="flex-auto min-h-0 flex flex-col [&>*]:flex-auto [&>*]:flex [&>*]:flex-col [&>*]:min-h-0">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default PrivateLayout;
