import Select from "react-select";

const Component = (props) => {
  return (
    <Select
      className={props.className}
      value={props.value}
      options={props.options}
      isDisabled={props.isDisabled}
      isMulti={props.isMulti}
      isSearchable={false}
      isClearable={false}
      placeholder={props.placeholder}
      cacheOptions={false}
      onChange={props.onChange}
      onMenuOpen={props.onMenuOpen}
      styles={styles}
      theme={(theme) => ({
        ...theme,
        additionalPlaceholder: props.additionalPlaceholder,
      })}
    />
  );
};

const styles = {
  control: (provided) => {
    return {
      ...provided,
      minWidth: 140,
      minHeight: 44,
      backgroundColor: "transparent",
      borderRadius: 5,
      border: "solid 1px #9599b1",
      boxShadow: "none",
      marginTop: 5,

      ":hover": {
        border: "solid 1px #ffffff",
      },
    };
  },
  dropdownIndicator: (provided, state) => {
    return {
      ...provided,
      padding: "0 10px 0 0",
      color: state.isDisabled ? "#d6d6d6" : "#9599b1",
      svg: {
        width: "15px",
        height: "15px",
      },
    };
  },
  indicatorsContainer: (provided) => {
    return {
      ...provided,
      margin: 0,
    };
  },
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided, state) => {
    if (!state.options.length) {
      return {
        display: "none",
      };
    }

    return {
      ...provided,
      backgroundColor: "#080e36",
      padding: "5px 12px",
      color: "#ffffff",
      zIndex: 999,
    };
  },
  menuList: (provided) => {
    return {
      ...provided,
      margin: 0,
      padding: 0,
      color: "#ffffff",
      fontSize: "15px",
      lineHeight: "20px",
      textAlign: "left",
    };
  },
  option: (provided) => {
    return {
      ...provided,
      padding: "3px 0",
      backgroundColor: "transparent",
      color: "#9599b1",

      "&:hover": {
        color: "#ffffff",
      },
      "&:active": {
        backgroundColor: "transparent",
        color: "#55deb5",
      },
    };
  },
  placeholder: (provided) => {
    return {
      ...provided,
      margin: 0,
      fontSize: "15px",
      lineHeight: "20px",
      color: "#9599b1",
    };
  },
  singleValue: (provided, state) => {
    const styles = {
      ...provided,
      marginLeft: 0,
      marginRight: 0,
      padding: "8px 12px",
      fontSize: "15px",
      lineHeight: "20px",
      color: "#ffffff",
      textAlign: "left",
    };

    if (state.theme.additionalPlaceholder) {
      styles[":before"] = {
        content: `"${state.theme.additionalPlaceholder}: "`,
      };
    }

    return styles;
  },
  valueContainer: (provided) => {
    return {
      ...provided,
      flexWrap: "nowrap",
      padding: "0 15px",
    };
  },
  multiValue: (provided) => {
    return {
      ...provided,
      background: "linear-gradient(175deg, #4b466c, #1b2145)",
    };
  },
  multiValueLabel: (provided) => {
    return {
      ...provided,
      color: "#ffffff",
    };
  },
  multiValueRemove: (provided) => {
    return {
      ...provided,
    };
  },
};

export default Component;
