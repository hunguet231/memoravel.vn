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
} from "@material-ui/core";
import { AppConstant } from "const";

const TableTopic = (props) => {
  const { topicData } = props;
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
              <TableCell>{row.title?.vi || ""}</TableCell>
              <TableCell>{row.description?.vi || ""}</TableCell>
              <TableCell align="center">{row.alias?.vi || ""}</TableCell>
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
              <TableCell align="right">status</TableCell>
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
};

export default TableTopic;

const useStyles = makeStyles({
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
});
