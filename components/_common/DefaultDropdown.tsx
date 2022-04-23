import Select from 'react-select';

const Component = (props) => (
  <Select
    className={props.className}
    value={props.value}
    options={props.options}
    isDisabled={props.isDisabled}
    isMulti={props.isMulti}
    isSearchable={false}
    isClearable={false}
    placeholder={props.placeholder}
    //cacheOptions={false}
    onChange={props.onChange}
    onMenuOpen={props.onMenuOpen}
    styles={styles}
    theme={(theme) => ({
      ...theme,
      additionalPlaceholder: props.additionalPlaceholder
    })}
  />
);

const styles = {
  control: (provided) => ({
    ...provided,
    minWidth: 140,
    minHeight: 44,
    backgroundColor: 'white',
    borderRadius: 5,
    border: 'solid 1px transparent',
    boxShadow: 'none',
    marginTop: 5,

    ':hover': {
      border: 'solid 1px #ffffff'
    }
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '0 10px 0 0',
    color: state.isDisabled ? '#d6d6d6' : '#9599b1',
    svg: {
      width: '15px',
      height: '15px'
    }
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    margin: 0
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  menu: (provided, state) => {
    if (!state.options.length) {
      return {
        display: 'none'
      };
    }

    return {
      ...provided,
      backgroundColor: 'white',
      padding: '5px 12px',
      color: '#ffffff',
      zIndex: 999
    };
  },
  menuList: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    color: '#ffffff',
    fontSize: '15px',
    lineHeight: '20px',
    textAlign: 'left'
  }),
  option: (provided) => ({
    ...provided,
    padding: '3px 0',
    backgroundColor: 'transparent',
    color: '#333',

    '&:hover': {
      color: '#000'
    },
    '&:active': {
      backgroundColor: 'transparent',
      color: '#55deb5'
    }
  }),
  placeholder: (provided) => ({
    ...provided,
    margin: 0,
    fontSize: '15px',
    lineHeight: '20px',
    color: '#9599b1'
  }),
  singleValue: (provided, state) => {
    const styles = {
      ...provided,
      marginLeft: 0,
      marginRight: 0,
      padding: '8px 12px',
      fontSize: '15px',
      lineHeight: '20px',
      color: '#000',
      textAlign: 'left'
    };

    if (state.theme.additionalPlaceholder) {
      styles[':before'] = {
        content: `"${state.theme.additionalPlaceholder}: "`
      };
    }

    return styles;
  },
  valueContainer: (provided) => ({
    ...provided,
    flexWrap: 'nowrap',
    padding: '0 15px'
  }),
  multiValue: (provided) => ({
    ...provided,
    background: '#1e5eff'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#ffffff'
  }),
  multiValueRemove: (provided) => ({
    ...provided
  })
};

export default Component;
