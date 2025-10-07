import React, { useEffect, useState } from "react";
import Window from "../components/Window";
import { useQuery } from "@tanstack/react-query";
import { fetchServiceStatus } from "../api/api";
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

import { Badge } from "@/components/ui/badge";
import { DialogStatus } from "./DialogStatus";

const ServiceStatus: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["serviceStatus"],
    queryFn: fetchServiceStatus,
    retry: false,
    enabled: false,
  });

  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
      if (!isOpen) {
        refetch();
      }
    }, [isOpen, refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Window
      title="Manage Status"
      actions={
        <>
          <Button onClick={() => setIsOpen(true)}>
            Add New <i className="fi fi-rr-plus"></i>
          </Button>
        </>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Short Form</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item: any, index: number) => (
            <TableRow>
              <TableCell className="font-medium">
                <div>{index+1}</div>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.time_created}</TableCell>
              <TableCell>
                <Badge variant="default">{item.is_active ? 'Active' : "In Active"}</Badge>
              </TableCell>
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
      <DialogStatus open={isOpen} onOpenChange={setIsOpen}></DialogStatus>
    </Window>
  );
};

export default ServiceStatus;
