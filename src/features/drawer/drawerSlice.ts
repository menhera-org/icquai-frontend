import { createAppSlice } from "../../app/createAppSlice";

export interface DrawerSliceState {
  mobileOpen: boolean;
  dmChatRoomsIsOpen: boolean;
  groupChatRoomsIsOpen: boolean;
}

const initialState: DrawerSliceState = {
  mobileOpen: false,
  dmChatRoomsIsOpen: false,
  groupChatRoomsIsOpen: false,
};

export const drawerSlice = createAppSlice({
  name: "drawer",
  initialState,
  reducers: create => ({
    open: create.reducer(state => {
      state.mobileOpen = true;
    }),
    close: create.reducer(state => {
      state.mobileOpen = false;
    }),
    toggle: create.reducer(state => {
        state.mobileOpen = !state.mobileOpen;
    }),
    setDmChatRoomsOpen: create.reducer<boolean>((state, action) => {
      state.dmChatRoomsIsOpen = action.payload;
    }),
    setGroupChatRoomsOpen: create.reducer<boolean>((state, action) => {
      state.groupChatRoomsIsOpen = action.payload;
    }),
  }),
  selectors: {
    selectMobileOpen: drawer => drawer.mobileOpen,
    selectDmChatRoomsIsOpen: drawer => drawer.dmChatRoomsIsOpen,
    selectGroupChatRoomsIsOpen: drawer => drawer.groupChatRoomsIsOpen,
  },
});

// Action creators are generated for each case reducer function.
export const { open, close, toggle, setDmChatRoomsOpen, setGroupChatRoomsOpen } =
  drawerSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectMobileOpen, selectDmChatRoomsIsOpen, selectGroupChatRoomsIsOpen } = drawerSlice.selectors;
