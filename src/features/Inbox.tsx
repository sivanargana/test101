import { Button } from "@/components/ui/button";
import Window from "../components/Window";
import mockData from "../mock.data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Table,
  TableBody, 
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"

function Inbox() {
  const data = mockData.inbox;
  return (
    <Window
      title="Inbox"
      actions={
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Sort by <i className="fi fi-rr-sort-alt"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><i className="fi fi-rr-arrow-up"></i>Date</DropdownMenuItem>
              <DropdownMenuItem><i className="fi fi-rr-arrow-up"></i>Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="secondary">
                Filters <i className="fi fi-rr-sliders-v"></i>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
              </DrawerHeader>
              
              <div>efeefef</div>
            </DrawerContent>
          </Drawer>
             <Button>Add New <i className="fi fi-rr-plus"></i></Button>
        </>
      }
    >
      <Table>
 
  <TableHeader>
    <TableRow>
      <TableHead>Id</TableHead>
      <TableHead>Client</TableHead>
      <TableHead>Status</TableHead> 
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      data.map((item:any)=> <TableRow>
      <TableCell>
        <div className="font-medium">{item.id}</div>
        <div className="text-xs text-current/50">{item.date}</div>
      </TableCell>
      <TableCell>{item.client}</TableCell>
      <TableCell><Badge variant="default">{item.status}</Badge></TableCell>
      <TableCell>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button color="grey" variant="outline" size="sm">
                Actions <i className="fi fi-rr-angle-small-down"></i>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem><i className="fi fi-rr-eye"></i>View</DropdownMenuItem>
              <DropdownMenuItem><i className="fi fi-rr-pencil"></i>Update</DropdownMenuItem>
              <DropdownMenuItem><i className="fi fi-rr-trash"></i>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </TableCell>
    </TableRow>)
    }
   
  </TableBody>
</Table>
    </Window>
  );
}
export default Inbox;
