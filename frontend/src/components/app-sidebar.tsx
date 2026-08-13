import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ListIcon, XIcon } from 'lucide-react'

function MobileSidebarClose() {
  const { setOpenMobile } = useSidebar()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="md:hidden"
      aria-label="Close application sidebar"
      onClick={() => setOpenMobile(false)}
    >
      <XIcon />
      <span className="sr-only">Close application sidebar</span>
    </Button>
  )
}

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex-row items-center justify-between px-4">
        <div className="flex min-w-0 items-center gap-2">
          <img
            src="/assets/icon.png"
            alt=""
            className="size-8 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Until</p>
            <p className="truncate text-xs text-sidebar-foreground/60">Make time count.</p>
          </div>
        </div>
        <MobileSidebarClose />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[11px] uppercase tracking-[0.16em]">Timers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton type="button">
                  <ListIcon />
                  <span>Timer list</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <p className="text-xs text-sidebar-foreground/60">Static preview · 0.1</p>
      </SidebarFooter>
    </Sidebar>
  )
}
