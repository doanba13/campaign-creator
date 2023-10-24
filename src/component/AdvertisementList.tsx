/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  Checkbox,
  TableHead,
  IconButton,
  TextField,
  Tooltip,
  Toolbar,
  Button,
} from "@mui/material";

import { Add, Delete } from "@mui/icons-material";
import {
  useAddNewAds,
  useGetActiveSubCamp,
  useRemoveAds,
  useUpdateAdvertisement,
} from "../hook";
import { FC } from "react";

interface EnhancedTableToolbarProps {
  campId: number;
  selected: readonly number[];
}

const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({
  selected,
  campId,
}) => {
  const addNewAds = useAddNewAds();
  const removeAds = useRemoveAds();
  const numSelected = selected.length;

  return (
    <Toolbar
      sx={{
        pl: { sm: 3 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Đã chọn: {numSelected}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Danh sách khảo sát
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Xoá">
          <IconButton onClick={() => removeAds(campId, [...selected])}>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Button variant="outlined" onClick={addNewAds}>
          Thêm <Add />
        </Button>
      )}
    </Toolbar>
  );
};

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    disablePadding: true,
    label: "Quảng cáo",
  },
  {
    id: "quantity",
    disablePadding: false,
    label: "Số lượng",
  },
  {
    id: "action",
    disablePadding: false,
    label: "",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={"left"} padding={"none"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  console.log("Quảng cáo render");
  const { id, ads } = useGetActiveSubCamp();
  const { updateAdvertisementName, updateAdvertisementQuantity } =
    useUpdateAdvertisement();
  const removeAds = useRemoveAds();
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = ads.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar selected={selected} campId={id} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              onSelectAllClick={handleSelectAllClick}
              rowCount={ads.length}
              numSelected={selected.length}
            />
            <TableBody>
              {ads.map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `label-name-${row.id}`;
                const quantityId = `label-quantity-${row.id}`;
                const inputLabelId = `input-name-${row.id}`;
                const inputQuantityId = `input-quantity-${row.id}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        id=""
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <TextField
                        required
                        id={inputLabelId}
                        label=""
                        value={row.name}
                        variant="standard"
                        error={!!row.nameError}
                        helperText={row.nameError}
                        onChange={(e) =>
                          updateAdvertisementName(id, row.id, e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={quantityId}
                      scope="row"
                      padding="none"
                    >
                      <TextField
                        required
                        sx={{ width: "100%" }}
                        id={inputQuantityId}
                        label=""
                        type="number"
                        error={!!row.quantityError}
                        helperText={row.quantityError}
                        value={row.quantity || 0}
                        variant="standard"
                        onChange={(e) => {
                          updateAdvertisementQuantity(
                            id,
                            row.id,
                            parseInt(e.target.value)
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Xoá">
                        <IconButton onClick={() => removeAds(id, [row.id])}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
