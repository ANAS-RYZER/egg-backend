import { Request, Response, NextFunction } from 'express';
import * as recordService from '../service/record.service';
import { IRecord } from '../models/farm.model';

export const createRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farmId = req.params.farmId;
    const payload = req.body as IRecord;

    // Basic validation
    if (!payload || !payload.date || !payload.shedNo) {
      return res.status(400).json({ message: 'date and shedNo are required' });
    }

    // convert date if string
    payload.date = new Date(payload.date);

    const saved = await recordService.addRecordToFarm(farmId, payload);
    return res.status(201).json({ message: 'Record added', record: saved });
  } catch (err) {
    next(err);
  }
};

export const getRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const farmId = req.params.farmId;
    const records = await recordService.listRecords(farmId);
    res.json({ records });
  } catch (err) {
    next(err);
  }
};

export const getRecordById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { farmId, recordId } = req.params;
    const record = await recordService.getRecord(farmId, recordId);
    res.json({ record });
  } catch (err) {
    next(err);
  }
};

export const updateRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { farmId, recordId } = req.params;
    const updates = req.body as Partial<IRecord>;
    if (updates.date) updates.date = new Date(updates.date);

    const updated = await recordService.updateRecordInFarm(farmId, recordId, updates);
    res.json({ message: 'Record updated', record: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { farmId, recordId } = req.params;
    await recordService.deleteRecordFromFarm(farmId, recordId);
    res.json({ message: 'Record deleted' });
  } catch (err) {
    next(err);
  }
};
