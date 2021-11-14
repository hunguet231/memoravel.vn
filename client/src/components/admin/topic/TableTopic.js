import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { EditOutlined, DeleteOutlined } from "@material-ui/icons";
import { AppConstant } from "const";

const TableTopic = (props) => {
  const { topicData, onEdit, onDelete } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.header} align="center">
              STT
            </TableCell>
            <TableCell className={classes.header}>Tên chủ đề</TableCell>
            <TableCell className={classes.header}>Mô tả</TableCell>
            <TableCell className={classes.header} align="center">
              Alias
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
          {topicData.data.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                {(topicData.page - 1) * 10 + index + 1}
              </TableCell>
              <TableCell>{row.title || ""}</TableCell>
              <TableCell>{row.description || ""}</TableCell>
              <TableCell align="center">{row.alias || ""}</TableCell>
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

TableTopic.propTypes = {
  topicData: PropTypes.shape({
    data: PropTypes.array,
    page: PropTypes.number,
    total: PropTypes.number,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TableTopic;

const useStyles = makeStyles((theme) => ({
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
