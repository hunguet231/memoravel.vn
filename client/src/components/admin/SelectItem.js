import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, FormControl, Select, MenuItem } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import clsx from "clsx";

const SelectedItem = (props) => {
  const { classes, value, data, onChangeInput, ...otherProps } = props;

  const defaultClasses = useStyles();

  const [valueSelected, setValueSelected] = useState(0);

  useEffect(() => {
    setValueSelected(value);
  }, [value]);

  return (
    <FormControl
      variant="outlined"
      className={clsx(defaultClasses.root, classes?.root)}
      {...otherProps}
    >
      <Select
        value={valueSelected}
        onChange={onChangeInput}
        IconComponent={KeyboardArrowDown}
        classes={{ select: defaultClasses.selectedSelect }}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          MenuListProps: { disablePadding: true },
          getContentAnchorEl: null,
          classes: { paper: defaultClasses.dropdownStyle },
        }}
      >
        {data.map((dataMap, index) => (
          <MenuItem
            key={index}
            value={dataMap.value}
            className={defaultClasses.menuOption}
            ListItemClasses={{ selected: defaultClasses.itemSelected }}
          >
            {dataMap.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectedItem.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.any,
  data: PropTypes.array,
  onChangeInput: PropTypes.func,
};

SelectedItem.defaultProps = {
  onChangeInput: () => {},
};

export default memo(SelectedItem);

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    "& .MuiOutlinedInput-root": {
      height: 40,
      maxHeight: 40,
    },
    "& .MuiOutlinedInput-input": {
      padding: "9px 14px",
    },
  },
  selectedSelect: {
    fontSize: 14,
    color: theme.palette.grey[600],
  },
  menuOption: {
    fontSize: 14,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  itemSelected: {
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  },
  dropdownStyle: {
    marginTop: 5,
  },
}));
