import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import "./card.css";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import { itemType } from "../../pages/ToDo";

export const Card = ({
  item,
  setAllItems,
  setItems,
}: {
  item: {
    id: number;
    name: string;
    category: string;
    dueDate: string;
    estimate: string;
    importance: string;
    status: string;
  };
  setAllItems: React.Dispatch<React.SetStateAction<itemType[]>>;
  setItems: React.Dispatch<React.SetStateAction<itemType[]>>;
}) => {
  const [itemName, setItemName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [dueDate, setDueDate] = useState(item.dueDate);
  const [estimate, setEstimate] = useState(item.estimate);
  const [importance, setImportance] = useState(item.importance);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseImpDialog = () => {
    setAnchorEl(null);
  };

  // Start Drag And Drop Section
  const handleOnDrag = (e: React.DragEvent, itemId: number) => {
    e.dataTransfer.setData(`itemId`, `${itemId}`);
  };

  // End Drag And Drop Section

  const handleDeleteItem = () => {
    setAllItems((items) => {
      return items.filter((i) => {
        return i.id !== item.id;
      });
    });
    setItems((items) => {
      return items.filter((i) => {
        return i.id !== item.id;
      });
    });
    axios.delete(`http://localhost:5199/api/Items/${item.id}`, {
      headers: {
        Authorization: Cookies.get(`token`),
      },
    });
  };

  // Adjust data within the database
  const saveAttributeAdjutment = (
    id: number,
    fieldToUpdate: string,
    newContent: string
  ) => {
    // axios.put(`http://localhost:5199/api/Items/${item.id}`, item);
    axios.post(
      `http://localhost:5199/api/Items/updateItem`,
      {
        id,
        fieldToUpdate,
        newContent,
      },
      {
        headers: {
          Authorization: Cookies.get(`token`),
        },
      }
    );
  };

  return (
    <Box
      bgcolor={`#212529`}
      marginBottom={`20px`}
      borderRadius={`12px`}
      padding={`40px 35px 20px 15px`}
      draggable
      onDragStart={(e) => handleOnDrag(e, item.id)}
      sx={{
        cursor: `grab`,
      }}
      className="responsive"
      position={`relative`}
    >
      <IconButton
        sx={{
          position: `absolute`,
          right: `5px`,
          top: `5px`,
        }}
        onClick={handleDeleteItem}
      >
        <DeleteIcon
          sx={{
            color: `red`,
            fontSize: `20px`,
          }}
        />
      </IconButton>
      <textarea
        placeholder="Enter the task's name..."
        style={{
          color: `white`,
          minHeight: `${item.name.length + 20}px`,
          fontWeight: `bold`,
          backgroundColor: `transparent`,
          border: `none`,
          fontSize: `18px`,
          width: `100%`,
          resize: `none`,
          marginBottom: `10px`,
          textTransform: `capitalize`,
          lineHeight: `1.5`,
        }}
        value={itemName}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const textarea = e.target;
          textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";
          setItemName(e.target.value);
        }}
        onBlur={() => saveAttributeAdjutment(item.id, `name`, itemName)}
        className="data-field"
        id="title-field"
      />

      <Stack direction={`row`} gap={`40px`}>
        <Box>
          <Typography fontSize={`14px`} marginBottom={`15px`} color={`#40454b`}>
            Category
          </Typography>
          <Typography fontSize={`14px`} marginBottom={`15px`} color={`#40454b`}>
            Due Date
          </Typography>
          <Typography fontSize={`14px`} marginBottom={`15px`} color={`#40454b`}>
            Estimate
          </Typography>
          <Typography fontSize={`14px`} marginBottom={`15px`} color={`#40454b`}>
            Importance
          </Typography>
        </Box>
        <Box>
          <input
            type="text"
            placeholder="Enter the task's category..."
            style={{
              width: `100%`,
              marginBottom: `15px`,
              fontSize: `14px`,
              color: `white`,
              backgroundColor: `transparent`,
              border: `none`,
              textTransform: `capitalize`,
            }}
            value={category}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setCategory(event.target.value)
            }
            onBlur={() => saveAttributeAdjutment(item.id, `category`, category)}
            className="data-field"
          />
          <input
            type="text"
            placeholder="Enter the deadline..."
            style={{
              width: `100%`,
              marginBottom: `15px`,
              fontSize: `14px`,
              color: `white`,
              backgroundColor: `transparent`,
              border: `none`,
            }}
            value={dueDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDueDate(event.target.value)
            }
            onBlur={() => saveAttributeAdjutment(item.id, `dueDate`, dueDate)}
            className="data-field"
          />
          <input
            type="text"
            placeholder="Enter the estimated time..."
            style={{
              width: `100%`,
              marginBottom: `15px`,
              fontSize: `14px`,
              color: `white`,
              backgroundColor: `transparent`,
              border: `none`,
            }}
            value={estimate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEstimate(event.target.value)
            }
            onBlur={() => saveAttributeAdjutment(item.id, `estimate`, estimate)}
            className="data-field"
          />
          <Button
            color="inherit"
            id="resources-button"
            onClick={handleClick}
            aria-haspopup="true"
            aria-expanded={open ? `true` : undefined}
            sx={{
              padding: `2px 5px`,
              backgroundColor:
                importance === `hight`
                  ? `red`
                  : importance === `medium`
                  ? `#fe913e`
                  : `#39ac95`,
              display: importance === `` ? `none` : `flex`,
              textTransform: `capitalize`,
              color: `white`,
              fontSize: `12px`,
              "&:hover": {
                backgroundColor:
                  importance === `hight`
                    ? `#910000`
                    : importance === `medium`
                    ? `#ad6026`
                    : importance === `low`
                    ? `#236d5e`
                    : ``,
              },
            }}
          >
            {importance}
          </Button>
          <Menu
            id="resources-menu"
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
              "aria-labelledby": `resources-button`,
            }}
            onClose={handleCloseImpDialog}
            anchorOrigin={{
              vertical: `bottom`,
              horizontal: `center`,
            }}
            transformOrigin={{
              horizontal: `center`,
              vertical: `top`,
            }}
            sx={{
              top: `10px`,
            }}
            className="importance-menu"
          >
            <MenuItem
              sx={{
                fontSize: `14px`,
              }}
              onClick={() => {
                handleCloseImpDialog();
                setImportance(`low`);
                saveAttributeAdjutment(item.id, `importance`, `low`);
              }}
            >
              Low
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: `14px`,
              }}
              onClick={() => {
                handleCloseImpDialog();
                setImportance(`medium`);
                saveAttributeAdjutment(item.id, `importance`, `medium`);
              }}
            >
              Medium
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: `14px`,
              }}
              onClick={() => {
                handleCloseImpDialog();
                setImportance(`hight`);
                saveAttributeAdjutment(item.id, `importance`, `hight`);
              }}
            >
              Hight
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: `14px`,
              }}
              onClick={() => {
                handleCloseImpDialog();
                setImportance(``);
                saveAttributeAdjutment(item.id, `importance`, ``);
              }}
            >
              None
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
    </Box>
  );
};
