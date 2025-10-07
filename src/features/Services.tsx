// App.tsx
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "../api/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


type SubServiceProps = {
  open: boolean;
  // optionally add onOpenChange: (open: boolean) => void;
};


const Services: React.FC<SubServiceProps> = ({ open }) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchServices,
    retry: false,
    enabled: false,
  });


  useEffect(() => {
      if (!open) {
        refetch();
      }
    }, [open, refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
    {console.log(data)}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item: any, index: number) => (
            <TableRow>
              <TableCell className="font-medium">
                <div>{index + 1}</div>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.effective_date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button color="grey" variant="outline" size="sm">
                      Actions <i className="fi fi-rr-angle-small-down"></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <i className="fi fi-rr-pencil"></i>Update
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <i className="fi fi-rr-trash"></i>Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Services;
