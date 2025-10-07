import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Services from "./Services";
import Categories from "./Categories";
import { Button } from "@/components/ui/button";
import Window from "@/components/Window";
import { useState } from "react";
import { SubServiceForm } from "./SubServiceForm";
import SubServices from "./SubServices";
import { CategoryForm } from "./CategoryForm";
import { ServiceForm } from "./ServiceForm";

export function ManageServices() {
  const [isOpenService, setIsOpenService] = useState(false);
  const [isOpenSubService, setIsOpenSubService] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [title, setTitle] = useState("Manage Services");

  function handelOpen() {
    if(title == "Manage Services"){
      setIsOpenService(true)
    } else if(title == "Manage Sub Services") {
      setIsOpenSubService(true);
    } else if(title == "Manage Categories") {
      setIsOpenCategory(true);
    }
  }
  return (
    <Window
      title={title}
      actions={
        <>
          <Button onClick={handelOpen}>
            Add New <i className="fi fi-rr-plus"></i>
          </Button>
        </>
      }
    >
      <Tabs defaultValue="Manage Services" onValueChange={(e) => setTitle(e)}>
        <TabsList>
          <TabsTrigger value="Manage Services">Services</TabsTrigger>
          <TabsTrigger value="Manage Sub Services">Sub Services</TabsTrigger>
          <TabsTrigger value="Manage Categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="Manage Services">
          <Services open={isOpenService}/>
        </TabsContent>
        <TabsContent value="Manage Sub Services">
          <SubServices open={isOpenSubService}></SubServices>
        </TabsContent>
        <TabsContent value="Manage Categories">
          <Categories open={isOpenCategory}/>
        </TabsContent>
      </Tabs>
      <ServiceForm open={isOpenService} onOpenChange={setIsOpenService}></ServiceForm>
      <SubServiceForm open={isOpenSubService} onOpenChange={setIsOpenSubService}></SubServiceForm>
      <CategoryForm open={isOpenCategory} onOpenChange={setIsOpenCategory}></CategoryForm>
    </Window>
  );
}
