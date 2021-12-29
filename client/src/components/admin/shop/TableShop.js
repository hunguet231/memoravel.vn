import {
  Chip,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { DeleteOutlined, EditOutlined } from "@material-ui/icons";
import { AppConstant } from "const";
import PropTypes from "prop-types";
import React from "react";

const TableShop = (props) => {
  const { shopData, onEdit, onDelete } = props;
  const classes = useStyles();

  const getDateTime = (time) => {
    const timeDate = new Date(time);
    return `${timeDate.toLocaleDateString()}, ${timeDate.toLocaleTimeString()}`;
  };

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.header} align="center">
              STT
            </TableCell>
            <TableCell className={classes.header}>Hình đại diện</TableCell>
            <TableCell className={classes.header}>Tên shop</TableCell>
            <TableCell className={classes.header} align="center">
              Địa chỉ
            </TableCell>
            <TableCell className={classes.header} align="center">
              Thời gian tạo
            </TableCell>
            <TableCell className={classes.header} align="center">
              Trạng thái
            </TableCell>
            <TableCell className={classes.header} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shopData.data.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {(shopData.page - 1) * 10 + index + 1}
              </TableCell>
              <TableCell>
                <a
                  href={`/shop/${row.alias}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={row.avatar} className={classes.img} alt="Avatar" />
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={`/shop/${row.alias}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.name || ""}
                </a>
              </TableCell>
              <TableCell>{row.address.address_details || ""}</TableCell>
              <TableCell>{getDateTime(row.created) || ""}</TableCell>
              <TableCell align="center">
                <Chip
                  size="small"
                  color={
                    row.status === AppConstant.STATUS.publish
                      ? "primary"
                      : "default"
                  }
                  label={AppConstant.ARRAY_STATUS[row.status - 1].name}
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Sửa">
                  <IconButton
                    component="div"
                    onClick={() => onEdit(row)}
                    className={classes.buttonIconEdit}
                  >
                    <EditOutlined className={classes.iconEdit} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                  <IconButton
                    component="div"
                    onClick={() => onDelete(row)}
                    className={classes.buttonIconDelete}
                  >
                    <DeleteOutlined className={classes.iconDelete} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableShop.propTypes = {
  shopData: PropTypes.shape({
    data: PropTypes.array,
    page: PropTypes.number,
    total: PropTypes.number,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TableShop;

const useStyles = makeStyles((theme) => ({
  img: {
    height: 100,
    width: 100,
    borderRadius: "5px",
    objectFit: "cover",
  },
  root: {
    margin: "24px 0",
  },
  table: {
    minWidth: 650,
    width: "100%",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonIconEdit: {
    width: 24,
    height: 24,
    padding: 0,
    borderRadius: 0,
    border: "1px solid " + theme.palette.grey[200],
    "&:hover": {
      border: "1px solid #feba40",
    },
  },
  iconEdit: {
    width: 19,
    height: 19,
    color: theme.palette.grey[500],
    "&:hover": {
      color: "#feba40",
    },
  },
  buttonIconDelete: {
    width: 24,
    height: 24,
    padding: 0,
    borderRadius: 0,
    border: "1px solid " + theme.palette.grey[200],
    "&:hover": {
      border: "1px solid " + theme.palette.secondary.main,
    },
  },
  iconDelete: {
    width: 19,
    height: 19,
    color: theme.palette.grey[500],
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));
