import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";

const ProjectListScreen: React.FC = props =>{
  return (
    <>
      <SearchPanel />
      <List />
    </>
  )
}

