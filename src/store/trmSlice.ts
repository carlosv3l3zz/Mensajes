import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TRMState {
  value: string | null;
}

const initialState: TRMState = {
  value: null,
};

export const trmSlice = createSlice({
  name: 'trm',
  initialState,
  reducers: {
    setTRM: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setTRM } = trmSlice.actions;
export default trmSlice.reducer;