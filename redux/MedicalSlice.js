import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    animal: {},
    caseType: {},
    complaints: [],
    diagnosis: [],
    lab: [],
    prescription: [],
    followUpDate: null,
    advice: []
};

export const MedicalSlice = createSlice({
    name: "Medical",
    initialState,
    reducers: {
        setAnimal: (state, action) => {
            state.animal = action.payload;
        },
        setcaseType: (state, action) => {
            state.caseType = action.payload;
        },
        setcomplaints: (state, action) => {
            state.complaints = action.payload;
        },
        setdiagnosis: (state, action) => {
            state.diagnosis = action.payload;
        },
        setlab: (state, action) => {
            state.lab = action.payload;
        },
        setprescription: (state, action) => {
            state.prescription = action.payload;
        },
        setfollowUpDate: (state, action) => {
            state.followUpDate = action.payload;
        },
        setadvice: (state, action) => {
            state.advice = action.payload;
        },
        removeMedical: (state, action) => {
            state.animal = {};
            state.caseType = {};
            state.complaints = [];
            state.diagnosis = [];
            state.lab = [];
            state.prescription = [];
            state.followUpDate = null;
            state.advice = [];
        },
    },
});

export const {
    setAnimal,
    setMedical,
    setcaseType,
    setcomplaints,
    setdiagnosis,
    setlab,
    setprescription,
    setfollowUpDate,
    setadvice,
    removeMedical,
} = MedicalSlice.actions;
export default MedicalSlice.reducer;
