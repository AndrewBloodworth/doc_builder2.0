/* eslint-disable no-unused-vars */
import express from "express";
import { Settings, SignatureFields } from "../../builder/builder_types/types";

const router = express.Router();

import db from "../db";
import { property } from "../db/models/Property";
import { user } from "../db/models/User";
const { Contract, Signer, User, Property, Template, Space, Unlocked, Token } =
  db.models;

const types = require("../../../utils/Contract/utils/types");
import {
  ErrorStatus,
  RequestRequireToken,
  SpacePropertyType,
  UserStatus,
} from "../types";
import { contract_includer, signer_includer } from "./utils/inclusions";

router.get("/:contractId", async (req, res, next) => {
  try {
    const { contractId } = req.params;
    const contract = await Contract.findByPk(contractId, {
      attributes: { exclude: ["lines"] },
      ...contract_includer,
    });

    res.json(contract);
  } catch (e) {
    next(e);
  }
});

router.get("/:contractId/lines", async (req, res, next) => {
  try {
    const { offset } = req.query;
    const numOffset = Number(offset);
    const { contractId } = req.params;
    const contract = await Contract.findByPk(contractId, {
      attributes: ["lines"],
    });

    const lines = JSON.parse(contract?.lines.toString()!);

    const sec = Math.floor(lines.length / 100);
    const oth = lines.length % 100;
    const thi = [
      0,
      ...Array(sec)
        .fill("")
        .map((_, i) => (i + 1) * 100),
      oth ? sec * 100 + oth : 0,
    ];

    res.json(lines.slice(thi[numOffset], thi[numOffset + 1]));
  } catch (e) {
    next(e);
  }
});

router.put("/:contractId", async (req, res, next) => {
  try {
    const { contractId } = req.params;
    const contract = await Contract.findByPk(contractId, {
      attributes: { exclude: ["lines"] },
      ...contract_includer,
    });
    let { inputs, data } = req.body;

    for (const input_data of data) {
      if (!input_data || !input_data.prop) continue;
      const { i, prop } = input_data;
      const { attribute, value, key, tag } = prop;
      inputs = Contract.updateInputs({
        tag,
        inputs,
        inner: false,
        payload: { ...prop },
        i,
      });
      if (
        key === SpacePropertyType.BUYER_KEY ||
        key === SpacePropertyType.SELLER_KEY
      ) {
        await User.update({ [attribute]: value }, { where: { id: prop.id } });
        const [f, ...l] = key;
        const signer = await Signer.findOne({
          ...signer_includer,
          where: { [`${f.toLowerCase()}${l.join("")}Id`]: prop.id },
        });
        console.log(`${f.toLowerCase()}${l.join("")}Id`, prop.id);
        await signer?.update({
          fields: Signer.updateFields({
            attribute,
            fields: signer.fields,
            payload: { value },
          }),
        });
      } else if (key === types.PROPERTY_KEY) {
        await Property.update(
          { [attribute]: value },
          { where: { id: prop.id } }
        );
      }
    }

    await contract?.update({ inputs });
    // await contract.reload();
    // res.set("Content-Encoding", "gzip");
    res.json({ inputs, signers: contract?.signers });
  } catch (e) {
    next(e);
  }
});

router.put(
  "/:contractId/deadline-template/:templateId",
  async (req, res, next) => {
    try {
      const { contractId, templateId } = req.params;
      const { startDate } = req.body;
      const contract = await Contract.findByPk(contractId, contract_includer);

      let deal = [0, 1];
      let ins = (() => {
        let i = 0;
        return (key: string, idx: number) => {
          if (key.includes("deadlines_") && i === 0 && i++ === 0) {
            deal = [idx, idx + 1];
          } else if (!key.includes("deadlines_") && i > 0) {
            deal[1] = idx + 1;
          }
          return key.includes("deadlines_");
        };
      })();
      // const [month, day, year] = startDate.split("-");
      //[year, month, day].join("-")

      let date = new Date(startDate);
      // date = new Date(date.valueOf());
      console.log(date);
      let dateCopy = date;
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      //`${dateCopy.getMonth()}-${dateCopy.getUTCDate()}-${dateCopy.getFullYear()}`
      const contract_inputs = Object.entries(contract?.inputs!).reduce(
        (obj, [key, val], idx) => {
          if (ins(key, idx)) {
            dateCopy.setUTCDate(dateCopy.getUTCDate() + 1);
            // .setDate(dateCopy.getDate() + 1);
            // dateCopy = new Date(
            //   `${dateCopy.getMonth()}-${
            //     dateCopy.getDate()
            //   }-${dateCopy.getFullYear()}`
            // );

            while (dateCopy.getDay() === 0 || dateCopy.getDay() === 6) {
              dateCopy.setUTCDate(dateCopy.getUTCDate() + 1);
            }
            console.log(dateCopy.toDateString());
            console.log(dayNames[dateCopy.getDay()]);
            // const day = dateCopy.getUTCDate();
            const month = dateCopy.getMonth();
            const year = dateCopy.getFullYear();
            // `${month}-${day}-${year}`,
            return {
              ...obj,
              [key]: dateCopy.toDateString(),
            };
          } else {
            return { ...obj, [key]: val };
          }
        },
        {}
      );
      await contract?.deadline?.update({
        inputs: Object.entries(contract_inputs)
          .slice(deal[0], deal[1])
          .reduce((obj, [key, val]) => {
            return { ...obj, [key]: val };
          }, {}),
      });
      await contract?.update({
        inputs: contract_inputs,
      });
      res.json({
        inputs: contract_inputs,
        signers: contract?.signers,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.post("/:contractId/save-template", async (req, res, next) => {
  try {
    const { contractId } = req.params;
    const { inputs } = req.body;
    const template = await Template.create({
      name: "ugh_inputs",
      contractId: Number(contractId),
      inputs,
    });
    const contract = await Contract.findByPk(contractId, contract_includer);
    await contract?.privateSpace?.addTemplate(template);
    await contract?.reload();
    res.json(contract);
  } catch (e) {
    next(e);
  }
});

router.get("/:contractId/templates/:templateId", async (req, res, next) => {
  try {
    const { contractId, templateId } = req.params;
    const template = await Template.findByPk(templateId);
    const contract = await Contract.findByPk(contractId);
    await contract?.update({ inputs: template?.inputs });
    res.json({ inputs: template?.inputs });
  } catch (e) {
    next(e);
  }
});

router.post("/:contractId/space-props/:spaceId", async (req, res, next) => {
  try {
    const { contractId, spaceId } = req.params;
    const { prop, i } = req.body;
    const {
      attribute,
      value,
      key,
      tag,
    }: {
      attribute: string;
      value: string;
      key: SpacePropertyType;
      tag: string;
    } = prop;

    const space = await Space.findByPk(spaceId);
    const contract = await Contract.findByPk(contractId, {
      attributes: { exclude: ["lines"] },
      ...contract_includer,
    });

    if (
      key === SpacePropertyType.BUYER_KEY ||
      key === SpacePropertyType.SELLER_KEY
    ) {
      const { default_signatures }: Settings =
        require(`../../../utils/Contract/utils/parse_configs/${contract?.name}.js`).settings;

      const { fields } = default_signatures[key];

      const signer = await Signer.create({
        type: key,
        contractId: contract?.id,
        fields: Signer.updateFields({
          attribute,
          fields,
          payload: { value },
        }),
      });

      const user = await signer[`create${key}`]({
        [attribute]: value,
      } as unknown as user);

      await space![`add${key}`](user);

      await contract?.update({
        inputs: Contract.updateInputs({
          tag,
          inputs: contract.inputs,
          inner: false,
          payload: { ...prop, id: user.id },
          i,
        }),
      });
    } else if (key === SpacePropertyType.PROPERTY_KEY) {
      const property = await space![`create${key}`]({
        [attribute]: value,
      } as unknown as property);

      await space![`set${key}`](property);
      await contract?.update({
        inputs: Contract.updateInputs({
          tag,
          inputs: contract?.inputs,
          inner: false,
          payload: { ...prop, id: property.id },
          i,
        }),
      });
    }

    await contract?.reload();
    res.json(contract);
  } catch (e) {
    next(e);
  }
});

router.put("/:contractId/signers/:signerId/fields", async (req, res, next) => {
  try {
    const { contractId, signerId } = req.params;
    const contract = await Contract.findByPk(contractId, {
      attributes: { exclude: ["lines"] },
      ...contract_includer,
    });
    const {
      fields,
      attribute,
      value,
      key,
      tag,
      i,
    }: {
      fields: SignatureFields;
      attribute: string;
      value: string;
      key:
        | SpacePropertyType.BUYER_KEY
        | SpacePropertyType.SELLER_KEY
        | SpacePropertyType.BUYERS_AGENT_KEY
        | SpacePropertyType.SELLERS_AGENT_KEY;
      tag: string;
      i: number;
    } = req.body;

    const inputs = Contract.updateInputs({
      tag,
      inputs: contract?.inputs!,
      inner: true,
      payload: { value },
      i,
    });

    const beforeUpdate = Contract.createInputsHash(contract?.inputs!);
    const afterUpdate = Contract.createInputsHash(inputs);
    const canUpdate = !contract?.disabled;
    if (canUpdate || beforeUpdate === afterUpdate) {
      const signer = await Signer.findByPk(signerId, signer_includer);

      await signer?.updateSigner(key, {
        [attribute]: value,
      });

      await signer?.update({ fields });
      await contract?.update({
        inputs,
      });
      await contract?.reload();
    }

    res.json(contract);
  } catch (e) {
    next(e);
  }
});

router.put("/:contractId/signers/:signerId/sign", async (req, res, next) => {
  try {
    const { contractId, signerId } = req.params;

    const signer = await Signer.findByPk(signerId);
    const contract = await Contract.findByPk(contractId, {
      attributes: { exclude: ["lines"] },
      ...contract_includer,
    });
    const hash = contract?.createHash();

    if (contract?.validateSigners(hash!)) {
      const { timestamp, ipAddress } = req.body;
      await signer?.update({
        signed: true,
        timestamp,
        ipAddress,
        publicKey: signer?.createPublicKey(hash!),
      });
      await contract.reload();
      res.json(contract);
    } else {
      throw Error("Invalid Signature");
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:contractId/unlock", async (req, res, next) => {
  try {
    const { contractId } = req.params;

    const contract = await Contract.findByPk(contractId, {
      ...contract_includer,
    });
    if (contract?.fullySigned) {
      throw Error("Can not unlock signed contract");
    }
    const { name, lines, inputs } = contract!;
    const contractSharedSpace = contract?.sharedSpace;
    const contractPrivateSpace = contract?.privateSpace;
    const unlocked_contract = await Unlocked.create({
      name,
      lines,
      inputs,
      contractId: contract?.id,
    });
    await unlocked_contract.setSpace(
      contractSharedSpace ? contractSharedSpace : contractPrivateSpace
    );

    for (const signer of contract?.signers!) {
      if (signer.signed) {
        await Signer.create({
          type: signer.type,
          unlockedId: unlocked_contract.id,
          fields: signer.fields,
        });
      }
      await signer.update({
        ipAddress: null,
        timestamp: null,
        publicKey: null,
        signed: false,
      });
    }
    await contract?.removeSharedSpace(contractSharedSpace);
    await contract?.reload();
    res.json(contract);
  } catch (e) {
    next(e);
  }
});

router.get("/token-data/:accessToken", async (req, res, next) => {
  try {
    const { accessToken } = req.params;
    const token = await Token.findOne({
      where: { accessToken },
    });
    if (!token || token.hasExpired) {
      const error: ErrorStatus = Error("Invalid token");
      error.status = 401;
      throw error;
    }
    const contractId = token.data()?.contractId;

    const contract = await Contract.findByPk(contractId, {
      attributes: { exclude: ["lines"] },
      ...contract_includer,
    });

    res.json(contract);
  } catch (e) {
    next(e);
  }
});

export default router;
