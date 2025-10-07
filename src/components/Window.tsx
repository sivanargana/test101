 
import { ScrollArea } from "@/components/ui/scroll-area"
function Window({children,title="Page Title",actions,footer}:any) {
  return (
    <div className="flex-auto flex flex-col">
        <div className="flex-none flex items-center justify-between px-8 py-2 min-h-[50px] bg-white border-b border-gray-200">
            <div className="text-lg font-bold flex-auto">{title}</div>
            {actions && <div className="flex items-center gap-[10px]">{actions}</div>}
        </div>
        <ScrollArea type="auto" className="flex-auto flex flex-col overflow-y-auto">
   
            <div className="p-8">{children}</div>
      </ScrollArea>
        {footer && <div className="flex-none flex items-center justify-between px-3 py-3 border-t border-gray-200">{footer}</div>}
    </div>
  )
}

export default Window