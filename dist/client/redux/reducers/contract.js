"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadNextLineGroup = exports.setInputs = exports.fetchTokenData = exports.updateSignerStatus = exports.updateSignerFields = exports.updateConfig = exports.unlockContract = exports.createSpaceProperty = exports.updateContract = exports.fetchTemplate = exports.saveCurrentTemplate = exports.updateDeadlineTemplate = exports.fetchContractLines = exports.fetchContract = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
// import BinarySearchTree from "../utils/bst";
const main_1 = __importDefault(require("../../../builder/main"));
const initContract = (contract) => {
    // const bst = new BinarySearchTree();
    const init = Object.assign({}, contract, {
        util: {
            lines: {},
            inputs: JSON.parse(JSON.stringify(contract.inputs)),
            sections: contract.sections,
        },
    });
    init.util.__proto__ = main_1.default.prototype;
    return init;
};
exports.fetchContract = (0, toolkit_1.createAsyncThunk)("contract/fetchContract", ({ contractId }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/contracts/${contractId}`);
    const contract = initContract(data);
    return contract;
}));
exports.fetchContractLines = (0, toolkit_1.createAsyncThunk)("contract/fetchContractLines", ({ contractId, offset, cb }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/contracts/${contractId}/lines?offset=${offset}`);
    // const lines = JSON.parse(response.data.toString());
    // const sec = Math.floor(lines.length / 100);
    // const oth = lines.length % 100;
    // const thi = [
    //   0,
    //   ...Array(sec)
    //     .fill("")
    //     .map((_, i) => (i + 1) * 100),
    //   oth ? sec * 100 + oth : 0,
    // ];
    // const newLines = [];
    // for (let i = 1; i < thi.length; i++) {
    //   newLines.push(lines.slice(thi[i - 1], thi[i]));
    // }
    // const buffer_lengths =
    //   Math.floor(this.lines.length / 100) + (this.lines.length % 100) === 0
    //     ? 0
    //     : 1;
    // const full_groups = Math.floor(lines.length / 100);
    // const end_group = lines.length % 100;
    // const buffer_lengths = [
    //   ...Array(full_groups)
    //     .fill("")
    //     .map((_, i) => (i + 1) * 100),
    //   end_group ? full_groups * 100 + end_group : full_groups * 100,
    // ];
    // cb(newLines, buffer_lengths);
    cb(data);
    return data;
}));
exports.updateDeadlineTemplate = (0, toolkit_1.createAsyncThunk)("contract/updateDeadlineTemplate", ({ contractId, templateId, body, cb, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put(`/api/contracts/${contractId}/deadline-template/${templateId}`, body);
    cb();
    return data;
}));
exports.saveCurrentTemplate = (0, toolkit_1.createAsyncThunk)("contract/saveCurrentTemplate", ({ contractId, body }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post(`/api/contracts/${contractId}/save-template`, body);
    const contract = initContract(data);
    return contract;
}));
exports.fetchTemplate = (0, toolkit_1.createAsyncThunk)("contract/fetchTemplate", ({ contractId, templateId }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/contracts/${contractId}/templates/${templateId}`);
    return data;
}));
exports.updateContract = (0, toolkit_1.createAsyncThunk)("contract/updateContract", ({ contractId, body, cb }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put(`/api/contracts/${contractId}`, body);
    cb();
    return data;
}));
exports.createSpaceProperty = (0, toolkit_1.createAsyncThunk)("contract/createSpaceProperty", ({ contractId, spaceId, body }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.post(`/api/contracts/${contractId}/space-props/${spaceId}`, body);
    return data;
}));
exports.unlockContract = (0, toolkit_1.createAsyncThunk)("contract/unlockContract", (contractId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put(`/api/contracts/${contractId}/unlock`);
    return data;
}));
exports.updateConfig = (0, toolkit_1.createAsyncThunk)("contract/updateConfig", ({ contractId, body }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put(`/api/contracts/${contractId}/config`, body);
    return initContract(data);
}));
exports.updateSignerFields = (0, toolkit_1.createAsyncThunk)("contract/updateSignerFields", ({ contractId, signerId, body }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put(`/api/contracts/${contractId}/signers/${signerId}/fields`, body);
    return data;
}));
exports.updateSignerStatus = (0, toolkit_1.createAsyncThunk)("contract/updateSignerStatus", ({ contractId, signerId, body }) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.put(`/api/contracts/${contractId}/signers/${signerId}/sign`, body);
    return data;
}));
exports.fetchTokenData = (0, toolkit_1.createAsyncThunk)("contract/fetchTokenData", (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`/api/contracts/token-data/${accessToken}`);
    const contract = initContract(data);
    return contract;
}));
const INIT_STATE = {
    contract: {},
    total: 0,
    lineGroups: [],
    lastPartIdx: 0,
    currentPartIdx: -1,
    signers: [],
    refresh: {},
    isRefreshing: {},
    isLoading: true,
    hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const contractSlice = (0, toolkit_1.createSlice)({
    name: "contract",
    initialState: INIT_STATE,
    reducers: {
        setInputs(state, action) {
            // const { id, value } = action.payload;
            // return { ...state, inputs: { ...state.inputs, [id]: value } };
        },
        loadNextLineGroup(state, action) {
            // let lazyLines = [];
            // const groups = state.lineGroups;
            // for (let i = 0; i <= action.payload; i++) {
            //   lazyLines.push(groups[i]);
            // }
            // const lazyLines = state.lineGroups
            //   .map((g) => g)
            //   .slice(0, action.payload + 1);
            // const { nextPartIdx, nextPart } = action.payload;
            // state.contract.util.lines = [...state.contract.util.lines, nextPart];
            // return { ...state, currentPartIdx: nextPartIdx };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchContract.pending, (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        })
            .addCase(exports.fetchContract.fulfilled, (state, action) => {
            state.contract = action.payload;
            const total = action.payload.groupLength;
            let initGroups = [];
            // for (let g = 0; g < total; g++) {
            //   state[`part_${g}`] = [];
            //   // initGroups.push([]);
            // }
            state.total = total;
            // state.lineGroups = initGroups;
            state.signers = action.payload.signers;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.fetchContract.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
            .addCase(exports.fetchTemplate.fulfilled, (state, action) => {
            state.contract.util.inputs = action.payload.inputs;
            state.contract.util.inputs = action.payload.inputs;
            state.isRefreshing = {};
        })
            .addCase(exports.saveCurrentTemplate.fulfilled, (state, action) => {
            state.contract = action.payload;
            state.isRefreshing = {};
        })
            .addCase(exports.fetchTokenData.fulfilled, (state, action) => {
            state.contract = action.payload;
            const total = action.payload.groupLength;
            state.total = total;
            state.signers = action.payload.signers;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.fetchContractLines.fulfilled, (state, action) => {
            //const { data, offset, total } = action.payload;
            // const newGroups = Array.from(state.lineGroups);
            // newGroups[offset - 1] = data;
            // state.lineGroups = newGroups;
            // action.payload.forEach((line) => {
            //   state.contract.util.lines.insert(line);
            // });
            state.contract.util.lines = action.payload.reduce((obj, line) => {
                if (line.titleNumber === "Header")
                    return obj;
                obj[line.titleNumber] = line;
                return obj;
            }, state.contract.util.lines);
            // .push(...action.payload);
        })
            .addCase(exports.updateContract.pending, (state, action) => {
            state.isRefreshing = {};
        })
            .addCase(exports.updateDeadlineTemplate.fulfilled, (state, action) => {
            // state.contract = initContract(
            //   action.payload,
            //   state.contract.util.lines
            // );
            state.contract.util.inputs = action.payload.inputs;
            state.signers = action.payload.signers;
            state.isRefreshing = {};
        })
            .addCase(exports.updateContract.fulfilled, (state, action) => {
            // state.contract = initContract(
            //   action.payload,
            //   state.contract.util.lines
            // );
            state.contract.util.inputs = action.payload.inputs;
            state.signers = action.payload.signers;
            state.isRefreshing = {};
        })
            .addCase(exports.createSpaceProperty.fulfilled, (state, action) => {
            state.contract = initContract(action.payload);
            state.signers = action.payload.signers;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.updateContract.rejected, (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        })
            .addCase(exports.updateSignerFields.fulfilled, (state, action) => {
            state.contract = initContract(action.payload);
            state.signers = action.payload.signers;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.unlockContract.fulfilled, (state, action) => {
            state.contract = initContract(action.payload);
            state.signers = action.payload.signers;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.updateConfig.fulfilled, (state, action) => {
            state.contract = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.updateSignerStatus.fulfilled, (state, action) => {
            state.contract = initContract(action.payload);
            state.signers = action.payload.signers;
            state.isLoading = false;
            state.hasError = false;
        })
            .addCase(exports.updateSignerStatus.rejected, (state, action) => {
            alert("Contract has been updated since the last signature. Can not sign contract");
            state.isLoading = false;
            state.hasError = false;
        });
    },
});
//Actions
/////////////////////////////////////////////////////////////
_a = contractSlice.actions, exports.setInputs = _a.setInputs, exports.loadNextLineGroup = _a.loadNextLineGroup;
//Reducer
/////////////////////////////////////////////////////////////
exports.default = contractSlice.reducer;
