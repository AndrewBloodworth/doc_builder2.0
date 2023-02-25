import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LineObject, ParsableLine } from "../../../builder/builder_types/types";

// import BinarySearchTree from "../utils/bst";

import ContractClass from "../../../builder/main";
import {
  FetchContractPayload,
  FetchContractLinesPayload,
  UpdateDeadlineTemplatePayload,
  SaveCurrentTemplatePayload,
  FetchTemplatePayload,
  UpdateContractPayload,
  CreateSpacePropertyPayload,
  UpdateConfigPayload,
  UpdateSignerFieldsPayload,
  UpdateSignerStatusPayload,
  CompanyState,
  FrontEndContractClass,
} from "../../types";
const initContract = (contract: any) => {
  // const bst = new BinarySearchTree();
  const init = Object.assign({}, contract, {
    util: {
      lines: {},
      inputs: JSON.parse(JSON.stringify(contract.inputs)),
      sections: contract.sections,
    },
  });

  init.util.__proto__ = ContractClass.prototype;
  return init as FrontEndContractClass;
};
export const fetchContract = createAsyncThunk(
  "contract/fetchContract",
  async ({ contractId }: FetchContractPayload) => {
    const { data } = await axios.get(`/api/contracts/${contractId}`);
    const contract = initContract(data);

    return contract;
  }
);

export const fetchContractLines = createAsyncThunk(
  "contract/fetchContractLines",
  async ({ contractId, offset, cb }: FetchContractLinesPayload) => {
    const { data } = await axios.get(
      `/api/contracts/${contractId}/lines?offset=${offset}`
    );

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
    return data as ParsableLine[];
  }
);

export const updateDeadlineTemplate = createAsyncThunk(
  "contract/updateDeadlineTemplate",
  async ({
    contractId,
    templateId,
    body,
    cb,
  }: UpdateDeadlineTemplatePayload) => {
    const { data } = await axios.put(
      `/api/contracts/${contractId}/deadline-template/${templateId}`,
      body
    );
    cb();
    return data;
  }
);

export const saveCurrentTemplate = createAsyncThunk(
  "contract/saveCurrentTemplate",
  async ({ contractId, body }: SaveCurrentTemplatePayload) => {
    const { data } = await axios.post(
      `/api/contracts/${contractId}/save-template`,
      body
    );
    const contract = initContract(data);

    return contract;
  }
);
export const fetchTemplate = createAsyncThunk(
  "contract/fetchTemplate",
  async ({ contractId, templateId }: FetchTemplatePayload) => {
    const { data } = await axios.get(
      `/api/contracts/${contractId}/templates/${templateId}`
    );

    return data;
  }
);
export const updateContract = createAsyncThunk(
  "contract/updateContract",
  async ({ contractId, body, cb }: UpdateContractPayload) => {
    const { data } = await axios.put(`/api/contracts/${contractId}`, body);

    cb();
    return data;
  }
);

export const createSpaceProperty = createAsyncThunk(
  "contract/createSpaceProperty",
  async ({ contractId, spaceId, body }: CreateSpacePropertyPayload) => {
    const { data } = await axios.post(
      `/api/contracts/${contractId}/space-props/${spaceId}`,
      body
    );
    return data;
  }
);

export const unlockContract = createAsyncThunk(
  "contract/unlockContract",
  async (contractId: number) => {
    const { data } = await axios.put(`/api/contracts/${contractId}/unlock`);

    return data;
  }
);

export const updateConfig = createAsyncThunk(
  "contract/updateConfig",
  async ({ contractId, body }: UpdateConfigPayload) => {
    const { data } = await axios.put(
      `/api/contracts/${contractId}/config`,
      body
    );

    return initContract(data);
  }
);
export const updateSignerFields = createAsyncThunk(
  "contract/updateSignerFields",
  async ({ contractId, signerId, body }: UpdateSignerFieldsPayload) => {
    const { data } = await axios.put(
      `/api/contracts/${contractId}/signers/${signerId}/fields`,
      body
    );
    return data;
  }
);

export const updateSignerStatus = createAsyncThunk(
  "contract/updateSignerStatus",
  async ({ contractId, signerId, body }: UpdateSignerStatusPayload) => {
    const { data } = await axios.put(
      `/api/contracts/${contractId}/signers/${signerId}/sign`,
      body
    );

    return data;
  }
);

export const fetchTokenData = createAsyncThunk(
  "contract/fetchTokenData",
  async (accessToken: string) => {
    const { data } = await axios.get(
      `/api/contracts/token-data/${accessToken}`
    );

    const contract = initContract(data);

    return contract;
  }
);

const INIT_STATE: CompanyState = {
  contract: {} as FrontEndContractClass,
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
const contractSlice = createSlice({
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
      .addCase(fetchContract.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchContract.fulfilled, (state, action) => {
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
      .addCase(fetchContract.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(fetchTemplate.fulfilled, (state, action) => {
        state.contract.util.inputs = action.payload.inputs;
        state.contract.util.inputs = action.payload.inputs;
        state.isRefreshing = {};
      })

      .addCase(saveCurrentTemplate.fulfilled, (state, action) => {
        state.contract = action.payload;
        state.isRefreshing = {};
      })

      .addCase(fetchTokenData.fulfilled, (state, action) => {
        state.contract = action.payload;
        const total = action.payload.groupLength;

        state.total = total;

        state.signers = action.payload.signers;
        state.isLoading = false;
        state.hasError = false;
      })

      .addCase(fetchContractLines.fulfilled, (state, action) => {
        //const { data, offset, total } = action.payload;
        // const newGroups = Array.from(state.lineGroups);
        // newGroups[offset - 1] = data;

        // state.lineGroups = newGroups;
        // action.payload.forEach((line) => {
        //   state.contract.util.lines.insert(line);
        // });

        state.contract.util.lines = action.payload.reduce((obj, line) => {
          if (line.titleNumber === "Header") return obj;
          obj[line.titleNumber!] = line;
          return obj;
        }, state.contract.util.lines);

        // .push(...action.payload);
      })
      .addCase(updateContract.pending, (state, action) => {
        state.isRefreshing = {};
      })
      .addCase(updateDeadlineTemplate.fulfilled, (state, action) => {
        // state.contract = initContract(
        //   action.payload,
        //   state.contract.util.lines
        // );

        state.contract.util.inputs = action.payload.inputs;
        state.signers = action.payload.signers;
        state.isRefreshing = {};
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        // state.contract = initContract(
        //   action.payload,
        //   state.contract.util.lines
        // );

        state.contract.util.inputs = action.payload.inputs;
        state.signers = action.payload.signers;
        state.isRefreshing = {};
      })
      .addCase(createSpaceProperty.fulfilled, (state, action) => {
        state.contract = initContract(action.payload);
        state.signers = action.payload.signers;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateContract.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(updateSignerFields.fulfilled, (state, action) => {
        state.contract = initContract(action.payload);
        state.signers = action.payload.signers;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(unlockContract.fulfilled, (state, action) => {
        state.contract = initContract(action.payload);
        state.signers = action.payload.signers;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateConfig.fulfilled, (state, action) => {
        state.contract = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateSignerStatus.fulfilled, (state, action) => {
        state.contract = initContract(action.payload);
        state.signers = action.payload.signers;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateSignerStatus.rejected, (state, action) => {
        alert(
          "Contract has been updated since the last signature. Can not sign contract"
        );
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setInputs, loadNextLineGroup } = contractSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default contractSlice.reducer;
