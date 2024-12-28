import "./App.css";
import Drawer from "@mui/material/Drawer";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import TextField from '@mui/material/TextField';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { CircularProgress } from "@mui/material";
import { selectMobileOpen, close, toggle, setDmChatRoomsOpen, setGroupChatRoomsOpen, selectDmChatRoomsIsOpen, selectGroupChatRoomsIsOpen } from './features/drawer/drawerSlice';
import { selectDmChatRooms, selectGroupChatRooms, setCurrentText, selectCurrentText, selectCurrentMessages } from "./features/chat-room/chatRoomSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import SvgAppIcon from "./icon";
import PromptIcon from "./PromptIcon";
import ChatCursor from "./features/chat-room/ChatCursor";

import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, Chat as ChatIcon, Forum as ForumIcon, CheckCircle as CheckCircleIcon, Circle as CircleIcon, VerifiedUser as VerifiedIcon, UploadFile as UploadIcon, Call as CallIcon } from "@mui/icons-material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { KeyboardEvent } from "react";

const theme = createTheme({
  palette: {
    primary: {
      light: '#44c4cf',
      main: '#3b9ea3',
      dark: '#2e6663',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#4f4db9',
      main: '#403ba3',
      dark: '#2c1d82',
      contrastText: '#ffffff',
    },
  },
});

const drawerWidth = 240;

const App = () => {
  const mobileOpen = useAppSelector(state => selectMobileOpen(state));
  const dmChatRooms = useAppSelector(state => selectDmChatRooms(state));
  const groupChatRooms = useAppSelector(state => selectGroupChatRooms(state));
  const dmChatRoomsIsOpen = useAppSelector(state => selectDmChatRoomsIsOpen(state));
  const groupChatRoomsIsOpen = useAppSelector(state => selectGroupChatRoomsIsOpen(state));
  const currentText = useAppSelector(state => selectCurrentText(state));
  const currentMessages = useAppSelector(state => selectCurrentMessages(state));
  const dispatch = useAppDispatch();

  const handleTextInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      dispatch(setCurrentText(""));
    }
  };

  const drawer = (
    <Box>
      <Toolbar>
        <IconButton
          sx={{ mr: 2 }}
        >
          <SvgAppIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main' }}>
          Icquai
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="My Account" />
        </ListItemButton>
      </List>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" sx={{ textAlign: "start" }}>
            Chat Rooms
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => dispatch(setDmChatRoomsOpen(!dmChatRoomsIsOpen))}>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="DMs" />
          {dmChatRoomsIsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={dmChatRoomsIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {dmChatRooms.map((chatRoom, index) => (
              <ListItem key={index} sx={{ pl: 4 }}>
                <ListItemIcon>
                  {chatRoom.isOnline ? <CheckCircleIcon color="success" /> : <CircleIcon color="disabled" />}
                </ListItemIcon>
                <ListItemText primary={chatRoom.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={() => dispatch(setGroupChatRoomsOpen(!groupChatRoomsIsOpen))}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Groups" />
          {groupChatRoomsIsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={groupChatRoomsIsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {groupChatRooms.map((chatRoom, index) => (
              <ListItem key={index} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText primary={chatRoom.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', flex: '1', flexDirection: 'column' }}>
          <CssBaseline />
          <AppBar
            position="sticky"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => dispatch(toggle())}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                Friend 1
              </Typography>
              <IconButton
                size="large"
                color="inherit"
                aria-label="online"
              >
                <CheckCircleIcon />
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                aria-label="online"
              >
                <CallIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              display: 'flex',
              flex: '1',
              flexDirection: 'column',
              ml: { sm: `${drawerWidth}px` },
              overflow: 'auto',
            }}
          >
            <Box
              id="chat-messages"
              sx={{
                flex: '1',
                mt: 2,
                mb: 2,
                ml: 1,
                mr: 1,
              }}
            >
              {currentMessages.map((message, index) => (
                <Card key={index} sx={{ mb: 1, textAlign: 'start' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'row', color: 'text.secondary', fontSize: 14, alignItems: 'center' }}>
                      <Avatar alt={message.senderName} sx={{ width: 16, height: 16, mr: 1 }} />
                      <Typography component="div" noWrap sx={{ flexGrow: 1 }}>
                        {message.senderName}
                      </Typography>
                      <VerifiedIcon sx={{ width: 16, height: 16, }} />
                      <Typography component="div" sx={{ ml: 1 }}>
                        {"#"}
                        {message.senderHash}
                      </Typography>
                    </Box>
                    <Typography variant="body1" component="div" sx={{ ml: 3, whiteSpace: 'pre-wrap' }}>
                      {message.text.slice(0, message.cursorPosition)}
                      <ChatCursor />
                      {message.text.slice(message.cursorPosition)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              <CircularProgress />
            </Box>
            <Divider />
            <Box
              id="chat-input"
              sx={{
                position: 'sticky',
                bottom: 0,
                display: 'flex',
                mt: 2,
                mb: 3,
                ml: 1,
                mr: 1,
              }}
            >
              <PromptIcon sx={{
                color: 'primary.main',
                alignSelf: 'start',
                mt: 2,
              }} />
              <TextField
                label="My Username"
                variant="filled"
                multiline
                sx={{ flex: '1' }}
                slotProps={{ input: { slotProps: { input: { onKeyDown: handleTextInput } } } }}
                onChange={ e => dispatch(setCurrentText(e.target.value)) }
                value={currentText}
              />
              <IconButton
                size="large"
                color="inherit"
                aria-label="add-file"
                sx={{
                }}
              >
                <UploadIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={() => dispatch(close())}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
