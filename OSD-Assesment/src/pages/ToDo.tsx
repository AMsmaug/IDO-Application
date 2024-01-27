import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import "../components/ToDo/todo.css";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Card } from "../components/Card/Card";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export type itemType = {
  id: number;
  name: string;
  category: string;
  dueDate: string;
  estimate: string;
  importance: string;
  status: string;
  userId: number;
};

export const ToDo = () => {
  const [allItems, setAllItems] = useState<itemType[]>([]);
  const [items, setItems] = useState<itemType[]>([]);
  const [searchField, setSearchField] = useState(``);
  const [draggedOverElement, setDraggedOverElement] = useState(``);

  const [isLoading, setIsLoading] = useState(true);
  const [errorHappened, setErrorHappened] = useState(false);

  const [showQuote, setShowQuote] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5199/api/Items/getItems`, {
        headers: {
          Authorization: Cookies.get(`token`),
        },
      })
      .then((response) => {
        setAllItems(response.data);
        setItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(`error: ${error}`);
        setErrorHappened(true);
      });
  }, []);

  const generateSkeletons = (numberOfSkeletons: number) => {
    const skeletons = [];
    for (let i = 0; i < numberOfSkeletons; i++) {
      skeletons.push(
        <Skeleton
          width={`100%`}
          height={`400px`}
          animation={`wave`}
          key={i}
          sx={{
            padding: 0,
            marginTop: i !== 0 ? `-140px` : `-85px`,
            borderRadius: `12px`,
          }}
        />
      );
    }
    return skeletons;
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
    const input = e.target.value.toLowerCase();
    if (input === ``) {
      setItems(allItems);
    } else {
      setItems(
        allItems.filter(
          (item) =>
            item.name.toLowerCase().includes(input) ||
            item.category.toLowerCase().includes(input) ||
            item.dueDate.toLowerCase().includes(input) ||
            item.estimate.toLowerCase().includes(input) ||
            item.importance.toLowerCase().includes(input)
        )
      );
    }
  };

  // Start Drag and Drop section
  const handleOnDrop = (e: React.DragEvent) => {
    const itemId = e.dataTransfer.getData(`itemId`);
    const draggedElement = items.find(
      (item) => item.id === +itemId
    ) as itemType;
    draggedElement.status = draggedOverElement;
    const newList = items.filter((item) => item.id !== +itemId);
    // make the request to change the item status
    const elementWithoutId = {
      name: draggedElement.name,
      category: draggedElement.category,
      dueDate: draggedElement.dueDate,
      estimate: draggedElement.estimate,
      importance: draggedElement.importance,
      status: draggedElement.status,
    };

    axios
      .post(
        `http://localhost:5199/api/Items/${draggedElement.id}`,
        elementWithoutId,
        {
          headers: {
            Authorization: Cookies.get(`token`),
          },
        }
      )
      .then((response) => {
        newList.push(response.data as itemType);
        setAllItems(newList);
        setItems(newList);
        setDraggedOverElement(``);
      });
  };

  const handleDragOver = (e: React.DragEvent, boxType: string) => {
    e.preventDefault();
    setDraggedOverElement(boxType);
  };

  // End Drag and Drop section

  return (
    <Box>
      <Toolbar
        sx={{
          bgcolor: `#212121`,
          direction: `row`,
          padding: `0 15px`,
          justifyContent: `space-between`,
          alignItems: `center`,
          position: `relative`,
        }}
      >
        <Box sx={{ width: `80px`, padding: 0 }}>
          <img
            src="../../public/images/Logo.png"
            alt=""
            style={{ width: `100%` }}
          />
        </Box>
        <Stack direction={`row`} gap={`20px`} alignItems={`center`}>
          <Stack
            direction={`row`}
            justifyContent={`center`}
            alignItems={`center`}
            position={`relative`}
            zIndex={1}
            className="searchBar-container"
          >
            <input
              type="text"
              placeholder="What are you looking for?"
              style={{
                padding: `8px 20px 8px 15px`,
                width: `350px`,
                borderRadius: `12px`,
                border: `2px solid white`,
                backgroundColor: `#212121`,
                color: `white`,
                position: `absolute`,
                right: -10,
                zIndex: -1,
                transition: `0.3s`,
                opacity: 0,
                visibility: `hidden`,
              }}
              className="search-field"
              onChange={handleSearch}
              value={searchField}
            />
            <Box
              sx={{
                width: `18px`,
                padding: 0,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                marginBottom: `-3px`,
              }}
            >
              <img
                src="../../public/images/Search.svg"
                alt=""
                style={{ width: `100%` }}
              />
            </Box>
          </Stack>
          <IconButton
            onClick={() => {
              const newItems = [...items];
              axios
                .post(
                  `http://localhost:5199/api/Items`,
                  {
                    name: ``,
                    category: ``,
                    dueDate: ``,
                    estimate: ``,
                    importance: `hight`,
                    status: `toDo`,
                  },
                  {
                    headers: {
                      Authorization: Cookies.get(`token`),
                    },
                  }
                )
                .then((response) => {
                  newItems.push(response.data);
                  setAllItems(newItems);
                  setItems(newItems);
                });
            }}
          >
            <Box sx={{ width: `20px`, height: `20px` }}>
              <img
                src="../../public/images/Circle.svg"
                alt=""
                style={{ width: `100%` }}
              />
              <img
                src="../../public/images/Add.svg"
                alt=""
                style={{
                  width: `10px`,
                  position: `absolute`,
                  top: `calc(50% + 2px)`,
                  left: `50%`,
                  transform: `translate(-50%, -50%)`,
                }}
              />
            </Box>
          </IconButton>
          <IconButton
            sx={{
              width: `30px`,
              height: `30px`,
              borderRadius: `50%`,
              overflow: `hidden`,
              display: `flex`,
              justifyContent: `center`,
              alignItems: `center`,
              padding: 0,
            }}
            onClick={handleClick}
            className="button"
            id="resources-button"
            aria-haspopup="true"
            aria-expanded={open ? `true` : undefined}
          >
            <img
              src="/public/images/Bitmap.png"
              alt=""
              style={{ height: `100%` }}
            />
          </IconButton>
        </Stack>
        <Menu
          id="resources-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{
            "aria-labelledby": `resources-button`,
          }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: `bottom`,
            horizontal: `right`,
          }}
          transformOrigin={{
            horizontal: `right`,
            vertical: `top`,
          }}
          sx={{ padding: `0px`, top: `5px` }}
        >
          <MenuItem onClick={handleClose} sx={{ padding: 0 }}>
            <Stack
              right={`10px`}
              bgcolor={`#212121`}
              top={`100%`}
              direction={`row`}
              alignItems={`center`}
              padding={`10px 0 10px 20px`}
              gap={`5px`}
            >
              <IconButton
                sx={{
                  width: `60px`,
                  height: `60px`,
                  borderRadius: `26px`,
                  overflow: `hidden`,
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                  padding: 0,
                }}
                onClick={() => console.log(`image clicked`)}
              >
                <img
                  src="/public/images/Bitmap@2x.png"
                  alt=""
                  style={{
                    height: `100%`,
                  }}
                />
              </IconButton>
              <Box>
                <List>
                  <ListItem
                    disablePadding
                    sx={{ color: `white`, fontSize: `14px` }}
                  >
                    <Button
                      sx={{
                        padding: `5px 30px 5px 15px`,
                        textTransform: `lowercase`,
                        color: `#b6a3c2`,
                      }}
                      onClick={() => console.log(`email clicked`)}
                    >
                      {window.sessionStorage.getItem(`email`)}
                    </Button>
                  </ListItem>
                  <ListItem
                    disablePadding
                    sx={{ color: `white`, fontSize: `14px` }}
                    onClick={() => {}}
                  >
                    <Button
                      sx={{
                        padding: `5px 10px`,
                        textTransform: `capitalize`,
                        color: `white`,
                        width: `100%`,
                        textAlign: `start`,
                      }}
                      onClick={() => {
                        // navigate to the log in page
                        Cookies.remove(`token`);
                        navigate(`/login`);
                      }}
                    >
                      Log Out <LogoutIcon sx={{ marginLeft: `12px` }} />
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Stack>
          </MenuItem>
        </Menu>
      </Toolbar>
      {errorHappened ? (
        <Typography
          variant="h1"
          sx={{
            textAlign: `center`,
            fontSize: {
              xs: `26px`,
              sm: `20px`,
              md: `26px`,
              lg: `26px`,
            },
            lineHeight: `1.6`,
            backgroundColor: `#212121`,
            margin: `30px 20px`,
            borderRadius: `12px`,
            padding: `20px 0`,
            color: `white`,
          }}
        >
          Error during retrieving data <br />
          Please try again later
        </Typography>
      ) : null}
      {!errorHappened ? (
        <Stack
          direction={`row`}
          sx={{
            transition: `1s`,
            backgroundImage: `linear-gradient(#764f96, #2d2b52)`,
            padding: `10px 45px`,
            width: `100%`,
            opacity: showQuote ? 1 : 0,
            position: showQuote ? `static` : `absolute`,
            justifyContent: `space-between`,
            alignItems: `center`,
            "&:hover .x-button": {
              opacity: 1,
            },
          }}
        >
          <Typography
            sx={{
              fontStyle: `italic`,
              fontWeight: `light`,
              fontSize: `15px`,
              color: `white`,
            }}
          >
            "Anything that can go wrong, will go wrong!"
          </Typography>
          <IconButton
            sx={{
              width: `40px`,
              height: `40px`,
              color: `white`,
              padding: 0,
              transition: `0.3s`,
              opacity: 0,
              zIndex: 1,
            }}
            className="x-button"
            onClick={() => setShowQuote(false)}
          >
            <Box sx={{ width: `16px` }}>
              <img
                src="../../public/images/RemoveQuote.svg"
                alt=""
                style={{ width: `100%` }}
              />
            </Box>
          </IconButton>
        </Stack>
      ) : null}
      {!errorHappened ? (
        <Stack
          direction={`row`}
          gap={`20px`}
          margin={`30px 20px 0`}
          flexWrap={`wrap`}
        >
          <Stack
            direction={`row`}
            gap={`15px`}
            bgcolor={`#212529`}
            // width={{
            //   xs: `100%`,
            //   sm: `400px`,
            //   md: `400px`,
            //   lg: `400px`,
            // }}
            width={`400px`}
            alignItems={`center`}
            padding={`12px 20px`}
            borderRadius={`12px`}
            className="toDo-toHide"
          >
            <Box
              sx={{
                width: `22px`,
                padding: 0,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
              }}
            >
              <img
                src="../../public/images/ToDoIcon.svg"
                alt=""
                style={{ height: `100%` }}
              />
            </Box>
            <Typography color={`white`}>To Do</Typography>
          </Stack>
          <Stack
            direction={`row`}
            gap={`15px`}
            bgcolor={`#212529`}
            // width={{
            //   xs: `100%`,
            //   sm: `400px`,
            //   md: `400px`,
            //   lg: `400px`,
            // }}
            width={`400px`}
            alignItems={`center`}
            padding={`12px 20px`}
            borderRadius={`12px`}
            className="doing-toHide"
          >
            <Box
              sx={{
                width: `22px`,
                padding: 0,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
              }}
            >
              <img
                src="../../public/images/DoingIcon.svg"
                alt=""
                style={{ height: `100%` }}
              />
            </Box>
            <Typography color={`white`}>Doing</Typography>
          </Stack>
          <Stack
            direction={`row`}
            gap={`15px`}
            bgcolor={`#212529`}
            width={`400px`}
            alignItems={`center`}
            padding={`12px 20px`}
            borderRadius={`12px`}
            className="done-toHide"
          >
            <Box
              sx={{
                width: `22px`,
                padding: 0,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
              }}
            >
              <img
                src="../../public/images/DoneIcon.svg"
                alt=""
                style={{ height: `100%` }}
              />
            </Box>
            <Typography color={`white`}>Done</Typography>
          </Stack>
        </Stack>
      ) : null}
      {!errorHappened ? (
        <Stack
          margin={`10px 20px`}
          gap={`20px`}
          direction={`row`}
          flexWrap={`wrap`}
          height={
            showQuote
              ? `calc(100vh - 64px - 60px - 52px - 50px)`
              : `calc(100vh - 64px - 52px - 50px)`
          }
          sx={{
            overflowY: `scroll`,
          }}
          className="items-container"
        >
          <Box
            // width={{
            //   xs: `100%`,
            //   sm: `400px`,
            //   md: `400px`,
            //   lg: `400px`,
            // }}
            className="responsive"
            width={`400px`}
            // height={`fit-content`}
            onDrop={handleOnDrop}
            onDragLeave={() => setDraggedOverElement(``)}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
              handleDragOver(e, `toDo`)
            }
            borderLeft={
              draggedOverElement === `toDo`
                ? `2px solid yellow`
                : `2px solid #5b5e60`
            }
            borderRight={
              draggedOverElement === `toDo`
                ? `2px solid yellow`
                : `2px solid #5b5e60`
            }
          >
            <Stack
              direction={`row`}
              gap={`15px`}
              bgcolor={`#212529`}
              // width={{
              //   xs: `100%`,
              //   sm: `400px`,
              //   md: `400px`,
              //   lg: `400px`,
              // }}
              alignItems={`center`}
              padding={`12px 20px`}
              borderRadius={`12px`}
              marginBottom={`10px`}
              display={`none`}
              className="toDo-toShow"
            >
              <Box
                sx={{
                  width: `22px`,
                  padding: 0,
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                }}
              >
                <img
                  src="../../public/images/ToDoIcon.svg"
                  alt=""
                  style={{ height: `100%` }}
                />
              </Box>
              <Typography color={`white`}>To Do</Typography>
            </Stack>
            {isLoading
              ? generateSkeletons(3)
              : items
                  .filter((item) => {
                    return item.status === `toDo`;
                  })
                  .reverse()
                  .map((item) => (
                    <Card
                      item={item}
                      key={item.id}
                      setAllItems={setAllItems}
                      setItems={setItems}
                    />
                  ))}
          </Box>
          <Box
            // width={{
            //   xs: `100%`,
            //   sm: `400px`,
            //   md: `400px`,
            //   lg: `400px`,
            // }}
            className="responsive"
            width={`400px`}
            // height={`fit-content`}
            onDrop={handleOnDrop}
            onDragLeave={() => setDraggedOverElement(``)}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
              handleDragOver(e, `doing`)
            }
            borderLeft={
              draggedOverElement === `doing`
                ? `2px solid yellow`
                : `2px solid #5b5e60`
            }
            borderRight={
              draggedOverElement === `doing`
                ? `2px solid yellow`
                : `2px solid #5b5e60`
            }
          >
            <Stack
              direction={`row`}
              gap={`15px`}
              bgcolor={`#212529`}
              // width={{
              //   xs: `100%`,
              //   sm: `400px`,
              //   md: `400px`,
              //   lg: `400px`,
              // }}
              alignItems={`center`}
              padding={`12px 20px`}
              borderRadius={`12px`}
              marginBottom={`10px`}
              display={`none`}
              className="doing-toShow"
            >
              <Box
                sx={{
                  width: `22px`,
                  padding: 0,
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                }}
              >
                <img
                  src="../../public/images/DoingIcon.svg"
                  alt=""
                  style={{ height: `100%` }}
                />
              </Box>
              <Typography color={`white`}>Doing</Typography>
            </Stack>
            {isLoading
              ? generateSkeletons(3)
              : items
                  .filter((item) => item.status === `doing`)
                  .reverse()
                  .map((item) => (
                    <Card
                      item={item}
                      key={item.id}
                      setAllItems={setAllItems}
                      setItems={setItems}
                    />
                  ))}
          </Box>
          <Box
            // width={{
            //   xs: `100%`,
            //   sm: `400px`,
            //   md: `400px`,
            //   lg: `400px`,
            // }}
            className="responsive"
            width={`400px`}
            // height={`fit-content`}
            onDrop={handleOnDrop}
            onDragLeave={() => setDraggedOverElement(``)}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
              handleDragOver(e, `done`)
            }
            borderLeft={
              draggedOverElement === `done`
                ? `2px solid yellow`
                : `2px solid #5b5e60`
            }
            borderRight={
              draggedOverElement === `done`
                ? `2px solid yellow`
                : `2px solid #5b5e60`
            }
          >
            <Stack
              direction={`row`}
              gap={`15px`}
              bgcolor={`#212529`}
              // width={{
              //   xs: `100%`,
              //   sm: `400px`,
              //   md: `400px`,
              //   lg: `400px`,
              // }}
              alignItems={`center`}
              padding={`12px 20px`}
              borderRadius={`12px`}
              marginBottom={`10px`}
              display={`none`}
              className="done-toShow"
            >
              <Box
                sx={{
                  width: `22px`,
                  padding: 0,
                  display: `flex`,
                  justifyContent: `center`,
                  alignItems: `center`,
                }}
              >
                <img
                  src="../../public/images/DoneIcon.svg"
                  alt=""
                  style={{ height: `100%` }}
                />
              </Box>
              <Typography color={`white`}>Done</Typography>
            </Stack>
            {isLoading
              ? generateSkeletons(3)
              : items
                  .filter((item) => item.status === `done`)
                  .reverse()
                  .map((item) => (
                    <Card
                      item={item}
                      key={item.id}
                      setAllItems={setAllItems}
                      setItems={setItems}
                    />
                  ))}
          </Box>
        </Stack>
      ) : null}
      <IconButton
        sx={{
          transition: `1s`,
          position: `absolute`,
          right: `30px`,
          top: `80px`,
          width: `40px`,
          height: `40px`,
          opacity: showQuote ? 0 : 1,
        }}
        onClick={() => setShowQuote(true)}
      >
        <Box width={`20px`}>
          <img
            src="../../public/images/ShowQuote.svg"
            alt=""
            style={{ width: `100%` }}
          />
        </Box>
      </IconButton>
    </Box>
  );
};
