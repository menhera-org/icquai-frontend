import { createAppSlice } from "../../app/createAppSlice";

export interface DmChatRoom {
  name: string;
  isOnline: boolean;
}

export interface GroupChatRoom {
  name: string;
  participantCount: number;
}

export interface Message {
  senderName: string;
  senderHash: string;
  text: string;
  cursorPosition: number;
}

export interface ChatRoomSliceState {
  dmChatRooms: DmChatRoom[];
  groupChatRooms: GroupChatRoom[];
  currentText: string;
  currentMessages: Message[];
}

const initialState: ChatRoomSliceState = {
  dmChatRooms: [
    {
      name: "Friend 1",
      isOnline: true,
    },
    {
      name: "Friend 2",
      isOnline: false,
    },
  ],
  groupChatRooms: [
    {
      name: "Group 1",
      participantCount: 3,
    },
    {
      name: "Group 2",
      participantCount: 5,
    },
  ],
  currentText: "",
  currentMessages: [
    {
      senderName: "Friend 1",
      senderHash: "deadbeef",
      text: "Hello",
      cursorPosition: 5,
    },
  ],
};

export const chatRoomSlice = createAppSlice({
  name: "chatRoom",
  initialState,
  reducers: create => ({
    addDmChatRoom: create.reducer<DmChatRoom>((state, action) => {
      state.dmChatRooms.push(action.payload);
    }),
    addGroupChatRoom: create.reducer<GroupChatRoom>((state, action) => {
      state.groupChatRooms.push(action.payload);
    }),
    setCurrentText: create.reducer<string>((state, action) => {
      state.currentText = action.payload;
    }),
  }),
  selectors: {
    selectDmChatRooms: chatRoom => chatRoom.dmChatRooms,
    selectGroupChatRooms: chatRoom => chatRoom.groupChatRooms,
    selectCurrentText: chatRoom => chatRoom.currentText,
    selectCurrentMessages: chatRoom => chatRoom.currentMessages,
  },
});

// Action creators are generated for each case reducer function.
export const { addDmChatRoom, addGroupChatRoom, setCurrentText } = chatRoomSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectDmChatRooms, selectGroupChatRooms, selectCurrentText, selectCurrentMessages } = chatRoomSlice.selectors;
