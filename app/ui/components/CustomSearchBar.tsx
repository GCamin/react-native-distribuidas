import React from "react";
import { SearchBar } from "@rneui/base";

interface CustomSearchBarProps {
  onSearch: (value: string) => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = React.useState("");

  const handleSearch = (newVal: string) => {
    setValue(newVal);
    onSearch(newVal);
  };

  return (
    <SearchBar
      platform="android"
      clearIcon={{
        name: 'close',
        color: '#FAFAFA'
      }}
      searchIcon={{
        name: 'search',
        color: '#FAFAFA'
      }}
      cancelIcon={{
        name: 'cancel',
        color: '#FAFAFA',
      }}
      containerStyle={{
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#FEC260",
        backgroundColor: "#3B185F",
        width: 373,
        marginLeft: 5,
      }}
      inputContainerStyle={{ backgroundColor: '#3B185F' }}
      inputStyle={{ color: "#FEC260" }}
      leftIconContainerStyle={{}}
      rightIconContainerStyle={{}}
      loadingProps={{}}
      onChangeText={handleSearch}
      onClear={() => setValue('')}
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      onCancel={() => console.log('Search canceled')}
      value={value}
    />
  );
};

export default CustomSearchBar;
