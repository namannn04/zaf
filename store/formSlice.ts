import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
    name: string;
    email: string;
    phone: string;
    resume: string;
}

const initialState: FormState = {
    name: "",
    email: "",
    phone: "",
    resume: "",
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
            return { ...state, ...action.payload };
        },
        resetForm: () => initialState,
    },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;