import React, { useRef } from "react";


export default function SearchField(props) {
  const inputE1 = useRef("");

  const searchHandler = () => {
    props.setSearchTerm(inputE1.current.value);
      if(props.searchTerm !== "") {
        const newProjectsTable = props.state.filter((project) => {
          return Object.values(project)
            .join(" ")
            .toLowerCase()
            .includes(props.searchTerm.toLowerCase());
        });
        props.setSearchResults(newProjectsTable);
      }
      else {
        props.setSearchResults(props.state);
      }
  };
  
  return (
    <div className="search bar">
      <div className="icon search">
        <input
          ref={inputE1}
          type="text"  
          placeholder="Search Projects" 
          className="prompt" 
          value={props.searchTerm} 
          onChange={searchHandler}
        />
        <i className="seach icon"></i>
      </div>
    </div>
  );
}
