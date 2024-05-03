import { MenuSection } from '@/types/navigation/menu';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



// Define the initial state
const initialState: { menus: MenuSection[] } = {
  menus: [],
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<MenuSection[]>) => {
      state.menus = action.payload;
    },
  },
});

export const { setMenus } = navigationSlice.actions;

export default navigationSlice.reducer;